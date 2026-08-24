"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  normalizeGuideSearchText,
  searchGuideDocuments,
  type GuideSearchDocument,
} from "../lib/guideSearch";
import { getGuideSearchCopy } from "../lib/guideSearchI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getSearchPlatformCopy,
  getSearchSectionPath,
} from "../lib/searchPlatformI18n";
import { trackEvent } from "../lib/analytics";
import { GuideSearchForm } from "./GuideSearchForm";
import styles from "./GuideSearchResultsPage.module.css";

const visibleResultLimit = 48;

const dateLocales: Record<HomegroundLocale, string> = {
  en: "en-GB",
  zh: "zh-CN",
  ko: "ko-KR",
};

function queryLength(value: string) {
  return Array.from(value.normalize("NFC")).length;
}

export function GuideSearchResultsClient({
  documents,
  locale,
}: {
  documents: readonly GuideSearchDocument[];
  locale: HomegroundLocale;
}) {
  const searchParams = useSearchParams();
  const urlRawQuery = (searchParams.get("q") ?? "").trim().slice(0, 120);
  // Static export cannot know a visitor's query string. Keep the server and
  // first client render query-neutral, then apply the browser URL after mount
  // so a direct `?q=` visit cannot produce a hydration mismatch.
  const [rawQuery, setRawQuery] = useState("");
  const query = normalizeGuideSearchText(rawQuery, locale);
  const copy = getGuideSearchCopy(locale);
  const platformCopy = getSearchPlatformCopy(locale);
  const trackedNoResultsRef = useRef("");
  const [resultWindow, setResultWindow] = useState({
    count: visibleResultLimit,
    query: "",
  });
  const results = useMemo(
    () => searchGuideDocuments(documents, query, locale),
    [documents, locale, query],
  );
  const visibleCount =
    resultWindow.query === query ? resultWindow.count : visibleResultLimit;
  const visibleResults = results.slice(0, visibleCount);
  const guidesPath = locale === "en" ? "/guides/" : `/${locale}/guides/`;
  const topicsPath = `${guidesPath}#browse-topics`;
  const plannerQuery = new URLSearchParams({
    utm_source: "guide-search",
    utm_medium: "owned",
    utm_campaign: "trip-conversation",
    utm_content: "no-results",
  });
  const plannerPath = `${locale === "en" ? "/" : `/${locale}/`}?${plannerQuery.toString()}#planner-contact`;

  useEffect(() => {
    setRawQuery(urlRawQuery);
  }, [urlRawQuery]);

  useEffect(() => {
    if (!query || results.length > 0 || trackedNoResultsRef.current === query) {
      return;
    }
    trackedNoResultsRef.current = query;
    trackEvent("guide_search_no_results", {
      page_language: locale,
      search_surface: "search_results",
      query_length: queryLength(query),
      result_count: 0,
    });
  }, [locale, query, results.length]);

  return (
    <>
      <GuideSearchForm
        key={`${locale}:${rawQuery}`}
        compact
        documents={documents}
        initialQuery={rawQuery}
        locale={locale}
        surface="search_results"
      />

      <div className={styles.resultRegion}>
        {!query ? (
          <section className={styles.emptyPrompt} aria-labelledby="search-empty-title">
            <div>
              <h2 id="search-empty-title">{copy.page.emptyQueryTitle}</h2>
              <p>{copy.page.emptyQueryBody}</p>
            </div>
          </section>
        ) : results.length > 0 ? (
          <section aria-labelledby="search-results-title">
            <header className={styles.resultsHeader}>
              <div>
                <p className={styles.resultCount} role="status" aria-live="polite">
                  {copy.page.resultCount(results.length)}
                </p>
                <h2 id="search-results-title">{copy.page.resultTitle(rawQuery)}</h2>
              </div>
            </header>

            <ol className={styles.resultList}>
              {visibleResults.map(({ document }, index) => {
                const section = platformCopy.sections[document.section];
                const date = document.dateModified
                  ? new Intl.DateTimeFormat(dateLocales[locale], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(`${document.dateModified}T00:00:00Z`))
                  : null;

                return (
                  <li key={document.contentId}>
                    <article>
                      <p className={styles.resultMeta}>
                        <span>{section.shortLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{document.collectionLabel}</span>
                        {date ? (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{copy.page.updated} <time dateTime={document.dateModified ?? undefined}>{date}</time></span>
                          </>
                        ) : null}
                      </p>
                      <h3>
                        <Link
                          href={document.path}
                          onClick={() => {
                            trackEvent("guide_search_result_clicked", {
                              guide_id: document.guideId,
                              page_language: locale,
                              search_surface: "search_results",
                              result_position: index + 1,
                              result_count: results.length,
                            });
                          }}
                        >
                          {document.h1}
                        </Link>
                      </h3>
                      <p>{document.description}</p>
                      <Link
                        aria-label={`${copy.page.readGuide}: ${document.h1}`}
                        className={styles.readLink}
                        href={document.path}
                        onClick={() => {
                          trackEvent("guide_search_result_clicked", {
                            guide_id: document.guideId,
                            page_language: locale,
                            search_surface: "search_results",
                            result_position: index + 1,
                            result_count: results.length,
                          });
                        }}
                      >
                        {copy.page.readGuide}
                        <ArrowRight aria-hidden="true" size={17} />
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ol>
            {visibleResults.length < results.length ? (
              <div className={styles.loadMoreWrap}>
                <button
                  className={styles.loadMoreButton}
                  type="button"
                  onClick={() => {
                    setResultWindow({
                      count: Math.min(
                        visibleResults.length + visibleResultLimit,
                        results.length,
                      ),
                      query,
                    });
                  }}
                >
                  {copy.page.showMore}
                </button>
              </div>
            ) : null}
          </section>
        ) : (
          <section className={styles.noResults} aria-labelledby="search-no-results-title">
            <div className={styles.noResultsMain}>
              <h2 id="search-no-results-title">{copy.page.noResultsTitle(rawQuery)}</h2>
              <p>{copy.page.noResultsBody}</p>
              <div className={styles.recoveryLinks}>
                <Link href={topicsPath}>{copy.page.browseTopics}</Link>
                <Link href={guidesPath}>{copy.page.allGuides}</Link>
              </div>
            </div>
            <aside className={styles.plannerHandoff}>
              <p>{copy.eyebrow}</p>
              <h3>{copy.page.plannerTitle}</h3>
              <p>{copy.page.plannerBody}</p>
              <Link href={plannerPath}>
                {copy.page.plannerAction}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </aside>
          </section>
        )}
      </div>
    </>
  );
}
