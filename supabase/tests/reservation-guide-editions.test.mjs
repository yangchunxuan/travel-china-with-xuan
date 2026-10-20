import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {assertStructuredPageBody} from '../../lib/content-system/page-body.ts';
import {reservationGuideEditionSlugs as slugs,reservationGuideEditionLocales as languages,reservationGuideEditionAlternates,reservationGuideEditionPath} from '../../lib/reservationGuideEditionPaths.ts';
import {getGuideReservationOffers,getGuideReservationCtaWording,localizedReservationFee,localizedReservationHref,localizedReservationRule} from '../../lib/guideReservationOffers.ts';
import {getAttractionReservationRule,attractionReservationServiceFeeCny,formatAttractionReservationFee} from '../../lib/attractionReservations.ts';
import {formatAttractionReservationEditionMoney} from '../../lib/attractionReservationEditions.ts';

const readJson=async path=>JSON.parse(await readFile(new URL('../../'+path,import.meta.url),'utf8'));
const protectedKeys=new Set(['id','type','schemaVersion','href','url','reviewedAt','src','tone','legacyIds','rowLinks']);
function parity(source,translated,path='body',protectedField=false){
  assert.equal(Array.isArray(translated),Array.isArray(source),path);
  if(Array.isArray(source)){assert.equal(translated.length,source.length,path);source.forEach((v,i)=>parity(v,translated[i],`${path}[${i}]`,protectedField));}
  else if(source && typeof source==='object'){assert.deepEqual(Object.keys(translated).sort(),Object.keys(source).sort(),path);for(const [k,v] of Object.entries(source))parity(v,translated[k],`${path}.${k}`,protectedField||protectedKeys.has(k));}
  else if(typeof source!=='string'||protectedField)assert.equal(translated,source,path);
  else assert.ok(typeof translated==='string'&&translated.trim().length>0,path);
}
for(const slug of slugs){
  test(`${slug}: five complete translations preserve all blocks, facts containers, citations and original links`,async()=>{
    // 2026-10-20: the English body of a guide rewritten after its editions were
    // translated is frozen in fixtures; the editions still mirror that version
    // (owner: this batch rewrites English and Chinese only).
    const frozen=new URL(`./fixtures/reservation-guide-editions-en-source/${slug}.json`,import.meta.url);
    const source=existsSync(frozen)?JSON.parse(await readFile(frozen,'utf8')):(await import(`../../content/guides/${slug}/body.en.ts`)).default;
    const metadata=await readJson(`content/guides/${slug}/metadata.json`);
    for(const language of languages){
      const guide=await readJson(`lib/reservation-guide-editions/${language}/${slug}.json`);
      assert.equal(guide.slug,slug);assertStructuredPageBody(guide.body);parity(source,guide.body);
      for(const field of ['title','headline','description','navTitle','heroAlt']){assert.ok(guide[field]?.trim());assert.notEqual(guide[field],metadata.locales.en[field],`${language}/${slug}/${field}`);}
      for(const offer of getGuideReservationOffers(slug,language))assert.equal(guide.body.blocks.filter(block=>block.id===offer.afterBlockId).length,1);
    }
  });
}
test('all six language groups have eight exact equivalents, including the Spanish guias namespace',()=>{
 for(const slug of slugs){const paths=reservationGuideEditionAlternates(slug);assert.equal(Object.keys(paths).length,9);assert.equal(paths['x-default'],paths.en);for(const language of languages)assert.equal(paths[language],reservationGuideEditionPath(language,slug));assert.match(paths.es,/^\/es\/guias\//);}
 assert.deepEqual(reservationGuideEditionAlternates('an-untranslated-guide'),{});
});
test('localized fees are the existing service prices and preselected targets stay in the same language',()=>{
 for(const language of ['en','zh','ko',...languages]){
   const expected=['en','zh','ko'].includes(language)?formatAttractionReservationFee(attractionReservationServiceFeeCny,language):formatAttractionReservationEditionMoney(attractionReservationServiceFeeCny,language);
   assert.equal(localizedReservationFee(language),expected);
   for(const slug of slugs){for(const offer of getGuideReservationOffers(slug,language)){
     assert.equal(offer.fee,expected);assert.ok(offer.examplesLabel);assert.ok(!Object.values(offer).some(v=>typeof v==='string'&&/undefined|\{days\}|\{release\}/.test(v)));
     for(const example of offer.examples){assert.equal(getAttractionReservationRule(example.attractionId)?.status,'offered');assert.equal(example.href,localizedReservationHref(language,example.attractionId));}
   }}
   for(const [slug,id] of [['forbidden-city-for-foreign-visitors','forbidden-city'],['li-river-cruise-tickets-piers-booking','li-river-cruise']]){
     const rule=getAttractionReservationRule(id);const copy=getGuideReservationCtaWording(slug,language,rule);assert.ok(copy?.body);assert.doesNotMatch(copy.body,/undefined|\{days\}|\{release\}/);
     if(language!=='en'&&id==='forbidden-city')assert.ok(copy.body.includes(localizedReservationRule(rule,language).release));
   }
 }
});
test('only the three original locales invoke their inquiry dialog handlers; other edition links retain normal navigation',async()=>{
 const source=await readFile(new URL('../../components/GuideCtaLink.tsx',import.meta.url),'utf8');
 assert.match(source,/if \(locale === "en" \|\| locale === "zh" \|\| locale === "ko"\)/);
 assert.match(source,/trackEvent\("guide_cta_clicked"/);assert.match(source,/page_language: locale/);
});
