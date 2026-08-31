import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import zhangjiajieProduct from "../../content/product-previews/zhangjiajie-4-day-private-tour/product.json" with { type: "json" };
import { privateTourProducts } from "../../lib/privateTourProducts.ts";
import {
  assertPublishedPrivateTourCatalogIntegrity,
  getPublishedPrivateTourCatalog,
} from "../../lib/publishedPrivateTourCatalog.ts";
import {
  getPrivateTourHubCopy,
  getPrivateTourHubLanguagePaths,
  privateTourHubPaths,
} from "../../lib/privateTourHubI18n.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");
const locales = ["en", "zh", "ko"];
const expectedSlugs = [
  ...privateTourProducts.map((product) => product.slug),
  zhangjiajieProduct.seo.slug,
].sort();
const expectedPublishedCount = expectedSlugs.length;

test("published private-tour catalog contains every current source in every locale", async () => {
  assert.equal(assertPublishedPrivateTourCatalogIntegrity(), true);

  for (const locale of locales) {
    const catalog = getPublishedPrivateTourCatalog(locale);
    assert.equal(catalog.length, expectedPublishedCount, locale);
    assert.equal(
      new Set(catalog.map((item) => item.id)).size,
      expectedPublishedCount,
      locale,
    );
    assert.equal(
      new Set(catalog.map((item) => item.href)).size,
      expectedPublishedCount,
      locale,
    );
    assert.deepEqual(
      catalog.map((item) => item.slug).sort(),
      expectedSlugs,
      locale,
    );
    assert.equal(
      catalog.filter((item) => item.source === "zhangjiajie-tour").length,
      1,
      locale,
    );

    for (const item of catalog) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      assert.equal(item.href, `${prefix}/tours/${item.slug}/`);
      assert.ok(item.days > 0);
      assert.ok(item.nights >= 0);
      assert.ok(item.comparison.route.length > 0);
      assert.ok(item.comparison.pace.length > 0);
      assert.ok(item.comparison.fit.length > 0);
      assert.ok(item.comparison.highlights.length >= 3);

      const imagePath = path.join(projectRoot, "public", item.image.src.slice(1));
      const imageStats = await stat(imagePath).catch(() => undefined);
      assert.ok(imageStats?.isFile(), `${locale}: missing ${item.image.src}`);
    }
  }
});

test("hub copy and language ownership are complete and self-consistent", () => {
  assert.deepEqual(privateTourHubPaths, {
    en: "/tours/",
    zh: "/zh/tours/",
    ko: "/ko/tours/",
  });
  assert.deepEqual(getPrivateTourHubLanguagePaths(), {
    en: "/tours/",
    "zh-Hans": "/zh/tours/",
    ko: "/ko/tours/",
    "x-default": "/tours/",
  });

  const englishCopy = getPrivateTourHubCopy("en", expectedPublishedCount);
  assert.equal(englishCopy.metadata.title, "Private China Tours");
  assert.match(englishCopy.title, /private China tours/i);

  for (const locale of locales) {
    const copy = getPrivateTourHubCopy(locale, expectedPublishedCount);
    const futureCount = expectedPublishedCount + 1;
    const futureCopy = getPrivateTourHubCopy(locale, futureCount);
    assert.equal(copy.path, privateTourHubPaths[locale]);
    assert.ok(copy.metadata.title.length > 0);
    assert.ok(copy.metadata.description.length > 40);
    assert.ok(copy.title.length > 0);
    assert.ok(copy.quickCompareTitle.length > 0);
    assert.ok(
      copy.quickCompareEyebrow.includes(String(expectedPublishedCount)),
    );
    assert.ok(copy.quickCompareIntroduction.length > 40);
    assert.ok(copy.quickFitLabel.length > 0);
    assert.ok(copy.quickMovementLabel.length > 0);
    assert.equal(copy.summarySteps.length, 3);
    assert.ok(
      copy.tourCount(expectedPublishedCount).includes(
        String(expectedPublishedCount),
      ),
    );
    assert.ok(copy.metadata.description.includes(String(expectedPublishedCount)));
    assert.ok(copy.metadata.openGraphTitle.includes(String(expectedPublishedCount)));
    assert.ok(copy.eyebrow.includes(String(expectedPublishedCount)));
    assert.ok(copy.catalogTitle.includes(String(expectedPublishedCount)));
    assert.ok(copy.catalogIntroduction.includes(String(expectedPublishedCount)));
    for (const value of [
      futureCopy.metadata.description,
      futureCopy.metadata.openGraphTitle,
      futureCopy.eyebrow,
      futureCopy.quickCompareEyebrow,
      futureCopy.catalogTitle,
      futureCopy.catalogIntroduction,
      futureCopy.tourCount(futureCount),
    ]) {
      assert.ok(value.includes(String(futureCount)), `${locale}: ${value}`);
    }
  }
});

