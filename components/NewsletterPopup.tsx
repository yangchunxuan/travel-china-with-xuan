"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { DraggableCore } from "react-draggable";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getNewsletterConfig, newsletterConsentVersion, postNewsletter } from "../lib/newsletter";
import { newsletterCopy } from "../lib/newsletterI18n";
import { readAnalyticsConsent } from "../lib/analyticsConsent";
import {
  markNewsletterJoined, markNewsletterPromptHandled, newsletterDelayRemaining,
  newsletterOpenEvent, newsletterPageEligible, newsletterPromptChangedEvent,
  clearNewsletterLanguageTransfer, consumeNewsletterLanguageTransfer,
  newsletterLanguageTransferEvent, saveNewsletterLanguageTransfer,
  newsletterLauncherAvailable, restoreReturningNewsletterLauncher,
} from "../lib/newsletterPrompt";
import {
  getNavigationMenuOpen, getPrivacyManagerOpen, getServerPrivacyManagerOpen,
  subscribeNavigationMenu, subscribePrivacyManager,
  getInquiryOpen, subscribeInquiry, setNewsletterExpanded, setNewsletterDockSide,
} from "../lib/siteOverlayState";
import styles from "./NewsletterPopup.module.css";
import { useNewsletterPosition } from "./useNewsletterPosition";

