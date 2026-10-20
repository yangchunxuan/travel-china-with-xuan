import { ReservationGuideEditionCollection, type EditionGuideRow } from "./ReservationGuideEditionCollection";
import { destinationsHubEditionPath } from '../lib/destinationEditions';
import { reservationGuideEditionSlugs, reservationGuideEditionPath } from "../lib/reservationGuideEditionPaths";
import { getReservationGuideEdition, reservationGuideEditionUi } from "../lib/reservationGuideEditions";
import { GuidesHubPage, type GuidesHubEdition } from './GuidesHubPage';
import { JapaneseGuideContactLink } from './JapaneseGuideContactLink';
import { JapaneseGuideSearchForm } from './JapaneseGuideSearchForm';
import { JapaneseSiteFooter, JapaneseSiteHeader } from './JapaneseTourChrome';
import { chinaTripCostJapaneseCopy } from '../lib/chinaTripCostJapaneseCopy';
import { getGuideEntry } from '../lib/guideRegistry';
import { jaPilot } from '../lib/jaPilot';
import { jaPilotCopy } from '../lib/jaPilotCopy';
import { japaneseGeneralContactHrefs, japaneseLanguagePaths, japaneseSite } from '../lib/japaneseSite';
import {
  japaneseGuideCardCopy, japaneseGuideCardSectionLabels, japaneseGuideCardTags,
  japaneseGuideSectionLabels, japaneseGuidesHubCopy, japaneseGuidesSearchTitle,
} from '../lib/japaneseGuidesHubCopy';
import { getGuideSearchDocuments } from '../lib/guideSearchRuntime';
import { getGuidesHubPagination } from '../lib/guidesHubPagination';
import { getSearchSectionPath, type SearchSectionId } from '../lib/searchPlatformI18n';
import { EDITORIAL_WEBSITE_ID, editorialOrganizationSchema, editorialWebsiteSchema } from '../lib/editorialIdentity';

const site = 'https://homegroundchina.com';

/** The two guides written in Japanese, listed before the six reservation guides. */
function japaneseGuideRows(): EditionGuideRow[] {
  const route = getGuideEntry('shanghai-hangzhou-transport-route', 'en');
  const cost = getGuideEntry('how-much-does-a-china-trip-cost', 'en');
  return [
    {
      href: jaPilot.guide, headline: jaPilotCopy.guide.title, description: jaPilotCopy.guide.lede,
      image: { src: route.cardImagePath, alt: '杭州東駅の構内', width: route.cardImageWidth, height: route.cardImageHeight },
    },
    {
      href: chinaTripCostJapaneseCopy.pagePath, headline: chinaTripCostJapaneseCopy.metadata.headline,
      description: chinaTripCostJapaneseCopy.metadata.description,
      image: { src: cost.cardImagePath, alt: chinaTripCostJapaneseCopy.hero.imageAlt, width: cost.cardImageWidth, height: cost.cardImageHeight },
    },
  ];
}

/**
 * /ja/guides/: the English guides hub in Japanese, as the French, German and
 * Arabic hubs render it. The Japanese guides come first; the English list's
 * guides open their Japanese page when there is one, otherwise the English
 * guide, marked （英語） with hreflang="en". The closing action opens the
 * Japanese inquiry dialog.
 */
