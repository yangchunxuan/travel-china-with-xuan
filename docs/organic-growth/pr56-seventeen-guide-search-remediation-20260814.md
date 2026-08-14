# PR #56 seventeen-guide search remediation

Reviewed: 2026-08-14 (Asia/Shanghai)

This is the human-readable audit trail for the 17 published owners added through PR #56. The machine-readable ownership source remains `docs/organic-growth/search-map.json`; the per-page evidence, SERP sample, canonical boundary and GSC plan remain in each guide's `seo-brief.md`.

## What changed

- Registered all 17 published identities in `coverage.published` and `queryTaskOwnership` with their actual runtime collection assignments.
- Added three reviewed query phrases for EN, Simplified Chinese and Korean to each guide's metadata and Search Platform content-node export.
- Kept the phrases as internal editorial/search evidence. They are not emitted as a `meta keywords` ranking claim.
- Rechecked the current qualitative EN/ZH/KO SERP on 2026-08-14. Twelve pages matched their primary task; five needed title or lead alignment and were revised.
- Added one distinct trilingual Homeground field tool to every page and implemented contextual inbound links from older owners.
- Preserved one canonical identity per task. Related phrases are merge targets, not permission to create synonym pages.

## Owner ledger

| Canonical owner | Primary search task | Runtime collection | 2026-08-14 decision |
| --- | --- | --- | --- |
| `china-15-minute-neighbourhoods` | China 15-minute neighbourhood explained | `explore-cities-neighborhoods` | GO |
| `china-24-solar-terms-weather-food-daily-life` | China 24 solar terms explained | `culture-history-people-ideas` | GO |
| `china-community-canteens-explained` | Can tourists eat at community canteens in China? | `culture-regional-food` | REWORK completed |
| `desert-restoration-travellers-can-see` | China desert restoration explained | `explore-attractions-nature-heritage` | GO |
| `guizhou-village-basketball-culture` | Guizhou Village BA | `culture-festivals-arts-contemporary` | GO |
| `how-to-read-a-chinese-sponge-city` | What is a sponge city in China? | `explore-cities-neighborhoods` | REWORK completed |
| `how-to-visit-an-archaeological-site-museum` | How to visit an archaeological site museum in China | `explore-attractions-nature-heritage` | GO |
| `lunar-new-year-customs-for-visitors` | Visiting China during Spring Festival | `culture-festivals-arts-contemporary` | GO |
| `qingdao-brands-built-an-industrial-city` | Qingdao industrial history | `culture-festivals-arts-contemporary` | GO |
| `qinling-huaihe-transition-zone` | Qinling–Huaihe line explained | `explore-regions-provinces` | GO |
| `shanghai-24-hour-parks-reality-check` | Shanghai 24-hour parks | `explore-attractions-nature-heritage` | GO |
| `shenzhen-low-altitude-city-infrastructure` | Shenzhen low-altitude economy explained | `culture-festivals-arts-contemporary` | REWORK completed |
| `when-metro-construction-meets-archaeology` | China metro construction archaeology | `culture-history-people-ideas` | REWORK completed |
| `why-china-museums-have-stamps` | China museum stamp collecting | `culture-festivals-arts-contemporary` | REWORK completed |
| `yangshan-automated-port-explained` | How does Yangshan automated port work? | `culture-festivals-arts-contemporary` | GO |
| `yunnan-coffee-from-cherry-to-cup` | How is Yunnan coffee processed from cherry to cup? | `culture-regional-food` | GO |
| `zhenjiang-vinegar-living-fermentation` | Zhenjiang vinegar culture | `culture-regional-food` | GO |

## Measurement plan

No search volume, CPC, keyword difficulty, CTR forecast or ranking probability was invented. The property baseline is still too small to use as a market-discovery tool. Use Search Console as a post-publication validation layer:

| Checkpoint | Date | Required readout |
| --- | --- | --- |
| Day 7 | 2026-08-21 | Indexation, canonical/hreflang, first query impressions, title-language mismatch, multiple-owner warning |
| Day 28 | 2026-09-11 | Query cluster by locale, pages entering top 100, CTR by title intent, owner-to-owner cannibalisation |
| Day 56 | 2026-10-09 | Durable query ownership, position/CTR direction, pages needing richer evidence or title tests, refresh triggers |

At every checkpoint, preserve an observation as `pending` when the property has no usable signal. Zero or missing data is not evidence that demand does not exist, and it does not justify creating a second canonical URL.
