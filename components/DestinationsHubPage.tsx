import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  destinationHubRegistry,
  type DestinationHubId,
} from "../lib/destinationHubs";
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

function CityPlot({ locale }: { locale: HomegroundLocale }) {
  return (
    <svg
      className={styles.plot}
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
              {hub.locales[locale].navTitle}
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
      className={`${localeStyles.root} hg-locale-root ${styles.page}`}
      data-homeground-locale={locale}
      lang={home.htmlLang}
    >
      <a className={localeStyles.skipLink} href="#destinations-main">
        {home.skipLink}
      </a>
      <HomegroundHeader
        languagePaths={languagePaths}
        locale={locale}
        pageContext="destinations"
      />

      <main id="destinations-main" tabIndex={-1}>
        <PointerSpotlight />
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
                <h1><AnimatedHeadline locale={locale} text={section.title} /></h1>
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
              <h2 id="city-hubs-title"><KeepWords locale={locale} text={copy.cityTitle} /></h2>
            </div>
            <div>
              <p>{copy.cityIntroduction(destinationHubRegistry.length)}</p>
              <p className={styles.count}>
                {copy.cityCount(destinationHubRegistry.length)}
              </p>
            </div>
          </div>

          <div className={styles.cityLayout}>
          <div className={styles.plotPanel}>
            <CityPlot locale={locale} />
          </div>
          <ol className={styles.cityGrid}>
            {destinationHubRegistry.map((hub, index) => {
              const city = hub.locales[locale];
              const comparison = copy.cityComparisons[hub.id];
              return (
                <li key={hub.id}>
                  <Link href={city.path}>
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
                    <h3>{city.navTitle}</h3>
                    <dl className={styles.cityFacts}>
                      <div>
                        <dt>{copy.bestForLabel}</dt>
                        <dd>{comparison.bestFor}</dd>
                      </div>
                      <div>
                        <dt>{copy.stayLabel}</dt>
                        <dd>{comparison.stay}</dd>
                      </div>
                      <div>
                        <dt>{copy.routeRoleLabel}</dt>
                        <dd>{comparison.routeRole}</dd>
                      </div>
                    </dl>
                    <span className={styles.action}>
                      {copy.openCity}
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          </div>

          <Link className={styles.seasonalLink} data-spotlight href={copy.winterGuidePath}>
            {copy.winterGuideLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className={styles.scales} aria-labelledby="place-scales-title">
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.scaleEyebrow}</p>
              <h2 id="place-scales-title"><KeepWords locale={locale} text={copy.scaleTitle} /></h2>
            </div>
            <p>{copy.scaleIntroduction}</p>
          </div>

          <ul className={styles.scaleGrid}>
            {placeCollections.map((collection, index) => {
              const item = collection.locales[locale];
              return (
                <li key={collection.id}>
                  <Link data-spotlight href={getSearchCollectionPath(collection, locale)}>
                    <span className={styles.number} aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </span>
                    <h3><KeepWords locale={locale} text={item.label} /></h3>
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
            <h2 id="destination-handoff-title"><KeepWords locale={locale} text={copy.handoffTitle} /></h2>
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
