"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { homegroundKakaoTalkPhone } from "../lib/homegroundBusiness";
import { kakaoTalkCopy, kakaoTalkInquiryText } from "../lib/tourContact";
import { appendVisitRef, currentVisitRefLine } from "../lib/visitRef";
import styles from "./KakaoTalkContact.module.css";

/** Clipboard API first; a selected textarea inside `host` (a modal dialog makes the body inert) second. */
async function copyText(value: string, host: HTMLElement | null) {
  try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(value); return true; } } catch { /* Try the legacy path. */ }
  if (!host) return false;
  const area = document.createElement("textarea");
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  try {
    area.value = value; area.readOnly = true; area.className = styles.copySource;
    host.append(area); area.select();
    return document.execCommand("copy");
  } catch { return false; } finally { area.remove(); previous?.focus({ preventScroll: true }); }
}

/**
 * Korean pages only. KakaoTalk has no public web link that opens a chat by
 * phone number, so the button copies the prepared inquiry and reveals the
 * number with the steps to add it. It never offers a tel: link.
 */
export function KakaoTalkContact({ inquiry, onOpen, className, buttonClassName, label }: { inquiry: () => string; onOpen?: () => void; className?: string; buttonClassName?: string; /** Overrides the button text where it must match sibling buttons. */ label?: string }) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [result, setResult] = useState<"copied" | "failed" | null>(null);
  const [message, setMessage] = useState("");
  const [numberCopied, setNumberCopied] = useState(false);
  const phone = homegroundKakaoTalkPhone();
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function reveal() {
    onOpen?.();
    const text = kakaoTalkInquiryText(appendVisitRef(inquiry(), currentVisitRefLine()), phone);
    setMessage(text);
    setResult(await copyText(text, rootRef.current) ? "copied" : "failed");
  }
  async function copyNumber() {
    if (!await copyText(phone.display, rootRef.current)) return;
    setNumberCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNumberCopied(false), 1800);
  }

  return <div ref={rootRef} className={className ? `${styles.kakao} ${className}` : styles.kakao} data-kakao-contact="">
    <button type="button" className={buttonClassName ? `${styles.button} ${buttonClassName}` : styles.button} aria-expanded={result !== null} aria-controls={`${id}-hint`} onClick={() => void reveal()}><MessageCircle size={18} aria-hidden="true" />{label ?? kakaoTalkCopy.action}</button>
    <div id={`${id}-hint`} className={result ? styles.hint : undefined} role="status" aria-live="polite">
      {result ? <>
        <p className={styles.status} data-state={result}>{result === "copied" ? kakaoTalkCopy.copied : kakaoTalkCopy.copyFailed}</p>
        <span className={styles.label}>{kakaoTalkCopy.numberLabel}</span>
        <button type="button" className={styles.number} onClick={() => void copyNumber()} aria-label={`${phone.display} ${numberCopied ? kakaoTalkCopy.numberCopied : kakaoTalkCopy.copyNumber}`}><strong>{phone.display}</strong><span aria-hidden="true">{numberCopied ? kakaoTalkCopy.numberCopied : kakaoTalkCopy.copyNumber}</span></button>
        <p className={styles.steps}>{kakaoTalkCopy.steps}</p>
        {result === "failed" ? <textarea className={styles.message} readOnly rows={5} value={message} aria-label={kakaoTalkCopy.message} onFocus={event => event.currentTarget.select()} /> : null}
      </> : null}
    </div>
  </div>;
}
