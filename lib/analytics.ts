import { analyticsRuntimeIsAllowed, subscribeAnalyticsRuntime } from "./analyticsRuntime";
import {
  analyticsConsentVersion,
  hasAnalyticsConsent,
  hasMarketingConsent,
  readAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "./analyticsConsent";
import {
  googleMeasurementLocationIsSafe,
  metaMeasurementLocationIsSafe,
} from "./analyticsLocation";
import { getPrivateTourInquiryContextFromSearchParams, getPrivateTourInquirySelection, isPrivateTourInquirySlug } from "./privateTourInquiryContext";

export const ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED === "true";

const configuredGaMeasurementId =
  process.env.NEXT_PUBLIC_HOMEGROUND_GA4_MEASUREMENT_ID?.trim() ?? "";
const configuredMetaPixelId =
  process.env.NEXT_PUBLIC_HOMEGROUND_META_PIXEL_ID?.trim() ?? "";
const configuredWebEventsUrl =
  process.env.NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL?.trim() ?? "";

const gaMeasurementIdPattern = /^G-[A-Z0-9]{6,20}$/u;
const metaPixelIdPattern = /^[0-9]{5,32}$/u;

export const GA_MEASUREMENT_ID = gaMeasurementIdPattern.test(
  configuredGaMeasurementId,
)
  ? configuredGaMeasurementId
  : "";
export const META_PIXEL_ID = metaPixelIdPattern.test(configuredMetaPixelId)
  ? configuredMetaPixelId
  : "";
export const webEventsContract = "homeground-traffic-events.v2" as const;
const trafficSessionStartRequestType = "start_session" as const;
const trafficEventBatchRequestType = "events" as const;

function trustedWebEventsUrl(value: string) {
  if (!value) return "";
  try {
    const parsed = new URL(value);
    const localDevelopment =
      parsed.protocol === "http:" &&
      (parsed.hostname === "localhost" ||
        parsed.hostname === "127.0.0.1");
    if (
      (parsed.protocol !== "https:" && !localDevelopment) ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash
    ) {
      return "";
    }
    return parsed.toString();
  } catch {
    return "";
  }
}

export const WEB_EVENTS_URL = trustedWebEventsUrl(configuredWebEventsUrl);

export type HomegroundEventName =
  | "page_view"
  | "guide_cta_clicked"
  | "linkable_asset_download_clicked"
  | "linkable_asset_citation_copied"
  | "guide_search_opened"
  | "guide_search_submitted"
  | "guide_search_result_clicked"
  | "guide_search_no_results"
  | "homepage_guide_card_clicked"
  | "homepage_product_card_clicked"
  | "navigation_clicked"
  | "tour_catalog_product_clicked"
  | "planning_intent_selected"
  | "planner_started"
  | "planner_step_completed"
  | "planner_result_viewed"
  | "planner_result_revised"
  | "conversation_brief_ready_viewed"
  | "paid_brief_ready_viewed"
  | "contact_options_viewed"
  | "contact_option_clicked"
  | "quick_email_started"
  | "product_selection_changed"
  | "contact_channel_selected"
  | "enquiry_submit_attempted"
  | "enquiry_submit_uncertain"
  | "enquiry_submit_failed"
  | "enquiry_submitted";

export type EventParameters = Record<
  string,
  string | number | boolean | undefined
>;

type HomegroundLocale = "en" | "zh" | "ko";
type FirstPartyEventType =
  | "page_view"
  | "contact_options_viewed"
  | "contact_channel_clicked"
  | "email_form_started"
  | "product_selection_changed"
  | "contact_channel_selected"
  | "enquiry_submit_attempted"
  | "enquiry_submit_failed"
  | "enquiry_submit_uncertain";
type ContactActionCode = "email" | "whatsapp" | "messenger";

type Gtag = (...args: unknown[]) => void;
type MetaPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  disablePushState?: boolean;
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
  fbq?: MetaPixel;
  _fbq?: MetaPixel;
  homegroundGaInitialized?: boolean;
  homegroundMetaInitialized?: boolean;
};

const allowedParameterKeys = new Set([
  "page_path",
  "page_language",
  "page_type",
  "guide_id",
  "product_slug",
  "product_position",
  "navigation_item",
  "navigation_surface",
  "search_surface",
  "query_length",
  "result_position",
  "result_count",
  "content_category",
  "content_kind",
  "cta_position",
  "cta_target",
  "planning_intent",
  "planning_starter_intent",
  "step",
  "question",
  "channel",
  "contact_variant",
  "reply_channel",
  "service_interest",
  "submission_surface",
  "form_version",
  "error_code",
]);
const safeControlledValuePattern = /^[A-Za-z0-9._/-]{1,100}$/u;
const controlledPathPattern = /^\/[A-Za-z0-9/_-]*$/u;
const controlledUtmPattern =
  /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/u;
const internalUtmMediums = new Set([
  "owned",
  "organic-content",
  "guide",
  "website",
]);
const attributionStorageKey = "homeground-entry-attribution";
const analyticsSessionStorageKey = "homeground-analytics-session";
const trafficCredentialStorageKey =
  "homeground-traffic-session-credential";
const hmacSha256Pattern = /^[0-9a-f]{64}$/u;
const sessionCredentialPattern =
  /^v1\.[0-9]{10}\.[0-9a-f]{64}$/u;
