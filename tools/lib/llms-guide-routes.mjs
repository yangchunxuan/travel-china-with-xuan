// Every published guide page, per language, from the registries that publish
// them: llms.txt lists each one with its own lead sentence. Korean and Japanese
// are left out on purpose (not maintained).
import { guideRegistry } from "../../lib/guideRegistry.ts";
import { reservationGuideEditionPath, reservationGuideEditionSlugs } from "../../lib/reservationGuideEditionPaths.ts";
import { spanishGuidePath, spanishGuides } from "../../lib/spanishGuides.ts";

export const llmsGuideLanguages = ["en", "zh", "es", "fr", "de", "ar"];

const registryPaths = (locale) => guideRegistry.flatMap((guide) => (guide.locales[locale] ? [guide.locales[locale].path] : []));
const editionPaths = (language) => reservationGuideEditionSlugs.map((slug) => reservationGuideEditionPath(language, slug));

/** Guide routes by language, in registry order. */
export function publishedGuideRoutes() {
  return {
    en: registryPaths("en"),
    zh: registryPaths("zh"),
    es: [...spanishGuides.map((guide) => spanishGuidePath(guide.slug)), ...editionPaths("es")],
    fr: editionPaths("fr"),
    de: editionPaths("de"),
    ar: editionPaths("ar"),
  };
}

/** The folder that holds a language's guides in the export, and the folders there that are not guides. */
export const guideExportFolders = {
  en: { folder: "guides", notGuides: ["page", "search", "china-entry-requirements"] },
  zh: { folder: "zh/guides", notGuides: ["page", "search", "china-entry-requirements"] },
  es: { folder: "es/guias", notGuides: ["page", "china-entry-requirements"] },
  fr: { folder: "fr/guides", notGuides: ["china-entry-requirements"] },
  de: { folder: "de/guides", notGuides: ["china-entry-requirements"] },
  ar: { folder: "ar/guides", notGuides: ["china-entry-requirements"] },
};
