// Mobile UX, track 1 (layout, typography, spacing and forms), from the
// 2026-10-24 phone audit. Each test names the audit finding it keeps fixed.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { formatTourDate, formatTourDateInWords, parseTourDate } from "../../lib/tourDate.ts";

const repositoryRoot = new URL("../../", import.meta.url);
const source = (path) => readFile(new URL(path, repositoryRoot), "utf8");
const rule = (css, selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  return css.match(new RegExp(`(?:^|\\n)${escaped} \\{[^}]*\\}`, "u"))?.[0] ?? "";
};

test("F02/F26: the homepage email box never makes iOS zoom, and the keyboard offers Send", async () => {
  const [styles, contact] = await Promise.all([
    source("components/HomegroundHomePage.module.css"),
    source("components/HomepageQuickContact.tsx"),
  ]);
  const input = styles.match(/\n\.quickContactEmailRow input \{[^}]*\}/u)?.[0] ?? "";
  assert.match(input, /font-size: max\(16px, 1rem\);/u, "iOS zooms into fields below 16px");
  assert.doesNotMatch(input, /font-size: 0\.\d+rem/u);
  const email = contact.match(/<input\s+id=\{emailId\}[\s\S]*?\/>/u)?.[0] ?? "";
  assert.match(email, /type="email"/u);
  assert.match(email, /enterKeyHint="send"/u);
});

test("F03: a typed date is read back in words in each page language; the typed format is unchanged", () => {
  const expected = {
    en: "Saturday, 3 April 2027",
    zh: "2027年4月3日星期六",
    ko: "2027년 4월 3일 토요일",
    ja: "2027年4月3日土曜日",
    fr: "samedi 3 avril 2027",
    de: "Samstag, 3. April 2027",
    es: "sábado, 3 de abril de 2027",
    ar: "السبت، 3 أبريل 2027",
  };
  for (const [language, words] of Object.entries(expected)) {
    assert.equal(formatTourDateInWords("2027-04-03", language), words, language);
  }
  // A US visitor's 03/04/2027 is 3 April, and the words say so.
  assert.equal(formatTourDateInWords(parseTourDate("03/04/2027", "en"), "en"), "Saturday, 3 April 2027");
  // The field still shows and parses the same numeric format.
  assert.equal(formatTourDate("2027-04-03", "en"), "03/04/2027");
  assert.equal(formatTourDate("2027-04-03", "zh"), "2027/04/03");
  // Nothing is read back for an invalid or empty date; early years are not moved into the 1900s.
  for (const iso of ["", "2027-02-29", "2027-4-3", "not a date"]) assert.equal(formatTourDateInWords(iso, "en"), "", iso);
  assert.match(formatTourDateInWords("0099-12-31", "en"), / 99$/u);
  // Arabic keeps the Gregorian calendar and Latin digits, as the rest of the Arabic pages.
  assert.doesNotMatch(formatTourDateInWords("2027-04-03", "ar"), /[٠-٩]/u);
});

