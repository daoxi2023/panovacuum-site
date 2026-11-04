# 帕诺真空 · 全站图片/视频命名规范与清单

> 生成日期 2026-11-03 · 仓库 `/Users/mac/panovacuum-site` · 基线 commit `677ff29`  
> 覆盖 `panovacuum.com` 与 `panovacuum.cn`（实测两域名素材字节完全一致，一套文件、两套 alt）

## 结论摘要

- `public/` 共 59 个文件，其中素材 54 个、非素材 5 个。
- 需改名 **36** 条，需删除 **14** 个孤儿文件（1,688,577 B ≈ 1.61 MB），需新增 **26** 项。
- `og:image`：13 个页面缺失，其余 22 个共用同一张默认图。
- 内容图文件名几乎全部是内部代号（`hero-main` / `cap-*` / `news-*` / `workshop-*` / `chamber-050`），关键词为零。

## 命名规范

| # | 规则 | 说明 | 正例 / 反例 |
|---|---|---|---|
| 1 | 字符集 | 只允许小写字母、数字、连字符 - 和必要的路径分隔符 /。 | √ photos/vacuum-chamber-workshop-changshu-1440w.webp / × VacuumChamber_车间图 最终版.webp |
| 2 | 分隔符 | 只用连字符 -。禁止下划线 _、空格、点、驼峰、中文。 | √ helium-leak-test / × helium_leak_test / heliumLeakTest |
| 3 | 词序 | 业务关键词在最前，限定词在后，最后才是宽度。搜索引擎对文件名前段权重更高，AI 抓取也更容易切词。 | √ custom-vacuum-chamber-304l-stainless-1200w.webp / × 1200w-304l-custom-vacuum-chamber.webp |
| 4 | 长度 | 3–6 个词（宽度段不计），整个文件名 ≤ 60 字符。 | √ cmm-inspection-vacuum-component-720w.webp (42) / × our-factory-vacuum-chamber-manufacturing-workshop-photo-001.webp |
| 5 | 宽度后缀 | 位图统一以 -<真实像素宽>w 结尾（如 -1280w），放在扩展名前。不用 -2x / -small / -big / -thumb。 | √ ...-1440w.webp + ...-1280w.webp / × ...-2x.webp / ...-small.webp |
| 6 | 视频命名 | 同一支视频的所有分辨率共用主干，只改分辨率段 -<宽>x<高>。 | √ vacuum-chamber-manufacturing-loop-1920x1080.mp4 /   vacuum-chamber-manufacturing-loop-1280x720.mp4 |
| 7 | 禁用词 | img / photo / pic / image / picture / hero / cap / news / final / last / new / copy / test / DSC / IMG / 未命名 / 最终 / 图1 / 1 / 2 / 3。 | 这些词不携带任何检索信息，占了文件名最值钱的前缀位。 |
| 8 | 品牌前缀 | 只给品牌资产（logo / wordmark / og / 二维码 / 图标）加 pano-vacuum- 前缀。内容图不加，避免每张图前缀重复、关键词后移。 | √ pano-vacuum-logo-324w.webp / √ vacuum-chamber-workshop-changshu-1440w.webp / × pano-vacuum-chamber-inspection.webp |
| 9 | 一套文件两语言 | .com 与 .cn 共用同一份图片文件，语言差异只体现在 alt 与 JSON-LD 文案上，绝不为了中文另存一份 zh-xxx.webp。 | 同一张图两套文件名 = 重复内容 + 双倍维护 + 两套缓存。已在线上核验：两域名返回的字节完全一致。 |
| 10 | 合作方 logo | 统一 partner-logo-<slug>.webp，slug 来自 lib/partners.ts（唯一事实来源）。 | √ partner-logo-hengyue-vacuum.webp / × hengyue-vacuum.webp (会被当成产品图) |
| 11 | alt 文案 | alt 必须写「看到了什么 + 对业务意味着什么」，中文 15–35 字、英文 ≤ 125 字符；禁止与文件名逐字重复，禁止堆关键词。 | √ 定制真空腔体成品，304L 不锈钢 / × 真空腔体 真空腔体厂家 真空腔体定制 |
| 12 | 文件名即实体 | 同名文件 = 同一实体。一个文件被 5 个页面复用时，它就是这 5 个页面共享的实体，要在 JSON-LD 里被显式引用（Organization.image / Service.image / Article.image）。 | 命名对不上，AI 搜索就无法把「图」和「能力/产品/文章」关联起来，GEO 拿不到引用。 |

## 改名映射表

