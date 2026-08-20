# QA and release gates

## Scope of this delivery

This branch changes documentation only. It does not create or modify an article, destination Hub, Registry, route, component, image, dependency, API, tool, public dataset, CI rule, deployment or PR. Consequently, application typecheck, inquiry tests, production build and browser rendering are **not evidence for this docs-only artifact** and are not claimed here. They become mandatory for each implemented article package below.

## Docs-only verification record

Baseline and checks will be recorded against:

- branch: `docs/employee-1-transport-decision-network-live-sync-20260821`
- base/initial HEAD: `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
- final live-sync date: `2026-08-21` (Asia/Shanghai)
- expected changed scope: only `docs/organic-growth/transport-decision-network-2026-08-20/`

| Check | Acceptance | Result |
|---|---|---|
| latest-main baseline | Branch begins at current `origin/main`; PR #74 merge is included | `PASS — HEAD = origin/main = ef1898745a3c7a6e7cd308aa341c352f24fe9d01 before this docs commit` |
| PR #74 state | Merge commit is in the baseline; all five identities have live evidence | `PASS — merged at ef189874; EN/ZH/KO HTTP 200 + sitemap on 2026-08-21` |
| remote inventory | No candidate was added or expanded during this repair | `PASS — copied canonical inventory retained; five proposed items deferred` |
| open PR/Issue duplicates | Exact proposed slugs and topic IDs return no matching open PR or open Issue | `PASS — GitHub read-only search` |
| canonical coverage | All ten cities have Hub/airport/rail/stay/attraction/next-city and error-recovery disposition | `PASS — design review` |
| status truth | PR #74 identities are called published only with deployed evidence; remote Hubs remain non-live | `PASS — four network identities plus arrival-card identity verified in EN/ZH/KO` |
| source ledger | Every implementation package points to official source IDs; limitations/recheck are explicit | `PASS — design review` |
| image truth | Real/place-accurate/rights-clear rule; AI documentary images zero; gaps marked assets needed | `PASS — design review` |
| internal links | Published Zhangjiajie/Hangzhou Hubs are usable; held/remote Hubs and proposed owners remain conditional | `PASS — design review` |
| Markdown local links | Every relative package link resolves | `PASS — 7 checked; 0 missing across 6 Markdown files` |
| source URLs | Every `http(s)` URL is syntactically valid and uses an intended official/file-page domain | `PASS — 96 URL tokens; 0 syntax errors; domain/scope reviewed in source ledger` |
| candidate integrity | Exactly five new specifications remain proposed/deferred; all other future inventory remains hold/defer | `PASS — 5 PROPOSED / DEFER; no writing authorization` |
| forbidden products | No public selector, timetable/price DB, API or live data artifact proposed | `PASS — editorial/docs-only boundary explicit` |
| whitespace | `git diff --check` and staged diff check pass | `PASS — staged diff check exit 0` |
| worktree scope | No modification outside this docs directory | `PASS — exactly 6 staged files in the expected directory` |

## Canonical QA before implementation authorization

Central should reject or merge a candidate unless all answers are yes.

1. Is there one controlling traveller input that current owners do not already use?
2. Does the page change a door-to-door choice rather than repeat a city overview?
3. Is the reverse direction covered by the same owner unless the decision truly changes?
4. Is wrong-node recovery unique and executable?
5. Are at least four current non-image official/first-party sources available for dynamic transport tasks, with enough scope to support the decision?
6. Is there a real, exact-location, rights-clear hero candidate or an honest `ASSETS NEEDED` status?
7. Are the city Hub and 2–4 relevant execution owners live, or are future link dependencies clearly conditional?
8. Has a human checked main, remote inventory, open PR/Issues, Search Map and Topic Universe again on the start date?
9. Has a tool seed been centrally reassigned to editorial if the deliverable is an article?
10. Can the page remain useful without a live timetable, fixed price or permanent route taxonomy?

## Article content QA

For each approved owner, the reviewer records `PASS`, `HOLD` or a concrete defect for every row.

| Area | Required evidence |
|---|---|
| Direct answer | First screen states what controls the decision and distinguishes pre-book choice from post-book confirmation |
| Exact identities | Airport codes, terminal, full station/port/gate Chinese and English names are correct and current |
| Decision matrix | Rows are distinct and actionable; no permanent timetable/fare/direction promise |
| Scenarios | At least two complete traveller chains with different hotel/base, hour, luggage, mobility or next-booking constraints |
| Door-to-door chain | Access + process allowance + line haul + arrival-side transfer + hotel/base + next hard booking |
| Answer-changing conditions | Shows when the default reverses, including already-ticketed, late/early, luggage and disruption cases |
| Recovery | Identify current node; verify official live status; compare hard deadline; change/rebook/overnight/downgrade; no false guarantee |
| Boundary | Does not repeat national rail process, stay owner, Hub, attraction owner, border eligibility or another city-pair owner |
| Dynamic facts | Each has official URL, actual `checked_at`, scope, exception, trigger and conservative wording |
| Sources | Minimum source count met; image licences do not count as transport-fact sources; Sources default-collapsed |
| CTA | Requests date, party, exact ticket/flight, hotel/base, luggage/mobility and next booking; no $69/$129 pitch |

## Trilingual parity QA

Run a structural parity script plus human review. Machine equality alone is insufficient.

- exact block ID/type/order;
- exact table row/column and comparison/list/source cardinality;
- exact numbers, dates, codes, station/airport/gate names and negative conclusions;
- same exceptions, uncertainty and recovery order;
- same source URLs and reviewed dates in the same order;
- locale-correct `/`, `/zh/`, `/ko/` internal links;
- natural Chinese and Korean headings, sentence order and transport terms, not English syntax with substituted words;
- no shortened Chinese/Korean matrix, scenarios, recovery or final checklist;
- title, description and H1 unique and natural in each language.

## Image QA

1. Reopen the source/file page and licence immediately before download.
2. Verify exact station/airport/port/gate identity visually and against metadata/coordinates.
3. Confirm author, licence and direct licence URL; resolve any conflicting licence text.
4. Search repository provenance and hashes for primary-image reuse.
5. Hash the untouched original before crop/convert, then hash the derivative.
6. Record crop and dimensions; do not remove/add documentary elements.
7. Verify EN/ZH/KO alt and captions make the same factual claim.
8. Load every image at production URL and check aspect ratio, focus, caption and licence record.
9. Reject generic skyline, another city/station, inaccurate replacement, hotlink, unknown source and AI-generated/AI-assisted documentary image.
10. If an exact image is unavailable, use fewer images and mark `ASSETS NEEDED`.

## Repository and automated gates for each article

Run from a new worktree based on the then-latest `origin/main`, on a unique article branch.

```bash
npm run guide:generate
npm run guide:check
npm run content:check
npm run typecheck
npm run test:inquiry
npm run build
npm audit --omit=dev
git diff --check
```

The production build's configured postbuild checks must complete, including font/export/search-platform validation. A generated Registry change is reviewed as generated output; writers do not manually edit the central Registry. If a failure is unrelated to the article, preserve the full command/output and prove it against a clean latest-main worktree rather than claiming a pass.

Additional repository checks:

- only the article's `content/guides/<slug>/`, `public/images/guides/<slug>/`, and generated output expected by the current Lite workflow changed;
- metadata JSON parses; title/description/H1 are unique; canonical is correct;
- all internal links resolve to already published paths in EN/ZH/KO;
- source log and image plan are inside the article directory;
- source dates equal the actual final recheck date, not the research-package date;
- no homepage, shared font, package dependency, CI, permission, business-price or unrelated article change;
- `npm audit --omit=dev` findings are recorded exactly; no unrelated dependency update is made from an article branch.

## Browser acceptance

Review all three locales on desktop and at `390px` width. Also test `320px` if the matrix is dense or the site's Lite workflow still requires it.

For every locale:

- page renders from the production build/export, not only dev mode;
- title wraps naturally without orphaned code/station fragments;
- matrix remains usable without hidden decision columns; horizontal scrolling is intentional and signposted if used;
- no page-level horizontal overflow at 390px/320px;
- exact airport/station/gate names remain legible and are not truncated into ambiguity;
- images load, crop correctly and do not shift layout;
- captions and alt text match the actual image/place;
- Sources starts collapsed and expands with keyboard/touch;
- internal links, CTA and locale switch work;
- focus state, heading order, table semantics and contrast remain usable;
- recovery steps are visible and ordered on mobile;
- no fake real-time state, stale badge or placeholder asset is displayed.

## SEO and indexable-export acceptance

- canonical URL exports for EN and locale variants;
- hreflang/locale alternates are mutual and correct;
- no candidate/remote-only Hub link is emitted as live;
- title, description, H1 and structured-data entity are aligned but not mechanically identical;
- Sources and dates render without making the page `noindex` accidentally;
- sitemap/search-platform export includes the approved guide exactly once per intended locale;
- no route, query cluster or generated Registry entry creates a second canonical identity;
- deployed readback matches the built metadata and image URLs.

## Release-day dynamic recheck

The assigned editor signs the following immediately before final commit/PR approval:

- actual ticket/flight/terminal/station/gate examples re-queried;
- airport/railway diagram/operator/metro/road/border/park notices checked for changes;
- every dated example still labelled with its date and scope;
- no planning document is used as current-operation proof;
- uncertain/conflicting claims are conservative or removed;
- source `checked_at` and metadata `sourceReviewedDate` reflect this review;
- wrong-node recovery still works under the current network;
- image licences and source pages remain available.

## Completed PR #74 live-state readback

On `2026-08-21` (Asia/Shanghai), direct GET requests and the live sitemap produced this record:

| Identity | EN | ZH | KO | Live sitemap | Status |
|---|---|---|---|---|---|
| `destination-zhangjiajie` | 200 | 200 | 200 | all three URLs present | `PUBLISHED` |
| `zhangjiajie-national-forest-park-tickets-and-entrances` | 200 | 200 | 200 | all three URLs present | `PUBLISHED` |
| `chongqing-railway-station-selector` | 200 | 200 | 200 | all three URLs present | `PUBLISHED` |
| `destination-hangzhou` | 200 | 200 | 200 | all three URLs present | `PUBLISHED` |
| `china-online-arrival-card` (outside transport-network scope) | 200 | 200 | 200 | all three URLs present | `PUBLISHED` |

The live sitemap itself returned HTTP 200. The shared Search Map's older `inProduction` / `not-published` rows are a central backfill task; they do not override this deployed readback or authorize replacement owners.

## Stop conditions

Central review is required when:

- two canonical owners still plausibly claim the same decision;
- current official sources conflict and the controlling source cannot be determined;
- image location or rights cannot be verified;
- a dynamic claim would require a maintained data product or legal eligibility judgment;
- a future Hub is required for coherent routing but remains held/unpublished;
- the full build fails at a site-wide layer after two scoped repair attempts.

Do not solve these by expanding scope, inventing a source, using a substitute image, creating a second page, or weakening the QA gate.
