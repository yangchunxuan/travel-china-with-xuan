import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("optional measurement is fail-closed and consent gated", async () => {
  const analytics = await source("lib/analytics.ts");
  const siteAnalytics = await source("components/SiteAnalytics.tsx");
  const consent = await source("components/AnalyticsConsent.tsx");

  assert.match(
    analytics,
    /NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED === "true"/,
    "The public master switch must default to off unless explicitly enabled",
  );
  assert.match(
    analytics,
    /!hasAnalyticsConsent\(\)/,
    "First-party and Google measurement must check analytics consent",
  );
  assert.match(
    analytics,
    /!hasMarketingConsent\(\)/,
    "Meta measurement must check marketing consent",
  );
  assert.match(
    analytics,
    /send_page_view: false/,
    "GA auto page views must stay off so route tracking does not duplicate them",
  );
  assert.match(
    siteAnalytics,
    /if \(preferences\?\.analytics\)/,
    "Google's script may load only in the analytics-consent branch",
  );
  assert.match(
    siteAnalytics,
    /if \(preferences\?\.marketing\)/,
    "Meta's script may load only in the marketing-consent branch",
  );
  assert.match(
    consent,
    /saveAnalyticsConsent/,
    "The public site must provide an explicit consent control",
  );
});

test("first-touch attribution does not turn internal links into acquisition", async () => {
  const analytics = await source("lib/analytics.ts");

  assert.match(
    analytics,
    /internalUtmMediums = new Set\(\["owned", "organic-content"\]\)/,
    "Known internal link media must be excluded from acquisition fields",
  );
  assert.match(
    analytics,
    /!internalUtmMediums\.has\(medium\)/,
    "Entry capture must retain campaign values only for external media",
  );
  assert.match(
    analytics,
    /params[\s\S]{0,120}\.get\("hg_attribution_sig"\)/,
    "Only the bounded Homeground signature marker may accompany UTM codes",
  );
  assert.match(
    analytics,
    /removeAttributionParametersFromAddressBar[\s\S]{0,900}"hg_attribution_sig"/,
    "Campaign values must be removed from the live URL before third-party scripts read it",
  );
});

test("free-text guide searches stay out of third-party measurement URLs", async () => {
  const [analytics, englishRoute, localizedRoute] = await Promise.all([
    source("lib/analytics.ts"),
    source("app/(default)/guides/search/page.tsx"),
    source("app/(localized)/[locale]/guides/search/page.tsx"),
  ]);

  assert.match(
    analytics,
    /guideSearchPathPattern[\s\S]{0,500}URLSearchParams\(window\.location\.search\)\.has\("q"\)/u,
    "Query-bearing guide-search routes must be detected without persisting the query",
  );
  assert.match(
    analytics,
    /page_location: safeLocation,[\s\S]{0,80}page_referrer: safeLocation/u,
    "GA events on guide search must override URL and referrer with query-free values",
  );
  assert.match(
    analytics,
    /marketingAllowed && !hasSensitiveGuideSearchQuery\(\)/u,
    "Meta events must be suppressed while a free-text guide query is in the URL",
  );
  assert.match(englishRoute, /referrer: "origin"/u);
  assert.match(localizedRoute, /referrer: "origin"/u);
});

test("first-party writes require a short-lived server credential", async () => {
  const analytics = await source("lib/analytics.ts");

  assert.match(
    analytics,
    /requestType: trafficSessionStartRequestType[\s\S]{0,900}session_ready/u,
  );
  assert.match(
    analytics,
    /sessionCredential: sessionCredential\.credential/u,
  );
  assert.match(
    analytics,
    /candidate\.expiresAt <= Date\.now\(\) \+ 30_000/u,
  );
  assert.match(
    analytics,
    /attributionSignature:[\s\S]{0,120}attribution\.attribution_signature/u,
  );
});

test("measurement scripts are injected only after a stored choice", async () => {
  const siteAnalytics = await source("components/SiteAnalytics.tsx");

  assert.doesNotMatch(
    siteAnalytics,
    /<Script/,
    "Third-party scripts must not be rendered unconditionally",
  );
  assert.match(
    siteAnalytics,
    /initializeGoogleAnalytics\(\)/,
    "Google initialization must remain behind the runtime consent branch",
  );
  assert.match(
    siteAnalytics,
    /initializeMetaPixel\(\)/,
    "Meta initialization must remain behind the runtime consent branch",
  );
  assert.match(
    siteAnalytics,
    /clearAnalyticsSessionState\(\)/,
    "Withdrawing analytics consent must clear optional session state",
  );
});

test("both public layouts mount consent and localized analytics", async () => {
  for (const [layout, localePattern] of [
    ["app/(default)/layout.tsx", /<SiteAnalytics locale="en" \/>/],
    [
      "app/(localized)/[locale]/layout.tsx",
      /<SiteAnalytics locale=\{locale\} \/>/,
    ],
  ]) {
    const contents = await source(layout);
    assert.match(
      contents,
      localePattern,
      `${layout} must mount localized SiteAnalytics`,
    );
    assert.match(
      contents,
      /<AnalyticsConsent locale=/,
      `${layout} must mount the privacy-choice control`,
    );
  }
});

test("the admin console never mounts analytics", async () => {
  const adminLayout = await source("app/(admin)/layout.tsx");
  assert.doesNotMatch(
    adminLayout,
    /SiteAnalytics|AnalyticsConsent/,
    "Owner console traffic must stay out of public reporting",
  );
});
