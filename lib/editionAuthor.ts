import type { Metadata } from "next";
import { arabicStudioCopy } from "./arabicStudioCopy";
import {
  EDITORIAL_AUTHOR_EDITION_PATHS,
  ENGLISH_AUTHOR_PATH,
  editionAuthorComponentStrings,
  editionAuthorProfileCopy,
  type EditionAuthorLanguage,
} from "./editionAuthorCopy";
import { EDITORIAL_AUTHOR_ID, getEditorialAuthorLanguagePaths } from "./editorialIdentity";
import { frenchStudioCopy } from "./frenchStudioCopy";
import { germanStudioCopy } from "./germanStudioCopy";
import type { JapaneseEditorialAuthor } from "./japaneseAuthorCopy";
import { spanishStudioCopy } from "./spanishStudioCopy";

const studioCopy = { fr: frenchStudioCopy, de: germanStudioCopy, es: spanishStudioCopy, ar: arabicStudioCopy } as const;
const SITE_URL = "https://homegroundchina.com";

/** Same shape as getEditorialAuthor(locale): one locale entry plus the studio member. */
export type EditionEditorialAuthor = JapaneseEditorialAuthor;

/**
 * Evan in an edition: name, role, bio, tags and photo from the edition's
 * studio page (exactly as getEditorialAuthor reads the studio copy), with
 * the translated profile text.
 */
export function getEditionEditorialAuthor(language: EditionAuthorLanguage): EditionEditorialAuthor {
  const member = studioCopy[language].members.find((candidate) => candidate.id === EDITORIAL_AUTHOR_ID);
  if (!member) throw new Error(`Missing ${EDITORIAL_AUTHOR_ID} in the ${language} studio copy.`);
  return {
    id: EDITORIAL_AUTHOR_ID,
    name: member.name,
    role: member.role,
    bio: member.bio,
    tags: member.tags,
    image: member.image,
    path: EDITORIAL_AUTHOR_EDITION_PATHS[language],
    copy: editionAuthorProfileCopy[language],
  };
}

/** hreflang for every language version of the profile, reciprocal by construction. */
export function editorialAuthorAlternates() {
  return { ...getEditorialAuthorLanguagePaths(), "x-default": ENGLISH_AUTHOR_PATH };
}

export function editionAuthorMetadata(language: EditionAuthorLanguage): Metadata {
  const author = getEditionEditorialAuthor(language);
  const strings = editionAuthorComponentStrings[language];
  const image = {
    url: `${SITE_URL}${author.image.src}`,
    width: author.image.width,
    height: author.image.height,
    alt: author.image.alt,
  };
  return {
    title: { absolute: author.copy.title },
    description: author.copy.introduction,
    alternates: { canonical: author.path, languages: editorialAuthorAlternates() },
    robots: { index: true, follow: true },
    openGraph: {
      type: "profile",
      siteName: "Homeground China",
      locale: strings.openGraphLocale,
      title: author.copy.title,
      description: author.copy.introduction,
      url: author.path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: author.copy.title,
      description: author.copy.introduction,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
