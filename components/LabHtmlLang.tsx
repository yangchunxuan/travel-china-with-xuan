"use client";

import { useEffect } from "react";

/**
 * Lab pages share one root layout, so the document language has to be set at
 * runtime for the locale font stacks in globals.css (html[lang="zh-Hans"],
 * html[lang="ko"]) to apply. Production pages set lang server-side and never
 * use this.
 */
export function LabHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  return null;
}
