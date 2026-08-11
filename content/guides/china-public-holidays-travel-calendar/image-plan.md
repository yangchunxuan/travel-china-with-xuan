# Image and infographic plan

Status: `COPY DRAFT — EDITORIAL REVIEW AND ASSETS NEEDED`

## Hero — original calendar infographic (required)

- Output: `/public/images/guides/china-public-holidays-travel-calendar/hero-1600.webp`
- Canvas: 1600 × 1000, plus a 1200 × 630 social crop after editorial approval.
- Format: original editorial information graphic, not a generated or generic tourist photograph.
- Content: a 2026 annual calendar showing the seven official holiday spans and compensatory workdays as two visually distinct marks. Add a separate bracket for the February 2–March 13 Spring Festival transport season, clearly labelled “transport period, not public holiday.”
- Status strip: include “2026 official” and “2027 not yet published / 尚未发布 / 아직 발표되지 않음.”
- Source footer: “General Office of the State Council notice, 国办发明电〔2025〕7号 · checked 2026-08-11.”
- Accessibility: do not rely on colour alone; use solid holiday bands, outlined workday markers, labels and a legend. Maintain high contrast and readable type in all responsive crops.
- Prohibited visual treatment: no heat map, crowd score, red-to-green intensity scale, predicted busy days, or tiny decorative calendar text that cannot be read.
- Editorial QA: compare every highlighted date with `holiday-calendar.json`; verify Sunday/Saturday workday placement; ensure the 40-day transport period is not styled as leave.

## Supporting documentary image — verified holiday scene (required before publication)

- Preferred subject: a named China Railway station concourse or a named major attraction on a date within an official 2026 holiday period.
- Evidence requirement: the original caption or agency record must state the exact location and capture date. The date must match `holiday-calendar.json` or the documented Spring Festival transport period.
- Rights requirement: owned, commissioned, or licensed editorial use. Record creator, agency/source URL, licence terms, acquisition date, original filename, crops and expiry/territory limits.
- Caption: describe only the verified location and date; do not claim the scene represents every holiday or all of China.
- Alt text: describe visible people, signage and environment without estimating crowd size or emotion.
- Rejection rule: do not use an undated station crowd, an unidentified attraction queue, stock imagery with unverifiable date/location, or AI-generated people as documentary evidence.

## Optional comparison image

- If rights and matching metadata are available, add the same named location on a verified non-holiday date with comparable viewpoint and time of day.
- Label dates directly. Do not infer a numerical crowd ratio from two photographs.

## Provenance record template

| Field | Required value |
|---|---|
| Asset ID | Stable repository ID |
| Location | Official English name, Chinese name, city and exact site |
| Capture date/time | ISO date; time and timezone when supplied |
| Creator | Photographer or agency |
| Source URL | Original record, not a search-result URL |
| Rights | Owned/licensed/public-domain/permission plus exact terms |
| Verification | Person and date who matched source record to official holiday data |
| Crops | Hero/support/social filenames and focal point |
| Alt/caption | EN/ZH/KO reviewed copy |
