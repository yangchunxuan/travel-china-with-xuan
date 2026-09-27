import Image from "next/image";
import Link from "next/link";
import { destinationHubRegistry } from "../lib/destinationHubs";
import {
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import {
  japaneseExploreCities as cities,
  japaneseExploreCopy as copy,
  japaneseToursForCity,
} from "../lib/japaneseExploreCopy";
import {
  japaneseGeneralContactHrefs,
  japaneseLanguagePaths,
  japaneseSite,
} from "../lib/japaneseSite";
import { getJapaneseTourCatalog, type JapaneseCatalogTour } from "../lib/japaneseTourCatalog";
import { getPrivateTourStartingPrice } from "../lib/privateTourStartingPrice";
import { CityPlot } from "./DestinationsHubPage";
import { JapaneseContactPanel } from "./JapaneseContactPanel";
import { JapaneseTourQuickCard } from "./JapaneseTourQuickCard";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import localeStyles from "./LocaleRoot.module.css";
import { PointerSpotlight } from "./motion/PointerSpotlight";
import styles from "./DestinationsHubPage.module.css";
import exploreStyles from "./JapaneseExplore.module.css";
import toursStyles from "./PrivateToursHubPage.module.css";
import { KeepWords } from "./text/KeepWords";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";

const SITE_URL = "https://homegroundchina.com";

// Routes of nine days or more pass through several cities; each city lists
// them as compact rows instead of repeating full cards.
function isLongRoute(tour: JapaneseCatalogTour) {
  return tour.days >= 9;
}

// The title already carries the length, so the row shows the price only.
function RouteMeta({ tour }: { tour: JapaneseCatalogTour }) {
  const starting = getPrivateTourStartingPrice(tour);
  if (!starting) return <>日程に合わせてお見積もり</>;
  const basis = tour.tourFormat === "small-group" ? "2名1室・1名あたり" : `${starting.selection.travelers}名参加時・1名あたり`;
  return (
    <>
      公開料金の目安 {starting.formatted} <span className={exploreStyles.keep}>（{basis}）</span>
    </>
  );
}

function longRoutes(tours: readonly JapaneseCatalogTour[]) {
  return tours.filter(isLongRoute).sort((a, b) => a.days - b.days);
}

const cityLabels = Object.fromEntries(
  Object.entries(cities).map(([id, city]) => [id, city.name]),
) as Record<keyof typeof cities, string>;

/**
 * /ja/explore/: the eight destination cities compared as on /explore/, each
 * followed by the Japanese tour pages that visit it, then the tours outside
 * those cities.
 */
export function JapaneseExplorePage() {
  const tours = getJapaneseTourCatalog();
  const cityTours = destinationHubRegistry.map((hub) => ({
    hub,
    city: cities[hub.id],
    tours: japaneseToursForCity(hub.id, tours),
  }));
  const listed = new Set(cityTours.flatMap((entry) => entry.tours.map((tour) => tour.slug)));
  const otherTours = tours.filter((tour) => !listed.has(tour.slug));
  const contact = japaneseGeneralContactHrefs(japaneseSite.explore);
  const canonicalUrl = `${SITE_URL}${japaneseSite.explore}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: copy.hero.title,
        description: copy.metadata.description,
        inLanguage: "ja",
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        mainEntity: { "@id": `${canonicalUrl}#cities` },
      },
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.homeLabel, item: `${SITE_URL}${japaneseSite.home}` },
          { "@type": "ListItem", position: 2, name: copy.currentLabel, item: canonicalUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#cities`,
        numberOfItems: cityTours.length,
        itemListElement: cityTours.map(({ hub, city }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: city.name,
          url: `${canonicalUrl}#city-${hub.id}`,
        })),
      },
    ],
  };

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.page} ${exploreStyles.root}`}
      data-homeground-locale="ja"
      lang="ja"
    >
      <a className={localeStyles.skipLink} href="#destinations-main">本文へ移動</a>
      <JapaneseSiteHeader
        contactHref="#contact"
        currentPath={japaneseSite.explore}
        languagePaths={japaneseLanguagePaths("/explore/", japaneseSite.explore)}
      />

      <main id="destinations-main" tabIndex={-1}>
        <PointerSpotlight />
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <nav aria-label={copy.breadcrumbLabel} className={styles.breadcrumb}>
              <ol>
                <li><Link href={japaneseSite.home}>{copy.homeLabel}</Link></li>
                <li aria-current="page">
                  <span aria-hidden="true">/</span>
                  {copy.currentLabel}
                </li>
              </ol>
            </nav>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
                <h1><AnimatedHeadline locale="ja" text={copy.hero.title} /></h1>
                <p className={styles.lede}>{copy.hero.description}</p>
              </div>
              <aside className={styles.scope} aria-labelledby="destination-scope-title">
                <p id="destination-scope-title">{copy.hero.scopeTitle}</p>
                <ul>{copy.hero.scope.map((item) => <li key={item}>{item}</li>)}</ul>
              </aside>
            </div>
          </div>
        </header>

        <section className={styles.cities} aria-labelledby="city-hubs-title" id="cities">
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.cities.eyebrow}</p>
              <h2 id="city-hubs-title"><KeepWords locale="ja" text={copy.cities.title} /></h2>
            </div>
            <div>
              <p>{copy.cities.intro}</p>
              <p className={styles.count}>{copy.cities.count}</p>
            </div>
          </div>

          <div className={styles.cityLayout}>
            <div className={styles.plotPanel}>
              <CityPlot labels={cityLabels} locale="en" />
            </div>
            <ol className={styles.cityGrid}>
              {cityTours.map(({ hub, city }, index) => (
                <li key={hub.id}>
                  <a href={`#city-${hub.id}`}>
                    <span className={styles.number} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <figure className={styles.cityImage} data-city={hub.id}>
                      <Image
                        src={hub.heroImagePath}
                        alt={city.heroAlt}
                        width={hub.imageWidth}
                        height={hub.imageHeight}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 40rem) 6.5rem, (max-width: 61.25rem) calc((100vw - 4rem) / 2), 21rem"
                      />
                    </figure>
                    <h3><KeepWords locale="ja" text={city.name} /></h3>
                    <dl className={styles.cityFacts}>
                      <div><dt>{copy.cities.bestForLabel}</dt><dd>{city.bestFor}</dd></div>
                      <div><dt>{copy.cities.stayLabel}</dt><dd>{city.stay}</dd></div>
                      <div><dt>{copy.cities.routeRoleLabel}</dt><dd>{city.routeRole}</dd></div>
                    </dl>
                    <span className={styles.action}>
                      {copy.cities.action}
                      <span aria-hidden="true">↓</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className={`${toursStyles.toursPage} ${exploreStyles.tourScope}`} data-homeground-locale="ja">
          {cityTours.map(({ hub, city, tours: visiting }) => (
            <section
              aria-labelledby={`city-${hub.id}-title`}
              className={exploreStyles.citySection}
              id={`city-${hub.id}`}
              key={hub.id}
            >
              <div className={exploreStyles.cityIntro}>
                <div>
                  <p className={styles.eyebrow}>{copy.citySection.eyebrow}</p>
                  <h2 id={`city-${hub.id}-title`}><KeepWords locale="ja" text={city.name} /></h2>
                  <p className={exploreStyles.tourCount}>{copy.citySection.tourCount(visiting.length)}</p>
                </div>
                <div className={exploreStyles.citySummary}>
                  <p>{city.summary}</p>
                  <dl>
                    <div><dt>{copy.cities.stayLabel}</dt><dd>{city.stay}</dd></div>
                    <div><dt>{copy.cities.routeRoleLabel}</dt><dd>{city.routeRole}</dd></div>
                  </dl>
                  <p className={exploreStyles.guideNote}>
                    {copy.citySection.guideNote}{" "}
                    <a href={hub.locales.en.path} hrefLang="en">{copy.citySection.guideLink}</a>
                  </p>
                </div>
              </div>
              {visiting.some((tour) => !isLongRoute(tour)) ? (
                <ul className={toursStyles.quickList}>
                  {visiting.filter((tour) => !isLongRoute(tour)).map((tour) => (
                    <JapaneseTourQuickCard key={tour.slug} tour={tour} />
                  ))}
                </ul>
              ) : null}
              {visiting.some(isLongRoute) ? (
                <details className={exploreStyles.routes}>
                  <summary>
                    {copy.citySection.longRoutes(longRoutes(visiting).length)}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <ul className={exploreStyles.routeList}>
                    {longRoutes(visiting).map((tour) => (
                      <li key={tour.slug}>
                        <a href={tour.path}>
                          <span className={exploreStyles.routeTitle}>
                            <KeepWords locale="ja" text={tour.title} />
                          </span>
                          <span className={exploreStyles.routeMeta}><RouteMeta tour={tour} /></span>
                          <span aria-hidden="true" className={exploreStyles.routeArrow}>→</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
              <a className={exploreStyles.backLink} href="#cities">
                <span aria-hidden="true">↑</span> {copy.citySection.backToCities}
              </a>
            </section>
          ))}

          {otherTours.length > 0 ? (
            <section aria-labelledby="city-other-title" className={exploreStyles.citySection} id="city-other">
              <div className={exploreStyles.cityIntro}>
                <div>
                  <p className={styles.eyebrow}>{copy.otherRegions.eyebrow}</p>
                  <h2 id="city-other-title"><KeepWords locale="ja" text={copy.otherRegions.title} /></h2>
                  <p className={exploreStyles.tourCount}>{copy.citySection.tourCount(otherTours.length)}</p>
                </div>
                <div className={exploreStyles.citySummary}>
                  <p>{copy.otherRegions.intro}</p>
                </div>
              </div>
              <ul className={toursStyles.quickList}>
                {otherTours.map((tour) => <JapaneseTourQuickCard key={tour.slug} tour={tour} />)}
              </ul>
            </section>
          ) : null}
        </div>

        <section className={styles.handoff} aria-labelledby="destination-handoff-title" id="contact">
          <div>
            <p className={styles.eyebrow}>{copy.handoff.eyebrow}</p>
            <h2 id="destination-handoff-title"><KeepWords locale="ja" text={copy.handoff.title} /></h2>
            <div className={styles.handoffActions}>
              <Link className={styles.primaryAction} href={japaneseSite.tours}>
                {copy.handoff.toursAction}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <JapaneseContactPanel
            body={copy.handoff.body}
            emailHref={contact.email}
            headingId="ja-explore-contact-title"
            title={copy.handoff.contactTitle}
            whatsappHref={contact.whatsapp}
          />
        </section>
      </main>

      <JapaneseSiteFooter currentPath={japaneseSite.explore} />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
    </div>
  );
}
