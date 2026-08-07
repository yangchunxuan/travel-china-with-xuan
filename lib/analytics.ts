import {
  analyticsConsentVersion,
  hasAnalyticsConsent,
  hasMarketingConsent,
  readAnalyticsConsent,
} from "./analyticsConsent";

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
export const webEventsContract = "homeground-traffic-events.v1" as const;
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
  | "email_form_started";
type ContactActionCode = "email" | "whatsapp" | "messenger";
type MeasurementDestinations = {
  analytics: boolean;
  marketing: boolean;
};

type Gtag = (...args: unknown[]) => void;
type MetaPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
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
  "cta_position",
  "planning_intent",
  "planning_starter_intent",
  "destination_count",
  "has_other_place",
  "destination_mode",
  "timing_status",
  "total_nights",
  "step",
  "question",
  "route_id",
  "rule_version",
  "route_family",
  "route_profile",
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
const internalUtmMediums = new Set(["owned", "organic-content"]);
const attributionStorageKey = "homeground-entry-attribution";
const analyticsSessionStorageKey = "homeground-analytics-session";
const trafficCredentialStorageKey =
  "homeground-traffic-session-credential";
const hmacSha256Pattern = /^[0-9a-f]{64}$/u;
const sessionCredentialPattern =
  /^v1\.[0-9]{10}\.[0-9a-f]{64}$/u;
let trafficCredentialRequest: {
  key: string;
  promise: Promise<TrafficSessionCredential | null>;
} | null = null;

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
  try {
    window.sessionStorage.removeItem(attributionStorageKey);
    window.sessionStorage.removeItem(analyticsSessionStorageKey);
    window.sessionStorage.removeItem(trafficCredentialStorageKey);
    trafficCredentialRequest = null;
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
  if (
    !ANALYTICS_ENABLED ||
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
  analyticsWindow.gtag ??= (...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args);
  };
  return analyticsWindow.gtag;
}

