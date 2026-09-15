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
      title: "China Travel Tips & Guides: Entry, Apps, Transport",
      description:
        "Practical China travel tips for entry, payments, mobile apps, transport, hotels, timing and realistic route planning.",
      openGraphTitle: "Practical China Travel Tips & Guides",
    },
    eyebrow: "Practical answers for your trip",
    title: "China Travel Tips",
    introduction:
      "Start with the task in front of you: entry, payments, mobile setup, transport, hotels, timing or route pace. Each section leads to the guide with the full answer.",
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
      eyebrow: "Six tips that save time",
      title: "Start with the decision in front of you.",
      introduction:
        "Use the tip that matches your next decision. If you are choosing where to go, compare Destinations instead.",
      decisions: {
        plan: {
          title: "Count usable days before adding cities.",
          body:
            "Set aside time for arrival, departure and long transfers; then choose a city order with room to recover.",
        },
        "when-to-go": {
          title: "Check your dates before booking.",
          body:
            "Public holidays, weather, seasonal scenery and crowds matter only when they change a real choice.",
        },
        transport: {
          title: "Compare every transfer door to door.",
          body:
            "Include the trip to the airport or station, security, waiting and the final ride—not only the train or flight time.",
        },
        stay: {
          title: "Choose the area before the hotel.",
          body:
            "Pick the base that reduces travel time on sightseeing days, then check the room and foreign-passport details.",
        },
        essentials: {
          title: "Confirm entry, payments and mobile access.",
          body:
            "Confirm your entry path, payment fallback, internet access and essential bookings before arrival.",
        },
        culture: {
          title: "Give each city one local thread.",
          body:
            "Follow one food, history or living-tradition thread through places you can actually visit.",
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
      title: "中国旅行实用攻略｜入境、支付、交通与住宿",
      description:
        "中国旅行实用攻略：入境、支付、手机网络、交通、住宿、出行时间与路线规划。",
      openGraphTitle: "Homeground 中国旅行实用攻略",
    },
    eyebrow: "按问题找旅行答案",
    title: "中国旅行实用建议",
    introduction:
      "从眼前要处理的事情开始：入境、支付、手机网络、交通、住宿、出行时间或路线节奏。每个栏目都会带你进入提供完整答案的指南。",
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
      eyebrow: "六条省时间的建议",
      title: "先处理眼前这项旅行决定。",
      introduction:
        "选择与你下一项决定最接近的一条；如果你正在挑选去哪里，请进入“目的地”比较。",
      decisions: {
        plan: {
          title: "先算可用游玩日，再增加城市。",
          body: "先扣除抵达、离开和长距离转场，再安排城市顺序与休息余量。",
        },
        "when-to-go": {
          title: "订票前先核对日期。",
          body: "公共假期、天气、季节景观与人流，只有会改变真实选择时才需要单独处理。",
        },
        transport: {
          title: "所有转场都按门到门比较。",
          body: "把去机场或车站、安检、候机或候车和最后一段接驳算进去，不只看列车或航班时间。",
        },
        stay: {
          title: "先选住宿区域，再选酒店。",
          body: "先选能减少游览日通勤时间的基地，再核实房型和持外国护照办理入住所需信息。",
        },
        essentials: {
          title: "落地前准备好入境、支付和网络。",
          body: "提前确认入境路径、备用支付方式、手机网络和必须预约的项目。",
        },
        culture: {
          title: "每座城市选一条本地线索。",
          body: "沿着饮食、历史或仍在延续的传统，把看得见的地方连起来。",
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
      title: "중국 여행 팁과 실용 가이드｜입국·결제·교통·숙소",
      description:
        "입국, 결제, 모바일 연결, 교통, 숙소, 여행 시기와 동선을 위한 실용적인 중국 여행 팁입니다.",
      openGraphTitle: "Homeground 중국 여행 팁과 실용 가이드",
    },
    eyebrow: "여행 문제별 실용 답변",
    title: "중국 여행 팁",
    introduction:
      "입국, 결제, 모바일 연결, 교통, 숙소, 여행 시기와 동선 중 지금 필요한 일부터 시작하세요. 각 섹션에서 자세한 답변이 담긴 가이드로 이동할 수 있습니다.",
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
      eyebrow: "시간을 아끼는 여섯 가지 팁",
      title: "지금 필요한 결정부터 확인하세요.",
      introduction:
        "다음 결정에 맞는 팁을 고르세요. 어디로 갈지 정하는 중이라면 여행지 페이지에서 비교할 수 있습니다.",
      decisions: {
        plan: {
          title: "도시를 늘리기 전에 실제 여행일을 세세요.",
          body: "도착일, 출발일과 장거리 이동 시간을 뺀 뒤 도시 순서와 휴식 여유를 정하세요.",
        },
        "when-to-go": {
          title: "예약 전에 날짜를 확인하세요.",
          body: "공휴일, 날씨, 계절 풍경과 혼잡도가 실제 선택을 바꿀 때만 따로 판단하세요.",
        },
        transport: {
          title: "이동은 출발지부터 도착지까지 비교하세요.",
          body: "공항이나 역까지 가는 시간, 보안 검색, 대기와 마지막 구간까지 포함하고 열차나 비행시간만 보지 마세요.",
        },
        stay: {
          title: "호텔보다 숙박 지역을 먼저 고르세요.",
          body: "실제 관광일의 이동을 줄이는 거점을 고른 뒤 객실 조건과 외국 여권 체크인에 필요한 사항을 확인하세요.",
        },
        essentials: {
          title: "입국, 결제와 모바일 연결을 준비하세요.",
          body: "입국 경로, 결제 대안, 인터넷 연결과 꼭 필요한 예약을 출발 전에 확인하세요.",
        },
        culture: {
          title: "도시마다 한 가지 현지 이야기를 따라가세요.",
          body: "음식, 역사나 살아 있는 전통 하나를 실제로 방문할 수 있는 장소와 연결해 보세요.",
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
