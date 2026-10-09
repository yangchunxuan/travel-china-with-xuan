import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtemp,mkdir,readFile,rm,symlink,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import test from 'node:test';
import {generateInquiryContract} from '../../tools/generate-inquiry-contract.mjs';
import worker,{INQUIRY_ENDPOINT,SITE_ORIGIN,runIntakeCanary} from '../../ops/inquiry-canary/worker.mjs';

const enabled={NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED:'true',NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL:INQUIRY_ENDPOINT};
const versions=['2026-07-21.1','2026-07-26.1'];
const body=(privacy=false,url=INQUIRY_ENDPOINT)=>JSON.stringify([url,...versions,'2099-01-01.1',...(privacy ? ['2026-09-28.1'] : [])]);
async function fixture(t,{privacy=false,scriptBody=body(privacy),html}={}) {
  const directory=await mkdtemp(join(tmpdir(),'inquiry-contract-'));
  t.after(()=>rm(directory,{recursive:true,force:true}));
  const paths=['/_next/static/chunks/app/z.js','/_next/static/chunks/a.js'];
  for(const [index,path] of paths.entries()){
    const file=join(directory,path.slice(1));await mkdir(dirname(file),{recursive:true});await writeFile(file,index ? 'export const other=1;' : scriptBody);
  }
  const page=html ?? `<script src="${paths[0]}"></script><script src="${SITE_ORIGIN}${paths[1]}"></script><link rel="preload" as="script" href="${paths[0]}">`;
  await writeFile(join(directory,'index.html'),page);
  return {directory,paths,page,file:join(directory,'inquiry-contract.json')};
}
async function stale(f){await writeFile(f.file,'{"enabled":true,"stale":true}');}
async function absent(file){await assert.rejects(readFile(file),{code:'ENOENT'});}

test('final export scripts produce sorted, deduplicated contracts with evidenced privacy',async t=>{
  for(const privacy of [false,true])await t.test(String(privacy),async t=>{
    const f=await fixture(t,{privacy});const manifest=await generateInquiryContract({outputDir:f.directory,env:enabled});
    assert.equal(manifest.enabled,true);assert.equal(manifest.endpoint,INQUIRY_ENDPOINT);assert.equal(manifest.siteOrigin,SITE_ORIGIN);
    assert.deepEqual(manifest.scripts,[...f.paths].sort());assert.equal(manifest.updatedPrivacy,privacy);
    assert.equal(manifest.destinationVersion,versions[0]);assert.equal(manifest.homepageVersion,versions[1]);
    assert.equal(manifest.buildFingerprint,createHash('sha256').update(manifest.scripts.join('\n')).digest('hex'));
    assert.deepEqual(JSON.parse(await readFile(f.file,'utf8')),manifest);
    assert.ok((await readFile(f.file)).length < 16384);
  });
});

test('all listed scripts must exist even after the first supplies every contract',async t=>{
  const f=await fixture(t);await stale(f);await rm(join(f.directory,f.paths[1].slice(1)));
  await assert.rejects(generateInquiryContract({outputDir:f.directory,env:enabled}),{message:'EXPORT_FILE_MISSING'});await absent(f.file);
});

test('wrong endpoint, missing versions and HTML-only evidence fail without stale health',async t=>{
  for(const scriptBody of [body(false,'https://wrong.supabase.co/functions/v1/v1-inquiries'),body(false,INQUIRY_ENDPOINT+'/wrong'),JSON.stringify([INQUIRY_ENDPOINT,versions[0]]),'export const empty=1;'])await t.test(scriptBody,async t=>{
    const f=await fixture(t,{scriptBody});await stale(f);
    await assert.rejects(generateInquiryContract({outputDir:f.directory,env:enabled}));await absent(f.file);
  });
  const f=await fixture(t,{scriptBody:'export const empty=1;',html:`${body(true)}<script src="/_next/static/chunks/app/z.js"></script>`});
  await assert.rejects(generateInquiryContract({outputDir:f.directory,env:enabled}),{message:'MISSING_PUBLISHED_ENDPOINT'});
});

test('an enabled homepage surface is strict even if the other surface is disabled',async t=>{
  const f=await fixture(t);await stale(f);
  await assert.rejects(generateInquiryContract({outputDir:f.directory,env:{NEXT_PUBLIC_HOMEGROUND_HOMEPAGE_EMAIL_ENABLED:'true',NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL:'https://wrong.invalid/api'}}),{message:'WRONG_CONFIGURED_ENDPOINT'});await absent(f.file);
});

