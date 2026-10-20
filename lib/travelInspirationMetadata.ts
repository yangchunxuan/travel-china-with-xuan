import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";
import { buildArabicMetadata } from "./arabicSite";
import { buildFrenchMetadata } from "./frenchSite";
import { buildGermanMetadata } from "./germanSite";
import { buildJapaneseMetadata } from "./japaneseSite";
import { buildSpanishMetadata } from "./spanishSite";
import {
  travelInspirationEditionPath,
  travelInspirationHubLanguagePaths,
  travelInspirationPath,
  travelInspirationThemePaths,
  type TravelInspirationThemeId,
} from "./travelInspiration";
import { getTravelInspirationEditionCopy } from "./travelInspirationEditions";
import { getTravelInspirationCopy } from "./travelInspirationI18n";

function build(
  locale: HomegroundLocale,
  metadata: { title: string; description: string },
  paths: Record<HomegroundLocale, string>,
  languages: Record<string, string> = { en: paths.en, "zh-Hans": paths.zh, ko: paths.ko, "x-default": paths.en },
): Metadata {
  return {
    title: resolvePageTitle(metadata.title, locale),
    description: metadata.description,
    ...buildHomegroundSocialMetadata({ locale, ...metadata, url: paths[locale] }),
    alternates: {
      canonical: paths[locale],
      languages,
    },
    robots: { index: true, follow: true },
  };
}

/** The hub is in eight languages; a theme page is still in three. */
export function buildTravelInspirationMetadata(locale: HomegroundLocale): Metadata {
  return build(locale, getTravelInspirationCopy(locale).hub.metadata, travelInspirationPath, travelInspirationHubLanguagePaths());
}

/** The French, Spanish, German, Arabic and Japanese hubs: the edition's own title format and social card. */
export function buildTravelInspirationEditionMetadata(language: keyof typeof travelInspirationEditionPath): Metadata {
  const meta = getTravelInspirationEditionCopy(language).hub.metadata;
  const edition = language === "ja" ? buildJapaneseMetadata : language === "ar" ? buildArabicMetadata : language === "de" ? buildGermanMetadata : language === "fr" ? buildFrenchMetadata : buildSpanishMetadata;
  return edition(meta.title, meta.description, travelInspirationEditionPath[language], travelInspirationHubLanguagePaths());
}

export function buildTravelInspirationThemeMetadata(
  id: TravelInspirationThemeId,
  locale: HomegroundLocale,
): Metadata {
  return build(locale, getTravelInspirationCopy(locale).themes[id].metadata, travelInspirationThemePaths(id));
}
