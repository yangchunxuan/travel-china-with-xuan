# Image and infographic plan

Status: `RELEASE REVIEW COMPLETE — 2027 STATUTORY-DATE BADGE RE-RENDERED 2026-09-18`

## Hero — original calendar infographic (required)

- Output: `/public/images/guides/china-public-holidays-travel-calendar/hero-1600.webp`
- Canvas: 1600 × 1000. The current metadata and social cards use this approved source image; no separate 1200 × 630 derivative is required by the article system.
- Format: original editorial information graphic, not a generated or generic tourist photograph.
- Content: a 2026 annual calendar showing the seven official holiday spans and compensatory workdays as two visually distinct marks. Add a separate bracket for the February 2–March 13 Spring Festival transport season, clearly labelled “transport period, not public holiday.”
- Status strip: include “2026 official” and identify 2027 as statutory dates only, with the bridged-break and workday arrangement still pending.
- Source footer: the State Council holiday notice plus the National Development and Reform Commission source for the separate Spring Festival transport period; each claim keeps its own check date.
- Accessibility: do not rely on colour alone; use solid holiday bands, outlined workday markers, labels and a legend. Maintain high contrast and readable type in all responsive crops.
- Prohibited visual treatment: no heat map, crowd score, red-to-green intensity scale, predicted busy days, or tiny decorative calendar text that cannot be read.
- Editorial QA: compare every highlighted date with `holiday-calendar.json`; verify Sunday/Saturday workday placement; ensure the 40-day transport period is not styled as leave.

Final asset: `public/images/guides/china-public-holidays-travel-calendar/hero-1600.webp`, rendered by the article-local `render-hero.mjs` directly from `holiday-calendar.json`. For responsive legibility, the final design uses seven large holiday rows rather than twelve miniature month grids. All seven holiday spans and all six compensatory workdays were checked against General Office of the State Council notice 国办发明电〔2025〕7号. The February 2–March 13 Spring Festival transport period is a separate dashed band labelled “not a public holiday” and now credits the National Development and Reform Commission source used by the structured calendar. Re-rendered 2026-09-18 after the 2027 statutory dates were added: the top-right badge now reads “2027 STATUTORY DATES · 调休待发布 · 연휴 조정 미발표” instead of “2027 NOT PUBLISHED”; the 2026 rows are unchanged. Final SHA-256: `5064ff9a60ebda68b664aaa42a2d102be73271537b4b308bd7e09dc6a1084b44`.

## Supporting documentary image — not used

The local library did not contain an unused scene whose exact location and capture date could be matched to an official 2026 holiday period. A generic crowd photograph would imply evidence the file does not contain, so the original calendar infographic is the sole article image. No AI-generated people or documentary scene is used.

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
