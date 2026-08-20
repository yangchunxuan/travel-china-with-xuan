# Internal-link graph — First 24 Hours in China

- Checked against: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
- Checked at: `2026-08-20`
- Rule: link to an owner only when its target is independently verified live.
  A PR branch, merged file, proposed canonical or metadata date is not by
  itself a live internal-link target.
- Bounded release ledger: **29 existing published/live owners + 1
  code-integrated but not-live owner** (`china-online-arrival-card`).

## Core routing graph

| Traveller task | Canonical owner | EN target | ZH target | KO target | Baseline state | Hub treatment |
|---|---|---|---|---|---|---|
| Broad passport/purpose/route routing | `system-entry-requirements` | `/guides/china-entry-requirements/` | — | — | published, EN-only system collection | Link EN in all drafts and label it English where needed; do not invent localized routes. |
| US passport | `do-us-citizens-need-visa-china-2026` | `/guides/do-us-citizens-need-visa-china-2026/` | `/zh/guides/do-us-citizens-need-visa-china-2026/` | `/ko/guides/do-us-citizens-need-visa-china-2026/` | published | Keep one nationality owner; no state/city/year clone. |
| UK passport | `china-visa-free-uk-citizens-2026` | `/guides/china-visa-free-uk-citizens-2026/` | — | — | published, EN-only | Do not create separate ZH/KO identities; localization is an update to this owner only. |
| Canadian passport | `china-visa-free-canadian-citizens-2026` | `/guides/china-visa-free-canadian-citizens-2026/` | — | — | published, EN-only | Same boundary as UK. |
| Singapore passport | `do-singaporeans-need-visa-china` | `/guides/do-singaporeans-need-visa-china/` | `/zh/guides/do-singaporeans-need-visa-china/` | `/ko/guides/do-singaporeans-need-visa-china/` | published | Keep the mutual-waiver task here; do not copy it into the Hub. |
| 240-hour transit | `china-240-hour-visa-free-transit-route-check` | `/guides/china-240-hour-visa-free-transit-route-check/` | `/zh/guides/china-240-hour-visa-free-transit-route-check/` | `/ko/guides/china-240-hour-visa-free-transit-route-check/` | published | One route-rule owner; no city, airport or nationality split. |
| Passport condition | `china-passport-validity-and-blank-pages` | `/guides/china-passport-validity-and-blank-pages/` | `/zh/guides/china-passport-validity-and-blank-pages/` | `/ko/guides/china-passport-validity-and-blank-pages/` | published | Route-specific document check; no global six-month promise. |
| Online arrival card | `china-online-arrival-card` | proposed `/guides/china-online-arrival-card/` | proposed `/zh/guides/china-online-arrival-card/` | proposed `/ko/guides/china-online-arrival-card/` | **code merged to main; Search Map still not-published; no verified live URLs** | Plain code-integrated/not-live owner label; no internal link until central live verification. |
| Customs lane | `china-customs-red-green-channels` | `/guides/china-customs-red-green-channels/` | `/zh/guides/china-customs-red-green-channels/` | `/ko/guides/china-customs-red-green-channels/` | published | Owns declare-versus-green decision, not item-by-item packing. |
| Food/plants/animal products | `food-plants-and-animal-products-into-china` | `/guides/food-plants-and-animal-products-into-china/` | `/zh/guides/food-plants-and-animal-products-into-china/` | `/ko/guides/food-plants-and-animal-products-into-china/` | published | Owns pre-packing quarantine screen; uncertainty goes to Customs. |
| Data/local number | `china-esim-vs-local-sim` | `/guides/china-esim-vs-local-sim/` | `/zh/guides/china-esim-vs-local-sim/` | `/ko/guides/china-esim-vs-local-sim/` | published | One capability tree; no provider pages or ranking. |
| Tourist payments | `how-to-pay-in-china-as-a-tourist` | `/guides/how-to-pay-in-china-as-a-tourist/` | `/zh/guides/how-to-pay-in-china-as-a-tourist/` | `/ko/guides/how-to-pay-in-china-as-a-tourist/` | published | One payment stack; no Alipay-vs-WeChat split. |
| Hotel check-in, registration and refusal | `foreigners-china-hotel` | `/guides/foreigners-china-hotel/` | `/zh/guides/foreigners-china-hotel/` | `/ko/guides/foreigners-china-hotel/` | published canonical; PR #74 revision merged to main, deployment not assumed | Link the existing live owner; do not rely on newly merged FAQ wording until deployment is verified. |
| Non-hotel registration | `foreigners-china-hotel` (registration module) | same owner | same owner | same owner | no separate canonical | Keep the nationwide duty and limited online-pilot boundary in the existing owner; no province/city pages. |
| First airport-to-bed mode choice | `china-private-transfer-or-public-transport` | `/guides/china-private-transfer-or-public-transport/` | `/zh/guides/china-private-transfer-or-public-transport/` | `/ko/guides/china-private-transfer-or-public-transport/` | published | General mode decision only; exact terminal/service remains with airport/operator. |
| Arrival-day load | `china-arrival-day-booked-anchor-or-flexible-block` | `/guides/china-arrival-day-booked-anchor-or-flexible-block/` | `/zh/guides/china-arrival-day-booked-anchor-or-flexible-block/` | `/ko/guides/china-arrival-day-booked-anchor-or-flexible-block/` | published | Owns fixed-anchor versus flexible-block decision. |

## Failure-recovery graph

| Failure | Owner | EN / ZH / KO paths verified on baseline |
|---|---|---|
| ATM debited, no cash | `china-atm-cash-not-dispensed` | yes / yes / yes |
| Wrong map pin or entrance | `china-map-coordinate-offset-explained` | yes / yes / yes |
| Booking dispute evidence | `china-booking-dispute-evidence-pack` | yes / yes / yes |
| Lost phone and digital recovery | `lost-phone-in-china-digital-recovery` | yes / yes / yes |
| Lost passport and exit recovery | `lost-passport-in-china-exit-recovery` | yes / yes / yes |
| Public Wi-Fi passport login | `china-public-wifi-passport-login` | yes / yes / yes |

## Link activation gate

Before a public Hub is created, central must:

1. repeat the currently passed check that `china-online-arrival-card` remains
   on the release-day `main`;
2. verify all three proposed locale URLs return canonical, indexable pages;
3. re-run the collection eligibility gate;
4. replace the code-integrated/not-live owner text with locale-correct links in one commit;
5. run the repository link/export checks and a crawl of all Hub targets;
6. keep the UK, Canada and system collection links English-only unless those
   same owners receive approved locale updates.
