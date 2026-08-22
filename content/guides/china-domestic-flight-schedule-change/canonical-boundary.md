# Canonical boundary — china-domestic-flight-schedule-change

contentId / slug: `china-domestic-flight-schedule-change`
topicId: `hg-topic-0680`

## Sole canonical ownership

What a traveller does after already holding a China domestic flight when it is rescheduled in advance, delayed, cancelled, strands them at a stopover, diverts, or breaks a same-ticket or separate-ticket connection — confirming status, preserving evidence, choosing between accepting the new flight, involuntary rebooking, fee-free refund, arranged accommodation and switching the leg to high-speed rail, protecting downstream bookings, and escalating or tracking refunds when channels stall.

## Merged query intents (owned by this page)

- China domestic flight cancelled
- China flight delayed what to do
- China airline changed my flight
- China flight cancellation refund
- China flight delay hotel
- China domestic flight compensation
- cancelled China flight rebook or train
- OTA booked China flight cancelled
- missed connection after China domestic flight delay

All nine intents are answered on one page per locale; none receives a separate landing page.

## Explicitly excluded (belongs to other owners)

| Excluded topic | Owner page |
|---|---|
| Pre-purchase comparison of fare bundles, baggage and change rules | `china-domestic-flight-fare-bundle-baggage` |
| Whether separately issued tickets are worth buying; self-transfer contract risk | `china-separate-flight-tickets-self-transfer-risk` |
| Ordinary airport/terminal transfer planning | airport-specific guides |
| Lost or damaged baggage handling | (future owner; not claimed here) |
| International-flight passenger regimes | (out of scope; no foreign regime applied) |
| Generic order-dispute evidence workflow (12315/PBOC/card disputes) | `china-booking-dispute-evidence-pack` |
| Where to spend the last night before an international departure | `china-last-night-before-international-flight` |
| Airline rankings; punctuality prediction | (not produced) |
| Fixed statutory compensation amounts | (none exists; tiers only as attributed carrier examples) |
| Travel-insurance claim conclusions; legal advice | (explicitly disclaimed) |

## Internal links used (all three locales jump to their own locale paths)

1. `/guides/china-domestic-flight-fare-bundle-baggage/` (+ `/zh/`, `/ko/`)
2. `/guides/china-separate-flight-tickets-self-transfer-risk/` (+ `/zh/`, `/ko/`)
3. `/guides/china-booking-dispute-evidence-pack/` (+ `/zh/`, `/ko/`)
4. `/guides/china-high-speed-train-first-time-guide/` (+ `/zh/`, `/ko/`)
5. `/guides/china-rail-only-route/` (+ `/zh/`, `/ko/`)
6. `/guides/china-last-night-before-international-flight/` (+ `/zh/`, `/ko/`)

## Collection mapping required from central

The article declares `search.section: essentials`, `search.family: task`, `search.primaryIntent: in-trip`. The shared registry (`lib/searchCollectionI18n.ts`) has **no** entry for this guide, which fails:

- `supabase/tests/search-platform-static.test.mjs` → "every independent guide resolves to a collection in its declared section"
- production build at sitemap generation (`getGuideCollectionId` throws)

Central must add, after review:

```ts
"china-domestic-flight-schedule-change": "essentials-booking-registration-recovery",
```

A temporary, uncommitted QA overlay with exactly this line was used for local build/browser verification and reverted before commit.
