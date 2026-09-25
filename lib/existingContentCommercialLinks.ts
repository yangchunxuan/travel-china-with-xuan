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
import {
  classicZhangjiajie,
  guideTargets,
  productTarget as p,
  toursWithTransport,
  type GuideProductTarget as ProductTarget,
} from "./guideCommercialTargets";
import ctaOwnershipRegistry from "../docs/organic-growth/high-intent-cta-ownership-registry.json";

export interface ExistingContentCommercialLink {
  readonly id: string;
  readonly href: string;
  readonly label: string;
}

const destinationTargets = {
  beijing: [
    p("beijing-highlights-5-day-private-tour"),
    p("beijing-xian-shanghai-12-day-private-tour"),
  ],
  shanghai: [
    p("shanghai-suzhou-5-day-private-tour"),
    p("shanghai-suzhou-hangzhou-6-day-private-tour"),
    p("shanghai-disneyland-5-day-private-tour"),
    p("beijing-xian-shanghai-12-day-private-tour"),
  ],
  xian: [
    p("xian-terracotta-warriors-5-day-private-tour"),
    p("beijing-xian-shanghai-12-day-private-tour"),
  ],
  chengdu: [p("chengdu-pandas-sanxingdui-5-day-private-tour")],
  guangzhou: [p("guangzhou-shunde-foshan-5-day-private-tour")],
  hangzhou: [p("shanghai-suzhou-hangzhou-6-day-private-tour")],
  zhangjiajie: [
    classicZhangjiajie,
    p("zhangjiajie-forest-4-day-private-tour"),
    p("zhangjiajie-furong-fenghuang-7-day-private-tour"),
  ],
  chongqing: [
    p("chongqing-wulong-5-day-private-tour"),
    p("chongqing-yangtze-cruise-6-day-private-tour"),
  ],
} as const satisfies Record<DestinationHubId, readonly ProductTarget[]>;

