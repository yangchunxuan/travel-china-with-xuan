import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

const articleComponents = [
  "components/ZhangjiajieGuidePage.tsx",
  "components/NightShowGuidePage.tsx",
  "components/TenDayChinaRouteGuidePage.tsx",
  "components/TransportGuidePage.tsx",
  "components/ChinaItineraryTooRushedPage.tsx",
  "components/TantanZhangjiajieStoryPage.tsx",
];

test("global navigation separates editorial guides from paid planning", async () => {
  const [header, footer, css] = await Promise.all([
    source("components/HomegroundHeader.tsx"),
    source("components/HomegroundFooter.tsx"),
    source("components/HomegroundHomePage.module.css"),
  ]);

  for (const label of [
    "Travel guides",
    "Trip planning services",
    "旅行指南",
    "旅行规划服务",
    "여행 가이드",
    "여행 설계 서비스",
  ]) {
    assert.match(header, new RegExp(label));
    assert.match(footer, new RegExp(label));
  }

  assert.match(header, /\| "guides"/);
  assert.match(header, /pageContext === "guides" \? "page" : undefined/);
  assert.equal(
    header.match(/pageContext === "guides"[\s\S]{0,90}`\$\{target\.path\}guides\/`/g)
      ?.length,
    2,
  );
  assert.match(footer, /const guideHubPath = `\$\{copy\.path\}guides\/`/);
  assert.match(footer, /href=\{guideHubPath\}/);
  assert.doesNotMatch(footer, /guideId|getGuideEntry/);

  assert.match(css, /\.desktopNav a \{[\s\S]*?min-height: 2\.75rem;/);
  assert.match(
    css,
    /\.mobileNav > a:not\(\.mobileCta\) \{[\s\S]*?padding: 0\.9rem 0\.2rem;/,
  );
  assert.match(css, /:focus-visible/);
});

test("sitemap publishes all three localized guide hubs with hreflang", async () => {
  const sitemap = await source("app/sitemap.ts");

  assert.match(sitemap, /const guideHubLanguages = \{/);
  assert.match(sitemap, /en: `\$\{base\}\/guides\/`/);
  assert.match(sitemap, /ko: `\$\{base\}\/ko\/guides\/`/);
  assert.match(sitemap, /"zh-Hans": `\$\{base\}\/zh\/guides\/`/);
  assert.equal(
    sitemap.match(/alternates: \{ languages: guideHubLanguages \}/g)?.length,
    3,
  );
});

test("all six article types expose the same visible and JSON-LD hierarchy", async () => {
  for (const path of articleComponents) {
    const article = await source(path);

    assert.match(article, /"@type": "BreadcrumbList"/, path);
    assert.match(article, /position: 1/, path);
    assert.match(article, /position: 2/, path);
    assert.match(article, /position: 3/, path);
    assert.match(article, /aria-current="page"/, path);
    assert.match(
      article,
      /guideHub(?:Labels|Path|Href)|sectionLabels\.guides/,
      path,
    );
  }

  const tantan = await source(
    "components/TantanZhangjiajieStoryPage.tsx",
  );
  assert.doesNotMatch(tantan, /copy\.breadcrumbStudio/);
});
