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

test("global navigation keeps one distinct five-item information architecture", async () => {
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
    "Services",
    "服务",
    "서비스",
    "Attraction Tickets",
    "景点代预约",
    "관광지 예약 대행",
    "English-speaking Guides",
    "私人英文导游",
    "프라이빗 한국어 가이드",
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
  assert.match(header, /data-tier="secondary"[\s\S]*className=\{styles\.mobileSectionLink\}[\s\S]*copy\.navigation\.faq/);
  assert.match(header, /\? "location"/);
  assert.doesNotMatch(header, /getGuideSearchCopy|Trip planning services|旅行规划服务|여행 설계 서비스/);
  assert.doesNotMatch(header, /String\(index \+ 1\)\.padStart/);
  assert.match(
    model,
    /homegroundPrimaryNavigationIds = \[[\s\S]*"destinations"[\s\S]*"tours"[\s\S]*"services"[\s\S]*"guides"[\s\S]*"studio"/,
  );
  assert.doesNotMatch(model, /"first-trip"|pathSegment: "plan\/"/);
  for (const pathSegment of ["explore/", "tours/", "services/full-trip-support/", "services/china-attraction-reservations/", "services/private-english-speaking-guides/", "guides/", "studio/"]) {
    assert.match(model, new RegExp(`pathSegment: "${pathSegment}"`));
  }
  assert.equal(
    header.match(/pageContext === "guides"[\s\S]{0,90}`\$\{target\.path\}guides\/`/g)
      ?.length,
    1,
  );
  assert.equal(header.match(/languageHrefFor\(targetLocale\)/g)?.length, 1);
  assert.equal(
    header.match(/availableLanguageLocales\.map\(renderLanguageChoice\)/g)?.length,
    2,
  );
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
  assert.match(css, /\.mobileEntryDescription \{/);
  assert.match(css, /\.mobileSectionPanel \{[^}]*grid-template-rows:\s*0fr;/);
  assert.match(css, /\.mobileLanguageNav a \{[^}]*min-block-size:\s*3\.125rem;/);
  // Expanded sections remain available at every height; the old chip strip
  // and rules that removed whole service and tour menus are gone.
  assert.doesNotMatch(css, /\.mobilePrimaryLinks|\.mobileNavCopy|\.mobileUtilityRow|\.mobileUtilityLink/);
  assert.doesNotMatch(css, /max-height:\s*(?:960|820|650)px/);
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

test("Destinations and Services open menus (x.ai's Products pattern)", async () => {
  const [header, menu, css, model] = await Promise.all([
    source("components/HomegroundHeader.tsx"),
    source("components/HeaderNavMenu.tsx"),
    source("components/HomegroundHeader.module.css"),
    source("lib/homegroundNavigationModel.ts"),
  ]);
  // One header slot for all services; new services join the list, not the header.
  assert.match(model, /homegroundServiceNavigationIds = \[\s*"attraction-tickets",\s*"english-guides",\s*"private-car",\s*"trip-support",\s*\]/);
  // Full-trip support has its own page.
  assert.match(model, /pathSegment: "services\/full-trip-support\/"/);
  // Every item with a menu (Destinations, Services) renders the same component.
  assert.match(header, /const menu = submenuFor\(item\.id\);\s*if \(menu\) \{[\s\S]*?<HeaderNavMenu/);
  assert.match(model, /homegroundDestinationNavigationIds = \[\s*"cities",\s*"inspiration",\s*"sights",\s*\]/);
  assert.match(model, /pathSegment: "inspiration\/"/);
  // Every /services/ page and the reservation page sit under Services.
  assert.match(header, /const servicesAreCurrent =\s*pageContext === "services" \|\| pageContext === "reservations";/);
  assert.match(header, /const planningIsCurrent = pageContext === "studio";/);
  // Phones list every entry inside the section's collapsible panel.
  assert.match(header, /className=\{styles\.mobileSectionPanel\}[\s\S]*<ul aria-label=\{item\.label\} className=\{styles\.mobileSubmenu\} data-menu=\{menuId\}>/);
  // One menu open at a time: opening one closes the others without a fade.
  assert.match(menu, /window\.dispatchEvent\(new CustomEvent\(menuOpenEvent, \{ detail: panelId \}\)\)/);
  assert.match(css, /\.navGroup\[data-replaced\] :is\(\.menuPanel, \.menuSurface, \.menuList li\) \{\s*transition: none;/);
  assert.match(header, /trackNavigationClick\(entry\.id, `mobile-\$\{menuId\}-menu`\)/);
  // A mobile section toggles, so its own-page entry stays in the full list.
  assert.match(header, /menu\.entries\.map\(/);
  assert.doesNotMatch(header, /menu\.entries\.filter\(\(entry\) => entry\.href !== item\.href\)/);

  // Disclosure pattern: link + chevron button with aria-expanded/controls; Escape returns focus.
  assert.match(menu, /aria-controls=\{panelId\}\s*aria-expanded=\{open\}\s*aria-label=\{toggleLabel\}/);
  // Escape closes it, and returns focus only when focus was inside the menu.
  assert.match(menu, /event\.key !== "Escape" \|\| event\.defaultPrevented/);
  assert.match(menu, /if \(focusWasInside\) buttonRef\.current\?\.focus\(\)/);
  assert.match(menu, /const openDelayMs = 60;\s*const closeDelayMs = 150;/);
  assert.match(menu, /event\.pointerType === "mouse"/);
  // The panel is hidden from the keyboard and screen readers until open.
  assert.match(css, /\.menuPanel \{[\s\S]*?visibility: hidden;/);
  assert.match(css, /\.navGroup\[data-open\] \.menuPanel \{[\s\S]*?visibility: visible;/);
  // Motion: lift-in panel, staggered rows, gliding highlight; all off with reduced motion.
  assert.match(css, /transition-delay: calc\(var\(--i, 0\) \* 25ms\), calc\(var\(--i, 0\) \* 25ms\), 0s;/);
  // "Services" itself opens the full-trip page; the menu lists only the services.
  assert.match(model, /services: \{\s*label: "服务",[\s\S]{0,120}pathSegment: "services\/full-trip-support\/"/);
  assert.doesNotMatch(menu, /allServices|servicesAll/);
  // The highlight only glides once it is showing (no sweep in from the top).
  assert.match(css, /\.menuListWrap\[data-glide\] \.menuHighlight \{/);
  // A query link (none today) would load the page, so a homepage preset is read.
  assert.match(menu, /href\.includes\("\?"\)\s*\? <a href=\{href\}/);
  assert.match(header, /<MenuLink\s/);
  // Touch: the first tap on the label opens the panel.
  assert.match(menu, /lastPointer\.current !== "mouse" && !open/);
  assert.match(css, /\.menuHighlight \{[\s\S]*?transform: translateY\(var\(--hl-y, 0\)\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.menuSurface,[\s\S]*?\.menuHighlight,/);
});
