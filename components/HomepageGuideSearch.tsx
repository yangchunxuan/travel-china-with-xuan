import {
  getGuideSearchCopy,
  getGuideSearchIndexPath,
} from "../lib/guideSearchI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import type { HomepageSearchDemo } from "../lib/homepageEditorial";
import { GuideSearchForm } from "./GuideSearchForm";
import styles from "./HomepageGuideSearch.module.css";

export function HomepageGuideSearch({
  demos,
  locale,
}: {
  demos: readonly HomepageSearchDemo[];
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
    </section>
  );
}
