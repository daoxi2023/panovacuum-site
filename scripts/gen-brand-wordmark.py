#!/usr/bin/env python3
"""从 LOGO 源图裁出「帕诺真空」四个字，生成页眉/页脚用的品牌字 mask 图。

LOGO 源图（1536x1024 透明底）自下而上分四行：
    行1 y 184-368  图形标（2 块）
    行2 y 379-560  图形标（2 块）
    行3 y 586-783  「帕诺真空」四个汉字  ← 本脚本裁这一行
    行4 y 809-864  PANO VACUUM

网站页眉/页脚原先用系统字体渲染「帕诺真空」，与 LOGO 里的字形不一致。
这里直接取 LOGO 的原始字形，做轻微加粗（形态学膨胀），输出白描边透明底
的 webp，交给 CSS mask + background-color 上色，这样换主题色时无需重出图。

用法：
    python3 scripts/gen-brand-wordmark.py [LOGO源图路径]

默认源图 /Users/mac/Desktop/真空/pano-vacuum-tech-logo1.png。
输出：public/brand-wordmark.webp（2x，约 900px 宽）
"""
import sys
from pathlib import Path

from PIL import Image, ImageFilter

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "/Users/mac/Desktop/真空/pano-vacuum-tech-logo1.png")
OUT = Path(__file__).resolve().parent.parent / "public" / "brand-wordmark.webp"

# 「帕诺真空」所在行（原图像素坐标，留少量余量）
CROP = (300, 570, 1240, 800)
# 膨胀半径：LOGO 原字形偏中等粗细，网站标题需要更重，
# 2px（源图 197px 字高 ≈ 每边 1% 字高）后墨迹率从 0.458 提升到接近 0.50。
BOLD_RADIUS = 2


def main() -> None:
    logo = Image.open(SRC).convert("RGBA")
    band = logo.crop(CROP)
    alpha = band.split()[-1]

    # 提纯为二值，去抗锯齿噪点
    mask = alpha.point(lambda v: 255 if v > 40 else 0)

    # 加粗：MaxFilter 边长 = 2*radius+1
    if BOLD_RADIUS:
        size = 2 * BOLD_RADIUS + 1
        mask = mask.filter(ImageFilter.MaxFilter(size))

    bbox = mask.getbbox()
    if not bbox:
        raise SystemExit("裁切区域没有内容，请检查 CROP 坐标")
    mask = mask.crop(bbox)

    # 白色 + mask 作为 alpha，CSS 用 background-color 上色
    white = Image.new("RGBA", mask.size, (255, 255, 255, 0))
    white.putalpha(mask)

    # 2x 输出：保持源图分辨率（约 900px 宽），页面上按高度 36px 显示绰绰有余
    white.save(OUT, "WEBP", quality=95, method=6)

    ink = sum(mask.getdata()) / (255 * mask.size[0] * mask.size[1])
    print(f"源图: {SRC}")
    print(f"裁切: {bbox} -> {mask.size[0]}x{mask.size[1]}px, 加粗半径={BOLD_RADIUS}px, 墨迹率={ink:.3f}")
    print(f"输出: {OUT} ({OUT.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
