import type { Metadata } from "next";
import Link from "next/link";
import { SeoLinks } from "../../components/seo-links";
import { PartnerGrid } from "../../components/partner-grid";
import "../../growth.css";
import { OPERATOR_EN, OPERATOR_ZH } from "@/lib/site-base";
import { OG_BY_PAGE, pageOg } from "@/lib/og";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t =
    locale === "zh"
      ? {
          title: "工厂能力介绍 | 帕诺真空",
          description: "帕诺真空的制造范围、工序、质量检验、合作单位与商务联系信息，供采购与产业合作初步了解。",
        }
      : {
          title: "Factory Overview | PANO Vacuum",
          description:
            "PANO Vacuum's manufacturing scope, processes, inspection approach, partners and business contact details for sourcing and industrial partners.",
        };
  return {
    ...t,
    ...pageOg({
      path: "company-profile",
      locale,
      title: t.title,
      description: t.description,
      image: OG_BY_PAGE["company-profile"],
      altZh: "帕诺真空工厂内的氩弧焊接工位与真空腔体",
      altEn: "TIG welding station and vacuum chamber on the PANO Vacuum shop floor",
    }),
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
        ["联系人", "周先生"],
        ["邮箱", "zhouyou@panovacuum.com", "mailto:zhouyou@panovacuum.com"],
        ["电话", "+86 130 6372 2038", "tel:+8613063722038"],
        ["地址", "江苏省苏州市常熟常福街道朝阳路 88 号"],
      ]
    : [
        ["Contact", "Mr. Zhou"],
        ["Email", "zhouyou@panovacuum.com", "mailto:zhouyou@panovacuum.com"],
        ["Phone", "+86 130 6372 2038", "tel:+8613063722038"],
        ["Address", "No. 88 Chaoyang Road, Changfu Sub-district, Changshu, Suzhou, China"],
      ];

  // 设备与检验现场：本组图片为 AI 生成的占位图，待实拍替换；见 docs/AI-PLACEHOLDER-2026-11-04.md
  const equipment = [
    {
      img: "/photos/equipment-laser-cutting-30000w-1200w.webp",
      t: zh ? "3 万瓦光纤激光切割" : "30 kW fibre laser cutting",
      x: zh ? "不锈钢板材下料环节，按图纸展开尺寸切割。" : "Stainless steel blanking, cut to the developed size on the drawing.",
      alt: zh ? "3 万瓦光纤激光切割机正在切割不锈钢板" : "30 kW fibre laser cutter cutting a stainless steel plate",
    },
    {
      img: "/photos/equipment-press-brake-400t-6200mm-1200w.webp",
      t: zh ? "400 吨 · 6.2 米折弯" : "400 t · 6.2 m press brake",
      x: zh ? "长尺寸板材成形，减少分段拼焊。" : "Forming of long plates, reducing segmented weld joints.",
      alt: zh ? "400 吨 6.2 米液压折弯机正在折弯不锈钢厚板" : "400 t, 6.2 m hydraulic press brake forming a thick stainless plate",
    },
    {
      img: "/photos/equipment-overhead-crane-50t-1200w.webp",
      t: zh ? "50 吨行车总装与翻转" : "50 t overhead crane",
      x: zh ? "重型腔体吊装、翻转与整体总装。" : "Lifting, turning and assembling heavy chambers.",
      alt: zh ? "50 吨桥式行车吊装不锈钢真空腔体" : "50 t overhead crane lifting a stainless steel vacuum chamber",
    },
    {
      img: "/photos/helium-leak-test-inficon-ul1000-console-1200w.webp",
      t: zh ? "氦质谱检漏" : "Helium leak testing",
      x: zh ? "UL1000 级别检漏仪，逐台检测至 1×10⁻⁹ Pa·m³/s 量级。" : "UL1000-class instrument; each unit tested to the 1×10⁻⁹ Pa·m³/s range.",
      alt: zh ? "氦质谱检漏仪与待检真空腔体" : "Helium leak detector connected to a vacuum chamber",
    },
    {
      img: "/photos/surface-finishing-polishing-stainless-chamber-1200w.webp",
      t: zh ? "表面处理与抛光" : "Surface finishing and polishing",
      x: zh ? "在受控洁净焊接环境内完成，过程与清洁记录可随货提供。" : "Completed inside the controlled clean welding area; process and cleaning records ship with the work.",
      alt: zh ? "工人打磨抛光不锈钢真空腔体外表面" : "Polishing the outer surface of a stainless steel vacuum chamber",
    },
    {
      img: "/photos/inspection-incoming-material-spectrometer-1200w.webp",
      t: zh ? "来料材质复检" : "Incoming material verification",
      x: zh ? "板材与锻件按批次核对材质，检验节点纳入图纸评审。" : "Plate and forgings are checked per batch; inspection points are agreed at drawing review.",
      alt: zh ? "手持光谱仪对不锈钢板进行材质复检" : "Handheld spectrometer verifying a stainless steel plate",
    },
    {
      img: "/photos/inspection-weld-visual-gauge-1200w.webp",
      t: zh ? "焊缝外观检查" : "Weld visual inspection",
      x: zh ? "焊缝成形、咬边与气孔按检验要求逐段检查。" : "Bead profile, undercut and porosity are checked section by section.",
      alt: zh ? "检验员用焊缝检验尺检查不锈钢焊缝" : "Inspector checking a stainless weld seam with a weld gauge",
    },
    {
      img: "/photos/inspection-cleanliness-white-cloth-wipe-1200w.webp",
      t: zh ? "内表面清洁度检查" : "Internal cleanliness check",
      x: zh ? "白布擦拭检查内表面残留，结果随检验记录归档。" : "White-cloth wipe checks for residue; results are filed with the inspection record.",
      alt: zh ? "用白布擦拭检查真空腔体内表面清洁度" : "White-cloth wipe check on the inside of a vacuum chamber",
    },
    {
      img: "/photos/inspection-final-report-chamber-1200w.webp",
      t: zh ? "出厂检验记录" : "Final inspection records",
      x: zh ? "关键尺寸、检漏与外观结果逐台签署归档，随货交付。" : "Key dimensions, leak-test and appearance results are signed off per unit and ship with it.",
      alt: zh ? "在完工真空腔体旁整理出厂检验记录" : "Final inspection records being prepared beside a finished chamber",
    },
    {
      img: "/photos/case-heavy-chamber-304l-8000mm-1200w.webp",
      t: zh ? "8 米级卧式腔体" : "8-metre horizontal chamber",
      x: zh ? "单件长尺寸腔体，在行车覆盖范围内整体总装。" : "Long single-piece chambers, assembled in one piece under the crane.",
      alt: zh ? "车间内 8 米长卧式不锈钢真空腔体" : "Eight-metre horizontal stainless steel vacuum chamber in the workshop",
    },
    {
      img: "/photos/service-custom-vacuum-chambers-workshop-1200w.webp",
      t: zh ? "多台腔体并行制作" : "Several chambers in parallel",
      x: zh ? "同一车间内按项目分批下料、焊接、检漏，交期按工序排。" : "Cutting, welding and leak testing are batched per project in one workshop, so lead time follows the process route.",
      alt: zh ? "车间内多台定制真空腔体同时制作" : "Several custom vacuum chambers being built at the same time in the workshop",
    },
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
                  ? "帕诺位于江苏常熟，专注真空腔体与相关组件制造。项目沟通以具体图纸、加工工艺与检测要求为依据，不以未经确认的规格替代技术评审。"
                  : "Based in Changshu, Jiangsu, China, PANO focuses on vacuum chambers and related components. Project discussions start with the drawing, manufacturing process and inspection requirements."}
              </p>
            </div>
            <img
              src="/photos/custom-vacuum-chamber-304l-stainless-1200w.webp"
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

      <section className="growth-section" id="equipment">
        <div className="container">
          <h2>{zh ? "设备与检验现场" : "Equipment and inspection on site"}</h2>
          <p className="sub">
            {zh
              ? "以下为在役设备与检验工序的现场记录，设备范围以工厂台账为准。"
              : "In-service equipment and inspection steps at the plant; the equipment scope follows the plant ledger."}
          </p>
          <div className="grid">
            {equipment.map((item) => (
              <article className="card" key={item.img}>
                <div className="card-img">
                  <img src={item.img} alt={item.alt} width={1200} height={825} loading="lazy" />
                </div>
                <div className="card-body">
                  <h3>{item.t}</h3>
                  <p>{item.x}</p>
                </div>
              </article>
            ))}
          </div>
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
              : `This website, including its content, online forms and domain, is built, maintained and operated online by ${OPERATOR_EN} (${OPERATOR_ZH}). The manufacturing business and product information published here belong to PANO Vacuum Machinery Technology (Changshu) Co., Ltd.`}{" "}
            <a href={`/${loc}/privacy/`}>{zh ? "隐私政策" : "Privacy policy"}</a> ·{" "}
            <a href={`/${loc}/terms/`}>{zh ? "使用条款" : "Terms of use"}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
