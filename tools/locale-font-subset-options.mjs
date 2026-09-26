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
