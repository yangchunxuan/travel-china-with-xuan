# Canonical boundary — chaozhou-ancient-city-gates-bridge-lanes-route

- **topicId:** hg-topic-0050
- **Collection (pillar):** explore-cities-neighborhoods
- **Base commit:** origin/main@1dbde40df6ad706b92deceda649618b8f0043b7c
- **Boundary written before drafting:** yes, 2026-08-22

## The one search task this page owns

A traveller inside or arriving at Chaozhou needs to choose **which gate to enter by and which
direction to walk**, so that the arch street, the inner lanes, the riverside wall and Guangji
Bridge connect into one route that never doubles back.

## Slug and task occupancy check

Checked 2026-08-22 against `origin/main` at 1dbde40, every ref under `refs/remotes` and every local
branch. No ref contains `content/guides/chaozhou-ancient-city-gates-bridge-lanes-route/` or a
near-synonym directory (`chaozhou-*`, `guangji-bridge-*`, `paifang-street-*`).
**No canonical conflict.**

## Adjacent owners and how the border is drawn

| Adjacent owner | Status | What it keeps | What this page must not take |
| --- | --- | --- | --- |
| A future Guangji Bridge owner | not on any ref today | The bridge's own ticketing, opening times and light-show calendar | **Any opening time, ticket, price or event date.** This page states only the structural fact that the pontoon section closes in the morning and opens in the evening, because that changes whether the route is walkable, and then tells the reader to confirm on the day |
| A future Chaozhou food owner | not on any ref today | Chaoshan food | All food. Tea appears once, as etiquette, not as a recommendation |
| A future Chaozhou city hub | not on any ref today | The city overview, arrival transport and accommodation | Arrival transport, stations, accommodation areas, a top-sights list |
| `yingge-dance-beyond-the-viral-clips` | published on origin/main | The Yingge dance tradition | Any description of the performance. Linked once and explicitly deferred to |
| `chinese-city-walls-gates-and-urban-order` | published on origin/main | The general reading of Chinese walls and gates | The general explainer. This page applies the idea to one specific wall and links out |
| `qiaopi-letters-remittances-and-migration` | published on origin/main | The Chaoshan remittance-letter history | The migration history itself; referenced only as the reason many lane houses exist |
| A future Chaoshan multi-city route owner | not on any ref today | Ordering Chaozhou with Shantou and Jieyang | Any multi-city routing |

## Explicit exclusions honoured in the draft

- No Guangji Bridge ticket, price, opening time or light-show schedule anywhere.
- No Chaozhou food content, and no restaurant or teahouse named.
- No arrival transport, no station or airport, no accommodation areas.
- No top-sights list; the page is a sequence, not an inventory.
- No reverse-direction duplicate: the loop is explicitly stated to work in either direction, and
  the fallback table says so again.
- No Yingge dance description.

## Residents and private space

The brief requires that the page respect residents' lives and not push travellers into homes or
private passages. This is handled in three places rather than one line: a dedicated lane-etiquette
list that tells readers to enter and leave rather than pass through, that an open door is not an
invitation, and that a shoulder-width passage is private access; a callout that reframes the lanes
as something to read rather than collect; and the route itself, which puts the lanes last precisely
so that readers enter them at walking pace. The sourced framing of Chaozhou as a **living** old
city, whose most vivid feature is ordinary residents' daily life, is what the section rests on.

## Source situation, disclosed

The brief names Chaozhou Municipal Government, Xiangqiao District Government and the ancient
city's and bridge's operators as the sources to verify first, and supplies three
`www.chaozhou.gov.cn` starting URLs. **Every Chaozhou municipal and district host was unreachable
from this network**, over HTTP and HTTPS, by command-line fetch and by the fetch tool, with
connections refused or timing out. The three supplied URLs could not be reopened, so none of them
is cited.

The page was therefore built on **Guangdong provincial government sources that were opened and read
in full**: the provincial and municipal local-chronicles offices for the wall, and the provincial
Overseas Chinese Affairs Office for the bridge and the city's structure, the latter quoting the
Chaozhou Municipal Ancient City Cultural Relics Protection and Management Centre by name. This is
not the ideal source set, and `source-log.md` records exactly which two of the four gate names rest
on corroboration rather than direct verification. Nothing operational — no hour, no price, no
schedule — is claimed anywhere, which is what keeps the article safe on a weaker source base.

## Internal links used

Only same-language pages already merged into `origin/main`, each with `en`, `zh` and `ko` bodies:
`chinese-city-walls-gates-and-urban-order`, `qiaopi-letters-remittances-and-migration`,
`yingge-dance-beyond-the-viral-clips`, `grand-canal-everyday-urban-history`,
`how-to-read-a-suzhou-garden`, `dougong-and-chinese-timber-frame-reading`,
`how-guangzhou-morning-tea-works`.

None appears in the 23-guide "reviewed" list in `supabase/tests/guide-search-terms-static.test.mjs`.
`how-to-read-heritage-sites-in-china` would have been a natural link and was left out for exactly
that reason.
