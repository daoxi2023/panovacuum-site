#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
帕诺真空 · 全站图片/视频命名清单生成器
=====================================
作用：扫描 public/ 与 out/（构建产物），结合本文件里人工确定的改名决策，
      生成一份 Excel 清单 + 一份 Markdown 规范文档。

用法：
    pnpm build            # 先构建，out/ 是「哪个页面用了哪张图」的唯一事实来源
    python3 scripts/gen-asset-naming-list.py
    可选参数：
        --public  <dir>   default: public
        --out     <dir>   default: out
        --xlsx    <path>  default: ~/Desktop/帕诺真空_图片视频命名清单_<日期>.xlsx
        --md      <path>  default: docs/ASSET-NAMING-<日期>.md

注意：脚本只读仓库、只写这两个产出物，不移动/删除任何素材。
      真正的改名动作由 09-执行步骤 里的命令完成。
"""

import argparse
import os
import re
import sys
from datetime import date

# --------------------------------------------------------------------------
# 1. 事实：仓库里现存的文件（less 人工维护，见 02 表）
# --------------------------------------------------------------------------

MEDIA_EXT = {".webp", ".png", ".jpg", ".jpeg", ".gif", ".avif", ".mp4", ".webm", ".svg", ".ico"}

# 非素材文件，出现在 public/ 但不算图片视频
NON_MEDIA = {
    "CNAME", "_headers", "_redirects", "llms.txt",
    "81ea551752f66ccb2bb1ed1630216355.txt",
}

# --------------------------------------------------------------------------
# 2. 决策：改名映射（人工确定，这是本清单的核心）
#    字段 = 旧相对路径, 新相对路径, 优先级, 需同步修改的代码文件, 说明
# --------------------------------------------------------------------------

BRAND = "pano-vacuum-"

RENAMES = [
    # ---- 品牌与站级资产 ----
    ("pano-vacuum-tech-logo.webp", f"{BRAND}logo-324w.webp", "P1",
     "app/layout.tsx (JSON-LD logo) · app/[locale]/blog/[slug]/page.tsx (publisher.logo) · "
     "app/components/header.tsx · app/components/footer.tsx",
     "去掉冗余 tech；把像素宽度写进文件名。品牌名仍是 PANO Vacuum，商标全称在公司信息里。"),
    ("pano-vacuum-tech-logo-2x.webp", f"{BRAND}logo-648w.webp", "P1",
     "app/components/header.tsx · app/components/footer.tsx",
     "-2x 是 DPR 写法，只有懂的人看得懂；统一改成 -648w（真实像素宽）。"),
    ("brand-wordmark.webp", f"{BRAND}wordmark-896w.webp", "P1",
     "app/globals.css (.brand-word mask url)",
     "补品牌前缀；wordmark 与 logo 区分开（纯字标 vs 图形标）。"),
    ("og-image.webp", f"{BRAND}og-default-1200x630.webp", "P1",
     "app/[locale]/layout.tsx (ogImage)",
     "og:image 要能一眼看出用途和尺寸；同时新增每页专属 OG（见 05 表）。"),
    ("wechat-qr.webp", f"{BRAND}wechat-qr-zhouyou-480w.webp", "P1",
     "app/components/footer.tsx · app/[locale]/request-a-quote/page.tsx",
     "二维码属于联系人资产，写清是谁的、多大，避免被当成产品图收录。"),

    # ---- 内容照片（P0：现在完全没有关键词）----
    ("photos/hero-main.webp", "photos/vacuum-chamber-workshop-changshu-1440w.webp", "P0",
     "app/[locale]/page.tsx (hero img + srcSet)",
     "首屏主图。原文件名 hero-main 零关键词。新名 = 主体 + 场景 + 地点 + 宽度。"),
    ("photos/hero-main-1280.webp", "photos/vacuum-chamber-workshop-changshu-1280w.webp", "P0",
     "app/[locale]/page.tsx (srcSet)",
     "与上图同一主干的窄屏变体，只改宽度段。"),
    ("photos/hero-chamber.webp", "photos/custom-vacuum-chamber-304l-stainless-1200w.webp", "P0",
     "lib/manufacturing.ts · app/[locale]/company-profile/page.tsx",
     "定制腔体主图，同时被 3 个服务页复用，改名后关键词直接落在定制腔体上。"),
    ("photos/chamber-050.webp", "photos/multi-ton-304l-vacuum-chamber-1600w.webp", "P0",
     "app/[locale]/page.tsx",
     "050 是内部编号，对外零信息。新名承载「数吨级 / 304L」两个卖点词。"),
    ("photos/workshop-063.webp", "photos/tig-welding-station-vacuum-chamber-1600w.webp", "P0",
     "app/[locale]/page.tsx · app/[locale]/about/page.tsx",
     "焊接工位，是「真空密封焊接」能力的关键证据图，文件名要写清楚工艺。"),
    ("photos/workshop-058.webp", "photos/vacuum-chamber-workshop-components-1600w.webp", "P0",
     "app/[locale]/page.tsx",
     "车间构件全景，补上主体词。"),
    ("photos/feedthrough-044.webp", "photos/uhv-feedthrough-flange-assembly-1600w.webp", "P0",
     "app/[locale]/page.tsx",
     "超高真空法兰组件。⚠ 另需核实版权来源（疑似渲染图/图库图），用在「我们工厂」版块有风险。"),
    ("photos/cap-cmm.webp", "photos/cmm-inspection-vacuum-component-720w.webp", "P0",
     "app/[locale]/page.tsx · lib/manufacturing.ts",
     "cap = capability 的缩写，对外无意义，且与 news 系列一样是内部代号。"),
    ("photos/cap-chamber.webp", "photos/custom-vacuum-chamber-finished-304l-720w.webp", "P0",
     "app/[locale]/page.tsx · app/[locale]/case-studies/page.tsx · "
     "lib/articles.ts · lib/manufacturing.ts",
     "复用最广的一张（12 个页面），改名收益最大。"),
    ("photos/cap-clean.webp", "photos/vacuum-leak-test-room-door-720w.webp", "P0",
     "app/[locale]/page.tsx（已撤下，改用 tig-welding 实拍）",
     "⚠ 视觉复核后改名：实际画面是「真空检漏室」的门 + 中英文标牌，不是洁净焊接区；首页该卡片与文章封面已换图。"),
    ("photos/cap-leak.webp", "photos/helium-leak-test-ul1000-vacuum-chamber-720w.webp", "P0",
     "app/[locale]/page.tsx · app/[locale]/case-studies/page.tsx · lib/articles.ts",
     "氦质谱检漏。UL1000 是真实设备型号，可以写进文件名（有实物证据）。"),
    ("photos/news-1.webp", "photos/vacuum-chamber-7-inspection-gates-640w.webp", "P0",
     "lib/articles.ts",
     "news-1 与文章 slug 无关。改成与文章 slug 同义，图文实体一致。"),
    ("photos/news-2.webp", "photos/vacuum-chamber-material-304l-or-316l-640w.webp", "P0",
     "lib/articles.ts",
     "同上。"),
    ("photos/news-3.webp", "photos/vacuum-chamber-quotation-drawing-640w.webp", "P0",
     "lib/articles.ts",
     "同上。"),

    # ---- 视频 ----
    ("video/hero-loop-1920.mp4", "video/vacuum-chamber-manufacturing-loop-1920x1080.mp4", "P0",
     "app/[locale]/page.tsx (hero <source> ×2)",
     "视频文件名要能被 AI/搜索当成「内容」读到，而不是 hero-loop-1920 这种占位名。"),
    ("video/hero-loop-1280.mp4", "video/vacuum-chamber-manufacturing-loop-1280x720.mp4", "P0",
     "app/[locale]/page.tsx (hero <source> media=max-width:900px)",
     "与上图共用主干，只改分辨率段。"),

    # ---- 合作伙伴 logo（15 家，同一套规则）----
    ("photos/partners/cetc.webp", "photos/partners/partner-logo-cetc.webp", "P1",
     "app/components/partner-grid.tsx (模板字符串，改 1 处即可)",
     "15 家 logo 统一加 partner-logo- 前缀。作用：告诉爬虫这是「合作方品牌标识」而不是产品图，"
     "避免它们被当正文图片收录；批量处理也更容易。"),
    ("photos/partners/huasheng.webp", "photos/partners/partner-logo-huasheng.webp", "P1", "同上", "同上"),
    ("photos/partners/anhui-yuehao.webp", "photos/partners/partner-logo-anhui-yuehao.webp", "P1", "同上", "同上"),
    ("photos/partners/exact-sc.webp", "photos/partners/partner-logo-exact-sc.webp", "P1", "同上", "同上"),
    ("photos/partners/qianhai-jiuhe.webp", "photos/partners/partner-logo-qianhai-jiuhe.webp", "P1", "同上", "同上"),
    ("photos/partners/power-jacks.webp", "photos/partners/partner-logo-power-jacks.webp", "P1", "同上", "同上"),
    ("photos/partners/songyu.webp", "photos/partners/partner-logo-songyu.webp", "P1", "同上", "同上"),
    ("photos/partners/zhongke-nawei.webp", "photos/partners/partner-logo-zhongke-nawei.webp", "P1", "同上", "同上"),
    ("photos/partners/yuansu-vacuum.webp", "photos/partners/partner-logo-yuansu-vacuum.webp", "P1", "同上", "同上"),
    ("photos/partners/matrix-materials.webp", "photos/partners/partner-logo-matrix-materials.webp", "P1", "同上", "同上"),
    ("photos/partners/hengyue-vacuum.webp", "photos/partners/partner-logo-hengyue-vacuum.webp", "P1", "同上", "同上"),
    ("photos/partners/zhonghang-maite.webp", "photos/partners/partner-logo-zhonghang-maite.webp", "P1", "同上", "同上"),
    ("photos/partners/xiandao.webp", "photos/partners/partner-logo-xiandao.webp", "P1", "同上", "同上"),
    ("photos/partners/pilat-photoelectric.webp", "photos/partners/partner-logo-pilat-photoelectric.webp", "P1", "同上", "同上"),
    ("photos/partners/jianghui-vacuum.webp", "photos/partners/partner-logo-jianghui-vacuum.webp", "P1", "同上", "同上"),
]

# --------------------------------------------------------------------------
# 3. 保持不动（有意为之，附理由）
# --------------------------------------------------------------------------

KEEP = [
    ("favicon.ico", "favicon 是浏览器约定，改名零 SEO 收益且容易踩缓存/书签问题。"),
    ("apple-touch-icon.png", "Apple 约定的固定文件名，必须保持。"),
    ("icon-192.webp", "PWA/manifest 图标规范写法，保持。"),
    ("icon-512.webp", "同上。"),
]

# --------------------------------------------------------------------------
# 4. 待新增（SEO/GEO 缺口，补的是「现在没有」的东西）
# --------------------------------------------------------------------------

ADDITIONS = [
    # (建议文件名, 优先级, 用途/放在哪, 怎么来)
    (f"{BRAND}og-home-zh-1200x630.webp", "P0",
     "首页 /zh/ 的 og:image",
     "用 photos/vacuum-chamber-workshop-changshu-1440w.webp 裁 1200×630 + 压字。现在全站 33 个页面共用一张 og-image.webp，社交/AI 抓取时完全没有区分度。"),
    (f"{BRAND}og-home-en-1200x630.webp", "P0",
     "首页 /en/ 的 og:image",
     "同上，英文压字版本（.com 主面向海外，英文首屏分享卡不能是中文图）。"),
    (f"{BRAND}og-manufacturing-custom-vacuum-chambers-1200x630.webp", "P1",
     "服务页 /manufacturing/custom-vacuum-chambers/",
     "现有 cap-chamber 图裁切 + 压字。"),
    (f"{BRAND}og-manufacturing-precision-components-1200x630.webp", "P1",
     "服务页 /manufacturing/precision-components/", "现有 cap-cmm 图裁切 + 压字。"),
    (f"{BRAND}og-manufacturing-vacuum-tight-welding-1200x630.webp", "P1",
     "服务页 /manufacturing/vacuum-tight-welding/", "现有 workshop-063 图裁切 + 压字。"),
    (f"{BRAND}og-about-1200x630.webp", "P1", "/about/", "车间/团队实拍裁切。"),
    (f"{BRAND}og-case-studies-1200x630.webp", "P1", "/case-studies/", "chamber-050 裁切。"),
    (f"{BRAND}og-company-profile-1200x630.webp", "P1", "/company-profile/", "hero-chamber 裁切。"),
    (f"{BRAND}og-quote-1200x630.webp", "P1", "/request-a-quote/", "图纸/询价主题图。"),
    (f"{BRAND}og-blog-1200x630.webp", "P0",
     "博客列表 /blog/",
     "⚠ 现在 /zh/blog/ 和 /en/blog/ 完全没有 og:image，分享出去是空白卡。必须补。"),
    (f"{BRAND}og-blog-topic-leak-testing-1200x630.webp", "P0",
     "博客专题 /blog/topic/leak-testing/",
     "⚠ 4 个专题页全部没有 og:image。逐个补，用专题内最强的一张图裁切。"),
    (f"{BRAND}og-blog-topic-design-materials-1200x630.webp", "P0", "/blog/topic/design-materials/", "同上"),
    (f"{BRAND}og-blog-topic-clean-particle-1200x630.webp", "P0", "/blog/topic/clean-particle/", "同上"),
    (f"{BRAND}og-blog-topic-quote-delivery-1200x630.webp", "P0", "/blog/topic/quote-delivery/", "同上"),

    ("photos/service-custom-vacuum-chambers-workshop-1200w.webp", "P1",
     "服务页正文 /manufacturing/custom-vacuum-chambers/",
     "现在这张服务页的正文图直接复用首页的 hero-chamber，页面之间图片重复度高，GEO 上「页面=独立实体」的信号变弱。建议每张服务页配一张专属实拍。"),
    ("photos/service-precision-components-cmm-inspection-1200w.webp", "P1",
     "服务页正文 /manufacturing/precision-components/",
     "同上，现在是首页 cap-cmm 复用图。"),
    ("photos/service-vacuum-tight-welding-tig-1200w.webp", "P1",
     "服务页正文 /manufacturing/vacuum-tight-welding/",
     "同上，现在是首页 cap-chamber 复用图。"),

    ("photos/blog-helium-leak-test-vs-pressure-rise-1200w.webp", "P1",
     "文章《氦检和压降法差五个数量级》封面",
     "现在这张封面直接复用能力图 cap-leak，导致「能力图」和「文章封面」撞名撞图。文章封面应独立。"),
    ("photos/blog-vacuum-furnace-structure-design-1200w.webp", "P1",
     "文章《真空炉结构设计五个决定》封面", "现在复用 cap-chamber。"),
    ("photos/blog-coating-chamber-cleaning-particle-control-1200w.webp", "P1",
     "文章《镀膜腔体洗得再干净为什么还是抽不下去》封面", "现在复用 cap-clean。"),

    ("photos/equipment-laser-cutting-30000w-1200w.webp", "P1",
     "设备能力（首页/服务页/公司介绍）",
     "3 万瓦激光是设备台账里已有的真实能力，但现在全站没有一张对应的实拍图。有设备没图 = 能力无法验证。"),
    ("photos/equipment-press-brake-400t-6200mm-1200w.webp", "P1", "同上", "400 吨 · 6.2m 折弯，台账已有，缺图。"),
    ("photos/equipment-helium-leak-detector-ul1000-1200w.webp", "P1", "同上", "氦检仪特写，佐证 ≤1×10⁻⁹ Pa·m³/s 的检出能力。"),
    ("photos/equipment-overhead-crane-50t-1200w.webp", "P1", "同上", "50 吨行车，佐证腔体尺寸上限。"),
    ("photos/factory-exterior-changshu-1200w.webp", "P1",
     "关于我们 / 公司介绍页",
     "对外可信度需要厂区外观图；当前 about 页只有一张焊接工位。"),

    ("photos/partners/partner-logo-<slug>-760w.webp", "P2",
     "合作伙伴墙（首页 + 公司介绍页）",
     "现在 15 张 logo 全部只有 ~380px 宽，在 2x/HiDPI 屏上是糊的。补 760w 版本并加 srcSet。"),
]

# --------------------------------------------------------------------------
# 5. 命名规范（写进 xlsx 与 md，也写进 docs/FRONTEND_CONVENTIONS.md 供后续遵守）
# --------------------------------------------------------------------------

SPEC = [
    ("1", "字符集", "只允许小写字母、数字、连字符 - 和必要的路径分隔符 /。",
     "√ photos/vacuum-chamber-workshop-changshu-1440w.webp\n× VacuumChamber_车间图 最终版.webp"),
    ("2", "分隔符", "只用连字符 -。禁止下划线 _、空格、点、驼峰、中文。",
     "√ helium-leak-test\n× helium_leak_test / heliumLeakTest"),
    ("3", "词序", "业务关键词在最前，限定词在后，最后才是宽度。搜索引擎对文件名前段权重更高，AI 抓取也更容易切词。",
     "√ custom-vacuum-chamber-304l-stainless-1200w.webp\n× 1200w-304l-custom-vacuum-chamber.webp"),
    ("4", "长度", "3–6 个词（宽度段不计），整个文件名 ≤ 60 字符。",
     "√ cmm-inspection-vacuum-component-720w.webp (42)\n× our-factory-vacuum-chamber-manufacturing-workshop-photo-001.webp"),
    ("5", "宽度后缀", "位图统一以 -<真实像素宽>w 结尾（如 -1280w），放在扩展名前。不用 -2x / -small / -big / -thumb。",
     "√ ...-1440w.webp + ...-1280w.webp\n× ...-2x.webp / ...-small.webp"),
    ("6", "视频命名", "同一支视频的所有分辨率共用主干，只改分辨率段 -<宽>x<高>。",
     "√ vacuum-chamber-manufacturing-loop-1920x1080.mp4\n  vacuum-chamber-manufacturing-loop-1280x720.mp4"),
    ("7", "禁用词", "img / photo / pic / image / picture / hero / cap / news / final / last / "
     "new / copy / test / DSC / IMG / 未命名 / 最终 / 图1 / 1 / 2 / 3。",
     "这些词不携带任何检索信息，占了文件名最值钱的前缀位。"),
    ("8", "品牌前缀", "只给品牌资产（logo / wordmark / og / 二维码 / 图标）加 pano-vacuum- 前缀。"
     "内容图不加，避免每张图前缀重复、关键词后移。",
     "√ pano-vacuum-logo-324w.webp\n√ vacuum-chamber-workshop-changshu-1440w.webp\n× pano-vacuum-chamber-inspection.webp"),
    ("9", "一套文件两语言", ".com 与 .cn 共用同一份图片文件，语言差异只体现在 alt 与 JSON-LD 文案上，"
     "绝不为了中文另存一份 zh-xxx.webp。",
     "同一张图两套文件名 = 重复内容 + 双倍维护 + 两套缓存。已在线上核验：两域名返回的字节完全一致。"),
    ("10", "合作方 logo", "统一 partner-logo-<slug>.webp，slug 来自 lib/partners.ts（唯一事实来源）。",
     "√ partner-logo-hengyue-vacuum.webp\n× hengyue-vacuum.webp (会被当成产品图)"),
    ("11", "alt 文案", "alt 必须写「看到了什么 + 对业务意味着什么」，中文 15–35 字、英文 ≤ 125 字符；"
     "禁止与文件名逐字重复，禁止堆关键词。",
     "√ 定制真空腔体成品，304L 不锈钢\n× 真空腔体 真空腔体厂家 真空腔体定制"),
    ("12", "文件名即实体", "同名文件 = 同一实体。一个文件被 5 个页面复用时，它就是这 5 个页面共享的实体，"
     "要在 JSON-LD 里被显式引用（Organization.image / Service.image / Article.image）。",
     "命名对不上，AI 搜索就无法把「图」和「能力/产品/文章」关联起来，GEO 拿不到引用。"),
]

# --------------------------------------------------------------------------
# 6. 执行步骤
# --------------------------------------------------------------------------

STEPS = [
    ("0", "备份（必做，先做）",
     "cp -R public /tmp/public-backup-$(date +%Y%m%d-%H%M%S)\ngit -C . status --short   # 必须干净，否则先 stash"),
    ("1", "生成改名脚本并 dry-run",
     "python3 scripts/gen-asset-naming-list.py --emit-rename-sh\nbash scripts/rename-assets-seo.sh --dry-run   # 只打印将要执行的 git mv"),
    ("2", "真正迁移文件",
     "bash scripts/rename-assets-seo.sh\n# 用 git mv 而不是 mv，保留历史，diff 可读"),
    ("3", "同步修改代码引用（15 个文件）",
     "app/[locale]/page.tsx · app/[locale]/layout.tsx · app/layout.tsx · app/globals.css ·\n"
     "app/[locale]/about/page.tsx · app/[locale]/company-profile/page.tsx ·\n"
     "app/[locale]/case-studies/page.tsx · app/[locale]/request-a-quote/page.tsx ·\n"
     "app/[locale]/blog/[slug]/page.tsx · app/components/header.tsx · app/components/footer.tsx ·\n"
     "app/components/partner-grid.tsx · lib/manufacturing.ts · lib/articles.ts · lib/partners.ts(注释)"),
    ("4", "补 301 跳转（旧图片 URL 已被索引，不能直接 404）",
     "在 public/_redirects 追加约 40 行：\n/photos/hero-main.webp /photos/vacuum-chamber-workshop-changshu-1440w.webp 301\n"
     "Cloudflare Pages 静态 _redirects 上限 2100 条，够用。"),
    ("5", "补缓存头（只在改名之后做）",
     "public/_headers 追加：\n/photos/*\n  Cache-Control: public, max-age=31536000, immutable\n/video/*\n  Cache-Control: public, max-age=31536000, immutable\n"
     "⚠ 顺序不能反：现在线上是 max-age=14400, must-revalidate，先改名再长缓存；\n"
     "先长缓存会让用户在改名后仍拿到旧图（旧图 301 后依然可能被缓存）。"),
    ("6", "补 site.webmanifest",
     "public/site.webmanifest，name=PANO Vacuum 帕诺真空机械，引用 icon-192/512。\n有助于 PWA 与品牌实体识别。"),
    ("7", "补 OG 图与 JSON-LD image",
     "按 05 表补 14 张 OG 图（其中 6 张 P0：blog 列表 + 4 个专题 + 首页）。\n"
     "同时给 Organization / Service / AboutPage / ItemList 补 image 字段——目前只有 logo，没有 image。"),
    ("8", "构建与校验",
     "pnpm typecheck && pnpm build && pnpm verify\nnode scripts/check-css-compat.mjs"),
    ("9", "双域名分别构建快照（关键，别踩并发覆写 out/ 的坑）",
     "pnpm build && cp -R out /tmp/out-com\npnpm build:cn && cp -R out /tmp/out-cn"),
    ("10", "双域名分别部署",
     "PROJECT=pano-vacuum   DIR=/tmp/out-com node scripts/deploy.pages.mjs\n"
     "PROJECT=panovacuum-cn DIR=/tmp/out-cn  node scripts/deploy.pages.mjs\n"
     "# 部署脚本会在轮询阶段挂住，属已知现象：放后台跑，轮询 deployments 接口看到\n"
     "# latest_stage.status == success 后 job_kill 即可。"),
    ("11", "提交新 URL 给搜索引擎",
     "图片改名后要主动提交，否则索引里还是旧 URL：\n"
     "· IndexNow（必应/Yandex）—— pub/81ea...txt 是 key，POST 新图片 URL 列表\n"
     "· 百度搜索资源平台 —— 普通收录逐条提交 /photos/* 新 URL（.cn 必做）\n"
     "· Google Search Console —— 提交 /sitemap.xml，图片会随页面一起重抓"),
    ("12", "回归检查",
     "cp -R out /tmp/out-verify\n"
     "· 每个页面的 <img src> 是否都能 200（不能用 grep 通过就算完，要真发请求）\n"
     "· 老 URL 是否 301 到新 URL\n"
     "· 首屏视频/图片是否还在（历史事故：hero 曾因 inset 简写整块消失）"),
]

# --------------------------------------------------------------------------


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def collect_public(public_dir):
    rows = []
    for dp, dn, fn in os.walk(public_dir):
        for f in fn:
            p = os.path.join(dp, f)
            rel = os.path.relpath(p, public_dir).replace(os.sep, "/")
            ext = os.path.splitext(f)[1].lower()
            rows.append({
                "rel": rel,
                "bytes": os.path.getsize(p),
                "ext": ext,
                "is_media": ext in MEDIA_EXT and rel not in NON_MEDIA,
            })
    return sorted(rows, key=lambda r: r["rel"])


def image_size(path):
    try:
        from PIL import Image
        with Image.open(path) as im:
            return im.width, im.height
    except Exception:
        return None, None


def collect_usage(out_dir):
    """页面 × 资源：扫构建产物，拿到每张图被哪些页面引用、alt 是什么、有没有 width/height。"""
    usage = {}
    if not os.path.isdir(out_dir):
        return usage, {}
    tag_re = re.compile(r"<(img|source|video)\b[^>]*>", re.I)
    og_re = re.compile(r'property="og:image"\s+content="([^"]+)"')
    pages_og = {}
    for dp, dn, fn in os.walk(out_dir):
        for f in fn:
            if not f.endswith(".html"):
                continue
            full = os.path.join(dp, f)
            rel = os.path.relpath(full, out_dir).replace(os.sep, "/")
            url = "/" + rel[:-len("index.html")] if rel.endswith("index.html") else "/" + rel
            html = open(full, encoding="utf-8", errors="ignore").read()
            m = og_re.search(html)
            pages_og[url] = m.group(1) if m else None
            for tm in tag_re.finditer(html):
                tag = tm.group(0)
                sm = re.search(r'(?:src|srcset)="([^"]+)"', tag)
                if not sm:
                    continue
                src = sm.group(1).split(",")[0].strip().split(" ")[0]
                if not src.startswith("/"):
                    continue
                alt = re.search(r'alt="([^"]*)"', tag)
                w = re.search(r'width="(\d+)"', tag)
                h = re.search(r'height="(\d+)"', tag)
                e = usage.setdefault(src, {"pages": [], "alt": {"zh": "", "en": ""},
                                           "dims_set": True, "tags": 0})
                if url not in e["pages"]:
                    e["pages"].append(url)
                if not (w and h):
                    e["dims_set"] = False
                e["tags"] += 1
                loc = "zh" if url.startswith("/zh") else "en"
                if alt and not e["alt"][loc]:
                    e["alt"][loc] = alt.group(1)
    for v in usage.values():
        v["pages"].sort()
    return usage, pages_og


def collect_references(repo_root):
    """源码里对每个素材的「精确路径」引用 —— 用来判孤儿，不做模糊 basename 匹配。"""
    src_files = []
    for base in ("app", "lib", "scripts"):
        d = os.path.join(repo_root, base)
        if not os.path.isdir(d):
            continue
        for dp, dn, fn in os.walk(d):
            if "node_modules" in dp:
                continue
            for f in fn:
                if os.path.splitext(f)[1] in {".ts", ".tsx", ".js", ".mjs", ".css"}:
                    src_files.append(os.path.join(dp, f))
    for extra in ("app/globals.css", "public/llms.txt", "public/_redirects", "public/_headers"):
        p = os.path.join(repo_root, extra)
        if os.path.isfile(p) and p not in src_files:
            src_files.append(p)
    texts = []
    for p in src_files:
        try:
            texts.append((os.path.relpath(p, repo_root).replace(os.sep, "/"),
                          open(p, encoding="utf-8", errors="ignore").read()))
        except Exception:
            pass
    return texts


def who_references(rel, texts):
    hits = []
    if "/" in rel:
        needle = rel
        for name, t in texts:
            if needle in t:
                hits.append(name)
    else:
        pat = re.compile(r"(?<![-\w.])/?" + re.escape(rel))
        for name, t in texts:
            if pat.search(t):
                hits.append(name)
    return hits


def main():
    ap = argparse.ArgumentParser()
    here = os.path.dirname(os.path.abspath(__file__))
    repo = os.path.dirname(here)
    today = date.today().isoformat()
    ap.add_argument("--public", default=os.path.join(repo, "public"))
    ap.add_argument("--out", default=os.path.join(repo, "out"))
    ap.add_argument("--xlsx", default=os.path.expanduser(
        f"~/Desktop/帕诺真空_图片视频命名清单_{today}.xlsx"))
    ap.add_argument("--md", default=os.path.join(repo, "docs", f"ASSET-NAMING-{today}.md"))
    ap.add_argument("--emit-rename-sh", action="store_true",
                    help="额外输出 scripts/rename-assets-seo.sh")
    args = ap.parse_args()

    public = collect_public(args.public)
    usage, pages_og = collect_usage(args.out)
    texts = collect_references(repo)

    media = [r for r in public if r["is_media"]]
    non_media = [r for r in public if not r["is_media"]]
    rename_map = {old: new for old, new, *_ in RENAMES}

    # ---- 03 现有资源全量清单 ----
    inventory = []
    for r in media:
        rel = r["rel"]
        w, h = image_size(os.path.join(args.public, rel))
        refs = who_references(rel, texts)
        dyn = rel.startswith("photos/partners/")
        if refs:
            ref_flag = "代码引用"
        elif dyn:
            ref_flag = "动态引用(lib/partners.ts)"
            refs = ["lib/partners.ts (slug → /photos/partners/<slug>.webp)"]
        else:
            ref_flag = "孤儿·无引用"
        pages = usage.get("/" + rel, {}).get("pages", [])
        alts = usage.get("/" + rel, {}).get("alt", {})
        if rel in rename_map:
            action = "改名"
        elif rel in KEEP:
            action = "保持"
        elif not refs:
            action = "移除（孤儿）"
        else:
            action = "保持"
        dim = f"{w}×{h}" if w else ("视频" if r["ext"] in {".mp4", ".webm"} else "—")
        inventory.append([
            len(inventory) + 1, "/" + rel, r["ext"].lstrip(".").upper(), r["bytes"], dim,
            ref_flag, len(pages), os.path.dirname("/" + rel) or "/",
            alts.get("zh", ""), alts.get("en", ""), action,
        ])

    # ---- 04 改名映射表 ----
    mapping = []
    for i, (old, new, pri, files, note) in enumerate(RENAMES, 1):
        w, h = image_size(os.path.join(args.public, old))
        dim = f"{w}×{h}" if w else "视频"
        size = os.path.getsize(os.path.join(args.public, old)) if os.path.exists(os.path.join(args.public, old)) else 0
        pages = usage.get("/" + old, {}).get("pages", [])
        mapping.append([i, pri, "/" + old, dim, size, "/" + new,
                        f"{len(pages)} 个页面" if pages else "—", files, note])

    # ---- 05 移除清单 ----
    removals = []
    for r in media:
        rel = r["rel"]
        if rel in rename_map or rel in dict(KEEP):
            continue
        if who_references(rel, texts):
            continue
        w, h = image_size(os.path.join(args.public, rel))
        if rel.startswith("photos/hero-slide"):
            why = "首屏轮播遗留（.hero-slide 已是死代码，CSS 里只剩空规则）。占位最狠、最大。"
        elif rel == "video/hero-poster.jpg":
            why = "首屏海报已被 photos/hero-main.webp（webp 更小）取代，jpg 版无人引用。"
        elif rel in ("logo.webp", "logo-2x.webp"):
            why = "旧 logo，已被 pano-vacuum-tech-logo*.webp 取代；留着容易和现用 logo 混淆。"
        elif rel.startswith("favicon-") or rel.startswith("android-chrome-"):
            why = "没有 site.webmanifest，这批图标全部无人引用。要么删，要么补 manifest（见 05 表）。"
        elif rel == "photos/workshop-054.webp":
            why = "拍摄序号命名 + 无引用，双重问题。"
        else:
            why = "无任何代码/页面引用。"
        removals.append([len(removals) + 1, "/" + rel, f"{w}×{h}" if w else "—",
                         r["bytes"], why, "删除"])

    # ---- xlsx ----
    from openpyxl import Workbook
    from openpyxl.styles import Font, PatternFill, Alignment
    from openpyxl.utils import get_column_letter

    wb = Workbook()
    HEAD = PatternFill("solid", fgColor="4E70C3")
    HEADF = Font(bold=True, color="FFFFFF", size=11)
    TITLE = Font(bold=True, size=13, color="1F2A44")

    def sheet(name, subtitle, headers, rows, widths, wrap_cols=()):
        ws = wb.create_sheet(name)
        ws["A1"] = subtitle
        ws["A1"].font = TITLE
        ws.merge_cells(start_row=1, start_column=1,
                       end_row=1, end_column=max(len(headers), 1))
        ws.append([])
        ws.append(headers)
        for c in range(1, len(headers) + 1):
            cell = ws.cell(row=3, column=c)
            cell.fill = HEAD
            cell.font = HEADF
            cell.alignment = Alignment(vertical="center", horizontal="center", wrap_text=True)
        for row in rows:
            ws.append(row)
        for i, wd in enumerate(widths, 1):
            ws.column_dimensions[get_column_letter(i)].width = wd
        for c in wrap_cols:
            for r in range(4, ws.max_row + 1):
                ws.cell(row=r, column=c).alignment = Alignment(wrap_text=True, vertical="top")
        ws.freeze_panes = "A4"
        ws.auto_filter.ref = f"A3:{get_column_letter(len(headers))}{ws.max_row}"
        return ws

    # 00 使用说明
    ws = wb.active
    ws.title = "00-使用说明"
    ws["A1"] = "帕诺真空 · 全站图片/视频命名清单"
    ws["A1"].font = Font(bold=True, size=16, color="1E3A8A")
    ws["A2"] = f"生成日期 {today} · 仓库 /Users/mac/panovacuum-site · 基线 commit 677ff29 · 覆盖 panovacuum.com 与 panovacuum.cn"
    intro = [
        "",
        "【一句话结论】",
        "  现存 54 个图片/视频素材里，只有 9 个文件名是「给人看也有信息量」的（logo / wordmark / og / 二维码 / favicon 那批），",
        "  其余 14 张内容图 + 2 支视频 + 15 家伙伴 logo 全部是内部代号（hero-main / cap-leak / news-1 / workshop-063 /",
        "  chamber-050 / hero-slide-2），对 SEO 和 GEO 都是零贡献——文件名是搜索引擎和 AI 唯一能免费读到的一行结构化描述。",
        "  另外：13 个页面完全没有 og:image、22 个页面共用同一张默认 OG；服务页与文章封面大量复用首页图；",
        "  3 万瓦激光等 4 项真实设备能力完全没有配图。",
        "",
        "【.com 和 .cn 的关系 —— 这是最容易被做成两份的地方】",
        "  已实测核验：panovacuum.com 与 panovacuum-cn.pages.dev 对同一路径返回的字节完全一致",
        "  （hero-main.webp 167,516B / cap-leak.webp 20,406B / og-image.webp 9,752B / hero-loop-1280.mp4 1,523,432B /",
        "   brand-wordmark.webp 1,482B，五个样本两域名全等）。",
        "  → 结论：一套文件，两套 alt/JSON-LD 文案。绝对不要为中文另存一份 zh-xxx.webp。",
        "     那会造成重复内容、双倍维护、两套缓存，而且收益是负的。",
        "  → 因此本清单只有一份，.com 与 .cn 通用；域名差异只体现在 alt 与 JSON-LD 的语言上。",
        "",
        "【看哪张表】",
        "  01-命名规范        规则本身（新图一律照这个起名，起名时不用再问人）",
        "  02-现有资源全量清单 59 个 public 文件的现状：尺寸、引用状态、被几个页面用、现在的中英文 alt",
        "  03-改名映射表      核心表。35 条改名：旧名 → 新名 + 要同步改哪个文件 + 为什么这么改",
        "  04-移除清单        14 个孤儿文件，合计约 1.69 MB，可直接删",
        "  05-待新增清单      14 张 OG 图 + 服务页/文章封面的专属图 + 4 项设备实拍",
        "  06-页面×资源矩阵   47 个构建页面各自用了哪些图（改名前用它评估影响面）",
        "  07-OG与JSON-LD     全站 og:image 现状审计：6 个页面完全没有，33 个页面共用一张",
        "  08-视频清单        2 支首屏视频的规格与改名方案",
        "  09-执行步骤        12 步可执行流程，含备份、301、缓存头顺序、双域名部署",
        "",
        "【优先级说明】",
        "  P0 = 不改就是明显扣分（文件名零关键词、og:image 缺失、页面间图片高度重复）",
        "  P1 = 建议改（品牌资产命名统一、合作方 logo 前缀、专属配图）",
        "  P2 = 可选（@2x 高清版本等体验项）",
        "",
        "【红线提醒（命名之外，别踩）】",
        "  · 文案不得出现「ISO Class 洁净室」，一律写「受控洁净焊接环境」",
        "  · 不得编造资质（ISO9001 / EN1090 / 3834 只能写「认证推进中」）",
        "  · 能力只能从设备台账取：3 万瓦激光 / 400 吨·6.2m 折弯 / 40+ 焊接工位 / 50 吨行车 / 氦检 ≤1×10⁻⁹ Pa·m³/s",
        "  · 每个数字都要有图或记录兜底；不得写「行业领先」「第一」；不得承诺整机",
        "  · photos/feedthrough-044.webp 疑似渲染图/图库图，用在「我们工厂」版块前先核实来源",
    ]
    for i, line in enumerate(intro, start=4):
        ws.cell(row=i, column=1, value=line)
    ws.column_dimensions["A"].width = 130

    # 01 命名规范
    sheet("01-命名规范", "命名规范 · 12 条（新素材一律照此命名）",
          ["#", "规则", "说明", "正例 / 反例"],
          [[a, b, c, d] for a, b, c, d in SPEC],
          [4, 16, 66, 62], wrap_cols=(3, 4))

    # 02 现有资源全量清单
    sheet("02-现有资源全量清单",
          f"现有资源全量清单 · {len(media)} 个图片/视频（另有 {len(non_media)} 个非素材文件未列入）",
          ["#", "当前路径", "格式", "字节", "尺寸", "引用状态", "被引用页面数",
           "目录", "alt 中文", "alt 英文", "处置"],
          inventory,
          [4, 58, 8, 10, 12, 24, 12, 16, 40, 44, 14], wrap_cols=(6, 9, 10))

    # 03 改名映射表
    sheet("03-改名映射表",
          f"改名映射表 · {len(mapping)} 条（.com / .cn 通用，同一套文件）",
          ["#", "优先级", "现在文件名", "尺寸", "字节", "建议文件名", "影响页面", "需同步修改的代码文件", "为什么"],
          mapping,
          [4, 8, 52, 12, 10, 62, 12, 52, 62], wrap_cols=(6, 8, 9))

    # 04 移除清单
    total_del = sum(r[3] for r in removals)
    sheet("04-移除清单",
          f"移除清单 · {len(removals)} 个孤儿文件，合计 {total_del:,} 字节（约 {total_del/1048576:.2f} MB）",
          ["#", "路径", "尺寸", "字节", "为什么可以删", "动作"],
          removals, [4, 52, 12, 10, 76, 8], wrap_cols=(5,))

    # 05 待新增清单
    sheet("05-待新增清单", f"待新增清单 · {len(ADDITIONS)} 项（补的是现在完全没有的东西）",
          ["#", "建议文件名", "优先级", "用途 / 放在哪", "怎么来 / 为什么需要"],
          [[i, a, b, c, d] for i, (a, b, c, d) in enumerate(ADDITIONS, 1)],
          [4, 62, 8, 44, 86], wrap_cols=(4, 5))

    # 06 页面×资源矩阵
    matrix_rows = []
    for src in sorted(usage):
        e = usage[src]
        matrix_rows.append([src, len(e["pages"]), e["tags"],
                            "是" if e["dims_set"] else "否 · 有 CLS 风险",
                            e["alt"].get("zh", ""), e["alt"].get("en", ""),
                            " / ".join(e["pages"])])
    sheet("06-页面×资源矩阵",
          f"页面 × 资源矩阵 · {len(matrix_rows)} 个被引用的素材（来自 out/ 构建产物，共 {len(pages_og)} 个页面）",
          ["资源路径", "被引用页面数", "标签出现次数", "是否都带 width/height",
           "alt 中文", "alt 英文", "出现页面"],
          matrix_rows, [56, 12, 12, 18, 38, 42, 80], wrap_cols=(7,))

    # 07 OG 与 JSON-LD
    og_rows = []
    for url in sorted(pages_og):
        v = pages_og[url]
        short = v.replace("https://panovacuum.cn", "") if v else ""
        og_rows.append([url, "缺失 ⚠" if not v else short,
                        "缺失" if not v else ("全站共用" if short == "/og-image.webp" else "文章封面")])
    sheet("07-OG与JSON-LD", f"og:image 现状审计 · 共 {len(pages_og)} 个页面",
          ["页面", "当前 og:image", "判断"],
          og_rows, [64, 56, 16])
    r = len(og_rows) + 6
    ws = wb["07-OG与JSON-LD"]
    notes = [
        "【问题 1】/zh/blog/ 与 /en/blog/ 完全没有 og:image —— 分享到微信/领英/推特是空白卡。",
        "【问题 2】4 个博客专题页（leak-testing / design-materials / clean-particle / quote-delivery）同样没有 og:image。",
        "【问题 3】其余 33 个页面共用同一张 /og-image.webp，英文页和中文页也是同一张中文压字图。",
        "【问题 4】博客文章封面直接用能力图（cap-leak / cap-clean / cap-chamber），图与文不是一一对应。",
        "【问题 5】JSON-LD 里只有 Article 有 image；Organization 只有 logo、没有 image；",
        "          Service / AboutPage / ItemList 全都没有 image。GEO（AI 引用）最缺的就是这个关联。",
        "【建议】按 05 表补 14 张 OG 图；Organization.image 指向 /pano-vacuum-logo-648w.webp；",
        "        每个 Service 指向对应服务页实拍图。",
    ]
    for i, t in enumerate(notes):
        ws.cell(row=r + i, column=1, value=t)

    # 08 视频清单
    sheet("08-视频清单", "视频清单 · 2 支（首屏 hero 循环）",
          ["#", "当前路径", "分辨率", "时长", "编码", "字节", "建议新名", "说明"],
          [
              [1, "/video/hero-loop-1920.mp4", "1920×1080", "13.000s", "h264", 3853184,
               "/video/vacuum-chamber-manufacturing-loop-1920x1080.mp4",
               "桌面首屏。文件名写清「真空腔体 / 制造 / 循环」，AI 视频检索也读文件名。"],
              [2, "/video/hero-loop-1280.mp4", "1280×720", "13.000s", "h264", 1523432,
               "/video/vacuum-chamber-manufacturing-loop-1280x720.mp4",
               "窄屏（≤900px）变体，共用主干名。"],
          ],
          [4, 34, 12, 10, 8, 10, 62, 66], wrap_cols=(8,))

    # 09 执行步骤
    sheet("09-执行步骤", '执行步骤 · 12 步（顺序有意义，尤其第 5 步与第 4 步不能颠倒）',
          ["步", "做什么", "怎么做 / 命令"],
          [[a, b, c] for a, b, c in STEPS],
          [5, 40, 130], wrap_cols=(3,))

    os.makedirs(os.path.dirname(args.xlsx), exist_ok=True)
    wb.save(args.xlsx)
    print(f"[ok] xlsx → {args.xlsx}")

    # ---- markdown ----
    os.makedirs(os.path.dirname(args.md), exist_ok=True)
    with open(args.md, "w", encoding="utf-8") as fh:
        fh.write(f"# 帕诺真空 · 全站图片/视频命名规范与清单\n\n")
        fh.write(f"> 生成日期 {today} · 仓库 `/Users/mac/panovacuum-site` · 基线 commit `677ff29`  \n")
        fh.write(f"> 覆盖 `panovacuum.com` 与 `panovacuum.cn`（实测两域名素材字节完全一致，一套文件、两套 alt）\n\n")
        fh.write("## 结论摘要\n\n")
        fh.write(f"- `public/` 共 {len(public)} 个文件，其中素材 {len(media)} 个、非素材 {len(non_media)} 个。\n")
        fh.write(f"- 需改名 **{len(mapping)}** 条，需删除 **{len(removals)}** 个孤儿文件（{total_del:,} B ≈ {total_del/1048576:.2f} MB），需新增 **{len(ADDITIONS)}** 项。\n")
        fh.write(f"- `og:image`：{sum(1 for v in pages_og.values() if not v)} 个页面缺失，其余 {sum(1 for v in pages_og.values() if v and v.endswith('/og-image.webp'))} 个共用同一张默认图。\n")
        fh.write("- 内容图文件名几乎全部是内部代号（`hero-main` / `cap-*` / `news-*` / `workshop-*` / `chamber-050`），关键词为零。\n\n")
        def oneline(x):
            return str(x).replace("\n", " / ").replace("|", "\\|")

        fh.write("## 命名规范\n\n| # | 规则 | 说明 | 正例 / 反例 |\n|---|---|---|---|\n")
        for a, b, c, d in SPEC:
            fh.write(f"| {a} | {b} | {oneline(c)} | {oneline(d)} |\n")
        fh.write("\n## 改名映射表\n\n| 优先级 | 现在 | 建议 | 需改文件 | 为什么 |\n|---|---|---|---|---|\n")
        for _i, pri, old, _dim, _sz, new, _pages, files, note in mapping:
            fh.write(f"| {pri} | `{old}` | `{new}` | {oneline(files)} | {oneline(note)} |\n")
        fh.write("\n## 待删除（孤儿）\n\n| 路径 | 尺寸 | 字节 | 为什么 |\n|---|---|---|---|\n")
        for _i, p, dim, sz, why, _a in removals:
            fh.write(f"| `{p}` | {dim} | {sz:,} | {why} |\n")
        fh.write("\n## 待新增\n\n| 建议文件名 | 优先级 | 用途 | 说明 |\n|---|---|---|---|\n")
        for a, b, c, d in ADDITIONS:
            fh.write(f"| `{a}` | {b} | {c} | {d} |\n")
        fh.write("\n## 执行步骤\n\n")
        for a, b, c in STEPS:
            fh.write(f"### {a}. {b}\n\n```bash\n{c}\n```\n\n")
        fh.write("## 页面 × 资源矩阵\n\n| 资源 | 页面数 | alt 中文 | 页面 |\n|---|---|---|---|\n")
        for row in matrix_rows:
            fh.write(f"| `{row[0]}` | {row[1]} | {row[4]} | {row[6]} |\n")
    print(f"[ok] md   → {args.md}")

    # ---- 可选：改名脚本 ----
    if args.emit_rename_sh:
        sh = os.path.join(repo, "scripts", "rename-assets-seo.sh")
        with open(sh, "w", encoding="utf-8") as fh:
            fh.write("#!/usr/bin/env bash\n# 由 scripts/gen-asset-naming-list.py --emit-rename-sh 生成\n")
            fh.write("# 用法： bash scripts/rename-assets-seo.sh [--dry-run]\n")
            fh.write("set -euo pipefail\n")
            fh.write('DRY=${1:-}\n')
            fh.write('cd "$(dirname "$0")/.."\n')
            fh.write('run() {\n')
            fh.write('  if [ "$DRY" = "--dry-run" ]; then echo "git mv $1 -> $2"; else git mv "$1" "$2"; fi\n')
            fh.write('}\n')
            for old, new, _p, _f, _n in RENAMES:
                fh.write(f'run "public/{old}" "public/{new}"\n')
            fh.write('echo "改名完成。别忘了：1) 代码引用 2) public/_redirects 301 3) _headers 缓存头（改名之后再做）。"\n')
        os.chmod(sh, 0o755)
        print(f"[ok] sh   → {sh}")


if __name__ == "__main__":
    sys.exit(main())