const retryAfterMinimumSeconds = 1;
const retryAfterMaximumSeconds = 86_400;
const serviceUnavailableSuppressionMilliseconds = 30_000;
let trafficCredentialRequest: {
  key: string;
  promise: Promise<TrafficSessionCredential | null>;
} | null = null;
let firstPartyNextAttemptAt = 0;
let analyticsConsentGeneration = 0;
let analyticsConsentObserverInstalled = false;

export interface EntryAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  attribution_signature?: string;
  landing_path?: string;
}

interface TrafficSessionCredential {
  credential: string;
  expiresAt: number;
  sessionToken: string;
  context: string;
  consentUpdatedAt: string;
}

interface AnalyticsConsentState {
  generation: number;
  updatedAt: string;
}

function sanitizePagePath(value: unknown) {
  if (typeof value !== "string") return "/";
  const normalized = value.normalize("NFC").trim();
  const path =
    normalized === "/" || normalized.endsWith("/")
      ? normalized
      : `${normalized}/`;
  if (
    path.length > 180 ||
    !controlledPathPattern.test(path) ||
    path.includes("//") ||
    path.includes("..")
  ) {
    return "/other/";
  }
  return path;
}

function sanitizeControlledValue(value: unknown) {
  if (typeof value !== "string") return undefined;
  const normalized = value.normalize("NFC").trim();
  return safeControlledValuePattern.test(normalized)
    ? normalized
    : undefined;
}

function sanitizeEventParameters(parameters: EventParameters) {
  const sanitized: Record<string, string | number | boolean> = {};

  Object.entries(parameters).forEach(([key, value]) => {
    if (!allowedParameterKeys.has(key) || value === undefined) return;

    if (key === "page_path") {
      sanitized[key] = sanitizePagePath(value);
      return;
    }
    if (key === "cta_target") {
      if (value === "private_tour" || value === "planner" || value === "other") {
        sanitized[key] = value;
      }
      return;
    }
    if (typeof value === "string") {
      const controlled = sanitizeControlledValue(value);
      if (controlled) sanitized[key] = controlled;
      return;
    }
    if (typeof value === "boolean") {
      sanitized[key] = value;
      return;
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      sanitized[key] = Math.max(-1_000_000, Math.min(1_000_000, value));
    }
  });

  return sanitized;
}

function googleEventParameters(
  parameters: Record<string, string | number | boolean>,
) {
  const safeLocation = `${window.location.origin}${sanitizePagePath(
    window.location.pathname,
  )}`;
  let safeReferrer = "";
  try {
    if (document.referrer) {
      const referrer = new URL(document.referrer);
      if (referrer.protocol === "https:" || referrer.protocol === "http:") {
        safeReferrer = referrer.origin;
      }
    }
  } catch {
    // An invalid or unavailable referrer is represented as no referrer.
  }
  return {
    ...parameters,
    // Never let GA derive query or fragment values from the browser address
    // bar or referrer, including initial loads and SPA history navigation.
    page_location: safeLocation,
    page_referrer: safeReferrer,
  };
}

function sanitizeAttributionValue(
  value: unknown,
  maximumLength: number,
) {
  if (typeof value !== "string") return undefined;
  const normalized = value.normalize("NFKC").trim().toLowerCase();
  return normalized.length <= maximumLength &&
    controlledUtmPattern.test(normalized)
    ? normalized
    : undefined;
}

function normalizeAttribution(value: unknown): EntryAttribution {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const candidate = value as Record<string, unknown>;
  const attribution: EntryAttribution = {};

  if (candidate.landing_path) {
    attribution.landing_path = sanitizePagePath(candidate.landing_path);
  }
  const medium = sanitizeAttributionValue(candidate.utm_medium, 64);
  if (medium && !internalUtmMediums.has(medium)) {
    attribution.utm_medium = medium;
    for (const key of [
      "utm_source",
      "utm_campaign",
      "utm_content",
    ] as const) {
      const maximumLength = key === "utm_source" ? 64 : 96;
      const normalized = sanitizeAttributionValue(
        candidate[key],
        maximumLength,
      );
      if (normalized) attribution[key] = normalized;
    }
    if (
      typeof candidate.attribution_signature === "string" &&
      hmacSha256Pattern.test(candidate.attribution_signature)
    ) {
      attribution.attribution_signature =
        candidate.attribution_signature.toLowerCase();
    }
  }
  return attribution;
}

