import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import {
  collectLocaleFontSourceFiles,
  collectProductionExportFontFiles,
  readCollectedFiles,
} from "./locale-font-file-collection.mjs";
import {
  readSerifScFaces,
  retiredSerifScFile,
  routeCodePoint,
  serifScFilesModulePath,
  serifScGlobalsPath,
  serifScSliceFilePattern,
  serifScStylesheetFilePattern,
} from "./serif-sc-slice-plan.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argumentsSet = new Set(process.argv.slice(2));
const supportedArguments = new Set(["--production-export"]);
const unsupportedArguments = [...argumentsSet].filter(
  (argument) => !supportedArguments.has(argument),
);

if (unsupportedArguments.length > 0) {
  throw new Error(
    `Unsupported argument${
      unsupportedArguments.length === 1 ? "" : "s"
    }: ${unsupportedArguments.join(", ")}`,
  );
}

const checksProductionExport = argumentsSet.has("--production-export");
const collectedFiles = checksProductionExport
  ? collectProductionExportFontFiles(projectRoot)
  : collectLocaleFontSourceFiles(projectRoot);
const sourceText = readCollectedFiles(collectedFiles);
const fontDirectory = checksProductionExport ? "out/fonts" : "public/fonts";
const corpusLabel = checksProductionExport
  ? "production HTML/client JavaScript"
  : "app, components, lib and content source";

if (checksProductionExport) {
  const htmlCount = collectedFiles.filter(
    (filePath) => extname(filePath) === ".html",
  ).length;
  const javascriptCount = collectedFiles.filter(
    (filePath) => extname(filePath) === ".js",
  ).length;
  console.log(
    `Checking ${htmlCount} exported HTML file(s) and ${javascriptCount} client JavaScript file(s).`,
  );
} else {
  console.log(`Checking ${collectedFiles.length} locale font source file(s).`);
}

function charactersMatching(pattern) {
  return [...new Set(sourceText.match(pattern) ?? [])].sort(
    (left, right) => left.codePointAt(0) - right.codePointAt(0),
  );
}

const chineseCharacters = charactersMatching(/\p{Script=Han}/gu);
const koreanCharacters = charactersMatching(/\p{Script=Hangul}/gu);

function singleFontFile(fontPath) {
  const font = fontkit.openSync(resolve(projectRoot, fontPath));
  return {
    hasGlyph: (codePoint) => font.hasGlyphForCodePoint(codePoint),
    problems: [],
    scope: "",
  };
}

