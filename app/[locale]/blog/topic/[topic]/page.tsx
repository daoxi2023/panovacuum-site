import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_BASE } from "@/lib/site-base";
import { articles } from "../../../../../lib/articles";
import { blogTopics, type BlogTopic } from "../../../../../lib/blog-topics";
import { OG_BY_TOPIC, OG_DEFAULT, ogImage, twitterCard } from "@/lib/og";

export function generateStaticParams() {
  return blogTopics.map((t) => ({ topic: t.slug }));
}

function getTopic(slug: string): BlogTopic | undefined {
  return blogTopics.find((t) => t.slug === slug);
}

function articlesOf(topic: BlogTopic) {
  const picked = articles.filter(
    (a) => topic.articleSlugs.includes(a.slug) || (a.tags ?? []).some((tag) => topic.tags.includes(tag)),
  );
  return [...picked].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; topic: string }> }): Promise<Metadata> {
  const { locale, topic } = await params;
  const t = getTopic(topic);
  if (!t) return {};
  const zh = locale === "zh";
  const c = t[zh ? "zh" : "en"];
  const url = `${SITE_BASE}/${locale}/blog/topic/${t.slug}/`;
  const ogFile = OG_BY_TOPIC[t.slug] ?? OG_DEFAULT;
  const ogAlt = zh
    ? `帕诺真空 ${c.name} 系列：${c.short}`.slice(0, 40)
    : `${c.name} at PANO Vacuum: ${c.short}`.slice(0, 125);
  return {
    title: `${c.name} · ${zh ? "帕诺真空" : "PANO Vacuum"}`,
    description: c.intro.length > 160 ? `${c.intro.slice(0, 157)}…` : c.intro,
    keywords: t.tags,
    alternates: {
      canonical: url,
      languages: {
        "zh-CN": `${SITE_BASE}/zh/blog/topic/${t.slug}/`,
        en: `${SITE_BASE}/en/blog/topic/${t.slug}/`,
        "x-default": `${SITE_BASE}/en/blog/topic/${t.slug}/`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: c.name,
      description: c.intro,
      siteName: "PANO Vacuum",
      locale: zh ? "zh_CN" : "en_US",
      images: ogImage(ogFile, ogAlt),
    },
    twitter: twitterCard(ogFile, ogAlt),
  };
}

export default async function TopicPage({ params }: { params: Promise<{ locale: string; topic: string }> }) {
  const { locale, topic } = await params;
  const t = getTopic(topic);
  if (!t) notFound();
  const zh = locale === "zh";
  const c = t[zh ? "zh" : "en"];
  const list = articlesOf(t);
  const url = `${SITE_BASE}/${locale}/blog/topic/${t.slug}/`;

  const ui = zh
    ? { eyebrow: "主题系列 · TOPIC", inSeries: `本系列 ${list.length} 篇`, keyPoints: "这个系列讲什么", faq: "常见问题", more: "返回新闻列表", cta: "提交图纸询价", read: "阅读全文" }
    : { eyebrow: "TOPIC SERIES", inSeries: `${list.length} article${list.length > 1 ? "s" : ""} in this series`, keyPoints: "What this series covers", faq: "FAQ", more: "Back to Articles", cta: "Request a Quote", read: "Read article" };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.name,
    description: c.intro,
    url,
    inLanguage: zh ? "zh-CN" : "en",
    isPartOf: { "@type": "Blog", name: zh ? "帕诺真空 · 技术文章" : "PANO Vacuum · Technical Articles", url: `${SITE_BASE}/${locale}/blog/` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: list.length,
      itemListElement: list.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_BASE}/${locale}/blog/${a.slug}/`,
        name: a[zh ? "zh" : "en"].title,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: zh ? "首页" : "Home", item: `${SITE_BASE}/${locale}/` },
      { "@type": "ListItem", position: 2, name: zh ? "新闻资讯" : "News & Articles", item: `${SITE_BASE}/${locale}/blog/` },
      { "@type": "ListItem", position: 3, name: c.name, item: url },
    ],
  };

  const faqLd = c.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">{ui.eyebrow}</p>
          <h1>{c.name}</h1>
          <p className="sub">{c.short}</p>
          <p className="news-date">{ui.inSeries}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="hub-intro">{c.intro}</p>
          <h2 className="hub-h2">{ui.keyPoints}</h2>
          <ul className="hub-points">
            {c.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className="news-grid">
            {list.map((a) => (
              <article className="news-card" key={a.slug}>
                <div className="card-img"><img src={a.cover} alt={a[zh ? "zh" : "en"].title} loading="lazy" /></div>
                <div className="news-body">
                  <p className="news-date">{a.date}</p>
                  <h3><Link href={`/${locale}/blog/${a.slug}/`}>{a[zh ? "zh" : "en"].title}</Link></h3>
                  <p>{a[zh ? "zh" : "en"].intro}</p>
                  <Link className="text-link" href={`/${locale}/blog/${a.slug}/`}>{ui.read} →</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="article-faq">
            <h2>{ui.faq}</h2>
            {c.faq.map((f) => (
              <div key={f.q} className="faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 32 }}>
            <Link href={`/${locale}/request-a-quote/`} className="cta">{ui.cta}</Link>
            <Link href={`/${locale}/blog/`} className="cta secondary">{ui.more}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
