# Homeground locale font subsets

These WOFF2 files contain only the characters currently used by Homeground's
localized pages and guides. They are self-hosted so the English page does not
request CJK fonts and the Chinese and Korean pages do not depend on a
third-party font CDN at runtime.

- `homeground-serif-sc-00.woff2` to `homeground-serif-sc-13.woff2`, declared in
  `homeground-serif-sc.css` — Noto Serif SC, weight 500, sourced from the
  [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/notoserifsc),
  cut into unicode-range slices (see below).
  Licensed under the SIL Open Font License 1.1.
- `homeground-pretendard-ko.woff2` — Pretendard Variable 1.3.9, sourced from
  the [official Pretendard project](https://github.com/orioncactus/pretendard).
  Licensed under the SIL Open Font License 1.1.
- `homeground-maruburi-ko.woff2` — MaruBuri Regular, sourced from
  [NAVER's official Maru project](https://hangeul.naver.com/maruproject_11).
  NAVER's [font license guidance](https://help.naver.com/service/30016/contents/18088)
  permits personal and commercial use, embedding, and redistribution under the
  SIL Open Font License 1.1.

When localized copy gains new Chinese or Korean characters, regenerate the
subsets from the upstream fonts before publishing. `npm run
check:font-coverage` reads the actual WOFF2 files and verifies every Han and
Hangul character found recursively under `app`, `components`, `lib`, and the
independently authored `content` sources. It runs automatically before every
production build. After the final export is
pruned, `check:font-coverage:export` verifies the actual HTML and client
JavaScript against the copied production fonts, so missing glyphs cannot
silently ship with a system-font fallback.

The current subsets were regenerated from these exact upstream artifacts:

- `NotoSerifSC[wght].ttf` from the Google Fonts `main` branch, instantiated at
  `wght=500` before subsetting.
- `PretendardVariable.woff2` from the official Pretendard `v1.3.9` tag.
- `MaruBuri-Regular.ttf` from NAVER's official `maruburi.zip` download.

Use `fonttools varLib.instancer` for the fixed Noto Serif SC instance and
`pyftsubset --flavor=woff2` for all three outputs (`tools/rebuild-locale-fonts.mjs`
does both). The required Han and Hangul
sets must be collected from the same source list used by
`tools/check-font-coverage.mjs`; both commands share
`tools/locale-font-file-collection.mjs` as their source collector. Retain basic
Latin, punctuation and navigation symbols as well. Always run
`npm run check:font-coverage` after replacing the files and
`npm run check:font-coverage:export` after generating `out`.

## Chinese serif slices

Chinese pages use the serif mostly for headings. Measured on the September 2026
export, 311 of 317 Chinese pages use it, laying out a median of 137 distinct
Han characters, and 1,039 of the subset's 2,637 Han glyphs are not laid out in
the serif on any page. As one 521 KB file, every Chinese page preloaded all of them. The
subset is therefore cut into slices that share one family, weight 500 and
`font-display: swap`, so a page downloads only the slices whose characters it
lays out in the serif:

- Slice `00` declares no `unicode-range`. It holds every non-Han character
  (Latin, digits, punctuation and symbols with all their layout alternates)
  and the Han characters in the first viewport of `/zh/`, `/zh/tours/`,
  `/zh/guides/` and every tour page, plus any Han character in the first
  viewport of at least ten pages. It is the only preloaded slice and, like the
  old single file, the family's primary font and catch-all.
- Slices `01` to `09` hold the other Han characters that pages lay out in the
  serif, grouped by how many pages use them. Slices `10` to `13` hold the Han
  characters no page lays out in the serif, in code-point order.
- Every slice keeps all OpenType layout features, hinting and metrics of the
  source subset; only the glyph set differs.

`homeground-serif-sc.css` is linked only by Chinese pages
(`app/(localized)/[locale]/layout.tsx`). The unsliced subset lives in
`tools/fonts/homeground-serif-sc.woff2` and is not published; which Han
characters go into which slice is recorded in
`tools/fonts/homeground-serif-sc-slices.json`.

- `node tools/slice-serif-sc-font.mjs [--python=python]` rebuilds every slice
  and the stylesheet from those two files (`tools/rebuild-locale-fonts.mjs`
  runs it after rebuilding the subset). Han characters the plan does not list
  yet go into an extra slice, so nothing is lost.
- To regroup from current usage, build and serve `out/`, then run
  `node tools/measure-serif-sc-usage.mjs --origin=http://127.0.0.1:<port> --chrome=<path to Chrome> --output=serif-sc-usage.json`
  followed by
  `node tools/slice-serif-sc-font.mjs --plan-from-usage=serif-sc-usage.json`.

`check:font-coverage` reads the stylesheet: each required Han character must
reach a slice that has its glyph (the last-declared face whose
`unicode-range` contains it), every glyph in a slice must be reachable through
that slice's own range, and every slice file must be referenced.
