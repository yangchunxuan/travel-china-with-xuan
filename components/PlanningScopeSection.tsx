"use client";

import { useEffect, useRef, useState } from "react";

import { getPlanningScopeCopy } from "../lib/homegroundPlanningScopeI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { handleHomegroundHashClick } from "../lib/homegroundNavigation";
import styles from "./PlanningScopeSection.module.css";

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
};

function SoftBreaks({ line }: { line: string }) {
  const parts = line.split("|");

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${index}-${part}`}>
          {part}
          {index < parts.length - 1 ? <wbr /> : null}
        </span>
      ))}
    </>
  );
}

/**
 * Homepage section three: the value of planning one China trip as a whole.
 *
 * The ambient film supplies atmosphere; the heading, three outcomes and contact
 * action carry the service message. There is no case study or secondary offer
 * competing with the whole-trip proposition.
 */
export function PlanningScopeSection({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getPlanningScopeCopy(locale);
  const visualRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoInViewRef = useRef(false);
  const [videoSourcesEnabled, setVideoSourcesEnabled] = useState(false);
  const [videoHasPlayed, setVideoHasPlayed] = useState(false);

  useEffect(() => {
    const visual = visualRef.current;
    const video = videoRef.current;
    if (!visual || !video) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const connection = (navigator as NavigatorWithConnection).connection;
    const slowConnection =
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (
      connection?.saveData ||
      slowConnection ||
      typeof window.IntersectionObserver !== "function"
    ) {
      return;
    }

    let loadObserver: IntersectionObserver | null = null;
    let playbackObserver: IntersectionObserver | null = null;

    const disconnectObservers = () => {
      loadObserver?.disconnect();
      playbackObserver?.disconnect();
      loadObserver = null;
      playbackObserver = null;
    };

    const startObservers = () => {
      if (motionPreference.matches || playbackObserver) return;

      loadObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          setVideoSourcesEnabled(true);
          loadObserver?.disconnect();
          loadObserver = null;
        },
        { rootMargin: "400px 0px" },
      );
      playbackObserver = new IntersectionObserver(
        ([entry]) => {
          const shouldPlay = Boolean(
            entry?.isIntersecting && entry.intersectionRatio >= 0.12,
          );
          videoInViewRef.current = shouldPlay;

          if (!shouldPlay) {
            video.pause();
            return;
          }

          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            void video.play().catch(() => undefined);
          }
        },
        { threshold: [0, 0.12] },
      );

      loadObserver.observe(visual);
      playbackObserver.observe(visual);
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        disconnectObservers();
        videoInViewRef.current = false;
        video.pause();
        setVideoHasPlayed(false);
        return;
      }

      startObservers();
    };

    if (typeof motionPreference.addEventListener === "function") {
      motionPreference.addEventListener("change", handleMotionPreference);
    } else {
      motionPreference.addListener(handleMotionPreference);
    }
    startObservers();

    return () => {
      if (typeof motionPreference.removeEventListener === "function") {
        motionPreference.removeEventListener("change", handleMotionPreference);
      } else {
        motionPreference.removeListener(handleMotionPreference);
      }
      disconnectObservers();
      video.pause();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!videoSourcesEnabled || !video) return;

    video.load();
    if (videoInViewRef.current) {
      void video.play().catch(() => undefined);
    }
  }, [videoSourcesEnabled]);

  return (
    <section
      aria-labelledby="planning-proof-title"
      className={styles.scope}
      data-homeground-locale={locale}
      id="planning-proof"
      lang={copy.htmlLang}
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2 id="planning-proof-title" tabIndex={-1}>
            {copy.titleLines.map((line, index) => (
              <span className={styles.titleLine} key={`${index}-${line}`}>
                <SoftBreaks line={line} />
              </span>
            ))}
          </h2>
          <p>{copy.body}</p>
        </header>

        <div className={styles.visual} ref={visualRef}>
          <video
            aria-hidden="true"
            className={styles.video}
            disablePictureInPicture
            disableRemotePlayback
            loop
            muted
            onCanPlay={(event) => {
              if (videoInViewRef.current) {
                void event.currentTarget.play().catch(() => undefined);
              } else {
                event.currentTarget.pause();
              }
            }}
            onError={() => setVideoHasPlayed(false)}
            onPlay={(event) => {
              if (!videoInViewRef.current) {
                event.currentTarget.pause();
              }
            }}
            onPlaying={() => setVideoHasPlayed(true)}
            playsInline
            preload="none"
            ref={videoRef}
            tabIndex={-1}
          >
            {videoSourcesEnabled ? (
              <>
                <source
                  media="(max-width: 680px)"
                  src="/videos/home/planning-scope-garden-mobile.mp4"
                  type="video/mp4"
                />
                <source
                  src="/videos/home/planning-scope-garden-desktop.mp4"
                  type="video/mp4"
                />
              </>
            ) : null}
          </video>
          <picture
            aria-hidden="true"
            className={`${styles.poster} ${
              videoHasPlayed ? styles.posterHidden : ""
            }`}
          >
            <source
              media="(max-width: 680px)"
              srcSet="/images/home/planning-scope-garden-mobile.jpg"
            />
            <img
              alt=""
              className={styles.image}
              decoding="async"
              height="640"
              loading="lazy"
              src="/images/home/planning-scope-garden-desktop.jpg"
              width="1600"
            />
          </picture>
        </div>

        <div className={styles.outcomes}>
          <ul className={styles.values}>
            {copy.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>

          <a
            className={styles.cta}
            href="#planner-contact"
            onClick={(event) =>
              handleHomegroundHashClick(event, "#planner-contact")
            }
          >
            <span>{copy.cta}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
