import type { HomegroundLocale } from "./homegroundI18n";

export interface ChinaItineraryReviewCopy {
  path: string;
  navigationLabel: string;
  metadata: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    consultation: string;
    tours: string;
    boundary: string;
  };
}

const content = {
  en: {
    title: "Standalone itinerary services have ended",
    lead: "Homeground no longer offers standalone paid route reviews or route builds. You can still enquire about a private China tour and the arrangements your trip needs.",
    eyebrow: "Service update",
    consultation: "Enquire about a private tour",
    tours: "Browse private tours",
    boundary: "The initial enquiry is free. Trip arrangements, inclusions and the quotation are confirmed for your dates and group before booking. Existing accepted services remain subject to their written agreement.",
    navigationLabel: "Travel services",
  },
  zh: {
    title: "独立付费路线服务已停止提供",
    lead: "Homeground 不再提供单独收费的路线审核或路线规划服务。你仍可咨询中国私家团，以及旅程需要的具体安排。",
    eyebrow: "服务更新",
    consultation: "咨询私家团",
    tours: "查看私家团",
    boundary: "初次询价免费。具体安排、包含项和报价会根据日期与同行人数在预订前确认。已经接受的服务仍按原书面约定处理。",
    navigationLabel: "旅行服务",
  },
  ko: {
    title: "별도 유료 일정 서비스가 종료되었습니다",
    lead: "Homeground는 별도로 요금을 받는 일정 검토와 동선 설계 서비스를 더 이상 제공하지 않습니다. 중국 프라이빗 투어와 여행에 필요한 준비는 계속 문의하실 수 있습니다.",
    eyebrow: "서비스 안내",
    consultation: "프라이빗 투어 문의",
    tours: "프라이빗 투어 보기",
    boundary: "첫 문의는 무료입니다. 여행 날짜와 인원에 따른 일정, 포함 사항과 견적은 예약 전에 확인합니다. 이미 수락된 서비스에는 기존 서면 약정이 적용됩니다.",
    navigationLabel: "여행 서비스",
  },
} as const;

export function getChinaItineraryReviewCopy(
  locale: HomegroundLocale,
): ChinaItineraryReviewCopy {
  const copy = content[locale];
  return {
    path: locale === "en" ? "/china-itinerary-review/" : `/${locale}/china-itinerary-review/`,
    navigationLabel: copy.navigationLabel,
    metadata: {
      title: `${copy.title} | Homeground`,
      description: copy.lead,
      openGraphTitle: copy.title,
      openGraphDescription: copy.lead,
    },
    hero: copy,
  };
}

export function getChinaItineraryReviewLanguagePaths(): Record<string, string> {
  return {
    en: "/china-itinerary-review/",
    "zh-Hans": "/zh/china-itinerary-review/",
    ko: "/ko/china-itinerary-review/",
    "x-default": "/china-itinerary-review/",
  };
}
