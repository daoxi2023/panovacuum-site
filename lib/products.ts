// 产品族（Product families）。定位：在「能力页」与「案例页」之间承接按品类检索的访客——
// 他们还没有图纸，想先知道「这类东西你做成什么样、材料与接口能否对上、怎么验收」。
//
// 写作红线（与全站一致）：
// - 只写台账能证的数字：3 万瓦激光 / 400 t·6.2 m 折弯 / 40+ 焊接工位 / 50 t 行车 / 氦检 1×10⁻⁹ 量级 / 数吨级单件。
// - 不写标准型号、SKU、报价，不承诺整机真空度；尺寸、公差、法兰标准一律「按图纸评审确认」。
// - 不写认证（ISO9001 / EN1090 / 3834 均为推进中）。
export type ProductFamily = {
  slug: string;
  image: string;
  iw: number;
  ih: number;
  zh: { name: string; tagline: string; points: string[]; alt: string };
  en: { name: string; tagline: string; points: string[]; alt: string };
};

export const productFamilies: ProductFamily[] = [
  {
    slug: "cylindrical-vacuum-chambers",
    image: "/photos/custom-vacuum-chamber-304l-stainless-1200w.webp",
    iw: 1200,
    ih: 893,
    zh: {
      name: "圆形与筒式腔体",
      tagline: "筒体卷制成形、法兰对接与密封面加工在同一个厂区完成，减少分段拼焊。",
      points: [
        "材料：304 / 304L / 316L 不锈钢，按图纸牌号与表面要求",
        "成形：3 万瓦激光下料、400 吨 · 6.2 米折弯与卷制；数吨级单件可用 50 吨行车吊装翻转",
        "接口与检验：法兰、观察窗、馈通位置按图；氦质谱检漏逐台执行至 1×10⁻⁹ Pa·m³/s 量级",
      ],
      alt: "车间内的圆形不锈钢真空腔体筒体",
    },
    en: {
      name: "Cylindrical vacuum chambers",
      tagline: "Shell rolling, flange fit-up and sealing-face machining happen in one plant, so long seams are not split across suppliers.",
      points: [
        "Material: 304 / 304L / 316L stainless, to the drawing's grade and surface requirement",
        "Forming: 30 kW laser blanking, 400 t / 6.2 m press brake and rolling; multi-tonne units handled by the 50 t crane",
        "Interfaces and testing: flanges, viewports and feedthroughs per drawing; every unit helium tested in the 1×10⁻⁹ Pa·m³/s range",
      ],
      alt: "Cylindrical stainless steel vacuum chamber shell in the workshop",
    },
  },
  {
    slug: "rectangular-vacuum-chambers",
    image: "/photos/case-custom-square-chamber-1200w.webp",
    iw: 1200,
    ih: 825,
    zh: {
      name: "方形与箱式腔体",
      tagline: "大板一次折弯成形，门框与铰链门按图纸配作，结构不必套用标准目录。",
      points: [
        "材料：304L 板材为主，牌号与厚度按图纸",
        "成形：6.2 米折弯长度内的大板一次成形，减少拼焊与后续校形",
        "接口与检验：门框、密封槽、观察窗与接口按图；逐台检漏，尺寸记录按约定范围",
      ],
      alt: "方形不锈钢真空腔体与铰链门",
    },
    en: {
      name: "Square and box chambers",
      tagline: "Large sheets formed in one bend, door frames and hinged doors fitted to the drawing — geometry follows the drawing, not a catalogue.",
      points: [
        "Material: mainly 304L sheet, grade and thickness per drawing",
        "Forming: sheets up to the 6.2 m bend length formed in one operation, reducing weld seams and re-straightening",
        "Interfaces and testing: door frames, seal grooves, viewports and ports per drawing; leak tested per unit, dimensions recorded to the agreed scope",
      ],
      alt: "Square stainless steel vacuum chamber with a hinged door",
    },
  },
  {
    slug: "large-horizontal-chambers",
    image: "/photos/multi-ton-304l-vacuum-chamber-1600w.webp",
    iw: 1600,
    ih: 1067,
    zh: {
      name: "大型卧式与数吨级腔体",
      tagline: "单件数吨、长度以米计的腔体，在行车覆盖范围内整体总装与翻转。",
      points: [
        "单件重量：数吨级，50 吨行车整体吊装与翻转，不需要分体交付后再拼",
        "结构：长尺寸腔体的分段方式与吊点位置在图纸评审阶段确定",
        "检验与发运：整体检漏后按出口包装要求装箱，检验记录随货交付",
      ],
      alt: "数吨级 304L 大型卧式真空腔体",
    },
    en: {
      name: "Large horizontal and multi-tonne chambers",
      tagline: "Chambers weighing several tonnes and metres long, assembled and turned as one piece under the crane.",
      points: [
        "Unit weight: multi-tonne, lifted and rotated as one piece by the 50 t crane rather than split for shipment",
        "Structure: the split strategy and lifting points for long chambers are settled during drawing review",
        "Testing and dispatch: leak tested as a whole, then crated to the export packing requirement with records inside",
      ],
      alt: "Multi-tonne 304L horizontal vacuum chamber",
    },
  },
  {
    slug: "vacuum-furnace-chambers",
    image: "/photos/product-vacuum-furnace-chamber-1200w.webp",
    iw: 1200,
    ih: 825,
    zh: {
      name: "真空炉与热处理腔体",
      tagline: "炉壳、炉门与冷却水路接口按图制造，加热元件与内衬的配合尺寸在评审阶段对齐。",
      points: [
        "结构：炉壳、炉门、法兰与吊耳按图纸制作，密封面与门框配作",
        "接口：加热元件、内衬、热电偶与水路接口位置按图配合，开孔在焊接前确认",
        "检验：焊接后氦质谱检漏；水冷与气路的试验范围在项目确认时约定",
      ],
      alt: "车间内的真空热处理炉腔体与开启的炉门",
    },
    en: {
      name: "Vacuum furnace and heat-treatment chambers",
      tagline: "Furnace shells, doors and cooling-water interfaces built to drawing, with heating-element and insulation fits agreed at review.",
      points: [
        "Structure: shell, door, flanges and lifting lugs to drawing; sealing faces fitted against the door frame",
        "Interfaces: positions for heating elements, insulation, thermocouples and water lines agreed per drawing, with openings confirmed before welding",
        "Testing: helium leak testing after welding; the scope of water-circuit and gas-line tests is agreed for the project",
      ],
      alt: "Vacuum heat-treatment furnace chamber with its door open",
    },
  },
  {
    slug: "coating-process-chambers",
    image: "/photos/product-coating-process-chamber-1200w.webp",
    iw: 1200,
    ih: 825,
    zh: {
      name: "镀膜与沉积工艺腔体",
      tagline: "PVD、CVD 与磁控溅射工艺腔，靶位、气路与馈通接口按图纸布置。",
      points: [
        "结构：方形或圆形工艺腔，门、观察窗、电极馈通与靶位接口按图",
        "制造：在受控洁净焊接环境内完成焊接，并衔接后续表面处理工序",
        "检验：逐台氦质谱检漏；颗粒与清洁度要求按项目约定，不套用通用等级",
      ],
      alt: "带观察窗与电极馈通的镀膜工艺真空腔体",
    },
    en: {
      name: "Coating and deposition process chambers",
      tagline: "PVD, CVD and magnetron-sputtering chambers with target, gas-line and feedthrough interfaces laid out to drawing.",
      points: [
        "Structure: square or round process chamber; door, viewports, electrode feedthroughs and target ports per drawing",
        "Manufacturing: welded inside the controlled clean welding environment, with the following surface steps scheduled in",
        "Testing: helium leak tested per unit; particle and cleanliness requirements are agreed per project rather than quoted as a generic class",
      ],
      alt: "Vacuum coating process chamber with viewport and electrode feedthroughs",
    },
  },
  {
    slug: "flange-feedthrough-components",
    image: "/photos/uhv-feedthrough-flange-assembly-1600w.webp",
    iw: 1600,
    ih: 900,
    zh: {
      name: "法兰、馈通与密封组件",
      tagline: "法兰、馈通座与密封面按图加工，关键配合尺寸逐件记录。",
      points: [
        "系列：CF 刀口法兰、KF 快卸法兰、ISO-K 双爪法兰，以及盲板、中心环、转接件与馈通座，型号按图或按配对标准件确认",
        "加工：按图车铣法兰、馈通座与密封配合面，配合尺寸按图控制；O 圈槽槽型与槽底按图，未注明处按配对件实测复核",
        "材料：不锈钢为主，牌号与热处理状态按图纸",
        "检验：关键尺寸逐件记录；与腔体同步检漏，检漏条件在评审阶段确认",
      ],
      alt: "不锈钢真空法兰与馈通组件",
    },
    en: {
      name: "Flanges, feedthroughs and sealing components",
      tagline: "Flanges, feedthrough bodies and sealing faces machined to drawing, with critical fits recorded piece by piece.",
      points: [
        "Series: CF knife-edge, KF quick-release and ISO-K double-claw flanges, plus blanks, centring rings, adaptors and feedthrough bodies, sized to drawing or confirmed against the mating standard part",
        "Machining: flanges, feedthrough bodies and sealing faces turned and milled to drawing, with fits controlled to the drawing; O-ring groove form and base to drawing, otherwise cross-checked against the mating part",
        "Material: mainly stainless, grade and heat-treatment condition per drawing",
        "Testing: critical dimensions recorded per piece; leak tested together with the chamber, with test conditions agreed at review",
      ],
      alt: "Stainless steel vacuum flanges and feedthrough assembly",
    },
  },
];
