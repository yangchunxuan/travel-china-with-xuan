"use client";

import { emailTypoSuggestion, getInquiryReceiptCopy, type InquiryReceiptLocale, type InquiryReceiptCopy } from "../lib/inquiryReceipt";
import styles from "./InquiryReceipt.module.css";

export function EmailTypoHint({ email, locale, localizedCopy, onAccept, disabled = false }: {
  email: string; locale: InquiryReceiptLocale; localizedCopy?: InquiryReceiptCopy; onAccept: (value: string) => void; disabled?: boolean;
}) {
  const suggestion = emailTypoSuggestion(email);
  if (!suggestion || disabled) return null;
  const copy = getInquiryReceiptCopy(locale, localizedCopy);
  return <div className={styles.typo} role="status">
    <span>{copy.typo} <strong>{suggestion}</strong>?</span>{" "}
    <button type="button" onClick={() => onAccept(suggestion)}>{copy.use}</button>
  </div>;
}
