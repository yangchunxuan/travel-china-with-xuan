export const newsletterPromptDelayMs = 10_000;
export const newsletterPromptStorageKey = "homeground-newsletter-prompt.v1";
export const newsletterJoinedStorageKey = "homeground-newsletter-joined.v1";
export const newsletterPromptChangedEvent = "homeground:newsletter-prompt-changed";
export const newsletterOpenEvent = "homeground:open-newsletter";
export const newsletterLanguageTransferStorageKey = "homeground-newsletter-language-transfer.v1";
export const newsletterLanguageTransferEvent = "homeground:newsletter-language-transfer";
const languageTransferLifetimeMs = 30_000;

type PromptState = { dueAt: number; handled: boolean };
let memoryState: PromptState | null = null;
let memoryJoined = false;
let returningVisitChecked = false;
type LanguageTransfer = { pathname: string; expanded: boolean; expiresAt: number };
let memoryLanguageTransfer: LanguageTransfer | null = null;
let languageTransferCleared = false;

export function newsletterPageEligible(pathname: string | null): boolean {
  const path = pathname?.replace(/^\/(zh|ko)(?=\/|$)/, "") || "/";
  return path === "/" || /^\/(guides|tours|explore|studio|services)(\/|$)/.test(path);
}

/** Phones, upright (under 48 rem wide) or sideways (under 30 rem tall). Wider screens keep the original timing. */
export const newsletterPhoneQuery = "(max-width: 47.99rem), (max-height: 30rem)";
/** On a guide, a phone reader is about halfway down before the card may open by itself. */
export const newsletterGuideScrollShare = 0.5;
/** A quote button or a price inside the page; the header's own planner link is outside main and does not count. */
export const newsletterQuoteAreaSelector = [
  'main a[href*="#planner-contact"]',
  'main a[href*="?tour="]',
  'main a[href*="&tour="]',
  'main a[href$="#contact"]',
  "main [data-contact-tour]",
  'main [class*="_price"]',
  'main [class*="Price__"]',
].join(", ");

export type NewsletterPageKind = "tour" | "guide" | "other";
const tourCollectionPaths = new Set(["multi-city", "regions", "seasonal", "page"]);

/** A single tour's page, a single guide, or anything else (home, hubs, collections, studio, services). */
export function newsletterPageKind(pathname: string | null): NewsletterPageKind {
  const path = pathname?.replace(/^\/(zh|ko)(?=\/|$)/, "") || "/";
  const tour = /^\/tours\/([a-z0-9-]+)\/?$/.exec(path)?.[1];
  if (tour && !tourCollectionPaths.has(tour)) return "tour";
  const guide = /^\/guides\/([a-z0-9-]+)\/?$/.exec(path)?.[1];
  return guide && guide !== "page" ? "guide" : "other";
}

/**
 * Whether the newsletter card may open by itself right now (mobile audit
 * F06). Wider screens keep the original timing. On phones it never opens on
 * a tour's own page, never while a quote button or a price is on screen,
 * and on a guide only once the reader is about halfway down. The launcher
 * and every manual way to open the card are unchanged.
 */
export function newsletterAutoOpenAllowed({ phone, kind, scrollShare, quoteAreaVisible }: {
  phone: boolean;
  kind: NewsletterPageKind;
  scrollShare: number;
  quoteAreaVisible: boolean;
}): boolean {
  if (!phone) return true;
  if (kind === "tour" || quoteAreaVisible) return false;
  return kind !== "guide" || scrollShare >= newsletterGuideScrollShare;
}

export function readNewsletterPrompt(): PromptState | null {
  try {
    const raw = sessionStorage.getItem(newsletterPromptStorageKey);
    if (raw) {
      const value = JSON.parse(raw);
      if (Number.isFinite(value?.dueAt) && value.dueAt > 0 && typeof value.handled === "boolean") {
        memoryState = { dueAt: value.dueAt, handled: value.handled };
      }
    }
  } catch { /* Keep the current document usable when storage is blocked. */ }
  return memoryState;
}

export function newsletterAlreadyJoined(): boolean {
  try { memoryJoined ||= localStorage.getItem(newsletterJoinedStorageKey) === "true"; } catch {}
  return memoryJoined;
}

function savePrompt(state: PromptState): void {
  memoryState = state;
  try { sessionStorage.setItem(newsletterPromptStorageKey, JSON.stringify(state)); } catch {}
  if (typeof window !== "undefined") window.dispatchEvent(new Event(newsletterPromptChangedEvent));
}

/** Check once on arrival, using the existing Consent reader's validated result.
 * An in-progress first-choice countdown always wins over returning-visitor UI. */
