# German core edition — 17 October 2026

## Scope and source

Based on main `04395b1b21face75af9c37c9c50582812909bfd1`. This is a draft for review, not a production release. The German edition follows the common French/Spanish page scope: 55 structured products, the classic Zhangjiajie and Terracotta half-day products, 10 core pages, and four service details (71 pages). Existing layouts and photos are reused. The guide hub explains that detailed articles and searches remain in English; no nonexistent German article equivalents are advertised.

English catalogue data owns all 152 published offer rows, currencies, party sizes, package IDs, itineraries and service scope. German guide availability and any separate price must be confirmed before booking; the German website does not imply German guides are included. The existing EN inquiry contract is reused with German UI and a German origin marker. No database migration, backend change, new dependency, customer submission or outbound customer message is included.

## Integration

German canonical URLs, reciprocal hreflang, sitemap entries, visible language choices and `de_DE` metadata are connected to existing editions. Language changes keep selected tour packages and party sizes. Single-price German cards open their advertised party size (the 13-day card opens the existing eight-person USD 2,090 offer); existing English commercial entry behavior is not rewritten. German-only word wrapping and a short header label prevent narrow-screen overflow without redesigning shared flows.

## Validation

- TypeScript passes. All 1,487 inquiry/unit/integration tests pass locally, including isolated PostgreSQL tests; guide search: 7/7 pass.
- Full static production build and all postbuild checks pass. Existing CSS autoprefixer warnings are unchanged.
- German export: 71 pages, 6,289 internal links, 892 image references, 485 reciprocal language references, 72 JSON-LD blocks, 310 visible FAQ answers.
- French export (71 pages) and Spanish export (79 pages) regression checks pass.
- Chrome: all 71 German pages checked at 320, 390 and 1365px (213 observations); no horizontal overflow, correct document language and one H1 each. Mobile menu/Escape, product eight-to-four-person context change and German reservation-fee display checked without sending data. English article search returns labelled English results.
- Product/source comparison and independent service-copy review completed. A cable-car closure mistranslation was corrected; prices and itinerary facts are unchanged. Independent screenshot review recorded separately.

Evidence and final screenshots: `/Users/yangchunxuan/Desktop/Homeground-SEO/german-core-edition-20261017/`. Screenshots use Chrome; selected stable shots use reduced-motion emulation, reset afterward. Local production build deliberately has inquiry submission disabled; accepted intake payloads and state transitions are verified in isolated tests, not against production.

## Release boundary

Keep the PR as draft. No merge, production deployment, Search Console request, advertising change or paid tool action is part of this task. Review CI on the final commit before any later release authorization.
