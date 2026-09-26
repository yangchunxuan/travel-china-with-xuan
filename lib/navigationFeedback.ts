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
  // "/tours" and "/tours/" are one page (trailingSlash), so the loader never
  // waits for a URL that is not going to change.
  if (samePage(next, current)) return null;
  if (click.contactTrigger || navigationFeedbackContactHashes.includes(next.hash)) return null;
  // A blocking dialog ran inside the click (the language switch asks before
  // discarding a draft). Whatever the visitor chose, it was an explicit decision.
  if (click.handlerMs > navigationFeedbackBlockedHandlerMs) return null;

  return click.defaultPrevented ? "client" : "document";
}

/**
 * The loader. Nothing is drawn until the next page has kept the visitor
 * waiting this long (a CSS transition-delay), so fast pages stay instant.
 */
export const navigationLoaderDelayMs = 220;
/** The count eases out to its ceiling over this long, then holds until the page arrives. */
export const navigationLoaderCountMs = 1500;
/** Where the count waits; arrival completes it to 100. */
export const navigationLoaderCeiling = 90;

/**
 * The number shown (and the share of the top line drawn) `elapsedMs` after
 * the click: 0 through the delay, then a quick cubic ease-out to 90.
 */
export function navigationLoaderCount(elapsedMs: number): number {
  const running = elapsedMs - navigationLoaderDelayMs;
  if (!(running > 0)) return 0;
  const t = Math.min(running / navigationLoaderCountMs, 1);
  return Math.round(navigationLoaderCeiling * (1 - (1 - t) ** 3));
}

/**
 * Prefetching, so the loader rarely shows. The App Router can only prefetch
 * pages it swaps in place: pages under the same root layout. English pages
 * and /zh/ or /ko/ pages use different root layouts, so a link between them
 * is always a full document load and an App Router prefetch cannot help it.
 */
export type NavigationPrefetchLink = {
  href: string;
  currentHref: string;
  target: string;
  download: boolean;
  contactTrigger: boolean;
};

/** The path to hand to router.prefetch() for a link, or null when a prefetch cannot help. */
export function navigationPrefetchHref(link: NavigationPrefetchLink): string | null {
  if (link.download || (link.target !== "" && link.target !== "_self")) return null;
  let next: URL;
  let current: URL;
  try {
    next = new URL(link.href);
    current = new URL(link.currentHref);
  } catch {
    return null;
  }
  if (next.origin !== current.origin) return null;
  if (samePage(next, current)) return null;
  if (link.contactTrigger || navigationFeedbackContactHashes.includes(next.hash)) return null;
  if (rootLayoutOf(next.pathname) !== rootLayoutOf(current.pathname)) return null;
  return `${next.pathname}${next.search}`;
}

/**
 * Which App Router prefetch a link needs. A <Link> prefetches with "auto",
 * which the router files under the path alone; for a link with a query (tour
 * cards carry ?package=&travelers=) a navigation treats that entry as a
 * stand-in and fetches the page again. A "full" prefetch is filed under the
 * exact URL, so the click that follows is instant. Links without a query
 * share the <Link>'s own "auto" entry, so nothing is fetched twice.
 */
export function navigationPrefetchKind(href: string): "auto" | "full" {
  return href.includes("?") ? "full" : "auto";
}

/**
 * What pointing at, touching or focusing a link prefetches. Every visible
 * <Link> without a query is already prefetched by Next.js in a form its click
 * uses, so only links with a query need one (see navigationPrefetchKind).
 */
export function navigationIntentPrefetchHref(link: NavigationPrefetchLink): string | null {
  const href = navigationPrefetchHref(link);
  return href && navigationPrefetchKind(href) === "full" ? href : null;
}

/** At most this many pages are prefetched while the browser is idle. */
export const navigationIdlePrefetchLimit = 3;

/**
 * The likeliest next pages, prefetched once the browser is idle after load.
 * Only the homepages have any: on a tour or guide page the likely next pages
 * are the links on screen, which Next.js already prefetches as they appear.
 */
export function navigationIdlePrefetchHrefs(pathname: string): string[] {
  const home = /^\/(?:(zh|ko)\/?)?$/.exec(pathname);
  if (!home) return [];
  const prefix = home[1] ? `/${home[1]}` : "";
  return [`${prefix}/tours/`, `${prefix}/guides/`].slice(0, navigationIdlePrefetchLimit);
}

/** navigator.connection, where the browser has it (Chromium). */
export type NavigationPrefetchConnection = {
  saveData?: boolean;
  effectiveType?: string;
};

/** No speculative downloads when the visitor asked to save data or is on a 2G-class connection. */
export function navigationPrefetchAllowed(connection?: NavigationPrefetchConnection | null) {
  if (!connection) return true;
  if (connection.saveData === true) return false;
  return connection.effectiveType !== "2g" && connection.effectiveType !== "slow-2g";
}

/**
 * Speculation Rules (Chromium) for the one common full document load: the
 * language switch between English and Chinese/Korean, which crosses root
 * layouts. The next document is fetched when the visitor hovers the switch or
 * presses on it ("moderate"). Prefetch only: nothing is prerendered, so no
 * page script (analytics included) runs before the visitor arrives. Links
 * between Chinese and Korean stay App Router changes, prefetched by <Link>.
 */
export function navigationDocumentPrefetchRules(locale: string) {
  const selector = locale === "en" ? 'a[hreflang="zh-Hans"], a[hreflang="ko"]' : 'a[hreflang="en"]';
  return {
    prefetch: [{ source: "document", where: { selector_matches: selector }, eagerness: "moderate" }],
  };
}

/**
 * The page whose RSC payload a resource was ("/tours/" is served from
 * "/tours/index.txt" in the static export), or null for anything else.
 * Tells which pages Next.js has already prefetched, from resource timing.
 */
export function navigationPrefetchedPagePath(resourceUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(resourceUrl);
  } catch {
    return null;
  }
  return url.pathname.endsWith("/index.txt")
    ? url.pathname.slice(0, -"index.txt".length)
    : null;
}

function rootLayoutOf(pathname: string) {
  return /^\/(?:zh|ko)(?:\/|$)/.test(pathname) ? "localized" : "en";
}

function samePage(next: URL, current: URL) {
  return withoutTrailingSlash(next.pathname) === withoutTrailingSlash(current.pathname) &&
    next.search === current.search;
}

function withoutTrailingSlash(pathname: string) {
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
