"use client";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { RouteMatch } from "../lib/routeFinder";
import {
  currentInquiryFormVersion,
  currentPrivacyNoticeVersion,
  inquirySchemaVersion,
} from "../lib/inquiryVersions";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import type { RouteJourney } from "./RouteFinder";
import styles from "./PlannerHandoff.module.css";

export type HandoffStatus =
  | "disabled"
  | "idle"
  | "editing"
  | "validation-error"
  | "submitting"
  | "success"
  | "failed"
  | "uncertain";

export type HandoffRouteState = "current" | "editing";

type ReplyMethod = "email" | "whatsapp";
type ValidationField = "contact" | "email" | "whatsapp" | "note";
type ValidationErrors = Partial<Record<ValidationField, string>>;
type FailureKind =
  | "request_too_large"
  | "rate_limited"
  | "idempotency_conflict"
  | "route_mismatch"
  | "unsupported_rule_version"
  | "offline_before_dispatch"
  | "not_persisted";

interface InquirySnapshot {
  body: string;
  idempotencyKey: string;
  routeIdentity: string;
}

interface ApiErrorEnvelope {
  error?: {
    code?: unknown;
    persistenceState?: unknown;
    fieldErrors?: unknown;
  };
}

interface ApiSuccessEnvelope {
  publicReference?: unknown;
  state?: unknown;
}

const maximumEmailLength = 254;
const maximumPhoneLength = 64;
const maximumNoteLength = 2_000;
const maximumRequestBytes = 16 * 1024;
const requestTimeoutMilliseconds = 20_000;

function createUuid(): string {
  if (typeof globalThis.crypto?.randomUUID !== "function") {
    throw new Error("Secure UUID generation is unavailable.");
  }

  return globalThis.crypto.randomUUID();
}

function noteLength(value: string): number {
  return Array.from(value).length;
}

function hasUnsupportedControlCharacters(value: string): boolean {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(value);
}

function isValidEmail(value: string): boolean {
  const normalized = value.trim();
  return (
    normalized.length > 0 &&
    normalized.length <= maximumEmailLength &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(normalized)
  );
}

function isValidInternationalPhone(value: string): boolean {
  const normalized = value.trim().replace(/[\s().-]/gu, "");
  return /^\+[1-9][0-9]{7,14}$/u.test(normalized);
}

function localizedRetryDelay(
  headerValue: string | null,
  locale: HomegroundLocale,
): { label: string; retryAt: number } {
  const now = Date.now();
  const fallbackSeconds = 60;
  const seconds = headerValue && /^[0-9]+$/u.test(headerValue)
    ? Math.max(1, Number.parseInt(headerValue, 10))
    : null;

  if (seconds !== null) {
    const amount = new Intl.NumberFormat(
      locale === "zh" ? "zh-Hans" : locale,
    ).format(seconds);
    const unit = locale === "zh" ? "秒" : locale === "ko" ? "초" : "seconds";
    return {
      label: `${amount} ${unit}`,
      retryAt: now + seconds * 1_000,
    };
  }

  if (headerValue) {
    const retryDate = Date.parse(headerValue);
    if (Number.isFinite(retryDate) && retryDate > now) {
      return {
        label: new Intl.DateTimeFormat(
          locale === "zh" ? "zh-Hans" : locale,
          { timeStyle: "short" },
        ).format(new Date(retryDate)),
        retryAt: retryDate,
      };
    }
  }

  const fallbackLabel =
    locale === "zh"
      ? "片刻"
      : locale === "ko"
        ? "잠시"
        : "a short while";
  return {
    label: fallbackLabel,
    retryAt: now + fallbackSeconds * 1_000,
  };
}

