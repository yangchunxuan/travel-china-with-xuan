import { GuidesHubPage, type GuidesHubEdition } from './GuidesHubPage';
import { GermanGuideSearchForm } from './GermanGuideSearchForm';
import { GermanSiteFooter, GermanSiteHeader } from './GermanChrome';
import { germanLanguagePaths } from '../lib/germanSite';
import { germanGuideCardCopy, germanGuideSectionLabels, germanGuidesHubCopy } from '../lib/germanGuidesHubCopy';
import { getGuideSearchDocuments } from '../lib/guideSearchRuntime';
import { getGuidesHubPagination } from '../lib/guidesHubPagination';
import { getSearchSectionPath, type SearchSectionId } from '../lib/searchPlatformI18n';
import { EDITORIAL_WEBSITE_ID, editorialOrganizationSchema, editorialWebsiteSchema } from '../lib/editorialIdentity';

export function GermanGuidesPage() {
  const path = '/de/guides/';
  const url = `https://homegroundchina.com${path}`;
  const { pageGuides } = getGuidesHubPagination('en', 1);
  const edition: GuidesHubEdition = {
    language: 'de', dateLocale: 'de-DE', skipLink: 'Zum Inhalt springen',
    header: <GermanSiteHeader currentPath={path} languagePaths={germanLanguagePaths('/guides/', path)} />,
    footer: <GermanSiteFooter currentPath={path} />,
    copy: germanGuidesHubCopy, guideCopy: germanGuideCardCopy,
    sectionLabels: germanGuideSectionLabels,
    sectionHref: (section) => getSearchSectionPath(section as SearchSectionId, 'en'),
    exploreHref: getSearchSectionPath('explore', 'en'), entryHref: '/guides/china-entry-requirements/',
    paginationHref: (page) => page === 1 ? `${path}#guide-list` : `/guides/page/${page}/#guide-list`,
    plannerHref: '/de/#planner-contact',
    searchTitle: 'Eine konkrete Frage? Suchen Sie auf Englisch.',
    searchExamples: ['Where to stay in Zhangjiajie', 'Beijing South Station to the airport', 'China with older parents'],
    searchForm: <GermanGuideSearchForm documents={getGuideSearchDocuments('en')} />,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: germanGuidesHubCopy.metadata.openGraphTitle,
          description: germanGuidesHubCopy.metadata.description, inLanguage: 'de', isPartOf: { '@id': EDITORIAL_WEBSITE_ID }, mainEntity: { '@id': `${url}#item-list` } },
        editorialWebsiteSchema(), editorialOrganizationSchema(),
        { '@type': 'ItemList', '@id': `${url}#item-list`, numberOfItems: pageGuides.length,
          itemListOrder: 'https://schema.org/ItemListOrderDescending',
          itemListElement: pageGuides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1,
            name: germanGuideCardCopy[guide.id]?.headline ?? guide.headline, url: guide.canonicalUrl })) },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://homegroundchina.com/de/' },
          { '@type': 'ListItem', position: 2, name: germanGuidesHubCopy.title, item: url },
        ] },
      ],
    },
  };
  return <GuidesHubPage locale="en" edition={edition} />;
}
