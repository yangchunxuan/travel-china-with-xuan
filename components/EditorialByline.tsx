import Link from "next/link";
import { arabicSitePagePathByEnglishPath } from "../lib/arabicEditionIndex";
import type { DestinationEditionLocale } from "../lib/destinationEditions";
import { getEditorialAuthor } from "../lib/editorialIdentity";
import { frenchSitePagePathByEnglishPath } from "../lib/frenchEditionIndex";
import { germanSitePagePathByEnglishPath } from "../lib/germanEditionIndex";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { japaneseSite } from "../lib/japaneseSite";
import { spanishSitePagePathByEnglishPath } from "../lib/spanishEditionIndex";
import styles from "./EditorialByline.module.css";

const copy = {
  en: { by: "By", reviewed: "Facts reviewed" },
  zh: { by: "作者", reviewed: "事实核对" },
  ko: { by: "작성", reviewed: "사실 검토" },
} as const;

export function EditorialByline({
  locale,
  reviewedAt,
  compact = false,
}: {
  locale: HomegroundLocale;
  reviewedAt: string;
  compact?: boolean;
}) {
  const author = getEditorialAuthor(locale);
  const date = new Intl.DateTimeFormat(
    locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-GB",
    { dateStyle: "long", timeZone: "UTC" },
  ).format(new Date(`${reviewedAt}T00:00:00Z`));

  return (
    <p className={`${styles.byline} ${compact ? styles.compact : ""}`}>
      <span>{copy[locale].by} <Link href={author.path}>{author.name}</Link></span>
      <span aria-hidden="true">·</span>
      <span>{copy[locale].reviewed} <time dateTime={reviewedAt}>{date}</time></span>
    </p>
  );
}

/** Each edition's own page for an English site page, where it has one. */
const editionSitePages: Readonly<Record<DestinationEditionLocale, Readonly<Record<string, string>>>> = {
  fr: frenchSitePagePathByEnglishPath,
  de: germanSitePagePathByEnglishPath,
  es: spanishSitePagePathByEnglishPath,
  ar: arabicSitePagePathByEnglishPath,
  ja: { "/studio/evan/": japaneseSite.author },
};

/**
 * The byline in an edition: the author's page in the edition's language once
 * its edition index lists one; until then the English profile, with the
 * edition's marker and hrefLang="en".
 */
export function EditionByline({ language, by, reviewed, dateLocale, reviewedAt, marker }: {
  language: DestinationEditionLocale;
  by: string;
  reviewed: string;
  dateLocale: string;
  reviewedAt: string;
  /** The label of the English profile link, with the edition's marker. */
  marker: (name: string) => string;
}) {
  const author = getEditorialAuthor("en");
  const localPath = editionSitePages[language][author.path];
  const date = new Intl.DateTimeFormat(dateLocale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${reviewedAt}T00:00:00Z`));
  return (
    <p className={styles.byline}>
      <span>{by} {localPath ? <Link href={localPath}>{author.name}</Link> : <Link href={author.path} hrefLang="en">{marker(author.name)}</Link>}</span>
      <span aria-hidden="true">·</span>
      <span>{reviewed} <time dateTime={reviewedAt}>{date}</time></span>
    </p>
  );
}
