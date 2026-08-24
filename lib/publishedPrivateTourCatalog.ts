import zhangjiajieProduct from "../content/product-previews/zhangjiajie-4-day-private-tour/product.json" with { type: "json" };
import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getPrivateTourPaths, localizePrivateTourProduct, privateTourProducts, type LocalizedPrivateTourImage, type LocalizedValue } from "./privateTourProducts.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getZhangjiajiePrivateTourHomeCard } from "./zhangjiajiePrivateTourHomeCard.ts";

type LocalizedText = Readonly<Record<HomegroundLocale, string>>;

interface ComparisonProfile {
  readonly route: LocalizedText;
  readonly pace: LocalizedText;
  readonly fit: LocalizedText;
}

export interface PublishedPrivateTourCatalogItem {
  readonly id: string;
  readonly slug: string;
  readonly source: "structured-tour" | "zhangjiajie-tour";
  readonly title: string;
  readonly description: string;
  readonly days: number;
  readonly nights: number;
  readonly href: string;
  readonly paths: LocalizedValue<string>;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
    readonly objectPosition?: string;
  };
  readonly comparison: {
    readonly route: string;
    readonly pace: string;
    readonly fit: string;
    readonly highlights: readonly string[];
  };
  readonly dateModified: string;
}

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });

/**
 * Hub-only comparison language. Every claim is a compact restatement of the
 * published itinerary, not a new promise about live availability or price.
 * Adding a published product requires adding its comparison profile here;
 * the integrity assertion below deliberately fails if the two sets diverge.
 */
