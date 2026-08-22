import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import {
  criticalFreshnessPillars,
  destinationEntityIds,
  guideFreshnessByPillar,
  guideFreshnessMinimums,
  guideUpdatePolicy,
  resolveGuideEntities,
  searchMapGuideFreshnessMinimums,
} from "../../lib/searchPlatformGuidePolicy.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const volatilityRank = { low: 0, medium: 1, high: 2, critical: 3 };

function parseLegacyFreshnessInputs(source) {
  const start = source.indexOf("export const legacyGuideRegistry");
  const end = source.indexOf("] as const satisfies readonly GuideEntry[];", start);
  assert.ok(start >= 0 && end > start, "legacy guide registry source markers");
  const registry = source.slice(start, end);
  const matches = [...registry.matchAll(/^    id: "([^"]+)",/gmu)];
  return matches.map((match, index) => {
    const entryStart = match.index;
    const entryEnd = matches[index + 1]?.index ?? registry.length;
    const entry = registry.slice(entryStart, entryEnd);
    const pillar = entry.match(/pillar: "([^"]+)"/u)?.[1];
    const topicsSource = entry.match(/topics: \[([\s\S]*?)\]/u)?.[1];
    assert.ok(pillar, `${match[1]} legacy pillar`);
    assert.ok(topicsSource !== undefined, `${match[1]} legacy topics`);
    return {
      id: match[1],
      pillar,
      topics: [...topicsSource.matchAll(/"([^"]+)"/gu)].map((topic) => topic[1]),
    };
  });
}

