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
        description: "常熟工厂按图纸定制真空腔体、精密零件与真空密封组件，加工、焊接、氦质谱检漏与检验均在本厂完成，检测记录随货交付。",
        icons,
        openGraph: { title: "帕诺真空｜常熟定制真空腔体", description: "面向先进装备的定制真空腔体、精密加工件与真空密封组件制造。", locale: "zh_CN", images: ogImage },
      }
    : {
        title: "PANO Vacuum | Custom Vacuum Chambers, Changshu China",
        description:
          "We build custom vacuum chambers to your drawing in Changshu, China. Machining, welding, helium leak testing and inspection all happen in our shop, and the test records ship with the chamber.",
        icons,
        openGraph: { title: "PANO Vacuum | Custom Vacuum Chambers, Changshu China", description: "Custom vacuum chambers built to your drawing in Changshu, China. Test records ship with every unit.", locale: "en_US", images: ogImage },
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