import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Database, MapPinned, TriangleAlert } from "lucide-react";
import assetDataEn from "../content/guides/first-trip-china-airport-station-stay-map/asset-data.en.json";
import assetCopyZh from "../content/guides/first-trip-china-airport-station-stay-map/asset-copy.zh.json";
import assetCopyKo from "../content/guides/first-trip-china-airport-station-stay-map/asset-copy.ko.json";
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
import { getFirstTripTenCityMapCopy } from "../lib/firstTripTenCityMapI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import type { HomegroundLocale } from "../lib/homegroundI18n";
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
const ASSET_LICENCE_URL = "https://creativecommons.org/licenses/by/4.0/";
const ASSET_CREDIT_TEXT =
  "Homeground China, First Trip to China: 10-City Airport, Station and Stay Map, CC BY 4.0.";
const ASSET_COPYRIGHT_NOTICE = `© 2026 ${homegroundBusiness.registeredName}, operating as Homeground China.`;
export const FIRST_TRIP_TEN_CITY_GUIDE_ID =
  "first-trip-china-airport-station-stay-map" as GuideId;

const downloadSpecs = [
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1.zip",
    format: "ZIP",
    contentKind: "complete-ten-city-pack",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1.svg",
    format: "SVG",
    contentKind: "national-map-svg",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1.png",
    format: "PNG",
    contentKind: "national-map-png",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1@2x.png",
    format: "2× PNG",
    contentKind: "national-map-png-2x",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1.csv",
    format: "CSV",
    contentKind: "ten-city-data-csv",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1.json",
    format: "JSON",
    contentKind: "ten-city-data-json",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1-LICENSE.txt",
    format: "TXT",
    contentKind: "asset-licence",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1-README.txt",
    format: "TXT",
    contentKind: "asset-readme",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1-ATTRIBUTION-AND-EMBED.txt",
    format: "TXT",
    contentKind: "asset-attribution",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1-SOURCES.txt",
    format: "TXT",
    contentKind: "asset-sources",
  },
  {
    href: "/downloads/homeground-china-10-city-arrival-stay-departure-v1-SHA256SUMS.txt",
    format: "TXT",
    contentKind: "asset-checksums",
  },
] as const;

const spotlightIds = ["beijing", "shanghai", "zhangjiajie"] as const;

function localizePath(path: string, locale: HomegroundLocale) {
  return locale === "en" ? path : `/${locale}${path}`;
}

function heroImagePath(locale: HomegroundLocale) {
  const suffix = locale === "en" ? "" : `.${locale}`;
  return `/images/guides/first-trip-china-airport-station-stay-map/hero-1600${suffix}.webp`;
}

function spotlightImagePath(
  city: (typeof spotlightIds)[number],
  locale: HomegroundLocale,
) {
  const suffix = locale === "en" ? "" : `.${locale}`;
  return `/images/guides/first-trip-china-airport-station-stay-map/${city}-card-1200${suffix}.webp`;
}

function assetDataFor(locale: HomegroundLocale) {
  if (locale === "en") {
    return {
      ...assetDataEn,
      cities: assetDataEn.cities.map((city) => ({
        ...city,
        secondaryName: city.nameZh,
        graphicSummary: city.gatewaySummary,
      })),
    };
  }

  const localized = locale === "zh" ? assetCopyZh : assetCopyKo;
  const cityById = new Map(localized.cities.map((city) => [city.id, city]));
  const sourceById = new Map(localized.sources.map((source) => [source.id, source]));

  return {
    ...assetDataEn,
    cities: assetDataEn.cities.map((city) => ({
      ...city,
      ...cityById.get(city.id),
    })),
    sources: assetDataEn.sources.map((source) => ({
      ...source,
      ...sourceById.get(source.id),
    })),
  };
}

function downloadsFor(locale: HomegroundLocale) {
  const labels = getFirstTripTenCityMapCopy(locale).downloads.items;
  return downloadSpecs.map((download, index) => ({
    ...download,
    label: labels[index][0],
    description: labels[index][1],
  })) satisfies readonly LinkableAssetDownload[];
}

function assetMimeType(href: string) {
  if (href.endsWith(".svg")) return "image/svg+xml";
  if (href.endsWith(".png")) return "image/png";
  if (href.endsWith(".csv")) return "text/csv";
  if (href.endsWith(".json")) return "application/json";
  if (href.endsWith(".txt")) return "text/plain";
  if (href.endsWith(".zip")) return "application/zip";
  return "application/octet-stream";
}

function formattedReviewDate(locale: HomegroundLocale, reviewedAt: string) {
  return new Intl.DateTimeFormat(
    locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-GB",
    { dateStyle: "medium", timeZone: "UTC" },
  ).format(new Date(`${reviewedAt}T00:00:00Z`));
}

