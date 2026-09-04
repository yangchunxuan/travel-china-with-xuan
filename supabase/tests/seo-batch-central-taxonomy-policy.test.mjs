import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { getGuideCollectionId } from "../../lib/searchCollectionI18n.ts";
import {
  destinationEntityIds,
  guideUpdatePolicy,
  guideUpdatePolicyOverrides,
  resolveGuideEntities,
} from "../../lib/searchPlatformGuidePolicy.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const guideRoot = path.join(projectRoot, "content/guides");

const reviewedBatch = {
  "animal-bite-rabies-exposure-china": ["essentials-entry-transit", "critical", "on-source-change"],
  "beijing-datong-pingyao-xian-route-order": ["plan-trip-length-city-order", "high", "on-source-change"],
  "beijing-peking-opera-first-performance": ["culture-festivals-arts-contemporary", "high", "on-source-change"],
  "beijing-xian-guilin-shanghai-route-order": ["plan-trip-length-city-order", "high", "on-source-change"],
  "beijing-xian-shanghai-route-order": ["plan-trip-length-city-order", "high", "on-source-change"],
  "bringing-dog-or-cat-into-china": ["essentials-entry-transit", "critical", "on-source-change"],
  "bringing-prescription-medicine-into-china": ["essentials-entry-transit", "critical", "on-source-change"],
  "canton-fair-pazhou-tianhe-yuexiu-hotel-base": ["stay-city-areas", "critical", "every-session"],
  "chengdu-wuhou-shrine-reading-route": ["culture-history-people-ideas", "high", "on-source-change"],
  "china-hub-and-spoke-or-multi-base-route": ["plan-trip-length-city-order", "high", "on-source-change"],
  "china-itinerary-booking-dependency-order": ["plan-budget-pace-decisions", "critical", "on-source-change"],
  "china-national-silk-museum-cocoon-to-conservation-route": ["culture-history-people-ideas", "high", "on-source-change"],
  "china-severe-weather-warning-trip-recovery": ["essentials-booking-registration-recovery", "critical", "on-source-change"],
  "china-tourist-temporary-driving-permit": ["essentials-booking-registration-recovery", "critical", "on-source-change"],
  "chongqing-hotpot-first-order": ["culture-regional-food", "high", "on-source-change"],
  "daocheng-yading-village-or-shangri-la-town-hotel-base": ["stay-hotel-types-scenic-bases", "critical", "on-source-change"],
  "dapeng-fortress-jiaochangwei-day-trip-decision": ["explore-cities-neighborhoods", "high", "on-source-change"],
  "downtown-dunhuang-or-mingsha-mountain-hotel-base": ["stay-city-areas", "high", "on-source-change"],
  "dujiangyan-qingcheng-mountain-same-day-or-separate": ["explore-attractions-nature-heritage", "high", "on-source-change"],
  "hangzhou-tea-villages-and-museum-selector": ["explore-attractions-nature-heritage", "high", "on-source-change"],
  "jiuzhaigou-entrance-or-huanglongjiuzhai-station-hotel-base": ["stay-hotel-types-scenic-bases", "critical", "on-source-change"],
  "li-river-cruise-or-yulong-river-raft": ["explore-attractions-nature-heritage", "high", "on-source-change"],
  "medical-emergency-in-china-for-travellers": ["essentials-booking-registration-recovery", "critical", "on-source-change"],
  "nanjing-purple-mountain-route": ["explore-attractions-nature-heritage", "high", "on-source-change"],
  "quanzhou-old-city-maritime-heritage-walk": ["explore-cities-neighborhoods", "high", "on-source-change"],
  "shanghai-hangzhou-huangshan-route-order": ["plan-trip-length-city-order", "high", "on-source-change"],
  "wuzhen-west-scenic-area-inside-or-outside-hotel-base": ["stay-hotel-types-scenic-bases", "high", "on-source-change"],
  "xian-or-huayin-mount-hua-hotel-base": ["stay-hotel-types-scenic-bases", "critical", "on-source-change"],
  "xian-yangrou-paomo-first-bowl": ["culture-regional-food", "medium", "quarterly"],
  "yunnan-wild-mushroom-hotpot-safe-ordering": ["culture-regional-food", "critical", "on-source-change"],
};

