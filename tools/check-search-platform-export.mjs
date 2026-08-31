import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { homepagePrivateTourSlugs } from "../lib/homepagePrivateTourCatalog.ts";
import { EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT } from "../lib/legacySystemContentLifecycle.ts";
import { getPublishedPrivateTourCatalog } from "../lib/publishedPrivateTourCatalog.ts";
import { isIsoDateTimeWithTimezone } from "./lib/iso-date-time.mjs";

const outputRoot = path.join(process.cwd(), "out");
const siteUrl = "https://homegroundchina.com";
const editorialPersonId = `${siteUrl}/studio/evan/#person`;
const editorialWebsiteId = `${siteUrl}/#website`;
const allSections = [
  "explore",
  "plan",
  "transport",
  "when-to-go",
  "stay",
  "essentials",
  "culture",
  "tools",
  "services",
];
const collectionSlugsBySection = {
  explore: ["regions-provinces", "cities-neighborhoods", "attractions-nature-heritage"],
  plan: ["trip-length-city-order", "traveller-theme-itineraries", "budget-pace-decisions"],
  transport: ["airports-rail-hubs", "city-pair-routes", "last-mile-transfers"],
  "when-to-go": ["months-seasons", "holidays-crowds", "events-natural-calendar"],
  stay: ["city-areas", "hotel-types-scenic-bases", "access-foreign-guests"],
  essentials: ["entry-transit", "payments-connectivity", "booking-registration-recovery"],
  culture: ["history-people-ideas", "regional-food", "festivals-arts-contemporary"],
  tools: ["route-time", "area-option-selectors", "maps-calculators-reference"],
  services: ["guides-experiences", "transfers-hotels-bookings", "route-whole-trip"],
};
const locales = [
  { runtime: "en", prefix: "", htmlLang: "en", hreflang: "en" },
  { runtime: "zh", prefix: "zh/", htmlLang: "zh-Hans", hreflang: "zh-Hans" },
  { runtime: "ko", prefix: "ko/", htmlLang: "ko", hreflang: "ko" },
];
const publishedDestinationHubIds = [
  "beijing",
  "shanghai",
  "xian",
  "chengdu",
  "guangzhou",
  "hangzhou",
  "zhangjiajie",
  "chongqing",
];
const blockedDestinationHubIds = ["guilin", "shenzhen"];
const tenCityMapPath = "/guides/first-trip-china-airport-station-stay-map/";
const tenCityPackPath =
  "/downloads/homeground-china-10-city-arrival-stay-departure-v1.zip";
const publishedTourSlugs = getPublishedPrivateTourCatalog("en").map(
  (product) => product.slug,
);
const homepagePublishedTourSlugs = [...homepagePrivateTourSlugs];
const transportGuideSlug = "beijing-zhangjiajie-shanghai-transport";
const zhangjiajieHubGuideSlugs = [
  "zhangjiajie-itinerary",
  "zhangjiajie-older-travellers",
  "best-zhangjiajie-night-show",
  "zhangjiajie-glass-bridge-vs-skywalk",
];
const routeTrioGuideSlug = "beijing-zhangjiajie-shanghai-10-days";
const localizedVisaGuideSlugs = [
  "do-us-citizens-need-visa-china-2026",
  "do-singaporeans-need-visa-china",
  "china-240-hour-visa-free-transit-route-check",
];
const englishOnlyVisaGuideSlugs = [
  "china-visa-free-uk-citizens-2026",
  "china-visa-free-canadian-citizens-2026",
];

function routeFor(section, locale) {
  return `${locale.prefix}${section}/`;
}

function absoluteRoute(section, locale) {
  return `${siteUrl}/${routeFor(section, locale)}`;
}

function collectionRoute(section, slug, locale) {
  return `${locale.prefix}${section}/${slug}/`;
}

function absoluteCollectionRoute(section, slug, locale) {
  return `${siteUrl}/${collectionRoute(section, slug, locale)}`;
}

function destinationRoute(id, locale) {
  return `${locale.prefix}destinations/${id}/`;
}

function absoluteDestinationRoute(id, locale) {
  return `${siteUrl}/${destinationRoute(id, locale)}`;
}

function guideRoute(slug, locale) {
  return `${locale.prefix}guides/${slug}/`;
}

function guidesHubPageRoute(page, locale) {
  return page === 1
    ? `${locale.prefix}guides/`
    : `${locale.prefix}guides/page/${page}/`;
}

function absoluteGuidesHubPageRoute(page, locale) {
  return `${siteUrl}/${guidesHubPageRoute(page, locale)}`;
}