function citationFor(
  locale: HomegroundLocale,
  version: string,
  canonicalUrl: string,
) {
  if (locale === "zh") {
    return `Homeground China（2026），《第一次来中国：10城机场、火车站与住宿区域地图》，版本 ${version}，事实复核于2026年8月23日。${canonicalUrl}`;
  }
  if (locale === "ko") {
    return `Homeground China(2026), 「첫 중국 여행: 10개 도시 공항·기차역·숙박 지도」, 버전 ${version}, 2026년 8월 23일 검토. ${canonicalUrl}`;
  }
  return `Homeground China (2026), “First Trip to China: 10-City Airport, Station and Stay Map,” version ${version}, reviewed 23 August 2026. ${canonicalUrl}`;
}

function structuredData(locale: HomegroundLocale) {
  const guide = getGuideEntry(FIRST_TRIP_TEN_CITY_GUIDE_ID, locale);
  const data = assetDataFor(locale);
  const copy = getFirstTripTenCityMapCopy(locale);
  const downloads = downloadsFor(locale);
  const guideHub = localizePath("/guides/", locale);
  const transportHub = localizePath("/transport/", locale);
  const localHeroUrl = `${SITE_URL}${heroImagePath(locale)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      editorialPersonSchema(locale),
      {
        "@type": "Article",
        "@id": `${guide.canonicalUrl}#article`,
        url: guide.canonicalUrl,
        headline: guide.headline,
        description: guide.description,
        image: { "@id": `${guide.canonicalUrl}#primary-image` },
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: copy.htmlLang,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        author: { "@id": EDITORIAL_PERSON_ID },
        reviewedBy: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
        mainEntityOfPage: guide.canonicalUrl,
        citation: data.sources.map((source) => source.url),
        about: { "@id": `${guide.canonicalUrl}#dataset` },
      },
      {
        "@type": "ImageObject",
        "@id": `${guide.canonicalUrl}#primary-image`,
        url: localHeroUrl,
        contentUrl: localHeroUrl,
        width: guide.imageWidth,
        height: guide.imageHeight,
        caption: copy.schema.imageCaption,
        creator: { "@id": EDITORIAL_ORGANIZATION_ID },
        license: ASSET_LICENCE_URL,
        acquireLicensePage: guide.canonicalUrl,
        creditText: ASSET_CREDIT_TEXT,
        copyrightNotice: ASSET_COPYRIGHT_NOTICE,
      },
      {
        "@type": "Dataset",
        "@id": `${guide.canonicalUrl}#dataset`,
        name: copy.schema.datasetName,
        description: copy.schema.datasetDescription,
        url: guide.canonicalUrl,
        version: data.version,
        dateModified: data.reviewedAt,
        inLanguage: copy.htmlLang,
        isAccessibleForFree: true,
        creator: { "@id": EDITORIAL_ORGANIZATION_ID },
        license: ASSET_LICENCE_URL,
        acquireLicensePage: guide.canonicalUrl,
        creditText: ASSET_CREDIT_TEXT,
        copyrightNotice: ASSET_COPYRIGHT_NOTICE,
        spatialCoverage: {
          "@type": "Country",
          name: locale === "zh" ? "中国" : locale === "ko" ? "중국" : "China",
        },
        variableMeasured: copy.schema.variables,
        distribution: downloads.map((download) => ({
          "@type": "DataDownload",
          name: download.label,
          encodingFormat: assetMimeType(download.href),
          contentUrl: `${SITE_URL}${download.href}`,
          license: ASSET_LICENCE_URL,
          acquireLicensePage: guide.canonicalUrl,
          creditText: ASSET_CREDIT_TEXT,
          copyrightNotice: ASSET_COPYRIGHT_NOTICE,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.breadcrumbs.home, item: `${SITE_URL}${localizePath("/", locale)}` },
          { "@type": "ListItem", position: 2, name: copy.breadcrumbs.guides, item: `${SITE_URL}${guideHub}` },
          { "@type": "ListItem", position: 3, name: copy.breadcrumbs.transport, item: `${SITE_URL}${transportHub}` },
          { "@type": "ListItem", position: 4, name: guide.navTitle, item: guide.canonicalUrl },
        ],
      },
    ],
  };
}

