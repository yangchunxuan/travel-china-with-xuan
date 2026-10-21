import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { editionReplyPromise, editionReplyPromisePattern, spanishFormalReplyPromise, withEditionReplyPromise } from '../../lib/editionReplyPromise.ts';

// Owner decision, 2026-10-22: every French, German, Spanish, Arabic and
// Japanese contact point says, in its own language, that Homeground replies
// in that language within 12 hours.

const file = path => fileURLToPath(new URL(`../../${path}`, import.meta.url));
const read = path => readFileSync(file(path), 'utf8');

// Copy modules import without extensions and import JSON, so transpile them
// (with default-import interop) instead of loading them as native modules.
const modules = new Map();
function loadModule(path) {
  if (modules.has(path)) return modules.get(path).exports;
  const module = { exports: {} };
  modules.set(path, module);
  const nativeRequire = createRequire(path);
  const js = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  new Function('require', 'module', 'exports', js)(specifier => {
    if (specifier.startsWith('.')) {
      const base = resolve(dirname(path), specifier);
      const local = [base, `${base}.ts`, `${base}.tsx`].find(candidate => existsSync(candidate) && /\.tsx?$/u.test(candidate));
      if (local) return loadModule(local);
    }
    return nativeRequire(specifier);
  }, module, module.exports);
  return module.exports;
}
const load = path => loadModule(file(path));
const editions = ['fr', 'de', 'es', 'ar', 'ja'];
const webEditions = ['fr', 'de', 'es', 'ar'];
const names = { fr: 'french', de: 'german', es: 'spanish', ar: 'arabic' };

function assertPromise(language, text, where) {
  assert.equal(typeof text, 'string', `${language} ${where}: text`);
  assert.match(text, editionReplyPromisePattern[language], `${language} ${where} must state the reply language and 12 hours: «${text}»`);
}

test('each edition has one reply line in its own language, with the 12 hours', () => {
  assert.deepEqual(Object.keys(editionReplyPromise).sort(), [...editions].sort());
  for (const language of editions) assertPromise(language, editionReplyPromise[language], 'reply line');
  assertPromise('es', spanishFormalReplyPromise, 'usted reply line');
  assert.equal(withEditionReplyPromise('Texte.', 'fr'), `Texte. ${editionReplyPromise.fr}`);
  assert.equal(withEditionReplyPromise('本文。', 'ja'), `本文。${editionReplyPromise.ja}`);
});

test('the edition homepage contact section (also the contact page) states the reply line', () => {
  for (const language of webEditions) {
    const name = names[language];
    const copy = load(`lib/${name}HomeCopy.ts`)[`${name}HomepagePlanningCopy`];
    assertPromise(language, copy.contactNoPayment, 'homepage contact line');
    // Screen readers hear it with the WhatsApp action, as in English.
    assertPromise(language, copy.contactStart.whatsappOpensExternally, 'homepage WhatsApp note');
  }
  // The hero contact board renders contactNoPayment; the contact pages reuse that section.
  assert.match(read('components/HomepageQuickContact.tsx'), /variant === "hero" && copy\.contactNoPayment/u);
  for (const language of webEditions) {
    const Name = names[language][0].toUpperCase() + names[language].slice(1);
    assert.match(read(`components/${Name}ContactPage.tsx`), new RegExp(`<${Name}HomeContact ?/>`, 'u'), `${language} contact page`);
  }
  assertPromise('ja', /body="([^"]+)"/u.exec(read('components/JapaneseHomeContact.tsx'))[1], 'homepage contact panel');
});

test('the tour enquiry dialog and the contact card state the reply line', () => {
  for (const language of webEditions) {
    const edition = load(`lib/${names[language]}ContactEdition.ts`)[`${names[language]}ContactEdition`];
    assertPromise(language, edition.direct.intro, 'tour dialog intro');
    assertPromise(language, edition.tourContact.unavailable, 'tour dialog without the form');
    assertPromise(language, edition.tourContact.guideBody, 'guide enquiry dialog');
    assertPromise(language, edition.desk.whatsappOpensExternally, 'contact card WhatsApp note');
  }
});

