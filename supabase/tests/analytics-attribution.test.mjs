import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { afterEach, test } from "node:test";
import {
  ANALYTICS_ENABLED,
  captureEntryAttribution,
  captureGuideSource,
  clearEntryAttribution,
  readEntryAttribution,
  trackEvent,
} from "../../lib/analytics.ts";

const originalWindow = globalThis.window;
const attributionStorageKey = "homeground-entry-attribution";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

async function sourceFilesBelow(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = new URL(entry.name, directory);
    if (entry.isDirectory()) {
      files.push(...(await sourceFilesBelow(new URL(`${entry.name}/`, directory))));
    } else if (/\.[cm]?[jt]sx?$/u.test(entry.name)) {
      files.push(path);
    }
  }
  return files;
}

class MemoryStorage {
  #values = new Map();

  getItem(key) {
    return this.#values.get(key) ?? null;
  }

  setItem(key, value) {
    this.#values.set(key, String(value));
  }

  removeItem(key) {
    this.#values.delete(key);
  }
}

function installWindow(pathname, search = "") {
  const sessionStorage = new MemoryStorage();
  globalThis.window = {
    location: { pathname, search },
    sessionStorage,
  };
  return globalThis.window;
}

afterEach(() => {
  if (originalWindow === undefined) {
    delete globalThis.window;
  } else {
    globalThis.window = originalWindow;
  }
});

test("entry path and external campaign labels are first-touch", () => {
  const browser = installWindow(
    "/guides/china-visa-free-canadian-citizens-2026/",
    "?utm_source=google&utm_medium=organic&utm_campaign=canada&utm_content=search-result",
  );

  captureEntryAttribution();
  browser.location.pathname = "/";
  browser.location.search =
    "?source_guide=china-visa-free-canadian-citizens-2026&utm_source=owned";
  captureEntryAttribution();

  assert.deepEqual(readEntryAttribution(), {
    entry_path: "/guides/china-visa-free-canadian-citizens-2026/",
    source_guide: "china-visa-free-canadian-citizens-2026",
    utm_source: "google",
    utm_medium: "organic",
    utm_campaign: "canada",
    utm_content: "search-result",
  });
});

test("the latest valid guide CTA wins without accepting arbitrary storage keys", () => {
  const browser = installWindow("/guides/");
  captureEntryAttribution();
  captureGuideSource("zhangjiajie-itinerary");
  captureGuideSource("best-zhangjiajie-night-show");
  captureGuideSource("traveller@example.com");
  captureGuideSource("private-campaign");

  const stored = JSON.parse(
    browser.sessionStorage.getItem(attributionStorageKey),
  );
  browser.sessionStorage.setItem(
    attributionStorageKey,
    JSON.stringify({
      ...stored,
      email: "traveller@example.com",
      note: "private free text",
    }),
  );

  assert.deepEqual(readEntryAttribution(), {
    entry_path: "/guides/",
    source_guide: "best-zhangjiajie-night-show",
  });
});

test("a confirmed enquiry can end the attribution session", () => {
  const browser = installWindow("/guides/zhangjiajie-itinerary/");
  captureEntryAttribution();
  captureGuideSource("zhangjiajie-itinerary");

  clearEntryAttribution();

  assert.equal(
    browser.sessionStorage.getItem(attributionStorageKey),
    null,
  );
  assert.deepEqual(readEntryAttribution(), {});
});

test("an arbitrary or personal 404 path is reduced to one non-identifying bucket", () => {
  const browser = installWindow("/traveller@example.com");

  captureEntryAttribution();

  assert.deepEqual(readEntryAttribution(), {
    entry_path: "/other/",
  });

  browser.sessionStorage.setItem(
    attributionStorageKey,
    JSON.stringify({
      entry_path: "/private-note-for-alice",
      source_guide: "zhangjiajie-itinerary",
    }),
  );

  assert.deepEqual(readEntryAttribution(), {
    entry_path: "/other/",
    source_guide: "zhangjiajie-itinerary",
  });
});

