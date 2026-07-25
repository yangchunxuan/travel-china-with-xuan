/**
 * Google Analytics 4 wiring for the public site.
 *
 * The measurement ID is public by design — it ships in the page source and only
 * tells the browser which property to report to. It is not a secret and must not
 * be treated as one.
 *
 * This module is the single place that knows how an event reaches GA4. Callers
 * just name the event. Before this existed, components called `gtag` directly
 * and, when the analytics script was dropped during the July 18 layout move,
 * those calls silently wrote into a `dataLayer` nobody read for a week.
 */

import {
  allowedInquiryEntryPathSet,
  // @ts-ignore Source-TypeScript test runtimes require the explicit extension.
} from "./inquiryEntryPaths.ts";

export const GA_MEASUREMENT_ID = "G-DPGR2SVC0G";

/**
 * One shared kill switch for both script loading and event dispatch.
 *
 * Keep this false while the published privacy notice says that page-behaviour
 * analytics is not collected. First-party enquiry attribution does not depend
 * on this flag.
 */
export const ANALYTICS_ENABLED: boolean = false;

/** Every event the public site is allowed to send. */
export type HomegroundEventName =
  | "guide_cta_clicked"
  | "planning_intent_selected"
  | "planner_started"
  | "planner_step_completed"
  | "planner_result_viewed"
  | "planner_result_revised"
  | "conversation_brief_ready_viewed"
  | "paid_brief_ready_viewed"
  | "enquiry_submitted";

type EventParameters = Record<string, string | number | boolean>;

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (
    command: "event" | "js" | "config",
    targetOrName: string | Date,
    parameters?: Record<string, unknown>,
  ) => void;
};

/**
 * First-party enquiry attribution. This is deliberately independent of GA:
 * the site still needs to remember how an enquiry arrived while third-party
 * analytics is disabled.
 *
 * `entry_path` and external campaign labels are first-touch. `source_guide` is
 * last content touch and is updated only by a guide CTA or its query parameter.
 */
const attributionStorageKey = "homeground-entry-attribution";

export interface EntryAttribution {
  entry_path?: string;
  source_guide?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  /**
   * Google Ads click id. Captured so a trip that is actually won can be
   * reported back to Google as an offline conversion, which is the only way
   * automated bidding learns to buy customers rather than clicks.
   *
   * Google appends it to the landing URL and it exists only in that first
   * request, so a click whose id is not stored here can never be reconciled
   * later. First id wins: a visitor who arrives on an ad and keeps browsing
   * must not lose the click that paid for them.
   */
  gclid?: string;
  /**
   * Meta (Facebook/Instagram) click identifier, captured for the same reason
   * as `gclid` and on the same terms. Meta's Conversions API reconciles a won
   * trip against the ad click through this value, so a paid click whose id is
   * never stored is spend that can never be attributed.
   */
  fbclid?: string;
  /**
   * When the click id above was first seen, in epoch milliseconds.
   *
   * Meta does not accept a raw `fbclid`: its Conversions API wants
   * `fb.1.<click time>.<fbclid>`, and the click time is when the click was
   * observed — not when the enquiry was later submitted. A traveller can land
   * from an ad and submit days afterwards, and dating the click to the
   * submission can push it outside the attribution window the platform judges
   * it against. The observation is only available in the moment, so it is
   * recorded alongside the id rather than reconstructed later.
   */
  ad_click_at?: number;
}

const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