function tourHubRoute(locale) {
  return `${locale.prefix}tours/`;
}

function absoluteTourHubRoute(locale) {
  return `${siteUrl}/${tourHubRoute(locale)}`;
}

function tourDetailRoute(slug, locale) {
  return `${locale.prefix}tours/${slug}/`;
}

function absoluteTourDetailRoute(slug, locale) {
  return `${siteUrl}/${tourDetailRoute(slug, locale)}`;
}

function entryOwnerPath(locale) {
  return locale.runtime === "en"
    ? "/guides/china-entry-requirements/"
    : `/${locale.prefix}essentials/entry-transit/`;
}

async function fileExists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function exportedTargetExists(pathname) {
  const relative = decodeURIComponent(pathname).replace(/^\/+|\/+$/gu, "");
  const target = path.resolve(outputRoot, relative);
  if (target !== outputRoot && !target.startsWith(`${outputRoot}${path.sep}`)) {
    return false;
  }
  return (await fileExists(target)) || (await fileExists(path.join(target, "index.html")));
}

function assertIncludes(source, needle, context) {
  if (!source.includes(needle)) {
    throw new Error(`${context}: missing ${needle}`);
  }
}

function jsonLdNodes(html, context) {
  return [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gsu,
    ),
  ].flatMap((match, index) => {
    let document;
    try {
      document = JSON.parse(match[1]);
    } catch (error) {
      throw new Error(
        `${context}: JSON-LD block ${index + 1} is invalid (${error.message})`,
      );
    }
    return document["@graph"] ?? [document];
  });
}

function nodeHasType(node, expectedType) {
  const types = Array.isArray(node?.["@type"])
    ? node["@type"]
    : [node?.["@type"]];
  return types.includes(expectedType);
}

function assertIsoDateTimeWithTimezone(value, context) {
  if (!isIsoDateTimeWithTimezone(value)) {
    throw new Error(
      `${context}: expected a valid ISO DateTime with an explicit timezone, received ${JSON.stringify(value)}`,
    );
  }
}

function sitemapUrlEntry(sitemapXml, location) {
  return [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/gu)]
    .map((match) => match[1])
    .find((entry) => entry.includes(`<loc>${location}</loc>`));
}

function assertSameStringSet(actualValues, expectedValues, context) {
  const actual = [...new Set(actualValues)].sort();
  const expected = [...new Set(expectedValues)].sort();
  if (
    actual.length !== expected.length ||
    actual.some((value, index) => value !== expected[index])
  ) {
    throw new Error(
      `${context}: expected [${expected.join(", ")}], received [${actual.join(", ")}]`,
    );
  }
}

const sitemapPath = path.join(outputRoot, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
const phase0Baseline = JSON.parse(
  await readFile(path.join(process.cwd(), "content/phase0-indexable-path-baseline.json"), "utf8"),
);
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const duplicateSitemapLocs = sitemapLocs.filter(
  (value, index) => sitemapLocs.indexOf(value) !== index,
);

if (duplicateSitemapLocs.length > 0) {
  throw new Error(
    `sitemap.xml contains duplicate loc entries: ${[...new Set(duplicateSitemapLocs)].join(", ")}`,
  );
}

const protectedSitemapUrls = phase0Baseline.entries
  .filter((entry) => entry.status === "published" && entry.indexability.index)
  .map((entry) => `${siteUrl}${entry.path}`);
const missingProtectedSitemapUrls = protectedSitemapUrls.filter(
  (url) => !sitemapLocs.includes(url),
);
if (missingProtectedSitemapUrls.length > 0) {
  throw new Error(
    `sitemap.xml is missing protected Phase 0 URL(s): ${missingProtectedSitemapUrls.join(", ")}`,
  );
}

for (const id of publishedDestinationHubIds) {
  for (const locale of locales) {
    const route = destinationRoute(id, locale);
    const filePath = path.join(outputRoot, route, "index.html");
    const context = `/${route}`;
    const canonical = absoluteDestinationRoute(id, locale);
    if (!(await fileExists(filePath))) {
      throw new Error(`${context}: published destination export is missing`);
    }

    const html = await readFile(filePath, "utf8");
    assertIncludes(html, `<html lang="${locale.htmlLang}"`, context);
    assertIncludes(html, `<link rel="canonical" href="${canonical}"/>`, context);
    if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/iu.test(html)) {
      throw new Error(`${context}: published destination contains noindex`);
    }
    if (!sitemapLocs.includes(canonical)) {
      throw new Error(`${context}: published destination is missing from sitemap.xml`);
    }
  }
}

