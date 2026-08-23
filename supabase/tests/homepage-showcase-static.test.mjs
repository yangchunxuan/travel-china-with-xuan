import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  getHomepageDecisionPath,
  getHomepageShowcaseCopy,
} from "../../lib/homepageShowcaseI18n.ts";

const repositoryRoot = new URL("../../", import.meta.url);
const source = (path) =>
  readFile(new URL(path, repositoryRoot), "utf8");

test("the homepage showcase keeps four equivalent decisions in every language", () => {
  const expectedIds = ["explore", "stay", "transport", "plan"];

  for (const locale of ["en", "zh", "ko"]) {
    const copy = getHomepageShowcaseCopy(locale);
    assert.deepEqual(
      copy.decisions.cards.map((card) => card.id),
      expectedIds,
    );
    assert.equal(new Set(copy.decisions.cards.map((card) => card.title)).size, 4);
    assert.ok(copy.heroBody.length > 40);
    assert.notEqual(copy.heroLinksLabel, copy.decisions.listLabel);
    for (const card of copy.decisions.cards) {
      assert.ok(card.body.length > 20);
      assert.ok(card.action.length > 4);
      assert.equal(
        getHomepageDecisionPath(locale, card.id),
        locale === "en"
          ? `/${card.id}/`
          : `/${locale}/${card.id}/`,
      );
    }
  }
});

