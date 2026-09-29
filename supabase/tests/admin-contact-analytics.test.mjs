import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseContactReport } from '../functions/_shared/admin-contact-contracts.ts';
import { parseAdminTraffic } from '../../lib/adminClient.ts';
import { sanitizeAdminTrafficRpc } from '../functions/_shared/admin-traffic-contracts.ts';
const fixture = JSON.parse(await readFile(new URL('./fixtures/contact-report.json', import.meta.url),'utf8'));
const generatedAt = '2026-09-13T02:00:00Z';
const sample = () => structuredClone(fixture);
function payload() {
 const visible=count=>({count,suppressed:false});
 return { contractVersion:'homeground-admin-traffic.v3', generatedAt, timezone:'Asia/Shanghai',
 window:{ days:30,startsAt:'2026-08-14T02:00:00Z',endsAt:generatedAt },
 totals:Object.fromEntries(['sessions','pageViews','contactClickAttempts','emailFormStarts','attributedEnquiries','unknownSourceSessions','productViews','productSelections','formSubmitAttempts','formSubmitFailures','formSubmitUncertain'].map(k=>[k,visible(5)])),
 dimensions:{sources:[],campaigns:[],pages:[],products:[],productSelections:[]}, recentSessions:[],
 limits:{minimumVisibleCount:5,maximumRecentSessions:12,recentSessionsMinimumEligibleCount:5,perSessionEventsIncluded:false,timeResolution:'day',linkedInquirySessionsExcluded:true,sessionLabelScope:'current_30_day_window'},
 notice:{scope:'Consented anonymous sessions; not people, customers, or market share.',clickMeaning:'A contact-channel click does not prove that a message was sent.'},contacts:sample() };
}
test('contact report preserves exact aggregate clicks and session dedup, including small counts',()=>{
 const report=parseContactReport(sample(),generatedAt);
 const wa=report.periods[1].channels.find(c=>c.channel==='whatsapp');
 assert.equal(wa.clicks,4); assert.equal(wa.sessions,3);
 assert.equal(report.periods[0].channels.find(c=>c.channel==='whatsapp').clicks,3);
 assert.deepEqual(parseAdminTraffic(payload()).contacts,report);
 assert.deepEqual(sanitizeAdminTrafficRpc([{payload:payload()}]).contacts,report);
});
test('strict report rejects identities, raw queries, duplicated channels and inconsistent counts',()=>{
 const mutations=[
 v=>v.phone='private',
 v=>v.periods[0].channels[0].sessionHash='private',
 v=>v.periods[0].channels[0].dimensions.pages.rows[0].key='/?email=person@example.com',
 v=>v.periods[0].channels[0].dimensions.sources.rows[0].key='person@example.com',
 v=>v.periods[0].channels[0].clicks++,
 v=>v.periods[0].channels[0].sessions=999,
 v=>v.periods[0].channels[0].daily.pop(),
 v=>v.periods[0].channels[0].daily[0].day='2026-09-07',
 v=>v.periods[0].channels[1].channel=v.periods[0].channels[0].channel,
 v=>v.periods[0].startsAt='2026-09-05T02:00:00Z',
 v=>v.periods[0].channels[0].dimensions.pages.remainingClicks++,
 ];
 for(const mutate of mutations) {
  const report=sample(); mutate(report);
  assert.throws(()=>parseContactReport(report,generatedAt));
  const value=payload(); value.contacts=report;
  assert.throws(()=>parseAdminTraffic(value),{kind:'contract'});
  assert.equal(sanitizeAdminTrafficRpc([{payload:value}]),null);
 }
});
test('v2 fallback remains readable and has no invented contact data',()=>{
 const value=payload();value.contractVersion='homeground-admin-traffic.v2';delete value.contacts;
 assert.equal(parseAdminTraffic(value).contacts,undefined);
 assert.equal(sanitizeAdminTrafficRpc([{payload:value}]).contacts,undefined);
});
test('KakaoTalk reports add a fifth slice while pre-migration four-channel reports stay readable',()=>{
 const zeroKakao=report=>{for(const period of report.periods){const kakao=structuredClone(period.channels.find(c=>c.channel==='messenger'));kakao.channel='kakao';period.channels.push(kakao);}return report;};
 const five=parseContactReport(zeroKakao(sample()),generatedAt);
 assert.deepEqual(five.periods.map(p=>p.channels.find(c=>c.channel==='kakao').clicks),[0,0]);
 const moved=sample();
 for(const period of moved.periods){const email=period.channels.find(c=>c.channel==='email');const zero=structuredClone(period.channels.find(c=>c.channel==='messenger'));zero.channel='email';email.channel='kakao';period.channels.push(zero);}
 const clicked=parseContactReport(moved,generatedAt);
 assert.deepEqual(clicked.periods.map(p=>p.channels.find(c=>c.channel==='kakao').clicks),[1,1]);
 const value=payload();value.contacts=zeroKakao(sample());
 assert.deepEqual(parseAdminTraffic(value).contacts,five);
 assert.deepEqual(sanitizeAdminTrafficRpc([{payload:value}]).contacts,five);
 assert.equal(parseContactReport(sample(),generatedAt).periods[0].channels.length,4);
 const missingWhatsApp=sample();for(const period of missingWhatsApp.periods)period.channels.find(c=>c.channel==='whatsapp').channel='kakao';
 assert.throws(()=>parseContactReport(missingWhatsApp,generatedAt));
 const oneSided=sample();const kakao=structuredClone(oneSided.periods[0].channels.find(c=>c.channel==='messenger'));kakao.channel='kakao';oneSided.periods[0].channels.push(kakao);
 assert.throws(()=>parseContactReport(oneSided,generatedAt));
 const unknownChannel=zeroKakao(sample());unknownChannel.periods[0].channels.at(-1).channel='line';
 assert.throws(()=>parseContactReport(unknownChannel,generatedAt));
});
