"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import { Check, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { correctedInquiryReceipt, displayedInquiryReceipt, inquiryCorrectionLinks, inquiryEmailCorrectionApiUrl, inquiryReceiptAccessKey, normalizeCorrectionEmail, sendInquiryEmailCorrection, getInquiryReceiptCopy, inquiryWhatsAppHref, type InquiryReceiptData, type InquiryReceiptLocale, type InquiryReceiptCopy, type InquiryEmailCorrectionSnapshot } from "../lib/inquiryReceipt";
import { privateTourQuoteApiUrl } from "../lib/tourContact";
import { EmailTypoHint } from "./EmailTypoHint";
import styles from "./InquiryReceipt.module.css";

type CorrectionState = "idle" | "saving" | "failed" | "uncertain" | "busy" | "blocked" | "done";

const intlLocale = (locale: InquiryReceiptLocale) => locale === "zh" ? "zh-CN" : locale === "en" ? "en-GB" : locale;

/** A calendar date the traveller picked, shown in their language; the ISO value stays in dateTime. */
function travelDateLabel(value: string, locale: InquiryReceiptLocale, dateLocale?: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(dateLocale ?? intlLocale(locale), { timeZone: "UTC", year: "numeric", month: locale === "en" ? "short" : "long", day: "numeric" })
    .format(new Date(Date.UTC(year, month - 1, day)));
}

