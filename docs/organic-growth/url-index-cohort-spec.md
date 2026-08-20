# URL Index Cohort Checker Specification

Status: **INTERNAL FOUNDATION — CENTRAL APPROVAL REQUIRED**

As-of date: 2026-08-20

## Decision

The checker is an evidence reconciler, not an indexation-rate estimator. It
operates at two explicit grains and never silently converts one into the other:

- URL grain: submitted canonical URL × locale × observation date.
- Content grain: controlled `contentId` × publication cohort; its EN/ZH/KO URLs
  roll up once.

A sitemap URL absent from a Page indexing snapshot is `not-observed`, never
`not-indexed`. A URL is `not-indexed` only when the Page indexing evidence has
that exact submitted canonical URL and verdict.

## Evidence reconciliation

The authenticated Search Console observations retained for this pilot are:

- Page indexing report, updated 2026-08-17 and observed 2026-08-20: 59 indexed
  and 6 not indexed.
- The 6 not-indexed observations are outside the submitted canonical
  population: 3 HTTP/`www` redirect variants and 3 parameter aliases reported
  as alternate pages with a proper canonical.
- Sitemap report submitted 2026-08-17 and last read 2026-08-18: 634 discovered
  URLs.

Those populations and times differ. `59 / 634` is not a valid Google
indexation rate, and `634 - 59` is not a known-not-indexed count. Search Map's
59 published entries are content identities, not the GSC URL count.

The sanitized Page indexing evidence is stored at
`docs/organic-growth/evidence/gsc-page-indexing-2026-08-17.json`. An automated
fixture test proves that it contains 65 rows: 59 indexed, 3 redirect variants,
and 3 parameter aliases. The file contains public URLs, status/reason and crawl
dates; it does not contain account or private-user data.

After PR #74 merged, a fresh live sitemap read on 2026-08-20 found 649 URLs.
That later population must not be retroactively paired with the 2026-08-17
numerator as though both represented one processing population.

## Property, time and freshness gates

The run fails before reconciliation unless all of these conditions hold:

1. The GSC report type is `page-indexing`.
2. The property is either the exact root URL-prefix property (not a subdirectory
   prefix) or an `sc-domain:` property whose host exactly matches the configured
   site origin.
3. `reportUpdatedAt <= observedAt <= asOf`.
4. `lastCrawlDate <= observedAt` for every row.
5. `asOf - reportUpdatedAt` is no greater than `maxGscAgeDays` (7 by default).
6. The caller explicitly supplies both business date `--as-of` and timestamp
   `--observed-at`; the latter must fall on `asOf` in `Asia/Shanghai`. The CLI
   does not infer either value from UTC or the machine clock.

The default GSC fixture is intentionally historical. When it becomes older
than the freshness threshold, the correct result is `STALE_GSC_SNAPSHOT`; the
operator must provide a new dated export or explicitly approve a different
threshold. Historical evidence must not be overwritten.

## Strict URL boundary

Every sitemap and inventory canonical must be:

- HTTPS;
- on the exact configured origin;
- free of credentials, query strings and fragments; and
- in canonical trailing-slash form.

The checker does not repair bad sitemap input. HTTP, `www`, parameter, fragment,
external-host and missing-slash URLs fail or remain separately classified as
non-canonical evidence. GSC parameter aliases and redirect variants never enter
the sitemap denominator. Two GSC rows such as `/a` and `/a/` fail as a canonical
collision instead of allowing one row to overwrite the other.

`gscKnownOutsideSitemap` means every known GSC row that is not an exact
submitted canonical: exact same-property URLs absent from the sitemap,
parameter aliases, and non-canonical HTTP/host/path variants. Separate counts
remain available for each class.

## Publication evidence

`publicationDateEvidence` is a controlled enum. Exactly one date source is
selected by each state:

| State | Required selected field | Constraint |
|---|---|---|
| `verified-publication` | `firstPublishedAt` | Date must not be after `asOf`; a controlled evidence reference is required. |
| `declared-metadata` | `declaredDatePublished` | Provisional metadata date; `firstPublishedAt` must be absent. |
| `first-sitemap-seen` | `firstSitemapSeenAt` | Allowed only when stronger dates are absent. |
| `unknown-legacy` | none | All three publication-date fields must be absent. |

An enum label is not itself deployment proof. `verified-publication` also
requires `publicationEvidenceRef` in one of two controlled forms:
`git:<full-40-character-commit>` or `sitemap-snapshot:YYYY-MM-DD`. A sitemap
snapshot date must equal `firstPublishedAt`. The upstream producer remains
responsible for retaining the referenced deployment or snapshot. The checker
prevents a bare date from being silently upgraded to verified evidence.

`lastmod`, merge time, migration time and GSC crawl time must never substitute
for first publication.

## URL and content cohorts

The URL row has one mutually exclusive age bucket:

| Age | Bucket | Review behavior |
|---|---|---|
| 0–13 days | `age-0-13` | No age-based review. |
| 14–27 days | `age-14-27` | Review only if exact URL is not confirmed indexed. |
| 28–29 days | `age-28-29` | Second review if exact URL is not confirmed indexed. |
| 30+ days | `age-30-plus` | Escalate only if current URL-level evidence explicitly says `not-indexed`. |
| Unknown | `unknown-date` | Repair evidence; do not guess age. |

EN/ZH/KO retain separate URL verdicts. Rows sharing a `contentId` produce one
content row with locale and verdict counts. Content publication date, evidence
and cohort must agree across locales; disagreement fails with
`CONTENT_PUBLICATION_CONFLICT` rather than choosing an arbitrary date.

