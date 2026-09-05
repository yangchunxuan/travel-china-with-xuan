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

async function waitForTurns(predicate, maximumTurns = 100) {
  for (let turn = 0; turn < maximumTurns; turn += 1) {
    if (predicate()) return;
    await new Promise((resolve) => setImmediate(resolve));
  }
  throw new Error("Timed out waiting for state");
}

async function settleAsyncTurns(turns = 10) {
  for (let turn = 0; turn < turns; turn += 1) {
    await new Promise((resolve) => setImmediate(resolve));
  }
}

function sessionReadyResponse(fill = "a") {
  return new Response(
    JSON.stringify({
      contractVersion: "homeground-traffic-events.v1",
      state: "session_ready",
      sessionCredential: `v1.1999999999.${fill.repeat(64)}`,
      expiresAt: "2033-05-18T03:33:19.000Z",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
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

  await context.test("public inquiry choices restore GA with sanitized defaults and distinct funnel events", () => {
    installBrowser({
      href: "https://homegroundchina.com/zh/?tour=beijing-highlights-5-day-private-tour&utm_source=private_tour&utm_medium=website#planner-contact",
      referrer: "https://homegroundchina.com/tours/beijing-highlights-5-day-private-tour/?email=PRIVATEEMAIL#PRIVATEFRAGMENT",
    });
    // The production collector is paused. Exercise the GA fallback without
    // connecting to a collector or loading any external vendor script.
    process.env.NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL = "";
    const { analytics, location } = loadCompiledModules(outputDirectory);
    setAnalyticsEnvironment();

    assert.equal(location.googleMeasurementLocationIsSafe(), false);
    analytics.captureEntryAttribution();
    analytics.removeAttributionParametersFromAddressBar();
    assert.equal(location.googleMeasurementLocationIsSafe(), true);
    assert.equal(location.metaMeasurementLocationIsSafe(), false);
    analytics.trackPageView({ path: "/zh/", locale: "zh", target: "google" });
    analytics.trackEvent("contact_option_clicked", {
      page_language: "zh",
      channel: "whatsapp",
      product_slug: "beijing-highlights-5-day-private-tour",
    });

    const events = window.dataLayer.filter((command) => command[0] === "event");
    assert.deepEqual(events.map((command) => command[1]), ["page_view", "contact_option_clicked"]);
    assert.equal(window.fbq, undefined);
    assert.equal(analytics.WEB_EVENTS_URL, "");
    assert.match(window.location.href, /\?tour=beijing-highlights-5-day-private-tour#planner-contact$/u);

    analytics.trackEnquirySubmitted({
      page_language: "zh",
      reply_channel: "email",
      submission_surface: "homepage_email",
    });
    assert.equal(window.dataLayer.at(-1)[1], "enquiry_submitted");
    for (const command of window.dataLayer) {
      const payload = command[0] === "event" ? command[2] : command[0] === "set" ? command[1] : null;
      if (!payload) continue;
      assert.equal(payload.page_location, "https://homegroundchina.com/zh/");
      assert.equal(payload.page_referrer, "https://homegroundchina.com");
      assert.doesNotMatch(JSON.stringify(payload), /PRIVATEEMAIL|PRIVATEFRAGMENT|\?|#planner-contact/u);
    }
    assert.ok(window.dataLayer.findIndex((command) => command[0] === "set") < window.dataLayer.findIndex((command) => command[0] === "config"));
  });

  await context.test("GA navigation allowlist covers known tours and service steps in each language", () => {
    installBrowser();
    const { location } = loadCompiledModules(outputDirectory);
    const { privateTourInquirySlugs } = require(join(outputDirectory, "privateTourInquiryContext.js"));
    const { routeServiceIds } = require(join(outputDirectory, "routeServiceInterest.js"));
    for (const homePath of ["/", "/zh/", "/ko/"]) {
      for (const slug of privateTourInquirySlugs) {
        assert.equal(location.googleMeasurementLocationIsSafe(`${homePath}?tour=${slug}#planner-contact`), true);
        assert.equal(location.metaMeasurementLocationIsSafe(`${homePath}?tour=${slug}#planner-contact`), false);
      }
      for (const service of routeServiceIds) {
        assert.equal(location.googleMeasurementLocationIsSafe(`${homePath}?service=${service}#planner-contact`), true);
        for (const step of ["destinations", "nights", "party", "pace", "result"]) {
          const query = `planner=${step}`;
          assert.equal(location.googleMeasurementLocationIsSafe(`${homePath}?${query}#route-finder`), true);
          assert.equal(location.googleMeasurementLocationIsSafe(`${homePath}?service=${service}&${query}#route-finder`), true);
        }
      }
      assert.equal(location.googleMeasurementLocationIsSafe(`${homePath}?planner=result#planner-handoff`), true);
      assert.equal(location.googleMeasurementLocationIsSafe(`${homePath}#planner-contact`), true);
      for (const packageId of ["english-guided", "no-guide"]) {
        for (const travelers of [2, 4]) {
          assert.equal(location.googleMeasurementLocationIsSafe(`${homePath}?tour=beijing-highlights-5-day-private-tour&package=${packageId}&travelers=${travelers}#planner-contact`), true);
        }
      }
    }
  });

  await context.test("unknown, duplicate and private inquiry URL state remains blocked", () => {
    installBrowser();
    const { analytics, location } = loadCompiledModules(outputDirectory);
    const unsafeLocations = [
      "/?q=PRIVATEQUESTION#planner-contact",
      "/?service=route-build&q=PRIVATEQUESTION#planner-contact",
      "/?%71=PRIVATEQUESTION#planner-contact",
      "/?tour=PRIVATEEMAIL#planner-contact",
      "/?tour=beijing-highlights-5-day-private-tour&tour=PRIVATEEMAIL#planner-contact",
      "/?service=route-build&service=route-build#planner-contact",
      "/?service=route-build&%73ervice=route-build#planner-contact",
      "/?service=PRIVATEQUESTION#planner-contact",
      "/?service=#planner-contact",
      "/?planner=PRIVATEQUESTION#route-finder",
      "/?planner=result&planner=result#planner-handoff",
      "/?destinations=beijing#route-finder",
      "/?service=route-build#PRIVATEFRAGMENT",
      "/?service=route-build#planner-contact%00",
      "/?service=route-build&note=#planner-contact",
      "/?package=english-guided&travelers=2#planner-contact",
      "/?service=route-build&package=english-guided&travelers=2#planner-contact",
      "/?tour=beijing-highlights-5-day-private-tour&package=english-guided#planner-contact",
      "/?tour=beijing-highlights-5-day-private-tour&travelers=2#planner-contact",
      "/?tour=beijing-highlights-5-day-private-tour&package=PRIVATEQUESTION&travelers=2#planner-contact",
      "/?tour=beijing-highlights-5-day-private-tour&package=english-guided&travelers=99#planner-contact",
      "/?tour=beijing-highlights-5-day-private-tour&package=english-guided&travelers=2&travelers=2#planner-contact",
      "/?tour=zhangjiajie-4-day-private-tour&package=english-guided&travelers=2#planner-contact",
      "/guides/?service=route-build#planner-contact",
      "https://elsewhere.example/?service=route-build#planner-contact",
      "https://private-user@homegroundchina.com/?service=route-build#planner-contact",
    ];
    for (const href of unsafeLocations) {
      assert.equal(location.googleMeasurementLocationIsSafe(href), false, href);
      if (href.startsWith("/")) {
        window.location = href;
        assert.equal(analytics.initializeGoogleAnalytics(), false, href);
        assert.equal(analytics.initializeMetaPixel(), false, href);
        analytics.trackPageView({ path: window.location.pathname, locale: "en", target: "google" });
      }
    }
    assert.equal(window.dataLayer, undefined);
    assert.equal(window.fbq, undefined);
  });

  await context.test("public navigation never overrides denied analytics consent", () => {
    installBrowser({
      href: "https://homegroundchina.com/?service=route-build&planner=party#route-finder",
      consent: preferences({ analytics: false, marketing: true }),
    });
    const { analytics, location } = loadCompiledModules(outputDirectory);
    assert.equal(location.googleMeasurementLocationIsSafe(), true);
    assert.equal(analytics.initializeGoogleAnalytics(), false);
    analytics.trackEvent("planner_step_completed", { step: "party" });
    analytics.trackPageView({ path: "/", locale: "en", target: "google" });
    assert.equal(window.dataLayer, undefined);
    assert.equal(window.fbq, undefined);
  });

  await context.test("guide CTA targets distinguish public products from planning without forwarding links", () => {
    installBrowser();
    const { analytics, location } = loadCompiledModules(outputDirectory);
    for (const prefix of ["/", "/zh/", "/ko/"]) {
      assert.equal(location.guideCtaTarget(`${prefix}tours/beijing-highlights-5-day-private-tour/?private=PRIVATEQUESTION`), "private_tour");
      assert.equal(location.guideCtaTarget(`${prefix}?utm_campaign=article#planner-contact`), "planner");
      assert.equal(location.guideCtaTarget(`${prefix}?planner=destinations#route-finder`), "planner");
      assert.equal(location.guideCtaTarget(`${prefix}tours/unknown-private-text/`), "other");
      assert.equal(location.guideCtaTarget(`${prefix}guides/`), "other");
    }
    assert.equal(location.guideCtaTarget("https://elsewhere.example/tours/beijing-highlights-5-day-private-tour/"), "other");
    assert.equal(location.guideCtaTarget("mailto:private@example.com"), "other");
    for (const target of ["private_tour", "planner", "other", "PRIVATEQUESTION"]) {
      analytics.trackEvent("guide_cta_clicked", {
        guide_id: "china-tour-guide-decision",
        cta_position: "footer",
        cta_target: target,
        href: "/?q=PRIVATEQUESTION",
      });
      const payload = window.dataLayer.at(-1)[2];
      assert.equal(payload.cta_target, target === "PRIVATEQUESTION" ? undefined : target);
      assert.equal("href" in payload, false);
      assert.doesNotMatch(JSON.stringify(payload), /PRIVATEQUESTION/u);
    }
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

  await context.test("a current fragment blocks Meta initialization and events", () => {
    installBrowser({
      href: "https://homegroundchina.com/guides/#PRIVATE-FRAGMENT",
    });
    const { analytics, location } = loadCompiledModules(outputDirectory);

    assert.equal(location.thirdPartyMeasurementLocationIsSafe(), false);
    assert.equal(location.metaMeasurementLocationIsSafe(), false);
    assert.equal(analytics.initializeMetaPixel(), false);
    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "meta",
    });
    assert.equal(window.fbq, undefined);
  });

  await context.test("a query-bearing referrer blocks Meta initialization and events", () => {
    installBrowser({
      referrer:
        "https://homegroundchina.com/guides/search/?q=PREVIOUS-PRIVATE-QUESTION",
    });
    const { analytics, location } = loadCompiledModules(outputDirectory);

    assert.equal(location.thirdPartyMeasurementLocationIsSafe(), true);
    assert.equal(location.metaMeasurementLocationIsSafe(), false);
    assert.equal(analytics.initializeMetaPixel(), false);
    analytics.trackEvent("guide_search_opened", {
      page_language: "en",
      search_surface: "guides_hub",
    });
    assert.equal(window.fbq, undefined);
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

  await context.test("query cleanup and planner steps dedupe while real page navigation can count again", () => {
    installBrowser();
    const { pageViews } = loadCompiledModules(outputDirectory);
    const state = pageViews.createAnalyticsPageViewState();
    const homePage = "en:/";
    pageViews.resetAnalyticsPageViewsForNewPage(state, homePage);
    assert.equal(pageViews.consumeAnalyticsPageView(state, "google", homePage), true);
    for (const _transition of ["tour choice", "UTM cleanup", "planner step", "private query", "clean again"]) {
      pageViews.resetAnalyticsPageViewsForNewPage(state, homePage);
      assert.equal(pageViews.consumeAnalyticsPageView(state, "google", homePage), false);
    }
    assert.equal(pageViews.consumeAnalyticsPageView(state, "meta", homePage), true, "a previously blocked sink can still send its first page view");

    // A different page can be vendor-ineligible. Observing its pathname must
    // still allow a fresh page view when the visitor returns to the homepage.
    pageViews.resetAnalyticsPageViewsForNewPage(state, "en:/guides/search/");
    pageViews.resetAnalyticsPageViewsForNewPage(state, homePage);
    assert.equal(pageViews.consumeAnalyticsPageView(state, "google", homePage), true);
    assert.equal(pageViews.consumeAnalyticsPageView(state, "google", homePage), false);
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

  await context.test("a 401 refreshes the credential and retries the same event once", async () => {
    installBrowser({
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let sessionNumber = 0;
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body);
      requests.push(body);
      if (body.requestType === "start_session") {
        sessionNumber += 1;
        return sessionReadyResponse(sessionNumber === 1 ? "a" : "b");
      }
      if (requests.filter((request) => request.requestType === "events").length === 1) {
        return new Response("{}", { status: 401 });
      }
      return new Response("{}", { status: 202 });
    };

    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "first_party",
    });
    await waitFor(() => requests.length === 4);

    assert.deepEqual(
      requests.map((request) => request.requestType),
      ["start_session", "events", "start_session", "events"],
    );
    assert.equal(requests[1].events[0].eventId, requests[3].events[0].eventId);
    assert.notEqual(
      requests[1].sessionCredential,
      requests[3].sessionCredential,
    );
  });

  await context.test("a second 401 stops without a retry loop", async () => {
    installBrowser({
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let sessionNumber = 0;
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body);
      requests.push(body);
      if (body.requestType === "start_session") {
        sessionNumber += 1;
        return sessionReadyResponse(sessionNumber === 1 ? "a" : "b");
      }
      return new Response("{}", { status: 401 });
    };

    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "first_party",
    });
    await waitFor(() => requests.length === 4);
    await settleAsyncTurns();

    assert.deepEqual(
      requests.map((request) => request.requestType),
      ["start_session", "events", "start_session", "events"],
    );
    assert.equal(requests[1].events[0].eventId, requests[3].events[0].eventId);
  });

  await context.test("concurrent 401 responses share one credential refresh", async () => {
    installBrowser({
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let startNumber = 0;
    let eventNumber = 0;
    let resolveRefresh;
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body);
      requests.push(body);
      if (body.requestType === "start_session") {
        startNumber += 1;
        if (startNumber === 1) return sessionReadyResponse("a");
        return new Promise((resolve) => {
          resolveRefresh = resolve;
        });
      }
      eventNumber += 1;
      return new Response("{}", { status: eventNumber <= 2 ? 401 : 202 });
    };

    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "first_party",
    });
    analytics.trackPageView({
      path: "/guides/beijing/",
      locale: "en",
      target: "first_party",
    });
    await waitFor(() => typeof resolveRefresh === "function");
    await settleAsyncTurns();
    assert.equal(
      requests.filter((request) => request.requestType === "start_session")
        .length,
      2,
    );

    resolveRefresh(sessionReadyResponse("b"));
    await waitFor(
      () =>
        requests.filter((request) => request.requestType === "events").length ===
        4,
    );
    const eventIds = requests
      .filter((request) => request.requestType === "events")
      .map((request) => request.events[0].eventId);
    assert.equal(new Set(eventIds).size, 2);
    for (const eventId of new Set(eventIds)) {
      assert.equal(eventIds.filter((candidate) => candidate === eventId).length, 2);
    }
  });

  await context.test("429 suppression clamps Retry-After and never schedules a resend", async (testContext) => {
    const originalNow = Date.now;
    let now = Date.parse("2026-08-23T00:00:00.000Z");
    Date.now = () => now;
    testContext.after(() => {
      Date.now = originalNow;
    });
    installBrowser({
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let eventNumber = 0;
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body);
      requests.push(body);
      if (body.requestType === "start_session") return sessionReadyResponse();
      eventNumber += 1;
      if (eventNumber === 1) {
        return new Response("{}", {
          status: 429,
          headers: { "Retry-After": "999999" },
        });
      }
      if (eventNumber === 2) {
        return new Response("{}", {
          status: 429,
          headers: { "Retry-After": "0" },
        });
      }
      return new Response("{}", { status: 202 });
    };
    const track = () =>
      analytics.trackPageView({
        path: "/guides/",
        locale: "en",
        target: "first_party",
      });

    track();
    await waitForTurns(() => requests.length === 2);
    track();
    await settleAsyncTurns();
    assert.equal(requests.length, 2);
    now += 86_399_999;
    track();
    await settleAsyncTurns();
    assert.equal(requests.length, 2, "Retry-After must clamp to 86400 seconds");
    now += 1;
    await settleAsyncTurns();
    assert.equal(requests.length, 2, "elapsed suppression must not auto-resend");
    track();
    await waitForTurns(() => requests.length === 3);
    now += 999;
    track();
    await settleAsyncTurns();
    assert.equal(requests.length, 3, "Retry-After zero must clamp to one second");
    now += 1;
    track();
    await waitForTurns(() => requests.length === 4);
    assert.deepEqual(
      requests.map((request) => request.requestType),
      ["start_session", "events", "events", "events"],
    );
  });

  await context.test("503 creates a short memory-only suppression without a retry loop", async (testContext) => {
    const originalNow = Date.now;
    let now = Date.parse("2026-08-23T00:00:00.000Z");
    Date.now = () => now;
    testContext.after(() => {
      Date.now = originalNow;
    });
    installBrowser({
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let eventNumber = 0;
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body);
      requests.push(body);
      if (body.requestType === "start_session") return sessionReadyResponse();
      eventNumber += 1;
      return new Response("{}", { status: eventNumber === 1 ? 503 : 202 });
    };
    const track = () =>
      analytics.trackPageView({
        path: "/guides/",
        locale: "en",
        target: "first_party",
      });

    track();
    await waitForTurns(() => requests.length === 2);
    now += 29_999;
    track();
    await settleAsyncTurns();
    assert.equal(requests.length, 2);
    now += 1;
    await settleAsyncTurns();
    assert.equal(requests.length, 2, "503 recovery must not auto-resend");
    track();
    await waitForTurns(() => requests.length === 3);
    assert.deepEqual(
      requests.map((request) => request.requestType),
      ["start_session", "events", "events"],
    );
  });

  await context.test("other 4xx responses do not retry or suppress later events", async () => {
    installBrowser({
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let eventNumber = 0;
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body);
      requests.push(body);
      if (body.requestType === "start_session") return sessionReadyResponse();
      eventNumber += 1;
      return new Response("{}", { status: eventNumber === 1 ? 400 : 202 });
    };

    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "first_party",
    });
    await waitFor(() => requests.length === 2);
    await settleAsyncTurns();
    assert.equal(requests.length, 2);
    analytics.trackPageView({
      path: "/guides/beijing/",
      locale: "en",
      target: "first_party",
    });
    await waitFor(() => requests.length === 3);
    assert.deepEqual(
      requests.map((request) => request.requestType),
      ["start_session", "events", "events"],
    );
    assert.notEqual(requests[1].events[0].eventId, requests[2].events[0].eventId);
  });

  await context.test("revocation during a 401 credential refresh prevents the retry event", async () => {
    const browser = installBrowser({
      consent: preferences({ analytics: true, marketing: false }),
    });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let startNumber = 0;
    let resolveRefresh;
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body);
      requests.push(body);
      if (body.requestType === "events") {
        return new Response("{}", { status: 401 });
      }
      startNumber += 1;
      if (startNumber === 1) return sessionReadyResponse("a");
      return new Promise((resolve) => {
        resolveRefresh = resolve;
      });
    };

    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "first_party",
    });
    await waitFor(() => typeof resolveRefresh === "function");
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
    resolveRefresh(sessionReadyResponse("b"));
    await settleAsyncTurns(20);

    assert.deepEqual(
      requests.map((request) => request.requestType),
      ["start_session", "events", "start_session"],
    );
    assert.equal(
      browser.sessionStorage.getItem("homeground-traffic-session-credential"),
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

  await context.test("ad click IDs are discarded before a query-free landing PageView", async () => {
    installBrowser({
      href:
        "https://homegroundchina.com/guides/?fbclid=FACEBOOKSECRET&gclid=GOOGLESECRET&dclid=DISPLAYSECRET&gbraid=GBRAIDSECRET&wbraid=WBRAIDSECRET&msclkid=MICROSOFTSECRET",
      consent: preferences({ analytics: true, marketing: true }),
    });
    const { analytics, location } = loadCompiledModules(outputDirectory);
    const requests = [];
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body);
      requests.push(body);
      if (body.requestType === "start_session") return sessionReadyResponse();
      return new Response("{}", { status: 202 });
    };

    analytics.captureEntryAttribution();
    analytics.removeAttributionParametersFromAddressBar();
    assert.equal(window.location.search, "");
    assert.equal(location.thirdPartyMeasurementLocationIsSafe(), true);
    assert.deepEqual(
      JSON.parse(
        window.sessionStorage.getItem("homeground-entry-attribution"),
      ),
      { landing_path: "/guides/" },
    );

    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "google",
    });
    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "meta",
    });
    analytics.trackPageView({
      path: "/guides/",
      locale: "en",
      target: "first_party",
    });
    await waitFor(() => requests.length === 2);

    const googlePageView = window.dataLayer.find(
      (command) => command[0] === "event" && command[1] === "page_view",
    );
    assert.equal(
      googlePageView[2].page_location,
      "https://homegroundchina.com/guides/",
    );
    assert.equal(
      window.fbq.queue.filter((command) => command[1] === "PageView").length,
      1,
    );
    assert.doesNotMatch(
      JSON.stringify({
        attribution: window.sessionStorage.getItem(
          "homeground-entry-attribution",
        ),
        firstPartyRequests: requests,
        googlePageView,
        metaQueue: window.fbq.queue,
      }),
      /fbclid|gclid|dclid|gbraid|wbraid|msclkid|FACEBOOKSECRET|GOOGLESECRET|DISPLAYSECRET|GBRAIDSECRET|WBRAIDSECRET|MICROSOFTSECRET/u,
    );
  });

  await context.test("history privacy guards are synchronous while change notifications batch after the commit", async () => {
    installBrowser();
    const { analytics, location } = loadCompiledModules(outputDirectory);
    analytics.initializeGoogleAnalytics();
    analytics.initializeMetaPixel();
    const observed = [];
    const unsubscribe = location.subscribeAnalyticsLocationChanges({
      beforeChange(nextHref) {
        observed.push(["before", window.location.href, nextHref]);
        if (!location.googleMeasurementLocationIsSafe(nextHref)) analytics.disableGoogleAnalytics();
        if (!location.metaMeasurementLocationIsSafe(nextHref)) analytics.disableMetaPixel();
      },
      change() {
        observed.push(["after", window.location.href]);
      },
    });

    window.history.pushState({}, "", "/?q=PRIVATEQUESTION");
    assert.equal(window["ga-disable-G-TEST1234"], true);
    assert.deepEqual(window.fbq.queue.at(-1), ["consent", "revoke"]);
    assert.equal(observed[0][1], "https://homegroundchina.com/guides/", "the privacy guard runs before the URL changes");
    window.history.replaceState({}, "", "/?service=route-build#planner-contact");
    window.dispatchEvent({ type: "homeground:locationchange" });
    assert.equal(observed.filter(([phase]) => phase === "before").length, 3);
    assert.equal(observed.filter(([phase]) => phase === "after").length, 0, "no React-facing update runs during the history commit");

    await Promise.resolve();
    assert.deepEqual(observed.filter(([phase]) => phase === "after"), [["after", "https://homegroundchina.com/?service=route-build#planner-contact"]]);
    unsubscribe();
  });

  await context.test("location cleanup cancels pending notifications and allows a fresh subscription", async () => {
    installBrowser();
    const { location } = loadCompiledModules(outputDirectory);
    const originalPushState = window.history.pushState;
    const observed = [];
    const subscriber = { change: () => observed.push(window.location.href) };
    const unsubscribe = location.subscribeAnalyticsLocationChanges(subscriber);
    window.history.pushState({}, "", "/?planner=destinations#route-finder");
    unsubscribe();
    assert.equal(window.history.pushState, originalPushState);

    const unsubscribeAgain = location.subscribeAnalyticsLocationChanges(subscriber);
    await Promise.resolve();
    assert.deepEqual(observed, [], "the previous mount cannot update the fresh subscription");
    window.history.replaceState({}, "", "/?planner=nights#route-finder");
    await Promise.resolve();
    assert.deepEqual(observed, ["https://homegroundchina.com/?planner=nights#route-finder"]);
    unsubscribeAgain();
  });

  await context.test("UTM cleanup follows SPA history while free-text q remains vendor-ineligible", async () => {
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
    await Promise.resolve();
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
    await Promise.resolve();
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
