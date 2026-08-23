import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

test("destination hubs keep the Chinese guide phrase together on narrow screens", async () => {
  const [page, styles] = await Promise.all([
    source("components/content/DestinationHubPage.tsx"),
    source("components/content/EditorialGuidePage.module.css"),
  ]);

  assert.match(page, /beijing: \["北京旅行指南：", "先分配", "完整的一天，", "再安排景点"\]/);
  assert.match(page, /shanghai: \["上海旅行指南：", "先算", "完整游览日，", "再决定", "住哪一岸"\]/);
  assert.match(page, /xian: \["西安旅行指南：", "住几晚、", "以哪里为基地、", "下一站去哪"\]/);
  assert.match(page, /hangzhou: \["杭州旅行指南：", "先决定一日往返，", "还是把杭州真正住下来"\]/);
  assert.match(page, /zhangjiajie: \["张家界旅行指南：", "先分清市区、", "武陵源和不同山岳系统"\]/);
  assert.match(page, /chongqing: \["重庆旅行指南：", "选对住宿基地、", "车站和停留晚数"\]/);
  assert.match(page, /titleSegments\.map\(\(segment, index\) =>/);
  assert.match(page, /className=\{styles\.keepTogether\}/);
  assert.match(styles, /\.keepTogether\s*\{[\s\S]*?white-space:\s*nowrap;/);
});

test("Chongqing is one trilingual canonical Hub with verified owners and dynamic boundaries", async () => {
  const [registry, runtime, en, zh, ko, exportCheck] = await Promise.all([
    source("lib/destinationHubs.ts"),
    source("lib/destinationHubRuntime.ts"),
    source("content/destinations/chongqing/body.en.ts"),
    source("content/destinations/chongqing/body.zh.ts"),
    source("content/destinations/chongqing/body.ko.ts"),
    source("tools/check-search-platform-export.mjs"),
  ]);

  assert.match(registry, /id: "chongqing"[\s\S]*?entityId: "city-chongqing"/);
  for (const owner of [
    "chongqing-upper-lower-city-orientation",
    "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
    "china-tiankeng-sinkholes-explained",
    "sichuan-opera-face-changing-with-context",
    "chongqing-railway-station-selector",
  ]) {
    assert.match(registry, new RegExp(`"${owner}"`), owner);
  }
  assert.match(runtime, /chongqing: \{[\s\S]*?chongqing\/body\.en[\s\S]*?chongqing\/body\.zh[\s\S]*?chongqing\/body\.ko/);
  assert.match(exportCheck, /publishedDestinationHubIds = \[[\s\S]*?"chongqing"/);
  assert.doesNotMatch(exportCheck, /blockedDestinationHubIds = \[[^\]]*"chongqing"/);

  for (const body of [en, zh, ko]) {
    assert.match(body, /id: "canonical-owner-links"|"id": "canonical-owner-links"/);
    assert.match(body, /id: "stay-quote-handoff"|"id": "stay-quote-handoff"/);
    assert.match(body, /id: "official-sources"|"id": "official-sources"/);
    assert.match(body, /\/destinations\/chongqing\/|\/zh\/destinations\/chongqing\/|\/ko\/destinations\/chongqing\//);
    assert.doesNotMatch(body, /planned Dazu Shike|规划中的大足石刻高铁站|계획 중인 다쭈스커/u);
  }
  assert.match(en, /Since 23 December 2025/);
  assert.match(zh, /自2025年12月23日起/);
  assert.match(ko, /2025년 12월 23일부터/);
});

test("batch three hubs are trilingual published pages with canonical boundaries", async () => {
  const [registry, runtime, adapter, hangzhouBody, zhangjiajieBody, readme] = await Promise.all([
    source("lib/destinationHubs.ts"),
    source("lib/destinationHubRuntime.ts"),
    source("lib/destinationHubContentAdapter.ts"),
    source("content/destinations/hangzhou/body.shared.ts"),
    source("content/destinations/zhangjiajie/body.shared.ts"),
    source("docs/organic-growth/city-hub-drafts/README.md"),
  ]);

  const expectedDates = {
    hangzhou: { modified: "2026-08-23", reviewed: "2026-08-20" },
    zhangjiajie: { modified: "2026-08-23", reviewed: "2026-08-20" },
  };
  for (const [id, dates] of Object.entries(expectedDates)) {
    assert.match(registry, new RegExp(`id: "${id}"`));
    assert.match(registry, new RegExp(`entityId: "city-${id}"`));
    const entryStart = registry.indexOf(`id: "${id}"`);
    assert.notEqual(entryStart, -1);
    const entryHeader = registry.slice(entryStart, entryStart + 700);
    assert.match(entryHeader, /datePublished: "2026-08-20"/);
    assert.match(entryHeader, new RegExp(`dateModified: "${dates.modified}"`));
    assert.match(entryHeader, new RegExp(`sourceReviewedDate: "${dates.reviewed}"`));
    assert.match(runtime, new RegExp(`${id}: \\{[\\s\\S]*body\\.en[\\s\\S]*body\\.zh[\\s\\S]*body\\.ko`));
  }
  assert.equal(
    [...registry.matchAll(/datePublished: "2026-08-20"/g)].length,
    2,
    "Hangzhou and Zhangjiajie retain their real publication date",
  );
  assert.match(adapter, /status: "published"/);
  assert.match(adapter, /indexability: \{ index: true, follow: true \}/);
  assert.match(
    hangzhouBody,
    /Use this as the overview rather than looking for a second generic Hangzhou travel guide/,
  );
  assert.match(
    zhangjiajieBody,
    /Use that detailed guide for this volatile workflow/,
  );
  assert.match(readme, /Batch three published \(August 20, 2026\): PR #74/);
  assert.match(readme, /five trilingual identities are now live/);
  assert.ok(readme.includes("649 `<loc>` entries"));
  assert.doesNotMatch(readme, /release candidates, not live pages/);
});

test("Shanghai Songjiang copy records both the rename and expanded-hub opening", async () => {
  const paths = [
    "content/destinations/shanghai/body.en.ts",
    "content/destinations/shanghai/body.zh.ts",
    "content/destinations/shanghai/body.ko.ts",
  ];
  const bodies = await Promise.all(paths.map(source));

  for (const [index, body] of bodies.entries()) {
    assert.match(
      body,
      /https:\/\/www\.shanghai\.gov\.cn\/xbhygq\/20240514\/45ef2426bf66467d96a2a2927cf53579\.html/,
      paths[index],
    );
    assert.match(
      body,
      /https:\/\/www\.shanghai\.gov\.cn\/nw4411\/20241227\/bc93ea86a3df41a3aa418d7cf7b283bb\.html/,
      paths[index],
    );
  }

  assert.match(bodies[0], /renamed Shanghai Songjiang in May 2024/);
  assert.match(bodies[1], /2024 年 5 月更名为上海松江站/);
  assert.match(bodies[2], /2024년 5월 상하이쑹장역으로 이름이 바뀌었고/);
});

test("batch two hubs keep the Chinese guide phrase together on narrow screens", async () => {
  const page = await source("components/content/DestinationHubPage.tsx");

  assert.match(page, /chengdu: \["成都旅行指南：", "先把城市", "住稳，", "再搭四川路线"\]/);
  assert.match(page, /guangzhou: \["广州旅行指南：", "住几晚、", "住哪个区、", "走哪个门户"\]/);
});

test("batch two hubs keep their own truthful publication and review dates", async () => {
  const registry = await source("lib/destinationHubs.ts");

  assert.match(registry, /id: "chengdu"/);
  assert.match(registry, /id: "guangzhou"/);
  assert.match(registry, /entityId: "city-chengdu"/);
  assert.match(registry, /entityId: "city-guangzhou"/);
  const chengduHeader = registry.slice(
    registry.indexOf('id: "chengdu"'),
    registry.indexOf('id: "guangzhou"'),
  );
  const guangzhouHeader = registry.slice(
    registry.indexOf('id: "guangzhou"'),
    registry.indexOf('id: "hangzhou"'),
  );
  assert.match(chengduHeader, /datePublished: "2026-08-17"/);
  assert.match(chengduHeader, /dateModified: "2026-08-23"/);
  assert.match(chengduHeader, /sourceReviewedDate: "2026-08-22"/);
  assert.match(guangzhouHeader, /datePublished: "2026-08-17"/);
  assert.match(guangzhouHeader, /dateModified: "2026-08-23"/);
  assert.match(guangzhouHeader, /sourceReviewedDate: "2026-08-17"/);
  assert.doesNotMatch(registry, /sourceReviewedDate: "2026-08-15"/);
});

test("Guangzhou hub states the closed T1 and the January 2026 station swap in all three locales", async () => {
  const paths = [
    "content/destinations/guangzhou/body.en.ts",
    "content/destinations/guangzhou/body.zh.ts",
    "content/destinations/guangzhou/body.ko.ts",
  ];
  const bodies = await Promise.all(paths.map(source));

  for (const [index, body] of bodies.entries()) {
    // Both government sources must remain attached to the volatile claims.
    assert.match(
      body,
      /https:\/\/www\.eguangzhou\.gov\.cn\/gzlatest\/content\/post_43024\.html/,
      paths[index],
    );
    assert.match(
      body,
      /https:\/\/www\.gz\.gov\.cn\/zwfw\/zxfw\/jtfw\/content\/post_10648700\.html/,
      paths[index],
    );
    // T3 has no direct metro; the page must not promise one.
    assert.doesNotMatch(body, /direct metro station at T3|T3 直连地铁|T3 직결 지하철역이 있/u, paths[index]);
  }

  assert.match(bodies[0], /ceased passenger operations for an upgrade/);
  assert.match(bodies[1], /停止客运并进入改造/);
  assert.match(bodies[2], /여객 운영을 중단했습니다/);
});

test("Chengdu hub refuses to treat the closed central station as usable", async () => {
  const paths = [
    "content/destinations/chengdu/body.en.ts",
    "content/destinations/chengdu/body.zh.ts",
    "content/destinations/chengdu/body.ko.ts",
  ];
  const bodies = await Promise.all(paths.map(source));

  assert.match(bodies[0], /Closed for reconstruction/);
  assert.match(bodies[1], /改扩建中，未办理客运/);
  assert.match(bodies[2], /재건축으로 여객 취급 중단/);
});
