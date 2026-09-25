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
} as const satisfies Partial<Record<GuideId, readonly GuideProductTarget[]>>;

/** The concrete product rendered by the first curated target, if there is one. */
export function getPrimaryGuideProductId(guideId: GuideId): string | null {
  const target = guideTargets[guideId as keyof typeof guideTargets]?.[0];
  if (!target || target.kind === "tours-hub") return null;
  if (target.kind === "classic-zhangjiajie") return "zhangjiajie-4-day-private-tour";
  return target.slug;
}
