import type { Metadata } from "next";
import Link from "next/link";
import { SITE_BASE } from "@/lib/site-base";
import { pageOg } from "@/lib/og";
import { productFamilies } from "@/lib/products";
import { SeoLinks } from "../../components/seo-links";
import "./products.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t =
    locale === "zh"
      ? {
          title: "产品：六类真空腔体与组件 | 帕诺真空",
          description:
            "帕诺真空按图纸定制真空腔体与组件：圆形与筒式、方形与箱式、数吨级卧式、真空炉腔体、镀膜工艺腔体、法兰与馈通。材料、成形方式、接口与检验口径逐类写明。",
        }
      : {
          title: "Products: six families of vacuum chambers | PANO Vacuum",
          description:
            "Custom vacuum chambers built to drawing: cylindrical, square/box, multi-tonne horizontal, furnace, coating process chambers, plus flanges and feedthroughs. Material, forming, interfaces and testing stated per family.",
        };
  return {
    ...t,
    ...pageOg({
      path: "products",
      locale,
      title: t.title,
      description: t.description,
      altZh: "帕诺真空车间里正在总装的不锈钢真空腔体",
      altEn: "Stainless steel vacuum chambers being assembled in the PANO Vacuum workshop",
    }),
  };
}

const content = {
  en: {
    eyebrow: "PRODUCT FAMILIES",
    title: "Six families of vacuum chambers and components, built to drawing",
    intro:
      "These are the six families we build most often and get asked about first during drawing review. Each entry states only what we can confirm: material, forming, interfaces and how it is tested. Geometry, dimensions and tolerances are settled from your drawing.",
    detail: "See this family in detail",
    note: "This page describes the range we can build, not a catalogue of models. PANO builds to drawing and does not sell standard chambers or complete systems, and we do not quote a base pressure for a chamber on its own — that depends on the pump set, seals and process, and is agreed per project.",
    howTitle: "From drawing to dispatch",
    howSub: "Most enquiries move through four steps. The first one costs nothing and usually decides whether the rest is worth doing.",
    steps: [
      {
        t: "Send a drawing or the basic dimensions",
        x: "A PDF or STEP file is ideal. If there is no drawing yet, send the inner dimensions, material, port list and what the chamber will do.",
      },
      {
        t: "Drawing review and quotation",
        x: "We come back on wall thickness, forming method, weld access, port positions and which inspection gates apply, then quote with those points written in.",
      },
      {
        t: "Cutting, forming and welding",
        x: "Laser blanking, 6.2 m bending and rolling, then TIG and automated welding across 40-plus stations inside the controlled clean welding bay.",
      },
      {
        t: "Leak test, records and dispatch",
        x: "Every chamber is helium tested, critical dimensions are recorded, and it is crated to the export packing requirement with records in the crate.",
      },
    ],
    cta: "Send a drawing, get a price",
    cta2: "See how chambers are made and tested",
  },
  zh: {
    eyebrow: "产品族",
    title: "六类真空腔体与组件，按图定制",
    intro:
      "以下六类是我们做得多、图纸评审时最常被先问到的。每条只写能确认的范围：材料、成形方式、接口与检验口径。具体结构、尺寸和公差，按你提供的图纸评审确认。",
    detail: "看这一族的细节",
    note: "本页写的是我们能做的范围，不是标准型号或目录产品。帕诺按图纸定制，不做目录化整机，也不单独承诺一台腔体能抽到多少真空度——那取决于泵组、密封与工艺，需要在项目里约定。",
    howTitle: "从图纸到发运，四步",
    howSub: "多数询价走这四步。第一步不收费，通常也决定后面值不值得做。",
    steps: [
      {
        t: "发图纸或基本尺寸",
        x: "有 PDF 或 STEP 最好。没有图纸也能起：给内腔尺寸、材料、接口清单和这台腔体要做什么。",
      },
      {
        t: "图纸评审与报价",
        x: "我们回你板厚、成形方式、焊接可达性、开孔位置和该走哪几道检验，报价里把这些写清楚。",
      },
      {
        t: "下料、成形与焊接",
        x: "激光下料、6.2 米折弯与卷制，再到 40+ 工位的 TIG 与自动化焊接，在受控洁净焊接环境内完成。",
      },
      {
        t: "检漏、记录与发运",
        x: "逐台氦质谱检漏、关键尺寸记录，按出口包装要求装箱，检验记录随箱发运。",
      },
    ],
    cta: "提交图纸询价",
    cta2: "看制造与检验能力",
  },
};

export default async function Products({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const zh = locale === "zh";
  const t = content[zh ? "zh" : "en"];
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.title,
    description: t.intro,
    itemListElement: productFamilies.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: f[zh ? "zh" : "en"].name,
        description: f[zh ? "zh" : "en"].tagline,
        image: `${SITE_BASE}${f.image}`,
        material: "304 / 304L / 316L stainless steel",
        brand: { "@type": "Brand", name: "PANO Vacuum" },
        manufacturer: { "@type": "Organization", name: zh ? "帕诺真空机械科技（常熟）有限公司" : "PANO Vacuum Machinery Technology (Changshu) Co., Ltd." },
      },
    })),
  };
  return (
    <>
      <SeoLinks path="products" locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="sub">{t.intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="products-grid">
            {productFamilies.map((f) => {
              const c = f[zh ? "zh" : "en"];
              return (
                <article className="card product-card" key={f.slug}>
                  <Link className="card-img" href={`/${locale}/products/${f.slug}/`} aria-label={c.name}>
                    <img src={f.image} alt={c.alt} width={f.iw} height={f.ih} loading="lazy" />
                  </Link>
                  <div className="card-body">
                    <h3>
                      <Link href={`/${locale}/products/${f.slug}/`}>{c.name}</Link>
                    </h3>
                    <p className="product-tagline">{c.tagline}</p>
                    <ul className="product-points">
                      {c.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <Link href={`/${locale}/products/${f.slug}/`} className="product-more">
                      {t.detail} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="products-note">{t.note}</p>
        </div>
      </section>
      <section className="section products-how">
        <div className="container">
          <h2>{t.howTitle}</h2>
          <p className="sub">{t.howSub}</p>
          <div className="product-steps">
            {t.steps.map((s, i) => (
              <div className="product-step" key={s.t}>
                <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
                <b>{s.t}</b>
                <p>{s.x}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link href={zh ? "/zh/request-a-quote/" : "/en/request-a-quote/"} className="cta">{t.cta}</Link>
            <Link href={zh ? "/zh/manufacturing/custom-vacuum-chambers/" : "/en/manufacturing/custom-vacuum-chambers/"} className="cta secondary">
              {t.cta2}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