| 优先级 | 现在 | 建议 | 需改文件 | 为什么 |
|---|---|---|---|---|
| P1 | `/pano-vacuum-tech-logo.webp` | `/pano-vacuum-logo-324w.webp` | app/layout.tsx (JSON-LD logo) · app/[locale]/blog/[slug]/page.tsx (publisher.logo) · app/components/header.tsx · app/components/footer.tsx | 去掉冗余 tech；把像素宽度写进文件名。品牌名仍是 PANO Vacuum，商标全称在公司信息里。 |
| P1 | `/pano-vacuum-tech-logo-2x.webp` | `/pano-vacuum-logo-648w.webp` | app/components/header.tsx · app/components/footer.tsx | -2x 是 DPR 写法，只有懂的人看得懂；统一改成 -648w（真实像素宽）。 |
| P1 | `/brand-wordmark.webp` | `/pano-vacuum-wordmark-896w.webp` | app/globals.css (.brand-word mask url) | 补品牌前缀；wordmark 与 logo 区分开（纯字标 vs 图形标）。 |
| P1 | `/og-image.webp` | `/pano-vacuum-og-default-1200x630.webp` | app/[locale]/layout.tsx (ogImage) | og:image 要能一眼看出用途和尺寸；同时新增每页专属 OG（见 05 表）。 |
| P1 | `/wechat-qr.webp` | `/pano-vacuum-wechat-qr-zhouyou-480w.webp` | app/components/footer.tsx · app/[locale]/request-a-quote/page.tsx | 二维码属于联系人资产，写清是谁的、多大，避免被当成产品图收录。 |
| P0 | `/photos/hero-main.webp` | `/photos/vacuum-chamber-workshop-changshu-1440w.webp` | app/[locale]/page.tsx (hero img + srcSet) | 首屏主图。原文件名 hero-main 零关键词。新名 = 主体 + 场景 + 地点 + 宽度。 |
| P0 | `/photos/hero-main-1280.webp` | `/photos/vacuum-chamber-workshop-changshu-1280w.webp` | app/[locale]/page.tsx (srcSet) | 与上图同一主干的窄屏变体，只改宽度段。 |
| P0 | `/photos/hero-chamber.webp` | `/photos/custom-vacuum-chamber-304l-stainless-1200w.webp` | lib/manufacturing.ts · app/[locale]/company-profile/page.tsx | 定制腔体主图，同时被 3 个服务页复用，改名后关键词直接落在定制腔体上。 |
| P0 | `/photos/chamber-050.webp` | `/photos/multi-ton-304l-vacuum-chamber-1600w.webp` | app/[locale]/page.tsx | 050 是内部编号，对外零信息。新名承载「数吨级 / 304L」两个卖点词。 |
| P0 | `/photos/workshop-063.webp` | `/photos/tig-welding-station-vacuum-chamber-1600w.webp` | app/[locale]/page.tsx · app/[locale]/about/page.tsx | 焊接工位，是「真空密封焊接」能力的关键证据图，文件名要写清楚工艺。 |
| P0 | `/photos/workshop-058.webp` | `/photos/vacuum-chamber-workshop-components-1600w.webp` | app/[locale]/page.tsx | 车间构件全景，补上主体词。 |
| P0 | `/photos/feedthrough-044.webp` | `/photos/uhv-feedthrough-flange-assembly-1600w.webp` | app/[locale]/page.tsx | 超高真空法兰组件。⚠ 另需核实版权来源（疑似渲染图/图库图），用在「我们工厂」版块有风险。 |
| P0 | `/photos/cap-cmm.webp` | `/photos/cmm-inspection-vacuum-component-720w.webp` | app/[locale]/page.tsx · lib/manufacturing.ts | cap = capability 的缩写，对外无意义，且与 news 系列一样是内部代号。 |
| P0 | `/photos/cap-chamber.webp` | `/photos/custom-vacuum-chamber-finished-304l-720w.webp` | app/[locale]/page.tsx · app/[locale]/case-studies/page.tsx · lib/articles.ts · lib/manufacturing.ts | 复用最广的一张（12 个页面），改名收益最大。 |
| P0 | `/photos/cap-clean.webp` | `/photos/surface-finishing-clean-welding-bay-720w.webp` | app/[locale]/page.tsx · lib/articles.ts | 洁净焊接环境。注意合规红线：文案不得写「ISO Class 洁净室」。**⚠ 视觉复核发现实际画面是「真空检漏室」的门 + 中文标牌（见「视觉复核」节），文件名与内容不符，待换图后重命名。** |
| P0 | `/photos/cap-leak.webp` | `/photos/helium-leak-test-ul1000-vacuum-chamber-720w.webp` | app/[locale]/page.tsx · app/[locale]/case-studies/page.tsx · lib/articles.ts | 氦质谱检漏。UL1000 是真实设备型号，可以写进文件名（有实物证据）。 |
| P0 | `/photos/news-1.webp` | `/photos/vacuum-chamber-7-inspection-gates-640w.webp` | lib/articles.ts | news-1 与文章 slug 无关。改成与文章 slug 同义，图文实体一致。 |
| P0 | `/photos/news-2.webp` | `/photos/vacuum-chamber-material-304l-or-316l-640w.webp` | lib/articles.ts | 同上。 |
| P0 | `/photos/news-3.webp` | `/photos/vacuum-chamber-quotation-drawing-640w.webp` | lib/articles.ts | 同上。**⚠ 视觉复核发现实际画面是车间腔体设备、画面里没有图纸，文件名与内容不符，待换图后重命名。** |
| P0 | `/video/hero-loop-1920.mp4` | `/video/vacuum-chamber-manufacturing-loop-1920x1080.mp4` | app/[locale]/page.tsx (hero <source> ×2) | 视频文件名要能被 AI/搜索当成「内容」读到，而不是 hero-loop-1920 这种占位名。 |
| P0 | `/video/hero-loop-1280.mp4` | `/video/vacuum-chamber-manufacturing-loop-1280x720.mp4` | app/[locale]/page.tsx (hero <source> media=max-width:900px) | 与上图共用主干，只改分辨率段。 |
| P1 | `/photos/partners/cetc.webp` | `/photos/partners/partner-logo-cetc.webp` | app/components/partner-grid.tsx (模板字符串，改 1 处即可) | 15 家 logo 统一加 partner-logo- 前缀。作用：告诉爬虫这是「合作方品牌标识」而不是产品图，避免它们被当正文图片收录；批量处理也更容易。 |
| P1 | `/photos/partners/huasheng.webp` | `/photos/partners/partner-logo-huasheng.webp` | 同上 | 同上 |
| P1 | `/photos/partners/anhui-yuehao.webp` | `/photos/partners/partner-logo-anhui-yuehao.webp` | 同上 | 同上 |
| P1 | `/photos/partners/exact-sc.webp` | `/photos/partners/partner-logo-exact-sc.webp` | 同上 | 同上 |
| P1 | `/photos/partners/qianhai-jiuhe.webp` | `/photos/partners/partner-logo-qianhai-jiuhe.webp` | 同上 | 同上 |
| P1 | `/photos/partners/power-jacks.webp` | `/photos/partners/partner-logo-power-jacks.webp` | 同上 | 同上 |
| P1 | `/photos/partners/songyu.webp` | `/photos/partners/partner-logo-songyu.webp` | 同上 | 同上 |
| P1 | `/photos/partners/zhongke-nawei.webp` | `/photos/partners/partner-logo-zhongke-nawei.webp` | 同上 | 同上 |
| P1 | `/photos/partners/yuansu-vacuum.webp` | `/photos/partners/partner-logo-yuansu-vacuum.webp` | 同上 | 同上 |
| P1 | `/photos/partners/matrix-materials.webp` | `/photos/partners/partner-logo-matrix-materials.webp` | 同上 | 同上 |
| P1 | `/photos/partners/hengyue-vacuum.webp` | `/photos/partners/partner-logo-hengyue-vacuum.webp` | 同上 | 同上 |
| P1 | `/photos/partners/zhonghang-maite.webp` | `/photos/partners/partner-logo-zhonghang-maite.webp` | 同上 | 同上 |
| P1 | `/photos/partners/xiandao.webp` | `/photos/partners/partner-logo-xiandao.webp` | 同上 | 同上 |
| P1 | `/photos/partners/pilat-photoelectric.webp` | `/photos/partners/partner-logo-pilat-photoelectric.webp` | 同上 | 同上 |
| P1 | `/photos/partners/jianghui-vacuum.webp` | `/photos/partners/partner-logo-jianghui-vacuum.webp` | 同上 | 同上 |

## 待删除（孤儿）