for (const id of blockedDestinationHubIds) {
  for (const locale of locales) {
    const route = destinationRoute(id, locale);
    const filePath = path.join(outputRoot, route, "index.html");
    const canonical = absoluteDestinationRoute(id, locale);
    if (await fileExists(filePath)) {
      throw new Error(`/${route}: blocked destination was exported`);
    }
    if (sitemapLocs.includes(canonical)) {
      throw new Error(`/${route}: blocked destination entered sitemap.xml`);
    }
  }
}

for (const locale of locales) {
  const homepagePath = path.join(outputRoot, locale.prefix, "index.html");
  const context = locale.prefix ? `/${locale.prefix}` : "/";
  if (!(await fileExists(homepagePath))) {
    throw new Error(`${context}: homepage export is missing`);
  }

  const homepageHtml = await readFile(homepagePath, "utf8");
  for (const id of publishedDestinationHubIds) {
    assertIncludes(
      homepageHtml,
      `href="/${destinationRoute(id, locale)}"`,
      `${context} homepage destination discovery`,
    );
  }
  for (const id of blockedDestinationHubIds) {
    const blockedHref = `href="/${destinationRoute(id, locale)}"`;
    if (homepageHtml.includes(blockedHref)) {
      throw new Error(
        `${context}: blocked destination entered homepage discovery: ${blockedHref}`,
      );
    }
  }

  for (const slug of homepagePublishedTourSlugs) {
    assertIncludes(
      homepageHtml,
      `href="/${locale.prefix}tours/${slug}/"`,
      `${context} homepage published-tour discovery: ${slug}`,
    );
  }
  assertIncludes(
    homepageHtml,
    `data-homepage-product-count="${homepagePublishedTourSlugs.length}"`,
    `${context} homepage published-tour count`,
  );
  const homepageProductSlugs = [
    ...homepageHtml.matchAll(/data-homepage-product-slug="([^"]+)"/giu),
  ].map((match) => match[1]);
  assertSameStringSet(
    homepageProductSlugs,
    homepagePublishedTourSlugs,
    `${context} homepage published-tour cards`,
  );
  if (homepageHtml.includes(`href="${tenCityPackPath}"`)) {
    throw new Error(
      `${context}: the internal asset download displaced the homepage product showcase`,
    );
  }
}

for (const locale of locales) {
  const route = tourHubRoute(locale);
  const filePath = path.join(outputRoot, route, "index.html");
  const context = `/${route}`;
  const canonical = absoluteTourHubRoute(locale);
  if (!(await fileExists(filePath))) {
    throw new Error(`${context}: private-tour hub export is missing`);
  }

  const html = await readFile(filePath, "utf8");
  assertIncludes(html, `<html lang="${locale.htmlLang}"`, context);
  assertIncludes(html, `<link rel="canonical" href="${canonical}"/>`, context);
  if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/iu.test(html)) {
    throw new Error(`${context}: published private-tour hub contains noindex`);
  }
  if (!sitemapLocs.includes(canonical)) {
    throw new Error(`${context}: private-tour hub is missing from sitemap.xml`);
  }

  for (const target of locales) {
    assertIncludes(
      html,
      `<link rel="alternate" hrefLang="${target.hreflang}" href="${absoluteTourHubRoute(target)}"/>`,
      `${context} ${target.hreflang} alternate`,
    );
  }
  assertIncludes(
    html,
    `<link rel="alternate" hrefLang="x-default" href="${absoluteTourHubRoute(locales[0])}"/>`,
    `${context} x-default alternate`,
  );

  const schemaNodes = jsonLdNodes(html, context);
  const collectionPage = schemaNodes.find((node) =>
    nodeHasType(node, "CollectionPage"),
  );
  const itemList = schemaNodes.find((node) => nodeHasType(node, "ItemList"));
  if (!collectionPage) {
    throw new Error(`${context}: CollectionPage schema is missing`);
  }
  if (!itemList) {
    throw new Error(`${context}: ItemList schema is missing`);
  }
  if (collectionPage.url !== canonical) {
    throw new Error(`${context}: CollectionPage URL is not self-canonical`);
  }
  if (itemList.numberOfItems !== publishedTourSlugs.length) {
    throw new Error(
      `${context}: ItemList must declare exactly ${publishedTourSlugs.length} published products`,
    );
  }
  if (!Array.isArray(itemList.itemListElement)) {
    throw new Error(`${context}: ItemList elements are missing`);
  }

  const expectedAbsoluteDetails = publishedTourSlugs.map((slug) =>
    absoluteTourDetailRoute(slug, locale),
  );
  const structuredDetailUrls = itemList.itemListElement.map(
    (entry) => entry?.item?.url ?? entry?.url,
  );
  assertSameStringSet(
    structuredDetailUrls,
    expectedAbsoluteDetails,
    `${context} structured private-tour details`,
  );

  const visibleDetailHrefs = [...html.matchAll(/\bhref="([^"]+)"/giu)]
    .map((match) => match[1])
    .filter((href) =>
      /^\/(?:zh\/|ko\/)?tours\/[^/]+\/$/u.test(href),
    );
  const expectedDetailHrefs = publishedTourSlugs.map(
    (slug) => `/${tourDetailRoute(slug, locale)}`,
  );
  assertSameStringSet(
    visibleDetailHrefs,
    expectedDetailHrefs,
    `${context} visible private-tour detail links`,
  );

  for (const slug of publishedTourSlugs) {
    const detailRoute = tourDetailRoute(slug, locale);
    const detailContext = `/${detailRoute}`;
    const detailCanonical = absoluteTourDetailRoute(slug, locale);
    const detailHtml = await readFile(
      path.join(outputRoot, detailRoute, "index.html"),
      "utf8",
    );
    assertIncludes(
      detailHtml,
      `href="/${route}"`,
      `${detailContext} visible private-tour hub return`,
    );

    const breadcrumb = jsonLdNodes(detailHtml, detailContext).find((node) =>
      nodeHasType(node, "BreadcrumbList"),
    );
    const breadcrumbItems = breadcrumb?.itemListElement;
    if (!Array.isArray(breadcrumbItems)) {
      throw new Error(`${detailContext}: BreadcrumbList schema is missing`);
    }
    const hubCrumb = breadcrumbItems.find((item) => item?.position === 2);
    const pageCrumb = breadcrumbItems.find((item) => item?.position === 3);
    if (hubCrumb?.item !== canonical) {
      throw new Error(`${detailContext}: breadcrumb does not return to its locale hub`);
    }
    if (pageCrumb?.item !== detailCanonical) {
      throw new Error(`${detailContext}: terminal breadcrumb is not self-canonical`);
    }
  }
}

