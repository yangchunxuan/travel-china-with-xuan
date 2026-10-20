import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
import {parse} from 'parse5';
const out=path.resolve('out'),origin='https://homegroundchina.com',errors=[];
const check=(condition,message)=>{if(!condition)errors.push(message);};
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):entry.name==='index.html'?[path.join(dir,entry.name)]:[]);
function elements(node,tag){return [...(node.tagName===tag?[node]:[]),...(node.childNodes??[]).flatMap(child=>elements(child,tag))];}
const attr=(node,name)=>node?.attrs?.find(a=>a.name===name)?.value;
function text(node){return node?.value??(node?.childNodes??[]).map(text).join('');}
function visibleText(node){return ['script','style'].includes(node?.tagName)?'':node?.value??(node?.childNodes??[]).map(visibleText).join(' ');}
function fileFor(url){return path.join(out,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');}
const pages=walk(path.join(out,'es')),cache=new Map();
function docFor(file){if(!cache.has(file))cache.set(file,parse(readFileSync(file,'utf8')));return cache.get(file);}
function jsonLd(doc){return elements(doc,'script').filter(n=>attr(n,'type')==='application/ld+json').flatMap(n=>{const data=JSON.parse(text(n));return data['@graph']??[data];});}
function priceRows(doc){return jsonLd(doc).filter(n=>n['@type']==='TouristTrip').flatMap(n=>n.offers?.offers??[]).map(n=>[n.price,n.priceCurrency,n.eligibleQuantity?.value??null,n.priceSpecification?.referenceQuantity?.value??null]);}
check(pages.length===96,`Expected 57 tours, 10 core pages, 8 existing guides, 6 full guide translations, 4 service details, 3 corporate pages, the author page, the entry-requirements hub, the sights and inspiration hubs, 3 tour collections and the company page; found ${pages.length} pages`);
const sitemap=readFileSync(path.join(out,'sitemap.xml'),'utf8');
let links=0,images=0,reciprocal=0,schemas=0,offers=0,faqs=0;
for(const file of pages){
 const route='/'+path.relative(out,path.dirname(file)).replaceAll('\\','/')+'/',doc=docFor(file),copy=visibleText(doc);
 check(attr(elements(doc,'html')[0],'lang')==='es',`${route}: html language`);
 check(elements(doc,'h1').length===1,`${route}: one h1`);
 check(text(elements(doc,'title')[0]).includes('Homeground China'),`${route}: branded title`);
 const metas=elements(doc,'meta'),headLinks=elements(doc,'link');
 check(metas.some(n=>attr(n,'name')==='description'&&attr(n,'content')?.length>50),`${route}: description`);
 // The company page is a draft, as in English: noindex and out of the sitemap until the owner approves it.
 const draft=route==='/es/company/';
 check(metas.some(n=>attr(n,'name')==='robots'&&attr(n,'content')?.includes('noindex'))===draft,`${route}: ${draft?'noindex draft':'indexable'}`);
 check(attr(headLinks.find(n=>attr(n,'rel')==='canonical'),'href')===origin+route,`${route}: canonical`);
 check(sitemap.includes(`<loc>${origin}${route}</loc>`)===!draft,`${route}: sitemap`);
 for(const node of headLinks.filter(n=>attr(n,'hreflang')&&attr(n,'hreflang')!=='es')){
  const url=new URL(attr(node,'href'),origin),target=fileFor(url);
  check(existsSync(target),`${route}: missing alternate ${url.pathname}`);if(!existsSync(target))continue;
  const back=elements(docFor(target),'link').find(n=>attr(n,'hreflang')==='es');
  check(attr(back,'href')===origin+route,`${route}: reciprocal ${url.pathname}`);reciprocal++;
 }
 for(const node of elements(doc,'a')){
  const href=attr(node,'href');if(!href)continue;
  const url=new URL(href,origin);if(url.origin!==origin)continue;
  check(existsSync(fileFor(url)),`${route}: broken link ${href}`);links++;
 }
 for(const node of elements(doc,'img')){
  const src=attr(node,'src');if(!src)continue;
  const url=new URL(src,origin);if(url.origin!==origin)continue;
  check(existsSync(fileFor(url)),`${route}: missing image ${src}`);
  check(attr(node,'alt')!==undefined,`${route}: image alt`);images++;
 }
 const data=jsonLd(doc);schemas+=data.length;
 for(const faq of data.filter(n=>n['@type']==='FAQPage').flatMap(n=>n.mainEntity??[])){
  const normalize=s=>String(s).replace(/\s+/g,' ').trim();
  check(normalize(copy).includes(normalize(faq.name)),`${route}: FAQ question not visible: ${faq.name}`);
  check(normalize(copy).includes(normalize(faq.acceptedAnswer?.text)),`${route}: FAQ answer not visible: ${faq.name}`);faqs++;
 }
 if(route.startsWith('/es/tours/')&&route!=='/es/tours/'){
  check(/guía[^.]{0,80}español|español[^.]{0,80}guía/iu.test(copy)&&/suplemento/iu.test(copy),`${route}: Spanish-guide supplement`);
  const sourceFile=fileFor(new URL(route.replace(/^\/es\//,'/'),origin));
  check(existsSync(sourceFile),`${route}: missing source product`);
  if(existsSync(sourceFile)){
   const actual=priceRows(doc),expected=priceRows(docFor(sourceFile));
   check(JSON.stringify(actual)===JSON.stringify(expected),`${route}: price, currency, group size or per-person basis differs from source`);offers+=actual.length;
  }
 }
}
assert.deepEqual(errors,[],errors.join('\n'));
console.log(`Spanish export: ${pages.length} pages; ${links} links; ${images} images; ${reciprocal} reciprocal alternates; ${schemas} schema entities; ${offers} source-matched offers; ${faqs} visible FAQ answers.`);
