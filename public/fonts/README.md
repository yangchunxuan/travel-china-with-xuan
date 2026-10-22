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
- `homeground-pretendard-ko-00.<hash>.woff2` to `-02.<hash>.woff2` —
  Pretendard Variable 1.3.9, weight axis 400–930, sourced from
  the [official Pretendard project](https://github.com/orioncactus/pretendard).
  Licensed under the SIL Open Font License 1.1.
- `homeground-maruburi-ko-00.<hash>.woff2` to `-03.<hash>.woff2` — MaruBuri
  Regular, sourced from
  [NAVER's official Maru project](https://hangeul.naver.com/maruproject_11).
  NAVER's [font license guidance](https://help.naver.com/service/30016/contents/18088)
  permits personal and commercial use, embedding, and redistribution under the
  SIL Open Font License 1.1.
- `homeground-korean-slices.<hash>.css` declares the Korean slices after 00
  (see "Korean slices" below).

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

2026-10-21 (guide sales launch branch, groups A, B and C combined): the group A
and group C rebuilds each added glyphs to the same 3,067-code-point base, so the
Chinese source subset was regenerated once more from the verified Noto Serif SC
2.003 source below (SHA-256 `050080d9…66f9`) at weight 500 with the shared
subset options, keeping the union of both: 亏 侃 劝 扛 昇 from group A and 拎 掐
歉 氪 秧 穗 莞 from group C. The source now has 3,079 code points; every code
point of both earlier subsets keeps its advance width. The slice plan is
unchanged, so the twelve new glyphs sit in the on-demand extra slice, and
`tools/slice-serif-sc-font.mjs` rewrote the slices, stylesheet and file module.
Both Korean font files are untouched.

2026-10-20 (guide sales rewrite, group A): retained all 3,067 existing code
points and 3,499 existing glyphs, and added 亏 (U+4E8F), 侃 (U+4F83), 劝
(U+529D), 扛 (U+625B) and 昇 (U+6607, the printer Bi Sheng, 毕昇), used by the
rewritten Chinese guides. The same verified Noto Serif SC 2.003 source below
(SHA-256 unchanged) was instantiated at weight 500 and subset with the shared
options. Comparison of every previous Unicode mapping, decomposed glyph
outline and horizontal advance found no changes. The source now contains
3,072 code points and 3,504 glyphs. The slice plan is unchanged: slices 00–06
keep exactly their previous characters, and only the on-demand extra slice
gains the five new ones. Both Korean font files are untouched.

2026-10-18 (release export repair): retained all 3,064 existing code points
and 3,496 existing glyphs, and added 択 (U+629E), 翌 (U+7FCC) and 選
(U+9078), found by the production export gate in shared Japanese labels.
The same verified Noto Serif SC 2.003 source below was instantiated at weight
500 and subset with the shared options. Independent comparison of every
previous Unicode mapping and every resolved glyph outline, contour, point
flag, horizontal metric and vertical metric found no changes. The source
now contains 3,067 code points and 3,499 glyphs. Only the extra slice gains
characters; the slice plan and both Korean font files are unchanged.
The retained-character list includes these three characters for future
source-only rebuilds. The font family, weight and loading rules are unchanged.

2026-10-18 (Japanese core-page completion): added 時 (U+6642), 貨 (U+8CA8)
and 12 shared Japanese calendar characters (乗営専暦満現発紀車週運開) to the
Chinese source subset, using the same verified Google Fonts
Noto Serif SC 2.003 artifact below, instantiated at weight 500. The source
SHA-256 is unchanged. All 3,049 earlier code points and all 3,481 earlier
glyphs were preserved: comparison of resolved outline coordinates, contour
endpoints, point flags and horizontal metrics found no changes. The source
now has 3,063 code points and 3,495 glyphs. The existing slice plan is
unchanged, so all 14 new characters join the on-demand extra slice, not the
primary preload. All slices and their hashed references were regenerated
with the shared subset options. Pretendard and MaruBuri files are untouched.
Source coverage passes for all 2,912 required Han and 1,236 required Hangul
characters; the production-export check runs again after the site build.
The retained-character set in `tools/rebuild-locale-fonts.mjs` also records
these shared labels so a later rebuild without a local export keeps them.

2026-10-18 (five corporate-travel editions): added 奨 (U+5968), used by the Japanese incentive-trip label in a shared client chunk, from the same verified Noto Serif SC source SHA-256 below at weight 500. The previous code points, advance widths and decomposed outlines are all preserved; the slice plan and Korean fonts are unchanged. Japanese pages continue to use their Japanese system-font stack.

2026-10-18 (combined Japanese service and corporate revisions): retained all
3,063 code points and 3,495 glyphs from the Japanese completion subset, and
added 奨 from the same verified upstream font at weight 500. The combined
source contains 3,064 code points and 3,496 glyphs. Every existing resolved
outline, contour endpoint, point flag, and horizontal and vertical metric
is unchanged. The new glyph matches the upstream fixed-weight instance.
The slice plan and both Korean font files are unchanged; the extra glyph
joins the on-demand extra slice. The retained-character list also records
奨 so a source-only rebuild preserves the shared Japanese corporate label.

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
from the same `NotoSerifSC[wght].ttf` (git blob `eab063fa`), on top of the
subset merged with PR #320. All 3,026 earlier code points and their advance
widths are preserved, the slice plan is
unchanged and the 11 new glyphs join the extra slice. Korean subsets untouched.

2026-10-10, third pass (the Yangshuo, Huangshan, Jingdezhen, Changbai Mountain
and West Lake guides added 匣, 厄, 坯, 柴, 浚, 皖, 矿, 葫, 蛟, 锥, 骥 and 黟): the
Chinese source subset was regenerated the same way from the same
`NotoSerifSC[wght].ttf` (git blob `eab063fa`). All 3,037 earlier code points
and their advance widths are preserved, the slice plan is unchanged and the 12
new glyphs join the extra slice. Korean subsets untouched.

Use `fonttools varLib.instancer` for the fixed Noto Serif SC instance and
`pyftsubset --flavor=woff2` for all three outputs (`tools/rebuild-locale-fonts.mjs`
does both). The required Han and Hangul
sets must be collected from the same source list used by
`tools/check-font-coverage.mjs`; both commands share
`tools/locale-font-file-collection.mjs` as their source collector. Retain basic
Latin, punctuation and navigation symbols as well. Always run
`npm run check:font-coverage` after replacing the files and
`npm run check:font-coverage:export` after generating `out`.

## Korean slices

2026-10-23 (mobile speed): both Korean fonts were rebuilt from the same
verified upstream artifacts as before (Pretendard `v1.3.9`
`PretendardVariable.woff2`, SHA-256 `9599f12f…00b4`; NAVER `maruburi.zip`
`MaruBuri-Regular.ttf`, SHA-256 `80342988…ba7a`) with the same character
collection, then cut into unicode-range slices. A Korean page used to preload
all of both files (Pretendard 257,068 bytes, MaruBuri 125,468 bytes) before
its first render; it now preloads slice 00 of each (157,984 and 81,016
bytes). Nothing a Korean page shows changes:

- Weights. Measured in Chrome on all 414 exported Korean pages (412×823 and
  1440×900, hidden text included), Pretendard is set at weights 400 to 900
  and never lighter; MaruBuri is self-hosted at Regular only and stays so.
  `tools/rebuild-locale-fonts.mjs` therefore limits Pretendard's weight axis
  to 400–930 with `fontTools.varLib.instancer` before subsetting. 400 is the
  font's default master, so this only drops the Thin master's deltas (a third
  of the file); the `@font-face` rules declare `font-weight: 400 920`.
  Outlines and advances of all 1,363 code points are identical to the
  previous file at every weight in use (400–920), and MaruBuri's at 400.
- Features. Korean pages request only the default shaping features and
  `tnum` (`font-variant-numeric: tabular-nums`); no stylesheet uses
  `font-feature-settings` or another `font-variant` value. The Korean subsets
  keep exactly those features (`koreanLayoutFeatures` in
  `tools/locale-font-subset-options.mjs`), which leaves out 288 Pretendard
  and 158 MaruBuri alternates no page can reach (case, fractions, superiors,
  full-width and vertical forms, stylistic sets…). Glyph names stay: without
  them Chrome on macOS anti-aliases small text differently at device pixel
  ratio 1.
  `check:font-coverage` fails when a stylesheet starts asking for a feature
  outside that list. Kerning covers no Hangul glyph in either font, so
  cutting the Hangul into slices loses no kerning pair.
- Characters. The subsets hold the 1,236 Hangul the sources use and the
  shared Latin and punctuation set. 웡 (U+C6E1), dropped from the copy on
  2026-10-21, is no longer kept.

Slices follow the Chinese rules below, per family:

- Slice `00` of each family holds every non-Hangul character and every
  Hangul character that the family lays out, hidden text included, on `/ko/`,
  `/ko/tours/`, `/ko/guides/`, every tour page and every guide that `/ko/` or
  the first `/ko/guides/` page links to, every Hangul character in the first
  viewport of any Korean page (1440, 1920, 1024 tablet, 430, 412 and 375
  wide), and the newsletter card's copy. `app/globals.css` declares it with
  no `unicode-range` and the Korean layout preloads it, as it did the single
  files.
- The other slices hold the remaining Hangul: first those that pages lay out
  (by how many pages use them), then those no page lays out in that family.
  `components/HomegroundKoreanFontSlices.tsx`, mounted on Korean pages only,
  adds `homeground-korean-slices.<hash>.css` after the load event, after both
  slice 00 files have loaded, in an idle callback, so no slice is requested
  during load or finishes before slice 00.
- `tools/fonts/homeground-pretendard-ko.woff2` and
  `tools/fonts/homeground-maruburi-ko.woff2` are the unsliced subsets (not
  published), and `tools/fonts/homeground-korean-font-slices.json` records
  which Hangul goes into which slice. `lib/homegroundKoreanFontFiles.ts`
  (generated) names both slice 00 files and the stylesheet.
- `node tools/slice-korean-fonts.mjs [--python=python]` rebuilds the slices,
  the stylesheet, `lib/homegroundKoreanFontFiles.ts` and the two slice 00
  urls in `app/globals.css` (`tools/rebuild-locale-fonts.mjs` runs it after
  rebuilding the subsets). Hangul the plan does not list yet goes into an
  extra slice.
- To regroup from current usage, build and serve `out/`, then run
  `node tools/measure-korean-font-usage.mjs --origin=http://127.0.0.1:<port> --chrome=<path to Chrome> --output=korean-font-usage.json`
  followed by
  `node tools/slice-korean-fonts.mjs --plan-from-usage=korean-font-usage.json`.

`check:font-coverage` routes every required Hangul character through each
family's slices the same way as the Chinese slices, requires every glyph of a
slice to be reachable through its own range and every Korean font file to be
referenced, and refuses the retired unsliced file names.

## Chinese serif slices

Chinese pages use the serif mostly for headings. Measured on the September 2026
export, 311 of 317 Chinese pages use it, laying out a median of 137 distinct
Han characters, and 1,039 of the subset's 2,637 Han glyphs are not laid out in
the serif on any page. As one 521 KB file, every Chinese page preloaded all of
them. The subset is therefore cut into slices that share one family, weight
500 and `font-display: swap`:

- Slice `00` (123 KB) is the primary slice and the only serif file a Chinese
  page fetches before its load event, so it holds only what the first render
  of an entry page needs. That is every non-Han character of the subset
  (Latin, digits, punctuation and symbols), plus the Han characters laid out
  in the serif in the first viewport (1440, 1920, 1024 tablet, 430 and 375
  wide) of the entry pages: `/zh/`, `/zh/tours/`, `/zh/guides/`, every tour
  page and every guide that `/zh/` or the first `/zh/guides/` page links to.
  The analytics-consent banner's heading counts, because it sits in every
  first viewport. It also holds the newsletter card's headings, which mount
  after a delay on any page and so are never measured. That makes 615 of
  the subset's 2,952 Han characters.
- Slices `01` to `08` hold the other Han characters that pages lay out in the
  serif or keep in closed menus, grouped by how many pages use them. Slices
  `09` to `14` hold the Han characters no page lays out in the serif, in
  code-point order. Everything below the fold of an entry page, and the
  first viewport of every other page, is drawn from these slices once they
  arrive after load. Until then those characters use the fallback serif.
  Measured in October 2026 on 415 Chinese pages, 270 of the 318 other pages
  show such characters in their first viewport at phone sizes: a median of 2
  Han characters, at most 11.
- The after-load slices hold Han characters only, and every Han glyph is
  1 em wide in this font and in the fallback serifs, so their arrival
  cannot re-wrap or resize text. Slice `00` keeps every non-Han glyph and
  the primary font's metrics, so the `ch` unit does not change either.
- Slice `00` leaves out four OpenType features, `aalt`, `dlig`, `fwid` and
  `hwid` (`primarySliceOmittedFeatures` in `tools/serif-sc-slice-plan.mjs`).
  Through them its Latin, digits and punctuation pull in about 380 alternate
  glyphs, about 30 KB. A browser applies these only when CSS asks for them
  (`font-feature-settings`, `font-variant-alternates`,
  `font-variant-ligatures: discretionary-ligatures` or
  `font-variant-east-asian: full-width`), and no page does. Every glyph a
  character maps to, every advance width, outline and vertical metric is
  unchanged. So are the features browsers apply by default, every GPOS
  feature (`text-spacing-trim` uses `halt` and `chws`) and the vertical
  forms. If a page ever needs one of the four, remove it from that list and
  re-slice. Every other slice keeps all OpenType layout features, hinting and
  metrics of the source subset; only the glyph set differs.

2026-10-23 (mobile speed): slice `00` went from 282 KB to 123 KB. It no
longer carries the below-the-fold and hidden text of the entry pages, nor
the first viewport of every other page. All four features above are left out
of it. Lighthouse 13.4.1 mobile medians are in the commit message.

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
  photo and never finish before slice `00`. Until then the characters
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
