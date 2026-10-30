interface D1Result<Row = Record<string, unknown>> {
  success: boolean;
  results?: Row[];
}
interface D1Statement {
  bind(...values: unknown[]): D1Statement;
}
interface D1Database {
  prepare(sql: string): D1Statement;
  batch(statements: D1Statement[]): Promise<D1Result[]>;
}
export interface Env {
  PANO_DB?: D1Database;
  PANO_RATE_SALT?: string;
}
interface Context { request: Request; env: Env }

const MAX_BODY = 16 * 1024;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PRODUCT_TYPES = ["chamber", "precision-parts", "welded-assembly", "other"];
const PARTNERSHIP_TYPES = ["sourcing", "customer-supply-chain", "strategic"];
const NEXT_STEPS = ["meeting", "capability-review", "other"];
const SOURCE_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const FIELDS = ["kind", "locale", "requestKey", "company", "contact", "email", "country", "productType", "material", "quantity", "timeline", "partnershipType", "resources", "nextStep", "message", "sourcePath", "source", "privacy", "website"];

function reply(status: number, data: Record<string, unknown>, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extra },
  });
}
function fail(status: number, code: string, extra: Record<string, string> = {}) {
  return reply(status, { ok: false, code }, extra);
}
function text(value: unknown, limit: number, required = false): string {
  if (value === undefined && !required) return "";
  if (typeof value !== "string") throw new Error("INVALID_INPUT");
  const result = value.trim();
  if ((required && !result) || result.length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(result)) throw new Error("INVALID_INPUT");
  return result;
}
function parseInput(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("INVALID_INPUT");
  const body = value as Record<string, unknown>;
  if (Object.keys(body).some((key) => !FIELDS.includes(key))) throw new Error("INVALID_INPUT");
  if (body.kind !== "quote" && body.kind !== "partnership") throw new Error("INVALID_INPUT");
  if (body.locale !== "en" && body.locale !== "zh") throw new Error("INVALID_INPUT");
  if (typeof body.requestKey !== "string" || !UUID.test(body.requestKey)) throw new Error("INVALID_INPUT");
  if (body.privacy !== true || text(body.website, 200) !== "") throw new Error("INVALID_INPUT");
  const company = text(body.company, 120, true);
  const contact = text(body.contact, 120, true);
  const email = text(body.email, 254, true);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("INVALID_INPUT");
  const country = text(body.country, 80);
  const productType = text(body.productType, 40, body.kind === "quote");
  const partnershipType = text(body.partnershipType, 40, body.kind === "partnership");
  const nextStep = text(body.nextStep, 40);
  if ((productType && !PRODUCT_TYPES.includes(productType)) || (partnershipType && !PARTNERSHIP_TYPES.includes(partnershipType)) || (nextStep && !NEXT_STEPS.includes(nextStep))) throw new Error("INVALID_INPUT");
  const message = text(body.message, 3000, true);
  const details = {
    material: text(body.material, 120),
    quantity: text(body.quantity, 80),
    timeline: text(body.timeline, 120),
    resources: text(body.resources, 2000, body.kind === "partnership"),
    nextStep,
  };
  const sourcePath = text(body.sourcePath, 200);
  if (sourcePath && !/^\/(?:en|zh)(?:\/[a-z0-9-]+)*\/?$/i.test(sourcePath)) throw new Error("INVALID_INPUT");
  const source: Record<string, string> = {};
  if (body.source !== undefined) {
    if (!body.source || typeof body.source !== "object" || Array.isArray(body.source)) throw new Error("INVALID_INPUT");
    const inputSource = body.source as Record<string, unknown>;
    if (Object.keys(inputSource).some((key) => !SOURCE_KEYS.includes(key))) throw new Error("INVALID_INPUT");
    for (const key of SOURCE_KEYS) {
      const item = text(inputSource[key], 120);
      if (item && !/^[\p{L}\p{N} _.-]+$/u.test(item)) throw new Error("INVALID_INPUT");
      if (item) source[key] = item;
    }
  }
  return { kind: body.kind, locale: body.locale, requestKey: body.requestKey.toLowerCase(), company, contact, email, country, productType, partnershipType, message, details, sourcePath, source };
}

async function readBody(request: Request): Promise<unknown> {
  const declared = request.headers.get("Content-Length");
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > MAX_BODY)) throw new Error("PAYLOAD_TOO_LARGE");
  if (!request.body) throw new Error("INVALID_INPUT");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) {
        await reader.cancel();
        throw new Error("PAYLOAD_TOO_LARGE");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}
