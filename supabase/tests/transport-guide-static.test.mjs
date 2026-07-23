import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("transport guide keeps one server-readable decision path", async () => {
  const guide = await source("components/TransportGuidePage.tsx");
  const copy = await source(
    "lib/beijingZhangjiajieShanghaiTransportI18n.ts",
  );

  assert.match(
    guide,
    /<main id="transport-guide-content" tabIndex=\{-1\}>/,
  );
  assert.equal(guide.match(/<h1>/g)?.length, 1);
  for (const id of [
    "quick-answer",
    "door-to-door",
    "comparison",
    "zhangjiajie-base",
    "trip-length",
    "traveller-types",
    "booking-checklist",
    "evidence",
    "faq",
    "sources",
  ]) {
    assert.match(guide, new RegExp(`id="${id}"`));
  }
  assert.match(copy, /id: "beijing-to-zhangjiajie"/);
  assert.match(copy, /id: "zhangjiajie-to-shanghai"/);
  assert.match(copy, /The direct train is real/);
  assert.match(copy, /直达高铁确实存在/);
  assert.match(copy, /직행 열차는 실제로 있지만/);
  assert.match(guide, /<aside aria-labelledby=\{`\$\{leg\.id\}-watch-title`\}>/);
  assert.match(
    guide,
    /aria-labelledby="related-zhangjiajie-guide-title"/,
  );
  assert.doesNotMatch(guide, /<article key=\{calculation\.route\}>/);
  assert.doesNotMatch(guide, /FAQPage|HowTo|AggregateRating/);
});

test("transport comparison distinguishes official facts from planning estimates", async () => {
  const guide = await source("components/TransportGuidePage.tsx");
  const copy = await source(
    "lib/beijingZhangjiajieShanghaiTransportI18n.ts",
  );
  const sources = await source(
    "lib/beijingZhangjiajieShanghaiTransport.ts",
  );

  assert.match(copy, /Homeground planning allowances/);
  assert.match(copy, /规划估算/);
  assert.match(copy, /계획 추정치/);
  assert.match(copy, /G3649/);
  assert.match(copy, /G221/);
  assert.match(copy, /12h 01m/);
  assert.match(copy, /How the flight ranges are built/);
  assert.match(copy, /60–90m to the Beijing airport/);
  assert.match(sources, /www\.12306\.cn/);
  assert.match(sources, /hunanairport\.cn/);
  assert.match(sources, /shanghaiairport\.com/);
  assert.match(guide, /copy\.evidence\.items\.map/);
  assert.match(guide, /BEIJING_ZHANGJIAJIE_SHANGHAI_TRANSPORT_SOURCES\.map/);
  assert.match(guide, /<li key=\{source\.name\}>/);
});

