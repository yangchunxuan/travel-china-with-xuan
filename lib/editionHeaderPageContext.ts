import type { HomegroundPageContext } from "../components/HomegroundHeader";

/**
 * Which header item an edition page sits under, as on the English pages: the
 * hub is the exact page, and the pages beneath it (city pages, sights,
 * inspiration, tour collections, guide articles) mark the item as their
 * location. Every edition header uses this, so they mark the same items.
 */
export function editionHeaderPageContext(language: "fr" | "de" | "es" | "ar" | "ja", currentPath: string, onTourPage: boolean): HomegroundPageContext {
  const home = `/${language}/`;
  const guides = language === "es" ? "/es/guias/" : `${home}guides/`;
  if (onTourPage) return "tour";
  if (currentPath === home) return "home";
  if (currentPath === `${home}tours/`) return "tours";
  if (new RegExp(`^${home}tours/(?:multi-city|regions|seasonal)/$`, "u").test(currentPath)) return "tour-collection";
  if (currentPath.startsWith(`${home}services/`)) return "services";
  if (currentPath === guides) return "guides";
  if (currentPath.startsWith(guides)) return "guide";
  if (currentPath === `${home}explore/`) return "destinations";
  if (["destinations/", "sights/", "inspiration/"].some((section) => currentPath.startsWith(`${home}${section}`))) return "destination";
  if (currentPath === `${home}studio/`) return "studio";
  if (currentPath === `${home}company/`) return "company";
  return "content";
}
