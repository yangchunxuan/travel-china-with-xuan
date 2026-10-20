import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight, Route, Ticket, UserRound } from "lucide-react";
import { arabicGuideLanguageBadge } from "../lib/arabicSite";
import { frenchGuideLanguageBadge } from "../lib/frenchSite";
import { germanGuideLanguageBadge } from "../lib/germanSite";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getHomegroundNavigationModel, homegroundServiceNavigationIds, homegroundTourNavigationIds } from "../lib/homegroundNavigationModel";
import { getJapanesePublishedTourCatalog } from "../lib/japanesePublishedTourCatalog";
import { japaneseTourCollectionsGuideNote } from "../lib/japaneseTourCollectionsCopy";
import { tourCardCredits } from "../lib/photoCredits";
import type { PublishedPrivateTourCatalogItem } from "../lib/publishedPrivateTourCatalog";
import { spanishGuideLanguageBadge } from "../lib/spanishSite";
import {
  getTourCollectionEditionGroups,
  getTourCollectionGroups,
  tourCollectionEditionPath,
  tourCollectionLanguagePaths,
  tourCollectionPaths,
  type TourCollectionEditionLocale,
  type TourCollectionId,
} from "../lib/tourCollections";
import { getTourCollectionEditionCopy, type TourCollectionEditionCopy } from "../lib/tourCollectionsEditions";
import { getTourCollectionsCopy } from "../lib/tourCollectionsI18n";
import { getPrivateTourHubCopy } from "../lib/privateTourHubI18n";
import {
  getNortheastWinterComparisonRows,
  northeastWinterComparisonCopy,
} from "../lib/northeastWinterComparison";
import { getTravelInspirationCopy } from "../lib/travelInspirationI18n";
import { getArabicPublishedTourCatalog } from "./ArabicToursHubPage";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  JsonLd,
  navigationFor,
  revealDelay,
  ServiceRows,
  SITE_URL,
  TourCard,
} from "./DestinationParts";
import { EditionSiteFooter, EditionSiteHeader } from "./EditionSiteChrome";
import { getFrenchPublishedTourCatalog } from "./FrenchToursHubPage";
import { getGermanPublishedTourCatalog } from "./GermanToursHubPage";
import { HomegroundFooter } from "./HomegroundFooter";
import { TourPhotoCredits } from "./PhotoCredits";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { RevealOnce } from "./motion/RevealOnce";
import { getSpanishPublishedTourCatalog } from "./SpanishToursHubPage";
import { KeepWords } from "./text/KeepWords";
import styles from "./TravelInspiration.module.css";
import sightStyles from "./SightsPages.module.css";

/**
 * Each edition's own tour catalogue: the cards on its /xx/tours/ page, with
 * the names, links and prices its tour pages show.
 */
const editionTourCatalogs: Record<TourCollectionEditionLocale, () => readonly PublishedPrivateTourCatalogItem[]> = {
  fr: getFrenchPublishedTourCatalog,
  es: getSpanishPublishedTourCatalog,
  de: getGermanPublishedTourCatalog,
  ar: getArabicPublishedTourCatalog,
  ja: getJapanesePublishedTourCatalog,
};

/** Each edition's standing line on its tour pages: a guide in the reader's language is not in the published price. */
const editionGuideLanguageNotes: Record<TourCollectionEditionLocale, string> = {
  fr: frenchGuideLanguageBadge,
  es: spanishGuideLanguageBadge,
  de: germanGuideLanguageBadge,
  ar: arabicGuideLanguageBadge,
  ja: japaneseTourCollectionsGuideNote,
};

/**
 * /tours/<collection>/: a row of the Private Tours menu. The published
 * catalogue seen one way (multi-city by length, single region by region, the
 * season's pick), in the Destinations pages' look: groups of tour cards, a
 * "plan it with us" tile where a row is not full, then the services.
 * "Private Tours" itself still opens the full catalogue at /tours/.
 *
 * With `editionLocale` (French, Spanish, German, Arabic, Japanese): the same sections in
 * that edition's language, header and footer, its tours taken from its own
 * catalogue and its links to its own pages.
 */
