"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { buildCorporateEnquiryDraft, corporateEnquiryEmailHref, corporatePurposeLabels, corporateTripLabels, japaneseCorporatePurposeLabels, japaneseCorporateTripLabels, type CorporateEnquiryDraft, type CorporatePurpose } from "../lib/corporateEnquiryDraft";
import type { CorporateTripSlug } from "../lib/corporateTravelTypes";
import styles from "./CorporateTravelEnquiry.module.css";

const corporateEnquiryCopy = {
  "en": {
    "eyebrow": "Start with your team",
    "title": "What would you like this trip to bring together?",
    "intro": "A few details give us a useful starting point. Dates can still be open; an estimated group size is enough.",
    "emailIntro": "Already have a brief? Email",
    "company": "Company name",
    "name": "Your name",
    "email": "Reply email",
    "optional": "(optional)",
    "people": "Estimated group size",
    "peopleExample": "e.g. 18",
    "timing": "When, and for how long?",
    "timingExample": "e.g. May 2027, 4 days — or dates still open",
    "purpose": "Purpose of your trip",
    "trip": "A starting idea",
    "undecided": "Help us choose",
    "budget": "Budget & currency",
    "budgetExample": "e.g. USD 15,000 total, excluding international flights",
    "notes": "Anything we should plan around?",
    "notesExample": "Single or shared rooms, meeting time, food preferences, different arrival flights…",
    "prepare": "Prepare my enquiry",
    "notice": "Review your message, then choose email or WhatsApp to send it. Preparing a brief does not make a booking.",
    "privacy": "Privacy notice",
    "reviewTitle": "Your enquiry is ready to review",
    "reviewBody": "It has not been sent. Open your preferred app and send it when you are ready.",
    "openEmail": "Open email draft",
    "openWhatsapp": "Open WhatsApp draft",
    "copied": "Copied",
    "copy": "Copy enquiry",
    "copiedNotice": "Your enquiry has been copied. It has not been sent.",
    "sendNotice": "Your email or WhatsApp message is the enquiry we receive.",
    "check": "Please check your details.",
    "copyError": "Copy is unavailable here. You can select the message below, or open it in your email app."
  },
  "ja": {
    "eyebrow": "チームのご希望から",
    "title": "この旅で、どんな時間をつくりたいですか？",
    "intro": "日程が未定でも、おおよその人数からご相談いただけます。まずは分かる範囲でお知らせください。",
    "emailIntro": "要件をまとめた資料があれば、こちらへ：",
    "company": "会社名",
    "name": "ご担当者名",
    "email": "返信先メール",
    "optional": "（任意）",
    "people": "おおよその人数",
    "peopleExample": "例：18",
    "timing": "ご希望の時期・日数",
    "timingExample": "例：2027年5月、4日間／日程未定",
    "purpose": "旅行の目的",
    "trip": "検討中のモデルプラン",
    "undecided": "相談して決めたい",
    "budget": "ご予算・通貨",
    "budgetExample": "例：総額15,000米ドル、国際線を除く",
    "notes": "手配にあたり、配慮したいこと",
    "notesExample": "部屋割り、会議の時間、食事制限、別々の到着便など",
    "prepare": "相談内容を確認する",
    "notice": "内容を確認したあと、メールかWhatsAppを選んで送信してください。ここでは予約は成立しません。",
    "privacy": "プライバシーポリシー",
    "reviewTitle": "送信前に内容をご確認ください",
    "reviewBody": "まだ送信されていません。ご希望のアプリを開き、内容を確認してから送信してください。",
    "openEmail": "メールの下書きを開く",
    "openWhatsapp": "WhatsAppの下書きを開く",
    "copied": "コピーしました",
    "copy": "相談内容をコピー",
    "copiedNotice": "相談内容をコピーしました。まだ送信されていません。",
    "sendNotice": "メールまたはWhatsAppで送信したメッセージが、私たちに届くご相談となります。",
    "check": "入力内容をご確認ください。",
    "copyError": "コピーできませんでした。下の文章を選択してコピーするか、メールの下書きを開いてください。"
  }
} as const;

