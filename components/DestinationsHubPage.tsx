import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  destinationHubRegistry,
  type DestinationHubId,
} from "../lib/destinationHubs";
import { getDestinationsHubCopy } from "../lib/destinationsHubI18n";
import { destinationEditionCityLink, destinationsHubEditionPath, type DestinationsHubEditionLocale } from "../lib/destinationEditions";
import { destinationsHubLanguagePaths } from "../lib/destinationEditionMetadata";
import { withEditionEnglishMarker } from "../lib/destinationEditionUi";
import { getDestinationsHubEditionCopy } from "../lib/destinationsHubEditions";
import { getGuideLanguagePaths, type GuideId } from "../lib/guideRegistry";
import { serviceEditionLabels, serviceEditionPaths } from "../lib/serviceEdition";
import { getSightsEditionCopy } from "../lib/sightsEditions";
import { getTravelInspirationEditionCopy } from "../lib/travelInspirationEditions";
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
import { travelInspirationEditionPath, travelInspirationPath } from "../lib/travelInspiration";
import { getTravelInspirationCopy } from "../lib/travelInspirationI18n";
import { EditionSiteFooter, EditionSiteHeader } from "./EditionSiteChrome";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { PointerSpotlight } from "./motion/PointerSpotlight";
import { KeepWords } from "./text/KeepWords";
import styles from "./DestinationsHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";

/*
 * City-centre coordinates for the schematic plot beside the city cards. The
 * plot is decorative (aria-hidden): dots on a latitude/longitude grid with
 * the city name, no borders or routes. Longitude is scaled by cos(31°N) so
 * distances read roughly true across the plotted band.
 */
const CITY_COORDINATES: Record<DestinationHubId, { lat: number; lon: number }> = {
  beijing: { lat: 39.9, lon: 116.4 },
  shanghai: { lat: 31.23, lon: 121.47 },
  xian: { lat: 34.34, lon: 108.94 },
  chengdu: { lat: 30.57, lon: 104.07 },
  guangzhou: { lat: 23.13, lon: 113.26 },
  hangzhou: { lat: 30.27, lon: 120.16 },
  zhangjiajie: { lat: 29.12, lon: 110.48 },
  chongqing: { lat: 29.56, lon: 106.55 },
};
// Labels sit right of the dot; crowded dots move theirs above or below.
const LABEL_SIDE: Partial<Record<DestinationHubId, "above" | "below">> = {
  chengdu: "above",
  chongqing: "below",
  hangzhou: "below",
};
const PLOT = { west: 102, east: 124, north: 42, south: 21 };
const PLOT_WIDTH = 400;
const LON_SCALE = Math.cos((31 * Math.PI) / 180);
const PLOT_UNIT = PLOT_WIDTH / ((PLOT.east - PLOT.west) * LON_SCALE);
const PLOT_HEIGHT = Math.round((PLOT.north - PLOT.south) * PLOT_UNIT);
const plotX = (lon: number) => (lon - PLOT.west) * LON_SCALE * PLOT_UNIT;
const plotY = (lat: number) => (PLOT.north - lat) * PLOT_UNIT;
// 1° of latitude is 111.32 km, and the longitude scale above makes 1 km the
// same length in both directions around 31°N.
const SCALE_KM = 500;
const SCALE_LENGTH = (SCALE_KM / 111.32) * PLOT_UNIT;

