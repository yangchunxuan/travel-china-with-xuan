import assert from 'node:assert/strict';
import {createHmac, randomUUID} from 'node:crypto';
import test from 'node:test';
import { getPrivateTourInquiryContext } from '../../lib/privateTourInquiryContext.ts';

test('email correction authenticates with private browser key, validates bounded input and preserves uncertain-write retry', async()=>{
  const originalDeno=globalThis.Deno, originalFetch=globalThis.fetch;
  const secret='local-only-original-intake-secret';
  const env=new Map(Object.entries({ALLOWED_ORIGINS:'https://homegroundchina.com',INQUIRY_EMAIL_CORRECTION_ENABLED:'true',IDEMPOTENCY_HASH_SECRET:secret,TRAVELLER_ACK_ENABLED:'true',SUPABASE_URL:'https://local.invalid',SUPABASE_SECRET_KEYS:'{"default":"test-only"}'}));
  const access=randomUUID(), key=randomUUID();let calls=[],rpcFailure=false;
  let result={outcome:'corrected',publicReference:'HG-1234-5678-ABCD',contactEmail:'new@example.test',contactRevision:1,firstResponseDueAt:'2026-10-01T05:04:52Z',ackStatus:'queued',duplicate:false,changed:true};
  globalThis.Deno={env:{get:name=>env.get(name)},serve:()=>{}};
  globalThis.fetch=async(url,init)=>{assert.equal(String(url),'https://local.invalid/rest/v1/rpc/correct_homeground_inquiry_email_v1');calls.push(JSON.parse(init.body));if(rpcFailure)throw Error('local simulated timeout');return new Response(JSON.stringify(result));};
  try {
    const {handleEmailCorrection,normalizeCorrectionEmail}=await import(`../functions/v1-inquiry-email-corrections/index.ts?test=${Date.now()}`);
    const request=(body={email:'new@EXAMPLE.test',expectedRevision:0},headers={})=>new Request('https://local.invalid/correct',{method:'POST',headers:{Origin:'https://homegroundchina.com','Content-Type':'application/json','Inquiry-Access-Key':access,'Idempotency-Key':key,...headers},body:JSON.stringify(body)});
    for(const bad of ['a..b@example.test','a@example..test','a@-domain.test','a\r\nb@example.test','a@example.test,other@example.test','name@example.test\u202e','a@b','<a>@example.test'])assert.equal(normalizeCorrectionEmail(bad),null,bad);
    assert.equal(normalizeCorrectionEmail(' Person+tag@EXAMPLE.test '),'Person+tag@example.test');
    assert.equal((await handleEmailCorrection(request(undefined,{Origin:'https://evil.invalid'}))).status,403);assert.equal(calls.length,0);
    assert.equal((await handleEmailCorrection(request(undefined,{'Inquiry-Access-Key':'HG-1234-5678-ABCD'}))).status,403);assert.equal(calls.length,0);
    assert.equal((await handleEmailCorrection(request({email:'new@example.test',expectedRevision:0,publicReference:result.publicReference}))).status,422);
    assert.equal((await handleEmailCorrection(request({email:'bad',expectedRevision:0}))).status,422);
    assert.equal((await handleEmailCorrection(request({email:'new@example.test',expectedRevision:-1}))).status,422);
    assert.equal((await handleEmailCorrection(request({email:'a'.repeat(2050),expectedRevision:0}))).status,413);assert.equal(calls.length,0);
    env.set('INQUIRY_EMAIL_CORRECTION_ENABLED','false');assert.equal((await handleEmailCorrection(request())).status,403);assert.equal(calls.length,0);env.set('INQUIRY_EMAIL_CORRECTION_ENABLED','true');
    let response=await handleEmailCorrection(request());assert.equal(response.status,200);let body=await response.json();assert.equal(body.contactEmail,'new@example.test');assert.equal(body.ackQueued,true);
    assert.equal(calls[0].p_inquiry_key_hash,createHmac('sha256',secret).update(access).digest('hex'));
    assert.equal(calls[0].p_request_key_hash,createHmac('sha256',secret).update(`email-correction:${key}`).digest('hex'));
    assert.equal(calls[0].p_recipient_hash,createHmac('sha256',secret).update('traveller-ack:new@example.test').digest('hex'));
    assert.doesNotMatch(JSON.stringify(calls[0])+JSON.stringify(body),new RegExp(`${access}|${key}`));
    rpcFailure=true;response=await handleEmailCorrection(request());body=await response.json();assert.equal(response.status,503);assert.equal(body.error.persistenceState,'unknown');assert.equal(body.error.retryable,true);assert.deepEqual(calls[1],calls[0]);rpcFailure=false;
    for(const outcome of ['correction_unavailable','correction_conflict','correction_limit','idempotency_conflict','correction_busy']){
      result={outcome};response=await handleEmailCorrection(request());body=await response.json();assert.equal(body.error.code,outcome);assert.equal(body.error.persistenceState,'not_persisted');assert.equal(body.error.retryable,outcome==='correction_busy');
      if(outcome==='correction_busy')assert.equal(response.headers.get('Retry-After'),'5');
    }
    const options=new Request('https://local.invalid/correct',{method:'OPTIONS',headers:{Origin:'https://homegroundchina.com','Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'content-type, inquiry-access-key, idempotency-key'}});
    assert.equal((await handleEmailCorrection(options)).status,204);
    const badOptions=new Request('https://local.invalid/correct',{method:'OPTIONS',headers:{Origin:'https://homegroundchina.com','Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'authorization'}});
    assert.equal((await handleEmailCorrection(badOptions)).status,403);
  }finally{globalThis.Deno=originalDeno;globalThis.fetch=originalFetch;}
});

test('correction staff notice is a distinct immutable job and obsolete revisions withhold contact action',async()=>{
  const originalDeno=globalThis.Deno,originalFetch=globalThis.fetch;let handler,job,frozen,sent,providerKey;
  const workerSecret='local-only-worker-secret-with-32-characters';
  const env=new Map(Object.entries({SUPABASE_URL:'https://local.invalid',SUPABASE_SECRET_KEYS:'{"default":"test-only"}',NOTIFICATION_WORKER_SECRET:workerSecret,RESEND_API_KEY:'test-only',RESEND_FROM_EMAIL:'Homeground <internal@example.invalid>',BRAND_NOTIFICATION_EMAIL:'staff@example.invalid',TRAVELLER_ACK_MONITOR_ENABLED:'true'}));
  globalThis.Deno={env:{get:name=>env.get(name)},serve:fn=>{handler=fn;}};
  globalThis.fetch=async(url,init)=>{
    const name=new URL(url).pathname.split('/').at(-1),body=JSON.parse(init.body);let result;
    if(name==='claim_homeground_notification_jobs_v4')result=[job];
    else if(name==='get_homeground_traveller_ack_staff_status_v1')result={stopReason:null};
    else if(name==='freeze_homeground_notification_message_v1'){frozen??=body.p_message;result=frozen;}
    else if(name==='finish_homeground_notification_job')result=true;
    else if(url==='https://api.resend.com/emails'){sent=body;providerKey=init.headers['Idempotency-Key'];result={id:'local-provider'};}
    else throw Error(`unexpected mocked URL ${url}`);
    return new Response(JSON.stringify(result));
  };
  try{
    await import(`../functions/notify-inquiries/index.ts?correction=${Date.now()}`);
    job={job_id:randomUUID(),inquiry_id:randomUUID(),public_reference:'HG-1234-5678-ABCD',locale:'en',route_id:'homepage-email',answers:{informationStatus:'not_provided'},route_snapshot:{kind:'homepage-email',informationStatus:'not_provided',ruleVersion:'2026-07-26.1'},reply_channel:'email',contact_email:'right@example.test',contact_phone_e164:null,departure_country:null,rough_budget_per_person:null,note:null,inquiry_created_at:'2026-09-29T05:04:52Z',first_response_due_at:'2026-10-01T05:04:52Z',lease_token:randomUUID(),row_version:2,attempt_count:1,contact_revision:1,current_contact_revision:1,previous_contact_email:'typo@example.test'};
    const request=()=>new Request('https://local.invalid/worker',{method:'POST',headers:{'x-worker-secret':workerSecret}});
    let response=await handler(request());assert.equal((await response.json()).accepted,1);
    assert.equal(providerKey,`homeground-email-correction/v1/${job.job_id}`);assert.notEqual(providerKey,job.inquiry_id);
    assert.match(sent.subject,/Email corrected: HG-1234-5678-ABCD/);assert.match(sent.text,/Previous email: typo@example.test/);assert.match(sent.text,/Corrected email: right@example.test/);assert.match(sent.text,/2026-10-01T05:04:52Z/);assert.match(sent.html,/href="mailto:right%40example.test/);assert.equal(sent.reply_to,undefined);
    const original=JSON.stringify(sent);job.current_contact_revision=2;await handler(request());assert.equal(JSON.stringify(sent),original,'freeze preserves unknown previous provider acceptance');
    frozen=undefined;job.job_id=randomUUID();await handler(request());assert.match(sent.text,/THIS EMAIL ADDRESS HAS BEEN REPLACED/);assert.doesNotMatch(sent.html,/href="mailto:/);
    frozen=undefined;job.job_id=randomUUID();job.current_contact_revision=1;
    const product=getPrivateTourInquiryContext('shanghai-suzhou-5-day-private-tour','en');
    job.route_id='private-tour-quote';job.answers={productInterest:product,travelDate:'2026-12-03',landingPath:`/tours/${product.slug}/`};
    job.route_snapshot={kind:'private-tour-quote',ruleVersion:'2026-09-10.1'};job.note='[Requested group size: 15 travellers]\n\nTwo rooms please.';
    response=await handler(request());assert.equal((await response.json()).accepted,1);
    assert.match(sent.text,/Email|email/);assert.ok(sent.text.includes(product.name));assert.match(sent.text,/Requested travel date: 2026-12-03/);assert.match(sent.text,/15 travellers/);assert.match(sent.text,/Two rooms please/);
    assert.match(sent.html,/href="mailto:right%40example.test/);

  }finally{globalThis.Deno=originalDeno;globalThis.fetch=originalFetch;}
});
