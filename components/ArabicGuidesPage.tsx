import { GuidesHubPage, type GuidesHubEdition } from './GuidesHubPage';
import { ArabicGuideSearchForm } from './ArabicGuideSearchForm';
import { ArabicSiteFooter, ArabicSiteHeader } from './ArabicChrome';
import { arabicLanguagePaths } from '../lib/arabicSite';
import { arabicGuideCardCopy, arabicGuideSectionLabels, arabicGuidesHubCopy } from '../lib/arabicGuidesHubCopy';
import { getGuideSearchDocuments } from '../lib/guideSearchRuntime';
import { getGuidesHubPagination } from '../lib/guidesHubPagination';
import { getSearchSectionPath, type SearchSectionId } from '../lib/searchPlatformI18n';
import { EDITORIAL_WEBSITE_ID, editorialOrganizationSchema, editorialWebsiteSchema } from '../lib/editorialIdentity';

export function ArabicGuidesPage() {
  const path = '/ar/guides/';
  const url = `https://homegroundchina.com${path}`;
  const { pageGuides } = getGuidesHubPagination('en', 1);
  const edition: GuidesHubEdition = {
    language: 'ar', dateLocale: 'ar-SA-u-ca-gregory-nu-latn', skipLink: 'انتقل إلى المحتوى',
    header: <ArabicSiteHeader currentPath={path} languagePaths={arabicLanguagePaths('/guides/', path)} />,
    footer: <ArabicSiteFooter currentPath={path} />,
    copy: arabicGuidesHubCopy, guideCopy: arabicGuideCardCopy,
    sectionLabels: arabicGuideSectionLabels,
    sectionHref: (section) => getSearchSectionPath(section as SearchSectionId, 'en'),
    exploreHref: getSearchSectionPath('explore', 'en'), entryHref: '/guides/china-entry-requirements/',
    paginationHref: (page) => page === 1 ? `${path}#guide-list` : `/guides/page/${page}/#guide-list`,
    plannerHref: '/ar/#planner-contact',
    searchTitle: 'لديك سؤال محدّد؟ ابحث بالإنجليزية.',
    searchExamples: ['Where to stay in Zhangjiajie', 'Beijing South Station to the airport', 'China with older parents'],
    searchForm: <ArabicGuideSearchForm documents={getGuideSearchDocuments('en')} />,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: arabicGuidesHubCopy.metadata.openGraphTitle,
          description: arabicGuidesHubCopy.metadata.description, inLanguage: 'ar', isPartOf: { '@id': EDITORIAL_WEBSITE_ID }, mainEntity: { '@id': `${url}#item-list` } },
        editorialWebsiteSchema(), editorialOrganizationSchema(),
        { '@type': 'ItemList', '@id': `${url}#item-list`, numberOfItems: pageGuides.length,
          itemListOrder: 'https://schema.org/ItemListOrderDescending',
          itemListElement: pageGuides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1,
            name: arabicGuideCardCopy[guide.id]?.headline ?? guide.headline, url: guide.canonicalUrl })) },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://homegroundchina.com/ar/' },
          { '@type': 'ListItem', position: 2, name: arabicGuidesHubCopy.title, item: url },
        ] },
      ],
    },
  };
  return <GuidesHubPage locale="en" edition={edition} />;
}
