"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MessageCircle,
  MessagesSquare,
} from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getTrafficSessionToken,
  trackEnquirySubmitted,
  trackEvent,
} from "../lib/analytics";
import { trustedMessengerUrl } from "../lib/homegroundSocial";
import {
  currentHomepageEmailFormVersion,
  homepageEmailInquirySchemaVersion,
  homepageEmailPrivacyNoticeVersion,
  inquirySubmitSurfaceByLocale,
} from "../lib/inquiryVersions";
import type { HomepagePlanningDeskCopy } from "../lib/homepagePlanningDesk";
import styles from "./HomegroundHomePage.module.css";

const homegroundInquiryApiHostname =
  "xbymvlxethfzqcgyoieb.supabase.co";
const defaultWhatsAppNumber = "8613174215999";
const defaultMessengerUrl = "https://m.me/61591910731724";
const maximumEmailLength = 254;
const requestTimeoutMilliseconds = 20_000;

type EmailStatus =
  | "idle"
  | "submitting"
  | "success"
  | "failed"
  | "uncertain"
  | "disabled";

interface SubmissionSnapshot {
  body: string;
  idempotencyKey: string;
}

interface ApiSuccessEnvelope {
  publicReference?: unknown;
  state?: unknown;
}

interface ApiErrorEnvelope {
  error?: {
    code?: unknown;
    persistenceState?: unknown;
    fieldErrors?: unknown;
  };
}

