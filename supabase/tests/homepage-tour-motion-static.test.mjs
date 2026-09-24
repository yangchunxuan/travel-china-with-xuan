import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("homepage tour prices settle in glyph by glyph without ever showing another number", async () => {
  const [reveal, styles, showcase] = await Promise.all([
    source("components/motion/CharReveal.tsx"),
    source("components/motion/CharReveal.module.css"),
    source("components/HomepageProductShowcase.tsx"),
  ]);
  // Every character of the real price is rendered as it is; spaces stay text.
  assert.match(reveal, /Array\.from\(text\)\.map/);
  assert.match(reveal, /char === " " \?/);
  assert.doesNotMatch(reveal, /useState|useEffect|setInterval|Math\.random/);
  assert.match(showcase, /<CharReveal text=\{product\.startingPrice\.formatted\} \/>/);
  // Scroll-linked, behind a feature query and the motion preference.
  assert.match(styles, /@supports \(animation-timeline: view\(\)\) \{\s*@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\.char \{[\s\S]*?animation-timeline: view\(\);/);
});

test("wide screens list the tours as a numbered index beside one large photo", async () => {
  const [styles, showcase] = await Promise.all([
    source("components/HomepageProductShowcase.module.css"),
    source("components/HomepageProductShowcase.tsx"),
  ]);
  // Every route is still its own link with its own photo and alt text.
  assert.match(showcase, /products\.map\(\(product, index\)/);
  assert.match(showcase, /alt=\{product\.image\.alt\}/);
  // The large photo repeats a row's photo, so assistive tech skips it.
  assert.match(showcase, /<div aria-hidden="true" className=\{styles\.preview\}>/);
  assert.match(showcase, /alt=""\s*data-active=\{index === active \|\| undefined\}/);
  // Pointer, keyboard focus and scroll position all choose the lit route;
  // the scroll watcher only runs where the index is shown.
  assert.match(showcase, /onFocus=\{\(\) => activate\(index\)\}/);
  assert.match(showcase, /onPointerEnter=\{\(\) => activate\(index\)\}/);
  // Large photos load as routes are reached, one ahead, not all six at once.
  assert.match(showcase, /new Set\(\[0, 1\]\)/);
  assert.match(showcase, /warm\.has\(index\) \? \(/);
  assert.match(showcase, /window\.matchMedia\(wideIndexQuery\)/);
  assert.match(showcase, /if \(!wide\.matches\) return;/);
  assert.match(showcase, /wide\.addEventListener\("change", sync\)/);
  assert.match(showcase, /new IntersectionObserver/);
  assert.match(showcase, /wide\.removeEventListener\("change", sync\);\s*observer\?\.disconnect\(\);/);
  // Phones keep their list and tablets their two-column cards; the photo and
  // row numbers only appear in the wide-screen index.
  assert.match(styles, /^\.productGrid \{[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/m);
  assert.match(styles, /^\.preview,\s*\.rowIndex \{\s*display: none;/m);
  const wide = styles.slice(styles.indexOf("@media (min-width: 64rem) {"));
  assert.match(wide, /\.preview \{[^}]*position: sticky;/);
  assert.match(wide, /\.productGrid \{\s*gap: 0;\s*grid-template-columns: minmax\(0, 1fr\);/);
  const roomy = styles.slice(styles.indexOf("@media (min-width: 80rem) {"));
  assert.match(roomy, /grid-template-areas:\s*"meta price"\s*"title price"\s*"desc price"\s*"action price";/);
  // No pointer-following decoration. The heading stays plain: the word
  // reveal pulled homepage CSS into other pages' shared stylesheets.
  assert.doesNotMatch(showcase + styles, /PointerSpotlight|imageCursor|--spot-x|productColumnDrift/);
  assert.doesNotMatch(showcase, /ScrollWords/);
  // The label roll keeps one readable label.
  assert.match(showcase, /<span>\{copy\.actionLabel\}<\/span>\s*<span aria-hidden="true">\{copy\.actionLabel\}<\/span>/);
  // Reduced motion stops the photo wipe and the row transitions, and comes
  // last so the wide-screen rules cannot win over it.
  const reduced = styles.slice(styles.lastIndexOf("@media"));
  assert.match(reduced, /^@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.previewFrame img\[data-active\],[\s\S]*?transition: none;/);
});
