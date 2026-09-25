// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { guideRegistry, type GuideId } from "./guideRegistry.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";

/**
 * Editorial exposure forecast for guides that do not already have a reviewed
 * product mapping. It is a commercial planning prior, not measured market
 * share. Revisit the numbers only with a new reviewed mapping version.
 */
export const guideProductMarketForecast = {
  "shanghai-suzhou-hangzhou-6-day-private-tour": 10,
  "shanghai-suzhou-5-day-private-tour": 8,
  "beijing-highlights-5-day-private-tour": 9,
  "xian-terracotta-warriors-5-day-private-tour": 5,
  "chengdu-pandas-sanxingdui-5-day-private-tour": 3,
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour": 2,
  "chengdu-chongqing-8-day-private-tour": 4,
  "chongqing-wulong-5-day-private-tour": 2,
  "guilin-yangshuo-5-day-private-tour": 6,
  "kunming-dali-lijiang-8-day-private-tour": 4,
  "zhangjiajie-furong-fenghuang-7-day-private-tour": 6,
  "zhangjiajie-forest-4-day-private-tour": 4,
  "zhangjiajie-4-day-private-tour": 4,
  "harbin-winter-5-day-private-tour": 2,
  "changbaishan-yanji-winter-6-day-private-tour": 2,
  "guangzhou-shunde-foshan-5-day-private-tour": 3,
  "xiamen-tulou-quanzhou-6-day-private-tour": 3,
  "chaozhou-shantou-nanao-5-day-private-tour": 2,
  "guizhou-huangguoshu-libo-miao-7-day-private-tour": 2,
  "huangshan-hongcun-huizhou-5-day-private-tour": 2,
  "jingdezhen-wuyuan-wangxian-6-day-private-tour": 2,
  "shanghai-disneyland-5-day-private-tour": 2,
  "luoyang-dengfeng-kaifeng-6-day-private-tour": 1,
  "datong-pingyao-6-day-private-tour": 1,
  "zhangye-jiayuguan-dunhuang-7-day-private-tour": 1,
  "chongqing-yangtze-cruise-6-day-private-tour": 2,
  "xinjiang-ili-sayram-8-day-private-tour": 2,
  "hulunbuir-7-day-private-tour": 1,
  "kunming-jianshui-yuanyang-6-day-private-tour": 1,
  "shenzhen-family-tech-4-day-private-tour": 1,
  "beijing-xian-shanghai-12-day-private-tour": 3,
  // Long-haul routes are not yet placed on guide pages; a new mapping version
  // is required before they take guide-card traffic.
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": 0,
  "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour": 0,
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": 0,
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour": 0,
  "beijing-xian-silk-road-15-day-private-tour": 0,
  "beijing-xian-yunnan-14-day-private-tour": 0,
  "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour": 0,
  "china-grand-tour-21-day-private-tour": 0,
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour": 0,
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour": 0,
  "beijing-xian-silk-road-15-day-small-group-tour": 0,
  "beijing-xian-guilin-shanghai-10-day-private-tour": 0,
  "beijing-hangzhou-suzhou-shanghai-11-day-private-tour": 0,
  "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour": 0,
} as const;

export type GuideProductId = keyof typeof guideProductMarketForecast;

interface ProductAffinity {
  readonly destinations: readonly string[];
  readonly topics?: readonly string[];
}

