import assert from "node:assert/strict";
import test from "node:test";

import {
  buildGuideSearchDocuments,
  normalizeGuideSearchText,
  searchGuideDocuments,
} from "../../lib/guideSearch.ts";

function manifestEntry({
  contentId,
  locale,
  title,
  h1,
  description,
  searchTerms = [],
  entityIds = [],
  index = true,
  status = "published",
  bodyResource,
  section = "plan",
}) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const guideId = contentId.replace(/^guide-/u, "");
  return {
    contentId,
    family: "task",
    section,
    primaryIntent: "plan",
    locale,
    schemaLocale: locale === "zh" ? "zh-Hans" : locale,
    hreflang: locale === "zh" ? "zh-Hans" : locale,
    path: `${prefix}/guides/${guideId}/`,
    canonicalPath: `${prefix}/guides/${guideId}/`,
    alternates: {},
    title,
    description,
    h1,
    bodyResource: bodyResource ?? `guide:${guideId}`,
    searchTerms,
    localizationStatus: locale === "en" ? "source" : "localized",
    openGraphLocale: null,
    ctaId: "trip-brief",
    entityIds,
    relationIds: [],
    factIds: [],
    sourceIds: [],
    mediaIds: [],
    schemaTypes: ["Article"],
    legacyAliases: [],
    status,
    indexability: { index, follow: true },
    dates: { dateModified: "2026-08-21" },
    updatePolicy: { volatility: "low", refreshCadence: "quarterly" },
  };
}

const entities = [
  {
    id: "city-xian",
    entityType: "city",
    names: {
      en: { name: "Xi’an", aliases: ["Xian"] },
      "zh-Hans": { name: "西安" },
      ko: { name: "시안" },
    },
    sourceIds: [],
    status: "published",
  },
  {
    id: "city-beijing",
    entityType: "city",
    names: {
      en: { name: "Beijing" },
      "zh-Hans": { name: "北京" },
      ko: { name: "베이징" },
    },
    sourceIds: [],
    status: "published",
  },
  {
    id: "city-zhangjiajie",
    entityType: "city",
    names: {
      en: { name: "Zhangjiajie" },
      "zh-Hans": { name: "张家界" },
      ko: { name: "장자제", aliases: ["장가계"] },
    },
    sourceIds: [],
    status: "published",
  },
];

const collections = [
  {
    id: "route-order",
    guideContentIds: [
      "guide-ancient-route",
      "guide-beijing-airport",
      "guide-zhangjiajie-base",
      "guide-zhangjiajie-base-zh",
      "guide-exact-match",
      "guide-description-match",
    ],
    locales: {
      en: { label: "Trip length and city order" },
      zh: { label: "天数与城市顺序" },
      ko: { label: "여행 기간과 도시 순서" },
    },
  },
];

const manifest = {
  schemaVersion: "1.0.0",
  entries: [
    manifestEntry({
      contentId: "guide-ancient-route",
      locale: "en",
      title: "An Ancient City Route",
      h1: "Build an Ancient City Route",
      description: "Choose a practical two-day sequence.",
      entityIds: ["city-xian"],
    }),
    manifestEntry({
      contentId: "guide-beijing-airport",
      locale: "zh",
      title: "北京机场进城指南",
      h1: "从北京机场进入市区",
      description: "比较机场快线、出租车和私人接送。",
      searchTerms: ["北京机场怎么进城"],
      entityIds: ["city-beijing"],
      section: "transport",
    }),
    manifestEntry({
      contentId: "guide-zhangjiajie-base",
      locale: "ko",
      title: "장자제 숙소 거점",
      h1: "장자제 시내와 우링위안 중 어디에 머물까",
      description: "공원 입장 시간과 이동을 기준으로 숙소를 고릅니다.",
      entityIds: ["city-zhangjiajie"],
      section: "stay",
    }),
    manifestEntry({
      contentId: "guide-zhangjiajie-base-zh",
      locale: "zh",
      title: "住张家界市区还是武陵源",
      h1: "住张家界市区还是武陵源？从景点顺序选择住宿基地",
      description: "比较抵达、离开和公园游览顺序，再决定每一晚住在哪里。",
      entityIds: ["city-zhangjiajie"],
      section: "stay",
    }),
    manifestEntry({
      contentId: "guide-exact-match",
      locale: "en",
      title: "China Rail Pass",
      h1: "China Rail Pass",
      description: "A direct decision guide.",
    }),
    manifestEntry({
      contentId: "guide-description-match",
      locale: "en",
      title: "Buying Train Tickets",
      h1: "How to Buy Train Tickets",
      description: "Explains why a China rail pass is not the default answer.",
    }),
    manifestEntry({
      contentId: "guide-private-draft",
      locale: "en",
      title: "Private draft",
      h1: "Private draft",
      description: "This must not be searchable.",
      index: false,
    }),
    manifestEntry({
      contentId: "hub-plan",
      locale: "en",
      title: "Planning hub",
      h1: "Planning hub",
      description: "System navigation, not a guide.",
      bodyResource: "search-hub:plan",
    }),
  ],
};

