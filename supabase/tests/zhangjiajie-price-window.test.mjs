import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import vm from "node:vm";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parse } from "parse5";
import ts from "typescript";
import { formatPrivateTourPrice } from "../../lib/privateTourProducts.ts";

const require = createRequire(import.meta.url);
const readSource = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const pricingPath = "content/product-previews/zhangjiajie-4-day-private-tour/pricing.json";
const approved = JSON.parse(await readSource(pricingPath));
const product = JSON.parse(await readSource("content/product-previews/zhangjiajie-4-day-private-tour/product.json"));
const componentPath = "components/ZhangjiajiePrivateTourPriceWindow.tsx";

async function loadModule(path, modules, globals = {}) {
  const code = ts.transpileModule(await readSource(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, ...globals,
    require(id) {
      if (id.endsWith(".module.css")) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
      if (!(id in modules)) throw new Error(`Unexpected dependency: ${id}`);
      return modules[id];
    },
  }, { filename: path });
  return module.exports;
}

const preview = await loadModule("lib/zhangjiajiePrivateTourPreview.ts", {
  "../content/product-previews/zhangjiajie-4-day-private-tour/product.json": product,
  "../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json": approved,
  "./privateTourProducts": { formatPrivateTourPrice },
});
const jsx = require("react/jsx-runtime");
const { ZhangjiajiePrivateTourPriceWindow } = await loadModule(componentPath, { react: React, "react/jsx-runtime": jsx });
const props = (locale = "en", variant = "full") => ({
  locale, variant, copy: preview.productPreviewCopy[locale], pricing: preview.getZhangjiajiePrivateTourPublicPricing(locale),
});
const nodes = (node) => [node, ...(node.childNodes ?? []).flatMap(nodes)];
const textOf = (html) => nodes(parse(html)).filter((node) => node.nodeName === "#text").map((node) => node.value).join("");

test("the September owner-approved classic prices retain exact USD values and synchronized product metadata", () => {
  assert.equal(approved.approved_decision_id, "approved-public-pricing-20260906");
  assert.equal(product.price_display.approved_decision_id, approved.approved_decision_id);
  assert.equal(product.price_display.from_price_per_person, 3445);
  assert.equal(product.price_display.valid_until, approved.valid_until);
  assert.equal(approved.valid_from, "2026-09-06");
  assert.deepEqual(approved.basis.same_rate_adult_group_sizes, [2, 3, 4]);
  assert.equal(approved.basis.automatic_group_discount, false);

  const cnyPrices = approved.tiers.map((tier) => tier.from_price_per_person ?? tier.price_per_person);
  assert.deepEqual(cnyPrices, [3445, 4160, 5200]);
  assert.deepEqual(cnyPrices.map((cny) => formatPrivateTourPrice(cny, "en").amount), [530, 640, 800]);
  assert.deepEqual(cnyPrices.map((cny) => formatPrivateTourPrice(cny, "ko").amount), [750000, 900000, 1120000]);
  assert.deepEqual(
    Array.from(preview.getZhangjiajiePrivateTourPublicPricing("en").tiers, (tier) => tier.formattedPrice),
    ["USD\u00a0530", "USD\u00a0640", "USD\u00a0800"],
  );
  assert.equal(approved.tiers[0].regular_price_per_person, 3640);
  assert.equal(preview.getZhangjiajiePrivateTourPublicPricing("en").tiers[0].formattedRegularPrice, "USD\u00a0560");
});

test("static HTML contains dated, localized reference prices and the approved group/stay basis", () => {
  assert.equal(approved.currency, "CNY");
  assert.equal(approved.basis.standard_rooming, "two_adults_sharing_one_room");
  assert.equal(approved.basis.minimum_adults, 2);
  for (const locale of ["en", "zh", "ko"]) {
    const input = props(locale);
    for (const variant of ["full", "summary"]) {
      const html = renderToStaticMarkup(React.createElement(ZhangjiajiePrivateTourPriceWindow, { ...input, variant }));
      const text = textOf(html);
      assert.ok(text.includes(input.copy.checkingPrice));
      assert.ok(text.includes(input.pricing.referenceNote));
      assert.ok(text.includes(input.pricing.basisLabel));
      assert.ok(text.includes(input.pricing.guideLanguageNote));
      assert.ok(text.includes(input.pricing.timeZoneLabel));
      assert.ok(text.includes(input.pricing.tiers[0].name));
      assert.match(html, /dateTime="2026-09-06T00:00:00\+08:00"/);
      assert.match(html, /dateTime="2026-09-30T23:59:59\+08:00"/);
      assert.doesNotMatch(text, /Checking the current price window|正在核对当前价格|현재 가격 적용 기간을 확인/);
      const tiers = variant === "full" ? approved.tiers : [approved.tiers[0]];
      for (const tier of tiers) {
        const cny = tier.from_price_per_person ?? tier.price_per_person;
        assert.ok(text.includes(formatPrivateTourPrice(cny, locale).formatted));
      }
      if (variant === "full") assert.ok(text.includes(formatPrivateTourPrice(3640, locale).formatted));
    }
  }
});

