# Terracotta Warriors private half-day — owner-review draft

## Scope and status

The owner approved creating an itinerary and product-page draft on 12 October
2026, with prices deferred until supplier quotes arrive. Publication is **not**
approved. Baseline: `origin/main` at
`892a787dbf8400d38c9a0849ec3fa3dc108685a5`.

The EN/ZH/KO pages use the established `/preview/` development-only mechanism,
not the exported `visibility: "preview"` tour catalogue mechanism. Routes return
not-found in production and the existing postbuild pruner removes all three
preview roots. They are noindex/nofollow, unlisted, have no offers, fake prices,
reviews or ratings, and do not register a new product in sitemap, search,
homepage, AI files or inquiry contracts. The page has an owner-review strip.

Local paths:

- `/preview/xian-terracotta-warriors-half-day-private-tour/`
- `/zh/preview/xian-terracotta-warriors-half-day-private-tour/`
- `/ko/preview/xian-terracotta-warriors-half-day-private-tour/`

Planned public path, **not created**:
`/tours/xian-terracotta-warriors-half-day-private-tour/` and its reviewed locale
equivalents. Do not remove the draft guards to publish without completing the
release gates below.

## Proposed itinerary

1. Agreed city-centre Xi'an hotel pickup and private drive to the museum; roughly
   one hour each way, depending on hotel and traffic.
2. About 2.5–3 hours with a private English-speaking guide at the open pits and
   exhibition areas. The order follows access/crowds and party needs.
3. Private return transfer to the agreed hotel.

Target 5–6 hours door-to-door, not a guaranteed return time. Morning/afternoon
availability, guide meeting point and hotel zone remain to be confirmed. The
museum's second site, Lishan Garden, is outside the guided base itinerary;
an admission entitlement must not be confused with included guide/car time.

Proposed scope: private vehicle plus separate driver, private English museum
guide, quoted guests' museum admission/reservation, agreed hotel transfers and
specified tolls/parking. No shopping stop planned. Accommodation, lunch, personal
spending, optional tips, airport/rail transfers, Huaqing Palace, a guided Lishan
extension and extra service time are outside the base plan unless agreed.

Every one of these commercial arrangements is a proposal pending supplier
confirmation. Existing tour prices, routes and service promises are unchanged.

## Evidence

- Official visitor guidance, checked 12 October 2026:
  <https://www.bmy.com.cn/guide/>. Real-name reservation, original accepted ID at
  entry, and the two museum sites. No queue bypass or ticket guarantee inferred.
- Official one-ticket notice (18 May 2021), read again 12 October 2026:
  <https://www.bmy.com.cn/news/news/980.html>. Standard admission covers the
  warriors site and Lishan Garden. The FAQ answers that ticket question directly
  and distinguishes it from the proposed half-day's guide and car coverage.
- Earlier authorised research and keyword observations:
  `~/Desktop/Homeground-SEO/two-product-demand-20261012/product-proposals.json`
  and `semrush-three-country-observations.json`. US/AU/CA queries inform title
  and intent; search volume is not customer or sales evidence.
- Hero reused unchanged from
  `public/images/tours/photo-quality-20261004/terracotta.webp` (3200×2133).
  Existing project credit: Gary Todd from Xinzheng, China, CC0 1.0,
  <https://commons.wikimedia.org/wiki/File:Qin_Terracotta_Army,_Pit_1_(9895750725).jpg>.
  Attribution remains visible. No new generated imagery.

## Quote entry

The hero and quote-card actions scroll to the trip-detail checklist: date/time,
adults/children/needs, exact hotel/return point. This is deliberately a review
page; there is no submit form, request API, email/WhatsApp handoff, payment or
booking button. Existing DIY, ticket-assistance and five-day tour links point
out to their actual published pages. They do not imply this draft is bookable.

## Before sale or publication

- Obtain actual car/driver and licensed English-guide procurement quotes;
  establish hotel zone, usable vehicle seats, luggage, meeting point and extra
  time costs. Do not halve the existing retail guide day rate.
- Verify foreign-passport booking/redemption, child ticket rules and genuine
  date availability. Do not collect passports through this draft.
- Owner approves selling prices and whether tickets, parking/tolls and any
  optional add-ons are in the quoted whole-party total; child prices by age.
- Set ticket, car and guide cancellation/reschedule/no-show rules and
  provider-cancellation handling. No refund guarantee invented here.
- Agree start/return buffers and accessibility/child-seat arrangements.
- Register the actual product/inquiry contracts and required backend migration
  only as a separate approved release. Verify the quote works without being
  bound to the existing five-day Xi'an product, in an isolated test environment.
- Finalise page metadata/FAQ schema (if used), catalogue/destination/DIY inbound
  links and current font coverage; seek explicit publication approval.

## Verification

- Typecheck passed; 28 affected preview/product tests and all 7 guide-search
  tests passed. No production-backed inquiry tests were submitted.
- Full build and all postbuild export checks passed, including locale font
  coverage, Japanese export and existing service/guide-card checks. An explicit
  final-output check confirms the draft is absent from `out/`, sitemap and
  `llms.txt` in all three languages.
- Native user Chrome review: EN 1440×900 desktop, EN 390×844 mobile, and
  EN/ZH/KO 320px full-page screenshots. All three local routes returned 200 and
  noindex/nofollow. The hero action was clicked and reached the intended detail
  section; Chinese FAQ was opened and closed with Enter, and traversed with Tab.
- Independent screenshot review found no blockers. The reported narrow Korean
  step-number wraps and Chinese heading splits were fixed and re-reviewed.
- Evidence: `~/Desktop/Homeground-SEO/terracotta-half-day-draft-20261012/`
  (screenshots, independent `visual-review.md`, and bounded check logs).
- Local shared chrome may request Cloudflare's `/cdn-cgi/trace/`, which is not
  provided by the development server and returns 404. This is an existing local
  header/traffic behaviour, unrelated to this draft; no new runtime failure was
  found. The existing shared `GuideTourEntry` CSS warning was not changed.

Nothing in a local preview, passing build or draft PR proves publication.
