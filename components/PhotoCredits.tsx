import type { HomegroundLocale } from "../lib/homegroundI18n";
import { tourCardCredits, type PhotoCredit } from "../lib/photoCredits";
import type { PublishedPrivateTourCatalogItem } from "../lib/publishedPrivateTourCatalog";
import { getSightsEditionCopy, type SightsEditionLocale } from "../lib/sightsEditions";
import { getSightsCopy } from "../lib/sightsI18n";
import styles from "./SightsPages.module.css";

/**
 * Credits for openly licensed photos. Nothing is written on a photo: a
 * credit sits on a line under the photo, or under the grid, strip or row of
 * cards that shows it, naming the author, the licence and that the photo was
 * cropped and resized.
 */

/*
 * An edition (lib/sightsEditions.ts) sets its own punctuation: Japanese
 * full-width like Chinese, the Arabic comma, and French's space before a colon.
 */
function comma(locale: HomegroundLocale, edition?: SightsEditionLocale) {
  if (edition) return edition === "ja" ? "、" : edition === "ar" ? "، " : ", ";
  return locale === "zh" ? "，" : ", ";
}

function colon(locale: HomegroundLocale, edition?: SightsEditionLocale) {
  if (edition) return edition === "ja" ? "：" : edition === "fr" ? "\u00a0: " : ": ";
  return locale === "zh" ? "：" : ": ";
}

function parentheses(locale: HomegroundLocale, edition?: SightsEditionLocale) {
  return (edition ? edition === "ja" : locale === "zh") ? ["（", "）"] : [" (", ")"];
}

function edited(locale: HomegroundLocale, edition?: SightsEditionLocale) {
  const word = edition ? getSightsEditionCopy(edition).edited : getSightsCopy(locale).edited;
  const [open, close] = parentheses(locale, edition);
  return `${open}${word}${close}`;
}

export function CreditLinks({ credit, locale, editionLocale }: { credit: PhotoCredit; locale: HomegroundLocale; editionLocale?: SightsEditionLocale }) {
  return (
    <>
      <a href={credit.sourceUrl} rel="noreferrer">{credit.author}</a>
      {comma(locale, editionLocale)}
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
export function PhotoCredits({ items, locale, editionLocale }: {
  items: readonly { key: string; name: string; credit: PhotoCredit | undefined }[];
  locale: HomegroundLocale;
  editionLocale?: SightsEditionLocale;
}) {
  const credited = items.filter((item): item is { key: string; name: string; credit: PhotoCredit } => Boolean(item.credit));
  if (!credited.length) return null;
  const copy = editionLocale ? getSightsEditionCopy(editionLocale) : getSightsCopy(locale);
  const [open, close] = parentheses(locale, editionLocale);
  return (
    <p className={styles.photoCredits}>
      {credited.length === 1 ? copy.photo : copy.photos}{edited(locale, editionLocale)}{colon(locale, editionLocale)}
      {credited.map((item, index) => (
        <span className={styles.creditItem} key={item.key}>
          {index ? <span aria-hidden="true" className={styles.creditSeparator}> · </span> : null}
          {item.name}{open}<CreditLinks credit={item.credit} editionLocale={editionLocale} locale={locale} />{close}
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