const productAffinities: Readonly<Record<GuideProductId, ProductAffinity>> = {
  "shanghai-suzhou-hangzhou-6-day-private-tour": {
    destinations: [
      "shanghai", "suzhou", "hangzhou", "jiangsu", "zhejiang", "nanjing",
      "shaoxing", "liangzhu", "yuhang", "west-lake", "zhenjiang", "yiwu",
      "jinhua",
    ],
    topics: ["garden", "grand-canal", "water-town", "jiangnan"],
  },
  "shanghai-suzhou-5-day-private-tour": {
    destinations: ["shanghai", "suzhou", "jiangsu", "nanjing", "zhenjiang"],
    topics: ["garden", "grand-canal", "water-town", "jiangnan"],
  },
  "beijing-highlights-5-day-private-tour": {
    destinations: [
      "beijing", "forbidden-city", "palace-museum", "tiananmen-square",
      "summer-palace", "temple-of-heaven", "badaling", "mutianyu", "datong",
      "yungang-grottoes", "shanxi", "inner-mongolia", "hohhot", "ordos",
    ],
    topics: ["great-wall", "imperial", "first-trip"],
  },
  "xian-terracotta-warriors-5-day-private-tour": {
    destinations: [
      "xian", "shaanxi", "terracotta-warriors", "lintong",
      "shaanxi-history-museum", "tianshui", "maijishan-grottoes", "gansu",
      "dunhuang", "mogao-caves",
    ],
    topics: ["terracotta-warriors", "city-wall", "archaeology"],
  },
  "chengdu-pandas-sanxingdui-5-day-private-tour": {
    destinations: ["chengdu", "dujiangyan", "sanxingdui", "guanghan", "deyang", "sichuan"],
    topics: ["panda", "pandas", "sanxingdui"],
  },
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour": {
    destinations: ["chengdu", "jiuzhaigou", "huanglong", "sichuan"],
    topics: ["mountain-scenery", "nature"],
  },
  "chengdu-chongqing-8-day-private-tour": {
    destinations: ["chengdu", "chongqing", "leshan", "sichuan", "wulong"],
    topics: ["multi-city", "route-order"],
  },
  "chongqing-wulong-5-day-private-tour": {
    destinations: ["chongqing", "wulong"],
    topics: ["karst", "mountain-scenery"],
  },
  "guilin-yangshuo-5-day-private-tour": {
    destinations: ["guilin", "yangshuo", "guangxi", "longsheng", "longji"],
    topics: ["karst", "river", "rice-terraces"],
  },
  "kunming-dali-lijiang-8-day-private-tour": {
    destinations: [
      "yunnan", "kunming", "dali", "lijiang", "shangri-la", "shilin",
      "puzhehei", "qiubei", "honghe", "yuanyang", "puer", "baoshan",
      "lincang", "dehong", "dayan", "shuhe", "zhoucheng",
    ],
    topics: ["old-town", "ethnic-culture", "mountain-scenery"],
  },
  "zhangjiajie-furong-fenghuang-7-day-private-tour": {
    destinations: ["zhangjiajie", "wulingyuan", "fenghuang", "xiangxi", "chadong", "furong"],
    topics: ["fenghuang", "furong-town", "multi-base"],
  },
  "zhangjiajie-forest-4-day-private-tour": {
    destinations: ["zhangjiajie", "wulingyuan", "hunan"],
    topics: ["national-forest-park", "yuanjiajie", "tianzi-mountain", "golden-whip-stream"],
  },
  "zhangjiajie-4-day-private-tour": {
    destinations: ["zhangjiajie", "wulingyuan", "hunan", "changsha", "yueyang", "liye"],
    topics: ["tianmen-mountain", "glass-bridge", "mountain-scenery"],
  },
  "harbin-winter-5-day-private-tour": {
    destinations: ["harbin", "heilongjiang"],
    topics: ["winter", "snow", "ice"],
  },
  "changbaishan-yanji-winter-6-day-private-tour": {
    destinations: ["changbai-mountain", "jilin", "yanji"],
    topics: ["winter", "snow", "ski"],
  },
  "guangzhou-shunde-foshan-5-day-private-tour": {
    destinations: [
      "guangzhou", "shunde", "foshan", "guangdong", "shenzhen", "hong-kong",
      "macau", "zhuhai", "hengqin", "jiangmen", "yangjiang", "hainan",
      "wenchang", "longlou",
    ],
    topics: ["lingnan", "dim-sum", "morning-tea"],
  },
  "xiamen-tulou-quanzhou-6-day-private-tour": {
    destinations: [
      "fujian", "xiamen", "gulangyu", "quanzhou", "nanjing-county",
      "yongding", "huaan", "putian", "meizhou-island",
    ],
    topics: ["tulou", "maritime-heritage", "tea"],
  },
  "chaozhou-shantou-nanao-5-day-private-tour": {
    destinations: ["chaozhou", "shantou", "guangdong", "chaoyang", "puning", "shanwei"],
    topics: ["chaoshan", "coast", "food"],
  },
  "guizhou-huangguoshu-libo-miao-7-day-private-tour": {
    destinations: ["guizhou", "guiyang", "anshun", "qiandongnan", "taijiang", "taipan-village"],
    topics: ["waterfall", "karst", "miao-culture"],
  },
  "huangshan-hongcun-huizhou-5-day-private-tour": {
    destinations: ["huangshan", "anhui", "jingxian", "xuancheng", "hongcun", "huizhou"],
    topics: ["mountain-scenery", "village", "huizhou"],
  },
  "jingdezhen-wuyuan-wangxian-6-day-private-tour": {
    destinations: ["jiangxi", "nanchang", "jingdezhen", "wuyuan", "sanqingshan", "wangxian"],
    topics: ["ceramics", "porcelain", "village"],
  },
  "shanghai-disneyland-5-day-private-tour": {
    destinations: ["shanghai", "shanghai-disneyland"],
    topics: ["disneyland", "theme-park", "family"],
  },
  "luoyang-dengfeng-kaifeng-6-day-private-tour": {
    destinations: ["henan", "luoyang", "dengfeng", "kaifeng", "shaolin-temple", "longmen-grottoes"],
    topics: ["heritage", "buddhist-art"],
  },
  "datong-pingyao-6-day-private-tour": {
    destinations: ["shanxi", "datong", "pingyao", "taiyuan", "yungang-grottoes", "hanging-temple"],
    topics: ["heritage", "old-town"],
  },
  "zhangye-jiayuguan-dunhuang-7-day-private-tour": {
    destinations: ["gansu", "zhangye", "jiayuguan", "dunhuang", "mogao-caves", "hexi-corridor"],
    topics: ["silk-road", "desert"],
  },
  "chongqing-yangtze-cruise-6-day-private-tour": {
    destinations: ["chongqing", "yangtze", "yichang", "three-gorges"],
    topics: ["cruise", "river"],
  },
  "xinjiang-ili-sayram-8-day-private-tour": {
    destinations: ["xinjiang", "ili", "sayram", "yining", "nalati"],
    topics: ["grassland", "lake", "road-trip"],
  },
  "hulunbuir-7-day-private-tour": {
    destinations: ["hulunbuir", "inner-mongolia", "hailar", "ergun", "manzhouli"],
    topics: ["grassland", "family", "road-trip"],
  },
  "kunming-jianshui-yuanyang-6-day-private-tour": {
    destinations: ["yunnan", "kunming", "jianshui", "yuanyang", "honghe"],
    topics: ["rice-terraces", "old-town"],
  },
  "shenzhen-family-tech-4-day-private-tour": {
    destinations: ["shenzhen", "guangdong", "huaqiangbei"],
    topics: ["family", "technology", "science"],
  },
  "beijing-xian-shanghai-12-day-private-tour": {
    destinations: ["beijing", "xian", "shanghai", "forbidden-city", "terracotta-warriors"],
    topics: ["first-trip", "multi-city"],
  },
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": { destinations: [] },
  "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour": { destinations: [] },
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": { destinations: [] },
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour": { destinations: [] },
  "beijing-xian-silk-road-15-day-private-tour": { destinations: [] },
  "beijing-xian-yunnan-14-day-private-tour": { destinations: [] },
  "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour": { destinations: [] },
  "china-grand-tour-21-day-private-tour": { destinations: [] },
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour": { destinations: [] },
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour": { destinations: [] },
  "beijing-xian-silk-road-15-day-small-group-tour": { destinations: [] },
  "beijing-xian-guilin-shanghai-10-day-private-tour": { destinations: [] },
  "beijing-hangzhou-suzhou-shanghai-11-day-private-tour": { destinations: [] },
  "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour": { destinations: [] },
};

