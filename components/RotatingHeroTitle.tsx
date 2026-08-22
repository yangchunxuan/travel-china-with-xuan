"use client";

import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./RotatingHeroTitle.module.css";

const DEFAULT_INTERVAL_MS = 4000;
const ENTER_PHASE_MS = 760;
const EXIT_PHASE_MS = 560;
const MIN_HOLD_MS = 480;

type AnimationPhase = "entering" | "holding" | "exiting";

type LetterStyle = CSSProperties & {
  "--letter-enter-delay": string;
  "--letter-exit-delay": string;
};

export type RotatingHeroTitleProps = {
  className?: string;
  id?: string;
  intervalMs?: number;
  pauseLabel?: string;
  paused?: boolean;
  phrases: readonly string[];
  playLabel?: string;
  question: string;
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

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M8.25 5.65 18 12l-9.75 6.35V5.65Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M7 5.5h3.25v13H7zM13.75 5.5H17v13h-3.25z" />
    </svg>
  );
}

export function RotatingHeroTitle({
  className,
  id,
  intervalMs = DEFAULT_INTERVAL_MS,
  pauseLabel = "Pause title rotation",
  paused = false,
  phrases,
  playLabel = "Play title rotation",
  question,
}: RotatingHeroTitleProps) {
  const phraseSignature = JSON.stringify(phrases);
  const availablePhrases = useMemo(
    () => phrases.map((phrase) => phrase.trim()).filter(Boolean),
    [phrases],
  );
  const normalizedInterval = Number.isFinite(intervalMs)
    ? Math.max(
        intervalMs,
        ENTER_PHASE_MS + EXIT_PHASE_MS + MIN_HOLD_MS,
      )
    : DEFAULT_INTERVAL_MS;
  const holdDuration = normalizedInterval - ENTER_PHASE_MS - EXIT_PHASE_MS;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<AnimationPhase>(() =>
    paused || availablePhrases.length <= 1 ? "holding" : "entering",
  );
  const [userPaused, setUserPaused] = useState(false);
  const [finished, setFinished] = useState(
    availablePhrases.length <= 1,
  );
  const [documentVisible, setDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [cycleVersion, setCycleVersion] = useState(0);
  const previousPhraseSignature = useRef(phraseSignature);
  const previousReducedMotion = useRef(false);

  const lastPhraseIndex = Math.max(availablePhrases.length - 1, 0);
  const currentPhraseIndex = Math.min(phraseIndex, lastPhraseIndex);
  const currentPhrase = availablePhrases[currentPhraseIndex] ?? "";
  const firstPhrase = availablePhrases[0] ?? "";
  const accessibleTitle = [question.trim(), firstPhrase]
    .filter(Boolean)
    .join(" ");
  const canRotate = availablePhrases.length > 1;
  const effectivePaused =
    paused || userPaused || !documentVisible || prefersReducedMotion;
  const buttonShowsPlay = userPaused || finished;

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
    setFinished(shouldRemainStatic);
    setCycleVersion((version) => version + 1);
  }, [availablePhrases.length, phraseSignature, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhraseIndex(0);
      setPhase("holding");
      setFinished(true);
    } else if (previousReducedMotion.current && canRotate) {
      setPhraseIndex(0);
      setPhase("entering");
      setFinished(false);
      setCycleVersion((version) => version + 1);
    }
    previousReducedMotion.current = prefersReducedMotion;
  }, [canRotate, prefersReducedMotion]);

  useEffect(() => {
    if (!canRotate || effectivePaused || finished) return;

    const delay =
      phase === "entering"
        ? ENTER_PHASE_MS
        : phase === "exiting"
          ? EXIT_PHASE_MS
          : holdDuration;
    const timeout = window.setTimeout(() => {
      if (phase === "entering") {
        setPhase("holding");
        if (currentPhraseIndex === lastPhraseIndex) {
          setFinished(true);
        }
      } else if (phase === "holding") {
        setPhase("exiting");
      } else {
        setPhraseIndex((index) => Math.min(index + 1, lastPhraseIndex));
        setPhase("entering");
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    canRotate,
    currentPhraseIndex,
    effectivePaused,
    finished,
    holdDuration,
    lastPhraseIndex,
    phase,
  ]);

  const handleToggle = () => {
    if (prefersReducedMotion || !canRotate) return;

    if (finished) {
      setPhraseIndex(0);
      setPhase("entering");
      setFinished(false);
      setUserPaused(false);
      setCycleVersion((version) => version + 1);
      return;
    }

    setUserPaused((isPaused) => !isPaused);
  };

  return (
    <div
      className={`${styles.root} ${canRotate ? styles.hasControl : ""}`}
      data-paused={effectivePaused || finished ? "true" : "false"}
      data-rotation-state={finished ? "finished" : phase}
    >
      <h1 className={className} id={id}>
        <span className={styles.screenReaderOnly}>{accessibleTitle}</span>
        <span aria-hidden="true" className={styles.visualTitle}>
          <span className={styles.question}>{question}</span>
          {firstPhrase ? (
            <span className={styles.phraseStage}>
              <span className={styles.phraseSizer}>
                {availablePhrases.map((phrase, index) => (
                  <span
                    className={styles.phraseMeasure}
                    key={`${phrase}-${index}`}
                  >
                    {phrase}
                  </span>
                ))}
              </span>
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

      {canRotate ? (
        <button
          aria-label={buttonShowsPlay ? playLabel : pauseLabel}
          className={styles.toggle}
          onClick={handleToggle}
          type="button"
        >
          {buttonShowsPlay ? <PlayIcon /> : <PauseIcon />}
        </button>
      ) : null}
    </div>
  );
}