export function CorporateTravelEnquiry({ initialTrip, language = "en" }: { initialTrip?: CorporateTripSlug; language?: "en" | "ja" }) {
  const c = corporateEnquiryCopy[language];
  const purposeLabels = language === "ja" ? japaneseCorporatePurposeLabels : corporatePurposeLabels;
  const tripLabels = language === "ja" ? japaneseCorporateTripLabels : corporateTripLabels;
  const [draft, setDraft] = useState<CorporateEnquiryDraft>({ company: "", name: "", email: "", people: "", timing: "", purpose: "undecided", trip: initialTrip ?? "undecided", budget: "", notes: "" });
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (review) reviewRef.current?.focus({ preventScroll: false }); }, [review]);
  function edit<Key extends keyof CorporateEnquiryDraft>(key: Key, value: CorporateEnquiryDraft[Key]) {
    setDraft((old) => ({ ...old, [key]: value })); setReview(""); setError(""); setCopied(false);
  }
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { setReview(buildCorporateEnquiryDraft(draft, language)); setError(""); }
    catch (failure) { setError(failure instanceof Error ? failure.message : c.check); }
  }
  async function copyBrief() {
    try { await navigator.clipboard.writeText(review); setCopied(true); }
    catch { setCopied(false); setError(c.copyError); }
  }
  return (
    <section className={styles.section} id="corporate-enquiry" aria-labelledby="corporate-enquiry-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h2 id="corporate-enquiry-title">{c.title}</h2>
        <p>{c.intro}</p>
        <p className={styles.aside}>{c.emailIntro} <a data-contact-card-direct="" href={`mailto:${homegroundBusiness.serviceEmail}`}>{homegroundBusiness.serviceEmail}</a>{language === "en" ? "." : ""}</p>
      </div>
      <div className={styles.body}>
        <form onSubmit={prepare} className={styles.form}>
          <div className={styles.fields}>
            <label>{c.company}<input autoComplete="organization" maxLength={120} name="company" required value={draft.company} onChange={(e) => edit("company", e.target.value)} /></label>
            <label>{c.name} <span>{c.optional}</span><input autoComplete="name" maxLength={100} name="contactName" value={draft.name} onChange={(e) => edit("name", e.target.value)} /></label>
            <label>{c.email} <span>{c.optional}</span><input autoComplete="email" maxLength={160} name="email" type="email" value={draft.email} onChange={(e) => edit("email", e.target.value)} /></label>
            <label>{c.people}<input inputMode="numeric" min={1} max={9999} name="people" placeholder={c.peopleExample} required step={1} type="number" value={draft.people} onChange={(e) => edit("people", e.target.value)} /></label>
            <label className={styles.wide}>{c.timing}<input maxLength={160} name="timing" placeholder={c.timingExample} required value={draft.timing} onChange={(e) => edit("timing", e.target.value)} /></label>
            <label>{c.purpose}<select name="purpose" value={draft.purpose} onChange={(e) => edit("purpose", e.target.value as CorporatePurpose)}>{Object.entries(purposeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>{c.trip}<select name="itinerary" value={draft.trip} onChange={(e) => edit("trip", e.target.value as CorporateEnquiryDraft["trip"])}><option value="undecided">{c.undecided}</option>{Object.entries(tripLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label className={styles.wide}>{c.budget} <span>{c.optional}</span><input maxLength={160} name="budget" placeholder={c.budgetExample} value={draft.budget} onChange={(e) => edit("budget", e.target.value)} /></label>
            <label className={styles.wide}>{c.notes} <span>{c.optional}</span><textarea maxLength={1800} name="notes" placeholder={c.notesExample} rows={3} value={draft.notes} onChange={(e) => edit("notes", e.target.value)} /></label>
          </div>
          <button className={styles.primary} type="submit">{c.prepare} <span aria-hidden="true">↗</span></button>
          <p className={styles.notice}>{c.notice} <Link href={language === "ja" ? "/ja/privacy/" : "/privacy/"}>{c.privacy}</Link></p>
        </form>
        {error && <p className={styles.error} role="alert">{error}</p>}
        {review && <div aria-labelledby="corporate-review-title" className={styles.review} ref={reviewRef} tabIndex={-1}>
          <p className={styles.eyebrow} id="corporate-review-title">{c.reviewTitle}</p>
          <p>{c.reviewBody}</p>
          <pre>{review}</pre>
          <div className={styles.actions}>
            <a className={styles.primary} data-contact-card-direct="" href={corporateEnquiryEmailHref(homegroundBusiness.serviceEmail, draft, review, language)}>{c.openEmail} <span aria-hidden="true">↗</span></a>
            <a className={styles.secondary} data-contact-card-scan-only="" href={homegroundWhatsAppHref(review)} rel="noopener noreferrer" target="_blank">{c.openWhatsapp} <span aria-hidden="true">↗</span></a>
            <button className={styles.copy} onClick={copyBrief} type="button">{copied ? c.copied : c.copy}</button>
          </div>
          <p className={styles.notice} role="status">{copied ? c.copiedNotice : c.sendNotice}</p>
        </div>}
      </div>
    </section>
  );
}
