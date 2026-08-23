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

The showcase sits directly after the hero, before search and decision support.
This gives the first strong China image and the real product a product-page
position instead of burying them deep in the homepage.

## Homepage simplification and footer decision

The same Draft PR also removes two long body sections at the owner's direction:

- the eight-card city directory;
- the dark three-principle methodology panel.

This is a visual relocation, not an SEO deletion. All eight reviewed,
locale-matched destination-Hub links move into the homepage footer and still
consume the single published destination registry. The existing
`#destinations` and `#studio` navigation targets remain valid in that footer.

The new homepage-only footer follows the restrained visual grammar observed on
the current [Anthropic homepage](https://www.anthropic.com/): a full-width dark
field, one brand rail, compact navigation columns, muted secondary type and
unframed social icons. Homeground's own copy, routes, identity, fonts and brand
mark remain original; no Anthropic trademark, text or asset is copied.

The social row reserves X, Instagram, Facebook and YouTube. A profile becomes a
link only after its exact public URL passes the platform allow-list. Facebook is
already verified from the repository authority record. X, Instagram and
YouTube remain visibly reserved but non-clickable until their exact URLs are
configured; the implementation does not publish guessed or `#` links.

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

- Homepage, footer, brand, accessibility and deployment-contract tests: 49/49
  passed.
- Product/map placement contract: passed.
- TypeScript: passed.
- Source and production-export Chinese/Korean font coverage: passed.
- Production build: 752/752 static pages generated; export and internal-link
  checks passed.
- Production export: 739 HTML files and 136 client JavaScript files checked.
- Visual QA: English, Chinese and Korean at desktop 1440px and mobile 390px;
  no horizontal overflow, console warning or console error.
- Full local suite: 577 passed, 1 skipped and 1 pre-existing Windows CRLF
  checksum mismatch in the unchanged ten-city downloadable text asset. Linux CI
  remains authoritative for that byte-integrity check.

These checks describe the draft branch only and are not production evidence.