const documents = buildGuideSearchDocuments(manifest, entities, collections);

const naturalLanguageDocuments = [
  {
    contentId: "guide-parents-en",
    guideId: "parents-en",
    locale: "en",
    path: "/guides/parents-en/",
    title: "China With Older Parents: A Realistic Itinerary",
    h1: "Taking Your Parents to China?",
    description: "Plan walking, transfers and recovery time.",
    searchTerms: [],
    entityTerms: ["China"],
    collectionLabel: "Traveller itineraries",
    section: "plan",
    dateModified: null,
  },
  {
    contentId: "guide-airport-zh",
    guideId: "airport-zh",
    locale: "zh",
    path: "/zh/guides/airport-zh/",
    title: "北京机场交通指南",
    h1: "从北京机场进入市区",
    description: "比较机场快线、出租车和私人接送。",
    searchTerms: [],
    entityTerms: ["北京"],
    collectionLabel: "机场与车站",
    section: "transport",
    dateModified: null,
  },
  {
    contentId: "guide-airport-ko",
    guideId: "airport-ko",
    locale: "ko",
    path: "/ko/guides/airport-ko/",
    title: "베이징 공항 이동 가이드",
    h1: "베이징 공항에서 호텔까지 이동하기",
    description: "공항철도, 택시와 픽업을 비교합니다.",
    searchTerms: [],
    entityTerms: ["베이징"],
    collectionLabel: "공항과 기차역",
    section: "transport",
    dateModified: null,
  },
  {
    contentId: "guide-passport-en",
    guideId: "passport-en",
    locale: "en",
    path: "/guides/passport-en/",
    title: "Passport Checks for a China Trip",
    h1: "What to Check Before a China Trip",
    description: "Confirm the details with the airline before flying.",
    searchTerms: [],
    entityTerms: ["China"],
    collectionLabel: "Entry essentials",
    section: "essentials",
    dateModified: null,
  },
  {
    contentId: "guide-airport-guangzhou-zh",
    guideId: "airport-guangzhou-zh",
    locale: "zh",
    path: "/zh/guides/airport-guangzhou-zh/",
    title: "广州机场怎么走",
    h1: "从广州机场进入市区",
    description: "比较机场进城路线。",
    searchTerms: [],
    entityTerms: ["广州"],
    collectionLabel: "机场与车站",
    section: "transport",
    dateModified: null,
  },
  {
    contentId: "guide-airport-shanghai-ko",
    guideId: "airport-shanghai-ko",
    locale: "ko",
    path: "/ko/guides/airport-shanghai-ko/",
    title: "상하이 공항 이동 가이드",
    h1: "상하이 공항에서 시내로 이동하기",
    description: "공항과 시내 이동을 비교합니다.",
    searchTerms: [],
    entityTerms: ["상하이"],
    collectionLabel: "공항과 기차역",
    section: "transport",
    dateModified: null,
  },
];

