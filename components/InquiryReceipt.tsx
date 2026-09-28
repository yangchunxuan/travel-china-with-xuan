"use client";

import type { ReactNode, Ref } from "react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { inquiryCorrectionLinks, getInquiryReceiptCopy, inquiryWhatsAppHref, type InquiryReceiptData, type InquiryReceiptLocale, type InquiryReceiptCopy } from "../lib/inquiryReceipt";
import styles from "./InquiryReceipt.module.css";

export function InquiryReceipt({ receipt, locale, localizedCopy, containerRef, headingRef, headingId, children }: {
  receipt: InquiryReceiptData;
  locale: InquiryReceiptLocale;
  localizedCopy?: InquiryReceiptCopy;
  containerRef?: Ref<HTMLDivElement>;
  headingRef?: Ref<HTMLHeadingElement>;
  headingId?: string;
  children?: ReactNode;
}) {
  const copy = getInquiryReceiptCopy(locale, localizedCopy);
  const configuredPhone = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER?.trim() || "8613174215999";
  const correction = inquiryCorrectionLinks(receipt.publicReference, locale, homegroundBusiness.serviceEmail, configuredPhone, copy);
  const whatsapp = inquiryWhatsAppHref(receipt, locale, configuredPhone, copy);
  const emailSuppressed = Boolean(receipt.email && receipt.ackStatus === "suppressed");
  const emailHelp = receipt.ackStatus === "queued" ? copy.next : emailSuppressed ? copy.suppressedNext : copy.directNext;
  const directEmail = `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(receipt.publicReference)}`;
  const hasTripDetails = Boolean(receipt.productName || receipt.requestedDateCollected || receipt.requestedTravelers !== null || receipt.destinationNames.length || receipt.nights !== null);
  const due = receipt.firstResponseDueAt ? new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : locale === "en" ? "en-GB" : locale, {
    timeZone: "Asia/Shanghai", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(new Date(receipt.firstResponseDueAt)) : null;
  return <div className={styles.receipt} ref={containerRef} tabIndex={-1} role="status" aria-live="polite" data-inquiry-receipt="">
    <h3 id={headingId} ref={headingRef} tabIndex={-1}>{copy.title}</h3>
    <p className={styles.message} data-ack-status={receipt.email ? receipt.ackStatus : undefined}>
      {receipt.email ? copy[receipt.ackStatus] : copy.whatsappNext}
    </p>
    {receipt.email ? <p className={styles.next}>{emailHelp} <a href={directEmail} data-contact-card-direct="">{homegroundBusiness.serviceEmail}</a></p> : null}
    {due && !emailSuppressed ? <p className={styles.timing}>{copy.due} <time dateTime={receipt.firstResponseDueAt!}>{due}</time> · {copy.zone}</p> : null}
    {hasTripDetails ? <details className={styles.details}>
      <summary>{copy.details}</summary>
      <dl>
        {receipt.productName ? <div><dt>{copy.tour}</dt><dd>{receipt.productName}</dd></div> : null}
        {receipt.selectionLabel ? <div><dt>{copy.selection}</dt><dd>{receipt.selectionLabel}</dd></div> : null}
        {receipt.requestedDateCollected ? <div><dt>{copy.date}</dt><dd>{receipt.requestedDate || copy.undecided}</dd></div> : null}
        {receipt.requestedTravelers !== null ? <div><dt>{copy.party}</dt><dd>{receipt.requestedTravelers}</dd></div> : null}
        {receipt.destinationNames.length ? <div><dt>{copy.destinations}</dt><dd>{receipt.destinationNames.join(" · ")}</dd></div> : null}
        {receipt.nights !== null ? <div><dt>{copy.nights}</dt><dd>{receipt.nights}</dd></div> : null}
      </dl>
      {receipt.topic === "tour" ? <p className={styles.note}>{copy.boundary}</p> : null}
    </details> : null}
    <div className={styles.links}>
      {receipt.email ? <a href={correction.email} data-contact-card-direct="">{copy.correct}</a> : null}
      {process.env.NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED !== "false" && whatsapp ? <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-contact-card-direct="">{copy.continueWhatsapp}</a> : null}
    </div>
    {children}
  </div>;
}
