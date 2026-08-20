import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import {
  ageInDays,
  publicationCohort,
  reconcileIndexCohorts,
  stableStringify,
  validateGscSnapshot,
} from "../../tools/internal/index-cohort-core.mjs";
import {
  analyzeTechnicalPages,
  parseArguments,
} from "../../tools/check-index-cohorts.mjs";

const asOf = "2026-08-20";
const checkedAt = "2026-08-20T07:00:00+08:00";
const site = "https://homegroundchina.com";

function inventoryRow(id, locale, pathname, publishedAt, overrides = {}) {
  return {
    contentId: id,
    locale,
    canonicalUrl: `${site}${pathname}`,
    firstPublishedAt: null,
    declaredDatePublished: publishedAt,
    firstSitemapSeenAt: null,
    publicationDateEvidence: publishedAt ? "declared-metadata" : "unknown-legacy",
    ...overrides,
  };
}

function snapshot(rows, overrides = {}) {
  return {
    schemaVersion: 1,
    reportType: "page-indexing",
    property: site,
    reportUpdatedAt: "2026-08-17",
    observedAt: "2026-08-20",
    rows,
    ...overrides,
  };
}

function technicalPage(url, overrides = {}) {
  return {
    url,
    httpStatus: 200,
    finalUrl: url,
    canonical: url,
    alternateEntries: [],
    robotDirectives: [],
    internalLinks: [],
    error: null,
    ...overrides,
  };
}

test("14/28/30 day cohort boundaries are exact", () => {
  assert.equal(ageInDays("2026-08-20", asOf), 0);
  assert.equal(publicationCohort("2026-08-07", asOf), "age-0-13");
  assert.equal(publicationCohort("2026-08-06", asOf), "age-14-27");
  assert.equal(publicationCohort("2026-07-24", asOf), "age-14-27");
  assert.equal(publicationCohort("2026-07-23", asOf), "age-28-29");
  assert.equal(publicationCohort("2026-07-22", asOf), "age-28-29");
  assert.equal(publicationCohort("2026-07-21", asOf), "age-30-plus");
  assert.equal(publicationCohort(null, asOf), "unknown-date");
});

test("59 indexed plus 6 outside-sitemap observations never manufacture unindexed rows", () => {
  const sitemapUrls = Array.from({ length: 634 }, (_, index) =>
    `${site}/fixture/${index}/`);
  const inventory = sitemapUrls.map((url, index) => inventoryRow(
    `fixture-${index}`,
    "en",
    new URL(url).pathname,
    "2026-08-01",
  ));
  const rows = [
    ...Array.from({ length: 59 }, (_, index) => ({
      url: sitemapUrls[index],
      verdict: "indexed",
      lastCrawlDate: "2026-08-17",
    })),
    {
      url: "https://www.homegroundchina.com/",
      verdict: "not-indexed",
      reason: "page-with-redirect",
      lastCrawlDate: "2026-08-17",
    },
    {
      url: "http://homegroundchina.com/",
      verdict: "not-indexed",
      reason: "page-with-redirect",
      lastCrawlDate: "2026-08-17",
    },
    {
      url: "http://www.homegroundchina.com/",
      verdict: "not-indexed",
      reason: "page-with-redirect",
      lastCrawlDate: "2026-08-17",
    },
    ...Array.from({ length: 3 }, (_, index) => ({
      url: `${site}/?utm_source=fixture-${index}`,
      verdict: "not-indexed",
      reason: "alternate-page-with-proper-canonical",
      lastCrawlDate: "2026-08-17",
    })),
  ];

  const result = reconcileIndexCohorts({
    sitemapUrls,
    inventory,
    gscSnapshot: snapshot(rows),
    asOf,
  });

  assert.equal(result.counts.submittedCanonicalCount, 634);
  assert.equal(result.counts.confirmedIndexedIntersection, 59);
  assert.equal(result.counts.knownNotIndexedIntersection, 0);
  assert.equal(result.counts.submittedWithoutIndexObservation, 575);
  assert.equal(result.counts.gscKnownOutsideSitemap, 6);
  assert.equal(result.counts.parameterAliasCount, 3);
  assert.equal(result.counts.nonCanonicalVariantCount, 3);
  assert.ok(result.evidence.warning.includes("not a Google indexation rate"));
});

test("parameter variants stay diagnostic and never enter the canonical denominator", () => {
  const result = reconcileIndexCohorts({
    sitemapUrls: [`${site}/`],
    inventory: [inventoryRow("home", "en", "/", "2026-07-01")],
    gscSnapshot: snapshot([{
      url: `${site}/?utm_source=owned`,
      verdict: "not-indexed",
      reason: "alternate-page-with-proper-canonical",
      lastCrawlDate: "2026-08-11",
    }]),
    asOf,
  });
  assert.equal(result.rows.length, 1);
  assert.equal(result.rows[0].gscVerdict, "not-observed");
  assert.equal(result.parameterAliases[0].canonicalOwner, `${site}/`);
  assert.equal(result.counts.gscKnownOutsideSitemap, 1);
});

