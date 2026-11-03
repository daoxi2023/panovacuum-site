// 社交/搜索分享图（og:image 与 twitter:image）统一出口。
// 纪律：
//  1. 所有分享图都是 1200×630，由 public/photos/ 里 ≥1200px 的**真实厂内照片**裁切而来，不使用图库/渲染图。
//  2. 文件名遵循 docs/ASSET-NAMING-2026-11-03.md 的命名规范（pano-vacuum-og-<主题>-1200x630.webp）。
//  3. alt 按语言区分（中文 15–35 字 / 英文 ≤125 字符），不复读文件名。
import { SITE_BASE } from "./site-base";

export const OG_W = 1200;
export const OG_H = 630;

/** 默认分享图：全站兜底（About/服务页/隐私条款等无专属图的页面）。 */
export const OG_DEFAULT = "pano-vacuum-og-default-1200x630.webp";

/** 博客索引页专属分享图。 */
export const OG_BLOG = "pano-vacuum-og-blog-1200x630.webp";

/** 主题系列（hub）页专属分享图，键为 lib/blog-topics.ts 的 slug。 */
export const OG_BY_TOPIC: Record<string, string> = {
  "leak-testing": "pano-vacuum-og-blog-topic-leak-testing-1200x630.webp",
  "design-materials": "pano-vacuum-og-blog-topic-design-materials-1200x630.webp",
  "clean-particle": "pano-vacuum-og-blog-topic-clean-particle-1200x630.webp",
  "quote-delivery": "pano-vacuum-og-blog-topic-quote-delivery-1200x630.webp",
};

/**
 * 其余页面专属分享图，键为路由路径。
 * 未登记的页面（首页 /zh/、/en/、/case-studies/ 等）使用 OG_DEFAULT。
 */
export const OG_BY_PAGE: Record<string, string> = {
  about: "pano-vacuum-og-about-1200x630.webp",
  "company-profile": "pano-vacuum-og-company-profile-1200x630.webp",
  "request-a-quote": "pano-vacuum-og-quote-1200x630.webp",
  "manufacturing/custom-vacuum-chambers": "pano-vacuum-og-manufacturing-custom-vacuum-chambers-1200x630.webp",
  "manufacturing/precision-components": "pano-vacuum-og-manufacturing-precision-components-1200x630.webp",
  "manufacturing/vacuum-tight-welding": "pano-vacuum-og-manufacturing-vacuum-tight-welding-1200x630.webp",
};

/** 取某路径的专属分享图，没有则回落默认图。 */
export function ogForPage(path: string): string {
  return OG_BY_PAGE[path] ?? OG_DEFAULT;
}

/**
 * 生成页面级 openGraph + twitter，保证 og:url / og:type / og:site_name 与当前页一致。
 * 页面不单独写 openGraph 时会整段继承 layout 的值，og:url 就指向首页——
 * 这是分享卡片「张冠李戴」的常见原因，所以每个页面都显式声明。
 * @param path 路由相对路径（不带首尾斜杠），首页传 ""
 */
export function pageOg(opts: {
  path: string;
  locale: string;
  title: string;
  description: string;
  image?: string;
  altZh: string;
  altEn: string;
}) {
  const zh = opts.locale === "zh";
  const url = `${SITE_BASE}/${opts.locale}/${opts.path ? `${opts.path}/` : ""}`;
  const file = opts.image ?? ogForPage(opts.path);
  const alt = zh ? opts.altZh : opts.altEn;
  return {
    openGraph: {
      type: "website" as const,
      url,
      title: opts.title,
      description: opts.description,
      siteName: "PANO Vacuum",
      locale: zh ? "zh_CN" : "en_US",
      images: ogImage(file, alt),
    },
    twitter: twitterCard(file, alt),
  };
}

/** 文章页专属分享图，键为 lib/articles.ts 的 slug；未登记的文章回落到自身封面。 */
export const OG_BY_ARTICLE: Record<string, string> = {
  "vacuum-chamber-7-inspection-gates": "pano-vacuum-og-article-7-inspection-gates-1200x630.webp",
  "chamber-material-304l-or-316l": "pano-vacuum-og-article-material-304l-316l-1200x630.webp",
  "how-to-request-a-quote-with-a-drawing": "pano-vacuum-og-article-quote-with-drawing-1200x630.webp",
  "helium-leak-test-vs-pressure-rise": "pano-vacuum-og-article-helium-leak-test-1200x630.webp",
  "vacuum-furnace-structure-design": "pano-vacuum-og-article-vacuum-furnace-design-1200x630.webp",
  "coating-chamber-cleaning-particle-control": "pano-vacuum-og-article-coating-chamber-cleaning-1200x630.webp",
};

/**
 * 组装 Next.js metadata 需要的 images 数组。
 * @param file public/ 下的文件名或绝对路径（如 "/photos/x.webp"）
 */
export function ogImage(file: string, alt: string, width = OG_W, height = OG_H) {
  const path = file.startsWith("/") ? file : `/${file}`;
  return [{ url: `${SITE_BASE}${path}`, width, height, alt }];
}

/** twitter 卡片（大图）配置。 */
export function twitterCard(file: string, alt: string, width = OG_W, height = OG_H) {
  return {
    card: "summary_large_image" as const,
    images: ogImage(file, alt, width, height),
  };
}

/**
 * 文章封面（页内正文图，非分享图）的真实像素尺寸。
 * 封面比分享图小，声明成 1200×630 会让抓取端按错误比例裁切，故按文件名宽度后缀如实声明。
 */
export function coverSize(cover: string): { width: number; height: number } {
  if (cover.includes("-640w")) return { width: 640, height: 360 };
  if (cover.includes("-720w")) return { width: 720, height: 480 };
  return { width: OG_W, height: OG_H };
}