test("transport guide metadata and locale paths come from the guide registry", async () => {
  const page = await source(
    "app/(default)/guides/beijing-zhangjiajie-shanghai-transport/page.tsx",
  );
  const localizedPage = await source(
    "app/(localized)/[locale]/guides/beijing-zhangjiajie-shanghai-transport/page.tsx",
  );
  const registry = await source("lib/guideRegistry.ts");
  const sitemap = await source("app/sitemap.ts");

  assert.match(
    page,
    /getGuideEntry\(\s*"beijing-zhangjiajie-shanghai-transport",\s*"en"/,
  );
  assert.match(
    localizedPage,
    /getGuideEntry\(\s*"beijing-zhangjiajie-shanghai-transport",\s*locale/,
  );
  assert.match(
    registry,
    /path: "\/guides\/beijing-zhangjiajie-shanghai-transport\/"/,
  );
  assert.match(
    registry,
    /path: "\/zh\/guides\/beijing-zhangjiajie-shanghai-transport\/"/,
  );
  assert.match(
    registry,
    /path: "\/ko\/guides\/beijing-zhangjiajie-shanghai-transport\/"/,
  );
  assert.match(sitemap, /guideIds\.flatMap/);
});

test("transport article uses its own responsive, localized travel-day photos", async () => {
  const guide = await source("components/TransportGuidePage.tsx");
  const styles = await source("components/TransportGuidePage.module.css");
  const copy = await source(
    "lib/beijingZhangjiajieShanghaiTransportI18n.ts",
  );
  const registry = await source("lib/guideRegistry.ts");
  const page = await source(
    "app/(default)/guides/beijing-zhangjiajie-shanghai-transport/page.tsx",
  );
  const localizedPage = await source(
    "app/(localized)/[locale]/guides/beijing-zhangjiajie-shanghai-transport/page.tsx",
  );
  const provenance = await source("docs/homeground-photo-provenance.md");

  assert.doesNotMatch(
    guide,
    /images\/guides\/zhangjiajie\/(?:hero|tianmen|fenghuang)/,
  );
  assert.match(
    guide,
    /images\/guides\/beijing-zhangjiajie-shanghai-transport/,
  );
  assert.match(guide, /<picture>/);
  assert.match(guide, /type="image\/avif"/);
  assert.match(guide, /type="image\/webp"/);
  assert.match(guide, /loading="lazy"/);
  assert.match(guide, /decoding="async"/);
  assert.match(guide, /className=\{styles\.routeGallery\}/);
  assert.match(styles, /\.routeGallery/);
  assert.match(copy, /北京西站南进站口外的出租车与旅客/);
  assert.match(copy, /장자제서역과 역 앞 광장의 넓은 전경/);
  assert.match(
    registry,
    /id: "beijing-zhangjiajie-shanghai-transport",[\s\S]*?heroImagePath:[\s\S]*?zhangjiajie-west-1600\.jpg/,
  );
  assert.match(page, /card: "summary_large_image"/);
  assert.match(page, /images: \[guide\.heroImageUrl\]/);
  assert.match(localizedPage, /card: "summary_large_image"/);

  const imageVariants = [
    ...["airport-wayfinding", "beijing-west"].flatMap((name) => [
      `${name}-480.avif`,
      `${name}-480.webp`,
      `${name}-768.avif`,
      `${name}-768.webp`,
      `${name}-1200.avif`,
      `${name}-1200.webp`,
      `${name}-1200.jpg`,
    ]),
    ...[640, 960, 1280, 1600].flatMap((width) => [
      `zhangjiajie-west-${width}.avif`,
      `zhangjiajie-west-${width}.webp`,
    ]),
    "zhangjiajie-west-1600.jpg",
  ];

  assert.equal(imageVariants.length, 23);

  for (const image of imageVariants) {
    const imageStat = await stat(
      new URL(
        `../../public/images/guides/beijing-zhangjiajie-shanghai-transport/${image}`,
        import.meta.url,
      ),
    );
    assert.ok(imageStat.size > 0, `${image} must not be empty`);
  }

  assert.match(
    provenance,
    /beijing-zhangjiajie-shanghai-transport\/beijing-west-\*/,
  );
  assert.match(
    provenance,
    /beijing-zhangjiajie-shanghai-transport\/zhangjiajie-west-\*/,
  );
  assert.match(
    provenance,
    /beijing-zhangjiajie-shanghai-transport\/airport-wayfinding-\*/,
  );
});

test("transport CTA carries its three-city context into the planner", async () => {
  const guide = await source("components/TransportGuidePage.tsx");
  const copy = await source(
    "lib/beijingZhangjiajieShanghaiTransportI18n.ts",
  );
  const planner = await source("components/RouteFinder.tsx");

  assert.match(
    guide,
    /destinations=beijing-great-wall%2Czhangjiajie%2Cshanghai/,
  );
  assert.match(
    planner,
    /function destinationsFromUrl\(\): DestinationId\[\] \| null/,
  );
  assert.match(planner, /const linkedDestinationIds = destinationsFromUrl\(\)/);
  assert.match(
    planner,
    /applyLinkedDestinations\(storedDraft, linkedDestinationIds\)/,
  );
  assert.match(copy, /Start the free route check/);
  assert.match(copy, /无需先填写联系方式即可看到时间判断/);
  assert.match(copy, /연락처를 입력하기 전에 시간 판단 결과를 볼 수 있습니다/);
  assert.doesNotMatch(copy, /A human planner replies through your chosen contact method/);
  assert.doesNotMatch(copy, /人工回复时/);
  assert.doesNotMatch(copy, /담당자가 직접 답변하면서/);
});

test("existing Zhangjiajie guide links back to the new transport decision page", async () => {
  const guide = await source("components/ZhangjiajieGuidePage.tsx");
  const tenDayGuide = await source("components/TenDayChinaRouteGuidePage.tsx");

  assert.match(
    guide,
    /getGuideEntry\(\s*"beijing-zhangjiajie-shanghai-transport"/,
  );
  assert.match(guide, /href=\{transportGuide\.canonicalPath\}/);
  assert.match(guide, /transportGuide\.featuredLinkLabel/);
  assert.match(
    tenDayGuide,
    /getGuideEntry\(\s*"beijing-zhangjiajie-shanghai-transport"/,
  );
  assert.match(tenDayGuide, /href=\{transportGuideHref\}/);
});
