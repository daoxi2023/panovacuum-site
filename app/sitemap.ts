import type { MetadataRoute } from "next";
import { articles } from "../lib/articles";
import { manufacturingServices } from "../lib/manufacturing";
import { blogTopics } from "../lib/blog-topics";
import { SITE_BASE } from "@/lib/site-base";

export const dynamic = "force-static";

const base = SITE_BASE;
// 国内站（.cn）以中文为主入口，x-default 指向中文；海外站（.com）指向英文。
const primaryLocale = base.includes("panovacuum.cn") ? "zh" : "en";
// 静态导出统一使用带尾斜杠的规范地址，避免 sitemap 每条都多跳一次 308。
const pageUrl = (locale: string, p: string) => `${base}/${locale}${p ? `/${p}` : ""}/`;
const pages = ["", "products", "about", "request-a-quote", "blog", "case-studies", "industrial-partnerships", "company-profile", "privacy", "terms"] as const;

const entries: { path: string; priority: number; lastModified?: string }[] = [
  ...pages.map((p) => ({ path: p, priority: p ? 0.9 : 1.0 })),
  ...articles.map((a) => ({ path: `blog/${a.slug}`, priority: 0.8, lastModified: a.updated ?? a.date })),
  ...blogTopics.map((t) => ({
    path: `blog/topic/${t.slug}`,
    priority: 0.85,
    lastModified: articles
      .filter((a) => t.articleSlugs.includes(a.slug) || (a.tags ?? []).some((tag) => t.tags.includes(tag)))
      .map((a) => a.updated ?? a.date)
      .sort()
      .at(-1),
  })),
  ...manufacturingServices.map(({ slug }) => ({ path: `manufacturing/${slug}`, priority: 0.8 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.flatMap(({ path: p, priority, lastModified }) => {
    // Omit unknown modification dates instead of reporting every build as a content edit.
    const lm = lastModified ? new Date(`${lastModified}T00:00:00Z`) : undefined;
    const alternates = {
      languages: {
        en: pageUrl("en", p),
        "zh-CN": pageUrl("zh", p),
        "x-default": pageUrl(primaryLocale, p),
      },
    };
    return [
      {
        url: pageUrl("en", p),
        lastModified: lm,
        changeFrequency: "monthly" as const,
        priority,
        alternates,
      },
      {
        url: pageUrl("zh", p),
        lastModified: lm,
        changeFrequency: "monthly" as const,
        priority: priority * 0.95,
        alternates,
      },
    ];
  });
}
