import type { MetadataRoute } from "next";
import { articles } from "../lib/articles";

export const dynamic = "force-static";

const base = "https://panovacuum.com";
const pages = ["", "request-a-quote", "blog", "case-studies"] as const;
const articlePaths = articles.map((a) => `blog/${a.slug}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...articlePaths].flatMap((p) => [
    {
      url: `${base}/en/${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: p ? 0.9 : 1.0,
      alternates: { languages: { "zh-CN": `${base}/zh/${p}` } },
    },
    {
      url: `${base}/zh/${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: p ? 0.9 : 0.8,
      alternates: { languages: { en: `${base}/en/${p}` } },
    },
  ]);
}