const reviewedPrimaryEntities = {
  "animal-bite-rabies-exposure-china": "country-china",
  "beijing-datong-pingyao-xian-route-order": "country-china",
  "beijing-peking-opera-first-performance": "culture-topic-peking-opera",
  "beijing-xian-guilin-shanghai-route-order": "country-china",
  "beijing-xian-shanghai-route-order": "country-china",
  "bringing-dog-or-cat-into-china": "country-china",
  "bringing-prescription-medicine-into-china": "country-china",
  "canton-fair-pazhou-tianhe-yuexiu-hotel-base": "venue-canton-fair-complex",
  "chengdu-wuhou-shrine-reading-route": "attraction-wuhou-shrine",
  "china-hub-and-spoke-or-multi-base-route": "country-china",
  "china-itinerary-booking-dependency-order": "country-china",
  "china-national-silk-museum-cocoon-to-conservation-route": "organization-china-national-silk-museum",
  "china-severe-weather-warning-trip-recovery": "country-china",
  "china-tourist-temporary-driving-permit": "country-china",
  "chongqing-hotpot-first-order": "dish-chongqing-hotpot",
  "daocheng-yading-village-or-shangri-la-town-hotel-base": "attraction-daocheng-yading",
  "dapeng-fortress-jiaochangwei-day-trip-decision": "district-dapeng-new-district",
  "downtown-dunhuang-or-mingsha-mountain-hotel-base": "city-dunhuang",
  "dujiangyan-qingcheng-mountain-same-day-or-separate": "city-dujiangyan",
  "hangzhou-tea-villages-and-museum-selector": "city-hangzhou",
  "jiuzhaigou-entrance-or-huanglongjiuzhai-station-hotel-base": "attraction-jiuzhaigou",
  "li-river-cruise-or-yulong-river-raft": "natural-feature-li-river",
  "medical-emergency-in-china-for-travellers": "country-china",
  "nanjing-purple-mountain-route": "attraction-zhongshan-scenic-area",
  "quanzhou-old-city-maritime-heritage-walk": "neighborhood-quanzhou-old-city",
  "shanghai-hangzhou-huangshan-route-order": "country-china",
  "wuzhen-west-scenic-area-inside-or-outside-hotel-base": "attraction-wuzhen-west-scenic-area",
  "xian-or-huayin-mount-hua-hotel-base": "natural-feature-huashan",
  "xian-yangrou-paomo-first-bowl": "dish-yangrou-paomo",
  "yunnan-wild-mushroom-hotpot-safe-ordering": "dish-yunnan-wild-mushroom-hotpot",
};

async function metadataFor(id) {
  return JSON.parse(await readFile(path.join(guideRoot, id, "metadata.json"), "utf8"));
}

test("the central 30-identity batch has exact collection and runtime freshness decisions", async () => {
  assert.equal(Object.keys(reviewedBatch).length, 30);
  assert.equal(Object.keys(guideUpdatePolicyOverrides).length, 30);

  for (const [id, [collectionId, volatility, refreshCadence]] of Object.entries(reviewedBatch)) {
    const metadata = await metadataFor(id);
    assert.equal(metadata.primaryCollectionId, collectionId, `${id} metadata collection`);
    assert.equal(
      getGuideCollectionId(metadata),
      metadata.primaryCollectionId,
      `${id} runtime collection must equal governed metadata`,
    );
    assert.equal(metadata.freshnessClass, volatility, `${id} metadata freshness`);
    assert.deepEqual(guideUpdatePolicy(metadata), {
      volatility,
      refreshCadence,
      owner: "homeground-editorial",
    }, `${id} update policy`);
  }
});

