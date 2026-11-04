#!/usr/bin/env python3
"""生成全站 18 张分享图（OG，1200×630）。

设计要点
--------
1. 源图只用 `public/photos/` 里的真实厂内实拍，不用图库图/渲染图
   （`uhv-feedthrough-flange-assembly-1600w.webp` 版权来源待核实，不参与）。
2. 同一张源图服务多个页面时必须换取景，否则 18 个文件其实是同一张图
   （首版就踩过：sha256 只 5 种）。这里用 z/fx/fy 三参数区分。
3. 裁剪公式固定，见 crop()：先按目标宽高比 A=1200/630 取最大内接框，
   再按 z 放大（z>1 更近），最后按 fx/fy 在剩余空间里定位（0=左上/上，1=右下/下）。
4. 720 宽的源图（氦检实拍）会放大到 1200 宽，放大后补一道轻量 USM，
   避免分享卡片上发散。
   经视觉复核，`vacuum-leak-test-room-door-720w.webp`（原名 surface-finishing-*，实拍是「真空检漏室」
   门 + 中英文标牌）和 `vacuum-chamber-quotation-drawing-640w.webp`（实拍里并没有图纸）
   两文件名与内容不符，不参与分享图；S_CLEANBAY / S_DRAWING 只留作记录。
5. `default` 是品牌卡：压暗 + 降饱和 + 居中白色字标，故意不带任何中文正文
   （中文字形渲染不可靠，且会串到英文页面的分享卡上）。

用法
----
    python3 scripts/gen-og-images.py            # 全部重出
    python3 scripts/gen-og-images.py og-about og-quote   # 只重出指定项（按 key 匹配）
    python3 scripts/gen-og-images.py --list     # 只列出配方
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "public" / "photos"
OUT = ROOT / "public"

W, H = 1200, 630
A = W / H

# 源图简写
S_MULTI = "multi-ton-304l-vacuum-chamber-1600w.webp"
S_SHOP1440 = "vacuum-chamber-workshop-changshu-1440w.webp"
S_SHOP1280 = "vacuum-chamber-workshop-changshu-1280w.webp"
S_WELD = "tig-welding-station-vacuum-chamber-1600w.webp"
S_PARTS = "vacuum-chamber-workshop-components-1600w.webp"
S_CUSTOM = "custom-vacuum-chamber-304l-stainless-1200w.webp"
S_HELIUM = "helium-leak-test-ul1000-vacuum-chamber-720w.webp"
# 下面两张经视觉复核内容与文件名不符，故不进 RECIPES（保留常量仅为记录）
S_CLEANBAY = "vacuum-leak-test-room-door-720w.webp"           # 实拍：真空检漏室门 + 标牌
S_DRAWING = "vacuum-chamber-quotation-drawing-640w.webp"      # 实拍：腔体设备，无图纸

# key: (源图, z, fx, fy, 亮度增益)
# 页面归属见 lib/og.ts；改这里必须同步改 docs/ASSET-NAMING-2026-11-03.md 的配方表。
RECIPES: dict[str, tuple[str, float, float, float, float]] = {
    # 品牌卡：压暗 + 字标，参数在 draw_default() 里
    "default": (S_MULTI, 1.00, 0.50, 0.50, 1.00),
    # 车间全景（S2 偏暗，提亮 1.10）
    "about": (S_SHOP1440, 1.00, 0.50, 0.50, 1.10),
    "company-profile": (S_SHOP1280, 1.00, 0.50, 0.50, 1.00),
    "quote": (S_SHOP1280, 1.08, 0.42, 0.55, 1.00),
    # 焊接工位：有工位、有人和设备的层次，比纯部件更像「车间」
    "blog": (S_WELD, 1.00, 0.50, 0.50, 1.00),
    # 检漏：INFICON UL1000 实拍（720 宽，放大 + USM），是唯一真正对得上「检漏」的素材
    "blog-topic-leak-testing": (S_HELIUM, 1.00, 0.50, 0.50, 1.00),
    "article-helium-leak-test": (S_HELIUM, 1.12, 0.45, 0.55, 1.00),
    # 洁净与颗粒：用受控焊接工位（合规文案里就是「受控洁净焊接环境」）
    # 注意：vacuum-leak-test-room-door 那张实拍是「真空检漏室」门+标牌（原名 surface-finishing-*），不用于 OG
    "blog-topic-clean-particle": (S_WELD, 1.18, 0.42, 0.50, 1.00),
    # 询价/交期：车间里谈图纸与排产，用车间实拍（quotation-drawing 那张实拍里其实没有图纸）
    "blog-topic-quote-delivery": (S_SHOP1280, 1.08, 0.55, 0.45, 1.00),
    "article-quote-with-drawing": (S_SHOP1440, 1.18, 0.60, 0.45, 1.10),
    # 大腔体（S1）
    "blog-topic-design-materials": (S_MULTI, 1.00, 0.50, 0.45, 1.00),
    "article-material-304l-316l": (S_MULTI, 1.10, 0.50, 0.40, 1.00),
    # 成型腔体（S5 偏暗，提亮 1.10）
    "article-7-inspection-gates": (S_CUSTOM, 1.00, 0.50, 0.50, 1.10),
    "article-coating-chamber-cleaning": (S_CUSTOM, 1.08, 0.55, 0.50, 1.10),
    # 部件与法兰（S4）
    "article-vacuum-furnace-design": (S_PARTS, 1.00, 0.50, 0.42, 1.00),
    "manufacturing-precision-components": (S_PARTS, 1.10, 0.50, 0.45, 1.00),
    # 车间 + 焊接（S2/S3 的第二档取景）
    "manufacturing-custom-vacuum-chambers": (S_SHOP1440, 1.08, 0.45, 0.50, 1.10),
    "manufacturing-vacuum-tight-welding": (S_WELD, 1.10, 0.50, 0.45, 1.00),
}


def crop(im: Image.Image, z: float, fx: float, fy: float) -> Image.Image:
    """按 1200:630 取景：最大内接框 → 按 z 放大 → 按 fx/fy 定位。"""
    w, h = im.size
    cw = min(w, h * A) / z
    ch = cw / A
    if ch > h:  # z<1 时别越界
        ch = h
        cw = ch * A
    left = round((w - cw) * fx)
    top = round((h - ch) * fy)
    return im.crop((left, top, left + round(cw), top + round(ch)))


def finish(im: Image.Image, gain: float) -> Image.Image:
    scale = W / im.size[0]
    out = im.resize((W, H), Image.LANCZOS)
    if gain != 1.0:
        out = ImageEnhance.Brightness(out).enhance(gain)
    if scale > 1.05:  # 放大过的补一点锐度
        out = out.filter(ImageFilter.UnsharpMask(radius=0.8, percent=70, threshold=3))
    return out


def draw_default(im: Image.Image) -> Image.Image:
    """品牌卡：压暗 0.52、降饱和 0.85，居中叠白色字标（640px 宽）。"""
    card = finish(im, 1.0)
    card = ImageEnhance.Brightness(card).enhance(0.52)
    card = ImageEnhance.Color(card).enhance(0.85)
    mark = Image.open(OUT / "pano-vacuum-wordmark-896w.webp").convert("RGBA")
    mw = 640
    mark = mark.resize((mw, round(mark.size[1] * mw / mark.size[0])), Image.LANCZOS)
    card.paste(mark, ((W - mark.size[0]) // 2, (H - mark.size[1]) // 2), mark)
    return card


def main(argv: list[str]) -> int:
    only = [a for a in argv[1:] if not a.startswith("-")]
    if "--list" in argv:
        for k, (src, z, fx, fy, g) in RECIPES.items():
            print(f"{k:42s} {src:52s} z={z:<4} fx={fx:<4} fy={fy:<4} gain={g}")
        return 0

    made = 0
    for key, (src, z, fx, fy, gain) in RECIPES.items():
        if only and not any(o in key for o in only):
            continue
        src_path = PHOTOS / src
        if not src_path.is_file():
            print(f"✗ 缺源图 {src_path}")
            return 1
        im = Image.open(src_path).convert("RGB")
        card = draw_default(im) if key == "default" else finish(crop(im, z, fx, fy), gain)
        name = f"pano-vacuum-og-{key}-{W}x{H}.webp"
        card.save(OUT / name, "WEBP", quality=82, method=6)
        made += 1
        print(f"✓ {name:64s} ← {src} (z={z} fx={fx} fy={fy} ×{gain})")
    print(f"\n共 {made} 张")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
