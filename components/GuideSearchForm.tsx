"use client";

import { ArrowRight, Search } from "lucide-react";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  normalizeGuideSearchText,
  searchGuideDocuments,
  type GuideSearchDocument,
} from "../lib/guideSearch";
import { getGuideSearchCopy } from "../lib/guideSearchI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { trackEvent } from "../lib/analytics";
import styles from "./GuideSearchForm.module.css";

export type GuideSearchSurface = "homepage" | "guides_hub" | "search_results";

const emptyDocuments: readonly GuideSearchDocument[] = [];
const emptyPlaceholders: readonly string[] = [];
const MAX_ROTATING_PLACEHOLDERS = 3;
const TYPEWRITER_TARGET_MS = 620;
const TYPEWRITER_MIN_DELAY_MS = 18;
const TYPEWRITER_MAX_DELAY_MS = 50;
const TYPEWRITER_HOLD_MS = 610;
const TYPEWRITER_CLEAR_MS = 100;

type PlaceholderPhase = "typing" | "holding" | "clearing";

function isGuideSearchDocument(value: unknown): value is GuideSearchDocument {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<GuideSearchDocument>;
  return (
    typeof candidate.contentId === "string" &&
    typeof candidate.guideId === "string" &&
    (candidate.locale === "en" ||
      candidate.locale === "zh" ||
      candidate.locale === "ko") &&
    typeof candidate.path === "string" &&
    candidate.path.startsWith("/") &&
    typeof candidate.title === "string" &&
    typeof candidate.h1 === "string" &&
    typeof candidate.description === "string" &&
    Array.isArray(candidate.searchTerms) &&
    candidate.searchTerms.every((term) => typeof term === "string") &&
    Array.isArray(candidate.entityTerms) &&
    candidate.entityTerms.every((term) => typeof term === "string") &&
    typeof candidate.collectionLabel === "string" &&
    typeof candidate.section === "string" &&
    (candidate.dateModified === null ||
      typeof candidate.dateModified === "string")
  );
}

function queryLength(value: string) {
  return Array.from(value.normalize("NFC")).length;
}

