"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { KakaoTalkContact } from "./KakaoTalkContact";
import { buildCorporateEnquiryDraft, corporateEnquiryEmailHref, getCorporateEnquiryCopy, type CorporateEnquiryDraft, type CorporatePurpose } from "../lib/corporateEnquiryDraft";
import type { CorporateLocale, CorporateTripSlug } from "../lib/corporateTravelTypes";
import { buildCorporateTiming, CorporateTimingError, emptyCorporateTiming, type CorporateTiming } from "../lib/corporateEnquiryTiming";
import { CorporateEnquirySelect } from "./CorporateEnquirySelect";
import { CorporateEnquiryTiming } from "./CorporateEnquiryTiming";
import { KeepWords } from "./text/KeepWords";
import styles from "./CorporateTravelEnquiry.module.css";

const tripOrder: (CorporateTripSlug | "undecided")[] = ["undecided", "zhangjiajie-4-day-team-trip", "shanghai-suzhou-4-day-company-retreat"];
const purposeOrder: CorporatePurpose[] = ["company-trip", "incentive", "meeting", "undecided"];

export function CorporateTravelEnquiry({ initialTrip, locale = "en", privacyHref = "/privacy/" }: { initialTrip?: CorporateTripSlug; locale?: CorporateLocale; privacyHref?: string }) {
  const copy = getCorporateEnquiryCopy(locale);
  const formId = useId();
  const [draft, setDraft] = useState<CorporateEnquiryDraft>({ company: "", name: "", email: "", people: "", timing: "", purpose: "undecided", trip: initialTrip ?? "undecided", budget: "", notes: "" });
  const [timing, setTiming] = useState<CorporateTiming>(emptyCorporateTiming);
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
    try {
      const readyDraft = { ...draft, timing: buildCorporateTiming(timing, locale) };
      setDraft(readyDraft); setReview(buildCorporateEnquiryDraft(readyDraft, locale)); setError("");
    }
    catch (failure) {
      setError(failure instanceof Error ? failure.message : copy.fallbackError);
      if (failure instanceof CorporateTimingError) document.getElementById(`${formId}-timing-${failure.field}`)?.focus();
    }
  }
  async function copyBrief() {
    try { await navigator.clipboard.writeText(review); setCopied(true); }
    catch { setCopied(false); setError(copy.copyFailed); }
  }
  const label = (text: string, optional = false) => <span className={styles.labelRow}>{text}{optional && <span>{copy.optional}</span>}</span>;
  return (
    <section className={styles.section} id="corporate-enquiry" aria-labelledby="corporate-enquiry-title" lang={locale} dir={locale === "ar" ? "rtl" : undefined}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="corporate-enquiry-title">{locale === "ja" ? <KeepWords locale="ja" text={copy.title} /> : copy.title}</h2>
        <p>{copy.intro}</p>
        <p className={styles.aside}>{copy.emailAside} <a data-contact-card-direct="" href={`mailto:${homegroundBusiness.serviceEmail}`}>{homegroundBusiness.serviceEmail}</a></p>
      </div>
      <div className={styles.body}>
        <form onSubmit={prepare} className={styles.form}>
          <div className={styles.fields}>
            <label>{label(copy.labels.company)}<input autoComplete="organization" maxLength={120} name="company" required value={draft.company} onChange={(e) => edit("company", e.target.value)} /></label>
            <label>{label(copy.labels.people)}<input inputMode="numeric" min={1} max={9999} name="people" placeholder={copy.placeholders.people} required step={1} type="number" value={draft.people} onChange={(e) => edit("people", e.target.value)} /></label>
            <label>{label(copy.labels.name, true)}<input autoComplete="name" maxLength={100} name="contactName" value={draft.name} onChange={(e) => edit("name", e.target.value)} /></label>
            <label>{label(copy.labels.email, true)}<input autoComplete="email" maxLength={160} name="email" type="email" value={draft.email} onChange={(e) => edit("email", e.target.value)} /></label>
            <CorporateEnquiryTiming id={`${formId}-timing`} label={copy.labels.timing} locale={locale} onChange={value => { setTiming(value); setReview(""); setError(""); setCopied(false); }} value={timing} />
            <CorporateEnquirySelect id={`${formId}-purpose`} label={copy.labels.purpose} name="purpose" onChange={value => edit("purpose", value)} options={purposeOrder.map(value => ({ value, label: copy.purposes[value] }))} value={draft.purpose} />
            <CorporateEnquirySelect id={`${formId}-trip`} label={copy.labels.trip} name="itinerary" onChange={value => edit("trip", value)} options={tripOrder.map(value => ({ value, label: copy.trips[value] }))} value={draft.trip} />
            <label className={styles.wide}>{label(copy.labels.budget, true)}<input maxLength={160} name="budget" placeholder={copy.placeholders.budget} value={draft.budget} onChange={(e) => edit("budget", e.target.value)} /></label>
            <label className={styles.wide}>{label(copy.labels.notes, true)}<textarea maxLength={1800} name="notes" placeholder={copy.placeholders.notes} rows={3} value={draft.notes} onChange={(e) => edit("notes", e.target.value)} /></label>
          </div>
          <button className={styles.primary} type="submit">{copy.submit}</button>
          <p className={styles.notice}>{copy.notice} <Link href={privacyHref}>{copy.privacy}</Link></p>
        </form>
        {error && <p className={styles.error} role="alert">{error}</p>}
        {review && <div aria-labelledby="corporate-review-title" className={styles.review} ref={reviewRef} tabIndex={-1}>
          <p className={styles.eyebrow} id="corporate-review-title">{copy.reviewTitle}</p>
          <p>{copy.reviewNotSent}</p>
          <pre>{review}</pre>
          <div className={styles.actions}>
            <a className={styles.primary} data-contact-card-direct="" href={corporateEnquiryEmailHref(homegroundBusiness.serviceEmail, draft, review, locale)}>{copy.openEmail}</a>
            <a className={styles.primary} data-contact-card-scan-only="" href={homegroundWhatsAppHref(review)} rel="noopener noreferrer" target="_blank">{copy.openWhatsApp}</a>
            {locale === "ko" && copy.openKakao && <KakaoTalkContact buttonClassName={styles.primary} className={styles.kakao} inquiry={() => review} key={review} label={copy.openKakao} />}
            <button className={styles.copy} onClick={copyBrief} type="button">{copied ? copy.copied : copy.copy}</button>
          </div>
          <p className={styles.notice} role="status">{copied ? copy.copiedStatus : copy.readyStatus}</p>
        </div>}
      </div>
    </section>
  );
}
