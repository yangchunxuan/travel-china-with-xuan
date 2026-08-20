# Final live-sync QA — China arrival system

## Control record

- QA date: 2026-08-21
- Base: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
- Source package commit: `6db3f8d1c4d67b8da5ea750d3a1d9bfa7bae865a`
- Branch: `article/worker-6-arrival-system-live-sync-20260821`
- Package scope: 12 Markdown documents under `docs/organic-growth/arrival-system-draft/`; no package JSON, runtime content, route, Registry, or sitemap file.
- Canonical page/execution owner for First 24 Hours: `employee-4-planning`.
- Dynamic-source maintenance and EN/ZH/KO draft handoff: `employee-6-entry-practical`.

## Verdict

**PASS FOR CENTRAL REVIEW; FIRST 24 HOURS IS NOT AUTHORIZED FOR PUBLICATION.**

The China Online Arrival Card owner is live in English, Chinese, and Korean and is present in the production sitemap. The First 24 Hours artifact remains a durable draft with `centralDecision: pending-review` and `publicationStatus: not-published`. This docs-only sync does not create or authorize a route, Registry entry, sitemap record, merge, or deployment.

## Acceptance checks

| Check | Result | Evidence / boundary |
|---|---|---|
| Clean baseline | PASS | New worktree began at exact `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`. |
| Durable source package | PASS | All 12 documents were copied from exact old commit `6db3f8d1c4d67b8da5ea750d3a1d9bfa7bae865a`. |
| PR #74 state | PASS | PR #74 is merged at `ef189874`; five content identities were accepted in the production readback checked 2026-08-21. |
| PR #74 identities | PASS | `destination-zhangjiajie`, `china-online-arrival-card`, `zhangjiajie-national-forest-park-tickets-and-entrances`, `chongqing-railway-station-selector`, and `destination-hangzhou`. |
| Production sitemap | PASS | `https://homegroundchina.com/sitemap.xml` returned 649 URL records, 649 unique locations, and 0 duplicates; this is discovery evidence, not a search-index or search-volume claim. |
| Five-identity locale readback | PASS | All five identities × EN/ZH/KO = 15 live URLs returned HTTP 200, were self-canonical, and appeared exactly once in the sitemap; checked 2026-08-21. |
| Arrival-card locale owner | PASS | `/guides/china-online-arrival-card/`, `/zh/guides/china-online-arrival-card/`, and `/ko/guides/china-online-arrival-card/` returned HTTP 200, `index, follow`, self-canonical, complete locale alternates, and one sitemap record each. |
| Owner inventory | PASS | Bounded arrival-system inventory is 30 live owners. First 24 Hours is excluded because it is not published. |
| Ownership split | PASS | Employee 4 planning is the sole canonical page/execution owner; employee 6 maintains dynamic sources and supplies the trilingual draft handoff. No dual-owner wording remains. |
| First 24 Hours status | PASS | Durable draft; `centralDecision: pending-review`; `publicationStatus: not-published`; no live URL, route, Registry entry, or sitemap record. |
| Hub structure parity | PASS | Each locale has 1 H1, 8 H2s, and 2 H3s, with 7 preflight task rows, 6 port steps, 2 scenarios, 9 failure-console rows, and 5 first-night actions. |
| Failure recovery | PASS | Every core task retains a failure path; the arrival-card path also retains official-form and port fallback boundaries. |
| Hub internal links | PASS | Each locale has 25 internal-link occurrences covering 15 unique owner slugs; each has 3 active locale-correct arrival-card links and 0 active First 24 Hours links. |
| Cross-locale link validation | PASS | 75 link occurrences, 43 unique URL strings, and 0 unresolved canonical targets against the clean worktree. |
| Referenced JSON | PASS / N/A FOR PACKAGE | No JSON exists in the 12-document package. The referenced Search Map JSON parsed successfully, matched all five PR #74 identities, and retained First 24 Hours as deferred. It was read only and not modified. |
| Dynamic-fact freshness | PASS WITH FLAGS | 34 policy/product rows remain one day old under their stated maximum ages; A-03 was triggered by the live-state change and updated to 2026-08-21. A-01/A-02 retain 2026-08-20 and are labeled `PUBLICATION-DAY RECHECK PENDING`. |
| Older owner reviews | PASS WITH FLAGS | July/August owner-review dates remain labeled `STALE FOR PUBLICATION—FACT NOT ASSERTED CHANGED` where applicable; this sync does not pretend the underlying policy changed or advance dates without reopening sources. |
| Conditional fact rows | PASS | Per-itinerary and per-product checks remain `NOT APPLICABLE—NO DATED ITINERARY/PRODUCT CITATION` where no named trip or product exists. |
| Source-date integrity | PASS | Policy/product source access remains 2026-08-20; repository and production live-state evidence is separately marked `checkedAt: 2026-08-21`. No submission window, entry eligibility, purchase probability, or search volume was inferred. |
| Image and privacy scope | PASS | Image plan remains a docs-only proposal; no passport, card, QR code, precise location, or other identifying data is introduced. |
| Package scope | PASS | Exactly 12 Markdown documents are in scope. No runtime/app content, route, Registry, sitemap, homepage, business logic, or asset was added or changed. |
| Whitespace validation | PASS | `git diff --cached --check` completed without whitespace errors after all 12 documents were staged. |

## Trilingual draft counts

| Locale | H1 / H2 / H3 | Internal links | Unique owner slugs | Arrival-card links | Active First 24 Hours links |
|---|---:|---:|---:|---:|---:|
| English | 1 / 8 / 2 | 25 | 15 | 3 | 0 |
| Chinese | 1 / 8 / 2 | 25 | 15 | 3 | 0 |
| Korean | 1 / 8 / 2 | 25 | 15 | 3 | 0 |

English visible-body count is approximately 1,721 regex words. Chinese and Korean are natural rewrites with matching task, warning, recovery, and source-control coverage rather than literal machine translations.

## Status and source boundaries retained

- The merged repository Search Map is a historical pre-release snapshot. Its old `not-published` value for the five PR #74 identities was not edited in this docs-only ticket; explicit production readback and sitemap verification dated 2026-08-21 supersede it for live-state reporting.
- Arrival-card publication does not authorize the First 24 Hours Hub. Employee 4 planning must make the canonical implementation decision and, if approved later, own any route, Registry, and sitemap work.
- A repository/live-state sync is not an official-source policy recheck. Official facts keep their real access dates and event-trigger labels.
- Sitemap presence does not establish external search-engine indexation, impressions, or search volume.
- No statement promises an arrival-form submission window, admission decision, visa/visa-free eligibility, mobile-service purchase, payment acceptance, or recovery outcome.

## Central review gates

1. Employee 4 planning must decide whether the First 24 Hours canonical should proceed; the current decision remains pending.
2. Reopen publication-day and high-risk official sources before any later Hub release. Resolve A-01/A-02 rather than carrying the pending label into publication.
3. Keep one live arrival-card canonical and avoid country-by-country or near-synonym duplicates.
4. If the Hub is authorized later, employee 4 must implement and validate its route, Registry owner, localized canonicals, sitemap entry, and production readback as a separate change.
5. Continue employee 6's dynamic-source ledger handoff without converting maintenance responsibility into page ownership.

## Delivery boundary

This package is ready for central review only. The branch may be committed and pushed, but this ticket creates no PR, performs no merge, and performs no deployment.

**ARRIVAL SYSTEM LIVE SYNC READY — CENTRAL REVIEW REQUIRED**
