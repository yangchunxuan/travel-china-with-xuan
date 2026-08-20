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
  assert.match(page, /titleSegments\.map\(\(segment, index\) =>/);
  assert.match(page, /className=\{styles\.keepTogether\}/);
  assert.match(styles, /\.keepTogether\s*\{[\s\S]*?white-space:\s*nowrap;/);
});

test("batch three hubs are trilingual release candidates with canonical boundaries", async () => {
  const [registry, runtime, hangzhouBody, zhangjiajieBody, readme] = await Promise.all([
    source("lib/destinationHubs.ts"),
    source("lib/destinationHubRuntime.ts"),
    source("content/destinations/hangzhou/body.shared.ts"),
    source("content/destinations/zhangjiajie/body.shared.ts"),
    source("docs/organic-growth/city-hub-drafts/README.md"),
  ]);

  for (const id of ["hangzhou", "zhangjiajie"]) {
    assert.match(registry, new RegExp(`id: "${id}"`));
    assert.match(
      registry,
      new RegExp(`id: "${id}",\\s*lifecycle: "release-candidate"`),
    );
    assert.match(registry, new RegExp(`entityId: "city-${id}"`));
    assert.match(runtime, new RegExp(`${id}: \\{[\\s\\S]*body\\.en[\\s\\S]*body\\.zh[\\s\\S]*body\\.ko`));
  }
  assert.equal(
    [...registry.matchAll(/lifecycle: "release-candidate",[\s\S]*?datePublished: null,/g)].length,
    2,
  );
  assert.match(runtime, /loadPublishedDestinationHubBody/);
  assert.match(registry, /sourceReviewedDate: "2026-08-20"/);
  assert.match(hangzhouBody, /No second generic Hangzhou travel guide should be created/);
  assert.match(zhangjiajieBody, /Do not copy that volatile workflow into this broad page/);
  assert.match(readme, /release candidates, not live pages/);
});

test("Gate B review does not automatically publish a destination Hub", async () => {
  const [registry, adapter] = await Promise.all([
    source("lib/destinationHubs.ts"),
    source("lib/destinationHubContentAdapter.ts"),
  ]);

  assert.equal([...registry.matchAll(/^    lifecycle: "published"/gm)].length, 5);
  assert.equal(
    [...registry.matchAll(/^    lifecycle: "release-candidate"/gm)].length,
    2,
  );
  assert.match(adapter, /const isPublished = hub\.lifecycle === "published"/);
  assert.match(adapter, /status: isPublished \? "published" : "review"/);
  assert.match(adapter, /index: false,[\s\S]*?follow: false,[\s\S]*?release-candidate-central-approval-required/);
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

test("batch two hubs are registered with reviewed support owners and 2026-08-17 dates", async () => {
  const registry = await source("lib/destinationHubs.ts");

  assert.match(registry, /id: "chengdu"/);
  assert.match(registry, /id: "guangzhou"/);
  assert.match(registry, /entityId: "city-chengdu"/);
  assert.match(registry, /entityId: "city-guangzhou"/);
  // The published and reviewed dates must be the real release date, not the
  // 2026-08-15 draft date carried over from the source packages.
  assert.doesNotMatch(registry, /sourceReviewedDate: "2026-08-15"/);
  assert.match(registry, /sourceReviewedDate: "2026-08-17"/);
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
