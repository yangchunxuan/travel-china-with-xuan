// pyftsubset options shared by every self-hosted locale font. Keep every
// OpenType layout feature, glyph names and the full name table so a subset (or
// a unicode-range slice of one) shapes exactly like the upstream font.
export const localeFontSubsetOptions = [
  "--flavor=woff2",
  "--layout-features=*",
  "--glyph-names",
  "--symbol-cmap",
  "--legacy-cmap",
  "--notdef-glyph",
  "--notdef-outline",
  "--recommended-glyphs",
  "--name-IDs=*",
  "--name-legacy",
  "--name-languages=*",
];

// The two Korean fonts keep only the OpenType features a browser applies to
// Korean pages: the default shaping features of Hangul and Latin text, and
// tnum for `font-variant-numeric: tabular-nums`. The alternates reachable only
// through features no page requests (aalt, case, cv01–cv13, dlig, frac, fwid,
// ordn, salt, sinf, ss01–ss08, subs, sups, zero, vert…) are left out. Every
// Korean page shapes exactly as with the full feature set;
// tools/check-font-coverage.mjs fails when a stylesheet starts requesting a
// feature that is not kept here. Glyph names stay: without them Chrome on
// macOS anti-aliases small text differently at device pixel ratio 1.
export const koreanLayoutFeatures = [
  "abvm", "blwm", "calt", "ccmp", "clig", "curs", "dist", "kern", "liga", "ljmo",
  "locl", "mark", "mkmk", "rclt", "rlig", "rvrn", "tjmo", "tnum", "vjmo",
];
export const koreanFontSubsetOptions = [
  ...localeFontSubsetOptions.filter((option) => !option.startsWith("--layout-features=")),
  `--layout-features=${koreanLayoutFeatures.join(",")}`,
];
