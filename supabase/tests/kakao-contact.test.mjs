import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { afterEach, test } from "node:test";
import { homegroundBusiness, homegroundKakaoTalkPhone } from "../../lib/homegroundBusiness.ts";
import { kakaoTalkCopy, kakaoTalkInquiryText, tourContactMessageText, tourWhatsAppHref, whatsAppHrefText } from "../../lib/tourContact.ts";
import { tourContactDraftText, tourContactNote, tourContactNoteMaxLength, customTourContactNoteMaxLength, referralSources } from "../../lib/tourContactDraft.ts";
import { getPrivateTourInquiryContext, privateTourInquirySelectionLabel } from "../../lib/privateTourInquiryContext.ts";
import { currentPrivateTourQuoteFormVersion, privateTourQuoteSchemaVersion, homepageEmailPrivacyNoticeVersion, validateAndNormalizeInquiry } from "../../lib/inquiryContract.ts";

const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const original = process.env.NEXT_PUBLIC_HOMEGROUND_KAKAOTALK_PHONE;
afterEach(() => { if (original === undefined) delete process.env.NEXT_PUBLIC_HOMEGROUND_KAKAOTALK_PHONE; else process.env.NEXT_PUBLIC_HOMEGROUND_KAKAOTALK_PHONE = original; });

test("the KakaoTalk number lives in one place, with a validated build-time override", () => {
  assert.deepEqual(homegroundBusiness.kakaoTalkPhone, { display: "010-6658-3226", e164: "+821066583226" });
  delete process.env.NEXT_PUBLIC_HOMEGROUND_KAKAOTALK_PHONE;
  assert.deepEqual(homegroundKakaoTalkPhone(), homegroundBusiness.kakaoTalkPhone);
  assert.deepEqual(homegroundKakaoTalkPhone(""), homegroundBusiness.kakaoTalkPhone);
  assert.deepEqual(homegroundKakaoTalkPhone("010 1234 5678"), { display: "010-1234-5678", e164: "+821012345678" });
  assert.deepEqual(homegroundKakaoTalkPhone("+821012345678"), { display: "010-1234-5678", e164: "+821012345678" });
  assert.deepEqual(homegroundKakaoTalkPhone("011-234-5678"), { display: "011-234-5678", e164: "+82112345678" });
  for (const unsafe of ["https://evil.invalid", "tel:01012345678", "02-123-4567", "8613174215999", "010-1234-56789", "+8201012345678", "010<script>"]) {
    assert.deepEqual(homegroundKakaoTalkPhone(unsafe), homegroundBusiness.kakaoTalkPhone, unsafe);
  }
});

test("the copied KakaoTalk text is the WhatsApp inquiry text plus the number, built by one shared function", () => {
  const context = getPrivateTourInquiryContext("shanghai-suzhou-5-day-private-tour", "ko", { packageId: "standard-guided", travelers: 2 });
  const draft = { travelDate: "2027-04-02", note: "부모님과 함께 갑니다.", referralSource: "Naver", requestedTravelers: null };
  const shared = tourContactMessageText("ko", context, undefined, draft);
  assert.equal(whatsAppHrefText(tourWhatsAppHref("ko", context, undefined, draft)), shared);
  assert.equal(privateTourInquirySelectionLabel(context, "ko"), "프라이빗 투어 · 2명 기준");
  const copied = kakaoTalkInquiryText(shared);
  for (const part of [context.name, "프라이빗 투어 · 2명 기준", "https://homegroundchina.com/ko/tours/shanghai-suzhou-5-day-private-tour/", "부모님과 함께 갑니다.", "Homeground를 알게 된 곳: Naver", "010-6658-3226"]) {
    assert.ok(copied.includes(part), part);
  }
  assert.ok(copied.startsWith(shared));
  assert.equal(whatsAppHrefText("not a url"), "");
  assert.match(kakaoTalkCopy.steps, /카카오톡 앱 → 친구 추가 → 연락처로 추가/u);
});

test("every private-tour quote offers the extended source list inside the 1,000-character note contract", () => {
  for (const name of ["Naver", "KakaoTalk", "Instagram", "YouTube", "ChatGPT", "Google", "Gemini", "Perplexity", "friend", "other"]) assert.ok(referralSources.includes(name), name);
  assert.equal(tourContactNoteMaxLength, 900);
  for (const slug of ["beijing-highlights-5-day-private-tour", "zhangjiajie-4-day-private-tour", "shanghai-suzhou-5-day-private-tour"]) {
    for (const source of referralSources) {
      const context = getPrivateTourInquiryContext(slug, "ko");
      const note = tourContactNote("가".repeat(tourContactNoteMaxLength), source, 99);
      assert.ok(note.length <= 1000);
      const result = validateAndNormalizeInquiry({
        schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion, entryPath: "private_tour_quote", locale: "ko",
        contact: { channel: "email", email: "test@example.invalid" }, productInterest: context, travelDate: null, note,
        privacyNoticeVersion: homepageEmailPrivacyNoticeVersion, attribution: { landingPath: `/ko/tours/${slug}/` }, experiment: null, antiAbuse: { companyWebsite: "" },
      }, { allowedFormVersions: [currentPrivateTourQuoteFormVersion], allowedPrivacyNoticeVersions: [homepageEmailPrivacyNoticeVersion] });
      assert.equal(result.ok, true, JSON.stringify(result));
      assert.ok(result.value.note.endsWith(`[Traveller-reported discovery: ${source}]`));
    }
  }
  assert.equal(tourContactDraftText("zh", { travelDate: null, note: "", referralSource: "friend" }).split("\n")[1], "我从这里知道 Homeground: 亲友介绍");
});

