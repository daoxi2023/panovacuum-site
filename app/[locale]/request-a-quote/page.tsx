import type { Metadata } from "next";
import Link from "next/link";
import { SeoLinks } from "../../components/seo-links";
import { LeadForm } from "../../components/lead-form";
import "../../growth.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "zh" ? { title: "提交询价需求 | 帕诺真空", description: "向帕诺提交定制真空腔体、精密加工零件或密封焊接组件需求，获得接收编号并由商务团队跟进。" } : { title: "Request a Quote | PANO Vacuum", description: "Send a custom vacuum chamber, precision-machined part or welded assembly requirement to PANO and receive an enquiry reference." };
}

export default async function RequestQuote({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const zh = loc === "zh";
  return <div className="growth-page">
    <SeoLinks path="request-a-quote" locale={loc} />
    <section className="growth-heading"><div className="container">
      <p className="eyebrow">{zh ? "询价" : "Quote request"}</p>
      <h1>{zh ? "先描述需求，再邮件发图" : "Describe your project, then email your drawings"}</h1>
      <p className="sub">{zh ? "第一步：填写下方需求信息，提交成功后取得受理编号。第二步：通过回执中的邮件按钮，附上该编号另发图纸。我方在 48 小时内初步答复；资料完整并完成图纸评审后提供报价。保密资料的交换范围另行约定。" : "Step 1: describe your requirements below and receive an enquiry reference. Step 2: use the email button on your receipt to send drawings with that reference. We provide an initial response within 48 hours; a quotation follows once the required information is complete and drawing review is finished. Confidential materials are exchanged by separate arrangement."}</p>
    </div></section>
    <section className="growth-section"><div className="container growth-contact-layout">
      <div><h2>{zh ? "填写需求信息" : "Project information"}</h2><p>{zh ? "带 * 为必填项。提交成功后将生成受理编号，后续沟通请引用该编号。" : "Fields marked * are required. A reference number is issued on submission; please quote it in subsequent correspondence."}</p><LeadForm kind="quote" locale={loc} /></div>
      <aside className="growth-sidebar">
        <h2>{zh ? "提供以下信息可加快报价" : "Information that expedites quotation"}</h2>
        <ul><li>{zh ? "使用场景与大致尺寸" : "Intended application and approximate dimensions"}</li><li>{zh ? "材料、数量与期望交期" : "Material, quantity and required delivery date"}</li><li>{zh ? "公差、密封及检测要求" : "Tolerance, sealing and inspection requirements"}</li></ul>
        <p>{zh ? "尚无正式图纸亦可先行沟通。表单不接收附件；提交后可通过回执中的邮件按钮另发图纸，邮件主题会带上受理编号。请按双方约定的范围交换保密资料。" : "A formal drawing is not required at this stage. This form does not accept attachments. After submission, use the receipt email button to send drawings; the subject includes your enquiry reference. Exchange confidential materials only within the agreed scope."}</p>
        <h2>{zh ? "联系方式" : "Direct contact"}</h2>
        <p>{zh ? "周先生，负责商务与产业合作" : "Mr. Zhou — sales and industrial partnerships"}<br /><a href="mailto:zhouyou@panovacuum.com">zhouyou@panovacuum.com</a><br /><a href="tel:+8613063722038">+86 130 6372 2038</a></p>
        <img
          src="/pano-vacuum-wechat-qr-zhouyou-480w.webp"
          alt={zh ? "周先生微信二维码" : "Mr. Zhou WeChat QR code"}
          width={132}
          height={132}
          loading="lazy"
          style={{ display: "block", margin: "10px 0 6px", background: "#fff", padding: 6, borderRadius: 8 }}
        />
        <p>{zh ? "微信扫码联系周先生" : "WeChat: scan to contact Mr. Zhou"}</p>
        <p>{zh ? "帕诺真空机械科技（常熟）有限公司" : "PANO Vacuum Machinery Technology (Changshu) Co., Ltd."}</p>
        <p>{zh ? "寻求采购、渠道或产业协同合作？" : "For sourcing, channel or industrial collaboration enquiries"}<br /><Link href={`/${loc}/industrial-partnerships/`}>{zh ? "前往产业合作" : "Industrial partnerships"}</Link></p>
      </aside>
    </div></section>
  </div>;
}
