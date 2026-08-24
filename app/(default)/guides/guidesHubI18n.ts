import type {
  GuideDestination,
  GuideFormat,
  GuideTopic,
} from "../../../lib/guideRegistry";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../../../lib/homegroundI18n";

export interface GuidesHubCopy {
  path: string;
  metadata: {
    title: string;
    description: string;
    openGraphTitle: string;
  };
  eyebrow: string;
  title: string;
  introduction: string;
  languageLabel: string;
  destinationAction: string;
  catalogEyebrow: string;
  catalogTitle: string;
  catalogIntroduction: string;
  guideCount: (count: number) => string;
  pagination: {
    label: string;
    status: (page: number, pageCount: number, guideCount: number) => string;
    previous: string;
    next: string;
    page: (page: number) => string;
    pageTitle: (page: number) => string;
  };
  libraryNav: {
    label: string;
    planning: string;
    entry: string;
  };
  countryGuide: {
    eyebrow: string;
    title: string;
    introduction: string;
    decisions: Record<
      GuidesHubDecisionSection,
      {
        title: string;
        body: string;
      }
    >;
  };
  entrySection: {
    eyebrow: string;
    title: string;
    introduction: string;
    action: string;
  };
  updatedLabel: string;
  readLabel: string;
  formatLabels: Partial<Record<GuideFormat, string>>;
  topicLabels: Partial<Record<GuideTopic, string>>;
  destinationLabels: Partial<Record<GuideDestination, string>>;
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    action: string;
  };
}

export const guidesHubDecisionSections = [
  "plan",
  "when-to-go",
  "transport",
  "stay",
  "essentials",
  "culture",
] as const;

export type GuidesHubDecisionSection =
  (typeof guidesHubDecisionSections)[number];

