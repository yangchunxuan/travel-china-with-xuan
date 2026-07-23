"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BedDouble,
  FileCheck2,
  MapPinned,
  Tickets,
  TrainFront,
} from "lucide-react";
import {
  getHomegroundCopy,
  type HomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { getHomeFeaturedGuides } from "../lib/guideRegistry";
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
import {
  HomegroundHeader,
  resolvePlannerCta,
} from "./HomegroundHeader";
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
import { HomepagePlanningUpgrade } from "./HomepagePlanningDesk";
import styles from "./HomegroundHomePage.module.css";

const handledIcons = [TrainFront, BedDouble, Tickets, FileCheck2] as const;

const planningIntentStorageKey = "homeground-planning-intent-v1";
const planningStarterIntentStorageKey =
  "homeground-planning-starter-intent-v1";

const guideDateLocales: Record<HomegroundLocale, string> = {
  en: "en-GB",
  zh: "zh-CN",
  ko: "ko-KR",
};

function formatGuideDate(date: string, locale: HomegroundLocale) {
  return new Intl.DateTimeFormat(guideDateLocales[locale], {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

function resolveFinalCta(
  copy: HomegroundCopy,
  plannerStatus: PlannerStatus,
  handoffStatus: HandoffStatus,
  freeResult: boolean,
): { label: string; title: string } {
  if (plannerStatus === "new") {
    return {
      label: copy.finalCta.newLabel,
      title: copy.finalCta.newTitle,
    };
  }
  if (plannerStatus === "in-progress") {
    return {
      label: copy.finalCta.inProgressLabel,
      title: copy.finalCta.inProgressTitle,
    };
  }

  if (freeResult) {
    return {
      label: copy.finalCta.freeResultLabel,
      title: copy.finalCta.freeResultTitle,
    };
  }

  switch (handoffStatus) {
    case "disabled":
      return {
        label: copy.navigation.plannerCta.disabled,
        title: copy.handoff.disabledTitle,
      };
    case "validation-error":
      return {
        label: copy.navigation.plannerCta.validationError,
        title: copy.handoff.errorSummary,
      };
    case "submitting":
      return {
        label: copy.navigation.plannerCta.submitting,
        title: copy.handoff.submitting,
      };
    case "success":
      return {
        label: copy.navigation.plannerCta.success,
        title: copy.handoff.successTitle,
      };
    case "failed":
      return {
        label: copy.navigation.plannerCta.failed,
        title: copy.handoff.failureTitle,
      };
    case "uncertain":
      return {
        label: copy.navigation.plannerCta.uncertain,
        title: copy.handoff.uncertainTitle,
      };
    default:
      return {
        label: copy.finalCta.resultLabel,
        title: copy.finalCta.resultTitle,
      };
  }
}

export function HomegroundHomePage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
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
  const featuredGuides = getHomeFeaturedGuides(locale);
  const guidesIndexPath =
    locale === "en" ? "/guides/" : `/${locale}/guides/`;
  const plannerTarget =
    plannerStatus === "result" &&
    routeMatch &&
    planningIntent !== "explore"
      ? "#planner-handoff"
      : "#route-finder";
  const freeResult =
    plannerStatus === "result" && planningIntent === "explore";
  const plannerCta = resolvePlannerCta(
    copy,
    plannerStatus,
    handoffStatus,
    freeResult,
  );
  const finalCta = resolveFinalCta(
    copy,
    plannerStatus,
    handoffStatus,
    freeResult,
  );
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://homegroundchina.com/#organization",
    name: "Homeground China",
    url: "https://homegroundchina.com/",
    description: copy.schemaDescription,
    inLanguage: copy.htmlLang,
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
          url.searchParams.has("planner") &&
          (storedIntent === "conversation" || storedIntent === "explore");
        planningIntentRef.current = canRestoreNonServiceFlow
          ? storedIntent
          : null;
        setPlanningIntent(planningIntentRef.current);
        setPlanningStarterIntent(
          canRestoreNonServiceFlow &&
            storedIntent === "conversation" &&
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
        if (nextIntent === "explore" || nextIntent === "conversation") {
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

      const analyticsWindow = window as typeof window & {
        dataLayer?: Array<Record<string, unknown>>;
      };
      analyticsWindow.dataLayer ??= [];
      analyticsWindow.dataLayer.push({
        event: "planning_intent_selected",
        planning_intent: nextIntent,
        planning_starter_intent: nextStarterIntent ?? null,
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
      "#route-finder",
      "#planner-handoff",
      "#planning-proof",
      "#studio",
      "#faq",
    ]);
    const hash = window.location.hash;
    if (!allowedHashes.has(hash)) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ block: "start" });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [locale, planningIntent]);

  return (
    <div
      className={styles.localeRoot}
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
        freeResult={freeResult}
      />

      <main id="main-content" tabIndex={-1}>
        <section
          className={`${styles.hero} ${
            plannerStatus === "result" ? styles.heroResult : ""
          }`}
          aria-labelledby="home-hero-title"
        >
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              {plannerStatus !== "result" && (
                <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              )}
              <h1 id="home-hero-title">{copy.hero.title}</h1>
              {plannerStatus !== "result" && (
                <>
                  <p className={styles.heroLead}>{copy.hero.lead}</p>
                  <div className={styles.heroFacts}>
                    <p className={styles.heroFactsLabel}>
                      {copy.hero.trustLabel}
                    </p>
                    <ol
                      className={styles.heroTrust}
                      aria-label={copy.hero.trustLabel}
                    >
                      {copy.hero.trust.map((item, index) => (
                        <li key={item}>
                          <span aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </div>

            <div className={styles.heroPlanner}>
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
                    <>
                      <div
                        hidden={
                          !planningIntent || planningIntent === "explore"
                        }
                      >
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
                      {planningIntent === "explore" && (
                        <HomepagePlanningUpgrade
                          locale={locale}
                          onSelect={handlePlanningIntentChange}
                        />
                      )}
                    </>
                  ) : undefined
                }
                onRouteCleared={handleRouteCleared}
                onRouteFound={handleRouteFound}
                onStatusChange={setPlannerStatus}
              />
            </div>
          </div>
        </section>

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
                  src="/images/home/zhangjiajie-1600.jpg"
                  alt={copy.proof.imageAlt}
                  width="1600"
                  height="954"
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

          <nav
            className={styles.travelGuides}
            aria-labelledby="travel-guides-title"
          >
            <div className={styles.travelGuidesHeader}>
              <div className={styles.travelGuidesIntro}>
                <p className={styles.cardLabel}>{copy.guides.eyebrow}</p>
                <h3 id="travel-guides-title">{copy.guides.title}</h3>
              </div>
              <a className={styles.travelGuidesIndexLink} href={guidesIndexPath}>
                {copy.guides.viewAllLabel}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
            </div>
            <div className={styles.travelGuideGrid}>
              {featuredGuides.map((guide, index) => {
                const typeLabel =
                  guide.type === "field-note"
                    ? copy.guides.typeLabels.fieldNote
                    : copy.guides.typeLabels[guide.type];

                return (
                  <a
                    className={`${styles.travelGuideCard} ${
                      index === 0
                        ? styles.travelGuideLead
                        : styles.travelGuideCompact
                    }`}
                    href={guide.canonicalPath}
                    key={guide.id}
                  >
                    <span className={styles.travelGuideImage}>
                      <img
                        src={guide.heroImagePath}
                        alt={guide.heroAlt}
                        width={guide.imageWidth}
                        height={guide.imageHeight}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className={styles.travelGuideContent}>
                      <span className={styles.travelGuideMeta}>
                        <span>{typeLabel}</span>
                        <time dateTime={guide.dateModified}>
                          {copy.guides.updatedLabel}{" "}
                          {formatGuideDate(guide.dateModified, locale)}
                        </time>
                      </span>
                      <strong className={styles.travelGuideTitle}>
                        {guide.headline}
                      </strong>
                      <span className={styles.travelGuideCta}>
                        {guide.featuredLinkLabel}
                        <ArrowRight aria-hidden="true" size={17} />
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </nav>
        </section>

        <section className={styles.studioSection} id="studio" aria-labelledby="studio-title">
          <div className={styles.studioIntro}>
            <p className={styles.eyebrow}>{copy.studio.eyebrow}</p>
            <h2 id="studio-title" tabIndex={-1}>
              {copy.studio.title}
            </h2>
            <p>{copy.studio.intro}</p>
          </div>

          <ol className={styles.studioRoles}>
            {copy.studio.roles.map((role, index) => (
              <li key={role.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{role.title}</h3>
                  <p>{role.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <a className={styles.studioLink} href={`${copy.path}studio/`}>
            {copy.studio.cta}
            <ArrowRight aria-hidden="true" size={17} />
          </a>

        </section>

        <section className={styles.faqSection} id="faq" aria-labelledby="faq-title">
          <div className={styles.faqIntro}>
            <p className={styles.eyebrowDark}>{copy.faq.eyebrow}</p>
            <h2 id="faq-title" tabIndex={-1}>
              {copy.faq.title}
            </h2>
            <p>{copy.faq.intro}</p>
          </div>
          <div className={styles.faqList}>
            {copy.faq.items.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-cta-title">
          <MapPinned aria-hidden="true" size={32} />
          <div>
            <p className={styles.cardLabel}>
              {finalCta.label}
            </p>
            <h2 id="final-cta-title">{finalCta.title}</h2>
          </div>
          <a
            href={plannerTarget}
            onClick={(event) =>
              handleHomegroundHashClick(event, plannerTarget)
            }
          >
            {plannerCta} <ArrowRight aria-hidden="true" size={18} />
          </a>
        </section>
      </main>

      <HomegroundFooter locale={locale} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </div>
  );
}
