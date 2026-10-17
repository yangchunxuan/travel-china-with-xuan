import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCorporateEnquiryDraft, corporateEnquiryEmailHref } from '../../lib/corporateEnquiryDraft.ts';

const brief = { company: 'A & B Studio', name: 'Test organiser', email: 'test@example.com', people: '18', timing: 'May 2027, 4 days', purpose: 'meeting', trip: 'shanghai-suzhou-4-day-company-retreat', budget: 'USD 15,000 total, excluding flights', notes: '12 single rooms, 3 twin rooms.\nVegetarian meals requested.' };

test('prepares the selected programme with rooming and unconverted budget, without implying a booking', () => {
  const text = buildCorporateEnquiryDraft(brief);
  assert.ok(text.includes('18 people'));
  assert.ok(text.includes('USD 15,000 total, excluding flights'));
  assert.ok(text.includes('12 single rooms, 3 twin rooms.\nVegetarian meals requested.'));
  assert.ok(text.includes('https://homegroundchina.com/corporate-travel/shanghai-suzhou-4-day-company-retreat/'));
  assert.ok(!text.includes('127.0.0.1'));
  assert.ok(text.includes('before we book'));
});
test('email handoff preserves ampersands, newlines and the complete message', () => {
  const text = buildCorporateEnquiryDraft(brief);
  const url = new URL(corporateEnquiryEmailHref('hello@homegroundchina.com', brief, text));
  assert.equal(url.searchParams.get('body'), text);
  assert.equal(url.searchParams.get('subject'), 'Company trip enquiry — A & B Studio');
});
test('rejects malformed group counts and unknown programme selections', () => {
  for (const people of ['0', '-1', '2.5', '18 people', '10000']) assert.throws(() => buildCorporateEnquiryDraft({ ...brief, people }));
  assert.throws(() => buildCorporateEnquiryDraft({ ...brief, trip: 'not-a-trip' }));
  assert.throws(() => buildCorporateEnquiryDraft({ ...brief, purpose: 'unknown' }));
  assert.throws(() => buildCorporateEnquiryDraft({ ...brief, purpose: 'toString' }));
});
test('an undecided destination stays open and does not silently select a package', () => {
  const text = buildCorporateEnquiryDraft({ ...brief, trip: 'undecided', purpose: 'undecided' });
  assert.ok(text.includes('Open to suggestions'));
  assert.ok(text.endsWith('https://homegroundchina.com/corporate-travel/'));
});