function trustedInquiryApiUrl(value: string): string {
  if (!value) return "";
  try {
    const parsed = new URL(value);
    const path = parsed.pathname.replace(/\/+$/, "");
    const isDevelopmentMock =
      process.env.NODE_ENV !== "production" &&
      parsed.protocol === "http:" &&
      (parsed.hostname === "127.0.0.1" ||
        parsed.hostname === "localhost") &&
      path === "/v1/inquiries";
    const isHostedInquiryApi =
      parsed.protocol === "https:" &&
      parsed.hostname === homegroundInquiryApiHostname &&
      !parsed.port &&
      path === "/functions/v1/v1-inquiries";
    if (
      (!isDevelopmentMock && !isHostedInquiryApi) ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash
    ) {
      return "";
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return "";
  }
}

function trustedWhatsAppNumber(value: string): string {
  return /^[1-9][0-9]{7,14}$/u.test(value) ? value : "";
}

function createUuid(): string {
  if (typeof globalThis.crypto?.randomUUID !== "function") {
    throw new Error("Secure UUID generation is unavailable.");
  }
  return globalThis.crypto.randomUUID();
}

function safeResponseJson(value: string): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function isValidEmail(value: string): boolean {
  const normalized = value.trim();
  return (
    normalized.length > 0 &&
    normalized.length <= maximumEmailLength &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(normalized)
  );
}

function privacyPath(locale: HomegroundLocale): string {
  if (locale === "zh") return "/zh/privacy/";
  if (locale === "ko") return "/ko/privacy/";
  return "/privacy/";
}

function whatsappMessage(locale: HomegroundLocale): string {
  if (locale === "zh") {
    return "你好 Homeground，我正在计划中国旅行，想先和你们聊聊。";
  }
  if (locale === "ko") {
    return "안녕하세요 Homeground, 중국 여행을 계획 중이라 먼저 상담하고 싶습니다.";
  }
  return "Hello Homeground, I’m planning a trip to China and would like to talk.";
}

export function HomepageQuickContact({
  locale,
  copy,
  onCancel,
  variant = "default",
}: {
  locale: HomegroundLocale;
  copy: HomepagePlanningDeskCopy;
  onCancel?: () => void;
  variant?: "default" | "hero";
}) {
  const contactCopy = copy.contactStart;
  const emailId = useId();
  const errorId = `${emailId}-error`;
  const liveStatusId = `${emailId}-live-status`;
  const whatsappExternalNoteId = `${emailId}-whatsapp-external`;
  const messengerExternalNoteId = `${emailId}-messenger-external`;
  const snapshotRef = useRef<SubmissionSnapshot | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const dispatchingRef = useRef(false);
  const contactOptionsViewedRef = useRef(false);
  const emailStartedRef = useRef(false);
  const successfulSubmissionTrackedRef = useRef(false);
  const [email, setEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<EmailStatus>("idle");
  const [error, setError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [publicReference, setPublicReference] = useState("");

  const apiUrl = trustedInquiryApiUrl(
    process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL?.trim() || "",
  );
  const emailIntakeReady = Boolean(
    process.env.NEXT_PUBLIC_HOMEGROUND_HOMEPAGE_EMAIL_ENABLED === "true" &&
      process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED === "true" &&
      process.env.NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY === "true" &&
      apiUrl,
  );
  const directWhatsAppEnabled =
    process.env.NEXT_PUBLIC_HOMEGROUND_DIRECT_WHATSAPP_ENABLED !== "false";
  const whatsappNumber = trustedWhatsAppNumber(
    process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER?.trim() ||
      defaultWhatsAppNumber,
  );
  const whatsappUrl =
    directWhatsAppEnabled && whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage(locale),
        )}`
      : "";
  const messengerUrl = trustedMessengerUrl(
    process.env.NEXT_PUBLIC_HOMEGROUND_MESSENGER_URL?.trim() ||
      defaultMessengerUrl,
  );
  useEffect(() => {
    if (status !== "success") return;
    const frame = window.requestAnimationFrame(() => {
      successRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [status]);

  useEffect(() => {
    if (contactOptionsViewedRef.current) return;
    contactOptionsViewedRef.current = true;
    trackEvent("contact_options_viewed", {
      page_language: locale,
      contact_variant: variant,
    });
  }, [locale, variant]);

  const buildPayload = () => ({
    trafficSessionToken: getTrafficSessionToken() ?? null,
    schemaVersion: homepageEmailInquirySchemaVersion,
    formVersion: currentHomepageEmailFormVersion,
    entryPath: "homepage_email",
    locale,
    contact: {
      channel: "email",
      email: email.trim(),
    },
    privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
    attribution: {
      landingPath: inquirySubmitSurfaceByLocale[locale],
    },
    experiment: null,
    antiAbuse: {
      companyWebsite,
    },
  });

  const dispatch = async (snapshot: SubmissionSnapshot) => {
    if (dispatchingRef.current || !emailIntakeReady) return;
    if (!navigator.onLine) {
      setStatus("failed");
      setError(contactCopy.failed);
      return;
    }

    dispatchingRef.current = true;
    setStatus("submitting");
    setError("");
    setEmailValidationError(false);
    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      requestTimeoutMilliseconds,
    );

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": snapshot.idempotencyKey,
        },
        body: snapshot.body,
        signal: controller.signal,
      });
      const responseData = safeResponseJson(await response.text());

      if (response.ok) {
        const success = responseData as ApiSuccessEnvelope | null;
        if (
          success?.state === "submitted" &&
          typeof success.publicReference === "string" &&
          success.publicReference.trim()
        ) {
          setPublicReference(success.publicReference.trim());
          setStatus("success");
          setError("");
          setShowRetry(false);
          if (!successfulSubmissionTrackedRef.current) {
            successfulSubmissionTrackedRef.current = true;
            trackEnquirySubmitted({
              page_language: locale,
              reply_channel: "email",
              submission_surface: "homepage_email",
              form_version: currentHomepageEmailFormVersion,
            });
          }
          return;
        }
        setStatus("uncertain");
        setError(contactCopy.uncertain);
        setShowRetry(true);
        return;
      }

      const envelope = responseData as ApiErrorEnvelope | null;
      const code =
        typeof envelope?.error?.code === "string"
          ? envelope.error.code
          : "";
      const fieldErrors =
        envelope?.error?.fieldErrors &&
        typeof envelope.error.fieldErrors === "object"
          ? (envelope.error.fieldErrors as Record<string, unknown>)
          : {};
      if (response.status === 422 && fieldErrors["contact.email"]) {
        snapshotRef.current = null;
        setStatus("failed");
        setError(contactCopy.emailInvalid);
        setEmailValidationError(true);
        setShowRetry(false);
        return;
      }
      if (code === "idempotency_conflict") {
        snapshotRef.current = null;
        setStatus("failed");
        setError(contactCopy.failed);
        setShowRetry(false);
        return;
      }
      if (envelope?.error?.persistenceState === "not_persisted") {
        setStatus("failed");
        setError(contactCopy.failed);
        setShowRetry(false);
        return;
      }
      setStatus("uncertain");
      setError(contactCopy.uncertain);
      setShowRetry(true);
    } catch {
      setStatus("uncertain");
      setError(contactCopy.uncertain);
      setShowRetry(true);
    } finally {
      window.clearTimeout(timeout);
      dispatchingRef.current = false;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackEvent("contact_option_clicked", {
      channel: "email",
      contact_variant: variant,
      page_language: locale,
    });
    if (!emailIntakeReady) {
      setStatus("disabled");
      setError(contactCopy.emailUnavailable);
      setEmailValidationError(false);
      return;
    }
    if (!isValidEmail(email)) {
      snapshotRef.current = null;
      setStatus("failed");
      setError(contactCopy.emailInvalid);
      setEmailValidationError(true);
      setShowRetry(false);
      return;
    }

    setEmailValidationError(false);
    setShowRetry(false);
    const body = JSON.stringify(buildPayload());
    let snapshot = snapshotRef.current;
    if (!snapshot || snapshot.body !== body) {
      try {
        snapshot = { body, idempotencyKey: createUuid() };
      } catch {
        setStatus("failed");
        setError(contactCopy.failed);
        setShowRetry(false);
        return;
      }
      snapshotRef.current = snapshot;
    }
    await dispatch(snapshot);
  };

  const liveStatus =
    status === "submitting"
      ? contactCopy.emailSubmitting
      : status === "success"
        ? ""
        : error;

  return (
    <div
      className={`${styles.quickContact} ${
        variant === "hero" ? styles.quickContactHero : ""
      }`}
    >
      <div className={styles.quickContactGrid}>
        <article
          className={`${styles.quickContactCard} ${styles.quickContactWhatsapp}`}
        >
          <div className={styles.quickContactIcon} aria-hidden="true">
            <MessageCircle size={22} strokeWidth={1.8} />
          </div>
          {variant === "default" && (
            <p className={styles.quickContactEyebrow}>
              {contactCopy.whatsappEyebrow}
            </p>
          )}
          <h3>{contactCopy.whatsappTitle}</h3>
          {whatsappUrl ? (
            <a
              className={styles.quickContactPrimaryLink}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby={whatsappExternalNoteId}
              onClick={() => {
                trackEvent("contact_option_clicked", {
                  channel: "whatsapp",
                  contact_variant: variant,
                  page_language: locale,
                });
              }}
            >
              {contactCopy.whatsappAction}
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          ) : (
            <p className={styles.quickContactUnavailable}>
              {contactCopy.whatsappUnavailable}
            </p>
          )}
          {whatsappUrl && (
            <small
              className={
                variant === "hero"
                  ? styles.quickContactSrOnly
                  : styles.quickContactExternalNote
              }
              id={whatsappExternalNoteId}
            >
              {contactCopy.whatsappOpensExternally}
            </small>
          )}
          {messengerUrl && (
            <p className={styles.quickContactMessenger}>
              {variant === "default" && (
                <span>{contactCopy.messengerLead}</span>
              )}{" "}
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby={messengerExternalNoteId}
                onClick={() => {
                  trackEvent("contact_option_clicked", {
                    channel: "messenger",
                    contact_variant: variant,
                    page_language: locale,
                  });
                }}
              >
                <MessagesSquare aria-hidden="true" size={15} />
                {contactCopy.messengerAction}
              </a>
              <span
                className={styles.quickContactSrOnly}
                id={messengerExternalNoteId}
              >
                {contactCopy.messengerOpensExternally}
              </span>
            </p>
          )}
        </article>

        <article
          className={`${styles.quickContactCard} ${styles.quickContactEmail}`}
        >
          <div className={styles.quickContactIcon} aria-hidden="true">
            <Mail size={22} strokeWidth={1.8} />
          </div>
          {variant === "default" && (
            <p className={styles.quickContactEyebrow}>
              {contactCopy.emailEyebrow}
            </p>
          )}
          <h3>{contactCopy.emailTitle}</h3>

          {!emailIntakeReady ? (
            <p className={styles.quickContactUnavailable}>
              {contactCopy.emailUnavailable}
            </p>
          ) : status === "success" ? (
            <div
              className={styles.quickContactSuccess}
              ref={successRef}
              role="status"
              aria-live="polite"
              tabIndex={-1}
            >
              <CheckCircle2 aria-hidden="true" size={22} />
              <div>
                <strong>{contactCopy.emailSuccessTitle}</strong>
                <p>{contactCopy.emailSuccessBody}</p>
                <small>
                  {contactCopy.referenceLabel}: {publicReference}
                </small>
              </div>
            </div>
          ) : (
            <form
              className={styles.quickContactEmailForm}
              onSubmit={handleSubmit}
              noValidate
              aria-busy={status === "submitting"}
            >
              <label htmlFor={emailId}>{contactCopy.emailLabel}</label>
              <div className={styles.quickContactEmailRow}>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={maximumEmailLength}
                  placeholder={contactCopy.emailPlaceholder}
                  value={email}
                  aria-invalid={emailValidationError ? "true" : undefined}
                  aria-describedby={
                    emailValidationError ? errorId : undefined
                  }
                  disabled={status === "submitting"}
                  onFocus={() => {
                    if (emailStartedRef.current) return;
                    emailStartedRef.current = true;
                    trackEvent("quick_email_started", {
                      submission_surface: "homepage_email",
                      contact_variant: variant,
                      page_language: locale,
                    });
                  }}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    snapshotRef.current = null;
                    setError("");
                    setStatus("idle");
                    setEmailValidationError(false);
                    setShowRetry(false);
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <LoaderCircle
                        className={styles.quickContactSpinner}
                        aria-hidden="true"
                        size={18}
                      />
                      {contactCopy.emailSubmitting}
                    </>
                  ) : (
                    <>
                      {contactCopy.emailAction}
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </>
                  )}
                </button>
              </div>
              <div className={styles.quickContactHoneypot} aria-hidden="true">
                <label htmlFor={`${emailId}-company`}>Company website</label>
                <input
                  id={`${emailId}-company`}
                  name="companyWebsite"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={companyWebsite}
                  onChange={(event) => setCompanyWebsite(event.target.value)}
                />
              </div>
              <p
                className={styles.quickContactError}
                id={errorId}
              >
                {error}
              </p>
              {showRetry && snapshotRef.current && (
                <button
                  className={styles.quickContactRetry}
                  type="button"
                  aria-disabled={status === "submitting"}
                  onClick={() => {
                    const snapshot = snapshotRef.current;
                    if (snapshot) void dispatch(snapshot);
                  }}
                >
                  {status === "submitting"
                    ? contactCopy.emailSubmitting
                    : contactCopy.retryAction}
                </button>
              )}
              <small className={styles.quickContactEmailUse}>
                {contactCopy.emailUse} {contactCopy.privacyLead}{" "}
                <a href={privacyPath(locale)}>
                  {contactCopy.privacyAction}
                </a>
              </small>
            </form>
          )}
          <p
            className={styles.quickContactSrOnly}
            id={liveStatusId}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {liveStatus}
          </p>
        </article>
      </div>

      {onCancel && (
        <button
          className={styles.quickContactCancel}
          type="button"
          onClick={onCancel}
        >
          {copy.keepCurrent}
        </button>
      )}

      {variant === "hero" && copy.contactNoPayment && (
        <div className={styles.quickContactBoundary}>
          <CheckCircle2 aria-hidden="true" size={18} />
          <p>{copy.contactNoPayment}</p>
        </div>
      )}
    </div>
  );
}
