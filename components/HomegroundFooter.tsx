"use client";

import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import {
  getHomegroundLegalCopy,
  getHomegroundLegalPath,
} from "../lib/homegroundLegalI18n";
import { openAnalyticsConsentPreferences } from "../lib/analyticsConsent";
import { getAnalyticsConsentCopy } from "../lib/analyticsConsentI18n";
import { getChinaItineraryReviewCopy } from "../lib/chinaItineraryReviewI18n";
import {
  handleHomegroundHashClick,
  type HomegroundHashTarget,
} from "../lib/homegroundNavigation";
import { getHomegroundFacebookPageUrl } from "../lib/homegroundSocial";
import type { HomegroundPageContext } from "./HomegroundHeader";
import styles from "./HomegroundHomePage.module.css";

const footerSections: Record<
  HomegroundLocale,
  {
    guides: string;
    services: string;
    legalLabel: string;
    operatorPrefix: string;
    operatorSuffix: string;
    codeLabel: string;
  }
> = {
  en: {
    guides: "Travel guides",
    services: "Trip planning services",
    legalLabel: "Business and service information",
    operatorPrefix: "Homeground is operated by",
    operatorSuffix: ".",
    codeLabel: "Unified Social Credit Code",
  },
  zh: {
    guides: "旅行指南",
    services: "旅行规划服务",
    legalLabel: "经营与服务信息",
    operatorPrefix: "Homeground 由",
    operatorSuffix: "运营。",
    codeLabel: "统一社会信用代码",
  },
  ko: {
    guides: "여행 가이드",
    services: "여행 설계 서비스",
    legalLabel: "사업자 및 서비스 안내",
    operatorPrefix: "Homeground는",
    operatorSuffix: "에서 운영합니다.",
    codeLabel: "통일사회신용코드",
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
  const businessPath = getHomegroundLegalPath(
    "business-information",
    locale,
  );
  const termsPath = getHomegroundLegalPath("terms", locale);
  const refundPath = getHomegroundLegalPath(
    "refund-delivery",
    locale,
  );
  const legalCopy = getHomegroundLegalCopy(
    "business-information",
    locale,
  );
  const planningServicesCopy = getChinaItineraryReviewCopy(locale);
  const planningServicesPath = planningServicesCopy.path;
  const guideHubPath = `${copy.path}guides/`;
  const sectionLabels = footerSections[locale];
  const consentCopy = getAnalyticsConsentCopy(locale);
  const studioPath = `${copy.path}studio/`;
  const facebookPageUrl = getHomegroundFacebookPageUrl();
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
          <strong lang="en">Homeground China</strong>
          <span>{copy.footer.studioLabel}</span>
        </div>
        <nav aria-label={copy.navigation.footerLabel}>
          {pageContext === "guides" ? (
            <span aria-current="page">{sectionLabels.guides}</span>
          ) : (
            <a href={guideHubPath}>{sectionLabels.guides}</a>
          )}
          {locale === "en" ? (
            <a href="/guides/china-entry-requirements/">
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
        </nav>
      </div>
      <div className={styles.footerLegal}>
        <p>
          {sectionLabels.operatorPrefix}{" "}
          <a href={businessPath} lang="zh-Hans">
            {homegroundBusiness.publicName}
          </a>
          {sectionLabels.operatorSuffix}
          <span>
            {sectionLabels.codeLabel}:{" "}
            {homegroundBusiness.unifiedSocialCreditCode}
          </span>
        </p>
        <nav aria-label={sectionLabels.legalLabel}>
          <a href={businessPath}>{legalCopy.related.business}</a>
          <a href={termsPath}>{legalCopy.related.terms}</a>
          <a href={privacyPath}>{legalCopy.related.privacy}</a>
          <button
            className={styles.footerPrivacyButton}
            type="button"
            onClick={openAnalyticsConsentPreferences}
          >
            {consentCopy.manage}
          </button>
          <a href={refundPath}>{legalCopy.related.refund}</a>
          <a href={`mailto:${homegroundBusiness.serviceEmail}`}>
            {legalCopy.related.contact}
          </a>
          {facebookPageUrl && (
            <a href={facebookPageUrl}>{copy.footer.facebook}</a>
          )}
        </nav>
      </div>
      <p className={styles.footerNote}>
        {copy.footer.copyright(new Date().getFullYear())}
      </p>
    </footer>
  );
}