async function loadRuntimeFreshnessInputs() {
  const guideRoot = path.join(projectRoot, "content/guides");
  const directories = (await readdir(guideRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const independent = await Promise.all(directories.map(async (directory) => {
    const metadata = JSON.parse(await readFile(
      path.join(guideRoot, directory, "metadata.json"),
      "utf8",
    ));
    return {
      id: metadata.id,
      pillar: metadata.pillar,
      topics: metadata.topics,
    };
  }));
  const legacy = parseLegacyFreshnessInputs(
    await readFile(path.join(projectRoot, "lib/guideRegistry.ts"), "utf8"),
  );
  return new Map([...legacy, ...independent].map((guide) => [guide.id, guide]));
}

function parseSearchMapFreshness(source) {
  const start = source.indexOf("## 3. 已发布清单");
  const end = source.indexOf("## 4.", start);
  assert.ok(start >= 0 && end > start, "published Search Map table markers");
  const rows = new Map();
  for (const line of source.slice(start, end).split(/\r?\n/u)) {
    const match = line.match(
      /^\| `([^`]+)` \|.*\| (low|medium|high|critical) \/[^|]+\|$/u,
    );
    if (match) rows.set(match[1], match[2]);
  }
  return rows;
}

test("controlled destination tokens resolve to registered entity ids", async () => {
  const records = JSON.parse(
    await readFile(path.join(projectRoot, "content/entities/core-places.json"), "utf8"),
  );
  const registeredIds = new Set(records.map((record) => record.data.id));
  for (const entityId of Object.values(destinationEntityIds)) {
    assert.ok(registeredIds.has(entityId), `unregistered entity: ${entityId}`);
  }

  assert.deepEqual(resolveGuideEntities(["guangzhou"]), {
    entityIds: ["city-guangzhou"],
    unmappedTokens: [],
    usedCountryFallback: false,
  });
  assert.deepEqual(resolveGuideEntities(["china", "guangzhou", "guangzhou"]), {
    entityIds: ["country-china", "city-guangzhou"],
    unmappedTokens: [],
    usedCountryFallback: false,
  });
});

test("unknown place tokens are explicit even while the compatibility fallback remains", () => {
  assert.deepEqual(resolveGuideEntities(["unapproved-place"]), {
    entityIds: ["country-china"],
    unmappedTokens: ["unapproved-place"],
    usedCountryFallback: true,
  });
  assert.deepEqual(resolveGuideEntities(["beijing", "unapproved-place"]), {
    entityIds: ["city-beijing"],
    unmappedTokens: ["unapproved-place"],
    usedCountryFallback: false,
  });
});

test("all six Guangzhou hub support guides resolve the Guangzhou entity", async () => {
  const ids = [
    "guangzhou-baiyun-airport-t2-t3",
    "guangzhou-hong-kong-transport-route",
    "guangzhou-macau-transport-route",
    "guangzhou-shenzhen-hong-kong-route-order",
    "how-guangzhou-morning-tea-works",
    "when-metro-construction-meets-archaeology",
  ];
  for (const id of ids) {
    const metadata = JSON.parse(await readFile(
      path.join(projectRoot, "content/guides", id, "metadata.json"),
      "utf8",
    ));
    assert.ok(metadata.destinations.includes("guangzhou"), id);
    assert.ok(resolveGuideEntities(metadata.destinations).entityIds.includes("city-guangzhou"), id);
  }
});

test("freshness registry exhaustively covers the runtime pillar vocabulary", async () => {
  const runtime = await loadRuntimeFreshnessInputs();
  assert.equal(runtime.size, 181);
  const runtimePillars = [...new Set(
    [...runtime.values()].map((guide) => guide.pillar),
  )].sort();
  assert.deepEqual(runtimePillars, Object.keys(guideFreshnessByPillar).sort());
  assert.deepEqual(
    [...criticalFreshnessPillars].sort(),
    Object.entries(guideFreshnessByPillar)
      .filter(([, volatility]) => volatility === "critical")
      .map(([pillar]) => pillar)
      .sort(),
  );
  for (const guide of runtime.values()) {
    assert.doesNotThrow(() => guideUpdatePolicy(guide), guide.id);
  }
  assert.throws(
    () => guideUpdatePolicy({
      id: "future-guide",
      pillar: "unreviewed-new-pillar",
      topics: [],
    }),
    /Unknown guide freshness pillar: unreviewed-new-pillar/u,
  );
});

test("published Search Map freshness decisions cannot be downgraded", async () => {
  const searchMapRows = parseSearchMapFreshness(
    await readFile(
      path.join(projectRoot, "docs/organic-growth/search-map-2026-08-11.md"),
      "utf8",
    ),
  );
  assert.equal(searchMapRows.get("system-entry-requirements"), "critical");
  searchMapRows.delete("system-entry-requirements");
  assert.deepEqual(
    Object.fromEntries([...searchMapRows.entries()].sort()),
    Object.fromEntries(Object.entries(searchMapGuideFreshnessMinimums).sort()),
  );

  const runtime = await loadRuntimeFreshnessInputs();
  for (const [id, minimum] of searchMapRows) {
    const guide = runtime.get(id);
    assert.ok(guide, `Search Map guide missing from runtime registry: ${id}`);
    const policy = guideUpdatePolicy(guide);
    assert.ok(
      volatilityRank[policy.volatility] >= volatilityRank[minimum],
      `${id}: ${policy.volatility} must not be below Search Map ${minimum}`,
    );
  }
});

test("explicit high-risk minima cover safety, accessibility, airline and dynamic visitor guides", async () => {
  const runtime = await loadRuntimeFreshnessInputs();
  const ids = [
    "china-accessible-hotel-room-verification",
    "china-domestic-flight-fare-bundle-baggage",
    "china-hotel-emergency-exit-fire-safety-check",
    "great-wall-section-selector-from-beijing",
    "lunar-new-year-customs-for-visitors",
    "wheelchair-accessible-china-route-planning",
  ];
  for (const id of ids) {
    assert.equal(guideFreshnessMinimums[id], "high");
    assert.equal(guideUpdatePolicy(runtime.get(id)).volatility, "high", id);
  }
});

test("freshness policy is deterministic and does not fabricate verification dates", () => {
  const critical = guideUpdatePolicy({
    id: "unlisted-entry-guide",
    pillar: "entry-practicalities",
    topics: [],
  });
  assert.deepEqual(critical, {
    volatility: "critical",
    refreshCadence: "on-source-change",
    owner: "homeground-editorial",
  });
  const dynamic = guideUpdatePolicy({
    id: "unlisted-ticket-guide",
    pillar: "culture-history-people-ideas",
    topics: ["Museum-Ticket-Booking"],
  });
  assert.equal(dynamic.volatility, "high");
  const stableInput = {
    id: "unlisted-history-guide",
    pillar: "culture-history-people-ideas",
    topics: ["urban-history"],
  };
  const stable = guideUpdatePolicy(stableInput);
  assert.deepEqual(stable, {
    volatility: "low",
    refreshCadence: "quarterly",
    owner: "homeground-editorial",
  });
  assert.deepEqual(guideUpdatePolicy(stableInput), stable);
  assert.equal("lastVerified" in stable, false);
  assert.equal("nextReviewAt" in stable, false);
  assert.equal("dateModified" in stable, false);
});
