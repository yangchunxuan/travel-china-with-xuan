import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { kakaoContactReportClientInfo, parseContactReport } from '../functions/_shared/admin-contact-contracts.ts';
import { fetchAdminTraffic, parseAdminTraffic } from '../../lib/adminClient.ts';
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

test('only the new traffic client sends the exact Kakao report opt-in using the existing CORS header',async()=>{
 const originalFetch=globalThis.fetch, originalWindow=globalThis.window;
 const calls=[];
 globalThis.window={setTimeout,clearTimeout};
 globalThis.fetch=async(url,init)=>{calls.push({url,init});return new Response(JSON.stringify(payload()),{headers:{'Content-Type':'application/json'}});};
 try {
  const result=await fetchAdminTraffic({trafficUrl:'https://project.supabase.co/functions/v1/admin-traffic',publishableKey:'test-key'},'test-token');
  assert.equal(result.contacts.periods[0].channels.length,4,'new clients can still read pre-rollout four-channel replies');
  assert.equal(calls[0].url,'https://project.supabase.co/functions/v1/admin-traffic');
  assert.equal(calls[0].init.headers['X-Client-Info'],kakaoContactReportClientInfo);
  assert.equal(calls[0].init.headers.Authorization,'Bearer test-token');
  assert.equal(calls[0].init.cache,'no-store');
 } finally {globalThis.fetch=originalFetch;globalThis.window=originalWindow;}
});

test('admin traffic Edge keeps legacy counts by default and selects the fifth-channel RPC only for explicit new clients',async()=>{
 const originalFetch=globalThis.fetch, originalDeno=globalThis.Deno;
 const userId='4dc94f12-a9e8-46bf-b7ad-925ffc768d3d';
 const env=new Map(Object.entries({ADMIN_ALLOWED_ORIGIN:'https://homegroundchina.com',ADMIN_API_ENABLED:'true',ADMIN_TRAFFIC_API_ENABLED:'true',
  ADMIN_ALLOWED_USER_IDS:userId,SUPABASE_URL:'https://project.supabase.co',SUPABASE_PUBLISHABLE_KEY:'sb_publishable_test',SUPABASE_SECRET_KEYS:JSON.stringify({default:'server-test-key'})}));
 let handler;
 globalThis.Deno={env:{get:name=>env.get(name)},serve:value=>{handler=value;}};
 const legacy=payload(), modern=payload();
 for(const period of modern.contacts.periods){const email=period.channels.find(c=>c.channel==='email');const zero=structuredClone(period.channels.find(c=>c.channel==='messenger'));zero.channel='email';email.channel='kakao';period.channels.push(zero);}
 const calls=[];
 globalThis.fetch=async(url,init)=>{
  const name=String(url).split('/').at(-1);calls.push({name,args:JSON.parse(init?.body??'{}')});
  let result;
  if(name==='user')result={id:userId};
  else if(name==='record_homeground_admin_access')result=true;
  else if(name==='get_homeground_admin_traffic_v3')result=[{payload:legacy}];
  else if(name==='get_homeground_admin_traffic_v4')result=[{payload:modern}];
  else assert.fail(`Unexpected backend call: ${name}`);
  return new Response(JSON.stringify(result),{headers:{'Content-Type':'application/json'}});
 };
 const now=Math.floor(Date.now()/1000),encode=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
 const token=[encode({alg:'none',typ:'JWT'}),encode({sub:userId,iss:'https://project.supabase.co/auth/v1',aud:'authenticated',iat:now-30,exp:now+900,aal:'aal2'}),'unit-test-signature'].join('.');
 const request=clientInfo=>new Request('https://project.supabase.co/functions/v1/admin-traffic',{headers:{Origin:'https://homegroundchina.com',apikey:'sb_publishable_test',Authorization:`Bearer ${token}`,...(clientInfo?{'X-Client-Info':clientInfo}:{})}});
 try {
  await import(`../functions/admin-traffic/index.ts?contact-compat=${Date.now()}`);
  for(const clientInfo of [undefined,'homeground-private-admin/1',`${kakaoContactReportClientInfo}-unknown`,kakaoContactReportClientInfo]){
   calls.length=0;
   const response=await handler(request(clientInfo));
   assert.equal(response.status,200);
   assert.equal(response.headers.get('cache-control'),'no-store');
   const actual=parseAdminTraffic(await response.json());
   const optedIn=clientInfo===kakaoContactReportClientInfo;
   assert.deepEqual(actual.contacts,parseContactReport((optedIn?modern:legacy).contacts,generatedAt));
   assert.deepEqual(calls.map(c=>c.name),['user',optedIn?'get_homeground_admin_traffic_v4':'get_homeground_admin_traffic_v3','record_homeground_admin_access']);
   assert.deepEqual(calls[1].args,{});
   assert.equal(calls[2].args.p_result,'success');
  }
  const preflight=await handler(new Request('https://project.supabase.co/functions/v1/admin-traffic',{method:'OPTIONS',headers:{Origin:'https://homegroundchina.com','Access-Control-Request-Method':'GET','Access-Control-Request-Headers':'authorization, apikey, x-client-info'}}));
  assert.equal(preflight.status,204);
 } finally {globalThis.fetch=originalFetch;globalThis.Deno=originalDeno;}
});
