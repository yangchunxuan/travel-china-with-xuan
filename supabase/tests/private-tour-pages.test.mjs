import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";

import { buildContentManifest } from "../../lib/content-system/manifest.ts";
import {
  assertConvertedPriceInvariant,
  convertCnyToKrw,
  convertCnyToUsd,
  getPrivateTourProduct,
  localizePrivateTourProduct,
  privateTourProducts,
} from "../../lib/privateTourProducts.ts";
import { buildPrivateTourContentNodes } from "../../lib/privateTourContentAdapter.ts";
import {
  buildPrivateTourMetadata,
  getPrivateTourLanguagePaths,
  getPrivateTourRouteParams,
  isReservedPrivateTourSlug,
} from "../../lib/privateTourMetadata.ts";
import {
  getPrivateTourHubLanguagePaths,
  privateTourHubPaths,
} from "../../lib/privateTourHubI18n.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");
const locales = ["en", "zh", "ko"];
const reservedStaticSlug = "zhangjiajie-4-day-private-tour";
const shanghaiJiangnanSlug = "shanghai-suzhou-hangzhou-6-day-private-tour";

const forbiddenPublicGroupRanges = {
  en: /\b2\s*(?:-|–|—|~|to|through)\s*9\s*(?:travell?ers?|guests?|people)\b/i,
  zh: /2\s*(?:-|–|—|~|至|到)\s*9\s*人/,
  ko: /2\s*(?:-|–|—|~|부터)\s*9\s*(?:인|명)/,
};

function stringValues(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringValues);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(stringValues);
  }
  return [];
}

function objectKeys(value) {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap(objectKeys);
  return [...Object.keys(value), ...Object.values(value).flatMap(objectKeys)];
}

function assertLocalizedTextComplete(value, context) {
  assert.ok(value && typeof value === "object", `${context} is missing`);
  assert.deepEqual(
    Object.keys(value).sort(),
    [...locales].sort(),
    `${context} must contain exactly en, zh and ko`,
  );
  for (const locale of locales) {
    assert.equal(typeof value[locale], "string", `${context}.${locale}`);
    assert.ok(value[locale].trim().length > 0, `${context}.${locale} is empty`);
  }
}

