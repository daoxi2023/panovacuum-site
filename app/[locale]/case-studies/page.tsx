import Link from "next/link";
import { SITE_BASE } from "@/lib/site-base";
import { SeoLinks } from "../../components/seo-links";

const content = {
  en: {
    eyebrow: "CASE EXAMPLES",
    title: "Capability examples, built from our ledger",
    intro: "What a typical chamber job looks like through our gates — every example below is drawn from our equipment ledger and process records, without customer details. Named customer case studies follow NDA-permitted disclosure.",
    note: "These are capability examples — what we can fabricate and how it is verified — not a specific customer project file. Send your drawing and we will match the closest comparable work we have done.",
    cta: "Request a Quote",
    back: "Back to Home",
    cases: [
      { tag: "Heavy chamber", t: "Multi-ton 304L vacuum chamber", x: "304L stainless, single-piece multi-ton class: 30 kW laser blanking, 400 t / 6.2 m press-brake forming, helium leak test to the 1×10⁻⁹ Pa·m³/s order, assembly and turnover under the 50 t crane; inspection records shipped with the unit.", img: "/photos/cap-chamber.webp" },
      { tag: "Welding & leak test", t: "Vacuum-tight welding, verified per chamber", x: "TIG and automated welding across 40+ stations in a controlled clean welding environment, helium leak-tested per unit — not sampled.", img: "/photos/cap-leak.webp" },
    ],
  },
  zh: {
    eyebrow: "案例与能力示例",
    title: "能力示例，全部出自设备台账",
    intro: "一台典型腔体在我们的流程里怎么走完。下面这些例子都出自设备台账和工艺记录，客户名按保密约定隐去。",
    note: "以上为能力示例：说明「按我们的设备与流程能做什么、怎么验收」，并非特定客户的项目档案。发来图纸，我们会匹配最接近的同类工作给您参考。",
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
