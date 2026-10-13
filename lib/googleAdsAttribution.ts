import {
  adAttributionVersion,
  normalizeAdAttribution,
  type AdAttribution,
} from "./adAttributionContract";
import {
  googleAdsAttributionStorageKey,
  clearMarketingCookies,
  readAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "./analyticsConsent";
import { analyticsRuntimeIsAllowed } from "./analyticsRuntime";

const configuredGoogleAdsId = process.env.NEXT_PUBLIC_HOMEGROUND_GOOGLE_ADS_ID?.trim() ?? "";
export const GOOGLE_ADS_ID = /^AW-[0-9]{5,20}$/u.test(configuredGoogleAdsId) ? configuredGoogleAdsId : "";
export const GOOGLE_ADS_ATTRIBUTION_ENABLED =
  process.env.NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED === "true" &&
  process.env.NEXT_PUBLIC_HOMEGROUND_AD_ATTRIBUTION_ENABLED === "true";
let observingConsent = false;

export function googleAdsRuntimeIsAllowed() {
  return analyticsRuntimeIsAllowed() &&
    !/^\/(?:ja|es)(?:\/|$)/u.test(window.location.pathname);
}

export function clearGoogleAdsAttribution() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(googleAdsAttributionStorageKey);
  } catch {
    // Optional attribution must not interrupt the public experience.
  }
}

function ensureConsentObserver() {
  if (observingConsent || typeof window === "undefined") return;
  observingConsent = true;
  subscribeAnalyticsConsent((preferences) => {
    if (!preferences?.marketing) clearMarketingCookies();
  });
}

function attributionConsent() {
  ensureConsentObserver();
  if (!GOOGLE_ADS_ATTRIBUTION_ENABLED || !googleAdsRuntimeIsAllowed()) return null;
  const consent = readAnalyticsConsent();
  return consent?.marketing ? consent : null;
}

/** Capture before address-bar cleanup; IDs never enter general analytics or messages. */
export function captureGoogleAdsAttribution() {
  // An excluded page pauses attribution; it must not erase the capability
  // needed to withdraw previously submitted attribution on a later page.
  if (!GOOGLE_ADS_ATTRIBUTION_ENABLED || !googleAdsRuntimeIsAllowed()) return;
  const consent = attributionConsent();
  if (!consent) {
    clearMarketingCookies();
    return;
  }
  try {
    const params = new URLSearchParams(window.location.search);
    const clickIdType = (["gclid", "gbraid", "wbraid"] as const)
      .find((key) => params.has(key));
    if (!clickIdType || params.getAll(clickIdType).length !== 1) return;
    const previous = readGoogleAdsAttribution();
    const attribution = normalizeAdAttribution({
      version: adAttributionVersion,
      clickIdType,
      clickId: params.get(clickIdType),
      capturedAt: new Date().toISOString(),
      landingPath: window.location.pathname,
      consent: "granted",
      consentVersion: consent.version,
      consentUpdatedAt: consent.updatedAt,
      revocationToken: previous?.revocationToken ?? window.crypto.randomUUID(),
    });
    if (attribution) {
      window.localStorage.setItem(googleAdsAttributionStorageKey, JSON.stringify(attribution));
    }
  } catch {
    // No in-memory fallback: blocked storage also disables cross-page attribution.
  }
}

/** Latest consented ad click, bounded to 90 days by the shared transport contract. */
export function readGoogleAdsAttribution(): AdAttribution | null {
  if (!GOOGLE_ADS_ATTRIBUTION_ENABLED || !googleAdsRuntimeIsAllowed()) return null;
  const consent = attributionConsent();
  if (!consent) {
    clearMarketingCookies();
    return null;
  }
  try {
    const raw = window.localStorage.getItem(googleAdsAttributionStorageKey);
    if (!raw) return null;
    const attribution = normalizeAdAttribution(JSON.parse(raw) as unknown);
    if (!attribution || attribution.consentVersion !== consent.version) {
      clearGoogleAdsAttribution();
      return null;
    }
    return attribution;
  } catch {
    clearGoogleAdsAttribution();
    return null;
  }
}

/** A retry can retain its original click, but never substitute a later ad click. */
export function inquiryAdAttributionWithCurrentConsent(value: unknown): AdAttribution | null {
  const snapshot = normalizeAdAttribution(value);
  const current = readGoogleAdsAttribution();
  if (!snapshot || !current) return null;
  return snapshot.clickIdType === current.clickIdType &&
    snapshot.clickId === current.clickId &&
    snapshot.capturedAt === current.capturedAt &&
    snapshot.consentUpdatedAt === current.consentUpdatedAt
    ? snapshot : null;
}
