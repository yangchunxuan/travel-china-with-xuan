# Canonical boundary — wuhan-where-to-stay-hankou-wuchang-hanyang

- **topicId:** hg-topic-0501
- **Collection (pillar):** stay-city-areas
- **Base commit:** origin/main@e99e42c71e4e9be8853afdc406dc89caeebda334
- **Boundary written before drafting:** yes, 2026-08-22

## The one search task this page owns

A first-time foreign visitor to Wuhan needs to choose a **base among Hankou, Wuchang and Hanyang**,
using their arrival node, which bank their days sit on, their departure time, the number of river
crossings each combination forces, and luggage. It owns the area decision and nothing else.

## Slug and task occupancy check

Checked 2026-08-22 against `origin/main`, every ref under `refs/remotes` and every local branch.
No ref contains `content/guides/wuhan-where-to-stay-hankou-wuchang-hanyang/` or a near-synonym
directory (`wuhan-where-to-stay-*`, `wuhan-hankou-*`). **No canonical conflict.**

## Adjacent owners and how the border is drawn

| Adjacent owner | Status | What it keeps | What this page must not take |
| --- | --- | --- | --- |
| `wuhan-breakfast-hot-dry-noodles-doupi-route` | published on origin/main | Wuhan breakfast, the dishes and where they sit | Any food content. It is linked once and not summarised, paraphrased or extended |
| A future Wuhan city hub | not on any ref today | The city overview and what to do | Attraction lists, sightseeing plans, a "top things to do" section |
| A future Wuhan railway-station selector | not on any ref today | Which of the three stations to book for a given destination | Station-choice-for-booking guidance. This page only maps stations to **banks**, because that is what decides a hotel |
| `china-hotel-near-metro` | published on origin/main | The generic metro-proximity decision | The generic explainer; linked instead |
| `foreigners-china-hotel` | published on origin/main | Foreign-guest document handling | Any general statement about which properties accept which documents |
| `china-hotel-emergency-exit-fire-safety-check` | published on origin/main | Property safety checks | The safety checklist itself |
| `why-china-high-speed-stations-are-far-away` | published on origin/main | Why HSR stations sit outside city centres | The general explanation |

## Explicit exclusions honoured in the draft

- No hotel, brand or property rankings, and no named properties at all.
- No live or typical room rates.
- No attraction list, and no "top ten".
- **No claim that any bank is safe, unsafe, convenient or inconvenient in general.** The draft says
  this outright in its own callout: the argument is only ever about how many river crossings a
  combination forces.
- **No fixed commute-minute promises.** The only minute figures in the body are attributed to a
  named authority with a date: the 55-minute Hankou Station to Wuhan Station minimum, the
  12-minute Hankou Station to airport commuter rail figure with its 41-minute metro comparison, and
  the roughly 15-minute ferry crossing. Everything else tells the reader to check for their date.
- No food content, which belongs to the breakfast owner.

## Known glyph gap, disclosed

The Chinese body names all three districts that make up the area people call Hankou — Jiang'an,
Jianghan and **Qiaokou (硚口)** — because "Hankou is not a district" is the page's central
correction and naming two of three would weaken it. **硚 (U+785A) is missing from
`public/fonts/homeground-serif-sc.woff2`**, so `npm run check:font-coverage` fails on this branch
and the build stops in `prebuild`. Fonts are a central asset and were not touched.

For browser QA only, 硚 was temporarily replaced with 桥 in `body.zh.ts`, the build was run, all
three languages were checked at 1280 px and 390 px, and the file was then restored to the correct
character before committing. That overlay is disclosed here and in the commit message; the
committed `body.zh.ts` contains 硚口 and therefore does not build until the subset is regenerated.

## Internal links used

Only same-language pages already merged into `origin/main`, each with `en`, `zh` and `ko` bodies:
`wuhan-breakfast-hot-dry-noodles-doupi-route`, `china-hotel-near-metro`, `foreigners-china-hotel`,
`china-hotel-emergency-exit-fire-safety-check`, `why-china-high-speed-stations-are-far-away`,
`how-to-pay-in-china-as-a-tourist`, `chinese-city-walls-gates-and-urban-order`,
`china-map-coordinate-offset-explained`.

None of these appears in the 23-guide "reviewed" list in
`supabase/tests/guide-search-terms-static.test.mjs`, so no reviewed guide's inbound-owner record
drifts because of this page.
