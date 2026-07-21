import type { HomegroundLocale } from "./homegroundI18n";

const SITE_URL = "https://homegroundchina.com";

export const guideIds = ["zhangjiajie-itinerary"] as const;

export type GuideId = (typeof guideIds)[number];

interface GuideLocaleEntry {
  path: string;
  title: string;
  headline: string;
  description: string;
  heroAlt: string;
  navTitle: string;
  featuredLinkLabel: string;
  openGraphLocale: string;
}

interface GuideEntry {
  id: GuideId;
  type: "route" | "planning";
  featured: boolean;
  heroImagePath: string;
  heroImageUrl: string;
  datePublished: string;
  dateModified: string;
  sourceReviewedDate: string;
  locales: Record<HomegroundLocale, GuideLocaleEntry>;
}

export const guideRegistry = [
  {
    id: "zhangjiajie-itinerary",
    type: "route",
    featured: true,
    heroImagePath: "/images/guides/zhangjiajie/hero-1600.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/zhangjiajie/hero-1600.jpg",
    datePublished: "2026-07-20",
    dateModified: "2026-07-21",
    sourceReviewedDate: "2026-07-21",
    locales: {
      en: {
        path: "/guides/zhangjiajie-itinerary/",
        title: "Zhangjiajie Itinerary: What Fits in 2, 3 or 4 Days",
        headline: "Zhangjiajie in 2, 3 or 4 Days: What Actually Fits",
        description:
          "A realistic Zhangjiajie itinerary for 2, 3 or 4 full days, including what to skip, where to stay and when Fenghuang fits as your next stop.",
        heroAlt:
          "Sandstone pillars rising through mist in Zhangjiajie National Forest Park.",
        navTitle: "Zhangjiajie guide",
        featuredLinkLabel: "See what actually fits in 2–4 days",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/zhangjiajie-itinerary/",
        title: "张家界 2、3、4 天行程：时间到底够不够",
        headline: "张家界玩 2、3 或 4 天，分别能安排什么？",
        description:
          "一份现实可行的张家界 2–4 天路线指南：国家森林公园和天门山如何取舍、住武陵源还是市区，以及凤凰古城什么时候适合作为下一站。",
        heroAlt: "云雾中的张家界国家森林公园石英砂岩峰林。",
        navTitle: "张家界路线指南",
        featuredLinkLabel: "查看张家界 2–4 天到底能安排什么",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/zhangjiajie-itinerary/",
        title: "장자제 2·3·4일 일정: 실제로 어디까지 가능할까",
        headline: "장자제 2일, 3일, 4일—실제로 가능한 일정",
        description:
          "장자제에서 2~4일을 보낼 때 국가삼림공원과 톈먼산을 어떻게 나눌지, 어디에 숙박할지, 펑황고성을 다음 목적지로 넣을 수 있는지를 현실적으로 정리한 가이드입니다.",
        heroAlt: "안개 사이로 솟아오른 장자제 국가삼림공원의 사암 봉우리.",
        navTitle: "장자제 일정 가이드",
        featuredLinkLabel: "장자제 2–4일에 실제로 가능한 일정 보기",
        openGraphLocale: "ko_KR",
      },
    },
  },
] as const satisfies readonly GuideEntry[];

export function getGuideEntry(
  id: GuideId,
  locale: HomegroundLocale = "en",
) {
  const guide = guideRegistry.find((entry) => entry.id === id);

  if (!guide) {
    throw new Error(`Unknown guide: ${id}`);
  }

  const localized = guide.locales[locale];

  return {
    ...guide,
    ...localized,
    canonicalPath: localized.path,
    canonicalUrl: `${SITE_URL}${localized.path}`,
  };
}

export function getFeaturedGuides(
  locale: HomegroundLocale = "en",
  limit = 3,
) {
  return guideRegistry
    .filter((entry) => entry.featured)
    .slice(0, Math.max(0, limit))
    .map((entry) => getGuideEntry(entry.id, locale));
}

export function getGuideLanguagePaths(id: GuideId) {
  const en = getGuideEntry(id, "en").canonicalPath;
  const zh = getGuideEntry(id, "zh").canonicalPath;
  const ko = getGuideEntry(id, "ko").canonicalPath;

  return {
    en,
    ko,
    "zh-Hans": zh,
    "x-default": en,
  } as const;
}

export function getGuideLanguageUrls(id: GuideId) {
  const paths = getGuideLanguagePaths(id);

  return Object.fromEntries(
    Object.entries(paths).map(([language, path]) => [
      language,
      `${SITE_URL}${path}`,
    ]),
  ) as Record<keyof typeof paths, string>;
}
