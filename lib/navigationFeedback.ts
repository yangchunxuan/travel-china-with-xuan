/**
 * Decides whether a click on a link is a page change the visitor should see
 * acknowledged (components/NavigationFeedback.tsx). Pure, so it is unit tested.
 *
 * "client": a Next.js <Link> took the click (it called preventDefault) and
 * the App Router will swap the page in place. "document": nothing cancelled
 * the click, so the browser loads a new document (plain <a>, e.g. the
 * English <-> Chinese/Korean switch). null: not a page change we answer.
 */
export type NavigationFeedbackMode = "client" | "document";

/** Links with these fragments open the planner card, sheet or panel instead of leaving the page. */
export const navigationFeedbackContactHashes: readonly string[] = [
  "#planner-contact",
  "#route-finder",
  "#planner-handoff",
];

/** Longer than any click handler takes unless a blocking confirm() was shown. */
export const navigationFeedbackBlockedHandlerMs = 250;

export type NavigationFeedbackClick = {
  href: string;
  currentHref: string;
  target: string;
  download: boolean;
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  defaultPrevented: boolean;
  handlerMs: number;
  contactTrigger: boolean;
};

export function classifyNavigationClick(
  click: NavigationFeedbackClick,
): NavigationFeedbackMode | null {
  if (click.button !== 0 || click.metaKey || click.ctrlKey || click.shiftKey || click.altKey) {
    return null;
  }
  if (click.download || (click.target !== "" && click.target !== "_self")) return null;

  let next: URL;
  let current: URL;
  try {
    next = new URL(click.href);
    current = new URL(click.currentHref);
  } catch {
    return null;
  }
  // Other sites, mailto:, tel: and javascript: links all have a different origin.
  if (next.origin !== current.origin) return null;
  // Same page, or only a different #fragment: the page scrolls, it does not change.
  // "/tours" and "/tours/" are one page (trailingSlash), so the line never
  // waits for a URL that is not going to change.
  if (withoutTrailingSlash(next.pathname) === withoutTrailingSlash(current.pathname) &&
      next.search === current.search) {
    return null;
  }
  if (click.contactTrigger || navigationFeedbackContactHashes.includes(next.hash)) return null;
  // A blocking dialog ran inside the click (the language switch asks before
  // discarding a draft). Whatever the visitor chose, it was an explicit decision.
  if (click.handlerMs > navigationFeedbackBlockedHandlerMs) return null;

  return click.defaultPrevented ? "client" : "document";
}

function withoutTrailingSlash(pathname: string) {
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
