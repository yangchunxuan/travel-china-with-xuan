import { getTrafficSessionToken } from "./analytics";

/** Preserve the business retry snapshot; only remove an obsolete optional link. */
export function inquiryBodyWithCurrentTrafficConsent(body: string) {
  const payload = JSON.parse(body) as Record<string, unknown>;
  if (!payload.trafficSessionToken || payload.trafficSessionToken === getTrafficSessionToken()) return body;
  return JSON.stringify({ ...payload, trafficSessionToken: null });
}
