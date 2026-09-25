import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  classifyNavigationClick,
  navigationDocumentPrefetchRules,
  navigationIdlePrefetchHrefs,
  navigationIdlePrefetchLimit,
  navigationIntentPrefetchHref,
  navigationLoaderCeiling,
  navigationLoaderCount,
  navigationLoaderCountMs,
  navigationLoaderDelayMs,
  navigationPrefetchAllowed,
  navigationPrefetchedPagePath,
  navigationPrefetchHref,
  navigationPrefetchKind,
} from "../../lib/navigationFeedback.ts";

const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const here = "https://homegroundchina.com/tours/";
const click = (overrides = {}) => ({
  href: "https://homegroundchina.com/guides/",
  currentHref: here,
  target: "",
  download: false,
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  defaultPrevented: true,
  handlerMs: 3,
  contactTrigger: false,
  ...overrides,
});
const link = (overrides = {}) => ({
  href: "https://homegroundchina.com/guides/",
  currentHref: here,
  target: "",
  download: false,
  contactTrigger: false,
  ...overrides,
});
const rule = (css, selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`(?:^|\\n)${escaped} \\{([^}]*)\\}`).exec(css);
  assert.ok(match, `missing rule ${selector}`);
  return match[1];
};

test("a Next.js link and a plain link to another page are both answered", () => {
  assert.equal(classifyNavigationClick(click()), "client");
  assert.equal(classifyNavigationClick(click({ defaultPrevented: false, href: "https://homegroundchina.com/zh/tours/" })), "document");
  assert.equal(classifyNavigationClick(click({ href: "https://homegroundchina.com/tours/?package=standard-guided" })), "client");
  assert.equal(classifyNavigationClick(click({ href: "https://homegroundchina.com/#faq" })), "client");
});

test("clicks that do not leave the page are left alone", () => {
  assert.equal(classifyNavigationClick(click({ href: here })), null);
  assert.equal(classifyNavigationClick(click({ href: `${here}#tour-list` })), null);
  assert.equal(classifyNavigationClick(click({ href: "https://homegroundchina.com/tours" })), null);
  assert.equal(classifyNavigationClick(click({ href: "https://homegroundchina.com/#planner-contact" })), null);
  assert.equal(classifyNavigationClick(click({ href: "https://homegroundchina.com/?tour=x&package=y#planner-contact" })), null);
  assert.equal(classifyNavigationClick(click({ href: "https://homegroundchina.com/#route-finder" })), null);
  assert.equal(classifyNavigationClick(click({ contactTrigger: true })), null);
  assert.equal(classifyNavigationClick(click({ handlerMs: 900 })), null);
});

