import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

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

const hubLifecycles = {
  "city-beijing": "published",
  "city-shanghai": "published",
  "city-xian": "published",
  "city-chengdu": "published",
  "city-guangzhou": "published",
  "city-hangzhou": "release-candidate",
  "city-zhangjiajie": "release-candidate",
  "city-chongqing": "docs-only",
  "city-guilin": "blocked",
  "city-shenzhen": "blocked",
};

const gatewayNodes = {
  "city-beijing": ["airport-pek", "airport-pkx", "station-beijing-south", "station-beijing-west", "station-beijing-chaoyang"],
  "city-shanghai": ["airport-shanghai-pudong-pvg", "airport-shanghai-hongqiao-sha", "station-shanghai-hongqiao-railway", "station-shanghai-railway", "station-shanghai-south-railway", "station-shanghai-songjiang-railway"],
  "city-xian": ["airport-xiy", "station-xian-north", "station-xian", "station-xian-east"],
  "city-chengdu": ["airport-chengdu-tianfu", "airport-chengdu-shuangliu", "station-chengdu-east", "station-chengdu-south", "station-chengdu-west"],
  "city-guangzhou": ["airport-guangzhou-baiyun", "station-guangzhou", "station-guangzhou-east", "station-guangzhou-south", "station-guangzhou-baiyun", "station-guangzhou-north"],
  "city-hangzhou": ["airport-hangzhou-xiaoshan-hgh", "station-hangzhou", "station-hangzhou-east", "station-hangzhou-west", "station-hangzhou-south"],
  "city-zhangjiajie": ["airport-zhangjiajie-hehua-dyg", "station-zhangjiajie-west", "station-zhangjiajie"],
  "city-chongqing": ["airport-chongqing-jiangbei-ckg", "rail-station-chongqing-north", "rail-station-chongqing-west", "rail-station-chongqing-east", "rail-station-shapingba"],
  "city-guilin": ["airport-guilin-liangjiang-kwl", "station-guilin", "station-guilin-north", "station-guilin-west", "station-yangshuo", "port-mopanshan", "port-zhujiang"],
  "city-shenzhen": ["airport-szx", "rail-station-shenzhen-north", "rail-station-futian", "rail-station-shenzhen", "rail-station-shenzhen-east", "checkpoint-luohu", "checkpoint-futian", "checkpoint-huanggang"],
};

const kebabId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

test("the ten cities have one canonical administrative chain and explicit Hub state", async () => {
  const records = JSON.parse(await source("content/entities/core-places.json"));
  const entities = records.map((record) => record.data);
  const ids = entities.map((entity) => entity.id);

  assert.equal(new Set(ids).size, ids.length, "entity IDs must be unique");

  const byId = new Map(entities.map((entity) => [entity.id, entity]));
  for (const [cityId, parentId] of Object.entries(cityParents)) {
    const city = byId.get(cityId);
    assert.ok(city, cityId);
    assert.deepEqual(city.parentEntityIds, [parentId], cityId);
    assert.equal(
      city.attributes?.destinationHubLifecycle,
      hubLifecycles[cityId],
      `${cityId} lifecycle`,
    );
  }

  for (const provinceId of [
    "province-shaanxi",
    "province-sichuan",
    "province-guangdong",
    "province-hunan",
    "province-zhejiang",
    "province-guangxi",
  ]) {
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
    );
  }
});

test("every destination token resolves to its city instead of silently becoming China-only", async () => {
  const adapter = await source("lib/searchPlatformContentAdapter.ts");
  for (const cityId of Object.keys(cityParents)) {
    const token = cityId.replace(/^city-/, "");
    assert.match(
      adapter,
      new RegExp(`\\b${token}: "${cityId}"`),
      `${token} destination mapping`,
    );
  }
});

