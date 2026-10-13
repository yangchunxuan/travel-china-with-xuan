import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import worker,{runOutboxMonitor} from '../../ops/outbox-monitor/worker.mjs';
import {OUTBOX_HEALTH_URL,OutboxMonitorError} from '../../ops/outbox-monitor/health.mjs';
import {checkOutboxHealth} from '../../tools/check-outbox-health.mjs';
import {outboxWorkflowDecision,reportOutboxHeartbeat} from '../../tools/report-outbox-heartbeat.mjs';

const heartbeat='https://uptime.betterstack.com/api/v1/heartbeat/fixture_token';
const secret='fixture-monitor-secret-at-least-32-characters';
const env={OUTBOX_HEALTH_URL,OUTBOX_MONITOR_SECRET:secret,OUTBOX_HEARTBEAT_URL:heartbeat,OUTBOX_HEARTBEAT_REPORTER:'cloudflare'};
const now=()=>new Date('2026-10-11T12:00:00.000Z');
const healthy=()=>({ok:true,status:'healthy',checkedAt:'2026-10-11T11:59:59.000Z',requestId:'not-to-be-logged',
  counts:{pending:0,processing:0,failed:0,overduePending:0,expiredProcessing:0,createdLast10Minutes:0,createdLast1Hour:0,createdLast24Hours:0},travellerAck:{status:'disabled'}});
function fixture(options={}){
  const calls=[];
  return {calls,fetchImpl:async(url,init)=>{
    calls.push({url:String(url),...init});
    assert.equal(init.redirect,'manual');assert.ok(init.signal);
    if(String(url).startsWith(heartbeat)){
      assert.equal(init.headers,undefined,'monitor secret never sent to heartbeat');
      if(options.heartbeatTimeout)return new Promise(()=>{});
      if(options.heartbeatThrow)throw Error('token=fixture_token customer@example.invalid');
      return new Response('',{status:options.heartbeatStatus??200});
    }
    assert.equal(String(url),OUTBOX_HEALTH_URL);assert.equal(init.method,'GET');assert.equal(init.body,undefined);
    assert.equal(init.headers['x-monitor-secret'],secret);
    if(options.headerTimeout)return new Promise(()=>{});
    if(options.networkThrow)throw Error('fixture_token customer@example.invalid');
    if(options.bodyTimeout)return new Response(new ReadableStream({start(){}}),{headers:{'Content-Type':'application/json'}});
    return new Response(options.body??JSON.stringify(options.health??healthy()),{status:options.status??200,headers:{'Content-Type':options.type??'application/json',...options.headers}});
  }};
}
async function run(options={},limits={}){const f=fixture(options);return {...f,result:await runOutboxMonitor(env,{fetchImpl:f.fetchImpl,now,limits})};}
function failure(result,code){assert.equal(result.result.ok,false);assert.equal(result.result.code,code);assert.equal(result.calls.length,2);assert.equal(result.calls[1].url,heartbeat+'/fail');}

