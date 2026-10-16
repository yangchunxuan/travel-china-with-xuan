import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { getGuideLanguagePaths, guideRegistry } from '../../lib/guideRegistry.ts';
import { validateAndNormalizeInquiry } from '../../lib/inquiryContract.ts';
import { currentHomepageEmailFormVersion, currentPrivateTourQuoteFormVersion, homepageEmailInquirySchemaVersion, privateTourQuoteSchemaVersion, travellerAckPrivacyNoticeVersion } from '../../lib/inquiryVersions.ts';
import { getPrivateTourInquiryContext, getPrivateTourInquirySubmissionContext, isPrivateTourInquirySlug } from '../../lib/privateTourInquiryContext.ts';
import { privateTourInquiryIndex } from '../../lib/privateTourInquiryIndex.ts';
import { spanishContactEdition, spanishContactPackageLabels, spanishContactTourNames } from '../../lib/spanishContactEdition.ts';
import { tourContactNote, tourContactNoteMaxLength } from '../../lib/tourContactDraft.ts';
import { localizeSpanishPrivateTourProduct } from '../../lib/localizeSpanishPrivateTourProduct.ts';
import { privateTourProducts, privateTourPreviewProducts, getPrivateTourProduct, localizePrivateTourProduct } from '../../lib/privateTourProducts.ts';
import { getPrivateTourLanguagePaths } from '../../lib/privateTourMetadata.ts';
import { spanishGuidePathBySourceId, spanishSitePagePathByEnglishPath, spanishTourPagePath, spanishTourPageSlugs } from '../../lib/spanishEditionIndex.ts';
import { spanishGuidePath, spanishGuides } from '../../lib/spanishGuides.ts';
import { getSpanishTourCopy, spanishTourPath, spanishTourSlugs } from '../../lib/spanishTourCopy.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const sorted = values => [...values].sort();
const spanishMoney = row => new Intl.NumberFormat('es-ES', { style: 'currency', currency: row.currency, currencyDisplay: 'code', maximumFractionDigits: 0 }).format(row.amount);
const packageContract = product => product.packages.map(({ id, guideMode, quoteOnly, rows }) => ({ id, guideMode, quoteOnly, rows: rows.map(({ formatted, ...row }) => row) }));
function spanishTour(slug) {
  const product = getPrivateTourProduct(slug);
  assert.ok(product, `no source product for ${slug}`);
  return { product, source: localizePrivateTourProduct(product, 'en'), spanish: localizeSpanishPrivateTourProduct(product) };
}

test('Spanish covers all 55 structured products without promoting previews', () => {
  assert.equal(privateTourProducts.length, 55);
  assert.deepEqual(sorted(spanishTourSlugs), sorted(privateTourProducts.map(product => product.slug)));
  assert.deepEqual(sorted(spanishTourPageSlugs), sorted(spanishTourSlugs));
  for (const slug of spanishTourSlugs) {
    assert.equal(spanishTourPagePath(slug), spanishTourPath(slug));
    assert.equal(getPrivateTourLanguagePaths(getPrivateTourProduct(slug)).es, spanishTourPath(slug));
  }
  for (const product of privateTourPreviewProducts) assert.equal(spanishTourPagePath(product.slug), undefined, `preview promoted: ${product.slug}`);
  for (const slug of ['zhangjiajie-4-day-private-tour', 'xian-terracotta-warriors-half-day-private-tour']) assert.equal(spanishTourPagePath(slug), `/es/tours/${slug}/`);
  assert.equal(spanishTourPagePath('nonexistent-private-tour'), undefined);
  assert.deepEqual({ ...spanishGuidePathBySourceId }, Object.fromEntries(spanishGuides.filter(guide => guide.sourceGuideId).map(guide => [guide.sourceGuideId, spanishGuidePath(guide.slug)])));
  const registryLinks = Object.fromEntries([...new Set(guideRegistry.map(guide => guide.id))].map(id => [id, getGuideLanguagePaths(id).es]).filter(([, path]) => path));
  assert.deepEqual(registryLinks, { ...spanishGuidePathBySourceId });
  for (const [en, es] of Object.entries(spanishSitePagePathByEnglishPath)) assert.equal(es, en === '/guides/' ? '/es/guias/' : `/es${en}`);
});