test('every tour page contact area states the reply line', () => {
  for (const language of webEditions) {
    const name = names[language];
    const site = load(`lib/${name}Site.ts`);
    assertPromise(language, site[`${name}TourContactNote`], 'tour price and final contact note');
    assertPromise(language, site[`${name}DraftNote`], 'winter tour contact note');
    assertPromise(language, load(`lib/${name}LegacyPresentation.ts`)[`${name}ClassicCopy`].finalBody, 'Zhangjiajie legacy final call');
    assertPromise(language, load(`lib/${name}LegacyTours.ts`)[`${name}HalfDayCopy`].enquiryNote, 'Terracotta half-day enquiry');
  }
  assertPromise('ja', load('lib/japaneseSite.ts').japaneseDraftNote, 'tour price and final contact note');
  assertPromise('ja', load('lib/japaneseTerracottaHalfDay.ts').japaneseHalfDayCopy.enquiryNote, 'Terracotta half-day enquiry');
  // The final call of the shared tour page shows those notes for every edition.
  assert.match(read('components/ShanghaiJiangnanImaginePage.tsx'),
    /<p className=\{styles\.draftNote\}>\{spanish \? spanishContactNote : french \? frenchContactNote : german \? germanContactNote : arabic \? arabicContactNote : japaneseDraftNote\}<\/p>/u);
});

test('the service and attraction-reservation enquiry areas state the reply line', () => {
  const guides = load('lib/privateGuideServiceEditions.ts');
  const cars = load('lib/privateCarServiceEditions.ts');
  const support = load('lib/fullTripSupportEditions.ts');
  for (const language of editions) {
    assertPromise(language, guides.getPrivateGuideServiceEditionCopy(language).enquiry.body, 'private guide enquiry');
    assertPromise(language, cars.getPrivateCarServiceEditionCopy(language).enquiry.body, 'private car enquiry');
    assertPromise(language, support.getFullTripSupportEditionCopy(language).enquiry.free, 'full-trip enquiry');
  }
  assert.match(read('components/AttractionReservationsPage.tsx'),
    /<p>\{editionLocale \? withEditionReplyPromise\(copy\.enquiry\.intro, editionLocale\) : copy\.enquiry\.intro\}<\/p>/u,
    'attraction reservation enquiry intro');
});

test('the edition guides’ booking call states the reply line', () => {
  const { reservationGuideFooterCopy } = load('lib/reservationGuideCommercialCopy.ts');
  for (const language of editions) assertPromise(language, reservationGuideFooterCopy[language].body, 'guide booking call');
  assert.match(read('components/SpanishGuidePage.tsx'), /solo tiene que enviarlo\. \{spanishFormalReplyPromise\}/u, 'Spanish guide booking call');
  assert.match(read('components/SpanishContactPanel.tsx'), /\{spanishDraftNote\}/u, 'Spanish guides hub panel');
  assert.match(read('app/(japanese)/ja/guides/shanghai-hangzhou-transport-route/page.tsx'), /\{japaneseDraftNote\}/u, 'Japanese transport guide');
});

test('the Japanese inquiry dialog and every Japanese contact panel state the reply line', () => {
  const dialog = read('components/JapaneseInquiryDialog.tsx');
  const intro = /<p className=\{styles\.intro\}>\{(.+)\}<\/p>/u.exec(dialog)?.[1];
  assert.ok(intro, 'dialog intro');
  const variants = [...intro.matchAll(/"([^"]+)"/gu)].map(match => match[1]);
  assert.equal(variants.length, 3, 'winter, tour and general intro');
  for (const text of variants) assertPromise('ja', text, 'inquiry dialog intro');
  const callers = readdirSync(file('components')).filter(name => name.endsWith('.tsx') && name !== 'JapaneseContactPanel.tsx')
    .flatMap(name => [...read(`components/${name}`).matchAll(/<JapaneseContactPanel\b[^>]*?body="([^"]+)"/gsu)].map(match => [name, match[1]]));
  assert.ok(callers.length >= 3, 'home, cost guide and not-found panels');
  for (const [name, body] of callers) assertPromise('ja', body, `${name} contact panel`);
});

test('Spanish contact points use one wording for the reply', () => {
  const { spanishSalesFacts } = load('lib/spanishSales.ts');
  assertPromise('es', spanishSalesFacts.book, 'how to book');
  assertPromise('es', spanishSalesFacts.reply, 'reply fact');
  for (const path of ['lib/spanishSales.ts', 'lib/spanish-sales/services.ts', 'components/SpanishGuidePage.tsx']) {
    assert.doesNotMatch(read(path), /[Rr]espondemos en menos de 12 horas/u, `${path}: one wording`);
  }
});
