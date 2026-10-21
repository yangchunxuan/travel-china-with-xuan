import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { privateTourBookingTerms, privateTourRefundSections } from "../../lib/privateTourBookingTerms.ts";

const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const numbers = (text) => (text.match(/\d+/gu) ?? []).sort().join(",");
const languages = ["en", "zh", "ko", "ja", "fr", "de", "es", "ar"];

test("the owner's private-tour terms say the same thing in every language", () => {
  const english = privateTourBookingTerms.en.items;
  assert.equal(english.length, 10);
  // The owner's rules (2026-10-22): 30% deposit, 10% / 20% / deposit kept at 60+ / 30–59 / under 30 days,
  // the VBill 4% fee never refunded, and the Beijing refund with passport details 8 days ahead.
  assert.match(english[0].body, /30% deposit[\s\S]*after you arrive in China[\s\S]*4% fee/u);
  assert.match(english[1].body, /10%/u);
  assert.match(english[2].body, /20%/u);
  assert.match(english[3].body, /deposit is not refunded/u);
  assert.match(english[9].body, /at least 8 days before the Forbidden City visit/u);
  for (const language of languages) {
    const terms = privateTourBookingTerms[language];
    assert.equal(terms.items.length, english.length, `${language}: ten terms`);
    terms.items.forEach((item, index) => {
      assert.ok(item.title && item.body, `${language} term ${index + 1} is written`);
      assert.equal(numbers(`${item.title} ${item.body}`), numbers(`${english[index].title} ${english[index].body}`), `${language} term ${index + 1} states the English numbers`);
    });
  }
});

test("private tour pages and every refund page show the terms", async () => {
  const page = await source("components/ShanghaiJiangnanImaginePage.tsx");
  assert.match(page, /product\.tourFormat !== "small-group" \? \(\s*<section className=\{styles\.bookingTerms\}/u, "private tours only; small groups keep their own terms");
  assert.match(page, /privateTourBookingTerms\[locale\]\.items\.map/u);
  const refunds = {
    "lib/homegroundLegalI18n.ts": ["en", "zh", "ko"],
    "lib/japaneseLegalCopy.ts": ["ja"],
    "lib/frenchLegalCopy.ts": ["fr"],
    "lib/germanLegalCopy.ts": ["de"],
    "lib/spanishLegalCopy.ts": ["es"],
    "lib/arabicLegalCopy.ts": ["ar"],
  };
  for (const [file, langs] of Object.entries(refunds)) {
    const text = await source(file);
    for (const language of langs) assert.match(text, new RegExp(`\\.\\.\\.privateTourRefundSections\\("${language}", 6\\)`, "u"), `${file}: ${language} refund page`);
  }
  const sections = privateTourRefundSections("en", 6);
  assert.deepEqual(sections.map((section) => section.title), ["6. Private tours", "7. Small groups"]);
});
