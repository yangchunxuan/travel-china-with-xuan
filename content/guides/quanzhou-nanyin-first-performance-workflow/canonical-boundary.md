# Canonical boundary — quanzhou-nanyin-first-performance-workflow

- **topicId:** hg-topic-0807
- **Collection (pillar):** culture-festivals-arts-contemporary
- **Base commit:** origin/main@2f98803d68cd40494be41213d8937232c57dde0a
- **Boundary written before drafting:** yes, 2026-08-22

## The one search task this page owns

A traveller who wants to hear nanyin in Quanzhou needs to **find a performance that is actually
happening, and then follow it** — where the city publishes its own dated listings, what a programme
contains, where to sit, and how to listen without the dialect. It owns the attendance workflow for
this one art form in this one city.

## Slug and task occupancy check

Run 2026-08-22 after `git fetch --all --prune`, against `origin/main` at 2f98803 and against
**every** ref under `refs/remotes` and `refs/heads`. Patterns searched inside `content/guides/`:
`nanyin`, `nanguan`, `quanzhou`.

Across all refs, only two directories matched: `quanzhou-string-puppetry-first-audience` (published
on `origin/main`) and `xiamen-quanzhou-fujian-tulou-route-order` (a route guide, present on several
worker branches). **No ref anywhere contains `quanzhou-nanyin-first-performance-workflow`, a
near-synonym directory, or any nanyin or nanguan guide. No canonical conflict.**

## Adjacent owners and how the border is drawn

| Adjacent owner | Status | What it keeps | What this page must not take |
| --- | --- | --- | --- |
| `quanzhou-string-puppetry-first-audience` | **published on origin/main** | Quanzhou string puppetry: its troupe, its theatres, its first-audience workflow | **Everything about puppetry.** The word appears twice here: once quoting UNESCO's statement that nanyin's repertoire influenced puppet theatre, and once in the "wrong theatre" repair, where the point is that it is a *different* troupe at a *different* venue. Linked as the sibling |
| A future Quanzhou destination guide | not on any ref today | The city: what to see, where to stay, how long to spend | Any destination coverage. Quanzhou's old city appears only as the place you walk in the evening if nothing is scheduled |
| A future Quanzhou maritime-heritage owner | not on any ref today | The Song and Yuan port, the World Heritage inscription | All of it. The maritime story is not told here |
| A future Minnan or Hokkien culture owner | not on any ref today | Minnan language, migration, diaspora culture | The general Minnan picture. Dialect appears only as a listening problem, and the diaspora only where UNESCO's own record explains why nanyin is heard in South-East Asia |
| `foshan-lion-dance-first-performance-workflow` | published on origin/main | Lion dance attendance | The general "find a real performance" argument; linked as the closest structural sibling |
| `inner-mongolia-long-song-first-performance` | published on origin/main | Long song attendance | Ditto; linked |
| `sichuan-opera-face-changing-with-context` | published on origin/main | Sichuan opera and the spectacle problem | Its material; linked as a parallel case |
| `qiaopi-letters-remittances-and-migration` | published on origin/main | Overseas remittance letters and migration | The migration history; linked because it explains the overseas Minnan connection UNESCO records |
| `fujian-tulou-cluster-selection` | published on origin/main | Choosing a tulou cluster | Fujian routing; linked as the wider-trip question |

## Explicit exclusions honoured in the draft

- **No performance calendar of any kind**, real-time or permanent. This is the brief's central
  prohibition for this topic and it is refused in writing, with the reason, in all three languages.
- **No dates, programme titles, ticket prices or telephone numbers**, in any language. Verified by
  grep across the three bodies.
- **No booking, no resale links, no claim that Homeground can obtain or check seats.**
- **No absorption of the string puppetry guide.**
- **No general history of nanyin** beyond what is needed to hear one performance well; the article
  says so in its refusals list.

## How the four forbidden claims were handled

The brief names three claims that must not be made unless the sources support them precisely, and a
fourth follows from them. Rather than silently omitting them, **the article has a dedicated table
that states each claim and then what the sources actually support** — which is more useful to a
reader who will meet these claims elsewhere.

| Forbidden claim | How the draft handles it |
| --- | --- |
| "Tang-dynasty music preserved intact" | Replaced by the provincial source's own attributed wording — that **scholars generally hold** nanyin closely related to Tang and Song music — plus the specific organological observations (the dongxiao described as following the Tang chiba system, and so on). The table says explicitly that this is a set of attributed positions, **not** a claim that a Tang repertoire survives unchanged |
| "Unbroken for a thousand years" | The table states that **no source consulted says this**, and gives what is documented instead: dynastic migration and fusion, three thousand-plus collected pieces, and a currently living practice. The provincial source's headline does use "a thousand years" rhetorically; that phrase appears **only** inside the source list as part of the page title |
| "A fixed ensemble at every performance" | Answered directly from UNESCO, which records **two** vocal formats. The five-position seating is given using the provincial source's own hedge — "the most classic form" — and the body draws attention to that word |
| "A frozen museum piece" (the mirror-image error) | Answered with the troupe's recent national awards, a 2023 national broadcast, and UNESCO's own recording of **urban development as a threatening factor** — a statement about a living practice under pressure |

