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
  catalogEyebrow: string;
  catalogTitle: string;
  catalogIntroduction: string;
  guideCount: (count: number) => string;
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
  "explore",
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
      title: "China Travel Guides | Realistic Routes & Planning",
      description:
        "Browse practical China travel guides on realistic itineraries, transport, destinations and on-the-ground decisions from Homeground planners.",
      openGraphTitle: "China Travel Guides from Homeground",
    },
    eyebrow: "Homeground field library",
    title: "China Travel Guides",
    introduction:
      "Use this China travel guide to choose places, build realistic routes, compare transport and hotel areas, and solve the entry and on-the-ground tasks that shape a first trip.",
    languageLabel: "Guide language",
    catalogEyebrow: "Browse the library",
    catalogTitle: "Plan with the whole day in view.",
    catalogIntroduction:
      "Every guide begins with a planning decision: what fits, what a transfer costs, or which detail changes the rest of the trip.",
    guideCount: (count) => `${count} guides`,
    libraryNav: {
      label: "Browse guide collections",
      planning: "Routes & trip planning",
      entry: "Entry & visa-free rules",
    },
    countryGuide: {
      eyebrow: "China travel guide",
      title: "Start with the decision that changes the trip.",
      introduction:
        "China is too large for one universal itinerary. Use these seven starting points to reach the page that owns your question, then follow its links into cities, routes and practical tasks.",
      decisions: {
        explore: {
          title: "Which places belong in this trip?",
          body:
            "Compare cities, landscapes and heritage by the experience they add—not by forcing every famous stop into one route.",
        },
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
      title: "中国旅行指南｜现实路线与行程规划",
      description:
        "浏览 Homeground 的中国旅行指南：现实行程、城市交通、目的地安排与来自规划师的一线判断。",
      openGraphTitle: "Homeground 中国旅行指南",
    },
    eyebrow: "Homeground 旅行指南",
    title: "中国旅行指南",
    introduction:
      "从目的地取舍、现实路线、交通与住宿区域，到入境和落地后的实际操作，用这份中国旅行指南找到第一次来中国真正需要解决的问题。",
    languageLabel: "指南语言",
    catalogEyebrow: "浏览全部指南",
    catalogTitle: "把完整的一天放进规划里。",
    catalogIntroduction:
      "每一篇指南都从一个真实决定开始：时间到底够不够、一次转场会占掉什么，或哪个细节会改变整趟旅行。",
    guideCount: (count) => `共 ${count} 篇指南`,
    libraryNav: {
      label: "浏览指南栏目",
      planning: "路线与旅行规划",
      entry: "入境与免签规则",
    },
    countryGuide: {
      eyebrow: "中国旅行总指南",
      title: "先找到真正会改变行程的决定。",
      introduction:
        "中国太大，不存在一条适合所有人的万能路线。请从下面七个入口找到负责你问题的页面，再继续进入具体城市、路线与操作指南。",
      decisions: {
        explore: {
          title: "这趟旅行应该去哪些地方？",
          body: "按每座城市、自然景观和文化遗产能增加什么体验来取舍，而不是把所有知名地点硬塞进一条路线。",
        },
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
      title: "중국 여행 가이드｜현실적인 일정과 동선",
      description:
        "Homeground 플래너가 정리한 현실적인 중국 일정, 도시 간 이동, 여행지 선택과 현장 판단을 한곳에서 살펴보세요.",
      openGraphTitle: "Homeground 중국 여행 가이드",
    },
    eyebrow: "Homeground 여행 라이브러리",
    title: "중국 여행 가이드",
    introduction:
      "여행지 선택과 현실적인 동선부터 교통, 숙소 지역, 입국과 현지 실무까지 첫 중국 여행에서 실제로 풀어야 할 문제를 이 가이드에서 찾아보세요.",
    languageLabel: "가이드 언어",
    catalogEyebrow: "전체 가이드",
    catalogTitle: "하루 전체를 보고 일정을 설계합니다.",
    catalogIntroduction:
      "각 가이드는 한 가지 현실적인 결정에서 시작합니다. 무엇이 가능한지, 이동에 실제로 얼마나 드는지, 어떤 작은 조건이 여행 전체를 바꾸는지를 살펴봅니다.",
    guideCount: (count) => `가이드 ${count}편`,
    libraryNav: {
      label: "가이드 모음",
      planning: "동선과 여행 설계",
      entry: "입국 및 무비자 규정",
    },
    countryGuide: {
      eyebrow: "중국 여행 종합 가이드",
      title: "여행을 바꾸는 결정부터 시작하세요.",
      introduction:
        "중국은 하나의 정답 일정으로 설명하기에는 너무 큽니다. 아래 일곱 가지 출발점에서 질문의 담당 페이지를 찾은 뒤 도시, 동선과 실무 가이드로 이어 가세요.",
      decisions: {
        explore: {
          title: "이번 여행에 어떤 곳을 넣을까요?",
          body: "유명한 곳을 모두 억지로 넣기보다 도시, 자연과 유산이 여행에 더하는 경험을 비교해 선택하세요.",
        },
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
