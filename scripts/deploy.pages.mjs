#!/usr/bin/env node
// CF Pages Direct Upload deployer v3 — mirrors wrangler's exact flow.
// 1) GET  upload-token            -> jwt
// 2) POST /pages/assets/check-missing  -> hashes not yet in the asset store
// 3) POST /pages/assets/upload         -> [{key:hash, value:b64, metadata:{contentType}, base64:true}]
// 4) POST /pages/assets/upsert-hashes  -> remember hashes
// 5) POST deployments with multipart manifest = JSON.stringify({"/path": hash}), _headers, _redirects, branch
// Hash: blake3(base64(content) + extWithoutDot).hex[:32]  (same as wrangler hashFile)
// Env: CF_EMAIL + CF_API_KEY  (set -a; source ~/.secrets/cf.env; set +a)
import { execFileSync } from "node:child_process";
import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const PY = process.env.PY || "/Applications/DSH Desktop.app/Contents/Resources/office-runtime/primary-runtime/dependencies/python/bin/python3";
const ACCOUNT = process.env.ACCOUNT || "52f4485870412521350f5d13b61e410d";
const PROJECT = process.env.PROJECT || "pano-vacuum";
const BRANCH = process.env.BRANCH || "main";
const API = "https://api.cloudflare.com/client/v4";

// wrangler's validate IGNORE_LIST: these are not assets
const IGNORE = [
  /^_worker\.js$/,
  /^_redirects$/,
  /^_headers$/,
  /^_routes\.json$/,
  /^functions(\/|$)/,
  /^\.DS_Store$/,
  /^node_modules(\/|$)/,
  /^\.git(\/|$)/,
  /^\.wrangler(\/|$)/,
];

const MIME = {
  ".html": "text/html; charset=utf-8", ".htm": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json", ".map": "application/json",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8", ".xml": "text/xml", ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".mp4": "video/mp4",
  ".avif": "image/avif", ".pdf": "application/pdf",
};

const HASH_SCRIPT = `
import blake3, base64, sys
data = sys.stdin.buffer.read()
b64 = base64.b64encode(data).decode()
print(blake3.blake3((b64 + sys.argv[1]).encode()).hexdigest()[:32])
`;

function hashOf(buf, rel) {
  const ext = path.extname(rel).substring(1); // no leading dot, matches wrangler
  return execFileSync(PY, ["-c", HASH_SCRIPT, ext], { input: buf, encoding: "utf8" }).trim();
}

function authHeaders(extra = {}) {
  return { "X-Auth-Email": process.env.CF_EMAIL, "X-Auth-Key": process.env.CF_API_KEY, ...extra };
}

async function cfJson(url, init) {
  const res = await fetch(url, init);
  const j = await res.json().catch(() => null);
  if (!j?.success) throw new Error(`${init?.method || "GET"} ${url} -> ${JSON.stringify(j?.errors || j)}`);
  return j.result;
}

