#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  canonicalizeUrl,
  DEFAULT_SITE_ORIGIN,
  reconcileIndexCohorts,
  stableStringify,
  strictDate,
} from "./internal/index-cohort-core.mjs";

const DEFAULT_SITEMAP = `${DEFAULT_SITE_ORIGIN}/sitemap.xml`;
const DEFAULT_GSC_SNAPSHOT = path.resolve(
  process.cwd(),
  "docs/organic-growth/evidence/gsc-page-indexing-2026-08-17.json",
);

function requireArgumentValue(argv, index, flag) {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}

function explicitObservationTimestamp(value) {
  if (
    typeof value !== "string"
    || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/u.test(value)
    || Number.isNaN(Date.parse(value))
  ) {
    throw new TypeError("--observed-at must be an explicit RFC 3339 timestamp with timezone");
  }
  return value;
}

function shanghaiBusinessDate(timestamp) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestamp));
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function parseArguments(argv) {
  const options = {
    sitemap: DEFAULT_SITEMAP,
    gscSnapshot: DEFAULT_GSC_SNAPSHOT,
    siteOrigin: DEFAULT_SITE_ORIGIN,
    asOf: null,
    observedAt: null,
    maxGscAgeDays: 7,
    output: null,
    auditLive: false,
    concurrency: 12,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--sitemap") options.sitemap = requireArgumentValue(argv, index++, argument);
    else if (argument === "--gsc-snapshot") {
      options.gscSnapshot = path.resolve(requireArgumentValue(argv, index++, argument));
    } else if (argument === "--site-origin") {
      options.siteOrigin = requireArgumentValue(argv, index++, argument);
    } else if (argument === "--as-of") {
      options.asOf = requireArgumentValue(argv, index++, argument);
    } else if (argument === "--observed-at") {
      options.observedAt = requireArgumentValue(argv, index++, argument);
    } else if (argument === "--max-gsc-age-days") {
      options.maxGscAgeDays = Number(requireArgumentValue(argv, index++, argument));
    } else if (argument === "--output") {
      options.output = path.resolve(requireArgumentValue(argv, index++, argument));
    } else if (argument === "--audit-live") options.auditLive = true;
    else if (argument === "--concurrency") {
      options.concurrency = Number(requireArgumentValue(argv, index++, argument));
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!options.asOf) throw new Error("--as-of is required; the checker has no clock-derived default");
  if (!options.observedAt) {
    throw new Error("--observed-at is required; evidence timestamps must be explicit");
  }
  strictDate(options.asOf, "asOf");
  explicitObservationTimestamp(options.observedAt);
  if (shanghaiBusinessDate(options.observedAt) !== options.asOf) {
    throw new Error("--observed-at must fall on --as-of in Asia/Shanghai");
  }
  let configuredOrigin;
  try {
    configuredOrigin = new URL(options.siteOrigin);
  } catch {
    throw new TypeError("--site-origin must be an HTTPS origin without a path");
  }
  if (
    configuredOrigin.protocol !== "https:"
    || configuredOrigin.pathname !== "/"
    || configuredOrigin.search
    || configuredOrigin.hash
    || configuredOrigin.username
    || configuredOrigin.password
  ) {
    throw new TypeError("--site-origin must be an HTTPS origin without a path");
  }
  options.siteOrigin = configuredOrigin.origin;
  canonicalizeUrl(`${options.siteOrigin}/`, {
    expectedOrigin: options.siteOrigin,
    errorPrefix: "SITE_ORIGIN",
  });
  if (!Number.isInteger(options.maxGscAgeDays) || options.maxGscAgeDays < 0) {
    throw new Error("--max-gsc-age-days must be a non-negative integer");
  }
  if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > 24) {
    throw new Error("--concurrency must be an integer from 1 to 24");
  }
  return options;
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

export function parseSitemap(xml) {
  const entries = [];
  for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/gu)) {
    const body = match[1];
    const loc = body.match(/<loc>([\s\S]*?)<\/loc>/u)?.[1]?.trim();
    if (!loc) throw new Error("SITEMAP_INVALID_XML: url entry without loc");
    const lastmod = body.match(/<lastmod>([\s\S]*?)<\/lastmod>/u)?.[1]?.trim() ?? null;
    entries.push({ url: decodeXml(loc), lastmod });
  }
  if (entries.length === 0) throw new Error("SITEMAP_INVALID_XML: no url entries");
  return entries;
}

