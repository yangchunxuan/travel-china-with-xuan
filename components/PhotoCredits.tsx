import type { HomegroundLocale } from "../lib/homegroundI18n";
import { tourCardCredits, type PhotoCredit } from "../lib/photoCredits";
import type { PublishedPrivateTourCatalogItem } from "../lib/publishedPrivateTourCatalog";
import { getSightsCopy } from "../lib/sightsI18n";
import styles from "./SightsPages.module.css";

/**
 * Credits for openly licensed photos. Nothing is written on a photo: a
 * credit sits on a line under the photo, or under the grid, strip or row of
 * cards that shows it, naming the author, the licence and that the photo was
 * cropped and resized.
 */

function comma(locale: HomegroundLocale) {
  return locale === "zh" ? "，" : ", ";
}

function colon(locale: HomegroundLocale) {
  return locale === "zh" ? "：" : ": ";
}

function edited(locale: HomegroundLocale) {
  const word = getSightsCopy(locale).edited;
  return locale === "zh" ? `（${word}）` : ` (${word})`;
}

export function CreditLinks({ credit, locale }: { credit: PhotoCredit; locale: HomegroundLocale }) {
  return (
    <>
      <a href={credit.sourceUrl} rel="noreferrer">{credit.author}</a>
      {comma(locale)}
      <a className={styles.license} href={credit.licenseUrl} rel="license noreferrer">{credit.license}</a>
    </>
  );
}

/** One photo's credit, under that photo. */
export function PhotoCreditLine({ credit, locale, className }: { credit: PhotoCredit; locale: HomegroundLocale; className?: string }) {
  return (
    <p className={className ?? styles.photoCredits}>
      {getSightsCopy(locale).photo}{edited(locale)}{colon(locale)}<CreditLinks credit={credit} locale={locale} />
    </p>
  );
}

/** The credits of the openly licensed photos in a grid, strip or row, named by what each shows. */
export function PhotoCredits({ items, locale }: {
  items: readonly { key: string; name: string; credit: PhotoCredit | undefined }[];
  locale: HomegroundLocale;
}) {
  const credited = items.filter((item): item is { key: string; name: string; credit: PhotoCredit } => Boolean(item.credit));
  if (!credited.length) return null;
  const copy = getSightsCopy(locale);
  return (
    <p className={styles.photoCredits}>
      {credited.length === 1 ? copy.photo : copy.photos}{edited(locale)}{colon(locale)}
      {credited.map((item, index) => (
        <span className={styles.creditItem} key={item.key}>
          {index ? <span aria-hidden="true" className={styles.creditSeparator}> · </span> : null}
          {item.name}{locale === "zh" ? "（" : " ("}<CreditLinks credit={item.credit} locale={locale} />{locale === "zh" ? "）" : ")"}
        </span>
      ))}
    </p>
  );
}

/** Under a row of tour cards: the credits of the card photos that need one. */
export function TourPhotoCredits({ tours, locale }: { tours: readonly PublishedPrivateTourCatalogItem[]; locale: HomegroundLocale }) {
  return (
    <PhotoCredits
      items={tours.map((tour) => ({ key: tour.slug, name: tour.title, credit: tourCardCredits[tour.slug] }))}
      locale={locale}
    />
  );
}
