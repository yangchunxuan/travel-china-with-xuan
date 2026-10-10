import assert from "node:assert/strict";
import test from "node:test";
import { encode } from "uqr";
import { getFullTripSupportCopy } from "../../lib/fullTripSupportI18n.ts";
import { fullTripSupportMessage } from "../../lib/fullTripSupportMessage.ts";
import { selectWhatsAppQr } from "../../lib/whatsappQr.ts";
import { whatsappQrCandidates } from "../../lib/contactCard.ts";
import { homegroundWhatsAppHref, kakaoTalkInquiryText } from "../../lib/tourContact.ts";

const locales = ["en", "zh", "ko"];
const normalCities = { en: "Beijing, Xi'an", zh: "北京、西安", ko: "베이징, 시안" };
const budgetCurrency = { en: "USD", zh: "CNY", ko: "KRW" };

function brief(locale, extra = {}) {
  const copy = getFullTripSupportCopy(locale);
  const draft = {
    budget: "9000", currency: budgetCurrency[locale], basis: "person", travellers: "3",
    days: "8", month: locale === "en" ? "October" : "10", cities: normalCities[locale], note: "",
    pageUrl: `https://homegroundchina.com/${locale === "en" ? "" : `${locale}/`}services/full-trip-support/`,
    ...extra,
  };
  const message = fullTripSupportMessage(copy, draft);
  const href = homegroundWhatsAppHref(message);
  return { copy, draft, message, href };
}

function verifySelection(fixture) {
  const originalHref = fixture.href;
  const selected = selectWhatsAppQr(originalHref);
  assert.ok(selected, "at least the complete first-line brief must encode");
  const chosenText = new URL(selected.href).searchParams.get("text");
  assert.equal(chosenText.split("\n")[0], fixture.message.split("\n")[0],
    "budget, currency, basis, party, days, month and all cities survive QR fallback");
  const candidates = whatsappQrCandidates(originalHref);
  assert.ok(candidates.includes(selected.href), "no new or rewritten message is invented for the QR");
  const encodable = candidates.flatMap(href => {
    try { return [{ href, version: encode(href, { ecc: "M", border: 0 }).version }]; }
    catch { return []; }
  });
  const comfortable = encodable.find(candidate => candidate.version <= 15);
  if (comfortable) assert.equal(selected.href, comfortable.href, "retain the earliest complete candidate that fits");
  else assert.equal(selected.qr.version, Math.min(...encodable.map(candidate => candidate.version)), "use the smallest encodable candidate without discarding first-line facts");
  assert.equal(fixture.href, originalHref);
  assert.equal(new URL(fixture.href).searchParams.get("text"), fixture.message, "computer/mobile WhatsApp keeps the entire draft");
  const email = `mailto:fixture@example.invalid?body=${encodeURIComponent(fixture.message)}`;
  assert.equal(new URL(email).searchParams.get("body"), fixture.message, "email keeps the entire draft");
  const kakao = kakaoTalkInquiryText(fixture.message, { display: "010-0000-0000", digits: "01000000000" });
  assert.ok(kakao.startsWith(fixture.message), "Kakao keeps the entire draft before its contact suffix");
  return selected;
}

test("ordinary WhatsApp and Messenger codes preserve their exact links", () => {
  for (const href of ["https://wa.me/8613174215999?text=Hello", "https://m.me/fixture-page"]) {
    const selected = selectWhatsAppQr(href);
    assert.equal(selected.href, href);
    assert.ok(selected.qr.version <= 15);
  }
});

for (const locale of locales) {
  test(`${locale}: a normal full-trip brief retains all facts and uses the smallest available fallback`, () => {
    const fixture = brief(locale);
    const selected = verifySelection(fixture);
    assert.ok(new URL(selected.href).searchParams.get("text").includes(normalCities[locale]));
  });

  for (const [kind, note] of [["Chinese", "旅".repeat(400)], ["Korean", "여".repeat(400)], ["emoji", "🧳".repeat(200)]]) {
    test(`${locale}: a maximum 400-code-unit ${kind} note cannot crash the QR fallback`, () => {
      const fixture = brief(locale, { note });
      assert.equal(note.length, 400, "the form uses the browser's UTF-16 maxlength contract");
      assert.throws(() => encode(fixture.href, { ecc: "M", border: 0 }), /Data too long/);
      const selected = verifySelection(fixture);
      assert.notEqual(selected.href, fixture.href);
      assert.ok(fixture.message.includes(note), "the full direct drafts still include all notes");
    });
  }

  test(`${locale}: maximum cities, counts and budget survive even when no version-15 QR fits`, () => {
    const cities = (locale === "ko" ? "베이징시안상하이항저우쑤저우" : "北京西安上海杭州苏州").repeat(6).slice(0, 60);
    assert.equal(cities.length, 60);
    const fixture = brief(locale, { cities, budget: "1234567890", basis: "group", travellers: "120", days: "365", month: locale === "en" ? "next April" : "12", note: "旅".repeat(400) });
    const selected = verifySelection(fixture);
    const text = new URL(selected.href).searchParams.get("text");
    for (const part of [cities, "120", "365", "1,234,567,890", budgetCurrency[locale], fixture.copy.brief.basis.group, fixture.draft.month]) assert.ok(text.includes(part), part);
    assert.ok(selected.qr.version > 15, "this supported boundary cannot meet the preferred version cap without losing facts");
    assert.ok(selected.qr.version <= 40);
  });
}

test("an all-unencodable draft returns unavailable rather than throwing from render", () => {
  const href = homegroundWhatsAppHref("旅".repeat(5000));
  assert.equal(selectWhatsAppQr(href), null);
});
