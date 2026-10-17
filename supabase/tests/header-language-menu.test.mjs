import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const sources = Promise.all([
  source("components/HeaderLanguageMenu.tsx"),
  source("components/HomegroundHeader.module.css"),
]);

test("language disclosure keeps collapsed links inert throughout the closing animation", async () => {
  const [menu, css] = await sources;
  assert.match(menu, /aria-controls=\{panelId\}\s*aria-expanded=\{open\}/);
  assert.match(menu, /className=\{styles\.languageMenuPanel\} id=\{panelId\} inert=\{!open\}/);
  assert.match(css, /\.languageMenuPanel \{[^}]*visibility:\s*hidden;/);
  assert.match(css, /\.languageNav\[data-open\] \.languageMenuPanel \{[^}]*visibility:\s*visible;/);
});

test("Escape restores focus only when focus was inside the language disclosure", async () => {
  const [menu] = await sources;
  assert.match(menu, /event\.key !== "Escape" \|\| event\.defaultPrevented/);
  assert.match(menu, /const focusWasInside = rootRef\.current\?\.contains\(document\.activeElement\) \?\? false;\s*setOpen\(false\);\s*if \(focusWasInside\) buttonRef\.current\?\.focus\(\)/);
  assert.match(menu, /window\.removeEventListener\("keydown", onKeyDown\)/);
});

test("outside clicks, focus leaving and a language choice close the disclosure", async () => {
  const [menu] = await sources;
  assert.match(menu, /event\.target instanceof Node && rootRef\.current\?\.contains\(event\.target\)\) return;\s*setOpen\(false\)/);
  assert.match(menu, /onBlur=\{\(event\) => \{\s*if \(!\(event\.relatedTarget instanceof Node\) \|\| !event\.currentTarget\.contains\(event\.relatedTarget\)\) setOpen\(false\)/);
  assert.match(menu, /event\.target instanceof Element && event\.target\.closest\("a"\)\) setOpen\(false\)/);
  assert.match(menu, /document\.removeEventListener\("pointerdown", onPointerDown\)/);
});

test("another header menu replaces the language panel without a closing fade", async () => {
  const [menu, css] = await sources;
  assert.match(menu, /detail === panelId\) return;\s*setReplaced\(true\);\s*setOpen\(false\)/);
  assert.match(menu, /data-replaced=\{replaced \? "true" : undefined\}/);
  assert.match(menu, /if \(!open\) \{\s*setReplaced\(false\);\s*window\.dispatchEvent\(new CustomEvent\(menuOpenEvent, \{ detail: panelId \}\)\)/);
  assert.match(css, /\.languageNav\[data-replaced\] :is\(\.languageMenuPanel, \.languageMenuList, \.languageMenuList li\) \{\s*transition: none;/);
});

test("the desktop disclosure closes when resizing below the unchanged mobile breakpoint", async () => {
  const [menu, css] = await sources;
  assert.match(menu, /const onResize = \(\) => \{\s*if \(window\.innerWidth < 1180\) setOpen\(false\)/);
  assert.match(menu, /window\.addEventListener\("resize", onResize\)/);
  assert.match(menu, /window\.removeEventListener\("resize", onResize\)/);
  assert.match(css, /@media \(max-width: 1179\.98px\)[\s\S]*?\.desktopNav,\s*\.desktopUtilityLink,\s*\.languageNav \{\s*display: none;/);
});

test("language controls retain 44px targets and disable motion when requested", async () => {
  const [, css] = await sources;
  for (const selector of ["languageMenuButton", "languageNav a"]) {
    const escapedSelector = selector.replaceAll(" ", "\\s+");
    assert.match(css, new RegExp(`\\.${escapedSelector} \\{[^}]*min-block-size:\\s*2\\.75rem;[^}]*min-inline-size:\\s*2\\.75rem;`));
  }
  const reduced = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
  assert.match(reduced, /\.languageMenuButton,[\s\S]*?\.languageMenuButton svg,[\s\S]*?\.languageMenuPanel,[\s\S]*?\.languageMenuList,[\s\S]*?\.languageMenuList li,[^}]*transition: none;/);
  assert.match(reduced, /\.languageMenuList,\s*\.languageMenuList li,\s*\.languageNav\[data-open\] \.languageMenuButton svg \{\s*transform: none;/);
  assert.match(reduced, /\.languageNav\[data-open\] \.languageMenuList li \{\s*transition-delay: 0s;/);
});
