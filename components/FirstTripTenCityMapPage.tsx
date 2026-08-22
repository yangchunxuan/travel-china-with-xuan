import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Database, MapPinned, TriangleAlert } from "lucide-react";
import assetData from "../content/guides/first-trip-china-airport-station-stay-map/asset-data.en.json";
import {
  getGuideEntry,
  getGuideLanguagePaths,
  type GuideId,
} from "../lib/guideRegistry";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import { EditorialByline } from "./EditorialByline";
import { GuideCtaLink } from "./GuideCtaLink";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import {
  LinkableAssetActions,
  type LinkableAssetDownload,
} from "./LinkableAssetActions";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./FirstTripTenCityMapPage.module.css";

const SITE_URL = "https://homegroundchina.com";
export const FIRST_TRIP_TEN_CITY_GUIDE_ID =
  "first-trip-china-airport-station-stay-map" as GuideId;

const downloads = [
  {
    label: "National schematic",
    description: "Editable vector for editorial layouts",
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1.svg",
    format: "SVG",
    contentKind: "national-map-svg",
  },
  {
    label: "National schematic",
    description: "1600 × 1000 for ordinary web use",
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1.png",
    format: "PNG",
    contentKind: "national-map-png",
  },
  {
    label: "National schematic",
    description: "3200 × 2000 high-density file",
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1@2x.png",
    format: "2× PNG",
    contentKind: "national-map-png-2x",
  },
  {
    label: "Ten-city source table",
    description: "Copyable gateway, stay and warning rows",
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1.csv",
    format: "CSV",
    contentKind: "ten-city-data-csv",
  },
  {
    label: "Beijing city card",
    description: "Editable single-city graphic",
    href: "/downloads/homeground-china-beijing-arrive-stay-depart-v1.svg",
    format: "SVG",
    contentKind: "beijing-card-svg",
  },
  {
    label: "Beijing city card",
    description: "1200 × 675 web graphic",
    href: "/downloads/homeground-china-beijing-arrive-stay-depart-v1.png",
    format: "PNG",
    contentKind: "beijing-card-png",
  },
  {
    label: "Shanghai city card",
    description: "Editable single-city graphic",
    href: "/downloads/homeground-china-shanghai-arrive-stay-depart-v1.svg",
    format: "SVG",
    contentKind: "shanghai-card-svg",
  },
  {
    label: "Shanghai city card",
    description: "1200 × 675 web graphic",
    href: "/downloads/homeground-china-shanghai-arrive-stay-depart-v1.png",
    format: "PNG",
    contentKind: "shanghai-card-png",
  },
  {
    label: "Zhangjiajie city card",
    description: "Editable single-city graphic",
    href: "/downloads/homeground-china-zhangjiajie-arrive-stay-depart-v1.svg",
    format: "SVG",
    contentKind: "zhangjiajie-card-svg",
  },
  {
    label: "Zhangjiajie city card",
    description: "1200 × 675 web graphic",
    href: "/downloads/homeground-china-zhangjiajie-arrive-stay-depart-v1.png",
    format: "PNG",
    contentKind: "zhangjiajie-card-png",
  },
] as const satisfies readonly LinkableAssetDownload[];

const spotlightCards = [
  {
    city: "Beijing",
    src: "/images/guides/first-trip-china-airport-station-stay-map/beijing-card-1200.webp",
    alt: "Beijing arrive, stay and depart card distinguishing PEK, PKX and the main railway station choices.",
    note: "Two airports and several railway gateways make the city name alone unsafe booking information.",
  },
  {
    city: "Shanghai",
    src: "/images/guides/first-trip-china-airport-station-stay-map/shanghai-card-1200.webp",
    alt: "Shanghai arrive, stay and depart card distinguishing PVG, SHA and the main railway stations.",
    note: "The Hongqiao airport–rail complex is convenient only when it matches the confirmed ticket.",
  },
  {
    city: "Zhangjiajie",
    src: "/images/guides/first-trip-china-airport-station-stay-map/zhangjiajie-card-1200.webp",
    alt: "Zhangjiajie arrive, stay and depart card distinguishing the city, Wulingyuan and separate scenic anchors.",
    note: "The useful sleep location follows tomorrow's confirmed sight, not the destination label.",
  },
] as const;

