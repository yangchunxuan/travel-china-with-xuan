import assert from 'node:assert/strict';
import test from 'node:test';

test('internal handoff withholds email action for recorded stops or unavailable preferences', async()=>{
  const originalFetch=globalThis.fetch,originalDeno=globalThis.Deno;let handler;let reason=null;let unavailable=false;let sent;let frozen;let retry=false;
  const secret='test-worker-secret-at-least-32-characters';
  const env=new Map(Object.entries({SUPABASE_URL:'https://local.supabase.co',SUPABASE_SECRET_KEYS:JSON.stringify({default:'test-only'}),
    NOTIFICATION_WORKER_SECRET:secret,RESEND_API_KEY:'test-only',RESEND_FROM_EMAIL:'Homeground <internal@example.invalid>',BRAND_NOTIFICATION_EMAIL:'staff@example.invalid',TRAVELLER_ACK_MONITOR_ENABLED:'true'}));
  const job={job_id:'79d3854b-6cbf-478e-bc36-787866b69bdf',inquiry_id:'a1f98a1a-9903-4111-a69f-94033d6b83ed',public_reference:'HG-1234-5678-ABCD',locale:'en',route_id:'homepage-email',
    answers:{informationStatus:'not_provided'},route_snapshot:{kind:'homepage-email',informationStatus:'not_provided',ruleVersion:'2026-07-26.1'},reply_channel:'email',contact_email:'traveller@example.invalid',contact_phone_e164:null,departure_country:null,rough_budget_per_person:null,note:null,inquiry_created_at:'2026-09-28T00:00:00Z',first_response_due_at:'2026-09-29T00:00:00Z',lease_token:'84926c0a-7d0e-4946-855a-0ad3f832ad4b',row_version:1,attempt_count:1};
  globalThis.Deno={env:{get:key=>env.get(key)},serve:fn=>{handler=fn;}};
  globalThis.fetch=async(url,init)=>{
    const path=new URL(url).pathname;let body;
    if(url==='https://api.resend.com/emails'){sent=JSON.parse(init.body);assert.deepEqual(sent.to,['staff@example.invalid']);body={id:'internal-only'};}
    else if(path.endsWith('/claim_homeground_notification_jobs_v3'))body=[job];
    else if(path.endsWith('/get_homeground_traveller_ack_staff_status_v1')){if(unavailable)throw Error('simulated unavailable');body={stopReason:reason};}
    else if(path.endsWith('/freeze_homeground_notification_message_v1')){if(!retry)frozen=JSON.parse(init.body).p_message;body=frozen;}
    else if(path.endsWith('/finish_homeground_notification_job'))body=true;
    else throw Error(`unexpected request ${url}`);
    return new Response(JSON.stringify(body));
  };
  try {
    await import(`../functions/notify-inquiries/index.ts?followup=${Date.now()}`);
    for(const state of [null,'not_me','complained','bounced','suppressed','unavailable']) {
      reason=state;unavailable=state==='unavailable';sent=null;
      const response=await handler(new Request('https://local.invalid/worker',{method:'POST',headers:{'x-worker-secret':secret}}));
      assert.equal(response.status,200);assert.equal((await response.json()).accepted,1);
      assert.equal(sent.reply_to,undefined);
      assert.match(sent.text,/INTERNAL — do not quote/);
      if(state===null)assert.match(sent.html,/href="mailto:/);
      else assert.doesNotMatch(sent.html,/href="mailto:/);
      if(state==='not_me'||state==='complained')assert.match(sent.text,/DO NOT CONTACT/);
    }
    // The original acceptance may be uncertain after its completion RPC failed.
    // A later complaint must not mutate the body under the same provider key.
    reason=null;unavailable=false;
    const request=()=>new Request('https://local.invalid/worker',{method:'POST',headers:{'x-worker-secret':secret}});
    await handler(request());const originalEnvelope=JSON.stringify(sent);
    retry=true;reason='complained';
    await handler(request());assert.equal(JSON.stringify(sent),originalEnvelope);
  } finally {globalThis.fetch=originalFetch;globalThis.Deno=originalDeno;}
});

test('monitor reports unresolved receipt failures even after sending is paused, without personal data',async()=>{
  const originalFetch=globalThis.fetch,originalDeno=globalThis.Deno;let handler,fail=1,calls=0,atCapacity=false;
  const secret='independent-monitor-secret-32-characters';
  const env=new Map(Object.entries({SUPABASE_URL:'https://local.supabase.co',SUPABASE_SECRET_KEYS:JSON.stringify({default:'test-only'}),OUTBOX_MONITOR_SECRET:secret,TRAVELLER_ACK_MONITOR_ENABLED:'true',TRAVELLER_ACK_ENABLED:'false'}));
  globalThis.Deno={env:{get:key=>env.get(key)},serve:fn=>{handler=fn;}};
  globalThis.fetch=async(url)=>{calls++;return new Response(JSON.stringify(new URL(url).pathname.endsWith('/get_homeground_outbox_health')
    ?[{pending_count:0,processing_count:0,failed_count:0,overdue_pending_count:0,expired_processing_count:0,created_last_10_minutes:0,created_last_1_hour:0,created_last_24_hours:0}]
    :[{pending_count:0,failed_count:fail,bounced_count:fail,complained_count:0,overdue_count:0,intent_capacity_reached:atCapacity}]));};
  try {
    await import(`../functions/inquiry-health/index.ts?receipt=${Date.now()}`);
    assert.equal((await handler(new Request('https://local.invalid/health'))).status,401);assert.equal(calls,0);
    const request=()=>new Request('https://local.invalid/health',{headers:{'x-monitor-secret':secret}});
    let response=await handler(request());assert.equal(response.status,503);const body=await response.json();assert.equal(body.counts.failed,0);assert.equal(body.travellerAck.failed,1);
    assert.doesNotMatch(JSON.stringify(body),/@|contact_email|public_reference/);
    fail=0;response=await handler(request());assert.equal(response.status,200);
    atCapacity=true;response=await handler(request());assert.equal(response.status,503);assert.equal((await response.json()).travellerAck.intentCapacityReached,true);
  } finally {globalThis.fetch=originalFetch;globalThis.Deno=originalDeno;}
});
