import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";
import { getGuidePath } from "../../lib/guidePath.ts";

async function load(path, dependencies = {}) {
  const source = await readFile(new URL(`../../${path}`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    module, exports: module.exports,
    require(id) {
      assert.ok(id in dependencies, `Unexpected dependency ${id}`);
      return dependencies[id];
    },
  }, { filename: path });
  return module.exports;
}

test("lightweight navigation preserves every published guide language URL", async () => {
  const generated = await load("lib/generated/guideRegistry.generated.ts");
  const { guideRegistry } = await load("lib/guideRegistry.ts", {
    "./homegroundI18n": { homegroundLocales: ["en", "zh", "ko"] },
    "./generated/guideRegistry.generated": generated,
  });
  assert.ok(guideRegistry.length > 100);
  for (const guide of guideRegistry) {
    for (const [locale, entry] of Object.entries(guide.locales)) {
      assert.equal(getGuidePath(guide.id, locale), entry.path, `${guide.id}: ${locale}`);
    }
  }
});
