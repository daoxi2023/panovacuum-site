import Link from "next/link";
import { articles } from "../../lib/articles";

const gates: Record<"en" | "zh", string[]> = {
  en: ["Drawing review & DFM", "Incoming material", "Blanking & bevel", "Precision machining", "Welding", "He leak testing", "Final inspection & delivery"],
  zh: ["图纸评审与 DFM", "来料检验", "下料与坡口", "精密加工", "焊接", "氦质谱检漏", "出厂检验与交付"],
};

const content = {
  en: {
    eyebrow: "Vacuum Chamber Manufacturer",
    h1: "Vacuum Chambers, from Drawing to Delivery",
    sub: "A vacuum chamber manufacturer in Changshu, China. Drawing review, precision machining, welding, helium leak testing and inspection — done in one factory, per drawing, with records on every unit.",
    cta: "Request a Quote",
    cta2: "See Capabilities",
    rfq: "/en/request-a-quote",
    trust: "48-hour RFQ response · Full English process support · No minimum-order gate",
    statsEyebrow: "Factory at a Glance",
    statsTitle: "The equipment behind every quote",
    stats: [
      { v: "30 kW", k: "Laser Cutting", d: "Thick-plate blanking and weld bevels in one pass" },
      { v: "400 t · 6.2 m", k: "Press Brake", d: "Large-format forming in a single hit" },
      { v: "40+", k: "Welding Stations", d: "TIG and automated, in a controlled clean environment" },
      { v: "50 t", k: "Overhead Crane", d: "Heavy chamber assembly and turnover" },
      { v: "≤1×10⁻⁹", k: "He Leak Rate", d: "UL1000-class, verified per chamber" },
    ],
    capsEyebrow: "Capabilities",
    capsTitle: "Four processes, one factory",
    capsSub: "Every capability listed here comes from equipment on our shop floor — no rented showrooms.",
    caps: [
      { t: "Precision CNC Machining", x: "Vacuum-grade parts; key dimensions recorded per part." },
      { t: "Vacuum-Tight Welding", x: "TIG and automated across 40+ stations in a controlled clean welding environment." },
      { t: "Surface Finishing & Cleaning", x: "Done in a controlled clean welding environment; inspection records available." },
      { t: "Helium Leak Testing & Assembly", x: "UL1000-class, to the 1×10⁻⁹ Pa·m³/s order, verified per chamber; assembly and turnover supported." },
    ],
    qualityEyebrow: "Quality Control",
    qualityTitle: "7 inspection gates before a chamber ships",
    qualityText: "Drawing review, incoming material, blanking, machining, welding, helium leak testing, final inspection — every chamber passes all 7, with records kept per unit and shipped alongside it.",
    qualityCta: "Read the full process",
    info: [
      { k: "Who we are", v: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd. — a dedicated vacuum chamber manufacturer in Changshu, Jiangsu, China." },
      { k: "What we do", v: "Custom vacuum chambers, precision-machined components and vacuum-tight assemblies — from drawing review to inspection and delivery, under one roof." },
      { k: "Who we serve", v: "Semiconductor equipment, vacuum coating & process tools, and new-energy equipment makers worldwide." },
    ],
    aboutEyebrow: "About Us",
    aboutTitle: "A real factory, a single shop floor",
    indEyebrow: "Who We Serve",
    indTitle: "Built for equipment makers",
    ind: [
      { t: "Semiconductor Equipment", x: "Chambers, flanges and precision parts for process tools." },
      { t: "Vacuum Coating & Process Tools", x: "Chamber bodies and components for coating and PVD systems." },
      { t: "New-Energy Equipment", x: "Heavy fabrications for battery and PV process lines." },
    ],
    procEyebrow: "How to Work With Us",
    procTitle: "From one drawing to a quoted, inspected delivery",
    steps: [
      { t: "Send your drawing", x: "PDF / DWG / STEP — no formal drawing yet? A photo with rough dimensions is enough to start." },
      { t: "Review & DFM", x: "Manufacturability, tolerances and leak-path risks agreed before any quote." },
      { t: "Quote with schedule", x: "A substantive reply within 48 hours, with a milestone schedule we commit to." },
      { t: "Build, test, deliver", x: "7 inspection gates, records per unit, inspection report shipped with the chamber." },
    ],
    newsEyebrow: "News",
    newsTitle: "Notes from the shop floor",
    newsCta: "All articles",
    faqEyebrow: "FAQ",
    faqTitle: "Questions equipment teams ask us",
    faq: [
      { q: "How large a chamber can you build?", a: "Multi-ton class. Dimensions follow your drawing; a 50-ton crane supports full assembly and turnover, so large chambers ship without sectioning." },
      { q: "What materials do you use?", a: "304L / SUS316L stainless steel as standard. Grades and surface finish follow your drawing and specification." },
      { q: "What is your leak-test capability?", a: "Helium mass-spectrometer leak testing to the 1×10⁻⁹ Pa·m³/s order (UL1000-class), verified per chamber before shipment." },
      { q: "What is your lead time?", a: "Depends on drawing complexity. The quotation includes a milestone schedule that we commit to." },
      { q: "What certifications do you hold?", a: "Certification is in progress (SEMI-related standards and AWS welding systems); audits per customer requirements are welcome — details from sales." },
      { q: "How do I start?", a: "Send your drawing (PDF / DWG / STEP). We perform drawing review, DFM suggestions and quotation; 3D and engineering drawings are welcome." },
      { q: "Is there a minimum order?", a: "Single-piece custom work is accepted — no minimum-order gate, quoted per project." },
      { q: "What warranty do you offer?", a: "Contractual warranty terms apply; every unit ships with its inspection records." },
      { q: "How do overseas customers work with you?", a: "Full English process support — contact zhouyou@panovacuum.com or +1 307 533 3212; export packing and documentation supported." },
      { q: "What are the payment terms?", a: "Per contract (e.g., 30/70 or agreed LC terms), flexible for industrial customers." },
    ],
    bandH: "Send a drawing — get a substantive reply within 48 hours.",
    bandSub: "English process support end to end. Direct line: +86 130 6372 2038 · zhouyou@panovacuum.com",
  },
  zh: {
    eyebrow: "真空腔体制造厂",
    h1: "真空腔体，从图纸做到交付",
    sub: "常熟的真空腔体制造厂。图纸评审、精密加工、焊接、氦检、检验交付，一个厂里做完——按图施工，每台带记录。",
    cta: "提交图纸询价",
    cta2: "看制造能力",
    rfq: "/zh/request-a-quote",
    trust: "48 小时询价回复 · 英语全流程支持 · 单件定制无起订门槛",
    statsEyebrow: "工厂实况",
    statsTitle: "报价背后的设备",
    stats: [
      { v: "3 万瓦", k: "激光切割", d: "厚板下料与焊接坡口一次成形" },
      { v: "400 吨 · 6.2 m", k: "折弯成形", d: "大型钣金一次成形" },
      { v: "40+", k: "焊接工位", d: "TIG 与自动化，受控洁净环境" },
      { v: "50 吨", k: "重型行车", d: "腔体总装与翻转" },
      { v: "≤1×10⁻⁹", k: "氦检漏率", d: "UL1000 级，逐台验证" },
    ],
    capsEyebrow: "制造能力",
    capsTitle: "四个工序，一个厂",
    capsSub: "这页写的每一条能力，都来自车间里实际在用的设备。",
    caps: [
      { t: "精密 CNC 加工", x: "真空级部件，关键尺寸逐件记录。" },
      { t: "真空密封焊接", x: "TIG 与自动化工艺，40+ 工位，受控洁净焊接环境。" },
      { t: "表面处理与清洗", x: "受控洁净焊接环境下完成，可提供检测记录。" },
      { t: "氦质谱检漏与装配", x: "UL1000 级、1×10⁻⁹ Pa·m³/s 量级逐台验证；支持总装与翻转。" },
    ],
    qualityEyebrow: "质量检验",
    qualityTitle: "腔体出厂前，过 7 道检验",
    qualityText: "图纸评审、来料检验、下料、加工、焊接、氦质谱检漏、出厂检验——每台腔体走完全部 7 道，逐台留记录，检验报告随货交付。",
    qualityCta: "看完整流程",
    info: [
      { k: "我们是谁", v: "帕诺真空机械科技（常熟）有限公司——专注真空腔体制造的厂家，厂在江苏常熟。" },
      { k: "我们做什么", v: "定制真空腔体、精密加工件与真空密封组件：图纸评审、加工、焊接、检漏、检验、交付，一个厂里完成。" },
      { k: "我们服务谁", v: "半导体设备、真空镀膜与工艺装备、新能源装备厂商。出口支持英语全流程。" },
    ],
    aboutEyebrow: "关于我们",
    aboutTitle: "真实工厂，一个车间",
    indEyebrow: "应用领域",
    indTitle: "为设备厂商而生",
    ind: [
      { t: "半导体设备", x: "腔体、法兰与精密件，用于工艺装备。" },
      { t: "真空镀膜与工艺装备", x: "镀膜与 PVD 系统的腔体与部件。" },
      { t: "新能源装备", x: "电池与光伏产线的重型焊接件。" },
    ],
    procEyebrow: "合作流程",
    procTitle: "一张图纸，到交付",
    steps: [
      { t: "发来图纸", x: "PDF / DWG / STEP 都行；没有正式图纸？照片加大概尺寸也能先聊。" },
      { t: "评审与 DFM", x: "可制造性、公差与泄漏路径风险，报价前先对齐。" },
      { t: "报价带节点", x: "48 小时内实质回复，交期节点锁进合同。" },
      { t: "制造·检验·交付", x: "7 道检验，逐台记录，检验报告随货。" },
    ],
    newsEyebrow: "新闻资讯",
    newsTitle: "车间里的真实笔记",
    newsCta: "全部文章",
    faqEyebrow: "常见问题",
    faqTitle: "设备团队常问的十个问题",
    faq: [
      { q: "能做多大的腔体？", a: "数吨级。尺寸按图纸定制，50 吨行车支持整体总装与翻转，大型腔体无需分段。" },
      { q: "用什么材料？", a: "以 304L/SUS316L 不锈钢为主，牌号与表面处理按图纸指定。" },
      { q: "检漏能力怎么样？", a: "氦质谱检漏 1×10⁻⁹ Pa·m³/s 量级（UL1000 级），出厂逐台验收。" },
      { q: "交期多久？", a: "视图纸复杂度而定，报价时给出节点计划并锁定。" },
      { q: "有什么认证？", a: "体系认证推进中（SEMI 相关标准、AWS 焊接体系），可配合客户审核；进度详询销售。" },
      { q: "怎么开始合作？", a: "发图纸（PDF/DWG/STEP）即可，我们做图纸评审、DFM 建议与报价，支持 3D/工程图。" },
      { q: "最小起订量？", a: "单件定制即可，无起订量门槛，按项目评估报价。" },
      { q: "质保怎么算？", a: "按合同质保条款执行，每台随货带检测记录。" },
      { q: "海外客户怎么合作？", a: "支持英语全流程沟通（zhouyou@panovacuum.com / +1 307 533 3212），出口包装与文件齐备。" },
      { q: "付款方式？", a: "按合同约定（如 30/70 或信用证协商），面向工业客户灵活处理。" },
    ],
    bandH: "发来图纸，48 小时内得到实质回复",
    bandSub: "全程英语支持。直连：+86 130 6372 2038 · zhouyou@panovacuum.com",
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="hero">
        <div className="container">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p className="sub">{t.sub}</p>
          <p style={{ marginTop: 26 }}>
            <Link href={t.rfq} className="cta">{t.cta}</Link>
            <Link href={`/${loc}/#capabilities`} className="cta secondary">{t.cta2}</Link>
          </p>
          <p className="trust">{t.trust}</p>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <p className="eyebrow">{t.statsEyebrow}</p>
          <h2>{t.statsTitle}</h2>
          <div className="stats-grid">
            {t.stats.map((s) => (
              <div className="stat" key={s.k}>
                <p className="stat-v">{s.v}</p>
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
                <div className="card-img"><span>{loc === "zh" ? "实拍图 · 待素材" : "PHOTO · PENDING"}</span></div>
                <div className="card-body"><h3>{c.t}</h3><p>{c.x}</p></div>
              </div>
            ))}
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

      <section className="section" id="about">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2>{t.aboutTitle}</h2>
          </div>
          <div className="grid">
            {t.info.map((i) => (
              <div className="card" key={i.k}>
                <div className="card-body"><h3>{i.k}</h3><p>{i.v}</p></div>
              </div>
            ))}
          </div>
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

      <section className="section alt" id="news">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t.newsEyebrow}</p>
            <h2>{t.newsTitle}</h2>
          </div>
          <div className="news-grid">
            {news.map((a) => (
              <article className="news-card" key={a.slug}>
                <div className="card-img" aria-hidden="true"><span>PANO</span></div>
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
            <a href={`mailto:zhouyou@panovacuum.com`} className="cta secondary">zhouyou@panovacuum.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
