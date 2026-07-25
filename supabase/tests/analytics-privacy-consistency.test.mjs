import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

function analyticsEnabled(analytics) {
  const match = analytics.match(
    /export const ANALYTICS_ENABLED: boolean = (true|false);/,
  );
  assert.ok(match, "analytics must declare one explicit ANALYTICS_ENABLED flag");
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
  const analytics = await source("lib/analytics.ts");
  const privacy = await source("lib/homegroundPrivacyI18n.ts");
  assert.match(
    siteAnalytics,
    /import \{[\s\S]*ANALYTICS_ENABLED,[\s\S]*\} from "\.\.\/lib\/analytics"/,
    "script loading and event dispatch must share the same analytics switch",
  );

  // The exact sentences that must be rewritten before collection may resume.
  const denials = [
    /does not collect planner or page-behaviour events/,
    /当前网站不收集旅行简报或页面行为事件/,
    /현재 사이트는 여행 브리프 또는 페이지 행동 기록을 수집하지 않고/,
  ];

  const stillDenies = denials.filter((pattern) => pattern.test(privacy));

  if (analyticsEnabled(analytics)) {
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
  const analytics = await source("lib/analytics.ts");
  if (analyticsEnabled(analytics)) return;

  // Guards the specific regression that started this: the component rendering
  // its scripts regardless of the flag.
  assert.match(
    siteAnalytics,
    /if \(!ANALYTICS_ENABLED\) return null;/,
    "SiteAnalytics must return null before rendering any tag when disabled",
  );
  assert.doesNotMatch(
    siteAnalytics,
    /captureEntryAttribution|sessionStorage/,
    "first-party attribution must stay independent of the disabled analytics component",
  );
  assert.match(
    analytics,
    /if \(!ANALYTICS_ENABLED \|\| typeof window === "undefined"\) return;/,
    "trackEvent must stop before mutating browser state while analytics is disabled",
  );
  assert.match(
    analytics,
    /if \(typeof analyticsWindow\.gtag !== "function"\) return;/,
    "a missing GA runtime must be a no-op",
  );
  assert.doesNotMatch(
    analytics,
    /dataLayer\.push\(\{ event:/,
    "disabled analytics must not accumulate unread behavioural events",
  );
});

test("first-party attribution remains local while analytics is off", async () => {
  const siteAttribution = await source("components/SiteAttribution.tsx");

  assert.match(siteAttribution, /captureEntryAttribution\(\)/);
  assert.doesNotMatch(
    siteAttribution,
    /next\/script|googletagmanager|google-analytics|trackEvent/,
  );
});

/**
 * The July 18 regression was a layout move that dropped the component with no
 * test failing. This makes that specific mistake loud.
 */
test("both public layouts mount analytics and first-party attribution", async () => {
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
    assert.match(
      contents,
      /<SiteAttribution \/>/,
      `${layout} must preserve first-party enquiry attribution while analytics is disabled`,
    );
  }
});

test("the admin console never mounts analytics or public attribution", async () => {
  const adminLayout = await source("app/(admin)/layout.tsx");
  assert.doesNotMatch(
    adminLayout,
    /SiteAnalytics|SiteAttribution/,
    "Owner console traffic must stay out of the reporting",
  );
});
