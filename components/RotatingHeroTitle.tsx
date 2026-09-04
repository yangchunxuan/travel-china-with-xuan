"use client";

import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./RotatingHeroTitle.module.css";

const AUTO_STEP_MS = 2000;
const ENTER_PHASE_MS = 760;
const EXIT_PHASE_MS = 560;
const HOLD_PHASE_MS = AUTO_STEP_MS - ENTER_PHASE_MS - EXIT_PHASE_MS;

type AnimationPhase = "entering" | "holding" | "exiting";

type LetterStyle = CSSProperties & {
  "--letter-enter-delay": string;
  "--letter-exit-delay": string;
};

export type RotatingHeroTitleProps = {
  canonicalTitle: string;
  className?: string;
  fixedLines: readonly string[];
  id?: string;
  paused?: boolean;
  phrases: readonly string[];
};

const cjkCharacterPattern =
  /[\u2e80-\u2eff\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u;
const cjkPunctuationPattern = /[\u3000-\u303f]/u;

type PhraseSegment = {
  kind: "space" | "word";
  text: string;
};

function segmentPhrase(phrase: string): PhraseSegment[] {
  const segments: PhraseSegment[] = [];
  let word = "";

  const flushWord = () => {
    if (!word) return;
    segments.push({ kind: "word", text: word });
    word = "";
  };

  for (const character of Array.from(phrase)) {
    if (/\s/u.test(character)) {
      flushWord();
      const previous = segments.at(-1);
      if (previous?.kind === "space") {
        previous.text += character;
      } else {
        segments.push({ kind: "space", text: character });
      }
    } else if (cjkPunctuationPattern.test(character)) {
      flushWord();
      const previous = segments.at(-1);
      if (previous?.kind === "word") {
        previous.text += character;
      } else {
        segments.push({ kind: "word", text: character });
      }
    } else if (cjkCharacterPattern.test(character)) {
      flushWord();
      segments.push({ kind: "word", text: character });
    } else {
      word += character;
    }
  }

  flushWord();
  return segments;
}

function AnimatedPhrase({ phrase }: { phrase: string }) {
  const segments = segmentPhrase(phrase);
  const letterCount = segments.reduce(
    (count, segment) =>
      segment.kind === "word"
        ? count + Array.from(segment.text).length
        : count,
    0,
  );
  let letterIndex = 0;

  return segments.map((segment, segmentIndex) => {
    if (segment.kind === "space") {
      return segment.text;
    }

    return (
      <span className={styles.word} key={`${segment.text}-${segmentIndex}`}>
        {Array.from(segment.text).map((letter) => {
          const currentIndex = letterIndex;
          letterIndex += 1;
          const letterStyle: LetterStyle = {
            "--letter-enter-delay": `${Math.min(currentIndex * 18, 280)}ms`,
            "--letter-exit-delay": `${Math.min(
              (letterCount - currentIndex - 1) * 12,
              200,
            )}ms`,
          };

          return (
            <span
              className={styles.letter}
              key={`${letter}-${currentIndex}`}
              style={letterStyle}
            >
              {letter}
            </span>
          );
        })}
      </span>
    );
  });
}

export function RotatingHeroTitle({
  canonicalTitle,
  className,
  fixedLines,
  id,
  paused = false,
  phrases,
}: RotatingHeroTitleProps) {
  const phraseSignature = JSON.stringify({ fixedLines, phrases });
  const availableFixedLines = useMemo(
    () => fixedLines.map((line) => line.trim()).filter(Boolean),
    [fixedLines],
  );
  const availablePhrases = useMemo(
    () => phrases.map((phrase) => phrase.trim()).filter(Boolean),
    [phrases],
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<AnimationPhase>(() =>
    paused || availablePhrases.length <= 1 ? "holding" : "entering",
  );
  const [documentVisible, setDocumentVisible] = useState(true);
  const [inViewport, setInViewport] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [cycleVersion, setCycleVersion] = useState(0);
  const previousPhraseSignature = useRef(phraseSignature);
  const previousReducedMotion = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentPhraseIndex =
    availablePhrases.length > 0 ? phraseIndex % availablePhrases.length : 0;
  const currentPhrase = availablePhrases[currentPhraseIndex] ?? "";
  const initialTitleSegments = [
    ...availableFixedLines,
    availablePhrases[0] ?? "",
  ].filter(Boolean);
  const segmentJoiner =
    initialTitleSegments.join(" ") === canonicalTitle.trim() ? " " : "";
  const canRotate = availablePhrases.length > 1;
  const effectivePaused =
    paused ||
    !documentVisible ||
    !inViewport ||
    prefersReducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updatePreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () =>
      mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry?.isIntersecting ?? true),
      { threshold: 0.1 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () =>
      setDocumentVisible(document.visibilityState === "visible");

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (previousPhraseSignature.current === phraseSignature) return;
    previousPhraseSignature.current = phraseSignature;
    const shouldRemainStatic =
      prefersReducedMotion || availablePhrases.length <= 1;
    setPhraseIndex(0);
    setPhase(shouldRemainStatic ? "holding" : "entering");
    setCycleVersion((version) => version + 1);
  }, [availablePhrases.length, phraseSignature, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhraseIndex(0);
      setPhase("holding");
    } else if (previousReducedMotion.current && canRotate) {
      setPhraseIndex(0);
      setPhase("entering");
      setCycleVersion((version) => version + 1);
    }
    previousReducedMotion.current = prefersReducedMotion;
  }, [canRotate, prefersReducedMotion]);

  useEffect(() => {
    if (effectivePaused && phase !== "holding") {
      setPhase("holding");
    }
  }, [effectivePaused, phase]);

  useEffect(() => {
    if (!canRotate || effectivePaused) return;

    const delay =
      phase === "entering"
        ? ENTER_PHASE_MS
        : phase === "exiting"
          ? EXIT_PHASE_MS
          : HOLD_PHASE_MS;
    const timeout = window.setTimeout(() => {
      if (phase === "entering") {
        setPhase("holding");
      } else if (phase === "holding") {
        setPhase("exiting");
      } else {
        setPhraseIndex((index) => (index + 1) % availablePhrases.length);
        setPhase("entering");
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    canRotate,
    availablePhrases.length,
    effectivePaused,
    phase,
  ]);

  return (
    <div
      className={styles.root}
      data-paused={effectivePaused ? "true" : "false"}
      data-rotation-state={phase}
      ref={rootRef}
    >
      <h1
        aria-label={canonicalTitle}
        className={[styles.heading, className].filter(Boolean).join(" ")}
        data-homeground-rotating-title="true"
        id={id}
      >
        <span className={styles.visualTitle}>
          {availableFixedLines.map((line, index) => (
            <span className={styles.fixedLine} key={`${line}-${index}`}>
              {line}
              {index < availableFixedLines.length - 1 || currentPhrase
                ? segmentJoiner
                : null}
            </span>
          ))}
          {currentPhrase ? (
            <span className={styles.phraseStage} data-nosnippet="">
              <span
                className={styles.phraseLayer}
                data-phase={phase}
                key={`${cycleVersion}-${currentPhraseIndex}-${currentPhrase}`}
              >
                <AnimatedPhrase phrase={currentPhrase} />
              </span>
            </span>
          ) : null}
        </span>
      </h1>
      <div
        aria-hidden="true"
        className={[
          styles.heading,
          styles.measurementHeading,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        data-homeground-title-measurement="true"
        data-nosnippet=""
      >
        <span className={styles.visualTitle}>
          {availableFixedLines.map((line, index) => (
            <span className={styles.fixedLine} key={`${line}-${index}`}>
              {line}
              {index < availableFixedLines.length - 1 ||
              availablePhrases.length > 0
                ? segmentJoiner
                : null}
            </span>
          ))}
          {availablePhrases.length > 0 ? (
            <span className={styles.phraseStage}>
              <span className={styles.phraseSizer}>
                {availablePhrases.map((phrase, index) => (
                  <span
                    className={styles.phraseMeasure}
                    key={`${phrase}-${index}`}
                  >
                    <AnimatedPhrase phrase={phrase} />
                  </span>
                ))}
              </span>
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
}
