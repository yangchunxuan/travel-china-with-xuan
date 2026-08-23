import type { HomegroundLocale } from "./homegroundI18n";

export interface HomepageProductShowcaseCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly productLabel: string;
  readonly featuredTitle: string;
  readonly featuredSubtitle: string;
  readonly featuredMeta: string;
  readonly guideLabel: string;
  readonly guideHeading: string;
  readonly guideIntro: string;
  readonly guideListLabel: string;
}

const copies: Record<HomegroundLocale, HomepageProductShowcaseCopy> = {
  en: {
    eyebrow: "Ways to travel",
    title: "Start with a journey, then make it yours.",
    intro:
      "Explore our four-day private Zhangjiajie route, or use a destination guide to shape your next trip.",
    productLabel: "Private journey",
    featuredTitle: "Zhangjiajie in 4 days",
    featuredSubtitle:
      "Stone peaks, the Glass Bridge and Tianmen Mountain",
    featuredMeta: "4 days · 3 nights · 3 sightseeing days",
    guideLabel: "Travel guide",
    guideHeading: "More ways to begin",
    guideIntro: "Destination guides for choosing what comes next.",
    guideListLabel: "Featured China travel guides",
  },
  zh: {
    eyebrow: "旅行产品与灵感",
    title: "先从一条路线开始，再走成自己的旅程。",
    intro:
      "可以先了解张家界4天3晚私家路线，也可以从目的地指南开始规划下一趟中国旅行。",
    productLabel: "私家行程",
    featuredTitle: "张家界4天3晚",
    featuredSubtitle: "峰林、玻璃桥与天门山",
    featuredMeta: "4天 · 3晚 · 3个完整游览日",
    guideLabel: "旅行指南",
    guideHeading: "更多出发灵感",
    guideIntro: "从目的地指南中找到下一趟旅程。",
    guideListLabel: "精选中国旅行指南",
  },
  ko: {
    eyebrow: "여행 상품과 영감",
    title: "하나의 일정에서 시작해, 나만의 여행으로 완성하세요.",
    intro:
      "장자제 4일 3박 프라이빗 일정을 살펴보거나, 여행지 가이드로 다음 중국 여행을 계획해 보세요.",
    productLabel: "프라이빗 일정",
    featuredTitle: "장자제 4일 3박",
    featuredSubtitle: "사암 봉우리와 유리다리, 톈먼산",
    featuredMeta: "4일 · 3박 · 온전한 관광 3일",
    guideLabel: "여행 가이드",
    guideHeading: "더 많은 여행 아이디어",
    guideIntro: "여행지 가이드에서 다음 여정을 찾아보세요.",
    guideListLabel: "추천 중국 여행 가이드",
  },
};

export function getHomepageProductShowcaseCopy(locale: HomegroundLocale) {
  return copies[locale];
}
