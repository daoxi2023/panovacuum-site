import Link from "next/link";
import { OPERATOR_EN, OPERATOR_ZH, SITE_ICP } from "@/lib/site-base";

export function Footer({ locale }: { locale: "en" | "zh" }) {
  const zh = locale === "zh";
  const T = zh
    ? {
        tagline: "常熟的真空腔体制造工厂。图纸评审后，下料、加工、焊接、检漏与出厂检验均在本厂完成，检测记录随货交付。",
        cta: "提交询价",
        groups: [
          {
            title: "制造与能力",
            items: [
              ["制造能力", `/${locale}/#capabilities`],
              ["质量检验", `/${locale}/#quality`],
              ["应用领域", `/${locale}/#industries`],
              ["案例示例", `/${locale}/case-studies/`],
              ["工厂能力介绍", `/${locale}/company-profile/`],
              ["产业合作", `/${locale}/industrial-partnerships/`],
            ],
          },
          {
            title: "关于与资料",
            items: [
              ["关于我们", `/${locale}/#about`],
              ["新闻博客", `/${locale}/blog/`],
              ["隐私政策", `/${locale}/privacy/`],
              ["使用条款", `/${locale}/terms/`],
            ],
          },
        ],
        contactTitle: "联系",
        tel: "+86 130 6372 2038",
        telLabel: "中国",
        telUs: "+1 307 533 3212",
        telUsLabel: "美国",
        mail: "zhouyou@panovacuum.com",
        addr: "江苏省苏州市常熟常福街道朝阳路 88 号，215500",
        wechat: "微信咨询",
        rights: "© 2026 帕诺真空 版权所有",
        co1: "帕诺真空机械科技（常熟）有限公司",
        operator: "本站及线上业务由苏州领拓互联科技有限公司运营维护",
        privacy: "隐私政策",
        terms: "使用条款",
      }
    : {
        tagline: "A vacuum chamber manufacturing plant in Changshu, China. Customer drawings are received, manufactured in-house, and dispatched with full test records.",
        cta: "Request a quote",
        groups: [
          {
            title: "Manufacturing",
            items: [
              ["Capabilities", `/${locale}/#capabilities`],
              ["Quality", `/${locale}/#quality`],
              ["Industries", `/${locale}/#industries`],
              ["Case Examples", `/${locale}/case-studies/`],
              ["Factory Overview", `/${locale}/company-profile/`],
              ["Industrial Partnerships", `/${locale}/industrial-partnerships/`],
            ],
          },
          {
            title: "Company & resources",
            items: [
              ["About", `/${locale}/#about`],
              ["Blog", `/${locale}/blog/`],
              ["Privacy Policy", `/${locale}/privacy/`],
              ["Terms of Use", `/${locale}/terms/`],
            ],
          },
        ],
        contactTitle: "Contact",
        tel: "+86 130 6372 2038",
        telLabel: "China",
        telUs: "+1 307 533 3212",
        telUsLabel: "US",
        mail: "zhouyou@panovacuum.com",
        addr: "No. 88 Chaoyang Road, Changfu Sub-district, Changshu, Suzhou 215500, China",
        wechat: "WeChat",
        rights: "© 2026 PANO Vacuum. All rights reserved.",
        co1: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.",
        operator:
          `This website and our online business are operated and maintained by ${OPERATOR_EN}`,
        privacy: "Privacy policy",
        terms: "Terms of use",
      };

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-identity">
          <div className="footer-brand-row">
            <img
              src="/pano-vacuum-tech-logo.webp"
              srcSet="/pano-vacuum-tech-logo-2x.webp 2x"
              alt="PANO Vacuum 帕诺真空"
              width={126}
              height={84}
              style={{ height: 84, width: "auto", display: "block" }}
            />
            <p className="footer-brand">{zh ? "帕诺真空" : "PANO Vacuum"}</p>
          </div>
          <p className="footer-tagline">{T.tagline}</p>
          <Link className="footer-cta" href={`/${locale}/request-a-quote/`}>
            {T.cta}
          </Link>
        </div>

        {T.groups.map((group) => (
          <div className="footer-col" key={group.title}>
            <p className="footer-title">{group.title}</p>
            <ul className="footer-links">
              {group.items.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-col footer-contact">
          <p className="footer-title">{T.contactTitle}</p>
          <ul className="footer-contact-list">
            <li>
              <a className="num" href="tel:+8613063722038">
                {T.tel}
                <span>{T.telLabel}</span>
              </a>
            </li>
            <li>
              <a className="num" href="tel:+13075333212">
                {T.telUs}
                <span>{T.telUsLabel}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${T.mail}`}>{T.mail}</a>
            </li>
            <li className="footer-addr">{T.addr}</li>
          </ul>
          <div className="footer-wechat">
            <img
              src="/wechat-qr.webp"
              alt={zh ? "周先生微信二维码" : "Mr. Zhou WeChat QR code"}
              className="footer-qr"
              width={76}
              height={76}
              loading="lazy"
            />
            <span>{T.wechat}</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <div>
          <p className="footer-copy">
            {T.rights} · {T.co1}
          </p>
          <p className="footer-operator">{T.operator}</p>
        </div>
        <div className="footer-meta">
          <Link href={`/${locale}/privacy/`}>{T.privacy}</Link>
          <Link href={`/${locale}/terms/`}>{T.terms}</Link>
          <span>www.panovacuum.com</span>
          {SITE_ICP ? (
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
              {SITE_ICP}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
