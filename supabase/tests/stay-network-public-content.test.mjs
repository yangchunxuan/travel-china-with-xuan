import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(here, "../..");
const read = (path) => readFile(resolve(repositoryRoot, path), "utf8");

const networkOwnerSlugs = [
  "china-hotel-near-metro",
  "china-accessible-hotel-room-verification",
  "foreigners-china-hotel",
  "china-last-night-before-international-flight",
];

function blockSignature(source) {
  return [...source.matchAll(/\{\s*id:\s*"([^"]+)"\s*,\s*type:\s*"([^"]+)"/gu)]
    .map((match) => `${match[1]}:${match[2]}`);
}

test("the destination registry retains seven published Hubs and truthful dates", async () => {
  const registry = await read("lib/destinationHubs.ts");
  const expected = {
    beijing: "2026-08-16",
    shanghai: "2026-08-16",
    xian: "2026-08-16",
    chengdu: "2026-08-17",
    guangzhou: "2026-08-17",
    hangzhou: "2026-08-20",
    zhangjiajie: "2026-08-20",
  };
  assert.match(
    registry,
    /export const destinationHubIds = \[\s*"beijing",\s*"shanghai",\s*"xian",\s*"chengdu",\s*"guangzhou",\s*"hangzhou",\s*"zhangjiajie",\s*\] as const;/u,
  );
  for (const [id, sourceReviewedDate] of Object.entries(expected)) {
    const start = registry.indexOf(`id: "${id}"`);
    assert.notEqual(start, -1, `${id} registry entry missing`);
    const header = registry.slice(start, start + 700);
    assert.match(header, /datePublished: "2026-08-(16|17|20)"/, `${id} must remain published`);
    assert.match(header, /dateModified: "2026-08-21"/, `${id} modified date`);
    assert.match(header, new RegExp(`sourceReviewedDate: "${sourceReviewedDate}"`), `${id} source date`);
  }
});

test("five locale-specific Hub bodies keep parity and supplier-neutral handoffs", async () => {
  for (const city of ["beijing", "shanghai", "xian", "chengdu", "guangzhou"]) {
    const localeSources = {};
    for (const locale of ["en", "zh", "ko"]) {
      const source = await read(`content/destinations/${city}/body.${locale}.ts`);
      localeSources[locale] = source;
      assert.match(source, /id:\s*"stay-quote-handoff"/u, `${city}/${locale} handoff`);
      assert.match(source, /\/#planner-contact/u, `${city}/${locale} human route`);
      for (const slug of networkOwnerSlugs) {
        const prefix = locale === "en" ? "" : `/${locale}`;
        assert.match(source, new RegExp(`href:\\s*"${prefix}/guides/${slug}/"`, "u"));
      }
    }
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.zh));
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.ko));
  }
});

test("Hangzhou and Zhangjiajie shared bodies carry three localized stay handoffs", async () => {
  for (const city of ["hangzhou", "zhangjiajie"]) {
    const source = await read(`content/destinations/${city}/body.shared.ts`);
    assert.match(source, /id:\s*"stay-owners"/u);
    assert.match(source, /id:\s*"stay-quote-handoff"/u);
    for (const slug of networkOwnerSlugs) {
      assert.equal(source.match(new RegExp(`"${slug}"`, "gu"))?.length, 3);
    }
  }
});

test("five city stay owners keep locale parity, links and factual review dates", async () => {
  const owners = {
    "shanghai-where-to-stay-first-trip": "2026-08-12",
    "xian-where-to-stay-city-wall-or-dayanta": "2026-08-12",
    "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba": "2026-08-12",
    "shenzhen-where-to-stay-futian-luohu-nanshan": "2026-08-13",
    "zhangjiajie-city-or-wulingyuan-hotel-base": "2026-08-13",
  };
  for (const [owner, expectedSourceDate] of Object.entries(owners)) {
    const localeSources = {};
    for (const locale of ["en", "zh", "ko"]) {
      const source = await read(`content/guides/${owner}/body.${locale}.ts`);
      localeSources[locale] = source;
      assert.match(
        source,
        owner.startsWith("zhangjiajie-") ? /id:\s*"consult"/u : /id:\s*"stay-quote-handoff"/u,
      );
      for (const slug of networkOwnerSlugs) {
        const prefix = locale === "en" ? "" : `/${locale}`;
        assert.match(source, new RegExp(`href:\\s*"${prefix}/guides/${slug}/"`, "u"));
      }
    }
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.zh));
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.ko));
    const metadata = JSON.parse(await read(`content/guides/${owner}/metadata.json`));
    assert.equal(metadata.dateModified, "2026-08-21");
    assert.equal(metadata.sourceReviewedDate, expectedSourceDate);
  }
});

test("nationwide owners preserve complete versus partial source reviews", async () => {
  const foreigners = JSON.parse(await read("content/guides/foreigners-china-hotel/metadata.json"));
  const accessible = JSON.parse(await read("content/guides/china-accessible-hotel-room-verification/metadata.json"));
  const lastNight = JSON.parse(await read("content/guides/china-last-night-before-international-flight/metadata.json"));
  const lastNightLog = await read("content/guides/china-last-night-before-international-flight/source-log.md");

  assert.deepEqual([foreigners.dateModified, foreigners.sourceReviewedDate], ["2026-08-21", "2026-08-20"]);
  assert.deepEqual([accessible.dateModified, accessible.sourceReviewedDate], ["2026-08-21", "2026-08-20"]);
  assert.deepEqual([lastNight.dateModified, lastNight.sourceReviewedDate], ["2026-08-21", "2026-08-11"]);
  assert.match(lastNightLog, /not a page-complete factual re-review/u);
});
