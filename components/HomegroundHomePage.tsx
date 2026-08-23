"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  FileCheck2,
  MapPinned,
  Tickets,
  TrainFront,
} from "lucide-react";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import {
  getHomepageDecisionPath,
  getHomepageShowcaseCopy,
} from "../lib/homepageShowcaseI18n";
import { trackEvent } from "../lib/analytics";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import type {
  HomepageDestinationHubItem,
  HomepageGuideCategory,
  HomepageGuideRailItem,
  HomepageSearchDemo,
} from "../lib/homepageEditorial";
import {
  editorialOrganizationSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import type { DestinationPlan } from "../lib/destinationPlanner";
import {
  getRouteServiceInterest,
  routeServiceQueryKey,
  type RouteServiceInterest,
} from "../lib/routeServiceInterest";
import {
  isHomepageStarterIntentId,
  type HomepagePlanningIntentId,
  type HomepageStarterIntentId,
} from "../lib/homepagePlanningDesk";
import { HomegroundHeader } from "./HomegroundHeader";
import { HomegroundFooter } from "./HomegroundFooter";
import { handleHomegroundHashClick } from "../lib/homegroundNavigation";
import {
  PlannerHandoff,
  type HandoffStatus,
} from "./PlannerHandoff";
import {
  RouteFinder,
  type PlannerStatus,
  type RouteJourney,
} from "./RouteFinder";
import { PlanningScopeSection } from "./PlanningScopeSection";
import { HomepageGuideSearch } from "./HomepageGuideSearch";
import { HomepageGuideRail } from "./HomepageGuideRail";
import { HomepageProductShowcase } from "./HomepageProductShowcase";
import styles from "./HomegroundHomePage.module.css";
import showcaseStyles from "./HomepageShowcase.module.css";

/**
 * Which build of section three to render.
 *
 * "scope-v2" is the redesign and is now the default, so the homepage shows it
 * in place while it is being reviewed. "current" is the previous section, kept
 * so /planning-scope-lab/full/ can still show the before state side by side.
 *
 * Nothing is published by this: deploy.yml only runs on a push to main, and
 * this work is on a branch. Reverting is one word.
 */
export type PlanningSectionVariant = "current" | "scope-v2";

const handledIcons = [TrainFront, BedDouble, Tickets, FileCheck2] as const;

const planningIntentStorageKey = "homeground-planning-intent-v1";
const planningStarterIntentStorageKey =
  "homeground-planning-starter-intent-v1";

const homepageProductShowcaseGuideIds = [
  "longji-rice-terraces-day-trip-or-overnight",
  "forbidden-city-for-foreign-visitors",
  "yangshuo-town-or-yulong-river-where-to-stay",
] as const;

const homepageProductShowcaseExcludedItemIds = [
  "zhangjiajie-4-day-private-tour",
  ...homepageProductShowcaseGuideIds,
] as const;

export function HomegroundHomePage({
  destinationHubItems,
  guideRailItems,
  locale = "en",
  planningSection = "scope-v2",
  searchDemos,
}: {
  destinationHubItems: readonly HomepageDestinationHubItem[];
  guideRailItems: readonly HomepageGuideRailItem[];
  locale?: HomegroundLocale;
  planningSection?: PlanningSectionVariant;
  searchDemos: readonly HomepageSearchDemo[];
}) {
  const [plannerStatus, setPlannerStatus] = useState<PlannerStatus>("new");
  const [routeMatch, setRouteMatch] = useState<DestinationPlan | null>(
    null,
  );
  const [routeJourney, setRouteJourney] = useState<RouteJourney | null>(null);
  const [handoffStatus, setHandoffStatus] =
    useState<HandoffStatus>("disabled");
  const [handoffDirty, setHandoffDirty] = useState(false);
  const [planningIntent, setPlanningIntent] =
    useState<HomepagePlanningIntentId | null>(null);
  const [planningStarterIntent, setPlanningStarterIntent] =
    useState<HomepageStarterIntentId | null>(null);
  const [planningStarterNote, setPlanningStarterNote] = useState("");
  const planningIntentRef = useRef<HomepagePlanningIntentId | null>(null);
  const [serviceContextRevision, setServiceContextRevision] = useState(0);
  const [retainedRouteServiceInterest, setRetainedRouteServiceInterest] =
    useState<RouteServiceInterest | null>(null);
  const copy = getHomegroundCopy(locale);
  const showcase = getHomepageShowcaseCopy(locale);
  const featuredTour = guideRailItems.find(
    (item) =>
      item.kind === "tour" &&
      item.id === "zhangjiajie-4-day-private-tour",
  );
  const productShowcaseGuides = homepageProductShowcaseGuideIds.flatMap(
    (id) => {
      const guide = guideRailItems.find(
        (item) => item.kind === "guide" && item.id === id,
      );
      return guide ? [guide] : [];
    },
  );
  const guidesIndexPath =
    locale === "en" ? "/guides/" : `/${locale}/guides/`;
  const studioPath =
    locale === "en" ? "/studio/" : `/${locale}/studio/`;
  const heroLinks = [
    {
      href: guidesIndexPath,
      title: copy.guides.eyebrow,
      body: copy.guides.title,
      hashTarget: null,
    },
    {
      href: "#destinations",
      title: copy.cities.eyebrow,
      body: copy.cities.intro,
      hashTarget: "#destinations" as const,
    },
    {
      href: studioPath,
      title: copy.navigation.planning,
      body: copy.studio.title,
      hashTarget: null,
    },
    {
      href: "#faq",
      title: copy.faq.eyebrow,
      body: copy.faq.title,
      hashTarget: "#faq" as const,
    },
  ] as const;
  const guideRailCatalogPath =
    locale === "en"
      ? "/guides/homepage-guide-index.json"
      : `/${locale}/guides/homepage-guide-index.json`;
  const guideCategoryLabels: Record<HomepageGuideCategory, string> = {
    tour: copy.guides.categoryLabels.tour,
    explore: copy.guides.categoryLabels.explore,
    stay: copy.guides.categoryLabels.stay,
    transport: copy.guides.categoryLabels.transport,
    plan: copy.guides.categoryLabels.plan,
    culture: copy.guides.categoryLabels.culture,
    essentials: copy.guides.categoryLabels.essentials,
    "when-to-go": copy.guides.categoryLabels.whenToGo,
  };
  const plannerTarget =
    plannerStatus === "result" && routeMatch
      ? "#planner-handoff"
      : plannerStatus === "in-progress"
        ? "#route-finder"
        : "#planner-contact";
  const organizationSchema = {
    ...editorialOrganizationSchema(),
    legalName: homegroundBusiness.registeredName,
    email: homegroundBusiness.serviceEmail,
    description: copy.schemaDescription,
    inLanguage: copy.htmlLang,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Unified Social Credit Code",
      value: homegroundBusiness.unifiedSocialCreditCode,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: homegroundBusiness.registeredAddress,
      addressLocality: "Zhangjiajie",
      addressRegion: "Hunan",
      addressCountry: "CN",
    },
  };
  const identitySchema = {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      organizationSchema,
    ],
  };
  const routeInteractionLocked =
    handoffStatus === "submitting" || handoffStatus === "uncertain";
  const activeRouteServiceInterest: RouteServiceInterest | null =
    getRouteServiceInterest(planningIntent, locale);
  const handoffServiceInterest =
    planningIntent === "conversation"
      ? null
      : activeRouteServiceInterest ?? retainedRouteServiceInterest;
  const starterNoteDirty =
    planningStarterNote.trim().length > 0 &&
    handoffStatus !== "success";

  useEffect(() => {
    planningIntentRef.current = planningIntent;
  }, [planningIntent]);

  useEffect(() => {
    if (!starterNoteDirty) return;

    const confirmLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", confirmLeave);
    return () =>
      window.removeEventListener("beforeunload", confirmLeave);
  }, [starterNoteDirty]);

  useEffect(() => {
    const service = getRouteServiceInterest(planningIntent, locale);
    if (service) {
      setRetainedRouteServiceInterest(service);
    } else if (planningIntent === "conversation") {
      setRetainedRouteServiceInterest(null);
    }
  }, [locale, planningIntent]);

  useEffect(() => {
    if (plannerStatus !== "result") return;

    const resultHash = window.location.hash;
    const plannerFlowHashes = new Set([
      "",
      "#planner-contact",
      "#route-finder",
      "#planner-handoff",
    ]);
    if (!plannerFlowHashes.has(resultHash)) return;

    const focusTargetId =
      resultHash === "#planner-handoff"
        ? "planner-handoff-title"
        : "route-finder-title";
    const scrollTargetId =
      resultHash === "#planner-handoff"
        ? "planner-handoff"
        : "route-finder";
    let frame = 0;
    let attempts = 0;
    const revealResult = () => {
      const scrollTarget = document.getElementById(scrollTargetId);
      const focusTarget = document.getElementById(focusTargetId);
      if (scrollTarget && focusTarget) {
        scrollTarget.scrollIntoView({ block: "start", behavior: "instant" });
        focusTarget.focus({ preventScroll: true });
        return;
      }
      attempts += 1;
      if (attempts < 8) {
        frame = window.requestAnimationFrame(revealResult);
      }
    };
    frame = window.requestAnimationFrame(revealResult);
    return () => window.cancelAnimationFrame(frame);
  }, [locale, plannerStatus]);

  useEffect(() => {
    const syncPlanningIntent = (event?: PopStateEvent) => {
      const url = new URL(window.location.href);
      const serviceId = url.searchParams.get(routeServiceQueryKey);
      const hasServiceQuery = url.searchParams.has(routeServiceQueryKey);
      const service = getRouteServiceInterest(serviceId, locale);
      const isCurrentPlannerFlow =
        event?.state &&
        typeof event.state === "object" &&
        typeof (event.state as Record<string, unknown>)
          .homegroundPlannerFlowId === "string";

      if (isCurrentPlannerFlow && planningIntentRef.current) {
        const currentService = getRouteServiceInterest(
          planningIntentRef.current,
          locale,
        );
        if (currentService) {
          url.searchParams.set(
            routeServiceQueryKey,
            currentService.id,
          );
        } else {
          url.searchParams.delete(routeServiceQueryKey);
        }
        window.history.replaceState(
          event.state,
          "",
          `${url.pathname}${url.search}${url.hash}`,
        );
        window.dispatchEvent(new Event("homeground:locationchange"));
        return;
      }

      if (service) {
        planningIntentRef.current = service.id;
        setPlanningIntent(service.id);
        setPlanningStarterIntent(null);
        try {
          window.sessionStorage.removeItem(planningIntentStorageKey);
          window.sessionStorage.removeItem(
            planningStarterIntentStorageKey,
          );
        } catch {
          // URL deep links remain sufficient when storage is unavailable.
        }
        return;
      }

      if (hasServiceQuery) {
        planningIntentRef.current = null;
        setPlanningIntent(null);
        setPlanningStarterIntent(null);
        url.searchParams.delete(routeServiceQueryKey);
        window.history.replaceState(
          window.history.state,
          "",
          `${url.pathname}${url.search}${url.hash}`,
        );
        window.dispatchEvent(new Event("homeground:locationchange"));
        try {
          window.sessionStorage.removeItem(planningIntentStorageKey);
          window.sessionStorage.removeItem(
            planningStarterIntentStorageKey,
          );
        } catch {
          // Invalid service URLs still fall back to the visible chooser.
        }
        return;
      }

      try {
        const storedIntent = window.sessionStorage.getItem(
          planningIntentStorageKey,
        );
        const storedStarterIntent = window.sessionStorage.getItem(
          planningStarterIntentStorageKey,
        );
        const canRestoreNonServiceFlow =
          window.location.hash === "#planner-contact" &&
          storedIntent === "conversation";
        planningIntentRef.current = canRestoreNonServiceFlow
          ? storedIntent
          : null;
        setPlanningIntent(planningIntentRef.current);
        setPlanningStarterIntent(
          canRestoreNonServiceFlow &&
            isHomepageStarterIntentId(storedStarterIntent)
            ? storedStarterIntent
            : null,
        );
        if (!canRestoreNonServiceFlow) {
          window.sessionStorage.removeItem(planningIntentStorageKey);
          window.sessionStorage.removeItem(
            planningStarterIntentStorageKey,
          );
        }
      } catch {
        planningIntentRef.current = null;
        setPlanningIntent(null);
        setPlanningStarterIntent(null);
      }
    };

    syncPlanningIntent();
    window.addEventListener("popstate", syncPlanningIntent);
    return () =>
      window.removeEventListener("popstate", syncPlanningIntent);
  }, [locale]);

  const handlePlanningIntentChange = useCallback(
    (
      nextIntent: HomepagePlanningIntentId,
      nextStarterIntent?: HomepageStarterIntentId,
    ) => {
      if (
        planningIntentRef.current &&
        planningIntentRef.current !== nextIntent
      ) {
        setServiceContextRevision((revision) => revision + 1);
      }
      planningIntentRef.current = nextIntent;
      setPlanningIntent(nextIntent);
      setPlanningStarterIntent(
        nextIntent === "conversation" ? nextStarterIntent ?? null : null,
      );
      const url = new URL(window.location.href);
      const nextService = getRouteServiceInterest(nextIntent, locale);
      if (nextService) {
        url.searchParams.set(routeServiceQueryKey, nextService.id);
      } else {
        url.searchParams.delete(routeServiceQueryKey);
      }
      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
      window.dispatchEvent(new Event("homeground:locationchange"));

      try {
        if (nextIntent === "conversation") {
          window.sessionStorage.setItem(
            planningIntentStorageKey,
            nextIntent,
          );
        } else {
          window.sessionStorage.removeItem(planningIntentStorageKey);
        }
        if (nextIntent === "conversation" && nextStarterIntent) {
          window.sessionStorage.setItem(
            planningStarterIntentStorageKey,
            nextStarterIntent,
          );
        } else {
          window.sessionStorage.removeItem(
            planningStarterIntentStorageKey,
          );
        }
      } catch {
        // The selected path remains available in React state.
      }

      trackEvent("planning_intent_selected", {
        planning_intent: nextIntent,
        planning_starter_intent: nextStarterIntent ?? "none",
        page_language: locale,
      });
    },
    [locale],
  );

  const handleRouteFound = useCallback(
    (match: DestinationPlan, journey: RouteJourney) => {
      setRouteMatch(match);
      setRouteJourney(journey);
    },
    [],
  );
  const handleRouteCleared = useCallback(() => {
    setRouteMatch(null);
    setRouteJourney(null);
    setHandoffStatus("disabled");
  }, []);

  useEffect(() => {
    const allowedHashes = new Set([
      "#planner-contact",
      "#route-finder",
      "#planner-handoff",
      "#destinations",
      "#planning-proof",
      "#studio",
      "#faq",
    ]);
    const hash = window.location.hash;
    if (!allowedHashes.has(hash)) return;

    let frame = 0;
    let attempts = 0;
    let cancelled = false;
    const alignHashTarget = () => {
      if (cancelled) return;
      const hashTarget = document.getElementById(hash.slice(1));
      const scrollTarget =
        hash === "#planner-contact"
          ? document.getElementById("planning-intent-title") ?? hashTarget
          : hashTarget;
      if (scrollTarget) {
        scrollTarget.scrollIntoView({
          block: "start",
          behavior: "instant",
        });
        return;
      }
      attempts += 1;
      if (attempts < 120) {
        frame = window.requestAnimationFrame(alignHashTarget);
      }
    };
    void document.fonts.ready.then(() => {
      if (!cancelled) frame = window.requestAnimationFrame(alignHashTarget);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [locale, planningIntent]);

  return (
    <div
      className={`${styles.localeRoot} ${showcaseStyles.root}`}
      lang={copy.htmlLang}
      data-homeground-locale={locale}
    >
      <a
        className={styles.skipLink}
        href="#main-content"
        onClick={(event) =>
          handleHomegroundHashClick(event, "#main-content")
        }
      >
        {copy.skipLink}
      </a>
      <HomegroundHeader
        locale={locale}
        plannerStatus={plannerStatus}
        handoffStatus={handoffStatus}
        handoffDirty={handoffDirty || starterNoteDirty}
      />

      <main id="main-content" tabIndex={-1}>
        <section
          className={showcaseStyles.hero}
          aria-labelledby="home-hero-title"
        >
          <div className={showcaseStyles.heroInner}>
            <div className={showcaseStyles.heroCopy}>
              <p className={showcaseStyles.heroEyebrow}>
                <span className={showcaseStyles.heroEyebrowLong}>
                  {copy.hero.eyebrow}
                </span>
                <span className={showcaseStyles.heroEyebrowShort}>
                  {copy.businessDescriptor}
                </span>
              </p>
              <h1 id="home-hero-title">
                {copy.hero.titleLines ? (
                  copy.hero.titleLines.map((line) => (
                    <span className={styles.heroTitleLine} key={line}>
                      {line}
                    </span>
                  ))
                ) : (
                  copy.hero.title
                )}
              </h1>
              <p className={styles.heroLead}>{showcase.heroBody}</p>
              <div className={showcaseStyles.heroActions}>
                <a
                  className={showcaseStyles.primaryAction}
                  href={guidesIndexPath}
                  aria-label={showcase.heroPrimary}
                >
                  <span className={showcaseStyles.heroActionLong}>
                    {showcase.heroPrimary}
                  </span>
                  <span className={showcaseStyles.heroActionShort} aria-hidden="true">
                    {showcase.heroPrimaryShort}
                  </span>
                </a>
                <a
                  className={showcaseStyles.secondaryAction}
                  href={plannerTarget}
                  aria-label={showcase.heroSecondary}
                  onClick={(event) =>
                    handleHomegroundHashClick(event, plannerTarget)
                  }
                >
                  <span className={showcaseStyles.heroActionLong}>
                    {showcase.heroSecondary}
                  </span>
                  <span className={showcaseStyles.heroActionShort} aria-hidden="true">
                    {showcase.heroSecondaryShort}
                  </span>
                </a>
              </div>
            </div>

            <nav
              className={showcaseStyles.heroAssurance}
              aria-label={showcase.heroLinksLabel}
            >
              <ul>
                {heroLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={
                        link.hashTarget
                          ? (event) =>
                              handleHomegroundHashClick(
                                event,
                                link.hashTarget,
                              )
                          : undefined
                      }
                    >
                      <span className={showcaseStyles.heroAssuranceCopy}>
                        <strong>{link.title}</strong>
                        <small>{link.body}</small>
                      </span>
                      <ArrowUpRight aria-hidden="true" size={17} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {featuredTour ? (
          <HomepageProductShowcase
            guides={productShowcaseGuides}
            locale={locale}
            onItemClick={(item) => {
              trackEvent("homepage_guide_card_clicked", {
                content_category: item.category,
                content_kind: item.kind,
                guide_id: item.id,
                page_language: locale,
              });
            }}
            tour={featuredTour}
          />
        ) : null}

        <div
          className={`${styles.travelGuidesSection} ${showcaseStyles.searchSection}`}
        >
          <div className={styles.travelGuides}>
            <HomepageGuideSearch demos={searchDemos} locale={locale} />
          </div>
        </div>

        <section
          className={showcaseStyles.decisions}
          aria-labelledby="homepage-decisions-title"
        >
          <div className={showcaseStyles.decisionIntro}>
            <div>
              <p className={showcaseStyles.eyebrow}>
                {showcase.decisions.eyebrow}
              </p>
              <h2 id="homepage-decisions-title">
                {showcase.decisions.title}
              </h2>
            </div>
            <p>{showcase.decisions.intro}</p>
          </div>
          <nav aria-label={showcase.decisions.listLabel}>
            <ol className={showcaseStyles.decisionGrid}>
              {showcase.decisions.cards.map((card, index) => (
                <li key={card.id}>
                  <a
                    className={showcaseStyles.decisionCard}
                    href={getHomepageDecisionPath(locale, card.id)}
                  >
                    <span
                      aria-hidden="true"
                      className={showcaseStyles.decisionNumber}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    <span className={showcaseStyles.decisionAction}>
                      {card.action}
                      <ArrowRight aria-hidden="true" size={18} />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        <HomepageGuideRail
          catalogUrl={guideRailCatalogPath}
          categoryLabels={guideCategoryLabels}
          controlLabels={{
            allCategories: copy.guides.categoryLabels.all,
            categoryFilter: copy.guides.railLabel,
          }}
          eyebrow={copy.guides.eyebrow}
          excludedItemIds={homepageProductShowcaseExcludedItemIds}
          id="homepage-guide-rail"
          items={guideRailItems}
          onItemClick={(item) => {
            trackEvent("homepage_guide_card_clicked", {
              content_category: item.category,
              content_kind: item.kind,
              guide_id: item.id,
              page_language: locale,
            });
          }}
          title={copy.guides.title}
          viewAllHref={guidesIndexPath}
          viewAllLabel={copy.guides.viewAllLabel}
        />

        {planningSection === "scope-v2" ? (
          <PlanningScopeSection locale={locale} />
        ) : (
        <section className={styles.proofSection} id="planning-proof" aria-labelledby="planning-proof-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrowDark}>{copy.proof.eyebrow}</p>
            <h2 id="planning-proof-title" tabIndex={-1}>
              {copy.proof.title}
            </h2>
            <p>{copy.proof.intro}</p>
          </div>

          <div className={styles.proofBoard}>
            <article className={styles.sampleRoute} aria-labelledby="sample-route-title">
              <div className={styles.sampleRouteImage}>
                <img
                  src="/images/home/hangzhou-west-lake-leifeng-1600.webp"
                  alt={copy.proof.imageAlt}
                  width="1600"
                  height="1200"
                  loading="lazy"
                />
                <span>{copy.proof.imageBadge}</span>
              </div>
              <div className={styles.sampleRouteHeading}>
                <div>
                  <p className={styles.cardLabel}>{copy.proof.cardLabel}</p>
                  <h3 id="sample-route-title">{copy.proof.cardTitle}</h3>
                </div>
                <span>{copy.proof.cardTag}</span>
              </div>

              <dl className={styles.planningExtract}>
                {copy.proof.extract.map((item) => (
                  <div key={item.term}>
                    <dt>{item.term}</dt>
                    <dd>{item.detail}</dd>
                  </div>
                ))}
              </dl>

              <div className={styles.planningPoint}>
                <strong>{copy.proof.pointLabel}</strong>
                <p>{copy.proof.point}</p>
              </div>
            </article>

            <aside className={styles.handledCard} aria-labelledby="handled-title">
              <p className={styles.cardLabel}>{copy.proof.handledLabel}</p>
              <h3 id="handled-title">{copy.proof.handledTitle}</h3>
              <ul>
                {copy.proof.handled.map((item, index) => {
                  const Icon = handledIcons[index];
                  return (
                    <li key={item.title}>
                      <Icon aria-hidden="true" size={20} />
                      <span>
                        <strong>{item.title}</strong>
                        {item.detail}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>

        </section>
        )}

        <section
          className={`${showcaseStyles.planningSection} ${
            plannerStatus === "result"
              ? showcaseStyles.planningSectionResult
              : ""
          }`}
          aria-labelledby={
            plannerStatus === "result"
              ? "route-finder-title"
              : "homepage-human-planning-title"
          }
        >
          <div className={showcaseStyles.planningGrid}>
            <div className={showcaseStyles.planningIntro}>
              <p className={showcaseStyles.eyebrow}>
                {showcase.planning.eyebrow}
              </p>
              <h2 id="homepage-human-planning-title">
                {showcase.planning.title}
              </h2>
              <p>{showcase.planning.body}</p>
              <a
                className={showcaseStyles.planningTeamLink}
                href={studioPath}
              >
                {showcase.planning.teamAction}
                <ArrowRight aria-hidden="true" size={16} />
              </a>
            </div>

            <div className={showcaseStyles.planningPanel}>
              <RouteFinder
                id="route-finder"
                locale={locale}
                variant="hero"
                planningIntent={planningIntent}
                planningStarterIntent={planningStarterIntent}
                planningStarterNote={planningStarterNote}
                onPlanningStarterNoteChange={setPlanningStarterNote}
                onPlanningIntentChange={handlePlanningIntentChange}
                serviceInterest={activeRouteServiceInterest}
                interactionLocked={routeInteractionLocked}
                contactDraftDirty={handoffDirty}
                handoff={
                  routeMatch ? (
                    <div hidden={!planningIntent}>
                      <PlannerHandoff
                        embedded
                        locale={locale}
                        match={routeMatch}
                        journey={routeJourney ?? undefined}
                        serviceInterest={handoffServiceInterest}
                        starterIntent={
                          planningIntent === "conversation"
                            ? planningStarterIntent
                            : null
                        }
                        starterNote={
                          planningIntent === "conversation"
                            ? planningStarterNote
                            : null
                        }
                        serviceContextRevision={serviceContextRevision}
                        routeState={
                          plannerStatus === "result"
                            ? "current"
                            : "editing"
                        }
                        onDirtyChange={setHandoffDirty}
                        onStatusChange={setHandoffStatus}
                      />
                    </div>
                  ) : undefined
                }
                onRouteCleared={handleRouteCleared}
                onRouteFound={handleRouteFound}
                onStatusChange={setPlannerStatus}
              />
            </div>
          </div>
        </section>

        <section
          className={`${styles.faqSection} ${showcaseStyles.faqSection}`}
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className={styles.faqIntro}>
            <p className={styles.eyebrowDark}>{copy.faq.eyebrow}</p>
            <h2 id="faq-title" tabIndex={-1}>
              {copy.faq.title}
            </h2>
            {copy.faq.intro && <p>{copy.faq.intro}</p>}
          </div>
          <div className={styles.faqList}>
            {copy.faq.items.slice(0, 3).map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

      </main>

      <HomegroundFooter
        destinationHubItems={destinationHubItems}
        locale={locale}
        variant="homepage"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(identitySchema) }} />
    </div>
  );
}
