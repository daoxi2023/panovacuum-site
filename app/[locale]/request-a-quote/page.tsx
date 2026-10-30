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
      <p className="eyebrow">{zh ? "制造需求" : "Manufacturing enquiries"}</p>
      <h1>{zh ? "把制造需求交给帕诺" : "Tell us what you need to build"}</h1>
      <p className="sub">{zh ? "定制真空腔体、精密加工件或真空密封组件。先提交需求概述，收到询盘后 48 小时内实质回复；图纸与保密资料另行对接。" : "Custom vacuum chambers, precision-machined parts and vacuum-tight assemblies. Start with a project outline; drawings and confidential material can be exchanged separately."}</p>
    </div></section>
    <section className="growth-section"><div className="container growth-contact-layout">
      <div><h2>{zh ? "提交询价需求" : "Send your quote request"}</h2><p>{zh ? "标有 * 的项目必填。保存成功后会显示接收编号。" : "Fields marked * are required. A reference appears after your request has been saved."}</p><LeadForm kind="quote" locale={loc} /></div>
      <aside className="growth-sidebar">
        <h2>{zh ? "准备这些信息，更便于评审" : "What helps our review"}</h2>
        <ul><li>{zh ? "产品用途与主要尺寸" : "Application and main dimensions"}</li><li>{zh ? "材料、数量和目标交期" : "Material, quantity and target delivery"}</li><li>{zh ? "关键公差、密封或检测要求" : "Key tolerances, sealing or inspection requirements"}</li></ul>
        <p>{zh ? "没有正式图纸，也可以先描述需求。在线表单暂不收取附件；图纸可在后续沟通中通过邮箱交换。" : "You can start without a formal drawing. This form does not accept attachments; drawings can be exchanged by email during follow-up."}</p>
        <h2>{zh ? "直接联系" : "Direct contact"}</h2>
        <p>{zh ? "周游 · 商务与产业合作" : "Zhou You · Business & industrial partnerships"}<br /><a href="mailto:zhouyou@panovacuum.com">zhouyou@panovacuum.com</a><br /><a href="tel:+8613063722038">+86 130 6372 2038</a></p>
        <p>{zh ? "帕诺真空机械科技（常熟）有限公司" : "PANO Vacuum Machinery Technology (Changshu) Co., Ltd."}</p>
        <p>{zh ? "寻找采购、渠道或产业协同？" : "Discussing sourcing, channels or industrial collaboration?"}<br /><Link href={`/${loc}/industrial-partnerships/`}>{zh ? "前往产业合作" : "Explore industrial partnerships"}</Link></p>
      </aside>
    </div></section>
  </div>;
}