## Where the original information gain is

Three things on this page are not available in one place elsewhere:

1. **A named method for finding a real date**, distinguishing the culture bureau's monthly schedule
   from the municipal city-calendar entries and saying what each one settles and does not settle.
2. **A cross-listing regularity**: four independent official listings spanning July 2025 to April
   2026 all give the same troupe, the same venue and **seventy minutes**, with start times splitting
   by room. Published as the shape of an evening, explicitly not as a guarantee.
3. **A claims table** that puts the four repeated assertions about nanyin next to what the sources
   actually say — including the negative finding that nothing consulted supports the thousand-year
   claim.

## Internal links used

Only same-language pages already merged into `origin/main` at 2f98803, each verified to have `en`,
`zh` and `ko` bodies: `quanzhou-string-puppetry-first-audience`,
`foshan-lion-dance-first-performance-workflow`, `inner-mongolia-long-song-first-performance`,
`sichuan-opera-face-changing-with-context`, `fujian-tulou-cluster-selection`,
`qiaopi-letters-remittances-and-migration`.

**None appears in the 23-guide reviewed list** in `supabase/tests/guide-search-terms-static.test.mjs`.
`how-to-read-heritage-sites-in-china` was drafted in as a link and then **removed** on discovering it
is in that list; `anshun-dixi-mask-performance-guide` and `why-china-museums-have-stamps` were
natural candidates excluded for the same reason. All thirteen outbound guide links on the built
English page, and twelve on each of the Chinese and Korean pages, return HTTP 200 in the export.

## Tests and checks — honest results

Run in this worktree at base 2f98803.

| Command | Result | Cause |
| --- | --- | --- |
| `npm run guide:check` | **PASS** — 164 independent guide folders verified | — |
| `npm run guide:check-parallel-merge` | **PASS** — both branches survived, output deterministic | — |
| `npm run content:check` | **PASS** | — |
| `npm run typecheck` | **PASS**, first run, no errors | — |
| `npm run check:planning-scope-lines` | **PASS** — headline breaks reproduce the sentence in all 3 languages | — |
| `npx next build` | **PASS** — all three locale pages emitted | — |
| `node tools/prune-production-export.mjs` | **PASS** | — |
| `npm run check:indexable-export` | **PASS** — 12 priority index targets | — |
| `npm run check:search-platform-export` | **PASS** — 27 section hubs, 81 collection hubs; every internal href/src resolves | — |
| `npm run check:font-coverage` | **FAIL (Chinese only)** | **Central: font subset.** See below |
| `npm run check:font-coverage:export` | **FAIL (Chinese only)** | Same cause |
| `npm run test:inquiry` | **554 pass, 3 fail** | **Central: shared counts and registries.** See below |
| `npm audit --omit=dev` | **PASS** — 0 vulnerabilities | — |
| `git diff --check` | **PASS** — no whitespace errors | — |

## Central blocker 1 — Chinese font subset

**Exact command:** `npm run check:font-coverage`
**Exact error:**

```
✗ Chinese editorial font is missing 8 required glyph(s) from app, components, lib and content source:
  君 (U+541B), 孟 (U+5B5F), 弦 (U+5F26), 昶 (U+6636), 琵 (U+7435), 箫 (U+7BAB), 郎 (U+90CE), 闽 (U+95FD)
✓ Korean interface font covers all 1156 required characters.
✓ Korean editorial font covers all 1156 required characters.
```

**Expected:** zero missing glyphs. **Actual:** 8 Han glyphs. `check:font-coverage:export` reports the
same eight against the production HTML, and both Korean subsets pass cleanly there too.

**Central shared location to change:** `public/fonts/homeground-serif-sc.woff2`, regenerated via
`tools/rebuild-locale-fonts.mjs`. **`public/fonts/` was not modified.** Regeneration was also not
possible here: that tool requires `--noto`, `--pretendard`, `--maruburi`, `--fonttools` and
`--python` inputs that are not available in this worktree.

**This is already the reduced list.** A first pass found 14 Han and 3 Hangul missing. The draft was
then rewritten to remove every character that could go without cost to accuracy — the Qin-Han drum
name and the Chinese gloss on one term were dropped, a specific horse reference and a third theatre
name were cut, and three Korean words were rephrased. That cleared 6 Han and all 3 Hangul. The eight
that remain are irreducible:

- **琵 and 箫** — 琵琶 and 洞箫, the two instruments UNESCO names as distinctive. The article cannot
  be written without them.
- **弦** — 三弦 and 二弦, the other two named instruments, and 弦管, nanyin's older name.
- **孟 and 昶** — 孟昶, the figure UNESCO calls the god of music and the provincial record calls the
  founding patron.
- **郎 and 君** — 郎君, his title and the name of the room the small theatre is called after. 君 is
  also required by 思君, one of the documented subjects of the sung repertoire.
- **闽** — 闽南, the region this music belongs to, used throughout.

