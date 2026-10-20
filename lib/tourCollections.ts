import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getPrivateTourFacetItem, getPrivateTourFacets, privateTourRegionOrder, type PrivateTourRegionId } from "./privateTourCatalogFacets.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getPublishedPrivateTourCatalog, type PublishedPrivateTourCatalogItem } from "./publishedPrivateTourCatalog.ts";

/**
 * Tour collections: the rows of the Private Tours menu. Each is the published
 * catalogue seen one way, never a new list of products: by how many cities
 * (every multi-region route, grouped by length), by one region (grouped by
 * region, as the catalogue's own region filter names them), and the season's
 * pick (a short, hand-named list that changes with the season). Titles,
 * photos, routes and prices stay on the catalogue and the tour pages.
 */
export const tourCollectionIds = ["multi-city", "regions", "seasonal"] as const;
export type TourCollectionId = (typeof tourCollectionIds)[number];

export function tourCollectionPath(id: TourCollectionId, locale: HomegroundLocale) {
  return `${locale === "en" ? "" : `/${locale}`}/tours/${id}/`;
}

export function tourCollectionPaths(id: TourCollectionId): Record<HomegroundLocale, string> {
  return { en: tourCollectionPath(id, "en"), zh: tourCollectionPath(id, "zh"), ko: tourCollectionPath(id, "ko") };
}

/** The site editions with their own copy of each collection. */
export const tourCollectionEditionLocales = ["fr", "es", "de", "ar", "ja"] as const;
export type TourCollectionEditionLocale = (typeof tourCollectionEditionLocales)[number];

export function tourCollectionEditionPath(id: TourCollectionId, edition: TourCollectionEditionLocale) {
  return `/${edition}/tours/${id}/`;
}

/**
 * Every language that has this collection: the hreflang set of each copy and
 * the targets of its header's language switch.
 */
export function tourCollectionLanguagePaths(id: TourCollectionId) {
  return {
    en: tourCollectionPath(id, "en"),
    "zh-Hans": tourCollectionPath(id, "zh"),
    ko: tourCollectionPath(id, "ko"),
    ja: tourCollectionEditionPath(id, "ja"),
    fr: tourCollectionEditionPath(id, "fr"),
    es: tourCollectionEditionPath(id, "es"),
    de: tourCollectionEditionPath(id, "de"),
    ar: tourCollectionEditionPath(id, "ar"),
    "x-default": tourCollectionPath(id, "en"),
  };
}

export function isTourCollectionId(value: string): value is TourCollectionId {
  return tourCollectionIds.some((id) => id === value);
}

/**
 * The season's pick. Change `id`, its copy in tourCollectionsI18n.ts and the
 * menu row's description together when the season turns.
 */
export const currentSeason = {
  id: "winter-northeast",
  tourSlugs: [
    "harbin-yabuli-snow-town-6-day-private-tour",
    "harbin-snow-town-changbaishan-yanji-8-day-private-tour",
    "harbin-mohe-arctic-village-7-day-private-tour",
    "harbin-snow-town-mohe-9-day-private-tour",
    "changbaishan-yanji-winter-6-day-private-tour",
    "yanji-changbaishan-wanda-6-day-private-tour",
  ],
  /**
   * The last day this pick is offered. The export check fails a build after
   * it, so a spring deploy cannot keep selling winter.
   */
  until: "2027-03-10",
} as const;

/** Multi-city lengths: a week to ten days, up to two weeks, longer. */
export const multiCityLengthGroups = [
  { id: "up-to-10", max: 10 },
  { id: "11-to-14", max: 14 },
  { id: "15-plus", max: Number.POSITIVE_INFINITY },
] as const;

export interface TourCollectionGroup {
  readonly id: string;
  /** Set for region groups, from the catalogue's region filter. */
  readonly label?: string;
  readonly tours: readonly PublishedPrivateTourCatalogItem[];
}

/**
 * Shortest first; at equal length private tours before fixed-date small
 * groups, then one order in every language (by slug).
 */
function byDays(a: PublishedPrivateTourCatalogItem, b: PublishedPrivateTourCatalogItem) {
  const format = (tour: PublishedPrivateTourCatalogItem) => (tour.tourFormat === "small-group" ? 1 : 0);
  return a.days - b.days || format(a) - format(b) || a.slug.localeCompare(b.slug);
}

export function getTourCollectionGroups(id: TourCollectionId, locale: HomegroundLocale): readonly TourCollectionGroup[] {
  const catalog = getPublishedPrivateTourCatalog(locale);
  const regionOf = (tour: PublishedPrivateTourCatalogItem): PrivateTourRegionId => getPrivateTourFacetItem(tour, locale).region;

  if (id === "multi-city") {
    const multi = catalog.filter((tour) => regionOf(tour) === "multi").sort(byDays);
    let floor = 0;
    return multiCityLengthGroups.map((group) => {
      const tours = multi.filter((tour) => tour.days > floor && tour.days <= group.max);
      floor = group.max;
      return { id: group.id, tours };
    }).filter((group) => group.tours.length);
  }

  if (id === "regions") {
    const labels = new Map(getPrivateTourFacets(catalog, locale, "").regions.map((region) => [region.id, region.label]));
    return privateTourRegionOrder
      .filter((region) => region !== "multi")
      .map((region) => ({
        id: region,
        label: labels.get(region),
        tours: catalog.filter((tour) => regionOf(tour) === region).sort(byDays),
      }))
      .filter((group) => group.tours.length);
  }

  const bySlug = new Map(catalog.map((tour) => [tour.slug, tour]));
  return [{
    id: currentSeason.id,
    tours: currentSeason.tourSlugs.map((slug) => {
      const tour = bySlug.get(slug);
      if (!tour) throw new Error(`The season's pick names an unpublished tour: ${slug}`);
      return tour;
    }),
  }];
}

/**
 * A collection in an edition's own language: the English collection's groups,
 * tours and order, with each tour taken whole from that edition's catalogue
 * (the name, link, route and prices its /xx/tours/ page and tour pages show)
 * and each region group named as that edition's catalogue names it.
 */
export function getTourCollectionEditionGroups(
  id: TourCollectionId,
  catalog: readonly PublishedPrivateTourCatalogItem[],
  regionLabels: Readonly<Partial<Record<string, string>>>,
): readonly TourCollectionGroup[] {
  const bySlug = new Map(catalog.map((tour) => [tour.slug, tour]));
  return getTourCollectionGroups(id, "en").map((group) => {
    const label = group.label ? regionLabels[group.id] : undefined;
    if (group.label && !label) throw new Error(`The edition names no region ${group.id}`);
    return {
      id: group.id,
      ...(label ? { label } : {}),
      tours: group.tours.map((tour) => {
        const edition = bySlug.get(tour.slug);
        if (!edition) throw new Error(`The edition's catalogue has no ${tour.slug}`);
        return edition;
      }),
    };
  });
}
