import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("studio motion progressively enhances static server-rendered content", async () => {
  const page = await source("components/HomegroundStudioPage.tsx");

  // No client choreography: the team, method and plan render complete in HTML.
  assert.doesNotMatch(page, /^"use client";/);
  assert.doesNotMatch(page, /HomegroundStudioMotion|data-studio-motion-root|data-studio-reveal/);
  assert.equal(existsSync(new URL("../../components/HomegroundStudioMotion.tsx", import.meta.url)), false);
  assert.match(page, /className=\{styles\.memberList\}/);
  assert.match(page, /<details className=\{styles\.memberDetails\}>/);
});

test("studio motion is CSS-only with mobile and reduced-motion exits", async () => {
  const styles = await source("components/HomegroundStudioPage.module.css");

  // Page-load entrance (the floating photos) only runs when motion is allowed.
  assert.match(styles, /@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\.tile \{[\s\S]*?animation: studioTileIn/);
  // The marquee stops for reduced motion.
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.marqueeRow \{[\s\S]*?animation: none/);
  // Scroll reveals are scroll-driven, behind a feature query and the motion preference.
  assert.match(
    styles,
    /@supports \(animation-timeline: view\(\)\) \{\s*@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?animation-timeline: view\(\)/,
  );
  // Phones get a static single-column team; reduced motion removes transitions.
  assert.match(styles, /@media \(max-width: 680px\)[\s\S]*?\.memberList \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /transform: none !important/);
  assert.doesNotMatch(styles, /scroll-snap-type|scroll-snap-align/);
  // Reveals start half-visible, so nothing waits hidden for a scroll event.
  assert.match(styles, /@keyframes studioRise \{\s*from \{\s*opacity: 0\.55;/);
});
