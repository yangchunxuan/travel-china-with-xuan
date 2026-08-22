import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { createRequire } from "node:module";
import test from "node:test";

const execFileAsync = promisify(execFile);
const require = createRequire(import.meta.url);
const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url));
const typescriptCli = fileURLToPath(
  new URL("../../node_modules/typescript/bin/tsc", import.meta.url),
);
const compiledModuleNames = [
  "analytics.js",
  "analyticsConsent.js",
  "analyticsLocation.js",
  "analyticsPageViews.js",
];

function preferences({
  analytics,
  marketing,
  updatedAt = "2026-08-23T00:00:00.000Z",
}) {
  return {
    version: "2026-07-31.1",
    necessary: true,
    analytics,
    marketing,
    updatedAt,
  };
}

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    values,
    clear() {
      values.clear();
    },
    getItem(key) {
      return values.get(key) ?? null;
    },
    key(index) {
      return Array.from(values.keys())[index] ?? null;
    },
    get length() {
      return values.size;
    },
    removeItem(key) {
      values.delete(key);
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
  };
}

function installBrowser({
  href = "https://homegroundchina.com/guides/",
  consent = preferences({ analytics: true, marketing: true }),
  referrer = "",
} = {}) {
  const listeners = new Map();
  const localStorage = memoryStorage({
    "homeground-consent.v1": JSON.stringify(consent),
  });
  const sessionStorage = memoryStorage();
  let location = new URL(href);

  const dispatchEvent = (event) => {
    for (const listener of listeners.get(event.type) ?? []) {
      listener.call(window, event);
    }
    return true;
  };
  const window = {
    addEventListener(type, listener) {
      const registered = listeners.get(type) ?? new Set();
      registered.add(listener);
      listeners.set(type, registered);
    },
    crypto: globalThis.crypto,
    dispatchEvent,
    get location() {
      return location;
    },
    set location(next) {
      location = next instanceof URL ? next : new URL(String(next), location);
    },
    localStorage,
    removeEventListener(type, listener) {
      listeners.get(type)?.delete(listener);
    },
    sessionStorage,
  };
  window.history = {
    state: null,
    pushState(data, _unused, url) {
      this.state = data;
      if (url !== undefined && url !== null) {
        location = new URL(String(url), location);
      }
    },
    replaceState(data, _unused, url) {
      this.state = data;
      if (url !== undefined && url !== null) {
        location = new URL(String(url), location);
      }
    },
  };

  globalThis.window = window;
  globalThis.document = { cookie: "", referrer };

  return {
    emitStorage(nextConsent) {
      const oldValue = localStorage.getItem("homeground-consent.v1");
      const newValue = nextConsent ? JSON.stringify(nextConsent) : null;
      if (newValue === null) {
        localStorage.removeItem("homeground-consent.v1");
      } else {
        localStorage.setItem("homeground-consent.v1", newValue);
      }
      dispatchEvent({
        type: "storage",
        key: "homeground-consent.v1",
        newValue,
        oldValue,
        storageArea: localStorage,
      });
    },
    localStorage,
    sessionStorage,
    window,
  };
}

function setAnalyticsEnvironment() {
  process.env.NEXT_PUBLIC_HOMEGROUND_ANALYTICS_ENABLED = "true";
  process.env.NEXT_PUBLIC_HOMEGROUND_GA4_MEASUREMENT_ID = "G-TEST1234";
  process.env.NEXT_PUBLIC_HOMEGROUND_META_PIXEL_ID = "123456789";
  process.env.NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL =
    "http://localhost:8787/events";
}

function loadCompiledModules(outputDirectory) {
  for (const name of compiledModuleNames) {
    const path = join(outputDirectory, name);
    delete require.cache[require.resolve(path)];
  }
  return {
    analytics: require(join(outputDirectory, "analytics.js")),
    consent: require(join(outputDirectory, "analyticsConsent.js")),
    location: require(join(outputDirectory, "analyticsLocation.js")),
    pageViews: require(join(outputDirectory, "analyticsPageViews.js")),
  };
}

