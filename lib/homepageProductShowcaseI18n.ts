import type { HomegroundLocale } from "./homegroundI18n";

export interface HomepageProductShowcaseCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: (productCount: number) => string;
  readonly countLabel: (productCount: number) => string;
  readonly durationLabel: (days: number, nights: number) => string;
  readonly productLabel: string;
  readonly startingPriceLabel: string;
  readonly perPersonLabel: string;
  readonly groupBasis: (travelers: number) => string;
  readonly actionLabel: string;
  readonly hubActionLabel: string;
  readonly productListLabel: string;
  readonly trustListLabel: string;
  readonly trustItems: readonly {
    readonly title: string;
    readonly body: string;
  }[];
  readonly enquiryEyebrow: string;
  readonly enquiryTitle: string;
  readonly enquiryBody: string;
  readonly enquiryAction: string;
}

const copies: Record<HomegroundLocale, HomepageProductShowcaseCopy> = {
  en: {
    eyebrow: "Featured private journeys",
    title: "Journeys from ancient capitals to karst rivers.",
    intro: (_productCount) =>
      "Compare day-by-day routes and prices, then open the journey that feels like yours.",
    countLabel: (productCount) => `${productCount} journeys`,
    durationLabel: (days, nights) =>
      `${days} ${days === 1 ? "day" : "days"} · ${nights} ${nights === 1 ? "night" : "nights"}`,
    productLabel: "Private tour",
    startingPriceLabel: "Published starting price",
    perPersonLabel: "per person",
    groupBasis: (travelers) => `${travelers}-traveller basis`,
    actionLabel: "Explore this journey",
    hubActionLabel: "Compare every private China tour",
    productListLabel: "Homeground China private tours",
    trustListLabel: "What every published Homeground route makes clear",
    trustItems: [
      {
        title: "Your time stays yours",
        body: "No shopping stops are scheduled.",
      },
      {
        title: "Routes and prices first",
        body: "See the daily plan and published starting price before enquiring.",
      },
      {
        title: "Then tailor it to your dates",
        body: "Choose a route first; we check it against your dates before booking.",
      },
    ],
    enquiryEyebrow: "Have a journey in mind?",
    enquiryTitle: "Share your travel dates and destinations.",
    enquiryBody: "Start with the route you like and tell us what you would change.",
    enquiryAction: "Plan this trip with us",
  },
  zh: {
    eyebrow: "精选私家行程",
    title: "从古都城墙，到喀斯特山水。",
    intro: (_productCount) =>
      "看每天的节奏与公开起价，再打开最像你想要的那一条。",
    countLabel: (productCount) => `${productCount} 条路线`,
    durationLabel: (days, nights) => `${days}天 · ${nights}晚`,
    productLabel: "私家行程",
    startingPriceLabel: "公开起价",
    perPersonLabel: "每人",
    groupBasis: (travelers) => `按 ${travelers} 人同行`,
    actionLabel: "走进这条路线",
    hubActionLabel: "比较全部中国私家团",
    productListLabel: "Homeground 中国私家旅行产品",
    trustListLabel: "每条 Homeground 正式路线都会写清楚的事",
    trustItems: [
      {
        title: "时间留给旅行",
        body: "行程不安排购物店。",
      },
      {
        title: "路线和价格先看",
        body: "咨询前就能查看每日安排与公开起价。",
      },
      {
        title: "再按真实日期调整",
        body: "先选路线，预订前再核对日期与可订情况。",
      },
    ],
    enquiryEyebrow: "已经有接近的路线？",
    enquiryTitle: "把日期和想去的地方告诉我们。",
    enquiryBody: "从你喜欢的路线开始，也可以直接说想改哪里。",
    enquiryAction: "和我们一起规划",
  },
  ko: {
    eyebrow: "추천 프라이빗 여정",
    title: "옛 수도에서 카르스트 절경까지.",
    intro: (_productCount) =>
      "매일의 일정과 시작가를 비교한 뒤, 마음에 드는 여행을 자세히 보세요.",
    countLabel: (productCount) => `${productCount}개 일정`,
    durationLabel: (days, nights) => `${nights}박 ${days}일`,
    productLabel: "프라이빗 투어",
    startingPriceLabel: "시작가",
    perPersonLabel: "1인",
    groupBasis: (travelers) => `${travelers}인 기준`,
    actionLabel: "이 여정 살펴보기",
    hubActionLabel: "중국 프라이빗 투어 전체 비교하기",
    productListLabel: "Homeground China 프라이빗 투어",
    trustListLabel: "Homeground 프라이빗 투어에서 먼저 확인할 수 있는 내용",
    trustItems: [
      {
        title: "여행만을 위한 시간",
        body: "쇼핑 매장 방문 일정은 넣지 않습니다.",
      },
      {
        title: "동선과 가격부터",
        body: "문의 전에 일자별 일정과 시작가를 확인하세요.",
      },
      {
        title: "내 날짜에 맞춰 완성",
        body: "마음에 드는 일정을 고른 뒤, 예약 전에 출발일과 예약 가능 여부를 확인합니다.",
      },
    ],
    enquiryEyebrow: "마음에 드는 여정이 있나요?",
    enquiryTitle: "여행 날짜와 가고 싶은 곳을 알려 주세요.",
    enquiryBody: "원하는 여정을 고르고, 바꾸고 싶은 부분도 적어 주세요.",
    enquiryAction: "함께 여행 계획하기",
  },
};

export function getHomepageProductShowcaseCopy(locale: HomegroundLocale) {
  return copies[locale];
}
