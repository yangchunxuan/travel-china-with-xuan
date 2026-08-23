import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");
const siteUrl = "https://homegroundchina.com";

const gscEvidencePath =
  "docs/organic-growth/evidence/gsc-page-indexing-2026-08-17.json";
const localePrefixes = ["", "/zh", "/ko"];

function localizedGuideUrls(slug) {
  return localePrefixes.map(
    (prefix) => `${siteUrl}${prefix}/guides/${slug}/`,
  );
}

const zhangjiajieIdentityMap = [
  {
    slug: "zhangjiajie-itinerary",
    component: "components/ZhangjiajieGuidePage.tsx",
    kind: "zhangjiajie",
  },
  {
    slug: "zhangjiajie-older-travellers",
    component: "components/ZhangjiajieOlderTravellersPage.tsx",
    kind: "zhangjiajie",
  },
  {
    slug: "best-zhangjiajie-night-show",
    component: "components/NightShowGuidePage.tsx",
    kind: "zhangjiajie",
  },
  {
    slug: "zhangjiajie-glass-bridge-vs-skywalk",
    component: "components/TantanZhangjiajieStoryPage.tsx",
    kind: "zhangjiajie",
  },
  {
    slug: "beijing-zhangjiajie-shanghai-10-days",
    component: "components/TenDayChinaRouteGuidePage.tsx",
    kind: "route-trio",
  },
  {
    slug: "beijing-zhangjiajie-shanghai-transport",
    component: "components/TransportGuidePage.tsx",
    kind: "transport-route",
  },
];

const visaIdentityMap = [
  {
    slug: "do-us-citizens-need-visa-china-2026",
    component: "components/UsChinaVisaPage.tsx",
    locales: localePrefixes,
    kind: "entry",
  },
  {
    slug: "do-singaporeans-need-visa-china",
    component: "components/SingaporeChinaVisaPage.tsx",
    locales: localePrefixes,
    kind: "entry",
  },
  {
    slug: "china-240-hour-visa-free-transit-route-check",
    component: "components/TransitRouteCheckPage.tsx",
    locales: localePrefixes,
    kind: "entry",
  },
  {
    slug: "china-visa-free-uk-citizens-2026",
    component: "components/UkVisaFreeGuidePage.tsx",
    locales: [""],
    existingOwner: true,
  },
  {
    slug: "china-visa-free-canadian-citizens-2026",
    component: "components/CanadaVisaFreeGuidePage.tsx",
    locales: [""],
    existingOwner: true,
  },
];

test("the reviewed GSC snapshot contains every Zhangjiajie, transport and visa URL in this linking cohort", async () => {
  const evidence = JSON.parse(await source(gscEvidencePath));
  assert.equal(evidence.reportType, "page-indexing");
  assert.equal(evidence.observedAt, "2026-08-20");
  assert.equal(evidence.reportUpdatedAt, "2026-08-17");

  const indexedUrls = new Set(
    evidence.rows
      .filter((row) => row.verdict === "indexed")
      .map((row) => row.url),
  );
  const zhangjiajieUrls = zhangjiajieIdentityMap.flatMap(({ slug }) =>
    localizedGuideUrls(slug),
  );
  const transportUrls = localizedGuideUrls(
    "beijing-zhangjiajie-shanghai-transport",
  );
  const visaUrls = visaIdentityMap.flatMap(({ slug, locales }) =>
    locales.map((prefix) => `${siteUrl}${prefix}/guides/${slug}/`),
  );

  assert.equal(zhangjiajieUrls.length, 18);
  assert.equal(transportUrls.length, 3);
  assert.equal(visaUrls.length, 11);
  for (const url of new Set([...zhangjiajieUrls, ...visaUrls])) {
    assert.ok(indexedUrls.has(url), `historical GSC evidence must contain ${url}`);
  }

  assert.ok(
    !visaUrls.includes(`${siteUrl}/china-visa-free-uk-canada/`),
    "the noindex legacy shell must not enter the article linking cohort",
  );
});

test("the shared authority component resolves locale-correct destination, transport and entry owners", async () => {
  const component = await source("components/AuthorityHubLinks.tsx");

  assert.match(component, /getDestinationHubEntry\("zhangjiajie", locale\)/);
  assert.match(
    component,
    /\["beijing", "zhangjiajie", "shanghai"\] as const/,
  );
  assert.match(component, /getSearchSectionPath\("transport", locale\)/);
  assert.match(component, /locale === "en"[\s\S]*?"\/guides\/china-entry-requirements\/"/);
  assert.match(component, /getSearchCollection\("essentials-entry-transit"\)/);
  assert.match(component, /getSearchCollectionPath\([\s\S]*?locale/);
  assert.match(component, /data-authority-hub-links=\{kind\}/);

  for (const naturalLabel of [
    "Open the Zhangjiajie travel guide",
    "Browse China transport guides",
    "Compare China entry guides",
    "查看张家界旅行指南",
    "浏览中国交通指南",
    "查看中国入境与过境指南",
    "장자제 여행 가이드 보기",
    "중국 교통 가이드 보기",
    "중국 입국·경유 가이드 보기",
  ]) {
    assert.ok(
      component.includes(naturalLabel),
      `visible anchor copy must use traveller language: ${naturalLabel}`,
    );
  }
});

test("each Zhangjiajie identity in the historical cohort renders its corresponding Hub links", async () => {
  for (const { component: path, kind } of zhangjiajieIdentityMap) {
    const component = await source(path);
    assert.match(
      component,
      new RegExp(`<AuthorityHubLinks\\s+kind="${kind}"\\s+locale=\\{locale\\}`),
      `${path} must render the ${kind} authority links`,
    );
  }
});

test("each visa identity in the historical cohort links to the existing entry owner without creating another canonical", async () => {
  for (const item of visaIdentityMap) {
    const component = await source(item.component);
    if (item.existingOwner) {
      assert.match(
        component,
        /<Link href="\/guides\/china-entry-requirements\/">/,
        `${item.component} must retain its existing entry-guide owner link`,
      );
    } else {
      assert.match(
        component,
        /<AuthorityHubLinks\s+kind="entry"\s+locale=\{locale\}/,
        `${item.component} must render locale-aware entry links`,
      );
    }
  }

  const authorityComponent = await source("components/AuthorityHubLinks.tsx");
  assert.doesNotMatch(authorityComponent, /china-visa-free-uk-canada/);
});
