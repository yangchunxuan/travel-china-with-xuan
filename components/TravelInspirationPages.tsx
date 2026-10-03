import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, Route } from "lucide-react";
import { destinationHubIds } from "../lib/destinationHubs";
import { generatedImageSrcSet } from "../lib/generatedImageSrcSet";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getPublishedPrivateTourCatalog } from "../lib/publishedPrivateTourCatalog";
import {
  getTravelInspirationTheme,
  travelInspirationPath,
  travelInspirationThemePath,
  travelInspirationThemePaths,
  travelInspirationThemes,
  type TravelInspirationTheme,
  type TravelInspirationThemeId,
} from "../lib/travelInspiration";
import { getTravelInspirationCopy } from "../lib/travelInspirationI18n";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  CityStrip,
  JsonLd,
  navigationFor,
  revealDelay,
  ServiceRows,
  SITE_URL,
  TourCard,
} from "./DestinationParts";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { RevealOnce } from "./motion/RevealOnce";
import { KeepWords } from "./text/KeepWords";
import styles from "./TravelInspiration.module.css";

/** The theme's tours, in the theme's order, from the published catalogue only. */
function themeTours(theme: TravelInspirationTheme, locale: HomegroundLocale) {
  const catalog = getPublishedPrivateTourCatalog(locale);
  const bySlug = new Map(catalog.map((item) => [item.slug, item]));
  return theme.tourGroups.map((group) => ({
    id: group.id,
    tours: group.tourSlugs.map((slug) => {
      const tour = bySlug.get(slug);
      if (!tour) throw new Error(`Travel inspiration "${theme.id}" names an unpublished tour: ${slug}`);
      return tour;
    }),
  }));
}

/**
 * /inspiration/: Travel Inspiration, the second row of the Destinations menu.
 * Themes first (one featured, later ones two to a row), then the cities as a
 * compact strip, then the services. Grok language, as the services pages.
 */
