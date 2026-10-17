import assert from 'node:assert/strict';
import { test } from 'node:test';
import { privateTourProducts, localizePrivateTourProduct } from '../../lib/privateTourProducts.ts';
import { germanTourCopies } from '../../lib/germanTourCopy.ts';
import { localizeGermanPrivateTourProduct } from '../../lib/localizeGermanPrivateTourProduct.ts';
import { germanContactEdition } from '../../lib/germanContactEdition.ts';
import { germanContactTourNames, germanContactPackageLabels } from '../../lib/germanContactNames.ts';
import { getPrivateTourLanguagePaths } from '../../lib/privateTourMetadata.ts';
import { getPrivateTourInquiryContext, getPrivateTourInquirySubmissionContext } from '../../lib/privateTourInquiryContext.ts';
import { validateAndNormalizeInquiry } from '../../lib/inquiryContract.ts';
import { currentPrivateTourQuoteFormVersion, privateTourQuoteSchemaVersion, travellerAckPrivacyNoticeVersion } from '../../lib/inquiryVersions.ts';

test('German covers every published structured product, without promoting previews', () => {
  assert.deepEqual(Object.keys(germanTourCopies).sort(), privateTourProducts.map(p=>p.slug).sort());
});

test('all German prices, currencies, party sizes, options, media and route days equal the English source', () => {
  for (const product of privateTourProducts) {
    const en=localizePrivateTourProduct(product,'en'), de=localizeGermanPrivateTourProduct(product);
    assert.equal(de.path,`/de/tours/${product.slug}/`);
    assert.equal(de.days,en.days); assert.equal(de.nights,en.nights);
    assert.equal(de.tourFormat,en.tourFormat); assert.equal(de.includesDomesticFlights,en.includesDomesticFlights);
    assert.deepEqual(de.servicePolicy,en.servicePolicy);
    assert.deepEqual(de.itinerary.map(d=>d.day),en.itinerary.map(d=>d.day));
    assert.deepEqual(de.gallery.map(i=>i.src),en.gallery.map(i=>i.src));
    assert.equal(de.heroImage.src,en.heroImage.src);
    assert.deepEqual(de.routeMedia.map(d=>[d.day,d.variants.map(v=>v.image.src)]),en.routeMedia.map(d=>[d.day,d.variants.map(v=>v.image.src)]));
    const contract=p=>p.packages.map(x=>({id:x.id,mode:x.guideMode,quoteOnly:x.quoteOnly,rows:x.rows.map(({formatted,...row})=>row)}));
    assert.deepEqual(contract(de),contract(en),product.slug);
    for(const row of de.packages.flatMap(p=>p.rows)) assert.ok(row.formatted.includes(row.currency),`${product.slug}: currency ${row.currency}`);
    for(const field of ['title','lede','summary','hotelNote','serviceNote','bookingNote']) assert.notEqual(de[field],en[field],`${product.slug}: untranslated ${field}`);
    de.itinerary.forEach((day,i)=>assert.notEqual(day.description,en.itinerary[i].description,`${product.slug}/day${i+1}`));
    assert.equal(de.faq?.length??0,en.faq?.length??0,`${product.slug}: FAQ coverage`);
    assert.equal(de.exclusions.length,en.exclusions.length,`${product.slug}: exclusion coverage`);
  }
});

test('German contact labels agree with the catalogue, including winter and no-guide options', () => {
  for (const product of privateTourProducts) {
    const de=localizeGermanPrivateTourProduct(product);
    assert.equal(germanContactTourNames[product.slug],de.title,product.slug);
    assert.equal(getPrivateTourLanguagePaths(product).de,de.path);
    for (const pkg of de.packages) {
      assert.equal(germanContactPackageLabels[`${product.slug}:${pkg.id}`],pkg.label);
      for (const row of pkg.rows) {
        const context=getPrivateTourInquiryContext(product.slug,'en',{packageId:pkg.id,travelers:row.travelers});
        assert.ok(context,`${product.slug}/${pkg.id}/${row.travelers}`);
        assert.equal(germanContactEdition.tourName(context),de.title);
        assert.equal(germanContactEdition.selectionLabel(context),`${pkg.label} · ${row.travelers} ${row.travelers === 1 ? 'Person' : 'Personen'}`);
        const message=germanContactEdition.messageText(context,undefined,{travelDate:'2027-04-03',note:'Deutschsprachige Reiseleitung, falls verfügbar'});
        assert.ok(message.includes(de.path)); assert.match(message,/Verfügbarkeit und Preis bitte bestätigen/);
      }
    }
  }
});

test('German quote requests preserve the accepted intake contract and make the source language explicit', () => {
  const config={allowedFormVersions:[currentPrivateTourQuoteFormVersion],allowedPrivacyNoticeVersions:[travellerAckPrivacyNoticeVersion]};
  for (const product of privateTourProducts) {
    const de=localizeGermanPrivateTourProduct(product), pkg=de.packages.find(p=>p.rows.length);
    if(!pkg) continue;
    const context=getPrivateTourInquiryContext(product.slug,'en',{packageId:pkg.id,travelers:pkg.rows[0].travelers});
    const marker=germanContactEdition.noteMarker(de.path);
    const result=validateAndNormalizeInquiry({locale:'en',contact:{channel:'email',email:'traveller@example.com'},privacyNoticeVersion:travellerAckPrivacyNoticeVersion,experiment:null,antiAbuse:{companyWebsite:''},schemaVersion:privateTourQuoteSchemaVersion,formVersion:currentPrivateTourQuoteFormVersion,entryPath:'private_tour_quote',productInterest:getPrivateTourInquirySubmissionContext(context,'en'),travelDate:'2027-04-03',note:`${marker}\n\nDeutschsprachige Reiseleitung, falls verfügbar.`,attribution:{landingPath:`/tours/${product.slug}/`}},config);
    assert.equal(result.ok,true,`${product.slug}: ${JSON.stringify(result.fieldErrors??{})}`);
    assert.match(result.value.note,/German page/);
  }
  assert.match(germanContactEdition.receipt.queued,/Englisch/);
  assert.doesNotMatch(germanContactEdition.receipt.queued,/français|französisch/);
});

test('German search metadata is present and product-specific', () => {
  const titles=new Set();
  for(const [slug,copy] of Object.entries(germanTourCopies)) {
    assert.ok(copy.metadataTitle.length>=15&&copy.metadataTitle.length<=90,`${slug}: title ${copy.metadataTitle.length}`);
    assert.ok(copy.metadataDescription.length>=70&&copy.metadataDescription.length<=220,`${slug}: description ${copy.metadataDescription.length}`);
    assert.equal(titles.has(copy.metadataTitle),false,`${slug}: duplicated title`); titles.add(copy.metadataTitle);
  }
});
