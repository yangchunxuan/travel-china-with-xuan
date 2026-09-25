import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { renderFiles } from "../generate-long-haul-guides.mjs";

const projectRoot = path.resolve(import.meta.dirname, "../..");

test("long-haul guide bodies match the current product prices and dates", async () => {
  const files = renderFiles();
  assert.equal(Object.keys(files).length, 9);
  for (const [relativePath, expected] of Object.entries(files)) {
    const actual = await readFile(path.join(projectRoot, relativePath), "utf8");
    assert.equal(
      actual,
      expected,
      `${relativePath} is stale; run tools/generate-long-haul-guides.mjs --write`,
    );
  }
});
