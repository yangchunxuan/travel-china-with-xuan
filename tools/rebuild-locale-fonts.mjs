import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  collectLocaleFontSourceFiles,
  readCollectedFiles,
} from "./locale-font-file-collection.mjs";

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
