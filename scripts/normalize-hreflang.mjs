// Post-build: React SSR serializes the JSX prop hrefLang verbatim as
// hrefLang=, but the HTML attribute is hreflang (ASCII case-insensitive).
// Rewrite to lowercase so naive/AI scrapers and crawlers match it literally.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2] ?? "out";
const hits = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) {
      const s = readFileSync(p, "utf8");
      if (s.includes("hrefLang=")) {
        writeFileSync(p, s.replaceAll("hrefLang=", "hreflang="));
        hits.push(p);
      }
    }
  }
})(dir);
console.log(`normalized hreflang in ${hits.length} html file(s)`);
