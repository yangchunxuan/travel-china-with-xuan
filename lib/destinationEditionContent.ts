import type { CityOpening, CityOverviewCard } from "./cityOverview";
import type { PageBodyBlock, StructuredPageBody } from "./content-system/page-body";
import type { DestinationEditionLocale } from "./destinationEditions";
import type { DestinationGeographyCopy, DestinationHubEntry, DestinationHubId } from "./destinationHubs";
import type { DestinationOverviewSignalId } from "./destinationOverviewProjection";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { generatedDestinationEditionLoaders } from "./destinationEditionLoaders.generated.ts";

/**
 * A city page in an edition language: everything the English page renders
 * for that city, translated (lib/destinationHubs.ts for the hero and the map,
 * lib/cityOverview.ts for the four decisions and the opening, and the parts of
 * content/destinations/<city>/body.en.ts the page projects). Facts, numbers,
 * dates, station and airport codes stay as the English states them; images,
 * coordinates, dates of review, tours and links come from the English data.
 * One file per language and city: content/destinations/<city>/edition.<language>.ts.
 */
export interface DestinationEditionCityContent {
  /** The page title, without the brand (the edition's metadata builder adds it). */
  readonly title: string;
  readonly h1: string;
  readonly description: string;
  readonly summary: string;
  readonly heroAlt: string;
  readonly heroCaption: string;
  /** The geography diagram: title, caption, legend and one label and note per node of the English map. */
  readonly geography: DestinationGeographyCopy;
  /** The four city decisions: a one-line answer, then why. */
  readonly overview: Readonly<Record<DestinationOverviewSignalId, CityOverviewCard>>;
  /** Why the city belongs on a first trip, under the map. */
  readonly opening: CityOpening;
  /** The English page's stay example (Shanghai, Chengdu, Chongqing), block for block with the same ids and types. */
  readonly stayExample?: readonly PageBodyBlock[];
  /** Shanghai's day-trip links, item for item; each link follows the English one. */
  readonly dayTripLinks?: {
    readonly title: string;
    readonly items: readonly { readonly label: string; readonly description?: string }[];
  };
  /** The sources the page lists, by URL, in the reader's language. */
  readonly sources: Readonly<Record<string, { readonly label: string; readonly publisher?: string }>>;
  /** The titles of the guides under "More on <city>", by guide id. */
  readonly guides: Readonly<Record<string, string>>;
}

const signalIds = ["nights", "stay", "gateway", "next"] as const;

/** The parts of the English page the edition content must match, block for block and key for key. */
export interface DestinationEditionCityShape {
  readonly geometryIds: readonly string[];
  readonly stayExample: readonly PageBodyBlock[];
  readonly dayTripLinks?: Extract<PageBodyBlock, { type: "internal-links" }>;
  readonly sourceUrls: readonly string[];
  readonly guideIds: readonly string[];
}

/** The English page's shape for one city, from the hub registry and the English body. */
export function destinationEditionCityShape(
  hub: Pick<DestinationHubEntry, "geometry" | "supportGuideIds">,
  stayExample: StructuredPageBody,
  body: StructuredPageBody,
  hubId: DestinationHubId,
): DestinationEditionCityShape {
  const seen = new Set<string>();
  const sourceUrls = body.blocks
    .flatMap((block) => (block.type === "sources" ? block.items.map((item) => item.url) : []))
    .filter((url) => (seen.has(url) ? false : (seen.add(url), true)))
    .slice(0, 4);
  const dayTrip = hubId === "shanghai" ? body.blocks.find((block) => block.id === "delta-day-trip-links") : undefined;
  return {
    geometryIds: hub.geometry.map((node) => node.id),
    stayExample: stayExample.blocks,
    ...(dayTrip?.type === "internal-links" ? { dayTripLinks: dayTrip } : {}),
    sourceUrls,
    guideIds: hub.supportGuideIds.slice(0, 6),
  };
}

const text = (value: unknown) => typeof value === "string" && value.trim().length > 0 && value === value.trim();

/**
 * Throws unless `value` is complete for the English page's shape: every field
 * filled, one map label per node, the stay example and day-trip links block
 * for block, one entry per listed source and guide, nothing extra. The build
 * runs it on every page, and the edition test on every file.
 */
