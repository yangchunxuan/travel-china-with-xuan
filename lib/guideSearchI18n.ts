import type { HomegroundLocale } from "./homegroundI18n";

export interface GuideSearchCopy {
  readonly path: string;
  readonly navLabel: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction: string;
  readonly label: string;
  readonly placeholder: string;
  readonly action: string;
  readonly examplesLabel: string;
  readonly examples: readonly string[];
  readonly loadingSuggestions: string;
  readonly suggestionsUnavailable: string;
  readonly retrySuggestions: string;
  readonly noSuggestions: string;
  readonly emptyQueryError: string;
  readonly suggestionsLabel: (count: number) => string;
  readonly page: {
    readonly metadataTitle: string;
    readonly metadataDescription: string;
    readonly breadcrumbLabel: string;
    readonly homeLabel: string;
    readonly guidesLabel: string;
    readonly title: string;
    readonly introduction: string;
    readonly emptyQueryTitle: string;
    readonly emptyQueryBody: string;
    readonly resultTitle: (query: string) => string;
    readonly resultCount: (count: number) => string;
    readonly noResultsTitle: (query: string) => string;
    readonly noResultsBody: string;
    readonly browseTopics: string;
    readonly allGuides: string;
    readonly plannerTitle: string;
    readonly plannerBody: string;
    readonly plannerAction: string;
    readonly readGuide: string;
    readonly showMore: string;
    readonly updated: string;
  };
}

