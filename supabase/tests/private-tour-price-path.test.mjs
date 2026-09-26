import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import vm from "node:vm";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parse } from "parse5";
import ts from "typescript";
import * as inquiry from "../../lib/privateTourInquiryContext.ts";
import { getPrivateTourStartingPrice } from "../../lib/privateTourStartingPrice.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";
import { getHomepagePrivateTourItems } from "../../lib/homepagePrivateTourCatalog.ts";
import { getHomepageProductShowcaseCopy } from "../../lib/homepageProductShowcaseI18n.ts";
import { privateTourHubPaths } from "../../lib/privateTourHubI18n.ts";
import * as cardImages from "../../components/privateTourCardImages.ts";
import { privateTourProducts, localizePrivateTourProduct, formatPrivateTourPrice } from "../../lib/privateTourProducts.ts";
import { privateTourLongHaulSlugs } from "../../lib/privateTourLongHaulProducts.ts";
import { tourContactCopy, tourWhatsAppHref } from "../../lib/tourContact.ts";
import { isJiangnanTour } from "../../lib/tourContactDraft.ts";

const locales = ["en", "zh", "ko"];
const beijingSlug = "beijing-highlights-5-day-private-tour";
const require = createRequire(import.meta.url);
const readSource = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const classicPricing = JSON.parse(await readSource("content/product-previews/zhangjiajie-4-day-private-tour/pricing.json"));
const normalize = (value) => JSON.parse(JSON.stringify(value));
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const nodes = (node) => [node, ...(node.childNodes ?? []).flatMap(nodes)];
const text = (node) => node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(text).join("");