export function captureEntryAttribution() {
  if (
    !ANALYTICS_ENABLED ||
    !analyticsRuntimeIsAllowed() ||
    !hasAnalyticsConsent() ||
    typeof window === "undefined"
  ) {
    return;
  }

  try {
    const existing = window.sessionStorage.getItem(attributionStorageKey);
    if (existing) return;

    const params = new URLSearchParams(window.location.search);
    const attribution: EntryAttribution = {
      landing_path: sanitizePagePath(window.location.pathname),
    };
    const medium = sanitizeAttributionValue(
      params.get("utm_medium"),
      64,
    );
    // Links between Homeground pages use these media labels for content
    // navigation. If consent is granted only after such a click, treating
    // them as first-touch acquisition would overwrite the real source with
    // Homeground itself. Keep the source Unknown instead.
    if (medium && !internalUtmMediums.has(medium)) {
      attribution.utm_medium = medium;
      for (const key of [
        "utm_source",
        "utm_campaign",
        "utm_content",
      ] as const) {
        const maximumLength = key === "utm_source" ? 64 : 96;
        const value = sanitizeAttributionValue(
          params.get(key),
          maximumLength,
        );
        if (value) attribution[key] = value;
      }
      const signature = params
        .get("hg_attribution_sig")
        ?.trim()
        .toLowerCase();
      if (signature && hmacSha256Pattern.test(signature)) {
        attribution.attribution_signature = signature;
      }
    }
    window.sessionStorage.setItem(
      attributionStorageKey,
      JSON.stringify(attribution),
    );
  } catch {
    // Optional reporting must never block the traveller-facing experience.
  }
}

export function readEntryAttribution(): EntryAttribution {
  if (
    !ANALYTICS_ENABLED ||
    !analyticsRuntimeIsAllowed() ||
    !hasAnalyticsConsent() ||
    typeof window === "undefined"
  ) {
    return {};
  }

  try {
    const raw = window.sessionStorage.getItem(attributionStorageKey);
    if (!raw) return {};
    return normalizeAttribution(JSON.parse(raw) as unknown);
  } catch {
    return {};
  }
}

export function removeAttributionParametersFromAddressBar() {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    let changed = false;
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "hg_attribution_sig",
      "fbclid",
      "gclid",
      "dclid",
      "gbraid",
      "wbraid",
      "msclkid",
    ]) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        changed = true;
      }
    }
    if (!changed) return;
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  } catch {
    // URL cleanup is optional and must not affect navigation.
  }
}

export function clearAnalyticsSessionState() {
  if (typeof window === "undefined") return;
  trafficCredentialRequest = null;
  clearTrafficQueue();
  try {
    window.sessionStorage.removeItem(attributionStorageKey);
    window.sessionStorage.removeItem(analyticsSessionStorageKey);
    window.sessionStorage.removeItem(trafficCredentialStorageKey);
    window.sessionStorage.removeItem("homeground-traffic-client-sequence");
  } catch {
    // Optional reporting state must not interfere with the public experience.
  }
}

function ensureAnalyticsConsentObserver() {
  if (
    typeof window === "undefined" ||
    analyticsConsentObserverInstalled
  ) {
    return;
  }
  analyticsConsentObserverInstalled = true;
  subscribeAnalyticsRuntime(() => {
    if (!analyticsRuntimeIsAllowed()) {
      analyticsConsentGeneration += 1;
      clearAnalyticsSessionState();
      disableGoogleAnalytics();
      disableMetaPixel();
    }
  });
  subscribeAnalyticsConsent((preferences) => {
    // A marketing-only choice keeps the existing analytics permission valid.
    // Withdrawal (including an invalid/obsolete notice) ends this generation,
    // so subsequent consent can never revive its queued events.
    if (!preferences?.analytics) {
      analyticsConsentGeneration += 1;
      clearAnalyticsSessionState();
    }
  });
}

function currentAnalyticsConsentState(): AnalyticsConsentState | null {
  const preferences = readAnalyticsConsent();
  if (!preferences?.analytics) return null;
  return {
    generation: analyticsConsentGeneration,
    updatedAt: preferences.updatedAt,
  };
}

function analyticsConsentRemains(
  expected: AnalyticsConsentState,
) {
  const current = readAnalyticsConsent();
  return Boolean(
    analyticsRuntimeIsAllowed() && current?.analytics &&
      analyticsConsentGeneration === expected.generation,
  );
}

function firstPartyAttemptIsSuppressed() {
  return Date.now() < firstPartyNextAttemptAt;
}

function retryAfterDelayMilliseconds(response: Response) {
  const value = response.headers.get("Retry-After")?.trim();
  let seconds = Number.NaN;
  if (value && /^\d+$/u.test(value)) {
    const parsed = Number(value);
    seconds = Number.isFinite(parsed)
      ? parsed
      : retryAfterMaximumSeconds;
  } else if (value) {
    const timestamp = Date.parse(value);
    if (Number.isFinite(timestamp)) {
      seconds = Math.ceil((timestamp - Date.now()) / 1_000);
    }
  }
  if (!Number.isFinite(seconds)) seconds = retryAfterMinimumSeconds;
  return (
    Math.max(
      retryAfterMinimumSeconds,
      Math.min(retryAfterMaximumSeconds, Math.ceil(seconds)),
    ) * 1_000
  );
}

function applyFirstPartyResponseSuppression(response: Response) {
  const delay =
    response.status === 429
      ? retryAfterDelayMilliseconds(response)
      : response.status === 503
        ? Math.max(serviceUnavailableSuppressionMilliseconds, response.headers.has("Retry-After") ? retryAfterDelayMilliseconds(response) : 0)
        : 0;
  if (!delay) return;
  firstPartyNextAttemptAt = Math.max(
    firstPartyNextAttemptAt,
    Date.now() + delay,
  );
}

async function discardResponseBody(response: Response) {
  try {
    await response.body?.cancel();
  } catch {
    // A response-body cleanup failure must not create another request.
  }
}