test('independent sampler sends one authenticated read, then one aggregate-free success heartbeat',async()=>{
  const result=await run();assert.deepEqual(result.result,{ok:true,code:'HEALTHY',checkedAt:healthy().checkedAt});
  assert.equal(result.calls.length,2);assert.equal(result.calls[1].url,heartbeat);
  assert.doesNotMatch(JSON.stringify(result.result),/fixture|not-to-be-logged|pending|@/u);
});
test('missing, future, impossible or stale sample dates cannot refresh heartbeat',async()=>{
  for(const date of [undefined,null,'2026-10-11','2026-02-30T11:59:59.000Z','2026-10-11T12:00:00.001Z','2026-10-11T11:57:59.999Z']){
    const h=healthy();h.checkedAt=date;const f=await run({health:h});failure(f,date==='2026-10-11T11:57:59.999Z'?'SAMPLE_STALE':'SAMPLE_TIME_INVALID');
  }
});
test('all aggregate fields must be exact non-negative integers and internally consistent',async()=>{
  for(const value of [-1,0.5,'0',null,Number.MAX_SAFE_INTEGER+1]){
    const h=healthy();h.counts.pending=value;failure(await run({health:h}),'RESPONSE_INVALID');
  }
  for(const edit of [h=>delete h.counts.processing,h=>h.counts.contact_email='private@example.invalid',h=>h.counts.createdLast10Minutes=1,h=>h.counts.overduePending=1]){
    const h=healthy();edit(h);failure(await run({health:h}),'RESPONSE_INVALID');
  }
});
test('overall failure, volume alert and traveller acknowledgment failure all stay unhealthy',async()=>{
  for(const edit of [h=>h.ok=false,h=>h.status='unhealthy',h=>h.counts.failed=1,h=>h.travellerAck={status:'unavailable'},h=>delete h.travellerAck]){
    const h=healthy();edit(h);failure(await run({health:h}),'OUTBOX_UNHEALTHY');
  }
  const h=healthy();h.travellerAck={status:'healthy',pending:1,failed:0,bounced:0,complained:0,overdue:0,intentCapacityReached:false};
  assert.equal((await run({health:h})).result.ok,true);
  h.travellerAck.bounced=1;failure(await run({health:h}),'OUTBOX_UNHEALTHY');
  h.travellerAck.bounced='0';failure(await run({health:h}),'RESPONSE_INVALID');
});
test('redirects, HTTP errors, bad JSON, wrong content type and excess bytes fail boundedly',async()=>{
  for(const status of [301,302,307,308])failure(await run({status}),'REDIRECT_BLOCKED');
  for(const options of [{status:401},{status:503},{body:'{bad'},{type:'text/html'}])failure(await run(options),'RESPONSE_INVALID');
  failure(await run({body:' '.repeat(16385)}),'BODY_LIMIT_EXCEEDED');
  failure(await run({headers:{'Content-Length':'20000'}}),'BODY_LIMIT_EXCEEDED');
});
test('header and streaming body deadlines both yield one failure heartbeat',async()=>{
  for(const options of [{headerTimeout:true},{bodyTimeout:true}])failure(await run(options,{timeoutMs:5}),'REQUEST_TIMEOUT');
  failure(await run({networkThrow:true}),'NETWORK_FAILURE');
});
test('bad destinations, reporter mode and secrets are rejected before any request',async()=>{
  for(const change of [
    {OUTBOX_HEALTH_URL:OUTBOX_HEALTH_URL+'?key=secret'},{OUTBOX_HEALTH_URL:OUTBOX_HEALTH_URL.replace('https:','http:')},
    {OUTBOX_HEALTH_URL:OUTBOX_HEALTH_URL.replace('.supabase.co','.supabase.co.attacker.invalid')},
    {OUTBOX_MONITOR_SECRET:''},{OUTBOX_MONITOR_SECRET:secret+'\n'},
    {OUTBOX_HEARTBEAT_REPORTER:'disabled'},{OUTBOX_HEARTBEAT_REPORTER:undefined},
    {OUTBOX_HEARTBEAT_URL:heartbeat+'?token=secret'},{OUTBOX_HEARTBEAT_URL:heartbeat.replace('uptime.betterstack.com','attacker.invalid')},
  ]){const f=fixture();await assert.rejects(runOutboxMonitor({...env,...change},{fetchImpl:f.fetchImpl,now}),error=>error.code==='CONFIG_INVALID');assert.equal(f.calls.length,0);}
  const f=fixture();await assert.rejects(runOutboxMonitor(env,{fetchImpl:f.fetchImpl,now,limits:{timeoutMs:9000}}),/LIMITS_INVALID/u);assert.equal(f.calls.length,0);
});
test('failed heartbeat delivery never retries or attempts to turn a failure green',async()=>{
  for(const options of [{heartbeatStatus:302},{heartbeatStatus:500},{heartbeatThrow:true},{heartbeatTimeout:true}]){
    const f=fixture(options);await assert.rejects(runOutboxMonitor(env,{fetchImpl:f.fetchImpl,now,limits:{timeoutMs:5}}),error=>error instanceof OutboxMonitorError && error.message==='HEARTBEAT_FAILED');assert.equal(f.calls.length,2);
  }
});
test('HTTP handler cannot trigger a sample, default deployment has no schedule or public URL',async()=>{
  assert.equal((await worker.fetch(new Request('https://fixture.invalid/'))).status,404);
  const config=await readFile(new URL('../../ops/outbox-monitor/wrangler.jsonc',import.meta.url),'utf8');
  assert.match(config,/"workers_dev": false/u);assert.match(config,/"preview_urls": false/u);assert.match(config,/"crons": \[\]/u);assert.match(config,/"OUTBOX_HEARTBEAT_REPORTER": "disabled"/u);
});
test('scheduled failure logs only a fixed code and timestamp, never endpoint data or credentials',async()=>{
  const originalFetch=globalThis.fetch,originalLog=console.log,logs=[];
  const f=fixture({networkThrow:true});globalThis.fetch=f.fetchImpl;console.log=value=>logs.push(value);
  try{
    await assert.rejects(worker.scheduled({},env),error=>error.message==='NETWORK_FAILURE');
    assert.equal(logs.length,1);const entry=JSON.parse(logs[0]);
    assert.deepEqual(Object.keys(entry).sort(),['checkedAt','code']);assert.equal(entry.code,'NETWORK_FAILURE');
    assert.doesNotMatch(logs[0],/fixture|secret|https:|@|pending|requestId/u);
    assert.equal(f.calls.length,2);assert.equal(f.calls[1].url,heartbeat+'/fail');
  }finally{globalThis.fetch=originalFetch;console.log=originalLog;}
});

