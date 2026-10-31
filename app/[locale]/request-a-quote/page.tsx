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
      <p className="eyebrow">{zh ? "询价" : "Manufacturing enquiries"}</p>
      <h1>{zh ? "发张图纸，先问个价" : "Tell us what you need to build"}</h1>
      <p className="sub">{zh ? "腔体、精密件、真空密封组件都行。先写个大概，48 小时内回你；图纸和保密资料另走。" : "Custom vacuum chambers, precision-machined parts and vacuum-tight assemblies. Start with a project outline; drawings and confidential material can be exchanged separately."}</p>
    </div></section>
    <section className="growth-section"><div className="container growth-contact-layout">
      <div><h2>{zh ? "写一下需求" : "Send your quote request"}</h2><p>{zh ? "带 * 的必填。提交成功会给你一个编号，后面跟进用这个号。" : "Fields marked * are required. A reference appears after your request has been saved."}</p><LeadForm kind="quote" locale={loc} /></div>
      <aside className="growth-sidebar">
        <h2>{zh ? "这些信息给到，报价更快" : "What helps our review"}</h2>
        <ul><li>{zh ? "用在哪、大概多大" : "Application and main dimensions"}</li><li>{zh ? "材料、数量、想什么时候要" : "Material, quantity and target delivery"}</li><li>{zh ? "公差、密封、检测有什么要求" : "Key tolerances, sealing or inspection requirements"}</li></ul>
        <p>{zh ? "没有正式图纸也能先聊。表单不收附件，图纸回头邮件发就行。" : "You can start without a formal drawing. This form does not accept attachments; drawings can be exchanged by email during follow-up."}</p>
        <h2>{zh ? "直接联系" : "Direct contact"}</h2>
        <p>{zh ? "周游，管商务和产业合作" : "Zhou You · Business & industrial partnerships"}<br /><a href="mailto:zhouyou@panovacuum.com">zhouyou@panovacuum.com</a><br /><a href="tel:+8613063722038">+86 130 6372 2038</a></p>
        <img
          src="/wechat-qr.webp"
          alt={zh ? "周游微信二维码" : "Zhou You WeChat QR code"}
          width={132}
          height={132}
          loading="lazy"
          style={{ display: "block", margin: "10px 0 6px", background: "#fff", padding: 6, borderRadius: 8 }}
        />
        <p>{zh ? "微信扫码找周游" : "Scan to reach Zhou You on WeChat"}</p>
        <p>{zh ? "帕诺真空机械科技（常熟）有限公司" : "PANO Vacuum Machinery Technology (Changshu) Co., Ltd."}</p>
        <p>{zh ? "寻找采购、渠道或产业协同？" : "Discussing sourcing, channels or industrial collaboration?"}<br /><Link href={`/${loc}/industrial-partnerships/`}>{zh ? "前往产业合作" : "Explore industrial partnerships"}</Link></p>
      </aside>
    </div></section>
  </div>;
}
