import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  terracottaHalfDayCopy,
  terracottaHalfDayMessage,
  terracottaHalfDayMetadata,
  terracottaHalfDayPaths,
  terracottaHalfDayReadHref,
  terracottaHalfDaySlug,
} from "../../lib/terracottaHalfDayTour.ts";

const locales = ["en", "zh", "ko"];

test("the half-day tour is quoted on request, with no price and no draft wording", () => {
  assert.equal(terracottaHalfDaySlug, "xian-terracotta-warriors-half-day-private-tour");
  for (const locale of locales) {
    const copy = terracottaHalfDayCopy[locale];
    assert.equal(copy.stops.length, 3);
    assert.equal(copy.faq.length, 6);
    assert.equal(copy.enquiryDetails.length, 3);
    assert.match(copy.facts[0].value, /5–6/);
    assert.match(copy.facts[1].value, /2\.5–3/);
    const body = JSON.stringify(copy);
    assert.doesNotMatch(body, /USD\s*\d|CNY\s*\d|KRW\s*\d|\$\s*\d|¥\s*\d|₩\s*\d/, `${locale}: no price`);
    assert.doesNotMatch(body, /draft|proposed|preview|拟定|草稿|预览|초안|미리보기|예정/iu, `${locale}: no draft wording`);
    assert.equal(terracottaHalfDayPaths[locale], `${locale === "en" ? "" : `/${locale}`}/tours/${terracottaHalfDaySlug}/`);
    for (const link of copy.readLinks) {
      assert.ok(terracottaHalfDayReadHref(link.path, locale).startsWith(locale === "en" ? "/" : `/${locale}/`));
      assert.ok(!link.path.includes(terracottaHalfDaySlug));
    }
  }
});

test("each language is an indexable page with its canonical and all published language alternates", () => {
  for (const locale of locales) {
    const metadata = terracottaHalfDayMetadata(locale);
    assert.equal(metadata.robots.index, true);
    assert.equal(metadata.alternates.canonical, terracottaHalfDayPaths[locale]);
    assert.deepEqual(metadata.alternates.languages, {
      en: terracottaHalfDayPaths.en,
      "zh-Hans": terracottaHalfDayPaths.zh,
      ko: terracottaHalfDayPaths.ko,
      fr: `/fr/tours/${terracottaHalfDaySlug}/`,
      es: `/es/tours/${terracottaHalfDaySlug}/`,
      "x-default": terracottaHalfDayPaths.en,
    });
  }
  const routes = [
    `app/(default)/tours/${terracottaHalfDaySlug}/page.tsx`,
    `app/(localized)/[locale]/tours/${terracottaHalfDaySlug}/page.tsx`,
  ];
  for (const path of routes) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /terracottaHalfDayMetadata\(/);
    assert.doesNotMatch(source, /NODE_ENV/, "the page is published, not development-only");
  }
  assert.match(readFileSync(routes[1], "utf8"), /return \[\{ locale: "zh" \}, \{ locale: "ko" \}\];/);
  for (const path of [`app/(default)/preview/${terracottaHalfDaySlug}`, `app/(localized)/[locale]/preview/${terracottaHalfDaySlug}`]) {
    assert.ok(!existsSync(path), `${path}: the preview route is gone`);
  }
  // In the sitemap's content manifest as a standalone tour page, and reserved from the catalogue route.
  const adapter = readFileSync("lib/legacySystemContentAdapter.ts", "utf8");
  assert.match(adapter, /const terracottaHalfDayNode: ContentNode = \{\s*id: terracottaHalfDaySlug,[\s\S]*?parentContentId: "tour-hub",[\s\S]*?indexability: \{ index: true, follow: true \}/u);
  assert.match(adapter, /fullTripNode,\s*terracottaHalfDayNode,/u);
  assert.match(readFileSync("lib/privateTourMetadata.ts", "utf8"), /"xian-terracotta-warriors-half-day-private-tour",\s*\] as const;/u);
});

test("the request leaves as a prepared message; the priced catalogue and inquiry database are untouched", () => {
  for (const path of ["lib/privateTourProducts.ts", "lib/privateTourInquiryContext.ts", "lib/privateTourInquiryIndex.ts", "lib/publishedPrivateTourCatalog.ts", "supabase/functions/_shared/traffic-contracts.ts"]) {
    assert.ok(!readFileSync(path, "utf8").includes(terracottaHalfDaySlug), `${path} must not register this page`);
  }
  for (const locale of locales) {
    const message = terracottaHalfDayMessage(locale, `https://homegroundchina.com${terracottaHalfDayPaths[locale]}`);
    const copy = terracottaHalfDayCopy[locale];
    assert.ok(message.startsWith(copy.message.opening));
    for (const label of [copy.message.date, copy.message.travellers, copy.message.hotel]) assert.ok(message.includes(label), `${locale}: ${label}`);
    assert.ok(message.endsWith(`https://homegroundchina.com${terracottaHalfDayPaths[locale]}`));
    assert.doesNotMatch(message, /passport|护照|여권|card|银行卡|카드/iu, `${locale}: the message asks for no passport or payment details`);
  }
  const [page, send] = ["components/TerracottaHalfDayPage.tsx", "components/TerracottaHalfDaySend.tsx"].map((path) => readFileSync(path, "utf8"));
  assert.doesNotMatch(page + send, /<form\b|fetch\(|lucide-react/);
  assert.match(page, /<TerracottaHalfDaySend locale=\{locale\} \/>/);
  assert.match(page, /href=\{`#\$\{terracottaHalfDayEnquiryAnchor\}`\}/);
  assert.match(send, /homegroundWhatsAppHref\(message\)/);
  assert.match(send, /mailto:\$\{homegroundBusiness\.serviceEmail\}/);
  // KakaoTalk leads on Korean pages, as on the full-trip page.
  assert.match(send, /locale === "ko" && send\.kakaoAction\s*\? <KakaoTalkContact buttonClassName=\{styles\.sendLine\}/);
});
