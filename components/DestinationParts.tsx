import Link from "next/link";
import { ArrowRight, Route, Ticket, UserRound } from "lucide-react";
import type { CSSProperties } from "react";
import { getDestinationHubEntry, type DestinationHubId } from "../lib/destinationHubs";
import { generatedImageSrcSet } from "../lib/generatedImageSrcSet";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getHomegroundNavigationModel, type HomegroundSubmenuId } from "../lib/homegroundNavigationModel";
import type { PublishedPrivateTourCatalogItem } from "../lib/publishedPrivateTourCatalog";
import { getTravelInspirationCopy } from "../lib/travelInspirationI18n";
import { privateTourCardImageSource, privateTourCardImageSrcSet } from "./privateTourCardImages";
import { KeepStops, KeepWords } from "./text/KeepWords";
import styles from "./TravelInspiration.module.css";

/*
 * Parts shared by the Destinations pages (Travel Inspiration, Must-see
 * Sights): breadcrumb, JSON-LD, the city strip, tour cards drawn from the
 * published catalogue, and the service rows named as the Services menu
 * names them. One stylesheet (TravelInspiration.module.css) styles them all.
 */

export const SITE_URL = "https://homegroundchina.com";

/** Reveal stagger: cards settle left to right in rows of up to four. */
export const revealDelay = (index: number) => ({ "--d": `${(index % 4) * 60}ms` }) as CSSProperties;

export function navigationFor(locale: HomegroundLocale) {
  const home = getHomegroundCopy(locale);
  const navigation = getHomegroundNavigationModel(locale, home.path);
  return {
    destinations: navigation.items.find((item) => item.id === "destinations"),
    tours: navigation.items.find((item) => item.id === "tours"),
    services: navigation.menus.services?.entries ?? [],
  };
}

export function breadcrumbJsonLd(url: string, items: readonly { name: string; path: string }[]) {
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

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Breadcrumb({ label, items }: { label: string; items: readonly { name: string; path?: string }[] }) {
  return (
    <nav aria-label={label} className={styles.breadcrumb}>
      <ol>
        {items.map((item, index) => (
          <li aria-current={item.path ? undefined : "page"} key={item.name}>
            {item.path ? <Link href={item.path}>{item.name}</Link> : item.name}
            {/* The separator ends its item, so a wrapped line never starts with "/". */}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
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
export function CityStrip({ cityIds, locale, columns }: { cityIds: readonly DestinationHubId[]; locale: HomegroundLocale; columns: number }) {
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
export function tourTitle(title: string, locale: HomegroundLocale) {
  if (locale === "ko") return title.replace("프라이빗 투어", `프라이빗${nbsp}투어`);
  if (locale === "en") return title.replace("Hong Kong", `Hong${nbsp}Kong`);
  return title;
}

/**
 * Chinese place names in tour titles the word segmenter would split
 * (三星|堆, 游|轮). KeepWords keeps them as plain text with no <wbr> inside;
 * an earlier nowrap-span version froze Chrome in balanced headings.
 */
const tourTitleKeepWords = ["三星堆", "九寨沟", "武隆", "游轮", "峰林", "天门山", "岭南", "水乡", "大熊猫"] as const;

/**
 * Ends a row of tour cards that the tours do not fill: the way to a trip
 * planned around you, one column wide. A lone card before it turns into a
 * wide card (TravelInspiration.module.css), so the row never leaves a large
 * empty tile. Phones reach the same service in the closing band instead.
 */
export function PlanTile({ count, locale }: { count: number; locale: HomegroundLocale }) {
  const fullTrip = navigationFor(locale).services.find((entry) => entry.id === "trip-support");
  if (!fullTrip || count % 3 === 0) return null;
  const copy = getTravelInspirationCopy(locale).theme.planTile;
  return (
    <li className={styles.planTileItem} style={revealDelay(count)}>
      <Link className={styles.planTile} href={fullTrip.href}>
        <span aria-hidden="true" className={styles.planIcon}><Route size={18} strokeWidth={1.7} /></span>
        <strong>{count === 1 ? copy.titleOne : copy.title}</strong>
        <span><KeepWords locale={locale} text={copy.body} /></span>
        <span className={styles.cardAction}>{copy.action}<ArrowRight aria-hidden="true" size={15} /></span>
      </Link>
    </li>
  );
}

export function TourCard({ tour, locale, index }: { tour: PublishedPrivateTourCatalogItem; locale: HomegroundLocale; index: number }) {
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
        </span>
        <span className={styles.tourText}>
          <h4><KeepWords keep={tourTitleKeepWords} locale={locale} text={tourTitle(tour.title, locale)} /></h4>
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

/**
 * The services, named and described exactly as the header's Services menu
 * does. `lead` goes first (full-trip planning by default: a trip no route
 * fits); `omit` drops a service the page cannot offer.
 */
export function ServiceRows({ locale, lead = "trip-support", omit = [] }: {
  locale: HomegroundLocale;
  lead?: HomegroundSubmenuId;
  omit?: readonly HomegroundSubmenuId[];
}) {
  const ordered = navigationFor(locale).services
    .filter((entry) => !omit.includes(entry.id))
    .sort((a, b) => Number(b.id === lead) - Number(a.id === lead));
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
