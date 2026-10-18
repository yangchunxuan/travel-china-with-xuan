import Link from "next/link";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import type { CSSProperties, ReactNode } from "react";
import type { PresentationCopy } from "../lib/presentationOverrides";
import type { PrivateTourFacets } from "../lib/privateTourCatalogFacets";
import {
  getPrivateTourFacetItem,
  getPrivateTourFacets,
  getPrivateTourHubStats,
  getPrivateTourPlaces,
} from "../lib/privateTourCatalogFacets";
import {
  englishMarketPlanning,
  getPrivateTourHubCopy,
  getPrivateTourHubLanguagePaths,
  getPrivateTourHubPlannerPath,
} from "../lib/privateTourHubI18n";
import {
  getPublishedPrivateTourCatalog,
  type PublishedPrivateTourCatalogItem,
} from "../lib/publishedPrivateTourCatalog";
import { getPrivateTourPriorityEntrances, privateTourPriorityCopy } from "../lib/privateTourPriorityEntrances";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { PrivateTourCatalogFilter } from "./PrivateTourCatalogFilter";
import { PrivateTourCatalogLink } from "./PrivateTourCatalogLink";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { PlaceMarquee } from "./motion/PlaceMarquee";
import { RollingNumber } from "./motion/RollingNumber";
import { KeepStops, KeepWords } from "./text/KeepWords";
import {
  privateTourCardImageSource,
  privateTourCardImageSrcSet,
} from "./privateTourCardImages";
import styles from "./PrivateToursHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";

export interface PrivateToursHubEdition {
  language: string;
  products: readonly PublishedPrivateTourCatalogItem[];
  copy: PresentationCopy<ReturnType<typeof getPrivateTourHubCopy>>;
  home: { path: string; skipLink: string };
  header: ReactNode;
  footer: ReactNode;
  facets: PrivateTourFacets;
  priorityCopy: PresentationCopy<(typeof privateTourPriorityCopy)["en"]>;
  priorityReasons: Readonly<Record<string, string>>;
  arrivalPlanning: PresentationCopy<typeof englishMarketPlanning>;
  plannerPath: string;
  originalImageSlugs?: readonly string[];
}

export function buildPrivateToursHubJsonLd(locale: HomegroundLocale, edition?: PrivateToursHubEdition) {
  const products = edition?.products ?? getPublishedPrivateTourCatalog(locale);
  const copy = edition?.copy ?? getPrivateTourHubCopy(locale, products.length);
  const home = edition?.home ?? getHomegroundCopy(locale);
  const canonicalUrl = `${SITE_URL}${copy.path}`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const itemListId = `${canonicalUrl}#tour-list`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: copy.metadata.openGraphTitle,
        description: copy.metadata.description,
        inLanguage: copy.htmlLang,
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": itemListId },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumbHome,
            item: `${SITE_URL}${home.path}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumbCurrent,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: copy.catalogTitle,
        numberOfItems: products.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}${product.href}`,
          item: {
            "@type": "TouristTrip",
            name: product.title,
            description: product.description,
            url: `${SITE_URL}${product.href}`,
            image: {
              "@type": "ImageObject",
              url: `${SITE_URL}${product.image.src}`,
              width: product.image.width,
              height: product.image.height,
              caption: product.image.alt,
            },
            touristType: product.comparison.fit,
          },
        })),
      },
    ],
  };
}

/**
 * One tour, one card. The whole card is the single measured link to the
 * published starting-price entry, and every price is shown together with its
 * per-person, group-size and service basis exactly as the catalog publishes it.
 */
