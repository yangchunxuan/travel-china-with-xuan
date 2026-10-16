import { HomegroundStudioPage } from './HomegroundStudioPage';
import { FrenchSiteFooter, FrenchSiteHeader } from './FrenchChrome';
import { frenchLanguagePaths } from '../lib/frenchSite';
import { frenchStudioCopy } from '../lib/frenchStudioCopy';
import { HOMEGROUND_TEAM_SIZE } from '../lib/homegroundStudioI18n';
import { getAllGuides } from '../lib/guideRegistry';
import { getFrenchTourCatalog } from '../lib/frenchTourCatalog';
import { frenchLegacyTourCards } from '../lib/frenchLegacyTours';

export function FrenchStudioPage() {
  const path = '/fr/studio/';
  const languagePaths = frenchLanguagePaths('/studio/', path);
  return <HomegroundStudioPage locale="en" edition={{
    language: 'fr', copy: frenchStudioCopy, skipLink: 'Aller au contenu',
    header: <FrenchSiteHeader currentPath={path} languagePaths={languagePaths} />,
    footer: <FrenchSiteFooter currentPath={path} />,
    plannerHref: '/fr/#planner-contact', planningServicesHref: '/fr/services/',
    proof: [
      { value: HOMEGROUND_TEAM_SIZE, label: frenchStudioCopy.proof.people },
      { value: getAllGuides('en').length, label: frenchStudioCopy.proof.guides },
      { value: getFrenchTourCatalog().length + frenchLegacyTourCards.length, label: frenchStudioCopy.proof.tours },
      { value: languagePaths.length, label: frenchStudioCopy.proof.languages },
    ],
    memberStoryLinks: {
      tantan: { href: '/guides/zhangjiajie-glass-bridge-vs-skywalk/', label: 'Tantan : pont de verre ou passerelle de Tianmen ? (en anglais)' },
      kevin: { href: '/guides/kevin-before-the-hotel-pickup/', label: 'Kevin : avant de venir vous chercher à l’hôtel (en anglais)' },
    },
  }} />;
}