const repository='fixture/homeground';
function workflowFixture(){
  const run={id:123,run_attempt:2,workflow_id:789,name:'Inquiry outbox health',path:'.github/workflows/inquiry-health.yml',head_repository:{full_name:repository},head_branch:'main',head_sha:'a'.repeat(40),status:'completed',conclusion:'success',run_started_at:'2026-10-11T11:55:00Z',updated_at:'2026-10-11T11:59:00Z'};
  return {repository,event:{workflow_run:run},latest:structuredClone(run),receipt:{schemaVersion:1,runId:'123',runAttempt:2,headSha:run.head_sha,checkedAt:'2026-10-11T11:58:58.000Z'},nowMs:now().getTime()};
}
test('GH receipt contains only successful sample date and exact run identity',async()=>{
  const f=fixture();const receipt=await checkOutboxHealth({...env,GITHUB_RUN_ID:'123',GITHUB_RUN_ATTEMPT:'2',GITHUB_SHA:'a'.repeat(40)},{fetchImpl:f.fetchImpl,now});
  assert.deepEqual(receipt,{schemaVersion:1,runId:'123',runAttempt:2,headSha:'a'.repeat(40),checkedAt:healthy().checkedAt});assert.equal(f.calls.length,1);
});
test('fresh successful matching GH run can emit once; worker mode emits nothing',async()=>{
  const input=workflowFixture();const calls=[];const fetchImpl=async(url)=>{calls.push(String(url));return new Response('');};
  assert.deepEqual(outboxWorkflowDecision(input),{report:true,outcome:'success',code:'FRESH_SAMPLE'});
  assert.equal((await reportOutboxHeartbeat({...input,url:heartbeat},fetchImpl)).reported,true);assert.deepEqual(calls,[heartbeat]);
  assert.equal((await reportOutboxHeartbeat({mode:'cloudflare'},fetchImpl)).reported,false);assert.equal(calls.length,1);
  await assert.rejects(reportOutboxHeartbeat({...input,mode:'typo',url:heartbeat},fetchImpl),/REPORTER_MODE_INVALID/u);assert.equal(calls.length,1);
});
test('latest completed success cannot refresh heartbeat after its sample becomes stale',async()=>{
  const input=workflowFixture();input.nowMs+=21*60*1000;
  // A misleading recently-updated run timestamp cannot hide the old sample.
  input.event.workflow_run.updated_at='2026-10-11T12:20:00Z';input.latest.updated_at=input.event.workflow_run.updated_at;
  const calls=[];const result=await reportOutboxHeartbeat({...input,url:heartbeat},async()=>{calls.push(1);return new Response('');});
  assert.equal(result.reported,false);assert.equal(result.code,'SAMPLE_NOT_FRESH');assert.equal(calls.length,0);
});
test('superseded runs, wrong attempts/SHA/origin, missing/future dates and reused receipts fail closed',()=>{
  for(const edit of [
    x=>x.latest.id++,x=>x.latest.run_attempt++,x=>x.latest.status='in_progress',x=>x.latest.head_sha='b'.repeat(40),
    x=>x.event.workflow_run.head_repository.full_name='other/repo',x=>x.event.workflow_run.head_branch='feature',
    x=>x.receipt.runAttempt=1,x=>x.receipt.runId='122',x=>x.receipt.headSha='b'.repeat(40),x=>x.receipt.schemaVersion=2,
    x=>x.receipt=null,x=>delete x.receipt.checkedAt,x=>x.receipt.checkedAt='2026-10-11T12:00:00.001Z',
    x=>x.receipt.checkedAt='2026-10-11T11:54:59.000Z',x=>x.receipt.checkedAt='2026-10-11T11:59:01.000Z',
    x=>delete x.event.workflow_run.updated_at,x=>x.event.workflow_run.updated_at='2026-10-11T12:00:01Z',
  ]){const input=workflowFixture();edit(input);assert.equal(outboxWorkflowDecision(input).report,false);}
});
test('a failed current workflow reports failure, never fabricates a healthy sample',()=>{
  const input=workflowFixture();input.event.workflow_run.conclusion='failure';input.latest.conclusion='failure';input.receipt=null;
  assert.deepEqual(outboxWorkflowDecision(input),{report:true,outcome:'failure',code:'WORKFLOW_FAILED'});
});
test('workflow preserves deployment/drill reporting and explicitly guards the GH fallback',async()=>{
  const source=await readFile(new URL('../../.github/workflows/stability-workflow-alerts.yml',import.meta.url),'utf8');
  assert.equal((source.match(/vars\.OUTBOX_HEARTBEAT_REPORTER != 'cloudflare'/gu)??[]).length,2);
  assert.match(source,/node tools\/report-outbox-heartbeat\.mjs/u);
  assert.match(source,/Report deployment verification[\s\S]*DEPLOY_VERIFICATION_HEARTBEAT_URL[\s\S]*node tools\/report-stability-heartbeat\.mjs/u);
  assert.match(source,/STABILITY_DRILL_HEARTBEAT_URL/u);
});