export function JapaneseGuidesPage() {
  const path = japaneseSite.guides;
  const url = `${site}${path}`;
  const copy = japaneseGuidesHubCopy;
  const contact = japaneseGeneralContactHrefs(path);
  const { pageGuides } = getGuidesHubPagination('en', 1);
  const japaneseRows = japaneseGuideRows();
  const guidePaths: Record<string, string> = {
    'shanghai-hangzhou-transport-route': jaPilot.guide,
    'how-much-does-a-china-trip-cost': chinaTripCostJapaneseCopy.pagePath,
    ...Object.fromEntries(reservationGuideEditionSlugs.map(slug => [slug, reservationGuideEditionPath('ja', slug)])),
  };
  // A guide with a Japanese page shows that page's words.
  const guideCopy: GuidesHubEdition['guideCopy'] = {
    ...japaneseGuideCardCopy,
    ...Object.fromEntries(reservationGuideEditionSlugs.map(slug => {
      const guide = getReservationGuideEdition('ja', slug)!;
      const tags = japaneseGuideCardTags[slug];
      return [slug, { headline: guide.headline, description: guide.description, cardImageAlt: guide.heroAlt, ...(tags ? { cardTags: [...tags] } : {}) }];
    })),
  };
  const listedGuides = [
    ...japaneseRows.map(row => ({ name: row.headline, url: `${site}${row.href}` })),
    ...reservationGuideEditionSlugs.map(slug => ({
      name: getReservationGuideEdition('ja', slug)!.headline,
      url: `${site}${guidePaths[slug]}`,
    })),
    ...pageGuides.map(guide => ({
      name: guideCopy[guide.id]?.headline ?? guide.headline,
      url: guidePaths[guide.id] ? `${site}${guidePaths[guide.id]}` : guide.canonicalUrl,
    })),
  ].filter((guide, index, all) => all.findIndex(other => other.url === guide.url) === index);
  const edition: GuidesHubEdition = {
    language: 'ja', dateLocale: 'ja-JP', skipLink: '本文へ移動',
    header: <JapaneseSiteHeader contactHref="/ja/#planner-contact" currentPath={path} languagePaths={japaneseLanguagePaths('/guides/', path)} />,
    footer: <JapaneseSiteFooter currentPath={path} />,
    copy, guideCopy,
    sectionLabels: japaneseGuideSectionLabels,
    cardSectionLabels: japaneseGuideCardSectionLabels,
    sectionHref: (section) => getSearchSectionPath(section as SearchSectionId, 'en'),
    exploreHref: destinationsHubEditionPath.ja, entryHref: '/ja/guides/china-entry-requirements/',
    paginationHref: (page) => page === 1 ? `${path}#guide-list` : `/guides/page/${page}/#guide-list`,
    plannerHref: '/ja/#planner-contact',
    searchTitle: japaneseGuidesSearchTitle,
    searchExamples: ['Where to stay in Zhangjiajie', 'Beijing South Station to the airport', 'China with older parents'],
    searchForm: <JapaneseGuideSearchForm documents={getGuideSearchDocuments('en')} />,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: copy.metadata.openGraphTitle,
          description: copy.metadata.description, inLanguage: 'ja', isPartOf: { '@id': EDITORIAL_WEBSITE_ID }, mainEntity: { '@id': `${url}#item-list` } },
        editorialWebsiteSchema(), editorialOrganizationSchema(),
        { '@type': 'ItemList', '@id': `${url}#item-list`, numberOfItems: listedGuides.length,
          itemListOrder: 'https://schema.org/ItemListOrderDescending',
          itemListElement: listedGuides.map((guide, index) => ({ '@type': 'ListItem', position: index + 1,
            name: guide.name, url: guide.url })) },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${site}${japaneseSite.home}` },
          { '@type': 'ListItem', position: 2, name: copy.title, item: url },
        ] },
      ],
    },
    translatedGuides: <ReservationGuideEditionCollection language="ja" leadingGuides={japaneseRows} />,
    guidePaths,
    guideReadLabels: Object.fromEntries(Object.keys(guidePaths).map(id => [id, reservationGuideEditionUi.ja.read])),
    linkHrefLang: (href) => (href.startsWith('/ja/') ? undefined : 'en'),
    plannerAction: ({ className, href, label }) => (
      <JapaneseGuideContactLink className={className} href={href} emailHref={contact.email} whatsappHref={contact.whatsapp}>
        {label}
        <span aria-hidden="true">→</span>
      </JapaneseGuideContactLink>
    ),
  };
  return <GuidesHubPage locale="en" edition={edition} />;
}
