import Link from "next/link";
import type { Metadata } from "next";
import { SITE_BASE } from "@/lib/site-base";
import { articles } from "../../../lib/articles";
import { SeoLinks } from "../../components/seo-links";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const zh = locale === "zh";
  const title = zh ? "真空腔体制造技术文章与新闻" : "Vacuum chamber fabrication: technical articles and news";
  const description = zh
    ? "聚焦真空腔体制造中客户关注的实际问题：检漏方法与判定、外压与壁厚、清洁与颗粒控制、材料选型与交付检验。每月更新。"
    : "Practical articles on vacuum chamber fabrication: leak testing and acceptance criteria, external-pressure design, cleaning and particle control, material selection and inspection.";
  const url = `${SITE_BASE}/${locale}/blog/`;
  return {
    title: `${title} · ${zh ? "帕诺真空" : "PANO Vacuum"}`,
    description,
    alternates: {
      canonical: url,
      languages: {
        "zh-CN": `${SITE_BASE}/zh/blog/`,
        en: `${SITE_BASE}/en/blog/`,
        "x-default": `${SITE_BASE}/en/blog/`,
      },
    },
    openGraph: { type: "website", url, title, description, siteName: "PANO Vacuum", locale: zh ? "zh_CN" : "en_US" },
  };
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const zh = locale === "zh";
  const t = zh
    ? { title: "新闻资讯", intro: "技术文章与工厂动态，每月更新，聚焦真空腔体制造中客户关注的实际问题。", back: "返回首页", read: "阅读全文", eyebrow: "新闻资讯 · NEWS" }
    : { title: "News & Articles", intro: "Technical articles on vacuum chamber fabrication, updated monthly, based on questions raised by equipment manufacturers.", back: "Back to Home", read: "Read article", eyebrow: "NEWS · 新闻资讯" };
  return (
    <>
      <SeoLinks path="blog" locale={locale} />
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="sub">{t.intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="news-grid">
            {articles.map((a) => (
              <article className="news-card" key={a.slug}>
                <div className="card-img"><img src={a.cover} alt={zh ? a.zh.title : a.en.title} loading="lazy" /></div>
                <div className="news-body">
                  <p className="news-date">{a.date}</p>
                  <h3><Link href={`/${locale}/blog/${a.slug}/`}>{zh ? a.zh.title : a.en.title}</Link></h3>
                  <p>{zh ? a.zh.intro : a.en.intro}</p>
                  <Link className="text-link" href={`/${locale}/blog/${a.slug}/`}>{t.read} →</Link>
                </div>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 32 }}>
            <Link href={`/${locale}/`} className="cta secondary">{t.back}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
