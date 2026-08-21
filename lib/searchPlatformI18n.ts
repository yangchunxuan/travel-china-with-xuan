import type { HomegroundLocale } from "./homegroundI18n";

export const searchSectionIds = [
  "explore",
  "plan",
  "transport",
  "when-to-go",
  "stay",
  "essentials",
  "culture",
  "tools",
  "services",
] as const;

export type SearchSectionId = (typeof searchSectionIds)[number];

export interface SearchSectionCopy {
  navLabel: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  scopeTitle: string;
  scope: readonly string[];
}

export interface SearchPlatformCopy {
  indexLabel: string;
  indexTitle: string;
  indexIntroduction: string;
  languageLabel: string;
  browseLabel: string;
  currentSectionLabel: string;
  collectionTitle: string;
  collectionIntroduction: string;
  emptyTitle: string;
  emptyBody: string;
  openGuideLabel: string;
  updatedLabel: string;
  nextTitle: string;
  nextBody: string;
  guidesLabel: string;
  tripBriefLabel: string;
  sections: Record<SearchSectionId, SearchSectionCopy>;
}

const copies: Record<HomegroundLocale, SearchPlatformCopy> = {
  en: {
    indexLabel: "Homeground China index",
    indexTitle: "China, organized around the question you actually have.",
    indexIntroduction:
      "Move from a place to the route that reaches it, the season that changes it, and the practical task that makes the trip work. Each section is part of one connected China reference.",
    languageLabel: "Change language",
    browseLabel: "Browse the China index",
    currentSectionLabel: "Current section",
    collectionTitle: "Start with a real planning question",
    collectionIntroduction:
      "These published guides already belong to this section. New pages will join the same structure instead of being added to one long, flat article list.",
    emptyTitle: "The structure is ready; publication comes after review.",
    emptyBody:
      "This section is being populated from verified source packs. Empty combinations are not published merely to create more URLs.",
    openGuideLabel: "Open guide",
    updatedLabel: "Updated",
    nextTitle: "Need a person to connect the pieces?",
    nextBody:
      "Share your dates, party size and rough budget. Homeground will help decide what should be self-planned and what is worth arranging locally.",
    guidesLabel: "See all travel guides",
    tripBriefLabel: "Start a trip brief",
    sections: {
      explore: {
        navLabel: "Explore China",
        shortLabel: "Places",
        eyebrow: "Regions · cities · attractions",
        title: "Understand the places before choosing the route.",
        description:
          "A connected map of Chinese regions, cities, neighbourhoods, landscapes, heritage sites and visitor experiences.",
        scopeTitle: "This section will connect",
        scope: ["Regions and provinces", "Cities and neighbourhoods", "Attractions, nature and heritage"],
      },
      plan: {
        navLabel: "First Trip to China Planner",
        shortLabel: "First trip",
        eyebrow: "Entry · route · bookings",
        title: "First Trip to China Planner: build it in the right order.",
        description:
          "An informational first-trip planner connecting entry, payments, connectivity, cities, route shape, transport, stays, tickets and travel-day buffers to their existing Homeground guides.",
        scopeTitle: "Plan in this order",
        scope: ["Entry, payments and connectivity", "Cities, nights and route shape", "Transport, stays, tickets and buffers"],
      },
      transport: {
        navLabel: "Getting Around",
        shortLabel: "Transport",
        eyebrow: "Airports · stations · city pairs",
        title: "See the whole transfer, not only the time on the train.",
        description:
          "Airports, railway stations, city-to-city routes and last-mile transfers explained as complete travel days.",
        scopeTitle: "This section will connect",
        scope: ["Railway and airport hubs", "City-to-city route choices", "Station, hotel and attraction transfers"],
      },
      "when-to-go": {
        navLabel: "When to Go",
        shortLabel: "Timing",
        eyebrow: "Months · seasons · events",
        title: "Choose timing by what actually changes the trip.",
        description:
          "Weather, crowds, scenery, holidays and seasonal events—split into pages only when the timing changes a real decision.",
        scopeTitle: "This section will connect",
        scope: ["Months and seasonal conditions", "Public holidays and crowd pressure", "Festivals, flowers, snow and water levels"],
      },
      stay: {
        navLabel: "Where to Stay",
        shortLabel: "Stay",
        eyebrow: "Areas · hotel types · practical fit",
        title: "Choose the right base before choosing the room.",
        description:
          "City areas, scenic-zone bases, hotel types and practical checks for travellers using international passports.",
        scopeTitle: "This section will connect",
        scope: ["Where to stay in each city", "Hotels, guesthouses and scenic bases", "Location, access and foreign-guest checks"],
      },
      essentials: {
        navLabel: "China Essentials",
        shortLabel: "Essentials",
        eyebrow: "Entry · payments · connectivity",
        title: "Solve the practical China questions before they become lost hours.",
        description:
          "Entry rules, payments, mobile connectivity, booking systems and on-the-road problem solving for international travellers.",
        scopeTitle: "This section will connect",
        scope: ["Entry and transit rules", "Payments, apps, SIM and internet", "Booking, registration and in-trip recovery"],
      },
      culture: {
        navLabel: "Food & Culture",
        shortLabel: "Culture",
        eyebrow: "History · food · contemporary life",
        title: "Understand the China behind the places.",
        description:
          "History, people, festivals, food, belief, language, art and contemporary life connected back to places travellers can encounter.",
        scopeTitle: "This section will connect",
        scope: ["History, people and ideas", "Regional cuisines and dishes", "Festivals, arts and contemporary China"],
      },
      tools: {
        navLabel: "Tools",
        shortLabel: "Tools",
        eyebrow: "Calculators · selectors · reference",
        title: "Use the answer instead of reading around it.",
        description:
          "Focused tools for comparing travel time, choosing a hotel base, checking route pressure and completing practical trip tasks.",
        scopeTitle: "This section will connect",
        scope: ["Route and timing checks", "Area and option selectors", "Maps, calculators and structured reference"],
      },
      services: {
        navLabel: "Travel Services",
        shortLabel: "Services",
        eyebrow: "Guides · transfers · trip support",
        title: "Bring in local help where it changes the journey.",
        description:
          "Clear entry points for private guides, transfers, hotel selection, route design and whole-trip support—matched after the trip brief is understood.",
        scopeTitle: "This section will connect",
        scope: ["Private guides and local experiences", "Transfers, hotels and booking support", "Route design and whole-trip coordination"],
      },
    },
  },
  zh: {
    indexLabel: "Homeground 中国索引",
    indexTitle: "按你真正会问的问题，重新整理中国。",
    indexIntroduction:
      "从一个地方继续找到抵达路线、旅行季节与实际操作。每个栏目都属于同一张相互连接的中国旅行与文化信息网络。",
    languageLabel: "切换语言",
    browseLabel: "浏览中国索引",
    currentSectionLabel: "当前栏目",
    collectionTitle: "先从一个真实的旅行问题开始",
    collectionIntroduction:
      "这些已发布指南已经归入当前栏目。后续页面会进入同一套结构，不再全部放在一张越来越长的文章列表里。",
    emptyTitle: "结构已经建好，内容通过审核后才会发布。",
    emptyBody:
      "这个栏目正在依据可核验的资料逐步补齐。我们不会为了增加网址数量而发布空页面或换词模板。",
    openGuideLabel: "打开指南",
    updatedLabel: "更新于",
    nextTitle: "需要真人把这些环节连起来？",
    nextBody:
      "告诉我们日期、同行人数和大致预算。Homeground 会先判断哪些适合自己安排，哪些环节值得在当地处理。",
    guidesLabel: "查看全部旅行指南",
    tripBriefLabel: "提交旅行简报",
    sections: {
      explore: {
        navLabel: "探索中国",
        shortLabel: "目的地",
        eyebrow: "地区 · 城市 · 景点",
        title: "先理解目的地，再决定路线。",
        description: "把中国的地区、城市、街区、自然景观、文化遗产与现场体验连接起来。",
        scopeTitle: "本栏目将连接",
        scope: ["地区与省份", "城市、街区与古镇", "景点、自然与文化遗产"],
      },
      plan: {
        navLabel: "第一次中国旅行规划",
        shortLabel: "第一次旅行",
        eyebrow: "入境 · 路线 · 预订",
        title: "第一次去中国：按正确顺序规划行程。",
        description: "从入境、支付、网络、城市、路线结构、交通和住宿，到门票与转场缓冲，按顺序进入已经负责该问题的 Homeground 指南。",
        scopeTitle: "按这个顺序规划",
        scope: ["入境、支付与网络", "城市、晚数与路线结构", "交通、住宿、门票与缓冲"],
      },
      transport: {
        navLabel: "中国交通",
        shortLabel: "交通",
        eyebrow: "机场 · 车站 · 城市对",
        title: "看完整转场，不只看列车运行时间。",
        description: "把机场、火车站、城市之间与最后一段接驳，解释成真实占用时间的旅行日。",
        scopeTitle: "本栏目将连接",
        scope: ["机场与铁路枢纽", "城市之间的交通选择", "车站、酒店与景区接驳"],
      },
      "when-to-go": {
        navLabel: "何时出发",
        shortLabel: "旅行时间",
        eyebrow: "月份 · 季节 · 节庆",
        title: "只在时间真正改变旅行时，单独解释它。",
        description: "比较天气、人流、景观、假期与季节活动，帮助你判断什么时候更适合自己的旅行。",
        scopeTitle: "本栏目将连接",
        scope: ["月份与季节条件", "公共假期与拥挤程度", "节庆、花期、雪季与水位"],
      },
      stay: {
        navLabel: "住在哪里",
        shortLabel: "住宿",
        eyebrow: "区域 · 房型 · 实际适配",
        title: "先选住宿基地，再选房间。",
        description: "比较城市区域、景区住宿基地、酒店与民宿类型，以及持外国护照入住时要核实的细节。",
        scopeTitle: "本栏目将连接",
        scope: ["不同城市住在哪个区域", "酒店、民宿与景区住宿", "位置、交通与外宾入住核实"],
      },
      essentials: {
        navLabel: "中国实用指南",
        shortLabel: "实用信息",
        eyebrow: "入境 · 支付 · 通信",
        title: "别让小问题变成几小时的麻烦。",
        description: "为国际旅客整理入境、支付、网络、订票系统和旅行途中会遇到的实际问题。",
        scopeTitle: "本栏目将连接",
        scope: ["入境与过境规定", "支付、App、SIM 与网络", "预约、登记与途中问题处理"],
      },
      culture: {
        navLabel: "饮食与文化",
        shortLabel: "文化",
        eyebrow: "历史 · 饮食 · 当代生活",
        title: "理解景点背后的中国。",
        description: "把历史、人物、节日、饮食、信仰、语言、艺术和当代生活连接回你能亲自抵达的地方。",
        scopeTitle: "本栏目将连接",
        scope: ["历史、人物与思想", "地方菜系与饮食", "节日、艺术与当代中国"],
      },
      tools: {
        navLabel: "旅行工具",
        shortLabel: "工具",
        eyebrow: "计算 · 选择 · 查询",
        title: "直接使用答案，而不是绕着问题阅读。",
        description: "用清晰工具比较转场时间、选择住宿基地、检查路线压力，并完成具体旅行任务。",
        scopeTitle: "本栏目将连接",
        scope: ["路线与时间检查", "区域与选项选择器", "地图、计算器与结构化资料"],
      },
      services: {
        navLabel: "旅行协助",
        shortLabel: "服务",
        eyebrow: "导游 · 接送 · 全程支持",
        title: "只在真正改变旅行体验的地方加入本地协助。",
        description: "私人导游、接送、住宿筛选、路线设计与全程支持会在了解旅行简报后再进行匹配。",
        scopeTitle: "本栏目将连接",
        scope: ["私人导游与本地体验", "接送、住宿与预订协助", "路线设计与全程协调"],
      },
    },
  },
  ko: {
    indexLabel: "Homeground 중국 안내",
    indexTitle: "실제 여행자가 묻는 질문으로 중국을 다시 정리했습니다.",
    indexIntroduction:
      "한 장소에서 이동 경로, 계절, 실제 준비 과정까지 이어서 살펴보세요. 모든 섹션은 서로 연결된 하나의 중국 여행·문화 정보망입니다.",
    languageLabel: "언어 변경",
    browseLabel: "중국 안내 둘러보기",
    currentSectionLabel: "현재 섹션",
    collectionTitle: "실제 여행 질문에서 시작하세요",
    collectionIntroduction:
      "이미 공개된 가이드를 이 섹션에 연결했습니다. 앞으로의 페이지도 끝없이 긴 글 목록이 아니라 같은 구조 안에 들어갑니다.",
    emptyTitle: "구조는 준비됐고, 콘텐츠는 검토 후 공개됩니다.",
    emptyBody:
      "검증 가능한 자료를 바탕으로 이 섹션을 채우고 있습니다. URL 수를 늘리기 위한 빈 페이지나 단순 치환 글은 공개하지 않습니다.",
    openGuideLabel: "가이드 열기",
    updatedLabel: "업데이트",
    nextTitle: "각 요소를 연결해 줄 사람이 필요하신가요?",
    nextBody:
      "여행 날짜, 인원, 대략적인 예산을 알려 주세요. 직접 준비할 부분과 현지에서 맡길 부분을 함께 판단합니다.",
    guidesLabel: "전체 여행 가이드 보기",
    tripBriefLabel: "여행 브리프 시작",
    sections: {
      explore: {
        navLabel: "중국 둘러보기",
        shortLabel: "여행지",
        eyebrow: "지역 · 도시 · 명소",
        title: "동선을 정하기 전에 여행지를 이해하세요.",
        description: "중국의 지역, 도시, 동네, 자연, 문화유산과 현지 체험을 하나의 관계망으로 연결합니다.",
        scopeTitle: "이 섹션이 연결할 내용",
        scope: ["지역과 성", "도시·동네·고진", "명소·자연·문화유산"],
      },
      plan: {
        navLabel: "첫 중국 여행 플래너",
        shortLabel: "첫 여행",
        eyebrow: "입국 · 동선 · 예약",
        title: "첫 중국 여행 플래너: 올바른 순서로 준비하세요.",
        description: "입국, 결제, 통신, 도시, 동선 구조, 교통, 숙소, 티켓과 이동일 여유를 각 결정을 맡은 기존 Homeground 가이드에 순서대로 연결합니다.",
        scopeTitle: "이 순서로 준비하세요",
        scope: ["입국·결제·통신", "도시·숙박일·동선 구조", "교통·숙소·티켓·여유 시간"],
      },
      transport: {
        navLabel: "중국 교통",
        shortLabel: "교통",
        eyebrow: "공항 · 기차역 · 도시 이동",
        title: "열차 시간만이 아니라 전체 이동일을 보세요.",
        description: "공항, 기차역, 도시 간 이동과 마지막 구간까지 실제 여행 시간으로 설명합니다.",
        scopeTitle: "이 섹션이 연결할 내용",
        scope: ["공항과 철도 거점", "도시 간 이동 선택", "역·호텔·관광지 연결"],
      },
      "when-to-go": {
        navLabel: "여행 시기",
        shortLabel: "시기",
        eyebrow: "월 · 계절 · 행사",
        title: "여행이 실제로 달라지는 시기를 선택하세요.",
        description: "날씨, 혼잡도, 풍경, 연휴와 계절 행사가 여행 판단을 어떻게 바꾸는지 비교합니다.",
        scopeTitle: "이 섹션이 연결할 내용",
        scope: ["월별·계절별 조건", "공휴일과 혼잡도", "축제·자연·설경·수위"],
      },
      stay: {
        navLabel: "숙소 선택",
        shortLabel: "숙소",
        eyebrow: "지역 · 숙소 유형 · 실제 조건",
        title: "객실보다 먼저 여행 거점을 고르세요.",
        description: "도시별 숙박 지역, 관광지 거점, 숙소 유형과 외국 여권 투숙 시 확인할 점을 비교합니다.",
        scopeTitle: "이 섹션이 연결할 내용",
        scope: ["도시별 숙박 지역", "호텔·민박·관광지 거점", "위치·교통·외국인 투숙 확인"],
      },
      essentials: {
        navLabel: "중국 여행 필수 정보",
        shortLabel: "필수 정보",
        eyebrow: "입국 · 결제 · 통신",
        title: "작은 문제가 커지기 전에 해결하세요.",
        description: "해외 여행자를 위한 입국, 결제, 인터넷, 예약 시스템과 현지 문제 해결 정보를 정리합니다.",
        scopeTitle: "이 섹션이 연결할 내용",
        scope: ["입국·경유 규정", "결제·앱·SIM·인터넷", "예약·등록·현지 문제 해결"],
      },
      culture: {
        navLabel: "음식과 문화",
        shortLabel: "문화",
        eyebrow: "역사 · 음식 · 오늘의 중국",
        title: "장소 뒤에 있는 중국을 이해하세요.",
        description: "역사, 인물, 명절, 음식, 신앙, 언어, 예술과 오늘의 생활을 실제 여행지와 연결합니다.",
        scopeTitle: "이 섹션이 연결할 내용",
        scope: ["역사·인물·사상", "지역 요리와 음식", "명절·예술·오늘의 중국"],
      },
      tools: {
        navLabel: "여행 도구",
        shortLabel: "도구",
        eyebrow: "계산 · 선택 · 조회",
        title: "답을 둘러 읽지 말고 바로 사용하세요.",
        description: "이동 시간 비교, 숙박 거점 선택, 일정 강도 확인과 실제 여행 작업을 돕는 도구입니다.",
        scopeTitle: "이 섹션이 연결할 내용",
        scope: ["동선·시간 점검", "지역·선택지 비교 도구", "지도·계산기·구조화 자료"],
      },
      services: {
        navLabel: "여행 서비스",
        shortLabel: "서비스",
        eyebrow: "가이드 · 픽업 · 전체 지원",
        title: "여행을 실제로 바꾸는 지점에 현지 도움을 더하세요.",
        description: "여행 브리프를 이해한 뒤 프라이빗 가이드, 이동, 숙소, 일정 설계와 전체 여행 지원을 연결합니다.",
        scopeTitle: "이 섹션이 연결할 내용",
        scope: ["프라이빗 가이드와 현지 체험", "이동·숙소·예약 지원", "일정 설계와 전체 여행 조율"],
      },
    },
  },
};

export function isSearchSectionId(value: string): value is SearchSectionId {
  return searchSectionIds.includes(value as SearchSectionId);
}

export function getSearchPlatformCopy(locale: HomegroundLocale = "en") {
  return copies[locale];
}

export function getSearchSectionPath(
  section: SearchSectionId,
  locale: HomegroundLocale = "en",
) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/${section}/`;
}

export function getSearchSectionLanguagePaths(section: SearchSectionId) {
  return {
    en: getSearchSectionPath(section, "en"),
    "zh-Hans": getSearchSectionPath(section, "zh"),
    ko: getSearchSectionPath(section, "ko"),
    "x-default": getSearchSectionPath(section, "en"),
  };
}
