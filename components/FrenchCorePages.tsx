export { FrenchHomePage } from './FrenchHomePage';
export { FrenchToursHubPage } from './FrenchToursHubPage';
import { FrenchServicesPage } from './FrenchServicesPage';
import { FrenchStudioPage } from './FrenchStudioPage';
import { FrenchGuidesPage } from './FrenchGuidesPage';
import { FrenchLegalPage } from './FrenchLegalPage';
import { FrenchContactPage } from './FrenchContactPage';
import type { FrenchCorePageId } from '../lib/frenchCoreCopy';

export const frenchHomeTitle = 'Voyage en Chine sur mesure, avec une équipe locale';
export const frenchHomeDescription = 'Découvrez les circuits Homeground China : itinéraires détaillés, tarifs publiés et accompagnement local. Guide francophone en supplément, confirmé sur devis.';
export const frenchToursTitle = 'Circuits en Chine : itinéraires et tarifs';
export const frenchToursDescription = 'Comparez tous les circuits Homeground China : voyage privé ou petit groupe, programme jour par jour, prix par personne et prestations. Guide francophone en supplément.';

/** French content, rendered by the same page components as the main website. */
export function FrenchCorePage({ id }: { id: FrenchCorePageId }) {
  switch (id) {
    case 'services': return <FrenchServicesPage />;
    case 'studio': return <FrenchStudioPage />;
    case 'guides': return <FrenchGuidesPage />;
    case 'business-information': return <FrenchLegalPage pageId="business-information" />;
    case 'contact': return <FrenchContactPage />;
  }
}
