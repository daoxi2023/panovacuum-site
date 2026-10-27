import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://panovacuum.com";
const paths = ["", "request-a-quote"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((p) => [
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