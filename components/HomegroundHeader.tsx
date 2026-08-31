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
import { trackEvent } from "../lib/analytics";
import {
  getGuideEntry,
  type GuideId,
} from "../lib/guideRegistry";
import {
  handleHomegroundHashClick,
  type HomegroundHashTarget,
} from "../lib/homegroundNavigation";
import {
  getHomegroundNavigationModel,
  type HomegroundPrimaryNavigationId,
} from "../lib/homegroundNavigationModel";
import { routeServiceIds } from "../lib/routeServiceInterest";
import {
  isPrivateTourInquirySlug,
  privateTourInquiryQueryKey,
} from "../lib/privateTourInquiryContext";
import type { HandoffStatus } from "./PlannerHandoff";
import type { PlannerStatus } from "./RouteFinder";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import styles from "./HomegroundHeader.module.css";

export type HomegroundPageContext =
  | "home"
  | "guide"
  | "guides"
  | "search"
  | "plan"
  | "studio"
  | "services"
  | "tours"
  | "tour"
  | "destinations"
  | "destination"
  | "content";

type HomegroundLanguagePathKey = HomegroundLocale | "zh-Hans";

interface HomegroundHeaderProps {
  locale?: HomegroundLocale;
  plannerStatus?: PlannerStatus;
  handoffStatus?: HandoffStatus;
  handoffDirty?: boolean;
  pageContext?: HomegroundPageContext;
  guideId?: GuideId;
  showLanguageNav?: boolean;
  plannerHrefOverride?: string;
  plannerTracking?: {
    guideId: string;
    position?: "header" | "inline" | "footer";
  };
  /**
   * Actual published equivalents for content that is not backed by GuideId.
   * Missing locales are omitted instead of linking to an unrelated homepage.
   */
  languagePaths?: Partial<Record<HomegroundLanguagePathKey, string>>;
  /**
   * Marks a primary-navigation landing page as the exact current page.
   * Descendants such as /guides/page/2/ remain in the same section, but are
   * exposed to assistive technology as a location rather than the section root.
   */
  navigationIsExact?: boolean;
}