{
  const transportHubPath = path.join(outputRoot, "transport", "index.html");
  const transportHub = await readFile(transportHubPath, "utf8");
  assertIncludes(
    transportHub,
    `href="${tenCityMapPath}"`,
    "/transport/ ten-city map lead guide",
  );
  assertIncludes(
    transportHub,
    `"position":1,"url":"${siteUrl}${tenCityMapPath}"`,
    "/transport/ structured lead-guide order",
  );
}

for (const locale of locales) {
  const route = guideRoute(transportGuideSlug, locale);
  const filePath = path.join(outputRoot, route, "index.html");
  const context = `/${route}`;
  const html = await readFile(filePath, "utf8");

  assertIncludes(html, `href="${tenCityMapPath}"`, `${context} ten-city map`);
  assertIncludes(html, `href="${tenCityPackPath}"`, `${context} ten-city pack`);
  assertIncludes(
    html,
    `href="/${routeFor("transport", locale)}"`,
    `${context} transport guide owner`,
  );
  for (const id of ["beijing", "zhangjiajie", "shanghai"]) {
    assertIncludes(
      html,
      `href="/${destinationRoute(id, locale)}"`,
      `${context} ${id} destination owner`,
    );
  }
}

for (const locale of locales) {
  for (const slug of zhangjiajieHubGuideSlugs) {
    const route = guideRoute(slug, locale);
    const html = await readFile(path.join(outputRoot, route, "index.html"), "utf8");
    assertIncludes(
      html,
      `href="/${destinationRoute("zhangjiajie", locale)}"`,
      `/${route} Zhangjiajie destination owner`,
    );
  }

  const route = guideRoute(routeTrioGuideSlug, locale);
  const html = await readFile(path.join(outputRoot, route, "index.html"), "utf8");
  for (const id of ["beijing", "zhangjiajie", "shanghai"]) {
    assertIncludes(
      html,
      `href="/${destinationRoute(id, locale)}"`,
      `/${route} ${id} destination owner`,
    );
  }
}

for (const locale of locales) {
  for (const slug of localizedVisaGuideSlugs) {
    const route = guideRoute(slug, locale);
    const html = await readFile(path.join(outputRoot, route, "index.html"), "utf8");
    assertIncludes(
      html,
      `href="${entryOwnerPath(locale)}"`,
      `/${route} entry owner`,
    );
  }
}

