import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { notifyReference, notifyPending } from "../lib/inquiry-notifications.ts";
import worker from "../workers/inquiry-notifier.ts";
const REF = "PANO-0123456789ABCDEF";
function fixture(company = "SECRET COMPANY", kind = "quote", status = "new") {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(readFileSync(new URL("../migrations/0001_inquiries.sql", import.meta.url), "utf8"));
  sqlite.prepare(`INSERT INTO inquiries (reference, request_key, request_fingerprint, kind, locale, company, contact, email, message, consent_at, created_at, updated_at, status)
    VALUES (?, ?, 'hash', ?, 'en', ?, 'SECRET PERSON', 'secret@example.com', 'SECRET DRAWINGS', '2026-11-01', '2026-11-01', '2026-11-01', ?)`).run(REF, REF, kind, company, status);
  const queries=[];
  const db = {
    prepare(sql) { queries.push(sql); return { sql, params:[], bind(...params) {this.params=params;return this;} }; },
    async batch(statements) {
      sqlite.exec('BEGIN IMMEDIATE');
      try { const results=statements.map(s=>({success:true,results:sqlite.prepare(s.sql).all(...s.params)}));sqlite.exec('COMMIT');return results; }
      catch(e){sqlite.exec('ROLLBACK');throw e;}
    },
  };
  const env={PANO_DB:db,PANO_NOTIFY_BOT_TOKEN:'123456:test_only_fake_token',PANO_NOTIFY_CHAT_ID:'123456'};
  const requests=[];
  const fetcher=async(url,init)=>{requests.push({url,init});return new Response(JSON.stringify({ok:true,result:{chat:{id:123456}}}),{status:200});};
  const actions=()=>sqlite.prepare('SELECT action FROM inquiry_audit ORDER BY id').all().map(r=>r.action);
  return {sqlite,env,requests,fetcher,actions,queries};
}
test('missing config and group chat are skipped without network or audit',async()=>{
 const f=fixture();for(const env of [{PANO_DB:f.env.PANO_DB},{...f.env,PANO_NOTIFY_CHAT_ID:'-123456'}]) await notifyReference(env,REF,f.fetcher);
 assert.deepEqual(f.actions(),[]);assert.equal(f.requests.length,0);
});
test('confirmed private alert contains no customer data and persists sent',async()=>{
 const f=fixture();await notifyReference(f.env,REF,f.fetcher);
 assert.deepEqual(f.actions(),['notification_claimed','notification_sent']);assert.equal(f.requests.length,1);
 const {url,init}=f.requests[0];assert.equal(new URL(url).hostname,'api.telegram.org');assert.equal(init.method,'POST');assert.equal(init.headers['User-Agent'],'PANO-private-notifier/1.0');assert.equal(init.redirect,'manual');assert.ok(init.signal instanceof AbortSignal);
 const body=JSON.parse(init.body);assert.equal(body.chat_id,'123456');assert.match(body.text,/帕诺 PANO/);assert.match(body.text,/新询价/);assert.ok(body.text.includes(REF));
 for(const secret of ['SECRET COMPANY','SECRET PERSON','secret@example.com','SECRET DRAWINGS'])assert.equal(init.body.includes(secret),false);
 assert.equal(f.queries.some(q=>/SELECT \*/.test(q)),false);
});
test('repeat and simultaneous callers send one alert for same reference',async()=>{
 const f=fixture();await Promise.all(Array.from({length:8},()=>notifyReference(f.env,REF,f.fetcher)));await notifyPending(f.env,f.fetcher);
 assert.equal(f.requests.length,1);assert.equal(f.actions().filter(a=>a==='notification_sent').length,1);
});
test('provider failure is persisted generically, then retried after expired claim',async()=>{
 const f=fixture();await notifyReference(f.env,REF,async()=>{throw Error('sensitive token detail');});
 assert.deepEqual(f.actions(),['notification_claimed','notification_failed']);
 assert.equal(JSON.stringify(f.sqlite.prepare('SELECT note FROM inquiry_audit').all()).includes('sensitive'),false);
 await notifyPending(f.env,f.fetcher);assert.equal(f.requests.length,0);
 f.sqlite.prepare("UPDATE inquiry_audit SET created_at='2000-01-01T00:00:00.000Z' WHERE action='notification_claimed'").run();
 await notifyPending(f.env,f.fetcher);assert.equal(f.requests.length,1);assert.equal(f.actions().at(-1),'notification_sent');
});
test('wrong destination acknowledgement is never marked sent',async()=>{
 const f=fixture();await notifyReference(f.env,REF,async()=>new Response(JSON.stringify({ok:true,result:{chat:{id:654321}}}),{status:200}));
 assert.deepEqual(f.actions(),['notification_claimed','notification_failed']);
});
test('closed records and invalid references cannot generate alerts',async()=>{
 const f=fixture('SECRET COMPANY','quote','closed');await notifyReference(f.env,REF,f.fetcher);await notifyPending(f.env,f.fetcher);await notifyReference(f.env,'invalid',f.fetcher);
 assert.equal(f.requests.length,0);assert.deepEqual(f.actions(),[]);
});
test('QA record explicitly marks test and partnership kind',async()=>{
 const f=fixture('Website QA test only','partnership');await notifyReference(f.env,REF,f.fetcher);
 const body=JSON.parse(f.requests[0].init.body);assert.match(body.text,/测试提醒/);assert.match(body.text,/产业合作/);assert.equal(body.text.includes('Website QA test only'),false);
});
test('scheduled batch is capped at twenty and has no public read endpoint',async()=>{
 const f=fixture();for(let i=1;i<25;i++){
  const ref=`PANO-${i.toString(16).toUpperCase().padStart(16,'0')}`;
  f.sqlite.prepare('INSERT INTO inquiries SELECT ?, ?, request_fingerprint, kind, locale, company, contact, email, country, product_type, partnership_type, message, details_json, source_path, source_json, consent_at, created_at, updated_at, status, followup_at, note FROM inquiries WHERE reference=?').run(ref,ref,REF);
 }
 await notifyPending(f.env,f.fetcher);assert.equal(f.requests.length,20);assert.equal(worker.fetch().status,404);
});