async function hash(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method !== "POST") return fail(405, "METHOD_NOT_ALLOWED", { Allow: "POST" });
  const origin = request.headers.get("Origin");
  if (!origin || origin !== new URL(request.url).origin || request.headers.get("Sec-Fetch-Site") === "cross-site") return fail(403, "ORIGIN_NOT_ALLOWED");
  if (!/^application\/json(?:\s*;\s*charset\s*=\s*utf-8)?$/i.test(request.headers.get("Content-Type") || "")) return fail(415, "UNSUPPORTED_MEDIA_TYPE");
  if (!env.PANO_DB || typeof env.PANO_RATE_SALT !== "string" || env.PANO_RATE_SALT.length < 32) return fail(503, "SERVICE_UNAVAILABLE");
  const hostname = new URL(request.url).hostname;
  const ip = request.headers.get("CF-Connecting-IP") || (["localhost", "127.0.0.1"].includes(hostname) ? "127.0.0.1" : null);
  if (!ip || !/^[a-f0-9:.]{3,45}$/i.test(ip)) return fail(503, "SERVICE_UNAVAILABLE");
  let input: ReturnType<typeof parseInput>;
  try {
    input = parseInput(await readBody(request));
  } catch (error) {
    return error instanceof Error && error.message === "PAYLOAD_TOO_LARGE" ? fail(413, "PAYLOAD_TOO_LARGE") : fail(400, "INVALID_INPUT");
  }
  try {
    const { requestKey, ...payload } = input;
    const fingerprint = await hash(JSON.stringify(payload));
    const ipHash = await hash(`${env.PANO_RATE_SALT}:${ip}`);
    const reference = `PANO-${crypto.randomUUID().replaceAll("-", "").slice(0, 16).toUpperCase()}`;
    const now = new Date();
    const timestamp = now.toISOString();
    const second = Math.floor(now.getTime() / 1000);
    const minute = Math.floor(second / 60) * 60;
    const day = Math.floor(second / 86400) * 86400;
    const db = env.PANO_DB;
    // D1 batch is one transaction: quota checks, insertion, counters and audit
    // commit together. Only this attempt's newly inserted reference is counted.
    const results = await db.batch([
      db.prepare(`INSERT INTO inquiries (
        reference, request_key, request_fingerprint, kind, locale, company,
        contact, email, country, product_type, partnership_type, message,
        details_json, source_path, source_json, consent_at, created_at, updated_at
      ) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        WHERE NOT EXISTS (SELECT 1 FROM inquiries WHERE request_key = ?)
          AND COALESCE((SELECT count FROM inquiry_rate_limits WHERE bucket_key = ? AND window_start = ?), 0) < 5
          AND COALESCE((SELECT count FROM inquiry_rate_limits WHERE bucket_key = ? AND window_start = ?), 0) < 30
        ON CONFLICT(request_key) DO NOTHING`).bind(
        reference, requestKey, fingerprint, input.kind, input.locale, input.company,
        input.contact, input.email, input.country, input.productType, input.partnershipType, input.message,
        JSON.stringify(input.details), input.sourcePath, JSON.stringify(input.source), timestamp, timestamp, timestamp,
        requestKey, `${ipHash}:minute`, minute, `${ipHash}:day`, day,
      ),
      db.prepare(`INSERT INTO inquiry_rate_limits (bucket_key, window_start, count, expires_at)
        SELECT ?, ?, 1, ? WHERE EXISTS (SELECT 1 FROM inquiries WHERE reference = ?)
        ON CONFLICT(bucket_key, window_start) DO UPDATE SET count = count + 1`).bind(`${ipHash}:minute`, minute, minute + 60, reference),
      db.prepare(`INSERT INTO inquiry_rate_limits (bucket_key, window_start, count, expires_at)
        SELECT ?, ?, 1, ? WHERE EXISTS (SELECT 1 FROM inquiries WHERE reference = ?)
        ON CONFLICT(bucket_key, window_start) DO UPDATE SET count = count + 1`).bind(`${ipHash}:day`, day, day + 86400, reference),
      db.prepare(`INSERT INTO inquiry_audit (reference, action, actor, next_status, created_at)
        SELECT reference, 'created', 'website', 'new', ? FROM inquiries WHERE reference = ?`).bind(timestamp, reference),
      db.prepare(`DELETE FROM inquiry_rate_limits WHERE rowid IN (
        SELECT rowid FROM inquiry_rate_limits WHERE expires_at <= ? LIMIT 100
      )`).bind(second),
      db.prepare("SELECT reference, request_fingerprint FROM inquiries WHERE request_key = ?").bind(requestKey),
    ]);
    if (results.length !== 6 || results.some((result) => !result.success)) return fail(503, "SERVICE_UNAVAILABLE");
    const row = results[5].results?.[0];
    if (!row) return fail(429, "RATE_LIMITED", { "Retry-After": "60" });
    if (row.request_fingerprint !== fingerprint) return fail(409, "IDEMPOTENCY_CONFLICT");
    if (typeof row.reference !== "string") return fail(503, "SERVICE_UNAVAILABLE");
    return reply(row.reference === reference ? 201 : 200, { ok: true, reference: row.reference });
  } catch {
    return fail(503, "SERVICE_UNAVAILABLE");
  }
}