test("the white homepage flows from guidance to a single bottom brand panel", async () => {
  const [page, showcaseStyles, searchStyles, mapStyles] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageShowcase.module.css"),
    source("components/HomepageGuideSearch.module.css"),
    source("components/TenCityMapFeature.module.css"),
  ]);

  const orderedMarkers = [
    "<HomepageGuideSearch",
    'id="homepage-decisions-title"',
    'id="destinations"',
    "<TenCityMapFeature",
    "<HomepageGuideRail",
    "<PlanningScopeSection",
    'id="homepage-human-planning-title"',
    'id="faq"',
    'className={showcaseStyles.principles}',
  ].map((marker) => page.indexOf(marker));
  assert.ok(orderedMarkers.every((position) => position >= 0));
  assert.deepEqual(orderedMarkers, [...orderedMarkers].sort((a, b) => a - b));

  assert.match(showcaseStyles, /--showcase-canvas: #fff/);
  assert.match(showcaseStyles, /--showcase-surface: #fff/);
  assert.match(showcaseStyles, /\.planningSection \{[\s\S]{0,100}background: #fff/);
  assert.match(showcaseStyles, /\.principles \{[\s\S]{0,100}background: var\(--showcase-ink\)/);
  assert.match(
    searchStyles,
    /\.finder \{[\s\S]{0,260}background: var\(--hg-color-soft\)/,
  );
  assert.match(
    mapStyles,
    /\.feature\[data-ten-city-map-placement="homepage"\] \{[\s\S]{0,120}background: #fff/,
  );
  assert.equal(page.match(/<RouteFinder\b/g)?.length, 1);
  assert.equal(page.match(/<PlannerHandoff\b/g)?.length, 1);
});

test("showcase navigation and result layouts remain keyboard and state safe", async () => {
  const [
    page,
    styles,
    navigation,
    header,
    sharedStyles,
    finder,
    planningDesk,
    quickContact,
  ] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageShowcase.module.css"),
    source("lib/homegroundNavigation.ts"),
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundHomePage.module.css"),
    source("components/RouteFinder.tsx"),
    source("components/HomepagePlanningDesk.tsx"),
    source("components/HomepageQuickContact.tsx"),
  ]);

  assert.match(page, /aria-hidden="true"[\s\S]{0,90}decisionNumber/);
  assert.match(page, /aria-hidden="true"[\s\S]{0,90}cityIndex/);
  assert.match(page, /aria-hidden="true"[\s\S]{0,90}principleNumber/);
  assert.match(styles, /\.decisionCard:focus-visible[\s\S]{0,160}outline-offset: -2px/);
  assert.match(styles, /\.planningSectionResult \.planningIntro \{\s*display: none/);
  assert.match(styles, /\.planningSectionResult \.planningPanel[\s\S]{0,150}max-inline-size: 62rem/);
  assert.match(navigation, /"#destinations": "homepage-city-hubs-title"/);
  assert.match(navigation, /behavior: "instant"/);
  assert.match(header, /plannerFlowHashes\.has\(activeHash\)\s*\? plannerTarget/);
  assert.match(header, /data-homeground-header-context=\{pageContext\}/);
  assert.match(
    page,
    /const plannerFlowHashes = new Set\(\[[\s\S]{0,160}"#planner-handoff"[\s\S]{0,100}if \(!plannerFlowHashes\.has\(resultHash\)\) return/,
  );
  assert.match(
    page,
    /const scrollTargetId =[\s\S]{0,100}resultHash === "#planner-handoff"[\s\S]{0,100}\? "planner-handoff"/,
  );
  assert.match(page, /scrollTarget\.scrollIntoView/);
  assert.match(page, /focusTarget\.focus\(\{ preventScroll: true \}\)/);
  assert.match(
    sharedStyles,
    /\.siteHeader\[data-homeground-header-context="home"\] \{[\s\S]{0,180}backdrop-filter: blur\(12px\)[\s\S]{0,120}background: rgb\(255 255 255 \/ 85%\)[\s\S]{0,180}position: fixed/,
  );
  assert.match(
    sharedStyles,
    /\.siteHeader\[data-homeground-header-context="home"\] \.headerInner \{[\s\S]{0,140}background: transparent[\s\S]{0,120}height: 4rem[\s\S]{0,100}max-width: 1280px/,
  );
  assert.match(styles, /--showcase-content: 77rem/);
  assert.match(styles, /--showcase-section-space: 6rem/);
  assert.match(
    styles,
    /\.hero \{[\s\S]{0,100}padding: 14rem var\(--showcase-gutter\) 5rem/,
  );
  assert.match(
    styles,
    /\.heroInner \{[\s\S]{0,180}grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/,
  );
  assert.match(page, /className=\{showcaseStyles\.heroAssurance\}/);
  assert.match(page, /heroLinks\.map/);
  assert.match(page, /aria-label=\{showcase\.heroLinksLabel\}/);
  assert.match(
    styles,
    /@media \(max-width: 39\.999rem\)[\s\S]{0,2200}\.decisionNumber \{\s*font-size: 0\.875rem/,
  );
  assert.match(
    styles,
    /\.heroCopy h1 \{[\s\S]{0,100}font-family: var\(--hg-ui-display\)/,
  );
  assert.doesNotMatch(styles, /\.root h2\s*\{[^}]*font-family:\s*var\(--sans\)/);
  assert.match(
    styles,
    /\.primaryAction,[\s\S]{0,260}min-block-size: var\(--showcase-button-height\)/,
  );
  assert.match(
    sharedStyles,
    /@media \(max-width: 1099\.98px\)[\s\S]{0,1800}\.mobileNav \{[\s\S]{0,260}inset: 0[\s\S]{0,180}min-height: 100dvh/,
  );
  assert.match(header, /document\.documentElement\.style\.overflow = "hidden"/);
  assert.match(header, /window\.innerWidth >= 1100/);
  assert.match(header, /aria-label=\{copy\.navigation\.homeLabel\}[\s\S]{0,80}onClick=\{close\}/);
  assert.match(page, /const alignHashTarget = \(\) =>/);
  assert.match(page, /attempts < 120/);
  assert.match(page, /document\.fonts\.ready\.then/);
  assert.match(planningDesk, /<header className=\{styles\.intentHeader\} id="planner-contact">/);
  assert.doesNotMatch(quickContact, /id="planner-contact"/);
  assert.match(sharedStyles, /\.intentHeader \{[\s\S]{0,140}scroll-margin-top: 6rem/);
  assert.match(
    finder,
    /value === "result" && window\.location\.hash === "#planner-handoff"[\s\S]{0,100}\? "planner-handoff"/,
  );
  assert.doesNotMatch(
    `${page}\n${styles}`,
    /\b(?:xAI|Grok)\b/,
  );
});
