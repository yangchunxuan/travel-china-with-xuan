import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.join(process.cwd(), "out");
const siteUrl = "https://homegroundchina.com";
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
const zhangjiajieTourSlug = "zhangjiajie-4-day-private-tour";
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

  assertIncludes(
    homepageHtml,
    `href="/${locale.prefix}tours/${zhangjiajieTourSlug}/"`,
    `${context} homepage published-tour discovery`,
  );
  if (homepageHtml.includes(`href="${tenCityPackPath}"`)) {
    throw new Error(
      `${context}: the internal asset download displaced the homepage product showcase`,
    );
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
  assertIncludes(html, '"@type":"ProfilePage"', context);
  assertIncludes(html, '"@type":"Person"', context);
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) {
    throw new Error(`${context}: Evan profile is missing from sitemap.xml`);
  }
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

for (const locale of locales) {
  const hubPath = path.join(outputRoot, `${locale.prefix}guides/`, "index.html");
  const hub = await readFile(hubPath, "utf8");
  for (const section of allSections) {
    assertIncludes(
      hub,
      `href="/${locale.prefix}${section}/"`,
      `/${locale.prefix}guides/ section index`,
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
