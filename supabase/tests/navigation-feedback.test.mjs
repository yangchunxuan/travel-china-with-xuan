import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { classifyNavigationClick } from "../../lib/navigationFeedback.ts";

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

test("every page mounts the feedback once, without moving the contact card", async () => {
  for (const path of ["app/(default)/layout.tsx", "app/(localized)/[locale]/layout.tsx"]) {
    const layout = await source(path);
    assert.match(layout, /\{children\}\s*<NavigationFeedback locale=\{?[^/]+\/>\s*<AnalyticsConsent/, path);
    assert.match(layout, /<TourContactPanel locale=\{?[^/]+\/>\s*<ContactCardHost locale=/, path);
  }
});

test("waiting feedback is delayed, restrained and honours reduced motion", async () => {
  const [css, globals, component, config, header] = await Promise.all([
    source("components/NavigationFeedback.module.css"),
    source("app/globals.css"),
    source("components/NavigationFeedback.tsx"),
    source("next.config.mjs"),
    source("components/HomegroundHeader.module.css"),
  ]);
  // The chosen link answers at once; in the desktop header the underline moves to it.
  assert.match(globals, /a\[data-hg-nav-pressed\] \{\s*opacity: 0\.72;\s*\}/);
  assert.match(header, /\.desktopNav a\[data-active="true"\]::after,\s*\.desktopNav a\[data-hg-nav-pressed\]::after \{/);
  assert.match(header, /\.desktopNav:has\(a\[data-hg-nav-pressed\]\) a:not\(\[data-hg-nav-pressed\]\)::after \{\s*visibility: hidden;/);
  assert.match(css, /\[data-state="pending"\] \.bar \{[^}]*transition: opacity 120ms linear 160ms;/);
  assert.match(css, /\[data-state="pending"\] \.veil \{[^}]*160ms;/);
  assert.match(css, /#a84731/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(globals, /@media \(prefers-reduced-motion: no-preference\) \{\s*@view-transition \{\s*navigation: auto;/);
  assert.match(globals, /animation-duration: 180ms;/);
  // Pages still swap atomically: no JS delay before or after a navigation, no experimental React.
  assert.doesNotMatch(component, /router\.push|startViewTransition|await new Promise/);
  assert.doesNotMatch(config, /viewTransition/);
});
