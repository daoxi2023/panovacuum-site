import type { Metadata } from "next";
import { SITE_BASE } from "@/lib/site-base";

// 根路径是语言网关：静态导出无法按 Accept-Language 分流，所以用客户端脚本按浏览器语言跳转，
// 同时给出可被爬虫抓取的链接，并把 canonical 指向英文首页。
export const metadata: Metadata = {
  title: "PANO Vacuum | Custom Vacuum Chambers · 帕诺真空腔体",
  description:
    "PANO Vacuum Machinery Technology (Changshu) Co., Ltd. — custom vacuum chambers, precision components and vacuum-tight assemblies. 帕诺真空：常熟定制真空腔体、精密零部件与真空焊接总成。",
  alternates: {
    canonical: `${SITE_BASE}/en/`,
    languages: { "zh-CN": `${SITE_BASE}/zh/`, en: `${SITE_BASE}/en/`, "x-default": `${SITE_BASE}/en/` },
  },
  robots: { index: false, follow: true },
};

export default function Root() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "(function(){try{var l=(navigator.language||'en').toLowerCase();var p=l.indexOf('zh')===0?'/zh/':'/en/';location.replace(p);}catch(e){}})();",
        }}
      />
      <main style={{ textAlign: "center", padding: 80, fontFamily: "system-ui, sans-serif" }}>
        <p>
          <a href="/en/">PANO Vacuum — Enter site</a> · <a href="/zh/">帕诺真空 — 进入中文站</a>
        </p>
      </main>
    </>
  );
}
