# Dynamic fact review — china-ride-hailing-pickup-failure-recovery

Reviewed: **2026-08-22 (Asia/Shanghai)**
Freshness class: **high — platform UI, pickup-zone access, vehicle assignment, venue rules, roads and cancellation handling**
Release gate: **Retest the current first-party order chat, pickup-point change, vehicle details, cancellation and safety flows and verify any named venue pickup zone before publication**

| Dynamic fact | Safe wording | Recheck trigger | If not verifiable |
|---|---|---|---|
| Assigned vehicle and driver details | Read only from the active order | Every assignment or reassignment | Do not board and contact platform support |
| Pickup pin and venue zone | Confirm against physical signs and staff | Road, terminal or GPS change | Move to a staffed legal pickup area before reordering |
| Cancellation and fee handling | Use the platform's current recorded flow | Policy or UI update | Preserve evidence and request review without promising reversal |
| Public-transport or taxi fallback | Verify live entrance and service | Time, closure or disruption | Ask official venue staff |

## Durable rule

Stand at a safe named place, match the assigned car and active order, and close a failed pickup through the recorded platform path before switching.

## Never freeze

- a best ride-hailing app
- a fixed pickup zone
- a promised cancellation-fee reversal
- driver or vehicle safety
- arrival time or route

All three public languages must be reviewed and updated together after a trigger.
