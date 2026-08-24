import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

test("destination hubs keep each Chinese city name together on narrow screens", async () => {
  const [page, styles] = await Promise.all([
    source("components/content/DestinationHubPage.tsx"),
    source("components/content/EditorialGuidePage.module.css"),
  ]);

  assert.match(page, /beijing: \["北京：", "先分配", "完整的一天，", "再安排景点"\]/);
  assert.match(page, /shanghai: \["上海：", "先算", "完整游览日，", "再决定", "住哪一岸"\]/);
  assert.match(page, /xian: \["西安：", "住几晚、", "以哪里为基地、", "下一站去哪"\]/);
  assert.match(page, /hangzhou: \["杭州：", "先决定一日往返，", "还是把杭州真正住下来"\]/);
  assert.match(page, /zhangjiajie: \["张家界：", "先分清市区、", "武陵源和不同山岳系统"\]/);
  assert.match(page, /chongqing: \["重庆：", "选对住宿基地、", "车站和停留晚数"\]/);
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

  for (const id of ["hangzhou", "zhangjiajie"]) {
    assert.match(registry, new RegExp(`id: "${id}"`));
    assert.match(registry, new RegExp(`entityId: "city-${id}"`));
    const entryStart = registry.indexOf(`id: "${id}"`);
    assert.notEqual(entryStart, -1);
    const entryHeader = registry.slice(entryStart, entryStart + 700);
    assert.match(entryHeader, /datePublished: "2026-08-20"/);
    assert.match(entryHeader, /dateModified: "2026-08-21"/);
    assert.match(runtime, new RegExp(`${id}: \\{[\\s\\S]*body\\.en[\\s\\S]*body\\.zh[\\s\\S]*body\\.ko`));
  }
  assert.equal(
    [...registry.matchAll(/datePublished: "2026-08-20"/g)].length,
    2,
    "Hangzhou and Zhangjiajie retain their real publication date",
  );
  assert.match(registry, /sourceReviewedDate: "2026-08-20"/);
  assert.match(adapter, /status: "published"/);
  assert.match(adapter, /indexability: \{ index: true, follow: true \}/);
  assert.match(hangzhouBody, /No second generic Hangzhou travel guide should be created/);
  assert.match(zhangjiajieBody, /Do not copy that volatile workflow into this broad page/);
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

test("batch two hubs keep their Chinese city names together on narrow screens", async () => {
  const page = await source("components/content/DestinationHubPage.tsx");

  assert.match(page, /chengdu: \["成都：", "先把城市", "住稳，", "再搭四川路线"\]/);
  assert.match(page, /guangzhou: \["广州：", "住几晚、", "住哪个区、", "走哪个门户"\]/);
});

test("strict city projections do not emit empty or duplicated opening decisions", async () => {
  const [page, projection, styles] = await Promise.all([
    source("components/content/DestinationHubPage.tsx"),
    source("lib/destinationOverviewProjection.ts"),
    source("components/content/DestinationHubPage.module.css"),
  ]);

  assert.match(projection, /guangzhou: \{[\s\S]*?nights: \["decision-heading"\]/);
  assert.match(
    projection,
    /projectedSignalHeadingIds\.has\(heading\.id\)[\s\S]*?blocks: projectedPrelude/,
    "a section already projected as a decision signal must not appear in the opening",
  );
  assert.match(
    projection,
    /coarseList[\s\S]*?items: coarseList\.items\.slice\(0, 4\)/,
    "Chongqing's opening decision list stays useful but capped",
  );
  assert.match(
    projection,
    /evidence\.length > 0 \? \[projectedHeading, \.\.\.evidence\] : \[\]/,
    "a heading without projected evidence must be omitted",
  );
  assert.doesNotMatch(page, /<details\b/);
  assert.match(page, /<aside[\s\S]*?aria-labelledby="destination-evidence-title"/);
  assert.match(page, /<h2 id="destination-evidence-title">\{copy\.evidenceSummary\}<\/h2>/);
  assert.match(page, /<time dateTime=\{hub\.sourceReviewedDate\}>\{date\}<\/time>/);
  assert.match(page, /visibleSources\.map/);
  assert.match(page, /\.slice\(0, 4\)/);
  assert.match(styles, /\.evidencePanel/);
  assert.doesNotMatch(page, /supportGuideIds\.map/);
});

test("Guangzhou drops only its repeated projected lead while source research stays intact", async () => {
  const [{ projectDestinationOpening }, guangzhou, beijing, sourceBody] =
    await Promise.all([
      import("../../lib/destinationOverviewProjection.ts"),
      import("../../content/destinations/guangzhou/body.en.ts"),
      import("../../content/destinations/beijing/body.en.ts"),
      source("content/destinations/guangzhou/body.en.ts"),
    ]);

  const guangzhouOpening = projectDestinationOpening(guangzhou.default, "guangzhou");
  const beijingOpening = projectDestinationOpening(beijing.default, "beijing");

  assert.equal(
    guangzhouOpening.blocks.some((block) => block.type === "lead"),
    false,
    "the hero already makes Guangzhou's city-role argument",
  );
  assert.equal(
    beijingOpening.blocks.some((block) => block.type === "lead"),
    true,
    "the Guangzhou-only projection rule must not alter other cities",
  );
  assert.match(sourceBody, /id: "lead"/);
  assert.match(sourceBody, /Guangzhou is three things at once/);
});

test("destination projections remove source chapter numbers without editing research bodies", async () => {
  const [projection, chongqingZh] = await Promise.all([
    source("lib/destinationOverviewProjection.ts"),
    source("content/destinations/chongqing/body.zh.ts"),
  ]);

  const literal = projection.match(
    /const sourceSectionNumberPrefix = (\/\^[^\n]+\/u);/,
  )?.[1];
  assert.ok(literal, "projection owns an explicit source-heading prefix regex");
  const finalSlash = literal.lastIndexOf("/");
  const prefix = new RegExp(
    literal.slice(1, finalSlash),
    literal.slice(finalSlash + 1),
  );
  for (const [sourceHeading, expected] of [
    ["2. 重庆需要住几晚？", "重庆需要住几晚？"],
    ["2、住哪里", "住哪里"],
    ["2．机场和铁路站", "机场和铁路站"],
    ["2) Where next", "Where next"],
    ["12） 다음 도시", "다음 도시"],
  ]) {
    assert.equal(sourceHeading.replace(prefix, "").trim(), expected);
  }
  assert.equal("2026 travel facts".replace(prefix, ""), "2026 travel facts");

  assert.match(
    projection,
    /sourceHeading: stripSourceSectionNumber\(sections\[0\]\.heading\.text\)/,
  );
  assert.match(
    projection,
    /\.map\(\(\{ heading \}\) => stripSourceSectionNumber\(heading\.text\)\)/,
  );
  assert.match(
    projection,
    /const projectedHeading:[\s\S]*?text: stripSourceSectionNumber\(heading\.text\)/,
  );
  assert.match(
    projection,
    /evidence\.length > 0 \? \[projectedHeading, \.\.\.evidence\] : \[\]/,
  );

  assert.match(chongqingZh, /text: "2\. 重庆需要住几晚？"/);
  assert.match(chongqingZh, /text: "10\. 重庆之后去哪里"/);
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
  assert.match(chengduHeader, /dateModified: "2026-08-22"/);
  assert.match(chengduHeader, /sourceReviewedDate: "2026-08-22"/);
  assert.match(guangzhouHeader, /datePublished: "2026-08-17"/);
  assert.match(guangzhouHeader, /dateModified: "2026-08-21"/);
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

test("city hubs use a compact mobile-only projection without dropping decisions or evidence", async () => {
  const [page, styles, geography] = await Promise.all([
    source("components/content/DestinationHubPage.tsx"),
    source("components/content/DestinationHubPage.module.css"),
    source("components/content/DestinationGeographyDiagram.module.css"),
  ]);

  assert.match(page, /className=\{`\$\{styles\.hero\} \$\{destinationStyles\.destinationHero\}`\}/);
  assert.match(page, /className=\{`\$\{styles\.article\} \$\{destinationStyles\.destinationArticle\}`\}/);
  assert.match(page, /openingBody\.blocks\.length > 0/);
  assert.match(page, /<div className=\{destinationStyles\.destinationOpening\}>/);
  assert.match(page, /overviewSignals\.map\(\(signal, index\) =>/);
  assert.match(page, /hub\.supportGuideIds\.slice\(0, 6\)/);
  assert.match(page, /detailedAnswersLabel: "Deeper answers"/);
  assert.match(page, /detailedAnswersLabel: "深入答案"/u);
  assert.match(page, /detailedAnswersLabel: "더 깊은 답변"/u);
  assert.match(page, /<p>\{copy\.detailedAnswersLabel\}<\/p>/);
  assert.doesNotMatch(
    page,
    /className=\{destinationStyles\.ownerLinks\}[\s\S]*?<p>\{copy\.decisionsLabel\}<\/p>/,
  );
  assert.doesNotMatch(page, /<details\b/);
  assert.match(page, /className=\{destinationStyles\.evidencePanel\}/);
  assert.match(styles, /@media \(max-width: 48rem\)[\s\S]*?\.destinationHero \{[\s\S]*?padding-block:\s*1\.2rem 1\.6rem/);
  assert.match(styles, /@media \(max-width: 48rem\)[\s\S]*?\.destinationArticle \{[\s\S]*?padding-block:\s*2rem 2\.5rem/);
  assert.match(styles, /@media \(max-width: 48rem\)[\s\S]*?\.signalCard,[\s\S]*?padding-block:\s*1\.15rem/);
  assert.doesNotMatch(styles, /\.signalGrid[^{]*\{[^}]*display:\s*none/);
  assert.doesNotMatch(styles, /\.ownerLinks[^{]*\{[^}]*display:\s*none/);
  assert.doesNotMatch(styles, /\.evidencePanel\s*\{[^}]*display:\s*none/);

  assert.match(geography, /@media \(max-width: 640px\)[\s\S]*?\.key \{[\s\S]*?overflow-x:\s*auto/);
  assert.match(geography, /scroll-snap-type:\s*inline proximity/);
  assert.match(geography, /\.key li \{[\s\S]*?flex:\s*0 0 min\(76vw, 15rem\)/);
  assert.doesNotMatch(geography, /\.key(?:Label|Note)?[^{]*\{[^}]*display:\s*none/);
});
