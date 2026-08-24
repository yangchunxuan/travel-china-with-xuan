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
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";

const repositoryRoot = new URL("../../", import.meta.url);
const source = (path) =>
  readFile(new URL(path, repositoryRoot), "utf8");

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const darker = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  return (lighter + 0.05) / (darker + 0.05);
}

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
  const productMuted = productStyles.match(
    /--homepage-product-muted:\s*(#[0-9a-f]{6})/i,
  )?.[1];
  assert.ok(productMuted);
  assert.ok(contrastRatio(productMuted, "#ffffff") >= 4.5);
  for (const selector of ["count", "cardMeta", "availabilityNote"]) {
    assert.match(
      productStyles,
      new RegExp(
        `\\.${selector} \\{[\\s\\S]{0,160}color: var\\(--homepage-product-muted\\)`,
      ),
    );
  }
  assert.match(productShowcase, /data-homepage-offer-kind="tour"/);
  assert.doesNotMatch(productShowcase, /data-homepage-offer-kind="guide"/);
  assert.match(productStyles, /\.productGrid \{[\s\S]{0,180}grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(productStyles, /\.featured\s*\{|\.guideGrid\s*\{/);
  assert.doesNotMatch(page, /<TenCityMapFeature/);
  assert.equal(page.match(/<RouteFinder\b/g)?.length, 1);
  assert.equal(page.match(/<PlannerHandoff\b/g)?.length, 1);
});

test("the homepage product showcase exposes every published tour without guide placeholders", async () => {
  const [
    page,
    productShowcase,
    catalog,
    publishedCatalog,
    rail,
    defaultRoute,
    localizedRoute,
    labRoute,
    zhangjiajieProductSource,
    zhangjiajiePreviewSource,
  ] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageProductShowcase.tsx"),
    source("lib/homepagePrivateTourCatalog.ts"),
    source("lib/publishedPrivateTourCatalog.ts"),
    source("components/HomepageGuideRail.tsx"),
    source("app/(default)/page.tsx"),
    source("app/(localized)/[locale]/page.tsx"),
    source("app/(lab)/planning-scope-lab/full/[locale]/page.lab.tsx"),
    source("content/product-previews/zhangjiajie-4-day-private-tour/product.json"),
    source("lib/zhangjiajiePrivateTourPreview.ts"),
  ]);

  const zhangjiajieProduct = JSON.parse(zhangjiajieProductSource);
  const expectedTourSlugs = [
    ...privateTourProducts.map((product) => product.slug),
    zhangjiajieProduct.seo.slug,
  ].sort();
  const actualTourSlugs = getPublishedPrivateTourCatalog("en").map(
    (product) => product.slug,
  );
  assert.equal(new Set(actualTourSlugs).size, expectedTourSlugs.length);
  assert.deepEqual([...actualTourSlugs].sort(), expectedTourSlugs);
  for (const locale of ["en", "zh", "ko"]) {
    assert.deepEqual(
      getPublishedPrivateTourCatalog(locale)
        .map((product) => product.slug)
        .sort(),
      expectedTourSlugs,
      locale,
    );
  }
  assert.match(catalog, /getPublishedPrivateTourCatalog\(locale\)/);
  assert.doesNotMatch(catalog, /privateTourProducts|getZhangjiajiePrivateTourHomeCard/);
  assert.match(publishedCatalog, /privateTourProducts\.map/);
  assert.match(publishedCatalog, /localizePrivateTourProduct\(product, locale\)/);
  assert.match(publishedCatalog, /getZhangjiajiePrivateTourHomeCard\(locale\)/);
  assert.match(publishedCatalog, /zhangjiajieProduct\.short_description\[contentLocale\]/);
  assert.match(publishedCatalog, /description: localized\.lede/);
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

  const trustCopy = {
    en: {
      noShopping: /no shopping stops/i,
      writtenScope: /final inclusions, exclusions and total in writing before payment/,
      priorAgreement: /optional upgrade or added service is agreed before it is charged/,
      privateBasis: /published tour and price is for you and your companions/,
      sharedTransit: /public trains, cruises or transport within attractions/,
      lowerCost: /lower-cost alternative, we will explain what could change and quote any suitable option separately/,
      consent: /not add a shared arrangement without your agreement/,
    },
    zh: {
      noShopping: /不安排购物店/,
      writtenScope: /付款前书面确认最终包含项、不包含项和总价/,
      priorAgreement: /任何升级或新增服务，都会在收费前先由你确认/,
      privateBasis: /页面上的行程和价格按你和同行者单独安排/,
      sharedTransit: /高铁、游船或景区交通/,
      lowerCost: /进一步控制预算，我们会先说明哪些安排可以调整；如有合适方案，再单独报价/,
      consent: /未经你同意不会增加共享安排/,
    },
    ko: {
      noShopping: /쇼핑 일정은 없으며/,
      writtenScope: /결제 전에 최종 포함·불포함 사항과 총액을 서면으로 안내/,
      priorAgreement: /선택 업그레이드나 추가 서비스는 비용이 발생하기 전에 먼저 동의를 받습니다/,
      privateBasis: /공개된 일정과 요금은 예약한 일행만을 위한 프라이빗 투어 기준/,
      sharedTransit: /열차, 유람선 또는 관광지 내부 교통/,
      lowerCost: /비용을 낮출 수 있는 대안을 원하시면 변경 가능한 부분을 먼저 설명하고, 적합한 대안이 있을 때 별도로 견적/,
      consent: /동의 없이 공동 이용 방식을 추가하지 않으며/,
    },
  };

  const publishedTourCount = getPublishedPrivateTourCatalog("en").length;

  for (const locale of ["en", "zh", "ko"]) {
    const copy = getHomepageProductShowcaseCopy(locale);
    const homeCopy = getHomegroundCopy(locale);
    assert.ok(copy.title.length > 8);
    assert.ok(copy.intro(publishedTourCount).length > 60);
    assert.match(
      copy.countLabel(publishedTourCount),
      new RegExp(String(publishedTourCount)),
    );
    assert.match(copy.durationLabel(5, 4), /5/);
    assert.ok(copy.availabilityNote.length > 30);
    assert.match(copy.intro(publishedTourCount), trustCopy[locale].noShopping);
    assert.match(copy.intro(publishedTourCount), trustCopy[locale].writtenScope);
    assert.match(copy.intro(publishedTourCount), trustCopy[locale].priorAgreement);
    assert.match(homeCopy.faq.items[0].answer, trustCopy[locale].privateBasis);
    assert.match(homeCopy.faq.items[0].answer, trustCopy[locale].sharedTransit);
    assert.match(homeCopy.faq.items[0].answer, trustCopy[locale].lowerCost);
    assert.match(homeCopy.faq.items[0].answer, trustCopy[locale].consent);
    assert.doesNotMatch(
      homeCopy.faq.items[0].answer,
      /small-group tours|shared transfers|小团|拼车|소그룹|합승/i,
    );
  }

  for (const product of privateTourProducts) {
    assert.equal(product.servicePolicy.shoppingStops, false);
    assert.equal(product.servicePolicy.addedServicesRequirePriorAgreement, true);
    const publicPolicyCopy = {
      en: [product.serviceNote.en, ...product.packages.map((item) => item.summary.en)].join(" "),
      zh: [product.serviceNote.zh, ...product.packages.map((item) => item.summary.zh)].join(" "),
      ko: [product.serviceNote.ko, ...product.packages.map((item) => item.summary.ko)].join(" "),
    };
    assert.match(publicPolicyCopy.en, /No shopping stops/);
    assert.match(publicPolicyCopy.zh, /无购物店安排/);
    assert.match(publicPolicyCopy.ko, /쇼핑 일정은 없습니다|쇼핑 일정이 없습니다/);
  }

  assert.equal(zhangjiajieProduct.service_policy.shopping_stops, false);
  assert.equal(
    zhangjiajieProduct.service_policy.added_services_require_prior_agreement,
    true,
  );
  assert.deepEqual(
    zhangjiajieProduct.draft_inclusions.find(
      (item) => item.fact_id === "no-shopping-prior-agreement",
    ),
    {
      label_zh: "不安排购物店；任何升级或新增服务在收费前确认",
      fact_id: "no-shopping-prior-agreement",
      claim_status: "working_standard",
    },
  );

  assert.match(
    zhangjiajiePreviewSource,
    /No shopping stops; optional upgrades or added services require your agreement before they are charged/,
  );
  assert.match(
    zhangjiajiePreviewSource,
    /不安排购物店；任何升级或新增服务都须在收费前由你确认/,
  );
  assert.match(
    zhangjiajiePreviewSource,
    /쇼핑 일정 없음; 선택 업그레이드나 추가 서비스는 비용 청구 전에 동의를 받음/,
  );
});

test("showcase navigation and result layouts remain keyboard and state safe", async () => {
  const [
    page,
    styles,
    navigation,
    header,
    headerStyles,
    sharedStyles,
    finder,
    planningDesk,
    quickContact,
  ] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageShowcase.module.css"),
    source("lib/homegroundNavigation.ts"),
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundHeader.module.css"),
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
    headerStyles,
    /\.siteHeader\[data-homeground-header-context="home"\] \{[\s\S]{0,120}position: fixed/,
  );
  assert.match(
    headerStyles,
    /\.headerInner \{[\s\S]{0,220}grid-template-columns:[\s\S]{0,160}height: var\(--homeground-header-height\)[\s\S]{0,160}max-inline-size: 90rem/,
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
    headerStyles,
    /@media \(max-width: 1179\.98px\)[\s\S]{0,1600}\.mobileNav \{[\s\S]{0,260}inset: var\(--homeground-header-height\) 0 0[\s\S]{0,180}min-block-size: calc\(100dvh - var\(--homeground-header-height\)\)/,
  );
  assert.match(header, /document\.documentElement\.style\.overflow = "hidden"/);
  assert.match(header, /window\.innerWidth < 1180/);
  assert.match(header, /element\.inert = true/);
  assert.match(header, /activeBranch !== document\.body/);
  assert.match(header, /aria-modal=\{open \? "true" : undefined\}/);
  assert.match(header, /role=\{open \? "dialog" : undefined\}/);
  assert.match(headerStyles, /\.siteHeader\[data-menu-open="true"\][\s\S]{0,80}z-index: 1400/);
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
