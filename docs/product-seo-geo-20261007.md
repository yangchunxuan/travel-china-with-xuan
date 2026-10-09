# Product service discovery and quote selection

Implementation date: 2026-10-07. Production publication requires owner confirmation.

## Changes

- Add EN/ZH/KO private car and driver service pages with itinerary-specific quotations and a dedicated contact draft.
- Make the service discoverable in navigation, full-trip support and three relevant transport guides.
- Connect canonical URLs, reciprocal language alternatives, the sitemap and the existing machine-readable service directory.
- Keep Service and FAQ data aligned with visible copy; vehicle arrangements, responsibility, scope, total and terms are confirmed before payment.
- Preserve selected tour package and party size on secondary quote links, including Japanese contact drafts.
- Align Korean guide navigation with the linked Korean-language guide service.
- Improve mobile placeholder length and English operator punctuation wrapping.
- Update sharp to 0.35.5 for its published security patch.

## Validation

Local checks passed: 1176 inquiry tests, 23 traffic-operation tests, 7 guide-search tests, type checking, static build, production-dependency audit, internal-link/export contracts and dedicated car-service export checks. Three language pages and nine contextual guide entries have valid canonical, language and sitemap relationships. Desktop/mobile rendering and contact-draft fields were inspected; visual review used screenshots only.

The private search-data review is stored locally and is not part of this public implementation record. No production database, prices, itineraries, orders or customer records were changed.

References: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [sharp release](https://github.com/lovell/sharp/releases/tag/v0.35.5).
