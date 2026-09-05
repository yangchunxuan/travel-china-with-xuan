"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
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
import {
  handleHomegroundHashClick,
  type HomegroundHashTarget,
} from "../lib/homegroundNavigation";
import {
  getHomegroundFacebookPageUrl,
  getHomegroundSocialProfiles,
  type HomegroundSocialPlatform,
} from "../lib/homegroundSocial";
import type { HomepageDestinationHubItem } from "../lib/homepageEditorial";
import type { HomegroundPageContext } from "./HomegroundHeader";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import styles from "./HomegroundHomePage.module.css";
import homepageStyles from "./HomepageFooter.module.css";

const footerSections: Record<
  HomegroundLocale,
  {
    guides: string;
    services: string;
    legalLabel: string;
    legalHeading: string;
    exploreHeading: string;
    destinationsHeading: string;
    homegroundHeading: string;
    socialLabel: string;
    privateTours: string;
    allDestinations: string;
    operatorPrefix: string;
    operatorSuffix: string;
    codeLabel: string;
  }
> = {
  en: {
    guides: "Travel Advice",
    services: "Trip planning services",
    legalLabel: "Business and service information",
    legalHeading: "Legal",
    exploreHeading: "Explore",
    destinationsHeading: "Destinations",
    homegroundHeading: "Homeground",
    socialLabel: "Follow Homeground",
    privateTours: "Private tours",
    allDestinations: "All destinations",
    operatorPrefix: "Homeground is operated by",
    operatorSuffix: ".",
    codeLabel: "Unified Social Credit Code",
  },
  zh: {
    guides: "实用指南",
    services: "旅行规划服务",
    legalLabel: "经营与服务信息",
    legalHeading: "法律与经营信息",
    exploreHeading: "探索",
    destinationsHeading: "目的地",
    homegroundHeading: "Homeground",
    socialLabel: "关注 Homeground",
    privateTours: "私家团",
    allDestinations: "全部目的地",
    operatorPrefix: "Homeground 由",
    operatorSuffix: "运营。",
    codeLabel: "统一社会信用代码",
  },
  ko: {
    guides: "실용 가이드",
    services: "여행 설계 서비스",
    legalLabel: "사업자 및 서비스 안내",
    legalHeading: "법률 및 사업자 정보",
    exploreHeading: "둘러보기",
    destinationsHeading: "여행지",
    homegroundHeading: "Homeground",
    socialLabel: "Homeground 팔로우",
    privateTours: "프라이빗 투어",
    allDestinations: "전체 여행지",
    operatorPrefix: "Homeground는",
    operatorSuffix: "에서 운영합니다.",
    codeLabel: "통일사회신용코드",
  },
};

function FooterSocialIcon({
  platform,
}: {
  platform: HomegroundSocialPlatform;
}) {
  switch (platform) {
    case "instagram":
      return <Instagram aria-hidden="true" size={22} strokeWidth={1.6} />;
    case "facebook":
      return <Facebook aria-hidden="true" size={22} strokeWidth={1.6} />;
    case "youtube":
      return <Youtube aria-hidden="true" size={23} strokeWidth={1.6} />;
    default:
      return <span aria-hidden="true">X</span>;
  }
}