const disallowedAttributionControlCharacters =
  /[\u0000-\u001f\u007f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/gu;
const sourceGuidePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
/**
 * Ad-platform click ids are always opaque URL-safe tokens the platform
 * appends itself. Meta's `fbclid` runs far longer than Google's `gclid`, so
 * the bound is generous enough for both rather than per-platform.
 */
const adClickIdPattern = /^[A-Za-z0-9._-]{1,512}$/u;
/** 2020-01-01. No click on this site predates the site itself. */
const adClickEpochFloorMs = Date.UTC(2020, 0, 1);
/** Absorbs a mildly wrong device clock without accepting a fabricated future. */
const adClickFutureToleranceMs = 24 * 60 * 60 * 1000;
const allowedSourceGuides = new Set([
  "beijing-zhangjiajie-shanghai-10-days",
  "beijing-zhangjiajie-shanghai-transport",
  "best-zhangjiajie-night-show",
  "china-240-hour-visa-free-transit-route-check",
  "china-entry-guides",
  "china-entry-requirements",
  "china-visa-free-canadian-citizens-2026",
  "china-visa-free-new-zealand-citizens-2026",
  "china-visa-free-uk-citizens-2026",
  "do-singaporeans-need-visa-china",
  "do-us-citizens-need-visa-china-2026",
  "guides-hub",
  "is-your-china-itinerary-too-rushed",
  "kevin-before-the-hotel-pickup",
  "visa-free-entry",
  "zhangjiajie-glass-bridge-vs-skywalk",
  "zhangjiajie-itinerary",
  "zhangjiajie-older-travellers",
]);

/** Keeps a campaign label bounded without destroying legitimate Unicode. */
function sanitizeAttributionValue(value: string) {
  return value
    .normalize("NFC")
    .replace(disallowedAttributionControlCharacters, "")
    .trim()
    .slice(0, 100);
}

function sanitizeEntryPath(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value
    .normalize("NFC")
    .replace(disallowedAttributionControlCharacters, "")
    .trim()
    .slice(0, 200);
  const canonical =
    normalized === "/" || normalized.endsWith("/")
      ? normalized
      : `${normalized}/`;
  if (
    !normalized.startsWith("/") ||
    normalized.startsWith("//") ||
    normalized.includes("://") ||
    normalized.includes("?") ||
    normalized.includes("#")
  ) {
    return "/other/";
  }
  return allowedInquiryEntryPathSet.has(canonical) ? canonical : "/other/";
}

function sanitizeAdClickId(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.normalize("NFC").trim();
  return adClickIdPattern.test(normalized) ? normalized : undefined;
}

/**
 * A click time is only meaningful if it is a real instant. A value from a
 * corrupted session — or one a visitor edited by hand — must not travel to an
 * ad platform as though it were observed, so anything outside a plausible
 * window for this site is dropped rather than clamped.
 */
function sanitizeAdClickAt(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  const millis = Math.floor(value);
  if (millis < adClickEpochFloorMs) return undefined;
  if (millis > Date.now() + adClickFutureToleranceMs) return undefined;
  return millis;
}

function sanitizeSourceGuide(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.normalize("NFC").trim().slice(0, 100);
  return sourceGuidePattern.test(normalized) &&
      allowedSourceGuides.has(normalized)
    ? normalized
    : undefined;
}

function normalizeStoredAttribution(value: unknown): EntryAttribution {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const candidate = value as Record<string, unknown>;
  const attribution: EntryAttribution = {};
  const entryPath = sanitizeEntryPath(
    candidate.entry_path ?? candidate.landing_path,
  );
  const sourceGuide = sanitizeSourceGuide(candidate.source_guide);
  const gclid = sanitizeAdClickId(candidate.gclid);
  const fbclid = sanitizeAdClickId(candidate.fbclid);
  const adClickAt = sanitizeAdClickAt(candidate.ad_click_at);

  if (entryPath) attribution.entry_path = entryPath;
  if (sourceGuide) attribution.source_guide = sourceGuide;
  if (gclid) attribution.gclid = gclid;
  if (fbclid) attribution.fbclid = fbclid;
  // The timestamp describes a click id, so it is meaningless without one and
  // is dropped rather than kept as a stray field.
  if (adClickAt && (gclid || fbclid)) attribution.ad_click_at = adClickAt;

  attributionKeys.forEach((key) => {
    const raw = candidate[key];
    if (typeof raw !== "string") return;
    const normalized = sanitizeAttributionValue(raw);
    if (normalized) attribution[key] = normalized;
  });

  return attribution;
}

function readStoredAttribution(): EntryAttribution {
  const raw = window.sessionStorage.getItem(attributionStorageKey);
  if (!raw) return {};
  try {
    return normalizeStoredAttribution(JSON.parse(raw) as unknown);
  } catch {
    window.sessionStorage.removeItem(attributionStorageKey);
    return {};
  }
}

function writeStoredAttribution(attribution: EntryAttribution) {
  window.sessionStorage.setItem(
    attributionStorageKey,
    JSON.stringify(attribution),
  );
}

export function captureEntryAttribution() {
  if (typeof window === "undefined") return;

  try {
    const attribution = readStoredAttribution();
    const params = new URLSearchParams(window.location.search);

    if (!attribution.entry_path) {
      attribution.entry_path =
        sanitizeEntryPath(window.location.pathname) ?? "/other/";

      attributionKeys.forEach((key) => {
        const value = params.get(key);
        if (!value) return;
        const normalized = sanitizeAttributionValue(value);
        if (normalized) attribution[key] = normalized;
      });
    }

    const sourceGuide = sanitizeSourceGuide(params.get("source_guide"));
    if (sourceGuide) attribution.source_guide = sourceGuide;

    // Deliberately outside the first-touch block above: an ad click can land
    // mid-session, and a paid click with no stored id is unattributable spend.
    const hadClickId = Boolean(attribution.gclid || attribution.fbclid);
    if (!attribution.gclid) {
      const gclid = sanitizeAdClickId(params.get("gclid"));
      if (gclid) attribution.gclid = gclid;
    }
    if (!attribution.fbclid) {
      const fbclid = sanitizeAdClickId(params.get("fbclid"));
      if (fbclid) attribution.fbclid = fbclid;
    }
    // Stamped only when this visit is what introduced a click id, so the time
    // continues to describe the click that was actually paid for.
    if (!hadClickId && (attribution.gclid || attribution.fbclid)) {
      attribution.ad_click_at = Date.now();
    }

    writeStoredAttribution(attribution);
  } catch {
    // Private browsing, corrupt legacy state or a full storage quota. Losing
    // attribution must never block the public site or its enquiry form.
  }
}

/** Records the latest guide that actively sent the visitor into the planner. */
export function captureGuideSource(guideId: string) {
  if (typeof window === "undefined") return;

  try {
    const sourceGuide = sanitizeSourceGuide(guideId);
    if (!sourceGuide) return;
    const attribution = readStoredAttribution();
    attribution.entry_path ??=
      sanitizeEntryPath(window.location.pathname) ?? "/other/";
    attribution.source_guide = sourceGuide;
    writeStoredAttribution(attribution);
  } catch {
    // Attribution is best-effort and must not interfere with navigation.
  }
}

export function readEntryAttribution(): EntryAttribution {
  if (typeof window === "undefined") return {};

  try {
    return readStoredAttribution();
  } catch {
    return {};
  }
}

/**
 * Ends the submitted enquiry's attribution session. Call this only after the
 * backend has definitively confirmed persistence; failed or uncertain requests
 * must retain the state so a retry carries the same provenance.
 */
export function clearEntryAttribution() {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(attributionStorageKey);
  } catch {
    // A successful enquiry must not be turned into a UI failure merely because
    // the browser refused a best-effort storage cleanup.
  }
}

/**
 * Sends an event only when analytics collection is explicitly enabled and GA
 * has finished loading. With collection off (or without `gtag`) this is a true
 * no-op: it must not build up behavioural events in an unread `dataLayer`.
 */
export function trackEvent(
  name: HomegroundEventName,
  parameters: EventParameters = {},
) {
  if (!ANALYTICS_ENABLED || typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  if (typeof analyticsWindow.gtag !== "function") return;
  analyticsWindow.gtag("event", name, parameters);
}

/**
 * The conversion that matters commercially: a real enquiry reached the backend.
 * Carries the entry attribution so an enquiry can be traced to the guide that
 * produced it.
 */
export function trackEnquirySubmitted(parameters: EventParameters = {}) {
  trackEvent("enquiry_submitted", {
    ...readEntryAttribution(),
    ...parameters,
  });
}
