import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL('../../', import.meta.url));
const plain = value => JSON.parse(JSON.stringify(value));
const nil = () => null;
const css = { __esModule: true, default: new Proxy({}, { get: (_, name) => name }) };

// Transpile source, as in the existing layout tests. Stub visual wrappers only;
// pricing, copy, metadata, selection handlers and message builders stay real.
function loader(overrides = {}) {
  const cache = new Map();
  const visual = {
    'next/image': { __esModule: true, default: nil },
    'next/link': { __esModule: true, default: nil },
    'next/navigation': { notFound: () => { throw new Error('NOT_FOUND'); } },
    'lucide-react': new Proxy({}, { get: () => nil }),
    'lib/analytics.ts': { trackEvent: nil },
    'lib/guideRegistry.ts': { getGuideEntry: () => null },
    'components/useAnalyticsEvent.ts': { useVisibleAnalyticsEvent: () => ({ current: null }) },
    'components/KakaoTalkContact.tsx': { KakaoTalkContact: nil },
    'components/TourDateField.tsx': { TourDateField: nil },
    'components/ServiceEditionChrome.tsx': { ServiceEditionHeader: nil, ServiceEditionFooter: nil },
    'components/HomegroundHeader.tsx': { HomegroundHeader: nil },
    'components/HomegroundFooter.tsx': { HomegroundFooter: nil },
    'components/OpenDetailsForHash.tsx': { OpenDetailsForHash: nil },
    'components/text/KeepWords.tsx': { KeepWords: nil },
    ...overrides,
  };
  function load(relative) {
    const absolute = path.resolve(root, relative);
    const key = path.relative(root, absolute).replaceAll('\\', '/');
    if (key in visual) return visual[key];
    if (absolute.endsWith('.css')) return css;
    if (cache.has(absolute)) return cache.get(absolute).exports;
    if (absolute.endsWith('.json')) return JSON.parse(readFileSync(absolute, 'utf8'));
    const module = { exports: {} };
    cache.set(absolute, module);
    const code = ts.transpileModule(readFileSync(absolute, 'utf8'), { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    } }).outputText;
    vm.runInNewContext(code, { module, exports: module.exports, process, URL, URLSearchParams,
      require(id) {
        if (id in visual) return visual[id];
        if (!id.startsWith('.')) return require(id);
        const base = path.resolve(path.dirname(absolute), id);
        const resolved = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`].find(existsSync);
        assert.ok(resolved, `Cannot resolve ${id} from ${key}`);
        return load(resolved);
      },
    }, { filename: key });
    return module.exports;
  }
  return load;
}

function nodes(tree) {
  if (tree == null || typeof tree === 'boolean') return [];
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  if (typeof tree !== 'object') return [];
  return [tree, ...nodes(tree.props?.children)];
}
function text(tree) {
  if (tree == null || typeof tree === 'boolean') return '';
  if (Array.isArray(tree)) return tree.map(text).join('');
  if (typeof tree !== 'object') return String(tree);
  return text(tree.props?.children);
}
function one(tree, predicate, label) {
  const found = nodes(tree).filter(predicate);
  assert.equal(found.length, 1, label);
  return found[0];
}
function hooks() {
  const state = [];
  let cursor = 0;
  return {
    react: { ...require('react'), useId: () => 'test-service', useRef: () => ({ current: null }),
      useEffect: nil, useMemo: fn => fn(),
      useState(initial) {
        const index = cursor++;
        if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial;
        return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }];
      },
    },
    render(Component, props) { cursor = 0; return Component(props); },
  };
}
const load = loader();
const paths = load('lib/serviceEdition.ts');
const guides = load('lib/privateGuideServiceEditions.ts');
const guideRates = load('lib/privateGuideServices.ts');
const guideMessage = load('lib/privateGuideServiceMessage.ts');
const reservations = load('lib/attractionReservations.ts');
const reservationCopy = load('lib/attractionReservationEditions.ts');
const fullTripCopy = load('lib/fullTripSupportEditions.ts');
const fullTripMessage = load('lib/fullTripSupportMessage.ts');
const carCopy = load('lib/privateCarServiceEditions.ts');
const carMessage = load('lib/privateCarServiceMessage.ts');
const languages = ['fr', 'es', 'de', 'ar', 'ja'];

test('twenty real service routes generate their own canonical and reciprocal eight-language alternates', async () => {
  const pageStubs = Object.fromEntries([
    ['PrivateGuideServicesPage'], ['PrivateCarServicesPage'], ['AttractionReservationsPage'], ['FullTripSupportPage'],
  ].map(([name]) => [`components/${name}.tsx`, { [name]: function service() {} }]));
  const routeLoad = loader(pageStubs);
  const dispatch = routeLoad('components/ServiceEditionPage.tsx');
  const componentNames = ['PrivateGuideServicesPage', 'PrivateCarServicesPage', 'AttractionReservationsPage', 'FullTripSupportPage'];
  assert.equal(paths.serviceDetailSlugs.length, 4);
  for (const language of languages) {
    const folder = language === 'ja' ? 'japanese' : language === 'ar' ? 'arabic' : language === 'de' ? 'german' : language === 'fr' ? 'french' : 'spanish';
    const route = routeLoad(`app/(${folder})/${language}/services/[service]/page.tsx`);
    assert.equal(route.dynamicParams, false);
    assert.deepEqual(plain(route.generateStaticParams()).map(item => item.service), plain(paths.serviceDetailSlugs));
    for (const [index, slug] of paths.serviceDetailSlugs.entries()) {
      const params = Promise.resolve({ service: slug });
      const metadata = await route.generateMetadata({ params });
      const canonical = `/${language}/services/${slug}/`;
      assert.equal(metadata.alternates.canonical, canonical);
      assert.equal(new URL(metadata.openGraph.url, "https://homegroundchina.com").pathname, canonical);
      assert.deepEqual(Object.keys(metadata.alternates.languages).sort(), ['ar', 'de', 'en', 'es', 'fr', 'ja', 'ko', 'x-default', 'zh-Hans'].sort());
      for (const other of ['en', 'zh-Hans', 'ko', 'ja', 'fr', 'es', 'de', 'ar', 'x-default']) {
        const prefix = other === 'en' || other === 'x-default' ? '' : `/${other === 'zh-Hans' ? 'zh' : other}`;
        assert.equal(metadata.alternates.languages[other], `${prefix}/services/${slug}/`);
      }
      assert.doesNotMatch(metadata.description, /\{fee\}/);
      const routeElement = await route.default({ params });
      assert.equal(routeElement.props.language, language);
      const page = dispatch.ServiceEditionPage(routeElement.props);
      assert.equal(page.type, pageStubs[`components/${componentNames[index]}.tsx`][componentNames[index]]);
      assert.deepEqual(plain(page.props), { locale: 'en', editionLocale: language });
      const switcher = paths.serviceDetailLanguagePaths(slug);
      assert.equal(switcher.length, 8);
      assert.equal(switcher.find(item => item.lang === 'ja').path, `/ja/services/${slug}/`);
    }
    await assert.rejects(route.generateMetadata({ params: Promise.resolve({ service: 'invented-service' }) }), /NOT_FOUND/);
  }
});

for (const language of languages) {
  test(`${language}: choosing a local-language guide removes the English tariff from both contact channels`, () => {
    const h = hooks(), uiLoad = loader({ react: h.react });
    const { PrivateGuideEnquiry } = uiLoad('components/PrivateGuideEnquiry.tsx');
    const props = { locale: 'en', editionLocale: language };
    let tree = h.render(PrivateGuideEnquiry, props);
    one(tree, node => node.props?.name === 'city', 'city control').props.onChange({ target: { value: 'shanghai' } });
    tree = h.render(PrivateGuideEnquiry, props);
    const href = channel => one(tree, node => node.props?.['data-guide-channel'] === channel, channel).props.href;
    let body = new URL(href('whatsapp')).searchParams.get('text');
    assert.ok(body.includes(guides.formatPrivateGuideEditionPrice(1200, language)), 'English guide retains its published reference');
    one(tree, node => node.props?.name === 'guideLanguage', 'guide language control').props.onChange({ target: { value: language } });
    tree = h.render(PrivateGuideEnquiry, props);
    body = new URL(href('whatsapp')).searchParams.get('text');
    const email = new URL(href('email'));
    assert.equal(email.searchParams.get('body'), body);
    assert.match(email.searchParams.get('subject'), language === 'ja' ? /日本語ガイド/ : language === 'ar' ? /مرشد باللغة العربية/ : language === 'ja' ? /日本語ガイド/ : language === 'ar' ? /مرشد بالعربية/ : language === 'de' ? /deutschsprachiger/i : language === 'fr' ? /francophone/i : /española/i);
    assert.match(body, language === 'ja' ? /日本語ガイド/ : language === 'ar' ? /مرشد بالعربية/ : language === 'de' ? /deutschsprachiger/ : language === 'fr' ? /francophone/ : /habla española/);
    assert.match(body, language === 'ja' ? /別途/ : language === 'ar' ? /تأكيد السعر.*قبل الحجز/ : language === 'de' ? /Verfügbarkeit.*bestätigen/ : language === 'fr' ? /devis séparé/ : /presupuesto aparte/);
    assert.doesNotMatch(body, /CNY|USD|RMB/);
    assert.ok(body.endsWith(`https://homegroundchina.com/${language}/services/private-english-speaking-guides/`));
    for (const city of guideRates.privateGuideCities) {
      const draft = guideMessage.privateGuideServiceMessage(guides.getPrivateGuideServiceEditionCopy(language), 'en', {
        city, date: '2027-04-03', travellers: '4', note: '', guideLanguage: language,
        pageUrl: `https://homegroundchina.com/${language}/services/private-english-speaking-guides/`,
      }, language);
      assert.doesNotMatch(draft, /CNY|USD|RMB/, city);
      assert.match(draft, /2027-04-03/);
    }
  });

  test(`${language}: reservation selection charges CNY 45 per person per attraction and keeps the common guarantee`, () => {
    const enquiryStub = function Enquiry() {};
    const pageLoad = loader({ 'components/AttractionReservationEnquiry.tsx': { AttractionReservationEnquiry: enquiryStub } });
    const { AttractionReservationsPage } = pageLoad('components/AttractionReservationsPage.tsx');
    const page = AttractionReservationsPage({ locale: 'en', editionLocale: language });
    const props = one(page, node => node.type === enquiryStub, 'reservation enquiry').props;
    const copy = reservationCopy.getAttractionReservationEditionCopy(language);
    assert.equal(props.fee.amount, 45);
    assert.equal(props.fee.currency, 'CNY');
    assert.equal(props.pageUrl, `https://homegroundchina.com/${language}/services/china-attraction-reservations/`);
    assert.deepEqual(plain(props.attractions.map(item => item.id).sort()), plain(reservations.getBookableAttractionReservationRules().map(rule => rule.id).sort()));
    assert.equal(props.attractions.some(item => item.id === 'shanghai-museum-east'), false, 'walk-in attraction must not incur a reservation fee');
    assert.equal(reservations.ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS, 8);
    assert.match(copy.guarantee, /8/);
    const categoryException = language === 'ja' ? /対象外|除外/ : language === 'ar' ? /باستثناء.*دون ضمان|خارج ضمان الحجز/ : language === 'de' ? /außer.*nicht garantiert|keine Reservierungsgarantie/ : language === 'fr' ? /sauf.*sans garantie|hors garantie/ : /salvo.*sin garantía|fuera de la garantía/;
    assert.doesNotMatch(copy.guarantee, categoryException, 'no attraction category is excluded from the booking guarantee');
    assert.ok(copy.timingRows[2].body.includes(copy.guaranteeLate), 'the short-notice timing row retains the complete late policy');
    const timing = one(page, node => 'data-reservation-timing' in (node.props ?? {}), 'when to contact us');
    const timingRows = nodes(timing).filter(node => node.type === 'li');
    assert.equal(timingRows.length, 3, 'three contact timings');
    const latePolicy = text(one(timingRows[2], node => node.type === 'p', 'late request policy'));
    assert.equal(latePolicy, copy.timingRows[2].body, 'the page renders the full short-notice timing row');
    assert.match(latePolicy, language === 'ja' ? /8日.*(?:未満|切って).*相談/s : language === 'ar' ? /أقل من 8 أيام.*الاستفسار/ : language === 'de' ? /Weniger als 8 Tage.*anfragen/ : language === 'fr' ? /Moins de 8 jours.*contacter/ : /menos de 8 días.*consultarnos/s);
    const h = hooks(), uiLoad = loader({ react: h.react });
    const { AttractionReservationEnquiry } = uiLoad('components/AttractionReservationEnquiry.tsx');
    let tree = h.render(AttractionReservationEnquiry, props);
    const fee = () => text(one(tree, node => node.props?.className === 'summaryFeeValue', 'fee total'));
    assert.equal(fee(), '—', 'no attractions means no invented total');
    for (const id of ['forbidden-city', 'hanging-temple']) {
      one(tree, node => node.props?.name === 'attraction' && node.props.value === id, id).props.onChange();
      tree = h.render(AttractionReservationEnquiry, props);
    }
    one(tree, node => node.props?.name === 'travellers', 'party size').props.onChange({ target: { value: '3' } });
    tree = h.render(AttractionReservationEnquiry, props);
    const expected = new Intl.NumberFormat(language === 'ja' ? 'ja-JP' : language === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'es-ES', { style: 'currency', currency: 'CNY', currencyDisplay: 'code', maximumFractionDigits: 0 }).format(270);
    assert.equal(fee(), expected, '45 × 3 travellers × 2 attractions');
    const whatsapp = one(tree, node => node.props?.['data-reservation-channel'] === 'whatsapp', 'WhatsApp draft');
    const email = one(tree, node => node.props?.['data-reservation-channel'] === 'email', 'email draft');
    const body = new URL(whatsapp.props.href).searchParams.get('text');
    assert.equal(whatsapp.props['data-contact-card-scan-only'], true, 'QR card cannot switch into the generic email form and lose the chosen attractions');
    assert.equal(email.props['data-contact-card-direct'], true, 'email keeps the prepared reservation draft');
    assert.equal(new URL(email.props.href).searchParams.get('body'), body);
    const hanging = props.attractions.find(item => item.id === 'hanging-temple');
    assert.equal(hanging.label, reservationCopy.getAttractionReservationEditionRule(reservations.getAttractionReservationRule('hanging-temple'), language).name, 'the attraction label has no separate no-guarantee tag');
    assert.ok(body.includes(hanging.label), 'selected attraction must survive the message handoff');
    assert.doesNotMatch(body, /محاولة حجز دون ضمان|Reservierungsversuch ohne Garantie|sans garantie de réservation|sin garantía de reserva/, 'draft adds no attraction-category exclusion');
    assert.ok(body.includes(props.attractions.find(item => item.id === 'forbidden-city').label));
    assert.match(body, /: 3(?:\n|$)/);
    assert.ok(body.endsWith(props.pageUrl));
    assert.equal(nodes(tree).some(node => 'data-reservation-late-request' in (node.props ?? {})), false, 'the complete late policy stays in the timing row rather than repeating beside the send controls');
    one(tree, node => node.props?.name === 'travellers', 'party size').props.onChange({ target: { value: '' } });
    tree = h.render(AttractionReservationEnquiry, props);
    assert.equal(fee(), '—', 'blank party size cannot silently become one or two');
    const json = one(page, node => node.type === 'script' && node.props.type === 'application/ld+json', 'reservation schema');
    const schema = JSON.parse(json.props.dangerouslySetInnerHTML.__html)['@graph'];
    const offer = schema.find(node => node['@type'] === 'Service').offers;
    assert.equal(offer.price, '45');
    assert.equal(offer.priceCurrency, 'CNY');
    assert.ok(schema.filter(node => node.inLanguage).every(node => node.inLanguage === language));
  });

  test(`${language}: full-trip drafts preserve all currencies and per-person/group intent without inventing blank values`, () => {
    const copy = fullTripCopy.getFullTripSupportEditionCopy(language);
    const empty = { budget: '', currency: 'USD', basis: 'person', travellers: '', days: '', month: '', cities: '', note: '', pageUrl: `https://homegroundchina.com/${language}/services/full-trip-support/` };
    const blank = fullTripMessage.fullTripSupportMessage(copy, empty, '\u202f');
    assert.equal(blank.split('\n').length, 2);
    assert.ok(blank.endsWith(empty.pageUrl));
    assert.doesNotMatch(blank, /\d|USD|EUR|CNY/);
    for (const currency of fullTripMessage.fullTripBudgetCurrencies) for (const basis of fullTripMessage.fullTripBudgetBases) {
      const draft = fullTripMessage.fullTripSupportMessage(copy, { ...empty, budget: '1500', currency, basis, travellers: '3', days: '12', month: 'avril / abril', cities: 'Suzhou, Shanghai', note: 'Hotel déjà réservé / ya reservado' }, '\u202f');
      assert.ok(draft.includes(`${currency} 1\u202f500`), `${currency}/${basis}: budget stays in the traveller's currency`);
      assert.ok(draft.includes(copy.brief.basis[basis]));
      assert.ok(!draft.includes(copy.brief.basis[basis === 'person' ? 'group' : 'person']));
      assert.ok(draft.includes(copy.enquiry.message.flights), 'international flights remain outside the entered budget');
      assert.match(draft, /Suzhou, Shanghai/);
      assert.match(draft, /12/);
      assert.match(draft, /3/);
      assert.ok(draft.endsWith(empty.pageUrl));
    }
    const tinyBudget = fullTripMessage.fullTripSupportMessage(copy, { ...empty, budget: '1' }, '\u202f');
    assert.ok(tinyBudget.includes('USD 1'), 'no added budget minimum');
    const noteOnly = fullTripMessage.fullTripSupportMessage(copy, { ...empty, note: 'Shanghai' }, '\u202f');
    assert.ok(noteOnly.includes('Shanghai'));
    assert.ok(!noteOnly.includes(copy.enquiry.message.flights));
    assert.doesNotMatch(noteOnly, /USD|1500|1\u202f500/);
  });

  test(`${language}: car requests keep their localized source and do not become a price or booking confirmation`, () => {
    const copy = carCopy.getPrivateCarServiceEditionCopy(language);
    const sourcePath = `/${language}/services/private-car-and-driver/`;
    const draft = { kind: 'intercity', cities: 'Shanghai · Suzhou', date: '2027-04-03', dateUndecided: false, travellers: '3', luggage: '2 valises / maletas', pickup: 'Shanghai Pudong', pickupTime: '14:30', route: 'Shanghai\nSuzhou', note: '' };
    const message = carMessage.privateCarServiceMessage(copy, 'en', draft, sourcePath);
    assert.ok(message.endsWith(`https://homegroundchina.com${sourcePath}`));
    assert.ok(message.includes(copy.kinds.intercity.title));
    assert.ok(message.includes('Shanghai\nSuzhou'));
    assert.ok(message.includes('2027-04-03'));
    assert.ok(message.includes(copy.enquiry.message.confirmation));
    assert.doesNotMatch(message, /USD|CNY|RMB|¥|\$/);
    const open = carMessage.privateCarServiceMessage(copy, 'en', { ...draft, dateUndecided: true }, sourcePath);
    assert.ok(open.includes(copy.enquiry.message.datesOpen));
    assert.ok(!open.includes('2027-04-03'));
    const impossible = carMessage.privateCarServiceMessage(copy, 'en', { ...draft, date: '2027-02-30' }, sourcePath);
    assert.ok(!impossible.includes('2027-02-30'));
    assert.ok(impossible.includes(`${copy.enquiry.message.date}${copy.enquiry.message.separator}${copy.enquiry.message.none}`));
  });
}
