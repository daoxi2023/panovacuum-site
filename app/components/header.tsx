import Link from "next/link";

const navs: Record<"en" | "zh", { tel: string; nav: { label: string; href: string }[] }> = {
  en: {
    tel: "+86 130 6372 2038",
    nav: [
      { label: "Home", href: "/en/" },
      { label: "Capabilities", href: "/en/#capabilities" },
      { label: "Quality", href: "/en/#quality" },
      { label: "About", href: "/en/#about" },
      { label: "Industries", href: "/en/#industries" },
      { label: "Blog", href: "/en/blog/" },
      { label: "Request a Quote", href: "/en/request-a-quote/" },
    ],
  },
  zh: {
    tel: "+86 130 6372 2038",
    nav: [
      { label: "首页", href: "/zh/" },
      { label: "制造能力", href: "/zh/#capabilities" },
      { label: "质量检验", href: "/zh/#quality" },
      { label: "关于我们", href: "/zh/#about" },
      { label: "应用领域", href: "/zh/#industries" },
      { label: "新闻博客", href: "/zh/blog/" },
      { label: "提交询价", href: "/zh/request-a-quote/" },
    ],
  },
};

export function Header({ locale }: { locale: "en" | "zh" }) {
  const t = navs[locale];
  const brand = locale === "en" ? "PANO Vacuum" : "帕诺真空";
  return (
    <>
      <div className="site-topbar">
        <div className="container topbar-inner">
          <span className="topbar-tel">{locale === "en" ? "RFQ Hotline:" : "询价专线："} {t.tel}</span>
          <a href="mailto:zhouyou@panovacuum.com">zhouyou@panovacuum.com</a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href={`/${locale}/`} className="brand">
            <img
              src="/logo.webp"
              srcSet="/logo-2x.webp 2x"
              alt="PANO Vacuum 帕诺真空"
              width={66}
              height={42}
              style={{ height: 42, width: "auto", verticalAlign: "middle" }}
            />
            <span>{brand}</span>
          </Link>
          <nav className="main-nav" aria-label="Main">
            {t.nav.map((n) => (
              <Link key={n.label} href={n.href}>{n.label}</Link>
            ))}
          </nav>
          <Link href={locale === "en" ? "/zh" : "/en"} className="lang-switch">{locale === "en" ? "中文" : "English"}</Link>
        </div>
      </header>
    </>
  );
}
