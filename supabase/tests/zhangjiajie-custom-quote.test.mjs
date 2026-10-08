import assert from "node:assert/strict";
import test from "node:test";
import {
  buildPrivateTourInquiryHref, buildZhangjiajieCustomGroupInquiryHref,
  getPrivateTourInquiryContextFromSearchParams, getPrivateTourInquirySubmissionContext,
  privateTourInquiryStayPreference, buildPrivateTourMailtoHref,
} from "../../lib/privateTourInquiryContext.ts";
import { customTourContactNoteMaxLength, tourContactNote, tourContactDraftText, referralSources } from "../../lib/tourContactDraft.ts";
import { tourWhatsAppHref } from "../../lib/tourContact.ts";
import { validateAndNormalizeInquiry, privateTourQuoteSchemaVersion, currentPrivateTourQuoteFormVersion, homepageEmailPrivacyNoticeVersion } from "../../lib/inquiryContract.ts";

const classic = "zhangjiajie-4-day-private-tour";
const tours = [classic, "zhangjiajie-forest-4-day-private-tour", "zhangjiajie-furong-fenghuang-7-day-private-tour"];
const stays = ["selected-city-stay", "spacious-premium-stay", "distinctive-mountain-stay"];
const config = { allowedFormVersions: [currentPrivateTourQuoteFormVersion], allowedPrivacyNoticeVersions: [homepageEmailPrivacyNoticeVersion] };
const parse = (href, locale = "en") => getPrivateTourInquiryContextFromSearchParams(new URL(href, "https://homegroundchina.com").searchParams, locale);

test("Zhangjiajie custom-party links reopen the product request without a published group price", () => {
  for (const locale of ["en", "zh", "ko"]) for (const slug of tours) {
    const prefix = locale === "en" ? "/" : `/${locale}/`;
    const href = buildZhangjiajieCustomGroupInquiryHref(prefix, slug);
    assert.equal(new URL(href, "https://homegroundchina.com").pathname, `${prefix}tours/${slug}/`);
    assert.deepEqual(parse(href, locale).customGroup, {});
    assert.equal(parse(href, locale).selection, undefined);
    assert.equal(new URL(href, "https://homegroundchina.com").hash, "#planner-contact");
  }
});

test("a requested 3/5-person party and controlled stay reach messages and the deployed quote contract", () => {
  for (const locale of ["en", "zh", "ko"]) for (const slug of tours) {
    const preferences = slug === classic ? stays : [undefined];
    for (const stayId of preferences) for (const requestedTravelers of [3, 5]) {
      const prefix = locale === "en" ? "/" : `/${locale}/`;
      const context = parse(buildZhangjiajieCustomGroupInquiryHref(prefix, slug, stayId), locale);
      const draft = { travelDate: null, note: "Quiet rooms, please.", requestedTravelers, stayPreference: privateTourInquiryStayPreference(context, "en"), referralSource: "Google" };
      const expected = tourContactDraftText(locale, draft);
      for (const href of [tourWhatsAppHref(locale, context, undefined, draft), buildPrivateTourMailtoHref("test@example.invalid", locale, context, draft)]) {
        const url = new URL(href);
        const message = (url.searchParams.get("text") || url.searchParams.get("body")).replaceAll("\r\n", "\n");
        assert.ok(message.includes(context.name));
        assert.ok(message.includes(expected));
        assert.ok(!message.includes("6 travellers"));
      }
      const submitted = getPrivateTourInquirySubmissionContext(context, locale);
      assert.equal(submitted.customGroup, undefined);
      assert.equal(submitted.selection, undefined);
      const input = {
        schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion,
        entryPath: "private_tour_quote", locale, contact: { channel: "email", email: "test@example.invalid" },
        productInterest: submitted, travelDate: null,
        note: tourContactNote(draft.note, draft.referralSource, requestedTravelers, draft.stayPreference),
        privacyNoticeVersion: homepageEmailPrivacyNoticeVersion, attribution: { landingPath: `${prefix}tours/${slug}/` },
        experiment: null, antiAbuse: { companyWebsite: "" },
      };
      const result = validateAndNormalizeInquiry(input, config);
      assert.equal(result.ok, true, JSON.stringify(result));
      assert.ok(result.value.note.includes(`[Requested group size: ${requestedTravelers} travellers]`));
      if (stayId) assert.ok(result.value.note.includes(`[Preferred stay: ${draft.stayPreference}; subject to confirmation]`));
      assert.equal(result.value.productInterest.selection, undefined);
    }
  }
});

test("custom-party and stay requests reject ambiguous or forged price contexts", () => {
  const valid = new URL(buildZhangjiajieCustomGroupInquiryHref("/", classic, stays[0]), "https://homegroundchina.com");
  // Add parameters through URLSearchParams so the fragment cannot hide them.
  for (const [key, value] of [["stay", "forged"], ["quote", "published"], ["tour", "beijing-highlights-5-day-private-tour"]]) {
    const url = new URL(valid); url.searchParams.set(key, value); assert.equal(parse(url.href), null);
  }
  for (const key of ["quote", "stay"]) { const url = new URL(valid); url.searchParams.append(key, url.searchParams.get(key)); assert.equal(parse(url.href), null); }
  const mixed = new URL(valid); mixed.searchParams.set("package", stays[0]); mixed.searchParams.set("travelers", "6"); assert.equal(parse(mixed.href), null);
  assert.throws(() => buildZhangjiajieCustomGroupInquiryHref("/", tours[1], stays[0]));
  assert.throws(() => buildZhangjiajieCustomGroupInquiryHref("/", "beijing-highlights-5-day-private-tour"));
});

test("existing six-person stays retain their controlled selection and unchanged submission", () => {
  for (const stay of stays) {
    const context = parse(buildPrivateTourInquiryHref("/", classic, "private_tour", { packageId: stay, travelers: 6 }));
    assert.deepEqual(context.selection, { packageId: stay, travelers: 6 });
    assert.equal(context.customGroup, undefined);
    assert.deepEqual(getPrivateTourInquirySubmissionContext(context, "en"), context);
  }
});

test("maximum custom-request notes retain room for a preference, actual party and discovery", () => {
  for (const source of referralSources) for (const preference of ["Selected City Stay", "Spacious Premium Stay", "Distinctive Mountain Stay"]) {
    const note = tourContactNote("旅".repeat(customTourContactNoteMaxLength), source, 99, preference);
    assert.ok(note.length <= 1000, `${source}: ${note.length}`);
    assert.ok(note.includes("旅".repeat(customTourContactNoteMaxLength)));
  }
  assert.equal(tourContactNote("note", "", 3, "forged"), "[Requested group size: 3 travellers]\n\nnote");
});