async function loadText(source) {
  if (/^https?:\/\//u.test(source)) {
    const response = await fetch(source, { redirect: "follow" });
    if (!response.ok) throw new Error(`SITEMAP_UNAVAILABLE: HTTP ${response.status}`);
    return response.text();
  }
  return readFile(path.resolve(source), "utf8");
}

async function listGuideMetadata(root) {
  const entries = await readdir(root, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name, "metadata.json"))
    .sort((left, right) => left.localeCompare(right, "en"));
}

export async function loadGuideInventory(
  root = path.resolve(process.cwd(), "content/guides"),
  siteOrigin = DEFAULT_SITE_ORIGIN,
) {
  const inventory = [];
  const files = await listGuideMetadata(root);
  for (const file of files) {
    const metadata = JSON.parse(await readFile(file, "utf8"));
    for (const [locale, localized] of Object.entries(metadata.locales ?? {})) {
      if (!localized?.path) continue;
      inventory.push({
        contentId: `guide-${metadata.id}`,
        locale: locale === "zh" ? "zh-Hans" : locale,
        canonicalUrl: `${siteOrigin}${localized.path}`,
        section: metadata.search?.section ?? null,
        entityTokens: metadata.destinations ?? [],
        firstPublishedAt: null,
        declaredDatePublished: metadata.datePublished ?? null,
        firstSitemapSeenAt: null,
        publicationDateEvidence: metadata.datePublished
          ? "declared-metadata"
          : "unknown-legacy",
      });
    }
  }
  return inventory.sort((left, right) => left.canonicalUrl.localeCompare(right.canonicalUrl, "en"));
}

function tagAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gu)) {
    attributes[match[1].toLowerCase()] = decodeXml(match[2] ?? match[3] ?? "");
  }
  return attributes;
}

function linkTags(html) {
  return [...html.matchAll(/<link\b[^>]*>/giu)].map((match) => tagAttributes(match[0]));
}

function anchorTags(html) {
  return [...html.matchAll(/<a\b[^>]*>/giu)].map((match) => tagAttributes(match[0]));
}

function metaTags(html) {
  return [...html.matchAll(/<meta\b[^>]*>/giu)].map((match) => tagAttributes(match[0]));
}

function normalizeInternalLink(href, baseUrl, expectedOrigin) {
  try {
    const parsed = new URL(href, baseUrl);
    if (parsed.origin !== new URL(expectedOrigin).origin) return null;
    const hasQueryParameters = parsed.search.length > 0;
    const hasFragment = parsed.hash.length > 0;
    const raw = parsed.toString();
    parsed.search = "";
    parsed.hash = "";
    if (!parsed.pathname.endsWith("/") && !path.posix.extname(parsed.pathname)) {
      parsed.pathname += "/";
    }
    return { canonical: parsed.toString(), raw, hasQueryParameters, hasFragment };
  } catch {
    return null;
  }
}

function strictPageTarget(href, baseUrl, expectedOrigin) {
  try {
    const resolved = new URL(href, baseUrl).toString();
    return canonicalizeUrl(resolved, {
      expectedOrigin,
      errorPrefix: "PAGE_TARGET",
    });
  } catch {
    return null;
  }
}

async function concurrentMap(values, concurrency, mapper) {
  const results = new Array(values.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      results[index] = await mapper(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, worker));
  return results;
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError = null;
  let response = null;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      response = await fetch(url, { redirect: "follow" });
      if (response.status !== 429 && response.status < 500) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }
  if (response) return response;
  throw lastError ?? new Error("fetch failed");
}

