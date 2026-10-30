// SeoLinks: Next.js App Router static export drops hreflang/canonical from
// metadata (known limitation of output:export), so render the <link> tags
// directly — Next hoists them into <head>. One source per page path.
import { SITE_BASE } from "@/lib/site-base";

const BASE = SITE_BASE;

export function SeoLinks({ path = "", locale }: { path?: string; locale: string }) {
  const suffix = path === "" ? "/" : `/${path}/`;
  const zhUrl = `${BASE}/zh${suffix}`;
  const enUrl = `${BASE}/en${suffix}`;
  const cur = locale === "zh" ? zhUrl : enUrl;
  return (
    <>
      <link rel="canonical" href={cur} />
      <link rel="alternate" hrefLang="zh-CN" href={zhUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
    </>
  );
}
