import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("Kevin field note is a server-readable article with grounded role language", async () => {
  const page = await source("components/KevinPreparationStoryPage.tsx");
  const copy = await source("lib/kevinPreparationStoryI18n.ts");

  assert.match(page, /<main id="story-content" tabIndex=\{-1\}>/);
  assert.equal(page.match(/<h1>/g)?.length, 1);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /"@type": "Person"/);
  assert.match(page, /Kevin/);
  assert.match(copy, /Before the hotel pickup, Kevin has already started the day/);
  assert.match(copy, /客人看到的是一天行程，Kevin 的准备从见面前就开始了/);
  assert.match(
    copy,
    /여행자가 보는 것은 하루 일정이지만, Kevin의 준비는 호텔에서 만나기 전부터 시작됩니다/,
  );
  assert.doesNotMatch(
    `${page}\n${copy}`,
    /licensed guide|certified guide|持证导游|认证导游|공인 가이드|자격증.*가이드/i,
  );
});

test("Kevin field note uses localized registry routes and Kevin metadata", async () => {
  const page = await source(
    "app/(default)/guides/kevin-before-the-hotel-pickup/page.tsx",
  );
  const localizedPage = await source(
    "app/(localized)/[locale]/guides/kevin-before-the-hotel-pickup/page.tsx",
  );
  const registry = await source("lib/guideRegistry.ts");
  const sitemap = await source("app/sitemap.ts");

  assert.match(
    page,
    /getGuideEntry\("kevin-before-the-hotel-pickup", "en"\)/,
  );
  assert.match(
    localizedPage,
    /getGuideEntry\("kevin-before-the-hotel-pickup", locale\)/,
  );
  assert.match(
    registry,
    /path: "\/guides\/kevin-before-the-hotel-pickup\/"/,
  );
  assert.match(
    registry,
    /path: "\/zh\/guides\/kevin-before-the-hotel-pickup\/"/,
  );
  assert.match(
    registry,
    /path: "\/ko\/guides\/kevin-before-the-hotel-pickup\/"/,
  );
  assert.match(page, /authors: \["Kevin"\]/);
  assert.match(localizedPage, /authors: \["Kevin"\]/);
  assert.match(page, /max-image-preview": "large"/);
  assert.match(sitemap, /guideIds\.flatMap/);
});

test("Kevin story images exist and Studio links Kevin through the member-story map", async () => {
  const page = await source("components/KevinPreparationStoryPage.tsx");
  const copy = await source("lib/kevinPreparationStoryI18n.ts");
  const studio = await source("components/HomegroundStudioPage.tsx");

  assert.match(page, /\/images\/guides\/kevin-preparation/);
  assert.match(page, /kevin-hero-1080\.avif/);
  assert.match(page, /kevin-\$\{kind\}-1080\.webp/);
  assert.match(copy, /Kevin/);
  assert.match(studio, /const memberStoryGuideIds = \{/);
  assert.match(studio, /kevin: "kevin-before-the-hotel-pickup"/);
  assert.match(studio, /<MemberStoryLink memberId=\{member\.id\} locale=\{locale\} \/>/);

  for (const file of [
    "public/images/guides/kevin-preparation/kevin-hero-og-1200.jpg",
    "public/images/guides/kevin-preparation/kevin-hero-1080.avif",
    "public/images/guides/kevin-preparation/kevin-guiding-1080.webp",
    "public/images/guides/kevin-preparation/kevin-rain-1080.webp",
    "public/images/guides/kevin-preparation/kevin-solo-1080.webp",
  ]) {
    const fileStat = await stat(new URL(`../../${file}`, import.meta.url));
    assert.ok(fileStat.size > 0, `${file} should not be empty`);
  }
});
