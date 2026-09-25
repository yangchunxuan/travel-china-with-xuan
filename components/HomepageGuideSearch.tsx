import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  getGuideSearchCopy,
  getGuideSearchIndexPath,
} from "../lib/guideSearchI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import type {
  HomepageGuideChapter,
  HomepageGuideRailItem,
  HomepageSearchDemo,
} from "../lib/homepageEditorial";
import {
  getHomepageGuidePath,
  type HomepageGuidePathId,
} from "../lib/homepageShowcaseI18n";
import { GuideSearchForm } from "./GuideSearchForm";
import styles from "./HomepageGuideSearch.module.css";

// Three chapters side by side up to 77rem; one card at a time, swiped, below 64rem.
const chapterPhotoSizes =
  "(max-width: 63.999rem) 82vw, (max-width: 80rem) calc((100vw - 9rem) / 3), 23.5rem";

/**
 * The homepage's travel guides: a China trip in three chapters (the route
 * and its pace, getting there, where to stay). Each chapter opens its topic
 * page and lists the first guides of that topic, whose titles are the
 * questions travellers ask. Search sits beside the heading for anyone who
 * already has a question.
 */
export function HomepageGuideSearch({
  chapters,
  demos,
  guidePaths,
  locale,
  onGuideClick,
  viewAllHref,
  viewAllLabel,
}: {
  chapters: readonly HomepageGuideChapter[];
  demos: readonly HomepageSearchDemo[];
  guidePaths: {
    readonly listLabel: string;
    readonly items: readonly {
      readonly id: HomepageGuidePathId;
      readonly title: string;
    }[];
  };
  locale: HomegroundLocale;
  onGuideClick?: (guide: HomepageGuideRailItem) => void;
  viewAllHref: string;
  viewAllLabel: string;
}) {
  const copy = getGuideSearchCopy(locale);

  return (
    <section
      className={styles.finder}
      aria-labelledby="homepage-guide-search-title"
      id="homepage-guide-search"
    >
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="homepage-guide-search-title">{copy.title}</h2>
        <p className={styles.body}>{copy.introduction}</p>
      </div>
      <div className={styles.formArea}>
        <GuideSearchForm
          documentsUrl={getGuideSearchIndexPath(locale)}
          locale={locale}
          rotatingPlaceholders={demos.map(({ query }) => query)}
          showExamples={false}
          surface="homepage"
        />
      </div>
      <nav className={styles.chapters} aria-label={guidePaths.listLabel}>
        <ol>
          {chapters.map((chapter, index) => {
            const path = guidePaths.items.find((item) => item.id === chapter.id);
            if (!path) return null;
            const topicHref = getHomepageGuidePath(locale, chapter.id);
            return (
              <li className={styles.chapter} key={chapter.id}>
                {/* The photo repeats the chapter link below it. */}
                <Link
                  aria-hidden="true"
                  className={styles.chapterPhoto}
                  href={topicHref}
                  tabIndex={-1}
                >
                  <Image
                    alt=""
                    decoding="async"
                    height={chapter.photo.height}
                    loading="lazy"
                    sizes={chapterPhotoSizes}
                    src={chapter.photo.src}
                    width={chapter.photo.width}
                  />
                </Link>
                <h3 className={styles.chapterTitle}>
                  <span aria-hidden="true" className={styles.chapterNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Link href={topicHref}>
                    {path.title}
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </Link>
                </h3>
                <ul className={styles.questions}>
                  {chapter.guides.map((guide) => (
                    <li key={guide.id}>
                      <Link href={guide.href} onClick={() => onGuideClick?.(guide)}>
                        <span>{guide.title}</span>
                        <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </nav>
      <div className={styles.footer}>
        <Link className={styles.viewAll} href={viewAllHref}>
          {viewAllLabel}
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  );
}
