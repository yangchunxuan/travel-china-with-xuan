import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("night-show guide keeps one server-readable decision path", async () => {
  const guide = await source("components/NightShowGuidePage.tsx");

  assert.match(guide, /<main id="article-content" tabIndex=\{-1\}>/);
  assert.equal(guide.match(/<h1>/g)?.length, 1);
  for (const id of [
    "quick-answer",
    "comparison",
    "do-you-need-a-show",
    "whole-evening",
    "hotel-base",
    "show-profiles",
    "qilou",
    "evening-calculation",
    "live-checks",
    "faq",
    "sources",
  ]) {
    assert.match(guide, new RegExp(`id="${id}"`));
  }

  assert.match(guide, /<table className=\{styles\.comparisonTable\}>/);
  assert.match(guide, /<details key=\{item\.question\}>/);
  assert.doesNotMatch(guide, /role="tab"|aria-selected/);
  assert.doesNotMatch(
    guide,
    /"@type": "(?:FAQPage|Review|AggregateRating|Product)"/,
  );
});

test("night-show copy answers the itinerary decision without a fixed timetable", async () => {
  const english = await source("lib/nightShowGuideCopy.en.ts");
  const chinese = await source("lib/nightShowGuideCopy.zh.ts");
  const korean = await source("lib/nightShowGuideCopy.ko.ts");

  assert.match(english, /There is no single best show/);
  assert.match(english, /A one-hour show does not cost only one hour/);
  assert.match(english, /choose no show/i);
  assert.match(english, /not a timetable/i);
  assert.match(chinese, /没有.*唯一|并不存在.*最好/);
  assert.match(korean, /모두에게 가장 좋은 공연은 없습니다/);
  assert.doesNotMatch(english, /Our guests always|We watched all three/);
  assert.doesNotMatch(english, /(?:Show Time|Ticket Price):|CNY\s*\d/i);
});

test("night-show CTA matches the current route finder boundary", async () => {
  const guide = await source("components/NightShowGuidePage.tsx");
  const english = await source("lib/nightShowGuideCopy.en.ts");

  assert.match(
    guide,
    /\?planner=destinations&destinations=zhangjiajie#route-finder/,
  );
  assert.doesNotMatch(guide, /utm_(?:source|medium|campaign)/);
  assert.match(english, /checks destination time first/i);
  assert.match(english, /human follow-up/i);
  assert.doesNotMatch(english, /Send Homeground your travel dates/);
});

test("night-show metadata, locales and sitemap share the guide registry", async () => {
  const page = await source(
    "app/(default)/guides/best-zhangjiajie-night-show/page.tsx",
  );
  const localizedPage = await source(
    "app/(localized)/[locale]/guides/best-zhangjiajie-night-show/page.tsx",
  );
  const registry = await source("lib/guideRegistry.ts");
  const sitemap = await source("app/sitemap.ts");

  assert.match(page, /getGuideEntry\("best-zhangjiajie-night-show", "en"\)/);
  assert.match(localizedPage, /getGuideEntry\("best-zhangjiajie-night-show", locale\)/);
  assert.match(page, /getGuideLanguagePaths\(guide\.id\)/);
  assert.match(localizedPage, /getGuideLanguagePaths\(guide\.id\)/);
  assert.match(registry, /path: "\/guides\/best-zhangjiajie-night-show\/"/);
  assert.match(registry, /path: "\/zh\/guides\/best-zhangjiajie-night-show\/"/);
  assert.match(registry, /path: "\/ko\/guides\/best-zhangjiajie-night-show\/"/);
  assert.match(registry, /datePublished: "2026-07-22"/);
  assert.match(sitemap, /guideIds\.flatMap/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
});

test("night-show guide exposes sources, original illustration and contextual internal links", async () => {
  const guide = await source("components/NightShowGuidePage.tsx");
  const sources = await source("lib/nightShowGuide.ts");
  const zhangjiajie = await source("components/ZhangjiajieGuidePage.tsx");
  const tenDay = await source("components/TenDayChinaRouteGuidePage.tsx");

  assert.match(guide, /NIGHT_SHOW_GUIDE_SOURCES\.map/);
  assert.match(guide, /citation: NIGHT_SHOW_GUIDE_SOURCES\.map/);
  assert.match(sources, /wlynews\.cn/);
  assert.match(sources, /songcn\.com\/show\/9/);
  assert.match(guide, /night-show-decision-1536\.webp/);
  assert.match(guide, /width="1536"\s+height="1024"/);
  assert.doesNotMatch(guide, /night-show-decision[^\n]+loading="lazy"/);
  assert.match(zhangjiajie, /getGuideEntry\("best-zhangjiajie-night-show", locale\)/);
  assert.match(tenDay, /getGuideEntry\(\s*"best-zhangjiajie-night-show"/);
});
