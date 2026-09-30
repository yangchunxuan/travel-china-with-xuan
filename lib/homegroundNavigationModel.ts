import type { HomegroundLocale } from "./homegroundI18n";

export type HomegroundPrimaryNavigationId =
  | "destinations"
  | "tours"
  | "reservations"
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
  "reservations",
  "guides",
  "studio",
] as const satisfies readonly HomegroundPrimaryNavigationId[];

const navigationCopy: Record<HomegroundLocale, HomegroundNavigationModelCopy> = {
  en: {
    mobileCta: "Plan",
    items: {
      destinations: {
        label: "Destinations",
        description: "Choose cities and see how they connect",
        pathSegment: "explore/",
      },
      tours: {
        label: "Private Tours",
        description: "Compare published private itineraries",
        pathSegment: "tours/",
      },
      reservations: {
        label: "Attraction Tickets",
        description: "We book timed attraction tickets in your own name",
        pathSegment: "services/china-attraction-reservations/",
      },
      guides: {
        label: "Travel Advice",
        description: "Search entry, transport, stay and timing answers",
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
        description: "按城市与地点浏览，了解怎样连接",
        pathSegment: "explore/",
      },
      tours: {
        label: "私家团",
        description: "比较已经上线的私家路线",
        pathSegment: "tours/",
      },
      reservations: {
        label: "景点代预约",
        description: "以你本人护照实名代约景点",
        pathSegment: "services/china-attraction-reservations/",
      },
      guides: {
        label: "实用指南",
        description: "搜索入境、交通、住宿与时间问题",
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
        description: "도시와 장소를 고르고 연결 동선 확인",
        pathSegment: "explore/",
      },
      tours: {
        label: "프라이빗 투어",
        description: "공개된 프라이빗 일정을 비교",
        pathSegment: "tours/",
      },
      reservations: {
        label: "관광지 예약 대행",
        description: "본인 여권으로 관광지 실명 예약 대행",
        pathSegment: "services/china-attraction-reservations/",
      },
      guides: {
        label: "실용 가이드",
        description: "입국, 교통, 숙소와 시기 답변 검색",
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
