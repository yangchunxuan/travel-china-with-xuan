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
  entrySection: {
    eyebrow: string;
    title: string;
    introduction: string;
    action: string;
  };
  updatedLabel: string;
  readLabel: string;
  formatLabels: Record<GuideFormat, string>;
  topicLabels: Record<GuideTopic, string>;
  destinationLabels: Record<GuideDestination, string>;
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    action: string;
  };
}

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
      "Realistic routes, transfer math and destination notes for travellers who want to understand what a China trip actually asks of their time.",
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
    },
    destinationLabels: {
      china: "China",
      beijing: "Beijing",
      zhangjiajie: "Zhangjiajie",
      shanghai: "Shanghai",
    },
    cta: {
      eyebrow: "Planning beyond the article",
      title: "Bring us the trip you are considering.",
      body:
        "Share your dates, priorities and whatever route you have. A Homeground planner will confirm the right next step, scope, timing and price before paid work begins.",
      action: "Start my free trip brief",
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
      "从可行路线、门到门转场时间到目的地细节，帮你算清一次中国旅行各个环节真正需要多少时间。",
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
    },
    destinationLabels: {
      china: "中国",
      beijing: "北京",
      zhangjiajie: "张家界",
      shanghai: "上海",
    },
    cta: {
      eyebrow: "需要文章以外的规划",
      title: "把你正在考虑的旅行交给我们看看。",
      body:
        "提交日期、重点和目前已有的路线。Homeground 规划师会先确认适合的下一步、服务范围、交付时间和价格，再开始任何付费工作。",
      action: "免费提交旅行简报",
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
      "현실적인 동선, 출발지부터 목적지까지의 실제 총이동 시간과 현장 메모를 통해 각 구간에 얼마나 걸리는지 확인하세요.",
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
    },
    destinationLabels: {
      china: "중국",
      beijing: "베이징",
      zhangjiajie: "장자제(장가계)",
      shanghai: "상하이",
    },
    cta: {
      eyebrow: "가이드 다음 단계",
      title: "지금 고민 중인 여행을 보여 주세요.",
      body:
        "날짜, 우선순위와 현재 동선을 보내 주세요. 유료 작업 전에 Homeground 플래너가 적합한 다음 단계, 범위, 납기와 가격을 먼저 확인합니다.",
      action: "무료 여행 브리프 시작하기",
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

  return `${home.path}?${campaign.toString()}#route-finder`;
}
