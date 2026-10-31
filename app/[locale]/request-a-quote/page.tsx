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
      <h1>{zh ? "发张图纸，先问个价" : "Send a drawing, get a price"}</h1>
      <p className="sub">{zh ? "腔体、精密件、真空密封组件都行。先写个大概，48 小时内回你；图纸和保密资料另走。" : "Chambers, precision parts or vacuum-tight assemblies. Describe the job first; we answer within 48 hours. Drawings and anything confidential can go by email separately."}</p>
    </div></section>
    <section className="growth-section"><div className="container growth-contact-layout">
      <div><h2>{zh ? "写一下需求" : "Tell us what you need"}</h2><p>{zh ? "带 * 的必填。提交成功会给你一个编号，后面跟进用这个号。" : "Fields marked * are required. You get a reference number after submitting; quote it when we follow up."}</p><LeadForm kind="quote" locale={loc} /></div>
      <aside className="growth-sidebar">
        <h2>{zh ? "这些信息给到，报价更快" : "What gets you a faster quote"}</h2>
        <ul><li>{zh ? "用在哪、大概多大" : "Where it goes, roughly how big"}</li><li>{zh ? "材料、数量、想什么时候要" : "Material, quantity, when you need it"}</li><li>{zh ? "公差、密封、检测有什么要求" : "Tolerance, sealing or inspection requirements"}</li></ul>
        <p>{zh ? "没有正式图纸也能先聊。表单不收附件，图纸回头邮件发就行。" : "No formal drawing needed to start. This form takes no attachments; email the drawing when we follow up."}</p>
        <h2>{zh ? "直接联系" : "Reach us directly"}</h2>
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
        <p>{zh ? "寻找采购、渠道或产业协同？" : "Sourcing, channels or industrial collaboration?"}<br /><Link href={`/${loc}/industrial-partnerships/`}>{zh ? "前往产业合作" : "Explore industrial partnerships"}</Link></p>
      </aside>
    </div></section>
  </div>;
}
