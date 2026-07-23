import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argumentsByName = Object.fromEntries(
  process.argv.slice(2).map((argument) => {
    const [name, ...value] = argument.replace(/^--/, "").split("=");
    return [name, value.join("=")];
  }),
);

const requiredArguments = [
  "noto",
  "pretendard",
  "maruburi",
  "fonttools",
  "python",
];
for (const name of requiredArguments) {
  if (!argumentsByName[name]) {
    throw new Error(`Missing --${name}=...`);
  }
}

const explicitSources = [
  "components/HomegroundHeader.tsx",
  "components/HomegroundHomePage.tsx",
  "components/HomegroundPrivacyPage.tsx",
  "components/PlannerHandoff.tsx",
  "components/RouteFinder.tsx",
  "components/ZhangjiajieGuidePage.tsx",
  "components/TenDayChinaRouteGuidePage.tsx",
  "components/TantanZhangjiajieStoryPage.tsx",
  "lib/homegroundI18n.ts",
  "lib/homegroundStudioI18n.ts",
  "lib/homegroundPrivacyI18n.ts",
  "lib/destinationPlannerI18n.ts",
  "lib/routeFinder.ts",
  "lib/guideRegistry.ts",
  "lib/zhangjiajieGuideI18n.ts",
  "lib/nightShowGuideCopy.zh.ts",
  "lib/nightShowGuideCopy.ko.ts",
  "lib/tenDayGuideCopy.zh.ts",
  "lib/tenDayGuideCopy.ko.ts",
  "lib/beijingZhangjiajieShanghaiTransportI18n.ts",
  "lib/chinaItineraryTooRushedI18n.ts",
  "lib/chinaItineraryReviewI18n.ts",
  "lib/routeServiceInterest.ts",
  "lib/tantanZhangjiajieStoryI18n.ts",
];
const sourceDirectories = ["app/(default)", "app/(localized)"];

function collectTypeScriptFiles(directory) {
  const absoluteDirectory = resolve(projectRoot, directory);
  if (!existsSync(absoluteDirectory)) return [];

  return readdirSync(absoluteDirectory, { withFileTypes: true }).flatMap(
    (entry) => {
      const entryPath = join(absoluteDirectory, entry.name);
      if (entry.isDirectory()) return collectTypeScriptFiles(entryPath);
      return [".ts", ".tsx"].includes(extname(entry.name)) ? [entryPath] : [];
    },
  );
}

const sourceText = [
  ...explicitSources.map((source) => resolve(projectRoot, source)),
  ...sourceDirectories.flatMap(collectTypeScriptFiles),
]
  .filter(existsSync)
  .map((source) => readFileSync(source, "utf8"))
  .join("\n");

const commonCharacters = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 " +
    "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~©→↑—–·≈…“”‘’、。，“”：；（）《》！？【】「」『』＋−×",
).join("");
// Keep glyphs used by the currently published privacy copy during a staged
// content rollout, even when newer local wording no longer contains them.
const retainedPublishedChineseCharacters = "卷守履径遵";

function characterSet(pattern) {
  return [...new Set(`${commonCharacters}${sourceText.match(pattern)?.join("") ?? ""}`)]
    .sort((left, right) => left.codePointAt(0) - right.codePointAt(0))
    .join("");
}

const chineseText = [
  ...new Set(
    `${retainedPublishedChineseCharacters}${characterSet(/[\p{Script=Han}]/gu)}`,
  ),
]
  .sort((left, right) => left.codePointAt(0) - right.codePointAt(0))
  .join("");
const koreanText = characterSet(/[\p{Script=Hangul}]/gu);
const python = argumentsByName.python;
const pythonPath = argumentsByName.fonttools;
const fixedNoto = "/private/tmp/homeground-noto-serif-sc-500.ttf";

function runPython(module, args) {
  const result = spawnSync(python, ["-m", module, ...args], {
    cwd: projectRoot,
    env: { ...process.env, PYTHONPATH: pythonPath },
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `${module} failed`);
  }
}

runPython("fontTools.varLib.instancer", [
  argumentsByName.noto,
  "wght=500",
  `--output=${fixedNoto}`,
]);

const sharedSubsetOptions = [
  "--flavor=woff2",
  "--layout-features=*",
  "--glyph-names",
  "--symbol-cmap",
  "--legacy-cmap",
  "--notdef-glyph",
  "--notdef-outline",
  "--recommended-glyphs",
  "--name-IDs=*",
  "--name-legacy",
  "--name-languages=*",
];

runPython("fontTools.subset", [
  fixedNoto,
  `--text=${chineseText}`,
  `--output-file=${resolve(projectRoot, "public/fonts/homeground-serif-sc.woff2")}`,
  ...sharedSubsetOptions,
]);

runPython("fontTools.subset", [
  argumentsByName.pretendard,
  `--text=${koreanText}`,
  `--output-file=${resolve(projectRoot, "public/fonts/homeground-pretendard-ko.woff2")}`,
  ...sharedSubsetOptions,
]);

runPython("fontTools.subset", [
  argumentsByName.maruburi,
  `--text=${koreanText}`,
  `--output-file=${resolve(projectRoot, "public/fonts/homeground-maruburi-ko.woff2")}`,
  ...sharedSubsetOptions,
]);

console.log(
  `✓ Rebuilt locale fonts for ${[...chineseText].length} Chinese-source and ${[...koreanText].length} Korean-source characters.`,
);
