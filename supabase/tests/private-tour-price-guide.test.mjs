import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { renderFiles } from "../../tools/generate-private-tour-price-guide.mjs";
import { privateTourProducts, localizePrivateTourProduct } from "../../lib/privateTourProducts.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");

test("the private tour price guide matches the current product prices", async () => {
  const files = renderFiles();
  // Three bodies and the metadata, whose title and description carry counts and prices.
  assert.equal(Object.keys(files).length, 4);
  for (const [relativePath, expected] of Object.entries(files)) {
    const actual = await readFile(path.join(projectRoot, relativePath), "utf8");
    assert.equal(
      actual,
      expected,
      `${relativePath} is stale; run tools/generate-private-tour-price-guide.mjs --write`,
    );
  }
});

test("each price table row opens its published product in the same language", async () => {
  for (const locale of ["en", "zh", "ko"]) {
    const { default: body } = await import(`../../content/guides/china-private-tour-prices/body.${locale}.ts`);
    const tables = body.blocks.filter((block) => block.type === "table" && block.id !== "glance-table");
    const linkedSlugs = new Set();
    for (const table of tables) {
      assert.equal(table.rowLinks.length, table.rows.length);
      table.rowLinks.forEach((href, index) => {
        const prefix = locale === "en" ? "/tours/" : `/${locale}/tours/`;
        assert.ok(href.startsWith(prefix), `${locale}: ${href} stays in the reader's language`);
        const slug = href.slice(prefix.length, -1);
        const product = privateTourProducts.find((product) => product.slug === slug);
        assert.ok(product && product.tourFormat !== "small-group", `${href} is a published private route`);
        const localized = localizePrivateTourProduct(product, locale);
        // The clickable label must name the route it opens, even where the
        // same route has separate guide options or seasonal price rows.
        const routeName = table.rows[index][0].split(" (")[0];
        assert.ok(localized.title.startsWith(routeName), `${href} matches ${routeName}`);
        assert.ok(localized.packages.some((option) => option.rows.length > 0));
        linkedSlugs.add(slug);
      });
    }
    const pricedSlugs = privateTourProducts.filter((product) =>
      product.tourFormat !== "small-group" && localizePrivateTourProduct(product, locale).packages.some((option) => option.rows.length > 0),
    ).map((product) => product.slug);
    assert.deepEqual(linkedSlugs, new Set(pricedSlugs), `${locale}: every compared route is linked`);
    assert.equal(body.blocks.find((block) => block.id === "glance-table").rowLinks, undefined, "the summary stays a plain table");
  }
});
