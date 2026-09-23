import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { convertCnyToKrw, convertCnyToUsd } from "./privateTourProducts.ts";
import type { PublishedPrivateTourCatalogItem } from "./publishedPrivateTourCatalog";

/**
 * Front-end-only facets for the /tours/ hub. Filtering never touches the URL,
 * the tour links or the published prices; it only narrows which cards are
 * visible. Every label here is filter chrome, not a new claim about a tour.
 */

export type PrivateTourRegionId =
  | "east"
  | "southwest"
  | "south"
  | "north"
  | "northeast"
  | "central";
export type PrivateTourLengthId = "short" | "medium" | "long";
export type PrivateTourPriceTierId = "low" | "mid" | "high" | "quote";

type LocalizedText = Readonly<Record<HomegroundLocale, string>>;

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });

export const privateTourRegionOrder: readonly PrivateTourRegionId[] = [
  "east",
  "southwest",
  "south",
  "north",
  "northeast",
  "central",
];

const regionLabels: Readonly<Record<PrivateTourRegionId, LocalizedText>> = {
  east: l("East China", "华东", "동부"),
  southwest: l("Southwest", "西南", "서남부"),
  south: l("South China", "华南", "남부"),
  north: l("North & Northwest", "华北与西北", "북부와 서북부"),
  northeast: l("Northeast", "东北", "동북부"),
  central: l("Central China", "华中", "중부"),
};

/**
 * Region ownership by product slug. Adding a published tour requires adding it
 * here; getPrivateTourFacets throws otherwise so a new route can never fall
 * out of every region filter silently.
 */
const regionBySlug: Readonly<Record<string, PrivateTourRegionId>> = {
  "shanghai-suzhou-hangzhou-6-day-private-tour": "east",
  "shanghai-suzhou-5-day-private-tour": "east",
  "huangshan-hongcun-huizhou-5-day-private-tour": "east",
  "jingdezhen-wuyuan-wangxian-6-day-private-tour": "east",
  "chengdu-pandas-sanxingdui-5-day-private-tour": "southwest",
  "chongqing-wulong-5-day-private-tour": "southwest",
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour": "southwest",
  "kunming-dali-lijiang-8-day-private-tour": "southwest",
  "guizhou-huangguoshu-libo-miao-7-day-private-tour": "southwest",
  "chengdu-chongqing-8-day-private-tour": "southwest",
  "guilin-yangshuo-5-day-private-tour": "south",
  "xiamen-tulou-quanzhou-6-day-private-tour": "south",
  "chaozhou-shantou-nanao-5-day-private-tour": "south",
  "guangzhou-shunde-foshan-5-day-private-tour": "south",
  "beijing-highlights-5-day-private-tour": "north",
  "xian-terracotta-warriors-5-day-private-tour": "north",
  "harbin-winter-5-day-private-tour": "northeast",
  "changbaishan-yanji-winter-6-day-private-tour": "northeast",
  "zhangjiajie-forest-4-day-private-tour": "central",
  "zhangjiajie-furong-fenghuang-7-day-private-tour": "central",
  "zhangjiajie-4-day-private-tour": "central",
};

export function getPrivateTourRegion(slug: string): PrivateTourRegionId {
  const region = regionBySlug[slug];
  if (!region) throw new Error(`Missing private-tour region for facets: ${slug}`);
  return region;
}

export function getPrivateTourLength(days: number): PrivateTourLengthId {
  if (days <= 5) return "short";
  if (days === 6) return "medium";
  return "long";
}

/**
 * Price tiers are expressed in the currency each language shows on its cards.
 * A card that keeps a different published currency (for example a CNY-only
 * route on the English page) is bucketed by the site's own conversion of its
 * CNY basis, while the card itself keeps showing the published figure.
 */
const priceTierBounds: Readonly<
  Record<HomegroundLocale, { readonly low: number; readonly mid: number }>
> = {
  en: { low: 550, mid: 1000 },
  zh: { low: 3500, mid: 6500 },
  ko: { low: 800000, mid: 1400000 },
};

const priceTierLabels: Readonly<
  Record<HomegroundLocale, Readonly<Record<Exclude<PrivateTourPriceTierId, "quote">, string>>>
> = {
  en: { low: "Under USD 550", mid: "USD 550–1,000", high: "Over USD 1,000" },
  zh: { low: "¥3,500 以下", mid: "¥3,500–6,500", high: "¥6,500 以上" },
  ko: { low: "₩800,000 이하", mid: "₩800,000–1,400,000", high: "₩1,400,000 이상" },
};

function localeCurrency(locale: HomegroundLocale): "USD" | "CNY" | "KRW" {
  return locale === "en" ? "USD" : locale === "ko" ? "KRW" : "CNY";
}

