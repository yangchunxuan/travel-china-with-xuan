import { getAllGuides } from "./guideRegistry";
import {
  homegroundLocales,
  type HomegroundLocale,
} from "./homegroundI18n";

export const GUIDES_HUB_PAGE_SIZE = 24;
const SITE_URL = "https://homegroundchina.com";

export function getGuidesHubPageCount(locale: HomegroundLocale) {
  return Math.max(
    1,
    Math.ceil(getAllGuides(locale).length / GUIDES_HUB_PAGE_SIZE),
  );
}

export function getGuidesHubPagePath(
  locale: HomegroundLocale,
  page: number,
) {
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  return page === 1
    ? `${localePrefix}/guides/`
    : `${localePrefix}/guides/page/${page}/`;
}

export function getGuidesHubPageLanguagePaths(page: number) {
  const paths: Record<string, string> = {};

  for (const locale of homegroundLocales) {
    if (page > getGuidesHubPageCount(locale)) continue;
    const language = locale === "zh" ? "zh-Hans" : locale;
    paths[language] = getGuidesHubPagePath(locale, page);
  }

  if (paths.en) paths["x-default"] = paths.en;
  return paths;
}

export function getGuidesHubPageAbsoluteLanguagePaths(page: number) {
  return Object.fromEntries(
    Object.entries(getGuidesHubPageLanguagePaths(page)).map(
      ([language, path]) => [language, `${SITE_URL}${path}`],
    ),
  );
}

export function getGuidesHubPagination(
  locale: HomegroundLocale,
  page: number,
) {
  const guides = getAllGuides(locale);
  const pageCount = Math.max(
    1,
    Math.ceil(guides.length / GUIDES_HUB_PAGE_SIZE),
  );

  if (!Number.isInteger(page) || page < 1 || page > pageCount) {
    throw new RangeError(`Unknown guides hub page: ${locale}/${page}.`);
  }

  const startIndex = (page - 1) * GUIDES_HUB_PAGE_SIZE;
  const pageGuides = guides.slice(
    startIndex,
    startIndex + GUIDES_HUB_PAGE_SIZE,
  );

  return {
    guides,
    page,
    pageCount,
    pageGuides,
    startIndex,
  };
}

export function getGuidesHubStaticPageNumbers(locale: HomegroundLocale) {
  return Array.from(
    { length: Math.max(0, getGuidesHubPageCount(locale) - 1) },
    (_, index) => index + 2,
  );
}

export function getGuidesHubPageLastModified(
  locale: HomegroundLocale,
  page: number,
) {
  const { pageGuides } = getGuidesHubPagination(locale, page);
  return pageGuides.reduce<string | undefined>((latest, guide) => {
    const candidate = guide.dateModified ?? guide.datePublished;
    return !latest || candidate > latest ? candidate : latest;
  }, undefined);
}

/**
 * Paginated catalog pages are first-class, indexable discovery URLs. Keep the
 * sitemap contract beside the route math so page counts, alternates and
 * lastmod can never drift apart.
 */
export function getGuidesHubIndexablePaginationPages() {
  return homegroundLocales.flatMap((locale) =>
    getGuidesHubStaticPageNumbers(locale).map((page) => ({
      locale,
      page,
      path: getGuidesHubPagePath(locale, page),
      lastModified: getGuidesHubPageLastModified(locale, page),
      languages: getGuidesHubPageAbsoluteLanguagePaths(page),
    })),
  );
}