function assetMimeType(href: string) {
  if (href.endsWith(".svg")) return "image/svg+xml";
  if (href.endsWith(".png")) return "image/png";
  if (href.endsWith(".csv")) return "text/csv";
  return "application/octet-stream";
}

function structuredData() {
  const guide = getGuideEntry(FIRST_TRIP_TEN_CITY_GUIDE_ID, "en");
  return {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      editorialPersonSchema("en"),
      {
        "@type": "Article",
        "@id": `${guide.canonicalUrl}#article`,
        url: guide.canonicalUrl,
        headline: guide.headline,
        description: guide.description,
        image: {
          "@id": `${guide.canonicalUrl}#primary-image`,
        },
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: "en",
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        author: { "@id": EDITORIAL_PERSON_ID },
        reviewedBy: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
        mainEntityOfPage: guide.canonicalUrl,
        citation: assetData.sources.map((source) => source.url),
        about: { "@id": `${guide.canonicalUrl}#dataset` },
      },
      {
        "@type": "ImageObject",
        "@id": `${guide.canonicalUrl}#primary-image`,
        url: guide.heroImageUrl,
        contentUrl: guide.heroImageUrl,
        width: guide.imageWidth,
        height: guide.imageHeight,
        caption: "Ten-city arrive, stay and depart schematic by Homeground China",
        creator: { "@id": EDITORIAL_ORGANIZATION_ID },
      },
      {
        "@type": "Dataset",
        "@id": `${guide.canonicalUrl}#dataset`,
        name: "Homeground China 10-city arrival, stay and departure matrix",
        description:
          "A reviewed decision dataset covering airport, railway-station and port nodes, first-trip stay areas, wrong-node warnings and last-night rules for ten China gateway cities.",
        url: guide.canonicalUrl,
        version: assetData.version,
        dateModified: assetData.reviewedAt,
        inLanguage: "en",
        isAccessibleForFree: true,
        creator: { "@id": EDITORIAL_ORGANIZATION_ID },
        spatialCoverage: { "@type": "Country", name: "China" },
        variableMeasured: [
          "gateway node",
          "first-trip stay area",
          "wrong-node warning",
          "one-move rule",
          "last-night rule",
        ],
        distribution: downloads.map((download) => ({
          "@type": "DataDownload",
          name: download.label,
          encodingFormat: assetMimeType(download.href),
          contentUrl: `${SITE_URL}${download.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Travel guides", item: `${SITE_URL}/guides/` },
          { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE_URL}/transport/` },
          { "@type": "ListItem", position: 4, name: guide.navTitle, item: guide.canonicalUrl },
        ],
      },
    ],
  };
}

