import nodeAssert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
import {parse} from 'parse5';
const out=path.resolve('out'), origin='https://homegroundchina.com';
const errors=[];
const assert=new Proxy(nodeAssert,{get(target,key){const value=target[key];return typeof value==='function'?(...args)=>{try{return value(...args);}catch(error){errors.push(error.message);}}:value;}});
function walk(dir) {return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):e.name==='index.html'?[path.join(dir,e.name)]:[]);}
function elements(node,tag) {return [...(node.tagName===tag?[node]:[]),...(node.childNodes??[]).flatMap(n=>elements(n,tag))];}
function attr(node,name) {return node?.attrs?.find(a=>a.name===name)?.value;}
function text(node) {return node.value??(node.childNodes??[]).map(text).join('');}
function fileFor(url) {return path.join(out,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');}
const pages=walk(path.join(out,'ar')), cache=new Map();
const docFor=file=>{if(!cache.has(file))cache.set(file,parse(readFileSync(file,'utf8')));return cache.get(file);};
assert.equal(pages.length,85,'57 tours, 10 core pages, 4 service details, 3 corporate pages, 6 full guide translations, the author page, 3 tour collections and the company page must export');
const sitemap=readFileSync(path.join(out,'sitemap.xml'),'utf8');
let links=0,images=0,reciprocal=0,schemas=0,faqs=0;
const normalize=s=>s.replace(/\s+/g,' ').trim();
function faqItems(value) { if(!value||typeof value!=='object') return []; if(Array.isArray(value)) return value.flatMap(faqItems); return [...(value['@type']==='FAQPage' ? value.mainEntity??[] : []),...Object.values(value).flatMap(faqItems)]; }
for(const file of pages) {
 const route='/'+path.relative(out,path.dirname(file)).replaceAll('\\','/')+'/', doc=docFor(file);
 assert.equal(attr(elements(doc,'html')[0],'lang'),'ar',route);
 assert.equal(attr(elements(doc,'html')[0],'dir'),'rtl',`${route}: RTL direction`);
 // Evan's profile is headed by his name, written in Latin script as on the Arabic studio page; everything under it is Arabic.
 if(route==='/ar/studio/evan/'){
  assert.equal(normalize(text(elements(doc,'h1')[0])),'Evan',`${route}: name h1`);
  const headings=elements(doc,'main').flatMap(n=>elements(n,'h2'));
  assert.ok(headings.length===3&&headings.every(n=>/\p{Script=Arabic}/u.test(text(n))),`${route}: Arabic h2`);
  assert.match(text(elements(doc,'title')[0]),/\p{Script=Arabic}/u,`${route}: Arabic title`);
 } else assert.match(text(elements(doc,'h1')[0]),/\p{Script=Arabic}/u,`${route}: Arabic h1`);
 assert.doesNotMatch(elements(doc,'main').map(text).join(' '),/Deutschsprachige|deutschsprachige|Reiseleitung|Privatreise|Seitennavigation|Eingetragenes Unternehmen/u,`${route}: no leftover German copy`);
 assert.equal(elements(doc,'h1').length,1,`${route}: one h1`);
 assert.ok(text(elements(doc,'title')[0]).includes('Homeground China'),`${route}: title`);
 const metas=elements(doc,'meta');
 assert.ok(metas.some(n=>attr(n,'name')==='description'&&attr(n,'content')?.length>50),`${route}: description`);
 // The company page is a draft, as in English: noindex and out of the sitemap until the owner approves it.
 const draft=route==='/ar/company/';
 assert.equal(metas.some(n=>attr(n,'name')==='robots'&&attr(n,'content')?.includes('noindex')),draft,`${route}: ${draft?'noindex draft':'indexable'}`);
 const headLinks=elements(doc,'link');
 assert.equal(attr(headLinks.find(n=>attr(n,'rel')==='canonical'),'href'),origin+route,`${route}: canonical`);
 assert.equal(sitemap.includes(`<loc>${origin}${route}</loc>`),!draft,`${route}: sitemap`);
 for(const n of headLinks.filter(n=>attr(n,'hreflang')&&attr(n,'hreflang')!=='ar')) {
  const url=new URL(attr(n,'href'),origin), target=fileFor(url);assert.ok(existsSync(target),`${route}: alternate ${url.pathname}`);
  const back=elements(docFor(target),'link').find(l=>attr(l,'hreflang')==='ar');
  assert.equal(attr(back,'href'),origin+route,`${route}: reciprocal ${url.pathname}`);reciprocal++;
 }
 for(const n of elements(doc,'a')) {
  const href=attr(n,'href');if(!href)continue;const url=new URL(href,origin);if(url.origin!==origin)continue;
  assert.ok(existsSync(fileFor(url)),`${route}: broken link ${href}`);links++;
 }
 for(const n of elements(doc,'img')) {
  const src=attr(n,'src');if(!src)continue;const url=new URL(src,origin);if(url.origin!==origin)continue;
  assert.ok(existsSync(fileFor(url)),`${route}: missing image ${src}`);assert.ok(attr(n,'alt')!==undefined,`${route}: missing alt ${src}`);images++;
 }
 for(const n of elements(doc,'script').filter(n=>attr(n,'type')==='application/ld+json')) {
  const schema=JSON.parse(text(n));schemas++;
  const visible=normalize(elements(doc,'main').map(text).join(' '));
  for(const item of faqItems(schema)){
   assert.ok(visible.includes(normalize(item.name)),`${route}: FAQ question must be visible`);
   assert.ok(visible.includes(normalize(item.acceptedAnswer?.text??'')),`${route}: FAQ answer must be visible`);faqs++;
  }
 }
 if(route.startsWith('/ar/tours/')) assert.ok(text(doc).includes('الإرشاد بالعربية')||text(doc).includes('الإرشاد باللغة العربية'),`${route}: guide-language conditions`);
}
nodeAssert.deepEqual(errors,[],errors.join('\n'));
console.log(`Arabic export: ${pages.length} pages, ${links} internal links, ${images} images, ${reciprocal} reciprocal language links and ${schemas} JSON-LD blocks and ${faqs} visible FAQ answers checked.`);
