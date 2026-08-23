import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { localizePrivateTourProduct, privateTourProducts, type PrivateTourProduct } from "./privateTourProducts.ts";

export const RESERVED_PRIVATE_TOUR_SLUGS = [
  "zhangjiajie-4-day-private-tour",
] as const;

const reservedPrivateTourSlugs = new Set<string>(RESERVED_PRIVATE_TOUR_SLUGS);

export function isReservedPrivateTourSlug(slug: string) {
  return reservedPrivateTourSlugs.has(slug);
}

export function getPrivateTourRouteParams(_locale: HomegroundLocale) {
  return privateTourProducts
    .filter((product) => !isReservedPrivateTourSlug(product.slug))
    .map((product) => ({ slug: product.slug }));
}

export function getPrivateTourLanguagePaths(product: PrivateTourProduct) {
  const paths = localizePrivateTourProduct(product, "en").paths;
  return {
    en: paths.en,
    "zh-Hans": paths.zh,
    ko: paths.ko,
    "x-default": paths.en,
  } as const;
}

export function buildPrivateTourMetadata(
  product: PrivateTourProduct,
  locale: HomegroundLocale,
): Metadata {
  const localized = localizePrivateTourProduct(product, locale);
  const alternateLocale = (["en", "zh", "ko"] as const)
    .filter((candidate) => candidate !== locale)
    .map(
      (candidate) =>
        localizePrivateTourProduct(product, candidate).openGraphLocale,
    );

  return {
    title: localized.metadataTitle,
    description: localized.metadataDescription,
    alternates: {
      canonical: localized.path,
      languages: getPrivateTourLanguagePaths(product),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: localized.title,
      description: localized.metadataDescription,
      type: "website",
      locale: localized.openGraphLocale,
      alternateLocale,
      url: localized.path,
      images: [
        {
          url: localized.heroImage.src,
          width: localized.heroImage.width,
          height: localized.heroImage.height,
          alt: localized.heroImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localized.metadataTitle,
      description: localized.metadataDescription,
      images: [localized.heroImage.src],
    },
  };
}
