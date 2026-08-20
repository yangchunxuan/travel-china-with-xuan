import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const packageRoot = "docs/organic-growth/china-planning-hub-system";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

async function json(path) {
  return JSON.parse(await source(path));
}

function h2Count(markdown) {
  return markdown.match(/^## /gm)?.length ?? 0;
}

function localLinkCount(markdown) {
  return markdown.match(/\]\(\//g)?.length ?? 0;
}

test("planning Hub package contains the reviewable docs-only deliverables", async () => {
  const rootFiles = await readdir(new URL(`../../${packageRoot}/`, import.meta.url));

  for (const required of [
    "README.md",
    "canonical-boundaries.md",
    "internal-link-graph.json",
    "journey-and-cta-map.md",
    "planning-content-audit.md",
    "qa.md",
    "china-travel-guide",
    "china-itinerary-first-trip",
    "route-reality",
  ]) {
    assert.ok(rootFiles.includes(required), `missing ${required}`);
  }

  for (const hub of ["china-travel-guide", "china-itinerary-first-trip"]) {
    const files = await readdir(
      new URL(`../../${packageRoot}/${hub}/`, import.meta.url),
    );
    for (const required of [
      "draft-metadata.json",
      "hub.en.md",
      "hub.zh.md",
      "hub.ko.md",
      "image-plan.md",
      "internal-links.md",
      "qa.md",
      "query-boundary.md",
      "source-log.md",
    ]) {
      assert.ok(files.includes(required), `${hub} is missing ${required}`);
    }
  }
});

test("the two national intents update existing canonicals", async () => {
  const [travel, itinerary, boundary, graph] = await Promise.all([
    json(`${packageRoot}/china-travel-guide/draft-metadata.json`),
    json(`${packageRoot}/china-itinerary-first-trip/draft-metadata.json`),
    source(`${packageRoot}/canonical-boundaries.md`),
    json(`${packageRoot}/internal-link-graph.json`),
  ]);

  assert.equal(travel.draftOnly, true);
  assert.equal(itinerary.draftOnly, true);
  assert.equal(travel.contentOwner, "system-guides");
  assert.equal(itinerary.contentOwner, "hub-plan");
  assert.deepEqual(
    Object.values(travel.locales).map(({ path }) => path),
    ["/guides/", "/zh/guides/", "/ko/guides/"],
  );
  assert.deepEqual(
    Object.values(itinerary.locales).map(({ path }) => path),
    ["/plan/", "/zh/plan/", "/ko/plan/"],
  );
  assert.equal(travel.publicRouteRealityCheckerAuthorized, false);
  assert.equal(itinerary.publicRouteRealityCheckerAuthorized, false);
  assert.match(boundary, /Pages that must not be created/);
  assert.match(boundary, /`\/china-travel-guide\/`/);
  assert.match(boundary, /`\/china-itinerary\/`/);
  assert.equal(graph.implementationAuthorized, false);
  assert.equal(
    graph.nodes.find(({ id }) => id === "route-reality-v2")?.path,
    null,
  );
  assert.equal(
    graph.nodes.find(({ id }) => id === "hub-culture")?.path,
    "/culture/",
  );
  assert.ok(
    graph.edges.some(
      ({ from, to }) => from === "system-guides" && to === "hub-culture",
    ),
  );
  assert.equal(
    graph.generationRule,
    "No node or edge is generated from city, month, duration, passport or traveller-type combinations.",
  );
});

test("both Hub drafts keep trilingual structure and service boundaries", async () => {
  const travelBodies = await Promise.all(
    ["en", "zh", "ko"].map((locale) =>
      source(`${packageRoot}/china-travel-guide/hub.${locale}.md`),
    ),
  );
  const itineraryBodies = await Promise.all(
    ["en", "zh", "ko"].map((locale) =>
      source(`${packageRoot}/china-itinerary-first-trip/hub.${locale}.md`),
    ),
  );

  assert.deepEqual(travelBodies.map(h2Count), [9, 9, 9]);
  assert.deepEqual(travelBodies.map(localLinkCount), [31, 31, 31]);
  assert.deepEqual(itineraryBodies.map(h2Count), [10, 10, 10]);
  assert.deepEqual(itineraryBodies.map(localLinkCount), [17, 17, 17]);

  for (const body of [...travelBodies, ...itineraryBodies]) {
    assert.match(body, /publicRouteRealityCheckerAuthorized: false/);
    assert.match(body, /contentOwner: (?:system-guides|hub-plan)/);
    assert.match(body, /china-itinerary-review/);
    assert.doesNotMatch(body, /US\$69|US\$129|Buy now|Book now|Checkout now/iu);
    assert.doesNotMatch(body, /publicRouteRealityCheckerAuthorized: true/);
    assert.doesNotMatch(body, /Route Reality Checker/);
  }
});

test("Route Reality v2 has a strict seven-field input and a discriminated output", async () => {
  const schema = await json(`${packageRoot}/route-reality/data-model.schema.json`);
  const input = schema.$defs.RouteRealityInput;
  const required = [
    "totalNights",
    "arrivalWindow",
    "departureWindow",
    "crossCityMoves",
    "airportStationTransfers",
    "hotelChanges",
    "travellerPace",
  ];

  assert.equal(input.type, "object");
  assert.equal(input.additionalProperties, false);
  assert.deepEqual(input.required, required);
  assert.deepEqual(Object.keys(input.properties), required);
  assert.ok(schema.$defs.ValidationCode.enum.includes("MISSING_FIELD"));
  assert.ok(schema.$defs.ValidationCode.enum.includes("EXTRA_FIELD"));
  assert.ok(schema.$defs.ValidationCode.enum.includes("EVENT_TOPOLOGY_OVERFLOW"));

  const schemaText = JSON.stringify(schema);
  assert.match(schemaText, /route-reality-v2\.0\.0-internal-draft/);
  assert.match(schemaText, /possible_unknown_extreme/);
  assert.match(schemaText, /grossTransferBurden/);
  assert.match(schemaText, /appliedTransferTax/);
  assert.match(schemaText, /netSightseeing/);
  assert.match(schemaText, /insufficient_input/);
  for (const outputDef of [schema.$defs.ValidOutput, schema.$defs.InvalidOutput]) {
    assert.ok(outputDef.required.includes("policyPackVersion"));
    assert.equal(
      outputDef.properties.policyPackVersion.$ref,
      "#/$defs/PendingPolicyPackVersion",
    );
  }
  assert.equal(schema.$defs.PendingPolicyPackVersion.type, "null");
});

test("Route Reality fixtures cover boundaries, unknowns, invalid input and properties", async () => {
  const fixtures = await json(`${packageRoot}/route-reality/internal-examples.json`);

  assert.equal(fixtures.modelVersion, "route-reality-v2.0.0-internal-draft");
  assert.ok(fixtures.scenarios.length >= 20);
  assert.equal(
    new Set(fixtures.scenarios.map(({ id }) => id)).size,
    fixtures.scenarios.length,
  );

  for (const group of [
    "boundary",
    "unknown-range",
    "invalid-scalar",
    "shape",
    "relational-topology",
    "classification-reconciliation",
    "burden-accounting",
    "determinism",
    "privacy-network",
    "legacy-regression",
    "handoff-routing",
  ]) {
    assert.ok(
      fixtures.scenarios.some((scenario) => scenario.group === group),
      `missing fixture group ${group}`,
    );
  }

  const allUnknown = fixtures.scenarios.find(({ id }) => id === "UNK-01");
  assert.equal(allUnknown.expected.status, "insufficient_input");
  assert.equal(allUnknown.expected.decisionUseful, false);
  assert.equal(allUnknown.expected.suggestedBufferDays, null);
  assert.equal(allUnknown.expected.bufferActionable, false);
});

test("Route Reality disposition closes contract blockers without authorizing a product", async () => {
  const [readme, rules, disposition, handoff] = await Promise.all([
    source(`${packageRoot}/route-reality/README.md`),
    source(`${packageRoot}/route-reality/rules.md`),
    source(`${packageRoot}/route-reality/technical-review-disposition.md`),
    source(`${packageRoot}/route-reality/handoff.md`),
  ]);

  for (let index = 1; index <= 10; index += 1) {
    assert.match(disposition, new RegExp(`B${String(index).padStart(2, "0")}`));
  }
  for (let index = 1; index <= 12; index += 1) {
    assert.match(disposition, new RegExp(`R${String(index).padStart(2, "0")}`));
  }

  const combined = `${readme}\n${rules}\n${disposition}\n${handoff}`;
  assert.match(combined, /PUBLIC IMPLEMENTATION NOT AUTHORIZED/);
  assert.match(combined, /zero network|zero attempted network/iu);
  assert.match(combined, /persist|storage/iu);
  assert.match(combined, /city × nights × traveller-type|city × month × duration/iu);
  assert.doesNotMatch(combined, /publicImplementationAuthorized\s*[:=]\s*true/iu);
  assert.doesNotMatch(combined, /indexablePageAuthorized\s*[:=]\s*true/iu);
});
