/**
 * Visit reference line ("Ref") for prepared contact messages.
 *
 * When a traveller opens one of Homeground's WhatsApp or email links, or
 * copies the prepared KakaoTalk text, the message can end with one short line
 * such as "Ref: guides/forbidden-city-for-foreign-visitors · google". It names
 * the page where the visit started and the kind of site that sent the
 * traveller, so a deal closed in a chat can be traced back to its page and
 * channel. The traveller sees the line before sending and can delete it.
 *
 * Rules (owner decision 2026-10-02, legal review the same day):
 * - Added only for visitors whose country is one where a notice is enough for
 *   this kind of non-identifying measurement: Korea, the United States,
 *   Singapore, Malaysia, Australia and Hong Kong. Everyone else, and anyone
 *   whose country cannot be determined, gets no line, and their referrer is
 *   never read.
 * - The country comes from Cloudflare's own `/cdn-cgi/trace` on this origin;
 *   the browser time zone is compared locally so that, for example, a visitor
 *   in mainland China or Europe behind a VPN is treated as strict.
 * - Global Privacy Control and automated browsers get no line.
 * - Nothing is written to cookies or storage. The landing page is held in
 *   memory for the life of the page; a full reload starts again.
 * - No identifier is created: the line is the same for everyone who arrived
 *   on the same page from the same kind of site.
 */

export const visitRefNoticeCountries = ["KR", "US", "SG", "MY", "AU", "HK"] as const;

const noticeCountries = new Set<string>(visitRefNoticeCountries);

// Time zones that point to a jurisdiction where this line needs consent
// (EU/EEA, UK, Switzerland, mainland China, Canada). A notice-country IP with
// one of these zones is treated as strict.
const strictTimeZonePatterns: readonly RegExp[] = [
  /^Europe\//,
  /^Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe)$/,
  /^Arctic\//,
  /^Asia\/(Shanghai|Urumqi|Chongqing|Chungking|Harbin|Kashgar)$/,
  /^PRC$/,
  /^Canada\//,
  /^America\/(Toronto|Montreal|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Moncton|Iqaluit|Whitehorse|Yellowknife|Glace_Bay|Goose_Bay|Swift_Current|Dawson|Dawson_Creek|Creston|Fort_Nelson|Rankin_Inlet|Resolute|Cambridge_Bay|Inuvik|Atikokan|Blanc-Sablon|Thunder_Bay|Nipigon|Rainy_River|Pangnirtung)$/,
];

export type VisitRegion = "notice" | "strict";

export function classifyVisitRegion({
  country,
  timeZone,
  globalPrivacyControl,
  automated,
}: {
  country: string | null;
  timeZone: string | null;
  globalPrivacyControl: boolean;
  automated: boolean;
}): VisitRegion {
  if (automated || globalPrivacyControl) return "strict";
  if (!country || !noticeCountries.has(country.toUpperCase())) return "strict";
  if (timeZone && strictTimeZonePatterns.some((pattern) => pattern.test(timeZone))) return "strict";
  return "notice";
}

/** Parse Cloudflare's `/cdn-cgi/trace` text body for the two-letter country. */
export function countryFromTrace(body: string): string | null {
  const match = /(?:^|\n)loc=([A-Z]{2})(?:\r?\n|$)/.exec(body);
  return match ? match[1] : null;
}

