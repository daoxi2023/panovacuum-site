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
      title: "从图纸到交付：真空腔体的 7 道检验",
      intro: "真空腔体不是「焊完就交付」。从图纸到出厂，我们设 7 道检验闸口，每台带记录，客户可追溯。",
      sections: [
        { h: "1. 图纸评审与 DFM", body: "制造前逐图评审，可制造性、公差与泄漏路径风险先与客户对齐。" },
        { h: "2. 来料检验", body: "按规格核对材料质保书与表面状态后放行入库。" },
        { h: "3. 下料与坡口", body: "3 万瓦激光厚板切割，坡口同工序一次成形，装配间隙稳定。" },
        { h: "4. 精密加工", body: "CNC 与 H200 落地镗铣（4 m 级回转），关键尺寸逐件记录。" },
        { h: "5. 焊接", body: "40+ 气保焊工位，TIG 与自动化工艺，受控洁净焊接环境，焊缝记录随腔体留存。" },
        { h: "6. 氦质谱检漏", body: "UL1000 级、1×10⁻⁹ Pa·m³/s 量级，逐台验证而非抽检。" },
        { h: "7. 出厂检验与交付", body: "按图纸做尺寸与表面终检，检验报告随货交付。" },
      ],
      closing: "给设备团队的价值：可追溯、有记录、按图纸交付——不是口头承诺。发来图纸，同一套检验流程作用于您的腔体。",
    },
    en: {
      title: "7 Inspection Gates: From Drawing to Vacuum Chamber Delivery",
      intro: "A vacuum chamber is not \"done when welded\". We run 7 inspection gates from drawing to delivery — documented per unit, traceable for your equipment team.",
      sections: [
        { h: "1. Drawing review & DFM", body: "Every drawing is reviewed before fabrication; manufacturability, tolerances and leak-path risks are flagged and agreed with the customer." },
        { h: "2. Incoming material inspection", body: "Material certificates and surface condition are checked against the specification before stock release." },
        { h: "3. Blanking & bevel preparation", body: "Thick-plate cutting on a 30,000 W laser; weld bevels prepared in the same pass for consistent fit-up." },
        { h: "4. Precision machining", body: "CNC and H200 floor-type boring-milling with 4 m-class rotation; key dimensions are recorded per part." },
        { h: "5. Welding", body: "TIG and automated processes across 40+ gas-shielded stations in a controlled clean welding environment; weld records kept per chamber." },
        { h: "6. Helium leak testing", body: "UL1000-class mass-spectrometer leak test to the 1×10⁻⁹ Pa·m³/s order — every chamber verified, not sampled." },
        { h: "7. Final inspection & delivery", body: "Dimensional and surface checks against the drawing, with inspection reports shipped alongside the unit." },
      ],
      closing: "Why it matters to your equipment team: traceable, documented delivery — not promises. Send your drawing and see the same gates applied to your chamber.",
    },
  },
  {
    slug: "chamber-material-304l-or-316l",
    date: "2026-10-27",
    author: { nameZh: "帕诺工艺团队", nameEn: "PANO Process Team", roleZh: "材料与工艺", roleEn: "Materials & Process", email: "zhouyou@panovacuum.com" },
    cover: "/photos/news-2.webp",
    zh: {
      title: "真空腔体用 304L 还是 SUS316L？",
      intro: "结论：常规腔体用 304L 就够；工艺环境有腐蚀性气氛、或对耐蚀性有明确要求时，选 316L。拿不准就把使用环境写在询价里，我们按工况建议，不按习惯拍脑袋。",
      sections: [
        { h: "两种钢差在哪", body: "304L 与 316L 都是奥氏体不锈钢。316L 多加了钼（Mo），耐点蚀和耐氯离子腐蚀更强，成本也更高。对真空腔体来说，两种都能满足常规真空与焊接要求。" },
        { h: "什么时候选 316L", body: "镀膜工艺里带腐蚀性气氛、接触酸碱或氯离子环境、或者客户图纸明确指定 SUS316L——这种情况选 316L。常规半导体设备真空腔体，304L 是主流选择。" },
        { h: "我们能做什么", body: "304L / SUS316L 都常备，牌号与表面处理按图纸指定。材料质保书随货交付，来料按规格核对后才放行入库。" },
      ],
      closing: "拿不准选哪种？发图纸时注明使用环境（工艺、气氛、温度），我们出 DFM 建议时一并给出材料建议。",
    },
    en: {
      title: "Chamber Material: 304L or SUS316L?",
      intro: "Short answer: 304L covers most standard chambers; choose 316L when the process involves corrosive atmospheres or the drawing specifies it. Unsure? Put the operating environment in your RFQ and we will advise — not guess.",
      sections: [
        { h: "What differs", body: "Both are austenitic stainless steels. 316L adds molybdenum (Mo) for better pitting and chloride resistance, at a higher cost. For vacuum chambers, both meet normal vacuum and welding requirements." },
        { h: "When to choose 316L", body: "Coating processes with corrosive atmospheres, contact with acids, chlorides, or a drawing that explicitly specifies SUS316L. For standard semiconductor vacuum chambers, 304L is the mainstream choice." },
        { h: "What we do", body: "We stock and fabricate both 304L and SUS316L; grade and surface finish follow your drawing. Material certificates ship with the unit, and incoming material is checked against the specification before release." },
      ],
      closing: "Not sure which to pick? Send your drawing and note the operating environment (process, atmosphere, temperature) — we will include a material recommendation with our DFM review.",
    },
  },
  {
    slug: "how-to-request-a-quote-with-a-drawing",
    date: "2026-10-27",
    author: { nameZh: "周游", nameEn: "Zhou You", roleZh: "商务与销售", roleEn: "Sales & BD", email: "zhouyou@panovacuum.com" },
    cover: "/photos/news-3.webp",
    zh: {
      title: "怎么给真空腔体询价：一张图纸就够了",
      intro: "结论：发图纸（PDF / DWG / STEP）给我们，48 小时内得到实质回复——图纸评审、DFM 建议、报价、节点计划，一次性给全。",
      sections: [
        { h: "需要准备什么", body: "图纸或 3D 模型（PDF/DWG/STEP 都行）；写清楚材料、数量、目标交期、工作压力（如有）。没有正式图纸？拍张照片、说个大概尺寸，也能先聊。" },
        { h: "收到之后我们做什么", body: "先做图纸评审与 DFM 建议：可制造性、公差、泄漏路径风险先和您对齐，再出报价。报价里含节点计划，交期锁进合同。" },
        { h: "一些常见担心", body: "单件定制也接，没有起订量门槛；海外客户全程英语沟通；付款按合同约定（如 30/70 或信用证协商）。出口包装与文件齐备。" },
      ],
      closing: "发来图纸，同一天内您会收到我们的初步评审意见。",
    },
    en: {
      title: "How to Request a Quote for a Vacuum Chamber: One Drawing Is Enough",
      intro: "Short answer: send your drawing (PDF / DWG / STEP) and you get a substantive reply within 48 hours — drawing review, DFM feedback, quotation and a milestone schedule in one response.",
      sections: [
        { h: "What to prepare", body: "A drawing or 3D model (PDF, DWG or STEP), plus material, quantity, target timeline and operating pressure if any. No formal drawing yet? A photo with rough dimensions is enough to start the conversation." },
        { h: "What happens after you send it", body: "We start with drawing review and DFM feedback — manufacturability, tolerances and leak-path risks are agreed before quoting. The quotation includes a milestone schedule that we commit to." },
        { h: "Common concerns", body: "Single-piece custom work is accepted with no minimum-order gate; overseas customers get full English process support; payment per contract (e.g., 30/70 or agreed LC terms). Export packing and documentation are included." },
      ],
      closing: "Send your drawing — you will have our initial review feedback the same day.",
    },
  },
];
