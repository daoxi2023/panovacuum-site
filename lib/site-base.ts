/**
 * Build-time origin configuration.
 *
 * SITE_BASE_URL switches the canonical origin between deployments:
 *   - https://panovacuum.com (default, overseas entry)
 *   - https://panovacuum.cn  (China entry, pre-filing preview; ICP number empty)
 *
 * SITE_ICP fills the MIIT filing number in the footer — only emitted when set
 * (e.g. "苏ICP备XXXXXXXX号-1" after the .cn filing is approved).
 */
export const SITE_BASE = (process.env.SITE_BASE_URL || "https://panovacuum.com").replace(/\/+$/, "");
export const SITE_ICP = process.env.SITE_ICP || "";

/**
 * 网站建设 / 线上业务运营方（披露用）。
 *
 * 中文名 = 苏州领拓互联科技有限公司；英文名按营业执照官方英文名
 * 「Su Zhou Leading Top Union Technology Co., Ltd.」——由用户在 2026-10-31 核定，
 * 不能再用拼音回译（Lingtuo / Lingtuo Internet / Lingtuo Hulian 都不是法定英文名）。
 */
export const OPERATOR_ZH = "苏州领拓互联科技有限公司";
export const OPERATOR_EN = "Su Zhou Leading Top Union Technology Co., Ltd.";
