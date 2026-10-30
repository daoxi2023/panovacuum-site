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
