export const guideTourEntryDismissedKey = "homeground-tour-entry-dismissed.v1";
export const guideTourEntrySeenKey = "homeground-tour-entry-seen.v1";
export const guideTourEntryDismissedAttribute = "data-homeground-tour-entry-dismissed";
export const guideTourEntrySeenAttribute = "data-homeground-tour-entry-seen";

/** Only an individual guide gets the promotion, never a hub, search or product page. */
export function guideTourEntryId(pathname: string | null): string | null {
  const match = pathname?.match(/^\/(?:zh\/|ko\/)?guides\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/u);
  if (!match || ["page", "search", "china-entry-requirements"].includes(match[1])) return null;
  return match[1];
}

// Run before the card is parsed so a dismissed card cannot flash on the next article.
// These flags describe only this tab's interface state; they carry no visitor identifier.
export const guideTourEntryBootstrap = `(()=>{try{const s=sessionStorage;const r=document.documentElement;r.toggleAttribute(${JSON.stringify(guideTourEntryDismissedAttribute)},s.getItem(${JSON.stringify(guideTourEntryDismissedKey)})==="true");r.toggleAttribute(${JSON.stringify(guideTourEntrySeenAttribute)},s.getItem(${JSON.stringify(guideTourEntrySeenKey)})==="true")}catch{}})();`;

export function readGuideTourEntryDismissed(): boolean {
  try {
    return sessionStorage.getItem(guideTourEntryDismissedKey) === "true";
  } catch {
    return false;
  }
}

export function markGuideTourEntrySeen(): void {
  try {
    const seen = sessionStorage.getItem(guideTourEntrySeenKey) === "true";
    document.documentElement.toggleAttribute(guideTourEntrySeenAttribute, seen);
    sessionStorage.setItem(guideTourEntrySeenKey, "true");
  } catch {
    // The catalog link remains available when storage is blocked.
  }
}

export function dismissGuideTourEntry(): void {
  document.documentElement.setAttribute(guideTourEntryDismissedAttribute, "true");
  try {
    sessionStorage.setItem(guideTourEntryDismissedKey, "true");
  } catch {
    // Still dismiss for the current document if the browser blocks storage.
  }
}
