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
test('Chinese and Korean pages prepare the brief in their own language and point to their own pages', () => {
  const zh = buildCorporateEnquiryDraft(brief, 'zh');
  assert.ok(zh.includes('大概人数：18 人'));
  assert.ok(zh.includes('公司：A & B Studio'));
  assert.ok(zh.endsWith('https://homegroundchina.com/zh/corporate-travel/shanghai-suzhou-4-day-company-retreat/'));
  const ko = buildCorporateEnquiryDraft({ ...brief, trip: 'undecided' }, 'ko');
  assert.ok(ko.includes('예상 인원: 18명'));
  assert.ok(ko.includes('추천 부탁드립니다'));
  assert.ok(ko.endsWith('https://homegroundchina.com/ko/corporate-travel/'));
  const url = new URL(corporateEnquiryEmailHref('hello@homegroundchina.com', brief, zh, 'zh'));
  assert.equal(url.searchParams.get('subject'), '公司旅游咨询 — A & B Studio');
  assert.throws(() => buildCorporateEnquiryDraft({ ...brief, company: ' ' }, 'ko'), /회사명/);
});
