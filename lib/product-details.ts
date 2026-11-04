// 产品族详情页文案（6 族 × 中英）。与 lib/products.ts 的卡片文案配套：
// - products.ts 管「总览页卡片」（名称、一句话定位、三条要点）；
// - 本文件管「详情页正文」（怎么造、接口与配合、怎么验收、规格表、三条问询）。
//
// 写作红线（与全站一致，逐句都要能落到台账）：
// - 数字只用：3 万瓦激光 / 400 t·6.2 m 折弯 / 40+ 焊接工位 / 50 t 行车 / 氦检 1×10⁻⁹ Pa·m³/s 量级 / 数吨级单件。
// - 不写标准型号与 SKU，不报价，不承诺整机真空度、温度均匀性、洁净度等级。
// - 尺寸、公差、板厚、密封形式、法兰标准一律「按图纸评审确认」。
// - 不写认证（ISO9001 / EN1090 / 3834 均为推进中）。
export type FamilySection = { h: string; p: string };

export type FamilyDetail = {
  slug: string;
  zh: {
    intro: string;
    sections: FamilySection[];
    specs: [string, string][];
    faq: { q: string; a: string }[];
    articles: string[];
    service: string;
  };
  en: {
    intro: string;
    sections: FamilySection[];
    specs: [string, string][];
    faq: { q: string; a: string }[];
    articles: string[];
    service: string;
  };
};

