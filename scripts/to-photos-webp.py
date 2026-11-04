#!/usr/bin/env python3
"""把 /tmp/ai_out/*.png 转成站点用的 webp（按命名规范带宽度后缀）。"""
import os, sys
from PIL import Image, ImageFilter

SRC = "/tmp/ai_out"
DST = "/Users/mac/panovacuum-site/public/photos"

# 生成名 -> 输出宽度（None=跳过）
TARGETS = {
 "surface-finishing-polishing-stainless-chamber": 1200,
 "vacuum-chamber-drawing-review-desk": 1200,
 "factory-exterior-changshu": 1440,
 "equipment-laser-cutting-30000w": 1200,
 "equipment-press-brake-400t-6200mm": 1200,
 "equipment-overhead-crane-50t": 1200,
 "helium-leak-test-inficon-ul1000-console": 1200,
 "service-custom-vacuum-chambers-workshop": 1200,
 "service-precision-components-cmm-inspection": 1200,
 "service-vacuum-tight-welding-tig": 1200,
 "case-heavy-chamber-304l-8000mm": 1200,
 "case-custom-square-chamber": 1200,
 "packing-export-wooden-crate": 1200,
 "loading-truck-chamber-shipment": 1200,
 "inspection-incoming-material-spectrometer": 1200,
 "inspection-weld-visual-gauge": 1200,
 "inspection-final-report-chamber": 1200,
 "quote-review-meeting-chamber-drawing": 1200,
 "blog-helium-leak-test-vs-pressure-rise": 1200,
 "blog-vacuum-furnace-structure-design": 1200,
 "blog-coating-chamber-cleaning-particle-control": 1200,
 "inspection-cleanliness-white-cloth-wipe": 1200,
}

def convert(name, w, crop_h=None):
    src = os.path.join(SRC, name + ".png")
    if not os.path.exists(src):
        return None
    im = Image.open(src).convert("RGB")
    if crop_h:  # 裁成目标比例
        im = im.crop((0, 0, im.width, min(im.height, int(im.width / crop_h))))
    v = w / im.width
    h = int(round(im.height * v))
    im = im.resize((w, h), Image.LANCZOS)
    if v > 1.05:
        im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=70, threshold=3))
    out = os.path.join(DST, f"{name}-{w}w.webp")
    im.save(out, "WEBP", quality=82, method=6)
    return out, os.path.getsize(out)

# 文章封面：裁 3:2 后出 720w（coverSize 认 -720w → 720×480）
COVERS = [
    ("vacuum-chamber-drawing-review-desk", "vacuum-chamber-drawing-review-desk-720w"),
    ("blog-helium-leak-test-vs-pressure-rise", "blog-helium-leak-test-vs-pressure-rise-720w"),
    ("blog-vacuum-furnace-structure-design", "blog-vacuum-furnace-structure-design-720w"),
    ("blog-coating-chamber-cleaning-particle-control", "blog-coating-chamber-cleaning-particle-control-720w"),
]

def cover(name, outname, w=720):
    src = os.path.join(SRC, name + ".png")
    if not os.path.exists(src):
        return None
    im = Image.open(src).convert("RGB")
    tw, th = 3, 2
    if im.width / im.height > tw / th:
        nw = int(im.height * tw / th); x = (im.width - nw) // 2
        im = im.crop((x, 0, x + nw, im.height))
    else:
        nh = int(im.width * th / tw); y = (im.height - nh) // 2
        im = im.crop((0, y, im.width, y + nh))
    im = im.resize((w, int(round(im.height * w / im.width))), Image.LANCZOS)
    out = os.path.join(DST, outname + ".webp")
    im.save(out, "WEBP", quality=82, method=6)
    return out, os.path.getsize(out)

if __name__ == "__main__":
    os.makedirs(DST, exist_ok=True)
    for name, w in TARGETS.items():
        r = convert(name, w)
        print(f"{'SKIP' if not r else 'OK  '} {name}-{w}w.webp {'' if not r else r[1]}")
    for name, outname in COVERS:
        r = cover(name, outname)
        print(f"{'SKIP' if not r else 'OK  '} {outname}.webp {'' if not r else r[1]}")
