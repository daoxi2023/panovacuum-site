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
      <h1>{zh ? "提交图纸，获取报价" : "Send a drawing, get a price"}</h1>
      <p className="sub">{zh ? "可提交真空腔体、精密零件或真空密封组件需求。请先概述项目，我方在 48 小时内答复；图纸及保密资料可另行提交。" : "Chambers, precision parts or vacuum-tight assemblies. Describe the job first; we answer within 48 hours. Drawings and anything confidential can go by email separately."}</p>
    </div></section>
    <section className="growth-section"><div className="container growth-contact-layout">
      <div><h2>{zh ? "填写需求信息" : "Tell us what you need"}</h2><p>{zh ? "带 * 为必填项。提交成功后将生成受理编号，后续沟通请引用该编号。" : "Fields marked * are required. You get a reference number after submitting; quote it when we follow up."}</p><LeadForm kind="quote" locale={loc} /></div>
      <aside className="growth-sidebar">
        <h2>{zh ? "提供以下信息可加快报价" : "What gets you a faster quote"}</h2>
        <ul><li>{zh ? "使用场景与大致尺寸" : "Where it goes, roughly how big"}</li><li>{zh ? "材料、数量与期望交期" : "Material, quantity, when you need it"}</li><li>{zh ? "公差、密封及检测要求" : "Tolerance, sealing or inspection requirements"}</li></ul>
        <p>{zh ? "尚无正式图纸亦可先行沟通。表单不接收附件，图纸可通过邮件另行发送。" : "No formal drawing needed to start. This form takes no attachments; email the drawing when we follow up."}</p>
        <h2>{zh ? "联系方式" : "Reach us directly"}</h2>
        <p>{zh ? "周先生，负责商务与产业合作" : "Mr. Zhou, business and partnerships"}<br /><a href="mailto:zhouyou@panovacuum.com">zhouyou@panovacuum.com</a><br /><a href="tel:+8613063722038">+86 130 6372 2038</a></p>
        <img
          src="/wechat-qr.webp"
          alt={zh ? "周先生微信二维码" : "Mr. Zhou WeChat QR code"}
          width={132}
          height={132}
          loading="lazy"
          style={{ display: "block", margin: "10px 0 6px", background: "#fff", padding: 6, borderRadius: 8 }}
        />
        <p>{zh ? "微信扫码联系周先生" : "WeChat: scan for Mr. Zhou"}</p>
        <p>{zh ? "帕诺真空机械科技（常熟）有限公司" : "PANO Vacuum Machinery Technology (Changshu) Co., Ltd."}</p>
        <p>{zh ? "寻求采购、渠道或产业协同合作？" : "Sourcing, channels or industrial collaboration?"}<br /><Link href={`/${loc}/industrial-partnerships/`}>{zh ? "前往产业合作" : "Explore industrial partnerships"}</Link></p>
      </aside>
    </div></section>
  </div>;
}
