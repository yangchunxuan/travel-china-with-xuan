import assert from 'node:assert/strict';
import { test } from 'node:test';
import { privateTourProducts, localizePrivateTourProduct } from '../../lib/privateTourProducts.ts';
import { frenchTourCopies } from '../../lib/frenchTourCopy.ts';
import { localizeFrenchPrivateTourProduct } from '../../lib/localizeFrenchPrivateTourProduct.ts';
import { frenchContactEdition } from '../../lib/frenchContactEdition.ts';
import { frenchContactTourNames, frenchContactPackageLabels } from '../../lib/frenchContactNames.ts';
import { getPrivateTourLanguagePaths } from '../../lib/privateTourMetadata.ts';
import { getPrivateTourInquiryContext, getPrivateTourInquirySubmissionContext } from '../../lib/privateTourInquiryContext.ts';
import { validateAndNormalizeInquiry } from '../../lib/inquiryContract.ts';
import { currentPrivateTourQuoteFormVersion, privateTourQuoteSchemaVersion, travellerAckPrivacyNoticeVersion } from '../../lib/inquiryVersions.ts';

test('French covers every published structured product, without promoting previews', () => {
  assert.deepEqual(Object.keys(frenchTourCopies).sort(), privateTourProducts.map(p=>p.slug).sort());
});

test('all French prices, currencies, party sizes, options, media and route days equal the English source', () => {
  for (const product of privateTourProducts) {
    const en=localizePrivateTourProduct(product,'en'), fr=localizeFrenchPrivateTourProduct(product);
    assert.equal(fr.path,`/fr/tours/${product.slug}/`);
    assert.equal(fr.days,en.days); assert.equal(fr.nights,en.nights);
    assert.equal(fr.tourFormat,en.tourFormat); assert.equal(fr.includesDomesticFlights,en.includesDomesticFlights);
    assert.deepEqual(fr.servicePolicy,en.servicePolicy);
    assert.deepEqual(fr.itinerary.map(d=>d.day),en.itinerary.map(d=>d.day));
    assert.deepEqual(fr.gallery.map(i=>i.src),en.gallery.map(i=>i.src));
    assert.equal(fr.heroImage.src,en.heroImage.src);
    assert.deepEqual(fr.routeMedia.map(d=>[d.day,d.variants.map(v=>v.image.src)]),en.routeMedia.map(d=>[d.day,d.variants.map(v=>v.image.src)]));
    const contract=p=>p.packages.map(x=>({id:x.id,mode:x.guideMode,quoteOnly:x.quoteOnly,rows:x.rows.map(({formatted,...row})=>row)}));
    assert.deepEqual(contract(fr),contract(en),product.slug);
    for(const row of fr.packages.flatMap(p=>p.rows)) assert.ok(row.formatted.includes(row.currency),`${product.slug}: currency ${row.currency}`);
    for(const field of ['title','lede','summary','hotelNote','serviceNote','bookingNote']) assert.notEqual(fr[field],en[field],`${product.slug}: untranslated ${field}`);
    fr.itinerary.forEach((day,i)=>assert.notEqual(day.description,en.itinerary[i].description,`${product.slug}/day${i+1}`));
    assert.equal(fr.faq?.length??0,en.faq?.length??0,`${product.slug}: FAQ coverage`);
    assert.equal(fr.exclusions.length,en.exclusions.length,`${product.slug}: exclusion coverage`);
  }
});

test('French contact labels agree with the catalogue, including winter and no-guide options', () => {
  for (const product of privateTourProducts) {
    const fr=localizeFrenchPrivateTourProduct(product);
    assert.equal(frenchContactTourNames[product.slug],fr.title,product.slug);
    assert.equal(getPrivateTourLanguagePaths(product).fr,fr.path);
    for (const pkg of fr.packages) {
      assert.equal(frenchContactPackageLabels[`${product.slug}:${pkg.id}`],pkg.label);
      for (const row of pkg.rows) {
        const context=getPrivateTourInquiryContext(product.slug,'en',{packageId:pkg.id,travelers:row.travelers});
        assert.ok(context,`${product.slug}/${pkg.id}/${row.travelers}`);
        assert.equal(frenchContactEdition.tourName(context),fr.title);
        assert.equal(frenchContactEdition.selectionLabel(context),`${pkg.label} · ${row.travelers} voyageurs`);
        const message=frenchContactEdition.messageText(context,undefined,{travelDate:'2027-04-03',note:'Guide francophone, si disponible'});
        assert.ok(message.includes(fr.path)); assert.match(message,/supplément sur devis/);
      }
    }
  }
});

test('French quote requests preserve the accepted intake contract and make the source language explicit', () => {
  const config={allowedFormVersions:[currentPrivateTourQuoteFormVersion],allowedPrivacyNoticeVersions:[travellerAckPrivacyNoticeVersion]};
  for (const product of privateTourProducts) {
    const fr=localizeFrenchPrivateTourProduct(product), pkg=fr.packages.find(p=>p.rows.length);
    if(!pkg) continue;
    const context=getPrivateTourInquiryContext(product.slug,'en',{packageId:pkg.id,travelers:pkg.rows[0].travelers});
    const marker=frenchContactEdition.noteMarker(fr.path);
    const result=validateAndNormalizeInquiry({locale:'en',contact:{channel:'email',email:'traveller@example.com'},privacyNoticeVersion:travellerAckPrivacyNoticeVersion,experiment:null,antiAbuse:{companyWebsite:''},schemaVersion:privateTourQuoteSchemaVersion,formVersion:currentPrivateTourQuoteFormVersion,entryPath:'private_tour_quote',productInterest:getPrivateTourInquirySubmissionContext(context,'en'),travelDate:'2027-04-03',note:`${marker}\n\nGuide francophone, si disponible.`,attribution:{landingPath:`/tours/${product.slug}/`}},config);
    assert.equal(result.ok,true,`${product.slug}: ${JSON.stringify(result.fieldErrors??{})}`);
    assert.match(result.value.note,/French page/);
  }
  assert.match(frenchContactEdition.receipt.queued,/anglais/);
  assert.match(frenchContactEdition.receipt.queued,/français/);
});

test('French search metadata is present and product-specific', () => {
  const titles=new Set();
  for(const [slug,copy] of Object.entries(frenchTourCopies)) {
    assert.ok(copy.metadataTitle.length>=15&&copy.metadataTitle.length<=90,`${slug}: title ${copy.metadataTitle.length}`);
    assert.ok(copy.metadataDescription.length>=70&&copy.metadataDescription.length<=220,`${slug}: description ${copy.metadataDescription.length}`);
    assert.equal(titles.has(copy.metadataTitle),false,`${slug}: duplicated title`); titles.add(copy.metadataTitle);
  }
});