function clearRejectedTrafficSessionCredential(
  rejectedCredential: string,
) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.sessionStorage.getItem(
      trafficCredentialStorageKey,
    );
    if (!raw) return;
    const stored = JSON.parse(raw) as Record<string, unknown>;
    if (stored.credential === rejectedCredential) {
      window.sessionStorage.removeItem(trafficCredentialStorageKey);
    }
  } catch {
    // Optional reporting state must not interfere with the public experience.
  }
}

function analyticsSessionToken() {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.sessionStorage.getItem(
      analyticsSessionStorageKey,
    );
    if (
      existing &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(
        existing,
      )
    ) {
      return existing.toLowerCase();
    }
    const next = window.crypto.randomUUID();
    window.sessionStorage.setItem(analyticsSessionStorageKey, next);
    return next;
  } catch {
    return "";
  }
}

export function getTrafficSessionToken() {
  ensureAnalyticsConsentObserver();
  if (
    !ANALYTICS_ENABLED ||
    !analyticsRuntimeIsAllowed() ||
    !WEB_EVENTS_URL ||
    !hasAnalyticsConsent() ||
    typeof window === "undefined"
  ) {
    return undefined;
  }
  const token = analyticsSessionToken();
  return token || undefined;
}

function ensureGtagQueue() {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.gtag ??= function gtag(..._args: unknown[]) {
    // gtag.js consumes the array-like Arguments object used by its official
    // bootstrap. A rest-parameter Array looks similar but is not equivalent.
    analyticsWindow.dataLayer?.push(arguments);
  };
  return analyticsWindow.gtag;
}

export function initializeGoogleAnalytics() {
  ensureAnalyticsConsentObserver();
  if (
    !ANALYTICS_ENABLED ||
    !analyticsRuntimeIsAllowed() ||
    !GA_MEASUREMENT_ID ||
    !hasAnalyticsConsent() ||
    !googleMeasurementLocationIsSafe() ||
    typeof window === "undefined"
  ) {
    return false;
  }

  const analyticsWindow = window as AnalyticsWindow;
  (
    analyticsWindow as unknown as Record<string, unknown>
  )[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  const gtag = ensureGtagQueue();
  // Also override vendor defaults before initialization/restoration so
  // automatic events cannot inherit navigation queries or referrer text.
  gtag("set", googleEventParameters({}));
  if (analyticsWindow.homegroundGaInitialized) {
    gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    return true;
  }

  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...googleCampaignConfiguration(),
  });
  analyticsWindow.homegroundGaInitialized = true;
  return true;
}

export function disableGoogleAnalytics() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  const analyticsWindow = window as AnalyticsWindow;
  (
    analyticsWindow as unknown as Record<string, unknown>
  )[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  analyticsWindow.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function ensureMetaQueue() {
  const analyticsWindow = window as AnalyticsWindow;
  if (analyticsWindow.fbq) return analyticsWindow.fbq;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  }) as MetaPixel;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  // Meta's supported SPA opt-out must exist before fbevents.js loads so the
  // vendor cannot install automatic pushState/replaceState PageViews. The
  // site sends one consent-gated, query-free PageView itself instead.
  fbq.disablePushState = true;
  analyticsWindow.fbq = fbq;
  analyticsWindow._fbq = fbq;
  return fbq;
}

export function initializeMetaPixel() {
  ensureAnalyticsConsentObserver();
  if (
    !ANALYTICS_ENABLED ||
    !analyticsRuntimeIsAllowed() ||
    !META_PIXEL_ID ||
    !hasMarketingConsent() ||
    !metaMeasurementLocationIsSafe() ||
    typeof window === "undefined"
  ) {
    return false;
  }

  const analyticsWindow = window as AnalyticsWindow;
  const fbq = ensureMetaQueue();
  fbq.disablePushState = true;
  fbq("set", "autoConfig", false, META_PIXEL_ID);
  fbq("consent", "grant");
  if (!analyticsWindow.homegroundMetaInitialized) {
    fbq("init", META_PIXEL_ID);
    analyticsWindow.homegroundMetaInitialized = true;
  }
  return true;
}

export function disableMetaPixel() {
  if (typeof window === "undefined") return;
  (window as AnalyticsWindow).fbq?.("consent", "revoke");
}

function pageLocale(
  parameters: Record<string, string | number | boolean>,
): HomegroundLocale {
  const requested = parameters.page_language;
  if (requested === "en" || requested === "zh" || requested === "ko") {
    return requested;
  }
  if (window.location.pathname.startsWith("/zh/")) return "zh";
  if (window.location.pathname.startsWith("/ko/")) return "ko";
  return "en";
}

function firstPartyEvent(
  name: HomegroundEventName,
  parameters: Record<string, string | number | boolean>,
): { type: FirstPartyEventType; actionCode: ContactActionCode | null } | null {
  if (name === "product_selection_changed" || name === "enquiry_submit_attempted" || name === "enquiry_submit_failed" || name === "enquiry_submit_uncertain") {
    return { type: name, actionCode: null };
  }
  if (name === "page_view" || name === "contact_options_viewed") {
    return { type: name, actionCode: null };
  }
  if (name === "quick_email_started") {
    return { type: "email_form_started", actionCode: null };
  }
  if (name === "contact_option_clicked" || name === "contact_channel_selected") {
    const channel = parameters.channel;
    if (
      channel === "email" ||
      channel === "whatsapp" ||
      channel === "messenger"
    ) {
      return {
        type: name === "contact_channel_selected" ? name : "contact_channel_clicked",
        actionCode: channel,
      };
    }
  }
  return null;
}

