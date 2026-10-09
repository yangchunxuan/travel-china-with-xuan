export const SITE_ORIGIN = 'https://homegroundchina.com';
export const MANIFEST_PATH = '/inquiry-contract.json';
export const INQUIRY_ENDPOINT = 'https://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/v1-inquiries';
const destinationVersion = '2026-07-21.1';
const homepageVersion = '2026-07-26.1';
const updatedPrivacy = '2026-09-28.1';
const defaults = Object.freeze({maxRequests:9,maxScripts:42,htmlBytes:524288,manifestBytes:16384,totalBytes:655360,responseBytes:16384,timeoutMs:8000});
const codes = new Set(['HEALTHY','HEARTBEAT_NOT_CONFIGURED','HEARTBEAT_DESTINATION_INVALID','HEARTBEAT_FAILED','LIMITS_INVALID','NETWORK_FAILURE','REQUEST_TIMEOUT','REDIRECT_BLOCKED','SUBREQUEST_BUDGET_EXCEEDED','BODY_LIMIT_EXCEEDED','SITE_RESPONSE_INVALID','SCRIPT_MANIFEST_INVALID','SCRIPT_LIMIT_EXCEEDED','MANIFEST_RESPONSE_INVALID','MANIFEST_CONTRACT_INVALID','MANIFEST_BUILD_MISMATCH','MISSING_PUBLISHED_CONTRACT','WRONG_PUBLISHED_ENDPOINT','PROBE_RESPONSE_INVALID','CONTRACT_REJECTED','UNSAFE_REJECTION','INTERNAL_CHECK_FAILED']);

export class CanaryError extends Error {
  constructor(code, completedChecks = 0) {
    super(codes.has(code) ? code : 'INTERNAL_CHECK_FAILED');
    this.code = this.message;
    this.completedChecks = Number.isInteger(completedChecks) && completedChecks >= 0 && completedChecks <= 6 ? completedChecks : 0;
  }
}

export function heartbeatUrl(raw) {
  if (typeof raw !== 'string' || !raw) throw new CanaryError('HEARTBEAT_NOT_CONFIGURED');
  let url;
  try { url = new URL(raw); } catch { throw new CanaryError('HEARTBEAT_DESTINATION_INVALID'); }
  if (url.protocol !== 'https:' || !['incidents.betterstack.com','uptime.betterstack.com'].includes(url.hostname)
      || url.username || url.password || url.port || url.search || url.hash
      || !/^\/api\/v1\/heartbeat\/[A-Za-z0-9_-]+\/?$/u.test(url.pathname)) throw new CanaryError('HEARTBEAT_DESTINATION_INVALID');
  url.pathname = url.pathname.replace(/\/$/u,'');
  return url.href;
}

export function probePayload(surface, locale, newPrivacy) {
  const destination = surface === 'destination';
  const version = destination ? destinationVersion : homepageVersion;
  return {
    schemaVersion: destination ? 2 : 3,
    formVersion: version,
    privacyNoticeVersion: newPrivacy ? updatedPrivacy : version,
    entryPath: destination ? 'destination_timing' : 'homepage_email',
    locale,
    attribution: {landingPath: locale === 'en' ? '/' : `/${locale}/`,
      ...(destination ? {utmSource:'canary',utmMedium:'scheduled_probe',utmCampaign:'utm-contract'} : {})},
    experiment: null,
  };
}

