import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import homegroundImageLoader from "../../lib/imageLoader.ts";
import { generatedImageSrcSet } from "../../lib/generatedImageSrcSet.ts";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("CSS is chunked per webpack chunk, not merged into shared cross-page files", async () => {
  const config = await source("next.config.mjs");

  // Next 15's default loose chunking put tour, guide and planner styles on
  // unrelated pages (~300 KB of CSS per page, most of it unused).
  assert.match(config, /experimental:\s*\{[^}]*cssChunking:\s*false/s);
});

test("the shared footer carries its own stylesheet instead of the homepage one", async () => {
  const [footer, footerCss, homeCss] = await Promise.all([
    source("components/HomegroundFooter.tsx"),
    source("components/HomegroundFooter.module.css"),
    source("components/HomegroundHomePage.module.css"),
  ]);

  assert.match(footer, /import styles from "\.\/HomegroundFooter\.module\.css";/);
  assert.doesNotMatch(footer, /HomegroundHomePage\.module\.css/);
  assert.doesNotMatch(homeCss, /\.footer/);

  const usedClasses = new Set(
    [...footer.matchAll(/\bstyles\.([A-Za-z]+)/g)].map((match) => match[1]),
  );
  assert.deepEqual(
    [...usedClasses].sort(),
    ["footer", "footerLegal", "footerNote", "footerPrivacyButton", "footerTop"],
  );
  for (const className of usedClasses) {
    assert.match(footerCss, new RegExp(`\\.${className}\\b[^{]*\\{`), `.${className} is styled`);
  }
  for (const locale of ["zh", "ko"]) {
    assert.match(
      footerCss,
      new RegExp(
        `:global\\(\\.hg-locale-root\\)\\[data-homeground-locale="${locale}"\\] \\.footerTop > div:first-child span \\{[^}]*text-transform: none`,
      ),
    );
  }
  assert.match(footerCss, /@media \(max-width: 680px\) \{\s*\.footerTop \{/);
});

test("product-preview photos get the same responsive variants as /images/", async () => {
  const [generator, gitignore, pruner] = await Promise.all([
    source("tools/generate-image-variants.mjs"),
    source(".gitignore"),
    source("tools/prune-production-export.mjs"),
  ]);
  const hero = "/product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg";

  assert.match(generator, /\["images", "product-previews"\]/);
  for (const width of [640, 1024, 1280]) {
    assert.match(gitignore, new RegExp(`^public/product-previews/\\*\\*/\\*\\.w${width}\\.webp$`, "m"));
    assert.equal(
      homegroundImageLoader({ src: hero, width }),
      hero.replace(/\.jpg$/, `.w${width}.webp`),
    );
  }
  // The original stays the fallback src (and og:image) above 1280px.
  assert.equal(homegroundImageLoader({ src: hero, width: 1600 }), hero);
  assert.equal(homegroundImageLoader({ src: "/brand/logo.svg", width: 640 }), "/brand/logo.svg");
  assert.match(pruner, /\.map\(\(width\) => asset\.replace\(\/\\\.\[a-z\]\+\$\/i, `\.w\$\{width\}\.webp`\)\)/);
});

test("plain <img> srcsets list only generated variants narrower than the original", () => {
  assert.equal(
    generatedImageSrcSet("/images/guides/a/card.jpg", 1600),
    "/images/guides/a/card.w640.webp 640w, /images/guides/a/card.w1024.webp 1024w, /images/guides/a/card.w1280.webp 1280w, /images/guides/a/card.jpg 1600w",
  );
  assert.equal(
    generatedImageSrcSet("/images/guides/a/card.webp", 900),
    "/images/guides/a/card.w640.webp 640w, /images/guides/a/card.webp 900w",
  );
  assert.equal(generatedImageSrcSet("/images/guides/a/card.jpg", 640), undefined);
  assert.equal(generatedImageSrcSet("/images/guides/a/card.w640.webp", 640), undefined);
  assert.equal(generatedImageSrcSet("/images/guides/a/card.svg", 1600), undefined);
  assert.equal(generatedImageSrcSet("https://example.com/card.jpg", 1600), undefined);
});

test("oversized card and portrait images request the generated variants", async () => {
  const [platformHub, collectionHub, studio] = await Promise.all([
    source("components/SearchPlatformHubPage.tsx"),
    source("components/SearchCollectionHubPage.tsx"),
    source("components/HomegroundStudioPage.tsx"),
  ]);

  for (const hub of [platformHub, collectionHub]) {
    assert.match(hub, /src=\{guide\.cardImagePath\}\s*srcSet=\{generatedImageSrcSet\(guide\.cardImagePath, guide\.cardImageWidth\)\}/);
    assert.match(hub, /sizes=\{guideCardImageSizes\}/);
    assert.match(hub, /"\(max-width: 680px\) 6\.5rem, \(max-width: 980px\) calc\(\(100vw - 4rem\) \/ 2\), \(max-width: 1280px\) calc\(\(100vw - 5rem\) \/ 3\), 25rem"/);
  }

  // Hero constellation portraits render at 52-160 CSS px.
  assert.match(
    studio,
    /sizes="\(max-width: 680px\) 3\.25rem, \(max-width: 1180px\) 7\.75rem, 10rem"\s*src=\{member\.image\.smallSrc\}\s*srcSet=\{smallPhotoSources\(member\.image\)\}/,
  );
  assert.match(studio, /srcSet=\{photoSources\(member\.image\)\}/);
  assert.match(studio, /image\.smallWidth > 640/);
});

test("tour heroes are fetched at high priority, not only preloaded", async () => {
  const [jiangnanDeck, zhangjiajie] = await Promise.all([
    source("components/ShanghaiJiangnanImagineInteractive.tsx"),
    source("components/ZhangjiajiePrivateTourPreviewPage.tsx"),
  ]);

  // next/image `priority` alone leaves the image at the browser's Low priority.
  assert.match(jiangnanDeck, /fetchPriority=\{index === 0 \? "high" : undefined\}\s*fill\s*priority=\{index === 0\}/);
  assert.match(
    zhangjiajie,
    /fetchPriority="high"\s*fill\s*priority\s*sizes="\(max-width: 860px\) 100vw, 42vw"\s*src="\/product-previews\/zhangjiajie-4-day-private-tour\/hero\/sunlit-forest-pillars-174\.jpg"/,
  );
});
