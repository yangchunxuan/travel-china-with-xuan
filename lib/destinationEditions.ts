import type { DestinationHubId } from "./destinationHubs";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { generatedDestinationEditionCities } from "./destinationEditionCities.generated.ts";

/**
 * The city pages (/destinations/<city>/) and the destinations hub (/explore/)
 * in the French, German, Spanish, Arabic and Japanese editions.
 *
 * A city page exists in an edition language when its content file does:
 * content/destinations/<city>/edition.<language>.ts. The registry generator
 * (tools/generate-destination-edition-registry.mjs, run by npm run
 * guide:generate before every build) lists those files in
 * lib/destinationEditionCities.generated.ts and writes the language's route,
 * so everything below follows the content: the routes, hreflang, the sitemap,
 * the footers' city links and every other link to a city page. A link to a
 * city with no page in the reader's language goes to the English page with
 * the edition's marker.
 *
 * This module stays small and free of the destination catalogue, because the
 * edition footers and headers (client components on every page) import it.
 */
export type DestinationEditionLocale = "fr" | "de" | "es" | "ar" | "ja";
export const destinationEditionLocales = ["fr", "de", "es", "ar", "ja"] as const satisfies readonly DestinationEditionLocale[];

/** The cities, in the destination hubs' order (lib/destinationHubs.ts; a test keeps them equal). */
export const destinationEditionCityOrder = [
  "beijing",
  "shanghai",
  "xian",
  "chengdu",
  "guangzhou",
  "hangzhou",
  "zhangjiajie",
  "chongqing",
] as const satisfies readonly DestinationHubId[];

/** The cities with a page in `language`, from the content files that exist. */
export function destinationEditionCityIds(language: DestinationEditionLocale): readonly DestinationHubId[] {
  return generatedDestinationEditionCities[language] as readonly DestinationHubId[];
}

export function hasDestinationEditionCity(language: DestinationEditionLocale, city: string): city is DestinationHubId {
  return (destinationEditionCityIds(language) as readonly string[]).includes(city);
}

/** True once every city has a page in `language`: its city lists then stop saying "in English". */
export function hasAllDestinationEditionCities(language: DestinationEditionLocale) {
  return destinationEditionCityOrder.every((city) => hasDestinationEditionCity(language, city));
}

export function destinationEditionCityPath(language: DestinationEditionLocale, city: DestinationHubId) {
  return `/${language}/destinations/${city}/`;
}

/**
 * Where an edition links a city: its own page when there is one, otherwise
 * the English page (`english: true`, so the link says so and carries
 * hrefLang="en").
 */
export function destinationEditionCityLink(language: DestinationEditionLocale, city: DestinationHubId) {
  return hasDestinationEditionCity(language, city)
    ? { href: destinationEditionCityPath(language, city), english: false }
    : { href: `/destinations/${city}/`, english: true };
}

/**
 * Each edition's destinations hub. French, German, Spanish and Arabic have
 * the English hub's page (/xx/explore/); Japanese has its own /ja/explore/.
 */
export const destinationsHubEditionPath = {
  fr: "/fr/explore/",
  de: "/de/explore/",
  es: "/es/explore/",
  ar: "/ar/explore/",
  ja: "/ja/explore/",
} as const satisfies Record<DestinationEditionLocale, string>;

/** The editions that render the English destinations hub in their language. */
export type DestinationsHubEditionLocale = Exclude<DestinationEditionLocale, "ja">;
export const destinationsHubEditionLocales = ["fr", "de", "es", "ar"] as const satisfies readonly DestinationsHubEditionLocale[];

/** A city page's hreflang set: English, Chinese, Korean and every edition with the city; English is the default. */
export function destinationCityLanguagePaths(city: DestinationHubId) {
  const en = `/destinations/${city}/`;
  return {
    en,
    "zh-Hans": `/zh${en}`,
    ko: `/ko${en}`,
    ...Object.fromEntries(
      (["ja", "fr", "es", "de", "ar"] as const)
        .filter((language) => hasDestinationEditionCity(language, city))
        .map((language) => [language, destinationEditionCityPath(language, city)]),
    ),
    "x-default": en,
  } as Readonly<Record<string, string>>;
}

/**
 * The language switch of an English, Chinese or Korean city page. An edition
 * without the city is set to its home page explicitly, so the header never
 * derives a page that does not exist (it would otherwise turn a German city
 * path into an Arabic one).
 */
export function destinationCityHeaderLanguagePaths(city: DestinationHubId) {
  const paths = destinationCityLanguagePaths(city);
  return {
    en: paths.en,
    zh: paths["zh-Hans"],
    ko: paths.ko,
    ...Object.fromEntries((["fr", "de", "es", "ar"] as const).map((language) => [language, paths[language] ?? `/${language}/`])),
  };
}

/**
 * The language switch of an edition's city page: the city's language versions
 * and, for an edition without the city, that edition's home page (set here, so
 * the header never derives a page that does not exist).
 */
export function destinationEditionCityHeaderLanguagePaths(city: DestinationHubId) {
  const paths = destinationCityLanguagePaths(city);
  return {
    ...paths,
    ...Object.fromEntries((["ja", "fr", "es", "de", "ar"] as const).filter((language) => !paths[language]).map((language) => [language, `/${language}/`])),
  } as Readonly<Record<string, string>>;
}

/** An edition footer's eight city links, named in the edition's language. */
export function destinationEditionFooterCityLinks(language: DestinationEditionLocale, names: Readonly<Record<string, string>>) {
  return destinationEditionCityOrder.map((id) => ({ id, label: names[id], href: destinationEditionCityLink(language, id).href }));
}
