import type { HomegroundLocale } from "./homegroundI18n";

export interface HomepageProductShowcaseCopy {
  readonly eyebrow: string;
  readonly title: string;
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
      "Start with a published itinerary showing the day-by-day route, accommodation plan, transport, guide arrangements, included tickets and starting price. Once we have your dates, we check availability and confirm the final inclusions, exclusions and total in writing before payment. There are no shopping stops; any optional upgrade or added service is agreed before it is charged.",
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
    intro: (_productCount) =>
      "先从公开路线查看每天怎么走、住宿安排、交通、导游、所含门票和起价。确定日期后，我们会核对可订情况，并在付款前书面确认最终包含项、不包含项和总价。行程不安排购物店；任何升级或新增服务，都会在收费前先由你确认。",
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
      "공개 일정에서 동선, 숙박 기준, 이동 방식, 가이드 일정, 포함 입장권과 시작가를 먼저 확인하세요. 출발일을 알려 주시면 예약 가능 여부를 확인하고, 결제 전에 최종 포함·불포함 사항과 총액을 서면으로 안내합니다. 쇼핑 일정은 없으며, 선택 업그레이드나 추가 서비스는 비용이 발생하기 전에 먼저 동의를 받습니다.",
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
