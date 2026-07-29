import type { HomegroundLocale } from "./homegroundI18n";

/**
 * Copy for the redesigned "how much of the trip you hand over" section.
 *
 * Each locale is written natively rather than translated line for line: the
 * English runs on em-dashes and long clauses, the Chinese on short clauses
 * broken by 、and ；, the Korean on keep-all phrases sized for word-break.
 * Sentence counts therefore differ on purpose.
 *
 * Every block is budgeted in rendered lines, not characters, because a
 * character count is not comparable across these three scripts. The section
 * targets 13 lines at desktop width in all three languages.
 */
export interface PlanningScopeCopy {
  htmlLang: string;
  eyebrow: string;
  title: string;
  /**
   * Where the headline breaks, decided per language rather than left to the
   * browser: English breaks on the em dash, Chinese and Korean after the
   * comma. Concatenating the lines reproduces `title` exactly.
   *
   * A `|` marks an extra break opportunity (rendered as <wbr>, no text) for
   * narrow screens. Chinese needs one: word-break:keep-all makes a clause an
   * unbreakable run, so without it a phone drops the closing 。 onto a line of
   * its own, which Chinese typesetting does not allow.
   */
  titleLines: readonly string[];
  /**
   * Kept, but no longer rendered. The standfirst restated the headline without
   * carrying any of the five things this section has to say, and it cost two
   * lines in every language, so it was cut from the layout on 2026-07-29.
   */
  lead: string;
  leadLines: readonly string[];
  /** "" for Chinese, " " for the languages that separate words with spaces. */
  lineJoin: string;
  options: readonly {
    label: string;
    detail: string;
    detailLines: readonly string[];
  }[];
  keepNote: string;
  keepNoteLines: readonly string[];
  imageAlt: string;
  imageCaption: string;
  exampleEyebrow: string;
  exampleTitle: string;
  exampleRows: readonly {
    term: string;
    detail: string;
  }[];
  exampleNote: string;
  beforePayLabel: string;
  beforePay: string;
}

