import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const publicRuntimeRoots = ["app", "components", "lib"];
const internalOnlyModules = [
  "organic-funnel-contract",
  "consultation-intake-contract",
  "route-reality-checker-spec-audit",
  "index-cohort-core",
  "check-index-cohorts",
];

async function sourceFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(entryPath));
    else if (/\.(?:[cm]?[jt]sx?)$/u.test(entry.name)) files.push(entryPath);
  }
  return files;
}

test("internal SEO, funnel, consultation and Route witnesses are not imported by public runtime", async () => {
  const violations = [];
  for (const relativeRoot of publicRuntimeRoots) {
    for (const file of await sourceFiles(path.join(projectRoot, relativeRoot))) {
      const source = await readFile(file, "utf8");
      for (const moduleName of internalOnlyModules) {
        if (source.includes(moduleName)) {
          violations.push(`${path.relative(projectRoot, file)} -> ${moduleName}`);
        }
      }
    }
  }
  assert.deepEqual(violations, []);
});
