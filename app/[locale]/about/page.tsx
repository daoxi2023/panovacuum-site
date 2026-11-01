import type { Metadata } from "next";
import Link from "next/link";
import { SeoLinks } from "../../components/seo-links";
import "../../growth.css";
import { SITE_BASE, OPERATOR_EN, OPERATOR_ZH } from "@/lib/site-base";
import { manufacturingServices } from "@/lib/manufacturing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "zh"
    ? {
        title: "关于我们 | 帕诺真空",
        description:
          "帕诺真空机械科技（常熟）有限公司，位于江苏常熟，做定制真空腔体、精密加工件与真空密封组件。本页说明公司主体、制造范围、检验方式与联系渠道。",
      }
    : {
        title: "About PANO Vacuum | Custom Vacuum Chambers",
        description:
          "PANO Vacuum Machinery Technology (Changshu) Co., Ltd. makes custom vacuum chambers, precision components and vacuum-tight assemblies in Changshu, Jiangsu, China. Company, scope, inspection and contact details.",
      };
}

const CAPABILITIES = [
  { k: "zh" as const, label: "3 万瓦激光切割", en: "30 kW laser cutting" },
  { k: "zh" as const, label: "400 吨 · 6.2 米折弯", en: "400 t / 6.2 m press brake" },
  { k: "zh" as const, label: "40 余个焊接工位", en: "40+ welding stations" },
  { k: "zh" as const, label: "50 吨行车吊装", en: "50 t overhead crane" },
  { k: "zh" as const, label: "氦检 ≤ 1×10⁻⁹ Pa·m³/s 量级", en: "He leak test to 1×10⁻⁹ Pa·m³/s class" },
  { k: "zh" as const, label: "三坐标尺寸记录", en: "CMM dimensional records" },
];

