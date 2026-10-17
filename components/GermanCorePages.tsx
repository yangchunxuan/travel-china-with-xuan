export { GermanHomePage } from './GermanHomePage';
export { GermanToursHubPage } from './GermanToursHubPage';
import { GermanServicesPage } from './GermanServicesPage';
import { GermanStudioPage } from './GermanStudioPage';
import { GermanGuidesPage } from './GermanGuidesPage';
import { GermanLegalPage } from './GermanLegalPage';
import { GermanContactPage } from './GermanContactPage';
import type { GermanCorePageId } from '../lib/germanCoreCopy';
import { germanGuideLanguageNote } from '../lib/germanSite';

export const germanHomeTitle = 'China Reise nach Maß mit einem Team vor Ort';
export const germanHomeDescription = `Entdecken Sie Homeground China Rundreisen: genaue Routen, veröffentlichte Preise und Unterstützung vor Ort. ${germanGuideLanguageNote}`;
export const germanToursTitle = 'China Rundreisen: Routen und Preise';
export const germanToursDescription = `Vergleichen Sie Homeground China Privatreisen und Kleingruppenreisen, Tagesprogramme, Preise pro Person und Leistungen. ${germanGuideLanguageNote}`;

/** German content, rendered by the same page components as the main website. */
export function GermanCorePage({ id }: { id: GermanCorePageId }) {
  switch (id) {
    case 'services': return <GermanServicesPage />;
    case 'studio': return <GermanStudioPage />;
    case 'guides': return <GermanGuidesPage />;
    case 'business-information': return <GermanLegalPage pageId="business-information" />;
    case 'contact': return <GermanContactPage />;
  }
}