const copies: Record<HomegroundLocale, GuidesHubCopy> = {
  en: {
    path: "/guides/",
    metadata: {
      title: "Practical China Travel Guides | Entry, Transport & Stays",
      description:
        "Search practical China travel guides for clear answers on entry, transport, stays, timing and realistic first-trip planning.",
      openGraphTitle: "Practical China Travel Guides from Homeground",
    },
    eyebrow: "Searchable travel advice",
    title: "Practical China Travel Guides",
    introduction:
      "Start with the question you need to solve. Search clear answers on entry, route pace, transport, hotel decisions, timing and the practical tasks that shape a China trip.",
    languageLabel: "Guide language",
    destinationAction: "Choose a destination instead",
    catalogEyebrow: "Browse the library",
    catalogTitle: "Plan with the whole day in view.",
    catalogIntroduction:
      "Every guide begins with a planning decision: what fits, what a transfer costs, or which detail changes the rest of the trip.",
    guideCount: (count) => `${count} guides`,
    pagination: {
      label: "Guide library pages",
      status: (page, pageCount, guideCount) =>
        `Page ${page} of ${pageCount} · ${guideCount} guides`,
      previous: "Previous guides",
      next: "Next guides",
      page: (page) => `Page ${page}`,
      pageTitle: (page) => `Page ${page}`,
    },
    libraryNav: {
      label: "Browse guide collections",
      planning: "Routes & trip planning",
      entry: "Entry & visa-free rules",
    },
    countryGuide: {
      eyebrow: "Browse by travel problem",
      title: "Choose the problem you need to solve.",
      introduction:
        "These six question groups lead to the page that owns the answer. If you are choosing a place rather than solving a travel problem, use Destinations instead.",
      decisions: {
        plan: {
          title: "How many places fit your time?",
          body:
            "Work from usable days, city order and recovery time before locking hotels or non-refundable transport.",
        },
        "when-to-go": {
          title: "What changes on your dates?",
          body:
            "Check public holidays, weather, seasonal scenery and crowd pressure only where they change a real choice.",
        },
        transport: {
          title: "What does each move really cost?",
          body:
            "Compare airports, railway stations and city pairs by the full door-to-door transfer, not the timetable headline.",
        },
        stay: {
          title: "Which area makes the days easier?",
          body:
            "Choose the right city or scenic-area base first, then verify the hotel details that matter to an international traveller.",
        },
        essentials: {
          title: "What must work before arrival?",
          body:
            "Resolve entry, payment, mobile connectivity, booking and registration questions with current, source-backed guidance.",
        },
        culture: {
          title: "What makes the place mean more?",
          body:
            "Connect food, history, belief and living traditions to places you can actually visit instead of treating culture as trivia.",
        },
      },
    },
    entrySection: {
      eyebrow: "Entry rules",
      title: "Know the entry path before you build the route.",
      introduction:
        "Official-source explainers by passport, purpose and flight path. Homeground does not file visa applications or decide personal eligibility.",
      action: "Open China entry guides",
    },
    updatedLabel: "Updated",
    readLabel: "Read guide",
    formatLabels: {
      itinerary: "Itinerary",
      "route-analysis": "Route analysis",
      transport: "Transport",
      "decision-guide": "Decision guide",
      "field-note": "Field note",
      "planning-guide": "Planning guide",
    },
    topicLabels: {
      "itinerary-design": "Itinerary design",
      pace: "Pace",
      transport: "Transport",
      attractions: "Attractions",
      evenings: "Evenings",
      "trip-planning": "Trip planning",
      "on-the-ground": "On the ground",
      accommodation: "Accommodation",
    },
    destinationLabels: {
      china: "China",
      beijing: "Beijing",
      xian: "Xi’an",
      zhangjiajie: "Zhangjiajie",
      shanghai: "Shanghai",
    },
    cta: {
      eyebrow: "Planning beyond the article",
      title: "Bring us the trip you are considering.",
      body:
        "Use WhatsApp or leave your email. A Homeground planner can discuss your dates, priorities and current route, then confirm scope and price before paid work begins.",
      action: "Talk to a China trip planner",
    },
  },
  zh: {
    path: "/zh/guides/",
    metadata: {
      title: "中国旅行实用指南｜入境、交通、住宿与规划",
      description:
        "搜索 Homeground 中国旅行实用指南：入境、交通、住宿、出行时间与第一次旅行规划的明确答案。",
      openGraphTitle: "Homeground 中国旅行实用指南",
    },
    eyebrow: "可搜索的旅行答案库",
    title: "中国旅行实用指南",
    introduction:
      "从你正在解决的问题开始：搜索入境、路线节奏、交通、住宿、出行时间，以及第一次来中国会遇到的实际操作。",
    languageLabel: "指南语言",
    destinationAction: "改为选择目的地",
    catalogEyebrow: "浏览全部指南",
    catalogTitle: "把完整的一天放进规划里。",
    catalogIntroduction:
      "每一篇指南都从一个真实决定开始：时间到底够不够、一次转场会占掉什么，或哪个细节会改变整趟旅行。",
    guideCount: (count) => `共 ${count} 篇指南`,
    pagination: {
      label: "指南分页",
      status: (page, pageCount, guideCount) =>
        `第 ${page} / ${pageCount} 页 · 共 ${guideCount} 篇指南`,
      previous: "上一页指南",
      next: "下一页指南",
      page: (page) => `第 ${page} 页`,
      pageTitle: (page) => `第 ${page} 页`,
    },
    libraryNav: {
      label: "浏览指南栏目",
      planning: "路线与旅行规划",
      entry: "入境与免签规则",
    },
    countryGuide: {
      eyebrow: "按旅行问题浏览",
      title: "选择你现在需要解决的问题。",
      introduction:
        "下面六类问题会直接进入负责答案的栏目。如果你是在选择地点，而不是解决旅行问题，请使用“目的地”。",
      decisions: {
        plan: {
          title: "你的时间能放下几座城市？",
          body: "先计算真正可用的游玩日、城市顺序和恢复时间，再锁定酒店和不可退交通。",
        },
        "when-to-go": {
          title: "你的日期会改变什么？",
          body: "只在公共假期、天气、季节景观和人流会改变真实选择时，把时间因素单独拿出来判断。",
        },
        transport: {
          title: "每次转场真正花掉什么？",
          body: "比较机场、火车站和城市之间的完整门到门时间，而不只看时刻表上的飞行或列车时间。",
        },
        stay: {
          title: "住在哪个区域会更省力？",
          body: "先选对城市或景区住宿基地，再核实国际旅客真正需要确认的酒店条件。",
        },
        essentials: {
          title: "落地前必须解决什么？",
          body: "用有来源、会更新的指南处理入境、支付、手机网络、预约和住宿登记等实际问题。",
        },
        culture: {
          title: "怎样看懂景点背后的中国？",
          body: "把饮食、历史、信仰和仍在延续的传统连接到可以亲自抵达的地方，而不是只罗列文化知识。",
        },
      },
    },
    entrySection: {
      eyebrow: "入境规则",
      title: "先弄清入境路径，再开始设计路线。",
      introduction:
        "按护照、旅行目的和航班路径整理公开规则。Homeground 不代办签证，也不判断个人签证资格。",
      action: "查看中国入境指南",
    },
    updatedLabel: "更新于",
    readLabel: "阅读指南",
    formatLabels: {
      itinerary: "目的地行程",
      "route-analysis": "路线拆解",
      transport: "交通指南",
      "decision-guide": "选择指南",
      "field-note": "现场笔记",
      "planning-guide": "规划指南",
    },
    topicLabels: {
      "itinerary-design": "行程设计",
      pace: "旅行节奏",
      transport: "城市交通",
      attractions: "景点安排",
      evenings: "夜间安排",
      "trip-planning": "旅行规划",
      "on-the-ground": "一线经验",
      accommodation: "住宿选择",
    },
    destinationLabels: {
      china: "中国",
      beijing: "北京",
      xian: "西安",
      zhangjiajie: "张家界",
      shanghai: "上海",
    },
    cta: {
      eyebrow: "需要文章以外的规划",
      title: "把你正在考虑的旅行交给我们看看。",
      body:
        "可以通过 WhatsApp 直接聊，或只留下一个邮箱。规划师会结合日期、重点和已有路线，先确认适合的下一步、服务范围和价格。",
      action: "联系旅行规划师",
    },
  },
  ko: {
    path: "/ko/guides/",
    metadata: {
      title: "중국 여행 실용 가이드｜입국·교통·숙소·일정",
      description:
        "입국, 교통, 숙소, 여행 시기와 첫 중국 여행 계획에 관한 명확한 답을 Homeground 실용 가이드에서 검색하세요.",
      openGraphTitle: "Homeground 중국 여행 실용 가이드",
    },
    eyebrow: "검색 가능한 여행 답변",
    title: "중국 여행 실용 가이드",
    introduction:
      "지금 풀어야 할 질문에서 시작하세요. 입국, 동선 속도, 교통, 숙소, 여행 시기와 중국 현지 실무에 관한 답을 검색할 수 있습니다.",
    languageLabel: "가이드 언어",
    destinationAction: "여행지 선택하기",
    catalogEyebrow: "전체 가이드",
    catalogTitle: "하루 전체를 보고 일정을 설계합니다.",
    catalogIntroduction:
      "각 가이드는 한 가지 현실적인 결정에서 시작합니다. 무엇이 가능한지, 이동에 실제로 얼마나 드는지, 어떤 작은 조건이 여행 전체를 바꾸는지를 살펴봅니다.",
    guideCount: (count) => `가이드 ${count}편`,
    pagination: {
      label: "가이드 페이지",
      status: (page, pageCount, guideCount) =>
        `${page} / ${pageCount}페이지 · 가이드 ${guideCount}편`,
      previous: "이전 가이드",
      next: "다음 가이드",
      page: (page) => `${page}페이지`,
      pageTitle: (page) => `${page}페이지`,
    },
    libraryNav: {
      label: "가이드 모음",
      planning: "동선과 여행 설계",
      entry: "입국 및 무비자 규정",
    },
    countryGuide: {
      eyebrow: "여행 문제별 탐색",
      title: "지금 해결할 문제를 선택하세요.",
      introduction:
        "아래 여섯 가지 질문 그룹에서 답을 맡은 섹션으로 이동하세요. 여행 문제보다 장소를 고르는 중이라면 여행지 페이지를 이용하세요.",
      decisions: {
        plan: {
          title: "주어진 시간에 몇 도시가 맞을까요?",
          body: "호텔과 환불 불가 교통편을 확정하기 전에 실제 관광일, 도시 순서와 회복 시간을 먼저 계산하세요.",
        },
        "when-to-go": {
          title: "여행 날짜가 무엇을 바꿀까요?",
          body: "공휴일, 날씨, 계절 풍경과 혼잡도가 실제 선택을 바꾸는 경우에만 시기를 따로 판단하세요.",
        },
        transport: {
          title: "한 번의 이동에 실제로 무엇이 들까요?",
          body: "시간표의 비행·열차 시간만 보지 말고 공항, 역과 도시 사이의 전체 문전 이동을 비교하세요.",
        },
        stay: {
          title: "어느 지역에 묵어야 하루가 쉬워질까요?",
          body: "도시나 관광지의 숙박 거점을 먼저 정한 뒤 해외 여행자에게 필요한 호텔 조건을 확인하세요.",
        },
        essentials: {
          title: "도착 전에 무엇을 해결해야 할까요?",
          body: "출처가 있고 갱신되는 안내로 입국, 결제, 모바일 연결, 예약과 숙박 등록 문제를 해결하세요.",
        },
        culture: {
          title: "장소의 의미를 어떻게 더 깊이 볼까요?",
          body: "음식, 역사, 믿음과 살아 있는 전통을 실제로 방문할 수 있는 장소와 연결해 이해하세요.",
        },
      },
    },
    entrySection: {
      eyebrow: "입국 규정",
      title: "입국 경로를 먼저 확인한 뒤 일정을 설계하세요.",
      introduction:
        "여권, 여행 목적과 항공 경로별 공개 규정을 공식 출처로 정리합니다. Homeground는 비자 신청을 대행하거나 개인 자격을 판정하지 않습니다.",
      action: "중국 입국 가이드 보기",
    },
    updatedLabel: "업데이트",
    readLabel: "가이드 읽기",
    formatLabels: {
      itinerary: "여행 일정",
      "route-analysis": "동선 분석",
      transport: "교통",
      "decision-guide": "선택 가이드",
      "field-note": "현장 노트",
      "planning-guide": "여행 계획 가이드",
    },
    topicLabels: {
      "itinerary-design": "일정 구성",
      pace: "여행 속도",
      transport: "교통",
      attractions: "관광지",
      evenings: "저녁 일정",
      "trip-planning": "여행 계획",
      "on-the-ground": "현장 경험",
      accommodation: "숙소 선택",
    },
    destinationLabels: {
      china: "중국",
      beijing: "베이징",
      xian: "시안",
      zhangjiajie: "장자제(장가계)",
      shanghai: "상하이",
    },
    cta: {
      eyebrow: "가이드 다음 단계",
      title: "지금 고민 중인 여행을 보여 주세요.",
      body:
        "WhatsApp으로 바로 문의하거나 이메일을 남겨 주세요. Homeground 플래너가 날짜, 우선순위와 현재 동선을 함께 살펴보고 유료 작업 전에 범위와 가격을 확인합니다.",
      action: "중국 여행 플래너와 상담하기",
    },
  },
};

export function getGuidesHubCopy(locale: HomegroundLocale = "en") {
  return copies[locale];
}

export function getGuidesHubLanguagePaths() {
  return {
    en: copies.en.path,
    ko: copies.ko.path,
    "zh-Hans": copies.zh.path,
    "x-default": copies.en.path,
  } as const;
}

export function getGuidesHubLanguageUrls() {
  return Object.fromEntries(
    Object.entries(getGuidesHubLanguagePaths()).map(([language, path]) => [
      language,
      `https://homegroundchina.com${path}`,
    ]),
  ) as Record<keyof ReturnType<typeof getGuidesHubLanguagePaths>, string>;
}

export function getGuidesHubPlannerHref(locale: HomegroundLocale) {
  const home = getHomegroundCopy(locale);
  const campaign = new URLSearchParams({
    utm_source: "guides-hub",
    utm_medium: "owned",
    utm_campaign: "trip-conversation",
    utm_content: "hub-cta",
  });

  return `${home.path}?${campaign.toString()}#planner-contact`;
}
