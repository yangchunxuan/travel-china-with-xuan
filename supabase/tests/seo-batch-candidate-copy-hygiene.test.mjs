import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const locales = ["en", "zh", "ko"];
const markdownMarker =
  /`|\[[^\]]+\]\([^)]+\)|(^|\s)\*{1,3}\S|\S\*{1,3}($|\s)|(^|[^\p{L}\p{N}_])_{1,2}([^_\n\s][^_\n]*?)_{1,2}($|[^\p{L}\p{N}_])|(^|\n)\s{0,3}#{1,6}\s|(^|\n)\s*[-+*]\s+/u;
const developmentMarker =
  /\b(?:TODO|TBD|FIXME|XXX|LOREM(?:\s+IPSUM)?|WIP|COMING\s+SOON|REPLACE\s+ME|DRAFT\s+ONLY|DEV(?:ELOPMENT)?\s+ONLY)\b|待补(?:充|写|定)?|施工中|开发中|준비\s*중/iu;
const internalOwnerLanguage =
  /\b(?:content|canonical|decision|route|guide|regional|transport|intercity|performance|migration-history|rushed-itinerary|ticket)\s+owners?\b|\b(?:owns?|ownership)\s+(?:the\s+)?(?:decision|article|page|guide|route|time|night|buffer|release|classification)\b|\breal owners\b|\bhas another owner\b|真正负责人/iu;

function collectStrings(value, location = "root", output = []) {
  if (typeof value === "string") {
    output.push([location, value]);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collectStrings(item, `${location}[${index}]`, output),
    );
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) =>
      collectStrings(item, `${location}.${key}`, output),
    );
  }
  return output;
}

async function readGovernance() {
  return JSON.parse(
    await readFile(
      path.join(projectRoot, "content/guide-governance.json"),
      "utf8",
    ),
  );
}

async function importBody(guideId, locale) {
  const bodyPath = path.join(
    projectRoot,
    "content/guides",
    guideId,
    `body.${locale}.ts`,
  );
  return (
    await import(
      `${pathToFileURL(bodyPath).href}?candidate-copy-hygiene=${guideId}-${locale}`
    )
  ).default;
}

test("all governed candidates keep public copy free of renderer and editorial-control leakage", async () => {
  const governance = await readGovernance();
  assert.equal(governance.candidates.length, 30);

  for (const candidate of governance.candidates) {
    for (const locale of locales) {
      const body = await importBody(candidate.guideId, locale);
      const metadata = JSON.parse(
        await readFile(
          path.join(
            projectRoot,
            "content/guides",
            candidate.guideId,
            "metadata.json",
          ),
          "utf8",
        ),
      );
      for (const [location, value] of [
        ...collectStrings(body),
        ...collectStrings(metadata, "metadata"),
      ]) {
        const label = `${candidate.guideId}/${locale}/${location}`;
        assert.doesNotMatch(value, markdownMarker, `${label} leaks Markdown`);
        assert.doesNotMatch(
          value,
          developmentMarker,
          `${label} leaks a development marker`,
        );
        assert.doesNotMatch(
          value,
          internalOwnerLanguage,
          `${label} leaks internal owner terminology`,
        );
      }
    }
  }
});

test("all governed candidates preserve exact EN ZH KO block id and type order", async () => {
  const governance = await readGovernance();
  for (const candidate of governance.candidates) {
    const signatures = {};
    for (const locale of locales) {
      const body = await importBody(candidate.guideId, locale);
      signatures[locale] = body.blocks.map(({ id, type }, position) => ({
        position,
        id,
        type,
      }));
    }
    assert.deepEqual(
      signatures.zh,
      signatures.en,
      `${candidate.guideId} EN/ZH block parity drift`,
    );
    assert.deepEqual(
      signatures.ko,
      signatures.en,
      `${candidate.guideId} EN/KO block parity drift`,
    );
  }
});
