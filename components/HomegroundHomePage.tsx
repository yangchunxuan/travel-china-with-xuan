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
import type { RouteMatch } from "../lib/routeFinder";
import {
  HomegroundHeader,
  resolvePlannerCta,
} from "./HomegroundHeader";
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
  const [routeMatch, setRouteMatch] = useState<RouteMatch | null>(null);
  const [routeJourney, setRouteJourney] = useState<RouteJourney | null>(null);
  const [handoffStatus, setHandoffStatus] =
    useState<HandoffStatus>("disabled");
  const [handoffDirty, setHandoffDirty] = useState(false);
  const copy = getHomegroundCopy(locale);
  const privacyPath =
    locale === "en" ? "/privacy/" : `${copy.path}privacy/`;
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
    name: "Homeground China",
    url: "https://homegroundchina.com/",
    description: copy.schemaDescription,
    inLanguage: copy.htmlLang,
  };
  const routeInteractionLocked =
    handoffStatus === "submitting" || handoffStatus === "uncertain";

  const handleRouteFound = useCallback(
    (match: RouteMatch, journey: RouteJourney) => {
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
  }, [locale, plannerStatus]);

  return (
    <div
      className={styles.localeRoot}
      lang={copy.htmlLang}
      data-homeground-locale={locale}
    >
      <a className={styles.skipLink} href="#main-content">
        {copy.skipLink}
      </a>
      <HomegroundHeader
        locale={locale}
        plannerStatus={plannerStatus}
        handoffStatus={handoffStatus}
        handoffDirty={handoffDirty}
      />

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="home-hero-title">
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
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1 id="home-hero-title">{copy.hero.title}</h1>
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
            </div>

            <div className={styles.heroPlanner}>
              <RouteFinder
                id="route-finder"
                locale={locale}
                variant="hero"
                interactionLocked={routeInteractionLocked}
                handoff={
                  routeMatch ? (
                    <PlannerHandoff
                      embedded
                      locale={locale}
                      match={routeMatch}
                      journey={routeJourney ?? undefined}
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
            <h2 id="planning-proof-title">{copy.proof.title}</h2>
            <p>{copy.proof.intro}</p>
          </div>

          <div className={styles.proofBoard}>
            <article className={styles.sampleRoute} aria-labelledby="sample-route-title">
              <div className={styles.sampleRouteImage}>
                <img
                  src="/images/home/hangzhou-1600.jpg"
                  alt={copy.proof.imageAlt}
                  width="1600"
                  height="1066"
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

              <div className={styles.routeNote}>
                <FileCheck2 aria-hidden="true" size={19} />
                <p>
                  <strong>{copy.proof.pointLabel}</strong>{" "}
                  {copy.proof.point}
                </p>
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

        <section className={styles.studioSection} id="studio" aria-labelledby="studio-title">
          <div className={styles.studioIntro}>
            <p className={styles.eyebrow}>{copy.studio.eyebrow}</p>
            <h2 id="studio-title">{copy.studio.title}</h2>
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

          <a className={styles.textCta} href={plannerTarget}>
            {plannerCta} <ArrowRight aria-hidden="true" size={18} />
          </a>
        </section>

        <section className={styles.faqSection} id="faq" aria-labelledby="faq-title">
          <div className={styles.faqIntro}>
            <p className={styles.eyebrowDark}>{copy.faq.eyebrow}</p>
            <h2 id="faq-title">{copy.faq.title}</h2>
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
          <a href={plannerTarget}>{plannerCta} <ArrowRight aria-hidden="true" size={18} /></a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div>
            <strong lang="en">Homeground</strong>
            <span>{copy.footer.studioLabel}</span>
          </div>
          <nav aria-label={copy.navigation.footerLabel}>
            <a href="#planning-proof">{copy.navigation.planning}</a>
            <a href="#studio">{copy.navigation.studio}</a>
            <a href="#faq">{copy.navigation.faq}</a>
            <a href={privacyPath}>{copy.footer.privacy}</a>
          </nav>
        </div>
        <p className={styles.footerNote}>
          {copy.footer.copyright(new Date().getFullYear())}
        </p>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </div>
  );
}
