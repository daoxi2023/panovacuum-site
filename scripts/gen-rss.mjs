#!/usr/bin/env node
// 生成 out/en/rss.xml 与 out/zh/rss.xml（每语言一份，RSS 阅读器与部分聚合器/镜像用）。
import { mkdirSync, writeFileSync } from "node:fs";
import { articles } from "../lib/articles.ts";

const BASE = (process.env.SITE_BASE_URL || "https://panovacuum.com").replace(/\/+$/, "");
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const byDate = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));

for (const locale of ["en", "zh"]) {
  const items = byDate
    .map((a) => {
      const t = a[locale];
      const link = `${BASE}/${locale}/blog/${a.slug}/`;
      return `    <item>
      <title>${esc(t.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${a.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(t.intro)}</description>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${locale === "zh" ? "帕诺真空 · 技术文章" : "PANO Vacuum · Technical Articles"}</title>
    <link>${BASE}/${locale}/blog/</link>
    <description>${locale === "zh" ? "真空腔体制造的技术文章：检漏、外压设计、清洁与颗粒控制。" : "Articles on vacuum chamber fabrication: leak testing, external-pressure design, cleaning and particle control."}</description>
    <language>${locale === "zh" ? "zh-CN" : "en"}</language>
    <atom:link href="${BASE}/${locale}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  mkdirSync(`out/${locale}`, { recursive: true });
  writeFileSync(`out/${locale}/rss.xml`, feed);
}
console.log("rss.xml 已生成（en / zh）");
