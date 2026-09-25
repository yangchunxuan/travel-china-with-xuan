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
  },
};

export function getHomepageProductShowcaseCopy(locale: HomegroundLocale) {
  return copies[locale];
}