function localeAndIdentity(url) {
  const pathname = new URL(url).pathname;
  if (pathname === "/zh/" || pathname.startsWith("/zh/")) {
    const identity = pathname.slice(3) || "/";
    return { locale: "zh-Hans", identity: identity.startsWith("/") ? identity : `/${identity}` };
  }
  if (pathname === "/ko/" || pathname.startsWith("/ko/")) {
    const identity = pathname.slice(3) || "/";
    return { locale: "ko", identity: identity.startsWith("/") ? identity : `/${identity}` };
  }
  return { locale: "en", identity: pathname };
}

function normalizedHreflangCode(value) {
  const lower = String(value).trim().toLowerCase();
  if (lower === "zh-hans") return "zh-Hans";
  if (lower === "x-default") return "x-default";
  return lower;
}

function alternateEntries(page) {
  if (Array.isArray(page.alternateEntries)) {
    return page.alternateEntries.map((entry) => ({
      hreflang: normalizedHreflangCode(entry.hreflang),
      href: entry.href,
    }));
  }
  return Object.entries(page.alternates ?? {}).map(([hreflang, href]) => ({
    hreflang: normalizedHreflangCode(hreflang),
    href,
  }));
}

function buildExpectedHreflang(urls, contentIdentityByUrl) {
  const groups = new Map();
  for (const url of urls) {
    const { locale, identity: routeIdentity } = localeAndIdentity(url);
    const contentId = contentIdentityByUrl instanceof Map
      ? contentIdentityByUrl.get(url)
      : contentIdentityByUrl?.[url];
    const identity = contentId ? `content:${contentId}` : `route:${routeIdentity}`;
    if (!groups.has(identity)) groups.set(identity, new Map());
    const locales = groups.get(identity);
    if (locales.has(locale)) throw new Error(`HREFLANG_IDENTITY_COLLISION: ${identity} ${locale}`);
    locales.set(locale, url);
  }

  const expectedByUrl = new Map();
  for (const locales of groups.values()) {
    const xDefault = locales.get("en") ?? [...locales.values()][0];
    const matrix = new Map([...locales.entries(), ["x-default", xDefault]]);
    for (const url of locales.values()) expectedByUrl.set(url, matrix);
  }
  return expectedByUrl;
}

function issue(code, url, detail) {
  return { code, url, detail };
}

function containsIndexBlock(value) {
  const segment = String(value ?? "").trim().toLowerCase();
  return segment === "none" || /(?:^|[,\s])noindex(?:$|[,\s])/u.test(segment);
}

function preventsIndexing(directive) {
  if (directive.agent !== "x-robots-tag") return containsIndexBlock(directive.content);
  for (const rawSegment of String(directive.content ?? "").toLowerCase().split(",")) {
    const segment = rawSegment.trim();
    const agentPrefix = segment.match(/^([a-z0-9_-]+|\*)\s*:\s*(.*)$/u);
    if (agentPrefix) {
      if (new Set(["googlebot", "*"]).has(agentPrefix[1])
        && containsIndexBlock(agentPrefix[2])) return true;
      continue;
    }
    if (containsIndexBlock(segment)) return true;
  }
  return false;
}

function stableIssueSort(left, right) {
  return [left.url, left.code, JSON.stringify(left.detail)].join("\u0000")
    .localeCompare([right.url, right.code, JSON.stringify(right.detail)].join("\u0000"), "en");
}

