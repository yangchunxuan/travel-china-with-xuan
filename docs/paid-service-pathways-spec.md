# Homeground consultation and paid-service pathways spec

Status: current implementation baseline

Updated: 24 July 2026

Scope: English, Simplified Chinese and Korean commercial journey across Home,
Planning Services, Guides and Studio

## 1. Commercial model

Homeground has one free sales entry and three paid service paths:

1. **Free trip consultation** — the traveller submits one shared trip brief and
   a working reply method. A Homeground planner reads it and recommends the
   appropriate next step.
2. **Review My Route — US$69 per trip** — for a traveller who already has a
   usable day-by-day route.
3. **Build My Route — US$129 per trip** — for a traveller who has dates and
   priorities but no usable route.
4. **Full Trip Planning & Ground Support — custom quote** — for a traveller
   who wants planning carried into selected arrangements or local
   coordination.

The consultation is not a fourth planning deliverable. It does not produce an
automatic route, a free human route review or a free version of the US$69 or
US$129 work.

## 2. Canonical journey

```text
Traveller explains the trip once
  → shared four-question trip brief
  → one working contact method
  → Homeground planner reviews the request
  → planner recommends or confirms the service
  → scope, fixed price or quote, and delivery timing are confirmed
  → payment instructions are sent
  → paid work begins after payment is confirmed
```

The four structured questions are intake signals. They help a planner
understand destinations, nights, party and pace; they are not marketed as a
standalone automatic product.

## 3. Routing principles

- A traveller may start with the free consultation or select one of the three
  paid services directly.
- All valid paths use the same trip answers, contact form and human handoff.
- The visitor is never locked into a service before payment.
- A direct service selection is useful context, not an irreversible checkout
  decision.
- The planner may recommend a different path when booking responsibility,
  scope or trip complexity makes the selected service unsuitable.
- Old `explore` session state must never restore an automatic-result path.

## 4. Page responsibilities

| Page | Primary job |
| --- | --- |
| Home | Start a free trip conversation immediately, while keeping the three paid services visible as direct secondary paths. |
| Planning Services | Explain and compare US$69 Review, US$129 Build and custom Full Trip support; offer the free shared brief as the primary “help me choose” entry. |
| Guides | Answer a real planning question, then invite the reader to submit the same free brief for human guidance. |
| Studio | Establish who does the work and return the visitor either to the free consultation or the service comparison. |

No page should describe the consultation as a Route Finder, timing checker,
wishlist checker, instant result or no-human-review tool.

## 5. Homepage rules

- The first module begins with a conversational choice such as “what would you
  like help with?”
- The neutral path is free to enquire and says that a real Homeground planner
  reads the brief.
- US$69, US$129 and Full Trip remain visible as direct service shortcuts.
- Completing the four shared questions leads to the same human handoff for all
  four valid paths.
- The result area must distinguish a request brief from a finished paid
  deliverable.
- Contact details are required only when the traveller deliberately submits
  the enquiry; nothing is sent while they are merely filling the brief.

## 6. Paid-service boundaries

- The advertised US$69 and US$129 prices apply only after Homeground confirms
  the published standard scope.
- Standard scope: up to 10 travel days, up to 4 overnight bases and one shared
  route for 1–4 travellers.
- Full Trip remains a trip-specific written scope and custom quote.
- The website does not take payment yet.
- Do not use **Buy now**, **Book now** or **Checkout**.
- A confirmation message must not imply that paid work has begun.

## 7. Copy invariants

Every locale should communicate the same facts:

- submitting the first trip brief is free;
- a real planner reads it;
- the planner recommends or confirms the appropriate service;
- scope, price or quote and delivery timing are confirmed before payment;
- payment instructions come next;
- detailed personalised work starts after payment.

Forbidden public-product narratives include:

- **free Route Finder**
- **free route/timing/wishlist check**
- **automated starting route**
- **instant automatic result**
- **no human review**
- Chinese and Korean translations of the same claims

The words “automatic” or “free” may still appear where they describe unrelated
facts, safety boundaries or the free human consultation accurately.

## 8. Query and session integrity

- Direct paid-service links may carry only allowlisted values:
  `itinerary-review`, `route-build` or `full-trip-support`.
- A neutral consultation must not silently preselect a paid service.
- Invalid or absent service values remain `null`.
- URL parameters never contain contact details or free text.
- Session storage may restore shared structured answers and the neutral
  `conversation` path, but not the retired `explore` path.

## 9. Accessibility and responsive behaviour

- Preserve one H1 per page and a logical heading hierarchy.
- Use semantic links, buttons, sections and form controls.
- Interactive targets are at least 44 × 44 CSS pixels and have visible focus.
- At 320px, the intake and service choices reflow without horizontal scrolling.
- Status and validation feedback is programmatically associated with the form.
- Decorative motion respects `prefers-reduced-motion`.

## 10. Acceptance criteria

- English, Chinese and Korean active pages contain no retired automatic-tool
  narrative.
- Home exposes one neutral consultation plus the three paid service paths.
- Every valid path reaches one mounted human enquiry handoff.
- Guides, Studio and Planning Services use the same commercial sequence.
- Privacy copy accurately distinguishes browser-only progress from deliberate
  submission.
- Regression tests reject the retired phrases and `explore` state.
- TypeScript, focused static tests, production build and desktop/mobile visual
  checks pass.

## 11. Implementation surface

- `lib/homepagePlanningDesk.ts`
- `lib/destinationPlannerI18n.ts`
- `lib/homegroundI18n.ts`
- `lib/homegroundPrivacyI18n.ts`
- `components/HomepagePlanningDesk.tsx`
- `components/RouteFinder.tsx`
- `components/HomegroundHomePage.tsx`
- `components/ChinaItineraryReviewPage.tsx`
- guide and Studio copy modules in all three locales
- focused regression tests under `supabase/tests/`

Out of scope: changing service prices, adding online payment, uploading full
itinerary files in the first brief, promising an unverified response SLA or
expanding Full Trip operational responsibility.
