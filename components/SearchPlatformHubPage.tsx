import Link from "next/link";
import {
  getSearchCollectionPath,
  searchCollections,
} from "../lib/searchCollectionI18n";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import {
  absoluteManifestAlternates,
  getSearchHubEntry,
  getSearchHubGuides,
  getSearchHubLanguagePaths,
} from "../lib/searchPlatformManifest";
import {
  getSearchPlatformCopy,
  getSearchSectionPath,
  searchSectionIds,
  type SearchSectionId,
} from "../lib/searchPlatformI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./SearchPlatformHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const dateLocales: Record<HomegroundLocale, string> = {
  en: "en-GB",
  zh: "zh-CN",
  ko: "ko-KR",
};

function formatDate(value: string, locale: HomegroundLocale) {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function guideCountLabel(count: number, locale: HomegroundLocale) {
  if (locale === "zh") return `${count} 篇已发布指南`;
  if (locale === "ko") return `공개 가이드 ${count}편`;
  return `${count} published guide${count === 1 ? "" : "s"}`;
}

function guideGridClass(index: number, total: number) {
  if (total === 1) return `${styles.leadGuide} ${styles.fullGuide}`;
  if (index === 0) return styles.leadGuide;

  const trailingCount = (total - 2) % 3;
  if (trailingCount === 1 && index === total - 1) return styles.fullGuide;
  if (trailingCount === 2 && index >= total - 2) return styles.halfGuide;
  return undefined;
}

function jsonLdForHub(section: SearchSectionId, locale: HomegroundLocale) {
  const home = getHomegroundCopy(locale);
  const copy = getSearchPlatformCopy(locale);
  const entry = getSearchHubEntry(section, locale);
  const guides = getSearchHubGuides(section, locale);
  const canonicalUrl = `${SITE_URL}${entry.canonicalPath}`;
  const homeUrl = `${SITE_URL}${home.path}`;
  const guidesPath = `${home.path}guides/`;
  const guidesUrl = `${SITE_URL}${guidesPath}`;
  const itemListId = `${canonicalUrl}#published-guides`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: entry.h1,
        description: entry.description,
        inLanguage: home.htmlLang,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Homeground",
          url: `${SITE_URL}/`,
        },
        mainEntity: { "@id": itemListId },
        sameAs: Object.values(absoluteManifestAlternates(entry)),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Homeground",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.guidesLabel,
            item: guidesUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: entry.h1,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        numberOfItems: guides.length,
        itemListElement: guides.map(({ guide }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: guide.canonicalUrl,
          name: guide.headline,
        })),
      },
    ],
  };
}

