# Dynamic fact review — chengdu-chongqing-station-pair

Reviewed: **2026-09-01 (Asia/Shanghai)**
Freshness class: **high – railway ticket inventory, station roles and local access**
Release gate: **reopen every official source and the live 12306 train result in the publication week**

| Dynamic fact | Safe wording | Recheck trigger | If not verifiable |
|---|---|---|---|
| Exact train and both railway stations | Both endpoints on the same dated 12306 train result control; separately searched station candidates are never a verified pair | Every traveller date; railway diagram, station or service notice | Delete the example and retain only same-train endpoint verification |
| Local rail, metro, coach, taxi or ride-hail access | Describe only the current category or dated baseline, never a guaranteed connection | Operating notice, construction, weather, road or pickup-zone change | Require current signage/operator check and keep a legal fallback |
| First/last rail departure, fare, journey time and frequency | Not frozen in public copy | Every release and travel day | Omit the number; show the decision method instead |
| Luggage, step-free route and staffed help | Treat as a condition to verify for the exact node and hour | Facility, lift/escalator, security or operator change | Keep the group together and route via staffed help or a verified accessible alternative |
| Change, refund, missed-train or wrong-station remedy | Use the Chongqing railway station selector for recovery and ask 12306 or railway staff about the active order; promise no outcome | Rule, app or ticket-status change | Give no eligibility promise and recalculate the Chengdu–Chongqing door-to-door chain |

## Durable rule

Search the real date in 12306 and connect the exact printed pair to both hotel doors; the shortest rail segment is not the decision.

## Never freeze

- train numbers, seat inventory, station-service lists or direction-by-station tables;
- fares, first/last services, promised travel times, pickup bays, platforms, exits or gate assignments;
- a claim that one node is always best for a city, hotel or attraction;
- supplier rankings, unverified drivers or a guaranteed missed-connection remedy.

All three public languages must be reviewed together after a trigger.
