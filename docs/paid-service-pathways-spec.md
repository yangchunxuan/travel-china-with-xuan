# Homeground paid-service pathways spec

Status: approved implementation baseline

Date: 22 July 2026

Scope: English commercial journey across Home, Planning Services and Studio

## 1. Outcome

Make Homeground's three paid services feel like one deliberate system instead of separate calls to action:

1. **Review My Route — US$69** for a traveller who already has a usable day-by-day route.
2. **Build My Route — US$129** for a traveller who has dates and priorities but no usable route.
3. **Full Trip Planning & Ground Support — custom quote** for a traveller who wants planning carried into selected arrangements or local coordination.

The free Route Finder remains a free destination-stay check and the shared enquiry intake. It is not a fourth paid service.

## 2. Page responsibilities

| Page | Primary job | Must not become |
| --- | --- | --- |
| Home `/` | Help a visitor recognise which level of paid help fits their current trip | A detailed pricing or scope page |
| Planning Services `/china-itinerary-review/` | Compare all three paths, explain boundaries and let the visitor choose a service before entering the enquiry | Three thin standalone sales pages or an online checkout |
| Studio `/studio/` | Prove who plans, reviews and helps coordinate the work; return an informed visitor to the service comparison | A fourth service or a duplicate price table |

The intended journey is:

`Home: recognise the need → Planning Services: compare scope → Studio: establish trust when needed → Planning Services: choose → Route Finder: send an enquiry`

## 3. Navigation model

### Global English navigation

- Add **Planning services** to desktop and mobile primary navigation.
- Target: `/china-itinerary-review/`.
- Mark it `aria-current="page"` on the Planning Services page.
- Keep **Check my China wishlist** as the independent free-tool CTA; it must not preselect a paid service.
- Rename the English footer link from **Route review & planning** to **Planning services** and expose the same current-page state.
- Do not add the English service link to Chinese or Korean navigation until equivalent localized commercial pages exist.

### Click-depth rule

- From Home, one click must reveal the full scope of any of the three services.
- From any paid-service description, no more than two further clicks may be required to reach an enquiry with the correct service selected.
- Only explicit request buttons on the Planning Services page may add `service=itinerary-review`, `service=route-build` or `service=full-trip-support` to the Route Finder URL.

## 4. Home service selector

Placement: after Planning Guides and before the existing Studio section. Remove the isolated **Review or build my China route** banner so the same offer is not repeated twice.

Content:

- Eyebrow: **Ways to work with Homeground**
- H2: **Choose the part of the trip you want us to solve.**
- Intro: **You can use the free wishlist check without contacting us. When you want human planning, start with the option closest to what you already have.**

| Starting point | Service | Summary | Price | CTA / target |
| --- | --- | --- | --- | --- |
| I already have a usable day-by-day route. | Review My Route | We test the route for pressure points, fragile transfers and hotel moves, then show what to keep, move or remove. | US$69 per trip | See what the route review includes → `/china-itinerary-review/#review-my-route` |
| I have dates and priorities, but no usable route. | Build My Route | We turn your cities, nights and constraints into a workable order, night allocation and day skeleton. | US$129 per trip | See what the route build includes → `/china-itinerary-review/#build-my-route` |
| I want planning carried into selected arrangements or local coordination. | Full Trip Planning & Ground Support | We define a written scope around the actual trip, including only the planning, coordination or local support you want us to handle. | Custom quote | See how full-trip support works → `/china-itinerary-review/#full-trip-support` |

Scope note: **US$69 and US$129 cover the standard scope: up to 10 travel days, 4 overnight bases and one shared route for 1–4 travellers. Full-trip support is quoted separately.**

The cards link to information, not directly to the enquiry. Homepage links may carry owned-channel UTM parameters, but must not carry a `service` selection.

## 5. Planning Services page

### Above-the-fold model

- The hero must name all three paths, not use language that implies only two products exist.
- Price summary: **US$69 route review · US$129 route build · Custom quote full-trip support**.
- Boundary: the first two are fixed-scope written services; the third begins with a trip-specific written scope and quote.
- Breadcrumb current item: **Planning services**.

### Comparison section

