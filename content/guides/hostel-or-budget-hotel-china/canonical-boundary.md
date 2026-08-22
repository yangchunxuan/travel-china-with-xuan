# Canonical boundary — hostel-or-budget-hotel-china

- **topicId:** hg-topic-0541
- **Collection (pillar):** stay-hotel-types-scenic-bases
- **Base commit:** origin/main@e99e42c71e4e9be8853afdc406dc89caeebda334
- **Boundary written before drafting:** yes, 2026-08-22

## The one search task this page owns

An independent traveller needs to choose between a **hostel dormitory bed, a hostel private room
and a budget hotel room** on the basis of privacy, support, luggage, front desk, entry after hours,
bathroom, noise, laundry and late check-in — and needs a per-property verification method, because
that is where the answers actually live.

## Slug and task occupancy check

Checked 2026-08-22 against `origin/main`, every ref under `refs/remotes` and every local branch.
No ref contains `content/guides/hostel-or-budget-hotel-china/` or a near-synonym directory
(`hostel-*`, `budget-hotel-*`, `youth-hostel-*`). **No canonical conflict.**

## Adjacent owners and how the border is drawn

| Adjacent owner | Status | What it keeps | What this page must not take |
| --- | --- | --- | --- |
| `foreigners-china-hotel` | published on origin/main | Foreign-guest registration in full | The registration FAQ. This page states only the structural rule from the Measures — that registration is compulsory, that ID must be checked, and that overseas guests are filed within 24 hours — because that is *why* capability differs by property. It then links out and explicitly refuses to make any national claim about document acceptance |
| `minsu-homestay-or-hotel-china` | published on origin/main | The minsu-versus-hotel decision | Any minsu material |
| `serviced-apartment-or-hotel-china` | published on origin/main | The long-stay apartment decision | Any serviced-apartment material |
| `international-chain-or-local-hotel-china` | published on origin/main | The chain-versus-local axis | Any brand or chain comparison |
| `china-hotel-near-metro` | published on origin/main | Location and metro-exit checks | The location decision. Linked, not restated |
| `china-accessible-hotel-room-verification` | published on origin/main | Accessibility verification | Accessibility verification detail. The lift question appears only as one line of the general checklist, and links out |
| `china-hotel-emergency-exit-fire-safety-check` | published on origin/main | Property safety checks | The safety checklist |
| `china-booking-dispute-evidence-pack` | published on origin/main | Dispute evidence | The evidence-pack method. Referenced in one sentence and linked |

## Explicit exclusions honoured in the draft

- No hostel or hotel rankings, and no property is named anywhere.
- No nightly rates and no daily-average price claims.
- No city, month, nationality or age variant pages, and no such framing in the copy.
- **No national generalisation about whether hostels accept foreign guests.** The draft has a
  dedicated callout refusing to make that claim, and every document, age, gender, deposit,
  front-desk and curfew rule is presented as a per-property question with an explicit note that
  the answer applies to that property only.
- No absorption of the foreign-guest registration FAQ.

## What this page is allowed to state nationally, and why

Exactly one class of fact: what the **Measures for Public Security Administration of the Hotel
Industry** themselves say, because they are a State Council-approved administrative regulation
published in the State Council Gazette and they state their own scope. The draft uses them for six
points — universal application across property types and ownership forms, compulsory registration
with ID inspection, the 24-hour filing step for overseas guests, the safekeeping requirement, the
prohibition on transferring a bed, and the explicit provision for provincial implementing rules.
That last point is the source-backed reason the rest of the page is a checklist rather than a set
of answers.

## Internal links used

Only same-language pages already merged into `origin/main`, each with `en`, `zh` and `ko` bodies:
`foreigners-china-hotel`, `minsu-homestay-or-hotel-china`, `serviced-apartment-or-hotel-china`,
`international-chain-or-local-hotel-china`, `china-hotel-near-metro`,
`china-hotel-emergency-exit-fire-safety-check`, `china-accessible-hotel-room-verification`,
`china-booking-dispute-evidence-pack`.

None appears in the 23-guide "reviewed" list in `supabase/tests/guide-search-terms-static.test.mjs`,
so no reviewed guide's inbound-owner record drifts because of this page.
