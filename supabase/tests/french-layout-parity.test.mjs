import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import { getFrenchTourCatalog } from '../../lib/frenchTourCatalog.ts';
import { getPublishedPrivateTourCatalog } from '../../lib/publishedPrivateTourCatalog.ts';
import { getPrivateTourFacets } from '../../lib/privateTourCatalogFacets.ts';
import { formatPrivateTourPrice } from '../../lib/privateTourProducts.ts';
import { privateTourCurrencyNote } from '../../lib/privateTourCurrencyNote.ts';
import * as frenchSite from '../../lib/frenchSite.ts';

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
 './privateTourProducts':{formatPrivateTourPrice},'./privateTourCurrencyNote':{privateTourCurrencyNote},
});
const halfDay=await load('lib/terracottaHalfDayTour.ts');
const legacyContactCopy=await load('lib/frenchLegacyContactCopy.ts');
const legacy=await load('lib/frenchLegacyTours.ts',{'../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json':pricing,'./privateTourProducts':{formatPrivateTourPrice},'./zhangjiajiePrivateTourPreview':original,'./terracottaHalfDayTour':halfDay,'./frenchLegacyContactCopy':legacyContactCopy});
const classic=await load('lib/frenchLegacyPresentation.ts',{'./zhangjiajiePrivateTourPreview':original,'./frenchLegacyTours':legacy,'./frenchSite':frenchSite});
const hub=await load('components/FrenchToursHubPage.tsx',{'./PrivateToursHubPage':{PrivateToursHubPage:()=>null},'./FrenchChrome':{FrenchSiteHeader:()=>null,FrenchSiteFooter:()=>null},'../lib/frenchTourCatalog':{getFrenchTourCatalog},'../lib/publishedPrivateTourCatalog':{getPublishedPrivateTourCatalog},'../lib/privateTourCatalogFacets':{getPrivateTourFacets},'../lib/frenchSite':frenchSite,'../lib/frenchLegacyTours':legacy});
const normal=value=>JSON.parse(JSON.stringify(value));

test('French original-layout hub includes all 57 routes without changing source price entries',async()=>{
 const en=getPublishedPrivateTourCatalog('en'),fr=hub.getFrenchPublishedTourCatalog();
 assert.equal(fr.length,en.length+1);assert.equal(fr.length,57);
 assert.equal(new Set(fr.map(p=>p.slug)).size,57);
 for(const product of en){
  const translated=fr.find(p=>p.slug===product.slug);assert.ok(translated);
  assert.equal(translated.href,`/fr${product.href}`);
  assert.equal(translated.startingPriceHref,`/fr${product.startingPriceHref}`);
  const terms=p=>p.startingPrice?{amount:p.startingPrice.amount,cny:p.startingPrice.cny,currency:p.startingPrice.currency,travelers:p.startingPrice.travelers,selection:p.startingPrice.selection}:null;
  assert.deepEqual(normal(terms(translated)),normal(terms(product)),product.slug);
  assert.equal(translated.twoTravellerPrice?.amount,product.twoTravellerPrice?.amount);
  assert.equal(translated.twoTravellerPrice?.currency,product.twoTravellerPrice?.currency);
  assert.match(translated.guideLanguage,/francophone.*supplément/);
 }
 const half=fr.find(p=>p.slug===halfDay.terracottaHalfDaySlug);assert.equal(half.startingPrice,null);assert.equal(half.days,0.5);
 await access(new URL(`../../public${half.image.src}`,import.meta.url));
 const edition=hub.FrenchToursHubPage().props.edition;
 assert.equal(edition.facets.items.length,57);
 assert.equal(edition.facets.regions.reduce((n,o)=>n+o.count,0),57);
 assert.equal(edition.facets.lengths.reduce((n,o)=>n+o.count,0),57);
 assert.equal(edition.facets.prices.reduce((n,o)=>n+o.count,0),57);
 assert.equal(edition.originalImageSlugs.includes(half.slug),true);
 assert.match(edition.arrivalPlanning.links[0].href,/^\/guides\//);
});

test('French classic uses the original dated price window, all room tiers and source accommodation photos',()=>{
 const en=original.getZhangjiajiePrivateTourPublicPricing('en'),fr=classic.frenchClassicPricing();
 assert.equal(fr.validFrom,en.validFrom);assert.equal(fr.validUntil,en.validUntil);
 for(let i=0;i<en.tiers.length;i++){
  for(const key of ['id','fromPrice','price','sixPersonPrice','regularPrice','featured'])assert.equal(fr.tiers[i][key],en.tiers[i][key]);
  assert.match(fr.tiers[i].formattedPrice,/USD/);
 }
 assert.match(fr.guideLanguageNote,/jours 2 et 3/);assert.match(fr.guideLanguageNote,/francophone.*supplément/);
 assert.equal(classic.frenchClassicCopy.daySummaries.length,original.productPreviewCopy.en.daySummaries.length);
 assert.deepEqual(normal(classic.frenchClassicCopy.accommodationOptions.map(s=>s.images.map(i=>i.src))),normal(original.productPreviewCopy.en.accommodationOptions.map(s=>s.images.map(i=>i.src))));
 assert.equal(classic.frenchZhangjiajieComparison.rows.length,6);
 assert.match(classic.frenchZhangjiajieComparison.boundary,/francophone.*supplément/);
});
