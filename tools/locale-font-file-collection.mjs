import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";

// Include independently authored guide sources as well as runtime code. The
// guide registry imports bodies from content/guides without copying their text
// into lib/generated, so scanning only app/components/lib can pass locally and
// still leave production HTML with missing CJK glyphs.
const localeFontSourceDirectories = ["app", "components", "lib", "content"];
const localeFontSourceExtensions = new Set([".ts", ".tsx", ".json"]);
const productionExportExtensions = new Set([".html", ".js"]);

// The Japanese pilot uses a Japanese system-font stack, not the self-hosted
// Chinese serif subset. Keep its pages out of the SC glyph corpus while still
// checking every EN/ZH/KO page and their shared components.
const japanesePilotSourceFiles = new Set([
  "components/JapaneseJiangnanInteraction.tsx",
  "components/JapanesePilotShell.tsx",
  "lib/jaPilot.ts",
  "lib/jaPilotCopy.ts",
]);

function normalizedRelative(root, filePath) {
  return relative(root, filePath).split(sep).join("/");
}

function isJapanesePilotSource(projectRoot, filePath) {
  const path = normalizedRelative(projectRoot, filePath);
  return path.startsWith("app/(japanese)/") || japanesePilotSourceFiles.has(path);
}

function comparePaths(left, right) {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function collectFilesRecursively(directory, extensions) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => comparePaths(left.name, right.name))
    .flatMap((entry) => {
      const entryPath = resolve(directory, entry.name);

      if (entry.isDirectory()) {
        return collectFilesRecursively(entryPath, extensions);
      }

      return entry.isFile() && extensions.has(extname(entry.name))
        ? [entryPath]
        : [];
    });
}

function uniqueSortedPaths(paths) {
  return [...new Set(paths.map((filePath) => resolve(filePath)))].sort(
    comparePaths,
  );
}

export function collectLocaleFontSourceFiles(projectRoot) {
  const missingDirectories = localeFontSourceDirectories.filter(
    (directory) => !existsSync(resolve(projectRoot, directory)),
  );

  if (missingDirectories.length > 0) {
    throw new Error(
      `Missing locale font source director${
        missingDirectories.length === 1 ? "y" : "ies"
      }: ${missingDirectories.join(", ")}`,
    );
  }

  return uniqueSortedPaths(
    localeFontSourceDirectories.flatMap((directory) =>
      collectFilesRecursively(
        resolve(projectRoot, directory),
        localeFontSourceExtensions,
      ),
    ),
  ).filter((filePath) => !isJapanesePilotSource(projectRoot, filePath));
}

export function collectProductionExportFontFiles(
  projectRoot,
  exportDirectory = "out",
) {
  const absoluteExportDirectory = resolve(projectRoot, exportDirectory);

  if (!existsSync(absoluteExportDirectory)) {
    throw new Error(
      `Production export directory does not exist: ${absoluteExportDirectory}`,
    );
  }

  const files = uniqueSortedPaths(
    collectFilesRecursively(
      absoluteExportDirectory,
      productionExportExtensions,
    ),
  ).filter((filePath) => {
    const path = normalizedRelative(absoluteExportDirectory, filePath);
    // The Japanese-only page chunks and HTML use system Japanese fonts. Shared
    // chunks still stay in the SC/Korean corpus because EN/ZH/KO can load them.
    return !path.startsWith("ja/") && !path.startsWith("_next/static/chunks/app/(japanese)/");
  });

  if (files.length === 0) {
    throw new Error(
      `Production export contains no HTML or client JavaScript: ${absoluteExportDirectory}`,
    );
  }

  return files;
}

export function readCollectedFiles(files) {
  return files.map((filePath) => readFileSync(filePath, "utf8")).join("\n");
}
