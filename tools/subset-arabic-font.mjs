// Builds the Arabic edition's web font from the complete Noto Sans Arabic
// variable font kept in tools/fonts (see public/fonts/arabic/README.md).
//
// Arabic pages set it at weights 400 to 800 and at normal width only, and lay
// out fewer than 250 of its 1,561 characters, yet they downloaded all of it
// (353 KB) before their first render. This keeps the width axis at 100 (its
// default) and the weight axis from 400 (its default) to 900, so every weight
// a page uses keeps exactly the upstream outlines, and keeps every character
// of the font that the site's sources (or the production export, when it
// exists) contain, with all OpenType features, so Arabic shaping (init, medi,
// fina, isol, rlig, liga, mark, mkmk…) is unchanged.
//
// usage: node tools/subset-arabic-font.mjs [--python=python] [--fonttools=<PYTHONPATH>]
//   Writes public/fonts/arabic/homeground-arabic.<hash>.woff2, removes the
//   previous one, and points app/(arabic)/ar/arabic.css and
//   lib/homegroundArabicFontFile.ts at it. Build once, run this, then build
//   again when new copy adds characters (check:font-coverage:export fails).
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  arabicCssPath,
  arabicFileModulePath,
  arabicFontDirectory,
  arabicFontFile,
  arabicFontFilePattern,
  arabicSourcePath,
  renderArabicFileModule,
  rewriteArabicFontFace,
} from "./arabic-font.mjs";
import { contentHash } from "./serif-sc-slice-plan.mjs";
import {
  collectLocaleFontSourceFiles,
  collectProductionExportFontFiles,
  readCollectedFiles,
} from "./locale-font-file-collection.mjs";
import { localeFontSubsetOptions } from "./locale-font-subset-options.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = Object.fromEntries(
  process.argv.slice(2).map((argument) => {
    const [name, ...value] = argument.replace(/^--/, "").split("=");
    return [name, value.join("=")];
  }),
);
const python = args.python || "python";
const env = args.fonttools ? { ...process.env, PYTHONPATH: args.fonttools } : process.env;
const runPython = (module, moduleArgs) => {
  const result = spawnSync(python, ["-m", module, ...moduleArgs], { cwd: projectRoot, env, encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || `${module} failed`);
};

// Every character any page could show, in any script: pyftsubset keeps those
// the font has and ignores the rest. Printable ASCII is always kept.
const corpusFiles = collectLocaleFontSourceFiles(projectRoot);
if (existsSync(resolve(projectRoot, "out"))) corpusFiles.push(...collectProductionExportFontFiles(projectRoot));
const ascii = Array.from({ length: 0x7f - 0x20 }, (_, index) => String.fromCodePoint(0x20 + index)).join("");
const characters = [...new Set(`${ascii}${readCollectedFiles(corpusFiles)}`)]
  .filter((character) => character !== "\n" && character !== "\r")
  .sort((left, right) => left.codePointAt(0) - right.codePointAt(0))
  .join("");

const workDirectory = mkdtempSync(join(tmpdir(), "homeground-arabic-"));
try {
  const textFile = join(workDirectory, "characters.txt");
  writeFileSync(textFile, characters);
  const instance = join(workDirectory, "noto-sans-arabic-400-900.ttf");
  runPython("fontTools.varLib.instancer", [resolve(projectRoot, arabicSourcePath), "wdth=100", "wght=400:900", `--output=${instance}`]);
  const output = join(workDirectory, "homeground-arabic.woff2");
  runPython("fontTools.subset", [instance, `--text-file=${textFile}`, `--output-file=${output}`, ...localeFontSubsetOptions]);

  const bytes = readFileSync(output);
  const name = arabicFontFile(contentHash(bytes));
  const directory = resolve(projectRoot, arabicFontDirectory);
  for (const previous of readdirSync(directory)) {
    if (arabicFontFilePattern.test(previous)) rmSync(join(directory, previous));
  }
  copyFileSync(output, join(directory, name));
  const url = `/fonts/arabic/${name}`;
  const cssPath = resolve(projectRoot, arabicCssPath);
  writeFileSync(cssPath, rewriteArabicFontFace(readFileSync(cssPath, "utf8"), url));
  writeFileSync(resolve(projectRoot, arabicFileModulePath), renderArabicFileModule(url));
  console.log(`✓ Wrote ${arabicFontDirectory}/${name} (${bytes.length} bytes) and pointed ${arabicCssPath} and ${arabicFileModulePath} at it.`);
} finally {
  rmSync(workDirectory, { recursive: true, force: true });
}
