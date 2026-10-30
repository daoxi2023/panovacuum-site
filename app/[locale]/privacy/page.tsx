import type { Metadata } from "next";
import { SeoLinks } from "../../components/seo-links";
import "../../growth.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "zh" ? "咨询信息与隐私说明 | 帕诺真空" : "Enquiry Privacy Notice | PANO Vacuum" };
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const zh = loc === "zh";
  const sections = zh ? [
    ["谁处理您的咨询", "帕诺真空机械科技（常熟）有限公司使用您提交的信息，评审制造需求或产业合作意向，并通过您提供的商务联系方式跟进。联系邮箱：zhouyou@panovacuum.com。"],
    ["收集哪些信息", "表单收集公司或机构、联系人、商务邮箱，以及您填写的地区、产品需求、交期或合作资源概述。接收记录还包括表单类型、语言、提交时间、页面路径、接收编号，以及经过校验的来源标签（如来源渠道和活动名称）。防滥用功能使用经加盐处理的网络地址摘要进行限流，不把原始网络地址写入咨询记录。"],
    ["信息如何使用与保存", "咨询记录保存在帕诺专用的 Cloudflare 数据库，用于此次需求的评审、沟通和后续业务跟进。表单不会自动公开您的信息，也不会自动将您加入营销邮件名单。承接本次咨询的人员可在受保护的内部工具中读取记录。"],
    ["表单与网站统计", "网站使用访问统计和页面行为分析工具。咨询表单与成功回执设置了遮罩；姓名、邮箱、正文、资源说明和接收编号不会作为表单统计事件发送。表单统计事件仅包含咨询类别和语言，用于了解入口是否有效。"],
    ["请勿提交敏感资料", "本公开表单不提供文件上传。请勿填写保密图纸、客户名单、财务数据、身份证件或其他敏感信息。需要交换保密资料时，应另行确定范围、渠道与保密安排。"],
    ["查询、更正与删除", "如需查询、更正或删除您的咨询信息，请发邮件至 zhouyou@panovacuum.com，并尽可能提供接收编号。为避免向他人泄露信息，我们可能先核对您的身份或商务邮箱。记录按实际跟进需要保留；不再需要时应删除或去除可识别信息。"],
  ] : [
    ["Who handles your enquiry", "PANO Vacuum Machinery Technology (Changshu) Co., Ltd. uses the information you submit to review manufacturing requirements or industrial partnership enquiries and to follow up through your business contact details. Contact: zhouyou@panovacuum.com."],
    ["What we collect", "The form collects your company or organisation, contact name, business email and any region, product, timing or partnership information you choose to provide. The record also includes enquiry type, language, submission time, page path, reference and validated source tags such as channel and campaign names. Abuse protection uses a salted network-address digest for rate limiting; the raw network address is not written into the enquiry record."],
    ["How information is used and stored", "Enquiry records are stored in PANO's dedicated Cloudflare database for review, communication and related business follow-up. The form does not publish your information or automatically subscribe you to marketing emails. Personnel handling the enquiry can access records through a protected internal tool."],
    ["Forms and website analytics", "The website uses visitor analytics and page-behaviour tools. Forms and receipt messages are masked. Names, email addresses, message text, resource descriptions and references are not sent as form analytics events. Form events include only enquiry category and language to help us understand whether the enquiry route works."],
    ["Do not submit sensitive material", "This public form does not accept file uploads. Do not include confidential drawings, customer lists, financial data, identity documents or other sensitive information. The scope, channel and confidentiality arrangements for any sensitive exchange should be agreed separately."],
    ["Access, correction and deletion", "To request access, correction or deletion, email zhouyou@panovacuum.com and include your enquiry reference where possible. We may verify your identity or business email before disclosing information. Records are retained as needed for actual follow-up and should be deleted or de-identified when no longer needed."],
  ];
  return <div className="growth-page"><SeoLinks path="privacy" locale={loc} /><section className="growth-heading"><div className="container"><h1>{zh ? "咨询信息与隐私说明" : "Enquiry privacy notice"}</h1><p className="sub">{zh ? "提交前，请了解信息的用途及保密边界。" : "Understand how enquiry information is used before you submit."}</p></div></section><section className="growth-section"><div className="container privacy-copy">{sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}</div></section></div>;
}
