import { getGuideSearchCopy, getGuideSearchIndexPath } from "../lib/guideSearchI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { GuideSearchForm } from "./GuideSearchForm";
import styles from "./HomepageGuideSearch.module.css";

export function HomepageGuideSearch({
  locale,
}: {
  locale: HomegroundLocale;
}) {
  const copy = getGuideSearchCopy(locale);

  return (
    <div
      className={styles.finder}
      aria-labelledby="homepage-guide-search-title"
      id="homepage-guide-search"
    >
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h3 id="homepage-guide-search-title">{copy.title}</h3>
        <p className={styles.body}>{copy.introduction}</p>
      </div>
      <div className={styles.formArea}>
        <GuideSearchForm
          documentsUrl={getGuideSearchIndexPath(locale)}
          locale={locale}
          surface="homepage"
        />
      </div>
    </div>
  );
}
