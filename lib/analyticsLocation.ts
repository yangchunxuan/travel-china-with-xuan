import {
  getPrivateTourInquirySelection,
  isPrivateTourInquirySlug,
  privateTourInquiryQueryKey,
} from "./privateTourInquiryContext";
import { routeServiceIds, routeServiceQueryKey } from "./routeServiceInterest";

interface AnalyticsLocationSubscriber {
  beforeChange?: (nextHref: string) => void;
  change: () => void;
}

const subscribers = new Set<AnalyticsLocationSubscriber>();
let restoreInstrumentation: (() => void) | null = null;

function resolvedHref(value?: string | URL | null) {
  if (typeof window === "undefined") return "";
  if (value === undefined || value === null) return window.location.href;
  try {
    return new URL(String(value), window.location.href).href;
  } catch {
    return window.location.href;
  }
}

function notifyBeforeChange(nextHref: string) {
  subscribers.forEach((subscriber) => {
    try {
      subscriber.beforeChange?.(nextHref);
    } catch {
      // Optional measurement must never interrupt application navigation.
    }
  });
}

function notifyChange() {
  subscribers.forEach((subscriber) => {
    try {
      subscriber.change();
    } catch {
      // Optional measurement must never interrupt application navigation.
    }
  });
}

function instrumentLocationChanges() {
  if (typeof window === "undefined" || restoreInstrumentation) return;

  const history = window.history;
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  const pushState: History["pushState"] = function (
    data,
    unused,
    url,
  ) {
    notifyBeforeChange(resolvedHref(url));
    originalPushState.call(history, data, unused, url);
    notifyChange();
  };
  const replaceState: History["replaceState"] = function (
    data,
    unused,
    url,
  ) {
    notifyBeforeChange(resolvedHref(url));
    originalReplaceState.call(history, data, unused, url);
    notifyChange();
  };
  const handleBrowserLocationChange = () => {
    notifyBeforeChange(window.location.href);
    notifyChange();
  };

  try {
    history.pushState = pushState;
    history.replaceState = replaceState;
  } catch {
    // The popstate listeners still protect browser history navigation in
    // environments that expose non-writable History methods.
  }
  window.addEventListener("popstate", handleBrowserLocationChange);
  window.addEventListener("hashchange", handleBrowserLocationChange);
  window.addEventListener(
    "homeground:locationchange",
    handleBrowserLocationChange,
  );

  restoreInstrumentation = () => {
    window.removeEventListener("popstate", handleBrowserLocationChange);
    window.removeEventListener("hashchange", handleBrowserLocationChange);
    window.removeEventListener(
      "homeground:locationchange",
      handleBrowserLocationChange,
    );
    if (history.pushState === pushState) {
      history.pushState = originalPushState;
    }
    if (history.replaceState === replaceState) {
      history.replaceState = originalReplaceState;
    }
    restoreInstrumentation = null;
  };
}

export function subscribeAnalyticsLocationChanges(
  subscriber: AnalyticsLocationSubscriber,
) {
  if (typeof window === "undefined") return () => undefined;
  let active = true;
  let queued = false;
  const deferredSubscriber: AnalyticsLocationSubscriber = {
    // Vendor revocation must happen synchronously before history changes.
    beforeChange: subscriber.beforeChange,
    change: () => {
      if (!active || queued) return;
      queued = true;
      // Next updates history inside useInsertionEffect. Notify React-facing
      // subscribers after that commit, coalescing URL cleanup/step changes.
      queueMicrotask(() => {
        queued = false;
        if (!active) return;
        try {
          subscriber.change();
        } catch {
          // Optional measurement must never interrupt application navigation.
        }
      });
    },
  };
  subscribers.add(deferredSubscriber);
  instrumentLocationChanges();

  return () => {
    active = false;
    subscribers.delete(deferredSubscriber);
    if (subscribers.size === 0) restoreInstrumentation?.();
  };
}

