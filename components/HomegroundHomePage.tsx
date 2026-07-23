"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BedDouble,
  Check,
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
import { getGuideEntry } from "../lib/guideRegistry";
import { getZhangjiajieGuideCopy } from "../lib/zhangjiajieGuideI18n";
import type { DestinationPlan } from "../lib/destinationPlanner";
import {
  getRouteServiceInterest,
  routeServiceQueryKey,
  type RouteServiceInterest,
} from "../lib/routeServiceInterest";
import {
  type HomepagePlanningIntentId,
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
  const planningIntentRef = useRef<HomepagePlanningIntentId | null>(null);
  const [serviceContextRevision, setServiceContextRevision] = useState(0);
  const [retainedRouteServiceInterest, setRetainedRouteServiceInterest] =
    useState<RouteServiceInterest | null>(null);
  const copy = getHomegroundCopy(locale);
  const featuredGuide = getGuideEntry("zhangjiajie-itinerary", locale);
  const wholeRouteGuide = getGuideEntry(
    "beijing-zhangjiajie-shanghai-10-days",
    locale,
  );
  const nightShowGuide = getGuideEntry("best-zhangjiajie-night-show", locale);
  const zhangjiajieGuideCopy = getZhangjiajieGuideCopy(locale);
  const planningGuides = [
    {
      guide: featuredGuide,
      label: copy.guides.cityStayLabel,
      duration: copy.guides.cityStayDuration,
      number: "01",
      imagePath: "/images/guides/zhangjiajie/tianmen-1200.jpg",
      imageAlt: zhangjiajieGuideCopy.figures.tianmen.alt,
      imageWidth: 1200,
      imageHeight: 780,
    },
    {
      guide: wholeRouteGuide,
      label: copy.guides.wholeRouteLabel,
      duration: copy.guides.wholeRouteDuration,
      number: "02",
      imagePath: wholeRouteGuide.heroImagePath,
      imageAlt: wholeRouteGuide.heroAlt,
      imageWidth: 1800,
      imageHeight: 1200,
    },
    {
      guide: nightShowGuide,
      label: copy.guides.eveningChoiceLabel,
      duration: copy.guides.eveningChoiceDuration,
      number: "03",
      imagePath: nightShowGuide.heroImagePath,
      imageAlt: nightShowGuide.heroAlt,
      imageWidth: 1536,
      imageHeight: 1024,
    },
  ] as const;
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
    planningIntent && planningIntent !== "explore"
      ? getRouteServiceInterest(planningIntent, locale)
      : null;
  const handoffServiceInterest =
    activeRouteServiceInterest ?? retainedRouteServiceInterest;

  useEffect(() => {
    planningIntentRef.current = planningIntent;
  }, [planningIntent]);

  useEffect(() => {
    if (planningIntent && planningIntent !== "explore") {
      setRetainedRouteServiceInterest(
        getRouteServiceInterest(planningIntent, locale),
      );
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
        if (planningIntentRef.current === "explore") {
          url.searchParams.delete(routeServiceQueryKey);
        } else {
          url.searchParams.set(
            routeServiceQueryKey,
            planningIntentRef.current,
          );
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
        try {
          window.sessionStorage.removeItem(planningIntentStorageKey);
        } catch {
          // URL deep links remain sufficient when storage is unavailable.
        }
        return;
      }

      if (hasServiceQuery) {
        planningIntentRef.current = null;
        setPlanningIntent(null);
        url.searchParams.delete(routeServiceQueryKey);
        window.history.replaceState(
          window.history.state,
          "",
          `${url.pathname}${url.search}${url.hash}`,
        );
        window.dispatchEvent(new Event("homeground:locationchange"));
        try {
          window.sessionStorage.removeItem(planningIntentStorageKey);
        } catch {
          // Invalid service URLs still fall back to the visible chooser.
        }
        return;
      }

      try {
        const storedIntent = window.sessionStorage.getItem(
          planningIntentStorageKey,
        );
        const canRestoreFreeFlow =
          url.searchParams.has("planner") && storedIntent === "explore";
        planningIntentRef.current = canRestoreFreeFlow ? "explore" : null;
        setPlanningIntent(planningIntentRef.current);
        if (!canRestoreFreeFlow) {
          window.sessionStorage.removeItem(planningIntentStorageKey);
        }
      } catch {
        planningIntentRef.current = null;
        setPlanningIntent(null);
      }
    };

    syncPlanningIntent();
    window.addEventListener("popstate", syncPlanningIntent);
    return () =>
      window.removeEventListener("popstate", syncPlanningIntent);
  }, [locale]);

  const handlePlanningIntentChange = useCallback(
    (nextIntent: HomepagePlanningIntentId) => {
      if (
        planningIntentRef.current &&
        planningIntentRef.current !== nextIntent
      ) {
        setServiceContextRevision((revision) => revision + 1);
      }
      planningIntentRef.current = nextIntent;
      setPlanningIntent(nextIntent);
      const url = new URL(window.location.href);
      if (nextIntent === "explore") {
        url.searchParams.delete(routeServiceQueryKey);
      } else {
        url.searchParams.set(routeServiceQueryKey, nextIntent);
      }
      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
      window.dispatchEvent(new Event("homeground:locationchange"));

      try {
        if (nextIntent === "explore") {
          window.sessionStorage.setItem(
            planningIntentStorageKey,
            nextIntent,
          );
        } else {
          window.sessionStorage.removeItem(planningIntentStorageKey);
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
        handoffDirty={handoffDirty}
        freeResult={freeResult}
      />

      <main id="main-content" tabIndex={-1}>
        <section
          className={`${styles.hero} ${
            plannerStatus === "result" ? styles.heroResult : ""
          }`}
          aria-labelledby="home-hero-title"
        >
          <picture className={styles.heroPicture}>
            <source media="(max-width: 700px)" srcSet="/images/home/beijing-hero-1200.jpg" />
            <img
              src="/images/home/beijing-hero-2400.jpg"
              alt={copy.hero.imageAlt}
              width="2400"
              height="1600"
              fetchPriority="high"
            />
          </picture>
          <div className={styles.heroShade} aria-hidden="true" />

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              {plannerStatus !== "result" && (
                <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              )}
              <h1 id="home-hero-title">{copy.hero.title}</h1>
              {plannerStatus !== "result" && (
                <>
                  <p className={styles.heroLead}>{copy.hero.lead}</p>
                  <ul
                    className={styles.heroTrust}
                    aria-label={copy.hero.trustLabel}
                  >
                    {copy.hero.trust.map((item) => (
                      <li key={item}>
                        <Check aria-hidden="true" size={17} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className={styles.heroPlanner}>
              <RouteFinder
                id="route-finder"
                locale={locale}
                variant="hero"
                planningIntent={planningIntent}
                onPlanningIntentChange={handlePlanningIntentChange}
                serviceInterest={activeRouteServiceInterest}
                interactionLocked={routeInteractionLocked}
                contactDraftDirty={handoffDirty}
                handoff={
                  routeMatch ? (
                    <>
                      {handoffServiceInterest && (
                        <div hidden={!activeRouteServiceInterest}>
                          <PlannerHandoff
                            embedded
                            locale={locale}
                            match={routeMatch}
                            journey={routeJourney ?? undefined}
                            serviceInterest={handoffServiceInterest}
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
                      )}
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
          <p className={styles.photoCaption}>{copy.hero.caption}</p>
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
            className={styles.planningGuides}
            aria-labelledby="planning-guides-title"
          >
            <div className={styles.planningGuidesIntro}>
              <p className={styles.cardLabel}>{copy.guides.eyebrow}</p>
              <h3 id="planning-guides-title">{copy.guides.title}</h3>
            </div>
            <div className={styles.planningGuideList}>
              {planningGuides.map(
                ({
                  guide,
                  label,
                  duration,
                  number,
                  imagePath,
                  imageAlt,
                  imageWidth,
                  imageHeight,
                }) => (
                  <a
                    className={styles.planningGuideCard}
                    href={guide.canonicalPath}
                    key={guide.id}
                  >
                    <span className={styles.planningGuideImage}>
                      <img
                        src={imagePath}
                        alt={imageAlt}
                        width={imageWidth}
                        height={imageHeight}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span
                      className={styles.planningGuideNumber}
                      aria-hidden="true"
                    >
                      {number}
                    </span>
                    <span className={styles.planningGuideContent}>
                      <span className={styles.planningGuideMeta}>
                        <span className={styles.planningGuideLabel}>
                          {label}
                        </span>
                        <span>{duration}</span>
                      </span>
                      <strong className={styles.planningGuideTitle}>
                        {guide.headline}
                      </strong>
                      <span className={styles.planningGuideCta}>
                        {guide.featuredLinkLabel}
                        <ArrowRight aria-hidden="true" size={17} />
                      </span>
                    </span>
                  </a>
                ),
              )}
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
