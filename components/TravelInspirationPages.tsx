import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { destinationEditionNavigation } from "../lib/destinationEditionNavigation";
import { destinationHubIds } from "../lib/destinationHubs";
import { editionEnglishMarker } from "../lib/editionEnglishMarker";
import { generatedImageSrcSet } from "../lib/generatedImageSrcSet";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getPublishedPrivateTourCatalog } from "../lib/publishedPrivateTourCatalog";
import { serviceEditionLabels, serviceEditionPaths } from "../lib/serviceEdition";
import type { SightsHubEditionLocale } from "../lib/sightsEditions";
import {
  getTravelInspirationTheme,
  travelInspirationEditionPath,
  travelInspirationHubLanguagePaths,
  travelInspirationPath,
  travelInspirationThemePath,
  travelInspirationThemePaths,
  travelInspirationThemes,
  type TravelInspirationTheme,
  type TravelInspirationThemeId,
} from "../lib/travelInspiration";
import { getTravelInspirationEditionCopy } from "../lib/travelInspirationEditions";
import { getTravelInspirationCopy } from "../lib/travelInspirationI18n";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  CityStrip,
  JsonLd,
  navigationFor,
  ServiceRows,
  SITE_URL,
  PlanTile,
  TourCard,
} from "./DestinationParts";
import { EditionSiteFooter, EditionSiteHeader } from "./EditionSiteChrome";
import { HomegroundFooter } from "./HomegroundFooter";
import { TourPhotoCredits } from "./PhotoCredits";
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
 *
 * `editionLocale` renders the French, Spanish, German or Arabic hub
 * (/fr/inspiration/ and the others): the same sections in the edition's words,
 * header and footer. The theme and city pages stay English, so those links
 * carry the edition's marker; tours and services link the edition's own pages.
 */
export function TravelInspirationHubPage({ locale = "en", editionLocale }: { locale?: HomegroundLocale; editionLocale?: SightsHubEditionLocale }) {
  const home = getHomegroundCopy(locale);
  const copy = editionLocale ? getTravelInspirationEditionCopy(editionLocale) : getTravelInspirationCopy(locale);
  const marker = editionLocale ? editionEnglishMarker[editionLocale] : null;
  const { destinations, tours } = editionLocale
    ? {
        // The edition's own destinations hub (/fr/explore/ and the others), so no English marker.
        destinations: { label: getTravelInspirationEditionCopy(editionLocale).destinations, href: destinationEditionNavigation[editionLocale].destinationsHref },
        tours: { href: serviceEditionPaths(editionLocale).tours },
      }
    : navigationFor(locale);
  const path = editionLocale ? travelInspirationEditionPath[editionLocale] : travelInspirationPath[locale];
  const url = `${SITE_URL}${path}`;
  const language = editionLocale ?? home.htmlLang;
  const crumbs: { name: string; path?: string; hrefLang?: string }[] = [
    { name: copy.home, path: editionLocale ? serviceEditionPaths(editionLocale).home : home.path },
    ...(destinations ? [{ name: destinations.label, path: destinations.href }] : []),
    { name: copy.hub.h1 },
  ];
  // Words as written in an edition; Chinese and Korean keep their own line breaking.
  const text = (value: string) => (editionLocale ? value : <KeepWords locale={locale} text={value} />);

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={editionLocale ?? locale} lang={language}>
      <a className={localeStyles.skipLink} href="#inspiration-main">{editionLocale ? serviceEditionLabels[editionLocale].skipLink : home.skipLink}</a>
      {editionLocale
        ? <EditionSiteHeader currentPath={path} language={editionLocale} languagePaths={travelInspirationHubLanguagePaths()} />
        : <HomegroundHeader languagePaths={travelInspirationPath} locale={locale} pageContext="destination" />}
      <main id="inspiration-main" tabIndex={-1}>
        <RevealOnce />

        <header className={styles.hero}>
          <Breadcrumb items={crumbs} label={copy.breadcrumb} />
          <h1>{copy.hub.h1}</h1>
          <p className={styles.lede}>{text(copy.hub.lede)}</p>
        </header>

        <section aria-labelledby="inspiration-themes-title" className={styles.section}>
          <h2 id="inspiration-themes-title">{copy.hub.themesTitle}</h2>
          <ul className={styles.themes}>
            {travelInspirationThemes.map((theme, themeIndex) => {
              const themeCopy = copy.themes[theme.id];
              const routes = theme.tourGroups.reduce((count, group) => count + group.tourSlugs.length, 0);
              return (
                <li key={theme.id}>
                  <Link className={styles.themeCard} href={travelInspirationThemePath(theme.id, editionLocale ? "en" : locale)} hrefLang={editionLocale ? "en" : undefined}>
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
                      <span className={styles.themeTeaser}>{text(themeCopy.teaser)}</span>
                      {/* What the page holds, by length: a preview, not separate links. */}
                      <span className={styles.themeGroups}>
                        {theme.tourGroups.map((group) => (
                          <span key={group.id}>
                            {themeCopy.groups[group.id]?.title}
                            <small>{copy.hub.routeCount(group.tourSlugs.length)}</small>
                          </span>
                        ))}
                      </span>
                      <span className={styles.cardAction}>{marker ? `${copy.hub.themeAction} ${marker}` : copy.hub.themeAction}<ArrowRight aria-hidden="true" size={16} /></span>
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
              <p>{text(copy.hub.citiesLede)}</p>
            </div>
            {destinations ? (
              <Link className={styles.textLink} href={destinations.href}>{copy.hub.allCities}<ArrowRight aria-hidden="true" size={15} /></Link>
            ) : null}
          </div>
          <CityStrip cityIds={destinationHubIds} columns={4} editionLocale={editionLocale} locale={locale} />
        </section>

        <section aria-labelledby="inspiration-cta-title" className={styles.cta} data-reveal="">
          <div>
            <h2 id="inspiration-cta-title">{copy.hub.ctaTitle}</h2>
            <p>{text(copy.hub.ctaBody)}</p>
            {tours ? (
              <Link className={styles.textLink} href={tours.href}>{copy.hub.allTours}<ArrowRight aria-hidden="true" size={15} /></Link>
            ) : null}
          </div>
          <ServiceRows editionLocale={editionLocale} locale={locale} />
        </section>
      </main>
      {editionLocale
        ? <EditionSiteFooter currentPath={path} language={editionLocale} />
        : <HomegroundFooter locale={locale} pageContext="destination" />}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: copy.hub.metadata.title, description: copy.hub.metadata.description,
            inLanguage: language, isPartOf: { "@id": `${SITE_URL}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` },
            mainEntity: { "@type": "ItemList", itemListElement: travelInspirationThemes.map((theme, index) => ({
              "@type": "ListItem", position: index + 1, name: copy.themes[theme.id].name, url: `${SITE_URL}${travelInspirationThemePath(theme.id, editionLocale ? "en" : locale)}`,
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
  const { destinations, tours: toursItem } = navigationFor(locale);
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
                  <PlanTile count={group.tours.length} locale={locale} />
                </ul>
                <TourPhotoCredits locale={locale} tours={group.tours} />
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
