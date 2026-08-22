"use client";

import { ArrowRight, Search } from "lucide-react";
import {
  useCallback,
  useDeferredValue,
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
}: {
  documents?: readonly GuideSearchDocument[];
  documentsUrl?: string;
  locale: HomegroundLocale;
  surface: GuideSearchSurface;
  initialQuery?: string;
  compact?: boolean;
}) {
  const copy = getGuideSearchCopy(locale);
  const inputId = useId();
  const errorId = useId();
  const suggestionsId = useId();
  const openedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
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
  const deferredInput = useDeferredValue(input);
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
            <input
              id={inputId}
              ref={inputRef}
              name="q"
              type="search"
              autoComplete="off"
              enterKeyHint="search"
              maxLength={120}
              placeholder={copy.placeholder}
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

      {!compact ? (
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
