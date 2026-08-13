# Source log — china-arrival-day-booked-anchor-or-flexible-block

- Topic ID: `hg-topic-0229`
- Reviewed: `2026-08-13`
- Owner: employee 4 / planning
- Status: `CENTRAL COPY AND FACT REVIEW COMPLETE — ASSET QA PENDING`

## Direct answer and editorial rule

International arrival days default to a flexible block. A hard-to-replace timed booking is considered only when the arrival, entry, baggage, ground-transport, hotel and venue links are all identifiable, the plan does not require every link to run perfectly, and the missed-booking loss is acceptable. Any critical unknown returns the answer to flexibility. This is a Homeground editorial decision framework, not an official processing-time guarantee.

## Official evidence and use

1. National Immigration Administration, online arrival-card notice: <https://en.nia.gov.cn/n147418/n147468/c187308/content.html>
   - Since 20 November 2025, eligible foreign travellers may complete arrival information online before travel; people unable to do so may complete it at the port.
   - Boundary: pre-filling does not bypass frontier inspection and provides no processing-time promise.
2. National Immigration Administration, Exit and Entry Administration Law: <https://www.nia.gov.cn/n741440/n741547/c757592/content.html>
   - Article 24 requires foreign entrants to present qualifying documents and complete frontier inspection.
   - Boundary: the law does not support a universal queue allowance.
3. Civil Aviation Administration of China, Public Air Transport Passenger Service Rules: <https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html>
   - Supports the existence of delay/cancellation changes and baggage-delay handling, including an incident record on request and collection/delivery or an agreed solution under the applicable rule.
   - Boundary: no punctuality rate or guaranteed bag-release time is inferred.
4. China Railway 12306 FAQ: <https://www.12306.cn/en/faq.html?item=2>
   - Official booking, endorsement/change and refund processes depend on the ticket, time and actual availability; station entry also includes security, identity and gate processes.
   - Boundary: a later train is not assumed to be available, and a ticket change is not treated as unlimited recovery.
5. The Palace Museum, online booking: <https://www.dpm.org.cn/subject_booking/>
   - Supports use of real-name, date/session, document and admission conditions as a concrete hard-to-replace booking example.
   - Dynamic: exact sessions, scan periods, cancellation and no-show terms must be re-read for the visit date.
6. National Museum of China, Visitor Reservation Guidelines: <https://en.chnmuseum.cn/visit_692/>
   - Supports document/period verification and cancellation/no-show consequences as a second venue example.
   - Boundary: its rules are not generalized to all museums.

## Explicit unknowns

- No immigration, baggage, station-exit, taxi-queue or airport-to-hotel duration is claimed.
- No airline or rail punctuality rate is used.
- The framework does not assume that an online arrival card speeds the queue.
- Hotel room readiness and luggage storage require a property-specific answer.
- Venue booking releases, entry periods, closures and no-show terms are dynamic.

## Information-object inventory (27)

1. Direct answer.
2. Timed-booking definition.
3. Flexible-block definition.
4. Scarce versus replaceable activity.
5. Scheduled versus actual arrival.
6. Entry eligibility boundary.
7. Arrival-card process.
8. Frontier inspection.
9. Checked-bag branch.
10. Delayed-bag recovery.
11. Actual terminal or station.
12. Terminal release.
13. Ground mode and operating window.
14. Transfer count and final walk.
15. Hotel reception.
16. Luggage storage.
17. Room-readiness boundary.
18. Venue security.
19. Identity-document match.
20. Entry period and last admission.
21. Cancellation deadline.
22. No-show consequence.
23. Four-gate admission rule.
24. International-flight branch.
25. Domestic-flight/rail branches.
26. Flexible module and deletion rule.
27. Failure recovery and final live verification.

## Traveller scenarios

- Long-haul international afternoon arrival + checked bag + proposed Palace Museum visit: flexible.
- Morning domestic high-speed rail + carry-on + confirmed station-adjacent storage + later museum period: conditional timed visit after live checks.

## Canonical audit and ownership boundary

At the start of the 2026-08-13 review, the exact slug was absent from the baseline `origin/main`. A previous employee-4 batch note recorded that this candidate had been replaced because `is-your-china-itinerary-too-rushed` already discussed usable arrival time and fixed-booking dependency. The central assignment explicitly commissions this narrower owner. This page owns only the first-day hard-to-replace booking decision, arrival-chain risk tree and failure recovery. It does not own full-trip overload, exact airport routes, ground-mode selection, venue execution or the last night before departure.

## Link plan

- Parent: `/plan/`.
- Published supporting owners: `is-your-china-itinerary-too-rushed`, `china-open-jaw-flights-route-planning`, `china-hotel-near-metro`, `forbidden-city-for-foreign-visitors`.
- Same-batch adjacent owner: `china-private-transfer-or-public-transport` chooses the ground mode for one segment; this page only decides whether the complete arrival chain can support a timed booking.
- Future inbound owners: the rushed-itinerary guide, international-arrival hub guides and venue reservation owners where an arrival-day warning is relevant.

## Maintenance trigger

Recheck NIA arrival-card/entry notices, CAAC passenger-service rules, 12306 change/refund wording and both venue admission notices before central publication and whenever a named authority changes its rule. Metadata `sourceReviewedDate` must move with a substantive re-review.

## Central review note — 2026-08-13

EN/ZH/KO copy, structural parity, metadata, internal links and official-source boundaries were reviewed together. Reader-facing “anchor” jargon was replaced with natural timed-booking language while the canonical slug and internal block ID remain unchanged for compatibility.
