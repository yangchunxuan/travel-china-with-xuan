/**
 * Guide language shown as a badge on every tour overview card.
 *
 * Each entry restates what the product's own service note and package label
 * already publish; nothing here adds a language the product does not state.
 * - "english": an English-speaking guide on the guided days.
 * - "english-land": English-speaking guides on land; on board, the language
 *   follows the confirmed ship programme.
 * - "english-or-none": the traveller chooses an English-guided version or a
 *   version with no on-site guide.
 * - "quote": the published text leaves the guide language to the written quote.
 * - "driver-guide": an English-speaking driver-host who helps with logistics
 *   and accompanies city stops. They are not a licensed sightseeing guide and
 *   do not provide commentary inside attractions.
 *
 * Korean pages differ only where the Korean package label publishes a
 * Korean-speaking guide (`koreanGuide`). "availability" marks products whose
 * service note says that Korean guide is checked per date or city.
 * `assertPublishedPrivateTourCatalogIntegrity` fails if the Korean set here and
 * the Korean package labels diverge, or a published or preview product has no
 * entry.
 */
export type PrivateTourGuideLanguageBase =
  | "english"
  | "english-land"
  | "english-or-none"
  | "quote"
  | "driver-guide";

// Japanese labels live in lib/japaneseGuideLanguage.ts: Japanese-only modules
// are outside the self-hosted Chinese font's coverage check.
export type PrivateTourGuideLanguageLocale = "en" | "zh" | "ko";

interface GuideLanguageEntry {
  readonly base: PrivateTourGuideLanguageBase;
  readonly koreanGuide?: "confirmed" | "availability";
}

const english: GuideLanguageEntry = { base: "english" };
const englishLand: GuideLanguageEntry = { base: "english-land" };
const quote: GuideLanguageEntry = { base: "quote" };
const koreanConfirmed: GuideLanguageEntry = { base: "english", koreanGuide: "confirmed" };
const koreanByDate: GuideLanguageEntry = { base: "english", koreanGuide: "availability" };
const koreanByDateLand: GuideLanguageEntry = { base: "english-land", koreanGuide: "availability" };
const driverGuide: GuideLanguageEntry = { base: "driver-guide" };

