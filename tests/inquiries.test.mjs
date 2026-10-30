import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { onRequest } from "../functions/api/inquiries.ts";
import { csvCell, queryDatabase } from "../scripts/inquiries.mjs";

const schema = readFileSync(new URL("../migrations/0001_inquiries.sql", import.meta.url), "utf8");
const ORIGIN = "https://panovacuum.com";
const SALT = "test-only-salt-with-at-least-32-characters";

function fixture() {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec("PRAGMA foreign_keys = ON");
  sqlite.exec(schema);
  let failureAt = -1;
  const db = {
    prepare(sql) { return { sql, params: [], bind(...params) { this.params = params; return this; } }; },
    async batch(statements) {
      sqlite.exec("BEGIN IMMEDIATE");
      try {
        const results = statements.map((statement, index) => {
          if (index === failureAt) throw new Error("sensitive SQL and body must not escape");
          return { success: true, results: sqlite.prepare(statement.sql).all(...statement.params) };
        });
        sqlite.exec("COMMIT");
        return results;
      } catch (error) { sqlite.exec("ROLLBACK"); throw error; }
    },
  };
  return { sqlite, db, env: { PANO_DB: db, PANO_RATE_SALT: SALT }, failAt(index) { failureAt = index; } };
}
function input(overrides = {}) {
  return { kind: "quote", locale: "en", requestKey: crypto.randomUUID(), company: "Example Equipment", contact: "Example Contact", email: "engineering@example.com", country: "China", productType: "chamber", message: "Please assess this custom stainless chamber project.", privacy: true, website: "", sourcePath: "/en/request-a-quote/", ...overrides };
}
function request(body = input(), options = {}) {
  const method = options.method || "POST";
  const headers = { "Content-Type": "application/json", Origin: ORIGIN, "CF-Connecting-IP": "192.0.2.15", ...options.headers };
  for (const [key, value] of Object.entries(headers)) if (value === undefined) delete headers[key];
  return new Request(options.url || ORIGIN + "/api/inquiries", { method, headers, ...(!["GET", "HEAD"].includes(method) ? { body: options.raw ?? JSON.stringify(body) } : {}) });
}
function count(f) { return f.sqlite.prepare("SELECT COUNT(*) AS count FROM inquiries").get().count; }
function rateCounts(f) { return f.sqlite.prepare("SELECT count FROM inquiry_rate_limits ORDER BY bucket_key").all().map((row) => row.count); }

test("quote is saved with consent, a new status and an audit row before success", async () => {
  const f = fixture();
  const response = await onRequest({ request: request(), env: f.env });
  assert.equal(response.status, 201);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  const result = await response.json();
  assert.deepEqual(Object.keys(result).sort(), ["ok", "reference"]);
  assert.match(result.reference, /^PANO-[0-9A-F]{16}$/);
  const row = f.sqlite.prepare("SELECT * FROM inquiries").get();
  assert.equal(row.reference, result.reference);
  assert.equal(row.status, "new");
  assert.equal(row.kind, "quote");
  assert.ok(row.consent_at);
  assert.equal(f.sqlite.prepare("SELECT COUNT(*) AS count FROM inquiry_audit").get().count, 1);
  assert.equal(JSON.stringify(f.sqlite.prepare("SELECT * FROM inquiry_rate_limits").all()).includes("192.0.2.15"), false);
});

test("partnership is saved separately with resource details", async () => {
  const f = fixture();
  const body = input({ kind: "partnership", locale: "zh", productType: "", partnershipType: "strategic", resources: "Can introduce equipment buyers and order collaboration.", nextStep: "meeting", sourcePath: "/zh/partnership/" });
  const response = await onRequest({ request: request(body), env: f.env });
  assert.equal(response.status, 201);
  const row = f.sqlite.prepare("SELECT * FROM inquiries").get();
  assert.equal(row.kind, "partnership");
  assert.equal(JSON.parse(row.details_json).resources, body.resources);
});

