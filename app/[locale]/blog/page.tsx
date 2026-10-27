import Link from "next/link";
import { articles } from "../../../lib/articles";
import { SeoLinks } from "../../components/seo-links";

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const zh = locale === "zh";
  const t = zh
    ? { title: "新闻资讯", intro: "技术文章与工厂实况。每月更新，讲真空腔体制造里客户真正关心的问题。", back: "返回首页", read: "阅读全文", eyebrow: "新闻资讯 · NEWS" }
    : { title: "News & Articles", intro: "Technical articles and notes from the shop floor. Updated monthly — the questions equipment teams actually ask about vacuum chamber fabrication.", back: "Back to Home", read: "Read article", eyebrow: "NEWS · 新闻资讯" };
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
                <div className="card-img" aria-hidden="true"><span>PANO</span></div>
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