- H2: **Which kind of help fits your trip now?**
- Keep the two detailed fixed-price cards.
- Add a visually distinct, full-width escalation card for Full Trip Planning & Ground Support directly below them. It must show the third path in the initial comparison without presenting it as an equivalent fixed package.
- Its CTA scrolls to the existing detailed `#full-trip-support` section; the detailed section retains the explicit enquiry CTA.

### Trust bridge

Place a concise trust block immediately after the comparison:

- Eyebrow: **Who works on your request**
- H2: **A small planning studio, with one clear planning thread.**
- Body: **A lead planner owns the work. When the agreed scope needs destination or delivery input, relevant teammates or local partners are brought in.**
- CTA: **Meet the people behind Homeground** → `/studio/`

Do not imply that all five team members work on every request or that every fixed-price service includes a particular review process unless operationally guaranteed.

## 6. Studio page

Studio remains a team and delivery-confidence page. For English only, replace the final single-exit CTA with two clear exits:

- Label: **Choose the level of help**
- H2: **Start with the part of the trip you want us to solve.**
- Body: **Have a usable route? We can review it. Have dates and priorities but no route? We can build the structure. If you want planning carried into selected arrangements or local coordination, we will define a custom written scope.**
- Primary CTA: **Compare planning services** → `/china-itinerary-review/#choose-service`
- Secondary CTA: **Start with the free wishlist check** → the existing Route Finder URL.

Chinese and Korean Studio pages retain their current localized free-tool CTA until paid-service pages are localized.

## 7. Language and commercial boundaries

- Use these names consistently: **Planning services**, **Review My Route**, **Build My Route**, **Full Trip Planning & Ground Support**, **free Route Finder** and **free wishlist check**.
- Use **selected arrangements or local coordination**, not language implying all bookings or end-to-end delivery.
- Build My Route remains a route-structure product, not a complete hour-by-hour itinerary.
- Do not use **Buy now**, **Book now**, **Checkout** or language implying payment happens on the page.
- Full support remains a custom written scope; third-party costs, delivery responsibility and exclusions are confirmed separately.
- Do not change prices, the enquiry backend, privacy scope, file-upload policy or payment flow.

## 8. Accessibility, responsive behaviour and performance

- Preserve one H1 per page and a logical H2/H3 hierarchy.
- Use semantic `section`, `article`, `nav`, headings and real links.
- Interactive targets are at least 44 × 44 CSS pixels with visible keyboard focus.
- At 320px viewport width, cards reflow to one column with no horizontal page scroll; long service names and prices wrap without clipping.
- Anchor targets use sufficient scroll margin so sticky navigation does not cover their headings.
- Motion is decorative only and respects `prefers-reduced-motion`.
- No new image dependency is required for this navigation change.

## 9. Analytics and query integrity

- Owned cross-page links may use: `utm_source=homepage|studio|china-itinerary-review`, `utm_medium=owned`, `utm_campaign=planning-services`, plus a stable `utm_content` value.
- Information links must never set `service`.
- Enquiry links continue using the strict allowlist in `lib/routeServiceInterest.ts`.
- An invalid or absent service value must remain `null` and must not enter the enquiry note.

## 10. Acceptance criteria

- English Home visibly names all three services and prices/status in one section.
- All three Home cards land on the correct Planning Services anchors.
- Planning Services exposes all three paths before the long educational content.
- Planning Services links contextually to Studio; English Studio links back to the comparison and separately to the free Route Finder.
- English desktop/mobile header and footer have a stable **Planning services** entry with correct current-page semantics.
- Chinese and Korean pages do not acquire untranslated paid-service cards or preselected paid-service states.
- No duplicate paid-service pages, online payment, upload field or backend contract change is introduced.
- Static service, Studio, navigation, accessibility and full production build checks pass.

## 11. Implementation surface

- `components/HomegroundHeader.tsx`
- `components/HomegroundFooter.tsx`
- `components/HomegroundHomePage.tsx`
- `components/HomegroundHomePage.module.css`
- `components/ChinaItineraryReviewPage.tsx`
- `components/ChinaItineraryReviewPage.module.css`
- `components/HomegroundStudioPage.tsx`
- `components/HomegroundStudioPage.module.css`
- focused static tests under `supabase/tests/`

Out of scope: new URLs, translated sales pages, payment integration, document upload, backend changes, new pricing and promises about turnaround time.
