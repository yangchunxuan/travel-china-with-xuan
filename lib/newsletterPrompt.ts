export const newsletterPromptDelayMs = 10_000;
export const newsletterPromptStorageKey = "homeground-newsletter-prompt.v1";
export const newsletterJoinedStorageKey = "homeground-newsletter-joined.v1";
export const newsletterPromptChangedEvent = "homeground:newsletter-prompt-changed";
export const newsletterOpenEvent = "homeground:open-newsletter";

type PromptState = { dueAt: number; handled: boolean };
let memoryState: PromptState | null = null;
let memoryJoined = false;

export function newsletterPageEligible(pathname: string | null): boolean {
  const path = pathname?.replace(/^\/(zh|ko)(?=\/|$)/, "") || "/";
  return path === "/" || /^\/(guides|tours|explore|studio|services)(\/|$)/.test(path);
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

/** Called only by an explicit Cookie choice, never by reading old preferences. */
export function armNewsletterPrompt(now = Date.now()): void {
  if (newsletterAlreadyJoined() || readNewsletterPrompt()) return;
  savePrompt({ dueAt: now + newsletterPromptDelayMs, handled: false });
}

export function markNewsletterPromptHandled(): void {
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
