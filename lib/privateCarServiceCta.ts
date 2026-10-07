import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { privateCarServicePath } from "./privateCarServices.ts";

/** Transport decisions with a direct use for a separately quoted car. */
export const privateCarServiceCtaTargets = [
  "beijing-to-mutianyu-great-wall-transfer",
  "beijing-south-station-to-capital-or-daxing-airport",
  "guilin-airport-or-railway-station-arrival-guide",
] as const;

const copy = {
  en: {
    label: "Private car and driver",
    title: "Need a private car for this journey?",
    body: "Send your route, date, passengers and luggage for a separate quote. Vehicle and driver availability, pickup details and total cost are confirmed before payment. Guides and attraction tickets are separate arrangements.",
    action: "Ask about a car and driver",
  },
  zh: {
    label: "包车与接送",
    title: "这段路需要单独安排车辆吗？",
    body: "提供路线、日期、人数和行李，按需求单独报价。付款前确认车辆与司机可用情况、接送细节和总价；导游与景点门票另行安排。",
    action: "咨询包车与接送",
  },
  ko: {
    label: "차량·기사 및 픽업·샌딩",
    title: "이 구간에 프라이빗 차량이 필요하세요?",
    body: "경로, 날짜, 인원과 짐을 알려주시면 별도로 견적을 확인합니다. 결제 전에 차량·기사 이용 가능 여부, 승하차 장소와 총액을 확인하며 가이드와 관광지 입장권은 별도입니다.",
    action: "차량·기사 서비스 문의",
  },
} as const;

export function getPrivateCarServiceCta(guideId: string, locale: HomegroundLocale) {
  if (!(privateCarServiceCtaTargets as readonly string[]).includes(guideId)) return null;
  return { ...copy[locale], href: privateCarServicePath[locale] };
}
