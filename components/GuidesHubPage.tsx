import Link from "next/link";
import { getAllGuides } from "../lib/guideRegistry";
import {
  getHomegroundCopy,
  homegroundLocales,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import {
  getGuidesHubCopy,
  getGuidesHubPlannerHref,
} from "../app/(default)/guides/guidesHubI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./GuidesHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";
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
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Homeground",
          url: `${SITE_URL}/`,
        },
        mainEntity: {
          "@id": listId,
        },
      },
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

export function GuidesHubPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const home = getHomegroundCopy(locale);
  const copy = getGuidesHubCopy(locale);
  const guides = getAllGuides(locale);
  const schema = jsonLdForHub(locale);

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
              <p className={styles.guideCount}>{copy.guideCount(guides.length)}</p>
            </div>
          </div>

          <ol className={styles.guideGrid}>
            {guides.map((guide, index) => (
              <li
                className={`${styles.guideSlot} ${
                  index === 0
                    ? styles.guideSlotLead
                    : index === guides.length - 1
                      ? styles.guideSlotWide
                      : ""
                }`}
                key={guide.id}
              >
                <article className={styles.guideCard}>
                  <Link className={styles.guideLink} href={guide.canonicalPath}>
                    <figure className={styles.guideImage}>
                      <img
                        src={guide.heroImagePath}
                        alt={guide.heroAlt}
                        width={guide.imageWidth}
                        height={guide.imageHeight}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        decoding="async"
                      />
                    </figure>

                    <div className={styles.guideBody}>
                      <div className={styles.guideMeta}>
                        <span>{copy.formatLabels[guide.format]}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {copy.updatedLabel}{" "}
                          <time dateTime={guide.dateModified}>
                            {formatGuideDate(guide.dateModified, locale)}
                          </time>
                        </span>
                      </div>

                      <h3>{guide.headline}</h3>
                      <p className={styles.guideDescription}>
                        {guide.description}
                      </p>

                      <ul className={styles.guideTags}>
                        {guide.destinations.map((destination) => (
                          <li className={styles.destinationTag} key={destination}>
                            {copy.destinationLabels[destination]}
                          </li>
                        ))}
                        {guide.topics.slice(0, 2).map((topic) => (
                          <li className={styles.topicTag} key={topic}>
                            {copy.topicLabels[topic]}
                          </li>
                        ))}
                      </ul>

                      <span className={styles.readGuide}>
                        {copy.readLabel}
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
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
