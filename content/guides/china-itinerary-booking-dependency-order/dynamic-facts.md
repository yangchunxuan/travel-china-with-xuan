# Dynamic facts — China itinerary booking dependency order

Reviewed: 2026-09-01 (Asia/Shanghai)

| Field | Current primary verifier | Recheck point | Conservative fallback |
|---|---|---|---|
| Whether a dated domestic rail segment is on sale, eligible for a route-limited reservation request, waitlisted or issued | China Railway 12306 | When the route first becomes searchable, at every status change and before a downstream cancellation deadline | Keep the segment provisional; a request or waitlist is not a ticket |
| Railway passenger identity status | China Railway 12306 account and current official identity guidance | Before the relevant sales or request window | Do not rely on same-day verification; keep the station-window recovery path |
| Exact train, date, stations and ticket status | Issued 12306 order | At issuance, after any change and before travel | Do not place non-refundable downstream activity around an assumed service |
| International-flight gateway and fare conditions | Contracting carrier, actual operating carrier and issued fare rules | Before purchase and after schedule or operating-carrier changes | Keep both route directions open or buy only when the consequence is acceptable |
| Hotel cancellation, payment and no-show terms | The exact room-rate contract on the chosen channel plus property confirmation | Before booking, before the cancellation deadline and after route changes | Treat an unclear or non-refundable room as a hard commitment, not a placeholder |
| Trip-defining venue release, identity, cancellation and temporary closure rules | The named venue's current official booking and notice pages | At route design, when its window opens and shortly before the visit | Keep the day replaceable until admission is confirmed; never generalise one venue's window |
| Public-holiday and adjusted-workday dates | State Council annual notice | When the official annual notice is published and before commitments | Mark a pressure trigger without predicting sell-outs, price increases or a crowd score |

No timetable, fare, availability, success probability or universal advance-purchase window is stored. Current official railway rules include both ordinary sales and a route-limited reservation pilot; the rail owner must be re-read for the traveller's exact segment.
