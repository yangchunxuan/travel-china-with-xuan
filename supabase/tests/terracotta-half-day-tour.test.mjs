import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { terracottaHalfDayCopy, terracottaHalfDaySlug, terracottaHalfDayPreviewPaths, terracottaHalfDayReadHref } from "../../lib/terracottaHalfDayDraft.ts";

test("half-day draft separates an unpriced proposal from the existing five-day product", () => {
  assert.equal(terracottaHalfDaySlug, "xian-terracotta-warriors-half-day-private-tour");
  for (const locale of ["en", "zh", "ko"]) {
    const copy = terracottaHalfDayCopy[locale];
    assert.equal(copy.stops.length, 3);
    assert.equal(copy.faq.length, 6);
    assert.equal(copy.enquiryDetails.length, 3);
    assert.match(copy.facts[0].value, /5–6/);
    assert.match(copy.facts[1].value, /2\.5–3/);
    assert.ok(copy.priceTitle.length > 0 && copy.draft.length > 0);
    const body = JSON.stringify(copy);
    assert.doesNotMatch(body, /USD\s*\d|CNY\s*\d|KRW\s*\d|\$\s*\d|¥\s*\d|₩\s*\d/);
    for (const link of copy.readLinks) {
      assert.ok(terracottaHalfDayReadHref(link.path, locale).startsWith(locale === "en" ? "/" : `/${locale}/`));
      assert.ok(!link.path.includes(terracottaHalfDaySlug));
    }
    assert.ok(terracottaHalfDayPreviewPaths[locale].includes("/preview/"));
  }
});

test("draft is development-only and does not join published discovery or inquiry contracts", () => {
  const paths = [
    `app/(default)/preview/${terracottaHalfDaySlug}/page.tsx`,
    `app/(localized)/[locale]/preview/${terracottaHalfDaySlug}/page.tsx`,
  ];
  for (const path of paths) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /process\.env\.NODE_ENV === "production"\) notFound\(\)/);
    assert.match(source, /index: false, follow: false/);
  }
  for (const path of ["lib/privateTourProducts.ts", "lib/privateTourInquiryContext.ts", "lib/privateTourInquiryIndex.ts", "lib/publishedPrivateTourCatalog.ts", "app/sitemap.ts", "supabase/functions/_shared/traffic-contracts.ts"]) {
    assert.ok(!readFileSync(path, "utf8").includes(terracottaHalfDaySlug), `${path} must not register this draft`);
  }
  const component = readFileSync("components/TerracottaHalfDayDraftPage.tsx", "utf8");
  assert.doesNotMatch(component, /<form\b|fetch\(|mailto:|wa\.me|SelectedPrivateTourCta|application\/ld\+json/);
  assert.match(component, /href="#half-day-enquiry"/);
  const pruner = readFileSync("tools/prune-production-export.mjs", "utf8");
  for (const root of ["preview", "zh/preview", "ko/preview"]) assert.ok(pruner.includes(`"${root}"`));
});
