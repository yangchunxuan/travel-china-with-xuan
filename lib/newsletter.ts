export const newsletterConsentVersion = "2026-09-06.1";

export function getNewsletterConfig() {
  return process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_ENABLED === "true" ? getNewsletterEndpoint() : null;
}

// Existing confirmation and withdrawal links remain usable when the popup is off.
export function getNewsletterEndpoint() {
  const endpoint = process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_API_URL ?? "";
  try {
    const url = new URL(endpoint);
    const secure = url.protocol === "https:" ||
      (process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(url.hostname));
    if (secure && !url.username && !url.password && !url.search && !url.hash) return { endpoint };
  } catch {}
  return null;
}

export type NewsletterResult = "pending" | "active" | "unsubscribed";
export async function postNewsletter(body: Record<string, unknown>): Promise<NewsletterResult> {
  const config = getNewsletterEndpoint();
  if (!config) throw new Error("unavailable");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(config.endpoint, {
      method: "POST", mode: "cors", credentials: "omit", referrerPolicy: "no-referrer",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), signal: controller.signal,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) throw new Error(response.status === 429 ? "rate-limit" : "request-failed");
    if (!["pending", "active", "unsubscribed"].includes(result?.status)) throw new Error("invalid-response");
    return result.status;
  } finally { clearTimeout(timeout); }
}
