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

export const GA_MEASUREMENT_ID = "G-DPGR2SVC0G";

/** Every event the public site is allowed to send. */
export type HomegroundEventName =
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
 * Where the visitor entered the site. GA4 attributes conversions to a session
 * source on its own, but the article CTAs carry an explicit `utm_source` naming
 * the guide, and reading that back on submission answers the question the
 * reports make awkward: which article produced this enquiry.
 *
 * Captured once on landing because the parameters are gone from the URL by the
 * time someone has read a guide, opened the planner and submitted.
 */
const attributionStorageKey = "homeground-entry-attribution";

interface EntryAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  landing_path?: string;
}

const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

/** Keeps a stray query string from becoming an unbounded analytics payload. */
function sanitizeAttributionValue(value: string) {
  return value.replace(/[^\w.\-/]/g, "").slice(0, 100);
}

export function captureEntryAttribution() {
  if (typeof window === "undefined") return;

  try {
    const existing = window.sessionStorage.getItem(attributionStorageKey);
    // First touch wins: a later internal navigation must not overwrite the
    // article the visitor actually arrived from.
    if (existing) return;

    const params = new URLSearchParams(window.location.search);
    const attribution: EntryAttribution = {};

    attributionKeys.forEach((key) => {
      const value = params.get(key);
      if (value) {
        attribution[key] = sanitizeAttributionValue(value);
      }
    });

    attribution.landing_path = window.location.pathname.slice(0, 120);

    window.sessionStorage.setItem(
      attributionStorageKey,
      JSON.stringify(attribution),
    );
  } catch {
    // Private browsing or a full storage quota. Attribution is a reporting
    // nicety; losing it must never break the page.
  }
}

export function readEntryAttribution(): EntryAttribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(attributionStorageKey);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as EntryAttribution;
  } catch {
    return {};
  }
}

/**
 * Sends an event to GA4. Falls back to `dataLayer` when the script has not
 * finished loading, which is also what a tag manager would read.
 */
export function trackEvent(
  name: HomegroundEventName,
  parameters: EventParameters = {},
) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;

  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", name, parameters);
    return;
  }

  analyticsWindow.dataLayer ??= [];
  analyticsWindow.dataLayer.push({ event: name, ...parameters });
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
