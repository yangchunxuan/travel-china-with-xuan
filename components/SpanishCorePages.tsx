export { SpanishHomePage } from './SpanishHomePage';
export { SpanishToursHubPage } from './SpanishToursHubPage';
import { SpanishServicesPage } from './SpanishServicesPage';
import { SpanishStudioPage } from './SpanishStudioPage';
import { SpanishLegalPage } from './SpanishLegalPage';
import { SpanishContactPage } from './SpanishContactPage';
import type { SpanishCorePageId } from '../lib/spanishCoreCopy';
export const spanishHomeTitle = 'Viajes a China a medida, con un equipo local';
export const spanishHomeDescription = 'Descubre China con Homeground: itinerarios detallados, precios publicados y apoyo local. Guía de habla española con suplemento, confirmado en el presupuesto.';
export const spanishToursTitle = 'Viajes por China: itinerarios y precios';
export const spanishToursDescription = 'Compara los viajes privados y en grupo reducido de Homeground China: programa día a día, precio por persona y servicios. Guía en español con suplemento.';
export function SpanishCorePage({id}: {id:SpanishCorePageId}) {
  switch(id) {
    case 'services': return <SpanishServicesPage/>;
    case 'studio': return <SpanishStudioPage/>;
    case 'business-information': return <SpanishLegalPage pageId="business-information"/>;
    case 'contact': return <SpanishContactPage/>;
  }
}
