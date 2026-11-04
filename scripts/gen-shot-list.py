#!/usr/bin/env python3
"""生成《待补素材清单》（图片 + 视频关机位/命名/交付规格）。

只列「现在真正缺的」：编 checklist 之前先扫构建产物，确认哪些页面缺图、哪些图是借用别页的。
输出：
  - /Users/mac/Desktop/帕诺真空_待补素材清单_2026-11-04.xlsx
  - docs/SHOT-LIST-2026-11-04.md

用法：python3 scripts/gen-shot-list.py [输出目录]
"""

from __future__ import annotations

import sys
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parent.parent
DATE = "2026-11-04"

HDR_FILL = PatternFill("solid", fgColor="1F3864")
HDR_FONT = Font(color="FFFFFF", bold=True, size=11)
P0_FILL = PatternFill("solid", fgColor="FCE4E4")
P1_FILL = PatternFill("solid", fgColor="FFF4D6")
P2_FILL = PatternFill("solid", fgColor="E8F0FB")
THIN = Side(style="thin", color="BFC7D5")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
WRAP = Alignment(wrap_text=True, vertical="top")

# --------------------------------------------------------------------------
# 图片：编号, 优先级, 文件名, 交付尺寸, 放哪些页面, 页面现状, 拍什么, 机位/构图, 数量, 红线, alt 中文, alt 英文
# --------------------------------------------------------------------------
IMAGES = [
    ("IMG-201", "P0", "photos/surface-finishing-polishing-stainless-chamber-1200w.webp",
     "1200×800 起（3:2 原图）",
     "首页 /zh/ /en/「表面处理与清洗」卡片；可兼作洁净颗粒文章封面",
     "⚠ 现在借用 TIG 焊接工位照，卡片写的是「表面处理与清洗」，图文不符",
     "不锈钢腔体的抛光/酸洗钝化作业：手持抛光机或百叶轮在焊缝、筒身作业，能看到工具接触金属、处理后出现亮面",
     "侧 45°，手＋工具＋被处理表面三要素同框；收小光圈让表面质感清楚；避免逆光",
     "3–5 张选 1",
     "不得出现「ISO Class / 洁净室」字样标识；不拍他人姓名牌；不露客户图号",
     "不锈钢腔体焊缝抛光作业，处理后表面呈亮面",
     "Polishing a stainless steel chamber weld seam before passivation"),
    ("IMG-202", "P0", "photos/vacuum-chamber-drawing-review-desk-1200w.webp",
     "1200×800 起（3:2 原图）",
     "文章《真空腔体怎么询价：一张图纸就够了》封面",
     "⚠ 现在用的 vacuum-chamber-quotation-drawing-640w.webp 实拍里根本没有图纸（文件名也待改）",
     "桌面俯拍：摊开的 A1/A3 腔体图纸 ＋ 记号笔/卡尺/标注；或显示器上的 CAD 三视图；可露出双手在指图纸",
     "45° 俯拍或正俯拍，图纸占画面 60% 以上；桌面留少量空间放笔和笔记本",
     "3–5 张选 1",
     "客户名称、图号、技术参数必须不可辨识（用自有项目图或后期打码）",
     "桌面上的真空腔体装配图纸与标注",
     "Vacuum chamber assembly drawing marked up on a workshop desk"),
    ("IMG-203", "P0", "photos/factory-exterior-changshu-1440w.webp",
     "1440×960 起（原图 ≥2400 长边）",
     "/about/ 首图；/company-profile/ 首图；首页 #about 区",
     "现在 about 页只有 1 张焊接工位照，看不出是多大一个厂",
     "厂区外景 ＋ 大门门头/招牌（PANO Vacuum 中英文）＋ 厂房立面，晴天顺光",
     "广角全景（手机 0.5× 或无人机 50–80m）；建筑居中偏右，左上方留天；地平线拉平",
     "3–5 张选 1",
     "画面里不得出现其他公司/园区招牌；车牌不可辨识；不要拍到电线杆横穿画面",
     "帕诺真空常熟厂区外景与厂门",
     "PANO Vacuum plant exterior and main gate in Changshu"),
    ("IMG-204", "P1", "photos/team-zhouyou-sales-portrait-800w.webp 等 4 张（团队四岗）",
     "800×800 起（4:5 或 1:1）",
     "博客作者署名卡；/about/ 团队区；/company-profile/",
     "现在团队只有文字与邮箱，没有真人照片（E-E-A-T 上的短板）",
     "四个岗位各一张工作状态半身像：商务（周游）、工艺、焊接、质检；各自穿着对应的工装/护具，背景是本人工作场景虚化",
     "85mm 等效、f/2.8、胸像、眼神看镜头；自然光或柔光；同一批同一色调，便于并排",
     "每人 3–5 张选 1（共 4 人）",
     "工装与护具要到齐（焊接须有面罩/防护）；不要摆拍打灯摄影棚感",
     "帕诺真空<岗位>负责人<姓名>",
     "PANO Vacuum <role> lead <name>"),
    ("IMG-205", "P1", "photos/equipment-laser-cutting-30000w-1200w.webp",
     "1200×800 起",
     "首页能力区补充；/manufacturing/*；/company-profile/ 设备段",
     "设备台账里有 3 万瓦激光，但全站没有一张对应实拍（有能力没证据）",
     "3 万瓦激光切割厚板：切割头正在切、火花下溅、板面切口可见；或切割中的红光与熔渣特写",
     "侧面 30–45°，切缝走向画面纵深；快门 1/500 以上定格火花；护目镜/防护门要正确",
     "3–5 张选 1",
     "不拍操作员正脸（安全与隐私）；功率数字若入画面须与台账一致（3 万瓦/30000W）",
     "3 万瓦激光切割厚不锈钢板",
     "30 kW laser cutting thick stainless steel plate"),
    ("IMG-206", "P1", "photos/equipment-press-brake-400t-6200mm-1200w.webp",
     "1200×800 起",
     "同上",
     "台账有 400 吨 · 6.2m 折弯，缺图",
     "400 吨折弯机折 6.2 米大板：上下模合拢瞬间，板料弯折成 V 形；侧面能看出机器长度",
     "斜侧 45° 拍机器全长＋板料；合拢瞬间连拍；地面整洁不要杂物",
     "3–5 张选 1",
     "模具与板料规格若入画面须与台账一致（400t、6200mm）",
     "400 吨 6.2 米折弯机正在折弯不锈钢板",
     "400-tonne, 6.2 m press brake forming a stainless plate"),
    ("IMG-207", "P1", "photos/equipment-overhead-crane-50t-1200w.webp",
     "1200×800 起",
     "同上；案例页体现腔体尺寸上限",
     "台账有 50 吨行车，缺图",
     "50 吨行车吊装大型腔体：腔体悬空、吊带受力的瞬间，地面有人做引导（远景）",
     "低机位仰拍突出体量；腔体占画面 1/3–1/2；不要仰到只剩钢梁",
     "3–5 张选 1",
     "必须确认吊装作业合规（吊带、警戒）；有人在场要戴安全帽且不露正脸",
     "50 吨行车吊装大型不锈钢真空腔体",
     "50-tonne overhead crane lifting a large stainless vacuum chamber"),
    ("IMG-208", "P1", "photos/helium-leak-test-inficon-ul1000-console-1200w.webp",
     "1200×800 起（现有同类图只有 720w，偏小）",
     "首页「氦质谱检漏与装配」卡；7 道检验；服务页",
     "现有 helium-leak-test-ul1000-vacuum-chamber-720w.webp 可用但只有 720 宽，2× 屏偏软",
     "UL1000 与待检腔体接管连接：检漏仪面板与屏幕读数同框，读数要能看（1×10⁻⁹ 量级）",
     "正侧 30°，屏幕尽量正视避免反光看不清；环境光压低让屏幕亮",
     "3–5 张选 1",
     "屏幕读数必须是真实测试值；不得 P 图改数值；型号标注与实物一致",
     "INFICON UL1000 氦质谱检漏仪与腔体接管，屏幕显示漏率",
     "INFICON UL1000 helium leak detector connected to a chamber, leak rate on screen"),
    ("IMG-209", "P1", "photos/service-custom-vacuum-chambers-workshop-1200w.webp",
     "1200×800 起",
     "/manufacturing/custom-vacuum-chambers/ 正文",
     "⚠ 现在复用首页 hero 图，服务页之间图片重复，页面「独立实体」信号弱",
     "定制腔体从图纸到成品的现场：半成品腔体立在工装架上，旁边是图纸或检验记录",
     "3/4 侧，腔体为主，背景是车间纵深（有设备但不抢主体）",
     "3–5 张选 1",
     "同 IMG-202：图纸/图号不可辨识",
     "定制不锈钢真空腔体半成品与工装架",
     "Custom stainless vacuum chamber in fabrication on a fixture stand"),
    ("IMG-210", "P1", "photos/service-precision-components-cmm-inspection-1200w.webp",
     "1200×800 起",
     "/manufacturing/precision-components/ 正文",
     "⚠ 现在复用首页三坐标图（720w）",
     "精密加工件与三坐标检测同框：批量零件摆盘 ＋ 关节臂在测其中一件",
     "先给「批量＋单件」的俯拍，再给测针接触工件的特写，两张一组",
     "3–5 张选 1",
     "零件上客户标识要避开或打码",
     "精密真空零件批量摆盘与三坐标检测",
     "Vacuum-grade components in a tray being measured on a CMM"),
    ("IMG-211", "P1", "photos/service-vacuum-tight-welding-tig-1200w.webp",
     "1200×800 起",
     "/manufacturing/vacuum-tight-welding/ 正文",
     "⚠ 现在复用首页成型腔体照，与焊接主题不符",
     "TIG 焊枪沿腔体纵缝行走：弧光、熔池、焊道鱼鳞纹清晰",
     "低角度贴焊缝拍（镜头几乎平行焊道）；快门 1/125–1/250，光圈 f/5.6–f/8；戴好护具",
     "3–5 张选 1",
     "不拍焊工正脸；不夸大为「全自动」（有自动焊就拍自动焊）",
     "TIG 焊枪沿真空腔体纵缝焊接，焊道呈鱼鳞纹",
     "TIG torch running a longitudinal seam on a vacuum chamber"),
    ("IMG-212", "P1", "photos/case-heavy-chamber-304l-8000mm-1200w.webp",
     "1200×800 起",
     "/case-studies/ 卡 1；首页案例区",
     "案例页现在只有 2 张借用图，缺少「几吨重」的体量证据",
     "重型腔体成品落地或吊装中：旁边站一个人做尺度参照（远景），能看出直径与长度",
     "低机位、广角；(人物身高)对比是本张图的关键",
     "3–5 张选 1",
     "客户场景/标识要避开；不得暗示超出台账的尺寸能力",
     "重达数吨的 304L 不锈钢真空腔体成品",
     "Multi-tonne 304L stainless vacuum chamber finished for dispatch"),
    ("IMG-213", "P1", "photos/case-custom-square-chamber-1200w.webp",
     "1200×800 起",
     "/case-studies/ 卡 2–3",
     "同上",
     "非标方箱腔体成品：门框、观察窗、多接口法兰齐全，摆放整齐",
     "正视或 3/4；背景干净（卷帘门/白墙），突出接口数量",
     "3–5 张选 1",
     "接口/法兰数量以实际为准，不额外摆拍加件",
     "带观察窗与多法兰接口的非标方形真空腔体",
     "Custom square vacuum chamber with viewport and multiple flanges"),
    ("IMG-214", "P1", "photos/packing-export-wooden-crate-1200w.webp",
     "1200×800 起",
     "/case-studies/ 交付段；/manufacturing/custom-vacuum-chambers/",
     "现在完全没有包装/发运画面，交付能力无视觉证据",
     "出口木箱包装：腔体已入箱、防锈膜/干燥剂、箱体标签（品牌＋去向，脱敏）",
     "正面平视，箱体占画面 2/3；箱内打开一角露出腔体",
     "3–5 张选 1",
     "箱体上的客户名/地址/电话号码必须完全遮挡",
     "出口木箱包装内的不锈钢真空腔体",
     "Stainless vacuum chamber packed in an export wooden crate"),
    ("IMG-215", "P1", "photos/loading-truck-chamber-shipment-1200w.webp",
     "1200×800 起",
     "/case-studies/ 交付段",
     "同上",
     "装车发运：木箱被行车吊入车厢、固定带拉紧的瞬间",
     "斜侧 45°，车厢与木箱同框；拍出「真的在发货」的动作",
     "3–5 张选 1",
     "车牌与物流公司标识要遮挡",
     "腔体木箱装车发运",
     "Packed chamber being loaded onto a truck for shipment"),
    ("IMG-216", "P1", "photos/inspection-incoming-material-spectrometer-1200w.webp",
     "1200×800 起",
     "/about/ 或质量段；首页 7 道检验",
     "7 道检验目前纯文字，无图",
     "来料检验：手持光谱仪打钢板/法兰，屏幕显示材质成分；或卡尺测厚",
     "过肩视角，手＋仪器＋材料同框；屏幕尽量正视",
     "3–5 张选 1",
     "读数须真实；不得摆拍成「实验室」",
     "来料不锈钢板材质光谱检测",
     "Incoming stainless plate checked with a handheld spectrometer"),
    ("IMG-217", "P1", "photos/inspection-weld-visual-gauge-1200w.webp",
     "1200×800 起",
     "/about/ 或质量段",
     "同上",
     "焊缝外观检验：检验尺/放大镜贴焊缝，量焊缝余高与错边",
     "贴焊缝 30–45°，尺子刻度清楚但不夸张",
     "3–5 张选 1",
     "量具读数要真实，避免被解读为「全部合格」的绝对结论",
     "用焊缝检验尺测量真空腔体焊缝余高",
     "Weld inspection gauge checking reinforcement height on a chamber seam"),
    ("IMG-218", "P1", "photos/inspection-final-report-chamber-1200w.webp",
     "1200×800 起",
     "/case-studies/；首页 7 道检验收尾",
     "同上",
     "出厂终检：成品腔体与检验记录表/报告同框（报告内容打码或只露表头与签字栏）",
     "腔体在左、报告在右平铺桌面，俯拍 30°",
     "3–5 张选 1",
     "报告里的客户名/项目号/数值必须遮挡；不得露出未获证的资质字样",
     "真空腔体出厂终检记录与成品同框",
     "Final inspection report and finished chamber before dispatch"),
    ("IMG-219", "P1", "photos/quote-review-meeting-chamber-drawing-1200w.webp",
     "1200×800 起",
     "/request-a-quote/（现在这一页 0 张照片）",
     "⚠ 询价页完全无图，转化页缺可信度",
     "图纸评审会：两三个人围着桌面图纸讨论、有人指标注、笔记本上记节点计划",
     "略高机位俯拍，人物在手边/边缘（不露正脸），图纸与笔记是主体",
     "3–5 张选 1",
     "同 IMG-202 脱敏；不要摆出「客户」字样",
     "工程师围着图纸做真空腔体可制造性评审",
     "Engineers reviewing a chamber drawing for manufacturability"),
    ("IMG-220", "P2", "photos/partners/partner-logo-<slug>-760w.webp（15 张）",
     "760×≤200（按各家原始比例，透明背景 PNG/WEBP 优先）",
     "首页 logo 墙；/company-profile/；/industrial-partnerships/",
     "现有 15 张只有 ~380px 宽，2× 屏会糊",
     "向每家索取矢量（SVG/AI/EPS）或高清 PNG；拿不到就按现有文件等比放大重绘",
     "统一高度 80–120px、统一留白；透明底；单色版备用",
     "每家 1 份",
     "使用前确认授权（书面/邮件即可）；未获授权的不上墙",
     "（装饰性 logo，alt 用企业中文名）",
     "（logo alt 用企业英文名）"),
    ("IMG-221", "P2", "photos/blog-helium-leak-test-vs-pressure-rise-1200w.webp",
     "1200×800 起",
     "文章《氦检和压降法，差五个数量级》专属封面",
     "现在与能力卡共用检漏仪图",
     "同 IMG-208 的另一角度：检漏仪与腔体、或测试曲线屏幕特写",
     "横向 3:2，主体偏右给标题留白",
     "3 张选 1",
     "读数真实",
     "氦检曲线屏幕与腔体接管",
     "Helium leak test curve on screen with chamber connected"),
    ("IMG-222", "P2", "photos/blog-vacuum-furnace-structure-design-1200w.webp",
     "1200×800 起",
     "文章《真空炉结构设计的五个决定》专属封面",
     "现在借用成型腔体照",
     "真空炉/加热腔体的炉膛、隔热屏或水冷夹套（有实物就拍实物）",
     "沿炉膛轴向拍纵深；或拍隔热屏层叠结构",
     "3 张选 1",
     "不暗示能做整机炉（红线：只承诺腔体与配套件）",
     "真空炉腔体炉膛与隔热屏",
     "Vacuum furnace chamber with heat shields"),
    ("IMG-223", "P2", "photos/blog-coating-chamber-cleaning-particle-control-1200w.webp",
     "1200×800 起",
     "文章《镀膜腔体洗得再干净，为什么还是抽不下去》专属封面",
     "现在借用成型腔体照",
     "清洗后的腔体内壁特写（白布擦拭或内窥镜画面），或烘烤/抽气中的腔体＋真空计",
     "微距贴内壁，体现「表面状态」；或腔体＋真空计同框",
     "3 张选 1",
     "不得写「洁净室等级」",
     "清洗后的真空腔体内壁检查",
     "Inspecting the cleaned inner wall of a vacuum chamber"),
    ("IMG-224", "P2", "photos/inspection-cleanliness-white-cloth-wipe-1200w.webp",
     "1200×800 起",
     "质量段补充（可选）",
     "无",
     "清洁度检查：白布/白手套擦拭内壁后的对比，或颗粒收集滤膜",
     "微距，白布与内壁同框，光线均匀",
     "3 张选 1",
     "不得暗示达到某个洁净度等级",
     "白布擦拭检查腔体内壁清洁度",
     "White-cloth wipe check of the chamber inner wall"),
]

