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
      title: "Private China Tours & Small Groups: Prices",
      description: (count: number) =>
        `Compare ${count} private and small-group China routes, published starting prices, group-size terms and guide options. Choose a route, then confirm it for your dates.`,
      openGraphTitle: (count: number) =>
        `China Tours — ${count} Routes & Starting Prices`,
    },
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "China tours",
    eyebrow: (count: number) => `${count} China tour routes`,
    title: "Private China tours and small groups.",
    introduction:
      "Compare day-by-day itineraries, starting prices and what each route includes. Private tours are for your party; routes marked small group have fixed departures shared with other guests.",
    heroAction: (count: number) => `Compare all ${count} routes`,
    quickCompareEyebrow: (count: number) => `${count}-route overview`,
    quickCompareTitle: "Find the journey that feels like yours.",
    quickCompareIntroduction:
      "Compare trip length, starting price, pace and the places each route brings together.",
    priceBasisNote:
      "Prices are per person, for the group size on each card, flights not included. Budget lower than the card? Ask anyway: a trip planned to your number can use different hotels or fewer guided days.",
    quickFitLabel: "Best for",
    quickMovementLabel: "Stay and travel pattern",
    quickAction: "View journey",
    catalogEyebrow: "Explore every route",
    catalogTitle: (count: number) => `${count} ways to experience China.`,
    catalogIntroduction: (count: number) =>
      `Open any of the ${count} journeys to see the daily route, inclusions and price options.`,
    tourCount: (count: number) => `${count} published routes`,
    duration: (days: number, nights: number) => `${days} days · ${nights} nights`,
    startingPriceLabel: "Published starting price",
    quoteOnlyLabel: "Price on request",
    quoteOnlyBody: "Confirmed for your dates, rooms and group size",
    perPersonLabel: "per person",
    groupBasis: (travelers: number) => `based on ${travelers} travellers`,
    twinShareBasis: "sharing a twin room",
    partySize: (travelers: number) => `${travelers} travellers`,
    perPersonPriceNote: "per person",
    paceLabel: "Pace and bases",
    fitLabel: "Best fit",
    highlightsLabel: "Core experiences",
    viewLabel: "View the full route",
    finalEyebrow: "Have a route in mind?",
    finalTitle: "When are you travelling, and where do you want to go?",
    finalBody:
      "Send your dates, group size and the route you like. A planner checks it for your dates and replies within 12 hours with the exact total in writing. Free, and nothing is booked until you say yes.",
    finalAction: "Check my dates with a planner",
    statsRoutes: "published routes",
    statsRegions: "regions with routes",
    statsLengths: "days per route",
    statsShopping: "shopping stops, on every route",
    filterGroupLabel: "Filter routes",
    filterRegionLabel: "Region",
    filterLengthLabel: "Trip length",
    filterPriceLabel: "Starting price (approx. USD)",
    filterAll: "All",
    filterReset: "Clear filters",
    filterCount: "Showing {shown} of {total} routes",
    filterEmpty: "No routes match these filters. Clear a filter to see more.",
  },
  zh: {
    htmlLang: "zh-Hans",
    path: privateTourHubPaths.zh,
    metadata: {
      title: "中国私家团与小团：行程及价格",
      description: (count: number) =>
        `比较 Homeground ${count} 条中国私家团与小团路线的每日行程、公开起价、包含项和旅行节奏，再确认日期与服务范围。`,
      openGraphTitle: (count: number) =>
        `中国旅行｜${count} 条私家与小团路线`,
    },
    breadcrumbLabel: "面包屑导航",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "中国路线",
    eyebrow: (count: number) => `${count} 条中国旅行路线`,
    title: "比较中国私家团与固定日期小团。",
    introduction:
      "按每日安排、公开起价和旅行节奏比较路线。私家团只服务你和同行者；标明“小团”的路线按固定日期与其他客人同行。",
    heroAction: (count: number) => `比较全部 ${count} 条路线`,
    quickCompareEyebrow: (count: number) => `${count} 条路线总览`,
    quickCompareTitle: "先找到最像你想走的那一条。",
    quickCompareIntroduction:
      "比较天数、起价、节奏，以及每条路线真正连接的地方。",
    priceBasisNote:
      "价格按每人计，人数以每张卡片写的为准，不含国际机票。预算比卡片低？也可以问：按你的预算安排，可以换酒店，或减少带导游的天数。",
    quickFitLabel: "更适合",
    quickMovementLabel: "住宿与换城",
    quickAction: "查看路线",
    catalogEyebrow: "走进每条路线",
    catalogTitle: (count: number) => `${count} 种走进中国的方式。`,
    catalogIntroduction: (count: number) =>
      `打开任意一条路线，就能查看每日安排、包含项和价格选择；这里共有 ${count} 条。`,
    tourCount: (count: number) => `${count} 条已发布路线`,
    duration: (days: number, nights: number) => `${days} 天 · ${nights} 晚`,
    startingPriceLabel: "公开起价",
    quoteOnlyLabel: "按需报价",
    quoteOnlyBody: "按日期、房间和同行人数确认",
    perPersonLabel: "每人",
    groupBasis: (travelers: number) => `按 ${travelers} 人同行`,
    twinShareBasis: "双人同住",
    partySize: (travelers: number) => `${travelers} 人`,
    perPersonPriceNote: "每人价格",
    paceLabel: "节奏与住宿地",
    fitLabel: "更适合谁",
    highlightsLabel: "核心体验",
    viewLabel: "查看完整路线",
    finalEyebrow: "已经有接近的路线？",
    finalTitle: "哪天出发，想去哪里？",
    finalBody:
      "告诉我们日期、同行人数和喜欢的路线。规划师按你的日期核对，12 小时内回复，并书面写清总价。咨询免费，你确认之前什么都不会预订。",
    finalAction: "按我的日期查价",
    statsRoutes: "已发布路线",
    statsRegions: "覆盖地区",
    statsLengths: "天数范围",
    statsShopping: "购物店，每条路线都一样",
    filterGroupLabel: "筛选路线",
    filterRegionLabel: "地区",
    filterLengthLabel: "天数",
    filterPriceLabel: "起价（约合人民币）",
    filterAll: "全部",
    filterReset: "清除筛选",
    filterCount: "显示 {shown} / {total} 条路线",
    filterEmpty: "没有符合条件的路线，请调整筛选。",
  },
  ko: {
    htmlLang: "ko",
    path: privateTourHubPaths.ko,
    metadata: {
      title: "중국 프라이빗 투어·소규모 그룹: 일정과 가격",
      description: (count: number) =>
        `중국 프라이빗·소규모 그룹 일정 ${count}개의 일별 계획, 시작가, 포함 사항과 여행 속도를 비교하세요.`,
      openGraphTitle: (count: number) =>
        `중국 여행 ${count}개 일정·시작가 비교`,
    },
    breadcrumbLabel: "현재 위치",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "중국 여행",
    eyebrow: (count: number) => `중국 여행 일정 ${count}개`,
    title: "중국 프라이빗 투어와 정기 소규모 그룹.",
    introduction:
      "일별 일정, 시작가와 여행 속도를 비교하세요. 프라이빗 투어는 예약한 일행만 이용하고, ‘소규모 그룹’ 일정은 정해진 날짜에 다른 고객과 함께 출발합니다.",
    heroAction: (count: number) => `${count}개 여정 모두 비교하기`,
    quickCompareEyebrow: (count: number) => `${count}개 여행 한눈에 보기`,
    quickCompareTitle: "나에게 맞는 여정을 찾아보세요.",
    quickCompareIntroduction:
      "기간, 시작가, 일정 여유도와 각 여정에 포함된 지역을 비교하세요.",
    priceBasisNote:
      "가격은 1인 기준이며 카드에 표시된 인원 기준, 국제선 항공권은 별도입니다. 예산이 카드보다 낮아도 문의해 주세요. 예산에 맞춰 숙소를 바꾸거나 가이드 동행 일수를 줄여 일정을 짤 수 있습니다.",
    quickFitLabel: "추천 여행자",
    quickMovementLabel: "숙박지와 이동 방식",
    quickAction: "이 일정 보기",
    catalogEyebrow: "모든 여정 살펴보기",
    catalogTitle: (count: number) =>
      `중국을 만나는 ${count}가지 방법.`,
    catalogIntroduction: (count: number) =>
      `${count}개 여정 중 하나를 열어 일자별 일정, 포함 사항과 요금 옵션을 확인하세요.`,
    tourCount: (count: number) => `공개 일정 ${count}개`,
    duration: (days: number, nights: number) => `${nights}박 ${days}일`,
    startingPriceLabel: "시작가",
    quoteOnlyLabel: "견적 문의",
    quoteOnlyBody: "날짜, 객실과 인원에 맞춰 확인",
    perPersonLabel: "1인",
    groupBasis: (travelers: number) => `${travelers}인 기준`,
    twinShareBasis: "2인 1실 기준",
    partySize: (travelers: number) => `${travelers}인`,
    perPersonPriceNote: "1인 요금",
    paceLabel: "숙박지와 일정 여유도",
    fitLabel: "추천 여행자",
    highlightsLabel: "핵심 경험",
    viewLabel: "이 일정 자세히 보기",
    finalEyebrow: "마음에 드는 여정이 있나요?",
    finalTitle: "언제 떠나고, 어디로 가고 싶으신가요?",
    finalBody:
      "날짜, 인원과 마음에 드는 코스를 알려 주세요. 플래너가 날짜에 맞춰 확인하고 12시간 안에 정확한 총액을 서면으로 안내합니다. 문의는 무료이며, 확정하시기 전에는 아무것도 예약되지 않습니다.",
    finalAction: "내 날짜로 요금 확인하기",
    statsRoutes: "공개 일정",
    statsRegions: "여행 가능 지역",
    statsLengths: "일정 길이",
    statsShopping: "쇼핑 방문, 모든 일정 동일",
    filterGroupLabel: "일정 필터",
    filterRegionLabel: "지역",
    filterLengthLabel: "기간",
    filterPriceLabel: "시작가 (원화 환산)",
    filterAll: "전체",
    filterReset: "필터 지우기",
    filterCount: "{total}개 중 {shown}개 표시",
    filterEmpty: "조건에 맞는 일정이 없습니다. 필터를 조정해 주세요.",
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
    heroAction: localized.heroAction(publishedTourCount),
    quickCompareEyebrow:
      localized.quickCompareEyebrow(publishedTourCount),
    catalogTitle: localized.catalogTitle(publishedTourCount),
    catalogIntroduction:
      localized.catalogIntroduction(publishedTourCount),
  };
}