test("F03: the date field shows the words under the field, only after hydration, as a polite live region", async () => {
  const [field, styles] = await Promise.all([
    source("components/TourDateField.tsx"),
    source("components/TourDateField.module.css"),
  ]);
  assert.match(field, /const inWords = hydrated && iso \? formatTourDateInWords\(iso, edition\?\.language \?\? locale\) : "";/u);
  assert.match(field, /<p id=\{`\$\{id\}-hint`\} className=\{styles\.hint\}>\{copy\.formatHint\}<\/p>\s*<p id=\{`\$\{id\}-words`\} className=\{styles\.words\} aria-live="polite">\{inWords\}<\/p>/u);
  assert.match(field, /aria-describedby=\{`\$\{id\}-hint\$\{inWords \? ` \$\{id\}-words` : ""\}/u);
  assert.match(styles, /\.words \{[^}]*font-size: 13px;/u);
  assert.match(styles, /\.words:empty \{ margin: 0; \}/u, "no empty gap while nothing valid is typed");
});

test("F19: each 'How did you find us?' chip is a 44px target; the chips keep their content and order", async () => {
  const [styles, panel, japanese] = await Promise.all([
    source("components/TourContactPanel.module.css"),
    source("components/TourContactPanel.tsx"),
    source("components/JapaneseInquiryDialog.tsx"),
  ]);
  assert.match(rule(styles, ".sourceChip"), /min-height: 44px;/u);
  assert.match(styles, /\.sourceChip input \{[^}]*inset: 0;[^}]*width: 100%; height: 100%;/u, "the whole chip is the radio's hit area");
  for (const dialog of [panel, japanese]) assert.match(dialog, /referralSources\.map\(source => <label key=\{source\} className=\{styles\.sourceChip\}>/u);
});

const trackBlock = (globals) => globals.slice(globals.indexOf("Mobile UX, track 1 (2026-10-24 phone audit)"));

test("F13: German, French and Spanish headings, buttons and card titles keep whole words", async () => {
  const [globals, editions] = await Promise.all([
    source("app/globals.css"),
    source("components/ChinaEntryGuidesEditionPage.module.css"),
  ]);
  const block = trackBlock(globals);
  assert.ok(block.length < globals.length, "the track 1 rules sit in one block at the end of globals.css");
  assert.match(block, /:where\(:lang\(de\), :lang\(fr\), :lang\(es\)\)\s*:where\(h1, h2, h3, h4, h5, h6, button, \[role="button"\], \[class\*="Title"\], \[class\*="title"\], \[class\*="Button"\], \[class\*="button"\]\) \{\s*hyphens: manual;\s*overflow-wrap: break-word;\s*\}/u);
  // Only very long compounds may still be hyphenated, where the browser can limit it.
  assert.match(block, /@supports \(hyphenate-limit-chars: 20 8 8\) \{\s*:where\(:lang\(de\), :lang\(fr\), :lang\(es\)\)[^{]*\{\s*hyphens: auto;\s*hyphenate-limit-chars: 20 8 8;\s*\}\s*\}/u);
  assert.match(editions, /\.root:is\(\[lang="fr"\], \[lang="de"\], \[lang="es"\]\) :is\(h1, h2, h3\) \{\s*hyphens: manual;\s*\}/u);
  assert.doesNotMatch(editions, /hyphens: auto/u);
});

test("F14/F15: Korean labels break between words; Chinese and Japanese headings are balanced", async () => {
  const [globals, zhangjiajie] = await Promise.all([
    source("app/globals.css"),
    source("components/ZhangjiajiePrivateTourPreviewPage.module.css"),
  ]);
  const block = trackBlock(globals);
  // The Korean Zhangjiajie title had its own word-break: normal on phones ("유|리다리").
  assert.match(zhangjiajie, /\.previewRoot\[data-homeground-locale="ko"\] \.hero h1 \{[^}]*overflow-wrap: break-word;[^}]*word-break: keep-all;/u);
  assert.doesNotMatch(zhangjiajie, /\.previewRoot\[data-homeground-locale="ko"\] \.hero h1 \{[^}]*word-break: normal;/u);
  assert.match(block, /:where\(:lang\(ko\)\)\s*:where\(h1, h2, h3, h4, h5, h6, button, \[role="button"\], a, label, legend, summary, dt, th\) \{\s*word-break: keep-all;\s*overflow-wrap: break-word;\s*\}/u);
  assert.match(block, /:where\(:lang\(zh\), :lang\(ja\)\)\s*:where\(h1, h2, h3, h4, h5, h6, \[class\*="eyebrow"\], \[class\*="Eyebrow"\]\) \{\s*text-wrap: balance;\s*\}/u);
});

test("F25: up-right arrows are mirrored on right-to-left pages without fighting hover transforms", async () => {
  const block = trackBlock(await source("app/globals.css"));
  assert.match(block, /\[dir="rtl"\] svg\.lucide-arrow-up-right \{\s*scale: -1 1;\s*\}/u);
});

test("F16: phone footer links are 14px in 44px rows; legal text 12px and the tagline 11px", async () => {
  const styles = await source("components/HomepageFooter.module.css");
  const phone = styles.slice(styles.indexOf("@media (max-width: 39.999rem)"));
  assert.match(phone, /\.navGrid a,\s*\.navGrid button \{\s*font-size: 0\.875rem;\s*min-block-size: 2\.75rem;/u);
  assert.match(phone, /\.copyrightSocial > p,\s*\.operator \{\s*font-size: 0\.75rem;\s*\}/u);
  assert.match(phone, /\.brand small \{\s*font-size: 0\.6875rem;\s*\}/u);
});

test("F18: breadcrumb links get 44px invisible targets without moving the trail", async () => {
  const [editorial, entry] = await Promise.all([
    source("components/content/EditorialGuidePage.module.css"),
    source("components/ChinaEntryGuidesPage.module.css"),
  ]);
  const wide = /inset-inline: min\(-0\.4375rem, calc\(\(100% - 2\.75rem\) \/ 2\)\);/u;
  assert.match(editorial, /\.breadcrumb a::after \{[^}]*inset: -0\.5rem -0\.4375rem -1rem;[^}]*inset-inline: min\(-0\.4375rem, calc\(\(100% - 2\.75rem\) \/ 2\)\);[^}]*position: absolute;/u);
  assert.match(entry, /\.breadcrumb a \{[^}]*position: relative;/u);
  assert.match(entry, /\.breadcrumb a::after \{[^}]*content: "";[^}]*inset: -0\.9375rem -0\.4375rem;[^}]*position: absolute;/u);
  assert.match(entry.match(/\.breadcrumb a::after \{[^}]*\}/u)?.[0] ?? "", wide);
});

test("F20: in-page jumps and keyboard focus stop above the floating Ask launcher", async () => {
  const globals = await source("app/globals.css");
  const block = globals.slice(globals.indexOf("Mobile UX, track 1 (2026-10-24 phone audit)"));
  assert.match(block, /html \{\s*scroll-padding-block-end: 5\.5rem;\s*\}/u);
});

test("F21: Spanish guide cards and the reservation guide editions use the English hub's image sizes", async () => {
  const [hub, spanish, editions] = await Promise.all([
    source("components/GuidesHubPage.tsx"),
    source("components/SpanishGuideCards.tsx"),
    source("components/ReservationGuideEditionCollection.tsx"),
  ]);
  const hubSize = (slot) => hub.match(new RegExp(`\\n  ${slot}: "([^"]+)"`, "u"))?.[1];
  const lead = hubSize("lead"), row = hubSize("row");
  assert.ok(lead && row, "the English hub still declares its lead and row sizes");
  assert.ok(spanish.includes(`const leadImageSizes = "${lead}";`));
  assert.ok(spanish.includes(`const rowImageSizes = "${row}";`));
  assert.match(spanish, /sizes=\{index === 0 \? leadImageSizes : rowImageSizes\}/u);
  assert.ok(editions.includes(`const rowImageSizes = "${row}";`));
  assert.equal((editions.match(/sizes=\{rowImageSizes\}/gu) ?? []).length, 2);
  for (const file of [spanish, editions]) assert.doesNotMatch(file, /sizes="\(max-width: 53rem\) 100vw/u, "no full-width sizes on phone thumbnails");
});

test("F09: a phone type floor in the price blocks, cards, entry hub, guide meta and quote sheet", async () => {
  const files = Object.fromEntries(await Promise.all([
    "PrivateToursHubPage", "ShanghaiJiangnanImaginePage", "ZhangjiajiePrivateTourPreviewPage", "HomepageProductShowcase",
    "ChinaEntryGuidesPage", "GuidesHubPage", "TourContactPanel", "TourDateField",
  ].map(async (name) => [name, await source(`components/${name}.module.css`)])));
  const floor = (css, media) => {
    const start = css.lastIndexOf("F09 phone type floor");
    assert.ok(start > 0, "each file ends with one F09 block");
    const block = css.slice(start);
    assert.ok(block.includes(`@media (${media})`), media);
    // Nothing in a floor block is set below 12px.
    for (const [, value, unit] of block.matchAll(/font-size: ([\d.]+)(rem|px)/gu)) {
      assert.ok((unit === "rem" ? Number(value) * 16 : Number(value)) >= 12, `${value}${unit}`);
    }
    return block;
  };
  assert.match(floor(files.PrivateToursHubPage, "max-width: 47.99rem"), /\.quickDetails dd \{\s*font-size: 0\.875rem;/u);
  assert.match(floor(files.ShanghaiJiangnanImaginePage, "max-width: 760px"), /\.currencyNote,[\s\S]*?font-size: 0\.8125rem;/u);
  assert.match(floor(files.ZhangjiajiePrivateTourPreviewPage, "max-width: 47.99rem"), /\.featuredLabel,[\s\S]*?font-size: 0\.75rem;/u);
  assert.match(floor(files.HomepageProductShowcase, "max-width: 39.999rem"), /\.cardDescription \{\s*font-size: 0\.875rem;/u);
  assert.match(floor(files.ChinaEntryGuidesPage, "max-width: 47.99rem"), /\.reviewDate,[\s\S]*?font-size: 0\.75rem;/u);
  assert.match(floor(files.GuidesHubPage, "max-width: 47.99rem"), /\.guideMeta \{\s*font-size: 0\.8125rem;/u);
  const sheet = floor(files.TourContactPanel, "max-width: 600px");
  assert.match(sheet, /\.context > span, \.optional, \.receipt \.reference \{ font-size: 12px; \}/u, "'Your itinerary' and 'Optional' reach 12px");
  assert.match(floor(files.TourDateField, "max-width: 600px"), /\.hint \{ font-size: 12px; \}/u);
});

test("F05: tour heroes on phones drop the repeated title from the trail, use a compact title and put the price before the photos", async () => {
  const [styles, page] = await Promise.all([
    source("components/ShanghaiJiangnanImaginePage.module.css"),
    source("components/ShanghaiJiangnanImaginePage.tsx"),
  ]);
  const block = styles.slice(styles.lastIndexOf("F05 (2026-10-24 audit)"));
  assert.match(block, /@media \(max-width: 760px\) \{/u, "phones only; the desktop hero keeps its layout");
  assert.match(block, /\.breadcrumb li\[aria-current="page"\],\s*\.breadcrumb li:nth-last-child\(2\) > span\[aria-hidden="true"\] \{\s*display: none;/u);
  assert.match(block, /\.hero h1 \{\s*font-size: clamp\(1\.75rem, 8\.2vw, 2\.4rem\);/u, "the compact size Chinese route titles already use");
  assert.match(block, /grid-template-areas:\s*"copy"\s*"price"\s*"deck";/u);
  // The markup keeps the full trail (for search engines and larger screens) and one H1.
  assert.match(page, /<li aria-current="page">\{localized\.title\}<\/li>/u);
  assert.equal((page.match(/<h1\b/gu) ?? []).length, 1);
});
