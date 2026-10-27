import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoLinks } from "../../../components/seo-links";
import { articles } from "../../../../lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const zh = locale === "zh";
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const t = article[zh ? "zh" : "en"];
  const ui = zh
    ? { cta: "提交图纸询价", more: "返回新闻列表", home: "返回首页", tag: "技术文章", by: "帕诺真空" }
    : { cta: "Request a Quote", more: "Back to Articles", home: "Back to Home", tag: "Technical Article", by: "PANO Vacuum" };
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    datePublished: article.date,
    author: { "@type": "Organization", name: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.", url: "https://panovacuum.com" },
    publisher: { "@type": "Organization", name: "PANO Vacuum", url: "https://panovacuum.com", logo: "https://panovacuum.com/logo.webp" },
    image: "https://panovacuum.com/og-image.webp",
    description: t.intro,
    inLanguage: zh ? "zh-CN" : "en",
  };
  return (
    <>
      <SeoLinks path={`blog/${slug}`} locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">{ui.tag}</p>
          <h1>{t.title}</h1>
          <p className="sub">{t.intro}</p>
          <p className="news-date">{article.date} · {ui.by}</p>
        </div>
      </section>
      <section className="section">
        <div className="container article-body">
          {t.sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.body}</p>
            </div>
          ))}
          <p className="article-closing">{t.closing}</p>
          <p style={{ marginTop: 28 }}>
            <Link href={`/${locale}/request-a-quote/`} className="cta">{ui.cta}</Link>
            <Link href={`/${locale}/blog/`} className="cta secondary">{ui.more}</Link>
            <Link href={`/${locale}/`} className="cta secondary">{ui.home}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