| 路径 | 尺寸 | 字节 | 为什么 |
|---|---|---|---|
| `/android-chrome-192x192.png` | 192×192 | 26,770 | 没有 site.webmanifest，这批图标全部无人引用。要么删，要么补 manifest（见 05 表）。 |
| `/android-chrome-512x512.png` | 512×512 | 92,155 | 没有 site.webmanifest，这批图标全部无人引用。要么删，要么补 manifest（见 05 表）。 |
| `/favicon-16x16.png` | 16×16 | 630 | 没有 site.webmanifest，这批图标全部无人引用。要么删，要么补 manifest（见 05 表）。 |
| `/favicon-32x32.png` | 32×32 | 1,653 | 没有 site.webmanifest，这批图标全部无人引用。要么删，要么补 manifest（见 05 表）。 |
| `/logo-2x.webp` | 648×416 | 11,390 | 旧 logo，已被 pano-vacuum-tech-logo*.webp 取代；留着容易和现用 logo 混淆。 |
| `/logo.webp` | 324×208 | 5,348 | 旧 logo，已被 pano-vacuum-tech-logo*.webp 取代；留着容易和现用 logo 混淆。 |
| `/photos/hero-slide-1-1280.webp` | 1280×853 | 109,106 | 首屏轮播遗留（.hero-slide 已是死代码，CSS 里只剩空规则）。占位最狠、最大。 |
| `/photos/hero-slide-1.webp` | 2400×1600 | 358,962 | 首屏轮播遗留（.hero-slide 已是死代码，CSS 里只剩空规则）。占位最狠、最大。 |
| `/photos/hero-slide-2-1280.webp` | 1280×853 | 73,300 | 首屏轮播遗留（.hero-slide 已是死代码，CSS 里只剩空规则）。占位最狠、最大。 |
| `/photos/hero-slide-2.webp` | 2400×1600 | 202,528 | 首屏轮播遗留（.hero-slide 已是死代码，CSS 里只剩空规则）。占位最狠、最大。 |
| `/photos/hero-slide-3-1280.webp` | 1280×853 | 103,124 | 首屏轮播遗留（.hero-slide 已是死代码，CSS 里只剩空规则）。占位最狠、最大。 |
| `/photos/hero-slide-3.webp` | 2400×1600 | 351,972 | 首屏轮播遗留（.hero-slide 已是死代码，CSS 里只剩空规则）。占位最狠、最大。 |
| `/photos/workshop-054.webp` | 1600×1067 | 133,276 | 拍摄序号命名 + 无引用，双重问题。 |
| `/video/hero-poster.jpg` | 1440×960 | 218,363 | 首屏海报已被 photos/hero-main.webp（webp 更小）取代，jpg 版无人引用。 |

## 待新增

| 建议文件名 | 优先级 | 用途 | 说明 |
|---|---|---|---|
| `pano-vacuum-og-home-zh-1200x630.webp` | P0 | 首页 /zh/ 的 og:image | 用 photos/vacuum-chamber-workshop-changshu-1440w.webp 裁 1200×630 + 压字。现在全站 33 个页面共用一张 og-image.webp，社交/AI 抓取时完全没有区分度。 |
| `pano-vacuum-og-home-en-1200x630.webp` | P0 | 首页 /en/ 的 og:image | 同上，英文压字版本（.com 主面向海外，英文首屏分享卡不能是中文图）。 |
| `pano-vacuum-og-manufacturing-custom-vacuum-chambers-1200x630.webp` | P1 | 服务页 /manufacturing/custom-vacuum-chambers/ | 现有 cap-chamber 图裁切 + 压字。 |
| `pano-vacuum-og-manufacturing-precision-components-1200x630.webp` | P1 | 服务页 /manufacturing/precision-components/ | 现有 cap-cmm 图裁切 + 压字。 |
| `pano-vacuum-og-manufacturing-vacuum-tight-welding-1200x630.webp` | P1 | 服务页 /manufacturing/vacuum-tight-welding/ | 现有 workshop-063 图裁切 + 压字。 |
| `pano-vacuum-og-about-1200x630.webp` | P1 | /about/ | 车间/团队实拍裁切。 |
| `pano-vacuum-og-case-studies-1200x630.webp` | P1 | /case-studies/ | chamber-050 裁切。 |
| `pano-vacuum-og-company-profile-1200x630.webp` | P1 | /company-profile/ | hero-chamber 裁切。 |
| `pano-vacuum-og-quote-1200x630.webp` | P1 | /request-a-quote/ | 图纸/询价主题图。 |
| `pano-vacuum-og-blog-1200x630.webp` | P0 | 博客列表 /blog/ | ⚠ 现在 /zh/blog/ 和 /en/blog/ 完全没有 og:image，分享出去是空白卡。必须补。 |
| `pano-vacuum-og-blog-topic-leak-testing-1200x630.webp` | P0 | 博客专题 /blog/topic/leak-testing/ | ⚠ 4 个专题页全部没有 og:image。逐个补，用专题内最强的一张图裁切。 |
| `pano-vacuum-og-blog-topic-design-materials-1200x630.webp` | P0 | /blog/topic/design-materials/ | 同上 |
| `pano-vacuum-og-blog-topic-clean-particle-1200x630.webp` | P0 | /blog/topic/clean-particle/ | 同上 |
| `pano-vacuum-og-blog-topic-quote-delivery-1200x630.webp` | P0 | /blog/topic/quote-delivery/ | 同上 |
| `photos/service-custom-vacuum-chambers-workshop-1200w.webp` | P1 | 服务页正文 /manufacturing/custom-vacuum-chambers/ | 现在这张服务页的正文图直接复用首页的 hero-chamber，页面之间图片重复度高，GEO 上「页面=独立实体」的信号变弱。建议每张服务页配一张专属实拍。 |
| `photos/service-precision-components-cmm-inspection-1200w.webp` | P1 | 服务页正文 /manufacturing/precision-components/ | 同上，现在是首页 cap-cmm 复用图。 |
| `photos/service-vacuum-tight-welding-tig-1200w.webp` | P1 | 服务页正文 /manufacturing/vacuum-tight-welding/ | 同上，现在是首页 cap-chamber 复用图。 |
| `photos/blog-helium-leak-test-vs-pressure-rise-1200w.webp` | P1 | 文章《氦检和压降法差五个数量级》封面 | 现在这张封面直接复用能力图 cap-leak，导致「能力图」和「文章封面」撞名撞图。文章封面应独立。 |
| `photos/blog-vacuum-furnace-structure-design-1200w.webp` | P1 | 文章《真空炉结构设计五个决定》封面 | 现在复用 cap-chamber。 |
| `photos/blog-coating-chamber-cleaning-particle-control-1200w.webp` | P1 | 文章《镀膜腔体洗得再干净为什么还是抽不下去》封面 | 现在复用 cap-clean。 |
| `photos/equipment-laser-cutting-30000w-1200w.webp` | P1 | 设备能力（首页/服务页/公司介绍） | 3 万瓦激光是设备台账里已有的真实能力，但现在全站没有一张对应的实拍图。有设备没图 = 能力无法验证。 |
| `photos/equipment-press-brake-400t-6200mm-1200w.webp` | P1 | 同上 | 400 吨 · 6.2m 折弯，台账已有，缺图。 |
| `photos/equipment-helium-leak-detector-ul1000-1200w.webp` | P1 | 同上 | 氦检仪特写，佐证 ≤1×10⁻⁹ Pa·m³/s 的检出能力。 |
| `photos/equipment-overhead-crane-50t-1200w.webp` | P1 | 同上 | 50 吨行车，佐证腔体尺寸上限。 |
| `photos/factory-exterior-changshu-1200w.webp` | P1 | 关于我们 / 公司介绍页 | 对外可信度需要厂区外观图；当前 about 页只有一张焊接工位。 |
| `photos/partners/partner-logo-<slug>-760w.webp` | P2 | 合作伙伴墙（首页 + 公司介绍页） | 现在 15 张 logo 全部只有 ~380px 宽，在 2x/HiDPI 屏上是糊的。补 760w 版本并加 srcSet。 |

