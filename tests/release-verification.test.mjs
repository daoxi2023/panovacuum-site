import assert from "node:assert/strict";
import test from "node:test";
import { verifyInquiryHandler } from "../scripts/verify-live-inquiries.mjs";

const origin = "https://panovacuum.com";
const expectedBody = { ok: false, code: "METHOD_NOT_ALLOWED" };
const expectedHeaders = { "content-type": "application/json; charset=utf-8", allow: "POST" };
const response = (body = expectedBody, status = 405, headers = expectedHeaders) =>
  new Response(typeof body === "string" ? body : JSON.stringify(body), { status, headers });

// Every call injects a fake fetch; none of these tests contacts production.
test("accepts the expected handler response using only a read-only GET", async () => {
  let calls = 0;
  await verifyInquiryHandler(origin, async (url, init) => {
    calls++;
    assert.equal(url.href, `${origin}/api/inquiries`);
    assert.equal(init.method, "GET");
    assert.equal(init.redirect, "error");
    assert.equal(init.headers.Accept, "application/json");
    assert.equal(init.body, undefined);
    assert.ok(init.signal instanceof AbortSignal);
    return response();
  });
  assert.equal(calls, 1);
});

test("rejects an HTML homepage falsely returned with HTTP 200", async () => {
  await assert.rejects(
    verifyInquiryHandler(origin, async () => response("<html>Home</html>", 200, { "content-type": "text/html" })),
    /expected 405 JSON, received 200/,
  );
});

test("rejects HTTP 404 even when it contains JSON", async () => {
  await assert.rejects(
    verifyInquiryHandler(origin, async () => response({}, 404)),
    /expected 405 JSON, received 404/,
  );
});

test("rejects an unexpected JSON body", async () => {
  await assert.rejects(
    verifyInquiryHandler(origin, async () => response({ ok: true, code: "METHOD_NOT_ALLOWED" })),
    /unexpected response/,
  );
});

test("rejects a handler response missing the Allow POST header", async () => {
  await assert.rejects(
    verifyInquiryHandler(origin, async () => response(expectedBody, 405, { "content-type": "application/json" })),
    /unexpected response/,
  );
});

test("rejects an insecure origin before making any request", async () => {
  let calls = 0;
  await assert.rejects(
    verifyInquiryHandler("http://panovacuum.com", async () => { calls++; return response(); }),
    /requires HTTPS/,
  );
  assert.equal(calls, 0);
});
