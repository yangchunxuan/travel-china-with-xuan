import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { describePublishedTourCatalog } from "../../tools/lib/llms-catalog-summary.mjs";

const root = new URL("../../", import.meta.url);
const source = (relativePath) => readFile(new URL(relativePath, root), "utf8");

test("the IndexNow key file matches the key the deploy step sends", async () => {
  const workflow = (await source(".github/workflows/deploy.yml")).replace(/\r\n/g, "\n");
  const key = workflow.match(/INDEXNOW_KEY: ([a-f0-9]{32})\n/u)?.[1];
  assert.ok(key, "deploy.yml sets a 32-character hex IndexNow key");
  const keyFiles = (await readdir(new URL("public/", root))).filter((name) => /^[a-f0-9]{32}\.txt$/u.test(name));
  assert.deepEqual(keyFiles, [`${key}.txt`], "exactly one key file, named after the key");
  assert.equal(await source(`public/${key}.txt`), key, "the key file holds only the key");
  assert.match(workflow, /continue-on-error: true[\s\S]*?INDEXNOW_KEY/u, "IndexNow can never fail a deployment");
  assert.match(workflow, /https:\/\/api\.indexnow\.org\/indexnow/u);
  // It runs after the Cloudflare purge, so search engines fetch the new pages.
  assert.ok(workflow.indexOf("Tell IndexNow") > workflow.indexOf("purge_cache\n          sleep 60"));
});

test("the AI catalogue summary distinguishes published prices from individual quotes", () => {
  assert.equal(
    describePublishedTourCatalog([{ startingPrice: { amount: 500 } }, { startingPrice: null }, { startingPrice: { amount: 900 } }]),
    "3 published routes: 2 with per-person prices in USD; 1 quoted on request.",
  );
  assert.equal(
    describePublishedTourCatalog([{ startingPrice: { amount: 500 } }, { startingPrice: { amount: 900 } }]),
    "2 published routes: 2 with per-person prices in USD.",
    "publishing a formerly quote-only price updates both counts",
  );
});

test("llms.txt is generated from the published catalogue after every export", async () => {
  const pkg = JSON.parse(await source("package.json"));
  assert.match(pkg.scripts.postbuild, /tools\/generate-llms-txt\.mjs/u);
  const generator = await source("tools/generate-llms-txt.mjs");
  assert.match(generator, /getPublishedPrivateTourCatalog\("en"\)/u, "tours and prices come from the catalogue");
  assert.match(generator, /homegroundBusiness/u, "the licensed operator is named from the single entity source");
  assert.match(generator, /is not in the export/u, "every link is checked against the export");
  assert.match(generator, /describePublishedTourCatalog\(tours\)/u);
  assert.match(generator, /start a trip enquiry at \$\{SITE\}\/#planner-contact/u);
  assert.doesNotMatch(generator, /trip brief form at \$\{SITE\}\/plan\//u);
});