function trafficAttributionPayload(attribution: EntryAttribution) {
  return {
    utmSource: attribution.utm_source ?? null,
    utmMedium: attribution.utm_medium ?? null,
    utmCampaign: attribution.utm_campaign ?? null,
    utmContent: attribution.utm_content ?? null,
  };
}

function trafficCredentialContext({
  locale,
  entryPath,
  attribution,
}: {
  locale: HomegroundLocale;
  entryPath: string;
  attribution: EntryAttribution;
}) {
  return JSON.stringify({
    locale,
    entryPath,
    attribution: trafficAttributionPayload(attribution),
    attributionSignature:
      attribution.attribution_signature ?? null,
  });
}

function readTrafficSessionCredential({
  sessionToken,
  context,
  consentUpdatedAt,
}: {
  sessionToken: string;
  context: string;
  consentUpdatedAt: string;
}): TrafficSessionCredential | null {
  try {
    const raw = window.sessionStorage.getItem(
      trafficCredentialStorageKey,
    );
    if (!raw) return null;
    const candidate = JSON.parse(raw) as Partial<TrafficSessionCredential>;
    if (
      typeof candidate.credential !== "string" ||
      !sessionCredentialPattern.test(candidate.credential) ||
      typeof candidate.expiresAt !== "number" ||
      !Number.isSafeInteger(candidate.expiresAt) ||
      candidate.expiresAt <= Date.now() + 30_000 ||
      candidate.sessionToken !== sessionToken ||
      candidate.context !== context ||
      candidate.consentUpdatedAt !== consentUpdatedAt
    ) {
      window.sessionStorage.removeItem(
        trafficCredentialStorageKey,
      );
      return null;
    }
    return candidate as TrafficSessionCredential;
  } catch {
    return null;
  }
}

const activeTrafficRequests = new Set<AbortController>();

async function fetchTraffic(payload: Record<string, unknown>) {
  const controller = new AbortController();
  activeTrafficRequests.add(controller);
  let rejectAborted: () => void = () => undefined;
  const aborted = new Promise<never>((_resolve, reject) => {
    rejectAborted = () => reject(new DOMException("Traffic request aborted", "AbortError"));
    controller.signal.addEventListener("abort", rejectAborted, { once: true });
  });
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await Promise.race([fetch(WEB_EVENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
      keepalive: true,
      mode: "cors",
      referrerPolicy: "no-referrer",
      signal: controller.signal,
    }), aborted]);
    // Honor response-header backoff even if its body later stalls or fails.
    applyFirstPartyResponseSuppression(response);
    // Keep both timeout and withdrawal cancellation active until the body is
    // consumed. A response that stalls after its headers must not hold the
    // serial queue forever, including after a fresh consent grant.
    const body = await Promise.race([response.arrayBuffer(), aborted]);
    return new Response(response.body === null ? null : body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } finally {
    clearTimeout(timeout);
    controller.signal.removeEventListener("abort", rejectAborted);
    activeTrafficRequests.delete(controller);
  }
}

async function requestTrafficSessionCredential({
  sessionToken,
  locale,
  entryPath,
  attribution,
  consentState,
}: {
  sessionToken: string;
  locale: HomegroundLocale;
  entryPath: string;
  attribution: EntryAttribution;
  consentState: AnalyticsConsentState;
}): Promise<TrafficSessionCredential | null> {
  const context = trafficCredentialContext({
    locale,
    entryPath,
    attribution,
  });
  const existing = readTrafficSessionCredential({
    sessionToken,
    context,
    consentUpdatedAt: consentState.updatedAt,
  });
  if (existing) return existing;
  if (
    !analyticsConsentRemains(consentState) ||
    firstPartyAttemptIsSuppressed()
  ) {
    return null;
  }

  let response: Response;
  try {
    response = await fetchTraffic({
      requestType: trafficSessionStartRequestType,
      contractVersion: webEventsContract,
      noticeVersion: analyticsConsentVersion,
      sessionToken,
      locale,
      entryPath,
      attribution: trafficAttributionPayload(attribution),
      attributionSignature: attribution.attribution_signature ?? null,
    });
  } catch {
    return null;
  }
  if (!analyticsConsentRemains(consentState)) {
    await discardResponseBody(response);
    return null;
  }
  if (!response.ok) {
    await discardResponseBody(response);
    if (!analyticsConsentRemains(consentState)) return null;
    return null;
  }

  try {
    const result = (await response.json()) as Record<string, unknown>;
    if (!analyticsConsentRemains(consentState)) return null;
    const expiresAt =
      typeof result.expiresAt === "string"
        ? Date.parse(result.expiresAt)
        : Number.NaN;
    if (
      result.contractVersion !== webEventsContract ||
      result.state !== "session_ready" ||
      typeof result.sessionCredential !== "string" ||
      !sessionCredentialPattern.test(result.sessionCredential) ||
      !Number.isFinite(expiresAt) ||
      expiresAt <= Date.now() + 30_000
    ) {
      return null;
    }
    const credential: TrafficSessionCredential = {
      credential: result.sessionCredential,
      expiresAt,
      sessionToken,
      context,
      consentUpdatedAt: consentState.updatedAt,
    };
    window.sessionStorage.setItem(
      trafficCredentialStorageKey,
      JSON.stringify(credential),
    );
    return credential;
  } catch {
    return null;
  }
}

