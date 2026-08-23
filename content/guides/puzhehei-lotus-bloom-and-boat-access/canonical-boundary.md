# Canonical boundary — puzhehei-lotus-bloom-and-boat-access

- **topicId:** hg-topic-0452
- **Collection (pillar):** timing-events-natural-calendar
- **Base commit:** origin/main@e7a0d19e320adc3dc3ce88eb9283f9765ea1d22f
- **Boundary written before drafting:** yes, 2026-08-22

## The one search task this page owns

A traveller considering Puzhehei in lotus season needs to **verify the actual bloom, weather and
boat-operating conditions for this year and this day**, and then decide between going out on the
water and staying on the shore. It owns the verification method and the water-versus-shore choice.

## Slug and task occupancy check

Checked 2026-08-22 against `origin/main` at e7a0d19, every ref under `refs/remotes` and every local
branch. No ref contains `content/guides/puzhehei-lotus-bloom-and-boat-access/` or a near-synonym
directory (`puzhehei-*`, `qiubei-*`, `*-lotus-*`). **No canonical conflict.**

## Adjacent owners and how the border is drawn

| Adjacent owner | Status | What it keeps | What this page must not take |
| --- | --- | --- | --- |
| A future Puzhehei destination guide | not on any ref today | The full destination: what to see, where to stay, how long to spend | Any complete destination guide, accommodation, or sightseeing inventory beyond what the water/shore decision requires |
| A future national flower-calendar owner | not on any ref today | Bloom seasons across China | **Any national flowering calendar.** This page is about one place and, more importantly, about a method |
| `china-climate-regions-for-trip-timing` | published on origin/main | National climate and timing | The national timing picture; linked instead |
| `china-shoulder-season-value-tradeoff` | published on origin/main | The shoulder-season trade-off | The general argument |
| `kunming-dali-lijiang-shangri-la-route-order` | published on origin/main | Yunnan route ordering | Any multi-city Yunnan routing |
| `yuanyang-rice-terraces-viewpoint-and-village-route` | published on origin/main | Yuanyang viewpoints and villages | Yuanyang material; linked as a sibling problem |
| A future Puzhehei transport owner | not on any ref today | Getting to Qiubei and Puzhehei | Arrival transport. The internal shuttle appears only because it is how you move between water and shore |

## Explicit exclusions honoured in the draft

- No full Puzhehei destination guide.
- No national flower calendar.
- **No hotel, restaurant or boat-operator rankings**, and no supplier named other than the official
  operator itself.
- **No fixed bloom-period guarantee.** The draft has a dedicated section stating that it will never
  print a peak-bloom date or a date range presented as this year's answer.
- **No real-time judgement from social photographs.** Stated as an explicit refusal, and applied to
  the article's own hero image, which is dated in the body and described as landscape rather than
  evidence.
- **No page per month.** Also stated as an explicit refusal, with the reason: the method is the
  same every month, so monthly pages would only be twelve chances to be out of date.

## How the evergreen requirement was met

The brief requires the article to keep an evergreen verification logic and to keep current bloom
state out of the body entirely. The structure enforces this rather than merely promising it:

- The article is organised around **four layers with different shelf lives** — broad season, this
  year's trend, current official observation, and today — and its central table is a comparison of
  how long each stays true.
- The **verification ladder** is a procedure, not a snapshot: operator site and mini-programme,
  operator announcements, county channels, national meteorological service, and a same-day re-check.
- The **decision matrix** is keyed on what the reader verified this morning, not on any month.
  Every row begins with a verification state, and one row exists specifically for "unknown because
  you could not verify".
- **No bloom state, water level, price or current condition appears anywhere in the body**, in any
  of the three languages.

## Source situation, disclosed

Of the three sources the brief names as priorities, two were opened and read in full and one was
unreachable:

- **Scenic area operator: verified.** `www.qbpzh.net`, run by Yunnan Puzhehei Culture and Tourism
  Development Co., Ltd., was reachable and carries the opening seasons, boat rules, water routes,
  shuttle network, reservation arrangements and visitor rules the article is built on.
- **China Meteorological Administration: verified** as the weather rung of the ladder.
- **Qiubei county government: not reachable.** `www.ynqb.gov.cn` and the county publicity site
  `www.zgpzh.gov.cn` both failed at the connection layer over HTTP and HTTPS. The county rung of the
  ladder is therefore written as **a step the reader should take**, not as a source that is quoted.
  The disclosure appears in the body's review callout in all three languages.

**SOURCE BLOCKED does not apply.** The operator — the party that actually decides whether boats run
— was verified directly, which is the load-bearing source for this article's decision.

## Internal links used

Only same-language pages already merged into `origin/main`, each with `en`, `zh` and `ko` bodies:
`china-climate-regions-for-trip-timing`, `china-shoulder-season-value-tradeoff`,
`kunming-dali-lijiang-shangri-la-route-order`, `yuanyang-rice-terraces-viewpoint-and-village-route`,
`china-public-holidays-travel-calendar`, `china-tiankeng-sinkholes-explained`,
`china-itinerary-with-young-children`.

None appears in the 23-guide "reviewed" list in `supabase/tests/guide-search-terms-static.test.mjs`.
`shilin-ashima-landscape-story` and `china-24-solar-terms-weather-food-daily-life` were both natural
Yunnan and seasonal candidates and were left out for that reason.

## Two central blockers, both disclosed

This article cannot build on this branch as committed, for two separate reasons, neither of which is
ours to fix:

1. **Missing freshness pillar.** `timing-events-natural-calendar` is absent from
   `guideFreshnessByPillar` in `lib/searchPlatformGuidePolicy.ts`, so page-data collection throws
   `Unknown guide freshness pillar`. The collection route `/when-to-go/events-natural-calendar/`
   already exists in `tools/check-search-platform-export.mjs`; only the freshness mapping is
   missing. Suggested entry: `"timing-events-natural-calendar": "high"`, to match
   `timing-holidays-crowds`, since bloom, water level and boat status are all high-volatility.
2. **Missing Chinese glyphs.** Six characters required by the Chinese body are absent from
   `public/fonts/homeground-serif-sc.woff2`: 舟, 筏, 篷, 橹, 鹅 and 泼. Five are the operator's own
   product names — 柳叶小舟, 竹筏, 乌篷船, 摇橹船, 天鹅湖 — and the sixth is 泼水, the summer
   water-splashing custom the operator publishes etiquette for and which determines whether a
   reader will be soaked. None can be dropped without misdescribing what the reader is buying.

Both were overlaid temporarily for browser QA and reverted before committing; see the commit
message and `dynamic-facts.md`.
