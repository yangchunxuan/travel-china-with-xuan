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
  metadataTitle?: string;
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
  breadcrumbLabel: string;
  languageLabel: string;
  browseLabel: string;
  currentSectionLabel: string;
  questionGroupsTitle: string;
  questionGroupsIntroduction: string;
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
    breadcrumbLabel: "Breadcrumb",
    languageLabel: "Change language",
    browseLabel: "Browse the China index",
    currentSectionLabel: "Current section",
    questionGroupsTitle: "Choose the question you need to solve next",
    questionGroupsIntroduction:
      "Open the closest match to compare the decisions, trade-offs and practical steps for that part of the trip.",
    collectionTitle: "Published answers for this part of the trip",
    collectionIntroduction:
      "Start with the guide closest to your dates, route or booking question, then follow its links to the relevant city or next decision.",
    emptyTitle: "No published answer matches this question yet.",
    emptyBody:
      "Search all Travel Advice or tell us the exact route, date or booking problem you are trying to solve.",
    openGuideLabel: "Open guide",
    updatedLabel: "Updated",
    nextTitle: "Need a person to connect the pieces?",
    nextBody:
      "Share your dates, party size and rough budget. Homeground will help decide what should be self-planned and what is worth arranging locally.",
    guidesLabel: "Open Travel Advice",
    tripBriefLabel: "Start a trip brief",
    sections: {
      explore: {
        navLabel: "Destinations",
        metadataTitle: "China Destinations: Cities, Regions & Places",
        shortLabel: "Places",
        eyebrow: "Choose by place",
        title: "Choose a place. See how it fits the trip.",
        description:
          "Compare cities by nights, stay areas, arrival points, major sights and the next places that connect without forcing the route.",
        scopeTitle: "What do you need to decide?",
        scope: ["Which city earns a place in my trip?", "How many nights and which base make sense?", "Where should I arrive, depart and go next?"],
      },
      plan: {
        navLabel: "First Trip to China Planner",
        shortLabel: "First trip",
        eyebrow: "Entry · route · bookings",
        title: "First Trip to China Planner: build it in the right order.",
        description:
          "Work through entry, payments, connectivity, cities, route shape, transport, stays, tickets and travel-day buffers in the order each decision becomes useful.",
        scopeTitle: "Which decision is blocking you?",
        scope: ["What must I set up before arrival?", "Which cities fit my days and pace?", "What should I book first, and how much buffer do I need?"],
      },
      transport: {
        navLabel: "Getting Around",
        shortLabel: "Transport",
        eyebrow: "Airports · stations · city pairs",
        title: "See the whole transfer, not only the time on the train.",
        description:
          "Airports, railway stations, city-to-city routes and last-mile transfers explained as complete travel days.",
        scopeTitle: "Which transport question do you have?",
        scope: ["Which airport or station should I use?", "Is the train or flight better for this city pair?", "How much door-to-door time should I allow?"],
      },
      "when-to-go": {
        navLabel: "When to Go",
        shortLabel: "Timing",
        eyebrow: "Months · seasons · events",
        title: "Choose timing by what actually changes the trip.",
        description:
          "Weather, crowds, scenery, holidays and seasonal events—split into pages only when the timing changes a real decision.",
        scopeTitle: "What should decide your dates?",
        scope: ["Which months fit the weather and scenery I want?", "Will a public holiday change crowds or bookings?", "Does a festival or natural season change what is possible?"],
      },
      stay: {
        navLabel: "Where to Stay",
        shortLabel: "Stay",
        eyebrow: "Areas · hotel types · practical fit",
        title: "Choose the right base before choosing the room.",
        description:
          "City areas, scenic-zone bases, hotel types and practical checks for travellers using international passports.",
        scopeTitle: "What do you need from your stay?",
        scope: ["Which area will cut daily travel time?", "Should I choose a city hotel, guesthouse or scenic base?", "What should I confirm before foreign-passport check-in?"],
      },
      essentials: {
        navLabel: "China Essentials",
        shortLabel: "Essentials",
        eyebrow: "Entry · payments · connectivity",
        title: "Solve the practical China questions before they become lost hours.",
        description:
          "Entry rules, payments, mobile connectivity, booking systems and on-the-road problem solving for international travellers.",
        scopeTitle: "Which practical task needs an answer?",
        scope: ["What entry or transit rule applies to me?", "How will I pay and stay connected?", "How do I book, register or recover when plans change?"],
      },
      culture: {
        navLabel: "Food & Culture",
        shortLabel: "Culture",
        eyebrow: "History · food · contemporary life",
        title: "Understand the China behind the places.",
        description:
          "History, people, festivals, food, belief, language, art and contemporary life connected back to places travellers can encounter.",
        scopeTitle: "What do you want to understand?",
        scope: ["Which history or ideas shaped this place?", "What should I eat, and where does it come from?", "How do festivals, arts and everyday life fit the visit?"],
      },
      tools: {
        navLabel: "Tools",
        shortLabel: "Tools",
        eyebrow: "Calculators · selectors · reference",
        title: "Use the answer instead of reading around it.",
        description:
          "Focused tools for comparing travel time, choosing a hotel base, checking route pressure and completing practical trip tasks.",
        scopeTitle: "Which result do you need?",
        scope: ["Is my route or transfer time realistic?", "Which area or option fits my priorities?", "Can a map, calculator or reference settle this quickly?"],
      },
      services: {
        navLabel: "Travel Services",
        shortLabel: "Services",
        eyebrow: "Guides · transfers · trip support",
        title: "Bring in local help where it changes the journey.",
        description:
          "Clear entry points for private guides, transfers, hotel selection, route design and whole-trip support—matched after the trip brief is understood.",
        scopeTitle: "Where would local help matter?",
        scope: ["Do I need a private guide for a difficult day?", "Would transfer, hotel or booking support remove risk?", "Does the whole route need one person to coordinate it?"],
      },
    },
  },
  zh: {
    indexLabel: "Homeground 中国索引",
    indexTitle: "按你真正会问的问题，重新整理中国。",
    indexIntroduction:
      "从一个地方继续找到抵达路线、旅行季节与实际操作。每个栏目都属于同一张相互连接的中国旅行与文化信息网络。",
    breadcrumbLabel: "当前位置",
    languageLabel: "切换语言",
    browseLabel: "浏览中国索引",
    currentSectionLabel: "当前栏目",
    questionGroupsTitle: "选择你接下来需要解决的问题",
    questionGroupsIntroduction:
      "进入最接近的问题，比较这一环节真正需要做的决定、取舍与操作步骤。",
    collectionTitle: "这一环节已有的实用答案",
    collectionIntroduction:
      "先选择最接近你的日期、路线或预订问题的指南，再沿着文中链接继续进入相关城市与下一项决定。",
    emptyTitle: "目前还没有完全匹配这个问题的公开答案。",
    emptyBody:
      "你可以搜索全部实用指南，或直接告诉我们具体路线、日期与预订问题。",
    openGuideLabel: "打开指南",
    updatedLabel: "更新于",
    nextTitle: "需要真人把这些环节连起来？",
    nextBody:
      "告诉我们日期、同行人数和大致预算。Homeground 会先判断哪些适合自己安排，哪些环节值得在当地处理。",
    guidesLabel: "打开实用指南",
    tripBriefLabel: "提交旅行简报",
    sections: {
      explore: {
        navLabel: "目的地",
        metadataTitle: "中国目的地：城市、地区与景点",
        shortLabel: "目的地",
        eyebrow: "按地点选择",
        title: "先选目的地，再看它怎样接入整趟旅行。",
        description: "按停留晚数、住宿区域、进出门户、主要景点和顺路的下一站比较城市，不让单个地点打乱整条路线。",
        scopeTitle: "你现在需要决定什么？",
        scope: ["哪座城市值得放进行程？", "住几晚、以哪个区域为基地？", "从哪里进入、离开，再去哪里？"],
      },
      plan: {
        navLabel: "第一次中国旅行规划",
        shortLabel: "第一次旅行",
        eyebrow: "入境 · 路线 · 预订",
        title: "第一次去中国：按正确顺序规划行程。",
        description: "从入境、支付、网络、城市与路线结构，到交通、住宿、门票和转场缓冲，按每项决定真正有用的顺序完成。",
        scopeTitle: "哪一项决定卡住了你？",
        scope: ["抵达前必须准备什么？", "旅行天数和节奏适合哪些城市？", "先订什么，转场需要留多少缓冲？"],
      },
      transport: {
        navLabel: "中国交通",
        shortLabel: "交通",
        eyebrow: "机场 · 车站 · 城市对",
        title: "看完整转场，不只看列车运行时间。",
        description: "把机场、火车站、城市之间与最后一段接驳，解释成真实占用时间的旅行日。",
        scopeTitle: "你在解决哪一个交通问题？",
        scope: ["应该使用哪个机场或车站？", "这两个城市之间坐火车还是飞机？", "门到门应该预留多少时间？"],
      },
      "when-to-go": {
        navLabel: "何时出发",
        shortLabel: "旅行时间",
        eyebrow: "月份 · 季节 · 节庆",
        title: "只在时间真正改变旅行时，单独解释它。",
        description: "比较天气、人流、景观、假期与季节活动，帮助你判断什么时候更适合自己的旅行。",
        scopeTitle: "什么因素应该决定出发日期？",
        scope: ["哪个月份符合我想看的天气与景观？", "公共假期会不会改变人流和预订？", "节庆、花期、雪季或水位会改变什么？"],
      },
      stay: {
        navLabel: "住在哪里",
        shortLabel: "住宿",
        eyebrow: "区域 · 房型 · 实际适配",
        title: "先选住宿基地，再选房间。",
        description: "比较城市区域、景区住宿基地、酒店与民宿类型，以及持外国护照入住时要核实的细节。",
        scopeTitle: "你需要住宿解决什么？",
        scope: ["住哪个区域能减少每天通勤？", "应该选城市酒店、民宿还是景区基地？", "外国护照入住前要确认什么？"],
      },
      essentials: {
        navLabel: "中国实用指南",
        shortLabel: "实用信息",
        eyebrow: "入境 · 支付 · 通信",
        title: "别让小问题变成几小时的麻烦。",
        description: "为国际旅客整理入境、支付、网络、订票系统和旅行途中会遇到的实际问题。",
        scopeTitle: "哪项实际操作需要答案？",
        scope: ["哪条入境或过境规定适用于我？", "怎样付款并保持联网？", "怎样预订、登记，计划变化后如何处理？"],
      },
      culture: {
        navLabel: "饮食与文化",
        shortLabel: "文化",
        eyebrow: "历史 · 饮食 · 当代生活",
        title: "理解景点背后的中国。",
        description: "把历史、人物、节日、饮食、信仰、语言、艺术和当代生活连接回你能亲自抵达的地方。",
        scopeTitle: "你想真正看懂什么？",
        scope: ["哪些历史与观念塑造了这个地方？", "应该吃什么，它来自哪里？", "节日、艺术与日常生活怎样影响参观？"],
      },
      tools: {
        navLabel: "旅行工具",
        shortLabel: "工具",
        eyebrow: "计算 · 选择 · 查询",
        title: "直接使用答案，而不是绕着问题阅读。",
        description: "用清晰工具比较转场时间、选择住宿基地、检查路线压力，并完成具体旅行任务。",
        scopeTitle: "你需要得到哪种结果？",
        scope: ["路线或转场时间现实吗？", "哪个区域或选项更符合我的优先级？", "地图、计算器或资料表能否快速解决？"],
      },
      services: {
        navLabel: "旅行协助",
        shortLabel: "服务",
        eyebrow: "导游 · 接送 · 全程支持",
        title: "只在真正改变旅行体验的地方加入本地协助。",
        description: "私人导游、接送、住宿筛选、路线设计与全程支持会在了解旅行简报后再进行匹配。",
        scopeTitle: "哪个环节值得本地协助？",
        scope: ["复杂的一天是否需要私人导游？", "接送、住宿或预订协助能否减少风险？", "整条路线是否需要一个人统一协调？"],
      },
    },
  },
  ko: {
    indexLabel: "Homeground 중국 안내",
    indexTitle: "실제 여행자가 묻는 질문으로 중국을 다시 정리했습니다.",
    indexIntroduction:
      "한 장소에서 이동 경로, 계절, 실제 준비 과정까지 이어서 살펴보세요. 모든 섹션은 서로 연결된 하나의 중국 여행·문화 정보망입니다.",
    breadcrumbLabel: "현재 위치",
    languageLabel: "언어 변경",
    browseLabel: "중국 안내 둘러보기",
    currentSectionLabel: "현재 섹션",
    questionGroupsTitle: "다음으로 해결할 질문을 선택하세요",
    questionGroupsIntroduction:
      "가장 가까운 질문을 열어 이 여행 단계의 결정, 선택 기준과 실제 준비 방법을 비교하세요.",
    collectionTitle: "이 여행 단계에 공개된 실용 답변",
    collectionIntroduction:
      "날짜, 동선 또는 예약 질문과 가장 가까운 가이드부터 읽고 관련 도시와 다음 결정으로 이어가세요.",
    emptyTitle: "이 질문과 정확히 맞는 공개 답변은 아직 없습니다.",
    emptyBody:
      "전체 실용 가이드를 검색하거나 해결하려는 동선, 날짜와 예약 문제를 구체적으로 알려 주세요.",
    openGuideLabel: "가이드 열기",
    updatedLabel: "업데이트",
    nextTitle: "각 요소를 연결해 줄 사람이 필요하신가요?",
    nextBody:
      "여행 날짜, 인원, 대략적인 예산을 알려 주세요. 직접 준비할 부분과 현지에서 맡길 부분을 함께 판단합니다.",
    guidesLabel: "실용 가이드 열기",
    tripBriefLabel: "여행 브리프 시작",
    sections: {
      explore: {
        navLabel: "여행지",
        metadataTitle: "중국 여행지: 도시·지역·명소",
        shortLabel: "여행지",
        eyebrow: "장소로 선택",
        title: "여행지를 고르고, 전체 동선에서 어떤 역할을 하는지 보세요.",
        description: "숙박일, 숙소 지역, 도착 지점, 주요 명소와 자연스럽게 이어지는 다음 여행지를 기준으로 도시를 비교하세요.",
        scopeTitle: "지금 무엇을 결정해야 하나요?",
        scope: ["어느 도시를 일정에 넣을까요?", "몇 박, 어느 지역을 거점으로 할까요?", "어디로 도착하고 출발해 다음에는 어디로 갈까요?"],
      },
      plan: {
        navLabel: "첫 중국 여행 플래너",
        shortLabel: "첫 여행",
        eyebrow: "입국 · 동선 · 예약",
        title: "첫 중국 여행 플래너: 올바른 순서로 준비하세요.",
        description: "입국, 결제, 통신, 도시와 동선 구조부터 교통, 숙소, 티켓과 이동일 여유까지 각 결정이 필요한 순서로 준비하세요.",
        scopeTitle: "어느 결정에서 막혔나요?",
        scope: ["도착 전에 무엇을 준비해야 할까요?", "여행 기간과 속도에 어떤 도시가 맞을까요?", "무엇을 먼저 예약하고 이동 여유는 얼마나 둘까요?"],
      },
      transport: {
        navLabel: "중국 교통",
        shortLabel: "교통",
        eyebrow: "공항 · 기차역 · 도시 이동",
        title: "열차 시간만이 아니라 전체 이동일을 보세요.",
        description: "공항, 기차역, 도시 간 이동과 마지막 구간까지 실제 여행 시간으로 설명합니다.",
        scopeTitle: "어떤 교통 질문을 해결하고 있나요?",
        scope: ["어느 공항이나 기차역을 이용할까요?", "이 도시 구간은 기차와 항공 중 무엇이 나을까요?", "출발지부터 도착지까지 시간을 얼마나 잡을까요?"],
      },
      "when-to-go": {
        navLabel: "여행 시기",
        shortLabel: "시기",
        eyebrow: "월 · 계절 · 행사",
        title: "여행이 실제로 달라지는 시기를 선택하세요.",
        description: "날씨, 혼잡도, 풍경, 연휴와 계절 행사가 여행 판단을 어떻게 바꾸는지 비교합니다.",
        scopeTitle: "무엇을 기준으로 날짜를 정할까요?",
        scope: ["원하는 날씨와 풍경에는 어느 달이 맞을까요?", "공휴일이 혼잡과 예약을 바꿀까요?", "축제나 자연의 계절이 가능한 일정을 바꿀까요?"],
      },
      stay: {
        navLabel: "숙소 선택",
        shortLabel: "숙소",
        eyebrow: "지역 · 숙소 유형 · 실제 조건",
        title: "객실보다 먼저 여행 거점을 고르세요.",
        description: "도시별 숙박 지역, 관광지 거점, 숙소 유형과 외국 여권 투숙 시 확인할 점을 비교합니다.",
        scopeTitle: "숙소에서 무엇을 해결해야 하나요?",
        scope: ["매일 이동을 줄이려면 어느 지역에 묵을까요?", "도시 호텔, 민박과 관광지 거점 중 무엇이 맞을까요?", "외국 여권 체크인 전에 무엇을 확인할까요?"],
      },
      essentials: {
        navLabel: "중국 여행 필수 정보",
        shortLabel: "필수 정보",
        eyebrow: "입국 · 결제 · 통신",
        title: "작은 문제가 커지기 전에 해결하세요.",
        description: "해외 여행자를 위한 입국, 결제, 인터넷, 예약 시스템과 현지 문제 해결 정보를 정리합니다.",
        scopeTitle: "어떤 실용 문제가 답을 기다리나요?",
        scope: ["어떤 입국이나 경유 규정이 적용될까요?", "결제하고 인터넷을 쓰려면 어떻게 할까요?", "예약·등록하거나 계획 변경에 어떻게 대응할까요?"],
      },
      culture: {
        navLabel: "음식과 문화",
        shortLabel: "문화",
        eyebrow: "역사 · 음식 · 오늘의 중국",
        title: "장소 뒤에 있는 중국을 이해하세요.",
        description: "역사, 인물, 명절, 음식, 신앙, 언어, 예술과 오늘의 생활을 실제 여행지와 연결합니다.",
        scopeTitle: "무엇을 제대로 이해하고 싶나요?",
        scope: ["어떤 역사와 생각이 이 장소를 만들었을까요?", "무엇을 먹고, 그 음식은 어디에서 왔을까요?", "명절·예술·일상이 방문 경험과 어떻게 이어질까요?"],
      },
      tools: {
        navLabel: "여행 도구",
        shortLabel: "도구",
        eyebrow: "계산 · 선택 · 조회",
        title: "답을 둘러 읽지 말고 바로 사용하세요.",
        description: "이동 시간 비교, 숙박 거점 선택, 일정 강도 확인과 실제 여행 작업을 돕는 도구입니다.",
        scopeTitle: "어떤 결과가 필요한가요?",
        scope: ["동선이나 이동 시간이 현실적인가요?", "어느 지역이나 선택지가 우선순위에 맞을까요?", "지도·계산기·자료표로 빠르게 결정할 수 있을까요?"],
      },
      services: {
        navLabel: "여행 서비스",
        shortLabel: "서비스",
        eyebrow: "가이드 · 픽업 · 전체 지원",
        title: "여행을 실제로 바꾸는 지점에 현지 도움을 더하세요.",
        description: "여행 브리프를 이해한 뒤 프라이빗 가이드, 이동, 숙소, 일정 설계와 전체 여행 지원을 연결합니다.",
        scopeTitle: "어디에 현지 도움이 필요할까요?",
        scope: ["복잡한 하루에 프라이빗 가이드가 필요할까요?", "이동·숙소·예약 지원이 위험을 줄일까요?", "전체 동선을 한 사람이 조율해야 할까요?"],
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
