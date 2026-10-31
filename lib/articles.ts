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
  author: ArticleAuthor;
  cover: string;
  zh: { title: string; intro: string; sections: ArticleSection[]; closing: string };
  en: { title: string; intro: string; sections: ArticleSection[]; closing: string };
};

export const articles: Article[] = [
  {
    slug: "vacuum-chamber-7-inspection-gates",
    date: "2026-10-27",
    author: { nameZh: "帕诺工艺团队", nameEn: "PANO Process Team", roleZh: "工艺与质量", roleEn: "Process & Quality", email: "zhouyou@panovacuum.com" },
    cover: "/photos/news-1.webp",
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
    date: "2026-10-27",
    author: { nameZh: "帕诺工艺团队", nameEn: "PANO Process Team", roleZh: "材料与工艺", roleEn: "Materials & Process", email: "zhouyou@panovacuum.com" },
    cover: "/photos/news-2.webp",
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
    date: "2026-10-27",
    author: { nameZh: "周游", nameEn: "Zhou You", roleZh: "商务与销售", roleEn: "Sales & BD", email: "zhouyou@panovacuum.com" },
    cover: "/photos/news-3.webp",
    zh: {
      title: "真空腔体怎么询价：一张图纸就够了",
      intro: "请提交图纸，支持 PDF、DWG、STEP 格式。48 小时内答复：可制造性评估、DFM 建议、报价与交期。",
      sections: [
        { h: "需要准备什么", body: "图纸或 3D 模型，并注明材料、数量与期望交期；如项目存在工期压力，可一并说明。尚无正式图纸时，可先提供实物照片与大致尺寸，以便先期评估方案。" },
        { h: "收到之后我们做什么", body: "先进行图纸评审：可制造性、公差与潜在泄漏部位，确认后再出具报价。报价中附节点计划，交期写入合同。" },
        { h: "一些常见担心", body: "承接单件，无最小起订量。海外客户可全程英文沟通，电话与邮件均可。付款方式按合同约定，可协商 30/70 付款或信用证结算。出口包装与单证由我方提供。" },
      ],
      closing: "提交图纸后，当日即可收到初步评审意见。",
    },
    en: {
      title: "How to request a vacuum chamber quotation: a drawing is sufficient",
      intro: "Drawings are accepted in PDF, DWG or STEP format. Within 48 hours we return a feasibility assessment, DFM recommendations, a price and a delivery date.",
      sections: [
        { h: "What to submit", body: "The drawing or 3D model, together with material, quantity and required delivery date. Operating pressure should be stated where applicable. Where no formal drawing is available, photographs and approximate dimensions are sufficient for an initial assessment." },
        { h: "Review and quotation", body: "The drawing is reviewed first for manufacturability, tolerance requirements and likely leak paths. Once these points are agreed, a quotation is issued with a milestone schedule, which forms part of the contract." },
        { h: "Common questions", body: "Single units are accepted; there is no minimum order quantity. Overseas customers are supported in English by telephone or email. Payment terms follow the contract; 30/70 terms or a letter of credit can be discussed. Export packing and documentation are provided by us." },
      ],
      closing: "Submit the drawing and initial review comments are returned the same day.",
    },
  },
];