export function TravelInspirationHubPage({ locale = "en" }: { locale?: HomegroundLocale }) {
  const home = getHomegroundCopy(locale);
  const copy = getTravelInspirationCopy(locale);
  const { destinations, tours } = navigationFor(locale);
  const path = travelInspirationPath[locale];
  const url = `${SITE_URL}${path}`;
  const crumbs = [
    { name: copy.home, path: home.path },
    ...(destinations ? [{ name: destinations.label, path: destinations.href }] : []),
    { name: copy.hub.h1 },
  ];

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#inspiration-main">{home.skipLink}</a>
      <HomegroundHeader languagePaths={travelInspirationPath} locale={locale} pageContext="destination" />
      <main id="inspiration-main" tabIndex={-1}>
        <RevealOnce />

        <header className={styles.hero}>
          <Breadcrumb items={crumbs} label={copy.breadcrumb} />
          <h1>{copy.hub.h1}</h1>
          <p className={styles.lede}><KeepWords locale={locale} text={copy.hub.lede} /></p>
        </header>

        <section aria-labelledby="inspiration-themes-title" className={styles.section}>
          <h2 id="inspiration-themes-title">{copy.hub.themesTitle}</h2>
          <ul className={styles.themes}>
            {travelInspirationThemes.map((theme, themeIndex) => {
              const themeCopy = copy.themes[theme.id];
              const routes = theme.tourGroups.reduce((count, group) => count + group.tourSlugs.length, 0);
              return (
                <li key={theme.id}>
                  <Link className={styles.themeCard} href={travelInspirationThemePath(theme.id, locale)}>
                    <span className={styles.themeMedia}>
                      <img
                        alt=""
                        decoding="async"
                        fetchPriority={themeIndex === 0 ? "high" : undefined}
                        height={theme.image.height}
                        loading={themeIndex === 0 ? undefined : "lazy"}
                        sizes="(max-width: 61.25rem) calc(100vw - 2rem), 40rem"
                        src={theme.image.src}
                        srcSet={generatedImageSrcSet(theme.image.src, theme.image.width)}
                        width={theme.image.width}
                      />
                    </span>
                    <span className={styles.themeText}>
                      <span className={styles.themeCount}>{copy.hub.routeCount(routes)}</span>
                      <h3>{themeCopy.name}</h3>
                      <span className={styles.themeTeaser}><KeepWords locale={locale} text={themeCopy.teaser} /></span>
                      {/* What the page holds, by length: a preview, not separate links. */}
                      <span className={styles.themeGroups}>
                        {theme.tourGroups.map((group) => (
                          <span key={group.id}>
                            {themeCopy.groups[group.id]?.title}
                            <small>{copy.hub.routeCount(group.tourSlugs.length)}</small>
                          </span>
                        ))}
                      </span>
                      <span className={styles.cardAction}>{copy.hub.themeAction}<ArrowRight aria-hidden="true" size={16} /></span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="inspiration-cities-title" className={styles.section} data-reveal="">
          <div className={styles.sectionHead}>
            <div>
              <h2 id="inspiration-cities-title">{copy.hub.citiesTitle}</h2>
              <p><KeepWords locale={locale} text={copy.hub.citiesLede} /></p>
            </div>
            {destinations ? (
              <Link className={styles.textLink} href={destinations.href}>{copy.hub.allCities}<ArrowRight aria-hidden="true" size={15} /></Link>
            ) : null}
          </div>
          <CityStrip cityIds={destinationHubIds} columns={4} locale={locale} />
        </section>

        <section aria-labelledby="inspiration-cta-title" className={styles.cta} data-reveal="">
          <div>
            <h2 id="inspiration-cta-title">{copy.hub.ctaTitle}</h2>
            <p><KeepWords locale={locale} text={copy.hub.ctaBody} /></p>
            {tours ? (
              <Link className={styles.textLink} href={tours.href}>{copy.hub.allTours}<ArrowRight aria-hidden="true" size={15} /></Link>
            ) : null}
          </div>
          <ServiceRows locale={locale} />
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="destination" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: copy.hub.metadata.title, description: copy.hub.metadata.description,
            inLanguage: home.htmlLang, isPartOf: { "@id": `${SITE_URL}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` },
            mainEntity: { "@type": "ItemList", itemListElement: travelInspirationThemes.map((theme, index) => ({
              "@type": "ListItem", position: index + 1, name: copy.themes[theme.id].name, url: `${SITE_URL}${travelInspirationThemePath(theme.id, locale)}`,
            })) } },
          breadcrumbJsonLd(url, crumbs.map((crumb) => ({ name: crumb.name, path: crumb.path ?? path }))),
        ],
      }} />
    </div>
  );
}

/**
 * /inspiration/<theme>/: one theme. The routes come first, grouped by trip
 * length and drawn from the published catalogue (title, photo, route, who it
 * suits); a row that is not full ends with the way to a trip planned around
 * you. Then the cities the routes pass through, then the services. Later
 * passes add the theme's own writing between them.
 */
