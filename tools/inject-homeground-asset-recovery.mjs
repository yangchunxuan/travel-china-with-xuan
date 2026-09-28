import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const marker = "data-homeground-asset-recovery";

/** Move the React-rendered script before Next's hoisted async chunks. */
export function moveHomegroundAssetRecovery(html) {
  const scriptMatch = /<script\b[^>]*\bdata-homeground-asset-recovery(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?[^>]*>[\s\S]*?<\/script>/i.exec(html);
  if (!scriptMatch) throw new Error("Exported HTML is missing the layout recovery script.");
  const head = /<head(?:\s[^>]*)?>/i.exec(html);
  if (!head) throw new Error("Exported HTML is missing <head>.");

  let insertAt = head.index + head[0].length;
  const charset = /^\s*<meta\s+charset\s*=\s*["']?utf-8["']?\s*\/?\s*>/i.exec(
    html.slice(insertAt),
  );
  if (charset) insertAt += charset[0].length;
  if (scriptMatch.index === insertAt) return html;
  if (scriptMatch.index < insertAt) throw new Error("Recovery script precedes document charset.");
  const withoutScript = html.slice(0, scriptMatch.index) + html.slice(scriptMatch.index + scriptMatch[0].length);
  const injected = withoutScript.slice(0, insertAt) + scriptMatch[0] + withoutScript.slice(insertAt);

  const firstNextChunk = injected.search(/<script\b[^>]*src=["']\/_next\/static\//i);
  if (firstNextChunk !== -1 && firstNextChunk < injected.indexOf(marker)) {
    throw new Error("Asset recovery must run before the first Next.js chunk.");
  }
  return injected;
}

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const location = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(location);
    else if (entry.isFile() && entry.name.endsWith(".html")) yield location;
  }
}

async function main() {
  const out = path.resolve("out");
  let scanned = 0;
  let updated = 0;
  for await (const file of htmlFiles(out)) {
    // The admin app has its own root layout and no public travel controls.
    if (path.relative(out, file).split(path.sep)[0] === "admin") continue;
    scanned += 1;
    const original = await readFile(file, "utf8");
    const injected = moveHomegroundAssetRecovery(original);
    if (injected !== original) {
      await writeFile(file, injected);
      updated += 1;
    }
  }
  if (!scanned) throw new Error("No exported HTML to inspect.");
  console.log(`✓ Asset recovery precedes Next.js chunks in ${scanned} HTML file(s); moved ${updated}.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  await main();
}