async function waitFor(predicate, timeoutMilliseconds = 1_000) {
  const deadline = Date.now() + timeoutMilliseconds;
  while (!predicate()) {
    if (Date.now() >= deadline) throw new Error("Timed out waiting for state");
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

test("analytics runtime honors consent, query privacy and vendor queue contracts", async (context) => {
  setAnalyticsEnvironment();
  const outputDirectory = await mkdtemp(
    join(tmpdir(), "homeground-analytics-runtime-"),
  );
  context.after(async () => {
    delete globalThis.window;
    delete globalThis.document;
    await rm(outputDirectory, { recursive: true, force: true });
  });

  await execFileAsync(process.execPath, [
    typescriptCli,
    "lib/analytics.ts",
    "lib/analyticsConsent.ts",
    "lib/analyticsLocation.ts",
    "lib/analyticsPageViews.ts",
    "--outDir",
    outputDirectory,
    "--module",
    "commonjs",
    "--moduleResolution",
    "node",
    "--target",
    "es2022",
    "--lib",
    "es2022,dom",
    "--skipLibCheck",
  ], { cwd: repositoryRoot });

  await context.test("gtag queues real Arguments and manual URLs are query-free", () => {
    installBrowser({
      referrer:
        "https://homegroundchina.com/guides/search/?q=previous-private-question",
    });
    const { analytics } = loadCompiledModules(outputDirectory);

    assert.equal(analytics.initializeGoogleAnalytics(), true);
    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "google",
    });

    assert.ok(window.dataLayer.length >= 5);
    for (const command of window.dataLayer) {
      assert.equal(Array.isArray(command), false);
      assert.equal(Object.prototype.toString.call(command), "[object Arguments]");
    }
    const pageView = window.dataLayer.at(-1);
    assert.equal(pageView[0], "event");
    assert.equal(pageView[1], "page_view");
    assert.equal(
      pageView[2].page_location,
      "https://homegroundchina.com/guides/",
    );
    assert.equal(
      pageView[2].page_referrer,
      "https://homegroundchina.com",
    );
    assert.doesNotMatch(JSON.stringify(pageView[2]), /private-question|\?/u);
  });

  await context.test("mount-time events initialize each consented vendor before queuing the event", () => {
    installBrowser();
    const { analytics } = loadCompiledModules(outputDirectory);

    analytics.trackEvent("guide_search_opened", {
      page_language: "en",
      search_surface: "guides_hub",
    });

    const gaCommands = window.dataLayer.map((command) => command[0]);
    assert.ok(gaCommands.indexOf("config") < gaCommands.indexOf("event"));
    const metaCommands = window.fbq.queue.map((command) => command[0]);
    assert.ok(metaCommands.indexOf("init") < metaCommands.indexOf("trackCustom"));
  });

  await context.test("Meta history automation is disabled before init and q suppresses both vendors", () => {
    installBrowser();
    const { analytics, location } = loadCompiledModules(outputDirectory);

    assert.equal(analytics.initializeGoogleAnalytics(), true);
    assert.equal(analytics.initializeMetaPixel(), true);
    assert.equal(window.fbq.disablePushState, true);
    assert.deepEqual(window.fbq.queue[0], [
      "set",
      "autoConfig",
      false,
      "123456789",
    ]);
    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "meta",
    });
    assert.equal(
      window.fbq.queue.filter((command) => command[1] === "PageView").length,
      1,
      "a clean, consented page must retain one manual Meta PageView",
    );

    let automaticMetaPageViews = 0;
    if (!window.fbq.disablePushState) {
      const originalPushState = window.history.pushState;
      window.history.pushState = function (...args) {
        originalPushState.apply(this, args);
        automaticMetaPageViews += 1;
      };
    }
    const unsubscribe = location.subscribeAnalyticsLocationChanges({
      beforeChange(nextHref) {
        if (!location.thirdPartyMeasurementLocationIsSafe(nextHref)) {
          analytics.disableGoogleAnalytics();
          analytics.disableMetaPixel();
        }
      },
      change() {},
    });

    const gaCommandsBefore = window.dataLayer.length;
    const metaCommandsBefore = window.fbq.queue.length;
    window.history.pushState(
      {},
      "",
      "/guides/search/?q=PRIVATEQUESTION",
    );
    analytics.trackPageView({
      path: "/guides/search/",
      locale: "en",
      target: "google",
    });
    analytics.trackPageView({
      path: "/guides/search/",
      locale: "en",
      target: "meta",
    });
    window.history.replaceState(
      {},
      "",
      "/guides/search/?%71=ENCODEDQUESTION",
    );

    assert.equal(automaticMetaPageViews, 0);
    assert.equal(window.dataLayer.length, gaCommandsBefore + 2);
    assert.equal(window.fbq.queue.length, metaCommandsBefore + 2);
    assert.equal(
      window.fbq.queue
        .slice(metaCommandsBefore)
        .some((command) => command[1] === "PageView"),
      false,
    );
    assert.equal(location.thirdPartyMeasurementLocationIsSafe(), false);
    unsubscribe();
  });

  await context.test("page views dedupe independently across grants and re-grants", () => {
    installBrowser();
    const { pageViews } = loadCompiledModules(outputDirectory);
    const state = pageViews.createAnalyticsPageViewState();

    assert.equal(
      pageViews.consumeAnalyticsPageView(state, "first_party", "en:/guides/"),
      true,
    );
    assert.equal(
      pageViews.consumeAnalyticsPageView(state, "google", "en:/guides/"),
      true,
    );
    assert.equal(
      pageViews.consumeAnalyticsPageView(state, "meta", "en:/guides/"),
      true,
      "granting marketing later must still send Meta's current PageView",
    );
    assert.equal(
      pageViews.consumeAnalyticsPageView(state, "google", "en:/guides/"),
      false,
    );
    pageViews.resetAnalyticsPageView(state, "meta");
    assert.equal(
      pageViews.consumeAnalyticsPageView(state, "meta", "en:/guides/"),
      true,
      "a Meta revoke and re-grant must send exactly one restored PageView",
    );
    assert.equal(state.google, "en:/guides/");
  });

  await context.test("storage events synchronize consent across tabs", () => {
    const browser = installBrowser();
    const { consent } = loadCompiledModules(outputDirectory);
    const observed = [];
    const unsubscribe = consent.subscribeAnalyticsConsent((next) => {
      observed.push(next);
    });

    browser.emitStorage(
      preferences({
        analytics: false,
        marketing: false,
        updatedAt: "2026-08-23T00:00:01.000Z",
      }),
    );
    assert.equal(consent.hasAnalyticsConsent(), false);
    assert.equal(observed.at(-1).analytics, false);

    browser.emitStorage(
      preferences({
        analytics: true,
        marketing: false,
        updatedAt: "2026-08-23T00:00:02.000Z",
      }),
    );
    assert.equal(consent.hasAnalyticsConsent(), true);
    assert.equal(observed.at(-1).analytics, true);

    browser.emitStorage(null);
    assert.equal(consent.readAnalyticsConsent(), null);
    assert.equal(observed.at(-1), null);
    unsubscribe();
  });

  await context.test("revocation or re-grant aborts an in-flight session bootstrap", async () => {
    const browser = installBrowser();
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let resolveSessionStart;
    globalThis.fetch = async (_url, init) => {
      requests.push(JSON.parse(init.body));
      if (requests.length === 1) {
        return new Promise((resolve) => {
          resolveSessionStart = resolve;
        });
      }
      return new Response("{}", { status: 202 });
    };

    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "first_party",
    });
    await waitFor(() => typeof resolveSessionStart === "function");
    browser.emitStorage(
      preferences({
        analytics: false,
        marketing: false,
        updatedAt: "2026-08-23T00:00:01.000Z",
      }),
    );
    browser.emitStorage(
      preferences({
        analytics: true,
        marketing: false,
        updatedAt: "2026-08-23T00:00:02.000Z",
      }),
    );
    resolveSessionStart(
      new Response(
        JSON.stringify({
          contractVersion: "homeground-traffic-events.v1",
          state: "session_ready",
          sessionCredential:
            "v1.1999999999.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          expiresAt: "2033-05-18T03:33:19.000Z",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    await new Promise((resolve) => setTimeout(resolve, 20));

    assert.deepEqual(
      requests.map((request) => request.requestType),
      ["start_session"],
    );
    assert.equal(
      browser.sessionStorage.getItem(
        "homeground-traffic-session-credential",
      ),
      null,
    );
  });

  await context.test("unchanged analytics consent still records a bounded first-party event", async () => {
    const browser = installBrowser({
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body);
      requests.push(body);
      if (body.requestType === "start_session") {
        return new Response(
          JSON.stringify({
            contractVersion: "homeground-traffic-events.v1",
            state: "session_ready",
            sessionCredential:
              "v1.1999999999.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            expiresAt: "2033-05-18T03:33:19.000Z",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      return new Response("{}", { status: 202 });
    };

    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "first_party",
    });
    await waitFor(() => requests.length === 2);

    assert.deepEqual(
      requests.map((request) => request.requestType),
      ["start_session", "events"],
    );
    assert.equal(requests[1].events[0].pagePath, "/guides/");
    assert.match(
      browser.sessionStorage.getItem(
        "homeground-traffic-session-credential",
      ),
      /"consentUpdatedAt":"2026-08-23T00:00:00.000Z"/u,
    );
  });

  await context.test("UTM cleanup follows SPA history while free-text q remains vendor-ineligible", () => {
    installBrowser({
      href:
        "https://homegroundchina.com/guides/search/?utm_source=facebook&utm_medium=social&utm_campaign=summer&q=PRIVATEQUESTION",
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics, location } = loadCompiledModules(outputDirectory);
    const observed = [];
    const unsubscribe = location.subscribeAnalyticsLocationChanges({
      beforeChange(nextHref) {
        observed.push(["before", nextHref]);
      },
      change() {
        observed.push(["after", window.location.href]);
      },
    });

    analytics.captureEntryAttribution();
    analytics.removeAttributionParametersFromAddressBar();
    const stored = JSON.parse(
      window.sessionStorage.getItem("homeground-entry-attribution"),
    );
    assert.deepEqual(stored, {
      landing_path: "/guides/search/",
      utm_medium: "social",
      utm_source: "facebook",
      utm_campaign: "summer",
    });
    assert.equal(window.location.search, "?q=PRIVATEQUESTION");
    assert.equal(location.thirdPartyMeasurementLocationIsSafe(), false);
    assert.equal(observed[0][0], "before");
    assert.equal(observed[1][0], "after");

    window.history.pushState({}, "", "/guides/");
    assert.equal(location.thirdPartyMeasurementLocationIsSafe(), true);
    assert.equal(observed.at(-1)[0], "after");
    assert.equal(analytics.initializeGoogleAnalytics(), true);
    const config = window.dataLayer.find((command) => command[0] === "config");
    assert.equal(config[2].campaign_source, "facebook");
    assert.equal(config[2].campaign_medium, "social");
    assert.equal(config[2].campaign_name, "summer");
    assert.doesNotMatch(JSON.stringify(config[2]), /PRIVATEQUESTION|\?/u);
    unsubscribe();
  });

  await context.test("internal guide UTMs clean the URL without becoming acquisition", () => {
    installBrowser({
      href:
        "https://homegroundchina.com/?utm_source=website&utm_medium=guide&utm_campaign=stay-shortlist",
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics } = loadCompiledModules(outputDirectory);

    analytics.captureEntryAttribution();
    analytics.removeAttributionParametersFromAddressBar();
    assert.deepEqual(
      JSON.parse(
        window.sessionStorage.getItem("homeground-entry-attribution"),
      ),
      { landing_path: "/" },
    );
    assert.equal(window.location.search, "");
    assert.equal(analytics.initializeGoogleAnalytics(), true);
    const config = window.dataLayer.find((command) => command[0] === "config");
    assert.equal("campaign_source" in config[2], false);
    assert.equal("campaign_medium" in config[2], false);
  });
});
