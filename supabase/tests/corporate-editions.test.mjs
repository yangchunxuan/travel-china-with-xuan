import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateTrips } from '../../lib/corporateTravel.ts';
import { corporateHubTitle, corporateHubDescription, corporateHubFaqs } from '../../lib/corporateTravelHub.ts';
import { corporateLocales, corporatePath, corporateAlternates } from '../../lib/corporateTravelLocalePaths.ts';
import { buildCorporateEnquiryDraft, corporateEnquiryEmailHref } from '../../lib/corporateEnquiryDraft.ts';

const copies = Object.fromEntries(corporateLocales.map(locale => [locale, JSON.parse(readFileSync(new URL(`../../lib/corporateTravelLocales/${locale}.json`, import.meta.url), 'utf8'))]));
const source = copies.en;
function compareShape(a, b, at = '') {
  assert.equal(Array.isArray(a), Array.isArray(b), `${at}: array shape`);
  if (Array.isArray(a)) { assert.equal(a.length, b.length, `${at}: preserve every source item`); a.forEach((item, i) => compareShape(item, b[i], `${at}.${i}`)); return; }
  assert.equal(typeof a, typeof b, `${at}: type`);
  if (a && typeof a === 'object') { assert.deepEqual(Object.keys(a).sort(), Object.keys(b).sort(), `${at}: fields`); for (const key of Object.keys(a)) compareShape(a[key], b[key], `${at}.${key}`); return; }
  if (typeof a !== 'string') { assert.equal(a, b, at); return; }
  assert.ok(b.trim(), `${at}: complete translation`);
  if (/\.(?:src|href|slug|id|number)$/.test(at)) { assert.equal(b, a, `${at}: immutable target/identifier`); return; }
  if (a.length > 70) assert.notEqual(b, a, `${at}: untranslated source paragraph`);
  assert.deepEqual(a.match(/\{(?:title|day|company)\}/g) ?? [], b.match(/\{(?:title|day|company)\}/g) ?? [], `${at}: placeholders`);
  // Local separators and words may change; the existing numerical facts may not.
  if (!at.includes('.ui.')) { const sourceNumbers = a.match(/[0-9]+/g) ?? []; const translatedNumbers = [...(b.match(/[0-9]+/g) ?? []), ...Object.entries({ '一': '1', '二': '2', '三': '3', '四': '4' }).filter(([word]) => b.includes(word)).map(([, number]) => number)]; for (const number of sourceNumbers) assert.ok(translatedNumbers.includes(number), `${at}: preserve source number ${number}`); }
}

test('English source snapshot exactly preserves both itineraries, pricing scope and hub FAQs', () => {
  assert.deepEqual(source.trips, corporateTrips);
  assert.equal(source.hub.title, corporateHubTitle);
  assert.equal(source.hub.description, corporateHubDescription);
  assert.deepEqual(source.hub.faqs, corporateHubFaqs);
});
test('all seven translations retain every source field, purpose, day, exclusion and numerical fact', () => {
  for (const locale of corporateLocales.filter(locale => locale !== 'en')) {
    compareShape(source, copies[locale], locale);
    assert.notEqual(copies[locale].hub.title, source.hub.title);
    assert.deepEqual(copies[locale].hub.purposes.map(p => p.id), ['company-trips', 'incentive-travel', 'meetings-retreats']);
    for (const [index, trip] of copies[locale].trips.entries()) {
      assert.equal(trip.days.length, 4);
      assert.notEqual(trip.story, source.trips[index].story);
      assert.notEqual(trip.faqs[0].answer, source.trips[index].faqs[0].answer);
    }
    for (const [key, value] of Object.entries(copies[locale].ui)) if (key.length > 35) assert.notEqual(value, key, `${locale}: UI translation missing: ${key}`);
  }
});
test('every corporate edition has eight reciprocal equivalent routes and the English default', () => {
  for (const slug of [undefined, ...corporateTrips.map(trip => trip.slug)]) {
    const alternatives = corporateAlternates(slug);
    assert.equal(Object.keys(alternatives).length, 9);
    for (const locale of corporateLocales) assert.equal(alternatives[locale === 'zh' ? 'zh-Hans' : locale], corporatePath(locale, slug));
    assert.equal(alternatives['x-default'], corporatePath('en', slug));
  }
});
test('Arabic group ranges retain left-to-right order inside right-to-left prose', () => {
  const strings = value => typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];
  const ranges = strings(copies.ar).flatMap(value => [...value.matchAll(/10–(?:30|24)/gu)].map(match => ({ value, index: match.index, range: match[0] })));
  assert.equal(ranges.length, 8, 'hub FAQ, two descriptions, two group sizes and two programme FAQs');
  for (const { value, index, range } of ranges) {
    assert.equal(value[index - 1], '\u2066', 'start the range with a left-to-right isolate');
    assert.equal(value[index + range.length], '\u2069', 'close the range isolation');
  }
});
test('each language prepares a local draft without changing group, itinerary, currency or sending it', () => {
  const draft = { company: 'Local QA & Co', name: '', email: '', people: '18', timing: 'May 2027, 4 days', purpose: 'meeting', trip: corporateTrips[1].slug, budget: 'USD 15,000', notes: '12 single / 3 twin' };
  for (const locale of corporateLocales) {
    const t = key => copies[locale].ui[key] ?? key;
    const referencePath = corporatePath(locale, draft.trip);
    const body = buildCorporateEnquiryDraft(draft, { translate: t, referencePath });
    assert.ok(body.includes('18') && body.includes('USD 15,000') && body.includes('12 single / 3 twin'));
    assert.ok(body.endsWith('https://homegroundchina.com' + referencePath));
    assert.ok(body.includes(t('Small meeting & team retreat')));
    const email = new URL(corporateEnquiryEmailHref('hello@homegroundchina.com', draft, body, t));
    assert.equal(email.searchParams.get('body'), body);
    assert.equal(email.searchParams.get('subject'), t('Company trip enquiry — {company}').replace('{company}', draft.company));
    assert.throws(() => buildCorporateEnquiryDraft({ ...draft, people: '2.5' }, { translate: t }));
  }
});
