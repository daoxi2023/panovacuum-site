import Link from "next/link";
import type { Metadata } from "next";
import { SITE_BASE } from "@/lib/site-base";
import { notFound } from "next/navigation";
import { SeoLinks } from "../../../components/seo-links";
import { articles } from "../../../../lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const zh = locale === "zh";
  const t = article[zh ? "zh" : "en"];
  const url = `${SITE_BASE}/${locale}/blog/${article.slug}/`;
  const description = t.intro.length > 160 ? `${t.intro.slice(0, 157)}…` : t.intro;
  return {
    title: `${t.title} · ${zh ? "帕诺真空" : "PANO Vacuum"}`,
    description,
    keywords: article.tags,
    alternates: {
      canonical: url,
      languages: {
        "zh-CN": `${SITE_BASE}/zh/blog/${article.slug}/`,
        en: `${SITE_BASE}/en/blog/${article.slug}/`,
        "x-default": `${SITE_BASE}/en/blog/${article.slug}/`,
      },
    },
    openGraph: {
      type: "article",
      url,
      title: t.title,
      description,
      siteName: "PANO Vacuum",
      locale: zh ? "zh_CN" : "en_US",
      images: [{ url: `${SITE_BASE}${article.cover}`, width: 1200, height: 630, alt: t.title }],
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [zh ? article.author.nameZh : article.author.nameEn],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description,
      images: [`${SITE_BASE}${article.cover}`],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const zh = locale === "zh";
  const article = getArticle(slug);
  if (!article) notFound();
  const t = article[zh ? "zh" : "en"];
  const ui = zh
    ? { cta: "提交图纸询价", more: "返回新闻列表", home: "返回首页", tag: "技术文章", by: "帕诺真空", faq: "常见问题", related: "相关阅读" }
    : { cta: "Request a Quote", more: "Back to Articles", home: "Back to Home", tag: "Technical Article", by: "PANO Vacuum", faq: "FAQ", related: "Related reading" };

  const url = `${SITE_BASE}/${locale}/blog/${article.slug}/`;
  const homeLabel = zh ? "首页" : "Home";
  const blogLabel = zh ? "新闻资讯" : "News & Articles";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.intro,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: { "@type": "Person", name: zh ? article.author.nameZh : article.author.nameEn, url: SITE_BASE, email: article.author.email },
    publisher: {
      "@type": "Organization",
      name: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.",
      url: SITE_BASE,
      logo: { "@type": "ImageObject", url: `${SITE_BASE}/pano-vacuum-tech-logo.webp` },
    },
    image: [`${SITE_BASE}${article.cover}`],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: zh ? "zh-CN" : "en",
    keywords: article.tags?.join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: `${SITE_BASE}/${locale}/` },
      { "@type": "ListItem", position: 2, name: blogLabel, item: `${SITE_BASE}/${locale}/blog/` },
      { "@type": "ListItem", position: 3, name: t.title, item: url },
    ],
  };

  const faq = article.faq ?? [];
  const faqLd = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const byTag = article.tags?.length
    ? articles.filter((a) => a.slug !== article.slug && a.tags?.some((tag) => article.tags?.includes(tag)))
    : [];
  const related = (byTag.length ? byTag : articles.filter((a) => a.slug !== article.slug)).slice(0, 3);

  return (
    <>
      <SeoLinks path={`blog/${slug}`} locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">{ui.tag}</p>
          <h1>{t.title}</h1>
          <p className="sub">{t.intro}</p>
          <p className="news-date">{article.date} · {zh ? article.author.nameZh : article.author.nameEn}</p>
          <p className="news-date" style={{ marginTop: 6 }}>{zh ? article.author.roleZh : article.author.roleEn} · <a href={`mailto:${article.author.email}`}>{article.author.email}</a></p>
        </div>
      </section>
      <section className="section">
        <div className="container article-body">
          <img className="article-cover" src={article.cover} alt={t.title} loading="lazy" />
          {t.sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.body}</p>
            </div>
          ))}
          <p className="article-closing">{t.closing}</p>

          {faq.length > 0 && (
            <div className="article-faq">
              <h2>{ui.faq}</h2>
              {faq.map((f) => (
                <div key={f.q} className="faq-item">
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <div className="article-related">
              <h2>{ui.related}</h2>
              <ul>
                {related.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/${locale}/blog/${a.slug}/`}>{a[zh ? "zh" : "en"].title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
