'use client';

import type { HomepageGuideChapter, HomepageSearchDemo } from '../lib/homepageEditorial';
import type { HomepagePrivateTourItem } from '../lib/homepagePrivateTourCatalog';
import { HomegroundHomePage, type HomepageEdition } from './HomegroundHomePage';
import { destinationsHubEditionPath } from '../lib/destinationEditions';
import { SpanishSiteFooter, SpanishSiteHeader } from './SpanishChrome';
import { SpanishHomeContact } from './SpanishHomeContact';
import { spanishGuideSearchCopy } from './SpanishGuideSearchForm';
import { spanishLanguagePaths } from '../lib/spanishSite';
import {
  spanishHomeCopy,
  spanishHomepageProductCopy,
  spanishHomepageShowcaseCopy,
  spanishPlanningScopeCopy,
} from '../lib/spanishHomeCopy';

/** Functions and interactive copy are assembled inside the client boundary. */
export function SpanishHomePageClient({
  products,
  guideChapters,
  searchDemos,
  teamFaces,
}: {
  products: readonly HomepagePrivateTourItem[];
  guideChapters: readonly HomepageGuideChapter[];
  searchDemos: readonly HomepageSearchDemo[];
  teamFaces: readonly { id: string; src: string }[];
}) {
  const edition: HomepageEdition = {
    language: 'es',
    copy: spanishHomeCopy,
    showcase: spanishHomepageShowcaseCopy,
    paths: { tours: '/es/tours/', guides: '/es/guias/', destinations: destinationsHubEditionPath.es, studio: '/es/studio/' },
    products: { language: 'es', copy: spanishHomepageProductCopy, hubHref: '/es/tours/' },
    guideSearch: {
      copy: spanishGuideSearchCopy,
      topicPaths: { plan: '/plan/', transport: '/transport/', stay: '/stay/' },
    },
    planningScope: { language: 'es', copy: spanishPlanningScopeCopy, ctaHref: '#planner-contact' },
    header: <SpanishSiteHeader currentPath="/es/" contactHref="#planner-contact" languagePaths={spanishLanguagePaths('/', '/es/')} />,
    footer: <SpanishSiteFooter currentPath="/es/" variant="homepage" />,
    contactPanel: <SpanishHomeContact />,
  };

  return <HomegroundHomePage
    locale="en"
    edition={edition}
    destinationHubItems={[]}
    guideChapters={guideChapters}
    privateTourItems={products}
    searchDemos={searchDemos}
    teamFaces={teamFaces}
  />;
}
