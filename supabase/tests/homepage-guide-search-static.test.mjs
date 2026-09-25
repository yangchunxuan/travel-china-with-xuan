import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("homepage guide search leads the guide chapters, before the planning section", async () => {
  const [homepage, finder, finderStyles] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageGuideSearch.tsx"),
    source("components/HomepageGuideSearch.module.css"),
  ]);
  const finderPosition = homepage.indexOf(
    "<HomepageGuideSearch",
  );
  const planningScope = homepage.indexOf("<PlanningScopeSection locale={locale} />");

  assert.ok(finderPosition >= 0, "the guide finder must remain present");
  assert.ok(
    planningScope > finderPosition,
    "guide discovery must remain before the planning-scope section",
  );
  // The chapters replaced the separate guide rail (2026-09-25).
  assert.doesNotMatch(homepage, /<HomepageGuideRail|guideRailCatalogPath|homepage-guide-index/);
  assert.doesNotMatch(
    homepage,
    /guideSearchRuntime|searchPlatformManifest/,
    "the client homepage must not import the search corpus builder",
  );
  assert.match(
    finderStyles,
    /scroll-margin-top:\s*5\.75rem/,
    "the homepage search anchor must clear the sticky header",
  );
  assert.match(finder, /<h2 id="homepage-guide-search-title">/);
  // Search comes before the chapters, and suggestions open over them.
  assert.ok(finder.indexOf("<GuideSearchForm") < finder.indexOf("className={styles.chapters}"));
  assert.match(finderStyles, /\.finder \{[\s\S]*?z-index: 3;/);
  assert.match(finder, /className=\{styles\.chapters\}/);
  assert.match(finder, /<nav[\s\S]*?<ol>[\s\S]*?<li[\s\S]*?<Link/);
  assert.match(finder, /rotatingPlaceholders=\{demos\.map/);
  assert.match(finder, /showExamples=\{false\}/);
  assert.doesNotMatch(finder, /styles\.demo|demoResults|demoQuestion/);
});

