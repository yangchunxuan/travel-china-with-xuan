# Homepage private-tour catalog draft — 23 August 2026

Status: **Draft PR #99 only. Not merged, deployed or published.**

## Owner decision

The homepage product slot is a real product catalog, not a mixture of one tour
and editorial placeholders. It now presents all nine published private-tour
owners as equal cards:

- the eight EN/ZH/KO products in `lib/privateTourProducts.ts`;
- the existing EN/ZH/KO Zhangjiajie 4-day product.

Every card links directly to its locale-matched published tour page. The three
guides previously used as temporary placeholders return to the editorial guide
rail and keep their guide identity. This homepage change creates no canonical
identity, route or sitemap URL.

## Customer-facing design

- Desktop shows a restrained 3-by-3 white catalog; tablet uses two columns and
  mobile uses compact image-and-copy rows.
- Each card shows the product type, duration, official localized title, a short
  route description and a single `View itinerary and prices` action.
- The homepage does not repeat prices. Group-size, package, season and date
  conditions remain on the product owner page, with a short disclosure beneath
  the catalog.
- Harbin retains its date-specific winter wording. The homepage does not imply
  year-round availability.
- All nine cards are server-rendered links. There is no carousel, filter,
  collapsed inventory or JavaScript-only discovery.
- Product images lazy-load below the homepage hero. The two Shanghai products
  receive distinct, already-published images through the catalog adapter.

## Data boundary

`lib/homepagePrivateTourCatalog.ts` is the only homepage adapter. It projects a
small card object from the published product authorities before crossing the
server/client boundary; complete itineraries, package rows, prices, galleries
and unused language content are not serialized into the homepage client.

The eight new products continue to come from `privateTourProducts.ts` and the
legacy Zhangjiajie product continues to use its published product JSON and home
card. The adapter does not duplicate a second list of their titles, paths or
descriptions.

## Navigation and analytics

The homepage footer's former singular `Zhangjiajie private journey` link is now
the plural `Private tours` / `私家旅行产品` / `프라이빗 투어` and returns to
`#travel-products`. Hash navigation moves keyboard focus to the catalog title.

Product clicks use `homepage_product_card_clicked` with only controlled values:
locale, product slug, card position, product kind and number of nights. Guide
clicks keep their existing guide event and are no longer used for product cards.

## Homepage simplification boundary

The eight reviewed city Hubs remain in the structured dark footer. The ten-city
airport–station–stay map remains public through its guide, transport Hub and
download pack; it is not restored to the homepage product slot.

## Required release evidence

Before this Draft PR can be marked Ready, central must retain evidence for:

- three-language product count, unique links and exported HTML discovery;
- TypeScript, homepage/product tests, full test suite and production build;
- source and production-export Chinese/Korean font coverage;
- English, Chinese and Korean visual QA at desktop and 390px mobile widths;
- no horizontal overflow, console error or console warning;
- unchanged canonical and sitemap identity sets except for changes already
  published by the separate product release.

These rules describe the draft branch only and are not production evidence.

## Current draft validation

- Homepage, product, accessibility and adjacent-guide targeted tests: 44/44
  passed.
- TypeScript, source font coverage and production build: passed.
- Production build: 776/776 static pages generated.
- Production export: 763 HTML files and 139 client JavaScript files checked;
  all internal links and all 27 locale-matched homepage product links resolve.
- Exported EN/ZH/KO homepages each contain exactly nine unique product links
  and nine unique product-card images.
- Full local suite: 588 passed, 1 skipped and 1 known Windows CRLF checksum
  mismatch in the unchanged ten-city downloadable attribution text. Linux CI
  remains authoritative for that byte-integrity check.
- Visual QA: EN/ZH/KO at 1440px desktop and 390px mobile passed with nine
  products, locale-correct links, distinct Shanghai images, seasonal Harbin
  wording, visible keyboard focus, no horizontal overflow and no console
  warnings or errors.