test("retry returns the same reference and never consumes quota or audit rows again", async () => {
  const f = fixture(); const body = input();
  const first = await onRequest({ request: request(body), env: f.env });
  const second = await onRequest({ request: request(body), env: f.env });
  assert.equal(first.status, 201); assert.equal(second.status, 200);
  assert.deepEqual(await first.json(), await second.json());
  assert.equal(count(f), 1); assert.deepEqual(rateCounts(f), [1, 1]);
  assert.equal(f.sqlite.prepare("SELECT COUNT(*) AS count FROM inquiry_audit").get().count, 1);
});

test("simultaneous same-key retries create exactly one lead", async () => {
  const f = fixture(); const body = input();
  const responses = await Promise.all(Array.from({ length: 12 }, () => onRequest({ request: request(body), env: f.env })));
  assert.equal(responses.filter((response) => response.status === 201).length, 1);
  assert.equal(responses.filter((response) => response.status === 200).length, 11);
  const references = await Promise.all(responses.map(async (response) => (await response.json()).reference));
  assert.equal(new Set(references).size, 1);
  assert.equal(count(f), 1); assert.deepEqual(rateCounts(f), [1, 1]);
});

test("same key with different content is a conflict, not a second or overwritten lead", async () => {
  const f = fixture(); const body = input();
  await onRequest({ request: request(body), env: f.env });
  const response = await onRequest({ request: request({ ...body, message: "Changed request content" }), env: f.env });
  assert.equal(response.status, 409);
  assert.equal((await response.json()).code, "IDEMPOTENCY_CONFLICT");
  assert.equal(count(f), 1); assert.deepEqual(rateCounts(f), [1, 1]);
});

test("concurrent unique requests cannot exceed five per minute", async () => {
  const f = fixture();
  const responses = await Promise.all(Array.from({ length: 15 }, () => onRequest({ request: request(), env: f.env })));
  assert.equal(responses.filter((response) => response.status === 201).length, 5);
  assert.equal(responses.filter((response) => response.status === 429).length, 10);
  assert.equal(count(f), 5); assert.deepEqual(rateCounts(f), [5, 5]);
  assert.equal(responses.find((response) => response.status === 429).headers.get("Retry-After"), "60");
});

test("daily quota is enforced atomically independently of minute window", async () => {
  const f = fixture();
  await onRequest({ request: request(), env: f.env });
  f.sqlite.exec("UPDATE inquiry_rate_limits SET count = CASE WHEN bucket_key LIKE '%:day' THEN 29 ELSE 0 END");
  const responses = await Promise.all(Array.from({ length: 4 }, () => onRequest({ request: request(), env: f.env })));
  assert.equal(responses.filter((response) => response.status === 201).length, 1);
  assert.equal(responses.filter((response) => response.status === 429).length, 3);
  assert.deepEqual(rateCounts(f), [30, 1]);
});

test("retries still succeed when the current IP quota is exhausted", async () => {
  const f = fixture(); const body = input();
  const initial = await onRequest({ request: request(body), env: f.env });
  f.sqlite.exec("UPDATE inquiry_rate_limits SET count = CASE WHEN bucket_key LIKE '%:day' THEN 30 ELSE 5 END");
  const retry = await onRequest({ request: request(body), env: f.env });
  assert.equal(retry.status, 200);
  assert.deepEqual(await retry.json(), await initial.json());
  assert.deepEqual(rateCounts(f), [30, 5]);
});

test("quota is keyed by the trusted proxy header, never JSON client IP", async () => {
  const f = fixture();
  for (let i = 0; i < 5; i++) assert.equal((await onRequest({ request: request(), env: f.env })).status, 201);
  assert.equal((await onRequest({ request: request(input({ clientIP: "198.51.100.2" })), env: f.env })).status, 400);
  assert.equal((await onRequest({ request: request(input(), { headers: { "CF-Connecting-IP": "198.51.100.2" } }), env: f.env })).status, 201);
});

