import type { HomegroundLocale } from "./homegroundI18n";

export type HomegroundPrimaryNavigationId =
  | "destinations"
  | "tours"
  | "guides"
  | "studio";

interface HomegroundPrimaryNavigationItemCopy {
  label: string;
  description: string;
  pathSegment: string;
}

interface HomegroundNavigationModelCopy {
  mobileCta: string;
  items: Record<
    HomegroundPrimaryNavigationId,
    HomegroundPrimaryNavigationItemCopy
  >;
}

export interface HomegroundPrimaryNavigationItem
  extends HomegroundPrimaryNavigationItemCopy {
  href: string;
  id: HomegroundPrimaryNavigationId;
}

export const homegroundPrimaryNavigationIds = [
  "destinations",
  "tours",
  "guides",
  "studio",
] as const satisfies readonly HomegroundPrimaryNavigationId[];

const navigationCopy: Record<HomegroundLocale, HomegroundNavigationModelCopy> = {
  en: {
    mobileCta: "Plan",
    items: {
      destinations: {
        label: "Destinations",
        description: "Regions, cities and places",
        pathSegment: "explore/",
      },
      tours: {
        label: "Private Tours",
        description: "Compare published private itineraries",
        pathSegment: "tours/",
      },
      guides: {
        label: "Travel Guides",
        description: "Entry, transport, stays and first trips",
        pathSegment: "guides/",
      },
      studio: {
        label: "How We Plan",
        description: "How Homeground judges a workable trip",
        pathSegment: "studio/",
      },
    },
  },
  zh: {
    mobileCta: "规划",
    items: {
      destinations: {
        label: "目的地",
        description: "按地区、城市和景点开始",
        pathSegment: "explore/",
      },
      tours: {
        label: "私家团",
        description: "比较已经上线的私家路线",
        pathSegment: "tours/",
      },
      guides: {
        label: "旅行指南",
        description: "入境、交通、住宿与第一次旅行",
        pathSegment: "guides/",
      },
      studio: {
        label: "我们如何规划",
        description: "了解 Homeground 怎样判断行程是否合理",
        pathSegment: "studio/",
      },
    },
  },
  ko: {
    mobileCta: "상담",
    items: {
      destinations: {
        label: "여행지",
        description: "지역, 도시, 명소에서 시작",
        pathSegment: "explore/",
      },
      tours: {
        label: "프라이빗 투어",
        description: "공개된 프라이빗 일정을 비교",
        pathSegment: "tours/",
      },
      guides: {
        label: "여행 가이드",
        description: "입국, 교통, 숙소와 첫 중국 여행",
        pathSegment: "guides/",
      },
      studio: {
        label: "여행 설계 방식",
        description: "Homeground가 현실적인 일정을 판단하는 법",
        pathSegment: "studio/",
      },
    },
  },
};

export function getHomegroundNavigationModel(
  locale: HomegroundLocale,
  localePath: string,
) {
  const copy = navigationCopy[locale];

  return {
    mobileCta: copy.mobileCta,
    items: homegroundPrimaryNavigationIds.map((id) => ({
      ...copy.items[id],
      href: `${localePath}${copy.items[id].pathSegment}`,
      id,
    })),
  };
}
