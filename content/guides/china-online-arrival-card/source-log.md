# Source log — china-online-arrival-card

- Status: CENTRAL FACT REVIEW FIXED — RELEASE REVIEW REQUIRED
- Canonical owner: employee 6 / entry and practical
- Checked at: 2026-08-20
- Freshness: high dynamic; verify immediately before release and after any NIA notice or form change

## Canonical boundary

This page owns only the foreign traveller's China arrival-card task: whether the card is required, the official free channels, the records to prepare, submission evidence, port fallback, correction/failure handling and scam recovery. It does not determine visa, visa-free or transit eligibility; promise admission or border-processing time; replace a Customs declaration; or explain post-entry accommodation registration.

## Official evidence and exact use

1. National Immigration Administration, [Beware of Fraudulent Websites for Arrival Card Filling](https://en.nia.gov.cn/n147418/n147463/c191530/content.html), published 2025-12-05, reviewed 2026-08-20.
   - Supports the 2025-11-20 service start, official-channel list, free-of-charge rule, fake paid-site warning, port devices and continued paper-card fallback.
2. National Immigration Administration Government Service Platform, [official online arrival-card service](https://s.nia.gov.cn/ArrivalCardFillingPC/), reviewed 2026-08-20.
   - Supports the official hostname, service identity and multilingual interface.
   - The live notice in `app.539db21c.js` reviewed on 2026-08-20 lists eight exemptions, adding `符合集中交验出入境证件礼遇条件的人员` to the seven categories in the 2025 announcement. Bundle SHA-256: `72ab330c3c5c926ede5291ed2a68b53049e3bddb7def303b6ab8267fb00c45db`; server `Last-Modified`: 2026-05-27.
   - The JavaScript form is dynamic. Its current conditional fields, error messages, confirmation output and availability are not frozen in copy.
3. National Immigration Administration, [Announcement on Implementing 10 New Measures](https://en.nia.gov.cn/n147413/c187308/content.html), published 2025-11-03, reviewed 2026-08-20.
   - Supports the online/port/paper routes and the seven exemption categories named in the dated 2025 announcement. The live form is the current source for the additional eighth category.
4. National Immigration Administration, [How to Submit Your Arrival Card to China Online](https://en.nia.gov.cn/n147418/n147463/c195170/content.html), published 2025-12-22, reviewed 2026-08-20.
   - Supports use of the NIA's own illustrated submission workflow. The guide does not reproduce or store the government's form screenshots.

## Deliberately unclaimed

- No universal “fill X hours/days before arrival” rule was found in the reviewed NIA notices.
- No statement says online pre-filling shortens or bypasses border inspection.
- No submission confirmation is described as visa, visa-free approval or admission.
- No fixed form-field inventory is republished. The guide prepares passport, transport and stay records and instructs the traveller to follow the live official form.
- No third-party service, paid filing vendor or search result is endorsed.
- No passport-specific entry eligibility is copied into this page.

## Internal-link boundary

- Entry status: `/guides/china-entry-requirements/`
- Passport condition: `/guides/china-passport-validity-and-blank-pages/`
- Customs: `/guides/china-customs-red-green-channels/`
- Arrival-day timing: `/guides/china-arrival-day-booked-anchor-or-flexible-block/`
- Hotel check-in and accommodation registration: `/guides/foreigners-china-hotel/`

## Maintenance triggers

Recheck before release and whenever NIA changes the official host, channel list, exemption categories, port fallback, fee position, correction flow, form validity window, confirmation output or hotline guidance. Move `sourceReviewedDate` with a substantive re-review.

## Hero-image provenance

- File page: https://commons.wikimedia.org/wiki/File:Beijing_Capital_International_Airport_T1_Arrival_hall_20161124.jpg
- Creator: Tyg728
- Capture: 2016-11-24, Beijing Capital International Airport Terminal 1 arrival hall
- Licence: CC BY-SA 4.0 — https://creativecommons.org/licenses/by-sa/4.0/
- Source dimensions: 2560 × 1600 JPEG
- Output: `public/images/guides/china-online-arrival-card/hero-1600.jpg`, resized by Homeground to 1600 × 1000, progressive JPEG, conventional resize only; this modification is disclosed in the public source label
- Output SHA-256: `2246F6C0C7628651B8714D0566B6972FE931F0ADA04D05A3BA0339DF14D7EE6E`
- Metadata: EXIF removed from output
- Accuracy boundary: this is a real arrival hall in 2016. It does not depict the 2025 online form, a current immigration queue, a current terminal assignment or approval of an arrival card.