## 执行步骤

### 0. 备份（必做，先做）

```bash
cp -R public /tmp/public-backup-$(date +%Y%m%d-%H%M%S)
git -C . status --short   # 必须干净，否则先 stash
```

### 1. 生成改名脚本并 dry-run

```bash
python3 scripts/gen-asset-naming-list.py --emit-rename-sh
bash scripts/rename-assets-seo.sh --dry-run   # 只打印将要执行的 git mv
```

### 2. 真正迁移文件

```bash
bash scripts/rename-assets-seo.sh
# 用 git mv 而不是 mv，保留历史，diff 可读
```

### 3. 同步修改代码引用（15 个文件）

```bash
app/[locale]/page.tsx · app/[locale]/layout.tsx · app/layout.tsx · app/globals.css ·
app/[locale]/about/page.tsx · app/[locale]/company-profile/page.tsx ·
app/[locale]/case-studies/page.tsx · app/[locale]/request-a-quote/page.tsx ·
app/[locale]/blog/[slug]/page.tsx · app/components/header.tsx · app/components/footer.tsx ·
app/components/partner-grid.tsx · lib/manufacturing.ts · lib/articles.ts · lib/partners.ts(注释)
```

### 4. 补 301 跳转（旧图片 URL 已被索引，不能直接 404）

```bash
在 public/_redirects 追加约 40 行：
/photos/hero-main.webp /photos/vacuum-chamber-workshop-changshu-1440w.webp 301
Cloudflare Pages 静态 _redirects 上限 2100 条，够用。
```

### 5. 补缓存头（只在改名之后做）

```bash
public/_headers 追加：
/photos/*
  Cache-Control: public, max-age=31536000, immutable
/video/*
  Cache-Control: public, max-age=31536000, immutable
⚠ 顺序不能反：现在线上是 max-age=14400, must-revalidate，先改名再长缓存；
先长缓存会让用户在改名后仍拿到旧图（旧图 301 后依然可能被缓存）。
```

### 6. 补 site.webmanifest

```bash
public/site.webmanifest，name=PANO Vacuum 帕诺真空机械，引用 icon-192/512。
有助于 PWA 与品牌实体识别。
```

### 7. 补 OG 图与 JSON-LD image

```bash
按 05 表补 14 张 OG 图（其中 6 张 P0：blog 列表 + 4 个专题 + 首页）。
同时给 Organization / Service / AboutPage / ItemList 补 image 字段——目前只有 logo，没有 image。
```

### 8. 构建与校验

```bash
pnpm typecheck && pnpm build && pnpm verify
node scripts/check-css-compat.mjs
```

### 9. 双域名分别构建快照（关键，别踩并发覆写 out/ 的坑）

```bash
pnpm build && cp -R out /tmp/out-com
pnpm build:cn && cp -R out /tmp/out-cn
```

### 10. 双域名分别部署

```bash
PROJECT=pano-vacuum   DIR=/tmp/out-com node scripts/deploy.pages.mjs
PROJECT=panovacuum-cn DIR=/tmp/out-cn  node scripts/deploy.pages.mjs
# 部署脚本会在轮询阶段挂住，属已知现象：放后台跑，轮询 deployments 接口看到
# latest_stage.status == success 后 job_kill 即可。
```

### 11. 提交新 URL 给搜索引擎

```bash
图片改名后要主动提交，否则索引里还是旧 URL：
· IndexNow（必应/Yandex）—— pub/81ea...txt 是 key，POST 新图片 URL 列表
· 百度搜索资源平台 —— 普通收录逐条提交 /photos/* 新 URL（.cn 必做）
· Google Search Console —— 提交 /sitemap.xml，图片会随页面一起重抓
```

### 12. 回归检查

```bash
cp -R out /tmp/out-verify
· 每个页面的 <img src> 是否都能 200（不能用 grep 通过就算完，要真发请求）
· 老 URL 是否 301 到新 URL
· 首屏视频/图片是否还在（历史事故：hero 曾因 inset 简写整块消失）
```

## 页面 × 资源矩阵

