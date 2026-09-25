import type { GuideId } from "./guideRegistry";

export type GuideProductTarget =
  | { readonly kind: "product"; readonly slug: string }
  | { readonly kind: "classic-zhangjiajie" }
  | {
      readonly kind: "tours-hub";
      readonly reason: "inventory-with-transport" | "no-local-route";
    };

export const productTarget = (slug: string): GuideProductTarget => ({
  kind: "product",
  slug,
});

export const classicZhangjiajie: GuideProductTarget = {
  kind: "classic-zhangjiajie",
};

export const toursWithTransport: GuideProductTarget = {
  kind: "tours-hub",
  reason: "inventory-with-transport",
};

/** Curated links that take precedence over the market-weighted fallback. */
export const guideTargets = {
  "singapore-to-zhangjiajie-itinerary": [
    classicZhangjiajie,
    productTarget("zhangjiajie-furong-fenghuang-7-day-private-tour"),
  ],
  "chengdu-zhangjiajie-itinerary": [
    classicZhangjiajie,
    productTarget("zhangjiajie-furong-fenghuang-7-day-private-tour"),
  ],
  "best-zhangjiajie-night-show": [classicZhangjiajie],
  "zhangjiajie-glass-bridge-vs-skywalk": [classicZhangjiajie],
  "zhangjiajie-from-malaysia": [
    classicZhangjiajie,
    productTarget("zhangjiajie-furong-fenghuang-7-day-private-tour"),
  ],
  "zhangjiajie-itinerary": [
    productTarget("zhangjiajie-furong-fenghuang-7-day-private-tour"),
    classicZhangjiajie,
  ],
  "tianmen-mountain-tickets-and-routes": [classicZhangjiajie],
  "zhangjiajie-national-forest-park-tickets-and-entrances": [
    productTarget("zhangjiajie-forest-4-day-private-tour"),
    classicZhangjiajie,
  ],
  "beijing-courtyard-hotel-or-modern-hotel": [productTarget("beijing-highlights-5-day-private-tour")],
  "beijing-where-to-stay-first-trip": [productTarget("beijing-highlights-5-day-private-tour")],
  "beijing-to-badaling-great-wall-transfer": [productTarget("beijing-highlights-5-day-private-tour")],
  "great-wall-section-selector-from-beijing": [productTarget("beijing-highlights-5-day-private-tour")],
  "forbidden-city-for-foreign-visitors": [productTarget("beijing-highlights-5-day-private-tour")],
  "national-museum-of-china-booking-and-route": [productTarget("beijing-highlights-5-day-private-tour")],
  "temple-of-heaven-gates-and-ritual-sequence": [productTarget("beijing-highlights-5-day-private-tour")],
  "summer-palace-gates-route-and-boat-plan": [productTarget("beijing-highlights-5-day-private-tour")],
  "shanghai-where-to-stay-first-trip": [
    productTarget("shanghai-suzhou-5-day-private-tour"),
    productTarget("shanghai-suzhou-hangzhou-6-day-private-tour"),
  ],
  "xian-where-to-stay-city-wall-or-dayanta": [productTarget("xian-terracotta-warriors-5-day-private-tour")],
  "terracotta-warriors-without-tour": [productTarget("xian-terracotta-warriors-5-day-private-tour")],
  "shaanxi-history-museum-booking-and-collection-plan": [productTarget("xian-terracotta-warriors-5-day-private-tour")],
  "shanghai-pudong-or-hongqiao-airport": [productTarget("shanghai-suzhou-5-day-private-tour")],
  "shanghai-to-suzhou-day-trip": [
    productTarget("shanghai-suzhou-5-day-private-tour"),
    productTarget("shanghai-suzhou-hangzhou-6-day-private-tour"),
  ],
  "shanghai-hangzhou-transport-route": [productTarget("shanghai-suzhou-hangzhou-6-day-private-tour")],
  "how-to-read-a-suzhou-garden": [
    productTarget("shanghai-suzhou-5-day-private-tour"),
    productTarget("shanghai-suzhou-hangzhou-6-day-private-tour"),
  ],
  "chengdu-panda-base-or-dujiangyan-panda-valley": [productTarget("chengdu-pandas-sanxingdui-5-day-private-tour")],
  "sanxingdui-museum-booking-and-gallery-order": [productTarget("chengdu-pandas-sanxingdui-5-day-private-tour")],
  "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba": [productTarget("chongqing-wulong-5-day-private-tour")],
  "chongqing-railway-station-selector": [productTarget("chongqing-wulong-5-day-private-tour")],
  "guilin-airport-or-railway-station-arrival-guide": [productTarget("guilin-yangshuo-5-day-private-tour")],
  "guilin-yangshuo-transport-route": [productTarget("guilin-yangshuo-5-day-private-tour")],
  "yangshuo-town-or-yulong-river-where-to-stay": [productTarget("guilin-yangshuo-5-day-private-tour")],
  "zhangjiajie-city-or-wulingyuan-hotel-base": [
    classicZhangjiajie,
    productTarget("zhangjiajie-forest-4-day-private-tour"),
  ],
  "zhangjiajie-furong-fenghuang-route-order": [
    productTarget("zhangjiajie-furong-fenghuang-7-day-private-tour"),
  ],
  "zhangjiajie-arrival-departure-stations": [
    productTarget("zhangjiajie-furong-fenghuang-7-day-private-tour"),
    productTarget("zhangjiajie-forest-4-day-private-tour"),
  ],
  "border-town-fenghuang-chadong-shen-congwen": [
    productTarget("zhangjiajie-furong-fenghuang-7-day-private-tour"),
  ],
  "china-private-transfer-or-public-transport": [toursWithTransport],
  "china-climate-regions-for-trip-timing": [productTarget("harbin-winter-5-day-private-tour")],
  "china-2-week-tour-cost": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour"),
  ],
  "china-small-group-tours-2027": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour"),
    productTarget("beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour"),
  ],
  "best-2-week-china-tour": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
    productTarget("beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour"),
  ],
  // Whole-China first-trip guides with the most Search Console impressions
  // (July–September 2026) point at the multi-city routes their readers are
  // planning, instead of a market-weighted regional tour.
  "food-plants-and-animal-products-into-china": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
  ],
  "china-public-holidays-travel-calendar": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour"),
  ],
  "china-online-arrival-card": [
    productTarget("beijing-xian-shanghai-8-day-private-tour"),
    productTarget("beijing-xian-guilin-shanghai-10-day-private-tour"),
  ],
  "how-to-pay-in-china-as-a-tourist": [
    productTarget("beijing-xian-guilin-shanghai-10-day-private-tour"),
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
  ],
  "china-power-plugs-voltage-and-adapters": [
    productTarget("beijing-xian-guilin-shanghai-10-day-private-tour"),
  ],
  "lunar-new-year-customs-for-visitors": [productTarget("harbin-winter-5-day-private-tour")],
  "how-much-does-a-china-trip-cost": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
    productTarget("beijing-xian-guilin-shanghai-10-day-private-tour"),
  ],
  "china-7-day-itinerary": [productTarget("beijing-xian-shanghai-8-day-private-tour")],
  "china-10-day-itinerary": [
    productTarget("beijing-xian-shanghai-8-day-private-tour"),
    productTarget("beijing-xian-guilin-shanghai-10-day-private-tour"),
  ],
  "china-14-day-itinerary": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
    productTarget("beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour"),
  ],
  "beijing-zhangjiajie-shanghai-10-days": [
    productTarget("beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour"),
  ],
  "beijing-zhangjiajie-shanghai-transport": [
    productTarget("beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour"),
  ],
  "beijing-xian-chengdu-route-order": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
  ],
  "chengdu-chongqing-zhangjiajie-itinerary": [
    productTarget("chengdu-chongqing-8-day-private-tour"),
  ],
  "guangzhou-shenzhen-hong-kong-route-order": [
    productTarget("guangzhou-shunde-foshan-5-day-private-tour"),
  ],
  "guangzhou-macau-transport-route": [
    productTarget("guangzhou-shunde-foshan-5-day-private-tour"),
  ],
  "kunming-dali-lijiang-shangri-la-route-order": [
    productTarget("kunming-dali-lijiang-8-day-private-tour"),
  ],
  "lijiang-shangri-la-transport-route": [
    productTarget("kunming-dali-lijiang-8-day-private-tour"),
  ],
  "shanghai-suzhou-hangzhou-nanjing-route-order": [
    productTarget("shanghai-suzhou-hangzhou-6-day-private-tour"),
  ],
  "xian-lanzhou-dunhuang-silk-road-route": [
    productTarget("beijing-xian-silk-road-15-day-private-tour"),
  ],
  // Entry-rule guides: US passports rely on 240-hour transit, which the
  // Hong Kong-exit route is built for; 30-day visa-free markets fit two weeks.
  "do-us-citizens-need-visa-china-2026": [
    productTarget("beijing-xian-guilin-hong-kong-10-day-private-tour"),
  ],
  "china-240-hour-visa-free-transit-route-check": [
    productTarget("beijing-xian-guilin-hong-kong-10-day-private-tour"),
  ],
  "china-visa-free-uk-citizens-2026": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
  ],
  "china-visa-free-canadian-citizens-2026": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
  ],
  "china-visa-free-new-zealand-citizens-2026": [
    productTarget("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"),
  ],
} as const satisfies Partial<Record<GuideId, readonly GuideProductTarget[]>>;

/** The concrete product rendered by the first curated target, if there is one. */
export function getPrimaryGuideProductId(guideId: GuideId): string | null {
  const target = guideTargets[guideId as keyof typeof guideTargets]?.[0];
  if (!target || target.kind === "tours-hub") return null;
  if (target.kind === "classic-zhangjiajie") return "zhangjiajie-4-day-private-tour";
  return target.slug;
}
