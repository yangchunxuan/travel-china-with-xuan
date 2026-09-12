import type { GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";

/** Guide routes share their slug across languages; no article data is needed in navigation. */
export function getGuidePath(id: GuideId, locale: HomegroundLocale): string {
  return `${locale === "en" ? "" : `/${locale}`}/guides/${id}/`;
}
