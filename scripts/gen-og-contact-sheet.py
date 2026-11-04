#!/usr/bin/env python3
"""生成分享图（OG）人工审阅页 `docs/OG-CONTACT-SHEET.html`。

数据来源不手写：
- 文件清单与字节数：`public/pano-vacuum-og-*.webp`
- 每张图被哪些路由引用：扫描构建产物 HTML（默认 `out/`，可传目录）里的 og:image
- 画面说明与视觉复核结论：本文件的 VERDICTS（由 X99 上的视觉模型逐张看过，人工归纳）

用法：
    python3 scripts/gen-og-contact-sheet.py            # 扫 out/
    python3 scripts/gen-og-contact-sheet.py /tmp/out-com
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT_HTML = ROOT / "docs" / "OG-CONTACT-SHEET.html"

# 文件名 → (画面是什么, 复核结论)
VERDICTS: dict[str, tuple[str, str]] = {
    "pano-vacuum-og-default-1200x630.webp": (
        "多吨级 304L 真空腔体车间实拍，压暗 + 降饱和 + 居中白色「PANO Vacuum」字标",
        "品牌卡，刻意压暗以便读白字标；无中文，中英文站共用",
    ),
    "pano-vacuum-og-blog-1200x630.webp": (
        "TIG 焊接工位：焊机、工装、腔体焊缝",
        "5 分｜有工位、有人和设备层次，像一个真实车间而不是一块金属",
    ),
    "pano-vacuum-og-blog-topic-leak-testing-1200x630.webp": (
        "INFICON UL1000 氦检仪单机特写",
        "5 分｜主体明确、干净，是唯一真正对得上「检漏」的素材",
    ),
    "pano-vacuum-og-article-helium-leak-test-1200x630.webp": (
        "同一台 INFICON 检漏仪，更近的取景（1.12×）",
        "认出真机｜与专题图区分取景，避免同一版面重复",
    ),
    "pano-vacuum-og-blog-topic-design-materials-1200x630.webp": (
        "多吨级 304L 腔体端面与法兰",
        "可｜大腔体尺度感清楚",
    ),
    "pano-vacuum-og-article-material-304l-316l-1200x630.webp": (
        "304L 腔体筒身与焊缝（1.10×）",
        "2 分｜模型嫌「没体现 304L/316L 的区别」——字面主义，实拍无法体现材质牌号，不改",
    ),
    "pano-vacuum-og-blog-topic-clean-particle-1200x630.webp": (
        "受控焊接工位（1.18×，取焊道与周边洁净区）",
        "4 分｜与合规文案「受控洁净焊接环境」对得上；原用「检漏室门」那张已弃用",
    ),
    "pano-vacuum-og-blog-topic-quote-delivery-1200x630.webp": (
        "车间全景，偏右下取景（谈图纸、排产的实际场景）",
        "可｜场景真实；原「图纸」图为误命名，已弃用",
    ),
    "pano-vacuum-og-article-quote-with-drawing-1200x630.webp": (
        "车间全景偏右，1.18× + 提亮 1.10",
        "2 分｜模型嫌「没图纸」——字面主义，不改",
    ),
    "pano-vacuum-og-article-7-inspection-gates-1200x630.webp": (
        "成型后的 304L 不锈钢腔体（提亮 1.10）",
        "5 分｜成型腔体，符合「从图纸到出厂」的成品语义",
    ),
    "pano-vacuum-og-article-coating-chamber-cleaning-1200x630.webp": (
        "成型腔体另一档取景（1.08×，偏右下）",
        "1–2 分｜模型嫌「没体现清洁/颗粒」——字面主义，不改",
    ),
    "pano-vacuum-og-article-vacuum-furnace-design-1200x630.webp": (
        "车间内的腔体部件与法兰件（1.00×，偏上）",
        "可｜部件层次清楚",
    ),
    "pano-vacuum-og-manufacturing-precision-components-1200x630.webp": (
        "精密加工件与法兰（1.10×）",
        "可｜比旧版 2 分明显改善（旧版取景过紧）",
    ),
    "pano-vacuum-og-manufacturing-custom-vacuum-chambers-1200x630.webp": (
        "车间全景偏左（1.08×，提亮 1.10）",
        "可｜能看出是定制腔体的生产现场",
    ),
    "pano-vacuum-og-manufacturing-vacuum-tight-welding-1200x630.webp": (
        "TIG 焊接工位偏上取景（1.10×）",
        "完整体｜焊道主体完整，有工位与设备的层次",
    ),
    "pano-vacuum-og-about-1200x630.webp": (
        "车间全景（1.00×，提亮 1.10）",
        "5 分｜「大型不锈钢工业容器端面，切题」；旧版 2 分是因为裁得太近，认不出是工厂",
    ),
    "pano-vacuum-og-company-profile-1200x630.webp": (
        "车间全景（1280 宽源图，1.00×）",
        "可｜公司介绍语义匹配",
    ),
    "pano-vacuum-og-quote-1200x630.webp": (
        "车间全景偏左（1.08×）",
        "可｜询价页用生产现场，比摆拍更可信",
    ),
}

PAGE_CSS = """
  body{margin:0;padding:32px 24px 64px;background:#f6f7f9;font:14px/1.6 -apple-system,"PingFang SC","Hiragino Sans GB",sans-serif;color:#1f2733}
  h1{font-size:22px;margin:0 0 6px}
  .sub{color:#5b6577;margin:0 0 24px;font-size:13px}
  .note{max-width:1500px;margin:0 auto 24px;padding:12px 16px;background:#fff8e6;border:1px solid #f2d78a;border-radius:8px;font-size:13px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:22px;max-width:1500px;margin:0 auto}
  figure{margin:0;background:#fff;border:1px solid #e3e7ee;border-radius:10px;overflow:hidden;box-shadow:0 1px 2px rgba(16,24,40,.04)}
  figure img{display:block;width:100%;aspect-ratio:1200/630;object-fit:cover;background:#dfe3ea}
  figcaption{padding:10px 12px 12px}
  b{display:block;font:600 12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;word-break:break-all}
  .meta{display:block;color:#68738a;font-size:12px;margin:2px 0 6px}
  .what{display:block;font-size:12px;color:#2b3444;margin:0 0 6px}
  .verdict{display:block;font-size:12px;color:#0b5c33;background:#eaf7ef;border-left:3px solid #35a56b;padding:6px 8px;border-radius:0 4px 4px 0;margin:0 0 8px}
  ul{margin:0;padding-left:16px;font-size:12px;color:#3d4757;columns:2;column-gap:14px}
  li{break-inside:avoid}
  code{font-family:ui-monospace,Menlo,monospace;font-size:11.5px}
"""


def routes_by_image(build: Path) -> dict[str, list[str]]:
    """扫构建产物，返回 {图片文件名: [引用它的路由]}。"""
    used: dict[str, list[str]] = {}
    for page in sorted(build.rglob("*.html")):
        html = page.read_text(encoding="utf-8")
        m = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if not m:
            continue
        name = m.group(1).rsplit("/", 1)[-1]
        rel = page.relative_to(build).as_posix()
        route = "/" + ("" if rel == "index.html" else rel)
        used.setdefault(name, []).append(route)
    return used


def main(argv: list[str]) -> int:
    build = Path(argv[1]) if len(argv) > 1 else ROOT / "out"
    if not build.is_dir():
        print(f"构建产物目录不存在：{build}", file=sys.stderr)
        return 2
    used = routes_by_image(build)
    files = sorted(PUBLIC.glob("pano-vacuum-og-*.webp"))

    cards = []
    for f in files:
        name = f.name
        kb = f.stat().st_size / 1024
        routes = sorted(used.get(name, []))
        what, verdict = VERDICTS.get(name, ("（未登记画面说明）", "（未做视觉复核）"))
        lis = "".join(f"<li><code>{r}</code></li>" for r in routes)
        cards.append(
            f'<figure>\n  <img src="../public/{name}" alt="{name}" loading="lazy">\n  <figcaption>\n'
            f"    <b>{name}</b>\n"
            f'    <span class="meta">1200×630 · {kb:.0f} KB · 用于 {len(routes)} 个路由</span>\n'
            f'    <span class="what">画面：{what}</span>\n'
            f'    <span class="verdict">复核：{verdict}</span>\n'
            f"    <ul>{lis}</ul>\n  </figcaption>\n</figure>"
        )

    html = f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>帕诺真空 · 分享图（OG）总览 · {len(files)} 张</title>
<style>{PAGE_CSS}</style></head><body>
<h1>分享图（OG）总览 · {len(files)} 张 · 1200×630</h1>
<p class="sub">全部由 public/photos 里的真实厂内照片裁切（脚本 <code>scripts/gen-og-images.py</code>），无图库图/渲染图；未压任何文字，避免英文站分享卡出现中文。已上线 panovacuum.com 与 panovacuum.cn。</p>
<p class="note">「复核」一列是用 X99 上的 Qwen 视觉模型逐张看图后人工归纳的结论。该模型<b>认主体可靠</b>，但<b>判断裁切是否完整/朝向不可靠</b>（会把满宽裁切说成「右边被切掉」、把横构图说成「旋转 90 度」），所以这里只采信它「画面是什么、主体是否切题」的判断。仍有 3 张被判 1–2 分，理由是「画面里没有文章标题里的那个东西」（如没图纸、没体现清洁），属字面主义苛求，未再改。</p>
<div class="grid">
{chr(10).join(cards)}
</div></body></html>
"""
    OUT_HTML.write_text(html, encoding="utf-8")
    print(f"已生成 {OUT_HTML.relative_to(ROOT)}：{len(files)} 张卡，引用记录 {sum(len(v) for v in used.values())} 条，路由 {len({r for v in used.values() for r in v})} 个")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
