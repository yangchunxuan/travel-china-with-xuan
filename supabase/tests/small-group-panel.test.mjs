import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { componentHarness, elements, loadComponent, textOf } from './helpers/component-hooks.mjs';
import * as contact from '../../lib/tourContact.ts';
import { frenchContactEdition } from '../../lib/frenchContactEdition.ts';
import { spanishContactEdition } from '../../lib/spanishContactEdition.ts';
import { getPrivateTourInquiryContext } from '../../lib/privateTourInquiryContext.ts';
import { fiveCitySmallGroupSlug, smallGroupInquiryText } from '../../lib/smallGroupInquiry.ts';
import { currentPrivateTourQuoteFormVersion, travellerAckPrivacyNoticeVersion, validateAndNormalizeInquiry } from '../../lib/inquiryContract.ts';

const slug = fiveCitySmallGroupSlug;
const selection = { packageId: 'small-group-departure', travelers: 2 };
const details = { departureDate: '2027-05-08', roomPreference: 'single-room' };
const noop = () => {};
const off = () => false;
const success = () => new Response(JSON.stringify({ state: 'submitted', publicReference: 'HG-TEST-1234-ABCD', ackStatus: 'disabled' }), { status: 200 });

function fixture(t, { edition, formEnabled = true } = {}) {
  const globals = new Map(['window', 'document', 'HTMLElement', 'FormData', 'fetch', 'requestAnimationFrame'].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  const env = {};
  for (const suffix of ['INQUIRY_ENABLED', 'PRIVACY_READY', 'PRIVATE_TOUR_QUOTE_ENABLED', 'DIRECT_WHATSAPP_ENABLED']) {
    const name = `NEXT_PUBLIC_HOMEGROUND_${suffix}`;
    env[name] = process.env[name]; process.env[name] = suffix === 'PRIVATE_TOUR_QUOTE_ENABLED' && !formEnabled ? 'false' : 'true';
  }
  const path = tourSlug => `${edition ? `/${edition.language}` : ''}/tours/${tourSlug}/`;
  const listeners = new Map();
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {
    location: new URL(path(slug), 'https://homegroundchina.com'), setTimeout, clearTimeout,
    addEventListener: (type, listener) => listeners.set(type, listener),
    removeEventListener: type => listeners.delete(type), matchMedia: () => ({ matches: true }),
  } });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { activeElement: null, body: { style: {} }, querySelector: () => null } });
  Object.defineProperty(globalThis, 'HTMLElement', { configurable: true, value: class {} });
  Object.defineProperty(globalThis, 'FormData', { configurable: true, value: class { get() { return ''; } } });
  Object.defineProperty(globalThis, 'requestAnimationFrame', { configurable: true, value: callback => callback() });
  const calls = [];
  let respond = async () => success();
  globalThis.fetch = async (url, init) => { calls.push({ url, ...init }); return respond(); };
  const harness = componentHarness();
  const Fields = () => null;
  const Receipt = () => null;
  const { TourContactPanel } = loadComponent(fileURLToPath(new URL('../../components/TourContactPanel.tsx', import.meta.url)), {
    react: { ...harness.hooks, useSyncExternalStore: (_subscribe, snapshot) => snapshot() },
    'next/navigation': { usePathname: () => window.location.pathname },
    '../lib/tourContact': { ...contact, privateTourQuoteApiUrl: () => 'https://example.invalid/mock-inquiries' },
    '../lib/analytics': { getTrafficSessionToken: () => null, trackEnquirySubmitted: noop, trackEvent: noop },
    '../lib/inquiryTrafficConsent': { inquiryBodyWithCurrentTrafficConsent: body => body },
    '../lib/googleAdsAttribution': { readGoogleAdsAttribution: () => null },
    '../lib/siteOverlayState': {
      getNavigationMenuOpen: off, getPrivacyManagerOpen: off, getServerPrivacyManagerOpen: off,
      getNewsletterExpanded: off, subscribeNavigationMenu: noop, subscribePrivacyManager: noop,
      subscribeNewsletterExpanded: noop, setInquiryOpen: noop, getConsentBannerPending: off,
      getServerConsentBannerPending: off, subscribeConsentBanner: noop, getNewsletterDockSide: () => 'right',
      getServerNewsletterDockSide: () => 'right', subscribeNewsletterDock: noop,
    },
    '../lib/newsletterPrompt': { markNewsletterPromptHandled: noop },
    '../lib/contactCard': { openContactCard: off },
    './TourDateField': { TourDateField: () => null },
    './KakaoTalkContact': { KakaoTalkContact: () => null },
    './InquiryReceipt': { InquiryReceipt: Receipt },
    './EmailTypoHint': { EmailTypoHint: () => null },
    './SmallGroupInquiryFields': { SmallGroupInquiryFields: Fields },
  });
  const render = () => harness.render(TourContactPanel, { locale: 'en', edition });
  const find = predicate => [...elements(harness.tree)].find(predicate);
  const open = (tourSlug = slug, selected = selection) => {
    window.location.pathname = path(tourSlug);
    render();
    const context = getPrivateTourInquiryContext(tourSlug, 'en', selected);
    assert.ok(context, 'fixture uses a valid published tour context');
    listeners.get(contact.tourContactOpenEvent)({ detail: context });
    render();
  };
  const settle = async () => { await new Promise(resolve => setImmediate(resolve)); render(); };
  render(); open();
  t.after(() => {
    harness.unmount();
    for (const [name, descriptor] of globals) descriptor ? Object.defineProperty(globalThis, name, descriptor) : delete globalThis[name];
    for (const [name, value] of Object.entries(env)) value === undefined ? delete process.env[name] : process.env[name] = value;
  });
  return { harness, calls, find, render, settle, open, path,
    fields: () => find(node => node.type === Fields),
    receipt: () => find(node => node.type === Receipt)?.props.receipt,
    isOpen: () => find(node => node.type === 'dialog').props.ref.current.open,
    note: () => find(node => node.type === 'textarea'),
    setDetails(value, travelers) { const props = find(node => node.type === Fields).props; props.onChange(value); props.onTravelersChange(travelers); render(); },
    setEmail(value) { find(node => node.type === 'input' && node.props.type === 'email').props.onChange({ target: { value } }); render(); },
    setNote(value) { find(node => node.type === 'textarea').props.onChange({ target: { value } }); render(); },
    setSource(value) { find(node => node.type === 'select').props.onChange({ target: { value } }); render(); },
    async submit() { find(node => node.type === 'form').props.onSubmit({ preventDefault: noop, currentTarget: {} }); render(); await settle(); },
    async close() { find(node => node.type === 'dialog').props.onCancel({ preventDefault: noop }); await new Promise(resolve => setTimeout(resolve, 1)); render(); },
    respondWith(callback) { respond = callback; },
  };
}