export const planningScopeCopy: Record<HomegroundLocale, PlanningScopeCopy> = {
  en: {
    htmlLang: "en",
    eyebrow: "You set the scope",
    title: "Hand us the whole trip—or only the hardest parts.",
    titleLines: ["Hand us the whole trip—", "or only the hardest parts."],
    lead: "Same planner, same trip. Only the amount you hand over changes.",
    leadLines: [
      "Same planner, same trip.",
      "Only the amount you hand over changes.",
    ],
    lineJoin: " ",
    options: [
      {
        label: "The whole trip",
        detail:
          "Route, where you sleep, how you move between cities, the reservations, and a pace your group can keep.",
        detailLines: [
          "Route, where you sleep, how you move between cities,",
          "the reservations, and a pace your group can keep.",
        ],
      },
      {
        label: "Only the hardest parts",
        detail:
          "The transfer that never works. The city you can't place. The day that collapses under its own plan.",
        detailLines: [
          "The transfer that never works. The city you can't place.",
          "The day that collapses under its own plan.",
        ],
      },
    ],
    keepNote:
      "Flights, hotels and the days you want to yourself stay exactly as booked.",
    keepNoteLines: [
      "Flights, hotels and the days you want to yourself stay exactly as booked.",
    ],
    imageAlt:
      "Small wooden boats crossing a misty lake in Hangzhou, with layered green hills behind",
    imageCaption: "Hangzhou, West Lake",
    exampleEyebrow: "One day, in detail",
    exampleTitle: "Trips go wrong on arrival day.",
    exampleRows: [
      {
        term: "You booked",
        detail: "Shanghai → Hangzhou by train. Kept.",
      },
      {
        term: "The hard part",
        detail:
          "Which station you land at, how long door-to-door takes, which area puts West Lake and Lingyin in reach, what time you leave next morning. Each one looks fine alone.",
      },
      {
        term: "So the day",
        detail:
          "Arrival stays light. West Lake and Lingyin get half a day each. No one races a train.",
      },
    ],
    exampleNote: "Not a fixed package — every trip answers this differently.",
    beforePayLabel: "Before any paid work",
    beforePay:
      "Scope, fee and responsibilities agreed first. Live prices stay marked unconfirmed.",
  },
  zh: {
    htmlLang: "zh-Hans",
    eyebrow: "帮到哪一步，你说了算",
    title: "整趟旅行交给我们，或只让我们处理最难的部分。",
    titleLines: ["整趟旅行交给我们，", "或只让我们|处理最难的部分。"],
    lead: "同一位规划师，同一趟旅行，区别只在你交出多少。",
    leadLines: ["同一位规划师，同一趟旅行，", "区别只在你交出多少。"],
    lineJoin: "",
    options: [
      {
        label: "整趟交给我们",
        detail:
          "路线、住哪一片、城市之间怎么走、要提前订的部分，还有一家人真的走得动的节奏。",
        detailLines: [
          "路线、住哪一片、城市之间怎么走、",
          "要提前订的部分，还有一家人真的走得动的节奏。",
        ],
      },
      {
        label: "只交最难的部分",
        detail: "接不顺的一段转场、放不进行程的一座城、硬排下来就散掉的那一天。",
        detailLines: [
          "接不顺的一段转场、放不进行程的一座城、",
          "硬排下来就散掉的那一天。",
        ],
      },
    ],
    keepNote: "已订好的机票、酒店和你想自己安排的日子，都不动。",
    keepNoteLines: ["已订好的机票、酒店和你想自己安排的日子，都不动。"],
    imageAlt: "杭州薄雾中的湖面上，两艘木船驶过远处层叠的青山",
    imageCaption: "杭州 · 西湖",
    exampleEyebrow: "拿一天出来说",
    exampleTitle: "旅行最容易散掉的，是抵达那天。",
    exampleRows: [
      {
        term: "你订好的",
        detail: "上海 → 杭州的高铁。不动。",
      },
      {
        term: "难在哪",
        detail:
          "到杭州东站还是城站，出站到酒店多久，住哪一片够得着西湖和灵隐，第二天几点的车。每一件单看都没问题。",
      },
      {
        term: "于是",
        detail: "抵达日不塞满，西湖和灵隐各占半天，早上不用赶车。",
      },
    ],
    exampleNote: "不是固定产品，每趟答案都不同。",
    beforePayLabel: "开始付费之前",
    beforePay: "先谈定范围、费用和责任；实时价格和余位，确认前不写成已定。",
  },
  ko: {
    htmlLang: "ko",
    eyebrow: "어디까지 맡길지는 여행자가 정합니다",
    title: "여행 전체를 맡기거나, 가장 어려운 부분만 맡기세요.",
    // Trailing space keeps the concatenated text identical to `title`; a
    // trailing space at the end of a block box never renders.
    titleLines: ["여행 전체를 맡기거나, ", "가장 어려운 부분만 맡기세요."],
    lead: "같은 플래너, 같은 여행입니다. 맡기는 범위만 달라집니다.",
    leadLines: ["같은 플래너, 같은 여행입니다.", "맡기는 범위만 달라집니다."],
    lineJoin: " ",
    options: [
      {
        label: "여행 전체",
        detail:
          "동선, 어느 동네에 머물지, 도시 사이 이동, 예약, 그리고 일행이 감당할 하루의 속도.",
        detailLines: [
          "동선, 어느 동네에 머물지, 도시 사이 이동, 예약,",
          "그리고 일행이 감당할 하루의 속도.",
        ],
      },
      {
        label: "가장 어려운 부분만",
        detail:
          "이어지지 않는 환승, 자리를 못 잡는 도시, 그대로 두면 무너지는 하루.",
        detailLines: [
          "이어지지 않는 환승, 자리를 못 잡는 도시,",
          "그대로 두면 무너지는 하루.",
        ],
      },
    ],
    keepNote: "이미 예약한 항공편과 숙소, 혼자 보내고 싶은 날은 그대로 둡니다.",
    keepNoteLines: [
      "이미 예약한 항공편과 숙소, 혼자 보내고 싶은 날은 그대로 둡니다.",
    ],
    imageAlt: "안개 낀 항저우 호수 위를 지나는 나룻배와 겹겹이 이어진 푸른 산",
    imageCaption: "항저우 · 서호",
    exampleEyebrow: "하루만 놓고 보면",
    exampleTitle: "여행은 도착하는 날에 어긋납니다.",
    exampleRows: [
      {
        term: "예약하신 것",
        detail: "상하이 → 항저우 열차. 그대로 둡니다.",
      },
      {
        term: "어려운 지점",
        detail:
          "어느 역에 내리는지, 숙소까지 몇 분인지, 서호와 링인사에 모두 닿는 숙소는 어디인지, 다음 날 몇 시 열차인지. 하나씩 보면 다 괜찮습니다.",
      },
      {
        term: "그래서",
        detail:
          "도착일은 가볍게. 서호와 링인사는 반나절씩. 열차를 쫓지 않습니다.",
      },
    ],
    exampleNote: "고정 패키지가 아닙니다 — 여행마다 답이 다릅니다.",
    beforePayLabel: "유료 작업 전에",
    beforePay:
      "범위와 비용, 책임을 먼저 합의합니다. 실시간 가격은 확인 전까지 구분해 둡니다.",
  },
};

export function getPlanningScopeCopy(
  locale: HomegroundLocale,
): PlanningScopeCopy {
  return planningScopeCopy[locale];
}
