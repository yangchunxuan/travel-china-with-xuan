"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGuideSearchLanguagePaths } from "../lib/guideSearchI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { HomegroundHeader } from "./HomegroundHeader";

/**
 * The exported search document is query-neutral. After hydration, carry the
 * visitor's current q value to each language equivalent using URLSearchParams
 * so punctuation, ampersands and non-Latin text stay data rather than markup.
 */
export function GuideSearchHeader({ locale }: { locale: HomegroundLocale }) {
  const searchParams = useSearchParams();
  const browserQuery = (searchParams.get("q") ?? "").trim().slice(0, 120);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(browserQuery);
  }, [browserQuery]);

  return (
    <HomegroundHeader
      languagePaths={getGuideSearchLanguagePaths(query)}
      locale={locale}
      pageContext="search"
    />
  );
}
