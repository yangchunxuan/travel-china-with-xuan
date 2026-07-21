import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const explicitSources = [
  "components/HomegroundHeader.tsx",
  "components/HomegroundHomePage.tsx",
  "components/HomegroundPrivacyPage.tsx",
  "components/PlannerHandoff.tsx",
  "components/RouteFinder.tsx",
  "lib/homegroundI18n.ts",
  "lib/homegroundPrivacyI18n.ts",
  "lib/guideRegistry.ts",
  "lib/zhangjiajieGuideI18n.ts",
  "lib/nightShowGuideCopy.zh.ts",
  "lib/nightShowGuideCopy.ko.ts",
  "lib/destinationPlannerI18n.ts",
  "lib/routeFinder.ts",
];

const sourceDirectories = ["app/(default)", "app/(localized)"];

function collectTypeScriptFiles(directory) {
  const absoluteDirectory = resolve(projectRoot, directory);

  if (!existsSync(absoluteDirectory)) {
    return [];
  }

  return readdirSync(absoluteDirectory, { withFileTypes: true }).flatMap(
    (entry) => {
      const entryPath = join(absoluteDirectory, entry.name);

      if (entry.isDirectory()) {
        return collectTypeScriptFiles(entryPath);
      }

      return [".ts", ".tsx"].includes(extname(entry.name)) ? [entryPath] : [];
    },
  );
}

const sourceFiles = [
  ...explicitSources.map((source) => resolve(projectRoot, source)),
  ...sourceDirectories.flatMap(collectTypeScriptFiles),
];

const sourceText = sourceFiles
  .filter(existsSync)
  .map((source) => readFileSync(source, "utf8"))
  .join("\n");

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
    fontPath: "public/fonts/homeground-serif-sc.woff2",
    label: "Chinese editorial font",
  },
  {
    characters: koreanCharacters,
    fontPath: "public/fonts/homeground-pretendard-ko.woff2",
    label: "Korean interface font",
  },
  {
    characters: koreanCharacters,
    fontPath: "public/fonts/homeground-maruburi-ko.woff2",
    label: "Korean editorial font",
  },
];

let failed = false;

for (const check of checks) {
  const absoluteFontPath = resolve(projectRoot, check.fontPath);
  const font = fontkit.openSync(absoluteFontPath);
  const missing = check.characters.filter(
    (character) => !font.hasGlyphForCodePoint(character.codePointAt(0)),
  );

  if (missing.length > 0) {
    failed = true;
    const details = missing
      .map(
        (character) =>
          `${character} (U+${character
            .codePointAt(0)
            .toString(16)
            .toUpperCase()
            .padStart(4, "0")})`,
      )
      .join(", ");

    console.error(
      `✗ ${check.label} is missing ${missing.length} required glyph(s): ${details}`,
    );
  } else {
    console.log(
      `✓ ${check.label} covers all ${check.characters.length} required characters.`,
    );
  }
}

if (failed) {
  console.error(
    "\nRegenerate the locale font subsets before building; see public/fonts/README.md.",
  );
  process.exitCode = 1;
}
