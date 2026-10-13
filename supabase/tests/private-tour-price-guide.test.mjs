import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { renderFiles } from "../../tools/generate-private-tour-price-guide.mjs";
import { privateTourProducts, localizePrivateTourProduct } from "../../lib/privateTourProducts.ts";
import { assertStructuredPageBody } from "../../lib/content-system/page-body.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");

test("the private tour price guide matches the current product prices", async () => {
  const files = renderFiles();
  // Three bodies and the metadata, whose title and description carry counts and prices.
  assert.equal(Object.keys(files).length, 4);
  for (const [relativePath, expected] of Object.entries(files)) {
    const actual = (await readFile(path.join(projectRoot, relativePath), "utf8")).replace(/\r\n/gu, "\n");
    assert.equal(
      actual,
      expected,
      `${relativePath} is stale; run tools/generate-private-tour-price-guide.mjs --write`,
    );
  }
});

test("each detailed price row opens its published product in the same language", async () => {
  for (const locale of ["en", "zh", "ko"]) {
    const { default: body } = await import(`../../content/guides/china-private-tour-prices/body.${locale}.ts`);
    assertStructuredPageBody(body);
    const tables = body.blocks.filter((block) => block.type === "table" && block.id !== "glance-table");
    const linkedSlugs = new Set();
    for (const table of tables) {
      assert.equal(table.rowLinks.length, table.rows.length);
      table.rowLinks.forEach((href, index) => {
        const prefix = locale === "en" ? "/tours/" : `/${locale}/tours/`;
        assert.ok(href.startsWith(prefix), `${href} stays in ${locale}`);
        const slug = href.slice(prefix.length, -1);
        const product = privateTourProducts.find((item) => item.slug === slug);
        assert.ok(product && product.tourFormat !== "small-group", `${href} is a published private route`);
        const localized = localizePrivateTourProduct(product, locale);
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
    assert.equal(body.blocks.find((block) => block.id === "glance-table").rowLinks, undefined);
  }
});

test("two-week comparison links keep the route duration, format and displayed prices", async () => {
  const compactPrice = (value) => value.replace(/\s/gu, "");
  for (const locale of ["en", "zh", "ko"]) {
    for (const guide of ["best-2-week-china-tour", "china-2-week-tour-cost"]) {
      const { default: body } = await import(`../../content/guides/${guide}/body.${locale}.ts`);
      assertStructuredPageBody(body);
      const tables = body.blocks.filter((block) => block.type === "table");
      assert.equal(tables.reduce((count, table) => count + table.rows.length, 0), guide === "best-2-week-china-tour" ? 4 : 14);
      for (const table of tables) {
        assert.equal(table.rowLinks.length, table.rows.length);
        table.rows.forEach((row, index) => {
          const href = table.rowLinks[index];
          const prefix = locale === "en" ? "/tours/" : `/${locale}/tours/`;
          assert.ok(href.startsWith(prefix) && href.endsWith("/"), `${href} stays in ${locale}`);
          const slug = href.slice(prefix.length, -1);
          const product = privateTourProducts.find((item) => item.slug === slug);
          assert.ok(product, `${href} is published`);
          assert.equal(product.tourFormat === "small-group", table.id === "small-group-table", `${href} retains the table's tour format`);
          const displayedDays = guide === "best-2-week-china-tour" ? 14 : Number(row[1].match(/(\d+)\s*(?:days|天|일)/u)?.[1]);
          assert.equal(product.days, displayedDays, `${href} has the displayed duration`);
          const packages = localizePrivateTourProduct(product, locale).packages;
          if (table.id === "private-table") {
            assert.ok(packages.some((option) => [2, 4, 6].every((travelers, column) =>
              compactPrice(option.rows.find((tier) => tier.travelers === travelers)?.formatted ?? "") === compactPrice(row[column + 2]),
            )), `${href} has all three displayed group-size prices`);
          } else {
            const price = guide === "best-2-week-china-tour" ? row.at(-1) : row[2];
            assert.ok(packages.some((option) => option.rows.some((tier) =>
              (table.id === "small-group-table" || tier.travelers === 2) && compactPrice(tier.formatted) === compactPrice(price),
            )), `${href} has the displayed starting price`);
          }
        });
      }
    }
  }
});
