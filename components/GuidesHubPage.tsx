import Link from "next/link";
import { getAllGuides } from "../lib/guideRegistry";
import {
  getGuidesHubPageLanguagePaths,
  getGuidesHubPagePath,
  getGuidesHubPagination,
} from "../lib/guidesHubPagination";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import {
  guidesHubDecisionSections,
  getGuidesHubCopy,
  getGuidesHubPlannerHref,
} from "../app/(default)/guides/guidesHubI18n";
import { getGuideSearchCopy } from "../lib/guideSearchI18n";
import { getGuideSearchDocuments } from "../lib/guideSearchRuntime";
import {
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import {
  getSearchPlatformCopy,
  getSearchSectionPath,
} from "../lib/searchPlatformI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import { GuideSearchForm } from "./GuideSearchForm";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./GuidesHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const GUIDE_LIST_FRAGMENT = "#guide-list";
type HubGuide = ReturnType<typeof getAllGuides>[number];
const dateLocales: Record<HomegroundLocale, string> = {
  en: "en-GB",
  zh: "zh-CN",
  ko: "ko-KR",
};

function formatGuideDate(value: string, locale: HomegroundLocale) {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function jsonLdForHub(locale: HomegroundLocale, page: number) {
  const copy = getGuidesHubCopy(locale);
  const home = getHomegroundCopy(locale);
  const { pageGuides, startIndex } = getGuidesHubPagination(locale, page);
  const canonicalPath = getGuidesHubPagePath(locale, page);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const listId = `${canonicalUrl}#item-list`;
  const pageName =
    page === 1
      ? copy.metadata.openGraphTitle
      : `${copy.metadata.openGraphTitle} — ${copy.pagination.pageTitle(page)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageName,
        description: copy.metadata.description,
        inLanguage: home.htmlLang,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        mainEntity: {
          "@id": listId,
        },
      },
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      {
        "@type": "ItemList",
        "@id": listId,
        numberOfItems: pageGuides.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: pageGuides.map((guide, index) => ({
          "@type": "ListItem",
          position: startIndex + index + 1,
          url: guide.canonicalUrl,
          item: {
            "@type": "Article",
            "@id": `${guide.canonicalUrl}#article`,
            headline: guide.headline,
            description: guide.description,
            image: {
              "@type": "ImageObject",
              url: guide.heroImageUrl,
              width: guide.imageWidth,
              height: guide.imageHeight,
            },
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
            inLanguage: home.htmlLang,
            mainEntityOfPage: guide.canonicalUrl,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Homeground China",
            item: `${SITE_URL}${home.path}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.title,
            item: `${SITE_URL}${copy.path}`,
          },
          ...(page > 1
            ? [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: copy.pagination.pageTitle(page),
                  item: canonicalUrl,
                },
              ]
            : []),
        ],
      },
    ],
  };
}

function getGuidesHubPaginationHref(
  locale: HomegroundLocale,
  page: number,
) {
  return `${getGuidesHubPagePath(locale, page)}${GUIDE_LIST_FRAGMENT}`;
}

function GuideCard({
  guide,
  index,
  locale,
  labels,
  slotClassName,
}: {
  guide: HubGuide;
  index: number;
  locale: HomegroundLocale;
  labels: ReturnType<typeof getGuidesHubCopy>;
  slotClassName?: string;
}) {
  const sectionLabel = guide.search
    ? getSearchPlatformCopy(locale).sections[guide.search.section].shortLabel
    : labels.formatLabels[guide.format] ?? guide.format.replaceAll("-", " ");
  const cardTags =
    guide.cardTags ??
    [
      ...guide.destinations.map(
        (destination) =>
          labels.destinationLabels[destination] ?? destination.replaceAll("-", " "),
      ),
      ...guide.topics.map(
        (topic) => labels.topicLabels[topic] ?? topic.replaceAll("-", " "),
      ),
    ].slice(0, 3);

  return (
    <li
      className={`${styles.guideSlot} ${slotClassName ?? ""}`}
      data-guide-id={guide.id}
    >
      <article className={styles.guideCard}>
        <Link className={styles.guideLink} href={guide.canonicalPath}>
          <figure className={styles.guideImage}>
            <img
              src={guide.cardImagePath}
              alt={guide.cardImageAlt}
              width={guide.cardImageWidth}
              height={guide.cardImageHeight}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
            />
          </figure>

          <div className={styles.guideBody}>
            <div className={styles.guideMeta}>
              <span>{sectionLabel}</span>
              <span aria-hidden="true">·</span>
              <span>
                {labels.updatedLabel}{" "}
                <time dateTime={guide.dateModified}>
                  {formatGuideDate(guide.dateModified, locale)}
                </time>
              </span>
            </div>

            <h3>{guide.headline}</h3>
            <p className={styles.guideDescription}>{guide.description}</p>

            <ul className={styles.guideTags}>
              {cardTags.map((tag, tagIndex) => (
                <li
                  className={tagIndex === 0 ? styles.destinationTag : styles.topicTag}
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>

            <span className={styles.readGuide}>
              {labels.readLabel}
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      </article>
    </li>
  );
}

export function GuidesHubPage({
  locale = "en",
  page = 1,
}: {
  locale?: HomegroundLocale;
  page?: number;
}) {
  const home = getHomegroundCopy(locale);
  const copy = getGuidesHubCopy(locale);
  const guideSearchCopy = getGuideSearchCopy(locale);
  const searchCopy = getSearchPlatformCopy(locale);
  const guideSearchDocuments = getGuideSearchDocuments(locale);
  const { guides, pageCount, pageGuides } = getGuidesHubPagination(
    locale,
    page,
  );
  const schema = jsonLdForHub(locale, page);
  const tailCount = Math.max(0, pageGuides.length - 2);
  const tailRemainder = tailCount % 3;
  const wideTailIndex =
    tailRemainder === 1 ? pageGuides.length - 1 : -1;
  const halfTailStart =
    tailRemainder === 2
      ? pageGuides.length - 2
      : pageGuides.length;
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.guidesPage}`}
      data-homeground-locale={locale}
      lang={home.htmlLang}
    >
      <a className={homeStyles.skipLink} href="#guides-main">
        {home.skipLink}
      </a>
      <HomegroundHeader
        languagePaths={getGuidesHubPageLanguagePaths(page)}
        locale={locale}
        navigationIsExact={page === 1}
        pageContext="guides"
      />

      <main id="guides-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroTopline}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
            </div>
            <div className={styles.heroGrid}>
              <h1>{copy.title}</h1>
              <p>{copy.introduction}</p>
            </div>
          </div>
        </header>

        <section
          className={styles.searchBand}
          aria-labelledby="guide-search-title"
        >
          <div className={styles.searchBandInner}>
            <div className={styles.searchBandCopy}>
              <p className={styles.eyebrow}>{guideSearchCopy.eyebrow}</p>
              <h2 id="guide-search-title">{guideSearchCopy.title}</h2>
              <p>{guideSearchCopy.introduction}</p>
            </div>
            <div className={styles.searchFormCompact}>
              <GuideSearchForm
                documents={guideSearchDocuments}
                locale={locale}
                surface="guides_hub"
              />
            </div>
          </div>
        </section>

        <section
          className={styles.countryGuide}
          aria-labelledby="china-travel-guide-title"
          id="browse-topics"
        >
          <div className={styles.countryGuideInner}>
            <div className={styles.countryGuideIntro}>
              <div>
                <p className={styles.eyebrow}>{copy.countryGuide.eyebrow}</p>
                <h2 id="china-travel-guide-title">{copy.countryGuide.title}</h2>
              </div>
              <div className={styles.countryGuideContext}>
                <p>{copy.countryGuide.introduction}</p>
                <Link href={getSearchSectionPath("explore", locale)}>
                  {copy.destinationAction}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <ol className={styles.decisionGrid}>
              {guidesHubDecisionSections.map((section, index) => {
                const decision = copy.countryGuide.decisions[section];
                const sectionCopy = searchCopy.sections[section];

                return (
                  <li key={section}>
                    <Link href={getSearchSectionPath(section, locale)}>
                      <span className={styles.decisionNumber} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.decisionCopy}>
                        <h3>{decision.title}</h3>
                        <p>{decision.body}</p>
                      </span>
                      <span className={styles.decisionAction}>
                        <span className={styles.decisionActionLabel}>
                          {sectionCopy.navLabel}
                        </span>
                        <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>

            <Link
              className={styles.entryHandoff}
              href={
                locale === "en"
                  ? "/guides/china-entry-requirements/"
                  : getSearchSectionPath("essentials", locale)
              }
            >
              <span>
                <strong>{copy.entrySection.title}</strong>
                <small>{copy.entrySection.introduction}</small>
              </span>
              <span className={styles.entryAction}>
                {copy.entrySection.action}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </section>

        <section
          className={styles.catalog}
          aria-labelledby="guides-catalog-title"
          id="guide-list"
          tabIndex={-1}
        >
          <div className={styles.catalogIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.catalogEyebrow}</p>
              <h2 id="guides-catalog-title">{copy.catalogTitle}</h2>
            </div>
            <div className={styles.catalogSummary}>
              <p>{copy.catalogIntroduction}</p>
              <p className={styles.guideCount}>
                {copy.guideCount(guides.length)}
              </p>
            </div>
          </div>

          <ol
            className={styles.guideGrid}
            data-odd-count={
              pageGuides.length % 2 === 1 ? "true" : "false"
            }
          >
            {pageGuides.map((guide, index) => (
              <GuideCard
                guide={guide}
                index={index}
                key={guide.id}
                labels={copy}
                locale={locale}
                slotClassName={
                  index === 0
                    ? styles.guideSlotLead
                    : index === wideTailIndex
                      ? styles.guideSlotWide
                      : index >= halfTailStart
                        ? styles.guideSlotHalf
                        : ""
                }
              />
            ))}
          </ol>

          <nav className={styles.pagination} aria-label={copy.pagination.label}>
            <p>{copy.pagination.status(page, pageCount, guides.length)}</p>
            <div className={styles.paginationControls}>
              {page > 1 ? (
                <Link
                  className={styles.paginationStep}
                  href={getGuidesHubPaginationHref(locale, page - 1)}
                  rel="prev"
                >
                  <span aria-hidden="true">←</span>
                  {copy.pagination.previous}
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className={`${styles.paginationStep} ${styles.paginationDisabled}`}
                >
                  <span aria-hidden="true">←</span>
                  {copy.pagination.previous}
                </span>
              )}

              <ol className={styles.paginationPages}>
                {pageNumbers.map((pageNumber) => (
                  <li key={pageNumber}>
                    {pageNumber === page ? (
                      <span aria-current="page">
                        {copy.pagination.page(pageNumber)}
                      </span>
                    ) : (
                      <Link href={getGuidesHubPaginationHref(locale, pageNumber)}>
                        {copy.pagination.page(pageNumber)}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>

              {page < pageCount ? (
                <Link
                  className={styles.paginationStep}
                  href={getGuidesHubPaginationHref(locale, page + 1)}
                  rel="next"
                >
                  {copy.pagination.next}
                  <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className={`${styles.paginationStep} ${styles.paginationDisabled}`}
                >
                  {copy.pagination.next}
                  <span aria-hidden="true">→</span>
                </span>
              )}
            </div>
          </nav>
        </section>

        <section className={styles.cta} aria-labelledby="guides-cta-title">
          <div className={styles.ctaInner}>
            <p className={styles.ctaEyebrow}>{copy.cta.eyebrow}</p>
            <div className={styles.ctaGrid}>
              <h2 id="guides-cta-title">{copy.cta.title}</h2>
              <div>
                <p>{copy.cta.body}</p>
                <a
                  className={styles.ctaAction}
                  href={getGuidesHubPlannerHref(locale)}
                >
                  {copy.cta.action}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="guides" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
