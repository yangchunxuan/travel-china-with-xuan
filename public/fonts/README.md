# Homeground locale font subsets

These WOFF2 files contain only the characters currently used by Homeground's
localized homepage and route finder. They are self-hosted so the English page
does not request CJK fonts and the Chinese and Korean pages do not depend on a
third-party font CDN at runtime.

- `homeground-serif-sc.woff2` — Noto Serif SC, weight 500, sourced from the
  [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/notoserifsc).
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
Hangul character used by the Homeground pages; it also runs automatically
before every production build, so missing glyphs cannot silently ship with a
system-font fallback.

The current subsets were regenerated from these exact upstream artifacts:

- `NotoSerifSC[wght].ttf` from the Google Fonts `main` branch, instantiated at
  `wght=500` before subsetting.
- `PretendardVariable.woff2` from the official Pretendard `v1.3.9` tag.
- `MaruBuri-Regular.ttf` from NAVER's official `maruburi.zip` download.

Use `fonttools varLib.instancer` for the fixed Noto Serif SC instance and
`pyftsubset --flavor=woff2` for all three outputs. The required Han and Hangul
sets must be collected from the same source list used by
`tools/check-font-coverage.mjs`; retain basic Latin, punctuation and navigation
symbols as well. Always run `npm run check:font-coverage` after replacing the
files.
