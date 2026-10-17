import { GermanHomePageClient } from './GermanHomePageClient';
import { getGermanHomepageGuideChapters, getGermanHomepageProducts } from '../lib/germanHomepageEditorial';
import { getHomepageSearchDemos } from '../lib/homepageEditorial';
import { getHomepageTeamFaces } from '../lib/homegroundStudioI18n';
import { germanGuideLanguageNote } from '../lib/germanSite';

/** The original homepage component, with German presentation data and unchanged assets. */
export function GermanHomePage() {
  return <><GermanHomePageClient
    products={getGermanHomepageProducts()}
    guideChapters={getGermanHomepageGuideChapters()}
    searchDemos={getHomepageSearchDemos('en')}
    teamFaces={getHomepageTeamFaces('en')}
  /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', '@id': 'https://homegroundchina.com/de/#webpage', url: 'https://homegroundchina.com/de/', name: 'China Reise nach Maß mit einem Team vor Ort', description: `Detaillierte Routen, veröffentlichte Preise und Unterstützung vor Ort. ${germanGuideLanguageNote}`, inLanguage: 'de', isPartOf: { '@id': 'https://homegroundchina.com/#website' }, about: { '@id': 'https://homegroundchina.com/#organization' } }).replace(/</g, '\\u003c') }} /></>;
}
