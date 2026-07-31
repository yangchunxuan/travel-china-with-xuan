export const analyticsConsentVersion = "2026-07-31.1";
export const analyticsConsentStorageKey = "homeground-consent.v1";
export const analyticsConsentChangedEventName =
  "homeground:consent-changed";
export const analyticsConsentOpenEventName =
  "homeground:open-privacy-choices";

export interface AnalyticsConsentPreferences {
  version: typeof analyticsConsentVersion;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

let memoryConsent: AnalyticsConsentPreferences | null = null;

function isConsentPreferences(
  value: unknown,
): value is AnalyticsConsentPreferences {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    candidate.version === analyticsConsentVersion &&
    candidate.necessary === true &&
    typeof candidate.analytics === "boolean" &&
    typeof candidate.marketing === "boolean" &&
    typeof candidate.updatedAt === "string" &&
    Number.isFinite(Date.parse(candidate.updatedAt))
  );
}

export function readAnalyticsConsent():
  | AnalyticsConsentPreferences
  | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(analyticsConsentStorageKey);
    if (!raw) return memoryConsent;
    const parsed: unknown = JSON.parse(raw);
    if (!isConsentPreferences(parsed)) {
      window.localStorage.removeItem(analyticsConsentStorageKey);
      memoryConsent = null;
      return memoryConsent;
    }
    memoryConsent = parsed;
    return parsed;
  } catch {
    return memoryConsent;
  }
}

function expireCookie(name: string) {
  if (typeof document === "undefined") return;

  const encodedName = encodeURIComponent(name);
  const base = `${encodedName}=; Max-Age=0; Path=/; SameSite=Lax`;
  document.cookie = base;

  const hostname = window.location.hostname;
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") {
    return;
  }

  document.cookie = `${base}; Domain=${hostname}`;
  document.cookie = `${base}; Domain=.${hostname}`;
}

function browserCookieNames() {
  if (typeof document === "undefined") return [];
  return document.cookie
    .split(";")
    .map((entry) => {
      const name = entry.split("=")[0]?.trim() ?? "";
      try {
        return decodeURIComponent(name);
      } catch {
        return "";
      }
    })
    .filter(Boolean);
}

export function clearAnalyticsCookies() {
  browserCookieNames()
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach(expireCookie);
}

export function clearMarketingCookies() {
  browserCookieNames()
    .filter((name) => name === "_fbp" || name === "_fbc")
    .forEach(expireCookie);
}

export function saveAnalyticsConsent({
  analytics,
  marketing,
}: {
  analytics: boolean;
  marketing: boolean;
}): AnalyticsConsentPreferences {
  const preferences: AnalyticsConsentPreferences = {
    version: analyticsConsentVersion,
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  memoryConsent = preferences;

  if (typeof window === "undefined") return preferences;

  try {
    window.localStorage.setItem(
      analyticsConsentStorageKey,
      JSON.stringify(preferences),
    );
  } catch {
    // A blocked storage API must not make the public site unusable. The choice
    // still applies to this page through the event below, but it cannot persist.
  }

  if (!analytics) clearAnalyticsCookies();
  if (!marketing) clearMarketingCookies();

  window.dispatchEvent(
    new CustomEvent<AnalyticsConsentPreferences>(
      analyticsConsentChangedEventName,
      { detail: preferences },
    ),
  );
  return preferences;
}

export function hasAnalyticsConsent() {
  return readAnalyticsConsent()?.analytics === true;
}

export function hasMarketingConsent() {
  return readAnalyticsConsent()?.marketing === true;
}

export function openAnalyticsConsentPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(analyticsConsentOpenEventName));
}