test("property, observation order and snapshot freshness are hard gates", () => {
  assert.throws(() => validateGscSnapshot(snapshot([], {
    property: "sc-domain:wrong.example",
  }), { expectedOrigin: site, asOf }), /GSC_PROPERTY_MISMATCH/u);
  assert.throws(() => validateGscSnapshot(snapshot([], {
    property: `${site}/subdir/`,
  }), { expectedOrigin: site, asOf }), /GSC_PROPERTY_MISMATCH/u);

  assert.throws(() => validateGscSnapshot(snapshot([], {
    observedAt: "2026-08-21",
  }), { expectedOrigin: site, asOf }), /GSC_TIME_ORDER_INVALID/u);

  assert.throws(() => validateGscSnapshot(snapshot([], {
    reportUpdatedAt: "2026-08-12",
  }), { expectedOrigin: site, asOf, maxSnapshotAgeDays: 7 }), /STALE_GSC_SNAPSHOT/u);

  assert.doesNotThrow(() => validateGscSnapshot(snapshot([], {
    property: "sc-domain:homegroundchina.com",
  }), { expectedOrigin: site, asOf }));
});

test("publication evidence selects one controlled date source", () => {
  const result = reconcileIndexCohorts({
    sitemapUrls: [`${site}/first-live/`, `${site}/first-sitemap/`, `${site}/legacy/`],
    inventory: [
      inventoryRow("live", "en", "/first-live/", null, {
        firstPublishedAt: "2026-08-01",
        publicationDateEvidence: "verified-publication",
        publicationEvidenceRef: "git:0123456789abcdef0123456789abcdef01234567",
      }),
      inventoryRow("sitemap", "en", "/first-sitemap/", null, {
        firstSitemapSeenAt: "2026-08-02",
        publicationDateEvidence: "first-sitemap-seen",
      }),
      inventoryRow("legacy", "en", "/legacy/", null),
    ],
    gscSnapshot: snapshot([]),
    asOf,
  });
  assert.deepEqual(result.rows.map((row) => [row.publicationEvidence, row.publishedAt]), [
    ["verified-publication", "2026-08-01"],
    ["first-sitemap-seen", "2026-08-02"],
    ["unknown-legacy", null],
  ]);

  assert.throws(() => reconcileIndexCohorts({
    sitemapUrls: [`${site}/a/`],
    inventory: [inventoryRow("a", "en", "/a/", null, {
      publicationDateEvidence: "verified-publication",
    })],
    gscSnapshot: snapshot([]),
    asOf,
  }), /PUBLICATION_EVIDENCE_DATE_REQUIRED/u);

  assert.throws(() => reconcileIndexCohorts({
    sitemapUrls: [`${site}/a/`],
    inventory: [inventoryRow("a", "en", "/a/", null, {
      firstPublishedAt: "2026-08-01",
      publicationDateEvidence: "verified-publication",
    })],
    gscSnapshot: snapshot([]),
    asOf,
  }), /PUBLICATION_EVIDENCE_REF_REQUIRED/u);

  assert.throws(() => reconcileIndexCohorts({
    sitemapUrls: [`${site}/a/`],
    inventory: [inventoryRow("a", "en", "/a/", "2026-08-01", {
      publicationDateEvidence: "invented-source",
    })],
    gscSnapshot: snapshot([]),
    asOf,
  }), /UNKNOWN_PUBLICATION_EVIDENCE/u);
});

test("content identities roll up locale URLs once and reject publication conflicts", () => {
  const urls = [
    `${site}/guides/a/`,
    `${site}/zh/guides/a/`,
    `${site}/ko/guides/a/`,
  ];
  const inventory = [
    inventoryRow("guide-a", "en", "/guides/a/", "2026-08-01"),
    inventoryRow("guide-a", "zh-Hans", "/zh/guides/a/", "2026-08-01"),
    inventoryRow("guide-a", "ko", "/ko/guides/a/", "2026-08-01"),
  ];
  const result = reconcileIndexCohorts({
    sitemapUrls: urls,
    inventory,
    gscSnapshot: snapshot([{
      url: urls[0],
      verdict: "indexed",
      lastCrawlDate: "2026-08-17",
    }]),
    asOf,
  });
  assert.equal(result.rows.length, 3);
  assert.equal(result.contentRows.length, 1);
  assert.equal(result.contentCounts.submittedContentIdentityCount, 1);
  assert.equal(result.contentRows[0].indexObservation, "partially-indexed");
  assert.equal(result.contentCohorts["age-14-27"].partiallyIndexed, 1);

  assert.throws(() => reconcileIndexCohorts({
    sitemapUrls: urls,
    inventory: inventory.map((row, index) => index === 2
      ? { ...row, declaredDatePublished: "2026-08-02" }
      : row),
    gscSnapshot: snapshot([]),
    asOf,
  }), /CONTENT_PUBLICATION_CONFLICT/u);
});

