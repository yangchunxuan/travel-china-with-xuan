import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildPrivateCarServiceStructuredData, privateCarServicePath,
} from "../../lib/privateCarServices.ts";
import { getPrivateCarServiceCopy } from "../../lib/privateCarServicesI18n.ts";
import {
  privateCarServiceMessage, privateCarServiceShortTextMaxLength, privateCarServiceTextMaxLength,
} from "../../lib/privateCarServiceMessage.ts";

const locales = ["en", "zh", "ko"];
const draft = {
  kind: "intercity", cities: "上海 → 杭州", date: "2026-11-12", dateUndecided: false,
  travellers: "4", luggage: "3 suitcases + 2 small bags", pickup: "Shanghai hotel",
  pickupTime: "09:30", route: "Shanghai hotel → Hangzhou hotel\nOne stop requested",
  note: "Need a separately quoted guide",
};

test("a car enquiry preserves the requested transport facts in each language without inventing a price", () => {
  for (const locale of locales) {
    const copy = getPrivateCarServiceCopy(locale);
    const message = copy.enquiry.message;
    const text = privateCarServiceMessage(copy, locale, draft);
    const line = (label, value) => label + message.separator + value;
    for (const value of [
      copy.kinds.intercity.title, draft.cities, draft.date, draft.luggage, draft.pickup,
      draft.pickupTime, draft.route, draft.note,
    ]) assert.ok(text.includes(value), locale + ": preserve " + value);
    assert.ok(text.includes(line(message.travellers, "4")));
    assert.ok(text.includes(message.confirmation));
    assert.ok(text.endsWith("https://homegroundchina.com" + privateCarServicePath[locale]));
    assert.doesNotMatch(text, /(?:USD|CNY)\s*\d|[¥$₩]\s*\d/u);
  }
});

test("undecided dates override retained dates and impossible dates are not sent as confirmed dates", () => {
  const copy = getPrivateCarServiceCopy("en");
  const open = privateCarServiceMessage(copy, "en", { ...draft, dateUndecided: true });
  assert.ok(open.includes(copy.enquiry.message.datesOpen));
  assert.ok(!open.includes(draft.date));
  for (const date of ["2026-02-30", "2026-13-01", "2026-11-00", "tomorrow", ""]) {
    const text = privateCarServiceMessage(copy, "en", { ...draft, date });
    assert.ok(text.includes("Service start date: To confirm"), date);
  }
  assert.ok(privateCarServiceMessage(copy, "en", { ...draft, date: "2028-02-29" }).includes("2028-02-29"));
});

test("unknown transport kinds and invalid party sizes remain questions, never a service or vehicle promise", () => {
  const copy = getPrivateCarServiceCopy("zh");
  for (const travellers of ["", "0", "-2", "1.5", "NaN", "Infinity", "9007199254740992"]) {
    const text = privateCarServiceMessage(copy, "zh", { ...draft, travellers });
    assert.ok(text.includes("同行人数：待确认"), travellers);
  }
  const unknown = privateCarServiceMessage(copy, "zh", { ...draft, kind: "unknown-car" });
  assert.ok(unknown.includes("用车类型：待确认"));
  assert.ok(!unknown.includes("unknown-car"));
  // A larger party is valid as an enquiry; it does not imply one vehicle's capacity.
  const large = privateCarServiceMessage(copy, "zh", { ...draft, travellers: "21" });
  assert.ok(large.includes("同行人数：21"));
  assert.ok(large.includes(copy.enquiry.message.confirmation));
});

test("free text keeps useful route lines, removes control characters and remains bounded", () => {
  const copy = getPrivateCarServiceCopy("en");
  const text = privateCarServiceMessage(copy, "en", {
    ...draft,
    cities: "Beijing\u0007\nShanghai",
    luggage: "A".repeat(500),
    route: "B".repeat(1000),
    note: "C".repeat(1000),
  });
  assert.ok(text.includes("City or cities: Beijing Shanghai"));
  assert.doesNotMatch(text, /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u);
  assert.ok(text.includes("A".repeat(privateCarServiceShortTextMaxLength)));
  assert.ok(!text.includes("A".repeat(privateCarServiceShortTextMaxLength + 1)));
  assert.ok(!text.includes("B".repeat(privateCarServiceTextMaxLength + 1)));
  assert.ok(!text.includes("C".repeat(privateCarServiceTextMaxLength + 1)));
});

test("three-language page facts and JSON-LD keep the custom-quote boundary and exact visible FAQ text", () => {
  for (const locale of locales) {
    const copy = getPrivateCarServiceCopy(locale);
    const json = buildPrivateCarServiceStructuredData(locale, copy);
    const nodes = json["@graph"];
    assert.deepEqual(nodes.map((node) => node["@type"]), ["WebPage", "Service", "BreadcrumbList", "FAQPage"]);
    const service = nodes.find((node) => node["@type"] === "Service");
    assert.deepEqual(service.provider, { "@id": "https://homegroundchina.com/#organization" });
    assert.equal(service.name, copy.name);
    assert.equal(service.description, copy.lede);
    const faq = nodes.find((node) => node["@type"] === "FAQPage");
    assert.deepEqual(faq.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text })), copy.faq);
    const all = JSON.stringify({ copy, json });
    assert.doesNotMatch(all, /"price"|"availability"|"aggregateRating"|"review"|"offers"/u, locale);
    assert.doesNotMatch(all, /(?:USD|CNY)\s*\d|[¥$₩]\s*\d|\d+\s*(?:元|위안)/u, locale);
    assert.doesNotMatch(all, /8[- ]?hours?|8小时|8시간|\d+[- ]?seat|退款\d+|guaranteed availability/iu, locale);
    assert.doesNotMatch(all, /English-speaking driver|英语司机|영어 기사|영어 운전기사/u, locale);
  }
});

test("the dedicated draft stays out of the generic intake and uses the page's own header enquiry anchor", async () => {
  const [page, enquiry] = await Promise.all([
    readFile(new URL("../../components/PrivateCarServicesPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../../components/PrivateCarServiceEnquiry.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /plannerHrefOverride=\{enquire\}/u);
  assert.match(enquiry, /data-contact-card-direct=""/u);
  assert.match(enquiry, /reportValidity\(\)/u);
  assert.match(enquiry, /<TourDateField/u);
  assert.match(enquiry, /locale === "ko" \? <KakaoTalkContact/u);
  assert.doesNotMatch(enquiry, /fetch\(|v1-inquiries|privateTourQuoteApiUrl|fullTripSupportNeeds/u);
});
