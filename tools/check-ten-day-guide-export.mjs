import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, "out");
const siteUrl = "https://homegroundchina.com";
const guideSlug = "beijing-zhangjiajie-shanghai-10-days";

const guideLocales = [
  {
    hreflang: "en",
    htmlLang: "en",
    route: `/guides/${guideSlug}/`,
  },
  {
    hreflang: "zh-Hans",
    htmlLang: "zh-Hans",
    route: `/zh/guides/${guideSlug}/`,
  },
  {
    hreflang: "ko",
    htmlLang: "ko",
    route: `/ko/guides/${guideSlug}/`,
  },
];

const expectedAlternates = new Map([
  ...guideLocales.map(({ hreflang, route }) => [
    hreflang,
    `${siteUrl}${route}`,
  ]),
  ["x-default", `${siteUrl}${guideLocales[0].route}`],
]);

const failures = [];

function fail(message) {
  failures.push(message);
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function attributes(tag) {
  const result = new Map();
  const attributePattern =
    /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

  for (const match of tag.matchAll(attributePattern)) {
    result.set(
      match[1].toLowerCase(),
      decodeHtmlAttribute(match[2] ?? match[3] ?? match[4] ?? ""),
    );
  }

  return result;
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function normalizeAbsoluteUrl(value) {
  try {
    return new URL(value, siteUrl).href;
  } catch {
    return null;
  }
}

async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function exportPathForRoute(route) {
  return path.join(outputRoot, route.slice(1), "index.html");
}

function alternateLinks(markup, linkTagName = "link") {
  const found = new Map();

  for (const tag of tags(markup, linkTagName)) {
    const attrs = attributes(tag);
    const rel = (attrs.get("rel") ?? "").toLowerCase().split(/\s+/);
    const hreflang = attrs.get("hreflang");
    const href = attrs.get("href");

    if (!rel.includes("alternate") || !hreflang || !href) continue;

    const values = found.get(hreflang) ?? [];
    values.push(normalizeAbsoluteUrl(href) ?? href);
    found.set(hreflang, values);
  }

  return found;
}

function checkAlternates(found, context) {
  for (const [hreflang, expectedUrl] of expectedAlternates) {
    const values = found.get(hreflang) ?? [];

    if (values.length === 0) {
      fail(`${context}: missing hreflang=${hreflang}`);
    } else if (values.length > 1) {
      fail(`${context}: duplicate hreflang=${hreflang}`);
    }

    if (values.length > 0 && values[0] !== expectedUrl) {
      fail(
        `${context}: hreflang=${hreflang} points to ${values[0]}, expected ${expectedUrl}`,
      );
    }
  }

  for (const hreflang of found.keys()) {
    if (!expectedAlternates.has(hreflang)) {
      fail(`${context}: unexpected hreflang=${hreflang}`);
    }
  }
}

function articleNodes(value, found = []) {
  if (Array.isArray(value)) {
    for (const child of value) articleNodes(child, found);
    return found;
  }

  if (!value || typeof value !== "object") return found;

  const type = value["@type"];
  if (type === "Article" || (Array.isArray(type) && type.includes("Article"))) {
    found.push(value);
  }

  for (const child of Object.values(value)) articleNodes(child, found);
  return found;
}

function checkJsonLd(html, locale, expectedUrl) {
  const scripts = [
    ...html.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
    ),
  ];
  const articles = [];

  for (const script of scripts) {
    const attrs = attributes(`<script ${script[1]}>`);
    if ((attrs.get("type") ?? "").toLowerCase() !== "application/ld+json") {
      continue;
    }

    try {
      articles.push(...articleNodes(JSON.parse(script[2])));
    } catch (error) {
      fail(
        `${locale.route}: invalid JSON-LD (${error instanceof Error ? error.message : String(error)})`,
      );
    }
  }

  if (articles.length === 0) {
    fail(`${locale.route}: missing Article JSON-LD`);
    return;
  }

  const matchingArticle = articles.find(
    (article) => normalizeAbsoluteUrl(article.url) === expectedUrl,
  );

  if (!matchingArticle) {
    fail(`${locale.route}: Article JSON-LD url must be ${expectedUrl}`);
    return;
  }

  if (matchingArticle.inLanguage !== locale.htmlLang) {
    fail(
      `${locale.route}: Article JSON-LD inLanguage is ${String(matchingArticle.inLanguage)}, expected ${locale.htmlLang}`,
    );
  }
}

async function checkGuideHtml(locale) {
  const filePath = exportPathForRoute(locale.route);
  const expectedUrl = `${siteUrl}${locale.route}`;

  if (!(await isFile(filePath))) {
    fail(`${locale.route}: missing export ${path.relative(projectRoot, filePath)}`);
    return;
  }

  const html = await readFile(filePath, "utf8");
  const htmlTag = tags(html, "html")[0];
  const actualHtmlLang = htmlTag ? attributes(htmlTag).get("lang") : undefined;

  if (actualHtmlLang !== locale.htmlLang) {
    fail(
      `${locale.route}: html lang is ${String(actualHtmlLang)}, expected ${locale.htmlLang}`,
    );
  }

  const canonicalUrls = tags(html, "link")
    .map((tag) => attributes(tag))
    .filter((attrs) =>
      (attrs.get("rel") ?? "").toLowerCase().split(/\s+/).includes("canonical"),
    )
    .map((attrs) => normalizeAbsoluteUrl(attrs.get("href") ?? ""));

  if (canonicalUrls.length !== 1) {
    fail(`${locale.route}: expected exactly one canonical, found ${canonicalUrls.length}`);
  } else if (canonicalUrls[0] !== expectedUrl) {
    fail(
      `${locale.route}: canonical is ${String(canonicalUrls[0])}, expected ${expectedUrl}`,
    );
  }

  checkAlternates(alternateLinks(html), locale.route);

  for (const metaTag of tags(html, "meta")) {
    const attrs = attributes(metaTag);
    const name = (attrs.get("name") ?? "").toLowerCase();
    const content = attrs.get("content") ?? "";
    const isRobotsDirective = name === "robots" || /bot(?:-|$)/.test(name);

    if (isRobotsDirective && /(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/i.test(content)) {
      fail(
        `${locale.route}: ${name} prevents indexing (${content})`,
      );
    }
  }

  checkJsonLd(html, locale, expectedUrl);
}

async function checkHomepageGuidePaths() {
  for (const locale of guideLocales) {
    const homepageRoute = locale.route.startsWith("/zh/")
      ? "/zh/"
      : locale.route.startsWith("/ko/")
        ? "/ko/"
        : "/";
    const guideHubRoute = `${homepageRoute}guides/`;
    const homepagePath = exportPathForRoute(homepageRoute);
    const guideHubPath = exportPathForRoute(guideHubRoute);
    const expectedGuideHubUrl = `${siteUrl}${guideHubRoute}`;
    const expectedGuideUrl = `${siteUrl}${locale.route}`;

    if (!(await isFile(homepagePath))) {
      fail(`${homepageRoute}: missing homepage export for guide-path check`);
      continue;
    }

    const homepageHtml = await readFile(homepagePath, "utf8");
    const guideHubLinks = tags(homepageHtml, "a")
      .map((tag) => attributes(tag).get("href") ?? "")
      .filter((href) => normalizeAbsoluteUrl(href) === expectedGuideHubUrl);

    if (guideHubLinks.length === 0) {
      fail(
        `${homepageRoute}: missing homepage entry for ${guideHubRoute}`,
      );
    }

    if (!(await isFile(guideHubPath))) {
      fail(`${guideHubRoute}: missing guide-hub export`);
      continue;
    }

    const guideHubHtml = await readFile(guideHubPath, "utf8");
    const guideLinks = tags(guideHubHtml, "a")
      .map((tag) => attributes(tag).get("href") ?? "")
      .filter((href) => normalizeAbsoluteUrl(href) === expectedGuideUrl);

    if (guideLinks.length === 0) {
      fail(`${guideHubRoute}: missing guide entry for ${locale.route}`);
    }
  }
}

function sitemapUrlBlocks(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map(
    (match) => match[1],
  );
}

function textElement(markup, name) {
  const match = markup.match(
    new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "i"),
  );
  return match ? decodeHtmlAttribute(match[1].trim()) : null;
}

async function checkSitemap() {
  const sitemapPath = path.join(outputRoot, "sitemap.xml");
  if (!(await isFile(sitemapPath))) {
    fail("/sitemap.xml: missing export out/sitemap.xml");
    return;
  }

  const xml = await readFile(sitemapPath, "utf8");
  const blocks = sitemapUrlBlocks(xml);

  for (const locale of guideLocales) {
    const expectedUrl = `${siteUrl}${locale.route}`;
    const matches = blocks.filter(
      (block) => normalizeAbsoluteUrl(textElement(block, "loc") ?? "") === expectedUrl,
    );

    if (matches.length === 0) {
      fail(`/sitemap.xml: missing <loc>${expectedUrl}</loc>`);
      continue;
    }
    if (matches.length > 1) {
      fail(`/sitemap.xml: duplicate <loc>${expectedUrl}</loc>`);
    }

    checkAlternates(
      alternateLinks(matches[0], "xhtml:link"),
      `/sitemap.xml entry ${expectedUrl}`,
    );
  }
}

async function collectHtmlFiles(directory, found = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectHtmlFiles(entryPath, found);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      found.push(entryPath);
    }
  }
  return found;
}

