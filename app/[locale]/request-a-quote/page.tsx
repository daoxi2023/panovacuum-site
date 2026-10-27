const content = {
  en: {
    h1: "Request a Quote",
    sub: "Tell us about your vacuum chamber or fabricated component — include drawing files when available. We respond to every serious RFQ.",
    contact: "Name / Company",
    email: "Email",
    desc: "Project description",
    placeholder: "Material, dimensions, quantity, target timeline, operating pressure (if any)…",
    note: "Drawing upload and secure transmission are wired in the next build stage. This is the Phase 1 skeleton.",
    submit: "Submit (coming soon)",
  },
  zh: {
    h1: "提交图纸询价",
    sub: "告诉我们您的真空腔体或加工件需求，如有图纸请一并提供。收到询盘后将尽快实质回复。",
    contact: "姓名 / 公司",
    email: "邮箱",
    desc: "项目说明",
    placeholder: "材料、尺寸、数量、目标交期、工作压力（如有）…",
    note: "图纸上传与安全传输将在下一构建阶段接通。当前为 Phase 1 骨架。",
    submit: "提交（即将上线）",
  },
};

export default async function RequestQuote({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = content[locale === "zh" ? "zh" : "en"];
  return (
    <section className="hero">
      <div className="container">
        <h1>{t.h1}</h1>
        <p className="sub">{t.sub}</p>
        <form style={{ maxWidth: 620 }}>
          <label>{t.contact}</label>
          <input className="field" name="contact" required />
          <label>{t.email}</label>
          <input className="field" type="email" name="email" required />
          <label>{t.desc}</label>
          <textarea className="field" name="description" placeholder={t.placeholder} />
          <p className="form-note">{t.note}</p>
          <button className="cta" type="submit" disabled>{t.submit}</button>
        </form>
      </div>
    </section>
  );
}