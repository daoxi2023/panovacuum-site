/**
 * Site-wide tracking & verification configuration for panovacuum.com.
 *
 * - clarityProjectId: Microsoft Clarity project id (active).
 * - ga4MeasurementId: GA4 Web stream Measurement ID (G-XXXXXXX). Leave "" until
 *   the GA4 property/stream exists; the gtag snippet is only emitted when set.
 * - googleSiteVerification: token for <meta name="google-site-verification" .../>.
 *   Only emitted when set.
 */
export const siteConfig = {
  clarityProjectId: "z4lu81ynam",
  ga4MeasurementId: "",
  googleSiteVerification: "",
} as const;
