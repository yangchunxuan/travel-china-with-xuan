// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import { schemaLocaleToHreflang, schemaLocaleToSiteLocale, siteLocaleToSchemaLocale } from "./constants.ts";
// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import type { HreflangCode, SchemaLocale, SiteLocale } from "./types.ts";

const localePrefixPattern = /^\/(?:en|zh|ko)(?=\/|$)/u;

export function isSafeContentPath(path: string): boolean {
  if (
    path.length === 0 ||
    path !== path.normalize("NFC") ||
    /[%\\\s\u0000-\u001f\u007f\uD800-\uDFFF]/u.test(path) ||
    path.includes("?") ||
    path.includes("#")
  ) {
    return false;
  }

  try {
    return !path.split("/").some((segment) => {
      const decoded = decodeURIComponent(segment);
      return (
        decoded === "." ||
        decoded === ".." ||
        decoded.includes("/") ||
        decoded.includes("\\")
      );
    });
  } catch {
    return false;
  }
}

function cleanPath(path: string): string {
  const withoutQueryOrHash = path.split(/[?#]/u, 1)[0] ?? "";
  const withLeadingSlash = withoutQueryOrHash.startsWith("/")
    ? withoutQueryOrHash
    : `/${withoutQueryOrHash}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/gu, "/");

  if (collapsed === "/") return "/";
  return `${collapsed.replace(/\/+$/u, "")}/`;
}

/**
 * Produces the public route shape used by the current site:
 * English at root, Simplified Chinese under /zh, and Korean under /ko.
 */
export function normalizeContentPath(locale: SiteLocale, path: string): string {
  const cleaned = cleanPath(path);
  const withoutLocale = cleaned.replace(localePrefixPattern, "") || "/";
  const normalizedLeaf = cleanPath(withoutLocale);

  if (locale === "en") return normalizedLeaf;
  if (normalizedLeaf === "/") return `/${locale}/`;
  return `/${locale}${normalizedLeaf}`;
}

export function siteLocaleForContentPath(path: string): SiteLocale {
  const cleaned = cleanPath(path);
  if (cleaned === "/zh/" || cleaned.startsWith("/zh/")) return "zh";
  if (cleaned === "/ko/" || cleaned.startsWith("/ko/")) return "ko";
  return "en";
}

export function expectedPathForSchemaLocale(
  locale: SchemaLocale,
  path: string,
): string {
  return normalizeContentPath(schemaLocaleToSiteLocale[locale], path);
}

export function isCanonicalLocalePath(locale: SchemaLocale, path: string): boolean {
  if (!isSafeContentPath(path)) return false;
  return path === expectedPathForSchemaLocale(locale, path);
}

export function toSchemaLocale(locale: SiteLocale): SchemaLocale {
  return siteLocaleToSchemaLocale[locale];
}

export function toSiteLocale(locale: SchemaLocale): SiteLocale {
  return schemaLocaleToSiteLocale[locale];
}

export function toHreflang(locale: SchemaLocale): HreflangCode {
  return schemaLocaleToHreflang[locale];
}