const copies: Record<HomegroundLocale, GuideSearchCopy> = {
  en: {
    path: "/guides/search/",
    navLabel: "Search guides",
    eyebrow: "China travel guides",
    title: "What would you like to know?",
    introduction:
      "Search for practical answers on where to stay, how to get around and how long to spend in each place.",
    label: "What are you looking for?",
    placeholder: "Try “Where to stay in Zhangjiajie”",
    action: "Search guides",
    examplesLabel: "Suggested searches",
    examples: [
      "Where to stay in Zhangjiajie",
      "Beijing South Station to the airport",
      "China with older parents",
    ],
    loadingSuggestions: "Finding the closest guides…",
    suggestionsUnavailable:
      "Suggestions are taking longer than expected. You can still search.",
    retrySuggestions: "Try again",
    noSuggestions: "No close match yet. Search to see all results.",
    emptyQueryError: "Tell us what you would like to know.",
    suggestionsLabel: (count) =>
      `${count} ${count === 1 ? "guide" : "guides"} you may find useful`,
    page: {
      metadataTitle: "Search China Travel Guides | Homeground",
      metadataDescription:
        "Find practical China travel guides by city, route, hotel area, transport and trip length.",
      breadcrumbLabel: "Breadcrumb",
      homeLabel: "Home",
      guidesLabel: "Travel guides",
      title: "Search China travel guides.",
      introduction:
        "Look up a city, route or travel question and find the guides most relevant to your trip.",
      emptyQueryTitle: "What would you like to know?",
      emptyQueryBody:
        "Try a city, route, hotel area, transport question or trip length.",
      resultTitle: (query) => `Guides for “${query}”`,
      resultCount: (count) =>
        `${count} matching ${count === 1 ? "guide" : "guides"}`,
      noResultsTitle: (query) => `We couldn't find a close match for “${query}”`,
      noResultsBody:
        "Try a shorter search, browse all guides or tell us what you are planning.",
      browseTopics: "Browse topics",
      allGuides: "See all guides",
      plannerTitle: "Need help with a specific trip?",
      plannerBody:
        "Share your dates, who is travelling and what matters most. We’ll help you work out the next step.",
      plannerAction: "Talk to a trip planner",
      readGuide: "Read guide",
      showMore: "Show more guides",
      updated: "Updated",
    },
  },
  zh: {
    path: "/zh/guides/search/",
    navLabel: "搜索指南",
    eyebrow: "中国旅行指南",
    title: "你想先了解什么？",
    introduction:
      "住哪里、怎么走、玩几天，或者哪种安排更适合你？直接搜索你正在考虑的问题。",
    label: "搜索旅行问题",
    placeholder: "例如“张家界住哪里”",
    action: "搜索指南",
    examplesLabel: "搜索示例",
    examples: [
      "张家界住市区还是武陵源",
      "北京南站去首都机场还是大兴机场",
      "带父母去中国怎么玩",
    ],
    loadingSuggestions: "正在为你查找…",
    suggestionsUnavailable: "建议暂时没有加载出来，你仍然可以直接搜索。",
    retrySuggestions: "重新加载",
    noSuggestions: "暂时没有相近建议，继续搜索查看结果。",
    emptyQueryError: "请输入你想了解的问题。",
    suggestionsLabel: (count) => `这 ${count} 篇指南可能对你有帮助`,
    page: {
      metadataTitle: "搜索中国旅行指南｜Homeground",
      metadataDescription:
        "按城市、路线、住宿区域、交通方式和行程天数，查找实用的中国旅行指南。",
      breadcrumbLabel: "当前位置",
      homeLabel: "首页",
      guidesLabel: "旅行指南",
      title: "搜索中国旅行指南。",
      introduction:
        "输入城市、路线或旅行问题，找到与你这趟旅行最相关的内容。",
      emptyQueryTitle: "你想先了解什么？",
      emptyQueryBody:
        "可以从城市、路线、住宿区域、交通方式或行程天数开始。",
      resultTitle: (query) => `关于“${query}”的指南`,
      resultCount: (count) => `找到 ${count} 篇相关指南`,
      noResultsTitle: (query) => `暂时没有找到“${query}”的合适结果`,
      noResultsBody:
        "换一个更简短的说法试试，也可以浏览全部指南；如果情况比较具体，直接告诉我们。",
      browseTopics: "浏览主题",
      allGuides: "查看全部指南",
      plannerTitle: "问题比较具体？",
      plannerBody:
        "告诉我们日期、同行人和你最在意的事情，我们可以一起看看下一步怎么安排。",
      plannerAction: "和旅行规划师聊聊",
      readGuide: "阅读指南",
      showMore: "查看更多指南",
      updated: "更新于",
    },
  },
  ko: {
    path: "/ko/guides/search/",
    navLabel: "가이드 검색",
    eyebrow: "중국 여행 가이드",
    title: "무엇이 궁금하신가요?",
    introduction:
      "어디에 머물지, 어떻게 이동할지, 며칠이 적당할지 궁금하신가요? 지금 고민 중인 내용을 검색해 보세요.",
    label: "궁금한 여행 정보를 검색하세요",
    placeholder: "예: ‘장자제 숙소는 어디가 좋을까?’",
    action: "가이드 검색",
    examplesLabel: "추천 검색어",
    examples: [
      "장자제 시내와 우링위안 중 어디에 머물까",
      "베이징남역에서 서우두공항 또는 다싱공항까지",
      "부모님과 중국 여행 일정",
    ],
    loadingSuggestions: "관련 가이드를 찾고 있습니다…",
    suggestionsUnavailable:
      "추천을 불러오는 데 시간이 걸리고 있습니다. 바로 검색할 수 있습니다.",
    retrySuggestions: "다시 불러오기",
    noSuggestions:
      "관련 가이드를 아직 찾지 못했습니다. 검색어를 바꾸거나 그대로 검색해 보세요.",
    emptyQueryError: "궁금한 여행 정보를 입력해 주세요.",
    suggestionsLabel: (count) => `도움이 될 만한 가이드 ${count}개`,
    page: {
      metadataTitle: "중국 여행 가이드 검색 | Homeground",
      metadataDescription:
        "도시, 이동 경로, 숙소 지역, 교통편과 여행 일수로 실용적인 중국 여행 가이드를 찾아보세요.",
      breadcrumbLabel: "현재 위치",
      homeLabel: "홈",
      guidesLabel: "여행 가이드",
      title: "중국 여행 가이드 검색",
      introduction:
        "도시, 이동 경로 또는 여행 질문을 입력하고 내 여행에 맞는 가이드를 찾아보세요.",
      emptyQueryTitle: "무엇이 궁금하신가요?",
      emptyQueryBody:
        "도시, 이동 경로, 숙소 지역, 교통편 또는 여행 일수부터 검색해 보세요.",
      resultTitle: (query) => `‘${query}’ 관련 가이드`,
      resultCount: (count) => `관련 가이드 ${count}개`,
      noResultsTitle: (query) => `‘${query}’에 맞는 결과를 찾지 못했습니다`,
      noResultsBody:
        "검색어를 짧게 바꾸거나 전체 가이드를 둘러보세요. 일정이 구체적이라면 저희에게 바로 알려 주세요.",
      browseTopics: "주제 둘러보기",
      allGuides: "전체 가이드 보기",
      plannerTitle: "조금 더 구체적인 도움이 필요하신가요?",
      plannerBody:
        "여행 날짜, 동행자와 가장 중요한 점을 알려 주세요. 다음 단계를 함께 정리해 드리겠습니다.",
      plannerAction: "여행 플래너와 상담하기",
      readGuide: "가이드 읽기",
      showMore: "가이드 더 보기",
      updated: "업데이트",
    },
  },
};

export function getGuideSearchCopy(locale: HomegroundLocale) {
  return copies[locale];
}

export function getGuideSearchLanguagePaths() {
  return {
    en: copies.en.path,
    ko: copies.ko.path,
    "zh-Hans": copies.zh.path,
    "x-default": copies.en.path,
  } as const;
}

export function getGuideSearchIndexPath(locale: HomegroundLocale) {
  return locale === "en"
    ? "/guides/guide-search-index.json"
    : `/${locale}/guides/guide-search-index.json`;
}
