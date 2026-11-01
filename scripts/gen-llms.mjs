#!/usr/bin/env node
// 生成 out/llms.txt 与 out/llms-full.txt（GEO：让生成式引擎能直接读到结构化事实）。
// 数据源：lib/articles.ts（Node 24 原生 TS 类型擦除，无需额外依赖）。
import { writeFileSync } from "node:fs";
import { articles } from "../lib/articles.ts";

const BASE = (process.env.SITE_BASE_URL || "https://panovacuum.com").replace(/\/+$/, "");
const byDate = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));

const header = `# PANO Vacuum — Custom Vacuum Chambers & Precision Manufacturing

> PANO Vacuum Machinery Technology (Changshu) Co., Ltd. manufactures custom vacuum chambers, precision-machined components and vacuum-tight assemblies for semiconductor equipment, vacuum coating/process tools and new-energy equipment makers. Drawing review → precision machining → welding & leak testing → inspection & delivery, all under one roof in Changshu, Jiangsu, China.

## Pages
- Home (EN): /en/
- Home (ZH 中文): /zh/
- Request a Quote (EN): /en/request-a-quote/
- 提交询价 (ZH): /zh/request-a-quote/
- Blog index (EN): /en/blog/
- 新闻资讯 (ZH): /zh/blog/
- Case Examples (EN): /en/case-studies/
- 案例与能力示例 (ZH): /zh/case-studies/

## Capabilities
- Precision CNC machining for vacuum-grade components
- Vacuum-tight welding: TIG and automated processes
- Helium leak testing to the 1×10⁻⁹ Pa·m³/s order (UL1000-class), every chamber before shipment
- 30 kW laser cutting · 400 t / 6.2 m press brake · H200 floor boring-mill (4 m-class) · 40+ welding stations · 50 t overhead crane

## Contact
- Email: zhouyou@panovacuum.com · Phone: +86 130 6372 2038 / +1 307 533 3212
- Address: 88 Chaoyang Road, Changfu Subdistrict, Changshu, Jiangsu 215500, China
`;

const articleLines = byDate
  .map((a) => `- [${a.date}] ${a.en.title}\n  EN: ${BASE}/en/blog/${a.slug}/\n  ZH: ${BASE}/zh/blog/${a.slug}/\n  中文: ${a.zh.title}`)
  .join("\n");

writeFileSync("out/llms.txt", `${header}\n## Articles (${byDate.length})\n${articleLines}\n`);

const full = [
  header,
  `## Full articles\n`,
  ...byDate.map((a) => {
    const zh = [
      `### ${a.zh.title}`,
      `URL: ${BASE}/zh/blog/${a.slug}/  |  Published: ${a.date}`,
      ``,
      a.zh.intro,
      ``,
      ...a.zh.sections.map((s) => `## ${s.h}\n\n${s.body}\n`),
      a.zh.closing,
      ...(a.faq ?? []).map((f) => `**Q: ${f.q}**\n\nA: ${f.a}\n`),
    ].join("\n");
    const en = [
      `### ${a.en.title}`,
      `URL: ${BASE}/en/blog/${a.slug}/  |  Published: ${a.date}`,
      ``,
      a.en.intro,
      ``,
      ...a.en.sections.map((s) => `## ${s.h}\n\n${s.body}\n`),
      a.en.closing,
    ].join("\n");
    return `${zh}\n\n---\n\n${en}\n\n---\n`;
  }),
].join("\n");

writeFileSync("out/llms-full.txt", full);
console.log(`llms.txt + llms-full.txt 已生成（${byDate.length} 篇）`);
