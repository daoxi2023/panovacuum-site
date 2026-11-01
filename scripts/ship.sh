#!/usr/bin/env bash
# 生产发布：构建 → 产物自检 → 直传 Cloudflare Pages（panovacuum.com）。
# 唯一生产通道。GitHub Actions 只做构建检查，不再发布到 github.io。
set -euo pipefail
cd "$(dirname "$0")/.."

noproxy() { env -u HTTP_PROXY -u HTTPS_PROXY -u ALL_PROXY -u http_proxy -u https_proxy -u all_proxy "$@"; }

echo "==> build"
noproxy pnpm build

echo "==> verify out/"
node scripts/verify-out.mjs

echo "==> deploy"
set -a; . "${CF_ENV_FILE:-$HOME/.secrets/cf.env}"; set +a
noproxy node scripts/deploy.pages.mjs

echo "==> done. 站点：https://panovacuum.com  回滚：Cloudflare Pages → Deployments 选上一版"
