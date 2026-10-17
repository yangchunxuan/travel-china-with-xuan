import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
const locales=['en','zh','ko','ja','es','fr','de','ar'];
const source=JSON.parse(await readFile('lib/corporateTravelLocales/en.json','utf8'));
const root=path.resolve('out');
const hub=locale=>`${locale==='en'?'':`/${locale}`}/corporate-travel/`;
const route=(locale,slug)=>hub(locale)+(slug?`${slug}/`:'');
function all(n,p,r=[]){if(p(n))r.push(n);for(const c of n.childNodes??[])all(c,p,r);return r;}
const attr=(n,k)=>n?.attrs?.find(a=>a.name===k)?.value??'';
function text(n){return n?.nodeName==='#text'?n.value:(n?.childNodes??[]).map(text).join('');}
function visible(n){if(['script','style','template','noscript'].includes(n?.tagName)||(n?.attrs??[]).some(a=>a.name==='hidden'||a.name==='aria-hidden'&&a.value==='true'))return '';return n?.nodeName==='#text'?n.value:(n?.childNodes??[]).map(visible).join('');}
const norm=s=>s.replace(/\s+/gu,' ').trim();
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8'),llms=await readFile(path.join(root,'llms.txt'),'utf8');
let faqCount=0;
for(const locale of locales){
 const copy=JSON.parse(await readFile(`lib/corporateTravelLocales/${locale}.json`,'utf8'));
 for(const slug of [undefined,...source.trips.map(t=>t.slug)]){
  const current=route(locale,slug),url=`https://homegroundchina.com${current}`;
  const html=await readFile(path.join(root,current,'index.html'),'utf8'),doc=parse(html),els=all(doc,n=>Boolean(n.tagName));
  const trip=copy.trips.find(t=>t.slug===slug),faqs=trip?.faqs??copy.hub.faqs;
  assert.equal(attr(els.find(n=>n.tagName==='html'),'lang'),locale==='zh'?'zh-Hans':locale);
  if(locale==='ar')assert.equal(attr(els.find(n=>n.tagName==='html'),'dir'),'rtl');
  assert.equal(attr(els.find(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'),'href'),url);
  const h1=els.filter(n=>n.tagName==='h1');assert.equal(h1.length,1);assert.equal(norm(text(h1[0])),trip?.title??copy.hub.title);
  const alternatives=els.filter(n=>n.tagName==='link'&&attr(n,'hreflang'));assert.equal(alternatives.length,9);
  for(const other of locales){const lang=other==='zh'?'zh-Hans':other;assert.equal(attr(alternatives.find(n=>attr(n,'hreflang')===lang),'href'),`https://homegroundchina.com${route(other,slug)}`);}
  assert.equal(attr(alternatives.find(n=>attr(n,'hreflang')==='x-default'),'href'),`https://homegroundchina.com${route('en',slug)}`);
  const headers=els.filter(n=>n.tagName==='header'&&attr(n,'data-homeground-header-locale'));
  assert.ok(headers.length>=1,`${current}: shared site header`);
  for(const header of headers)for(const other of locales){
   const language=other==='zh'?'zh-Hans':other;
   const choices=all(header,n=>n.tagName==='a'&&attr(n,'lang')===language&&attr(n,'hreflang')===language);
   assert.ok(choices.length>=2,`${current}: desktop and mobile ${language} choices`);
   for(const choice of choices)assert.equal(attr(choice,'href'),route(other,slug),`${current}: language choice must keep the same corporate page`);
  }
  const main=els.find(n=>n.tagName==='main'),mainText=norm(visible(main));
  assert.ok(mainText.includes(copy.ui['Prepare my enquiry']));assert.ok(mainText.includes(copy.ui['Photo credits']));
  assert.equal(els.filter(n=>attr(n,'id')==='corporate-enquiry').length,1);
  for(const name of ['company','people','timing','purpose','itinerary'])assert.ok(els.some(n=>attr(n,'name')===name));
  if(!slug)for(const purpose of source.hub.purposes)assert.ok(els.some(n=>attr(n,'id')===purpose.id));
  else for(let day=1;day<=4;day++)assert.ok(els.some(n=>attr(n,'id')===`day-${day}`));
  const graphs=els.filter(n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').map(n=>JSON.parse(text(n)));
  const graph=graphs.find(g=>g['@graph']?.some(n=>n['@id']===`${url}#webpage`));assert.ok(graph);
  assert.equal(graph['@graph'].find(n=>n['@id']===`${url}#webpage`).inLanguage,locale==='zh'?'zh-Hans':locale);
  assert.ok(graph['@graph'].some(n=>n['@type']==='Service'));assert.ok(!JSON.stringify(graph).includes('"offers"'),'no invented corporate price offers');
  const faq=graph['@graph'].find(n=>n['@type']==='FAQPage');assert.equal(faq.mainEntity.length,faqs.length);
  for(const [i,item]of faq.mainEntity.entries()){assert.equal(item.name,faqs[i].question);assert.equal(item.acceptedAnswer.text,faqs[i].answer);assert.ok(mainText.includes(norm(item.name)),`${current}: visible FAQ question`);assert.ok(mainText.includes(norm(item.acceptedAnswer.text)),`${current}: visible FAQ answer`);faqCount++;}
  if(locale!=='en')for(const english of Object.keys(source.ui).filter(s=>s.length>60))assert.ok(!mainText.includes(norm(english)),`${current}: untranslated paragraph ${english.slice(0,55)}`);
  for(const image of els.filter(n=>n.tagName==='img'&&attr(n,'src').startsWith('/'))){await access(path.join(root,decodeURIComponent(attr(image,'src').split('?')[0])));for(const candidate of attr(image,'srcset').split(',').filter(Boolean)){const src=candidate.trim().split(/\s+/)[0];if(src.startsWith('/'))await access(path.join(root,decodeURIComponent(src.split('?')[0])));}}
  for(const link of els.filter(n=>n.tagName==='a')){const href=attr(link,'href');if(!href.startsWith('/')||href.startsWith('//')||href.startsWith('/_next'))continue;const pathname=new URL(href,'https://homegroundchina.com').pathname;if(/\.[a-z0-9]{2,5}$/i.test(pathname))continue;await access(path.join(root,decodeURIComponent(pathname),'index.html'));}
  assert.equal(sitemap.split(`<loc>${url}</loc>`).length-1,1,`${current}: one sitemap entry`);assert.ok(llms.includes(`](${url})`));
  console.log(`PASS ${current}: localized body, reciprocal alternates, FAQ, enquiry fields, media and links`);
 }
}
console.log(`PASS all 24 corporate pages and ${faqCount} visible FAQ/schema answers`);
