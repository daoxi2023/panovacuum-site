// Post-build: normalize the alternate-language attribute spelling and the
// document language in each locale's static HTML export.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const dir = process.argv[2] ?? "out";
let filesChanged = 0;
let deduped = 0;

// 元数据(alternates)与 SeoLinks 组件会同时输出 canonical/hreflang，
// 静态导出后会重复；这里按 hreflang 值去重，只保留第一次出现。
function dedupeHead(html) {
  let seenCanonical = false;
  const seenAlt = new Set();
  let removed = 0;
  const out = html.replace(/<link\b[^>]*>/gi, (tag) => {
    const rel = /rel\s*=\s*"([^"]*)"/i.exec(tag)?.[1]?.toLowerCase() ?? "";
    if (rel === "canonical") {
      if (seenCanonical) { removed++; return ""; }
      seenCanonical = true;
      return tag;
    }
    if (rel === "alternate") {
      const hl = /hreflang\s*=\s*"([^"]*)"/i.exec(tag)?.[1]?.toLowerCase();
      if (hl) {
        if (seenAlt.has(hl)) { removed++; return ""; }
        seenAlt.add(hl);
      }
    }
    return tag;
  });
  deduped += removed;
  return out;
}
let hreflangChanged = 0;
let languageChanged = 0;
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) {
      const original = readFileSync(p, "utf8");
      let normalized = original.replaceAll("hrefLang=", "hreflang=");
      if (normalized !== original) hreflangChanged++;
      const locale = relative(dir, p).split(sep)[0];
      if (locale === "zh" || locale === "en") {
        const lang = locale === "zh" ? "zh-CN" : "en";
        const withLanguage = normalized.replace(/<html\b[^>]*>/i, (tag) => {
          if (/\blang\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i.test(tag)) {
            return tag.replace(/\blang\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i, `lang="${lang}"`);
          }
          return tag.replace(/>$/, ` lang="${lang}">`);
        });
        if (withLanguage !== normalized) languageChanged++;
        normalized = withLanguage;
      }
      normalized = dedupeHead(normalized);
      if (normalized !== original) {
        writeFileSync(p, normalized);
        filesChanged++;
      }
    }
  }
})(dir);
console.log(`normalized ${filesChanged} HTML file(s): hreflang in ${hreflangChanged}, document language in ${languageChanged}, duplicate canonical/hreflang removed ${deduped}`);
