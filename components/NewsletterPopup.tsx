"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getNewsletterConfig, newsletterConsentVersion, postNewsletter } from "../lib/newsletter";
import { newsletterCopy } from "../lib/newsletterI18n";
import {
  markNewsletterJoined, markNewsletterPromptHandled, newsletterDelayRemaining,
  newsletterOpenEvent, newsletterPageEligible, newsletterPromptChangedEvent,
} from "../lib/newsletterPrompt";
import {
  getNavigationMenuOpen, getPrivacyManagerOpen, getServerPrivacyManagerOpen,
  subscribeNavigationMenu, subscribePrivacyManager,
} from "../lib/siteOverlayState";
import styles from "./NewsletterPopup.module.css";

export function NewsletterPopup({ locale }: { locale: HomegroundLocale }) {
  const pathname = usePathname();
  const text = newsletterCopy[locale];
  const id = useId();
  const cardRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [busyElsewhere, setBusyElsewhere] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "pending" | "error">("idle");
  const [error, setError] = useState("");
  const requestRef = useRef<{ fingerprint: string; id: string } | null>(null);
  const submittingRef = useRef(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const privacyOpen = useSyncExternalStore(subscribePrivacyManager, getPrivacyManagerOpen, getServerPrivacyManagerOpen);
  const menuOpen = useSyncExternalStore(subscribeNavigationMenu, getNavigationMenuOpen, getServerPrivacyManagerOpen);
  const enabled = Boolean(getNewsletterConfig());
  const blocked = privacyOpen || menuOpen || busyElsewhere;

  useEffect(() => {
    if (!enabled) return;
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(timeout);
      if (!newsletterPageEligible(pathname)) return;
      const remaining = newsletterDelayRemaining();
      if (remaining === null) return;
      timeout = setTimeout(() => setReady(true), remaining);
    };
    const open = () => setReady(true);
    schedule();
    window.addEventListener(newsletterPromptChangedEvent, schedule);
    window.addEventListener(newsletterOpenEvent, open);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener(newsletterPromptChangedEvent, schedule);
      window.removeEventListener(newsletterOpenEvent, open);
    };
  }, [enabled, pathname]);

  useEffect(() => { setVisible(false); setReady(false); }, [pathname]);

  useEffect(() => {
    if (!enabled) return;
    const check = () => {
      const focus = document.activeElement;
      const typingElsewhere = focus instanceof HTMLElement &&
        focus.matches('input, textarea, select, [contenteditable="true"]') && !cardRef.current?.contains(focus);
      const modal = Array.from(document.querySelectorAll<HTMLElement>('[aria-modal="true"], dialog[open]'))
        .some((element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
      setBusyElsewhere(document.visibilityState !== "visible" || typingElsewhere || modal);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-modal", "open", "hidden", "aria-hidden"] });
    document.addEventListener("focusin", check);
    document.addEventListener("focusout", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", check);
      document.removeEventListener("focusout", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !ready || blocked || visible) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    markNewsletterPromptHandled();
    setReady(false);
    setVisible(true);
  }, [blocked, enabled, ready, visible]);

  useEffect(() => {
    if (!visible || blocked) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [visible, blocked]);

  function close() {
    if (cardRef.current?.contains(document.activeElement)) {
      const target = previousFocus.current;
      if (target?.isConnected && target.getClientRects().length && target !== document.body) target.focus({ preventScroll: true });
      else document.querySelector<HTMLElement>('header a[href]')?.focus({ preventScroll: true });
    }
    setVisible(false);
    setReady(false);
  }

  if (!enabled || !visible) return null;
  const privacyHref = locale === "en" ? "/privacy/" : `/${locale}/privacy/`;
  return (
    <aside className={styles.card} data-homeground-newsletter="true" lang={locale}
      hidden={blocked} aria-labelledby={`${id}-title`} ref={cardRef}>
      <button className={styles.close} type="button" aria-label={text.close} onClick={close}>
        <X aria-hidden="true" size={18} strokeWidth={1.5} />
      </button>
      <p className={styles.brand}>Homeground China</p>
      <h2 id={`${id}-title`}>{state === "pending" ? text.pendingTitle : text.title}</h2>
      {state === "pending" ? <p className={styles.intro} role="status">{text.pendingBody}</p> : null}
      {state !== "pending" ? <form className={styles.form} aria-busy={state === "sending"}
        onSubmit={async (event) => {
          event.preventDefault();
          if (submittingRef.current) return;
          const data = new FormData(event.currentTarget);
          const email = String(data.get("email") ?? "").trim();
          const fingerprint = JSON.stringify([email, locale, pathname]);
          if (requestRef.current?.fingerprint !== fingerprint) requestRef.current = { fingerprint, id: crypto.randomUUID() };
          submittingRef.current = true;
          setState("sending"); setError("");
          try {
            const result = await postNewsletter({ action: "subscribe", requestId: requestRef.current.id,
              email, locale, sourcePath: pathname, consent: true,
              consentVersion: newsletterConsentVersion, website: String(data.get("website") ?? "") });
            if (result !== "pending") throw new Error("invalid-response");
            setState("pending"); markNewsletterJoined();
          } catch (reason) {
            setState("error");
            setError(reason instanceof Error && reason.message === "rate-limit" ? text.rateLimit : text.error);
          } finally { submittingRef.current = false; }
        }}>
        <div className={styles.inputRow}>
          <label className={styles.field}>
          <span>{text.email}</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@mail.com" />
          </label>
          <button className={styles.submit} type="submit" aria-disabled={state === "sending"}>
            {state === "sending" ? text.submitting : text.subscribe}
          </button>
        </div>
        <label className={styles.honeypot} aria-hidden="true">Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <p className={styles.consent}>{text.consent} <a href={privacyHref} target="_blank" rel="noopener noreferrer">{text.privacy}</a></p>
        {error ? <p className={styles.error} role="alert">{error}</p> : null}
      </form> : null}
    </aside>
  );
}
