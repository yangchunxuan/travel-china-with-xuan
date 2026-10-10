"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { homegroundCareersCopy } from "../lib/homegroundCareersCopy";
import { getHomegroundCompanyCopy } from "../lib/homegroundCompanyI18n";
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
  getHomegroundSocialProfiles,
  type HomegroundSocialPlatform,
} from "../lib/homegroundSocial";
import { footerDestinationLinks } from "../lib/footerDestinationLinks";
import type { HomepageDestinationHubItem } from "../lib/homepageEditorial";
import type { HomegroundPageContext } from "./HomegroundHeader";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import homepageStyles from "./HomepageFooter.module.css";
import { NewsletterFooterLink } from "./NewsletterFooterLink";
import { getNewsletterConfig } from "../lib/newsletter";

const footerSections: Record<
  HomegroundLocale,
  {
    guides: string;
    services: string;
    fullTripSupport: string;
    attractionReservations: string;
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
    licenceLabel: string;
  }
> = {
  en: {
    guides: "Travel Advice",
    services: "All services",
    fullTripSupport: "Full-trip planning",
    attractionReservations: "Attraction tickets",
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
    licenceLabel: "Travel Agency Licence No.",
  },
  zh: {
    guides: "实用指南",
    services: "服务总览",
    fullTripSupport: "全程规划",
    attractionReservations: "景点代预约",
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
    licenceLabel: "旅行社业务经营许可证编号",
  },
  ko: {
    guides: "실용 가이드",
    services: "전체 서비스",
    fullTripSupport: "전체 여행 설계",
    attractionReservations: "관광지 예약 대행",
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
    licenceLabel: "여행사 영업허가번호",
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
  const pathname = usePathname();
  const currentPath = pathname?.replace(/\/?$/, "/");
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
  const servicesOverviewPath = `${copy.path}services/`;
  const fullTripSupportPath = `${copy.path}services/full-trip-support/`;
  const attractionReservationsPath = `${copy.path}services/china-attraction-reservations/`;
  const guideHubPath = `${copy.path}guides/`;
  const tourHubPath = `${copy.path}tours/`;
  const destinationsHubPath = `${copy.path}explore/`;
  const sectionLabels = footerSections[locale];
  const consentCopy = getAnalyticsConsentCopy(locale);
  const studioPath = `${copy.path}studio/`;
  const companyCopy = getHomegroundCompanyCopy(locale);
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

  // One structured dark footer on every page. The homepage keeps the anchors
  // its header links to (#destinations, #studio) and passes its own city
  // list; every other page gets the same layout without those ids, so they
  // cannot collide with ids in page content, and falls back to the shared
  // list of city hubs.
  const isHomepage = variant === "homepage";
  const cityLinks =
    destinationHubItems.length > 0
      ? destinationHubItems
      : footerDestinationLinks[locale];

  return (
      <footer
        className={homepageStyles.footer}
        data-homeground-footer="structured-dark"
        data-homeground-homepage-footer={isHomepage ? "structured-dark" : undefined}
      >
        <div className={homepageStyles.inner}>
          <Link
            className={homepageStyles.brand}
            href={copy.path}
          >
            <HomegroundBrandMark className={homepageStyles.brandMark} />
            <span>
              <strong lang="en">Homeground China</strong>
              <small>{copy.businessDescriptor}</small>
            </span>
          </Link>

          <div className={homepageStyles.navGrid}>
            <nav aria-label={sectionLabels.exploreHeading}>
              <h2>{sectionLabels.exploreHeading}</h2>
              <ul>
                <li>
                  <Link
                    aria-current={pageContext === "guides" ? "page" : undefined}
                    href={guideHubPath}
                  >
                    {sectionLabels.guides}
                  </Link>
                </li>
                <li>
                  <Link
                    aria-current={pageContext === "tours" ? "page" : undefined}
                    href={tourHubPath}
                  >
                    {sectionLabels.privateTours}
                  </Link>
                </li>
                <li>
                  <Link
                    aria-current={currentPath === fullTripSupportPath ? "page" : undefined}
                    href={fullTripSupportPath}
                  >
                    {sectionLabels.fullTripSupport}
                  </Link>
                </li>
                <li>
                  <Link
                    aria-current={currentPath === servicesOverviewPath ? "page" : undefined}
                    href={servicesOverviewPath}
                  >
                    {sectionLabels.services}
                  </Link>
                </li>
                <li>
                  <Link href={attractionReservationsPath}>{sectionLabels.attractionReservations}</Link>
                </li>
              </ul>
            </nav>

            <nav
              aria-label={copy.cities.listLabel}
              id={isHomepage ? "destinations" : undefined}
            >
              <h2
                id={isHomepage ? "homepage-city-hubs-title" : undefined}
                tabIndex={isHomepage ? -1 : undefined}
              >
                {sectionLabels.destinationsHeading}
              </h2>
              <ul>
                <li>
                  <Link
                    aria-current={pageContext === "destinations" ? "page" : undefined}
                    href={destinationsHubPath}
                  >
                    {sectionLabels.allDestinations}
                  </Link>
                </li>
                {cityLinks.map((city) => (
                  <li key={city.id}>
                    <Link href={city.href}>{city.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav
              aria-label={sectionLabels.homegroundHeading}
              id={isHomepage ? "studio" : undefined}
            >
              <h2
                id={isHomepage ? "studio-title" : undefined}
                tabIndex={isHomepage ? -1 : undefined}
              >
                {sectionLabels.homegroundHeading}
              </h2>
              <ul>
                <li>
                  <Link
                    aria-current={pageContext === "company" ? "page" : undefined}
                    href={companyCopy.path}
                  >
                    {companyCopy.navLabel}
                  </Link>
                </li>
                <li>
                  <Link
                    aria-current={pageContext === "studio" ? "page" : undefined}
                    href={studioPath}
                  >
                    {copy.navigation.studio}
                  </Link>
                </li>
                {locale === "zh" ? (
                  <li>
                    <Link
                      aria-current={pageContext === "careers" ? "page" : undefined}
                      href={homegroundCareersCopy.path}
                    >
                      {homegroundCareersCopy.navLabel}
                    </Link>
                  </li>
                ) : null}
                <li>
                  <Link
                    aria-current={
                      activeHash === "#faq" ? "location" : undefined
                    }
                    href={sectionHref("#faq")}
                    onClick={(event) => handleSectionClick(event, "#faq")}
                  >
                    {copy.navigation.faq}
                  </Link>
                </li>
                <li>
                  <Link href={businessPath}>{legalCopy.related.business}</Link>
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
                  <Link href={termsPath}>{legalCopy.related.terms}</Link>
                </li>
                <li>
                  <Link href={privacyPath}>{legalCopy.related.privacy}</Link>
                </li>
                {getNewsletterConfig() ? <li><NewsletterFooterLink locale={locale} /></li> : null}
                <li>
                  <button
                    type="button"
                    onClick={openAnalyticsConsentPreferences}
                  >
                    {consentCopy.manage}
                  </button>
                </li>
                <li>
                  <Link href={refundPath}>{legalCopy.related.refund}</Link>
                </li>
                {locale === "en" ? (
                  <li>
                    <Link href="/guides/china-entry-requirements/">
                      {copy.navigation.visa}
                    </Link>
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
              <Link href={businessPath} lang="zh-Hans">
                {homegroundBusiness.publicName}
              </Link>
              {sectionLabels.operatorSuffix}
              <span>
                {sectionLabels.codeLabel}: {" "}
                {homegroundBusiness.unifiedSocialCreditCode}
              </span>
              <span>
                {sectionLabels.licenceLabel}: {" "}
                {homegroundBusiness.travelAgencyLicenceNumber}
              </span>
            </p>
          </div>
        </div>

        {/* The name across the full width, as the page's last line. SVG text
            stretched to the width, so it fits whatever serif the device has. */}
        <div aria-hidden="true" className={homepageStyles.wordmark}>
          <svg focusable="false" viewBox="0 0 1000 128">
            <text
              lengthAdjust="spacingAndGlyphs"
              textLength="1000"
              x="0"
              y="138"
            >
              Homeground
            </text>
          </svg>
        </div>
      </footer>
  );
}
