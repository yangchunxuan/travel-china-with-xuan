// Measures which characters every exported Chinese page actually lays out in
// the "Homeground Serif SC" family, so tools/slice-serif-sc-font.mjs can group
// the font's glyphs by how pages use them. Only a real browser knows which
// elements resolve to the serif (headings mostly, but not all of them), so this
// drives a local headless Chrome over the DevTools protocol with Node built-ins.
//
// usage (serve `out/` first, e.g. `npx serve out -l 8127`):
//   node tools/measure-serif-sc-usage.mjs --origin=http://127.0.0.1:8127 \
//     --chrome="C:/Program Files/Google/Chrome/Application/chrome.exe" \
//     [--export=out] [--output=serif-sc-usage.json] [--port=9230]
//
// Each page is measured at 1440x900 and at 375x812 (mobile). A character counts
// as "laid out" when a rendered text node whose first font family is the serif
// contains it, as "first viewport" when that node starts above the fold, and as
// "hidden" when the node is in the DOM in the serif but not rendered (closed
// menus and panels). Priority pages are sampled a few times so rotating hero
// phrases are included.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve, sep } from "node:path";
import { featuredGuidePaths, isPriorityPath, serifScFamily } from "./serif-sc-slice-plan.mjs";

const args = Object.fromEntries(
  process.argv.slice(2).map((argument) => {
    const [name, ...value] = argument.replace(/^--/, "").split("=");
    return [name, value.join("=")];
  }),
);
for (const name of ["origin", "chrome"]) {
  if (!args[name]) throw new Error(`Missing --${name}=...`);
}
const origin = args.origin.replace(/\/$/, "");
const exportDirectory = resolve(args.export || "out", "zh");
const outputPath = resolve(args.output || "serif-sc-usage.json");
const port = Number(args.port || 9230);
if (!existsSync(exportDirectory)) throw new Error(`Missing export: ${exportDirectory}`);

function exportedPaths(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) return exportedPaths(full);
    if (entry.name !== "index.html") return [];
    const route = relative(resolve(exportDirectory, ".."), directory).split(sep).join("/");
    return [`/${route}/`];
  });
}
const paths = exportedPaths(exportDirectory).sort();
const featuredGuides = featuredGuidePaths(exportDirectory);

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const extractExpression = `(() => {
  const laidOut = new Set(), firstViewport = new Set(), hidden = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.nodeValue;
    const parent = node.parentElement;
    if (!text || !text.trim() || !parent || parent.closest("script,style,noscript,template")) continue;
    const family = getComputedStyle(parent).fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "");
    if (family !== ${JSON.stringify(serifScFamily)}) continue;
    range.selectNodeContents(node);
    const rects = range.getClientRects();
    if (!rects.length) {
      for (const character of text) if (character.trim()) hidden.add(character);
      continue;
    }
    for (const character of text) {
      if (!character.trim()) continue;
      laidOut.add(character);
      if (rects[0].top < innerHeight) firstViewport.add(character);
    }
  }
  return JSON.stringify({ laidOut: [...laidOut].join(""), firstViewport: [...firstViewport].join(""), hidden: [...hidden].join("") });
})()`;

async function measureViewport({ width, height, mobile }, results) {
  const profile = mkdtempSync(join(tmpdir(), "serif-sc-usage-"));
  const chrome = spawn(args.chrome, ["--headless=new", "--hide-scrollbars", "--no-first-run",
    `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, `--window-size=${width},${height}`, "about:blank"], { stdio: "ignore" });
  try {
    let target;
    for (let attempt = 0; attempt < 80 && !target; attempt += 1) {
      try {
        target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((entry) => entry.type === "page");
      } catch {}
      if (!target) await sleep(250);
    }
    if (!target) throw new Error("Chrome did not expose a page target");
    const socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((done, fail) => { socket.onopen = done; socket.onerror = fail; });
    let sequence = 0;
    const pending = new Map();
    const listeners = [];
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.id && pending.has(data.id)) {
        const { done, fail } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) fail(new Error(JSON.stringify(data.error)));
        else done(data.result);
      } else if (data.method) {
        for (let index = listeners.length - 1; index >= 0; index -= 1) {
          if (listeners[index].method === data.method) listeners.splice(index, 1)[0].done();
        }
      }
    };
    const call = (method, params = {}) => new Promise((done, fail) => {
      sequence += 1;
      pending.set(sequence, { done, fail });
      socket.send(JSON.stringify({ id: sequence, method, params }));
    });
    const nextEvent = (method, timeout) => Promise.race([new Promise((done) => listeners.push({ method, done })), sleep(timeout)]);
    const evaluate = async (expression) => JSON.parse((await call("Runtime.evaluate", { expression, returnByValue: true })).result.value);

    await call("Page.enable");
    await call("Network.enable");
    await call("Network.setBlockedURLs", { urls: ["*supabase.co*"] });
    await call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile, screenWidth: width, screenHeight: height });

    for (const path of paths) {
      const loaded = nextEvent("Page.loadEventFired", 30000);
      await call("Page.navigate", { url: `${origin}${path}` });
      await loaded;
      await sleep(350);
      const entry = results.get(path) ?? { laidOut: new Set(), firstViewport: new Set(), hidden: new Set() };
      let samples = isPriorityPath(path, featuredGuides) ? 6 : 1;
      for (let sample = 0; sample < samples; sample += 1) {
        if (sample > 0) await sleep(2100);
        const before = entry.firstViewport.size;
        const measured = await evaluate(extractExpression);
        for (const character of measured.laidOut) entry.laidOut.add(character);
        for (const character of measured.firstViewport) entry.firstViewport.add(character);
        for (const character of measured.hidden) entry.hidden.add(character);
        // Stop sampling once a page shows nothing new above the fold.
        if (sample > 0 && entry.firstViewport.size === before) samples = sample + 1;
      }
      results.set(path, entry);
    }
    socket.close();
  } finally {
    chrome.kill();
    await sleep(800);
    rmSync(profile, { recursive: true, force: true });
  }
}

const results = new Map();
for (const viewport of [
  { width: 1440, height: 900, mobile: false },
  { width: 375, height: 812, mobile: true },
]) {
  await measureViewport(viewport, results);
}

writeFileSync(outputPath, `${JSON.stringify({
  family: serifScFamily,
  origin,
  featuredGuides,
  pages: paths.map((path) => ({
    path,
    laidOut: [...results.get(path).laidOut].join(""),
    firstViewport: [...results.get(path).firstViewport].join(""),
    hidden: [...results.get(path).hidden].join(""),
  })),
}, null, 1)}\n`);
console.log(`✓ Measured ${paths.length} Chinese pages; wrote ${outputPath}`);
