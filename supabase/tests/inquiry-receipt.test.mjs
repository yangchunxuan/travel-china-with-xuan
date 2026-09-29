import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import * as receiptHelpers from "../../lib/inquiryReceipt.ts";
import { getPrivateTourInquiryContext } from "../../lib/privateTourInquiryContext.ts";
import { safeInquiryDestinationNames, safeInquiryNights } from "../../lib/inquirySafeSummary.ts";
import { japaneseInquiryReceiptCopy } from "../../lib/japaneseInquiryReceiptCopy.ts";

const { createInquiryReceipt, correctedInquiryReceipt, displayedInquiryReceipt, emailTypoSuggestion, inquiryCorrectionLinks, inquiryEmailCorrectionApiUrl, inquiryReceiptAccessKey, normalizeCorrectionEmail, sendInquiryEmailCorrection, inquiryWhatsAppHref, inquiryReceiptCopy } = receiptHelpers;
const copyFor = (locale) => locale === "ja" ? japaneseInquiryReceiptCopy : inquiryReceiptCopy[locale];
const locales = ["en", "zh", "ko", "ja"];
const saved = { state: "submitted", publicReference: "HG-TEST-1234-ABCD", ackQueued: true, ackStatus: "queued", firstResponseDueAt: "2026-09-30T04:00:18.528Z" };
const savedCorrectable = { ...saved, contactEmail: "Traveller@example.invalid", contactRevision: 0 };
const homeBody = JSON.stringify({ entryPath: "homepage_email", contact: { channel: "email", email: "Traveller@example.invalid" }, productInterest: null });
const quote = (locale) => ({
  entryPath: "private_tour_quote", contact: { channel: "email", email: "Traveller@example.invalid" },
  productInterest: getPrivateTourInquiryContext("beijing-highlights-5-day-private-tour", locale, { packageId: "no-guide", travelers: 4 }),
  travelDate: "2026-12-03", note: "PRIVATE NOTE MUST NOT APPEAR",
});

test("saved receipt reports queue status without upgrading persistence to email delivery", () => {
  for (const ackStatus of ["queued", "disabled", "suppressed", "unavailable"]) {
    const receipt = createInquiryReceipt({ ...saved, ackStatus, ackQueued: ackStatus === "queued" }, homeBody, "en");
    assert.equal(receipt.publicReference, saved.publicReference);
    assert.equal(receipt.ackStatus, ackStatus);
    assert.equal(receipt.topic, "homepage");
    assert.equal(receipt.firstResponseDueAt, saved.firstResponseDueAt);
    assert.equal(receipt.email, "Traveller@example.invalid");
  }
  const legacy = createInquiryReceipt({ state: "submitted", publicReference: saved.publicReference }, homeBody, "en");
  assert.equal(legacy.ackStatus, "disabled");
  assert.equal(legacy.firstResponseDueAt, null);
  assert.equal(createInquiryReceipt({ ...saved, ackStatus: "delivered", ackQueued: false, firstResponseDueAt: "invalid" }, homeBody, "en").ackStatus, "disabled");
  assert.equal(createInquiryReceipt({ state: "pending" }, homeBody, "en"), null);
  assert.equal(createInquiryReceipt(saved, "not json", "en"), null);
});

test("receipt keeps product, requested date and price selection distinct from an explicitly entered party size", () => {
  for (const locale of locales) {
    const body = quote(locale);
    assert.ok(body.productInterest);
    const receipt = createInquiryReceipt(saved, JSON.stringify(body), locale);
    assert.equal(receipt.productName, body.productInterest.name);
    assert.equal(receipt.requestedDate, "2026-12-03");
    assert.ok(receipt.selectionLabel);
    assert.equal(receipt.requestedTravelers, null, "a 4-person price tier is not a reported group of four");
    assert.equal(createInquiryReceipt(saved, JSON.stringify(body), locale, 7).requestedTravelers, 7);
    for (const invalid of [0, 100, 2.5, "4", null, undefined]) assert.equal(createInquiryReceipt(saved, JSON.stringify(body), locale, invalid).requestedTravelers, null);
    body.contact.email = "changed-after-send@example.invalid";
    assert.equal(receipt.email, "Traveller@example.invalid");
    assert.doesNotMatch(JSON.stringify(receipt), /PRIVATE NOTE/);
  }
});

