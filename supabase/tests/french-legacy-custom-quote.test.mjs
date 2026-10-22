import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { componentHarness, elements, loadComponent, textOf } from './helpers/component-hooks.mjs';
import * as contact from '../../lib/tourContact.ts';
import { buildZhangjiajieCustomGroupInquiryHref } from '../../lib/privateTourInquiryContext.ts';
import { frenchContactEdition } from '../../lib/frenchContactEdition.ts';
import { frenchLegacyStayNames } from '../../lib/frenchLegacyContactCopy.ts';

const slug = 'zhangjiajie-4-day-private-tour';
const path = `/fr/tours/${slug}/`;
const stayIds = Object.keys(frenchLegacyStayNames);
const noop = () => {};
const off = () => false;
const originals = new Map(['window', 'document', 'HTMLElement', 'CustomEvent', 'fetch'].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
const cleanups = [];
afterEach(() => {
  while (cleanups.length) cleanups.pop()();
  for (const [name, descriptor] of originals) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  }
});

function browser(currentPath = path, ready = true) {
  const listeners = new Map();
  const events = [];
  const globals = {
    window: {
      location: new URL(currentPath, 'https://homegroundchina.com'),
      addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); },
      removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
      dispatchEvent(event) { events.push(event); for (const callback of listeners.get(event.type) ?? []) callback(event); return true; },
      setTimeout, clearTimeout, matchMedia: () => ({ matches: true }),
    },
    document: { activeElement: null, body: { style: {} }, querySelector: selector => ready && selector === '[data-homeground-contact-ready="true"]' ? {} : null },
    HTMLElement: class {},
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    fetch: () => { throw new Error('This local interaction test must never submit a request'); },
  };
  for (const [name, value] of Object.entries(globals)) Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
  return events;
}

function click(overrides = {}) {
  let prevented = false;
  return { event: { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() { prevented = true; }, ...overrides }, prevented: () => prevented };
}

function panel() {
  const harness = componentHarness();
  cleanups.push(() => harness.unmount());
  const { TourContactPanel } = loadComponent(fileURLToPath(new URL('../../components/TourContactPanel.tsx', import.meta.url)), {
    react: { ...harness.hooks, useSyncExternalStore: (_subscribe, snapshot) => snapshot() },
    'next/navigation': { usePathname: () => window.location.pathname },
    '../lib/tourContact': contact,
    '../lib/analytics': { getTrafficSessionToken: () => null, trackEnquirySubmitted: noop, trackEvent: noop },
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
    './InquiryReceipt': { InquiryReceipt: () => null },
    './EmailTypoHint': { EmailTypoHint: () => null },
  });
  const render = () => harness.render(TourContactPanel, { locale: 'en', edition: frenchContactEdition });
  const isOpen = () => [...elements(harness.tree)].find(element => element.type === 'dialog').props.ref.current.open;
  return { harness, render, isOpen };
}

test('all three French legacy stay CTAs immediately open the mounted quote with the selected stay', () => {
  const { GuideCtaLink } = loadComponent(fileURLToPath(new URL('../../components/GuideCtaLink.tsx', import.meta.url)), {
    '../lib/tourContact': contact,
    '../lib/analytics': { trackEvent: noop },
  });
  for (const stayId of stayIds) {
    const events = browser();
    const current = panel();
    current.render();
    assert.equal(current.isOpen(), false);
    const href = buildZhangjiajieCustomGroupInquiryHref('/fr/', slug, stayId);
    const link = GuideCtaLink({ href, guideId: slug, locale: 'en', children: 'Demander cet hébergement pour mon groupe' });
    assert.equal(link.props.href, href);
    const press = click();
    link.props.onClick(press.event);
    current.render();
    assert.equal(press.prevented(), true, stayId);
    assert.equal(window.location.pathname, path);
    assert.equal(window.location.search, '');
    assert.equal(current.isOpen(), true, stayId);
    assert.equal(events.length, 1);
    assert.equal(events[0].type, contact.tourContactOpenEvent);
    assert.deepEqual(events[0].detail.customGroup, { stayId });
    assert.equal(events[0].detail.selection, undefined);
    assert.ok(textOf(current.harness.tree).includes(frenchLegacyStayNames[stayId]));
    assert.ok([...elements(current.harness.tree)].some(element => element.type === 'input' && element.props.name === 'requestedTravelers'));
    cleanups.pop()();
  }
});

test('French modifier clicks and cross-page destinations retain their href behavior', () => {
  const href = buildZhangjiajieCustomGroupInquiryHref('/fr/', slug, stayIds[0]);
  for (const modifier of [{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    const events = browser();
    const press = click(modifier);
    assert.equal(contact.openTourContactFromLink(press.event, href, 'en'), false);
    assert.equal(press.prevented(), false);
    assert.equal(events.length, 0);
  }
  for (const currentPath of ['/fr/', '/fr/guides/', '/fr/tours/beijing-highlights-5-day-private-tour/']) {
    const events = browser(currentPath);
    assert.equal(contact.openTourContactFromLink(click().event, href, 'en'), false);
    assert.equal(events.length, 0);
  }
  for (const target of [
    href.replace('/fr/tours/', '/tours/'),
    `https://example.invalid${href}`,
    href.replace(stayIds[0], 'invalid-stay'),
  ]) {
    const events = browser();
    assert.equal(contact.openTourContactFromLink(click().event, target, 'en'), false);
    assert.equal(events.length, 0);
  }
  browser(path, false);
  assert.equal(contact.openTourContactFromLink(click().event, href, 'en'), false);
});

test('a direct French custom-group URL still opens on mount, and EN/ZH/KO clicks keep their existing contexts', () => {
  browser(buildZhangjiajieCustomGroupInquiryHref('/fr/', slug, stayIds[1]));
  const current = panel();
  current.render();
  assert.equal(current.isOpen(), true);
  assert.ok(textOf(current.harness.tree).includes(frenchLegacyStayNames[stayIds[1]]));
  cleanups.pop()();
  for (const locale of ['en', 'zh', 'ko']) {
    const home = locale === 'en' ? '/' : `/${locale}/`;
    const events = browser(`${home}tours/${slug}/`);
    const press = click();
    assert.equal(contact.openTourContactFromLink(press.event, buildZhangjiajieCustomGroupInquiryHref(home, slug, stayIds[2]), locale), true);
    assert.equal(press.prevented(), true);
    assert.equal(events.length, 1);
    assert.deepEqual(events[0].detail.customGroup, { stayId: stayIds[2] });
    assert.equal(events[0].detail.selection, undefined);
  }
});
