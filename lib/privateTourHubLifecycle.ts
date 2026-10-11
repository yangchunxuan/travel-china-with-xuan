import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { spanishTourPageSlugs } from "./spanishEditionIndex.ts";

type TourHubLocale = HomegroundLocale | "ja" | "es";

/**
 * Actual hub copy/publication events, independent of builds and fact reviews.
 * Advance the relevant date for a hub-only edit or a catalogue removal, which
 * cannot be inferred from the modification dates of the remaining products.
 * EN/ZH/KO: 431861dd (2026-10-11) changed catalogue discovery and route clarity.
 * JA: published 2026-09-27. ES: published 2026-10-11.
 */
const hubContentModifiedAt: Record<TourHubLocale, string> = {
  en: "2026-10-11",
  zh: "2026-10-11",
  ko: "2026-10-11",
  ja: "2026-09-27",
  es: "2026-10-11",
};

export function latestTourHubChange(
  tours: readonly { dateModified: string }[],
  hubModifiedAt: string,
) {
  return tours.reduce(
    (latest, tour) => tour.dateModified > latest ? tour.dateModified : latest,
    hubModifiedAt,
  );
}

/** The hub changes when a card's published content changes, including prices. */
export function getPrivateTourHubLastModified(locale: TourHubLocale = "en") {
  const sourceLocale = locale === "ja" || locale === "es" ? "en" : locale;
  const catalog = getPublishedPrivateTourCatalog(sourceLocale);
  const tours = locale === "es"
    ? catalog.filter((tour) => spanishTourPageSlugs.includes(tour.slug))
    : catalog;
  return latestTourHubChange(tours, hubContentModifiedAt[locale]);
}
