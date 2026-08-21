import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const slug = "yangshuo-town-or-yulong-river-where-to-stay";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

function blockSignature(text) {
  return [...text.matchAll(/\{\s*id:\s*"([^"]+)"\s*,\s*type:\s*"([^"]+)"/gu)]
    .map((match) => `${match[1]}:${match[2]}`);
}

test("Yangshuo stay-base guide publishes complete localized metadata", async () => {
  const metadata = JSON.parse(
    await source(`content/guides/${slug}/metadata.json`),
  );

  assert.equal(metadata.id, slug);
  assert.equal(metadata.type, "planning");
  assert.equal(metadata.pillar, "stay-location-trip-fit");
  assert.equal(metadata.format, "town-or-countryside-base-decision");
  assert.deepEqual(metadata.destinations, ["guilin", "yangshuo"]);
  assert.deepEqual(
    [metadata.datePublished, metadata.dateModified, metadata.sourceReviewedDate],
    ["2026-08-21", "2026-08-21", "2026-08-21"],
  );
  assert.deepEqual(metadata.search, {
    section: "stay",
    family: "combined-decision",
    primaryIntent: "plan",
  });
  assert.equal(metadata.imageWidth, 1600);
  assert.equal(metadata.imageHeight, 1000);

  const localePrefixes = { en: "", zh: "/zh", ko: "/ko" };
  for (const [locale, prefix] of Object.entries(localePrefixes)) {
    const entry = metadata.locales[locale];
    assert.equal(entry.path, `${prefix}/guides/${slug}/`);
    assert.ok(entry.title.length > 10, `${locale} title`);
    assert.ok(entry.headline.length > 10, `${locale} headline`);
    assert.ok(entry.description.length > 40, `${locale} description`);
    assert.ok(entry.heroAlt.length > 20, `${locale} hero alt`);
    assert.match(entry.heroCredit.text, /Liuxingy/u);
    assert.equal(entry.heroCredit.licenseLabel, "CC BY-SA 4.0");
    assert.equal(
      entry.heroCredit.licenseUrl,
      "https://creativecommons.org/licenses/by-sa/4.0/",
    );
  }
});

test("three Yangshuo locale bodies keep one decision structure and owner handoffs", async () => {
  const bodies = Object.fromEntries(
    await Promise.all(
      ["en", "zh", "ko"].map(async (locale) => [
        locale,
        await source(`content/guides/${slug}/body.${locale}.ts`),
      ]),
    ),
  );

  assert.deepEqual(blockSignature(bodies.en), blockSignature(bodies.zh));
  assert.deepEqual(blockSignature(bodies.en), blockSignature(bodies.ko));

  const requiredBlocks = [
    "answer:callout",
    "decision-matrix:table",
    "schedule-town:list",
    "schedule-river:list",
    "weather-table:table",
    "mobility-check:list",
    "failure-table:table",
    "address-list:list",
    "dynamic-boundary:callout",
    "questions-list:list",
    "links:internal-links",
    "sources:sources",
  ];
  for (const block of requiredBlocks) {
    assert.ok(blockSignature(bodies.en).includes(block), `${block} missing`);
  }

  const localePrefixes = { en: "", zh: "/zh", ko: "/ko" };
  for (const [locale, prefix] of Object.entries(localePrefixes)) {
    const text = bodies[locale];
    assert.match(
      text,
      new RegExp(`href:\\s*"${prefix}/guides/guilin-yangshuo-transport-route/"`, "u"),
      `${locale} transport owner handoff`,
    );
    for (const owner of [
      "minsu-homestay-or-hotel-china",
      "china-accessible-hotel-room-verification",
      "foreigners-china-hotel",
    ]) {
      assert.match(
        text,
        new RegExp(`href:\\s*"${prefix}/guides/${owner}/"`, "u"),
        `${locale} ${owner} handoff`,
      );
    }
    assert.equal(
      (text.match(/reviewedAt: "2026-08-21"/gu) ?? []).length,
      9,
      `${locale} source set`,
    );
    assert.match(text, /https:\/\/wlt\.gxzf\.gov\.cn\//u);
    assert.match(text, /https:\/\/www\.ysylh\.cn\/matou\//u);
  }

  assert.match(bodies.en, /town[^"\n]*default/iu);
  assert.match(bodies.zh, /镇上[^"\n]*默认/u);
  assert.match(bodies.ko, /시내[^"\n]*기본/u);
});

test("Yangshuo guide keeps the accommodation boundary neutral and non-commercial", async () => {
  const bodies = await Promise.all(
    ["en", "zh", "ko"].map((locale) =>
      source(`content/guides/${slug}/body.${locale}.ts`),
    ),
  );
  const publicCopy = bodies.join("\n");

  for (const prohibited of [
    /planner-contact/iu,
    /US\$\s*(?:69|129)/iu,
    /人工住宿核对/u,
    /住宿核对服务/u,
    /human (?:accommodation|hotel|stay) (?:check|review)/iu,
    /유료 숙소/u,
  ]) {
    assert.doesNotMatch(publicCopy, prohibited);
  }
  assert.doesNotMatch(publicCopy, /booking\.com|trip\.com|agoda|ctrip/iu);
  assert.doesNotMatch(publicCopy, /live (?:room )?(?:inventory|availability)/iu);

  const boundary = await source(`content/guides/${slug}/canonical-boundary.md`);
  assert.match(boundary, /guilin-yangshuo-transport-route/u);
  assert.match(boundary, /begins only after the traveller has chosen Yangshuo/iu);
  assert.match(boundary, /No hotel list, brand endorsement, price/u);
  assert.match(boundary, /No homepage, sitemap implementation, hand-written guide registry/u);
  assert.match(boundary, /stay-hotel-types-scenic-bases/u);

  const dynamicFacts = await source(`content/guides/${slug}/dynamic-facts.md`);
  assert.match(dynamicFacts, /Highly dynamic/u);
  assert.match(dynamicFacts, /No price, time, route recommendation/u);
  assert.match(dynamicFacts, /Ride-hailing supply and taxi reach/u);
});

test("Yangshuo hero is the documented real CC BY-SA field photograph", async () => {
  const imagePath = `public/images/guides/${slug}/hero-1600.webp`;
  const bytes = await readFile(new URL(`../../${imagePath}`, import.meta.url));
  const details = await stat(new URL(`../../${imagePath}`, import.meta.url));
  const digest = createHash("sha256").update(bytes).digest("hex");

  assert.equal(details.size, 257000);
  assert.equal(
    digest,
    "9c22593ff64729770349a5cd10164d4daed1aa18efaa9ab39f68a1a1ceafaff6",
  );

  const sourceLog = await source(`content/guides/${slug}/source-log.md`);
  for (const expected of [
    "Liuxingy",
    "2024-02-11 15:52:34",
    "CC BY-SA 4.0",
    "8b2f9d57979a76d33df682a1e35cff2da4f873c6d4d36abbb7dfdbff96505acb",
    digest,
    "6000 × 4000",
    "1600 × 1000",
    "no generation, generative fill or synthetic alteration",
  ]) {
    assert.match(sourceLog, new RegExp(expected, "u"));
  }
  assert.match(sourceLog, /upload\.wikimedia\.org\/wikipedia\/commons/u);

  const imagePlan = await source(`content/guides/${slug}/image-plan.md`);
  assert.match(imagePlan, /real Yulong River countryside photograph/u);
  assert.match(imagePlan, /does not identify a hotel/iu);
});