function validatePayload(payload) {
  // The Edge intake extracts auxiliary consent fields before validating answers.
  const { trafficSessionToken, adAttribution, ...answers } = payload;
  assert.equal(trafficSessionToken, null);
  assert.equal(adAttribution, null);
  const result = validateAndNormalizeInquiry(answers, { allowedFormVersions: [currentPrivateTourQuoteFormVersion], allowedPrivacyNoticeVersions: [travellerAckPrivacyNoticeVersion] });
  assert.equal(result.ok, true, JSON.stringify(result));
}

test('English small-group submission saves the selected departure, actual party and room under the unchanged package contract', async t => {
  const f = fixture(t);
  assert.equal(f.fields().props.language, 'en');
  assert.equal(f.find(node => node.type === 'input' && node.props.type === 'checkbox'), undefined);
  f.setDetails(details, '3');
  f.setEmail('traveller@example.invalid');
  f.setNote('A quiet room, please.');
  f.setSource('Perplexity');
  await f.submit();
  assert.equal(f.calls.length, 1);
  const payload = JSON.parse(f.calls[0].body);
  assert.equal(payload.travelDate, '2027-05-08');
  assert.deepEqual(payload.productInterest.selection, selection);
  assert.match(payload.note, /Small-group departure: 2027-05-08 to 2027-05-21/);
  assert.match(payload.note, /Requested group size: 3 travellers/);
  assert.match(payload.note, /Room preference: Single room; subject to confirmation/);
  assert.match(payload.note, /Traveller-reported discovery: Perplexity/);
  assert.match(payload.note, /A quiet room, please/);
  validatePayload(payload);
  assert.equal(f.receipt().requestedTravelers, 3);
  assert.equal(f.receipt().requestedDate, '2027-05-08');
});

test('unknown submission locks the new fields and retries exactly the original body and key after close and reopen', async t => {
  const f = fixture(t);
  f.setDetails(details, '3');
  f.setEmail('traveller@example.invalid');
  let finish;
  f.respondWith(() => new Promise(resolve => { finish = resolve; }));
  await f.submit();
  assert.equal(f.fields().props.disabled, true, 'fields lock while the request is in flight');
  finish(new Response(JSON.stringify({ state: 'unknown' }), { status: 200 }));
  await f.settle();
  assert.equal(f.fields().props.disabled, true, 'fields stay locked when persistence is uncertain');
  f.setDetails({ departureDate: '2027-10-09', roomPreference: 'twin-share' }, '12');
  assert.deepEqual(f.fields().props.details, details, 'late changes cannot contradict the immutable retry draft');
  assert.equal(f.fields().props.travelers, '3');
  const first = f.calls[0];
  await f.close(); f.open();
  assert.equal(f.fields().props.disabled, true);
  assert.deepEqual(f.fields().props.details, details);
  await f.submit();
  assert.equal(f.calls.length, 1, 'submit cannot replace an uncertain request');
  f.respondWith(async () => success());
  f.find(node => node.type === 'button' && textOf(node).includes('Check & retry')).props.onClick();
  await f.settle();
  assert.equal(f.calls[1].body, first.body);
  assert.equal(f.calls[1].headers['Idempotency-Key'], first.headers['Idempotency-Key']);
  assert.equal(f.receipt().requestedTravelers, 3);
});

