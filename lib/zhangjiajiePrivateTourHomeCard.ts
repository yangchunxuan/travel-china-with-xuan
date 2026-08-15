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
    cardImageWidth: 1280,
    cardImageHeight: 1600,
    dateModified: "2026-08-15",
  },
  zh: {
    id: "zhangjiajie-4-day-private-tour",
    canonicalPath: "/zh/tours/zhangjiajie-4-day-private-tour/",
    headline: "张家界4天3晚：走进峰林、玻璃桥与天门山",
    featuredLinkLabel: "查看4天3晚私家路线",
    cardImagePath:
      "/product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg",
    cardImageAlt: "阳光照亮张家界国家森林公园的砂岩峰柱与深谷。",
    cardImageWidth: 1280,
    cardImageHeight: 1600,
    dateModified: "2026-08-15",
  },
} as const;

export function getZhangjiajiePrivateTourHomeCard(locale: HomegroundLocale) {
  return locale === "ko" ? null : cards[locale];
}
