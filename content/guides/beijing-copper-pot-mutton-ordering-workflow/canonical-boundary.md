# Canonical boundary — beijing-copper-pot-mutton-ordering-workflow

- **topicId:** hg-topic-0760
- **Collection (pillar):** culture-regional-food
- **Base commit:** origin/main@2f98803d68cd40494be41213d8937232c57dde0a
- **Boundary written before drafting:** yes, 2026-08-22

## The one search task this page owns

A traveller sitting down at a Beijing copper-pot mutton restaurant needs to **order the right things
in the right order and cook them safely**, when the menu is in Chinese and the meal has an
unfamiliar sequence. It owns the ordering workflow and the table procedure — not the dish's history,
not where to eat it, and not hotpot in general.

## Slug and task occupancy check

Re-run 2026-08-22 after `git fetch --all --prune`, against `origin/main` at 2f98803 and against
**every** ref under `refs/remotes` and `refs/heads`. Patterns searched inside
`content/guides/`: the exact slug, `beijing-copper-pot*`, `*mutton*`, `*hotpot*`, `*shuan*`.

The only matches returned were `chengdu-shuangliu-or-tianfu-airport` on three refs, which the
`*shuan*` pattern caught on the substring "shuangliu" — an airport guide, not a food guide.
**No ref contains this slug, a near-synonym directory, or a substantively identical search task.
No canonical conflict.**

### Note on the base commit

This worktree was originally branched from `e7a0d19`. `origin/main` advanced to `2f98803` during
this batch, so before writing any commit the branch was **reset to the newest `origin/main`** with
no work in progress on tracked files (only the two untracked new directories existed). All checks,
the build and the browser QA reported below were run against `2f98803`, not against the older base.
After the reset, all five internal link targets were re-verified as still present and still absent
from the reviewed-guide list.

## Adjacent owners and how the border is drawn

| Adjacent owner | Status | What it keeps | What this page must not take |
| --- | --- | --- | --- |
| `first-shared-meal-in-china` | published on origin/main | Who orders, how sharing works, how the bill is settled | **All general shared-table etiquette.** This page assumes it and links to it |
| `china-regional-food-route` | published on origin/main | Routing meals across regions | Any multi-city or multi-region food itinerary |
| `hunan-cuisine-balanced-first-meal` | published on origin/main | Ordering a balanced first meal in one regional cuisine | The general "order a balanced meal" argument; linked as the sibling problem |
| `how-guangzhou-morning-tea-works` | published on origin/main | Another meal's internal mechanics | Any yum-cha material |
| A future Sichuan or Chongqing hotpot owner | not on any ref today | Spicy hotpot, its broths, its dips | **Anything beyond the one contrast paragraph** needed to stop a reader ordering this meal expecting that one |
| A future Beijing roast duck or Beijing snacks owner | not on any ref today | Roast duck, jianbing, douzhi and the rest | All of it. Roast duck is not mentioned |
| A future Beijing food guide or "best of" list | not on any ref today | Where to eat in Beijing | **Every ranking, price and booking question** |
| A future halal-food-in-China owner | not on any ref today | Halal certification, how to verify it | Certification. This page states it does not verify it, and refers the reader to the house |
| A future per-cut butchery explainer | not on any ref today | Lamb anatomy | Any cut beyond the two a verified authority names |

## Explicit exclusions honoured in the draft

- **No restaurant ranking, booking, live price or queue information**, in any language.
- **No Beijing food top-ten**, no roast duck, no Beijing snacks.
- **No Sichuan or Chongqing hotpot treatment** beyond one contrast sentence whose only job is to
  correct the expectation a first-time diner arrives with.
- **No national hotpot history.** The historical material is confined to the three documented
  houses and is used to explain why the meal is shaped as it is.
- **No halal certification guidance and no allergen guarantee**, both refused in writing.
- **No page per cut.** Two cuts are named because one authority names two.
- **No cooking time in seconds.** This is the article's central refusal and has its own callout.

## How the "no unsourced timing" rule was met

The brief forbids an unsupported claim that a few seconds of cooking is definitely enough. Rather
than quietly omitting a timing, the article **makes the absence the point**:

- A dedicated warning callout in all three languages states that no Chinese food-safety authority
  publishes such a figure and that this page will not invent one.