test("homepage finder lazy-loads one same-language static index", async () => {
  const [finder, form, i18n, englishIndex, localizedIndex] = await Promise.all([
    source("components/HomepageGuideSearch.tsx"),
    source("components/GuideSearchForm.tsx"),
    source("lib/guideSearchI18n.ts"),
    source("app/(default)/guides/guide-search-index.json/route.ts"),
    source(
      "app/(localized)/[locale]/guides/guide-search-index.json/route.ts",
    ),
  ]);

  assert.match(finder, /documentsUrl=\{getGuideSearchIndexPath\(locale\)\}/);
  assert.match(finder, /surface="homepage"/);
  assert.match(i18n, /\/guides\/guide-search-index\.json/);
  assert.match(i18n, /`\/\$\{locale\}\/guides\/guide-search-index\.json`/);
  assert.match(englishIndex, /getGuideSearchDocuments\("en"\)/);
  assert.match(localizedIndex, /\{ locale: "zh" \}/);
  assert.match(localizedIndex, /\{ locale: "ko" \}/);
  assert.match(form, /fetch\(documentsUrl/);
  assert.match(form, /document\.locale === locale/);
});

test("homepage search remains keyboard- and error-accessible", async () => {
  const [form, copy] = await Promise.all([
    source("components/GuideSearchForm.tsx"),
    source("lib/guideSearchI18n.ts"),
  ]);

  assert.doesNotMatch(form, /role="combobox"/);
  assert.doesNotMatch(form, /aria-autocomplete=/);
  assert.doesNotMatch(form, /aria-expanded=\{showSuggestions/);
  assert.doesNotMatch(form, /aria-controls=\{/);
  assert.match(form, /className=\{styles\.suggestions\}[\s\S]*?role="region"/);
  assert.match(form, /<p role="status" aria-live="polite">/);
  assert.match(form, /event\.key === "Escape"/);
  assert.match(form, /event\.key === "ArrowDown"/);
  assert.match(form, /aria-invalid=\{validationError \|\| undefined\}/);
  assert.match(form, /role="alert"/);
  assert.match(form, /retryRemoteDocuments/);
  assert.match(form, /inputRef\.current\?\.focus\(\);/);
  assert.match(form, /copy\.retrySuggestions/);
  assert.match(form, /type="button"/);
  assert.match(copy, /emptyQueryError:/);
  assert.match(copy, /loadingSuggestions:/);
  assert.match(copy, /suggestionsUnavailable:/);
  assert.match(copy, /noSuggestions:/);
  assert.match(copy, /retrySuggestions:/);
});

test("homepage search placeholder demo types continuously, pauses for input and uses real questions", async () => {
  const [finder, form, editorial, formStyles] = await Promise.all([
    source("components/HomepageGuideSearch.tsx"),
    source("components/GuideSearchForm.tsx"),
    source("lib/homepageEditorial.ts"),
    source("components/GuideSearchForm.module.css"),
  ]);

  assert.match(finder, /rotatingPlaceholders=\{demos\.map/);
  assert.match(form, /TYPEWRITER_TARGET_MS = 620/);
  assert.match(form, /TYPEWRITER_HOLD_MS = 610/);
  assert.match(form, /MAX_ROTATING_PLACEHOLDERS = 3/);
  assert.match(form, /data-guide-search-surface=\{surface\}/);
  assert.match(form, /type PlaceholderPhase = "typing" \| "holding" \| "clearing"/);
  assert.match(form, /\(current \+ 1\) % placeholderPhrases\.length/);
  assert.match(form, /slice\(0, placeholderCharacterCount\)/);
  assert.match(form, /prefers-reduced-motion: reduce/);
  assert.match(form, /typeof window\.IntersectionObserver === "function"/);
  assert.match(form, /new window\.IntersectionObserver/);
  assert.match(form, /Boolean\(currentPlaceholder\) && !focusedWithin/);
  assert.match(
    form,
    /<span\s+aria-hidden="true"\s+className=\{styles\.rotatingPlaceholder\}/,
  );
  assert.match(editorial, /getGuideSearchDocuments\(locale\)/);
  assert.match(editorial, /getGuideSearchCopy\(locale\)\.examples/);
  assert.match(editorial, /searchGuideDocuments\(documents, query, locale\)/);
  assert.match(editorial, /\.slice\(0, 1\)/);
  assert.match(editorial, /title: document\.h1/);
  assert.doesNotMatch(editorial, /searchDemoGuideIds/);
  assert.match(formStyles, /@keyframes typewriter-cursor/);
  assert.match(formStyles, /\.rotatingPlaceholder\[data-phase="clearing"\]/);
  assert.match(
    formStyles,
    /\.searchExperience\[data-guide-search-surface="homepage"\] \.control \{[\s\S]{0,100}border-radius: 0\.75rem;[\s\S]{0,100}overflow: hidden;/,
  );
  assert.match(
    formStyles,
    /@media \(max-width: 40rem\)[\s\S]*?\.searchExperience\[data-guide-search-surface="homepage"\] \.control \{[\s\S]{0,80}min-height: 3\.25rem;/,
  );
  const sharedControlBlock = formStyles.match(/(?:^|\n)\.control \{([^}]*)\}/)?.[1] ?? "";
  assert.doesNotMatch(sharedControlBlock, /border-radius|overflow/);
  assert.match(formStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(finder, /typewriter|setInterval|aria-live/);
});

test("homepage guide chapters follow a trip and show each topic's first guides under a fitting photo", async () => {
  const [editorial, homepage, finderStyles] = await Promise.all([
    source("lib/homepageEditorial.ts"),
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageGuideSearch.module.css"),
  ]);
  // Route and pace, getting there, then where to stay: the three topics with hub pages.
  assert.match(editorial, /homepageGuideChapterOrder[^=]*= \[\s*"plan",\s*"transport",\s*"stay",\s*\]/);
  assert.match(editorial, /plan: "china-14-day-itinerary"/);
  assert.match(editorial, /transport: "beijing-south-station-to-capital-or-daxing-airport"/);
  assert.match(editorial, /stay: "zhangjiajie-city-or-wulingyuan-hotel-base"/);
  // Guides only, in editorial order, three per chapter; an empty topic is skipped.
  assert.match(editorial, /\(item\) => item\.kind === "guide"/);
  assert.match(editorial, /if \(inChapter\.length === 0\) return \[\];/);
  assert.match(editorial, /guides: inChapter\.slice\(0, 3\)/);
  // A chapter's guide links report through the existing guide-card event.
  assert.match(homepage, /onGuideClick=\{\(guide\) => \{\s*trackEvent\("homepage_guide_card_clicked"/);
  // Motion only when welcome and supported, and nothing rests hidden.
  const motion = finderStyles.slice(finderStyles.indexOf("@supports (animation-timeline: view())"));
  assert.match(motion, /@media \(prefers-reduced-motion: no-preference\) and \(min-width: 64rem\)/);
  for (const name of ["guideRuleAcross", "guideRuleDown", "guidePhotoOpen"]) {
    assert.match(motion, new RegExp(`animation: ${name} linear both;`), name);
  }
  assert.match(finderStyles, /@keyframes guidePhotoOpen \{\s*from \{\s*clip-path: inset\(22% 0 0 0 round 1rem\);/);
  assert.doesNotMatch(finderStyles, /opacity: 0[;\s]/);
  assert.match(finderStyles, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.questions a > span,[\s\S]*?transition: none;/);
});

test("homepage hero keeps one canonical brand promise behind a two-second rotating ending", async () => {
  const [homepage, header, title, titleStyles, showcaseStyles, showcaseCopy] =
    await Promise.all([
      source("components/HomegroundHomePage.tsx"),
      source("components/HomegroundHeader.tsx"),
      source("components/RotatingHeroTitle.tsx"),
      source("components/RotatingHeroTitle.module.css"),
      source("components/HomepageShowcase.module.css"),
      source("lib/homepageShowcaseI18n.ts"),
    ]);

  assert.match(homepage, /<HomegroundHeader/);
  assert.match(header, /<strong lang="en">Homeground China<\/strong>/);
  assert.match(homepage, /<RotatingHeroTitle/);
  assert.match(homepage, /canonicalTitle=\{copy\.hero\.title\}/);
  assert.match(homepage, /fixedLines=\{showcase\.heroHeadline\.fixedLines\}/);
  assert.match(homepage, /phrases=\{showcase\.heroHeadline\.phrases\}/);
  assert.match(title, /AUTO_STEP_MS = 2000/);
  assert.match(
    title,
    /<h1[\s\S]{0,160}aria-label=\{canonicalTitle\}[\s\S]{0,240}className=\{\[styles\.heading, className\]/,
  );
  assert.doesNotMatch(title, /screenReaderOnly/);
  assert.match(title, /data-homeground-rotating-title="true"/);
  assert.match(title, /data-homeground-title-measurement="true"/);
  assert.match(title, /initialTitleSegments\.join\(" "\) === canonicalTitle\.trim\(\)/);
  assert.match(title, /data-nosnippet=""/);
  assert.match(title, /new IntersectionObserver/);
  assert.match(title, /document\.visibilityState === "visible"/);
  assert.match(title, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(title, /manualPaused|focusPaused|pointerPaused/);
  assert.doesNotMatch(title, /<button|<Pause|<Play|motionControl/);
  assert.doesNotMatch(title, /aria-live|role="status"/);
  assert.match(title, /className=\{styles\.phraseSizer\}/);
  const visibleHeading = title.slice(
    title.indexOf("<h1"),
    title.indexOf("</h1>") + "</h1>".length,
  );
  const openingHeadingTag = visibleHeading.slice(
    0,
    visibleHeading.indexOf(">") + 1,
  );
  assert.doesNotMatch(openingHeadingTag, /data-nosnippet/u);
  assert.match(
    visibleHeading,
    /className=\{styles\.phraseStage\} data-nosnippet=""/u,
  );
  assert.doesNotMatch(visibleHeading, /phraseSizer|phraseMeasure/);
  assert.equal(
    visibleHeading.match(/<AnimatedPhrase phrase=\{currentPhrase\} \/>/g)
      ?.length,
    1,
  );
  assert.equal(
    title.match(/<AnimatedPhrase phrase=\{(?:phrase|currentPhrase)\} \/>/g)
      ?.length,
    2,
  );
  assert.match(
    title,
    /className=\{styles\.phraseMeasure\}[\s\S]{0,180}<AnimatedPhrase phrase=\{phrase\} \/>/,
  );
  assert.doesNotMatch(
    title,
    /className=\{styles\.phraseMeasure\}[\s\S]{0,180}>\s*\{phrase\}\s*<\/span>/,
  );
  assert.doesNotMatch(titleStyles, /motionControl|data-has-control/);
  assert.match(titleStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(
    titleStyles,
    /\.root \{[\s\S]*?display: grid;[\s\S]*?inline-size: 100%;[\s\S]*?max-inline-size: 100%;/,
    "the rotating title wrapper must not shrink away from the shared title axis",
  );
  assert.match(
    titleStyles,
    /\.measurementHeading \{[\s\S]*?pointer-events: none;[\s\S]*?visibility: hidden;/,
  );
  assert.match(
    titleStyles,
    /\.phraseStage \{[\s\S]*?box-sizing: content-box;[\s\S]*?margin-block-end: -0\.3em;[\s\S]*?overflow: hidden;[\s\S]*?padding-block-end: 0\.3em;/,
    "the animated phrase clip must leave room for serif descenders without changing line rhythm",
  );
  assert.match(
    titleStyles,
    /@media \(max-width: 39\.999rem\)[\s\S]*?\.phraseLayer\[data-phase="entering"\][\s\S]*?phraseFadeIn[\s\S]*?\.phraseLayer\[data-phase="exiting"\][\s\S]*?phraseFadeOut/,
  );
  assert.match(
    titleStyles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.phraseLayer\[data-phase="entering"\],[\s\S]*?\.phraseLayer\[data-phase="exiting"\][\s\S]*?animation: none/,
  );
  assert.doesNotMatch(titleStyles, /filter: blur/);
  assert.match(
    showcaseStyles,
    /\.root\[data-homeground-locale="zh"\] \{[\s\S]*?--showcase-zh-hero-measure: clamp\(18\.3rem, 25\.925vw, 22\.265rem\);/,
    "the Chinese hero must expose one fluid measure for its title group",
  );
  assert.match(
    homepage,
    /\{locale !== "zh" \? \([\s\S]*?className=\{showcaseStyles\.heroEyebrow\}[\s\S]*?\) : null\}/,
    "the Chinese homepage must remove the hero eyebrow without leaving an empty element",
  );
  assert.match(
    showcaseStyles,
    /\.root\[data-homeground-locale="zh"\] \.heroTitle \{[\s\S]*?inline-size: min\(100%, var\(--showcase-zh-hero-measure\)\);[\s\S]*?margin-inline: auto;[\s\S]*?max-inline-size: 100%;[\s\S]*?text-align: start;/,
    "Chinese hero lines must share one deliberate left edge at every breakpoint",
  );
  assert.match(
    showcaseStyles,
    /@media \(max-width: 39\.999rem\)[\s\S]*?\.root\[data-homeground-locale="zh"\] \{[\s\S]*?--showcase-zh-hero-measure: 13\.725rem;/,
    "the shared Chinese hero axis must track the mobile title size",
  );
  assert.match(
    showcaseStyles,
    /@media \(min-width: 40rem\)[\s\S]*?\.root\[data-homeground-locale="zh"\] \.hero \{[\s\S]*?padding-block-start: 10\.5rem;/,
    "the Chinese hero must reclaim the removed eyebrow space above mobile widths",
  );
  for (const phrase of [
    "一路有我们。",
    "每站都接得上",
    "路程也算进去",
    "难题交给我们",
  ]) {
    assert.ok(Array.from(phrase).length <= 6);
    assert.ok(
      showcaseCopy.includes(`"${phrase}"`),
      `mobile Chinese rotating phrase must stay within six characters: ${phrase}`,
    );
  }
  assert.match(
    showcaseStyles,
    /\.heroTitle \{[\s\S]*?margin: 0;[\s\S]*?margin-inline: auto;/,
    "the title must stay centered inside full-width responsive wrappers",
  );
});

test("customer-facing search copy avoids internal implementation language", async () => {
  const copy = await source("lib/guideSearchI18n.ts");

  for (const internalPhrase of [
    "published Homeground guides",
    "reviewed guide metadata",
    "the whole web",
    "AI-generated",
    "已发布的中文指南",
    "不会混入其他语言",
    "已经审核的指南元数据",
    "完整索引",
    "付费工作开始前",
    "발행한 한국어 가이드",
    "검토된 가이드 메타데이터",
    "전체 색인",
    "유료 작업 전",
    "Popular searches",
    "大家常搜",
    "많이 찾는 내용",
  ]) {
    assert.ok(
      !copy.includes(internalPhrase),
      `public search copy must not expose internal phrase: ${internalPhrase}`,
    );
  }
});

test("large result sets remain reachable in every language", async () => {
  const [results, copy] = await Promise.all([
    source("components/GuideSearchResultsClient.tsx"),
    source("lib/guideSearchI18n.ts"),
  ]);

  assert.match(results, /visibleResults\.length < results\.length/);
  assert.match(results, /setResultWindow/);
  assert.match(results, /copy\.page\.showMore/);
  assert.match(copy, /showMore: "Show more guides"/);
  assert.match(copy, /showMore: "查看更多指南"/);
  assert.match(copy, /showMore: "가이드 더 보기"/);
});

test("static guide search hydrates query-neutral before syncing the browser query", async () => {
  const results = await source("components/GuideSearchResultsClient.tsx");

  assert.match(
    results,
    /const urlRawQuery = \(searchParams\.get\("q"\) \?\? ""\)\.trim\(\)\.slice\(0, 120\);/,
    "the browser query must be read separately from rendered state",
  );
  assert.match(
    results,
    /const \[rawQuery, setRawQuery\] = useState\(""\);/,
    "SSR and the first client render must share the same query-neutral snapshot",
  );
  assert.match(
    results,
    /useEffect\(\(\) => \{\s*setRawQuery\(urlRawQuery\);\s*\}, \[urlRawQuery\]\);/,
    "the URL query must be applied only after hydration",
  );
  assert.match(
    results,
    /<GuideSearchForm\s+key=\{`\$\{locale\}:\$\{rawQuery\}`\}/,
    "the search input must remount with the hydrated query after direct visits and submissions",
  );
  assert.match(
    results,
    /const query = normalizeGuideSearchText\(rawQuery, locale\);/,
    "results must derive from the hydration-safe state rather than directly from useSearchParams",
  );
});

test("search language switching preserves the current query with safe URL encoding", async () => {
  const [header, page, copy] = await Promise.all([
    source("components/GuideSearchHeader.tsx"),
    source("components/GuideSearchResultsPage.tsx"),
    source("lib/guideSearchI18n.ts"),
  ]);

  assert.match(header, /const browserQuery = \(searchParams\.get\("q"\) \?\? ""\)\.trim\(\)\.slice\(0, 120\);/);
  assert.match(header, /const \[query, setQuery\] = useState\(""\);/);
  assert.match(header, /setQuery\(browserQuery\)/);
  assert.match(header, /languagePaths=\{getGuideSearchLanguagePaths\(query\)\}/);
  assert.match(page, /<GuideSearchHeader locale=\{locale\} \/>/);
  assert.match(page, /fallback=\{/);
  assert.match(copy, /new URLSearchParams\(\{ q: query \}\)\.toString\(\)/);
  assert.match(copy, /`\?\$\{new URLSearchParams/);
  assert.match(copy, /\$\{copies\.zh\.path\}\$\{querySuffix\}/);
  assert.match(copy, /\$\{copies\.ko\.path\}\$\{querySuffix\}/);
});

test("promoted searches use questions with a direct guide match", async () => {
  const copy = await source("lib/guideSearchI18n.ts");

  assert.match(copy, /"Beijing South Station to the airport"/);
  assert.match(copy, /"北京南站去首都机场还是大兴机场"/);
  assert.match(copy, /"베이징남역에서 서우두공항 또는 다싱공항까지"/);
  assert.doesNotMatch(copy, /"北京机场到市区怎么走"/);
  assert.doesNotMatch(copy, /"베이징 공항에서 시내로 가는 법"/);
});

test("result links remain distinguishable to assistive technology", async () => {
  const results = await source("components/GuideSearchResultsClient.tsx");

  assert.match(
    results,
    /aria-label=\{`\$\{copy\.page\.readGuide\}: \$\{document\.h1\}`\}/,
  );
});