// The Chinese font ships as unicode-range slices: slice 0, declared in
// app/globals.css with no unicode-range, and the slices of the stylesheet named
// in lib/homegroundSerifScFontFiles.ts. A character is covered only when the
// slice the browser consults first for it (the last-defined @font-face whose
// unicode-range contains it) has the glyph. Every glyph a slice carries must
// also be reachable through its own range, every slice file must be
// referenced, and the retired unsliced file must not come back, so the
// stylesheets, the layout and the files cannot drift apart.
function unicodeRangeSlices() {
  const { files, faces, globalsFaces, stylesheetFound } = readSerifScFaces(projectRoot, fontDirectory);
  const problems = [];
  if (globalsFaces.length !== 1 || globalsFaces[0].ranges !== null || globalsFaces[0].src !== files.primary) {
    problems.push(
      `${serifScGlobalsPath} must declare the family once, with no unicode-range, from ${files.primary} (named in ${serifScFilesModulePath})`,
    );
  }
  if (checksProductionExport) {
    const cssDirectory = resolve(projectRoot, "out/_next/static/css");
    const exportedCss = existsSync(cssDirectory)
      ? readdirSync(cssDirectory)
          .filter((name) => name.endsWith(".css"))
          .map((name) => readFileSync(resolve(cssDirectory, name), "utf8"))
      : [];
    if (!exportedCss.some((css) => css.includes(files.primary))) {
      problems.push(`no exported stylesheet in out/_next/static/css declares ${files.primary}`);
    }
  }
  if (!stylesheetFound) {
    problems.push(`${files.stylesheet} (named in ${serifScFilesModulePath}) is not a file in ${fontDirectory}`);
  }
  if (existsSync(resolve(projectRoot, fontDirectory, retiredSerifScFile))) {
    problems.push(
      `${fontDirectory}/${retiredSerifScFile} is back; the unsliced subset lives in tools/fonts and only its slices are published`,
    );
  }
  const fonts = faces.map((face) => {
    const filePath = resolve(
      projectRoot,
      fontDirectory,
      face.src.replace(/^\/fonts\//, ""),
    );
    if (!face.src.startsWith("/fonts/") || !existsSync(filePath)) {
      problems.push(`${face.src} is not a file in ${fontDirectory}`);
      return null;
    }
    return fontkit.openSync(filePath);
  });
  if (faces.length < 2) problems.push(`${files.stylesheet} declares no slices`);
  fonts.forEach((font, index) => {
    if (!font) return;
    const unreachable = font.characterSet.filter(
      (codePoint) =>
        font.hasGlyphForCodePoint(codePoint) &&
        routeCodePoint(faces, codePoint) !== index,
    );
    if (unreachable.length > 0) {
      problems.push(
        `${faces[index].src} carries ${unreachable.length} glyph(s) its unicode-range never selects`,
      );
    }
  });
  const referenced = new Set([
    ...faces.map((face) => face.src.replace(/^\/fonts\//, "")),
    files.stylesheet.replace(/^\/fonts\//, ""),
  ]);
  for (const name of readdirSync(resolve(projectRoot, fontDirectory))) {
    if (
      (serifScSliceFilePattern.test(name) || serifScStylesheetFilePattern.test(name)) &&
      !referenced.has(name)
    ) {
      problems.push(`${fontDirectory}/${name} is not referenced by ${serifScFilesModulePath}`);
    }
  }
  return {
    hasGlyph: (codePoint) => {
      const index = routeCodePoint(faces, codePoint);
      return index >= 0 && Boolean(fonts[index]?.hasGlyphForCodePoint(codePoint));
    },
    problems,
    scope: ` across ${faces.length} unicode-range slices`,
  };
}

const checks = [
  {
    characters: chineseCharacters,
    font: unicodeRangeSlices(),
    label: "Chinese editorial font",
  },
  {
    characters: koreanCharacters,
    font: singleFontFile(`${fontDirectory}/homeground-pretendard-ko.woff2`),
    label: "Korean interface font",
  },
  {
    characters: koreanCharacters,
    font: singleFontFile(`${fontDirectory}/homeground-maruburi-ko.woff2`),
    label: "Korean editorial font",
  },
];

let failed = false;
const maximumReportedGlyphs = 80;

for (const check of checks) {
  for (const problem of check.font.problems) {
    failed = true;
    console.error(`✗ ${check.label}: ${problem}`);
  }
  const missing = check.characters.filter(
    (character) => !check.font.hasGlyph(character.codePointAt(0)),
  );

  if (missing.length > 0) {
    failed = true;
    const details = missing
      .slice(0, maximumReportedGlyphs)
      .map(
        (character) =>
          `${character} (U+${character
            .codePointAt(0)
            .toString(16)
            .toUpperCase()
            .padStart(4, "0")})`,
      )
      .join(", ");
    const omitted =
      missing.length > maximumReportedGlyphs
        ? `, … ${missing.length - maximumReportedGlyphs} more`
        : "";

    console.error(
      `✗ ${check.label} is missing ${missing.length} required glyph(s) from ${corpusLabel}: ${details}${omitted}`,
    );
  } else {
    console.log(
      `✓ ${check.label} covers all ${check.characters.length} required characters from ${corpusLabel}${check.font.scope}.`,
    );
  }
}

if (failed) {
  console.error(
    "\nRegenerate the locale font subsets before building; see public/fonts/README.md.",
  );
  process.exitCode = 1;
}