export function assertDestinationEditionCityContent(
  value: unknown,
  shape: DestinationEditionCityShape,
  where: string,
): DestinationEditionCityContent {
  const fail = (message: string): never => {
    throw new Error(`${where}: ${message}`);
  };
  if (!value || typeof value !== "object") fail("not an object");
  const content = value as DestinationEditionCityContent;
  const allowed = new Set(["title", "h1", "description", "summary", "heroAlt", "heroCaption", "geography", "overview", "opening", "stayExample", "dayTripLinks", "sources", "guides"]);
  for (const key of Object.keys(content)) if (!allowed.has(key)) fail(`unknown field ${key}`);
  for (const key of ["title", "h1", "description", "summary", "heroAlt", "heroCaption"] as const) {
    if (!text(content[key])) fail(`${key} is missing`);
  }
  const geography = content.geography;
  if (!geography || !text(geography.title) || !text(geography.caption)) fail("geography title or caption is missing");
  for (const kind of ["core", "cluster", "outside", "gateway"] as const) {
    if (!text(geography.legend?.[kind])) fail(`geography legend ${kind} is missing`);
  }
  const nodeIds = Object.keys(geography.nodes ?? {});
  if (nodeIds.sort().join() !== [...shape.geometryIds].sort().join()) fail(`geography nodes ${nodeIds.join()} differ from ${shape.geometryIds.join()}`);
  for (const id of nodeIds) {
    if (!text(geography.nodes[id].label) || !text(geography.nodes[id].note)) fail(`geography node ${id} is missing a label or note`);
  }
  for (const id of signalIds) {
    if (!text(content.overview?.[id]?.answer) || !text(content.overview?.[id]?.detail)) fail(`overview ${id} is missing`);
  }
  if (Object.keys(content.overview ?? {}).length !== signalIds.length) fail("overview has extra cards");
  if (!text(content.opening?.heading) || !content.opening.paragraphs?.length || !content.opening.paragraphs.every(text)) fail("opening is missing");
  const stay = content.stayExample ?? [];
  if (stay.length !== shape.stayExample.length) fail(`stayExample has ${stay.length} blocks, English has ${shape.stayExample.length}`);
  stay.forEach((block, index) => {
    const english = shape.stayExample[index];
    if (block.id !== english.id || block.type !== english.type) fail(`stayExample block ${index} is ${block.id}/${block.type}, English is ${english.id}/${english.type}`);
    if (block.type === "heading" && english.type === "heading" && (block.level !== english.level || !text(block.text))) fail(`stayExample ${block.id}`);
    if (block.type === "paragraph" && (!text(block.text) || "link" in block)) fail(`stayExample ${block.id}`);
    if (block.type === "list" && english.type === "list" && (block.items.length !== english.items.length || Boolean(block.ordered) !== Boolean(english.ordered) || !block.items.every(text))) fail(`stayExample ${block.id}`);
    if (block.type === "table" && english.type === "table") {
      if (!text(block.caption) || block.columns.length !== english.columns.length || !block.columns.every(text)) fail(`stayExample ${block.id} caption or columns`);
      if (block.rows.length !== english.rows.length || block.rows.some((row, rowIndex) => row.length !== english.rows[rowIndex].length || !row.every(text))) fail(`stayExample ${block.id} rows`);
      if (block.rowLinks) fail(`stayExample ${block.id} must not add row links`);
    }
    if (!["heading", "paragraph", "list", "table"].includes(block.type)) fail(`stayExample ${block.id} has an unsupported type`);
  });
  if (Boolean(content.dayTripLinks) !== Boolean(shape.dayTripLinks)) fail("dayTripLinks must exist exactly when English has them");
  if (content.dayTripLinks && shape.dayTripLinks) {
    if (!text(content.dayTripLinks.title) || content.dayTripLinks.items.length !== shape.dayTripLinks.items.length) fail("dayTripLinks items");
    content.dayTripLinks.items.forEach((item, index) => {
      if (!text(item.label) || Boolean(item.description) !== Boolean(shape.dayTripLinks!.items[index].description) || (item.description !== undefined && !text(item.description))) fail(`dayTripLinks item ${index}`);
    });
  }
  const sources = Object.keys(content.sources ?? {});
  if (sources.sort().join() !== [...shape.sourceUrls].sort().join()) fail(`sources ${sources.join()} differ from ${shape.sourceUrls.join()}`);
  for (const url of sources) {
    const source = content.sources[url];
    if (!text(source.label) || (source.publisher !== undefined && !text(source.publisher))) fail(`source ${url}`);
  }
  const guides = Object.keys(content.guides ?? {});
  if (guides.sort().join() !== [...shape.guideIds].sort().join()) fail(`guides ${guides.join()} differ from ${shape.guideIds.join()}`);
  if (!guides.every((id) => text(content.guides[id]))) fail("a guide title is missing");
  return content;
}

type Loader = () => Promise<{ readonly default: unknown }>;

/** Loads a city's content in an edition language (the generated loaders follow the content files). */
export async function loadDestinationEditionCity(
  language: DestinationEditionLocale,
  city: DestinationHubId,
  shape: DestinationEditionCityShape,
) {
  const loader = (generatedDestinationEditionLoaders[language] as Partial<Record<DestinationHubId, Loader>>)[city];
  if (!loader) throw new Error(`No ${language} content for ${city}: add content/destinations/${city}/edition.${language}.ts.`);
  const module = await loader();
  return assertDestinationEditionCityContent(module.default, shape, `content/destinations/${city}/edition.${language}.ts`);
}
