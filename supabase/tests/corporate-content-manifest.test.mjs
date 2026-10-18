import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { buildCorporateTravelContentNodes } from "../../lib/corporateTravelContentAdapter.ts";
import { buildContentManifest, getIndexableManifestEntries } from "../../lib/content-system/manifest.ts";
import { corporateTrips } from "../../lib/corporateTravel.ts";
import { corporateHubTitle, corporateHubDescription } from "../../lib/corporateTravelHub.ts";
import { corporateHubPath, corporateTripPath } from "../../lib/corporateTravelTypes.ts";

const record = (data) => ({ schemaVersion: "1.0.0", recordType: "content-node", data });

test("company pages register the hub and two programmes in English, Chinese and Korean", async () => {
  const nodes = buildCorporateTravelContentNodes();
  const entityRecords = JSON.parse(await readFile(new URL("../../content/entities/core-places.json", import.meta.url), "utf8"));
  const servicesParent = {
    ...nodes[0], id: "hub-services", parentContentId: null,
    locales: { en: { ...nodes[0].locales.en, path: "/services/" }, "zh-Hans": { ...nodes[0].locales["zh-Hans"], path: "/zh/services/" }, ko: { ...nodes[0].locales.ko, path: "/ko/services/" } },
  };
  const manifest = buildContentManifest([...entityRecords, record(servicesParent), ...nodes.map(record)]);
  const entries = getIndexableManifestEntries(manifest).filter((entry) => entry.contentId.startsWith("corporate-travel"));
  const english = [corporateHubPath, ...corporateTrips.map((trip) => corporateTripPath(trip.slug))];
  const expected = english.flatMap((path) => [path, `/zh${path}`, `/ko${path}`]);
  assert.deepEqual(entries.map((entry) => entry.path).sort(), expected.sort());
  assert.equal(entries.length, 9);
  for (const entry of entries) {
    const source = english.find((path) => entry.path.endsWith(path) && [path, `/zh${path}`, `/ko${path}`].includes(entry.path));
    assert.equal(entry.family, "service");
    assert.equal(entry.section, "services");
    assert.deepEqual(entry.alternates, { en: source, "zh-Hans": `/zh${source}`, ko: `/ko${source}`, "x-default": source });
    assert.deepEqual(entry.dates, {});
  }
});

test("company metadata shares the rendered hub and trip sources", () => {
  const nodes = buildCorporateTravelContentNodes();
  assert.equal(nodes[0].locales.en.title, corporateHubTitle);
  assert.equal(nodes[0].locales["zh-Hans"].path, "/zh/corporate-travel/");
  assert.equal(nodes[0].locales.ko.path, "/ko/corporate-travel/");
  assert.equal(nodes[0].locales.en.description, corporateHubDescription);
  assert.equal(nodes[0].parentContentId, "hub-services");
  for (const trip of corporateTrips) {
    const node = nodes.find((candidate) => candidate.locales.en.path === corporateTripPath(trip.slug));
    assert.equal(node.parentContentId, "corporate-travel");
    assert.equal(node.locales.en.title, trip.seoTitle);
    assert.equal(node.locales.en.h1, trip.title);
    assert.equal(node.locales.en.description, trip.description);
  }
});
