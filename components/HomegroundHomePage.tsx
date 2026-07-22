"use client";

import { useCallback, useEffect, useState } from "react";
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
import styles from "./HomegroundHomePage.module.css";

const handledIcons = [TrainFront, BedDouble, Tickets, FileCheck2] as const;

const planningServicePaths = [
  {
    service: getRouteServiceInterest("itinerary-review")!,
    number: "01",
    startingPoint: "I already have a usable day-by-day route.",
    summary:
      "We test the route for pressure points, fragile transfers and hotel moves, then show what to keep, move or remove.",
    href: "/china-itinerary-review/#review-my-route",
    cta: "See what the route review includes",
  },
  {
    service: getRouteServiceInterest("route-build")!,
    number: "02",
    startingPoint: "I have dates and priorities, but no usable route.",
    summary:
      "We turn your cities, nights and constraints into a workable order, night allocation and day skeleton.",
    href: "/china-itinerary-review/#build-my-route",
    cta: "See what the route build includes",
  },
  {
    service: getRouteServiceInterest("full-trip-support")!,
    number: "03",
    startingPoint:
      "I want planning carried into selected arrangements or local coordination.",
    summary:
      "We define a written scope around the actual trip, including only the planning, coordination or local support you want us to handle.",
    href: "/china-itinerary-review/#full-trip-support",
    cta: "See how full-trip support works",
  },
] as const;

function resolveFinalCta(
  copy: HomegroundCopy,
  plannerStatus: PlannerStatus,
  handoffStatus: HandoffStatus,
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
  const [routeServiceInterest, setRouteServiceInterest] =
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
    plannerStatus === "result" && routeMatch
      ? "#planner-handoff"
      : "#route-finder";
  const plannerCta = resolvePlannerCta(
    copy,
    plannerStatus,
    handoffStatus,
  );
  const finalCta = resolveFinalCta(
    copy,
    plannerStatus,
    handoffStatus,
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
  const activeRouteServiceInterest = routeServiceInterest;

  useEffect(() => {
    const syncRouteServiceInterest = () => {
      const serviceId = new URL(window.location.href).searchParams.get(
        routeServiceQueryKey,
      );
      setRouteServiceInterest(getRouteServiceInterest(serviceId, locale));
    };

    syncRouteServiceInterest();
    window.addEventListener("popstate", syncRouteServiceInterest);
    return () =>
      window.removeEventListener("popstate", syncRouteServiceInterest);
  }, [locale]);

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
  }, [locale]);

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
                serviceInterest={activeRouteServiceInterest}
                interactionLocked={routeInteractionLocked}
                contactDraftDirty={handoffDirty}
                handoff={
                  routeMatch ? (
                    <PlannerHandoff
                      embedded
                      locale={locale}
                      match={routeMatch}
                      journey={routeJourney ?? undefined}
                      serviceInterest={activeRouteServiceInterest}
                      routeState={
                        plannerStatus === "result"
                          ? "current"
                          : "editing"
                      }
                      onDirtyChange={setHandoffDirty}
                      onStatusChange={setHandoffStatus}
                    />
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

        {locale === "en" && (
          <section
            className={styles.servicePathways}
            id="planning-services"
            aria-labelledby="planning-services-title"
          >
            <div className={styles.servicePathwaysIntro}>
              <div>
                <p className={styles.eyebrow}>Ways to work with Homeground</p>
                <h2 id="planning-services-title">
                  Choose the part of the trip you want us to solve.
                </h2>
              </div>
              <p>
                You can use the free wishlist check without contacting us. When
                you want human planning, start with the option closest to what
                you already have.
              </p>
            </div>

            <div className={styles.servicePathwayGrid}>
              {planningServicePaths.map(
                ({ service, number, startingPoint, summary, href, cta }) => (
                  <article className={styles.servicePathwayCard} key={service.id}>
                    <a href={href}>
                      <span className={styles.servicePathwayNumber} aria-hidden="true">
                        {number}
                      </span>
                      <span className={styles.servicePathwayStartingPoint}>
                        {startingPoint}
                      </span>
                      <h3>{service.label}</h3>
                      <p>{summary}</p>
                      <span className={styles.servicePathwayFooter}>
                        <strong>
                          {service.priceLabel}
                          {service.id === "full-trip-support" ? "" : " per trip"}
                        </strong>
                        <span>
                          {cta}
                          <ArrowRight aria-hidden="true" size={17} />
                        </span>
                      </span>
                    </a>
                  </article>
                ),
              )}
            </div>

            <p className={styles.servicePathwaysScope}>
              US$69 and US$129 cover the standard scope: up to 10 travel days,
              4 overnight bases and one shared route for 1–4 travellers.
              Full-trip support is quoted separately.
            </p>
          </section>
        )}

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
