# Dynamic facts — One Hub or Multiple Bases in China?

Reviewed: 2026-09-01 (Asia/Shanghai)

The visible article contains no promised train, room, ticket, view, fare, inventory or universal duration. The following fields must be rechecked for the traveller's actual dates.

| Dynamic field | Current evidence used | Safe article use | Recheck trigger | Primary verifier |
| --- | --- | --- | --- | --- |
| Exact rail origin, destination and dated service | 12306 offers From / To / Date journey search | Require exact station-pair and date verification | Date enters the searchable or sale window; station/service changes | China Railway 12306 |
| Station entry and ticket-check boundary | 12306 says sales and checks stop before departure and station processes may queue | Do not invent one national arrival margin | Ticket, station or passenger-process notice changes | 12306 and the named station |
| Passenger identity document | 12306 English FAQ describes valid passport use for foreign passengers | Carry the booking identity document; do not promise a platform workflow | Passenger-document rule changes | 12306 |
| Hotel rate and cancellation conditions | LB/T 094—2025 requires booking information and cancellation conditions to be disclosed | Verify the booked rate, not a hotel-brand assumption | Rate or booking channel changes | Property and contracted booking channel |
| Check-in, checkout and luggage | Property-specific; a representative IHG Suzhou page publishes its own times and says cancellation varies by rate | Treat every handoff as a step; never generalise one property's hours nationally | Property, rate or arrival plan changes | The named property |
| Shanghai station identity | Shanghai's official guide lists multiple railway stations | Require exact Shanghai station | Train call or hotel area changes | Shanghai government guide and 12306 |
| Suzhou venue reservation and entry | Suzhou Museum issued dated 2026 holiday and summer notices | Use only to show that dated venue rules can override a generic plan | New visit notice, holiday, exhibition or booking release | Suzhou Museum / Suzhou government |
| Suzhou local last leg | August 2026 metro notice adjusted late-evening intervals and reminded late travellers to check current times | Recheck the whole return, not only intercity rail | Timetable or engineering adjustment | Suzhou Rail Transit official notice |
| Huangshan shuttle, ropeway and entrance topology | Committee pages tie transfer boundaries to ropeway operation; a 2026 notice shows holiday overrides | Treat access and last-service edges as dynamic | Season, weather, maintenance, holiday or entrance change | Huangshan Scenic Area Administrative Committee |
| Huangshan cross-night value | A committee property page describes morning/evening viewpoint access from a mountain hotel | Establish possible location value only | Hotel access, trail or viewpoint rule changes | Committee/property page |
| Guilin–Yangshuo transport nodes | Li River scenic-area page distinguishes stations, county access and wharves and notes some dynamic adjustments | Do not treat either city label as one node | Sailing, pier, rail or shuttle change | Li River scenic area and named operator |

## Conservative unknown handling

Distinguish a fact that is **not yet published or searchable** from an option that is **confirmed unavailable**. The first receives `status: provisional` only until a named recheck or commitment deadline; the second requires replacement or removal unless another independent purpose supports a different role. Build a range containing only structural roles from the specific unknown:

- `remove ↔ day trip` when the candidate purpose or timed entry is not yet published; add `one overnight` only when separately verified cross-night value, a confirmed room and a workable next-day chain already support it;
- `remove ↔ day trip` when the return or local last leg is unknown; add `one overnight` only under the same independent cross-night, room and next-day-chain conditions;
- `remove ↔ day trip` when a forward no-night edge or its luggage path is unconfirmed; add `one overnight` only under those same independent conditions;
- `one overnight ↔ true base` only when an additional independent priority or repeated local start is unconfirmed;
- `remove ↔ day trip` (or the smallest other plausible role) when another controlling access condition is not yet verified; never add a night merely because that access fact is missing.

Record the role range, provisional status, every missing field, owner, checked date, switch condition and decision deadline. A night cannot repair an unavailable anchor without independent cross-night value. Do not assign a numeric confidence or crowd score.

## Holiday override

Any Chinese public-holiday date triggers a fresh check of rail capacity, venue notices, local services, accommodation cancellation conditions and all recovery options. The article does not predict crowds or extend a dated holiday schedule into ordinary days.
