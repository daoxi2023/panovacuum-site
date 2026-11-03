# PANO private inquiry reminders

This module sends minimal internal reminders only to the existing user private Telegram chat explicitly authorised on 2026-11-01. It never contacts customers. No secrets are stored in source.

## Installation

1. Use the existing `~/.secrets/tg.env` values locally; do not echo or write them into this repository. Map `TG_BOT_TOKEN` to encrypted `PANO_NOTIFY_BOT_TOKEN` and `TG_CHAT_ID` to encrypted `PANO_NOTIFY_CHAT_ID` on both the PANO Pages project and the separate notifier Worker. Reject group-chat IDs.
2. Deploy the notifier from `workers/wrangler.toml` with the existing explicit Cloudflare account. It binds only the PANO inquiry D1 database. No schema migration is required; notification state uses the existing inquiry_audit table.
3. Deploy Pages with the Functions-aware `npm run ship` path. Pages schedules a best-effort alert through waitUntil after both a new 201 receipt and a successful identical 200 retry. Only records still new with no confirmed notification_sent can send; the shared five-minute claim prevents overlapping attempts. It never changes a successful inquiry receipt because notification delivery failed.
4. The Worker cron retries every five minutes, at most 20 new unsent records per run. It has no public route, workers.dev, preview URL, administrative endpoint or list endpoint. Its fetch handler returns 404.
5. Verify one clearly labelled QA test reminder and audit notification_sent before claiming delivery. Existing closed QA inquiries are excluded. Keep test messages distinct from business leads.

## Privacy and delivery limits

Payload is limited to PANO, inquiry/partnership category, reference number and pending status; the designated synthetic QA company is checked via SQL CASE and emits only a test flag. No company name, personal contact, email, free text or drawings are sent. Destination is a fixed positive numeric private chat ID from encrypted configuration. Provider requests use HTTPS, use manual redirect handling and reject every 3xx response without following it, and time out after ten seconds. Cloudflare workerd does not implement redirect:error; using that option fails before a network request. Provider errors are never logged.

An atomic audit claim with a five-minute lease prevents immediate/scheduled overlap. Confirmed success requires HTTP success, Telegram ok=true and the configured private-chat ID in the response. Failures persist a generic notification_failed audit event and retry after lease expiry. notification_sent suppresses later sends. This is an at-least-once mechanism: if Telegram delivers but the acknowledgement or subsequent audit write is lost, a later retry can duplicate a reminder. It is not a guarantee of exactly-once delivery, nor evidence that a person read or followed up a lead.

Unconfigured or invalid notification credentials skip alerts; intake remains operational. Sustained provider/database failures can delay alerts indefinitely. A five-minute cron is a retry cadence, not a delivery SLA. Records no longer in status new are intentionally excluded.

Local tests: `node --experimental-strip-types --test tests/notifications.test.mjs`. TypeScript permits explicit .ts imports for native Node test loading; the project remains noEmit=true and Wrangler/Next compile production modules.