async function trafficSessionCredential(parameters: {
  sessionToken: string;
  locale: HomegroundLocale;
  entryPath: string;
  attribution: EntryAttribution;
  consentState: AnalyticsConsentState;
}) {
  if (firstPartyAttemptIsSuppressed()) return null;
  const key = `${parameters.sessionToken}:${parameters.consentState.updatedAt}:${parameters.consentState.generation}:${trafficCredentialContext(parameters)}`;
  if (!trafficCredentialRequest || trafficCredentialRequest.key !== key) {
    const promise = requestTrafficSessionCredential(parameters).finally(
      () => {
        if (trafficCredentialRequest?.key === key) {
          trafficCredentialRequest = null;
        }
      },
    );
    trafficCredentialRequest = { key, promise };
  }
  return trafficCredentialRequest.promise;
}

type TrafficEventAttemptOutcome =
  | "accepted"
  | "unauthorized"
  | "retry"
  | "stopped";

async function sendTrafficEventBatch({
  payload,
  consentState,
}: {
  payload: Record<string, unknown>;
  consentState: AnalyticsConsentState;
}): Promise<TrafficEventAttemptOutcome> {
  if (
    !analyticsConsentRemains(consentState) ||
    firstPartyAttemptIsSuppressed()
  ) {
    return "stopped";
  }

  let response: Response;
  try {
    response = await fetchTraffic(payload);
  } catch {
    return "retry";
  }
  if (!analyticsConsentRemains(consentState)) {
    await discardResponseBody(response);
    return "stopped";
  }
  if (response.ok) return "accepted";

  const outcome =
    response.status === 401 ? "unauthorized" : response.status === 429 || response.status >= 500 ? "retry" : "stopped";
  await discardResponseBody(response);
  if (!analyticsConsentRemains(consentState)) return "stopped";
  return outcome;
}

function journeyContext(context: FirstPartyJourneyContext) {
  const pathSlug = window.location.pathname.match(/^\/(?:zh\/|ko\/)?tours\/([^/]+)\/$/u)?.[1];
  const homepage = ["/", "/zh/", "/ko/"].includes(window.location.pathname);
  const selected = homepage ? getPrivateTourInquiryContextFromSearchParams(new URLSearchParams(window.location.search), pageLocale({})) : null;
  const candidate = context.productSlug ?? pathSlug ?? selected?.slug;
  const productSlug = isPrivateTourInquirySlug(candidate) ? candidate : null;
  const selection = getPrivateTourInquirySelection(productSlug, context.packageId ?? selected?.selection?.packageId, context.travelers ?? selected?.selection?.travelers);
  const allowedSurfaces = ["product", "homepage_quick_email", "planner", "contact_options"];
  const allowedErrors = ["validation", "network", "rate_limited", "service_unavailable", "server_error", "unknown_response"];
  return {
    productSlug,
    packageId: selection?.packageId ?? null,
    travelers: selection?.travelers ?? null,
    surface: context.surface && allowedSurfaces.includes(context.surface) ? context.surface : (pathSlug ? "product" : null),
    errorCode: context.errorCode && allowedErrors.includes(context.errorCode) ? context.errorCode : null,
  };
}

function nextClientSequence() {
  try {
    const key = "homeground-traffic-client-sequence";
    const previous = Number(window.sessionStorage.getItem(key) ?? "0");
    if (previous >= 1_000_000) return null;
    const next = Number.isInteger(previous) && previous >= 0 ? previous + 1 : 1;
    window.sessionStorage.setItem(key, String(next));
    return next;
  } catch { return null; }
}

type QueuedTrafficEvent = {
  event: Record<string, unknown>;
  credentialParameters: Parameters<typeof trafficSessionCredential>[0];
  createdAt: number;
  attempts: number;
};
const trafficQueue: QueuedTrafficEvent[] = [];
const maximumQueuedEvents = 40;
const queueLifetimeMilliseconds = 120_000;
let trafficQueueRunning = false;
let trafficQueueTimer: ReturnType<typeof setTimeout> | undefined;

function clearTrafficQueue() {
  for (const request of activeTrafficRequests) request.abort();
  activeTrafficRequests.clear();
  trafficQueue.length = 0;
  if (trafficQueueTimer !== undefined) clearTimeout(trafficQueueTimer);
  trafficQueueTimer = undefined;
  firstPartyNextAttemptAt = 0;
}

function scheduleTrafficQueue(delay: number) {
  if (trafficQueueTimer !== undefined || trafficQueue.length === 0) return;
  trafficQueueTimer = setTimeout(() => {
    trafficQueueTimer = undefined;
    void flushTrafficQueue();
  }, Math.max(0, Math.min(delay, queueLifetimeMilliseconds)));
  // Node test runners may release a pending optional timer; browsers use numbers.
  if (typeof trafficQueueTimer === "object" && "unref" in trafficQueueTimer) trafficQueueTimer.unref();
}