for (const slug of englishOnlyVisaGuideSlugs) {
  const route = `guides/${slug}/`;
  const html = await readFile(path.join(outputRoot, route, "index.html"), "utf8");
  assertIncludes(
    html,
    'href="/guides/china-entry-requirements/"',
    `/${route} entry owner`,
  );
}

for (const sitemapUrl of sitemapLocs) {
  const url = new URL(sitemapUrl);
  const route = url.pathname.replace(/^\/+|\/+$/gu, "");
  const filePath = path.join(outputRoot, route, "index.html");
  if (!(await fileExists(filePath))) {
    throw new Error(`${url.pathname}: sitemap URL has no exported index.html`);
  }
  const html = await readFile(filePath, "utf8");
  assertIncludes(html, `<link rel="canonical" href="${sitemapUrl}"/>`, url.pathname);
  if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/iu.test(html)) {
    throw new Error(`${url.pathname}: sitemap URL contains noindex`);
  }

  const jsonLdBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gsu)]
    .map((match) => match[1]);
  const jsonLd = jsonLdBlocks.join("\n");
  const topLevelArticleCount = jsonLdBlocks
    .map((block) => JSON.parse(block))
    .flatMap((document) => document["@graph"] ?? [document])
    .filter((node) => node?.["@type"] === "Article")
    .length;
  if (topLevelArticleCount > 0) {
    const localePrefix = url.pathname.startsWith("/zh/")
      ? "/zh"
      : url.pathname.startsWith("/ko/")
        ? "/ko"
        : "";
    assertIncludes(
      jsonLd,
      '"author":{"@id":"https://homegroundchina.com/studio/evan/#person"}',
      `${url.pathname} Article author`,
    );
    assertIncludes(
      jsonLd,
      '"reviewedBy":{"@id":"https://homegroundchina.com/studio/evan/#person"}',
      `${url.pathname} Article reviewer`,
    );
    assertIncludes(
      html,
      `href="${localePrefix}/studio/evan/"`,
      `${url.pathname} visible Evan byline`,
    );
  }

  const localTargets = [
    ...html.matchAll(/\b(?:href|src)="([^"]+)"/giu),
  ].map((match) => match[1]);
  for (const value of localTargets) {
    let targetUrl;
    try {
      targetUrl = new URL(value, siteUrl);
    } catch {
      continue;
    }
    if (targetUrl.origin !== siteUrl) continue;
    if (!(await exportedTargetExists(targetUrl.pathname))) {
      throw new Error(
        `${url.pathname}: internal href/src has no exported target: ${targetUrl.pathname}`,
      );
    }
  }
}

for (const section of allSections) {
  for (const slug of collectionSlugsBySection[section]) {
    for (const locale of locales) {
      const route = collectionRoute(section, slug, locale);
      const filePath = path.join(outputRoot, route, "index.html");
      const context = `/${route}`;
      if (!(await fileExists(filePath))) {
        throw new Error(`${context}: collection export is missing`);
      }

      const html = await readFile(filePath, "utf8");
      const canonical = absoluteCollectionRoute(section, slug, locale);
      assertIncludes(html, `<html lang="${locale.htmlLang}"`, context);
      assertIncludes(html, `<link rel="canonical" href="${canonical}"/>`, context);
      assertIncludes(html, '"@type":"CollectionPage"', context);
      assertIncludes(html, '"@type":"ItemList"', context);

      for (const target of locales) {
        assertIncludes(
          html,
          `<link rel="alternate" hrefLang="${target.hreflang}" href="${absoluteCollectionRoute(section, slug, target)}"/>`,
          context,
        );
      }
      assertIncludes(
        html,
        `<link rel="alternate" hrefLang="x-default" href="${absoluteCollectionRoute(section, slug, locales[0])}"/>`,
        context,
      );

      const isIndexable = sitemap.includes(`<loc>${canonical}</loc>`);
      const hasNoindex =
        /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/iu.test(html);
      if (isIndexable === hasNoindex) {
        throw new Error(
          `${context}: collection sitemap and robots status disagree (sitemap=${isIndexable}, noindex=${hasNoindex})`,
        );
      }

      const itemCount = Number(html.match(/"numberOfItems":(\d+)/u)?.[1] ?? "0");
      if (isIndexable && itemCount < 3) {
        throw new Error(`${context}: indexable collection has only ${itemCount} guide(s)`);
      }
      // A sufficient child count is necessary but deliberately not sufficient:
      // secondary hubs remain noindex until the editorial approval set admits
      // them. The export guard therefore rejects thin indexed pages, but never
      // infers approval from a count alone.
    }
  }
}