export function TourCollectionPage({ locale = "en", collectionId, editionLocale }: {
  locale?: HomegroundLocale;
  collectionId: TourCollectionId;
  editionLocale?: TourCollectionEditionLocale;
}) {
  const home = getHomegroundCopy(locale);
  const edition = editionLocale ? getTourCollectionEditionCopy(editionLocale) : null;
  const copy = edition ?? getTourCollectionsCopy(locale);
  const inspiration = getTravelInspirationCopy(locale);
  // The editions' scripts break between words as English does; Japanese between phrases.
  const textLocale: HomegroundLocale = editionLocale ? "en" : locale;
  const proseLocale = editionLocale === "ja" ? "ja" : textLocale;
  const collection = copy.collections[collectionId];
  const groups = editionLocale && edition
    ? getTourCollectionEditionGroups(collectionId, editionTourCatalogs[editionLocale](), edition.regionLabels)
    : getTourCollectionGroups(collectionId, locale);
  const tours = groups.flatMap((group) => group.tours);
  const winterComparison = collectionId === "seasonal"
    ? edition
      ? { copy: edition.winter, rows: editionWinterRows(tours, edition) }
      : {
          copy: northeastWinterComparisonCopy[locale],
          rows: getNortheastWinterComparisonRows(tours, locale),
        }
    : null;
  // TourCard types its price words as the en/zh/ko catalogue's own; an edition's are its catalogue's.
  const winterCardPriceCopy: ComponentProps<typeof TourCard>["priceCopy"] = winterComparison
    ? (edition?.priceCopy as ComponentProps<typeof TourCard>["priceCopy"] | undefined) ?? getPrivateTourHubCopy(locale, tours.length)
    : undefined;
  const days = tours.map((tour) => tour.days);
  const { tours: toursItem } = navigationFor(locale);
  // The other ways in (the Private Tours menu's rows), so phones that hide the menu rows still reach them.
  const otherWays = edition
    ? homegroundTourNavigationIds.filter((id) => id !== collectionId).map((id) => ({ id, href: edition.tourMenu[id].href, label: edition.tourMenu[id].label }))
    : (getHomegroundNavigationModel(locale, home.path).menus.tours?.entries ?? []).filter((entry) => entry.id !== collectionId);
  const pagePath = editionLocale ? tourCollectionEditionPath(collectionId, editionLocale) : tourCollectionPaths(collectionId)[locale];
  const languagePaths = tourCollectionLanguagePaths(collectionId);
  const url = `${SITE_URL}${pagePath}`;
  const crumbs = edition
    ? [
        { name: edition.home, path: `/${editionLocale}/` },
        { name: edition.tours, path: `/${editionLocale}/tours/` },
        { name: collection.name },
      ]
    : [
        { name: inspiration.home, path: home.path },
        ...(toursItem ? [{ name: toursItem.label, path: toursItem.href }] : []),
        { name: collection.name },
      ];
  const groupTitle = (group: (typeof groups)[number]) => group.label ?? collection.groups[group.id]?.title ?? "";

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}${editionLocale === "ja" ? ` ${styles.japaneseCards}` : ""}`} data-homeground-locale={editionLocale ?? locale} lang={editionLocale ?? home.htmlLang}>
      <a className={localeStyles.skipLink} href="#collection-main">{edition?.skipLink ?? home.skipLink}</a>
      {editionLocale
        ? <EditionSiteHeader currentPath={pagePath} language={editionLocale} languagePaths={languagePaths} />
        : <HomegroundHeader languagePaths={languagePaths} locale={locale} pageContext="tour-collection" />}
      <main id="collection-main" tabIndex={-1}>
        <RevealOnce />

        <header className={`${styles.hero} ${styles.themeHero}`}>
          <Breadcrumb items={crumbs} label={edition?.breadcrumbLabel ?? inspiration.breadcrumb} />
          <p className={styles.eyebrow}>{copy.facts(tours.length, Math.min(...days), Math.max(...days))}</p>
          <h1>{collection.h1Lines.map((line) => <span key={line}>{line}</span>)}</h1>
          <p className={styles.lede}><KeepWords locale={proseLocale} text={collection.lede} /></p>
          {/* More than one group: a row of links to each (with its count), as the sights hub does for cities. */}
          {groups.length > 1 ? (
            <nav aria-label={collection.name} className={sightStyles.cityChips}>
              {groups.map((group) => (
                <a href={`#routes-${group.id}`} key={group.id}>
                  {groupTitle(group)}
                  <span className={sightStyles.chipCount}>{group.tours.length}</span>
                </a>
              ))}
            </nav>
          ) : null}
        </header>

        {/* Rows simply end where they end: the closing band below asks
            "No route fits?" once, instead of a tile in every group. */}
        <section aria-label={collection.name} className={styles.section} id="routes">
          {groups.map((group) => {
            const groupDays = group.tours.map((tour) => tour.days);
            const note = collection.groups[group.id]?.note;
            return (
              <div className={styles.group} data-reveal="" id={`routes-${group.id}`} key={group.id}>
                {/* One group (the season's pick): the H1 already names it. */}
                {groups.length > 1 ? (
                  <div className={styles.groupHead}>
                    <h2 className={sightStyles.groupTitle}>{groupTitle(group)}</h2>
                    <p className={sightStyles.groupMeta}>{copy.groupMeta(group.tours.length, Math.min(...groupDays), Math.max(...groupDays))}</p>
                    {note ? <p><KeepWords locale={proseLocale} text={note} /></p> : null}
                  </div>
                ) : null}
                <ul className={[styles.tours, collectionId === "regions" ? sightStyles.denseTours : "", group.tours.length === 2 ? sightStyles.pairTours : ""].join(" ")}>
                  {group.tours.map((tour, index) => (
                    <TourCard
                      actionLabel={edition?.tourAction}
                      editionLocale={editionLocale === "ja" ? "ja" : undefined}
                      index={index}
                      key={tour.slug}
                      locale={textLocale}
                      priceCopy={winterCardPriceCopy}
                      priceSeasonLabel={winterComparison?.copy.cardSeasonLabel}
                      tour={tour}
                    />
                  ))}
                </ul>
                {edition?.photoCredits
                  ? <EditionTourPhotoCredits tours={group.tours} words={edition.photoCredits} />
                  : <TourPhotoCredits editionLocale={editionLocale === "ja" ? "ja" : undefined} locale={locale} tours={group.tours} />}
              </div>
            );
          })}
          {/* As on every tour page of the edition: a guide in its language is not in the published price. */}
          {editionLocale ? <p className={styles.winterComparisonNote}>{editionGuideLanguageNotes[editionLocale]}</p> : null}
          {otherWays.length ? (
            <nav aria-labelledby="collection-other-ways" className={sightStyles.otherWays}>
              <p id="collection-other-ways">{copy.otherWays}</p>
              <div className={sightStyles.cityChips}>
                {otherWays.map((entry) => <Link href={entry.href} key={entry.id}>{entry.label}</Link>)}
              </div>
            </nav>
          ) : null}
        </section>

        {winterComparison ? (
          <section aria-labelledby="winter-route-comparison" className={`${styles.section} ${styles.winterComparison}`}>
            <h2 id="winter-route-comparison">{winterComparison.copy.title}</h2>
            <p className={styles.winterComparisonIntro}>{winterComparison.copy.intro}</p>
            <div className={styles.winterComparisonScroll} role="region" aria-label={winterComparison.copy.title} tabIndex={0}>
              <table className={styles.winterComparisonTable}>
                <thead>
                  <tr>
                    <th scope="col">{winterComparison.copy.route}</th>
                    <th scope="col">{winterComparison.copy.nights}</th>
                    <th scope="col">{winterComparison.copy.fit}</th>
                    <th scope="col">{winterComparison.copy.travel}</th>
                    <th scope="col">{winterComparison.copy.price}</th>
                  </tr>
                </thead>
                <tbody>
                  {winterComparison.rows.map(({ tour, nights }) => (
                    <tr key={tour.slug}>
                      <th scope="row"><Link href={tour.href}>{tour.title}</Link></th>
                      <td>{nights}</td>
                      <td>{tour.comparison.fit}</td>
                      <td>{tour.comparison.pace}</td>
                      <td className={styles.winterComparisonPrice}>
                        <strong>{tour.twoTravellerPrice!.formatted}</strong>
                        <span>{winterComparison.copy.priceBasis}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.winterComparisonNote}>{winterComparison.copy.priceNote}</p>
          </section>
        ) : null}

        <section aria-labelledby="collection-services-title" className={styles.cta} data-reveal="">
          <div>
            <h2 id="collection-services-title">{copy.servicesTitle}</h2>
            <p><KeepWords locale={proseLocale} text={copy.servicesLede} /></p>
            {/* "All private tours" is already among the other ways in, just above. */}
          </div>
          {edition ? <EditionServiceRows entries={edition.serviceMenu} /> : <ServiceRows locale={locale} />}
        </section>
      </main>
      {editionLocale
        ? <EditionSiteFooter currentPath={pagePath} language={editionLocale} />
        : <HomegroundFooter locale={locale} pageContext="tour-collection" />}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: collection.metadata.title, description: collection.metadata.description,
            inLanguage: editionLocale ?? home.htmlLang, isPartOf: { "@id": `${SITE_URL}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` },
            mainEntity: { "@type": "ItemList", itemListElement: tours.map((tour, index) => ({
              "@type": "ListItem", position: index + 1, name: tour.title, url: `${SITE_URL}${tour.href}`,
            })) } },
          breadcrumbJsonLd(url, crumbs.map((crumb) => ({ name: crumb.name, path: crumb.path ?? pagePath }))),
        ],
      }} />
    </div>
  );
}

