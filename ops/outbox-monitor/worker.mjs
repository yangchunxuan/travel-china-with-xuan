import {OutboxMonitorError,boundedRequest,monitorConfig,requestLimits,sampleOutbox} from './health.mjs';

export function heartbeatUrl(raw) {
  let url;try{url=new URL(raw);}catch{throw new OutboxMonitorError('CONFIG_INVALID');}
  if(url.protocol!=='https:' || !['incidents.betterstack.com','uptime.betterstack.com'].includes(url.hostname)
    || url.username || url.password || url.port || url.search || url.hash
    || !/^\/api\/v1\/heartbeat\/[A-Za-z0-9_-]+\/?$/u.test(url.pathname))throw new OutboxMonitorError('CONFIG_INVALID');
  return url.href.replace(/\/$/u,'');
}
export async function runOutboxMonitor(env,{fetchImpl=globalThis.fetch,now=()=>new Date(),limits={}}={}) {
  // Both guards must be configured explicitly. The checked-in worker cannot
  // sample or report, even if somebody accidentally adds a Cron trigger.
  if(env?.OUTBOX_HEARTBEAT_REPORTER!=='cloudflare')throw new OutboxMonitorError('CONFIG_INVALID');
  const heartbeat=heartbeatUrl(env.OUTBOX_HEARTBEAT_URL);
  monitorConfig(env);requestLimits(limits);
  let failure, sample;
  try{sample=await sampleOutbox(env,{fetchImpl,now,limits});}
  catch(error){failure=error instanceof OutboxMonitorError ? error.code : 'INTERNAL_CHECK_FAILED';}
  // Exactly one emitter, at most two requests per scheduled invocation. A
  // delivery failure must not cause a second success/failure heartbeat.
  try{
    const response=await boundedRequest(heartbeat+(failure?'/fail':''),{method:'GET'},{fetchImpl,limits});
    if(response.status<200 || response.status>=300)throw new Error('delivery');
  }catch{throw new OutboxMonitorError('HEARTBEAT_FAILED');}
  return {ok:!failure,code:failure??'HEALTHY',checkedAt:sample?.checkedAt??now().toISOString()};
}
export default {
  fetch(){return new Response('Not found',{status:404,headers:{'Content-Type':'text/plain; charset=utf-8'}});},
  async scheduled(_event,env){
    let result;
    try{result=await runOutboxMonitor(env);}
    catch(error){result={ok:false,code:error instanceof OutboxMonitorError?error.code:'INTERNAL_CHECK_FAILED',checkedAt:new Date().toISOString()};}
    console.log(JSON.stringify({code:result.code,checkedAt:result.checkedAt}));
    if(!result.ok)throw new OutboxMonitorError(result.code);
  },
};