export function SearchPlatformHubPage({
  section,
  locale = "en",
}: {
  section: SearchSectionId;
  locale?: HomegroundLocale;
}) {
  const home = getHomegroundCopy(locale);
  const copy = getSearchPlatformCopy(locale);
  const sectionCopy = copy.sections[section];
  const entry = getSearchHubEntry(section, locale);
  const guides = getSearchHubGuides(section, locale);
  const visibleGuides = guides;
  const collections = searchCollections.filter(
    (collection) => collection.section === section,
  );
  const languagePaths = getSearchHubLanguagePaths(section);
  const schema = jsonLdForHub(section, locale);

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.hubPage}`}
      data-homeground-locale={locale}
      lang={home.htmlLang}
    >
      <a className={homeStyles.skipLink} href="#hub-main">
        {home.skipLink}
      </a>
      <HomegroundHeader
        languagePaths={languagePaths}
        locale={locale}
        pageContext="guides"
      />

      <main id="hub-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.indexLabel}>{copy.indexLabel}</p>
              <p className={styles.eyebrow}>{sectionCopy.eyebrow}</p>
              <h1>{sectionCopy.title}</h1>
              <p className={styles.lede}>{sectionCopy.description}</p>
            </div>
            <aside className={styles.scope} aria-labelledby="hub-scope-title">
              <p id="hub-scope-title">{sectionCopy.scopeTitle}</p>
              <ul>
                {sectionCopy.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </header>

        <nav className={styles.sectionIndex} aria-label={copy.browseLabel}>
          <div className={styles.sectionIndexInner}>
            {searchSectionIds.map((candidate) => {
              const candidateCopy = copy.sections[candidate];
              return (
                <Link
                  aria-current={candidate === section ? "page" : undefined}
                  href={getSearchSectionPath(candidate, locale)}
                  key={candidate}
                >
                  <span>{candidateCopy.shortLabel}</span>
                  <small>{candidateCopy.eyebrow}</small>
                </Link>
              );
            })}
          </div>
        </nav>

        <section className={styles.platformMap} aria-labelledby="hub-topics-title">
          <div className={styles.platformMapIntro}>
            <p className={styles.eyebrow}>{sectionCopy.eyebrow}</p>
            <h2 id="hub-topics-title">{sectionCopy.scopeTitle}</h2>
            <p>{sectionCopy.description}</p>
          </div>
          <ul>
            {collections.map((collection) => (
              <li key={collection.id}>
                <Link href={getSearchCollectionPath(collection, locale)}>
                  <span>{collection.locales[locale].label}</span>
                  <small>{collection.locales[locale].description}</small>
                  <b aria-hidden="true">↗</b>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.collection} aria-labelledby="hub-collection-title">
          <div className={styles.collectionHeading}>
            <div>
              <p className={styles.eyebrow}>{sectionCopy.navLabel}</p>
              <h2 id="hub-collection-title">{copy.collectionTitle}</h2>
            </div>
            <div className={styles.collectionSummary}>
              <p>{copy.collectionIntroduction}</p>
              <p className={styles.count}>{guideCountLabel(guides.length, locale)}</p>
            </div>
          </div>

          {visibleGuides.length > 0 ? (
            <ol className={styles.guideGrid}>
              {visibleGuides.map(({ guide, manifest }, index) => (
                <li
                  className={guideGridClass(index, visibleGuides.length)}
                  key={manifest.contentId}
                >
                  <article className={styles.guideCard}>
                    <Link href={manifest.path}>
                      <figure>
                        <img
                          alt={guide.cardImageAlt}
                          decoding="async"
                          fetchPriority="auto"
                          height={guide.cardImageHeight}
                          loading="lazy"
                          src={guide.cardImagePath}
                          width={guide.cardImageWidth}
                        />
                      </figure>
                      <div className={styles.guideBody}>
                        <p className={styles.guideMeta}>
                          <span>{sectionCopy.shortLabel}</span>
                          <span aria-hidden="true">·</span>
                          <time dateTime={manifest.dates.dateModified ?? undefined}>
                            {copy.updatedLabel}{" "}
                            {formatDate(
                              manifest.dates.dateModified ?? "2026-08-09",
                              locale,
                            )}
                          </time>
                        </p>
                        <h3>{manifest.h1}</h3>
                        <p>{manifest.description}</p>
                        <span className={styles.openGuide}>
                          {copy.openGuideLabel}
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ol>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.eyebrow}>{copy.currentSectionLabel}</p>
              <h2>{copy.emptyTitle}</h2>
              <p>{copy.emptyBody}</p>
              <Link href={`${home.path}guides/`}>{copy.guidesLabel}</Link>
            </div>
          )}

        </section>

        <section className={styles.platformMap} aria-labelledby="platform-map-title">
          <div className={styles.platformMapIntro}>
            <p className={styles.eyebrow}>{copy.browseLabel}</p>
            <h2 id="platform-map-title">{copy.indexTitle}</h2>
            <p>{copy.indexIntroduction}</p>
          </div>
          <ul>
            {searchSectionIds
              .filter((candidate) => candidate !== section)
              .map((candidate) => {
                const candidateCopy = copy.sections[candidate];
                return (
                  <li key={candidate}>
                    <Link href={getSearchSectionPath(candidate, locale)}>
                      <span>{candidateCopy.navLabel}</span>
                      <small>{candidateCopy.description}</small>
                      <b aria-hidden="true">↗</b>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </section>

        <section className={styles.cta} aria-labelledby="hub-cta-title">
          <div>
            <p className={styles.eyebrow}>Homeground</p>
            <h2 id="hub-cta-title">{copy.nextTitle}</h2>
          </div>
          <div>
            <p>{copy.nextBody}</p>
            <div className={styles.ctaActions}>
              <a className={styles.primaryAction} href={`${home.path}#planner-contact`}>
                {copy.tripBriefLabel}
                <span aria-hidden="true">→</span>
              </a>
              <Link className={styles.secondaryAction} href={`${home.path}guides/`}>
                {copy.guidesLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="guides" />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </div>
  );
}
