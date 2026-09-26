import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { historicalRouteServiceIds as routeServiceIds } from "../../lib/routeServiceInterest.ts";
import { guideTargets } from "../../lib/guideCommercialTargets.ts";
import {
  loadGuideMetadata,
  loadHighIntentCtaOwnershipRegistry,
  validateHighIntentCtaOwnershipRegistry,
} from "../../tools/check-high-intent-cta-ownership.mjs";

const [registry, guides] = await Promise.all([
  loadHighIntentCtaOwnershipRegistry(),
  loadGuideMetadata(),
]);
const commercialLinkSource = await readFile(
  new URL("../../lib/existingContentCommercialLinks.ts", import.meta.url),
  "utf8",
);
const commercialTargetSource = await readFile(
  new URL("../../lib/guideCommercialTargets.ts", import.meta.url),
  "utf8",
);
const itineraryReviewSource = await readFile(
  new URL("../../components/ChinaItineraryReviewPage.tsx", import.meta.url),
  "utf8",
);
const singaporeVisaSource = await readFile(
  new URL("../../lib/singaporeChinaVisaI18n.ts", import.meta.url),
  "utf8",
);

const expectedPublicCtaContentIds = [
  "beijing-courtyard-hotel-or-modern-hotel",
  "beijing-south-station-to-capital-or-daxing-airport",
  "beijing-where-to-stay-first-trip",
  "chongqing-railway-station-selector",
  "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
  "guilin-airport-or-railway-station-arrival-guide",
  "shanghai-hangzhou-transport-route",
  "shanghai-where-to-stay-first-trip",
  "xian-where-to-stay-city-wall-or-dayanta",
  "zhangjiajie-city-or-wulingyuan-hotel-base",
];

function keysFromCommercialBlock(startMarker, endMarker, pattern, source = commercialLinkSource) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  assert.notEqual(start, -1, `missing ${startMarker}`);
  assert.notEqual(end, -1, `missing ${endMarker}`);
  return [...source.slice(start, end).matchAll(pattern)]
    .map((match) => match[1])
    .sort();
}

function mutateRegistry(mutator) {
  const copy = structuredClone(registry);
  mutator(copy);
  return copy;
}

test("phase-one CTA ownership covers the exact high-intent inventory", () => {
  const report = validateHighIntentCtaOwnershipRegistry(
    registry,
    guides,
    routeServiceIds,
  );

  assert.deepEqual(report.counts, {
    stay: 20,
    "high-intent-transport": 27,
    plan: 33,
    "purchase-ticket": 3,
  });
  assert.equal(report.uniqueContentIds, 83);
  assert.equal(report.authorizedExistingService, 23);
  assert.equal(report.authorizedGenericConversation, 21);
  assert.equal(report.authorizedPublicCtas, 10);
  assert.equal(report.guideInlineSalesCards, 6);
  assert.equal(report.blockedPendingAuthorization, 39);
  assert.equal(registry.publicCtaChangesAuthorized, true);
  assert.equal(registry.publicServiceLaunchAuthorized, false);
  assert.deepEqual(
    [...registry.authorizedPublicCtaContentIds].sort(),
    expectedPublicCtaContentIds,
  );
  assert.equal(registry.requiredPublicCtaCount, 10);
  assert.deepEqual(registry.publicCtaTargetAnchors, {
    "itinerary-review": "review-my-route",
    "full-trip-support": "full-trip-support",
  });
  assert.match(commercialLinkSource, /import ctaOwnershipRegistry from/u);
  assert.doesNotMatch(commercialLinkSource, /const authorizedServiceCtas/u);
  assert.doesNotMatch(commercialLinkSource, /const serviceCtaCopy/u);
  assert.match(
    commercialLinkSource,
    /service=full-trip-support#planner-contact/u,
  );
  assert.match(commercialLinkSource, /entry.targetServiceId === "itinerary-review"\) return null/u);
  assert.doesNotMatch(itineraryReviewSource, /id: "review-my-route"|"@type": "Offer"/u);
});

