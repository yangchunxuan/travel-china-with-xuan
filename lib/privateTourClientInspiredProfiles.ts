import type { HomegroundLocale } from "./homegroundI18n";

type LocalizedText = Readonly<Record<HomegroundLocale, string>>;
type ComparisonProfile = Readonly<{
  route: LocalizedText;
  appeal: LocalizedText;
  pace: LocalizedText;
  fit: LocalizedText;
}>;

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });

/** These describe two distinct routes; no client-specific fare or availability is implied. */
export const privateTourClientInspiredProfiles: Readonly<Record<string, ComparisonProfile>> = {
  "suzhou-tongli-hangzhou-shanghai-12-day-private-tour": {
    route: l("Suzhou · Tongli · Hangzhou · Shanghai", "苏州 · 同里 · 杭州 · 上海", "쑤저우 · 퉁리 · 항저우 · 상하이"),
    appeal: l(
      "Explore Suzhou gardens, stay in Tongli water town, visit West Lake and tea country, then spend five nights discovering Shanghai’s neighborhoods and museums.",
      "从苏州园林、同里水乡到西湖茶乡，最后在上海连住五晚，慢慢看街区与博物馆。",
      "쑤저우 정원과 퉁리 수향마을, 서호와 차 산지를 거쳐 상하이에서 5박하며 동네와 박물관을 둘러봅니다.",
    ),
    pace: l(
      "Twelve days with four bases; Shanghai has a free day and Suzhou receives more time than on the shorter Jiangnan route.",
      "12 天分四处住宿；上海留有自由活动日，苏州停留也比短线更充分。",
      "12일 동안 네 곳에 머물며 상하이 자유 일정 하루와 짧은 강남 코스보다 넉넉한 쑤저우 시간을 둡니다.",
    ),
    fit: l(
      "Travellers who prefer gardens, water-town life and cultural detail over a fast city checklist.",
      "想深入园林、水乡与城市文化，而非快速打卡多座城市的旅客。",
      "여러 도시를 서둘러 찍기보다 정원, 수향마을과 도시 문화에 시간을 쓰고 싶은 여행자.",
    ),
  },
  "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour": {
    route: l("Beijing · Xi’an · Chengdu · Guilin · Shanghai", "北京 · 西安 · 成都 · 桂林 · 上海", "베이징 · 시안 · 청두 · 구이린 · 상하이"),
    appeal: l(
      "Link the Great Wall, Terracotta Warriors, pandas, Li River scenery and Shanghai in a thirteen-day private route.",
      "13 天串联长城、兵马俑、熊猫、漓江山水与上海，可按人数和日期定制。",
      "13일 동안 만리장성, 병마용, 판다, 이강 풍경과 상하이를 잇는 프라이빗 코스입니다.",
    ),
    pace: l(
      "Five city bases with two high-speed trains and two domestic flights in the proposed route; departures and connections are checked for your dates.",
      "五城住宿，拟安排两段高铁和两段境内航班；具体班次按出行日期核实。",
      "다섯 도시를 숙박 거점으로 하고 고속열차 두 구간과 국내선 항공 두 구간을 계획합니다. 실제 시간표는 날짜별로 확인합니다.",
    ),
    fit: l(
      "A private party seeking a classic five-city China overview in fewer days than the existing fourteen-day version.",
      "想以私家团走经典中国五城、时间比现有 14 天版本少一天的旅客。",
      "기존 14일 코스보다 하루 짧게 중국의 대표 다섯 도시를 둘러보고 싶은 프라이빗 여행객.",
    ),
  },
};