async function loadComponent(path, overrides = {}, window) {
  const code = ts.transpileModule(await readSource(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  const modules = {
    react: React,
    "react/jsx-runtime": require("react/jsx-runtime"),
    "../lib/privateTourInquiryContext": inquiry,
    "../lib/tourContactDraft": { isJiangnanTour },
    "../lib/analytics": { trackEvent() {} },
    "./GuideCtaLink": { GuideCtaLink: ({ href, children }) => React.createElement("a", { href }, children) },
    "./JapaneseJiangnanInteraction": { JapaneseTourContactLink: ({ hrefs, channel = "whatsapp", children }) => React.createElement("a", { href: hrefs[channel][2] }, children) },
    "./TourWhatsAppLink": { TourWhatsAppLink: ({ locale, slug }) => {
      const selected = overrides["./PrivateTourSelection"]?.usePrivateTourSelection();
      const context = inquiry.getPrivateTourInquiryContext(slug, locale, selected?.slug === slug ? selected.selection : undefined);
      return React.createElement("a", { href: tourWhatsAppHref(locale, context) }, tourContactCopy[locale].alternative);
    } },
    "lucide-react": { ArrowRight: () => null },
    "next/image": () => null,
    "next/link": ({ children, href, ...props }) => React.createElement("a", { ...props, href }, children),
    ...overrides,
  };
  vm.runInNewContext(code, {
    module, exports: module.exports, window, URL, URLSearchParams,
    require(id) {
      if (id.endsWith(".module.css")) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
      if (!(id in modules)) throw new Error(`Unexpected component dependency: ${id}`);
      return modules[id];
    },
  }, { filename: path });
  return module.exports;
}

test("all three-language catalog price links land on the exact lowest published service/group row", () => {
  for (const locale of locales) {
    const catalog = getPublishedPrivateTourCatalog(locale);
    for (const product of privateTourProducts) {
      const localized = localizePrivateTourProduct(product, locale);
      const starting = getPrivateTourStartingPrice(localized);
      const item = catalog.find((candidate) => candidate.slug === product.slug);
      const url = new URL(item.startingPriceHref, "https://homegroundchina.com");
      if (!starting) {
        assert.equal(item.startingPrice, null);
        assert.equal(item.startingPriceHref, localized.path);
        assert.equal(url.pathname, localized.path);
        assert.equal(url.search, "");
        continue;
      }
      const selection = inquiry.getPrivateTourDetailSelectionFromSearchParams(product.slug, url.searchParams);
      assert.deepEqual(selection, starting.selection);
      assert.equal(url.pathname, localized.path);
      assert.equal(item.href, localized.path, "canonical catalog paths stay query-free");
      assert.equal(item.startingPrice.formatted, starting.formatted);
      assert.equal(item.startingPrice.serviceLabel, localized.packages.find((p) => p.id === selection.packageId).label);
      const row = product.packages.find((p) => p.id === selection.packageId).prices.find((p) => p.travelers === selection.travelers);
      assert.equal(item.startingPrice.cny, row.cnyPerPerson);
      assert.equal(
        product.packages
          .find((option) => option.id === selection.packageId)
          .prices.some((row) => row.travelers === selection.travelers),
        true,
      );
    }
    for (const item of getHomepagePrivateTourItems(locale)) {
      const published = catalog.find((candidate) => candidate.slug === item.id);
      if (item.id === "zhangjiajie-forest-4-day-private-tour") {
        const selection = { packageId: "fixed-route-english-guided", travelers: 4 };
        assert.equal(item.href, inquiry.buildPrivateTourDetailHref(published.href, item.id, selection));
        assert.equal(item.startingPrice.travelers, 4);
        assert.equal(item.startingPrice.formatted, { en: "USD\u00a0385", zh: "¥2,502", ko: "₩540,000" }[locale]);
        assert.equal(item.startingPrice.serviceLabel, published.startingPrice.serviceLabel);
        assert.equal(published.startingPrice.travelers, 6, "catalog uses the lowest published per-person tier and states its group basis");
        assert.equal(published.startingPrice.formatted, { en: "USD\u00a0360", zh: "¥2,302", ko: "₩500,000" }[locale]);
        continue;
      }
      assert.equal(item.href, published.startingPriceHref);
      assert.equal(item.startingPrice.serviceLabel, published.startingPrice.serviceLabel);
      assert.equal(item.startingPrice.formatted, published.startingPrice.formatted);
    }
    const legacy = catalog.find((p) => p.source === "zhangjiajie-tour");
    assert.equal(legacy.startingPrice.formatted, formatPrivateTourPrice(classicPricing.tiers[0].six_person_price_per_person, locale).formatted, "classic catalog and detail pricing stay in sync");
    assert.equal(legacy.startingPrice.travelers, 6);
    assert.equal(legacy.startingPriceHref, legacy.href);
    assert.equal(legacy.startingPrice.selection, undefined, "the detail card links to the tier choices");
    assert.ok(legacy.startingPrice.serviceLabel.length > 0);
  }
});

test("every published service/group survives detail links, language changes and the existing consultation parser", () => {
  for (const product of privateTourProducts) {
    for (const option of product.packages) {
      for (const row of option.prices) {
        const selection = { packageId: option.id, travelers: row.travelers };
        for (const locale of locales) {
          const localized = localizePrivateTourProduct(product, locale);
          const detailHref = inquiry.buildPrivateTourDetailHref(`${localized.path}?utm_source=homepage#price`, product.slug, selection);
          const url = new URL(detailHref, "https://homegroundchina.com");
          assert.equal(url.searchParams.get("utm_source"), "homepage");
          assert.equal(url.hash, "#price");
          const restored = inquiry.getPrivateTourDetailSelectionFromSearchParams(product.slug, url.searchParams);
          assert.deepEqual(restored, selection);
          const href = inquiry.buildPrivateTourInquiryHref(locale === "en" ? "/" : `/${locale}/`, product.slug, "private_tour_product", restored);
          const context = inquiry.getPrivateTourInquiryContextFromSearchParams(new URL(href, "https://homegroundchina.com").searchParams, locale);
          assert.deepEqual(context.selection, selection);
          assert.ok(decodeURIComponent(inquiry.buildPrivateTourMailtoHref("test@example.invalid", locale, context)).includes(inquiry.privateTourInquirySelectionLabel(context, locale)));
        }
      }
    }
  }
  const beijing = privateTourProducts.find((p) => p.slug === beijingSlug);
  assert.deepEqual(beijing.packages.map((p) => [p.id, p.prices.map((r) => r.cnyPerPerson)]), [
    ["english-guided", [5453, 4348, 4148]], ["no-guide", [4973, 3974, 3774]],
  ]);
});

test("six-traveller prices are exactly CNY 200 per person below each published four-traveller tier", () => {
  let sixPersonPackages = 0;
  // Long-haul routes publish USD tiers (for example USD 3,390 / 3,190) set as
  // market targets; their CNY basis is derived from USD rather than this rule.
  const longHaulSlugs = new Set(privateTourLongHaulSlugs);
  for (const product of privateTourProducts.filter((candidate) => !longHaulSlugs.has(candidate.slug))) for (const tourPackage of product.packages) {
    const four = tourPackage.prices.find((row) => row.travelers === 4);
    if (!four) continue;
    const six = tourPackage.prices.find((row) => row.travelers === 6);
    assert.ok(six, `${product.slug}:${tourPackage.id} needs a six-person tier`);
    assert.equal(six.cnyPerPerson, four.cnyPerPerson - 200, `${product.slug}:${tourPackage.id}`);
    sixPersonPackages += 1;
  }
  assert.equal(sixPersonPackages, 19);
});

test("owner-approved USD prices survive localization without USD10 rounding", () => {
  const cases = [
    [beijingSlug, "english-guided", [839, 669], [5453, 4348], [1180000, 940000]],
    ["guilin-yangshuo-5-day-private-tour", "standard-guided", [769, 629], [4998, 4088], [1080000, 880000]],
    ["zhangjiajie-forest-4-day-private-tour", "fixed-route-english-guided", [449, 385], [2918, 2502], [630000, 540000]],
    ["shanghai-suzhou-hangzhou-6-day-private-tour", "standard-guided", [1144, 834], [7436, 5421], [1600000, 1170000]],
    ["chengdu-pandas-sanxingdui-5-day-private-tour", "standard-guided", [949, 759], [6168, 4933], [1330000, 1070000]],
    ["xian-terracotta-warriors-5-day-private-tour", "standard-guided", [598, 468], [3887, 3042], [840000, 660000]],
    ["chongqing-wulong-5-day-private-tour", "standard-guided", [699, 509], [4543, 3308], [980000, 720000]],
    ["harbin-winter-5-day-private-tour", "standard-guided-winter", [1459, 1180], [9483, 7670], [2040000, 1650000]],
    ["shanghai-suzhou-5-day-private-tour", "standard-guided", [769, 649], [4998, 4218], [1080000, 910000]],
  ];
  for (const [slug, packageId, usd, cny, krw] of cases) {
    const product = privateTourProducts.find((p) => p.slug === slug);
    for (const [locale, expected] of [["en", usd], ["zh", cny], ["ko", krw]]) {
      const localized = localizePrivateTourProduct(product, locale);
      const rows = localized.packages.find((p) => p.id === packageId).rows;
      assert.deepEqual(rows.map((row) => row.travelers), [2, 4, 6]);
      assert.deepEqual(rows.slice(0, 2).map((row) => row.amount), expected, `${slug}:${locale} existing tiers`);
      assert.equal(rows[2].cny, cny[1] - 200);
      assert.equal(rows[2].amount, formatPrivateTourPrice(cny[1] - 200, locale).amount, `${slug}:${locale} six-person price`);
    }
  }
  const beijing = localizePrivateTourProduct(privateTourProducts.find((p) => p.slug === beijingSlug), "en");
  assert.deepEqual(beijing.packages.find((p) => p.id === "no-guide").rows.map((row) => row.amount), [770, 620, 590]);
  assert.equal(getPrivateTourStartingPrice(beijing).selection.packageId, "no-guide");
  const guilin = getPublishedPrivateTourCatalog("en").find((p) => p.slug === cases[1][0]);
  assert.equal(guilin.startingPrice.amount, 600);
  assert.equal(getHomepagePrivateTourItems("en").find((p) => p.id === cases[1][0]).startingPrice.formatted, "USD\u00a0600");
});

test("source-currency product prices remain exact in every locale", () => {
  const publishedTiers = privateTourProducts.flatMap((product) =>
    product.packages.flatMap((tourPackage) =>
      tourPackage.prices
        .filter((tier) => tier.publishedPrice)
        .map((tier) => ({
          slug: product.slug,
          packageId: tourPackage.id,
          travelers: tier.travelers,
          publishedPrice: tier.publishedPrice,
        })),
    ),
  );

  assert.equal(publishedTiers.length, 17);
  for (const locale of locales) {
    for (const expected of publishedTiers) {
      const localized = localizePrivateTourProduct(
        privateTourProducts.find((product) => product.slug === expected.slug),
        locale,
      );
      const row = localized.packages
        .find((tourPackage) => tourPackage.id === expected.packageId)
        .rows.find((candidate) => candidate.travelers === expected.travelers);
      assert.equal(row.currency, expected.publishedPrice.currency, `${expected.slug}:${locale}`);
      assert.equal(row.amount, expected.publishedPrice.amountPerPerson, `${expected.slug}:${locale}`);
    }
  }
});

test("explicit USD prices retain conversion and display validation", () => {
  for (const invalid of [0, -1, NaN, Infinity, 839.5, 838]) {
    assert.throws(() => formatPrivateTourPrice(5453, "en", invalid), RangeError);
    assert.throws(() => formatPrivateTourPrice(5453, "zh", invalid), RangeError);
  }
  assert.equal(formatPrivateTourPrice(5453, "en", 839).formatted, "USD\u00a0839");
  assert.equal(formatPrivateTourPrice(5453, "en").amount, 840, "default conversion for other products is unchanged");
});

test("detail parameters reject duplicates, incomplete and cross-product choices", () => {
  for (const query of ["", "package=no-guide", "travelers=4", "package=no-guide&travelers=3", "package=no-guide&travelers=04", "package=no-guide&travelers=2&travelers=4", "package=no-guide&package=english-guided&travelers=2", "package=free-upgrade&travelers=2"]) {
    assert.equal(inquiry.getPrivateTourDetailSelectionFromSearchParams(beijingSlug, new URLSearchParams(query)), null, query);
  }
  assert.equal(inquiry.getPrivateTourDetailSelectionFromSearchParams("chengdu-pandas-sanxingdui-5-day-private-tour", new URLSearchParams("package=no-guide&travelers=2")), null);
  assert.throws(() => inquiry.buildPrivateTourDetailHref("/tours/invalid/", beijingSlug, { packageId: "free-upgrade", travelers: 2 }));
});

test("server-rendered homepage labels and detail price controls share the starting selection in every language", async () => {
  const selection = await loadComponent("components/PrivateTourSelection.tsx");
  const priceScope = await loadComponent("components/TourPriceScope.tsx");
  const interactive = await loadComponent("components/ShanghaiJiangnanImagineInteractive.tsx", {
    "./PrivateTourSelection": selection,
    "./TourPriceScope": priceScope,
  });
  const keepWords = await loadComponent("components/text/KeepWords.tsx");
  // The real price reveal, so the rendered text is checked as shipped; the
  // heading reveal and pointer light only decorate and are stubbed.
  const charReveal = await loadComponent("components/motion/CharReveal.tsx");
  const homepage = await loadComponent("components/HomepageProductShowcase.tsx", {
    "../lib/homepageProductShowcaseI18n": { getHomepageProductShowcaseCopy },
    "../lib/privateTourHubI18n": { privateTourHubPaths },
    "./privateTourCardImages": cardImages,
    "./text/KeepWords": keepWords,
    "./motion/CharReveal": charReveal,
    "lucide-react": { ArrowRight: () => null },
  });
  for (const locale of locales) {
    const products = getHomepagePrivateTourItems(locale);
    assert.equal(products[0].id, "zhangjiajie-forest-4-day-private-tour");
    const homepageDom = parse(renderToStaticMarkup(React.createElement(homepage.HomepageProductShowcase, { locale, products })));
    for (const item of products) {
      const link = nodes(homepageDom).find((node) => node.tagName === "a" && attr(node, "href") === item.href);
      assert.ok(link);
      assert.ok(text(link).includes(item.startingPrice.serviceLabel), `${locale}:${item.id} service basis is server-rendered`);
      assert.ok(text(link).includes(item.startingPrice.formatted));
      assert.ok(text(link).includes(getHomepageProductShowcaseCopy(locale).groupBasis(item.startingPrice.travelers)), `${locale}:${item.id} group basis stays beside the promoted price`);
      if (item.id === "zhangjiajie-forest-4-day-private-tour") {
        const image = nodes(link).find((node) => node.tagName === "img");
        assert.ok(image);
        assert.match(attr(image, "src"), /zhangjiajie-forest-4-day-private-tour-/);
        assert.match(attr(image, "srcset"), /zhangjiajie-forest-4-day-private-tour-/);
      }
    }
    const product = localizePrivateTourProduct(privateTourProducts.find((p) => p.slug === beijingSlug), locale);
    const starting = getPrivateTourStartingPrice(product);
    const inquiryHref = inquiry.buildPrivateTourInquiryHref(locale === "en" ? "/" : `/${locale}/`, beijingSlug, "private_tour_product");
    const html = renderToStaticMarkup(React.createElement(selection.PrivateTourSelectionProvider, { slug: beijingSlug, initialSelection: starting.selection }, React.createElement(interactive.ShanghaiJiangnanPriceConsole, { product, inquiryHref })));
    const detailNodes = nodes(parse(html));
    const selectedService = detailNodes.find((node) => node.tagName === "button" && attr(node, "aria-pressed") === "true" && text(node) === starting.serviceLabel);
    assert.ok(selectedService, `${locale}: the initial service is the displayed card basis`);
    assert.ok(detailNodes.some((node) => attr(node, "class") === "priceResult" && text(node).includes(starting.formatted)));
    let inquiryLinks = 0;
    let whatsappLinks = 0;
    for (const link of detailNodes.filter((node) => node.tagName === "a")) {
      if (attr(link, "href") === "#tour-price-details") continue;
      const url = new URL(attr(link, "href"), "https://homegroundchina.com");
      if (url.origin === "https://wa.me") {
        const context = inquiry.getPrivateTourInquiryContext(beijingSlug, locale, starting.selection);
        assert.ok(url.searchParams.get("text").includes(inquiry.privateTourInquirySelectionLabel(context, locale)));
        assert.ok(url.searchParams.get("text").includes(context.name));
        whatsappLinks += 1;
      } else {
        assert.deepEqual(inquiry.getPrivateTourInquiryContextFromSearchParams(url.searchParams, locale).selection, starting.selection);
        inquiryLinks += 1;
      }
    }
    assert.ok(inquiryLinks >= 2, "both existing inquiry actions must retain the starting selection");
    assert.equal(whatsappLinks, 1, "the mocked secondary contact remains a real contextual link");
  }
});

test("Jiangnan comparison preserves the selected party and the other-size quote stays unpriced", async () => {
  const selection = await loadComponent("components/PrivateTourSelection.tsx");
  const comparison = await loadComponent("components/JiangnanTourComparison.tsx", { "./PrivateTourSelection": selection });
  const priceScope = await loadComponent("components/TourPriceScope.tsx");
  const interactive = await loadComponent("components/ShanghaiJiangnanImagineInteractive.tsx", {
    "./PrivateTourSelection": selection, "./TourPriceScope": priceScope,
  });
  const tours = ["shanghai-suzhou-5-day-private-tour", "shanghai-suzhou-hangzhou-6-day-private-tour"];
  for (const locale of locales) for (const origin of tours) for (const travelers of [2, 4, 6]) {
    const target = tours.find(candidate => candidate !== origin);
    const chosen = inquiry.getPrivateTourInquirySelection(origin, "standard-guided", travelers);
    const prefix = locale === "en" ? "" : `/${locale}`;
    const product = localizePrivateTourProduct(privateTourProducts.find(candidate => candidate.slug === origin), locale);
    const inquiryHref = inquiry.buildPrivateTourInquiryHref(`${prefix}/`, origin, "private_tour_product");
    const html = renderToStaticMarkup(React.createElement(selection.PrivateTourSelectionProvider, { slug: origin, initialSelection: chosen },
      React.createElement(React.Fragment, null,
        React.createElement(comparison.JiangnanTourComparison, { locale, currentSlug: origin }),
        React.createElement(interactive.ShanghaiJiangnanPriceConsole, { product, inquiryHref }),
      ),
    ));
    const links = nodes(parse(html)).filter(node => node.tagName === "a").map(node => attr(node, "href"));
    const targetUrl = links.map(href => new URL(href, "https://homegroundchina.com")).find(url => url.pathname === `${prefix}/tours/${target}/`);
    assert.equal(inquiry.getPrivateTourDetailSelectionFromSearchParams(target, targetUrl.searchParams)?.travelers, travelers);
    const quoteLinks = links.map(href => new URL(href, "https://homegroundchina.com")).filter(url => url.searchParams.get("tour") === origin);
    assert.equal(quoteLinks.length, 2);
    assert.equal(quoteLinks.filter(url => inquiry.getPrivateTourInquiryContextFromSearchParams(url.searchParams, locale)?.selection?.travelers === travelers).length, 1);
    assert.equal(quoteLinks.filter(url => inquiry.getPrivateTourInquiryContextFromSearchParams(url.searchParams, locale)?.selection === undefined).length, 1);
  }
});

test("hydration and history restore validated selection without recording a user change; controls update URLs and consultations", async () => {
  let address = new URL(`https://homegroundchina.com/zh/tours/${beijingSlug}/?package=english-guided&travelers=4#price`);
  const listeners = new Map();
  const window = {
    get location() { return address; },
    history: { state: { preserved: true }, replaceState(state, _, href) { assert.deepEqual(state, { preserved: true }); address = new URL(href, address); } },
    addEventListener(name, callback) { listeners.set(name, callback); },
    removeEventListener(name, callback) { if (listeners.get(name) === callback) listeners.delete(name); },
  };
  const slots = []; let index = 0; const effects = []; const tracked = [];
  const react = {
    createContext(value) { const context = { value }; context.Provider = { context }; return context; },
    useContext(context) { return context.value; },
    useState(initial) { const slot = index++; if (!(slot in slots)) slots[slot] = typeof initial === "function" ? initial() : initial; return [slots[slot], (next) => { slots[slot] = typeof next === "function" ? next(slots[slot]) : next; }]; },
    useEffect(effect) { effects.push(effect); },
  };
  const jsx = (type, props) => { if (type.context) type.context.value = props.value; return { type, props }; };
  const module = await loadComponent("components/PrivateTourSelection.tsx", {
    react, "react/jsx-runtime": { jsx, jsxs: jsx }, "../lib/analytics": { trackEvent: (...args) => tracked.push(args) },
  }, window);
  const initialSelection = { packageId: "no-guide", travelers: 2 };
  const render = () => { index = 0; effects.length = 0; return module.PrivateTourSelectionProvider({ slug: beijingSlug, initialSelection, children: null }).props.value; };
  assert.deepEqual(normalize(render().selection), initialSelection, "server/default render uses the card basis");
  const cleanup = effects[0]();
  assert.deepEqual(normalize(render().selection), { packageId: "english-guided", travelers: 4 });
  assert.equal(tracked.length, 0);
  render().setSelection({ packageId: "no-guide", travelers: 4 });
  const current = render();
  assert.deepEqual(normalize(current.selection), { packageId: "no-guide", travelers: 4 });
  assert.equal(address.search, "?package=no-guide&travelers=4"); assert.equal(address.hash, "#price");
  assert.equal(tracked.length, 1);
  current.setSelection({ packageId: "no-guide", travelers: 4 });
  assert.equal(tracked.length, 1, "same selection is not a change");
  const href = module.useSelectedPrivateTourInquiryHref(inquiry.buildPrivateTourInquiryHref("/zh/", beijingSlug, "private_tour_product"));
  assert.deepEqual(inquiry.getPrivateTourInquiryContextFromSearchParams(new URL(href, address).searchParams, "zh").selection, { packageId: "no-guide", travelers: 4 });
  address = new URL(`https://homegroundchina.com/zh/tours/${beijingSlug}/?package=no-guide&travelers=04`);
  listeners.get("popstate")();
  assert.deepEqual(normalize(render().selection), initialSelection);
  assert.equal(tracked.length, 1, "history synchronization is not a user selection event");
  cleanup(); assert.equal(listeners.size, 0);
});
