#!/usr/bin/env bash
# 生产发布：构建 → 产物自检 → 直传 Cloudflare Pages（panovacuum.com）。
# 唯一生产通道。GitHub Actions 只做构建检查，不再发布到 github.io。
set -euo pipefail
cd "$(dirname "$0")/.."

noproxy() { env -u HTTP_PROXY -u HTTPS_PROXY -u ALL_PROXY -u http_proxy -u https_proxy -u all_proxy "$@"; }

echo "==> build"
noproxy npm run build

echo "==> verify out/"
node scripts/verify-out.mjs

echo "==> deploy"
set -a; . "${CF_ENV_FILE:-$HOME/.secrets/cf.env}"; set +a
# Wrangler compiles functions/ and uploads the inquiry handler with the assets.
# Map the existing credential names without printing their values.
if [[ -n "${CF_API_KEY:-}" && -n "${CF_EMAIL:-}" ]]; then
  export CLOUDFLARE_API_KEY="$CF_API_KEY"
  export CLOUDFLARE_EMAIL="$CF_EMAIL"
fi
# Select the existing project account explicitly; never prompt or guess an account.
export CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_ACCOUNT_ID="$(node --input-type=module <<'NODE'
import { readFileSync } from "node:fs";
let account = process.env.CLOUDFLARE_ACCOUNT_ID;
if (!account) {
  try { account = JSON.parse(readFileSync(".pano-platform.local.json", "utf8")).account_id; }
  catch { /* Report one actionable error without revealing file contents. */ }
}
if (typeof account !== "string" || !/^[0-9a-f]{32}$/i.test(account)) {
  console.error("Missing or invalid Cloudflare account: set CLOUDFLARE_ACCOUNT_ID or restore .pano-platform.local.json account_id before deploying.");
  process.exit(1);
}
process.stdout.write(account);
NODE
)"
noproxy node node_modules/wrangler/bin/wrangler.js pages deploy out/ --project-name pano-vacuum --branch main

echo "==> verify production inquiry handler"
noproxy node scripts/verify-live-inquiries.mjs https://panovacuum.com

echo "==> done. 站点：https://panovacuum.com  回滚：Cloudflare Pages → Deployments 选上一版"