test('closing and reopening the same draft preserves choices; switching products clears small-group preferences', async t => {
  const f = fixture(t);
  f.setDetails(details, '3');
  await f.close();
  assert.equal(f.isOpen(), false);
  f.open();
  assert.equal(f.isOpen(), true);
  assert.deepEqual(f.fields().props.details, details);
  assert.equal(f.fields().props.travelers, '3');
  f.open('shanghai-suzhou-5-day-private-tour', null);
  assert.equal(f.fields(), undefined);
  const group = f.find(node => node.type === 'input' && node.props.name === 'requestedTravelers');
  assert.equal(group.props.value, '', 'actual party belongs to the itinerary that collected it');
  group.props.onChange({ target: { value: '5' } }); f.render();
  f.setEmail('traveller@example.invalid');
  await f.submit();
  const privatePayload = JSON.parse(f.calls[0].body);
  assert.equal(privatePayload.productInterest.slug, 'shanghai-suzhou-5-day-private-tour');
  assert.equal(privatePayload.travelDate, null);
  assert.match(privatePayload.note, /Requested group size: 5 travellers/);
  assert.doesNotMatch(privatePayload.note, /Small-group departure|Room preference|2027-05-08/);
  f.open();
  assert.deepEqual(f.fields().props.details, { departureDate: null, roomPreference: null });
  assert.equal(f.fields().props.travelers, '');
});

test('reopening after a saved enquiry starts fresh small-group preferences', async t => {
  const f = fixture(t);
  f.setDetails(details, '3'); f.setEmail('traveller@example.invalid');
  await f.submit();
  assert.ok(f.receipt());
  await f.close(); f.open();
  assert.equal(f.receipt(), undefined);
  assert.deepEqual(f.fields().props.details, { departureDate: null, roomPreference: null });
  assert.equal(f.fields().props.travelers, '');
});

for (const edition of [undefined, frenchContactEdition, spanishContactEdition]) test(`${edition?.language ?? 'en'} direct drafts retain the selected preferences while the saved-enquiry form is disabled`, t => {
  const f = fixture(t, { edition, formEnabled: false });
  assert.equal(f.find(node => node.type === 'form'), undefined);
  assert.equal(f.fields().props.disabled, false);
  f.setDetails(details, '3');
  const expected = smallGroupInquiryText(edition?.language ?? 'en', details, 3);
  for (const prefix of ['https://wa.me/', 'mailto:']) {
    const href = f.find(node => node.type === 'a' && node.props.href?.startsWith(prefix)).props.href;
    const message = new URL(href).searchParams.get(prefix === 'mailto:' ? 'body' : 'text').replaceAll('\r\n', '\n');
    assert.ok(message.includes(expected));
    assert.doesNotMatch(message, /private tour|private trip|· 2 travellers|· 2 voyageurs|· 2 viajeros/);
  }
  assert.equal(f.calls.length, 0);
});

for (const edition of [frenchContactEdition, spanishContactEdition]) test(`${edition.language} note reserves its language marker and validates below the 1000-character contract limit`, async t => {
  const f = fixture(t, { edition });
  const marker = edition.noteMarker(f.path(slug));
  const limit = 600 - marker.length - 2;
  assert.equal(f.note().props.maxLength, limit);
  assert.ok(limit > 0);
  f.setDetails(details, '12'); f.setEmail('traveller@example.invalid'); f.setSource('Perplexity');
  f.setNote('旅'.repeat(limit + 1));
  await f.submit();
  assert.equal(f.calls.length, 0);
  assert.equal(textOf(f.find(node => node.props.role === 'alert')), edition.noteTooLong(limit));
  f.setNote('旅'.repeat(limit));
  await f.submit();
  const payload = JSON.parse(f.calls[0].body);
  assert.ok(payload.note.startsWith(`${marker}\n\n`));
  assert.ok(payload.note.includes('旅'.repeat(limit)));
  assert.ok(payload.note.length <= 1000);
  assert.match(payload.note, /Requested group size: 12 travellers/);
  assert.equal(payload.locale, 'en', 'ES/FR retain the existing English intake contract');
  validatePayload(payload);
  assert.equal(f.receipt().requestedTravelers, 12);
});
