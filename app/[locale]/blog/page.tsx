export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const zh = locale === "zh";
  const T = zh
    ? {
        title: "从图纸到交付：真空腔体的 7 道检验",
        intro: "真空腔体不是"焊完就交付"——从图纸到出厂，我们设 7 道检验闸口，每台带记录，客户可追溯。",
        gates: [
          ["图纸评审与 DFM", "制造前逐图评审，可制造性、公差与泄漏路径风险先与客户对齐。"],
          ["来料检验", "按规格核对材料质保书与表面状态后放行入库。"],
          ["下料与坡口", "3 万瓦激光厚板切割，坡口同工序一次成形，装配间隙稳定。"],
          ["精密加工", "CNC 与 H200 落地镗铣（4 m 级回转），关键尺寸逐件记录。"],
          ["焊接", "40+ 气保焊工位，TIG 与自动化工艺，受控洁净焊接环境，焊缝记录随腔体留存。"],
          ["氦质谱检漏", "UL1000 级、1×10⁻⁹ Pa·m³/s 量级，逐台验证而非抽检。"],
          ["出厂检验与交付", "按图纸做尺寸与表面终检，检验报告随货交付。"],
        ],
        closing: "给设备团队的价值：可追溯、有记录、按图纸交付——不是口头承诺。发来图纸，同一套检验流程作用于您的腔体。",
        cta: "提交图纸询价",
        back: "返回首页",
      }
    : {
        title: "7 Inspection Gates: From Drawing to Vacuum Chamber Delivery",
        intro:
          "A vacuum chamber is not \"done when welded\" — we run 7 inspection gates from drawing to delivery, documented per unit, traceable for your equipment team.",
        gates: [
          ["Drawing review & DFM", "Every drawing is reviewed before fabrication; manufacturability, tolerances and leak-path risks are flagged and agreed."],
          ["Incoming material inspection", "Material certificates and surface condition are checked against the specification before stock release."],
          ["Blanking & bevel preparation", "Thick-plate cutting on a 30,000 W laser; weld bevels prepared in the same pass for consistent fit-up."],
          ["Precision machining", "CNC and H200 floor-type boring-milling with 4 m-class rotation; key dimensions recorded per part."],
          ["Welding", "TIG and automated processes across 40+ gas-shielded stations in a controlled clean welding environment; weld records kept per chamber."],
          ["Helium leak testing", "UL1000-class mass-spectrometer leak test to the 1×10⁻⁹ Pa·m³/s order — every chamber verified, not sampled."],
          ["Final inspection & delivery", "Dimensional and surface checks against the drawing, with inspection reports shipped alongside the unit."],
        ],
        closing: "Why it matters: traceable, documented delivery — not promises. Send your drawing and see the same gates applied to your chamber.",
        cta: "Request a Quote",
        back: "Back to Home",
      };
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: T.title,
    author: { "@type": "Organization", name: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.", url: "https://panovacuum.com" },
    publisher: { "@type": "Organization", name: "PANO Vacuum", url: "https://panovacuum.com", logo: "https://panovacuum.com/logo.webp" },
    datePublished: "2026-10-27",
    inLanguage: zh ? "zh-CN" : "en",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <section className="hero">
        <div className="container">
          <h1>{T.title}</h1>
          <p className="sub">{T.intro}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ol style={{ paddingLeft: 20 }}>
            {T.gates.map(([h, d]) => (
              <li key={h} style={{ marginBottom: 14 }}>
                <strong>{h}</strong> — {d}
              </li>
            ))}
          </ol>
          <p>{T.closing}</p>
          <p style={{ marginTop: 20 }}>
            <a className="cta" href={`/${zh ? "zh" : "en"}/request-a-quote/`}>{T.cta}</a>
            <a className="cta secondary" href={`/${zh ? "zh" : "en"}/`}>{T.back}</a>
          </p>
        </div>
      </section>
    </>
  );
}