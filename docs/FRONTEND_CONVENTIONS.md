# 前端兼容性约定（必读）

本站的访客大量来自微信、国内 Android 手机和机关/工厂的老旧电脑，**不能按"最新 Chrome 没问题"来写样式**。
2026-11-01 出过一次事故：首屏图片和视频在部分浏览器里整体消失，根因就是用了 `inset: 0` 简写。

## 目标浏览器

| 优先级 | 环境 | 引擎下限 |
| --- | --- | --- |
| P0 | 微信内置浏览器（X5） | Chromium 66–77 |
| P0 | 国内 Android 手机自带浏览器 / 旧 WebView | Chromium 66+ |
| P0 | iPhone Safari | iOS 14 及更早也需可用 |
| P1 | 桌面 Chrome / Edge | 87+ |
| P1 | 桌面 Safari | 14.1+ |

## 硬规则（`scripts/check-css-compat.mjs` 会在 `pnpm build` 前强制拦截）

1. **禁止 `inset` 简写**，改写成 `top: 0; right: 0; bottom: 0; left: 0;`
   —— `inset` 需要 Chrome 87+ / Safari 14.1+，微信 X5 直接忽略 → 绝对定位元素高度算成 0，整块内容消失。
2. **禁止 `:has()`、`color-mix()`、`light-dark()`** —— 引擎太新，旧机型直接不生效。
3. **`aspect-ratio`、`text-wrap: balance`、flex `gap` 属降级项**：能用，但关键布局必须另有兜底
   （例如图片容器给 `padding-top` 比例、间距给 `margin`），不能只依赖它们。

## 首屏（hero）分层约定

`app/home.css` 的 hero 是三明治结构，改的时候别拆：

```
.hero-media          position: absolute + 长写定位，铺满首屏
├── img.hero-poster  静态底图，z-index: 0，常显（视频挂了也有画面）
├── video.hero-video 循环视频，z-index: 1，盖在底图上
└── ::after          渐变遮罩，z-index: 2，保证文字对比度
```

- 视频用 `autoplay muted loop playsinline`，**不要**给它加 `poster` 属性（与底图重复，白下载 200KB+）。
- 底图必须带 `srcSet`（1440 / 1280 两档）+ `sizes="100vw"`，手机别下 1440 的图。
- 验证方法：Chrome DevTools → Network 里阻止 `*.mp4`，刷新后首屏仍应有实拍画面。

## 视觉回归自测（改完 hero / 首页必做）

用无头 Chrome 打 `--remote-debugging-port=9223`，量以下值，别只看截图"感觉没问题"：

- 宽度 390 / 768 / 1024 / 1440 四档：`.hero` 高度 > 500，`.hero-video` 与 `.hero-poster` 都是 `display:block`
  且宽高等于容器（不是 0）；`document.scrollingElement.scrollWidth === clientWidth`（无横向溢出）。
- 屏蔽 `*.mp4` 再测一次，`img.hero-poster` 的 `naturalWidth > 0`。

## 发布通道

1. `pnpm build`（.com）或 `pnpm build:cn`（.cn，会注入 `SITE_BASE_URL=https://panovacuum.cn`）。
2. **先快照产物再部署**：`cp -R out /tmp/out-com`（并发会话可能重跑构建覆盖 `out/`，用快照部署可避免把 .cn 的 canonical 发到 .com）。
3. `set -a; source ~/.secrets/cf.env; set +a` 后
   `DIR=/tmp/out-com node scripts/deploy.pages.mjs`（.cn 加 `PROJECT=panovacuum-cn`）。
4. 部署后必须核对：线上 HTML 的 canonical 域名、`/_next/static/css/*` 里新规则是否生效、`curl` 各主要路径 200。
