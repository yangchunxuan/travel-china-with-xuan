# QA — Chongqing Destination Hub draft

Final editorial state: **CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED**
Checked: **2026-08-15**
Required baseline: `cc6be75e59155935f321df0334588b52769eb6e4`
Draft scope: `docs/organic-growth/city-hub-drafts/chongqing/` only

## 1. Package manifest

The package contains exactly eight files:

1. `hub.en.md`
2. `hub.zh.md`
3. `hub.ko.md`
4. `entity-graph.json`
5. `source-log.md`
6. `image-plan.md`
7. `internal-links.md`
8. `qa.md`

There are no legacy locale filenames, no public page implementation and no binary image assets in the patch.

## 2. Body depth and locale parity

| Check | English | Simplified Chinese | Korean | Result |
|---|---:|---:|---:|---|
| File lines | 235 | 235 | 235 | PASS — aligned structure |
| File bytes | 21,728 | 21,150 | 26,077 | PASS — comparable depth |
| English-style word count | 3,392 | not meaningful for unspaced Chinese | 3,309 | PASS |
| Language-specific character measure | — | 5,973 Han characters | 7,079 Hangul syllables | PASS — full drafts, not summaries |
| Numbered fixed modules | 11 | 11 | 11 | PASS |
| Decision tables | 6 | 6 | 6 | PASS |
| Stamina/luggage scenarios | 2 | 2 | 2 | PASS |
| FAQ entries | 9 | 9 | 9 | PASS |
| Mandatory owner IDs present | 4 | 4 | 4 | PASS |
| Active body links | 2 | 2 | 2 | PASS — locale-specific allow-list only |

The English body is within the required 2,600–3,600-word range. Chinese and Korean retain the full decision logic, examples, tables, dynamic warnings and FAQ set rather than compressing the English article.

## 3. Fixed-module coverage

All three locale bodies contain the same eleven numbered modules:

1. Chongqing’s role in the Chengdu–Chongqing, Yangtze and southwest route system.
2. Traveller fit for cityscape, food, night views, nature and heritage.
3. Two-night, three-night and Wulong/Dazu extension differences.
4. Jiefangbei, Guanyinqiao, Nan’an and Shapingba accommodation tasks.
5. CKG, Chongqing North, West, Shapingba, East and current Chongqing Station context.
6. Urban relationships among Jiefangbei–Hongyadong–Chaotianmen, Shibati/Mountain City Trail, Nan’an/Nanshan and Liziba.
7. Food, night-view and performance placement without creating a viral-night list.
8. Wulong and Dazu as distant municipality destinations, with day-trip, overnight and skip conditions.
9. Two physical-demand and luggage scenarios.
10. Onward roles for Chengdu, Zhangjiajie, Furong Town, Fenghuang and the Yangtze cruise.
11. Current article owners and planning-service entry points.

Result: **PASS**.

## 4. FAQ coverage

Each locale contains nine equivalent FAQs:

- how many nights Chongqing needs;
- Jiefangbei versus Guanyinqiao;
- which Chongqing railway station;
- why apparently close map points can require a long route;
- whether to visit Wulong with only two full days;
- Wulong versus Dazu;
- adjustments for older travellers, children and luggage;
- how to divide time between Chongqing and Chengdu;
- whether a Yangtze cruise always boards at Chaotianmen.

Result: **PASS**.

## 5. Canonical and entity QA

- `primaryEntityId` is proposed as `city-chongqing`.
- `city-chongqing` has direct `ADMIN_PARENT` relation to `country-china`.
- No Sichuan parent is assigned.
- Chongqing is typed as a provincial-level municipality.
- Proposed paths are `/destinations/chongqing/` and the matching Chinese/Korean locale paths.
- `/guides/chongqing-travel-guide/` and locale variants are recorded only as forbidden paths; no such page is created.
- The graph includes central urban districts, accommodation bases, both rivers, airport, current railway hubs, Chongqing Station under reconstruction, Wulong South, Wulong, Dazu, Baodingshan, Beishan and onward-route nodes.
- The graph includes across-river, multi-level, above-riverfront and separate-cluster relationships without precise walking times.
- Dynamic airport, railway, station-access, outer-attraction and cruise fact classes require pre-publication rechecks.
- `entity-graph.json` parses as valid JSON.

Result: **PASS**.

## 6. Specialist-owner boundary QA

All three bodies connect to the required owners:

- `chongqing-upper-lower-city-orientation`
- `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba`
- `china-tiankeng-sinkholes-explained`
- `sichuan-opera-face-changing-with-context`

Boundary review:

- The Hub gives a four-question orientation framework but does not rewrite the full upper/lower-city tutorial.
- The Hub assigns accommodation tasks but does not reproduce the complete three-base comparison or a hotel shortlist.
- The Hub decides whether Wulong deserves time but does not rewrite tiankeng geology.
- The Hub places a performance in the itinerary but does not rewrite Sichuan-opera history or freeze a venue calendar.

