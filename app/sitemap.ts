import type { MetadataRoute } from "next";
import { articles } from "../lib/articles";
import { manufacturingServices } from "../lib/manufacturing";
import { SITE_BASE } from "@/lib/site-base";

export const dynamic = "force-static";

const base = SITE_BASE;
const pages = ["", "request-a-quote", "blog", "case-studies", "industrial-partnerships", "company-profile", "privacy", "terms"] as const;

const entries: { path: string; priority: number; lastModified?: string }[] = [
  ...pages.map((p) => ({ path: p, priority: p ? 0.9 : 1.0 })),
  ...articles.map((a) => ({ path: `blog/${a.slug}`, priority: 0.8, lastModified: a.updated ?? a.date })),
  ...manufacturingServices.map(({ slug }) => ({ path: `manufacturing/${slug}`, priority: 0.8 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.flatMap(({ path: p, priority, lastModified }) => {
    const lm = lastModified ? new Date(`${lastModified}T00:00:00Z`) : new Date();
    return [
      {
        url: `${base}/en/${p}`,
        lastModified: lm,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages: { "zh-CN": `${base}/zh/${p}`, "x-default": `${base}/en/${p}` } },
      },
      {
        url: `${base}/zh/${p}`,
        lastModified: lm,
        changeFrequency: "monthly" as const,
        priority: priority * 0.95,
        alternates: { languages: { en: `${base}/en/${p}`, "x-default": `${base}/en/${p}` } },
      },
    ];
  });
}