const authorProfileModifiedValues = new Set();
for (const locale of locales) {
  const route = `${locale.prefix}studio/evan/`;
  const filePath = path.join(outputRoot, route, "index.html");
  const context = `/${route}`;
  const canonical = `${siteUrl}/${route}`;
  if (!(await fileExists(filePath))) {
    throw new Error(`${context}: Evan profile export is missing`);
  }
  const html = await readFile(filePath, "utf8");
  assertIncludes(html, `<link rel="canonical" href="${canonical}"/>`, context);
  for (const target of locales) {
    assertIncludes(
      html,
      `<link rel="alternate" hrefLang="${target.hreflang}" href="${siteUrl}/${target.prefix}studio/evan/"/>`,
      context,
    );
  }
  assertIncludes(
    html,
    `<link rel="alternate" hrefLang="x-default" href="${siteUrl}/studio/evan/"/>`,
    context,
  );

  const nodes = jsonLdNodes(html, context);
  const profilePages = nodes.filter((node) => nodeHasType(node, "ProfilePage"));
  const authorPeople = nodes.filter(
    (node) =>
      nodeHasType(node, "Person") && node["@id"] === editorialPersonId,
  );
  const websites = nodes.filter(
    (node) =>
      nodeHasType(node, "WebSite") && node["@id"] === editorialWebsiteId,
  );
  if (profilePages.length !== 1) {
    throw new Error(
      `${context}: expected exactly one ProfilePage node, received ${profilePages.length}`,
    );
  }
  if (authorPeople.length !== 1) {
    throw new Error(
      `${context}: expected exactly one Evan Person node, received ${authorPeople.length}`,
    );
  }
  if (websites.length !== 1) {
    throw new Error(
      `${context}: expected exactly one Homeground WebSite node, received ${websites.length}`,
    );
  }

  const profilePage = profilePages[0];
  const authorPerson = authorPeople[0];
  if (profilePage["@id"] !== `${canonical}#webpage`) {
    throw new Error(`${context}: ProfilePage @id does not match the canonical URL`);
  }
  if (profilePage.url !== canonical) {
    throw new Error(`${context}: ProfilePage URL does not match the canonical URL`);
  }
  if (profilePage.inLanguage !== locale.htmlLang) {
    throw new Error(
      `${context}: ProfilePage inLanguage is ${JSON.stringify(profilePage.inLanguage)}, expected ${locale.htmlLang}`,
    );
  }
  if (profilePage.mainEntity?.["@id"] !== authorPerson["@id"]) {
    throw new Error(`${context}: ProfilePage does not identify Evan as mainEntity`);
  }
  if (profilePage.isPartOf?.["@id"] !== websites[0]["@id"]) {
    throw new Error(`${context}: ProfilePage does not link to the Homeground WebSite`);
  }
  if (authorPerson.url !== canonical) {
    throw new Error(`${context}: Evan Person URL does not match the locale canonical`);
  }
  assertIsoDateTimeWithTimezone(profilePage.dateModified, context);
  if (profilePage.dateModified !== EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT) {
    throw new Error(
      `${context}: ProfilePage dateModified does not match its evidenced lifecycle timestamp`,
    );
  }
  authorProfileModifiedValues.add(profilePage.dateModified);
  const sitemapEntry = sitemapUrlEntry(sitemap, canonical);
  if (!sitemapEntry) {
    throw new Error(`${context}: Evan profile is missing from sitemap.xml`);
  }
  assertIncludes(
    sitemapEntry,
    `<lastmod>${EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT.slice(0, 10)}</lastmod>`,
    `${context} sitemap entry`,
  );
}
if (authorProfileModifiedValues.size !== 1) {
  throw new Error(
    `Evan profile locales disagree on dateModified: ${[...authorProfileModifiedValues].join(", ")}`,
  );
}

