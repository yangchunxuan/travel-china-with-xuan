import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { tourWhatsAppHref, openTourContactFromLink, privateTourQuoteApiUrl, tourContactOpenEvent } from "../../lib/tourContact.ts";
import { buildPrivateTourInquiryHref, getPrivateTourInquiryContext, privateTourInquirySelectionLabel } from "../../lib/privateTourInquiryContext.ts";
import { privateTourProducts } from "../../lib/privateTourProducts.ts";

const locales = ["en", "zh", "ko"];
const beijing = "beijing-highlights-5-day-private-tour";
const classic = "zhangjiajie-4-day-private-tour";
const prefix = (locale) => locale === "en" ? "" : `/${locale}`;
const pathFor = (locale, slug) => `${prefix(locale)}/tours/${slug}/`;
const environmentKeys = ["NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER", "NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL", "NODE_ENV"];
const originalEnvironment = Object.fromEntries(environmentKeys.map((key) => [key, process.env[key]]));
const originals = Object.fromEntries(["window", "document", "CustomEvent"].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
afterEach(() => {
  for (const [key, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
  for (const [key, descriptor] of Object.entries(originals)) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key];
  }
});

function page(path, ready = true) {
  const events = [];
  const window = { location: new URL(path, "https://homegroundchina.com"), dispatchEvent(event) { events.push(event); return true; } };
  const document = { querySelector(selector) { return ready && selector === '[data-homeground-contact-ready="true"]' ? {} : null; } };
  class ContactEvent { constructor(type, init) { this.type = type; this.detail = init.detail; } }
  for (const [key, value] of Object.entries({ window, document, CustomEvent: ContactEvent })) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  return { window, events };
}
function click(modifiers = {}) {
  let prevented = false;
  return { event: { preventDefault() { prevented = true; }, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, ...modifiers }, wasPrevented: () => prevented };
}

test("WhatsApp carries every published product/service and 2-or-4-person choice in EN/ZH/KO", () => {
  process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER = "12025550123";
  const openings = { en: "Hi, I’d like to plan a private trip to China.", zh: "你好，我想咨询中国私人旅行。", ko: "안녕하세요. 중국 프라이빗 여행을 문의하고 싶습니다." };
  for (const locale of locales) for (const product of privateTourProducts) for (const option of product.packages) for (const row of option.prices) {
    const context = getPrivateTourInquiryContext(product.slug, locale, { packageId: option.id, travelers: row.travelers });
    const current = `${pathFor(locale, product.slug)}?email=private%40example.invalid&utm_source=secret-source#private-note`;
    const url = new URL(tourWhatsAppHref(locale, context, current));
    assert.equal(url.origin, "https://wa.me"); assert.equal(url.pathname, "/12025550123");
    assert.deepEqual([...url.searchParams.keys()], ["text"]); assert.equal(url.hash, "");
    const message = url.searchParams.get("text");
    assert.deepEqual(message.split("\n"), [openings[locale], context.name, privateTourInquirySelectionLabel(context, locale), `https://homegroundchina.com${pathFor(locale, product.slug)}`]);
    assert.doesNotMatch(message, /private@example|secret-source|private-note|utm_source|email=/);
    assert.ok([2, 4].includes(context.selection.travelers));
  }
});

test("classic tour and generic guide links never invent a service/group or carry query/fragment data", () => {
  for (const locale of locales) {
    const context = getPrivateTourInquiryContext(classic, locale);
    assert.equal(context.selection, undefined);
    const message = new URL(tourWhatsAppHref(locale, context, "/wrong/?email=private#note")).searchParams.get("text");
    assert.equal(message.split("\n").length, 3);
    assert.equal(message.split("\n")[1], context.name);
    assert.equal(message.split("\n")[2], `https://homegroundchina.com${pathFor(locale, classic)}`);
    const guide = `${prefix(locale)}/guides/china-travel-guide/`;
    assert.ok(new URL(tourWhatsAppHref(locale, null, guide)).searchParams.get("text").includes(`https://homegroundchina.com${guide}`));
    for (const path of [`${guide}?email=private#note`, "https://evil.invalid/guides/x/", "//evil.invalid/tours/x/", "/../private/", "/account/"]) {
      const generic = new URL(tourWhatsAppHref(locale, null, path)).searchParams.get("text");
      assert.equal(generic.split("\n").length, 1);
      assert.doesNotMatch(generic, /https?:|evil|email=|#note/);
    }
  }
});

test("invalid WhatsApp destinations cannot change the URL host or inject extra query values", () => {
  delete process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER;
  const fallback = tourWhatsAppHref("en", null);
  for (const number of ["https://evil.invalid", "12025550123?text=forged", "+1 202 555 0123", "123", "1".repeat(16)]) {
    process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER = number;
    assert.equal(tourWhatsAppHref("en", null), fallback);
  }
});

test("an ordinary click on the matching product opens exactly one contextual quote without navigating", () => {
  for (const locale of locales) for (const travelers of [2, 4]) {
    const selection = { packageId: "no-guide", travelers };
    const { events, window } = page(`${pathFor(locale, beijing)}?email=private#note`);
    const originalLocation = window.location.href;
    const href = buildPrivateTourInquiryHref(`${prefix(locale)}/`, beijing, "private_tour_product", selection);
    const press = click();
    assert.equal(openTourContactFromLink(press.event, href, locale), true);
    assert.equal(press.wasPrevented(), true); assert.equal(events.length, 1);
    assert.equal(events[0].type, tourContactOpenEvent);
    assert.deepEqual(events[0].detail, getPrivateTourInquiryContext(beijing, locale, selection));
    assert.equal(window.location.href, originalLocation);
    assert.doesNotMatch(JSON.stringify(events[0].detail), /private#note|email=/);
  }
  const { events } = page(pathFor("en", classic));
  const press = click();
  assert.equal(openTourContactFromLink(press.event, buildPrivateTourInquiryHref("/", classic, "private_tour"), "en"), true);
  assert.equal(Object.hasOwn(events[0].detail, "selection"), false);
});

test("guide/home/other-product pages, unknown slugs and an unready panel retain the original link", () => {
  const href = buildPrivateTourInquiryHref("/", beijing, "private_tour_product", { packageId: "no-guide", travelers: 4 });
  for (const path of ["/", "/guides/china-travel-guide/", "/tours/", pathFor("en", classic), pathFor("zh", beijing), "/tours/unknown-tour/"]) {
    const { events } = page(path); const press = click();
    assert.equal(openTourContactFromLink(press.event, href, "en"), false, path);
    assert.equal(press.wasPrevented(), false); assert.equal(events.length, 0);
  }
  for (const target of ["/#planner-contact", "/?tour=unknown-tour#planner-contact", `/?tour=${beijing}&package=no-guide&travelers=3`, `/?tour=${beijing}&tour=${classic}`, `/?tour=${beijing}&package=no-guide`]) {
    const { events } = page(pathFor("en", beijing)); const press = click();
    assert.equal(openTourContactFromLink(press.event, target, "en"), false, target);
    assert.equal(press.wasPrevented(), false); assert.equal(events.length, 0);
  }
  const { events } = page(pathFor("en", beijing), false); const press = click();
  assert.equal(openTourContactFromLink(press.event, href, "en"), false);
  assert.equal(press.wasPrevented(), false); assert.equal(events.length, 0);
});

test("modifier clicks and server/no-window execution preserve normal link behavior", () => {
  const href = buildPrivateTourInquiryHref("/", beijing, "private_tour_product", { packageId: "no-guide", travelers: 2 });
  for (const modifier of ["metaKey", "ctrlKey", "shiftKey", "altKey"]) {
    const { events } = page(pathFor("en", beijing)); const press = click({ [modifier]: true });
    assert.equal(openTourContactFromLink(press.event, href, "en"), false, modifier);
    assert.equal(press.wasPrevented(), false); assert.equal(events.length, 0);
  }
  delete globalThis.window; delete globalThis.document;
  const press = click();
  assert.equal(openTourContactFromLink(press.event, href, "en"), false);
  assert.equal(press.wasPrevented(), false);
});

test("quote API accepts only the production Supabase origin/path; loopback mocks are non-production only", () => {
  const trusted = "https://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/v1-inquiries";
  const read = (url, mode = "production") => { process.env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL = url; process.env.NODE_ENV = mode; return privateTourQuoteApiUrl(); };
  for (const url of [trusted, `${trusted}/`, trusted.replace(".co/", ".co:443/")]) assert.equal(read(url), url);
  for (const url of ["", "/v1/inquiries", "not-a-url", "https://evil.invalid/functions/v1/v1-inquiries",
    trusted.replace("https:", "http:"), trusted.replace(".co/", ".co.evil.invalid/"), trusted.replace(".co/", ".co:9443/"),
    trusted.replace("https://", "https://user:password@"), `${trusted}?email=private`, `${trusted}#token`, `${trusted}/other`,
    trusted.replace("v1-inquiries", "v1-newsletter"), "javascript:alert(1)"]) assert.equal(read(url), "", url);
  for (const url of ["http://localhost:8787/v1/inquiries", "http://127.0.0.1:8787/v1/inquiries/"]) {
    assert.equal(read(url), ""); assert.equal(read(url, "development"), url);
  }
  for (const url of ["http://localhost.evil.invalid:8787/v1/inquiries", "http://127.0.0.2:8787/v1/inquiries", "http://localhost:8787/wrong", "http://localhost:8787/v1/inquiries?email=private"]) assert.equal(read(url, "development"), "", url);
});
