import { partners } from "@/lib/partners";

// 合作伙伴 logo 墙。首页与公司介绍页复用同一份数据（lib/partners.ts）与同一套样式（growth.css 的 .partner-wall）。
export function PartnerGrid({ locale }: { locale: "en" | "zh" }) {
  const zh = locale === "zh";
  return (
    <div className="partner-wall">
      {partners.map((p) => {
        const name = zh ? p.zh : p.en;
        return (
          <div className="partner-wall-item" key={p.slug}>
            <img
              src={`/photos/partners/${p.slug}.webp`}
              alt={`${name} ${zh ? "标识" : "logo"}`}
              width={380}
              height={80}
              loading="lazy"
            />
            <span>{name}</span>
          </div>
        );
      })}
    </div>
  );
}
