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
  assert.match(page, /titleSegments\.map\(\(segment, index\) =>/);
  assert.match(page, /className=\{styles\.keepTogether\}/);
  assert.match(styles, /\.keepTogether\s*\{[\s\S]*?white-space:\s*nowrap;/);
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
