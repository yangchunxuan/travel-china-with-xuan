# Canonical boundary — xian-lanzhou-dunhuang-silk-road-route

- **topicId:** hg-topic-0151
- **Collection (pillar):** plan-trip-length-city-order
- **Base commit:** origin/main@e99e42c71e4e9be8853afdc406dc89caeebda334
- **Boundary written before drafting:** yes, 2026-08-22

## The one search task this page owns

A traveller who wants Xi'an, Lanzhou and Dunhuang in one trip needs to decide **direction,
gateways, mode for the long leg, how many nights each place gets, and whether Lanzhou belongs in
the route at all**. This page owns route shape and night allocation. It owns no attraction, no
booking workflow and no single transport leg.

## Slug and task occupancy check

Checked 2026-08-22 against `origin/main`, every ref under `refs/remotes` and every local branch.
No ref contains `content/guides/xian-lanzhou-dunhuang-silk-road-route/`, and no ref contains a
near-synonym directory (`silk-road-*`, `lanzhou-dunhuang-*`, `xian-dunhuang-*`).
**No canonical conflict.**

## Adjacent owners and how the border is drawn

| Adjacent owner | Status | What it keeps | What this page must not take |
| --- | --- | --- | --- |
| `mogao-caves-independent-visit-workflow` | published on origin/main | The whole Mogao reservation and visit workflow | Booking steps, identity fields, cave counts, ticket types or prices. This page uses only the structural facts that change **route shape** — the Digital Exhibition Centre being the first stop, ticket sales closing before the site does, and weather closures — and links out for the workflow |
| `qilian-mountains-public-gateways-and-access` | published on origin/main | Lawful Qilian gateways and access status | Any gateway comparison; the Qilian side trip is named only as one reason a Lanzhou night can be justified |
| `beijing-xian-chengdu-route-order` | published on origin/main | The Beijing–Xi'an–Chengdu ordering task | Any three-city eastern ordering material |
| `china-hub-and-spoke-or-multi-base-route` | published on origin/main | The general base-structure decision | The generic explainer; linked instead |
| `china-rail-only-route` | published on origin/main | Building a rail-only trip nationally | The general rail-only argument |
| `china-night-train-or-daytime-high-speed-rail` | published on origin/main | Night versus day long-distance decision | The general comparison; linked because the long leg is a live case for it |
| A future `lanzhou-dunhuang-transport-route` or `xian-lanzhou-transport-route` | does not exist on any ref today | Would own the single-leg door-to-door comparison | This page states only what the **route order** needs: that the leg is long in every mode, that Liuyuan South is not Dunhuang, and that flying is a real option. It does not compare stations, terminals or door-to-door times in the way a transport-pair owner would |
| `china-climate-regions-for-trip-timing` | published on origin/main | Season and timing nationally | Any month-by-month advice |

## Explicit exclusions honoured in the draft

- No Mogao reservation procedure, cave list, ticket type or price.
- No separate Xi'an–Lanzhou or Lanzhou–Dunhuang transport-owner content: no station-by-station
  door-to-door comparison, no terminal walk-throughs.
- No general Silk Road history. The corridor appears only as distance, direction and pace.
- No Xinjiang extension.
- No city encyclopaedia for Xi'an, Lanzhou or Dunhuang, and no attraction lists.
- No live seat availability, fares or frequencies.
- No visa or nationality variants.
- **No per-trip-length canonical.** The night-allocation table deliberately offers three named
  shapes plus one anti-pattern, and the surrounding copy states outright that no variant will be
  created for each possible day count.

## Internal links used

Only same-language pages already merged into `origin/main`, each with `en`, `zh` and `ko` bodies:
`mogao-caves-independent-visit-workflow`, `china-hub-and-spoke-or-multi-base-route`,
`china-rail-only-route`, `china-night-train-or-daytime-high-speed-rail`,
`qilian-mountains-public-gateways-and-access`, `china-climate-regions-for-trip-timing`,
`beijing-xian-chengdu-route-order`, `china-shoulder-season-value-tradeoff`.

`xian-chengdu-transport-route` was written in this same batch but is **not** on `origin/main`, so it
is deliberately not linked.

## Link choice forced by a shared test

`how-to-visit-an-archaeological-site-museum` was the natural eighth link and was drafted in, then
removed. It is one of the 23 guides listed as "reviewed" in
`supabase/tests/guide-search-terms-static.test.mjs`, and that test asserts that each reviewed
guide's own `seo-brief.md` documents the **exact** set of inbound owners linking to it. Adding an
inbound link from here made that reviewed guide's brief drift, and the brief belongs to another
article, so it is not ours to edit. `china-shoulder-season-value-tradeoff` was substituted.

Central may prefer to allow the archaeological-museum link and update that guide's brief instead;
the substitution is a boundary-safe choice, not an editorial preference.
