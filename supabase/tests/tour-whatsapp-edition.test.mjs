import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import { getPrivateTourInquiryContext } from '../../lib/privateTourInquiryContext.ts';
import { homegroundWhatsAppHref, tourContactCopy, tourWhatsAppHref } from '../../lib/tourContact.ts';

const require = createRequire(import.meta.url);
const slug = 'zhangjiajie-4-day-private-tour';
const selection = { packageId: 'distinctive-mountain-stay', travelers: 6 };
const source = await readFile(new URL('../../components/TourWhatsAppLink.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;

function render(edition, selected = { slug, selection }) {
  const contextCalls = [], events = [], module = { exports: {} };
  const dependencies = {
    'react/jsx-runtime': require('react/jsx-runtime'),
    'lucide-react': { MessageCircle: () => null },
    '../lib/privateTourInquiryContext': { getPrivateTourInquiryContext(...args) { contextCalls.push(args); return getPrivateTourInquiryContext(...args); } },
    '../lib/tourContact': { homegroundWhatsAppHref, tourContactCopy, tourWhatsAppHref },
    '../lib/analytics': { trackEvent: (...args) => events.push(args) },
    './PrivateTourSelection': { usePrivateTourSelection: () => selected },
    './TourContactPanel.module.css': { secondaryLink: 'secondaryLink' },
  };
  vm.runInNewContext(compiled, { module, exports: module.exports, process: { env: {} }, require(id) { assert.ok(id in dependencies, id); return dependencies[id]; } });
  return { element: module.exports.TourWhatsAppLink({ locale: 'en', slug, edition }), contextCalls, events };
}
const spanish = { language: 'es', label: 'Hablar por WhatsApp', title: 'Zhangjiajie en 4 días', path: `/es/tours/${slug}/`, packageLabels: { 'distinctive-mountain-stay': 'Alojamiento con carácter en la montaña' }, guideNote: 'Guía en español con suplemento.' };
const french = { language: 'fr', label: 'Parler sur WhatsApp', title: 'Zhangjiajie en 4 jours', path: `/fr/tours/${slug}/`, packageLabels: { 'distinctive-mountain-stay': 'Séjour de caractère en montagne' }, guideNote: 'Guide francophone avec supplément.' };
const body = element => new URL(element.props.href).searchParams.get('text');

test('Spanish classic WhatsApp uses Spanish fields and the actual selected stay and party', () => {
  const { element, contextCalls, events } = render(spanish);
  assert.deepEqual(contextCalls, [[slug, 'en', selection]]);
  assert.deepEqual(body(element).split('\n'), ['Hola, me interesa este viaje.', 'Viaje: Zhangjiajie en 4 días', 'Opción: Alojamiento con carácter en la montaña', 'Número de viajeros: 6', 'Fechas aproximadas:', 'Guía en español con suplemento.', `Página: https://homegroundchina.com/es/tours/${slug}/`]);
  assert.doesNotMatch(body(element), /Bonjour|Circuit :|Formule :|voyageurs|Dates approximatives/);
  assert.equal(element.props['data-contact-tour'], slug);
  assert.equal(element.props['data-contact-package'], selection.packageId);
  assert.equal(element.props['data-contact-travelers'], 6);
  element.props.onClick();
  assert.equal(events[0][1].page_language, 'es');
  assert.equal(events[0][2].firstPartyContext.packageId, selection.packageId);
  assert.equal(events[0][2].firstPartyContext.travelers, 6);
});

test('French classic WhatsApp retains the original French wording and selected stay', () => {
  const { element } = render(french);
  assert.deepEqual(body(element).split('\n'), ['Bonjour, ce circuit m’intéresse.', 'Circuit : Zhangjiajie en 4 jours', 'Formule : Séjour de caractère en montagne', 'Nombre de voyageurs : 6', 'Dates approximatives :', 'Guide francophone avec supplément.', `Page : https://homegroundchina.com/fr/tours/${slug}/`]);
});

test('a missing or unrelated selection does not invent a package or party size in the Spanish draft', () => {
  for (const selected of [null, { slug: 'guilin-yangshuo-5-day-private-tour', selection: { packageId: 'standard-guided', travelers: 2 } }]) {
    const { element, contextCalls } = render(spanish, selected);
    assert.deepEqual(contextCalls, [[slug, 'en', undefined]]);
    const lines = body(element).split('\n');
    assert.ok(lines.includes('Opción: '));
    assert.ok(lines.includes('Número de viajeros: '));
    assert.equal(element.props['data-contact-package'], undefined);
    assert.equal(element.props['data-contact-travelers'], undefined);
  }
});

test('without an edition the original locale-specific WhatsApp path is unchanged', () => {
  const { element, contextCalls } = render(undefined);
  assert.deepEqual(contextCalls, [[slug, 'en', selection]]);
  assert.equal(element.props.href, tourWhatsAppHref('en', getPrivateTourInquiryContext(slug, 'en', selection)));
  assert.equal(element.props.children[1], tourContactCopy.en.alternative);
});
