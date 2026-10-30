import { siteConfig } from "../lib/site-config";
import { SITE_BASE } from "@/lib/site-base";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.",
    alternateName: "帕诺真空机械科技（常熟）有限公司",
    url: SITE_BASE,
    logo: `${SITE_BASE}/pano-vacuum-tech-logo.webp`,
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
        {siteConfig.googleSiteVerification ? (
          <meta name="google-site-verification" content={siteConfig.googleSiteVerification} />
        ) : null}
        {siteConfig.ga4MeasurementId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4MeasurementId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${siteConfig.ga4MeasurementId}');`,
              }}
            />
          </>
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${siteConfig.clarityProjectId}");`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}