const sourceHosts: readonly [RegExp, string][] = [
  [/(^|\.)gemini\.google\.com$/, "gemini"],
  [/(^|\.)blog\.naver\.com$/, "naver-blog"],
  [/(^|\.)naver\.com$/, "naver"],
  [/(^|\.)google\.[a-z.]+$/, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)daum\.net$/, "daum"],
  [/(^|\.)yahoo\.[a-z.]+$/, "yahoo"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo"],
  [/(^|\.)baidu\.com$/, "baidu"],
  [/(^|\.)ecosia\.org$/, "ecosia"],
  [/(^|\.)yandex\.[a-z.]+$/, "yandex"],
  [/(^|\.)(chatgpt\.com|openai\.com)$/, "chatgpt"],
  [/(^|\.)perplexity\.ai$/, "perplexity"],
  [/(^|\.)copilot\.microsoft\.com$/, "copilot"],
  [/(^|\.)claude\.ai$/, "claude"],
  [/(^|\.)deepseek\.com$/, "deepseek"],
  [/(^|\.)(facebook\.com|fb\.com)$/, "facebook"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)threads\.(net|com)$/, "threads"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)(x\.com|twitter\.com|t\.co)$/, "x"],
  [/(^|\.)reddit\.com$/, "reddit"],
  [/(^|\.)tripadvisor\.[a-z.]+$/, "tripadvisor"],
  [/(^|\.)kakao\.com$/, "kakao"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "linkedin"],
  [/(^|\.)(xiaohongshu\.com|xhslink\.com)$/, "xiaohongshu"],
];

const utmAliases: Readonly<Record<string, string>> = {
  "chatgpt.com": "chatgpt",
  "openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
};

/** The kind of site that sent the visitor, from the referrer and landing UTM. */
export function visitSourceLabel({
  referrer,
  utmSource,
  ownHost,
}: {
  referrer: string;
  utmSource: string | null;
  ownHost: string;
}): string {
  const utm = utmSource?.trim().toLowerCase() ?? "";
  if (utm && /^[a-z0-9._-]{1,32}$/.test(utm)) return utmAliases[utm] ?? `utm:${utm}`;
  if (!referrer) return "direct";
  let host: string;
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return "other";
  }
  if (host === ownHost.toLowerCase()) return "site";
  for (const [pattern, label] of sourceHosts) if (pattern.test(host)) return label;
  return "other";
}

const pathPattern = /^\/[A-Za-z0-9/_-]{0,160}$/;

/** "guides/forbidden-city-for-foreign-visitors" (en) or "zh/guides/…"; "/" → "home". */
export function visitPageTag(path: string | null): string | null {
  if (!path || !pathPattern.test(path)) return null;
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed || "home";
}

export function visitRefLine(pageTag: string | null, source: string): string | null {
  return pageTag ? `Ref: ${pageTag} · ${source}` : null;
}

const refMarker = /\n\nRef: [^\n]*$/;

/** Append the line once; a second call (another click) leaves the text as it is. */
export function appendVisitRef(text: string, line: string | null): string {
  if (!line || refMarker.test(text)) return text;
  return `${text}\n\n${line}`;
}

/**
 * Rewrite a WhatsApp (wa.me/<number>?text=) or mailto (<email>?…&body=) link
 * so its prepared text ends with the line. Other links are returned unchanged.
 */
