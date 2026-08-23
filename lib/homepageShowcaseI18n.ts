import type { HomegroundLocale } from "./homegroundI18n";

export type HomepageDecisionId =
  | "explore"
  | "stay"
  | "transport"
  | "plan";

interface HomepageShowcaseCopy {
  readonly heroBody: string;
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
  readonly principles: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly teamAction: string;
    readonly items: readonly {
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
      "Practical China travel guides for choosing cities, where to stay and how to connect them—plus a team on the ground when you want help bringing the whole trip together.",
    heroLinksLabel: "Explore Homeground China",
    heroPrimary: "Explore China travel guides",
    heroPrimaryShort: "Explore guides",
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
    principles: {
      eyebrow: "How we judge a route",
      title: "A China trip should work beyond the screen.",
      intro:
        "A useful plan still makes sense after luggage, queues and the last mile are added.",
      teamAction: "Meet the Homeground team",
      items: [
        {
          title: "Plan the whole travel day.",
          body:
            "We count the airport, station, luggage, check-in, queues and last mile—not only the time at the sight.",
        },
        {
          title: "Say what was checked—and when.",
          body:
            "Rules, schedules and booking conditions change. For time-sensitive guidance, we show the review date, cite sources and flag what to check again before travel.",
        },
        {
          title: "Keep one planning thread.",
          body:
            "Cities, stays, transport and daily pace should answer to the same journey—not separate recommendations.",
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
      "先用实用指南选择城市、住宿区域和交通衔接；需要时，再由中国本地旅行规划师帮你把整趟行程串起来。",
    heroLinksLabel: "浏览 Homeground China",
    heroPrimary: "浏览中国旅行指南",
    heroPrimaryShort: "看旅行指南",
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
    principles: {
      eyebrow: "我们如何判断一条路线",
      title: "一趟中国旅行，不能只在屏幕上看起来合理。",
      intro: "真正有用的方案，是把行李、排队和最后一公里算进去后仍然成立。",
      teamAction: "认识 Homeground 团队",
      items: [
        {
          title: "按完整旅行日来安排。",
          body: "不只算景区里的时间，也把机场、车站、行李、入住、排队与最后一公里算进去。",
        },
        {
          title: "说明核对了什么、何时核对。",
          body: "规定、班次和预约条件会变化。对时效性强的指南，我们标明核对日期、列出来源，并提示出发前需要再次确认的内容。",
        },
        {
          title: "整趟行程只用一条逻辑。",
          body: "城市、住宿、交通和每天节奏应服务于同一趟旅行，而不是各说各话。",
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
      "도시와 숙박 지역, 이동 방법을 고를 수 있는 실용 가이드부터, 필요할 때 전체 일정을 연결해 주는 중국 현지 여행 플래너까지 함께합니다.",
    heroLinksLabel: "Homeground China 둘러보기",
    heroPrimary: "중국 여행 가이드 보기",
    heroPrimaryShort: "여행 가이드",
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
    principles: {
      eyebrow: "동선을 판단하는 기준",
      title: "중국 여행은 화면 밖에서도 실제로 성립해야 합니다.",
      intro: "짐, 대기와 마지막 이동까지 더해도 성립하는 일정이 실제로 쓸 수 있는 일정입니다.",
      teamAction: "Homeground 팀 만나기",
      items: [
        {
          title: "여행일 전체를 설계합니다.",
          body: "관광지 안의 시간뿐 아니라 공항, 역, 짐, 체크인, 대기와 마지막 이동까지 함께 봅니다.",
        },
        {
          title: "무엇을 언제 확인했는지 밝힙니다.",
          body: "규정, 운행 일정과 예약 조건은 달라질 수 있습니다. 시의성이 중요한 가이드는 검토 날짜와 출처를 밝히고, 출발 전 다시 확인할 항목을 표시합니다.",
        },
        {
          title: "하나의 여행 흐름을 지킵니다.",
          body: "도시, 숙소, 교통과 하루의 속도가 따로 놀지 않고 같은 여행을 완성해야 합니다.",
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
