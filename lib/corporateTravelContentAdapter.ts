import type { ContentNode } from "./content-system/types";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateTrips, getCorporateTrip } from "./corporateTravel.ts";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { getCorporateHubCopy } from "./corporateTravelHub.ts";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateHubPathFor, corporateTripPathFor, type CorporateTripSlug } from "./corporateTravelTypes.ts";

// The shared content manifest supports these three schema locales. The five
// independent editions are exported through their own routes and sitemap rows.
type CorporateLocale = "en" | "zh" | "ko";
const corporateLocales: readonly CorporateLocale[] = ["en", "zh", "ko"];

const hubId = "corporate-travel";

type LocaleFields = { path: string; title: string; description: string; h1: string; searchTerms: string[] };

const hubSearchTerms: Record<CorporateLocale, string[]> = {
  en: ["China company trip", "China corporate retreat", "China incentive travel", "China team retreat", "small meetings in China"],
  zh: ["中国公司旅游", "员工旅游", "奖励旅游", "公司团建", "中国企业旅行"],
  ko: ["중국 기업 단체여행", "중국 포상여행", "중국 워크숍", "기업 연수 여행", "중국 인센티브 여행"],
};
const tripSearchTerms: Record<CorporateTripSlug, Record<CorporateLocale, string[]>> = {
  "zhangjiajie-4-day-team-trip": {
    en: ["Zhangjiajie company trip", "Zhangjiajie team travel", "Zhangjiajie incentive travel"],
    zh: ["张家界公司旅游", "张家界员工旅游", "张家界奖励旅游"],
    ko: ["장가계 기업 단체여행", "장가계 포상여행", "장가계 단체여행"],
  },
  "shanghai-suzhou-4-day-company-retreat": {
    en: ["Shanghai company retreat", "Shanghai Suzhou company trip", "Shanghai team retreat"],
    zh: ["上海公司旅游", "上海苏州员工旅游", "上海团队会议"],
    ko: ["상하이 기업 단체여행", "상하이 워크숍", "상하이 쑤저우 단체여행"],
  },
};

function corporateNode({
  id, parentContentId, fields, entityIds, isHub = false,
}: {
  id: string;
  parentContentId: string;
  fields: (locale: CorporateLocale) => LocaleFields;
  entityIds: string[];
  isHub?: boolean;
}): ContentNode {
  const locales = Object.fromEntries(corporateLocales.map((locale) => [locale === "zh" ? "zh-Hans" : locale, {
    ...fields(locale),
    bodyResource: `corporate-travel:${id}:${locale}`,
    localizationStatus: locale === "en" ? "source" : "localized",
    openGraphLocale: getCorporateHubCopy(locale).ogLocale,
    ctaId: "corporate-brief",
  }]));
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
    locales,
    factIds: [],
    sourceIds: [],
    mediaIds: [],
    schemaTypes: [isHub ? "CollectionPage" : "WebPage", "Service", "FAQPage"],
    legacyAliases: [],
    // These service pages carry no invented historical publication date.
    dates: {},
    updatePolicy: {
      volatility: "medium",
      refreshCadence: "quarterly",
      owner: "homeground-platform",
    },
  };
}

/** Company pages in English, Chinese and Korean: metadata and URLs share the rendered copy's source. */
export function buildCorporateTravelContentNodes(): ContentNode[] {
  return [
    corporateNode({
      id: hubId,
      parentContentId: "hub-services",
      fields: (locale) => {
        const copy = getCorporateHubCopy(locale);
        return { path: corporateHubPathFor(locale), title: copy.seoTitle, description: copy.description, h1: copy.h1, searchTerms: hubSearchTerms[locale] };
      },
      entityIds: ["country-china"],
      isHub: true,
    }),
    ...corporateTrips.map((source) => corporateNode({
      id: `corporate-travel-${source.slug}`,
      parentContentId: hubId,
      fields: (locale) => {
        const trip = getCorporateTrip(source.slug, locale) ?? source;
        return { path: corporateTripPathFor(locale, source.slug), title: trip.seoTitle, description: trip.description, h1: trip.title, searchTerms: tripSearchTerms[source.slug][locale] };
      },
      entityIds: source.slug.startsWith("zhangjiajie")
        ? ["country-china", "city-zhangjiajie"]
        : ["country-china", "city-shanghai", "city-suzhou"],
    })),
  ];
}
