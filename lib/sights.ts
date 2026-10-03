import type { AttractionReservationCityId, AttractionReservationId } from "./attractionReservations";
import type { DestinationHubId } from "./destinationHubs";
import type { GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";

/**
 * Must-see sights: the third way into Destinations. A sight page says why it
 * is worth the trip, then hands each next step to its owner: the booking
 * facts and "we book it" to the attraction-reservation rules (one source of
 * truth for release times, passports and prices), the full how-to to the
 * Travel Advice guide, and the tours that visit it to the published
 * catalogue. Nothing here restates those; it only names them.
 *
 * `tourSlugs` were matched against the published itineraries by hand: a tour
 * is listed only when a day plainly visits the sight (not "one garden, such
 * as…", not a two-way choice).
 *
 * `ready` stays false until the sight's own writing is in. Until then its
 * page is reachable from the hub and the menu but asks search engines not to
 * index it, so a page of links never competes with the guide it points to.
 */
export const sightsPath: Record<HomegroundLocale, string> = {
  en: "/sights/",
  zh: "/zh/sights/",
  ko: "/ko/sights/",
};

export type SightCityId = AttractionReservationCityId | Extract<DestinationHubId, "zhangjiajie">;

/** Cities in the hub's order. */
export const sightCityIds = [
  "beijing",
  "xian",
  "shanghai",
  "suzhou",
  "hangzhou",
  "chengdu",
  "guilin",
  "lijiang",
  "zhangjiajie",
] as const satisfies readonly SightCityId[];

export const sightIds = [
  "forbidden-city",
  "great-wall",
  "temple-of-heaven",
  "summer-palace",
  "national-museum",
  "terracotta-warriors",
  "xian-city-wall",
  "shaanxi-history-museum",
  "shanghai-museum-east",
  "humble-administrators-garden",
  "liangzhu",
  "chengdu-panda-base",
  "sanxingdui",
  "li-river",
  "jade-dragon-snow-mountain",
  "zhangjiajie-forest-park",
] as const;
export type SightId = (typeof sightIds)[number];

export interface Sight {
  readonly id: SightId;
  readonly city: SightCityId;
  /** The Travel Advice guide that owns the how-to; its hero photo is the sight's photo. */
  readonly guideId: GuideId;
  /**
   * Attraction-reservation rules for this sight, its own entry first: the
   * first rule decides whether we sell booking for the sight as a whole.
   */
  readonly reservationIds: readonly AttractionReservationId[];
  readonly tourSlugs: readonly string[];
  /** A photo of the sight itself when the guide's hero is an illustration or a map. */
  readonly image?: { readonly src: string; readonly width: number; readonly height: number; readonly alt: Readonly<Record<HomegroundLocale, string>> };
  readonly ready: boolean;
}

export const sights: readonly Sight[] = [
  {
    id: "forbidden-city",
    city: "beijing",
    guideId: "forbidden-city-for-foreign-visitors",
    reservationIds: ["forbidden-city", "tiananmen-square"],
    tourSlugs: ["beijing-highlights-5-day-private-tour", "beijing-xian-shanghai-8-day-private-tour", "beijing-xian-guilin-shanghai-10-day-private-tour"],
    ready: false,
  },
  {
    id: "great-wall",
    city: "beijing",
    guideId: "great-wall-section-selector-from-beijing",
    reservationIds: ["great-wall-badaling", "great-wall-mutianyu"],
    image: {
      src: "/images/destinations/beijing/great-wall-1200.webp",
      width: 1200,
      height: 750,
      alt: {
        en: "A restored Great Wall section on mountain ridges north of Beijing",
        zh: "北京北郊山脊上修复过的一段长城",
        ko: "베이징 북부 산등성이의 복원된 만리장성 구간",
      },
    },
    tourSlugs: ["beijing-highlights-5-day-private-tour", "beijing-xian-shanghai-8-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    ready: false,
  },
  {
    id: "temple-of-heaven",
    city: "beijing",
    guideId: "temple-of-heaven-gates-and-ritual-sequence",
    reservationIds: ["temple-of-heaven"],
    tourSlugs: ["beijing-highlights-5-day-private-tour", "beijing-hangzhou-suzhou-shanghai-11-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    ready: false,
  },
  {
    id: "summer-palace",
    city: "beijing",
    guideId: "summer-palace-gates-route-and-boat-plan",
    reservationIds: ["summer-palace"],
    tourSlugs: ["beijing-highlights-5-day-private-tour", "beijing-hangzhou-suzhou-shanghai-11-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    ready: false,
  },
  {
    id: "national-museum",
    city: "beijing",
    guideId: "national-museum-of-china-booking-and-route",
    reservationIds: ["national-museum-of-china"],
    tourSlugs: [],
    ready: false,
  },
  {
    id: "terracotta-warriors",
    city: "xian",
    guideId: "terracotta-warriors-without-tour",
    reservationIds: ["terracotta-warriors"],
    tourSlugs: ["xian-terracotta-warriors-5-day-private-tour", "beijing-xian-shanghai-8-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    ready: false,
  },
  {
    id: "xian-city-wall",
    city: "xian",
    guideId: "xian-city-wall-tickets-gates-walk-or-bike",
    reservationIds: ["xian-city-wall"],
    tourSlugs: ["xian-terracotta-warriors-5-day-private-tour", "beijing-xian-shanghai-8-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    ready: false,
  },
  {
    id: "shaanxi-history-museum",
    city: "xian",
    guideId: "shaanxi-history-museum-booking-and-collection-plan",
    reservationIds: ["shaanxi-history-museum"],
    tourSlugs: [],
    ready: false,
  },
  {
    id: "shanghai-museum-east",
    city: "shanghai",
    guideId: "shanghai-museum-east-entry-reservations",
    reservationIds: ["shanghai-museum-east", "shanghai-museum-east-experience-areas"],
    tourSlugs: [],
    ready: false,
  },
  {
    id: "humble-administrators-garden",
    city: "suzhou",
    guideId: "humble-administrators-garden-tickets-entry",
    reservationIds: ["humble-administrators-garden"],
    tourSlugs: ["shanghai-suzhou-5-day-private-tour", "shanghai-suzhou-hangzhou-6-day-private-tour"],
    ready: false,
  },
  {
    id: "liangzhu",
    city: "hangzhou",
    guideId: "liangzhu-ruins-park-and-museum-sequence",
    reservationIds: ["liangzhu"],
    tourSlugs: [],
    ready: false,
  },
  {
    id: "chengdu-panda-base",
    city: "chengdu",
    guideId: "chengdu-panda-base-or-dujiangyan-panda-valley",
    reservationIds: ["chengdu-panda-base"],
    tourSlugs: ["chengdu-pandas-sanxingdui-5-day-private-tour", "chengdu-chongqing-8-day-private-tour", "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"],
    ready: false,
  },
  {
    id: "sanxingdui",
    city: "chengdu",
    guideId: "sanxingdui-museum-booking-and-gallery-order",
    reservationIds: ["sanxingdui-museum"],
    tourSlugs: ["chengdu-pandas-sanxingdui-5-day-private-tour"],
    ready: false,
  },
  {
    id: "li-river",
    city: "guilin",
    guideId: "li-river-cruise-tickets-piers-booking",
    reservationIds: ["li-river-cruise"],
    tourSlugs: ["guilin-yangshuo-5-day-private-tour", "beijing-xian-guilin-shanghai-10-day-private-tour", "beijing-xian-guilin-hong-kong-10-day-private-tour"],
    ready: false,
  },
  {
    id: "jade-dragon-snow-mountain",
    city: "lijiang",
    guideId: "jade-dragon-snow-mountain-cable-car-booking",
    reservationIds: ["jade-dragon-snow-mountain"],
    tourSlugs: ["beijing-xian-yunnan-14-day-private-tour"],
    ready: false,
  },
  {
    id: "zhangjiajie-forest-park",
    city: "zhangjiajie",
    guideId: "zhangjiajie-national-forest-park-tickets-and-entrances",
    // Not in the reservation service: the park's own ticket rules live in the guide.
    reservationIds: [],
    tourSlugs: ["zhangjiajie-forest-4-day-private-tour", "zhangjiajie-furong-fenghuang-7-day-private-tour", "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour"],
    ready: false,
  },
];

/**
 * Cities close enough to visit together. A sight whose city has no other
 * sight shows these neighbours instead (Shanghai, Suzhou and Hangzhou are an
 * hour or so apart by train); elsewhere it shows the best-known sights.
 */
export const sightNeighbours: Partial<Record<SightCityId, readonly SightCityId[]>> = {
  shanghai: ["suzhou", "hangzhou"],
  suzhou: ["shanghai", "hangzhou"],
  hangzhou: ["shanghai", "suzhou"],
};

export const sightHighlights: readonly SightId[] = ["great-wall", "forbidden-city", "terracotta-warriors"];

export function sightPath(id: SightId, locale: HomegroundLocale) {
  return `${sightsPath[locale]}${id}/`;
}

export function sightPaths(id: SightId): Record<HomegroundLocale, string> {
  return { en: sightPath(id, "en"), zh: sightPath(id, "zh"), ko: sightPath(id, "ko") };
}

export function getSight(id: string): Sight | undefined {
  return sights.find((sight) => sight.id === id);
}

export function isSightId(value: string): value is SightId {
  return sightIds.some((id) => id === value);
}