async function flushTrafficQueue() {
  if (trafficQueueRunning) return;
  trafficQueueRunning = true;
  try {
    while (trafficQueue.length) {
      const queued = trafficQueue[0];
      const { consentState, sessionToken, locale, entryPath, attribution } = queued.credentialParameters;
      if (!analyticsConsentRemains(consentState) || Date.now() - queued.createdAt >= queueLifetimeMilliseconds || queued.attempts >= 3) {
        trafficQueue.shift();
        continue;
      }
      if (firstPartyAttemptIsSuppressed()) {
        scheduleTrafficQueue(firstPartyNextAttemptAt - Date.now());
        return;
      }
      queued.attempts += 1;
      let credential = await trafficSessionCredential(queued.credentialParameters);
      if (trafficQueue[0] !== queued || !analyticsConsentRemains(consentState)) continue;
      if (Date.now() - queued.createdAt >= queueLifetimeMilliseconds) { trafficQueue.shift(); continue; }
      let outcome: TrafficEventAttemptOutcome = "retry";
      if (credential) {
        for (let attempt = 0; attempt < 2; attempt += 1) {
          outcome = await sendTrafficEventBatch({ consentState, payload: {
            requestType: trafficEventBatchRequestType,
            contractVersion: webEventsContract,
            noticeVersion: analyticsConsentVersion,
            sessionToken,
            sessionCredential: credential.credential,
            locale, entryPath,
            attribution: trafficAttributionPayload(attribution),
            attributionSignature: attribution.attribution_signature ?? null,
            events: [queued.event],
          } });
          if (outcome !== "unauthorized" || attempt > 0 || !analyticsConsentRemains(consentState)) break;
          clearRejectedTrafficSessionCredential(credential.credential);
          credential = await trafficSessionCredential(queued.credentialParameters);
          if (!credential) { outcome = "retry"; break; }
        }
      }
      if (trafficQueue[0] !== queued) continue;
      if (outcome === "retry" && analyticsConsentRemains(consentState) && queued.attempts < 3) {
        firstPartyNextAttemptAt = Math.max(firstPartyNextAttemptAt, Date.now() + 1_000 * queued.attempts);
        scheduleTrafficQueue(firstPartyNextAttemptAt - Date.now());
        return;
      }
      trafficQueue.shift();
    }
  } finally {
    trafficQueueRunning = false;
  }
}

function dispatchFirstPartyEvent(
  name: HomegroundEventName,
  parameters: Record<string, string | number | boolean>,
  context: FirstPartyJourneyContext = {},
) {
  ensureAnalyticsConsentObserver();
  if (!ANALYTICS_ENABLED || !analyticsRuntimeIsAllowed() || !WEB_EVENTS_URL || !hasAnalyticsConsent() || typeof window === "undefined") return false;
  const consentState = currentAnalyticsConsentState();
  const mappedEvent = firstPartyEvent(name, parameters);
  if (!consentState || !mappedEvent || trafficQueue.length >= maximumQueuedEvents) return false;
  captureEntryAttribution();
  const sessionToken = analyticsSessionToken();
  if (!sessionToken) return false;
  const attribution = readEntryAttribution();
  const locale = pageLocale(parameters);
  const pagePath = sanitizePagePath(parameters.page_path ?? window.location.pathname);
  const entryPath = sanitizePagePath(attribution.landing_path ?? window.location.pathname);
  const normalizedContext = journeyContext({
    ...context,
    surface: context.surface ?? (parameters.submission_surface === "full_trip_brief" ? "planner" : parameters.submission_surface === "homepage_email" || parameters.contact_variant ? "homepage_quick_email" : name === "page_view" ? null : "contact_options"),
  });
  if (name === "product_selection_changed" && (!normalizedContext.productSlug || !normalizedContext.packageId || !normalizedContext.travelers)) return false;
  if ((name === "enquiry_submit_failed" || name === "enquiry_submit_uncertain") && !normalizedContext.errorCode) return false;
  if (name !== "enquiry_submit_failed" && name !== "enquiry_submit_uncertain") normalizedContext.errorCode = null;
  const clientSequence = nextClientSequence();
  if (!clientSequence) return false;
  trafficQueue.push({
    event: { eventId: window.crypto.randomUUID(), type: mappedEvent.type, pagePath, actionCode: mappedEvent.actionCode, clientSequence, ...normalizedContext },
    credentialParameters: { sessionToken, locale, entryPath, attribution, consentState },
    createdAt: Date.now(), attempts: 0,
  });
  void flushTrafficQueue();
  return true;
}

function dispatchMetaEvent(
  name: HomegroundEventName,
  parameters: Record<string, string | number | boolean>,
) {
  if (
    !ANALYTICS_ENABLED ||
    !analyticsRuntimeIsAllowed() ||
    !META_PIXEL_ID ||
    !hasMarketingConsent() ||
    !metaMeasurementLocationIsSafe() ||
    typeof window === "undefined"
  ) {
    return;
  }

  const fbq = (window as AnalyticsWindow).fbq;
  if (!fbq) return;
  if (name === "page_view") {
    fbq("track", "PageView");
  } else if (name === "enquiry_submitted") {
    fbq("track", "Lead", parameters);
  } else {
    fbq("trackCustom", name, parameters);
  }
}

