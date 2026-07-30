import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import {
  collectLocaleFontSourceFiles,
  collectProductionExportFontFiles,
  readCollectedFiles,
} from "./locale-font-file-collection.mjs";

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
  : "app, components and lib source";

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

const checks = [
  {
    characters: chineseCharacters,
    fontPath: `${fontDirectory}/homeground-serif-sc.woff2`,
    label: "Chinese editorial font",
  },
  {
    characters: koreanCharacters,
    fontPath: `${fontDirectory}/homeground-pretendard-ko.woff2`,
    label: "Korean interface font",
  },
  {
    characters: koreanCharacters,
    fontPath: `${fontDirectory}/homeground-maruburi-ko.woff2`,
    label: "Korean editorial font",
  },
];

let failed = false;
const maximumReportedGlyphs = 80;

for (const check of checks) {
  const absoluteFontPath = resolve(projectRoot, check.fontPath);
  const font = fontkit.openSync(absoluteFontPath);
  const missing = check.characters.filter(
    (character) => !font.hasGlyphForCodePoint(character.codePointAt(0)),
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
      `✓ ${check.label} covers all ${check.characters.length} required characters from ${corpusLabel}.`,
    );
  }
}

if (failed) {
  console.error(
    "\nRegenerate the locale font subsets before building; see public/fonts/README.md.",
  );
  process.exitCode = 1;
}
