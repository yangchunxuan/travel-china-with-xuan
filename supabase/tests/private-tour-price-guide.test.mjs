import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { renderFiles } from "../../tools/generate-private-tour-price-guide.mjs";

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
