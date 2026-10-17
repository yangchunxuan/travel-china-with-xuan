export { ArabicHomePage } from './ArabicHomePage';
export { ArabicToursHubPage } from './ArabicToursHubPage';
import { ArabicServicesPage } from './ArabicServicesPage';
import { ArabicStudioPage } from './ArabicStudioPage';
import { ArabicGuidesPage } from './ArabicGuidesPage';
import { ArabicLegalPage } from './ArabicLegalPage';
import { ArabicContactPage } from './ArabicContactPage';
import type { ArabicCorePageId } from '../lib/arabicCoreCopy';
import { arabicGuideLanguageNote } from '../lib/arabicSite';

export const arabicHomeTitle = 'رحلات خاصة في الصين مع فريق محلي';
export const arabicHomeDescription = `برامج سفر داخل الصين مع Homeground: مسارات مفصلة وأسعار منشورة وتنظيم محلي. ${arabicGuideLanguageNote}`;
export const arabicToursTitle = 'برامج سياحية في الصين: الرحلات والأسعار';
export const arabicToursDescription = `قارن الرحلات الخاصة والمجموعات الصغيرة وبرامج الأيام والأسعار والخدمات داخل الصين. ${arabicGuideLanguageNote}`;

/** Arabic content, rendered by the same page components as the main website. */
export function ArabicCorePage({ id }: { id: ArabicCorePageId }) {
  switch (id) {
    case 'services': return <ArabicServicesPage />;
    case 'studio': return <ArabicStudioPage />;
    case 'guides': return <ArabicGuidesPage />;
    case 'business-information': return <ArabicLegalPage pageId="business-information" />;
    case 'contact': return <ArabicContactPage />;
  }
}
