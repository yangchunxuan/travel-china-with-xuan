import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../../", import.meta.url);
const source = (relativePath) =>
  readFile(new URL(relativePath, projectRoot), "utf8");

const articleComponents = [
  "components/CanadaVisaFreeGuidePage.tsx",
  "components/ChinaHotelValueGuidePage.tsx",
  "components/ChinaItineraryTooRushedPage.tsx",
  "components/ChinaItineraryWithOlderParentsPage.tsx",
  "components/ChinaTourGuideDecisionPage.tsx",
  "components/ChinaTripCostGuidePage.tsx",
  "components/KevinPreparationStoryPage.tsx",
  "components/NightShowGuidePage.tsx",
  "components/NzVisaFreeGuidePage.tsx",
  "components/SingaporeChinaVisaPage.tsx",
  "components/TantanZhangjiajieStoryPage.tsx",
  "components/TenDayChinaRouteGuidePage.tsx",
  "components/TransitRouteCheckPage.tsx",
  "components/TransportGuidePage.tsx",
  "components/UkVisaFreeGuidePage.tsx",
  "components/UsChinaVisaPage.tsx",
  "components/ZhangjiajieFromMalaysiaPage.tsx",
  "components/ZhangjiajieGuidePage.tsx",
  "components/ZhangjiajieOlderTravellersPage.tsx",
];

test("the shared identity graph uses stable website, organization and person ids", async () => {
  const identity = await source("lib/editorialIdentity.ts");

  assert.match(
    identity,
    /EDITORIAL_WEBSITE_ID\s*=\s*\n\s*"https:\/\/homegroundchina\.com\/#website"/,
  );
  assert.match(
    identity,
    /editorialWebsiteSchema\(\)[\s\S]*?publisher:\s*\{\s*"@id":\s*EDITORIAL_ORGANIZATION_ID\s*\}/,
  );
  assert.match(
    identity,
    /editorialPersonSchema\(locale:[\s\S]*?worksFor:\s*\{\s*"@id":\s*EDITORIAL_ORGANIZATION_ID\s*\}/,
  );
  assert.match(identity, /"@type": "TravelAgency"/);
  assert.match(identity, /name: HOMEGROUND_BRAND_NAME/);
  assert.match(identity, /slogan: HOMEGROUND_BRAND_SLOGAN/);
  assert.match(identity, /alternateName: \["Homeground China Journeys", "homegroundchina\.com"\]/);
  assert.match(identity, /contentUrl: EDITORIAL_LOGO_URL/);
  assert.match(identity, /sameAs: getHomegroundSocialProfileUrls\(\)/);
  assert.match(
    identity,
    /editorialWebsiteSchema\(\)[\s\S]*?alternateName: "homegroundchina\.com"/,
  );
  assert.doesNotMatch(identity, /SearchAction/);
});

test("the homepage emits the existing identity data as one linked graph", async () => {
  const homepage = await source("components/HomegroundHomePage.tsx");

  assert.match(homepage, /const identitySchema = \{[\s\S]*?"@context": "https:\/\/schema\.org"/);
  assert.match(
    homepage,
    /"@graph": \[[\s\S]*?editorialWebsiteSchema\(\)[\s\S]*?organizationSchema/,
  );
  assert.match(homepage, /JSON\.stringify\(identitySchema\)/);
  assert.doesNotMatch(homepage, /editorialPersonSchema\(locale\)/);
  assert.doesNotMatch(homepage, /SearchAction/);
});

test("structured editorial and author pages link back to the website entity", async () => {
  const [guide, author] = await Promise.all([
    source("components/content/EditorialGuidePage.tsx"),
    source("components/EditorialAuthorPage.tsx"),
  ]);

  for (const component of [guide, author]) {
    assert.match(component, /editorialWebsiteSchema\(\)/);
    assert.match(component, /editorialOrganizationSchema\(\)/);
    assert.match(
      component,
      /isPartOf:\s*\{\s*"@id":\s*EDITORIAL_WEBSITE_ID\s*\}/,
    );
  }
});

test("all bespoke editorial articles use the same linked identity graph", async () => {
  const components = await Promise.all(articleComponents.map(source));

  assert.equal(components.length, 19);
  for (const [index, component] of components.entries()) {
    assert.match(
      component,
      /editorialWebsiteSchema\(\)/,
      `${articleComponents[index]} must define the WebSite node`,
    );
    assert.match(
      component,
      /editorialOrganizationSchema\(\)/,
      `${articleComponents[index]} must define the Organization node`,
    );
    assert.match(
      component,
      /isPartOf:\s*\{\s*"@id":\s*EDITORIAL_WEBSITE_ID\s*\}/,
      `${articleComponents[index]} must link its Article to the WebSite`,
    );
  }
});