Result: **PASS**.

## 7. Map, physical-demand and accessibility QA

- “8D magic city” appears only as a rejected shorthand that fails to explain practical orientation.
- No straight-line map distance is converted into a promised walking time.
- No exact urban walking-minute estimate appears.
- River crossings are described as bridge, tunnel, ferry or rail decisions rather than as adjacent pins.
- Height changes are expressed through bank, level, entrance and connector logic.
- A working lift, escalator or exit is not used to claim that the full route is step-free.
- Both required scenarios cover luggage and low-energy/older/child conditions with actionable redesign.

Result: **PASS**.

## 8. Dynamic transport and outer-destination QA

The draft reflects the checked 2026 operating context while preserving recheck boundaries:

- Chongqing East is treated as an operating major hub, not omitted as a future project.
- Current CKG passenger operations are described through the T3 system, with T3B as a satellite relationship and airline-record recheck required.
- Chongqing Station at Caiyuanba is described as under reconstruction rather than a current passenger alternative.
- Wulong South is not presented as the Three Natural Bridges entrance.
- The future Dazu Shike station and future Qianjiang–Jishou railway are not presented as open.
- Exact train numbers, station roles, terminal assignments, attraction openings and cruise piers remain dynamic.

Result: **PASS**, subject to central pre-publication recheck.

## 9. Internal-link QA

The complete active body-link allow-list is:

```text
/guides/
/china-itinerary-review/
/zh/guides/
/zh/china-itinerary-review/
/ko/guides/
/ko/china-itinerary-review/
```

Each body contains only the two links for its own locale. The four owner titles remain unlinked pending exact production-200 checks. No proposed destination path is self-linked. No future route deep link is active.

Result: **PASS**.

## 10. Image-plan QA

The plan requires:

- one real daytime Chongqing hero;
- one non-scale vertical-city schematic;
- one non-scale transport-hub topology;
- three to five real place photographs covering the central river relationship, Liziba/cross-district context, Wulong and Dazu;
- licence, author, source, crop, checksum and derivative records before publication;
- factual alt text in all three locales.

The plan explicitly rejects AI-generated or synthetic documentary, night-view, station, heritage and landscape photography. It also rejects unlicensed social-media screenshots and scale-like diagrams that imply exact walking time or open future infrastructure.

Result: **PASS**.

## 11. Source QA

`source-log.md` prioritises:

- Chongqing Municipal Government and its English heritage material;
- Chongqing Municipal Commission of Transport;
- Chongqing Rail Transit;
- China Railway 12306;
- official Wulong and Dazu channels;
- current official cruise and rail-development notices;
- the source logs of the four mandatory existing owners.

Dynamic facts are separated from stable geography and administrative structure. Exact operational details are written as recheck tasks rather than permanent promises.

Result: **PASS**.

## 12. Prohibited-change QA

The patch does not modify:

- public routes or page components;
- central entity registries;
- `content/entities/core-places.json`;
- Search Map;
- sitemap;
- homepage;
- generated content manifest;
- indexability or robots behaviour;
- existing guide owners.

The patch scope is limited to `docs/organic-growth/city-hub-drafts/chongqing/`.

Result: **PASS**.

## 13. Automated validation performed

The local validation set includes:

- expected eight-file manifest check;
- UTF-8 read check for every file;
- JSON parse for `entity-graph.json`;
- English word-count range check;
- locale module/table/scenario/FAQ parity checks;
- mandatory owner-ID presence checks;
- body-link allow-list check;
- forbidden body-path check;
- Markdown table-shape check;
- trailing-whitespace and conflict-marker scan;
- `git diff --check` / `git show --check` on the content commit;
- `git format-patch` path audit;
- `git apply --check` and `git am` in a clean scratch repository;
- post-apply verification that exactly eight files are added under the required directory.

Result: **PASS**.

## 14. Environment limitation and trust boundary

The task’s required baseline commit and repository contents were read through the connected GitHub interface. The runtime could not clone the remote repository through local DNS, and GitHub write permission was unavailable. After the user’s revised instruction, no further remote write or PR attempt was made.

The final patch is therefore generated from an isolated local Git repository as a pure eight-file addition. It is tested with `git apply --check` and `git am` in a separate clean repository. Because a full local clone of `origin/main` was not available, the remaining central integration assumption is that `docs/organic-growth/city-hub-drafts/chongqing/` remains absent or contains no conflicting files on the target commit. That directory was absent on the checked required baseline.

## 15. Central review still required

Before publication, the central editor must:

1. approve or assign canonical entity IDs;
2. recheck dynamic airport, railway, attraction, station-access and cruise facts;
3. activate specialist-owner links only after exact locale-specific production-200 checks;
4. select, process and record the licensed real images;
5. integrate the destination route through the central system;
6. run the full repository build, locale render and indexability tests.

**CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED**
