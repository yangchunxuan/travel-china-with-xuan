// Local PostgreSQL WASM check. No network, provider calls or production data.
// HOMEGROUND_PGLITE_PACKAGE_PATH=<package root> node --experimental-strip-types tools/verify-traveller-ack-sql.mjs
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash, randomUUID } from 'node:crypto';
import { getPrivateTourInquiryContext } from '../lib/privateTourInquiryContext.ts';
import { destinationTimingRuleVersion } from '../lib/inquiryContract.ts';
const packageRoot=process.env.HOMEGROUND_PGLITE_PACKAGE_PATH;
const spec=(file,fallback)=>packageRoot?pathToFileURL(join(packageRoot,file)).href:fallback;
const [{PGlite},{pgcrypto}]=await Promise.all([
  import(spec('dist/index.js','@electric-sql/pglite')),
  import(spec('dist/contrib/pgcrypto.js','@electric-sql/pglite/contrib/pgcrypto')),
]);
const db=await PGlite.create({extensions:{pgcrypto}});
const hash=value=>createHash('sha256').update(value).digest('hex');
const sqlFile=name=>readFile(new URL(`../supabase/migrations/${name}`,import.meta.url),'utf8');
const rows=async(sql,args=[]) => (await db.query(sql,args)).rows;
const result=async(sql,args=[]) => (await rows(sql,args))[0].result;
const savedFetch=globalThis.fetch, savedDeno=globalThis.Deno;
try {
  await db.exec(`create role anon; create role authenticated; create role service_role; create schema extensions;
    -- Metadata-only schedule stubs; no timer, network or scheduler is tested here.
    create schema cron;
    create table cron.job(jobid bigint generated always as identity primary key,jobname text unique,schedule text,command text,active boolean default true);
    create function cron.schedule(p_name text,p_schedule text,p_command text) returns bigint language plpgsql as $$ declare v_id bigint; begin
      insert into cron.job(jobname,schedule,command) values(p_name,p_schedule,p_command) returning jobid into v_id; return v_id; end $$;
    create function cron.unschedule(p_name text) returns boolean language plpgsql as $$ begin delete from cron.job where jobname=p_name; return true; end $$;`);
  for(const name of [
    '202607180001_homeground_inquiries.sql',
    '202607180003_homeground_rate_limit_retention.sql',
    '202607190002_homeground_destination_inquiries.sql',
    '202607200001_homeground_contact_intake.sql',
    '202607200002_homeground_budget_intake.sql',
    '202607210001_homeground_destination_intake_v4.sql',
    '202607210003_homeground_admin_read_models.sql',
    '202607270001_homeground_homepage_email.sql',
    '202607270002_homeground_homepage_email_rpc_fix.sql',
    '202607310001_homeground_traffic_attribution.sql',
    '202608240001_homeground_private_tour_email_context.sql',
    '202609050001_homeground_private_tour_selection.sql',
    '202609100001_homeground_private_tour_quote.sql',
    '202609190001_add_zhangjiajie_furong_fenghuang_private_tour.sql',
    '202609210001_add_homeground_private_tour_expansion.sql',
    '202609210002_add_homeground_private_tour_expansion_phase_two.sql',
    '202609230001_add_six_traveller_private_tour_prices.sql',
    '202609230002_preserve_private_tour_selection_after_phase_two.sql',
    '202609250001_add_homeground_long_haul_tours.sql',
    '202609270001_add_japanese_email_and_quote_inquiries.sql',
    '202609280001_homeground_traveller_ack.sql',
    '202609280002_inquiry_privacy_ack_disclosure.sql',
    '202609280003_traveller_ack_staff_status.sql',
    '202609280004_freeze_internal_notification_message.sql',
  ]) {
    try {
      const source = await sqlFile(name);
      // PGlite does not run cron; only this prerequisite extension declaration is omitted.
      await db.exec(source.replace('create extension if not exists pg_cron with schema pg_catalog;', ''));
    }
    catch(error) { throw new Error(`${name}: ${error.message}`); }
  }
  console.log('PASS original prerequisite and new migrations execute in PostgreSQL');
  const env=new Map(Object.entries({
    ALLOWED_ORIGINS:'https://homegroundchina.com', ALLOWED_FORM_VERSIONS:'2026-07-21.1,2026-07-26.1,2026-09-10.1',
    ALLOWED_PRIVACY_NOTICE_VERSIONS:'2026-07-21.1,2026-07-26.1,2026-09-28.1',
    SUPABASE_URL:'https://test.supabase.co', SUPABASE_SECRET_KEYS:JSON.stringify({default:'local-only-test-key'}),
    IDEMPOTENCY_HASH_SECRET:'local-test-idempotency-key',RATE_LIMIT_HASH_SECRET:'local-test-rate-key',
    RATE_LIMIT_10_MINUTES:'100',RATE_LIMIT_24_HOURS:'1000',TRAVELLER_ACK_ENABLED:'true',WHATSAPP_ENABLED:'true',REPLY_SLA_HOURS:'24',
  }));
  let intake, failPrepare=false;
  globalThis.Deno={env:{get:name=>env.get(name)},serve:fn=>{intake=fn;}};
  async function rpc(name,args={}) {
    assert.match(name,/^[a-z_0-9]+$/);const entries=Object.entries(args);
    for(const [key]of entries)assert.match(key,/^p_[a-z_0-9]+$/);
    await db.exec('set role service_role');
    try {return await result(`select public.${name}(${entries.map(([key],i)=>`${key} => $${i+1}`).join(',')}) as result`,entries.map(([,value])=>value));}
    finally {await db.exec('reset role');}
  }
  globalThis.fetch=async(url,init)=>{
    const parsed=new URL(url);assert.equal(parsed.origin,'https://test.supabase.co','only local PostgreSQL RPC permitted');
    const name=parsed.pathname.split('/').at(-1);
    if(failPrepare&&name==='prepare_homeground_traveller_ack_v1')throw Error('simulated preparation transport failure');
    try {return new Response(JSON.stringify(await rpc(name,JSON.parse(init.body))),{status:200});}
    catch(error){console.error('RPC failure',name,error.message);return new Response(JSON.stringify({code:error.code,message:error.message}),{status:400});}
  };
  await import('../supabase/functions/v1-inquiries/index.ts');
  const post=async(payload,key=randomUUID())=>{
    const response=await intake(new Request('https://test.supabase.co/functions/v1/v1-inquiries',{
      method:'POST',headers:{Origin:'https://homegroundchina.com','Content-Type':'application/json','Idempotency-Key':key,'X-Forwarded-For':'203.0.113.5'},body:JSON.stringify(payload),
    }));return {http:response.status,...await response.json()};
  };
  const home=(email,locale='en')=>({schemaVersion:3,formVersion:'2026-07-26.1',entryPath:'homepage_email',locale,
    contact:{channel:'email',email},privacyNoticeVersion:'2026-09-28.1',attribution:{landingPath:locale==='en'?'/':`/${locale}/`},experiment:null,antiAbuse:{companyWebsite:''}});
  const getJob=async(ref)=>(await rows('select o.*,i.public_reference,i.privacy_notice_version from homeground_private.traveller_ack_outbox o join homeground_private.inquiries i using(inquiry_id) where i.public_reference=$1',[ref]))[0];
  const firstKey=randomUUID(), firstPayload=home('family@example.invalid');
  const first=await post(firstPayload,firstKey);assert.equal(first.http,201,JSON.stringify(first));assert.equal(first.ackStatus,'queued');
  const repeat=await post(firstPayload,firstKey);assert.equal(repeat.http,200);assert.equal(repeat.publicReference,first.publicReference);assert.equal(repeat.firstResponseDueAt,first.firstResponseDueAt);
  const second=await post(firstPayload);assert.equal(second.http,201);assert.notEqual(second.publicReference,first.publicReference);assert.equal(second.ackStatus,'suppressed');
  console.log('PASS same-request replay keeps identity/deadline; distinct enquiry saved with only receipt suppressed');
  for(const locale of ['en','zh','ko','ja']) {
    const payload=home(`${locale}@example.invalid`,locale);const received=await post(payload);assert.equal(received.http,201);assert.equal(received.ackStatus,'queued');
    const product=getPrivateTourInquiryContext('shanghai-suzhou-5-day-private-tour',locale);
    const quote={...home(`quote-${locale}@example.invalid`,locale),schemaVersion:4,formVersion:'2026-09-10.1',entryPath:'private_tour_quote',productInterest:product,travelDate:'2026-12-03',note:'[Requested group size: 15 travellers]\n\nSensitive free text not for receipt.',attribution:{landingPath:`${locale==='en'?'':`/${locale}`}/tours/${product.slug}/`}};
    const receivedQuote=await post(quote);assert.equal(receivedQuote.http,201,JSON.stringify(receivedQuote));assert.equal(receivedQuote.ackStatus,'queued');
  }
  const destAnswers={destinationMode:'wishlist',destinationIds:['shanghai'],otherPlace:null,totalNights:6,party:'two-adults',pace:'classic',mustSeeIds:[]};
  const destination={...home('planner@example.invalid'),schemaVersion:2,formVersion:'2026-07-21.1',entryPath:'destination_timing',departureCountry:null,roughBudgetPerPerson:null,note:null,journey:{journeyId:randomUUID(),revision:1,routeId:'destination-timing',ruleVersion:destinationTimingRuleVersion,answers:destAnswers}};
  const planned=await post(destination);assert.equal(planned.http,201,JSON.stringify(planned));assert.equal(planned.ackStatus,'queued');assert.equal((await getJob(planned.publicReference)).privacy_notice_version,'2026-09-28.1');
  console.log('PASS four languages and wrapped destination intake retain current disclosure and atomic receipt');
  const phone=await post({...destination,contact:{channel:'whatsapp',phoneRaw:'+65 8123 4567'}});assert.equal(phone.http,201);assert.equal(phone.ackStatus,'disabled');
  env.set('TRAVELLER_ACK_ENABLED','false');const offKey=randomUUID(),offPayload=home('off@example.invalid');const off=await post(offPayload,offKey);assert.equal(off.ackStatus,'disabled');
  env.set('TRAVELLER_ACK_ENABLED','true');assert.equal((await post(offPayload,offKey)).ackStatus,'disabled');
  const legacy=await post({...home('legacy@example.invalid'),privacyNoticeVersion:'2026-07-26.1'});assert.equal(legacy.http,201);assert.equal(legacy.ackStatus,'disabled');
  failPrepare=true;const unavailable=await post(home('prepare-failed@example.invalid'));failPrepare=false;assert.equal(unavailable.http,201);assert.equal(unavailable.ackStatus,'unavailable');
  console.log('PASS phone-only, feature-off, legacy and setup failure preserve enquiries without retrospective receipts');
  let claims=(await rows("select * from public.claim_homeground_traveller_ack_v1('local-sql-test',10,90)"));assert.ok(claims.length>0);
  const actualParty=claims.filter(j=>j.entry_path==='private_tour_quote');assert.ok(actualParty.length);
  assert.ok(actualParty.every(j=>j.requested_travelers===15));
  const duplicateClaims=await rows("select * from public.claim_homeground_traveller_ack_v1('second-worker',10,90)");
  assert.ok(duplicateClaims.every(j=>!claims.some(x=>j.job_id===x.job_id)));
  const job=claims[0];
  const frozenMessage={from:'Homeground China <hello@homegroundchina.com>',to:[job.contact_email],reply_to:'hello@homegroundchina.com',subject:'Local test',text:'No internal notes',html:'<p>No internal notes</p>'};
  const freeze={p_job_id:job.job_id,p_lease_token:job.lease_token,p_row_version:job.row_version,p_message:frozenMessage};
  assert.deepEqual(await rpc('freeze_homeground_traveller_ack_message_v1',freeze),frozenMessage);
  assert.deepEqual(await rpc('freeze_homeground_traveller_ack_message_v1',{...freeze,p_message:{...frozenMessage,text:'Different deployment'}}),frozenMessage);
  const finish={p_job_id:job.job_id,p_lease_token:job.lease_token,p_row_version:job.row_version,p_accepted:true,p_terminal:false,p_provider_message_id:'provider-local-only',p_error_code:null,p_next_attempt_at:null};
  assert.equal(await rpc('finish_homeground_traveller_ack_v1',{...finish,p_lease_token:randomUUID()}),false);
  assert.equal(await rpc('finish_homeground_traveller_ack_v1',finish),true);assert.equal(await rpc('finish_homeground_traveller_ack_v1',finish),false);
  const event={p_event_id:'evt-local-bounce',p_provider_message_id:'provider-local-only',p_job_id:job.job_id,p_event_type:'bounced',p_reason:'hard_bounce'};
  assert.equal(await rpc('record_homeground_traveller_ack_event_v1',event),true);assert.equal(await rpc('record_homeground_traveller_ack_event_v1',event),true);
  assert.equal((await rows("select count(*)::integer as n from homeground_private.traveller_ack_events where event_id='evt-local-bounce'"))[0].n,1);
  assert.equal((await rows('select status,delivery_status from homeground_private.traveller_ack_outbox where job_id=$1',[job.job_id]))[0].delivery_status,'bounced');
  const staffStatus=await rpc('get_homeground_traveller_ack_staff_status_v1',{p_inquiry_id:job.inquiry_id});assert.equal(staffStatus.stopReason,'bounced');
  const bouncedResubmit=await post(home(job.contact_email));assert.equal(bouncedResubmit.http,201);assert.equal(bouncedResubmit.ackStatus,'suppressed');
  const secondJob=claims[1];
  assert.equal(await rpc('record_homeground_traveller_ack_event_v1',{...event,p_event_id:'early-complaint',p_job_id:secondJob.job_id,p_provider_message_id:'early-provider',p_event_type:'complained',p_reason:'complaint'}),true);
  assert.equal(await rpc('finish_homeground_traveller_ack_v1',{...finish,p_job_id:secondJob.job_id,p_lease_token:secondJob.lease_token,p_row_version:secondJob.row_version,p_provider_message_id:'early-provider'}),false);
  assert.equal((await rows('select status,delivery_status from homeground_private.traveller_ack_outbox where job_id=$1',[secondJob.job_id]))[0].delivery_status,'complained');
  await rpc('record_homeground_traveller_ack_event_v1',{...event,p_event_id:'late-delivered',p_job_id:secondJob.job_id,p_provider_message_id:'early-provider',p_event_type:'delivered',p_reason:null});
  assert.equal((await rows('select delivery_status from homeground_private.traveller_ack_outbox where job_id=$1',[secondJob.job_id]))[0].delivery_status,'complained');
  console.log('PASS frozen retry message, actual party extraction, active leases, early/late failure events and staff stop guidance');
  for(const role of ['anon','authenticated'])for(const name of ['prepare_homeground_traveller_ack_v1','get_homeground_traveller_ack_receipt_v1','claim_homeground_traveller_ack_v1','get_homeground_traveller_ack_health_v1','list_homeground_traveller_ack_issues_v1']){
    const privilege=await rows('select has_function_privilege($1,p.oid,\'execute\') as allowed from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname=\'public\' and p.proname=$2',[role,name]);assert.ok(privilege.length);assert.equal(privilege[0].allowed,false);
  }
  console.log('PASS anonymous and signed-in website users have no receipt RPC access');
  const internal=(await rows("select * from public.claim_homeground_notification_jobs_v3('local-internal',1,90)"))[0];
  assert.ok(internal);
  const frozenInternal={from:'internal@example.invalid',to:['staff@example.invalid'],subject:'Internal',text:'Internal test',html:'<p>Internal test</p>'};
  const internalArgs={p_job_id:internal.job_id,p_lease_token:internal.lease_token,p_row_version:internal.row_version,p_message:frozenInternal};
  assert.deepEqual(await rpc('freeze_homeground_notification_message_v1',internalArgs),frozenInternal);
  assert.deepEqual(await rpc('freeze_homeground_notification_message_v1',{...internalArgs,p_message:{...frozenInternal,text:'Changed stop guidance'}}),frozenInternal);
  assert.equal(await rpc('freeze_homeground_notification_message_v1',{...internalArgs,p_lease_token:randomUUID()}),null);
  const beforeCapacity=(await rows('select count(*)::integer as n from homeground_private.traveller_ack_intents'))[0].n;
  await db.query("insert into homeground_private.traveller_ack_intents(idempotency_key_hash,enabled,privacy_notice_version,recipient_hash) select encode(extensions.digest('local-cap-'||n,'sha256'),'hex'),false,'2026-09-28.1',null from generate_series(1,$1::integer) n",[5000-beforeCapacity]);
  assert.equal(await rpc('prepare_homeground_traveller_ack_v1',{p_idempotency_key_hash:hash('capacity-new'),p_enabled:true,p_recipient_hash:hash('capacity-email'),p_privacy_notice_version:'2026-09-28.1'}),false);
  assert.equal((await post(firstPayload,firstKey)).publicReference,first.publicReference);
  const capacitySaved=await post(home('capacity@example.invalid'));assert.equal(capacitySaved.http,201);assert.equal(capacitySaved.ackStatus,'unavailable');
  assert.equal((await rows('select * from public.get_homeground_traveller_ack_health_v1()'))[0].intent_capacity_reached,true);
  console.log('PASS internal envelope freeze and bounded intent storage alert; intake and replays still work at capacity');
  console.log((await rows('select version() as version'))[0].version);
} finally { globalThis.fetch=savedFetch;globalThis.Deno=savedDeno;await db.close(); }