export function CityPlot({
  locale,
  labels,
  ltr = false,
}: {
  locale: HomegroundLocale;
  /** City names for a page outside the three hub locales (the Japanese explore page and the editions). */
  labels?: Readonly<Record<DestinationHubId, string>>;
  /** On a right-to-left page the plot keeps its left-to-right layout: labels to the right of their dots, "500 km" read as written. */
  ltr?: boolean;
}) {
  return (
    <svg
      className={styles.plot}
      direction={ltr ? "ltr" : undefined}
      viewBox={`-36 -8 ${PLOT_WIDTH + 44} ${PLOT_HEIGHT + 34}`}
      aria-hidden="true"
      focusable="false"
    >
      {[25, 30, 35, 40].map((lat) => (
        <g className={styles.graticule} key={lat}>
          <line x1={0} x2={PLOT_WIDTH} y1={plotY(lat)} y2={plotY(lat)} pathLength={1} />
          <text x={-8} y={plotY(lat)} textAnchor="end" dominantBaseline="middle">
            {lat}°N
          </text>
        </g>
      ))}
      {[105, 110, 115, 120].map((lon) => (
        <g className={styles.graticule} key={lon}>
          <line x1={plotX(lon)} x2={plotX(lon)} y1={PLOT_HEIGHT} y2={0} pathLength={1} />
          <text x={plotX(lon)} y={PLOT_HEIGHT + 18} textAnchor="middle">
            {lon}°E
          </text>
        </g>
      ))}
      <g className={styles.plotScale}>
        <line
          x1={PLOT_WIDTH - SCALE_LENGTH}
          x2={PLOT_WIDTH}
          y1={PLOT_HEIGHT - 12}
          y2={PLOT_HEIGHT - 12}
        />
        <text x={PLOT_WIDTH - SCALE_LENGTH / 2} y={PLOT_HEIGHT - 22} textAnchor="middle">
          {SCALE_KM} km
        </text>
      </g>
      {destinationHubRegistry.map((hub, index) => {
        const { lat, lon } = CITY_COORDINATES[hub.id];
        const x = plotX(lon);
        const y = plotY(lat);
        const side = LABEL_SIDE[hub.id];
        return (
          <g
            className={styles.plotCity}
            data-city={hub.id}
            key={hub.id}
            style={{ "--plot-index": index } as CSSProperties}
          >
            <line className={styles.plotCross} x1={x} x2={0} y1={y} y2={y} pathLength={1} />
            <line className={styles.plotCross} x1={x} x2={x} y1={y} y2={PLOT_HEIGHT} pathLength={1} />
            <circle className={styles.plotPing} cx={x} cy={y} r={7} />
            <circle className={styles.plotHalo} cx={x} cy={y} r={11} />
            <circle className={styles.plotDot} cx={x} cy={y} r={4.5} />
            <text
              className={styles.plotLabel}
              x={side ? x : x + 11}
              y={side === "below" ? y + 20 : side === "above" ? y - 18 : y}
              textAnchor={side ? "middle" : "start"}
              dominantBaseline="middle"
            >
              {labels?.[hub.id] ?? hub.locales[locale].navTitle}
            </text>
            <text className={styles.plotReadout} x={PLOT_WIDTH} y={8} textAnchor="end">
              {lat.toFixed(2)}°N · {lon.toFixed(2)}°E
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * The hub in an edition (`editionLocale`): the English hub's sections in the
 * edition's words (lib/destinationsHubEditions.ts), inside its header and
 * footer. A city card opens the edition's city page where there is one and
 * otherwise the English page, marked; the place indexes and the winter guide
 * stay English and are marked; guides, tours and Travel Inspiration are the
 * edition's own pages.
 */
function editionHub(language: DestinationsHubEditionLocale) {
  const copy = getDestinationsHubEditionCopy(language);
  const inspiration = getTravelInspirationEditionCopy(language);
  const names = getSightsEditionCopy(language).cities;
  const paths = serviceEditionPaths(language);
  const winterGuide = "/guides/china-in-winter/";
  const localWinterGuide = getGuideLanguagePaths("china-in-winter" as GuideId)[language];
  return {
    language,
    path: destinationsHubEditionPath[language],
    home: { path: paths.home, label: inspiration.home, skipLink: serviceEditionLabels[language].skipLink },
    breadcrumbLabel: inspiration.breadcrumb,
    currentLabel: inspiration.destinations,
    section: copy.section,
    fromCities: { lead: inspiration.fromCities.lead, label: inspiration.fromCities.label, href: travelInspirationEditionPath[language] },
    copy,
    names,
    cities: destinationHubRegistry.map((hub) => {
      const link = destinationEditionCityLink(language, hub.id);
      return {
        hub,
        name: names[hub.id],
        alt: copy.cityImageAlt[hub.id],
        href: link.href,
        hrefLang: link.english ? "en" : undefined,
        action: link.english ? withEditionEnglishMarker(language, copy.openCity) : copy.openCity,
      };
    }),
    winterGuide: localWinterGuide
      ? { href: localWinterGuide, label: copy.winterGuideLabel, hrefLang: undefined }
      : { href: winterGuide, label: withEditionEnglishMarker(language, copy.winterGuideLabel), hrefLang: "en" },
    openScale: withEditionEnglishMarker(language, copy.openScale),
    guidesPath: paths.guides,
    toursPath: paths.tours,
    languagePaths: destinationsHubLanguagePaths(),
  };
}

function jsonLdForDestinations(locale: HomegroundLocale, edition?: ReturnType<typeof editionHub>) {
  const home = getHomegroundCopy(locale);
  const copy = getDestinationsHubCopy(locale);
  const entry = getSearchHubEntry("explore", locale);
  const canonicalUrl = `${SITE_URL}${edition?.path ?? entry.canonicalPath}`;
  const listId = `${canonicalUrl}#city-hubs`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: edition?.section.title ?? entry.h1,
        description: edition?.section.description ?? entry.description,
        inLanguage: edition?.language ?? home.htmlLang,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        mainEntity: { "@id": listId },
        sameAs: edition
          ? Object.values(edition.languagePaths).map((path) => `${SITE_URL}${path}`)
          : Object.values(absoluteManifestAlternates(entry)),
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
            name: edition?.home.label ?? copy.homeLabel,
            item: `${SITE_URL}${edition?.home.path ?? home.path}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: edition?.currentLabel ?? copy.currentLabel,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": listId,
        numberOfItems: destinationHubRegistry.length,
        itemListElement: edition
          ? edition.cities.map((city, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: city.name,
              url: `${SITE_URL}${city.href}`,
            }))
          : destinationHubRegistry.map((hub, index) => ({
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
  editionLocale,
}: {
  locale?: HomegroundLocale;
  /** The French, German, Spanish or Arabic hub (/fr/explore/ and the others). */
  editionLocale?: DestinationsHubEditionLocale;
}) {
  const edition = editionLocale ? editionHub(editionLocale) : null;
  const home = getHomegroundCopy(locale);
  const copy = getDestinationsHubCopy(locale);
  const platform = getSearchPlatformCopy(locale);
  const section = edition?.section ?? platform.sections.explore;
  const inspiration = getTravelInspirationCopy(locale);
  const languagePaths = getSearchHubLanguagePaths("explore");
  const placeCollections = searchCollections.filter(
    (collection) => collection.section === "explore",
  );
  const schema = jsonLdForDestinations(locale, edition ?? undefined);
  // Line breaking: the locale's own; an edition's words as written.
  const textLocale = edition ? "en" : locale;

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.page}`}
      data-homeground-locale={editionLocale ?? locale}
      dir={editionLocale === "ar" ? "rtl" : undefined}
      lang={editionLocale ?? home.htmlLang}
    >
      <a className={localeStyles.skipLink} href="#destinations-main">
        {edition?.home.skipLink ?? home.skipLink}
      </a>
      {edition && editionLocale ? (
        <EditionSiteHeader currentPath={edition.path} language={editionLocale} languagePaths={edition.languagePaths} />
      ) : (
        <HomegroundHeader
          languagePaths={languagePaths}
          locale={locale}
          pageContext="destinations"
        />
      )}

      <main id="destinations-main" tabIndex={-1}>
        <PointerSpotlight />
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <nav aria-label={edition?.breadcrumbLabel ?? copy.breadcrumbLabel} className={styles.breadcrumb}>
              <ol>
                <li>
                  <Link href={edition?.home.path ?? home.path}>{edition?.home.label ?? copy.homeLabel}</Link>
                </li>
                <li aria-current="page">
                  <span aria-hidden="true">/</span>
                  {edition?.currentLabel ?? copy.currentLabel}
                </li>
              </ol>
            </nav>

            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>{section.eyebrow}</p>
                <h1><AnimatedHeadline locale={textLocale} text={section.title} /></h1>
                <p className={styles.lede}>{section.description}</p>
                <p className={styles.inspirationLink}>
                  {edition?.fromCities.lead ?? inspiration.fromCities.lead}{" "}
                  <Link href={edition?.fromCities.href ?? travelInspirationPath[locale]}>{edition?.fromCities.label ?? inspiration.fromCities.label}<span aria-hidden="true"> →</span></Link>
                </p>
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
              <p className={styles.eyebrow}>{edition?.copy.cityEyebrow ?? copy.cityEyebrow}</p>
              <h2 id="city-hubs-title"><KeepWords locale={textLocale} text={edition?.copy.cityTitle ?? copy.cityTitle} /></h2>
            </div>
            <div>
              <p>{(edition?.copy ?? copy).cityIntroduction(destinationHubRegistry.length)}</p>
              <p className={styles.count}>
                {(edition?.copy ?? copy).cityCount(destinationHubRegistry.length)}
              </p>
            </div>
          </div>

          <div className={styles.cityLayout}>
          <div className={styles.plotPanel}>
            <CityPlot labels={edition?.names} locale={locale} ltr={editionLocale === "ar"} />
          </div>
          <ol className={styles.cityGrid}>
            {destinationHubRegistry.map((hub, index) => {
              const city = hub.locales[locale];
              const editionCity = edition?.cities[index];
              const comparison = (edition?.copy ?? copy).cityComparisons[hub.id];
              return (
                <li key={hub.id}>
                  <Link href={editionCity?.href ?? city.path} hrefLang={editionCity?.hrefLang}>
                    <span className={styles.number} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <figure className={styles.cityImage} data-city={hub.id}>
                      <Image
                        src={hub.heroImagePath}
                        alt={editionCity?.alt ?? city.heroAlt}
                        width={hub.imageWidth}
                        height={hub.imageHeight}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 40rem) 6.5rem, (max-width: 61.25rem) calc((100vw - 4rem) / 2), 21rem"
                      />
                    </figure>
                    <h3>{editionCity?.name ?? city.navTitle}</h3>
                    <dl className={styles.cityFacts}>
                      <div>
                        <dt>{edition?.copy.bestForLabel ?? copy.bestForLabel}</dt>
                        <dd>{comparison.bestFor}</dd>
                      </div>
                      <div>
                        <dt>{edition?.copy.stayLabel ?? copy.stayLabel}</dt>
                        <dd>{comparison.stay}</dd>
                      </div>
                      <div>
                        <dt>{edition?.copy.routeRoleLabel ?? copy.routeRoleLabel}</dt>
                        <dd>{comparison.routeRole}</dd>
                      </div>
                    </dl>
                    <span className={styles.action}>
                      {editionCity?.action ?? copy.openCity}
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          </div>

          <Link className={styles.seasonalLink} data-spotlight href={edition?.winterGuide.href ?? copy.winterGuidePath} hrefLang={edition?.winterGuide.hrefLang}>
            {edition?.winterGuide.label ?? copy.winterGuideLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className={styles.scales} aria-labelledby="place-scales-title">
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{edition?.copy.scaleEyebrow ?? copy.scaleEyebrow}</p>
              <h2 id="place-scales-title"><KeepWords locale={textLocale} text={edition?.copy.scaleTitle ?? copy.scaleTitle} /></h2>
            </div>
            <p>{edition?.copy.scaleIntroduction ?? copy.scaleIntroduction}</p>
          </div>

          <ul className={styles.scaleGrid}>
            {placeCollections.map((collection, index) => {
              const item = edition ? edition.copy.collections[collection.id as keyof typeof edition.copy.collections] : collection.locales[locale];
              return (
                <li key={collection.id}>
                  {/* The place indexes stay English: an edition links them with its marker. */}
                  <Link data-spotlight href={getSearchCollectionPath(collection, edition ? "en" : locale)} hrefLang={edition ? "en" : undefined}>
                    <span className={styles.number} aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </span>
                    <h3><KeepWords locale={textLocale} text={item.label} /></h3>
                    <p>{item.description}</p>
                    <span className={styles.action}>
                      {edition?.openScale ?? copy.openScale}
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
            <p className={styles.eyebrow}>{edition?.copy.handoffEyebrow ?? copy.handoffEyebrow}</p>
            <h2 id="destination-handoff-title"><KeepWords locale={textLocale} text={edition?.copy.handoffTitle ?? copy.handoffTitle} /></h2>
          </div>
          <div>
            <p>{edition?.copy.handoffBody ?? copy.handoffBody}</p>
            <div className={styles.handoffActions}>
              <Link className={styles.primaryAction} href={edition?.guidesPath ?? `${home.path}guides/`}>
                {edition?.copy.guidesAction ?? copy.guidesAction}
                <span aria-hidden="true">→</span>
              </Link>
              <Link className={styles.secondaryAction} href={edition?.toursPath ?? `${home.path}tours/`}>
                {edition?.copy.toursAction ?? copy.toursAction}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {edition && editionLocale ? (
        <EditionSiteFooter currentPath={edition.path} language={editionLocale} />
      ) : (
        <HomegroundFooter locale={locale} pageContext="destinations" />
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </div>
  );
}
