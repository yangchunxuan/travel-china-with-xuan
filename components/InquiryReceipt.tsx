"use client";

import type { ReactNode, Ref } from "react";
import { Check, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { inquiryCorrectionLinks, getInquiryReceiptCopy, inquiryWhatsAppHref, type InquiryReceiptData, type InquiryReceiptLocale, type InquiryReceiptCopy } from "../lib/inquiryReceipt";
import styles from "./InquiryReceipt.module.css";

const intlLocale = (locale: InquiryReceiptLocale) => locale === "zh" ? "zh-CN" : locale === "en" ? "en-GB" : locale;

/** A calendar date the traveller picked, shown in their language; the ISO value stays in dateTime. */
function travelDateLabel(value: string, locale: InquiryReceiptLocale) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale(locale), { timeZone: "UTC", year: "numeric", month: locale === "en" ? "short" : "long", day: "numeric" })
    .format(new Date(Date.UTC(year, month - 1, day)));
}

/** The promised reply time, rounded up to the hour so it reads as a commitment rather than a timestamp. */
function replyByLabel(value: string, locale: InquiryReceiptLocale) {
  const hour = 3_600_000;
  return new Intl.DateTimeFormat(intlLocale(locale), {
    timeZone: "Asia/Shanghai", weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(new Date(Math.ceil(Date.parse(value) / hour) * hour));
}

export function InquiryReceipt({ receipt, locale, localizedCopy, containerRef, headingRef, headingId, hideWhatsApp = false, children }: {
  receipt: InquiryReceiptData;
  locale: InquiryReceiptLocale;
  localizedCopy?: InquiryReceiptCopy;
  containerRef?: Ref<HTMLDivElement>;
  headingRef?: Ref<HTMLHeadingElement>;
  headingId?: string;
  /** Inside the contact card, whose scan block already offers WhatsApp. */
  hideWhatsApp?: boolean;
  children?: ReactNode;
}) {
  const copy = getInquiryReceiptCopy(locale, localizedCopy);
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
  const due = receipt.firstResponseDueAt && !emailSuppressed ? replyByLabel(receipt.firstResponseDueAt, locale) : null;
  return <div className={styles.receipt} ref={containerRef} tabIndex={-1} role="status" aria-live="polite" data-inquiry-receipt="">
    <span className={styles.mark} aria-hidden="true"><Check size={20} strokeWidth={2.25} /></span>
    <h3 id={headingId} ref={headingRef} tabIndex={-1}>{copy.title}</h3>
    <p className={styles.message} data-ack-status={receipt.email ? receipt.ackStatus : undefined}>
      {receipt.email ? copy[receipt.ackStatus] : copy.whatsappNext}
    </p>
    {receipt.email || due ? <dl className={styles.facts}>
      {receipt.email ? <div>
        <dt>{copy.email}</dt>
        <dd className={styles.contactValue}><span className={styles.address}>{receipt.email}</span>{" "}<a className={styles.inlineLink} href={correction.email} data-contact-card-direct="">{copy.correct}</a></dd>
      </div> : null}
      {due ? <div>
        <dt>{copy.due}</dt>
        <dd><time dateTime={receipt.firstResponseDueAt!}>{due}</time> <span className={styles.zone}>{copy.zone}</span></dd>
      </div> : null}
    </dl> : null}
    {inboxHelp ? <div className={styles.help}>
      <Mail size={18} aria-hidden="true" />
      <p className={styles.next}>{inboxHelp}{space}<a href={directEmail} data-contact-card-direct="">{homegroundBusiness.serviceEmail}</a></p>
    </div> : receipt.email ? <p className={styles.direct}>{copy.directNext}{space}<a href={directEmail} data-contact-card-direct="">{homegroundBusiness.serviceEmail}</a></p> : null}
    {hasTripDetails ? <details className={styles.details}>
      <summary>{copy.details}<ChevronDown size={16} aria-hidden="true" /></summary>
      <dl>
        {receipt.productName ? <div><dt>{copy.tour}</dt><dd>{receipt.productName}</dd></div> : null}
        {receipt.selectionLabel ? <div><dt>{copy.selection}</dt><dd>{receipt.selectionLabel}</dd></div> : null}
        {receipt.requestedDateCollected ? <div><dt>{copy.date}</dt><dd>{receipt.requestedDate ? <time dateTime={receipt.requestedDate}>{travelDateLabel(receipt.requestedDate, locale)}</time> : copy.undecided}</dd></div> : null}
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
