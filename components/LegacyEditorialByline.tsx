import Link from "next/link";
import { getEditorialAuthor } from "../lib/editorialIdentity";
import { getGuideEntry, type GuideId } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getGuideCollectionId,
  getSearchCollection,
  getSearchCollectionPath,
} from "../lib/searchCollectionI18n";
import styles from "./LegacyEditorialByline.module.css";

const copy = {
  en: { by: "By", reviewed: "Facts reviewed", filed: "Filed under" },
  zh: { by: "作者", reviewed: "事实核对", filed: "归入" },
  ko: { by: "작성", reviewed: "사실 검토", filed: "분류" },
} as const;

/**
 * Visible editorial attribution for bespoke legacy guide layouts.
 * It deliberately inherits the surrounding hero colour so the same semantic
 * byline remains legible on both photograph-led and light editorial headers.
 */
export function LegacyEditorialByline({
  guideId,
  locale,
  reviewedAt,
}: {
  guideId: GuideId;
  locale: HomegroundLocale;
  reviewedAt: string;
}) {
  const author = getEditorialAuthor(locale);
  const guide = getGuideEntry(guideId, locale);
  const collection = getSearchCollection(getGuideCollectionId(guide));
  const collectionPath = getSearchCollectionPath(collection, locale);
  const date = new Intl.DateTimeFormat(
    locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-GB",
    { dateStyle: "long", timeZone: "UTC" },
  ).format(new Date(`${reviewedAt}T00:00:00Z`));

  return (
    <p className={styles.byline}>
      <span>
        {copy[locale].by} <Link href={author.path}>{author.name}</Link>
      </span>
      <span aria-hidden="true">·</span>
      <span>
        {copy[locale].reviewed}{" "}
        <time dateTime={reviewedAt}>{date}</time>
      </span>
      <span aria-hidden="true">·</span>
      <span>
        {copy[locale].filed}{" "}
        <Link href={collectionPath}>{collection.locales[locale].label}</Link>
      </span>
    </p>
  );
}