export function appendVisitRefToContactHref(
  href: string,
  line: string | null,
  { whatsappNumber, email }: { whatsappNumber: string; email: string },
): string {
  if (!line) return href;
  const whatsapp = /^https:\/\/wa\.me\/(\d{7,15})\?text=([^&#]*)$/.exec(href);
  if (whatsapp && whatsapp[1] === whatsappNumber) {
    let text: string;
    try {
      text = decodeURIComponent(whatsapp[2]);
    } catch {
      return href;
    }
    return `https://wa.me/${whatsapp[1]}?text=${encodeURIComponent(appendVisitRef(text, line))}`;
  }
  const mail = /^mailto:([^?]+)\?(.*)$/i.exec(href);
  if (mail && mail[1].toLowerCase() === email.toLowerCase()) {
    const parts = mail[2].split("&");
    const index = parts.findIndex((part) => part.toLowerCase().startsWith("body="));
    if (index < 0) return href;
    let body: string;
    try {
      body = decodeURIComponent(parts[index].slice(5));
    } catch {
      return href;
    }
    parts[index] = `body=${encodeURIComponent(appendVisitRef(body, line))}`;
    return `mailto:${mail[1]}?${parts.join("&")}`;
  }
  return href;
}

// ---------------------------------------------------------------------------
// Browser state (memory only)

const automatedAgent = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|gptbot|yeti|petalbot|bytespider/i;

interface VisitState {
  landingPath: string | null;
  utmSource: string | null;
  region: VisitRegion | null;
  line: string | null;
}

const state: VisitState = { landingPath: null, utmSource: null, region: null, line: null };
let started = false;

function captureLanding() {
  if (typeof window === "undefined" || state.landingPath !== null) return;
  // Our own page address only; the referrer is read later, and only in a
  // notice region.
  state.landingPath = window.location.pathname;
  try {
    state.utmSource = new URL(window.location.href).searchParams.get("utm_source");
  } catch {
    state.utmSource = null;
  }
}

// Capture on first evaluation so client-side navigation keeps the landing
// page of this visit.
captureLanding();

function localRegionOverride(): string | null {
  const host = window.location.hostname;
  if (host !== "localhost" && host !== "127.0.0.1") return null;
  const value = new URL(window.location.href).searchParams.get("hg_region");
  return value && /^[A-Z]{2}$/.test(value) ? value : null;
}

async function detectCountry(): Promise<string | null> {
  const override = localRegionOverride();
  if (override) return override;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 2000);
  try {
    const response = await fetch("/cdn-cgi/trace", { cache: "no-store", credentials: "omit", signal: controller.signal });
    if (!response.ok) return null;
    return countryFromTrace(await response.text());
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

function buildLine() {
  const ownHost = window.location.hostname;
  const referrer = document.referrer;
  // A full page load from another Homeground page: the page before this one
  // says more about where the visit started than the current page does.
  let sameSitePath: string | null = null;
  try {
    if (referrer && new URL(referrer).hostname === ownHost) sameSitePath = new URL(referrer).pathname;
  } catch {
    sameSitePath = null;
  }
  if (sameSitePath) return visitRefLine(visitPageTag(sameSitePath), "site");
  return visitRefLine(
    visitPageTag(state.landingPath),
    visitSourceLabel({ referrer, utmSource: state.utmSource, ownHost }),
  );
}

/** The line for this visit, or null (strict region, unknown, or not ready). */
export function currentVisitRefLine(): string | null {
  return state.region === "notice" ? state.line : null;
}

function rewriteClickedContactLink(event: MouseEvent) {
  const line = currentVisitRefLine();
  if (!line) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return;
  const href = anchor.getAttribute("href") ?? "";
  const next = appendVisitRefToContactHref(href, line, contactTargets());
  if (next !== href) anchor.setAttribute("href", next);
}

let contactTargetsValue: { whatsappNumber: string; email: string } = { whatsappNumber: "", email: "" };
function contactTargets() {
  return contactTargetsValue;
}

/**
 * Start region detection and rewrite clicked contact links. Idempotent; the
 * capture-phase listener runs before React's handlers, so the desktop contact
 * card reads the rewritten link.
 */
export function startVisitRef(targets: { whatsappNumber: string; email: string }) {
  if (typeof window === "undefined" || started) return;
  started = true;
  contactTargetsValue = targets;
  captureLanding();
  const automated =
    automatedAgent.test(navigator.userAgent) ||
    (navigator as Navigator & { webdriver?: boolean }).webdriver === true;
  const globalPrivacyControl =
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
  let timeZone: string | null = null;
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    timeZone = null;
  }
  document.addEventListener("click", rewriteClickedContactLink, true);
  if (automated || globalPrivacyControl) {
    state.region = "strict";
    return;
  }
  void detectCountry().then((country) => {
    state.region = classifyVisitRegion({ country, timeZone, globalPrivacyControl, automated });
    if (state.region === "notice") state.line = buildLine();
  });
}
