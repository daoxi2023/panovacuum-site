import type { Metadata } from "next";
import Link from "next/link";
import { SITE_BASE } from "@/lib/site-base";
import { pageOg } from "@/lib/og";
import { SeoLinks } from "../../components/seo-links";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t =
    locale === "zh"
      ? {
          title: "能力示例 | 帕诺真空",
          description: "以下示例说明一台典型真空腔体在本厂流程中的完整路径，依据设备台账与工艺记录整理，用于说明制造与检验能力，并非特定客户的交付档案。",
        }
      : {
          title: "Capability Examples | PANO Vacuum",
          description:
            "These examples follow a typical vacuum chamber through our process, based on equipment and process records. They illustrate fabrication and inspection capability rather than a specific customer file.",
        };
  return {
    ...t,
    ...pageOg({
      path: "case-studies",
      locale,
      title: t.title,
      description: t.description,
      altZh: "帕诺真空制造流程中的真空腔体构件",
      altEn: "Vacuum chamber components at stages of the PANO Vacuum process",
    }),
  };
}

const content = {
  en: {
    eyebrow: "MANUFACTURING CAPABILITY EXAMPLES",
    title: "Capability examples drawn from equipment records",
    intro: "The examples below illustrate how a typical chamber passes through our inspection gates. They describe manufacturing capability based on equipment and process records, rather than a specific customer project.",
    note: "They illustrate fabrication capability and inspection practice rather than a specific customer file. On receipt of a drawing, we will identify the closest comparable project.",
    cta: "Send a drawing, get a price",
    back: "Back to home",
    cases: [
      { tag: "Heavy chamber", t: "Multi-ton 304L vacuum chamber", x: "304L stainless, a few tons for a single piece. 30 kW laser blanking, 400 t press brake forming, helium test down to the 1×10⁻⁹ Pa·m³/s order, lifted and turned under the 50 t crane. Records ship with it.", img: "/photos/custom-vacuum-chamber-finished-304l-720w.webp" },
      { tag: "Welding & leak test", t: "Vacuum-tight welding, verified per chamber", x: "TIG and automated welding across 40-plus stations in a clean bay. Every unit is helium tested; none are sampled.", img: "/photos/helium-leak-test-ul1000-vacuum-chamber-720w.webp" },
      { tag: "Packing & dispatch", t: "Export packing and dispatch", x: "Chambers are crated to the export packing requirement with flange faces protected and the crate strapped; the packing list and inspection records travel with the crate.", img: "/photos/packing-export-wooden-crate-1200w.webp" },
      { tag: "Loading", t: "Container loading at the plant", x: "Crated chambers are loaded at the factory dock using our own crane and forklift; loading photographs are kept with the shipment file.", img: "/photos/loading-truck-chamber-shipment-1200w.webp" },
      { tag: "Custom geometry", t: "Square and rectangular chambers", x: "Door frames, hinged doors and port layouts are built from 304L sheet and tested per unit; geometry follows the drawing rather than a standard catalogue.", img: "/photos/case-custom-square-chamber-1200w.webp" },
    ],
  },
  zh: {
    eyebrow: "案例与能力示例",
    title: "能力示例均出自设备台账",
    intro: "以下示例说明一台典型腔体在本厂流程中的完整路径，均依据设备台账与工艺记录整理，用于说明制造与检验能力，并非特定客户的交付档案。",
    note: "以上内容为能力示例，用于说明本厂设备与工艺可完成的工作及验收方式，并非特定客户的项目档案。如需同类工作参考，可提供图纸，我方将匹配最接近的案例。",
    cta: "提交图纸询价",
    back: "返回首页",
    cases: [
      { tag: "重型腔体", t: "数吨级 304L 真空腔体", x: "304L 不锈钢、单件数吨级：3 万瓦激光下料、400 吨·6.2 米折弯成形、氦质谱检漏至 1×10⁻⁹ Pa·m³/s 量级、50 吨行车整体总装与翻转；检验报告随货交付。", img: "/photos/custom-vacuum-chamber-finished-304l-720w.webp" },
      { tag: "焊接与检漏", t: "真空密封焊接，逐台验证", x: "40+ 工位 TIG 与自动化焊接，受控洁净焊接环境；氦质谱检漏逐台验证而非抽检。", img: "/photos/helium-leak-test-ul1000-vacuum-chamber-720w.webp" },
      { tag: "包装与发运", t: "出口包装与发运", x: "按出口包装要求装箱，法兰密封面加保护、木箱整体打包；包装清单与检验记录随箱发运。", img: "/photos/packing-export-wooden-crate-1200w.webp" },
      { tag: "装柜", t: "厂内装柜", x: "在厂内装车区用自有行车与叉车装柜，装柜照片随发货档案留存。", img: "/photos/loading-truck-chamber-shipment-1200w.webp" },
      { tag: "异形腔体", t: "方形与矩形腔体", x: "门框、铰链门与接口布置按图纸用 304L 板材制作，逐台检测；结构按图，不套用标准目录。", img: "/photos/case-custom-square-chamber-1200w.webp" },
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
