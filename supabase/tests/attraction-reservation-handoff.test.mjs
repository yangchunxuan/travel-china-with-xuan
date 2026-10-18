import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { componentHarness, elements, loadComponent, textOf } from "./helpers/component-hooks.mjs";
import { attractionReservationTravellers } from "../../lib/attractionReservationMessage.ts";
import { getAttractionReservationCopy } from "../../lib/attractionReservationsI18n.ts";
import { contactCardRequestForLink } from "../../lib/contactCard.ts";

const file = relative => fileURLToPath(new URL(`../../${relative}`, import.meta.url));
const { getAttractionReservationEditionCopy } = loadComponent(file("lib/attractionReservationEditions.ts"));
const noop = () => {};

function fixture(language) {
  const h = componentHarness();
  const editionLocale = ["en", "zh", "ko"].includes(language) ? undefined : language;
  const locale = editionLocale ? "en" : language;
  const copy = (editionLocale ? getAttractionReservationEditionCopy(editionLocale) : getAttractionReservationCopy(locale)).enquiry;
  const { AttractionReservationEnquiry } = loadComponent(file("components/AttractionReservationEnquiry.tsx"), {
    react: { ...h.hooks, useEffect: noop },
    "../lib/analytics": { trackEvent: noop },
    "./useAnalyticsEvent": { useVisibleAnalyticsEvent: () => ({ current: null }) },
    "./TourDateField": { TourDateField: () => null },
    "./KakaoTalkContact": { KakaoTalkContact: () => null },
  });
  const props = { locale, editionLocale, copy,
    cities: [{ id: "beijing", label: "Beijing" }],
    attractions: [{ id: "forbidden-city", city: "beijing", label: "QA Forbidden City" }, { id: "summer-palace", city: "beijing", label: "QA Summer Palace" }],
    email: "hello@homegroundchina.com", pageUrl: `https://homegroundchina.com${language === "en" ? "" : `/${language}`}/services/china-attraction-reservations/`,
    privacyHref: "/privacy/", queryKey: "attraction", fee: { amount: 45, currency: "CNY", numberLocale: "en-US", currencyDisplay: "code" },
    formId: "reservation-form", tickets: { label: "Tickets", value: "Face value" }, intro: null,
  };
  const render = () => h.render(AttractionReservationEnquiry, props);
  const find = predicate => [...elements(h.tree)].find(predicate);
  render();
  return { h, render, find, props,
    channel: name => find(n => n.props?.["data-reservation-channel"] === name),
    people(value, valid = true) {
      find(n => n.props?.name === "travellers").props.onChange({ target: { value, validity: { valid } } });
      render();
    },
    select(id) { find(n => n.props?.name === "attraction" && n.props.value === id).props.onChange(); render(); },
    fee: () => textOf(find(n => n.props?.className === "summaryFeeValue")),
  };
}

test("reservation party size never truncates a decimal or scientific number", () => {
  for (const value of ["", " ", "0", "-1", "1.5", "99.5", "100", "Infinity", "NaN", "text"]) {
    assert.equal(attractionReservationTravellers(value), null, value);
  }
  for (const [value, count] of [["1", 1], ["99", 99], ["1e1", 10], ["2.0", 2]]) {
    assert.equal(attractionReservationTravellers(value), count, value);
  }
});

for (const language of ["en", "zh", "ko", "ja", "es", "fr", "de", "ar"]) {
  test(`${language}: reservation handoff retains the prepared request without a generic email form`, () => {
    const f = fixture(language);
    f.select("forbidden-city"); f.select("summer-palace"); f.people("3");
    f.find(n => n.props?.name === "note").props.onChange({ target: { value: "QA_NOTE" } }); f.render();
    assert.equal(f.fee(), "CNY 270");
    const whatsapp = f.channel("whatsapp"), email = f.channel("email");
    assert.equal(whatsapp.props["data-contact-card-scan-only"], true);
    assert.equal(email.props["data-contact-card-direct"], true);
    const message = new URL(whatsapp.props.href).searchParams.get("text");
    for (const value of ["QA Forbidden City", "QA Summer Palace", "QA_NOTE", f.props.pageUrl]) assert.ok(message.includes(value), value);
    assert.equal(new URL(email.props.href).searchParams.get("body"), message);
    const request = contactCardRequestForLink({ href: whatsapp.props.href, hasAttribute: name => name in whatsapp.props }, f.props.locale);
    assert.equal(request.scanOnly, true, "desktop must not offer the unrelated generic mailbox form");
    assert.equal(request.whatsappHref, whatsapp.props.href);
  });
}

test("invalid party size stops handoff before a desktop card or KakaoTalk copy; blank stays undecided", () => {
  const f = fixture("en"); f.select("forbidden-city");
  for (const invalid of ["1.5", "0", "100"]) {
    f.people(invalid, false);
    assert.equal(f.fee(), "—");
    for (const channel of ["whatsapp", "email"]) assert.match(f.channel(channel).props.href, /^#.+-travellers$/);
    assert.equal(f.channel("whatsapp").props.target, undefined);
    const input = f.find(n => n.props?.name === "travellers");
    let checked = 0, prevented = 0, stopped = 0;
    input.props.ref.current.reportValidity = () => { checked++; return false; };
    f.find(n => n.props?.className === "sendButtons").props.onClickCapture({ preventDefault: () => prevented++, stopPropagation: () => stopped++ });
    assert.deepEqual([checked, prevented, stopped], [1, 1, 1]);
  }
  f.people("1e1"); assert.equal(f.fee(), "CNY 450", "scientific notation means ten people, not one");
  f.people(""); assert.equal(f.fee(), "—");
  assert.ok(f.channel("whatsapp").props.href.startsWith("https://wa.me/"), "a blank group size may remain undecided");
  const input = f.find(n => n.props?.name === "travellers");
  input.props.ref.current.reportValidity = () => true;
  f.find(n => n.props?.className === "sendButtons").props.onClickCapture({ preventDefault: () => assert.fail("blank optional size was blocked"), stopPropagation: noop });
});