| 资源 | 页面数 | alt 中文 | 页面 |
|---|---|---|---|
| `/pano-vacuum-tech-logo.webp` | 44 | PANO Vacuum 帕诺真空 | /en/ / /en/about/ / /en/blog/ / /en/blog/chamber-material-304l-or-316l/ / /en/blog/coating-chamber-cleaning-particle-control/ / /en/blog/helium-leak-test-vs-pressure-rise/ / /en/blog/how-to-request-a-quote-with-a-drawing/ / /en/blog/topic/clean-particle/ / /en/blog/topic/design-materials/ / /en/blog/topic/leak-testing/ / /en/blog/topic/quote-delivery/ / /en/blog/vacuum-chamber-7-inspection-gates/ / /en/blog/vacuum-furnace-structure-design/ / /en/case-studies/ / /en/company-profile/ / /en/industrial-partnerships/ / /en/manufacturing/custom-vacuum-chambers/ / /en/manufacturing/precision-components/ / /en/manufacturing/vacuum-tight-welding/ / /en/privacy/ / /en/request-a-quote/ / /en/terms/ / /zh/ / /zh/about/ / /zh/blog/ / /zh/blog/chamber-material-304l-or-316l/ / /zh/blog/coating-chamber-cleaning-particle-control/ / /zh/blog/helium-leak-test-vs-pressure-rise/ / /zh/blog/how-to-request-a-quote-with-a-drawing/ / /zh/blog/topic/clean-particle/ / /zh/blog/topic/design-materials/ / /zh/blog/topic/leak-testing/ / /zh/blog/topic/quote-delivery/ / /zh/blog/vacuum-chamber-7-inspection-gates/ / /zh/blog/vacuum-furnace-structure-design/ / /zh/case-studies/ / /zh/company-profile/ / /zh/industrial-partnerships/ / /zh/manufacturing/custom-vacuum-chambers/ / /zh/manufacturing/precision-components/ / /zh/manufacturing/vacuum-tight-welding/ / /zh/privacy/ / /zh/request-a-quote/ / /zh/terms/ |
| `/photos/cap-chamber.webp` | 12 | 定制真空腔体成品，304L 不锈钢 | /en/ / /en/blog/ / /en/blog/topic/design-materials/ / /en/blog/vacuum-furnace-structure-design/ / /en/case-studies/ / /en/manufacturing/vacuum-tight-welding/ / /zh/ / /zh/blog/ / /zh/blog/topic/design-materials/ / /zh/blog/vacuum-furnace-structure-design/ / /zh/case-studies/ / /zh/manufacturing/vacuum-tight-welding/ |
| `/photos/cap-clean.webp` | 8 | 受控洁净环境下的表面处理与检测 | /en/ / /en/blog/ / /en/blog/coating-chamber-cleaning-particle-control/ / /en/blog/topic/clean-particle/ / /zh/ / /zh/blog/ / /zh/blog/coating-chamber-cleaning-particle-control/ / /zh/blog/topic/clean-particle/ |
| `/photos/cap-cmm.webp` | 4 | ALPHA 关节臂三坐标检测仪检测真空级零件 | /en/ / /en/manufacturing/precision-components/ / /zh/ / /zh/manufacturing/precision-components/ |
| `/photos/cap-leak.webp` | 10 | UL1000 氦质谱检漏仪验证腔体密封性 | /en/ / /en/blog/ / /en/blog/helium-leak-test-vs-pressure-rise/ / /en/blog/topic/leak-testing/ / /en/case-studies/ / /zh/ / /zh/blog/ / /zh/blog/helium-leak-test-vs-pressure-rise/ / /zh/blog/topic/leak-testing/ / /zh/case-studies/ |
| `/photos/chamber-050.webp` | 2 | 数吨级 304L 真空腔体 | /en/ / /zh/ |
| `/photos/feedthrough-044.webp` | 2 | 超高真空法兰组件安装 | /en/ / /zh/ |
| `/photos/hero-chamber.webp` | 4 | 帕诺定制不锈钢真空腔体 | /en/company-profile/ / /en/manufacturing/custom-vacuum-chambers/ / /zh/company-profile/ / /zh/manufacturing/custom-vacuum-chambers/ |
| `/photos/hero-main.webp` | 2 | 真空腔体制造车间 | /en/ / /zh/ |
| `/photos/news-1.webp` | 10 | 从图纸到出厂：真空腔体要过 7 道检查 | /en/ / /en/blog/ / /en/blog/topic/leak-testing/ / /en/blog/topic/quote-delivery/ / /en/blog/vacuum-chamber-7-inspection-gates/ / /zh/ / /zh/blog/ / /zh/blog/topic/leak-testing/ / /zh/blog/topic/quote-delivery/ / /zh/blog/vacuum-chamber-7-inspection-gates/ |
| `/photos/news-2.webp` | 8 | 真空腔体选 304L 还是 SUS316L | /en/ / /en/blog/ / /en/blog/chamber-material-304l-or-316l/ / /en/blog/topic/design-materials/ / /zh/ / /zh/blog/ / /zh/blog/chamber-material-304l-or-316l/ / /zh/blog/topic/design-materials/ |
| `/photos/news-3.webp` | 8 | 真空腔体怎么询价：一张图纸就够了 | /en/ / /en/blog/ / /en/blog/how-to-request-a-quote-with-a-drawing/ / /en/blog/topic/quote-delivery/ / /zh/ / /zh/blog/ / /zh/blog/how-to-request-a-quote-with-a-drawing/ / /zh/blog/topic/quote-delivery/ |
| `/photos/partners/anhui-yuehao.webp` | 4 | 安徽越好 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/cetc.webp` | 4 | CETC 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/exact-sc.webp` | 4 | Exact SC 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/hengyue-vacuum.webp` | 4 | 衡岳真空 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/huasheng.webp` | 4 | 华升 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/jianghui-vacuum.webp` | 4 | 上海匠辉真空 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/matrix-materials.webp` | 4 | 矩阵材料 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/pilat-photoelectric.webp` | 4 | 江苏派莱特光电 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/power-jacks.webp` | 4 | Power Jacks 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/qianhai-jiuhe.webp` | 4 | 前海久禾 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/songyu.webp` | 4 | 松煜科技 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/xiandao.webp` | 4 | 先导 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/yuansu-vacuum.webp` | 4 | 元素真空 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/zhonghang-maite.webp` | 4 | 中航迈特 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/partners/zhongke-nawei.webp` | 4 | 中科纳微 标识 | /en/ / /en/company-profile/ / /zh/ / /zh/company-profile/ |
| `/photos/workshop-058.webp` | 2 | 车间内的构件与设备 | /en/ / /zh/ |
| `/photos/workshop-063.webp` | 4 | 车间焊接工位 | /en/ / /en/about/ / /zh/ / /zh/about/ |
| `/video/hero-loop-1280.mp4` | 2 |  | /en/ / /zh/ |
| `/video/hero-loop-1920.mp4` | 2 |  | /en/ / /zh/ |
| `/wechat-qr.webp` | 44 | 周先生微信二维码 | /en/ / /en/about/ / /en/blog/ / /en/blog/chamber-material-304l-or-316l/ / /en/blog/coating-chamber-cleaning-particle-control/ / /en/blog/helium-leak-test-vs-pressure-rise/ / /en/blog/how-to-request-a-quote-with-a-drawing/ / /en/blog/topic/clean-particle/ / /en/blog/topic/design-materials/ / /en/blog/topic/leak-testing/ / /en/blog/topic/quote-delivery/ / /en/blog/vacuum-chamber-7-inspection-gates/ / /en/blog/vacuum-furnace-structure-design/ / /en/case-studies/ / /en/company-profile/ / /en/industrial-partnerships/ / /en/manufacturing/custom-vacuum-chambers/ / /en/manufacturing/precision-components/ / /en/manufacturing/vacuum-tight-welding/ / /en/privacy/ / /en/request-a-quote/ / /en/terms/ / /zh/ / /zh/about/ / /zh/blog/ / /zh/blog/chamber-material-304l-or-316l/ / /zh/blog/coating-chamber-cleaning-particle-control/ / /zh/blog/helium-leak-test-vs-pressure-rise/ / /zh/blog/how-to-request-a-quote-with-a-drawing/ / /zh/blog/topic/clean-particle/ / /zh/blog/topic/design-materials/ / /zh/blog/topic/leak-testing/ / /zh/blog/topic/quote-delivery/ / /zh/blog/vacuum-chamber-7-inspection-gates/ / /zh/blog/vacuum-furnace-structure-design/ / /zh/case-studies/ / /zh/company-profile/ / /zh/industrial-partnerships/ / /zh/manufacturing/custom-vacuum-chambers/ / /zh/manufacturing/precision-components/ / /zh/manufacturing/vacuum-tight-welding/ / /zh/privacy/ / /zh/request-a-quote/ / /zh/terms/ |

---

## 执行状态（2026-11-03 当日回填 · 已上线）

### 已执行 ✅

