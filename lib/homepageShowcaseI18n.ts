import type { HomegroundLocale } from "./homegroundI18n";

export type HomepageGuidePathId = "stay" | "transport" | "plan";

interface HomepageShowcaseCopy {
  readonly heroBody: string;
  readonly heroHeadline: {
    readonly fixedLines: readonly string[];
    readonly joiner: "" | " ";
    readonly phrases: readonly string[];
  };
  readonly heroPrimary: string;
  readonly heroSecondary: string;
  readonly heroDestinationPrompt: string;
  readonly heroDestinationAction: string;
  readonly guidePaths: {
    readonly listLabel: string;
    readonly prompt: string;
    readonly items: readonly {
      readonly id: HomepageGuidePathId;
      readonly title: string;
      readonly body: string;
    }[];
  };
  readonly planning: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly teamAction: string;
  };
}

const copies: Record<HomegroundLocale, HomepageShowcaseCopy> = {
  en: {
    heroBody:
      "Start with a route that fits, then shape it around your dates.",
    heroHeadline: {
      fixedLines: ["China, your", "way."],
      joiner: " ",
      phrases: [
        "We’ve got your back.",
        "Every stop connects.",
        "Real travel time counts.",
        "The hard parts, handled.",
      ],
    },
    heroPrimary: "Compare private China tours",
    heroSecondary: "Talk to a trip planner",
    heroDestinationPrompt: "Still deciding where to go?",
    heroDestinationAction: "Explore China destinations",
    guidePaths: {
      listLabel: "Browse China travel guides by decision",
      prompt: "Or start with the decision in front of you",
      items: [
        {
          id: "stay",
          title: "Choose a place to stay",
          body: "Hotel areas and neighbourhood trade-offs",
        },
        {
          id: "transport",
          title: "Get the arrival right",
          body: "Airports, railway stations and transfers",
        },
        {
          id: "plan",
          title: "Test the route",
          body: "City order, trip length and travel pace",
        },
      ],
    },
    planning: {
      eyebrow: "A local planner, when you want one",
      title: "Keep what already works. Hand us the difficult parts.",
      body:
        "Homeground is a China travel agency specialising in private, tailor-made trips. Keep the flights or hotels you have already booked; we can bring the whole journey together or help with one difficult part.",
      teamAction: "Meet the Homeground team",
    },
  },
  zh: {
    heroBody:
      "先选一条接近的路线，再按你的日期调整。",
    heroHeadline: {
      fixedLines: ["按你的方式，", "游中国。"],
      joiner: "",
      phrases: [
        "一路有我们。",
        "每一站都接得上。",
        "真实路程也算进去。",
        "难处理的交给我们。",
      ],
    },
    heroPrimary: "比较中国私家团",
    heroSecondary: "联系旅行规划师",
    heroDestinationPrompt: "还没决定先去哪？",
    heroDestinationAction: "浏览中国目的地",
    guidePaths: {
      listLabel: "按当前问题浏览中国旅行指南",
      prompt: "也可以从眼前的问题开始",
      items: [
        {
          id: "stay",
          title: "选住宿区域",
          body: "酒店位置、街区与往返代价",
        },
        {
          id: "transport",
          title: "先把抵达走对",
          body: "机场、火车站与转场",
        },
        {
          id: "plan",
          title: "检查路线节奏",
          body: "城市顺序、天数与行程松紧",
        },
      ],
    },
    planning: {
      eyebrow: "需要时，交给中国本地旅行规划师",
      title: "留下已经安排好的，把难处理的部分交给我们。",
      body:
        "Homeground 是一家提供私人定制行程的中国旅行社。已经订好的机票或酒店不用重来；我们可以统筹整趟旅行，也可以只协助最难处理的一段行程。",
      teamAction: "认识 Homeground 团队",
    },
  },
  ko: {
    heroBody:
      "원하는 여행에 가까운 일정을 고른 뒤, 실제 날짜에 맞춰 조정하세요.",
    heroHeadline: {
      fixedLines: ["중국, 나만의", "방식으로."],
      joiner: " ",
      phrases: [
        "든든하게 함께합니다.",
        "도시와 도시를 자연스럽게 잇습니다.",
        "실제 이동 시간까지 계산합니다.",
        "어려운 부분은 저희가 챙깁니다.",
      ],
    },
    heroPrimary: "중국 프라이빗 투어 비교하기",
    heroSecondary: "여행 플래너와 상담하기",
    heroDestinationPrompt: "아직 어디로 갈지 고민 중인가요?",
    heroDestinationAction: "중국 여행지 둘러보기",
    guidePaths: {
      listLabel: "지금의 결정에 따라 중국 여행 가이드 둘러보기",
      prompt: "지금 고민 중인 항목부터 살펴보세요",
      items: [
        {
          id: "stay",
          title: "숙소 지역 고르기",
          body: "호텔 위치, 동네와 왕복 동선",
        },
        {
          id: "transport",
          title: "도착 동선 확인하기",
          body: "공항, 기차역과 환승",
        },
        {
          id: "plan",
          title: "여행 속도 점검하기",
          body: "도시 순서, 여행 일수와 일정 여유",
        },
      ],
    },
    planning: {
      eyebrow: "필요할 때, 중국 현지 여행 플래너와 함께",
      title: "이미 정한 것은 그대로 두고, 어려운 부분만 맡기세요.",
      body:
        "Homeground는 개인 맞춤형 중국 여행을 설계하는 중국 현지 여행사입니다. 이미 예약한 항공권이나 호텔은 그대로 두고, 여행 전체 또는 가장 까다로운 한 구간만 맡길 수 있습니다.",
      teamAction: "Homeground 팀 만나기",
    },
  },
};

export function getHomepageShowcaseCopy(locale: HomegroundLocale) {
  return copies[locale];
}

export function getHomepageGuidePath(
  locale: HomegroundLocale,
  decision: HomepageGuidePathId,
) {
  return locale === "en"
    ? `/${decision}/`
    : `/${locale}/${decision}/`;
}
