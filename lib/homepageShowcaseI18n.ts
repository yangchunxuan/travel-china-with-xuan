import type { HomegroundLocale } from "./homegroundI18n";

export type HomepageDecisionId =
  | "explore"
  | "stay"
  | "transport"
  | "plan";

interface HomepageShowcaseCopy {
  readonly heroBody: string;
  readonly heroHeadline: {
    readonly fixedLines: readonly string[];
    readonly joiner: "" | " ";
    readonly phrases: readonly string[];
  };
  readonly heroLinksLabel: string;
  readonly heroPrimary: string;
  readonly heroPrimaryShort: string;
  readonly heroSecondary: string;
  readonly heroSecondaryShort: string;
  readonly decisions: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly listLabel: string;
    readonly cards: readonly {
      readonly id: HomepageDecisionId;
      readonly title: string;
      readonly body: string;
      readonly action: string;
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
      "Choose a city in the Destinations directory, then use practical travel advice for stays, transport and timing—plus a team on the ground when you want help connecting the trip.",
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
    heroLinksLabel: "Explore Homeground China",
    heroPrimary: "Explore China destinations",
    heroPrimaryShort: "Choose a city",
    heroSecondary: "Talk to a trip planner",
    heroSecondaryShort: "Plan my trip",
    decisions: {
      eyebrow: "Plan with real choices",
      title: "Build the trip one decision at a time.",
      intro:
        "Skip the generic must-see list. Start with the choice that changes the day.",
      listLabel: "Choose a China travel planning topic",
      cards: [
        {
          id: "explore",
          title: "Choose the first city",
          body:
            "Compare who each city suits, how many nights it needs and what connects next.",
          action: "Explore destinations",
        },
        {
          id: "stay",
          title: "Choose the right base",
          body:
            "Match a stay area to the days you will walk, the gateway you use and the evenings you want.",
          action: "Compare stay areas",
        },
        {
          id: "transport",
          title: "Choose the right airport or station",
          body:
            "Check which airport, railway station or border crossing your route actually uses before booking.",
          action: "Plan arrivals and transfers",
        },
        {
          id: "plan",
          title: "Check whether the route is too rushed",
          body:
            "Review city order, hotel changes and travel-day downtime before bookings lock the trip in.",
          action: "Build a realistic route",
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
      "先在“目的地”选择城市，再用实用指南解决住宿、交通和出行时间；需要时，由中国本地旅行规划师把整趟行程串起来。",
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
    heroLinksLabel: "浏览 Homeground China",
    heroPrimary: "浏览中国目的地",
    heroPrimaryShort: "选择城市",
    heroSecondary: "联系旅行规划师",
    heroSecondaryShort: "规划行程",
    decisions: {
      eyebrow: "从真实选择开始规划",
      title: "一次解决一个真实选择，把旅程接起来。",
      intro: "不从泛泛的必去榜单开始，而从真正改变一天安排的选择开始。",
      listLabel: "选择中国旅行规划主题",
      cards: [
        {
          id: "explore",
          title: "先选第一座城市",
          body: "比较每座城市适合谁、需要几晚，以及下一站怎么接。",
          action: "浏览城市与目的地",
        },
        {
          id: "stay",
          title: "再选住宿区域",
          body: "按真正会步行的日程、抵达节点和想要的夜晚来选住宿地。",
          action: "比较住宿区域",
        },
        {
          id: "transport",
          title: "选对机场和火车站",
          body: "预订前分清同城不同机场、火车站和口岸，避免走错节点耽误行程。",
          action: "规划抵达与转场",
        },
        {
          id: "plan",
          title: "判断路线会不会太赶",
          body: "预订前检查城市顺序、换酒店次数，以及转场后是否留有缓冲时间。",
          action: "规划可行路线",
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
      "여행지 디렉터리에서 도시를 고른 뒤 숙소, 교통과 시기는 실용 가이드에서 해결하세요. 필요하면 중국 현지 플래너가 전체 일정을 연결합니다.",
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
    heroLinksLabel: "Homeground China 둘러보기",
    heroPrimary: "중국 여행지 보기",
    heroPrimaryShort: "도시 선택",
    heroSecondary: "여행 플래너와 상담하기",
    heroSecondaryShort: "여행 계획",
    decisions: {
      eyebrow: "실제 선택부터 계획하기",
      title: "하나의 실제 결정씩, 여행을 완성하세요.",
      intro: "막연한 필수 명소 목록 대신, 실제 하루를 바꾸는 선택부터 시작합니다.",
      listLabel: "중국 여행 계획 주제 선택",
      cards: [
        {
          id: "explore",
          title: "첫 도시 고르기",
          body: "각 도시가 누구에게 맞는지, 며칠이 필요한지, 다음 도시와 어떻게 이어지는지 비교합니다.",
          action: "도시·여행지 보기",
        },
        {
          id: "stay",
          title: "숙소 지역 고르기",
          body: "실제로 걸을 일정, 도착 지점과 원하는 저녁 시간에 맞춰 숙소 지역을 고릅니다.",
          action: "숙소 지역 비교하기",
        },
        {
          id: "transport",
          title: "맞는 공항·기차역 고르기",
          body: "예약 전에 실제 이용할 공항, 기차역 또는 육로 출입국 지점을 확인해 이동일의 실수를 줄입니다.",
          action: "도착·환승 계획하기",
        },
        {
          id: "plan",
          title: "일정이 너무 빠듯한지 확인하기",
          body: "예약을 확정하기 전에 도시 순서, 숙소 변경 횟수와 이동 후 여유 시간을 확인합니다.",
          action: "무리 없는 일정 만들기",
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

export function getHomepageDecisionPath(
  locale: HomegroundLocale,
  decision: HomepageDecisionId,
) {
  return locale === "en"
    ? `/${decision}/`
    : `/${locale}/${decision}/`;
}
