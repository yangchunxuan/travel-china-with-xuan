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

test("night-show CTA opens direct planner contact without the old destination form", async () => {
  const guide = await source("components/NightShowGuidePage.tsx");
  const [english, chinese, korean] = await Promise.all([
    source("lib/nightShowGuideCopy.en.ts"),
    source("lib/nightShowGuideCopy.zh.ts"),
    source("lib/nightShowGuideCopy.ko.ts"),
  ]);

  assert.match(
    guide,
    /\$\{copy\.homePath\}#planner-contact/,
  );
  assert.doesNotMatch(
    guide,
    /utm_|planner=destinations|free-brief|service=/,
  );
  assert.match(english, /ctaAction: "Talk to a China trip planner"/);
  assert.match(chinese, /ctaAction: "联系旅行规划师"/);
  assert.match(korean, /ctaAction: "중국 여행 플래너와 상담하기"/);
  assert.match(english, /Use WhatsApp or leave your email/);
  assert.match(chinese, /通过 WhatsApp 直接聊，或只留下一个邮箱/);
  assert.match(korean, /WhatsApp으로 바로 문의하거나 이메일을 남기면/);
  for (const [copy, stalePhrases] of [
    [
      english,
      [
        /free trip brief/i,
        /free trip consultation/i,
        /Route Finder checks destination time first/i,
        /human follow-up/i,
        /One contact is requested only if you choose to continue/i,
      ],
    ],
    [
      chinese,
      [
        /免费旅行简报/,
        /免费旅行咨询/,
        /路线工具会先检查目的地所需时间/,
        /之后的人工沟通中确认/,
        /只有在你选择继续与人工规划师沟通时/,
      ],
    ],
    [
      korean,
      [
        /무료 여행 브리프/,
        /무료 여행 상담/,
        /Route Finder는 먼저 목적지에 쓸 시간을 확인합니다/i,
        /담당자의 후속 답변에서 확인합니다/,
        /상담을 계속하기로 선택할 때만 연락처/,
      ],
    ],
  ]) {
    for (const stalePhrase of stalePhrases) {
      assert.doesNotMatch(copy, stalePhrase);
    }
  }
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
  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/);
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
