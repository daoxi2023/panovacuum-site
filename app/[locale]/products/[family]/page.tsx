import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_BASE } from "@/lib/site-base";
import { pageOg } from "@/lib/og";
import { productFamilies } from "@/lib/products";
import { familyDetails } from "@/lib/product-details";
import { manufacturingServices } from "@/lib/manufacturing";
import { articles } from "@/lib/articles";
import { SeoLinks } from "../../../components/seo-links";
import "../../../growth.css";
import "../products.css";

type Params = Promise<{ locale: string; family: string }>;
export const dynamicParams = false;
export function generateStaticParams() {
  return productFamilies.map(({ slug }) => ({ family: slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, family } = await params;
  const entry = productFamilies.find((f) => f.slug === family);
  if (!entry) return {};
  const zh = locale === "zh";
  const t = entry[zh ? "zh" : "en"];
  const title = `${t.name} | ${zh ? "帕诺真空" : "PANO Vacuum"}`;
  return {
    title,
    description: t.tagline,
    ...pageOg({
      path: `products/${entry.slug}`,
      locale,
      title,
      description: t.tagline,
      altZh: t.alt,
      altEn: entry.en.alt,
    }),
  };
}

export default async function ProductFamilyPage({ params }: { params: Params }) {
  const { locale, family } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const zh = loc === "zh";
  const entry = productFamilies.find((f) => f.slug === family);
  const detail = familyDetails.find((d) => d.slug === family);
  if (!entry || !detail) notFound();
  const t = entry[loc];
  const d = detail[loc];
  const service = manufacturingServices.find((s) => s.slug === d.service);
  const related = d.articles
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is (typeof articles)[number] => Boolean(a));

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: t.name,
      description: d.intro,
      image: `${SITE_BASE}${entry.image}`,
      material: "304 / 304L / 316L stainless steel",
      category: zh ? "真空腔体与组件" : "Vacuum chambers and components",
      brand: { "@type": "Brand", name: "PANO Vacuum" },
      manufacturer: {
        "@type": "Organization",
        name: zh ? "帕诺真空机械科技（常熟）有限公司" : "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: d.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: zh ? "首页" : "Home", item: `${SITE_BASE}/${loc}/` },
        { "@type": "ListItem", position: 2, name: zh ? "产品" : "Products", item: `${SITE_BASE}/${loc}/products/` },
        { "@type": "ListItem", position: 3, name: t.name, item: `${SITE_BASE}/${loc}/products/${entry.slug}/` },
      ],
    },
  ];

  return (
    <div className="growth-page">
      <SeoLinks path={`products/${entry.slug}`} locale={loc} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="growth-heading">
        <div className="container">
          <p className="eyebrow">
            <Link href={`/${loc}/products/`} className="crumb">
              {zh ? "产品" : "Products"}
            </Link>
            <span aria-hidden="true"> / </span>
            {zh ? "产品族" : "Family"}
          </p>
          <h1>{t.name}</h1>
          <p className="sub">{t.tagline}</p>
          <div className="growth-actions">
            <Link className="growth-button" href={`/${loc}/request-a-quote/`}>
              {zh ? "按这一族提交询价" : "Enquire about this family"}
            </Link>
            <Link className="growth-button secondary" href={`/${loc}/products/`}>
              {zh ? "返回产品总览" : "All product families"}
            </Link>
          </div>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <p className="product-intro">{d.intro}</p>
          <div className="product-sections">
            {d.sections.map((s) => (
              <div className="product-section" key={s.h}>
                <h2>{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <figure className="product-figure">
            <img src={entry.image} alt={t.alt} width={entry.iw} height={entry.ih} loading="lazy" />
            <figcaption>{zh ? "图：本厂同类产品，用于说明结构形式与制造方式。" : "A comparable unit from our plant, shown to illustrate construction."}</figcaption>
          </figure>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <h2>{zh ? "技术要点" : "Technical summary"}</h2>
          <p className="product-hint">
            {zh
              ? "下表只写能确认的范围；尺寸、公差、板厚与法兰标准以图纸评审为准。"
              : "The table states the range we can confirm; dimensions, tolerances, thickness and flange standards are settled at drawing review."}
          </p>
          <div className="spec-table-wrap">
            <table className="spec-table">
              <tbody>
                {d.specs.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <h2>{zh ? "询价时常问的" : "What buyers ask"}</h2>
          <div className="faq-list">
            {d.faq.map((f) => (
              <div className="faq-item" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <h2>{zh ? "相关" : "Related"}</h2>
          <div className="related-grid">
            {service ? (
              <Link className="related-card" href={`/${loc}/manufacturing/${service.slug}/`}>
                <span className="related-tag">{zh ? "制造与检验" : "Manufacturing"}</span>
                <b>{service[loc].title}</b>
                <p>{service[loc].intro}</p>
              </Link>
            ) : null}
            {related.map((a) => (
              <Link className="related-card" href={`/${loc}/blog/${a.slug}/`} key={a.slug}>
                <span className="related-tag">{zh ? "技术文章" : "Article"}</span>
                <b>{a[loc].title}</b>
                <p>{a[loc].intro}</p>
              </Link>
            ))}
          </div>
          <div className="growth-service-links" aria-label={zh ? "其他产品族" : "Other product families"}>
            {productFamilies
              .filter((f) => f.slug !== entry.slug)
              .map((f) => (
                <Link key={f.slug} href={`/${loc}/products/${f.slug}/`}>
                  {familyName(f, zh)}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function familyName(f: (typeof productFamilies)[number], zh: boolean) {
  return f[zh ? "zh" : "en"].name;
}