/** Pure analysis layer used by live crawl and offline fixtures. */
export function analyzeTechnicalPages(pages, urls, {
  checkedAt,
  expectedOrigin = DEFAULT_SITE_ORIGIN,
  contentIdentityByUrl = {},
} = {}) {
  explicitObservationTimestamp(checkedAt);
  const canonicalUrls = urls
    .map((url) => canonicalizeUrl(url, { expectedOrigin, errorPrefix: "SITEMAP_URL" }))
    .sort((left, right) => left.localeCompare(right, "en"));
  const sitemapSet = new Set(canonicalUrls);
  if (sitemapSet.size !== canonicalUrls.length) throw new Error("DUPLICATE_SITEMAP_URL");
  const pageByUrl = new Map(pages.map((page) => [page.url, page]));
  const expectedHreflang = buildExpectedHreflang(canonicalUrls, contentIdentityByUrl);
  const inbound = Object.fromEntries(canonicalUrls.map((url) => [url, 0]));
  const parameterLinks = [];
  const issues = [];

  for (const url of canonicalUrls) {
    const page = pageByUrl.get(url) ?? {
      url,
      httpStatus: null,
      finalUrl: null,
      canonical: null,
      alternateEntries: [],
      robotDirectives: [],
      internalLinks: [],
      error: "no crawl result",
    };
    if (page.error) issues.push(issue("FETCH_FAILED", url, page.error));
    if (page.httpStatus !== 200) issues.push(issue("HTTP_NOT_200", url, page.httpStatus));
    if (page.finalUrl !== url) issues.push(issue("REDIRECTED_SITEMAP_URL", url, page.finalUrl));

    const canonical = page.canonical
      ? strictPageTarget(page.canonical, url, expectedOrigin)
      : null;
    if (canonical !== url) issues.push(issue("CANONICAL_MISMATCH", url, {
      actual: page.canonical,
      expected: url,
    }));

    const noindexDirectives = (page.robotDirectives ?? [])
      .filter((directive) => preventsIndexing(directive));
    if (noindexDirectives.length > 0) {
      issues.push(issue("SITEMAP_NOINDEX", url, noindexDirectives));
    }

    const entries = alternateEntries(page);
    const entriesByCode = new Map();
    for (const entry of entries) {
      if (!entriesByCode.has(entry.hreflang)) entriesByCode.set(entry.hreflang, []);
      entriesByCode.get(entry.hreflang).push(entry.href);
    }
    for (const [code, hrefs] of entriesByCode) {
      if (hrefs.length > 1) issues.push(issue("HREFLANG_DUPLICATE", url, { code, hrefs }));
    }

    const expected = expectedHreflang.get(url);
    for (const [code, target] of expected) {
      const hrefs = entriesByCode.get(code) ?? [];
      if (hrefs.length === 0) {
        issues.push(issue("HREFLANG_MISSING", url, { code, expected: target }));
        continue;
      }
      const normalizedTargets = hrefs.map((href) =>
        strictPageTarget(href, url, expectedOrigin));
      if (normalizedTargets.length !== 1 || normalizedTargets[0] !== target) {
        issues.push(issue("HREFLANG_TARGET_MISMATCH", url, {
          code,
          actual: hrefs,
          expected: target,
        }));
      }
    }
    for (const code of entriesByCode.keys()) {
      if (!expected.has(code)) {
        issues.push(issue("HREFLANG_UNEXPECTED_CODE", url, code));
      }
    }

    const sourceLocale = localeAndIdentity(url).locale;
    for (const [targetLocale, targetUrl] of expected) {
      if (targetLocale === "x-default") continue;
      const targetPage = pageByUrl.get(targetUrl);
      const reciprocalEntries = targetPage ? alternateEntries(targetPage) : [];
      const reciprocal = reciprocalEntries
        .filter((entry) => entry.hreflang === sourceLocale)
        .map((entry) => strictPageTarget(entry.href, targetUrl, expectedOrigin))
        .filter((target) => target === url);
      if (reciprocal.length !== 1) {
        issues.push(issue("HREFLANG_NOT_RECIPROCAL", url, {
          targetLocale,
          targetUrl,
          expectedReturnCode: sourceLocale,
        }));
      }
    }

    for (const link of page.internalLinks ?? []) {
      const normalized = typeof link === "string"
        ? normalizeInternalLink(link, url, expectedOrigin)
        : link;
      if (!normalized) continue;
      if (normalized.hasQueryParameters) {
        parameterLinks.push({ from: url, to: normalized.raw, canonicalOwner: normalized.canonical });
      }
      if (sitemapSet.has(normalized.canonical) && normalized.canonical !== url) {
        inbound[normalized.canonical] += 1;
      }
    }
  }

  const root = canonicalizeUrl(`${expectedOrigin}/`, {
    expectedOrigin,
    errorPrefix: "SITE_ORIGIN",
  });
  const orphanUrls = Object.entries(inbound)
    .filter(([url, count]) => url !== root && count === 0)
    .map(([url]) => url)
    .sort((left, right) => left.localeCompare(right, "en"));
  for (const url of orphanUrls) {
    issues.push(issue("ORPHAN_CANONICAL", url, "zero internal links from sitemap pages"));
  }
  parameterLinks.sort((left, right) => [left.from, left.to].join("\u0000")
    .localeCompare([right.from, right.to].join("\u0000"), "en"));
  issues.sort(stableIssueSort);

  return {
    checkedAt,
    checkedUrlCount: canonicalUrls.length,
    issueCount: issues.length,
    orphanUrls,
    parameterLinks,
    issues,
  };
}

