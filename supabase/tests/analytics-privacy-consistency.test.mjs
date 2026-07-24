import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

function analyticsEnabled(siteAnalytics) {
  const match = siteAnalytics.match(/const ANALYTICS_ENABLED = (true|false);/);
  assert.ok(match, "SiteAnalytics must declare an explicit ANALYTICS_ENABLED flag");
  return match[1] === "true";
}

/**
 * The site's own privacy notice is the contract. Collection may only be on when
 * the notice stops denying it. This test exists because the notice and the
 * behaviour silently diverged once already: GA was restored while all three
 * language versions still said no page-behaviour events were collected.
 */
test("analytics stays off while the privacy notice denies collection", async () => {
  const siteAnalytics = await source("components/SiteAnalytics.tsx");
  const privacy = await source("lib/homegroundPrivacyI18n.ts");

  // The exact sentences that must be rewritten before collection may resume.
  const denials = [
    /does not collect planner or page-behaviour events/,
    /当前网站不收集旅行简报或页面行为事件/,
    /현재 사이트는 여행 브리프 또는 페이지 행동 기록을 수집하지 않고/,
  ];

  const stillDenies = denials.filter((pattern) => pattern.test(privacy));

  if (analyticsEnabled(siteAnalytics)) {
    assert.equal(
      stillDenies.length,
      0,
      `Analytics is enabled but the privacy notice still denies collection in ${stillDenies.length} language(s). Rewrite the notice, and ship a consent mechanism, before enabling.`,
    );
  } else {
    // Nothing to enforce while collection is off, but keep the denial sentences
    // discoverable so a future edit to the notice does not quietly orphan this.
    assert.equal(
      stillDenies.length,
      3,
      "Privacy denial wording changed; re-check this test's patterns against the notice.",
    );
  }
});

test("no analytics script reaches the built pages while collection is off", async () => {
  const siteAnalytics = await source("components/SiteAnalytics.tsx");
  if (analyticsEnabled(siteAnalytics)) return;

  // Guards the specific regression that started this: the component rendering
  // its scripts regardless of the flag.
  assert.match(
    siteAnalytics,
    /if \(!ANALYTICS_ENABLED\) return null;/,
    "SiteAnalytics must return null before rendering any tag when disabled",
  );
  assert.match(
    siteAnalytics,
    /if \(!ANALYTICS_ENABLED\) return;/,
    "SiteAnalytics must not capture attribution when disabled",
  );
});

/**
 * The July 18 regression was a layout move that dropped the component with no
 * test failing. This makes that specific mistake loud.
 */
test("both public layouts mount SiteAnalytics", async () => {
  for (const layout of [
    "app/(default)/layout.tsx",
    "app/(localized)/[locale]/layout.tsx",
  ]) {
    const contents = await source(layout);
    assert.match(
      contents,
      /<SiteAnalytics \/>/,
      `${layout} must mount SiteAnalytics so analytics cannot be silently dropped by a refactor`,
    );
  }
});

test("the admin console never mounts analytics", async () => {
  const adminLayout = await source("app/(admin)/layout.tsx");
  assert.doesNotMatch(
    adminLayout,
    /SiteAnalytics/,
    "Owner console traffic must stay out of the reporting",
  );
});
