import type { Metadata } from "next";
import { arabicEntryRequirementsCopy } from "./arabicEntryRequirementsCopy.ts";
import { chineseEntryRequirementsCopy } from "./chineseEntryRequirementsCopy.ts";
import { frenchEntryRequirementsCopy } from "./frenchEntryRequirementsCopy.ts";
import { germanEntryRequirementsCopy } from "./germanEntryRequirementsCopy.ts";
import { japaneseEntryRequirementsCopy } from "./japaneseEntryRequirementsCopy.ts";
import { koreanEntryRequirementsCopy } from "./koreanEntryRequirementsCopy.ts";
import { resolvePageTitle } from "./pageTitle.ts";
import { spanishEntryRequirementsCopy } from "./spanishEntryRequirementsCopy.ts";
import type { EntryRequirementsEditionCopy } from "./entryRequirementsEditionTypes.ts";
import {
  entryRequirementsAlternates,
  entryRequirementsEditionPath,
  type EntryRequirementsPageLocale,
} from "./entryRequirementsEditionPaths.ts";

export const entryRequirementsEditionCopy: Readonly<Record<EntryRequirementsPageLocale, EntryRequirementsEditionCopy>> = {
  zh: chineseEntryRequirementsCopy,
  ko: koreanEntryRequirementsCopy,
  ja: japaneseEntryRequirementsCopy,
  fr: frenchEntryRequirementsCopy,
  es: spanishEntryRequirementsCopy,
  de: germanEntryRequirementsCopy,
  ar: arabicEntryRequirementsCopy,
};

/** The English hub's social image; only its alt text is translated. */
export const entryRequirementsSocialImage = {
  url: "https://homegroundchina.com/images/guides/china-visa-free-uk-citizens-2026/great-wall-og-1200.jpg",
  width: 1200,
  height: 630,
} as const;

export function entryRequirementsEditionMetadata(language: EntryRequirementsPageLocale): Metadata {
  const copy = entryRequirementsEditionCopy[language];
  const path = entryRequirementsEditionPath(language);
  const { title, description, socialImageAlt } = copy.metadata;
  return {
    // Chinese and Korean follow the main site's title rule; the editions name the brand.
    title: language === "zh" || language === "ko" ? resolvePageTitle(title, language) : { absolute: `${title} | Homeground China` },
    description,
    alternates: { canonical: path, languages: entryRequirementsAlternates() },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: copy.openGraphLocale,
      url: `https://homegroundchina.com${path}`,
      siteName: "Homeground China",
      title,
      description,
      images: [{ ...entryRequirementsSocialImage, alt: socialImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [entryRequirementsSocialImage.url],
    },
  };
}