/** The promised reply time, rounded up to the hour so it reads as a commitment rather than a timestamp. */
function replyByLabel(value: string, locale: InquiryReceiptLocale, dateLocale?: string) {
  const hour = 3_600_000;
  return new Intl.DateTimeFormat(dateLocale ?? intlLocale(locale), {
    timeZone: "Asia/Shanghai", weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(new Date(Math.ceil(Date.parse(value) / hour) * hour));
}

export function InquiryReceipt({ receipt: originalReceipt, locale, localizedCopy, dateLocale, containerRef, headingRef, headingId, hideWhatsApp = false, children }: {
  receipt: InquiryReceiptData;
  locale: InquiryReceiptLocale;
  localizedCopy?: InquiryReceiptCopy;
  /** A language edition's Intl locale for the dates shown, when it is not the receipt's own. */
  dateLocale?: string;
  containerRef?: Ref<HTMLDivElement>;
  headingRef?: Ref<HTMLHeadingElement>;
  headingId?: string;
  /** Inside the contact card, whose scan block already offers WhatsApp. */
  hideWhatsApp?: boolean;
  children?: ReactNode;
}) {
  const copy = getInquiryReceiptCopy(locale, localizedCopy);
  const [corrected, setCorrected] = useState<InquiryReceiptData | null>(null);
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [correctionEmail, setCorrectionEmail] = useState("");
  const [correctionState, setCorrectionState] = useState<CorrectionState>("idle");
  const [correctionError, setCorrectionError] = useState("");
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const correctionSnapshotRef = useRef<InquiryEmailCorrectionSnapshot | null>(null);
  const dispatchingRef = useRef(false);
  const activeReferenceRef = useRef(originalReceipt.publicReference);
  activeReferenceRef.current = originalReceipt.publicReference;
  const correctionId = useId();
  const receipt = displayedInquiryReceipt(originalReceipt, corrected);
  const accessKey = inquiryReceiptAccessKey(receipt);
  const correctionApiUrl = inquiryEmailCorrectionApiUrl(privateTourQuoteApiUrl());
  const canCorrectOnline = Boolean(receipt.email && accessKey && correctionApiUrl && receipt.contactRevision !== null && receipt.contactRevision < 3) && correctionState !== "blocked";

  useEffect(() => {
    setCorrected(null);
    setCorrectionOpen(false);
    setCorrectionEmail("");
    setCorrectionState("idle");
    setCorrectionError("");
    correctionSnapshotRef.current = null;
  }, [originalReceipt.publicReference]);

  function openCorrection() {
    if (!canCorrectOnline) return;
    if (correctionState !== "uncertain" && correctionState !== "busy") {
      correctionSnapshotRef.current = null;
      setCorrectionEmail(receipt.email ?? "");
      setCorrectionState("idle");
      setCorrectionError("");
    }
    setCorrectionOpen(true);
    window.requestAnimationFrame(() => emailInputRef.current?.focus());
  }

  function closeCorrection() {
    if (correctionState === "saving") return;
    setCorrectionOpen(false);
    window.requestAnimationFrame(() => editButtonRef.current?.focus());
  }

  async function sendCorrection(snapshot: InquiryEmailCorrectionSnapshot) {
    if (dispatchingRef.current || !correctionApiUrl) return;
    dispatchingRef.current = true;
    setCorrectionState("saving");
    setCorrectionError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const { response, result } = await sendInquiryEmailCorrection(snapshot, correctionApiUrl, controller.signal);
      if (activeReferenceRef.current !== snapshot.base.publicReference) return;
      if (response.ok) {
        const next = correctedInquiryReceipt(snapshot.base, result);
        if (next) {
          setCorrected(next);
          setCorrectionEmail(next.email ?? "");
          setCorrectionOpen(false);
          setCorrectionState("done");
          correctionSnapshotRef.current = null;
          window.requestAnimationFrame(() => editButtonRef.current?.focus());
          return;
        }
        setCorrectionState("uncertain");
        setCorrectionError(copy.correctionUncertain);
        return;
      }
      const code = (result as { error?: { code?: string } } | null)?.error?.code;
      if (response.status === 422 && code === "invalid_email") {
        correctionSnapshotRef.current = null;
        setCorrectionState("failed");
        setCorrectionError(copy.correctionInvalid);
        window.requestAnimationFrame(() => emailInputRef.current?.focus());
      } else if ((response.status === 403 && code === "correction_unavailable") || (response.status === 409 && code === "correction_limit")) {
        correctionSnapshotRef.current = null;
        setCorrectionState("blocked");
        setCorrectionError(copy.correctionUnavailable);
      } else if (response.status === 409 && (code === "correction_conflict" || code === "idempotency_conflict")) {
        correctionSnapshotRef.current = null;
        setCorrectionState("blocked");
        setCorrectionError(copy.correctionConflict);
      } else if (response.status === 409 && code === "correction_busy") {
        setCorrectionState("busy");
        setCorrectionError(copy.correctionBusy);
      } else {
        setCorrectionState("uncertain");
        setCorrectionError(copy.correctionUncertain);
      }
    } catch {
      if (activeReferenceRef.current === snapshot.base.publicReference) {
        setCorrectionState("uncertain");
        setCorrectionError(copy.correctionUncertain);
      }
    } finally {
      window.clearTimeout(timeout);
      dispatchingRef.current = false;
    }
  }

  function submitCorrection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canCorrectOnline || correctionState === "saving") return;
    if ((correctionState === "uncertain" || correctionState === "busy") && correctionSnapshotRef.current) {
      void sendCorrection(correctionSnapshotRef.current);
      return;
    }
    const normalized = normalizeCorrectionEmail(correctionEmail);
    if (!normalized) {
      setCorrectionState("failed");
      setCorrectionError(copy.correctionInvalid);
      emailInputRef.current?.focus();
      return;
    }
    if (normalized === receipt.email) {
      setCorrectionState("failed");
      setCorrectionError(copy.correctionSame);
      emailInputRef.current?.focus();
      return;
    }
    if (typeof globalThis.crypto?.randomUUID !== "function" || !accessKey || receipt.contactRevision === null) {
      setCorrectionState("failed");
      setCorrectionError(copy.correctionFailed);
      return;
    }
    const snapshot: InquiryEmailCorrectionSnapshot = {
      base: receipt,
      email: normalized,
      key: globalThis.crypto.randomUUID(),
      accessKey,
      body: JSON.stringify({ email: normalized, expectedRevision: receipt.contactRevision }),
    };
    correctionSnapshotRef.current = snapshot;
    void sendCorrection(snapshot);
  }

  const configuredPhone = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER?.trim() || "8613174215999";
  const correction = inquiryCorrectionLinks(receipt.publicReference, locale, homegroundBusiness.serviceEmail, configuredPhone, copy);
  // Not marked direct: on a computer the site-wide contact card turns it into the scan-to-phone QR, as every WhatsApp link on the live site does;
  // marked scan-only because the enquiry is already saved and needs no second email form.
  const whatsapp = !hideWhatsApp && process.env.NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED !== "false" ? inquiryWhatsAppHref(receipt, locale, configuredPhone, copy) : "";
  const emailSuppressed = Boolean(receipt.email && receipt.ackStatus === "suppressed");
  const inboxHelp = !receipt.email ? "" : receipt.ackStatus === "queued" ? copy.next : emailSuppressed ? copy.suppressedNext : "";
  const directEmail = `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(receipt.publicReference)}`;
  const hasTripDetails = Boolean(receipt.productName || receipt.requestedDateCollected || receipt.requestedTravelers !== null || receipt.destinationNames.length || receipt.nights !== null);
  const space = locale === "zh" || locale === "ja" ? "" : " ";
  const due = receipt.firstResponseDueAt && !emailSuppressed ? replyByLabel(receipt.firstResponseDueAt, locale, dateLocale) : null;
  return <div className={styles.receipt} ref={containerRef} tabIndex={-1} role="status" aria-live="polite" data-inquiry-receipt="">
    <span className={styles.mark} aria-hidden="true"><Check size={20} strokeWidth={2.25} /></span>
    <h3 id={headingId} ref={headingRef} tabIndex={-1}>{copy.title}</h3>
    <p className={styles.message} data-ack-status={receipt.email ? receipt.ackStatus : undefined}>
      {receipt.email ? copy[receipt.ackStatus] : copy.whatsappNext}
    </p>
    {receipt.email || due ? <dl className={styles.facts}>
      {receipt.email ? <div>
        <dt>{copy.email}</dt>
        <dd className={styles.contactValue}>
          <span className={styles.address}>{receipt.email}</span>{" "}
          {canCorrectOnline ? <button ref={editButtonRef} className={styles.inlineLink} type="button" aria-expanded={correctionOpen} aria-controls={correctionOpen ? `${correctionId}-form` : undefined} onClick={correctionOpen ? closeCorrection : openCorrection}>{copy.correct}</button>
            : <a className={styles.inlineLink} href={correction.email} data-contact-card-direct="">{copy.correct}</a>}
        </dd>
      </div> : null}
      {due ? <div>
        <dt>{copy.due}</dt>
        <dd><time dateTime={receipt.firstResponseDueAt!}>{due}</time> <span className={styles.zone}>{copy.zone}</span></dd>
      </div> : null}
    </dl> : null}
    {correctionState === "done" && !correctionOpen ? <p className={styles.correctionSuccess} role="status">{copy.correctionSaved}</p> : null}
    {correctionOpen ? <form id={`${correctionId}-form`} className={styles.correctionForm} onSubmit={submitCorrection} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); closeCorrection(); } }} noValidate>
      <label htmlFor={`${correctionId}-email`}>{copy.correctionLabel}</label>
      <p id={`${correctionId}-help`}>{copy.correctionHelp}</p>
      <input
        ref={emailInputRef}
        id={`${correctionId}-email`}
        type="email"
        name="correctedEmail"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required
        maxLength={254}
        value={correctionEmail}
        disabled={correctionState === "saving" || correctionState === "uncertain" || correctionState === "busy" || correctionState === "blocked"}
        aria-invalid={correctionState === "failed"}
        aria-describedby={`${correctionId}-help${correctionError ? ` ${correctionId}-error` : ""}`}
        onChange={(event) => { setCorrectionEmail(event.target.value); setCorrectionError(""); setCorrectionState("idle"); }}
      />
      <EmailTypoHint email={correctionEmail} locale={locale} localizedCopy={localizedCopy} disabled={correctionState === "saving" || correctionState === "uncertain" || correctionState === "busy" || correctionState === "blocked"} onAccept={(value) => { setCorrectionEmail(value); setCorrectionError(""); setCorrectionState("idle"); emailInputRef.current?.focus(); }} />
      {correctionError ? <p id={`${correctionId}-error`} className={styles.correctionError} role="alert">{correctionError}{correctionState === "blocked" ? <> <a href={correction.email} data-contact-card-direct="">{copy.emailAction}</a></> : null}</p> : null}
      <div className={styles.correctionActions}>
        {correctionState !== "blocked" ? <button className={styles.correctionSave} type="submit" disabled={correctionState === "saving"}>
          {correctionState === "saving" ? copy.correctionSaving : correctionState === "uncertain" || correctionState === "busy" ? copy.correctionRetry : copy.correctionSave}
        </button> : null}
        <button className={styles.correctionCancel} type="button" disabled={correctionState === "saving"} onClick={closeCorrection}>{copy.correctionCancel}</button>
      </div>
    </form> : null}
    {inboxHelp ? <div className={styles.help}>
      <Mail size={18} aria-hidden="true" />
      <p className={styles.next}>{inboxHelp}{space}<a href={directEmail} data-contact-card-direct="">{homegroundBusiness.serviceEmail}</a></p>
    </div> : receipt.email ? <p className={styles.direct}>{copy.directNext}{space}<a href={directEmail} data-contact-card-direct="">{homegroundBusiness.serviceEmail}</a></p> : null}
    {hasTripDetails ? <details className={styles.details}>
      <summary>{copy.details}<ChevronDown size={16} aria-hidden="true" /></summary>
      <dl>
        {receipt.productName ? <div><dt>{copy.tour}</dt><dd>{receipt.productName}</dd></div> : null}
        {receipt.selectionLabel ? <div><dt>{copy.selection}</dt><dd>{receipt.selectionLabel}</dd></div> : null}
        {receipt.requestedDateCollected ? <div><dt>{copy.date}</dt><dd>{receipt.requestedDate ? <time dateTime={receipt.requestedDate}>{travelDateLabel(receipt.requestedDate, locale, dateLocale)}</time> : copy.undecided}</dd></div> : null}
        {receipt.requestedTravelers !== null ? <div><dt>{copy.party}</dt><dd>{receipt.requestedTravelers}</dd></div> : null}
        {receipt.destinationNames.length ? <div><dt>{copy.destinations}</dt><dd>{receipt.destinationNames.join(" · ")}</dd></div> : null}
        {receipt.nights !== null ? <div><dt>{copy.nights}</dt><dd>{receipt.nights}</dd></div> : null}
      </dl>
      {receipt.topic === "tour" ? <p className={styles.note}>{copy.boundary}</p> : null}
    </details> : null}
    {children || whatsapp ? <div className={styles.actions}>
      {children}
      {whatsapp ? <a className={styles.whatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer" data-contact-card-scan-only=""><MessageCircle size={18} aria-hidden="true" />{copy.continueWhatsapp}</a> : null}
    </div> : null}
  </div>;
}