test("contact surfaces offer KakaoTalk on Korean pages only, tracked as its own channel, without tel: links", async () => {
  const [panel, quick, card, kakao] = await Promise.all(["components/TourContactPanel.tsx", "components/HomepageQuickContact.tsx", "components/ContactCardDialog.tsx", "components/KakaoTalkContact.tsx"].map(source));
  assert.match(panel, /const kakao = \(fallback: boolean\) => locale === "ko" && contactLinkReady \?/u);
  assert.match(panel, /\{kakao\(false\)\}\s*<\/div>/u);
  assert.match(panel, /\{kakao\(true\)\}/u);
  assert.match(panel, /onOpen=\{\(\) => trackContact\("kakao"\)\}/u);
  assert.match(quick, /const kakaoEnabled = locale === "ko";/u);
  assert.match(quick, /channel: "kakao"/u);
  assert.match(card, /const kakao = locale === "ko" \?/u);
  assert.match(kakao, /aria-live="polite"/u);
  for (const text of [panel, quick, card, kakao]) assert.doesNotMatch(text, /["'`]tel:/u);
});

test("the product quote form records one form start per opening with product context", async () => {
  const panel = await source("components/TourContactPanel.tsx");
  assert.match(panel, /formStartedRef\.current = false;\s*setOpenCount\(count => count \+ 1\);\s*triggerRef\.current/u);
  assert.match(panel, /trackEvent\("quick_email_started", \{ page_language: locale, submission_surface: "private_tour_quote" \}, \{ firstPartyContext: \{ productSlug: context\.slug, packageId: context\.selection\?\.packageId, travelers: context\.selection\?\.travelers, surface: "product" \} \}\)/u);
  assert.match(panel, /onSubmit=\{submit\} onFocus=\{trackFormStart\} onChange=\{trackFormStart\}/u);
  // Only real quote fields count; the Jiangnan group size unlocks WhatsApp/KakaoTalk and is not a form start.
  assert.match(panel, /event\.target instanceof HTMLInputElement \|\| event\.target instanceof HTMLTextAreaElement \|\| event\.target instanceof HTMLSelectElement\) \|\| event\.target\.name === "companyWebsite"\) return;/u);
  assert.match(panel, /value=\{requestedTravelersInput\} onChange=\{event => \{ setRequestedTravelersInput/u);
  assert.match(panel, /<KakaoTalkContact key=\{`\$\{openCount\}-\$\{context\?\.slug \?\? ""\}`\}/u);
  assert.match(panel, /\{context \? <label htmlFor=\{`\$\{id\}-source`\}>/u);
  assert.equal(tourContactNoteMaxLength, 900);
  assert.equal(customTourContactNoteMaxLength, 800);
  assert.match(panel, /const noteMaxLength = \(context\?\.customGroup \? customTourContactNoteMaxLength : tourContactNoteMaxLength\) - \(noteMarker \? noteMarker\.length \+ 2 : 0\);/u);
  assert.match(panel, /maxLength=\{noteMaxLength\}/u);
});

test("the forward migration accepts KakaoTalk for v2 events and reports it as a fifth contact slice", async () => {
  const sql = await source("supabase/migrations/202609290001_homeground_kakao_contact_channel.sql");
  assert.match(sql, /contract_version = 'homeground-traffic-events\.v2' and action_code = 'kakao'/u);
  assert.match(sql, /create or replace function homeground_private\.is_valid_traffic_event_v2\(candidate jsonb\)[\s\S]+not in \('email', 'whatsapp', 'messenger', 'kakao'\)/u);
  assert.match(sql, /and e\.action_code in \('whatsapp', 'email', 'messenger', 'kakao'\)/u);
  assert.match(sql, /\(values \('all'\), \('whatsapp'\), \('email'\), \('messenger'\), \('kakao'\)\) c\(channel\)/u);
  assert.match(sql, /create or replace function public\.get_homeground_admin_traffic_v4\(\)/u);
  assert.match(sql, /revoke all on function public\.get_homeground_admin_traffic_v4\(\) from public, anon, authenticated;/u);
  assert.doesNotMatch(sql, /(?:create or replace|drop|alter) function public\.get_homeground_admin_traffic_v3\(/u);
  assert.doesNotMatch(sql, /to (?:anon|authenticated);/u);
});