export function FirstTripTenCityMapPage() {
  const guide = getGuideEntry(FIRST_TRIP_TEN_CITY_GUIDE_ID, "en");
  const citation = `Homeground China (2026), “First Trip to China: 10-City Airport, Station and Stay Map,” version ${assetData.version}, reviewed 23 August 2026. ${guide.canonicalUrl}`;
  const ctaHref =
    "/china-itinerary-review/?utm_source=ten_city_gateway_map&utm_medium=owned&utm_campaign=route_review&utm_content=matrix_cta#choose-service";
  const briefHref =
    "/?utm_source=ten_city_gateway_map&utm_medium=owned&utm_campaign=trip_conversation&utm_content=footer_cta#planner-contact";
  const schema = structuredData();

  return (
    <div className={`${homeStyles.localeRoot} ${styles.pageRoot}`} lang="en">
      <a className={styles.skipLink} href="#ten-city-data">
        Skip to the ten-city matrix
      </a>

      <HomegroundHeader
        guideId={guide.id}
        languagePaths={getGuideLanguagePaths(guide.id)}
        locale="en"
        pageContext="guide"
      />

      <main>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><span aria-hidden="true">/</span><Link href="/guides/">Travel guides</Link></li>
                <li><span aria-hidden="true">/</span><Link href="/transport/">Transport</Link></li>
                <li aria-current="page"><span aria-hidden="true">/</span>{guide.navTitle}</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Original map · Downloadable data · 10 cities</p>
            <h1>{guide.headline}</h1>
            <p className={styles.dek}>{guide.description}</p>
            <EditorialByline locale="en" reviewedAt={assetData.reviewedAt} />
          </div>

          <figure className={styles.heroFigure}>
            <Image
              alt={guide.heroAlt}
              fetchPriority="high"
              height={guide.imageHeight}
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              src={guide.heroImagePath}
              width={guide.imageWidth}
            />
            <figcaption>Original Homeground schematic. Orientation only; not to scale or live navigation.</figcaption>
          </figure>
        </header>

        <section className={styles.dataStrip} aria-label="Dataset scope">
          <div><strong>10</strong><span>gateway cities</span></div>
          <div><strong>{assetData.reviewedGatewayNodeCount}</strong><span>airport, rail and port nodes reviewed</span></div>
          <div><strong>{assetData.reviewedStayAreaCount}</strong><span>stay areas compared</span></div>
          <div><strong>23 Aug 2026</strong><span>last full source review</span></div>
        </section>

        <article className={styles.article} id="ten-city-data">
          <section className={styles.intro}>
            <p className={styles.lead}>
              Do not choose a China hotel from the city name alone. Write the
              exact airport, railway station or border crossing on the booking,
              then choose a stay area that keeps both arrival and the next
              departure sensible.
            </p>
            <aside className={styles.warning}>
              <TriangleAlert aria-hidden="true" size={22} />
              <div>
                <strong>A decision diagram, not live navigation</strong>
                <p>
                  Stay areas are editorial defaults, not universal hotel
                  recommendations. Terminals, trains, checkpoints and local
                  transfers can change; verify the ticket and operator's current
                  information before paying.
                </p>
              </div>
            </aside>
          </section>

          <section className={styles.section} aria-labelledby="flow-title">
            <div className={styles.sectionHeader}>
              <p className={styles.miniLabel}>One repeatable method</p>
              <h2 id="flow-title">Read every city in the same order</h2>
            </div>
            <ol className={styles.flow}>
              <li><span>1</span><strong>Arrive</strong><p>Copy the exact airport code, railway station or port from the confirmed ticket.</p></li>
              <li><span>2</span><strong>Stay</strong><p>Use the default only when it also works for your sights, luggage and next departure.</p></li>
              <li><span>3</span><strong>Depart</strong><p>Choose the onward ticket by its named station and complete transfer chain.</p></li>
            </ol>
          </section>

          <section className={styles.section} aria-labelledby="matrix-title">
            <div className={styles.sectionHeader}>
              <p className={styles.miniLabel}>Copyable source table</p>
              <h2 id="matrix-title">The arrive–stay–depart matrix</h2>
              <p>Version {assetData.version}. The compact view names decision-critical gateways; the underlying review covers all {assetData.reviewedGatewayNodeCount} nodes.</p>
            </div>
            <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Ten-city airport, station and stay matrix">
              <table>
                <caption>Ten-city first-trip gateway and stay-area matrix, reviewed 23 August 2026</caption>
                <thead>
                  <tr>
                    <th scope="col">City</th>
                    <th scope="col">Named gateways</th>
                    <th scope="col">Neutral first-trip stay default</th>
                    <th scope="col">Wrong-node warning</th>
                    <th scope="col">Last-night rule</th>
                  </tr>
                </thead>
                <tbody>
                  {assetData.cities.map((city) => (
                    <tr key={city.id}>
                      <th scope="row"><Link href={city.guidePath}>{city.name}</Link><small>{city.nameZh}</small></th>
                      <td>{city.gatewaySummary}</td>
                      <td>{city.stayDefault}</td>
                      <td>{city.warning}</td>
                      <td>{city.lastNightRule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className={styles.commercialCta}>
            <div>
              <p className={styles.miniLabel}>Protect the bookings</p>
              <h2>Have us check your airport–station–hotel chain.</h2>
              <p>A US$69 human route review checks city order, gateway names, hotel bases, transfer logic and pace before the remaining bookings become expensive to change.</p>
            </div>
            <GuideCtaLink href={ctaHref} guideId={guide.id} locale="en" position="inline">
              Request a route review — US$69
              <ArrowRight aria-hidden="true" size={18} />
            </GuideCtaLink>
          </aside>

          <section className={styles.section} aria-labelledby="cards-title">
            <div className={styles.sectionHeader}>
              <p className={styles.miniLabel}>Ten consistent decision cards</p>
              <h2 id="cards-title">Use the default, then test the exception</h2>
            </div>
            <div className={styles.cityGrid}>
              {assetData.cities.map((city, index) => (
                <article className={styles.cityCard} key={city.id}>
                  <div className={styles.cityCardTop}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{city.nameZh}</p>
                  </div>
                  <h3>{city.name}</h3>
                  <dl>
                    <div><dt>Arrive / depart</dt><dd>{city.gatewaySummary}</dd></div>
                    <div><dt>Start with</dt><dd>{city.stayDefault}</dd></div>
                    <div><dt>One-move rule</dt><dd>{city.oneMoveRule}</dd></div>
                  </dl>
                  <p className={styles.cardWarning}><TriangleAlert aria-hidden="true" size={17} />{city.warning}</p>
                  <Link href={city.guidePath}>Open the detailed guide <ArrowRight aria-hidden="true" size={16} /></Link>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="spotlight-title">
            <div className={styles.sectionHeader}>
              <p className={styles.miniLabel}>Ready for editorial layouts</p>
              <h2 id="spotlight-title">Three high-confusion city graphics</h2>
              <p>Beijing covers a two-airport decision, Shanghai a combined airport–rail district, and Zhangjiajie a stay-base decision that changes the following day.</p>
            </div>
            <div className={styles.spotlightGrid}>
              {spotlightCards.map((card) => (
                <figure key={card.city}>
                  <Image alt={card.alt} height={675} loading="lazy" sizes="(max-width: 760px) 100vw, 48vw" src={card.src} width={1200} />
                  <figcaption><strong>{card.city}</strong><span>{card.note}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.downloadSection}`} id="downloads" aria-labelledby="downloads-title">
            <div className={styles.downloadIntro}>
              <Database aria-hidden="true" size={25} />
              <div className={styles.sectionHeader}>
                <p className={styles.miniLabel}>National map · City cards · Data</p>
                <h2 id="downloads-title">Download the editorial asset pack</h2>
                <p>Quote the matrix with a link to this page. For embedding or adapting a graphic, contact Homeground China for the current file and written reuse terms.</p>
              </div>
            </div>
            <LinkableAssetActions assets={downloads} citation={citation} guideId={guide.id} />
          </section>

          <section className={styles.methodSection} aria-labelledby="method-title">
            <div>
              <p className={styles.miniLabel}>Method</p>
              <h2 id="method-title">What the data does—and does not—claim</h2>
            </div>
            <ul>
              <li>City selection combines international-entry value, common multi-city routes, gateway complexity and Homeground's ability to maintain the facts.</li>
              <li>Airport, station and port identities use official operator or government sources. Stay defaults and move rules are Homeground editorial judgements.</li>
              <li>No timetable, guaranteed transfer duration, airline–terminal assignment or border opening hour is frozen into this asset.</li>
              <li>High-risk gateway facts are reviewed monthly, on a material operator change, and within 72 hours before an outreach batch uses the asset.</li>
            </ul>
          </section>

          <details className={styles.sources}>
            <summary><span>Official sources reviewed</span><b>{assetData.sources.length}</b></summary>
            <ol>
              {assetData.sources.map((source) => (
                <li key={source.id}>
                  <a href={source.url}>{source.label}</a>
                  <span>{source.publisher}</span>
                  <time dateTime={assetData.reviewedAt}>{assetData.reviewedAt}</time>
                </li>
              ))}
            </ol>
          </details>
        </article>

        <aside className={styles.footerCta}>
          <MapPinned aria-hidden="true" size={30} />
          <div>
            <p className={styles.miniLabel}>Plan with a local team</p>
            <h2>Tell us the trip you are considering.</h2>
            <p>Share your dates, group size and rough budget. A real person will help you work out a sensible route and the support you actually need.</p>
          </div>
          <GuideCtaLink href={briefHref} guideId={guide.id} locale="en" position="footer">
            Start my trip brief <ArrowRight aria-hidden="true" size={18} />
          </GuideCtaLink>
        </aside>
      </main>

      <HomegroundFooter locale="en" pageContext="guide" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
