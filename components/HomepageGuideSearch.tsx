import { ArrowUpRight } from "lucide-react";
import {
  getGuideSearchCopy,
  getGuideSearchIndexPath,
} from "../lib/guideSearchI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getHomepageGuidePath,
  type HomepageGuidePathId,
} from "../lib/homepageShowcaseI18n";
import type { HomepageSearchDemo } from "../lib/homepageEditorial";
import { GuideSearchForm } from "./GuideSearchForm";
import styles from "./HomepageGuideSearch.module.css";

export function HomepageGuideSearch({
  demos,
  guidePaths,
  locale,
}: {
  demos: readonly HomepageSearchDemo[];
  guidePaths: {
    readonly listLabel: string;
    readonly prompt: string;
    readonly items: readonly {
      readonly id: HomepageGuidePathId;
      readonly title: string;
      readonly body: string;
    }[];
  };
  locale: HomegroundLocale;
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
      <nav className={styles.guidePaths} aria-label={guidePaths.listLabel}>
        <p>{guidePaths.prompt}</p>
        <ul>
          {guidePaths.items.map((item) => (
            <li key={item.id}>
              <a href={getHomepageGuidePath(locale, item.id)}>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.body}</small>
                </span>
                <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
