"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./HomegroundCareersPage.module.css";

/**
 * The WeChat ID as selectable text with a copy button. WeChat has no web link
 * that opens a chat, so the ID itself is the contact; if the clipboard is
 * refused, the ID is selected for the visitor to copy by hand.
 */
export function CopyWeChatId({
  id,
  label,
  copyLabel,
  copiedLabel,
  failedLabel,
}: {
  id: string;
  label: string;
  copyLabel: string;
  copiedLabel: string;
  failedLabel: string;
}) {
  const idRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(id);
        copied = true;
      }
    } catch { /* Fall back to selecting the ID. */ }
    if (!copied && idRef.current) {
      // Select the ID, then try the legacy copy; the selection stays for a manual copy.
      const range = document.createRange();
      range.selectNodeContents(idRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      try { copied = document.execCommand("copy"); } catch { /* Leave it selected. */ }
    }
    setState(copied ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  }

  return (
    <div className={styles.wechat}>
      <span className={styles.wechatLabel}>{label}</span>
      <strong ref={idRef} className={styles.wechatId} lang="en">{id}</strong>
      <button className={styles.copyButton} type="button" onClick={() => void copy()}>
        {state === "copied" ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
        {state === "copied" ? copiedLabel : copyLabel}
      </button>
      <p className={styles.copyStatus} role="status" aria-live="polite">
        {state === "failed" ? failedLabel : ""}
      </p>
    </div>
  );
}