async function main() {
  const dir = path.resolve(process.env.DIR || process.argv[2] || path.resolve(process.cwd(), "out"));
  if (!existsSync(dir)) throw new Error(`DIR not found: ${dir}`);
  console.log(`DIR=${dir}  PROJECT=${PROJECT}  ACCOUNT=${ACCOUNT}  BRANCH=${BRANCH}`);

  // ---- 1. collect + hash
  const files = [];
  (function walk(p) {
    for (const name of readdirSync(p)) {
      const fp = path.join(p, name);
      const rel = path.relative(dir, fp).split(path.sep).join("/");
      if (IGNORE.some((re) => re.test(rel))) continue;
      if (statSync(fp).isDirectory()) walk(fp);
      else files.push(rel);
    }
  })(dir);
  files.sort();

  const entries = [];
  for (const rel of files) {
    const buf = await readFile(path.join(dir, rel));
    entries.push({ rel, buf, hash: hashOf(buf, rel), ct: MIME[path.extname(rel).toLowerCase()] || "application/octet-stream" });
  }
  const byHash = new Map();
  for (const e of entries) if (!byHash.has(e.hash)) byHash.set(e.hash, e);
  console.log(`files: ${entries.length}  unique hashes: ${byHash.size}`);

  // ---- 2. jwt
  const { jwt } = await cfJson(`${API}/accounts/${ACCOUNT}/pages/projects/${PROJECT}/upload-token`, { headers: authHeaders() });
  const bearer = { Authorization: `Bearer ${jwt}` };

  // ---- 3. check-missing
  let missing;
  try {
    missing = await cfJson(`${API}/pages/assets/check-missing`, {
      method: "POST",
      headers: { ...bearer, "Content-Type": "application/json" },
      body: JSON.stringify({ hashes: [...byHash.keys()] }),
    });
  } catch (e) {
    console.warn("check-missing failed, uploading all:", e.message);
    missing = [...byHash.keys()];
  }
  const missingSet = new Set(missing);
  const toUpload = [...byHash.values()].filter((e) => missingSet.has(e.hash));
  console.log(`to upload: ${toUpload.length} / ${byHash.size}`);

  // ---- 4. upload in small batches (base64 payloads can get big)
  const BATCH_FILES = 12;
  for (let i = 0; i < toUpload.length; i += BATCH_FILES) {
    const batch = toUpload.slice(i, i + BATCH_FILES);
    const payload = batch.map((e) => ({
      key: e.hash,
      value: e.buf.toString("base64"),
      metadata: { contentType: e.ct },
      base64: true,
    }));
    await cfJson(`${API}/pages/assets/upload`, {
      method: "POST",
      headers: { ...bearer, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(`uploaded ${Math.min(i + BATCH_FILES, toUpload.length)}/${toUpload.length}`);
  }

  // ---- 5. upsert-hashes (best effort)
  if (toUpload.length) {
    try {
      await cfJson(`${API}/pages/assets/upsert-hashes`, {
        method: "POST",
        headers: { ...bearer, "Content-Type": "application/json" },
        body: JSON.stringify({ hashes: toUpload.map((e) => e.hash) }),
      });
    } catch (e) {
      console.warn("upsert-hashes failed (non-fatal):", e.message);
    }
  }

  // ---- 6. create deployment: manifest maps "/path" -> hash
  const manifest = {};
  for (const e of entries) manifest[`/${e.rel}`] = e.hash;

  const fd = new FormData();
  fd.append("manifest", JSON.stringify(manifest));
  fd.append("branch", BRANCH);
  if (existsSync(path.join(dir, "_headers"))) {
    const b = readFileSync(path.join(dir, "_headers"));
    fd.append("_headers", new Blob([b]), "_headers");
  }
  if (existsSync(path.join(dir, "_redirects"))) {
    const b = readFileSync(path.join(dir, "_redirects"));
    fd.append("_redirects", new Blob([b]), "_redirects");
  }

  const dep = await cfJson(`${API}/accounts/${ACCOUNT}/pages/projects/${PROJECT}/deployments`, {
    method: "POST",
    headers: authHeaders(),
    body: fd,
  });
  const deploymentId = dep.id;
  console.log("deployment:", deploymentId, "url:", dep.url);

  // ---- 7. poll
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const d = await cfJson(`${API}/accounts/${ACCOUNT}/pages/projects/${PROJECT}/deployments/${deploymentId}`, { headers: authHeaders() });
    const ls = d.latest_stage;
    const ok = ls?.name === "deploy" && ls?.status === "success";
    if (ok) { console.log("STATUS: success"); console.log("aliases:", JSON.stringify(d.aliases)); return; }
    if (ls?.status === "failure" || d.status === "failure" || d.status === "cancelled") {
      throw new Error("deploy failed: " + JSON.stringify(ls || d.error || {}));
    }
    if (i % 3 === 0) console.log("polling...", ls?.name, ls?.status);
  }
  throw new Error("deploy timeout");
}

main().catch((e) => { console.error("FATAL:", e.message); process.exit(1); });