test("commercial links keep the approved 8 hub, 75 curated guide and 48 product owners", () => {
  assert.deepEqual(
    keysFromCommercialBlock(
      "const destinationTargets = {",
      "} as const satisfies Record<DestinationHubId",
      /^  ([a-z][a-z0-9]*):/gmu,
    ),
    [
      "beijing",
      "chengdu",
      "chongqing",
      "guangzhou",
      "hangzhou",
      "shanghai",
      "xian",
      "zhangjiajie",
    ],
  );
  assert.deepEqual(
    keysFromCommercialBlock(
      "const guideTargets = {",
      "} as const satisfies Partial<Record<GuideId",
      /^  "([^"]+)":/gmu,
      commercialTargetSource,
    ),
    [
      "beijing-courtyard-hotel-or-modern-hotel",
      "beijing-to-badaling-great-wall-transfer",
      "beijing-where-to-stay-first-trip",
      "beijing-xian-chengdu-route-order",
      "beijing-zhangjiajie-shanghai-10-days",
      "beijing-zhangjiajie-shanghai-transport",
      "best-2-week-china-tour",
      "best-zhangjiajie-night-show",
      "border-town-fenghuang-chadong-shen-congwen",
      "chengdu-chongqing-zhangjiajie-itinerary",
      "chengdu-panda-base-or-dujiangyan-panda-valley",
      "chengdu-zhangjiajie-itinerary",
      "china-10-day-itinerary",
      "china-14-day-itinerary",
      "china-2-week-tour-cost",
      "china-240-hour-visa-free-transit-route-check",
      "china-7-day-itinerary",
      "china-climate-regions-for-trip-timing",
      "china-online-arrival-card",
      "china-power-plugs-voltage-and-adapters",
      "china-private-transfer-or-public-transport",
      "china-public-holidays-travel-calendar",
      "china-small-group-tours-2027",
      "china-visa-free-canadian-citizens-2026",
      "china-visa-free-new-zealand-citizens-2026",
      "china-visa-free-uk-citizens-2026",
      "chongqing-railway-station-selector",
      "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
      "do-us-citizens-need-visa-china-2026",
      "first-china-trip-jiangnan-6-or-beijing-11-days",
      "food-plants-and-animal-products-into-china",
      "forbidden-city-for-foreign-visitors",
      "great-wall-section-selector-from-beijing",
      "guangzhou-macau-transport-route",
      "guangzhou-shenzhen-hong-kong-route-order",
      "guilin-airport-or-railway-station-arrival-guide",
      "guilin-yangshuo-transport-route",
      "guilin-yangshuo-with-kids-and-older-parents",
      "how-much-does-a-china-trip-cost",
      "how-to-pay-in-china-as-a-tourist",
      "how-to-read-a-suzhou-garden",
      "humble-administrators-garden-tickets-entry",
      "jade-dragon-snow-mountain-cable-car-booking",
      "kunming-dali-lijiang-shangri-la-route-order",
      "li-river-cruise-tickets-piers-booking",
      "lijiang-shangri-la-transport-route",
      "lunar-new-year-customs-for-visitors",
      "national-museum-of-china-booking-and-route",
      "sanxingdui-museum-booking-and-gallery-order",
      "shaanxi-history-museum-booking-and-collection-plan",
      "shanghai-hangzhou-transport-route",
      "shanghai-museum-east-entry-reservations",
      "shanghai-pudong-or-hongqiao-airport",
      "shanghai-suzhou-hangzhou-nanjing-route-order",
      "shanghai-to-suzhou-day-trip",
      "shanghai-where-to-stay-first-trip",
      "singapore-to-zhangjiajie-itinerary",
      "summer-palace-gates-route-and-boat-plan",
      "suzhou-with-older-parents-garden-museum-transfer-day",
      "temple-of-heaven-gates-and-ritual-sequence",
      "terracotta-warriors-without-tour",
      "tianmen-mountain-tickets-and-routes",
      "xiamen-tulou-quanzhou-six-day-route",
      "xian-city-wall-tickets-gates-walk-or-bike",
      "xian-lanzhou-dunhuang-silk-road-route",
      "xian-where-to-stay-city-wall-or-dayanta",
      "yangshuo-town-or-yulong-river-where-to-stay",
      "yangtze-cruise-fit-china-itinerary",
      "zhangjiajie-arrival-departure-stations",
      "zhangjiajie-city-or-wulingyuan-hotel-base",
      "zhangjiajie-from-malaysia",
      "zhangjiajie-furong-fenghuang-route-order",
      "zhangjiajie-glass-bridge-vs-skywalk",
      "zhangjiajie-itinerary",
      "zhangjiajie-national-forest-park-tickets-and-entrances",
    ],
  );
  assert.deepEqual(
    keysFromCommercialBlock(
      "const productContexts = {",
      "} as const satisfies Record<string, ProductContextDefinition>",
      /^  "([^"]+)":/gmu,
    ),
    [
      "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
      "beijing-highlights-5-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
      "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
      "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
      "beijing-xian-guilin-hong-kong-10-day-private-tour",
      "beijing-xian-guilin-shanghai-10-day-private-tour",
      "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour",
      "beijing-xian-shanghai-12-day-private-tour",
      "beijing-xian-shanghai-8-day-private-tour",
      "beijing-xian-silk-road-15-day-private-tour",
      "beijing-xian-silk-road-15-day-small-group-tour",
      "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour",
      "beijing-xian-yunnan-14-day-private-tour",
      "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
      "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour",
      "changbaishan-yanji-winter-6-day-private-tour",
      "chaozhou-shantou-nanao-5-day-private-tour",
      "chengdu-chongqing-8-day-private-tour",
      "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
      "chengdu-pandas-sanxingdui-5-day-private-tour",
      "china-grand-tour-21-day-private-tour",
      "chongqing-wulong-5-day-private-tour",
      "chongqing-yangtze-cruise-6-day-private-tour",
      "datong-pingyao-6-day-private-tour",
      "guangzhou-shunde-foshan-5-day-private-tour",
      "guilin-yangshuo-5-day-private-tour",
      "guizhou-huangguoshu-libo-miao-7-day-private-tour",
      "harbin-winter-5-day-private-tour",
      "huangshan-hongcun-huizhou-5-day-private-tour",
      "hulunbuir-7-day-private-tour",
      "jingdezhen-wuyuan-wangxian-6-day-private-tour",
      "kunming-dali-lijiang-8-day-private-tour",
      "kunming-jianshui-yuanyang-6-day-private-tour",
      "luoyang-dengfeng-kaifeng-6-day-private-tour",
      "shanghai-disneyland-5-day-private-tour",
      "shanghai-suzhou-5-day-private-tour",
      "shanghai-suzhou-hangzhou-6-day-private-tour",
      "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour",
      "shenzhen-family-tech-4-day-private-tour",
      "xiamen-tulou-quanzhou-6-day-private-tour",
      "xian-terracotta-warriors-5-day-private-tour",
      "xinjiang-ili-sayram-8-day-private-tour",
      "zhangjiajie-4-day-private-tour",
      "zhangjiajie-forest-4-day-private-tour",
      "zhangjiajie-furong-fenghuang-7-day-private-tour",
      "zhangye-jiayuguan-dunhuang-7-day-private-tour",
    ],
  );
});

