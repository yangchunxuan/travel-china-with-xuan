# Final cross-file QA — China arrival system

- QA date: **2026-08-20 (Asia/Shanghai)**
- Repository baseline: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
- Scope: the 11 reviewed content/control files plus this QA record
- Worktree import: only `docs/organic-growth/arrival-system-draft/` was added

## Verdict

**PASS FOR CENTRAL REVIEW, NOT FOR PUBLICATION.** The 11-file package is
internally consistent after the corrections recorded below. The Hub and the
Homeground online-arrival-card guide both remain unpublished. Release-day
source checks, central release authorization and production readback remain
mandatory external gates.

## Check results

| Check | Result | Evidence / boundary |
|---|---|---|
| Latest repository baseline | **PASS** | All baseline-bearing staging files use `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`; no prior baseline hash remains. Target worktree `HEAD` and `origin/main` both resolved to that commit. |
| PR #74 versus publication state | **PASS** | PR #74 is recorded as merged at `ef189874`, while `china-online-arrival-card` is consistently `code-integrated / public page not live`. Search Map `not-published`, empty live URLs and central release status override file presence and draft `datePublished`. |
| Owner-count convention | **PASS** | `owner-audit.md`, all three Hub frontmatters and `internal-links.md` now agree on **29 existing published/live owners + 1 code-integrated but not-live owner**; code identity count is 30. |
| Food/plants/animal-products owner | **PASS** | `food-inventory.md`, `owner-audit.md`, `gap-spec.md` and `internal-links.md` agree it is the existing live, indexable, trilingual canonical. Future work is an in-place source/governance update, never first publication or a synonym page. |
| Package filename references | **PASS** | README names `hub.en.md`, `hub.zh.md`, `hub.ko.md`, `owner-audit.md`, `dynamic-ledger-research.md`, `food-inventory.md`, `gap-spec.md`, `internal-links.md`, `source-log.md`, `image-plan.md` and `qa.md`; every named file now exists. Guide-local `source-log.md` / `image-plan.md` references are contextually scoped. |
| Trilingual Hub structure | **PASS** | Each locale has 1 H1, 8 H2, 2 H3, 7 pre-flight task rows, 6 port steps, 2 scenarios, 9 failure-console rows and 5 first-night checks. Facts, warnings and recovery edges are parity-aligned. |
| Hub internal links | **PASS** | Each locale contains 22 active internal-link occurrences across the same 14 normalized slugs. All active targets resolve on the baseline. `china-online-arrival-card` has **zero Homeground internal links** in EN/ZH/KO; its proposed paths appear only as non-clickable inventory text. |
| Source access dates and traceability | **PASS** | Hub `lastFactReview`, the trilingual dynamic-source note, `source-log.md` and all 35 dynamic-ledger fact rows use 2026-08-20. Official arrival-card and non-hotel-registration URLs are identified; release-day reopening is explicit. |
| Dynamic risk versus failure fallback | **PASS** | Every ledger row has a risk, cadence, invalidation action, pre-publication check, fallback and last-checked date. Entry, arrival card, Customs, SIM/eSIM, payment, registration and airport failures fail closed without timing, admission, activation or refund promises. |
| Arrival-card exemption-set consistency | **PASS after correction** | The package now distinguishes the seven categories in the dated 2025 NIA announcement from the eighth category visible in the live official form reviewed on 2026-08-20. Publication requires re-reconciling both sources; travellers must not self-declare the managed courtesy category. |
| Image/privacy boundary | **PASS** | `image-plan.md` requires an original neutral workflow diagram and prohibits passports, cards, order data, QR/barcodes, precise locations, logos, screenshots and AI documentary border scenes. |
| Scope / duplicate control | **PASS** | No nationality, 240-hour city, eSIM/provider, payment-app, airport, hotel-platform or arrival-card synonym expansion is authorized. Every new fact routes to an existing owner or the single route-only Hub. |
| Imported Git scope | **PASS** | The staged diff contains exactly 12 new Markdown files, all under `docs/organic-growth/arrival-system-draft/`; no route, registry, sitemap, runtime, asset, homepage or business-logic file changed. |
| Whitespace / patch integrity | **PASS** | `git diff --cached --check` completed with no error after Markdown hard-break whitespace was normalized. |
| Repository generated-artifact checks | **BASELINE BLOCKED** | `guide:check` reports the baseline generated guide registry stale; `content:check` reports the baseline manifest stale; `check:search-platform-export` requires the absent build output `out/sitemap.xml`. This docs-only diff does not touch any input or output of those generators. No full-build claim is made. |

## Post-import automated checks

- Trilingual structure: each Hub has 1 H1, 8 H2, 2 H3, 22 internal-link
  occurrences, 14 unique linked owners and zero active Homeground arrival-card
  links.
- Canonical-link validation: 66 locale occurrences, 40 unique URL strings and
  **0 unresolved targets**, including the legacy localized 240-hour route.
- Content size/control counts: English Hub 1,689 regex-counted words; dynamic
  ledger 35 fact rows and 28 official/first-party source rows; core source log
  23 entries.
- Stale-marker scan: no prior `cbbfdda` baseline, ambiguous
  `code-owner-merged-main-live-not-published` status, open-Draft PR wording,
  replacement character, TODO/TBD marker or local `C:\\Users` path remains in
  the imported package. The old ambiguous enum appears only in this QA's
  correction history below.

## Corrections made during this QA

1. Replaced the ambiguous Hub frontmatter value
   `code-owner-merged-main-live-not-published` in all three locales with
   `code-owner-merged-main-public-page-not-live`.
2. Added the scope-qualified `29 live + 1 code-integrated/not-live` release
   ledger to all Hub frontmatters and `internal-links.md`.
3. Added parity-matched Hub source/freshness notes for the NIA arrival-card
   service, fraud warning and NIA/State Council non-hotel registration guidance,
   all accessed 2026-08-20.
4. Replaced residual “pending owner” wording with
   `code-integrated / not-live`, and made the link gate confirm current-main
   presence rather than imply PR #74 is still unmerged.
5. Corrected `gap-spec.md`: the hotel FAQ revision is already merged; the food
   slug is already in the Search Map published baseline; New Zealand is included
   in the coordinated existing-owner review.
6. Corrected the arrival-card dynamic ledger and source log so the current
   eight-versus-seven exemption-source distinction is not flattened.

## Central gates still required

- Reopen every P0 source on the actual publication day, including the current
  MFA/NIA nationality and 240-hour records, the live NIA arrival-card form, the
  seven-region accommodation pilot, Customs catalogue/process, operator/device
  support and payment-product terms.
- Complete the same-week existing-owner review, including UK, Canada, US, New
  Zealand, Singapore, the 240-hour route and the system collection; reconcile
  Singapore and hotel metadata dates without creating new owners.
- Keep the arrival-card task as plain text until central explicitly releases it
  and all three production URLs pass HTTP, canonical and indexability readback.
- Keep this Hub docs-only until central approves a route, registry/indexation
  state, asset and final source/parity/link QA.

**CHINA ARRIVAL SYSTEM READY — CENTRAL REVIEW REQUIRED**
