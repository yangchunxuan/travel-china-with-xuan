import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("Malaysia guide publishes complete English, Chinese and Korean routes", async () => {
  const [registry, defaultRoute, localizedRoute] = await Promise.all([
    source("lib/guideRegistry.ts"),
    source("app/(default)/guides/zhangjiajie-from-malaysia/page.tsx"),
    source(
      "app/(localized)/[locale]/guides/zhangjiajie-from-malaysia/page.tsx",
    ),
  ]);

  assert.match(registry, /"zhangjiajie-from-malaysia"/);
  assert.match(registry, /audienceMarkets: \["malaysia"\]/);
  assert.match(registry, /openGraphLocale: "en_MY"/);
  assert.match(registry, /openGraphLocale: "zh_MY"/);
  assert.match(registry, /openGraphLocale: "ko_KR"/);
  assert.match(registry, /path: "\/guides\/zhangjiajie-from-malaysia\/"/);
  assert.match(
    registry,
    /path: "\/zh\/guides\/zhangjiajie-from-malaysia\/"/,
  );
  assert.match(
    registry,
    /path: "\/ko\/guides\/zhangjiajie-from-malaysia\/"/,
  );

  for (const route of [defaultRoute, localizedRoute]) {
    assert.match(route, /getGuideLanguagePaths/);
    assert.match(route, /canonical: guide\.canonicalPath/);
    assert.match(route, /"max-image-preview": "large"/);
    assert.match(route, /images: \[guide\.heroImageUrl\]/);
  }
  assert.match(localizedRoute, /value === "zh" \|\| value === "ko"/);
});

