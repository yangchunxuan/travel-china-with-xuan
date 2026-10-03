import Link from "next/link";
import { ArrowDown, ArrowRight, Route, Ticket, UserRound } from "lucide-react";
import type { CSSProperties } from "react";
import { destinationHubIds, getDestinationHubEntry, type DestinationHubId } from "../lib/destinationHubs";
import { generatedImageSrcSet } from "../lib/generatedImageSrcSet";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getHomegroundNavigationModel, type HomegroundSubmenuId } from "../lib/homegroundNavigationModel";
import { getPublishedPrivateTourCatalog, type PublishedPrivateTourCatalogItem } from "../lib/publishedPrivateTourCatalog";
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
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { RevealOnce } from "./motion/RevealOnce";
import { privateTourCardImageSource, privateTourCardImageSrcSet } from "./privateTourCardImages";
import { KeepStops, KeepWords } from "./text/KeepWords";
import styles from "./TravelInspiration.module.css";

const SITE_URL = "https://homegroundchina.com";

/** Reveal stagger: cards settle left to right in rows of up to four. */
const revealDelay = (index: number) => ({ "--d": `${(index % 4) * 60}ms` }) as CSSProperties;

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

function navigationFor(locale: HomegroundLocale) {
  const home = getHomegroundCopy(locale);
  const navigation = getHomegroundNavigationModel(locale, home.path);
  return {
    destinations: navigation.items.find((item) => item.id === "destinations"),
    tours: navigation.items.find((item) => item.id === "tours"),
    services: navigation.menus.services?.entries ?? [],
  };
}

function breadcrumbJsonLd(url: string, items: readonly { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function Breadcrumb({ label, items }: { label: string; items: readonly { name: string; path?: string }[] }) {
  return (
    <nav aria-label={label} className={styles.breadcrumb}>
      <ol>
        {items.map((item, index) => (
          <li aria-current={item.path ? undefined : "page"} key={item.name}>
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.path ? <Link href={item.path}>{item.name}</Link> : item.name}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Cities as a compact strip (thumbnail, name, what it is for), not as the
 * city index's cards: here they are a way on, and /explore/ stays the place
 * that compares them.
 */
function CityStrip({ cityIds, locale, columns }: { cityIds: readonly DestinationHubId[]; locale: HomegroundLocale; columns: number }) {
  const copy = getTravelInspirationCopy(locale);
  return (
    <ul className={styles.cityStrip} style={{ "--cols": columns } as CSSProperties}>
      {cityIds.map((id, index) => {
        const hub = getDestinationHubEntry(id, locale);
        return (
          <li key={id} style={revealDelay(index)}>
            <Link className={styles.cityRow} href={hub.path}>
              <span className={styles.cityThumb}>
                <img
                  alt=""
                  decoding="async"
                  height={hub.imageHeight}
                  loading="lazy"
                  sizes="7rem"
                  src={hub.heroImagePath}
                  srcSet={generatedImageSrcSet(hub.heroImagePath, hub.imageWidth)}
                  width={hub.imageWidth}
                />
              </span>
              <span className={styles.cityText}>
                <strong>{hub.navTitle}</strong>
                <span><KeepWords locale={locale} text={copy.cities[id]} /></span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const nbsp = String.fromCharCode(0xa0);

/** Names that must not split across lines: Korean "프라이빗 투어", English "Hong Kong". */
function tourTitle(title: string, locale: HomegroundLocale) {
  if (locale === "ko") return title.replace("프라이빗 투어", `프라이빗${nbsp}투어`);
  if (locale === "en") return title.replace("Hong Kong", `Hong${nbsp}Kong`);
  return title;
}

function TourCard({ tour, locale, index }: { tour: PublishedPrivateTourCatalogItem; locale: HomegroundLocale; index: number }) {
  const copy = getTravelInspirationCopy(locale);
  return (
    <li style={revealDelay(index)}>
      <Link className={styles.tourCard} href={tour.href}>
        <span className={styles.tourMedia}>
          <img
            alt=""
            decoding="async"
            height={tour.image.height}
            loading="lazy"
            sizes="(max-width: 40rem) 9.5rem, (max-width: 61.25rem) 45vw, 24rem"
            src={privateTourCardImageSource(tour.id, 640)}
            srcSet={privateTourCardImageSrcSet(tour.id)}
            style={{ objectPosition: tour.image.objectPosition }}
            width={tour.image.width}
          />
          <span className={styles.days}>{copy.theme.days(tour.days)}</span>
        </span>
        <span className={styles.tourText}>
          <h4><KeepWords locale={locale} text={tourTitle(tour.title, locale)} /></h4>
          <span className={styles.route}><KeepStops route={tour.comparison.route} /></span>
          <span className={styles.fit}><KeepWords locale={locale} text={tour.comparison.fit} /></span>
        </span>
        <span className={styles.cardAction}>{copy.theme.tourAction}<ArrowRight aria-hidden="true" size={15} /></span>
      </Link>
    </li>
  );
}

const serviceIcons: Partial<Record<HomegroundSubmenuId, typeof Route>> = {
  "trip-support": Route,
  "english-guides": UserRound,
  "attraction-tickets": Ticket,
};

/** The services, named and described exactly as the header's Services menu does. */
function ServiceRows({ locale }: { locale: HomegroundLocale }) {
  // A trip that no route fits leads first to full-trip planning.
  const ordered = [...navigationFor(locale).services].sort((a, b) => Number(b.id === "trip-support") - Number(a.id === "trip-support"));
  return (
    <ul className={styles.services}>
      {ordered.map((entry, index) => {
        const Icon = serviceIcons[entry.id] ?? Route;
        return (
          <li key={entry.id} style={revealDelay(index)}>
            <Link className={styles.serviceRow} href={entry.href}>
              <span aria-hidden="true" className={styles.serviceIcon}><Icon size={18} strokeWidth={1.7} /></span>
              <span className={styles.serviceText}>
                <strong>{entry.label}</strong>
                <span>{entry.description}</span>
              </span>
              <ArrowRight aria-hidden="true" className={styles.serviceArrow} size={17} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
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
                    <li className={styles.planTileItem} style={revealDelay(group.tours.length)}>
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