# --------------------------------------------------------------------------
# 视频：编号, 优先级, 文件名, 放哪, 时长, 规格, 拍什么, 红线
# --------------------------------------------------------------------------
VIDEOS = [
    ("VID-201", "P0", "video/surface-finishing-polishing-loop-1920x1080.mp4",
     "首页「表面处理与清洗」卡片 hover/展开；服务页",
     "10–15s 循环",
     "1920×1080 / H.264 / 25–30fps / 8–12 Mbps / 无音轨",
     "抛光或酸洗钝化作业过程：工具接触金属 → 亮面出现 → 收尾擦拭；首尾要能无缝循环",
     "不烧字幕；不出现他人姓名牌；拍摄前确认安全防护"),
    ("VID-202", "P0", "video/helium-leak-test-chamber-1920x1080.mp4",
     "首页「氦质谱检漏与装配」卡；/manufacturing/*；/case-studies/",
     "20–30s",
     "1920×1080 / H.264 / 25–30fps / 8–12 Mbps / 无音轨（或留现场声）",
     "完整检漏流程：接管 → 抽真空 → 喷氦 → 屏幕曲线/读数稳定；屏幕必须能看清量级",
     "读数为真实值；不得加速改变曲线形态；型号标注与实物一致"),
    ("VID-203", "P1", "video/tig-welding-seam-closeup-1920x1080.mp4",
     "焊接服务页；首页焊接卡；社媒",
     "10–15s 循环",
     "1920×1080 / H.264 / 25–30fps / 8–12 Mbps / 无音轨",
     "TIG 焊道行进特写：熔池、鱼鳞纹成形；慢拍可用 60fps 后期 0.5×",
     "不拍正脸；不得暗示超出实际自动化程度的「无人焊接」"),
    ("VID-204", "P1", "video/cmm-inspection-flange-1920x1080.mp4",
     "精密加工服务页；质量段",
     "15s",
     "1920×1080 / H.264 / 25–30fps / 8–12 Mbps / 无音轨",
     "三坐标测针沿法兰孔位逐点触测；屏幕坐标跳动与零件同框",
     "读数与零件对应真实；客户标识打码"),
    ("VID-205", "P1", "video/factory-workshop-panorama-1920x1080.mp4",
     "首页 #about；/about/；/company-profile/",
     "20–30s 循环",
     "1920×1080 / H.264 / 25–30fps / 8–12 Mbps / 无音轨",
     "车间全景运动镜头（轨道/稳定器/无人机），从设备阵列推向正在作业的工位",
     "画面里不得出现其他公司标识；人员戴齐护具"),
    ("VID-206", "P2", "video/packing-shipment-chamber-1920x1080.mp4",
     "/case-studies/ 交付段",
     "15–20s",
     "1920×1080 / H.264 / 25–30fps / 8–12 Mbps / 无音轨",
     "包装 → 吊装 → 装车固定，三个动作剪成一条",
     "车牌/物流标识遮挡；箱体客户信息遮挡"),
]

