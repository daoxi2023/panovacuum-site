// 主题系列（hub）定义：每个系列是一个可独立排名的落地页。
// 文章归属用显式 slug 列表 + tag 交集，两者取并集，新增文章只填 tag 也能自动归入。
export type BlogTopic = {
  slug: string;
  zh: { name: string; short: string; intro: string; points: string[]; faq: { q: string; a: string }[] };
  en: { name: string; short: string; intro: string; points: string[]; faq: { q: string; a: string }[] };
  articleSlugs: string[];
  tags: string[];
};

export const blogTopics: BlogTopic[] = [
  {
    slug: "leak-testing",
    articleSlugs: ["helium-leak-test-vs-pressure-rise", "vacuum-chamber-7-inspection-gates"],
    tags: ["检漏", "氦检", "质量判定", "检验"],
    zh: {
      name: "检漏与验收",
      short: "氦质谱和压降法各测什么，读数怎么判，验收文件怎么写。",
      intro:
        "真空上不去，先要分开两件事：漏，和出气。这两件事的处理方式和判据完全不同，混着谈就会得出错误结论。这个系列把检漏方法的选择、读数的解释、以及「什么数可以写进验收文件」讲清楚。",
      points: [
        "压降法测到的是漏率与出气之和，适合过程判断与粗定位，不作为独立验收判据。",
        "氦质谱检漏按 1×10⁻⁹ Pa·m³/s 量级执行，具体判据与测点以项目图纸约定为准。",
        "热态、带负载、工艺已开过的腔体检漏读数不可比，检漏要在无负荷状态下做。",
        "记录要同时带仪器型号、示踪气体、时间与温度，否则数据不可复现，也不可追溯。",
      ],
      faq: [
        {
          q: "压降法能不能代替氦质谱检漏？",
          a: "不能作为验收判据。压降法测的是漏率与出气率之和，无法把两者分开；只有经过充分烘烤、出气可忽略的系统，压降读数才接近真实漏率。它的价值在于便宜、可在现场反复做、能快速定位大漏点。",
        },
        {
          q: "检漏应该在制造的哪个阶段做？",
          a: "焊缝完成后先做一次粗检定位，总装完成、洁净处理前做最终检漏。放在最后做的问题是：一旦不合格，返工要拆开已经清洁过的零件，洁净度与前序工时都要重来。",
        },
      ],
    },
    en: {
      name: "Leak testing & acceptance",
      short: "What helium testing and pressure-rise testing each measure, how to read them, and what belongs in an acceptance record.",
      intro:
        "When a chamber will not pump down, two causes must be separated first: leakage and outgassing. They are treated differently and judged by different criteria, and confusing them leads to the wrong conclusion. This series covers method selection, how to read the numbers, and which numbers are defensible in an acceptance document.",
      points: [
        "The pressure-rise method measures leakage plus outgassing together; it suits process checks and coarse localisation, not standalone acceptance.",
        "Helium mass-spectrometer testing is performed in the 1×10⁻⁹ Pa·m³/s range, with the exact criterion and test points agreed on the project drawing.",
        "Readings taken hot, under load, or after process has run are not comparable: leak testing is done unloaded.",
        "A record without instrument model, tracer gas, duration and temperature cannot be reproduced or audited.",
      ],
      faq: [
        {
          q: "Can pressure-rise testing replace helium leak testing?",
          a: "Not as an acceptance criterion. It measures leakage and outgassing together and cannot separate them; only on a well-baked system where outgassing is negligible does the rise rate approach the true leak rate. Its value is that it is cheap, repeatable on site, and quickly locates gross leaks.",
        },
        {
          q: "At which stage of fabrication should leak testing be done?",
          a: "A coarse test after welding locates defects early; the final test follows assembly and precedes cleanliness processing. Testing only at the end means a failure requires disassembling already-clean parts, repeating both cleaning and prior labour.",
        },
      ],
    },
  },
  {
    slug: "design-materials",
    articleSlugs: ["vacuum-furnace-structure-design", "chamber-material-304l-or-316l"],
    tags: ["真空炉", "结构设计", "外压校核", "材料选型", "不锈钢", "腔体"],
    zh: {
      name: "设计与材料",
      short: "外压校核、壁厚、密封面刚度，以及 304L 与 316L 到底差在哪。",
      intro:
        "真空腔体的结构问题，不是「壁够不够厚」这么一句话。真正决定成败的是三件事：外压下的稳定性、密封面的刚度、以及热与洁净约束能不能同时满足。材料选择则要在耐蚀、可焊、低出气三者之间取舍。",
      points: [
        "真空腔体承受的是外压，先算失稳再定壁厚；短圆筒与长圆筒的临界压力公式不同，不能用错。",
        "壁厚差 1 mm 常常就决定校核通过与否，1 m 级直径的腔体尤其明显。",
        "密封面与法兰的刚度不足，会把螺栓预紧力变成局部变形，漏点永远在变形最大的位置。",
        "材料差别不在牌号好听，在碳含量与钼含量：低碳保证焊缝耐蚀，钼决定氯离子环境下的表现。",
      ],
      faq: [
        {
          q: "真空腔体为什么要按外压容器设计？",
          a: "内部抽真空后，大气压成为作用在壁上的主要载荷，失效形式是弹性失稳（被压瘪），而不是强度破坏。失稳往往在远低于材料屈服强度的应力下发生，所以必须按外压稳定性校核，而不是按内压强度公式加余量。",
        },
        {
          q: "304L 和 316L 怎么选？",
          a: "常规真空环境、无氯离子、成本敏感时用 304L；工艺气体含卤素、需要更高耐蚀性、或后续要频繁清洗消毒时用 316L（含 2–3% 钼）。两者都是低碳牌号，焊接后耐晶间腐蚀能力优于非 L 牌号。最终以工艺介质与客户规范为准。",
        },
      ],
    },
    en: {
      name: "Design & materials",
      short: "External-pressure check, wall thickness, seal-face stiffness, and what actually separates 304L from 316L.",
      intro:
        "The structural question for a vacuum chamber is not simply whether the wall is thick enough. Three things decide the outcome: stability under external pressure, stiffness of the sealing faces, and whether thermal and cleanliness constraints can be met at the same time. Material selection trades corrosion resistance against weldability and low outgassing.",
      points: [
        "A vacuum chamber carries external pressure: check buckling first, then set thickness. Short and long cylinders use different critical-pressure expressions and must not be mixed up.",
        "One millimetre of wall thickness often decides whether the check passes, particularly at 1 m-class diameters.",
        "Insufficient flange and seal-face stiffness turns bolt preload into local distortion, and the leak always appears where the distortion is greatest.",
        "The material difference is carbon and molybdenum content, not the grade name: low carbon protects weld corrosion resistance, molybdenum governs behaviour in chloride environments.",
      ],
      faq: [
        {
          q: "Why is a vacuum chamber designed as an external-pressure vessel?",
          a: "Once evacuated, atmospheric pressure becomes the dominant load and the governing failure mode is elastic buckling rather than strength. Buckling occurs well below yield, so an external-pressure stability check is required rather than an internal-pressure strength formula with a margin.",
        },
        {
          q: "How to choose between 304L and 316L?",
          a: "Use 304L for ordinary vacuum service without chlorides where cost matters; use 316L (2–3% molybdenum) when process gas contains halogens, higher corrosion resistance is needed, or frequent cleaning and sanitisation is expected. Both are low-carbon grades with better intergranular corrosion resistance after welding than the non-L grades. The process medium and customer specification govern.",
        },
      ],
    },
  },
  {
    slug: "clean-particle",
    articleSlugs: ["coating-chamber-cleaning-particle-control"],
    tags: ["清洁工艺", "颗粒控制", "出气"],
    zh: {
      name: "清洁与颗粒控制",
      short: "抽不下去多半是出气不是漏；颗粒来源往往不在内壁。",
      intro:
        "「洗干净了还是抽不下去」是真空现场最常见的困惑。答案通常在表面化学：水有明确的衰减规律，氢藏在损伤层里，两者不能互相替代处理。而颗粒控制的真正难点，常常不在腔体内壁，而在传片机构与流场。",
      points: [
        "水汽出气率按 3×10⁻⁹/t（小时）衰减：抽气时间乘 10，出气率与压力降一个数量级。",
        "烘烤能把水汽压 4 个数量级，氢只能压 1 个数量级；氢要靠真空退火或长时间抽气。",
        "清洗分三层：去油脂颗粒、去氧化与污染膜、去损伤层。只做第一层是最常见短板。",
        "一处弹性体密封就能把极限压力从 10⁻¹⁰ 量级拉到 10⁻⁸ 量级，这是全金属结构的定量依据。",
        "判据要能复现：压力走平、降温回落、RGA 上 18 峰低于 28 峰，三条缺一不可。",
      ],
      faq: [
        {
          q: "腔体清洗后仍然抽不下去，先查什么？",
          a: "先分清出气与漏：关阀做压升，再看压升曲线的形状与 RGA 谱。若以质量数 18（水）为主且随时间衰减，是出气；若各峰同步上升且不衰减，优先查漏。顺序错了会白拆一次。",
        },
        {
          q: "什么时候值得上全金属（CF）结构？",
          a: "当目标极限压力进入 10⁻⁹ mbar 以下、且需要反复烘烤时。弹性体密封会把极限限制在 10⁻⁸ 量级，且烘烤温度被材料上限卡住。若工艺只需 10⁻⁶ 量级，全金属是过度设计。",
        },
      ],
    },
    en: {
      name: "Cleaning & particle control",
      short: "Poor pump-down is usually outgassing, not leakage; and particles often come from handling, not the wall.",
      intro:
        "\"It is clean but it still will not pump down\" is the most common puzzle on a vacuum site. The answer usually lies in surface chemistry: water follows a clear decay law and hydrogen hides in the damaged layer, and neither treatment substitutes for the other. Particle control, meanwhile, is often limited not by the chamber wall but by wafer handling and the flow field.",
      points: [
        "Water outgassing falls as 3×10⁻⁹/t (hours): ten times the pumping time gives one order lower outgassing and pressure.",
        "Baking removes four orders of water but only one of hydrogen; hydrogen needs vacuum annealing or long pumping.",
        "Cleaning has three layers: grease and particles, oxide and contaminated films, and the damaged layer. Doing only the first is the most common shortfall.",
        "A single elastomer seal takes the ultimate from the 10⁻¹⁰ range to the 10⁻⁸ range — the quantitative case for all-metal construction.",
        "Criteria must be reproducible: pressure levelling, post-cooling recovery, and an RGA 18/28 peak comparison. All three, not two.",
      ],
      faq: [
        {
          q: "The chamber has been cleaned and still will not pump down. What to check first?",
          a: "Separate outgassing from leakage: close the valve, record the pressure-rise curve, and read the RGA. A dominant mass-18 (water) peak that decays over time indicates outgassing; peaks rising together without decay point to a leak. Getting the order wrong costs a needless teardown.",
        },
        {
          q: "When is all-metal (CF) construction worth it?",
          a: "When the target ultimate is below 10⁻⁹ mbar and repeated baking is required. Elastomer seals cap the ultimate around 10⁻⁸ and limit bake temperature to the material's ceiling. If the process only needs the 10⁻⁶ range, all-metal is over-engineering.",
        },
      ],
    },
  },
  {
    slug: "quote-delivery",
    articleSlugs: ["how-to-request-a-quote-with-a-drawing"],
    tags: ["询价", "图纸评审", "流程", "制造流程"],
    zh: {
      name: "询价与交付",
      short: "报价差异大通常不是加工费，而是图纸信息量不一样。",
      intro:
        "同一张腔体图纸，三家报价能差一倍。原因多数不在加工费率，而在信息的完整度：材质与板厚、关键尺寸公差、密封形式、焊缝与检漏标准、交付物清单。信息补齐，报价才可比，交期才可算。这个系列讲清楚提交什么、约定什么、验收什么。",
      points: [
        "询价至少给到：材质与板厚、关键尺寸与公差、密封形式、表面处理要求、数量与交期。",
        "焊缝验收标准与检漏判据要写进图纸或技术协议，不写就按各自习惯做，结果不可比。",
        "交付物提前约定：检验报告、检漏记录、材质证明、焊缝记录，缺一项都会在验收时卡住。",
        "七道检查每道签字留档、报告随货，客户来查时记录是现成的。",
      ],
      faq: [
        {
          q: "询价需要提供哪些资料？",
          a: "装配图与关键零件图（含材质、板厚、公差）、密封结构与 O-ring/金属密封规格、表面处理与清洁要求、检漏判据、数量与期望交期。有 3D 模型更好，但图纸上的公差与技术要求才是报价依据。",
        },
        {
          q: "检漏报告能随货提供吗？",
          a: "可以，且建议在技术协议里写明报告形式（仪器型号、本底、测试压力、读数、判定值、测试人与日期）。没有本底与判定值的「合格」二字，在客户审核时无法作为证据。",
        },
      ],
    },
    en: {
      name: "Quotation & delivery",
      short: "Quote spreads usually reflect how much information the drawing carries, not machining rates.",
      intro:
        "Three quotes for the same chamber drawing can differ by a factor of two. The reason is rarely the machining rate and usually the completeness of information: material and plate thickness, tolerances on key dimensions, seal type, weld and leak-test standards, and the deliverables list. With the information complete, quotes become comparable and lead times calculable. This series covers what to submit, what to agree, and what to inspect against.",
      points: [
        "A quotation request needs at minimum: material and thickness, key dimensions and tolerances, seal type, surface treatment, quantity and required date.",
        "Weld acceptance standard and leak-test criterion belong in the drawing or technical agreement; without them each shop applies its own habit and results are not comparable.",
        "Agree deliverables up front: inspection report, leak-test record, material certificate, weld records. A missing item stalls acceptance.",
        "All seven inspection gates are signed off and filed, with the report travelling with the unit, so records exist when a customer audits.",
      ],
      faq: [
        {
          q: "What should be supplied with a quotation request?",
          a: "Assembly and key-part drawings with material, thickness and tolerances; seal construction and O-ring or metal-seal specification; surface treatment and cleanliness requirements; leak-test criterion; quantity and required date. A 3D model helps, but the tolerances and technical requirements on the drawing are what quoting is based on.",
        },
        {
          q: "Can a leak-test report be supplied with the chamber?",
          a: "Yes, and it is best specified in the technical agreement: instrument model, background, test pressure, reading, acceptance value, tester and date. A bare \"passed\" without background and acceptance value is not usable as evidence in a customer audit.",
        },
      ],
    },
  },
];

// 文章 → 所属系列（一篇可属多个系列；取第一个用于文章页的「所属系列」链接）
export function topicOfArticle(slug: string, tags: string[] = []): BlogTopic | undefined {
  return blogTopics.find((t) => t.articleSlugs.includes(slug) || tags.some((tag) => t.tags.includes(tag)));
}