test("a paid click id survives the session so the ad spend stays attributable", () => {
  const browser = installWindow(
    "/guides/china-visa-free-uk-citizens-2026/",
    "?gclid=Cj0KCQjw_-_ABhC-ARIsAAWQ9ZR3lm2Q&utm_source=google&utm_medium=cpc",
  );

  captureEntryAttribution();
  browser.location.pathname = "/";
  browser.location.search = "?gclid=SecondClickShouldNotOverwrite";
  captureEntryAttribution();

  const { ad_click_at: clickTime, ...attribution } = readEntryAttribution();
  assert.deepEqual(attribution, {
    entry_path: "/guides/china-visa-free-uk-citizens-2026/",
    gclid: "Cj0KCQjw_-_ABhC-ARIsAAWQ9ZR3lm2Q",
    utm_source: "google",
    utm_medium: "cpc",
  });
  assert.equal(typeof clickTime, "number");
});

test("an ad click landing mid-session is still captured", () => {
  const browser = installWindow("/guides/zhangjiajie-itinerary/");
  captureEntryAttribution();

  browser.location.search = "?gclid=LateButPaidFor_123";
  captureEntryAttribution();

  assert.equal(readEntryAttribution().gclid, "LateButPaidFor_123");
});

test("a Meta click id is captured on the same terms as Google's", () => {
  const browser = installWindow(
    "/guides/zhangjiajie-itinerary/",
    "?fbclid=IwZXh0bgNhZW0BMAABHqK-3lm2Q_rTn0aZ",
  );

  captureEntryAttribution();
  browser.location.search = "?fbclid=SecondClickShouldNotOverwrite";
  captureEntryAttribution();

  const { ad_click_at: clickTime, ...attribution } = readEntryAttribution();
  assert.deepEqual(attribution, {
    entry_path: "/guides/zhangjiajie-itinerary/",
    fbclid: "IwZXh0bgNhZW0BMAABHqK-3lm2Q_rTn0aZ",
  });
  assert.equal(typeof clickTime, "number");
});

test("the click is timed when it happens, not when the enquiry is sent", () => {
  const browser = installWindow("/", "?fbclid=IwAR_PaidClick");
  const before = Date.now();
  captureEntryAttribution();
  const stamped = readEntryAttribution().ad_click_at;

  assert.ok(stamped >= before && stamped <= Date.now());

  // Browsing on does not re-date the click that was actually paid for.
  browser.location.pathname = "/guides/zhangjiajie-itinerary/";
  browser.location.search = "";
  captureEntryAttribution();
  assert.equal(readEntryAttribution().ad_click_at, stamped);
});

test("a click time without a click id, or a forged one, is discarded", () => {
  const browser = installWindow("/");

  for (const stored of [
    { entry_path: "/", ad_click_at: Date.now() }, // no click id
    { entry_path: "/", fbclid: "IwAR_ok", ad_click_at: 1 }, // pre-dates the site
    {
      entry_path: "/",
      fbclid: "IwAR_ok",
      ad_click_at: Date.now() + 90 * 24 * 60 * 60 * 1000, // fabricated future
    },
    { entry_path: "/", fbclid: "IwAR_ok", ad_click_at: "yesterday" },
  ]) {
    browser.sessionStorage.setItem(
      attributionStorageKey,
      JSON.stringify(stored),
    );
    assert.equal(
      readEntryAttribution().ad_click_at,
      undefined,
      JSON.stringify(stored),
    );
  }
});

test("a long Meta click id is not truncated away", () => {
  const longFbclid = `IwAR${"aB9_-".repeat(60)}`; // 304 chars, over the old 200 cap
  installWindow("/", `?fbclid=${longFbclid}`);

  captureEntryAttribution();

  assert.equal(readEntryAttribution().fbclid, longFbclid);
});

