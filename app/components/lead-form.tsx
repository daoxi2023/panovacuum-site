"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type Kind = "quote" | "partnership";
type Locale = "en" | "zh";

function track(event: string, kind: Kind, locale: Locale) {
  const analytics = window as typeof window & { gtag?: (...args: unknown[]) => void };
  // Only category and language go to analytics. Never contact or project data.
  try { analytics.gtag?.("event", event, { lead_type: kind, language: locale }); } catch { /* Analytics must not affect enquiry delivery. */ }
}

export function LeadForm({ kind, locale }: { kind: Kind; locale: Locale }) {
  const zh = locale === "zh";
  const partnership = kind === "partnership";
  const started = useRef(false);
  const requestKey = useRef<string | null>(null);
  const previousPayload = useRef("");
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { setReady(true); }, []);
  const t = zh ? {
    company: "公司 / 机构", contact: "联系人", email: "商务邮箱", country: "国家 / 地区（选填）",
    product: "需求类型", material: "材料（选填）", quantity: "数量（选填）", timeline: "目标交期（选填）",
    direction: "合作方向", resources: "可协同的客户、订单或供应链资源", next: "希望下一步（选填）",
    message: partnership ? "合作设想" : "需求说明", select: "请选择", submit: partnership ? "提交合作意向" : "提交询价需求",
    sending: "正在提交…", privacy: "我已阅读隐私说明，同意帕诺为处理此次需求联系我。", privacyLink: "隐私说明",
    note: "请勿在此填写保密图纸、客户名单、财务数据或其他敏感信息。需要交换保密资料时，另行约定。",
    received: partnership ? "合作意向已收到" : "询价需求已收到", ref: "接收编号", after: "请保存此编号。我们会通过您填写的商务邮箱联系您。",
    another: "提交另一项需求", generic: "暂时无法确认是否收到，请保留当前内容并重试。也可以发邮件联系我们。",
    limited: "提交较频繁，请稍后重试，或通过邮箱联系我们。", invalid: "请检查填写内容与隐私同意选项，然后重试。",
  } : {
    company: "Company / organisation", contact: "Contact name", email: "Business email", country: "Country / region (optional)",
    product: "Requirement type", material: "Material (optional)", quantity: "Quantity (optional)", timeline: "Target delivery (optional)",
    direction: "Partnership focus", resources: "Customer, order or supply-chain resources you can contribute", next: "Preferred next step (optional)",
    message: partnership ? "Partnership outline" : "Project requirements", select: "Please select", submit: partnership ? "Send partnership enquiry" : "Send quote request",
    sending: "Sending…", privacy: "I have read the privacy notice and agree to be contacted by PANO about this enquiry.", privacyLink: "Privacy notice",
    note: "Do not include confidential drawings, customer lists, financial data or other sensitive information. Confidential materials can be exchanged by separate arrangement.",
    received: partnership ? "Partnership enquiry received" : "Quote request received", ref: "Reference", after: "Please keep this reference. We will contact you using the business email you provided.",
    another: "Send another enquiry", generic: "We cannot confirm receipt right now. Keep your details and try again, or contact us by email.",
    limited: "Too many requests. Please try again later or contact us by email.", invalid: "Please check your details and privacy consent, then try again.",
  };
  const productOptions = zh ? [["chamber", "定制真空腔体"], ["precision-parts", "精密加工零件"], ["welded-assembly", "真空密封焊接组件"], ["other", "其他需求"]] : [["chamber", "Custom vacuum chamber"], ["precision-parts", "Precision-machined parts"], ["welded-assembly", "Vacuum-tight welded assembly"], ["other", "Other requirement"]];
  const partnerOptions = zh ? [["sourcing", "长期采购与产能配套"], ["customer-supply-chain", "客户与供应链协同"], ["strategic", "带产业资源的战略合作"]] : [["sourcing", "Long-term sourcing & capacity collaboration"], ["customer-supply-chain", "Customer & supply-chain collaboration"], ["strategic", "Strategic partnership with industrial resources"]];
  const nextOptions = zh ? [["meeting", "安排一次交流"], ["capability-review", "先了解制造能力"], ["other", "其他（请在下方说明）"]] : [["meeting", "Arrange a discussion"], ["capability-review", "Review manufacturing capabilities first"], ["other", "Other (please describe below)"]];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const source: Record<string, string> = {};
    const query = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const value = query.get(key);
      if (value && value.length <= 120 && /^[A-Za-z0-9 _.-]+$/.test(value)) source[key] = value;
    }
    const payload = { ...values, kind, locale, privacy: data.get("privacy") === "on", sourcePath: window.location.pathname, source };
    const fingerprint = JSON.stringify(payload);
    if (!requestKey.current || previousPayload.current !== fingerprint) requestKey.current = crypto.randomUUID();
    previousPayload.current = fingerprint;
    setSubmitting(true);
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ ...payload, requestKey: requestKey.current }),
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; reference?: string; code?: string } | null;
      if (!response.ok || result?.ok !== true || typeof result.reference !== "string" || !/^PANO-[A-Z0-9-]+$/i.test(result.reference)) {
        setError(response.status === 429 ? t.limited : response.status === 400 || response.status === 413 ? t.invalid : t.generic);
        return;
      }
      setReference(result.reference);
      track("generate_lead", kind, locale);
    } catch {
      setError(t.generic);
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  if (reference) return <div className="lead-success" role="status" data-clarity-mask="true">
    <h2>{t.received}</h2><p>{t.ref}：<strong>{reference}</strong></p><p>{t.after}</p>
    <button type="button" className="growth-button secondary" onClick={() => { setReference(""); requestKey.current = null; started.current = false; }}>{t.another}</button>
  </div>;

  const id = (name: string) => `${kind}-${name}`;
  return <form className="lead-form" onSubmit={submit} data-clarity-mask="true" onFocusCapture={() => {
    if (!started.current) { started.current = true; track("lead_form_start", kind, locale); }
  }}>
    <fieldset disabled={submitting || !ready}>
      <legend className="sr-only">{t.submit}</legend>
      <div className="lead-grid">
        <div><label htmlFor={id("company")}>{t.company} <span aria-hidden="true">*</span></label><input id={id("company")} name="company" autoComplete="organization" required maxLength={120} /></div>
        <div><label htmlFor={id("contact")}>{t.contact} <span aria-hidden="true">*</span></label><input id={id("contact")} name="contact" autoComplete="name" required maxLength={120} /></div>
        <div><label htmlFor={id("email")}>{t.email} <span aria-hidden="true">*</span></label><input id={id("email")} name="email" type="email" autoComplete="email" required maxLength={254} /></div>
        <div><label htmlFor={id("country")}>{t.country}</label><input id={id("country")} name="country" autoComplete="country-name" maxLength={80} /></div>
      </div>
      {!partnership ? <>
        <label htmlFor={id("productType")}>{t.product} <span aria-hidden="true">*</span></label>
        <select id={id("productType")} name="productType" defaultValue="" required><option value="" disabled>{t.select}</option>{productOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        <div className="lead-grid lead-grid-three">
          <div><label htmlFor={id("material")}>{t.material}</label><input id={id("material")} name="material" maxLength={120} placeholder="304L / 316L…" /></div>
          <div><label htmlFor={id("quantity")}>{t.quantity}</label><input id={id("quantity")} name="quantity" maxLength={80} /></div>
          <div><label htmlFor={id("timeline")}>{t.timeline}</label><input id={id("timeline")} name="timeline" maxLength={120} /></div>
        </div>
      </> : <>
        <label htmlFor={id("partnershipType")}>{t.direction} <span aria-hidden="true">*</span></label>
        <select id={id("partnershipType")} name="partnershipType" defaultValue="" required><option value="" disabled>{t.select}</option>{partnerOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        <label htmlFor={id("resources")}>{t.resources} <span aria-hidden="true">*</span></label><textarea id={id("resources")} name="resources" required maxLength={2000} rows={4} placeholder={zh ? "请概述资源类型和可协同方向，无需填写客户名称或保密信息。" : "Outline the resource types and collaboration you have in mind. No customer names or confidential information are needed."} />
        <label htmlFor={id("nextStep")}>{t.next}</label><select id={id("nextStep")} name="nextStep" defaultValue=""><option value="">{t.select}</option>{nextOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
      </>}
      <label htmlFor={id("message")}>{t.message} <span aria-hidden="true">*</span></label><textarea id={id("message")} name="message" required maxLength={3000} rows={5} placeholder={partnership ? (zh ? "希望如何合作，需要哪些制造配套？" : "How would you like to work together, and what manufacturing support do you need?") : (zh ? "请说明用途、尺寸、数量或关键要求，暂不发送保密图纸。" : "Describe the application, dimensions, quantity or key requirements. Please do not include confidential drawings.")} />
      <div className="lead-honeypot" aria-hidden="true"><label htmlFor={id("website")}>Website</label><input id={id("website")} name="website" tabIndex={-1} autoComplete="off" /></div>
      <p className="lead-note">{t.note}</p>
      <label className="lead-consent" htmlFor={id("privacy")}><input id={id("privacy")} name="privacy" type="checkbox" required /><span>{t.privacy} <Link href={`/${locale}/privacy/`} target="_blank" rel="noopener noreferrer">{t.privacyLink}</Link></span></label>
      {error && <div className="lead-error" role="alert"><p>{error}</p><a href="mailto:zhouyou@panovacuum.com">zhouyou@panovacuum.com</a></div>}
      <button className="growth-button" type="submit" disabled={submitting || !ready}>{submitting ? t.sending : t.submit}</button>
    </fieldset>
    <noscript><p className="lead-note">{zh ? "在线提交需要启用 JavaScript；您也可以直接发送邮件。" : "Online submission requires JavaScript. You can also contact us directly by email."} <a href="mailto:zhouyou@panovacuum.com">zhouyou@panovacuum.com</a></p></noscript>
  </form>;
}
