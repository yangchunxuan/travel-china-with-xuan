import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("Singapore visa owner gives the bounded 30-day answer in all locales", async () => {
  const copy = await source("lib/singaporeChinaVisaI18n.ts");
  const page = await source("components/SingaporeChinaVisaPage.tsx");
  const route = await source(
    "app/(default)/guides/do-singaporeans-need-visa-china/page.tsx",
  );
  const localizedRoute = await source(
    "app/(localized)/[locale]/guides/do-singaporeans-need-visa-china/page.tsx",
  );

  assert.match(copy, /Do Singaporeans Need a Visa for China\? The 30-Day Rule/);
  assert.match(copy, /新加坡护照去中国需要签证吗？30 天互免签证规则/);
  assert.match(copy, /싱가포르 여권으로 중국 비자가 필요할까\? 30일 무비자 규정/);
  assert.match(copy, /ordinary Singapore passport may enter China visa-free for a stay of up to 30 days/);
  assert.match(copy, /n147418\/n147463\/c181470\/content\.html/);
  assert.match(copy, /n147418\/n147463\/c156110\/content\.html/);
  assert.match(copy, /n147418\/n147468\/c187308\/content\.html/);
  assert.doesNotMatch(copy, /each entry gets its own 30 days|no cumulative cap/iu);
  assert.doesNotMatch(copy, /每次入境都会重新获得30天|多次入境没有累计天数上限/u);
  assert.doesNotMatch(copy, /입국할 때마다 새로운 30일|누적 체류일수 상한은 없습니다/u);
  assert.match(page, /reviewedAt=\{copy\.sourceReviewedAt\}/);
  assert.match(route, /title: copy\.title/);
  assert.match(route, /description: copy\.metadataDescription/);
  assert.match(localizedRoute, /getSingaporeChinaVisaCopy\(locale\)/);
});

test("foreign-passport hotel owner keeps the FAQ and receives contextual links", async () => {
  const english = await source("content/guides/foreigners-china-hotel/body.en.ts");
  const chinese = await source("content/guides/foreigners-china-hotel/body.zh.ts");
  const korean = await source("content/guides/foreigners-china-hotel/body.ko.ts");
  const metroEnglish = await source("content/guides/china-hotel-near-metro/body.en.ts");
  const beijingEnglish = await source(
    "content/guides/beijing-where-to-stay-first-trip/body.en.ts",
  );
  const imagePlan = await source("content/guides/foreigners-china-hotel/image-plan.md");

  for (const body of [english, chinese, korean]) {
    for (const id of [
      "faq-platform-label-heading",
      "faq-confirmed-refusal-heading",
      "faq-registration-heading",
      "faq-self-cancel-heading",
      "faq-channel-heading",
    ]) {
      assert.match(body, new RegExp(`id: "${id}"`));
    }
    assert.match(body, /12367/);
    assert.match(body, /12345/);
    assert.match(body, /12315/);
    assert.match(body, /110/);
  }

  assert.match(metroEnglish, /href: "\/guides\/foreigners-china-hotel\/"/);
  assert.match(beijingEnglish, /href: "\/guides\/foreigners-china-hotel\/"/);
  assert.match(imagePlan, /ASSET PUBLISHED/);
  assert.match(imagePlan, /real documentary photograph; no generative edit/);

  const hero = await stat(
    new URL(
      "../../public/images/guides/foreigners-china-hotel/hero-1600.webp",
      import.meta.url,
    ),
  );
  assert.ok(hero.size > 0);
});
