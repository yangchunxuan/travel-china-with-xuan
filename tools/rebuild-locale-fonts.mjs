import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  collectLocaleFontSourceFiles,
  collectProductionExportFontFiles,
  readChineseFontCorpus,
  readCollectedFiles,
} from "./locale-font-file-collection.mjs";
import { localeFontSubsetOptions } from "./locale-font-subset-options.mjs";
import { serifScSourcePath } from "./serif-sc-slice-plan.mjs";

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

const sourceFiles = collectLocaleFontSourceFiles(projectRoot);
const sourceText = readCollectedFiles(sourceFiles);
// The export gate (check:font-coverage:export) also reads the built HTML and
// client JavaScript, where a few Japanese strings written without kana (利用規約,
// 事業者情報, the 一覧 of ツアー一覧) sit in shared chunks and pages. When an
// export exists, its characters are included too, so a rebuild never leaves the
// export gate short: build once, rebuild the fonts, then build again.
const exportDirectory = resolve(projectRoot, "out");
const chineseSourceText = readChineseFontCorpus(
  existsSync(exportDirectory)
    ? [...sourceFiles, ...collectProductionExportFontFiles(projectRoot)]
    : sourceFiles,
);

const commonCharacters = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 " +
    "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~©→↑—–·≈…“”‘’、。，“”：；（）《》！？【】「」『』＋−×",
).join("");
// Keep glyphs used by the currently published privacy copy during a staged
// content rollout, even when newer local wording no longer contains them.
// 昨 also appears in DayPicker's bundled Chinese relative-date labels.
// The other retained glyphs come from Japanese strings without kana in the
// currently published export; keep them through source-only local rebuilds.
const retainedPublishedChineseCharacters = "卷守履径遵昨別動報後業様約規覧許談";

function characterSet(text, pattern) {
  return [...new Set(`${commonCharacters}${text.match(pattern)?.join("") ?? ""}`)]
    .sort((left, right) => left.codePointAt(0) - right.codePointAt(0))
    .join("");
}

const chineseText = [
  ...new Set(
    `${retainedPublishedChineseCharacters}${characterSet(chineseSourceText, /[\p{Script=Han}]/gu)}`,
  ),
]
  .sort((left, right) => left.codePointAt(0) - right.codePointAt(0))
  .join("");
const koreanText = characterSet(sourceText, /[\p{Script=Hangul}]/gu);
const python = argumentsByName.python;
const pythonPath = argumentsByName.fonttools;
const fixedNoto = resolve(tmpdir(), "homeground-noto-serif-sc-500.ttf");

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

const sharedSubsetOptions = localeFontSubsetOptions;

// The Chinese subset is the source for its unicode-range slices; only the
// slices are published (tools/slice-serif-sc-font.mjs runs at the end).
runPython("fontTools.subset", [
  fixedNoto,
  `--text=${chineseText}`,
  `--output-file=${resolve(projectRoot, serifScSourcePath)}`,
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

const slicing = spawnSync(
  process.execPath,
  [
    resolve(projectRoot, "tools/slice-serif-sc-font.mjs"),
    `--python=${python}`,
    `--fonttools=${pythonPath}`,
  ],
  { cwd: projectRoot, stdio: "inherit" },
);
if (slicing.status !== 0) {
  throw new Error("tools/slice-serif-sc-font.mjs failed");
}

console.log(
  `✓ Rebuilt locale fonts for ${[...chineseText].length} Chinese-source and ${[...koreanText].length} Korean-source characters.`,
);
