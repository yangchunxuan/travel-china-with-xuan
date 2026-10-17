import assert from "node:assert/strict";
import test from "node:test";
import { fiveCitySmallGroupSlug as slug, fiveCitySmallGroupDepartures, isFiveCitySmallGroup, smallGroupDeparture, smallGroupInquiryCopy, smallGroupInquiryNote, smallGroupInquiryText } from "../../lib/smallGroupInquiry.ts";
import { getPrivateTourInquiryContext, buildPrivateTourMailtoHref } from "../../lib/privateTourInquiryContext.ts";
import { tourContactNote, tourContactDraftText } from "../../lib/tourContactDraft.ts";
import { tourContactMessageText } from "../../lib/tourContact.ts";
import { privateTourProducts } from "../../lib/privateTourProducts.ts";
import { currentPrivateTourQuoteFormVersion, privateTourQuoteSchemaVersion, homepageEmailPrivacyNoticeVersion, validateAndNormalizeInquiry } from "../../lib/inquiryContract.ts";

const config = { allowedFormVersions: [currentPrivateTourQuoteFormVersion], allowedPrivacyNoticeVersions: [homepageEmailPrivacyNoticeVersion] };
test("only the five-city 14-day small group offers these four published dates", () => {
  assert.equal(isFiveCitySmallGroup(slug), true);
  assert.equal(isFiveCitySmallGroup(slug.replace("small-group", "private")), false);
  assert.equal(isFiveCitySmallGroup("beijing-xian-silk-road-15-day-small-group-tour"), false);
  assert.deepEqual(fiveCitySmallGroupDepartures.map(d => d.start), ["2027-04-10", "2027-05-08", "2027-09-11", "2027-10-09"]);
  const product = privateTourProducts.find(p => p.slug === slug);
  const published = product.summary.en;
  assert.ok(published.includes("2027"));
  for (const departure of fiveCitySmallGroupDepartures) {
    const start = new Date(`${departure.start}T00:00:00Z`);
    const end = new Date(`${departure.end}T00:00:00Z`);
    const month = new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" }).format(start);
    assert.ok(published.includes(`${start.getUTCDate()}–${end.getUTCDate()} ${month}`), "inquiry dates must match the published product summary");
    assert.equal((Date.parse(departure.end) - Date.parse(departure.start)) / 86400000, 13);
    assert.equal(smallGroupDeparture(departure.start), departure);
  }
  for (const value of [null, "", "2027-04-11", "2026-04-10", "anything"]) assert.equal(smallGroupDeparture(value), null);
});

test("email and chat identify a small group and preserve the chosen departure, real party and room", () => {
  for (const locale of ["en", "zh", "ko"]) for (const travelers of [1, 2, 7, 12]) for (const departure of fiveCitySmallGroupDepartures) {
    const context = getPrivateTourInquiryContext(slug, locale, { packageId: "small-group-departure", travelers: 2 });
    const details = { departureDate: departure.start, roomPreference: travelers === 1 ? "single-room" : "twin-share" };
    const draft = { travelDate: departure.start, smallGroup: details, requestedTravelers: travelers, note: "Please confirm availability.", referralSource: "" };
    const text = smallGroupInquiryText(locale, details, travelers);
    assert.ok(tourContactDraftText(locale, draft).includes(text));
    const email = new URL(buildPrivateTourMailtoHref("test@example.invalid", locale, context, draft));
    assert.ok(email.searchParams.get("subject").startsWith(smallGroupInquiryCopy[locale].subject));
    const chat = tourContactMessageText(locale, context, undefined, draft);
    assert.ok(chat.startsWith(smallGroupInquiryCopy[locale].opening));
    for (const message of [email.searchParams.get("body").replaceAll("\r\n", "\n"), chat]) {
      assert.ok(message.includes(text));
      assert.ok(message.includes(context.name));
      assert.doesNotMatch(message, /this private tour|plan a private trip/);
    }
    assert.equal(context.selection.travelers, 2, "the published twin-share basis is never overwritten by the enquiry party size");
  }
});

test("undecided preferences stay explicit and do not silently become the first departure or two travellers", () => {
  for (const locale of ["en", "zh", "ko", "ja", "es", "fr"]) {
    const text = smallGroupInquiryText(locale, { departureDate: null, roomPreference: null }, null);
    assert.equal(text.split(smallGroupInquiryCopy[locale].undecided).length - 1, 3);
    assert.doesNotMatch(text, /2027|\b2\b/);
  }
});

test("controlled small-group preferences and real party survive the existing backend contract", () => {
  for (const locale of ["en", "zh", "ko", "ja"]) for (const start of [null, ...fiveCitySmallGroupDepartures.map(d => d.start)]) {
    const details = { departureDate: start, roomPreference: "single-room" };
    const note = smallGroupInquiryNote(tourContactNote("客".repeat(600), "ChatGPT", 1), details);
    assert.ok(note.length <= 1000);
    const input = {
      schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion,
      entryPath: "private_tour_quote", locale, contact: { channel: "email", email: "test@example.invalid" },
      productInterest: getPrivateTourInquiryContext(slug, locale, { packageId: "small-group-departure", travelers: 2 }),
      travelDate: start, note, privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
      attribution: { landingPath: `${locale === "en" ? "" : `/${locale}`}/tours/${slug}/` }, experiment: null, antiAbuse: { companyWebsite: "" },
    };
    const result = validateAndNormalizeInquiry(input, config);
    assert.equal(result.ok, true, JSON.stringify(result));
    assert.equal(result.value.note, note);
    assert.equal(result.value.travelDate, start);
    assert.ok(result.value.note.includes("Requested group size: 1 travellers"));
    assert.ok(result.value.note.includes("Single room"));
  }
});
