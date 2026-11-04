import type { Metadata } from "next";
import { siteConfig } from "../lib/site-config";
import { WhatsAppFloat } from "./components/whatsapp-float";
import { SITE_BASE } from "@/lib/site-base";

// 根级元数据：只为 / 与 /404 这类不属于任何 locale 的页面提供兜底分享图
// （locale 页面各自在 app/[locale]/layout.tsx 与页面级 generateMetadata 里覆盖 openGraph）。
export const metadata: Metadata = {
  // 中文搜索引擎站点验证（仅 .cn 主站；.com 走 Cloudflare，不重复声明）
  // 百度搜索资源平台 / 搜狗站长平台；验证通过后不要删除，平台会周期性复查。
  ...(SITE_BASE.includes("panovacuum.cn")
    ? {
        verification: {
          other: {
            "baidu-site-verification": "codeva-4c5iWyEZtD",
            sogou_site_verification: "V5UN048x1B",
          },
        },
      }
    : {}),
  openGraph: {
    type: "website",
    // `/` 由 _redirects 301 到 /en/，故根级 og:url 取 /en/；locale 页面会整段覆盖 openGraph。
    url: `${SITE_BASE}/en/`,
    title: "PANO Vacuum | Custom Vacuum Chambers, Changshu China",
    description:
      "Custom vacuum chambers are manufactured to customer drawings in Changshu, China. Machining, welding, helium leak testing and inspection are all completed in-house.",
    siteName: "PANO Vacuum",
    locale: "en_US",
    images: [
      {
        url: `${SITE_BASE}/pano-vacuum-og-default-1200x630.webp`,
        width: 1200,
        height: 630,
        alt: "PANO Vacuum — custom vacuum chamber fabrication in Changshu, China",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_BASE}/pano-vacuum-og-default-1200x630.webp`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Google GA4 / Clarity are unreachable (and add latency) for the China entry;
  // keep them only on the overseas origin.
  const analyticsEnabled = !SITE_BASE.includes("panovacuum.cn");
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.",
    alternateName: "帕诺真空机械科技（常熟）有限公司",
    url: SITE_BASE,
    logo: `${SITE_BASE}/pano-vacuum-logo-324w.webp`,
    image: `${SITE_BASE}/pano-vacuum-og-default-1200x630.webp`,
    email: "zhouyou@panovacuum.com",
    telephone: "+86-130-6372-2038",
    address: {
      "@type": "PostalAddress",
      streetAddress: "常福街道朝阳路88号",
      addressLocality: "常熟市",
      addressRegion: "江苏省苏州市",
      postalCode: "215500",
      addressCountry: "CN",
    },
    sameAs: ["https://www.panovacuum.com"],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {analyticsEnabled && siteConfig.googleSiteVerification ? (
          <meta name="google-site-verification" content={siteConfig.googleSiteVerification} />
        ) : null}
        {siteConfig.baiduSiteVerification ? (
          <meta name="baidu-site-verification" content={siteConfig.baiduSiteVerification} />
        ) : null}
        {analyticsEnabled && siteConfig.ga4MeasurementId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4MeasurementId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${siteConfig.ga4MeasurementId}');`,
              }}
            />
          </>
        ) : null}
        {analyticsEnabled ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${siteConfig.clarityProjectId}");`,
          }}
        />
        ) : null}
      </head>
      <body>{children}<WhatsAppFloat /></body>
    </html>
  );
}