const comparisonProfiles: Readonly<Record<string, ComparisonProfile>> = {
  "shanghai-suzhou-hangzhou-6-day-private-tour": {
    route: l(
      "Shanghai · Suzhou · Hangzhou",
      "上海 · 苏州 · 杭州",
      "상하이 · 쑤저우 · 항저우",
    ),
    pace: l(
      "Three city bases across six days, with luggage included in the intercity plan.",
      "6 天连住三座城市，跨城安排把行李衔接一起算进去。",
      "6일 동안 세 도시를 옮겨 머물며, 도시 간 이동에 수하물 동선도 포함합니다.",
    ),
    fit: l(
      "Travellers who want Shanghai, classical gardens and West Lake in one connected route.",
      "想把上海城市景观、苏州园林和杭州西湖一次走完的旅客。",
      "상하이 도심, 쑤저우 정원과 항저우 서호를 한 여정으로 보고 싶은 여행자.",
    ),
  },
  "chengdu-pandas-sanxingdui-5-day-private-tour": {
    route: l(
      "Chengdu · Panda Base · Sanxingdui · Dujiangyan",
      "成都 · 大熊猫基地 · 三星堆 · 都江堰",
      "청두 · 판다기지 · 싼싱두이 · 두장옌",
    ),
    pace: l(
      "One Chengdu base, balanced with two substantial day trips.",
      "成都一地连住，以两个完整近郊日平衡城市体验。",
      "청두 한 곳에 머물며 두 번의 알찬 근교 당일 일정을 연결합니다.",
    ),
    fit: l(
      "Travellers drawn to pandas, archaeology and a slower look at Chengdu life.",
      "重点想看熊猫、考古文明，也想留时间感受成都生活的旅客。",
      "판다와 고고학, 여유로운 청두의 일상을 함께 보고 싶은 여행자.",
    ),
  },
  "xian-terracotta-warriors-5-day-private-tour": {
    route: l(
      "Xi’an · Terracotta Warriors · City Wall · Muslim Quarter",
      "西安 · 兵马俑 · 城墙 · 回民街",
      "시안 · 병마용 · 성벽 · 회민거리",
    ),
    pace: l(
      "One Xi’an base with a full Terracotta Warriors day and two city touring days.",
      "西安一地连住，兵马俑用完整一天，另有两个古城游览日。",
      "시안 한 곳에 머물며 병마용에 하루, 도심 유적에 이틀을 배정합니다.",
    ),
    fit: l(
      "First-time Xi’an visitors who want the major imperial and city landmarks in context.",
      "第一次到西安，希望把皇城脉络与主要地标看明白的旅客。",
      "시안의 제국사와 주요 도심 유적을 맥락 있게 보고 싶은 첫 방문자.",
    ),
  },
  "chongqing-wulong-5-day-private-tour": {
    route: l(
      "Chongqing · Wulong · Three Natural Bridges",
      "重庆 · 武隆 · 天生三桥",
      "충칭 · 우룽 · 천생삼교",
    ),
    pace: l(
      "Layered city touring plus an overnight change of base in Wulong.",
      "先看重庆立体城市，再换住武隆一晚，不把山地往返硬塞进一天。",
      "충칭 도심을 둘러본 뒤 우룽으로 이동해 1박하는 구성입니다.",
    ),
    fit: l(
      "Travellers who want a megacity and dramatic karst scenery in the same trip.",
      "想在同一趟旅行里兼顾山城景观与喀斯特山地的旅客。",
      "대도시 풍경과 웅장한 카르스트 지형을 한 여행에서 보고 싶은 여행자.",
    ),
  },
  "guilin-yangshuo-5-day-private-tour": {
    route: l(
      "Guilin · Li River · Yangshuo",
      "桂林 · 漓江 · 阳朔",
      "구이린 · 리강 · 양숴",
    ),
    pace: l(
      "Two bases, including two nights in Yangshuo and time for the countryside.",
      "桂林、阳朔两地住宿，其中阳朔连住两晚，为乡村山水留出时间。",
      "구이린과 양숴 두 곳에 머물며, 양숴 2박으로 전원 풍경을 여유 있게 봅니다.",
    ),
    fit: l(
      "Landscape-focused travellers who prefer a cruise and gentler countryside choices.",
      "偏爱山水、游船和轻松乡村体验，不想一路赶景点的旅客。",
      "산수 풍경, 유람선과 비교적 편안한 전원 체험을 선호하는 여행자.",
    ),
  },
  "harbin-winter-5-day-private-tour": {
    route: l(
      "Harbin · Songhua River · Ice and Snow World",
      "哈尔滨 · 松花江 · 冰雪大世界",
      "하얼빈 · 쑹화강 · 빙설대세계",
    ),
    pace: l(
      "One Harbin base, timed around winter daylight and evening ice displays.",
      "哈尔滨一地连住，按冬季日照与夜间冰灯时段安排每天节奏。",
      "하얼빈 한 곳에 머물며 겨울 일조 시간과 야간 얼음 전시에 맞춰 움직입니다.",
    ),
    fit: l(
      "Cold-weather travellers visiting specifically for Harbin’s ice-and-snow season.",
      "明确为哈尔滨冰雪季而来、能够适应严寒天气的旅客。",
      "하얼빈 빙설 시즌을 목적으로 방문하고 추운 날씨에 대비할 수 있는 여행자.",
    ),
  },
  "shanghai-suzhou-5-day-private-tour": {
    route: l(
      "Shanghai · Zhujiajiao · Suzhou day trip",
      "上海 · 朱家角 · 苏州一日往返",
      "상하이 · 주자자오 · 쑤저우 당일치기",
    ),
    pace: l(
      "One Shanghai hotel for four nights; Suzhou is a high-speed-rail day trip.",
      "上海同一家酒店连住 4 晚，苏州以高铁一日往返，不跨城搬行李。",
      "상하이 한 호텔에서 4박하며 쑤저우는 고속철도 당일 일정으로 다녀옵니다.",
    ),
    fit: l(
      "Travellers who want Shanghai, a water town and Suzhou without changing hotels.",
      "想看上海、水乡和苏州园林，但希望避免换酒店的旅客。",
      "호텔을 옮기지 않고 상하이, 수향마을과 쑤저우 정원을 보고 싶은 여행자.",
    ),
  },
  "beijing-highlights-5-day-private-tour": {
    route: l(
      "Beijing · Forbidden City · Great Wall",
      "北京 · 故宫 · 长城",
      "베이징 · 자금성 · 만리장성",
    ),
    pace: l(
      "One Beijing base with three touring days and buffered arrival and departure days.",
      "北京一地连住，3 个完整游览日，抵达与离开日保留缓冲。",
      "베이징 한 곳에 머물며 3일 관광하고 도착일과 출발일에는 여유를 둡니다.",
    ),
    fit: l(
      "First-time Beijing visitors choosing between guided and lower-touch support.",
      "第一次到北京，并希望在英语导游版与无现场导游版之间选择的旅客。",
      "첫 베이징 여행에서 영어 가이드 포함 또는 원격 지원형을 선택하고 싶은 여행자.",
    ),
  },
  "zhangjiajie-4-day-private-tour": {
    route: l(
      "Zhangjiajie · Wulingyuan · Glass Bridge · Tianmen Mountain",
      "张家界 · 武陵源 · 玻璃桥 · 天门山",
      "장자제 · 우링위안 · 유리다리 · 톈먼산",
    ),
    pace: l(
      "An arrival buffer followed by three sightseeing days, with departure timing checked against Tianmen Mountain.",
      "抵达日不赶景点，随后 3 天游览；天门山与返程能否同日须按票务和班次核对。",
      "도착일에는 여유를 두고 3일간 관광하며, 톈먼산과 출발 일정의 연결 가능성을 따로 확인합니다.",
    ),
    fit: l(
      "Travellers prioritising Zhangjiajie’s headline mountain landscapes in one private route.",
      "希望用一条私家路线集中看完张家界代表性山岳景观的旅客。",
      "장자제의 대표 산악 풍경을 하나의 프라이빗 일정으로 보고 싶은 여행자.",
    ),
  },
};

const zhangjiajieContentLocale = {
  en: "en",
  zh: "zh-CN",
  ko: "ko",
} as const satisfies Record<
  HomegroundLocale,
  keyof typeof zhangjiajieProduct.title
>;