test("receipt regenerates controlled product names and does not echo an arbitrary tour or free-text note", () => {
  const body = quote("en");
  body.productInterest = { ...body.productInterest, name: "<script>forged</script>" };
  const receipt = createInquiryReceipt(saved, JSON.stringify(body), "en");
  assert.doesNotMatch(receipt.productName, /script|forged/);
  body.productInterest.slug = "fake-product";
  assert.equal(createInquiryReceipt(saved, JSON.stringify(body), "en").productName, null);
  const whatsapp = createInquiryReceipt(saved, JSON.stringify({ entryPath: "destination_timing", contact: { channel: "whatsapp", phoneRaw: "+86 13174215999" } }), "en");
  assert.equal(whatsapp.email, null);
  assert.equal(whatsapp.phone, "+86 13174215999");
});

test("a homepage product enquiry does not invent a dates-undecided answer for a field never collected", () => {
  const quoteBody = quote("en");
  const productEmail = createInquiryReceipt(saved, JSON.stringify({ entryPath: "homepage_email", contact: quoteBody.contact, productInterest: quoteBody.productInterest }), "en");
  assert.ok(productEmail.productName);
  assert.equal(productEmail.requestedDateCollected, false);
  assert.equal(productEmail.requestedDate, null);
  assert.doesNotMatch(new URL(inquiryWhatsAppHref(productEmail, "en", "8613174215999")).searchParams.get("text"), /arrival|Dates not decided/);
  const undecidedQuote = createInquiryReceipt(saved, JSON.stringify({ ...quoteBody, travelDate: null }), "en");
  assert.equal(undecidedQuote.requestedDateCollected, true);
  assert.equal(undecidedQuote.requestedDate, null);
  assert.match(new URL(inquiryWhatsAppHref(undecidedQuote, "en", "8613174215999")).searchParams.get("text"), /Dates not decided/);
});

test("planner summary uses only saved allowlisted destinations and valid nights, shared with the email renderer", () => {
  for (const locale of locales) {
    const body = JSON.stringify({ entryPath: "destination_timing", contact: { channel: "email", email: "a@example.invalid" }, journey: { answers: { destinationIds: ["beijing-great-wall", "shanghai", "shanghai", "<script>evil</script>", "__proto__"], totalNights: 7, otherPlace: "PRIVATE PLACE" } }, note: "PRIVATE NOTE" });
    const receipt = createInquiryReceipt(saved, body, locale);
    assert.deepEqual(receipt.destinationNames, safeInquiryDestinationNames(["beijing-great-wall", "shanghai"], locale));
    assert.equal(receipt.nights, 7);
    assert.doesNotMatch(JSON.stringify(receipt), /PRIVATE PLACE|PRIVATE NOTE|evil/);
    const message = new URL(inquiryWhatsAppHref(receipt, locale, "8613174215999", copyFor(locale))).searchParams.get("text");
    assert.ok(message.includes(receipt.destinationNames.join(" · ")));
    assert.ok(message.includes(`${copyFor(locale).nights}: 7`));
  }
  for (const invalid of [0, 61, 2.5, "7 nights", {}, null, undefined]) assert.equal(safeInquiryNights(invalid), null);
  assert.equal(safeInquiryNights("12"), 12);
  assert.deepEqual(safeInquiryDestinationNames(["constructor", "__proto__", "unlisted"], "en"), []);
});

