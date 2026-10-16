import { SpanishToursHubPage, spanishToursTitle, spanishToursDescription } from '../../../../components/SpanishCorePages';
import { buildSpanishMetadata } from '../../../../lib/spanishSite';
import { getPrivateTourHubLanguagePaths } from '../../../../lib/privateTourHubI18n';
export const metadata=buildSpanishMetadata(spanishToursTitle,spanishToursDescription,'/es/tours/',getPrivateTourHubLanguagePaths());
export default function Page() { return <SpanishToursHubPage/>; }
