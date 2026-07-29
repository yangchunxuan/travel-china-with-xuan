import type { HomegroundLocale } from "./homegroundI18n";

export interface PlanningScopeCopy {
  htmlLang: string;
  title: string;
  /**
   * Authored wide-screen lines. A `|` adds an extra narrow-screen break
   * opportunity without changing the sentence read by assistive technology.
   */
  titleLines: readonly string[];
  body: string;
  values: readonly [string, string, string];
  cta: string;
}

export const planningScopeCopy: Record<HomegroundLocale, PlanningScopeCopy> = {
  en: {
    htmlLang: "en",
    title: "A China trip that works from start to finish.",
    titleLines: ["A China trip that works ", "from start to finish."],
    body:
      "We plan the city order, hotel areas, transport between cities, reservations and daily pace around your dates, interests and the people travelling with you.",
    values: [
      "Cities that fit your time",
      "Connections that make sense",
      "A pace that works for your group",
    ],
    cta: "Contact a trip planner",
  },
  zh: {
    htmlLang: "zh-Hans",
    title: "让整趟中国旅行，从头到尾都安排得顺。",
    titleLines: ["让整趟中国旅行，", "从头到尾都|安排得顺。"],
    body:
      "我们根据你的日期、兴趣和同行人，统筹城市顺序、住宿区域、城际交通、预约和每天节奏。",
    values: [
      "城市与天数匹配",
      "城市之间衔接合理",
      "每天节奏适合同行人",
    ],
    cta: "联系旅行规划师",
  },
  ko: {
    htmlLang: "ko",
    title: "중국 여행 전체가 처음부터 끝까지 순조롭게 이어지도록.",
    titleLines: [
      "중국 여행 전체가 처음부터 끝까지 ",
      "순조롭게 이어지도록.",
    ],
    body:
      "여행 날짜와 관심사, 일행에 맞춰 도시 순서, 숙소 지역, 도시 간 이동, 예약과 하루 일정을 함께 계획합니다.",
    values: [
      "일정에 맞는 도시와 체류 기간",
      "자연스럽게 이어지는 도시 간 이동",
      "일행에게 맞는 하루 일정",
    ],
    cta: "여행 플래너에게 문의하기",
  },
};

export function getPlanningScopeCopy(
  locale: HomegroundLocale,
): PlanningScopeCopy {
  return planningScopeCopy[locale];
}
