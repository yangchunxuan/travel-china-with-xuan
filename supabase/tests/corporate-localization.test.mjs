import assert from 'node:assert/strict';
import test from 'node:test';
import { getCorporateHubCopy } from '../../lib/corporateTravelHub.ts';
import { getCorporateTrips } from '../../lib/corporateTravel.ts';
import { buildCorporateEnquiryDraft, corporateEnquiryEmailHref, getCorporateEnquiryCopy } from '../../lib/corporateEnquiryDraft.ts';

const addedLocales = ['ja', 'es', 'fr', 'de', 'ar'];
const sourceTrips = getCorporateTrips('en');
function completeTranslation(source, translated, path = '') {
  assert.equal(typeof translated, typeof source, `${path}: translated value type`);
  if (typeof source === 'string') {
    assert.ok(translated.trim(), `${path}: no empty text`);
    if (source.length > 40 && !/\.(?:src|href|slug|id)$/.test(path) && !source.startsWith('/')) {
      assert.notEqual(translated, source, `${path}: no untranslated English paragraph`);
    }
  } else if (Array.isArray(source)) {
    assert.equal(translated.length, source.length, `${path}: no missing or extra items`);
    source.forEach((value, index) => completeTranslation(value, translated[index], `${path}[${index}]`));
  } else if (source && typeof source === 'object') {
    assert.deepEqual(Object.keys(translated).sort(), Object.keys(source).sort(), `${path}: all content fields`);
    for (const key of Object.keys(source)) completeTranslation(source[key], translated[key], `${path}.${key}`);
  }
}

for (const locale of addedLocales) {
  test(`${locale}: complete new corporate copy preserves itinerary structure, group limits and photographs`, () => {
    completeTranslation(getCorporateHubCopy('en'), getCorporateHubCopy(locale), `${locale}.hub`);
    completeTranslation(getCorporateEnquiryCopy('en'), getCorporateEnquiryCopy(locale), `${locale}.enquiry`);
    const translated = getCorporateTrips(locale);
    completeTranslation(sourceTrips, translated, `${locale}.trips`);
    sourceTrips.forEach((source, index) => {
      const trip = translated[index];
      assert.equal(trip.slug, source.slug);
      assert.deepEqual(trip.groupSize.match(/\d+/g), source.groupSize.match(/\d+/g));
      assert.equal(trip.days.length, 4);
      assert.equal(trip.hero.src, source.hero.src);
      assert.deepEqual(trip.days.map(day => day.image.src), source.days.map(day => day.image.src));
    });
  });

  test(`${locale}: enquiry keeps the organiser's text, chosen programme and local reference through email encoding`, () => {
    const draft = { company: 'A & B', name: 'Preview', email: 'preview@example.com', people: '18', timing: 'May 2027', purpose: 'meeting', trip: 'shanghai-suzhou-4-day-company-retreat', budget: 'USD 15,000', notes: '12 single rooms\nVegetarian meals' };
    const copy = getCorporateEnquiryCopy(locale);
    const body = buildCorporateEnquiryDraft(draft, locale);
    for (const value of [draft.company, draft.budget, draft.notes, copy.message.group(18), copy.trips[draft.trip]]) assert.ok(body.includes(value));
    assert.ok(body.endsWith(`https://homegroundchina.com/${locale}/corporate-travel/${draft.trip}/`));
    const url = new URL(corporateEnquiryEmailHref('hello@homegroundchina.com', draft, body, locale));
    assert.equal(url.searchParams.get('body'), body);
    assert.equal(url.searchParams.get('subject'), `${copy.message.subject} — A & B`);
    assert.throws(() => buildCorporateEnquiryDraft({ ...draft, people: '0' }, locale), error => error.message === copy.errors.people);
  });
}