export function FirstTripTenCityMapPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const guide = getGuideEntry(FIRST_TRIP_TEN_CITY_GUIDE_ID, locale);
  const data = assetDataFor(locale);
  const copy = getFirstTripTenCityMapCopy(locale);
  const downloads = downloadsFor(locale);
  const citation = citationFor(locale, data.version, guide.canonicalUrl);
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const ctaHref = `${localePrefix}/china-itinerary-review/?utm_source=ten_city_gateway_map&utm_medium=owned&utm_campaign=route_review&utm_content=matrix_cta#choose-service`;
  const briefHref = `${localePrefix}/?utm_source=ten_city_gateway_map&utm_medium=owned&utm_campaign=trip_conversation&utm_content=footer_cta#planner-contact`;
  const schema = structuredData(locale);
  const reviewDate = formattedReviewDate(locale, data.reviewedAt);

  return (
    <div className={`${homeStyles.localeRoot} ${styles.pageRoot}`} lang={copy.htmlLang}>
      <a className={styles.skipLink} href="#ten-city-data">
        {copy.skipLink}
      </a>

      <HomegroundHeader
        guideId={guide.id}
        languagePaths={getGuideLanguagePaths(guide.id)}
        locale={locale}
        pageContext="guide"
      />

      <main>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <ol>
                <li><Link href={localizePath("/", locale)}>{copy.breadcrumbs.home}</Link></li>
                <li><span aria-hidden="true">/</span><Link href={localizePath("/guides/", locale)}>{copy.breadcrumbs.guides}</Link></li>
                <li><span aria-hidden="true">/</span><Link href={localizePath("/transport/", locale)}>{copy.breadcrumbs.transport}</Link></li>
                <li aria-current="page"><span aria-hidden="true">/</span>{guide.navTitle}</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{guide.headline}</h1>
            <p className={styles.dek}>{guide.description}</p>
            <EditorialByline locale={locale} reviewedAt={data.reviewedAt} />
          </div>

          <figure className={styles.heroFigure}>
            <Image
              alt={guide.heroAlt}
              fetchPriority="high"
              height={guide.imageHeight}
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              src={heroImagePath(locale)}
              width={guide.imageWidth}
            />
            <figcaption>{copy.heroCaption}</figcaption>
          </figure>
        </header>

        <section className={styles.dataStrip} aria-label={copy.matrix.aria}>
          <div><strong>10</strong><span>{copy.dataStrip.cities}</span></div>
          <div><strong>{data.reviewedGatewayNodeCount}</strong><span>{copy.dataStrip.nodes}</span></div>
          <div><strong>{data.reviewedStayAreaCount}</strong><span>{copy.dataStrip.areas}</span></div>
          <div><strong>{reviewDate}</strong><span>{copy.dataStrip.reviewed}</span></div>
        </section>

        <article className={styles.article} id="ten-city-data">
          <section className={styles.intro}>
            <p className={styles.lead}>{copy.lead}</p>
            <aside className={styles.warning}>
              <TriangleAlert aria-hidden="true" size={22} />
              <div>
                <strong>{copy.warning.title}</strong>
                <p>{copy.warning.body}</p>
              </div>
            </aside>
          </section>

          <section className={styles.section} aria-labelledby="flow-title">
            <div className={styles.sectionHeader}>
              <p className={styles.miniLabel}>{copy.flow.label}</p>
              <h2 id="flow-title">{copy.flow.title}</h2>
            </div>
            <ol className={styles.flow}>
              {copy.flow.steps.map((step, index) => (
                <li key={step.label}>
                  <span>{index + 1}</span>
                  <strong>{step.label}</strong>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.section} aria-labelledby="matrix-title">
            <div className={styles.sectionHeader}>
              <p className={styles.miniLabel}>{copy.matrix.label}</p>
              <h2 id="matrix-title">{copy.matrix.title}</h2>
              <p>
                {locale === "en" ? `Version ${data.version}. ` : `v${data.version}。`}
                {copy.matrix.descriptionPrefix} {data.reviewedGatewayNodeCount} {copy.matrix.descriptionSuffix}
              </p>
            </div>
            <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={copy.matrix.aria}>
              <table>
                <caption>{copy.matrix.caption}</caption>
                <thead>
                  <tr>
                    {copy.matrix.headers.map((header) => <th scope="col" key={header}>{header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data.cities.map((city) => (
                    <tr key={city.id}>
                      <th scope="row">
                        <Link href={localizePath(city.guidePath, locale)}>{city.name}</Link>
                        <small>{city.secondaryName}</small>
                      </th>
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

          <section className={`${styles.section} ${styles.downloadSection}`} id="downloads" aria-labelledby="downloads-title">
            <div className={styles.downloadIntro}>
              <Database aria-hidden="true" size={25} />
              <div className={styles.sectionHeader}>
                <p className={styles.miniLabel}>{copy.downloads.label}</p>
                <h2 id="downloads-title">{copy.downloads.title}</h2>
                <p>{copy.downloads.body}</p>
              </div>
            </div>
            <LinkableAssetActions
              assets={downloads}
              citation={citation}
              copy={{
                citationLabel: copy.downloads.citationLabel,
                copyButton: copy.downloads.copyButton,
                copiedButton: copy.downloads.copiedButton,
                copiedStatus: copy.downloads.copiedStatus,
              }}
              guideId={guide.id}
              locale={locale}
            />
            <div className={styles.licencePanel} id="licence">
              <div>
                <p className={styles.miniLabel}>{copy.licence.label}</p>
                <h3>{copy.licence.title}</h3>
              </div>
              <div>
                <p>{copy.licence.intro}</p>
                <ul>{copy.licence.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                <p>
                  <a href={ASSET_LICENCE_URL}>{copy.licence.readLicence}</a>
                  {" · "}
                  <a download href="/downloads/homeground-china-10-city-arrival-stay-departure-v1-LICENSE.txt">
                    {copy.licence.downloadLicence}
                  </a>
                </p>
                <small>{ASSET_COPYRIGHT_NOTICE}</small>
              </div>
            </div>
          </section>

          <aside className={styles.commercialCta}>
            <div>
              <p className={styles.miniLabel}>{copy.routeReview.label}</p>
              <h2>{copy.routeReview.title}</h2>
              <p>{copy.routeReview.body}</p>
            </div>
            <GuideCtaLink href={ctaHref} guideId={guide.id} locale={locale} position="inline">
              {copy.routeReview.button}
              <ArrowRight aria-hidden="true" size={18} />
            </GuideCtaLink>
          </aside>

          <section className={styles.section} aria-labelledby="cards-title">
            <div className={styles.sectionHeader}>
              <p className={styles.miniLabel}>{copy.cards.label}</p>
              <h2 id="cards-title">{copy.cards.title}</h2>
            </div>
            <div className={styles.cityGrid}>
              {data.cities.map((city, index) => (
                <article className={styles.cityCard} key={city.id}>
                  <div className={styles.cityCardTop}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{city.secondaryName}</p>
                  </div>
                  <h3>{city.name}</h3>
                  <dl>
                    <div><dt>{copy.cards.fields[0]}</dt><dd>{city.gatewaySummary}</dd></div>
                    <div><dt>{copy.cards.fields[1]}</dt><dd>{city.stayDefault}</dd></div>
                    <div><dt>{copy.cards.fields[2]}</dt><dd>{city.oneMoveRule}</dd></div>
                  </dl>
                  <p className={styles.cardWarning}><TriangleAlert aria-hidden="true" size={17} />{city.warning}</p>
                  <Link href={localizePath(city.guidePath, locale)}>{copy.cards.openGuide} <ArrowRight aria-hidden="true" size={16} /></Link>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="spotlight-title">
            <div className={styles.sectionHeader}>
              <p className={styles.miniLabel}>{copy.spotlight.label}</p>
              <h2 id="spotlight-title">{copy.spotlight.title}</h2>
              <p>{copy.spotlight.body}</p>
            </div>
            <div className={styles.spotlightGrid}>
              {copy.spotlight.cards.map((card, index) => (
                <figure key={card.city}>
                  <Image alt={card.alt} height={675} loading="lazy" sizes="(max-width: 760px) 100vw, 48vw" src={spotlightImagePath(spotlightIds[index], locale)} width={1200} />
                  <figcaption><strong>{card.city}</strong><span>{card.note}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className={styles.methodSection} aria-labelledby="method-title">
            <div>
              <p className={styles.miniLabel}>{copy.method.label}</p>
              <h2 id="method-title">{copy.method.title}</h2>
            </div>
            <ul>{copy.method.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </section>

          <details className={styles.sources} id="sources">
            <summary><span>{copy.sources}</span><b>{data.sources.length}</b></summary>
            <ol>
              {data.sources.map((source) => (
                <li key={source.id}>
                  <a href={source.url}>{source.label}</a>
                  <span>{source.publisher}</span>
                  <time dateTime={data.reviewedAt}>{reviewDate}</time>
                </li>
              ))}
            </ol>
          </details>
        </article>

        <aside className={styles.footerCta}>
          <MapPinned aria-hidden="true" size={30} />
          <div>
            <p className={styles.miniLabel}>{copy.footer.label}</p>
            <h2>{copy.footer.title}</h2>
            <p>{copy.footer.body}</p>
          </div>
          <GuideCtaLink href={briefHref} guideId={guide.id} locale={locale} position="footer">
            {copy.footer.button} <ArrowRight aria-hidden="true" size={18} />
          </GuideCtaLink>
        </aside>
      </main>

      <HomegroundFooter locale={locale} pageContext="guide" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
