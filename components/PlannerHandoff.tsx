"use client";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  type DestinationPlan,
} from "../lib/destinationPlanner";
import {
  getDestinationNames,
  getDestinationPlannerCopy,
} from "../lib/destinationPlannerI18n";
import {
  currentDestinationInquiryFormVersion,
  currentPrivacyNoticeVersion,
  destinationInquirySchemaVersion,
} from "../lib/inquiryVersions";
import { handleHomegroundHashClick } from "../lib/homegroundNavigation";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import type { RouteServiceInterest } from "../lib/routeServiceInterest";
import type { RouteJourney } from "./RouteFinder";

const homegroundInquiryApiHostname =
  "xbymvlxethfzqcgyoieb.supabase.co";

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

type ContactMethod = "email" | "whatsapp";
type ValidationField =
  | "contact"
  | "email"
  | "phone"
  | "departureCountry"
  | "roughBudgetPerPerson"
  | "tripContext";
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
  replyChannel: ContactMethod;
  replyContact: string;
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
const maximumDepartureCountryLength = 80;
const maximumRoughBudgetLength = 100;
const maximumTripContextLength = 1_800;
const maximumRequestBytes = 16 * 1024;
const requestTimeoutMilliseconds = 20_000;

function createUuid(): string {
  if (typeof globalThis.crypto?.randomUUID !== "function") {
    throw new Error("Secure UUID generation is unavailable.");
  }

  return globalThis.crypto.randomUUID();
}

function hasUnsupportedControlCharacters(value: string): boolean {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069\uD800-\uDFFF]/u
    .test(value);
}

function stripUnsupportedControlCharacters(value: string): string {
  return value.replace(
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069\uD800-\uDFFF]/gu,
    "",
  );
}

function isValidEmail(value: string): boolean {
  const normalized = value.trim();
  return (
    normalized.length > 0 &&
    normalized.length <= maximumEmailLength &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(normalized)
  );
}

function normalizeWhatsAppNumber(value: string): string | null {
  const normalized = value.trim();
  if (
    normalized.length === 0 ||
    normalized.length > maximumPhoneLength ||
    !/^\+[0-9\s().-]+$/u.test(normalized)
  ) {
    return null;
  }
  const phoneE164 = `+${normalized.replace(/[^0-9]/gu, "")}`;
  return /^\+[1-9][0-9]{7,14}$/u.test(phoneE164) ? phoneE164 : null;
}

function isValidWhatsAppNumber(value: string): boolean {
  return normalizeWhatsAppNumber(value) !== null;
}

function maskEmail(value: string): string {
  const normalized = value.trim();
  const separatorIndex = normalized.lastIndexOf("@");
  if (separatorIndex <= 0 || separatorIndex === normalized.length - 1) {
    return "***";
  }

  const localPart = normalized.slice(0, separatorIndex);
  const domain = normalized.slice(separatorIndex + 1);
  return `${localPart.slice(0, 1)}***@${domain}`;
}

function maskPhone(value: string): string {
  const normalized = normalizeWhatsAppNumber(value);
  if (!normalized) return "+••••";
  return `+•••• ${normalized.slice(-4)}`;
}

function isValidDepartureCountry(value: string): boolean {
  return (
    Array.from(value.trim()).length <= maximumDepartureCountryLength &&
    !/[\r\n\t\u2028\u2029]/u.test(value) &&
    !hasUnsupportedControlCharacters(value)
  );
}

function isValidRoughBudget(value: string): boolean {
  return (
    Array.from(value.trim()).length <= maximumRoughBudgetLength &&
    !/[\r\n\t\u2028\u2029]/u.test(value) &&
    !hasUnsupportedControlCharacters(value)
  );
}