/** The English table's rows (the five routes with a two-traveller price), with the edition's words for each overnight plan. */
function editionWinterRows(tours: readonly PublishedPrivateTourCatalogItem[], edition: TourCollectionEditionCopy) {
  const routeNights: Readonly<Partial<Record<string, string>>> = edition.winter.routeNights;
  return getNortheastWinterComparisonRows(tours, "en").map(({ tour }) => {
    const nights = routeNights[tour.slug];
    if (!nights) throw new Error(`No overnight plan in this edition for ${tour.slug}`);
    return { tour, nights };
  });
}

const editionServiceIcons: Partial<Record<(typeof homegroundServiceNavigationIds)[number], typeof Route>> = {
  "trip-support": Route,
  "english-guides": UserRound,
  "attraction-tickets": Ticket,
};

/** The services as the edition header's Services menu names and describes them, full-trip planning first (as ServiceRows). */
function EditionServiceRows({ entries }: { entries: TourCollectionEditionCopy["serviceMenu"] }) {
  const ordered = [...homegroundServiceNavigationIds].sort((a, b) => Number(b === "trip-support") - Number(a === "trip-support"));
  return (
    <ul className={styles.services}>
      {ordered.map((id, index) => {
        const entry = entries[id];
        const Icon = editionServiceIcons[id] ?? Route;
        return (
          <li key={id} style={revealDelay(index)}>
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

/** Under a row of cards: the credits of the openly licensed card photos, in the edition's words (as TourPhotoCredits). */
function EditionTourPhotoCredits({ tours, words }: {
  tours: readonly PublishedPrivateTourCatalogItem[];
  words: NonNullable<TourCollectionEditionCopy["photoCredits"]>;
}) {
  const credited = tours.flatMap((tour) => {
    const credit = tourCardCredits[tour.slug];
    return credit ? [{ key: tour.slug, name: tour.title, credit }] : [];
  });
  if (!credited.length) return null;
  return (
    <p className={sightStyles.photoCredits}>
      {credited.length === 1 ? words.photo : words.photos} ({words.edited(credited.length)}){words.colon}
      {credited.map((item, index) => (
        <span className={sightStyles.creditItem} key={item.key}>
          {index ? <span aria-hidden="true" className={sightStyles.creditSeparator}> · </span> : null}
          {item.name} (<a href={item.credit.sourceUrl} rel="noreferrer">{item.credit.author}</a>{words.comma}<a className={sightStyles.license} href={item.credit.licenseUrl} rel="license noreferrer">{item.credit.license}</a>)
        </span>
      ))}
    </p>
  );
}
