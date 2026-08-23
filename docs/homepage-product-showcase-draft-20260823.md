# Homepage product showcase draft — 23 August 2026

Status: **Draft PR #99 only. Not merged, deployed or published.**

## Owner decision

The large ten-city map promotion no longer occupies the homepage product slot.
The homepage now gives that position to bookable travel products:

- one real, published product leads the section:
  `zhangjiajie-4-day-private-tour`;
- three existing guides temporarily complete the visual row:
  `longji-rice-terraces-day-trip-or-overnight`,
  `forbidden-city-for-foreign-visitors`, and
  `yangshuo-town-or-yulong-river-where-to-stay`;
- guide cards must remain visibly labelled `Travel guide` / `旅行指南` /
  `여행 가이드`; they are not products and must not receive prices,
  availability claims or booking language.

The Zhangjiajie card is labelled `Private journey` / `私家行程` /
`프라이빗 일정` and links to the existing localized published tour owner.
This change creates no canonical identity, route or sitemap URL.

The showcase sits directly after the hero, before search, decision and city
directories. This gives the first strong China image and the real product a
product-page position instead of burying them after the city Hub list.

## Map boundary

The ten-city airport–station–stay map, its source table and its CC BY 4.0
download pack remain public. They continue to be distributed by the transport
Hub and the indexed Beijing–Zhangjiajie–Shanghai transport guide. Only the
large homepage promotion is removed.

Do not delete the map guide, download pack, schema, source record or transport
article placement as a consequence of this homepage decision.

## Runtime rules

- `HomepageProductShowcase` renders one `tour` card and separate `guide`
  cards with explicit machine-readable kinds.
- The same four identities are excluded from the following guide rail,
  including after the full guide catalogue lazy-loads, so the homepage does
  not repeat them.
- The three guide images were selected from existing licensed assets because
  they are immediately recognisable as China: Longji rice terraces, the
  Forbidden City and the Yulong River landscape.
- Future published products may replace guide placeholders one at a time.
  A guide must never be silently relabelled as a product.

## Draft validation

- Homepage-specific static tests: 21/21 passed.
- Product/map placement contract: passed.
- TypeScript: passed.
- Source and production-export Chinese/Korean font coverage: passed.
- Production build: 752/752 static pages generated; export and internal-link
  checks passed.
- Visual QA: desktop 1440px and mobile 390px product and guide states checked
  without horizontal overflow.

These checks describe the draft branch only and are not production evidence.