export function HomegroundFooter({
  locale = "en",
  pageContext = "home",
  variant = "default",
  destinationHubItems = [],
}: {
  locale?: HomegroundLocale;
  pageContext?: HomegroundPageContext;
  variant?: "default" | "homepage";
  destinationHubItems?: readonly HomepageDestinationHubItem[];
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
  const planningServicesPath = `${copy.path}services/`;
  const guideHubPath = `${copy.path}guides/`;
  const tourHubPath = `${copy.path}tours/`;
  const destinationsHubPath = `${copy.path}explore/`;
  const sectionLabels = footerSections[locale];
  const consentCopy = getAnalyticsConsentCopy(locale);
  const studioPath = `${copy.path}studio/`;
  const facebookPageUrl = getHomegroundFacebookPageUrl();
  const socialProfiles = getHomegroundSocialProfiles().filter(
    (profile) => Boolean(profile.url),
  );
  const [activeHash, setActiveHash] = useState("");
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

  useEffect(() => {
    if (pageContext !== "home") {
      setActiveHash("");
      return;
    }

    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    window.addEventListener("homeground:locationchange", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
      window.removeEventListener("homeground:locationchange", syncHash);
    };
  }, [pageContext]);

  if (variant === "homepage") {
    return (
      <footer
        className={homepageStyles.footer}
        data-homeground-homepage-footer="structured-dark"
      >
        <div className={homepageStyles.inner}>
          <a
            className={homepageStyles.brand}
            href={copy.path}
          >
            <HomegroundBrandMark className={homepageStyles.brandMark} />
            <span>
              <strong lang="en">Homeground China</strong>
              <small>{copy.businessDescriptor}</small>
            </span>
          </a>

          <div className={homepageStyles.navGrid}>
            <nav aria-label={sectionLabels.exploreHeading}>
              <h2>{sectionLabels.exploreHeading}</h2>
              <ul>
                <li>
                  <a href={guideHubPath}>{sectionLabels.guides}</a>
                </li>
                <li>
                  <a href={tourHubPath}>
                    {sectionLabels.privateTours}
                  </a>
                </li>
                <li>
                  <a href={planningServicesPath}>{sectionLabels.services}</a>
                </li>
              </ul>
            </nav>

            <nav aria-label={copy.cities.listLabel} id="destinations">
              <h2 id="homepage-city-hubs-title" tabIndex={-1}>
                {sectionLabels.destinationsHeading}
              </h2>
              <ul>
                <li>
                  <a href={destinationsHubPath}>{sectionLabels.allDestinations}</a>
                </li>
                {destinationHubItems.map((city) => (
                  <li key={city.id}>
                    <a href={city.href}>{city.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={sectionLabels.homegroundHeading} id="studio">
              <h2 id="studio-title" tabIndex={-1}>
                {sectionLabels.homegroundHeading}
              </h2>
              <ul>
                <li>
                  <a href={studioPath}>{copy.navigation.studio}</a>
                </li>
                <li>
                  <a
                    aria-current={
                      activeHash === "#faq" ? "location" : undefined
                    }
                    href={sectionHref("#faq")}
                    onClick={(event) => handleSectionClick(event, "#faq")}
                  >
                    {copy.navigation.faq}
                  </a>
                </li>
                <li>
                  <a href={businessPath}>{legalCopy.related.business}</a>
                </li>
                <li>
                  <a href={`mailto:${homegroundBusiness.serviceEmail}`}>
                    {legalCopy.related.contact}
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label={sectionLabels.legalLabel}>
              <h2>{sectionLabels.legalHeading}</h2>
              <ul>
                <li>
                  <a href={termsPath}>{legalCopy.related.terms}</a>
                </li>
                <li>
                  <a href={privacyPath}>{legalCopy.related.privacy}</a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openAnalyticsConsentPreferences}
                  >
                    {consentCopy.manage}
                  </button>
                </li>
                <li>
                  <a href={refundPath}>{legalCopy.related.refund}</a>
                </li>
                {locale === "en" ? (
                  <li>
                    <a href="/guides/china-entry-requirements/">
                      {copy.navigation.visa}
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>

          <div className={homepageStyles.meta}>
            <div className={homepageStyles.copyrightSocial}>
              <p>{copy.footer.copyright(new Date().getFullYear())}</p>
              {socialProfiles.length > 0 ? (
                <nav aria-label={sectionLabels.socialLabel}>
                  <ul>
                    {socialProfiles.map((profile) => (
                      <li key={profile.platform}>
                        <a
                          aria-label={profile.label}
                          href={profile.url}
                          rel="me noreferrer"
                          target="_blank"
                        >
                          <FooterSocialIcon platform={profile.platform} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>

            <p className={homepageStyles.operator}>
              {sectionLabels.operatorPrefix}{" "}
              <a href={businessPath} lang="zh-Hans">
                {homegroundBusiness.publicName}
              </a>
              {sectionLabels.operatorSuffix}
              <span>
                {sectionLabels.codeLabel}: {" "}
                {homegroundBusiness.unifiedSocialCreditCode}
              </span>
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>
          <strong lang="en">Homeground China</strong>
          <span>{copy.footer.studioLabel}</span>
        </div>
        <nav aria-label={copy.navigation.footerLabel}>
          {pageContext === "destinations" ? (
            <span aria-current="page">{sectionLabels.allDestinations}</span>
          ) : (
            <a href={destinationsHubPath}>{sectionLabels.allDestinations}</a>
          )}
          {pageContext === "guides" ? (
            <span aria-current="page">{sectionLabels.guides}</span>
          ) : (
            <a href={guideHubPath}>{sectionLabels.guides}</a>
          )}
          {pageContext === "tours" ? (
            <span aria-current="page">{sectionLabels.privateTours}</span>
          ) : (
            <a href={tourHubPath}>{sectionLabels.privateTours}</a>
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
            aria-current={
              activeHash === "#faq" ? "location" : undefined
            }
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
