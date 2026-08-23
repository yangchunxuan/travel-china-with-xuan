import type { HomegroundLocale } from "./homegroundI18n";

const cards = {
  en: {
    id: "zhangjiajie-4-day-private-tour",
    canonicalPath: "/tours/zhangjiajie-4-day-private-tour/",
    headline:
      "Zhangjiajie in 4 Days: Stone Peaks, Glass Bridge and Tianmen Mountain",
    featuredLinkLabel: "Explore the 4-day private route",
    cardImagePath:
      "/product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg",
    cardImageAlt:
      "Sunlit sandstone pillars and deep forested ravines in Zhangjiajie National Forest Park.",
    cardImageWidth: 1920,
    cardImageHeight: 1280,
    dateModified: "2026-08-16",
  },
  zh: {
    id: "zhangjiajie-4-day-private-tour",
    canonicalPath: "/zh/tours/zhangjiajie-4-day-private-tour/",
    headline: "张家界4天3晚：走进峰林、玻璃桥与天门山",
    featuredLinkLabel: "查看4天3晚私家路线",
    cardImagePath:
      "/product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg",
    cardImageAlt: "阳光照亮张家界国家森林公园的砂岩峰柱与深谷。",
    cardImageWidth: 1920,
    cardImageHeight: 1280,
    dateModified: "2026-08-16",
  },
  ko: {
    id: "zhangjiajie-4-day-private-tour",
    canonicalPath: "/ko/tours/zhangjiajie-4-day-private-tour/",
    headline: "장자제 4일 3박: 사암 봉우리와 유리다리, 톈먼산",
    featuredLinkLabel: "4일 3박 프라이빗 일정 보기",
    cardImagePath:
      "/product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg",
    cardImageAlt:
      "햇살이 비치는 장자제 국가삼림공원의 사암 봉우리와 숲이 우거진 깊은 계곡.",
    cardImageWidth: 1920,
    cardImageHeight: 1280,
    dateModified: "2026-08-16",
  },
} as const;

export function getZhangjiajiePrivateTourHomeCard(locale: HomegroundLocale) {
  return cards[locale];
}