function scriptManifest(html, maximum) {
  const scripts = new Set();
  const attribute = (tag,name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`,'iu'))?.[1];
  const tagStart = /<(?:script|link)\b/giu;
  let match;
  while ((match = tagStart.exec(html))) {
    const end = html.indexOf('>',tagStart.lastIndex);
    const nested = html.indexOf('<',tagStart.lastIndex);
    if (end < 0 || end-match.index > 4096 || nested >= 0 && nested < end) throw new CanaryError('SCRIPT_MANIFEST_INVALID');
    const tag = html.slice(match.index,end+1);
    tagStart.lastIndex = end+1;
    const src = /^<script\b/iu.test(tag) ? attribute(tag,'src')
      : (attribute(tag,'as') === 'script' || attribute(tag,'rel') === 'modulepreload') ? attribute(tag,'href') : null;
    if (!src || !src.includes('/_next/static/')) continue;
    let url;
    try { url = new URL(src,SITE_ORIGIN); } catch { throw new CanaryError('SCRIPT_MANIFEST_INVALID'); }
    if (url.origin !== SITE_ORIGIN || url.username || url.password || url.search || url.hash
        || !url.pathname.startsWith('/_next/static/') || !url.pathname.endsWith('.js')) throw new CanaryError('SCRIPT_MANIFEST_INVALID');
    scripts.add(url.pathname);
    if (scripts.size > maximum) throw new CanaryError('SCRIPT_LIMIT_EXCEEDED');
  }
  if (!scripts.size) throw new CanaryError('SCRIPT_MANIFEST_INVALID');
  return scripts;
}

function verifyManifest(manifest, scripts) {
  if (!manifest || manifest.enabled === false || manifest.schemaVersion !== 1 || manifest.siteOrigin !== SITE_ORIGIN
      || manifest.destinationVersion !== destinationVersion || manifest.homepageVersion !== homepageVersion
      || typeof manifest.updatedPrivacy !== 'boolean') throw new CanaryError('MANIFEST_CONTRACT_INVALID');
  if (manifest.endpoint !== INQUIRY_ENDPOINT) throw new CanaryError('WRONG_PUBLISHED_ENDPOINT');
  const expected = [...scripts].sort();
  if (!Array.isArray(manifest.scripts) || manifest.scripts.length !== expected.length
      || manifest.scripts.some((path,index) => path !== expected[index])) throw new CanaryError('MANIFEST_BUILD_MISMATCH');
  return manifest.updatedPrivacy;
}

export async function runIntakeCanary(env, {fetchImpl = globalThis.fetch, now = () => new Date(), uuid = () => crypto.randomUUID(), limits = {}} = {}) {
  // Validate the private destination BEFORE any production request.
  const heartbeat = heartbeatUrl(env?.INTAKE_HEARTBEAT_URL);
  const bounds = {...defaults,...limits};
  if (Object.keys(bounds).some(key => !(key in defaults) || !Number.isInteger(bounds[key]) || bounds[key] < 1 || bounds[key] > defaults[key])) throw new CanaryError('LIMITS_INVALID');
  let requests = 0, totalBytes = 0, completedChecks = 0;
  const timestamp = () => now().toISOString();
  async function request(url, init = {}, heartbeatRequest = false) {
    if (requests >= bounds.maxRequests - (heartbeatRequest ? 0 : 1)) throw new CanaryError('SUBREQUEST_BUDGET_EXCEEDED');
    requests++;
    const controller = new AbortController();
    let timer;
    try {
      const timeout = new Promise((_,reject) => {timer = setTimeout(() => {controller.abort();reject(new CanaryError('REQUEST_TIMEOUT'));},bounds.timeoutMs);});
      // workerd accepts manual/follow; reject 3xx ourselves without following it.
      const response = await Promise.race([fetchImpl(url,{...init,redirect:'manual',signal:controller.signal}),timeout]);
      if (response.redirected || response.status >= 300 && response.status < 400) throw new CanaryError('REDIRECT_BLOCKED');
      return response;
    } catch (error) {
      throw error instanceof CanaryError ? error : new CanaryError(controller.signal.aborted ? 'REQUEST_TIMEOUT' : 'NETWORK_FAILURE');
    } finally { clearTimeout(timer); }
  }
  async function consume(response, maximum) {
    const reader = response.body?.getReader();
    if (!reader) throw new CanaryError('BODY_LIMIT_EXCEEDED');
    const decoder = new TextDecoder();
    let bytes = 0;
    let timer;
    const parts = [];
    try {
      const timeout = new Promise((_,reject) => {timer = setTimeout(() => {
        reject(new CanaryError('REQUEST_TIMEOUT'));
        reader.cancel().catch(()=>{});
      },bounds.timeoutMs);});
      while (true) {
        const item = await Promise.race([reader.read(),timeout]);
        if (item.done) break;
        bytes += item.value.byteLength; totalBytes += item.value.byteLength;
        if (bytes > maximum || totalBytes > bounds.totalBytes) throw new CanaryError('BODY_LIMIT_EXCEEDED');
        const text = decoder.decode(item.value,{stream:true});
        parts.push(text);
      }
      const last = decoder.decode();
      parts.push(last);
      return parts.join('');
    } catch (error) {throw error instanceof CanaryError ? error : new CanaryError('NETWORK_FAILURE');}
    finally {clearTimeout(timer);await reader.cancel().catch(()=>{});}
  }
  async function sendHeartbeat(outcome) {
    try {
      const response = await request(heartbeat+(outcome === 'failure' ? '/fail' : ''),{method:'GET'},true);
      if (!response.ok) throw new CanaryError('HEARTBEAT_FAILED');
      await response.body?.cancel();
    } catch {throw new CanaryError('HEARTBEAT_FAILED',completedChecks);}
  }
  let failure;
  try {
    const headers = {'Cache-Control':'no-cache',Pragma:'no-cache'};
    const homepage = await request(SITE_ORIGIN+'/',{headers});
    if (homepage.status !== 200 || !/^text\/html\b/iu.test(homepage.headers.get('content-type') ?? '')) throw new CanaryError('SITE_RESPONSE_INVALID');
    const html = await consume(homepage,bounds.htmlBytes);
    // Full JavaScript inspection happens during the build. Bind the small public
    // result to this homepage's exact script set before using its contract.
    const scripts = scriptManifest(html,bounds.maxScripts);
    const response = await request(SITE_ORIGIN+MANIFEST_PATH,{headers});
    if (response.status !== 200 || !/^application\/json\b/iu.test(response.headers.get('content-type') ?? '')) throw new CanaryError('MANIFEST_RESPONSE_INVALID');
    let manifest;
    try { manifest = JSON.parse(await consume(response,bounds.manifestBytes)); }
    catch (error) { throw error instanceof CanaryError ? error : new CanaryError('MANIFEST_CONTRACT_INVALID'); }
    const newPrivacy = verifyManifest(manifest,scripts);
    for (const surface of ['destination','homepage-email']) for (const locale of ['en','zh','ko']) {
      // No contact, antiAbuse, journey or email fields: validation must precede persistence.
      const response = await request(INQUIRY_ENDPOINT,{method:'POST',headers:{Origin:SITE_ORIGIN,'Content-Type':'application/json','idempotency-key':uuid()},body:JSON.stringify(probePayload(surface,locale,newPrivacy))});
      if (response.status !== 422) throw new CanaryError('UNSAFE_REJECTION');
      let result;
      try {result = JSON.parse(await consume(response,bounds.responseBytes));} catch (error) {throw error instanceof CanaryError ? error : new CanaryError('PROBE_RESPONSE_INVALID');}
      const error = result?.error, fields = error?.fieldErrors;
      if (error?.code !== 'validation_failed' || error?.persistenceState !== 'not_persisted' || !fields || typeof fields !== 'object' || Array.isArray(fields)) throw new CanaryError('UNSAFE_REJECTION');
      const expectedFields = surface === 'destination' ? ['contact','antiAbuse','journey'] : ['contact','antiAbuse'];
      if (Object.keys(fields).some(key => !expectedFields.includes(key))) throw new CanaryError('CONTRACT_REJECTED');
      if (fields.contact !== 'required' || fields.antiAbuse !== 'required'
          || (surface === 'destination' ? fields.journey !== 'required' : fields.journey != null)) throw new CanaryError('UNSAFE_REJECTION');
      completedChecks++;
    }
  } catch (error) {failure = error instanceof CanaryError ? error.code : 'INTERNAL_CHECK_FAILED';}
  // No second heartbeat after delivery failure: never turn that failure green.
  await sendHeartbeat(failure ? 'failure' : 'success');
  return {ok:!failure,code:failure ?? 'HEALTHY',checkedAt:timestamp(),completedChecks};
}

export default {
  fetch() {return new Response('Not found',{status:404,headers:{'Content-Type':'text/plain; charset=utf-8'}});},
  async scheduled(_event,env) {
    try {
      const result = await runIntakeCanary(env);
      console.log(JSON.stringify({code:result.code,checkedAt:result.checkedAt,completedChecks:result.completedChecks}));
      if (!result.ok) throw new CanaryError(result.code,result.completedChecks);
    } catch (error) {
      const safe = error instanceof CanaryError ? error : new CanaryError('INTERNAL_CHECK_FAILED');
      if (safe.code === 'HEARTBEAT_FAILED' || safe.code === 'HEARTBEAT_NOT_CONFIGURED' || safe.code === 'HEARTBEAT_DESTINATION_INVALID' || safe.code === 'LIMITS_INVALID') console.log(JSON.stringify({code:safe.code,checkedAt:new Date().toISOString(),completedChecks:safe.completedChecks}));
      throw safe;
    }
  },
};
