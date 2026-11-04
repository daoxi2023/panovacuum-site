#!/usr/bin/env python3
"""批量生成占位图：24 项，1280x880，8 步 fp8 + CPU 文本编码。可断点续跑。"""
import os, sys, time, json, urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from comfy_client import gen, HOST, _req  # noqa: E402
from comfy_wf_qwen21 import wf  # noqa: E402

OUT = "/tmp/ai_out"
W, H, STEPS, CFG, SEED0 = 1280, 880, 8, 2.5, 20261104
NEG = ""

BASE = ("photograph taken with a DSLR, realistic industrial documentation photography, "
        "natural daylight, no text, no watermark, no logo, no visible faces, "
        "clean stainless steel surfaces with realistic factory wear")

ITEMS = [
 ("surface-finishing-polishing-stainless-chamber",
  "a worker's gloved hands polishing the outer shell of a large cylindrical stainless steel vacuum chamber with a handheld orbital sander in a metal fabrication workshop, metal dust, sparks of light on brushed steel, wide shot"),
 ("vacuum-chamber-drawing-review-desk",
  "an engineer's hands unrolling a large technical drawing of a vacuum chamber on a wooden desk in a factory office, calipers, pencil, laptop at the edge, stainless steel chamber wall visible behind, over-the-shoulder wide shot"),
 ("factory-exterior-changshu",
  "exterior of a modern industrial factory building with grey steel cladding and large roller shutter doors, delivery yard, blue sky with light clouds, one forklift parked, wide architectural photograph, no signage"),
 ("equipment-laser-cutting-30000w",
  "a large fiber laser cutting machine cutting a thick stainless steel plate inside an industrial hall, bright cutting head, water-cooled cables, protective glass window of the machine enclosure, wide shot from the side"),
 ("equipment-press-brake-400t-6200mm",
  "a very long hydraulic press brake with a six meter bed bending a thick stainless steel plate in a fabrication workshop, control panel at the far end, sheet metal stock stacked behind, wide shot"),
 ("equipment-overhead-crane-50t",
  "a large industrial overhead bridge crane with a heavy steel hook lifting a big stainless steel vacuum vessel above a workshop floor, yellow crane beam, steel roof trusses, wide shot from below at an angle"),
 ("helium-leak-test-inficon-ul1000-console",
  "a helium mass spectrometer leak detector console with a small display and hoses connected to a stainless steel vacuum chamber on a test bench in a clean inspection room, close wide shot, dark grey instrument housing, no visible brand names"),
 ("service-custom-vacuum-chambers-workshop",
  "several large custom stainless steel vacuum chambers of different shapes standing in a bright fabrication workshop, flanges and ports visible, overhead crane rails in the ceiling, wide documentary shot"),
 ("service-precision-components-cmm-inspection",
  "a coordinate measuring machine probing a machined stainless steel flange component in a temperature controlled metrology room, granite table, soft even lighting, close medium shot"),
 ("service-vacuum-tight-welding-tig",
  "a TIG welding torch welding a thick stainless steel chamber seam, bright arc, argon gas lens, gloved hands only, dark welding bay with a welding screen in the background, close shot"),
 ("case-heavy-chamber-304l-8000mm",
  "an eight meter long horizontal cylindrical stainless steel vacuum vessel on saddles inside an industrial hall, polished surface, large flanged end cap, wide shot along the length of the vessel"),
 ("case-custom-square-chamber",
  "a large rectangular stainless steel vacuum chamber with a hinged door and many flanged ports standing in a workshop, brushed finish, ceiling lights reflected on the surface, wide three-quarter shot"),
 ("packing-export-wooden-crate",
  "a stainless steel vacuum chamber being packed into a wooden export crate with foam padding, strapping tools and a crowbar on the floor, warehouse setting, wide shot"),
 ("loading-truck-chamber-shipment",
  "a wooden export crate being loaded into a container truck by a forklift at a factory loading dock, daylight, warehouse doors open, wide shot"),
 ("inspection-incoming-material-spectrometer",
  "a handheld optical emission spectrometer being used to check a stainless steel plate in a material store room, operator gloved hand only, plate stack behind, medium shot"),
 ("inspection-weld-visual-gauge",
  "a weld inspector using a weld gauge and magnification loupe on a stainless steel weld seam of a vacuum chamber, gloved hands, workshop background out of focus, close shot"),
 ("inspection-final-report-chamber",
  "an engineer's hands writing a final inspection report on a clipboard beside a finished stainless steel vacuum chamber, pressure gauge and test certificate papers on a small table, medium wide shot"),
 ("quote-review-meeting-chamber-drawing",
  "four engineers standing around a large technical drawing spread on a table in a factory meeting room, pointing at a chamber drawing, laptops and coffee cups, stainless steel parts on the table, wide shot, faces not visible"),
 ("blog-helium-leak-test-vs-pressure-rise",
  "a helium leak detector connected with a thin hose to a small stainless steel test chamber next to an analog pressure gauge on a workbench in a laboratory, close wide shot"),
 ("blog-vacuum-furnace-structure-design",
  "a large cylindrical vacuum furnace with a thick insulated door open, graphite heating elements visible inside the hot zone, industrial workshop background, wide shot"),
 ("blog-coating-chamber-cleaning-particle-control",
  "an open rectangular vacuum coating chamber being wiped clean inside with a white lint free cloth by gloved hands, bright interior lighting, vacuum pumps at the rear, medium wide shot"),
 ("inspection-cleanliness-white-cloth-wipe",
  "a gloved hand wiping the inside surface of a stainless steel vacuum chamber with a white cleanroom cloth, residue visible on the cloth, bright inspection lamp, close shot"),
 # 2026-11-04 追加：产品总览页两族（真空炉 / 镀膜工艺腔）
 ("product-vacuum-furnace-chamber",
  "a large cylindrical vacuum heat-treatment furnace chamber standing in an industrial workshop, its front door swung open to reveal graphite heating elements and layered insulation inside, stainless steel outer shell with cooling water pipes, a heavy hinged flange ring, workshop floor visible, wide documentary shot"),
 ("product-coating-process-chamber",
  "a rectangular stainless steel vacuum coating chamber standing on a factory floor, its front door closed with a round observation window and two blank CF feedthrough flanges, side ports fitted with blank blind flange covers and bolt circles, no cables and no pipes attached to the chamber, clean machined stainless steel surfaces with visible weld seams and stiffening ribs, workshop background slightly out of focus, wide three-quarter shot"),
]