test("the internal graph gives every city the full Hub relationship contract", async () => {
  const network = JSON.parse(
    await source(
      "docs/organic-growth/ten-city-entity-network-20260820/entity-network.json",
    ),
  );
  const cities = network.cityNetworks;

  assert.equal(cities.length, 10);
  assert.equal(new Set(cities.map((city) => city.cityId)).size, 10);
  assert.equal(network.planningNodeSemantics.arrayItemsAreInlineDefinitions, true);
  assert.equal(network.planningNodeSemantics.runtimeEntityReferences, false);
  assert.ok(network.requiredRelationshipTypes.every((type) => kebabId.test(type)));
  assert.ok(
    Object.values(network.planningNodeSemantics.edgeByField.entrypoints).every(
      (type) => network.requiredRelationshipTypes.includes(type),
    ),
  );

  const planningHosts = network.planningHostCrosswalk;
  assert.equal(
    new Set(planningHosts.map((host) => host.id)).size,
    planningHosts.length,
    "planning host IDs must be unique",
  );
  for (const host of planningHosts) {
    assert.match(host.id, kebabId);
    assert.match(host.hostKind, kebabId);
    assert.ok(host.administrativeContext.length > 10);
    assert.equal(host.runtimeStatus, "planning-only");
  }
  const allowedHostIds = new Set([
    ...cities.map((city) => city.cityId),
    ...planningHosts.map((host) => host.id),
  ]);

  for (const city of cities) {
    assert.equal(city.administrativeParentId, cityParents[city.cityId]);
    assert.equal(city.hubLifecycle, hubLifecycles[city.cityId]);
    assert.ok(city.audienceDecision.length > 40, `${city.cityId} audience`);
    assert.ok(city.firstTripNights.length > 30, `${city.cityId} nights`);
    assert.deepEqual(city.gatewayNodes, gatewayNodes[city.cityId]);
    for (const field of [
      "attractionClusters",
      "gatewayNodes",
      "stayAreas",
      "routePairs",
      "faqTopics",
    ]) {
      assert.ok(Array.isArray(city[field]) && city[field].length > 0, `${city.cityId} ${field}`);
      assert.ok(city[field].every((id) => kebabId.test(id)), `${city.cityId} ${field} IDs`);
      assert.equal(new Set(city[field]).size, city[field].length, `${city.cityId} ${field} duplicates`);
    }
    assert.ok(Array.isArray(city.outerBranches) && city.outerBranches.length > 0, `${city.cityId} outer branches`);
    for (const branch of city.outerBranches) {
      assert.match(branch.planningNodeId, kebabId);
      assert.match(branch.administrativeHostId, kebabId);
      assert.match(branch.planningRelation, kebabId);
      assert.ok(
        allowedHostIds.has(branch.administrativeHostId),
        `${city.cityId} unknown administrative host ${branch.administrativeHostId}`,
      );
      if (branch.locationHandleId) assert.match(branch.locationHandleId, kebabId);
    }
    assert.equal(typeof city.entrypoints?.planning, "string", `${city.cityId} planning entry`);
  }

  const byCity = new Map(cities.map((city) => [city.cityId, city]));
  assert.ok(byCity.get("city-zhangjiajie").routePairs.includes("chongqing-zhangjiajie"));
  assert.ok(byCity.get("city-chongqing").routePairs.includes("chongqing-zhangjiajie"));
  assert.ok(!JSON.stringify(network).includes("zhangjiajie-chongqing"));

  assert.equal(byCity.get("city-shanghai").entrypoints.ticketOwner, null);
  assert.equal(
    byCity.get("city-shanghai").entrypoints.gatewayOwner,
    "pudong-airport-to-shanghai-disneyland",
  );
  assert.equal(byCity.get("city-chengdu").entrypoints.hotelOwner, null);
  assert.equal(byCity.get("city-guangzhou").entrypoints.ticketOwner, null);
  assert.equal(
    byCity.get("city-guangzhou").entrypoints.gatewayOwner,
    "guangzhou-baiyun-airport-t2-t3",
  );
  assert.equal(
    byCity.get("city-shenzhen").outerBranches[0].locationHandleId,
    "area-dapeng-peninsula",
  );
});
