# AI SEO/GEO 落地素材包（双语，直接进组件）

> 依据用户 m01092 六加分项框架；红线：不写「行业领先」，用数据+脱敏案例；数字均出自《制造能力对外介绍/设备台账》（证据支撑）；认证用「推进中」措辞，不虚构。

## ① 基本信息栏（谁/做什么/服务谁 — 首页 Hero 下方新增）
**EN**: PANO Vacuum — custom vacuum chambers & precision manufacturing for semiconductor equipment, vacuum coating/process systems and new-energy equipment makers. Drawing review → precision machining → welding & leak testing → delivery & inspection, all under one roof in Changshu, China.
**ZH**: 帕诺真空 — 面向半导体设备、真空镀膜/工艺装备与新能源装备厂商的定制真空腔体与精密制造。从图纸评审、精密加工、焊接与氦检，到检验交付，一站式完成。工厂位于江苏常熟。

## ② 项目经历/案例区（脱敏案例+数据，替代「行业领先」）
- 厚板精密切割：3 万瓦激光切割，焊接坡口与厚板下料一体化（案例：半导体腔体盖板，材料 304L/SUS316L，厚板件一次成形）
- 大件成形：400 吨折弯（工作长度 6.2 m）+ 大型钣金成形
- 镗削定位：H200 落地镗铣，4 m 级回转直径轴孔加工（案例：真空腔体法兰孔系同轴度）
- 焊接产能：40+ 台气保焊机位的焊接车间，受控洁净焊接环境
- 重型总装：50 吨行车支持数吨级腔体总装与翻转
- 检漏能力：氦质谱检漏（UL1000 级，≤1×10⁻⁹ Pa·m³/s 量级），腔体出厂逐台气密验证
- 交付口径：按图纸/台阶图逐项检验，附检测报告随货交付
（案例一律脱敏：写行业+用途+指标，不露客户名）

## ③ 10 个客户真问题 FAQ（一问一答、结论先行）+ FAQPage Schema
Q1 能做多大的腔体？— 结论：数吨级。腔体尺寸按图纸定制，50 吨行车支持整体总装与翻转，大型腔体无需分段。
Q2 用什么材料?— 结论：以 304L/SUS316L 不锈钢为主。可按图纸指定牌号与表面处理。
Q3 检漏能力？— 结论：氦质谱检漏 ≤1×10⁻⁹ Pa·m³/s 量级（UL1000），出厂逐台验收。
Q4 交期多久？— 结论：视图纸复杂度，报价时给出节点计划并锁定。
Q5 有什么认证？— 结论：体系认证推进中（SEMI 相关标准、AWS 焊接体系），可按客户要求配合审核；详细进度请询销售。
Q6 怎么开始？— 结论：发图纸（PDF/DWG/STEP）即可。我们做图纸评审、DFM 建议与报价，3D/工程图支持加严核对。
Q7 最小起订？— 结论：单件定制即可，无起订量门槛（按项目评估）。
Q8 质保？— 结论：按合同质保条款执行，逐台带检测记录。
Q9 海外客户怎么合作？— 结论：支持英语全流程沟通（联系 zhouyou@panovacuum.com，也可加微信/电话 +1 307 533 3212），出口包装与文件支持。
Q10 付款方式？— 结论：按合同约定（如 30/70 或信用证协商），面向工业客户灵活处理。

## ④ 资质背书（E-E-A-T）
- 证书：认证推进中（SEMI 相关标准、AWS 焊接体系）——详询销售，拒绝虚构「已认证」
- 团队：周游 Zhou You — 全球融资与战略合作 · 全球网络销售（+86 130 6372 2038 / +1 307 533 3212）
- 企业：帕诺真空机械科技（常熟）有限公司（帕诺（常熟）新能源科技有限公司 关联）
- 地址：江苏省苏州市常熟常福街道朝阳路 88 号 215500

## ⑤ 活简历（更新节奏）
- 月更 1 篇案例/技术观点（首篇：真空腔体从图纸到交付的 7 道检验）；README 记节奏，防半年过期

## ⑥ 机读版 — JSON-LD（放每页 <head>）
```json
<Organization>@context:https://schema.org; type Organization; name:帕诺真空机械科技（常熟）有限公司 / PANO Vacuum Machinery Technology (Changshu) Co., Ltd.; url:https://panovacuum.com; logo:https://panovacuum.com/logo.webp; email:zhouyou@panovacuum.com; telephone:+86 130 6372 2038; address: 江苏省苏州市常熟常福街道朝阳路88号, 215500, CN</Organization>
<FAQPage>@context,type FAQPage; mainEntity:[10 组 Question(结论句) + AcceptedAnswer(Text 答案)]</FAQPage>
```

## 落地方式（下一轮执行）
- layout.tsx：每页注入 Organization JSON-LD；FAQ 页/components 注入 FAQPage JSON-LD（或 FAQ 区块内嵌）
- 首页新增：基本信息栏区块 + 案例数据网格（4-6 张能力卡，用②数据）
- 新增 FAQ 区块（10 问，结论先行，双语 dict）
- llms.txt 增补 FAQ 与 pages 描述
- 构建→推送→自动上线，验证 https://panovacuum.com/ 含 ld+json