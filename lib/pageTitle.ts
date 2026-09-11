import type { HomegroundLocale } from "./homegroundI18n.ts";

const BRAND_SUFFIX = " — Homeground China";

/**
 * Search results truncate <title> at roughly 60 Latin characters or
 * 30 CJK characters. The layouts append " — Homeground China" through the
 * title template; when the page title plus that suffix would overflow,
 * return an absolute title so the suffix is dropped and the descriptive part
 * survives. The brand still reaches crawlers through og:site_name and JSON-LD.
 */
export function resolvePageTitle(
  title: string,
  locale: HomegroundLocale,
): string | { absolute: string } {
  const trimmed = title.trim();
  const limit = locale === "en" ? 60 : 30;
  const suffixCost = locale === "en" ? BRAND_SUFFIX.length : 10;
  return trimmed.length + suffixCost > limit ? { absolute: trimmed } : trimmed;
}