| 项 | 结果 |
|---|---|
| 36 条改名 | 已 `git mv` 完成，`public/` 从 59 文件降到 45 文件 |
| 14 个孤儿删除 | 已删，释放 1.61 MB |
| 15 个源文件引用 | 已同步（48 处替换），`grep` 旧文件名残留 = 0 |
| 301 重定向 | `public/_redirects` 共 **50 条**：36 条改名 + 14 条已下线素材 |
| 缓存策略 | `public/_headers` 已加：`/video/*` 1 年 immutable、`/photos/*` 30 天 + SWR、品牌资产与图标 1 年 immutable |
| `site.webmanifest` | 已新增并挂到 `[locale]` 的 metadata |
| `Organization.image` | 已补（此前只有 `logo`） |
| 双域名部署 | `.com` = `21ba2adb` · `.cn` = `f613b8c6`，均 STATUS success |

commit：`8b23c66`（改名主体）、`917f486`（已下线素材 301）

### 线上实测（不是 grep，是真发请求）

- 新素材 URL：两域名全部 `200`，字节与旧文件一致（`hero-main` 167516、`cap-leak` 20406、视频 1523432、logo 9564、og 9752、二维码 49896、wordmark 1482、伙伴 logo 6832）
- 旧素材 URL：两域名全部 `301`，单跳、终点 `200`
- 缓存头：`/photos/*` → `public, max-age=2592000, stale-while-revalidate=604800`；`/video/*` → `public, max-age=31536000, immutable`
- `/zh/` 线上 HTML：素材引用 30 条全部是新名，旧名残留 0，canonical 与 `og:image` 正确
- `pnpm typecheck` / `pnpm build`（含 CSS 兼容闸）/ `pnpm verify`（47 页 · sitemap 44 · RSS 6）全绿

### 尚未执行 ⏳（需要有图才能做）

1. ~~**14 张 OG 图**~~ → **已用现有厂内照片完成 18 张并上线**，见下一节「分享图（OG）执行状态」。
2. **服务页专属正文图 3 张**（现在 3 个 manufacturing 页分别复用首页的 `hero-chamber`/`cap-cmm`/`cap-chamber`）。
3. **文章专属封面 3 张**。
4. **设备实拍 5 张**：3 万瓦激光、400 吨·6.2m 折弯、UL1000 氦检仪、50 吨行车、厂区外观 —— 台账里有这些能力，全站没有一张对应实拍。
5. **伙伴 logo @2x 15 张**（现在 ~380px，2 倍屏会糊）。
6. `feedthrough-044` 改名后是 `uhv-feedthrough-flange-assembly-1600w.webp`，**版权来源仍待核实**（既有拍摄清单标注「疑似渲染/图库图」，用在「我们工厂」有风险）。

补拍这些图后，按本文档的命名规范命名，再跑 `python3 scripts/gen-asset-naming-list.py` 即可刷新清单。

---

## 分享图（OG）执行状态（2026-11-03 补做 · 已上线）

**结论：全站 47 个 HTML 页面、两域名 46 个线上路由，`og:image` + `twitter:image` + `og:url` + `og:type` 覆盖 100%。** 之前 13 个页面完全没有分享图、22 个页面共用一张中文压字图的问题已解决。

### 做了什么

| 项 | 内容 |
|---|---|
| 新增分享图 | **18 张**，全部 `1200×630` webp，全部由 `public/photos/` 里 ≥1200px 的**真实厂内照片**裁切，未用图库/渲染图 |
| 统一出口 | 新增 `lib/og.ts`：`OG_DEFAULT` / `OG_BLOG` / `OG_BY_TOPIC` / `OG_BY_PAGE` / `OG_BY_ARTICLE` + `ogImage()` / `twitterCard()` / `pageOg()` / `coverSize()` |
| 页面接线 | 13 个页面文件：首页、about、company-profile、case-studies、request-a-quote、industrial-partnerships、privacy、terms、manufacturing/[service]、blog 索引、blog/topic/[topic]、blog/[slug]、根 layout |
| 默认图换掉 | 原 `pano-vacuum-og-default`（白底压字卡，9752 B）→ 压暗厂内实拍 + 白色品牌字标（61962 B），**语言中立**，中英文站共用不再出现"英文站显示中文图" |
| 缓存 | `public/_headers` 增 `/pano-vacuum-og-*.webp` → `public, max-age=604800, stale-while-revalidate=2592000`（7 天 + 30 天 SWR；比 `/photos/*` 短，因为换分享图后旧卡片留在 CDN 上很难看） |

### 裁切配方（6 张合格源图 × 不同取景 = 18 张卡；生成脚本 `scripts/gen-og-images.py`）

`public/photos/` 里 ≥1200px 且**无版权疑虑**的实拍只有 6 张：`vacuum-chamber-workshop-changshu-1440w`、`vacuum-chamber-workshop-changshu-1280w`、`multi-ton-304l-vacuum-chamber-1600w`、`tig-welding-station-vacuum-chamber-1600w`、`vacuum-chamber-workshop-components-1600w`、`custom-vacuum-chamber-304l-stainless-1200w`。

另有 1 张 720 宽的氦检仪实拍（`helium-leak-test-ul1000-vacuum-chamber-720w`）会被放大使用。**经视觉复核（见下节），`surface-finishing-clean-welding-bay-720w`（实拍是「真空检漏室」门 + 标牌）和 `vacuum-chamber-quotation-drawing-640w`（实拍里没有图纸）两张文件名与内容不符，不参与分享图。**

一对一直裁会产出**完全相同**的文件——首版就是这样：18 个文件、只有 5 种画面，不同页面分享出去卡片长得一样。改为「同一源图 × 不同取景」：`z` 是缩放（1.0 最广 → 1.8 最近），`fx`/`fy` 是裁切框在源图内的横向/纵向落点。

```python
A  = 1200 / 630
cw = min(W, H*A) / z
ch = cw / A
left = round((W - cw) * fx)
top  = round((H - ch) * fy)
im.crop((left, top, left+round(cw), top+round(ch))).resize((1200, 630), Image.LANCZOS)
```

| 分享图 | 源图 | z | fx | fy | 增益 |
|---|---|---|---|---|---|
| default | multi-ton（压暗 0.52 + 降饱和 0.85 + 白色字标 640px 宽居中） | — | — | — | — |
| about | workshop-1440 | 1.00 | 0.50 | 0.50 | 1.10 |
| company-profile | workshop-1280 | 1.00 | 0.50 | 0.50 | 1.00 |
| quote | workshop-1280 | 1.08 | 0.42 | 0.55 | 1.00 |
| blog | tig-welding | 1.00 | 0.50 | 0.50 | 1.00 |
| blog-topic-leak-testing | helium（INFICON 检漏仪） | 1.00 | 0.50 | 0.50 | 1.00 |
| article-helium-leak-test | helium（同上，更近的取景） | 1.12 | 0.45 | 0.55 | 1.00 |
| blog-topic-clean-particle | tig-welding（受控焊接工位） | 1.18 | 0.42 | 0.50 | 1.00 |
| blog-topic-quote-delivery | workshop-1280 | 1.08 | 0.55 | 0.45 | 1.00 |
| article-quote-with-drawing | workshop-1440 | 1.18 | 0.60 | 0.45 | 1.10 |
| blog-topic-design-materials | multi-ton | 1.00 | 0.50 | 0.45 | 1.00 |
| article-material-304l-316l | multi-ton | 1.10 | 0.50 | 0.40 | 1.00 |
| article-7-inspection-gates | 304l-stainless | 1.00 | 0.50 | 0.50 | 1.10 |
| article-coating-chamber-cleaning | 304l-stainless | 1.08 | 0.55 | 0.50 | 1.10 |
| article-vacuum-furnace-design | components | 1.00 | 0.50 | 0.42 | 1.00 |
| manufacturing-precision-components | components | 1.10 | 0.50 | 0.45 | 1.00 |
| manufacturing-custom-vacuum-chambers | workshop-1440 | 1.08 | 0.45 | 0.50 | 1.10 |
| manufacturing-vacuum-tight-welding | tig-welding | 1.10 | 0.50 | 0.45 | 1.00 |

