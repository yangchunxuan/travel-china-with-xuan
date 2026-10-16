import { HomegroundStudioPage } from './HomegroundStudioPage';
import { SpanishSiteFooter, SpanishSiteHeader } from './SpanishChrome';
import { spanishLanguagePaths } from '../lib/spanishSite';
import { spanishStudioCopy } from '../lib/spanishStudioCopy';
import { HOMEGROUND_TEAM_SIZE } from '../lib/homegroundStudioI18n';
import { getAllGuides } from '../lib/guideRegistry';
import { getSpanishTourCatalog } from '../lib/spanishTourCatalog';
import { spanishLegacyTourCards } from '../lib/spanishLegacyTours';

export function SpanishStudioPage() {
  const path = '/es/studio/';
  const languagePaths = spanishLanguagePaths('/studio/', path);
  return <HomegroundStudioPage locale="en" edition={{
    language: 'es', copy: spanishStudioCopy, skipLink: 'Ir al contenido',
    header: <SpanishSiteHeader currentPath={path} languagePaths={languagePaths} />,
    footer: <SpanishSiteFooter currentPath={path} />,
    plannerHref: '/es/#planner-contact', planningServicesHref: '/es/services/',
    proof: [
      { value: HOMEGROUND_TEAM_SIZE, label: spanishStudioCopy.proof.people },
      { value: getAllGuides('en').length, label: spanishStudioCopy.proof.guides },
      { value: getSpanishTourCatalog().length + spanishLegacyTourCards.length, label: spanishStudioCopy.proof.tours },
      { value: languagePaths.length, label: spanishStudioCopy.proof.languages },
    ],
    memberStoryLinks: {
      tantan: { href: '/guides/zhangjiajie-glass-bridge-vs-skywalk/', label: 'Tantan: ¿Puente de Cristal o pasarela de Tianmen? (en inglés)' },
      kevin: { href: '/guides/kevin-before-the-hotel-pickup/', label: 'Kevin: antes de recogerte en el hotel (en inglés)' },
    },
  }} />;
}
