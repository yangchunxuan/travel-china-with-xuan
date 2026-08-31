import type { HomegroundLocale } from "./homegroundI18n";

export const privateTourHubPaths = {
  en: "/tours/",
  zh: "/zh/tours/",
  ko: "/ko/tours/",
} as const satisfies Record<HomegroundLocale, string>;

const copy = {
  en: {
    htmlLang: "en",
    path: privateTourHubPaths.en,
    metadata: {
      title: "Private China Tours",
      description: (count: number) =>
        `Compare ${count} published private China tours by route, trip length, pace and traveller fit, from Beijing and Xi’an to Zhangjiajie and Jiangnan.`,
      openGraphTitle: (count: number) =>
        `Private China Tours — Compare ${count} Published Routes`,
    },
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Private tours",
    eyebrow: (count: number) => `${count} published private journeys`,
    title: "Compare private China tours by route, pace and travel style.",
    introduction:
      "Start with the geography, pace and experiences that matter to you. Every route below has its own published itinerary; this page helps you compare them before opening the details.",
    quickCompareEyebrow: (count: number) => `${count}-route overview`,
    quickCompareTitle: "Compare the essentials before opening a tour.",
    quickCompareIntroduction:
      "Trip length and prices use the same published two-traveller basis. The fit and hotel-movement notes come directly from each itinerary.",
    quickFitLabel: "Best for",
    quickMovementLabel: "Bases and movement",
    quickAction: "Open route",
    summaryLabel: "Choose in three moves",
    summaryTitle: "Find the route that fits the trip you actually want.",
    summarySteps: [
      {
        number: "01",
        title: "Choose the shape",
        body: "Stay in one base, add a day trip or connect several cities with luggage already considered.",
      },
      {
        number: "02",
        title: "Check the pace",
        body: "Compare hotel changes, full touring days and the arrival or departure buffers built into each route.",
      },
      {
        number: "03",
        title: "Open the real itinerary",
        body: "See the day-by-day plan, inclusions, exclusions and any date or booking conditions on the product page.",
      },
    ],
    catalogEyebrow: "Compare all routes",
    catalogTitle: (count: number) => `${count} different ways into China.`,
    catalogIntroduction: (count: number) =>
      `These are ${count} equal, published products. Price presentation can differ by product; the comparison here does not replace the final written quote or availability check.`,
    tourCount: (count: number) => `${count} published private tours`,
    duration: (days: number, nights: number) => `${days} days · ${nights} nights`,
    startingPriceLabel: "Published from price",
    perPersonLabel: "per person",
    groupBasis: (travelers: number) => `based on ${travelers} travellers`,
    paceLabel: "Pace and bases",
    fitLabel: "Best fit",
    highlightsLabel: "Core experiences",
    viewLabel: "Open the full private tour",
    finalEyebrow: "Still comparing?",
    finalTitle: "A published route can be the starting point, not a constraint.",
    finalBody:
      "Use the product pages to compare the fixed foundations first. If your dates, arrival city or pace differ, Homeground can check what needs to change without forcing a ready-made route.",
    finalAction: "See how Homeground plans trips",
  },
  zh: {
    htmlLang: "zh-Hans",
    path: privateTourHubPaths.zh,
    metadata: {
      title: "中国私家团",
      description: (count: number) =>
        `按路线、天数、节奏和适合人群比较 Homeground ${count} 条已发布中国私家团，从北京、西安到张家界与江南多城。`,
      openGraphTitle: (count: number) =>
        `中国私家团｜比较 ${count} 条正式路线`,
    },
    breadcrumbLabel: "面包屑导航",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "私家团",
    eyebrow: (count: number) => `${count} 条已发布私家路线`,
    title: "先把路线比清楚，再选适合自己的中国旅行。",
    introduction:
      "先看地域、节奏和真正想体验的内容。下面每条路线都有完整正式页；这里负责把差别放在一起，让你做选择，而不是再复制一遍行程。",
    quickCompareEyebrow: (count: number) => `${count} 条路线总览`,
    quickCompareTitle: "先比较关键差别，再打开完整产品。",
    quickCompareIntroduction:
      "天数和起价统一采用公开的两人同行口径；适合人群与住宿移动说明直接来自每条正式行程。",
    quickFitLabel: "更适合",
    quickMovementLabel: "住宿与移动",
    quickAction: "打开路线",
    summaryLabel: "三步做选择",
    summaryTitle: "找出真正适合这趟旅行的路线。",
    summarySteps: [
      {
        number: "01",
        title: "先看路线形状",
        body: "是一座城市连住、增加近郊一日游，还是带着行李连续换城。",
      },
      {
        number: "02",
        title: "再看每天节奏",
        body: "比较换酒店次数、完整游览日，以及抵达和离开是否留有缓冲。",
      },
      {
        number: "03",
        title: "打开正式行程",
        body: "到产品页核对每天安排、包含项、不包含项，以及日期与预约条件。",
      },
    ],
    catalogEyebrow: "比较全部路线",
    catalogTitle: (count: number) => `${count} 种不同的中国旅行方式。`,
    catalogIntroduction: (count: number) =>
      `以下 ${count} 条都是同等正式的已发布产品。不同产品的价格展示方式可以不同；这里的比较不替代最终书面报价和可订状态核对。`,
    tourCount: (count: number) => `${count} 条已发布私家团`,
    duration: (days: number, nights: number) => `${days} 天 · ${nights} 晚`,
    startingPriceLabel: "公开起价",
    perPersonLabel: "每人",
    groupBasis: (travelers: number) => `按 ${travelers} 人同行`,
    paceLabel: "节奏与住宿地",
    fitLabel: "更适合谁",
    highlightsLabel: "核心体验",
    viewLabel: "打开完整私家团",
    finalEyebrow: "还在比较？",
    finalTitle: "正式路线可以是起点，不必成为限制。",
    finalBody:
      "先用产品页比较已经确定的路线基础。如果你的日期、抵达城市或旅行节奏不同，Homeground 可以核对需要怎样调整，不会强迫你套用现成路线。",
    finalAction: "了解 Homeground 如何规划",
  },
  ko: {
    htmlLang: "ko",
    path: privateTourHubPaths.ko,
    metadata: {
      title: "중국 프라이빗 투어",
      description: (count: number) =>
        `베이징과 시안부터 장자제와 강남 다도시까지, 공개된 중국 프라이빗 투어 ${count}개를 동선, 기간, 속도와 여행자 유형별로 비교하세요.`,
      openGraphTitle: (count: number) =>
        `중국 프라이빗 투어 — 공개 일정 ${count}개 비교`,
    },
    breadcrumbLabel: "현재 위치",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "프라이빗 투어",
    eyebrow: (count: number) => `공개된 ${count}개의 프라이빗 여정`,
    title: "중국 프라이빗 투어, 차이를 분명하게 비교하세요.",
    introduction:
      "지역, 여행 속도와 원하는 경험부터 살펴보세요. 아래 모든 여정에는 정식 상세 페이지가 있으며, 이 페이지는 상세 내용을 반복하기보다 선택에 필요한 차이를 한곳에서 보여 줍니다.",
    quickCompareEyebrow: (count: number) => `${count}개 동선 한눈에 보기`,
    quickCompareTitle: "상세 상품을 열기 전에 핵심 차이를 비교하세요.",
    quickCompareIntroduction:
      "여행 기간과 시작가는 공개된 2인 기준으로 통일했습니다. 추천 여행자와 숙소 이동 정보는 각 정식 일정에서 가져왔습니다.",
    quickFitLabel: "추천 여행자",
    quickMovementLabel: "숙박 거점과 이동",
    quickAction: "동선 열기",
    summaryLabel: "세 단계로 고르기",
    summaryTitle: "내가 원하는 여행에 맞는 동선을 찾으세요.",
    summarySteps: [
      {
        number: "01",
        title: "동선의 형태 고르기",
        body: "한 도시에 머물지, 근교 당일 일정을 더할지, 수하물과 함께 여러 도시를 연결할지 봅니다.",
      },
      {
        number: "02",
        title: "여행 속도 확인하기",
        body: "숙소 이동, 종일 관광일과 도착·출발일의 여유를 일정별로 비교합니다.",
      },
      {
        number: "03",
        title: "정식 일정 열기",
        body: "상품 페이지에서 일자별 동선, 포함·불포함 사항과 날짜별 예약 조건을 확인합니다.",
      },
    ],
    catalogEyebrow: "전체 동선 비교",
    catalogTitle: (count: number) =>
      `중국을 여행하는 서로 다른 ${count}가지 방법.`,
    catalogIntroduction: (count: number) =>
      `아래 ${count}개는 모두 동등하게 공개된 정식 상품입니다. 상품마다 가격 표시 방식은 다를 수 있으며, 이 비교는 최종 서면 견적이나 예약 가능 여부 확인을 대신하지 않습니다.`,
    tourCount: (count: number) => `공개된 프라이빗 투어 ${count}개`,
    duration: (days: number, nights: number) => `${days}일 · ${nights}박`,
    startingPriceLabel: "공개 시작가",
    perPersonLabel: "1인",
    groupBasis: (travelers: number) => `${travelers}인 기준`,
    paceLabel: "속도와 숙박 거점",
    fitLabel: "추천 여행자",
    highlightsLabel: "핵심 경험",
    viewLabel: "전체 프라이빗 투어 보기",
    finalEyebrow: "아직 비교 중인가요?",
    finalTitle: "공개 일정은 출발점이지, 반드시 지켜야 할 틀이 아닙니다.",
    finalBody:
      "먼저 상품 페이지에서 정해진 기본 동선을 비교하세요. 날짜, 도착 도시나 원하는 속도가 다르면 Homeground가 기성 일정을 강요하지 않고 필요한 변경을 확인합니다.",
    finalAction: "Homeground의 여행 설계 방식 보기",
  },
} as const;

export function getPrivateTourHubCopy(
  locale: HomegroundLocale,
  publishedTourCount: number,
) {
  const localized = copy[locale];
  return {
    ...localized,
    metadata: {
      ...localized.metadata,
      description: localized.metadata.description(publishedTourCount),
      openGraphTitle:
        localized.metadata.openGraphTitle(publishedTourCount),
    },
    eyebrow: localized.eyebrow(publishedTourCount),
    quickCompareEyebrow:
      localized.quickCompareEyebrow(publishedTourCount),
    catalogTitle: localized.catalogTitle(publishedTourCount),
    catalogIntroduction:
      localized.catalogIntroduction(publishedTourCount),
  };
}

export type PrivateTourHubCopy = ReturnType<typeof getPrivateTourHubCopy>;

export function getPrivateTourHubLanguagePaths() {
  return {
    en: privateTourHubPaths.en,
    "zh-Hans": privateTourHubPaths.zh,
    ko: privateTourHubPaths.ko,
    "x-default": privateTourHubPaths.en,
  } as const;
}

export function getPrivateTourHubStudioPath(locale: HomegroundLocale) {
  return locale === "en" ? "/studio/" : `/${locale}/studio/`;
}
