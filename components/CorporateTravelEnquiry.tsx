"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { buildCorporateEnquiryDraft, corporateEnquiryEmailHref, corporatePurposeLabels, corporateTripLabels, type CorporateEnquiryDraft, type CorporatePurpose } from "../lib/corporateEnquiryDraft";
import { corporatePath, type CorporateLocale } from "../lib/corporateTravelLocalePaths";
import type { CorporateTripSlug } from "../lib/corporateTravelTypes";
import styles from "./CorporateTravelEnquiry.module.css";

export function CorporateTravelEnquiry({ initialTrip, locale = "en", copy = {} }: { initialTrip?: CorporateTripSlug; locale?: CorporateLocale; copy?: Record<string, string> }) {
  const t = (source: string) => copy[source] ?? source;
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
    try { setReview(buildCorporateEnquiryDraft(draft, { translate: t, referencePath: corporatePath(locale, draft.trip === "undecided" ? undefined : draft.trip) })); setError(""); }
    catch (failure) { setError(t(failure instanceof Error ? failure.message : "Please check your details.")); }
  }
  async function copyBrief() {
    try { await navigator.clipboard.writeText(review); setCopied(true); }
    catch { setCopied(false); setError(t("Copy is unavailable here. You can select the message below, or open it in your email app.")); }
  }
  return (
    <section className={styles.section} id="corporate-enquiry" aria-labelledby="corporate-enquiry-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{t("Start with your team")}</p>
        <h2 id="corporate-enquiry-title">{t("What would you like this trip to bring together?")}</h2>
        <p>{t("A few details give us a useful starting point. Dates can still be open; an estimated group size is enough.")}</p>
        <p className={styles.aside}>{t("Already have a brief? Email")} <a href={`mailto:${homegroundBusiness.serviceEmail}`}>{homegroundBusiness.serviceEmail}</a>.</p>
      </div>
      <div className={styles.body}>
        <form onSubmit={prepare} className={styles.form}>
          <div className={styles.fields}>
            <label>{t("Company name")}<input autoComplete="organization" maxLength={120} name="company" required value={draft.company} onChange={(e) => edit("company", e.target.value)} /></label>
            <label>{t("Your name")} <span>{t("(optional)")}</span><input autoComplete="name" maxLength={100} name="contactName" value={draft.name} onChange={(e) => edit("name", e.target.value)} /></label>
            <label>{t("Reply email")} <span>{t("(optional)")}</span><input autoComplete="email" maxLength={160} name="email" type="email" value={draft.email} onChange={(e) => edit("email", e.target.value)} /></label>
            <label>{t("Estimated group size")}<input inputMode="numeric" min={1} max={9999} name="people" placeholder={t("e.g. 18")} required step={1} type="number" value={draft.people} onChange={(e) => edit("people", e.target.value)} /></label>
            <label className={styles.wide}>{t("When, and for how long?")}<input maxLength={160} name="timing" placeholder={t("e.g. May 2027, 4 days — or dates still open")} required value={draft.timing} onChange={(e) => edit("timing", e.target.value)} /></label>
            <label>{t("Purpose of your trip")}<select name="purpose" value={draft.purpose} onChange={(e) => edit("purpose", e.target.value as CorporatePurpose)}>{Object.entries(corporatePurposeLabels).map(([value, label]) => <option value={value} key={value}>{t(label)}</option>)}</select></label>
            <label>{t("A starting idea")}<select name="itinerary" value={draft.trip} onChange={(e) => edit("trip", e.target.value as CorporateEnquiryDraft["trip"])}><option value="undecided">{t("Help us choose")}</option>{Object.entries(corporateTripLabels).map(([value, label]) => <option value={value} key={value}>{t(label)}</option>)}</select></label>
            <label className={styles.wide}>{t("Budget & currency")} <span>{t("(optional)")}</span><input maxLength={160} name="budget" placeholder={t("e.g. USD 15,000 total, excluding international flights")} value={draft.budget} onChange={(e) => edit("budget", e.target.value)} /></label>
            <label className={styles.wide}>{t("Anything we should plan around?")} <span>{t("(optional)")}</span><textarea maxLength={1800} name="notes" placeholder={t("Single or shared rooms, meeting time, food preferences, different arrival flights…")} rows={3} value={draft.notes} onChange={(e) => edit("notes", e.target.value)} /></label>
          </div>
          <button className={styles.primary} type="submit">{t("Prepare my enquiry")} <span aria-hidden="true">↗</span></button>
          <p className={styles.notice}>{t("Review your message, then choose email or WhatsApp to send it. Preparing a brief does not make a booking.")} <Link href={locale === "en" ? "/privacy/" : `/${locale}/privacy/`}>{t("Privacy notice")}</Link></p>
        </form>
        {error && <p className={styles.error} role="alert">{error}</p>}
        {review && <div aria-labelledby="corporate-review-title" className={styles.review} ref={reviewRef} tabIndex={-1}>
          <p className={styles.eyebrow} id="corporate-review-title">{t("Your enquiry is ready to review")}</p>
          <p>{t("It has not been sent. Open your preferred app and send it when you are ready.")}</p>
          <pre>{review}</pre>
          <div className={styles.actions}>
            <a className={styles.primary} href={corporateEnquiryEmailHref(homegroundBusiness.serviceEmail, draft, review, t)}>{t("Open email draft")} <span aria-hidden="true">↗</span></a>
            <a className={styles.secondary} href={homegroundWhatsAppHref(review)} rel="noopener noreferrer" target="_blank">{t("Open WhatsApp draft")} <span aria-hidden="true">↗</span></a>
            <button className={styles.copy} onClick={copyBrief} type="button">{t(copied ? "Copied" : "Copy enquiry")}</button>
          </div>
          <p className={styles.notice} role="status">{t(copied ? "Your enquiry has been copied. It has not been sent." : "Your email or WhatsApp message is the enquiry we receive.")}</p>
        </div>}
      </div>
    </section>
  );
}
