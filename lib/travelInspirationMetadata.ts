import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";
import {
  travelInspirationPath,
  travelInspirationThemePaths,
  type TravelInspirationThemeId,
} from "./travelInspiration";
import { getTravelInspirationCopy } from "./travelInspirationI18n";

function build(
  locale: HomegroundLocale,
  metadata: { title: string; description: string },
  paths: Record<HomegroundLocale, string>,
): Metadata {
  return {
    title: resolvePageTitle(metadata.title, locale),
    description: metadata.description,
    ...buildHomegroundSocialMetadata({ locale, ...metadata, url: paths[locale] }),
    alternates: {
      canonical: paths[locale],
      languages: { en: paths.en, "zh-Hans": paths.zh, ko: paths.ko, "x-default": paths.en },
    },
    robots: { index: true, follow: true },
  };
}

export function buildTravelInspirationMetadata(locale: HomegroundLocale): Metadata {
  return build(locale, getTravelInspirationCopy(locale).hub.metadata, travelInspirationPath);
}

export function buildTravelInspirationThemeMetadata(
  id: TravelInspirationThemeId,
  locale: HomegroundLocale,
): Metadata {
  return build(locale, getTravelInspirationCopy(locale).themes[id].metadata, travelInspirationThemePaths(id));
}
