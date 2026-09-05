import type {
  ContentNode,
  LocaleVersion,
  SchemaLocale,
} from "./content-system/types";
import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getPrivateTourHubCopy } from "./privateTourHubI18n.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { localizePrivateTourProduct, privateTourProducts } from "./privateTourProducts.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { isReservedPrivateTourSlug } from "./privateTourMetadata.ts";

const locales = ["en", "zh", "ko"] as const;
const schemaLocale: Record<HomegroundLocale, SchemaLocale> = {
  en: "en",
  zh: "zh-Hans",
  ko: "ko",
};

function reviewedSearchTerms(
  title: string,
  highlights: readonly string[],
  days: number,
) {
  return [...new Set([title, `${days} day China private tour`, ...highlights])];
}

function buildPrivateTourHubNode(): ContentNode {
  const localizedVersions = Object.fromEntries(
    locales.map((locale) => {
      const copy = getPrivateTourHubCopy(
        locale,
        getPublishedPrivateTourCatalog(locale).length,
      );
      return [
        schemaLocale[locale],
        {
          path: copy.path,
          title: copy.metadata.title,
          description: copy.metadata.description,
          h1: copy.title,
          bodyResource: "private-tour-hub:tours",
          searchTerms: [
            copy.metadata.title,
            copy.catalogTitle,
            locale === "en"
              ? "compare China private tours"
              : locale === "zh"
                ? "比较中国私家团"
                : "중국 프라이빗 투어 비교",
          ],
          localizationStatus: locale === "en" ? "source" : "localized",
          openGraphLocale:
            locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ko_KR",
          ctaId: "trip-brief",
        } satisfies LocaleVersion,
      ];
    }),
  ) as ContentNode["locales"];

  return {
    id: "tour-hub",
    section: "services",
    family: "comparison",
    primaryIntent: "compare",
    entityIds: ["country-china"],
    relationIds: [],
    parentContentId: null,
    status: "published",
    indexability: { index: true, follow: true },
    locales: localizedVersions,
    factIds: [],
    sourceIds: [],
    mediaIds: [],
    schemaTypes: ["CollectionPage", "ItemList"],
    legacyAliases: [],
    dates: {
      datePublished: "2026-08-24",
      dateModified: "2026-09-06",
      lastReviewed: "2026-08-31",
    },
    updatePolicy: {
      volatility: "high",
      refreshCadence: "weekly",
      owner: "homeground-commerce",
    },
  } satisfies ContentNode;
}

export function buildPrivateTourContentNodes(): ContentNode[] {
  const productNodes = privateTourProducts
    .filter((product) => !isReservedPrivateTourSlug(product.slug))
    .map((product) => {
      const localizedVersions = Object.fromEntries(
        locales.map((locale) => {
          const localized = localizePrivateTourProduct(product, locale);
          return [
            schemaLocale[locale],
            {
              path: localized.path,
              title: localized.metadataTitle,
              description: localized.metadataDescription,
              h1: localized.title,
              bodyResource: `private-tour:${product.slug}`,
              searchTerms: reviewedSearchTerms(
                localized.title,
                localized.highlights,
                product.days,
              ),
              localizationStatus: locale === "en" ? "source" : "localized",
              openGraphLocale: localized.openGraphLocale,
              ctaId: "trip-brief",
            } satisfies LocaleVersion,
          ];
        }),
      ) as ContentNode["locales"];

      return {
        id: `tour-${product.id}`,
        section: "services",
        family: "service",
        primaryIntent: "purchase",
        // The current core entity graph does not yet contain every city used
        // by this batch. Country-level linkage stays valid until those place
        // records are reviewed and added independently.
        entityIds: ["country-china"],
        relationIds: [],
        parentContentId: "tour-hub",
        status: "published",
        indexability: { index: true, follow: true },
        locales: localizedVersions,
        factIds: [],
        sourceIds: [],
        mediaIds: [],
        schemaTypes: ["WebPage", "TouristTrip", "Product"],
        legacyAliases: [],
        dates: {
          datePublished: product.datePublished,
          dateModified: product.dateModified,
          lastReviewed: product.lastReviewed ?? product.dateModified,
        },
        updatePolicy: {
          volatility: "high",
          refreshCadence: "weekly",
          owner: "homeground-commerce",
        },
      } satisfies ContentNode;
    });

  return [buildPrivateTourHubNode(), ...productNodes];
}
