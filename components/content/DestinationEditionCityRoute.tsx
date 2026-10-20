import { notFound } from "next/navigation";
import { destinationEditionCityShape, loadDestinationEditionCity } from "../../lib/destinationEditionContent";
import { buildDestinationEditionCityMetadata } from "../../lib/destinationEditionMetadata";
import { destinationEditionCityIds, hasDestinationEditionCity, type DestinationEditionLocale } from "../../lib/destinationEditions";
import { getDestinationHub } from "../../lib/destinationHubs";
import { projectDestinationStayExample } from "../../lib/destinationOverviewProjection";
import { loadDestinationHubBody } from "../../lib/destinationHubRuntime";
import { DestinationHubPage } from "./DestinationHubPage";

/*
 * The route of an edition's city pages, app/(<group>)/<language>/destinations/[city]/page.tsx,
 * which tools/generate-destination-edition-registry.mjs writes for each language
 * with content. Its pages are the cities with a content file
 * (content/destinations/<city>/edition.<language>.ts); each renders the English
 * city page's component in the edition's words.
 */

export function destinationEditionCityParams(language: DestinationEditionLocale) {
  return destinationEditionCityIds(language).map((city) => ({ city }));
}

async function load(language: DestinationEditionLocale, city: string) {
  if (!hasDestinationEditionCity(language, city)) notFound();
  const body = await loadDestinationHubBody(city, "en");
  const shape = destinationEditionCityShape(getDestinationHub(city), projectDestinationStayExample(body, city), body, city);
  const content = await loadDestinationEditionCity(language, city, shape);
  return { city, body, content };
}

export async function destinationEditionCityMetadata(language: DestinationEditionLocale, city: string) {
  const page = await load(language, city);
  return buildDestinationEditionCityMetadata(language, page.city, page.content);
}

export async function DestinationEditionCityRoute({ language, city }: { language: DestinationEditionLocale; city: string }) {
  const page = await load(language, city);
  return <DestinationHubPage body={page.body} edition={page.content} editionLocale={language} hubId={page.city} locale="en" />;
}