`gain` 是 resize 之后的亮度增益（`ImageEnhance.Brightness`），个别偏暗的源图提亮 1.10；放大超过 1.05 倍时补一道 `UnsharpMask(radius=0.8, percent=70, threshold=3)`。改配方直接跑 `python3 scripts/gen-og-images.py`（全部）或 `python3 scripts/gen-og-images.py og-about og-quote`（按 key 选择性重出）。

结果：**18 个文件 sha256 全不重复**，均为 1200×630，亮度落在 77–147（无过暗/过曝）。

### 18 张文件与用途

| 文件 | 用途 |
|---|---|
| `pano-vacuum-og-default-1200x630.webp` | 兜底：首页 `/zh/` `/en/`、case-studies、industrial-partnerships、privacy、terms、`/`、`/404`（12 页） |
| `pano-vacuum-og-blog-1200x630.webp` | `/zh/blog/` `/en/blog/` |
| `pano-vacuum-og-blog-topic-leak-testing-1200x630.webp` | `/blog/topic/leak-testing/` |
| `pano-vacuum-og-blog-topic-design-materials-1200x630.webp` | `/blog/topic/design-materials/` |
| `pano-vacuum-og-blog-topic-clean-particle-1200x630.webp` | `/blog/topic/clean-particle/` |
| `pano-vacuum-og-blog-topic-quote-delivery-1200x630.webp` | `/blog/topic/quote-delivery/` |
| `pano-vacuum-og-article-7-inspection-gates-1200x630.webp` | 文章《从图纸到出厂：真空腔体要过 7 道检查》 |
| `pano-vacuum-og-article-material-304l-316l-1200x630.webp` | 文章《304L 还是 316L》 |
| `pano-vacuum-og-article-quote-with-drawing-1200x630.webp` | 文章《带图纸询价怎么说清》 |
| `pano-vacuum-og-article-helium-leak-test-1200x630.webp` | 文章《氦检和压降法，差五个数量级》 |
| `pano-vacuum-og-article-vacuum-furnace-design-1200x630.webp` | 文章《真空炉结构设计的五个决定》 |
| `pano-vacuum-og-article-coating-chamber-cleaning-1200x630.webp` | 文章《镀膜腔体洗得再干净为什么还是抽不下去》 |
| `pano-vacuum-og-about-1200x630.webp` | `/about/` |
| `pano-vacuum-og-company-profile-1200x630.webp` | `/company-profile/` |
| `pano-vacuum-og-quote-1200x630.webp` | `/request-a-quote/` |
| `pano-vacuum-og-manufacturing-custom-vacuum-chambers-1200x630.webp` | 服务页 定制真空腔体 |
| `pano-vacuum-og-manufacturing-precision-components-1200x630.webp` | 服务页 精密加工件 |
| `pano-vacuum-og-manufacturing-vacuum-tight-welding-1200x630.webp` | 服务页 真空密封焊接 |

> 命名口径调整：专题图由 `og-topic-*` 改为 `og-blog-topic-*`，与文章页 `og-article-*` 对齐，路径前缀统一为页面类型。

### 视觉复核（借 X99 的显卡，让视觉模型真的「看」了 18 张）

做这套图的模型本身没有图像输入，第一版完全是按尺寸/亮度/哈希这类程序化指标验的，等于**盲裁**。后来接上 X99 主机（双卡 RX 7900 XTX）上一个 Qwen 视觉推理端点，才第一次真正看到画面内容，结论如下。

**通道与调用**

```bash
# X99 上跑着的 OpenAI 兼容端点（本机 100.106.75.99：Tailscale）
POST http://100.106.75.99:8082/v1/chat/completions
     Authorization: Bearer $X99_STRATA_API_KEY     # 在 ~/.hermes/.env
     model: qwen3.8-flash-next-iq3_xxs
     chat_template_kwargs: {"enable_thinking": false}   # 必须，否则 content 为空、只有半截 reasoning_content
```

- 送图前先缩到 **768 宽**：服务端会把图归一成固定 token 数（`prompt_tokens` 恒为 308），送 1200 宽只是白等 3 倍时间。
- 单张 7–160 秒（与服务端其它负载抢 GPU 时最慢），一轮 18 张 10–15 分钟，得后台跑。

**它能干什么、不能干什么**（重要，别被它的措辞带跑）

| 能力 | 实测 |
|---|---|
| 认主体 ✅ | 准确认出 INFICON UL1000 检漏仪、球形真空腔体、白色「帕诺真空」字标、门上的中英文标牌 |
| 判「完整度/方向」 ❌ | 对一张只裁了高度的满宽图说「右侧被切掉」；对同一张横构图源图先说「旋转了 90 度」，裁成 1200×630 后又改口「正立」，依据是"厂房立柱呈水平方向延伸" |
| 转写小字 ⚠️ | 标题级大字（真空检漏室 / VACUUM LEAK DETECTION ROOM）两次一致；标牌下的小字人名两次完全不同，**不可信** |

所以只采信它「画面里是什么、主体是否切题、有没有尴尬内容」的判断，**不采信它的裁切建议**。

**复核发现：两张图和文件名对不上**

| 文件 | 名字暗示 | 实际画面 | 波及 |
|---|---|---|---|
| `photos/vacuum-chamber-quotation-drawing-640w.webp`（原 `news-3.webp`） | 一张图纸 | 车间里一台不锈钢腔体（带蓝色保护胶带），**没有任何图纸** | 文章《带图纸询价怎么说清》的正文封面；分享图已改用车间实拍 |
| `photos/surface-finishing-clean-welding-bay-720w.webp`（原 `cap-clean.webp`） | 表面处理 / 洁净焊区 | 一扇白门 + 标牌「真空检漏室 / VACUUM LEAK DETECTION ROOM」，画面里**没人做表面处理** | 首页「表面处理与清洗」卡片 + 洁净颗粒文章封面；分享图已改用焊接工位实拍 |

