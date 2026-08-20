# Executable gaps for central

Reviewed: 2026-08-20

This branch improves content and supplies a safe data contract. It deliberately
does not half-ship an inventory or supplier workflow.

## P0 — atomic structured stay inquiry

The current planner handoff can collect a general trip brief and route to
`/#planner-contact`, but it does not preserve structured stay requirements. Do
not add a few visible fields or serialise private stay data into the free-text
`note`. The complete change must include, in one reviewed release:

1. a new versioned stay-inquiry schema and allowlisted `request=stay-support`
   origin context;
2. a dedicated trilingual `StayHandoff`, not an ever-growing generic planner
   component;
3. frontend validation and a review screen that tells the traveller what not
   to submit;
4. an isolated private Supabase migration/RPC with RLS, idempotency, retention
   and delete path;
5. Edge intake and notification templates that omit secrets and minimise
   mobility/recovery details;
6. a separate supplier-share consent event, default `false`, recording purpose,
   recipient reference, allowed fields, consent time and actual share time;
7. updated trilingual Privacy copy covering Supabase, Gmail/SaleSmartly and any
   conditional hotel/DMC sharing;
8. runbook, deployment order, rollback and contract/backend/frontend/privacy/
   end-to-end tests.

No passport image/number, order number, card data, payment QR, room number,
key-card identifier or medical diagnosis belongs in the initial form. Evidence
for a refusal case stays with the traveller until a secure, scoped follow-up is
agreed.

## P0 — restricted property verification and quote store

Build this only as an authenticated internal system. It must not enter guide
metadata, generated manifests, public JSON, analytics or client bundles.

Required characteristics:

- opaque `internalPropertyRef` and `internalSupplierRef`;
- dated evidence per street → entrance → front desk → lift → door → bathroom
  segment;
- distinct fields for legal rule, platform display and current property
  confirmation;
- exact room category, exceptions and what remains unverified;
- quote currency, total/scope, tax/breakfast/cancellation terms, received time
  and validity deadline;
- request-scoped availability only, never a durable “available” boolean;
- fallback property/area and an audit trail for supplier-share consent;
- restricted access, retention/deletion rules and export/leak tests.

## P1 — remaining Hub coverage

- **Hangzhou and Zhangjiajie:** PR #74 registered both runtimes on main; central
  must verify the public routes and Search Map release state before calling
  either Hub live.
- **Chongqing:** re-run the Hub publication gate now that the station selector
  is on main; central still decides whether the draft becomes a production Hub.
- **Guilin:** review and release the existing draft Hub before evaluating a
  narrower Guilin-city-versus-Yangshuo owner.
- **Shenzhen:** complete production Hub source, image, owner-support and QA
  gates; keep the current Futian/Luohu/Nanshan owner canonical meanwhile.

Do not weaken Hub gates or count national pages as city-primary owners merely
to make the numbers pass.

## P1 — city FAQ and owner completion

- Finish city-specific final-night FAQs for Hangzhou, Zhangjiajie, Chongqing,
  Guilin and Shenzhen, using the national last-night owner for the workflow.
- Add city-context links to near-metro, accessible-room and foreign-guest
  recovery owners wherever an existing page lacks them.
- Recheck every changed dynamic fact before changing its
  `sourceReviewedDate`; `dateModified` and factual review date are not the same.
- Run a Search Map collision review before any Guilin city-versus-Yangshuo
  owner is commissioned.

## P1 — consultation-context preservation

The present generic CTA points to `/#planner-contact`. Central should support an
allowlisted origin content ID and `stay-support` request kind so the human sees
which city/decision page produced the enquiry. Do not pass arbitrary URLs, UTM
strings or stay requirements through query parameters or analytics.

Until that work ships, page-level callouts may ask travellers to prepare:
dates/flexibility, cities, exact arrival/departure nodes and time bands, party
and room/bed needs, luggage, mobility-route requirements, budget/currency and
fallback flexibility. The copy must say that a human will recheck fit and that
price, availability, room assignment and foreign-guest handling are not
guaranteed.

## P1 — asset acquisition

Commission or license real, current scenes for every page/area that lacks them:
street-to-property approach, identifiable station surroundings, vehicle
set-down, entrance, lift/door/bathroom features where permission is explicit,
and airport/station buffers. Follow the ledger in `image-source-qa.md`.

No AI hotel, room or street documentary image may fill an asset gap. Never
publish passport/order/payment/room identifiers, guest faces without releases,
complete evacuation-floor diagrams, CCTV or access-control detail.

## P2 — automated content-network QA

Add release checks that fail when:

- one of the exact ten city IDs is missing or duplicated;
- a grouped destination ID substitutes for Hangzhou, Shenzhen or Guilin;
- EN/ZH/KO block IDs/types, internal-link destinations or FAQ jobs diverge;
- a page lacks source review dates or a dynamic claim lacks its own review
  record/recheck trigger;
- an owner/Hub/FAQ/new/reject route is ambiguous;
- public data contains property/supplier refs, price, inventory, PII or guarantee
  booleans;
- image rights/privacy ledger fields are incomplete;
- prohibited phrases imply “all foreigners”, guaranteed accessibility, live
  room state, fixed value, or a generic “near metro” promise;
- internal property or quote fields appear in static export/client JavaScript.

## Not executable in this content branch

- live hotel inventory, booking or supplier API integration;
- payment or affiliate ranking;
- direct release of traveller contact data to a property/DMC;
- production Hub registration for Chongqing, Guilin or Shenzhen;
- PR creation, merge or deployment.
