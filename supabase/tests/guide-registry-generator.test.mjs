import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { generateGuideRegistry } from "../../tools/generate-guide-registry.mjs";

test("guide registry check is semantic across LF and CRLF worktrees", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "homeground-guide-registry-"));
  const registryOutput = path.join(root, "guideRegistry.generated.ts");
  const bodiesOutput = path.join(root, "guideBodies.generated.ts");
  const guidesRoot = path.resolve(import.meta.dirname, "../../content/guides");

  const generated = await generateGuideRegistry({ guidesRoot, registryOutput, bodiesOutput });
  assert.ok(generated.guideCount > 0);
  for (const filePath of [registryOutput, bodiesOutput]) {
    const content = await readFile(filePath, "utf8");
    await writeFile(filePath, content.replaceAll("\n", "\r\n"), "utf8");
  }

  const checked = await generateGuideRegistry({
    guidesRoot,
    registryOutput,
    bodiesOutput,
    check: true,
  });
  assert.equal(checked.guideCount, generated.guideCount);
});
