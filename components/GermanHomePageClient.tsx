'use client';

import type { HomepageGuideChapter, HomepageSearchDemo } from '../lib/homepageEditorial';
import type { HomepagePrivateTourItem } from '../lib/homepagePrivateTourCatalog';
import { HomegroundHomePage, type HomepageEdition } from './HomegroundHomePage';
import { destinationsHubEditionPath } from '../lib/destinationEditions';
import { GermanSiteFooter, GermanSiteHeader } from './GermanChrome';
import { GermanHomeContact } from './GermanHomeContact';
import { germanGuideSearchCopy } from './GermanGuideSearchForm';
import { germanLanguagePaths } from '../lib/germanSite';
import {
  germanHomeCopy,
  germanHomepageProductCopy,
  germanHomepageShowcaseCopy,
  germanPlanningScopeCopy,
} from '../lib/germanHomeCopy';

/** Functions and interactive copy are assembled inside the client boundary. */
export function GermanHomePageClient({
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
    language: 'de',
    copy: germanHomeCopy,
    showcase: germanHomepageShowcaseCopy,
    paths: { tours: '/de/tours/', guides: '/de/guides/', destinations: destinationsHubEditionPath.de, studio: '/de/studio/' },
    products: { language: 'de', copy: germanHomepageProductCopy, hubHref: '/de/tours/' },
    guideSearch: {
      copy: germanGuideSearchCopy,
      topicPaths: { plan: '/plan/', transport: '/transport/', stay: '/stay/' },
    },
    planningScope: { language: 'de', copy: germanPlanningScopeCopy, ctaHref: '#planner-contact' },
    header: <GermanSiteHeader currentPath="/de/" contactHref="#planner-contact" languagePaths={germanLanguagePaths('/', '/de/')} />,
    footer: <GermanSiteFooter currentPath="/de/" variant="homepage" />,
    contactPanel: <GermanHomeContact />,
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
