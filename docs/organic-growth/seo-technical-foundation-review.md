# SEO Technical Foundation Review

Status: **READY FOR CENTRAL REVIEW — NO PRODUCTION CHANGE AUTHORIZED**

Review completed: 2026-08-21

Historical-snapshot notice: this review preserves the PR #74 / 649-URL
technical baseline and must not be read as current production state. PR #89 and
the 670-URL live/Search Console read-back are recorded in
[`docs/release-notes/search-analytics-privacy-production-release-20260823.md`](../release-notes/search-analytics-privacy-production-release-20260823.md).
Do not replace the dated 649 evidence below with 670.

Reviewer: Homeground employee 8, technical feasibility and testing

Integration base: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`

## Executive decision

The internal technical foundation is feasible and has a runnable first pass.
It does not prove that 575 pages are unindexed, does not authorize a public
Route Reality Checker, and does not make the commercial funnel measurable to
purchase. Those three boundaries are explicit and tested.

Current decisions:

| Area | Decision |
|---|---|
| URL cohort checker | Ready for internal use with explicit dated evidence; wrong-property, time-conflicted and stale snapshots fail closed. |
| Live canonical/hreflang/link audit | Ready for read-only diagnosis. |
| City entity correction | PR #74 fixed the confirmed Guangzhou/Hangzhou/Chongqing/Shenzhen gaps; policy now has executable tests. |
| Full place registry | Not ready; 142 metadata tokens still require controlled mapping decisions. |
| Freshness policy | Controlled 24-pillar registry, Search Map minimums and fail-closed unknown-pillar tests are ready. |
| Organic → purchase measurement | Specification/test contract ready; production chain not authorized and purchase source unavailable. |
| Route Reality Checker | Current specification not technically implementable; B01–B10 block public work. |
| Hotel/ticket/route interfaces | Internal validation contract and non-persisting stub ready; no inventory/API/page authorized. |

## 1. Git, PR #74 and production evidence

During this review, PR #74 merged into `origin/main`. The review branch was
rebased before implementation so its base is the merge commit above.

The earlier live QA snapshot contained 634 sitemap URLs at
`origin/main@cbbfdda`. A fresh production sitemap read after the merge contained
649 unique canonical URLs. The 15 additions are:

- Hangzhou destination Hub in EN/ZH/KO;
- Zhangjiajie destination Hub in EN/ZH/KO;
- China online arrival card in EN/ZH/KO;
- Chongqing railway station selector in EN/ZH/KO;
- Zhangjiajie park tickets and entrances in EN/ZH/KO.

The current review therefore preserves `634` as historical evidence, not as the
current denominator.

## 2. Search Console reconciliation

Authenticated read-only observation found:

- Page indexing updated 2026-08-17: 59 indexed, 6 not indexed.
- Not indexed: 3 redirect variants and 3 parameter alternate URLs with proper
  canonical selection.
- Sitemap submitted 2026-08-17, last read 2026-08-18: 634 discovered pages.

Google's reports have different dates and processing populations. The Page
indexing report only described 65 known rows in that snapshot; the sitemap
report described a submitted discovery population. Therefore:

- `59 / 634` is not a defensible indexation rate;
- `634 - 59 = 575` is not evidence of 575 unindexed pages;
- the Search Map's coincidental 59 published content identities are a third
  grain and must not be mixed with GSC URLs.

The current Search Map lists 59 published identities: 58 match current guide
identities and one is the entry-requirements system collection. The current
guide registry has 176 identities, so 118 current guide identities are absent
from the Search Map at that grain. This is a Search Map coverage backlog, not
evidence that Google omitted those URLs.

The sanitized 65-row evidence fixture is checked in. The current 649-URL join
finds 58 indexed canonical intersections: one historical indexed URL is now
outside the sitemap (`/china-visa-free-uk-canada/`), and the other GSC variants
remain diagnostics rather than sitemap rows. The remaining 591 current sitemap
URLs are `not-observed` in this older snapshot, not declared `not-indexed`.

Google's own documentation supports keeping these states separate:

- https://support.google.com/webmasters/answer/7440203
- https://support.google.com/webmasters/answer/10264824
- https://support.google.com/webmasters/answer/7451001
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

## 3. Cohort result and evidence gap

The internal guide metadata supplies provisional publication dates for 471
current URLs (157 content identities × 3 locales). On 2026-08-21 all 471 are in
`age-0-13`; none is due for 14/28/30-day escalation.

The other 178 sitemap URLs have no safe first-publication evidence in the new
inventory and remain `unknown-date`. This includes legacy guides, hubs and
system pages. Sitemap `lastmod` is not used as a substitute.

The next durable schema change should add:

```text
firstPublishedAt
publicationDateEvidence
firstObservedInSitemapAt
observedMainCommit
```

Until then, the checker can run, but old-page cohort conclusions remain a data
gap rather than a failed index state.

## 4. Canonical, hreflang, internal links, orphans and parameters

A production read-only crawl at 2026-08-21 00:15 China time checked all 649
sitemap URLs with the final checker.

Results:

- 649 fetched;
- no persistent HTTP/redirect failure after bounded retry;
- no self-canonical mismatch;
- no sitemap `noindex`;
- no orphan canonical URL from the sitemap-page link graph;
- hreflang targets exist; the only matrix failure is on 3 Evan author URLs,
  which use `hreflang="zh"` instead of the controlled `zh-Hans` value and thus
  fail exact-code reciprocity;
- 79 rendered internal link occurrences contain query parameters, chiefly
  internal UTM/CTA links.

The author hreflang issue is a local consistency defect, not a mass indexing
incident. Expected: `zh-Hans` on all three author pages. Current: `zh`.

Internal parameter links are not sitemap entries and their canonical owners are
correct, but they create crawl variants and blur acquisition vs CTA attribution.
The production fix should replace internal UTM semantics with controlled CTA
event dimensions after the measurement design is approved.

## 5. Entity graph and freshness

PR #74 added the missing city mappings and entities identified during review.
The confirmed Guangzhou defect is now resolved in source: all six Guangzhou Hub
support guides resolve `city-guangzhou`.

The resolver now returns both resolved entity IDs and unmapped tokens. Runtime
compatibility still uses `country-china` when nothing maps, but audits can no
longer mistake that fallback for complete entity coverage.

Current coverage:

- 11 controlled destination tokens;
- 176 runtime guide identities: 157 independent and 19 legacy;
- 85 guides contain at least one unmapped token;
- 40 guides use the country fallback because no token maps;
- 142 unique unmapped tokens.

This does not mean 142 new city entities should be created. Tokens include
attractions, regions, routes and compound destinations. Central review must
approve a controlled place-token registry and migrate in bounded batches.
The default command is therefore a read-only inventory and exits successfully;
`--strict` is separately tested and fails while any unmapped debt remains. It is
not the default development gate until central review classifies that debt.

Freshness policy is deterministic and fail-closed:

- all 24 pillars currently used by the 176-guide runtime registry have an
  explicit baseline; an unknown pillar throws instead of becoming `low`;
- 35 explicit overrides preserve first-Search-Map guide decisions that would
  otherwise be lower than their broad pillar baseline, including `medium` and
  `critical` cases;
- four additional safety, accessibility and airline-rule identities have
  explicit `high` minimums;
- booking/ticket topics may raise urgency but never lower an explicit minimum.

This policy classifies review urgency only. It never fabricates a verification
date or sitemap `lastmod`.

## 6. Conversion chain

The site can reliably persist an inquiry, but the full chain is incomplete:

```text
landing (partial) → shared guide CTA (not first-party persisted)
→ inquiry persisted (authoritative) → purchase (no source)
```

The internal event contract enforces:

- controlled IDs and canonical paths;
- no PII/referrer/query/free-text fields;
- explicit landing cohort and observation cutoff;
- ordered landing → CTA → persisted-inquiry relationships;
- server authority for inquiry and a controlled purchase source;
- verified-test exclusion;
- idempotent event/inquiry/purchase identities and terminal refund/void status;
- unique-session rates, with unavailable CTA linkage reported as `null`;
- `purchase = null/SOURCE_UNAVAILABLE` until an order owner exists.

Central must choose an organic source-classification method and an authoritative
purchase ledger before production wiring. No GA4 or Cloudflare setting changed.

## 7. Route Reality Checker

The bounded seven-input direction is feasible only after specification changes.
The current decision remains:

- specification technically feasible: **no as written; yes after revisions**;
- test model sufficient: **no**;
- blocking defects: **B01–B10**;
- required revisions: **R01–R12**;
- public implementation authorized: **false**;
- indexable page authorized: **false**.

The internal witness reproduces arithmetic contradictions and invariants. It is
not a product engine, route, API, registry entry or public page.

## 8. Internal consultation interfaces

Hotel, ticket and route intent use separate finite contracts and deterministic
failure codes. The test stub has no network or inventory and always states:

```text
validation = validated
persistence = not-attempted
inventory = not-checked
price = not-quoted
booking = not-promised
```

Passport numbers/images, payment data, live availability and guarantees are
rejected. Only a future successful persistence transaction may return
`accepted`; this stub never does.

## 9. Risks and required central decisions

| Priority | Risk / decision | Required action |
|---|---|---|
| Blocking | No current persistent GSC URL Inspection/Page indexing export for the 649 population. | Approve a dated, read-only evidence export cadence; never overwrite snapshots. |
| Blocking | Route Checker B01–B10. | Employee 4 revises the specification before any product build. |
| Blocking for purchase KPI | No authoritative purchase owner. | Select order/finance source and statuses, or keep metric unavailable. |
| High | 178 URLs lack verified publication evidence. | Add first-publication fields and backfill only with evidence. |
| High | 142 unmapped place tokens. | Approve controlled registry and migrate in bounded batches. |
| High | Shared structured-guide CTA absent from first-party ledger. | Approve event/consent design before wiring. |
| High | Search Map lacks 118 current guide identities. | Employee 7 reconciles its identity ledger; do not treat this as a Google indexing result. |
| Medium | Three author pages use `zh`, not `zh-Hans`. | Fix helper and recheck three URLs. |
| Medium | 79 internal query-link occurrences. | Replace internal UTM with CTA dimensions after approval. |

## 10. Verification results

Executed on the current branch and integration base:

| Check | Result |
|---|---|
| Focused foundation tests | **67/67 passed** |
| Full `test:inquiry` suite | **370 passed, 0 failed, 1 skipped** out of 371 |
| Skipped assertion | Local Windows has no `jq`; the jq-filter execution assertion remains required in CI and was not reported as passed. |
| `guide:check` | **passed**; 157 independent guide folders |
| `content:check` | **passed** |
| TypeScript `typecheck` | **passed** |
| Production `build` | **passed**; 694 static pages generated |
| Postbuild search-platform export check | **passed**; 27 section hubs, 81 collection hubs and 3 profiles |
| Live cohort/technical crawl | **completed with declared data gaps**; 649 URLs, 58 exact indexed intersections, 0 exact known-not-indexed intersections, 591 not observed in the older GSC snapshot; one hreflang root cause across 3 author URLs |
| `git diff --check` | **passed** |

The focused count includes Route counterexamples, cohort boundaries, the full
176-guide entity ledger and strict-mode behavior, Search Map freshness parity,
funnel authority/null semantics, consultation privacy/failure states and the
two Windows line-ending regressions.

## 11. Scope and authorization

This branch contains internal docs, deterministic checkers, test contracts and
the smallest testability refactor for entity/freshness policy. It does not:

- change GA4, Cloudflare or Search Console;
- submit or request indexing;
- create a public tool, API or indexable page;
- connect inventory or payment systems;
- deploy, merge or create a PR.

**SEO TECHNICAL FOUNDATION READY — CENTRAL APPROVAL REQUIRED**
