// This queue contains only random withdrawal capabilities, never click or contact IDs.
export const googleAdsAttributionStorageKey = "homeground-google-ads-attribution.v1";
const pendingKey = "homeground-google-ads-withdrawals.v1";
const tokenPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;
let flushing: Promise<void> | null = null;

function pendingTokens(): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(pendingKey) ?? "[]");
    return Array.isArray(value) ? [...new Set(value.filter((token): token is string =>
      typeof token === "string" && tokenPattern.test(token)))].slice(-100) : [];
  } catch {
    return [];
  }
}

function withdrawalEndpoint() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL ?? "");
    if (url.protocol !== "https:" || url.hostname !== "xbymvlxethfzqcgyoieb.supabase.co" ||
      url.port || url.username || url.password || url.search || url.hash ||
      url.pathname.replace(/\/+$/u, "") !== "/functions/v1/v1-inquiries") return "";
    url.pathname = "/functions/v1/v1-ad-attribution-consent";
    return url.href;
  } catch {
    return "";
  }
}

/** Record the capability before erasing local click data, then attempt withdrawal. */
export function queueGoogleAdsAttributionWithdrawal() {
  if (typeof window === "undefined") return;
  let queued = false;
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(googleAdsAttributionStorageKey) ?? "null");
    const token = value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>).revocationToken : null;
    if (typeof token === "string" && tokenPattern.test(token)) {
      window.localStorage.setItem(pendingKey, JSON.stringify([...new Set([...pendingTokens(), token])].slice(-100)));
      queued = true;
    }
  } catch {
    // Local withdrawal must still complete when storage is unavailable.
  }
  if (queued) void flushGoogleAdsAttributionWithdrawals();
}

/** Necessary privacy requests do not require optional measurement permission. */
export function flushGoogleAdsAttributionWithdrawals(): Promise<void> {
  if (flushing) return flushing;
  if (typeof window === "undefined" || window.location.origin !== "https://homegroundchina.com") return Promise.resolve();
  const endpoint = withdrawalEndpoint();
  if (!endpoint) return Promise.resolve();
  const tokens = pendingTokens();
  if (!tokens.length) return Promise.resolve();
  flushing = (async () => {
    for (const revocationToken of tokens) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ revocationToken }),
          credentials: "omit",
          referrerPolicy: "no-referrer",
          keepalive: true,
          signal: controller.signal,
        });
        if (!response.ok) return;
        const remaining = pendingTokens().filter((token) => token !== revocationToken);
        if (remaining.length) window.localStorage.setItem(pendingKey, JSON.stringify(remaining));
        else window.localStorage.removeItem(pendingKey);
      } catch {
        return;
      } finally {
        clearTimeout(timeout);
      }
    }
  })().finally(() => { flushing = null; });
  return flushing;
}