function chooseDistinctCatalogImage(
  product: ReturnType<typeof localizePrivateTourProduct>,
  usedImagePaths: Set<string>,
): LocalizedPrivateTourImage {
  if (!usedImagePaths.has(product.heroImage.src)) return product.heroImage;

  return (
    product.gallery.find(
      (image) =>
        image.src !== product.heroImage.src &&
        !usedImagePaths.has(image.src),
    ) ?? product.heroImage
  );
}

function profileFor(slug: string): ComparisonProfile {
  const profile = comparisonProfiles[slug];
  if (!profile) throw new Error(`Missing private-tour comparison profile: ${slug}`);
  return profile;
}

function localizedProfile(slug: string, locale: HomegroundLocale) {
  const profile = profileFor(slug);
  return {
    route: profile.route[locale],
    pace: profile.pace[locale],
    fit: profile.fit[locale],
  };
}

export function getPublishedPrivateTourCatalog(
  locale: HomegroundLocale,
): readonly PublishedPrivateTourCatalogItem[] {
  const usedImagePaths = new Set<string>();
  const structuredItems = privateTourProducts.map((product) => {
    const localized = localizePrivateTourProduct(product, locale);
    const image = chooseDistinctCatalogImage(localized, usedImagePaths);
    usedImagePaths.add(image.src);

    return {
      id: localized.slug,
      slug: localized.slug,
      source: "structured-tour",
      title: localized.title,
      description: localized.lede,
      days: localized.days,
      nights: localized.nights,
      href: localized.path,
      paths: localized.paths,
      image: {
        src: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height,
        objectPosition: image.objectPosition,
      },
      comparison: {
        ...localizedProfile(localized.slug, locale),
        highlights: localized.highlights.slice(0, 3),
      },
      dateModified: localized.dateModified,
    } satisfies PublishedPrivateTourCatalogItem;
  });

  const zhangjiajieCard = getZhangjiajiePrivateTourHomeCard(locale);
  const contentLocale = zhangjiajieContentLocale[locale];
  const zhangjiajieSlug = zhangjiajieProduct.seo.slug;
  const zhangjiajiePaths = getPrivateTourPaths(zhangjiajieSlug);

  return Object.freeze([
    ...structuredItems,
    {
      id: zhangjiajieSlug,
      slug: zhangjiajieSlug,
      source: "zhangjiajie-tour",
      title: zhangjiajieProduct.title[contentLocale],
      description: zhangjiajieProduct.short_description[contentLocale],
      days: zhangjiajieProduct.duration.days,
      nights: zhangjiajieProduct.duration.nights,
      href: zhangjiajieCard.canonicalPath,
      paths: zhangjiajiePaths,
      image: {
        src: zhangjiajieCard.cardImagePath,
        alt: zhangjiajieCard.cardImageAlt,
        width: zhangjiajieCard.cardImageWidth,
        height: zhangjiajieCard.cardImageHeight,
      },
      comparison: {
        ...localizedProfile(zhangjiajieSlug, locale),
        highlights: zhangjiajieProduct.route.slice(1).map((day) =>
          locale === "en"
            ? day.title_en
            : locale === "zh"
              ? day.title_zh
              : day.title_ko,
        ),
      },
      dateModified: zhangjiajieCard.dateModified,
    } satisfies PublishedPrivateTourCatalogItem,
  ]);
}

export function assertPublishedPrivateTourCatalogIntegrity(): true {
  if (
    zhangjiajieProduct.status !== "published" ||
    zhangjiajieProduct.public_eligible !== true
  ) {
    throw new Error("Zhangjiajie must remain published and public-eligible.");
  }

  const sourceSlugs = [
    ...privateTourProducts.map((product) => product.slug),
    zhangjiajieProduct.seo.slug,
  ];
  const profileSlugs = Object.keys(comparisonProfiles);

  if (new Set(sourceSlugs).size !== sourceSlugs.length) {
    throw new Error("Published private-tour source contains duplicate slugs.");
  }
  if (
    sourceSlugs.length !== profileSlugs.length ||
    sourceSlugs.some((slug) => !profileSlugs.includes(slug))
  ) {
    throw new Error(
      "Published private-tour source and comparison profiles must contain the same IDs.",
    );
  }

  for (const locale of ["en", "zh", "ko"] as const) {
    const catalog = getPublishedPrivateTourCatalog(locale);
    if (catalog.length !== sourceSlugs.length) {
      throw new Error(`Incomplete ${locale} private-tour catalog.`);
    }
    if (new Set(catalog.map((item) => item.href)).size !== catalog.length) {
      throw new Error(`Duplicate ${locale} private-tour paths.`);
    }

    for (const item of catalog) {
      const required = [
        item.title,
        item.description,
        item.comparison.route,
        item.comparison.pace,
        item.comparison.fit,
      ];
      if (required.some((value) => value.trim().length === 0)) {
        throw new Error(`Incomplete ${locale} copy for ${item.slug}.`);
      }
      if (item.comparison.highlights.length < 3) {
        throw new Error(`At least three highlights are required for ${item.slug}.`);
      }
    }
  }

  return true;
}

assertPublishedPrivateTourCatalogIntegrity();
