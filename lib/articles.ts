// 博客文章数据源（双语）。纪律：结论先行、具体数字、不写「行业领先」、认证用「推进中」。
// 数字全部出自设备台账与《制造能力对外介绍》——有证据支撑才写。

export type ArticleSection = { h: string; body: string };

export type ArticleAuthor = {
  nameZh: string;
  nameEn: string;
  roleZh: string;
  roleEn: string;
  email: string;
};

export type Article = {
  slug: string;
  date: string;
  updated?: string;
  author: ArticleAuthor;
  cover: string;
  tags?: string[];
  faq?: { q: string; a: string }[];
  zh: { title: string; intro: string; sections: ArticleSection[]; closing: string };
  en: { title: string; intro: string; sections: ArticleSection[]; closing: string };
};

export const articles: Article[] = [
  {
    slug: "vacuum-chamber-7-inspection-gates",
    tags: ["制造流程", "检验", "质量"],
    date: "2026-10-27",
    author: { nameZh: "帕诺工艺团队", nameEn: "PANO Process Team", roleZh: "工艺与质量", roleEn: "Process & Quality", email: "zhouyou@panovacuum.com" },
    cover: "/photos/vacuum-chamber-7-inspection-gates-640w.webp",
    zh: {
      title: "从图纸到出厂：真空腔体要过 7 道检查",
      intro: "腔体焊完，不等于能发货。厂里定了 7 道检查，每道签字留档，报告跟货一起走。客户来查，记录都在。",
      sections: [
        { h: "1. 图纸评审与 DFM", body: "图纸到手先不急着下料。工艺的人看三件事：能不能做、公差给多少合适、哪几个位置最容易漏。有问题这时候提，比焊完再改便宜得多。" },
        { h: "2. 来料检验", body: "钢板进厂先对质保书，再看表面有没有划伤、锈斑。牌号不对或者表面不行，直接退回，不入库。" },
        { h: "3. 下料与坡口", body: "3 万瓦激光切厚板，坡口在同一次切割里出来。装配时间隙稳，后面的焊接变形也小。" },
        { h: "4. 精密加工", body: "CNC 加 H200 落地镗铣，4 米级回转。关键尺寸一件一件量、一件一件记，不留「差不多」。" },
        { h: "5. 焊接", body: "40 多个气保焊工位，TIG 和自动焊都有，焊接区单独隔开。焊缝记录跟着这台腔体走。" },
        { h: "6. 氦质谱检漏", body: "UL1000 检漏仪，做到 1×10⁻⁹ Pa·m³/s 量级。每台都测，不抽检。这一步不过关，前面的工序要返工。" },
        { h: "7. 出厂检验与交付", body: "按图纸量尺寸、看表面，做终检。检验报告跟货一起发，客户手上有一份。" },
      ],
      closing: "这 7 道是内部执行文件，并非对外宣传用的流程图。任何一道放松，泄漏率会最先反映出来。图纸提交后，同一套检验流程适用于该项目。",
    },
    en: {
      title: "Seven checks a vacuum chamber has to pass",
      intro: "A welded chamber is not a deliverable chamber. Seven checks are carried out, each signed off and filed, and the report is dispatched with the unit. Records remain available for customer audit.",
      sections: [
        { h: "1. Drawing review and DFM", body: "No material is cut until the drawing has passed review. The process engineer assesses three points: manufacturability, tolerance allocation and the most probable leak paths. Defects are less costly to resolve at this stage than after welding." },
        { h: "2. Incoming material", body: "Incoming steel is checked against the mill certificate, with the surface examined for scratches or corrosion. Material of the wrong grade or with surface defects is rejected and does not enter stock." },
        { h: "3. Blanking and bevel", body: "A 30 kW laser cuts the thick plate and forms the weld bevel in a single pass. Consistent fit-up limits distortion in subsequent welding." },
        { h: "4. Machining", body: "CNC machining and an H200 floor borer with 4 m-class rotation. Key dimensions are measured and recorded for each part rather than assessed visually." },
        { h: "5. Welding", body: "More than 40 gas-shielded stations, TIG and automated, in a bay separately enclosed from the remainder of the shop. Weld records are retained for each chamber." },
        { h: "6. Helium leak test", body: "UL1000 tester to the 1×10⁻⁹ Pa·m³/s range. Every unit is tested; none are sampled. A failure at this gate returns the unit to the preceding stages." },
        { h: "7. Final inspection and delivery", body: "Dimensions are measured against the drawing and surfaces are inspected. The inspection report is dispatched with the chamber, with a copy retained by the customer." },
      ],
      closing: "The seven gates are internal working documents rather than website illustrations. If any one of them is relaxed, the leak rate reflects it first. The same process applies to your project once a drawing is submitted.",
    },
  },
  {
    slug: "chamber-material-304l-or-316l",
    tags: ["材料选型", "不锈钢", "腔体"],
    date: "2026-10-27",
    author: { nameZh: "帕诺工艺团队", nameEn: "PANO Process Team", roleZh: "材料与工艺", roleEn: "Materials & Process", email: "zhouyou@panovacuum.com" },
    cover: "/photos/vacuum-chamber-material-304l-or-316l-640w.webp",
    zh: {
      title: "真空腔体选 304L 还是 SUS316L",
      intro: "大多数腔体用 304L 就够了。工艺气氛有腐蚀性，或者图纸明确写了 SUS316L，才上 316L。拿不准就把工况写进询价，我们按工况给建议。",
      sections: [
        { h: "两种钢差在哪", body: "都是奥氏体不锈钢。316L 多了钼，耐点蚀、耐氯离子腐蚀更强，价格也更高。真空和焊接这两件事，两种钢都扛得住。" },
        { h: "什么时候选 316L", body: "镀膜工艺里有腐蚀性气氛、要接触酸碱或氯离子，或者客户图纸点名 SUS316L，这几种情况选 316L。常规半导体设备的腔体，304L 是主流。" },
        { h: "我们能做什么", body: "304L 和 SUS316L 都常备，牌号和表面处理按图纸。质保书随货，来料先对规格再入库。" },
      ],
      closing: "选哪种拿不准，发图纸时把工艺、气氛、温度写清楚。我们出 DFM 建议的时候，会一并给材料意见。",
    },
    en: {
      title: "Chamber steel: 304L or SUS316L?",
      intro: "Most chambers are adequately served by 304L. 316L is selected where the process atmosphere is corrosive or the drawing specifies SUS316L. Where the choice is unclear, state the operating conditions in the RFQ and the recommendation will be based on them.",
      sections: [
        { h: "What differs", body: "Both are austenitic stainless steels. 316L contains molybdenum, which improves resistance to pitting and chlorides at higher material cost. For vacuum service and welding, both are suitable." },
        { h: "When to select 316L", body: "Corrosive atmospheres in coating processes, contact with acids or chlorides, or a customer drawing that specifies SUS316L. For standard semiconductor chambers, 304L is the usual selection." },
        { h: "Material handling", body: "Both 304L and SUS316L are kept in stock. Grade and surface finish follow the drawing. Certificates are dispatched with the unit, and incoming material is checked against specification before release." },
      ],
      closing: "Where the choice is unclear, include the process, atmosphere and temperature in the RFQ. The material recommendation is issued together with our DFM feedback.",
    },
  },
  {
    slug: "how-to-request-a-quote-with-a-drawing",
    tags: ["询价", "图纸评审", "流程"],
    date: "2026-10-27",
    author: { nameZh: "周先生", nameEn: "Mr. Zhou", roleZh: "商务与销售", roleEn: "Sales & BD", email: "zhouyou@panovacuum.com" },
    cover: "/photos/vacuum-chamber-drawing-review-desk-720w.webp",
    zh: {
      title: "真空腔体怎么询价：一张图纸就够了",
      intro: "请先概述需求，再邮件发送 PDF、DWG 或 STEP 图纸。48 小时内初步答复；资料完整并完成图纸评审后提供制造建议、报价与交期。",
      sections: [
        { h: "需要准备什么", body: "图纸或 3D 模型，并注明材料、数量与期望交期；如项目存在工期压力，可一并说明。尚无正式图纸时，可先提供实物照片与大致尺寸，以便先期评估方案。" },
        { h: "收到之后我们做什么", body: "先进行图纸评审：可制造性、公差与潜在泄漏部位，确认后再出具报价。报价中附节点计划，交期写入合同。" },
        { h: "一些常见担心", body: "承接单件，无最小起订量。海外客户可全程英文沟通，电话与邮件均可。付款方式按合同约定，可协商 30/70 付款或信用证结算。出口包装与单证由我方提供。" },
      ],
      closing: "收到需求后 48 小时内初步答复；资料完整并完成图纸评审后提供报价与交期。",
    },
    en: {
      title: "How to request a vacuum chamber quotation: a drawing is sufficient",
      intro: "Start with a project outline, then email drawings in PDF, DWG or STEP format. We provide an initial response within 48 hours. Manufacturing recommendations, a quotation and lead time follow once the required information is complete and drawing review is finished.",
      sections: [
        { h: "What to submit", body: "The drawing or 3D model, together with material, quantity and required delivery date. Operating pressure should be stated where applicable. Where no formal drawing is available, photographs and approximate dimensions are sufficient for an initial assessment." },
        { h: "Review and quotation", body: "The drawing is reviewed first for manufacturability, tolerance requirements and likely leak paths. Once these points are agreed, a quotation is issued with a milestone schedule, which forms part of the contract." },
        { h: "Common questions", body: "Single units are accepted; there is no minimum order quantity. Overseas customers are supported in English by telephone or email. Payment terms follow the contract; 30/70 terms or a letter of credit can be discussed. Export packing and documentation are provided by us." },
      ],
      closing: "We provide an initial response within 48 hours of receiving your requirements. A quotation and lead time follow once the required information is complete and drawing review is finished.",
    },
  },
{
    slug: "helium-leak-test-vs-pressure-rise",
    tags: ["检漏", "氦检", "质量判定"],
    faq: [
      { q: "压降法能代替氦检吗？", a: "做过程判断可以，做验收判据不行：压降法分不清漏与出气，也没有温度修正项。要签字的那张纸，得用氦检。" },
      { q: "氦检能做到什么量级？", a: "真空法外部喷氦可到 5×10⁻¹³ Pa·m³/s 量级；我方出厂检漏按项目图纸判据执行，对外披露的能力是 1×10⁻⁹ Pa·m³/s 量级。" },
      { q: "为什么大腔体检漏要等很久？", a: "分子流区（<10⁻³ hPa）响应时间由试件容积与对氦的有效抽速决定（V/S）；进入层流区（>1 hPa）后由前级泵抽速决定，腔体越大越慢。" },
    ],
    date: "2026-11-01",
    author: { nameZh: "帕诺工艺团队", nameEn: "PANO Process Team", roleZh: "工艺与质量", roleEn: "Process & Quality", email: "zhouyou@panovacuum.com" },
    cover: "/photos/blog-helium-leak-test-vs-pressure-rise-720w.webp",
    zh: {
      title: "氦检和压降法，差的不是精度，是五个数量级",
      intro:
        "客户最常问：你们怎么检漏，压降法行不行。行，但要看你要什么答案。压降法回答「有没有漏」，氦质谱回答「漏多少、漏在哪」。两者灵敏度差五个数量级，不是仪器贵不贵，是方法本身的上限。",
      sections: [
        { h: "1. 漏率是把「紧」变成数", body: "漏率 = 压力变化 × 容积 ÷ 时间，Q = Δp·V/Δt。1 m³ 容器 1 秒变 1 Pa，就是 1 Pa·m³/s。参照物：自行车内胎 4 L、30 天掉 1 bar，折合 1.5×10⁻⁴ Pa·m³/s；冰箱冷媒 10 g R134a 十年漏完，折合 7.1×10⁻⁷。冰箱比内胎严两百多倍，离半导体腔体仍差得远。「不漏」这句话，不落到数字上就没意义。" },
        { h: "2. 压降法的坑一：它测的不只是漏", body: "关阀看压力上涨，读数里有两部分：真实漏和壁面出气。出气随时间按 1/t 衰减，金属表面水汽经验式 q ≈ 3×10⁻⁹/t（小时），单位 mbar·L/(s·cm²)。刚洗完的腔体，前几小时出气可能比真实漏大几个量级，此时按 Q = Δp·V/Δt 算出来的是出气。要分清，先测本底出气率再扣除；省掉这步，给出的就是「漏 + 出气」的合计。" },
        { h: "3. 坑二：单位差十倍", body: "口语用 mbar·L/s，公式出 Pa·m³/s，1 mbar·L/s = 0.1 Pa·m³/s。把 1.5×10⁻⁴ Pa·m³/s 读成 1.5×10⁻⁴ mbar·L/s，等于自己把要求放宽十倍。合同里的单位，比什么都重要。" },
        { h: "4. 坑三：温度", body: "Q = Δp·V/Δt 只有三个量，没有温度项。原始资料未讨论温度对压升的影响，也未给修正公式（资料未涉及）。所以听到「压降法已做温度补偿」，先要公式；给不出就是没有。这也是我们不用压降法做最终判据的原因之一。" },
        { h: "5. 氦检凭什么到 10⁻¹³", body: "质谱室必须在 10⁻⁴ hPa 以下工作，该压力由仪器自带泵组维持。关键是涡轮泵：对空气压缩比极高、对轻气体低几个数量级，于是空气被挡在质谱室外、氦能进——涡轮泵在氦检里是选择性过滤器，不是抽气泵。结构分两路：逆流式量程 1 ~ 10⁻⁹ Pa·m³/s，产线最常用；主流式直接进气、灵敏度最高，但试件与仪器都要抽到 10⁻² hPa。另有石英窗型：硅片载体打几千孔、覆 7 µm SiO₂ 膜，只让氦渗透，检测限 5×10⁻⁹。" },
        { h: "6. 三种做法各能到多少", body: "真空法外部喷氦：< 5×10⁻¹³ Pa·m³/s，前提是试件抽空、外面扛 1000 hPa 压差。吸枪法：< 1×10⁻⁸，试件要耐过压。累积法（包壳集气）：主要用于 > 1×10⁻⁵，慢。三个数摆在一起，要 10⁻⁹ 以下的判定，只有真空法配质谱这一条路；吸枪法的地板在大气氦——空气里天然含 5 ppm 的氦。" },
        { h: "7. 大腔体为什么检得慢", body: "分子流区（< 10⁻³ hPa）快慢由试件容积和对氦的有效抽速决定，腔体越小、抽速越大越快；进入层流区（> 1 hPa）由前级泵抽速决定，明显更慢。同样的漏，大腔体等更久不是操作问题，是几何问题。响应时间算进去再排产，比事后解释强。" },
        { h: "8. 现场三个误判源", body: "大气氦 5 ppm，吸枪法的灵敏度地板，也是误报警主因；油封前级泵把氦溶进油再反扩散回高真空侧，检到大漏后读数持续虚高，开气镇排掉；强信号后不吹扫，石英窗机型可用大气经节流孔自动吹扫传感器，其他机型只能等。" },
        { h: "9. 我们这边怎么做", body: "出厂检漏用氦质谱，按项目图纸约定的判据执行。对外披露的能力是 1×10⁻⁹ Pa·m³/s 量级，每台都测、不抽检。方法口径参照 GB/T 36176-2018（氦质谱真空检漏方法）与 GB/T 32218-2015（真空系统漏率测试方法），报告随货。压降法在这里不作为验收判据，原因只有一条：它分不清漏和出气，也说不清温度误差。做过程判断和粗定位，压降法完全够用；要签字的那张纸，得用氦检。" },
      ],
      closing:
        "检漏不是一道工序，是一个判据。判据写不清，报告就没有意义。判据按项目图纸约定，同一套判据适用于该项目的每一台腔体。",
    },
    en: {
      title: "Helium leak testing and pressure-rise testing differ by five orders of magnitude",
      intro:
        "A common question is whether pressure-rise testing is acceptable. It answers whether a chamber leaks; helium mass spectrometry answers how much and where. The gap is five orders of magnitude — a limit of the method, not of the instrument price.",
      sections: [
        { h: "1. Leak rate turns tightness into a number", body: "Q = Δp·V/Δt. A 1 m³ vessel changing 1 Pa in 1 s carries 1 Pa·m³/s. For scale: a 4 L bicycle inner tube losing 1 bar over 30 days is 1.5×10⁻⁴ Pa·m³/s; a refrigerator leaking 10 g of R134a over ten years is 7.1×10⁻⁷. The refrigerator is two orders tighter than the tube and still far from a semiconductor chamber." },
        { h: "2. Pressure rise measures more than leakage", body: "With the valve closed, the rising pressure contains real leakage plus wall outgassing. Water outgassing decays as 1/t, approximately 3×10⁻⁹/t (hours) in mbar·L/(s·cm²). A freshly cleaned chamber can outgas several orders above its true leak for hours, so the reading is outgassing, not leakage, unless the background is measured and subtracted first." },
        { h: "3. Units differ by a factor of ten", body: "1 mbar·L/s = 0.1 Pa·m³/s. Reading 1.5×10⁻⁴ Pa·m³/s as 1.5×10⁻⁴ mbar·L/s relaxes the requirement tenfold. Units in a contract matter more than the instrument model." },
        { h: "4. Temperature is not in the formula", body: "Q = Δp·V/Δt has three quantities and no temperature term; the source material neither discusses temperature effects on pressure rise nor provides a correction (not covered). Any claim of temperature compensation should come with the formula." },
        { h: "5. Why helium testing reaches 10⁻¹³", body: "The mass spectrometer must operate below 10⁻⁴ hPa, maintained by the instrument's own pumps. The turbopump compresses air far more than light gases, so air is held back while helium passes — it acts as a selective filter rather than a pump. Counterflow covers 1 to 10⁻⁹ Pa·m³/s and dominates production use; main flow is more sensitive but needs 10⁻² hPa on both specimen and instrument. A quartz-window variant uses a 7 µm SiO₂ membrane with a 5×10⁻⁹ detection limit." },
        { h: "6. What each method can reach", body: "Spray helium outside an evacuated specimen: < 5×10⁻¹³ Pa·m³/s at a 1000 hPa differential. Sniffing a pressurised specimen: < 1×10⁻⁸, specimen must withstand overpressure. Accumulation: mainly above 1×10⁻⁵, and slow. For a 10⁻⁹ verdict only vacuum-mode mass spectrometry qualifies; sniffing is floored by the 5 ppm helium naturally present in air." },
        { h: "7. Large chambers test slowly", body: "In molecular flow (< 10⁻³ hPa) speed is set by specimen volume and effective helium pumping speed; above 1 hPa, laminar flow puts the backing pump in charge and everything slows. Longer waits on large chambers are geometry, not operator error — plan the response time into the schedule." },
        { h: "8. Three sources of misreading", body: "5 ppm atmospheric helium; helium dissolved in oil-sealed backing-pump oil diffusing back into the high-vacuum side (open the gas ballast after a large leak); and no purge after a strong signal." },
        { h: "9. How we do it", body: "Helium mass spectrometry against the criterion agreed on the project drawing. The capability we publish is the 1×10⁻⁹ Pa·m³/s range, with every unit tested rather than sampled. The method references GB/T 36176-2018 and GB/T 32218-2015, and the report is dispatched with the chamber. Pressure-rise testing is not used as an acceptance criterion here for one reason: it cannot separate leakage from outgassing, nor account for temperature error. For process judgement and rough localisation it remains entirely adequate; the sheet that gets signed calls for helium." },
      ],
      closing:
        "Leak testing is a verdict, not a step. A verdict that cannot be stated precisely makes the report meaningless. The same verdict applies to your project once a drawing is submitted.",
    },
  },
{
    slug: "vacuum-furnace-structure-design",
    tags: ["真空炉", "结构设计", "外压校核"],
    faq: [
      { q: "真空腔体按多大压力设计？", a: "按 1.3 atm（约 0.13 MPa）的设计压差校核，水冷夹套另加水的静压。" },
      { q: "壁厚怎么定？", a: "按 ASME 外压式 Pa = 4B/[3(D₀/t)] 计算，判据 Pa > Pd。算例：内径 1000 mm 时，4 mm 壁厚得 0.074 MPa 不合格，5 mm 得 0.15 MPa 通过。" },
      { q: "冷壁炉和热壁炉怎么选？", a: "密封件温度是硬约束、除气可以靠吹扫和抽气时间补，所以冷壁是工程默认解；小炉子且洁净度要求高时，热壁用「密封耐温」换「腔体除气」才划算。" },
    ],
    date: "2026-11-01",
    author: { nameZh: "帕诺工艺团队", nameEn: "PANO Process Team", roleZh: "工艺与质量", roleEn: "Process & Quality", email: "zhouyou@panovacuum.com" },
    cover: "/photos/blog-vacuum-furnace-structure-design-720w.webp",
    zh: {
      title: "真空炉不是「抽真空的加热罐」：结构设计的五个决定",
      intro:
        "真空炉的结构设计有正确顺序：工件怎么进、热往哪走、壳要多厚、泵配多大、联锁怎么锁。顺序错了，装料口会开错、热区塞不进、壁厚算三遍。本文把五个决定逐个算一遍。",
      sections: [
        { h: "1. 工况：10⁻⁴ ~ 10⁻⁶ Torr，最难的其实是开机那一刻", body: "冶金真空炉工作在 10⁻⁴ ~ 10⁻⁶ Torr 的高真空区间。但真正考验设计的是初始抽气：从大气抽到工艺压力这一段气体负荷最大、时间最长，泵与管路都是按这一段配的，不是按稳态配的。" },
        { h: "2. 冷壁还是热壁", body: "热壁炉整腔加热、腔体本身就是加热元件，除气好，但密封必须耐高温、车间温度高。冷壁炉双层壁、环形间隙通水，垫圈不超温，代价是腔体除气差、需延长吹扫。没有绝对优劣：冷壁是工程默认解，因为密封件温度是硬约束，除气可以靠吹扫和抽气时间补；热壁用「密封耐温」换「腔体除气」，只在小炉子上划算。" },
        { h: "3. 热区四件套与传热机制", body: "热区由加热元件、多层辐射屏、支撑结构、水冷夹套组成。10⁻⁶ Torr 下气体对流传热基本消失，只剩辐射与固体导热，用 Stefan-Boltzmann 定律加发射率、角系数（view factor）逐层迭代算屏数与平衡温度，热源是 I²R。所以真空炉的保温不是包一层棉，而是一层层叠金属屏，层数由计算定。" },
        { h: "4. 加热元件按温度选，不按价格选", body: "Kanthal ≈900 ℃，钼 ≈1400 ℃，钨/钽更高，石墨最高但受碳污染限制。用错一档，元件寿命从几千小时掉到几百小时。还有一条踩过坑才知道：带状元件尖边在高电压下会放电，应改成厚实圆截面元件。" },
        { h: "5. 壳要多厚：4 mm 不合格、5 mm 才过关", body: "腔体外面扛一整个大气压，设计压差取 1.3 atm ≈ 0.13 MPa，水冷夹套另加水的静压。外压稳定按 ASME 校核：Pa = 4B/[3(D₀/t)]，判据 Pa > Pd。算例：内径 1000 mm、壁厚 5 mm 时 D₀/t = 202、L/D = 1.98；壁厚 4 mm 得 Pa = 0.074 MPa < 0.13，不合格；加到 5 mm 得 0.15 MPa > 0.13，通过。差 1 mm 从不行到行，所以壁厚必须算，不能按经验加厚。" },
        { h: "6. 泵配多大：先算流导再选泵", body: "有效抽速是串联阻抗：1/S_eff = 1/S_pump + 1/C。流导 C 一卡，泵再大也白搭。典型泵组是扩散泵 + 旋片泵 + 罗茨鼓风机增压，同一台旋片泵靠闸阀先后承担粗抽与 backing，另设 hogging pump 从大气抽到 10⁻³ Torr。抽向 10⁻⁶ Torr 时工艺未开、负荷小，增压泵可旁通省电省水；闸阀因电导大而优先选用。" },
        { h: "7. 密封：双道垫圈中间抽空", body: "要求高的炉体用两道垫圈，中间用小泵抽空，相当于把单道密封的漏率再压一个量级。这是多花一道密封的钱、换一个数量级漏率的典型做法。" },
        { h: "8. 联锁四条，与开炉比关炉危险", body: "四条硬底线：前级泵未开不得开其他泵；真空不足不得加热；H₂O 分压未降不得开工艺；门未关严不得通电。开炉前必须充分冷却、缓慢放气，用灵敏 ΔP 表确认压差归零再开门——微正压就足以把门推开伤人。日常两个故障源：水，壳体一漏真空即毁，用 RGA 盯 H₂O 峰；泄漏检测必须在工艺未开、无负荷时做。" },
        { h: "9. 两条结构常识", body: "装载方式定结构：重件底部装载、有吊车可顶部装载、长轻件前开门；矩形腔容积大但拐角应力集中易漏，圆柱腔更稳。升温必须程序化：升得太快会造成巨大温差与强辐射，热区先坏。" },
      ],
      closing:
        "结构设计是一串取舍：热与密封、壁厚与成本、灵活性与密封可靠性。每一项都能算，算完再定，比事后返工便宜。具体项目仍须按图纸、材质与工况单独校核。",
    },
    en: {
      title: "A vacuum furnace is not just a heated can under vacuum: five structural decisions",
      intro:
        "The order matters: how the load enters, where the heat goes, how thick the shell must be, how large the pumps are, how the interlocks are wired. Get the order wrong and the door, the hot zone and the wall thickness all get redone.",
      sections: [
        { h: "1. Duty: 10⁻⁴ to 10⁻⁶ Torr, and the hardest moment is start-up", body: "Metallurgical vacuum furnaces run in the 10⁻⁴–10⁻⁶ Torr high-vacuum range, but the design is governed by initial evacuation: the run from atmosphere to process pressure carries the largest gas load and takes the longest, and the pumps and piping are sized for it rather than for steady state." },
        { h: "2. Cold wall or hot wall", body: "A hot-wall furnace heats the whole chamber, which doubles as the heating element: good outgassing, but seals must survive temperature and the shop gets hot. A cold-wall furnace uses a double wall with water in the annulus, keeping the seals cool at the cost of poorer chamber outgassing and longer purge. Cold wall is the engineering default because seal temperature is a hard constraint while outgassing can be recovered by purge and pumping time." },
        { h: "3. Hot zone and heat transfer", body: "Heating elements, multilayer radiation shields, supports and a water-cooled jacket. At 10⁻⁶ Torr convection disappears, leaving radiation and solid conduction: Stefan-Boltzmann with emissivity and view factors, iterated layer by layer to fix shield count and equilibrium temperature, with I²R as the source. Insulation is therefore stacked metal shields, not a blanket, and the count comes from calculation." },
        { h: "4. Choose elements by temperature, not price", body: "Kanthal ≈900 °C, molybdenum ≈1400 °C, tungsten and tantalum higher, graphite highest but limited by carbon contamination. One grade wrong can cut element life from thousands of hours to hundreds. Strip elements also arc at sharp edges under high voltage and should be replaced by thick round sections." },
        { h: "5. How thick the shell must be: 4 mm fails, 5 mm passes", body: "The shell carries a full atmosphere: design differential 1.3 atm ≈ 0.13 MPa, plus static head in the cooling jacket. External-pressure stability follows the ASME allowable Pa = 4B/[3(D₀/t)] with the criterion Pa > Pd. For 1000 mm bore at 5 mm wall, D₀/t = 202 and L/D = 1.98; at 4 mm the allowable is 0.074 MPa, below 0.13 and rejected; at 5 mm it is 0.15 MPa and passes. One millimetre is the difference, which is why the thickness is calculated rather than padded." },
        { h: "6. Sizing pumps: conductance first", body: "Effective pumping speed is a series impedance: 1/S_eff = 1/S_pump + 1/C. Choke the conductance and pump size stops mattering. A typical train is diffusion pump, rotary vane and Roots blower, with the vane pump roughing and backing through valves and a hogging pump taking atmosphere down to 10⁻³ Torr; during the run to 10⁻⁶ Torr the blower can be bypassed to save power and water, and gate valves are preferred for their conductance." },
        { h: "7. Sealing: twin gaskets with intermediate pumping", body: "Higher-duty furnaces use two gaskets with a small pump evacuating the space between them, taking the single-seal leak rate down by an order of magnitude for the cost of one more seal." },
        { h: "8. Four interlocks, and opening is riskier than closing", body: "No other pump without the backing pump; no heating below vacuum; no process until the H₂O partial pressure falls; no power with the door unsealed. Before opening, cool fully, vent slowly and confirm zero differential on a sensitive ΔP gauge — slight positive pressure alone can throw the door open. Two routine failure sources: water, which destroys vacuum the moment the shell leaks and is watched on the RGA H₂O peak, and leak testing done hot rather than cold and unloaded." },
        { h: "9. Two structural rules of thumb", body: "Loading defines the structure: bottom loading for heavy parts, top loading with a crane, front opening for long light parts; rectangular chambers offer volume but concentrate stress at the corners, cylindrical ones are more robust. Heat-up must be ramped: too fast creates steep gradients and intense radiation that kills the hot zone first." },
      ],
      closing:
        "Structural design is a chain of trade-offs — heat against sealing, wall thickness against cost, flexibility against seal reliability. Each can be calculated, and calculating before committing is cheaper than reworking. Specific projects still require their own check against drawing, material and duty.",
    },
  },
{
    slug: "coating-chamber-cleaning-particle-control",
    tags: ["清洁工艺", "颗粒控制", "出气"],
    faq: [
      { q: "腔体洗完还是抽不下去，先查什么？", a: "先区分出气与漏。水汽出气率按 3×10⁻⁹/t（小时）衰减，清洗后表面水层若已重新吸饱，之前抽的时间就白费了。" },
      { q: "烘烤能解决多少问题？", a: "250 ℃ × 24 h 可把水汽压 4 个数量级（2×10⁻¹⁰ → 1×10⁻¹⁴），但氢只压 1 个数量级，氢要靠真空退火或长时间抽气。" },
      { q: "颗粒要求怎么换算到每片晶圆？", a: "用关键颗粒直径与允许缺陷数折算：ITRS 2003 给出的量级是 25–50 nm 对应 59–97 颗/片，现行门槛更严，以客户规范为准。" },
    ],
    date: "2026-11-01",
    author: { nameZh: "帕诺工艺团队", nameEn: "PANO Process Team", roleZh: "工艺与质量", roleEn: "Process & Quality", email: "zhouyou@panovacuum.com" },
    cover: "/photos/blog-coating-chamber-cleaning-particle-control-720w.webp",
    zh: {
      title: "镀膜腔体洗得再干净，为什么还是抽不下去",
      intro:
        "真空上不去，九成不是漏，是出气。表面有两处在放气：水和藏在损伤层里的氢。前者靠烘烤和抽气时间，后者靠清洗工艺，两者不能互相替代。",
      sections: [
        { h: "1. 水汽有个简洁的经验式", body: "对所有真空金属（不锈钢、铜、铝、钛），室温水汽出气率约 q = 3×10⁻⁹/t（小时），单位 mbar·L/(s·cm²)。抽气时间乘 10，出气率与压力都降一个数量级。推论两条：抽不下去多抽几小时不是玄学；洗完必须马上抽真空，表面水层一旦重新吸饱，前面抽掉的时间就白费。" },
        { h: "2. 烘烤解决水汽，解决不了氢", body: "不锈钢抽气 10 h 后实测（Torr·L/(s·cm²)）：H₂O 2×10⁻¹⁰ → 1×10⁻¹⁴（压 4 个数量级）；CO 5×10⁻¹² → 1×10⁻¹⁴；H₂ 7×10⁻¹² → 5×10⁻¹³，只压 1 个数量级，且烘完稳定不动。氢要靠真空退火或长时间抽气——选工艺路线最容易搞错的就是这一条。" },
        { h: "3. 烘烤温度按材料定", body: "铜、铝 150–200 ℃ × 24 h 即够，氢出气率降到 <10⁻¹³；不锈钢要 >200 ℃ 甚至 300 ℃，几毫米厚钢腔需反复多次烘烤；在位烘烤对金属 >120 ℃、≥12 h 有效，常规 150–250 ℃ × 24 h，主要去处是水汽；Viton 上限约 200 ℃，超温会永久变形或分解，反而变成污染源。这就是铝腔体好烘、钢腔体难烘的原因。" },
        { h: "4. 烘烤结束的三条判据", body: "压力在设定温度下不再下降；降温后压力回落到目标值；残余气体谱里 18（H₂O）峰降到 28（CO/N₂）峰以下。前两条看表，第三条必须上 RGA。没有 RGA 就说烘好了，是猜。" },
        { h: "5. 清洗是三层，不是一次擦", body: "① 去油脂、指纹、松散颗粒：溶剂、碱性洗涤剂、超声；② 去氧化层与污染膜：酸洗、电抛或化学抛光；③ 去损伤层：需专门工艺（真空退火、离子轰击）。只做①不做③是国产腔体最常见的短板：表面看着干净，损伤层里的氢和杂质在抽真空后慢慢释放，压力卡在 10⁻⁷ 量级上不去，烘烤也救不回来。一次裸手接触的指纹，其出气量可以抵消几小时烘烤。" },
        { h: "6. 一个 O-ring 值两个数量级", body: "烘烤过的全金属系统，分子泵极限压力 10⁻¹⁰–10⁻¹¹ mbar；只要有一处弹性体密封，极限就掉到 10⁻⁸ 量级。这就是超高真空必须全金属、CF 刀口的定量依据。" },
        { h: "7. 颗粒门槛先看是哪一年的数", body: "ITRS 2003（FEP Table 70a）：关键颗粒直径 2003 年 50 nm / 59 颗每片、2005 年 40 nm / 97 颗、2007 年 32.5 nm / 80 颗、2009 年 25 nm / 68 颗；关键 GOI 表面金属 ≤0.5×10¹⁰ atoms/cm²，其他关键表面金属 ≤1×10¹⁰，表面碳 1.8×10¹³，可动离子 1.8×10¹⁰。这是 2003 版路线图，当代更严，价值在单位、量级和定义形式，不能当现行标准引用。" },
        { h: "8. 反直觉：传片机构比腔体更脏", body: "ITRS 2003 Table 109a（defects/m²，54 nm 折算）：Plasma etch 1049、CVD insulator 854、Metal PVD 591、Wet bench 474、CMP clean 397，而 wafer handling 只有 33，到 2009 年降到 6。机器人、升降销、门阀比腔体本身更容易带进颗粒——颗粒控制只盯内壁，方向就错了。" },
        { h: "9. 4 Å 和 Ra 0.1 µm 不是一回事", body: "ITRS 要求晶圆表面 LVGX RMS 4 Å（≈0.4 nm）；国产电抛常见 Ra 0.1–0.2 µm（行业经验值）。两者差两个数量级，定义也不同（RMS vs Ra）。别把电抛 Ra 直接对标晶圆级要求，也别因内壁 Ra 高就断言颗粒超标——中间还隔着气流、流场与传片机构。" },
        { h: "10. 可以照着做的四条纪律", body: "洗干净立即抽真空，不在车间过夜；烘烤按材料定温度，别让 Viton 超过 200 ℃；烘烤结束看三条判据，其中一条必须是 RGA 的 18/28 峰对比；需要时加辉光放电清洗去表面残留污染物。清洁不是动作，是带判据的流程；动作做完没有判据，等于没做。" },
      ],
      closing:
        "出气与颗粒是两件事：出气看表面化学，颗粒看流场与运动部件。两件事都要判据，判据都要能复现。",
    },
    en: {
      title: "Why a coating chamber still will not pump down after cleaning",
      intro:
        "Nine times out of ten the problem is outgassing, not leakage. Two sources dominate: water, and hydrogen trapped in the damaged surface layer. Baking and pumping time address the first; only the cleaning process addresses the second.",
      sections: [
        { h: "1. Water follows a simple empirical law", body: "For all vacuum metals — stainless, copper, aluminium, titanium — room-temperature water outgassing is about 3×10⁻⁹/t (hours) in mbar·L/(s·cm²). Ten times the pumping time gives one order lower outgassing and pressure. Two consequences: pumping longer is not folklore, and a cleaned chamber must be pumped immediately — a re-saturated water layer wastes the pumping already done." },
        { h: "2. Baking fixes water, not hydrogen", body: "Measured after 10 h pumping on stainless (Torr·L/(s·cm²)): H₂O from 2×10⁻¹⁰ to 1×10⁻¹⁴, four orders; CO from 5×10⁻¹² to 1×10⁻¹⁴; H₂ from 7×10⁻¹² to 5×10⁻¹³, barely one order and then flat. Hydrogen needs vacuum annealing or long pumping — the most commonly misread point when choosing a process route." },
        { h: "3. Baking temperature follows the material", body: "Copper and aluminium reach below 10⁻¹³ with 150–200 °C for 24 h; stainless needs above 200 °C, up to 300 °C, and millimetre-thick walls may need repeated bakes. In-situ baking above 120 °C for at least 12 h is effective on metal, with 150–250 °C for 24 h as common practice, mainly for water. Viton is limited to about 200 °C; overheating deforms or decomposes it into a contamination source. This is why aluminium chambers bake easily and steel ones do not." },
        { h: "4. Three criteria for ending a bake", body: "Pressure stops falling at temperature; pressure returns to target after cooling; and the mass-18 (H₂O) peak drops below mass 28 (CO/N₂) on the RGA. The first two are gauge readings; the third requires an RGA. Without one, calling a bake complete is guesswork." },
        { h: "5. Cleaning has three layers, not one wipe", body: "Grease, fingerprints and loose particles (solvents, alkaline detergent, ultrasound); oxide and contaminated films (acid, electropolish or chemical polish); and the damaged layer (vacuum annealing, ion bombardment). Skipping the third is the most common domestic shortfall: the surface looks clean, but hydrogen and impurities in the damaged layer bleed out, pressure stalls at 10⁻⁷ and baking cannot rescue it. A single bare-hand contact can outgas enough to cancel hours of baking." },
        { h: "6. One O-ring costs two orders", body: "A baked all-metal system reaches 10⁻¹⁰–10⁻¹¹ mbar ultimate; a single elastomer seal drops the ultimate to the 10⁻⁸ range. That is the quantitative basis for all-metal, CF-knife-edge construction in UHV — not a matter of taste." },
        { h: "7. Check the vintage of any particle number", body: "ITRS 2003 (FEP Table 70a): critical particle diameter 50 nm with 59 per wafer in 2003, 40 nm with 97 in 2005, 32.5 nm with 80 in 2007, 25 nm with 68 in 2009; critical GOI surface metals ≤0.5×10¹⁰ atoms/cm², other critical metals ≤1×10¹⁰, surface carbon 1.8×10¹³, mobile ions 1.8×10¹⁰. This is the 2003 roadmap and today's limits are tighter: the value lies in units, magnitude and definition, not as a current standard." },
        { h: "8. Counter-intuitive: handling is dirtier than the chamber", body: "ITRS 2003 Table 109a (defects/m², 54 nm equivalent): plasma etch 1049, CVD insulator 854, metal PVD 591, wet bench 474, CMP clean 397, while wafer handling is only 33, falling to 6 by 2009. Robots, lift pins and slit valves contribute more particles than the chamber itself — watching only the inner wall aims at the wrong target." },
        { h: "9. 4 Å and Ra 0.1 µm are not the same thing", body: "ITRS specifies LVGX RMS 4 Å (about 0.4 nm) on the wafer; domestic electropolishing commonly quotes Ra 0.1–0.2 µm, an industry rule of thumb. Two orders apart, and different definitions (RMS versus Ra). Neither equate electropolish Ra with wafer-level requirements nor condemn a chamber on Ra alone: gas flow, flow field and handling sit in between." },
        { h: "10. Four rules that can be followed as written", body: "Pump immediately after cleaning, never overnight in the shop; set bake temperature by material and keep Viton below 200 °C; end the bake on the three criteria, one of which must be the RGA 18/28 comparison; finish with glow discharge cleaning where residual surface contamination matters. Cleaning is a process with criteria, not an action; an action without a criterion has not been performed." },
      ],
      closing:
        "Outgassing and particles are separate problems: one is surface chemistry, the other is flow field and moving parts. Both need criteria, and criteria need to be reproducible.",
    },
  },
];
