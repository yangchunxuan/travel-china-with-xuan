# Source log — china-private-transfer-or-public-transport

- Topic ID: `hg-topic-0230`
- Reviewed: `2026-08-13`
- Owner: employee 4 / planning
- Status: `CENTRAL COPY AND FACT REVIEW COMPLETE — ASSET QA PENDING`

## Direct answer and editorial rule

Assess one named ground segment. Eliminate any public option whose operating/access/last-stretch chain cannot be verified and any private option whose operator, pickup, vehicle, capacity, waiting and cancellation terms cannot be verified. If both remain: prefer a direct public trunk when the party can handle the full chain; prefer a confirmed private transfer when it removes repeated handling or a high-consequence weak link; prefer a hybrid when the trunk works but the last stretch does not. This is Homeground editorial judgment, not an official national rule.

## Official evidence and use

1. Beijing Capital International Airport, ride-hailing pickup points: <https://www.bcia.com.cn/jcwyc.html>
   - Shows that terminal-specific ride-hailing pickup may require a named parking building and level.
   - Boundary: recheck the actual terminal and current pickup notice; do not generalize to all airports.
2. Beijing Capital International Airport, Airport Express: <https://www.bcia.com.cn/dtjcx.html>
   - Supports the direct-public-trunk example with named terminal stations and current operating information.
   - Dynamic: hours, station access and maintenance require date-specific verification.
3. Shanghai Municipal People's Government, airport transport: <https://english.shanghai.gov.cn/en-Transportation/20231214/649e06ea38f74aaeb573fa2debbe97d3.html>
   - Lists rail, metro, bus and taxi choices for Shanghai airports and warns that detailed operations can adjust.
   - Used to support a public-trunk-plus-last-segment hybrid, not a fixed timetable.
4. China Railway 12306 FAQ: <https://www.12306.cn/en/faq.html?item=2>
   - Station entry can include security, identity checks, gates and queues; ticket checks stop before departure under station announcements.
   - Boundary: no universal station buffer is inferred.
5. Civil Aviation Administration of China, passenger service rules: <https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html>
   - Flight changes and baggage delay can alter a driver's waiting chain; delayed baggage has a formal incident/collection/delivery process.
   - Boundary: the rule does not make a private driver wait or guarantee baggage time.
6. State Administration for Market Regulation, interim ride-hailing measures: <https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_1f0d6bf9e2e6476aa22af1d17f38e1ef.html>
   - Article 20 requires ride-hailing platforms to set fares reasonably, display them clearly and provide the relevant taxi invoice.
   - Boundary: price disclosure is not vehicle-suitability or reliability certification.
7. State Administration for Market Regulation, complaint-handling measures effective 15 April 2026: <https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2026/art_e4d03a20c0fd49769e408c7bf3791ff5.html>
   - Complaint handling requires an identifiable operator, facts and a specific request.
   - Editorial inference: retain operator, quote, vehicle, terms, messages and payment evidence.

## Unknowns and prohibited claims

- No supplier ranking, live inventory or unverified current fare appears.
- No private or public option is called universally faster.
- No live airport/station operating time is embedded as evergreen truth.
- A private vehicle is not assumed to accept a wheelchair or child arrangement.
- A public lift symbol is not treated as a complete accessible route.
- A purchased car is not described as guaranteeing a separate flight or rail connection.

## Information-object inventory (28)

1. Direct answer.
2. One-segment boundary.
3. Public/private/hybrid definitions.
4. Exact arrival terminal or station.
5. Exact hotel vehicle entrance.
6. Pickup zone/building/level.
7. Public operating window.
8. Public transfer count.
9. Lift/stair chain.
10. First and last stretch.
11. Actual bag count and free hands.
12. Child/stroller handling.
13. Mobility constraint.
14. Weather exposure.
15. Follow-on connection consequence.
16. Private operator identity.
17. Driver contact and vehicle plate.
18. Vehicle/passenger capacity.
19. Luggage capacity.
20. Wheelchair/child arrangement confirmation.
21. Waiting start and flight tracking.
22. Included fees.
23. Cancellation/refund.
24. Order evidence.
25. Elimination gates.
26. Conditional decision table.
27. Three traveller cases.
28. Failure recovery and final live verification.

## Traveller scenarios

- Solo traveller with one manageable suitcase, hotel beside a direct airport line, no fixed follow-on: public transport normally wins.
- Family with a young child, stroller and several bags, evening arrival and a hard last stretch: private may be worth it after exact confirmation.
- Wheelchair traveller: whichever public or vehicle chain is confirmed end to end; private is not the default.

## Canonical audit and ownership boundary

At the start of the 2026-08-13 review, the exact slug was absent from the baseline `origin/main`. Specific corridor owners—including `beijing-south-station-to-capital-or-daxing-airport` and `pudong-airport-to-shanghai-disneyland`—retain exact route execution. `shanghai-pudong-or-hongqiao-airport` retains airport selection, while `wheelchair-accessible-china-route-planning` retains end-to-end accessibility verification. This page owns only the purchase decision for one complex arrival/departure ground segment; it does not create city × mode pages, a national fare table or supplier rankings.

## Link plan

- Parent: `/plan/`.
- Published supporting owners: `shanghai-pudong-or-hongqiao-airport`, `beijing-south-station-to-capital-or-daxing-airport`, `china-hotel-near-metro`, `china-last-night-before-international-flight`.
- Same-batch adjacent owner: `wheelchair-accessible-china-route-planning` verifies the end-to-end accessibility chain; this page only compares paid-car and public options for one named segment.
- Future inbound owners: named airport/station execution pages may link here when users need to choose how much handling to buy away.

## Maintenance trigger

Recheck terminal pickup points, public operating windows and maintenance, station procedure, ride-hailing price/complaint regulation and CAAC baggage/change rules before publication and after any official update. Quoted service terms always require booking-specific confirmation.

## Central review note — 2026-08-13

EN/ZH/KO copy, structural parity, metadata, internal links and official-source boundaries were reviewed together. Legal-status wording now asks readers to identify the provider and verify any required local credentials instead of asking them to make an unsupported legality judgment; wheelchair claims remain conditional on end-to-end operator confirmation.
