"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { whatsappDisplayNumber } from "../lib/contactCard";
import { contactCardCopy } from "../lib/contactCardCopy";
import { WhatsAppQr } from "./WhatsAppQr";
import styles from "./ContactCard.module.css";

export function CopyButton({ value, label, copied, idle }: { value: string; label: string; copied: string; idle: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const confirm = () => {
    setDone(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1800);
  };
  return (
    <>
      <button
        type="button"
        className={styles.copy}
        data-done={done || undefined}
        aria-label={label}
        onClick={() => {
          const selectValue = () => {
            // Clipboard refused: select the value so Ctrl+C still works.
            const node = textRef.current;
            if (!node) return;
            const range = document.createRange();
            range.selectNodeContents(node);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
          };
          try {
            navigator.clipboard.writeText(value).then(confirm, selectValue);
          } catch {
            selectValue();
          }
        }}
      >
        <svg className={styles.copyCheck} viewBox="0 0 14 14" aria-hidden="true">
          <path d="M2.5 7.5 5.5 10.5 11.5 3.5" />
        </svg>
        <span>{done ? copied : idle}</span>
      </button>
      <span className={styles.copySource} ref={textRef} aria-hidden="true">{value}</span>
    </>
  );
}

/**
 * Scan to chat: the WhatsApp link as a QR code, two steps and the number to
 * copy. Shared by the desktop contact card (where the code resolves as the
 * card opens) and the homepage contact panel (`inline`, where it resolves as
 * the panel scrolls into view). `children` joins the number row.
 */
export function ContactCardScan({
  locale,
  href,
  headingId,
  inline = false,
  children,
}: {
  locale: HomegroundLocale;
  href: string;
  headingId: string;
  inline?: boolean;
  children?: ReactNode;
}) {
  const copy = contactCardCopy[locale];
  const number = whatsappDisplayNumber(href);
  return (
    <section className={`${styles.scan} ${inline ? styles.scanInline : ""}`} aria-labelledby={headingId}>
      <div className={styles.qrFrame}>
        <WhatsAppQr href={href} label={copy.qrLabel} />
        <span className={styles.scanBeam} aria-hidden="true" />
      </div>
      <div className={styles.scanText}>
        <h3 id={headingId}>{copy.scanTitle}</h3>
        <ol className={styles.steps}>
          {copy.scanSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
      <div className={styles.scanFoot}>
        <div className={styles.number}>
          <span>{copy.numberLabel}</span>
          <strong>{number}</strong>
          <CopyButton value={number} label={copy.copyNumber} copied={copy.copied} idle={copy.copy} />
        </div>
        {children}
      </div>
    </section>
  );
}
