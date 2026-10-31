import type { Metadata } from "next";
import Link from "next/link";
import { SeoLinks } from "../../components/seo-links";
import { PartnerGrid } from "../../components/partner-grid";
import "../../growth.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "zh"
    ? {
        title: "工厂能力介绍 | 帕诺真空",
        description: "帕诺真空的制造范围、工序、质量检验、合作单位与商务联系信息，供采购与产业合作初步了解。",
      }
    : {
        title: "Factory Overview | PANO Vacuum",
        description:
          "PANO Vacuum's manufacturing scope, processes, inspection approach, partners and business contact details for sourcing and industrial partners.",
      };
}

export default async function Profile({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const zh = loc === "zh";

  const facts = zh
    ? [
        ["制造范围", "定制真空腔体、精密加工件与真空密封组件。按图纸及双方约定的技术要求评审、制造与检验。"],
        ["工序配套", "图纸评审、下料成形、精密加工、焊接、表面处理与清洗、氦质谱检漏和装配。具体工艺适用性按项目确认。"],
        ["质量记录", "图纸评审至出厂检验的七道检验节点；逐台留记录，检验报告随货交付。"],
        ["服务方向", "半导体设备、真空镀膜与工艺装备、新能源装备厂商；支持单件定制与英语全流程沟通。"],
      ]
    : [
        [
          "Manufacturing scope",
          "Custom vacuum chambers, precision-machined components and vacuum-tight assemblies. Review, manufacturing and inspection follow the drawing and agreed technical requirements.",
        ],
        [
          "Process support",
          "Drawing review, blanking and forming, precision machining, welding, surface finishing and cleaning, helium leak testing and assembly. Process suitability is confirmed per project.",
        ],
        [
          "Inspection records",
          "Seven inspection gates from drawing review to final inspection. Records are kept per unit, with inspection reports accompanying delivery.",
        ],
        [
          "Customers we serve",
          "Semiconductor equipment, vacuum coating and process tools, and new-energy equipment makers. Single-piece custom work and English-language process support are available.",
        ],
      ];

  const contact = zh
    ? [
        ["联系人", "周游"],
        ["邮箱", "zhouyou@panovacuum.com", "mailto:zhouyou@panovacuum.com"],
        ["电话", "+86 130 6372 2038", "tel:+8613063722038"],
        ["地址", "江苏省苏州市常熟常福街道朝阳路 88 号"],
      ]
    : [
        ["Contact", "Zhou You"],
        ["Email", "zhouyou@panovacuum.com", "mailto:zhouyou@panovacuum.com"],
        ["Phone", "+86 130 6372 2038", "tel:+8613063722038"],
        ["Address", "No. 88 Chaoyang Road, Changfu Sub-district, Changshu, Suzhou, China"],
      ];

  return (
    <div className="growth-page profile-page">
      <SeoLinks path="company-profile" locale={loc} />

      <section className="growth-heading">
        <div className="container">
          <p className="eyebrow">{zh ? "工厂能力介绍" : "Factory overview"}</p>
          <h1>{zh ? "帕诺真空机械科技（常熟）有限公司" : "PANO Vacuum Machinery Technology (Changshu) Co., Ltd."}</h1>
          <p className="sub">
            {zh
              ? "面向采购与产业伙伴的公开能力介绍，可使用浏览器打印或保存本页。"
              : "A public manufacturing overview for sourcing and industrial partners. You can print or save this page from your browser."}
          </p>
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <div className="profile-intro">
            <div>
              <h2>{zh ? "从图纸评审，到检验交付" : "From drawing review to inspected delivery"}</h2>
              <p>
                {zh
                  ? "帕诺位于江苏常熟，专注真空腔体与相关组件制造。我们以具体图纸、制造工艺和检测要求开展项目交流，不用未确认的规格代替技术评审。"
                  : "Based in Changshu, Jiangsu, China, PANO focuses on vacuum chambers and related components. Project discussions start with the drawing, manufacturing process and inspection requirements."}
              </p>
            </div>
            <img
              src="/photos/hero-chamber.webp"
              width={1200}
              height={893}
              alt={zh ? "帕诺定制不锈钢真空腔体" : "PANO custom stainless steel vacuum chamber"}
            />
          </div>

          <dl className="profile-facts">
            {facts.map(([title, text]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="growth-section" id="partners">
        <div className="container">
          <h2>{zh ? "合作伙伴" : "Partners"}</h2>
          <p className="sub">
            {zh
              ? "以下单位与帕诺真空在设备、配套与供应链上存在实际合作。标识归各自权利人所有。"
              : "The organisations below work with PANO Vacuum on equipment, components and supply. Their logos remain the property of their respective owners."}
          </p>
          <PartnerGrid locale={loc} />
        </div>
      </section>

      <section className="growth-section">
        <div className="container">
          <h2>{zh ? "商务联系" : "Business contact"}</h2>
          <dl className="profile-contact">
            {contact.map(([label, value, href]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{href ? <a href={href}>{value}</a> : value}</dd>
              </div>
            ))}
          </dl>

          <div className="growth-actions">
            <Link className="growth-button" href={`/${loc}/request-a-quote/`}>
              {zh ? "提交制造需求" : "Send a manufacturing enquiry"}
            </Link>
            <Link className="growth-button secondary" href={`/${loc}/industrial-partnerships/`}>
              {zh ? "探讨产业合作" : "Discuss industrial collaboration"}
            </Link>
          </div>

          <p className="profile-operator">
            {zh
              ? "本站（包括页面内容、在线表单与域名）由苏州领拓互联科技有限公司负责建设、技术维护和线上业务运营；制造业务与产品信息的主体为帕诺真空机械科技（常熟）有限公司。"
              : "This website, including its content, online forms and domain, is built, maintained and operated online by Suzhou Lingtuo Internet Technology Co., Ltd. (苏州领拓互联科技有限公司). The manufacturing business and product information published here belong to PANO Vacuum Machinery Technology (Changshu) Co., Ltd."}{" "}
            <a href={`/${loc}/privacy/`}>{zh ? "隐私政策" : "Privacy policy"}</a> ·{" "}
            <a href={`/${loc}/terms/`}>{zh ? "使用条款" : "Terms of use"}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
