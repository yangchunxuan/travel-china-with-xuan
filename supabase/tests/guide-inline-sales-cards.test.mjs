import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  getDefaultGuideSalesCard,
  getGuideSalesCard,
  guideSalesCardGuideIds,
  privateTourCollectionCtaId,
} from "../../lib/guideSalesCards.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";

const locales = ["en", "zh", "ko"];
const localePrefix = { en: "", zh: "/zh", ko: "/ko" };
const registry = JSON.parse(
  await readFile(
    new URL("../../docs/organic-growth/high-intent-cta-ownership-registry.json", import.meta.url),
    "utf8",
  ),
);
const source = async (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const [
  editorialPage,
  cardComponent,
  olderTravellersPage,
  olderParentsPage,
  singaporeVisaPage,
  commercialLinks,
  guideTourCardSource,
  guideRegistrySource,
  generatedRegistrySource,
] = await Promise.all([
  source("components/content/EditorialGuidePage.tsx"),
  source("components/content/GuideTourCard.tsx"),
  source("components/ZhangjiajieOlderTravellersPage.tsx"),
  source("components/ChinaItineraryWithOlderParentsPage.tsx"),
  source("components/SingaporeChinaVisaPage.tsx"),
  source("lib/existingContentCommercialLinks.ts"),
  source("lib/guideTourCard.ts"),
  source("lib/guideRegistry.ts"),
  source("lib/generated/guideRegistry.generated.ts"),
]);

function quotedIds(sourceText, expression) {
  const block = sourceText.match(expression);
  assert.ok(block, `missing id block: ${expression}`);
  return [...block[1].matchAll(/"([a-z0-9-]+)"/gu)].map((match) => match[1]);
}

const legacyGuideIds = quotedIds(
  guideRegistrySource,
  /legacyGuideIds = \[([\s\S]*?)\] as const/u,
);
const guideIds = [
  ...legacyGuideIds,
  ...quotedIds(
    generatedRegistrySource,
    /generatedGuideIds = \[([\s\S]*?)\] as const/u,
  ),
];

const productIds = getPublishedPrivateTourCatalog("en").map((product) => product.id);

const expected = {
  "zhangjiajie-older-travellers": {
    kind: "private-tour-product",
    ctaId: "zhangjiajie-4-day-private-tour",
    href: (locale) => `${localePrefix[locale]}/tours/zhangjiajie-4-day-private-tour/`,
  },
  "china-itinerary-with-older-parents": {
    kind: "private-tour-collection",
    ctaId: privateTourCollectionCtaId,
    image: "beijing-tour-photo",
    href: (locale) => `${localePrefix[locale]}/tours/`,
  },
  "china-itinerary-with-young-children": {
    kind: "private-tour-collection",
    ctaId: privateTourCollectionCtaId,
    image: "beijing-tour-photo",
    href: (locale) => `${localePrefix[locale]}/tours/`,
  },
  "do-singaporeans-need-visa-china": {
    kind: "private-tour-collection",
    ctaId: privateTourCollectionCtaId,
    image: "beijing-tour-photo",
    href: (locale) => `${localePrefix[locale]}/tours/`,
  },
  "wheelchair-accessible-china-route-planning": {
    kind: "trip-consultation",
    ctaId: "full-trip-support",
    image: "wheelchair-guide-photo",
    href: (locale) => `${localePrefix[locale]}/?service=full-trip-support#planner-contact`,
  },
  "china-accessible-hotel-room-verification": {
    kind: "trip-consultation",
    ctaId: "full-trip-support",
    image: "hotel-guide-photo",
    href: (locale) => `${localePrefix[locale]}/?service=full-trip-support#planner-contact`,
  },
};

// Wording that would present a route, room or vehicle as already checked or
// guaranteed for the reader. The card may invite that check, never claim it.
const fitClaims = [
  /\bmatching\b/iu,
  /\bsuitable\b/iu,
  /\bideal for\b/iu,
  /\bverified\b/iu,
  /\bguarantee/iu,
  /\bwheelchair[- ]accessible\b/iu,
  /\baccessible (?:room|route|tour|hotel)/iu,
  /\bsenior[- ]friendly\b/iu,
  /\bkid[- ]friendly\b/iu,
  /\bchild[- ]friendly\b/iu,
  /对应的私家团/u,
  /已核实|已核验|已验证|保证|无障碍房|无障碍路线|适合长辈|适合老人|适合儿童|适合孩子/u,
  /관련 프라이빗 투어/u,
  /보장|검증된|확인된 객실|휠체어 전용|어르신에게 적합|아이에게 적합/u,
];

test("the six guides resolve to exactly one planned sales card each", () => {
  assert.deepEqual([...guideSalesCardGuideIds].sort(), Object.keys(expected).sort());
});

test("every registered guide can use the localized safe collection fallback", () => {
  let combinations = 0;
  for (const guideId of guideIds) {
    for (const locale of locales) {
      combinations += 1;
      const card = getDefaultGuideSalesCard(guideId, locale);
      assert.ok(card.title && card.action && card.image.alt, `${guideId}/${locale}`);
      assert.ok(card.image.src && card.image.srcSet, `${guideId}/${locale} image`);
      assert.equal(card.kind, "private-tour-collection");
      assert.equal(card.ctaId, privateTourCollectionCtaId, `${guideId}/${locale}`);
      assert.equal(card.href, `${localePrefix[locale]}/tours/`);
      for (const text of [card.label, card.title, card.note ?? "", card.action]) {
        assert.doesNotMatch(text, /Matching private tour|对应的私家团|관련 프라이빗 투어/u);
      }
    }
  }
  assert.equal(guideIds.length, 202);
  assert.equal(legacyGuideIds.length, 19);
  assert.equal(combinations, 606);
});

test("unmapped and non-product targets end in the safe collection fallback", () => {
  assert.match(guideTourCardSource, /return getDefaultGuideSalesCard\(guideId, locale\);/u);
  assert.doesNotMatch(guideTourCardSource, /if \(!target\) return null/u);
  assert.doesNotMatch(guideTourCardSource, /if \(!product\) return null/u);
});

for (const [guideId, want] of Object.entries(expected)) {
  test(`${guideId}: CTA kind, target and EN/ZH/KO href`, () => {
    for (const locale of locales) {
      const card = getGuideSalesCard(guideId, locale);
      assert.equal(card.kind, want.kind, `${locale} kind`);
      assert.equal(card.ctaId, want.ctaId, `${locale} ctaId`);
      assert.equal(card.href, want.href(locale), `${locale} href`);
      if (locale !== "en") assert.ok(card.href.startsWith(`/${locale}/`), `${locale} path`);
      else assert.ok(!/^\/(?:zh|ko)\//u.test(card.href), "en path");
      if (want.image) {
        if (want.image === "beijing-tour-photo") {
          assert.match(card.image.src, /^\/images\/private-tour-cards\/beijing-highlights-5-day-private-tour-/u);
        } else {
          const expectedImage = {
            "wheelchair-guide-photo": "/images/guides/wheelchair-accessible-china-route-planning/hero-1600.webp",
            "hotel-guide-photo": "/images/guides/china-accessible-hotel-room-verification/hero-1600.webp",
          }[want.image];
          assert.equal(card.image.src, expectedImage, `${locale} image`);
        }
        for (const candidate of card.image.srcSet.split(", ")) {
          const path = candidate.split(" ")[0];
          assert.ok(existsSync(new URL(`../../public${path}`, import.meta.url)), path);
        }
      } else {
        assert.match(card.image.src, /^\/images\/private-tour-cards\/zhangjiajie-4-day-private-tour-/u);
      }
      assert.ok(card.title.length > 0 && card.action.length > 0 && card.image.alt.length > 0);
      for (const text of [card.label, card.title, card.note ?? "", card.action]) {
        for (const claim of fitClaims) assert.doesNotMatch(text, claim, `${locale}: ${text}`);
      }
    }
  });
}

test("access and hotel pages never carry a fixed product", () => {
  for (const guideId of [
    "wheelchair-accessible-china-route-planning",
    "china-accessible-hotel-room-verification",
  ]) {
    for (const locale of locales) {
      const card = getGuideSalesCard(guideId, locale);
      const serialised = JSON.stringify(card);
      for (const productId of productIds) {
        assert.ok(!serialised.includes(productId), `${guideId}/${locale} -> ${productId}`);
      }
      assert.ok(card.note, `${guideId}/${locale} must state what is checked before quoting`);
    }
  }
  for (const [locale, fragment] of [
    ["en", "checked one by one before we quote"],
    ["zh", "报价前逐项核实"],
    ["ko", "견적 전에 하나씩 확인"],
  ]) {
    assert.ok(getGuideSalesCard("wheelchair-accessible-china-route-planning", locale).note.includes(fragment));
  }
  for (const [locale, fragment] of [
    ["en", "confirmed before quoting and booking"],
    ["zh", "须在报价和预订前确认"],
    ["ko", "견적과 예약 전에 확인"],
  ]) {
    assert.ok(getGuideSalesCard("china-accessible-hotel-room-verification", locale).note.includes(fragment));
  }
});

test("the Singapore visa guide does not steer readers to a Zhangjiajie product", () => {
  for (const locale of locales) {
    const card = getGuideSalesCard("do-singaporeans-need-visa-china", locale);
    const serialised = JSON.stringify(card);
    assert.doesNotMatch(serialised, /zhangjiajie|张家界|장자제/iu);
    assert.equal(card.kind, "private-tour-collection");
    assert.equal(card.href, `${localePrefix[locale]}/tours/`);
  }
});

test("the Zhangjiajie older-travellers guide links only the classic 4-day route", () => {
  for (const locale of locales) {
    const card = getGuideSalesCard("zhangjiajie-older-travellers", locale);
    assert.equal(card.ctaId, "zhangjiajie-4-day-private-tour");
    assert.doesNotMatch(JSON.stringify(card), /zhangjiajie-forest-4-day-private-tour/u);
    assert.ok(card.note, `${locale} must say walking and pace are adjusted after confirmation`);
  }
  assert.doesNotMatch(olderTravellersPage, /tourHref|getPrivateTourPaths|relatedTour/u);
});

test("the planned guides are not also product-mapped, so no route list repeats the card", () => {
  const block = commercialLinks.slice(
    commercialLinks.indexOf("const guideTargets = {"),
    commercialLinks.indexOf("const approvedCommercialGuideIds"),
  );
  for (const guideId of guideSalesCardGuideIds) {
    assert.ok(!block.includes(`"${guideId}"`), guideId);
  }
});

test("pages render the card inline, tracked, and never twice with the same planner", () => {
  assert.match(cardComponent, /position="inline"/u);
  assert.match(cardComponent, /<GuideCtaLink/u);
  assert.match(cardComponent, /data-guide-cta-kind=\{card\.kind\}/u);
  assert.match(cardComponent, /data-guide-tour-card=\{card\.ctaId\}/u);
  assert.match(editorialPage, /getGuideTourCard\(guide\.id, locale\)/u);
  assert.match(editorialPage, /const showFooterCta = tourCard\?\.kind !== "trip-consultation";/u);
  assert.match(editorialPage, /\{showFooterCta \? \(/u);
  for (const page of [olderTravellersPage, olderParentsPage, singaporeVisaPage]) {
    assert.match(page, /getGuideTourCard\(guideId, locale\)/u);
    assert.equal(page.match(/<GuideTourCard /gu)?.length, 1);
  }
});

test("the ownership registry matches every rendered card kind, target and placement", () => {
  const cards = new Map(registry.guideInlineSalesCards.map((card) => [card.contentId, card]));
  assert.deepEqual([...cards.keys()].sort(), [...guideSalesCardGuideIds].sort());
  for (const guideId of guideSalesCardGuideIds) {
    const card = getGuideSalesCard(guideId, "en");
    const record = cards.get(guideId);
    assert.equal(record.ctaKind, card.kind, guideId);
    assert.equal(record.ctaTarget, card.ctaId, guideId);
    assert.equal(record.placement, "guide-inline", guideId);
    assert.equal(
      record.image,
      card.kind === "private-tour-product" ? "product" : expected[guideId].image,
      guideId,
    );
    const owner = registry.entries.find((entry) => entry.contentId === guideId);
    if (owner) {
      assert.equal(owner.ctaPlacement, "guide-inline-card", guideId);
      assert.equal(owner.targetServiceId, card.kind === "trip-consultation" ? card.ctaId : null, guideId);
    }
  }
});
