import type { ContentNode } from "./content-system/types";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateTrips } from "./corporateTravel.ts";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateHubTitle, corporateHubDescription } from "./corporateTravelHub.ts";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateHubPath, corporateTripPath } from "./corporateTravelTypes.ts";

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
    locales: {
      en: {
        path,
        title,
        description,
        h1,
        bodyResource: `corporate-travel:${id}`,
        searchTerms,
        localizationStatus: "source",
        openGraphLocale: "en_US",
        ctaId: "corporate-brief",
      },
    },
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

/** English-only service pages: metadata and URLs share the rendered copy's source. */
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
