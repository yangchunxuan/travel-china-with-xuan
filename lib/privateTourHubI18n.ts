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
      title: "Private China Tours: Compare Itineraries & Prices",
      description: (count: number) =>
        `Compare ${count} private China tours, USD prices and guide options. Plan your arrival from Malaysia, Singapore, Australia or elsewhere.`,
      openGraphTitle: (count: number) =>
        `Private China Tours — ${count} Itineraries & Starting Prices`,
    },
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Private tours",
    eyebrow: (count: number) => `${count} private China tours`,
    title: "Private China tours, planned around you.",
    introduction:
      "Compare day-by-day itineraries, starting prices and what each private tour includes. Start with a published route, then ask us to confirm it for your dates and group.",
    heroAction: (count: number) => `Compare all ${count} routes`,
    quickCompareEyebrow: (count: number) => `${count}-route overview`,
    quickCompareTitle: "Find the journey that feels like yours.",
    quickCompareIntroduction:
      "Compare trip length, starting price, pace and the places each route brings together.",
    priceBasisNote:
      "Prices in US dollars · per person for 2 travellers · international flights excluded. Open each route for room arrangements and guide options.",
    quickFitLabel: "Best for",
    quickMovementLabel: "Stay and travel pattern",
    quickAction: "View journey",
    catalogEyebrow: "Explore every route",
    catalogTitle: (count: number) => `${count} ways to experience China.`,
    catalogIntroduction: (count: number) =>
      `Open any of the ${count} journeys to see the daily route, inclusions and price options.`,
    tourCount: (count: number) => `${count} published private tours`,
    duration: (days: number, nights: number) => `${days} days · ${nights} nights`,
    startingPriceLabel: "Published starting price",
    perPersonLabel: "per person",
    groupBasis: (travelers: number) => `based on ${travelers} travellers`,
    paceLabel: "Pace and bases",
    fitLabel: "Best fit",
    highlightsLabel: "Core experiences",
    viewLabel: "View the full private tour",
    finalEyebrow: "Have a route in mind?",
    finalTitle: "When are you travelling, and where do you want to go?",
    finalBody:
      "Tell us your dates, group size and the route you like. We will confirm possible changes and a written quote; fixed-route packages keep their stated scope.",
    finalAction: "Plan this trip with us",
  },
  zh: {
    htmlLang: "zh-Hans",
    path: privateTourHubPaths.zh,
    metadata: {
      title: "中国私家团：行程、价格与包含项",
      description: (count: number) =>
        `比较 Homeground ${count} 条中国私家团的每日行程、公开起价、包含项和旅行节奏。先选接近需求的路线，再确认日期、服务版本和可调整的安排。`,
      openGraphTitle: (count: number) =>
        `中国私家团｜${count} 条行程与公开起价`,
    },
    breadcrumbLabel: "面包屑导航",
    breadcrumbHome: "首页",
    breadcrumbCurrent: "私家团",
    eyebrow: (count: number) => `${count} 条中国私家路线`,
    title: "比较适合你的中国私家团。",
    introduction:
      "按每日安排、公开起价、包含项和旅行节奏比较路线，再按你的日期与同行人数确认方案。",
    heroAction: (count: number) => `比较全部 ${count} 条路线`,
    quickCompareEyebrow: (count: number) => `${count} 条路线总览`,
    quickCompareTitle: "先找到最像你想走的那一条。",
    quickCompareIntroduction:
      "比较天数、起价、节奏，以及每条路线真正连接的地方。",
    priceBasisNote:
      "以下为人民币每人起价，按 2 人同行，不含国际机票。房型安排和导游服务以各路线说明为准。",
    quickFitLabel: "更适合",
    quickMovementLabel: "住宿与换城",
    quickAction: "查看路线",
    catalogEyebrow: "走进每条路线",
    catalogTitle: (count: number) => `${count} 种走进中国的方式。`,
    catalogIntroduction: (count: number) =>
      `打开任意一条路线，就能查看每日安排、包含项和价格选择；这里共有 ${count} 条。`,
    tourCount: (count: number) => `${count} 条已发布私家团`,
    duration: (days: number, nights: number) => `${days} 天 · ${nights} 晚`,
    startingPriceLabel: "公开起价",
    perPersonLabel: "每人",
    groupBasis: (travelers: number) => `按 ${travelers} 人同行`,
    paceLabel: "节奏与住宿地",
    fitLabel: "更适合谁",
    highlightsLabel: "核心体验",
    viewLabel: "查看完整私家团",
    finalEyebrow: "已经有接近的路线？",
    finalTitle: "哪天出发，想去哪里？",
    finalBody:
      "告诉我们日期、同行人数和喜欢的路线。我们会确认哪些安排可以调整，并给出书面报价；固定路线套餐按页面写明的范围执行。",
    finalAction: "和我们一起规划",
  },
  ko: {
    htmlLang: "ko",
    path: privateTourHubPaths.ko,
    metadata: {
      title: "중국 프라이빗 투어: 일정·가격·포함 사항 비교",
      description: (count: number) =>
        `중국 프라이빗 투어 ${count}개의 일별 일정, 시작가, 포함 사항과 여행 속도를 비교하세요. 마음에 드는 코스를 고른 뒤 날짜, 서비스 유형과 조정 가능한 내용을 확인합니다.`,
      openGraphTitle: (count: number) =>
        `중국 프라이빗 투어 ${count}개 일정·시작가 비교`,
    },
    breadcrumbLabel: "현재 위치",
    breadcrumbHome: "홈",
    breadcrumbCurrent: "프라이빗 투어",
    eyebrow: (count: number) => `중국 프라이빗 투어 ${count}개`,
    title: "나에게 맞는 중국 프라이빗 투어.",
    introduction:
      "일별 일정, 시작가, 포함 사항과 여행 속도를 비교한 뒤, 원하는 날짜와 인원에 맞는 계획을 확인하세요.",
    heroAction: (count: number) => `${count}개 여정 모두 비교하기`,
    quickCompareEyebrow: (count: number) => `${count}개 여행 한눈에 보기`,
    quickCompareTitle: "나에게 맞는 여정을 찾아보세요.",
    quickCompareIntroduction:
      "기간, 시작가, 일정 여유도와 각 여정에 포함된 지역을 비교하세요.",
    priceBasisNote:
      "표시 가격은 2인 여행 기준 1인당 원화 시작가이며 국제선 항공권은 제외됩니다. 객실 구성과 가이드 옵션은 각 일정에서 확인하세요.",
    quickFitLabel: "추천 여행자",
    quickMovementLabel: "숙박지와 이동 방식",
    quickAction: "이 일정 보기",
    catalogEyebrow: "모든 여정 살펴보기",
    catalogTitle: (count: number) =>
      `중국을 만나는 ${count}가지 방법.`,
    catalogIntroduction: (count: number) =>
      `${count}개 여정 중 하나를 열어 일자별 일정, 포함 사항과 요금 옵션을 확인하세요.`,
    tourCount: (count: number) => `프라이빗 투어 ${count}개`,
    duration: (days: number, nights: number) => `${nights}박 ${days}일`,
    startingPriceLabel: "시작가",
    perPersonLabel: "1인",
    groupBasis: (travelers: number) => `${travelers}인 기준`,
    paceLabel: "숙박지와 일정 여유도",
    fitLabel: "추천 여행자",
    highlightsLabel: "핵심 경험",
    viewLabel: "이 프라이빗 투어 자세히 보기",
    finalEyebrow: "마음에 드는 여정이 있나요?",
    finalTitle: "언제 떠나고, 어디로 가고 싶으신가요?",
    finalBody:
      "날짜, 인원과 마음에 드는 코스를 알려 주세요. 조정 가능한 내용을 확인한 뒤 서면 견적을 드립니다. 고정 코스 상품은 페이지에 안내된 범위로 진행합니다.",
    finalAction: "함께 여행 계획하기",
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
  title: "Starting from Malaysia, Singapore or Australia?",
  introduction:
    "Choose your route in China first, then check how your arrival and departure fit. You can plan with us in English wherever you are travelling from.",
  questions: [
    {
      title: "Does the price include my flights?",
      body: "International flights are not included. Send your departure city and any flights you are considering; we will confirm the meeting point, arrival transfer and first day in your written quote before you book.",
    },
    {
      title: "Which currency and room basis should I compare?",
      body: "The prices above are in US dollars, not Singapore or Australian dollars. Starting prices are per person for two travellers. Check each route’s accommodation and room basis; children, extra rooms and different group sizes need their own quote.",
    },
    {
      title: "Will I have an English-speaking guide?",
      body: "Check the named service option and guided days on each route. Beijing offers English-guided and no-onsite-guide options. For the classic Zhangjiajie tour, guide language and any language-related price difference are confirmed in your quote.",
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
    "x-default": privateTourHubPaths.en,
  } as const;
}

export function getPrivateTourHubPlannerPath(locale: HomegroundLocale) {
  return `${locale === "en" ? "/" : `/${locale}/`}#planner-contact`;
}
