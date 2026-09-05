import {
  getDestinationHubEntry,
  type DestinationHubId,
} from "./destinationHubs";
import { getGuideEntry, type GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import {
  getPrivateTourPaths,
  getPrivateTourProduct,
} from "./privateTourProducts";
import {
  productPreviewCopy,
  zhangjiajiePrivateTourPaths,
} from "./zhangjiajiePrivateTourPreview";
import ctaOwnershipRegistry from "../docs/organic-growth/high-intent-cta-ownership-registry.json";

export interface ExistingContentCommercialLink {
  readonly id: string;
  readonly href: string;
  readonly label: string;
}

type ProductTarget =
  | { readonly kind: "product"; readonly slug: string }
  | { readonly kind: "classic-zhangjiajie" }
  | {
      readonly kind: "tours-hub";
      readonly reason: "inventory-with-transport" | "no-local-route";
    };

const p = (slug: string): ProductTarget => ({ kind: "product", slug });
const classicZhangjiajie: ProductTarget = { kind: "classic-zhangjiajie" };
const toursWithTransport: ProductTarget = {
  kind: "tours-hub",
  reason: "inventory-with-transport",
};
const toursHubNoLocalRoute: ProductTarget = {
  kind: "tours-hub",
  reason: "no-local-route",
};

const destinationTargets = {
  beijing: [p("beijing-highlights-5-day-private-tour")],
  shanghai: [
    p("shanghai-suzhou-5-day-private-tour"),
    p("shanghai-suzhou-hangzhou-6-day-private-tour"),
  ],
  xian: [p("xian-terracotta-warriors-5-day-private-tour")],
  chengdu: [p("chengdu-pandas-sanxingdui-5-day-private-tour")],
  guangzhou: [toursHubNoLocalRoute],
  hangzhou: [p("shanghai-suzhou-hangzhou-6-day-private-tour")],
  zhangjiajie: [
    classicZhangjiajie,
    p("zhangjiajie-forest-4-day-private-tour"),
  ],
  chongqing: [p("chongqing-wulong-5-day-private-tour")],
} as const satisfies Record<DestinationHubId, readonly ProductTarget[]>;

const guideTargets = {
  "beijing-courtyard-hotel-or-modern-hotel": [p("beijing-highlights-5-day-private-tour")],
  "beijing-where-to-stay-first-trip": [p("beijing-highlights-5-day-private-tour")],
  "beijing-to-badaling-great-wall-transfer": [p("beijing-highlights-5-day-private-tour")],
  "great-wall-section-selector-from-beijing": [p("beijing-highlights-5-day-private-tour")],
  "forbidden-city-for-foreign-visitors": [p("beijing-highlights-5-day-private-tour")],
  "temple-of-heaven-gates-and-ritual-sequence": [p("beijing-highlights-5-day-private-tour")],
  "shanghai-where-to-stay-first-trip": [
    p("shanghai-suzhou-5-day-private-tour"),
    p("shanghai-suzhou-hangzhou-6-day-private-tour"),
  ],
  "xian-where-to-stay-city-wall-or-dayanta": [p("xian-terracotta-warriors-5-day-private-tour")],
  "shanghai-pudong-or-hongqiao-airport": [p("shanghai-suzhou-5-day-private-tour")],
  "shanghai-hangzhou-transport-route": [p("shanghai-suzhou-hangzhou-6-day-private-tour")],
  "how-to-read-a-suzhou-garden": [
    p("shanghai-suzhou-5-day-private-tour"),
    p("shanghai-suzhou-hangzhou-6-day-private-tour"),
  ],
  "chengdu-panda-base-or-dujiangyan-panda-valley": [p("chengdu-pandas-sanxingdui-5-day-private-tour")],
  "sanxingdui-museum-booking-and-gallery-order": [p("chengdu-pandas-sanxingdui-5-day-private-tour")],
  "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba": [p("chongqing-wulong-5-day-private-tour")],
  "chongqing-railway-station-selector": [p("chongqing-wulong-5-day-private-tour")],
  "guilin-airport-or-railway-station-arrival-guide": [p("guilin-yangshuo-5-day-private-tour")],
  "guilin-yangshuo-transport-route": [p("guilin-yangshuo-5-day-private-tour")],
  "yangshuo-town-or-yulong-river-where-to-stay": [p("guilin-yangshuo-5-day-private-tour")],
  "zhangjiajie-city-or-wulingyuan-hotel-base": [
    classicZhangjiajie,
    p("zhangjiajie-forest-4-day-private-tour"),
  ],
  "china-private-transfer-or-public-transport": [toursWithTransport],
  "china-climate-regions-for-trip-timing": [p("harbin-winter-5-day-private-tour")],
} as const satisfies Partial<Record<GuideId, readonly ProductTarget[]>>;

const approvedCommercialGuideIds = [
  "beijing-courtyard-hotel-or-modern-hotel",
  "beijing-where-to-stay-first-trip",
  "beijing-to-badaling-great-wall-transfer",
  "great-wall-section-selector-from-beijing",
  "forbidden-city-for-foreign-visitors",
  "temple-of-heaven-gates-and-ritual-sequence",
  "shanghai-where-to-stay-first-trip",
  "xian-where-to-stay-city-wall-or-dayanta",
  "shanghai-pudong-or-hongqiao-airport",
  "shanghai-hangzhou-transport-route",
  "how-to-read-a-suzhou-garden",
  "chengdu-panda-base-or-dujiangyan-panda-valley",
  "sanxingdui-museum-booking-and-gallery-order",
  "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
  "chongqing-railway-station-selector",
  "guilin-airport-or-railway-station-arrival-guide",
  "guilin-yangshuo-transport-route",
  "yangshuo-town-or-yulong-river-where-to-stay",
  "zhangjiajie-city-or-wulingyuan-hotel-base",
  "china-private-transfer-or-public-transport",
  "china-climate-regions-for-trip-timing",
] as const satisfies readonly GuideId[];

interface ProductContextDefinition {
  readonly destinations: readonly DestinationHubId[];
  readonly guides: readonly GuideId[];
  readonly relatedProducts?: readonly ProductTarget[];
}

const productContexts = {
  "shanghai-suzhou-hangzhou-6-day-private-tour": {
    destinations: ["shanghai", "hangzhou"],
    guides: ["shanghai-suzhou-hangzhou-nanjing-route-order", "shanghai-hangzhou-transport-route"],
    relatedProducts: [p("shanghai-suzhou-5-day-private-tour")],
  },
  "chengdu-pandas-sanxingdui-5-day-private-tour": {
    destinations: ["chengdu"],
    guides: ["chengdu-panda-base-or-dujiangyan-panda-valley", "sanxingdui-museum-booking-and-gallery-order"],
  },
  "xian-terracotta-warriors-5-day-private-tour": {
    destinations: ["xian"],
    guides: ["terracotta-warriors-without-tour", "xian-where-to-stay-city-wall-or-dayanta"],
  },
  "chongqing-wulong-5-day-private-tour": {
    destinations: ["chongqing"],
    guides: ["chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba", "chongqing-railway-station-selector"],
  },
  "guilin-yangshuo-5-day-private-tour": {
    destinations: [],
    guides: ["guilin-airport-or-railway-station-arrival-guide", "guilin-yangshuo-transport-route", "yangshuo-town-or-yulong-river-where-to-stay"],
  },
  "harbin-winter-5-day-private-tour": {
    destinations: [],
    guides: ["china-climate-regions-for-trip-timing"],
  },
  "shanghai-suzhou-5-day-private-tour": {
    destinations: ["shanghai"],
    guides: ["shanghai-where-to-stay-first-trip", "how-to-read-a-suzhou-garden"],
    relatedProducts: [p("shanghai-suzhou-hangzhou-6-day-private-tour")],
  },
  "beijing-highlights-5-day-private-tour": {
    destinations: ["beijing"],
    guides: ["great-wall-section-selector-from-beijing", "beijing-where-to-stay-first-trip"],
  },
  "zhangjiajie-forest-4-day-private-tour": {
    destinations: ["zhangjiajie"],
    guides: ["zhangjiajie-national-forest-park-tickets-and-entrances", "zhangjiajie-city-or-wulingyuan-hotel-base"],
  },
  "zhangjiajie-4-day-private-tour": {
    destinations: ["zhangjiajie"],
    guides: ["zhangjiajie-national-forest-park-tickets-and-entrances", "zhangjiajie-city-or-wulingyuan-hotel-base"],
  },
} as const satisfies Record<string, ProductContextDefinition>;

const approvedCommercialProductSlugs = [
  "shanghai-suzhou-hangzhou-6-day-private-tour",
  "chengdu-pandas-sanxingdui-5-day-private-tour",
  "xian-terracotta-warriors-5-day-private-tour",
  "chongqing-wulong-5-day-private-tour",
  "guilin-yangshuo-5-day-private-tour",
  "harbin-winter-5-day-private-tour",
  "shanghai-suzhou-5-day-private-tour",
  "beijing-highlights-5-day-private-tour",
  "zhangjiajie-forest-4-day-private-tour",
  "zhangjiajie-4-day-private-tour",
] as const;

function assertExactKeys(
  label: string,
  actual: readonly string[],
  approved: readonly string[],
) {
  const sortedActual = [...actual].sort();
  const sortedApproved = [...approved].sort();
  if (JSON.stringify(sortedActual) !== JSON.stringify(sortedApproved)) {
    throw new Error(`${label} changed without updating its approved set.`);
  }
}

assertExactKeys(
  "Commercial guide links",
  Object.keys(guideTargets),
  approvedCommercialGuideIds,
);
assertExactKeys(
  "Commercial product links",
  Object.keys(productContexts),
  approvedCommercialProductSlugs,
);

const commercialCopy = {
  en: {
    hubLabel: "Published private routes",
    hubTitle: "See the route before asking for a custom plan.",
    hubBody: "These are the published private routes that actually include this destination. Compare the named itinerary and inclusions before starting an enquiry.",
    noLocalHubBody: "Homeground does not currently publish a Guangzhou-specific private route. The tour collection shows the routes that can be checked now.",
    guideLabel: "Relevant published routes",
    guideTitle: "Apply this decision to a real itinerary.",
    productLabel: "Plan the destination",
    productTitle: "Check the route against the destination guides.",
    productBody: "Use these city hubs and decision guides to test the route's stay base, gateways and day order before enquiring.",
    destinations: "Destination hubs",
    guides: "Decision guides",
    related: "Compare a related published route",
    tours: "Browse all published private tours",
    toursWithTransport: "See complete private routes that include transport arrangements — not a standalone transfer service",
    noLocalRoute: "No Guangzhou-specific private route is published yet — browse the current tour collection",
  },
  zh: {
    hubLabel: "已发布私家路线",
    hubTitle: "先看清现有路线，再决定是否定制。",
    hubBody: "以下是目前确实包含这个目的地的已发布私家路线。发起咨询前，可先比较明确行程与包含项目。",
    noLocalHubBody: "Homeground 目前没有已发布的广州专属私家路线。现有路线集合只展示现在可以核对的产品。",
    guideLabel: "相关已发布路线",
    guideTitle: "把这个决定放进一条真实路线里。",
    productLabel: "继续规划目的地",
    productTitle: "用城市总览与决策指南核对这条路线。",
    productBody: "咨询前，先用这些城市总览和决策指南核对住宿基地、进出门户与每天顺序。",
    destinations: "目的地总览",
    guides: "决策指南",
    related: "比较另一条已发布路线",
    tours: "查看全部已发布私家路线",
    toursWithTransport: "查看包含交通安排的完整私家路线（不是单独接送服务）",
    noLocalRoute: "目前还没有已发布的广州专属私家路线，可先查看现有路线集合",
  },
  ko: {
    hubLabel: "현재 공개된 프라이빗 코스",
    hubTitle: "맞춤 상담 전에 실제 코스를 먼저 확인하세요.",
    hubBody: "이 목적지를 실제로 포함하는 공개 프라이빗 코스입니다. 문의 전에 일정과 포함 항목을 먼저 비교해 보세요.",
    noLocalHubBody: "Homeground는 현재 광저우 전용 프라이빗 코스를 공개하지 않습니다. 지금 확인할 수 있는 상품은 전체 코스 모음에서 볼 수 있습니다.",
    guideLabel: "관련 공개 코스",
    guideTitle: "이 선택을 실제 일정에 적용하세요.",
    productLabel: "여행지 계획 이어가기",
    productTitle: "도시 허브와 선택 가이드로 코스를 점검하세요.",
    productBody: "문의 전에 도시 허브와 선택 가이드로 숙소 거점, 관문과 날짜별 순서를 확인하세요.",
    destinations: "여행지 허브",
    guides: "선택 가이드",
    related: "다른 공개 코스와 비교",
    tours: "공개된 프라이빗 투어 전체 보기",
    toursWithTransport: "교통 일정이 포함된 전체 프라이빗 코스 보기(단독 픽업·샌딩 서비스 아님)",
    noLocalRoute: "현재 광저우 전용 프라이빗 코스는 공개되어 있지 않습니다. 기존 코스 모음을 확인하세요",
  },
} as const;

type ExistingServiceCtaId = "itinerary-review" | "full-trip-support";

function isExistingServiceCtaId(
  value: string | null,
): value is ExistingServiceCtaId {
  return value === "itinerary-review" || value === "full-trip-support";
}

const authorizedPublicCtaContentIds = new Set<string>(
  ctaOwnershipRegistry.authorizedPublicCtaContentIds,
);

function toursPath(locale: HomegroundLocale) {
  return locale === "en" ? "/tours/" : `/${locale}/tours/`;
}

function toProductLink(
  target: ProductTarget,
  locale: HomegroundLocale,
): ExistingContentCommercialLink {
  if (target.kind === "tours-hub") {
    return {
      id: `tours-${target.reason}`,
      href: toursPath(locale),
      label:
        target.reason === "no-local-route"
          ? commercialCopy[locale].noLocalRoute
          : commercialCopy[locale].toursWithTransport,
    };
  }
  if (target.kind === "classic-zhangjiajie") {
    return {
      id: "zhangjiajie-4-day-private-tour",
      href: zhangjiajiePrivateTourPaths[locale],
      label: productPreviewCopy[locale].metadataTitle,
    };
  }
  const product = getPrivateTourProduct(target.slug);
  if (!product) throw new Error(`Unknown existing product: ${target.slug}`);
  return {
    id: target.slug,
    href: getPrivateTourPaths(target.slug)[locale],
    label: product.title[locale],
  };
}

export function getDestinationPublishedRouteLinks(
  hubId: DestinationHubId,
  locale: HomegroundLocale,
) {
  return destinationTargets[hubId].map((target) => toProductLink(target, locale));
}

export function getGuidePublishedRouteLinks(
  guideId: GuideId,
  locale: HomegroundLocale,
) {
  return (guideTargets[guideId] ?? []).map((target) => toProductLink(target, locale));
}

export function getProductPlanningContext(
  slug: keyof typeof productContexts,
  locale: HomegroundLocale,
) {
  const context = productContexts[slug];
  return {
    destinations: context.destinations.map((id) => {
      const destination = getDestinationHubEntry(id, locale);
      return {
        id,
        href: destination.canonicalPath,
        label: destination.navTitle,
      } satisfies ExistingContentCommercialLink;
    }),
    guides: context.guides.map((id) => {
      const guide = getGuideEntry(id, locale);
      return {
        id,
        href: guide.canonicalPath,
        label: guide.navTitle,
      } satisfies ExistingContentCommercialLink;
    }),
    relatedProducts: (
      "relatedProducts" in context ? context.relatedProducts : []
    ).map((target) =>
      toProductLink(target, locale),
    ),
  };
}

export function getExistingContentCommercialCopy(locale: HomegroundLocale) {
  return commercialCopy[locale];
}

export function getAuthorizedGuideServiceCta(
  guideId: GuideId,
  locale: HomegroundLocale,
) {
  if (!authorizedPublicCtaContentIds.has(guideId)) return null;
  const entry = ctaOwnershipRegistry.entries.find(
    (candidate) => candidate.contentId === guideId,
  );
  if (
    !entry ||
    entry.authorizationStatus !== "authorized-existing-service" ||
    entry.ctaPlacement !== "existing-guide-footer" ||
    !isExistingServiceCtaId(entry.targetServiceId)
  ) {
    throw new Error(`Invalid public CTA registry entry: ${guideId}`);
  }
  // Retired route-review CTAs are hidden; their ownership history stays intact.
  if (entry.targetServiceId === "itinerary-review") return null;
  const serviceId = entry.targetServiceId;
  const servicePath =
    locale === "en"
      ? "/"
      : `/${locale}/`;
  return {
    serviceId,
    href: `${servicePath}?service=full-trip-support#planner-contact`,
    ...ctaOwnershipRegistry.publicCtaCopy[locale][serviceId],
  };
}

export const commercialGuideIds = Object.freeze(
  Object.keys(guideTargets) as GuideId[],
);

export const commercialProductSlugs = Object.freeze(
  Object.keys(productContexts) as (keyof typeof productContexts)[],
);

export const authorizedCommercialCtaGuideIds = Object.freeze(
  [...ctaOwnershipRegistry.authorizedPublicCtaContentIds] as GuideId[],
);
