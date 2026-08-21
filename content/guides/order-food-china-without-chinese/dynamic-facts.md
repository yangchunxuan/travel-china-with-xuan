# Dynamic fact review — order-food-china-without-chinese

Reviewed: **2026-08-22 (Asia/Shanghai)**
Freshness class: **medium — menu interfaces, prices, dishes, payment support and delivery operations**
Release gate: **Retest counter, paper, QR and delivery handoffs with current official platform and payment guidance, and remove any interface detail that cannot be reproduced before publication**

| Dynamic fact | Safe wording | Recheck trigger | If not verifiable |
|---|---|---|---|
| QR login and ordering flow | Describe only the tested restaurant screen | Interface or authentication change | Use the staffed counter or paper menu |
| Payment acceptance | Confirm at the actual merchant | Merchant or provider change | Use a second accepted payment route |
| Menu, price and availability | Use the current restaurant menu | Every visit | Ask staff to mark an available item |
| Delivery address and status | Verify per order | Pin, driver or platform change | Agree a safe visible handoff or collect in person |

## Durable rule

Preserve the original item, confirm one order component at a time and switch surfaces without losing the transaction record.

## Never freeze

- a best food app
- a universal QR login requirement
- a fixed price or dish availability
- allergen safety
- delivery arrival or refund

All three public languages must be reviewed and updated together after a trigger.
