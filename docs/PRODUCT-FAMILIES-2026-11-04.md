# 产品族页面（2026-11-04）

总览页 `/products/` 于 2026-11-04 上线；六族详情页 `/products/<family>/` 同日上线。本文只记路由、数据源与互链位置，避免下次改动漏掉其中一环。

## 路由

| 路径 | 文件 | 说明 |
| --- | --- | --- |
| `/[locale]/products/` | `app/[locale]/products/page.tsx` | 总览，6 张卡片，卡片链到族详情 |
| `/[locale]/products/<family>/` | `app/[locale]/products/[family]/page.tsx` | 族详情，`generateStaticParams()` 生成 6 条，`dynamicParams=false` |

`<family>` 六个值（顺序即页面展示顺序）：

1. `cylindrical-vacuum-chambers` — 圆柱形真空腔体
2. `rectangular-vacuum-chambers` — 方形真空腔体
3. `large-horizontal-chambers` — 大型卧式真空腔体
4. `vacuum-furnace-chambers` — 真空炉与热处理腔体
5. `coating-process-chambers` — 镀膜与沉积工艺腔体
6. `flange-feedthrough-components` — 法兰、馈通与密封组件

样式在 `app/[locale]/products/products.css`（总览与详情共用；详情页额外用到 `.spec-table`、`.faq-list`、`.related-grid`）。

## 数据源

- `lib/products.ts` — `productFamilies`：slug、卡片图（image/iw/ih）与双语 `{name, tagline, points[3], alt}`。**总览页与详情页共用同一张图**，详情页不再新增素材。
- `lib/product-details.ts` — `familyDetails`：双语 `{intro, sections[3], specs[6 对], faq[3], articles[2], service}`。三段固定为「怎么造 / 接口与配合 / 怎么验收」。

## 口径（合规硬约束）

- 规格表只写可确认范围，尺寸/公差/板厚/法兰标准一律「以图纸评审为准」，不写型号、不承诺整机真空度与温控指标。
- FAQ 不保证方形腔不变形、不保证炉内温度均匀性、不保证洁净度等级；交期不在页面写死。
- 详情页 JSON-LD 为 `Product`（不带 offers）+ `FAQPage` + `BreadcrumbList`；`Product` 只声明材料、品类、品牌、制造方。
- OG 图全部取真图（见 `scripts/gen-og-images.py` 的 `product-*` 条目），AI 占位图不进 OG。

## 互链位置（改动时别只改一处）

- `app/components/header.tsx` — 两个语种的导航各一条「产品 / Products」。
- `app/[locale]/page.tsx` — 首页 `#capabilities` 段的 `.growth-service-links` 第四条。
- `app/[locale]/case-studies/page.tsx` — `p.case-note` 之后的产品族链接段。
- `app/[locale]/manufacturing/[service]/page.tsx` — 相关链接行末尾。
- `app/[locale]/products/[family]/page.tsx` — related 卡（对应制造服务页 + 2 篇文章）与其余 5 族链接。
- `app/sitemap.ts` — `productFamilies.map(...)` 生成 6 条；`scripts/gen-llms.mjs` 有 Product families 一行。

## 图片复用

详情页用图与总览页完全一致：

| 族 | 图片 | 来源 |
| --- | --- | --- |
| cylindrical | `custom-vacuum-chamber-304l-stainless-1200w.webp` | 实拍 |
| rectangular | `case-custom-square-chamber-1200w.webp` | AI 占位（方形腔真图缺） |
| large-horizontal | `multi-ton-304l-vacuum-chamber-1600w.webp` | 实拍 |
| vacuum-furnace | `product-vacuum-furnace-chamber-1200w.webp` | AI 占位 |
| coating-process | `product-coating-process-chamber-1200w.webp` | AI 占位 |
| flange-feedthrough | `uhv-feedthrough-flange-assembly-1600w.webp` | 实拍 |

AI 占位图的性质见 `docs/AI-PLACEHOLDER-2026-11-04.md`：不得当纪实素材对外宣称，真图到位后按新文件名替换并同步 `lib/products.ts`。

## 发布

与全站一致：`.com` 走 `scripts/deploy.pages.mjs`（CF Pages Direct Upload），`.cn` 走 `scripts/deploy.cn-server.sh`（腾讯云 VPS rsync + 线上字节抽验）。两次发布都要先 `verify-out.mjs` 通过。
