import { ArabicToursHubPage, arabicToursTitle, arabicToursDescription } from '../../../../components/ArabicCorePages';
import { buildArabicMetadata } from '../../../../lib/arabicSite';
import { getPrivateTourHubLanguagePaths } from '../../../../lib/privateTourHubI18n';
export const metadata=buildArabicMetadata(arabicToursTitle,arabicToursDescription,'/ar/tours/',getPrivateTourHubLanguagePaths());
export default function Page() { return <ArabicToursHubPage/>; }
