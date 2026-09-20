import assert from "node:assert/strict";
import test from "node:test";
import { tourContactDraftText, tourContactNote, referralSources } from "../../lib/tourContactDraft.ts";
import { tourWhatsAppHref } from "../../lib/tourContact.ts";
import { buildPrivateTourMailtoHref, getPrivateTourInquiryContext } from "../../lib/privateTourInquiryContext.ts";
import { currentPrivateTourQuoteFormVersion, privateTourQuoteSchemaVersion, homepageEmailPrivacyNoticeVersion, validateAndNormalizeInquiry } from "../../lib/inquiryContract.ts";

const slug = "shanghai-suzhou-hangzhou-6-day-private-tour";
const config = { allowedFormVersions: [currentPrivateTourQuoteFormVersion], allowedPrivacyNoticeVersions: [homepageEmailPrivacyNoticeVersion] };

test("switching to direct contact preserves each locale's selected trip, party, date and complete note", () => {
  for (const locale of ["en", "zh", "ko"]) for (const travelers of [2, 4]) {
    const context = getPrivateTourInquiryContext(slug, locale, { packageId: "standard-guided", travelers });
    const draft = { travelDate: "2027-03-12", note: "Two twin rooms.\n父母同行 & 杭州出发 + luggage", referralSource: "ChatGPT" };
    const expected = tourContactDraftText(locale, draft);
    const whatsapp = new URL(tourWhatsAppHref(locale, context, undefined, draft)).searchParams.get("text");
    const email = new URL(buildPrivateTourMailtoHref("test@example.invalid", locale, context, draft)).searchParams.get("body");
    for (const text of [whatsapp, email]) {
      assert.ok(text.includes(context.name));
      assert.ok(text.includes(String(travelers)));
      assert.ok(text.includes(expected));
      assert.ok(text.includes(draft.note));
    }
  }
});

test("unknown dates are explicit and empty discovery is not presented as AI attribution", () => {
  const text = tourContactDraftText("en", { travelDate: null, note: "", referralSource: "" });
  assert.equal(text, "Preferred arrival: Dates not decided yet");
  assert.equal(tourContactNote(""), null);
  assert.equal(tourContactNote(" only a note ", "forged"), "only a note");
  assert.equal(tourContactDraftText("en"), "");
});

test("self-reported discovery survives the quote contract in notes without changing measured attribution", () => {
  for (const source of referralSources) {
    const note = tourContactNote("旅".repeat(900), source);
    assert.ok(note.length <= 1000);
    const input = {
      schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion,
      entryPath: "private_tour_quote", locale: "en", contact: { channel: "email", email: "test@example.invalid" },
      productInterest: getPrivateTourInquiryContext(slug, "en", { packageId: "standard-guided", travelers: 4 }),
      travelDate: null, note, privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
      attribution: { landingPath: `/tours/${slug}/` }, experiment: null, antiAbuse: { companyWebsite: "" },
    };
    const result = validateAndNormalizeInquiry(input, config);
    assert.equal(result.ok, true, JSON.stringify(result));
    assert.equal(result.value.note, note);
    assert.deepEqual(result.value.attribution, { ...input.attribution, utmSource: null, utmMedium: null, utmCampaign: null });
    assert.ok(result.value.note.includes(`[Traveller-reported discovery: ${source}]`));
  }
});
