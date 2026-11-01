#!/usr/bin/env node
// 构建产物自检：CI 与本地部署前都跑一遍，任何一项不过就 exit 1。
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const out = "out";
const problems = [];
const notes = [];

const must = [
  "out/index.html",
  "out/sitemap.xml",
  "out/robots.txt",
  "out/llms.txt",
  "out/llms-full.txt",
  "out/en/rss.xml",
  "out/zh/rss.xml",
  "out/zh/blog/index.html",
  "out/en/blog/index.html",
];
for (const f of must) if (!existsSync(f)) problems.push(`缺少产物：${f}`);

const htmlFiles = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) htmlFiles.push(p);
  }
})(out);
notes.push(`HTML 页面 ${htmlFiles.length}`);

let dupCanonical = 0;
let missingCanonical = 0;
let dupHreflang = 0;
let missingTitle = 0;
for (const f of htmlFiles) {
  if (/404(\.html|\/index\.html)$/.test(f)) continue; // 错误页不参与 canonical/title 检查
  const html = readFileSync(f, "utf8");
  const canon = html.match(/<link[^>]+rel="canonical"/g) ?? [];
  if (canon.length === 0) missingCanonical++;
  if (canon.length > 1) dupCanonical++;
  const hls = [...html.matchAll(/<link[^>]+hreflang="([^"]+)"/g)].map((m) => m[1].toLowerCase());
  if (new Set(hls).size !== hls.length) dupHreflang++;
  if (/<title><\/title>|<title>\s*<\/title>/.test(html) || !/<title>/.test(html)) missingTitle++;
}
if (missingCanonical) problems.push(`${missingCanonical} 个页面缺 canonical`);
if (dupCanonical) problems.push(`${dupCanonical} 个页面有重复 canonical`);
if (dupHreflang) problems.push(`${dupHreflang} 个页面有重复 hreflang`);
if (missingTitle) problems.push(`${missingTitle} 个页面缺 title`);

const sitemap = readFileSync("out/sitemap.xml", "utf8");
const urlCount = (sitemap.match(/<url>/g) ?? []).length;
notes.push(`sitemap ${urlCount} 条`);
const indexable = htmlFiles.filter((f) => !/404(\.html|\/index\.html)$/.test(f) && f !== "out/index.html").length;
if (urlCount < indexable) problems.push(`sitemap 条目(${urlCount})少于可索引页面数(${indexable})，可能有页面未被收录`);
if (!sitemap.includes('hreflang="x-default"')) problems.push("sitemap 缺 x-default alternates");

const llms = readFileSync("out/llms.txt", "utf8");
if (!/## Topic series/.test(llms)) problems.push("llms.txt 缺主题系列段");
if (!/## Articles/.test(llms)) problems.push("llms.txt 缺文章段");

const feed = readFileSync("out/en/rss.xml", "utf8");
const items = (feed.match(/<item>/g) ?? []).length;
notes.push(`RSS ${items} 条`);
if (items === 0) problems.push("RSS 为空");

// 单页体积过大（> 400 KB）提示，通常意味着误把大图内联
for (const f of htmlFiles) {
  const kb = statSync(f).size / 1024;
  if (kb > 400) notes.push(`体积偏大 ${kb.toFixed(0)} KB: ${f}`);
}

console.log(notes.join(" · "));
if (problems.length) {
  console.error("自检失败：\n - " + problems.join("\n - "));
  process.exit(1);
}
console.log("产物自检通过");
