# Canonical boundary — china-airport-layover-immigration-bags-airside-overnight

Candidate: `essentials-20260822-scale-03`

## Owns

- Airport-layover decision sequence for immigration, checked baggage, airside/landside movement and overnight fallback
- A three-lane confirmation record covering passenger, bag and sleep route
- Failure recovery when a transfer dependency changes at the airport

## Does not own

- An individual transit-without-visa or admission decision
- General visa eligibility, self-transfer economics or city-airport comparison
- Promises about through-checking, connection protection, facility hours or hotel access

## Merge rule

General China airport layover queries that require immigration, bag, airside and overnight decisions merge here. Visa-law explainers, separate-ticket risk and specific airport comparisons keep their existing owners.

Do not create nationality, device, airport, attraction, city or app variants unless a future Search Map decision assigns a materially different task.
