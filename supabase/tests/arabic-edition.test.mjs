import assert from 'node:assert/strict';
import { test } from 'node:test';
import { privateTourProducts, localizePrivateTourProduct } from '../../lib/privateTourProducts.ts';
import { arabicTourCopies } from '../../lib/arabicTourCopy.ts';
import { localizeArabicPrivateTourProduct } from '../../lib/localizeArabicPrivateTourProduct.ts';
import { arabicContactEdition } from '../../lib/arabicContactEdition.ts';
import { arabicContactTourNames, arabicContactPackageLabels } from '../../lib/arabicContactNames.ts';
import { getPrivateTourLanguagePaths } from '../../lib/privateTourMetadata.ts';
import { getPrivateTourInquiryContext, getPrivateTourInquirySubmissionContext } from '../../lib/privateTourInquiryContext.ts';
import { validateAndNormalizeInquiry } from '../../lib/inquiryContract.ts';
import { currentPrivateTourQuoteFormVersion, privateTourQuoteSchemaVersion, travellerAckPrivacyNoticeVersion } from '../../lib/inquiryVersions.ts';

test('Arabic covers every published structured product, without promoting previews', () => {
  assert.deepEqual(Object.keys(arabicTourCopies).sort(), privateTourProducts.map(p=>p.slug).sort());
});

