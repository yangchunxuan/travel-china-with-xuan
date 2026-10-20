export { SpanishHomePage } from './SpanishHomePage';
export { SpanishToursHubPage } from './SpanishToursHubPage';
import { SpanishServicesPage } from './SpanishServicesPage';
import { SpanishStudioPage } from './SpanishStudioPage';
import { SpanishLegalPage } from './SpanishLegalPage';
import { SpanishContactPage } from './SpanishContactPage';
import type { SpanishCorePageId } from '../lib/spanishCoreCopy';
export const spanishHomeTitle = 'Viajes a China a medida, con un equipo local';
export const spanishHomeDescription = 'Descubre China con Homeground: itinerarios detallados, precios publicados y apoyo local. Guía de habla española con suplemento, confirmado en el presupuesto.';
export { spanishToursTitle, spanishToursDescription } from './SpanishToursHubPage';
export function SpanishCorePage({id}: {id:SpanishCorePageId}) {
  switch(id) {
    case 'services': return <SpanishServicesPage/>;
    case 'studio': return <SpanishStudioPage/>;
    case 'business-information': return <SpanishLegalPage pageId="business-information"/>;
    case 'contact': return <SpanishContactPage/>;
  }
}
