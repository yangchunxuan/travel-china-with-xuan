import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { buildCorporateTravelContentNodes } from "../../lib/corporateTravelContentAdapter.ts";
import { buildContentManifest, getIndexableManifestEntries } from "../../lib/content-system/manifest.ts";
import { corporateTrips } from "../../lib/corporateTravel.ts";
import { corporateHubTitle, corporateHubDescription } from "../../lib/corporateTravelHub.ts";
import { corporateHubPath, corporateTripPath } from "../../lib/corporateTravelTypes.ts";

const record = (data) => ({ schemaVersion: "1.0.0", recordType: "content-node", data });

test("company pages register all nine core-locale service routes with valid entity references", async () => {
  const nodes = buildCorporateTravelContentNodes();
  const entityRecords = JSON.parse(await readFile(new URL("../../content/entities/core-places.json", import.meta.url), "utf8"));
  const servicesParent = {
    ...nodes[0], id: "hub-services", parentContentId: null,
    locales: { en: { ...nodes[0].locales.en, path: "/services/" } },
  };
  const manifest = buildContentManifest([...entityRecords, record(servicesParent), ...nodes.map(record)]);
  const entries = getIndexableManifestEntries(manifest).filter((entry) => entry.contentId.startsWith("corporate-travel"));
  const routes = [corporateHubPath, ...corporateTrips.map((trip) => corporateTripPath(trip.slug))];
  assert.deepEqual(entries.map((entry) => entry.path).sort(), ["", "/zh", "/ko"].flatMap(prefix => routes.map(path => prefix + path)).sort());
  assert.equal(entries.length, 9);
  for (const entry of entries) {
    assert.equal(entry.family, "service");
    assert.ok(["en", "zh", "ko"].includes(entry.locale));
    assert.equal(entry.section, "services");
    const english = entry.path.replace(/^\/(?:zh|ko)\//, "/");
    assert.deepEqual(entry.alternates, { en: english, "zh-Hans": `/zh${english}`, ko: `/ko${english}`, "x-default": english });
    assert.deepEqual(entry.dates, {});
  }
});

test("company metadata shares the rendered hub and trip sources", () => {
  const nodes = buildCorporateTravelContentNodes();
  assert.equal(nodes[0].locales.en.title, corporateHubTitle);
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
