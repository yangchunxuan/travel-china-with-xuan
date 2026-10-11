import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { componentHarness, elements, loadComponent, textOf } from "./helpers/component-hooks.mjs";
import { contactCardRequestForLink } from "../../lib/contactCard.ts";
import { selectedContactCardTour } from "../../lib/contactCardContext.ts";
import { getPrivateTourInquiryContext, buildPrivateTourMailtoHref } from "../../lib/privateTourInquiryContext.ts";
import { tourWhatsAppHref } from "../../lib/tourContact.ts";
import { currentHomepageEmailFormVersion, travellerAckPrivacyNoticeVersion, validateAndNormalizeInquiry } from "../../lib/inquiryContract.ts";

const beijing = "beijing-highlights-5-day-private-tour";
const xian = "xian-terracotta-warriors-5-day-private-tour";
const selected = { packageId: "no-guide", travelers: 2 };
const successful = () => new Response(JSON.stringify({ state: "submitted", publicReference: "HG-TEST-1234-ABCD", contactRevision: 0, ackStatus: "queued" }), { status: 200 });
const Receipt = () => null;
const noop = () => {};

function fixture(t, { slug = beijing, search = "?package=no-guide&travelers=2", request = { trigger: "email" }, locale = "en" } = {}) {
  const globals = new Map(["window", "document", "navigator", "fetch"].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  const env = {};
  for (const key of ["HOMEPAGE_EMAIL_ENABLED", "INQUIRY_ENABLED", "PRIVACY_READY", "DIRECT_WHATSAPP_ENABLED"]) {
    const name = `NEXT_PUBLIC_HOMEGROUND_${key}`;
    env[name] = process.env[name]; process.env[name] = "true";
  }
  const win = {
    location: { pathname: `${locale === "en" ? "" : `/${locale}`}/tours/${slug}/`, search },
    setInterval: () => 1, clearInterval: noop, setTimeout, clearTimeout,
    requestAnimationFrame: callback => { callback(); return 1; }, cancelAnimationFrame: noop,
    matchMedia: () => ({ matches: true }),
  };
  Object.defineProperty(globalThis, "window", { configurable: true, value: win });
  Object.defineProperty(globalThis, "document", { configurable: true, value: { querySelector: () => null, activeElement: null } });
  Object.defineProperty(globalThis, "navigator", { configurable: true, value: { onLine: true } });
  const calls = [];
  let respond = async () => successful();
  globalThis.fetch = async (url, init) => { calls.push({ url, ...init }); return respond(); };
  const harness = componentHarness();
  const { ContactCardDialog } = loadComponent(fileURLToPath(new URL("../../components/ContactCardDialog.tsx", import.meta.url)), {
    react: harness.hooks,
    "../lib/analytics": { getTrafficSessionToken: () => null, trackEnquirySubmitted: noop, trackEvent: noop },
    "../lib/inquiryTrafficConsent": { inquiryBodyWithCurrentTrafficConsent: body => body },
    "../lib/contactCard": { holdPageScroll: () => noop },
    "../lib/newsletterPrompt": { markNewsletterPromptHandled: noop },
    "../lib/siteOverlayState": { setInquiryOpen: noop },
    "../lib/tourContact": {
      ...loadComponent(fileURLToPath(new URL("../../lib/tourContact.ts", import.meta.url))),
      privateTourQuoteApiUrl: () => "https://example.invalid/mock-inquiries",
    },
    "./InquiryReceipt": { InquiryReceipt: Receipt },
    "./EmailTypoHint": { EmailTypoHint: () => null },
    "./ContactCardScan": { ContactCardScan: () => null, CopyButton: () => null },
    "./KakaoTalkContact": { KakaoTalkContact: () => null },
  });
  let props = { locale, request, layout: "card", open: true, onClose: noop };
  const render = (changes = {}) => { props = { ...props, ...changes }; return harness.render(ContactCardDialog, props); };
  const find = predicate => [...elements(harness.tree)].find(predicate);
  const email = () => find(node => node.type === "input" && node.props.name === "email");
  const receipt = () => find(node => node.type === Receipt)?.props.receipt;
  const send = async () => { await find(node => node.type === "form").props.onSubmit({ preventDefault: noop }); render(); };
  t.after(() => {
    harness.unmount();
    for (const [name, descriptor] of globals) descriptor ? Object.defineProperty(globalThis, name, descriptor) : delete globalThis[name];
    for (const [name, value] of Object.entries(env)) value === undefined ? delete process.env[name] : process.env[name] = value;
  });
  render();
  return { harness, win, calls, render, find, email, receipt, send,
    setEmail(value) { email().props.onChange({ target: { value } }); render(); },
    respondWith(callback) { respond = callback; },
    reopen(slugToOpen = slug, nextSearch = search, nextRequest = { trigger: "email" }) {
      render({ open: false });
      win.location.pathname = `${locale === "en" ? "" : `/${locale}`}/tours/${slugToOpen}/`;
      win.location.search = nextSearch;
      render({ open: true, request: nextRequest });
    },
  };
}

test("same tour/selection keeps its saved receipt; another tour or price option starts a fresh enquiry", async t => {
  const f = fixture(t);
  f.setEmail("traveller@example.invalid"); await f.send();
  const first = f.receipt();
  assert.ok(first); assert.equal(first.contactRevision, 0);
  f.reopen(beijing, "?package=no-guide&travelers=2&utm_source=another", { trigger: "whatsapp" });
  assert.equal(f.receipt(), first, "retain the same receipt object and its inline correction state");
  f.reopen(xian);
  assert.equal(f.receipt(), undefined);
  assert.equal(document.activeElement, f.email().props.ref.current, "a new email request focuses its restored form");
  assert.equal(f.email().props.value, "traveller@example.invalid", "keep the traveller's email for a new enquiry");
  await f.send();
  assert.equal(JSON.parse(f.calls[1].body).productInterest.slug, xian);
  assert.notEqual(f.calls[0].headers["Idempotency-Key"], f.calls[1].headers["Idempotency-Key"]);
  f.reopen(xian, "?package=standard-guided&travelers=4");
  assert.equal(f.receipt(), undefined);
  await f.send();
  assert.equal(JSON.parse(f.calls[2].body).productInterest.selection.travelers, 4);
});

test("navigation during sending cannot relabel the in-flight enquiry or its result", async t => {
  const f = fixture(t);
  let resolve;
  f.respondWith(() => new Promise(done => { resolve = done; }));
  f.setEmail("traveller@example.invalid");
  const pending = f.send(); f.render();
  f.reopen(xian);
  assert.equal(f.email().props.disabled, true);
  assert.ok(textOf(f.harness.tree).includes(getPrivateTourInquiryContext(beijing, "en").name));
  assert.ok(!textOf(f.harness.tree).includes(getPrivateTourInquiryContext(xian, "en").name));
  f.setEmail("late-edit@example.invalid");
  assert.equal(f.email().props.value, "traveller@example.invalid");
  resolve(successful()); await pending;
  assert.equal(f.receipt().productName, getPrivateTourInquiryContext(beijing, "en").name);
  f.reopen(xian);
  assert.equal(f.receipt(), undefined);
});

test("uncertain retry stays immutable across navigation, an offline retry and late edit events", async t => {
  const f = fixture(t);
  f.respondWith(async () => { throw new Error("connection lost after possible persistence"); });
  f.setEmail("traveller@example.invalid"); await f.send();
  f.reopen(xian);
  assert.equal(f.email().props.disabled, true);
  f.setEmail("late-edit@example.invalid");
  assert.equal(f.email().props.value, "traveller@example.invalid");
  await f.send();
  assert.equal(f.calls.length, 1, "Enter cannot replace the uncertain snapshot");
  const retry = () => f.find(node => node.type === "button" && textOf(node).includes("Check and try again"));
  assert.ok(retry());
  navigator.onLine = false; retry().props.onClick(); f.render();
  assert.ok(retry()); assert.equal(f.email().props.disabled, true);
  navigator.onLine = true; f.respondWith(async () => successful());
  retry().props.onClick();
  await new Promise(resolve => setImmediate(resolve)); f.render();
  assert.equal(f.calls.length, 2);
  assert.equal(f.calls[1].body, f.calls[0].body);
  assert.equal(f.calls[1].headers["Idempotency-Key"], f.calls[0].headers["Idempotency-Key"]);
  assert.equal(f.receipt().productName, getPrivateTourInquiryContext(beijing, "en").name);
  f.reopen(xian); assert.equal(f.receipt(), undefined);
});

for (const locale of ["en", "zh", "ko"]) test(`${locale}: selected option survives direct mail, alternate WhatsApp and quick-email submission`, async t => {
  const context = getPrivateTourInquiryContext(beijing, locale, selected);
  const href = buildPrivateTourMailtoHref("hello@homegroundchina.com", locale, context);
  const attributes = { "data-contact-tour": beijing, "data-contact-package": "no-guide", "data-contact-travelers": "2" };
  const request = contactCardRequestForLink({ href, getAttribute: name => attributes[name] ?? null }, locale);
  assert.deepEqual(request.tour.selection, selected);
  // The initial visible option need not have been written into the URL yet.
  const f = fixture(t, { search: "", request, locale });
  const scan = f.find(node => node.props.href?.startsWith("https://wa.me/"));
  const message = new URL(scan.props.href).searchParams.get("text");
  assert.ok(message.includes(context.name));
  const label = locale === "en" ? "No on-site guide" : locale === "zh" ? "无现场导游" : "현장 가이드 없음";
  assert.ok(message.includes(label)); assert.match(message, /2/);
  assert.ok(textOf(f.harness.tree).includes(label));
  assert.equal(f.find(node => node.type === "a" && node.props.href?.startsWith("mailto:")).props.href, href);
  f.setEmail("traveller@example.invalid"); await f.send();
  const payload = JSON.parse(f.calls[0].body);
  assert.deepEqual(payload.productInterest.selection, selected);
  delete payload.trafficSessionToken;
  const validation = validateAndNormalizeInquiry(payload, { allowedFormVersions: [currentHomepageEmailFormVersion], allowedPrivacyNoticeVersions: [travellerAckPrivacyNoticeVersion], whatsappEnabled: false });
  assert.equal(validation.ok, true, JSON.stringify(validation.fieldErrors));
  assert.equal(f.receipt().requestedTravelers, null, "price tier is not a newly reported actual passenger count");
});

test("only published choices from the current tour enter contact context", () => {
  assert.deepEqual(selectedContactCardTour(beijing, "en", "?package=no-guide&travelers=2").selection, selected);
  for (const query of ["?package=made-up&travelers=2", "?package=no-guide&travelers=99", "?package=no-guide&travelers=02", "?package=no-guide&package=no-guide&travelers=2"]) {
    assert.equal(selectedContactCardTour(beijing, "en", query).selection, undefined);
  }
  assert.equal(selectedContactCardTour(beijing, "en", "", { slug: xian, name: "forged", selection: selected }).selection, undefined);
  assert.equal(selectedContactCardTour(beijing, "en", "", { slug: beijing, name: "forged", selection: { packageId: "made-up", travelers: 2 } }).selection, undefined);
  const normalized = selectedContactCardTour(beijing, "en", "", { slug: beijing, name: "forged", selection: selected });
  assert.notEqual(normalized.name, "forged"); assert.deepEqual(normalized.selection, selected);
});

test("both product link components expose their actual initial selected option to the contact card", () => {
  const selectionContext = { slug: beijing, selection: selected };
  const common = { "../lib/analytics": { trackEvent: noop } };
  const { SelectedPrivateTourEmailLink } = loadComponent(fileURLToPath(new URL("../../components/PrivateTourSelection.tsx", import.meta.url)), {
    ...common, react: { createContext: () => ({}), useContext: () => selectionContext }, "./GuideCtaLink": { GuideCtaLink: () => null },
  });
  const { TourWhatsAppLink } = loadComponent(fileURLToPath(new URL("../../components/TourWhatsAppLink.tsx", import.meta.url)), {
    ...common, "./PrivateTourSelection": { usePrivateTourSelection: () => selectionContext },
  });
  for (const element of [
    SelectedPrivateTourEmailLink({ email: "hello@homegroundchina.com", locale: "en", href: "mailto:hello@homegroundchina.com", children: "Email" }),
    TourWhatsAppLink({ locale: "en", slug: beijing }),
  ]) {
    const request = contactCardRequestForLink({ href: element.props.href, getAttribute: name => element.props[name] ?? null }, "en");
    assert.equal(request.tour.slug, beijing);
    assert.deepEqual(request.tour.selection, selected);
  }
});

test("a selected WhatsApp entry retains the same selection in alternate direct email", t => {
  const tour = getPrivateTourInquiryContext(beijing, "en", selected);
  const request = contactCardRequestForLink({ href: tourWhatsAppHref("en", tour), getAttribute: name => ({ "data-contact-tour": beijing, "data-contact-package": "no-guide", "data-contact-travelers": "2" })[name] ?? null }, "en");
  const f = fixture(t, { search: "", request });
  const link = f.find(node => node.type === "a" && node.props.href?.startsWith("mailto:"));
  const body = new URL(link.props.href).searchParams.get("body");
  assert.ok(body.includes(tour.name)); assert.ok(body.includes("No on-site guide")); assert.ok(body.includes("2 travellers"));
});
