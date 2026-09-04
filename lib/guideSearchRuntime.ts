import coreEntityRecords from "../content/entities/core-places.json" with { type: "json" };
import type {
  ContentRecordEnvelope,
  Entity,
} from "./content-system/types";
import {
  buildGuideSearchDocuments,
  type GuideSearchCollectionDefinition,
} from "./guideSearch";
import { getIndexApprovedGuides } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import {
  getGuideCollectionId,
  searchCollections,
} from "./searchCollectionI18n";
import { searchPlatformManifest } from "./searchPlatformManifest";

const entities = (coreEntityRecords as ContentRecordEnvelope[]).flatMap(
  (record) => (record.recordType === "entity" ? [record.data as Entity] : []),
);

const collectionRegistry: GuideSearchCollectionDefinition[] =
  searchCollections.map((collection) => ({
    id: collection.id,
    guideContentIds: getIndexApprovedGuides()
      .filter((guide) => getGuideCollectionId(guide) === collection.id)
      .map((guide) => `guide-${guide.id}`),
    locales: {
      en: { label: collection.locales.en.label },
      zh: { label: collection.locales.zh.label },
      ko: { label: collection.locales.ko.label },
    },
  }));

const guideSearchDocuments = buildGuideSearchDocuments(
  searchPlatformManifest,
  entities,
  collectionRegistry,
);

export function getGuideSearchDocuments(locale: HomegroundLocale) {
  return guideSearchDocuments.filter((document) => document.locale === locale);
}
