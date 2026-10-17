# Corporate travel editions

Source: the existing English corporate hub and its two sample programmes.
Scope: English plus Chinese, Korean, Japanese, Spanish, French, German and Arabic;
three pages in each edition, including 21 newly localized routes.

- Keep the three purposes and their existing fragment IDs: company trips and team
  building, incentive travel, small meetings and retreats.
- Preserve both four-day, three-night programmes, their 10–30 / 10–24 planning
  ranges, destinations, hotel-base arrangements, optional meetings, exclusions,
  supplier checks and written-quotation requirements. No fixed price or inventory
  claim is added. The original English programme and hub data remain unchanged.
- Translate the complete body, image descriptions, FAQs, interface labels and the
  existing enquiry draft. Preparation still only produces a message for review;
  it does not submit an inquiry, send email/WhatsApp or make a booking.
- Each corporate header entrance and all eight language choices lead to the same
  equivalent page in the selected language. Standalone editions use their existing
  header/footer and root layout; Arabic keeps RTL and joined letter shapes.
- Metadata and FAQ structured data use the same localized content as the visible
  page. All eight reciprocal alternates use the English page as x-default. The
  core content manifest registers EN/ZH/KO; the other five editions receive
  explicit sitemap entries. All 24 pages appear in the generated llms.txt.
- Related-guide destinations retain the existing source URLs; this change does
  not invent translated articles or change the individual travel services.
- Localized content is selected on the server. The enquiry client receives only
  its current UI strings, avoiding a client bundle containing eight complete
  versions of the programmes.

Verification covers source-copy parity and protected identifiers, localized
draft generation with disposable local fixtures, canonical/hreflang, visible
FAQ/schema parity, the corporate menu topology, font coverage and the existing
site checks. Publication and live verification are separate from implementation.

## Verification (18 October 2026)

- Type checking passed. The isolated PostgreSQL inquiry suite passed all 1,521
  tests, with no failures or skips; guide search passed all seven tests.
- A complete production build and all postbuild checks passed. Corporate export
  checks cover all 24 routes, 176 visible FAQ/schema answers, reciprocal head
  alternates, equivalent desktop/mobile language destinations, media and links.
  The German and Arabic export totals now include their three corporate pages.
- English main text, links, image sources/alt and input placeholders match the
  pre-change export for all three pages. Source English programme data is unchanged.
- Chrome checks of all 24 pages at 320, 390 and 1440 pixels found no horizontal
  overflow. All eight mobile corporate menus retain the overview and three
  purpose links plus eight equivalent language choices.
- Disposable local draft checks in all eight languages retain the headcount,
  currency and changed itinerary; preparation focuses the review and sends
  nothing. The Japanese header uses the corporate anchor instead of intercepting
  it into the separate private-tour enquiry dialog.
- Existing Chinese/Korean upstream fonts were rebuilt for three new characters.
  Previous glyphs, horizontal metrics and the slice plan are retained; generated
  filenames were refreshed. Source and exported font coverage checks passed.
- Independent language reviews cover every new edition. Local screenshots and
  detailed test/review evidence are stored in
  `~/Desktop/Homeground-SEO/corporate-eight-languages-20261018/`.

This record concerns implementation and local acceptance. It does not claim that
the new editions have been published, crawled, indexed or ranked.
