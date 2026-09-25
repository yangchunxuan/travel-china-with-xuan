// Cuts the Chinese editorial font subset (tools/fonts/homeground-serif-sc.woff2)
// into unicode-range slices and writes their @font-face rules, so a Chinese page
// downloads only the glyphs it lays out in the serif. See public/fonts/README.md.
//
// usage:
//   node tools/slice-serif-sc-font.mjs [--python=python] [--fonttools=<PYTHONPATH>]
//     Rebuilds public/fonts/homeground-serif-sc-NN.woff2 and
//     public/fonts/homeground-serif-sc.css from the source subset and the
//     committed plan tools/fonts/homeground-serif-sc-slices.json.
//   node tools/slice-serif-sc-font.mjs --plan-from-usage=<usage.json> [...]
//     First rewrites the plan from a tools/measure-serif-sc-usage.mjs measurement.
import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import { localeFontSubsetOptions } from "./locale-font-subset-options.mjs";
import {
  assignSlices,
  planFromUsage,
  renderStylesheet,
  serifScPlanPath,
  serifScSliceFile,
  serifScSliceFilePattern,
  serifScSourcePath,
  serifScStylesheetFile,
} from "./serif-sc-slice-plan.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = Object.fromEntries(
  process.argv.slice(2).map((argument) => {
    const [name, ...value] = argument.replace(/^--/, "").split("=");
    return [name, value.join("=")];
  }),
);
const python = args.python || "python";
const sourcePath = resolve(projectRoot, serifScSourcePath);
const planPath = resolve(projectRoot, serifScPlanPath);
const fontDirectory = resolve(projectRoot, "public/fonts");
const sourceFont = fontkit.openSync(sourcePath);
// characterSet also reports the 0xFFFF terminator of the format 4 cmap.
const fontCodePoints = sourceFont.characterSet
  .filter((codePoint) => sourceFont.hasGlyphForCodePoint(codePoint))
  .sort((left, right) => left - right);

if (args["plan-from-usage"]) {
  const usage = JSON.parse(readFileSync(resolve(args["plan-from-usage"]), "utf8"));
  const plan = planFromUsage(usage, fontCodePoints);
  writeFileSync(planPath, `${JSON.stringify(plan, null, 2)}\n`);
  console.log(`✓ Wrote ${serifScPlanPath}: ${plan.slices.length} slices from ${usage.pages.length} measured pages.`);
}

const plan = JSON.parse(readFileSync(planPath, "utf8"));
const { slices, unplanned, notInFont } = assignSlices(plan, fontCodePoints);
const listed = (codePoints) =>
  codePoints.slice(0, 40).map((codePoint) => String.fromCodePoint(codePoint)).join("") +
  (codePoints.length > 40 ? " …" : "");
if (notInFont.length > 0) {
  console.log(`  ${notInFont.length} planned character(s) are no longer in the source font and were skipped: ${listed(notInFont)}`);
}
if (unplanned.length > 0) {
  console.warn(
    `! ${unplanned.length} Han character(s) of the source font are not in the slice plan and went into an extra slice: ${listed(unplanned)}\n` +
      "  Re-measure with tools/measure-serif-sc-usage.mjs when they appear in headings.",
  );
}

const workDirectory = mkdtempSync(join(tmpdir(), "serif-sc-slices-"));
try {
  for (const name of readdirSync(fontDirectory)) {
    if (serifScSliceFilePattern.test(name)) rmSync(join(fontDirectory, name));
  }
  let total = 0;
  slices.forEach((codePoints, index) => {
    const unicodesFile = join(workDirectory, `slice-${index}.txt`);
    writeFileSync(unicodesFile, `${codePoints.map((codePoint) => codePoint.toString(16)).join("\n")}\n`);
    const output = join(fontDirectory, serifScSliceFile(index));
    const result = spawnSync(
      python,
      ["-m", "fontTools.subset", sourcePath, `--unicodes-file=${unicodesFile}`, `--output-file=${output}`, ...localeFontSubsetOptions],
      {
        cwd: projectRoot,
        env: args.fonttools ? { ...process.env, PYTHONPATH: args.fonttools } : process.env,
        encoding: "utf8",
      },
    );
    if (result.status !== 0) throw new Error(result.stderr || result.stdout || "fontTools.subset failed");
    const bytes = statSync(output).size;
    total += bytes;
    console.log(`  ${serifScSliceFile(index)}  ${String(codePoints.length).padStart(4)} characters  ${String(bytes).padStart(7)} bytes`);
  });
  writeFileSync(join(fontDirectory, serifScStylesheetFile), renderStylesheet(slices));
  console.log(`✓ Wrote ${slices.length} slices (${total} bytes) and public/fonts/${serifScStylesheetFile}.`);
} finally {
  rmSync(workDirectory, { recursive: true, force: true });
}
