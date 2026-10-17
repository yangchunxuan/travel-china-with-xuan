import { ArabicHomePageClient } from './ArabicHomePageClient';
import { getArabicHomepageGuideChapters, getArabicHomepageProducts } from '../lib/arabicHomepageEditorial';
import { getHomepageSearchDemos } from '../lib/homepageEditorial';
import { getHomepageTeamFaces } from '../lib/homegroundStudioI18n';
import { arabicGuideLanguageNote } from '../lib/arabicSite';

/** The original homepage component, with Arabic presentation data and unchanged assets. */
export function ArabicHomePage() {
  return <><ArabicHomePageClient
    products={getArabicHomepageProducts()}
    guideChapters={getArabicHomepageGuideChapters()}
    searchDemos={getHomepageSearchDemos('en')}
    teamFaces={getHomepageTeamFaces('en')}
  /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', '@id': 'https://homegroundchina.com/ar/#webpage', url: 'https://homegroundchina.com/ar/', name: 'رحلات خاصة في الصين مع فريق محلي', description: `برامج مفصلة وأسعار منشورة وتنسيق محلي. ${arabicGuideLanguageNote}`, inLanguage: 'ar', isPartOf: { '@id': 'https://homegroundchina.com/#website' }, about: { '@id': 'https://homegroundchina.com/#organization' } }).replace(/</g, '\\u003c') }} /></>;
}
