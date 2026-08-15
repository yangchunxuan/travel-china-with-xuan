# Guilin destination hub — QA record

Final editorial state: **CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED**

## 1. Scope and repository safety

- [x] Draft is confined to `docs/organic-growth/city-hub-drafts/guilin/`.
- [x] Exactly eight files are present:
  - `hub.en.md`
  - `hub.zh.md`
  - `hub.ko.md`
  - `entity-graph.json`
  - `source-log.md`
  - `image-plan.md`
  - `internal-links.md`
  - `qa.md`
- [x] No public route, guide folder, registry, generated manifest, sitemap, homepage, Search Map or indexability file is changed.
- [x] No `/guides/guilin-travel-guide/` page is created.
- [x] Repository baseline was reviewed read-only at `origin/main` commit `cc6be75e59155935f321df0334588b52769eb6e4`.
- [x] No GitHub remote write or PR creation is part of the final workflow.

## 2. Canonical and entity boundary

- [x] `primaryEntityId` is `city-guilin`, an existing entity.
- [x] `autonomous-region-guangxi` is explicitly proposal-only; the central entity registry is not edited.
- [x] Proposed canonical is `/destinations/guilin/` with `/zh/` and `/ko/` locale variants.
- [x] Guilin city, Yangshuo, Xingping, Li River and Longji are not collapsed into one place.
- [x] Yangshuo is a separate proposed county entity and future independent hub, not a Guilin neighbourhood.
- [x] Xingping is a separate town within Yangshuo County.
- [x] Longji is placed in Longsheng and split into village/access tasks.
- [x] KWL, Guilin, Guilin North, Guilin West and Yangshuo Station are separate nodes.
- [x] Mopanshan, Zhujiang and Longtoushan are separate port/pier nodes.
- [x] Stay bases, water products, road movement and onward routes are separate graph nodes.

## 3. Trilingual body completeness

| Check | English | Chinese | Korean |
|---|---:|---:|---:|
| Body size | 3,372 English-word tokens | 6,205 Han characters | 2,933 whitespace tokens / 7,187 Hangul syllables |
| Decision tables | 6 | 6 | 6 |
| Arrival/weather scenarios | 2 | 2 | 2 |
| FAQ entries | 10 | 10 | 10 |
| Same module sequence | Yes | Yes | Yes |

- [x] English is within the required 2,600–3,600-word range.
- [x] Chinese and Korean are complete adaptations, not summaries.
- [x] Every locale covers regional topology, traveller fit, nights, stay bases, arrival hubs, water-product differences, Longji, next cities, current/planned content and FAQs.
- [x] No promotional slogan substitutes for route explanation.
- [x] The body does not use “桂林山水甲天下” as an argument or heading.

## 4. Required decision content

- [x] Guilin city is explained as airport/rail/large-cruise gateway.
- [x] Yangshuo and Xingping are explained as different accommodation and experience bases.
- [x] Fit is assessed for nature, photography, families and slow travel, including poor-fit conditions.
- [x] One-night Guilin, direct Yangshuo and 3–5-day increments are compared.
- [x] Guilin centre, West Street, Yulong countryside, Xingping and Longji stays have separate tasks.
- [x] KWL and all four named rail stations have real endpoint warnings.
- [x] Large Li River cruise, other authorised Li River water projects, Yulong manual rafts and road movement are distinguished.
- [x] Longji day trip versus overnight and route-order effects are explained.
- [x] Guangzhou, Hong Kong and Chongqing are expressed as route relationships, not promised timetables.
- [x] The two scenarios cover late KWL family arrival and weather/water-operation disruption.

## 5. FAQ coverage

- [x] Guilin one night versus direct Yangshuo.
- [x] Guilin versus Yangshuo versus Xingping.
- [x] Required nights.
- [x] West Street versus Yulong versus Xingping.
- [x] Why Yangshuo Station is not in central Yangshuo town.
- [x] Li River cruise versus Yulong bamboo raft overlap.
- [x] Longji day trip suitability.
- [x] Where to stay after airport arrival.
- [x] Children and older travellers.
- [x] Weather/water-operation fallback.

## 6. Current articles and unpublished inventory

- [x] Only the two declared current owners appear as live article links:
  - `guilin-yangshuo-transport-route`
  - `china-in-october-golden-week-or-later`
- [x] Liu Sanjie is identified as an unpublished research/completion pack, not a current article.
- [x] Anshun Dixi is excluded as unrelated.
- [x] Local-only and unmerged branches are excluded from current content.
- [x] Planned support entries have no fake URL.
- [ ] Central pre-render gate: request every owner URL in all three locales and require HTTP 200. Repository state and the task owner list support inclusion, but the restricted web client could not independently return all six status codes.

## 7. Dynamic-fact controls

- [x] Airport bus/coach schedules and fares are not frozen into the hub.
- [x] Train services and station pairs are delegated to 12306 for the travel date.
- [x] Cruise route facts carry a review date and do not guarantee sailing.
- [x] Water level, flood control, navigation orders and suspension are high-dynamic.
- [x] Yulong age/height/passenger/flow limits are not published as permanent rules.
- [x] Longji visibility and agricultural stages are not guaranteed.
- [x] Hong Kong direct rail is not guaranteed.
- [x] Every dynamic class has a source channel, recheck point and fallback in `source-log.md`.

## 8. Image controls

- [x] A real Guilin/Li River hero is required.
- [x] A regional topology diagram is specified from `entity-graph.json`.
- [x] Separate real-photo slots exist for Guilin city, Yangshuo, Yulong countryside, Xingping, Yangshuo Station, water products and Longji.
- [x] AI-generated, AI-expanded or materially reconstructed documentary landscape photography is prohibited.
- [x] Rights, author, licence, derivative and location records are required.
- [x] The existing Yangshuo Station image is limited to station identity and cannot prove current operations.

## 9. Machine and patch validation

The following checks are required after the eight files are committed locally and before attachment delivery:

- [x] `python -m json.tool entity-graph.json`
- [x] automated count: 6 decision tables, 2 scenarios and 10 FAQs in each locale
- [x] exact-file-set check: eight files only
- [x] forbidden-scope check: every patch path begins with `docs/organic-growth/city-hub-drafts/guilin/`
- [x] `git diff --check HEAD^ HEAD`
- [x] `git format-patch -1 --stdout`
- [x] independent clean-repository `git am` application test
- [x] post-apply exact-file-set and JSON parse check

## 10. Remaining central-review decisions

1. Confirm all six current-owner locale URLs return HTTP 200 immediately before rendering.
2. Decide whether the next state remains `internal` or becomes an explicitly approved `public-noindex` prototype.
3. Recalculate destination-hub eligibility from the runtime manifest; do not infer eligibility from this draft.
4. Approve or reject the proposed Guangxi parent and all graph-local entity IDs before any central registry work.
5. Select and clear rights for the real photo set and topology diagram.
6. Refresh airport, rail, cruise, water-level, raft and Longji access facts close to any public release.

**CITY HUB DRAFT READY — CENTRAL REVIEW REQUIRED**
