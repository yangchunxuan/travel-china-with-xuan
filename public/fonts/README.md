# Homeground locale font subsets

These WOFF2 files contain only the characters currently used by Homeground's
localized pages and guides. They are self-hosted so the English page does not
request CJK fonts and the Chinese and Korean pages do not depend on a
third-party font CDN at runtime.

- `homeground-serif-sc-00.<hash>.woff2` to `homeground-serif-sc-07.<hash>.woff2`
  and `homeground-serif-sc-slices.<hash>.css` — Noto Serif SC, weight 500,
  sourced from the
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

2026-10-10 (combined live guides and PR #320): rebuilt the Chinese serif
subset and existing slice plan from the verified Noto Serif SC source below.
The combined corpus covers 2,888 required Han characters; comparison against
the previous main subset confirms zero lost code points and zero changed
horizontal metrics. The incoming Korean subsets cover all 1,236 required
Hangul characters. No slice-plan or upstream-font change was made.

2026-10-09 (Jiangnan editorial revision): rebuilt the Chinese serif slices
from the same verified Noto Serif SC source below after the new Chinese and
Japanese route copy added 仕, 庐, 枕, 畑, 盏, 終, 翌, 補 and 運. The Korean source
subsets remained unchanged. Both source and production-export coverage checks
pass after the rebuild.

2026-10-09 (new 12-day Jiangnan and 13-day five-city private-tour copy):
regenerated all three subsets with `tools/rebuild-locale-fonts.mjs` from the
same official upstream versions listed below. Added 妙, 恩, 枯, 泠, 霍 and 웡.
Compared the previous and rebuilt `cmap` and horizontal advances: no previous
code point was lost and no previous advance width changed. A source-only
rebuild initially omitted 11 glyphs used by the published export's shared
Japanese-without-kana strings, so `retainedPublishedChineseCharacters` now
preserves 別動報後業様約規覧許談 until an export is available locally. Source SHA-256:

- Google Fonts `main`, `NotoSerifSC[wght].ttf` (Version 2.003):
  `050080d9255a86808f2945bffac582b31ef32bc36411ce29563b4961670c66f9`
- Pretendard `v1.3.9`, `PretendardVariable.woff2` (Version 1.309):
  `9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4`
- NAVER `maruburi.zip`, `MaruBuri-Regular.ttf` (Version 1.000):
  `803429881927c79dbb49497274244e72b672c56e0503f28262503f77524cba7a`

2026-10-04: added 冥 (U+51A5, photographer attribution) and 汾 (U+6C7E,
Fen River photo copy) to the Chinese source subset from Noto Serif SC
version 2.003-H1 at weight 500. Every existing code point and advance width
was checked and preserved. The committed slice plan remains unchanged;
the two extra glyphs join the on-demand slice rather than the primary preload.

- `NotoSerifSC[wght].ttf` from the Google Fonts `main` branch, instantiated at
  `wght=500` before subsetting.
- `PretendardVariable.woff2` from the official Pretendard `v1.3.9` tag.
- `MaruBuri-Regular.ttf` from NAVER's official `maruburi.zip` download.

2026-09-29 (KakaoTalk contact copy added 톡, U+D1A1): the Pretendard subset was
regenerated from the same `PretendardVariable.woff2` v1.3.9 artifact with the
shared options. NAVER's `maruburi.zip` host was unreachable from the build
environment, so the published MaruBuri subset was kept unchanged and only the
missing U+D1A1 glyph was added, converted to TrueType quadratics from NAVER's
MaruBuri Regular OTF (v2.000, as redistributed in `@kfonts/maruburi-otf`). The
next full regeneration from `maruburi.zip` supersedes this one-glyph patch.

2026-10-04 (sight stories added 厮, 紫, 琉, 溥, 禹 and others): all three
subsets were regenerated with `tools/rebuild-locale-fonts.mjs` from freshly
downloaded upstream artifacts:
- `NotoSerifSC[wght].ttf` from the Google Fonts `main` branch, Version 2.003;
- `PretendardVariable.woff2` from the Pretendard `v1.3.9` tag (Version 1.309);
- `MaruBuri-Regular.ttf` from NAVER's `maruburi.zip` (Version 1.000).

This supersedes the 2026-09-29 one-glyph MaruBuri patch. The rebuild now also
reads the production export (`out/`) when it exists. A few Japanese strings
written without kana, such as 利用規約 and 事業者情報, sit in shared chunks
and pages, and the export gate requires them in the Chinese font. Build once,
rebuild the fonts, then build again.

2026-10-10 (guides added 嵩, 庵, 澎, 湃, 猛, 缴, 衙, 袭, 镖, 儒, 卢, 牡, 粑, 缅, 诏,
谐 and 隘): only the Chinese source subset was regenerated, from a freshly
downloaded `NotoSerifSC[wght].ttf` (Google Fonts `main`, git blob `eab063fa`,
Version 2.003-H1) at weight 500, with the character collection, instancing and
subset options of `tools/rebuild-locale-fonts.mjs`, and then re-sliced with
`tools/slice-serif-sc-font.mjs`. All 3,004 earlier code points and their
advance widths are preserved. The committed slice plan is unchanged: slices
`00` to `06` hold the same characters as before, and the 17 new glyphs join
the on-demand extra slice. The Pretendard and MaruBuri subsets were not
regenerated.

2026-10-10, second pass (the vegetarian and halal guides added 婆, 尹, 煸, 瓜, 耆,
茄, 茎, 荤, 谧, 酋 and 馍): the Chinese source subset was regenerated the same way
from the same `NotoSerifSC[wght].ttf` (git blob `eab063fa`). All 3,021 earlier
code points and their advance widths are preserved, the slice plan is
unchanged and the 11 new glyphs join the extra slice. Korean subsets untouched.

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
the serif on any page. As one 521 KB file, every Chinese page preloaded all of
them. The subset is therefore cut into slices that share one family, weight
500 and `font-display: swap`:

- Slice `00` (282 KB) is the primary slice. It holds every non-Han character
  (Latin, digits, punctuation and symbols with all their layout alternates)
  and every Han character that is laid out in the serif, hidden text included,
  on `/zh/`, `/zh/tours/`, `/zh/guides/`, every tour page and every guide that
  `/zh/` or the first `/zh/guides/` page links to, every Han character in the
  first viewport of any measured page (1440, 1920, 1024 tablet, 430 and 375 wide), and the newsletter
  card's headings, which mount after a delay on any page and so are never
  measured. The measured text of those pages therefore needs no other slice.
  Half the size of the old single file, it is also the only serif file a
  Chinese page fetches before its load event.
- Slices `01` to `03` hold the other Han characters that pages lay out in the
  serif, grouped by how many pages use them. Slices `04` to `06` hold the Han
  characters no page lays out in the serif, in code-point order.
- Every slice keeps all OpenType layout features, hinting and metrics of the
  source subset; only the glyph set differs.

How pages load them:

- Slice `00` is declared in `app/globals.css`, where and how the old single
  file was declared, with no `unicode-range`, so it is the family's primary
  font and catch-all. The Chinese layout (`app/(localized)/[locale]/layout.tsx`)
  preloads it. It is the only serif file that can take part in the first
  render, and no serif stylesheet of its own blocks rendering.
- The other slices are declared in `homeground-serif-sc-slices.<hash>.css`.
  `components/HomegroundSerifScSlices.tsx`, mounted on Chinese pages only,
  adds that stylesheet after the load event has fired and slice `00` has
  loaded, in an idle callback, so their requests never compete with the hero
  photo and never finish before slice `00`. Until then the few characters
  outside slice `00` use the fallback serif. It is a component rather than an
  inline script because switching from a Korean page to a Chinese one is a
  client navigation inside the same root layout, where a script element React
  inserts does not run; once added, the stylesheet stays in the document.
- Both rules matter. A slice that finished before slice `00` briefly changed
  the family's primary font, and with it the `ch` unit of headings sized in
  `ch`, which re-wrapped tour-page titles; and slices requested while the page
  was loading were fetched at the highest priority, alongside the hero photo.

Published names carry the first eight hex digits of the SHA-256 of the file,
so a cached stylesheet or page cannot pair with slices of another plan.
`lib/homegroundSerifScFontFiles.ts` (generated) names slice `00` and the
stylesheet. The unsliced subset lives in `tools/fonts/homeground-serif-sc.woff2`
and is not published; which Han characters go into which slice is recorded in
`tools/fonts/homeground-serif-sc-slices.json`.

- `node tools/slice-serif-sc-font.mjs [--python=python]` rebuilds every slice,
  the stylesheet and `lib/homegroundSerifScFontFiles.ts` from those two files,
  points the `Homeground Serif SC` rule in `app/globals.css` at the new slice
  `00`, and deletes the previous slices (`tools/rebuild-locale-fonts.mjs` runs
  it after rebuilding the subset). Han characters the plan does not list yet
  go into an extra slice, so nothing is lost.
- To regroup from current usage, build and serve `out/`, then run
  `node tools/measure-serif-sc-usage.mjs --origin=http://127.0.0.1:<port> --chrome=<path to Chrome> --output=serif-sc-usage.json`
  followed by
  `node tools/slice-serif-sc-font.mjs --plan-from-usage=serif-sc-usage.json`.

`check:font-coverage` reads `lib/homegroundSerifScFontFiles.ts`, the slice `00`
rule in `app/globals.css` (which must name the same file) and the stylesheet:
each required Han character must reach a slice that has its glyph (the
last-declared face whose `unicode-range` contains it), every glyph in a slice
must be reachable through that slice's own range, every slice file and
stylesheet in the font directory must be the ones referenced, and
`homeground-serif-sc.woff2` must not be published again. On the export it also
requires an exported stylesheet to declare slice `00`.
