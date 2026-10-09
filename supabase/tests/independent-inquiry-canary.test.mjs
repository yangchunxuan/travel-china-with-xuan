import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import worker, {CanaryError, INQUIRY_ENDPOINT, SITE_ORIGIN, runIntakeCanary} from '../../ops/inquiry-canary/worker.mjs';

const heartbeat = 'https://uptime.betterstack.com/api/v1/heartbeat/fixture_private_token';
const env = {INTAKE_HEARTBEAT_URL:heartbeat};
const instant = () => new Date('2026-10-09T12:00:00Z');
const script = (endpoint = INQUIRY_ENDPOINT, privacy = false) => JSON.stringify([endpoint,'2026-07-21.1','2026-07-26.1','2099-01-01.1',...(privacy ? ['2026-09-28.1'] : [])]);
const json = value => new Response(JSON.stringify(value),{status:422,headers:{'Content-Type':'application/json'}});

function fixture(options = {}) {
  const calls = [];
  const count = options.scripts ?? 1;
  const scriptUrls = Array.from({length:count},(_,i)=>`${SITE_ORIGIN}/_next/static/chunks/app/fixture-${i}.js`);
  const html = options.html ?? scriptUrls.map(url=>`<script src="${url}"></script>`).join('');
  const fetchImpl = async (url,init = {}) => {
    calls.push({url,method:init.method ?? 'GET',headers:init.headers,body:init.body,redirect:init.redirect});
    // Every destination is intercepted; the fixture never falls through to fetch.
    if (url === heartbeat || url === heartbeat+'/fail') {
      if (options.heartbeatFailure) throw new Error('private_token customer@example.invalid secret=fixture');
      return new Response('',{status:options.heartbeatStatus ?? 200});
    }
    if (url === SITE_ORIGIN+'/') {
      if (options.networkFailure) throw new Error('customer@example.invalid private_token secret=fixture');
      if (options.headerTimeout) return new Promise(()=>{});
      if (options.bodyTimeout) return new Response(new ReadableStream({start(){}}),{headers:{'Content-Type':'text/html'}});
      return new Response(html,{status:options.homepageStatus ?? 200,headers:{'Content-Type':'text/html'}});
    }
    if (scriptUrls.includes(url)) {
      if (options.brokenLastScript && url === scriptUrls.at(-1)) return new Response('broken',{status:503});
      const body = options.scriptBody ?? (url === scriptUrls[0] ? script(options.endpoint,options.privacy) : 'export const unused=1;');
      if (options.fragments) {
        const chunks = options.fragments;
        return new Response(new ReadableStream({start(controller){for(const chunk of chunks)controller.enqueue(new TextEncoder().encode(chunk));controller.close();}}),{headers:{'Content-Type':'application/javascript'}});
      }
      return new Response(body,{headers:{'Content-Type':options.scriptType ?? 'application/javascript'}});
    }
    if (url === INQUIRY_ENDPOINT && init.method === 'POST') {
      const body = JSON.parse(init.body);
      const fields = {contact:'required',antiAbuse:'required',...(body.entryPath === 'destination_timing' ? {journey:'required'} : {})};
      if (options.fieldError) fields[options.fieldError] = 'unsupported';
      if (options.missingField) delete fields[options.missingField];
      if (options.unwantedJourney && body.entryPath === 'homepage_email') fields.journey = 'required';
      if (options.probeStatus) return new Response('{}',{status:options.probeStatus});
      if (options.malformedJson) return new Response('{bad',{status:422});
      return json({error:{code:options.errorCode ?? 'validation_failed',persistenceState:options.persisted ? 'persisted' : 'not_persisted',fieldErrors:fields}});
    }
    throw new Error('fixture blocked unexpected destination');
  };
  return {calls,fetchImpl};
}

async function run(options = {}, limits = {}) {
  const f = fixture(options);
  let next = 0;
  const result = await runIntakeCanary(env,{fetchImpl:f.fetchImpl,now:instant,uuid:()=>`fixture-${++next}`,limits});
  return {...f,result};
}
const probes = calls => calls.filter(call=>call.method === 'POST');
function failed(f, code) {
  assert.equal(f.result.ok,false); assert.equal(f.result.code,code);
  assert.equal(f.calls.at(-1).url,heartbeat+'/fail');
  assert.equal(f.calls.some(call=>call.url === heartbeat),false,'failure must never reset the success heartbeat');
}