export const privateTourGuideLanguageBySlug: Readonly<Record<string, GuideLanguageEntry>> = {
  "shanghai-suzhou-hangzhou-6-day-private-tour": english,
  "suzhou-tongli-hangzhou-shanghai-12-day-private-tour": english,
  "chengdu-pandas-sanxingdui-5-day-private-tour": english,
  "xian-terracotta-warriors-5-day-private-tour": english,
  "chongqing-wulong-5-day-private-tour": english,
  "guilin-yangshuo-5-day-private-tour": english,
  "harbin-winter-5-day-private-tour": english,
  "shanghai-suzhou-5-day-private-tour": english,
  "beijing-highlights-5-day-private-tour": { base: "english-or-none" },
  "zhangjiajie-forest-4-day-private-tour": koreanConfirmed,
  "zhangjiajie-furong-fenghuang-7-day-private-tour": koreanConfirmed,
  "zhangjiajie-4-day-private-tour": english,
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour": english,
  "kunming-dali-lijiang-8-day-private-tour": quote,
  "guizhou-huangguoshu-libo-miao-7-day-private-tour": english,
  "xiamen-tulou-quanzhou-6-day-private-tour": english,
  "chaozhou-shantou-nanao-5-day-private-tour": quote,
  "chengdu-chongqing-8-day-private-tour": english,
  "guangzhou-shunde-foshan-5-day-private-tour": quote,
  "huangshan-hongcun-huizhou-5-day-private-tour": english,
  "jingdezhen-wuyuan-wangxian-6-day-private-tour": english,
  "changbaishan-yanji-winter-6-day-private-tour": english,
  "shanghai-disneyland-5-day-private-tour": koreanConfirmed,
  "luoyang-dengfeng-kaifeng-6-day-private-tour": koreanByDate,
  "datong-pingyao-6-day-private-tour": koreanByDate,
  "zhangye-jiayuguan-dunhuang-7-day-private-tour": koreanByDate,
  "chongqing-yangtze-cruise-6-day-private-tour": koreanByDateLand,
  "xinjiang-ili-sayram-8-day-private-tour": koreanByDate,
  "hulunbuir-7-day-private-tour": koreanByDate,
  "kunming-jianshui-yuanyang-6-day-private-tour": koreanByDate,
  "shenzhen-family-tech-4-day-private-tour": koreanByDate,
  "beijing-xian-shanghai-12-day-private-tour": koreanByDate,
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": koreanByDate,
  "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour": english,
  "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour": english,
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": koreanByDate,
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour": english,
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour": koreanByDateLand,
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour": englishLand,
  "beijing-xian-silk-road-15-day-private-tour": quote,
  "beijing-xian-silk-road-15-day-small-group-tour": english,
  "beijing-xian-yunnan-14-day-private-tour": koreanByDate,
  "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour": koreanByDate,
  "china-grand-tour-21-day-private-tour": koreanByDateLand,
  "beijing-xian-guilin-shanghai-10-day-private-tour": koreanByDate,
  "beijing-hangzhou-suzhou-shanghai-11-day-private-tour": koreanByDate,
  "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour": koreanByDate,
  "beijing-xian-shanghai-8-day-private-tour": koreanByDate,
  "beijing-xian-guilin-hong-kong-10-day-private-tour": koreanByDate,
  "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour": koreanByDateLand,
  // Northeast winter products use a driver-host, not a licensed guide.
  "harbin-yabuli-snow-town-6-day-private-tour": driverGuide,
  "harbin-snow-town-changbaishan-yanji-8-day-private-tour": driverGuide,
  "harbin-mohe-arctic-village-7-day-private-tour": driverGuide,
  "harbin-snow-town-mohe-9-day-private-tour": driverGuide,
  "yanji-changbaishan-wanda-6-day-private-tour": driverGuide,
};

const baseLabels: Readonly<
  Record<PrivateTourGuideLanguageBase, Readonly<Record<PrivateTourGuideLanguageLocale, string>>>
> = {
  english: {
    en: "English-speaking guide",
    zh: "英语导游",
    ko: "영어 가이드",
  },
  "english-land": {
    en: "English-speaking guide on land",
    zh: "陆上英语导游",
    ko: "육상 영어 가이드",
  },
  "english-or-none": {
    en: "English guide or no on-site guide",
    zh: "英语导游或无现场导游",
    ko: "영어 가이드 또는 현장 가이드 없음",
  },
  quote: {
    en: "Guide language confirmed in quote",
    zh: "导游语种报价时确认",
    ko: "가이드 언어 견적 시 확인",
  },
  "driver-guide": {
    en: "English-speaking driver-host",
    zh: "英语沟通司机兼行程协助",
    ko: "영어 가능 운전기사 겸 일정 지원",
  },
};

export function getPrivateTourGuideLanguageBase(slug: string): PrivateTourGuideLanguageBase {
  const entry = privateTourGuideLanguageBySlug[slug];
  if (!entry) throw new Error(`Missing private-tour guide language: ${slug}`);
  return entry.base;
}

export function hasKoreanGuideOnKoreanPages(slug: string): boolean {
  return privateTourGuideLanguageBySlug[slug]?.koreanGuide !== undefined;
}

export function getPrivateTourGuideLanguageLabel(
  slug: string,
  locale: PrivateTourGuideLanguageLocale,
): string {
  const entry = privateTourGuideLanguageBySlug[slug];
  if (!entry) throw new Error(`Missing private-tour guide language: ${slug}`);
  if (locale === "ko" && entry.koreanGuide) {
    const land = entry.base === "english-land" ? "육상 " : "";
    return entry.koreanGuide === "availability"
      ? `${land}한국어 가이드 (날짜별 확인)`
      : `${land}한국어 가이드`;
  }
  return baseLabels[entry.base][locale];
}