test('all Spanish durations, services, prices, currencies, party sizes and photographic assets equal the source', () => {
  for (const slug of spanishTourSlugs) {
    const { source, spanish } = spanishTour(slug);
    assert.equal(spanish.path, `/es/tours/${slug}/`);
    for (const field of ['days', 'nights', 'tourFormat', 'includesDomesticFlights']) assert.equal(spanish[field], source[field], `${slug}: ${field}`);
    assert.deepEqual(spanish.servicePolicy, source.servicePolicy, `${slug}: service policy`);
    assert.deepEqual(spanish.itinerary.map(day => day.day), source.itinerary.map(day => day.day), `${slug}: day order`);
    assert.equal(spanish.heroImage.src, source.heroImage.src, `${slug}: hero asset`);
    assert.deepEqual(spanish.gallery.map(image => image.src), source.gallery.map(image => image.src), `${slug}: gallery assets`);
    assert.deepEqual(spanish.routeMedia.map(group => [group.day, group.variants.map(variant => variant.image.src)]), source.routeMedia.map(group => [group.day, group.variants.map(variant => variant.image.src)]), `${slug}: route assets`);
    assert.deepEqual(packageContract(spanish), packageContract(source), `${slug}: price and guide contract`);
    for (const row of spanish.packages.flatMap(item => item.rows)) assert.equal(row.formatted, spanishMoney(row), `${slug}: ${row.amount} ${row.currency}`);
    for (const pkg of spanish.packages) if (!pkg.rows.length) assert.equal(pkg.quoteOnly, true, `${slug}/${pkg.id}: no invented price`);
  }
});

test('every source itinerary, FAQ, exclusion and image caption has Spanish copy', () => {
  for (const slug of spanishTourSlugs) {
    const { source, spanish } = spanishTour(slug);
    for (const field of ['title', 'lede', 'summary', 'hotelNote', 'serviceNote', 'bookingNote']) {
      assert.ok(spanish[field]?.trim(), `${slug}: empty ${field}`);
      assert.notEqual(spanish[field], source[field], `${slug}: untranslated ${field}`);
    }
    assert.equal(spanish.highlights.length, source.highlights.length, `${slug}: highlights`);
    assert.equal(spanish.faq?.length ?? 0, source.faq?.length ?? 0, `${slug}: FAQ`);
    assert.equal(spanish.exclusions.length, source.exclusions.length, `${slug}: exclusions`);
    spanish.itinerary.forEach((day, index) => {
      assert.ok(day.title.trim() && day.description.trim(), `${slug}: empty day ${day.day}`);
      assert.notEqual(day.description, source.itinerary[index].description, `${slug}: untranslated day ${day.day}`);
    });
    for (const faq of spanish.faq ?? []) assert.ok(faq.question?.trim() && faq.answer?.trim(), `${slug}: empty FAQ`);
    for (const image of [spanish.heroImage, ...spanish.gallery, ...spanish.routeMedia.flatMap(group => group.variants.map(variant => variant.image))]) assert.ok(image.alt?.trim(), `${slug}: empty alt`);
  }
  // Package guide modes are checked above. This shared notice also covers
  // driver-only/no-guide options, without claiming English is always included.
  assert.match(read('lib/spanishSite.ts'), /El guía de habla española no está incluido: se presupuesta aparte/);
  assert.match(read('lib/spanishTourPresentation.ts'), /spanishGuideLanguageNote/);
  assert.match(read('components/SpanishToursHubPage.tsx'), /spanishGuideLanguageNote/);
  assert.match(spanishContactEdition.noteMarker('/es/tours/'), /Spanish-speaking guide is quoted separately/);
});