test("typo suggestions are narrow and retain the local part; valid corporate emails are untouched", () => {
  for (const [input, output] of [
    ["Person+trip@gmial.com", "Person+trip@gmail.com"], ["name@gmail.con", "name@gmail.com"],
    ["  NAME@HOTMIAL.COM  ", "NAME@hotmail.com"], ["name@yaho.com", "name@yahoo.com"],
  ]) assert.equal(emailTypoSuggestion(input), output);
  for (const value of ["lej@ejbt.co.kr", "a@company.sg", "a@gmail.com", "a@outlook.com", "a@not-gmial.com", "a@gmial", "", "broken", "a@@gmial.com"]) assert.equal(emailTypoSuggestion(value), null, value);
});

test("correction credential stays in memory and a confirmed correction retains the saved trip", () => {
  const key = "123e4567-e89b-42d3-a456-426614174000";
  const original = createInquiryReceipt(savedCorrectable, JSON.stringify(quote("en")), "en", 7, key);
  assert.equal(inquiryReceiptAccessKey(original), key);
  assert.doesNotMatch(JSON.stringify(original), /123e4567|Inquiry-Access-Key/);
  const corrected = correctedInquiryReceipt(original, {
    state: "corrected", publicReference: saved.publicReference, contactEmail: "new@example.invalid", contactRevision: 1,
    ackStatus: "suppressed", firstResponseDueAt: saved.firstResponseDueAt,
  });
  assert.equal(corrected.email, "new@example.invalid");
  assert.equal(corrected.ackStatus, "suppressed");
  assert.equal(corrected.contactRevision, 1);
  assert.equal(corrected.requestedTravelers, 7);
  assert.equal(corrected.requestedDate, original.requestedDate);
  assert.equal(corrected.firstResponseDueAt, original.firstResponseDueAt);
  assert.equal(inquiryReceiptAccessKey(corrected), key);
  assert.equal(displayedInquiryReceipt(original, corrected), corrected, "parent rerenders keep the corrected address for the same reference");
  assert.equal(displayedInquiryReceipt(createInquiryReceipt({ ...saved, publicReference: "HG-OTHER" }, homeBody, "en"), corrected).publicReference, "HG-OTHER");
  assert.equal(correctedInquiryReceipt(original, { state: "corrected", publicReference: "WRONG", contactEmail: "x@example.invalid", contactRevision: 1, ackStatus: "queued" }), null);
  assert.equal(correctedInquiryReceipt(corrected, { state: "corrected", publicReference: saved.publicReference, contactEmail: "x@example.invalid", contactRevision: 0, ackStatus: "queued" }), null);
  assert.equal(inquiryReceiptAccessKey(createInquiryReceipt(saved, homeBody, "en")), null);
});

test("missing or invalid server contact state cannot authorize online correction", () => {
  const key = "123e4567-e89b-42d3-a456-426614174000";
  for (const response of [
    saved,
    { ...saved, contactEmail: "Traveller@example.invalid" },
    { ...saved, contactRevision: 0 },
    { ...savedCorrectable, contactEmail: "not-an-email" },
    ...[-1, 1.5, 4, Number.MAX_SAFE_INTEGER].map((contactRevision) => ({ ...savedCorrectable, contactRevision })),
  ]) {
    const receipt = createInquiryReceipt(response, homeBody, "en", undefined, key);
    assert.equal(inquiryReceiptAccessKey(receipt), null);
  }
  const exhausted = createInquiryReceipt({ ...savedCorrectable, contactRevision: 3 }, homeBody, "en", undefined, key);
  assert.equal(exhausted.contactRevision, 3);
  assert.equal(inquiryReceiptAccessKey(exhausted), null, "the correction limit is terminal");
});

