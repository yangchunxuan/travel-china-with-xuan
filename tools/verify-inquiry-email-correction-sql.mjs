// Local PostgreSQL WASM check. No network, provider calls or production data.
// HOMEGROUND_PGLITE_PACKAGE_PATH=<package root> node --experimental-strip-types tools/verify-inquiry-email-correction-sql.mjs
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
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
  // Replay every repository migration through this release in order. Only the
  // unavailable scheduling/network extension declarations are omitted; their
  // routines are installed but never invoked in this disposable database.
  const migrationNames=(await readdir(new URL('../supabase/migrations/',import.meta.url))).filter(name=>name.endsWith('.sql')&&name<='202609290002_inquiry_email_corrections.sql').sort();
  for(const name of migrationNames) {
    try {
      const source = await sqlFile(name);
      // PGlite does not run cron; only this prerequisite extension declaration is omitted.
      await db.exec(source.replaceAll('create extension if not exists pg_cron with schema pg_catalog;', '').replaceAll('create extension if not exists pg_net with schema extensions;', ''));
    }
    catch(error) { throw new Error(`${name}: ${error.message}`); }
  }
  console.log('PASS original prerequisite and new migrations execute in PostgreSQL');
  const env=new Map(Object.entries({
    ALLOWED_ORIGINS:'https://homegroundchina.com', ALLOWED_FORM_VERSIONS:'2026-07-21.1,2026-07-26.1,2026-09-10.1',
    ALLOWED_PRIVACY_NOTICE_VERSIONS:'2026-07-21.1,2026-07-26.1,2026-09-28.1',
    SUPABASE_URL:'https://test.supabase.co', SUPABASE_SECRET_KEYS:JSON.stringify({default:'local-only-test-key'}),
    IDEMPOTENCY_HASH_SECRET:'local-test-idempotency-key',RATE_LIMIT_HASH_SECRET:'local-test-rate-key',
    RATE_LIMIT_10_MINUTES:'100',RATE_LIMIT_24_HOURS:'1000',TRAVELLER_ACK_ENABLED:'true',WHATSAPP_ENABLED:'true',REPLY_SLA_HOURS:'48',INQUIRY_EMAIL_CORRECTION_ENABLED:'true',
  }));
  let intake, failPrepare=false, failReceipt=false;
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
    if(failReceipt&&name==='get_homeground_traveller_ack_receipt_v1')return new Response('{}',{status:503});
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


  const savedIntake=intake;
  const {handleEmailCorrection}=await import('../supabase/functions/v1-inquiry-email-corrections/index.ts');
  const correction=async(accessKey,email,expectedRevision=0,key=randomUUID())=>{
    const response=await handleEmailCorrection(new Request('https://test.supabase.co/functions/v1/v1-inquiry-email-corrections',{
      method:'POST',headers:{Origin:'https://homegroundchina.com','Content-Type':'application/json','Inquiry-Access-Key':accessKey,'Idempotency-Key':key},
      body:JSON.stringify({email,expectedRevision}),
    }));return {http:response.status,...await response.json()};
  };
  const initialKey=randomUUID(),initialPayload=home('typo@example.invalid');
  // Importing the correction handler changes the Deno.serve capture only. Keep
  // using the original intake handler for original-request replays.
  intake=savedIntake;
  const initial=await post(initialPayload,initialKey);
  assert.equal(initial.http,201,JSON.stringify(initial));
  const inquiry=(await rows('select * from homeground_private.inquiries where public_reference=$1',[initial.publicReference]))[0];
  const originalAck=(await rows('select * from homeground_private.traveller_ack_outbox where inquiry_id=$1',[inquiry.inquiry_id]))[0];
  const originalNotice=(await rows('select * from homeground_private.notification_outbox where inquiry_id=$1',[inquiry.inquiry_id]))[0];
  const frozen={from:'hello@homegroundchina.com',to:['typo@example.invalid'],subject:'Already sent',text:'immutable',html:'<p>immutable</p>'};
  await db.query("update homeground_private.traveller_ack_outbox set status='accepted',attempt_count=1,provider_message_id='original-provider',message_json=$2 where job_id=$1",[originalAck.job_id,frozen]);
  await db.query("update homeground_private.notification_outbox set status='accepted',provider_message_id='staff-original-provider',message_json=$2 where job_id=$1",[originalNotice.job_id,frozen]);
  const key=randomUUID(),changed=await correction(initialKey,'right@example.invalid',0,key);
  assert.equal(changed.http,200,JSON.stringify(changed));assert.equal(changed.publicReference,initial.publicReference);
  assert.equal(changed.contactEmail,'right@example.invalid');assert.equal(changed.contactRevision,1);assert.equal(changed.ackStatus,'queued');
  assert.equal(new Date(changed.firstResponseDueAt).getTime(),new Date(inquiry.first_response_due_at).getTime());
  const updated=(await rows('select * from homeground_private.inquiries where inquiry_id=$1',[inquiry.inquiry_id]))[0];
  assert.deepEqual({...updated,contact_email:inquiry.contact_email,contact_revision:0},inquiry,'all enquiry context, original hash and deadline are retained');
  const oldAck=(await rows('select * from homeground_private.traveller_ack_outbox where job_id=$1',[originalAck.job_id]))[0];
  assert.deepEqual(oldAck.message_json,frozen);assert.equal(oldAck.provider_message_id,'original-provider');assert.equal(oldAck.status,'accepted');
  const notices=await rows('select * from homeground_private.notification_outbox where inquiry_id=$1 order by contact_revision',[inquiry.inquiry_id]);
  assert.equal(notices.length,2);assert.deepEqual(notices[0].message_json,frozen);assert.equal(notices[1].contact_email_snapshot,'right@example.invalid');assert.equal(notices[1].previous_contact_email,'typo@example.invalid');
  const replay=await correction(initialKey,'right@example.invalid',0,key);assert.equal(replay.duplicate,true);assert.equal(replay.contactRevision,1);
  assert.equal((await rows('select count(*)::integer n from homeground_private.traveller_ack_outbox where inquiry_id=$1',[inquiry.inquiry_id]))[0].n,2);
  assert.equal((await correction(initialKey,'different@example.invalid',0,key)).error.code,'idempotency_conflict');
  const originalReplay=await post(initialPayload,initialKey);assert.equal(originalReplay.http,200);assert.equal(originalReplay.publicReference,initial.publicReference);assert.equal(originalReplay.contactEmail,'right@example.invalid');assert.equal(originalReplay.contactRevision,1);
  failReceipt=true;const uncertainReplay=await post(initialPayload,initialKey);failReceipt=false;
  assert.equal(uncertainReplay.http,503);assert.equal(uncertainReplay.error.persistenceState,'unknown');assert.equal(uncertainReplay.error.retryable,true);
  assert.equal((await post(initialPayload,initialKey)).contactEmail,'right@example.invalid');
  console.log('PASS atomic same-enquiry correction, immutable sent messages, original replay and correction idempotency');
  const staffClaims=await rows("select * from public.claim_homeground_notification_jobs_v3('old-worker',10,90)");
  assert.equal(staffClaims.length,0,'old workers cannot claim correction notices');
  const newStaff=await rows("select * from public.claim_homeground_notification_jobs_v4('new-worker',10,90)");
  assert.equal(newStaff.length,1);assert.equal(newStaff[0].contact_revision,1);assert.equal(newStaff[0].previous_contact_email,'typo@example.invalid');
  assert.equal((await correction(initialKey,'second@example.invalid',1)).error.code,'correction_busy');
  await db.query("update homeground_private.notification_outbox set status='accepted',lease_until=null,leased_by=null,lease_token=null where inquiry_id=$1",[inquiry.inquiry_id]);
  const claims=await rows("select * from public.claim_homeground_traveller_ack_v1('new-ack',10,90)");
  assert.equal(claims.length,1);assert.equal(claims[0].contact_email,'right@example.invalid');
  assert.equal((await correction(initialKey,'second@example.invalid',1)).error.code,'correction_busy');
  const active=claims[0];
  assert.equal(await rpc('finish_homeground_traveller_ack_v1',{p_job_id:active.job_id,p_lease_token:active.lease_token,p_row_version:active.row_version,p_accepted:true,p_terminal:false,p_provider_message_id:'corrected-provider',p_error_code:null,p_next_attempt_at:null}),true);
  await rpc('record_homeground_traveller_ack_event_v1',{p_event_id:'old-bounce',p_provider_message_id:'original-provider',p_job_id:originalAck.job_id,p_event_type:'bounced',p_reason:'bounce_general'});
  assert.equal((await rpc('get_homeground_traveller_ack_staff_status_v1',{p_inquiry_id:inquiry.inquiry_id})).stopReason,null,'old bounce does not block corrected contact');
  const issues=await rows('select * from public.list_homeground_traveller_ack_issues_v1()');assert.equal(issues[0].contact_email,'typo@example.invalid');
  console.log('PASS old/new workers, active-lease guard and old-address bounce isolation');
  assert.equal((await correction(initialKey,'second@example.invalid',0)).error.code,'correction_conflict');
  const second=await correction(initialKey,'second@example.invalid',1);assert.equal(second.contactRevision,2);
  const lateReplay=await correction(initialKey,'right@example.invalid',0,key);assert.equal(lateReplay.contactEmail,'second@example.invalid');assert.equal(lateReplay.contactRevision,2);
  const noOpKey=randomUUID();const noop=await correction(initialKey,'second@example.invalid',2,noOpKey);assert.equal(noop.changed,false);assert.equal(noop.contactRevision,2);
  assert.equal((await correction(initialKey,'other@example.invalid',2,noOpKey)).error.code,'idempotency_conflict');
  const third=await correction(initialKey,'third@example.invalid',2);assert.equal(third.contactRevision,3);
  assert.equal((await correction(initialKey,'fourth@example.invalid',3)).error.code,'correction_limit');
  assert.equal((await correction(randomUUID(),'thief@example.invalid',0)).error.code,'correction_unavailable');
  assert.equal((await correction(initial.publicReference,'thief@example.invalid',0)).http,403);
  console.log('PASS revision conflicts, current-state replays, no-op idempotency, correction cap and bearer authorization');
  const expiredKey=randomUUID();const expired=await post(home('expired@example.invalid'),expiredKey);
  await db.query("update homeground_private.inquiries set created_at=now()-interval '31 minutes' where public_reference=$1",[expired.publicReference]);
  assert.equal((await correction(expiredKey,'late@example.invalid')).error.code,'correction_unavailable');
  const legacyKey=randomUUID();const legacy=await post({...home('legacy@example.invalid'),privacyNoticeVersion:'2026-07-26.1'},legacyKey);
  assert.equal((await correction(legacyKey,'legacy-new@example.invalid')).ackStatus,'disabled');
  const restrictionKey=randomUUID();const restricted=await post(home('restrict-from@example.invalid'),restrictionKey);
  const blocked=await correction(restrictionKey,'typo@example.invalid');assert.equal(blocked.ackStatus,'suppressed');
  const oldNewJob=(await rows('select * from homeground_private.traveller_ack_outbox where inquiry_id=$1 and contact_revision=2',[inquiry.inquiry_id]))[0];
  assert.equal(oldNewJob.status,'suppressed');assert.equal(oldNewJob.suppression_reason,'contact_corrected');
  for(const role of ['anon','authenticated']) {
    const privileges=await rows("select has_function_privilege($1,'public.correct_homeground_inquiry_email_v1(text,text,text,text,integer,text,boolean)','execute') allowed",[role]);assert.equal(privileges[0].allowed,false);
  }
  console.log('PASS expiry, legacy disclosure, superseded pending work, persistent recipient restrictions and RPC privileges');
  // Use real non-empty quote context, including a stated party size, to verify
  // a correction never creates a simplified replacement enquiry.
  const partyKey=randomUUID();
  const partyProduct=getPrivateTourInquiryContext('shanghai-suzhou-5-day-private-tour','ja');
  const partyPayload={...home('party@example.invalid','ja'),schemaVersion:4,formVersion:'2026-09-10.1',entryPath:'private_tour_quote',productInterest:partyProduct,travelDate:'2026-12-03',note:'[Requested group size: 15 travellers]\n\nLocal private test context.',attribution:{landingPath:`/ja/tours/${partyProduct.slug}/`}};
  const party=await post(partyPayload,partyKey);assert.equal(party.http,201);
  const partyBefore=(await rows('select * from homeground_private.inquiries where public_reference=$1',[party.publicReference]))[0];
  const partyCorrected=await correction(partyKey,'party-right@example.invalid');assert.equal(partyCorrected.http,200);
  const partyAfter=(await rows('select * from homeground_private.inquiries where public_reference=$1',[party.publicReference]))[0];
  assert.deepEqual({...partyAfter,contact_email:partyBefore.contact_email,contact_revision:0},partyBefore);
  assert.match(partyAfter.note,/15 travellers/);assert.deepEqual(partyAfter.answers_json,partyBefore.answers_json);
  // An enqueue failure must roll back BOTH the contact mutation and the new
  // acknowledgement job. The public handler preserves write uncertainty.
  const rollbackKey=randomUUID();const rollback=await post(home('rollback@example.invalid'),rollbackKey);
  await db.exec("create function homeground_private.reject_test_correction_notice() returns trigger language plpgsql as $$ begin if new.contact_revision>0 then raise exception 'local-only simulated queue failure'; end if; return new; end; $$; create trigger reject_test_correction_notice before insert on homeground_private.notification_outbox for each row execute function homeground_private.reject_test_correction_notice();");
  const rollbackAttemptKey=randomUUID();const rolledBack=await correction(rollbackKey,'rollback-right@example.invalid',0,rollbackAttemptKey);
  assert.equal(rolledBack.http,503);assert.equal(rolledBack.error.persistenceState,'unknown');
  const rollbackSaved=(await rows('select contact_email,contact_revision,inquiry_id from homeground_private.inquiries where public_reference=$1',[rollback.publicReference]))[0];
  assert.equal(rollbackSaved.contact_email,'rollback@example.invalid');assert.equal(rollbackSaved.contact_revision,0);
  assert.equal((await rows('select count(*)::integer n from homeground_private.traveller_ack_outbox where inquiry_id=$1',[rollbackSaved.inquiry_id]))[0].n,1);
  await db.exec('drop trigger reject_test_correction_notice on homeground_private.notification_outbox; drop function homeground_private.reject_test_correction_notice();');
  assert.equal((await correction(rollbackKey,'rollback-right@example.invalid',0,rollbackAttemptKey)).http,200);
  console.log('PASS real Japanese quote context and 15-person note preservation; queue failure rolls back atomically and safely retries');
  // Both rolling-deployment and new workers preserve the already deployed
  // immutable retry deadline. Correction notices add a tighter 23h envelope.
  const oldDeadlineKey=randomUUID();const oldDeadline=await post(home('deadline-old@example.invalid'),oldDeadlineKey);
  await db.query("update homeground_private.notification_outbox set created_at=now()-interval '73 hours' where inquiry_id=(select inquiry_id from homeground_private.inquiries where public_reference=$1)",[oldDeadline.publicReference]);
  const oldDeadlineClaims=await rows("select * from public.claim_homeground_notification_jobs_v3('deadline-old-worker',50,90)");
  assert.ok(oldDeadlineClaims.every(job=>job.public_reference!==oldDeadline.publicReference));
  assert.equal((await rows('select o.status,o.last_error_code from homeground_private.notification_outbox o join homeground_private.inquiries i using(inquiry_id) where i.public_reference=$1',[oldDeadline.publicReference]))[0].last_error_code,'retry_deadline_exceeded');
  const newDeadlineKey=randomUUID();const newDeadline=await post(home('deadline-new@example.invalid'),newDeadlineKey);
  const noticeAgeKey=randomUUID();const noticeAge=await post(home('notice-age@example.invalid'),noticeAgeKey);
  assert.equal((await correction(noticeAgeKey,'notice-new@example.invalid')).http,200);
  await db.query("update homeground_private.notification_outbox set created_at=now()-interval '73 hours' where inquiry_id=(select inquiry_id from homeground_private.inquiries where public_reference=$1)",[newDeadline.publicReference]);
  await db.query("update homeground_private.notification_outbox set created_at=now()-interval '24 hours' where contact_revision=1 and inquiry_id=(select inquiry_id from homeground_private.inquiries where public_reference=$1)",[noticeAge.publicReference]);
  const deadlineClaims=await rows("select * from public.claim_homeground_notification_jobs_v4('deadline-new-worker',50,90)");
  assert.ok(deadlineClaims.every(job=>job.public_reference!==newDeadline.publicReference));
  assert.ok(deadlineClaims.every(job=>job.public_reference!==noticeAge.publicReference||job.contact_revision===0));
  assert.equal((await rows('select o.last_error_code from homeground_private.notification_outbox o join homeground_private.inquiries i using(inquiry_id) where i.public_reference=$1',[newDeadline.publicReference]))[0].last_error_code,'retry_deadline_exceeded');
  assert.equal((await rows('select o.last_error_code from homeground_private.notification_outbox o join homeground_private.inquiries i using(inquiry_id) where i.public_reference=$1 and o.contact_revision=1',[noticeAge.publicReference]))[0].last_error_code,'correction_notice_expired');
  console.log(`PASS all ${migrationNames.length} migrations including retention; v3/v4 original 72h deadline and correction 23h deadline`);
  // A frozen-but-unconfirmed original notice must never be retried with an old
  // contact action. Preserve its bytes/evidence and terminalize as superseded,
  // without producing a false failure alarm or fabricating provider acceptance.
  const staleKey=randomUUID();const stale=await post(home('stale-link@example.invalid'),staleKey);
  const staleId=(await rows('select inquiry_id from homeground_private.inquiries where public_reference=$1',[stale.publicReference]))[0].inquiry_id;
  const staleEnvelope={from:'internal@example.invalid',to:['staff@example.invalid'],subject:'Original notice',text:'mailto:stale-link@example.invalid',html:'<a href="mailto:stale-link@example.invalid">Old</a>'};
  await db.query("update homeground_private.notification_outbox set message_json=$2,attempt_count=1,status='pending',provider_message_id=null where inquiry_id=$1",[staleId,staleEnvelope]);
  const failedBefore=(await rows('select failed_count from public.get_homeground_outbox_health()'))[0].failed_count;
  const staleCorrection=await correction(staleKey,'fresh-link@example.invalid');assert.equal(staleCorrection.http,200);
  const staleNotice=(await rows('select * from homeground_private.notification_outbox where inquiry_id=$1 and contact_revision=0',[staleId]))[0];
  assert.equal(staleNotice.status,'superseded');assert.equal(staleNotice.provider_message_id,null);assert.deepEqual(staleNotice.message_json,staleEnvelope);
  assert.equal((await rows('select failed_count from public.get_homeground_outbox_health()'))[0].failed_count,failedBefore);
  const correctedClaims=await rows("select * from public.claim_homeground_notification_jobs_v4('frozen-regression',50,90)");
  const thisEnquiryClaims=correctedClaims.filter(job=>job.inquiry_id===staleId);assert.equal(thisEnquiryClaims.length,1);assert.equal(thisEnquiryClaims[0].contact_revision,1);assert.equal(thisEnquiryClaims[0].contact_email,'fresh-link@example.invalid');
  assert.equal(await rpc('freeze_homeground_notification_message_v1',{p_job_id:staleNotice.job_id,p_lease_token:randomUUID(),p_row_version:staleNotice.row_version,p_message:{text:'rewrite attempt'}}),null);
  console.log('PASS frozen old staff notice is superseded intact, cannot be claimed/frozen, and adds no false failed-queue alarm');

} finally { globalThis.fetch=savedFetch;globalThis.Deno=savedDeno;await db.close(); }
