export function Footer({ locale }: { locale: "en" | "zh" }) {
  const t = locale === "en"
    ? { tagline: "Custom vacuum chambers & precision manufacturing for advanced equipment.", rights: "© 2026 PANO Vacuum. All rights reserved.", blog: "Technical Articles" }
    : { tagline: "面向先进装备的定制真空腔体与精密制造。", rights: "© 2026 帕诺真空 版权所有。", blog: "技术文章" };
  return (
    <footer className="site-footer" style={{ marginTop: 48, padding: "28px 0" }}>
      <div className="container">
        <p style={{ margin: 0 }}>{t.tagline}</p>
        <p style={{ margin: "6px 0 0", fontSize: 13, opacity: 0.7 }}>
          <a href={`/${locale}/blog/`} style={{ color: "#fff", marginRight: 14 }}>{t.blog}</a>
          {t.rights}
        </p>
      </div>
    </footer>
  );
}