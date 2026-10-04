import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";
import { getSight, sightPaths, sightsPath, type SightId } from "./sights";
import { getSightsCopy } from "./sightsI18n";
import { getSightStory } from "./sightStories";

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
    alternates: alternates(sightsPath, locale),
    robots: { index: true, follow: true },
  };
}

/** A sight page is indexed only once its own writing is in (`ready`). */
export function buildSightMetadata(id: SightId, locale: HomegroundLocale): Metadata {
  const copy = getSightsCopy(locale);
  const sight = getSight(id);
  const name = copy.sights[id].name;
  const title = `${name} · ${copy.hub.h1}`;
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