RENAMES = [
    ("photos/vacuum-chamber-quotation-drawing-640w.webp", "有内容错误", "文件名说「图纸」，实拍是车间腔体，画面里没有图纸",
     "等 IMG-202 拍到真图纸后按新名替换，旧名做 301"),
    ("photos/vacuum-leak-test-room-door-720w.webp", "已弃用", "「真空检漏室」门＋中英文标牌，无人做表面处理；曾误名 surface-finishing-clean-welding-bay",
     "已从首页与文章封面撤下并按内容改名；如需使用，先确认门牌小字是否为真人姓名（隐私）"),
    ("photos/helium-leak-test-ul1000-vacuum-chamber-720w.webp", "分辨率偏低", "720 宽，2× 屏偏软",
     "用 IMG-208 的 1200w 版本替换，旧名可保留做 301"),
    ("photos/cmm-inspection-vacuum-component-720w.webp", "分辨率偏低", "720 宽",
     "用 IMG-210 的 1200w 版本替换"),
    ("photos/partners/*.webp（15 张）", "分辨率偏低", "约 380 宽",
     "用 IMG-220 的 760w 版本，配 srcset"),
]

SPEC = [
    ("#", "规则", "说明", "正例 / 反例"),
    ("1", "字符集", "只允许小写字母、数字、连字符和路径分隔符", "√ photos/vacuum-chamber-workshop-changshu-1440w.webp ｜ × photos/车间全景 (1).JPG"),
    ("2", "结构", "<主体>-<限定>-<场景>[-<宽>w].<ext>，3–6 个词，≤60 字符", "√ surface-finishing-polishing-stainless-chamber-1200w.webp"),
    ("3", "业务词在前", "第一个词写清楚「这是什么」，不要以 img/photo/pic 开头", "√ vacuum-chamber-… ｜ × img-0812.webp"),
    ("4", "宽度后缀", "位图统一用 -1200w / -1440w / -760w 这类宽度后缀，禁止 -2x、-hd、-final", "√ -1440w.webp ｜ × -2x.webp"),
    ("5", "禁用词", "img/photo/pic/image/hero/cap/news/final/new/copy/test/DSC/未命名/图1", "× news-3.webp（历史遗留，已改）"),
    ("6", "品牌前缀", "只有品牌资产（字标、favicon、OG 卡）用 pano-vacuum- 前缀", "√ pano-vacuum-og-about-1200x630.webp ｜ × pano-vacuum-workshop-1.webp"),
    ("7", "视频命名", "<主题>-<动作>-<宽>x<高>.mp4", "√ helium-leak-test-chamber-1920x1080.mp4"),
    ("8", "语言无关", "文件名不带中英文区分：一套素材两站共用，语言只体现在 alt 与文案", "√ /photos/…-1200w.webp ｜ × /photos/zh/…"),
    ("9", "不押版本号", "换图就换文件名（旧名做 301），别在原名上覆盖", "√ 新名 + 301 ｜ × 同名替换（CDN 会继续发旧字节）"),
    ("10", "alt 不复读文件名", "alt 写画面内容（15–35 个汉字 / 英文 ≤125 字符）", "√ 焊缝抛光后表面呈亮面 ｜ × surface-finishing-polishing-stainless-chamber.webp"),
    ("11", "合规", "不得写「ISO Class 洁净室」、不得暗示整机承诺、数字只用设备台账里有的", "见 docs/ASSET-NAMING-2026-11-03.md 红线一节"),
    ("12", "授权", "客户现场、样件、logo 使用前必须有授权；人名门牌先确认隐私", "客户验收/第三方检验图需书面授权"),
]

