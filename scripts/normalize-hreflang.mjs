// Post-build: normalize the alternate-language attribute spelling and the
// document language in each locale's static HTML export.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const dir = process.argv[2] ?? "out";
let filesChanged = 0;
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
      if (normalized !== original) {
        writeFileSync(p, normalized);
        filesChanged++;
      }
    }
  }
})(dir);
console.log(`normalized ${filesChanged} HTML file(s): hreflang in ${hreflangChanged}, document language in ${languageChanged}`);