test("new route guides point to their matching private-tour products", () => {
  assert.deepEqual(guideTargets["xiamen-tulou-quanzhou-six-day-route"], [
    { kind: "product", slug: "xiamen-tulou-quanzhou-6-day-private-tour" },
  ]);
  assert.deepEqual(guideTargets["yangtze-cruise-fit-china-itinerary"], [
    { kind: "product", slug: "chongqing-yangtze-cruise-6-day-private-tour" },
    { kind: "product", slug: "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour" },
  ]);
});

test("Zhangjiajie commercial routes and Singapore planning links stay distinct", () => {
  assert.match(
    commercialTargetSource,
    /"best-zhangjiajie-night-show": \[classicZhangjiajie\]/u,
  );
  assert.match(
    commercialTargetSource,
    /"zhangjiajie-glass-bridge-vs-skywalk": \[classicZhangjiajie\]/u,
  );
  assert.match(
    commercialTargetSource,
    /"zhangjiajie-itinerary": \[\s*productTarget\("zhangjiajie-furong-fenghuang-7-day-private-tour"\),\s*classicZhangjiajie,\s*\]/u,
  );
  assert.equal(
    [...singaporeVisaSource.matchAll(/id: "singapore-to-zhangjiajie-itinerary"/gu)].length,
    3,
  );
});