export async function auditLiveTechnical(urls, concurrency = 12, {
  checkedAt,
  expectedOrigin = DEFAULT_SITE_ORIGIN,
  contentIdentityByUrl = {},
} = {}) {
  explicitObservationTimestamp(checkedAt);
  const sitemapUrls = urls
    .map((url) => canonicalizeUrl(url, { expectedOrigin, errorPrefix: "SITEMAP_URL" }))
    .sort((left, right) => left.localeCompare(right, "en"));
  const pages = await concurrentMap(sitemapUrls, concurrency, async (url) => {
    try {
      const response = await fetchWithRetry(url);
      const html = await response.text();
      const links = linkTags(html);
      const canonical = links.find((link) => link.rel?.toLowerCase() === "canonical")?.href ?? null;
      const alternateEntriesForPage = links
        .filter((link) => link.rel?.toLowerCase() === "alternate" && link.hreflang && link.href)
        .map((link) => ({ hreflang: link.hreflang, href: link.href }));
      const robotDirectives = metaTags(html)
        .filter((meta) => new Set(["robots", "googlebot"]).has(meta.name?.toLowerCase()))
        .map((meta) => ({ source: "meta", agent: meta.name.toLowerCase(), content: meta.content ?? "" }));
      const xRobotsTag = response.headers.get("x-robots-tag");
      if (xRobotsTag) {
        robotDirectives.push({ source: "http-header", agent: "x-robots-tag", content: xRobotsTag });
      }
      const internalLinks = anchorTags(html)
        .map((anchor) => normalizeInternalLink(anchor.href, url, expectedOrigin))
        .filter(Boolean);
      return {
        url,
        httpStatus: response.status,
        finalUrl: response.url,
        canonical,
        alternateEntries: alternateEntriesForPage,
        robotDirectives,
        internalLinks,
        error: null,
      };
    } catch (error) {
      return {
        url,
        httpStatus: null,
        finalUrl: null,
        canonical: null,
        alternateEntries: [],
        robotDirectives: [],
        internalLinks: [],
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });
  return analyzeTechnicalPages(pages, sitemapUrls, {
    checkedAt,
    expectedOrigin,
    contentIdentityByUrl,
  });
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const sitemapEntries = parseSitemap(await loadText(options.sitemap));
  const inventory = await loadGuideInventory(
    path.resolve(process.cwd(), "content/guides"),
    options.siteOrigin,
  );
  const gscSnapshot = JSON.parse(await readFile(options.gscSnapshot, "utf8"));
  const report = reconcileIndexCohorts({
    sitemapUrls: sitemapEntries.map((entry) => entry.url),
    inventory,
    gscSnapshot,
    asOf: options.asOf,
    expectedOrigin: options.siteOrigin,
    maxGscAgeDays: options.maxGscAgeDays,
  });
  report.sitemap = {
    source: options.sitemap,
    observedAt: options.observedAt,
    lastmodPresentCount: sitemapEntries.filter((entry) => entry.lastmod).length,
  };
  if (options.auditLive) {
    report.technicalAudit = await auditLiveTechnical(
      sitemapEntries.map((entry) => entry.url),
      options.concurrency,
      {
        checkedAt: options.observedAt,
        expectedOrigin: options.siteOrigin,
        contentIdentityByUrl: Object.fromEntries(inventory.map((row) => [
          row.canonicalUrl,
          row.contentId,
        ])),
      },
    );
  }
  const output = stableStringify(report);
  if (options.output) {
    await mkdir(path.dirname(options.output), { recursive: true });
    await writeFile(options.output, output, "utf8");
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.stack : error}\n`);
    process.exitCode = 1;
  });
}