- In its place it gives the **sourced principle**: Beijing CDC's thorough-cooking description
  (poultry until juices run clear with no pink; eggs and seafood fully boiling; soups and stews
  boiled at least a minute; large pieces longer) and its statement that most micro-organisms
  struggle to survive above 70 °C or below 4 °C.
- It adds a Homeground editorial instruction that is clearly ours: longer for children, older
  relatives, pregnant and immunocompromised diners.
- `source-log.md` records that the widely repeated "seven seconds" and "as soon as it changes
  colour" claims trace to no authority found here, **including the Commons caption on a sibling
  image file**, which is explicitly ruled out as a source.

## How the "cuts must be sourced" rule was met

The brief forbids identifying cuts by looking at a photograph. Two cuts — **leg (羊腿肉)** and
**upper shoulder (羊上脑)** — are named because Beijing's market regulator names them. The
Jingzhou agriculture bureau's cut diagram, which would have supplied more, **could not be fetched**
(connection failed on both schemes), and no national carcass-division standard text was reachable.
**Rather than fill the gap, the article stops at two cuts** and converts every other cut word on a
menu into a question for the reader to ask. `source-log.md` records the failed fetches.

## The comparison table is the original information gain

The article's central contribution is a four-way table of **officially documented** versions of the
same dish — Beijing SAMR's home version, Donglaishun via the Dongcheng district government,
Yangfang Shengli via the Beijing municipal government, and Yitiaolong via the Ministry of Commerce's
time-honoured brand register. They disagree about broth, sourcing, knife and dip. This is what
delivers the brief's requirement to explain **regional and house variation in the sesame dip** and
to identify cuts from **an operator or an authority**, without ranking anyone. It is labelled "not a
ranking" in all three languages, and three cells honestly read "not specified" where a source is
silent.

## Internal links used

Only same-language pages already merged into `origin/main` at 2f98803, each with `en`, `zh` and `ko`
bodies: `first-shared-meal-in-china`, `hunan-cuisine-balanced-first-meal`,
`how-guangzhou-morning-tea-works`, `china-regional-food-route`, `how-to-pay-in-china-as-a-tourist`.

**None appears in the 23-guide reviewed list** in `supabase/tests/guide-search-terms-static.test.mjs`
(verified against the file at 2f98803). `china-24-solar-terms-weather-food-daily-life` and
`china-community-canteens-explained` were natural food-culture candidates and were **left out for
exactly that reason**. All twelve outbound guide links on the built English page, and eleven on each
of the Chinese and Korean pages, return HTTP 200 in the export.

## Tests and checks — honest results

Run in this worktree at base 2f98803.

| Command | Result | Cause |
| --- | --- | --- |
| `npm run guide:check` | **PASS** — 164 independent guide folders verified | — |
| `npm run guide:check-parallel-merge` | **PASS** — both branches survived, output deterministic | — |
| `npm run content:check` | **PASS** | — |
| `npm run typecheck` | **PASS** (after fixing my own error, below) | — |
| `npm run check:planning-scope-lines` | **PASS** — headline breaks reproduce the sentence in all 3 languages | — |
| `npx next build` | **PASS** — all three locale pages emitted | — |
| `node tools/prune-production-export.mjs` | **PASS** | — |
| `npm run check:indexable-export` | **PASS** — 12 priority index targets | — |
| `npm run check:search-platform-export` | **PASS** — 27 section hubs, 81 collection hubs; every internal href/src resolves | — |
| `npm run check:font-coverage` | **FAIL** | **Central: font subset.** See below |
| `npm run check:font-coverage:export` | **FAIL** | Same cause |
| `npm run test:inquiry` | **554 pass, 3 fail** | **Central: shared counts and registries.** See below |
| `npm audit --omit=dev` | recorded in the commit message | — |
| `git diff --check` | **PASS** — no whitespace errors | — |

### My own failure, fixed

`npm run typecheck` initially reported twelve `TS2353` errors: the `list` block in
`lib/content-system/page-body.ts` has no `title` property. Four lists in each of the three bodies
carried one. **Fixed by converting each list title into a preceding `heading` block at level 3**,
which is both schema-valid and better structure. Verified in the browser: the four H3s render on all
three pages. No shared file was touched.

## Central blocker 1 — locale font subsets

