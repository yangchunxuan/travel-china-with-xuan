import Link from "next/link";
import { destinationHubRegistry } from "../lib/destinationHubs";
import { getDestinationsHubCopy } from "../lib/destinationsHubI18n";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import {
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import {
  getSearchCollectionPath,
  searchCollections,
} from "../lib/searchCollectionI18n";
import {
  absoluteManifestAlternates,
  getSearchHubEntry,
  getSearchHubLanguagePaths,
} from "../lib/searchPlatformManifest";
import { getSearchPlatformCopy } from "../lib/searchPlatformI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./DestinationsHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";

function jsonLdForDestinations(locale: HomegroundLocale) {
  const home = getHomegroundCopy(locale);
  const copy = getDestinationsHubCopy(locale);
  const entry = getSearchHubEntry("explore", locale);
  const canonicalUrl = `${SITE_URL}${entry.canonicalPath}`;
  const listId = `${canonicalUrl}#city-hubs`;

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
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        mainEntity: { "@id": listId },
        sameAs: Object.values(absoluteManifestAlternates(entry)),
      },
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.homeLabel,
            item: `${SITE_URL}${home.path}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.currentLabel,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": listId,
        numberOfItems: destinationHubRegistry.length,
        itemListElement: destinationHubRegistry.map((hub, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: hub.locales[locale].navTitle,
          url: `${SITE_URL}${hub.locales[locale].path}`,
        })),
      },
    ],
  };
}

export function DestinationsHubPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const home = getHomegroundCopy(locale);
  const copy = getDestinationsHubCopy(locale);
  const platform = getSearchPlatformCopy(locale);
  const section = platform.sections.explore;
  const languagePaths = getSearchHubLanguagePaths("explore");
  const placeCollections = searchCollections.filter(
    (collection) => collection.section === "explore",
  );
  const schema = jsonLdForDestinations(locale);

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.page}`}
      data-homeground-locale={locale}
      lang={home.htmlLang}
    >
      <a className={homeStyles.skipLink} href="#destinations-main">
        {home.skipLink}
      </a>
      <HomegroundHeader
        languagePaths={languagePaths}
        locale={locale}
        pageContext="destinations"
      />

      <main id="destinations-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <nav aria-label={copy.breadcrumbLabel} className={styles.breadcrumb}>
              <ol>
                <li>
                  <Link href={home.path}>{copy.homeLabel}</Link>
                </li>
                <li aria-current="page">
                  <span aria-hidden="true">/</span>
                  {copy.currentLabel}
                </li>
              </ol>
            </nav>

            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>{section.eyebrow}</p>
                <h1>{section.title}</h1>
                <p className={styles.lede}>{section.description}</p>
              </div>
              <aside className={styles.scope} aria-labelledby="destination-scope-title">
                <p id="destination-scope-title">{section.scopeTitle}</p>
                <ul>
                  {section.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </header>

        <section className={styles.cities} aria-labelledby="city-hubs-title">
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.cityEyebrow}</p>
              <h2 id="city-hubs-title">{copy.cityTitle}</h2>
            </div>
            <div>
              <p>{copy.cityIntroduction(destinationHubRegistry.length)}</p>
              <p className={styles.count}>
                {copy.cityCount(destinationHubRegistry.length)}
              </p>
            </div>
          </div>

          <ol className={styles.cityGrid}>
            {destinationHubRegistry.map((hub, index) => {
              const city = hub.locales[locale];
              return (
                <li key={hub.id}>
                  <Link href={city.path}>
                    <span className={styles.number} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{city.navTitle}</h3>
                    <p>{city.description}</p>
                    <span className={styles.action}>
                      {copy.openCity}
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={styles.scales} aria-labelledby="place-scales-title">
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.scaleEyebrow}</p>
              <h2 id="place-scales-title">{copy.scaleTitle}</h2>
            </div>
            <p>{copy.scaleIntroduction}</p>
          </div>

          <ul className={styles.scaleGrid}>
            {placeCollections.map((collection, index) => {
              const item = collection.locales[locale];
              return (
                <li key={collection.id}>
                  <Link href={getSearchCollectionPath(collection, locale)}>
                    <span className={styles.number} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{item.label}</h3>
                    <p>{item.description}</p>
                    <span className={styles.action}>
                      {copy.openScale}
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.handoff} aria-labelledby="destination-handoff-title">
          <div>
            <p className={styles.eyebrow}>{copy.handoffEyebrow}</p>
            <h2 id="destination-handoff-title">{copy.handoffTitle}</h2>
          </div>
          <div>
            <p>{copy.handoffBody}</p>
            <div className={styles.handoffActions}>
              <Link className={styles.primaryAction} href={`${home.path}guides/`}>
                {copy.guidesAction}
                <span aria-hidden="true">→</span>
              </Link>
              <Link className={styles.secondaryAction} href={`${home.path}tours/`}>
                {copy.toursAction}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="destinations" />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </div>
  );
}
