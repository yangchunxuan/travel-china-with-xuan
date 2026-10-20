import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getHomegroundNavigationModel } from "../../lib/homegroundNavigationModel.ts";

const source = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
const english = getHomegroundNavigationModel("en", "/", { includeCorporateTravel: false });
// lib/japaneseSite.ts imports without extensions, so its route table is read from the source.
const siteSource = await source("lib/japaneseSite.ts");
const japaneseSite = Object.fromEntries([...siteSource.slice(siteSource.indexOf("export const japaneseSite = {"), siteSource.indexOf("} as const;")).matchAll(/\n\s+([a-zA-Z]+): "([^"]+)",/gu)].map((match) => [match[1], match[2]]));

/** Each `id: { label, description, href }` row of a block, with japaneseSite.* hrefs resolved. */
function rows(block) {
  const out = new Map();
  for (const match of block.matchAll(/(?:^|\n)\s*"?([a-z-]+)"?: \{ label: "([^"]+)", description: "([^"]+)", href: (japaneseSite\.[a-zA-Z]+|"[^"]+") \}/gu)) {
    const href = match[4].startsWith("japaneseSite.") ? japaneseSite[match[4].slice("japaneseSite.".length)] : match[4].slice(1, -1);
    out.set(match[1], { label: match[2], href });
  }
  return out;
}

test("the Japanese header has every English item and menu row, each opening the Japanese page", async () => {
  const header = await source("components/JapaneseHeader.tsx");
  const items = rows(header.slice(header.indexOf("const japaneseItems"), header.indexOf("const japaneseEntries")));
  const entries = rows(header.slice(header.indexOf("const japaneseEntries"), header.indexOf("const toggles")));
  assert.deepEqual([...items.keys()], english.items.map((item) => item.id), "same items, same order");
  for (const item of english.items) assert.equal(items.get(item.id).href, `/ja${item.href}`, `${item.id} opens /ja${item.href}`);
  for (const [menuId, menu] of Object.entries(english.menus)) {
    for (const entry of menu.entries) {
      assert.ok(entries.has(entry.id), `${menuId} menu: ${entry.id} is in Japanese`);
      assert.equal(entries.get(entry.id).href, `/ja${entry.href}`, `${entry.id} opens /ja${entry.href}`);
    }
  }
  assert.equal(items.get("studio").href, "/ja/company/", "About opens the company page, as in English");
  // The shared header renders it; nothing is Japanese-only.
  assert.match(header, /<HomegroundHeader locale="en"[\s\S]*edition=\{\{ language: "ja", copy, navigation,/u);
});

test("every Japanese page uses the shared header and footer", async () => {
  const chrome = await source("components/JapaneseTourChrome.tsx");
  assert.match(chrome, /return <JapaneseHeader \{\.\.\.props\} \/>;/u);
  assert.match(chrome, /return <JapaneseFooter currentPath=\{currentPath\} \/>;/u);
  const home = await source("components/JapaneseHomePageClient.tsx");
  assert.match(home, /footer: <JapaneseFooter currentPath=\{japaneseSite\.home\} variant="homepage" \/>/u);

  const footer = await source("components/JapaneseFooter.tsx");
  assert.match(footer, /<HomegroundFooter locale="en"/u);
  assert.match(footer, /company: \{ path: japaneseSite\.company, navLabel: "私たちの使命" \}/u);
  for (const path of ["privacy", "businessInformation", "terms", "refundDelivery", "services", "guides", "tours", "studio"]) {
    assert.ok(japaneseSite[path].startsWith("/ja/"), `${path} is a Japanese page`);
  }
  assert.match(footer, /entry: "\/ja\/guides\/china-entry-requirements\/"/u);
});
