import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.join(process.cwd(), "out");
const siteUrl = "https://homegroundchina.com";
const publishedSections = [
  "explore",
  "plan",
  "transport",
  "stay",
  "essentials",
  "services",
];
const previewOnlySections = ["when-to-go", "culture", "tools"];
const allSections = [...publishedSections, ...previewOnlySections];
const locales = [
  { runtime: "en", prefix: "", htmlLang: "en", hreflang: "en" },
  { runtime: "zh", prefix: "zh/", htmlLang: "zh-Hans", hreflang: "zh-Hans" },
  { runtime: "ko", prefix: "ko/", htmlLang: "ko", hreflang: "ko" },
];
const representativeGuide = {
  explore: "zhangjiajie-glass-bridge-vs-skywalk",
  plan: "how-much-does-a-china-trip-cost",
  transport: "beijing-zhangjiajie-shanghai-transport",
  stay: "why-are-hotels-in-china-so-cheap",
  essentials: "do-us-citizens-need-visa-china-2026",
  services: "do-you-need-a-tour-guide-in-china",
};

function routeFor(section, locale) {
  return `${locale.prefix}${section}/`;
}

function absoluteRoute(section, locale) {
  return `${siteUrl}/${routeFor(section, locale)}`;
}

async function fileExists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function assertIncludes(source, needle, context) {
  if (!source.includes(needle)) {
    throw new Error(`${context}: missing ${needle}`);
  }
}

function assertExcludes(source, needle, context) {
  if (source.includes(needle)) {
    throw new Error(`${context}: unexpectedly contains ${needle}`);
  }
}

const sitemapPath = path.join(outputRoot, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
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

if (sitemapLocs.length !== 94) {
  throw new Error(`sitemap.xml must contain the 76 legacy URLs plus 18 published hubs; received ${sitemapLocs.length}.`);
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

    if (publishedSections.includes(section)) {
      if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) {
        throw new Error(`${context}: published hub contains noindex`);
      }
      assertIncludes(sitemap, `<loc>${canonical}</loc>`, context);
      assertIncludes(
        html,
        `href="/${locale.prefix}guides/${representativeGuide[section]}/"`,
        `${context} representative guide link`,
      );
    } else {
      if (!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) {
        throw new Error(`${context}: preview-only hub must remain noindex`);
      }
      assertExcludes(sitemap, `<loc>${canonical}</loc>`, context);
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
}

console.log(
  `✓ ${allSections.length * locales.length} search-platform hubs export correctly; published hubs are indexable and preview-only hubs remain out of the sitemap.`,
);
