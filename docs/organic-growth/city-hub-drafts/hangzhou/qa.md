# QA — Hangzhou Destination Hub draft

**Final status:** `CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED`
**QA date:** `2026-08-15`
**Draft base:** `origin/main` at `cc6be75e59155935f321df0334588b52769eb6e4`

## 1. Scope and repository-safety gate

Passed.

- The deliverable contains exactly eight files under `docs/organic-growth/city-hub-drafts/hangzhou/`.
- No public route, homepage, guide, registry, sitemap, Search Map, generated manifest, indexability control or central entity file is changed.
- No `/guides/hangzhou-travel-guide/` page is created.
- Proposed public ownership remains `/destinations/hangzhou/`, `/zh/destinations/hangzhou/` and `/ko/destinations/hangzhou/`, subject to central approval.
- `city-hangzhou` and `province-zhejiang` remain proposals inside the draft entity graph. `content/entities/core-places.json` is untouched.
- After the user's remote-write stop instruction, no further GitHub write or PR action was attempted. Final delivery is a local `git format-patch` only.

## 2. File inventory

Passed. The patch contains only:

1. `docs/organic-growth/city-hub-drafts/hangzhou/hub.en.md`
2. `docs/organic-growth/city-hub-drafts/hangzhou/hub.zh.md`
3. `docs/organic-growth/city-hub-drafts/hangzhou/hub.ko.md`
4. `docs/organic-growth/city-hub-drafts/hangzhou/entity-graph.json`
5. `docs/organic-growth/city-hub-drafts/hangzhou/source-log.md`
6. `docs/organic-growth/city-hub-drafts/hangzhou/image-plan.md`
7. `docs/organic-growth/city-hub-drafts/hangzhou/internal-links.md`
8. `docs/organic-growth/city-hub-drafts/hangzhou/qa.md`

No pre-rename locale files are included; only the three `hub.*.md` locale files listed above are part of the deliverable.

## 3. Trilingual depth and structure

Passed.

| Check | English | Simplified Chinese | Korean |
| --- | ---: | ---: | ---: |
| File | `hub.en.md` | `hub.zh.md` | `hub.ko.md` |
| Size measure | 3,455 English words | 6,449 Han characters | 7,443 Hangul syllables |
| Numbered H2 modules | 10 | 10 | 10 |
| Decision tables | 7 | 7 | 7 |
| Scenario sections | 2 | 2 | 2 |
| FAQ questions | 9 | 9 | 9 |
| Markdown internal links | 12 | 12 | 12 |

The English body is within the required `2,600–3,600`-word range. Chinese and Korean are independently written, equally complete versions rather than compressed summaries.

### Structural parity

Passed.

- All three files use numbered H2 modules `1` through `10` in the same order.
- All seven tables have matching column and row shapes across the three languages: `3×4`, `4×6`, `4×3`, `4×4`, `4×5`, `4×6`, `4×5` data structures, where the first number is the column count and the second is the body-row count.
- Both scenarios appear in all three languages in the same section.
- All nine FAQ decisions appear in all three languages.
- All three current-article modules contain the same ten information links in the same order.
- All three planning-entry modules contain the same two action links in localized form.

## 4. Required editorial modules

Passed.

| Required task | Evidence in the Hub |
| --- | --- |
| Hangzhou's role in a Shanghai–Jiangnan route | Section 1 defines focused day trip, second base, cultural base and onward hinge roles |
| Fit for day visitors, overnight visitors, heritage and slow travel | Section 2 uses a traveller-fit decision table |
| What a day return, two nights and three nights add | Section 3 uses a time-shape table plus two scenarios |
| Accommodation trade-offs | Section 4 compares Hubin/east shore, Beishan/Wulin, western hills/Longjing and Hangzhou East |
| HGH and five station identities | Section 5 distinguishes HGH, Hangzhou Station, East, West and South |
| Hangzhou West disambiguation | Repeated explicit statement that Hangzhou West is not a “West Lake station” |
| Six spatial clusters | Section 6 covers east shore, north shore, south line, western hills/Lingyin/Longjing, Grand Canal and Liangzhu |
| Wider route relations | Section 7 covers Shanghai, Suzhou, Shaoxing, Huangshan and Wuzhen |
| Wuzhen boundary | Explicitly placed in Tongxiang, Jiaxing, outside Hangzhou's urban attraction set |
| Required FAQ topics | All requested questions plus a separate holiday adjustment question |
| Current articles | Section 9 hands off to existing canonical owners |
| Natural planning entry | Section 10 separates itinerary review from whole-trip route building |

## 5. Anti-pattern and scope-boundary review

Passed.

- The Hub is not a list of the “Ten Scenes of West Lake.”
- The Hub does not retell the White Snake legend.
- The Hub is not a day-by-day itinerary or a second Shanghai–Hangzhou transport guide.
- Wuzhen, Shaoxing and Huangshan are not described as Hangzhou urban attractions.
- Lingyin and Longjing are treated as related western-hill tasks but not as one entrance or one guaranteed visit.
- Liangzhu is treated as an independent suburban heritage day, not a stop on a West Lake loop.
- The Grand Canal is treated as a northern urban-history corridor, not a lakeside extension.
- The content freezes no rail inventory, fare, attraction quota, current event, boat operation or last-train promise.

