import assert from "node:assert/strict";
import test from "node:test";
import { tourContactDraftText, tourContactNote, parseRequestedTravelers, referralSources } from "../../lib/tourContactDraft.ts";
import { tourWhatsAppHref } from "../../lib/tourContact.ts";
import { buildPrivateTourDetailHref, buildPrivateTourMailtoHref, getPrivateTourDetailSelectionFromSearchParams, getPrivateTourInquiryContext, getPrivateTourInquirySelection } from "../../lib/privateTourInquiryContext.ts";
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
    assert.ok(email.includes("\r\n"));
    for (const rawText of [whatsapp, email]) {
      const text = rawText.replaceAll("\r\n", "\n");
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

test("a custom Jiangnan party size reaches the quote and direct messages without a four-person price tier", () => {
  for (const value of ["1", "3", "5", "7", "99"]) assert.equal(parseRequestedTravelers(value), Number(value));
  for (const value of ["", "0", "100", "1.5", "-2", "abc"]) assert.equal(parseRequestedTravelers(value), null);
  for (const locale of ["en", "zh", "ko"]) {
    for (const tourSlug of ["shanghai-suzhou-5-day-private-tour", slug]) {
      const context = getPrivateTourInquiryContext(tourSlug, locale);
      assert.equal(context.selection, undefined);
      const draft = { travelDate: null, note: "Quiet rooms, please.", referralSource: "ChatGPT", requestedTravelers: 7 };
      const whatsapp = new URL(tourWhatsAppHref(locale, context, undefined, draft)).searchParams.get("text");
      const email = new URL(buildPrivateTourMailtoHref("test@example.invalid", locale, context, draft)).searchParams.get("body");
      const group = tourContactDraftText(locale, draft).split("\n")[1];
      for (const message of [whatsapp, email]) {
        assert.ok(message.includes(context.name));
        assert.ok(message.includes(group));
        assert.ok(!message.includes("4 travellers"));
      }
      const note = tourContactNote(draft.note, draft.referralSource, draft.requestedTravelers);
      const input = {
        schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion,
        entryPath: "private_tour_quote", locale, contact: { channel: "email", email: "test@example.invalid" },
        productInterest: context, travelDate: null, note, privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
        attribution: { landingPath: `${locale === "en" ? "" : `/${locale}`}/tours/${tourSlug}/` }, experiment: null,
        antiAbuse: { companyWebsite: "" },
      };
      const result = validateAndNormalizeInquiry(input, config);
      assert.equal(result.ok, true, JSON.stringify(result));
      assert.equal(result.value.productInterest.selection, undefined);
      assert.ok(result.value.note.includes("[Requested group size: 7 travellers]"));
    }
  }
});

test("the Jiangnan comparison can carry a published 2- or 4-person selection in both directions", () => {
  const tours = ["shanghai-suzhou-5-day-private-tour", slug];
  for (const travelers of [2, 4]) for (const origin of tours) {
    const target = tours.find(candidate => candidate !== origin);
    const selection = getPrivateTourInquirySelection(origin, "standard-guided", travelers);
    const targetSelection = getPrivateTourInquirySelection(target, selection.packageId, selection.travelers);
    const href = buildPrivateTourDetailHref(`/tours/${target}/`, target, targetSelection);
    assert.equal(getPrivateTourDetailSelectionFromSearchParams(target, new URL(href, "https://homegroundchina.com").searchParams)?.travelers, travelers);
  }
});

test("an unsent quote stays in this tab by tour, restores intact, expires and clears after saving", async () => {
  const values = new Map();
  const original = Object.getOwnPropertyDescriptor(globalThis, "sessionStorage");
  Object.defineProperty(globalThis, "sessionStorage", { configurable: true, value: {
    getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)), removeItem: (key) => values.delete(key),
  } });
  try {
    const { readTourQuoteDraft, saveTourQuoteDraft, clearTourQuoteDraft, tourQuoteDraftLifetimeMs } = await import(`../../lib/tourContactDraft.ts?draft=${Date.now()}`);
    const draft = { email: "traveller@example.com", date: "2027-04-03", undecided: false, note: "Two twin rooms", referralSource: "Instagram" };
    saveTourQuoteDraft("quote", slug, draft, 1_000);
    assert.deepEqual(readTourQuoteDraft("quote", slug, 2_000), draft, "the same tour's dialog gets everything back");
    assert.equal(readTourQuoteDraft("quote", "beijing-highlights-5-day-private-tour", 2_000), null, "another tour starts empty");
    assert.equal(readTourQuoteDraft("ja-quote", slug, 2_000), null, "each dialog keeps its own draft");
    assert.equal(readTourQuoteDraft("quote", slug, 1_000 + tourQuoteDraftLifetimeMs), null, "half an hour without an edit forgets it");
    assert.equal(values.size, 0, "an expired draft is deleted, not just ignored");
    saveTourQuoteDraft("quote", slug, draft, 1_000);
    clearTourQuoteDraft("quote", slug);
    assert.equal(readTourQuoteDraft("quote", slug, 2_000), null, "a saved quote leaves nothing behind");
    saveTourQuoteDraft("quote", slug, { email: " ", date: "", undecided: true, note: "", referralSource: "" }, 1_000);
    assert.equal(values.size, 0, "an empty form keeps nothing");
    values.set(`homeground-quote-draft.v1:quote:${slug}`, JSON.stringify({ ...draft, referralSource: "Myspace", date: "03/04/2027", savedAt: 1_000 }));
    assert.equal(readTourQuoteDraft("quote", slug, 2_000), null, "a tampered draft is refused");
    Object.defineProperty(globalThis, "sessionStorage", { configurable: true, get() { throw new Error("blocked"); } });
    assert.equal(readTourQuoteDraft("quote", slug, 2_000), null, "blocked storage never breaks the dialog");
    saveTourQuoteDraft("quote", slug, draft, 1_000);
  } finally {
    if (original) Object.defineProperty(globalThis, "sessionStorage", original);
    else delete globalThis.sessionStorage;
  }
});

test("both quote dialogs restore the same tour's draft on reopening and clear it once the quote is saved", async () => {
  const { readFile } = await import("node:fs/promises");
  const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
  const [panel, japanese] = await Promise.all([read("components/TourContactPanel.tsx"), read("components/JapaneseInquiryDialog.tsx")]);
  assert.match(panel, /const kept = next \? readTourQuoteDraft\("quote", next\.slug\) : null;/);
  assert.match(panel, /updateStatus\("saved"\);\s*clearTourQuoteDraft\("quote", submitted\.productInterest\.slug\);/);
  assert.match(japanese, /const kept = detail\.slug \? readTourQuoteDraft\("ja-quote", detail\.slug\) : null;/);
  assert.match(japanese, /setStatus\("saved"\);\s*if \(context\) clearTourQuoteDraft\("ja-quote", context\.slug\);/);
  // Email, date, note and the source chip are kept as the traveller edits them.
  for (const [name, source] of [["panel", panel], ["japanese", japanese]]) {
    for (const field of ["email: event.target.value", "note: event.target.value", "referralSource: source", "undecided: event.target.checked"]) {
      assert.ok(source.includes(`remember({ ${field} })`), `${name} keeps ${field.split(":")[0]}`);
    }
  }
});
