export const OUTBOX_HEALTH_URL = 'https://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/inquiry-health';
export const MAX_SAMPLE_AGE_MS = 120_000;
const countKeys = ['pending','processing','failed','overduePending','expiredProcessing','createdLast10Minutes','createdLast1Hour','createdLast24Hours'];
const codes = new Set(['HEALTHY','CONFIG_INVALID','LIMITS_INVALID','NETWORK_FAILURE','REQUEST_TIMEOUT','REDIRECT_BLOCKED','BODY_LIMIT_EXCEEDED','RESPONSE_INVALID','SAMPLE_TIME_INVALID','SAMPLE_STALE','OUTBOX_UNHEALTHY','HEARTBEAT_FAILED','INTERNAL_CHECK_FAILED']);

export class OutboxMonitorError extends Error {
  constructor(code) { super(codes.has(code) ? code : 'INTERNAL_CHECK_FAILED'); this.code = this.message; }
}
export function isoTime(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u.test(value)) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && new Date(parsed).toISOString().replace('.000Z','Z') === value.replace('.000Z','Z') ? parsed : null;
}
export function validateSampleTime(checkedAt, nowMs, maximumAge = MAX_SAMPLE_AGE_MS) {
  const sampled = isoTime(checkedAt);
  if (sampled === null || !Number.isFinite(nowMs) || sampled > nowMs) throw new OutboxMonitorError('SAMPLE_TIME_INVALID');
  if (nowMs - sampled > maximumAge) throw new OutboxMonitorError('SAMPLE_STALE');
  return sampled;
}
function exactKeys(value, keys) {
  return value && typeof value === 'object' && !Array.isArray(value)
    && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value,key));
}
const count = value => Number.isSafeInteger(value) && value >= 0;
export function validateHealth(body, nowMs) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new OutboxMonitorError('RESPONSE_INVALID');
  validateSampleTime(body.checkedAt,nowMs);
  if (!exactKeys(body.counts,countKeys) || !countKeys.every(key=>count(body.counts[key]))) throw new OutboxMonitorError('RESPONSE_INVALID');
  const c = body.counts;
  if (c.overduePending > c.pending || c.expiredProcessing > c.processing
    || c.createdLast10Minutes > c.createdLast1Hour || c.createdLast1Hour > c.createdLast24Hours) throw new OutboxMonitorError('RESPONSE_INVALID');
  const ack = body.travellerAck;
  let ackHealthy = false;
  if (exactKeys(ack,['status']) && ack.status === 'disabled') ackHealthy = true;
  else if (exactKeys(ack,['status','pending','failed','bounced','complained','overdue','intentCapacityReached'])) {
    if (!['pending','failed','bounced','complained','overdue'].every(key=>count(ack[key])) || typeof ack.intentCapacityReached !== 'boolean') throw new OutboxMonitorError('RESPONSE_INVALID');
    ackHealthy = ack.status === 'healthy' && ack.failed === 0 && ack.bounced === 0 && ack.complained === 0 && ack.overdue === 0 && !ack.intentCapacityReached;
  }
  // The endpoint also applies its configured volume thresholds. Never infer
  // health from zero failed jobs while ignoring its overall or receipt status.
  if (body.ok !== true || body.status !== 'healthy' || c.failed !== 0 || c.overduePending !== 0 || c.expiredProcessing !== 0 || !ackHealthy) throw new OutboxMonitorError('OUTBOX_UNHEALTHY');
  return {checkedAt:body.checkedAt};
}
export function monitorConfig(env) {
  if (env?.OUTBOX_HEALTH_URL !== OUTBOX_HEALTH_URL || typeof env.OUTBOX_MONITOR_SECRET !== 'string'
    || env.OUTBOX_MONITOR_SECRET.length < 32 || env.OUTBOX_MONITOR_SECRET.length > 512 || /[\r\n]/u.test(env.OUTBOX_MONITOR_SECRET)) throw new OutboxMonitorError('CONFIG_INVALID');
}
export function requestLimits(limits = {}) {
  const defaults = {timeoutMs:8000,bodyBytes:16384};
  if (Object.keys(limits).some(key=>!(key in defaults) || !Number.isInteger(limits[key]) || limits[key] < 1 || limits[key] > defaults[key])) throw new OutboxMonitorError('LIMITS_INVALID');
  return {...defaults,...limits};
}
// One deadline covers both response headers and streamed body. No retries or
// redirected requests can expand the request budget or expose the monitor key.
export async function boundedRequest(url, init, {fetchImpl=globalThis.fetch, limits={}, readBody=false}={}) {
  const bounds = requestLimits(limits), controller = new AbortController();
  let timer, reader;
  const timeout = new Promise((_,reject)=>{timer=setTimeout(()=>{
    controller.abort(); reader?.cancel().catch(()=>{}); reject(new OutboxMonitorError('REQUEST_TIMEOUT'));
  },bounds.timeoutMs);});
  try {
    return await Promise.race([(async()=>{
      const response = await fetchImpl(url,{...init,redirect:'manual',signal:controller.signal});
      if (response.redirected || response.status >= 300 && response.status < 400) { response.body?.cancel().catch(()=>{}); throw new OutboxMonitorError('REDIRECT_BLOCKED'); }
      if (!readBody) {response.body?.cancel().catch(()=>{});return {status:response.status};}
      if (response.status !== 200 || !/^application\/json\b/iu.test(response.headers.get('content-type') ?? '')) {response.body?.cancel().catch(()=>{});throw new OutboxMonitorError('RESPONSE_INVALID');}
      const length = response.headers.get('content-length');
      if (length !== null && (!/^\d+$/u.test(length) || Number(length) > bounds.bodyBytes)) {response.body?.cancel().catch(()=>{});throw new OutboxMonitorError('BODY_LIMIT_EXCEEDED');}
      reader = response.body?.getReader();
      if (!reader) throw new OutboxMonitorError('RESPONSE_INVALID');
      let bytes=0;const parts=[],decoder=new TextDecoder();
      while (true) {
        const item=await reader.read();if(item.done)break;
        bytes+=item.value.byteLength;if(bytes>bounds.bodyBytes)throw new OutboxMonitorError('BODY_LIMIT_EXCEEDED');
        parts.push(decoder.decode(item.value,{stream:true}));
      }
      parts.push(decoder.decode());
      let body;try{body=JSON.parse(parts.join(''));}catch{throw new OutboxMonitorError('RESPONSE_INVALID');}
      return {status:response.status,body};
    })(),timeout]);
  } catch(error) {throw error instanceof OutboxMonitorError ? error : new OutboxMonitorError(controller.signal.aborted ? 'REQUEST_TIMEOUT' : 'NETWORK_FAILURE');}
  finally {clearTimeout(timer);reader?.cancel().catch(()=>{});}
}
export async function sampleOutbox(env,{fetchImpl=globalThis.fetch,now=()=>new Date(),limits={}}={}) {
  monitorConfig(env);
  const response=await boundedRequest(OUTBOX_HEALTH_URL,{method:'GET',headers:{'x-monitor-secret':env.OUTBOX_MONITOR_SECRET,'Cache-Control':'no-cache',Pragma:'no-cache'}},{fetchImpl,limits,readBody:true});
  return validateHealth(response.body,now().getTime());
}
