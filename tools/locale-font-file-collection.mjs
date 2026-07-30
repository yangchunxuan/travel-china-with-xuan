import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";

const localeFontSourceDirectories = ["app", "components", "lib"];
const localeFontSourceExtensions = new Set([".ts", ".tsx"]);
const productionExportExtensions = new Set([".html", ".js"]);

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
  );
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
  );

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