export type PrivateTourHubCopy = ReturnType<typeof getPrivateTourHubCopy>;

export const englishMarketPlanning = {
  eyebrow: "Before you book",
  title: "Looking for a private China tour package from Singapore, Malaysia or Australia?",
  introduction:
    "Homeground arranges private land journeys beginning in China. Choose a published route first; before you book, we confirm its meeting point and transfer scope in writing for your dates and group.",
  questions: [
    {
      title: "Where does the package begin?",
      body: "International flights are excluded. Send your departure city and any flights you are considering; we will confirm the meeting point, arrival transfer and first day in writing before you book.",
    },
    {
      title: "Which currency and room basis should I compare?",
      body: "Cards show prices in USD. Most are converted from the route’s CNY price basis; a few routes publish a fixed USD price. Your written quote confirms the payment currency, exchange rate and total. Compare the group-size basis shown beside each price rather than treating every route as a two-person package. Children, extra rooms and different group sizes need their own quote.",
    },
    {
      title: "Will I have an English-speaking guide?",
      body: "Check the named service option and guided days on each route. Beijing offers English-guided and no-onsite-guide options. The Classic Zhangjiajie four-day tour includes an English-speaking guide on Days 2 and 3; Day 4 English guide service is outside its base price. Other Zhangjiajie routes follow their published guide coverage.",
    },
    {
      title: "Can we travel with children or older family members?",
      body: "Tell us children’s ages, walking comfort, stairs you want to avoid and room preferences. We will check which route fits your group and what can change. Fixed routes keep their published attractions and transport arrangements.",
    },
  ],
  preparationLabel: "Useful before choosing flights",
  links: [
    { href: "/guides/zhangjiajie-from-malaysia/", label: "Planning Zhangjiajie from Malaysia" },
    { href: "/guides/do-singaporeans-need-visa-china/", label: "China entry guidance for Singaporeans" },
    { href: "/guides/china-entry-requirements/", label: "Check entry requirements for your passport" },
  ],
} as const;

export function getPrivateTourHubLanguagePaths() {
  return {
    en: privateTourHubPaths.en,
    "zh-Hans": privateTourHubPaths.zh,
    ko: privateTourHubPaths.ko,
    ja: "/ja/tours/",
    es: "/es/tours/",
    fr: "/fr/tours/",
    de: "/de/tours/",
    ar: "/ar/tours/",
    "x-default": privateTourHubPaths.en,
  } as const;
}

export function getPrivateTourHubPlannerPath(locale: HomegroundLocale) {
  return `${locale === "en" ? "/" : `/${locale}/`}#planner-contact`;
}
