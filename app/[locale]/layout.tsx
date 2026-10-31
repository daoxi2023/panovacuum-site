import type { Metadata } from "next";
import "../globals.css";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { SITE_BASE } from "@/lib/site-base";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

const icons = {
  icon: ["/favicon.ico", "/icon-192.webp", "/icon-512.webp"],
  apple: "/apple-touch-icon.png",
  shortcut: "/favicon.ico",
};

const ogImage = [{ url: `${SITE_BASE}/og-image.webp`, width: 1200, height: 630 }];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base: Metadata = { metadataBase: new URL(SITE_BASE) };
  return locale === "zh"
    ? {
        ...base,
        title: "帕诺真空｜常熟定制真空腔体",
        description: "常熟工厂按图纸定制真空腔体、精密件和真空密封组件。加工、焊接、氦检、检验都在本厂，检验记录随货发。",
        icons,
        openGraph: { title: "帕诺真空｜常熟定制真空腔体", description: "面向先进装备的定制真空腔体、精密加工件与真空密封组件制造。", locale: "zh_CN", images: ogImage },
      }
    : {
        title: "PANO Vacuum | Custom Vacuum Chambers & Precision Manufacturing",
        description:
          "Engineering-focused manufacturing of custom vacuum chambers, precision-machined components and vacuum-tight assemblies — from drawing review to inspection and delivery.",
        icons,
        openGraph: { title: "PANO Vacuum | Custom Vacuum Chambers & Precision Manufacturing", description: "Engineering-focused manufacturing of custom vacuum chambers and precision-machined components.", locale: "en_US", images: ogImage },
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
    <>
      <Header locale={loc} />
      <main>{children}</main>
      <Footer locale={loc} />
    </>
  );
}