test("duplicate CTA owners fail closed", () => {
  const duplicate = mutateRegistry((copy) => {
    copy.entries.push(structuredClone(copy.entries[0]));
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(duplicate, guides),
    /DUPLICATE_CTA_OWNER/u,
  );
});

test("unknown content identities fail closed", () => {
  const unknownContent = mutateRegistry((copy) => {
    copy.entries[0].contentId = "not-a-canonical-guide";
    copy.entries[0].originContentId = "not-a-canonical-guide";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unknownContent, guides),
    /UNKNOWN_CONTENT_ID/u,
  );
});

test("unknown service identities fail closed", () => {
  const unknownService = mutateRegistry((copy) => {
    const entry = copy.entries.find((candidate) => candidate.ownerClass === "plan");
    entry.targetServiceId = "ticket-booking";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unknownService, guides),
    /UNKNOWN_SERVICE_ID/u,
  );
});

test("an unlisted stay, ticket or transfer intent cannot acquire a service mapping", () => {
  const unauthorized = mutateRegistry((copy) => {
    const entry = copy.entries.find(
      (candidate) =>
        candidate.ownerClass === "stay"
        && candidate.authorizationStatus === "blocked-pending-central-authorization",
    );
    entry.targetServiceId = "route-build";
    entry.authorizationStatus = "authorized-existing-service";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unauthorized, guides),
    /UNAUTHORIZED_SERVICE_MAPPING/u,
  );
});

test("an explicitly authorized CTA cannot switch to a different service", () => {
  const mismatched = mutateRegistry((copy) => {
    const entry = copy.entries.find(
      (candidate) =>
        candidate.contentId === "beijing-courtyard-hotel-or-modern-hotel",
    );
    entry.targetServiceId = "route-build";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(mismatched, guides),
    /AUTHORIZED_SERVICE_MAPPING_MISMATCH/u,
  );
});

test("public CTA copy cannot lose its written service boundaries", () => {
  const unsafeCopy = mutateRegistry((copy) => {
    copy.publicCtaCopy.zh["full-trip-support"].body =
      "我们会处理你的住宿选择。";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unsafeCopy, guides),
    /PUBLIC_CTA_SAFETY_BOUNDARY_MISSING/u,
  );
});

test("public CTA copy cannot add a promise outside the reviewed body", () => {
  const unsafeCopy = mutateRegistry((copy) => {
    copy.publicCtaCopy.en["itinerary-review"].title =
      "Guaranteed vehicle, pickup and ticket service";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unsafeCopy, guides),
    /PUBLIC_CTA_COPY_REVIEW_REQUIRED/u,
  );
});

test("public CTA owners cannot drop a forbidden-claim boundary", () => {
  const reducedBoundary = mutateRegistry((copy) => {
    const entry = copy.entries.find(
      (candidate) =>
        candidate.contentId === "beijing-courtyard-hotel-or-modern-hotel",
    );
    entry.forbiddenClaims = ["hotel-real-time-availability"];
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(reducedBoundary, guides),
    /PUBLIC_CTA_FORBIDDEN_CLAIMS_DRIFT/u,
  );
});

test("public CTA fragments cannot drift away from real service anchors", () => {
  const wrongAnchor = mutateRegistry((copy) => {
    copy.publicCtaTargetAnchors["itinerary-review"] = "missing-service";
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(wrongAnchor, guides),
    /PUBLIC_CTA_TARGET_ANCHOR_DRIFT/u,
  );
});

test("a missing high-intent owner fails closed", () => {
  const missing = mutateRegistry((copy) => {
    copy.entries = copy.entries.slice(1);
  });

  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(missing, guides),
    /MISSING_HIGH_INTENT_OWNER/u,
  );
});

function inlineCard(copy, contentId) {
  return copy.guideInlineSalesCards.find((card) => card.contentId === contentId);
}

function ownerEntry(copy, contentId) {
  return copy.entries.find((entry) => entry.contentId === contentId);
}

test("inline sales cards record the six guide owners and their exact CTA kinds", () => {
  assert.deepEqual(
    registry.guideInlineSalesCards.map((card) => [
      card.contentId,
      card.ctaKind,
      card.ctaTarget,
      card.placement,
      card.image,
    ]),
    [
      ["zhangjiajie-older-travellers", "private-tour-product", "zhangjiajie-4-day-private-tour", "guide-inline", "product"],
      ["china-itinerary-with-older-parents", "private-tour-product", "shanghai-suzhou-hangzhou-6-day-private-tour", "guide-inline", "product"],
      ["china-itinerary-with-young-children", "private-tour-product", "chengdu-pandas-sanxingdui-5-day-private-tour", "guide-inline", "product"],
      ["do-singaporeans-need-visa-china", "private-tour-product", "shanghai-suzhou-hangzhou-6-day-private-tour", "guide-inline", "product"],
      ["wheelchair-accessible-china-route-planning", "private-tour-product", "shanghai-suzhou-5-day-private-tour", "guide-inline", "product"],
      ["china-accessible-hotel-room-verification", "private-tour-product", "shanghai-suzhou-5-day-private-tour", "guide-inline", "product"],
    ],
  );
  for (const card of registry.guideInlineSalesCards) {
    assert.ok(card.forbiddenClaims.includes("fit-verification-claim"), card.contentId);
  }

  const hotel = ownerEntry(registry, "china-accessible-hotel-room-verification");
  assert.equal(hotel.ctaPlacement, "guide-inline-card");
  assert.equal(hotel.targetServiceId, null);
  assert.equal(hotel.authorizationStatus, "authorized-generic-conversation");
  for (const claim of [
    "hotel-real-time-availability",
    "hotel-guest-acceptance-guarantee",
    "hotel-price-room-guarantee",
    "sensitive-data-first-contact",
  ]) {
    assert.ok(hotel.forbiddenClaims.includes(claim), claim);
  }
  assert.ok(!registry.authorizedPublicCtaContentIds.includes(hotel.contentId));

  const wheelchair = ownerEntry(registry, "wheelchair-accessible-china-route-planning");
  assert.equal(wheelchair.ctaPlacement, "guide-inline-card");
  assert.equal(wheelchair.targetServiceId, null);
  assert.equal(wheelchair.authorizationStatus, "authorized-generic-conversation");

  const children = ownerEntry(registry, "china-itinerary-with-young-children");
  assert.equal(children.ctaPlacement, "guide-inline-card");
  assert.equal(children.targetServiceId, null);
  assert.equal(children.authorizationStatus, "authorized-generic-conversation");
});

test("an inline card cannot point at an unknown guide or kind", () => {
  const unknownGuide = mutateRegistry((copy) => {
    inlineCard(copy, "do-singaporeans-need-visa-china").contentId = "not-a-guide";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unknownGuide, guides),
    /UNKNOWN_GUIDE_INLINE_CONTENT_ID/u,
  );

  const unknownKind = mutateRegistry((copy) => {
    inlineCard(copy, "do-singaporeans-need-visa-china").ctaKind = "matching-product";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(unknownKind, guides),
    /UNKNOWN_GUIDE_INLINE_CTA_KIND/u,
  );
});

test("reviewed product cards cannot be quietly turned into service claims", () => {
  const consultationOnAccessPage = mutateRegistry((copy) => {
    const card = inlineCard(copy, "wheelchair-accessible-china-route-planning");
    card.ctaKind = "trip-consultation";
    card.ctaTarget = "full-trip-support";
    card.image = "wheelchair-guide-photo";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(consultationOnAccessPage, guides),
    /GUIDE_INLINE_SERVICE_MISMATCH/u,
  );

  const serviceOwnerOnProduct = mutateRegistry((copy) => {
    const entry = ownerEntry(copy, "china-accessible-hotel-room-verification");
    entry.targetServiceId = "full-trip-support";
    entry.authorizationStatus = "authorized-existing-service";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(serviceOwnerOnProduct, guides),
    /UNAUTHORIZED_PRODUCT_MAPPING/u,
  );
});

test("inline cards cannot drop the fit-verification or hotel boundaries", () => {
  const noFitBoundary = mutateRegistry((copy) => {
    const card = inlineCard(copy, "china-itinerary-with-young-children");
    card.forbiddenClaims = card.forbiddenClaims.filter(
      (claim) => claim !== "fit-verification-claim",
    );
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(noFitBoundary, guides),
    /GUIDE_INLINE_FIT_CLAIM_BOUNDARY_MISSING/u,
  );

  const noRoomBoundary = mutateRegistry((copy) => {
    const entry = ownerEntry(copy, "china-accessible-hotel-room-verification");
    entry.forbiddenClaims = entry.forbiddenClaims.filter(
      (claim) => claim !== "hotel-price-room-guarantee",
    );
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(noRoomBoundary, guides),
    /PUBLIC_CTA_FORBIDDEN_CLAIMS_DRIFT/u,
  );
});

test("product cards only use their product photograph", () => {
  const newImage = mutateRegistry((copy) => {
    inlineCard(copy, "china-itinerary-with-older-parents").image = "ai-family-hero";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(newImage, guides),
    /GUIDE_INLINE_TARGET_MISMATCH/u,
  );
});

test("registry placement and inline cards must agree in both directions", () => {
  const cardWithoutOwner = mutateRegistry((copy) => {
    ownerEntry(copy, "china-itinerary-with-young-children").ctaPlacement = "existing-guide-footer";
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(cardWithoutOwner, guides),
    /GUIDE_INLINE_OWNER_PLACEMENT_MISMATCH/u,
  );

  const ownerWithoutCard = mutateRegistry((copy) => {
    copy.guideInlineSalesCards = copy.guideInlineSalesCards.filter(
      (card) => card.contentId !== "wheelchair-accessible-china-route-planning",
    );
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(ownerWithoutCard, guides),
    /GUIDE_INLINE_CARD_MISSING/u,
  );

  const duplicate = mutateRegistry((copy) => {
    copy.guideInlineSalesCards.push(structuredClone(copy.guideInlineSalesCards[0]));
  });
  assert.throws(
    () => validateHighIntentCtaOwnershipRegistry(duplicate, guides),
    /DUPLICATE_GUIDE_INLINE_SALES_CARD/u,
  );
});