test("three route owners expose indexable metadata, canonical and reciprocal hreflang", async () => {
  const [defaultRoute, localizedRoute] = await Promise.all([
    source("app/(default)/tours/page.tsx"),
    source("app/(localized)/[locale]/tours/page.tsx"),
  ]);

  for (const route of [defaultRoute, localizedRoute]) {
    assert.match(route, /getPrivateTourHubLanguagePaths\(\)/);
    assert.match(route, /canonical: copy\.path/);
    assert.match(route, /index: true/);
    assert.match(route, /follow: true/);
    assert.match(route, /<PrivateToursHubPage/);
  }
  assert.match(defaultRoute, /locale="en"/);
  assert.match(localizedRoute, /value === "zh" \|\| value === "ko"/);
  assert.match(localizedRoute, /dynamicParams = false/);
  assert.match(localizedRoute, /dynamic = "force-static"/);
});

test("hub is a comparison owner with visible breadcrumbs and one linked schema item per published tour", async () => {
  const [component, styles, homepageCatalog] = await Promise.all([
    source("components/PrivateToursHubPage.tsx"),
    source("components/PrivateToursHubPage.module.css"),
    source("lib/homepagePrivateTourCatalog.ts"),
  ]);

  assert.match(component, /"@type": "CollectionPage"/);
  assert.match(component, /"@type": "BreadcrumbList"/);
  assert.match(component, /"@type": "ItemList"/);
  assert.match(component, /numberOfItems: products\.length/);
  assert.match(component, /itemListElement: products\.map/);
  assert.match(component, /products\.map\(\(product, index\)/);
  assert.match(component, /<section className=\{styles\.quickCompare\} aria-labelledby="tour-quick-compare-title">/);
  assert.match(component, /<ol className=\{styles\.quickList\}>/);
  assert.match(component, /function CompactTourComparison/);
  assert.ok(
    component.indexOf("className={styles.quickCompare}") <
      component.indexOf("className={styles.catalog}"),
    "the compact comparison must precede the long product cards",
  );
  assert.match(component, /product\.startingPrice\.formatted/);
  assert.match(component, /copy\.groupBasis\(product\.startingPrice\.travelers\)/);
  assert.match(component, /<dt>\{copy\.quickFitLabel\}<\/dt>/);
  assert.match(component, /<dt>\{copy\.quickMovementLabel\}<\/dt>/);
  assert.match(component, /<nav[^>]*className=\{styles\.breadcrumb\}/);
  assert.match(component, /<PrivateTourCatalogLink[^>]*href=\{product\.href\}/);
  assert.match(component, /product\.comparison\.route/);
  assert.match(component, /product\.comparison\.pace/);
  assert.match(component, /product\.comparison\.fit/);
  assert.match(component, /<span aria-hidden="true">[\s\S]*?padStart\(2, "0"\)/);
  assert.match(component, /priority=\{index === 0\}/);
  assert.match(component, /sizes="\(max-width: 768px\) 100vw/);
  const measuredLink = await source("components/PrivateTourCatalogLink.tsx");
  assert.match(measuredLink, /trackEvent\("tour_catalog_product_clicked"/);
  assert.match(measuredLink, /product_slug: productSlug/);
  assert.match(measuredLink, /search_surface: "tours-hub"/);
  assert.doesNotMatch(measuredLink, /window\.location|searchParams|query|hash/);

  assert.match(styles, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(max-width: 48rem\)/);
  assert.match(styles, /\.catalogGrid \{[\s\S]*?grid-template-columns: 1fr/);
  assert.match(styles, /\.quickLink \{[\s\S]*?grid-template-columns:/);
  assert.match(styles, /@media \(max-width: 48rem\)[\s\S]*?\.quickLink \{[\s\S]*?grid-template-columns: 1\.6rem minmax\(0, 1fr\)/);
  assert.match(
    styles,
    /@media \(max-width: 40rem\)\s*\{[\s\S]*?\.catalog\s*\{[\s\S]*?display:\s*none;/,
    "phones must expose the compact list as the only accessible tour catalog",
  );
  assert.doesNotMatch(styles, /\.quick(?:List|Details|Link)[^{]*\{[^}]*display:\s*none/);
  assert.doesNotMatch(styles, /overflow-x:\s*(?:auto|scroll)|scroll-snap/);
  assert.doesNotMatch(styles, /last-child:nth-child\(odd\)/);

  assert.match(homepageCatalog, /getPublishedPrivateTourCatalog\(locale\)/);
  assert.match(homepageCatalog, /homepagePrivateTourSlugs\.map/);
  assert.doesNotMatch(
    homepageCatalog,
    /privateTourProducts|getZhangjiajiePrivateTourHomeCard/,
  );
});
