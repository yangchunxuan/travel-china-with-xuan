import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { formatPrivateGuidePrice, privateGuideRates, privateGuideServicePath, type PrivateGuideCity } from "./privateGuideServices.ts";

/**
 * Guides whose readers are deciding how to see one city's sights, mapped to
 * that city's private guide service. Only cities the guide service covers are
 * listed (privateGuideCities); a guide outside them gets no guide CTA.
 */
export const privateGuideServiceCtaTargets = {
  "forbidden-city-for-foreign-visitors": "beijing",
  "temple-of-heaven-gates-and-ritual-sequence": "beijing",
  "summer-palace-gates-route-and-boat-plan": "beijing",
  "beijing-to-mutianyu-great-wall-transfer": "beijing",
  "terracotta-warriors-without-tour": "xian",
  "shaanxi-history-museum-booking-and-collection-plan": "xian",
  "xian-city-wall-tickets-gates-walk-or-bike": "xian",
  "shanghai-museum-east-entry-reservations": "shanghai",
  "zhangjiajie-national-forest-park-tickets-and-entrances": "zhangjiajie",
  "tianmen-mountain-tickets-and-routes": "zhangjiajie",
  // The "do I need a guide?" decision guide covers every city the service does.
  "do-you-need-a-tour-guide-in-china": "all",
} as const satisfies Record<string, PrivateGuideCity | "all">;

const copy = {
  en: {
    label: "Private guide service",
    title: "Add a licensed English-speaking guide in {city}",
    body: "{rate} per guide for up to eight hours, guide only. Transport, admission tickets and meals are confirmed separately in your written quote.",
    action: "See the guide service",
  },
  zh: {
    label: "私人导游服务",
    title: "在{city}加一位持证英文导游",
    body: "每位导游{rate}，最多 8 小时，只含导游。交通、门票和餐食在书面报价里另行确认。",
    action: "查看导游服务",
  },
  ko: {
    label: "프라이빗 가이드 서비스",
    title: "{city}에서 자격증 보유 한국어 가이드 추가",
    body: "가이드 1명당 {rate}, 최대 8시간이며 가이드 서비스만 포함됩니다. 교통, 입장권, 식사는 서면 견적에서 따로 확인합니다.",
    action: "가이드 서비스 보기",
  },
} as const satisfies Record<HomegroundLocale, { label: string; title: string; body: string; action: string }>;

/** The same offer when the guide is not about one city: all four cities and their rates. */
const allCitiesCopy = {
  en: {
    title: "Hire a licensed English-speaking guide in Beijing, Shanghai, Xi’an or Zhangjiajie",
    body: "{low} per guide for up to eight hours in Xi’an and Zhangjiajie, {high} in Beijing and Shanghai. Guide only: transport, admission tickets and meals are confirmed separately in your written quote.",
  },
  zh: {
    title: "在北京、上海、西安或张家界请一位持证英文导游",
    body: "西安、张家界每位导游{low}，北京、上海{high}，最多 8 小时，只含导游。交通、门票和餐食在书面报价里另行确认。",
  },
  ko: {
    title: "베이징·상하이·시안·장가계에서 자격증 보유 한국어 가이드 이용",
    body: "가이드 1명당 최대 8시간 기준 시안·장가계 {low}, 베이징·상하이 {high}이며 가이드 서비스만 포함됩니다. 교통, 입장권, 식사는 서면 견적에서 따로 확인합니다.",
  },
} as const satisfies Record<HomegroundLocale, { title: string; body: string }>;

const cityNames: Record<HomegroundLocale, Record<PrivateGuideCity, string>> = {
  en: { beijing: "Beijing", shanghai: "Shanghai", xian: "Xi’an", zhangjiajie: "Zhangjiajie" },
  zh: { beijing: "北京", shanghai: "上海", xian: "西安", zhangjiajie: "张家界" },
  ko: { beijing: "베이징", shanghai: "상하이", xian: "시안", zhangjiajie: "장가계" },
};

export function getGuideServiceCta(guideId: string, locale: HomegroundLocale) {
  const target = (privateGuideServiceCtaTargets as Record<string, PrivateGuideCity | "all">)[guideId];
  if (!target) return null;
  const text = copy[locale];
  if (target === "all") {
    const rates = Object.values(privateGuideRates).map((rate) => rate.standardCny);
    const fill = (template: string) =>
      template
        .replace("{low}", formatPrivateGuidePrice(Math.min(...rates), locale))
        .replace("{high}", formatPrivateGuidePrice(Math.max(...rates), locale));
    return {
      city: "all" as const,
      label: text.label,
      title: allCitiesCopy[locale].title,
      body: fill(allCitiesCopy[locale].body),
      action: text.action,
      href: privateGuideServicePath[locale],
    };
  }
  const city = target;
  const fill = (template: string) =>
    template
      .replace("{city}", cityNames[locale][city])
      .replace("{rate}", formatPrivateGuidePrice(privateGuideRates[city].standardCny, locale));
  return {
    city,
    label: text.label,
    title: fill(text.title),
    body: fill(text.body),
    action: text.action,
    // The service page's city cards carry id={city}, so the link lands on the right rate.
    href: `${privateGuideServicePath[locale]}#${city}`,
  };
}
