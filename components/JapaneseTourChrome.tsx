"use client";

import { jaPilot } from "../lib/jaPilot";
import { japaneseLanguagePaths, japaneseSite, type JapaneseLanguagePath } from "../lib/japaneseSite";
import { JapaneseFooter } from "./JapaneseFooter";
import { JapaneseHeader } from "./JapaneseHeader";

function tourPaths(tourSlug: string | null) {
  const currentPath = tourSlug ? `/ja/tours/${tourSlug}/` : japaneseSite.tours;
  const englishPath = tourSlug ? `/tours/${tourSlug}/` : "/tours/";
  return { currentPath, languagePaths: japaneseLanguagePaths(englishPath, currentPath) };
}

/** Product and catalog pages keep the chosen package and party size in the contact and language links. */
export function JapaneseTourHeader({ tourSlug = jaPilot.tourSlug }: { tourSlug?: string | null }) {
  const { currentPath, languagePaths } = tourPaths(tourSlug);
  return (
    <JapaneseSiteHeader
      contactHref={`${currentPath}#contact`}
      currentPath={currentPath}
      languagePaths={languagePaths}
      selectionSlug={tourSlug}
    />
  );
}

/** Every Japanese page's header: the English header's items and menus, in Japanese. */
export function JapaneseSiteHeader(props: {
  contactHref: string;
  currentPath: string;
  languagePaths: readonly JapaneseLanguagePath[];
  selectionSlug?: string | null;
  contactMode?: "dialog" | "anchor";
}) {
  return <JapaneseHeader {...props} />;
}

export function JapaneseTourFooter({ tourSlug = jaPilot.tourSlug }: { tourSlug?: string | null }) {
  const { currentPath } = tourPaths(tourSlug);
  return <JapaneseSiteFooter currentPath={currentPath} />;
}

/** Every Japanese page's footer: the English footer's sections and links, in Japanese. */
export function JapaneseSiteFooter({ currentPath }: { currentPath: string; selectionSlug?: string | null }) {
  return <JapaneseFooter currentPath={currentPath} />;
}
