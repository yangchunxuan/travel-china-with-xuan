import Link from "next/link";
import { getChinaItineraryReviewCopy, getChinaItineraryReviewLanguagePaths } from "../lib/chinaItineraryReviewI18n";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { HomegroundHeader } from "./HomegroundHeader";
import { HomegroundFooter } from "./HomegroundFooter";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./ChinaItineraryReviewPage.module.css";

export function ChinaItineraryReviewPage({ locale = "en" }: { locale?: HomegroundLocale }) {
  const home = getHomegroundCopy(locale);
  const copy = getChinaItineraryReviewCopy(locale);
  return (
    <div className={`${homeStyles.localeRoot} ${styles.pageRoot}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={homeStyles.skipLink} href="#itinerary-review-content">{home.skipLink}</a>
      <HomegroundHeader locale={locale} pageContext="services" languagePaths={getChinaItineraryReviewLanguagePaths()} />
      <main id="itinerary-review-content" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title}</h1>
              <p className={styles.heroLead}>{copy.hero.lead}</p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href={`${home.path}#planner-contact`}>{copy.hero.consultation}</Link>
                <Link className={styles.secondaryButton} href={`${home.path}tours/`}>{copy.hero.tours}</Link>
              </div>
              <p className={styles.heroBoundary}>{copy.hero.boundary}</p>
            </div>
          </div>
        </header>
      </main>
      <HomegroundFooter locale={locale} pageContext="services" />
    </div>
  );
}
