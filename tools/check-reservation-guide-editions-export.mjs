import {readFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {parse} from 'parse5';
import {reservationGuideEditionSlugs as slugs,reservationGuideEditionLocales as extra,reservationGuideEditionAlternates,reservationGuideEditionPath} from '../lib/reservationGuideEditionPaths.ts';
import {getGuideReservationOffers,localizedReservationFee} from '../lib/guideReservationOffers.ts';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,process.argv[2]??'out');
const failures=[],results=[];
const walk=(node,fn)=>{fn(node);for(const child of node.childNodes??[])walk(child,fn);};
const attr=(node,key)=>node?.attrs?.find(a=>a.name===key)?.value;
const txt=node=>node.nodeName==='#text'?node.value:(node.childNodes??[]).map(txt).join('');
const norm=text=>text.replace(/\s+/gu,' ').trim();
const find=(node,predicate)=>{const all=[];walk(node,n=>{if(predicate(n))all.push(n);});return all;};
const has=(node,key)=>attr(node,key)!==undefined;
const check=(condition,message)=>{if(!condition)failures.push(message);};
const sitemap=await readFile(resolve(out,'sitemap.xml'),'utf8');
for(const language of ['en','zh','ko',...extra])for(const slug of slugs){
 const path=language==='en'?`/guides/${slug}/`:extra.includes(language)?reservationGuideEditionPath(language,slug):`/${language}/guides/${slug}/`;
 const where=language+'/'+slug,html=await readFile(resolve(out,'.'+path,'index.html'),'utf8'),doc=parse(html);
 const nodes=find(doc,n=>!!n.tagName),main=nodes.find(n=>n.tagName==='main');
 const canonical=nodes.find(n=>n.tagName==='link'&&attr(n,'rel')==='canonical');
 check(attr(canonical,'href')==='https://homegroundchina.com'+path,where+': canonical');
 const alternatives=nodes.filter(n=>n.tagName==='link'&&attr(n,'rel')==='alternate'&&attr(n,'hreflang'));
 for(const [lang,target] of Object.entries(reservationGuideEditionAlternates(slug)))check(alternatives.some(n=>attr(n,'hreflang')===lang&&attr(n,'href')==='https://homegroundchina.com'+target),where+': hreflang '+lang);
 const mapEntry=sitemap.split('<url>').find(entry=>entry.includes('<loc>https://homegroundchina.com'+path+'</loc>'))??'';
 check(!!mapEntry,where+': sitemap');
 for(const [lang,target] of Object.entries(reservationGuideEditionAlternates(slug)))check(mapEntry.includes(`hreflang="${lang}" href="https://homegroundchina.com${target}"`),where+': sitemap alternate '+lang);
 check(nodes.filter(n=>n.tagName==='h1').length===1,where+': H1');
 const article=nodes.find(n=>has(n,'data-content-body'));check(!!article,where+': article');
 const source=extra.includes(language)?JSON.parse(await readFile(resolve(root,`lib/reservation-guide-editions/${language}/${slug}.json`),'utf8')).body:(await import(`../content/guides/${slug}/body.${language}.ts`)).default;
 const bodyText=norm(txt(article)).replace(/ \((?:英語|en anglais|en inglés|auf Englisch|بالإنجليزية)\)/gu,'');
 for(const block of source.blocks){
   if(['heading','figure','faq','internal-links','sources'].includes(block.type))check(nodes.some(n=>attr(n,'id')===block.id),where+': missing block '+block.id);
   if(block.type==='callout')check(nodes.some(n=>attr(n,'data-callout')===block.id),where+': missing callout '+block.id);
   if(block.type==='table')check(nodes.some(n=>attr(n,'data-table')===block.id),where+': missing table '+block.id);
   const verifyText=(value,key='')=>{if(typeof value==='string'){if(['text','body','title','caption','question','answer','heading','description','publisher','label'].includes(key))check(bodyText.includes(norm(value)),where+': missing text '+block.id+' '+key);}else if(Array.isArray(value))value.forEach(item=>verifyText(item,key));else if(value&&typeof value==='object')for(const [k,v]of Object.entries(value))verifyText(v,k);};
   verifyText(block);
 }
 const visibleFaqs=source.blocks.flatMap(b=>b.type==='faq'?b.items:[]);
 const schemas=nodes.filter(n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').flatMap(n=>{const data=JSON.parse(txt(n));return data['@graph']??[data];});
 const faq=schemas.find(n=>n['@type']==='FAQPage');
 check((faq?.mainEntity?.length??0)===visibleFaqs.length,where+': FAQ count');
 for(const item of visibleFaqs){check(faq?.mainEntity?.some(q=>q.name===item.question&&q.acceptedAnswer?.text===item.answer),where+': FAQ schema content');check(norm(txt(article)).includes(norm(item.question))&&norm(txt(article)).includes(norm(item.answer)),where+': visible FAQ content');}
 const offers=nodes.filter(n=>attr(n,'data-guide-reservation-offer')===slug);const expected=getGuideReservationOffers(slug,language);check(offers.length===expected.length,where+': offer count');
 for(const offer of expected){const node=offers.find(n=>norm(txt(n)).includes(norm(offer.title)));check(!!node,where+': localized offer title');if(node){check(norm(txt(node)).includes(norm(localizedReservationFee(language))),where+': offer fee');check(find(node,n=>n.tagName==='a').some(n=>attr(n,'href')===offer.href),where+': offer target');}}
 const booking=nodes.filter(n=>has(n,'data-guide-reservation-cta'));check(booking.length===(['forbidden-city-for-foreign-visitors','li-river-cruise-tickets-piers-booking'].includes(slug)?1:0),where+': primary booking card count');
 const productCards=nodes.filter(n=>has(n,'data-guide-tour-card'));
 check(productCards.length===1,where+': original tour card retained');
 check(nodes.filter(n=>has(n,'data-guide-service-cta')).length===(['forbidden-city-for-foreign-visitors','tianmen-mountain-tickets-and-routes'].includes(slug)?1:0),where+': original guide service card retained');
 if(extra.includes(language)){
   const original=parse(await readFile(resolve(out,`guides/${slug}/index.html`),'utf8'));
   const sourceCard=find(original,n=>has(n,'data-guide-tour-card'))[0];
   check(attr(productCards[0],'data-guide-tour-card')===attr(sourceCard,'data-guide-tour-card'),where+': unchanged product selection');
   const sourceHref=attr(find(sourceCard,n=>n.tagName==='a')[0],'href');
   check(attr(find(productCards[0],n=>n.tagName==='a')[0],'href')===`/${language}${sourceHref}`,where+': localized product path and exact parameters');
   check(attr(find(productCards[0],n=>n.tagName==='img')[0],'src')===attr(find(sourceCard,n=>n.tagName==='img')[0],'src'),where+': original product photograph');
 }
 for(const a of find(doc,n=>n.tagName==='a')){const href=attr(a,'href');if(href?.startsWith('/')&&!href.startsWith('//')){const target=href.split(/[?#]/)[0];if(!target.endsWith('/'))continue;try{await access(resolve(out,'.'+target,'index.html'));}catch{failures.push(where+': broken internal link '+href);}}}
 results.push({language,slug,path,faq:visibleFaqs.length,offers:offers.length});
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`Verified ${results.length} guide pages: complete bodies, reciprocal eight-language alternatives, sitemap, FAQ, localized offers and all internal links.`);
