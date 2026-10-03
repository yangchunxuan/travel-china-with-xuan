import type { HomegroundLocale } from "./homegroundI18n";

export type HomegroundPrimaryNavigationId =
  | "destinations"
  | "tours"
  | "services"
  | "guides"
  | "studio";

/**
 * The services menu (x.ai's "Products" pattern): one primary item, with every
 * standalone service listed beneath it. The item's own link opens Full Trip
 * Planning & Ground Support, whose "Which service fits?" section also routes
 * to tours and the single services, so a separate overview page is not in
 * the way. New services join this list instead of taking another header slot.
 */
export type HomegroundServiceNavigationId =
  | "attraction-tickets"
  | "english-guides"
  | "trip-support";

/**
 * The destinations menu, in the same pattern: "Destinations" opens the city
 * index, and the menu adds the ways in that are not a city, beginning with
 * travel inspiration by theme. Kept to a few rows, like Services.
 */
export type HomegroundDestinationNavigationId = "cities" | "inspiration" | "sights";

export type HomegroundSubmenuId =
  | HomegroundServiceNavigationId
  | HomegroundDestinationNavigationId;

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
  services: Record<HomegroundServiceNavigationId, HomegroundPrimaryNavigationItemCopy>;
  destinations: Record<HomegroundDestinationNavigationId, HomegroundPrimaryNavigationItemCopy>;
  /** The accessible names of the buttons that open each menu. */
  servicesToggle: string;
  destinationsToggle: string;
}

export interface HomegroundPrimaryNavigationItem
  extends HomegroundPrimaryNavigationItemCopy {
  href: string;
  id: HomegroundPrimaryNavigationId;
}

export interface HomegroundSubmenuItem
  extends HomegroundPrimaryNavigationItemCopy {
  href: string;
  id: HomegroundSubmenuId;
}

/** A primary item that opens a menu: its rows and its toggle's accessible name. */
export interface HomegroundSubmenu {
  entries: readonly HomegroundSubmenuItem[];
  toggle: string;
}

export const homegroundPrimaryNavigationIds = [
  "destinations",
  "tours",
  "services",
  "guides",
  "studio",
] as const satisfies readonly HomegroundPrimaryNavigationId[];

export const homegroundServiceNavigationIds = [
  "attraction-tickets",
  "english-guides",
  "trip-support",
] as const satisfies readonly HomegroundServiceNavigationId[];

export const homegroundDestinationNavigationIds = [
  "cities",
  "inspiration",
  "sights",
] as const satisfies readonly HomegroundDestinationNavigationId[];

