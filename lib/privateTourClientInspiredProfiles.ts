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
    route: l("Beijing · Xi’an · Chengdu · Guilin · Shanghai", "北京 · 西安 · 成都 · 桂林 · 上海", "베이징 · 시안 · 청두 · 계림 · 상하이"),
    appeal: l(
      "The Great Wall, the Terracotta Warriors, pandas, the Li River and Shanghai in one thirteen-day private route.",
      "13 天串起长城、兵马俑、熊猫、漓江山水和上海。",
      "13일 동안 만리장성, 병마용, 판다, 이강 풍경과 상하이를 잇는 프라이빗 코스입니다.",
    ),
    pace: l(
      "Five city bases, linked by two high-speed trains and two domestic flights; times are checked for your dates.",
      "住五座城市，中间两段高铁、两段国内航班；具体班次按出行日期核实。",
      "다섯 도시에 머물며 고속철도 두 구간과 국내선 두 구간으로 이동합니다. 실제 시간표는 날짜에 맞춰 확인합니다.",
    ),
    fit: l(
      "A private party that wants the classic five cities with lunches and tickets included, and the choice of our hotels or their own.",
      "想走经典五城、午餐和门票都含好，酒店可以由我们订也可以自己订的私家团。",
      "점심과 입장권이 포함된 대표 다섯 도시 코스를 원하고, 호텔은 저희 호텔이나 직접 예약 중에서 고르고 싶은 프라이빗 여행객.",
    ),
  },
};
