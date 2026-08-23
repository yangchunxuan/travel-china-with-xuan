import type { HomegroundLocale } from "./homegroundI18n";

export type HomegroundPrimaryNavigationId =
  | "destinations"
  | "first-trip"
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
  "first-trip",
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
      "first-trip": {
        label: "First trip",
        description: "Entry, route order and bookings",
        pathSegment: "plan/",
      },
      guides: {
        label: "All guides",
        description: "Every answer, organized by question",
        pathSegment: "guides/",
      },
      studio: {
        label: "How we plan",
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
      "first-trip": {
        label: "第一次去中国",
        description: "入境、路线顺序与预订",
        pathSegment: "plan/",
      },
      guides: {
        label: "全部指南",
        description: "按实际问题查找完整文章库",
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
      "first-trip": {
        label: "첫 중국 여행",
        description: "입국, 동선 순서와 예약",
        pathSegment: "plan/",
      },
      guides: {
        label: "전체 가이드",
        description: "실제 질문별 전체 글 모음",
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
