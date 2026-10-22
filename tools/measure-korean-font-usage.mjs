// Measures which characters every exported Korean page actually lays out in
// each Korean web-font family ("Homeground Pretendard" for text, "Homeground
// MaruBuri" for the editorial serif), so tools/slice-korean-fonts.mjs can
// group the fonts' Hangul by how pages use them. Only a real browser knows
// which elements resolve to which family, so this drives a local headless
// Chrome over the DevTools protocol with Node built-ins, the same way
// tools/measure-serif-sc-usage.mjs measures the Chinese serif.
//
// usage (serve `out/` first, e.g. `npx serve out -l 8127`):
//   node tools/measure-korean-font-usage.mjs --origin=http://127.0.0.1:8127 \
//     --chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
//     [--export=out] [--output=korean-font-usage.json] [--port=9231]
//
// Each page is measured at 1440x900, 1920x1080, 1024x1366 (tablet), 430x932,
// 412x823 and 375x812 (phones): a heading can wrap into the first viewport at one size and
// not another, and every character there must be in slice 00. A character counts
// as "laid out" in a family when a rendered text node whose first font family
// is that family contains it, as "first viewport" when that node starts above
// the fold, and as "hidden" when the node is in the DOM in that family but not
// rendered (closed menus and panels). Generated text (::before and ::after)
// and form placeholders count too. Priority pages are sampled a few times so
// rotating hero phrases are included.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve, sep } from "node:path";
import { featuredGuidePaths, isPriorityPath, koreanFonts } from "./korean-font-slice-plan.mjs";

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
const exportDirectory = resolve(args.export || "out", "ko");
const outputPath = resolve(args.output || "korean-font-usage.json");
const port = Number(args.port || 9231);
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
const families = koreanFonts.map((font) => font.family);

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const extractExpression = `(() => {
  const families = ${JSON.stringify(families)};
  const found = Object.fromEntries(families.map((family) => [family, { laidOut: new Set(), firstViewport: new Set(), hidden: new Set() }]));
  const record = (element, pseudo, text, rects) => {
    const family = getComputedStyle(element, pseudo).fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "");
    const entry = found[family];
    if (!entry) return;
    if (!rects.length) {
      for (const character of text) if (character.trim()) entry.hidden.add(character);
      return;
    }
    const inFirstViewport = rects[0].top < innerHeight;
    for (const character of text) {
      if (!character.trim()) continue;
      entry.laidOut.add(character);
      if (inFirstViewport) entry.firstViewport.add(character);
    }
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.nodeValue;
    const parent = node.parentElement;
    if (!text || !text.trim() || !parent || parent.closest("script,style,noscript,template")) continue;
    range.selectNodeContents(node);
    record(parent, null, text, range.getClientRects());
  }
  for (const element of document.body.querySelectorAll("*")) {
    for (const pseudo of ["::before", "::after"]) {
      const quoted = getComputedStyle(element, pseudo).content.match(/"((?:[^"\\\\]|\\\\.)*)"/g);
      if (quoted) record(element, pseudo, quoted.map((part) => part.slice(1, -1)).join(""), element.getClientRects());
    }
    if (element.placeholder) record(element, null, element.placeholder, element.getClientRects());
  }
  return JSON.stringify(Object.fromEntries(Object.entries(found).map(([family, entry]) => [family, {
    laidOut: [...entry.laidOut].join(""), firstViewport: [...entry.firstViewport].join(""), hidden: [...entry.hidden].join(""),
  }])));
})()`;

async function measureViewport({ width, height, mobile }, results) {
  const profile = mkdtempSync(join(tmpdir(), "korean-font-usage-"));
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
      const entry = results.get(path) ?? Object.fromEntries(families.map((family) => [family, { laidOut: new Set(), firstViewport: new Set(), hidden: new Set() }]));
      const firstViewportSize = () => families.reduce((total, family) => total + entry[family].firstViewport.size, 0);
      let samples = isPriorityPath(path, featuredGuides) ? 6 : 1;
      for (let sample = 0; sample < samples; sample += 1) {
        if (sample > 0) await sleep(2100);
        const before = firstViewportSize();
        const measured = await evaluate(extractExpression);
        for (const family of families) {
          for (const kind of ["laidOut", "firstViewport", "hidden"]) {
            for (const character of measured[family][kind]) entry[family][kind].add(character);
          }
        }
        // Stop sampling once a page shows nothing new above the fold.
        if (sample > 0 && firstViewportSize() === before) samples = sample + 1;
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
  { width: 1920, height: 1080, mobile: false },
  { width: 1024, height: 1366, mobile: true },
  { width: 430, height: 932, mobile: true },
  { width: 412, height: 823, mobile: true },
  { width: 375, height: 812, mobile: true },
]) {
  await measureViewport(viewport, results);
}

writeFileSync(outputPath, `${JSON.stringify({
  families,
  origin,
  featuredGuides,
  pages: paths.map((path) => ({
    path,
    families: Object.fromEntries(families.map((family) => [family, {
      laidOut: [...results.get(path)[family].laidOut].join(""),
      firstViewport: [...results.get(path)[family].firstViewport].join(""),
      hidden: [...results.get(path)[family].hidden].join(""),
    }])),
  })),
}, null, 1)}\n`);
console.log(`✓ Measured ${paths.length} Korean pages; wrote ${outputPath}`);