const navigationCopy: Record<HomegroundLocale, HomegroundNavigationModelCopy> = {
  en: {
    mobileCta: "Plan",
    items: {
      destinations: {
        label: "Destinations",
        description: "Cities, travel inspiration and must-see sights",
        pathSegment: "explore/",
      },
      tours: {
        label: "Private Tours",
        description: "Compare published private itineraries",
        pathSegment: "tours/",
      },
      services: {
        label: "Services",
        description: "Attraction tickets, English-speaking guides and full-trip support",
        pathSegment: "services/full-trip-support/",
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
    services: {
      "attraction-tickets": {
        label: "Attraction Tickets",
        description: "Timed entry, booked in your passport name",
        pathSegment: "services/china-attraction-reservations/",
      },
      "english-guides": {
        label: "Private English-speaking Guides",
        description: "One guide by the day, in four cities",
        pathSegment: "services/private-english-speaking-guides/",
      },
      "trip-support": {
        label: "Full Trip Planning & Ground Support",
        description: "Hotels, transfers and help on the ground",
        pathSegment: "services/full-trip-support/",
      },
    },
    destinations: {
      cities: {
        label: "Cities",
        description: "Beijing, Shanghai, Xi'an and five more",
        pathSegment: "explore/",
      },
      inspiration: {
        label: "Travel Inspiration",
        description: "Trip ideas by theme, with routes to match",
        pathSegment: "inspiration/",
      },
      sights: {
        label: "Must-See Sights",
        description: "The Great Wall, Terracotta Warriors and more",
        pathSegment: "sights/",
      },
    },
    servicesToggle: "Services menu",
    destinationsToggle: "Destinations menu",
  },
  zh: {
    mobileCta: "规划",
    items: {
      destinations: {
        label: "目的地",
        description: "城市、旅行灵感与必去景点",
        pathSegment: "explore/",
      },
      tours: {
        label: "私家团",
        description: "比较已经上线的私家路线",
        pathSegment: "tours/",
      },
      services: {
        label: "服务",
        description: "景点代预约、英文导游与全程规划支持",
        pathSegment: "services/full-trip-support/",
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
    services: {
      "attraction-tickets": {
        label: "景点代预约",
        description: "官方渠道，用你本人护照实名预约",
        pathSegment: "services/china-attraction-reservations/",
      },
      "english-guides": {
        label: "私人英文导游",
        description: "上海、北京、西安、张家界，按天预订",
        pathSegment: "services/private-english-speaking-guides/",
      },
      "trip-support": {
        label: "全程规划与落地支持",
        description: "酒店、接送与现场安排一起交给我们",
        pathSegment: "services/full-trip-support/",
      },
    },
    destinations: {
      cities: {
        label: "城市",
        description: "北京、上海、西安等 8 座城市",
        pathSegment: "explore/",
      },
      inspiration: {
        label: "旅行灵感",
        description: "按主题找玩法，配好现成路线",
        pathSegment: "inspiration/",
      },
      sights: {
        label: "必去景点",
        description: "长城、兵马俑等，大多可代预约",
        pathSegment: "sights/",
      },
    },
    servicesToggle: "服务菜单",
    destinationsToggle: "目的地菜单",
  },
  ko: {
    mobileCta: "상담",
    items: {
      destinations: {
        label: "여행지",
        description: "도시, 테마 여행, 꼭 가볼 명소",
        pathSegment: "explore/",
      },
      tours: {
        label: "프라이빗 투어",
        description: "공개된 프라이빗 일정을 비교",
        pathSegment: "tours/",
      },
      services: {
        label: "서비스",
        description: "관광지 예약 대행, 영어 가이드, 전체 여행 지원",
        pathSegment: "services/full-trip-support/",
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
    services: {
      "attraction-tickets": {
        label: "관광지 예약 대행",
        description: "공식 채널에서 본인 여권 실명으로 예약",
        pathSegment: "services/china-attraction-reservations/",
      },
      "english-guides": {
        label: "프라이빗 영어 가이드",
        description: "상하이·베이징·시안·장가계, 하루 단위 예약",
        pathSegment: "services/private-english-speaking-guides/",
      },
      "trip-support": {
        label: "전체 여행 설계 및 현지 지원",
        description: "숙소·이동·현지 준비까지 한 번에",
        pathSegment: "services/full-trip-support/",
      },
    },
    destinations: {
      cities: {
        label: "도시",
        description: "베이징·상하이·시안 등 8개 도시",
        pathSegment: "explore/",
      },
      inspiration: {
        label: "테마 여행",
        description: "테마로 고르는 추천 일정",
        pathSegment: "inspiration/",
      },
      sights: {
        label: "꼭 가볼 명소",
        description: "만리장성·병마용 등, 대부분 예약 대행 가능",
        pathSegment: "sights/",
      },
    },
    servicesToggle: "서비스 메뉴",
    destinationsToggle: "여행지 메뉴",
  },
};

export function getHomegroundNavigationModel(
  locale: HomegroundLocale,
  localePath: string,
) {
  const copy = navigationCopy[locale];
  const entry = <Id extends HomegroundSubmenuId>(id: Id, item: HomegroundPrimaryNavigationItemCopy) => ({
    ...item,
    href: `${localePath}${item.pathSegment}`,
    id,
  });
  const menus: Partial<Record<HomegroundPrimaryNavigationId, HomegroundSubmenu>> = {
    destinations: {
      entries: homegroundDestinationNavigationIds.map((id) => entry(id, copy.destinations[id])),
      toggle: copy.destinationsToggle,
    },
    services: {
      entries: homegroundServiceNavigationIds.map((id) => entry(id, copy.services[id])),
      toggle: copy.servicesToggle,
    },
  };

  return {
    mobileCta: copy.mobileCta,
    items: homegroundPrimaryNavigationIds.map((id) => ({
      ...copy.items[id],
      href: `${localePath}${copy.items[id].pathSegment}`,
      id,
    })),
    menus,
  };
}
