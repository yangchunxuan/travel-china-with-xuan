import type { HomegroundLocale } from "./homegroundI18n";

const SITE_URL = "https://homegroundchina.com";

export const guideIds = [
  "zhangjiajie-itinerary",
  "beijing-zhangjiajie-shanghai-10-days",
] as const;

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
          "A realistic Zhangjiajie itinerary for 2, 3 or 4 days, with exact park sequences, full-day and night-count rules, what to skip and when Fenghuang fits.",
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
          "一份现实可行的张家界 2–4 天指南：森林公园具体顺序、完整游览日与住宿晚数、景点取舍，以及凤凰古城什么时候适合作为下一站。",
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
          "장자제 2~4일의 공원 순서, 온전한 관광일과 숙박일 계산, 제외할 곳과 펑황고성을 다음 목적지로 넣는 조건을 현실적으로 정리했습니다.",
        heroAlt: "안개 사이로 솟아오른 장자제 국가삼림공원의 사암 봉우리.",
        navTitle: "장자제 일정 가이드",
        featuredLinkLabel: "장자제 2–4일에 실제로 가능한 일정 보기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "beijing-zhangjiajie-shanghai-10-days",
    type: "planning",
    featured: false,
    heroImagePath:
      "/images/guides/beijing-zhangjiajie-shanghai-10-days/zhangjiajie-base-1800.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/beijing-zhangjiajie-shanghai-10-days/zhangjiajie-base-1800.jpg",
    datePublished: "2026-07-21",
    dateModified: "2026-07-21",
    sourceReviewedDate: "2026-07-21",
    locales: {
      en: {
        path: "/guides/beijing-zhangjiajie-shanghai-10-days/",
        title: "Beijing–Zhangjiajie–Shanghai in 10 Days: Is It Realistic?",
        headline:
          "Beijing–Zhangjiajie–Shanghai in 10 Days: Is It Actually Realistic?",
        description:
          "Can Beijing, Zhangjiajie and Shanghai fit into 10 days? Count the real sightseeing days, see the trade-offs, and test whether your exact trip still works.",
        heroAlt:
          "Zhangjiajie city buildings beside a river, with mountains rising behind them.",
        navTitle: "10-day China route guide",
        featuredLinkLabel: "Check whether three cities really fit into 10 days",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/beijing-zhangjiajie-shanghai-10-days/",
        title: "北京—张家界—上海 10 天够吗？现实路线拆解",
        headline: "北京—张家界—上海，10 天真的够吗？",
        description:
          "北京、张家界和上海能否放进 10 天？先计算真正完整的游览日，再看每座城市必须做出的取舍，以及你的具体行程是否仍然成立。",
        heroAlt: "河畔的张家界市区楼房，背后为群山。",
        navTitle: "北京—张家界—上海 10 天指南",
        featuredLinkLabel: "检查三座城市能否真正放进 10 天",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/beijing-zhangjiajie-shanghai-10-days/",
        title: "베이징·장자제·상하이 10일 일정, 현실적으로 가능할까",
        headline: "베이징·장자제·상하이 10일 여행, 현실적으로 가능할까요?",
        description:
          "베이징·장자제·상하이를 10일 안에 여행할 수 있을까요? 실제 관광일을 계산하고, 도시별로 무엇을 포기해야 하는지, 내 일정도 가능한지 확인해 보세요.",
        heroAlt: "강 건너 장자제 시내와 그 뒤로 이어지는 산봉우리.",
        navTitle: "베이징·장자제·상하이 10일 가이드",
        featuredLinkLabel: "세 도시를 10일에 넣을 수 있는지 확인하기",
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
