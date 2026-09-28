# Product-page photo audit — 2026-09-28

## Finding

The 47 published structured tours had working hero and gallery files; there were no broken image paths. The apparent blank areas came from the itinerary explorer: it rendered an empty panel whenever a day had no `routeMedia`. Of 414 itinerary days, 314 lacked a dedicated day photo, affecting 41 product pages. Thirty-seven of those pages opened the itinerary with an empty Day 1 panel.

## Changes

- Added 44 destination-specific day-photo assignments across all 41 affected products: 42 newly processed files and two previously documented Harbin files. Each shows a real place matched to a named stop or described explicitly as an illustrative city or optional-route view. The assignments are recorded in `lib/privateTourPhotoAdditions.ts` and the affected products are dated 2026-09-28.
- For a day without its own photo, the itinerary explorer now shows a photograph already belonging to that tour, with a localized caption explaining that it is a **tour preview**, not a claim about that day's sights, confirmed arrangements or actual conditions. The same rule applies on desktop and mobile. Beijing arrival days use the site's authorised Beijing CBD arrival photo rather than a distant destination in the same long-haul tour.
- Kept the visible photo-credit panel and added per-product credit records for every new Commons source. Its introduction discloses cropping, resizing, WebP conversion and continued CC BY-SA licensing of adapted photos.
- Did not change prices, itinerary wording, hotel claims, booking rules or deployment configuration.

The remaining 270 days without dedicated day photography use the disclosed tour-preview treatment. Arrival, departure, transfer and optional days are especially suited to this approach; a dedicated photo can be added later when a specific itinerary scene has a reliable source.

## Source records

- `docs/homeground-photo-additions-2026-09-28.md` — 10 first-batch photos.
- `docs/homeground-photo-additions-2026-09-28-b.md` — 11 second-batch photos.
- `docs/homeground-photo-additions-2026-09-28-c.md` — 3 additional expansion-route photos.
- `docs/homeground-photo-additions-2026-09-28-longhaul.md` — 15 long-haul photos.
- `docs/homeground-photo-additions-2026-09-28-old.md` — 3 older-tour photos.
- Two already documented Harbin photographs were activated for Days 1 and 4; their original source and hashes are in `docs/homeground-photo-provenance.md`.

All processing was conventional cropping and WebP conversion of real photography. No generated scenery was used. The source records include the individual Commons File page, creator, file license, input and output SHA-256 hashes, and crop information. The individual license and exact scene should be rechecked if an image is later repurposed for paid advertising or print.

## Verification

- `npm run typecheck` and `npm run check:font-coverage`.
- `node --experimental-strip-types --no-warnings --test supabase/tests/private-tour-pages.test.mjs` (19 tests), including route-day integrity and unique published image bytes.
- `npm run build`, including production export and link/image-path checks.
- Scanned 196 exported tour-detail HTML pages across English, Chinese, Korean and Japanese: no empty itinerary-media panels. Spot-checked the Japanese captions for the newly added photographs.
- Manual contact-sheet review of the sourced batches; rejected inaccurate Longmen, Guangji Bridge and Shenzhen candidates and an identifiable Jingdezhen workshop portrait before selecting the final assets.
