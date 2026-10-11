import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { getLegacySystemContentLifecycle } from "../../lib/legacySystemContentLifecycle.ts";
import { buildPrivateTourContentNodes } from "../../lib/privateTourContentAdapter.ts";
import { getPrivateTourHubLastModified, latestTourHubChange } from "../../lib/privateTourHubLifecycle.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";

function source(path) {
  return readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
}

const localizedTargets = {
  en: {
    shanghai: "/tours/shanghai-suzhou-hangzhou-6-day-private-tour/",
    xian: "/tours/xian-terracotta-warriors-5-day-private-tour/",
    forest: "/tours/zhangjiajie-forest-4-day-private-tour/",
    classic: "/tours/zhangjiajie-4-day-private-tour/",
    ancientTowns: "/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
  },
  zh: {
    shanghai: "/zh/tours/shanghai-suzhou-hangzhou-6-day-private-tour/",
    xian: "/zh/tours/xian-terracotta-warriors-5-day-private-tour/",
    forest: "/zh/tours/zhangjiajie-forest-4-day-private-tour/",
    classic: "/zh/tours/zhangjiajie-4-day-private-tour/",
    ancientTowns: "/zh/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
  },
  ko: {
    shanghai: "/ko/tours/shanghai-suzhou-hangzhou-6-day-private-tour/",
    xian: "/ko/tours/xian-terracotta-warriors-5-day-private-tour/",
    forest: "/ko/tours/zhangjiajie-forest-4-day-private-tour/",
    classic: "/ko/tours/zhangjiajie-4-day-private-tour/",
    ancientTowns: "/ko/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
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

test("the three Zhangjiajie products share a localized route comparison", () => {
  const comparisonSource = source("components/ZhangjiajieTourComparisonLink.tsx");
  const classicPage = source("components/ZhangjiajiePrivateTourPreviewPage.tsx");
  const sharedProductPage = source("components/ShanghaiJiangnanImaginePage.tsx");

  assert.match(classicPage, /currentRoute="classic"/u);
  assert.match(classicPage, /ZhangjiajieTourComparisonLink/u);
  assert.match(sharedProductPage, /currentRoute="forest"/u);
  assert.match(sharedProductPage, /currentRoute="ancientTowns"/u);
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
    assert.match(
      comparisonSource,
      new RegExp(targets.ancientTowns.replaceAll("/", "\\/"), "u"),
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
    dateModified: getPrivateTourHubLastModified(),
    lastReviewed: "2026-08-31",
  });
  assert.deepEqual(forest?.dates, {
    datePublished: "2026-08-31",
    dateModified: "2026-10-08",
    lastReviewed: "2026-08-31",
  });

  const classic = getLegacySystemContentLifecycle(
    "zhangjiajie-4-day-private-tour",
  );
  assert.equal(classic.datePublished, "2026-08-16");
  assert.equal(classic.dateModified, "2026-10-08");
  assert.equal(classic.lastReviewed, "2026-08-16");
  assert.equal(classic.evidence.commit, "e288c0499661ad735e2788df87ab9866bfcdc239");
  const towns = nodes.find(node => node.locales.en?.path === "/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/");
  assert.equal(towns?.dates.dateModified, "2026-10-08");
});

test("tour hub dates follow public card changes without using build or review dates", () => {
  const published = getPublishedPrivateTourCatalog("en");
  for (const locale of ["en", "zh", "ko", "ja"]) {
    const modified = getPrivateTourHubLastModified(locale);
    assert.ok(modified >= "2026-10-11", `${locale}: includes the October catalogue release`);
    assert.ok(published.every((tour) => modified >= tour.dateModified));
  }
  assert.equal(
    latestTourHubChange([
      { dateModified: "2026-09-01", lastReviewed: "2030-01-01" },
      { dateModified: "2026-11-20" },
    ], "2026-10-11"),
    "2026-11-20",
    "a future published card edit advances the hub; a review alone does not",
  );
  assert.equal(latestTourHubChange([{ dateModified: "2026-09-01" }], "2026-12-01"), "2026-12-01", "a hub-only edit or removal retains its own public change date");
  assert.equal(latestTourHubChange([], "2026-12-01"), "2026-12-01");
});
