# Quote date language correction — 2026-09-10

The English private-tour quote panel previously used a native date input. On the owner's Korean-language Chrome it displayed Korean year/month/day segments despite the English page. The field and calendar now both use the selected site language.

## Change

- Keep the approved quote-panel layout and replace only its date control with an editable localized field and DayPicker 10.0.1 calendar.
- English displays DD/MM/YYYY; Chinese and Korean display YYYY/MM/DD with localized labels, help, errors, month names, weekdays and calendar accessibility labels.
- Support ISO paste and eight-digit numeric keyboard entry (DDMMYYYY in English; YYYYMMDD in Chinese/Korean). Normalize valid input on blur. Invalid/partial dates cannot submit a previous valid value.
- Keep the existing ISO YYYY-MM-DD / null API contract, undecided option, sending lock and frozen uncertain-retry payload. No backend migration or function release.
- Calendar remains inside the quote dialog. Escape closes the calendar first and restores focus; a second Escape closes the quote panel. Date conversion uses checked local civil dates rather than UTC serialization.

## Verification

- Typecheck passed. Inquiry suite: 884 passed, 0 failed, including six date tests covering locale ambiguity, numeric mobile input, impossible dates, leap years, ISO paste, year bounds and timezone/DST cases.
- Production dependency audit: zero vulnerabilities. DayPicker is pinned, MIT licensed; its transitive license notices remain in package distributions.
- The first production export check caught the bundled Chinese calendar label glyph 昨. The Chinese font subset was extended from the same upstream Noto font, preserving all existing encoded glyphs; the rebuild retention list now includes this library-provided character.
- Actual Chrome preview: English 1440 × 1000; English/Chinese/Korean 390 × 844; additional 320 × 700 overflow check. No date-control horizontal overflow.
- Calendar ArrowRight + Enter selected 27 December 2026 and filled 27/12/2026. First Escape closed only the calendar and focused the visible input; second Escape closed the quote panel after its existing close animation.
- Invalid 31/02/2027 displayed the English error and failed validity. ISO paste normalized correctly. Chinese 20261227 normalized to 2026/12/27.
- Korean numeric-date submission succeeded against the local in-memory mock (HG-EU4N-WB79-YBD8). No production enquiry or customer notification was created for this correction.
- Independent source review caught the initial numeric-keyboard separator gap; fixed with eight-digit parsing and tests. Independent screenshot-only review found no visual blocker; adjacent-month dates were made lighter in response to feedback.
- Desktop/mobile screenshots retained in the owner's local Homeground-SEO date-language-fix evidence folder. Viewport simulation is not a physical-device or VoiceOver certification.

## References

- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date
- https://daypicker.dev/guides/input-fields
- https://daypicker.dev/guides/accessibility

Publication is verified separately in the release record after CI and Pages deployment; the checks above describe the tested correction, not a claim of deployed state.
