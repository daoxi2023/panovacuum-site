import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoLinks } from "../../../components/seo-links";
import { manufacturingServices } from "../../../../lib/manufacturing";
import "../../../growth.css";

type Params = Promise<{ locale: string; service: string }>;
export const dynamicParams = false;
export function generateStaticParams() { return manufacturingServices.map(({ slug }) => ({ service: slug })); }
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, service } = await params;
  const entry = manufacturingServices.find((item) => item.slug === service);
  if (!entry) return {};
  const t = entry[locale === "zh" ? "zh" : "en"];
  return { title: `${t.title} | ${locale === "zh" ? "帕诺真空" : "PANO Vacuum"}`, description: t.intro };
}
export default async function Manufacturing({ params }: { params: Params }) {
  const { locale, service } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  const zh = loc === "zh";
  const entry = manufacturingServices.find((item) => item.slug === service);
  if (!entry) notFound();
  const t = entry[loc];
  return <div className="growth-page">
    <SeoLinks path={`manufacturing/${entry.slug}`} locale={loc} />
    <section className="growth-heading"><div className="container"><p className="eyebrow">{zh ? "制造服务" : "Manufacturing services"}</p><h1>{t.title}</h1><p className="sub">{t.intro}</p><div className="growth-actions"><Link className="growth-button" href={`/${loc}/request-a-quote/`}>{zh ? "提交项目需求" : "Send your project requirements"}</Link><Link className="growth-button secondary" href={`/${loc}/company-profile/`}>{zh ? "了解工厂能力" : "Explore factory capabilities"}</Link></div></div></section>
    <section className="growth-section"><div className="container profile-intro"><div><h2>{zh ? "适合这些采购需求" : "Requirements we can discuss"}</h2><ul>{t.needs.map((item) => <li key={item}>{item}</li>)}</ul><h2>{zh ? "先评审，再确定工序" : "Review first, then agree the process"}</h2><p>{t.process}</p></div><img src={entry.image} width={900} height={670} alt={t.title} /></div></section>
    <section className="growth-section partner-process"><div className="container growth-contact-layout"><div><h2>{zh ? "询价时，请准备" : "What to include in your enquiry"}</h2><ul>{t.provide.map((item) => <li key={item}>{item}</li>)}</ul><p>{zh ? "尚无正式图纸时，也可以先发送非保密的需求概述；图纸与敏感资料另行对接。" : "If you do not yet have a formal drawing, start with a non-confidential outline. Drawings and sensitive materials can be exchanged separately."}</p><Link className="growth-button" href={`/${loc}/request-a-quote/`}>{zh ? "提交询价需求" : "Request a quote"}</Link></div><aside><h2>{zh ? "检测与交付记录" : "Inspection and delivery records"}</h2><p>{t.records}</p><Link href={`/${loc}/#quality`}>{zh ? "查看质量检验流程" : "See the quality inspection process"}</Link></aside></div></section>
    <section className="growth-section"><div className="container"><h2>{zh ? "相关制造服务" : "Related manufacturing services"}</h2><div className="growth-service-links">{manufacturingServices.filter((item) => item.slug !== entry.slug).map((item) => <Link key={item.slug} href={`/${loc}/manufacturing/${item.slug}/`}>{item[loc].title}</Link>)}</div></div></section>
  </div>;
}
