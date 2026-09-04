import type { HomegroundLocale } from "./homegroundI18n";

export interface HomepageProductShowcaseCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly titleNoWrap?: string;
  readonly intro: (productCount: number) => string;
  readonly countLabel: (productCount: number) => string;
  readonly durationLabel: (days: number, nights: number) => string;
  readonly productLabel: string;
  readonly actionLabel: string;
  readonly hubActionLabel: string;
  readonly productListLabel: string;
}

const copies: Record<HomegroundLocale, HomepageProductShowcaseCopy> = {
  en: {
    eyebrow: "Featured private journeys",
    title: "A workable route, with the scope and final price clear before you pay.",
    intro: (_productCount) =>
      "See the day-by-day route, stays, transport and published starting price.",
    countLabel: (productCount) => `${productCount} journeys`,
    durationLabel: (days, nights) =>
      `${days} ${days === 1 ? "day" : "days"} · ${nights} ${nights === 1 ? "night" : "nights"}`,
    productLabel: "Private tour",
    actionLabel: "View itinerary and prices",
    hubActionLabel: "Compare all our private China tours",
    productListLabel: "Homeground China private tours",
  },
  zh: {
    eyebrow: "精选私家行程",
    title: "路线走得通，付款前把范围和价格写清楚。",
    titleNoWrap: "付款前",
    intro: (_productCount) =>
      "每天怎么走、住哪里、如何转场和公开起价，都写在路线里。",
    countLabel: (productCount) => `${productCount} 条路线`,
    durationLabel: (days, nights) => `${days}天 · ${nights}晚`,
    productLabel: "私家行程",
    actionLabel: "查看行程与价格",
    hubActionLabel: "查看并比较全部中国私家团",
    productListLabel: "Homeground 中国私家旅行产品",
  },
  ko: {
    eyebrow: "추천 프라이빗 여정",
    title: "일정은 현실적으로, 포함 범위와 최종 금액은 결제 전에 명확하게.",
    intro: (_productCount) =>
      "일자별 동선, 숙박, 이동과 공개 시작가를 한눈에 비교하세요.",
    countLabel: (productCount) => `${productCount}개 일정`,
    durationLabel: (days, nights) => `${days}일 · ${nights}박`,
    productLabel: "프라이빗 투어",
    actionLabel: "일정과 요금 보기",
    hubActionLabel: "중국 프라이빗 투어 전체 비교하기",
    productListLabel: "Homeground China 프라이빗 투어",
  },
};

export function getHomepageProductShowcaseCopy(locale: HomegroundLocale) {
  return copies[locale];
}
