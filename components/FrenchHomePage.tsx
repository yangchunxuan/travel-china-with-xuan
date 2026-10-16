import { FrenchHomePageClient } from './FrenchHomePageClient';
import { getFrenchHomepageGuideChapters, getFrenchHomepageProducts } from '../lib/frenchHomepageEditorial';
import { getHomepageSearchDemos } from '../lib/homepageEditorial';
import { getHomepageTeamFaces } from '../lib/homegroundStudioI18n';

/** The original homepage component, with French presentation data and unchanged assets. */
export function FrenchHomePage() {
  return <><FrenchHomePageClient
    products={getFrenchHomepageProducts()}
    guideChapters={getFrenchHomepageGuideChapters()}
    searchDemos={getHomepageSearchDemos('en')}
    teamFaces={getHomepageTeamFaces('en')}
  /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', '@id': 'https://homegroundchina.com/fr/#webpage', url: 'https://homegroundchina.com/fr/', name: 'Voyage en Chine sur mesure, avec une équipe locale', description: 'Itinéraires détaillés, tarifs publiés et accompagnement local. Guide francophone en supplément, confirmé sur devis.', inLanguage: 'fr', isPartOf: { '@id': 'https://homegroundchina.com/#website' }, about: { '@id': 'https://homegroundchina.com/#organization' } }).replace(/</g, '\\u003c') }} /></>;
}