export function thirdPartyMeasurementLocationIsSafe(
  value?: string | URL,
) {
  if (typeof window === "undefined") return false;
  try {
    const url = new URL(
      value === undefined ? window.location.href : String(value),
      window.location.href,
    );
    return url.search === "" && url.hash === "";
  } catch {
    return false;
  }
}

const publicHomePaths = new Set(["/", "/zh/", "/ko/"]);
const publicPlannerSteps = new Set([
  "destinations",
  "nights",
  "party",
  "pace",
  "result",
]);
const publicHomeFragments = new Set([
  "",
  "#planner-contact",
  "#route-finder",
  "#planner-handoff",
]);

export type GuideCtaTarget = "private_tour" | "planner" | "other";

export function guideCtaTarget(href: string): GuideCtaTarget {
  if (typeof window === "undefined") return "other";
  try {
    const url = new URL(href, window.location.href);
    if (
      url.origin !== window.location.origin ||
      url.username ||
      url.password
    ) {
      return "other";
    }
    const tourPath = url.pathname.match(/^\/(?:zh\/|ko\/)?tours\/([^/]+)\/$/u);
    if (tourPath && isPrivateTourInquirySlug(tourPath[1])) return "private_tour";
    if (
      publicHomePaths.has(url.pathname) &&
      ((url.hash !== "" && publicHomeFragments.has(url.hash)) ||
        publicPlannerSteps.has(url.searchParams.get("planner") ?? ""))
    ) {
      return "planner";
    }
  } catch {
    // Classification is optional and never returns any of the input URL.
  }
  return "other";
}

// GA receives an explicit pathname-only location and origin-only referrer.
// Allow the homepage's finite navigation choices, never arbitrary URL text.
// Meta cannot reliably override its event URL and keeps the stricter gate.
export function googleMeasurementLocationIsSafe(value?: string | URL) {
  if (typeof window === "undefined") return false;
  try {
    const url = new URL(
      value === undefined ? window.location.href : String(value),
      window.location.href,
    );
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.origin !== window.location.origin ||
      url.username ||
      url.password
    ) {
      return false;
    }
    if (thirdPartyMeasurementLocationIsSafe(url)) return true;
    if (
      !publicHomePaths.has(url.pathname) ||
      !publicHomeFragments.has(url.hash)
    ) {
      return false;
    }

    const seen = new Set<string>();
    let safe = true;
    url.searchParams.forEach((parameterValue, key) => {
      if (seen.has(key)) safe = false;
      seen.add(key);
      if (key === privateTourInquiryQueryKey) {
        if (!isPrivateTourInquirySlug(parameterValue)) safe = false;
      } else if (key === routeServiceQueryKey) {
        if (!routeServiceIds.some((id) => id === parameterValue)) safe = false;
      } else if (key === "planner") {
        if (!publicPlannerSteps.has(parameterValue)) safe = false;
      } else if (key === "package" || key === "travelers") {
        // Validated together below against this specific public tour.
      } else {
        safe = false;
      }
    });
    if (seen.has("package") || seen.has("travelers")) {
      if (
        !getPrivateTourInquirySelection(
          url.searchParams.get(privateTourInquiryQueryKey),
          url.searchParams.get("package"),
          url.searchParams.get("travelers"),
        )
      ) {
        return false;
      }
    }
    return safe;
  } catch {
    return false;
  }
}

export function metaMeasurementLocationIsSafe(
  value?: string | URL,
  referrerValue?: string,
) {
  if (!thirdPartyMeasurementLocationIsSafe(value)) return false;
  try {
    const referrer = referrerValue ?? document.referrer;
    if (referrer === "") return true;

    const referrerUrl = new URL(referrer, window.location.href);
    return referrerUrl.search === "" && referrerUrl.hash === "";
  } catch {
    return false;
  }
}

export function currentAnalyticsLocationKey() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}
