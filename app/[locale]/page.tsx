import Link from "next/link";
import "../home.css";
import { articles } from "../../lib/articles";
import { SeoLinks } from "../components/seo-links";
import { PartnerGrid } from "../components/partner-grid";
import "../growth.css";
import { OPERATOR_EN, OPERATOR_ZH } from "@/lib/site-base";

const gates: Record<"en" | "zh", string[]> = {
  en: ["Drawing review & DFM", "Incoming material", "Blanking & bevel", "Precision machining", "Welding", "He leak testing", "Final inspection & delivery"],
  zh: ["图纸评审与 DFM", "来料检验", "下料与坡口", "精密加工", "焊接", "氦质谱检漏", "出厂检验与交付"],
};

const content = {
  en: {
    eyebrow: "Vacuum chamber fabrication",
    h1: "Custom vacuum chambers, manufactured to drawing. Every unit is leak tested and shipped with its inspection report.",
    sub: "Our plant is located in Changshu, Jiangsu Province. Blanking, machining, welding, leak testing and final inspection are all carried out in-house. Every chamber undergoes helium mass-spectrometer leak testing before dispatch, and the test record is delivered with the unit.",
    cta: "Submit a drawing for quotation",
    cta2: "Review manufacturing capability",
    rfq: "/en/request-a-quote",
    trust: "Quotation within 48 hours of drawing review · Single units accepted · English-language support provided",
    statsEyebrow: "Primary production equipment",
    statsTitle: "Equipment specification and working range",
    stats: [
      { v: "30 kW", k: "Laser Cutting", d: "Thick-plate cutting and weld bevels in a single pass" },
      { v: "400 t · 6.2 m", k: "Press Brake", d: "Large sheet-metal components formed in a single operation" },
      { v: "40+", k: "Welding Stations", d: "TIG and automated welding, with a dedicated clean welding bay" },
      { v: "50 t", k: "Overhead Crane", d: "Multi-tonne chambers lifted and rotated as a single unit" },
      { v: "≤1×10⁻⁹", k: "He Leak Rate", d: "UL1000-class; every unit tested, no sampling" },
    ],
    ticker: [
      "30 kW laser cutting",
      "400 t · 6.2 m press brake",
      "40+ welding stations",
      "50 t overhead crane",
      "He leak ≤ 1×10⁻⁹ Pa·m³/s",
      "CMM dimension records",
      "TIG and automated welding",
    ],
    capsEyebrow: "Process scope",
    capsTitle: "All four process stages are carried out in-house",
    capsSub: "The equipment listed below is in service at our plant; quotations are based on its actual working range.",
    caps: [
      { t: "Precision CNC Machining", x: "Vacuum-grade components. Key dimensions are inspected and recorded for each part.", img: "/photos/cap-cmm.webp", alt: "ALPHA articulating-arm CMM inspecting a vacuum-grade part" },
      { t: "Vacuum-Tight Welding", x: "TIG and automated welding across more than 40 stations; the welding bay is separately enclosed.", img: "/photos/cap-chamber.webp", alt: "Finished custom vacuum chamber, 304L stainless steel" },
      { t: "Surface Finishing & Cleaning", x: "Performed within the clean welding bay. Process and cleaning records are available with delivery.", img: "/photos/cap-clean.webp", alt: "Controlled clean environment for surface finishing and inspection" },
      { t: "Helium Leak Testing & Assembly", x: "UL1000-class instrument, tested to the 1×10⁻⁹ Pa·m³/s range; each unit is tested prior to assembly and dispatch.", img: "/photos/cap-leak.webp", alt: "INFICON UL1000-class helium leak tester verifying a chamber" },
    ],
    qualityEyebrow: "Inspection process",
    qualityTitle: "Seven inspection gates before dispatch",
    qualityText: "Drawing review, incoming material inspection, blanking, machining, welding, helium leak testing and final inspection. Each of the seven gates is signed off and filed per unit; the report is delivered with the chamber.",
    qualityCta: "Details of the seven inspection gates",
    info: [
      { k: "Location", v: "Changshu, Jiangsu Province. PANO Vacuum Machinery Technology (Changshu) Co., Ltd. specialises in custom vacuum chambers." },
      { k: "Products", v: "Vacuum chambers, precision components and vacuum-tight assemblies. Customer drawings are reviewed and quoted; machining, welding, leak testing and inspection are completed in-house prior to dispatch." },
      { k: "Customers", v: "Manufacturers of semiconductor equipment, vacuum coating and process equipment, and new-energy equipment. Overseas customers are supported in English." },
    ],
    aboutEyebrow: "About Us",
    aboutTitle: "Integrated manufacturing, from blanking to dispatch",
    team: [
      { t: "Process Engineering", x: "Drawing review is completed before cutting: manufacturability, tolerance allocation and potential leak paths are confirmed." },
      { t: "CNC & Machining", x: "Vacuum-grade components are machined on in-house equipment; key dimensions are recorded for each part." },
      { t: "Welding", x: "TIG and automated welding across more than 40 stations, with a dedicated clean welding bay." },
      { t: "QC & Leak Testing", x: "Seven inspection gates per unit, with records filed and dispatched together with the equipment." },
    ],
    indEyebrow: "Applications",
    indTitle: "End equipment and application scenarios",
    ind: [
      { t: "Semiconductor Equipment", x: "Process chambers, transfer chambers, flanges and precision components." },
      { t: "Vacuum Coating & Process Tools", x: "Chambers and matching components for coating and PVD systems." },
      { t: "New-Energy Equipment", x: "Heavy welded structures for battery and photovoltaic production lines." },
    ],
    procEyebrow: "Working process",
    procTitle: "Four stages from drawing submission to delivery",
    steps: [
      { t: "Submit drawings", x: "PDF, DWG and STEP formats are accepted. Where a formal drawing is not yet available, photographs and key dimensions may be provided for an initial assessment." },
      { t: "Review & DFM", x: "Manufacturability, tolerance requirements and leak risk are assessed before quotation." },
      { t: "Quotation and lead time", x: "A substantive quotation is issued within 48 hours; the delivery schedule is included in the contract." },
      { t: "Manufacturing, inspection and delivery", x: "On completion of the seven inspection gates, records are delivered with the equipment." },
    ],
    caseEyebrow: "Delivered projects",
    caseTitle: "Two delivered cases",
    caseSub: "The following is compiled from equipment records; customer names are withheld under confidentiality agreements.",
    caseCta: "View further capability examples",
    cases: [
      { t: "Multi-tonne 304L vacuum chamber", x: "Fabricated in 304L stainless steel, with unit weights in the multi-tonne range. 30 kW laser cutting, 400 t press-brake forming, helium leak testing to the 1×10⁻⁹ Pa·m³/s range, and lifting and rotation as a single unit by 50 t overhead crane. Inspection report delivered with the chamber.", tag: "Heavy chamber", img: "/photos/chamber-050.webp" },
      { t: "Vacuum-tight welding, verified unit by unit", x: "More than 40 TIG and automated welding stations with a dedicated clean welding bay; every unit is helium leak tested, with no sampling.", tag: "Welding & leak test", img: "/photos/cap-leak.webp" },
    ],
    partnersEyebrow: "Partners",
    partnersTitle: "Customers and supply-chain partners",
    partnersSub: "A selection of customers and supply-chain partners, as listed in the business plan.",
    newsEyebrow: "Technical articles",
    newsTitle: "Recent articles",
    newsCta: "View all articles",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "Common customer questions (10)",
    faq: [
      { q: "What is the largest chamber you can produce?", a: "Single units in the multi-tonne range are within capability. Dimensions are manufactured to drawing; a 50 t overhead crane allows lifting and rotation as a single unit, so large chambers need not be fabricated in sections." },
      { q: "Which materials do you use?", a: "Primarily 304L and SUS316L stainless steel. Grade and surface finish are executed to drawing requirements." },
      { q: "What is your leak-testing capability?", a: "Helium mass-spectrometer leak testing to the 1×10⁻⁹ Pa·m³/s range (UL1000-class); every unit is tested before dispatch." },
      { q: "What is the lead time?", a: "Lead time is determined by drawing complexity. A milestone schedule is provided with the quotation and incorporated into the contract." },
      { q: "Which certifications do you hold?", a: "Certification to relevant SEMI standards and the AWS welding system is in progress; customer audits are welcomed. Please contact sales for the current status." },
      { q: "How do we start?", a: "Please submit drawings in PDF, DWG or STEP format. We will review them and issue DFM comments and a quotation; 3D models and engineering drawings are also accepted." },
      { q: "Is there a minimum order quantity?", a: "Single units are accepted; there is no minimum order quantity." },
      { q: "What warranty applies?", a: "As per the contract warranty terms. Each unit is delivered with its inspection records." },
      { q: "How do overseas customers work with you?", a: "English-language support is provided throughout (zhouyou@panovacuum.com / +1 307 533 3212); export packing and documentation are provided." },
      { q: "What are the payment terms?", a: "As agreed in the contract; 30/70 payment or a letter of credit can be discussed." },
    ],
    bandH: "Submit a drawing; a substantive quotation within 48 hours.",
    bandSub: "English-language support provided · +86 130 6372 2038 · zhouyou@panovacuum.com",
  },

  zh: {
    eyebrow: "真空腔体定制",
    h1: "按图纸制造真空腔体。",
    sub: "工厂位于江苏常熟。下料、机加工、焊接、检漏与出厂检验均在本厂完成；每台腔体出厂前经氦质谱检漏，检测记录随货交付。",
    cta: "提交图纸询价",
    cta2: "了解车间加工能力",
    rfq: "/zh/request-a-quote",
    trust: "图纸评审后 48 小时内报价 · 承接单件 · 提供英文对接",
    statsEyebrow: "主要加工设备",
    statsTitle: "设备规格与可加工范围",
    stats: [
      { v: "3 万瓦", k: "激光切割", d: "厚板下料与坡口切割一次成型" },
      { v: "400 吨 · 6.2 m", k: "折弯成形", d: "大型钣金件一次折弯成形" },
      { v: "40+", k: "焊接工位", d: "TIG 与自动焊，设独立洁净焊接区" },
      { v: "50 吨", k: "重型行车", d: "数吨级腔体可整体吊装与翻转" },
      { v: "≤1×10⁻⁹", k: "氦检漏率", d: "UL1000 级，逐台检测，不抽检" },
    ],
    ticker: [
      "3 万瓦激光切割",
      "400 吨 · 6.2 米折弯",
      "40+ 焊接工位",
      "50 吨行车吊装",
      "氦检 ≤ 1×10⁻⁹ Pa·m³/s",
      "三坐标尺寸记录",
      "TIG 与自动焊",
    ],
    capsEyebrow: "工艺范围",
    capsTitle: "四类工序均在本厂完成",
    capsSub: "下列设备均为本厂在用设备，报价按设备的实际加工能力核算。",
    caps: [
      { t: "精密 CNC 加工", x: "真空级零件，关键尺寸逐件测量并记录。", img: "/photos/cap-cmm.webp", alt: "ALPHA 关节臂三坐标检测仪检测真空级零件" },
      { t: "真空密封焊接", x: "TIG 与自动焊，40 余个工位，焊接区独立隔断。", img: "/photos/cap-chamber.webp", alt: "定制真空腔体成品，304L 不锈钢" },
      { t: "表面处理与清洗", x: "于洁净焊接区内完成，处理与清洗记录可随货提供。", img: "/photos/cap-clean.webp", alt: "受控洁净环境下的表面处理与检测" },
      { t: "氦质谱检漏与装配", x: "采用 UL1000 级检漏仪，可达 1×10⁻⁹ Pa·m³/s 量级，逐台检测后装配发运。", img: "/photos/cap-leak.webp", alt: "UL1000 氦质谱检漏仪验证腔体密封性" },
    ],
    qualityEyebrow: "检验流程",
    qualityTitle: "每台腔体出厂前须通过 7 道检验",
    qualityText: "图纸评审、来料检验、下料、机加工、焊接、氦质谱检漏、出厂检验，7 道工序逐项签字留档，报告随货交付。",
    qualityCta: "7 道检验的具体内容",
    info: [
      { k: "工厂位置", v: "江苏省常熟市。帕诺真空机械科技（常熟）有限公司，主营定制真空腔体。" },
      { k: "主营产品", v: "真空腔体、精密零件与真空密封组件。客户提供图纸，加工、焊接、检漏与检验均在本厂完成，完工后发运。" },
      { k: "服务客户", v: "半导体设备、真空镀膜与工艺装备、新能源装备制造商；海外客户可全程英文对接。" },
    ],
    aboutEyebrow: "关于我们",
    aboutTitle: "一体化制造：从下料到出厂",
    team: [
      { t: "工艺工程", x: "下料前完成图纸评审，确认可制造性、公差分配与泄漏风险点。" },
      { t: "CNC 与精密加工", x: "真空级零件于本厂机床加工，关键尺寸逐件记录。" },
      { t: "焊接", x: "TIG 与自动焊，40 余个工位，配洁净焊接区。" },
      { t: "质检与检漏", x: "7 道检验，逐台留档，报告随货。" },
    ],
    indEyebrow: "应用领域",
    indTitle: "终端设备与配套场景",
    ind: [
      { t: "半导体设备", x: "工艺腔、传输腔、法兰及精密件。" },
      { t: "真空镀膜与工艺装备", x: "真空镀膜与 PVD 设备的腔体及配套件。" },
      { t: "新能源装备", x: "电池、光伏产线上的重型焊接结构件。" },
    ],
    procEyebrow: "合作流程",
    procTitle: "从提交图纸到收货的四个环节",
    steps: [
      { t: "提交图纸", x: "支持 PDF、DWG、STEP 格式；尚无正式图纸时，可先提供实物照片与关键尺寸。" },
      { t: "评审与 DFM 分析", x: "评估可制造性、公差要求与泄漏风险后报价。" },
      { t: "报价与交期", x: "48 小时内提供实质性报价，交期列入合同。" },
      { t: "制造、检验与交付", x: "完成 7 道检验后，检测记录随货交付。" },
    ],
    caseEyebrow: "交付案例",
    caseTitle: "两项已交付案例",
    caseSub: "以下内容依据设备台账整理，客户名称按保密约定隐去。",
    caseCta: "查看更多能力示例",
    cases: [
      { t: "数吨级 304L 真空腔体", x: "304L 不锈钢，单件重达数吨。3 万瓦激光下料、400 吨折弯机成形，氦质谱检漏达 1×10⁻⁹ Pa·m³/s 量级，以 50 吨行车整体吊装翻转。检测报告随货交付。", tag: "重型腔体", img: "/photos/chamber-050.webp" },
      { t: "真空密封焊接，逐台验证", x: "40 余个 TIG 与自动焊工位，设洁净焊接区；逐台进行氦质谱检漏，不抽检。", tag: "焊接与检漏", img: "/photos/cap-leak.webp" },
    ],
    partnersEyebrow: "合作伙伴",
    partnersTitle: "合作客户与供应链伙伴",
    partnersSub: "以下为部分合作客户与供应链伙伴，依据商业计划书列举。",
    newsEyebrow: "技术文章",
    newsTitle: "近期文章",
    newsCta: "查看全部文章",
    faqEyebrow: "常见问题",
    faqTitle: "客户常见问题（10 则）",
    faq: [
      { q: "能做多大的腔体？", a: "单件可达数吨。尺寸按图纸定制，50 吨行车可整体吊装与翻转，大型腔体无需分段制造。" },
      { q: "用什么材料？", a: "主要为 304L 与 SUS316L 不锈钢，牌号与表面处理按图纸要求执行。" },
      { q: "检漏能力怎么样？", a: "氦质谱检漏可达 1×10⁻⁹ Pa·m³/s 量级（UL1000 级），每台出厂前逐台检测。" },
      { q: "交期多久？", a: "视图纸复杂程度确定；报价时提供节点计划，并列入合同。" },
      { q: "有什么认证？", a: "SEMI 相关标准与 AWS 焊接体系认证正在推进，可配合客户来厂审核；具体进度请咨询销售。" },
      { q: "怎么开始合作？", a: "请提供图纸（PDF、DWG 或 STEP），我方进行评审并出具 DFM 建议与报价；亦可接收 3D 模型与工程图。" },
      { q: "最小起订量？", a: "承接单件，无最小起订量。" },
      { q: "质保怎么算？", a: "按合同质保条款执行，每台随货附检测记录。" },
      { q: "海外客户怎么合作？", a: "可全程英文对接（zhouyou@panovacuum.com / +1 307 533 3212），并提供出口包装与单证。" },
      { q: "付款方式？", a: "按合同约定，可协商 30/70 付款或信用证结算。" },
    ],
    bandH: "提交图纸，48 小时内获得实质性报价",
    bandSub: "支持英文对接 · 电话 +86 130 6372 2038 · zhouyou@panovacuum.com",
  },

};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const t = content[loc];
  const news = articles.slice(0, 3);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div className="home-page">
      <SeoLinks path="" locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{loc === "zh" ? <><span style={{ display: "block" }}>按图纸制造真空腔体。</span><span style={{ display: "block" }}>逐台检验，随货附报告。</span></> : t.h1}</h1>
            <p className="sub">{t.sub}</p>
            <div className="hero-actions">
              <Link href={t.rfq} className="cta">{t.cta}</Link>
              <Link href={`/${loc}/#capabilities`} className="cta secondary">{t.cta2}</Link>
            </div>
            <p className="trust">{t.trust}</p>
          </div>
          <figure className="hero-media">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/video/hero-poster.jpg"
              aria-label={loc === "zh" ? "真空腔体制造影像" : "Vacuum chamber manufacturing visual"}
            >
              <source src="/video/hero-loop-1280.mp4" type="video/mp4" media="(max-width: 900px)" />
              <source src="/video/hero-loop-1920.mp4" type="video/mp4" />
            </video>
            <img
              className="hero-poster"
              src="/photos/hero-main.webp"
              alt={loc === "zh" ? "帕诺真空车间实拍" : "Inside the PANO Vacuum workshop"}
              width={2400}
              height={1600}
              loading="eager"
              fetchPriority="high"
            />
          </figure>
        </div>
        <span className="hero-scroll" aria-hidden="true" />
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((dup) => (
            <div className="ticker-group" key={dup}>
              {t.ticker.map((item) => (
                <span className="ticker-item" key={`${dup}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="stats">
        <div className="container">
          <p className="eyebrow">{t.statsEyebrow}</p>
          <h2>{t.statsTitle}</h2>
          <div className="stats-grid">
            {t.stats.map((s) => (
              <div className="stat" key={s.k}>
                <p className="stat-v">{s.v.split(" · ").map((part, index) => (
                  <span key={part}>{index > 0 ? "· " : ""}{part}</span>
                ))}</p>
                <p className="stat-k">{s.k}</p>
                <p className="stat-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.capsEyebrow}</p>
            <h2>{t.capsTitle}</h2>
            <p className="sub">{t.capsSub}</p>
          </div>
          <div className="grid">
            {t.caps.map((c) => (
              <div className="card" key={c.t}>
                <h3 className="cap-title">{c.t}</h3>
                <div className="card-img"><img src={c.img} alt={c.alt || c.t} width={720} height={480} loading="lazy" /></div>
                <div className="card-body"><p>{c.x}</p></div>
              </div>
            ))}
          </div>
          <div className="growth-service-links" aria-label={loc === "zh" ? "按制造需求了解相关服务" : "Explore manufacturing services"}>
            <Link href={`/${loc}/manufacturing/custom-vacuum-chambers/`}>{loc === "zh" ? "定制真空腔体" : "Custom vacuum chambers"}</Link>
            <Link href={`/${loc}/manufacturing/precision-components/`}>{loc === "zh" ? "精密加工零件" : "Precision components"}</Link>
            <Link href={`/${loc}/manufacturing/vacuum-tight-welding/`}>{loc === "zh" ? "真空密封焊接" : "Vacuum-tight welding"}</Link>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container about-layout">
          <div className="section-head about-title">
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2>{t.aboutTitle}</h2>
          </div>
          <figure className="about-media">
            <img className="about-media-main" src="/photos/feedthrough-044.webp" alt={loc === "zh" ? "超高真空法兰组件安装" : "Ultra-high-vacuum feedthrough installation"} width={1600} height={900} loading="lazy" />
            <div className="about-media-row">
              <img src="/photos/workshop-063.webp" alt={loc === "zh" ? "车间焊接工位" : "Welding station in the workshop"} width={1600} height={1067} loading="lazy" />
              <img src="/photos/workshop-058.webp" alt={loc === "zh" ? "车间内的构件与设备" : "Components and equipment in the workshop"} width={1600} height={1067} loading="lazy" />
            </div>
          </figure>
          <div className="about-copy">
            <dl className="about-facts">
              {t.info.map((i) => (
                <div key={i.k}><dt>{i.k}</dt><dd>{i.v}</dd></div>
              ))}
            </dl>
            <div className="about-team" id="team">
              {t.team.map((m) => (
                <div className="about-team-item" key={m.t}>
                  <span>{m.t}</span>
                  <p>{m.x}</p>
                </div>
              ))}
            </div>
            <p className="about-operator">
              {loc === "zh"
                ? "本站及线上业务由苏州领拓互联科技有限公司负责建设、维护与运营。"
                : `This website and our online business are built, maintained and operated by ${OPERATOR_EN}`}{" "}
              <Link href={`/${loc}/privacy/`}>{loc === "zh" ? "隐私政策" : "Privacy policy"}</Link>
              {" · "}
              <Link href={`/${loc}/terms/`}>{loc === "zh" ? "使用条款" : "Terms of use"}</Link>
            </p>
            <Link href={t.rfq} className="text-link">{t.cta} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="section alt" id="quality">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.qualityEyebrow}</p>
            <h2>{t.qualityTitle}</h2>
            <p className="sub">{t.qualityText}</p>
          </div>
          <div className="gates">
            {gates[loc].map((g, i) => (
              <span className="gate" key={g}><b>{i + 1}</b>{g}</span>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link href={`/${loc}/blog/vacuum-chamber-7-inspection-gates/`} className="text-link">{t.qualityCta} →</Link>
          </p>
        </div>
      </section>

      <section className="section alt" id="industries">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.indEyebrow}</p>
            <h2>{t.indTitle}</h2>
          </div>
          <div className="grid">
            {t.ind.map((c) => (
              <div className="card" key={c.t}>
                <div className="card-body"><h3>{c.t}</h3><p>{c.x}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.procEyebrow}</p>
            <h2>{t.procTitle}</h2>
          </div>
          <div className="steps">
            {t.steps.map((s, i) => (
              <div className="step" key={s.t}>
                <p className="step-n">{i + 1}</p>
                <h3>{s.t}</h3>
                <p>{s.x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="case-studies">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.caseEyebrow}</p>
            <h2>{t.caseTitle}</h2>
            <p className="sub">{t.caseSub}</p>
          </div>
          <div className="grid">
            {t.cases.map((c) => (
              <div className="card" key={c.t}>
                <div className="card-img"><img src={c.img} alt={c.t} width={720} height={480} loading="lazy" /></div>
                <div className="card-body">
                  <p className="case-tag">{c.tag}</p>
                  <h3>{c.t}</h3>
                  <p>{c.x}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link href={`/${loc}/case-studies/`} className="text-link">{t.caseCta} →</Link>
          </p>
        </div>
      </section>

      <section className="section partners" id="partners">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.partnersEyebrow}</p>
            <h2>{t.partnersTitle}</h2>
            <p className="sub">{t.partnersSub}</p>
          </div>
          <PartnerGrid locale={loc} />
        </div>
      </section>

      <section className="section alt" id="news">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.newsEyebrow}</p>
            <h2>{t.newsTitle}</h2>
          </div>
          <div className="news-grid">
            {news.map((a) => (
              <article className="news-card" key={a.slug}>
                <div className="card-img"><img src={a.cover} alt={loc === "zh" ? a.zh.title : a.en.title} width={640} height={360} loading="lazy" /></div>
                <div className="news-body">
                  <p className="news-date">{a.date}</p>
                  <h3><Link href={`/${loc}/blog/${a.slug}/`}>{loc === "zh" ? a.zh.title : a.en.title}</Link></h3>
                  <p>{loc === "zh" ? a.zh.intro : a.en.intro}</p>
                </div>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link href={`/${loc}/blog/`} className="text-link">{t.newsCta} →</Link>
          </p>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.faqEyebrow}</p>
            <h2>{t.faqTitle}</h2>
          </div>
          <div className="faq">
            {t.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>{t.bandH}</h2>
          <p className="sub">{t.bandSub}</p>
          <p>
            <Link href={t.rfq} className="cta">{t.cta}</Link>
            <a href="mailto:zhouyou@panovacuum.com" className="cta secondary">{loc === "zh" ? "通过邮件提交图纸" : "Submit a drawing by email"}</a>
          </p>
          <p className="cta-band-link">
            <Link href={`/${loc}/industrial-partnerships/`}>
              {loc === "zh" ? "寻求采购、渠道或产业协同合作 →" : "Sourcing, channels or industrial collaboration? Explore partnerships →"}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