test('old and new privacy preserve all six deliberately incomplete public payloads', async t => {
  for (const privacy of [false,true]) await t.test(String(privacy),async()=>{
    const f = await run({privacy});
    assert.deepEqual(f.result,{ok:true,code:'HEALTHY',checkedAt:'2026-10-09T12:00:00.000Z',completedChecks:6});
    assert.equal(f.calls.at(-1).url,heartbeat);
    assert.equal(f.calls.length,9);
    assert.deepEqual(probes(f.calls).map(call=>JSON.parse(call.body).locale),['en','zh','ko','en','zh','ko']);
    for (const call of probes(f.calls)) {
      const body = JSON.parse(call.body), destination = body.entryPath === 'destination_timing';
      const version = destination ? '2026-07-21.1' : '2026-07-26.1';
      assert.equal(body.schemaVersion,destination ? 2 : 3);
      assert.equal(body.formVersion,version);
      assert.equal(body.privacyNoticeVersion,privacy ? '2026-09-28.1' : version);
      assert.equal(body.attribution.landingPath,body.locale === 'en' ? '/' : `/${body.locale}/`);
      if(destination) assert.deepEqual(body.attribution,{landingPath:body.attribution.landingPath,utmSource:'canary',utmMedium:'scheduled_probe',utmCampaign:'utm-contract'});
      for(const forbidden of ['journey','contact','antiAbuse','contact_email','email']) assert.equal(Object.hasOwn(body,forbidden),false);
      assert.deepEqual(Object.keys(call.headers).sort(),['Content-Type','Origin','idempotency-key'].sort());
      assert.equal(call.headers.Origin,SITE_ORIGIN);
    }
    assert.equal(new Set(probes(f.calls).map(call=>call.headers['idempotency-key'])).size,6);
    assert.equal(f.calls.every(call=>call.redirect === 'error'),true);
  });
});

test('streamed scans preserve split contracts without reclassifying truncated old windows', async()=>{
  const body = script(INQUIRY_ENDPOINT,true)+' '.repeat(300);
  const cuts = [INQUIRY_ENDPOINT.length/2|0,100,190,body.length];
  let previous = 0;
  const fragments = cuts.map(end=>{const part=body.slice(previous,end);previous=end;return part;});
  const f = await run({fragments});
  assert.equal(f.result.ok,true); assert.equal(probes(f.calls).length,6);
});

test('wrong or ambiguous published endpoint fails before any POST', async t => {
  for(const endpoint of ['https://wrong.supabase.co/functions/v1/v1-inquiries',INQUIRY_ENDPOINT+'/unexpected','http://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/v1-inquiries']) await t.test(endpoint,async()=>{
    const f = await run({endpoint});failed(f,'WRONG_PUBLISHED_ENDPOINT');assert.equal(probes(f.calls).length,0);
  });
  const f = await run({scriptBody:script()+' '+script('https://wrong.supabase.co/functions/v1/v1-inquiries')});
  failed(f,'WRONG_PUBLISHED_ENDPOINT');assert.equal(probes(f.calls).length,0);
});

test('dangerous acceptance, persistence and missing rejection fields stop the first probe', async t => {
  for(const options of [{probeStatus:200},{persisted:true},{missingField:'contact'},{missingField:'antiAbuse'},{missingField:'journey'},{errorCode:'unexpected'}]) await t.test(JSON.stringify(options),async()=>{
    const f=await run(options);failed(f,'UNSAFE_REJECTION');assert.equal(probes(f.calls).length,1);assert.equal(f.result.completedChecks,0);
  });
  const f=await run({unwantedJourney:true});failed(f,'CONTRACT_REJECTED');assert.equal(probes(f.calls).length,4);assert.equal(f.result.completedChecks,3);
});

test('every version, locale and attribution contract error fails even with safe HTTP422', async t=>{
  for(const fieldError of ['schemaVersion','formVersion','privacyNoticeVersion','entryPath','locale','attribution','attribution.utmSource','experiment','unexpectedField']) await t.test(fieldError,async()=>{
    const f=await run({fieldError});failed(f,'CONTRACT_REJECTED');assert.equal(probes(f.calls).length,1);
  });
  const f=await run({malformedJson:true});failed(f,'PROBE_RESPONSE_INVALID');assert.equal(probes(f.calls).length,1);
});

test('every listed script is checked; missing contracts and redirect/foreign assets fail closed', async()=>{
  const last=await run({scripts:2,brokenLastScript:true});failed(last,'SCRIPT_RESPONSE_INVALID');assert.equal(probes(last.calls).length,0);
  const missing=await run({scriptBody:JSON.stringify([INQUIRY_ENDPOINT,'2026-07-21.1'])});failed(missing,'MISSING_PUBLISHED_CONTRACT');
  const foreign=await run({html:'<script src="https://foreign.invalid/_next/static/chunks/a.js"></script>'});failed(foreign,'SCRIPT_MANIFEST_INVALID');assert.equal(foreign.calls.length,2);
  const redirected=await run({homepageStatus:302});failed(redirected,'REDIRECT_BLOCKED');
  const denied=await run({homepageStatus:403});failed(denied,'SITE_RESPONSE_INVALID');
});

