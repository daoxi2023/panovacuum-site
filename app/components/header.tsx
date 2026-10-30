"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const navs: Record<"en" | "zh", { nav: { label: string; href: string }[] }> = {
  en: {
    nav: [
      { label: "Home", href: "/en/" },
      { label: "Capabilities", href: "/en/#capabilities" },
      { label: "About", href: "/en/#about" },
      { label: "Quality", href: "/en/#quality" },
      { label: "Industries", href: "/en/#industries" },
      { label: "Blog", href: "/en/blog/" },
      { label: "Partnerships", href: "/en/industrial-partnerships/" },
      { label: "Request a Quote", href: "/en/request-a-quote/" },
    ],
  },
  zh: {
    nav: [
      { label: "首页", href: "/zh/" },
      { label: "制造能力", href: "/zh/#capabilities" },
      { label: "关于我们", href: "/zh/#about" },
      { label: "质量检验", href: "/zh/#quality" },
      { label: "应用领域", href: "/zh/#industries" },
      { label: "新闻博客", href: "/zh/blog/" },
      { label: "产业合作", href: "/zh/industrial-partnerships/" },
      { label: "提交询价", href: "/zh/request-a-quote/" },
    ],
  },
};

export function Header({ locale }: { locale: "en" | "zh" }) {
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);
  const pathname = usePathname();
  const alternate = pathname.replace(/^\/(en|zh)(?=\/|$)/, locale === "en" ? "/zh" : "/en");
  const t = navs[locale];
  const brand = locale === "en" ? "PANO Vacuum" : "帕诺真空";
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href={`/${locale}/`} className="brand">
            <img
              src="/pano-vacuum-tech-logo.webp"
              srcSet="/pano-vacuum-tech-logo-2x.webp 2x"
              alt="PANO Vacuum 帕诺真空"
              width={63}
              height={42}
              style={{ height: 42, width: "auto", verticalAlign: "middle" }}
            />
            <span>{brand}</span>
          </Link>
          <nav className="main-nav desktop-nav" aria-label={locale === "zh" ? "主导航" : "Main navigation"}>
            {t.nav.map((n) => (
              <Link key={n.label} href={n.href}>{n.label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href={alternate} className="lang-switch" lang={locale === "en" ? "zh" : "en"}>{locale === "en" ? "中文" : "English"}</Link>
            <details className="mobile-menu" onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.currentTarget.open = false;
                event.currentTarget.querySelector("summary")?.focus();
              }
            }}>
              <summary>{locale === "zh" ? "菜单" : "Menu"}<span aria-hidden="true" className="menu-lines" /></summary>
              <nav aria-label={locale === "zh" ? "手机导航" : "Mobile navigation"} onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }
              }}>
                {t.nav.map((n) => <Link key={n.label} href={n.href}>{n.label}</Link>)}
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
