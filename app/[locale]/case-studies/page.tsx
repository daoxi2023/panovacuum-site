import Link from "next/link";
import { SITE_BASE } from "@/lib/site-base";
import { SeoLinks } from "../../components/seo-links";

const content = {
  en: {
    eyebrow: "WORK WE HAVE DONE",
    title: "Capability examples drawn from equipment records",
    intro: "The examples below illustrate how a typical chamber passes through our inspection gates. They are compiled from equipment records; customer names are withheld under confidentiality agreements.",
    note: "They illustrate fabrication capability and inspection practice rather than a specific customer file. On receipt of a drawing, we will identify the closest comparable project.",
    cta: "Send a drawing, get a price",
    back: "Back to home",
    cases: [
      { tag: "Heavy chamber", t: "Multi-ton 304L vacuum chamber", x: "304L stainless, a few tons for a single piece. 30 kW laser blanking, 400 t press brake forming, helium test down to the 1×10⁻⁹ Pa·m³/s order, lifted and turned under the 50 t crane. Records ship with it.", img: "/photos/cap-chamber.webp" },
      { tag: "Welding & leak test", t: "Vacuum-tight welding, verified per chamber", x: "TIG and automated welding across 40-plus stations in a clean bay. Every unit is helium tested; none are sampled.", img: "/photos/cap-leak.webp" },
    ],
  },
  zh: {
    eyebrow: "案例与能力示例",
    title: "能力示例均出自设备台账",
    intro: "以下示例说明一台典型腔体在本厂流程中的完整路径，均依据设备台账与工艺记录整理，客户名称按保密约定隐去。",
    note: "以上内容为能力示例，用于说明本厂设备与工艺可完成的工作及验收方式，并非特定客户的项目档案。如需同类工作参考，可提供图纸，我方将匹配最接近的案例。",
    cta: "提交图纸询价",
    back: "返回首页",
    cases: [
      { tag: "重型腔体", t: "数吨级 304L 真空腔体", x: "304L 不锈钢、单件数吨级：3 万瓦激光下料、400 吨·6.2 米折弯成形、氦质谱检漏至 1×10⁻⁹ Pa·m³/s 量级、50 吨行车整体总装与翻转；检验报告随货交付。", img: "/photos/cap-chamber.webp" },
      { tag: "焊接与检漏", t: "真空密封焊接，逐台验证", x: "40+ 工位 TIG 与自动化焊接，受控洁净焊接环境；氦质谱检漏逐台验证而非抽检。", img: "/photos/cap-leak.webp" },
    ],
  },
};

export default async function CaseStudies({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const zh = locale === "zh";
  const t = content[zh ? "zh" : "en"];
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.title,
    description: t.intro,
    itemListElement: t.cases.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Article", headline: c.t, description: c.x, image: `${SITE_BASE}${c.img}` },
    })),
  };
  return (
    <>
      <SeoLinks path="case-studies" locale={locale} />
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
          <div className="grid">
            {t.cases.map((c) => (
              <div className="card" key={c.t}>
                <div className="card-img"><img src={c.img} alt={c.t} loading="lazy" /></div>
                <div className="card-body">
                  <p className="case-tag">{c.tag}</p>
                  <h3>{c.t}</h3>
                  <p>{c.x}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="case-note">{t.note}</p>
          <p style={{ marginTop: 28 }}>
            <Link href={zh ? "/zh/request-a-quote/" : "/en/request-a-quote/"} className="cta">{t.cta}</Link>
            <Link href={`/${locale}/`} className="cta secondary">{t.back}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
