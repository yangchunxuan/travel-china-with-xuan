import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { getLegacySystemContentLifecycle } from "../../lib/legacySystemContentLifecycle.ts";
import { buildPrivateTourContentNodes } from "../../lib/privateTourContentAdapter.ts";

function source(path) {
  return readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
}

const localizedTargets = {
  en: {
    shanghai: "/tours/shanghai-suzhou-hangzhou-6-day-private-tour/",
    xian: "/tours/xian-terracotta-warriors-5-day-private-tour/",
    forest: "/tours/zhangjiajie-forest-4-day-private-tour/",
    classic: "/tours/zhangjiajie-4-day-private-tour/",
  },
  zh: {
    shanghai: "/zh/tours/shanghai-suzhou-hangzhou-6-day-private-tour/",
    xian: "/zh/tours/xian-terracotta-warriors-5-day-private-tour/",
    forest: "/zh/tours/zhangjiajie-forest-4-day-private-tour/",
    classic: "/zh/tours/zhangjiajie-4-day-private-tour/",
  },
  ko: {
    shanghai: "/ko/tours/shanghai-suzhou-hangzhou-6-day-private-tour/",
    xian: "/ko/tours/xian-terracotta-warriors-5-day-private-tour/",
    forest: "/ko/tours/zhangjiajie-forest-4-day-private-tour/",
    classic: "/ko/tours/zhangjiajie-4-day-private-tour/",
  },
};

test("decision guides expose localized product links in rendered content", () => {
  for (const [locale, targets] of Object.entries(localizedTargets)) {
    assert.match(
      source(
        `content/guides/shanghai-suzhou-hangzhou-nanjing-route-order/body.${locale}.ts`,
      ),
      new RegExp(targets.shanghai.replaceAll("/", "\\/"), "u"),
    );
    assert.match(
      source(`content/guides/terracotta-warriors-without-tour/body.${locale}.ts`),
      new RegExp(targets.xian.replaceAll("/", "\\/"), "u"),
    );
    assert.match(
      source(
        `content/guides/xian-where-to-stay-city-wall-or-dayanta/body.${locale}.ts`,
      ),
      new RegExp(targets.xian.replaceAll("/", "\\/"), "u"),
    );

    const forestGuide = source(
      `content/guides/zhangjiajie-national-forest-park-tickets-and-entrances/body.${locale}.ts`,
    );
    assert.match(
      forestGuide,
      new RegExp(targets.forest.replaceAll("/", "\\/"), "u"),
    );
    assert.match(
      forestGuide,
      new RegExp(targets.classic.replaceAll("/", "\\/"), "u"),
    );
  }
});

test("the two Zhangjiajie products expose one localized comparison link each", () => {
  const comparisonSource = source("components/ZhangjiajieTourComparisonLink.tsx");
  const classicPage = source("components/ZhangjiajiePrivateTourPreviewPage.tsx");
  const sharedProductPage = source("components/ShanghaiJiangnanImaginePage.tsx");

  assert.match(classicPage, /currentRoute="classic"/u);
  assert.match(classicPage, /ZhangjiajieTourComparisonLink/u);
  assert.match(sharedProductPage, /currentRoute="forest"/u);
  assert.match(
    sharedProductPage,
    /product\.slug === "zhangjiajie-forest-4-day-private-tour"/u,
  );

  for (const targets of Object.values(localizedTargets)) {
    assert.match(
      comparisonSource,
      new RegExp(targets.forest.replaceAll("/", "\\/"), "u"),
    );
    assert.match(
      comparisonSource,
      new RegExp(targets.classic.replaceAll("/", "\\/"), "u"),
    );
  }
});

test("tour hub and forest product publish truthful lifecycle dates", () => {
  const nodes = buildPrivateTourContentNodes();
  const hub = nodes.find((node) => node.id === "tour-hub");
  const forest = nodes.find(
    (node) =>
      node.locales.en?.path === "/tours/zhangjiajie-forest-4-day-private-tour/",
  );

  assert.deepEqual(hub?.dates, {
    datePublished: "2026-08-24",
    dateModified: "2026-08-31",
    lastReviewed: "2026-08-31",
  });
  assert.deepEqual(forest?.dates, {
    datePublished: "2026-08-31",
    dateModified: "2026-09-01",
    lastReviewed: "2026-08-31",
  });

  const classic = getLegacySystemContentLifecycle(
    "zhangjiajie-4-day-private-tour",
  );
  assert.equal(classic.datePublished, "2026-08-16");
  assert.equal(classic.dateModified, "2026-09-01");
  assert.equal(classic.lastReviewed, "2026-08-16");
  assert.equal(classic.evidence.commit, "d3ffdf16b272b76e0dfc5848ac2fcde7bc37b0e3");
});
