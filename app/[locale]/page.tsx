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
  },
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = content[locale === "zh" ? "zh" : "en"];
  return (
    <>
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