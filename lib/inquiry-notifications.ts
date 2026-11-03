// PANO-only private alerts. No customer data may enter notification payloads.
interface Statement { bind(...values: unknown[]): Statement }
interface Result { success: boolean; results?: Record<string, unknown>[] }
export interface NotificationEnv {
  PANO_DB?: { prepare(sql: string): Statement; batch(statements: Statement[]): Promise<Result[]> };
  PANO_NOTIFY_BOT_TOKEN?: string;
  PANO_NOTIFY_CHAT_ID?: string;
}
export function notificationConfigured(env: NotificationEnv): boolean {
  return !!env.PANO_DB && /^[0-9]+:[A-Za-z0-9_-]+$/.test(env.PANO_NOTIFY_BOT_TOKEN || "")
    && /^[1-9][0-9]*$/.test(env.PANO_NOTIFY_CHAT_ID || "");
}
export async function notifyReference(env: NotificationEnv, reference: string, fetchImpl: typeof fetch = fetch): Promise<void> {
  if (!notificationConfigured(env) || !/^PANO-[A-F0-9]{16}$/.test(reference)) return;
  const db = env.PANO_DB!;
  const now = new Date().toISOString();
  const recent = new Date(Date.now() - 300000).toISOString();
  try {
    // One atomic claim prevents immediate and scheduled senders from overlapping.
    const [claim] = await db.batch([db.prepare(`INSERT INTO inquiry_audit (reference, action, actor, next_status, note, created_at)
      SELECT reference, 'notification_claimed', 'pano-notifier', status, '', ? FROM inquiries i
      WHERE reference = ? AND status = 'new'
      AND NOT EXISTS (SELECT 1 FROM inquiry_audit a WHERE a.reference = i.reference AND a.action = 'notification_sent')
      AND NOT EXISTS (SELECT 1 FROM inquiry_audit a WHERE a.reference = i.reference AND a.action = 'notification_claimed' AND a.created_at > ?)
      RETURNING reference`).bind(now, reference, recent)]);
    if (!claim?.success || !claim.results?.length) return;
    const [selected] = await db.batch([db.prepare(`SELECT reference, kind, status,
      CASE WHEN company = 'Website QA test only' THEN 1 ELSE 0 END AS is_test
      FROM inquiries WHERE reference = ? AND status = 'new'`).bind(reference)]);
    const row = selected?.success ? selected.results?.[0] : undefined;
    if (!row || !['quote', 'partnership'].includes(String(row.kind))) return;
    let sent = false;
    let failure = "response-invalid";
    try {
      const response = await fetchImpl(`https://api.telegram.org/bot${env.PANO_NOTIFY_BOT_TOKEN}/sendMessage`, {
        method: "POST", redirect: "manual", signal: AbortSignal.timeout(10000),
        headers: { "Content-Type": "application/json", "User-Agent": "PANO-private-notifier/1.0" },
        body: JSON.stringify({ chat_id: env.PANO_NOTIFY_CHAT_ID,
          text: `${row.is_test === 1 ? '测试提醒｜' : ''}帕诺 PANO｜${row.kind === 'quote' ? '新询价' : '产业合作'}\n受理编号：${reference}\n状态：待处理`,
          disable_web_page_preview: true }),
      });
      // workerd supports manual/follow only; never follow a credential-bearing URL.
      if (response.status >= 300 && response.status < 400) {
        failure = "redirect-blocked";
      } else if (!response.ok) {
        failure = `http-${response.status}`;
      } else {
        type Reply = { ok?: boolean; result?: { chat?: { id?: number | string } } };
        let body: Reply | null = null;
        try { body = await response.json() as Reply; } catch { /* Never retain provider content. */ }
        if (body?.ok === true) {
          sent = String(body.result?.chat?.id) === env.PANO_NOTIFY_CHAT_ID;
          if (!sent) failure = "chat-mismatch";
        }
      }
    } catch (error) {
      // Only this fixed classification is persisted; provider errors may embed credentials.
      if (error instanceof Error) {
        if (["TimeoutError", "AbortError"].includes(error.name)) failure = "timeout";
        else if (error instanceof TypeError && error.message === "AbortSignal.timeout is not a function") failure = "unsupported-timeout";
        else if (error.message.includes("Illegal invocation")) failure = "fetch-binding";
        else if (error.message.includes("Network connection lost")) failure = "network-connection";
        else if (error.name === "TypeError") failure = "network-typeerror";
        else if (error.name === "Error") failure = "network-error";
        else failure = "network";
      } else failure = "network";
    }
    await db.batch([db.prepare(`INSERT INTO inquiry_audit (reference, action, actor, next_status, note, created_at)
      SELECT reference, ?, 'pano-notifier', status, ?, ? FROM inquiries WHERE reference = ?`).bind(
      sent ? 'notification_sent' : 'notification_failed', sent ? '' : `Delivery not confirmed (${failure}); retry after claim expiry.`, new Date().toISOString(), reference)]);
  } catch { /* A later scheduled run retries; notification failure never changes intake success. */ }
}

export async function notifyPending(env: NotificationEnv, fetchImpl: typeof fetch = fetch): Promise<void> {
  if (!notificationConfigured(env)) return;
  const db = env.PANO_DB!;
  try {
    const [result] = await db.batch([db.prepare(`SELECT reference FROM inquiries i WHERE status = 'new'
      AND NOT EXISTS (SELECT 1 FROM inquiry_audit a WHERE a.reference = i.reference AND a.action = 'notification_sent')
      AND NOT EXISTS (SELECT 1 FROM inquiry_audit a WHERE a.reference = i.reference AND a.action = 'notification_claimed' AND a.created_at > ?)
      ORDER BY created_at LIMIT 20`).bind(new Date(Date.now() - 300000).toISOString())]);
    if (!result?.success) return;
    for (const row of result.results || []) if (typeof row.reference === 'string') await notifyReference(env, row.reference, fetchImpl);
  } catch { /* Next run retries; no customer or provider data is logged. */ }
}
