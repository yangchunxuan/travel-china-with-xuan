"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  getHomegroundCopy,
  homegroundLocales,
  type HomegroundCopy,
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
import { routeServiceIds } from "../lib/routeServiceInterest";
import type { HandoffStatus } from "./PlannerHandoff";
import type { PlannerStatus } from "./RouteFinder";
import styles from "./HomegroundHomePage.module.css";

export type HomegroundPageContext =
  | "home"
  | "guide"
  | "guides"
  | "studio"
  | "services"
  | "content";

interface HomegroundHeaderProps {
  locale?: HomegroundLocale;
  plannerStatus?: PlannerStatus;
  handoffStatus?: HandoffStatus;
  handoffDirty?: boolean;
  freeResult?: boolean;
  pageContext?: HomegroundPageContext;
  guideId?: GuideId;
  showLanguageNav?: boolean;
}

const allowedHeaderHashes = new Set([
  "#route-finder",
  "#planner-handoff",
  "#planning-proof",
  "#studio",
  "#faq",
  "#choose-service",
  "#review-my-route",
  "#build-my-route",
  "#full-trip-support",
]);
const allowedPlannerQueries = new Set([
  "destinations",
  "nights",
  "party",
  "pace",
  "result",
]);
const allowedServiceQueries = new Set<string>(routeServiceIds);
const navigationSections: Record<
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

function preservedHomeQuery(plannerStatus: PlannerStatus): string {
  const current = new URL(window.location.href);
  const preserved = new URLSearchParams();
  const planner = current.searchParams.get("planner");
  const service = current.searchParams.get("service");

  if (planner && allowedPlannerQueries.has(planner)) {
    preserved.set("planner", planner);
  } else if (plannerStatus === "result") {
    preserved.set("planner", "result");
  }
  if (service && allowedServiceQueries.has(service)) {
    preserved.set("service", service);
  }

  const query = preserved.toString();
  return query ? `?${query}` : "";
}

export function resolvePlannerCta(
  copy: HomegroundCopy,
  plannerStatus: PlannerStatus,
  handoffStatus: HandoffStatus,
  freeResult = false,
): string {
  if (plannerStatus === "new") {
    return copy.navigation.plannerCta.new;
  }
  if (plannerStatus === "in-progress") {
    return copy.navigation.plannerCta.inProgress;
  }
  if (freeResult) {
    return copy.navigation.plannerCta.freeResult;
  }

  switch (handoffStatus) {
    case "disabled":
      return copy.navigation.plannerCta.disabled;
    case "validation-error":
      return copy.navigation.plannerCta.validationError;
    case "submitting":
      return copy.navigation.plannerCta.submitting;
    case "success":
      return copy.navigation.plannerCta.success;
    case "failed":
      return copy.navigation.plannerCta.failed;
    case "uncertain":
      return copy.navigation.plannerCta.uncertain;
    default:
      return copy.navigation.plannerCta.result;
  }
}