**No temporary overlay was applied.** Rather than patch a shared file or distort the Chinese text to
make a gate pass, the build was run by invoking the pipeline steps individually (`guide:generate`,
`content:check`, `check:planning-scope-lines`, `npx next build`, `prune-production-export`, the two
export checks) and the font gate was recorded honestly as FAIL. **The browser QA below therefore
reflects the committed content exactly, with no substitution.** Until central regenerates the SC
subset, these eight characters will render from a system fallback font rather than the Homeground
face. This could not be confirmed visually because the Browser pane could not composite frames in
this session, so screenshots were unavailable; the finding rests on the repo's own tool and on an
independent fontkit check of the committed `.woff2`, which agree exactly.

## Central blocker 2 — shared counts and the Search Map

`npm run test:inquiry` → **554 pass, 3 fail**, all three caused by this guide being the 164th
independent guide directory and the 183rd runtime guide. **None is ours to fix.** They are the same
three that any 164th guide would trip:

1. **`supabase/tests/guide-entity-coverage.test.mjs:34`** — expects
   `{ independentGuideCount: 163, legacyGuideCount: 19, runtimeGuideCount: 182 }`; actual
   `{ 164, 19, 183 }`. Central shared location: the hard-coded expected object in that test.
2. **`supabase/tests/search-map-production-sync-static.test.mjs:39`** — `163 !== 164`. Central shared
   location: `docs/organic-growth/search-map.json`, which needs an entry for
   `quanzhou-nanyin-first-performance-workflow`. **Suggested placement:** collection
   `culture-festivals-arts-contemporary`, section `culture`, family `task`, primary intent
   `execute` — matching the sibling `quanzhou-string-puppetry-first-audience`.
3. **`supabase/tests/search-platform-guide-policy.test.mjs:132`** — `assert.equal(runtime.size, 182)`;
   actual 183. Central shared location: the hard-coded 182 in that test.

### No collection blocker for this article

`culture-festivals-arts-contemporary` is already present in `guideFreshnessByPillar` in
`lib/searchPlatformGuidePolicy.ts` at volatility `low`, and
`culture: ["history-people-ideas", "regional-food", "festivals-arts-contemporary"]` is already in
`tools/check-search-platform-export.mjs`. The built guide appears correctly on
`/culture/festivals-arts-contemporary/`. **No central collection change is requested.**

## Browser acceptance

Served from the static export at `http://127.0.0.1:4331`, all three locales, at desktop 1280×900 and
mobile 390×844.

| Check | en | zh | ko |
| --- | --- | --- | --- |
| HTTP status | 200 | 200 | 200 |
| `<html lang>` | `en` | `zh-Hans` | `ko` |
| Exactly one H1 | yes | yes | yes |
| H2 count | 10 | 10 | 10 |
| Tables render | 4 | 4 | 4 |
| Hero loads, 1600×1000 natural | yes | yes | yes |
| Hero rendered at 1280 / 390 | 480×300 / 390×244 | same | same |
| Sources block collapsed, count 6 | "SOURCES (6)" | "资料来源 (6)" | "자료 출처 (6)" |
| Self-canonical correct | yes | yes | yes |
| Page-level horizontal overflow at 390 | **none** (scrollWidth 390 = viewport) | none | none |
| Page-level horizontal overflow at 1280 | none (scrollWidth 1265) | none | none |
| Tables scroll inside their own `overflow-x: auto` wrapper at 390 | yes, 672 px inside 351 px | yes | yes |
| Any cell clipping its own content | none at either width | none | none |
| Internal guide links resolving 200 | 13 of 13 | 12 of 12 | 12 of 12 |

**hreflang:** delivered through `out/sitemap.xml` `xhtml:link` alternates rather than page
`<link rel="alternate">` tags — site-wide behaviour, not specific to this guide. All three URLs carry
the full `en` / `ko` / `zh-Hans` / `x-default` alternate set; verified in the export.

**Korean naturalness:** the Korean body is a rewrite, not a sentence-by-sentence translation. Chinese
terms are transliterated the way Korean writing on Chinese music does it and glossed on first use —
둥샤오, 싼셴, 얼셴, 박판, 랑쥔, 멍창 — and the three repertoire divisions are given as 즈(指), 푸,
취(曲) so a Korean reader can hold them apart. Sentence construction, connectives and register are
Korean throughout; the Chinese source titles in the source list are rendered as Korean descriptive
titles rather than transliterated character strings.

## Zero shared-file change

`git diff 2f98803 --stat -- lib/ app/ components/ docs/ public/fonts/ supabase/ tools/ package.json`
returns empty. The only paths this commit adds are the nine allowed files: eight under
`content/guides/quanzhou-nanyin-first-performance-workflow/` and one hero under
`public/images/guides/quanzhou-nanyin-first-performance-workflow/`.
`lib/generated/guideRegistry.generated.ts` and `content/generated/content-manifest.json` are
regenerated by `guide:generate` during checks; both are **gitignored** and cannot enter the commit.
`out/` is build output and is not committed.
