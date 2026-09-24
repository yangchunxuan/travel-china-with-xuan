"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { HomegroundStudioCopy } from "../lib/homegroundStudioI18n";
import { RollingNumber } from "./motion/RollingNumber";
import { KeepWords } from "./text/KeepWords";
import styles from "./HomegroundStudioPage.module.css";

const overviewStageIds = ["inputs", "steps", "deliverables"] as const;
const AUTOPLAY_MS = 3600;

/**
 * The planning thread as an interactive timeline, after the Colossus
 * timeline on x.ai: a 2px rail with a filled progress line, a dot per
 * stage (the current one larger), a rolling stage counter and the stage
 * text cross-fading below. Every stage is server-rendered in the list, so
 * search engines and screen readers read all four; the visual only shows
 * one at a time. Once on screen it plays through the four stages one time
 * and stops on the last; resting the pointer on it pauses, and a click or
 * keyboard focus hands control to the reader. No autoplay for reduced motion. Without JavaScript the
 * noscript style shows the full list.
 */
export function StudioPlanThread({
  locale,
  overview,
}: {
  locale: "en" | "zh" | "ko";
  overview: HomegroundStudioCopy["overview"];
}) {
  const stageCount = overview.stages.length + 1;
  const labels = [...overview.stages.map((stage) => stage.label), overview.termsLabel];
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplayRef.current = false;
      return;
    }
    let timer = 0;
    let visible = false;
    let paused = false;
    const clear = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const stop = () => {
      autoplayRef.current = false;
      clear();
    };
    const start = () => {
      if (!autoplayRef.current || timer || paused || !visible) return;
      timer = window.setInterval(() => {
        setActive((current) => {
          if (current >= stageCount - 1) {
            stop();
            return current;
          }
          const next = current + 1;
          if (next >= stageCount - 1) stop();
          return next;
        });
      }, AUTOPLAY_MS);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) start();
        else clear();
      },
      { threshold: 0.45 },
    );
    // Resting the pointer on the timeline pauses it; keyboard focus or a
    // click hands control to the reader for good.
    const pause = () => {
      paused = true;
      clear();
    };
    const resume = () => {
      paused = false;
      start();
    };
    observer.observe(root);
    root.addEventListener("pointerenter", pause);
    root.addEventListener("pointerleave", resume);
    root.addEventListener("focusin", stop);
    return () => {
      observer.disconnect();
      clear();
      root.removeEventListener("pointerenter", pause);
      root.removeEventListener("pointerleave", resume);
      root.removeEventListener("focusin", stop);
    };
  }, [stageCount]);

  const choose = (index: number) => {
    autoplayRef.current = false;
    setActive(index);
  };

  return (
    <section
      aria-labelledby="planning-overview-title"
      className={styles.planOverview}
      ref={rootRef}
      style={{ "--thread-progress": active / (stageCount - 1) } as CSSProperties}
    >
      <noscript>
        <style>{`.${styles.overviewList} > li { opacity: 1 !important; grid-area: auto !important; pointer-events: auto !important; position: static !important; translate: none !important; }
.${styles.overviewList} { display: grid !important; gap: 2rem !important; }
.${styles.threadTrack}, .${styles.threadCounter} { display: none !important; }`}</style>
      </noscript>

      <div className={styles.threadHead}>
        <h2 id="planning-overview-title">
          <KeepWords locale={locale} text={overview.title} />
        </h2>
        <p aria-hidden="true" className={styles.threadCounter}>
          <RollingNumber value={String(active + 1).padStart(2, "0")} />
          <span>/ {String(stageCount).padStart(2, "0")}</span>
        </p>
      </div>

      <div className={styles.threadTrack}>
        <span aria-hidden="true" className={styles.threadRail} />
        <span aria-hidden="true" className={styles.threadFill} />
        {labels.map((label, index) => (
          <button
            aria-label={label}
            aria-pressed={index === active}
            className={styles.threadNode}
            data-passed={index < active ? "true" : undefined}
            key={label}
            onClick={() => choose(index)}
            style={{ "--node": index / (stageCount - 1) } as CSSProperties}
            type="button"
          >
            <span aria-hidden="true" className={styles.threadDot} />
            <span className={styles.threadLabel}>{label}</span>
          </button>
        ))}
      </div>

      <ol className={styles.overviewList}>
        {overview.stages.map((stage, index) => (
          <li
            data-current={index === active ? "true" : undefined}
            data-plan-stage={overviewStageIds[index]}
            key={stage.label}
          >
            <p>{stage.label}</p>
            <div>
              <h3><KeepWords locale={locale} text={stage.title} /></h3>
              <p>{stage.detail}</p>
            </div>
          </li>
        ))}
        <li
          className={styles.termsStage}
          data-current={active === stageCount - 1 ? "true" : undefined}
          data-plan-stage="terms"
        >
          <p>{overview.termsLabel}</p>
          <div>
            <h3><KeepWords locale={locale} text={overview.termsTitle} /></h3>
            <dl className={styles.termsList}>
              {overview.terms.map((term) => (
                <div key={term.label}>
                  <dt>{term.label}</dt>
                  <dd>{term.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </li>
      </ol>
    </section>
  );
}
