"use client";

import { ArrowRight, ArrowUpRight, LoaderCircle, MessagesSquare, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { homegroundMessengerUrl } from "../lib/homegroundSocial";
import { getHomepagePlanningDeskCopy } from "../lib/homepagePlanningDesk";
import type { ContactCardLayout, ContactCardRequest } from "../lib/contactCard";
import { contactCardCopy } from "../lib/contactCardCopy";
import { privateTourQuoteApiUrl, tourWhatsAppHref } from "../lib/tourContact";
import {
  buildPrivateTourMailtoHref,
  getPrivateTourInquiryContext,
  getPrivateTourInquirySubmissionContext,
  type PrivateTourInquiryContext,
} from "../lib/privateTourInquiryContext";
import {
  currentHomepageEmailFormVersion,
  homepageEmailInquirySchemaVersion,
  homepageEmailPrivacyNoticeVersion,
  inquirySubmitSurfaceByLocale,
} from "../lib/inquiryVersions";
import { getTrafficSessionToken, trackEnquirySubmitted, trackEvent } from "../lib/analytics";
import { inquiryBodyWithCurrentTrafficConsent } from "../lib/inquiryTrafficConsent";
import { markNewsletterPromptHandled } from "../lib/newsletterPrompt";
import { setInquiryOpen } from "../lib/siteOverlayState";
import { ContactCardScan, CopyButton } from "./ContactCardScan";
import styles from "./ContactCard.module.css";
import sheetStyles from "./ContactSheet.module.css";

type EmailStatus = "idle" | "submitting" | "success" | "failed" | "uncertain";
type Snapshot = { body: string; key: string };

const maximumEmailLength = 254;
const requestTimeoutMilliseconds = 20_000;

function isValidEmail(value: string) {
  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= maximumEmailLength && /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(normalized);
}

function privacyPath(locale: HomegroundLocale) {
  return locale === "en" ? "/privacy/" : `/${locale}/privacy/`;
}

function chinaTime(locale: HomegroundLocale) {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-GB", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}

/** The page the card was opened on: a tour gives the itinerary, a guide its title. */
function pageContext(locale: HomegroundLocale) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const path = window.location.pathname;
  const tourSlug = path.match(new RegExp(`^${prefix}/tours/([a-z0-9-]+)/$`))?.[1];
  const tour = tourSlug ? getPrivateTourInquiryContext(tourSlug, locale) : null;
  const isGuide = new RegExp(`^${prefix}/guides/[a-z0-9-]+/$`).test(path);
  const guideTitle = !tour && isGuide ? document.querySelector("main h1")?.textContent?.trim() || "" : "";
  return { path, tour, guideTitle };
}

export function ContactCardDialog({
  locale,
  request,
  layout,
  open,
  onClose,
}: {
  locale: HomegroundLocale;
  request: ContactCardRequest;
  layout: ContactCardLayout;
  open: boolean;
  onClose: () => void;
}) {
  const copy = contactCardCopy[locale];
  // Phones and tablets: the same card as a sheet from the bottom of the screen.
  const sheet = layout === "sheet";
  const contactVariant = sheet ? "mobile_sheet" : "desktop_card";
  const withSheet = (base: string, extra: string) => (sheet ? `${base} ${extra}` : base);
  const desk = getHomepagePlanningDeskCopy(locale).contactStart;
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const snapshotRef = useRef<Snapshot | null>(null);
  const dispatchingRef = useRef(false);
  const startedRef = useRef(false);
  const submittedRef = useRef(false);
  const [closing, setClosing] = useState(false);
  // Re-read on every open: the card outlives client-side navigation.
  const [context, setContext] = useState(() => pageContext(locale));
  const [clock, setClock] = useState(() => chinaTime(locale));
  const [email, setEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<EmailStatus>("idle");
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [reference, setReference] = useState("");

  const tour: PrivateTourInquiryContext | null = context.tour;
  const apiUrl = privateTourQuoteApiUrl();
  const emailReady = Boolean(
    apiUrl &&
      process.env.NEXT_PUBLIC_HOMEGROUND_HOMEPAGE_EMAIL_ENABLED === "true" &&
      process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED === "true" &&
      process.env.NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY === "true",
  );
  const directWhatsApp = process.env.NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED !== "false";
  const whatsappHref = request.whatsappHref ?? (directWhatsApp ? tourWhatsAppHref(locale, tour, context.path) : "");
  const mailtoHref = request.mailtoHref ?? buildPrivateTourMailtoHref(homegroundBusiness.serviceEmail, locale, tour);
  const messengerHref = sheet ? homegroundMessengerUrl() : "";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    // From a mail link, start in the email field; otherwise at the title.
    const emailField = request.trigger === "email" ? emailRef.current : null;
    (emailField && !emailField.disabled ? emailField : titleRef.current)?.focus({ preventScroll: true });
    const opened = pageContext(locale);
    setContext(opened);
    markNewsletterPromptHandled();
    setInquiryOpen(true);
    setClock(chinaTime(locale));
    const tick = window.setInterval(() => setClock(chinaTime(locale)), 20_000);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    trackEvent("contact_options_viewed", { page_language: locale, contact_variant: contactVariant }, { firstPartyContext: { productSlug: opened.tour?.slug, surface: opened.tour ? "product" : "contact_options" } });
    return () => {
      window.clearInterval(tick);
      document.body.style.overflow = previousOverflow;
      // A tour's quote sheet may still be open underneath.
      if (!document.querySelector("dialog[open]:not([data-contact-card-dialog])")) setInquiryOpen(false);
    };
  }, [open, locale, request, contactVariant]);

  useEffect(() => {
    if (status !== "success") return;
    const frame = window.requestAnimationFrame(() => successRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [status]);

  function close() {
    if (closing) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, reduced ? 0 : 180);
  }

  const payload = () => ({
    trafficSessionToken: getTrafficSessionToken() ?? null,
    schemaVersion: homepageEmailInquirySchemaVersion,
    formVersion: currentHomepageEmailFormVersion,
    entryPath: "homepage_email",
    locale,
    contact: { channel: "email", email: email.trim() },
    privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
    productInterest: tour ? getPrivateTourInquirySubmissionContext(tour, locale) : null,
    attribution: { landingPath: inquirySubmitSurfaceByLocale[locale] },
    experiment: null,
    antiAbuse: { companyWebsite },
  });

  const recordOutcome = (name: "enquiry_submit_failed" | "enquiry_submit_uncertain", errorCode: "validation" | "network" | "rate_limited" | "service_unavailable" | "server_error" | "unknown_response") => {
    trackEvent(name, { page_language: locale, submission_surface: "homepage_email", contact_variant: contactVariant }, { firstPartyContext: { surface: "homepage_quick_email", errorCode } });
  };

  async function dispatch(snapshot: Snapshot, recordAttempt: boolean) {
    if (dispatchingRef.current || !emailReady) return;
    if (recordAttempt) trackEvent("enquiry_submit_attempted", { page_language: locale, submission_surface: "homepage_email", contact_variant: contactVariant });
    if (!navigator.onLine) {
      recordOutcome("enquiry_submit_failed", "network");
      setStatus("failed");
      setError(desk.failed);
      return;
    }
    dispatchingRef.current = true;
    setStatus("submitting");
    setError("");
    setInvalid(false);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMilliseconds);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": snapshot.key },
        body: inquiryBodyWithCurrentTrafficConsent(snapshot.body),
        signal: controller.signal,
      });
      const text = await response.text();
      let result: { state?: unknown; publicReference?: unknown; error?: { code?: unknown; persistenceState?: unknown; fieldErrors?: unknown } } | null = null;
      try { result = text ? JSON.parse(text) : null; } catch { result = null; }
      if (response.ok) {
        if (result?.state === "submitted" && typeof result.publicReference === "string" && result.publicReference.trim()) {
          setReference(result.publicReference.trim());
          setStatus("success");
          if (!submittedRef.current) {
            submittedRef.current = true;
            trackEnquirySubmitted({ page_language: locale, reply_channel: "email", submission_surface: "homepage_email", form_version: currentHomepageEmailFormVersion, contact_variant: contactVariant });
          }
          return;
        }
        recordOutcome("enquiry_submit_uncertain", "unknown_response");
        setStatus("uncertain");
        setError(desk.uncertain);
        return;
      }
      const fieldErrors = result?.error?.fieldErrors && typeof result.error.fieldErrors === "object" ? result.error.fieldErrors as Record<string, unknown> : {};
      if (response.status === 422 && fieldErrors["contact.email"]) {
        recordOutcome("enquiry_submit_failed", "validation");
        snapshotRef.current = null;
        setStatus("failed");
        setError(desk.emailInvalid);
        setInvalid(true);
        return;
      }
      if (result?.error?.code === "idempotency_conflict") {
        recordOutcome("enquiry_submit_failed", "server_error");
        snapshotRef.current = null;
        setStatus("failed");
        setError(desk.failed);
        return;
      }
      if (result?.error?.persistenceState === "not_persisted") {
        recordOutcome("enquiry_submit_failed", response.status === 429 ? "rate_limited" : response.status === 503 ? "service_unavailable" : "server_error");
        setStatus("failed");
        setError(desk.failed);
        return;
      }
      recordOutcome("enquiry_submit_uncertain", "unknown_response");
      setStatus("uncertain");
      setError(desk.uncertain);
    } catch {
      recordOutcome("enquiry_submit_uncertain", "network");
      setStatus("uncertain");
      setError(desk.uncertain);
    } finally {
      window.clearTimeout(timeout);
      dispatchingRef.current = false;
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (dispatchingRef.current || !emailReady) return;
    trackEvent("enquiry_submit_attempted", { page_language: locale, submission_surface: "homepage_email", contact_variant: contactVariant });
    if (!isValidEmail(email)) {
      recordOutcome("enquiry_submit_failed", "validation");
      snapshotRef.current = null;
      setStatus("failed");
      setError(desk.emailInvalid);
      setInvalid(true);
      return;
    }
    const body = JSON.stringify(payload());
    let snapshot = snapshotRef.current;
    if (!snapshot || snapshot.body !== body) {
      try {
        snapshot = { body, key: crypto.randomUUID() };
      } catch {
        recordOutcome("enquiry_submit_failed", "server_error");
        setStatus("failed");
        setError(desk.failed);
        return;
      }
      snapshotRef.current = snapshot;
    }
    await dispatch(snapshot, false);
  }

  const aboutLabel = tour ? copy.tourLabel : context.guideTitle ? copy.guideLabel : "";
  const aboutName = tour ? tour.name : context.guideTitle;
  const openedApp = (channel: "whatsapp" | "messenger") => () =>
    trackEvent("contact_option_clicked", { channel, contact_variant: contactVariant, page_language: locale });

  const mail = (
    <section className={withSheet(styles.mail, sheetStyles.mail)} aria-labelledby={`${id}-mail`}>
      <h3 id={`${id}-mail`}>{desk.emailTitle}</h3>
      <p className={styles.replyFrom}>
        <span>{copy.replyFrom}</span>
        <strong>{homegroundBusiness.serviceEmail}</strong>
        <CopyButton value={homegroundBusiness.serviceEmail} label={copy.copyEmail} copied={copy.copied} idle={copy.copy} />
      </p>

      {!emailReady ? (
        <p className={styles.note}>{desk.emailUnavailable}</p>
      ) : status === "success" ? (
        <div className={styles.success} ref={successRef} role="status" aria-live="polite" tabIndex={-1}>
          <svg className={styles.successMark} viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="11" />
            <path d="M9 14.4l3.3 3.3 6.7-7.2" />
          </svg>
          <div>
            <strong>{desk.emailSuccessTitle}</strong>
            <p>{desk.emailSuccessBody}</p>
            <small>{desk.referenceLabel}: {reference}</small>
          </div>
        </div>
      ) : (
        <form className={styles.form} onSubmit={submit} noValidate aria-busy={status === "submitting"}>
          <label className={styles.visuallyHidden} htmlFor={`${id}-email`}>{desk.emailLabel}</label>
          <input
            ref={emailRef}
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={maximumEmailLength}
            placeholder={desk.emailPlaceholder}
            value={email}
            aria-invalid={invalid || undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            disabled={status === "submitting"}
            onFocus={() => {
              if (startedRef.current) return;
              startedRef.current = true;
              trackEvent("quick_email_started", { submission_surface: "homepage_email", contact_variant: contactVariant, page_language: locale });
            }}
            onChange={(event) => {
              setEmail(event.target.value);
              snapshotRef.current = null;
              setError("");
              setStatus("idle");
              setInvalid(false);
            }}
          />
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor={`${id}-company`}>Company website</label>
            <input id={`${id}-company`} name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={(event) => setCompanyWebsite(event.target.value)} />
          </div>
          {status === "uncertain" && snapshotRef.current ? (
            <button className={styles.send} type="button" onClick={() => { const snapshot = snapshotRef.current; if (snapshot) void dispatch(snapshot, true); }}>
              {desk.retryAction}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          ) : (
            <button className={styles.send} type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <><LoaderCircle className={styles.spinner} size={18} aria-hidden="true" />{desk.emailSubmitting}</>
              ) : (
                <>{desk.emailAction}<ArrowRight size={18} aria-hidden="true" /></>
              )}
            </button>
          )}
          <p className={styles.error} id={`${id}-error`} role="alert">{error}</p>
          <p className={styles.privacy}>
            {desk.emailUse} {desk.privacyLead}{" "}
            <a href={privacyPath(locale)} target="_blank" rel="noopener noreferrer">{desk.privacyAction}</a>
          </p>
        </form>
      )}

      <a className={styles.mailApp} href={mailtoHref}>
        {copy.openMailApp}
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </section>
  );

  return (
    <dialog
      ref={dialogRef}
      className={withSheet(styles.dialog, sheetStyles.sheet)}
      data-contact-card-dialog=""
      data-layout={layout}
      data-closing={closing || undefined}
      data-trigger={request.trigger}
      aria-labelledby={`${id}-title`}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div className={styles.card}>
        {sheet ? <span className={sheetStyles.grabber} aria-hidden="true" /> : null}
        <header className={withSheet(styles.head, sheetStyles.head)}>
          <div className={withSheet(styles.headText, sheetStyles.headText)}>
            <h2 id={`${id}-title`} ref={titleRef} tabIndex={-1}>{copy.title}</h2>
            {aboutName ? (
              <p className={styles.about}>
                <span>{aboutLabel}</span>
                <strong>{aboutName}</strong>
              </p>
            ) : null}
          </div>
          <p className={withSheet(styles.clock, sheetStyles.clock)}>
            <span className={styles.clockDot} aria-hidden="true" />
            {copy.chinaTime} <time>{clock}</time>
          </p>
          <button type="button" className={withSheet(styles.close, sheetStyles.close)} aria-label={copy.close} onClick={close}>
            <X size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </header>

        {sheet ? (
          <div className={sheetStyles.body}>
            <div className={sheetStyles.apps}>
              {whatsappHref ? (
                <a className={sheetStyles.whatsapp} href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-describedby={`${id}-whatsapp-note`} onClick={openedApp("whatsapp")}>
                  {desk.whatsappAction}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ) : (
                <p className={styles.note}>{desk.whatsappUnavailable}</p>
              )}
              {messengerHref ? (
                <a className={sheetStyles.messenger} href={messengerHref} target="_blank" rel="noopener noreferrer" aria-describedby={`${id}-messenger-note`} onClick={openedApp("messenger")}>
                  <MessagesSquare size={16} aria-hidden="true" />
                  {desk.messengerAction}
                </a>
              ) : null}
              <span className={styles.visuallyHidden} id={`${id}-whatsapp-note`}>{desk.whatsappOpensExternally}</span>
              <span className={styles.visuallyHidden} id={`${id}-messenger-note`}>{desk.messengerOpensExternally}</span>
            </div>
            <p className={sheetStyles.or} aria-hidden="true"><span>{copy.or}</span></p>
            {mail}
          </div>
        ) : (
          <div className={styles.columns} data-single={!whatsappHref || undefined}>
            {whatsappHref ? (
              <ContactCardScan locale={locale} href={whatsappHref} headingId={`${id}-scan`}>
                <a className={styles.webLink} href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {copy.useHere}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </ContactCardScan>
            ) : null}

            {whatsappHref ? <span className={styles.or} aria-hidden="true"><span>{copy.or}</span></span> : null}

            {mail}
          </div>
        )}
      </div>
    </dialog>
  );
}
