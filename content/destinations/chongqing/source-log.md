# Chongqing two-complete-day route supplement — 2026-09-09

Files: body.en.ts, body.zh.ts, body.ko.ts. Owner: existing `/destinations/chongqing/` city hub, with localized equivalents. Added four parallel blocks under the night-allocation section: `two-complete-days-heading`, `two-complete-days-context`, `two-complete-days-plan`, `two-complete-days-terrain`.

The itinerary is editorial route planning, not an operator package, timed transport promise or a claim of a personally walked accessibility audit. It assumes two complete days and a Jiefangbei hotel base. Day 1 starts at the Liberation Monument, uses Shibati downhill, lunch/rest, Chaotianmen and one Hongyadong exterior visit, returning to Jiefangbei. Day 2 starts at upper Danzishi and stays on the Nan’an bank, with the planning gallery when open, Nanbin Road and dinner before a confirmed roadside pickup. Both days specify how to omit the full stair descent and use vehicles/seated views. No precise walk time, guaranteed open lift, fully step-free route or unrestricted pickup zone is asserted.

Sources actually read 2026-09-09, retained internally:

- Chongqing Municipal Government / commerce authority, 2026-08-13: https://english.cq.gov.cn/specials/Eat/NightMarkets/202608/t20260813_15929823.html — Shibati and Mountain City Alley are near Jiefangbei and connect upper/lower city levels. The itinerary does not combine both full trails or invent a named gate/address.
- Chongqing Municipal Government / commerce authority, 2026-08-13: https://english.cq.gov.cn/specials/Eat/NightMarkets/202608/t20260813_15929927.html — Danzishi’s Nanbin Road location and multi-level sloping terrain. The downhill direction and omission of an extra climb are route choices; no guaranteed gate-to-gate elevator connection is claimed.
- Chongqing Municipal Government, 2026-06-13: https://english.cq.gov.cn/aboutchongqing/culture/PlanningExhibitionHalls/202606/t20260613_15751610.html — Chongqing Planning Exhibition Gallery at Danzishi Square, Nanbin Road, Nan’an; urban/landscape exhibits; Tuesday–Sunday opening and normal Monday closure. The itinerary asks for travel-date admission checks and offers a Monday/day-swap alternative.

Validation: all three StructuredPageBody exports passed `assertStructuredPageBody`; 107 blocks each, matching IDs/types across locales; targeted `git diff --check` passed. Root owns dateModified, generation and final build. Existing whole-page sourceReviewedDate and original source blocks remain unchanged.