for (const section of allSections) {
  for (const locale of locales) {
    const route = routeFor(section, locale);
    const filePath = path.join(outputRoot, route, "index.html");
    const context = `/${route}`;
    if (!(await fileExists(filePath))) {
      throw new Error(`${context}: static export is missing`);
    }

    const html = await readFile(filePath, "utf8");
    const canonical = absoluteRoute(section, locale);
    assertIncludes(html, `<html lang="${locale.htmlLang}"`, context);
    assertIncludes(html, `<link rel="canonical" href="${canonical}"/>`, context);
    assertIncludes(html, '"@type":"CollectionPage"', context);
    assertIncludes(html, '"@type":"ItemList"', context);

    for (const target of locales) {
      assertIncludes(
        html,
        `<link rel="alternate" hrefLang="${target.hreflang}" href="${absoluteRoute(section, target)}"/>`,
        context,
      );
    }
    assertIncludes(
      html,
      `<link rel="alternate" hrefLang="x-default" href="${absoluteRoute(section, locales[0])}"/>`,
      context,
    );

    const isIndexable = sitemap.includes(`<loc>${canonical}</loc>`);
    const hasNoindex =
      /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
    if (isIndexable === hasNoindex) {
      throw new Error(
        `${context}: sitemap and robots status disagree (sitemap=${isIndexable}, noindex=${hasNoindex})`,
      );
    }
    const itemCount = Number(html.match(/"numberOfItems":(\d+)/u)?.[1] ?? "0");
    if (isIndexable && itemCount < 1) {
      throw new Error(`${context}: indexable hub has no localized guide children`);
    }
  }
}

const guidesHubPageCounts = new Map();
for (const locale of locales) {
  const hubPath = path.join(outputRoot, `${locale.prefix}guides/`, "index.html");
  const hub = await readFile(hubPath, "utf8");
  const linkedPageNumbers = [
    ...hub.matchAll(
      new RegExp(
        `href="/${locale.prefix}guides/page/(\\d+)/(?:#guide-list)?"`,
        "gu",
      ),
    ),
  ].map((match) => Number(match[1]));
  guidesHubPageCounts.set(
    locale.runtime,
    Math.max(1, ...linkedPageNumbers),
  );
  // Travel Advice owns problem-solving content, not the destination directory,
  // private tours, services or unpublished tool shells. Those have their own
  // purpose-built entry points and must not be recreated as a nine-card index.
  for (const section of [
    "plan",
    "transport",
    "when-to-go",
    "stay",
    "essentials",
    "culture",
  ]) {
    assertIncludes(
      hub,
      `href="/${locale.prefix}${section}/"`,
      `/${locale.prefix}guides/ task handoff`,
    );
  }
  assertIncludes(
    hub,
    `action="/${locale.prefix}guides/search/"`,
    `/${locale.prefix}guides/ search form`,
  );
  assertIncludes(hub, 'name="q"', `/${locale.prefix}guides/ search query field`);
}

for (const locale of locales) {
  const pageCount = guidesHubPageCounts.get(locale.runtime) ?? 1;
  const guidePathPrefix = `/${locale.prefix}guides/`;
  const expectedGuidePaths = sitemapLocs
    .map((url) => new URL(url).pathname)
    .filter((pathname) => {
      if (!pathname.startsWith(guidePathPrefix)) return false;
      const remainder = pathname.slice(guidePathPrefix.length);
      return (
        pathname !== entryOwnerPath(locale) &&
        remainder.length > 1 &&
        /^.[^/]*\/$/u.test(remainder)
      );
    });
  const expectedGuidePathSet = new Set(expectedGuidePaths);
  const discoveredGuidePaths = [];

  for (let page = 1; page <= pageCount; page += 1) {
    const route = guidesHubPageRoute(page, locale);
    const context = `/${route}`;
    const canonical = absoluteGuidesHubPageRoute(page, locale);
    const filePath = path.join(outputRoot, route, "index.html");
    if (!(await fileExists(filePath))) {
      throw new Error(`${context}: paginated guide catalog export is missing`);
    }

    const html = await readFile(filePath, "utf8");
    assertIncludes(html, `<link rel="canonical" href="${canonical}"/>`, context);
    if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/iu.test(html)) {
      throw new Error(`${context}: indexable guide catalog page contains noindex`);
    }
    if (!sitemapLocs.includes(canonical)) {
      throw new Error(`${context}: indexable guide catalog page is missing from sitemap.xml`);
    }

    if (page > 1) {
      const locIndex = sitemap.indexOf(`<loc>${canonical}</loc>`);
      const urlStart = sitemap.lastIndexOf("<url>", locIndex);
      const urlEnd = sitemap.indexOf("</url>", locIndex);
      const sitemapEntry = sitemap.slice(urlStart, urlEnd + 6);
      if (!/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/u.test(sitemapEntry)) {
        throw new Error(`${context}: paginated sitemap entry has no content-derived lastmod`);
      }
    }

    for (const target of locales) {
      if (page > (guidesHubPageCounts.get(target.runtime) ?? 1)) continue;
      assertIncludes(
        html,
        `<link rel="alternate" hrefLang="${target.hreflang}" href="${absoluteGuidesHubPageRoute(page, target)}"/>`,
        `${context} ${target.hreflang} page-equivalent alternate`,
      );
    }
    if (page <= (guidesHubPageCounts.get("en") ?? 1)) {
      assertIncludes(
        html,
        `<link rel="alternate" hrefLang="x-default" href="${absoluteGuidesHubPageRoute(page, locales[0])}"/>`,
        `${context} x-default page-equivalent alternate`,
      );
    }

    const itemCount = Number(html.match(/"numberOfItems":(\d+)/u)?.[1] ?? "0");
    if (itemCount < 1 || itemCount > 24) {
      throw new Error(
        `${context}: ItemList must expose between 1 and 24 guides; received ${itemCount}`,
      );
    }
    const itemList = jsonLdNodes(html, context).find((node) =>
      nodeHasType(node, "ItemList"),
    );
    const structuredGuidePaths = (itemList?.itemListElement ?? []).map(
      (item) => new URL(item.url).pathname,
    );
    if (structuredGuidePaths.length !== itemCount) {
      throw new Error(
        `${context}: ${structuredGuidePaths.length} ItemList entries disagree with numberOfItems ${itemCount}`,
      );
    }
    for (const guidePath of structuredGuidePaths) {
      if (!expectedGuidePathSet.has(guidePath)) {
        throw new Error(`${context}: ItemList exposes a non-indexable guide ${guidePath}`);
      }
      assertIncludes(html, `href="${guidePath}"`, `${context} ${guidePath}`);
    }
    discoveredGuidePaths.push(...structuredGuidePaths);
  }

  if (new Set(discoveredGuidePaths).size !== discoveredGuidePaths.length) {
    throw new Error(`/${locale.prefix}guides/: a guide card appears on more than one page`);
  }
  assertSameStringSet(
    discoveredGuidePaths,
    expectedGuidePaths,
    `/${locale.prefix}guides/ paginated guide crawlability`,
  );
}

