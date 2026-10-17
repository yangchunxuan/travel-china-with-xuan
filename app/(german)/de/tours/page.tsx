import { GermanToursHubPage, germanToursTitle, germanToursDescription } from '../../../../components/GermanCorePages';
import { buildGermanMetadata } from '../../../../lib/germanSite';
import { getPrivateTourHubLanguagePaths } from '../../../../lib/privateTourHubI18n';
export const metadata=buildGermanMetadata(germanToursTitle,germanToursDescription,'/de/tours/',getPrivateTourHubLanguagePaths());
export default function Page() { return <GermanToursHubPage/>; }
