// GitHub Pages serves out/404.html for every unmatched path. Next.js only
// fills that file from app/not-found.tsx when a single root layout exists, so
// the branded page is exported as a normal route (/404/) and copied over here.
import { copyFile, rm, stat } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.join(process.cwd(), "out");
const source = path.join(outputRoot, "404", "index.html");
const target = path.join(outputRoot, "404.html");

await stat(source).catch(() => {
  throw new Error(`branded 404 export missing: ${path.relative(process.cwd(), source)}`);
});
await copyFile(source, target);
await rm(path.join(outputRoot, "404"), { recursive: true, force: true });
console.log("✓ out/404.html now carries the branded not-found page.");
