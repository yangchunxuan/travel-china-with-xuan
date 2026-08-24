import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  getGuideCatalogRoutePattern,
  isCanonicalGuideCatalogPageName,
} from "../../tools/guide-catalog-pagination-contract.mjs";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

test("a compact six-problem handoff follows search before each 24-card SSR batch", async () => {
  const [page, pagination] = await Promise.all([
    source("components/GuidesHubPage.tsx"),
    source("lib/guidesHubPagination.ts"),
  ]);

  const pageSize = Number(
    pagination.match(/GUIDES_HUB_PAGE_SIZE\s*=\s*(\d+)/)?.[1],
  );
  assert.ok(pageSize > 0 && pageSize <= 24);
  assert.match(pagination, /const startIndex = \(page - 1\) \* GUIDES_HUB_PAGE_SIZE/);
  assert.match(
    pagination,
    /guides\.slice\(\s*startIndex,\s*startIndex \+ GUIDES_HUB_PAGE_SIZE/,
  );
  assert.match(page, /pageGuides\.map\(\(guide, index\) =>/);
  assert.equal((page.match(/data-guide-id=\{guide\.id\}/g) ?? []).length, 1);
  assert.doesNotMatch(page, /entryGuides\.map|planningGuides\.map/);

  const searchIndex = page.indexOf("className={styles.searchBand}");
  const topicIndex = page.indexOf("className={styles.countryGuide}");
  const catalogIndex = page.indexOf("className={styles.catalog}");
  assert.ok(searchIndex >= 0 && searchIndex < topicIndex && topicIndex < catalogIndex);
  assert.match(page, /guidesHubDecisionSections\.map\(\(section, index\) =>/);
  assert.match(page, /className=\{styles\.entryHandoff\}/);
  assert.doesNotMatch(page, /className=\{styles\.entryCollection\}/);
});

test("guide catalog pagination accepts every canonical page from 2 upward", () => {
  const routePattern = getGuideCatalogRoutePattern("/guides/");

  for (const route of [
    "/guides/",
    "/guides/page/2/",
    "/guides/page/9/",
    "/guides/page/10/",
    "/guides/page/19/",
    "/guides/page/100/",
  ]) {
    assert.equal(routePattern.test(route), true, route);
  }
  for (const route of [
    "/guides/page/1/",
    "/guides/page/01/",
    "/guides/page/02/",
    "/guides/page/0/",
    "/guides/page/-2/",
    "/zh/guides/page/2/",
  ]) {
    assert.equal(routePattern.test(route), false, route);
  }

  for (const pageName of ["2", "9", "10", "19", "100"]) {
    assert.equal(isCanonicalGuideCatalogPageName(pageName), true, pageName);
  }
  for (const pageName of ["0", "1", "01", "02", "010", "-2", "two"]) {
    assert.equal(isCanonicalGuideCatalogPageName(pageName), false, pageName);
  }
});

test("every guide batch is crawlable through real static links, indexable routes and sitemap entries", async () => {
  const [page, styles, pagination, englishRoute, localizedRoute, sitemap, exportCheck, tenDayExportCheck] = await Promise.all([
    source("components/GuidesHubPage.tsx"),
    source("components/GuidesHubPage.module.css"),
    source("lib/guidesHubPagination.ts"),
    source("app/(default)/guides/page/[page]/page.tsx"),
    source("app/(localized)/[locale]/guides/page/[page]/page.tsx"),
    source("app/sitemap.ts"),
    source("tools/check-indexable-export.mjs"),
    source("tools/check-ten-day-guide-export.mjs"),
  ]);

  assert.doesNotMatch(page, /^"use client";/);
  assert.match(page, /pageNumbers\.map\(\(pageNumber\) =>/);
  assert.match(page, /const GUIDE_LIST_FRAGMENT = "#guide-list"/);
  assert.match(
    page,
    /function getGuidesHubPaginationHref[\s\S]*?getGuidesHubPagePath\(locale, page\)[\s\S]*?GUIDE_LIST_FRAGMENT/,
  );
  assert.match(page, /id="guide-list"[\s\S]*?tabIndex=\{-1\}/);
  assert.match(styles, /\.catalog\s*\{[\s\S]*?scroll-margin-top:\s*6\.5rem/);
  assert.match(
    page,
    /href=\{getGuidesHubPaginationHref\(locale, pageNumber\)\}/,
  );
  assert.match(
    page,
    /href=\{getGuidesHubPaginationHref\(locale, page - 1\)\}/,
  );
  assert.match(
    page,
    /href=\{getGuidesHubPaginationHref\(locale, page \+ 1\)\}/,
  );
  assert.match(page, /rel="prev"/);
  assert.match(page, /rel="next"/);
  assert.match(pagination, /page === 1[\s\S]*?\/guides\//);
  assert.match(pagination, /\/guides\/page\/\$\{page\}\//);
  assert.match(pagination, /homegroundLocales/);
  assert.match(pagination, /paths\["x-default"\] = paths\.en/);
  assert.match(pagination, /getGuidesHubPageAbsoluteLanguagePaths/);
  assert.match(pagination, /getGuidesHubPageLastModified/);
  assert.match(pagination, /getGuidesHubIndexablePaginationPages/);
  assert.match(sitemap, /getGuidesHubIndexablePaginationPages\(\)/);
  assert.match(sitemap, /alternates: \{ languages \}/);
  assert.match(sitemap, /lastModified/);
  assert.doesNotMatch(pagination, /#guide-list/);
  assert.doesNotMatch(sitemap, /#guide-list/);
  assert.match(exportCheck, /assertCrawlableInternalLink/);
  assert.match(exportCheck, /guides\\\/page\\\/\\d\+/);
  assert.match(tenDayExportCheck, /async function guideCatalogPages/);
  assert.match(tenDayExportCheck, /const queuedRoutes = \[guideHubRoute\]/);
  assert.match(tenDayExportCheck, /getGuideCatalogRoutePattern\(guideHubRoute\)/);
  assert.match(tenDayExportCheck, /paginationRoutePattern\.test\(target\.pathname\)/);
  assert.match(tenDayExportCheck, /isCanonicalGuideCatalogPageName\(entry\.name\)/);
  assert.match(tenDayExportCheck, /non-canonical pagination export directory/);
  assert.match(tenDayExportCheck, /orphan pagination export is not linked from the guide catalog/);
  assert.match(tenDayExportCheck, /function catalogGuideCardHrefs/);
  assert.match(tenDayExportCheck, /attributes\(match\[0\]\)\.get\("data-guide-id"\) !== guideSlug/);
  assert.match(tenDayExportCheck, /cardOccurrences\.length === 0/);
  assert.match(tenDayExportCheck, /cardOccurrences\.length > 1/);
  assert.match(tenDayExportCheck, /normalizeAbsoluteUrl\(cardOccurrences\[0\]\.href/);

  for (const route of [englishRoute, localizedRoute]) {
    assert.match(route, /export const dynamicParams = false/);
    assert.match(route, /generateStaticParams/);
    assert.match(route, /getGuidesHubStaticPageNumbers/);
    assert.match(route, /canonical: canonicalPath/);
    assert.match(route, /index: true/);
    assert.match(route, /follow: true/);
    assert.match(route, /<GuidesHubPage/);
  }

  assert.match(page, /languagePaths=\{getGuidesHubPageLanguagePaths\(page\)\}/);
});

test("search, category ownership and current-page structured data survive pagination", async () => {
  const [page, copy] = await Promise.all([
    source("components/GuidesHubPage.tsx"),
    source("app/(default)/guides/guidesHubI18n.ts"),
  ]);

  assert.match(page, /<GuideSearchForm/);
  assert.match(page, /getSearchSectionPath\(section, locale\)/);
  assert.match(page, /getSearchSectionPath\("explore", locale\)/);
  assert.match(page, /itemListElement: pageGuides\.map/);
  assert.doesNotMatch(page, /itemListElement: guides\.map/);
  assert.match(copy, /label: "Guide library pages"/);
  assert.match(copy, /label: "指南分页"/);
  assert.match(copy, /label: "가이드 페이지"/);
});

test("the 24-guide mobile batch becomes a compact readable list without losing decision data", async () => {
  const [page, styles, pagination] = await Promise.all([
    source("components/GuidesHubPage.tsx"),
    source("components/GuidesHubPage.module.css"),
    source("lib/guidesHubPagination.ts"),
  ]);

  const compactStart = styles.indexOf("@media (max-width: 26.25rem)");
  const narrowStart = styles.indexOf("@media (max-width: 22rem)", compactStart);
  assert.ok(compactStart >= 0 && narrowStart > compactStart);
  const compact = styles.slice(compactStart, narrowStart);

  assert.match(pagination, /GUIDES_HUB_PAGE_SIZE\s*=\s*24/);
  assert.match(compact, /\.guideLink,[\s\S]*?grid-template-columns:\s*5\.5rem minmax\(0, 1fr\)/);
  assert.match(compact, /min-height:\s*7\.75rem/);
  assert.match(compact, /\.guideImage,[\s\S]*?aspect-ratio:\s*auto/);
  assert.match(compact, /\.guideMeta\s*\{[\s\S]*?display:\s*grid/);
  assert.match(compact, /\.guideBody h3\s*\{[\s\S]*?overflow-wrap:\s*anywhere/);
  assert.match(compact, /\.guideDescription,\s*\.guideTags\s*\{\s*display:\s*none/);
  const titleRule = compact.slice(
    compact.indexOf(".guideBody h3 {"),
    compact.indexOf("}", compact.indexOf(".guideBody h3 {")),
  );
  const metaRule = compact.slice(
    compact.indexOf(".guideMeta {"),
    compact.indexOf("}", compact.indexOf(".guideMeta {")),
  );
  assert.doesNotMatch(titleRule, /display:\s*none/);
  assert.doesNotMatch(metaRule, /display:\s*none/);

  assert.match(page, /<time dateTime=\{guide\.dateModified\}>/);
  assert.match(page, /\{sectionLabel\}/);
  assert.match(page, /<h3>\{guide\.headline\}<\/h3>/);
  assert.match(page, /className=\{styles\.guideLink\} href=\{guide\.canonicalPath\}/);
});

test("the mobile first guide stays close while search and all six problem handoffs remain usable", async () => {
  const [page, styles] = await Promise.all([
    source("components/GuidesHubPage.tsx"),
    source("components/GuidesHubPage.module.css"),
  ]);

  const compactStart = styles.indexOf("@media (max-width: 26.25rem)");
  const narrowStart = styles.indexOf("@media (max-width: 22rem)", compactStart);
  assert.ok(compactStart >= 0 && narrowStart > compactStart);
  const compact = styles.slice(compactStart, narrowStart);

  assert.match(page, /className=\{styles\.searchFormCompact\}[\s\S]*?<GuideSearchForm/);
  assert.match(compact, /\.heroGrid > p\s*\{\s*display:\s*none/);
  assert.match(compact, /\.searchFormCompact[\s\S]*?grid-template-columns:\s*auto minmax\(0, 1fr\) 3rem/);
  assert.match(compact, /\.decisionGrid li\s*\{[\s\S]*?grid-column:\s*span 4/);
  assert.match(compact, /\.decisionGrid a\s*\{[\s\S]*?min-height:\s*5\.25rem/);
  assert.match(compact, /\.entryHandoff\s*\{[\s\S]*?min-height:\s*3\.25rem/);
  assert.match(compact, /\.catalog\s*\{[\s\S]*?padding-block:\s*1\.5rem 4rem/);
  assert.equal((page.match(/guidesHubDecisionSections\.map/g) ?? []).length, 1);
  assert.match(page, /className=\{styles\.entryHandoff\}/);
  assert.match(page, /id="guide-list"/);
});
