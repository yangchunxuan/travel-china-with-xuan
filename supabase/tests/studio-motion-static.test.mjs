import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("studio motion progressively enhances static server-rendered content", async () => {
  const page = await source("components/HomegroundStudioPage.tsx");
  const motion = await source("components/HomegroundStudioMotion.tsx");

  assert.match(page, /<HomegroundStudioMotion rootId=\{motionRootId\} \/>/);
  assert.match(page, /data-studio-motion-root/);
  assert.match(page, /data-studio-collage-scene/);
  assert.match(page, /data-studio-member/);
  assert.doesNotMatch(page, /data-motion="ready"/);

  assert.match(motion, /"IntersectionObserver" in window/);
  assert.match(motion, /new IntersectionObserver/);
  assert.match(motion, /new ResizeObserver/);
  assert.match(motion, /window\.requestAnimationFrame/);
  assert.match(
    motion,
    /window\.addEventListener\("scroll", scheduleRender, \{ passive: true \}\)/,
  );
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(motion, /preventDefault|addEventListener\("wheel"|Lenis|gsap/i);
});

test("studio scroll choreography has mobile and reduced-motion exits", async () => {
  const styles = await source("components/HomegroundStudioPage.module.css");

  assert.match(
    styles,
    /@media \(min-width: 901px\) and \(prefers-reduced-motion: no-preference\)/,
  );
  assert.match(styles, /\.collage[\s\S]*position: sticky/);
  assert.match(styles, /\.memberRail,[\s\S]*\.memberStory \{[\s\S]*position: sticky/);
  assert.match(styles, /@media \(max-width: 900px\)/);
  assert.match(styles, /\.collageScene \{\s*height: auto;/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /transform: none !important/);
  assert.doesNotMatch(styles, /scroll-snap-type|scroll-snap-align/);
});