function CompactTourComparison({
  product,
  index,
  locale,
  publishedTourCount,
  edition,
}: {
  product: PublishedPrivateTourCatalogItem;
  index: number;
  locale: HomegroundLocale;
  publishedTourCount: number;
  edition?: PrivateToursHubEdition;
}) {
  const copy = edition?.copy ?? getPrivateTourHubCopy(locale, publishedTourCount);
  const facet = getPrivateTourFacetItem(product, locale);
  const textLocale = edition?.language === "ja" ? "ja" : locale;

  return (
    <li
      className={styles.quickItem}
      style={{ "--card-index": index } as CSSProperties}
      data-tour-id={product.id}
      data-region={facet.region}
      data-length={facet.length}
      data-price={facet.price}
    >
      <PrivateTourCatalogLink
        className={styles.quickLink}
        href={product.startingPriceHref}
        ariaLabelledBy={`tour-title-${product.id} tour-price-${product.id}${product.startingPrice?.validityNote ? ` tour-note-${product.id}` : ""}`}
        locale={locale}
        position={index + 1}
        productSlug={product.slug}
        displayLanguage={edition?.language}
      >
        <figure className={styles.quickImage}>
          <img
            alt={product.image.alt}
            decoding="async"
            height={product.image.height}
            loading="lazy"
            sizes="(max-width: 48rem) 6.5rem, (max-width: 64rem) calc((100vw - 2.75rem) / 2), 25rem"
            src={edition?.originalImageSlugs?.includes(product.slug) ? product.image.src : privateTourCardImageSource(product.id, 960)}
            srcSet={edition?.originalImageSlugs?.includes(product.slug) ? undefined : privateTourCardImageSrcSet(product.id)}
            style={{ objectPosition: product.image.objectPosition }}
            width={product.image.width}
          />
        </figure>
        <div className={styles.quickIdentity}>
          <p><KeepStops route={product.comparison.route} /></p>
          <h3 id={`tour-title-${product.id}`}><KeepWords locale={textLocale} text={product.title} /></h3>
          <p className={styles.quickAppeal}><KeepWords locale={textLocale} text={product.comparison.appeal} /></p>
        </div>
        <p className={styles.quickFacts} id={`tour-price-${product.id}`}>
          {product.startingPrice ? (
            <>
              <span className={styles.priceLabel}>{copy.startingPriceLabel}</span>
              {product.twoTravellerPrice ? (
                <>
                  {/* A couple sees its own per-person price first; the lower
                      larger-group price keeps its group basis beside it. */}
                  <span className={styles.priceTiers}>
                    <span>
                      <span>{copy.partySize(2)}</span>{" "}
                      <strong>{product.twoTravellerPrice.formatted}</strong>
                    </span>
                    <span>
                      <span>{copy.partySize(product.startingPrice.travelers)}</span>{" "}
                      <strong>{product.startingPrice.formatted}</strong>
                    </span>
                  </span>
                  <span>{copy.perPersonPriceNote}</span>
                </>
              ) : (
                <>
                  <strong>{product.startingPrice.formatted}</strong>
                  <span>
                    <KeepWords locale={textLocale} text={copy.perPersonLabel} /> · <KeepWords locale={textLocale} text={product.tourFormat === "small-group" ? copy.twinShareBasis : copy.groupBasis(product.startingPrice.travelers)} />
                  </span>
                </>
              )}
              {/* The service name matters when the tour offers a choice
                  (e.g. Beijing's no-guide price) or states a limited scope
                  (Zhangjiajie's two guided days); otherwise it only repeats
                  the tour type or the guide badge below. */}
              {(product.hasServiceChoice || product.source === "zhangjiajie-tour") && product.startingPrice.serviceLabel && (
                <span className={styles.priceService}>
                  <KeepWords locale={textLocale} text={product.startingPrice.serviceLabel} />
                </span>
              )}
            </>
          ) : (
            <>
              <strong>{copy.quoteOnlyLabel}</strong>
              <span>{copy.quoteOnlyBody}</span>
            </>
          )}
          <span className={styles.guideBadge} data-guide-language="">
            <KeepWords locale={textLocale} text={product.guideLanguage} />
          </span>
        </p>
        <div className={styles.quickMeta}>
          <dl className={styles.quickDetails}>
            <div>
              <dt>{copy.quickFitLabel}</dt>
              <dd><KeepWords locale={textLocale} text={product.comparison.fit} /></dd>
            </div>
            <div>
              <dt>{copy.quickMovementLabel}</dt>
              <dd><KeepWords locale={textLocale} text={product.comparison.pace} /></dd>
            </div>
          </dl>
          {product.startingPrice?.validityNote && (
            <p className={styles.quickNote} id={`tour-note-${product.id}`}>
              {product.startingPrice.validityNote}
            </p>
          )}
        </div>
        <span className={styles.quickAction}>
          <span>{copy.duration(product.days, product.nights)}</span>
          <span>
            {copy.quickAction}
            <span aria-hidden="true">→</span>
          </span>
        </span>
      </PrivateTourCatalogLink>
    </li>
  );
}