function safeResponseJson(value: string): unknown {
  if (!value) return null;

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

export function PlannerHandoff({
  embedded = false,
  locale,
  match,
  journey,
  routeState = "current",
  onDirtyChange,
  onStatusChange,
}: {
  embedded?: boolean;
  locale: HomegroundLocale;
  match: RouteMatch;
  journey?: RouteJourney;
  routeState?: HandoffRouteState;
  onDirtyChange?: (dirty: boolean) => void;
  onStatusChange?: (status: HandoffStatus) => void;
}) {
  const copy = getHomegroundCopy(locale);
  const apiUrl =
    process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL?.trim() || "";
  const brandEmail =
    process.env.NEXT_PUBLIC_HOMEGROUND_BRAND_EMAIL?.trim() || "";
  const defaultPrivacyNoticeUrl =
    locale === "zh"
      ? "/zh/privacy/"
      : locale === "ko"
        ? "/ko/privacy/"
        : "/privacy/";
  const localizedPrivacyNoticeUrl =
    locale === "zh"
      ? process.env.NEXT_PUBLIC_HOMEGROUND_PRIVACY_NOTICE_URL_ZH?.trim()
      : locale === "ko"
        ? process.env.NEXT_PUBLIC_HOMEGROUND_PRIVACY_NOTICE_URL_KO?.trim()
        : process.env.NEXT_PUBLIC_HOMEGROUND_PRIVACY_NOTICE_URL_EN?.trim();
  const privacyNoticeUrl =
    localizedPrivacyNoticeUrl ||
    (locale === "en"
      ? process.env.NEXT_PUBLIC_HOMEGROUND_PRIVACY_NOTICE_URL?.trim()
      : "") ||
    defaultPrivacyNoticeUrl;
  const inquiryEnabled =
    process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED === "true";
  const privacyReady =
    process.env.NEXT_PUBLIC_HOMEGROUND_PRIVACY_READY === "true";
  const whatsappEnabled =
    process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_ENABLED === "true";
  const replySla =
    locale === "zh"
      ? process.env.NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_ZH?.trim()
      : locale === "ko"
        ? process.env.NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_KO?.trim()
        : process.env.NEXT_PUBLIC_HOMEGROUND_REPLY_SLA_EN?.trim();
  const brandEmailReady = isValidEmail(brandEmail);
  const configurationReady = Boolean(
    inquiryEnabled &&
      apiUrl &&
      privacyReady &&
      privacyNoticeUrl &&
      replySla,
  );

  const [status, setStatus] = useState<HandoffStatus>(
    configurationReady ? "idle" : "disabled",
  );
  const [replyMethod, setReplyMethod] = useState<ReplyMethod>("email");
  const [email, setEmail] = useState("");
  const [phoneRaw, setPhoneRaw] = useState("");
  const [note, setNote] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [failureKind, setFailureKind] = useState<FailureKind | null>(null);
  const [failureOverride, setFailureOverride] = useState("");
  const [publicReference, setPublicReference] = useState("");
  const [previousSubmissionReference, setPreviousSubmissionReference] =
    useState("");
  const [submittedChannel, setSubmittedChannel] =
    useState<ReplyMethod>("email");
  const [retryAfterLabel, setRetryAfterLabel] = useState("");
  const [retryAvailableAt, setRetryAvailableAt] = useState<number | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const statusHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const snapshotRef = useRef<InquirySnapshot | null>(null);
  const localJourneyIdRef = useRef<string | null>(null);
  const localJourneyRevisionRef = useRef(1);
  const routeIdentityRef = useRef("");
  const dispatchingRef = useRef(false);

  const idPrefix = useId();
  const contactGroupId = `${idPrefix}-contact`;
  const emailId = `${idPrefix}-email`;
  const phoneId = `${idPrefix}-whatsapp`;
  const noteId = `${idPrefix}-note`;
  const emailHintId = `${emailId}-hint`;
  const phoneHintId = `${phoneId}-hint`;
  const noteHintId = `${noteId}-hint`;
  const contactErrorId = `${contactGroupId}-error`;
  const emailErrorId = `${emailId}-error`;
  const phoneErrorId = `${phoneId}-error`;
  const noteErrorId = `${noteId}-error`;
  const routeReference = `${match.routeId}@${match.ruleVersion}`;
  const routeIdentity = JSON.stringify({
    journeyId: journey?.journeyId ?? null,
    revision: journey?.revision ?? null,
    routeId: match.routeId,
    ruleVersion: match.ruleVersion,
    answers: match.answers,
  });

  if (!routeIdentityRef.current) {
    routeIdentityRef.current = routeIdentity;
  }

  const fallbackMailto = useMemo(() => {
    if (!brandEmailReady) return "";

    const subject = copy.handoff.fallbackEmailSubject(routeReference);
    const body = copy.handoff.fallbackEmailBody(routeReference);
    return `mailto:${brandEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [brandEmail, brandEmailReady, copy.handoff, routeReference]);

  const formIsDirty =
    email.trim().length > 0 ||
    phoneRaw.trim().length > 0 ||
    note.trim().length > 0 ||
    replyMethod !== "email";
  const hasUnsavedContactDraft =
    formIsDirty && status !== "success" && status !== "disabled";

  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);

  useEffect(() => {
    onDirtyChange?.(hasUnsavedContactDraft);
  }, [hasUnsavedContactDraft, onDirtyChange]);

  useEffect(
    () => () => {
      onDirtyChange?.(false);
    },
    [onDirtyChange],
  );

  useEffect(() => {
    if (configurationReady || status === "disabled") return;

    snapshotRef.current = null;
    setStatus("disabled");
  }, [configurationReady, status]);

  useEffect(() => {
    const focusHandoff = () => {
      if (window.location.hash !== "#planner-handoff") return;

      window.requestAnimationFrame(() => {
        headingRef.current?.focus({ preventScroll: true });
      });
    };

    focusHandoff();
    window.addEventListener("hashchange", focusHandoff);
    return () => window.removeEventListener("hashchange", focusHandoff);
  }, []);

  useEffect(() => {
    if (
      status !== "success" &&
      status !== "failed" &&
      status !== "uncertain"
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      statusHeadingRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [status]);

  useEffect(() => {
    if (retryAvailableAt === null) return;

    const remaining = Math.max(0, retryAvailableAt - Date.now());
    const timer = window.setTimeout(() => {
      setRetryAvailableAt(null);
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [retryAvailableAt]);

  useEffect(() => {
    if (!hasUnsavedContactDraft) return;

    const confirmLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", confirmLeave);
    return () => window.removeEventListener("beforeunload", confirmLeave);
  }, [hasUnsavedContactDraft]);

  useEffect(() => {
    if (routeIdentityRef.current === routeIdentity) return;

    routeIdentityRef.current = routeIdentity;
    if (!journey) {
      localJourneyRevisionRef.current += 1;
    }

    if (!configurationReady) {
      snapshotRef.current = null;
      setStatus("disabled");
      return;
    }

    if (status === "submitting" || status === "uncertain") {
      return;
    }

    snapshotRef.current = null;
    setErrors({});
    setFailureKind(null);
    setFailureOverride("");
    setRetryAfterLabel("");
    setRetryAvailableAt(null);

    if (status === "success" && publicReference) {
      setPreviousSubmissionReference(publicReference);
      setPublicReference("");
    }
    setStatus(formIsDirty ? "editing" : "idle");
  }, [
    configurationReady,
    formIsDirty,
    journey,
    publicReference,
    routeIdentity,
    status,
  ]);

  const markEditing = (field: ValidationField) => {
    if (
      status === "submitting" ||
      status === "uncertain" ||
      status === "success" ||
      status === "disabled"
    ) {
      return;
    }

    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFailureKind(null);
    setFailureOverride("");
    setRetryAfterLabel("");
    setRetryAvailableAt(null);
    snapshotRef.current = null;
    setStatus("editing");
  };

  const changeReplyMethod = (method: ReplyMethod) => {
    if (
      status === "submitting" ||
      status === "uncertain" ||
      status === "success" ||
      status === "disabled"
    ) {
      return;
    }

    setReplyMethod(method);
    setErrors((current) => {
      const next = { ...current };
      delete next.contact;
      delete next.email;
      delete next.whatsapp;
      return next;
    });
    setFailureKind(null);
    setFailureOverride("");
    setRetryAfterLabel("");
    setRetryAvailableAt(null);
    snapshotRef.current = null;
    setStatus("editing");
  };

  const setBlurError = (
    field: ValidationField,
    message: string | undefined,
  ) => {
    setErrors((current) => {
      const next = { ...current };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
    if (message) setStatus("validation-error");
  };

  const validate = (): ValidationErrors => {
    const nextErrors: ValidationErrors = {};

    if (replyMethod !== "email" && replyMethod !== "whatsapp") {
      nextErrors.contact = copy.handoff.contactError;
    } else if (replyMethod === "email" && !isValidEmail(email)) {
      nextErrors.email = copy.handoff.emailError;
    } else if (
      replyMethod === "whatsapp" &&
      !isValidInternationalPhone(phoneRaw)
    ) {
      nextErrors.whatsapp = copy.handoff.whatsappError;
    }

    if (noteLength(note) > maximumNoteLength) {
      nextErrors.note = copy.handoff.noteTooLong;
    } else if (hasUnsupportedControlCharacters(note)) {
      nextErrors.note = copy.handoff.noteInvalid;
    }

    return nextErrors;
  };

  const focusErrorSummary = () => {
    window.requestAnimationFrame(() => {
      errorSummaryRef.current?.focus();
    });
  };

  const currentJourney = (): RouteJourney => {
    if (journey) return journey;

    localJourneyIdRef.current ??= createUuid();
    return {
      journeyId: localJourneyIdRef.current,
      revision: localJourneyRevisionRef.current,
    };
  };

  const buildPayload = () => {
    const search = new URLSearchParams(window.location.search);
    const attribution: Record<string, string> = {
      landingPath: window.location.pathname,
    };
    const attributionFields = [
      ["utm_source", "utmSource"],
      ["utm_medium", "utmMedium"],
      ["utm_campaign", "utmCampaign"],
    ] as const;
    for (const [queryKey, payloadKey] of attributionFields) {
      const value = search.get(queryKey)?.trim();
      if (value) attribution[payloadKey] = value.slice(0, 100);
    }

    return {
      schemaVersion: inquirySchemaVersion,
      formVersion: currentInquiryFormVersion,
      entryPath: "generated_route",
      locale,
      journey: {
        ...currentJourney(),
        answers: match.answers,
        routeId: match.routeId,
        ruleVersion: match.ruleVersion,
      },
      contact:
        replyMethod === "email"
          ? {
              channel: "email",
              email: email.trim(),
            }
          : {
              channel: "whatsapp",
              phoneRaw: phoneRaw.trim(),
            },
      note: note.trim(),
      privacyNoticeVersion: currentPrivacyNoticeVersion,
      attribution,
      experiment: null,
      antiAbuse: {
        companyWebsite,
      },
    };
  };

  const applyServerValidation = (fieldErrors: unknown) => {
    const nextErrors: ValidationErrors = {};
    if (fieldErrors && typeof fieldErrors === "object") {
      const fields = fieldErrors as Record<string, unknown>;
      if (fields["contact.email"]) {
        nextErrors.email = copy.handoff.emailError;
      }
      if (fields["contact.phoneRaw"]) {
        nextErrors.whatsapp = copy.handoff.whatsappError;
      }
      if (fields["contact.channel"]) {
        nextErrors.contact = copy.handoff.contactError;
      }
      if (fields.note) {
        nextErrors.note =
          fields.note === "invalid_control_character"
            ? copy.handoff.noteInvalid
            : copy.handoff.noteTooLong;
      }
    }
    if (Object.keys(nextErrors).length === 0) {
      if (replyMethod === "email") {
        nextErrors.email = copy.handoff.emailError;
      } else {
        nextErrors.whatsapp = copy.handoff.whatsappError;
      }
    }

    setErrors(nextErrors);
    setStatus("validation-error");
    focusErrorSummary();
  };

  const setDefinitiveFailure = (
    kind: FailureKind,
    retryDelay?: { label: string; retryAt: number },
    overrideMessage = "",
  ) => {
    setFailureKind(kind);
    setFailureOverride(overrideMessage);
    if (retryDelay) {
      setRetryAfterLabel(retryDelay.label);
      setRetryAvailableAt(retryDelay.retryAt);
    } else {
      setRetryAfterLabel("");
      setRetryAvailableAt(null);
    }
    setStatus("failed");
  };

  const dispatchSnapshot = async (snapshot: InquirySnapshot) => {
    if (dispatchingRef.current) return;
    if (!configurationReady) {
      snapshotRef.current = null;
      setStatus("disabled");
      return;
    }
    if (routeState !== "current") return;

    if (!navigator.onLine) {
      setDefinitiveFailure("offline_before_dispatch");
      return;
    }

    dispatchingRef.current = true;
    setFailureKind(null);
    setStatus("submitting");
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
      const responseText = await response.text();
      const responseData = safeResponseJson(responseText);

      if (response.ok) {
        const success = responseData as ApiSuccessEnvelope | null;
        if (
          success?.state === "submitted" &&
          typeof success.publicReference === "string" &&
          success.publicReference.trim().length > 0
        ) {
          const nextPublicReference = success.publicReference.trim();
          setSubmittedChannel(replyMethod);
          setErrors({});
          if (snapshot.routeIdentity === routeIdentityRef.current) {
            setPreviousSubmissionReference("");
            setPublicReference(nextPublicReference);
            setStatus("success");
          } else {
            setPreviousSubmissionReference(nextPublicReference);
            setPublicReference("");
            snapshotRef.current = null;
            setStatus(formIsDirty ? "editing" : "idle");
          }
          return;
        }

        setStatus("uncertain");
        return;
      }

      const envelope = responseData as ApiErrorEnvelope | null;
      const code =
        typeof envelope?.error?.code === "string"
          ? envelope.error.code
          : "";
      const persistenceState = envelope?.error?.persistenceState;

      if (code === "idempotency_conflict") {
        snapshotRef.current = null;
        setDefinitiveFailure("idempotency_conflict");
        return;
      }
      if (code === "route_mismatch") {
        snapshotRef.current = null;
        setDefinitiveFailure("route_mismatch");
        return;
      }
      if (code === "unsupported_rule_version") {
        snapshotRef.current = null;
        setDefinitiveFailure("unsupported_rule_version");
        return;
      }
      if (code === "unsupported_form_version") {
        snapshotRef.current = null;
        setDefinitiveFailure(
          "not_persisted",
          undefined,
          copy.handoff.formVersionUnsupported,
        );
        return;
      }
      if (code === "unsupported_privacy_notice") {
        snapshotRef.current = null;
        setDefinitiveFailure(
          "not_persisted",
          undefined,
          copy.handoff.privacyNoticeUnsupported,
        );
        return;
      }
      if (code === "whatsapp_disabled") {
        setErrors({ contact: copy.handoff.whatsappUnavailable });
        setStatus("validation-error");
        focusErrorSummary();
        return;
      }
      if (response.status === 422 || code === "validation_failed") {
        applyServerValidation(envelope?.error?.fieldErrors);
        return;
      }
      if (response.status === 413 || code === "request_too_large") {
        setDefinitiveFailure("request_too_large");
        return;
      }
      if (response.status === 429 || code === "rate_limited") {
        setDefinitiveFailure(
          "rate_limited",
          localizedRetryDelay(response.headers.get("Retry-After"), locale),
        );
        return;
      }
      if (persistenceState === "not_persisted") {
        setDefinitiveFailure("not_persisted");
        return;
      }

      setStatus("uncertain");
    } catch {
      setStatus("uncertain");
    } finally {
      window.clearTimeout(timeout);
      dispatchingRef.current = false;
    }
  };

  const submitCurrentValues = async () => {
    if (!configurationReady) {
      snapshotRef.current = null;
      setStatus("disabled");
      return;
    }
    if (routeState !== "current") return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("validation-error");
      focusErrorSummary();
      return;
    }

    let body: string;
    try {
      body = JSON.stringify(buildPayload());
    } catch {
      setDefinitiveFailure("not_persisted");
      return;
    }

    if (new TextEncoder().encode(body).byteLength > maximumRequestBytes) {
      setDefinitiveFailure("request_too_large");
      return;
    }

    const existingSnapshot = snapshotRef.current;
    let snapshot: InquirySnapshot;
    try {
      snapshot =
        existingSnapshot?.body === body
          ? existingSnapshot
          : {
              body,
              idempotencyKey: createUuid(),
              routeIdentity,
            };
    } catch {
      setDefinitiveFailure("not_persisted");
      return;
    }
    snapshotRef.current = snapshot;
    setErrors({});
    await dispatchSnapshot(snapshot);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitCurrentValues();
  };

  const handleUncertainRetry = () => {
    const snapshot = snapshotRef.current;
    if (!snapshot) {
      setDefinitiveFailure("not_persisted");
      return;
    }
    void dispatchSnapshot(snapshot);
  };

  const handleFailureRetry = () => {
    if (failureKind === "idempotency_conflict") {
      snapshotRef.current = null;
    }
    void submitCurrentValues();
  };

  const failureMessage = failureOverride || (() => {
    switch (failureKind) {
      case "offline_before_dispatch":
        return copy.handoff.offlineError;
      case "not_persisted":
        return copy.handoff.notPersisted;
      case "request_too_large":
        return copy.handoff.requestTooLarge;
      case "rate_limited":
        return copy.handoff.rateLimited(retryAfterLabel);
      case "route_mismatch":
        return copy.handoff.routeMismatch;
      case "unsupported_rule_version":
        return copy.handoff.unsupportedRuleVersion;
      case "idempotency_conflict":
        return copy.handoff.idempotencyConflict;
      default:
        return copy.handoff.technicalError;
    }
  })();
  const allowsFallbackEmail =
    failureKind === "offline_before_dispatch" ||
    failureKind === "not_persisted";
  const allowsImmediateRetry =
    !failureOverride &&
    failureKind !== "request_too_large" &&
    failureKind !== "route_mismatch" &&
    failureKind !== "unsupported_rule_version";
  const controlsLocked =
    routeState === "editing" ||
    status === "submitting" ||
    status === "uncertain";
  const errorTargets: Record<ValidationField, string> = {
    contact: contactGroupId,
    email: emailId,
    whatsapp: phoneId,
    note: noteId,
  };
  const errorEntries = Object.entries(errors) as Array<
    [ValidationField, string]
  >;

  return (
    <section
      id="planner-handoff"
      className={`${styles.handoff} ${embedded ? styles.embedded : ""}`}
      aria-labelledby="planner-handoff-title"
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{copy.handoff.eyebrow}</p>
          <h2 id="planner-handoff-title" ref={headingRef} tabIndex={-1}>
            {copy.handoff.title}
          </h2>
          <p className={styles.body}>{copy.handoff.body}</p>
          <p className={styles.boundary}>{copy.handoff.boundary}</p>
        </div>

        <div className={styles.card}>
          {routeState === "editing" && (
            <div className={styles.routeEditingNotice} role="status">
              <AlertCircle aria-hidden="true" size={20} />
              <p>{copy.handoff.routeEditingNotice}</p>
            </div>
          )}

          {status === "disabled" && (
            <div className={styles.disabledState} role="status">
              <AlertCircle aria-hidden="true" size={23} />
              <div>
                <h3>{copy.handoff.disabledTitle}</h3>
                <p>{copy.handoff.disabledBody(routeReference)}</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className={styles.statusState} role="status">
              <CheckCircle2
                aria-hidden="true"
                className={styles.successIcon}
                size={27}
              />
              <h3 ref={statusHeadingRef} tabIndex={-1}>
                {copy.handoff.successTitle}
              </h3>
              <p>{copy.handoff.successBody}</p>
              <strong className={styles.publicReference}>
                {copy.handoff.successReference(publicReference)}
              </strong>
              <p>
                {submittedChannel === "email"
                  ? copy.handoff.successReplyEmail(replySla)
                  : copy.handoff.successReplyWhatsapp(replySla)}
              </p>
              <a className={styles.routeLink} href="#route-finder">
                {copy.handoff.backToRoute}
              </a>
            </div>
          )}

          {status === "uncertain" && (
            <div className={styles.statusState} role="alert">
              <AlertCircle
                aria-hidden="true"
                className={styles.warningIcon}
                size={27}
              />
              <h3 ref={statusHeadingRef} tabIndex={-1}>
                {copy.handoff.uncertainTitle}
              </h3>
              <p>{copy.handoff.uncertainBody}</p>
              <p className={styles.leaveWarning}>
                {copy.handoff.uncertainLeaveWarning}
              </p>
              <button
                className={styles.primaryAction}
                type="button"
                onClick={handleUncertainRetry}
              >
                {copy.handoff.uncertainRetry}
              </button>
            </div>
          )}

          {status !== "disabled" &&
            status !== "success" &&
            status !== "uncertain" && (
              <form
                className={styles.form}
                noValidate
                onSubmit={handleSubmit}
                aria-busy={status === "submitting"}
              >
                {previousSubmissionReference && (
                  <div className={styles.previousRequest} role="status">
                    {copy.handoff.previousRequestNotice(
                      previousSubmissionReference,
                    )}
                  </div>
                )}

                {status === "failed" && (
                  <div className={styles.failureState} role="alert">
                    <AlertCircle aria-hidden="true" size={22} />
                    <div>
                      <h3 ref={statusHeadingRef} tabIndex={-1}>
                        {copy.handoff.failureTitle}
                      </h3>
                      <p>{failureMessage}</p>
                      {allowsFallbackEmail &&
                        routeState === "current" && (
                        <>
                          <p>
                            {copy.handoff.fallbackFailureBody(routeReference)}
                          </p>
                          {fallbackMailto ? (
                            <>
                              <a
                                className={styles.inlineLink}
                                href={fallbackMailto}
                              >
                                {copy.handoff.emailFallback}
                              </a>
                              <span className={styles.fallbackAddress}>
                                {brandEmail}
                              </span>
                            </>
                          ) : (
                            <p className={styles.unavailableNote}>
                              {copy.handoff.brandEmailUnavailable}
                            </p>
                          )}
                        </>
                      )}
                      {allowsImmediateRetry && (
                        <button
                          className={styles.retryButton}
                          type="button"
                          disabled={
                            routeState === "editing" ||
                            retryAvailableAt !== null
                          }
                          onClick={handleFailureRetry}
                        >
                          {copy.handoff.retry}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {errorEntries.length > 0 && (
                  <div
                    className={styles.errorSummary}
                    ref={errorSummaryRef}
                    role="alert"
                    tabIndex={-1}
                  >
                    <strong>{copy.handoff.errorSummary}</strong>
                    <ul>
                      {errorEntries.map(([field, message]) => (
                        <li key={field}>
                          <a href={`#${errorTargets[field]}`}>{message}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <fieldset
                  id={contactGroupId}
                  className={styles.contactFieldset}
                  aria-describedby={
                    errors.contact ? contactErrorId : undefined
                  }
                  disabled={controlsLocked}
                >
                  <legend>
                    {copy.handoff.contactLegend}{" "}
                    <span className={styles.required}>
                      {copy.handoff.requiredText}
                    </span>
                  </legend>
                  <div className={styles.channelOptions}>
                    <label
                      className={`${styles.channelOption} ${
                        replyMethod === "email"
                          ? styles.channelOptionSelected
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="replyMethod"
                        value="email"
                        checked={replyMethod === "email"}
                        required
                        onChange={() => {
                          changeReplyMethod("email");
                        }}
                      />
                      <Mail aria-hidden="true" size={18} />
                      <span>{copy.handoff.emailOption}</span>
                    </label>
                    {whatsappEnabled && (
                      <label
                        className={`${styles.channelOption} ${
                          replyMethod === "whatsapp"
                            ? styles.channelOptionSelected
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="replyMethod"
                          value="whatsapp"
                          checked={replyMethod === "whatsapp"}
                          required
                          onChange={() => {
                            changeReplyMethod("whatsapp");
                          }}
                        />
                        <MessageCircle aria-hidden="true" size={18} />
                        <span>{copy.handoff.whatsappOption}</span>
                      </label>
                    )}
                  </div>
                  {errors.contact && (
                    <p
                      className={styles.fieldError}
                      id={contactErrorId}
                      role="alert"
                    >
                      {errors.contact}
                    </p>
                  )}
                </fieldset>

                {replyMethod === "email" ? (
                  <div className={styles.field}>
                    <label htmlFor={emailId}>
                      {copy.handoff.emailLabel}{" "}
                      <span className={styles.required}>
                        {copy.handoff.requiredText}
                      </span>
                    </label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      dir="auto"
                      maxLength={maximumEmailLength}
                      required
                      value={email}
                      disabled={controlsLocked}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={`${emailHintId}${
                        errors.email ? ` ${emailErrorId}` : ""
                      }`}
                      onBlur={() =>
                        setBlurError(
                          "email",
                          isValidEmail(email)
                            ? undefined
                            : copy.handoff.emailError,
                        )
                      }
                      onChange={(event) => {
                        setEmail(event.target.value);
                        markEditing("email");
                      }}
                    />
                    <p className={styles.hint} id={emailHintId}>
                      {copy.handoff.emailHint}
                    </p>
                    {errors.email && (
                      <p
                        className={styles.fieldError}
                        id={emailErrorId}
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className={styles.field}>
                    <label htmlFor={phoneId}>
                      {copy.handoff.whatsappLabel}{" "}
                      <span className={styles.required}>
                        {copy.handoff.requiredText}
                      </span>
                    </label>
                    <input
                      id={phoneId}
                      name="phoneRaw"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      dir="auto"
                      maxLength={maximumPhoneLength}
                      required
                      value={phoneRaw}
                      disabled={controlsLocked}
                      aria-invalid={Boolean(errors.whatsapp)}
                      aria-describedby={`${phoneHintId}${
                        errors.whatsapp ? ` ${phoneErrorId}` : ""
                      }`}
                      onBlur={() =>
                        setBlurError(
                          "whatsapp",
                          isValidInternationalPhone(phoneRaw)
                            ? undefined
                            : copy.handoff.whatsappError,
                        )
                      }
                      onChange={(event) => {
                        setPhoneRaw(event.target.value);
                        markEditing("whatsapp");
                      }}
                    />
                    <p className={styles.hint} id={phoneHintId}>
                      {copy.handoff.whatsappHint}
                    </p>
                    {errors.whatsapp && (
                      <p
                        className={styles.fieldError}
                        id={phoneErrorId}
                        role="alert"
                      >
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>
                )}

                <div className={styles.field}>
                  <label htmlFor={noteId}>{copy.handoff.noteLabel}</label>
                  <textarea
                    id={noteId}
                    name="note"
                    value={note}
                    maxLength={maximumNoteLength}
                    disabled={controlsLocked}
                    dir="auto"
                    rows={5}
                    aria-invalid={Boolean(errors.note)}
                    aria-describedby={`${noteHintId}${
                      errors.note ? ` ${noteErrorId}` : ""
                    }`}
                    onBlur={() => {
                      const error =
                        noteLength(note) > maximumNoteLength
                          ? copy.handoff.noteTooLong
                          : hasUnsupportedControlCharacters(note)
                            ? copy.handoff.noteInvalid
                            : undefined;
                      setBlurError("note", error);
                    }}
                    onChange={(event) => {
                      setNote(event.target.value);
                      markEditing("note");
                    }}
                  />
                  <div className={styles.noteMeta}>
                    <p className={styles.hint} id={noteHintId}>
                      {copy.handoff.noteHint}
                    </p>
                    <span>
                      {copy.handoff.noteCount(
                        noteLength(note),
                        maximumNoteLength,
                      )}
                    </span>
                  </div>
                  {note.trim().length > 0 && (
                    <p className={styles.noteAttached} role="status">
                      {copy.handoff.noteAttached}
                    </p>
                  )}
                  {errors.note && (
                    <p
                      className={styles.fieldError}
                      id={noteErrorId}
                      role="alert"
                    >
                      {errors.note}
                    </p>
                  )}
                </div>

                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor={`${idPrefix}-company`}>
                    Company website
                  </label>
                  <input
                    id={`${idPrefix}-company`}
                    name="companyWebsite"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    value={companyWebsite}
                    disabled={controlsLocked}
                    onChange={(event) =>
                      setCompanyWebsite(event.target.value)
                    }
                  />
                </div>

                <div className={styles.nextStep}>
                  <strong>{copy.handoff.nextTitle}</strong>
                  <p>{copy.handoff.nextBody}</p>
                </div>

                <div className={styles.privacy}>
                  <p>{copy.handoff.privacyBody}</p>
                  <a
                    href={privacyNoticeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.handoff.privacyLink}
                  </a>
                  <p>{copy.handoff.serviceBoundary}</p>
                </div>

                {status === "submitting" && (
                  <div className={styles.submittingStatus} role="status">
                    <LoaderCircle
                      aria-hidden="true"
                      className={styles.spinner}
                      size={18}
                    />
                    {copy.handoff.submitting}
                  </div>
                )}

                <button
                  className={styles.primaryAction}
                  type="submit"
                  disabled={
                    controlsLocked || status === "failed"
                  }
                >
                  {status === "submitting" && (
                    <LoaderCircle
                      aria-hidden="true"
                      className={styles.spinner}
                      size={18}
                    />
                  )}
                  {status === "submitting"
                    ? copy.handoff.submitting
                    : copy.handoff.submit}
                </button>
              </form>
            )}
        </div>
      </div>
    </section>
  );
}