test('ordinary unconfigured builds replace previous health with an explicit disabled manifest',async t=>{
  const f=await fixture(t);await stale(f);await writeFile(f.file+'.tmp','stale temporary');
  const manifest=await generateInquiryContract({outputDir:f.directory,env:{}});
  assert.deepEqual(manifest,{schemaVersion:1,enabled:false,reason:'inquiry_not_configured'});
  for(const key of ['endpoint','destinationVersion','homepageVersion','scripts'])assert.equal(Object.hasOwn(manifest,key),false);
  await absent(f.file+'.tmp');
});

test('script origins, malformed tags, count and filesystem boundaries are rejected',async t=>{
  for(const html of ['<script src="https://foreign.invalid/_next/static/chunks/a.js"></script>','<script src="/_next/static/chunks/a.js?x=1"></script>','<script src="/_next/static/chunks/a.js" <broken>','<script '+ 'x'.repeat(4100)+'>',Array.from({length:43},(_,i)=>`<script src="/_next/static/chunks/${i}.js"></script>`).join('')])await t.test(html.slice(0,60),async t=>{
    const f=await fixture(t,{html});await assert.rejects(generateInquiryContract({outputDir:f.directory,env:enabled}));await absent(f.file);
  });
  const f=await fixture(t);const outside=await mkdtemp(join(tmpdir(),'outside-contract-'));t.after(()=>rm(outside,{recursive:true,force:true}));
  await writeFile(join(outside,'synthetic.js'),body());const target=join(f.directory,f.paths[0].slice(1));await rm(target);await symlink(join(outside,'synthetic.js'),target);
  await assert.rejects(generateInquiryContract({outputDir:f.directory,env:enabled}),{message:'EXPORT_PATH_INVALID'});
});

test('generated manifest drives six safe probes and rejects either direction of script mismatch',async t=>{
  const f=await fixture(t,{privacy:true});const manifest=await generateInquiryContract({outputDir:f.directory,env:enabled});
  const heartbeat='https://uptime.betterstack.com/api/v1/heartbeat/fixture';
  async function monitor(value,page=f.page){const calls=[];const result=await runIntakeCanary({INTAKE_HEARTBEAT_URL:heartbeat},{fetchImpl:async(url,init={})=>{
    calls.push({url,body:init.body});
    if(url===SITE_ORIGIN+'/')return new Response(page,{headers:{'Content-Type':'text/html'}});
    if(url===SITE_ORIGIN+'/inquiry-contract.json')return new Response(JSON.stringify(value),{headers:{'Content-Type':'application/json'}});
    if(url===INQUIRY_ENDPOINT){const body=JSON.parse(init.body);for(const key of ['contact','antiAbuse','journey','email'])assert.equal(Object.hasOwn(body,key),false);return new Response(JSON.stringify({error:{code:'validation_failed',persistenceState:'not_persisted',fieldErrors:{contact:'required',antiAbuse:'required',...(body.entryPath==='destination_timing'?{journey:'required'}:{})}}}),{status:422});}
    if(url===heartbeat||url===heartbeat+'/fail')return new Response('');throw new Error('fixture blocked network');
  }});return {result,calls};}
  const healthy=await monitor(manifest);assert.equal(healthy.result.ok,true);assert.equal(healthy.result.completedChecks,6);assert.equal(healthy.calls.length,9);
  for(const scripts of [manifest.scripts.slice(1),[...manifest.scripts,'/_next/static/chunks/extra.js'].sort()]){const f=await monitor({...manifest,scripts});assert.equal(f.result.code,'MANIFEST_BUILD_MISMATCH');assert.equal(f.calls.length,3);assert.equal(f.calls.at(-1).url,heartbeat+'/fail');}
  const disabled=await monitor({schemaVersion:1,enabled:false,reason:'inquiry_not_configured'});assert.equal(disabled.result.ok,false);assert.equal(disabled.calls.length,3);
  assert.equal((await worker.fetch(new Request('https://fixture.invalid'))).status,404);
});

test('postbuild generates the contract after all existing final-export checks',async()=>{
  const {scripts}=JSON.parse(await readFile(new URL('../../package.json',import.meta.url),'utf8'));
  assert.ok(scripts.postbuild.endsWith(' && node tools/generate-inquiry-contract.mjs'));
  assert.ok(scripts.postbuild.includes('npm run check:private-car-export'));
});