for (const locale of locales) {
  const homepagePath = path.join(outputRoot, locale.prefix, "index.html");
  const homepage = await readFile(homepagePath, "utf8");
  const context = `/${locale.prefix}`;
  const searchIndexRoute = `${locale.prefix}guides/guide-search-index.json`;
  const searchIndexPath = path.join(outputRoot, searchIndexRoute);

  assertIncludes(
    homepage,
    `action="/${locale.prefix}guides/search/"`,
    `${context} homepage guide-search form`,
  );
  if (!(await fileExists(searchIndexPath))) {
    throw new Error(`/${searchIndexRoute}: homepage search index is missing`);
  }

  const documents = JSON.parse(await readFile(searchIndexPath, "utf8"));
  if (!Array.isArray(documents) || documents.length === 0) {
    throw new Error(`/${searchIndexRoute}: homepage search index is empty`);
  }
  if (documents.some((document) => document.locale !== locale.runtime)) {
    throw new Error(
      `/${searchIndexRoute}: homepage search index contains another locale`,
    );
  }
}

for (const locale of locales) {
  const route = `${locale.prefix}guides/search/`;
  const filePath = path.join(outputRoot, route, "index.html");
  const context = `/${route}`;
  const canonical = `${siteUrl}/${route}`;
  if (!(await fileExists(filePath))) {
    throw new Error(`${context}: guide search export is missing`);
  }

  const html = await readFile(filePath, "utf8");
  assertIncludes(html, `<html lang="${locale.htmlLang}"`, context);
  assertIncludes(html, `<link rel="canonical" href="${canonical}"/>`, context);
  assertIncludes(html, '<meta name="referrer" content="origin"/>', context);
  if (!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex[^"]*follow/iu.test(html)) {
    throw new Error(`${context}: guide search route must be noindex, follow`);
  }
  if (sitemapLocs.includes(canonical)) {
    throw new Error(`${context}: guide search route entered sitemap.xml`);
  }

  for (const target of locales) {
    assertIncludes(
      html,
      `<link rel="alternate" hrefLang="${target.hreflang}" href="${siteUrl}/${target.prefix}guides/search/"/>`,
      context,
    );
  }
  assertIncludes(
    html,
    `<link rel="alternate" hrefLang="x-default" href="${siteUrl}/guides/search/"/>`,
    context,
  );
}

console.log(
  `✓ ${allSections.length * locales.length} section hubs, ${allSections.length * 3 * locales.length} collection hubs, ${locales.length} guide search routes, ${locales.length} homepage search indexes and ${locales.length} Evan profiles match their export contract; every internal href/src on indexable pages resolves.`,
);