test("new tabs, downloads and other sites keep the browser's own behaviour", () => {
  for (const extra of [{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    assert.equal(classifyNavigationClick(click(extra)), null, JSON.stringify(extra));
  }
  assert.equal(classifyNavigationClick(click({ target: "_blank" })), null);
  assert.equal(classifyNavigationClick(click({ target: "_self" })), "client");
  assert.equal(classifyNavigationClick(click({ download: true })), null);
  assert.equal(classifyNavigationClick(click({ href: "https://wa.me/8613174215999" })), null);
  assert.equal(classifyNavigationClick(click({ href: "mailto:hello@example.com" })), null);
  assert.equal(classifyNavigationClick(click({ href: "not a url" })), null);
});

test("the count waits out the delay, rises quickly to 90 and holds there", () => {
  assert.equal(navigationLoaderDelayMs, 220);
  assert.equal(navigationLoaderCeiling, 90);
  assert.equal(navigationLoaderCount(0), 0);
  assert.equal(navigationLoaderCount(navigationLoaderDelayMs), 0);
  assert.equal(navigationLoaderCount(Number.NaN), 0);
  // Ease-out: half the way within the first fifth of the run.
  assert.ok(navigationLoaderCount(navigationLoaderDelayMs + navigationLoaderCountMs / 5) >= 40);
  assert.equal(navigationLoaderCount(navigationLoaderDelayMs + navigationLoaderCountMs), 90);
  assert.equal(navigationLoaderCount(60_000), 90);
  let previous = 0;
  for (let ms = 0; ms <= 2_000; ms += 16) {
    const value = navigationLoaderCount(ms);
    assert.ok(Number.isInteger(value) && value >= previous && value <= 90, `${ms}ms -> ${value}`);
    previous = value;
  }
});

test("intent prefetch only asks for pages the App Router can swap in place", () => {
  assert.equal(navigationPrefetchHref(link()), "/guides/");
  assert.equal(
    navigationPrefetchHref(link({ href: "https://homegroundchina.com/tours/beijing-highlights-5-day-private-tour/?package=standard-guided" })),
    "/tours/beijing-highlights-5-day-private-tour/?package=standard-guided",
  );
  assert.equal(navigationPrefetchHref(link({ href: "https://homegroundchina.com/#faq" })), "/");
  // zh <-> ko share the localized root layout.
  assert.equal(
    navigationPrefetchHref(link({ href: "https://homegroundchina.com/ko/tours/", currentHref: "https://homegroundchina.com/zh/tours/" })),
    "/ko/tours/",
  );
  // English <-> Chinese/Korean is always a full document load.
  assert.equal(navigationPrefetchHref(link({ href: "https://homegroundchina.com/zh/tours/" })), null);
  assert.equal(navigationPrefetchHref(link({ href: "https://homegroundchina.com/tours/", currentHref: "https://homegroundchina.com/ko/tours/" })), null);
  // Same page, hash links, contact links, other sites, new tabs, downloads.
  assert.equal(navigationPrefetchHref(link({ href: here })), null);
  assert.equal(navigationPrefetchHref(link({ href: `${here}#tour-list` })), null);
  assert.equal(navigationPrefetchHref(link({ href: "https://homegroundchina.com/#planner-contact" })), null);
  assert.equal(navigationPrefetchHref(link({ href: "https://homegroundchina.com/?tour=x#planner-contact" })), null);
  assert.equal(navigationPrefetchHref(link({ contactTrigger: true })), null);
  assert.equal(navigationPrefetchHref(link({ href: "https://wa.me/8613174215999" })), null);
  assert.equal(navigationPrefetchHref(link({ href: "mailto:hello@example.com" })), null);
  assert.equal(navigationPrefetchHref(link({ target: "_blank" })), null);
  assert.equal(navigationPrefetchHref(link({ download: true })), null);
  assert.equal(navigationPrefetchHref(link({ href: "not a url" })), null);
});

test("a link with a query gets an exact-URL prefetch; others share the <Link>'s own", () => {
  assert.equal(navigationPrefetchKind("/tours/beijing-highlights-5-day-private-tour/?package=standard-guided&travelers=4"), "full");
  assert.equal(navigationPrefetchKind("/guides/search/?q=Zhangjiajie"), "full");
  assert.equal(navigationPrefetchKind("/guides/china-10-day-itinerary/"), "auto");
  assert.equal(navigationPrefetchKind("/"), "auto");
  for (const href of navigationIdlePrefetchHrefs("/")) assert.equal(navigationPrefetchKind(href), "auto", href);
  // On intent only links with a query are prefetched: <Link> already covers the rest.
  const card = "https://homegroundchina.com/tours/beijing-highlights-5-day-private-tour/?package=standard-guided&travelers=4";
  assert.equal(navigationIntentPrefetchHref(link({ href: card })), "/tours/beijing-highlights-5-day-private-tour/?package=standard-guided&travelers=4");
  assert.equal(navigationIntentPrefetchHref(link()), null);
  assert.equal(navigationIntentPrefetchHref(link({ href: `${card}#planner-contact`, contactTrigger: true })), null);
  assert.equal(navigationIntentPrefetchHref(link({ href: "https://homegroundchina.com/zh/tours/?package=x" })), null);
  assert.equal(navigationIntentPrefetchHref(link({ href: "https://example.com/?a=b" })), null);
});

test("idle prefetch is for the homepages only, at most three pages, in their language", () => {
  assert.deepEqual(navigationIdlePrefetchHrefs("/"), ["/tours/", "/guides/"]);
  assert.deepEqual(navigationIdlePrefetchHrefs("/zh/"), ["/zh/tours/", "/zh/guides/"]);
  assert.deepEqual(navigationIdlePrefetchHrefs("/zh"), ["/zh/tours/", "/zh/guides/"]);
  assert.deepEqual(navigationIdlePrefetchHrefs("/ko/"), ["/ko/tours/", "/ko/guides/"]);
  for (const path of ["/tours/", "/zh/tours/", "/guides/", "/guides/china-10-day-itinerary/", "/tours/beijing-highlights-5-day-private-tour/", "/zhangjiajie/", ""]) {
    assert.deepEqual(navigationIdlePrefetchHrefs(path), [], path);
  }
  assert.ok(navigationIdlePrefetchLimit <= 3);
});

test("nothing is prefetched speculatively on Save-Data or 2G", () => {
  assert.equal(navigationPrefetchAllowed(undefined), true);
  assert.equal(navigationPrefetchAllowed({ effectiveType: "4g" }), true);
  assert.equal(navigationPrefetchAllowed({ effectiveType: "3g", saveData: false }), true);
  assert.equal(navigationPrefetchAllowed({ effectiveType: "4g", saveData: true }), false);
  assert.equal(navigationPrefetchAllowed({ effectiveType: "2g" }), false);
  assert.equal(navigationPrefetchAllowed({ effectiveType: "slow-2g" }), false);
});

test("Speculation Rules prefetch only the language switch's full document load, never prerender", () => {
  const en = navigationDocumentPrefetchRules("en");
  assert.deepEqual(Object.keys(en), ["prefetch"]);
  assert.deepEqual(en.prefetch, [{ source: "document", where: { selector_matches: 'a[hreflang="zh-Hans"], a[hreflang="ko"]' }, eagerness: "moderate" }]);
  // Chinese <-> Korean is an App Router change inside one root layout; only English is a document load.
  for (const locale of ["zh", "ko"]) {
    assert.deepEqual(navigationDocumentPrefetchRules(locale).prefetch[0].where, { selector_matches: 'a[hreflang="en"]' });
  }
});

test("pages Next.js already prefetched are recognised from their payload requests", () => {
  assert.equal(navigationPrefetchedPagePath("https://homegroundchina.com/tours/x/index.txt?_rsc=1a2b"), "/tours/x/");
  assert.equal(navigationPrefetchedPagePath("https://homegroundchina.com/tours/x/index.txt?package=y&_rsc=1"), "/tours/x/");
  assert.equal(navigationPrefetchedPagePath("https://homegroundchina.com/index.txt"), "/");
  assert.equal(navigationPrefetchedPagePath("https://homegroundchina.com/_next/static/chunks/app.js"), null);
  assert.equal(navigationPrefetchedPagePath("https://homegroundchina.com/robots.txt"), null);
  assert.equal(navigationPrefetchedPagePath("not a url"), null);
});

test("every public page mounts the loader once, without moving the contact card", async () => {
  for (const path of ["app/(default)/layout.tsx", "app/(localized)/[locale]/layout.tsx"]) {
    const layout = await source(path);
    assert.match(layout, /\{children\}\s*<NavigationFeedback locale=\{?[^/]+\/>\s*<AnalyticsConsent/, path);
    assert.equal(layout.match(/<NavigationFeedback /g)?.length, 1, path);
    assert.match(layout, /<TourContactPanel locale=\{?[^/]+\/>\s*<ContactCardHost locale=/, path);
  }
  assert.doesNotMatch(await source("app/(admin)/layout.tsx"), /NavigationFeedback/);
});

test("the loader waits 220ms, then whitens the page under the header with a count and a line", async () => {
  const [css, globals, header] = await Promise.all([
    source("components/NavigationFeedback.module.css"),
    source("app/globals.css"),
    source("components/HomegroundHeader.module.css"),
  ]);
  // The chosen link answers at once; in the desktop header the underline moves to it.
  assert.match(globals, /a\[data-hg-nav-pressed\] \{\s*opacity: 0\.72;\s*\}/);
  assert.match(header, /\.desktopNav a\[data-active="true"\]::after,\s*\.desktopNav a\[data-hg-nav-pressed\]::after \{/);
  assert.match(header, /\.desktopNav:has\(a\[data-hg-nav-pressed\]\) a:not\(\[data-hg-nav-pressed\]\)::after \{\s*visibility: hidden;/);

  const veil = rule(css, ".veil");
  assert.match(veil, /background: rgb\(255 255 255 \/ 92%\);/);
  assert.match(veil, /z-index: 99;/, "under the header (z-index 100)");
  const count = rule(css, ".count");
  assert.match(count, /font-family: var\(--hg-font-editorial, Georgia/);
  assert.match(count, /font-weight: 400;/);
  assert.match(count, /font-size: clamp\(3\.5rem, 8vw, 7\.5rem\);/);
  assert.match(count, /color: #0a0a0a;/);
  // The editorial serif's own old-style digits (no figure-style switch), in a box
  // always as wide as "100", so nothing moves while the digits change.
  assert.doesNotMatch(count, /font-variant-numeric|font-feature-settings/);
  assert.match(count, /text-align: start;/);
  assert.match(rule(css, ".count::after"), /block-size: 0;\s*content: "100";\s*display: block;\s*overflow: hidden;\s*visibility: hidden;/);
  // Bottom-left, or just above the privacy banner while it is open.
  assert.match(rule(css, ".feedback"), /--hg-nav-lift: 0px;/);
  assert.match(count, /inset-block-end: max\(\s*calc\(env\(safe-area-inset-bottom, 0px\) \+ clamp\(1\.25rem, 3vw, 2\.5rem\)\),\s*calc\(var\(--hg-nav-lift\) \+ clamp\(0\.75rem, 2vw, 1\.5rem\)\)\s*\);/);
  assert.match(css, /@media \(max-width: 40rem\) \{\s*\.count \{\s*font-size: 3rem;/);
  assert.match(rule(css, ".fill"), /background: #a84731;[\s\S]*transform: scaleX\(var\(--hg-nav-progress\)\);/);
  // Nothing the loader draws ever takes a click or a tap, over the header or anywhere else.
  for (const layer of [".veil", ".bar", ".count"]) {
    assert.match(rule(css, layer), /pointer-events: none;/, layer);
  }
  // Fast pages draw nothing: every layer waits out the same 220ms delay.
  assert.match(css, /\[data-state="pending"\] \.veil,\s*\.feedback\[data-state="pending"\] \.count \{\s*opacity: 1;\s*transition: opacity 200ms [^;]* 220ms;/);
  assert.match(css, /\[data-state="pending"\] \.bar \{\s*opacity: 1;\s*transition: opacity 120ms linear 220ms;/);
  assert.match(css, /\[data-state="done"\] \.bar \{\s*opacity: 0;\s*transition: opacity 200ms ease;/);
  // Reduced motion: no count, no veil, no fades, a still full-width line.
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{\s*[^@]*\.veil,\s*\.count \{\s*display: none;\s*\}\s*\.fill \{\s*transform: none;\s*\}\s*\.feedback\[data-state\] \.bar \{\s*transition-duration: 0s;/);
  // Full document loads keep the browser's own behaviour: the old page (and its
  // loader) stays until the new one paints. No cross-document view transition,
  // which drew the old header over the new one.
  assert.doesNotMatch(globals, /@view-transition|::view-transition/);
});

test("the loader never delays a navigation and only clears when the visitor stayed", async () => {
  const [component, config] = await Promise.all([
    source("components/NavigationFeedback.tsx"),
    source("next.config.mjs"),
  ]);
  // Pages still swap atomically: no JS delay before or after a navigation, no experimental React.
  assert.doesNotMatch(component, /router\.push|startViewTransition|await new Promise/);
  assert.doesNotMatch(config, /viewTransition/);
  // The count is set from script only; the markup carries no text.
  assert.match(component, /<span ref=\{countRef\} className=\{styles\.count\} \/>/);
  assert.match(component, /aria-hidden="true"/);
  // Touching or scrolling the old page while a document loads no longer clears the loader.
  assert.doesNotMatch(component, /"pointerdown"|"scroll"|"wheel"|"touchmove"/);
  assert.match(component, /event\.key === "Escape"\) reset\(\)/);
  // A draft's "Leave site?" prompt (a cancelled beforeunload) hands the choice to the visitor.
  assert.match(component, /if \(mode === "document" && event\.defaultPrevented\) reset\(\);/);
  assert.match(component, /if \(next === "document"\) window\.addEventListener\("beforeunload", onBeforeUnload\);/);
  assert.match(component, /addEventListener\("focus", onFocus\)/);
  assert.match(component, /if \(mode === "document"\) reset\(\);/);
  assert.match(component, /addEventListener\("pageshow", onPageShow\)/);
  assert.match(component, /addEventListener\("popstate", reset\)/);
  assert.match(component, /giveUpMs = 20_000/);
  // The count is lifted above the privacy banner while it is open, measured when
  // the loader starts and whenever the banner changes size.
  assert.match(component, /consentBannerSelector = "\[data-homeground-consent-banner\]"/);
  assert.match(component, /root\.style\.setProperty\("--hg-nav-lift", `\$\{Math\.ceil\(lift\)\}px`\)/);
  assert.match(component, /bannerObserver = new ResizeObserver\(\(\) => liftAboveBanner\(banner\)\)/);
  assert.match(component, /show\(0\);\s*watchBanner\(\);\s*setState\("pending"\);/);
  assert.match(component, /bannerObserver\?\.disconnect\(\);/);
  assert.doesNotMatch(component, /pageswap/);
});

test("prefetch follows intent and idle time, shares Next.js's cache and respects data saving", async () => {
  const component = await source("components/NavigationFeedback.tsx");
  assert.match(component, /const href = navigationIntentPrefetchHref\(\{/);
  for (const type of ["pointerenter", "touchstart", "focusin"]) {
    assert.match(component, new RegExp(`addEventListener\\("${type}", onIntent, options\\)`), type);
  }
  assert.match(component, /router\.prefetch\(href, \{ kind: kind === "full" \? PrefetchKind\.FULL : PrefetchKind\.AUTO \}\)/);
  assert.match(component, /requested\.has\(href\) \|\| \(kind === "auto" && fetched\.has\(href\)\)/);
  assert.match(component, /navigationPrefetchAllowed\(connection\(\)\)/);
  assert.match(component, /requestIdleCallback\(run/);
  assert.match(component, /navigationIdlePrefetchHrefs\(pathname/);
  // Speculation Rules are added from script, only where supported and allowed; prefetch only.
  assert.match(component, /HTMLScriptElement\.supports\("speculationrules"\)/);
  assert.match(component, /rules\.textContent = JSON\.stringify\(navigationDocumentPrefetchRules\(locale\)\)/);
  assert.doesNotMatch(component, /prerender/);
});