async function mountAt(now, variant = "full") {
  let state;
  let effect;
  let timer;
  let cleared = false;
  const clock = { now };
  const { ZhangjiajiePrivateTourPriceWindow: Component } = await loadModule(componentPath, {
    "react/jsx-runtime": jsx,
    react: {
      useState: (initial) => [state ?? initial, (next) => { state = next; }],
      useEffect: (callback) => { effect = callback; },
    },
  }, {
    Date: class extends Date { static now() { return clock.now; } },
    setTimeout: (callback, delay) => { timer = { callback, delay }; return 1; },
    clearTimeout: () => { cleared = true; },
  });
  const render = () => textOf(renderToStaticMarkup(React.createElement(Component, props("en", variant))));
  const initial = render();
  const cleanup = effect();
  return { initial, render, clock, cleanup, get timer() { return timer; }, get cleared() { return cleared; } };
}

test("hydration preserves the inclusive China-time price window and removes old amounts outside it", async () => {
  const starts = Date.parse(`${approved.valid_from}T00:00:00+08:00`);
  const ends = Date.parse(approved.valid_until);
  for (const variant of ["full", "summary"]) {
    for (const [now, current] of [[starts - 1, false], [starts, true], [ends, true], [ends + 1, false]]) {
      const mounted = await mountAt(now, variant);
      assert.ok(mounted.initial.includes(preview.productPreviewCopy.en.checkingPrice));
      const text = mounted.render();
      if (current) {
        assert.ok(text.includes(formatPrivateTourPrice(3445, "en").formatted));
        assert.ok(!text.includes(preview.productPreviewCopy.en.expiredPrice));
        assert.ok(text.includes(props().pricing.guideLanguageNote));
      } else {
        assert.ok(text.includes(preview.productPreviewCopy.en.expiredPrice));
        for (const tier of props().pricing.tiers) assert.ok(!text.includes(tier.formattedPrice));
      }
      mounted.cleanup();
    }
  }
});

test("a page left open switches at the start and expiry boundaries and clears its timer", async () => {
  const starts = Date.parse(`${approved.valid_from}T00:00:00+08:00`);
  const ends = Date.parse(approved.valid_until);
  const upcoming = await mountAt(starts - 1);
  assert.equal(upcoming.timer.delay, 1);
  upcoming.clock.now = starts;
  upcoming.timer.callback();
  assert.ok(upcoming.render().includes(formatPrivateTourPrice(3445, "en").formatted));
  assert.equal(upcoming.timer.delay, Math.min(ends + 1 - starts, 2_147_483_647));
  assert.ok(upcoming.timer.delay <= 2_147_483_647, "windows stay within the browser timer limit");
  upcoming.cleanup();
  assert.equal(upcoming.cleared, true);

  const current = await mountAt(ends);
  assert.equal(current.timer.delay, 1);
  current.clock.now = ends + 1;
  current.timer.callback();
  assert.ok(current.render().includes(preview.productPreviewCopy.en.expiredPrice));
  assert.ok(!current.render().includes(formatPrivateTourPrice(3445, "en").formatted));
  current.cleanup();
});

test("the browser receives formatted public prices without a runtime import of the server product catalog", async () => {
  const source = await readSource(componentPath);
  assert.doesNotMatch(source, /from ["'].*privateTourProducts|product\.json|pricing\.json/);
  for (const locale of ["en", "zh", "ko"]) {
    const pricing = preview.getZhangjiajiePrivateTourPublicPricing(locale);
    assert.doesNotMatch(JSON.stringify(pricing), /approved_decision_id|supplier_cost|gross_margin|negotiation_floor/);
    for (const [index, tier] of pricing.tiers.entries()) {
      const approvedTier = approved.tiers[index];
      assert.equal(tier.formattedPrice, formatPrivateTourPrice(approvedTier.from_price_per_person ?? approvedTier.price_per_person, locale).formatted);
    }
  }
});
