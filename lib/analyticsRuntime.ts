export const internalTrafficStorageKey = "homeground-internal-traffic";
export const analyticsRuntimeChangedEvent = "homeground:analytics-runtime-changed";

export function isInternalTrafficExcluded() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(internalTrafficStorageKey) === "true";
  } catch {
    return true;
  }
}

/** All optional sinks share this gate. Local previews never use production sinks. */
export function analyticsRuntimeIsAllowed() {
  if (typeof window === "undefined") return false;
  return window.location.origin === "https://homegroundchina.com" && !isInternalTrafficExcluded();
}

export function setInternalTrafficExcluded(excluded: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (excluded) window.localStorage.setItem(internalTrafficStorageKey, "true");
    else window.localStorage.removeItem(internalTrafficStorageKey);
  } catch {
    return;
  }
  window.dispatchEvent(new Event(analyticsRuntimeChangedEvent));
}

export function subscribeAnalyticsRuntime(listener: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const storage = (event: StorageEvent) => {
    if (event.key === null || event.key === internalTrafficStorageKey) listener();
  };
  window.addEventListener("storage", storage);
  window.addEventListener("focus", listener);
  window.addEventListener(analyticsRuntimeChangedEvent, listener);
  document.addEventListener("visibilitychange", listener);
  return () => {
    window.removeEventListener("storage", storage);
    window.removeEventListener("focus", listener);
    window.removeEventListener(analyticsRuntimeChangedEvent, listener);
    document.removeEventListener("visibilitychange", listener);
  };
}

export function subscribeInternalTrafficExcluded(listener: (excluded: boolean) => void) {
  return subscribeAnalyticsRuntime(() => listener(isInternalTrafficExcluded()));
}
