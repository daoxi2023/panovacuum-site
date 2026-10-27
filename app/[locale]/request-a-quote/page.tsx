import { SeoLinks } from "../../components/seo-links";

const content = {
  en: {
    eyebrow: "Request a Quote",
    h1: "Request a Quote",
    sub: "Tell us about your vacuum chamber or fabricated component — include drawing files when available. We respond to every serious RFQ.",
    contact: "Name / Company",
    email: "Email",
    desc: "Project description",
    placeholder: "Material, dimensions, quantity, target timeline, operating pressure (if any)…",
    note: "Drawing upload and secure transmission are wired in the next build stage. You can also email your drawing directly.",
    submit: "Submit (coming soon)",
    ct: "Direct contact",
    who: "Zhou You (周游)",
    role: "Global Financing & Strategic Partnerships · Global Online Sales",
    brand: "PANO New Energy 帕诺新能源",
    cn: "China +86 130 6372 2038",
    us: "US +1 307 533 3212",
    em: "zhouyou@panovacuum.com",
    co: "PANO Vacuum Machinery Technology (Changshu) / PANO (Changshu) New Energy Technology",
    ad: "No. 88 Chaoyang Road, Changfu Sub-district, Changshu, Suzhou 215500, China",
    web: "www.panovacuum.com",
  },
  zh: {
    eyebrow: "提交询价",
    h1: "提交图纸询价",
    sub: "告诉我们您的真空腔体或加工件需求，如有图纸请一并提供。收到询盘后 48 小时内实质回复。",
    contact: "姓名 / 公司",
    email: "邮箱",
    desc: "项目说明",
    placeholder: "材料、尺寸、数量、目标交期、工作压力（如有）…",
    note: "图纸在线传输将在下一构建阶段接通；现在也可以直接把图纸发到邮箱。",
    submit: "提交（即将上线）",
    ct: "直接联系",
    who: "周游（Zhou You）",
    role: "全球融资与战略合作 · 全球网络销售",
    brand: "帕诺新能源 PANO NEW ENERGY",
    cn: "中国 +86 130 6372 2038",
    us: "美国 +1 307 533 3212",
    em: "zhouyou@panovacuum.com",
    co: "帕诺真空机械科技（常熟）有限公司 · 帕诺（常熟）新能源科技有限公司",
    ad: "江苏省苏州市常熟常福街道朝阳路 88 号，邮编 215500",
    web: "www.panovacuum.com",
  },
};

export default async function RequestQuote({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = content[locale === "zh" ? "zh" : "en"];
  return (
    <>
      <SeoLinks path="request-a-quote" locale={locale} />
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p className="sub">{t.sub}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <form style={{ maxWidth: 640 }}>
            <label>{t.contact}</label>
            <input className="field" name="contact" required />
            <label>{t.email}</label>
            <input className="field" type="email" name="email" required />
            <label>{t.desc}</label>
            <textarea className="field" name="description" placeholder={t.placeholder} />
            <p className="form-note">{t.note}</p>
            <button className="cta" type="submit" disabled>{t.submit}</button>
          </form>
          <div style={{ marginTop: 44, padding: "22px 26px", border: "1px solid var(--pano-line)", borderRadius: 10, maxWidth: 640, background: "var(--pano-bg-alt)" }}>
            <h2 style={{ marginTop: 0 }}>{t.ct}</h2>
            <p style={{ margin: "4px 0" }}><strong>{t.who}</strong> — {t.role}</p>
            <p style={{ margin: "4px 0" }}>{t.brand}</p>
            <p style={{ margin: "4px 0" }}>{t.cn} · {t.us}</p>
            <p style={{ margin: "4px 0" }}><a href={`mailto:${t.em}`}>{t.em}</a></p>
            <p style={{ margin: "4px 0" }}>{t.co}</p>
            <p style={{ margin: "4px 0" }}>{t.ad} · <a href="https://www.panovacuum.com">{t.web}</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