export function GuideSearchForm({
  documents = emptyDocuments,
  documentsUrl,
  locale,
  surface,
  initialQuery = "",
  compact = false,
  rotatingPlaceholders = emptyPlaceholders,
  showExamples = true,
}: {
  documents?: readonly GuideSearchDocument[];
  documentsUrl?: string;
  locale: HomegroundLocale;
  surface: GuideSearchSurface;
  initialQuery?: string;
  compact?: boolean;
  rotatingPlaceholders?: readonly string[];
  showExamples?: boolean;
}) {
  const copy = getGuideSearchCopy(locale);
  const inputId = useId();
  const errorId = useId();
  const suggestionsId = useId();
  const openedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholderViewportRef = useRef<HTMLSpanElement>(null);
  const searchExperienceRef = useRef<HTMLDivElement>(null);
  const indexRequestStartedRef = useRef(documents.length > 0);
  const [input, setInput] = useState(initialQuery.slice(0, 120));
  const [focusedWithin, setFocusedWithin] = useState(false);
  const [suggestionsDismissed, setSuggestionsDismissed] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [remoteDocuments, setRemoteDocuments] = useState<
    readonly GuideSearchDocument[] | null
  >(null);
  const [indexState, setIndexState] = useState<
    "idle" | "loading" | "ready" | "failed"
  >(documents.length > 0 ? "ready" : "idle");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderCharacterCount, setPlaceholderCharacterCount] = useState(0);
  const [placeholderPhase, setPlaceholderPhase] =
    useState<PlaceholderPhase>("typing");
  const [placeholderInView, setPlaceholderInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const deferredInput = useDeferredValue(input);
  const placeholderSignature = JSON.stringify(rotatingPlaceholders);
  const placeholderPhrases = useMemo(
    () =>
      rotatingPlaceholders
        .map((placeholder) => placeholder.trim())
        .filter(Boolean)
        .slice(0, MAX_ROTATING_PLACEHOLDERS),
    [rotatingPlaceholders],
  );
  const currentPlaceholder =
    placeholderPhrases.length > 0
      ? (placeholderPhrases[placeholderIndex % placeholderPhrases.length] ?? "")
      : "";
  const currentPlaceholderCharacters = Array.from(currentPlaceholder);
  const visiblePlaceholder = prefersReducedMotion
    ? currentPlaceholder
    : currentPlaceholderCharacters
        .slice(0, placeholderCharacterCount)
        .join("");
  const showRotatingPlaceholder =
    Boolean(currentPlaceholder) && !focusedWithin && input.length === 0;
  const normalizedInput = normalizeGuideSearchText(deferredInput, locale);
  const availableDocuments =
    documents.length > 0 ? documents : (remoteDocuments ?? emptyDocuments);
  const suggestions = useMemo(
    () =>
      normalizedInput.length >= 2
        ? searchGuideDocuments(availableDocuments, normalizedInput, locale).slice(
            0,
            6,
          )
        : [],
    [availableDocuments, locale, normalizedInput],
  );
  const showSuggestions =
    focusedWithin &&
    !suggestionsDismissed &&
    normalizedInput.length >= 2 &&
    suggestions.length > 0;
  const showSuggestionNotice =
    focusedWithin &&
    !suggestionsDismissed &&
    normalizedInput.length >= 2 &&
    suggestions.length === 0 &&
    (indexState === "loading" ||
      indexState === "failed" ||
      indexState === "ready");

  useEffect(() => {
    setPlaceholderIndex(0);
    setPlaceholderCharacterCount(0);
    setPlaceholderPhase("typing");
  }, [placeholderSignature]);

  useEffect(() => {
    const viewport = placeholderViewportRef.current;
    if (!viewport) return;

    const frame = window.requestAnimationFrame(() => {
      viewport.scrollLeft =
        placeholderPhase === "clearing" || placeholderCharacterCount === 0
          ? 0
          : viewport.scrollWidth;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [placeholderCharacterCount, placeholderIndex, placeholderPhase]);

  useEffect(() => {
    if (placeholderPhrases.length === 0) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(motionQuery.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);

    updateMotionPreference();
    updateVisibility();
    motionQuery.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);

    const experience = searchExperienceRef.current;
    const observer =
      experience && typeof window.IntersectionObserver === "function"
        ? new window.IntersectionObserver(
            ([entry]) => setPlaceholderInView(Boolean(entry?.isIntersecting)),
            { rootMargin: "160px 0px" },
          )
        : null;
    if (experience && observer) observer.observe(experience);

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, [placeholderPhrases.length]);

  useEffect(() => {
    if (
      placeholderPhrases.length === 0 ||
      focusedWithin ||
      input.length > 0 ||
      prefersReducedMotion ||
      !placeholderInView ||
      !pageVisible
    ) {
      return;
    }

    const typeDelay = Math.max(
      TYPEWRITER_MIN_DELAY_MS,
      Math.min(
        TYPEWRITER_MAX_DELAY_MS,
        Math.round(
          TYPEWRITER_TARGET_MS /
            Math.max(currentPlaceholderCharacters.length, 1),
        ),
      ),
    );
    const delay =
      placeholderPhase === "clearing"
        ? TYPEWRITER_CLEAR_MS
        : placeholderPhase === "holding"
          ? TYPEWRITER_HOLD_MS
          : typeDelay;
    const timeout = window.setTimeout(() => {
      if (placeholderPhase === "clearing") {
        setPlaceholderIndex(
          (current) => (current + 1) % placeholderPhrases.length,
        );
        setPlaceholderCharacterCount(0);
        setPlaceholderPhase("typing");
        return;
      }

      if (
        placeholderPhase === "typing" &&
        placeholderCharacterCount < currentPlaceholderCharacters.length
      ) {
        const nextCount = placeholderCharacterCount + 1;
        setPlaceholderCharacterCount(nextCount);
        if (nextCount >= currentPlaceholderCharacters.length) {
          setPlaceholderPhase("holding");
        }
        return;
      }

      setPlaceholderPhase("clearing");
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [
    currentPlaceholderCharacters.length,
    focusedWithin,
    input.length,
    pageVisible,
    placeholderCharacterCount,
    placeholderIndex,
    placeholderInView,
    placeholderPhase,
    placeholderPhrases.length,
    prefersReducedMotion,
  ]);

  const ensureRemoteDocuments = useCallback(async () => {
    if (
      documents.length > 0 ||
      !documentsUrl ||
      indexRequestStartedRef.current
    ) {
      return;
    }

    indexRequestStartedRef.current = true;
    setIndexState("loading");
    try {
      const response = await fetch(documentsUrl, {
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Guide search index request failed");
      const payload: unknown = await response.json();
      if (
        !Array.isArray(payload) ||
        !payload.every(
          (document) =>
            isGuideSearchDocument(document) && document.locale === locale,
        )
      ) {
        throw new Error("Guide search index response was invalid");
      }
      setRemoteDocuments(payload);
      setIndexState("ready");
    } catch {
      setIndexState("failed");
    }
  }, [documents.length, documentsUrl, locale]);

  const retryRemoteDocuments = () => {
    inputRef.current?.focus();
    indexRequestStartedRef.current = false;
    void ensureRemoteDocuments();
  };

  const handleFocusCapture = () => {
    setFocusedWithin(true);
    setSuggestionsDismissed(false);
    void ensureRemoteDocuments();
    if (openedRef.current) return;
    openedRef.current = true;
    trackEvent("guide_search_opened", {
      page_language: locale,
      search_surface: surface,
    });
  };

  const handleBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }
    setFocusedWithin(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const normalized = normalizeGuideSearchText(input, locale);
    if (!normalized) {
      event.preventDefault();
      setValidationError(true);
      return;
    }
    trackEvent("guide_search_submitted", {
      page_language: locale,
      search_surface: surface,
      query_length: queryLength(normalized),
    });
  };

  const handleKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setSuggestionsDismissed(true);
      if (event.target !== inputRef.current) inputRef.current?.focus();
      return;
    }
    if (!showSuggestions || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) {
      return;
    }

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        `#${CSS.escape(suggestionsId)} a`,
      ),
    );
    if (links.length === 0) return;

    if (event.target === inputRef.current) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        links[0]?.focus();
      }
      return;
    }

    const currentIndex = links.indexOf(event.target as HTMLAnchorElement);
    if (currentIndex < 0) return;
    event.preventDefault();
    const nextIndex =
      event.key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0 || nextIndex >= links.length) {
      inputRef.current?.focus();
    } else {
      links[nextIndex]?.focus();
    }
  };

  return (
    <div
      className={`${styles.searchExperience} ${compact ? styles.compact : ""}`}
      aria-busy={indexState === "loading"}
      ref={searchExperienceRef}
      onBlurCapture={handleBlurCapture}
      onFocusCapture={handleFocusCapture}
      onKeyDownCapture={handleKeyDownCapture}
    >
      <div className={styles.queryArea}>
        <form
          action={copy.path}
          className={styles.form}
          method="get"
          role="search"
          onSubmit={handleSubmit}
        >
          <label htmlFor={inputId}>{copy.label}</label>
          <div className={styles.control}>
            <Search aria-hidden="true" size={21} strokeWidth={1.8} />
            {showRotatingPlaceholder ? (
              <span
                aria-hidden="true"
                className={styles.rotatingPlaceholder}
                data-phase={placeholderPhase}
                ref={placeholderViewportRef}
              >
                <span className={styles.placeholderText}>
                  {visiblePlaceholder}
                </span>
                <span className={styles.typewriterCursor} />
              </span>
            ) : null}
            <input
              id={inputId}
              ref={inputRef}
              name="q"
              type="search"
              autoComplete="off"
              enterKeyHint="search"
              maxLength={120}
              placeholder={placeholderPhrases.length > 0 ? "" : copy.placeholder}
              required
              value={input}
              aria-controls={
                showSuggestions || showSuggestionNotice
                  ? suggestionsId
                  : undefined
              }
              aria-describedby={validationError ? errorId : undefined}
              aria-expanded={showSuggestions || showSuggestionNotice}
              aria-invalid={validationError || undefined}
              onChange={(event) => {
                setInput(event.target.value);
                setSuggestionsDismissed(false);
                if (validationError) setValidationError(false);
                void ensureRemoteDocuments();
              }}
              onInvalid={(event) => {
                event.preventDefault();
                setValidationError(true);
              }}
            />
            <button type="submit">
              <span>{copy.action}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>
        </form>

        {validationError ? (
          <p className={styles.validationError} id={errorId} role="alert">
            {copy.emptyQueryError}
          </p>
        ) : null}

        {showSuggestions ? (
          <div
            aria-label={copy.suggestionsLabel(suggestions.length)}
            className={styles.suggestions}
            id={suggestionsId}
            role="region"
          >
            <p role="status" aria-live="polite">
              {copy.suggestionsLabel(suggestions.length)}
            </p>
            <ul>
              {suggestions.map(({ document }, index) => (
                <li key={document.contentId}>
                  <a
                    href={document.path}
                    onClick={() => {
                      trackEvent("guide_search_result_clicked", {
                        guide_id: document.guideId,
                        page_language: locale,
                        search_surface: surface,
                        result_position: index + 1,
                        result_count: suggestions.length,
                      });
                    }}
                  >
                    <span>{document.h1}</span>
                    <small>{document.collectionLabel}</small>
                    <ArrowRight aria-hidden="true" size={16} />
                  </a>
                </li>
              ))}
            </ul>
            <a className={styles.allResults} href={`${copy.path}?q=${encodeURIComponent(input)}`}>
              {copy.action}
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
        ) : null}

        {showSuggestionNotice ? (
          <div
            className={styles.suggestionNotice}
            id={suggestionsId}
            role="status"
          >
            <span>
              {indexState === "loading"
                ? copy.loadingSuggestions
                : indexState === "failed"
                  ? copy.suggestionsUnavailable
                  : copy.noSuggestions}
            </span>
            {indexState === "failed" ? (
              <button type="button" onClick={retryRemoteDocuments}>
                {copy.retrySuggestions}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {!compact && showExamples ? (
        <div className={styles.examples} aria-label={copy.examplesLabel}>
          <span>{copy.examplesLabel}</span>
          <ul>
            {copy.examples.map((example) => (
              <li key={example}>
                <a
                  href={`${copy.path}?q=${encodeURIComponent(example)}`}
                  onClick={() => {
                    trackEvent("guide_search_submitted", {
                      page_language: locale,
                      search_surface: surface,
                      query_length: queryLength(example),
                    });
                  }}
                >
                  {example}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
