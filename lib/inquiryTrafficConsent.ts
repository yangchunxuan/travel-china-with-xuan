import { getTrafficSessionToken } from "./analytics";
import { inquiryAdAttributionWithCurrentConsent } from "./googleAdsAttribution";

/** Preserve the business retry snapshot; only remove an obsolete optional link. */
export function inquiryBodyWithCurrentTrafficConsent(body: string) {
  const payload = JSON.parse(body) as Record<string, unknown>;
  let changed = false;
  if (payload.trafficSessionToken && payload.trafficSessionToken !== getTrafficSessionToken()) {
    payload.trafficSessionToken = null;
    changed = true;
  }
  if (payload.adAttribution && !inquiryAdAttributionWithCurrentConsent(payload.adAttribution)) {
    payload.adAttribution = null;
    changed = true;
  }
  return changed ? JSON.stringify(payload) : body;
}