`npm run check:font-coverage` and `npm run check:font-coverage:export` both fail. The tool's own
remedy line reads "Regenerate the locale font subsets before building; see public/fonts/README.md."
**`public/fonts/` is a central shared directory and was not modified.** Regeneration was also not
possible here: `tools/rebuild-locale-fonts.mjs` requires `--noto`, `--pretendard`, `--maruburi`,
`--fonttools` and `--python` source inputs that are not available in this worktree.

**Exact command:** `npm run check:font-coverage`
**Exact error:**

```
✗ Chinese editorial font is missing 29 required glyph(s) from app, components, lib and content source: 劈 (U+5288), 呤 (U+5464), 嘌 (U+560C), 囱 (U+56F1), 壹 (U+58F9), 姜 (U+59DC), 孕 (U+5B55), 宰 (U+5BB0), 屠 (U+5C60), 幽 (U+5E7D), 杞 (U+675E), 枸 (U+67B8), 沸 (U+6CB8), 涮 (U+6DAE), 炖 (U+7096), 炭 (U+70AD), 禽 (U+79BD), 肚 (U+809A), 肥 (U+80A5), 肴 (U+80B4), 膻 (U+81BB), 茼 (U+833C), 葫 (U+846B), 蒜 (U+849C), 蒿 (U+84BF), 蘸 (U+8638), 蟹 (U+87F9), 锡 (U+9521), 韭 (U+97ED)
✗ Korean interface font is missing 8 required glyph(s): 끓 (U+B053), 솬 (U+C1AC), 숯 (U+C22F), 썬 (U+C36C), 썰 (U+C370), 쑥 (U+C465), 잊 (U+C78A), 탸 (U+D0F8)
✗ Korean editorial font is missing 8 required glyph(s): (same eight)
```

**Expected:** zero missing glyphs. **Actual:** 29 Han, 8 Hangul.
**Central shared location to change:** `public/fonts/homeground-serif-sc.woff2`,
`public/fonts/homeground-pretendard-ko.woff2`, `public/fonts/homeground-maruburi-ko.woff2`,
regenerated via `tools/rebuild-locale-fonts.mjs`.

**This list is already the reduced list.** A first pass found **48 Han and 19 Hangul**. The article
was then rewritten to remove every character that could go without cost to accuracy — 鸳鸯 became
"no second compartment", 寡淡 became 清淡, 澥 became 稀释, 잿빛 became 회색빛, 스톱워치 became
초시계, and so on; 22 Han and 11 Hangul characters were eliminated this way. What remains is
irreducible, and each falls into one of four groups:

- **The topic itself:** 涮 (as in 涮羊肉), 炭, 囱, 蘸, 肥.
- **Terms quoted from the regulator or health authority:** 姜, 枸, 杞, 茼, 蒿, 蒜, 韭, 膻, 嘌, 呤,
  幽, 沸, 炖, 禽, 孕.
- **Terms quoted from a heritage or ministry record:** 劈 (one of the four knife techniques),
  屠, 宰, 肚, 葫, 锡, 蟹.
- **Proper nouns and quoted titles:** 壹 (壹条龙), 肴 (in the quoted title 美味佳肴), and on the
  Korean side 솬 (솬양러우), 탸 (이탸오룽), plus ordinary Korean vocabulary the subset happens not to
  contain: 끓 (to boil), 숯 (charcoal), 썰 / 썬 (to slice), 쑥 (in 쑥갓, crown daisy), 잊 (in a
  quoted title).

**No temporary overlay was applied for QA.** Rather than patch a shared file or distort the article
to make a gate pass, the build was run by invoking the pipeline steps individually
(`guide:generate`, `content:check`, `check:planning-scope-lines`, `npx next build`,
`prune-production-export`, the two export checks) and recording the font gate honestly as FAIL. The
browser QA below therefore reflects **the committed content exactly**, with no substitution. Until
central regenerates the subsets, these characters will render from a system fallback font rather
than the Homeground faces. This could not be confirmed visually because the Browser pane could not
composite frames in this session, so screenshots were unavailable; the finding rests on the repo's
own tool and on an independent fontkit check of the committed `.woff2` files, which agree exactly.

## Central blocker 2 — shared counts and the Search Map

`npm run test:inquiry` → **554 pass, 3 fail**, all three caused by this guide being the 164th
independent guide directory and the 183rd runtime guide. **None is ours to fix.**

**1. `supabase/tests/guide-entity-coverage.test.mjs:34`**

