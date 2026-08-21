import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";

import {
  createGuideEntityCoverageReport,
  generateGuideEntityCoverage,
  parseLegacyGuideEntries,
  strictModeExitCode,
} from "../../tools/check-guide-entity-coverage.mjs";

const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(import.meta.dirname, "../..");
const checkerPath = path.join(projectRoot, "tools/check-guide-entity-coverage.mjs");

function legacyRegistrySource(destinations) {
  return [
    "",
    "export const legacyGuideRegistry = [",
    "  {",
    '    id: "legacy-one",',
    "    destinations: " + JSON.stringify(destinations) + ",",
    "  },",
    "] as const satisfies readonly GuideEntry[];",
    "",
  ].join("\n");
}

test("entity coverage includes the complete generated plus legacy runtime ledger", async () => {
  const report = await generateGuideEntityCoverage();
  assert.deepEqual(report.scope, {
    runtimeGuideCount: 176,
    independentGuideCount: 157,
    legacyGuideCount: 19,
  });
  assert.equal(report.guideCount, 176);
  assert.equal(report.controlledTokenCount, 36);
  assert.equal(report.guideWithUnmappedTokenCount, 72);
  assert.equal(report.countryFallbackGuideCount, 7);
  assert.equal(report.countryOnlyWithUnmappedTokenCount, 10);
  assert.equal(report.unmappedTokenCount, 117);
  assert.equal(strictModeExitCode(report), 1);
  assert.equal(report.rows.filter((row) => row.scope === "legacy").length, 19);
  assert.ok(report.rows.some((row) =>
    row.contentId === "guide-do-us-citizens-need-visa-china-2026" &&
    row.scope === "legacy" &&
    row.entityIds.includes("country-china")
  ));
});

test("country-only local gaps remain visible when metadata also names China", () => {
  const report = createGuideEntityCoverageReport([{
    id: "masked-local-gap",
    destinations: ["china", "unmapped-local-place"],
    scope: "independent",
  }]);
  assert.equal(report.countryFallbackGuideCount, 0);
  assert.equal(report.countryOnlyWithUnmappedTokenCount, 1);
  assert.equal(report.guideWithUnmappedTokenCount, 1);
});

test("legacy registry extraction fails closed on non-literal coverage data", () => {
  assert.deepEqual(parseLegacyGuideEntries(legacyRegistrySource(["china"])), [{
    id: "legacy-one",
    destinations: ["china"],
    scope: "legacy",
  }]);
  const nonLiteralSource = [
    'const inheritedDestinations = ["china"];',
    "export const legacyGuideRegistry = [",
    '  { id: "legacy-one", destinations: inheritedDestinations },',
    "] as const satisfies readonly GuideEntry[];",
  ].join("\n");
  assert.throws(
    () => parseLegacyGuideEntries(nonLiteralSource),
    /destinations must be a string-literal array/u,
  );
});

test("CLI strict mode fails on unmapped debt while the default inventory remains readable", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "homeground-guide-entities-"));
  const guideRoot = path.join(root, "guides");
  const independentRoot = path.join(guideRoot, "independent-one");
  const legacyRegistryPath = path.join(root, "guideRegistry.ts");
  await mkdir(independentRoot, { recursive: true });
  await writeFile(
    path.join(independentRoot, "metadata.json"),
    JSON.stringify({
      id: "independent-one",
      destinations: ["beijing"],
    }),
    "utf8",
  );
  await writeFile(legacyRegistryPath, legacyRegistrySource(["unmapped-place"]), "utf8");

  const commonArguments = [
    "--experimental-strip-types",
    "--no-warnings",
    checkerPath,
    "--guides-root",
    guideRoot,
    "--legacy-registry",
    legacyRegistryPath,
  ];
  const inventory = await execFileAsync(process.execPath, commonArguments, {
    cwd: projectRoot,
    maxBuffer: 1024 * 1024,
  });
  const report = JSON.parse(inventory.stdout);
  assert.deepEqual(report.scope, {
    runtimeGuideCount: 2,
    independentGuideCount: 1,
    legacyGuideCount: 1,
  });
  assert.equal(report.guideWithUnmappedTokenCount, 1);

  await assert.rejects(
    execFileAsync(process.execPath, [...commonArguments, "--strict"], {
      cwd: projectRoot,
      maxBuffer: 1024 * 1024,
    }),
    (error) => {
      assert.equal(error.code, 1);
      assert.equal(JSON.parse(error.stdout).guideWithUnmappedTokenCount, 1);
      return true;
    },
  );

  await writeFile(legacyRegistryPath, legacyRegistrySource(["china"]), "utf8");
  const strictPass = await execFileAsync(
    process.execPath,
    [...commonArguments, "--strict"],
    { cwd: projectRoot, maxBuffer: 1024 * 1024 },
  );
  assert.equal(JSON.parse(strictPass.stdout).guideWithUnmappedTokenCount, 0);
});
