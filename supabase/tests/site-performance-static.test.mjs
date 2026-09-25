import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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
