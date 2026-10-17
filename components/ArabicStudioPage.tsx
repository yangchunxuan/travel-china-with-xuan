import { HomegroundStudioPage } from './HomegroundStudioPage';
import { ArabicSiteFooter, ArabicSiteHeader } from './ArabicChrome';
import { arabicLanguagePaths } from '../lib/arabicSite';
import { arabicStudioCopy } from '../lib/arabicStudioCopy';
import { HOMEGROUND_TEAM_SIZE } from '../lib/homegroundStudioI18n';
import { getAllGuides } from '../lib/guideRegistry';
import { getArabicTourCatalog } from '../lib/arabicTourCatalog';
import { arabicLegacyTourCards } from '../lib/arabicLegacyTours';

export function ArabicStudioPage() {
  const path = '/ar/studio/';
  const languagePaths = arabicLanguagePaths('/studio/', path);
  return <HomegroundStudioPage locale="en" edition={{
    language: 'ar', copy: arabicStudioCopy, skipLink: 'انتقل إلى المحتوى',
    header: <ArabicSiteHeader currentPath={path} languagePaths={languagePaths} />,
    footer: <ArabicSiteFooter currentPath={path} />,
    plannerHref: '/ar/#planner-contact', planningServicesHref: '/ar/services/',
    proof: [
      { value: HOMEGROUND_TEAM_SIZE, label: arabicStudioCopy.proof.people },
      { value: getAllGuides('en').length, label: arabicStudioCopy.proof.guides },
      { value: getArabicTourCatalog().length + arabicLegacyTourCards.length, label: arabicStudioCopy.proof.tours },
      { value: languagePaths.length, label: arabicStudioCopy.proof.languages },
    ],
    memberStoryLinks: {
      tantan: { href: '/guides/zhangjiajie-glass-bridge-vs-skywalk/', label: 'Tantan: الجسر الزجاجي أم ممشى تيانمن؟ (بالإنجليزية)' },
      kevin: { href: '/guides/kevin-before-the-hotel-pickup/', label: 'Kevin: قبل الاستقبال من الفندق (بالإنجليزية)' },
    },
  }} />;
}
