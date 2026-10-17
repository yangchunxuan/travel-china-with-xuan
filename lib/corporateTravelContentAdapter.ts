import type { ContentNode } from "./content-system/types";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateTrips } from "./corporateTravel.ts";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateHubTitle, corporateHubDescription } from "./corporateTravelHub.ts";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateHubPath, corporateTripPath } from "./corporateTravelTypes.ts";

import { getCorporateEdition } from "./corporateTravelEditions.ts";
import { corporatePath, corporateOgLocales } from "./corporateTravelLocalePaths.ts";

const hubId = "corporate-travel";

function corporateNode({
  id, parentContentId, path, title, description, h1, entityIds, searchTerms, isHub = false,
}: {
  id: string;
  parentContentId: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  entityIds: string[];
  searchTerms: string[];
  isHub?: boolean;
}): ContentNode {
  return {
    id,
    section: "services",
    family: "service",
    primaryIntent: "purchase",
    entityIds,
    relationIds: [],
    parentContentId,
    status: "published",
    indexability: { index: true, follow: true },
    locales: Object.fromEntries((["en", "zh", "ko"] as const).map(locale => {
      const edition = getCorporateEdition(locale);
      const trip = isHub ? undefined : edition.trips.find(item => `corporate-travel-${item.slug}` === id)!;
      return [locale === "zh" ? "zh-Hans" : locale, {
        path: corporatePath(locale, trip?.slug),
        title: trip?.seoTitle ?? edition.hub.title,
        description: trip?.description ?? edition.hub.description,
        h1: trip?.title ?? edition.hub.title,
        bodyResource: `corporate-travel:${id}`,
        searchTerms: locale === "en" ? searchTerms : [trip?.title ?? edition.hub.title, trip?.description ?? edition.hub.description],
        localizationStatus: locale === "en" ? "source" : "localized",
        openGraphLocale: corporateOgLocales[locale],
        ctaId: "corporate-brief",
      }];
    })),
    factIds: [],
    sourceIds: [],
    mediaIds: [],
    schemaTypes: [isHub ? "CollectionPage" : "WebPage", "Service", "FAQPage"],
    legacyAliases: [],
    // These additive service pages carry no invented historical publication date.
    dates: {},
    updatePolicy: {
      volatility: "medium",
      refreshCadence: "quarterly",
      owner: "homeground-platform",
    },
  };
}

/** Core manifest locales share the localized page copy; the other editions use equivalent standalone routes. */
export function buildCorporateTravelContentNodes(): ContentNode[] {
  return [
    corporateNode({
      id: hubId,
      parentContentId: "hub-services",
      path: corporateHubPath,
      title: corporateHubTitle,
      description: corporateHubDescription,
      h1: corporateHubTitle,
      entityIds: ["country-china"],
      searchTerms: ["China company trip", "China corporate retreat", "China incentive travel", "China team retreat", "small meetings in China"],
      isHub: true,
    }),
    ...corporateTrips.map((trip) => corporateNode({
      id: `corporate-travel-${trip.slug}`,
      parentContentId: hubId,
      path: corporateTripPath(trip.slug),
      title: trip.seoTitle,
      description: trip.description,
      h1: trip.title,
      entityIds: trip.slug.startsWith("zhangjiajie")
        ? ["country-china", "city-zhangjiajie"]
        : ["country-china", "city-shanghai", "city-suzhou"],
      searchTerms: trip.slug.startsWith("zhangjiajie")
        ? ["Zhangjiajie company trip", "Zhangjiajie team travel", "Zhangjiajie incentive travel"]
        : ["Shanghai company retreat", "Shanghai Suzhou company trip", "Shanghai team retreat"],
    })),
  ];
}