function comparableAmount(
  price: NonNullable<PublishedPrivateTourCatalogItem["startingPrice"]>,
  locale: HomegroundLocale,
): number {
  const currency = localeCurrency(locale);
  if (price.currency === currency) return price.amount;
  if (currency === "USD") return convertCnyToUsd(price.cny);
  if (currency === "KRW") return convertCnyToKrw(price.cny);
  return price.cny;
}

export function getPrivateTourPriceTier(
  product: PublishedPrivateTourCatalogItem,
  locale: HomegroundLocale,
): PrivateTourPriceTierId {
  if (!product.startingPrice) return "quote";
  const amount = comparableAmount(product.startingPrice, locale);
  const bounds = priceTierBounds[locale];
  if (amount < bounds.low) return "low";
  if (amount <= bounds.mid) return "mid";
  return "high";
}

export interface PrivateTourFacetItem {
  readonly id: string;
  readonly region: PrivateTourRegionId;
  readonly length: PrivateTourLengthId;
  readonly price: PrivateTourPriceTierId;
}

export interface PrivateTourFacetOption {
  readonly id: string;
  readonly label: string;
  readonly count: number;
}

export interface PrivateTourFacets {
  readonly regions: readonly PrivateTourFacetOption[];
  readonly lengths: readonly PrivateTourFacetOption[];
  readonly prices: readonly PrivateTourFacetOption[];
  readonly items: readonly PrivateTourFacetItem[];
}

export function getPrivateTourFacetItem(
  product: PublishedPrivateTourCatalogItem,
  locale: HomegroundLocale,
): PrivateTourFacetItem {
  return {
    id: product.id,
    region: getPrivateTourRegion(product.slug),
    length: getPrivateTourLength(product.days),
    price: getPrivateTourPriceTier(product, locale),
  };
}

function lengthLabel(
  locale: HomegroundLocale,
  shortest: number,
  longest: number,
): string {
  const range = shortest === longest ? `${shortest}` : `${shortest}–${longest}`;
  if (locale === "zh") return `${range} 天`;
  if (locale === "ko") return `${range}일`;
  return `${range} days`;
}

export function getPrivateTourFacets(
  products: readonly PublishedPrivateTourCatalogItem[],
  locale: HomegroundLocale,
  quoteOnlyLabel: string,
): PrivateTourFacets {
  const items = products.map((product) => getPrivateTourFacetItem(product, locale));

  const regions = privateTourRegionOrder
    .map((id) => ({
      id,
      label: regionLabels[id][locale],
      count: items.filter((item) => item.region === id).length,
    }))
    .filter((option) => option.count > 0);

  const lengths = (["short", "medium", "long"] as const)
    .map((id) => {
      const days = products
        .filter((product) => getPrivateTourLength(product.days) === id)
        .map((product) => product.days);
      return {
        id,
        label: days.length
          ? lengthLabel(locale, Math.min(...days), Math.max(...days))
          : "",
        count: days.length,
      };
    })
    .filter((option) => option.count > 0);

  const prices = (["low", "mid", "high", "quote"] as const)
    .map((id) => ({
      id,
      label: id === "quote" ? quoteOnlyLabel : priceTierLabels[locale][id],
      count: items.filter((item) => item.price === id).length,
    }))
    .filter((option) => option.count > 0);

  return { regions, lengths, prices, items };
}

export interface PrivateTourHubStats {
  readonly routes: number;
  readonly places: number;
  readonly shortestDays: number;
  readonly longestDays: number;
  readonly shoppingStops: number;
}

/**
 * Route lines sometimes qualify a stop ("Suzhou day trip", "苏州一日往返",
 * "쑤저우 당일치기"); the place itself is the same, so it is counted once.
 */
function normalizeStop(stop: string): string {
  return stop
    .replace(/\s+day trip$/iu, "")
    .replace(/一日往返$/u, "")
    .replace(/\s*당일치기$/u, "")
    .trim();
}

/** Unique places named in the published route lines, in catalog order. */
export function getPrivateTourPlaces(
  products: readonly PublishedPrivateTourCatalogItem[],
): string[] {
  return [
    ...new Set(
      products.flatMap((product) =>
        product.comparison.route
          .split("·")
          .map((stop) => normalizeStop(stop))
          .filter(Boolean),
      ),
    ),
  ];
}

/** Every figure is derived from the published catalog; nothing is hand-typed. */
export function getPrivateTourHubStats(
  products: readonly PublishedPrivateTourCatalogItem[],
): PrivateTourHubStats {
  const days = products.map((product) => product.days);
  return {
    routes: products.length,
    places: getPrivateTourPlaces(products).length,
    shortestDays: Math.min(...days),
    longestDays: Math.max(...days),
    shoppingStops: products.filter((product) => product.shoppingStops).length,
  };
}