```
AssertionError: Expected values to be strictly deep-equal:
+ actual - expected
  {
+   independentGuideCount: 164,
-   independentGuideCount: 163,
    legacyGuideCount: 19,
+   runtimeGuideCount: 183
-   runtimeGuideCount: 182
  }
```

Expected 163 / 19 / 182; actual 164 / 19 / 183. **Central shared location:** the hard-coded expected
object in that test file.

**2. `supabase/tests/search-map-production-sync-static.test.mjs:39`**

```
AssertionError: Expected values to be strictly equal:
163 !== 164
```

The Search Map complete inventory holds 163 entries; there are now 164 guide directories.
**Central shared location:** `docs/organic-growth/search-map.json`, which needs an entry for
`beijing-copper-pot-mutton-ordering-workflow`. **Suggested placement:** collection
`culture-regional-food`, section `culture`, family `task`, primary intent `execute` — matching the
sibling `first-shared-meal-in-china`, which uses the same three search values.

**3. `supabase/tests/search-platform-guide-policy.test.mjs:132`**

```
AssertionError: Expected values to be strictly equal:
183 !== 182
```

`assert.equal(runtime.size, 182)`. **Central shared location:** the hard-coded 182 in that test.

### No collection blocker for this article

Unlike some others in this batch, the collection route and the freshness mapping already exist:
`culture-regional-food` is present in `guideFreshnessByPillar` in `lib/searchPlatformGuidePolicy.ts`
at volatility `low`, and `culture: ["history-people-ideas", "regional-food",
"festivals-arts-contemporary"]` is present in `tools/check-search-platform-export.mjs`. The built
guide appears correctly on `/culture/regional-food/`. **No central collection change is requested.**

## Browser acceptance

Served from the static export at `http://127.0.0.1:4329`, all three locales, at desktop 1280×900 and
mobile 390×844.

| Check | en | zh | ko |
| --- | --- | --- | --- |
| HTTP status | 200 | 200 | 200 |
| `<html lang>` | `en` | `zh-Hans` | `ko` |
| Exactly one H1 | yes | yes | yes |
| H2 count | 12 | 12 | 12 |
| H3 count (converted list titles) | 4 | 4 | 4 |
| Tables render | 5 | 5 | 5 |
| Hero loads, 1600×1000 natural | yes | yes | yes |
| Hero rendered at 1280 / 390 | 480×300 / 390×244 | same | same |
| Sources block collapsed, count 8 | "SOURCES (8)" | "资料来源 (8)" | "자료 출처 (8)" |
| Self-canonical correct | yes | yes | yes |
| Page-level horizontal overflow at 390 | **none** (scrollWidth 390 = viewport) | none | none |
| Tables scroll inside their own `overflow-x: auto` wrapper at 390 | yes, 672 px inside 351 px | yes | yes |
| Any cell clipping its own content at 390 | none | none | none |
| Internal guide links resolving 200 | 12 of 12 | 11 of 11 | 11 of 11 |

**hreflang:** delivered through `out/sitemap.xml` `xhtml:link` alternates rather than page `<link
rel="alternate">` tags. This is site-wide behaviour, not specific to this guide. All three URLs
carry the full `en` / `ko` / `zh-Hans` / `x-default` alternate set; verified in the export.

**Korean naturalness:** the Korean body is a rewrite, not a sentence-by-sentence translation. The
section order is the same because it is a procedure, but sentence construction, connectives and
register are Korean throughout, and the ordering card keeps the Chinese phrases as Chinese — a
traveller has to show or say those, so romanising or translating them would make the card useless.
Untranslatable specifics are glossed on first use rather than left bare: 상나오 with "목등심 쪽",
푸루 as 발효 두부, 주차이화 as 부추의 꽃을 절인 것, 사오빙 kept as the product name.

## Zero shared-file change

`git diff 2f98803 --stat -- lib/ app/ components/ docs/ public/fonts/ supabase/ tools/ package.json`
returns empty. The only paths this commit adds are the nine allowed files: eight under
`content/guides/beijing-copper-pot-mutton-ordering-workflow/` and one hero under
`public/images/guides/beijing-copper-pot-mutton-ordering-workflow/`.
`lib/generated/guideRegistry.generated.ts` and `content/generated/content-manifest.json` are
regenerated by `guide:generate` during checks; both are **gitignored** and therefore cannot enter
the commit. `out/` is build output and is not committed.