export interface FirstPartyJourneyContext {
  productSlug?: string | null;
  packageId?: string | null;
  travelers?: number | null;
  surface?: "product" | "homepage_quick_email" | "planner" | "contact_options" | null;
  errorCode?: "validation" | "network" | "rate_limited" | "service_unavailable" | "server_error" | "unknown_response" | null;
}

export interface EventDispatchOptions {
  firstPartyContext?: FirstPartyJourneyContext;
  targets?: readonly PageViewMeasurementTarget[];
}

export function trackEvent(
  name: HomegroundEventName,
  parameters: EventParameters = {},
  options: EventDispatchOptions = {},
): PageViewMeasurementTarget[] {
  const dispatched: PageViewMeasurementTarget[] = [];
  if (!ANALYTICS_ENABLED ||
    !analyticsRuntimeIsAllowed() || typeof window === "undefined") return dispatched;

  const analyticsAllowed = hasAnalyticsConsent();
  const marketingAllowed = hasMarketingConsent();
  if (!analyticsAllowed && !marketingAllowed) return dispatched;
  const firstPartyOnly = name === "product_selection_changed" || name === "contact_channel_selected" || name === "enquiry_submit_attempted" || name === "enquiry_submit_failed" || name === "enquiry_submit_uncertain";
  const targets = (options.targets ?? ["first_party", "google", "meta"]).filter((sink) => !firstPartyOnly || sink === "first_party");

  const sanitized = sanitizeEventParameters(parameters);
  if (analyticsAllowed) {
    captureEntryAttribution();
    if (
      targets.includes("google") && GA_MEASUREMENT_ID &&
      googleMeasurementLocationIsSafe() &&
      initializeGoogleAnalytics()
    ) {
      const gtag = ensureGtagQueue();
      gtag("event", name, googleEventParameters(sanitized));
      dispatched.push("google");
    }
    if (targets.includes("first_party") && WEB_EVENTS_URL && firstPartyEvent(name, sanitized)) {
      if (dispatchFirstPartyEvent(name, sanitized, options.firstPartyContext)) dispatched.push("first_party");
    }
  }
  // Meta derives event URLs from window.location and document.referrer and
  // offers no reliable per-event URL override. Keep Pixel off whenever either
  // source carries query or fragment metadata; first-party events retain only
  // the bounded pathname contract.
  if (
    marketingAllowed && targets.includes("meta") &&
    metaMeasurementLocationIsSafe() &&
    initializeMetaPixel()
  ) {
    dispatchMetaEvent(name, sanitized);
    dispatched.push("meta");
  }
  return dispatched;
}

export function trackEventOnce(
  delivered: Set<PageViewMeasurementTarget>,
  name: HomegroundEventName,
  parameters: EventParameters,
  options: EventDispatchOptions = {},
) {
  const targets = (["first_party", "google", "meta"] as const).filter((sink) => !delivered.has(sink));
  for (const sink of trackEvent(name, parameters, { ...options, targets })) delivered.add(sink);
}

function googleCampaignConfiguration() {
  const attribution = readEntryAttribution();
  return {
    ...(attribution.utm_source
      ? { campaign_source: attribution.utm_source }
      : {}),
    ...(attribution.utm_medium
      ? { campaign_medium: attribution.utm_medium }
      : {}),
    ...(attribution.utm_campaign
      ? { campaign_name: attribution.utm_campaign }
      : {}),
    ...(attribution.utm_content
      ? { campaign_content: attribution.utm_content }
      : {}),
  };
}

export type PageViewMeasurementTarget =
  | "first_party"
  | "google"
  | "meta";

export function trackPageView({
  path,
  locale,
  target,
}: {
  path: string;
  locale: HomegroundLocale;
  target: PageViewMeasurementTarget;
}) {
  if (!ANALYTICS_ENABLED ||
    !analyticsRuntimeIsAllowed() || typeof window === "undefined") return;
  const parameters = sanitizeEventParameters({
    page_path: sanitizePagePath(path),
    page_language: locale,
  });

  if (target === "first_party") {
    if (hasAnalyticsConsent()) {
      void dispatchFirstPartyEvent("page_view", parameters);
    }
    return;
  }
  if (
    target === "google" &&
    GA_MEASUREMENT_ID &&
    hasAnalyticsConsent() &&
    googleMeasurementLocationIsSafe() &&
    initializeGoogleAnalytics()
  ) {
    ensureGtagQueue()(
      "event",
      "page_view",
      googleEventParameters(parameters),
    );
    return;
  }
  if (
    target === "meta" &&
    META_PIXEL_ID &&
    hasMarketingConsent() &&
    metaMeasurementLocationIsSafe() &&
    initializeMetaPixel()
  ) {
    dispatchMetaEvent("page_view", parameters);
  }
}

export function trackEnquirySubmitted(
  parameters: EventParameters = {},
) {
  trackEvent("enquiry_submitted", parameters);
}

export function currentConsentAllowsMeasurement() {
  if (!ANALYTICS_ENABLED || !analyticsRuntimeIsAllowed()) return false;
  const preferences = readAnalyticsConsent();
  return Boolean(preferences?.analytics || preferences?.marketing);
}