export const guideProductMappingVersion = "2026-09-23-v2";

function signalTokens(values: readonly string[]) {
  const tokens = new Set<string>();
  for (const value of values) {
    const normalized = value.toLowerCase();
    tokens.add(normalized);
    for (const token of normalized.split(/[^a-z0-9]+/u)) {
      if (token) tokens.add(token);
    }
  }
  return tokens;
}

function affinityScore(
  guide: (typeof guideRegistry)[number],
  affinity: ProductAffinity,
) {
  const destinations = new Set(guide.destinations.map((value) => value.toLowerCase()));
  const signals = signalTokens([
    guide.id,
    ...guide.destinations,
    ...guide.topics,
  ]);
  const destinationMatches = affinity.destinations.filter((value) => destinations.has(value)).length;
  const topicMatches = (affinity.topics ?? []).filter((value) => signals.has(value)).length;
  return destinationMatches * 100 + topicMatches * 15;
}

function fnv1a32(value: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function weightedRendezvousScore(guideId: GuideId, productId: GuideProductId) {
  const hash = fnv1a32(`${guideProductMappingVersion}|${guideId}|${productId}`);
  const unit = (hash + 1) / 4_294_967_297;
  return -Math.log(unit) / guideProductMarketForecast[productId];
}

function assertDistributionIntegrity() {
  const catalogIds = new Set(getPublishedPrivateTourCatalog("en").map((product) => product.id));
  const profileIds = Object.keys(guideProductMarketForecast) as GuideProductId[];
  const total = profileIds.reduce((sum, productId) => sum + guideProductMarketForecast[productId], 0);
  if (total !== 100) throw new Error(`Guide product market forecast must total 100, received ${total}`);
  for (const productId of profileIds) {
    if (!catalogIds.has(productId)) throw new Error(`Unpublished guide product forecast target: ${productId}`);
    if (!productAffinities[productId]) throw new Error(`Missing guide product affinity: ${productId}`);
  }
  if (catalogIds.size !== profileIds.length) {
    const missing = [...catalogIds].filter((productId) => !Object.hasOwn(guideProductMarketForecast, productId));
    throw new Error(`Published products missing from guide product forecast: ${missing.join(", ")}`);
  }
}

export interface GuideProductAssignment {
  readonly productId: GuideProductId;
  readonly forecastPercent: number;
  readonly relevance: "guide-signals" | "market-forecast";
  readonly affinityScore: number;
}

function forecastQuotas(totalGuides: number) {
  const productIds = Object.keys(guideProductMarketForecast) as GuideProductId[];
  const rows = productIds.map((productId) => {
    const exact = (guideProductMarketForecast[productId] * totalGuides) / 100;
    return { productId, count: Math.floor(exact), remainder: exact - Math.floor(exact) };
  });
  let left = totalGuides - rows.reduce((sum, row) => sum + row.count, 0);
  for (const row of [...rows].sort((a, b) =>
    b.remainder - a.remainder || a.productId.localeCompare(b.productId),
  )) {
    if (left <= 0) break;
    row.count += 1;
    left -= 1;
  }
  return new Map(rows.map((row) => [row.productId, row.count]));
}

/**
 * Build assignments only for guides that will actually render the fallback
 * card. Callers must exclude guides with a reviewed card or a curated product
 * mapping so those pages cannot consume invisible market-forecast slots.
 */
export function buildGuideProductAssignments(guideIds: readonly GuideId[]) {
  assertDistributionIntegrity();
  const requestedGuideIds = new Set(guideIds);
  if (requestedGuideIds.size !== guideIds.length) {
    throw new Error("Guide product assignment cohort contains duplicate guide IDs");
  }
  const guides = guideRegistry.filter((guide) => requestedGuideIds.has(guide.id));
  if (guides.length !== requestedGuideIds.size) {
    const knownGuideIds = new Set(guides.map((guide) => guide.id));
    const unknownGuideIds = guideIds.filter((guideId) => !knownGuideIds.has(guideId));
    throw new Error(`Unknown guide product assignment cohort: ${unknownGuideIds.join(", ")}`);
  }
  const assignments = new Map<GuideId, GuideProductAssignment>();
  const forecastOnlyGuides: (typeof guideRegistry)[number][] = [];

  for (const guide of guides) {
    const scored = (Object.keys(guideProductMarketForecast) as GuideProductId[]).map((productId) => ({
      productId,
      affinityScore: affinityScore(guide, productAffinities[productId]),
    }));
    const maximumAffinity = Math.max(...scored.map((candidate) => candidate.affinityScore));
    if (maximumAffinity <= 0) {
      forecastOnlyGuides.push(guide);
      continue;
    }
    const candidates = scored.filter((candidate) => candidate.affinityScore === maximumAffinity);
    const selected = candidates.reduce((best, candidate) =>
      weightedRendezvousScore(guide.id, candidate.productId)
        < weightedRendezvousScore(guide.id, best.productId)
        ? candidate
        : best,
    );
    assignments.set(guide.id, {
      productId: selected.productId,
      forecastPercent: guideProductMarketForecast[selected.productId],
      relevance: "guide-signals",
      affinityScore: selected.affinityScore,
    });
  }

  const quotas = forecastQuotas(forecastOnlyGuides.length);
  const slots = [...quotas].flatMap(([productId, count]) =>
    Array.from({ length: count }, (_, ordinal) => ({ productId, ordinal })),
  ).sort((a, b) => {
    const hashDifference = fnv1a32(`${guideProductMappingVersion}|slot|${a.productId}|${a.ordinal}`)
      - fnv1a32(`${guideProductMappingVersion}|slot|${b.productId}|${b.ordinal}`);
    return hashDifference || a.productId.localeCompare(b.productId) || a.ordinal - b.ordinal;
  });
  const orderedGuides = [...forecastOnlyGuides].sort((a, b) => {
    const hashDifference = fnv1a32(`${guideProductMappingVersion}|guide|${a.id}`)
      - fnv1a32(`${guideProductMappingVersion}|guide|${b.id}`);
    return hashDifference || a.id.localeCompare(b.id);
  });
  orderedGuides.forEach((guide, index) => {
    const productId = slots[index].productId;
    assignments.set(guide.id, {
      productId,
      forecastPercent: guideProductMarketForecast[productId],
      relevance: "market-forecast",
      affinityScore: 0,
    });
  });

  if (assignments.size !== guides.length) {
    throw new Error(`Guide product assignment coverage ${assignments.size}/${guides.length}`);
  }
  return assignments;
}

export function getGuideProductDistributionSummary(
  assignments: ReadonlyMap<GuideId, GuideProductAssignment>,
) {
  const counts = new Map<GuideProductId, number>();
  let related = 0;
  let forecast = 0;
  for (const assignment of assignments.values()) {
    counts.set(assignment.productId, (counts.get(assignment.productId) ?? 0) + 1);
    if (assignment.relevance === "guide-signals") related += 1;
    else forecast += 1;
  }
  return { counts, related, forecast, total: assignments.size } as const;
}
