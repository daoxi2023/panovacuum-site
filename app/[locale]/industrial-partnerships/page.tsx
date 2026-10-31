import type { Metadata } from "next";
import Link from "next/link";
import { SeoLinks } from "../../components/seo-links";
import { LeadForm } from "../../components/lead-form";
import "../../growth.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "zh" ? { title: "产业合作 | 帕诺真空", description: "与帕诺探讨真空腔体长期采购、产能配套、客户与供应链协同，以及带产业资源的战略合作。" } : { title: "Industrial Partnerships | PANO Vacuum", description: "Discuss long-term sourcing, manufacturing capacity, customer and supply-chain collaboration with PANO Vacuum." };
}

export default async function Partnerships({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const zh = loc === "zh";
  const directions = zh ? [
    ["长期采购与产能配套", "面向装备制造商，围绕真空腔体、精密件与密封组件，交流持续采购、交付计划与制造配套。"],
    ["客户与供应链协同", "与拥有相关客户、渠道或供应链资源的产业伙伴，探讨需求导入、技术配套及项目协作。"],
    ["带产业资源的战略合作", "围绕具体客户需求和制造协同交流合作。请介绍可带来的产业资源与合作设想，双方先行确认匹配度。"],
  ] : [
    ["Long-term sourcing and capacity support", "For equipment manufacturers: ongoing sourcing of vacuum chambers, precision components and sealed assemblies, with delivery plans and manufacturing support agreed per project."],
    ["Customer and supply-chain collaboration", "Demand introduction, technical support and joint project delivery with partners holding relevant customers, channels or supply-chain resources."],
    ["Strategic partnerships with industrial resources", "Collaboration is discussed on the basis of specific customer requirements and manufacturing coordination. Partners are invited to outline the industrial resources they can contribute so that both sides can assess the fit."],
  ];
  const steps = zh ? [["介绍需求与资源", "概述机构背景、合作方向和可协同资源。"], ["核对合作匹配度", "双方确认需求、制造配套与后续交流范围。"], ["安排具体交流", "围绕实际项目、采购或产业协同开展沟通。"], ["分级交换资料", "有实质合作意向后，在适当保密约定下交换相关资料。"]] : [["Introduction of needs and resources", "An outline of the organisation, partnership focus and available resources."], ["Assessment of fit", "Both sides confirm the needs, manufacturing support and scope of further discussion."], ["Project-level discussion", "Discussion of a specific project, sourcing requirement or industrial collaboration."], ["Staged exchange of materials", "Once substantive interest is established, relevant materials are exchanged under appropriate confidentiality arrangements."]];
  return <div className="growth-page">
    <SeoLinks path="industrial-partnerships" locale={loc} />
    <section className="growth-heading"><div className="container">
      <p className="eyebrow">{zh ? "产业合作" : "Industrial partnerships"}</p>
      <h1>{zh ? "对接客户需求与制造能力" : "Connect customer needs with manufacturing capability"}</h1>
      <p className="sub">{zh ? "帕诺与装备制造商、产业链企业及具备客户资源的伙伴，交流订单、供应链与产能合作。以具体项目和产业协同为起点。" : "PANO works with equipment makers, supply-chain businesses and partners with relevant customer resources to explore orders, sourcing and manufacturing capacity. Start with a concrete project and industrial collaboration."}</p>
      <div className="growth-actions"><a href="#partnership-enquiry" className="growth-button">{zh ? "提交合作意向" : "Submit a partnership enquiry"}</a><Link href={`/${loc}/company-profile/`} className="growth-button secondary">{zh ? "查看工厂能力介绍" : "View the factory overview"}</Link></div>
    </div></section>
    <section className="growth-section"><div className="container"><h2>{zh ? "可探讨的合作方向" : "Scope for partnership"}</h2><div className="partner-directions">{directions.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="growth-section partner-process"><div className="container"><h2>{zh ? "从初步介绍到具体合作" : "From initial introduction to project-level collaboration"}</h2><ol>{steps.map(([title, text]) => <li key={title}><strong>{title}</strong>{text}</li>)}</ol></div></section>
    <section className="growth-section" id="partnership-enquiry"><div className="container growth-contact-layout">
      <div><h2>{zh ? "介绍您的合作设想" : "Outline your partnership proposal"}</h2><p>{zh ? "请用非保密信息说明您的资源和合作方向。标有 * 的项目必填。" : "Use non-confidential information to describe your resources and partnership focus. Fields marked * are required."}</p><LeadForm kind="partnership" locale={loc} /></div>
      <aside className="growth-sidebar"><h2>{zh ? "先了解帕诺" : "Company background"}</h2><p>{zh ? "本公司专注定制真空腔体、精密加工件与真空密封组件，制造能力与能力示例可公开查阅。" : "The company specialises in custom vacuum chambers, precision-machined components and vacuum-tight assemblies. The manufacturing overview and capability examples are publicly available."}</p><ul><li><Link href={`/${loc}/company-profile/`}>{zh ? "工厂能力一页介绍" : "Factory overview"}</Link></li><li><Link href={`/${loc}/case-studies/`}>{zh ? "能力示例" : "Capability examples"}</Link></li><li><Link href={`/${loc}/#quality`}>{zh ? "质量检验流程" : "Quality inspection process"}</Link></li></ul><p>{zh ? "具体项目与保密资料在双方明确交流范围后单独对接。" : "Specific project details and confidential materials are handled separately once the scope of discussion is agreed."}</p><p><a href="mailto:zhouyou@panovacuum.com">zhouyou@panovacuum.com</a></p><p>{zh ? "需询价或咨询交期？" : "For quotation or delivery enquiries"}<br /><Link href={`/${loc}/request-a-quote/`}>{zh ? "提交制造需求" : "Send a manufacturing enquiry"}</Link></p></aside>
    </div></section>
  </div>;
}
