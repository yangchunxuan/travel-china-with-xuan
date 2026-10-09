"use client";

import { openTourContactFromLink } from "../lib/tourContact";

import { setNavigationMenuOpen } from "../lib/siteOverlayState";
import { requestNewsletterLanguageTransfer } from "../lib/newsletterPrompt";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
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
import type { GuideId } from "../lib/guideRegistry";
import { getGuidePath } from "../lib/guidePath";
import {
  handleHomegroundHashClick,
  type HomegroundHashTarget,
} from "../lib/homegroundNavigation";
import {
  getHomegroundNavigationModel,
  type HomegroundPrimaryNavigationId,
  type HomegroundPrimaryNavigationItem,
  type HomegroundSubmenuId,
} from "../lib/homegroundNavigationModel";
import { routeServiceIds } from "../lib/routeServiceInterest";
import {
  isPrivateTourInquirySlug,
  getPrivateTourInquirySelection,
  buildPrivateTourDetailHref,
  privateTourInquiryQueryKey,
  privateTourInquirySelectionQueryKeys,
} from "../lib/privateTourInquiryContext";
import type { HandoffStatus } from "./PlannerHandoff";
import type { PlannerStatus } from "./RouteFinder";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import { HeaderNavMenu, MenuLink } from "./HeaderNavMenu";
import { usePrivateTourSelection, useSelectedPrivateTourInquiryHref } from "./PrivateTourSelection";
import { GuideTourEntry } from "./GuideTourEntry";
import { guideTourEntryId } from "../lib/guideTourEntry";
import { markHomegroundInternalReload } from "../lib/homegroundRouteSession";
import { HomegroundWordmark, useBrandFold } from "./HomegroundWordmark";
import styles from "./HomegroundHeader.module.css";

export type HomegroundPageContext =
  | "home"
  | "guide"
  | "guides"
  | "search"
  | "plan"
  | "studio"
  | "services"
  | "reservations"
  | "tours"
  | "tour"
  /** A curated collection of tours (/tours/multi-city/ …), under Private Tours. */
  | "tour-collection"
  | "destinations"
  | "destination"
  /** /company/ and /zh/careers/, under About Us with /studio/. */
  | "company"
  | "careers"
  | "content";

