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
    "../lib/analytics": { trackEvent() {} },
    "./GuideCtaLink": { GuideCtaLink: ({ href, children }) => React.createElement("a", { href }, children) },
    "lucide-react": { ArrowRight: () => null },
    "next/image": () => null,
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

test("all three-language catalog price links land on the exact published service and two-person row", () => {
  for (const locale of locales) {
    const catalog = getPublishedPrivateTourCatalog(locale);
    for (const product of privateTourProducts) {
      const localized = localizePrivateTourProduct(product, locale);
      const starting = getPrivateTourStartingPrice(localized);
      const item = catalog.find((candidate) => candidate.slug === product.slug);
      const url = new URL(item.startingPriceHref, "https://homegroundchina.com");
      const selection = inquiry.getPrivateTourDetailSelectionFromSearchParams(product.slug, url.searchParams);
      assert.deepEqual(selection, starting.selection);
      assert.equal(url.pathname, localized.path);
      assert.equal(item.href, localized.path, "canonical catalog paths stay query-free");
      assert.equal(item.startingPrice.formatted, starting.formatted);
      assert.equal(item.startingPrice.serviceLabel, localized.packages.find((p) => p.id === selection.packageId).label);
      const row = product.packages.find((p) => p.id === selection.packageId).prices.find((p) => p.travelers === selection.travelers);
      assert.equal(item.startingPrice.cny, row.cnyPerPerson);
      assert.equal(selection.travelers, 2);
    }
    for (const item of getHomepagePrivateTourItems(locale)) {
      const published = catalog.find((candidate) => candidate.slug === item.id);
      assert.equal(item.href, published.startingPriceHref);
      assert.equal(item.startingPrice.serviceLabel, published.startingPrice.serviceLabel);
      assert.equal(item.startingPrice.formatted, published.startingPrice.formatted);
    }
    const legacy = catalog.find((p) => p.source === "zhangjiajie-tour");
    assert.equal(legacy.startingPrice.formatted, formatPrivateTourPrice(classicPricing.tiers[0].from_price_per_person, locale).formatted, "classic catalog and detail pricing stay in sync");
    assert.equal(legacy.startingPriceHref, legacy.href);
    assert.equal(legacy.startingPrice.selection, undefined, "do not invent a package for the fixed legacy contract");
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
    ["english-guided", [5453, 4348]], ["no-guide", [4973, 3974]],
  ]);
});

test("owner-approved USD prices survive localization without USD10 rounding", () => {
  const cases = [
    [beijingSlug, "english-guided", [839, 669], [5453, 4348], [1180000, 940000]],
    ["guilin-yangshuo-5-day-private-tour", "standard-guided", [769, 629], [4998, 4088], [1080000, 880000]],
    ["zhangjiajie-forest-4-day-private-tour", "fixed-route-english-guided", [449, 385], [2918, 2502], [630000, 540000]],
  ];
  for (const [slug, packageId, usd, cny, krw] of cases) {
    const product = privateTourProducts.find((p) => p.slug === slug);
    for (const [locale, expected] of [["en", usd], ["zh", cny], ["ko", krw]]) {
      const localized = localizePrivateTourProduct(product, locale);
      const rows = localized.packages.find((p) => p.id === packageId).rows;
      assert.deepEqual(rows.map((row) => row.travelers), [2, 4]);
      assert.deepEqual(rows.map((row) => row.amount), expected, `${slug}:${locale}`);
    }
  }
  const beijing = localizePrivateTourProduct(privateTourProducts.find((p) => p.slug === beijingSlug), "en");
  assert.deepEqual(beijing.packages.find((p) => p.id === "no-guide").rows.map((row) => row.amount), [770, 620]);
  assert.equal(getPrivateTourStartingPrice(beijing).selection.packageId, "no-guide");
  const guilin = getPublishedPrivateTourCatalog("en").find((p) => p.slug === cases[1][0]);
  assert.equal(guilin.startingPrice.amount, 769);
  assert.equal(getHomepagePrivateTourItems("en").find((p) => p.id === cases[1][0]).startingPrice.formatted, "USD\u00a0769");
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
  const interactive = await loadComponent("components/ShanghaiJiangnanImagineInteractive.tsx", { "./PrivateTourSelection": selection });
  const homepage = await loadComponent("components/HomepageProductShowcase.tsx", {
    "../lib/homepageProductShowcaseI18n": { getHomepageProductShowcaseCopy },
    "../lib/privateTourHubI18n": { privateTourHubPaths },
    "./privateTourCardImages": cardImages,
  });
  for (const locale of locales) {
    const products = getHomepagePrivateTourItems(locale);
    const homepageDom = parse(renderToStaticMarkup(React.createElement(homepage.HomepageProductShowcase, { locale, products, plannerHref: "/#planner-contact" })));
    for (const item of products) {
      const link = nodes(homepageDom).find((node) => node.tagName === "a" && attr(node, "href") === item.href);
      assert.ok(link);
      assert.ok(text(link).includes(item.startingPrice.serviceLabel), `${locale}:${item.id} service basis is server-rendered`);
      assert.ok(text(link).includes(item.startingPrice.formatted));
    }
    const product = localizePrivateTourProduct(privateTourProducts.find((p) => p.slug === beijingSlug), locale);
    const starting = getPrivateTourStartingPrice(product);
    const inquiryHref = inquiry.buildPrivateTourInquiryHref(locale === "en" ? "/" : `/${locale}/`, beijingSlug, "private_tour_product");
    const html = renderToStaticMarkup(React.createElement(selection.PrivateTourSelectionProvider, { slug: beijingSlug, initialSelection: starting.selection }, React.createElement(interactive.ShanghaiJiangnanPriceConsole, { product, inquiryHref })));
    const detailNodes = nodes(parse(html));
    const selectedService = detailNodes.find((node) => node.tagName === "button" && attr(node, "aria-pressed") === "true" && text(node) === starting.serviceLabel);
    assert.ok(selectedService, `${locale}: the initial service is the displayed card basis`);
    assert.ok(detailNodes.some((node) => attr(node, "class") === "priceResult" && text(node).includes(starting.formatted)));
    for (const link of detailNodes.filter((node) => node.tagName === "a")) {
      assert.deepEqual(inquiry.getPrivateTourInquiryContextFromSearchParams(new URL(attr(link, "href"), "https://homegroundchina.com").searchParams, locale).selection, starting.selection);
    }
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
