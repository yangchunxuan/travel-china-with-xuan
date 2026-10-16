import { FrenchToursHubPage, frenchToursTitle, frenchToursDescription } from '../../../../components/FrenchCorePages';
import { buildFrenchMetadata } from '../../../../lib/frenchSite';
import { getPrivateTourHubLanguagePaths } from '../../../../lib/privateTourHubI18n';
export const metadata=buildFrenchMetadata(frenchToursTitle,frenchToursDescription,'/fr/tours/',getPrivateTourHubLanguagePaths());
export default function Page() { return <FrenchToursHubPage/>; }
