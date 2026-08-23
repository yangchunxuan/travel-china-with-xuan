import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  getHomepageDecisionPath,
  getHomepageShowcaseCopy,
} from "../../lib/homepageShowcaseI18n.ts";
import { getHomegroundCopy } from "../../lib/homegroundI18n.ts";
import { getHomepageProductShowcaseCopy } from "../../lib/homepageProductShowcaseI18n.ts";
import { privateTourProducts } from "../../lib/privateTourProducts.ts";

const repositoryRoot = new URL("../../", import.meta.url);
const source = (path) =>
  readFile(new URL(path, repositoryRoot), "utf8");

test("the homepage showcase keeps four equivalent decisions in every language", () => {
  const expectedIds = ["explore", "stay", "transport", "plan"];

  for (const locale of ["en", "zh", "ko"]) {
    const copy = getHomepageShowcaseCopy(locale);
    const identityCopy = getHomegroundCopy(locale);
    const headline = copy.heroHeadline;
    assert.deepEqual(
      copy.decisions.cards.map((card) => card.id),
      expectedIds,
    );
    assert.equal(new Set(copy.decisions.cards.map((card) => card.title)).size, 4);
    assert.ok(copy.heroBody.length > 40);
    assert.equal(headline.phrases.length, 4);
    assert.equal(new Set(headline.phrases).size, headline.phrases.length);
    assert.ok(headline.fixedLines.every((line) => line.trim().length > 0));
    assert.ok(headline.phrases.every((phrase) => phrase.trim().length > 0));
    assert.ok(headline.pauseLabel.length > 4);
    assert.ok(headline.playLabel.length > 4);
    assert.equal(
      [...headline.fixedLines, headline.phrases[0]].join(headline.joiner),
      identityCopy.hero.title,
    );
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

test("the white homepage flows from guidance to one structured dark footer", async () => {
  const [
    page,
    footer,
    showcaseStyles,
    footerStyles,
    searchStyles,
    productStyles,
    productShowcase,
  ] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomegroundFooter.tsx"),
    source("components/HomepageShowcase.module.css"),
    source("components/HomepageFooter.module.css"),
    source("components/HomepageGuideSearch.module.css"),
    source("components/HomepageProductShowcase.module.css"),
    source("components/HomepageProductShowcase.tsx"),
  ]);

  const orderedMarkers = [
    "<HomepageProductShowcase",
    "<HomepageGuideSearch",
    'id="homepage-decisions-title"',
    "<HomepageGuideRail",
    "<PlanningScopeSection",
    'id="homepage-human-planning-title"',
    'id="faq"',
    "<HomegroundFooter",
  ].map((marker) => page.indexOf(marker));
  assert.ok(orderedMarkers.every((position) => position >= 0));
  assert.deepEqual(orderedMarkers, [...orderedMarkers].sort((a, b) => a - b));

  assert.match(showcaseStyles, /--showcase-canvas: #fff/);
  assert.match(showcaseStyles, /--showcase-surface: #fff/);
  assert.match(showcaseStyles, /\.planningSection \{[\s\S]{0,100}background: #fff/);
  assert.doesNotMatch(showcaseStyles, /\.principles\s*\{/);
  assert.doesNotMatch(page, /className=\{showcaseStyles\.principles\}/);
  assert.doesNotMatch(page, /<section[\s\S]{0,160}id="destinations"/);
  assert.match(page, /destinationHubItems=\{destinationHubItems\}/);
  assert.match(page, /variant="homepage"/);
  assert.match(footer, /data-homeground-homepage-footer="structured-dark"/);
  assert.match(footer, /id="destinations"/);
  assert.match(footer, /id="studio"/);
  assert.match(footerStyles, /\.footer \{[\s\S]{0,100}background: #141413/);
  assert.match(footerStyles, /\.navGrid h2:focus-visible,[\s\S]{0,180}outline:/);
  assert.doesNotMatch(footerStyles, /\.navGrid h2\s*\{[^}]*outline:\s*none/);
  assert.doesNotMatch(footerStyles, /(?:linear|radial)-gradient|border-radius/);
  assert.match(
    searchStyles,
    /\.finder \{[\s\S]{0,260}background: var\(--hg-color-soft\)/,
  );
  assert.match(productStyles, /\.section \{[\s\S]{0,120}background: #fff/);
  assert.match(productShowcase, /data-homepage-offer-kind="tour"/);
  assert.doesNotMatch(productShowcase, /data-homepage-offer-kind="guide"/);
  assert.match(productStyles, /\.productGrid \{[\s\S]{0,180}grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(productStyles, /\.featured\s*\{|\.guideGrid\s*\{/);
  assert.doesNotMatch(page, /<TenCityMapFeature/);
  assert.equal(page.match(/<RouteFinder\b/g)?.length, 1);
  assert.equal(page.match(/<PlannerHandoff\b/g)?.length, 1);
});

test("the homepage product showcase exposes all nine published tours without guide placeholders", async () => {
  const [page, productShowcase, catalog, rail, defaultRoute, localizedRoute, labRoute] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageProductShowcase.tsx"),
    source("lib/homepagePrivateTourCatalog.ts"),
    source("components/HomepageGuideRail.tsx"),
    source("app/(default)/page.tsx"),
    source("app/(localized)/[locale]/page.tsx"),
    source("app/(lab)/planning-scope-lab/full/[locale]/page.lab.tsx"),
  ]);

  assert.equal(privateTourProducts.length + 1, 9);
  assert.match(catalog, /privateTourProducts\.map/);
  assert.match(catalog, /localizePrivateTourProduct\(product, locale\)/);
  assert.match(catalog, /zhangjiajieProduct\.short_description\[contentLocale\]/);
  assert.match(catalog, /description: localized\.lede/);
  assert.doesNotMatch(catalog, /shanghai-suzhou-hangzhou-6-day-private-tour|chengdu-pandas-sanxingdui-5-day-private-tour/);
  assert.doesNotMatch(page, /homepageProductShowcaseGuideIds|productShowcaseGuides|featuredTour/);
  assert.match(page, /products=\{privateTourItems\}/);
  assert.match(page, /excludedItemIds=\{productShowcaseExcludedItemIds\}/);
  assert.match(page, /homepage_product_card_clicked/);
  assert.match(productShowcase, /products\.map\(\(product, index\)/);
  assert.match(productShowcase, /\{copy\.productLabel\}/);
  assert.match(productShowcase, /\{product\.title\}/);
  assert.match(productShowcase, /\{product\.description\}/);
  assert.match(productShowcase, /loading="lazy"/);
  assert.doesNotMatch(productShowcase, /fetchPriority=|loading="eager"|\bguides\b|\bguideLabel\b/);
  for (const route of [defaultRoute, localizedRoute, labRoute]) {
    assert.match(route, /getHomepagePrivateTourItems/);
    assert.match(route, /privateTourItems=\{getHomepagePrivateTourItems\(/);
  }
  assert.match(rail, /excludedItemIds\?: readonly string\[\]/);
  assert.match(rail, /!excludedItemIdSet\.has\(item\.id\)/);

  for (const locale of ["en", "zh", "ko"]) {
    const copy = getHomepageProductShowcaseCopy(locale);
    assert.ok(copy.title.length > 8);
    assert.ok(copy.intro(9).length > 60);
    assert.match(copy.countLabel(9), /9/);
    assert.match(copy.durationLabel(5, 4), /5/);
    assert.ok(copy.availabilityNote.length > 30);
  }
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
  assert.doesNotMatch(page, /cityIndex|principleNumber/);
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
  assert.match(
    page,
    /className=\{`\$\{styles\.heroLead\} \$\{showcaseStyles\.heroLead\}`\}/,
  );
  assert.match(page, /heroLinks\.map/);
  assert.match(page, /aria-label=\{showcase\.heroLinksLabel\}/);
  assert.match(
    styles,
    /@media \(max-width: 39\.999rem\)[\s\S]{0,2200}\.decisionNumber \{\s*font-size: 0\.875rem/,
  );
  assert.match(
    styles,
    /\.heroTitle \{[\s\S]{0,100}font-family: var\(--hg-editorial\)[\s\S]{0,100}font-weight: 400/,
  );
  assert.match(
    styles,
    /\.decisionIntro h2,[\s\S]{0,100}font-family: var\(--hg-editorial\)/,
  );
  assert.match(
    styles,
    /\.root :global\(#homepage-guide-search-title\),[\s\S]{0,260}font-family: var\(--hg-editorial\)/,
  );
  assert.match(
    styles,
    /\.root\[data-homeground-locale="zh"\] :global\(#homepage-guide-search-title\),[\s\S]{0,500}font-weight: 500/,
  );
  assert.match(
    styles,
    /\.root\[data-homeground-locale="ko"\] :global\(#homepage-guide-search-title\),[\s\S]{0,500}font-weight: 400/,
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
