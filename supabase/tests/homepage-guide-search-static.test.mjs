import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("homepage guide search is followed by the localized guide rail", async () => {
  const [homepage, finder, finderStyles, rail] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/HomepageGuideSearch.tsx"),
    source("components/HomepageGuideSearch.module.css"),
    source("components/HomepageGuideRail.tsx"),
  ]);
  const finderPosition = homepage.indexOf(
    "<HomepageGuideSearch demos={searchDemos} locale={locale} />",
  );
  const railPosition = homepage.indexOf("<HomepageGuideRail");
  const planningScope = homepage.indexOf("<PlanningScopeSection locale={locale} />");

  assert.ok(finderPosition >= 0, "the guide finder must remain present");
  assert.ok(
    railPosition > finderPosition,
    "the broader guide rail must follow the guide finder",
  );
  assert.ok(
    planningScope > railPosition,
    "guide discovery must remain before the planning-scope section",
  );
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
  assert.match(finder, /rotatingPlaceholders=\{demos\.map/);
  assert.match(finder, /showExamples=\{false\}/);
  assert.doesNotMatch(finder, /styles\.demo|demoResults|demoQuestion/);
  assert.match(rail, /<ol[\s\S]*?<li[\s\S]*?<a/);
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

  assert.match(form, /aria-expanded=\{showSuggestions \|\| showSuggestionNotice\}/);
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
  assert.match(form, /type PlaceholderPhase = "typing" \| "holding" \| "clearing"/);
  assert.match(form, /\(current \+ 1\) % placeholderPhrases\.length/);
  assert.match(form, /slice\(0, placeholderCharacterCount\)/);
  assert.match(form, /prefers-reduced-motion: reduce/);
  assert.match(form, /new IntersectionObserver/);
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
  assert.match(formStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(finder, /typewriter|setInterval|aria-live/);
});

test("guide rail preserves position while lazy-loading and loads near the native-scroll edge", async () => {
  const rail = await source("components/HomepageGuideRail.tsx");

  assert.match(
    rail,
    /maximumScroll - currentScroll <= list\.clientWidth \* 1\.25/,
  );
  assert.match(rail, /void ensureCompleteCatalog\(\)/);
  assert.match(
    rail,
    /useEffect\(\(\) => \{\s*const list = listRef\.current;\s*if \(!list\) return;\s*list\.scrollLeft = 0;\s*updateCatalogProgress\(\);\s*\}, \[resolvedCategory, updateCatalogProgress\]\)/,
  );
  assert.match(rail, /addEventListener\("scroll", queueCatalogProgressUpdate/);
  assert.doesNotMatch(rail, /arrowButton|scrollList|scrollBy/);
});

test("hero title cycles the full phrase set faster without restoring the visible play button", async () => {
  const [homepage, title, titleStyles] = await Promise.all([
    source("components/HomegroundHomePage.tsx"),
    source("components/RotatingHeroTitle.tsx"),
    source("components/RotatingHeroTitle.module.css"),
  ]);

  assert.match(title, /AUTO_STEP_MS = 2100/);
  assert.match(title, /className=\{styles\.motionControl\}/);
  assert.match(title, /aria-pressed=\{manualPaused\}/);
  assert.doesNotMatch(title, /function PlayIcon|function PauseIcon/);
  assert.match(title, /\(index \+ 1\) % availablePhrases\.length/);
  assert.match(title, /availablePhrases\.map\(\(phrase, index\) =>/);
  assert.match(title, /onMouseEnter=\{\(\) => setPointerPaused\(true\)\}/);
  assert.match(title, /onMouseLeave=\{\(\) => setPointerPaused\(false\)\}/);
  assert.doesNotMatch(title, /PlayIcon|PauseIcon|handleToggle/);
  assert.doesNotMatch(titleStyles, /\.toggle|\.hasControl/);
  assert.match(homepage, /pauseLabel=\{copy\.hero\.pauseMotion\}/);
  assert.match(homepage, /playLabel=\{copy\.hero\.resumeMotion\}/);
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
