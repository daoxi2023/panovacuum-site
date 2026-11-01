#!/usr/bin/env node
/**
 * CSS 兼容性闸门
 *
 * 目标浏览器：微信内置浏览器（X5 / Chromium 66-77）、旧 Android WebView、
 * iOS 14 及更早的 Safari，以及桌面 Chrome 87+。B2B 访客大量来自微信，
 * 一旦用了这些引擎不认的写法，首屏会出现「整块图片/视频消失」的严重故障
 * （2026-11-01 的 hero 事故就是这么来的：inset:0 让 .hero-media 高度算成 0）。
 *
 * 规则分两级：
 *   FAIL  —— 明确会导致布局塌陷的写法，构建直接中断；
 *   WARN  —— 会降级但不至于塌陷，打印提醒，允许继续。
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIR = join(ROOT, "app");

const FAIL_PATTERNS = [
  {
    re: /(^|[^-\w])inset\s*:/,
    name: "inset 简写",
    fix: "改成 top/right/bottom/left 长写（Chrome 87+/Safari 14.1+ 才支持 inset）",
  },
  {
    re: /:has\(/,
    name: ":has() 选择器",
    fix: "改用显式 class 或属性选择器（Chrome 105+ 才支持 :has）",
  },
  {
    re: /color-mix\(|light-dark\(/,
    name: "color-mix()/light-dark()",
    fix: "写成显式 rgba() 或 CSS 变量（Chrome 111+ 才支持）",
  },
];

const WARN_PATTERNS = [
  {
    re: /aspect-ratio\s*:/,
    name: "aspect-ratio",
    fix: "另给 padding-top 比例兜底，否则旧引擎里图片高度会溢出",
  },
  {
    re: /text-wrap\s*:\s*balance/,
    name: "text-wrap: balance",
    fix: "可选增强，旧引擎忽略即可，但别依赖它排版",
  },
  {
    re: /(^|[\s;{])(row-|column-)?gap\s*:/,
    name: "gap（flex 布局）",
    fix: "Chrome 84 以下不支持 flex gap，关键间距请加 margin 兜底",
  },
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (entry.endsWith(".css")) out.push(full);
  }
  return out;
}

const files = walk(SCAN_DIR);
const failures = [];
const warnings = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const at = `${relative(ROOT, file)}:${i + 1}`;
    if (line.trimStart().startsWith("/*") || line.trimStart().startsWith("*")) return;
    for (const rule of FAIL_PATTERNS) {
      if (rule.re.test(line)) failures.push(`${at}  ${rule.name} → ${rule.fix}\n    ${line.trim()}`);
    }
    for (const rule of WARN_PATTERNS) {
      if (rule.re.test(line)) warnings.push(`${at}  ${rule.name} → ${rule.fix}`);
    }
  });
}

if (warnings.length) {
  // 按规则聚合成一行，避免刷屏；只列前 3 个位置方便定位。
  const grouped = new Map();
  for (const w of warnings) {
    const [at, rest] = w.split("  ");
    const rule = rest.split(" → ")[0];
    if (!grouped.has(rule)) grouped.set(rule, { count: 0, spots: [], fix: rest.split(" → ")[1] });
    const g = grouped.get(rule);
    g.count += 1;
    if (g.spots.length < 3) g.spots.push(at);
  }
  console.warn(`[css-compat] ${warnings.length} 处降级项（不阻断构建）：`);
  for (const [rule, g] of grouped) {
    console.warn(`  ~ ${rule} × ${g.count}（${g.spots.join(", ")}${g.count > 3 ? " …" : ""}）`);
    if (g.fix) console.warn(`      ${g.fix}`);
  }
}

if (failures.length) {
  console.error(`[css-compat] ${failures.length} 处不兼容写法，构建已中断：`);
  for (const f of failures) console.error("  × " + f);
  console.error("\n[css-compat] 目标浏览器含微信 X5 / 旧 WebView / iOS 14，见 docs/FRONTEND_CONVENTIONS.md");
  process.exit(1);
}

console.log(`[css-compat] 通过：${files.length} 个 CSS 文件无阻断级兼容问题`);
