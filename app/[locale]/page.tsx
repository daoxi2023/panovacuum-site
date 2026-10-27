import Link from "next/link";

const content = {
  en: {
    h1: "Custom Vacuum Chambers & Precision Manufacturing for Advanced Equipment",
    sub: "Engineering-focused manufacturing of custom vacuum chambers, precision-machined components and vacuum-tight assemblies — from drawing review to inspection and delivery.",
    cta: "Request a Quote",
    cta2: "Explore Capabilities",
    rfq: "/en/request-a-quote",
    caps: [
      { title: "Precision CNC Machining", text: "Precision CNC machining for vacuum-grade components." },
      { title: "Vacuum-Tight Welding", text: "Vacuum-tight welding, TIG and automated processes." },
      { title: "Surface Finishing & Cleaning", text: "Surface finishing in a controlled clean welding environment." },
      { title: "Helium Leak Testing & Inspection", text: "Helium leak testing, inspection and assembly support." },
    ],
    s2h: "Engineering-Focused from Drawing to Delivery",
    s2t: "We review every drawing before fabrication, and document our process across areas such as welding integrity, leak testing and dimensional checks — so your equipment team can rely on what we ship.",
    s2c: "Submit Your Drawing for a Quote",
    info: [
      { k: "Who we are", v: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd. — a dedicated vacuum chamber manufacturer in Changshu, Jiangsu, China." },
      { k: "What we do", v: "Custom vacuum chambers, precision-machined components and vacuum-tight assemblies, from drawing review to inspection and delivery." },
      { k: "Who we serve", v: "Semiconductor equipment, vacuum coating & process tools, and new-energy equipment makers worldwide." },
    ],
    facts: [
      { v: "30 kW", k: "Laser Cutting", d: "30,000 W laser — thick-plate blanking and weld bevel preparation in one pass." },
      { v: "400 t · 6.2 m", k: "Press Brake", d: "400-ton press brake with a 6.2 m bed for large-format forming." },
      { v: "H200", k: "Boring & Milling", d: "Floor-type boring-mill with 4 m-class rotation for flange bore accuracy." },
      { v: "40+", k: "Welding Stations", d: "40+ gas-shielded welding stations in a controlled clean welding environment." },
      { v: "50 t", k: "Overhead Crane", d: "50-ton crane for heavy chamber assembly, lifting and turnover." },
      { v: "≤1×10⁻⁹", k: "He Leak Rate", d: "UL1000-class helium leak testing — every chamber verified before shipment." },
    ],
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
  },
  zh: {
    h1: "面向先进装备的定制真空腔体与精密制造",
    sub: "从图纸评审到精密加工、密封焊接、检验及交付，为真空装备客户提供可追溯的制造支持。",
    cta: "提交图纸询价",
    cta2: "了解制造能力",
    rfq: "/zh/request-a-quote",
    caps: [
      { title: "精密 CNC 加工", text: "为真空级部件提供精密 CNC 加工。" },
      { title: "真空密封焊接", text: "TIG 与自动化工艺的真空密封焊接。" },
      { title: "表面处理与清洗", text: "在受控洁净焊接环境下完成表面处理。" },
      { title: "氦质谱检漏与检验", text: "氦质谱检漏、检验与装配支持。" },
    ],
    s2h: "以工程为本：从图纸到交付",
    s2t: "我们在制造前逐图评审，并在焊接完整性、检漏与尺寸检验等环节留存记录——让您的设备团队用得放心。",
    s2c: "提交图纸询价",
    info: [
      { k: "我们是谁", v: "帕诺真空机械科技（常熟）有限公司——位于江苏常熟、专注真空腔体制造的厂商。" },
      { k: "我们做什么", v: "定制真空腔体、精密加工件与真空密封组件，从图纸评审到检验交付一站式完成。" },
      { k: "我们服务谁", v: "全球半导体设备、真空镀膜/工艺装备与新能源装备制造商。" },
    ],
    facts: [
      { v: "3 万瓦", k: "激光切割", d: "3 万瓦激光——厚板下料与焊接坡口一次成形。" },
      { v: "400 吨 · 6.2 m", k: "折弯成形", d: "400 吨折弯机、6.2 m 工作长度，大型钣金一次成形。" },
      { v: "H200", k: "镗铣加工", d: "落地镗铣，4 m 级回转，法兰孔系精度可控。" },
      { v: "40+ 工位", k: "焊接产能", d: "40+ 气保焊机工位，受控洁净焊接环境。" },
      { v: "50 吨", k: "重型行车", d: "50 吨行车，支持数吨级腔体总装与翻转。" },
      { v: "≤1×10⁻⁹", k: "氦检漏率", d: "UL1000 级氦质谱检漏，每台出厂前逐台验证。" },
    ],
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
  },
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const t = content[loc];
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
          <h1>{t.h1}</h1>
          <p className="sub">{t.sub}</p>
          <p style={{ marginTop: 20 }}>
            <Link href={t.rfq} className="cta">{t.cta}</Link>
            <Link href="#capabilities" className="cta secondary">{t.cta2}</Link>
          </p>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="container">
          <h2>{locale === "zh" ? "制造能力" : "Manufacturing Capabilities"}</h2>
          <div className="grid">
            {t.caps.map((c) => (
              <div className="card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{locale === "zh" ? "基本信息" : "At a Glance"}</h2>
          <div className="grid">
            {t.info.map((i) => (
              <div className="card" key={i.k}>
                <h3>{i.k}</h3>
                <p>{i.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{locale === "zh" ? "能力与数据" : "Capability Facts"}</h2>
          <div className="grid">
            {t.facts.map((f) => (
              <div className="card fact" key={f.k}>
                <h3 className="fact-v">{f.v}</h3>
                <h4>{f.k}</h4>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{locale === "zh" ? "常见问题" : "FAQ"}</h2>
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

      <section className="section">
        <div className="container">
          <h2>{t.s2h}</h2>
          <p>{t.s2t}</p>
          <p>
            <Link href={t.rfq} className="cta">{t.s2c}</Link>
          </p>
        </div>
      </section>
    </>
  );
}