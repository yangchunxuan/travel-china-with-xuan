"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlanningScopeSection } from "../../../components/PlanningScopeSection";
import {
  homegroundLocales,
  type HomegroundLocale,
} from "../../../lib/homegroundI18n";
import { getPlanningScopeCopy } from "../../../lib/homegroundPlanningScopeI18n";
import styles from "./PlanningScopeLab.module.css";

const localeLabels: Record<HomegroundLocale, string> = {
  en: "English",
  zh: "中文",
  ko: "한국어",
};

const viewports = [
  { id: "320", label: "320 phone", width: 320 },
  { id: "390", label: "390 phone", width: 390 },
  { id: "768", label: "768 tablet", width: 768 },
  { id: "1280", label: "1280 desktop", width: 1280 },
  { id: "fluid", label: "This window", width: 0 },
] as const;

type ViewportId = (typeof viewports)[number]["id"];

function DeviceFrame({
  locale,
  width,
}: {
  locale: HomegroundLocale;
  width: number;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(900);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const fit = () => {
      const available = wrapper.clientWidth;
      setScale(available > 0 && available < width ? available / width : 1);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [width]);

  const innerObserverRef = useRef<ResizeObserver | null>(null);

  const measure = useCallback(() => {
    const inner = frameRef.current?.contentDocument;
    if (!inner?.body) return;
    setHeight(Math.max(inner.body.scrollHeight, 400));
  }, []);

  const handleLoad = useCallback(() => {
    measure();
    const inner = frameRef.current?.contentDocument;
    if (!inner?.body) return;
    innerObserverRef.current?.disconnect();
    const observer = new ResizeObserver(measure);
    observer.observe(inner.body);
    innerObserverRef.current = observer;
  }, [measure]);

  useEffect(() => () => innerObserverRef.current?.disconnect(), []);

  return (
    <div className={styles.frameWrapper} ref={wrapperRef}>
      <div
        className={styles.frameScaler}
        style={{
          height: `${height * scale}px`,
          width: `${width * scale}px`,
        }}
      >
        <iframe
          className={styles.frame}
          onLoad={handleLoad}
          ref={frameRef}
          src={`/planning-scope-lab/section/${locale}/`}
          style={{
            height: `${height}px`,
            transform: `scale(${scale})`,
            width: `${width}px`,
          }}
          title={`Section three, ${localeLabels[locale]}, ${width}px wide`}
        />
      </div>
    </div>
  );
}

export function PlanningScopeLab() {
  const [locale, setLocale] = useState<HomegroundLocale>("zh");
  const [viewport, setViewport] = useState<ViewportId>("fluid");
  const active = viewports.find((entry) => entry.id === viewport) ?? viewports[4];
  const copy = getPlanningScopeCopy(locale);

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
  }, [copy.htmlLang]);

  return (
    <div className={styles.lab}>
      <header className={styles.labHeader}>
        <p className={styles.labKicker}>Local review only · not published</p>
        <h1 className={styles.labTitle}>
          Homepage section three — scope of help
        </h1>
        <p className={styles.labConcept}>
          <strong>Concept: one choice, one proof, one boundary.</strong> The
          section opens with the two ways to work together set side by side
          under a single black rule, so the choice is read as structure rather
          than prose. One Hangzhou arrival day then shows what a planner
          actually weighs, and a closing line states that scope, fee and
          responsibility are agreed before any paid work. Everything already
          booked stays booked.
        </p>
      </header>

      <div className={styles.controls}>
        <div
          aria-label="Language"
          className={styles.controlGroup}
          role="group"
        >
          <span className={styles.controlLabel}>Language</span>
          {homegroundLocales.map((entry) => (
            <button
              aria-pressed={locale === entry}
              className={styles.controlButton}
              key={entry}
              onClick={() => setLocale(entry)}
              type="button"
            >
              {localeLabels[entry]}
            </button>
          ))}
        </div>

        <div aria-label="Width" className={styles.controlGroup} role="group">
          <span className={styles.controlLabel}>Width</span>
          {viewports.map((entry) => (
            <button
              aria-pressed={viewport === entry.id}
              className={styles.controlButton}
              key={entry.id}
              onClick={() => setViewport(entry.id)}
              type="button"
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.links}>
        <a href={`/planning-scope-lab/section/${locale}/`}>
          Open this section on its own ↗
        </a>
        <a
          href={
            locale === "en" ? "/#planning-proof" : `/${locale}/#planning-proof`
          }
        >
          AFTER — the homepage with this section in place ↗
        </a>
        <a href={`/planning-scope-lab/full/${locale}/`}>
          BEFORE — the homepage with the previous section ↗
        </a>
      </div>

      <div className={styles.stage}>
        {active.width === 0 ? (
          <PlanningScopeSection key={locale} locale={locale} />
        ) : (
          <DeviceFrame
            key={`${locale}-${active.width}`}
            locale={locale}
            width={active.width}
          />
        )}
      </div>
    </div>
  );
}
