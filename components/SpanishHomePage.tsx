import { SpanishHomePageClient } from './SpanishHomePageClient';
import { getSpanishHomepageGuideChapters, getSpanishHomepageProducts } from '../lib/spanishHomepageEditorial';
import { getHomepageSearchDemos } from '../lib/homepageEditorial';
import { getHomepageTeamFaces } from '../lib/homegroundStudioI18n';

/** The original homepage component, with Spanish presentation data and unchanged assets. */
export function SpanishHomePage() {
  return <><SpanishHomePageClient
    products={getSpanishHomepageProducts()}
    guideChapters={getSpanishHomepageGuideChapters()}
    searchDemos={getHomepageSearchDemos('en')}
    teamFaces={getHomepageTeamFaces('en')}
  /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', '@id': 'https://homegroundchina.com/es/#webpage', url: 'https://homegroundchina.com/es/', name: 'Viajes a China a medida, con un equipo local', description: 'Itinerarios detallados, precios publicados y apoyo local. Guía en español con suplemento, confirmado en el presupuesto.', inLanguage: 'es', isPartOf: { '@id': 'https://homegroundchina.com/#website' }, about: { '@id': 'https://homegroundchina.com/#organization' } }).replace(/</g, '\\u003c') }} /></>;
}