export const familyDetails: FamilyDetail[] = [
  {
    slug: "cylindrical-vacuum-chambers",
    zh: {
      intro:
        "圆形腔体是真空设备里最常见的一类：泵口、观察窗、电极与法兰全部落在筒体与端盖上。我们按图纸把筒体卷制、端盖成形、法兰对接与密封面加工放在同一个厂区走完，减少分段外协带来的累积误差。",
      sections: [
        {
          h: "怎么造",
          p: "筒体按图卷制后纵缝焊接，端盖单独成形再与筒体对接；法兰对接前先对齐孔位与密封面，焊后按需做整形与表面处理。板材牌号（304 / 304L / 316L）与板厚按图，3 万瓦激光下料，6.2 米折弯与卷制在厂内完成。",
        },
        {
          h: "接口与配合",
          p: "泵口、观察窗、电极馈通、测量接口的位置与朝向按图布置；法兰标准、密封形式（O 圈槽、刀口、CF）以图纸标注为准，未标注的在图纸评审阶段确认。几吨重的单件在 50 吨行车下整体吊装翻转，装配与焊接都不需要拆成小段。",
        },
        {
          h: "怎么验收",
          p: "焊后逐台氦质谱检漏，量级到 1×10⁻⁹ Pa·m³/s；关键尺寸按约定范围记录，检验记录随货交付。真空度本身取决于泵组、密封与工艺，我们不在页面承诺整机指标，需要时在项目里约定测试条件。",
        },
      ],
      specs: [
        ["材料", "304 / 304L / 316L 不锈钢，牌号与板厚按图"],
        ["成形", "卷制 + 端盖成形；3 万瓦激光下料，400 吨 · 6.2 米折弯"],
        ["焊接", "40+ 工位 TIG 与自动化焊接，受控洁净焊接环境"],
        ["吊装与总装", "数吨级单件由 50 吨行车整体吊装与翻转"],
        ["检验", "逐台氦质谱检漏至 1×10⁻⁹ Pa·m³/s 量级；关键尺寸按约定记录"],
        ["尺寸与公差", "按图纸评审确认，含法兰标准与密封形式"],
      ],
      faq: [
        {
          q: "能按我们指定的法兰标准做吗？",
          a: "可以。图纸上标注标准号、通径与密封形式即可；没有标注的，我们在图纸评审时提出建议并由你确认，不会自行改标准。",
        },
        {
          q: "板厚和材料由谁定？",
          a: "以你的图纸为准。若图上未定，我们可按工况（外压、吊装、开孔补强）给出建议，但最终仍写进确认后的图纸。",
        },
        {
          q: "交期怎么给？",
          a: "按件数、板厚、开孔数量与工序排。报价时一并给出排期，不在页面上承诺固定天数。",
        },
      ],
      articles: ["chamber-material-304l-or-316l", "vacuum-chamber-7-inspection-gates"],
      service: "custom-vacuum-chambers",
    },
    en: {
      intro:
        "The round chamber is the most common shape in vacuum equipment: pump ports, viewports, electrodes and flanges all land on the shell and its end caps. We keep shell rolling, cap forming, flange fit-up and sealing-face machining in one plant, so tolerance does not pile up across outside subcontractors.",
      sections: [
        {
          h: "How it is built",
          p: "The shell is rolled to drawing and its longitudinal seam welded; end caps are formed separately and then fitted to the shell. Flanges are aligned on hole pattern and sealing face before welding, with re-straightening and surface work after. Sheet grade (304 / 304L / 316L) and thickness follow the drawing, with 30 kW laser blanking and 6.2 m bending and rolling in house.",
        },
        {
          h: "Interfaces and fits",
          p: "Pump ports, viewports, electrode feedthroughs and gauge ports are placed and oriented to drawing; flange standard and seal type (O-ring groove, knife edge, CF) follow the drawing, and anything unmarked is agreed at review. Multi-tonne units are lifted and turned whole under the 50 t crane, so assembly and welding do not need to be split into pieces.",
        },
        {
          h: "How it is verified",
          p: "Every unit is helium leak tested after welding, in the 1×10⁻⁹ Pa·m³/s range; critical dimensions are recorded to the agreed scope and the records ship with the chamber. Base pressure depends on the pump set, seals and process, so we do not quote a system figure here — test conditions are agreed per project.",
        },
      ],
      specs: [
        ["Material", "304 / 304L / 316L stainless, grade and thickness to drawing"],
        ["Forming", "Rolled shell plus formed caps; 30 kW laser blanking, 400 t / 6.2 m press brake"],
        ["Welding", "TIG and automated welding across 40-plus stations in a controlled clean welding bay"],
        ["Lifting and assembly", "Multi-tonne units lifted and turned whole by the 50 t crane"],
        ["Testing", "Helium leak test per unit in the 1×10⁻⁹ Pa·m³/s range; critical dimensions recorded as agreed"],
        ["Dimensions and tolerances", "Agreed at drawing review, including flange standard and seal type"],
      ],
      faq: [
        {
          q: "Can you work to our flange standard?",
          a: "Yes. Put the standard, size and seal type on the drawing. If they are missing we propose at review and wait for your confirmation rather than substituting our own.",
        },
        {
          q: "Who decides wall thickness and material?",
          a: "Your drawing does. If it is still open we can suggest values from load, lifting and opening reinforcement, but they go into the confirmed drawing.",
        },
        {
          q: "How is lead time quoted?",
          a: "From piece count, thickness, number of openings and the process route. It is quoted together with the price; we do not promise fixed days on this page.",
        },
      ],
      articles: ["chamber-material-304l-or-316l", "vacuum-chamber-7-inspection-gates"],
      service: "custom-vacuum-chambers",
    },
  },
  {
    slug: "rectangular-vacuum-chambers",
    zh: {
      intro:
        "方形腔体的优势是容积利用率与开门尺寸，难点在平板刚度与门框密封。我们把大板一次折弯成形、门框与铰链门按图配作，再按需加加强筋，结构跟着图纸走，不套标准箱体。",
      sections: [
        {
          h: "怎么造",
          p: "侧板在 6.2 米折弯长度内一次成形，减少拼焊与后续校形；箱体组对时先定基准面与门框，再装其余板件。304L 板材为主，板厚与加强筋布置按图；开孔在焊接前确认位置，避免焊后补孔。",
        },
        {
          h: "接口与配合",
          p: "门可以是铰链门或螺栓压紧门，密封槽按图纸形式加工；观察窗、泵口、馈通与电气接口的位置按图布置。门框与门板配作，关闭后的贴合面在总装时检查，密封件按图选型。",
        },
        {
          h: "怎么验收",
          p: "逐台氦质谱检漏，门与各接口单独确认；关键尺寸（内腔、门框平面度、孔位）按约定范围记录。方形腔的变形控制主要在焊接顺序与工装，评审时会把焊接顺序写进工艺。",
        },
      ],
      specs: [
        ["材料", "304L 板材为主，牌号与板厚按图"],
        ["成形", "6.2 米折弯长度内大板一次成形，减少拼焊"],
        ["门与门框", "铰链门或螺栓压紧门，密封槽按图加工，门框配作"],
        ["加强", "加强筋布置按尺寸与工况在图纸评审时确定"],
        ["检验", "逐台氦质谱检漏；内腔、门框平面度、孔位按约定记录"],
        ["尺寸与公差", "按图纸评审确认"],
      ],
      faq: [
        {
          q: "方形腔会不会变形？",
          a: "平板焊接必然有变形，靠折弯成形、加强筋、焊接顺序与工装控制。具体布置在评审时按你的尺寸定，我们不承诺「不变形」，只承诺按约定范围验收。",
        },
        {
          q: "门用铰链还是螺栓压紧？",
          a: "看使用频次与开孔尺寸。频繁开合多用铰链门，长期闭合多用螺栓压紧；图纸没定时我们在评审里给建议。",
        },
        {
          q: "最大能做多大？",
          a: "受 6.2 米折弯长度与 50 吨行车覆盖范围限制。超过这个尺度的，需要在评审阶段拆分成可制造的板件与拼焊方案。",
        },
      ],
      articles: ["vacuum-chamber-7-inspection-gates", "how-to-request-a-quote-with-a-drawing"],
      service: "custom-vacuum-chambers",
    },
    en: {
      intro:
        "The square chamber wins on usable volume and door size, and loses on flat-panel stiffness and door sealing. We form large sheets in a single bend, fit door frames and hinged doors to the drawing, and add stiffeners where the drawing calls for them — geometry follows your drawing rather than a standard box.",
      sections: [
        {
          h: "How it is built",
          p: "Side panels are formed in one operation within the 6.2 m bend length, which cuts weld seams and re-straightening. Assembly starts from a datum face and the door frame, then the remaining panels. 304L sheet is the default, with thickness and stiffener layout to drawing; openings are confirmed before welding so nothing has to be patched afterwards.",
        },
        {
          h: "Interfaces and fits",
          p: "The door can be hinged or bolt-clamped, with the seal groove machined to the drawing; viewports, pump ports, feedthroughs and electrical interfaces are placed to drawing. Door frame and door leaf are fitted as a pair, and the closed contact face is checked at assembly, with seals selected from the drawing.",
        },
        {
          h: "How it is verified",
          p: "Every unit is helium tested, with the door and each port checked individually; critical dimensions (internal volume, door-frame flatness, hole positions) are recorded to the agreed scope. Distortion in a box chamber is controlled by weld sequence and fixturing, and that sequence is written into the process at review.",
        },
      ],
      specs: [
        ["Material", "Mainly 304L sheet, grade and thickness to drawing"],
        ["Forming", "Large sheets formed in one bend within the 6.2 m bend length"],
        ["Door and frame", "Hinged or bolt-clamped door, seal groove machined to drawing, frame fitted as a pair"],
        ["Stiffening", "Stiffener layout settled at drawing review from size and duty"],
        ["Testing", "Helium leak test per unit; internal volume, door-frame flatness and hole positions recorded as agreed"],
        ["Dimensions and tolerances", "Agreed at drawing review"],
      ],
      faq: [
        {
          q: "Will a square chamber distort?",
          a: "Welding flat panels always distorts something; we control it with formed corners, stiffeners, weld sequence and fixturing. The layout is settled at review against your dimensions. We do not promise no distortion, only acceptance within the agreed scope.",
        },
        {
          q: "Hinged door or bolt-clamped?",
          a: "It depends on how often the door opens and on the opening size. Hinged doors suit frequent access, bolt-clamped doors suit long closed periods; if the drawing is silent we advise at review.",
        },
        {
          q: "How large can you go?",
          a: "Limited by the 6.2 m bend length and the 50 t crane envelope. Beyond that, the chamber has to be split into buildable panels and welded joints, which is decided at review.",
        },
      ],
      articles: ["vacuum-chamber-7-inspection-gates", "how-to-request-a-quote-with-a-drawing"],
      service: "custom-vacuum-chambers",
    },
  },
  {
    slug: "large-horizontal-chambers",
    zh: {
      intro:
        "卧式大腔体通常单件数吨、长度以米计，难点不在焊接本身，而在吊装、翻转、分段与运输。这类件我们从图纸评审阶段就把吊点、分段位置和运输尺寸一起定下来。",
      sections: [
        {
          h: "怎么造",
          p: "筒体或箱体分段制造，段与段对接前先校圆、对齐中心线；对接完成后整体在 50 吨行车下翻转，做另一侧的焊接与检查。内件、导轨、支撑与吊耳按图安装，焊后按需做消除应力与整形。",
        },
        {
          h: "接口与配合",
          p: "大腔体的泵口、观察窗、门与内件接口特别多，布置冲突在评审阶段就要发现。分段位置、吊点与运输鞍座按图或共同确认，避免出厂后在现场无法吊装。",
        },
        {
          h: "怎么验收",
          p: "整体或分段氦质谱检漏后总装复检；关键尺寸（直线度、法兰面位置、吊点间距）按约定记录。发运按出口包装要求装箱，包装清单与检验记录随箱，需要的运输加固在评审时一并定。",
        },
      ],
      specs: [
        ["单件重量", "数吨级，50 吨行车整体吊装与翻转"],
        ["分段与吊点", "分段位置、吊点、运输鞍座在图纸评审阶段确定"],
        ["材料", "304 / 304L / 316L 不锈钢，按图"],
        ["焊接", "分段制造后对接，40+ 工位 TIG 与自动化焊接"],
        ["检验", "氦质谱检漏至 1×10⁻⁹ Pa·m³/s 量级；直线度与法兰位置按约定记录"],
        ["发运", "出口包装要求装箱，检验记录随货"],
      ],
      faq: [
        {
          q: "运输尺寸受限怎么办？",
          a: "在评审阶段拆成可运输的分段，接口留在便于现场对接和复检的位置；分段方案与复检方式一起写进报价。",
        },
        {
          q: "吊点由谁定？",
          a: "按图，或由双方在评审时确认。吊点位置要同时满足厂内翻转与现场安装，这一点图纸上常常只标了一边。",
        },
        {
          q: "能整体检漏吗？",
          a: "能，逐台做，量级到 1×10⁻⁹ Pa·m³/s。分段交付的，接口在现场对接后按约定复检。",
        },
      ],
      articles: ["vacuum-chamber-7-inspection-gates", "helium-leak-test-vs-pressure-rise"],
      service: "custom-vacuum-chambers",
    },
    en: {
      intro:
        "A horizontal chamber is usually several tonnes and metres long; the hard part is not welding but lifting, turning, splitting and shipping. For these we settle lifting points, split positions and transport envelope at drawing review, before anything is cut.",
      sections: [
        {
          h: "How it is built",
          p: "The shell or box is built in sections, each trued and centre-aligned before fit-up. After the joint is closed the whole assembly is turned under the 50 t crane to weld and inspect the other side. Internals, rails, supports and lifting lugs go in to drawing, with stress relief and re-straightening where needed after welding.",
        },
        {
          h: "Interfaces and fits",
          p: "Large chambers carry a lot of ports, viewports, doors and internal fixtures, and conflicts have to be caught at review rather than on the floor. Split positions, lifting points and transport saddles are drawn or agreed jointly so the chamber can still be lifted once it leaves the plant.",
        },
        {
          h: "How it is verified",
          p: "Helium tested as a whole, or per section with a re-test after final assembly; critical dimensions (straightness, flange-face positions, lifting-point spacing) recorded as agreed. Dispatch follows the export packing requirement, with packing list and records in the crate, and any transport bracing agreed at review.",
        },
      ],
      specs: [
        ["Unit weight", "Multi-tonne, lifted and turned whole by the 50 t crane"],
        ["Splits and lifting points", "Split positions, lifting points and transport saddles settled at drawing review"],
        ["Material", "304 / 304L / 316L stainless, to drawing"],
        ["Welding", "Section build then fit-up, TIG and automated welding across 40-plus stations"],
        ["Testing", "Helium leak test in the 1×10⁻⁹ Pa·m³/s range; straightness and flange positions recorded as agreed"],
        ["Dispatch", "Crated to the export packing requirement with records inside"],
      ],
      faq: [
        {
          q: "What if transport limits the size?",
          a: "We split into shippable sections at review, keeping joints where they can be closed and re-tested on site; the split plan and re-test scope are quoted together.",
        },
        {
          q: "Who sets the lifting points?",
          a: "The drawing, or both sides at review. They have to serve in-plant turning and site installation, and drawings often only show one of the two.",
        },
        {
          q: "Can the whole chamber be leak tested?",
          a: "Yes, per unit, in the 1×10⁻⁹ Pa·m³/s range. For sectional delivery, joints are re-tested on site to the agreed scope after fit-up.",
        },
      ],
      articles: ["vacuum-chamber-7-inspection-gates", "helium-leak-test-vs-pressure-rise"],
      service: "custom-vacuum-chambers",
    },
  },
  {
    slug: "vacuum-furnace-chambers",
    zh: {
      intro:
        "真空炉腔体是把炉壳、炉门、水冷与加热区接口做在一起的一类活。我们做腔体本体与接口配合，热工设计与温控由使用方或联合方负责——这条边界在报价前就写清楚。",
      sections: [
        {
          h: "怎么造",
          p: "炉壳按图卷制或折弯成形，炉门与门框配作，密封面加工后与门板对研；法兰、吊耳、支撑与接管按图焊接。水冷夹套或水冷管路的走向、接头位置按图，焊后单独做水压或气密检查（范围按项目约定）。",
        },
        {
          h: "接口与配合",
          p: "加热元件、隔热屏、内衬、热电偶与观察窗的接口位置在评审阶段逐项对齐，因为这些尺寸一旦定错，炉内件就装不进去。开孔在焊接前确认，避免焊后改孔影响密封面。",
        },
        {
          h: "怎么验收",
          p: "焊后氦质谱检漏，量级到 1×10⁻⁹ Pa·m³/s；水冷与气路的试验范围在项目确认时约定。温度均匀性、升温曲线属于热工调试范围，不在腔体制造的范围里承诺。",
        },
      ],
      specs: [
        ["材料", "304 / 304L / 316L 不锈钢，按图"],
        ["结构", "炉壳、炉门、门框、法兰、吊耳与接管按图制作"],
        ["水冷", "夹套或管路走向按图；水压/气密检查范围按项目约定"],
        ["热区接口", "加热元件、隔热屏、内衬、热电偶位置在评审阶段逐项对齐"],
        ["检验", "氦质谱检漏至 1×10⁻⁹ Pa·m³/s 量级；尺寸记录按约定"],
        ["边界", "腔体本体与接口配合；热工设计与温控不在此范围"],
      ],
      faq: [
        {
          q: "加热元件和内衬由谁提供？",
          a: "按项目分工。常见做法是你方提供热区内件、我们负责腔体与接口配合尺寸；也可以由我们按图代购安装，具体写进合同。",
        },
        {
          q: "水路试验做到哪一步？",
          a: "按项目约定：可以只做水压保压，也可以做流量与温升记录。页面上不写死，因为不同炉型的差别很大。",
        },
        {
          q: "温度均匀性能保证吗？",
          a: "不保证。均匀性取决于加热功率分布、隔热屏、装料与工艺曲线，属热工调试范围；我们保证的是腔体尺寸、焊接与密封。",
        },
      ],
      articles: ["vacuum-furnace-structure-design", "chamber-material-304l-or-316l"],
      service: "vacuum-tight-welding",
    },
    en: {
      intro:
        "A furnace chamber is where shell, door, water cooling and hot-zone interfaces meet. We build the chamber and the interface fits; thermal design and temperature control stay with the user or a joint party, and that boundary is written down before quoting.",
      sections: [
        {
          h: "How it is built",
          p: "The shell is rolled or formed to drawing, the door and frame fitted as a pair with sealing faces machined and lapped against each other, and flanges, lugs, supports and nozzles welded to drawing. Cooling-jacket or cooling-line routing and connector positions follow the drawing, with a pressure or tightness check afterwards to the scope agreed for the project.",
        },
        {
          h: "Interfaces and fits",
          p: "Positions for heating elements, heat shields, insulation, thermocouples and viewports are checked item by item at review, because a wrong dimension there means the hot-zone parts will not go in. Openings are confirmed before welding so nothing has to be re-cut across a sealing face later.",
        },
        {
          h: "How it is verified",
          p: "Helium leak tested after welding in the 1×10⁻⁹ Pa·m³/s range; the scope of water-circuit and gas-line tests is agreed per project. Temperature uniformity and ramp curves belong to thermal commissioning and are not promised as part of chamber fabrication.",
        },
      ],
      specs: [
        ["Material", "304 / 304L / 316L stainless, to drawing"],
        ["Structure", "Shell, door, frame, flanges, lugs and nozzles to drawing"],
        ["Water cooling", "Jacket or line routing to drawing; pressure and tightness checks per project scope"],
        ["Hot-zone interfaces", "Heating elements, shields, insulation and thermocouple positions checked at review"],
        ["Testing", "Helium leak test in the 1×10⁻⁹ Pa·m³/s range; dimensions recorded as agreed"],
        ["Boundary", "Chamber body and interface fits; thermal design and control are out of scope"],
      ],
      faq: [
        {
          q: "Who supplies heating elements and insulation?",
          a: "It depends on the split. Commonly the customer supplies hot-zone parts and we own the chamber and interface dimensions; we can also procure and install to drawing if that is in the contract.",
        },
        {
          q: "How far does water-circuit testing go?",
          a: "As agreed: a pressure hold only, or pressure plus flow and temperature-rise records. We do not fix it on this page because it varies a lot between furnace types.",
        },
        {
          q: "Is temperature uniformity guaranteed?",
          a: "No. Uniformity depends on power distribution, shields, load and recipe, and belongs to thermal commissioning. What we guarantee is chamber dimensions, welding and sealing.",
        },
      ],
      articles: ["vacuum-furnace-structure-design", "chamber-material-304l-or-316l"],
      service: "vacuum-tight-welding",
    },
  },
  {
    slug: "coating-process-chambers",
    zh: {
      intro:
        "镀膜与沉积工艺腔的活，一半在腔体本身，一半在靶位、气路、馈通与清洁度。我们做腔体与这些接口的配合，焊接在受控洁净焊接环境里完成，颗粒与清洁度要求按项目约定，不套用通用等级。",
      sections: [
        {
          h: "怎么造",
          p: "方形或圆形工艺腔按图成形，门、观察窗、靶位、电极馈通与气路接口按图开孔与焊接；内表面按工艺要求做处理（抛光、电解或喷砂按图）。焊接在受控洁净焊接环境内完成，焊后清理与工序间保护按约定执行。",
        },
        {
          h: "接口与配合",
          p: "靶位间距、馈通位置与气路走向在评审阶段确认，因为这些尺寸要和电源、气柜、基片架对齐。盲板法兰、观察窗与传感器的接口形式按图，未标注的在评审时确认。",
        },
        {
          h: "怎么验收",
          p: "逐台氦质谱检漏；内表面清洁度按约定的方法检查（白布擦拭、目视或按你方标准），颗粒要求写进项目约定而不是页面上的通用等级。包装前做封口保护，避免运输过程污染内表面。",
        },
      ],
      specs: [
        ["材料", "304 / 304L / 316L 不锈钢，按图"],
        ["结构", "方形或圆形工艺腔；门、观察窗、靶位、馈通与气路接口按图"],
        ["表面", "内表面抛光、电解或喷砂按工艺要求（图纸注明）"],
        ["焊接", "受控洁净焊接环境内完成，工序间保护按约定"],
        ["检验", "逐台氦质谱检漏；清洁度按约定方法检查，颗粒要求按项目约定"],
        ["包装", "封口保护后装箱，避免运输污染内表面"],
      ],
      faq: [
        {
          q: "洁净度等级能保证吗？",
          a: "不套用通用等级。你给方法（例如白布擦拭后的目视判定、颗粒计数或你方企业标准），我们按该方法检验并在合同里写明；没有方法的，评审时一起定。",
        },
        {
          q: "靶位和馈通位置还能改吗？",
          a: "评审阶段可以改，改完进图纸；开孔焊接之后改动代价很大，所以这类尺寸我们坚持在评审时冻结。",
        },
        {
          q: "内表面处理能做到什么程度？",
          a: "按图纸要求做抛光、电解或喷砂，粗糙度以图纸标注为准；需要更细的，先试样确认再批量。",
        },
      ],
      articles: ["coating-chamber-cleaning-particle-control", "helium-leak-test-vs-pressure-rise"],
      service: "vacuum-tight-welding",
    },
    en: {
      intro:
        "Half of a coating chamber is the vessel, the other half is targets, gas lines, feedthroughs and cleanliness. We build the chamber and the interface fits, weld inside the controlled clean welding environment, and take particle and cleanliness requirements from the project rather than quoting a generic class.",
      sections: [
        {
          h: "How it is built",
          p: "The square or round process chamber is formed to drawing, with doors, viewports, target ports, electrode feedthroughs and gas inlets cut and welded to drawing; internal surfaces are finished to the process requirement (polished, electropolished or blasted, as marked). Welding happens inside the controlled clean welding environment, with post-weld cleaning and inter-stage protection to the agreed scope.",
        },
        {
          h: "Interfaces and fits",
          p: "Target spacing, feedthrough positions and gas routing are confirmed at review, because they have to line up with the power supply, gas cabinet and substrate holder. Blank flanges, viewports and sensor ports follow the drawing; anything unmarked is agreed at review.",
        },
        {
          h: "How it is verified",
          p: "Helium tested per unit; internal cleanliness checked by the agreed method (white-cloth wipe, visual, or your own standard), with particle requirements written into the project scope instead of a generic class on a web page. Internal surfaces are sealed before packing so transport does not contaminate them.",
        },
      ],
      specs: [
        ["Material", "304 / 304L / 316L stainless, to drawing"],
        ["Structure", "Square or round chamber; doors, viewports, targets, feedthroughs and gas ports to drawing"],
        ["Surface", "Internal polish, electropolish or blasting per process requirement (marked on drawing)"],
        ["Welding", "Inside the controlled clean welding environment, with inter-stage protection as agreed"],
        ["Testing", "Helium leak test per unit; cleanliness checked by the agreed method, particle limits per project"],
        ["Packing", "Internal surfaces sealed before crating to avoid transport contamination"],
      ],
      faq: [
        {
          q: "Can you guarantee a cleanliness class?",
          a: "Not as a generic class. Give us the method — white-cloth wipe with visual judgement, particle counting, or your own company standard — and we test to it with the method written into the contract. If there is no method yet, we define one at review.",
        },
        {
          q: "Can target and feedthrough positions still change?",
          a: "Yes at review, before the drawing is frozen. After the ports are cut and welded, changes get expensive, which is why we insist on freezing those dimensions at review.",
        },
        {
          q: "How fine can internal surface finishing go?",
          a: "Polishing, electropolishing or blasting as the drawing requires, with roughness per the drawing callout; for tighter values we make a sample first and confirm before the batch.",
        },
      ],
      articles: ["coating-chamber-cleaning-particle-control", "helium-leak-test-vs-pressure-rise"],
      service: "vacuum-tight-welding",
    },
  },
  {
    slug: "flange-feedthrough-components",
    zh: {
      intro:
        "法兰、馈通座与密封组件单件不大，但决定整台设备的漏率与装配节拍。我们按图车铣这些件，关键配合尺寸逐件记录，并在腔体检漏时同步验证。",
      sections: [
        {
          h: "怎么造",
          p: "法兰、馈通座与密封配合面按图车铣加工，材料以不锈钢为主，牌号与热处理状态按图；密封槽的宽度、深度与表面粗糙度按图控制。加工完成后去毛刺、清洗，按需做表面处理。",
        },
        {
          h: "接口与配合",
          p: "标准法兰按图纸标注的标准号与通径加工，非标件按图；与腔体焊接的接口，焊接坡口与配合尺寸在评审时一起确认，避免腔体开孔与法兰外径对不上。",
        },
        {
          h: "怎么验收",
          p: "关键尺寸逐件记录（密封面、槽宽槽深、孔位）；与腔体同步做氦质谱检漏，检漏条件在评审阶段确认。材质单随货，按需提供。",
        },
      ],
      specs: [
        ["加工", "按图车铣法兰、馈通座与密封配合面"],
        ["材料", "不锈钢为主，牌号与热处理状态按图"],
        ["密封面", "槽宽、槽深与表面粗糙度按图控制"],
        ["检验", "关键尺寸逐件记录；与腔体同步氦质谱检漏"],
        ["批量", "单件与批量都做，批量按首件确认后投产"],
        ["随货文件", "材质单与尺寸记录，按约定提供"],
      ],
      faq: [
        {
          q: "能按 CF / KF 标准做吗？",
          a: "能，图纸标注标准与规格即可；非标法兰按图加工，尺寸与密封形式由图纸定义。",
        },
        {
          q: "单件也做吗？",
          a: "做。单件通常按图直接加工；批量会先做首件确认，再按首件投产，避免整批返工。",
        },
        {
          q: "材质证明怎么给？",
          a: "随货提供材质单；需要第三方复验或特定炉批号的，在评审时提出，我们按项目约定安排。",
        },
      ],
      articles: ["chamber-material-304l-or-316l", "how-to-request-a-quote-with-a-drawing"],
      service: "precision-components",
    },
    en: {
      intro:
        "Flanges, feedthrough bodies and seal components are small parts that decide a tool's leak rate and assembly rhythm. We turn and mill them to drawing, record critical fits piece by piece, and verify them together with the chamber leak test.",
      sections: [
        {
          h: "How it is built",
          p: "Flanges, feedthrough bodies and sealing faces are turned and milled to drawing, mainly in stainless with grade and heat-treatment condition per drawing; seal-groove width, depth and surface roughness are controlled to drawing. Parts are deburred, cleaned and, where required, surface finished.",
        },
        {
          h: "Interfaces and fits",
          p: "Standard flanges are machined to the standard and size marked on the drawing; non-standard parts follow the drawing. For ports welded into a chamber, weld prep and mating dimensions are confirmed at review so the opening and the flange outside diameter actually match.",
        },
        {
          h: "How it is verified",
          p: "Critical dimensions recorded per piece (sealing face, groove width and depth, hole positions); helium tested together with the chamber, with test conditions agreed at review. Material certificates ship with the parts and are provided as agreed.",
        },
      ],
      specs: [
        ["Machining", "Flanges, feedthrough bodies and sealing faces turned and milled to drawing"],
        ["Material", "Mainly stainless, grade and heat-treatment condition to drawing"],
        ["Sealing faces", "Groove width, depth and surface roughness controlled to drawing"],
        ["Testing", "Critical dimensions recorded per piece; helium tested together with the chamber"],
        ["Volume", "One-offs and batches; batches start after first-article approval"],
        ["Documents", "Material certificates and dimension records as agreed"],
      ],
      faq: [
        {
          q: "Can you machine to CF or KF standards?",
          a: "Yes — mark the standard and size on the drawing. Non-standard flanges are machined to the drawing, which defines both dimensions and seal type.",
        },
        {
          q: "Do you take single pieces?",
          a: "Yes. One-offs are machined straight from the drawing; batches get a first article confirmed before the run, so a whole lot does not have to be reworked.",
        },
        {
          q: "How are material certificates handled?",
          a: "They ship with the parts. If you need third-party verification or a specific heat number, raise it at review and we arrange it per the project.",
        },
      ],
      articles: ["chamber-material-304l-or-316l", "how-to-request-a-quote-with-a-drawing"],
      service: "precision-components",
    },
  },
];
