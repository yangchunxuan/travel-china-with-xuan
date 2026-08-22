import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const locales = ["en", "zh", "ko"];
const localePrefixes = { en: "", zh: "/zh", ko: "/ko" };

async function source(relativePath) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

function blockSignature(text) {
  return [...text.matchAll(/\{\s*id:\s*"([^"]+)"\s*,\s*type:\s*"([^"]+)"/gu)]
    .map((match) => `${match[1]}:${match[2]}`);
}

async function localizedBodies(root) {
  return Object.fromEntries(await Promise.all(locales.map(async (locale) => [
    locale,
    await source(`${root}/body.${locale}.ts`),
  ])));
}

test("the evergreen release adds one canonical and updates the two existing guide owners", async () => {
  const guideDirectories = (await readdir(path.join(projectRoot, "content/guides"), {
    withFileTypes: true,
  }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  assert.deepEqual(
    guideDirectories
      .filter((id) => /great-wall|spring-festival|chinese-new-year|lunar-new-year|tiananmen|forbidden-city/u.test(id))
      .sort(),
    [
      "beijing-to-badaling-great-wall-transfer",
      "beijing-to-mutianyu-great-wall-transfer",
      "forbidden-city-for-foreign-visitors",
      "great-wall-section-selector-from-beijing",
      "lunar-new-year-customs-for-visitors",
    ],
  );

  const greatWall = JSON.parse(await source(
    "content/guides/great-wall-section-selector-from-beijing/metadata.json",
  ));
  assert.equal(greatWall.id, "great-wall-section-selector-from-beijing");
  assert.deepEqual(greatWall.destinations, ["china", "beijing"]);
  assert.deepEqual(
    [greatWall.datePublished, greatWall.dateModified, greatWall.sourceReviewedDate],
    ["2026-08-22", "2026-08-22", "2026-08-22"],
  );
  assert.deepEqual(greatWall.search, {
    section: "explore",
    family: "comparison",
    primaryIntent: "compare",
  });
  for (const [locale, prefix] of Object.entries(localePrefixes)) {
    assert.equal(
      greatWall.locales[locale].path,
      `${prefix}/guides/great-wall-section-selector-from-beijing/`,
    );
    assert.ok(greatWall.searchTerms[locale].length >= 3, `${locale} search terms`);
  }

  const springFestival = JSON.parse(await source(
    "content/guides/lunar-new-year-customs-for-visitors/metadata.json",
  ));
  assert.deepEqual(
    [springFestival.datePublished, springFestival.dateModified, springFestival.sourceReviewedDate],
    ["2026-08-13", "2026-08-22", "2026-08-22"],
  );
  assert.equal(springFestival.locales.en.title, "Chinese New Year in China: Should Foreign Travellers Visit?");
  assert.equal(springFestival.search.primaryIntent, "plan");

  const forbiddenCity = JSON.parse(await source(
    "content/guides/forbidden-city-for-foreign-visitors/metadata.json",
  ));
  assert.deepEqual(
    [forbiddenCity.datePublished, forbiddenCity.dateModified, forbiddenCity.sourceReviewedDate],
    ["2026-08-11", "2026-08-22", "2026-08-22"],
  );
  assert.match(forbiddenCity.locales.en.title, /Tiananmen Square and Forbidden City/u);
});

test("six trilingual owners retain one localized editorial structure", async () => {
  const roots = [
    "content/guides/great-wall-section-selector-from-beijing",
    "content/guides/lunar-new-year-customs-for-visitors",
    "content/guides/forbidden-city-for-foreign-visitors",
    "content/destinations/beijing",
    "content/destinations/shanghai",
    "content/destinations/chengdu",
  ];
  for (const root of roots) {
    const bodies = await localizedBodies(root);
    assert.deepEqual(blockSignature(bodies.en), blockSignature(bodies.zh), `${root}/zh`);
    assert.deepEqual(blockSignature(bodies.en), blockSignature(bodies.ko), `${root}/ko`);
    assert.ok(blockSignature(bodies.en).length >= 25, `${root} substantial structure`);
  }
});

test("the Great Wall selector has reciprocal localized links and compliant assets", async () => {
  const slug = "great-wall-section-selector-from-beijing";
  const selectorBodies = await localizedBodies(`content/guides/${slug}`);
  const inboundRoots = [
    "content/guides/beijing-to-badaling-great-wall-transfer",
    "content/guides/beijing-to-mutianyu-great-wall-transfer",
    "content/destinations/beijing",
  ];
  for (const [locale, prefix] of Object.entries(localePrefixes)) {
    const selector = selectorBodies[locale];
    assert.match(selector, new RegExp(`"?href"?:\\s*"${prefix}/guides/beijing-to-badaling-great-wall-transfer/"`, "u"));
    assert.match(selector, new RegExp(`"?href"?:\\s*"${prefix}/guides/beijing-to-mutianyu-great-wall-transfer/"`, "u"));
    assert.match(selector, new RegExp(`"?href"?:\\s*"${prefix}/destinations/beijing/"`, "u"));
    for (const root of inboundRoots) {
      const inbound = await source(`${root}/body.${locale}.ts`);
      assert.match(
        inbound,
        new RegExp(`"?href"?:\\s*"${prefix}/guides/${slug}/"`, "u"),
        `${root}/${locale} reciprocal link`,
      );
    }
  }

  for (const name of [
    "hero-1600.webp",
    "section-decision-en-1440.webp",
    "section-decision-zh-1440.webp",
    "section-decision-ko-1440.webp",
  ]) {
    const details = await stat(path.join(projectRoot, `public/images/guides/${slug}/${name}`));
    assert.ok(details.size > 20_000, `${name} is not a placeholder`);
  }
  assert.match(selectorBodies.en, /do not send passport, payment, medical or detailed mobility information/iu);
});

test("Spring Festival keeps annual dates with the calendar owner and resolves every localized link", async () => {
  const bodies = await localizedBodies("content/guides/lunar-new-year-customs-for-visitors");
  for (const [locale, prefix] of Object.entries(localePrefixes)) {
    assert.match(
      bodies[locale],
      new RegExp(`"?href"?:\\s*"${prefix}/guides/china-public-holidays-travel-calendar/"`, "u"),
    );
    assert.match(bodies[locale], new RegExp(`"?href"?:\\s*"${prefix}/plan/"`, "u"));
    assert.doesNotMatch(bodies[locale], /first-trip-to-china/u);
  }
  assert.match(bodies.en, /mainland China's 2027 days off[\s\S]*had not yet been published/iu);
  assert.match(bodies.en, /A planning pattern, not the 2027 official calendar/u);
});

test("Tiananmen exemption wording follows the current published official rule", async () => {
  const guideBodies = await localizedBodies("content/guides/forbidden-city-for-foreign-visitors");
  const hubBodies = await localizedBodies("content/destinations/beijing");
  assert.match(guideBodies.en, /valid same-day Palace Museum reservation can enter the square without making a separate square reservation/u);
  assert.match(guideBodies.zh, /持故宫当日有效预约记录的游客无需另约广场/u);
  assert.match(guideBodies.ko, /광장을 따로 예약하지 않고/u);
  assert.match(hubBodies.en, /valid same-day Palace Museum reservation lets the visitor enter the square without a separate square reservation/u);
  assert.doesNotMatch(guideBodies.en, /reserve it separately or obtain current official confirmation/u);
  for (const bodies of [guideBodies, hubBodies]) {
    for (const locale of locales) {
      assert.match(bodies[locale], /tamgw\.beijing\.gov\.cn/u);
    }
  }
});

test("shared discovery and governance expose the release without paid-service amplification", async () => {
  const destinationRegistry = await source("lib/destinationHubs.ts");
  assert.match(destinationRegistry, /"great-wall-section-selector-from-beijing"/u);
  assert.match(destinationRegistry, /"leshan-giant-buddha-land-or-boat-visit"/u);
  for (const city of ["beijing", "shanghai", "chengdu"]) {
    const start = destinationRegistry.indexOf(`id: "${city}"`);
    const end = destinationRegistry.indexOf("\n  {\n    id:", start + 1);
    const entry = destinationRegistry.slice(start, end < 0 ? undefined : end);
    assert.match(entry, /dateModified: "2026-08-22"/u, `${city} modified`);
    assert.match(entry, /sourceReviewedDate: "2026-08-22"/u, `${city} reviewed`);
  }

  const homepage = await source("lib/homepageEditorial.ts");
  const order = homepage.slice(
    homepage.indexOf("const editorialLeadOrder"),
    homepage.indexOf("] as const;", homepage.indexOf("const editorialLeadOrder")),
  );
  const orderedIds = [...order.matchAll(/"([^"]+)"/gu)].map((match) => match[1]);
  assert.ok(orderedIds.indexOf("great-wall-section-selector-from-beijing") < 18);
  assert.ok(orderedIds.indexOf("lunar-new-year-customs-for-visitors") < 18);

  const searchMap = JSON.parse(await source("docs/organic-growth/search-map.json"));
  const cny = searchMap.coverage.published.find((entry) =>
    entry.id === "lunar-new-year-customs-for-visitors"
  );
  assert.equal(cny.title, "Chinese New Year in China: Should Foreign Travellers Visit?");
  assert.equal(cny.targetIntent, "plan");
  const wallCandidate = searchMap.coverage.candidates
    .find((entry) => entry.candidateId === "destination-20260811-02");
  assert.equal(wallCandidate.cannibalizationOwner, "great-wall-section-selector-from-beijing");
  assert.equal(wallCandidate.executionStatus, "release-completed");
  assert.equal(wallCandidate.publicationStatus, "published");
  assert.equal(
    wallCandidate.releasePr,
    "https://github.com/yangchunxuan/travel-china-with-xuan/pull/86",
  );

  const publicBodies = (await Promise.all([
    "content/guides/great-wall-section-selector-from-beijing",
    "content/guides/lunar-new-year-customs-for-visitors",
    "content/guides/forbidden-city-for-foreign-visitors",
    "content/destinations/beijing",
    "content/destinations/shanghai",
    "content/destinations/chengdu",
  ].flatMap((root) => locales.map((locale) => source(`${root}/body.${locale}.ts`))))).join("\n");
  assert.doesNotMatch(publicBodies, /US\$\s*(?:69|129)|(?:69|129)\s*(?:USD|美元)/iu);
});
