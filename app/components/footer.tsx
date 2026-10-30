import Link from "next/link";

export function Footer({ locale }: { locale: "en" | "zh" }) {
  const zh = locale === "zh";
  const T = zh
    ? {
        tagline: "常熟的真空腔体制造厂。从图纸到交付，一个厂里做完。",
        navTitle: "站点",
        links: [
          ["制造能力", `/${locale}/#capabilities`],
          ["质量检验", `/${locale}/#quality`],
          ["关于我们", `/${locale}/#about`],
          ["应用领域", `/${locale}/#industries`],
          ["案例示例", `/${locale}/case-studies/`],
          ["新闻博客", `/${locale}/blog/`],
          ["产业合作", `/${locale}/industrial-partnerships/`],
          ["工厂能力介绍", `/${locale}/company-profile/`],
          ["隐私说明", `/${locale}/privacy/`],
          ["提交询价", `/${locale}/request-a-quote/`],
        ],
        contactTitle: "联系我们",
        tel: "+86 130 6372 2038",
        telUs: "+1 307 533 3212",
        mail: "zhouyou@panovacuum.com",
        addr: "江苏省苏州市常熟常福街道朝阳路 88 号，215500",
        companyTitle: "公司",
        co1: "帕诺真空机械科技（常熟）有限公司",
        web: "www.panovacuum.com",
        rights: "© 2026 帕诺真空 版权所有",
        articles: "技术文章",
      }
    : {
        tagline: "A vacuum chamber manufacturer in Changshu — from drawing to delivery, under one roof.",
        navTitle: "Site",
        links: [
          ["Capabilities", `/${locale}/#capabilities`],
          ["Quality", `/${locale}/#quality`],
          ["About", `/${locale}/#about`],
          ["Industries", `/${locale}/#industries`],
          ["Case Examples", `/${locale}/case-studies/`],
          ["Blog", `/${locale}/blog/`],
          ["Industrial Partnerships", `/${locale}/industrial-partnerships/`],
          ["Factory Overview", `/${locale}/company-profile/`],
          ["Privacy Notice", `/${locale}/privacy/`],
          ["Request a Quote", `/${locale}/request-a-quote/`],
        ],
        contactTitle: "Contact",
        tel: "+86 130 6372 2038",
        telUs: "+1 307 533 3212",
        mail: "zhouyou@panovacuum.com",
        addr: "No. 88 Chaoyang Road, Changfu Sub-district, Changshu, Suzhou 215500, China",
        companyTitle: "Company",
        co1: "PANO Vacuum Machinery Technology (Changshu) Co., Ltd.",
        web: "www.panovacuum.com",
        rights: "© 2026 PANO Vacuum. All rights reserved.",
        articles: "Technical Articles",
      };
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img
            src="/pano-vacuum-tech-logo.webp"
            srcSet="/pano-vacuum-tech-logo-2x.webp 2x"
            alt="PANO Vacuum 帕诺真空"
            width={63}
            height={42}
            style={{ height: 42, width: "auto", display: "block", marginBottom: 10 }}
          />
          <p className="footer-brand">{zh ? "帕诺真空" : "PANO Vacuum"}</p>
          <p className="footer-tagline">{T.tagline}</p>
        </div>
        <div>
          <p className="footer-title">{T.navTitle}</p>
          <ul className="footer-links">
            {T.links.map(([label, href]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">{T.contactTitle}</p>
          <p className="footer-line"><a href="tel:+8613063722038">{T.tel}</a><br /><a href="tel:+13075333212">{T.telUs}</a></p>
          <p className="footer-line"><a href={`mailto:${T.mail}`}>{T.mail}</a></p>
          <p className="footer-line">{T.addr}</p>
        </div>
        <div>
          <p className="footer-title">{T.companyTitle}</p>
          <p className="footer-line">{T.co1}</p>
          <p className="footer-line">{T.web}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{T.rights}</span>
        <Link href={`/${locale}/blog/`} className="footer-articles">{T.articles}</Link>
      </div>
    </footer>
  );
}
