import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import test from "node:test";
import {
  collectLocaleFontSourceFiles,
  readChineseFontCorpus,
  readCollectedFiles,
} from "../locale-font-file-collection.mjs";

test("Japanese-only copy does not create Chinese font requirements", async (context) => {
  const root = await mkdtemp(join(tmpdir(), "homeground-font-corpus-"));
  context.after(() => rm(root, { recursive: true, force: true }));

  const fixture = {
    "app/(japanese)/ja/page.tsx": "日本語の駅",
    "app/(localized)/[locale]/page.tsx": "中文的龘",
    "components/JapaneseCard.tsx": "日本語の駅",
    "components/SharedCard.tsx": "export const chinese = '中文的龘', japanese = '駅を訪れる';\nexport const byline = <p>執筆：日本語の案内</p>;",
    "lib/chinaTripCostJapaneseCopy.ts": "日本語の駅",
    "lib/japaneseHomeCopy.ts": "日本語の駅",
    "lib/chinaTripCostI18n.ts": "中文的龘",
    "content/guides/example/body.ja.ts": "日本語の駅",
    "content/guides/example/body.zh.ts": "中文的龘",
  };

  await Promise.all(
    Object.entries(fixture).map(async ([path, source]) => {
      const absolutePath = join(root, path);
      await mkdir(dirname(absolutePath), { recursive: true });
      await writeFile(absolutePath, source);
    }),
  );

  const files = collectLocaleFontSourceFiles(root);
  const paths = files.map((file) => relative(root, file).replaceAll("\\", "/"));
  assert.deepEqual(paths, [
    "app/(localized)/[locale]/page.tsx",
    "components/SharedCard.tsx",
    "content/guides/example/body.zh.ts",
    "lib/chinaTripCostI18n.ts",
  ]);

  const fullCorpus = readCollectedFiles(files);
  assert.match(fullCorpus, /執筆/u);

  const chineseCorpus = readChineseFontCorpus(files);
  assert.match(chineseCorpus, /龘/u);
  assert.doesNotMatch(chineseCorpus, /執筆|駅/u);
});

test("Chinese text remains in a minified chunk beside Japanese text", async (context) => {
  const root = await mkdtemp(join(tmpdir(), "homeground-font-chunk-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const chunk = join(root, "shared.js");
  await writeFile(chunk, 'const chinese="中文的龘",japanese="駅を訪れる";');

  const chineseCorpus = readChineseFontCorpus([chunk]);
  assert.match(chineseCorpus, /龘/u);
  assert.doesNotMatch(chineseCorpus, /駅|訪/u);
});
