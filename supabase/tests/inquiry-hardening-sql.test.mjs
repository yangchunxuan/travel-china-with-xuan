import assert from 'node:assert/strict';
import {createHash, randomUUID} from 'node:crypto';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {createIsolatedInquiryDatabase} from '../../tools/run-inquiry-recovery-drill.mjs';
import {destinationTimingRuleVersion} from '../../lib/inquiryContract.ts';
import {getPrivateTourInquiryContext} from '../../lib/privateTourInquiryContext.ts';
import {currentPrivateTourQuoteFormVersion,privateTourQuoteSchemaVersion} from '../../lib/inquiryVersions.ts';

const digest = value => createHash('sha256').update(value).digest('hex');

test('atomic receipt admission and bounded provider retries in an isolated real database', {timeout: 120_000}, async t => {
  let db;
  try { db=createIsolatedInquiryDatabase(); }
  catch(error) {
    if(error.code==='ENOENT' && process.env.CI!=='true' && !['1','true'].includes(process.env.REQUIRE_ISOLATED_POSTGRES)) {
      t.skip('PostgreSQL required for isolated backend hardening regression'); return;
    }
    throw error;
  }
  t.after(()=>db.close());
  const count=table=>Number(db.sql(`select count(*) from homeground_private.${table};`));
  const args=(overrides={})=>({
    p_schema_version:3,p_form_version:'2026-07-26.1',p_locale:'en',p_contact_email:`guest-${randomUUID()}@example.invalid`,
    p_privacy_notice_version:'2026-09-28.1',p_landing_path:'/',p_attribution:{},
    p_idempotency_key_hash:digest(randomUUID()),p_payload_hash:digest(randomUUID()),
    p_rate_limit_subject_hash:digest('same-client'),p_short_rate_limit:2,p_daily_rate_limit:2,
    p_first_response_due_at:new Date(Date.now()+48*3_600_000).toISOString(),...overrides,
  });
  const atomic=(body,enabled=true)=>db.rpc('create_homeground_inquiry_with_receipt_v1',{
    p_rpc_name:'create_homeground_homepage_email_v1',p_arguments:body,p_ack_enabled:enabled,
    p_ack_recipient_hash:enabled?digest(body.p_contact_email):null,
  });
  const reset=()=>db.sql('truncate homeground_private.inquiries,homeground_private.inquiry_rate_limit_buckets,homeground_private.traveller_ack_intents cascade;');
  const ack=id=>JSON.parse(db.sql(`select jsonb_build_object('status',status,'reason',suppression_reason) from homeground_private.traveller_ack_outbox where inquiry_id='${id}';`));
  const create=()=>atomic(args({p_rate_limit_subject_hash:digest(randomUUID())}));

  await t.test('rejected requests do not allocate intent or receipt rows; legacy global capacity cannot starve new guests',()=>{
    reset();
    const first=args();const saved=atomic(first);
    assert.equal(saved.outcome,'created');assert.equal(ack(saved.inquiryId).status,'pending');
    assert.equal(atomic(first).outcome,'replay');assert.equal(count('traveller_ack_outbox'),1);
    assert.equal(atomic({...first,p_payload_hash:digest('changed')}).outcome,'idempotency_conflict');
    assert.equal(atomic(args()).outcome,'created');
    for(let i=0;i<30;i++)assert.equal(atomic(args()).outcome,'rate_limited');
    assert.equal(count('inquiries'),2);assert.equal(count('traveller_ack_outbox'),2);assert.equal(count('traveller_ack_intents'),0);
    db.sql(`insert into homeground_private.traveller_ack_intents(idempotency_key_hash,payload_hash,enabled,privacy_notice_version)
      select lpad(to_hex(n),64,'0'),repeat('a',64),false,'2026-09-28.1' from generate_series(1,5000) n;`);
    for(let i=0;i<10;i++)assert.equal(db.rpc('prepare_homeground_traveller_ack_v1',{
      p_idempotency_key_hash:digest(randomUUID()),p_payload_hash:digest(randomUUID()),p_enabled:true,
      p_recipient_hash:digest('legacy@example.invalid'),p_privacy_notice_version:'2026-09-28.1',
    }),false);
    assert.equal(count('traveller_ack_intents'),5000,'retired preparation cannot allocate new rows');
    const legitimate=create();assert.equal(legitimate.outcome,'created');assert.equal(ack(legitimate.inquiryId).status,'pending');
    assert.equal(db.rpc('get_homeground_traveller_ack_health_v1',{})[0].intent_capacity_reached,false);
    assert.throws(()=>db.sql(`set role anon; select public.create_homeground_inquiry_with_receipt_v1('create_homeground_homepage_email_v1','{}',false,null);`));
  });

  await t.test('atomic state survives deferred triggers and preserves fail-closed disclosure plus legacy intake',()=>{
    reset();
    const disabled=atomic(args(),false);assert.equal(ack(disabled.inquiryId).status,'disabled');
    const legacy=db.rpc('create_homeground_homepage_email_v1',args());assert.equal(legacy.outcome,'created');
    assert.deepEqual(ack(legacy.inquiryId),{status:'disabled',reason:'intent_unavailable'});
    assert.equal(count('traveller_ack_intents'),0);
    const before=count('inquiries');
    assert.throws(()=>db.rpc('create_homeground_inquiry_with_receipt_v1',{
      p_rpc_name:'get_homeground_admin_insights',p_arguments:args(),p_ack_enabled:true,p_ack_recipient_hash:digest('bad'),
    }));assert.equal(count('inquiries'),before);
    db.sql("create function homeground_private.fail_atomic_receipt_drill() returns trigger language plpgsql as $$ begin raise exception 'isolated atomic failure'; end; $$; create trigger fail_atomic_receipt before insert on homeground_private.notification_outbox for each row execute function homeground_private.fail_atomic_receipt_drill();");
    assert.throws(()=>create());assert.equal(count('inquiries'),before);assert.equal(count('traveller_ack_outbox'),before);
    db.sql('drop trigger fail_atomic_receipt on homeground_private.notification_outbox; drop function homeground_private.fail_atomic_receipt_drill();');
    // Two inquiries within the same transaction must each retain their own intent
    // until deferred enrollment, rather than whichever intent was written last.
    const bodies=[args({p_rate_limit_subject_hash:digest(randomUUID())}),args({p_rate_limit_subject_hash:digest(randomUUID())})];
    db.sql('begin;'+bodies.map(body=>`select public.create_homeground_inquiry_with_receipt_v1('create_homeground_homepage_email_v1',${db.quote(body)}::jsonb,true,${db.quote(digest(body.p_contact_email))});`).join('')+'commit;');
    assert.equal(db.sql("select count(*) from homeground_private.traveller_ack_outbox where status='pending';"),'2');
  });

  const claim=()=>db.rpc('claim_homeground_notification_jobs_v4',{p_worker_id:'isolated-hardening',p_job_limit:1,p_lease_seconds:90});
  const freeze=(job,subject='original')=>db.rpc('freeze_homeground_notification_message_v1',{
    p_job_id:job.job_id,p_lease_token:job.lease_token,p_row_version:job.row_version,p_message:{subject},
  });
  await t.test('expired uncertain original email cannot be resent or manually requeued',()=>{
    reset();create();const job=claim()[0];assert.deepEqual(freeze(job),{subject:'original'});
    db.sql(`update homeground_private.notification_outbox set first_provider_attempt_at=now()-interval '25 hours' where job_id='${job.job_id}';`);
    assert.equal(freeze(job),null,'freeze guard also blocks an older deployed worker');
    db.sql(`update homeground_private.notification_outbox set lease_until=now()-interval '1 second' where job_id='${job.job_id}';`);
    assert.deepEqual(claim(),[]);
    assert.equal(db.sql(`select last_error_code from homeground_private.notification_outbox where job_id='${job.job_id}';`),'provider_retry_window_expired');
    assert.equal(db.sql('select homeground_private.retry_failed_notification_jobs();'),'0');
  });
  await t.test('recent uncertain retry reuses body and first-attempt clock; unsent backlog still sends inside 72 hours',()=>{
    reset();create();let job=claim()[0];freeze(job);
    db.sql(`update homeground_private.notification_outbox set first_provider_attempt_at=now()-interval '22 hours',lease_until=now()-interval '1 second' where job_id='${job.job_id}';`);
    const first=db.sql(`select first_provider_attempt_at from homeground_private.notification_outbox where job_id='${job.job_id}';`);
    job=claim()[0];assert.deepEqual(freeze(job,'changed'),{subject:'original'});
    assert.equal(db.sql(`select first_provider_attempt_at from homeground_private.notification_outbox where job_id='${job.job_id}';`),first);
    db.sql(`update homeground_private.notification_outbox set status='failed',lease_token=null,lease_until=null where job_id='${job.job_id}';`);
    assert.equal(db.sql('select homeground_private.retry_failed_notification_jobs();'),'1');
    assert.equal(db.sql(`select first_provider_attempt_at from homeground_private.notification_outbox where job_id='${job.job_id}';`),first,'manual recovery cannot renew deduplication authority');
    reset();create();db.sql("update homeground_private.notification_outbox set created_at=now()-interval '48 hours';");
    job=claim()[0];assert.ok(job);assert.deepEqual(freeze(job),{subject:'original'});
    assert.equal(db.sql("select first_provider_attempt_at>now()-interval '1 minute' from homeground_private.notification_outbox;"),'t');
  });

  await t.test('real Edge homepage, destination and quote intake dispatches atomically with and without traffic attribution',async()=>{
    reset();
    const originalDeno=globalThis.Deno,originalFetch=globalThis.fetch;let handler;
    const env=new Map([
      ['ALLOWED_ORIGINS','https://homegroundchina.com'],['ALLOWED_FORM_VERSIONS',`2026-07-21.1,2026-07-26.1,${currentPrivateTourQuoteFormVersion}`],
      ['ALLOWED_PRIVACY_NOTICE_VERSIONS','2026-09-28.1'],['SUPABASE_URL','https://isolated.example.invalid'],
      ['SUPABASE_SECRET_KEYS','{"default":"isolated-only-key"}'],['IDEMPOTENCY_HASH_SECRET','isolated-idempotency'],
      ['RATE_LIMIT_HASH_SECRET','isolated-rate'],['TRAFFIC_SESSION_HASH_SECRET','isolated-traffic'],['TRAVELLER_ACK_ENABLED','true'],
    ]);
    globalThis.Deno={env:{get:name=>env.get(name)},serve:value=>{handler=value;}};
    const calls=[];
    globalThis.fetch=async(url,init)=>{
      const parsed=new URL(String(url));assert.equal(parsed.origin,'https://isolated.example.invalid');
      const name=parsed.pathname.split('/').at(-1),body=JSON.parse(init.body);calls.push({name,body});
      return new Response(JSON.stringify(db.rpc(name,body)),{status:200});
    };
    try {
      await import(`../functions/v1-inquiries/index.ts?hardening=${randomUUID()}`);
      const common={locale:'en',privacyNoticeVersion:'2026-09-28.1',attribution:{landingPath:'/'},experiment:null,antiAbuse:{companyWebsite:''}};
      const cases=[
        {name:'homepage',rpc:'create_homeground_homepage_email',payload:{...common,schemaVersion:3,formVersion:'2026-07-26.1',entryPath:'homepage_email'}},
        {name:'destination',rpc:'create_homeground_destination_inquiry',payload:{...common,schemaVersion:2,formVersion:'2026-07-21.1',entryPath:'destination_timing',note:null,departureCountry:'Canada',roughBudgetPerPerson:'USD 3,000',
          journey:{journeyId:randomUUID(),revision:1,routeId:'destination-timing',ruleVersion:destinationTimingRuleVersion,
            answers:{destinationMode:'wishlist',destinationIds:['beijing-great-wall','shanghai'],otherPlace:null,totalNights:9,party:'two-adults',pace:'classic',mustSeeIds:[]}}}},
        {name:'quote',rpc:'create_homeground_private_tour_quote',payload:{...common,schemaVersion:privateTourQuoteSchemaVersion,formVersion:currentPrivateTourQuoteFormVersion,entryPath:'private_tour_quote',
          productInterest:getPrivateTourInquiryContext('beijing-highlights-5-day-private-tour','en',{packageId:'no-guide',travelers:4}),travelDate:null,note:null,
          attribution:{landingPath:'/tours/beijing-highlights-5-day-private-tour/'}}},
      ];
      let client=1;
      for(const fixture of cases)for(const withTraffic of [false,true]){
        const payload={...fixture.payload,contact:{channel:'email',email:`guest-${randomUUID()}@example.invalid`},...(withTraffic?{trafficSessionToken:randomUUID()}:{})};
        const before=calls.length;
        const response=await handler(new Request('https://isolated.example.invalid/functions/v1/v1-inquiries',{
          method:'POST',headers:{Origin:'https://homegroundchina.com','Content-Type':'application/json','Idempotency-Key':randomUUID(),'X-Forwarded-For':`203.0.113.${client++}`},body:JSON.stringify(payload),
        }));
        const result=await response.json();assert.equal(response.status,201,JSON.stringify(result));assert.equal(result.ackQueued,true);
        const actual=calls[before];assert.equal(actual.name,'create_homeground_inquiry_with_receipt_v1');
        assert.equal(actual.body.p_rpc_name,fixture.rpc+(withTraffic?'_with_traffic_v1':fixture.name==='destination'?'_v4':'_v1'));
      }
      assert.equal(count('inquiries'),6);assert.equal(count('traveller_ack_outbox'),6);assert.equal(count('traveller_ack_intents'),0);
    } finally {globalThis.Deno=originalDeno;globalThis.fetch=originalFetch;}
  });

  await t.test('upgrade bounds previously attempted jobs without expiring never-attempted backlog',()=>{
    reset();const attempted=create(),frozen=create(),untouched=create();
    db.sql(`update homeground_private.notification_outbox set created_at=now()-interval '30 hours';
      update homeground_private.notification_outbox set attempt_count=1 where inquiry_id='${attempted.inquiryId}';
      update homeground_private.notification_outbox set message_json='{"subject":"already frozen"}' where inquiry_id='${frozen.inquiryId}';
      alter table homeground_private.notification_outbox drop column first_provider_attempt_at;
      drop function public.create_homeground_inquiry_with_receipt_v1(text,jsonb,boolean,text);`);
    // Exercise the upgrade statements against rows that predate the new column.
    db.sql(readFileSync(new URL('../migrations/202610110002_inquiry_receipt_and_retry_hardening.sql',import.meta.url),'utf8'));
    assert.equal(db.sql(`select count(*) from homeground_private.notification_outbox where first_provider_attempt_at=created_at;`),'2');
    assert.equal(db.sql(`select first_provider_attempt_at is null from homeground_private.notification_outbox where inquiry_id='${untouched.inquiryId}';`),'t');
    const jobs=claim();assert.equal(jobs.length,1);assert.equal(jobs[0].inquiry_id,untouched.inquiryId);
    assert.equal(db.sql("select count(*) from homeground_private.notification_outbox where last_error_code='provider_retry_window_expired';"),'2');
  });
});
