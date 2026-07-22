"use client";

import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { getChinaItineraryReviewCopy } from "../lib/chinaItineraryReviewI18n";
import {
  getGuideEntry,
  type GuideId,
} from "../lib/guideRegistry";
import {
  handleHomegroundHashClick,
  type HomegroundHashTarget,
} from "../lib/homegroundNavigation";
import styles from "./HomegroundHomePage.module.css";

export function HomegroundFooter({
  locale = "en",
  pageContext = "home",
  guideId = "zhangjiajie-itinerary",
}: {
  locale?: HomegroundLocale;
  pageContext?: "home" | "guide" | "studio" | "services" | "content";
  guideId?: GuideId;
}) {
  const copy = getHomegroundCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const privacyPath =
    locale === "en" ? "/privacy/" : `${copy.path}privacy/`;
  const planningServicesCopy = getChinaItineraryReviewCopy(locale);
  const planningServicesPath = planningServicesCopy.path;
  const studioPath = `${copy.path}studio/`;
  const sectionHref = (hash: HomegroundHashTarget) =>
    pageContext === "home" ? hash : `${copy.path}${hash}`;
  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: HomegroundHashTarget,
  ) => {
    if (pageContext === "home") {
      handleHomegroundHashClick(event, hash);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>
          <strong lang="en">Homeground</strong>
          <span>{copy.footer.studioLabel}</span>
        </div>
        <nav aria-label={copy.navigation.footerLabel}>
          <a
            href={sectionHref("#planning-proof")}
            onClick={(event) =>
              handleSectionClick(event, "#planning-proof")
            }
          >
            {copy.navigation.planning}
          </a>
          {pageContext === "services" ? (
            <span aria-current="page">
              {planningServicesCopy.navigationLabel}
            </span>
          ) : (
            <a href={planningServicesPath}>
              {planningServicesCopy.navigationLabel}
            </a>
          )}
          {pageContext === "studio" ? (
            <span aria-current="page">{copy.navigation.studio}</span>
          ) : (
            <a href={studioPath}>{copy.navigation.studio}</a>
          )}
          <a
            href={sectionHref("#faq")}
            onClick={(event) => handleSectionClick(event, "#faq")}
          >
            {copy.navigation.faq}
          </a>
          {pageContext === "guide" ? (
            <span aria-current="page">{guide.navTitle}</span>
          ) : (
            <a href={guide.canonicalPath}>{guide.navTitle}</a>
          )}
          <a href={privacyPath}>{copy.footer.privacy}</a>
        </nav>
      </div>
      <p className={styles.footerNote}>
        {copy.footer.copyright(new Date().getFullYear())}
      </p>
    </footer>
  );
}