export function initializeGoogleAnalytics() {
  if (
    !ANALYTICS_ENABLED ||
    !GA_MEASUREMENT_ID ||
    !hasAnalyticsConsent() ||
    typeof window === "undefined"
  ) {
    return false;
  }

  const analyticsWindow = window as AnalyticsWindow;
  (
    analyticsWindow as unknown as Record<string, unknown>
  )[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  const gtag = ensureGtagQueue();
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
  analyticsWindow.fbq = fbq;
  analyticsWindow._fbq = fbq;
  return fbq;
}

export function initializeMetaPixel() {
  if (
    !ANALYTICS_ENABLED ||
    !META_PIXEL_ID ||
    !hasMarketingConsent() ||
    typeof window === "undefined"
  ) {
    return false;
  }

  const analyticsWindow = window as AnalyticsWindow;
  const fbq = ensureMetaQueue();
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
  if (name === "page_view" || name === "contact_options_viewed") {
    return { type: name, actionCode: null };
  }
  if (name === "quick_email_started") {
    return { type: "email_form_started", actionCode: null };
  }
  if (name === "contact_option_clicked") {
    const channel = parameters.channel;
    if (
      channel === "email" ||
      channel === "whatsapp" ||
      channel === "messenger"
    ) {
      return {
        type: "contact_channel_clicked",
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
}: {
  sessionToken: string;
  context: string;
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
      candidate.context !== context
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

async function requestTrafficSessionCredential({
  sessionToken,
  locale,
  entryPath,
  attribution,
}: {
  sessionToken: string;
  locale: HomegroundLocale;
  entryPath: string;
  attribution: EntryAttribution;
}): Promise<TrafficSessionCredential | null> {
  const context = trafficCredentialContext({
    locale,
    entryPath,
    attribution,
  });
  const existing = readTrafficSessionCredential({
    sessionToken,
    context,
  });
  if (existing) return existing;

  let response: Response;
  try {
    response = await fetch(WEB_EVENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: trafficSessionStartRequestType,
        contractVersion: webEventsContract,
        noticeVersion: analyticsConsentVersion,
        sessionToken,
        locale,
        entryPath,
        attribution: trafficAttributionPayload(attribution),
        attributionSignature:
          attribution.attribution_signature ?? null,
      }),
      credentials: "omit",
      keepalive: true,
      mode: "cors",
      referrerPolicy: "no-referrer",
    });
  } catch {
    return null;
  }
  if (!response.ok) {
    await response.body?.cancel();
    return null;
  }

  try {
    const result = (await response.json()) as Record<string, unknown>;
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
}) {
  const key = `${parameters.sessionToken}:${trafficCredentialContext(parameters)}`;
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

async function dispatchFirstPartyEvent(
  name: HomegroundEventName,
  parameters: Record<string, string | number | boolean>,
) {
  if (
    !ANALYTICS_ENABLED ||
    !WEB_EVENTS_URL ||
    !hasAnalyticsConsent() ||
    typeof window === "undefined"
  ) {
    return;
  }

  const mappedEvent = firstPartyEvent(name, parameters);
  if (!mappedEvent) return;

  captureEntryAttribution();
  const sessionToken = analyticsSessionToken();
  if (!sessionToken) return;
  const attribution = readEntryAttribution();
  const pagePath = sanitizePagePath(
    parameters.page_path ?? window.location.pathname,
  );
  const entryPath = sanitizePagePath(
    attribution.landing_path ?? window.location.pathname,
  );
  const locale = pageLocale(parameters);
  const sessionCredential = await trafficSessionCredential({
    sessionToken,
    locale,
    entryPath,
    attribution,
  });
  if (!sessionCredential) return;

  const payload = {
    requestType: trafficEventBatchRequestType,
    contractVersion: webEventsContract,
    noticeVersion: analyticsConsentVersion,
    sessionToken,
    sessionCredential: sessionCredential.credential,
    locale,
    entryPath,
    attribution: trafficAttributionPayload(attribution),
    attributionSignature:
      attribution.attribution_signature ?? null,
    events: [
      {
        eventId: window.crypto.randomUUID(),
        type: mappedEvent.type,
        pagePath,
        actionCode: mappedEvent.actionCode,
      },
    ],
  };

  try {
    const response = await fetch(WEB_EVENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
      keepalive: true,
      mode: "cors",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) {
      if (response.status === 401) {
        window.sessionStorage.removeItem(
          trafficCredentialStorageKey,
        );
      }
      await response.body?.cancel();
    }
  } catch {
    // Measurement must never block or alter the traveller-facing interaction.
  }
}

function dispatchMetaEvent(
  name: HomegroundEventName,
  parameters: Record<string, string | number | boolean>,
) {
  if (
    !ANALYTICS_ENABLED ||
    !META_PIXEL_ID ||
    !hasMarketingConsent() ||
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

function trackEventForDestinations(
  name: HomegroundEventName,
  parameters: EventParameters,
  destinations: MeasurementDestinations,
) {
  if (!ANALYTICS_ENABLED || typeof window === "undefined") return;

  const analyticsAllowed =
    destinations.analytics && hasAnalyticsConsent();
  const marketingAllowed =
    destinations.marketing && hasMarketingConsent();
  if (!analyticsAllowed && !marketingAllowed) return;

  const sanitized = sanitizeEventParameters(parameters);
  if (analyticsAllowed) {
    captureEntryAttribution();
    if (GA_MEASUREMENT_ID) {
      const gtag = ensureGtagQueue();
      gtag("event", name, sanitized);
    }
    void dispatchFirstPartyEvent(name, sanitized);
  }
  if (marketingAllowed) dispatchMetaEvent(name, sanitized);
}

export function trackEvent(
  name: HomegroundEventName,
  parameters: EventParameters = {},
) {
  trackEventForDestinations(name, parameters, {
    analytics: true,
    marketing: true,
  });
}

export function trackPageView({
  path,
  locale,
  destinations = { analytics: true, marketing: true },
}: {
  path: string;
  locale: HomegroundLocale;
  destinations?: MeasurementDestinations;
}) {
  trackEventForDestinations(
    "page_view",
    {
      page_path: sanitizePagePath(path),
      page_language: locale,
    },
    destinations,
  );
}

export function trackEnquirySubmitted(
  parameters: EventParameters = {},
) {
  trackEvent("enquiry_submitted", parameters);
}

export function currentConsentAllowsMeasurement() {
  if (!ANALYTICS_ENABLED) return false;
  const preferences = readAnalyticsConsent();
  return Boolean(preferences?.analytics || preferences?.marketing);
}
