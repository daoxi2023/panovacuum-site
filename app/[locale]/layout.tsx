import type { Metadata } from "next";
import "../globals.css";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "zh"
    ? {
        title: "帕诺真空 | 定制真空腔体与精密制造",
        description: "面向先进装备的定制真空腔体、精密加工件与真空密封组件制造——从图纸评审到检验与交付。",
        alternates: { languages: { en: "/en", "zh-CN": "/zh" } },
      }
    : {
        title: "PANO Vacuum | Custom Vacuum Chambers & Precision Manufacturing",
        description:
          "Engineering-focused manufacturing of custom vacuum chambers, precision-machined components and vacuum-tight assemblies — from drawing review to inspection and delivery.",
        alternates: { languages: { "zh-CN": "/zh", en: "/en" } },
      };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale === "zh" ? "zh" : "en";
  return (
    <html lang={loc === "zh" ? "zh-CN" : "en"}>
      <body>
        <Header locale={loc} />
        <main>{children}</main>
        <Footer locale={loc} />
      </body>
    </html>
  );
}