function isValidTripContext(value: string): boolean {
  return (
    Array.from(value.trim()).length <= maximumTripContextLength &&
    !hasUnsupportedControlCharacters(value)
  );
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
  serviceInterest = null,
  routeState = "current",
  onDirtyChange,
  onStatusChange,
}: {
  embedded?: boolean;
  locale: HomegroundLocale;
  match: DestinationPlan;
  journey?: RouteJourney;
  serviceInterest?: RouteServiceInterest | null;
  routeState?: HandoffRouteState;
  onDirtyChange?: (dirty: boolean) => void;
  onStatusChange?: (status: HandoffStatus) => void;
}) {
  const copy = getHomegroundCopy(locale);
  const plannerCopy = getDestinationPlannerCopy(locale);
  const apiUrl = trustedInquiryApiUrl(
    process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL?.trim() || "",
  );
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
  const whatsappIntakeEnabled =
    process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_INTAKE_ENABLED === "true";
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
  const whatsappIntakeReady =
    configurationReady && whatsappIntakeEnabled;

  const [status, setStatus] = useState<HandoffStatus>(
    configurationReady ? "idle" : "disabled",
  );
  const [contactMethod, setContactMethod] =
    useState<ContactMethod>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [departureCountry, setDepartureCountry] = useState("");
  const [roughBudgetPerPerson, setRoughBudgetPerPerson] =
    useState("");
  const [tripContext, setTripContext] = useState("");
  const [submittedChannel, setSubmittedChannel] =
    useState<ContactMethod>("email");
  const [submittedContact, setSubmittedContact] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [failureKind, setFailureKind] = useState<FailureKind | null>(null);
  const [failureOverride, setFailureOverride] = useState("");
  const [publicReference, setPublicReference] = useState("");
  const [previousSubmissionReference, setPreviousSubmissionReference] =
    useState("");
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
  const emailMethodId = `${contactGroupId}-email-method`;
  const whatsappMethodId = `${contactGroupId}-whatsapp-method`;
  const emailId = `${idPrefix}-email`;
  const phoneId = `${idPrefix}-phone`;
  const optionalDetailsHintId = `${idPrefix}-optional-details-hint`;
  const departureCountryId = `${idPrefix}-departure-country`;
  const roughBudgetId = `${idPrefix}-rough-budget`;
  const tripContextId = `${idPrefix}-trip-context`;
  const emailHintId = `${emailId}-hint`;
  const phoneHintId = `${phoneId}-hint`;
  const departureCountryHintId = `${departureCountryId}-hint`;
  const roughBudgetHintId = `${roughBudgetId}-hint`;
  const tripContextHintId = `${tripContextId}-hint`;
  const contactErrorId = `${contactGroupId}-error`;
  const emailErrorId = `${emailId}-error`;
  const phoneErrorId = `${phoneId}-error`;
  const departureCountryErrorId = `${departureCountryId}-error`;
  const roughBudgetErrorId = `${roughBudgetId}-error`;
  const tripContextErrorId = `${tripContextId}-error`;
  const routeReference = `${match.routeId}@${match.ruleVersion}`;
  const routeIdentity = JSON.stringify({
    journeyId: journey?.journeyId ?? null,
    revision: journey?.revision ?? null,
    routeId: match.routeId,
    ruleVersion: match.ruleVersion,
    answers: match.answers,
    serviceInterest: serviceInterest?.id ?? null,
  });

  if (!routeIdentityRef.current) {
    routeIdentityRef.current = routeIdentity;
  }

  const destinationNames = useMemo(
    () => getDestinationNames(match.answers.destinationIds, locale),
    [locale, match.answers.destinationIds],
  );
  const mustSeeNames = useMemo(
    () => getDestinationNames(match.answers.mustSeeIds, locale),
    [locale, match.answers.mustSeeIds],
  );
  const wishlistLabel = useMemo(() => {
    if (match.answers.destinationMode === "classic-start") {
      return plannerCopy.result.classicStartValue;
    }

    const values = [...destinationNames];
    if (match.answers.otherPlace) {
      values.push(
        `${plannerCopy.result.otherLabel}: ${match.answers.otherPlace}`,
      );
    }
    return values.join(", ");
  }, [
    destinationNames,
    match.answers.destinationMode,
    match.answers.otherPlace,
    plannerCopy.result.classicStartValue,
    plannerCopy.result.otherLabel,
  ]);
  const inquiryNote = useMemo(() => {
    if (!serviceInterest) return null;

    const noteParts = [serviceInterest.note];
    if (tripContext.trim()) {
      noteParts.push(`Traveller context:\n${tripContext.trim()}`);
    }
    return noteParts.join("\n\n");
  }, [serviceInterest, tripContext]);
  const briefLines = useMemo(() => {
    const lines = [
      `${plannerCopy.result.answerLabels.destinations}: ${wishlistLabel}`,
      `${plannerCopy.result.answerLabels.nights}: ${plannerCopy.result.nights(
        match.answers.totalNights,
      )}`,
      `${plannerCopy.result.answerLabels.party}: ${
        plannerCopy.partyLabels[match.answers.party]
      }`,
      `${plannerCopy.result.answerLabels.pace}: ${
        plannerCopy.paceLabels[match.answers.pace]
      }`,
      `${plannerCopy.result.timingTitle}: ${
        plannerCopy.result.titles[match.timing.status]
      }`,
    ];
    if (mustSeeNames.length > 0) {
      lines.push(
        `${plannerCopy.result.mustSeeTitle}: ${mustSeeNames.join(", ")}`,
      );
    }
    lines.push(plannerCopy.result.boundary);
    if (inquiryNote) lines.push("", inquiryNote);
    return lines;
  }, [
    inquiryNote,
    match.answers.pace,
    match.answers.party,
    match.answers.totalNights,
    match.timing.status,
    mustSeeNames,
    plannerCopy,
    wishlistLabel,
  ]);
  const briefText = useMemo(
    () => briefLines.join("\n"),
    [briefLines],
  );
  const fallbackMailto = useMemo(() => {
    if (!brandEmailReady) return "";

    const subject = serviceInterest
      ? `Homeground China — ${serviceInterest.label}`
      : `Homeground China — ${plannerCopy.result.answersTitle}`;
    return `mailto:${brandEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefText)}`;
  }, [
    brandEmail,
    brandEmailReady,
    briefText,
    plannerCopy.result.answersTitle,
    serviceInterest,
  ]);
  const formIsDirty =
    email.trim().length > 0 ||
    phone.trim().length > 0 ||
    departureCountry.trim().length > 0 ||
    roughBudgetPerPerson.trim().length > 0 ||
    tripContext.trim().length > 0;
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

  const changeContactMethod = (method: ContactMethod) => {
    if (
      status === "submitting" ||
      status === "uncertain" ||
      status === "success" ||
      status === "disabled"
    ) {
      return;
    }

    setContactMethod(method);
    setErrors((current) => {
      const next = { ...current };
      delete next.contact;
      delete next.email;
      delete next.phone;
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

    if (contactMethod === "email" && !isValidEmail(email)) {
      nextErrors.email = copy.handoff.emailError;
    } else if (
      contactMethod === "whatsapp" &&
      !isValidWhatsAppNumber(phone)
    ) {
      nextErrors.phone = copy.handoff.whatsappError;
    }

    if (!isValidDepartureCountry(departureCountry)) {
      nextErrors.departureCountry =
        copy.handoff.departureCountryError;
    }
    if (!isValidRoughBudget(roughBudgetPerPerson)) {
      nextErrors.roughBudgetPerPerson =
        copy.handoff.roughBudgetError;
    }
    if (serviceInterest && !isValidTripContext(tripContext)) {
      nextErrors.tripContext =
        "Keep this note under 1,800 characters and remove unsupported control characters.";
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
    if (!serviceInterest) {
      for (const [queryKey, payloadKey] of attributionFields) {
        const value = stripUnsupportedControlCharacters(
          search.get(queryKey) ?? "",
        ).trim();
        if (value) attribution[payloadKey] = value.slice(0, 100);
      }
    }

    return {
      schemaVersion: destinationInquirySchemaVersion,
      formVersion: currentDestinationInquiryFormVersion,
      entryPath: "destination_timing",
      locale,
      journey: {
        ...currentJourney(),
        answers: match.answers,
        routeId: match.routeId,
        ruleVersion: match.ruleVersion,
      },
      contact:
        contactMethod === "email"
          ? {
              channel: "email",
              email: email.trim(),
            }
          : {
              channel: "whatsapp",
              phoneRaw: phone.trim(),
            },
      departureCountry: departureCountry.trim() || null,
      roughBudgetPerPerson:
        roughBudgetPerPerson.trim() || null,
      note: inquiryNote,
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
        nextErrors.phone = copy.handoff.whatsappError;
      }
      if (fields["contact.channel"]) {
        nextErrors.contact = copy.handoff.whatsappUnavailable;
      }
      if (fields.departureCountry) {
        nextErrors.departureCountry =
          copy.handoff.departureCountryError;
      }
      if (fields.roughBudgetPerPerson) {
        nextErrors.roughBudgetPerPerson =
          copy.handoff.roughBudgetError;
      }
      if (fields.note && serviceInterest) {
        nextErrors.tripContext =
          "Check the trip context and remove unsupported characters.";
      }
    }
    if (Object.keys(nextErrors).length === 0) {
      if (contactMethod === "whatsapp") {
        nextErrors.phone = copy.handoff.whatsappError;
      } else {
        nextErrors.email = copy.handoff.emailError;
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
          setSubmittedChannel(snapshot.replyChannel);
          setSubmittedContact(snapshot.replyContact);
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
              replyChannel: contactMethod,
              replyContact:
                contactMethod === "email"
                  ? email.trim()
                  : phone.trim(),
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
    contact:
      contactMethod === "email" ? emailMethodId : whatsappMethodId,
    email: emailId,
    phone: phoneId,
    departureCountry: departureCountryId,
    roughBudgetPerPerson: roughBudgetId,
    tripContext: tripContextId,
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
          {embedded ? (
            <h3
              id="planner-handoff-title"
              ref={headingRef}
              tabIndex={-1}
            >
              {copy.handoff.title}
            </h3>
          ) : (
            <h2
              id="planner-handoff-title"
              ref={headingRef}
              tabIndex={-1}
            >
              {copy.handoff.title}
            </h2>
          )}
          <p className={styles.body}>{copy.handoff.body}</p>
          <p className={styles.boundary}>{copy.handoff.boundary}</p>
          {serviceInterest && (
            <aside
              className={styles.serviceIntent}
              aria-label="Selected Homeground planning service"
            >
              <span>Service requested</span>
              <strong>
                {serviceInterest.label} · {serviceInterest.priceLabel}
              </strong>
              <p>{serviceInterest.handoffSummary}</p>
            </aside>
          )}
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
              <p>
                {copy.handoff.successReplyContact(
                  submittedChannel === "email" ? "Email" : "WhatsApp",
                  submittedChannel === "email"
                    ? maskEmail(submittedContact)
                    : maskPhone(submittedContact),
                  replySla,
                )}
              </p>
              <p className={styles.publicReference}>
                {copy.handoff.successReference(publicReference)}
              </p>
              <a
                className={styles.routeLink}
                href="#route-finder"
                onClick={(event) =>
                  handleHomegroundHashClick(event, "#route-finder")
                }
              >
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

                {(whatsappIntakeReady || errors.contact) && (
                  <div
                    id={contactGroupId}
                    className={styles.contactMethodRegion}
                  >
                    {whatsappIntakeReady && (
                      <fieldset
                        className={styles.contactMethodGroup}
                        disabled={controlsLocked}
                        aria-describedby={
                          errors.contact ? contactErrorId : undefined
                        }
                      >
                        <legend
                          className={styles.contactMethodLegend}
                        >
                          {copy.handoff.contactMethodLabel}
                        </legend>
                        <div
                          className={styles.contactMethodOptions}
                        >
                          <label
                            className={styles.contactMethodOption}
                            data-selected={
                              contactMethod === "email"
                            }
                            data-disabled={controlsLocked}
                          >
                            <input
                              id={emailMethodId}
                              className={styles.contactMethodRadio}
                              type="radio"
                              name="contactMethod"
                              value="email"
                              checked={contactMethod === "email"}
                              onChange={() =>
                                changeContactMethod("email")
                              }
                            />
                            <span>{copy.handoff.emailOption}</span>
                          </label>
                          <label
                            className={styles.contactMethodOption}
                            data-selected={
                              contactMethod === "whatsapp"
                            }
                            data-disabled={controlsLocked}
                          >
                            <input
                              id={whatsappMethodId}
                              className={styles.contactMethodRadio}
                              type="radio"
                              name="contactMethod"
                              value="whatsapp"
                              checked={contactMethod === "whatsapp"}
                              onChange={() =>
                                changeContactMethod("whatsapp")
                              }
                            />
                            <span>
                              {copy.handoff.whatsappOption}
                            </span>
                          </label>
                        </div>
                      </fieldset>
                    )}
                    {errors.contact && (
                      <p
                        className={styles.fieldError}
                        id={contactErrorId}
                        role="alert"
                      >
                        {errors.contact}
                      </p>
                    )}
                  </div>
                )}

                {contactMethod === "email" ? (
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
                      name="whatsapp"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      dir="ltr"
                      maxLength={maximumPhoneLength}
                      required
                      value={phone}
                      disabled={controlsLocked}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={`${phoneHintId}${
                        errors.phone ? ` ${phoneErrorId}` : ""
                      }`}
                      onBlur={() =>
                        setBlurError(
                          "phone",
                          isValidWhatsAppNumber(phone)
                            ? undefined
                            : copy.handoff.whatsappError,
                        )
                      }
                      onChange={(event) => {
                        setPhone(event.target.value);
                        markEditing("phone");
                      }}
                    />
                    <p className={styles.hint} id={phoneHintId}>
                      {copy.handoff.whatsappHint}
                    </p>
                    <p className={styles.whatsappConsent}>
                      {copy.handoff.whatsappConsent}
                    </p>
                    {errors.phone && (
                      <p
                        className={styles.fieldError}
                        id={phoneErrorId}
                        role="alert"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                )}

                {serviceInterest && (
                  <div className={styles.field}>
                    <label htmlFor={tripContextId}>
                      Route outline or important constraints{" "}
                      <span className={styles.optionalTag}>Optional</span>
                    </label>
                    <textarea
                      id={tripContextId}
                      name="tripContext"
                      dir="auto"
                      maxLength={maximumTripContextLength}
                      rows={5}
                      value={tripContext}
                      disabled={controlsLocked}
                      aria-invalid={Boolean(errors.tripContext)}
                      aria-describedby={`${tripContextHintId}${
                        errors.tripContext ? ` ${tripContextErrorId}` : ""
                      }`}
                      onBlur={() =>
                        setBlurError(
                          "tripContext",
                          isValidTripContext(tripContext)
                            ? undefined
                            : "Keep this note under 1,800 characters and remove unsupported control characters.",
                        )
                      }
                      onChange={(event) => {
                        setTripContext(event.target.value);
                        markEditing("tripContext");
                      }}
                    />
                    <p className={styles.hint} id={tripContextHintId}>
                      Paste a concise day-by-day outline or a shareable route
                      link. Do not include passport or ID images, payment
                      details, QR codes or unredacted booking references. We
                      can request the full file after the fit check.
                    </p>
                    {errors.tripContext && (
                      <p
                        className={styles.fieldError}
                        id={tripContextErrorId}
                        role="alert"
                      >
                        {errors.tripContext}
                      </p>
                    )}
                  </div>
                )}

                <fieldset
                  className={styles.optionalDetails}
                  aria-describedby={optionalDetailsHintId}
                >
                  <legend className={styles.optionalDetailsLegend}>
                    {copy.handoff.optionalDetailsLabel}
                  </legend>
                  <p
                    className={styles.optionalDetailsHint}
                    id={optionalDetailsHintId}
                  >
                    {copy.handoff.optionalDetailsHint}
                  </p>

                  <div className={styles.field}>
                    <label htmlFor={departureCountryId}>
                      {copy.handoff.departureCountryLabel}
                    </label>
                    <input
                      id={departureCountryId}
                      name="departureCountry"
                      type="text"
                      autoComplete="country-name"
                      dir="auto"
                      maxLength={maximumDepartureCountryLength}
                      value={departureCountry}
                      disabled={controlsLocked}
                      aria-invalid={Boolean(errors.departureCountry)}
                      aria-describedby={`${departureCountryHintId}${
                        errors.departureCountry
                          ? ` ${departureCountryErrorId}`
                          : ""
                      }`}
                      onBlur={() =>
                        setBlurError(
                          "departureCountry",
                          isValidDepartureCountry(departureCountry)
                            ? undefined
                            : copy.handoff.departureCountryError,
                        )
                      }
                      onChange={(event) => {
                        setDepartureCountry(event.target.value);
                        markEditing("departureCountry");
                      }}
                    />
                    <p className={styles.hint} id={departureCountryHintId}>
                      {copy.handoff.departureCountryHint}
                    </p>
                    {errors.departureCountry && (
                      <p
                        className={styles.fieldError}
                        id={departureCountryErrorId}
                        role="alert"
                      >
                        {errors.departureCountry}
                      </p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor={roughBudgetId}>
                      {copy.handoff.roughBudgetLabel}
                    </label>
                    <input
                      id={roughBudgetId}
                      name="roughBudgetPerPerson"
                      type="text"
                      autoComplete="off"
                      dir="auto"
                      maxLength={maximumRoughBudgetLength}
                      placeholder={copy.handoff.roughBudgetPlaceholder}
                      value={roughBudgetPerPerson}
                      disabled={controlsLocked}
                      aria-invalid={Boolean(
                        errors.roughBudgetPerPerson,
                      )}
                      aria-describedby={`${roughBudgetHintId}${
                        errors.roughBudgetPerPerson
                          ? ` ${roughBudgetErrorId}`
                          : ""
                      }`}
                      onBlur={() =>
                        setBlurError(
                          "roughBudgetPerPerson",
                          isValidRoughBudget(roughBudgetPerPerson)
                            ? undefined
                            : copy.handoff.roughBudgetError,
                        )
                      }
                      onChange={(event) => {
                        setRoughBudgetPerPerson(event.target.value);
                        markEditing("roughBudgetPerPerson");
                      }}
                    />
                    <p className={styles.hint} id={roughBudgetHintId}>
                      {copy.handoff.roughBudgetHint}
                    </p>
                    {errors.roughBudgetPerPerson && (
                      <p
                        className={styles.fieldError}
                        id={roughBudgetErrorId}
                        role="alert"
                      >
                        {errors.roughBudgetPerPerson}
                      </p>
                    )}
                  </div>
                </fieldset>

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

                <div className={styles.privacy}>
                  <p>{copy.handoff.privacyBody}</p>
                  <a
                    href={privacyNoticeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.handoff.privacyLink}
                  </a>
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
                  disabled={controlsLocked || status === "failed"}
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