test("all read and unsupported methods are rejected with no public lead data", async () => {
  const f = fixture();
  for (const method of ["GET", "HEAD", "OPTIONS", "DELETE", "PUT"]) {
    const response = await onRequest({ request: request(undefined, { method }), env: f.env });
    assert.equal(response.status, 405); assert.equal(response.headers.get("Allow"), "POST");
  }
  assert.equal(count(f), 0);
});

test("cross-origin, missing origin and cross-site requests fail closed", async () => {
  const f = fixture();
  for (const headers of [{ Origin: "https://evil.example" }, { Origin: undefined }, { Origin: "null" }, { Origin: "https://panovacuum.com.evil.example" }, { "Sec-Fetch-Site": "cross-site" }]) {
    assert.equal((await onRequest({ request: request(input(), { headers }), env: f.env })).status, 403);
  }
  assert.equal(count(f), 0);
});

test("only JSON is accepted", async () => {
  const f = fixture();
  for (const contentType of ["text/plain", "application/x-www-form-urlencoded", "multipart/form-data", "application/json; charset=iso-8859-1"]) {
    assert.equal((await onRequest({ request: request(input(), { headers: { "Content-Type": contentType } }), env: f.env })).status, 415);
  }
  assert.equal((await onRequest({ request: request(input(), { headers: { "Content-Type": "application/json; charset=utf-8" } }), env: f.env })).status, 201);
});

test("invalid input, honeypot and files never reach storage", async () => {
  const f = fixture();
  const invalid = [
    { privacy: false }, { privacy: "true" }, { requestKey: "not-a-uuid" }, { kind: "investor" }, { locale: "fr" },
    { company: "" }, { contact: 123 }, { company: [] }, { contact: "a".repeat(121) },
    { email: "bad@address" }, { email: "a@example.com\nBcc:evil@example.com" }, { message: "" }, { message: "x".repeat(3001) },
    { productType: "equipment" }, { productType: "" }, { website: "https://spam.example" },
    { kind: "partnership", partnershipType: "strategic", resources: "" },
    { kind: "partnership", partnershipType: "financial-only", resources: "Offers funds" },
    { nextStep: "send-secrets" }, { files: ["drawing.step"] }, { sourcePath: "https://evil.example/" },
    { sourcePath: "/en/request-a-quote/?email=person@example.com" },
    { source: { referrer: "https://example.com/private" } }, { source: { utm_source: "person@example.com" } },
    { source: { utm_source: [] } }, { message: "nul\u0000text" },
  ];
  for (const changes of invalid) {
    const response = await onRequest({ request: request(input(changes)), env: f.env });
    assert.equal(response.status, 400, JSON.stringify(changes));
  }
  for (const raw of ["{broken", "[]", "null", '"text"']) assert.equal((await onRequest({ request: request(undefined, { raw }), env: f.env })).status, 400);
  assert.equal(count(f), 0);
});

test("safe allowlisted campaign values are stored without arbitrary URLs", async () => {
  const f = fixture();
  const response = await onRequest({ request: request(input({ source: { utm_source: "industry-event", utm_campaign: "Chambers 2026" } })), env: f.env });
  assert.equal(response.status, 201);
  assert.deepEqual(JSON.parse(f.sqlite.prepare("SELECT source_json FROM inquiries").get().source_json), { utm_source: "industry-event", utm_campaign: "Chambers 2026" });
});

test("declared oversized and streamed oversized bodies are rejected", async () => {
  const f = fixture();
  assert.equal((await onRequest({ request: request(input(), { headers: { "Content-Length": "20000" } }), env: f.env })).status, 413);
  assert.equal((await onRequest({ request: request(undefined, { raw: " ".repeat(17000), headers: { "Content-Length": "5" } }), env: f.env })).status, 413);
  let cancelled = false;
  const streamed = new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(10000)); controller.enqueue(new Uint8Array(10000)); },
    cancel() { cancelled = true; },
  });
  const req = new Request(ORIGIN + "/api/inquiries", { method: "POST", headers: { Origin: ORIGIN, "Content-Type": "application/json", "CF-Connecting-IP": "192.0.2.15" }, body: streamed, duplex: "half" });
  assert.equal((await onRequest({ request: req, env: f.env })).status, 413);
  assert.equal(cancelled, true); assert.equal(count(f), 0);
});

