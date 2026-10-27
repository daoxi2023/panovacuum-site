import Link from "next/link";

const nav: Record<"en" | "zh", { home: string; homeUrl: string; rfq: string; rfqUrl: string; alt: string; altUrl: string }> = {
  en: { home: "Home", homeUrl: "/en", rfq: "Request a Quote", rfqUrl: "/en/request-a-quote", alt: "中文", altUrl: "/zh" },
  zh: { home: "首页", homeUrl: "/zh", rfq: "提交询价", rfqUrl: "/zh/request-a-quote", alt: "English", altUrl: "/en" },
};

export function Header({ locale }: { locale: "en" | "zh" }) {
  const t = nav[locale];
  return (
    <header className="site-header">
      <div className="container">
        <Link href={t.homeUrl} className="brand">{locale === "en" ? "PANO Vacuum" : "帕诺真空"}</Link>
        <nav>
          <Link href={t.homeUrl}>{t.home}</Link>
          <Link href={t.rfqUrl}>{t.rfq}</Link>
        </nav>
        <Link href={t.altUrl} className="lang-switch">{t.alt}</Link>
      </div>
    </header>
  );
}