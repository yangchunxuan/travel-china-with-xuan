# Private-tour previews (`visibility: "preview"`)

A preview is an unconfirmed private-tour product — for example a supplier
proposal — built in the normal product format so it can be reviewed or sent to
one traveller at its direct URL, without being published.

## What a preview is

- Set `visibility: "preview"` on the `PrivateTourProduct`. Preview products are
  exported through `privateTourPreviewProducts` in `lib/privateTourProducts.ts`,
  never through `privateTourProducts`.
- Everything that lists, counts or links published products reads only
  `privateTourProducts` (and `getPrivateTourProduct`), so a preview is absent
  from the tour hubs and their cards, the homepage catalogue, the sitemap and
  content manifest, guide search, guide and destination cross-links, the
  Japanese site and the published catalogue counts by construction.
- `getPrivateTourPreviewRouteParams` adds the en, zh and ko pages
  (`/tours/<slug>/`, `/zh/tours/<slug>/`, `/ko/tours/<slug>/`) to the static
  export, and the routes resolve them with `getPrivateTourRouteProduct`.
- `buildPrivateTourMetadata` gives a preview `robots: noindex, nofollow` and
  en/zh-Hans/ko/x-default alternates only. There is no Japanese page, so the
  header's language switch shows no Japanese link, and a Japanese inquiry
  cannot name a preview (the inquiry index carries no Japanese title for it).
- A preview page links out only to published routes and guides; nothing
  published links to it.

`noindex` and an unlisted URL are not access control: anyone with the link can
open the page. Do not put confidential supplier costs or terms in preview copy.

## Differences from the old product-preview route

`app/*/preview/…` pages render only in `next dev` and
`tools/prune-production-export.mjs` removes them from `out/`. A
`visibility: "preview"` product is the opposite: it is part of the production
export so the direct URL works after deployment, while staying unlisted and
noindex.

## Inquiries

A preview takes inquiries like a published product, so its slug, en/zh/ko
names, package labels and priced rows must be in:

- `lib/privateTourInquiryContext.ts` (`privateTourInquirySlugs`, names and
  package labels);
- `lib/privateTourInquiryIndex.ts` (run `npm run generate:private-tour-inquiry-index`);
- `supabase/functions/_shared/traffic-contracts.ts`;
- the database helpers `private_tour_product_name_v1` and
  `is_valid_private_tour_selection_v1` through a new migration. Until that
  migration is applied, the deployed backend rejects inquiries that name the
  preview.

Add its guide-language entry in `lib/privateTourGuideLanguage.ts`; the
catalogue integrity check requires one for every published or preview product.

## Publishing a preview later

Move the product into a published product list (so it joins
`privateTourProducts`), remove `visibility`, and add everything a published
product needs: comparison profile, catalogue facet, commercial links, Japanese
copy and name (index and SQL), and any published-only test expectations.

## Northeast winter route history

Four Northeast China supplier proposals were created as previews on
2026-09-29 and accepted by migration
`202609300001_add_northeast_winter_preview_tours.sql`. They were later
published with an additional Yanji–Changbaishan–Wanda route. The historical
module and migration names retain “preview” because other modules import them
and applied migrations are immutable. The five winter routes now belong to
`privateTourProducts`; this document continues to describe the preview
mechanism for future proposals.

The winter products use direct WhatsApp and email enquiries until
`202610090001_publish_northeast_winter_products.sql` has been applied to the
live inquiry database and its five route identities and Japanese names have
been verified. The GitHub Pages deployment does not apply database migrations.
