'use client';

import type { HomepageGuideChapter, HomepageSearchDemo } from '../lib/homepageEditorial';
import type { HomepagePrivateTourItem } from '../lib/homepagePrivateTourCatalog';
import { HomegroundHomePage, type HomepageEdition } from './HomegroundHomePage';
import { FrenchSiteFooter, FrenchSiteHeader } from './FrenchChrome';
import { FrenchHomeContact } from './FrenchHomeContact';
import { frenchGuideSearchCopy } from './FrenchGuideSearchForm';
import { frenchLanguagePaths } from '../lib/frenchSite';
import {
  frenchHomeCopy,
  frenchHomepageProductCopy,
  frenchHomepageShowcaseCopy,
  frenchPlanningScopeCopy,
} from '../lib/frenchHomeCopy';

/** Functions and interactive copy are assembled inside the client boundary. */
export function FrenchHomePageClient({
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
    language: 'fr',
    copy: frenchHomeCopy,
    showcase: frenchHomepageShowcaseCopy,
    paths: { tours: '/fr/tours/', guides: '/fr/guides/', destinations: '/explore/', studio: '/fr/studio/' },
    products: { language: 'fr', copy: frenchHomepageProductCopy, hubHref: '/fr/tours/' },
    guideSearch: {
      copy: frenchGuideSearchCopy,
      topicPaths: { plan: '/plan/', transport: '/transport/', stay: '/stay/' },
    },
    planningScope: { language: 'fr', copy: frenchPlanningScopeCopy, ctaHref: '#planner-contact' },
    header: <FrenchSiteHeader currentPath="/fr/" contactHref="#planner-contact" languagePaths={frenchLanguagePaths('/', '/fr/')} />,
    footer: <FrenchSiteFooter currentPath="/fr/" variant="homepage" />,
    contactPanel: <FrenchHomeContact />,
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