FLOW = [
    ("步骤", "你要做的", "我会做的"),
    ("1 拍摄", "按 01/02 两张表的「拍什么 / 机位 / 数量」拍，宁少勿滥，每个场景 3–5 个角度", "—"),
    ("2 交付", "原图给我：JPG（有 RAW 更好），长边 ≥2400px（首选 4000×3000），不加滤镜/水印/日期戳",
     "归档到 public/photos/，按下表命名并记录到命名清单"),
    ("3 压缩", "—", "压成 webp（quality 82–86），按需出 -1200w/-1440w/-760w 多档，配 srcset"),
    ("4 接线", "—", "接进对应页面，写中文/英文 alt，更新 OG 图（如该页有专属分享卡）"),
    ("5 校验", "—", "本地 build + verify，再部署 .com/.cn，用内容哈希逐张核对线上字节"),
    ("6 索引", "—", "已归档到的页面自动进 sitemap；图片与视频随页面被搜索引擎抓取"),
    ("关键", "交付时把「文件名对应的内容」写清楚（哪怕一行字）", "视觉复核一遍，发现图文不符会退回来重拍/改名"),
]


def build_xlsx(out: Path) -> None:
    wb = Workbook()

    # ---------------- 00 怎么用 ----------------
    ws = wb.active
    ws.title = "00-怎么用"
    ws.column_dimensions["A"].width = 118
    lines = [
        ("帕诺真空 · 待补素材清单（图片 + 视频）", "title"),
        (f"生成日期 {DATE} · 来源：扫构建产物 47 个页面，只列「现在真正缺的」", "sub"),
        ("", ""),
        ("这份清单和旧的两份是什么关系", "h"),
        ("· 2026-10-31 的《拍摄清单》是「理想全量」122 项，很多已拍/已定稿；", "b"),
        ("· 2026-11-03 的《图片视频命名清单》里 14 项 OG 分享图已经做完上线；", "b"),
        ("· 这一份是「当前实际缺口」，拍完就能直接上线，不用再筛。", "b"),
        ("", ""),
        ("现状（扫 47 页得出的结论）", "h"),
        ("· 首页 28 张照片、公司介绍 16 张，是全站唯一图片密度够的两页；", "b"),
        ("· 其余每个页面只有 1 张照片，且都是借用首页的图；/request-a-quote/ 一张都没有；", "b"),
        ("· 7 道检验、设备实力、包装发运、团队 —— 全是纯文字，没有任何视觉证据。", "b"),
        ("", ""),
        ("优先级怎么理解", "h"),
        ("P0 = 现在内容就错了/缺图导致图文不符，先拍（3 项 + 2 支视频）", "p0"),
        ("P1 = 页面能用但证据不足/借图，第二优先（16 项 + 3 支视频）", "p1"),
        ("P2 = 锦上添花：专属封面、logo 高清、清洁度细节（5 项 + 1 支视频）", "p2"),
        ("", ""),
        ("拍摄总原则", "h"),
        ("· 真实优先：车间自然光下的真实作业，优于摆拍和打灯；宁少勿滥，每场景 3–5 个角度回来选；", "b"),
        ("· 横构图优先 3:2（网页与分享卡都能用）；需要竖版另拍；", "b"),
        ("· 人像不露客户、不露他人姓名牌；工装护具要齐；", "b"),
        ("· 数字红线：只拍设备台账里已有的能力（3 万瓦激光 / 400t·6.2m 折弯 / 40+ 焊接工位 / 50t 行车 / 氦检 ≤1×10⁻⁹ Pa·m³/s），", "b"),
        ("  不得出现「ISO Class 洁净室」，证书只拍已下证的。", "b"),
        ("", ""),
        ("三张表分别看", "h"),
        ("01-待拍图片：24 个条目（含 4 张团队像与 15 张 logo），带文件名、机位、alt；", "b"),
        ("02-待拍视频：6 支，带时长/码率/无音轨要求；", "b"),
        ("03-需重拍或修正：现有素材的 5 个已知问题；", "b"),
        ("04-命名规范：12 条，新素材一律照此；", "b"),
        ("05-交付流程：你做什么、我做什么。", "b"),
    ]
    r = 1
    for text, kind in lines:
        c = ws.cell(row=r, column=1, value=text)
        c.alignment = Alignment(wrap_text=True, vertical="top")
        if kind == "title":
            c.font = Font(size=16, bold=True, color="1F3864")
            ws.row_dimensions[r].height = 26
        elif kind == "sub":
            c.font = Font(size=10, color="68738A")
        elif kind == "h":
            c.font = Font(size=12, bold=True, color="1F3864")
        elif kind == "p0":
            c.fill = P0_FILL
        elif kind == "p1":
            c.fill = P1_FILL
        elif kind == "p2":
            c.fill = P2_FILL
        r += 1

    # ---------------- 01 待拍图片 ----------------
    ws = wb.create_sheet("01-待拍图片")
    head = ["编号", "优先级", "文件名（严格照此）", "交付尺寸", "放哪些页面", "页面现状", "拍什么（画面必须出现）",
            "机位 / 构图", "数量", "红线", "alt 中文", "alt 英文"]
    widths = [9, 7, 44, 20, 30, 34, 52, 34, 14, 36, 30, 42]
    for i, (h, w) in enumerate(zip(head, widths), start=1):
        c = ws.cell(row=1, column=i, value=h)
        c.fill, c.font, c.alignment, c.border = HDR_FILL, HDR_FONT, WRAP, BORDER
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[1].height = 30
    for row_i, item in enumerate(IMAGES, start=2):
        fill = P0_FILL if item[1] == "P0" else (P1_FILL if item[1] == "P1" else P2_FILL)
        for col_i, val in enumerate(item, start=1):
            c = ws.cell(row=row_i, column=col_i, value=val)
            c.alignment, c.border = WRAP, BORDER
            c.font = Font(size=10)
            if col_i == 2:
                c.fill = fill
                c.font = Font(size=10, bold=True)
            if col_i == 3:
                c.font = Font(size=10, name="Menlo")
            if col_i == 4:
                c.font = Font(size=10, name="Menlo")
        ws.row_dimensions[row_i].height = 96
    ws.freeze_panes = "C2"
    ws.auto_filter.ref = f"A1:L{len(IMAGES) + 1}"

    # ---------------- 02 待拍视频 ----------------
    ws = wb.create_sheet("02-待拍视频")
    head = ["编号", "优先级", "文件名", "放哪", "时长", "规格", "拍什么", "红线"]
    widths = [9, 7, 46, 34, 12, 44, 56, 40]
    for i, (h, w) in enumerate(zip(head, widths), start=1):
        c = ws.cell(row=1, column=i, value=h)
        c.fill, c.font, c.alignment, c.border = HDR_FILL, HDR_FONT, WRAP, BORDER
        ws.column_dimensions[get_column_letter(i)].width = w
    for row_i, item in enumerate(VIDEOS, start=2):
        fill = P0_FILL if item[1] == "P0" else (P1_FILL if item[1] == "P1" else P2_FILL)
        for col_i, val in enumerate(item, start=1):
            c = ws.cell(row=row_i, column=col_i, value=val)
            c.alignment, c.border = WRAP, BORDER
            c.font = Font(size=10) if col_i not in (2, 3) else Font(size=10, bold=True)
            if col_i in (2, 3):
                c.fill = fill
            if col_i == 3:
                c.font = Font(size=10, name="Menlo", bold=True)
        ws.row_dimensions[row_i].height = 78
    ws.freeze_panes = "C2"
    note = ws.cell(row=len(VIDEOS) + 3, column=1,
                   value="已有视频（不用重拍）：video/vacuum-chamber-manufacturing-loop-1920x1080.mp4（13s 循环）"
                         "与 -1280x720.mp4（窄屏变体）。若要换一版更长的，请用新名 "
                         "vacuum-chamber-manufacturing-overview-1920x1080.mp4，别覆盖同名文件（CDN 会继续发旧字节）。"
                         "封面我可以用 ffmpeg 从视频里抽帧，不用另拍 poster。")
    note.alignment = Alignment(wrap_text=True, vertical="top")
    note.font = Font(size=10, color="B45309")
    ws.merge_cells(start_row=len(VIDEOS) + 3, start_column=1, end_row=len(VIDEOS) + 3, end_column=8)
    ws.row_dimensions[len(VIDEOS) + 3].height = 44

    # ---------------- 03 需重拍或修正 ----------------
    ws = wb.create_sheet("03-需重拍或修正")
    head = ["现有文件", "问题类型", "具体问题", "处置"]
    widths = [50, 14, 62, 56]
    for i, (h, w) in enumerate(zip(head, widths), start=1):
        c = ws.cell(row=1, column=i, value=h)
        c.fill, c.font, c.alignment, c.border = HDR_FILL, HDR_FONT, WRAP, BORDER
        ws.column_dimensions[get_column_letter(i)].width = w
    for row_i, item in enumerate(RENAMES, start=2):
        for col_i, val in enumerate(item, start=1):
            c = ws.cell(row=row_i, column=col_i, value=val)
            c.alignment, c.border = WRAP, BORDER
            c.font = Font(size=10, name="Menlo") if col_i == 1 else Font(size=10)
        ws.row_dimensions[row_i].height = 60

    # ---------------- 04 命名规范 ----------------
    ws = wb.create_sheet("04-命名规范")
    for i, w in enumerate([6, 14, 62, 72], start=1):
        ws.column_dimensions[get_column_letter(i)].width = w
    for row_i, item in enumerate(SPEC, start=1):
        for col_i, val in enumerate(item, start=1):
            c = ws.cell(row=row_i, column=col_i, value=val)
            c.alignment, c.border = WRAP, BORDER
            if row_i == 1:
                c.fill, c.font = HDR_FILL, HDR_FONT
            else:
                c.font = Font(size=10, name="Menlo") if col_i == 4 else Font(size=10)
        if row_i > 1:
            ws.row_dimensions[row_i].height = 40

    # ---------------- 05 交付流程 ----------------
    ws = wb.create_sheet("05-交付流程")
    for i, w in enumerate([18, 62, 62], start=1):
        ws.column_dimensions[get_column_letter(i)].width = w
    for row_i, item in enumerate(FLOW, start=1):
        for col_i, val in enumerate(item, start=1):
            c = ws.cell(row=row_i, column=col_i, value=val)
            c.alignment, c.border = WRAP, BORDER
            if row_i == 1:
                c.fill, c.font = HDR_FILL, HDR_FONT
            else:
                c.font = Font(size=10)
        if row_i > 1:
            ws.row_dimensions[row_i].height = 44

    # ---------------- 06 现有素材对照 ----------------
    ws = wb.create_sheet("06-现有素材对照")
    ws.column_dimensions["A"].width = 52
    ws.column_dimensions["B"].width = 16
    ws.column_dimensions["C"].width = 74
    c = ws.cell(row=1, column=1, value="已上线、不用重拍的素材（14 张照片 + 2 支视频 + 15 张 logo + 18 张分享图）")
    c.font = Font(bold=True, size=11, color="1F3864")
    rows = [
        ("multi-ton-304l-vacuum-chamber-1600w.webp", "1600×1200", "重载腔体，OG 默认卡与设计材料专题在用"),
        ("vacuum-chamber-workshop-changshu-1440w.webp", "1440×960", "车间全景；about / quote / 定制腔体服务页在用"),
        ("vacuum-chamber-workshop-changshu-1280w.webp", "1280×853", "同上窄档；srcset 用"),
        ("tig-welding-station-vacuum-chamber-1600w.webp", "1600×1067", "焊接工位；首页焊接卡＋表面处理卡（暂借）在用"),
        ("vacuum-chamber-workshop-components-1600w.webp", "1600×1067", "车间构件与法兰"),
        ("custom-vacuum-chamber-304l-stainless-1200w.webp", "1200×900", "定制腔体；服务页与洁净颗粒文章封面在用"),
        ("custom-vacuum-chamber-finished-304l-720w.webp", "720×480", "成型腔体成品；宽度偏小，可考虑跟着 IMG-209 一起补 1200w"),
        ("helium-leak-test-ul1000-vacuum-chamber-720w.webp", "720×480", "INFICON UL1000 检漏仪，内容切题但分辨率偏低（见 03 表）"),
        ("cmm-inspection-vacuum-component-720w.webp", "720×480", "三坐标检测，分辨率偏低（见 03 表）"),
        ("uhv-feedthrough-flange-assembly-1600w.webp", "1600×900", "超高真空法兰组件；⚠ 版权来源仍待核实，别外发"),
        ("vacuum-chamber-7-inspection-gates-640w.webp", "640×360", "文章封面"),
        ("vacuum-chamber-material-304l-or-316l-640w.webp", "640×360", "文章封面"),
        ("vacuum-chamber-quotation-drawing-640w.webp", "640×360", "文章封面，⚠ 内容错误待换（见 03 表）"),
        ("vacuum-leak-test-room-door-720w.webp", "720×480", "检漏室门＋标牌，已撤下不再使用（见 03 表）"),
        ("video/vacuum-chamber-manufacturing-loop-1920x1080.mp4", "1920×1080 · 13s", "首页首屏循环；窄屏用 -1280x720 变体"),
        ("photos/partners/*.webp（15 张）", "约 380×≤120", "伙伴 logo，2× 屏偏糊（见 03 表）"),
        ("public/pano-vacuum-og-*.webp（18 张）", "1200×630", "全站分享图，已全部上线并逐张核对线上字节"),
    ]
    for row_i, (a, b, c_) in enumerate(rows, start=2):
        ws.cell(row=row_i, column=1, value=a).font = Font(size=10, name="Menlo")
        ws.cell(row=row_i, column=2, value=b).font = Font(size=10)
        ws.cell(row=row_i, column=3, value=c_).font = Font(size=10)
        for col_i in (1, 2, 3):
            ws.cell(row=row_i, column=col_i).alignment = Alignment(wrap_text=True, vertical="top")
            ws.cell(row=row_i, column=col_i).border = BORDER

    for sheet in wb.worksheets:
        sheet.sheet_view.showGridLines = False
    wb.save(out)


