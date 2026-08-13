import Link from "next/link";
import { getEditorialAuthor } from "../lib/editorialIdentity";
import type { HomegroundLocale } from "../lib/homegroundI18n";
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
