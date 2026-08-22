# Canonical boundary — maijishan-grottoes-cliff-walk-visit

- **topicId:** hg-topic-0101
- **Collection (pillar):** explore-attractions-nature-heritage
- **Base commit:** origin/main@e7a0d19e320adc3dc3ce88eb9283f9765ea1d22f
- **Boundary written before drafting:** yes, 2026-08-22

## The one search task this page owns

A traveller considering Maijishan needs to confirm the **reservation, the ticket types, the visit
procedure, the exposure of the cliff walkways, the possibility of protective closure, and their own
willingness to do it** — before travelling. It owns readiness, not transport and not art history.

## Slug and task occupancy check

Checked 2026-08-22 against `origin/main` at e7a0d19, every ref under `refs/remotes` and every local
branch. No ref contains `content/guides/maijishan-grottoes-cliff-walk-visit/` or a near-synonym
directory (`maijishan-*`, `tianshui-*`). **No canonical conflict.**

## Adjacent owners and how the border is drawn

| Adjacent owner | Status | What it keeps | What this page must not take |
| --- | --- | --- | --- |
| `mogao-caves-independent-visit-workflow` | published on origin/main | The Mogao reservation and visit workflow | Mogao's procedure. Both sites are administered by the Dunhuang Academy, which makes the temptation real; this page describes only Maijishan's own arrangements and links out |
| `yungang-grottoes-cave-order-and-museum` | published on origin/main | Yungang's cave order and museum | Yungang material, and **any comparison between grotto sites**. The link text says explicitly that no comparison is made |
| A future Tianshui city guide | not on any ref today | The city, its stations, its other sights | Any Tianshui city content |
| A future station-to-site transport owner | not on any ref today | Getting from Tianshui's hubs to the scenic area | **Bus route numbers and journey times.** The operator publishes them and the page says so, but reproduces none of them; only the shape (visitor centre, then shuttle) is used, because that is what changes whether you get onto the route |
| `wheelchair-accessible-china-route-planning` | published on origin/main | Step-free route planning | Accessibility methodology; linked for readers for whom step-free travel is a requirement |
| A future Buddhist art or grotto-art owner | not on any ref today | The sculpture, iconography and periodisation | Art-historical interpretation. Chronology appears only to explain **why the walkways exist and why access has always been the problem** |

## Explicit exclusions honoured in the draft

- No Tianshui city guide material.
- No station-to-site transport instructions, bus numbers or journey times.
- No Buddhist art encyclopaedia and no iconographic reading of the sculpture.
- **No national grotto comparison.**
- No supplier, agency or resale-platform ranking; the draft warns against unidentifiable resellers
  without naming anyone.
- **No medical advice.** The draft states outright that it is not qualified to judge whether a
  reader can do the walk. Where a health condition is named, it is quoted as the operator's own
  caution, and the reader is directed to their own clinician.
- **No guarantee of open caves, quotas or walkway condition.** A whole section is devoted to
  refusing these three, by name.

## How the "lower-exposure alternative" requirement was handled

The brief allows a lower-exposure alternative **only if official sources support one**. No official
source consulted describes such a route. The draft therefore does not invent one. Instead it does
three things: it names what genuinely exists and is verifiable — a visitor centre, an approach,
temple buildings at the foot of the cliff, and the view of the whole rock face from below, which is
how most people in history saw it; it states that whether an alternative route exists is the
operator's to say; and it directs the reader to the operator's published enquiry numbers. That is
the honest position and it is stated as such in all three languages.

## Source threshold, and how it was met

The brief sets a hard threshold: the Maijishan research and protection institution, the actual site
operator, and a current Tianshui or Gansu primary source, with UNESCO permitted only for heritage
background.

- **Research and protection institution: met.** The Dunhuang Academy administers the site; its
  Maijishan pages were opened and read in full, and one of them quotes the deputy director of the
  Maijishan Grottoes Art Research Institute at length on the walkway's engineering.
- **Site operator: met.** The Academy's Maijishan visitor page is the operator's own visitor
  information — opening seasons, ticket types, concessions, the visitor service centre and the
  visitor rules. The official ticketing site was reachable and is cited.
- **Tianshui or Gansu current primary source: partially met, and disclosed.** Both
  `www.tianshui.gov.cn` and the `gansu.gov.cn` hosts were unreachable from this network — the
  former refusing connections, the latter returning HTTP 412 behind a bot challenge, over both
  schemes and through two different fetch paths. The Gansu Provincial Cultural Heritage Bureau's
  director is quoted on the record inside the Academy article that was read in full, which carries
  the provincial voice; and the Tianshui municipal scenic-area committee's timed-reservation and
  shuttle arrangements are corroborated from indexed municipal pages rather than directly verified.
  Both limitations are stated in the body's review callout and itemised in `source-log.md`.

**SOURCE BLOCKED does not apply.** The brief's stated failure condition is the absence of a local
official operating source, and that source exists, was opened, and carries the operational detail
this article is built on.

## Internal links used

Only same-language pages already merged into `origin/main`, each with `en`, `zh` and `ko` bodies:
`mogao-caves-independent-visit-workflow`, `yungang-grottoes-cave-order-and-museum`,
`wheelchair-accessible-china-route-planning`, `china-hub-and-spoke-or-multi-base-route`,
`china-climate-regions-for-trip-timing`, `qilian-mountains-public-gateways-and-access`,
`dougong-and-chinese-timber-frame-reading`.

None appears in the 23-guide "reviewed" list in `supabase/tests/guide-search-terms-static.test.mjs`.
`how-to-read-heritage-sites-in-china` and `ritual-bronze-vessels-and-inscriptions` were both natural
candidates and were left out for that reason.
