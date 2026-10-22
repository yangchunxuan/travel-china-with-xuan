# Noto Sans Arabic

Source: https://github.com/google/fonts/tree/main/ofl/notosansarabic
Retrieved: 2026-10-17. SIL Open Font License 1.1, retained in OFL.txt.
The upstream variable TTF (SHA256 `63111b5b2e074dd48cc67692e0a2726d86ee94c1c37fe8598257b7b4e87e869e`)
was converted losslessly to WOFF2 with fontTools, all glyphs retained. That
complete file now lives in `tools/fonts/NotoSansArabic-Variable.woff2` as the
subset source and is not published.

`homeground-arabic.<hash>.woff2` is what Arabic pages load. The Arabic layout
preloads it. `node tools/subset-arabic-font.mjs [--python=python]` builds it
from the complete font, removes the previous file, and points
`app/(arabic)/ar/arabic.css` and `lib/homegroundArabicFontFile.ts` at the new
one.

2026-10-23 (mobile speed): Arabic pages used to download the complete font
(361,524 bytes) before their first render. The subset is 43,596 bytes, and
nothing an Arabic page shows changes:

- Axes. Measured in Chrome on all 98 exported Arabic pages (412×823 and
  1440×900, hidden text included), the font is set at weights 400 to 800 and
  at normal width only. `fontTools.varLib.instancer` keeps the width axis at
  100 (its default) and the weight axis from 400 (its default) to 900; the
  `@font-face` rule declares `font-weight: 400 900` and `font-stretch: 100%`.
- Characters. The subset keeps every character of the font that the site's
  sources (`app`, `components`, `lib`, `content`) or, when it exists, the
  production export contain, in any script, plus printable ASCII: 217 code
  points and 302 glyphs. Subsetting keeps every feature lookup that applies
  to them (ccmp, locl, the init, medi and fina contextual forms, rlig
  ligatures, mark and mkmk positioning, kern); isolated forms are the
  default glyphs. Pages use Western digits; Arabic-Indic digits are not in
  the copy.
- Checks. HarfBuzz shapes all 6,344 distinct Arabic text segments of the
  exported pages to the same glyphs, advances and mark offsets with both
  fonts at weights 400 to 900. Every glyph outline and advance is identical
  at the weights in use, except the dieresis of eight Latin letters
  (Ä Ö Ü ä ë ï ö ü, which no Arabic page lays out), moved by at most
  0.5/1000 em by the instancer.

`check:font-coverage` fails when a character of the sources (or, with
`--production-export`, of the exported HTML and client JavaScript) is in the
complete font but not in the published subset, and when `arabic.css` names a
file other than the one subset in this folder. When that happens, build,
run `node tools/subset-arabic-font.mjs`, and build again.
