import Link from "next/link";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getHomegroundNavigationModel } from "../lib/homegroundNavigationModel";
import {
  getTourCollectionGroups,
  tourCollectionPaths,
  type TourCollectionId,
} from "../lib/tourCollections";
import { getTourCollectionsCopy } from "../lib/tourCollectionsI18n";
import { getTravelInspirationCopy } from "../lib/travelInspirationI18n";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  JsonLd,
  navigationFor,
  ServiceRows,
  SITE_URL,
  TourCard,
} from "./DestinationParts";
import { HomegroundFooter } from "./HomegroundFooter";
import { TourPhotoCredits } from "./PhotoCredits";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { RevealOnce } from "./motion/RevealOnce";
import { KeepWords } from "./text/KeepWords";
import styles from "./TravelInspiration.module.css";
import sightStyles from "./SightsPages.module.css";

/**
 * /tours/<collection>/: a row of the Private Tours menu. The published
 * catalogue seen one way (multi-city by length, single region by region, the
 * season's pick), in the Destinations pages' look: groups of tour cards, a
 * "plan it with us" tile where a row is not full, then the services.
 * "Private Tours" itself still opens the full catalogue at /tours/.
 */
export function TourCollectionPage({ locale = "en", collectionId }: { locale?: HomegroundLocale; collectionId: TourCollectionId }) {
  const home = getHomegroundCopy(locale);
  const copy = getTourCollectionsCopy(locale);
  const inspiration = getTravelInspirationCopy(locale);
  const collection = copy.collections[collectionId];
  const groups = getTourCollectionGroups(collectionId, locale);
  const tours = groups.flatMap((group) => group.tours);
  const days = tours.map((tour) => tour.days);
  const { tours: toursItem } = navigationFor(locale);
  // The other ways in (the Private Tours menu's rows), so phones that hide the menu rows still reach them.
  const otherWays = (getHomegroundNavigationModel(locale, home.path).menus.tours?.entries ?? []).filter((entry) => entry.id !== collectionId);
  const paths = tourCollectionPaths(collectionId);
  const url = `${SITE_URL}${paths[locale]}`;
  const crumbs = [
    { name: inspiration.home, path: home.path },
    ...(toursItem ? [{ name: toursItem.label, path: toursItem.href }] : []),
    { name: collection.name },
  ];
  const groupTitle = (group: (typeof groups)[number]) => group.label ?? collection.groups[group.id]?.title ?? "";

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#collection-main">{home.skipLink}</a>
      <HomegroundHeader languagePaths={paths} locale={locale} pageContext="tour-collection" />
      <main id="collection-main" tabIndex={-1}>
        <RevealOnce />

        <header className={`${styles.hero} ${styles.themeHero}`}>
          <Breadcrumb items={crumbs} label={inspiration.breadcrumb} />
          <p className={styles.eyebrow}>{copy.facts(tours.length, Math.min(...days), Math.max(...days))}</p>
          <h1>{collection.h1Lines.map((line) => <span key={line}>{line}</span>)}</h1>
          <p className={styles.lede}><KeepWords locale={locale} text={collection.lede} /></p>
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
                    {note ? <p><KeepWords locale={locale} text={note} /></p> : null}
                  </div>
                ) : null}
                <ul className={[styles.tours, collectionId === "regions" ? sightStyles.denseTours : "", group.tours.length === 2 ? sightStyles.pairTours : ""].join(" ")}>
                  {group.tours.map((tour, index) => <TourCard index={index} key={tour.slug} locale={locale} tour={tour} />)}
                </ul>
                <TourPhotoCredits locale={locale} tours={group.tours} />
              </div>
            );
          })}
          {otherWays.length ? (
            <nav aria-labelledby="collection-other-ways" className={sightStyles.otherWays}>
              <p id="collection-other-ways">{copy.otherWays}</p>
              <div className={sightStyles.cityChips}>
                {otherWays.map((entry) => <Link href={entry.href} key={entry.id}>{entry.label}</Link>)}
              </div>
            </nav>
          ) : null}
        </section>

        <section aria-labelledby="collection-services-title" className={styles.cta} data-reveal="">
          <div>
            <h2 id="collection-services-title">{copy.servicesTitle}</h2>
            <p><KeepWords locale={locale} text={copy.servicesLede} /></p>
            {/* "All private tours" is already among the other ways in, just above. */}
          </div>
          <ServiceRows locale={locale} />
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="tour-collection" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: collection.metadata.title, description: collection.metadata.description,
            inLanguage: home.htmlLang, isPartOf: { "@id": `${SITE_URL}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` },
            mainEntity: { "@type": "ItemList", itemListElement: tours.map((tour, index) => ({
              "@type": "ListItem", position: index + 1, name: tour.title, url: `${SITE_URL}${tour.href}`,
            })) } },
          breadcrumbJsonLd(url, crumbs.map((crumb) => ({ name: crumb.name, path: crumb.path ?? paths[locale] }))),
        ],
      }} />
    </div>
  );
}