两张都是当初改名时**按用途猜内容**（没有图像输入）导致的。另外：检漏室那张门上标牌下方还有几行小字，两次转写结果互相矛盾（一次读成"徐锋/朱秋明/质控部·八院"、一次读成"徐敏/朱延安/黄义虎·占斌"），分辨率不足以确认——**但"门牌上可能印着姓名"这件事本身值得人工核一眼**，涉及隐私与客户信息（"八院"若属实即外部单位名）。

**打分（同一提示词，重出前后）**

| 分享图 | 旧取景 | 新取景 | 说明 |
|---|---|---|---|
| about | 2 | **5** | 旧图太微观认不出工厂；新图「大型不锈钢工业容器端面，切题」 |
| blog | 2 | **5** | 旧图只有一块金属，太单一 |
| article-7-inspection-gates | 4 | **5** | |
| manufacturing-vacuum-tight-welding | 3 | 完整体 | 焊道主体完整、有工位层次 |
| blog-topic-leak-testing | 5 | 5 | 换成 INFICON 真机后主体更明确 |
| article-helium-leak-test | 2 | 认出真机 | 旧图「无测试场景」，新图能看出是检漏仪 |
| blog-topic-clean-particle | 1 | 4 | 旧图是取景过紧的部件 |
| article-quote-with-drawing | 1 | 2 | 新图设备实拍，模型嫌"没图纸"——字面主义，不改 |
| article-material-304l-316l / article-coating-chamber-cleaning | 3 | 1–2 | 同上，判词是"没体现清洁/颗粒"，属过度苛求 |
| default | 4 | 3 | 模型嫌"明显偏暗"——那是品牌卡刻意压暗以便读白字标，不改 |

底线：分享卡片用真实设备照是行业常规，剩下 3 张 1–2 分都是"不符合文章字面"式的苛求，不再为迎合它反复调参。

### 顺手修掉的两个隐性缺陷

1. **`og:url` 张冠李戴**：原来自 `case-studies`、`industrial-partnerships`、`privacy`、`terms`、首页、404 这些页面不写 `openGraph`，整段继承 `app/[locale]/layout.tsx`，分享出去 `og:url` 指向首页。现在 `pageOg()` 按 `path + locale` 逐页生成，`og:url` 与 canonical 一致（实测 `.com` 与 `.cn` 各自指向自己域名）。
2. **文章封面尺寸误报**：`blog/[slug]` 原先把 640×360 / 720×480 的正文封面硬写成 `1200×630`，抓取端会按错误比例裁切。现在分享图改用专属 1200×630 图；万一某篇文章未登记专属图，`coverSize()` 按文件名宽度后缀如实声明。

### 实测（真发请求）

以下数字是**视觉复核后重出 18 张**这一版的实测（2026-11-03 晚）：

- `.com` 线上 47 个产物页 → 46 个可直取路由：`og:image` / `og:url` / `twitter:image` **异常 0**，域名全部 `https://panovacuum.com/`；唯一"失败"是 `/404.html` 返回 **308**（CF Pages 把 `/404.html` 308 到 `/404`，非故障）
- `.cn`（经预览域 `https://68a5f646.panovacuum-cn.pages.dev` 验，页面内是绝对 `panovacuum.cn` URL）：同样 **46/47**，`og:url` / canonical 均指向 `https://panovacuum.cn/...`
- 18 张分享图：线上全部 `200`，缓存头 = `public, max-age=604800, stale-while-revalidate=2592000`，**逐张 sha256 与 `out-com/` 一致 18/18**（先 `purge_cache` 再验）
- 构建产物本地审计：`.com` 47 页 × 5 个标签异常 **0**；`og:image` 指向的文件全部存在（`.cn` 产物 18 个引用全部命中）
- `pnpm typecheck` / `pnpm build`（含 CSS 兼容闸）/ `pnpm build:cn` / `pnpm verify`（HTML 47 · sitemap 44 · RSS 6）全绿
- deployment：`.com` `54eaf2c2-16c8-49b3-aaca-840d21ae641c`、`.cn` `68a5f646-ab86-484b-8910-17d2294aefac`，均 `STATUS: success`
- 用 `og-default` 的 13 个页面：`404.html`、`404/index.html`、`index.html`、`en|zh` 的 `case-studies` / `index`（首页）/ `industrial-partnerships` / `privacy` / `terms` —— 它们没有专属图，只修了 `og:url`

### ⚠ 踩坑：换图后 CDN 还在发旧字节

首版上线后用内容哈希核对，`og-article-7-inspection-gates` 线上仍是旧字节：直取 URL 得 98904 B，加 `?v=<时间戳>` 才拿到新的 63624 B —— **CF Pages 部署后自定义域名的边缘缓存不会立刻全量失效**，叠加当时给的 30 天 `max-age`，POP 会继续发旧图。

处置：
1. 换图后必须**用内容哈希**核对线上字节，只看 HTTP 200 和"大小看起来差不多"会漏。
2. 主动清缓存：`POST /zones/{zone_id}/purge_cache`，body `{"files":[完整 URL...]}`。该账号下 `panovacuum.com` zone = `b6ee0c0a15594b107d3e7466389ad4b7`（`active`）；**`panovacuum.cn` 没有 zone**（NS 还在新网），只能等 DNS 迁过来。
3. 因此把 OG 图的 `max-age` 从 30 天降到 **7 天**（SWR 30 天）：换图最坏一周后全网生效。

### 仍未做（必须真拍，做不了）

- **服务页正文图 3 张**：`photos/service-custom-vacuum-chambers-workshop-1200w.webp`、`photos/service-precision-components-cmm-inspection-1200w.webp`、`photos/service-vacuum-tight-welding-tig-1200w.webp`
- **文章专属封面 3 张**：`photos/blog-helium-leak-test-vs-pressure-rise-1200w.webp`、`photos/blog-vacuum-furnace-structure-design-1200w.webp`、`photos/blog-coating-chamber-cleaning-particle-control-1200w.webp`
- **设备实拍 5 张**：3 万瓦激光、400 吨 · 6.2m 折弯、UL1000 氦检仪、50 吨行车、厂区外观
- **两张「名字与内容不符」的实拍要换**（视觉复核查出来的）：
  - `photos/surface-finishing-clean-welding-bay-720w.webp` 实际是「真空检漏室」门 + 中英文标牌（画面里没人做表面处理）；它现在挂在首页「表面处理与清洗」卡片和洁净颗粒文章封面上，且标牌是中文，会出现在英文页面
  - `photos/vacuum-chamber-quotation-drawing-640w.webp` 实际是车间腔体设备（画面里没有图纸），现在是《带图纸询价》的正文封面
  - 换图后按实际内容重命名（新文件名 + `_redirects` 补 301），别沿用现在的名字
- **伙伴 logo @2x 15 张**（现约 380px，2 倍屏会糊）
- `uhv-feedthrough-flange-assembly-1600w.webp` **版权来源待核实**，暂未用它做任何分享图
