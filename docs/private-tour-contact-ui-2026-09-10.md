# Product-page enquiries and guide contact entry

Base: origin/main 8ad5051. Scope: product contact conversion and shared overlays. Product prices, routes, photographs, homepage layout and public guide copy remain outside this change.

## Behaviour

- Product quote links open a native dialog on the current product page. Modifier-key clicks and no-JavaScript links retain the existing context-carrying homepage URL.
- Product, published service selection and 2/4-person price basis remain visible and flow into email enquiries and direct WhatsApp drafts. The classic Zhangjiajie product has no invented selection.
- The short form takes email, optional arrival date (explicitly undecided by default) and an optional note. A saved receipt includes the product summary and server public reference. Availability and final price remain manually confirmed.
- A sending or uncertain request keeps an immutable body and idempotency key while the panel closes/reopens. An uncertain request cannot be edited into a different request. Success requires a valid submitted envelope and non-empty public reference.
- Guide readers have a compact consultation entry with WhatsApp, email and the homepage product section. Direct-contact drafts include only the clean public article path, never incoming query parameters or fragments.
- Native modal focus/scroll handling, Escape and focus return are supported. Mobile navigation returns focus to its menu button. A guide dialog returns focus to its recreated launcher.
- Cookie consent and the inquiry panel do not overlay one another; temporarily hiding the Cookie prompt does not grant consent. Opening an enquiry consumes the newsletter's automatic prompt and collapses it; closing the enquiry does not replay that prompt.
- Existing newsletter drag/snap/minimize behaviour is selectively carried forward from the user's earlier local Newsletter-Corner implementation. Returning readers get its small launcher. At their default positions, guide consultation and newsletter launchers share the bottom lane on opposite sides; the saved newsletter drag position is preserved, and the consultation hides during newsletter expansion/drag/docking.
- Email/date/note are not persisted in browser storage or included in analytics. Submission events use the immutable product context; a late result on a different page is not attributed to that new page. Database saved inquiries remain the source of truth.

## Visual review

Restrained black/white/gray, 480px desktop panel, mobile bottom sheet, primary black quote action and secondary WhatsApp. Smaller generic contact/success states use natural height. Existing page typography and media are retained.

Independent first visual review received only two rendered screenshots and their viewport sizes. It identified small supporting text and excess bottom whitespace. Text was increased to 12px and the desktop panel shortened. A second image-only review found the newsletter launcher over the article byline and too many vertically stacked entries; the launchers now default to opposite ends of the same bottom lane. The final image-only review found no significant overlap, clipping or spacing problem; the unchanged upper product-discovery card remains a minor competing visual focus. The development-only Next indicator is disabled for a clean preview.

External review evidence: Desktop/Homeground-SEO/conversion-benchmarks-2026-09-10/visual-blind-review.md and implementation-supervision.md. These are review evidence, not proof of production deployment.

## Initial verification (before the WhatsApp emphasis revision)

- TypeScript checks pass.
- 878 inquiry/UI/contract regression tests pass, with zero failures or skips (including newsletter geometry, prompt state, price-selection links and new contact logic).
- Backend agent separately ran 186 focused tests, including actual temporary PostgreSQL saves, notification-job creation/claiming, concurrent idempotency and transaction rollback. Counts overlap the full suite; do not add them together.
- Browser checks used local development and a local in-memory mock. Forest 4-person context, entered date plus note, saved receipts, Chinese Beijing English-guided/4-person selection, Korean classic product without selection, guide direct-contact drafts, close/reopen and network failure/retry were checked.
- During a network outage the UI retained its locked snapshot and note; after close/reopen and restarting the mock, retry returned a saved reference. The Chinese mobile menu trigger regained focus after Escape. Guide Escape returned focus to its launcher.
- First-visit Cookie prompt was shown without consultation/newsletter overlap. Necessary-only led to the newsletter invitation after its countdown; minimizing and opening consultation hid the newsletter, and returning to the article restored compact entries. No claim is made of an exact wall-clock ninth-second browser test; the prompt timing and handled-state transitions are covered in automated tests.
- Desktop 1440×1000, actual Chrome 1448×780, mobile 390×844 and short mobile 390×740 layouts were inspected. Screenshots may be scaled by the host; CSS viewport and DOM bounds were checked independently. No physical iPhone software keyboard test was performed.
- Production dependency audit has no advisories. Full static builds passed with the quote flag disabled and enabled. Changes after those builds only cleaned whitespace in CSS and the third-party license notice and updated this verification record; runtime code was unchanged.

## Release

New build flag: NEXT_PUBLIC_HOMEGROUND_PRIVATE_TOUR_QUOTE_ENABLED. CI/deploy read it with a default of false. With the flag disabled or missing trusted API configuration, the panel offers direct WhatsApp/email instead of a non-working form.

Follow docs/private-tour-quote-backend-2026-09-10.md for the staged backend rollout. The existing GitHub Pages workflow does not deploy the Supabase migration or functions. Do not equate static-site deployment with a working new intake. Real notification delivery and production receipt persistence need separate evidence.

Final local review: the supervisor closed F01–F06 and found no known local delivery blocker. Its review covered source, logs and screenshots; interactive checks are attributed to the primary task, not an independent replay. Both reviewers’ records preserve the production-deployment boundary.

## WhatsApp emphasis revision — 10 September

The product quote form now places a 48px full-width outlined WhatsApp link directly after the quote/retry action, followed by the availability note. The previous footer text-link section is removed from normal form state. This remains a native link outside the disabled fieldset: it does not require form validation or submit the inquiry. The contextual URL, number and tracking are unchanged. Failed/uncertain states retain email fallback; guide and disabled-form states retain their existing primary WhatsApp action; saved receipts are unchanged.

Short desktop windows use slightly reduced vertical spacing. Browser QA at actual 1448×724 confirmed body scrollHeight equals clientHeight (619px) for the default English form; both buttons and the availability note fit. At 390×844 the WhatsApp button is 348×48px and fully visible. Longer/error/date states may scroll normally. Independent image review found the initial desktop note clipping, then signed off the corrected image; the code supervisor found no state/behavior regression. Typecheck and the 7 existing contact-link tests passed. This small revision was inspected in development and was not followed by another complete static build or production deployment.