test("only an opaque click token is accepted, never traveller text", () => {
  const browser = installWindow(
    "/",
    "?gclid=alice%40example.com&fbclid=call%20her%20at%20noon",
  );
  captureEntryAttribution();
  assert.equal(readEntryAttribution().gclid, undefined);
  assert.equal(readEntryAttribution().fbclid, undefined);

  browser.sessionStorage.setItem(
    attributionStorageKey,
    JSON.stringify({
      entry_path: "/",
      gclid: "note about Alice, +44 7700 900000",
      fbclid: "alice@example.com",
    }),
  );

  assert.deepEqual(readEntryAttribution(), { entry_path: "/" });
});

test("known public paths are canonicalized to their trailing-slash route", () => {
  installWindow("/zh/guides/zhangjiajie-itinerary");

  captureEntryAttribution();

  assert.deepEqual(readEntryAttribution(), {
    entry_path: "/zh/guides/zhangjiajie-itinerary/",
  });
});

test("corrupt legacy session state is removed and attribution can recover", () => {
  const browser = installWindow(
    "/guides/zhangjiajie-itinerary/",
    "?utm_source=google",
  );
  browser.sessionStorage.setItem(attributionStorageKey, "{not-json");

  captureEntryAttribution();

  assert.deepEqual(readEntryAttribution(), {
    entry_path: "/guides/zhangjiajie-itinerary/",
    utm_source: "google",
  });
});

test("disabled analytics is a true no-op even when a stale gtag exists", () => {
  const browser = installWindow("/");
  const calls = [];
  browser.gtag = (...args) => calls.push(args);

  assert.equal(ANALYTICS_ENABLED, false);
  trackEvent("planner_started", { page_language: "en" });

  assert.deepEqual(calls, []);
  assert.equal(browser.dataLayer, undefined);
});

test("the form clears attribution only after definitive backend success", async () => {
  const planner = await source("components/PlannerHandoff.tsx");

  assert.equal(
    planner.match(/clearEntryAttribution\(\);/g)?.length,
    1,
    "there must be exactly one cleanup call so failures and uncertain responses retain attribution",
  );
  assert.match(
    planner,
    /success\?\.state === "submitted"[\s\S]*?trackEnquirySubmitted\([\s\S]*?clearEntryAttribution\(\);[\s\S]*?setStatus\("success"\)[\s\S]*?return;[\s\S]*?setStatus\("uncertain"\)/,
    "cleanup must stay inside the submitted + public-reference success branch and before the uncertain branch",
  );
});

test("public CTA URLs never reuse external UTM fields for internal attribution", async () => {
  const roots = [
    new URL("../../app/", import.meta.url),
    new URL("../../components/", import.meta.url),
  ];
  const files = (
    await Promise.all(roots.map((root) => sourceFilesBelow(root)))
  ).flat();

  for (const file of files) {
    const contents = await readFile(file, "utf8");
    assert.doesNotMatch(
      contents,
      /[?&]utm_(?:source|medium|campaign|content)=/u,
      `${file.pathname} must use source_guide for internal editorial attribution`,
    );
  }

  const guideCta = await source("components/GuideCtaLink.tsx");
  assert.match(
    guideCta,
    /searchParams\.set\("source_guide", guideId\)/,
  );
  assert.match(
    guideCta,
    /captureGuideSource\(guideId\);[\s\S]*?trackEvent\("guide_cta_clicked"/,
    "first-party source capture must not depend on the disabled analytics event",
  );

  const header = await source("components/HomegroundHeader.tsx");
  assert.match(
    header,
    /pageContext === "guide"[\s\S]*?\?source_guide=\$\{guideId\}&planner=destinations#route-finder/,
    "guide-page header CTAs must carry the same first-party source as inline CTAs",
  );
  assert.equal(
    header.match(
      /pageContext === "guide"[\s\S]{0,180}captureGuideSource\(guideId\)/g,
    )?.length,
    2,
    "both desktop and mobile guide header CTAs must capture the guide before navigation",
  );
});
