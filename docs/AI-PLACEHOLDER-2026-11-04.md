# 占位图（AI 生成）——2026-11-04

> **性质声明：本文件列出的 21 张照片全部由 Qwen-Image 2.1 模型生成，不是实拍。**
> 用途仅为「网站临时可交付」：先让页面图文齐全，后续按 `docs/SHOT-LIST-2026-11-04.md`
> 逐项用实拍替换。**不得作为纪实素材对外宣称，不得用于认证/审核材料、投标文件、
> 客户案例档案**；页面上已有的说明文字（「以下内容依据设备台账与工艺记录整理」等）
> 不含「实拍」表述，但对外口头介绍时不要把这些图说成现场照片。

## 生成环境与参数

| 项 | 值 |
| --- | --- |
| 引擎 | ComfyUI 0.37.0，`http://100.106.75.99:8188`（X99，RX 7900 XTX / ROCm） |
| 底模 | `qwen_image_2.1_bf16.safetensors`，`weight_dtype=fp8_e4m3fn` |
| 文本编码 | `qwen3vl_8b_bf16.safetensors`，`type=qwen_image`，**device=cpu**（8B bf16 装不进显存） |
| VAE | `qwen_image_2.1_vae_bf16.safetensors` |
| 采样 | `EmptySD3LatentImage` 1280×880 → `ModelSamplingAuraFlow(shift=3.1)` → `KSampler(steps=8, cfg=2.5, euler/simple, denoise=1.0)` |
| 种子 | 20261104 起逐项递增 |
| 负面提示词 | 空字符串（该模型对此不敏感，靠正面提示词的统一后缀约束） |
| 提示词后缀 | `photograph taken with a DSLR, realistic industrial documentation photography, natural daylight, no text, no watermark, no logo, no visible faces, clean stainless steel surfaces with realistic factory wear` |
| 成本 | 稳态 70–79 秒/张（CPU 文本编码 + 8 步采样）；22 张约 30 分钟 |

脚本（已入库，可复现）：

- `scripts/comfy_client.py` — ComfyUI HTTP 客户端（提交 / 轮询 / 取图 / 释放显存）
- `scripts/comfy_wf_qwen21.py` — 上述工作流图定义
- `scripts/gen-ai-placeholder.py` — 22 项批量生成，断点续跑（已有 >200KB 的 PNG 跳过），日志 `/tmp/ai_out/log.txt`
- `scripts/to-photos-webp.py` — PNG → `public/photos/*-1200w.webp`（LANCZOS + `UnsharpMask(0.8,70,3)` + WEBP q82 m6），4 篇博客封面额外按 3:2 居中裁出 **720w**

## 落地清单（21 张，全部已在页面引用）

| # | 文件（`public/photos/`） | 尺寸 | 页面位置 |
| --- | --- | --- | --- |
| 1 | `equipment-laser-cutting-30000w-1200w.webp` | 1200×825 | 工厂能力介绍 → 设备与检验现场 |
| 2 | `equipment-press-brake-400t-6200mm-1200w.webp` | 1200×825 | 同上 |
| 3 | `equipment-overhead-crane-50t-1200w.webp` | 1200×825 | 同上 |
| 4 | `helium-leak-test-inficon-ul1000-console-1200w.webp` | 1200×825 | 同上 |
| 5 | `surface-finishing-polishing-stainless-chamber-1200w.webp` | 1200×825 | 同上 |
| 6 | `inspection-incoming-material-spectrometer-1200w.webp` | 1200×825 | 同上 |
| 7 | `inspection-weld-visual-gauge-1200w.webp` | 1200×825 | 同上 |
| 8 | `inspection-cleanliness-white-cloth-wipe-1200w.webp` | 1200×825 | 同上 |
| 9 | `inspection-final-report-chamber-1200w.webp` | 1200×825 | 同上 |
| 10 | `case-heavy-chamber-304l-8000mm-1200w.webp` | 1200×825 | 同上（8 米级卧式腔体） |
| 11 | `service-custom-vacuum-chambers-workshop-1200w.webp` | 1200×825 | 同上（多台腔体并行制作） |
| 12 | `packing-export-wooden-crate-1200w.webp` | 1200×825 | 案例示例 → 包装发运 |
| 13 | `loading-truck-chamber-shipment-1200w.webp` | 1200×825 | 案例示例 → 厂内装柜 |
| 14 | `case-custom-square-chamber-1200w.webp` | 1200×825 | 案例示例 → 方形/矩形腔体 |
| 15 | `factory-exterior-changshu-1440w.webp` | 1440×990 | 关于我们 → 同一厂区一段 |
| 16 | `quote-review-meeting-chamber-drawing-1200w.webp` | 1200×825 | 产业合作 → 先评审图纸 |
| 17 | `service-vacuum-tight-welding-tig-1200w.webp` | 1200×825 | 制造服务 → 真空密封焊接（原为成品腔体照片，不切题） |
| 18 | `vacuum-chamber-drawing-review-desk-720w.webp` | 720×480 | 博客《带图纸询价》封面 |
| 19 | `blog-helium-leak-test-vs-pressure-rise-720w.webp` | 720×480 | 博客《氦检 vs 压升法》封面 |
| 20 | `blog-vacuum-furnace-structure-design-720w.webp` | 720×480 | 博客《真空炉结构设计》封面 |
| 21 | `blog-coating-chamber-cleaning-particle-control-720w.webp` | 720×480 | 博客《镀膜腔清洁与颗粒控制》封面 |

