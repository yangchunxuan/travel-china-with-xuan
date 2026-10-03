import type { DestinationHubId } from "./destinationHubs";

/**
 * The city page's second version: the city opens with what to do there (its
 * must-see sights and the themes it belongs to), keeps the four city
 * decisions and deeper answers, and ends with the private tours that start
 * there and the services, as cards. Every city is on it (Beijing was the
 * sample); a city needs at least three must-see sights and one published tour.
 */
export const cityPageV2: Partial<Record<DestinationHubId, { readonly tourSlugs: readonly string[] }>> = {
  beijing: {
    tourSlugs: [
      "beijing-highlights-5-day-private-tour",
      "beijing-xian-shanghai-8-day-private-tour",
      "beijing-xian-shanghai-12-day-private-tour",
    ],
  },
  shanghai: {
    tourSlugs: [
      "shanghai-suzhou-5-day-private-tour",
      "shanghai-suzhou-hangzhou-6-day-private-tour",
      "shanghai-disneyland-5-day-private-tour",
    ],
  },
  xian: {
    tourSlugs: [
      "xian-terracotta-warriors-5-day-private-tour",
      "beijing-xian-shanghai-8-day-private-tour",
      "beijing-xian-silk-road-15-day-private-tour",
    ],
  },
  chengdu: {
    tourSlugs: [
      "chengdu-pandas-sanxingdui-5-day-private-tour",
      "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
      "chengdu-chongqing-8-day-private-tour",
    ],
  },
  // Guangzhou has one published route; the row ends with the way to a trip planned around you.
  guangzhou: {
    tourSlugs: ["guangzhou-shunde-foshan-5-day-private-tour"],
  },
  hangzhou: {
    tourSlugs: [
      "shanghai-suzhou-hangzhou-6-day-private-tour",
      "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
      "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour",
    ],
  },
  zhangjiajie: {
    tourSlugs: [
      "zhangjiajie-4-day-private-tour",
      "zhangjiajie-forest-4-day-private-tour",
      "zhangjiajie-furong-fenghuang-7-day-private-tour",
    ],
  },
  chongqing: {
    tourSlugs: [
      "chongqing-wulong-5-day-private-tour",
      "chongqing-yangtze-cruise-6-day-private-tour",
      "chengdu-chongqing-8-day-private-tour",
    ],
  },
};
