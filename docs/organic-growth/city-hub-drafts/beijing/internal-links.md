# Beijing Destination Hub — internal-link plan

**Review date:** 2026-08-15
**Rule applied:** a traveller-facing body link requires a current public page in that locale. A repository folder, metadata record, remote branch or intended canonical path is not sufficient. Required owners without independent live verification remain pending links.

## Proposed Hub canonicals

| Locale | Proposed canonical | Status |
|---|---|---|
| English | `/destinations/beijing/` | proposed content draft; not registered or indexable |
| Simplified Chinese | `/zh/destinations/beijing/` | proposed content draft; not registered or indexable |
| Korean | `/ko/destinations/beijing/` | proposed content draft; not registered or indexable |

No `/guides/beijing-travel-guide/` path is proposed or created.

## Links present in all three Hub bodies

| Link role | English | Chinese | Korean | When the reader should open it | Review state |
|---|---|---|---|---|---|
| Door-to-door transport decision | `/guides/beijing-zhangjiajie-shanghai-transport/` | `/zh/guides/beijing-zhangjiajie-shanghai-transport/` | `/ko/guides/beijing-zhangjiajie-shanghai-transport/` | Beijing, Zhangjiajie and Shanghai are already shortlisted and the unresolved question is rail versus air and actual hotel-arrival time | public page independently discovered in all three locales |
| Route-duration decision | `/guides/beijing-zhangjiajie-shanghai-10-days/` | `/zh/guides/beijing-zhangjiajie-shanghai-10-days/` | `/ko/guides/beijing-zhangjiajie-shanghai-10-days/` | Ten days or ten nights is the hard constraint and the reader needs to count full sightseeing days | public page independently discovered in all three locales |
| Whole-route pace check | `/guides/is-your-china-itinerary-too-rushed/` | `/zh/guides/is-your-china-itinerary-too-rushed/` | `/ko/guides/is-your-china-itinerary-too-rushed/` | The problem may be hotel changes, transfer chains and recovery time rather than Beijing alone | public page independently discovered in all three locales |
| Unformed-route planning entry | `/#route-finder` | `/zh/#route-finder` | `/ko/#route-finder` | The traveller has dates, interests or a city shortlist but no stable sequence | current homepage Route Finder anchor |
| Existing-route review entry | `/china-itinerary-review/` | `/zh/china-itinerary-review/` | `/ko/china-itinerary-review/` | Flights, cities or a day-by-day draft already exist and need a reality check | current public service page and locale routes |

## Current article organisation inside the Hub

### Stay

The Hub compares the job of Wangfujing/Dongdan, Qianmen, Gulou–Shichahai and Dongzhimen/Chaoyang. It does not link a narrower stay owner until the exact public locale pages are independently verified. Once live, the district article should be opened when the traveller is choosing a base; the courtyard-versus-modern article should be opened only after a neighbourhood has been selected and the remaining question is the building type.

### Transport

The Hub explains how PEK, PKX and eight railway stations change the first and last day. The published Beijing–Zhangjiajie–Shanghai transport comparison is linked only when that exact multi-city transfer is under consideration. Station selection, South Station–airport transfer and Great Wall transfer execution remain with their narrower owners.

### Sights

The Hub owns the spatial relationship among the central axis, Qianmen–Temple of Heaven, Summer Palace/northwest and a separate Great Wall day. Booking, identity, gate and internal-route procedures stay with the Forbidden City, National Museum, Temple of Heaven and Summer Palace owners. Those links should appear only after their traveller-facing locale URLs are independently verified.

### Routes

The ten-day Beijing–Zhangjiajie–Shanghai owner is linked when route length is the question. The general pace article is linked when the reader may be changing bases too often. The detailed Beijing–Xi’an–Chengdu owner remains pending because the Hub should not invent a public route before a live locale set is verified.

## Required owner connections

| Owner | Scope retained by owner | Public verification state on 2026-08-15 | Hub treatment |
|---|---|---|---|
| `beijing-where-to-stay-first-trip` | Detailed district comparison, exact hotel access and first-trip property checks | repository owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `beijing-courtyard-hotel-or-modern-hotel` | Courtyard versus modern building trade-offs | repository owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `which-beijing-railway-station` | Exact station selection and station-side execution | repository/search-map owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `beijing-south-station-to-capital-or-daxing-airport` | South Station–PEK/PKX transfer mechanics | repository owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `beijing-to-mutianyu-great-wall-transfer` | Live Mutianyu transfer choices, return plan and recovery | repository owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `beijing-to-badaling-great-wall-transfer` | Live Badaling rail/transfer choices and return plan | repository owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `forbidden-city-for-foreign-visitors` | Reservation, identity document and entry procedure | repository/search-map owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `national-museum-of-china-booking-and-route` | Reservation and internal museum route | repository owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `temple-of-heaven-gates-and-ritual-sequence` | Gate choice, ritual order and internal route | repository owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `summer-palace-gates-route-and-boat-plan` | Gate choice, internal route and seasonal boat logic | repository owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `beijing-xian-chengdu-route-order` | Detailed Beijing–Xi’an–Chengdu order | repository owner exists; complete live locale set not independently verified | connected in entity graph; pending body links |
| `beijing-zhangjiajie-shanghai-10-days` | Ten-day whole-route calculation | public in all three reviewed locales | linked under Routes |

## Supporting live owners

| Owner | Role in the Hub | Treatment |
|---|---|---|
| `beijing-zhangjiajie-shanghai-transport` | Door-to-door rail/air comparison for the exact three-city sequence | linked under Transport |
| `is-your-china-itinerary-too-rushed` | General base-change, transfer-day and recovery-time diagnosis | linked under Routes |

## Link ownership boundary

The Hub owns the broad choice; child pages own execution. Therefore:

- the Hub may say which district, airport, station family, attraction cluster or next-city direction fits a trip;
- the Hub must not duplicate booking-release times, exact entrances, current bus/train schedules, terminal walking instructions or failure-recovery procedures;
- once a child owner is public, its link belongs at the moment the broad decision becomes a detailed task;
- no pending path should enter the body merely to make the draft look interconnected;
- locale parity must be checked again before implementation because publication state can change after this content review.