export function restoreReturningNewsletterLauncher(hasStoredConsent: boolean, now = Date.now()): void {
  if (returningVisitChecked) return;
  returningVisitChecked = true;
  if ((!hasStoredConsent && !newsletterAlreadyJoined()) || readNewsletterPrompt()) return;
  // This is only tab-local UI state. It neither creates a Cookie choice nor
  // starts a timer, changes consent, or implies a confirmed subscription.
  savePrompt({ dueAt: Math.max(1, now), handled: true });
}

/** Called only by an explicit Cookie choice, never by reading old preferences. */
export function armNewsletterPrompt(now = Date.now()): void {
  if (newsletterAlreadyJoined() || readNewsletterPrompt()) return;
  savePrompt({ dueAt: now + newsletterPromptDelayMs, handled: false });
}

export function markNewsletterPromptHandled(): void {
  clearNewsletterLanguageTransfer();
  savePrompt({ dueAt: readNewsletterPrompt()?.dueAt ?? Date.now(), handled: true });
}

export function markNewsletterJoined(): void {
  memoryJoined = true;
  try { localStorage.setItem(newsletterJoinedStorageKey, "true"); } catch {}
  markNewsletterPromptHandled();
}

export function openNewsletter(): void {
  window.dispatchEvent(new Event(newsletterOpenEvent));
}

export function newsletterDelayRemaining(now = Date.now()): number | null {
  const state = readNewsletterPrompt();
  if (!state || state.handled || newsletterAlreadyJoined()) return null;
  return Math.max(0, state.dueAt - now);
}

/** Manual entry stays available after joining; joining suppresses only automatic prompts. */
export function newsletterLauncherAvailable(pathname: string | null): boolean {
  return newsletterPageEligible(pathname) && readNewsletterPrompt()?.handled === true;
}

function languageTransferPath(pathname: unknown): string | null {
  if (typeof pathname !== "string" || pathname.length > 512 ||
      !pathname.startsWith("/") || pathname.startsWith("//") || /[?#\\\s]/.test(pathname) ||
      !newsletterPageEligible(pathname)) return null;
  return pathname.replace(/\/+$/, "") || "/";
}

export function clearNewsletterLanguageTransfer(): void {
  memoryLanguageTransfer = null;
  languageTransferCleared = true;
  try { sessionStorage.removeItem(newsletterLanguageTransferStorageKey); } catch {}
}

/** Carries only visible UI state through an intentional, same-tab language link. */
export function requestNewsletterLanguageTransfer(pathname: string): void {
  clearNewsletterLanguageTransfer();
  const path = languageTransferPath(pathname);
  if (!path || newsletterAlreadyJoined()) return;
  window.dispatchEvent(new CustomEvent(newsletterLanguageTransferEvent, { detail: { pathname: path } }));
}

export function saveNewsletterLanguageTransfer(pathname: string, expanded: boolean, now = Date.now()): void {
  clearNewsletterLanguageTransfer();
  const path = languageTransferPath(pathname);
  if (!path || typeof expanded !== "boolean" || !Number.isFinite(now) || newsletterAlreadyJoined()) return;
  memoryLanguageTransfer = { pathname: path, expanded, expiresAt: now + languageTransferLifetimeMs };
  languageTransferCleared = false;
  try { sessionStorage.setItem(newsletterLanguageTransferStorageKey, JSON.stringify(memoryLanguageTransfer)); } catch {}
}

/** Consume once on arrival; only a short-lived, matching language destination can resume. */
export function consumeNewsletterLanguageTransfer(pathname: string | null, now = Date.now()): { expanded: boolean } | null {
  let value: unknown = memoryLanguageTransfer;
  try {
    const raw = languageTransferCleared ? null : sessionStorage.getItem(newsletterLanguageTransferStorageKey);
    if (raw) {
      try { value = JSON.parse(raw); } catch { value = null; }
    }
  } catch { /* Memory fallback is limited to this document; no cross-page tracking fallback. */ }
  clearNewsletterLanguageTransfer();
  if (!value || typeof value !== "object" || !Number.isFinite(now) || newsletterAlreadyJoined()) return null;
  const transfer = value as Partial<LanguageTransfer>;
  const path = languageTransferPath(pathname);
  if (!path || transfer.pathname !== path || typeof transfer.expanded !== "boolean" ||
      typeof transfer.expiresAt !== "number" || !Number.isFinite(transfer.expiresAt) || transfer.expiresAt <= now ||
      transfer.expiresAt > now + languageTransferLifetimeMs) return null;
  return { expanded: transfer.expanded };
}