async function rootLinkTargetExists(pathname) {
  const relativePath = pathname.replace(/^\/+/, "");
  const candidates = pathname.endsWith("/")
    ? [path.join(outputRoot, relativePath, "index.html")]
    : [
        path.join(outputRoot, relativePath),
        path.join(outputRoot, `${relativePath}.html`),
        path.join(outputRoot, relativePath, "index.html"),
      ];

  for (const candidate of candidates) {
    if (await isFile(candidate)) return true;
  }
  return false;
}

async function checkInternalRootLinks() {
  const htmlFiles = await collectHtmlFiles(outputRoot);
  const checked = new Set();

  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, "utf8");

    for (const anchorTag of tags(html, "a")) {
      const href = attributes(anchorTag).get("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) continue;

      let pathname;
      try {
        pathname = new URL(href, siteUrl).pathname;
      } catch {
        fail(`${path.relative(outputRoot, filePath)}: invalid root-path href ${href}`);
        continue;
      }

      const key = `${filePath}\0${pathname}`;
      if (checked.has(key)) continue;
      checked.add(key);

      if (!(await rootLinkTargetExists(pathname))) {
        fail(
          `${path.relative(outputRoot, filePath)}: root-path link ${href} has no exported target`,
        );
      }
    }
  }
}

try {
  if (!(await isFile(path.join(outputRoot, "index.html")))) {
    fail("out/: missing or not a completed static export");
  } else {
    for (const locale of guideLocales) await checkGuideHtml(locale);
    await checkHomepageGuidePaths();
    await checkSitemap();
    await checkInternalRootLinks();
  }
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

if (failures.length > 0) {
  console.error(`✗ Ten-day guide export check failed (${failures.length} issues):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    "✓ Ten-day guide export has three indexable, reciprocal localized pages, homepage-to-hub paths, matching sitemap entries, and no broken root-path links.",
  );
}