test("missing bindings, missing or weak salt, and absent public proxy IP cannot produce success", async () => {
  const f = fixture();
  for (const env of [{}, { PANO_DB: f.db }, { PANO_DB: f.db, PANO_RATE_SALT: "short" }, { PANO_RATE_SALT: SALT }]) {
    const response = await onRequest({ request: request(), env });
    assert.equal(response.status, 503);
  }
  assert.equal((await onRequest({ request: request(input(), { headers: { "CF-Connecting-IP": undefined } }), env: f.env })).status, 503);
  assert.equal(count(f), 0);
});

test("only a literal local development host permits absent proxy IP", async () => {
  const f = fixture();
  for (const origin of ["http://127.0.0.1:8788", "http://localhost:8788"]) {
    const req = request(input(), { url: origin + "/api/inquiries", headers: { Origin: origin, "CF-Connecting-IP": undefined } });
    assert.equal((await onRequest({ request: req, env: f.env })).status, 201);
  }
  const deceptive = "https://localhost.attacker.example";
  assert.equal((await onRequest({ request: request(input(), { url: deceptive + "/api/inquiries", headers: { Origin: deceptive, "CF-Connecting-IP": undefined } }), env: f.env })).status, 503);
});

test("database errors roll back the inquiry and return a generic failure", async () => {
  const f = fixture(); f.failAt(2);
  const response = await onRequest({ request: request(), env: f.env });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { ok: false, code: "SERVICE_UNAVAILABLE" });
  assert.equal(count(f), 0); assert.deepEqual(rateCounts(f), []);
  assert.equal(f.sqlite.prepare("SELECT COUNT(*) AS count FROM inquiry_audit").get().count, 0);
});

test("migration is safe to reapply without losing an existing lead", async () => {
  const f = fixture();
  await onRequest({ request: request(), env: f.env });
  f.sqlite.exec(schema);
  assert.equal(count(f), 1);
});

test("CSV export blocks formulas and preserves quotes and newlines as data", () => {
  for (const value of ["=SUM(A1)", "+1+2", "@cmd", "-5+2", "  =1", "\t=1", "\nplain"]) assert.ok(csvCell(value).startsWith('"\''));
  assert.equal(csvCell('a"b\nc'), '"a""b\nc"');
  assert.equal(csvCell(null), '""');
  assert.equal(csvCell("Normal company"), '"Normal company"');
});

test("local CLI sends the documented D1 batch envelope with prepared parameters", async () => {
  const originalFetch = globalThis.fetch;
  const statements = [{ sql: "SELECT reference FROM inquiries WHERE company = ?", params: ["Company '; DROP TABLE inquiries; --"] }];
  let sent;
  globalThis.fetch = async (url, options) => {
    sent = { url, options };
    return new Response(JSON.stringify({ success: true, result: [{ success: true, results: [{ reference: "PANO-0123456789ABCDEF" }] }] }), { status: 200 });
  };
  try {
    const results = await queryDatabase("account-test", "database-test", { Authorization: "Bearer test-only" }, statements);
    assert.equal(sent.url, "https://api.cloudflare.com/client/v4/accounts/account-test/d1/database/database-test/query");
    assert.equal(sent.options.method, "POST");
    assert.deepEqual(JSON.parse(sent.options.body), { batch: statements });
    assert.equal(Array.isArray(JSON.parse(sent.options.body)), false);
    assert.deepEqual(results[0].results, [{ reference: "PANO-0123456789ABCDEF" }]);
  } finally { globalThis.fetch = originalFetch; }
});

test("local CLI rejects database failures without echoing provider error or customer content", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ success: false, errors: [{ message: "secret-token customer@example.com" }] }), { status: 200 });
  try {
    await assert.rejects(queryDatabase("account-test", "database-test", {}, [{ sql: "SELECT 1", params: [] }]), {
      message: "PANO database query failed. Check the database binding and migration.",
    });
  } finally { globalThis.fetch = originalFetch; }
});
