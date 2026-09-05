// Usage: HOMEGROUND_PGLITE_PACKAGE_PATH=<package-root> node --experimental-strip-types
//   tools/verify-customer-journey-sql.mjs [output-directory]
// The package root contains dist/index.js and dist/contrib/pgcrypto.js. Omit the
// environment variable when @electric-sql/pglite is installed and resolvable.
// Output defaults to a new OS temporary directory. This executes the target
// migration unchanged against PostgreSQL WASM, with minimal inquiry/admin tables
// and metadata-only cron stubs; it does not validate production or a scheduler.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { sanitizeAdminTrafficRpc } from '../supabase/functions/_shared/admin-traffic-contracts.ts';

const root=resolve(fileURLToPath(new URL('../', import.meta.url)));
const output=process.argv[2] ? resolve(process.argv[2])
  : await mkdtemp(join(tmpdir(), 'homeground-customer-journey-sql-'));
await mkdir(output, { recursive: true });
const packageRoot=process.env.HOMEGROUND_PGLITE_PACKAGE_PATH;
const packageImport=(file, installedSpecifier)=>packageRoot
  ? pathToFileURL(join(resolve(packageRoot), file)).href : installedSpecifier;
const [{ PGlite }, { pgcrypto }]=await Promise.all([
  import(packageImport('dist/index.js', '@electric-sql/pglite')),
  import(packageImport('dist/contrib/pgcrypto.js', '@electric-sql/pglite/contrib/pgcrypto')),
]);
console.log(`SQL verification output: ${output}`);
const db=await PGlite.create({extensions:{pgcrypto}});
const hash=(s)=>createHash('sha256').update(s).digest('hex');
const records=[];
const record=(name,detail={})=>{records.push({name,...detail});console.log(`PASS ${name}`);};
const migrationPath=`${root}/supabase/migrations/202609050002_homeground_customer_journey.sql`;
const migration=await readFile(migrationPath,'utf8');
const source=async(name)=>readFile(`${root}/supabase/migrations/${name}`,'utf8');
const slug='beijing-highlights-5-day-private-tour';
let version;
async function asRole(role,fn){await db.exec(`set role ${role}`);try{return await fn();}finally{await db.exec('reset role');}}
async function queryResult(sql,args=[]){return(await db.query(sql,args)).rows[0].result;}
async function count(table){return Number((await db.query(`select count(*) as count from homeground_private.${table}`)).rows[0].count);}
function event(type='page_view',sequence=1,extra={}){
 const value={eventId:randomUUID(),type,pagePath:'/tours/',actionCode:null,clientSequence:sequence,
 productSlug:slug,packageId:null,travelers:null,surface:'product',errorCode:null,...extra};
 if(type==='product_selection_changed'){value.packageId='no-guide';value.travelers=4;}
 if(type==='contact_channel_clicked'||type==='contact_channel_selected')value.actionCode='email';
 if(type==='enquiry_submit_failed')value.errorCode='validation';
 if(type==='enquiry_submit_uncertain')value.errorCode='network';
 return {...value,payloadHash:hash(JSON.stringify(value))};
}
const argTypes=[...Array(9).fill('text'),'jsonb',...Array(3).fill('text'),...Array(6).fill('integer')];
async function writeEvents(session,events,ver=2,overrides={}){
 const args=[`homeground-traffic-events.v${ver}`,ver===2?'2026-09-05.1':'2026-07-31.1',hash(session),'en','/tours/',
 'facebook','social','autumn',null,JSON.stringify(events),hash('ip'),hash(`rate:${session}`),hash('global'),2000,20000,2000,20000,20000,100000];
 for(const [index,value]of Object.entries(overrides))args[Number(index)]=value;
 return asRole('service_role',()=>queryResult(`select public.record_homeground_traffic_events_v${ver}(${argTypes.map((t,i)=>`$${i+1}::${t}`).join(',')}) as result`,args));
}
async function summary(){return asRole('service_role',async()=> (await db.query('select * from public.get_homeground_admin_traffic_v2()')).rows[0].payload);}
async function mark(eventId){return asRole('service_role',()=>queryResult('select public.mark_homeground_traffic_test_session_v1($1::uuid) as result',[eventId]));}
async function newInquiry(){const id=randomUUID();await db.query('insert into homeground_private.inquiries(inquiry_id) values($1::uuid)',[id]);return id;}
async function attach(id,session){return asRole('service_role',()=>queryResult('select public.attach_homeground_inquiry_traffic_attribution_v1($1::uuid,$2::text) as result',[id,hash(session)]));}
try{
 version=(await db.query('select version() as version')).rows[0].version;
 console.log(version);
 // Prerequisite stubs only: inquiry storage is minimal; cron functions store job
 // metadata but do not execute schedules. All traffic/outbox logic is original SQL.
 await db.exec(`create role anon; create role authenticated; create role service_role;
 create schema homeground_private; create schema extensions; create extension pgcrypto with schema extensions;
 create table homeground_private.inquiries(inquiry_id uuid primary key);
 create table homeground_private.admin_access_log(admin_user_id uuid, endpoint text, result text);
 create schema cron;
 create table cron.job(jobid bigint generated always as identity primary key,jobname text unique,schedule text,command text,active boolean default true);
 create function cron.schedule(p_name text,p_schedule text,p_command text) returns bigint language plpgsql as $$ declare v_id bigint; begin
 insert into cron.job(jobname,schedule,command) values(p_name,p_schedule,p_command) returning jobid into v_id; return v_id; end $$;
 create function cron.unschedule(p_name text) returns boolean language plpgsql as $$ begin delete from cron.job where jobname=p_name; return true; end $$;
 `);
 await db.exec(await source('202607260001_homeground_test_markers.sql'));
 // PGlite lacks pg_cron. Only its unsupported extension declaration is omitted
 // from this prerequisite migration; actual table/RPC/retention definitions stay exact.
 await db.exec((await source('202607310001_homeground_traffic_attribution.sql')).replace('create extension if not exists pg_cron with schema pg_catalog;',''));
 await db.exec(await source('202607310002_homeground_admin_traffic_read_model.sql'));
 await db.exec(await source('202607310003_homeground_atomic_inquiry_attribution.sql'));
 await db.exec(await source('202608230001_homeground_traffic_operations_hardening.sql'));
 record('original traffic schema, write/read functions, outbox and hardening applied with cron metadata stub');
 const v1Definition=(await db.query("select pg_get_functiondef('public.record_homeground_traffic_events_v1(text,text,text,text,text,text,text,text,text,jsonb,text,text,text,integer,integer,integer,integer,integer,integer)'::regprocedure) as source")).rows[0].source;
 const oldRead=(await db.query("select pg_get_functiondef('public.get_homeground_admin_traffic()'::regprocedure) as source")).rows[0].source;
 await db.exec(migration);
 record('target migration executed unmodified',{sha256:hash(migration)});
 assert.equal((await db.query("select pg_get_functiondef('public.record_homeground_traffic_events_v1(text,text,text,text,text,text,text,text,text,jsonb,text,text,text,integer,integer,integer,integer,integer,integer)'::regprocedure) as source")).rows[0].source,v1Definition);
 assert.equal((await db.query("select pg_get_functiondef('public.get_homeground_admin_traffic()'::regprocedure) as source")).rows[0].source,oldRead);
 record('legacy v1 write/read function definitions unchanged');
 for(const name of ['record_homeground_traffic_events_v2('+argTypes.join(',')+')','get_homeground_admin_traffic_v2()','mark_homeground_traffic_test_session_v1(uuid)']){
  for(const role of ['anon','authenticated','service_role']){
   const allowed=(await db.query('select has_function_privilege($1,$2,$3) as allowed',[role,`public.${name}`,'EXECUTE'])).rows[0].allowed;
   assert.equal(allowed,role==='service_role');
  }
 }
 record('new RPC execute privileges service_role only');
 for(const role of ['anon','authenticated','service_role']){
  await assert.rejects(()=>asRole(role,()=>db.query('select * from homeground_private.traffic_test_markers')),{code:'42501'});
 }
 for(const role of ['anon','authenticated']){
  await assert.rejects(()=>asRole(role,()=>db.query('select public.mark_homeground_traffic_test_session_v1($1::uuid)',[randomUUID()])),{code:'42501'});
 }
 const markerRls=(await db.query("select relrowsecurity,relforcerowsecurity from pg_class where oid='homeground_private.traffic_test_markers'::regclass")).rows[0];
 assert.deepEqual(markerRls,{relrowsecurity:true,relforcerowsecurity:true});
 record('real unauthorized marker reads/writes rejected and forced RLS retained');
 const legacy={eventId:randomUUID(),type:'page_view',pagePath:'/tours/',actionCode:null};
 const oldEvent={...legacy,payloadHash:hash(JSON.stringify(legacy))};
 assert.equal((await writeEvents('legacy',[oldEvent],1)).outcome,'created');
 const legacyStored=(await db.query('select client_sequence,product_slug,package_id,travelers,surface,error_code from homeground_private.traffic_events where event_id=$1::uuid',[legacy.eventId])).rows[0];
 assert.ok(Object.values(legacyStored).every(v=>v===null));
 assert.equal((await writeEvents('legacy',[oldEvent],1)).outcome,'replay');
 assert.deepEqual(await mark(legacy.eventId),{outcome:'marked'});
 record('v1 persists/replays unchanged with new fields null');
 const groups=[];
 for(let i=0;i<6;i++){
  const events=[event('page_view',20),event('product_selection_changed',5),event('enquiry_submit_attempted',6),event('enquiry_submit_failed',7),event('enquiry_submit_uncertain',8)];
  assert.deepEqual(await writeEvents(`session${i}`,events),{outcome:'created',acceptedCount:5,replayedCount:0});
  groups.push(events);
 }
 record('v2 stores controlled selections and accepts reordered client sequence');
 const beforeRate=await db.query('select sum(request_count)::integer as total from homeground_private.traffic_rate_limit_buckets');
 const replay=await writeEvents('session0',groups[0]);
 assert.deepEqual(replay,{outcome:'replay',acceptedCount:0,replayedCount:5});
 assert.deepEqual(await db.query('select sum(request_count)::integer as total from homeground_private.traffic_rate_limit_buckets'),beforeRate);
 assert.equal((await writeEvents('session0',[{...groups[0][0],payloadHash:hash('changed')}])).outcome,'idempotency_conflict');
 record('v2 replay consumes no event quota and changed payload conflicts');
 const originalCount=await count('traffic_events');
 const invalid=[
  {...event(),email:'person@example.com'}, {...event(),clientSequence:0}, {...event(),clientSequence:1000001},
  {...event(),clientSequence:'2'}, {...event(),clientSequence:2.5}, {...event(),pagePath:'/?query=private'},
  {...event(),productSlug:'unpublished'}, {...event(),packageId:'wrong',travelers:4},
  {...event(),packageId:'no-guide',travelers:'4'}, {...event(),packageId:null,travelers:4},
  {...event('product_selection_changed'),packageId:null,travelers:null}, {...event(),surface:'free text'},
  {...event('enquiry_submit_failed'),errorCode:'raw error'}, {...event(),errorCode:'network'},
  {...event(),type:'enquiry_submitted'}, {...event('contact_channel_selected'),actionCode:null},
  {...event('enquiry_submit_attempted'),surface:null},
 ];
 for(const bad of invalid){await assert.rejects(()=>writeEvents('invalid',[event(),bad]),{code:'22023'});assert.equal(await count('traffic_events'),originalCount);}
 await assert.rejects(()=>writeEvents('invalid',[event()],2,{1:'2026-07-31.1'}),{code:'22023'});
 record('malformed v2 batches rejected atomically',{cases:invalid.length+1});
 let data=await summary();
 assert.equal(data.contractVersion,'homeground-admin-traffic.v2');
 assert.deepEqual(data.totals.sessions,{count:6,suppressed:false});
 for(const key of ['productViews','productSelections','formSubmitAttempts','formSubmitFailures','formSubmitUncertain'])assert.deepEqual(data.totals[key],{count:6,suppressed:false});
 assert.deepEqual(data.dimensions.products,[{bucketType:'value',label:slug,count:6,suppressed:false}]);
 assert.deepEqual(data.dimensions.productSelections,[{bucketType:'value',label:`${slug}|no-guide|4`,count:6,suppressed:false}]);
 assert.equal(data.recentSessions.length,6);assert.equal(data.limits.perSessionEventsIncluded,false);
 assert.ok(data.recentSessions.every(s=>!('events'in s)&&!('sessionHash'in s)&&new Date(s.startedAt).getUTCHours()===0));
 const inquiries=[];
 for(let i=0;i<6;i++){const id=await newInquiry();inquiries.push(id);assert.equal((await attach(id,`session${i}`)).outcome,'attributed');}
 data=await summary();assert.deepEqual(data.totals.attributedEnquiries,{count:6,suppressed:false});assert.equal(data.recentSessions.length,0);
 record('only saved inquiries count; linked sessions excluded from anonymous summaries');
 await db.query("insert into homeground_private.inquiry_test_markers(inquiry_id,reason_code,marker_batch) values($1::uuid,'verified_test_submission','journey-qa')",[inquiries[0]]);
 data=await summary();assert.deepEqual(data.totals.attributedEnquiries,{count:5,suppressed:false});
 const markedEvent=groups[1][0].eventId;
 const eventRows=await count('traffic_events');assert.deepEqual(await mark(markedEvent),{outcome:'marked'});assert.deepEqual(await mark(markedEvent),{outcome:'marked'});
 assert.equal(await count('traffic_events'),eventRows);
 data=await summary();assert.deepEqual(data.totals.attributedEnquiries,{count:null,suppressed:true});
 assert.deepEqual(data.totals.sessions,{count:5,suppressed:false});
 for(const key of ['pageViews','productViews','productSelections','formSubmitAttempts','formSubmitFailures','formSubmitUncertain'])assert.deepEqual(data.totals[key],{count:5,suppressed:false});
 assert.equal(data.dimensions.products[0].count,5);assert.equal(data.dimensions.productSelections[0].count,5);
 assert.deepEqual(await mark(randomUUID()),{outcome:'unknown'});
 record('verified test inquiries and synthetic sessions excluded without deleting evidence');
 await mark(groups[2][0].eventId);data=await summary();
 assert.deepEqual(data.totals.sessions,{count:null,suppressed:true});
 assert.deepEqual(data.dimensions.products,[{bucketType:'suppressed',label:null,count:null,suppressed:true}]);
 assert.deepEqual(data.dimensions.productSelections,[{bucketType:'suppressed',label:null,count:null,suppressed:true}]);
 record('product/selection counts below five suppressed with labels removed');
 const lateId=await newInquiry();assert.equal((await attach(lateId,'late')).outcome,'pending');
 const lateEvent=event();assert.equal((await writeEvents('late',[lateEvent])).outcome,'created');
 await db.exec('update homeground_private.inquiry_traffic_attribution_outbox set next_attempt_at=clock_timestamp() where status=\'pending\'');
 const resolved=await queryResult('select homeground_private.process_pending_inquiry_traffic_attribution_v1(100) as result');assert.equal(resolved.attributed,1);
 assert.equal((await attach(lateId,'different-session')).outcome,'conflict');
 assert.equal((await db.query('select session_hash from homeground_private.inquiry_traffic_attribution where inquiry_id=$1::uuid',[lateId])).rows[0].session_hash,hash('late'));
 record('original outbox resolves late first event and blocks inquiry rebinding');
 const expiredHash=hash('session1');
 await db.query("update homeground_private.traffic_sessions set first_seen_at=clock_timestamp()-interval '31 days' where session_hash=$1",[expiredHash]);
 await db.query("update homeground_private.inquiry_traffic_attribution set linked_at=clock_timestamp()-interval '31 days' where session_hash=$1",[expiredHash]);
 const purge=await queryResult('select homeground_private.purge_expired_homeground_traffic_v1() as result');assert.equal(purge.sessionsDeleted,1);
 for(const table of ['traffic_sessions','traffic_events','traffic_test_markers']){
  assert.equal(Number((await db.query(`select count(*) as count from homeground_private.${table} where session_hash=$1`,[expiredHash])).rows[0].count),0);
 }
 const kept=(await db.query('select session_hash,utm_source from homeground_private.inquiry_traffic_attribution where inquiry_id=$1::uuid',[inquiries[1]])).rows[0];assert.deepEqual(kept,{session_hash:null,utm_source:'facebook'});
 record('real 30-day cleanup cascades events/markers and preserves detached inquiry snapshot');
 const pendingId=await newInquiry();assert.equal((await attach(pendingId,'never-arrives')).outcome,'pending');
 await db.query("update homeground_private.inquiry_traffic_attribution_outbox set created_at=clock_timestamp()-interval '31 days' where inquiry_id=$1::uuid",[pendingId]);
 await db.query("update homeground_private.inquiry_traffic_attribution_outbox set resolved_at=clock_timestamp()-interval '31 days' where inquiry_id=$1::uuid",[lateId]);
 const outboxPurge=await queryResult('select homeground_private.purge_expired_inquiry_traffic_outbox_v1() as result');assert.equal(outboxPurge.jobsExpired,1);assert.equal(outboxPurge.sessionAssociationsCleared,1);
 const jobs=(await db.query('select status,requested_session_hash from homeground_private.inquiry_traffic_attribution_outbox where inquiry_id=any($1::uuid[])',[ [pendingId,lateId] ])).rows;assert.ok(jobs.every(j=>j.requested_session_hash===null));
 await db.exec("update homeground_private.traffic_rate_limit_buckets set updated_at=clock_timestamp()-interval '25 hours'");
 await db.exec('select homeground_private.purge_expired_traffic_rate_limit_buckets_v1()');assert.equal(await count('traffic_rate_limit_buckets'),0);
 record('real outbox expiry and 24-hour rate-bucket cleanup execute');
 // More than thirty high-volume labels must not disable the whole admin API.
 for(let i=0;i<31;i++) for(let j=0;j<(i===30?6:5);j++){
  const code=String(i).padStart(2,'0');
  const item=event('page_view',1,{pagePath:`/volume-${code}/`,productSlug:null});
  await writeEvents(`volume-${i}-${j}`,[item],2,{4:item.pagePath,5:`source-${code}`,7:`campaign-${code}`});
 }
 await writeEvents('volume-unknown',[event('page_view',1,{pagePath:'/unknown-page/',productSlug:null})],2,{5:null,6:null,7:null});
 await writeEvents('volume-small',[event('page_view',1,{pagePath:'/small-page/',productSlug:null})],2,{5:'tiny-source',7:'tiny-campaign'});
 const large=await summary();
 assert.ok(sanitizeAdminTrafficRpc([{payload:large}]),'real SQL v2 result rejected by sanitizer');
 for(const dimension of ['sources','campaigns','pages']){
  const buckets=large.dimensions[dimension]; assert.equal(buckets.length,30);
  assert.equal(buckets.filter(b=>b.bucketType==='suppressed').length,1);
  const values=buckets.filter(b=>b.bucketType==='value');
  assert.equal(values.length,dimension==='pages'?29:28);
  assert.ok(values.every(b=>b.count>=5));
  const leading=dimension==='sources'?'source-30':dimension==='campaigns'?'campaign-30':'/volume-30/';
  assert.equal(values[0].label,leading);assert.equal(values[0].count,6);
  if(dimension!=='pages')assert.equal(buckets.filter(b=>b.bucketType==='unknown').length,1);
  assert.ok(!values.some(b=>b.label===(dimension==='sources'?'source-29':dimension==='campaigns'?'campaign-29':'/volume-29/')));
 }
 // Resolve equal-count selection deterministically; response timestamps alone change.
 assert.deepEqual((await summary()).dimensions,large.dimensions);
 const withoutSmall=structuredClone(large);withoutSmall.dimensions.sources=Array.from({length:31},(_,i)=>({bucketType:'value',label:`source-${i}`,count:5,suppressed:false}));
 assert.equal(sanitizeAdminTrafficRpc([{payload:withoutSmall}]),null);
 assert.ok(large.totals.sessions.count>large.dimensions.sources.filter(b=>b.count!==null).reduce((n,b)=>n+b.count,0));
 record('over-thirty source/campaign/page groups bounded with Unknown and genuine small bucket preserved; actual SQL response passes sanitizer');
 const jobNames=(await db.query('select jobname from cron.job order by jobname')).rows.map(r=>r.jobname);assert.equal(jobNames.length,4);
 record('four existing cron job definitions preserved (scheduler execution not emulated)',{jobNames});
 const report={status:'PASS',postgresVersion:version,migrationPath,migrationSha256:hash(migration),checksPassed:records.length,productionDatabase:false,
 limitations:'PostgreSQL WASM with real pgcrypto and original traffic/session/write/read/retention/outbox SQL. Target migration executed unmodified. Prerequisites: minimal inquiries(id only)/admin_access_log tables, cron metadata-only schedule/unschedule stubs; omitted only pg_cron CREATE EXTENSION in prerequisite migration. Actual cleanup functions executed manually. No real scheduler, full inquiry intake, network deployment, or production/account validation.',records};
 await writeFile(`${output}/result.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,records:undefined},null,2));
}catch(error){await writeFile(`${output}/failure.json`,JSON.stringify({status:'FAIL',message:error.message,code:error.code,records},null,2)+'\n');throw error;}finally{await db.close();}