export function HomegroundHeader({
  locale = "en",
  plannerStatus = "new",
  handoffStatus = "disabled",
  handoffDirty = false,
  freeResult = false,
  pageContext = "home",
  guideId = "zhangjiajie-itinerary",
  showLanguageNav = true,
}: HomegroundHeaderProps) {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [languageQuery, setLanguageQuery] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const copy = getHomegroundCopy(locale);
  const plannerCta = resolvePlannerCta(
    copy,
    plannerStatus,
    handoffStatus,
    freeResult,
  );
  const plannerTarget = (
    plannerStatus === "result" && !freeResult
      ? "#planner-handoff"
      : "#route-finder"
  ) satisfies HomegroundHashTarget;
  const plannerHref =
    pageContext === "home"
      ? plannerTarget
      : `${copy.path}?planner=destinations#route-finder`;
  const planningServicesCopy = getChinaItineraryReviewCopy(locale);
  const planningServicesHref = planningServicesCopy.path;
  const guideHubHref = `${copy.path}guides/`;
  const sectionLabels = navigationSections[locale];
  const studioHref = `${copy.path}studio/`;
  const languageHash =
    activeHash || (plannerStatus === "new" ? "" : plannerTarget);

  useEffect(() => {
    const syncLocation = () => {
      setActiveHash(
        allowedHeaderHashes.has(window.location.hash)
          ? window.location.hash
          : "",
      );
      setLanguageQuery(preservedHomeQuery(plannerStatus));
    };

    syncLocation();
    window.addEventListener("hashchange", syncLocation);
    window.addEventListener("popstate", syncLocation);
    window.addEventListener("homeground:locationchange", syncLocation);
    return () => {
      window.removeEventListener("hashchange", syncLocation);
      window.removeEventListener("popstate", syncLocation);
      window.removeEventListener("homeground:locationchange", syncLocation);
    };
  }, [plannerStatus]);

  useEffect(() => {
    if (pageContext !== "services") return;

    const allowedServiceHashes = new Set([
      "#choose-service",
      "#review-my-route",
      "#build-my-route",
      "#full-trip-support",
    ]);
    const hash = window.location.hash;
    if (!allowedServiceHashes.has(hash)) return;

    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    const alignAnchorAfterFonts = () => {
      if (cancelled) return;
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({ block: "start" });
        });
      });
    };

    void document.fonts.ready.then(alignAnchorAfterFonts);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [pageContext]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const close = () => setOpen(false);
  const handleLanguageChange = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    targetLocale: HomegroundLocale,
  ) => {
    const opensSeparateContext =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;

    if (
      targetLocale !== locale &&
      handoffDirty &&
      !opensSeparateContext &&
      !window.confirm(copy.navigation.languageChangeWarning)
    ) {
      event.preventDefault();
      return;
    }

    close();
  };

  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <Link
          className={styles.brand}
          href={copy.path}
          aria-label={copy.navigation.homeLabel}
        >
          <span className={styles.brandMark} aria-hidden="true">
            <span />
          </span>
          <span>
            <strong lang="en">Homeground</strong>
            <small>{copy.brandTagline}</small>
          </span>
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label={copy.navigation.primaryLabel}
        >
          {pageContext === "home" ? (
            <>
              <a href={guideHubHref}>{sectionLabels.guides}</a>
              <a href={planningServicesHref}>
                {sectionLabels.services}
              </a>
              <a href={studioHref}>
                {copy.navigation.studio}
              </a>
              <a
                href="#faq"
                onClick={(event) =>
                  handleHomegroundHashClick(event, "#faq")
                }
              >
                {copy.navigation.faq}
              </a>
            </>
          ) : (
            <>
              <a
                aria-current={
                  pageContext === "guides" ? "page" : undefined
                }
                href={guideHubHref}
              >
                {sectionLabels.guides}
              </a>
              <a
                aria-current={
                  pageContext === "services" ? "page" : undefined
                }
                href={planningServicesHref}
              >
                {sectionLabels.services}
              </a>
              <a
                aria-current={pageContext === "studio" ? "page" : undefined}
                href={studioHref}
              >
                {copy.navigation.studio}
              </a>
              <a href={`${copy.path}#faq`}>
                {copy.navigation.faq}
              </a>
            </>
          )}
        </nav>

        <div className={styles.headerActions}>
          <nav
            className={styles.languageNav}
            aria-label={copy.navigation.languageLabel}
            hidden={!showLanguageNav}
            style={showLanguageNav ? undefined : { display: "none" }}
          >
            {homegroundLocales.map((targetLocale) => {
              const target = getHomegroundCopy(targetLocale);
              const languageHref =
                pageContext === "guide"
                  ? getGuideEntry(
                      guideId,
                      targetLocale,
                    ).canonicalPath
                  : pageContext === "guides"
                    ? `${target.path}guides/`
                  : pageContext === "services"
                    ? `${getChinaItineraryReviewCopy(targetLocale).path}${languageHash}`
                  : pageContext === "studio"
                    ? `${target.path}studio/`
                  : plannerStatus === "result" && !languageQuery
                  ? `${target.path}?planner=result${languageHash}`
                  : `${target.path}${languageQuery}${languageHash}`;
              return (
                <a
                  aria-current={
                    targetLocale === locale
                      ? pageContext === "home"
                        ? "page"
                        : "true"
                      : undefined
                  }
                  href={languageHref}
                  hrefLang={target.htmlLang}
                  key={targetLocale}
                  lang={target.htmlLang}
                  onClick={(event) =>
                    handleLanguageChange(event, targetLocale)
                  }
                >
                  {target.languageShort}
                </a>
              );
            })}
          </nav>
          <a
            className={styles.headerCta}
            href={plannerHref}
            onClick={(event) => {
              if (pageContext === "home") {
                handleHomegroundHashClick(event, plannerTarget);
              }
            }}
          >
            {plannerCta}
          </a>
          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            type="button"
            aria-label={
              open
                ? copy.navigation.closeMenu
                : copy.navigation.openMenu
            }
            aria-expanded={open}
            aria-controls="home-mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
          </button>
        </div>
      </div>

      <nav
        id="home-mobile-navigation"
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        aria-label={copy.navigation.mobileLabel}
        hidden={!open}
      >
        {pageContext === "home" ? (
          <>
            <a href={guideHubHref} onClick={close}>
              {sectionLabels.guides}
            </a>
            <a href={planningServicesHref} onClick={close}>
              {sectionLabels.services}
            </a>
            <a href={studioHref} onClick={close}>
              {copy.navigation.studio}
            </a>
            <a
              href="#faq"
              onClick={(event) => {
                close();
                handleHomegroundHashClick(event, "#faq");
              }}
            >
              {copy.navigation.faq}
            </a>
          </>
        ) : (
          <>
            <a
              aria-current={
                pageContext === "guides" ? "page" : undefined
              }
              href={guideHubHref}
              onClick={close}
            >
              {sectionLabels.guides}
            </a>
            <a
              aria-current={
                pageContext === "services" ? "page" : undefined
              }
              href={planningServicesHref}
              onClick={close}
            >
              {sectionLabels.services}
            </a>
            <a
              aria-current={pageContext === "studio" ? "page" : undefined}
              href={studioHref}
              onClick={close}
            >
              {copy.navigation.studio}
            </a>
            <a href={`${copy.path}#faq`} onClick={close}>
              {copy.navigation.faq}
            </a>
          </>
        )}
        <div
          className={styles.mobileLanguageNav}
          role="group"
          aria-label={copy.navigation.languageLabel}
          hidden={!showLanguageNav}
          style={showLanguageNav ? undefined : { display: "none" }}
        >
          {homegroundLocales.map((targetLocale) => {
            const target = getHomegroundCopy(targetLocale);
            const languageHref =
              pageContext === "guide"
                ? getGuideEntry(
                    guideId,
                    targetLocale,
                  ).canonicalPath
                : pageContext === "guides"
                  ? `${target.path}guides/`
                : pageContext === "services"
                  ? `${getChinaItineraryReviewCopy(targetLocale).path}${languageHash}`
                : pageContext === "studio"
                  ? `${target.path}studio/`
                : plannerStatus === "result" && !languageQuery
                ? `${target.path}?planner=result${languageHash}`
                : `${target.path}${languageQuery}${languageHash}`;
            return (
              <a
                aria-current={
                  targetLocale === locale
                    ? pageContext === "home"
                      ? "page"
                      : "true"
                    : undefined
                }
                href={languageHref}
                hrefLang={target.htmlLang}
                key={targetLocale}
                lang={target.htmlLang}
                onClick={(event) =>
                  handleLanguageChange(event, targetLocale)
                }
              >
                {target.languageShort}
              </a>
            );
          })}
        </div>
        <a
          className={styles.mobileCta}
          href={plannerHref}
          onClick={(event) => {
            close();
            if (pageContext === "home") {
              handleHomegroundHashClick(event, plannerTarget);
            }
          }}
        >
          {plannerCta}
        </a>
      </nav>
    </header>
  );
}
