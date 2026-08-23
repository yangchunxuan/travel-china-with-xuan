import {
  getAllGuides,
  getGuideEntry,
  type GuideId,
} from "./guideRegistry";
import { searchGuideDocuments } from "./guideSearch";
import { getGuideSearchCopy } from "./guideSearchI18n";
import { getGuideSearchDocuments } from "./guideSearchRuntime";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "./homegroundI18n";
import {
  destinationHubIds,
  getDestinationHubEntry,
  type DestinationHubId,
} from "./destinationHubs";
import { getZhangjiajiePrivateTourHomeCard } from "./zhangjiajiePrivateTourHomeCard";

export type HomepageGuideCategory =
  | "tour"
  | "explore"
  | "stay"
  | "transport"
  | "plan"
  | "culture"
  | "essentials"
  | "when-to-go";

export interface HomepageGuideRailItem {
  readonly id: string;
  readonly kind: "tour" | "guide";
  readonly category: HomepageGuideCategory;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  readonly href: string;
  readonly linkLabel: string;
}

export interface HomepageSearchDemo {
  readonly query: string;
  readonly results: readonly {
    readonly id: string;
    readonly title: string;
    readonly label: string;
  }[];
}

export interface HomepageDestinationHubItem {
  readonly id: DestinationHubId;
  readonly label: string;
  readonly href: string;
}

const editorialLeadOrder: readonly GuideId[] = [
  "is-your-china-itinerary-too-rushed",
  "zhangjiajie-city-or-wulingyuan-hotel-base",
  "beijing-south-station-to-capital-or-daxing-airport",
  "first-shared-meal-in-china",
  "china-online-arrival-card",
  "longji-rice-terraces-day-trip-or-overnight",
  "beijing-where-to-stay-first-trip",
  "guilin-airport-or-railway-station-arrival-guide",
  "china-regional-food-route",
  "china-itinerary-with-older-parents",
  "great-wall-section-selector-from-beijing",
  "forbidden-city-for-foreign-visitors",
  "yangshuo-town-or-yulong-river-where-to-stay",
  "shenzhen-airport-railway-station-border-port-selector",
  "shanghai-where-to-stay-first-trip",
  "xian-where-to-stay-city-wall-or-dayanta",
  "lunar-new-year-customs-for-visitors",
  "china-climate-regions-for-trip-timing",
  "china-24-solar-terms-weather-food-daily-life",
  "china-high-speed-train-first-time-guide",
] as const;

const privateTourDescriptions: Record<HomegroundLocale, string> = {
  en: "A four-day private route with arrival pickup, three full sightseeing days and a choice of stays.",
  zh: "抵达接送、三个完整游览日与多种住宿选择，组成一条从容的四天私家路线。",
  ko: "도착 픽업과 3일의 온전한 관광, 다양한 숙소 선택을 연결한 4일 프라이빗 일정입니다.",
};

function guideCategory(
  guide: ReturnType<typeof getGuideEntry>,
): HomepageGuideCategory {
  const section = guide.search?.section;
  if (
    section === "explore" ||
    section === "stay" ||
    section === "transport" ||
    section === "plan" ||
    section === "culture" ||
    section === "essentials" ||
    section === "when-to-go"
  ) {
    return section;
  }

  if (guide.pillar.includes("stay") || guide.pillar.includes("hotel")) {
    return "stay";
  }
  if (guide.pillar.includes("transport")) return "transport";
  if (
    guide.pillar.includes("entry") ||
    guide.pillar.includes("payment") ||
    guide.pillar.includes("practical")
  ) {
    return "essentials";
  }
  if (guide.pillar.includes("timing")) return "when-to-go";
  if (guide.pillar.includes("culture") || guide.pillar.includes("food")) {
    return "culture";
  }
  if (guide.type === "route" || guide.type === "planning") return "plan";
  return "explore";
}

function guideTypeLabel(
  guide: ReturnType<typeof getGuideEntry>,
  locale: HomegroundLocale,
) {
  const labels = getHomegroundCopy(locale).guides.typeLabels;
  return guide.type === "field-note" ? labels.fieldNote : labels[guide.type];
}

function guideRailItem(
  guide: ReturnType<typeof getGuideEntry>,
  locale: HomegroundLocale,
): HomepageGuideRailItem {
  return {
    id: guide.id,
    kind: "guide",
    category: guideCategory(guide),
    eyebrow: guideTypeLabel(guide, locale),
    title: guide.headline,
    description: guide.description,
    image: {
      src: guide.cardImagePath,
      alt: guide.cardImageAlt,
      width: guide.cardImageWidth,
      height: guide.cardImageHeight,
    },
    href: guide.canonicalPath,
    linkLabel: guide.featuredLinkLabel,
  };
}

export function getHomepageGuideRailItems(locale: HomegroundLocale) {
  const copy = getHomegroundCopy(locale);
  const tour = getZhangjiajiePrivateTourHomeCard(locale);
  const allGuides = getAllGuides(locale);
  const editorialIndex = new Map(
    editorialLeadOrder.map((id, index) => [id, index] as const),
  );
  const orderedGuides = [...allGuides].sort((a, b) => {
    const aIndex = editorialIndex.get(a.id);
    const bIndex = editorialIndex.get(b.id);
    if (aIndex !== undefined || bIndex !== undefined) {
      return (aIndex ?? Number.MAX_SAFE_INTEGER) -
        (bIndex ?? Number.MAX_SAFE_INTEGER);
    }
    return 0;
  });

  return [
    {
      id: tour.id,
      kind: "tour",
      category: "tour",
      eyebrow: copy.guides.typeLabels.tour,
      title: tour.headline,
      description: privateTourDescriptions[locale],
      image: {
        src: tour.cardImagePath,
        alt: tour.cardImageAlt,
        width: tour.cardImageWidth,
        height: tour.cardImageHeight,
      },
      href: tour.canonicalPath,
      linkLabel: tour.featuredLinkLabel,
    } satisfies HomepageGuideRailItem,
    ...orderedGuides.map((guide) => guideRailItem(guide, locale)),
  ];
}

export function getHomepageSearchDemos(
  locale: HomegroundLocale,
): readonly HomepageSearchDemo[] {
  const documents = getGuideSearchDocuments(locale);

  return getGuideSearchCopy(locale).examples.flatMap((query) => {
    const results = searchGuideDocuments(documents, query, locale)
      .slice(0, 1)
      .map(({ document }) => ({
        id: document.guideId,
        title: document.h1,
        label: document.collectionLabel,
      }));

    return results.length > 0 ? [{ query, results }] : [];
  });
}

export function getHomepageDestinationHubItems(
  locale: HomegroundLocale,
): readonly HomepageDestinationHubItem[] {
  return destinationHubIds.map((id) => {
    const hub = getDestinationHubEntry(id, locale);
    return {
      id,
      label: hub.navTitle,
      href: hub.canonicalPath,
    };
  });
}
