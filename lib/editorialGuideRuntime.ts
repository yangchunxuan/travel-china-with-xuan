import type { Metadata } from "next";
import {
  getGuideEntry,
  getGuideLanguagePaths,
  guideRegistry,
  type GuideEntry,
  type GuideId,
} from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import { assertStructuredPageBody } from "./content-system/page-body";
import { generatedGuideBodyLoaders } from "./generated/guideBodies.generated";

type BodyModule = { readonly default: unknown };
type BodyLoader = () => Promise<BodyModule>;

const bodyLoaders = generatedGuideBodyLoaders as Record<
  string,
  Partial<Record<HomegroundLocale, BodyLoader>>
>;

function slugFromPath(path: string) {
  return path.split("/").filter(Boolean).at(-1) ?? "";
}

export function getTemplateGuideBySlug(
  slug: string,
  locale: HomegroundLocale,
): GuideEntry | null {
  return (
    guideRegistry.find(
      (guide) =>
        guide.layout?.mode === "template" &&
        guide.locales[locale] &&
        slugFromPath(guide.locales[locale]!.path) === slug,
    ) ?? null
  );
}

export function getTemplateGuideParams(locale: HomegroundLocale) {
  return guideRegistry.flatMap((guide) => {
    const localized = guide.locales[locale];
    return guide.layout?.mode === "template" && localized
      ? [{ slug: slugFromPath(localized.path) }]
      : [];
  });
}

export async function loadTemplateGuideBody(
  id: GuideId,
  locale: HomegroundLocale,
) {
  const loader = bodyLoaders[id]?.[locale];
  if (!loader) throw new Error(`Missing generated body loader for ${id}/${locale}.`);
  const module = await loader();
  return assertStructuredPageBody(module.default);
}

export function buildEditorialGuideMetadata(
  guide: GuideEntry,
  locale: HomegroundLocale,
): Metadata {
  const localized = getGuideEntry(guide.id, locale);
  const alternateLocale = Object.entries(guide.locales)
    .filter(([candidate, entry]) => candidate !== locale && Boolean(entry))
    .map(([, entry]) => entry!.openGraphLocale);

  return {
    title: localized.title,
    description: localized.description,
    alternates: {
      canonical: localized.canonicalPath,
      languages: getGuideLanguagePaths(guide.id),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: localized.title,
      description: localized.description,
      type: "article",
      locale: localized.openGraphLocale,
      alternateLocale,
      url: localized.canonicalPath,
      publishedTime: localized.datePublished,
      modifiedTime: localized.dateModified,
      images: [
        {
          url: localized.heroImageUrl,
          width: localized.imageWidth,
          height: localized.imageHeight,
          alt: localized.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.description,
      images: [localized.heroImageUrl],
    },
  };
}
