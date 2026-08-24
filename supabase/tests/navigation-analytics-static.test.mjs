import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath) =>
  readFile(path.join(projectRoot, relativePath), "utf8");

test("global navigation records only controlled anonymous dimensions", async () => {
  const [analytics, header] = await Promise.all([
    source("lib/analytics.ts"),
    source("components/HomegroundHeader.tsx"),
  ]);

  assert.match(analytics, /\| "navigation_clicked"/);
  assert.match(analytics, /"navigation_item"/);
  assert.match(analytics, /"navigation_surface"/);

  assert.match(header, /trackEvent\("navigation_clicked", \{/);
  assert.match(header, /navigation_item: item/);
  assert.match(header, /navigation_surface: surface/);
  assert.match(header, /page_language: locale/);
  assert.match(header, /trackNavigationClick\(item\.id, "desktop-primary"\)/);
  assert.match(header, /trackNavigationClick\("faq", "desktop-utility"\)/);
  assert.match(header, /trackNavigationClick\(item\.id, "mobile-primary"\)/);
  assert.match(header, /trackNavigationClick\("faq", "mobile-utility"\)/);
  assert.doesNotMatch(
    header,
    /trackEvent\("navigation_clicked", \{[^}]*?(?:href|query|hash|title|description):/s,
  );
});
