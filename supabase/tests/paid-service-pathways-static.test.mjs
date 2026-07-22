import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

function between(value, start, end) {
  const startIndex = value.indexOf(start);
  const endIndex = value.indexOf(end, startIndex + start.length);

  assert.notEqual(startIndex, -1, `Missing start marker: ${start}`);
  assert.notEqual(endIndex, -1, `Missing end marker: ${end}`);
  assert.ok(endIndex > startIndex, `${end} must follow ${start}`);

  return value.slice(startIndex, endIndex);
}

test("English Home presents all three paid paths as information links", async () => {
  const home = await source("components/HomegroundHomePage.tsx");
  const services = await source("lib/routeServiceInterest.ts");

  assert.match(
    home,
    /\{locale === "en" && \(\s*<section[\s\S]*Ways to work with Homeground/,
  );
  assert.equal(
    home.match(/service: getRouteServiceInterest\("/g)?.length,
    3,
  );
  assert.match(home, /getRouteServiceInterest\("itinerary-review"\)/);
  assert.match(home, /getRouteServiceInterest\("route-build"\)/);
  assert.match(home, /getRouteServiceInterest\("full-trip-support"\)/);
  assert.match(home, /planningServicePaths\.map/);
  assert.match(services, /label: "Review My Route"/);
  assert.match(services, /label: "Build My Route"/);
  assert.match(services, /label: "Full Trip Planning & Ground Support"/);
  assert.match(services, /priceLabel: "US\$69"/);
  assert.match(services, /priceLabel: "US\$129"/);
  assert.match(services, /priceLabel: "Custom quote"/);
  assert.match(
    home,
    /href: "\/china-itinerary-review\/#review-my-route"/,
  );
  assert.match(
    home,
    /href: "\/china-itinerary-review\/#build-my-route"/,
  );
  assert.match(
    home,
    /href: "\/china-itinerary-review\/#full-trip-support"/,
  );
  assert.doesNotMatch(home, /href=[^>\n]*service=/);
});

test("Planning Services exposes three paths before education and links to Studio in body copy", async () => {
  const page = await source("components/ChinaItineraryReviewPage.tsx");
  const hero = between(page, "<header className={styles.hero}>", "id=\"choose-service\"");
  const comparison = between(
    page,
    "id=\"choose-service\"",
    "<section className={styles.intro}",
  );

  assert.match(hero, /US\$69/);
  assert.match(hero, /US\$129/);
  assert.match(hero, /Custom quote/);
  assert.match(hero, /full-trip support/i);

  assert.match(comparison, /Review My Route/);
  assert.match(comparison, /Build My Route/);
  assert.match(comparison, /Full Trip Planning &amp; Ground Support/);
  assert.match(comparison, /Custom quote/);
  assert.match(comparison, /href="#full-trip-support"/);
  assert.match(
    comparison,
    /A small planning studio, with one clear planning thread\./,
  );
  assert.match(comparison, /A lead planner owns the work\./);
  assert.match(comparison, /href="\/studio\/"/);
  assert.match(comparison, /Meet the people behind Homeground/);

  assert.match(
    page,
    /<li aria-current="page">Planning services<\/li>/,
  );
});

test("English Studio offers a service comparison and a separate free-tool exit", async () => {
  const page = await source("components/HomegroundStudioPage.tsx");

  assert.match(page, /const planningServicesHref\s*=/);
  assert.match(page, /\/china-itinerary-review\/[\s\S]*#choose-service/);
  assert.match(page, /const isEnglish = locale === "en"/);
  assert.match(page, /\{isEnglish \? \(/);
  assert.match(page, /href=\{planningServicesHref\}/);
  assert.match(page, /href=\{plannerHref\}/);
  assert.doesNotMatch(page, /service=(?:itinerary-review|route-build|full-trip-support)/);

  assert.match(page, /Choose the level of help/);
  assert.match(page, /Compare planning services/);
  assert.match(page, /Start with the free wishlist check/);
  assert.match(
    page,
    /\{isEnglish \? \([\s\S]*href=\{planningServicesHref\}[\s\S]*href=\{plannerHref\}[\s\S]*\) : \(\s*<a[\s\S]*href=\{plannerHref\}/,
  );
});

test("English global navigation exposes Planning services with a current-page state", async () => {
  const header = await source("components/HomegroundHeader.tsx");
  const footer = await source("components/HomegroundFooter.tsx");
  const homeStyles = await source("components/HomegroundHomePage.module.css");
  const servicePage = await source("components/ChinaItineraryReviewPage.tsx");

  assert.match(header, /pageContext\?:[^;]*"services"/);
  assert.match(header, /locale === "en"/);
  assert.match(header, /Planning services/);
  assert.match(
    header,
    /const planningServicesHref = "\/china-itinerary-review\/"/,
  );
  assert.ok(
    (header.match(/Planning services/g)?.length ?? 0) >= 4,
    "Planning services must appear in desktop and mobile navigation",
  );
  assert.match(
    header,
    /pageContext\s*===\s*"services"\s*\?\s*"page"\s*:\s*undefined/,
  );
  assert.match(header, /allowedServiceHashes/);
  assert.match(header, /"#review-my-route"/);
  assert.match(header, /"#build-my-route"/);
  assert.match(header, /"#full-trip-support"/);
  assert.match(header, /document\.fonts\.ready\.then\(alignAnchorAfterFonts\)/);
  assert.match(header, /scrollIntoView\(\{ block: "start" \}\)/);
  assert.match(
    homeStyles,
    /@media \(max-width: 1120px\) \{[\s\S]*\.desktopNav,[\s\S]*\.menuButton \{\s*display: inline-flex;/,
  );

  assert.match(footer, /pageContext\?:[^;]*"services"/);
  assert.match(footer, /locale === "en"/);
  assert.match(footer, /Planning services/);
  assert.match(
    footer,
    /const planningServicesPath = "\/china-itinerary-review\/"/,
  );
  assert.match(footer, /pageContext === "services"/);
  assert.match(footer, /aria-current="page"/);

  assert.equal(
    servicePage.match(/pageContext="services"/g)?.length,
    2,
    "Planning Services must mark both Header and Footer as current",
  );
});

test("the isolated legacy banner is removed without introducing checkout", async () => {
  const home = await source("components/HomegroundHomePage.tsx");
  const homeStyles = await source("components/HomegroundHomePage.module.css");
  const servicePage = await source("components/ChinaItineraryReviewPage.tsx");
  const studioPage = await source("components/HomegroundStudioPage.tsx");
  const packageJson = await source("package.json");
  const commercialSurface = `${home}\n${servicePage}\n${studioPage}`;

  assert.doesNotMatch(home, /planningServiceLink/);
  assert.doesNotMatch(homeStyles, /\.planningServiceLink/);
  assert.doesNotMatch(
    commercialSurface,
    />\s*(?:Buy now|Book now|Checkout|Add to cart|Pay now)\s*</i,
  );
  assert.doesNotMatch(
    commercialSurface,
    /(?:href|action)=["'][^"']*(?:checkout|payment|cart)[^"']*["']/i,
  );
  assert.doesNotMatch(commercialSurface, /type=["']file["']/i);
  assert.doesNotMatch(
    packageJson,
    /"(?:@stripe\/[^"\s]+|stripe|@paypal\/[^"\s]+|paypal)"\s*:/i,
  );
  assert.match(servicePage, /does not take payment/i);
});
