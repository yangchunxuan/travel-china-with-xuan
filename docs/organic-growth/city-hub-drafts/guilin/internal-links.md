# Guilin destination hub — internal-link plan

Status: **internal planning only**
No public page, registry, sitemap, Search Map or existing article is edited by this patch.

## 1. Canonical ownership

| Task / query cluster | Canonical owner | Link rule |
|---|---|---|
| Broad `Guilin travel guide`, first trip, nights, where to base, airport/stations and next-city role | Proposed Guilin Destination Hub at `/destinations/guilin/` | Do not create `/guides/guilin-travel-guide/` or another generic Guilin overview. |
| Detailed Guilin–Yangshuo rail vs road vs large-cruise decision | `guilin-yangshuo-transport-route` | Hub gives the regional summary, then links to the owner for endpoint execution. |
| Golden Week versus later October | `china-in-october-golden-week-or-later` | Hub links to the national timing owner; it does not duplicate reservation windows or nationwide holiday logic. |
| Broad Yangshuo destination choice | Future independent Yangshuo entity and hub | Guilin hub may explain the relationship, but Yangshuo must not be treated as a Guilin neighbourhood or lose its own future canonical. |
| Liu Sanjie interpretation/performance decision | No public owner in the reviewed inventory | Research pack remains non-linkable until separately approved and published. |

## 2. Outbound links allowed in the current draft

These are the only current-article links placed in the three body files. They must be removed from any rendered prototype if a fresh central check does not return HTTP 200.

| Owner | English | Chinese | Korean | Purpose |
|---|---|---|---|---|
| Guilin–Yangshuo transport | `/guides/guilin-yangshuo-transport-route/` | `/zh/guides/guilin-yangshuo-transport-route/` | `/ko/guides/guilin-yangshuo-transport-route/` | Move detailed rail/road/large-cruise and last-mile questions out of the hub. |
| October timing | `/guides/china-in-october-golden-week-or-later/` | `/zh/guides/china-in-october-golden-week-or-later/` | `/ko/guides/china-in-october-golden-week-or-later/` | Move national holiday/October execution detail to its owner. |

### Approved anchor intent

Use natural, task-specific anchors. Do not use the same generic `Guilin travel guide` anchor for supporting articles.

- EN transport: `Guilin to Yangshuo: choose rail, road or river by the real endpoints`
- ZH transport: `桂林到阳朔：按真实起点和终点比较火车、公路与游船`
- KO transport: `구이린에서 양숴까지: 실제 출발지와 목적지로 철도·도로·크루즈 선택`
- EN timing: `China in October: Golden Week or later?`
- ZH timing: `十月去中国：国庆黄金周还是月中以后？`
- KO timing: `10월 중국 여행: 국경절 연휴와 중순 이후 비교`

## 3. Future planned entries — no public URL

The following are planning concepts only. They must remain plain text or `status: planned-no-url` records until Search Map approval, source readiness, three-language completion and publication review.

| Planned task | Proposed primary entity | Relationship to Guilin hub | Cannibalisation boundary | Status |
|---|---|---|---|---|
| Yangshuo stay bases: West Street vs Yulong countryside vs Xingping | `county-yangshuo` | Deepens the hub’s one-table stay summary | Owns property-area comparison; must not become a second broad Yangshuo travel guide | `planned-no-url` |
| Longji day trip or overnight | `scenic-area-longji-rice-terraces` | Deepens the route-order and access decision | Owns village/access/overnight execution, not the whole Guilin itinerary | `planned-no-url` |
| Guilin airport and rail hubs | `city-guilin` | Deepens KWL/Guilin/North/West/Yangshuo-station orientation | Owns station/airport selection; does not absorb the Guilin–Yangshuo mode comparison | `planned-no-url` |
| Large Li River cruise vs Yulong manual bamboo raft | `river-li` plus `river-yulong` | Deepens the water-product distinction | Must use current official operating evidence; no reseller roundup | `planned-no-url` |
| Future Yangshuo Destination Hub | `county-yangshuo` | Becomes a peer destination node linked from Guilin | Owns broad Yangshuo intent and must not be nested as a Guilin neighbourhood page | `planned-no-url` |

No slug is reserved here. In particular, this file does not create:

- `/guides/guilin-travel-guide/`;
- `/guides/yangshuo-travel-guide/`;
- a Liu Sanjie public URL;
- city-by-days permutations generated from this hub.

## 4. Proposed inbound links after a hub exists

These are editorial proposals only. No source article is edited in this patch.

| Source owner | Proposed link placement | Target | Why it helps | Condition |
|---|---|---|---|---|
| `guilin-yangshuo-transport-route` | Near the point where the reader must choose the wider base sequence | Guilin hub in the same locale | Returns from mode execution to city/region composition | Hub is public-noindex or public-index and route exists. |
| `china-in-october-golden-week-or-later` | Guilin regional example or related-destination module | Guilin hub in the same locale | Converts national timing advice into a regional base decision | Hub route exists and October copy has been rechecked. |
| Future Yangshuo hub | “Guilin gateway and regional route” module | Guilin hub | Shows the airport/rail/cruise relationship without merging entities | Both hubs approved; reciprocal anchors are non-generic. |
| Future Longji owner | “Before/after the terraces” module | Guilin hub | Helps order Longji with city and Yangshuo | Longji page is published and current access evidence exists. |

## 5. Hub outbound module design

When a renderer is eventually authorised, group links by user task rather than publication date:

1. **Move between Guilin and Yangshuo** — current transport owner.
2. **Choose October dates** — current timing owner.
3. **Choose a Yangshuo base** — show only after a public owner exists.
4. **Decide whether Longji is a day trip** — show only after a public owner exists.
5. **Understand Guilin’s airport and stations** — show only after a public owner exists.

Do not display an empty card, disabled-looking link, research-pack title or fake “coming soon” URL.

## 6. Locale and canonical rules

- English body links to English pages, Chinese to `/zh/`, Korean to `/ko/`.
- All three locale pages remain one content identity, not three coverage records.
- The proposed hub’s primary canonical is `/destinations/guilin/`; locale alternates are `/zh/destinations/guilin/` and `/ko/destinations/guilin/`.
- A future Yangshuo hub must have its own entity-owned path; it is not a child neighbourhood URL under Guilin.
- Supporting articles may link to both Guilin and Yangshuo only when their reviewed `primaryEntityId`/`servesEntityIds` contract supports that relationship; a place-name mention is insufficient.
- No link in this draft changes indexability or eligibility counts.

## 7. Explicit non-links

The following must not be linked or described as live:

- `article/worker-4-liu-sanjie-completion-20260814` and its research/completion artifact;
- Anshun Dixi materials;
- any local file, unmerged branch or draft PR;
- commercial product pages used only for market observation;
- generated URLs for individual hotels, piers, stations or day-count combinations.

## 8. Pre-render link gate

Before central review moves the hub from `internal` to any public mode:

- [ ] Request every current target in all three locales and require HTTP 200.
- [ ] Confirm canonical and hreflang on each target.
- [ ] Remove any link whose owner is unpublished, redirected incorrectly or out of scope.
- [ ] Confirm no competing generic Guilin path exists.
- [ ] Confirm Yangshuo is represented as a separate entity/future hub.
- [ ] Confirm planned entries remain non-clickable until published.
- [ ] Confirm the hub itself is not added to the sitemap unless separately approved for indexation.
