import Link from "next/link";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import {
  getPrivateTourHubCopy,
  getPrivateTourHubLanguagePaths,
  getPrivateTourHubPlannerPath,
} from "../lib/privateTourHubI18n";
import {
  getPublishedPrivateTourCatalog,
  type PublishedPrivateTourCatalogItem,
} from "../lib/publishedPrivateTourCatalog";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import { PrivateTourCatalogLink } from "./PrivateTourCatalogLink";
import {
  privateTourCardImageSource,
  privateTourCardImageSrcSet,
} from "./privateTourCardImages";
import styles from "./PrivateToursHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";

export function buildPrivateToursHubJsonLd(locale: HomegroundLocale) {
  const products = getPublishedPrivateTourCatalog(locale);
  const copy = getPrivateTourHubCopy(locale, products.length);
  const home = getHomegroundCopy(locale);
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

function TourComparisonCard({
  product,
  index,
  locale,
  publishedTourCount,
}: {
  product: PublishedPrivateTourCatalogItem;
  index: number;
  locale: HomegroundLocale;
  publishedTourCount: number;
}) {
  const copy = getPrivateTourHubCopy(locale, publishedTourCount);

  return (
    <li className={styles.catalogItem} data-tour-id={product.id}>
      <article className={styles.tourCard}>
        <PrivateTourCatalogLink
          className={styles.tourLink}
          href={product.href}
          locale={locale}
          position={index + 1}
          productSlug={product.slug}
        >
          <figure className={styles.tourImage}>
            <img
              alt={product.image.alt}
              decoding="async"
              height={product.image.height}
              loading="lazy"
              sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 88.25rem) calc((100vw - 2rem) / 2), 43.125rem"
              src={privateTourCardImageSource(product.id, 960)}
              srcSet={privateTourCardImageSrcSet(product.id)}
              style={{ objectPosition: product.image.objectPosition }}
              width={product.image.width}
            />
            <figcaption>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{copy.duration(product.days, product.nights)}</span>
            </figcaption>
          </figure>

          <div className={styles.tourBody}>
            <p className={styles.routeLine}>{product.comparison.route}</p>
            <h2>{product.title}</h2>
            <p className={styles.startingPrice}>
              <span>{copy.startingPriceLabel}</span>
              <strong>{product.startingPrice.formatted}</strong>
              <small>
                {copy.perPersonLabel} · {copy.groupBasis(product.startingPrice.travelers)}
                {product.startingPrice.serviceLabel && <> · {product.startingPrice.serviceLabel}</>}
              </small>
            </p>
            <p className={styles.description}>{product.comparison.appeal}</p>

            <dl className={styles.comparisonList}>
              <div>
                <dt>{copy.paceLabel}</dt>
                <dd>{product.comparison.pace}</dd>
              </div>
              <div>
                <dt>{copy.fitLabel}</dt>
                <dd>{product.comparison.fit}</dd>
              </div>
            </dl>

            <div className={styles.highlights}>
              <p>{copy.highlightsLabel}</p>
              <ul>
                {product.comparison.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <span className={styles.viewTour}>
              {copy.viewLabel}
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </PrivateTourCatalogLink>
      </article>
    </li>
  );
}

function CompactTourComparison({
  product,
  index,
  locale,
  publishedTourCount,
}: {
  product: PublishedPrivateTourCatalogItem;
  index: number;
  locale: HomegroundLocale;
  publishedTourCount: number;
}) {
  const copy = getPrivateTourHubCopy(locale, publishedTourCount);

  return (
    <li data-tour-id={product.id}>
      <PrivateTourCatalogLink
        className={styles.quickLink}
        href={product.href}
        locale={locale}
        position={index + 1}
        productSlug={product.slug}
      >
        <span className={styles.quickNumber} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className={styles.quickIdentity}>
          <p>{product.comparison.route}</p>
          <h3>{product.title}</h3>
          <p className={styles.quickFacts}>
            <span>{copy.duration(product.days, product.nights)}</span>
            <span>
              <span className={styles.visuallyHidden}>{copy.startingPriceLabel}: </span>
              <strong>{product.startingPrice.formatted}</strong>{" "}
              {copy.perPersonLabel} · {copy.groupBasis(product.startingPrice.travelers)}
              {product.startingPrice.serviceLabel && <> · {product.startingPrice.serviceLabel}</>}
            </span>
          </p>
        </div>
        <dl className={styles.quickDetails}>
          <div>
            <dt>{copy.quickFitLabel}</dt>
            <dd>{product.comparison.fit}</dd>
          </div>
          <div>
            <dt>{copy.quickMovementLabel}</dt>
            <dd>{product.comparison.pace}</dd>
          </div>
        </dl>
        <span className={styles.quickAction}>
          <span>{copy.quickAction}</span><span aria-hidden="true">→</span>
        </span>
      </PrivateTourCatalogLink>
    </li>
  );
}

export function PrivateToursHubPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const products = getPublishedPrivateTourCatalog(locale);
  const copy = getPrivateTourHubCopy(locale, products.length);
  const home = getHomegroundCopy(locale);
  const schema = buildPrivateToursHubJsonLd(locale);

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.toursPage}`}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={homeStyles.skipLink} href="#private-tours-main">
        {home.skipLink}
      </a>
      <HomegroundHeader
        locale={locale}
        pageContext="tours"
        languagePaths={getPrivateTourHubLanguagePaths()}
      />

      <main id="private-tours-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
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
                <h1>{copy.title}</h1>
              </div>
              <div className={styles.heroAside}>
                <p>{copy.introduction}</p>
                <a className={styles.heroAction} href="#tour-quick-compare-title">
                  {copy.heroAction}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.quickCompare} aria-labelledby="tour-quick-compare-title">
          <div className={styles.quickIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.quickCompareEyebrow}</p>
              <h2 id="tour-quick-compare-title">{copy.quickCompareTitle}</h2>
            </div>
            <p>{copy.quickCompareIntroduction}</p>
          </div>
          <ol className={styles.quickList}>
            {products.map((product, index) => (
              <CompactTourComparison
                key={product.id}
                product={product}
                index={index}
                locale={locale}
                publishedTourCount={products.length}
              />
            ))}
          </ol>
        </section>

        <section className={styles.catalog} aria-labelledby="tour-catalog-title">
          <div className={styles.catalogIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.catalogEyebrow}</p>
              <h2 id="tour-catalog-title">{copy.catalogTitle}</h2>
            </div>
            <div className={styles.catalogNote}>
              <p>{copy.catalogIntroduction}</p>
              <p>{copy.tourCount(products.length)}</p>
            </div>
          </div>

          <ol className={styles.catalogGrid}>
            {products.map((product, index) => (
              <TourComparisonCard
                key={product.id}
                product={product}
                index={index}
                locale={locale}
                publishedTourCount={products.length}
              />
            ))}
          </ol>
        </section>

        <section className={styles.finalSection} aria-labelledby="tour-final-title">
          <div className={styles.finalInner}>
            <div>
              <p className={styles.finalEyebrow}>{copy.finalEyebrow}</p>
              <h2 id="tour-final-title">{copy.finalTitle}</h2>
            </div>
            <div>
              <p>{copy.finalBody}</p>
              <Link className={styles.finalAction} href={getPrivateTourHubPlannerPath(locale)}>
                {copy.finalAction}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="tours" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
