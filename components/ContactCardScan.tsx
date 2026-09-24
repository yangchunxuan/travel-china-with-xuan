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
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const confirm = () => {
    setDone(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1800);
  };
  return (
    <button
      type="button"
      className={styles.copy}
      data-done={done || undefined}
      aria-label={label}
      onClick={(event) => {
        const button = event.currentTarget;
        const selectValue = () => {
          // Clipboard refused: put the value next to the button, selected,
          // so Ctrl+C still works. It is only there while needed, so copying
          // the section's text never picks up a second number.
          const node = document.createElement("span");
          node.className = styles.copySource;
          node.textContent = value;
          button.after(node);
          const range = document.createRange();
          range.selectNodeContents(node);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          window.setTimeout(() => node.remove(), 8000);
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
  );
}

/**
 * Scan to chat: a chat link as a QR code, two steps and, for WhatsApp, the
 * number to copy. Shared by the desktop contact card (where the code resolves
 * as the card opens) and the homepage contact board (`inline`, where it
 * resolves as the board scrolls into view). `children` joins the last row.
 */
export function ContactCardScan({
  locale,
  href,
  headingId,
  app = "whatsapp",
  inline = false,
  children,
}: {
  locale: HomegroundLocale;
  href: string;
  headingId: string;
  app?: "whatsapp" | "messenger";
  inline?: boolean;
  children?: ReactNode;
}) {
  const copy = contactCardCopy[locale];
  const messenger = app === "messenger";
  const number = messenger ? "" : whatsappDisplayNumber(href);
  return (
    <section className={`${styles.scan} ${inline ? styles.scanInline : ""}`} aria-labelledby={headingId}>
      <div className={styles.qrFrame}>
        <WhatsAppQr href={href} label={messenger ? copy.messengerQrLabel : copy.qrLabel} />
        <span className={styles.scanBeam} aria-hidden="true" />
      </div>
      <div className={styles.scanText}>
        <h3 id={headingId}>{messenger ? copy.messengerScanTitle : copy.scanTitle}</h3>
        <ol className={styles.steps}>
          {(messenger ? copy.messengerSteps : copy.scanSteps).map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
      {number || children ? (
      <div className={styles.scanFoot}>
        {number ? (
          <div className={styles.number}>
            <span>{copy.numberLabel}</span>
            <strong>{number}</strong>
            <CopyButton value={number} label={copy.copyNumber} copied={copy.copied} idle={copy.copy} />
          </div>
        ) : null}
        {children}
      </div>
      ) : null}
    </section>
  );
}
