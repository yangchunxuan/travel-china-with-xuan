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
