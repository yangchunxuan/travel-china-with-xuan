import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  HOMEGROUND_BRAND_NAME,
  HOMEGROUND_BRAND_SLOGAN,
  getHomegroundCopy,
} from "../../lib/homegroundI18n.ts";

const repositoryRoot = new URL("../../", import.meta.url);
const source = (path) => readFile(new URL(path, repositoryRoot), "utf8");

test("the three homepages present one travel-agency brand with localized copy", () => {
  assert.equal(HOMEGROUND_BRAND_NAME, "Homeground China");
  assert.equal(
    HOMEGROUND_BRAND_SLOGAN,
    "China, your way. We’ve got your back.",
  );

  const expected = {
    en: {
      title:
        "Homeground China | China Travel Agency for Tailor-Made Trips",
      descriptor: "China Travel Agency",
      eyebrow: "China travel agency · Private, tailor-made trips",
      h1: HOMEGROUND_BRAND_SLOGAN,
    },
    zh: {
      title: "Homeground China｜中国私人定制旅行社",
      descriptor: "中国私人定制旅行社",
      eyebrow: "中国旅行社 · 私人定制行程",
      h1: "按你的方式，游中国。一路有我们。",
    },
    ko: {
      title: "Homeground China | 중국 맞춤여행 전문 여행사",
      descriptor: "중국 맞춤여행 전문 여행사",
      eyebrow: "중국 전문 여행사 · 맞춤형 자유여행",
      h1: "중국, 나만의 방식으로. 든든하게 함께합니다.",
    },
  };

  for (const [locale, values] of Object.entries(expected)) {
    const copy = getHomegroundCopy(locale);
    assert.equal(copy.metadata.title, values.title);
    assert.equal(copy.businessDescriptor, values.descriptor);
    assert.equal(copy.hero.eyebrow, values.eyebrow);
    assert.equal(copy.hero.title, values.h1);
    assert.match(copy.metadata.description, locale === "en" ? /travel agency/u : locale === "zh" ? /旅行社/u : /여행사/u);
  }
});

test("homepage metadata, visible identity and social cards reinforce Homeground China", async () => {
  const [defaultPage, localizedPage, header, footer, homepage] =
    await Promise.all([
      source("app/(default)/page.tsx"),
      source("app/(localized)/[locale]/page.tsx"),
      source("components/HomegroundHeader.tsx"),
      source("components/HomegroundFooter.tsx"),
      source("components/HomegroundHomePage.tsx"),
    ]);

  for (const page of [defaultPage, localizedPage]) {
    assert.match(page, /title: \{ absolute: copy\.metadata\.title \}/u);
    assert.match(page, /siteName: "Homeground China"/u);
    assert.match(page, /twitter: \{/u);
    assert.match(page, /card: "summary_large_image"/u);
  }

  assert.match(header, /<strong lang="en">Homeground China<\/strong>/u);
  assert.match(header, /<small>\{copy\.businessDescriptor\}<\/small>/u);
  assert.match(footer, /<strong lang="en">Homeground China<\/strong>/u);
  assert.match(homepage, /<strong lang="en">Homeground China<\/strong>/u);
  assert.match(homepage, /<h1 id="home-hero-title">/u);
  assert.match(homepage, /copy\.hero\.titleLines/u);
  assert.match(homepage, /styles\.heroTitleLine/u);
  assert.doesNotMatch(homepage, /editorialPersonSchema/u);
});

test("the shared graph has one TravelAgency identity and one website name", async () => {
  const [identity, social] = await Promise.all([
    source("lib/editorialIdentity.ts"),
    source("lib/homegroundSocial.ts"),
  ]);

  assert.match(identity, /"@type": "TravelAgency"/u);
  assert.match(identity, /"@id": EDITORIAL_ORGANIZATION_ID/u);
  assert.match(identity, /name: HOMEGROUND_BRAND_NAME/u);
  assert.match(identity, /slogan: HOMEGROUND_BRAND_SLOGAN/u);
  assert.match(identity, /alternateName: \["Homeground China Journeys", "homegroundchina\.com"\]/u);
  assert.match(identity, /"https:\/\/homegroundchina\.com\/icon\.svg"/u);
  assert.match(identity, /sameAs: getHomegroundSocialProfileUrls\(\)/u);
  assert.match(
    identity,
    /editorialWebsiteSchema\(\)[\s\S]*name: HOMEGROUND_BRAND_NAME[\s\S]*publisher: \{ "@id": EDITORIAL_ORGANIZATION_ID \}/u,
  );
  assert.match(social, /getHomegroundSocialProfileUrls/u);
  assert.match(social, /getHomegroundFacebookPageUrl\(\)/u);
});

test("the editorial author profile uses the controlled Chinese hreflang", async () => {
  const identity = await source("lib/editorialIdentity.ts");

  assert.match(
    identity,
    /getEditorialAuthorLanguagePaths[\s\S]*return \{[\s\S]*en: profilePaths\.en,[\s\S]*"zh-Hans": profilePaths\.zh,[\s\S]*ko: profilePaths\.ko,[\s\S]*\};/u,
  );
  assert.doesNotMatch(
    identity,
    /getEditorialAuthorLanguagePaths[\s\S]*return \{[\s\S]*\n\s*zh: profilePaths\.zh,/u,
  );
});

test("active brand surfaces no longer publish superseded identities", async () => {
  const paths = [
    "app/(default)/layout.tsx",
    "app/(default)/page.tsx",
    "app/(localized)/[locale]/layout.tsx",
    "app/(localized)/[locale]/page.tsx",
    "components/HomegroundHeader.tsx",
    "components/HomegroundFooter.tsx",
    "components/HomegroundHomePage.tsx",
    "lib/editorialIdentity.ts",
    "lib/homegroundI18n.ts",
    "lib/homegroundStudioI18n.ts",
  ];
  const activeSurface = (await Promise.all(paths.map(source))).join("\n");

  for (const stale of [
    /Independent China trip planning/iu,
    /China Trip Planning Studio/iu,
    /trip-planning studio/iu,
    /中国旅行规划工作室/u,
    /중국 여행 플래닝 스튜디오/u,
    /China, handled\./u,
    /China, shaped around you/u,
  ]) {
    assert.doesNotMatch(activeSurface, stale);
  }
});

test("privacy and legacy surfaces cannot regress to the shortened brand", async () => {
  const [privacy, legacySite, legacyHomepage] = await Promise.all([
    source("lib/homegroundPrivacyI18n.ts"),
    source("components/Site.tsx"),
    source("components/HomePage.tsx"),
  ]);

  assert.doesNotMatch(privacy, /trading as Homeground\)/u);
  assert.doesNotMatch(privacy, /以 Homeground 品牌/u);
  assert.doesNotMatch(privacy, /Homeground 브랜드 운영/u);
  assert.match(privacy, /homegroundBusiness\.brand/gu);
  assert.match(legacySite, /<small>China Travel Agency<\/small>/u);
  assert.doesNotMatch(legacyHomepage, /founder:/u);
  assert.doesNotMatch(legacyHomepage, /birthPlace:/u);
});
