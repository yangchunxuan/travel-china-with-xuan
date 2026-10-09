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
};