test("Malaysia guide is a people-first private-trip page with a neutral conversation CTA", async () => {
  const [page, english, chinese, korean] = await Promise.all([
    source("components/ZhangjiajieFromMalaysiaPage.tsx"),
    source("lib/zhangjiajieFromMalaysiaGuideCopy.en.ts"),
    source("lib/zhangjiajieFromMalaysiaGuideCopy.zh.ts"),
    source("lib/zhangjiajieFromMalaysiaGuideCopy.ko.ts"),
  ]);

  assert.equal(page.match(/<h1(?:\s|>)/g)?.length, 1);
  assert.match(page, /<article aria-labelledby="malaysia-guide-title">/);
  assert.match(page, /<h1 id="malaysia-guide-title">/);
  assert.doesNotMatch(page, /<h1[^>]*aria-label=/);
  assert.match(page, /copy\.hero\.titleParts\.map/);
  assert.match(page, /<wbr \/>/);
  for (const id of [
    "door-to-door",
    "responsibility",
    "traveller-evidence",
    "hotel-bases",
    "people-and-meals",
    "support-level",
    "trip-length",
    "quote-checklist",
    "start-conversation",
  ]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  assert.match(page, /GuideCtaLink/);
  assert.match(
    page,
    /utm_source=zhangjiajie-from-malaysia&utm_medium=owned&utm_campaign=trip-conversation&utm_content=planner-contact#planner-contact/,
  );
  assert.doesNotMatch(page, /planner=destinations|service=|free-brief/);
  assert.match(english, /The first conversation is free/);
  assert.match(chinese, /第一次沟通免费/);
  assert.match(korean, /첫 상담은 무료/);
  assert.doesNotMatch(english, /\$69|\$129|US\$69|US\$129/);
});

test("Malaysia guide uses stable source IDs with complete labels in every locale", async () => {
  const [model, page, english, chinese, korean] = await Promise.all([
    source("lib/zhangjiajieFromMalaysiaGuide.ts"),
    source("components/ZhangjiajieFromMalaysiaPage.tsx"),
    source("lib/zhangjiajieFromMalaysiaGuideCopy.en.ts"),
    source("lib/zhangjiajieFromMalaysiaGuideCopy.zh.ts"),
    source("lib/zhangjiajieFromMalaysiaGuideCopy.ko.ts"),
  ]);
  const sourceIds = [
    "visa",
    "malaysia-airlines-changsha",
    "airasia-changsha",
    "airasia-changsha-booking",
    "kuala-lumpur-zhangjiajie-launch",
    "railway-12306",
    "zhangjiajie-tourist-buses",
    "wulingyuan-tickets",
    "china-visitor-guide",
    "touch-n-go-china",
    "jakim-halal-guide",
    "tripadvisor-private-reviews",
    "minhakim-trip-account",
    "sj-echo-trip-account",
    "mayflower-private-tour",
    "koiman-package",
    "apple-package",
  ];

  for (const sourceId of sourceIds) {
    assert.match(model, new RegExp(`id: "${sourceId}"`));
    const labelKey =
      sourceId === "visa" ? '(?:visa|"visa")' : `"${sourceId}"`;
    for (const copy of [english, chinese, korean]) {
      assert.match(copy, new RegExp(`${labelKey}\\s*:`));
      assert.match(
        copy,
        new RegExp(`sourceIds:\\s*\\[[^\\]]*"${sourceId}"`),
        `${sourceId} must support a body claim, not only appear in the bibliography`,
      );
    }
  }

  assert.match(page, /getSourceById/);
  assert.match(page, /copy\.sources\.labels\[sourceId\]/);
  assert.match(page, /aria-label=\{copy\.sources\.inlineLabel\}/);
  assert.match(page, /data-label=\{copy\.responsibility\.columns\[1\]\}/);
  assert.match(page, /data-label=\{copy\.responsibility\.columns\[2\]\}/);
  assert.doesNotMatch(page, /sourceIndex|copy\.visa|labels\[index\]/);
  assert.doesNotMatch(
    english + chinese + korean,
    /sourceIndex|sourceLabel|editorial:/,
  );
});

test("Malaysia guide uses only the two newly supplied photographs and accessible diagrams", async () => {
  const [page, registry, css, provenance] = await Promise.all([
    source("components/ZhangjiajieFromMalaysiaPage.tsx"),
    source("lib/guideRegistry.ts"),
    source("components/ZhangjiajieFromMalaysiaPage.module.css"),
    source("docs/homeground-photo-provenance.md"),
  ]);

  assert.match(page, /name="misty-pillars"/);
  assert.match(page, /name="park-entrance"/);
  assert.match(page, /width=\{1200\}/);
  assert.match(page, /height=\{714\}/);
  assert.match(page, /height=\{704\}/);
  assert.match(page, /fetchPriority=\{priority \? "high" : undefined\}/);
  assert.match(page, /loading=\{priority \? "eager" : "lazy"\}/);
  assert.match(registry, /malaysia-zhangjiajie-card-1200\.webp/);
  assert.match(registry, /malaysia-zhangjiajie-og-1200\.jpg/);
  assert.match(provenance, /IMG_5010\.jpg/);
  assert.match(provenance, /IMG_5011\.jpg/);
  assert.match(css, /@media \(max-width: 22rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);

  for (const file of [
    "public/images/guides/zhangjiajie-from-malaysia/misty-pillars-480.avif",
    "public/images/guides/zhangjiajie-from-malaysia/misty-pillars-1200.jpg",
    "public/images/guides/zhangjiajie-from-malaysia/park-entrance-480.avif",
    "public/images/guides/zhangjiajie-from-malaysia/park-entrance-1200.jpg",
    "public/images/guides/zhangjiajie-from-malaysia/malaysia-zhangjiajie-card-1200.webp",
    "public/images/guides/zhangjiajie-from-malaysia/malaysia-zhangjiajie-og-1200.jpg",
  ]) {
    await access(new URL(`../../${file}`, import.meta.url));
  }
});

test("Malaysia guide schema stays within Article and BreadcrumbList boundaries", async () => {
  const page = await source("components/ZhangjiajieFromMalaysiaPage.tsx");

  assert.match(page, /"@type": "Article"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /editorialPersonSchema\(locale\)/);
  assert.match(page, /author: \{ "@id": EDITORIAL_PERSON_ID \}/);
  assert.match(page, /reviewedBy: \{ "@id": EDITORIAL_PERSON_ID \}/);
  assert.match(page, /<LegacyEditorialByline/);
  assert.match(page, /position: 1/);
  assert.match(page, /position: 2/);
  assert.match(page, /position: 3/);
  assert.doesNotMatch(page, /FAQPage|HowTo|AggregateRating|"@type": "Review"/);
  assert.match(page, /citation: MALAYSIA_ZHANGJIAJIE_SOURCES/);
  assert.match(page, /aria-current="page"/);
});

test("existing Zhangjiajie guide links back to the Malaysia journey in every locale", async () => {
  const page = await source("components/ZhangjiajieGuidePage.tsx");

  assert.match(page, /const malaysiaRelatedCopy/);
  assert.match(
    page,
    /getGuideEntry\(\s*"zhangjiajie-from-malaysia",\s*locale,/,
  );
  assert.match(page, /href=\{malaysiaGuide\.canonicalPath\}/);
  assert.match(page, /Starting in Malaysia/);
  assert.match(page, /从马来西亚出发/);
  assert.match(page, /말레이시아에서 출발/);
});