test('all Arabic prices, currencies, party sizes, options, media and route days equal the English source', () => {
  for (const product of privateTourProducts) {
    const en=localizePrivateTourProduct(product,'en'), de=localizeArabicPrivateTourProduct(product);
    assert.equal(de.path,`/ar/tours/${product.slug}/`);
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

test('Arabic contact labels agree with the catalogue, including winter and no-guide options', () => {
  for (const product of privateTourProducts) {
    const de=localizeArabicPrivateTourProduct(product);
    assert.equal(arabicContactTourNames[product.slug],de.title,product.slug);
    assert.equal(getPrivateTourLanguagePaths(product).ar,de.path);
    for (const pkg of de.packages) {
      assert.equal(arabicContactPackageLabels[`${product.slug}:${pkg.id}`],pkg.label);
      for (const row of pkg.rows) {
        const context=getPrivateTourInquiryContext(product.slug,'en',{packageId:pkg.id,travelers:row.travelers});
        assert.ok(context,`${product.slug}/${pkg.id}/${row.travelers}`);
        assert.equal(arabicContactEdition.tourName(context),de.title);
        assert.equal(arabicContactEdition.selectionLabel(context),`${pkg.label} · عدد المسافرين: ${row.travelers}`);
        const message=arabicContactEdition.messageText(context,undefined,{travelDate:'2027-04-03',note:'مرشد ناطق بالعربية إن توفر'});
        assert.ok(message.includes(de.path)); assert.match(message,/تأكيد التوفر والسعر/);
      }
    }
  }
});

test('Arabic quote requests preserve the accepted intake contract and make the source language explicit', () => {
  const config={allowedFormVersions:[currentPrivateTourQuoteFormVersion],allowedPrivacyNoticeVersions:[travellerAckPrivacyNoticeVersion]};
  for (const product of privateTourProducts) {
    const de=localizeArabicPrivateTourProduct(product), pkg=de.packages.find(p=>p.rows.length);
    if(!pkg) continue;
    const context=getPrivateTourInquiryContext(product.slug,'en',{packageId:pkg.id,travelers:pkg.rows[0].travelers});
    const marker=arabicContactEdition.noteMarker(de.path);
    const result=validateAndNormalizeInquiry({locale:'en',contact:{channel:'email',email:'traveller@example.com'},privacyNoticeVersion:travellerAckPrivacyNoticeVersion,experiment:null,antiAbuse:{companyWebsite:''},schemaVersion:privateTourQuoteSchemaVersion,formVersion:currentPrivateTourQuoteFormVersion,entryPath:'private_tour_quote',productInterest:getPrivateTourInquirySubmissionContext(context,'en'),travelDate:'2027-04-03',note:`${marker}\n\nمرشد ناطق بالعربية إن توفر.`,attribution:{landingPath:`/tours/${product.slug}/`}},config);
    assert.equal(result.ok,true,`${product.slug}: ${JSON.stringify(result.fieldErrors??{})}`);
    assert.match(result.value.note,/Arabic page/);
  }
  assert.match(arabicContactEdition.receipt.queued,/الإنجليزية/);
  assert.doesNotMatch(arabicContactEdition.receipt.queued,/français|französisch/);
});

test('Arabic search metadata is present and product-specific', () => {
  const titles=new Set();
  for(const [slug,copy] of Object.entries(arabicTourCopies)) {
    assert.ok(copy.metadataTitle.length>=15&&copy.metadataTitle.length<=90,`${slug}: title ${copy.metadataTitle.length}`);
    assert.ok(copy.metadataDescription.length>=70&&copy.metadataDescription.length<=220,`${slug}: description ${copy.metadataDescription.length}`);
    assert.equal(titles.has(copy.metadataTitle),false,`${slug}: duplicated title`); titles.add(copy.metadataTitle);
  }
});

test('Arabic language alternates stay distinct and date formatting stays Gregorian', async () => {
  const { arabicLanguagePaths } = await import('../../lib/arabicSite.ts');
  const { withArabicAlternate } = await import('../../lib/arabicEditionIndex.ts');
  const paths=arabicLanguagePaths('/tours/beijing-highlights-5-day-private-tour/','/ar/tours/beijing-highlights-5-day-private-tour/');
  assert.equal(paths.find(p=>p.lang==='de').path,'/de/tours/beijing-highlights-5-day-private-tour/');
  assert.equal(paths.find(p=>p.lang==='ar').path,'/ar/tours/beijing-highlights-5-day-private-tour/');
  assert.deepEqual(withArabicAlternate({alternates:{languages:{de:'/de/'}}},'/ar/').alternates.languages,{de:'/de/',ar:'/ar/'});
  const formatter=new Intl.DateTimeFormat(arabicContactEdition.intlLocale,{year:'numeric',timeZone:'UTC'});
  assert.equal(formatter.resolvedOptions().calendar,'gregory');
  assert.equal(formatter.format(new Date('2027-04-03T12:00:00Z')),'2027');
});

test('the bundled Arabic font covers the edition text without a remote font request', async () => {
  const {readFileSync,readdirSync,existsSync}=await import('node:fs');
  const {create}=await import('fontkit');
  const {readArabicFontUrl}=await import('../../tools/arabic-font.mjs');
  const css=readFileSync('app/(arabic)/ar/arabic.css','utf8');
  // The published file is a subset of the complete font kept in tools/fonts
  // (public/fonts/arabic/README.md); the complete font is not published.
  const url=readArabicFontUrl(css);
  assert.match(url,/^\/fonts\/arabic\/homeground-arabic\.[0-9a-f]{8}\.woff2$/);
  assert.ok(!existsSync('public/fonts/arabic/NotoSansArabic-Variable.woff2'));
  const font=create(readFileSync('public'+url));
  const files=[...readdirSync('lib').filter(f=>/^arabic.*\.ts$/.test(f)).map(f=>'lib/'+f),...readdirSync('lib/arabic-tours').map(f=>'lib/arabic-tours/'+f)];
  const chars=new Set(files.flatMap(file=>[...readFileSync(file,'utf8')]).filter(char=>/\p{Script=Arabic}/u.test(char)));
  assert.ok(chars.size>30);
  for(const char of chars) assert.ok(font.hasGlyphForCodePoint(char.codePointAt(0)),`Arabic font missing U+${char.codePointAt(0).toString(16)}`);
  assert.doesNotMatch(css,/https?:\/\//);
  // Arabic pages preload the subset, which keeps weights 400-900 at normal width.
  assert.match(css,/font-weight:\s*400 900;/);
  assert.match(css,/font-stretch:\s*100%;/);
  const layout=readFileSync('app/(arabic)/ar/layout.tsx','utf8');
  assert.match(layout,/<link rel="preload" href=\{homegroundArabicFontUrl\} as="font" type="font\/woff2" crossOrigin="anonymous" \/>/);
  assert.equal(readFileSync('lib/homegroundArabicFontFile.ts','utf8').match(/homegroundArabicFontUrl = "([^"]+)"/)?.[1],url);
});

test('Arabic product contact keeps selected group in the established English flow', async t => {
  const {fileURLToPath}=await import('node:url');
  const {loadComponent}=await import('./helpers/component-hooks.mjs');
  const previous=Object.getOwnPropertyDescriptor(globalThis,'window');
  Object.defineProperty(globalThis,'window',{configurable:true,value:{location:{pathname:'/ar/tours/beijing-highlights-5-day-private-tour/'}}});
  t.after(()=>previous?Object.defineProperty(globalThis,'window',previous):delete globalThis.window);
  let opened=null;
  const {JapaneseTourContactLink}=loadComponent(fileURLToPath(new URL('../../components/JapaneseJiangnanInteraction.tsx',import.meta.url)),{
    '../lib/analytics':{trackEvent:()=>{}},
    '../lib/japaneseContactFlow':{japaneseDirectWhatsAppEnabled:()=>true,openJapaneseContact:()=>{throw new Error('Arabic must not enter Japanese flow');}},
    '../lib/privateTourInquiryContext':{getPrivateTourInquiryContext,isZhangjiajieCustomGroupTour:()=>false},
    '../lib/tourContact':{openTourContactForContext:(_event,context)=>{opened=context;}},
    './PrivateTourSelection':{usePrivateTourSelection:()=>({slug:'beijing-highlights-5-day-private-tour',selection:{packageId:'english-guided',travelers:6}})},
  });
  const link=JapaneseTourContactLink({children:'اطلب عرضاً',hrefs:{whatsapp:{'english-guided:6':'https://wa.me/8613174215999?text=example'},email:{other:'mailto:hello@example.com'}}});
  link.props.onClick({button:0,metaKey:false,ctrlKey:false,shiftKey:false,altKey:false});
  assert.ok(opened);
  assert.equal(opened.slug,'beijing-highlights-5-day-private-tour');
  assert.deepEqual(opened.selection,{packageId:'english-guided',travelers:6});
});
