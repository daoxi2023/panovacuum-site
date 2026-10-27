# panovacuum-site — PANO Vacuum 官网

PANO Vacuum（帕诺真空 · panovacuum.com）独立品牌官网。中英双语，面向国内 + 海外获客。

- **技术栈**：Next.js 15（App Router）+ TypeScript + 原生 CSS 设计令牌（ADR-001：Next.js + CF Pages 静态优先，私有 R2 + Turnstile 后续接入）
- **路线**：`/en`（English）· `/zh`（中文）· `/llms.txt` · `/robots.txt` · `/sitemap.xml`

## 本地运行

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 生产构建
pnpm typecheck
```

## 结构

```
app/
├─ [locale]/            # 双语根布局（html lang 按语言）+ 静态参数 en/zh
│  ├─ layout.tsx        # 头/脚组件 + 每语言 metadata（hreflang 交替）
│  ├─ page.tsx          # 首页（中英文案同文件分支，来源 docs/COPY_EN_ZH）
│  └─ request-a-quote/  # 询价页（Phase 1 骨架表单，上传/安全传输下一阶段）
├─ components/          # header.tsx · footer.tsx（语言切换）
├─ globals.css          # 设计令牌（--pano-primary #0B2035 / --pano-accent #1679B9）
├─ llms.txt/route.ts    # llms.txt（AI 索引）
├─ robots.ts · sitemap.ts
```

## 状态（2026-10-27 Phase 1 骨架）

- 文案为草稿：所有数字/认证/案例待 `claims_registry` 证据核准后才可上线（"无证据不上站"）
- 询价表单为骨架占位；通知邮箱、Turnstile、R2 上传在后续阶段接入
- 托管：Cloudflare Pages（构建 `pnpm build`，输出 `.next`）；生产域名 panovacuum.com

内部资料（audit/claims/docs/research 全量）留在 LTU 资料目录，不随本仓库发布。