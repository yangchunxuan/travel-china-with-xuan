import { lstat, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, "out");
const packagePath = path.join(projectRoot, "package.json");

const labExportRoots = [
  "beijing-composition-lab",
  "journey-lab",
  "journey-lab-cc",
  "journey-lab-v1",
  "journey-lab-v2",
  "journey-lab-v3",
  "motion-lab",
  "waterway-lab",
];

const packageJson = JSON.parse(await readFile(packagePath, "utf8"));

if (packageJson.name !== "travel-china-with-xuan") {
  throw new Error(
    `Refusing to prune an unexpected project: ${packageJson.name ?? "unknown"}`,
  );
}

const outputStat = await lstat(outputRoot);

if (!outputStat.isDirectory() || outputStat.isSymbolicLink()) {
  throw new Error(`Refusing to prune unsafe export path: ${outputRoot}`);
}

for (const relativeRoot of labExportRoots) {
  const target = path.resolve(outputRoot, relativeRoot);

  if (path.dirname(target) !== outputRoot) {
    throw new Error(`Refusing to prune path outside export root: ${target}`);
  }

  await rm(target, { recursive: true, force: true });
}

const remainingLabRoots = (await readdir(outputRoot)).filter((entry) =>
  labExportRoots.includes(entry),
);

if (remainingLabRoots.length > 0) {
  throw new Error(
    `Experimental exports remain: ${remainingLabRoots.join(", ")}`,
  );
}

for (const requiredPage of ["index.html", "zh/index.html", "ko/index.html"]) {
  const requiredPath = path.join(outputRoot, requiredPage);
  const requiredStat = await lstat(requiredPath);

  if (!requiredStat.isFile()) {
    throw new Error(`Required production page is missing: ${requiredPage}`);
  }
}

console.log(
  `✓ Production export excludes ${labExportRoots.length} experimental route/asset roots; source assets remain untouched in public/.`,
);
