import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const repositoryRoot = new URL("../../", import.meta.url);
const source = (path) => readFile(new URL(path, repositoryRoot), "utf8");

test("Studio leads with the traveler planning thread and moves the team later", async () => {
  const page = await source("components/HomegroundStudioPage.tsx");

  assert.match(
    page,
    /const overviewStageIds = \["inputs", "steps", "deliverables"\] as const/,
  );
  assert.match(page, /data-plan-stage=\{overviewStageIds\[index\]\}/);
  assert.match(page, /data-plan-stage="terms"/);
  assert.ok(
    page.indexOf("styles.planOverview") < page.indexOf("styles.trustSection"),
    "the at-a-glance plan should precede the detailed method",
  );
  assert.ok(
    page.indexOf("styles.trustSection") < page.indexOf("styles.peopleSection"),
    "the planning method should precede the team story",
  );
  assert.match(page, /<dl className=\{styles\.termsList\}>/);
  assert.match(page, /<details className=\{styles\.memberDetails\}>/);
  assert.match(page, /aria-labelledby="planning-overview-title"/);
  assert.match(page, /aria-labelledby="planning-method-title"/);
});

test("all Studio locales expose inputs, deliverables, timing, scope and fees", async () => {
  const { homegroundStudioCopy, getStudioLanguagePaths } = await import(
    "../../lib/homegroundStudioI18n.ts"
  );

  assert.deepEqual(getStudioLanguagePaths(), {
    en: "/studio/",
    "zh-Hans": "/zh/studio/",
    ko: "/ko/studio/",
    "x-default": "/studio/",
  });

  const expectedPaths = {
    en: "/studio/",
    zh: "/zh/studio/",
    ko: "/ko/studio/",
  };

  for (const [locale, copy] of Object.entries(homegroundStudioCopy)) {
    assert.equal(copy.path, expectedPaths[locale]);
    assert.equal(copy.overview.stages.length, 3);
    assert.equal(copy.overview.terms.length, 3);
    assert.equal(copy.trust.inputs.length, 4);
    assert.equal(copy.trust.points.length, 3);
    assert.equal(copy.trust.deliverables.length, 4);

    const opening = JSON.stringify(copy.overview);
    assert.match(opening, /US\$69/);
    assert.match(opening, /US\$129/);
    assert.match(opening, /10/);
    assert.match(opening, /1–4/);
    assert.match(opening, locale === "en" ? /before payment/i : locale === "zh" ? /付款前/ : /결제 전에/);
  }
});

test("Studio has explicit layouts for 1180, 390 and 320-width review", async () => {
  const styles = await source("components/HomegroundStudioPage.module.css");

  assert.match(styles, /@media \(max-width: 1180px\)/);
  assert.match(styles, /@media \(max-width: 680px\)/);
  assert.match(styles, /@media \(max-width: 380px\)/);
  assert.match(styles, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(styles, /\.heroActions a \{\s*width: 100%;/);
  assert.match(styles, /\.termsList > div \{[\s\S]*minmax\(0, 1fr\)/);
  assert.doesNotMatch(styles, /overflow-x:\s*(?:scroll|auto)/);
});
