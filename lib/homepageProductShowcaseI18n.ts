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
    eyebrow: "Private China Tours",
    title: "A route that works, with every cost made clear.",
    intro: (_productCount) =>
      "No shopping stops and no unlisted extras introduced along the way. Each itinerary clearly sets out the day-by-day plan, accommodation standard, transport, guide arrangements, included admissions and starting price. Once we have your dates, we check current availability and confirm the final inclusions, exclusions and total price in writing before payment.",
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
    eyebrow: "中国私人团",
    title: "路线走得通，费用也说得清。",
    intro: (_productCount) =>
      "不安排购物店，也不把自费项目留到途中才告诉你。每条路线都写清每天怎么玩、住宿标准、交通方式、导游安排、所含门票和基础价格。确定日期后，我们会核对实际余位，并在付款前书面确认最终包含项、不包含项和总价。",
    countLabel: (productCount) => `${productCount} 条路线`,
    durationLabel: (days, nights) => `${days}天 · ${nights}晚`,
    productLabel: "私家行程",
    actionLabel: "查看行程与价格",
    availabilityNote:
      "公开价格按页面所列人数和方案计算；实际日期的可订情况与最终金额，将在付款前书面确认。",
    productListLabel: "Homeground 中国私家旅行产品",
  },
  ko: {
    eyebrow: "중국 단독여행",
    title: "일정도 비용도, 출발 전에 분명하게.",
    intro: (_productCount) =>
      "쇼핑 일정이 없으며, 여행 중 사전에 안내되지 않은 추가 비용을 요구하지 않습니다. 각 상품에는 일자별 일정, 숙박 기준, 이동 방식, 가이드 일정, 포함 입장권과 기준 요금이 명시됩니다. 출발일을 알려 주시면 실제 예약 가능 여부를 확인하고, 결제 전에 최종 포함·불포함 사항과 총액을 서면으로 안내합니다.",
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