test("buildGuideSearchDocuments includes only published, indexable guide entries", () => {
  assert.deepEqual(
    documents.map((document) => `${document.locale}:${document.guideId}`),
    [
      "en:ancient-route",
      "en:description-match",
      "en:exact-match",
      "ko:zhangjiajie-base",
      "zh:beijing-airport",
      "zh:zhangjiajie-base-zh",
    ],
  );
  assert.equal(
    documents.find((document) => document.guideId === "ancient-route")
      ?.collectionLabel,
    "Trip length and city order",
  );
});

test("normalization is deterministic across width, punctuation and whitespace", () => {
  assert.equal(normalizeGuideSearchText("  ＢＥＩＪＩＮＧ—Airport  ", "en"), "beijing airport");
  assert.equal(normalizeGuideSearchText("北京，  机场", "zh"), "北京 机场");
  assert.equal(normalizeGuideSearchText("장자제·숙소", "ko"), "장자제 숙소");
});

test("entity aliases and current-locale metadata are searchable without cross-locale leakage", () => {
  assert.equal(searchGuideDocuments(documents, "XIAN", "en")[0]?.document.guideId, "ancient-route");
  assert.equal(searchGuideDocuments(documents, "北京，机场", "zh")[0]?.document.guideId, "beijing-airport");
  assert.equal(
    searchGuideDocuments(documents, "张家界住市区还是武陵源", "zh")[0]
      ?.document.guideId,
    "zhangjiajie-base-zh",
  );
  assert.equal(searchGuideDocuments(documents, "장가계", "ko")[0]?.document.guideId, "zhangjiajie-base");
  assert.equal(searchGuideDocuments(documents, "장가계", "en").length, 0);
});

test("exact heading matches rank above description-only matches", () => {
  const results = searchGuideDocuments(documents, "China rail pass", "en");
  assert.deepEqual(
    results.slice(0, 2).map((result) => result.document.guideId),
    ["exact-match", "description-match"],
  );
});

test("natural-language queries tolerate one unmatched word without fuzzy expansion", () => {
  assert.deepEqual(
    searchGuideDocuments(naturalLanguageDocuments, "China trip with parents", "en")
      .map((result) => result.document.guideId),
    ["parents-en"],
  );
  assert.deepEqual(
    searchGuideDocuments(naturalLanguageDocuments, "北京机场怎么进城", "zh")
      .map((result) => result.document.guideId),
    ["airport-zh"],
  );
  assert.deepEqual(
    searchGuideDocuments(naturalLanguageDocuments, "베이징 공항 시내 이동", "ko")
      .map((result) => result.document.guideId),
    ["airport-ko"],
  );
});

test("an explicit hotel question ranks the stay guide above location-only matches", () => {
  const zhangjiajieDocuments = [
    {
      contentId: "guide-zhangjiajie-transport-zh",
      guideId: "zhangjiajie-transport-zh",
      locale: "zh",
      path: "/zh/guides/zhangjiajie-transport-zh/",
      title: "张家界交通安排",
      h1: "张家界交通与游览顺序",
      description: "比较抵达、景区交通和离开方式。",
      searchTerms: [],
      entityTerms: ["张家界"],
      collectionLabel: "城市之间的路线",
      section: "transport",
      dateModified: null,
    },
    {
      contentId: "guide-zhangjiajie-stay-zh",
      guideId: "zhangjiajie-stay-zh",
      locale: "zh",
      path: "/zh/guides/zhangjiajie-stay-zh/",
      title: "张家界住宿区域",
      h1: "住张家界市区还是武陵源",
      description: "根据景点顺序决定住在哪里。",
      searchTerms: [],
      entityTerms: ["张家界"],
      collectionLabel: "住宿区域",
      section: "stay",
      dateModified: null,
    },
  ];

  assert.equal(
    searchGuideDocuments(zhangjiajieDocuments, "张家界住哪里", "zh")[0]
      ?.document.guideId,
    "zhangjiajie-stay-zh",
  );
});

test("empty, one-letter English and body-only queries return no results", () => {
  assert.deepEqual(searchGuideDocuments(documents, "  ", "en"), []);
  assert.deepEqual(searchGuideDocuments(documents, "a", "en"), []);
  assert.deepEqual(searchGuideDocuments(documents, "secret waterfall", "en"), []);
});