const FAQ = {
  zh: [
    ["帕诺真空是哪家公司，工厂在哪？", "帕诺真空机械科技（常熟）有限公司，工厂位于江苏省苏州市常熟常福街道朝阳路 88 号，做定制真空腔体、精密加工件与真空密封组件。"],
    ["能做多大的真空腔体？", "按图纸定制，单件可达数吨；配 50 吨行车可整体吊装与翻转，大型腔体不需分段制造。"],
    ["怎么开始合作，多久能给报价？", "提供图纸（PDF、DWG 或 STEP），没有正式图纸时可先给实物照片和关键尺寸。收到资料后 48 小时内初步答复，完成图纸评审后提供报价与交期。"],
    ["检验怎么记录，报告会不会随货？", "从图纸评审到出厂共 7 道检验，逐台签字留档，检测报告随货交付；验收方式与报告范围在图纸评审阶段确认。"],
    ["可以到工厂看设备和在做的项目吗？", "可以。批量或重要项目建议提前预约，到常熟的工厂看设备、工位与正在制造的构件。"],
  ],
  en: [
    ["Who is PANO Vacuum, and where is the plant?", "PANO Vacuum Machinery Technology (Changshu) Co., Ltd., No. 88 Chaoyang Road, Changfu Sub-district, Changshu, Suzhou, Jiangsu, China. We make custom vacuum chambers, precision components and vacuum-tight assemblies."],
    ["How large a chamber can you build?", "Built to drawing, with single pieces up to several tonnes. A 50 t overhead crane handles lifting and turning, so large chambers do not need to be split."],
    ["How do we start, and how fast is a quote?", "Send a drawing (PDF, DWG or STEP); photos and key dimensions are enough to start without a formal drawing. We reply within 48 hours and quote after drawing review."],
    ["How is inspection recorded, and do reports ship with the goods?", "Seven inspection gates from drawing review to final inspection, signed off per unit, with reports travelling with the goods. Acceptance scope is agreed during drawing review."],
    ["Can we visit the factory?", "Yes. For series or critical projects we recommend booking ahead to see the equipment, stations and work in progress in Changshu."],
  ],
} as const;

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const zh = loc === "zh";

  const facts = zh
    ? [
        ["公司主体", "帕诺真空机械科技（常熟）有限公司"],
        ["所在地", "江苏省苏州市常熟常福街道朝阳路 88 号，215500"],
        ["主营", "定制真空腔体、真空设备精密加工件、真空密封组件"],
        ["服务客户", "半导体设备、真空镀膜与工艺装备、新能源装备制造商"],
        ["沟通语言", "中文、英文；海外项目可全程英文对接"],
      ]
    : [
        ["Legal entity", "PANO Vacuum Machinery Technology (Changshu) Co., Ltd."],
        ["Location", "No. 88 Chaoyang Road, Changfu Sub-district, Changshu, Suzhou, Jiangsu 215500, China"],
        ["Products", "Custom vacuum chambers, precision-machined parts and vacuum-tight assemblies"],
        ["Customers", "Semiconductor equipment, vacuum coating and process tools, new-energy equipment makers"],
        ["Languages", "Chinese and English; overseas projects can be handled in English end to end"],
      ];

  const steps = zh
    ? [
        ["提交图纸", "PDF、DWG、STEP 均可；尚无正式图纸时，可先提供实物照片与关键尺寸。"],
        ["图纸评审", "确认可制造性、公差分配、焊缝结构与泄漏风险点，再给出报价与交期。"],
        ["制造与检验", "下料成形、精密加工、焊接与表面处理，逐台进行氦质谱检漏。"],
        ["出厂交付", "7 道检验逐项签字留档，检测记录随货交付。"],
      ]
    : [
        ["Send the drawing", "PDF, DWG or STEP. If no formal drawing exists yet, photos and key dimensions are enough to start."],
        ["Drawing review", "Manufacturability, tolerances, weld layout and leak-risk points are reviewed before a quote and lead time."],
        ["Manufacture and inspect", "Blanking, machining, welding and surface finishing, with helium leak testing on every unit."],
        ["Delivery", "Seven inspection gates are signed off per unit and the records travel with the goods."],
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_BASE}/#organization`,
        name: zh ? "帕诺真空机械科技（常熟）有限公司" : "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.",
        url: `${SITE_BASE}/${loc}/about/`,
        email: "zhouyou@panovacuum.com",
        telephone: "+86-130-6372-2038",
        address: {
          "@type": "PostalAddress",
          streetAddress: zh ? "常福街道朝阳路 88 号" : "No. 88 Chaoyang Road, Changfu Sub-district",
          addressLocality: zh ? "常熟市" : "Changshu",
          addressRegion: zh ? "江苏省" : "Jiangsu",
          postalCode: "215500",
          addressCountry: "CN",
        },
        description: zh
          ? "定制真空腔体、精密加工件与真空密封组件制造商。"
          : "Manufacturer of custom vacuum chambers, precision components and vacuum-tight assemblies.",
      },
      {
        "@type": "AboutPage",
        "@id": `${SITE_BASE}/${loc}/about/#page`,
        url: `${SITE_BASE}/${loc}/about/`,
        name: zh ? "关于我们 | 帕诺真空" : "About PANO Vacuum",
        inLanguage: zh ? "zh-CN" : "en",
        about: { "@id": `${SITE_BASE}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_BASE}/${loc}/about/#faq`,
        mainEntity: (zh ? FAQ.zh : FAQ.en).map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: zh ? "首页" : "Home", item: `${SITE_BASE}/${loc}/` },
          { "@type": "ListItem", position: 2, name: zh ? "关于我们" : "About", item: `${SITE_BASE}/${loc}/about/` },
        ],
      },
    ],
  };

  return (
    <div className="growth-page about-page">
      <SeoLinks path="about" locale={loc} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="growth-heading">
        <div className="container">
          <p className="eyebrow">{zh ? "关于我们" : "About PANO"}</p>
          <h1>{zh ? "把图纸做成可检漏的腔体" : "Turning drawings into leak-tight chambers"}</h1>
          <p className="sub">
            {zh
              ? "帕诺真空机械科技（常熟）有限公司位于江苏常熟，做定制真空腔体、精密加工件与真空密封组件。本页说明我们是谁、做什么、怎么检验，以及如何开始合作。"
              : "PANO Vacuum Machinery Technology (Changshu) Co., Ltd. is based in Changshu, Jiangsu, China, and builds custom vacuum chambers, precision components and vacuum-tight assemblies. This page covers who we are, what we make, how we inspect it and how to start."}
          </p>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <div className="profile-intro">
            <div>
              <h2>{zh ? "一家人和图纸打交道的制造厂" : "A manufacturer that starts from the drawing"}</h2>
              <p>
                {zh
                  ? "真空腔体不是标准件：接口位置、壁厚、焊缝结构、表面状态和检漏要求，每一项都写在图纸上。帕诺的做法是先评审图纸，把可制造性、公差分配和泄漏风险讲清楚，再谈加工、检验与交期。确认过的内容写进合同，检验记录随货交付。"
                  : "A vacuum chamber is not a catalogue part: interface positions, wall thickness, weld layout, surface condition and leak-test requirements all come from the drawing. We review the drawing first — manufacturability, tolerances and leak risks — then agree machining, inspection and lead time. What is agreed goes into the contract; inspection records travel with the goods."}
              </p>
            </div>
            <img
              src="/photos/workshop-063.webp"
              width={1600}
              height={1067}
              alt={zh ? "帕诺真空常熟车间的焊接工位" : "Welding station at the PANO Vacuum workshop in Changshu"}
            />
          </div>

          <dl className="profile-facts">
            {facts.map(([title, text]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <h2>{zh ? "我们做什么" : "What we make"}</h2>
          <p className="sub">
            {zh
              ? "三条产品线共用同一套评审、加工与检漏资源，按图纸定制，不按型号目录销售。"
              : "Three product lines share the same review, machining and leak-test resources. Everything is built to drawing, not sold from a catalogue."}
          </p>
          <ul className="about-services">
            {manufacturingServices.map((s) => {
              const item = zh ? s.zh : s.en;
              return (
                <li key={s.slug}>
                  <h3>
                    <Link href={`/${loc}/manufacturing/${s.slug}/`}>{item.title}</Link>
                  </h3>
                  <p>{item.intro}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <h2>{zh ? "制造与检验能力" : "Manufacturing and inspection capability"}</h2>
          <p className="sub">
            {zh
              ? "以下为在用的主要设备与检测手段，具体适用性随图纸与结构确认，不用通用参数代替项目评审。"
              : "The main equipment and inspection methods in use. Suitability is confirmed per drawing and structure; general figures do not replace project review."}
          </p>
          <ul className="about-caps">
            {CAPABILITIES.map((c) => (
              <li key={c.en}>{zh ? c.label : c.en}</li>
            ))}
          </ul>

          <h3 className="about-subhead">{zh ? "从图纸到交付" : "From drawing to delivery"}</h3>
          <ol className="about-steps">
            {steps.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <h2>{zh ? "可以核对，也可以到厂看" : "Verifiable, and open to a factory visit"}</h2>
          <p>
            {zh
              ? "采购最关心的往往不是参数表，而是出了问题找谁、记录在哪。帕诺接受在图纸评审阶段把验收方式、检测项目和报告格式谈清楚；批量或重要项目可预约到常熟的工厂看设备、看工位、看正在做的活。合作方也可先看"
              : "Buyers rarely worry about a spec sheet — they worry about who answers when something goes wrong, and where the records are. Acceptance methods, inspection items and report format can be agreed during drawing review; for series or critical projects you can book a visit to the Changshu plant to see the equipment, the stations and live work. You can also review "}
            <Link href={`/${loc}/company-profile/`}>{zh ? "工厂能力介绍" : "the factory overview"}</Link>
            {zh ? "与" : " and "}
            <Link href={`/${loc}/case-studies/`}>{zh ? "制造能力示例" : "manufacturing case studies"}</Link>
            {zh ? "，或直接看" : ", or read "}
            <Link href={`/${loc}/blog/`}>{zh ? "技术文章" : "the technical articles"}</Link>
            {zh ? "。" : "."}
          </p>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <h2>{zh ? "常见问题" : "Common questions"}</h2>
          <dl className="about-faq">
            {(zh ? FAQ.zh : FAQ.en).map(([q, a]) => (
              <div key={q}>
                <dt>{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <h2>{zh ? "关于本网站" : "About this website"}</h2>
          <p className="about-operator">
            {zh
              ? "本站（包括页面内容、在线表单与域名）由苏州领拓互联科技有限公司负责建设、技术维护和线上业务运营；制造业务与产品信息的主体为帕诺真空机械科技（常熟）有限公司。"
              : `This website, including its content, online forms and domains, is built, maintained and operated online by ${OPERATOR_EN} (${OPERATOR_ZH}). The manufacturing business and product information published here belong to PANO Vacuum Machinery Technology (Changshu) Co., Ltd.`}
          </p>
          <p className="about-links">
            <Link href={`/${loc}/privacy/`}>{zh ? "隐私政策" : "Privacy policy"}</Link>
            {" · "}
            <Link href={`/${loc}/terms/`}>{zh ? "使用条款" : "Terms of use"}</Link>
          </p>

          <div className="growth-actions">
            <Link className="growth-button" href={`/${loc}/request-a-quote/`}>
              {zh ? "提交制造需求" : "Send a manufacturing enquiry"}
            </Link>
            <Link className="growth-button secondary" href={`/${loc}/manufacturing/custom-vacuum-chambers/`}>
              {zh ? "了解定制真空腔体" : "Custom vacuum chambers"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
