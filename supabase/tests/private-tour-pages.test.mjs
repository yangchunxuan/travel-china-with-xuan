import assert from "node:assert/strict";
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

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");
const locales = ["en", "zh", "ko"];
const reservedStaticSlug = "zhangjiajie-4-day-private-tour";
const shanghaiJiangnanSlug =
  "shanghai-suzhou-hangzhou-6-day-private-tour";

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
  return [
    ...Object.keys(value),
    ...Object.values(value).flatMap(objectKeys),
  ];
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

test("eight private tours resolve to all three static route families", async () => {
  assert.equal(privateTourProducts.length, 8);
  assert.equal(new Set(privateTourProducts.map((product) => product.slug)).size, 8);
  assert.equal(isReservedPrivateTourSlug(reservedStaticSlug), true);
  assert.equal(getPrivateTourProduct(reservedStaticSlug), undefined);

  for (const locale of locales) {
    const params = getPrivateTourRouteParams(locale);
    assert.equal(params.length, 8, locale);
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

test("homepage tour images declare their real intrinsic dimensions", async () => {
  const usedImagePaths = new Set();

  for (const product of privateTourProducts) {
    const heroPath = path.join(projectRoot, "public", product.heroImage.src.slice(1));
    const heroMetadata = await sharp(heroPath).metadata();
    assert.equal(heroMetadata.width, product.heroImage.width, product.slug);
    assert.equal(heroMetadata.height, product.heroImage.height, product.slug);

    const homepageImage = usedImagePaths.has(product.heroImage.src)
      ? product.gallery.find(
          (image) =>
            image.src !== product.heroImage.src &&
            !usedImagePaths.has(image.src),
        ) ?? product.heroImage
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

test("the other seven tours provide complete trilingual route media for every day", async () => {
  const products = privateTourProducts.filter(
    (product) => product.slug !== shanghaiJiangnanSlug,
  );
  assert.equal(products.length, 7);

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
    assert.deepEqual(
      product.routeMedia.map(({ day }) => day),
      expectedDays,
      `${product.slug} must provide route media for every itinerary day in order`,
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
  assert.equal(localized.routeMedia[2].variants.length, 2);
  assert.equal(localized.routeMedia[3].variants.length, 3);
  assert.equal(localized.routeMedia[4].variants.length, 3);

  const [interactive, css] = await Promise.all([
    source("components/ShanghaiJiangnanImagineInteractive.tsx"),
    source("components/ShanghaiJiangnanImaginePage.module.css"),
  ]);
  assert.match(interactive, /matchMedia\("\(max-width: 760px\)"\)\.matches/);
  assert.match(interactive, /product\.routeMedia\b/);
  assert.match(css, /\.routeMobileStage > span\[data-active="true"\]/);
  assert.doesNotMatch(css, /\.routeList li\[aria-current="step"\]\s*\{[^}]*transform:/s);
  assert.match(css, /\.routeSection\s*\{\s*background: var\(--im-white\)/s);
  assert.match(css, /\.scopeSection\s*\{\s*background: var\(--im-white\)/s);
  assert.match(css, /\.finalCta\s*\{[^}]*background: var\(--im-white\)/s);
});

test("product-page motion degrades safely and the Jiangnan body stays white above the footer", async () => {
  const [
    motion,
    jiangnanInteractive,
    jiangnanPage,
    jiangnanCss,
    homeCss,
  ] = await Promise.all([
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

  for (const selector of [
    "page",
    "routeSection",
    "scopeSection",
    "finalCta",
  ]) {
    assert.match(
      jiangnanCss,
      new RegExp(`\\.${selector}\\s*\\{[^}]*background: var\\(--im-white\\)`, "s"),
      `${selector} must remain white`,
    );
  }
  assert.match(jiangnanPage, /<\/main>\s*<HomegroundFooter\b/s);
  assert.match(
    homeCss,
    /\.footer\s*\{[^}]*background: var\(--hg-color-ink\)/s,
  );
});

test("traveler-facing product data does not expose internal commercial terms", () => {
  const forbiddenKeys = /^(cost|costs|profit|margin|markup|commission|supplier|operatorPayment|procurement)$/i;
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
      assert.doesNotMatch(publicCopy, forbiddenText, `${product.slug}/${locale}`);
    }
    assert.match(product.bookingNote.en, /starting price/i);
    assert.match(product.bookingNote.zh, /起价/);
    assert.match(product.bookingNote.ko, /시작가/);
  }
});

test("metadata, hreflang and manifest expose exactly 24 additive tour entries", async () => {
  const nodes = buildPrivateTourContentNodes();
  assert.equal(nodes.length, 8);
  assert.equal(new Set(nodes.map((node) => node.id)).size, 8);
  assert.ok(nodes.every((node) => node.id.startsWith("tour-")));
  assert.ok(nodes.every((node) => node.family === "service"));
  assert.ok(nodes.every((node) => node.primaryIntent === "purchase"));
  assert.ok(nodes.every((node) => node.updatePolicy.refreshCadence === "weekly"));

  const localeVersions = nodes.flatMap((node) => Object.values(node.locales));
  assert.equal(localeVersions.length, 24);
  assert.ok(nodes.every((node) => node.status === "published"));
  assert.ok(nodes.every((node) => node.indexability.index));
  assert.ok(nodes.every((node) => node.indexability.follow));
  assert.ok(
    localeVersions.every((entry) =>
      entry.bodyResource.startsWith("private-tour:"),
    ),
  );
  assert.ok(localeVersions.every((entry) => !entry.path.includes(reservedStaticSlug)));

  const coreEntities = JSON.parse(await source("content/entities/core-places.json"));
  const isolatedManifest = buildContentManifest([
    ...coreEntities,
    ...nodes.map((node) => ({
      schemaVersion: "1.0.0",
      recordType: "content-node",
      data: node,
    })),
  ]);
  const tourEntries = isolatedManifest.entries.filter((entry) =>
    entry.contentId.startsWith("tour-"),
  );
  assert.equal(tourEntries.length, 24);

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