test("candidate governance uses unique registered entities with valid parentage", async () => {
  const records = JSON.parse(await readFile(
    path.join(projectRoot, "content/entities/core-places.json"),
    "utf8",
  ));
  const byId = new Map(records.map((record) => [record.data.id, record.data]));
  assert.equal(byId.size, records.length, "entity ids must be unique");

  const allowedEntityTypes = new Set([
    "country",
    "province",
    "prefecture",
    "city",
    "district",
    "county",
    "town",
    "village",
    "neighborhood",
    "natural-feature",
    "attraction",
    "heritage-site",
    "transport-node",
    "organization",
    "culture-topic",
    "dish",
    "practical-topic",
  ]);
  const allowedStatuses = new Set([
    "draft",
    "research",
    "review",
    "published",
    "stale",
    "archived",
  ]);

  for (const record of records) {
    assert.equal(record.schemaVersion, "1.0.0", `${record.data.id} schema version`);
    assert.equal(record.recordType, "entity", `${record.data.id} record type`);
    const entity = record.data;
    assert.ok(allowedEntityTypes.has(entity.entityType), `${entity.id} entity type`);
    assert.ok(allowedStatuses.has(entity.status), `${entity.id} status`);
    assert.ok(Array.isArray(entity.sourceIds), `${entity.id} sourceIds`);
    for (const locale of ["en", "zh-Hans", "ko"]) {
      assert.equal(
        typeof entity.names?.[locale]?.name,
        "string",
        `${entity.id} ${locale} name`,
      );
      assert.notEqual(entity.names[locale].name.trim(), "", `${entity.id} ${locale} name`);
    }
    for (const parentId of entity.parentEntityIds ?? []) {
      assert.ok(byId.has(parentId), `${entity.id} has unknown parent ${parentId}`);
      assert.notEqual(parentId, entity.id, `${entity.id} cannot parent itself`);
    }
  }

  const visited = new Set();
  const visiting = new Set();
  function visit(entityId) {
    assert.equal(visiting.has(entityId), false, `entity parent cycle at ${entityId}`);
    if (visited.has(entityId)) return;
    visiting.add(entityId);
    for (const parentId of byId.get(entityId).parentEntityIds ?? []) visit(parentId);
    visiting.delete(entityId);
    visited.add(entityId);
  }
  for (const entityId of byId.keys()) visit(entityId);

  for (const id of Object.keys(reviewedBatch)) {
    const metadata = await metadataFor(id);
    const governedIds = [metadata.primaryEntityId, ...metadata.secondaryEntityIds];
    assert.equal(new Set(governedIds).size, governedIds.length, `${id} governed entities`);
    for (const entityId of governedIds) {
      assert.ok(byId.has(entityId), `${id} references unregistered ${entityId}`);
    }
  }
  for (const [id, primaryEntityId] of Object.entries(reviewedPrimaryEntities)) {
    const metadata = await metadataFor(id);
    assert.equal(metadata.primaryEntityId, primaryEntityId, `${id} primary entity`);
  }
  assert.deepEqual(
    Object.keys(reviewedPrimaryEntities).sort(),
    Object.keys(reviewedBatch).sort(),
    "every reviewed candidate must have an exact primary owner assertion",
  );

  const exactParents = {
    "city-nanjing": ["province-jiangsu"],
    "city-quanzhou": ["province-fujian"],
    "city-kunming": ["province-yunnan"],
    "city-datong": ["province-shanxi"],
    "county-pingyao": ["city-jinzhong"],
    "county-yangshuo": ["city-guilin"],
    "city-huangshan": ["province-anhui"],
    "natural-feature-huangshan": ["city-huangshan"],
    "county-daocheng": ["prefecture-ganzi"],
    "town-shangri-la-daocheng": ["county-daocheng"],
    "village-yading": ["town-shangri-la-daocheng"],
    "attraction-daocheng-yading": ["county-daocheng"],
    "county-jiuzhaigou": ["prefecture-aba"],
    "town-zhangzha": ["county-jiuzhaigou"],
    "attraction-jiuzhaigou": ["county-jiuzhaigou"],
    "county-songpan": ["prefecture-aba"],
    "town-chuanzhusi": ["county-songpan"],
    "transport-node-huanglongjiuzhai-station": ["town-chuanzhusi"],
    "city-huayin": ["city-weinan"],
    "natural-feature-huashan": ["city-huayin"],
    "city-tongxiang": ["city-jiaxing"],
    "town-wuzhen": ["city-tongxiang"],
    "city-dunhuang": ["city-jiuquan"],
    "city-dujiangyan": ["city-chengdu"],
    "natural-feature-qingcheng-mountain": ["city-dujiangyan"],
    "heritage-site-dujiangyan-irrigation-system": ["city-dujiangyan"],
    "culture-topic-peking-opera": ["country-china"],
    "attraction-wuhou-shrine": ["city-chengdu"],
    "district-dapeng-new-district": ["city-shenzhen"],
    "heritage-site-dapeng-fortress": ["district-dapeng-new-district"],
    "village-jiaochangwei": ["district-dapeng-new-district"],
    "district-xihu-hangzhou": ["city-hangzhou"],
    "village-longjing-hangzhou": ["district-xihu-hangzhou"],
    "village-meijiawu-hangzhou": ["district-xihu-hangzhou"],
    "organization-china-national-tea-museum": ["city-hangzhou"],
    "attraction-tea-museum-shuangfeng-campus": ["district-xihu-hangzhou"],
    "attraction-tea-museum-longjing-campus": ["district-xihu-hangzhou"],
    "district-licheng-quanzhou": ["city-quanzhou"],
    "neighborhood-quanzhou-old-city": ["district-licheng-quanzhou"],
    "heritage-site-kaiyuan-temple-quanzhou": ["neighborhood-quanzhou-old-city"],
    "heritage-site-qingjing-mosque-quanzhou": ["neighborhood-quanzhou-old-city"],
    "heritage-site-deji-gate-quanzhou": ["neighborhood-quanzhou-old-city"],
    "heritage-site-tianhou-temple-quanzhou": ["neighborhood-quanzhou-old-city"],
    "neighborhood-west-street-quanzhou": ["neighborhood-quanzhou-old-city"],
    "dish-chongqing-hotpot": ["city-chongqing"],
    "dish-yangrou-paomo": ["city-xian"],
    "dish-yunnan-wild-mushroom-hotpot": ["province-yunnan"],
    "practical-topic-wild-mushroom-food-safety": [],
    "organization-china-national-silk-museum": ["city-hangzhou"],
    "culture-topic-silk": [],
    "attraction-zhongshan-scenic-area": ["city-nanjing"],
    "heritage-site-ming-xiaoling": ["attraction-zhongshan-scenic-area"],
    "attraction-sun-yat-sen-mausoleum": ["attraction-zhongshan-scenic-area"],
    "attraction-linggu-scenic-area": ["attraction-zhongshan-scenic-area"],
  };
  for (const [entityId, parentIds] of Object.entries(exactParents)) {
    assert.deepEqual(
      byId.get(entityId)?.parentEntityIds ?? [],
      parentIds,
      `${entityId} parents`,
    );
  }

  const frozenLegacyDestinationEntityIds = {
    china: "country-china",
    beijing: "city-beijing",
    xian: "city-xian",
    zhangjiajie: "city-zhangjiajie",
    shanghai: "city-shanghai",
    chengdu: "city-chengdu",
    guilin: "city-guilin",
    guangzhou: "city-guangzhou",
    hangzhou: "city-hangzhou",
    chongqing: "city-chongqing",
    shenzhen: "city-shenzhen",
  };
  assert.deepEqual(
    destinationEntityIds,
    frozenLegacyDestinationEntityIds,
    "pending candidates must not expand published legacy entity resolution",
  );
  for (const entityId of Object.values(destinationEntityIds)) {
    assert.ok(byId.has(entityId), `legacy token maps to unregistered ${entityId}`);
  }

  const pandaMetadata = await metadataFor("chengdu-panda-base-or-dujiangyan-panda-valley");
  assert.deepEqual(resolveGuideEntities(pandaMetadata.destinations), {
    entityIds: ["city-chengdu"],
    unmappedTokens: ["dujiangyan", "sichuan"],
    usedCountryFallback: false,
  }, "published Chengdu panda assignment must not expand through pending entities");
  const lijiangMetadata = await metadataFor("lijiang-old-town-or-shuhe-where-to-stay");
  assert.deepEqual(resolveGuideEntities(lijiangMetadata.destinations), {
    entityIds: ["country-china"],
    unmappedTokens: ["lijiang", "dayan", "shuhe", "yunnan"],
    usedCountryFallback: true,
  }, "published Lijiang assignment must retain its frozen country fallback");
});
