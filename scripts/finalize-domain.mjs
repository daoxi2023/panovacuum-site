// Post-build: finalize domain-dependent static assets when SITE_BASE_URL is set.
// Rewrites only absolute URLs (https://panovacuum.com → target base) so that
// email addresses (zhouyou@panovacuum.com) are never touched.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const raw = (process.env.SITE_BASE_URL || "").replace(/\/+$/, "");
if (!raw || raw === "https://panovacuum.com") {
  console.log("domain finalize: default panovacuum.com, nothing to rewrite");
  process.exit(0);
}
const from = "https://panovacuum.com";
const domain = raw.replace(/^https?:\/\//, "");
let rewritten = 0;
for (const f of ["out/llms.txt", "out/sitemap.xml", "out/robots.txt"]) {
  if (!existsSync(f)) continue;
  const s = readFileSync(f, "utf8");
  const r = s.split(from).join(raw);
  if (r !== s) {
    writeFileSync(f, r);
    rewritten++;
  }
}
if (existsSync("out/CNAME")) {
  writeFileSync("out/CNAME", domain);
}
console.log(`domain finalize: ${raw} (${domain}) — rewritten ${rewritten} static file(s)`);
