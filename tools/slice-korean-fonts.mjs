// Cuts the two Korean font subsets (tools/fonts/homeground-pretendard-ko.woff2
// and tools/fonts/homeground-maruburi-ko.woff2) into unicode-range slices, so a
// Korean page downloads before its first render only the Hangul that first
// renders need. See public/fonts/README.md.
//
// usage:
//   node tools/slice-korean-fonts.mjs [--python=python] [--fonttools=<PYTHONPATH>]
//     Rebuilds public/fonts/homeground-{pretendard,maruburi}-ko-NN.<hash>.woff2,
//     the stylesheet public/fonts/homeground-korean-slices.<hash>.css for the
//     slices after 00, lib/homegroundKoreanFontFiles.ts and the slice 00 urls in
//     app/globals.css from the two subsets and the committed plan
//     tools/fonts/homeground-korean-font-slices.json.
//   node tools/slice-korean-fonts.mjs --plan-from-usage=<usage.json> [...]
//     First rewrites the plan from a tools/measure-korean-font-usage.mjs measurement.
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import { koreanFontSubsetOptions } from "./locale-font-subset-options.mjs";
import {
  assignSlices,
  contentHash,
  koreanFilesModulePath,
  koreanFontFilePattern,
  koreanFonts,
  koreanGlobalsPath,
  koreanPlanPath,
  koreanSliceFile,
  koreanStylesheetFile,
  koreanStylesheetFilePattern,
  planFromUsage,
  renderFilesModule,
  renderStylesheet,
  rewritePrimaryFontFace,
} from "./korean-font-slice-plan.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = Object.fromEntries(
  process.argv.slice(2).map((argument) => {
    const [name, ...value] = argument.replace(/^--/, "").split("=");
    return [name, value.join("=")];
  }),
);
const python = args.python || "python";
const planPath = resolve(projectRoot, koreanPlanPath);
const fontDirectory = resolve(projectRoot, "public/fonts");
const codePointsOf = (sourcePath) => {
  const font = fontkit.openSync(resolve(projectRoot, sourcePath));
  // characterSet also reports the 0xFFFF terminator of the format 4 cmap.
  return font.characterSet.filter((codePoint) => font.hasGlyphForCodePoint(codePoint)).sort((left, right) => left - right);
};

if (args["plan-from-usage"]) {
  const usage = JSON.parse(readFileSync(resolve(args["plan-from-usage"]), "utf8"));
  // The newsletter card mounts after a delay on any Korean page, so the usage
  // measurement never sees it; slice 00 of both families carries its copy.
  const { newsletterCopy } = await import("../lib/newsletterI18n.ts");
  const lateText = Object.values(newsletterCopy.ko).filter((value) => typeof value === "string").join("");
  const plan = {
    about:
      "Hangul per slice of each Korean font. Slice 00 also holds every non-Hangul character of its subset. Regenerate with tools/slice-korean-fonts.mjs --plan-from-usage=<file from tools/measure-korean-font-usage.mjs>.",
    measuredPages: usage.pages.length,
    featuredGuides: usage.featuredGuides ?? [],
    families: Object.fromEntries(
      koreanFonts.map((font) => [font.family, planFromUsage(usage, font.family, codePointsOf(font.sourcePath), lateText)]),
    ),
  };
  writeFileSync(planPath, `${JSON.stringify(plan, null, 2)}\n`);
  console.log(`✓ Wrote ${koreanPlanPath} from ${usage.pages.length} measured pages.`);
}

const plan = JSON.parse(readFileSync(planPath, "utf8"));
const listed = (codePoints) =>
  codePoints.slice(0, 40).map((codePoint) => String.fromCodePoint(codePoint)).join("") + (codePoints.length > 40 ? " …" : "");

const workDirectory = mkdtempSync(join(tmpdir(), "korean-font-slices-"));
try {
  const families = koreanFonts.map((font) => {
    const sourcePath = resolve(projectRoot, font.sourcePath);
    const { slices, unplanned, notInFont } = assignSlices(plan.families[font.family] ?? [{ hangul: "" }], codePointsOf(font.sourcePath));
    if (notInFont.length > 0) {
      console.log(`  ${font.family}: ${notInFont.length} planned character(s) are no longer in the subset and were skipped: ${listed(notInFont)}`);
    }
    if (unplanned.length > 0) {
      console.warn(
        `! ${font.family}: ${unplanned.length} Hangul character(s) of the subset are not in the slice plan and went into an extra slice: ${listed(unplanned)}\n` +
          "  Re-measure with tools/measure-korean-font-usage.mjs when they appear on pages.",
      );
    }
    const built = slices.map((codePoints, index) => {
      const unicodesFile = join(workDirectory, `${font.key}-${index}.txt`);
      writeFileSync(unicodesFile, `${codePoints.map((codePoint) => codePoint.toString(16)).join("\n")}\n`);
      const output = join(workDirectory, `${font.key}-${index}.woff2`);
      const result = spawnSync(
        python,
        ["-m", "fontTools.subset", sourcePath, `--unicodes-file=${unicodesFile}`, `--output-file=${output}`, ...koreanFontSubsetOptions],
        {
          cwd: projectRoot,
          env: args.fonttools ? { ...process.env, PYTHONPATH: args.fonttools } : process.env,
          encoding: "utf8",
        },
      );
      if (result.status !== 0) throw new Error(result.stderr || result.stdout || "fontTools.subset failed");
      const bytes = readFileSync(output);
      return { output, name: koreanSliceFile(font.stem, index, contentHash(bytes)), size: bytes.length, characters: codePoints.length };
    });
    return { font, slices, built, urls: built.map((slice) => `/fonts/${slice.name}`) };
  });

  for (const name of readdirSync(fontDirectory)) {
    if (koreanFontFilePattern.test(name) || koreanStylesheetFilePattern.test(name)) rmSync(join(fontDirectory, name));
  }
  let total = 0;
  for (const { built } of families) {
    for (const slice of built) {
      copyFileSync(slice.output, join(fontDirectory, slice.name));
      total += slice.size;
      console.log(`  ${slice.name}  ${String(slice.characters).padStart(4)} characters  ${String(slice.size).padStart(7)} bytes`);
    }
  }
  const stylesheet = renderStylesheet(families);
  const stylesheetName = koreanStylesheetFile(contentHash(stylesheet));
  writeFileSync(join(fontDirectory, stylesheetName), stylesheet);
  const [pretendard, maruburi] = families;
  writeFileSync(
    resolve(projectRoot, koreanFilesModulePath),
    renderFilesModule(pretendard.urls[0], maruburi.urls[0], `/fonts/${stylesheetName}`),
  );
  const globalsPath = resolve(projectRoot, koreanGlobalsPath);
  let globals = readFileSync(globalsPath, "utf8");
  for (const { font, urls } of families) globals = rewritePrimaryFontFace(globals, font, urls[0]);
  writeFileSync(globalsPath, globals);
  console.log(
    `✓ Wrote ${families.reduce((count, family) => count + family.built.length, 0)} Korean slices (${total} bytes), public/fonts/${stylesheetName}, ${koreanFilesModulePath} and the slice 00 urls in ${koreanGlobalsPath}.`,
  );
} finally {
  rmSync(workDirectory, { recursive: true, force: true });
}
