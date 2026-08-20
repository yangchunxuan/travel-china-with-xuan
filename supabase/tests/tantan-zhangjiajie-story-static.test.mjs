import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("Tantan field note is one server-readable, seven-check article", async () => {
  const page = await source("components/TantanZhangjiajieStoryPage.tsx");
  const copy = await source("lib/tantanZhangjiajieStoryI18n.ts");

  assert.match(page, /<main id="story-content" tabIndex=\{-1\}>/);
  assert.equal(page.match(/<h1>/g)?.length, 1);
  assert.match(page, /copy\.sections\.map/);
  assert.match(page, /id=\{`check-\$\{index \+ 1\}`\}/);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /"@type": "Person"/);
  assert.match(page, /const personId = `\$\{studioPageUrl\}#tantan`/);
  assert.doesNotMatch(page, /\$\{studioProfileUrl\}#person/);
  assert.match(copy, /Glass Bridge, Tianmen Skywalk or National Forest Park/);
  assert.match(copy, /大峡谷玻璃桥、天门山玻璃栈道和森林公园怎么区分/);
  assert.match(copy, /대협곡 유리다리·톈먼산 유리잔도·국가삼림공원 구분하기/);
  assert.match(copy, /Use WhatsApp or leave your email/);
  assert.match(copy, /可以通过 WhatsApp 直接聊，或只留下一个邮箱/);
  assert.match(copy, /WhatsApp으로 바로 문의하거나 이메일을 남겨 주세요/);
  assert.match(copy, /before any paid work begins/i);
  assert.match(copy, /任何付费工作开始前/);
  assert.match(copy, /유료 작업 전에는/);
  assert.doesNotMatch(copy, /licensed guide|持证导游|자격.*가이드/i);
});

test("Tantan field note uses its own localized registry routes and metadata", async () => {
  const page = await source(
    "app/(default)/guides/zhangjiajie-glass-bridge-vs-skywalk/page.tsx",
  );
  const localizedPage = await source(
    "app/(localized)/[locale]/guides/zhangjiajie-glass-bridge-vs-skywalk/page.tsx",
  );
  const registry = await source("lib/guideRegistry.ts");
  const copy = await source("lib/tantanZhangjiajieStoryI18n.ts");
  const sitemap = await source("app/sitemap.ts");

  assert.match(
    page,
    /getGuideEntry\("zhangjiajie-glass-bridge-vs-skywalk", "en"\)/,
  );
  assert.match(
    localizedPage,
    /getGuideEntry\("zhangjiajie-glass-bridge-vs-skywalk", locale\)/,
  );
  assert.match(registry, /path: "\/guides\/zhangjiajie-glass-bridge-vs-skywalk\/"/);
  assert.match(registry, /path: "\/zh\/guides\/zhangjiajie-glass-bridge-vs-skywalk\/"/);
  assert.match(registry, /path: "\/ko\/guides\/zhangjiajie-glass-bridge-vs-skywalk\/"/);
  assert.match(
    registry,
    /id: "zhangjiajie-glass-bridge-vs-skywalk"[\s\S]*?datePublished: "2026-07-23"/,
  );
  assert.match(copy, /updatedDate: "23 July 2026"/);
  assert.match(copy, /updatedDate: "2026 年 7 月 23 日"/);
  assert.match(copy, /updatedDate: "2026년 7월 23일"/);
  assert.match(page, /authors: \["Tantan"\]/);
  assert.match(page, /max-image-preview": "large"/);
  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/);
});

test("Tantan story uses a verified attraction hero and privacy-edited field photos", async () => {
  const page = await source("components/TantanZhangjiajieStoryPage.tsx");
  const copy = await source("lib/tantanZhangjiajieStoryI18n.ts");
  const studio = await source("components/HomegroundStudioPage.tsx");
  const zhangjiajie = await source("components/ZhangjiajieGuidePage.tsx");

  assert.match(page, /ZHANGJIAJIE_GLASS_BRIDGE_HERO\.path/);
  assert.match(copy, /grand-canyon-glass-bridge\.jpg/);
  assert.match(copy, /The Zhangjiajie Grand Canyon Glass Bridge spanning the forested canyon/);
  assert.match(page, /tantan-with-guests-\$\{kind\}-1200/);
  assert.match(page, /utm_campaign=trip-conversation/);
  assert.match(page, /utm_content=planner-contact#planner-contact/);
  assert.doesNotMatch(page, /planner=destinations|service=/);
  assert.match(copy, /ctaAction: "Talk to a China trip planner"/);
  assert.match(copy, /ctaAction: "联系旅行规划师"/);
  assert.match(copy, /ctaAction: "중국 여행 플래너와 상담하기"/);
  assert.match(copy, /guest faces are blurred for privacy/);
  assert.match(
    studio,
    /tantan: "zhangjiajie-glass-bridge-vs-skywalk"/,
  );
  assert.match(
    studio,
    /<MemberStoryLink memberId=\{member\.id\} locale=\{locale\} \/>/,
  );
  assert.match(
    zhangjiajie,
    /getGuideEntry\(\s*"zhangjiajie-glass-bridge-vs-skywalk"/,
  );

  for (const file of [
    "public/product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg",
    "public/images/guides/tantan-zhangjiajie/tantan-with-guests-mountains-1200.avif",
    "public/images/guides/tantan-zhangjiajie/tantan-with-guests-rest-1200.webp",
  ]) {
    const fileStat = await stat(new URL(`../../${file}`, import.meta.url));
    assert.ok(fileStat.size > 0, `${file} should not be empty`);
  }
});

test("Tantan contents navigation tracks the visible check accessibly", async () => {
  const page = await source("components/TantanZhangjiajieStoryPage.tsx");
  const contents = await source("components/TantanStoryContentsNav.tsx");
  const scrollSpy = await source("components/useStoryScrollSpy.ts");

  assert.match(page, /<TantanStoryContentsNav/);
  assert.match(contents, /^"use client";/);
  assert.match(contents, /<nav className=\{styles\.contents\}/);
  assert.match(contents, /aria-current=\{isActive \? "location" : undefined\}/);
  assert.match(
    scrollSpy,
    /const activeZoneEnd = nextSection\?\.rect\.top \?\? section\.rect\.bottom/,
  );
  assert.match(scrollSpy, /requestAnimationFrame\(updateActiveSection\)/);
  assert.match(
    scrollSpy,
    /addEventListener\("scroll", scheduleUpdate, \{ passive: true \}\)/,
  );
  assert.match(contents, /className=\{styles\.contentsArrow\}/);
});
