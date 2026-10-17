# Attraction reservation sales revision — owner review

The reservation service now leads with the visit the traveller wants, the booking work Homeground handles, and the reason to contact us before tickets open. English, Chinese, Korean, Spanish, French, German and Arabic use the same commercial meaning in their existing local voices. The Japanese services hub explicitly links to the English reservation detail page.

## What changed

- The hero, booking friction, three timing rows, guarantee headline, agency benefits, price explanation, release-time table, FAQs and enquiry drafts form one booking path.
- Service menus, footers, service cards, full-trip support, company cards, ticket guides and sight pages now invite travellers to send their dates early. Promotional referrals to DIY articles were removed; factual source links and operator warnings remain.
- Every sales-section WhatsApp action uses the current form selection. Normal clicks, alternate opening actions, focus return and consent-aware attribution have regression coverage.
- PR #368's short-notice point is retained in the third timing row, alongside the existing late-request refund policy.

## Commercial rules retained

The base service fee is CNY 45 per person per attraction, plus the ticket's face value. Existing USD and KRW display conversions remain. Payment follows written confirmation. The guarantee requires both the request and payment at least `ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS` before the relevant visit; the constant remains 8. Best-effort attractions remain excluded. Guaranteed failures, late-request refunds, issued-ticket cancellation rules and passport handling have not been changed.

The museum release facts remain separate from the guarantee cutoff: the Forbidden City opens 7 days ahead at 20:00 China time and has no same-day tickets; the National Museum releases inventory daily at 17:00 up to 7 days ahead; Shaanxi History Museum opens 5 days ahead at 17:00. Unknown rules remain unknown in the data and are confirmed for the traveller's date.

## Verification

- Production export and TypeScript checks passed on integration commit `23ac0bd8`, including the new corporate-navigation and eight-edition header export checks.
- The full suite after integration: 1,446 passed, 16 skipped, one existing failure caused by unavailable `age-keygen` on this Windows machine (1,463 tests total).
- A mutation test changes the guarantee cutoff and checks the urgency line and all three timing rows in every edition; museum release facts must remain unchanged.
- Chrome checks covered EN/ZH/KO at 390×844 and 1366×900, with and without the privacy banner. The tested fee summaries and send controls remained usable, without horizontal overflow. The summary calculations and prepared WhatsApp/email drafts were checked. No customer message or production enquiry was submitted.
- The WhatsApp contact card retained the chosen attraction, date, party size and note; closing it returned focus to the original sales action.

## Review evidence and limits

[Before/after gallery](review/attraction-reservations-sales-20261017/README.md) includes original browser captures and section comparisons. The original capture baseline is `aee6968f`; the initial after captures are from source commit `6ec804b1`. The subsequent integration keeps the newer corporate navigation from `a5a8258d`; any refreshed navigation evidence is labelled separately.

The existing privacy banner can cover content at the bottom of the initial hero viewport; visitors can scroll or dismiss it. The required fee-summary visibility checks are distinct from an assertion that the entire hero fits above the fold. Arabic pages have an inherited horizontal-width excess in both baseline and after captures; this revision does not claim to fix that separate layout issue. The static local contact card shows its email-form fallback; direct email draft links were checked, but the production email backend was not exercised.

This branch is for owner review. It must not be merged or deployed without approval.