test('failure audit retains only safe categories, never provider body or error details', async () => {
 const cases = [
  ['redirect-blocked', async () => new Response(null, { status:302, headers:{Location:'https://untrusted.example/'} })],
  ['http-401', async () => new Response('SECRET PROVIDER TOKEN BODY', { status:401 })],
  ['response-invalid', async () => new Response('SECRET INVALID JSON', { status:200 })],
  ['chat-mismatch', async () => new Response(JSON.stringify({ok:true,result:{chat:{id:654321}}}))],
  ['network-error', async () => { throw new Error('SECRET URL TOKEN'); }],
  ['network-typeerror', async () => { throw new TypeError('SECRET URL TOKEN'); }],
  ['unsupported-timeout', async () => { throw new TypeError('AbortSignal.timeout is not a function'); }],
  ['fetch-binding', async () => { throw new TypeError('Illegal invocation'); }],
  ['network-connection', async () => { throw new Error('Network connection lost'); }],
  ['timeout', async () => { throw new DOMException('SECRET TIMEOUT DETAIL', 'TimeoutError'); }],
 ];
 for (const [category, fetcher] of cases) {
  const f=fixture();await notifyReference(f.env,REF,fetcher);
  const rows=f.sqlite.prepare("SELECT note FROM inquiry_audit WHERE action='notification_failed'").all();
  assert.equal(rows.length,1);assert.equal(rows[0].note,`Delivery not confirmed (${category}); retry after claim expiry.`);
  assert.equal(rows[0].note.includes('SECRET'),false);assert.equal(f.actions().includes('notification_sent'),false);
 }
});