def build_md(out: Path) -> None:
    L: list[str] = []
    L.append("# 待补素材清单（图片 + 视频）· 2026-11-04\n")
    L.append("扫 47 个构建页面得出的**当前实际缺口**：首页 28 张、公司介绍 16 张照片，其余每页只有 1 张且都是借用；`/request-a-quote/` 0 张；7 道检验、设备实力、包装发运、团队全是纯文字。\n")
    L.append("> P0＝现在图文不符/缺图，先拍；P1＝证据不足或借图；P2＝锦上添花。\n")
    L.append("## 一、待拍图片\n")
    L.append("| 编号 | 优先 | 文件名 | 放哪 | 拍什么 | 机位 | 数量 | 红线 |")
    L.append("|---|---|---|---|---|---|---|---|")
    for it in IMAGES:
        num, pri, fn, size, where, state, shoot, cam, qty, red, _, _ = it
        L.append(f"| {num} | {pri} | `{fn}` | {where} | {shoot} | {cam} | {qty} | {red} |")
    L.append("\n每条的 alt（中/英）在 xlsx 的 01 表里，接线时直接用。\n")
    L.append("## 二、待拍视频\n")
    L.append("| 编号 | 优先 | 文件名 | 放哪 | 时长 | 拍什么 |")
    L.append("|---|---|---|---|---|---|")
    for it in VIDEOS:
        num, pri, fn, where, dur, spec, shoot, red = it
        L.append(f"| {num} | {pri} | `{fn}` | {where} | {dur} | {shoot} |")
    L.append("\n规格统一：1920×1080 / H.264 / 25–30fps / 8–12 Mbps / 无音轨 / 不烧字幕。已有 13s 首屏循环，若要换更长版本请用新文件名，别覆盖同名文件。\n")
    L.append("## 三、需重拍或修正\n")
    L.append("| 现有文件 | 问题 | 处置 |")
    L.append("|---|---|---|")
    for fn, kind, prob, fix in RENAMES:
        L.append(f"| `{fn}` | {kind}：{prob} | {fix} |")
    L.append("\n## 四、命名规范\n")
    L.append("| # | 规则 | 说明 | 正/反例 |")
    L.append("|---|---|---|---|")
    for row in SPEC[1:]:
        L.append(f"| {row[0]} | {row[1]} | {row[2]} | {row[3]} |")
    L.append("\n## 五、交付流程\n")
    L.append("| 步骤 | 你 | 我 |")
    L.append("|---|---|---|")
    for row in FLOW[1:]:
        L.append(f"| {row[0]} | {row[1]} | {row[2]} |")
    L.append("")
    out.write_text("\n".join(L), encoding="utf-8")


def main(argv: list[str]) -> int:
    desktop = Path(argv[1]) if len(argv) > 1 else Path.home() / "Desktop"
    xlsx = desktop / f"帕诺真空_待补素材清单_{DATE}.xlsx"
    md = ROOT / "docs" / f"SHOT-LIST-{DATE}.md"
    build_xlsx(xlsx)
    build_md(md)
    p0i = sum(1 for i in IMAGES if i[1] == "P0")
    p1i = sum(1 for i in IMAGES if i[1] == "P1")
    p2i = sum(1 for i in IMAGES if i[1] == "P2")
    p0v = sum(1 for v in VIDEOS if v[1] == "P0")
    print(f"✓ {xlsx}（6 个表）")
    print(f"✓ {md.relative_to(ROOT)}")
    print(f"  图片 {len(IMAGES)} 条：P0 {p0i} / P1 {p1i} / P2 {p2i}")
    print(f"  视频 {len(VIDEOS)} 条：P0 {p0v} / P1 {sum(1 for v in VIDEOS if v[1] == 'P1')} / P2 {sum(1 for v in VIDEOS if v[1] == 'P2')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