Content observation states are:

- `all-locales-indexed`;
- `partially-indexed`;
- `known-not-indexed` (no indexed locale and at least one exact negative row);
- `not-observed`.

Only controlled inventory identities enter content-grain counts. Unmatched
sitemap URLs stay visible as URL-grain data gaps and are not guessed into
identities from their slugs.

## Inputs

Minimum inventory fields used and validated by this checker:

```text
contentId
locale = en | zh-Hans | ko
canonicalUrl
firstPublishedAt | null
declaredDatePublished | null
firstSitemapSeenAt | null
publicationDateEvidence
publicationEvidenceRef | null
```

The broader production inventory may also carry `section`, controlled entity
IDs, `indexApproved`, `editorialStatus` and candidate state. They remain
upstream governance fields; this checker must not infer or mutate them.

Each GSC snapshot requires:

```text
reportType = page-indexing
property
reportUpdatedAt
observedAt
rows[url, verdict, reason?, lastCrawlDate?]
```

Performance exports and snapshots from another property are rejected.

## Outputs and metric boundary

URL-grain output includes:

- `submittedCanonicalCount`;
- `confirmedIndexedIntersection`;
- `knownNotIndexedIntersection`;
- `submittedWithoutIndexObservation`;
- `gscKnownOutsideSitemap` and its exact/parameter/non-canonical components;
- inventory match and inventory-outside-sitemap counts.

Content-grain output includes identity counts, content cohort buckets, locale
counts and the four content observation states. Data-gap arrays name sitemap
URLs without inventory, inventory URLs outside the sitemap, URLs without GSC
observation, and URLs without safe publication evidence.

No ratio between the current sitemap and this older GSC snapshot is emitted.
No output may be labelled Google's complete indexation rate.

## Optional live technical audit

`--audit-live` is read-only. It checks every strict sitemap canonical for:

- HTTP 200, no redirect and exact self-canonical target;
- `noindex` or its equivalent directive `none` in `<meta name="robots">`,
  `<meta name="googlebot">`, or the `X-Robots-Tag` response header;
- an expected hreflang matrix derived from controlled content identity when
  inventory provides one, otherwise from the locale-prefixed route identity;
- exact, already-canonical `en`, `zh-Hans`, `ko` and `x-default` targets that
  exist in the sitemap; query strings and missing slashes are not repaired;
- duplicate, missing and unexpected hreflang codes;
- exact-code reciprocity (a link in some other language is not sufficient);
- internal-link in-degree, orphan candidates and internal parameter links.

The analysis layer accepts offline page fixtures, so missing hreflang sets,
duplicate codes, exact-target errors and each robots source are testable without
network access. Controlled guide identities allow different localized slugs to
remain one hreflang group. URLs outside the controlled inventory fall back to
route identity; the checker does not fabricate mappings for unrelated slugs.

The audit does not call URL Inspection, submit a sitemap, request indexing,
change Search Console, or modify a production page.

## Failure states

Hard input and integrity failures include:

```text
SITEMAP_UNAVAILABLE
SITEMAP_INVALID_XML
SITEMAP_URL_NOT_HTTPS
SITEMAP_URL_OUTSIDE_PROPERTY
SITEMAP_URL_PARAMETER_URL
SITEMAP_URL_NON_CANONICAL_PATH
DUPLICATE_SITEMAP_URL
DUPLICATE_CANONICAL_OWNER
GSC_SOURCE_WRONG_REPORT_TYPE
GSC_PROPERTY_MISMATCH
GSC_TIME_ORDER_INVALID
STALE_GSC_SNAPSHOT
GSC_ROW_DUPLICATE
GSC_CANONICAL_COLLISION
UNKNOWN_GSC_STATUS
INVALID_OR_FUTURE_DATE
UNKNOWN_PUBLICATION_EVIDENCE
PUBLICATION_EVIDENCE_DATE_REQUIRED
PUBLICATION_EVIDENCE_REF_REQUIRED
PUBLICATION_EVIDENCE_REF_INVALID
PUBLICATION_EVIDENCE_REF_CONFLICT
PUBLICATION_EVIDENCE_CONFLICT
CONTENT_PUBLICATION_CONFLICT
```

Reportable evidence gaps are output data, not thrown failures:

```text
not-observed GSC verdict
unknown-legacy publication evidence
sitemap URL without inventory identity
inventory canonical outside sitemap
parameter alias
non-canonical GSC variant
```

## Determinism

With identical sitemap, inventory, GSC snapshot, `asOf`, site origin,
freshness threshold and explicit observation timestamp, serialized output is
byte-for-byte stable. Input and diagnostic arrays are sorted, and no output
timestamp is read from the runtime clock. Live HTTP responses are observational
inputs; rerunning a live audit after pages change is therefore a different
input, not nondeterminism.

## Commands

```powershell
npm run check:index-cohorts -- --as-of 2026-08-20 --observed-at 2026-08-20T07:00:00+08:00
npm run check:index-cohorts -- --as-of 2026-08-20 --observed-at 2026-08-20T07:00:00+08:00 --audit-live --output <internal-json-path>
```

Optional evidence-policy override:

```powershell
--max-gsc-age-days <non-negative-integer>
```

## Authorization

- Search Console writes: **false**
- sitemap submission: **false**
- indexing request: **false**
- GA4/Cloudflare change: **false**
- public dashboard: **false**