export function NewsletterPopup({ locale }: { locale: HomegroundLocale }) {
  const pathname = usePathname();
  const text = newsletterCopy[locale];
  const id = useId();
  const cardRef = useRef<HTMLElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openRequest, setOpenRequest] = useState(0);
  const [busyElsewhere, setBusyElsewhere] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "pending" | "error">("idle");
  const [error, setError] = useState("");
  const requestRef = useRef<{ fingerprint: string; id: string } | null>(null);
  const submittingRef = useRef(false);
  const focusEmailRequested = useRef(false);
  const focusLauncherRequested = useRef(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const initializedPath = useRef<string | null | undefined>(undefined);
  const privacyOpen = useSyncExternalStore(subscribePrivacyManager, getPrivacyManagerOpen, getServerPrivacyManagerOpen);
  const menuOpen = useSyncExternalStore(subscribeNavigationMenu, getNavigationMenuOpen, getServerPrivacyManagerOpen);
  const inquiryOpen = useSyncExternalStore(subscribeInquiry, getInquiryOpen, getServerPrivacyManagerOpen);
  const enabled = Boolean(getNewsletterConfig());
  const blocked = privacyOpen || menuOpen || busyElsewhere || inquiryOpen;



  useEffect(() => {
    if (!inquiryOpen) return;
    markNewsletterPromptHandled();
    setReady(false);
    setMinimized(true);
    setVisible(newsletterLauncherAvailable(pathname));
  }, [inquiryOpen, pathname]);
  const placement = useNewsletterPosition({
    enabled: enabled && visible && !blocked, minimized, cardRef, launcherRef, onOpen: reopen,
  });

  useEffect(() => {
    setNewsletterExpanded(enabled && visible && (!minimized || placement.dragging || placement.docking) && !blocked);
    return () => setNewsletterExpanded(false);
  }, [enabled, visible, minimized, blocked, placement.dragging, placement.docking]);

  useEffect(() => { setNewsletterDockSide(placement.side); }, [placement.side]);

  useEffect(() => {
    if (!enabled) return;
    // Read a validated arrival preference once, before restoring this route.
    // Subsequent Cookie-choice events keep their own untouched 10-second timer.
    restoreReturningNewsletterLauncher(readAnalyticsConsent() !== null);
    // Keep route reset and one-time arrival consumption together. The ref also
    // prevents StrictMode's effect replay from clearing an already restored card.
    if (initializedPath.current !== pathname) {
      initializedPath.current = pathname;
      const transfer = consumeNewsletterLanguageTransfer(pathname);
      const restoreLauncher = !transfer && newsletterLauncherAvailable(pathname);
      setVisible(restoreLauncher);
      setMinimized(restoreLauncher);
      setReady(Boolean(transfer));
      setExpanded(transfer?.expanded ?? false);
      setError("");
      focusEmailRequested.current = false;
      focusLauncherRequested.current = false;
    }
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(timeout);
      if (!newsletterPageEligible(pathname)) return;
      const remaining = newsletterDelayRemaining();
      if (remaining === null) return;
      timeout = setTimeout(() => setReady(true), remaining);
    };
    const open = () => {
      markNewsletterPromptHandled();
      focusEmailRequested.current = true;
      setOpenRequest((request) => request + 1);
      setExpanded(true);
      setMinimized(false);
      setVisible(true);
      setReady(false);
    };
    const restoreHistory = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      // History can restore the small entry, never a dismissed full card.
      clearNewsletterLanguageTransfer();
      const restoreLauncher = newsletterLauncherAvailable(pathname);
      setVisible(restoreLauncher);
      setMinimized(restoreLauncher);
      setReady(false);
      setExpanded(false);
      focusEmailRequested.current = false;
      focusLauncherRequested.current = false;
      schedule();
    };
    schedule();
    window.addEventListener(newsletterPromptChangedEvent, schedule);
    window.addEventListener(newsletterOpenEvent, open);
    window.addEventListener("pageshow", restoreHistory);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener(newsletterPromptChangedEvent, schedule);
      window.removeEventListener(newsletterOpenEvent, open);
      window.removeEventListener("pageshow", restoreHistory);
    };
  }, [enabled, pathname]);

  useEffect(() => {
    if (!enabled) return;
    const transfer = (event: Event) => {
      // The mobile language menu temporarily hides the card. Logical visibility
      // still represents the invitation or email form. A minimized launcher is
      // restored separately, so changing language never expands it by accident.
      if (!visible || minimized || !newsletterPageEligible(pathname) || state === "sending" || state === "pending") return;
      const target = (event as CustomEvent<{ pathname?: unknown }>).detail?.pathname;
      if (typeof target === "string") saveNewsletterLanguageTransfer(target, expanded);
    };
    window.addEventListener(newsletterLanguageTransferEvent, transfer);
    return () => window.removeEventListener(newsletterLanguageTransferEvent, transfer);
  }, [enabled, visible, minimized, expanded, pathname, state]);

  // Focus only after the reader chooses the invitation; automatic prompts stay passive.
  useEffect(() => {
    if (!visible || blocked) return;
    if (minimized && focusLauncherRequested.current) {
      focusLauncherRequested.current = false;
      launcherRef.current?.focus({ preventScroll: true });
    } else if (!minimized && expanded && focusEmailRequested.current) {
      focusEmailRequested.current = false;
      const previousFocus = document.activeElement;
      // Let the launcher finish becoming inert before focusing the revealed
      // form. Immediate focus can be lost on keyboard activation with reduced
      // motion, when both visibility changes happen in the same browser frame.
      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (document.activeElement !== previousFocus && document.activeElement !== document.body) return;
          const target = state === "pending" ? cardRef.current?.querySelector<HTMLElement>("h2") : emailRef.current;
          target?.focus({ preventScroll: true });
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [expanded, minimized, visible, blocked, state, openRequest]);

  useEffect(() => {
    if (!enabled) return;
    const check = () => {
      const focus = document.activeElement;
      const typingElsewhere = focus instanceof HTMLElement &&
        focus.matches('input, textarea, select, [contenteditable="true"]') && !cardRef.current?.contains(focus);
      const modal = Array.from(document.querySelectorAll<HTMLElement>('[aria-modal="true"], dialog[open], [data-homeground-consent-banner]'))
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
    markNewsletterPromptHandled();
    setReady(false);
    setMinimized(false);
    setVisible(true);
  }, [blocked, enabled, ready, visible]);

  useEffect(() => {
    if (!visible || minimized || blocked) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [visible, minimized, blocked]);

  function close() {
    clearNewsletterLanguageTransfer();
    focusLauncherRequested.current = Boolean(cardRef.current?.contains(document.activeElement));
    focusEmailRequested.current = false;
    setMinimized(true);
    setReady(false);
  }

  function reopen() {
    focusEmailRequested.current = true;
    setExpanded(true);
    setMinimized(false);
  }

  if (!enabled || !visible) return null;
  const privacyHref = locale === "en" ? "/privacy/" : `/${locale}/privacy/`;
  return (
    <div className={styles.widget} data-homeground-newsletter-widget="true" data-minimized={minimized}
      data-dragging={placement.dragging} data-docking={placement.docking}
      data-repositioning={placement.repositioning} data-side={placement.side}
      data-contact-space={/^\/(?:zh\/|ko\/)?guides\/[a-z0-9-]+\/$/.test(pathname || "")}
      lang={locale} hidden={blocked}>
    <DraggableCore nodeRef={cardRef} disabled={minimized || blocked}
      handle="[data-homeground-newsletter-drag-handle]" cancel="button, input, textarea, select, a"
      allowMobileScroll={true} enableUserSelectHack={false} {...placement.cardDragHandlers}>
    <aside id={`${id}-card`} className={styles.card} data-homeground-newsletter="true" data-expanded={expanded}
      aria-hidden={minimized} inert={minimized} aria-labelledby={`${id}-title`} ref={cardRef} style={placement.cardStyle}>
      <button className={styles.close} type="button" aria-label={text.minimize} onClick={close}>
        <X aria-hidden="true" size={18} strokeWidth={1.5} />
      </button>
      <h2 id={`${id}-title`} className={styles.dragHandle} data-homeground-newsletter-drag-handle="true"
        tabIndex={0} title={text.moveWindow} aria-description={text.moveWindow} {...placement.cardHandleHandlers}>
        {state === "pending" ? text.pendingTitle : text.title}
      </h2>
      <div className={styles.content}>
      {state === "pending" ? <p className={styles.intro} role="status">{text.pendingBody}</p> : <>
        <p className={styles.intro}>{text.invitation}</p>
        <div className={styles.invitationPanel} aria-hidden={expanded} inert={expanded}>
          <div className={styles.panelClip}>
            <button className={styles.invite} type="button"
              aria-expanded={expanded} aria-controls={`${id}-form`}
              onClick={() => { focusEmailRequested.current = true; setExpanded(true); }}>
              {text.openForm}
            </button>
          </div>
        </div>
      </>}
      {state !== "pending" ? <div className={styles.formPanel} aria-hidden={!expanded} inert={!expanded}>
        <div className={styles.panelClip}>
        <form id={`${id}-form`} className={styles.form} aria-busy={state === "sending"}
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
            // Keep keyboard focus when the submitted form becomes the receipt;
            // do not take it back if the reader minimized or moved elsewhere.
            if (emailRef.current?.form?.contains(document.activeElement)) focusEmailRequested.current = true;
            setState("pending"); markNewsletterJoined();
          } catch (reason) {
            setState("error");
            setError(reason instanceof Error && reason.message === "rate-limit" ? text.rateLimit : text.error);
          } finally { submittingRef.current = false; }
        }}>
        <label className={styles.label} htmlFor={`${id}-email`}>{text.email}</label>
        <div className={styles.inputRow}>
          <input className={styles.input} id={`${id}-email`} ref={emailRef} name="email" type="email"
            autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} required placeholder="you@example.com" />
          <button className={styles.submit} type="submit" aria-disabled={state === "sending"}>
            {state === "sending" ? text.submitting : text.subscribe}
          </button>
        </div>
        <label className={styles.honeypot} aria-hidden="true">Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <p className={styles.consent}>{text.consent} <a href={privacyHref} target="_blank" rel="noopener noreferrer">{text.privacy}</a></p>
        {error ? <p className={styles.error} role="alert">{error}</p> : null}
        </form>
        </div>
      </div> : null}
      </div>
    </aside>
    </DraggableCore>
    <DraggableCore nodeRef={launcherRef} disabled={!minimized || blocked}
      allowMobileScroll={true} enableUserSelectHack={false} {...placement.launcherDragHandlers}>
    <button className={styles.launcher} type="button" ref={launcherRef}
      data-homeground-newsletter-launcher="true" aria-label={state === "pending" ? text.pendingTitle : `${text.launcher}: ${text.openForm}`}
      aria-controls={`${id}-card`} aria-expanded={!minimized} aria-hidden={!minimized} inert={!minimized}
      tabIndex={minimized ? 0 : -1} style={placement.launcherStyle} {...placement.launcherHandlers}>
      <svg className={styles.paper} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="7" y="10" width="30" height="33" rx="7" fill="currentColor" opacity=".3" transform="rotate(-9 22 26.5)" />
        <rect x="12" y="6" width="30" height="34" rx="7" fill="currentColor" />
        <path d="M19 17h16M19 24h10" stroke="var(--paper-ink)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className={styles.launcherLabel}>{state === "pending" ? text.pendingTitle : text.launcher}</span>
    </button>
    </DraggableCore>
    </div>
  );
}
