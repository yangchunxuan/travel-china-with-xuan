import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  getHomepageGuidePath,
  getHomepageShowcaseCopy,
} from "../../lib/homepageShowcaseI18n.ts";
import { getHomegroundCopy } from "../../lib/homegroundI18n.ts";
import {
  getHomepagePrivateTourItems,
  homepagePrivateTourSlugs,
} from "../../lib/homepagePrivateTourCatalog.ts";
import { getHomepageProductShowcaseCopy } from "../../lib/homepageProductShowcaseI18n.ts";
import { privateTourHubPaths } from "../../lib/privateTourHubI18n.ts";
import { privateTourProducts } from "../../lib/privateTourProducts.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";

const repositoryRoot = new URL("../../", import.meta.url);
const source = (path) =>
  readFile(new URL(path, repositoryRoot), "utf8");
const asset = (path) => readFile(new URL(path, repositoryRoot));

function jpegDimensions(buffer) {
  assert.equal(buffer.readUInt16BE(0), 0xffd8, "asset must be a JPEG");

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }

  throw new Error("JPEG dimensions were not found");
}

function topLevelMp4Boxes(buffer) {
  const boxes = new Map();
  let offset = 0;

  while (offset + 8 <= buffer.length) {
    const size = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    if (size < 8 || offset + size > buffer.length) break;
    boxes.set(type, offset);
    offset += size;
  }

  return boxes;
}

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

