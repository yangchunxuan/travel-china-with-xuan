"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  getGuideSearchCopy,
  getGuideSearchIndexPath,
} from "../lib/guideSearchI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import type { HomepageSearchDemo } from "../lib/homepageEditorial";
import { GuideSearchForm } from "./GuideSearchForm";
import styles from "./HomepageGuideSearch.module.css";

export function HomepageGuideSearch({
  demos,
  locale,
}: {
  demos: readonly HomepageSearchDemo[];
  locale: HomegroundLocale;
}) {
  const copy = getGuideSearchCopy(locale);
  const finderRef = useRef<HTMLElement>(null);
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(true);
  const activeDemo = demos[activeDemoIndex] ?? demos[0];

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(motionQuery.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotionPreference();
    updateVisibility();
    motionQuery.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);

    const finder = finderRef.current;
    const observer = finder
      ? new IntersectionObserver(
          ([entry]) => setInView(Boolean(entry?.isIntersecting)),
          { rootMargin: "200px 0px" },
        )
      : null;
    if (finder && observer) observer.observe(finder);

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      demos.length < 2 ||
      reduceMotion ||
      engaged ||
      hovered ||
      !inView ||
      !pageVisible ||
      activeDemoIndex >= demos.length - 1
    ) {
      return;
    }

    const timeout = window.setTimeout(
      () =>
        setActiveDemoIndex((current) =>
          Math.min(current + 1, demos.length - 1),
        ),
      4500,
    );
    return () => window.clearTimeout(timeout);
  }, [
    activeDemoIndex,
    demos.length,
    engaged,
    hovered,
    inView,
    pageVisible,
    reduceMotion,
  ]);

  return (
    <section
      className={styles.finder}
      aria-labelledby="homepage-guide-search-title"
      id="homepage-guide-search"
      ref={finderRef}
      onFocusCapture={() => setEngaged(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="homepage-guide-search-title">{copy.title}</h2>
        <p className={styles.body}>{copy.introduction}</p>
      </div>
      <div className={styles.formArea}>
        <GuideSearchForm
          documentsUrl={getGuideSearchIndexPath(locale)}
          locale={locale}
          surface="homepage"
        />
      </div>
      {activeDemo ? (
        <div className={styles.demo} aria-hidden="true">
          <div
            className={styles.demoQuestion}
            key={`question-${activeDemoIndex}`}
          >
            <span>{copy.demoEyebrow}</span>
            <strong>{activeDemo.query}</strong>
          </div>
          <ol className={styles.demoResults} key={`results-${activeDemoIndex}`}>
            {activeDemo.results.map((result, index) => (
              <li
                key={result.id}
                style={{ "--demo-index": index } as CSSProperties}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{result.title}</strong>
                <small>{result.label}</small>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
