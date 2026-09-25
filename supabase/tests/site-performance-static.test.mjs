import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import homegroundImageLoader from "../../lib/imageLoader.ts";
import { coverImageSizes, generatedImageSrcSet } from "../../lib/generatedImageSrcSet.ts";

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

test("cover-cropped images size each slot for the width the photo is drawn at", () => {
  const cardSlots = [
    { media: "(max-width: 680px)", size: "6.5rem", boxAspect: 1 },
    { media: "(max-width: 980px)", size: "calc((100vw - 4rem) / 2)", boxAspect: 16 / 10 },
    { size: "25rem", boxAspect: 16 / 10 },
  ];

  // A 16:10 photo fills a 16:10 card exactly, but a square phone thumbnail
  // shows only its middle, so the whole photo is drawn 1.6x the box width.
  assert.equal(
    coverImageSizes(1600, 1000, cardSlots),
    "(max-width: 680px) calc(6.5rem * 1.60), (max-width: 980px) calc((100vw - 4rem) / 2), 25rem",
  );
  assert.equal(
    coverImageSizes(1600, 692, cardSlots),
    "(max-width: 680px) calc(6.5rem * 2.31), (max-width: 980px) calc(calc((100vw - 4rem) / 2) * 1.45), calc(25rem * 1.45)",
  );
  // Photos narrower than the box are scaled by width: the slot is exact.
  assert.equal(
    coverImageSizes(750, 1000, [{ media: "(max-width: 680px)", size: "3.25rem", boxAspect: 1 }, { size: "10rem", boxAspect: 3 / 4 }]),
    "(max-width: 680px) 3.25rem, 10rem",
  );
});

test("oversized card and portrait images request the generated variants", async () => {
  const [platformHub, collectionHub, studio] = await Promise.all([
    source("components/SearchPlatformHubPage.tsx"),
    source("components/SearchCollectionHubPage.tsx"),
    source("components/HomegroundStudioPage.tsx"),
  ]);

  for (const hub of [platformHub, collectionHub]) {
    assert.match(hub, /src=\{guide\.cardImagePath\}\s*srcSet=\{generatedImageSrcSet\(guide\.cardImagePath, guide\.cardImageWidth\)\}/);
    assert.match(hub, /sizes=\{coverImageSizes\(\s*guide\.cardImageWidth,\s*guide\.cardImageHeight,\s*guideCardImageSlots,\s*\)\}/);
    // Mirrors .guideGrid / .guideCard figure in SearchPlatformHubPage.module.css.
    assert.match(hub, /\{ media: "\(max-width: 680px\)", size: "6\.5rem", boxAspect: 1 \}/);
    assert.match(hub, /\{ media: "\(max-width: 980px\)", size: "calc\(\(100vw - 4rem\) \/ 2\)", boxAspect: 16 \/ 10 \}/);
    assert.match(hub, /\{ media: "\(max-width: 1280px\)", size: "calc\(\(100vw - 5rem\) \/ 3\)", boxAspect: 16 \/ 10 \}/);
    assert.match(hub, /\{ size: "25rem", boxAspect: 16 \/ 10 \}/);
  }

  // Hero constellation portraits render at 52-160 CSS px; team cards keep
  // their reviewed slot widths.
  assert.match(
    studio,
    /sizes=\{photoSizes\(member\.image, tilePhotoSlots\)\}\s*src=\{member\.image\.smallSrc\}\s*srcSet=\{smallPhotoSources\(member\.image\)\}/,
  );
  assert.match(studio, /sizes=\{photoSizes\(member\.image, teamPhotoSlots\)\}/);
  assert.match(studio, /\{ media: "\(max-width: 680px\)", size: "3\.25rem", boxAspect: 1 \}/);
  assert.match(studio, /\{ media: "\(max-width: 1180px\)", size: "30vw", boxAspect: 3 \/ 4 \}/);
  assert.match(studio, /srcSet=\{photoSources\(member\.image\)\}/);
  assert.match(studio, /image\.smallWidth > 640/);
});

test("Chinese pages preload only the catch-all slice of the sliced serif", async () => {
  const [layout, globals, stylesheet] = await Promise.all([
    source("app/(localized)/[locale]/layout.tsx"),
    source("app/globals.css"),
    source("public/fonts/homeground-serif-sc.css"),
  ]);
  const { parseFontFaces } = await import("../../tools/serif-sc-slice-plan.mjs");
  const faces = parseFontFaces(stylesheet);

  // Slice 00 has no unicode-range: it stays the family's primary font and
  // catch-all, and it is the one slice worth fetching before first paint.
  assert.ok(faces.length > 1);
  assert.equal(faces[0].ranges, null);
  assert.ok(faces.slice(1).every((face) => face.ranges?.length > 0));
  const serifPreloads = [
    ...layout.matchAll(/rel="preload"\s+href="(\/fonts\/homeground-serif-sc[^"]*)"/g),
  ].map((match) => match[1]);
  assert.deepEqual(serifPreloads, [faces[0].src]);
  assert.match(layout, /rel="stylesheet"\s+href="\/fonts\/homeground-serif-sc\.css"/);
  assert.doesNotMatch(globals, /font-family:\s*"Homeground Serif SC"/);
});

test("tour heroes are fetched at high priority, not only preloaded", async () => {
  const [jiangnanDeck, zhangjiajie] = await Promise.all([
    source("components/ShanghaiJiangnanImagineInteractive.tsx"),
    source("components/ZhangjiajiePrivateTourPreviewPage.tsx"),
  ]);

  // next/image `priority` alone leaves the image at the browser's Low priority.
  assert.match(jiangnanDeck, /fetchPriority=\{index === 0 \? "high" : undefined\}\s*fill\s*priority=\{index === 0\}/);
  // With real variants behind the srcset, sizes must cover the object-fit
  // crop: on desktop the 3:2 photo fills a 4:5 box (~38vw), ~1.9x its width.
  assert.match(
    zhangjiajie,
    /fetchPriority="high"\s*fill\s*priority\s*sizes="\(max-width: 860px\) 100vw, \(max-width: 1440px\) 72vw, 1040px"\s*src="\/product-previews\/zhangjiajie-4-day-private-tour\/hero\/sunlit-forest-pillars-174\.jpg"/,
  );
});

test("the contact card heading keeps its style whichever route's stylesheet loaded last", async () => {
  const [card, home] = await Promise.all([
    source("components/ContactCard.module.css"),
    source("components/HomegroundHomePage.module.css"),
  ]);

  // With per-route CSS, arriving on the homepage by a click loaded the homepage
  // file after the card's; `.quickContactCard h3` then won the tie and turned the
  // "Scan to chat" heading bold (sans-serif in zh/ko). The card rules outrank it.
  assert.match(home, /\.quickContactCard h3 \{/);
  assert.match(card, /\.scan\.scan h3,\s*\.mail\.mail h3 \{[^}]*font-family:\s*var\(--hg-font-editorial, Georgia, serif\);[^}]*font-weight:\s*400;/);
  assert.match(card, /\.scanInline\.scanInline h3 \{\s*font-size:\s*1\.375rem;\s*\}/);
});
