import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

const articleComponents = [
  "components/ZhangjiajieGuidePage.tsx",
  "components/NightShowGuidePage.tsx",
  "components/TenDayChinaRouteGuidePage.tsx",
  "components/TransportGuidePage.tsx",
  "components/ChinaItineraryTooRushedPage.tsx",
  "components/TantanZhangjiajieStoryPage.tsx",
  "components/ZhangjiajieFromMalaysiaPage.tsx",
  "components/ChinaItineraryWithOlderParentsPage.tsx",
];

test("global navigation keeps one four-item information architecture", async () => {
  const [header, footer, css] = await Promise.all([
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundFooter.tsx"),
    source("components/HomegroundHeader.module.css"),
  ]);

  for (const label of ["Travel guides", "旅行指南", "여행 가이드"]) {
    assert.match(header, new RegExp(label));
    assert.match(footer, new RegExp(label));
  }

  assert.match(header, /\| "guides"/);
  assert.match(header, /\| "search"/);
  assert.match(header, /\| "destinations"/);
  assert.match(header, /\| "destination"/);
  assert.match(header, /pageContext === "guide" \|\|/);
  assert.match(header, /const guidesAreExact =/);
  assert.match(header, /data-active=\{guidesAreCurrent \? "true" : undefined\}/);
  assert.match(header, /const destinationsHref = `\$\{copy\.path\}explore\/`/);
  assert.match(header, /copy\.cities\.eyebrow/);
  assert.match(header, /copy\.navigation\.planning/);
  assert.match(header, /copy\.navigation\.faq/);
  assert.doesNotMatch(header, /getGuideSearchCopy|Trip planning services|旅行规划服务|여행 설계 서비스/);
  assert.equal(header.match(/aria-hidden="true">0[1-4]/g)?.length, 4);
  assert.equal(
    header.match(/pageContext === "guides"[\s\S]{0,90}`\$\{target\.path\}guides\/`/g)
      ?.length,
    1,
  );
  assert.equal(header.match(/languageHrefFor\(targetLocale\)/g)?.length, 2);
  assert.match(footer, /const guideHubPath = `\$\{copy\.path\}guides\/`/);
  assert.match(footer, /href=\{guideHubPath\}/);
  assert.doesNotMatch(footer, /guideId|getGuideEntry/);

  assert.match(css, /\.headerInner \{[\s\S]*?display: grid;[\s\S]*?grid-template-columns:/);
  assert.match(css, /\.desktopNav a \{[\s\S]*?white-space: nowrap;/);
  assert.match(
    css,
    /@media \(max-width: 1179\.98px\)[\s\S]*?\.mobileNav \{[\s\S]*?position: fixed;/,
  );
  assert.match(css, /:focus-visible/);
});

test("all public page families use the shared header", async () => {
  const [tenDay, tenDayStyles, privacy, legal, guidesHub, header] = await Promise.all([
    source("components/TenDayChinaRouteGuidePage.tsx"),
    source("components/TenDayChinaRouteGuidePage.module.css"),
    source("components/HomegroundPrivacyPage.tsx"),
    source("components/HomegroundLegalPage.tsx"),
    source("components/GuidesHubPage.tsx"),
    source("components/HomegroundHeader.tsx"),
  ]);

  for (const page of [tenDay, privacy, legal]) {
    assert.match(page, /<HomegroundHeader/);
  }
  assert.doesNotMatch(tenDay, /<header className=\{styles\.siteHeader\}/);
  assert.doesNotMatch(privacy, /<header className=\{styles\.header\}/);
  assert.doesNotMatch(legal, /<header className=\{styles\.header\}/);
  assert.doesNotMatch(guidesHub, /showLanguageNav=\{false\}/);
  assert.match(tenDay, /plannerTracking=\{\{ guideId, position: "header" \}\}/);
  assert.match(header, /trackEvent\("guide_cta_clicked"/);
  assert.match(
    tenDayStyles,
    /\.fitGrid,[\s\S]{0,180}grid-template-columns: minmax\(0, 1fr\);/,
  );
});

test("sitemap publishes manifest-backed localized guide hubs with hreflang", async () => {
  const [sitemap, adapter] = await Promise.all([
    source("app/sitemap.ts"),
    source("lib/legacySystemContentAdapter.ts"),
  ]);

  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/);
  assert.match(sitemap, /absoluteManifestAlternates/);
  assert.match(adapter, /id: "guides"/);
  assert.match(adapter, /getGuidesHubCopy\(locale\)/);
});

test("all eight article types expose the same visible and JSON-LD hierarchy", async () => {
  for (const path of articleComponents) {
    const article = await source(path);

    assert.match(article, /"@type": "BreadcrumbList"/, path);
    assert.match(article, /position: 1/, path);
    assert.match(article, /position: 2/, path);
    assert.match(article, /position: 3/, path);
    assert.match(article, /aria-current="page"/, path);
    assert.match(
      article,
      /guideHub(?:Labels|Path|Href)|sectionLabels\.guides/,
      path,
    );
  }

  const tantan = await source(
    "components/TantanZhangjiajieStoryPage.tsx",
  );
  assert.doesNotMatch(tantan, /copy\.breadcrumbStudio/);
});
