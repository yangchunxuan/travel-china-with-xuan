import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

const publishedHubIds = [
  "beijing",
  "shanghai",
  "xian",
  "chengdu",
  "guangzhou",
  "hangzhou",
  "zhangjiajie",
  "chongqing",
];

const blockedHubIds = ["guilin", "shenzhen"];

const publishedDates = {
  beijing: "2026-08-16",
  shanghai: "2026-08-16",
  xian: "2026-08-16",
  chengdu: "2026-08-17",
  guangzhou: "2026-08-17",
  hangzhou: "2026-08-20",
  zhangjiajie: "2026-08-20",
  chongqing: "2026-08-21",
};

const cityParents = {
  "city-beijing": "country-china",
  "city-shanghai": "country-china",
  "city-xian": "province-shaanxi",
  "city-chengdu": "province-sichuan",
  "city-guangzhou": "province-guangdong",
  "city-shenzhen": "province-guangdong",
  "city-zhangjiajie": "province-hunan",
  "city-hangzhou": "province-zhejiang",
  "city-guilin": "province-guangxi",
  "city-chongqing": "country-china",
};

const originalEntityIds = [
  "country-china",
  "province-shaanxi",
  "province-sichuan",
  "province-guangdong",
  "province-hunan",
  "province-zhejiang",
  "province-guangxi",
  ...Object.keys(cityParents),
];

test("the canonical entity registry gives all ten cities one valid administrative chain", async () => {
  const records = JSON.parse(await source("content/entities/core-places.json"));
  const entities = records.map((record) => record.data);
  const byId = new Map(entities.map((entity) => [entity.id, entity]));

  assert.equal(new Set(entities.map((entity) => entity.id)).size, entities.length);
  assert.equal(originalEntityIds.length, 17);
  for (const entityId of originalEntityIds) {
    assert.ok(byId.has(entityId), `${entityId} remains in the extensible registry`);
  }

  for (const [cityId, parentId] of Object.entries(cityParents)) {
    assert.deepEqual(byId.get(cityId)?.parentEntityIds, [parentId], cityId);
  }

  for (const provinceId of [
    "province-shaanxi",
    "province-sichuan",
    "province-guangdong",
    "province-hunan",
    "province-zhejiang",
    "province-guangxi",
  ]) {
    assert.equal(byId.get(provinceId)?.entityType, "province", provinceId);
    assert.deepEqual(byId.get(provinceId)?.parentEntityIds, ["country-china"]);
  }

  assert.equal(
    byId.get("province-guangxi")?.attributes?.administrativeKind,
    "autonomous-region",
  );
  for (const cityId of ["city-beijing", "city-shanghai", "city-chongqing"]) {
    assert.equal(
      byId.get(cityId)?.attributes?.administrativeKind,
      "direct-administered-municipality",
      cityId,
    );
  }
});

test("the runtime contract publishes eight Hubs with truthful dates", async () => {
  const [registry, runtime, defaultRoute, localizedRoute, discovery, adapter] =
    await Promise.all([
      source("lib/destinationHubs.ts"),
      source("lib/destinationHubRuntime.ts"),
      source("app/(default)/destinations/[city]/page.tsx"),
      source("app/(localized)/[locale]/destinations/[city]/page.tsx"),
      source("components/DestinationsHubPage.tsx"),
      source("lib/destinationHubContentAdapter.ts"),
    ]);

  const idBlock = registry.match(
    /export const destinationHubIds = \[([\s\S]*?)\] as const/,
  );
  assert.ok(idBlock);
  assert.deepEqual(
    [...idBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    publishedHubIds,
  );

  for (const [id, date] of Object.entries(publishedDates)) {
    const entry = registry.match(
      new RegExp('id: "' + id + '"[\\s\\S]*?datePublished: "([^"]+)"'),
    );
    assert.equal(entry?.[1], date, id);
    assert.match(runtime, new RegExp("^  " + id + ": \\{", "m"), id);
  }

  for (const id of blockedHubIds) {
    assert.doesNotMatch(registry, new RegExp('^    id: "' + id + '"', "m"), id);
    assert.doesNotMatch(runtime, new RegExp("^  " + id + ": \\{", "m"), id);
  }

  assert.match(defaultRoute, /destinationHubIds\.map\(\(city\) => \(\{ city \}\)\)/);
  assert.match(localizedRoute, /destinationHubIds\.map\(\(city\) => \(\{ locale, city \}\)\)/);
  assert.match(discovery, /destinationHubRegistry\.map\(\(hub, index\) =>/);
  assert.match(adapter, /destinationHubRegistry\.map\(\(hub\) =>/);
  assert.match(adapter, /status: "published"/);
  assert.match(adapter, /indexability: \{ index: true, follow: true \}/);
});

test("the internal ten-city graph separates Hub lifecycle from entity existence", async () => {
  const network = JSON.parse(
    await source(
      "docs/organic-growth/ten-city-entity-lifecycle-repair-20260821/entity-network.json",
    ),
  );
  const byCity = new Map(
    network.cityNetworks.map((city) => [city.cityId.replace(/^city-/u, ""), city]),
  );

  assert.equal(byCity.size, 10);
  for (const id of publishedHubIds.filter((id) => id !== "chongqing")) {
    assert.equal(byCity.get(id)?.hubLifecycle, "published", id);
  }
  assert.equal(
    byCity.get("chongqing")?.hubLifecycle,
    "docs-only",
    "the pre-release governance snapshot remains historical",
  );
  for (const id of ["guilin", "shenzhen"]) {
    assert.equal(byCity.get(id)?.hubLifecycle, "blocked", id);
  }

  assert.equal(network.pr74Release.sitemapLocBaseline, 649);
  assert.equal(
    network.employee8Integration.state,
    "unmerged-no-pull-request-as-checked-2026-08-21",
  );
  assert.equal(
    network.employee8Integration.mappingOwnerAfterMerge,
    "lib/searchPlatformGuidePolicy.ts",
  );
});

test("the lifecycle repair never treats the old content adapter as the mapping authority", async () => {
  const self = await source(
    "supabase/tests/ten-city-entity-lifecycle-repair-static.test.mjs",
  );

  assert.doesNotMatch(
    self,
    /source\("lib\/searchPlatformContentAdapter\.ts"\)/,
  );
  assert.match(self, /lib\/searchPlatformGuidePolicy\.ts/);
});
