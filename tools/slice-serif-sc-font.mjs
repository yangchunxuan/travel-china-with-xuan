// Cuts the Chinese editorial font subset (tools/fonts/homeground-serif-sc.woff2)
// into unicode-range slices, so a Chinese page downloads only the glyphs it lays
// out in the serif. See public/fonts/README.md.
//
// usage:
//   node tools/slice-serif-sc-font.mjs [--python=python] [--fonttools=<PYTHONPATH>]
//     Rebuilds public/fonts/homeground-serif-sc-NN.<hash>.woff2, the stylesheet
//     public/fonts/homeground-serif-sc-slices.<hash>.css for slices 1..n,
//     lib/homegroundSerifScFontFiles.ts (the URLs of slice 0 and that stylesheet)
//     and the slice 0 url in app/globals.css from the source subset and the
//     committed plan tools/fonts/homeground-serif-sc-slices.json.
//   node tools/slice-serif-sc-font.mjs --plan-from-usage=<usage.json> [...]
//     First rewrites the plan from a tools/measure-serif-sc-usage.mjs measurement.
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import { localeFontSubsetOptions } from "./locale-font-subset-options.mjs";
import {
  assignSlices,
  contentHash,
  planFromUsage,
  renderFilesModule,
  renderStylesheet,
  rewritePrimaryFontFace,
  serifScFilesModulePath,
  serifScGlobalsPath,
  serifScPlanPath,
  serifScSliceFile,
  serifScSliceFilePattern,
  serifScSourcePath,
  serifScStylesheetFile,
  serifScStylesheetFilePattern,
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
  // The newsletter card mounts after a delay on any Chinese page, so the usage
  // measurement never sees its serif headings; slice 0 carries them.
  const { newsletterCopy } = await import("../lib/newsletterI18n.ts");
  const lateSerifText = `${newsletterCopy.zh.title}${newsletterCopy.zh.pendingTitle}`;
  const plan = planFromUsage(usage, fontCodePoints, lateSerifText);
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
  const built = slices.map((codePoints, index) => {
    const unicodesFile = join(workDirectory, `slice-${index}.txt`);
    writeFileSync(unicodesFile, `${codePoints.map((codePoint) => codePoint.toString(16)).join("\n")}\n`);
    const output = join(workDirectory, `slice-${index}.woff2`);
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
    const bytes = readFileSync(output);
    return { output, name: serifScSliceFile(index, contentHash(bytes)), size: bytes.length, characters: codePoints.length };
  });

  for (const name of readdirSync(fontDirectory)) {
    if (serifScSliceFilePattern.test(name) || serifScStylesheetFilePattern.test(name)) rmSync(join(fontDirectory, name));
  }
  let total = 0;
  for (const slice of built) {
    copyFileSync(slice.output, join(fontDirectory, slice.name));
    total += slice.size;
    console.log(`  ${slice.name}  ${String(slice.characters).padStart(4)} characters  ${String(slice.size).padStart(7)} bytes`);
  }
  const urls = built.map((slice) => `/fonts/${slice.name}`);
  const stylesheet = renderStylesheet(slices, urls);
  const stylesheetName = serifScStylesheetFile(contentHash(stylesheet));
  writeFileSync(join(fontDirectory, stylesheetName), stylesheet);
  writeFileSync(resolve(projectRoot, serifScFilesModulePath), renderFilesModule(urls[0], `/fonts/${stylesheetName}`));
  const globalsPath = resolve(projectRoot, serifScGlobalsPath);
  writeFileSync(globalsPath, rewritePrimaryFontFace(readFileSync(globalsPath, "utf8"), urls[0]));
  console.log(
    `✓ Wrote ${built.length} slices (${total} bytes), public/fonts/${stylesheetName}, ${serifScFilesModulePath} and the slice 0 url in ${serifScGlobalsPath}.`,
  );
} finally {
  rmSync(workDirectory, { recursive: true, force: true });
}
