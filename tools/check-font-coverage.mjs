import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import {
  collectLocaleFontSourceFiles,
  collectProductionExportFontFiles,
  readChineseFontCorpus,
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
import {
  koreanFilesModulePath,
  koreanFontFilePattern,
  koreanGlobalsPath,
  koreanStylesheetFilePattern,
  readKoreanFaces,
  retiredKoreanFiles,
  routeCodePoint as routeKoreanCodePoint,
} from "./korean-font-slice-plan.mjs";
import { koreanLayoutFeatures } from "./locale-font-subset-options.mjs";
import {
  arabicCssPath,
  arabicFontDirectory,
  arabicFontFilePattern,
  arabicSourcePath,
  readArabicFontUrl,
} from "./arabic-font.mjs";

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
const chineseSourceText = readChineseFontCorpus(collectedFiles);
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

function charactersMatching(text, pattern) {
  return [...new Set(text.match(pattern) ?? [])].sort(
    (left, right) => left.codePointAt(0) - right.codePointAt(0),
  );
}

const chineseCharacters = charactersMatching(chineseSourceText, /\p{Script=Han}/gu);
const koreanCharacters = charactersMatching(sourceText, /\p{Script=Hangul}/gu);

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

// The two Korean fonts ship as unicode-range slices too: slice 00 of each
// family, declared in app/globals.css with no unicode-range, and the slices of
// the stylesheet named in lib/homegroundKoreanFontFiles.ts. The same rules as
// for the Chinese slices apply to each family.
function koreanUnicodeRangeSlices() {
  const { files, families, stylesheetFound } = readKoreanFaces(projectRoot, fontDirectory);
  const shared = [];
  if (!stylesheetFound) {
    shared.push(`${files.stylesheet} (named in ${koreanFilesModulePath}) is not a file in ${fontDirectory}`);
  }
  for (const retired of retiredKoreanFiles) {
    if (existsSync(resolve(projectRoot, fontDirectory, retired))) {
      shared.push(`${fontDirectory}/${retired} is back; the unsliced subsets live in tools/fonts and only their slices are published`);
    }
  }
  const exportedCss = checksProductionExport && existsSync(resolve(projectRoot, "out/_next/static/css"))
    ? readdirSync(resolve(projectRoot, "out/_next/static/css"))
        .filter((name) => name.endsWith(".css"))
        .map((name) => readFileSync(resolve(projectRoot, "out/_next/static/css", name), "utf8"))
    : [];
  const referenced = new Set([files.stylesheet.replace(/^\/fonts\//, "")]);
  const results = families.map(({ font, globalsFaces, faces }) => {
    const problems = [];
    const primary = files.primary[font.key];
    if (globalsFaces.length !== 1 || globalsFaces[0].ranges !== null || globalsFaces[0].src !== primary) {
      problems.push(
        `${koreanGlobalsPath} must declare ${font.family} once, with no unicode-range, from ${primary} (named in ${koreanFilesModulePath})`,
      );
    }
    if (checksProductionExport && !exportedCss.some((css) => css.includes(primary))) {
      problems.push(`no exported stylesheet in out/_next/static/css declares ${primary}`);
    }
    if (faces.length < 2) problems.push(`${files.stylesheet} declares no slices of ${font.family}`);
    const fonts = faces.map((face) => {
      const filePath = resolve(projectRoot, fontDirectory, face.src.replace(/^\/fonts\//, ""));
      referenced.add(face.src.replace(/^\/fonts\//, ""));
      if (!face.src.startsWith("/fonts/") || !existsSync(filePath)) {
        problems.push(`${face.src} is not a file in ${fontDirectory}`);
        return null;
      }
      return fontkit.openSync(filePath);
    });
    fonts.forEach((sliceFont, index) => {
      if (!sliceFont) return;
      const unreachable = sliceFont.characterSet.filter(
        (codePoint) => sliceFont.hasGlyphForCodePoint(codePoint) && routeKoreanCodePoint(faces, codePoint) !== index,
      );
      if (unreachable.length > 0) {
        problems.push(`${faces[index].src} carries ${unreachable.length} glyph(s) its unicode-range never selects`);
      }
    });
    return {
      hasGlyph: (codePoint) => {
        const index = routeKoreanCodePoint(faces, codePoint);
        return index >= 0 && Boolean(fonts[index]?.hasGlyphForCodePoint(codePoint));
      },
      problems,
      scope: ` across ${faces.length} unicode-range slices`,
    };
  });
  for (const name of readdirSync(resolve(projectRoot, fontDirectory))) {
    if ((koreanFontFilePattern.test(name) || koreanStylesheetFilePattern.test(name)) && !referenced.has(name)) {
      shared.push(`${fontDirectory}/${name} is not referenced by ${koreanFilesModulePath}`);
    }
  }
  results[0].problems.unshift(...shared);
  return results;
}

// The Korean subsets keep only the OpenType features browsers apply to Korean
// pages (tools/locale-font-subset-options.mjs). A stylesheet that asks for any
// other feature would silently get nothing on Korean pages, so it fails here.
function koreanFeatureRequests() {
  if (checksProductionExport) return [];
  const problems = [];
  const allowed = {
    "font-variant-numeric": new Set(["normal", "tabular-nums"]),
    "font-variant-ligatures": new Set(["normal", "none", "common-ligatures", "no-common-ligatures", "contextual", "no-contextual"]),
    "font-variant-caps": new Set(["normal"]),
    "font-variant-east-asian": new Set(["normal"]),
    "font-variant-position": new Set(["normal"]),
    "font-variant-alternates": new Set(["normal"]),
    "font-variant": new Set(["normal", "none"]),
  };
  const styleFiles = ["app", "components", "lib"].flatMap(function walk(directory) {
    const full = resolve(projectRoot, directory);
    if (!existsSync(full)) return [];
    return readdirSync(full, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory()
        ? walk(`${directory}/${entry.name}`)
        : /\.(css|tsx|ts)$/.test(entry.name) ? [`${directory}/${entry.name}`] : [],
    );
  });
  for (const file of styleFiles) {
    const text = readFileSync(resolve(projectRoot, file), "utf8");
    for (const [, property, value] of text.matchAll(/(font-variant(?:-[a-z]+)*|font-feature-settings)\s*:\s*([^;}\n]+)/g)) {
      const trimmed = value.trim();
      // A declaration inside a TSX string ends at its closing quote.
      const declared = trimmed.replace(/["'`,]+$/, "").replace(/\s*!important$/, "");
      if (property === "font-feature-settings") {
        if (declared === "normal") continue;
        const tags = [...trimmed.matchAll(/["']([a-z0-9]{4})["']/g)].map((match) => match[1]);
        const missing = tags.filter((tag) => !koreanLayoutFeatures.includes(tag));
        if (tags.length === 0 || missing.length > 0) problems.push(`${file}: font-feature-settings: ${trimmed}`);
      } else if (!allowed[property]?.has(declared)) {
        problems.push(`${file}: ${property}: ${trimmed}`);
      }
    }
  }
  return problems.map(
    (problem) => `${problem} requests an OpenType feature the Korean subsets leave out; add it to koreanLayoutFeatures in tools/locale-font-subset-options.mjs and rebuild the fonts`,
  );
}

const [koreanInterfaceFont, koreanEditorialFont] = koreanUnicodeRangeSlices();
koreanInterfaceFont.problems.push(...koreanFeatureRequests());

// The Arabic edition's font is a subset of the complete Noto Sans Arabic kept
// in tools/fonts. Every character of the corpus that the complete font has
// must be in the published subset, so no Arabic page can lose a glyph it had
// before; arabic.css must point at the one published subset.
function arabicSubset() {
  const problems = [];
  const css = readFileSync(resolve(projectRoot, arabicCssPath), "utf8");
  let url = null;
  try {
    url = readArabicFontUrl(css);
  } catch (error) {
    problems.push(error.message);
  }
  const directory = checksProductionExport ? "out/fonts/arabic" : arabicFontDirectory;
  const fileName = url?.replace(/^\/fonts\/arabic\//, "");
  const filePath = fileName ? resolve(projectRoot, directory, fileName) : null;
  if (url && (!url.startsWith("/fonts/arabic/") || !existsSync(filePath))) {
    problems.push(`${url} (named in ${arabicCssPath}) is not a file in ${directory}`);
  }
  for (const name of readdirSync(resolve(projectRoot, directory))) {
    if (arabicFontFilePattern.test(name) && name !== fileName) {
      problems.push(`${directory}/${name} is not the font ${arabicCssPath} names`);
    }
  }
  const subset = filePath && existsSync(filePath) ? fontkit.openSync(filePath) : null;
  const complete = fontkit.openSync(resolve(projectRoot, arabicSourcePath));
  return {
    characters: [...new Set(sourceText)].filter((character) => complete.hasGlyphForCodePoint(character.codePointAt(0))),
    font: {
      hasGlyph: (codePoint) => Boolean(subset?.hasGlyphForCodePoint(codePoint)),
      problems,
      scope: "",
    },
  };
}

const arabicCheck = arabicSubset();

const checks = [
  {
    characters: chineseCharacters,
    font: unicodeRangeSlices(),
    label: "Chinese editorial font",
  },
  {
    characters: koreanCharacters,
    font: koreanInterfaceFont,
    label: "Korean interface font",
  },
  {
    characters: koreanCharacters,
    font: koreanEditorialFont,
    label: "Korean editorial font",
  },
  {
    characters: arabicCheck.characters,
    font: arabicCheck.font,
    label: "Arabic font",
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
