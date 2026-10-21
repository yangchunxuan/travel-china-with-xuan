import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import { getGermanTourCatalog } from '../../lib/germanTourCatalog.ts';
import { getPublishedPrivateTourCatalog } from '../../lib/publishedPrivateTourCatalog.ts';
import { getPrivateTourFacets } from '../../lib/privateTourCatalogFacets.ts';
import { formatPrivateTourPrice } from '../../lib/privateTourProducts.ts';
import { privateTourCurrencyNote } from '../../lib/privateTourCurrencyNote.ts';
import { zhangjiajieFourDayCny } from '../../lib/zhangjiajieFourDayPrice.ts';
import * as germanSite from '../../lib/germanSite.ts';
import { germanFirstSentence } from '../../lib/germanFirstSentence.ts';

import { buildPrivateTourDetailHref } from '../../lib/privateTourInquiryContext.ts';
import { getHomepagePrivateTourItems } from '../../lib/homepagePrivateTourCatalog.ts';
import * as editionReplyPromiseModule from '../../lib/editionReplyPromise.ts';
const require=createRequire(import.meta.url);
const source=path=>readFile(new URL(`../../${path}`,import.meta.url),'utf8');
async function load(path,dependencies={}){
 const code=ts.transpileModule(await source(path),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
 const module={exports:{}};
 vm.runInNewContext(code,{module,exports:module.exports,require(id){if(id==='react/jsx-runtime')return require(id);assert.ok(id in dependencies,`Unexpected dependency ${id}`);return dependencies[id];}},{filename:path});
 return module.exports;
}
const pricing=JSON.parse(await source('content/product-previews/zhangjiajie-4-day-private-tour/pricing.json'));
const original=await load('lib/zhangjiajiePrivateTourPreview.ts',{
 '../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json':pricing,
 '../content/product-previews/zhangjiajie-4-day-private-tour/product.json':JSON.parse(await source('content/product-previews/zhangjiajie-4-day-private-tour/product.json')),
 './privateTourProducts':{formatPrivateTourPrice},'./privateTourCurrencyNote':{privateTourCurrencyNote}, './zhangjiajieFourDayPrice': { zhangjiajieFourDayCny },
});
const halfDay=await load('lib/terracottaHalfDayTour.ts');
const legacyContactCopy=await load('lib/germanLegacyContactCopy.ts');
const legacy=await load('lib/germanLegacyTours.ts',{'./editionReplyPromise.ts':editionReplyPromiseModule,'../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json':pricing,'./privateTourProducts':{formatPrivateTourPrice},'./zhangjiajiePrivateTourPreview':original,'./terracottaHalfDayTour':halfDay,'./germanLegacyContactCopy':legacyContactCopy});
const classic=await load('lib/germanLegacyPresentation.ts',{'./editionReplyPromise.ts':editionReplyPromiseModule,'./zhangjiajiePrivateTourPreview':original,'./germanLegacyTours':legacy,'./germanSite':germanSite});
const hub=await load('components/GermanToursHubPage.tsx',{'../lib/germanFirstSentence':{germanFirstSentence},'./PrivateToursHubPage':{PrivateToursHubPage:()=>null},'./GermanChrome':{GermanSiteHeader:()=>null,GermanSiteFooter:()=>null},'../lib/germanTourCatalog':{getGermanTourCatalog},'../lib/publishedPrivateTourCatalog':{getPublishedPrivateTourCatalog},'../lib/privateTourCatalogFacets':{getPrivateTourFacets},'../lib/germanSite':germanSite,'../lib/germanLegacyTours':legacy,'../lib/privateTourInquiryContext':{buildPrivateTourDetailHref}});
const normal=value=>JSON.parse(JSON.stringify(value));

test('German original-layout hub includes all 58 routes without changing source price entries',async()=>{
 const en=getPublishedPrivateTourCatalog('en'),fr=hub.getGermanPublishedTourCatalog();
 assert.equal(fr.length,en.length+1);assert.equal(fr.length,58);
 assert.equal(new Set(fr.map(p=>p.slug)).size,58);
 for(const product of en){
  const translated=fr.find(p=>p.slug===product.slug);assert.ok(translated);
  assert.equal(translated.href,`/de${product.href}`);
  assert.equal(translated.startingPriceHref,product.startingPrice?.selection&&!product.twoTravellerPrice ? buildPrivateTourDetailHref(translated.href,product.slug,product.startingPrice.selection) : `/de${product.startingPriceHref}`);
  const terms=p=>p.startingPrice?{amount:p.startingPrice.amount,cny:p.startingPrice.cny,currency:p.startingPrice.currency,travelers:p.startingPrice.travelers,selection:p.startingPrice.selection}:null;
  assert.deepEqual(normal(terms(translated)),normal(terms(product)),product.slug);
  assert.equal(translated.twoTravellerPrice?.amount,product.twoTravellerPrice?.amount);
  assert.equal(translated.twoTravellerPrice?.currency,product.twoTravellerPrice?.currency);
  assert.match(translated.guideLanguage,/[Dd]eutschsprachige Reiseleitung.*nicht.*enthalten/);
 }
 const half=fr.find(p=>p.slug===halfDay.terracottaHalfDaySlug);assert.equal(half.startingPrice,null);assert.equal(half.days,0.5);
 await access(new URL(`../../public${half.image.src}`,import.meta.url));
 const edition=hub.GermanToursHubPage().props.edition;
 assert.equal(edition.facets.items.length,58);
 assert.equal(edition.facets.regions.reduce((n,o)=>n+o.count,0),58);
 assert.equal(edition.facets.lengths.reduce((n,o)=>n+o.count,0),58);
 assert.equal(edition.facets.prices.reduce((n,o)=>n+o.count,0),58);
 assert.equal(edition.originalImageSlugs.includes(half.slug),true);
 assert.equal(edition.arrivalPlanning.links[0].href,'/de/guides/china-entry-requirements/');
});

test('German classic uses the original dated price window, all room tiers and source accommodation photos',()=>{
 const en=original.getZhangjiajiePrivateTourPublicPricing('en'),fr=classic.germanClassicPricing();
 assert.equal(fr.validFrom,en.validFrom);assert.equal(fr.validUntil,en.validUntil);
 for(let i=0;i<en.tiers.length;i++){
  for(const key of ['id','fromPrice','price','sixPersonPrice','regularPrice','featured'])assert.equal(fr.tiers[i][key],en.tiers[i][key]);
  assert.match(fr.tiers[i].formattedPrice,/USD/);
 }
 assert.match(fr.guideLanguageNote,/Tag 2 und 3/);assert.match(fr.guideLanguageNote,/[Dd]eutschsprachige Reiseleitung.*nicht.*enthalten/);
 assert.equal(classic.germanClassicCopy.daySummaries.length,original.productPreviewCopy.en.daySummaries.length);
 assert.deepEqual(normal(classic.germanClassicCopy.accommodationOptions.map(s=>s.images.map(i=>i.src))),normal(original.productPreviewCopy.en.accommodationOptions.map(s=>s.images.map(i=>i.src))));
 assert.equal(classic.germanZhangjiajieComparison.rows.length,6);
 assert.match(classic.germanZhangjiajieComparison.boundary,/[Dd]eutschsprachige Reiseleitung.*nicht.*enthalten/);
});

const homepage=await load('lib/germanHomepageEditorial.ts',{'./homepagePrivateTourCatalog':{getHomepagePrivateTourItems},'./homepageEditorial':{getHomepageGuideChapters:()=>{throw new Error('not used in price test')}},'./germanTourCatalog':{getGermanTourCatalog},'./privateTourInquiryContext':{buildPrivateTourDetailHref}});
test('German single-price cards preserve amounts and open the displayed party size, while couple and quote-only entries stay unchanged',()=>{
const source=getHomepagePrivateTourItems('en'),translated=homepage.getGermanHomepageProducts();
for(const item of translated){
 const original=source.find(p=>p.id===item.id);assert.deepEqual(item.startingPrice?.selection,original.startingPrice?.selection);
 assert.equal(item.startingPrice?.travelers,original.startingPrice?.travelers);
 const expected=item.startingPrice?.selection&&!item.twoTravellerPrice ? buildPrivateTourDetailHref(`/de/tours/${item.id}/`,item.id,item.startingPrice.selection) : `/de${original.href}`;
 assert.equal(item.href,expected);
}
const main=translated.find(p=>p.id==='beijing-xian-chengdu-guilin-shanghai-13-day-private-tour');
assert.equal(new URL(main.href,'https://homegroundchina.com').searchParams.get('travelers'),'8');
});