type HomegroundLanguagePathKey = HomegroundLocale | "zh-Hans" | "ja";
type MobileSectionId = Exclude<HomegroundPrimaryNavigationId, "guides">;

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
    const selection = getPrivateTourInquirySelection(
      privateTour,
      current.searchParams.get(privateTourInquirySelectionQueryKeys.packageId),
      current.searchParams.get(privateTourInquirySelectionQueryKeys.travelers),
    );
    if (selection) {
      preserved.set(privateTourInquirySelectionQueryKeys.packageId, selection.packageId);
      preserved.set(privateTourInquirySelectionQueryKeys.travelers, String(selection.travelers));
    }
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
  const pathname = usePathname();
  const articleId = guideTourEntryId(pathname);
  const [open, setOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<MobileSectionId | null>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    setNavigationMenuOpen(open);
    return () => setNavigationMenuOpen(false);
  }, [open]);
  // Scrolled past the top, the wordmark folds to "Hi"; back at the top it unfolds.
  const brandFold = useBrandFold();
  const [activeHash, setActiveHash] = useState("");
  const [languageQuery, setLanguageQuery] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);
  const mobileMenuScrollRef = useRef<HTMLDivElement | null>(null);
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
  const selectedPlannerHref = useSelectedPrivateTourInquiryHref(plannerHrefOverride);
  const tourSelection = usePrivateTourSelection();
  const plannerHref = selectedPlannerHref ?? (
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
    pageContext === "tours" || pageContext === "tour" || pageContext === "tour-collection";
  const toursAreExact = pageContext === "tours";
  // Every /services/ page (hub, guides, itinerary review) and the
  // reservation page sit under the Services item.
  const servicesAreCurrent =
    pageContext === "services" || pageContext === "reservations";
  const planningIsCurrent = pageContext === "studio";
  // About Us opens /company/; /studio/ and careers sit under it.
  const aboutIsCurrent =
    planningIsCurrent || pageContext === "company" || pageContext === "careers";
  const aboutIsExact = pageContext === "company";
  const submenuFor = (id: HomegroundPrimaryNavigationId) => primaryNavigation.menus[id];
  const navItemState = (id: HomegroundPrimaryNavigationId) => {
    switch (id) {
      case "destinations":
        return {
          active: destinationsAreCurrent,
          exact: destinationsAreExact,
        };
      case "tours":
        return { active: toursAreCurrent, exact: toursAreExact };
      case "services": {
        // The page "Services" opens is the exact page; the other service pages are a location.
        const hubPath = primaryNavigation.items.find((entry) => entry.id === "services")?.href;
        return { active: servicesAreCurrent, exact: servicesAreCurrent && pathname === hubPath };
      }
      case "guides":
        return { active: guidesAreCurrent, exact: guidesAreExact };
      case "studio":
        return { active: aboutIsCurrent, exact: aboutIsExact };
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
  const homeLanguageHrefFor = (path: string) =>
    plannerStatus === "result" && !languageQuery
      ? `${path}?planner=result${languageHash}`
      : `${path}${languageQuery}${languageHash}`;
  const languageHrefFor = (targetLocale: HomegroundLocale) => {
    const overriddenPath = overriddenLanguagePathFor(targetLocale);
    if (overriddenPath) {
      if (pageContext === "home") {
        return homeLanguageHrefFor(overriddenPath);
      }
      return pageContext === "tour" && tourSelection
        ? buildPrivateTourDetailHref(overriddenPath, tourSelection.slug, tourSelection.selection)
        : overriddenPath;
    }

    const target = getHomegroundCopy(targetLocale);
    return pageContext === "guide"
      ? getGuidePath(guideId, targetLocale)
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
                : homeLanguageHrefFor(target.path);
  };
  const japaneseLanguageHref = languagePaths?.ja && pageContext === "tour" && tourSelection
    ? buildPrivateTourDetailHref(languagePaths.ja, tourSelection.slug, tourSelection.selection)
    : languagePaths?.ja;

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
    const allowedServiceHashes = new Set([
      "#choose-service",
      "#full-trip-support",
    ]);
    const hash = window.location.hash;
    if (!hash) return;
    const supportsContentAnchor =
      pageContext === "guide" ||
      pageContext === "content" ||
      pageContext === "destination" ||
      pageContext === "tour";
    if (
      !(pageContext === "services" && allowedServiceHashes.has(hash)) &&
      !supportsContentAnchor
    ) {
      return;
    }
    if (!document.getElementById(hash.slice(1))) return;

    let cancelled = false;
    let settleTimer = 0;
    const frames = new Set<number>();
    const alignAnchorAfterFonts = () => {
      if (cancelled || window.location.hash !== hash) return;
      const firstFrame = window.requestAnimationFrame(() => {
        frames.delete(firstFrame);
        const secondFrame = window.requestAnimationFrame(() => {
          frames.delete(secondFrame);
          const target = document.getElementById(hash.slice(1));
          const disclosureId = target?.dataset.faqDisclosure;
          if (disclosureId) {
            const disclosure = document.getElementById(disclosureId);
            if (disclosure instanceof HTMLDetailsElement) disclosure.open = true;
          }
          target?.scrollIntoView({ block: "start" });
        });
        frames.add(secondFrame);
      });
      frames.add(firstFrame);
    };

    void document.fonts.ready.then(alignAnchorAfterFonts);
    if (document.readyState === "complete") {
      alignAnchorAfterFonts();
    } else {
      window.addEventListener("load", alignAnchorAfterFonts, { once: true });
    }
    settleTimer = window.setTimeout(alignAnchorAfterFonts, 600);
    return () => {
      cancelled = true;
      window.removeEventListener("load", alignAnchorAfterFonts);
      window.clearTimeout(settleTimer);
      for (const frame of frames) window.cancelAnimationFrame(frame);
    };
  }, [pageContext]);

  useEffect(() => {
    setExpandedSection(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      setExpandedSection(null);
      setEntered(false);
      return;
    }

    let enteredFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      enteredFrame = window.requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(enteredFrame);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !expandedSection) return;

    const keepExpandedSectionVisible = () => {
      const scrollArea = mobileMenuScrollRef.current;
      const section = scrollArea?.querySelector<HTMLElement>(
        `[data-section="${expandedSection}"]`,
      );
      if (!scrollArea || !section) return;

      const scrollBounds = scrollArea.getBoundingClientRect();
      const sectionBounds = section.getBoundingClientRect();
      const panel = section.querySelector<HTMLElement>(`#mobile-section-${expandedSection}`);
      const panelContent = panel?.firstElementChild;
      // At 260ms the grid is still opening. Measure the content's full height
      // so the scroll target accounts for the rest of the expansion.
      const expandedHeight = sectionBounds.height - (panel?.getBoundingClientRect().height ?? 0)
        + (panelContent instanceof HTMLElement ? panelContent.scrollHeight : 0);
      const sectionBottom = sectionBounds.top + expandedHeight;
      const sectionStartsAboveView = sectionBounds.top < scrollBounds.top + 12;
      if (sectionBottom <= scrollBounds.bottom && !sectionStartsAboveView) return;

      const sectionTop = scrollArea.scrollTop + sectionBounds.top - scrollBounds.top;
      const targetTop = expandedHeight > scrollArea.clientHeight || sectionStartsAboveView
        ? sectionTop - 12
        : scrollArea.scrollTop + sectionBottom - scrollBounds.bottom + 12;
      scrollArea.scrollTo({
        top: Math.max(0, targetTop),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    };
    const scrollTimer = window.setTimeout(keepExpandedSectionVisible, 260);
    // A still-growing scroll area can clamp the first target. Once the grid
    // settles, correct only if the section's bottom remains out of view.
    const settleTimer = window.setTimeout(keepExpandedSectionVisible, 520);
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(settleTimer);
    };
  }, [expandedSection, open]);

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
      ).filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]"));
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
    item: HomegroundPrimaryNavigationId | HomegroundSubmenuId | "faq",
    surface:
      | "desktop-primary"
      | `desktop-${"destinations" | "tours" | "services" | "studio"}-menu`
      | "desktop-utility"
      | "mobile-primary"
      | `mobile-${"destinations" | "tours" | "services" | "studio"}-menu`
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
    targetLocale: HomegroundLocale | "ja",
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

    if (targetLocale !== locale && !opensSeparateContext && !event.defaultPrevented &&
        event.currentTarget.origin === window.location.origin) {
      // The Japanese site has no newsletter or planner form to receive state.
      if (targetLocale !== "ja") {
        requestNewsletterLanguageTransfer(event.currentTarget.pathname);
        if ((locale === "en") !== (targetLocale === "en")) {
          markHomegroundInternalReload(event.currentTarget.href);
        }
      }
    }
    close();
  };
  const renderLanguageChoice = (targetLocale: HomegroundLocale) => {
    const target = getHomegroundCopy(targetLocale);
    const languageHref = languageHrefFor(targetLocale);
    const ariaCurrent =
      targetLocale === locale
        ? pageContext === "home"
          ? "page"
          : "true"
        : undefined;
    const crossesRootLayout =
      (locale === "en") !== (targetLocale === "en");
    const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) =>
      handleLanguageChange(event, targetLocale);
    const label = (
      <>
        <span className={styles.languageChoiceShort}>{target.languageShort}</span>
        <span className={styles.languageChoiceEndonym}>
          {targetLocale === "en" ? target.languageName : target.languageShort}
        </span>
      </>
    );

    // English and localized pages use different root layouts. A plain anchor
    // lets the browser perform that required document navigation reliably;
    // zh <-> ko stays inside the localized root and keeps client navigation.
    return crossesRootLayout ? (
      <a
        aria-current={ariaCurrent}
        href={languageHref}
        hrefLang={target.htmlLang}
        key={targetLocale}
        lang={target.htmlLang}
        onClick={handleClick}
      >
        {label}
      </a>
    ) : (
      <Link
        aria-current={ariaCurrent}
        href={languageHref}
        hrefLang={target.htmlLang}
        key={targetLocale}
        lang={target.htmlLang}
        onClick={handleClick}
      >
        {label}
      </Link>
    );
  };
  const renderJapaneseLanguageChoice = () => japaneseLanguageHref ? (
    <a
      href={japaneseLanguageHref}
      hrefLang="ja"
      lang="ja"
      onClick={(event) => handleLanguageChange(event, "ja")}
    >
      日本語
    </a>
  ) : null;

  const renderMobileSection = (item: HomegroundPrimaryNavigationItem, index: number) => {
    const state = navItemState(item.id);
    const current = state.exact ? "page" : state.active ? "location" : undefined;
    const menu = submenuFor(item.id);
    if (!menu) {
      return (
        <li
          className={styles.mobileSection}
          data-section={item.id}
          data-current={state.active ? "true" : undefined}
          key={item.id}
          style={{ "--menu-index": index } as CSSProperties}
        >
          <Link
            aria-current={current}
            className={styles.mobileSectionLink}
            href={item.href}
            onClick={() => {
              trackNavigationClick(item.id, "mobile-primary");
              close();
            }}
          >
            <span className={styles.mobileSectionLabel}>{item.label}</span>
          </Link>
        </li>
      );
    }

    const menuId = item.id as MobileSectionId;
    const label = menuId === "services" ? copy.navigation.mobileServicesLabel : item.label;
    const expanded = expandedSection === menuId;
    return (
      <li
        className={styles.mobileSection}
        data-section={item.id}
        data-open={expanded ? "true" : undefined}
        data-current={state.active ? "true" : undefined}
        key={item.id}
        style={{ "--menu-index": index } as CSSProperties}
      >
        <button
          type="button"
          id={`mobile-section-toggle-${menuId}`}
          className={styles.mobileSectionToggle}
          aria-expanded={expanded}
          aria-controls={`mobile-section-${menuId}`}
          onClick={() => setExpandedSection((currentSection) =>
            currentSection === menuId ? null : menuId,
          )}
        >
          <span className={styles.mobileSectionLabel}>{label}</span>
        </button>
        <div
          id={`mobile-section-${menuId}`}
          className={styles.mobileSectionPanel}
          role="region"
          aria-labelledby={`mobile-section-toggle-${menuId}`}
          inert={!expanded}
        >
          <div>
            <ul aria-label={label} className={styles.mobileSubmenu} data-menu={menuId}>
              {menu.entries.map((entry, entryIndex) => (
                <li
                  key={entry.id}
                  style={{ "--entry-index": entryIndex } as CSSProperties}
                >
                  <MenuLink
                    aria-current={
                      entry.href.includes("?")
                        ? undefined
                        : entry.href.split(/[?#]/u)[0] === pathname
                          ? "page"
                          : pathname?.startsWith(entry.href.split(/[?#]/u)[0])
                            ? "location"
                            : undefined
                    }
                    href={entry.href}
                    onClick={() => {
                      trackNavigationClick(entry.id, `mobile-${menuId}-menu`);
                      close();
                    }}
                  >
                    <span className={styles.mobileEntryLabel}>{entry.label}</span>
                    <span className={styles.mobileEntryDescription}>{entry.description}</span>
                  </MenuLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
    <header
      className={styles.siteHeader}
      data-homeground-header-context={pageContext}
      data-homeground-header-locale={locale}
      data-menu-open={open ? "true" : "false"}
      {...brandFold}
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
            <HomegroundWordmark />
            <small>{copy.businessDescriptor}</small>
          </span>
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label={copy.navigation.primaryLabel}
        >
          {primaryNavigation.items.map((item) => {
            const state = navItemState(item.id);
            const current = state.exact ? "page" : state.active ? "location" : undefined;
            const menu = submenuFor(item.id);
            if (menu) {
              const menuId = item.id as "destinations" | "tours" | "services" | "studio";
              return (
                <HeaderNavMenu
                  active={state.active}
                  ariaCurrent={current}
                  entries={menu.entries}
                  item={item}
                  key={item.id}
                  onNavigate={(target) =>
                    target
                      ? trackNavigationClick(target, `desktop-${menuId}-menu`)
                      : trackNavigationClick(item.id, "desktop-primary")
                  }
                  toggleLabel={menu.toggle}
                />
              );
            }
            return (
              <Link
                aria-current={current}
                data-active={state.active ? "true" : undefined}
                href={item.href}
                key={item.id}
                onClick={() => trackNavigationClick(item.id, "desktop-primary")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.headerActions}>
          <Link
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
          </Link>
          <nav
            className={styles.languageNav}
            aria-label={copy.navigation.languageLabel}
            hidden={!showLanguageNav}
            style={showLanguageNav ? undefined : { display: "none" }}
          >
            {availableLanguageLocales.map(renderLanguageChoice)}
            {renderJapaneseLanguageChoice()}
          </nav>
          <Link
            className={styles.headerCta}
            data-label-mode={plannerStatus === "new" ? "full" : "compact"}
            href={plannerHref}
            aria-label={plannerCtaAccessibleLabel}
            onClick={(event) => {
              trackPlannerClick();
              openTourContactFromLink(event, plannerHref, locale);
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
          </Link>
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
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        </div>

        <nav
          ref={mobileNavRef}
          id="homeground-mobile-navigation"
          className={styles.mobileNav}
          aria-label={copy.navigation.mobileLabel}
          hidden={!open}
          data-entered={entered ? "true" : undefined}
        >
          <div
            ref={mobileMenuScrollRef}
            className={styles.mobileMenuScroll}
            data-has-open={expandedSection ? "true" : undefined}
          >
            <ul className={styles.mobileSections} data-tier="primary">
              {primaryNavigation.items
                .filter((item) => item.id !== "guides" && item.id !== "studio")
                .map((item, index) => renderMobileSection(item, index))}
            </ul>
            <ul className={styles.mobileSections} data-tier="secondary">
              {primaryNavigation.items
                .filter((item) => item.id === "guides" || item.id === "studio")
                .map((item, index) => renderMobileSection(item, index + 3))}
              <li
                className={styles.mobileSection}
                data-section="faq"
                data-current={pageContext === "home" && activeHash === "#faq" ? "true" : undefined}
                style={{ "--menu-index": 5 } as CSSProperties}
              >
                <Link
                  aria-current={
                    pageContext === "home" && activeHash === "#faq"
                      ? "location"
                      : undefined
                  }
                  className={styles.mobileSectionLink}
                  href={faqHref}
                  onClick={(event) => {
                    trackNavigationClick("faq", "mobile-utility");
                    close();
                    if (pageContext === "home") {
                      handleHomegroundHashClick(event, "#faq");
                    }
                  }}
                >
                  <span className={styles.mobileSectionLabel}>{copy.navigation.faq}</span>
                </Link>
              </li>
            </ul>
            <p className={styles.mobileTagline} style={{ "--menu-index": 6 } as CSSProperties}>
              {copy.navigation.menuTagline}
            </p>
          </div>
          <div className={styles.mobileUtility} style={{ "--menu-index": 7 } as CSSProperties}>
            <Link
              className={styles.mobileCta}
              href={plannerHref}
              onClick={(event) => {
                trackPlannerClick();
                openTourContactFromLink(event, plannerHref, locale, menuButtonRef.current);
                close();
                if (pageContext === "home") {
                  handleHomegroundHashClick(event, plannerTarget);
                }
              }}
            >
              <span>{plannerCta}</span>
              <span className={styles.mobileCtaArrow} aria-hidden="true" />
            </Link>
            <div
              className={styles.mobileLanguageNav}
              role="group"
              aria-label={copy.navigation.languageLabel}
              hidden={!showLanguageNav}
              style={showLanguageNav ? undefined : { display: "none" }}
            >
              {availableLanguageLocales.map(renderLanguageChoice)}
              {renderJapaneseLanguageChoice()}
            </div>
          </div>
        </nav>
      </div>
    </header>
    {articleId ? <GuideTourEntry locale={locale} guideId={articleId} menuOpen={open} /> : null}
    </>
  );
}