test("sitemap URLs are strict and GSC canonical aliases cannot overwrite each other", () => {
  const base = {
    inventory: [],
    gscSnapshot: snapshot([]),
    asOf,
  };
  assert.throws(() => reconcileIndexCohorts({
    ...base,
    sitemapUrls: [`${site}/a/?utm_source=x`],
  }), /SITEMAP_URL_PARAMETER_URL/u);
  assert.throws(() => reconcileIndexCohorts({
    ...base,
    sitemapUrls: ["https://example.com/a/"],
  }), /SITEMAP_URL_OUTSIDE_PROPERTY/u);
  assert.throws(() => reconcileIndexCohorts({
    ...base,
    sitemapUrls: [`${site}/a`],
  }), /SITEMAP_URL_NON_CANONICAL_PATH/u);

  assert.throws(() => validateGscSnapshot(snapshot([
    { url: `${site}/a`, verdict: "indexed", lastCrawlDate: "2026-08-17" },
    { url: `${site}/a/`, verdict: "indexed", lastCrawlDate: "2026-08-17" },
  ]), { expectedOrigin: site, asOf }), /GSC_CANONICAL_COLLISION/u);
});

test("technical analyzer catches missing/exact hreflang, duplicate codes and all noindex sources", () => {
  const en = `${site}/guides/a/`;
  const zh = `${site}/zh/guides/a/`;
  const ko = `${site}/ko/guides/a/`;
  const pages = [
    technicalPage(en, {
      alternateEntries: [
        { hreflang: "en", href: en },
        { hreflang: "x-default", href: en },
      ],
      internalLinks: [zh, ko],
    }),
    technicalPage(zh, {
      alternateEntries: [
        { hreflang: "en", href: ko },
        { hreflang: "zh-Hans", href: zh },
        { hreflang: "ko", href: ko },
        { hreflang: "x-default", href: en },
      ],
      robotDirectives: [{ source: "meta", agent: "googlebot", content: "noindex, follow" }],
      internalLinks: [en, ko],
    }),
    technicalPage(ko, {
      alternateEntries: [
        { hreflang: "en", href: en },
        { hreflang: "zh-Hans", href: zh },
        { hreflang: "ko", href: ko },
        { hreflang: "ko", href: ko },
        { hreflang: "x-default", href: en },
      ],
      robotDirectives: [{ source: "http-header", agent: "x-robots-tag", content: "noindex" }],
      internalLinks: [en, zh, `${site}/guides/a/?utm_source=test`],
    }),
  ];
  const result = analyzeTechnicalPages(pages, [en, zh, ko], { checkedAt });
  const has = (code, url) => result.issues.some((entry) => entry.code === code && entry.url === url);
  assert.equal(has("HREFLANG_MISSING", en), true);
  assert.equal(has("HREFLANG_TARGET_MISMATCH", zh), true);
  assert.equal(has("HREFLANG_NOT_RECIPROCAL", en), true);
  assert.equal(has("HREFLANG_DUPLICATE", ko), true);
  assert.equal(has("SITEMAP_NOINDEX", zh), true);
  assert.equal(has("SITEMAP_NOINDEX", ko), true);
  assert.equal(result.parameterLinks.length, 1);
});

test("technical canonical and hreflang checks never repair bad targets, and robots none blocks indexing", () => {
  const url = `${site}/a/`;
  const pageWithParameters = technicalPage(url, {
    canonical: `${url}?source=bad`,
    alternateEntries: [
      { hreflang: "en", href: `${url}?source=bad` },
      { hreflang: "x-default", href: url },
    ],
    robotDirectives: [{ source: "meta", agent: "robots", content: "none" }],
  });
  const parameterResult = analyzeTechnicalPages([pageWithParameters], [url], { checkedAt });
  assert.equal(parameterResult.issues.some((entry) => entry.code === "CANONICAL_MISMATCH"), true);
  assert.equal(
    parameterResult.issues.some((entry) => entry.code === "HREFLANG_TARGET_MISMATCH"),
    true,
  );
  assert.equal(parameterResult.issues.some((entry) => entry.code === "SITEMAP_NOINDEX"), true);

  const pageWithoutSlash = technicalPage(url, {
    canonical: `${site}/a`,
    alternateEntries: [
      { hreflang: "en", href: url },
      { hreflang: "x-default", href: url },
    ],
  });
  const slashResult = analyzeTechnicalPages([pageWithoutSlash], [url], { checkedAt });
  assert.equal(slashResult.issues.some((entry) => entry.code === "CANONICAL_MISMATCH"), true);

  const previewOnly = technicalPage(url, {
    alternateEntries: [
      { hreflang: "en", href: url },
      { hreflang: "x-default", href: url },
    ],
    robotDirectives: [{
      source: "meta",
      agent: "robots",
      content: "max-image-preview:none, index, follow",
    }, {
      source: "http-header",
      agent: "x-robots-tag",
      content: "bingbot: none",
    }],
  });
  const previewResult = analyzeTechnicalPages([previewOnly], [url], { checkedAt });
  assert.equal(previewResult.issues.some((entry) => entry.code === "SITEMAP_NOINDEX"), false);
});

