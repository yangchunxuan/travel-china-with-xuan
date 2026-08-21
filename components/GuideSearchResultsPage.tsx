import Link from "next/link";
import { Suspense } from "react";
import { getGuideSearchCopy, getGuideSearchLanguagePaths } from "../lib/guideSearchI18n";
import { getGuideSearchDocuments } from "../lib/guideSearchRuntime";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import { GuideSearchResultsClient } from "./GuideSearchResultsClient";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./GuideSearchResultsPage.module.css";

export function GuideSearchResultsPage({
  locale,
}: {
  locale: HomegroundLocale;
}) {
  const home = getHomegroundCopy(locale);
  const copy = getGuideSearchCopy(locale);
  const documents = getGuideSearchDocuments(locale);
  const guidesPath = locale === "en" ? "/guides/" : `/${locale}/guides/`;

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.page}`}
      data-homeground-locale={locale}
      lang={home.htmlLang}
    >
      <a className={homeStyles.skipLink} href="#guide-search-main">
        {home.skipLink}
      </a>
      <HomegroundHeader
        languagePaths={getGuideSearchLanguagePaths()}
        locale={locale}
        pageContext="search"
      />

      <main id="guide-search-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label={copy.page.breadcrumbLabel}>
              <ol>
                <li><Link href={home.path}>{copy.page.homeLabel}</Link></li>
                <li><span aria-hidden="true">/</span><Link href={guidesPath}>{copy.page.guidesLabel}</Link></li>
                <li aria-current="page"><span aria-hidden="true">/</span>{copy.navLabel}</li>
              </ol>
            </nav>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>{copy.eyebrow}</p>
                <h1>{copy.page.title}</h1>
              </div>
              <p>{copy.page.introduction}</p>
            </div>
          </div>
        </header>

        <section className={styles.searchSection} aria-label={copy.label}>
          <div className={styles.searchInner}>
            <Suspense fallback={<div className={styles.loading} aria-busy="true" />}>
              <GuideSearchResultsClient documents={documents} locale={locale} />
            </Suspense>
          </div>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="guides" />
    </div>
  );
}
