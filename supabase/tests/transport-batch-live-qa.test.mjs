import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

const transportGuideIds = [
  "beijing-south-station-to-capital-or-daxing-airport",
  "beijing-to-badaling-great-wall-transfer",
  "beijing-to-mutianyu-great-wall-transfer",
  "chengdu-jiuzhaigou-transport-route",
  "guangzhou-hong-kong-transport-route",
  "guilin-yangshuo-transport-route",
  "hong-kong-macau-transport-route",
  "shanghai-hangzhou-transport-route",
  "shenzhen-hong-kong-transport-route",
  "xiamen-hubs-to-gulangyu-ferry-terminal",
];

async function guideBody(id, locale) {
  return source(`content/guides/${id}/body.${locale}.ts`);
}

test("transport guides retain the corrected current hubs and operating rules", async () => {
  const [badalingEn, badalingZh, badalingKo, xiamenEn, xiamenZh, xiamenKo] =
    await Promise.all([
      guideBody("beijing-to-badaling-great-wall-transfer", "en"),
      guideBody("beijing-to-badaling-great-wall-transfer", "zh"),
      guideBody("beijing-to-badaling-great-wall-transfer", "ko"),
      guideBody("xiamen-hubs-to-gulangyu-ferry-terminal", "en"),
      guideBody("xiamen-hubs-to-gulangyu-ferry-terminal", "zh"),
      guideBody("xiamen-hubs-to-gulangyu-ferry-terminal", "ko"),
    ]);

  assert.match(badalingEn, /S2 suburban rail currently starts at Nankou/);
  assert.match(badalingEn, /Bus 877 currently starts near Beitucheng/);
  assert.match(badalingZh, /S2市郊铁路目前从南口站始发/);
  assert.match(badalingZh, /877路公交目前从北土城/);
  assert.match(badalingKo, /S2 교외철도는 현재 난커우역에서 출발/);
  assert.match(badalingKo, /877번 버스는 현재 베이투청/);

  for (const body of [xiamenEn, xiamenZh, xiamenKo]) {
    assert.match(body, /15/);
    assert.match(body, /20/);
    assert.match(body, /10/);
  }
  assert.match(xiamenEn, /09:00/);
  assert.match(xiamenZh, /9:00/);
  assert.match(xiamenKo, /오전 9시/);
  assert.match(xiamenEn, /one free return within 20 days/);
  assert.match(xiamenZh, /20天内.*免费返程/);
  assert.match(xiamenKo, /20일 안에.*무료 귀환 1회/);
});

test("transport guides keep station, ferry and scenic-area corrections aligned", async () => {
  const [guilinSources, macauZh, macauKo, macauLog, hangzhouEn, hangzhouZh, hangzhouKo] =
    await Promise.all([
      guideBody("guilin-yangshuo-transport-route", "en"),
      guideBody("hong-kong-macau-transport-route", "zh"),
      guideBody("hong-kong-macau-transport-route", "ko"),
      source("content/guides/hong-kong-macau-transport-route/source-log.md"),
      guideBody("shanghai-hangzhou-transport-route", "en"),
      guideBody("shanghai-hangzhou-transport-route", "zh"),
      guideBody("shanghai-hangzhou-transport-route", "ko"),
    ]);

  assert.doesNotMatch(guilinSources, /m\.qlgl\.gov\.cn/);
  assert.match(guilinSources, /dnr\.gxzf\.gov\.cn\/villageNews\/show\/450321\?id=1240/);

  assert.match(macauZh, /轮渡、穿梭巴士或跨境巴士/);
  assert.match(macauKo, /페리, 셔틀버스 또는 국경 간 버스/);
  assert.doesNotMatch(macauZh, /口岸巴士或直通车|直通车站点改变/);
  assert.doesNotMatch(macauKo, /출경|직행버스/);
  assert.match(macauLog, /HZMB shuttle bus and licensed cross-boundary coach/);
  assert.doesNotMatch(macauLog, /port shuttle|licensed through coach/);

  assert.match(hangzhouEn, /Hangzhou South/);
  assert.match(hangzhouZh, /杭州南/);
  assert.match(hangzhouKo, /항저우남/);

  const jiuzhaigou = JSON.parse(
    await source("content/guides/chengdu-jiuzhaigou-transport-route/metadata.json"),
  );
  assert.equal(
    jiuzhaigou.locales.en.headline,
    "Chengdu to Jiuzhaigou: The Train Stops Before the Scenic Area",
  );
  assert.equal(jiuzhaigou.locales.zh.headline, "成都到九寨沟：火车不能直达景区入口");
  assert.equal(
    jiuzhaigou.locales.ko.headline,
    "청두에서 주자이거우까지: 열차만으로는 관광지 입구까지 갈 수 없습니다",
  );
});

test("transport guide copy does not regress to the audited internal jargon", async () => {
  const bodies = await Promise.all(
    transportGuideIds.flatMap((id) =>
      ["en", "zh", "ko"].map((locale) => guideBody(id, locale)),
    ),
  );
  const visibleCopy = bodies.join("\n");

  assert.doesNotMatch(
    visibleCopy,
    /five clocks|五只时钟|not two single pins|不是两个单一定位|luggage chain|行李链|stress-tested|压力测试|\bfriction\b|摩擦|separate chain|sensible recovery|검문소|출경/iu,
  );

  const [airportMetadata, mutianyuMetadata] = await Promise.all([
    source("content/guides/beijing-south-station-to-capital-or-daxing-airport/metadata.json"),
    source("content/guides/beijing-to-mutianyu-great-wall-transfer/metadata.json"),
  ]).then((items) => items.map((item) => JSON.parse(item)));

  assert.equal(
    airportMetadata.locales.en.title,
    "Beijing South to PEK or PKX: Transfer Guide",
  );
  assert.equal(
    mutianyuMetadata.locales.en.title,
    "Beijing to Mutianyu: Transport Options",
  );
});