const approvedCommercialGuideIds = [
  "best-2-week-china-tour",
  "china-2-week-tour-cost",
  "china-small-group-tours-2027",
  "singapore-to-zhangjiajie-itinerary",
  "chengdu-zhangjiajie-itinerary",
  "best-zhangjiajie-night-show",
  "zhangjiajie-glass-bridge-vs-skywalk",
  "zhangjiajie-from-malaysia",
  "zhangjiajie-itinerary",
  "tianmen-mountain-tickets-and-routes",
  "zhangjiajie-national-forest-park-tickets-and-entrances",
  "beijing-courtyard-hotel-or-modern-hotel",
  "beijing-where-to-stay-first-trip",
  "beijing-to-badaling-great-wall-transfer",
  "great-wall-section-selector-from-beijing",
  "forbidden-city-for-foreign-visitors",
  "national-museum-of-china-booking-and-route",
  "temple-of-heaven-gates-and-ritual-sequence",
  "summer-palace-gates-route-and-boat-plan",
  "shanghai-where-to-stay-first-trip",
  "xian-where-to-stay-city-wall-or-dayanta",
  "terracotta-warriors-without-tour",
  "shaanxi-history-museum-booking-and-collection-plan",
  "shanghai-pudong-or-hongqiao-airport",
  "shanghai-to-suzhou-day-trip",
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
  "zhangjiajie-furong-fenghuang-route-order",
  "zhangjiajie-arrival-departure-stations",
  "border-town-fenghuang-chadong-shen-congwen",
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
    guides: ["chengdu-chongqing-zhangjiajie-itinerary", "chengdu-panda-base-or-dujiangyan-panda-valley", "sanxingdui-museum-booking-and-gallery-order"],
  },
  "xian-terracotta-warriors-5-day-private-tour": {
    destinations: ["xian"],
    guides: ["china-10-day-itinerary", "terracotta-warriors-without-tour", "xian-where-to-stay-city-wall-or-dayanta"],
  },
  "chongqing-wulong-5-day-private-tour": {
    destinations: ["chongqing"],
    guides: ["chengdu-chongqing-zhangjiajie-itinerary", "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba", "chongqing-railway-station-selector"],
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
    guides: ["china-10-day-itinerary", "shanghai-where-to-stay-first-trip", "shanghai-to-suzhou-day-trip", "how-to-read-a-suzhou-garden"],
    relatedProducts: [p("shanghai-suzhou-hangzhou-6-day-private-tour")],
  },
  "beijing-highlights-5-day-private-tour": {
    destinations: ["beijing"],
    guides: ["china-10-day-itinerary", "great-wall-section-selector-from-beijing", "beijing-where-to-stay-first-trip"],
  },
  "zhangjiajie-forest-4-day-private-tour": {
    destinations: ["zhangjiajie"],
    guides: ["chengdu-chongqing-zhangjiajie-itinerary", "zhangjiajie-national-forest-park-tickets-and-entrances", "zhangjiajie-city-or-wulingyuan-hotel-base", "zhangjiajie-arrival-departure-stations"],
  },
  "zhangjiajie-furong-fenghuang-7-day-private-tour": {
    destinations: ["zhangjiajie"],
    guides: ["zhangjiajie-itinerary", "zhangjiajie-national-forest-park-tickets-and-entrances", "zhangjiajie-from-malaysia", "zhangjiajie-furong-fenghuang-route-order", "zhangjiajie-arrival-departure-stations", "border-town-fenghuang-chadong-shen-congwen"],
    relatedProducts: [
      classicZhangjiajie,
      p("zhangjiajie-forest-4-day-private-tour"),
    ],
  },
  "zhangjiajie-4-day-private-tour": {
    destinations: ["zhangjiajie"],
    guides: ["tianmen-mountain-tickets-and-routes", "zhangjiajie-national-forest-park-tickets-and-entrances", "zhangjiajie-city-or-wulingyuan-hotel-base"],
  },
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour": {
    destinations: ["chengdu"],
    guides: ["chengdu-panda-base-or-dujiangyan-panda-valley"],
    relatedProducts: [p("chengdu-pandas-sanxingdui-5-day-private-tour")],
  },
  "kunming-dali-lijiang-8-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "guizhou-huangguoshu-libo-miao-7-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "xiamen-tulou-quanzhou-6-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "chaozhou-shantou-nanao-5-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "chengdu-chongqing-8-day-private-tour": {
    destinations: ["chengdu", "chongqing"],
    guides: [
      "chengdu-panda-base-or-dujiangyan-panda-valley",
      "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
      "chongqing-railway-station-selector",
    ],
    relatedProducts: [
      p("chengdu-pandas-sanxingdui-5-day-private-tour"),
      p("chongqing-wulong-5-day-private-tour"),
    ],
  },
  "guangzhou-shunde-foshan-5-day-private-tour": {
    destinations: ["guangzhou"],
    guides: [],
  },
  "huangshan-hongcun-huizhou-5-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "jingdezhen-wuyuan-wangxian-6-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "changbaishan-yanji-winter-6-day-private-tour": {
    destinations: [],
    guides: ["china-climate-regions-for-trip-timing"],
    relatedProducts: [p("harbin-winter-5-day-private-tour")],
  },
  "shanghai-disneyland-5-day-private-tour": {
    destinations: ["shanghai"],
    guides: [
      "shanghai-where-to-stay-first-trip",
      "shanghai-pudong-or-hongqiao-airport",
    ],
    relatedProducts: [
      p("shanghai-suzhou-5-day-private-tour"),
      p("shanghai-suzhou-hangzhou-6-day-private-tour"),
    ],
  },
  "luoyang-dengfeng-kaifeng-6-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "datong-pingyao-6-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "zhangye-jiayuguan-dunhuang-7-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "chongqing-yangtze-cruise-6-day-private-tour": {
    destinations: ["chongqing"],
    guides: [
      "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
      "chongqing-railway-station-selector",
    ],
    relatedProducts: [p("chongqing-wulong-5-day-private-tour")],
  },
  "xinjiang-ili-sayram-8-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "hulunbuir-7-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "kunming-jianshui-yuanyang-6-day-private-tour": {
    destinations: [],
    guides: [],
    relatedProducts: [p("kunming-dali-lijiang-8-day-private-tour")],
  },
  "shenzhen-family-tech-4-day-private-tour": {
    destinations: [],
    guides: [],
  },
  "beijing-xian-shanghai-12-day-private-tour": {
    destinations: ["beijing", "xian", "shanghai"],
    guides: [
      "china-10-day-itinerary",
      "forbidden-city-for-foreign-visitors",
      "terracotta-warriors-without-tour",
      "shanghai-where-to-stay-first-trip",
    ],
    relatedProducts: [
      p("beijing-highlights-5-day-private-tour"),
      p("xian-terracotta-warriors-5-day-private-tour"),
      p("shanghai-suzhou-5-day-private-tour"),
    ],
  },
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": {
    destinations: ["beijing", "xian", "chengdu", "shanghai"],
    guides: [
      "china-14-day-itinerary",
      "beijing-xian-chengdu-route-order",
      "great-wall-section-selector-from-beijing",
      "guilin-yangshuo-transport-route",
    ],
    relatedProducts: [
      p("beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour"),
      p("beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour"),
      p("beijing-xian-shanghai-12-day-private-tour"),
    ],
  },
  "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour": {
    destinations: ["beijing", "xian", "chengdu", "shanghai"],
    guides: [
      "china-14-day-itinerary",
      "beijing-xian-chengdu-route-order",
      "chengdu-panda-base-or-dujiangyan-panda-valley",
      "china-high-speed-train-first-time-guide",
    ],
    relatedProducts: [
      p("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
    ],
  },
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": {
    destinations: ["beijing", "xian", "zhangjiajie", "shanghai"],
    guides: [
      "china-14-day-itinerary",
      "zhangjiajie-national-forest-park-tickets-and-entrances",
      "tianmen-mountain-tickets-and-routes",
      "guilin-yangshuo-transport-route",
    ],
    relatedProducts: [
      p("beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour"),
      p("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
      p("zhangjiajie-furong-fenghuang-7-day-private-tour"),
    ],
  },
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour": {
    destinations: ["beijing", "xian", "chengdu", "chongqing", "shanghai"],
    guides: [
      "china-14-day-itinerary",
      "beijing-xian-chengdu-route-order",
      "chongqing-railway-station-selector",
      "shanghai-to-suzhou-day-trip",
    ],
    relatedProducts: [
      p("beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour"),
      p("chongqing-yangtze-cruise-6-day-private-tour"),
      p("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
    ],
  },
  "beijing-xian-silk-road-15-day-private-tour": {
    destinations: ["beijing", "xian"],
    guides: [
      "xian-lanzhou-dunhuang-silk-road-route",
      "mogao-caves-independent-visit-workflow",
      "great-wall-section-selector-from-beijing",
      "terracotta-warriors-without-tour",
    ],
    relatedProducts: [
      p("beijing-xian-silk-road-15-day-small-group-tour"),
      p("zhangye-jiayuguan-dunhuang-7-day-private-tour"),
      p("xinjiang-ili-sayram-8-day-private-tour"),
    ],
  },
  "beijing-xian-yunnan-14-day-private-tour": {
    destinations: ["beijing", "xian"],
    guides: [
      "kunming-dali-lijiang-shangri-la-route-order",
      "lijiang-shangri-la-transport-route",
      "lijiang-old-town-or-shuhe-where-to-stay",
      "dali-station-to-old-town",
    ],
    relatedProducts: [
      p("kunming-dali-lijiang-8-day-private-tour"),
      p("kunming-jianshui-yuanyang-6-day-private-tour"),
    ],
  },
  "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour": {
    destinations: ["beijing", "xian", "hangzhou", "shanghai"],
    guides: [
      "huangshan-summit-or-gateway-base",
      "shanghai-hangzhou-transport-route",
      "how-to-read-a-suzhou-garden",
      "shanghai-suzhou-hangzhou-nanjing-route-order",
    ],
    relatedProducts: [
      p("huangshan-hongcun-huizhou-5-day-private-tour"),
      p("shanghai-suzhou-hangzhou-6-day-private-tour"),
    ],
  },
  "china-grand-tour-21-day-private-tour": {
    destinations: ["beijing", "xian", "chengdu", "zhangjiajie", "chongqing", "shanghai"],
    guides: [
      "china-14-day-itinerary",
      "beijing-xian-chengdu-route-order",
      "zhangjiajie-national-forest-park-tickets-and-entrances",
      "guilin-yangshuo-transport-route",
    ],
    relatedProducts: [
      p("beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour"),
      p("beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour"),
    ],
  },
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour": {
    destinations: ["beijing", "xian", "zhangjiajie", "shanghai"],
    guides: [
      "china-14-day-itinerary",
      "zhangjiajie-national-forest-park-tickets-and-entrances",
      "tianmen-mountain-tickets-and-routes",
      "guilin-yangshuo-transport-route",
    ],
    relatedProducts: [
      p("beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour"),
      p("beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour"),
    ],
  },
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour": {
    destinations: ["beijing", "xian", "chengdu", "chongqing", "shanghai"],
    guides: [
      "china-14-day-itinerary",
      "beijing-xian-chengdu-route-order",
      "chongqing-railway-station-selector",
      "shanghai-to-suzhou-day-trip",
    ],
    relatedProducts: [
      p("beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour"),
      p("beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour"),
    ],
  },
  "beijing-xian-silk-road-15-day-small-group-tour": {
    destinations: ["beijing", "xian"],
    guides: [
      "xian-lanzhou-dunhuang-silk-road-route",
      "mogao-caves-independent-visit-workflow",
      "great-wall-section-selector-from-beijing",
      "terracotta-warriors-without-tour",
    ],
    relatedProducts: [
      p("beijing-xian-silk-road-15-day-private-tour"),
      p("zhangye-jiayuguan-dunhuang-7-day-private-tour"),
    ],
  },
  "beijing-xian-guilin-shanghai-10-day-private-tour": {
    destinations: ["beijing", "xian", "shanghai"],
    guides: [
      "china-10-day-itinerary",
      "great-wall-section-selector-from-beijing",
      "terracotta-warriors-without-tour",
      "guilin-yangshuo-transport-route",
    ],
    relatedProducts: [
      p("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
      p("beijing-xian-shanghai-12-day-private-tour"),
      p("guilin-yangshuo-5-day-private-tour"),
    ],
  },
  "beijing-hangzhou-suzhou-shanghai-11-day-private-tour": {
    destinations: ["beijing", "hangzhou", "shanghai"],
    guides: [
      "shanghai-suzhou-hangzhou-nanjing-route-order",
      "shanghai-hangzhou-transport-route",
      "how-to-read-a-suzhou-garden",
      "forbidden-city-for-foreign-visitors",
    ],
    relatedProducts: [
      p("beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour"),
      p("shanghai-suzhou-hangzhou-6-day-private-tour"),
      p("beijing-highlights-5-day-private-tour"),
    ],
  },
  "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour": {
    destinations: ["shanghai", "zhangjiajie"],
    guides: [
      "zhangjiajie-national-forest-park-tickets-and-entrances",
      "tianmen-mountain-tickets-and-routes",
      "zhangjiajie-furong-fenghuang-route-order",
      "guilin-yangshuo-transport-route",
    ],
    relatedProducts: [
      p("zhangjiajie-furong-fenghuang-7-day-private-tour"),
      p("guilin-yangshuo-5-day-private-tour"),
      p("beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour"),
    ],
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
  "zhangjiajie-furong-fenghuang-7-day-private-tour",
  "zhangjiajie-4-day-private-tour",
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
  "kunming-dali-lijiang-8-day-private-tour",
  "guizhou-huangguoshu-libo-miao-7-day-private-tour",
  "xiamen-tulou-quanzhou-6-day-private-tour",
  "chaozhou-shantou-nanao-5-day-private-tour",
  "chengdu-chongqing-8-day-private-tour",
  "guangzhou-shunde-foshan-5-day-private-tour",
  "huangshan-hongcun-huizhou-5-day-private-tour",
  "jingdezhen-wuyuan-wangxian-6-day-private-tour",
  "changbaishan-yanji-winter-6-day-private-tour",
  "shanghai-disneyland-5-day-private-tour",
  "luoyang-dengfeng-kaifeng-6-day-private-tour",
  "datong-pingyao-6-day-private-tour",
  "zhangye-jiayuguan-dunhuang-7-day-private-tour",
  "chongqing-yangtze-cruise-6-day-private-tour",
  "xinjiang-ili-sayram-8-day-private-tour",
  "hulunbuir-7-day-private-tour",
  "kunming-jianshui-yuanyang-6-day-private-tour",
  "shenzhen-family-tech-4-day-private-tour",
  "beijing-xian-shanghai-12-day-private-tour",
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
  "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
  "beijing-xian-silk-road-15-day-private-tour",
  "beijing-xian-yunnan-14-day-private-tour",
  "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour",
  "china-grand-tour-21-day-private-tour",
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour",
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
  "beijing-xian-silk-road-15-day-small-group-tour",
  "beijing-xian-guilin-shanghai-10-day-private-tour",
  "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
  "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour",
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
  },
  zh: {
    hubLabel: "已发布私家路线",
    hubTitle: "先看清现有路线，再决定是否定制。",
    hubBody: "以下是目前确实包含这个目的地的已发布私家路线。发起咨询前，可先比较明确行程与包含项目。",
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
  },
  ko: {
    hubLabel: "현재 공개된 프라이빗 코스",
    hubTitle: "맞춤 상담 전에 실제 코스를 먼저 확인하세요.",
    hubBody: "이 목적지를 실제로 포함하는 공개 프라이빗 코스입니다. 문의 전에 일정과 포함 항목을 먼저 비교해 보세요.",
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
          ? commercialCopy[locale].tours
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
