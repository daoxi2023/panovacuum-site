// 合作伙伴名义与标识的唯一来源。首页「合作伙伴」区块与公司介绍页共用，
// 新增/下架一家只需改这里（logo 放 public/photos/partners/<slug>.webp）。
export type Partner = { slug: string; zh: string; en: string };

export const partners: Partner[] = [
  { slug: "cetc", zh: "CETC", en: "CETC" },
  { slug: "huasheng", zh: "华升", en: "Huasheng" },
  { slug: "anhui-yuehao", zh: "安徽越好", en: "Anhui Yuehao" },
  { slug: "exact-sc", zh: "Exact SC", en: "Exact SC" },
  { slug: "qianhai-jiuhe", zh: "前海久禾", en: "Qianhai Jiuhe" },
  { slug: "power-jacks", zh: "Power Jacks", en: "Power Jacks" },
  { slug: "songyu", zh: "松煜科技", en: "Songyu Technology" },
  { slug: "zhongke-nawei", zh: "中科纳微", en: "Zhongke Nawei" },
  { slug: "yuansu-vacuum", zh: "元素真空", en: "Yuansu Vacuum" },
  { slug: "matrix-materials", zh: "矩阵材料", en: "Matrix Materials" },
  { slug: "hengyue-vacuum", zh: "衡岳真空", en: "Hengyue Vacuum" },
  { slug: "zhonghang-maite", zh: "中航迈特", en: "Zhonghang Maite" },
  { slug: "xiandao", zh: "先导", en: "Xiandao" },
  { slug: "pilat-photoelectric", zh: "江苏派莱特光电", en: "Jiangsu Pilat Photoelectric" },
  { slug: "jianghui-vacuum", zh: "上海匠辉真空", en: "Shanghai Jianghui Vacuum" },
];
