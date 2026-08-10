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
const locales = [
  { runtime: "en", prefix: "", htmlLang: "en", hreflang: "en" },
  { runtime: "zh", prefix: "zh/", htmlLang: "zh-Hans", hreflang: "zh-Hans" },
  { runtime: "ko", prefix: "ko/", htmlLang: "ko", hreflang: "ko" },
];

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
}

console.log(
  `✓ ${allSections.length * locales.length} search-platform hubs match their generated robots/sitemap state, and every internal href/src on indexable pages resolves.`,
);