test('network and both header/body timeouts send failure without logging the raw error', async()=>{
  const f=await run({networkFailure:true});failed(f,'NETWORK_FAILURE');assert.doesNotMatch(JSON.stringify(f.result),/private_token|customer@|secret=/);
  for(const options of [{headerTimeout:true},{bodyTimeout:true}]){const timed=await run(options,{timeoutMs:10});failed(timed,'REQUEST_TIMEOUT');}
});

test('request, script and body budgets include and reserve the final heartbeat', async()=>{
  const maximum=await run({scripts:42});assert.equal(maximum.result.ok,true);assert.equal(maximum.calls.length,50);
  const extra=await run({scripts:43});failed(extra,'SCRIPT_LIMIT_EXCEEDED');assert.equal(extra.calls.length,2);
  const limited=await run({}, {maxRequests:4});failed(limited,'SUBREQUEST_BUDGET_EXCEEDED');assert.equal(limited.calls.length,4);assert.equal(limited.result.completedChecks,1);
  for(const limits of [{htmlBytes:10},{scriptBytes:10},{responseBytes:10},{totalBytes:10}]){const f=await run({},limits);failed(f,'BODY_LIMIT_EXCEEDED');}
  const f=fixture();await assert.rejects(runIntakeCanary(env,{fetchImpl:f.fetchImpl,limits:{maxRequests:51}}),{code:'LIMITS_INVALID'});assert.equal(f.calls.length,0);
});

test('missing or invalid heartbeat is rejected before accessing production', async()=>{
  for(const value of [undefined,'','http://uptime.betterstack.com/api/v1/heartbeat/token','https://evil.invalid/api/v1/heartbeat/token',heartbeat+'?secret=fixture',heartbeat+'#fragment','https://user:pass@uptime.betterstack.com/api/v1/heartbeat/token']){
    const f=fixture();await assert.rejects(runIntakeCanary({INTAKE_HEARTBEAT_URL:value},{fetchImpl:f.fetchImpl}),CanaryError);assert.equal(f.calls.length,0);
  }
});

test('heartbeat delivery failure cannot report a healthy result or retry a success', async()=>{
  for(const options of [{heartbeatFailure:true},{heartbeatStatus:503},{networkFailure:true,heartbeatFailure:true}]){
    const f=fixture(options);
    await assert.rejects(runIntakeCanary(env,{fetchImpl:f.fetchImpl}),error=>{assert.equal(error.code,'HEARTBEAT_FAILED');assert.doesNotMatch(String(error),/private_token|customer@|secret=/);return true;});
    assert.equal(f.calls.filter(call=>call.url.startsWith(heartbeat)).length,1);
  }
});

test('HTTP requests always return404 and cannot run the production probe', async()=>{
  const original=globalThis.fetch;let calls=0;
  globalThis.fetch=async()=>{calls++;throw new Error('network must not run');};
  try{for(const method of ['GET','POST'])for(const path of ['/','/run','/scheduled?force=true']){
    const response=await worker.fetch(new Request('https://worker.invalid'+path,{method}),env,{});assert.equal(response.status,404);
  }assert.equal(calls,0);}finally{globalThis.fetch=original;}
});

test('scheduled logs contain only a fixed code, timestamp and completed count', async()=>{
  const originalFetch=globalThis.fetch,originalLog=console.log,logs=[];
  const f=fixture({heartbeatFailure:true});globalThis.fetch=f.fetchImpl;console.log=value=>logs.push(value);
  try{await assert.rejects(worker.scheduled({},env),{code:'HEARTBEAT_FAILED'});}
  finally{globalThis.fetch=originalFetch;console.log=originalLog;}
  assert.equal(logs.length,1);
  const log=JSON.parse(logs[0]);assert.deepEqual(Object.keys(log).sort(),['checkedAt','code','completedChecks']);assert.equal(log.completedChecks,6);
  assert.doesNotMatch(logs[0],/https:|private_token|customer@|secret=/);
});

test('GitHub backup checks cannot reset the independent intake heartbeat', async()=>{
  const alerts=await readFile(new URL('../../.github/workflows/stability-workflow-alerts.yml',import.meta.url),'utf8');
  assert.doesNotMatch(alerts,/INQUIRY_INTAKE_HEARTBEAT_URL|Inquiry intake canary/);
});
