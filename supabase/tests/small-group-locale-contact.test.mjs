import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { componentHarness, elements, loadComponent, textOf } from './helpers/component-hooks.mjs';
import { frenchContactEdition } from '../../lib/frenchContactEdition.ts';
import { spanishContactEdition } from '../../lib/spanishContactEdition.ts';
import { getPrivateTourInquiryContext } from '../../lib/privateTourInquiryContext.ts';
import { fiveCitySmallGroupSlug, smallGroupInquiryCopy, smallGroupInquiryText } from '../../lib/smallGroupInquiry.ts';
import { currentPrivateTourQuoteFormVersion, travellerAckPrivacyNoticeVersion, validateAndNormalizeInquiry } from '../../lib/inquiryContract.ts';

const slug = fiveCitySmallGroupSlug;
const selection = { packageId: 'small-group-departure', travelers: 2 };
const details = { departureDate: '2027-09-11', roomPreference: 'single-room' };
const noop = () => {};
const file = path => fileURLToPath(new URL(`../../${path}`, import.meta.url));

for (const edition of [frenchContactEdition, spanishContactEdition]) test(`${edition.language} direct contact carries the selected departure, actual party and room without a fictitious party of two`, () => {
  const context = getPrivateTourInquiryContext(slug, 'en', selection);
  for (const travelers of [null, 1, 3, 12]) {
    const draft = { travelDate: details.departureDate, note: 'Two separate bookings & one family.', requestedTravelers: travelers, smallGroup: details };
    const expected = smallGroupInquiryText(edition.language, details, travelers);
    const mail = new URL(edition.mailtoHref(context, draft));
    for (const message of [edition.messageText(context, undefined, draft), mail.searchParams.get('body').replaceAll('\r\n', '\n')]) {
      assert.ok(message.startsWith(smallGroupInquiryCopy[edition.language].opening));
      assert.ok(message.includes(expected));
      assert.ok(message.includes(draft.note));
      assert.ok(message.includes(`/${edition.language}/tours/${slug}/`));
      assert.doesNotMatch(message, /· 2 voyageurs|· 2 viajeros|Arrivée prévue|Llegada prevista/);
    }
    assert.ok(mail.searchParams.get('subject').includes(smallGroupInquiryCopy[edition.language].subject));
  }
  assert.match(edition.selectionLabel(context), edition.language === 'fr' ? /tarif en chambre partagée à deux/ : /precio con dos personas por habitación/);
  const privateContext = getPrivateTourInquiryContext('shanghai-suzhou-5-day-private-tour', 'en', { packageId: 'standard-guided', travelers: 2 });
  assert.match(edition.selectionLabel(privateContext), edition.language === 'fr' ? /2 voyageurs/ : /2 viajeros/);
});

function japaneseFixture(t, { tourSlug = slug, selected = selection } = {}) {
  const globals = new Map(['window', 'document', 'HTMLElement', 'FormData', 'fetch'].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  const env = {};
  for (const suffix of ['INQUIRY_ENABLED', 'PRIVACY_READY', 'PRIVATE_TOUR_QUOTE_ENABLED', 'DIRECT_WHATSAPP_ENABLED']) {
    const name = `NEXT_PUBLIC_HOMEGROUND_${suffix}`;
    env[name] = process.env[name]; process.env[name] = 'true';
  }
  const listeners = new Map();
  const pathname = `/ja/tours/${tourSlug}/`;
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {
    location: { pathname }, setTimeout, clearTimeout,
    addEventListener: (type, listener) => listeners.set(type, listener),
    removeEventListener: type => listeners.delete(type), matchMedia: () => ({ matches: false }),
  } });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { activeElement: null } });
  Object.defineProperty(globalThis, 'HTMLElement', { configurable: true, value: class {} });
  Object.defineProperty(globalThis, 'FormData', { configurable: true, value: class { get() { return ''; } } });
  const calls = [];
  let respond = async () => new Response(JSON.stringify({ state: 'submitted', publicReference: 'HG-TEST-1234-ABCD', ackStatus: 'disabled' }), { status: 200 });
  globalThis.fetch = async (url, init) => { calls.push({ url, ...init }); return respond(); };
  const harness = componentHarness();
  const Fields = () => null;
  const Receipt = () => null;
  const { JapaneseInquiryDialog } = loadComponent(file('components/JapaneseInquiryDialog.tsx'), {
    react: harness.hooks,
    'next/navigation': { usePathname: () => pathname },
    '../lib/analytics': { trackEnquirySubmitted: noop, trackEvent: noop },
    '../lib/inquiryTrafficConsent': { inquiryBodyWithCurrentTrafficConsent: body => body },
    '../lib/tourContact': { privateTourQuoteApiUrl: () => 'https://example.invalid/mock-inquiries' },
    '../lib/japaneseSite': { japaneseGeneralContactHrefs: () => ({ whatsapp: '', email: '' }) },
    '../lib/siteOverlayState': { setInquiryOpen: noop },
    './InquiryReceipt': { InquiryReceipt: Receipt },
    './EmailTypoHint': { EmailTypoHint: () => null },
    './ContactCardScan': { ContactCardScan: () => null },
    './SmallGroupInquiryFields': { SmallGroupInquiryFields: Fields },
  });
  const render = () => harness.render(JapaneseInquiryDialog);
  const find = predicate => [...elements(harness.tree)].find(predicate);
  render();
  find(node => node.type === 'dialog').props.ref.current.querySelector = () => null;
  listeners.get('homeground:open-japanese-contact')({ detail: { slug: tourSlug, selection: selected } });
  render();
  t.after(() => {
    harness.unmount();
    for (const [name, descriptor] of globals) descriptor ? Object.defineProperty(globalThis, name, descriptor) : delete globalThis[name];
    for (const [name, value] of Object.entries(env)) value === undefined ? delete process.env[name] : process.env[name] = value;
  });
  const settle = async () => { await new Promise(resolve => setImmediate(resolve)); render(); };
  return { harness, calls, find, render, settle,
    fields: () => find(node => node.type === Fields),
    receipt: () => find(node => node.type === Receipt)?.props.receipt,
    setDetails(value, travelers) { const props = find(node => node.type === Fields).props; props.onChange(value); props.onTravelersChange(travelers); render(); },
    setEmail(value) { find(node => node.type === 'input' && node.props.type === 'email').props.onChange({ target: { value } }); render(); },
    setNote(value) { find(node => node.type === 'textarea').props.onChange({ target: { value } }); render(); },
    async submit() { find(node => node.type === 'form').props.onSubmit({ preventDefault: noop, currentTarget: {} }); render(); await settle(); },
    respondWith(callback) { respond = callback; },
  };
}

