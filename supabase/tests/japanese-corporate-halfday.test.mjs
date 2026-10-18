import assert from "node:assert/strict";
import test from "node:test";
import { corporateTrips, getCorporateTrips } from "../../lib/corporateTravel.ts";
import { getCorporateHubCopy } from "../../lib/corporateTravelHub.ts";
const japaneseCorporateTrips = getCorporateTrips("ja");
const japaneseCorporateHubFaqs = getCorporateHubCopy("ja").faqs;
import { buildCorporateEnquiryDraft, corporateEnquiryEmailHref } from "../../lib/corporateEnquiryDraft.ts";
import { terracottaHalfDayCopy, terracottaHalfDayPaths } from "../../lib/terracottaHalfDayTour.ts";
import { japaneseHalfDayCopy, japaneseHalfDayMessage, japaneseHalfDayPath, japaneseHalfDayGuideNote } from "../../lib/japaneseTerracottaHalfDay.ts";

test("Japanese corporate samples retain the source route, images, day count and complete booking questions", () => {
  assert.equal(japaneseCorporateTrips.length, corporateTrips.length);
  assert.equal(japaneseCorporateHubFaqs.length, getCorporateHubCopy("en").faqs.length);
  for (const source of corporateTrips) {
    const trip = japaneseCorporateTrips.find((item) => item.slug === source.slug);
    assert.ok(trip);
    assert.equal(trip.days.length, 4);
    assert.equal(trip.faqs.length, source.faqs.length);
    assert.equal(trip.hero.src, source.hero.src);
    assert.deepEqual(trip.days.map((day) => day.image.src), source.days.map((day) => day.image.src));
    assert.equal(trip.duration, "3泊4日");
    assert.ok(trip.scope.some((item) => item.includes("英語ガイド") && item.includes("日本語ガイド") && item.includes("追加料金")));
    assert.match(trip.title, /[ぁ-んァ-ヶ一-龯]/u);
    assert.equal(new Set(trip.faqs.map((faq) => faq.question)).size, trip.faqs.length);
    assert.doesNotMatch(JSON.stringify(trip), /確保済み|最安値保証|空室保証|\$\d|¥\d/u);
  }
  assert.match(japaneseCorporateTrips[0].groupSize, /10〜30/);
  assert.match(japaneseCorporateTrips[1].groupSize, /10〜24/);
});

test("Japanese corporate briefs preserve customer details and locale without sending or quoting", () => {
  const draft = { company: "Sample\nCompany", name: "試験担当者", email: "preview@example.invalid", people: "18", timing: "2027年5月・4日間", purpose: "meeting", trip: "shanghai-suzhou-4-day-company-retreat", budget: "15,000米ドル", notes: "1名1室とハラール食を希望" };
  const japanese = buildCorporateEnquiryDraft(draft, "ja");
  assert.match(japanese, /会社名: Sample Company/);
  assert.match(japanese, /予定人数：18名/);
  assert.match(japanese, /日程・日数: 2027年5月・4日間/);
  assert.match(japanese, /1名1室とハラール食を希望/);
  assert.match(japanese, /日本語ガイドの対応可否・追加料金/);
  assert.ok(japanese.endsWith("https://homegroundchina.com/ja/corporate-travel/shanghai-suzhou-4-day-company-retreat/"));
  const email = new URL(corporateEnquiryEmailHref("hello@example.invalid", draft, japanese, "ja"));
  assert.equal(email.searchParams.get("body"), japanese);
  assert.match(email.searchParams.get("subject"), /社員旅行のお問い合わせ/);
  assert.throws(() => buildCorporateEnquiryDraft({ ...draft, people: "0" }, "ja"), /人数/);
  assert.throws(() => buildCorporateEnquiryDraft({ ...draft, timing: "" }, "ja"), /希望月/);
  assert.match(buildCorporateEnquiryDraft(draft), /^Hi Homeground/);
  assert.match(buildCorporateEnquiryDraft(draft), /Company: Sample Company/);
});

test("Japanese half-day keeps the guide language and source visit scope, with Japanese draft and local next steps", () => {
  assert.equal(japaneseHalfDayPath, terracottaHalfDayPaths.ja);
  assert.equal(japaneseHalfDayCopy.stops.length, terracottaHalfDayCopy.en.stops.length);
  assert.equal(japaneseHalfDayCopy.faq.length, terracottaHalfDayCopy.en.faq.length);
  assert.equal(japaneseHalfDayCopy.included.length, terracottaHalfDayCopy.en.included.length);
  assert.equal(japaneseHalfDayCopy.excluded.length, terracottaHalfDayCopy.en.excluded.length);
  assert.ok(japaneseHalfDayCopy.included.some((item) => item.includes("英語プライベートガイド")));
  assert.match(japaneseHalfDayGuideNote, /日本語ガイド.*追加料金/u);
  assert.match(japaneseHalfDayCopy.timingNote, /約5〜6時間.*保証するものではありません/u);
  assert.match(japaneseHalfDayCopy.enquiryNote, /送信するまで.*届きません/u);
  assert.match(japaneseHalfDayCopy.readLinks[1].path, /^\/ja\/services\/china-attraction-reservations\/.*#reservation-form$/);
  assert.equal(japaneseHalfDayCopy.readLinks[2].path, "/ja/tours/xian-terracotta-warriors-5-day-private-tour/");
  const message = japaneseHalfDayMessage();
  assert.match(message, /希望日・出発時間帯/);
  assert.match(message, /大人の人数・子どもの年齢/);
  assert.match(message, /日本語ガイドの対応可否・追加料金/);
  assert.ok(message.endsWith(`https://homegroundchina.com${japaneseHalfDayPath}`));
});