test("controlled content identity exposes hreflang gaps when localized slugs differ", () => {
  const en = `${site}/guides/english-slug/`;
  const zh = `${site}/zh/guides/chinese-slug/`;
  const pages = [
    technicalPage(en, {
      alternateEntries: [
        { hreflang: "en", href: en },
        { hreflang: "x-default", href: en },
      ],
      internalLinks: [zh],
    }),
    technicalPage(zh, {
      alternateEntries: [
        { hreflang: "zh-Hans", href: zh },
        { hreflang: "x-default", href: en },
      ],
      internalLinks: [en],
    }),
  ];
  const result = analyzeTechnicalPages(pages, [en, zh], {
    checkedAt,
    contentIdentityByUrl: { [en]: "guide-a", [zh]: "guide-a" },
  });
  assert.equal(result.issues.some((entry) =>
    entry.code === "HREFLANG_MISSING"
      && entry.url === en
      && entry.detail.code === "zh-Hans"), true);
});

test("CLI requires explicit business date and observation timestamp", () => {
  assert.throws(() => parseArguments([]), /--as-of is required/u);
  assert.throws(() => parseArguments(["--as-of", asOf]), /--observed-at is required/u);
  const options = parseArguments([
    "--as-of", asOf,
    "--observed-at", checkedAt,
    "--max-gsc-age-days", "3",
  ]);
  assert.equal(options.asOf, asOf);
  assert.equal(options.observedAt, checkedAt);
  assert.equal(options.maxGscAgeDays, 3);
  assert.throws(() => parseArguments([
    "--as-of", asOf,
    "--observed-at", "2026-08-19T07:00:00+08:00",
  ]), /must fall on --as-of/u);
});

test("checked-in GSC evidence is internally consistent with the authenticated observation", async () => {
  const fixturePath = path.resolve(
    process.cwd(),
    "docs/organic-growth/evidence/gsc-page-indexing-2026-08-17.json",
  );
  const fixture = JSON.parse(await readFile(fixturePath, "utf8"));
  validateGscSnapshot(fixture, { expectedOrigin: site, asOf });
  assert.equal(fixture.rows.length, 65);
  assert.equal(fixture.rows.filter((row) => row.verdict === "indexed").length, 59);
  assert.equal(fixture.rows.filter((row) => row.reason === "page-with-redirect").length, 3);
  assert.equal(fixture.rows
    .filter((row) => row.reason === "alternate-page-with-proper-canonical").length, 3);
});

test("missing observations stay unknown and fixed inputs serialize deterministically", () => {
  assert.throws(() => publicationCohort("2026-02-30", asOf), /INVALID_OR_FUTURE_DATE/u);
  assert.throws(() => publicationCohort("2026-08-21", asOf), /INVALID_OR_FUTURE_DATE/u);

  const input = {
    sitemapUrls: [`${site}/a/`],
    inventory: [inventoryRow("a", "en", "/a/", "2026-08-01")],
    gscSnapshot: snapshot([]),
    asOf,
  };
  const first = reconcileIndexCohorts(input);
  assert.equal(first.rows[0].gscVerdict, "not-observed");
  assert.equal(first.counts.knownNotIndexedIntersection, 0);
  assert.equal(
    stableStringify(first),
    stableStringify(reconcileIndexCohorts(structuredClone(input))),
  );

  const page = technicalPage(`${site}/a/`, {
    alternateEntries: [
      { hreflang: "en", href: `${site}/a/` },
      { hreflang: "x-default", href: `${site}/a/` },
    ],
  });
  assert.equal(
    stableStringify(analyzeTechnicalPages([page], [`${site}/a/`], { checkedAt })),
    stableStringify(analyzeTechnicalPages(structuredClone([page]), [`${site}/a/`], { checkedAt })),
  );
});
