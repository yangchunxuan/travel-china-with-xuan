/** Runtime-neutral, bounded transport. These identifiers never enter analytics events. */
export const adAttributionVersion = "homeground-ad-attribution.v1";
export const adAttributionConsentVersion = "2026-10-13.1";
export const adAttributionLifetimeMs = 90 * 24 * 60 * 60 * 1000;
export type AdClickIdType = "gclid" | "gbraid" | "wbraid";
export interface AdAttribution {
  version: typeof adAttributionVersion;
  clickIdType: AdClickIdType;
  clickId: string;
  capturedAt: string;
  landingPath: string;
  consent: "granted";
  consentVersion: typeof adAttributionConsentVersion;
  consentUpdatedAt: string;
  revocationToken: string;
}

export function normalizeAdAttribution(input: unknown, now = Date.now()): AdAttribution | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const value = input as Record<string, unknown>;
  const keys = ["version", "clickIdType", "clickId", "capturedAt", "landingPath", "consent", "consentVersion", "consentUpdatedAt", "revocationToken"];
  if (Object.keys(value).length !== keys.length || Object.keys(value).some((key) => !keys.includes(key)) ||
      value.version !== adAttributionVersion || value.consent !== "granted" || value.consentVersion !== adAttributionConsentVersion ||
      !["gclid", "gbraid", "wbraid"].includes(String(value.clickIdType)) ||
      typeof value.clickId !== "string" || !/^[A-Za-z0-9_-]{1,512}$/u.test(value.clickId) ||
      typeof value.revocationToken !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(value.revocationToken) ||
      typeof value.landingPath !== "string" || value.landingPath.length > 300 || !/^\/[a-z0-9/_-]*$/iu.test(value.landingPath)) return null;
  const timestamps = [value.capturedAt, value.consentUpdatedAt];
  if (timestamps.some((time) => typeof time !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u.test(time) || !Number.isFinite(Date.parse(time)))) return null;
  const captured = Date.parse(value.capturedAt as string), consented = Date.parse(value.consentUpdatedAt as string);
  if (!Number.isFinite(now) || captured > now + 300_000 || captured < now - adAttributionLifetimeMs ||
      consented > captured || consented > now + 300_000) return null;
  return { version: adAttributionVersion, clickIdType: value.clickIdType as AdClickIdType, clickId: value.clickId,
    capturedAt: new Date(captured).toISOString(), landingPath: value.landingPath, consent: "granted",
    consentVersion: adAttributionConsentVersion, consentUpdatedAt: new Date(consented).toISOString(), revocationToken: value.revocationToken.toLowerCase() };
}