const allowedHeaderHashes = new Set([
  "#planner-contact",
  "#route-finder",
  "#planner-handoff",
  "#travel-products",
  "#destinations",
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
function preservedHomeQuery(plannerStatus: PlannerStatus): string {
  const current = new URL(window.location.href);
  const preserved = new URLSearchParams();
  const planner = current.searchParams.get("planner");
  const service = current.searchParams.get("service");
  const privateTour = current.searchParams.get(privateTourInquiryQueryKey);

  if (planner && allowedPlannerQueries.has(planner)) {
    preserved.set("planner", planner);
  } else if (plannerStatus === "result") {
    preserved.set("planner", "result");
  }
  if (service && allowedServiceQueries.has(service)) {
    preserved.set("service", service);
  }
  if (isPrivateTourInquirySlug(privateTour)) {
    preserved.set(privateTourInquiryQueryKey, privateTour);
  }

  const query = preserved.toString();
  return query ? `?${query}` : "";
}

export function resolvePlannerCta(
  copy: HomegroundCopy,
  plannerStatus: PlannerStatus,
  handoffStatus: HandoffStatus,
): string {
  if (plannerStatus === "new") {
    return copy.navigation.plannerCta.new;
  }
  if (plannerStatus === "in-progress") {
    return copy.navigation.plannerCta.inProgress;
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
  pageContext = "home",
  guideId = "zhangjiajie-itinerary",
  showLanguageNav = true,
  plannerHrefOverride,
  plannerTracking,
  languagePaths,
  navigationIsExact = false,
}: HomegroundHeaderProps) {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [languageQuery, setLanguageQuery] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);
  const copy = getHomegroundCopy(locale);
  const plannerCta = resolvePlannerCta(
    copy,
    plannerStatus,
    handoffStatus,
  );
  const plannerTarget = (
    plannerStatus === "result"
      ? "#planner-handoff"
      : plannerStatus === "in-progress"
        ? "#route-finder"
        : "#planner-contact"
  ) satisfies HomegroundHashTarget;
  const plannerHref = plannerHrefOverride ?? (
    pageContext === "home"
      ? plannerTarget
      : `${copy.path}#planner-contact`
  );
  const faqHref = pageContext === "home" ? "#faq" : `${copy.path}#faq`;
  const primaryNavigation = getHomegroundNavigationModel(locale, copy.path);
  const plannerCtaAccessibleLabel =
    plannerStatus === "new"
      ? plannerCta
      : `${primaryNavigation.mobileCta}: ${plannerCta}`;
  const guidesAreCurrent =
    pageContext === "guides" ||
    pageContext === "guide" ||
    pageContext === "search" ||
    pageContext === "plan";
  const guidesAreExact =
    pageContext === "guides" && navigationIsExact;
  const destinationsAreCurrent =
    pageContext === "destinations" || pageContext === "destination";
  const destinationsAreExact = pageContext === "destinations";
  const toursAreCurrent =
    pageContext === "tours" || pageContext === "tour";
  const toursAreExact = pageContext === "tours";
  const planningIsCurrent =
    pageContext === "studio" || pageContext === "services";
  const planningIsExact = pageContext === "studio";
  const navItemState = (id: HomegroundPrimaryNavigationId) => {
    switch (id) {
      case "destinations":
        return {
          active: destinationsAreCurrent,
          exact: destinationsAreExact,
        };
      case "tours":
        return { active: toursAreCurrent, exact: toursAreExact };
      case "guides":
        return { active: guidesAreCurrent, exact: guidesAreExact };
      case "studio":
        return { active: planningIsCurrent, exact: planningIsExact };
    }
  };
  const plannerFlowHashes = new Set([
    "#planner-contact",
    "#route-finder",
    "#planner-handoff",
  ]);
  const languageHash = plannerFlowHashes.has(activeHash)
    ? plannerTarget
    : activeHash || (plannerStatus === "new" ? "" : plannerTarget);
  const overriddenLanguagePathFor = (targetLocale: HomegroundLocale) =>
    languagePaths?.[targetLocale] ??
    (targetLocale === "zh" ? languagePaths?.["zh-Hans"] : undefined);
  const availableLanguageLocales = homegroundLocales.filter(
    (targetLocale) =>
      !languagePaths || Boolean(overriddenLanguagePathFor(targetLocale)),
  );
  const languageHrefFor = (targetLocale: HomegroundLocale) => {
    const overriddenPath = overriddenLanguagePathFor(targetLocale);
    if (overriddenPath) {
      return overriddenPath;
    }

    const target = getHomegroundCopy(targetLocale);
    return pageContext === "guide"
      ? getGuideEntry(guideId, targetLocale).canonicalPath
      : pageContext === "guides"
        ? `${target.path}guides/`
        : pageContext === "plan"
          ? `${target.path}plan/`
          : pageContext === "tours" || pageContext === "tour"
            ? `${target.path}tours/`
            : pageContext === "services"
              ? `${getChinaItineraryReviewCopy(targetLocale).path}${languageHash}`
              : pageContext === "studio"
                ? `${target.path}studio/`
                : plannerStatus === "result" && !languageQuery
                  ? `${target.path}?planner=result${languageHash}`
                  : `${target.path}${languageQuery}${languageHash}`;
  };

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

    const previousRootOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const header = menuButtonRef.current?.closest("header");
    const blockedElements: HTMLElement[] = [];
    let activeBranch = header instanceof HTMLElement ? header : null;
    while (activeBranch && activeBranch !== document.body) {
      const parent = activeBranch.parentElement;
      if (!parent) break;
      for (const sibling of Array.from(parent.children)) {
        if (sibling instanceof HTMLElement && sibling !== activeBranch) {
          blockedElements.push(sibling);
        }
      }
      activeBranch = parent;
    }
    const blockedStates = blockedElements.map((element) => ({
        element,
        inert: element.inert,
        ariaHidden: element.getAttribute("aria-hidden"),
      }));

    for (const { element } of blockedStates) {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    }

    const focusFrame = window.requestAnimationFrame(() => {
      mobileNavRef.current
        ?.querySelector<HTMLElement>('a[href], button:not([disabled])')
        ?.focus();
    });

    const handleOpenMenuKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      if (!header) return;
      const focusable = Array.from(
        header.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const closeMenuAtDesktop = () => {
      if (window.innerWidth < 1180) return;
      const brand = header?.querySelector<HTMLElement>('a[href]');
      setOpen(false);
      window.requestAnimationFrame(() => brand?.focus());
    };

    window.addEventListener("keydown", handleOpenMenuKeydown);
    window.addEventListener("resize", closeMenuAtDesktop);
    return () => {
      window.removeEventListener("keydown", handleOpenMenuKeydown);
      window.removeEventListener("resize", closeMenuAtDesktop);
      window.cancelAnimationFrame(focusFrame);
      for (const { element, inert, ariaHidden } of blockedStates) {
        element.inert = inert;
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      }
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);
  const trackNavigationClick = (
    item: HomegroundPrimaryNavigationId | "faq",
    surface:
      | "desktop-primary"
      | "desktop-utility"
      | "mobile-primary"
      | "mobile-utility",
  ) => {
    trackEvent("navigation_clicked", {
      navigation_item: item,
      navigation_surface: surface,
      page_language: locale,
    });
  };
  const trackPlannerClick = () => {
    if (!plannerTracking) return;
    trackEvent("guide_cta_clicked", {
      guide_id: plannerTracking.guideId,
      page_language: locale,
      cta_position: plannerTracking.position ?? "header",
    });
  };
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
    <header
      className={styles.siteHeader}
      data-homeground-header-context={pageContext}
      data-homeground-header-locale={locale}
      data-menu-open={open ? "true" : "false"}
    >
      <div
        aria-label={open ? copy.navigation.mobileLabel : undefined}
        aria-modal={open ? "true" : undefined}
        className={styles.headerDialog}
        role={open ? "dialog" : undefined}
      >
        <div className={styles.headerInner}>
        <Link
          className={styles.brand}
          href={copy.path}
          aria-label={copy.navigation.homeLabel}
          onClick={close}
        >
          <HomegroundBrandMark className={styles.brandMark} />
          <span>
            <strong lang="en">Homeground China</strong>
            <small>{copy.businessDescriptor}</small>
          </span>
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label={copy.navigation.primaryLabel}
        >
          {primaryNavigation.items.map((item) => {
            const state = navItemState(item.id);
            return (
              <a
                aria-current={
                  state.exact ? "page" : state.active ? "location" : undefined
                }
                data-active={state.active ? "true" : undefined}
                href={item.href}
                key={item.id}
                onClick={() => trackNavigationClick(item.id, "desktop-primary")}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className={styles.headerActions}>
          <a
            aria-current={
              pageContext === "home" && activeHash === "#faq"
                ? "location"
                : undefined
            }
            className={styles.desktopUtilityLink}
            href={faqHref}
            onClick={(event) => {
              trackNavigationClick("faq", "desktop-utility");
              if (pageContext === "home") {
                handleHomegroundHashClick(event, "#faq");
              }
            }}
          >
            {copy.navigation.faq}
          </a>
          <nav
            className={styles.languageNav}
            aria-label={copy.navigation.languageLabel}
            hidden={!showLanguageNav}
            style={showLanguageNav ? undefined : { display: "none" }}
          >
            {availableLanguageLocales.map((targetLocale) => {
              const target = getHomegroundCopy(targetLocale);
              const languageHref = languageHrefFor(targetLocale);
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
            data-label-mode={plannerStatus === "new" ? "full" : "compact"}
            href={plannerHref}
            aria-label={plannerCtaAccessibleLabel}
            onClick={(event) => {
              trackPlannerClick();
              if (pageContext === "home") {
                handleHomegroundHashClick(event, plannerTarget);
              }
            }}
          >
            <span className={styles.headerCtaLong} aria-hidden="true">
              {plannerCta}
            </span>
            <span className={styles.headerCtaShort} aria-hidden="true">
              {primaryNavigation.mobileCta}
            </span>
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
            aria-controls="homeground-mobile-navigation"
            onClick={() => setOpen((current) => !current)}
            onKeyDown={(event) => {
              if (
                event.repeat ||
                (event.key !== "Enter" && event.key !== " ")
              ) {
                return;
              }
              event.preventDefault();
              setOpen((current) => !current);
            }}
          >
            {open ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
          </button>
        </div>
        </div>

        <nav
          ref={mobileNavRef}
          id="homeground-mobile-navigation"
          className={styles.mobileNav}
          aria-label={copy.navigation.mobileLabel}
          hidden={!open}
        >
          <div className={styles.mobilePrimaryLinks}>
            {primaryNavigation.items.map((item) => {
              const state = navItemState(item.id);
              return (
                <a
                  aria-current={
                    state.exact ? "page" : state.active ? "location" : undefined
                  }
                  data-active={state.active ? "true" : undefined}
                  href={item.href}
                  key={item.id}
                  onClick={() => {
                    trackNavigationClick(item.id, "mobile-primary");
                    close();
                  }}
                >
                  <span className={styles.mobileNavCopy}>
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                  <span aria-hidden="true">→</span>
                </a>
              );
            })}
          </div>
          <div className={styles.mobileUtility}>
            <div className={styles.mobileUtilityRow}>
              <a
                aria-current={
                  pageContext === "home" && activeHash === "#faq"
                    ? "location"
                    : undefined
                }
                className={styles.mobileUtilityLink}
                href={faqHref}
                onClick={(event) => {
                  trackNavigationClick("faq", "mobile-utility");
                  close();
                  if (pageContext === "home") {
                    handleHomegroundHashClick(event, "#faq");
                  }
                }}
              >
                <span>{copy.navigation.faq}</span>
                <span aria-hidden="true">→</span>
              </a>
              <div
                className={styles.mobileLanguageNav}
                role="group"
                aria-label={copy.navigation.languageLabel}
                hidden={!showLanguageNav}
                style={showLanguageNav ? undefined : { display: "none" }}
              >
                {availableLanguageLocales.map((targetLocale) => {
                  const target = getHomegroundCopy(targetLocale);
                  const languageHref = languageHrefFor(targetLocale);
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
            </div>
            <a
              className={styles.mobileCta}
              href={plannerHref}
              onClick={(event) => {
                trackPlannerClick();
                close();
                if (pageContext === "home") {
                  handleHomegroundHashClick(event, plannerTarget);
                }
              }}
            >
              {plannerCta}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