未使用（生成后判定冗余、已删除，避免死资源）：`service-precision-components-cmm-inspection-1200w`（本厂已有真 CMM 照片在用）、`vacuum-chamber-drawing-review-desk-1200w`（只需 720w 封面）、三张博客的 1200w 版本。

## 视觉复核（X99 STRATA 视觉模型 8082）

只采信「画面是什么 / 切不切题」，不采信模型对裁切、朝向、小字 OCR 的说法。

| 图 | 评分 | 破绽 |
| --- | --- | --- |
| `surface-finishing-polishing-stainless-chamber-1200w` | 4/5 | 打磨机电源线悬空、走向不自然；手套与机身握持处边缘融合 |
| `equipment-overhead-crane-50t-1200w` | 4/5 | 无明显破绽（光影、透视、机械结构合理） |
| 整页截图（company-profile / case-studies） | — | 版式正常，无图片错位/空白大块/文字压图；照片「看起来像真实工厂照片」，无结构扭曲 |

## 替换规则

1. **实拍一到，同位置换图**：新文件名照 `docs/SHOT-LIST-2026-11-04.md` 的规范（`<subject>-<qualifier>-<scene>-<width>w.webp`），尽量换文件名而不是覆盖同名文件（`/photos/*` 缓存 30 天 + SWR）。
2. 换完删掉对应 AI 文件，并从本清单划掉；全部替换完，本文件可归档删除。
3. **AI 图绝不进入**：OG 分享图（`pano-vacuum-og-*`）、合作伙伴 logo 墙、任何带认证/资质含义的位置。
4. 若某张 AI 图被客户或审核方质疑，直接换成本厂真图（首页/公司介绍里现成的 20 余张真照片都可复用），不要争辩「像不像」。

## 追加：产品总览页两族示意（同日，第 22–23 张）

新增 `/zh/products/`、`/en/products/` 总览页时，六个产品族里只有「真空炉腔体」和「镀膜工艺腔体」两类没有真图（其余四族用首页/公司介绍里的真照片）。为让页面图文齐全，按同一套参数再生成两张；同批的 `scripts/gen-ai-placeholder.py` 已补入这两项提示词（原 22 项 → 24 项），可复现。

| # | 文件（`public/photos/`） | 尺寸 | 页面位置 |
| --- | --- | --- | --- |
| 22 | `product-vacuum-furnace-chamber-1200w.webp` | 1200×825 | 产品 → 真空炉与热处理腔体卡片 |
| 23 | `product-coating-process-chamber-1200w.webp` | 1200×825 | 产品 → 镀膜与沉积工艺腔体卡片 |

生成与复核记录：

- 两图都是 1280×880 → 1200×825（LANCZOS，缩小不需要锐化），WEBP q82 m6；炉体 63 KB、镀膜 23 KB。
- 镀膜腔第一版被视觉复核指出「右侧法兰接出的蓝色线缆穿过法兰中心、铰链与密封槽细节糊」，改成「门关闭 + 盲板法兰、不接线缆」的提示词重生成一版；第二版无管路，细节可接受，仍属示意图级别。
- 视觉结论（只采信主体与切题判断）：炉体 = 卧式真空热处理炉腔、门开、内部加热区可见，可作「真空炉腔体」示意；镀膜 = 方形工艺腔、观察窗 + 盲板法兰 + 铰链门，可作「镀膜工艺腔体」示意。两图均有 AI 图通病（焊缝过于平滑、方形腔缺加强筋细节），只在卡片尺寸（220px 高）使用，不做大图展示。

合规补充：

- 产品页文案不写型号、不做报价、不承诺整机真空度；六族的材料/成形/检验口径均取自设备台账，尺寸与公差统一写「按图纸评审确认」。
- 产品页 OG（`pano-vacuum-og-products-1200x630.webp`）**用的是真图**（数吨级卧式腔体 `multi-ton-304l-vacuum-chamber-1600w`），没有用 AI 图，符合本文件「AI 图不进 OG」的规则。
