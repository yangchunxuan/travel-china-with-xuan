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

test("global navigation keeps one distinct four-item information architecture", async () => {
  const [header, footer, css, model] = await Promise.all([
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundFooter.tsx"),
    source("components/HomegroundHeader.module.css"),
    source("lib/homegroundNavigationModel.ts"),
  ]);

  for (const label of [
    "Destinations",
    "目的地",
    "여행지",
    "Private Tours",
    "私家团",
    "프라이빗 투어",
    "Travel Advice",
    "实用指南",
    "실용 가이드",
    "How We Plan",
    "我们如何规划",
    "여행 설계 방식",
  ]) {
    assert.match(model, new RegExp(label));
  }

  assert.match(header, /\| "guides"/);
  assert.match(header, /\| "search"/);
  assert.match(header, /\| "plan"/);
  assert.match(header, /\| "tours"/);
  assert.match(header, /\| "tour"/);
  assert.match(header, /\| "destinations"/);
  assert.match(header, /\| "destination"/);
  assert.match(header, /pageContext === "guide" \|\|/);
  assert.match(header, /const guidesAreExact =/);
  assert.match(header, /getHomegroundNavigationModel\(locale, copy\.path\)/);
  assert.match(header, /primaryNavigation\.items\.map/);
  assert.match(header, /pageContext === "plan"/);
  assert.match(
    header,
    /const guidesAreCurrent =[^;]*pageContext === "plan"/s,
  );
  assert.match(header, /const toursAreCurrent =/);
  assert.match(header, /const toursAreExact = pageContext === "tours"/);
  assert.doesNotMatch(header, /copy\.cities\.eyebrow/);
  assert.match(header, /className=\{styles\.desktopUtilityLink\}[\s\S]*copy\.navigation\.faq/);
  assert.match(header, /className=\{styles\.mobileUtilityLink\}[\s\S]*copy\.navigation\.faq/);
  assert.match(header, /\? "location"/);
  assert.doesNotMatch(header, /getGuideSearchCopy|Trip planning services|旅行规划服务|여행 설계 서비스/);
  assert.doesNotMatch(header, /String\(index \+ 1\)\.padStart/);
  assert.match(
    model,
    /homegroundPrimaryNavigationIds = \[[\s\S]*"destinations"[\s\S]*"tours"[\s\S]*"guides"[\s\S]*"studio"/,
  );
  assert.doesNotMatch(model, /"first-trip"|pathSegment: "plan\/"/);
  for (const pathSegment of ["explore/", "tours/", "guides/", "studio/"]) {
    assert.match(model, new RegExp(`pathSegment: "${pathSegment}"`));
  }
  assert.equal(
    header.match(/pageContext === "guides"[\s\S]{0,90}`\$\{target\.path\}guides\/`/g)
      ?.length,
    1,
  );
  assert.equal(header.match(/languageHrefFor\(targetLocale\)/g)?.length, 2);
  assert.match(
    header,
    /pageContext === "tours" \|\| pageContext === "tour"[\s\S]{0,80}`\$\{target\.path\}tours\/`/,
  );
  assert.match(
    header,
    /pageContext === "home" \? "#faq" : `\$\{copy\.path\}#faq`/,
  );
  assert.match(footer, /const guideHubPath = `\$\{copy\.path\}guides\/`/);
  assert.match(footer, /const tourHubPath = `\$\{copy\.path\}tours\/`/);
  assert.match(footer, /href=\{guideHubPath\}/);
  assert.match(footer, /href=\{tourHubPath\}/);
  assert.doesNotMatch(footer, /guideId|getGuideEntry/);

  assert.match(css, /\.headerInner \{[\s\S]*?display: grid;[\s\S]*?grid-template-columns:/);
  assert.match(css, /\.desktopNav a \{[\s\S]*?white-space: nowrap;/);
  assert.match(css, /\.desktopUtilityLink \{[\s\S]*?white-space: nowrap;/);
  assert.match(
    css,
    /@media \(max-width: 1179\.98px\)[\s\S]*?\.desktopUtilityLink,[\s\S]*?display: none;[\s\S]*?\.mobileNav \{[\s\S]*?position: fixed;/,
  );
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.mobileNavCopy small \{/);
  assert.match(css, /\.mobileUtilityLink \{/);
  assert.match(css, /\.mobileLanguageNav a \{[\s\S]*?white-space: nowrap;/);
  assert.match(css, /max-height: 560px/);
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
