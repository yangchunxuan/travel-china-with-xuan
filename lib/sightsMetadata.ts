import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";
import { buildArabicMetadata } from "./arabicSite";
import { buildFrenchMetadata } from "./frenchSite";
import { buildGermanMetadata } from "./germanSite";
import { buildJapaneseMetadata } from "./japaneseSite";
import { getSight, sightPaths, sightsEditionPath, sightsHubLanguagePaths, sightsPath, type SightId } from "./sights";
import { sightCityName } from "./sightCityName";
import { getSightsEditionCopy, type SightsHubEditionLocale } from "./sightsEditions";
import { getSightsCopy } from "./sightsI18n";
import { getSightStory } from "./sightStories";
import { buildSpanishMetadata } from "./spanishSite";

function alternates(paths: Record<HomegroundLocale, string>, locale: HomegroundLocale) {
  return {
    canonical: paths[locale],
    languages: { en: paths.en, "zh-Hans": paths.zh, ko: paths.ko, "x-default": paths.en },
  };
}

export function buildSightsMetadata(locale: HomegroundLocale): Metadata {
  const meta = getSightsCopy(locale).hub.metadata;
  return {
    title: resolvePageTitle(meta.title, locale),
    description: meta.description,
    ...buildHomegroundSocialMetadata({ locale, ...meta, url: sightsPath[locale] }),
    // The hub is in eight languages; a sight page is still in three.
    alternates: { canonical: sightsPath[locale], languages: sightsHubLanguagePaths() },
    robots: { index: true, follow: true },
  };
}

/** The French, Spanish, German, Arabic and Japanese hubs: the edition's own title format and social card. */
export function buildSightsEditionMetadata(language: SightsHubEditionLocale): Metadata {
  const meta = getSightsEditionCopy(language).hub.metadata;
  const build = language === "ja" ? buildJapaneseMetadata : language === "ar" ? buildArabicMetadata : language === "de" ? buildGermanMetadata : language === "fr" ? buildFrenchMetadata : buildSpanishMetadata;
  return build(meta.title, meta.description, sightsEditionPath[language], sightsHubLanguagePaths());
}

/**
 * Sights whose title takes no city: Leshan and Sanxingdui (Guanghan) are day
 * trips filed under Chengdu but are not in it, and the two national and
 * provincial museums already say where they are.
 */
const titleWithoutCity = new Set<SightId>(["leshan-giant-buddha", "sanxingdui", "national-museum", "shaanxi-history-museum"]);

/** A sight page is indexed only once its own writing is in (`ready`). */
export function buildSightMetadata(id: SightId, locale: HomegroundLocale): Metadata {
  const copy = getSightsCopy(locale);
  const sight = getSight(id);
  const name = copy.sights[id].name;
  // Searchers name the city ("杭州西湖", "항저우 서호"); a name that already starts with it keeps it once.
  const city = sight ? sightCityName(sight.city, locale) : "";
  const place = !city || name.includes(city) || titleWithoutCity.has(id)
    ? name
    : locale === "en" ? `${name}, ${city}` : locale === "zh" ? `${city}${name}` : `${city} ${name}`;
  const title = `${place} · ${copy.hub.h1}`;
  // The story's own search description once it is written; until then the card line.
  const description = getSightStory(id, locale)?.description ?? copy.sights[id].line;
  const paths = sightPaths(id);
  return {
    title: resolvePageTitle(title, locale),
    description,
    ...buildHomegroundSocialMetadata({ locale, title, description, url: paths[locale] }),
    alternates: alternates(paths, locale),
    robots: sight?.ready ? { index: true, follow: true } : { index: false, follow: true },
  };
}
