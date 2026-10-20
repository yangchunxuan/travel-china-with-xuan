import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { getGuideEntry, guideRegistry } from "../../lib/guideRegistry.ts";
import {
  japaneseGuideCardCopy,
  japaneseGuideCardSectionLabels,
  japaneseGuideCardTags,
  japaneseGuideSectionLabels,
  japaneseGuidesHubCopy,
  japaneseGuidesSearchTitle,
} from "../../lib/japaneseGuidesHubCopy.ts";

const root = path.resolve(import.meta.dirname, "../..");
const source = (relative) => readFileSync(path.join(root, relative), "utf8");
const marker = /（英語）$/u;
const japanese = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u;
const decisionSections = ["plan", "when-to-go", "transport", "stay", "essentials", "culture"];
/** Numbers as written ("1,190" and "41,000" read as one number each). */
const numbers = (text) => new Set(text.replace(/(\d),(?=\d{3}\b)/gu, "$1").match(/\d+/gu) ?? []);

test("the Japanese guides hub renders the shared English hub, as the French one does", () => {
  const route = source("app/(japanese)/ja/guides/page.tsx");
  assert.match(route, /<JapaneseGuidesPage \/>/u);
  assert.match(route, /japaneseAlternates\("\/guides\/", japaneseSite\.guides\)/u, "hreflang set unchanged");
  const page = source("components/JapaneseGuidesPage.tsx");
  assert.match(page, /<GuidesHubPage locale="en" edition=\{edition\} \/>/u);
  assert.match(page, /getGuidesHubPagination\('en', 1\)/u, "the English hub's first page");
  assert.match(page, /<ReservationGuideEditionCollection language="ja" leadingGuides=\{japaneseRows\} \/>/u, "the eight Japanese articles");
  assert.match(page, /<JapaneseGuideContactLink /u, "the closing action opens the Japanese inquiry dialog");
  assert.match(page, /linkHrefLang: \(href\) => \(href\.startsWith\('\/ja\/'\) \? undefined : 'en'\)/u);
  assert.match(source("components/JapaneseGuideSearchForm.tsx"), /englishLinkMarker=\{editionEnglishMarker\.ja\}/u);
  assert.ok(!existsSync(path.join(root, "components/JapaneseGuidesHubPage.tsx")), "the custom Japanese hub is gone");
});

test("every English guide card in Japanese keeps the English facts", () => {
  const ids = new Set(guideRegistry.map((guide) => guide.id));
  assert.ok(Object.keys(japaneseGuideCardCopy).length >= 20);
  for (const [id, card] of Object.entries(japaneseGuideCardCopy)) {
    assert.ok(ids.has(id), `${id} is a guide`);
    const english = getGuideEntry(id, "en");
    for (const field of ["headline", "description", "cardImageAlt"]) assert.match(card[field], japanese, `${id} ${field} is Japanese`);
    assert.equal(card.cardTags.length, (english.cardTags ?? card.cardTags).length, `${id}: as many tags as English`);
    const translated = numbers(`${card.headline} ${card.description}`);
    for (const value of numbers(`${english.headline} ${english.description}`)) assert.ok(translated.has(value), `${id}: states ${value}`);
    const alt = numbers(card.cardImageAlt);
    for (const value of numbers(english.cardImageAlt)) assert.ok(alt.has(value), `${id} alt: states ${value}`);
  }
  for (const id of Object.keys(japaneseGuideCardTags)) assert.ok(!japaneseGuideCardCopy[id], `${id} takes its words from its Japanese page`);
});

test("links to pages that stay English say （英語）; the Japanese pages do not", () => {
  const copy = japaneseGuidesHubCopy;
  for (const section of decisionSections) {
    assert.match(japaneseGuideSectionLabels[section], marker, `${section} section link`);
    assert.match(copy.countryGuide.decisions[section].title, japanese, `${section} decision`);
    assert.doesNotMatch(japaneseGuideCardSectionLabels[section], marker, `${section} card label`);
  }
  assert.match(copy.readLabel, marker);
  assert.match(copy.pagination.next, marker);
  // The numbered pages stay as short as the English ones; the status line says once that pages 2 on are English.
  assert.match(copy.pagination.status(1, 11, 249), /2ページ目以降は英語$/u);
  assert.equal(copy.pagination.page(2), "2ページ");
  assert.doesNotMatch(copy.destinationAction, marker, "/ja/explore/");
  assert.doesNotMatch(copy.entrySection.action, marker, "/ja/guides/china-entry-requirements/");
  assert.doesNotMatch(copy.cta.action, marker, "the Japanese inquiry dialog");
  for (const text of [copy.eyebrow, copy.title, copy.introduction, copy.catalogTitle, copy.catalogIntroduction, copy.cta.title, copy.cta.body, japaneseGuidesSearchTitle]) {
    assert.match(text, japanese);
  }
  // Kept from the page before: the h1 and the title.
  assert.equal(copy.title, "中国旅行の実用ガイド");
  assert.equal(copy.metadata.title, "中国旅行の実用ガイド | Homeground China");
});
