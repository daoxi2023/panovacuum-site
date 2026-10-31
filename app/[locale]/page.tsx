import Link from "next/link";
import "../home.css";
import { articles } from "../../lib/articles";
import { SeoLinks } from "../components/seo-links";
import "../growth.css";

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
      { t: "Precision CNC Machining", x: "Vacuum-grade parts; key dimensions recorded per part.", img: "/photos/cap-cmm.webp", alt: "ALPHA articulating-arm CMM inspecting a vacuum-grade part" },
      { t: "Vacuum-Tight Welding", x: "TIG and automated across 40+ stations in a controlled clean welding environment.", img: "/photos/cap-chamber.webp", alt: "Finished custom vacuum chamber, 304L stainless steel" },
      { t: "Surface Finishing & Cleaning", x: "Done in a controlled clean welding environment; inspection records available.", img: "/photos/cap-clean.webp", alt: "Controlled clean environment for surface finishing and inspection" },
      { t: "Helium Leak Testing & Assembly", x: "UL1000-class, to the 1×10⁻⁹ Pa·m³/s order, verified per chamber; assembly and turnover supported.", img: "/photos/cap-leak.webp", alt: "INFICON UL1000-class helium leak tester verifying a chamber" },
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
    teamEyebrow: "Team & Expertise",
    teamTitle: "In-house, hands-on, per drawing",
    teamSub: "Process engineers, welders, QC and sales — the people behind each gate, reachable directly.",
    team: [
      { t: "Process Engineering", x: "Drawing review, DFM, tolerance and leak-path analysis before anything is cut." },
      { t: "CNC & Machining", x: "Vacuum-grade parts on our own floor; key dimensions recorded per part." },
      { t: "Welding", x: "TIG and automated across 40+ stations in a controlled clean welding environment." },
      { t: "QC & Leak Testing", x: "7 inspection gates per chamber, records kept per unit and shipped with it." },
    ],
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
    caseEyebrow: "Case Examples",
    caseTitle: "What a typical chamber job looks like",
    caseSub: "Capability examples built from our equipment ledger — what we can make and how it is verified. Named customer case studies follow NDA-permitted disclosure.",
    caseCta: "See capability examples",
    cases: [
      { t: "Multi-ton 304L chamber", x: "304L stainless, single-piece multi-ton class: 30 kW laser blanking, 400 t / 6.2 m press-brake forming, helium leak test to the 1×10⁻⁹ Pa·m³/s order, assembly and turnover under the 50 t crane; inspection records shipped with the unit.", tag: "Heavy chamber", img: "/photos/cap-chamber.webp" },
      { t: "Vacuum-tight welding, verified per chamber", x: "TIG and automated welding across 40+ stations in a controlled clean welding environment, helium leak-tested per unit — not sampled.", tag: "Welding & leak test", img: "/photos/cap-leak.webp" },
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
    eyebrow: "真空腔体定制",
    h1: "按图纸，做真空腔体。",
    sub: "厂在常熟。下料、加工、焊接、检漏、检验都在本厂完成，每台腔体出厂前做氦质谱检漏，检验记录跟货一起发。",
    cta: "发图纸，问个价",
    cta2: "看看车间能干什么",
    rfq: "/zh/request-a-quote",
    trust: "图纸评审后 48 小时内回价 · 单件也做 · 可英文对接",
    statsEyebrow: "车间里的设备",
    statsTitle: "这些机器决定了我们能接什么活",
    stats: [
      { v: "3 万瓦", k: "激光切割", d: "厚板下料、切坡口，一次出来" },
      { v: "400 吨 · 6.2 m", k: "折弯成形", d: "大件钣金一次折到位" },
      { v: "40+", k: "焊接工位", d: "TIG 和自动焊，带洁净焊接区" },
      { v: "50 吨", k: "重型行车", d: "几吨重的腔体吊起来翻身" },
      { v: "≤1×10⁻⁹", k: "氦检漏率", d: "UL1000 级，每台都测，不抽检" },
    ],
    capsEyebrow: "能做的工序",
    capsTitle: "四道工序都在本厂",
    capsSub: "下面写的设备，车间里都在用。报价也是按这些设备能干的活来算。",
    caps: [
      { t: "精密 CNC 加工", x: "真空级零件，关键尺寸一件件量、一件件记。", img: "/photos/cap-cmm.webp", alt: "ALPHA 关节臂三坐标检测仪检测真空级零件" },
      { t: "真空密封焊接", x: "TIG 和自动焊，40 多个工位，焊接区单独隔开。", img: "/photos/cap-chamber.webp", alt: "定制真空腔体成品，304L 不锈钢" },
      { t: "表面处理与清洗", x: "在洁净焊接区里做，表面处理和清洗的记录可以给。", img: "/photos/cap-clean.webp", alt: "受控洁净环境下的表面处理与检测" },
      { t: "氦质谱检漏与装配", x: "UL1000 检漏仪，做到 1×10⁻⁹ Pa·m³/s 量级，每台测完再装车。", img: "/photos/cap-leak.webp", alt: "UL1000 氦质谱检漏仪验证腔体密封性" },
    ],
    qualityEyebrow: "怎么检",
    qualityTitle: "一台腔体出厂前，要过 7 道检查",
    qualityText: "图纸评审、来料、下料、加工、焊接、氦检、出厂，7 道每道签字留档，报告跟货一起走。",
    qualityCta: "7 道检查都查什么",
    info: [
      { k: "厂在哪", v: "江苏常熟。帕诺真空机械科技（常熟）有限公司，做定制真空腔体。" },
      { k: "做什么", v: "腔体、精密件、真空密封组件。图纸进来，加工、焊接、检漏、检验都在本厂，做完发走。" },
      { k: "给谁做", v: "半导体设备、镀膜和工艺装备、新能源装备的厂家。海外客户用英文对接。" },
    ],
    aboutEyebrow: "关于我们",
    aboutTitle: "一个车间，从下料到出厂",
    teamEyebrow: "车间里的人",
    teamTitle: "有事找对应的人，不用层层转",
    teamSub: "工艺、机加、焊接、质检各有负责人，报价前后都能直接对接。",
    team: [
      { t: "工艺工程", x: "下料前先把图纸过一遍：能不能做、公差怎么给、泄漏风险在哪。" },
      { t: "CNC 与精密加工", x: "真空级零件在本厂机床加工，关键尺寸逐件记录。" },
      { t: "焊接", x: "TIG 和自动焊，40 多个工位，洁净焊接区。" },
      { t: "质检与检漏", x: "7 道检查，每台留记录，报告随货。" },
    ],
    indEyebrow: "用在哪",
    indTitle: "这些腔体最后装在什么设备上",
    ind: [
      { t: "半导体设备", x: "工艺腔、传输腔、法兰和精密件。" },
      { t: "真空镀膜与工艺装备", x: "镀膜、PVD 设备的腔体和配套件。" },
      { t: "新能源装备", x: "电池、光伏产线上的重型焊接结构件。" },
    ],
    procEyebrow: "怎么合作",
    procTitle: "从发图纸到收货，四步",
    steps: [
      { t: "发来图纸", x: "PDF、DWG、STEP 都行。没有正式图纸，拍张照片加尺寸也能先聊。" },
      { t: "评审与 DFM", x: "先看能不能做、公差和泄漏风险在哪，再报价。" },
      { t: "报价带节点", x: "48 小时内给实质回复，交期写进合同。" },
      { t: "制造·检验·交付", x: "7 道检查走完，记录和货一起发。" },
    ],
    caseEyebrow: "做过的活",
    caseTitle: "举两个例子，看看我们怎么干",
    caseSub: "以下按设备台账整理，客户名按保密约定隐去。",
    caseCta: "看更多能力示例",
    cases: [
      { t: "数吨级 304L 真空腔体", x: "304L 不锈钢，单件几吨重。3 万瓦激光下料，400 吨折弯机成形，氦检做到 1×10⁻⁹ Pa·m³/s 量级，50 吨行车整体吊装翻身。报告随货。", tag: "重型腔体", img: "/photos/cap-chamber.webp" },
      { t: "真空密封焊接，逐台验证", x: "40 多个 TIG 和自动焊工位，洁净焊接区。每台都做氦检，不抽检。", tag: "焊接与检漏", img: "/photos/cap-leak.webp" },
    ],
    newsEyebrow: "车间笔记",
    newsTitle: "最近写的几篇",
    newsCta: "全部文章",
    faqEyebrow: "常问的问题",
    faqTitle: "客户问得最多的 10 个问题",
    faq: [
      { q: "能做多大的腔体？", a: "单件几吨重没问题。尺寸按图纸，50 吨行车能整体吊装、翻转，大腔体不用分段做。" },
      { q: "用什么材料？", a: "主要是 304L 和 SUS316L 不锈钢。牌号、表面处理按图纸来。" },
      { q: "检漏能力怎么样？", a: "氦质谱检漏做到 1×10⁻⁹ Pa·m³/s 量级，UL1000 级，每台出厂前都测。" },
      { q: "交期多久？", a: "看图纸复杂程度。报价时会给节点计划，写进合同。" },
      { q: "有什么认证？", a: "SEMI 相关标准、AWS 焊接体系的认证在推进，客户来厂审核也配合。具体进度问销售。" },
      { q: "怎么开始合作？", a: "把图纸发过来（PDF/DWG/STEP），我们做评审、给 DFM 建议和报价，3D 模型和工程图也能接。" },
      { q: "最小起订量？", a: "单件也做，没有起订量。" },
      { q: "质保怎么算？", a: "按合同质保条款，每台带检测记录。" },
      { q: "海外客户怎么合作？", a: "英文全程对接（zhouyou@panovacuum.com / +1 307 533 3212），出口包装和单证都能出。" },
      { q: "付款方式？", a: "按合同谈，30/70 或信用证都可以商量。" },
    ],
    bandH: "把图纸发过来，48 小时内给你实在的回复",
    bandSub: "英文也能对接。电话 +86 130 6372 2038 · zhouyou@panovacuum.com",
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
            <h1>{loc === "zh" ? <><span style={{ display: "block" }}>按图纸，做真空腔体。</span><span style={{ display: "block" }}>做一台，检一台。</span></> : t.h1}</h1>
            <p className="sub">{t.sub}</p>
            <div className="hero-actions">
              <Link href={t.rfq} className="cta">{t.cta}</Link>
              <Link href={`/${loc}/#capabilities`} className="cta secondary">{t.cta2}</Link>
            </div>
            <p className="trust">{t.trust}</p>
          </div>
          <figure className="hero-media">
            <img src="/photos/hero-chamber.webp" alt={loc === "zh" ? "帕诺制造的定制不锈钢真空腔体" : "Custom stainless steel vacuum chamber manufactured by PANO"} width={1200} height={893} fetchPriority="high" />
          </figure>
        </div>
      </section>

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
          <div className="growth-service-links" aria-label={loc === "zh" ? "按制造需求了解服务" : "Explore manufacturing services"}>
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
            <img src="/photos/cap-clean.webp" alt={loc === "zh" ? "帕诺工厂的受控洁净生产环境" : "Controlled clean production environment at the PANO factory"} width={720} height={480} loading="lazy" />
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
            <a href="mailto:zhouyou@panovacuum.com" className="cta secondary">{loc === "zh" ? "邮件发送图纸" : "Email your drawing"}</a>
          </p>
          <p className="cta-band-link">
            <Link href={`/${loc}/industrial-partnerships/`}>
              {loc === "zh" ? "寻找采购、渠道或产业协同？了解产业合作 →" : "Sourcing, channels or industrial collaboration? Explore partnerships →"}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