test('Japanese small-group form preserves real preferences in direct messages, submission and immutable retry', async t => {
  const f = japaneseFixture(t);
  assert.equal(f.fields().props.language, 'ja');
  assert.equal(f.find(node => node.type === 'input' && ['date', 'checkbox'].includes(node.props.type)), undefined);
  f.setDetails(details, '3');
  f.setEmail('traveller@example.invalid');
  f.setNote('静かな客室を希望します。');
  const expected = smallGroupInquiryText('ja', details, 3);
  for (const prefix of ['https://wa.me/', 'mailto:']) {
    const href = f.find(node => node.type === 'a' && node.props.href?.startsWith(prefix)).props.href;
    const url = new URL(href);
    const message = url.searchParams.get(prefix === 'mailto:' ? 'body' : 'text');
    assert.ok(message.includes(expected));
    assert.ok(message.includes('静かな客室を希望します。'));
    assert.ok(message.startsWith(smallGroupInquiryCopy.ja.opening));
    assert.doesNotMatch(message, /2名参加|旅行予定の時期/);
  }
  f.respondWith(async () => { throw new Error('unknown persistence'); });
  await f.submit();
  assert.equal(f.fields().props.disabled, true);
  const first = f.calls[0];
  const payload = JSON.parse(first.body);
  assert.equal(payload.travelDate, details.departureDate);
  assert.deepEqual(payload.productInterest.selection, selection);
  assert.match(payload.note, /Requested group size: 3 travellers/);
  assert.match(payload.note, /2027-09-11 to 2027-09-24/);
  assert.match(payload.note, /Room preference: Single room/);
  const { trafficSessionToken, ...contractPayload } = payload;
  assert.equal(trafficSessionToken, null);
  const validation = validateAndNormalizeInquiry(contractPayload, { allowedFormVersions: [currentPrivateTourQuoteFormVersion], allowedPrivacyNoticeVersions: [travellerAckPrivacyNoticeVersion] });
  assert.equal(validation.ok, true, JSON.stringify(validation));
  f.setDetails({ departureDate: '2027-10-09', roomPreference: 'twin-share' }, '12');
  assert.deepEqual(f.fields().props.details, details);
  assert.equal(f.fields().props.travelers, '3');
  await f.submit();
  assert.equal(f.calls.length, 1);
  f.respondWith(async () => new Response(JSON.stringify({ state: 'submitted', publicReference: 'HG-TEST-1234-ABCD', ackStatus: 'disabled' }), { status: 200 }));
  f.find(node => node.type === 'button' && textOf(node).includes('確認して再試行')).props.onClick();
  await f.settle();
  assert.equal(f.calls[1].body, first.body);
  assert.equal(f.calls[1].headers['Idempotency-Key'], first.headers['Idempotency-Key']);
  assert.equal(f.receipt().requestedTravelers, 3);
});

test('Japanese undecided choices remain valid and a long note produces a visible error before dispatch', async t => {
  const f = japaneseFixture(t);
  f.setEmail('traveller@example.invalid');
  f.setNote('旅'.repeat(601));
  await f.submit();
  assert.equal(f.calls.length, 0);
  assert.match(textOf(f.find(node => node.props.role === 'alert')), /600文字以内/);
  f.setNote('旅'.repeat(600));
  await f.submit();
  const payload = JSON.parse(f.calls[0].body);
  assert.equal(payload.travelDate, null);
  assert.doesNotMatch(payload.note, /Requested group size/);
  assert.match(payload.note, /Small-group departure: Not decided/);
  assert.match(payload.note, /Room preference: Not decided/);
  assert.ok(payload.note.length <= 1000);
  assert.equal(f.receipt().requestedTravelers, null);
});

test('Japanese private tours retain their original date controls', t => {
  const f = japaneseFixture(t, { tourSlug: 'beijing-xian-chengdu-guilin-shanghai-14-day-private-tour', selected: null });
  assert.equal(f.fields(), undefined);
  assert.ok(f.find(node => node.type === 'input' && node.props.type === 'checkbox'));
  assert.equal(f.find(node => node.type === 'textarea').props.maxLength, 900);
});