async function assertPublicImageExists(src, context) {
  assert.match(src, /^\/images\//, `${context} must use a public image path`);
  const filePath = path.join(projectRoot, "public", src.slice(1));
  const fileStats = await stat(filePath).catch(() => undefined);
  assert.ok(fileStats?.isFile(), `${context} is missing: ${src}`);
}

test("every registry private tour resolves to all three static route families", async () => {
  assert.equal(
    new Set(privateTourProducts.map((product) => product.slug)).size,
    privateTourProducts.length,
  );
  assert.equal(isReservedPrivateTourSlug(reservedStaticSlug), true);
  assert.equal(getPrivateTourProduct(reservedStaticSlug), undefined);

  for (const locale of locales) {
    const params = getPrivateTourRouteParams(locale);
    assert.equal(params.length, privateTourProducts.length, locale);
    assert.ok(params.every(({ slug }) => slug !== reservedStaticSlug));
  }

  for (const product of privateTourProducts) {
    assert.equal(getPrivateTourProduct(product.slug), product);
    for (const locale of locales) {
      const localized = localizePrivateTourProduct(product, locale);
      const prefix = locale === "en" ? "" : `/${locale}`;
      assert.equal(localized.path, `${prefix}/tours/${product.slug}/`);
      assert.ok(localized.title.length > 0);
      assert.ok(localized.metadataDescription.length > 0);
      assert.equal(localized.itinerary.length, product.days);
    }
  }

  const [defaultRoute, localizedRoute] = await Promise.all([
    source("app/(default)/tours/[slug]/page.tsx"),
    source("app/(localized)/[locale]/tours/[slug]/page.tsx"),
  ]);
  assert.match(defaultRoute, /dynamicParams = false/);
  assert.match(defaultRoute, /isReservedPrivateTourSlug\(slug\)/);
  assert.match(defaultRoute, /getPrivateTourRouteParams\("en"\)/);
  assert.doesNotMatch(defaultRoute, /\bPrivateTourProductPage\b/);
  assert.match(
    defaultRoute,
    /import\s*\{\s*ShanghaiJiangnanImaginePage\s*\}\s*from\s*["'][^"']+ShanghaiJiangnanImaginePage["']/,
  );
  assert.match(
    defaultRoute,
    /<ShanghaiJiangnanImaginePage\s+product=\{product\}\s+locale="en"\s*\/>/,
  );
  assert.match(localizedRoute, /value === "zh" \|\| value === "ko"/);
  assert.match(localizedRoute, /\["zh", "ko"\] as const/);
  assert.match(localizedRoute, /isReservedPrivateTourSlug\(slug\)/);
  assert.doesNotMatch(localizedRoute, /\bPrivateTourProductPage\b/);
  assert.match(
    localizedRoute,
    /import\s*\{\s*ShanghaiJiangnanImaginePage\s*\}\s*from\s*["'][^"']+ShanghaiJiangnanImaginePage["']/,
  );
  assert.match(
    localizedRoute,
    /<ShanghaiJiangnanImaginePage\s+product=\{product\}\s+locale=\{locale\}\s*\/>/,
  );
});

test("all published tour templates return through the localized tours hub", async () => {
  const [batchTemplate, zhangjiajieTemplate] = await Promise.all([
    source("components/ShanghaiJiangnanImaginePage.tsx"),
    source("components/ZhangjiajiePrivateTourPreviewPage.tsx"),
  ]);

  assert.match(batchTemplate, /const tourHubPath = `\$\{homePath\}tours\/`/);
  assert.match(batchTemplate, /<Link href=\{tourHubPath\}>\{copy\.productLabel\}<\/Link>/);
  assert.match(batchTemplate, /position: 3,\s*name: localized\.title/s);
  assert.match(batchTemplate, /<li aria-current="page">\{localized\.title\}<\/li>/);

  assert.match(zhangjiajieTemplate, /const tourHubPath = `\$\{homePath\}tours\/`/);
  assert.match(zhangjiajieTemplate, /\{published \? \(\s*<li>\s*<Link href=\{tourHubPath\}>/s);
  assert.match(zhangjiajieTemplate, /position: 3,\s*name: copy\.previewBreadcrumb/s);
});

test("homepage tour images declare their real intrinsic dimensions", async () => {
  const usedImagePaths = new Set();

  for (const product of privateTourProducts) {
    const heroPath = path.join(
      projectRoot,
      "public",
      product.heroImage.src.slice(1),
    );
    const heroMetadata = await sharp(heroPath).metadata();
    assert.equal(heroMetadata.width, product.heroImage.width, product.slug);
    assert.equal(heroMetadata.height, product.heroImage.height, product.slug);

    const homepageImage = usedImagePaths.has(product.heroImage.src)
      ? (product.gallery.find(
          (image) =>
            image.src !== product.heroImage.src &&
            !usedImagePaths.has(image.src),
        ) ?? product.heroImage)
      : product.heroImage;
    usedImagePaths.add(homepageImage.src);

    const homepageImagePath = path.join(
      projectRoot,
      "public",
      homepageImage.src.slice(1),
    );
    const homepageMetadata = await sharp(homepageImagePath).metadata();
    assert.equal(homepageMetadata.width, homepageImage.width, product.slug);
    assert.equal(homepageMetadata.height, homepageImage.height, product.slug);
  }
});

test("public price tiers stay complete, positive and conversion-safe", () => {
  const officialReferenceCnyPerUsd = 6.7817;
  const officialReferenceKrwPerCny = 210.76;

  for (const product of privateTourProducts) {
    assert.ok(product.packages.length > 0, product.slug);
    for (const tourPackage of product.packages) {
      assert.deepEqual(
        tourPackage.prices.map((tier) => tier.travelers),
        [2, 4],
        `${product.slug}/${tourPackage.id}`,
      );
      for (const tier of tourPackage.prices) {
        assert.ok(Number.isFinite(tier.cnyPerPerson) && tier.cnyPerPerson > 0);
        assert.equal(
          assertConvertedPriceInvariant(
            tier.cnyPerPerson,
            convertCnyToUsd(tier.cnyPerPerson),
            "USD",
          ),
          true,
        );
        assert.equal(
          assertConvertedPriceInvariant(
            tier.cnyPerPerson,
            convertCnyToKrw(tier.cnyPerPerson),
            "KRW",
          ),
          true,
        );
        assert.ok(
          convertCnyToUsd(tier.cnyPerPerson) * officialReferenceCnyPerUsd >=
            tier.cnyPerPerson,
          `${product.slug}/${tier.travelers} USD fell below the CNY base`,
        );
        assert.ok(
          convertCnyToKrw(tier.cnyPerPerson) / officialReferenceKrwPerCny >=
            tier.cnyPerPerson,
          `${product.slug}/${tier.travelers} KRW fell below the CNY base`,
        );
      }
    }
  }
});

test("Shanghai Suzhou Hangzhou publishes only verified 2- and 4-traveller prices", () => {
  const product = getPrivateTourProduct(shanghaiJiangnanSlug);
  assert.ok(product);
  assert.deepEqual(product.packages[0].prices, [
    { travelers: 2, cnyPerPerson: 12490 },
    { travelers: 4, cnyPerPerson: 8190 },
  ]);

  assert.deepEqual(
    localizePrivateTourProduct(product, "en").packages[0].rows.map(
      ({ travelers, formatted }) => ({ travelers, formatted }),
    ),
    [
      { travelers: 2, formatted: "$1,930" },
      { travelers: 4, formatted: "$1,260" },
    ],
  );
  assert.deepEqual(
    localizePrivateTourProduct(product, "ko").packages[0].rows.map(
      ({ travelers, formatted }) => ({ travelers, formatted }),
    ),
    [
      { travelers: 2, formatted: "₩2,690,000" },
      { travelers: 4, formatted: "₩1,770,000" },
    ],
  );
});

test("live-QA tour fact and safety corrections stay complete in all three locales", () => {
  const product = (slug) => {
    const result = getPrivateTourProduct(slug);
    assert.ok(result, slug);
    assert.equal(result.dateModified, "2026-08-31", `${slug} freshness`);
    return result;
  };
  const requireFragments = (value, fragments, context) => {
    for (const fragment of fragments) {
      assert.ok(value.includes(fragment), `${context}: missing ${fragment}`);
    }
  };
  const itineraryDay = (localized, day, context) => {
    const result = localized.itinerary.find((entry) => entry.day === day);
    assert.ok(result, `${context}/day-${day}`);
    return result;
  };

  const harbin = product("harbin-winter-5-day-private-tour");
  const harbinRules = {
    en: {
      dayTwo: ["named, managed", "confirms open that day", "Never enter unmanaged river ice"],
      service: ["do not replace professional cold-weather clothing", "insulated snow boots"],
      booking: [
        "below −20°C",
        "professional cold-weather clothing",
        "wind chill",
        "may be shortened or cancelled",
        "named, managed activity",
        "never enter unmanaged river ice",
      ],
      impossibleGuarantee: /will never be (?:shortened|cancelled)/i,
    },
    zh: {
      dayTwo: ["由正规机构管理", "确认当天开放", "不得自行进入未管理冰面"],
      service: ["不能替代专业防寒服", "保暖雪地靴"],
      booking: [
        "−20°C 以下",
        "专业防寒服",
        "风寒",
        "可能因",
        "缩短或取消",
        "由正规机构管理",
        "不得自行进入未管理冰面",
      ],
      impossibleGuarantee: /(?:绝不会|永不)(?:缩短|取消)/,
    },
    ko: {
      dayTwo: ["정식으로 관리", "당일 개장을 확인", "관리되지 않는 강 얼음 위에는 들어가지 않습니다"],
      service: ["전문 방한복", "대신하지 않습니다"],
      booking: [
        "영하 20°C 이하",
        "전문 방한복",
        "체감온도",
        "단축되거나 취소될 수",
        "정식으로 관리",
        "관리되지 않는 강 얼음 위에는 들어가지 마세요",
      ],
      impossibleGuarantee: /절대 (?:단축|취소)되지/,
    },
  };
  for (const locale of locales) {
    const localized = localizePrivateTourProduct(harbin, locale);
    const rules = harbinRules[locale];
    requireFragments(
      itineraryDay(localized, 2, `harbin/${locale}`).description,
      rules.dayTwo,
      `harbin/${locale}/day-2`,
    );
    requireFragments(localized.serviceNote, rules.service, `harbin/${locale}/serviceNote`);
    requireFragments(localized.bookingNote, rules.booking, `harbin/${locale}/bookingNote`);
    assert.doesNotMatch(localized.bookingNote, rules.impossibleGuarantee);
  }

  const shanghai = product("shanghai-suzhou-5-day-private-tour");
  const shanghaiRules = {
    en: {
      common: [
        "9 July 2026",
        "14 November 2027",
        "advance reservation and ticket purchase",
        "only the ticketed Ancient Civilizations of the Americas exhibition",
        "permanent collection is at the East Museum",
      ],
      dayOnly: "Only one option is included",
      bookingOnly: "not both",
    },
    zh: {
      common: [
        "2026 年 7 月 9 日",
        "2027 年 11 月 14 日",
        "提前预约购票",
        "仅开放需购票的“世界树之巅：美洲古代文明大展”",
        "常设展在东馆",
      ],
      dayOnly: "仅包含一项",
      bookingOnly: "仅包含",
    },
    ko: {
      common: [
        "2026년 7월 9일",
        "2027년 11월 14일",
        "사전 예약 및 입장권 구매",
        "유료 ‘아메리카 고대문명 대전’만 운영",
        "상설전시는 동관",
      ],
      dayOnly: "한 곳만 포함",
      bookingOnly: "한 곳만 포함",
    },
  };
  for (const locale of locales) {
    const localized = localizePrivateTourProduct(shanghai, locale);
    const dayThree = itineraryDay(localized, 3, `shanghai/${locale}`);
    const rules = shanghaiRules[locale];
    requireFragments(dayThree.description, rules.common, `shanghai/${locale}/day-3`);
    assert.ok(dayThree.description.includes(rules.dayOnly));
    requireFragments(localized.bookingNote, rules.common, `shanghai/${locale}/bookingNote`);
    assert.ok(localized.bookingNote.includes(rules.bookingOnly));
  }

  const xian = product("xian-terracotta-warriors-5-day-private-tour");
  const xianRules = {
    en: {
      title: "Muslim Quarter and Xi'an Museum complex",
      highlight: "Xi'an Museum complex, including the Small Wild Goose Pagoda heritage area",
      description: [
        "Xi'an Museum complex",
        "Jianfu Temple site",
        "Small Wild Goose Pagoda heritage area",
        "which areas are open and included",
      ],
      falseChoice: /choose between|either[- ]or|choice of Xi'an Museum|Xi'an Museum or (?:the )?Small Wild Goose Pagoda/i,
    },
    zh: {
      title: "回民街与西安博物院景区",
      highlight: "西安博物院景区（含小雁塔历史文化片区）",
      description: ["西安博物院景区", "荐福寺遗址", "小雁塔历史文化片区", "开放并纳入行程"],
      falseChoice: /二选一|西安博物院或小雁塔/,
    },
    ko: {
      title: "회민거리와 시안박물원 단지",
      highlight: "소안탑 역사문화 구역을 포함한 시안박물원 단지",
      description: ["시안박물원 단지", "젠푸사 유적", "소안탑 역사문화 구역", "개방되고 일정에 포함"],
      falseChoice: /중 한 곳|시안박물원 또는 소안탑/,
    },
  };
  for (const locale of locales) {
    const localized = localizePrivateTourProduct(xian, locale);
    const dayFour = itineraryDay(localized, 4, `xian/${locale}`);
    const rules = xianRules[locale];
    assert.equal(dayFour.title, rules.title);
    assert.ok(localized.highlights.includes(rules.highlight));
    requireFragments(dayFour.description, rules.description, `xian/${locale}/day-4`);
    assert.doesNotMatch(
      `${dayFour.title}\n${localized.highlights.join("\n")}\n${dayFour.description}`,
      rules.falseChoice,
    );
  }

  const chongqing = product("chongqing-wulong-5-day-private-tour");
  const chongqingRules = {
    en: {
      standard: ["current standard admission", "official transfer bus", "Tianlong revolving elevator"],
      conditionalService: ["exit battery car", "glass viewing platform", "included only when written"],
      conditionalExclusion: ["exit battery car", "glass viewing platform", "unless written"],
      dayFour: [
        "either the Fairy Mountain admission ticket or the Furong Cave admission-and-ropeway package",
        "Only one is included, not both",
      ],
      booking: ["either the Fairy Mountain admission ticket or the Furong Cave admission-and-ropeway package", "not both"],
    },
    zh: {
      standard: ["当前标准票", "官方中转车", "天龙旋梯"],
      conditionalService: ["出口电瓶车", "玻璃眺台", "仅在确认单写明时包含"],
      conditionalExclusion: ["出口电瓶车", "玻璃眺台", "确认单未写明"],
      dayFour: ["仙女山门票", "芙蓉洞门票及索道套票", "两者仅含其一", "不同时包含"],
      booking: ["仅包含仙女山门票或芙蓉洞门票及索道套票其中一项"],
    },
    ko: {
      standard: ["현재 표준 입장권", "공식 환승버스", "톈룽 회전 엘리베이터"],
      conditionalService: ["출구 전동카트", "유리 전망대", "경우에만 포함"],
      conditionalExclusion: ["출구 전동카트", "유리 전망대", "명시되지 않은"],
      dayFour: ["선녀산 입장권", "부용동 입장권·케이블카 패키지", "둘 중 하나만 포함", "모두 포함하지 않습니다"],
      booking: ["중 하나만 포함"],
    },
  };
  for (const locale of locales) {
    const localized = localizePrivateTourProduct(chongqing, locale);
    const rules = chongqingRules[locale];
    requireFragments(
      itineraryDay(localized, 3, `chongqing/${locale}`).description,
      rules.standard,
      `chongqing/${locale}/day-3-standard-ticket`,
    );
    requireFragments(
      localized.serviceNote,
      rules.conditionalService,
      `chongqing/${locale}/serviceNote-conditional-extras`,
    );
    requireFragments(
      localized.exclusions.join("\n"),
      rules.conditionalExclusion,
      `chongqing/${locale}/exclusions-conditional-extras`,
    );
    requireFragments(
      itineraryDay(localized, 4, `chongqing/${locale}`).description,
      rules.dayFour,
      `chongqing/${locale}/day-4-one-option`,
    );
    requireFragments(
      localized.bookingNote,
      rules.booking,
      `chongqing/${locale}/bookingNote-one-option`,
    );
  }
});

test("the remaining tours keep complete itineraries and only publish verified route media", async () => {
  const products = privateTourProducts.filter(
    (product) => product.slug !== shanghaiJiangnanSlug,
  );
  assert.equal(products.length, privateTourProducts.length - 1);

  const imagesToCheck = [];
  for (const product of products) {
    const expectedDays = Array.from(
      { length: product.days },
      (_, index) => index + 1,
    );
    assert.deepEqual(
      product.itinerary.map(({ day }) => day),
      expectedDays,
      `${product.slug} itinerary days`,
    );
    assert.ok(Array.isArray(product.routeMedia), `${product.slug} routeMedia`);
    assert.ok(product.routeMedia.length > 0, `${product.slug} routeMedia`);
    const mediaDays = product.routeMedia.map(({ day }) => day);
    assert.deepEqual(
      mediaDays,
      [...new Set(mediaDays)].sort((left, right) => left - right),
      `${product.slug} route-media days must be unique and ordered`,
    );
    assert.ok(
      mediaDays.every((dayNumber) => expectedDays.includes(dayNumber)),
      `${product.slug} route media must belong to an itinerary day`,
    );

    for (const group of product.routeMedia) {
      assert.ok(
        group.variants.length > 0,
        `${product.slug}/day-${group.day} has no route media`,
      );
      for (const [variantIndex, variant] of group.variants.entries()) {
        const context = `${product.slug}/day-${group.day}/variant-${variantIndex + 1}`;
        assertLocalizedTextComplete(variant.label, `${context}.label`);
        assertLocalizedTextComplete(variant.image.alt, `${context}.image.alt`);
        assertLocalizedTextComplete(
          variant.image.caption,
          `${context}.image.caption`,
        );
        assert.ok(variant.image.width > 0, `${context}.image.width`);
        assert.ok(variant.image.height > 0, `${context}.image.height`);
        imagesToCheck.push({
          context: `${context}.image.src`,
          src: variant.image.src,
        });
      }
    }
  }

  await Promise.all(
    imagesToCheck.map(({ src, context }) =>
      assertPublicImageExists(src, context),
    ),
  );
});

test("published private-tour identities do not repeat an image path or image bytes", async () => {
  const zhangjiajiePageSource = await source(
    "components/ZhangjiajiePrivateTourPreviewPage.tsx",
  );
  const zhangjiajieAccommodationPaths = [
    ...new Set(
      zhangjiajiePageSource.match(
        /\/product-previews\/zhangjiajie-4-day-private-tour\/accommodations\/[^"']+/g,
      ) ?? [],
    ),
  ];
  const registryMedia = privateTourProducts.flatMap((product) => [
    { owner: `${product.slug}/hero`, src: product.heroImage.src },
    ...product.gallery.map((image, index) => ({
      owner: `${product.slug}/gallery-${index + 1}`,
      src: image.src,
    })),
    ...product.routeMedia.flatMap((group) =>
      group.variants.map((variant, index) => ({
        owner: `${product.slug}/day-${group.day}-${index + 1}`,
        src: variant.image.src,
      })),
    ),
  ]);
  const zhangjiajieMedia = [
    {
      owner: `${reservedStaticSlug}/hero`,
      src: "/product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg",
    },
    {
      owner: `${reservedStaticSlug}/day-2`,
      src: "/product-previews/zhangjiajie-4-day-private-tour/route/day-2-bailong-elevator.jpg",
    },
    {
      owner: `${reservedStaticSlug}/day-3`,
      src: "/product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg",
    },
    {
      owner: `${reservedStaticSlug}/day-4`,
      src: "/product-previews/zhangjiajie-4-day-private-tour/hero/tianmen-cave-and-stairs.jpg",
    },
    ...zhangjiajieAccommodationPaths.map((src, index) => ({
      owner: `${reservedStaticSlug}/accommodation-${index + 1}`,
      src,
    })),
  ];
  const allMedia = [...registryMedia, ...zhangjiajieMedia];
  const ownersByPath = new Map();
  const ownersByHash = new Map();

  for (const media of allMedia) {
    const previousPathOwner = ownersByPath.get(media.src);
    assert.equal(
      previousPathOwner,
      undefined,
      `${media.src} is repeated by ${previousPathOwner} and ${media.owner}`,
    );
    ownersByPath.set(media.src, media.owner);

    const filePath = path.join(projectRoot, "public", media.src.slice(1));
    const buffer = await readFile(filePath);
    const hash = createHash("sha256").update(buffer).digest("hex");
    const previousHashOwner = ownersByHash.get(hash);
    assert.equal(
      previousHashOwner,
      undefined,
      `${media.src} repeats the bytes used by ${previousHashOwner}`,
    );
    ownersByHash.set(hash, media.owner);
  }
});

test("traveler-facing pages do not advertise a 2-to-9 group range", async () => {
  for (const product of privateTourProducts) {
    for (const locale of locales) {
      const publicCopy = stringValues(
        localizePrivateTourProduct(product, locale),
      ).join("\n");
      assert.doesNotMatch(
        publicCopy,
        forbiddenPublicGroupRanges[locale],
        `${product.slug}/${locale}`,
      );
    }
  }

  const visitorFacingSources = await Promise.all([
    source("components/ShanghaiJiangnanImaginePage.tsx"),
    source("components/ShanghaiJiangnanImagineInteractive.tsx"),
  ]);
  for (const [locale, pattern] of Object.entries(forbiddenPublicGroupRanges)) {
    for (const [index, pageSource] of visitorFacingSources.entries()) {
      assert.doesNotMatch(
        pageSource,
        pattern,
        `visitor-facing source ${index + 1}/${locale}`,
      );
    }
  }
});

test("Shanghai Suzhou Hangzhou assigns stable, unique primary media to all six days", async () => {
  const product = getPrivateTourProduct(shanghaiJiangnanSlug);
  assert.ok(product);

  const localized = localizePrivateTourProduct(product, "zh");
  assert.deepEqual(
    localized.routeMedia.map(({ day }) => day),
    [1, 2, 3, 4, 5, 6],
  );
  const primarySources = localized.routeMedia.map(
    ({ variants }) => variants[0]?.image.src,
  );
  assert.equal(new Set(primarySources).size, 6);
  assert.notEqual(primarySources[2], primarySources[3]);
  assert.ok(
    localized.routeMedia.every(({ variants }) => variants.length === 1),
    "each day should use one deliberate, non-repeating primary image",
  );

  const [interactive, css] = await Promise.all([
    source("components/ShanghaiJiangnanImagineInteractive.tsx"),
    source("components/ShanghaiJiangnanImaginePage.module.css"),
  ]);
  assert.match(interactive, /matchMedia\("\(max-width: 760px\)"\)\.matches/);
  assert.match(interactive, /product\.routeMedia\b/);
  assert.match(interactive, /assigned\?\.variants\.length \? assigned : null/);
  assert.doesNotMatch(interactive, /index % routeImages\.length/);
  assert.match(css, /\.routeMobileStage > span\[data-active="true"\]/);
  assert.match(css, /\.routeMediaEmpty/);
  assert.doesNotMatch(
    css,
    /\.routeList li\[aria-current="step"\]\s*\{[^}]*transform:/s,
  );
  assert.match(css, /\.routeSection\s*\{\s*background: var\(--im-white\)/s);
  assert.match(css, /\.scopeSection\s*\{\s*background: var\(--im-white\)/s);
  assert.match(css, /\.finalCta\s*\{[^}]*background: var\(--im-white\)/s);
});

test("product-page motion degrades safely and the Jiangnan body stays white above the footer", async () => {
  const [motion, jiangnanInteractive, jiangnanPage, jiangnanCss, homeCss] =
    await Promise.all([
      source("components/PrivateTourMotion.tsx"),
      source("components/ShanghaiJiangnanImagineInteractive.tsx"),
      source("components/ShanghaiJiangnanImaginePage.tsx"),
      source("components/ShanghaiJiangnanImaginePage.module.css"),
      source("components/HomegroundHomePage.module.css"),
    ]);

  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /element\.dataset\.tourRevealed = "true"/);
  assert.match(jiangnanInteractive, /prefers-reduced-motion: reduce/);
  assert.match(jiangnanCss, /@media \(prefers-reduced-motion: reduce\)/);

  for (const selector of ["page", "routeSection", "scopeSection", "finalCta"]) {
    assert.match(
      jiangnanCss,
      new RegExp(
        `\\.${selector}\\s*\\{[^}]*background: var\\(--im-white\\)`,
        "s",
      ),
      `${selector} must remain white`,
    );
  }
  assert.match(jiangnanPage, /<\/main>\s*<HomegroundFooter\b/s);
  assert.match(homeCss, /\.footer\s*\{[^}]*background: var\(--hg-color-ink\)/s);
});

test("traveler-facing product data does not expose internal commercial terms", () => {
  const forbiddenKeys =
    /^(cost|costs|profit|margin|markup|commission|supplier|operatorPayment|procurement)$/i;
  const forbiddenText =
    /地接|成本|利润|毛利|采购价|结算价|supplier cost|operator payment|gross margin|markup|wholesale|commission/i;

  for (const product of privateTourProducts) {
    assert.ok(
      objectKeys(product).every((key) => !forbiddenKeys.test(key)),
      `${product.slug} contains an internal commercial field`,
    );
    for (const locale of locales) {
      const localized = localizePrivateTourProduct(product, locale);
      const publicCopy = stringValues(localized).join("\n");
      assert.doesNotMatch(
        publicCopy,
        forbiddenText,
        `${product.slug}/${locale}`,
      );
    }
    assert.match(product.bookingNote.en, /starting price/i);
    assert.match(product.bookingNote.zh, /起价/);
    assert.match(product.bookingNote.ko, /시작가/);
  }
});

test("manifest distinguishes one tours hub from every registry product and detail locale", async () => {
  const nodes = buildPrivateTourContentNodes();
  const hubNodes = nodes.filter((node) => node.id === "tour-hub");
  const productNodes = nodes.filter((node) => node.id !== "tour-hub");
  const expectedProductCount = privateTourProducts.length;

  assert.equal(nodes.length, expectedProductCount + 1);
  assert.equal(
    new Set(nodes.map((node) => node.id)).size,
    expectedProductCount + 1,
  );
  assert.equal(hubNodes.length, 1);
  assert.equal(productNodes.length, expectedProductCount);

  const hubNode = hubNodes[0];
  assert.equal(hubNode.section, "services");
  assert.equal(hubNode.family, "comparison");
  assert.equal(hubNode.primaryIntent, "compare");
  assert.equal(hubNode.parentContentId, null);
  assert.deepEqual(hubNode.schemaTypes, ["CollectionPage", "ItemList"]);
  assert.equal(hubNode.status, "published");
  assert.deepEqual(hubNode.indexability, { index: true, follow: true });
  assert.equal(hubNode.updatePolicy.refreshCadence, "weekly");
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(hubNode.locales).map(([locale, entry]) => [
        locale,
        entry.path,
      ]),
    ),
    {
      en: privateTourHubPaths.en,
      "zh-Hans": privateTourHubPaths.zh,
      ko: privateTourHubPaths.ko,
    },
  );
  assert.ok(
    Object.values(hubNode.locales).every(
      (entry) => entry.bodyResource === "private-tour-hub:tours",
    ),
  );

  assert.ok(productNodes.every((node) => node.id.startsWith("tour-")));
  assert.ok(productNodes.every((node) => node.family === "service"));
  assert.ok(productNodes.every((node) => node.primaryIntent === "purchase"));
  assert.ok(productNodes.every((node) => node.parentContentId === "tour-hub"));
  assert.ok(
    productNodes.every(
      (node) => node.updatePolicy.refreshCadence === "weekly",
    ),
  );

  const detailLocaleVersions = productNodes.flatMap((node) =>
    Object.values(node.locales),
  );
  assert.equal(detailLocaleVersions.length, expectedProductCount * locales.length);
  assert.ok(productNodes.every((node) => node.status === "published"));
  assert.ok(productNodes.every((node) => node.indexability.index));
  assert.ok(productNodes.every((node) => node.indexability.follow));
  assert.ok(
    detailLocaleVersions.every((entry) =>
      entry.bodyResource.startsWith("private-tour:"),
    ),
  );
  assert.ok(
    detailLocaleVersions.every(
      (entry) => !entry.path.includes(reservedStaticSlug),
    ),
  );

  const coreEntities = JSON.parse(
    await source("content/entities/core-places.json"),
  );
  const isolatedManifest = buildContentManifest([
    ...coreEntities,
    ...nodes.map((node) => ({
      schemaVersion: "1.0.0",
      recordType: "content-node",
      data: node,
    })),
  ]);
  const hubEntries = isolatedManifest.entries.filter(
    (entry) => entry.contentId === "tour-hub",
  );
  const productNodeIds = new Set(productNodes.map((node) => node.id));
  const tourEntries = isolatedManifest.entries.filter((entry) =>
    productNodeIds.has(entry.contentId),
  );
  assert.equal(hubEntries.length, 3);
  assert.equal(tourEntries.length, productNodes.length * locales.length);
  assert.deepEqual(
    Object.fromEntries(hubEntries.map((entry) => [entry.locale, entry.path])),
    {
      en: privateTourHubPaths.en,
      zh: privateTourHubPaths.zh,
      ko: privateTourHubPaths.ko,
    },
  );
  for (const hubEntry of hubEntries) {
    assert.deepEqual(hubEntry.alternates, getPrivateTourHubLanguagePaths());
  }

  for (const product of privateTourProducts) {
    const languages = getPrivateTourLanguagePaths(product);
    assert.deepEqual(languages, {
      en: `/tours/${product.slug}/`,
      "zh-Hans": `/zh/tours/${product.slug}/`,
      ko: `/ko/tours/${product.slug}/`,
      "x-default": `/tours/${product.slug}/`,
    });

    for (const locale of locales) {
      const localized = localizePrivateTourProduct(product, locale);
      const metadata = buildPrivateTourMetadata(product, locale);
      assert.doesNotMatch(localized.metadataTitle, /Homeground China/);
      assert.ok(localized.metadataDescription.length <= 160);
      assert.equal(metadata.alternates.canonical, localized.path);
      assert.deepEqual(metadata.alternates.languages, languages);
      assert.equal(metadata.openGraph.url, localized.path);
      assert.equal(metadata.robots.index, true);
      assert.equal(metadata.robots.follow, true);

      const node = nodes.find(
        (candidate) => candidate.id === `tour-${product.id}`,
      );
      const schemaLocale = locale === "zh" ? "zh-Hans" : locale;
      const entry = node?.locales[schemaLocale];
      assert.ok(entry, `${product.slug}/${locale}`);
      assert.equal(entry.path, localized.path);

      const manifestEntry = tourEntries.find(
        (candidate) =>
          candidate.contentId === `tour-${product.id}` &&
          candidate.locale === locale,
      );
      assert.ok(manifestEntry, `${product.slug}/${locale} manifest entry`);
      assert.equal(manifestEntry.canonicalPath, localized.path);
      assert.deepEqual(manifestEntry.alternates, languages);
    }
  }

  const manifest = await source("lib/searchPlatformManifest.ts");
  assert.match(manifest, /buildPrivateTourContentNodes/);
  assert.match(
    manifest,
    /\.\.\.buildPrivateTourContentNodes\(\)\.map\(contentNodeRecord\)/,
  );
});

test("sitemap assigns weekly refresh and purchase-level priority to tour nodes", async () => {
  const sitemap = await source("app/sitemap.ts");
  assert.match(sitemap, /entry\.contentId\.startsWith\("tour-"\).*0\.75.*0\.7/);
  assert.match(
    sitemap,
    /entry\.contentId\.startsWith\("destination-"\) \|\|\s*entry\.contentId\.startsWith\("tour-"\)/,
  );
});
