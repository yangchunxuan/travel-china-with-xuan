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

test("the tour grid keeps its layout and only adds scroll and hover motion", async () => {
  const [styles, showcase] = await Promise.all([
    source("components/HomepageProductShowcase.module.css"),
    source("components/HomepageProductShowcase.tsx"),
  ]);
  // Same three-column grid, same cards.
  assert.match(styles, /\.productGrid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(showcase, /products\.map\(\(product, index\)/);
  // Photo unveil, column drift and rule fill run only when motion is welcome and supported.
  const motion = styles.slice(styles.lastIndexOf("@supports (animation-timeline: view())"));
  assert.match(motion, /^@supports \(animation-timeline: view\(\)\) \{\s*@media \(prefers-reduced-motion: no-preference\) \{/);
  for (const rule of ["productImageUnveil", "productImageSettle", "productRuleFill", "productColumnDrift"]) {
    assert.match(motion, new RegExp(`animation: ${rule} linear both;`), rule);
  }
  // The column drift is for the three-column grid only.
  assert.match(motion, /@media \(min-width: 64rem\) \{[\s\S]*?\.productGrid li:nth-child\(3n \+ 2\) \{\s*animation: productColumnDrift/);
  // Pointer effects only where there is a real pointer; the cursor is decoration.
  assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\) \{[\s\S]*?\.productCard:hover \.imageCursor \{\s*scale: 1;/);
  assert.match(showcase, /<span aria-hidden="true" className=\{styles\.imageCursor\}>/);
  // The label roll keeps one readable label.
  assert.match(showcase, /<span>\{copy\.actionLabel\}<\/span>\s*<span aria-hidden="true">\{copy\.actionLabel\}<\/span>/);
  // Reduced motion also stops the hover transitions.
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.imageCursor,[\s\S]*?transition: none;/);
});
