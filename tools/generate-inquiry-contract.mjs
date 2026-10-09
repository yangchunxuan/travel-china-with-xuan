import {createHash} from 'node:crypto';
import {mkdir,readFile,realpath,rename,rm,stat,writeFile} from 'node:fs/promises';
import {join,resolve,sep} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const siteOrigin = 'https://homegroundchina.com';
const endpoint = 'https://xbymvlxethfzqcgyoieb.supabase.co/functions/v1/v1-inquiries';
const destinationVersion = '2026-07-21.1';
const homepageVersion = '2026-07-26.1';
const privacyVersion = '2026-09-28.1';
const defaultOutput = fileURLToPath(new URL('../out/',import.meta.url));
class ManifestError extends Error {}
const fail = code => {throw new ManifestError(code);};

function scriptsFromHtml(html) {
  const paths = new Set();
  const tags = /<(?:script|link)\b/giu;
  const attribute = (tag,name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`,'iu'))?.[1];
  let match;
  while ((match = tags.exec(html))) {
    const end = html.indexOf('>',tags.lastIndex),nested = html.indexOf('<',tags.lastIndex);
    if (end < 0 || end-match.index > 4096 || nested >= 0 && nested < end) fail('SCRIPT_MANIFEST_INVALID');
    const tag = html.slice(match.index,end+1);tags.lastIndex=end+1;
    const src = /^<script\b/iu.test(tag) ? attribute(tag,'src')
      : (attribute(tag,'as') === 'script' || attribute(tag,'rel') === 'modulepreload') ? attribute(tag,'href') : null;
    if (!src || !src.includes('/_next/static/')) continue;
    let url;
    try {url=new URL(src,siteOrigin);} catch {fail('SCRIPT_MANIFEST_INVALID');}
    if (url.origin !== siteOrigin || url.username || url.password || url.search || url.hash
        || !url.pathname.startsWith('/_next/static/') || !url.pathname.endsWith('.js') || url.pathname.includes('%')) fail('SCRIPT_MANIFEST_INVALID');
    paths.add(url.pathname);
    if (paths.size > 42) fail('SCRIPT_LIMIT_EXCEEDED');
  }
  if (!paths.size) fail('SCRIPT_MANIFEST_INVALID');
  return [...paths].sort();
}

async function exportedText(root,pathname,maximum) {
  const path=join(root,pathname.replace(/^\//u,''));
  try {
    const canonical=await realpath(path);
    if (!canonical.startsWith(root+sep)) fail('EXPORT_PATH_INVALID');
    const info=await stat(canonical);
    if (!info.isFile()) fail('EXPORT_FILE_MISSING');
    if (info.size > maximum) fail('EXPORT_SIZE_EXCEEDED');
    const buffer=await readFile(canonical);
    if (buffer.length > maximum) fail('EXPORT_SIZE_EXCEEDED');
    return {text:buffer.toString('utf8'),bytes:buffer.length};
  } catch(error) {if(error instanceof ManifestError)throw error;fail('EXPORT_FILE_MISSING');}
}

function inspectScript(text,found) {
  found.destination ||= text.includes(destinationVersion);
  found.homepage ||= text.includes(homepageVersion);
  found.privacy ||= text.includes(privacyVersion);
  found.endpoint ||= text.includes(endpoint);
  const suffix='.supabase.co/functions/v1/v1-inquiries';
  let index,cursor=0;
  while((index=text.indexOf(suffix,cursor)) >= 0) {
    cursor=index+suffix.length;
    const start=text.lastIndexOf('https://',index),following=text[cursor];
    if(start < 0 || index-start > 100 || text.slice(start,cursor) !== endpoint
        || following && !/["'`\s,;)}\]\\]/u.test(following)) fail('WRONG_PUBLISHED_ENDPOINT');
  }
}

export async function generateInquiryContract({outputDir=defaultOutput,env=process.env} = {}) {
  const output=resolve(outputDir),file=join(output,'inquiry-contract.json'),temporary=file+'.tmp';
  // A failed or disabled build must never leave an earlier healthy contract.
  await rm(file,{force:true});await rm(temporary,{force:true});
  const enabled=env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_ENABLED === 'true' || env.NEXT_PUBLIC_HOMEGROUND_HOMEPAGE_EMAIL_ENABLED === 'true';
  let manifest;
  if(!enabled) {
    manifest={schemaVersion:1,enabled:false,reason:'inquiry_not_configured'};
  } else {
    if(env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL && env.NEXT_PUBLIC_HOMEGROUND_INQUIRY_API_URL !== endpoint) fail('WRONG_CONFIGURED_ENDPOINT');
    let root;
    try{root=await realpath(output);}catch{fail('EXPORT_DIRECTORY_MISSING');}
    const homepage=await exportedText(root,'/index.html',524288);
    const scripts=scriptsFromHtml(homepage.text),found={};
    let total=homepage.bytes;
    for(const path of scripts) {
      const item=await exportedText(root,path,1048576);total+=item.bytes;
      if(total > 8388608)fail('EXPORT_SIZE_EXCEEDED');
      inspectScript(item.text,found);
    }
    if(!found.endpoint)fail('MISSING_PUBLISHED_ENDPOINT');
    if(!found.destination || !found.homepage)fail('MISSING_PUBLISHED_CONTRACT');
    manifest={schemaVersion:1,enabled:true,siteOrigin,endpoint,destinationVersion,homepageVersion,
      updatedPrivacy:found.privacy === true,scripts,
      buildFingerprint:createHash('sha256').update(scripts.join('\n')).digest('hex')};
  }
  const serialized=JSON.stringify(manifest)+'\n';
  if(Buffer.byteLength(serialized) > 16384)fail('MANIFEST_SIZE_EXCEEDED');
  await mkdir(output,{recursive:true});
  try{await writeFile(temporary,serialized);await rename(temporary,file);}
  catch{await rm(temporary,{force:true});fail('MANIFEST_WRITE_FAILED');}
  return manifest;
}

if(process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const manifest=await generateInquiryContract();
    console.log(JSON.stringify({code:manifest.enabled ? 'INQUIRY_CONTRACT_GENERATED' : 'INQUIRY_CONTRACT_DISABLED',scriptCount:manifest.scripts?.length ?? 0}));
  } catch(error) {
    console.error(JSON.stringify({code:error instanceof ManifestError ? error.message : 'INQUIRY_CONTRACT_GENERATION_FAILED'}));
    process.exitCode=1;
  }
}
