#!/usr/bin/env bash
# 大陆站（panovacuum.cn）发布：本地产物 → 腾讯云 VPS 的 nginx 静态目录。
#
# 背景：panovacuum.cn 的 DNS 在新网，A 记录指向 123.207.178.99（腾讯云 Ubuntu +
# nginx），不走 Cloudflare Pages；`PROJECT=panovacuum-cn node scripts/deploy.pages.mjs`
# 出来的部署在 pages.dev 上可用，但不会出现在主域名，所以 .cn 必须走这条 rsync 通道。
#
# 用法：pnpm build:cn && bash scripts/deploy.cn-server.sh
#   CN_HOST=root@123.207.178.99   目标主机（默认）
#   DIR=/tmp/out-cn               产物目录（默认；先用 cp -R out /tmp/out-cn 快照）
#   SKIP_BACKUP=1                 跳过服务器端 html 备份（默认会备份为 html.bak-<时间戳>）
#
# 注意：服务器上 /blog/ 是独立的 WordPress（/var/www/panovacuum-blog），
# 不在本脚本范围内；本站静态产物里的 /zh/blog/*、/en/blog/* 才是这里的文章页。
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${CN_HOST:-root@123.207.178.99}"
DIR="${DIR:-/tmp/out-cn}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/panovacuum.cn}"
noproxy() { env -u HTTP_PROXY -u HTTPS_PROXY -u ALL_PROXY -u http_proxy -u https_proxy -u all_proxy "$@"; }

[[ -f "$DIR/index.html" ]] || { echo "FATAL: $DIR 不像构建产物（缺 index.html）"; exit 1; }

echo "==> 产物自检"
node scripts/verify-out.mjs

echo "==> 服务器端备份"
if [[ "${SKIP_BACKUP:-0}" != "1" ]]; then
  noproxy ssh -o BatchMode=yes "$HOST" \
    "cd $REMOTE_DIR && ts=\$(date +%Y%m%d%H%M%S) && cp -a html html.bak-\$ts && echo backup: html.bak-\$ts"
fi

echo "==> rsync 到 $HOST:$REMOTE_DIR/html/"
noproxy rsync -az --delete --chown=www-data:www-data --stats "$DIR/" "$HOST:$REMOTE_DIR/html/"

echo "==> 线上抽验（字节哈希与本地一致才算成功）"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36"
for f in $(cd "$DIR/photos" && ls *.webp | head -3); do
  live=$(noproxy curl -s -A "$UA" "https://panovacuum.cn/photos/$f" | shasum -a256 | cut -c1-16)
  localhash=$(shasum -a256 "$DIR/photos/$f" | cut -c1-16)
  if [[ "$live" == "$localhash" ]]; then echo "OK   $f $live"; else echo "FAIL $f live=$live local=$localhash"; exit 1; fi
done

echo "==> done. https://panovacuum.cn/   回滚：服务器上 mv html.bak-<时间戳> html"
