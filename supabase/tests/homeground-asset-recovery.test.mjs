import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

import { homegroundAssetRecoveryBootstrap, homegroundHeadScript } from "../../lib/homegroundAssetRecovery.ts";
import { homegroundInternalRouteBootstrap } from "../../lib/homegroundRouteSession.ts";
import { moveHomegroundAssetRecovery } from "../../tools/inject-homeground-asset-recovery.mjs";

function boot(href) {
  const listeners = new Map();
  const redirects = [];
  const historyUpdates = [];
  const location = {
    href,
    origin: new URL(href).origin,
    replace(next) { redirects.push(next); },
  };
  const window = {
    location,
    history: {
      state: null,
      replaceState(_state, _title, next) { historyUpdates.push(next); },
    },
    addEventListener(name, listener) { listeners.set(name, listener); },
  };
  runInNewContext(homegroundAssetRecoveryBootstrap, { URL, Date, window });
  return { listeners, redirects, historyUpdates };
}

test("a missing Next.js script retries the same page once with a fresh URL", () => {
  const page = boot("https://homegroundchina.com/?service=route#planner-contact");
  const failure = {
    target: {
      tagName: "SCRIPT",
      src: "https://homegroundchina.com/_next/static/chunks/old.js",
    },
  };
  page.listeners.get("error")(failure);
  page.listeners.get("error")(failure);

  assert.equal(page.redirects.length, 1);
  const destination = new URL(page.redirects[0]);
  assert.equal(destination.pathname, "/index.html");
  assert.equal(destination.searchParams.get("service"), "route");
  assert.ok(destination.searchParams.has("_hgjs"));
  assert.equal(destination.hash, "#planner-contact");
});

test("unrelated script failures and an already retried page do not reload", () => {
  const page = boot("https://homegroundchina.com/");
  page.listeners.get("error")({
    target: { tagName: "SCRIPT", src: "https://example.com/pixel.js" },
  });
  assert.deepEqual(page.redirects, []);

  const retried = boot("https://homegroundchina.com/?_hgjs=123");
  retried.listeners.get("error")({
    target: {
      tagName: "SCRIPT",
      src: "https://homegroundchina.com/_next/static/chunks/old.js",
    },
  });
  assert.deepEqual(retried.redirects, []);
  assert.deepEqual(retried.historyUpdates, ["/"]);

  const settled = boot("https://homegroundchina.com/");
  settled.listeners.get("load")();
  settled.listeners.get("error")({
    target: {
      tagName: "SCRIPT",
      src: "https://homegroundchina.com/_next/static/chunks/old.js",
    },
  });
  assert.deepEqual(settled.redirects, []);
});

test("a failed chunk before window load also retries the document", () => {
  const page = boot("https://homegroundchina.com/zh/");
  page.listeners.get("unhandledrejection")({
    reason: { name: "ChunkLoadError", message: "Loading chunk 123 failed" },
  });
  assert.equal(page.redirects.length, 1);
  assert.equal(new URL(page.redirects[0]).pathname, "/zh/index.html");
});

test("nested retry pages restore their canonical path before hydration", () => {
  const page = boot("https://homegroundchina.com/tours/example/?utm_source=google#faq");
  page.listeners.get("error")({
    target: {
      tagName: "SCRIPT",
      src: "https://homegroundchina.com/_next/static/chunks/old.js",
    },
  });
  const retryUrl = new URL(page.redirects[0]);
  assert.equal(retryUrl.pathname, "/tours/example/index.html");

  const retried = boot(retryUrl.href);
  assert.deepEqual(retried.historyUpdates, [
    "/tours/example/?utm_source=google#faq",
  ]);
});

test("export moves the React-rendered recovery script before every Next.js chunk", () => {
  const html = '<html><head><meta charSet="utf-8"/><script src="/_next/static/chunks/main.js" async=""></script><script data-homeground-asset-recovery>recover()</script><script>routeBootstrap()</script></head><body></body></html>';
  const injected = moveHomegroundAssetRecovery(html);
  assert.ok(injected.indexOf('charSet="utf-8"') < injected.indexOf("data-homeground-asset-recovery"));
  assert.ok(injected.indexOf("data-homeground-asset-recovery") < injected.indexOf('src="/_next/static/'));
  assert.equal(injected.match(/data-homeground-asset-recovery/g)?.length, 1);
  assert.ok(injected.includes("routeBootstrap()"));
  assert.equal(moveHomegroundAssetRecovery(injected), injected);
});

test("every public root layout starts its head with the recovery script; the admin app does not", () => {
  assert.equal(homegroundHeadScript, `${homegroundAssetRecoveryBootstrap}\n${homegroundInternalRouteBootstrap}`);
  const layouts = [
    "app/(default)/layout.tsx",
    "app/(localized)/[locale]/layout.tsx",
    "app/(japanese)/ja/layout.tsx",
    "app/(french)/fr/layout.tsx",
    "app/(german)/de/layout.tsx",
    "app/(spanish)/es/layout.tsx",
    "app/(arabic)/ar/layout.tsx",
  ];
  for (const file of layouts) {
    const source = readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
    assert.match(source, /<head>\s*<script data-homeground-asset-recovery="" dangerouslySetInnerHTML=\{\{ ?__html: ?homegroundHeadScript ?\}\} ?\/>/u, file);
    assert.doesNotMatch(source, /homegroundInternalRouteBootstrap/u, `${file}: the route marker now runs inside the head script`);
  }
  const admin = readFileSync(new URL("../../app/(admin)/layout.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(admin, /data-homeground-asset-recovery/u);

  const injector = readFileSync(new URL("../../tools/inject-homeground-asset-recovery.mjs", import.meta.url), "utf8");
  assert.match(injector, /=== "admin"\) continue;/u);
  assert.match(injector, /if \(!\/<script\\b\[\^>\]\*src=\["'\]\\\/_next\\\/static\\\/\/i\.test\(original\)\) continue;/u);
  const pkg = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));
  assert.match(pkg.scripts.postbuild, /prune-production-export\.mjs && node tools\/inject-homeground-asset-recovery\.mjs && /u);
});
