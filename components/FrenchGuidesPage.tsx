import { ReservationGuideEditionCollection } from "./ReservationGuideEditionCollection";
import { destinationsHubEditionPath } from '../lib/destinationEditions';
import { reservationGuideEditionSlugs, reservationGuideEditionPath } from "../lib/reservationGuideEditionPaths";
import { getReservationGuideEdition, reservationGuideEditionUi } from "../lib/reservationGuideEditions";
import { GuidesHubPage, type GuidesHubEdition } from './GuidesHubPage';
import { FrenchGuideSearchForm } from './FrenchGuideSearchForm';
import { FrenchSiteFooter, FrenchSiteHeader } from './FrenchChrome';
import { frenchLanguagePaths } from '../lib/frenchSite';
import { frenchGuideCardCopy, frenchGuideSectionLabels, frenchGuidesHubCopy } from '../lib/frenchGuidesHubCopy';
import { getGuideSearchDocuments } from '../lib/guideSearchRuntime';
import { getGuidesHubPagination } from '../lib/guidesHubPagination';
import { getSearchSectionPath, type SearchSectionId } from '../lib/searchPlatformI18n';
import { EDITORIAL_WEBSITE_ID, editorialOrganizationSchema, editorialWebsiteSchema } from '../lib/editorialIdentity';

export function FrenchGuidesPage() {
  const path = '/fr/guides/';
  const url = `https://homegroundchina.com${path}`;
  const { pageGuides } = getGuidesHubPagination('en', 1);
  const guidePaths: Record<string, string> = Object.fromEntries(
    reservationGuideEditionSlugs.map(slug => [slug, reservationGuideEditionPath('fr', slug)]),
  );
  const listedGuides = [
    ...reservationGuideEditionSlugs.map(slug => ({
      name: getReservationGuideEdition('fr', slug)!.headline,
      url: `https://homegroundchina.com${guidePaths[slug]}`,
    })),
    ...pageGuides.map(guide => ({
      name: frenchGuideCardCopy[guide.id]?.headline ?? guide.headline,
      url: guidePaths[guide.id] ? `https://homegroundchina.com${guidePaths[guide.id]}` : guide.canonicalUrl,
    })),
  ];
  const edition: GuidesHubEdition = {
    language: 'fr', dateLocale: 'fr-FR', skipLink: 'Aller au contenu',
    header: <FrenchSiteHeader currentPath={path} languagePaths={frenchLanguagePaths('/guides/', path)} />,
    footer: <FrenchSiteFooter currentPath={path} />,
    copy: frenchGuidesHubCopy, guideCopy: frenchGuideCardCopy,
    sectionLabels: frenchGuideSectionLabels,
    sectionHref: (section) => getSearchSectionPath(section as SearchSectionId, 'en'),
    exploreHref: destinationsHubEditionPath.fr, entryHref: '/fr/guides/china-entry-requirements/',
    paginationHref: (page) => page === 1 ? `${path}#guide-list` : `/guides/page/${page}/#guide-list`,
    plannerHref: '/fr/#planner-contact',
    searchTitle: 'Une question précise ? Recherchez en anglais.',
    searchExamples: ['Where to stay in Zhangjiajie', 'Beijing South Station to the airport', 'China with older parents'],
    searchForm: <FrenchGuideSearchForm documents={getGuideSearchDocuments('en')} />,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: frenchGuidesHubCopy.metadata.openGraphTitle,
          description: frenchGuidesHubCopy.metadata.description, inLanguage: 'fr', isPartOf: { '@id': EDITORIAL_WEBSITE_ID }, mainEntity: { '@id': `${url}#item-list` } },
        editorialWebsiteSchema(), editorialOrganizationSchema(),
        { '@type': 'ItemList', '@id': `${url}#item-list`, numberOfItems: listedGuides.length,
          itemListOrder: 'https://schema.org/ItemListOrderDescending',
          itemListElement: listedGuides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1,
            name: guide.name, url: guide.url })) },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://homegroundchina.com/fr/' },
          { '@type': 'ListItem', position: 2, name: frenchGuidesHubCopy.title, item: url },
        ] },
      ],
    },
  };
  return <GuidesHubPage locale="en" edition={{
    ...edition,
    translatedGuides: <ReservationGuideEditionCollection language="fr" />,
    guidePaths,
    guideReadLabels: Object.fromEntries(reservationGuideEditionSlugs.map(slug => [slug, reservationGuideEditionUi.fr.read])),
  }} />;
}