## 6. Existing-owner collision check

Passed.

The Hub links to but does not rewrite:

- `shanghai-hangzhou-transport-route`
- `shanghai-suzhou-hangzhou-nanjing-route-order`
- `liangzhu-ruins-park-and-museum-sequence`
- `white-snake-legend-hangzhou-zhenjiang`
- `grand-canal-everyday-urban-history`
- `tea-landscape-regions-of-china`

`source-log.md`, `internal-links.md` and `entity-graph.json` record the same ownership boundary.

## 7. Entity graph QA

Passed.

- `entity-graph.json` parses as valid JSON.
- Schema marker: `destination-hub-entity-graph-proposal`.
- Entity count: `28`.
- Relation count: `18`.
- Entity IDs are unique.
- Every `fromEntityId` and `toEntityId` resolves to an entity in the file.
- Required nodes are present for Zhejiang, Hangzhou, West Lake, HGH, Hangzhou Station/East/West/South, the four stay areas, Lingyin, Longjing, the Grand Canal, Liangzhu Museum/park/property and the five route relationships.
- Wuzhen is modelled under Tongxiang and Jiaxing, not under Hangzhou.
- Hangzhou West carries an explicit negative assertion against West Lake.
- Central-registry edit authorization is `false`.

## 8. Source QA

Passed for the draft stage.

- Dynamic source review date is the actual completion date, `2026-08-15`.
- Priority first-party sources include Hangzhou culture/tourism, the West Lake authority, HGH airport, 12306, Lingyin Temple and the Liangzhu management authority.
- UNESCO is used for the West Lake and Liangzhu World Heritage boundaries.
- The airport source was checked for the current three metro-line identities; exact first/last trains are not frozen.
- The Hangzhou passenger-station notice confirms four distinct station names and sends dated train verification to 12306.
- The 12 July 2026 Liangzhu notice is represented accurately as a reopening notice after weather closure, not a permanent operations guarantee.
- Tea season, processing, reservations, attraction access, holiday transport and events are all marked as recheck items.
- Official facts, inherited source-pack evidence and Homeground editorial judgments are labelled separately.

## 9. Internal-link QA

Passed.

- Each language body contains `12` Markdown links, all localized correctly.
- Every Markdown link target exists in the deployed static export for base commit `cc6be75`.
- The mandatory six owners resolve in EN, ZH and KO.
- The four supporting guides, itinerary-review page and whole-trip route service also resolve in all three locales.
- No draft-only destination URL is linked.
- The prohibited `/guides/hangzhou-travel-guide/` appears only as a non-link warning in governance documents; it is not a live target.
- `internal-links.md` contains only verified production targets as actual links/paths for insertion.

A central release pass should still issue ordinary HTTP requests after the destination route is implemented, because a later deployment could change a path after this draft was completed.

## 10. Image-plan QA

Passed for the planning package.

- One rights-cleared real Hangzhou hero is specified: West Lake with the Hangzhou skyline.
- A West Lake/wider-city relationship diagram is fully specified.
- An HGH/railway-gateway relationship diagram is fully specified and contains the Hangzhou West warning.
- Five precisely identified supporting real photographs are specified: Broken Bridge, Longjing tea landscape, Gongchen Bridge, Liangzhu Museum and Hangzhou East Station.
- Exact source pages, authors, dates, licences, editorial jobs and evidence boundaries are recorded.
- EN, ZH and KO alt-text functions are supplied.
- No AI tourism photograph, generative fill, synthetic crowd or documentary reconstruction is permitted.
- No binary image is included in this docs-only patch; central asset production and visual crop QA remain required before publication.

## 11. Packaging and git QA

Passed in the final local packaging run.

- UTF-8 text and LF line endings used.
- `git diff --check` passed with no whitespace errors.
- A single commit was converted to one `git format-patch` file.
- The patch changes only `docs/organic-growth/city-hub-drafts/hangzhou/`.
- The patch creates exactly the eight files listed above.
- `git apply --check` passed in a clean repository initialized from an empty base.
- `git am` passed in the clean verification repository.
- The resulting verification tree contains exactly the eight expected files under the target directory.
- No full Next.js build was run because the patch is docs-only and contains no runtime source, registry or generated-file change. This is an explicit scope limitation, not a substitute for central release QA.

## 12. Central-review items

The draft is complete, but central review must still decide or execute:

1. approve or revise `city-hangzhou` and `province-zhejiang` in the central entity model;
2. approve destination-registry ownership and publication mode;
3. implement the `/destinations/hangzhou/` renderer entry without creating a second guide owner;
4. produce and inspect the real image derivatives and two original diagrams;
5. recheck dynamic Lingyin, Liangzhu, airport, metro, rail and holiday facts immediately before publication;
6. run the full repository generation, type-check, build, link and rendered mobile/desktop review after implementation;
7. decide when the Hub and destination directory become indexable under the Search Platform gate.

# CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED
