import type { MetadataRoute } from "next";
import { SITE_BASE } from "@/lib/site-base";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_BASE}/sitemap.xml`,
    host: SITE_BASE,
  };
}