export function TravelInspirationThemePage({ locale = "en", themeId }: { locale?: HomegroundLocale; themeId: TravelInspirationThemeId }) {
  const theme = getTravelInspirationTheme(themeId);
  if (!theme) throw new Error(`Unknown travel inspiration theme: ${themeId}`);
  const home = getHomegroundCopy(locale);
  const copy = getTravelInspirationCopy(locale);
  const themeCopy = copy.themes[themeId];
  const { destinations, tours: toursItem, services } = navigationFor(locale);
  const fullTrip = services.find((entry) => entry.id === "trip-support");
  const groups = themeTours(theme, locale);
  const allTours = groups.flatMap((group) => group.tours);
  const days = allTours.map((tour) => tour.days);
  const paths = travelInspirationThemePaths(themeId);
  const url = `${SITE_URL}${paths[locale]}`;
  const crumbs = [
    { name: copy.home, path: home.path },
    ...(destinations ? [{ name: destinations.label, path: destinations.href }] : []),
    { name: copy.hub.h1, path: travelInspirationPath[locale] },
    { name: themeCopy.name },
  ];

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#inspiration-main">{home.skipLink}</a>
      <HomegroundHeader languagePaths={paths} locale={locale} pageContext="destination" />
      <main id="inspiration-main" tabIndex={-1}>
        <RevealOnce />

        <header className={`${styles.hero} ${styles.themeHero}`}>
          <Breadcrumb items={crumbs} label={copy.breadcrumb} />
          <div className={styles.themeHeroGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.theme.facts(allTours.length, Math.min(...days), Math.max(...days))}</p>
              <h1>{themeCopy.h1Lines.map((line) => <span key={line}>{line}</span>)}</h1>
              <p className={styles.lede}><KeepWords locale={locale} text={themeCopy.lede} /></p>
              <a className={styles.primaryButton} href="#routes">{copy.theme.jumpToRoutes}<ArrowDown aria-hidden="true" size={18} /></a>
            </div>
            {/* Phones go straight from the words to the routes (the routes carry photos). */}
            <figure className={styles.heroMedia}>
              <img
                alt={themeCopy.imageAlt}
                decoding="async"
                fetchPriority="high"
                height={theme.image.height}
                sizes="(max-width: 61.25rem) calc(100vw - 3rem), 32rem"
                src={theme.image.src}
                srcSet={generatedImageSrcSet(theme.image.src, theme.image.width)}
                width={theme.image.width}
              />
            </figure>
          </div>
        </header>

        <section aria-labelledby="inspiration-routes-title" className={styles.section} id="routes">
          <h2 id="inspiration-routes-title">{copy.theme.routesTitle}</h2>
          {groups.map((group) => {
            const groupCopy = themeCopy.groups[group.id];
            return (
              <div className={styles.group} data-reveal="" id={`routes-${group.id}`} key={group.id}>
                <div className={styles.groupHead}>
                  <h3>{groupCopy?.title}</h3>
                  {groupCopy?.note ? <p><KeepWords locale={locale} text={groupCopy.note} /></p> : null}
                </div>
                <ul className={styles.tours}>
                  {group.tours.map((tour, index) => <TourCard index={index} key={tour.slug} locale={locale} tour={tour} />)}
                  {fullTrip && group.tours.length % 3 !== 0 ? (
                    <li className={styles.planTileItem} style={{ ...revealDelay(group.tours.length), "--span": 3 - (group.tours.length % 3) } as CSSProperties}>
                      <Link className={styles.planTile} href={fullTrip.href}>
                        <span aria-hidden="true" className={styles.planIcon}><Route size={18} strokeWidth={1.7} /></span>
                        <strong>{copy.theme.planTile.title}</strong>
                        <span><KeepWords locale={locale} text={copy.theme.planTile.body} /></span>
                        <span className={styles.cardAction}>{copy.theme.planTile.action}<ArrowRight aria-hidden="true" size={15} /></span>
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            );
          })}
        </section>

        <section aria-labelledby="inspiration-cities-title" className={styles.section} data-reveal="">
          <div className={styles.sectionHead}>
            <div>
              <h2 id="inspiration-cities-title">{themeCopy.citiesTitle}</h2>
              <p><KeepWords locale={locale} text={themeCopy.citiesLede} /></p>
            </div>
          </div>
          <CityStrip cityIds={theme.cityIds} columns={3} locale={locale} />
        </section>

        <section aria-labelledby="inspiration-services-title" className={styles.cta} data-reveal="">
          <div>
            <h2 id="inspiration-services-title">{themeCopy.servicesTitle}</h2>
            <p><KeepWords locale={locale} text={themeCopy.servicesLede} /></p>
            {toursItem ? (
              <Link className={styles.textLink} href={toursItem.href}>{copy.hub.allTours}<ArrowRight aria-hidden="true" size={15} /></Link>
            ) : null}
          </div>
          <ServiceRows locale={locale} />
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="destination" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: themeCopy.metadata.title, description: themeCopy.metadata.description,
            inLanguage: home.htmlLang, isPartOf: { "@id": `${SITE_URL}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` },
            mainEntity: { "@type": "ItemList", itemListElement: allTours.map((tour, index) => ({
              "@type": "ListItem", position: index + 1, name: tour.title, url: `${SITE_URL}${tour.href}`,
            })) } },
          breadcrumbJsonLd(url, crumbs.map((crumb) => ({ name: crumb.name, path: crumb.path ?? paths[locale] }))),
        ],
      }} />
    </div>
  );
}
