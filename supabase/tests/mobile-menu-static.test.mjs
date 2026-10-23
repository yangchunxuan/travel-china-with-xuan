import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const sources = Promise.all([
  source("components/HomegroundHeader.tsx"),
  source("components/HomegroundHeader.module.css"),
  source("lib/homegroundI18n.ts"),
]);

test("mobile section toggles expose labelled regions and inert collapsed content", async () => {
  const [header] = await sources;
  const toggleStart = header.indexOf('id={`mobile-section-toggle-${menuId}`}');
  assert.ok(toggleStart >= 0, "each toggle needs a stable id");
  const toggle = header.slice(toggleStart, header.indexOf("</button>", toggleStart));
  assert.match(toggle, /aria-expanded=\{expanded\}/);
  assert.match(toggle, /aria-controls=\{`mobile-section-\$\{menuId\}`\}/);
  assert.doesNotMatch(toggle, /aria-current|trackNavigationClick|\bclose\(/);
  assert.match(header, /className=\{styles\.mobileSectionPanel\}[\s\S]*?role="region"[\s\S]*?aria-labelledby=\{`mobile-section-toggle-\$\{menuId\}`\}[\s\S]*?inert=\{!expanded\}/);
});

test("the mobile focus trap omits every inert descendant", async () => {
  const [header] = await sources;
  assert.match(header, /\.filter\(\(element\) => element\.getClientRects\(\)\.length > 0 && !element\.closest\("\[inert\]"\)\)/);
});

test("the menu tagline uses the approved copy in all three locales", async () => {
  const [header, , copy] = await sources;
  assert.match(header, /copy\.navigation\.menuTagline/);
  assert.equal((copy.match(/menuTagline:/g) ?? []).length, 4, "one type key and three translations");
  for (const [locale, tagline] of [
    ["en", "Tailored journeys, planned with context."],
    ["zh", "每一段旅程，都从真实需求出发。"],
    ["ko", "실제 조건을 바탕으로 설계하는 맞춤 여행."],
  ]) {
    const start = copy.indexOf(`\n  ${locale}: {`);
    assert.ok(start >= 0, `missing ${locale} copy`);
    const navigationStart = copy.indexOf("    navigation: {", start);
    const navigationEnd = copy.indexOf("\n    },", navigationStart);
    assert.ok(navigationStart >= 0 && navigationEnd > navigationStart);
    assert.ok(copy.slice(navigationStart, navigationEnd).includes(`menuTagline: "${tagline}"`), `${locale} tagline must match the approved text`);
  }
});

test("mobile English is an endonym while desktop keeps the short language label", async () => {
  const [header, css] = await sources;
  assert.match(header, /className=\{styles\.languageChoiceShort\}>\{target\.languageShort\}/);
  assert.match(header, /className=\{styles\.languageChoiceEndonym\}>\s*\{targetLocale === "en" \? target\.languageName : target\.languageShort\}/);
  assert.match(css, /\.languageChoiceEndonym \{\s*display: none;/);
  assert.match(css, /\.mobileLanguageNav \.languageChoiceShort \{\s*display: none;/);
  assert.match(css, /\.mobileLanguageNav \.languageChoiceEndonym \{\s*display: inline;/);
});

test("reduced motion disables mobile menu transitions and movement", async () => {
  const [, css] = await sources;
  const reducedStart = css.indexOf("@media (max-width: 1179.98px) and (prefers-reduced-motion: reduce)");
  assert.ok(reducedStart >= 0, "the mobile menu needs a reduced-motion block");
  const nextMedia = css.indexOf("\n@media", reducedStart + 1);
  const reduced = css.slice(reducedStart, nextMedia < 0 ? undefined : nextMedia);
  assert.match(reduced, /\.mobileNav,[\s\S]*?\.mobileNav \*,[\s\S]*?\.menuButton > span,[\s\S]*?\.headerCta/);
  assert.match(reduced, /animation-duration:\s*0s !important;/);
  assert.match(reduced, /transition-duration:\s*0s !important;/);
  assert.match(reduced, /transition-delay:\s*0s !important;/);
  assert.match(reduced, /transform:\s*none !important;/);
});

test("open sections fade the other primary and secondary labels with the approved colours", async () => {
  const [, css] = await sources;
  assert.match(css, /\.mobileMenuScroll\[data-has-open="true"\] \.mobileSections\[data-tier="primary"\] \.mobileSection:not\(\[data-open="true"\]\) \.mobileSectionLabel \{\s*color: #938f87;/);
  assert.match(css, /\.mobileMenuScroll\[data-has-open="true"\] \.mobileSections\[data-tier="secondary"\] \.mobileSection:not\(\[data-open="true"\]\) \.mobileSectionLabel \{\s*color: #6b6b66;/);
});

test("opening the menu fades the Plan pill while preserving its layout", async () => {
  const [, css] = await sources;
  const openCta = css.match(/\.siteHeader\[data-menu-open="true"\] \.headerCta \{([^}]*)\}/);
  assert.ok(openCta, "missing the open-menu Plan pill rule");
  assert.match(openCta[1], /opacity:\s*0;/);
  assert.match(openCta[1], /visibility:\s*hidden;/);
  assert.match(openCta[1], /pointer-events:\s*none;/);
  assert.doesNotMatch(openCta[1], /display:\s*none;/);
});

test("the phone Plan link is at least 44 px wide and every menu language name has its own sized face", async () => {
  const [header, css] = await sources;
  // F10: "Plan" alone is narrower than a fingertip; the link keeps a 44 px target in every language.
  assert.match(css, /\n\.headerCta \{[^}]*min-inline-size:\s*2\.75rem;/);
  // F11: no language name falls back to the 16 px body size, so the eight names read at one size.
  const languageRules = [...css.matchAll(/\.mobileLanguageNav a(?::is\(((?::lang\(\w+\)(?:,\s*)?)+)\)|:lang\((\w+)\))\s*\{([^}]*)\}/g)];
  const covered = new Set();
  for (const [, list, single, body] of languageRules) {
    assert.match(body, /font:\s*\d{3} 0\.(?:8125|84375|9375)rem\/1 /, "each script names an explicit size");
    for (const lang of list ? [...list.matchAll(/:lang\((\w+)\)/g)].map((match) => match[1]) : [single]) covered.add(lang);
  }
  for (const lang of ["en", "zh", "ko", "ja", "es", "fr", "de", "ar"]) assert.ok(covered.has(lang), `${lang} needs a mobile language-name rule`);
  // The same eight choices, in the same order, on every page language.
  const order = [...header.matchAll(/\{(availableLanguageLocales\.map\(renderLanguageChoice\)|render(?:Japanese|Spanish|French|German|Arabic)LanguageChoice\(\))\}/g)].map((match) => match[1]);
  assert.deepEqual(order.slice(0, 6), order.slice(6), "desktop and mobile list the languages identically");
  // Right to left, the CTA arrow's head points along the reading direction.
  assert.match(css, /\.mobileCtaArrow:dir\(rtl\)::after \{\s*transform: rotate\(-45deg\);/);
});

test("below 700 px tall the whole menu scrolls, the planner link stays pinned and the eight languages follow the list (F12)", async () => {
  const [header, css] = await sources;
  const start = css.indexOf("@media (max-width: 1179.98px) and (max-height: 700px) {");
  assert.ok(start >= 0, "a short-screen menu block");
  const block = css.slice(start, css.indexOf("\n}\n", start));
  assert.match(block, /\.mobileNav \{\s*display: block;\s*overflow-y: auto;/);
  assert.match(block, /\.mobileMenuScroll \{\s*overflow: visible;/);
  assert.match(block, /\.mobileUtility \{\s*display: contents;/);
  assert.match(block, /\.mobileCta \{[^}]*inset-block-end: 0;[^}]*position: sticky;/);
  assert.doesNotMatch(block, /mobileLanguageNav[^{]*\{[^}]*display: none/, "the languages are never hidden");
  // Opening a section scrolls whichever element scrolls, and keeps clear of the pinned link.
  assert.match(header, /const wholeMenuScrolls = list \? getComputedStyle\(list\)\.overflowY === "visible" : false;/);
  assert.match(header, /const scrollArea = wholeMenuScrolls \? mobileNavRef\.current : list;/);
  assert.match(header, /const viewBottom = scrollBounds\.bottom - pinnedHeight;/);
  // Reduced motion: the two parts appear without moving.
  const reduced = css.slice(css.indexOf("@media (max-width: 1179.98px) and (prefers-reduced-motion: reduce)"));
  assert.match(reduced, /\.mobileUtility,\s*\.mobileCta,\s*\.mobileLanguageNav,[\s\S]*?transform: none !important;/);
});
