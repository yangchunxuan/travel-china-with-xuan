import type { HomegroundLocale } from "./homegroundI18n";

interface DestinationsHubCopy {
  breadcrumbLabel: string;
  homeLabel: string;
  currentLabel: string;
  cityEyebrow: string;
  cityTitle: string;
  cityIntroduction: (count: number) => string;
  cityCount: (count: number) => string;
  openCity: string;
  scaleEyebrow: string;
  scaleTitle: string;
  scaleIntroduction: string;
  openScale: string;
  handoffEyebrow: string;
  handoffTitle: string;
  handoffBody: string;
  guidesAction: string;
  toursAction: string;
}

const copies: Record<HomegroundLocale, DestinationsHubCopy> = {
  en: {
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
    currentLabel: "Destinations",
    cityEyebrow: "City hubs",
    cityTitle: "Choose the city you want to understand.",
    cityIntroduction: (count) =>
      `Each of these ${count} city hubs keeps nights, stay areas, arrival points, major sights and sensible next stops in one place.`,
    cityCount: (count) => `${count} published city hubs`,
    openCity: "Open city hub",
    scaleEyebrow: "Browse by place type",
    scaleTitle: "Look beyond the city name.",
    scaleIntroduction:
      "Use these place indexes when the question is geographic: which region, which kind of city, or which sight and landscape belongs in the route.",
    openScale: "Browse places",
    handoffEyebrow: "A different kind of question?",
    handoffTitle: "Use Travel Advice when you need an answer, not a place.",
    handoffBody:
      "Entry rules, payments, transport, hotel decisions and travel timing belong in the searchable advice library. Published itineraries belong in Private Tours.",
    guidesAction: "Open Travel Advice",
    toursAction: "Compare Private Tours",
  },
  zh: {
    breadcrumbLabel: "当前位置",
    homeLabel: "首页",
    currentLabel: "目的地",
    cityEyebrow: "城市入口",
    cityTitle: "选择一座你真正想看懂的城市。",
    cityIntroduction: (count) =>
      `这 ${count} 个城市 Hub 把建议停留晚数、住宿区域、进出门户、主要景点关系和合理的下一站放在同一个页面里。`,
    cityCount: (count) => `已发布 ${count} 个城市 Hub`,
    openCity: "打开城市 Hub",
    scaleEyebrow: "按地点类型浏览",
    scaleTitle: "城市名称之外，还可以按地理层级寻找。",
    scaleIntroduction:
      "当你的问题是“哪个地区、哪类城市或哪处景观应该进入路线”时，再使用下面三个地点索引。",
    openScale: "浏览地点",
    handoffEyebrow: "如果你问的不是地点",
    handoffTitle: "需要解决旅行问题时，请进入实用指南。",
    handoffBody:
      "入境、支付、交通、住宿选择和出行时间属于可搜索的实用指南；已经上线的完整路线属于私家团。",
    guidesAction: "打开实用指南",
    toursAction: "比较私家团",
  },
  ko: {
    breadcrumbLabel: "현재 위치",
    homeLabel: "홈",
    currentLabel: "여행지",
    cityEyebrow: "도시 허브",
    cityTitle: "제대로 이해하고 싶은 도시를 고르세요.",
    cityIntroduction: (count) =>
      `공개된 ${count}개 도시 허브에서 권장 숙박일, 숙소 지역, 도착 지점, 주요 명소 관계와 다음 여행지를 한 번에 확인할 수 있습니다.`,
    cityCount: (count) => `공개 도시 허브 ${count}개`,
    openCity: "도시 허브 열기",
    scaleEyebrow: "장소 유형별 탐색",
    scaleTitle: "도시 이름 너머의 지리 관계를 살펴보세요.",
    scaleIntroduction:
      "어느 지역, 어떤 도시 유형, 어떤 명소와 풍경을 동선에 넣을지 고민할 때 아래 여행지 목록을 사용하세요.",
    openScale: "장소 둘러보기",
    handoffEyebrow: "장소가 아닌 질문이 있나요?",
    handoffTitle: "답이 필요할 때는 실용 가이드를 이용하세요.",
    handoffBody:
      "입국, 결제, 교통, 숙소 선택과 여행 시기는 검색 가능한 실용 가이드에서, 공개된 완성 일정은 프라이빗 투어에서 확인할 수 있습니다.",
    guidesAction: "실용 가이드 열기",
    toursAction: "프라이빗 투어 비교",
  },
};

export function getDestinationsHubCopy(
  locale: HomegroundLocale = "en",
): DestinationsHubCopy {
  return copies[locale];
}