test("the homepage separates tour conversion, destination discovery and three parallel guide paths", async () => {
  const homepage = await source("components/HomegroundHomePage.tsx");
  const expectedIds = ["stay", "transport", "plan"];
  const heroBodyLengthLimits = { en: 72, zh: 28, ko: 44 };
  const productIntroLengthLimits = { en: 82, zh: 36, ko: 44 };

  assert.match(
    homepage,
    /const destinationsIndexPath =\s*locale === "en" \? "\/explore\/" : `\/\$\{locale\}\/explore\/`/,
  );
  assert.match(
    homepage,
    /className=\{showcaseStyles\.heroDestinationPrompt\}[\s\S]{0,180}<Link href=\{destinationsIndexPath\}>/,
  );

  for (const locale of ["en", "zh", "ko"]) {
    const copy = getHomepageShowcaseCopy(locale);
    const identityCopy = getHomegroundCopy(locale);
    const productCopy = getHomepageProductShowcaseCopy(locale);
    const headline = copy.heroHeadline;
    assert.deepEqual(
      copy.guidePaths.items.map((item) => item.id),
      expectedIds,
    );
    assert.equal(new Set(copy.guidePaths.items.map((item) => item.title)).size, 3);
    assert.ok(copy.heroBody.length >= 18);
    assert.ok(copy.heroBody.length <= heroBodyLengthLimits[locale]);
    assert.ok(productCopy.intro(6).length >= 18);
    assert.ok(productCopy.intro(6).length <= productIntroLengthLimits[locale]);
    assert.equal(headline.phrases.length, 4);
    assert.equal(new Set(headline.phrases).size, headline.phrases.length);
    assert.ok(headline.fixedLines.every((line) => line.trim().length > 0));
    assert.ok(headline.phrases.every((phrase) => phrase.trim().length > 0));
    assert.equal(
      [...headline.fixedLines, headline.phrases[0]].join(headline.joiner),
      identityCopy.hero.title,
    );
    assert.notEqual(copy.heroPrimary, copy.heroDestinationAction);
    assert.ok(copy.heroDestinationPrompt.length > 4);
    // The owner removed the prompt line and each path's small text (2026-09-25).
    assert.equal("prompt" in copy.guidePaths, false);
    assert.equal(
      privateTourHubPaths[locale],
      locale === "en" ? "/tours/" : `/${locale}/tours/`,
    );
    for (const item of copy.guidePaths.items) {
      assert.equal("body" in item, false);
      assert.equal(
        getHomepageGuidePath(locale, item.id),
        locale === "en"
          ? `/${item.id}/`
          : `/${locale}/${item.id}/`,
      );
    }
  }

  assert.deepEqual(
    getHomepageShowcaseCopy("en").heroHeadline.fixedLines,
    ["China, your way."],
    "The English hero promise must not be split into two forced lines",
  );
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

  // The guide chapters replaced the separate guide rail (2026-09-25).
  assert.doesNotMatch(page, /<HomepageGuideRail/);
  const orderedMarkers = [
    "<HomepageProductShowcase",
    "<HomepageGuideSearch",
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
  assert.match(
    showcaseStyles,
    /\.root :global\(#planning-proof\) \{[\s\S]{0,80}padding-block-end: 0/,
  );
  assert.match(
    showcaseStyles,
    /\.root\[data-homeground-locale="zh"\] \.planningIntro h2 \{[\s\S]{0,100}line-break: strict;[\s\S]{0,60}word-break: normal/,
  );
  assert.doesNotMatch(showcaseStyles, /\.principles\s*\{/);
  assert.doesNotMatch(page, /className=\{showcaseStyles\.principles\}/);
  assert.doesNotMatch(page, /<section[\s\S]{0,160}id="destinations"/);
  assert.match(page, /destinationHubItems=\{destinationHubItems\}/);
  assert.match(page, /variant="homepage"/);
  assert.match(footer, /data-homeground-homepage-footer="structured-dark"/);
  assert.match(footer, /id="destinations"/);
  assert.match(footer, /id="studio"/);
  assert.match(footerStyles, /\.footer \{[\s\S]{0,100}background: #141413/);
  assert.match(page, /copy\.faq\.items\.slice\(0, 7\)\.map/);
  assert.match(footerStyles, /\.navGrid h2:focus-visible,[\s\S]{0,180}outline:/);
  assert.doesNotMatch(footerStyles, /\.navGrid h2\s*\{[^}]*outline:\s*none/);
  assert.doesNotMatch(footerStyles, /(?:linear|radial)-gradient|border-radius/);
  // The guide chapters sit on the white page; the old soft search card is gone (2026-09-25).
  assert.doesNotMatch(searchStyles, /\.finder \{[^}]*(?:background|border-radius):/);
  assert.match(showcaseStyles, /\.searchSection \{[\s\S]{0,40}background: #fff/);
  assert.match(productStyles, /\.section \{[\s\S]{0,120}background: #fff/);
  const productMuted = productStyles.match(
    /--homepage-product-muted:\s*(#[0-9a-f]{6})/i,
  )?.[1];
  assert.ok(productMuted);
  assert.ok(contrastRatio(productMuted, "#ffffff") >= 4.5);
  for (const selector of ["count", "cardMeta"]) {
    assert.match(
      productStyles,
      new RegExp(
        `\\.${selector} \\{[\\s\\S]{0,160}color: var\\(--homepage-product-muted\\)`,
      ),
    );
  }
  assert.match(productShowcase, /data-homepage-offer-kind="tour"/);
  assert.match(productShowcase, /href=\{privateTourHubPaths\[locale\]\}/);
  assert.match(productShowcase, /\{copy\.hubActionLabel\}/);
  assert.doesNotMatch(productShowcase, /availabilityNote/);
  assert.doesNotMatch(productShowcase, /data-homepage-offer-kind="guide"/);
  // Wide screens list the routes as one numbered index beside a large photo.
  assert.match(productStyles, /@media \(min-width: 64rem\) \{[\s\S]*?\.productGrid \{\s*gap: 0;\s*grid-template-columns: minmax\(0, 1fr\);/);
  // The owner asked for a clearer way on to every route (2026-09-25): the
  // hub link is now the site's ink pill (14px / 500 / 44px), as on the hero,
  // right under the routes. Still no rule above it.
  assert.match(
    productStyles,
    /\.showcaseFooter \{[\s\S]{0,100}justify-content: flex-start/,
  );
  assert.doesNotMatch(
    productStyles,
    /\.showcaseFooter \{[^}]*border-block-start/,
  );
  assert.doesNotMatch(productStyles, /\.availabilityNote/);
  assert.match(
    productStyles,
    /\.hubLink \{[\s\S]{0,120}background: var\(--showcase-ink\);[\s\S]{0,240}font-size: 0\.875rem;[\s\S]{0,80}font-weight: 500;[\s\S]{0,120}min-block-size: 2\.75rem;/,
  );
  assert.match(
    productStyles,
    /\.hubLink:hover \{\s*background: #242424;/,
  );
  assert.match(
    productStyles,
    /\.hubLink:focus-visible \{[\s\S]{0,100}outline: 3px solid/,
  );
  assert.match(productShowcase, /\{copy\.hubActionLabel\}\s*<ArrowRight aria-hidden="true" size=\{16\} \/>/);
  assert.doesNotMatch(productStyles, /\.featured\s*\{|\.guideGrid\s*\{/);
  assert.match(
    searchStyles,
    /:global\(\[data-homeground-locale="ko"\]\) \.chapterTitle a \{[\s\S]*?word-break: keep-all;/,
    "Korean chapter titles break between words",
  );
  assert.match(searchStyles, /:global\(\[data-homeground-locale="ko"\]\) \.questions a \{\s*word-break: keep-all;/);
  assert.doesNotMatch(page, /<TenCityMapFeature/);
  assert.equal(page.match(/<RouteFinder\b/g)?.length, 1);
  assert.equal(page.match(/<PlannerHandoff\b/g)?.length, 1);
});

test("the planning-scope film loads near the viewport and keeps an accessible poster fallback", async () => {
  const [planningScope, planningScopeStyles] = await Promise.all([
    source("components/PlanningScopeSection.tsx"),
    source("components/PlanningScopeSection.module.css"),
  ]);

  assert.match(planningScope, /new IntersectionObserver/);
  assert.match(
    planningScope,
    /typeof window\.IntersectionObserver !== "function"/,
  );
  assert.match(planningScope, /rootMargin: "400px 0px"/);
  assert.match(planningScope, /prefers-reduced-motion: reduce/);
  assert.match(planningScope, /addEventListener\("change", handleMotionPreference\)/);
  assert.match(planningScope, /video\.pause\(\);[\s\S]{0,80}setVideoHasPlayed\(false\)/);
  assert.match(planningScope, /connection\?\.saveData/);
  assert.doesNotMatch(planningScope, /\bautoPlay\b/);
  assert.match(planningScope, /video\.load\(\)/);
  assert.match(planningScope, /loop/);
  assert.match(planningScope, /muted/);
  assert.match(planningScope, /playsInline/);
  assert.match(planningScope, /preload="none"/);
  assert.match(planningScope, /aria-hidden="true"/);
  assert.doesNotMatch(planningScope, /\bcontrols\b/);
  assert.doesNotMatch(planningScope, /<video[\s\S]*?\bposter=/);
  assert.match(
    planningScope,
    /planning-scope-garden-mobile\.mp4[\s\S]*planning-scope-garden-desktop\.mp4/,
  );
  assert.match(
    planningScope,
    /planning-scope-garden-mobile\.jpg[\s\S]*planning-scope-garden-desktop\.jpg/,
  );
  assert.match(planningScopeStyles, /\.visual \{[\s\S]{0,120}aspect-ratio: 2\.5 \/ 1/);
  assert.match(planningScopeStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(planningScopeStyles, /\.video \{[\s\S]{0,80}display: none/);
});

test("the planning-scope media assets are responsive, silent, fast-start and bounded", async () => {
  const [desktopPoster, mobilePoster, desktopVideo, mobileVideo] = await Promise.all([
    asset("public/images/home/planning-scope-garden-desktop.jpg"),
    asset("public/images/home/planning-scope-garden-mobile.jpg"),
    asset("public/videos/home/planning-scope-garden-desktop.mp4"),
    asset("public/videos/home/planning-scope-garden-mobile.mp4"),
  ]);

  assert.deepEqual(jpegDimensions(desktopPoster), { width: 1600, height: 640 });
  assert.deepEqual(jpegDimensions(mobilePoster), { width: 960, height: 720 });
  assert.ok(desktopPoster.length < 200_000);
  assert.ok(mobilePoster.length < 150_000);
  assert.ok(desktopVideo.length < 5_000_000);
  assert.ok(mobileVideo.length < 3_500_000);
  assert.ok(mobileVideo.length < desktopVideo.length);

  for (const video of [desktopVideo, mobileVideo]) {
    const boxes = topLevelMp4Boxes(video);
    assert.ok(boxes.has("ftyp"));
    assert.ok(boxes.has("moov"));
    assert.ok(boxes.has("mdat"));
    assert.ok(boxes.get("moov") < boxes.get("mdat"), "moov must precede mdat");
    assert.ok(video.includes(Buffer.from("avc1")), "video must use H.264/AVC");
    assert.equal(video.includes(Buffer.from("mp4a")), false, "ambient film must be silent");
  }
});

test("the homepage shows six stable private tours while the hub keeps the complete catalog", async () => {
  const [
    page,
    productShowcase,
    productShowcaseStyles,
    catalog,
    publishedCatalog,
    defaultRoute,
    localizedRoute,
    labRoute,
    zhangjiajieProductSource,
    zhangjiajiePreviewSource,
  ] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageProductShowcase.tsx"),
    source("components/HomepageProductShowcase.module.css"),
    source("lib/homepagePrivateTourCatalog.ts"),
    source("lib/publishedPrivateTourCatalog.ts"),
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

  const homepageSelectionSource = catalog.match(
    /export const homepagePrivateTourSlugs = \[([\s\S]*?)\] as const;/,
  );
  assert.ok(homepageSelectionSource, "homepage tour selection must stay explicit");
  const homepageTourSlugs = [
    ...homepageSelectionSource[1].matchAll(/"([^"]+)"/g),
  ].map((match) => match[1]);
  assert.deepEqual(homepageTourSlugs, [
    "zhangjiajie-forest-4-day-private-tour",
    "beijing-highlights-5-day-private-tour",
    "shanghai-suzhou-hangzhou-6-day-private-tour",
    "chengdu-pandas-sanxingdui-5-day-private-tour",
    "xian-terracotta-warriors-5-day-private-tour",
    "guilin-yangshuo-5-day-private-tour",
  ]);
  assert.equal(new Set(homepageTourSlugs).size, 6);
  assert.ok(homepageTourSlugs.every((slug) => expectedTourSlugs.includes(slug)));
  assert.ok(homepageTourSlugs.length < expectedTourSlugs.length);
  assert.deepEqual(homepageTourSlugs, [...homepagePrivateTourSlugs]);
  for (const locale of ["en", "zh", "ko"]) {
    const homepageItems = getHomepagePrivateTourItems(locale);
    assert.equal(homepageItems.length, 6, locale);
    assert.deepEqual(
      homepageItems.map((product) => product.id),
      homepageTourSlugs,
      locale,
    );
    assert.equal(new Set(homepageItems.map((product) => product.href)).size, 6, locale);
    assert.equal(new Set(homepageItems.map((product) => product.image.src)).size, 6, locale);
    assert.ok(homepageItems.every((product) => product.appeal.length > 20), locale);
    assert.ok(
      homepageItems.every((product) => product.startingPrice.formatted.length > 0),
      locale,
    );
  }
  assert.match(catalog, /getPublishedPrivateTourCatalog\(locale\)/);
  assert.match(catalog, /homepagePrivateTourSlugs\.map/);
  assert.match(catalog, /Missing homepage private tour/);
  assert.doesNotMatch(catalog, /privateTourProducts|getZhangjiajiePrivateTourHomeCard/);
  assert.match(publishedCatalog, /privateTourProducts\.map/);
  assert.match(publishedCatalog, /localizePrivateTourProduct\(product, locale\)/);
  assert.match(publishedCatalog, /getZhangjiajiePrivateTourHomeCard\(locale\)/);
  assert.match(publishedCatalog, /zhangjiajieProduct\.short_description\[contentLocale\]/);
  assert.match(publishedCatalog, /description: localized\.lede/);
  assert.doesNotMatch(page, /homepageProductShowcaseGuideIds|productShowcaseGuides|featuredTour/);
  assert.match(page, /products=\{privateTourItems\}/);
  // The guide chapters list guides only, so no tour appears twice.
  assert.doesNotMatch(page, /excludedItemIds|productShowcaseExcludedItemIds/);
  assert.match(page, /homepage_product_card_clicked/);
  assert.match(productShowcase, /products\.map\(\(product, index\)/);
  assert.doesNotMatch(productShowcase, /copy\.titleNoWrap|styles\.keepTogether/);
  assert.match(productShowcase, /\{copy\.productLabel\}/);
  assert.match(productShowcase, /\{product\.title\}/);
  assert.match(productShowcase, /\{product\.appeal\}/);
  assert.match(productShowcase, /\{product\.startingPrice\.formatted\}/);
  assert.match(productShowcase, /copy\.groupBasis\(product\.startingPrice\.travelers\)/);
  // The owner removed the three promises and the enquiry strip under the
  // routes (2026-09-25); the planner stays reachable from the header and the
  // contact section.
  assert.doesNotMatch(productShowcase, /styles\.trustList|styles\.enquiryStrip|plannerHref/);
  assert.doesNotMatch(page, /homepage-product-enquiry/);
  assert.match(productShowcase, /loading="lazy"/);
  assert.match(productShowcase, /sizes=\{homepageProductImageSizes\}/);
  assert.match(productShowcase, /privateTourCardImageSrcSet\(product\.id\)/);
  assert.match(productShowcase, /privateTourCardImageSource\(product\.id, 640\)/);
  assert.doesNotMatch(productShowcase, /fetchPriority=|loading="eager"|\bguides\b|\bguideLabel\b/);
  for (const route of [defaultRoute, localizedRoute, labRoute]) {
    assert.match(route, /getHomepagePrivateTourItems/);
    assert.match(route, /privateTourItems=\{getHomepagePrivateTourItems\(/);
  }
  for (const route of [defaultRoute, localizedRoute, labRoute]) {
    assert.match(route, /guideChapters=\{getHomepageGuideChapters\(/);
  }

  const faqTrustCopy = {
    en: {
      privateBasis: /Most published routes are private/,
      sharedTransit: /public trains, cruises or transport within attractions/,
      lowerCost: /routes explicitly labelled ‘small group’ have fixed dates/,
      consent: /never move you into a shared group without your agreement/,
    },
    zh: {
      privateBasis: /大多数路线是私家团/,
      sharedTransit: /高铁、游船或景区交通/,
      lowerCost: /明确标为“小团”的路线有固定出发日期/,
      consent: /未经你同意不会把私家团改成拼团/,
    },
    ko: {
      privateBasis: /대부분은 가이드와 차량을 동행 일행만 이용하는 프라이빗 투어/,
      sharedTransit: /열차, 유람선 또는 관광지 내부 교통/,
      lowerCost: /‘소규모 그룹’으로 표시된 일정은 정해진 날짜에/,
      consent: /동의 없이 공동 그룹으로 바꾸지 않습니다/,
    },
  };

  const publishedTourCount = getPublishedPrivateTourCatalog("en").length;

  for (const locale of ["en", "zh", "ko"]) {
    const copy = getHomepageProductShowcaseCopy(locale);
    const homeCopy = getHomegroundCopy(locale);
    assert.ok(copy.title.length > 8);
    assert.ok(copy.intro(publishedTourCount).length >= 18);
    assert.ok(copy.intro(publishedTourCount).length <= 82);
    assert.match(
      copy.countLabel(publishedTourCount),
      new RegExp(String(publishedTourCount)),
    );
    assert.match(copy.durationLabel(5, 4), /5/);
    assert.ok(copy.hubActionLabel.length > 8);
    assert.match(
      copy.title,
      locale === "en" ? /ancient capitals/i : locale === "zh" ? /古都/ : /옛 수도/,
    );
    assert.ok(copy.actionLabel.length > 3);
    assert.equal("trustItems" in copy || "enquiryTitle" in copy, false);
    assert.match(homeCopy.faq.items[0].answer, faqTrustCopy[locale].privateBasis);
    assert.match(homeCopy.faq.items[0].answer, faqTrustCopy[locale].sharedTransit);
    assert.match(homeCopy.faq.items[0].answer, faqTrustCopy[locale].lowerCost);
    assert.match(homeCopy.faq.items[0].answer, faqTrustCopy[locale].consent);
    assert.doesNotMatch(
      homeCopy.faq.items[0].answer,
      /every published tour.*private|所有路线都是私家团|모든 일정은 프라이빗/u,
    );
    assert.equal(homeCopy.faq.items.length, 7);
    const priorityQuestions = homeCopy.faq.items
      .slice(1, 4)
      .map((item) => item.question)
      .join(" ");
    assert.match(
      priorityQuestions,
      locale === "en"
        ? /contact[\s\S]*bookings[\s\S]*limited mobility/i
        : locale === "zh"
          ? /联系[\s\S]*预订[\s\S]*行动不便/
          : /문의[\s\S]*예약[\s\S]*이동이 불편/,
    );
  }

  assert.equal(
    getHomepageProductShowcaseCopy("en").hubActionLabel,
    "Compare every private China tour",
  );
  assert.equal(
    getHomepageProductShowcaseCopy("zh").hubActionLabel,
    "比较全部中国私家团",
  );
  assert.equal(
    getHomepageProductShowcaseCopy("ko").hubActionLabel,
    "중국 프라이빗 투어 전체 비교하기",
  );
  assert.deepEqual(privateTourHubPaths, {
    en: "/tours/",
    zh: "/zh/tours/",
    ko: "/ko/tours/",
  });

  for (const product of privateTourProducts) {
    assert.equal(product.servicePolicy.shoppingStops, false);
    assert.equal(product.servicePolicy.addedServicesRequirePriorAgreement, true);
    const quoteOnly = product.packages.every(
      (tourPackage) => tourPackage.quoteOnly === true,
    );
    if (quoteOnly) {
      assert.match(product.bookingNote.en, /enquiry-only|quote/i);
      assert.match(product.bookingNote.zh, /询价|报价/);
      assert.match(product.bookingNote.ko, /견적/);
    } else {
      assert.match(product.bookingNote.en, /starting prices?/i);
      assert.match(product.bookingNote.zh, /起价/);
      assert.match(product.bookingNote.ko, /시작가/);
    }
    assert.match(product.bookingNote.en, /quote|before payment|written/i);
    assert.match(product.bookingNote.zh, /报价|付款前|核价/);
    assert.match(product.bookingNote.ko, /견적|결제 전|재견적/);
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

  assert.doesNotMatch(page, /decisionNumber|homepage-decisions-title/);
  assert.doesNotMatch(page, /cityIndex|principleNumber/);
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
    /\.hero \{[\s\S]{0,100}padding: 11\.5rem var\(--showcase-gutter\) 2\.75rem/,
  );
  assert.match(
    styles,
    /\.heroCopy \{[\s\S]{0,180}align-items: center[\s\S]{0,180}text-align: center/,
  );
  assert.doesNotMatch(page, /heroAssurance|heroLinks\.map/);
  assert.match(
    page,
    /className=\{`\$\{styles\.heroLead\} \$\{showcaseStyles\.heroLead\}`\}/,
  );
  assert.match(page, /href=\{privateTourHubPaths\[locale\]\}/);
  assert.match(page, /className=\{showcaseStyles\.heroDestinationPrompt\}/);
  assert.doesNotMatch(page, /aria-label=\{showcase\.hero(?:Primary|Secondary)\}/);
  assert.match(
    styles,
    /\.heroTitle \{[\s\S]{0,100}font-family: var\(--hg-editorial\)[\s\S]{0,100}font-weight: 400/,
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

test("homepage guide chapters are parallel, numbered and remain ordinary discoverable links", async () => {
  const [page, finder, finderStyles, pageStyles, showcaseStyles, editorial] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageGuideSearch.tsx"),
    source("components/HomepageGuideSearch.module.css"),
    source("components/HomegroundHomePage.module.css"),
    source("components/HomepageShowcase.module.css"),
    source("lib/homepageEditorial.ts"),
  ]);
  assert.match(page, /guidePaths=\{showcase\.guidePaths\}/);
  assert.match(page, /chapters=\{guideChapters\}/);
  // The owner chose a trip in three numbered chapters (2026-09-25): each opens
  // its topic page and lists that topic's first guides as plain links.
  assert.match(
    finder,
    /<nav className=\{styles\.chapters\} aria-label=\{guidePaths\.listLabel\}>\s*<ol>[\s\S]*?<li className=\{styles\.chapter\} key=\{chapter\.id\}>/,
  );
  assert.match(finder, /const topicHref = getHomepageGuidePath\(locale, chapter\.id\);/);
  assert.match(finder, /<Link href=\{topicHref\}>\s*\{path\.title\}/);
  assert.match(finder, /<Link href=\{guide\.href\} onClick=\{\(\) => onGuideClick\?\.\(guide\)\}>\s*<span>\{guide\.title\}<\/span>/);
  assert.match(finder, /String\(index \+ 1\)\.padStart\(2, "0"\)/);
  // The photo repeats the chapter link, so it is hidden from assistive tech and the tab order.
  assert.match(finder, /<Link\s+aria-hidden="true"\s+className=\{styles\.chapterPhoto\}\s+href=\{topicHref\}\s+tabIndex=\{-1\}/);
  assert.match(finder, /alt=""/);
  assert.match(editorial, /homepageGuideChapterOrder[^=]*= \[\s*"plan",\s*"transport",\s*"stay",\s*\]/);
  assert.match(editorial, /guides: inChapter\.slice\(0, 3\)/);
  // Photos keep their own 16:10; phones swipe the chapters.
  assert.match(finderStyles, /\.chapterPhoto \{\s*aspect-ratio: 16 \/ 10;/);
  assert.match(finderStyles, /\.chapters ol \{[\s\S]{0,160}grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(finderStyles, /@media \(max-width: 63\.999rem\)[\s\S]*?\.chapters ol \{[\s\S]{0,260}scroll-snap-type: x mandatory;/);
  assert.doesNotMatch(finderStyles, /\.(?:finder|formArea)\s*\{[^}]*overflow:\s*hidden/);
  assert.doesNotMatch(pageStyles, /\.travelGuides(?:Section)?\s*\{[^}]*overflow:\s*hidden/);
  assert.doesNotMatch(showcaseStyles, /\.searchSection\s*\{[^}]*overflow:\s*hidden/);
  assert.doesNotMatch(finder, /<Link[^>]*aria-label=/);
  assert.doesNotMatch(finder, /\{item\.body\}|guidePaths\.prompt/);
});
