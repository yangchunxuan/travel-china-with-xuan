import Link from "next/link";
import {
  getAllGuides,
  getGuidesByPillar,
} from "../lib/guideRegistry";
import {
  getHomegroundCopy,
  homegroundLocales,
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
  searchSectionIds,
} from "../lib/searchPlatformI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import { GuideSearchForm } from "./GuideSearchForm";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./GuidesHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";
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

function jsonLdForHub(locale: HomegroundLocale) {
  const copy = getGuidesHubCopy(locale);
  const home = getHomegroundCopy(locale);
  const guides = getAllGuides(locale);
  const canonicalUrl = `${SITE_URL}${copy.path}`;
  const listId = `${canonicalUrl}#item-list`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: copy.metadata.openGraphTitle,
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
        numberOfItems: guides.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
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
    ],
  };
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
}: {
  locale?: HomegroundLocale;
}) {
  const home = getHomegroundCopy(locale);
  const copy = getGuidesHubCopy(locale);
  const guideSearchCopy = getGuideSearchCopy(locale);
  const searchCopy = getSearchPlatformCopy(locale);
  const guides = getAllGuides(locale);
  const guideSearchDocuments = getGuideSearchDocuments(locale);
  const entryGuides = getGuidesByPillar("entry-rules", locale);
  const planningGuides = guides.filter(
    (guide) => guide.pillar !== "entry-rules",
  );
  const schema = jsonLdForHub(locale);
  const tailCount = Math.max(0, planningGuides.length - 2);
  const tailRemainder = tailCount % 3;
  const wideTailIndex =
    tailRemainder === 1 ? planningGuides.length - 1 : -1;
  const halfTailStart =
    tailRemainder === 2
      ? planningGuides.length - 2
      : planningGuides.length;

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
        locale={locale}
        pageContext="guides"
        showLanguageNav={false}
      />

      <main id="guides-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroTopline}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <nav
                className={styles.languageNav}
                aria-label={copy.languageLabel}
              >
                {homegroundLocales.map((targetLocale) => {
                  const targetHome = getHomegroundCopy(targetLocale);
                  const targetCopy = getGuidesHubCopy(targetLocale);

                  return (
                    <a
                      aria-current={targetLocale === locale ? "page" : undefined}
                      href={targetCopy.path}
                      hrefLang={targetHome.htmlLang}
                      key={targetLocale}
                      lang={targetHome.htmlLang}
                    >
                      {targetHome.languageShort}
                    </a>
                  );
                })}
              </nav>
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
            <GuideSearchForm
              documents={guideSearchDocuments}
              locale={locale}
              surface="guides_hub"
            />
          </div>
        </section>

        <nav
          id="browse-topics"
          className={styles.collectionNav}
          aria-label={searchCopy.browseLabel}
        >
          <div>
            {searchSectionIds.map((section) => (
              <Link href={getSearchSectionPath(section, locale)} key={section}>
                <span>{searchCopy.sections[section].shortLabel}</span>
                <small>{searchCopy.sections[section].eyebrow}</small>
              </Link>
            ))}
          </div>
        </nav>

        <section
          className={styles.countryGuide}
          aria-labelledby="china-travel-guide-title"
        >
          <div className={styles.countryGuideInner}>
            <div className={styles.countryGuideIntro}>
              <div>
                <p className={styles.eyebrow}>{copy.countryGuide.eyebrow}</p>
                <h2 id="china-travel-guide-title">{copy.countryGuide.title}</h2>
              </div>
              <p>{copy.countryGuide.introduction}</p>
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
                      <h3>{decision.title}</h3>
                      <p>{decision.body}</p>
                      <span className={styles.decisionAction}>
                        {sectionCopy.navLabel}
                        <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section
          className={styles.catalog}
          aria-labelledby="guides-catalog-title"
        >
          <div className={styles.catalogIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.catalogEyebrow}</p>
              <h2 id="guides-catalog-title">{copy.catalogTitle}</h2>
            </div>
            <div className={styles.catalogSummary}>
              <p>{copy.catalogIntroduction}</p>
              <p className={styles.guideCount}>
                {copy.guideCount(planningGuides.length)}
              </p>
            </div>
          </div>

          <ol
            className={styles.guideGrid}
            data-odd-count={
              planningGuides.length % 2 === 1 ? "true" : "false"
            }
          >
            {planningGuides.map((guide, index) => (
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
        </section>

        <section
          className={styles.entryCollection}
          aria-labelledby="entry-guides-title"
        >
          <div className={styles.entryInner}>
            <div className={styles.entryIntro}>
              <div>
                <p className={styles.entryEyebrow}>
                  {copy.entrySection.eyebrow}
                </p>
                <h2 id="entry-guides-title">{copy.entrySection.title}</h2>
              </div>
              <div>
                <p>{copy.entrySection.introduction}</p>
                {locale === "en" ? (
                  <Link
                    className={styles.entryAction}
                    href="/guides/china-entry-requirements/"
                  >
                    {copy.entrySection.action}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
            </div>

            <ol
              className={`${styles.guideGrid} ${styles.entryGuideGrid}`}
              data-odd-count={
                entryGuides.length % 2 === 1 ? "true" : "false"
              }
            >
              {entryGuides.map((guide, index) => (
                <GuideCard
                  guide={guide}
                  index={index + planningGuides.length}
                  key={guide.id}
                  labels={copy}
                  locale={locale}
                  slotClassName={styles.entryGuideSlot}
                />
              ))}
            </ol>
          </div>
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