test("network retry resends the same correction key and body without putting access in the URL", async () => {
  const originalKey = "123e4567-e89b-42d3-a456-426614174000";
  const correctionKey = "923e4567-e89b-42d3-a456-426614174001";
  const base = createInquiryReceipt(savedCorrectable, homeBody, "en", undefined, originalKey);
  const snapshot = { base, email: "new@example.invalid", key: correctionKey, accessKey: originalKey,
    body: JSON.stringify({ email: "new@example.invalid", expectedRevision: 0 }) };
  const url = inquiryEmailCorrectionApiUrl("https://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/v1-inquiries");
  const sent = [];
  const request = async (target, init) => {
    sent.push({ target, init });
    if (sent.length === 1) throw new TypeError("network interrupted after dispatch");
    return new Response(JSON.stringify({ state: "corrected", publicReference: saved.publicReference, contactEmail: "new@example.invalid", contactRevision: 1, ackStatus: "queued", firstResponseDueAt: saved.firstResponseDueAt }), { status: 200, headers: { "Content-Type": "application/json" } });
  };
  await assert.rejects(sendInquiryEmailCorrection(snapshot, url, undefined, request), /network interrupted/);
  const { response, result } = await sendInquiryEmailCorrection(snapshot, url, undefined, request);
  assert.equal(response.status, 200);
  assert.equal(correctedInquiryReceipt(base, result).email, "new@example.invalid");
  assert.equal(sent.length, 2);
  for (const attempt of sent) {
    assert.equal(attempt.target, url);
    assert.equal(attempt.init.headers["Inquiry-Access-Key"], originalKey);
    assert.equal(attempt.init.headers["Idempotency-Key"], correctionKey);
    assert.equal(attempt.init.body, snapshot.body);
    assert.doesNotMatch(attempt.target, /123e4567|923e4567|example\.invalid/);
    assert.doesNotMatch(attempt.init.body, /123e4567|923e4567|HG-TEST/);
  }
});

test("correction endpoint stays on the trusted intake host and address validation is local", () => {
  assert.equal(inquiryEmailCorrectionApiUrl("https://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/v1-inquiries"), "https://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/v1-inquiry-email-corrections");
  assert.equal(inquiryEmailCorrectionApiUrl("http://127.0.0.1:8787/v1/inquiries"), "http://127.0.0.1:8787/v1/inquiry-email-corrections");
  for (const value of ["https://evil.invalid/functions/v1/v1-inquiries", "https://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/v1-inquiries?key=abc", "/functions/v1/v1-inquiries"]) assert.equal(inquiryEmailCorrectionApiUrl(value), "");
  assert.equal(normalizeCorrectionEmail(" Traveller@EXAMPLE.COM "), "Traveller@example.com");
  for (const value of ["", "broken", "name@invalid", "x..y@example.com", "name@example..com", "name@exa mple.com"]) assert.equal(normalizeCorrectionEmail(value), null);
});

test("address correction opens a clean draft with reference and CRLF, not an unauthenticated mutation", () => {
  for (const locale of locales) {
    const links = inquiryCorrectionLinks(saved.publicReference, locale, "hello@homegroundchina.com", "8613174215999", copyFor(locale));
    const email = new URL(links.email);
    assert.equal(email.protocol, "mailto:");
    assert.equal(email.pathname, "hello@homegroundchina.com");
    assert.match(email.searchParams.get("subject"), /HG-TEST-1234-ABCD/);
    assert.match(email.searchParams.get("body"), /\r\n/);
    assert.doesNotMatch(email.searchParams.get("body"), /(?<!\r)\n/);
    assert.match(links.email, /%0D%0A/);
    assert.equal(new URL(links.whatsapp).searchParams.get("text"), email.searchParams.get("body"));
    assert.doesNotMatch(links.email, /Traveller|example.invalid/);
  }
  assert.equal(inquiryCorrectionLinks(saved.publicReference, "en", "hello@homegroundchina.com", "evil.invalid").whatsapp, "");
});

test("ordinary WhatsApp continuation carries saved context without an address-correction request or private contact data", () => {
  for (const locale of locales) {
    const receipt = createInquiryReceipt(saved, JSON.stringify(quote(locale)), locale, 7);
    const href = inquiryWhatsAppHref(receipt, locale, "8613174215999", copyFor(locale));
    const message = new URL(href).searchParams.get("text");
    assert.ok(message.includes(receipt.publicReference));
    assert.ok(message.includes(receipt.productName));
    assert.ok(message.includes("2026-12-03"));
    assert.ok(message.includes(`${copyFor(locale).party}: 7`));
    assert.doesNotMatch(message, /Traveller@example|PRIVATE NOTE|correct my|更正|訂正|수정/i);
    assert.equal(inquiryWhatsAppHref(receipt, locale, "evil.invalid"), "");
  }
});

