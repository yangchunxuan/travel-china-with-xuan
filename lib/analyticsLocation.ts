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
  subscribers.add(subscriber);
  instrumentLocationChanges();

  return () => {
    subscribers.delete(subscriber);
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
