export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.",
    alternateName: "帕诺真空机械科技（常熟）有限公司",
    url: "https://panovacuum.com",
    logo: "https://panovacuum.com/logo.webp",
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
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}