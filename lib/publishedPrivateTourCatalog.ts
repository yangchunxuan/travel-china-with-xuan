import zhangjiajieProduct from "../content/product-previews/zhangjiajie-4-day-private-tour/product.json" with { type: "json" };
import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { formatPrivateTourPrice, getPrivateTourPaths, localizePrivateTourProduct, privateTourProducts, type LocalizedPrivateTourImage, type LocalizedValue } from "./privateTourProducts.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getZhangjiajiePrivateTourHomeCard } from "./zhangjiajiePrivateTourHomeCard.ts";

type LocalizedText = Readonly<Record<HomegroundLocale, string>>;

interface ComparisonProfile {
  readonly route: LocalizedText;
  readonly appeal: LocalizedText;
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
    readonly appeal: string;
    readonly pace: string;
    readonly fit: string;
    readonly highlights: readonly string[];
  };
  readonly startingPrice: {
    readonly cny: number;
    readonly amount: number;
    readonly currency: "CNY" | "USD" | "KRW";
    readonly formatted: string;
    readonly travelers: number;
    readonly serviceLabel?: string;
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
    appeal: l(
      "Travel from Shanghai’s Bund to Suzhou’s classical gardens and a West Lake cruise; we check the intercity and luggage plan for your group.",
      "从上海外滩到苏州古典园林，再乘船看西湖；跨城交通与行李衔接会按实际同行人数确认。",
      "상하이 와이탄에서 쑤저우 고전 정원과 항저우 서호 유람선까지 이어집니다. 도시 간 이동 방법과 차량은 실제 일행과 수하물에 맞춰 확인합니다.",
    ),
    pace: l(
      "Three city bases across six days, with luggage included in the intercity plan.",
      "6 天住三座城市，跨城安排把行李衔接一起算进去。",
      "5박 6일 동안 세 도시에서 머물며, 수하물을 고려해 도시 간 이동을 준비합니다.",
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
    appeal: l(
      "Visit Chengdu Panda Base early, give Sanxingdui Museum the main part of a day, and slow down at a People’s Park teahouse while staying in one Chengdu hotel.",
      "早点去成都大熊猫基地，把一天的主要时间留给三星堆，再到人民公园茶馆坐一坐；全程住在同一家成都酒店。",
      "청두 판다기지를 이른 시간에 찾고, 하루의 중심을 싼싱두이박물관에 둔 뒤 인민공원 찻집에서 쉬어 갑니다. 숙소는 청두 한 곳입니다.",
    ),
    pace: l(
      "One Chengdu base, balanced with two substantial day trips.",
      "成都一地连住，安排两个完整近郊日，也留出时间感受市区生活。",
      "청두 한 곳에 머물며 근교에서 하루를 보내는 일정 두 번과 여유로운 도심 시간을 함께 담았습니다.",
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
    appeal: l(
      "Visit Xi’an City Wall, spend a full day at the Terracotta Warriors and Huaqing Palace, and explore the Great Mosque and Muslim Quarter with your guide.",
      "登上西安城墙，把完整一天留给兵马俑与华清宫，再由导游带你走进大清真寺和回民街。",
      "시안 성벽을 둘러보고, 병마용과 화청궁에 하루를 쓰며, 가이드와 함께 대청진사와 회민거리를 걷습니다.",
    ),
    pace: l(
      "One Xi’an base with a full Terracotta Warriors day and two city touring days.",
      "西安一地连住，兵马俑用完整一天，另有两个古城游览日。",
      "시안 한 곳에 머물며 병마용에 하루, 도심 유적에 이틀을 배정합니다.",
    ),
    fit: l(
      "First-time Xi’an visitors who want the major imperial and city landmarks in context.",
      "第一次到西安，希望把皇城脉络与主要地标看明白的旅客。",
      "시안의 왕조 역사와 주요 도심 유적을 맥락 있게 보고 싶은 첫 방문자.",
    ),
  },
  "chongqing-wulong-5-day-private-tour": {
    route: l(
      "Chongqing · Wulong · Three Natural Bridges",
      "重庆 · 武隆 · 天生三桥",
      "충칭 · 우룽 · 천생삼교",
    ),
    appeal: l(
      "See Chongqing’s train-through-building cityscape at Liziba, then stay one night in Wulong for the Three Natural Bridges.",
      "先在李子坝看重庆的列车穿楼城市景观，再到武隆住一晚，把天生三桥留给完整的山地行程。",
      "리쯔바에서 건물을 가로지르는 열차를 보고, 우룽에서 1박하며 천생삼교를 만납니다.",
    ),
    pace: l(
      "Explore Chongqing first, then change hotels for one night in Wulong rather than forcing the mountain return into a single day.",
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
    appeal: l(
      "Cruise the Li River through karst scenery to Yangshuo, stay for two nights, and give the Yulong River countryside a full unhurried day.",
      "乘漓江游船穿过喀斯特山水抵达阳朔，连住两晚，再用完整一天慢慢走遇龙河乡村段。",
      "리강 유람선으로 카르스트 풍경을 지나 양숴에 도착해 2박하고, 위룽허 전원 지역을 하루 동안 여유롭게 둘러봅니다.",
    ),
    pace: l(
      "Two bases, including two nights in Yangshuo and time for the countryside.",
      "桂林、阳朔两地住宿，其中阳朔连住两晚，为乡村山水留出时间。",
      "구이린과 양숴 두 곳에 머물며, 양숴 2박으로 전원 풍경을 여유 있게 봅니다.",
    ),
    fit: l(
      "Landscape-focused travellers who want a cruise and a choice between a simple family activity and gentle cycling.",
      "偏爱山水、游船，也想根据同行者选择基础家庭体验或轻骑行的旅客。",
      "산수 풍경과 유람선을 좋아하고, 일행에 맞춰 간단한 가족 체험과 가벼운 자전거 중 고르고 싶은 여행자.",
    ),
  },
  "harbin-winter-5-day-private-tour": {
    route: l(
      "Harbin · Songhua River · Ice and Snow World",
      "哈尔滨 · 松花江 · 冰雪大世界",
      "하얼빈 · 쑹화강 · 빙설대세계",
    ),
    appeal: l(
      "Visit Ice and Snow World from afternoon into evening, explore Central Street, and use a heated private vehicle for the winter transfers included in the route.",
      "从下午走进冰雪大世界，一直看到夜间灯光，再逛中央大街；路线包含的冬季接驳使用有暖气的专车。",
      "오후부터 저녁까지 빙설대세계를 보고 중앙대가를 걸으며, 일정에 포함된 겨울 이동은 난방되는 전용 차량으로 진행합니다.",
    ),
    pace: l(
      "One Harbin base, timed around winter daylight and evening ice displays.",
      "哈尔滨一地连住，按冬季日照与夜间冰灯时段安排每天节奏。",
      "하얼빈 한 곳에 머물며, 낮이 짧은 겨울에는 해가 떠 있는 시간과 빙설대세계 야간 조명에 맞춰 일정을 잡습니다.",
    ),
    fit: l(
      "Cold-weather travellers visiting specifically for Harbin’s ice-and-snow season.",
      "明确为哈尔滨冰雪季而来、能够适应严寒天气的旅客。",
      "빙설 시즌의 하얼빈을 꼭 보고 싶고, 매서운 추위에도 대비할 수 있는 여행자.",
    ),
  },
  "shanghai-suzhou-5-day-private-tour": {
    route: l(
      "Shanghai · Zhujiajiao · Suzhou day trip",
      "上海 · 朱家角 · 苏州一日往返",
      "상하이 · 주자자오 · 쑤저우 당일치기",
    ),
    appeal: l(
      "Keep one Shanghai hotel while adding Zhujiajiao and a high-speed-rail day trip to Suzhou’s gardens and Pingjiang Road.",
      "上海同一家酒店连住，另去朱家角水乡，并乘高铁当天往返苏州园林与平江路。",
      "상하이 호텔 한 곳에 머물며 주자자오를 둘러보고, 고속철도로 쑤저우 정원과 핑장루를 당일 여행합니다.",
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
    appeal: l(
      "Spend three touring days at the Great Wall, Forbidden City and Beijing’s Shichahai and Houhai area, returning to the same Beijing hotel each night.",
      "用三个完整游览日看长城、故宫、什刹海与后海，每晚回到同一家北京酒店。",
      "만리장성, 자금성과 베이징 스차하이·허우하이를 3일 동안 둘러보고 매일 같은 베이징 호텔로 돌아옵니다.",
    ),
    pace: l(
      "One Beijing base with three touring days and buffered arrival and departure days.",
      "北京一地连住，3 个完整游览日，抵达与离开日保留缓冲。",
      "베이징 한 곳에 머물며 3일 관광하고 도착일과 출발일에는 여유를 둡니다.",
    ),
    fit: l(
      "First-time Beijing visitors choosing between an English-speaking guide and a no-onsite-guide option.",
      "第一次到北京，并希望在英语导游版与无现场导游版之间选择的旅客。",
      "첫 베이징 여행에서 영어 가이드 동행과 현장 가이드 없이 진행하는 일정 중 선택하고 싶은 여행자.",
    ),
  },
  "zhangjiajie-forest-4-day-private-tour": {
    route: l(
      "Zhangjiajie · Tianzi Mountain · Yuanjiajie · Golden Whip Stream",
      "张家界 · 天子山 · 袁家界 · 金鞭溪",
      "장자제 · 톈쯔산 · 위안자제 · 금편계",
    ),
    appeal: l(
      "Stay in one Zhangjiajie villa, reach Yuanjiajie’s main viewpoints, walk the eastern Golden Whip Stream, and visit Seventy-Two Wonder Tower in the evening—without cable cars or elevators.",
      "同一处张家界别墅连住，去袁家界主要观景点、步行金鞭溪东段，晚上再看七十二奇楼；路线不乘索道和电梯。",
      "장자제 빌라 한 곳에 머물며 위안자제 주요 전망대와 금편계 동쪽 구간을 걷고, 저녁에는 칠십이기루를 찾습니다. 케이블카와 엘리베이터는 이용하지 않습니다.",
    ),
    pace: l(
      "One villa base with two walking-focused sightseeing days and buffered arrival and departure days.",
      "同一处别墅连住 3 晚，中间安排两个以步行为主的完整游览日，抵达与离开日保留缓冲。",
      "한 빌라에서 3박하며 가운데 이틀은 걷기 중심으로 관광하고 도착일과 출발일에는 여유를 둡니다.",
    ),
    fit: l(
      "Budget-conscious walkers who want the forest park without cable cars, elevators or optional extras.",
      "希望控制预算、能够多走路，并接受这条路线不含索道、电梯和自选加项的旅客。",
      "예산을 아끼고 많이 걸을 수 있으며, 케이블카·엘리베이터·추가 옵션 없이 삼림공원을 둘러보고 싶은 여행자.",
    ),
  },
  "zhangjiajie-4-day-private-tour": {
    route: l(
      "Zhangjiajie · Wulingyuan · Glass Bridge · Tianmen Mountain",
      "张家界 · 武陵源 · 玻璃桥 · 天门山",
      "장자제 · 우링위안 · 유리다리 · 톈먼산",
    ),
    appeal: l(
      "Give the Forest Park, Grand Canyon Glass Bridge and Tianmen Mountain their own day, with an unhurried arrival before three sightseeing days.",
      "抵达日先放慢脚步，再把森林公园、大峡谷玻璃桥与天门山分别放进三个游览日。",
      "도착일은 여유롭게 보내고, 이후 3일 동안 국가삼림공원, 대협곡 유리다리와 톈먼산을 하루에 한 곳씩 둘러봅니다.",
    ),
    pace: l(
      "An easy arrival day followed by three sightseeing days; we check whether Tianmen Mountain and departure can fit safely on the same day.",
      "抵达日不赶景点，随后 3 天游览；天门山与返程能否同日须按票务和班次核对。",
      "도착일에는 여유를 두고 3일간 관광하며, 톈먼산 관람과 출발을 같은 날에 배치할 수 있는지 따로 확인합니다.",
    ),
    fit: l(
      "Travellers who want Zhangjiajie’s best-known mountain landscapes in one private route.",
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
    appeal: profile.appeal[locale],
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
    const lowestPrice = localized.packages
      .flatMap((tourPackage) => tourPackage.rows)
      .filter((row) => row.travelers === 2)
      .reduce((lowest, candidate) =>
        candidate.cny < lowest.cny ? candidate : lowest,
      );
    const startingPackage = localized.packages.find((tourPackage) =>
      tourPackage.rows.some((row) => row === lowestPrice),
    );
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
      startingPrice: {
        cny: lowestPrice.cny,
        amount: lowestPrice.amount,
        currency: lowestPrice.currency,
        formatted: lowestPrice.formatted,
        travelers: lowestPrice.travelers,
        ...(localized.packages.length > 1 && startingPackage
          ? { serviceLabel: startingPackage.label }
          : {}),
      },
      dateModified: localized.dateModified,
    } satisfies PublishedPrivateTourCatalogItem;
  });

  const zhangjiajieCard = getZhangjiajiePrivateTourHomeCard(locale);
  const contentLocale = zhangjiajieContentLocale[locale];
  const zhangjiajieSlug = zhangjiajieProduct.seo.slug;
  const zhangjiajiePaths = getPrivateTourPaths(zhangjiajieSlug);
  const zhangjiajieStartingPrice = formatPrivateTourPrice(
    zhangjiajieProduct.price_display.from_price_per_person,
    locale,
  );

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
      startingPrice: {
        ...zhangjiajieStartingPrice,
        travelers: zhangjiajieProduct.group_basis.minimum_adults,
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
        item.startingPrice.formatted,
      ];
      if (required.some((value) => value.trim().length === 0)) {
        throw new Error(`Incomplete ${locale} copy for ${item.slug}.`);
      }
      if (item.comparison.highlights.length < 3) {
        throw new Error(`At least three highlights are required for ${item.slug}.`);
      }
      if (item.startingPrice.travelers !== 2) {
        throw new Error(
          `Catalog prices must use the shared two-traveller basis: ${item.slug}.`,
        );
      }
    }
  }

  return true;
}

assertPublishedPrivateTourCatalogIntegrity();