async function loadComponent(path, extra) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
  const require = createRequire(import.meta.url);
  const exports = {};
  new Function("require", "exports", js)((specifier) => {
    if (specifier.endsWith(".module.css")) return { default: new Proxy({}, { get: (_, name) => String(name) }) };
    if (specifier.endsWith("/inquiryReceipt")) return receiptHelpers;
    if (specifier.endsWith("/homegroundBusiness")) return { homegroundBusiness: { serviceEmail: "hello@homegroundchina.com" } };
    if (extra?.[specifier]) return extra[specifier];
    if (specifier.endsWith("/tourContact")) return { privateTourQuoteApiUrl: () => "" };
    if (specifier === "./EmailTypoHint") return { EmailTypoHint: () => null };
    return require(specifier);
  }, exports);
  return exports;
}

test("all four receipt languages render truthful status, correction links and no required confirmation step", async () => {
  const { InquiryReceipt } = await loadComponent("../../components/InquiryReceipt.tsx");
  for (const locale of locales) for (const ackStatus of ["queued", "disabled", "suppressed", "unavailable"]) {
    const receipt = createInquiryReceipt({ ...saved, ackStatus }, JSON.stringify(quote(locale)), locale);
    const html = renderToStaticMarkup(React.createElement(InquiryReceipt, { receipt, locale, localizedCopy: copyFor(locale) }));
    assert.ok(html.includes(copyFor(locale).title));
    assert.ok(html.includes(copyFor(locale)[ackStatus]));
    assert.match(html, /data-inquiry-receipt=""/);
    assert.match(html, new RegExp(`data-ack-status="${ackStatus}"`));
    assert.match(html, /mailto:hello@homegroundchina.com/);
    assert.match(html, /data-contact-card-direct=""/);
    assert.match(html, /href="mailto:hello@homegroundchina.com\?subject=HG-TEST-1234-ABCD" data-contact-card-direct="">hello@homegroundchina.com<\/a>/);
    assert.ok(html.includes(ackStatus === "queued" ? copyFor(locale).next : ackStatus === "suppressed" ? copyFor(locale).suppressedNext : copyFor(locale).directNext));
    if (ackStatus === "suppressed") {
      assert.doesNotMatch(html, /<time dateTime="2026-09-30T/, "no reply deadline when the confirmation is suppressed");
    } else {
      assert.match(html, /<time dateTime="2026-09-30T04:00:18.528Z"/);
    }
    assert.doesNotMatch(html, /PRIVATE NOTE|confirm your email|delivered to your inbox|within two minutes/i);
  }
  const whatsapp = createInquiryReceipt(saved, JSON.stringify({ entryPath: "destination_timing", contact: { channel: "whatsapp", phoneRaw: "+8613174215999" } }), "en");
  const whatsappHtml = renderToStaticMarkup(React.createElement(InquiryReceipt, { receipt: whatsapp, locale: "en" }));
  assert.doesNotMatch(whatsappHtml, /data-ack-status|mailto:|Email address wrong/);
});

test("a newly saved email receipt exposes inline correction without rendering its access key", async () => {
  const key = "123e4567-e89b-42d3-a456-426614174000";
  const { InquiryReceipt } = await loadComponent("../../components/InquiryReceipt.tsx", {
    "../lib/tourContact": { privateTourQuoteApiUrl: () => "https://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/v1-inquiries" },
  });
  const receipt = createInquiryReceipt(savedCorrectable, homeBody, "en", undefined, key);
  const html = renderToStaticMarkup(React.createElement(InquiryReceipt, { receipt, locale: "en" }));
  assert.match(html, /<button[^>]*aria-expanded="false"[^>]*>Wrong address\?<\/button>/);
  assert.doesNotMatch(html, /123e4567|Inquiry-Access-Key/);
  assert.doesNotMatch(html, /Correct my enquiry email/);
});

test("the saved homepage view emphasizes the email guidance without administrative details", async () => {
  const { InquiryReceipt } = await loadComponent("../../components/InquiryReceipt.tsx");
  const receipt = createInquiryReceipt(saved, homeBody, "zh");
  const html = renderToStaticMarkup(React.createElement(InquiryReceipt, { receipt, locale: "zh" }));
  const visible = html.replace(/<[^>]*>/g, "");
  assert.ok(visible.includes(inquiryReceiptCopy.zh.queued));
  assert.ok(!visible.includes(saved.publicReference));
  assert.ok(visible.includes(receipt.email), "the traveller can check the address they typed");
  assert.ok(!visible.includes(inquiryReceiptCopy.zh.homepage));
  assert.doesNotMatch(html, /<details/);
  assert.match(html, /class="message" data-ack-status="queued"/);
  assert.ok(html.includes(saved.publicReference), "continuation links still carry the saved reference");
  const tour = createInquiryReceipt(saved, JSON.stringify(quote("zh")), "zh", 7);
  const tourHtml = renderToStaticMarkup(React.createElement(InquiryReceipt, { receipt: tour, locale: "zh" }));
  assert.match(tourHtml, /<details class="details"><summary>查看咨询内容<svg/);
  assert.ok(tourHtml.includes(tour.productName));
  assert.ok(tourHtml.includes('<time dateTime="2026-12-03">2026年12月3日</time>'), "the date is readable and keeps its machine value");
});

test("the typo hint is an optional button and never changes the supplied address on render", async () => {
  const { EmailTypoHint } = await loadComponent("../../components/EmailTypoHint.tsx");
  let changes = 0;
  const html = renderToStaticMarkup(React.createElement(EmailTypoHint, { email: "name@gmial.com", locale: "en", onAccept: () => changes++ }));
  assert.match(html, /type="button"/);
  assert.match(html, /name@gmail.com/);
  assert.equal(changes, 0);
  assert.equal(renderToStaticMarkup(React.createElement(EmailTypoHint, { email: "name@gmial.com", locale: "en", onAccept: () => changes++, disabled: true })), "");
  assert.equal(renderToStaticMarkup(React.createElement(EmailTypoHint, { email: "lej@ejbt.co.kr", locale: "en", onAccept: () => changes++ })), "");
  const japaneseHtml = renderToStaticMarkup(React.createElement(EmailTypoHint, { email: "name@gmial.com", locale: "ja", localizedCopy: japaneseInquiryReceiptCopy, onAccept: () => changes++ }));
  assert.ok(japaneseHtml.includes(japaneseInquiryReceiptCopy.typo));
});

test("Japanese receipt words belong to the Japanese module and are injected by its dialog", async () => {
  assert.deepEqual(Object.keys(inquiryReceiptCopy).sort(), ["en", "ko", "zh"]);
  assert.throws(() => receiptHelpers.getInquiryReceiptCopy("ja"), /must be supplied/);
  assert.equal(receiptHelpers.getInquiryReceiptCopy("ja", japaneseInquiryReceiptCopy), japaneseInquiryReceiptCopy);
  const [core, receipt, typo, dialog] = await Promise.all(["lib/inquiryReceipt.ts", "components/InquiryReceipt.tsx", "components/EmailTypoHint.tsx", "components/JapaneseInquiryDialog.tsx"].map((path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8")));
  for (const shared of [core, receipt, typo]) assert.doesNotMatch(shared, /(?:import|require).*japaneseInquiryReceiptCopy|お問い合わせ|こちらで相談/);
  assert.equal(dialog.match(/localizedCopy=\{japaneseInquiryReceiptCopy\}/g)?.length, 2);
});