test('Spanish search metadata is complete and product-specific', () => {
  const titles = new Set();
  for (const slug of spanishTourSlugs) {
    const copy = getSpanishTourCopy(slug);
    // Same editorial bounds as the full French edition. Actual search-result
    // truncation is based on pixel width, not a universal 60/160 character cap.
    assert.ok(copy.metadataTitle.length >= 15 && copy.metadataTitle.length <= 90, `${slug}: title ${copy.metadataTitle.length}`);
    assert.ok(copy.metadataDescription.length >= 70 && copy.metadataDescription.length <= 220, `${slug}: description ${copy.metadataDescription.length}`);
    assert.equal(titles.has(copy.metadataTitle), false, `${slug}: duplicate title`);
    titles.add(copy.metadataTitle);
  }
  for (const guide of spanishGuides) {
    assert.ok(guide.title.length > 10 && guide.title.length <= 90, `${guide.slug}: title`);
    assert.ok(guide.description.length >= 70 && guide.description.length <= 220, `${guide.slug}: description`);
    assert.match(guide.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
});

test('Spanish guides link to existing pages and identify their sources', () => {
  const spanishPaths = new Set([...Object.values(spanishSitePagePathByEnglishPath), ...spanishTourSlugs.map(spanishTourPath), ...spanishGuides.map(guide => spanishGuidePath(guide.slug)), '/es/tours/zhangjiajie-4-day-private-tour/', '/es/tours/xian-terracotta-warriors-half-day-private-tour/']);
  for (const guide of spanishGuides) {
    assert.ok(guide.tourSlugs.length > 0, `${guide.slug}: no related tour`);
    for (const slug of guide.tourSlugs) assert.ok(spanishPaths.has(spanishTourPath(slug)), `${guide.slug} → ${slug}`);
    assert.ok(existsSync(resolve(root, 'public', guide.heroImage.src.slice(1))), `${guide.slug}: hero`);
    const ids = guide.body.blocks.map(block => block.id);
    assert.equal(new Set(ids).size, ids.length, `${guide.slug}: duplicate block ID`);
    assert.equal(guide.body.blocks[0].type, 'lead');
    assert.ok(guide.body.blocks.some(block => block.type === 'faq'), `${guide.slug}: no FAQ`);
    const sources = guide.body.blocks.find(block => block.type === 'sources');
    assert.ok(sources && sources.items.length >= 3, `${guide.slug}: too few sources`);
    for (const block of guide.body.blocks) {
      if (block.type === 'figure') assert.ok(existsSync(resolve(root, 'public', block.src.slice(1))), `${guide.slug}: ${block.src}`);
      if (block.type !== 'internal-links') continue;
      for (const item of block.items) {
        if (item.href.startsWith('/es/')) assert.ok(spanishPaths.has(item.href), `${guide.slug}: missing ${item.href}`);
        else assert.match(item.label, /\(en inglés\)$/, `${guide.slug}: English destination not identified`);
      }
    }
  }
});

test('shared headers offer the real Spanish pages on desktop and mobile', () => {
  const header = read('components/HomegroundHeader.tsx');
  assert.equal(header.match(/\{renderSpanishLanguageChoice\(\)\}/g)?.length, 2);
  assert.match(header, /const spanishLanguageHref = languagePaths\?\.es;/);
  assert.match(header, /hrefLang="es"\s+lang="es"/);
  assert.match(read('components/HomegroundHomePage.tsx'), /languagePaths=\{\{[^}]*es: "\/es\/"/);
  assert.match(read('components/ShanghaiJiangnanImaginePage.tsx'), /es: spanishTourPagePath\(product\.slug\) \?\? spanishSite\.tours,/);
  assert.match(read('components/HomegroundHeader.module.css'), /\.mobileLanguageNav:has\(> a:nth-child\(6\)\)\s*\{\s*grid-template-columns: repeat\(3,/);
});

test('contact labels equal each page, including package IDs reused by different tours', () => {
  assert.deepEqual(sorted(Object.keys(spanishContactTourNames)), sorted(spanishTourSlugs));
  const expectedPackageKeys = [];
  for (const slug of spanishTourSlugs) {
    const { spanish } = spanishTour(slug);
    assert.equal(spanishContactTourNames[slug], spanish.title, slug);
    assert.equal(spanishContactEdition.tourPath(slug), spanishTourPath(slug));
    assert.equal(spanishContactEdition.tourSlugFromPath(spanishTourPath(slug)), slug);
    for (const pkg of spanish.packages) {
      expectedPackageKeys.push(`${slug}:${pkg.id}`);
      assert.equal(spanishContactPackageLabels[`${slug}:${pkg.id}`], pkg.label, `${slug}/${pkg.id}`);
      for (const row of pkg.rows) {
        const context = getPrivateTourInquiryContext(slug, 'en', { packageId: pkg.id, travelers: row.travelers });
        assert.ok(context, `${slug}/${pkg.id}/${row.travelers}: valid published selection`);
        assert.equal(spanishContactEdition.tourName(context), spanish.title);
        assert.equal(spanishContactEdition.selectionLabel(context), `${pkg.label} · ${row.travelers} viajeros`);
      }
      if (!pkg.rows.length) assert.equal(getPrivateTourInquiryContext(slug, 'en', { packageId: pkg.id, travelers: 2 }), null, `${slug}: unpriced option cannot acquire a price selection`);
    }
  }
  assert.deepEqual(sorted(Object.keys(spanishContactPackageLabels)), sorted(expectedPackageKeys));
  for (const guide of spanishGuides) assert.ok(spanishContactEdition.isGuidePath(spanishGuidePath(guide.slug)), guide.slug);
  assert.equal(spanishContactEdition.tourSlugFromPath('/tours/beijing-highlights-5-day-private-tour/'), null);
  assert.equal(spanishContactEdition.isGuidePath('/guides/how-to-pay-in-china-as-a-tourist/'), false);
  assert.equal(spanishContactEdition.travellersLabel(1), '1 viajero');
  assert.equal(spanishContactEdition.travellersLabel(4), '4 viajeros');
});

test('priced and quote-only Spanish enquiries preserve the accepted intake contract', () => {
  const config = { allowedFormVersions: [currentPrivateTourQuoteFormVersion, currentHomepageEmailFormVersion], allowedPrivacyNoticeVersions: [travellerAckPrivacyNoticeVersion] };
  const common = { locale: 'en', contact: { channel: 'email', email: 'traveller@example.com' }, privacyNoticeVersion: travellerAckPrivacyNoticeVersion, experiment: null, antiAbuse: { companyWebsite: '' } };
  let checked = 0;
  for (const slug of spanishTourSlugs) {
    const { spanish } = spanishTour(slug);
    const pkg = spanish.packages.find(item => item.rows.length);
    const context = getPrivateTourInquiryContext(slug, 'en', pkg ? { packageId: pkg.id, travelers: pkg.rows[0].travelers } : undefined);
    if (!isPrivateTourInquirySlug(slug)) {
      assert.equal(context, null, `${slug}: a draft-only route cannot submit a registered product`);
      assert.ok(spanishContactEdition.messageText(null, spanish.path, { travelDate: '2027-03-12', requestedTravelers: 3, note: 'Dos habitaciones' }).includes(spanish.path));
      continue;
    }
    assert.ok(context, `${slug}: registered quote context`);
    assert.ok(privateTourInquiryIndex.some(item => item.slug === slug), `${slug}: registry coverage`);
    const marker = spanishContactEdition.noteMarker(spanish.path);
    assert.ok(marker.includes(`https://homegroundchina.com${spanish.path}`));
    const longest = 'x'.repeat(tourContactNoteMaxLength - marker.length - 2);
    const note = [marker, tourContactNote(longest, 'Instagram', pkg ? undefined : 3)].join('\n\n');
    const quote = validateAndNormalizeInquiry({ ...common, schemaVersion: privateTourQuoteSchemaVersion, formVersion: currentPrivateTourQuoteFormVersion, entryPath: 'private_tour_quote', productInterest: getPrivateTourInquirySubmissionContext(context, 'en'), travelDate: '2027-03-12', note, attribution: { landingPath: `/tours/${slug}/` } }, config);
    assert.equal(quote.ok, true, `${slug}: ${JSON.stringify(quote.fieldErrors ?? {})}`);
    assert.equal(quote.value.note, note, `${slug}: traveller note and source survive`);
    assert.equal(quote.value.travelDate, '2027-03-12');
    assert.deepEqual(quote.value.productInterest, getPrivateTourInquirySubmissionContext(context, 'en'));
    const emailOnly = validateAndNormalizeInquiry({ ...common, schemaVersion: homepageEmailInquirySchemaVersion, formVersion: currentHomepageEmailFormVersion, entryPath: 'homepage_email', productInterest: getPrivateTourInquirySubmissionContext(getPrivateTourInquiryContext(slug, 'en'), 'en'), attribution: { landingPath: '/' } }, config);
    assert.equal(emailOnly.ok, true, `${slug}: ${JSON.stringify(emailOnly.fieldErrors ?? {})}`);
    checked += 1;
  }
  assert.equal(checked, spanishTourSlugs.filter(isPrivateTourInquirySlug).length);
  assert.match(spanishContactEdition.receipt.queued, /inglés; puedes responder en español/);
  // The half-day route has no backend registration. Its URL and details must
  // survive as a manual draft without being called a received enquiry.
  const halfDay = 'xian-terracotta-warriors-half-day-private-tour';
  assert.equal(getPrivateTourInquiryContext(halfDay, 'en'), null);
  const manual = spanishContactEdition.messageText(null, spanishTourPath(halfDay), { travelDate: '2027-03-12', requestedTravelers: 3, note: 'Dos adultos y un niño' });
  for (const text of [spanishTourPath(halfDay), 'Llegada prevista: 2027-03-12', 'Viajeros: 3', 'Detalles del viaje: Dos adultos y un niño']) assert.ok(manual.includes(text));
});

test('Spanish drafts preserve route, party, date, note, discovery source and page URL', () => {
  const slug = 'guilin-yangshuo-5-day-private-tour';
  const { spanish } = spanishTour(slug);
  const pkg = spanish.packages.find(item => item.rows.some(row => row.travelers === 2));
  const context = getPrivateTourInquiryContext(slug, 'en', { packageId: pkg.id, travelers: 2 });
  const draft = { travelDate: '2027-03-12', requestedTravelers: 2, note: 'Dos habitaciones', referralSource: 'ChatGPT' };
  const expected = ['Hola, me gustaría organizar un viaje a China.', spanish.title, `${pkg.label} · 2 viajeros`, `Página: https://homegroundchina.com${spanish.path}`, 'Llegada prevista: 2027-03-12', 'Viajeros: 2', 'Detalles del viaje: Dos habitaciones', 'Cómo conocí Homeground: ChatGPT', 'Guía en español (con suplemento):'];
  assert.deepEqual(spanishContactEdition.messageText(context, undefined, draft).split('\n'), expected);
  const mail = new URL(spanishContactEdition.mailtoHref(context, draft));
  assert.equal(mail.pathname, 'hello@homegroundchina.com');
  assert.equal(mail.searchParams.get('subject'), `Presupuesto: ${spanish.title}`);
  assert.equal(mail.searchParams.get('body'), expected.join('\r\n'));
  for (const path of ['/es/', '/es/guias/yangshuo-que-ver/']) {
    const general = spanishContactEdition.messageText(null, path, { travelDate: null, requestedTravelers: 3, note: 'Ritmo tranquilo' });
    for (const text of [`Página: https://homegroundchina.com${path}`, 'Llegada prevista: fechas por decidir', 'Viajeros: 3', 'Detalles del viaje: Ritmo tranquilo']) assert.ok(general.includes(text), `${path}: ${text}`);
  }
});

test('Spanish pages use the original homepage, header and contact components with Spanish copy', () => {
  assert.match(read('app/(spanish)/es/layout.tsx'), /<body>\{children\}<SpanishContactHost \/><\/body>/);
  const host = read('components/SpanishContactHost.tsx');
  assert.match(host, /<TourContactPanel locale="en" edition=\{spanishContactEdition\} \/>/);
  assert.match(host, /<ContactCardHost locale="en" edition=\{spanishContactEdition\} \/>/);
  assert.equal(spanishContactEdition.homePath, '/es/');
  assert.match(read('lib/spanishSite.ts'), /contact:\s*['"]\/es\/#planner-contact['"]/);
  const home = read('components/SpanishHomePageClient.tsx');
  assert.match(home, /<HomegroundHomePage/);
  assert.match(home, /contactPanel: <SpanishHomeContact \/>/);
  const contact = read('components/SpanishHomeContact.tsx');
  assert.match(contact, /id="planner-contact"/);
  assert.match(contact, /<HomepageQuickContact[^>]*edition=\{spanishContactEdition\}/);
  const header = read('components/SpanishHeader.tsx');
  assert.match(header, /<HomegroundHeader/);
  assert.match(header, /plannerHrefOverride=\{contactHref\}/);
  assert.match(header, /openTourContactForContext\(event,\s*getPrivateTourInquiryContext\(tourSlug,\s*'en',\s*selected\?\.slug\s*===\s*tourSlug\s*\?\s*selected\.selection\s*:\s*undefined\)/);
  assert.match(header, /contactHref=\{`\$\{currentPath\}#contact`\}/);
  const links = read('components/JapaneseJiangnanInteraction.tsx');
  assert.ok(links.includes('/^\\/(?:es|fr)\\//.test(window.location.pathname)'));
  assert.match(links, /openTourContactForContext\(event, getPrivateTourInquiryContext\(/);
  assert.match(links, /const customGroup = otherGroup && isZhangjiajieCustomGroupTour\(slug\);/);
  const { sheetSteps, sheetHeights } = spanishContactEdition;
  assert.deepEqual([...sheetSteps].sort((a, b) => a - b), [...sheetSteps]);
  assert.ok(sheetSteps.every(at => at > 320 && at < 576));
  assert.equal(sheetHeights.length, sheetSteps.length + 1);
  for (let index = 1; index < sheetHeights.length; index += 1) assert.ok(sheetHeights[index][0] < sheetHeights[index - 1][0]);
  assert.ok(sheetHeights.every(([without, withLine]) => withLine > without));
  for (const group of ['frame', 'card', 'desk', 'tourContact', 'direct', 'quote', 'fieldErrors', 'labels', 'date', 'receipt']) {
    for (const [key, value] of Object.entries(spanishContactEdition[group])) {
      const strings = typeof value === 'string' ? [value] : Array.isArray(value) ? value : [];
      for (const text of strings) assert.ok(text.trim(), `${group}.${key}: empty copy`);
    }
  }
});