export function PrivateToursHubPage({
  locale = "en",
  edition,
}: {
  locale?: HomegroundLocale;
  edition?: PrivateToursHubEdition;
}) {
  const products = edition?.products ?? getPublishedPrivateTourCatalog(locale);
  const copy = edition?.copy ?? getPrivateTourHubCopy(locale, products.length);
  const home = edition?.home ?? getHomegroundCopy(locale);
  const schema = buildPrivateToursHubJsonLd(locale, edition);
  const facets = edition?.facets ?? getPrivateTourFacets(products, locale, copy.quoteOnlyLabel);
  const textLocale = edition?.language === "ja" ? "ja" : locale;
  const stats = getPrivateTourHubStats(products);
  const priorityEntrances = getPrivateTourPriorityEntrances(products, locale).map(entry => ({...entry,reason:edition?.priorityReasons[entry.product.slug] ?? entry.reason}));
  const priorityCopy = edition?.priorityCopy ?? privateTourPriorityCopy[locale];
  const arrivalPlanning = edition?.arrivalPlanning ?? englishMarketPlanning;

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.toursPage}`}
      data-homeground-locale={edition?.language ?? locale}
      lang={copy.htmlLang}
    >
      <a className={localeStyles.skipLink} href="#private-tours-main">
        {home.skipLink}
      </a>
      {edition?.header ?? <HomegroundHeader
        locale={locale}
        pageContext="tours"
        languagePaths={getPrivateTourHubLanguagePaths()}
      />}

      <main id="private-tours-main" tabIndex={-1}>
        <header className={styles.hero}>
          <nav aria-label={copy.breadcrumbLabel} className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href={home.path}>{copy.breadcrumbHome}</Link>
              </li>
              <li aria-current="page">{copy.breadcrumbCurrent}</li>
            </ol>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1><AnimatedHeadline locale={textLocale} text={copy.title} /></h1>
            </div>
            <div className={styles.heroAside}>
              <p><KeepWords locale={textLocale} text={copy.introduction} /></p>
              <a className={styles.heroAction} href="#tour-quick-compare-title">
                {copy.heroAction}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <dl className={styles.stats}>
            <div>
              <dt>{copy.statsRoutes}</dt>
              <dd><RollingNumber value={stats.routes} /></dd>
            </div>
            <div>
              <dt>{copy.statsRegions}</dt>
              <dd><RollingNumber value={stats.regions} /></dd>
            </div>
            <div>
              <dt>{copy.statsLengths}</dt>
              <dd dir={edition?.language === "ar" ? "ltr" : undefined}><RollingNumber value={edition ? `${new Intl.NumberFormat(edition.language === "ar" ? "ar-SA-u-nu-latn" : edition.language).format(stats.shortestDays)}–${new Intl.NumberFormat(edition.language === "ar" ? "ar-SA-u-nu-latn" : edition.language).format(stats.longestDays)}` : `${stats.shortestDays}–${stats.longestDays}`} /></dd>
            </div>
            <div>
              <dt>{copy.statsShopping}</dt>
              <dd><RollingNumber value={stats.shoppingStops} /></dd>
            </div>
          </dl>
          <PlaceMarquee places={getPrivateTourPlaces(products)} />
        </header>

        <nav className={styles.priorityRoutes} aria-labelledby="tour-priority-title">
          <p className={styles.eyebrow}>{priorityCopy.eyebrow}</p>
          <h2 id="tour-priority-title">{priorityCopy.title}</h2>
          <p className={styles.priorityIntroduction}>{priorityCopy.introduction}</p>
          <ul>
            {priorityEntrances.map(({ product, catalogPosition, reason }) => (
              <li key={product.slug}>
                <PrivateTourCatalogLink
                  href={product.href}
                  locale={locale}
                  position={catalogPosition}
                  productSlug={product.slug}
                  displayLanguage={edition?.language}
                  className={styles.priorityLink}
                  ariaLabelledBy={`priority-tour-${product.slug}`}
                >
                  <span className={styles.priorityDuration}>{copy.duration(product.days, product.nights)}</span>
                  <h3 id={`priority-tour-${product.slug}`}><KeepWords locale={textLocale} text={product.title} /></h3>
                  <p><KeepWords locale={textLocale} text={reason} /></p>
                  <span className={styles.priorityAction}>{copy.viewLabel}<span aria-hidden="true"> →</span></span>
                </PrivateTourCatalogLink>
              </li>
            ))}
          </ul>
        </nav>

        <section className={styles.quickCompare} aria-labelledby="tour-quick-compare-title">
          <div className={styles.quickIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.quickCompareEyebrow}</p>
              <h2 id="tour-quick-compare-title">{copy.quickCompareTitle}</h2>
            </div>
            <div className={styles.priceContext}>
              <p><KeepWords locale={textLocale} text={copy.quickCompareIntroduction} /></p>
              <p><KeepWords locale={textLocale} text={copy.priceBasisNote} /></p>
            </div>
          </div>
          <PrivateTourCatalogFilter
            facets={facets}
            labels={{
              group: copy.filterGroupLabel,
              region: copy.filterRegionLabel,
              length: copy.filterLengthLabel,
              price: copy.filterPriceLabel,
              all: copy.filterAll,
              reset: copy.filterReset,
              count: copy.filterCount,
              empty: copy.filterEmpty,
            }}
          >
            {products.map((product, index) => (
              <CompactTourComparison
                key={product.id}
                product={product}
                index={index}
                locale={locale}
                publishedTourCount={products.length}
                edition={edition}
              />
            ))}
          </PrivateTourCatalogFilter>
        </section>

        {(edition || locale === "en") && (
          <section className={styles.arrivalPlanning} aria-labelledby="tour-arrival-title">
            <header>
              <p className={styles.eyebrow}>{arrivalPlanning.eyebrow}</p>
              <h2 id="tour-arrival-title">{arrivalPlanning.title}</h2>
              <p><KeepWords locale={edition?.language === "ja" ? "ja" : "en"} text={arrivalPlanning.introduction} /></p>
            </header>
            <div className={styles.arrivalQuestions}>
              {arrivalPlanning.questions.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>
                    <KeepWords locale={edition?.language === "ja" ? "ja" : "en"} text={item.body} />
                    {!edition && locale === "en" && item.title === "Can we travel with children or older family members?" && (
                      <>
                        {" "}For route comparisons, children’s pricing and pace, see our{" "}
                        <Link href="/guides/china-family-private-tours/">China family private tours guide</Link>.
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
            <nav aria-label={arrivalPlanning.preparationLabel} className={styles.arrivalLinks}>
              <p>{arrivalPlanning.preparationLabel}</p>
              <ul>
                {arrivalPlanning.links.map((item) => (
                  <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
                ))}
              </ul>
            </nav>
          </section>
        )}

        <section className={styles.finalSection} aria-labelledby="tour-final-title">
          <div className={styles.finalInner}>
            <div>
              <p className={styles.finalEyebrow}>{copy.finalEyebrow}</p>
              <h2 id="tour-final-title">{copy.finalTitle}</h2>
            </div>
            <div>
              <p><KeepWords locale={textLocale} text={copy.finalBody} /></p>
              <Link className={styles.finalAction} href={edition?.plannerPath ?? getPrivateTourHubPlannerPath(locale)}>
                {copy.finalAction}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {edition?.footer ?? <HomegroundFooter locale={locale} pageContext="tours" />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
