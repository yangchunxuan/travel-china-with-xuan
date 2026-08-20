import { readFile, readdir, rename, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { buildContentManifest } from "../lib/content-system/manifest.ts";

const repositoryDirectories = [
  "entities",
  "relations",
  "pages",
  "facts",
  "sources",
  "media",
];

async function listJsonFiles(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === "ENOENT") return [];
    throw error;
  }

  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name, "en"))) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listJsonFiles(entryPath)));
    if (entry.isFile() && entry.name.endsWith(".json")) files.push(entryPath);
  }
  return files;
}

async function readRecords(filePath) {
  let parsed;
  try {
    parsed = JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Unable to parse ${filePath}: ${error instanceof Error ? error.message : error}`);
  }
  return Array.isArray(parsed) ? parsed : [parsed];
}

export async function loadContentRecords(contentRoot) {
  const files = (
    await Promise.all(
      repositoryDirectories.map((directory) => listJsonFiles(path.join(contentRoot, directory))),
    )
  )
    .flat()
    .sort((left, right) => left.localeCompare(right, "en"));

  const records = [];
  for (const file of files) {
    const fileRecords = await readRecords(file);
    records.push(...fileRecords);
  }
  return { files, records };
}

export function serializeContentManifest(manifest) {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

function normalizeLineEndings(value) {
  return value.replace(/\r\n?/gu, "\n");
}

export async function generateContentManifest({
  contentRoot = path.resolve(process.cwd(), "content"),
  outputPath = path.resolve(contentRoot, "generated/content-manifest.json"),
  validateReferences = true,
  check = false,
} = {}) {
  const { files, records } = await loadContentRecords(contentRoot);
  const manifest = buildContentManifest(records, { validateReferences });
  const output = serializeContentManifest(manifest);

  if (check) {
    let current;
    try {
      current = await readFile(outputPath, "utf8");
    } catch (error) {
      if (error && error.code === "ENOENT") {
        throw new Error(`Manifest is missing at ${outputPath}. Generate it before using --check.`);
      }
      throw error;
    }
    if (normalizeLineEndings(current) !== normalizeLineEndings(output)) {
      throw new Error(`Manifest is stale: ${outputPath}. Regenerate it.`);
    }
    return { manifest, files, outputPath, changed: false };
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.tmp`;
  await writeFile(temporaryPath, output, "utf8");
  await rename(temporaryPath, outputPath);
  return { manifest, files, outputPath, changed: true };
}

function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--content-root") {
      options.contentRoot = path.resolve(argv[index + 1]);
      index += 1;
      continue;
    }
    if (argument === "--output") {
      options.outputPath = path.resolve(argv[index + 1]);
      index += 1;
      continue;
    }
    if (argument === "--allow-missing-references") {
      options.validateReferences = false;
      continue;
    }
    if (argument === "--check") {
      options.check = true;
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  try {
    const result = await generateContentManifest(parseArguments(process.argv.slice(2)));
    process.stdout.write(
      `${result.changed ? "Generated" : "Verified"} ${result.manifest.entries.length} manifest entries from ${result.files.length} file(s): ${result.outputPath}\n`,
    );
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : error}\n`);
    process.exitCode = 1;
  }
}
