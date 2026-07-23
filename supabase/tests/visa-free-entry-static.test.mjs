import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("visa-free page states the current 2026 rule without overclaiming", async () => {
  const page = await source(
    "app/(default)/china-visa-free-uk-canada/page.tsx",
  );
  const article = await source("components/VisaFreeEntryPage.tsx");
  const facts = await source("lib/visaFreeEntry.ts");

  assert.match(facts, /VISA_FREE_ENTRY_POLICY_START = "2026-02-17"/);
  assert.match(facts, /VISA_FREE_ENTRY_POLICY_END = "2026-12-31"/);
  assert.match(facts, /VISA_FREE_ENTRY_LAST_CHECKED = "2026-07-24"/);
  assert.match(facts, /ordinary passport holders/);
  assert.match(facts, /China Visa-Free Entry for UK & Canada \(2026\)/);
  assert.match(article, /This policy has an end date/);
  assert.match(article, /up to 30 days/);
  assert.match(article, /tourism;/);
  assert.match(article, /business;/);
  assert.match(article, /visiting relatives or friends;/);
  assert.match(article, /exchange visits;/);
  assert.match(article, /transit\./);
  assert.match(article, /counted from 00:00 on the[\s\S]*day after entry/);
  assert.match(article, /not the[\s\S]*240-hour[\s\S]*transit policy/);
  assert.match(article, /cannot be combined to create a 40-day stay/);
  assert.match(page, /canonical: VISA_FREE_ENTRY_PATH/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);

  for (const unsupportedClaim of [
    /six months['’]? validity/i,
    /guaranteed entry/i,
    /policy will continue into 2027/i,
    /everything is handled/i,
    /no hidden fees/i,
  ]) {
    assert.doesNotMatch(article, unsupportedClaim);
    assert.doesNotMatch(facts, unsupportedClaim);
  }
});

test("visa-free page uses Chinese official sources and preserves the policy boundary", async () => {
  const article = await source("components/VisaFreeEntryPage.tsx");
  const facts = await source("lib/visaFreeEntry.ts");

  assert.match(facts, /mfa\.gov\.cn/);
  assert.match(facts, /en\.nia\.gov\.cn/);
  assert.match(facts, /gb\.china-embassy\.gov\.cn/);
  assert.match(facts, /ca\.china-embassy\.gov\.cn/);
  assert.doesNotMatch(facts, /gov\.uk/);
  assert.doesNotMatch(facts, /travel\.gc\.ca/);
  assert.match(article, /Chinese border inspection makes the final admission decision/);
  assert.match(article, /does not cover work, long-term study, news[\s\S]*reporting/);
  assert.match(article, /VISA_FREE_ENTRY_SOURCES\.map/);
  assert.match(article, /styles\.mobileComparison/);
  assert.match(article, /utm_source=visa-free-entry/);
  assert.match(article, /utm_campaign=article-to-route-finder/);
});

test("visa-free URL is discoverable from the sitemap and English footer", async () => {
  const sitemap = await source("app/sitemap.ts");
  const footer = await source("components/HomegroundFooter.tsx");
  const productionPruner = await source("tools/prune-production-export.mjs");

  assert.match(sitemap, /VISA_FREE_ENTRY_URL/);
  assert.match(sitemap, /VISA_FREE_ENTRY_MODIFIED/);
  assert.match(footer, /locale === "en"/);
  assert.match(footer, /href="\/china-visa-free-uk-canada\/"/);
  assert.match(footer, /\{copy\.navigation\.visa\}/);
  assert.match(
    productionPruner,
    /china-visa-free-uk-canada\/index\.html/,
  );
});