def free_and_wait(vram_wait=20):
    try: _req("/interrupt", {})
    except Exception: pass
    try: _req("/free", {"unload_models": True, "free_memory": True})
    except Exception: pass
    time.sleep(4)

def main(only=None):
    os.makedirs(OUT, exist_ok=True)
    log = open("/tmp/ai_out/log.txt", "a", buffering=1)
    for i, (name, desc) in enumerate(ITEMS, 1):
        if only and only not in name: continue
        png = os.path.join(OUT, name + ".png")
        if os.path.exists(png) and os.path.getsize(png) > 200000:
            log.write(f"[{i:02d}/{len(ITEMS)}] skip {name} (exists)\n"); continue
        prompt = f"{desc}. {BASE}"
        w = wf(prompt=prompt, neg=NEG, w=W, h=H, steps=STEPS, cfg=CFG,
               seed=SEED0 + i, clip="qwen3vl_8b_bf16.safetensors", ctype="qwen_image",
               unet="qwen_image_2.1_bf16.safetensors", dtype="fp8_e4m3fn", prefix="pano-" + name[:28])
        w["2"]["inputs"]["device"] = "cpu"
        t0 = time.time(); ok = False
        for attempt in (1, 2):
            try:
                data, dt = gen(w, timeout=1500)
                open(png, "wb").write(data); ok = True
                log.write(f"[{i:02d}/{len(ITEMS)}] OK {name} {dt:.0f}s {len(data)}B try{attempt}\n")
                break
            except Exception as e:
                log.write(f"[{i:02d}/{len(ITEMS)}] FAIL {name} try{attempt}: {str(e)[:300]}\n")
                free_and_wait()
                time.sleep(10)
        if not ok: log.write(f"[{i:02d}/{len(ITEMS)}] GIVEUP {name}\n")
    log.write("DONE\n")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
