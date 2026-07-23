"use client";

import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { getChinaItineraryReviewCopy } from "../lib/chinaItineraryReviewI18n";
import {
  handleHomegroundHashClick,
  type HomegroundHashTarget,
} from "../lib/homegroundNavigation";
import type { HomegroundPageContext } from "./HomegroundHeader";
import styles from "./HomegroundHomePage.module.css";

const footerSections: Record<
  HomegroundLocale,
  { guides: string; services: string }
> = {
  en: {
    guides: "Travel guides",
    services: "Trip planning services",
  },
  zh: {
    guides: "旅行指南",
    services: "旅行规划服务",
  },
  ko: {
    guides: "여행 가이드",
    services: "여행 설계 서비스",
  },
};

export function HomegroundFooter({
  locale = "en",
  pageContext = "home",
}: {
  locale?: HomegroundLocale;
  pageContext?: HomegroundPageContext;
}) {
  const copy = getHomegroundCopy(locale);
  const privacyPath =
    locale === "en" ? "/privacy/" : `${copy.path}privacy/`;
  const planningServicesCopy = getChinaItineraryReviewCopy(locale);
  const planningServicesPath = planningServicesCopy.path;
  const guideHubPath = `${copy.path}guides/`;
  const sectionLabels = footerSections[locale];
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
          {pageContext === "guides" ? (
            <span aria-current="page">{sectionLabels.guides}</span>
          ) : (
            <a href={guideHubPath}>{sectionLabels.guides}</a>
          )}
          {locale === "en" ? (
            <a href="/china-visa-free-uk-canada/">
              {copy.navigation.visa}
            </a>
          ) : null}
          {pageContext === "services" ? (
            <span aria-current="page">
              {sectionLabels.services}
            </span>
          ) : (
            <a href={planningServicesPath}>
              {sectionLabels.services}
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
          <a href={privacyPath}>{copy.footer.privacy}</a>
        </nav>
      </div>
      <p className={styles.footerNote}>
        {copy.footer.copyright(new Date().getFullYear())}
      </p>
    </footer>
  );
}
