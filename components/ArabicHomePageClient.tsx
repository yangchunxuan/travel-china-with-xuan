'use client';

import type { HomepageGuideChapter, HomepageSearchDemo } from '../lib/homepageEditorial';
import type { HomepagePrivateTourItem } from '../lib/homepagePrivateTourCatalog';
import { HomegroundHomePage, type HomepageEdition } from './HomegroundHomePage';
import { destinationsHubEditionPath } from '../lib/destinationEditions';
import { ArabicSiteFooter, ArabicSiteHeader } from './ArabicChrome';
import { ArabicHomeContact } from './ArabicHomeContact';
import { arabicGuideSearchCopy } from './ArabicGuideSearchForm';
import { arabicLanguagePaths } from '../lib/arabicSite';
import {
  arabicHomeCopy,
  arabicHomepageProductCopy,
  arabicHomepageShowcaseCopy,
  arabicPlanningScopeCopy,
} from '../lib/arabicHomeCopy';

/** Functions and interactive copy are assembled inside the client boundary. */
export function ArabicHomePageClient({
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
    language: 'ar',
    copy: arabicHomeCopy,
    showcase: arabicHomepageShowcaseCopy,
    paths: { tours: '/ar/tours/', guides: '/ar/guides/', destinations: destinationsHubEditionPath.ar, studio: '/ar/studio/' },
    products: { language: 'ar', copy: arabicHomepageProductCopy, hubHref: '/ar/tours/' },
    guideSearch: {
      copy: arabicGuideSearchCopy,
      topicPaths: { plan: '/plan/', transport: '/transport/', stay: '/stay/' },
    },
    planningScope: { language: 'ar', copy: arabicPlanningScopeCopy, ctaHref: '#planner-contact' },
    header: <ArabicSiteHeader currentPath="/ar/" contactHref="#planner-contact" languagePaths={arabicLanguagePaths('/', '/ar/')} />,
    footer: <ArabicSiteFooter currentPath="/ar/" variant="homepage" />,
    contactPanel: <ArabicHomeContact />,
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
