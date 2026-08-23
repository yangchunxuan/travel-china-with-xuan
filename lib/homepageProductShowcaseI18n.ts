import type { HomegroundLocale } from "./homegroundI18n";

export interface HomepageProductShowcaseCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: (productCount: number) => string;
  readonly countLabel: (productCount: number) => string;
  readonly durationLabel: (days: number, nights: number) => string;
  readonly productLabel: string;
  readonly actionLabel: string;
  readonly availabilityNote: string;
  readonly productListLabel: string;
}

const copies: Record<HomegroundLocale, HomepageProductShowcaseCopy> = {
  en: {
    eyebrow: "Private tours in China",
    title: "Choose the route that fits your trip.",
    intro: (productCount) =>
      `Compare ${productCount} private journeys across China. Each page sets out the duration, stays, transport, day-by-day plan and published prices. Choose a route, then we confirm rooms, vehicle and admissions for your dates.`,
    countLabel: (productCount) => `${productCount} journeys`,
    durationLabel: (days, nights) =>
      `${days} ${days === 1 ? "day" : "days"} · ${nights} ${nights === 1 ? "night" : "nights"}`,
    productLabel: "Private tour",
    actionLabel: "View itinerary and prices",
    availabilityNote:
      "Published prices apply to the stated group sizes and options. Availability and the final total for your dates are confirmed in writing before payment.",
    productListLabel: "Homeground China private tours",
  },
  zh: {
    eyebrow: "中国私家旅行产品",
    title: "选一条适合你的路线。",
    intro: (productCount) =>
      `这里有 ${productCount} 条可以直接比较的私家路线。每一页都写清天数、住宿、交通、每日安排和公开价格；选中之后，再按真实日期核对房间、车辆和门票。`,
    countLabel: (productCount) => `${productCount} 条路线`,
    durationLabel: (days, nights) => `${days}天 · ${nights}晚`,
    productLabel: "私家行程",
    actionLabel: "查看行程与价格",
    availabilityNote:
      "公开价格按页面所列人数和方案计算；实际日期的可订情况与最终金额，将在付款前书面确认。",
    productListLabel: "Homeground 中国私家旅行产品",
  },
  ko: {
    eyebrow: "중국 프라이빗 투어",
    title: "내 여행에 맞는 코스를 골라 보세요.",
    intro: (productCount) =>
      `중국 각지를 잇는 ${productCount}개의 프라이빗 일정을 한눈에 비교할 수 있습니다. 각 페이지에 기간, 숙박, 이동, 날짜별 일정과 공개 요금을 명확히 안내하며, 코스를 고르면 실제 날짜의 객실, 차량과 입장권을 확인합니다.`,
    countLabel: (productCount) => `${productCount}개 일정`,
    durationLabel: (days, nights) => `${days}일 · ${nights}박`,
    productLabel: "프라이빗 투어",
    actionLabel: "일정과 요금 보기",
    availabilityNote:
      "표시 요금은 명시된 인원과 옵션을 기준으로 합니다. 실제 날짜의 예약 가능 여부와 최종 금액은 결제 전 서면으로 확인합니다.",
    productListLabel: "Homeground China 프라이빗 투어",
  },
};

export function getHomepageProductShowcaseCopy(locale: HomegroundLocale) {
  return copies[locale];
}
