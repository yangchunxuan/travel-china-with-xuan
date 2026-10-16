import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { componentHarness, elements, loadComponent, textOf } from './helpers/component-hooks.mjs';
import { frenchContactEdition } from '../../lib/frenchContactEdition.ts';
import { frenchLegacyStayNames, frenchLegacyZhangjiajieContactTitle } from '../../lib/frenchLegacyContactCopy.ts';
import { getPrivateTourInquiryContext, getPrivateTourInquiryContextFromSearchParams, privateTourInquirySelectionLabel } from '../../lib/privateTourInquiryContext.ts';

const noop = () => {};
const slug = 'zhangjiajie-4-day-private-tour';
const selected = { packageId: 'selected-city-stay', travelers: 6 };
const query = `?tour=${slug}&utm_source=private_tour&utm_medium=website&utm_campaign=${slug}&package=${selected.packageId}&travelers=6`;
const file = path => fileURLToPath(new URL(`../../${path}`, import.meta.url));

function assertFrenchDraft(text, stay, count) {
  assert.ok(text.includes(frenchLegacyZhangjiajieContactTitle));
  assert.ok(text.includes(stay));
  assert.ok(text.includes(`${count} voyageurs`) || text.includes(`Voyageurs : ${count}`));
  assert.ok(text.includes(`/fr/tours/${slug}/`));
  assert.doesNotMatch(text, /Zhangjiajie in 4 Days|Selected City Stay|Spacious Premium Stay|Distinctive Mountain Stay/);
}

test('each legacy six-person choice keeps its French title, stay and price-basis group in both contact drafts', () => {
  for (const [packageId, stay] of Object.entries(frenchLegacyStayNames)) {
    const context = getPrivateTourInquiryContextFromSearchParams(new URLSearchParams(`tour=${slug}&package=${packageId}&travelers=6`), 'en');
    assert.deepEqual(context.selection, { packageId, travelers: 6 });
    assert.equal(frenchContactEdition.tourName(context), frenchLegacyZhangjiajieContactTitle);
    assert.equal(frenchContactEdition.selectionLabel(context), `${stay} · 6 voyageurs`);
    assertFrenchDraft(frenchContactEdition.messageText(context), stay, 6);
    const mail = new URL(frenchContactEdition.mailtoHref(context));
    assertFrenchDraft(mail.searchParams.get('body'), stay, 6);
    assert.ok(mail.searchParams.get('subject').includes(frenchLegacyZhangjiajieContactTitle));
  }
  // Original locale names and selection labels still belong to the existing contract.
  const en = getPrivateTourInquiryContext(slug, 'en', selected);
  assert.match(en.name, /^Zhangjiajie in 4 Days/);
  assert.equal(privateTourInquirySelectionLabel(en, 'en'), 'Selected City Stay · 6 travellers');
});

test('custom-group drafts retain the French stay preference without inventing a published price selection', () => {
  const context = getPrivateTourInquiryContext(slug, 'en', undefined, { stayId: 'selected-city-stay' });
  assert.equal(context.selection, undefined);
  assert.equal(frenchContactEdition.stayPreferenceLabel(context), 'Hôtel en ville');
  assert.ok(frenchContactEdition.messageText(context).includes('Hébergement souhaité (à confirmer) : Hôtel en ville'));
  const draft = { travelDate: null, note: '', requestedTravelers: 7, stayPreference: 'Selected City Stay' };
  assertFrenchDraft(frenchContactEdition.messageText(context, undefined, draft), 'Hôtel en ville', 7);
  assertFrenchDraft(new URL(frenchContactEdition.mailtoHref(context, draft)).searchParams.get('body'), 'Hôtel en ville', 7);
});

function browser() {
  const previous = new Map(['window', 'document', 'navigator'].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  const url = new URL(`https://homegroundchina.com/fr/${query}#planner-contact`);
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {
    location: url, setInterval: () => 1, clearInterval: noop, setTimeout, clearTimeout,
    addEventListener: noop, removeEventListener: noop,
    requestAnimationFrame: callback => { callback(); return 1; }, cancelAnimationFrame: noop,
    matchMedia: () => ({ matches: true }),
  } });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { querySelector: () => null, activeElement: null } });
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { onLine: true } });
  return () => { for (const [name, descriptor] of previous) descriptor ? Object.defineProperty(globalThis, name, descriptor) : delete globalThis[name]; };
}

for (const surface of ['inline', 'host']) test(`French homepage ${surface} contact renders the selected legacy stay and six travellers from the real URL`, t => {
  const restoreBrowser = browser();
  const harness = componentHarness();
  t.after(() => { harness.unmount(); restoreBrowser(); });
  const replacements = {
    react: harness.hooks,
    '../lib/analytics': { getTrafficSessionToken: () => null, trackEnquirySubmitted: noop, trackEvent: noop },
    '../lib/inquiryTrafficConsent': { inquiryBodyWithCurrentTrafficConsent: body => body },
    '../lib/contactCard': { holdPageScroll: () => noop },
    '../lib/newsletterPrompt': { markNewsletterPromptHandled: noop },
    '../lib/siteOverlayState': { setInquiryOpen: noop },
    './useAnalyticsEvent': { useAnalyticsEventOnce: () => noop, useVisibleAnalyticsEvent: () => ({ current: null }) },
    './ContactCardInlineScan': { useContactCardDesktop: () => true, ContactCardInlineScan: () => null },
    './ContactCardScan': { ContactCardScan: () => null, CopyButton: () => null },
    './InquiryReceipt': { InquiryReceipt: () => null },
    './EmailTypoHint': { EmailTypoHint: () => null },
    './KakaoTalkContact': { KakaoTalkContact: () => null },
  };
  if (surface === 'inline') {
    const { frenchHomepagePlanningCopy } = loadComponent(file('lib/frenchHomeCopy.ts'));
    const { HomepageQuickContact } = loadComponent(file('components/HomepageQuickContact.tsx'), replacements);
    harness.render(HomepageQuickContact, { locale: 'en', copy: frenchHomepagePlanningCopy, edition: frenchContactEdition, variant: 'hero' });
  } else {
    const { ContactCardDialog } = loadComponent(file('components/ContactCardDialog.tsx'), replacements);
    harness.render(ContactCardDialog, { locale: 'en', edition: frenchContactEdition, request: { trigger: 'planner' }, layout: 'card', open: true, onClose: noop });
  }
  assert.ok(textOf(harness.tree).includes(frenchLegacyZhangjiajieContactTitle));
  assert.ok(textOf(harness.tree).includes('Hôtel en ville · 6 voyageurs'));
  const links = [...elements(harness.tree)].filter(node => node.props.href);
  const whatsapp = links.find(node => node.props.href.startsWith('https://wa.me/'));
  const email = links.find(node => node.props.href.startsWith('mailto:'));
  assert.ok(whatsapp, 'WhatsApp link exists');
  assert.ok(email, 'email link exists');
  assertFrenchDraft(new URL(whatsapp.props.href).searchParams.get('text'), 'Hôtel en ville', 6);
  assertFrenchDraft(new URL(email.props.href).searchParams.get('body'), 'Hôtel en ville', 6);
});
