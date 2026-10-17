import { HomegroundStudioPage } from './HomegroundStudioPage';
import { GermanSiteFooter, GermanSiteHeader } from './GermanChrome';
import { germanLanguagePaths } from '../lib/germanSite';
import { germanStudioCopy } from '../lib/germanStudioCopy';
import { HOMEGROUND_TEAM_SIZE } from '../lib/homegroundStudioI18n';
import { getAllGuides } from '../lib/guideRegistry';
import { getGermanTourCatalog } from '../lib/germanTourCatalog';
import { germanLegacyTourCards } from '../lib/germanLegacyTours';

export function GermanStudioPage() {
  const path = '/de/studio/';
  const languagePaths = germanLanguagePaths('/studio/', path);
  return <HomegroundStudioPage locale="en" edition={{
    language: 'de', copy: germanStudioCopy, skipLink: 'Zum Inhalt springen',
    header: <GermanSiteHeader currentPath={path} languagePaths={languagePaths} />,
    footer: <GermanSiteFooter currentPath={path} />,
    plannerHref: '/de/#planner-contact', planningServicesHref: '/de/services/',
    proof: [
      { value: HOMEGROUND_TEAM_SIZE, label: germanStudioCopy.proof.people },
      { value: getAllGuides('en').length, label: germanStudioCopy.proof.guides },
      { value: getGermanTourCatalog().length + germanLegacyTourCards.length, label: germanStudioCopy.proof.tours },
      { value: languagePaths.length, label: germanStudioCopy.proof.languages },
    ],
    memberStoryLinks: {
      tantan: { href: '/guides/zhangjiajie-glass-bridge-vs-skywalk/', label: 'Tantan: Glasbrücke oder Tianmen-Skywalk? (auf Englisch)' },
      kevin: { href: '/guides/kevin-before-the-hotel-pickup/', label: 'Kevin: Vor der Abholung am Hotel (auf Englisch)' },
    },
  }} />;
}
