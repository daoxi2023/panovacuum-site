import type { Metadata } from "next";
import Link from "next/link";
import { SeoLinks } from "../../components/seo-links";
import "../../growth.css";
import { OPERATOR_EN, OPERATOR_ZH } from "@/lib/site-base";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "使用条款 | 帕诺真空" : "Terms of Use | PANO Vacuum",
    description:
      locale === "zh"
        ? "帕诺真空网站使用条款：网站性质、内容准确性、知识产权、禁止行为、责任范围与适用法律。"
        : "Terms of use for the PANO Vacuum website: what the site is for, accuracy of content, intellectual property, acceptable use, liability and governing law.",
  };
}

const EMAIL = "zhouyou@panovacuum.com";
const UPDATED = "2026-10-31";

export default async function Terms({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const zh = loc === "zh";

  const sections: (string | string[])[][] = zh
    ? [
        [
          "网站由谁提供",
          "本网站（panovacuum.cn 与 panovacuum.com）由苏州领拓互联科技有限公司负责建设、技术维护和线上业务运营。站内制造业务、产品与案例信息的主体是帕诺真空机械科技（常熟）有限公司。继续使用本站，即表示你已阅读并接受本条款。",
        ],
        [
          "本站的用途",
          "本站用于介绍帕诺的加工能力、设备条件、检验方式和已交付项目，并接收制造需求与产业合作咨询。页面上的设备参数、产能表述、材料牌号、交期与价格描述均为说明性信息，不构成要约、承诺或合同条款。具体的规格、公差、检验标准、交期和价格，以双方签署的书面报价、技术协议和合同为准。",
        ],
        [
          "内容的准确性",
          "我们尽量让页面内容与车间实际一致，但设备、认证进度、可加工范围会随时间变化，页面可能存在滞后或笔误。涉及具体项目时，请以图纸评审结论和书面确认为准。若你发现页面信息有误，欢迎发邮件指出，我们核实后会修正。",
        ],
        [
          "知识产权",
          "本站的文字、照片、版面设计、页面结构与自制图表，其著作权归帕诺真空或运营方所有。合作伙伴的名称与标识归其各自权利人所有，在本站仅用于说明合作关系，不代表其对本网站内容作出认可或担保。未经书面许可，不得复制、转载、镜像、批量抓取或用于商业用途。",
        ],
        [
          "使用规范",
          "使用本站时不得：以自动化手段大规模抓取页面；提交虚假、误导或他人信息；上传或投递恶意代码、病毒；尝试未授权访问服务器、表单后台或数据库；干扰网站正常运行；或以任何违反中华人民共和国法律法规的方式使用本站。",
        ],
        [
          "表单提交",
          "通过表单提交的询价或合作意向，不构成订单、合同或对交期的承诺。我们会按表单内容安排人工评审并回复；对于明显虚假、重复或自动化的提交，我们可能不予回复或直接过滤。请不要在表单中填写保密图纸、客户名单、财务数据或身份证件等敏感信息。",
        ],
        [
          "外部链接",
          "本站可能链接到第三方网站（如备案查询、合作伙伴官网）。这些网站的内容与隐私做法由各自运营方负责，我们不对其内容作出保证。",
        ],
        [
          "责任范围",
          "在法律允许的范围内，对于因使用或无法使用本站信息而产生的间接损失、利润损失或数据损失，我们不承担责任。本条款不排除或限制依法不能排除或限制的责任。",
        ],
        [
          "条款变更",
          `本条款更新于 ${UPDATED}。我们可能因业务或法律要求调整条款，更新后在本页发布并修改日期，继续使用本站视为接受更新后的条款。`,
        ],
        [
          "适用法律与争议解决",
          "本条款适用中华人民共和国法律。因本站使用产生的争议，双方应先友好协商；协商不成的，可向有管辖权的人民法院提起诉讼。",
        ],
        [
          "联系我们",
          `对本条款有疑问，请发邮件至 ${EMAIL}，或致电 +86 130 6372 2038。通信地址：江苏省苏州市常熟常福街道朝阳路 88 号。`,
        ],
      ]
    : [
        [
          "Who provides this site",
          `This website (panovacuum.cn and panovacuum.com) is built, maintained and operated online by ${OPERATOR_EN} (${OPERATOR_ZH}). The manufacturing business, products and case information published here belong to PANO Vacuum Machinery Technology (Changshu) Co., Ltd. By continuing to use the site you accept these terms.`,
        ],
        [
          "What the site is for",
          "The site describes PANO's machining capability, equipment, inspection approach and delivered projects, and receives manufacturing and partnership enquiries. Equipment figures, capacity statements, material grades, lead times and price indications on these pages are explanatory only. They are not an offer, a commitment or a contract term. Specifications, tolerances, inspection standards, lead times and prices are set by the written quotation, technical agreement and contract signed by both sides.",
        ],
        [
          "Accuracy of content",
          "We try to keep the pages consistent with what the shop actually does, but equipment, certification progress and feasible work change over time, so pages may lag or contain a typo. For a specific project, rely on the drawing review conclusion and written confirmation. If you spot an error, email us and we will check and correct it.",
        ],
        [
          "Intellectual property",
          "Text, photographs, layout, page structure and original diagrams on this site are owned by PANO Vacuum or the operator. Partner names and logos belong to their respective owners and appear here only to describe working relationships; they do not imply endorsement of, or warranty for, this website's content. Do not copy, republish, mirror, bulk-crawl or commercially reuse the material without written permission.",
        ],
        [
          "Acceptable use",
          "When using this site you must not: crawl pages at scale by automated means; submit false, misleading or third-party information; upload or transmit malicious code; attempt unauthorised access to servers, form back ends or databases; interfere with normal operation; or use the site in any way that breaks the laws of the People's Republic of China.",
        ],
        [
          "Form submissions",
          "An enquiry or partnership enquiry sent through a form is not an order, a contract or a promise on lead time. We review submissions manually and reply; obviously false, duplicated or automated submissions may be ignored or filtered. Do not enter confidential drawings, customer lists, financial data or identity documents.",
        ],
        [
          "External links",
          "The site may link to third-party sites, such as filing-credit lookups or partner home pages. Their content and privacy practices are their own responsibility, and we make no warranty about them.",
        ],
        [
          "Limitation of liability",
          "To the extent the law allows, we are not liable for indirect loss, loss of profit or loss of data arising from use of, or inability to use, information on this site. Nothing here excludes or limits liability that cannot lawfully be excluded or limited.",
        ],
        [
          "Changes to these terms",
          `These terms were updated on ${UPDATED}. We may revise them for business or legal reasons, republishing them here with a new date; continued use of the site means you accept the revised terms.`,
        ],
        [
          "Governing law and disputes",
          "These terms are governed by the laws of the People's Republic of China. Disputes arising from use of this site should first be discussed in good faith; if that fails, either party may bring the matter before a court with jurisdiction.",
        ],
        [
          "Contact",
          `Questions about these terms: email ${EMAIL} or call +86 130 6372 2038. Postal address: No. 88 Chaoyang Road, Changfu Sub-district, Changshu, Suzhou, Jiangsu, China.`,
        ],
      ];

  return (
    <div className="growth-page">
      <SeoLinks path="terms" locale={loc} />
      <section className="growth-heading">
        <div className="container">
          <p className="eyebrow">{zh ? "法律与合规" : "Legal"}</p>
          <h1>{zh ? "使用条款" : "Terms of use"}</h1>
          <p className="sub">
            {zh
              ? "本站能用来做什么、页面信息以什么为准、内容归谁、以及出现争议时怎么处理。"
              : "What the site is for, what content is authoritative, who owns the material, and how disputes are handled."}
          </p>
        </div>
      </section>
      <section className="growth-section">
        <div className="container privacy-copy">
          {sections.map(([title, ...rest]) => (
            <section key={title as string}>
              <h2>{title as string}</h2>
              {rest
                .flatMap((x) => (Array.isArray(x) ? x : [x]))
                .map((text) => (
                  <p key={text.slice(0, 40)}>{text}</p>
                ))}
            </section>
          ))}
          <p className="privacy-updated">
            {zh ? `更新日期：${UPDATED}` : `Last updated: ${UPDATED}`}
            {" · "}
            <Link href={`/${loc}/privacy/`}>{zh ? "隐私政策" : "Privacy policy"}</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
