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
  "analyticsRuntime.js",
  "analyticsVisibility.js",
  "inquiryTrafficConsent.js",
];

function preferences({
  analytics,
  marketing,
  updatedAt = "2026-08-23T00:00:00.000Z",
}) {
  return {
    version: "2026-09-05.1",
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
  globalThis.document = { cookie: "", referrer, visibilityState: "visible", addEventListener: window.addEventListener, removeEventListener: window.removeEventListener };

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
    inquiryTraffic: require(join(outputDirectory, "inquiryTrafficConsent.js")),
    runtime: require(join(outputDirectory, "analyticsRuntime.js")),
    visibility: require(join(outputDirectory, "analyticsVisibility.js")),
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

function installQueueClock(context) {
  const originalNow = Date.now;
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  let now = Date.parse("2026-09-05T00:00:00Z");
  let nextId = 0;
  const timers = new Map();
  Date.now = () => now;
  globalThis.setTimeout = (callback, delay = 0) => {
    const id = ++nextId;
    timers.set(id, { callback, at: now + delay });
    return id;
  };
  globalThis.clearTimeout = (id) => timers.delete(id);
  context.after(() => { Date.now = originalNow; globalThis.setTimeout = originalSetTimeout; globalThis.clearTimeout = originalClearTimeout; });
  return { advance(milliseconds) {
    now += milliseconds;
    for (const [id, timer] of Array.from(timers)) {
      if (timer.at <= now) { timers.delete(id); timer.callback(); }
    }
  } };
}

function sessionReadyResponse(fill = "a") {
  return new Response(
    JSON.stringify({
      contractVersion: "homeground-traffic-events.v2",
      state: "session_ready",
      sessionCredential: `v1.1999999999.${fill.repeat(64)}`,
      expiresAt: "2033-05-18T03:33:19.000Z",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

function stalledTrafficResponse(signal, status = 200, headers = {}) {
  return new Response(new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("{"));
      signal.addEventListener("abort", () => controller.error(signal.reason), { once: true });
    },
  }), { status, headers });
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
    "lib/analyticsRuntime.ts",
    "lib/analyticsVisibility.ts",
    "lib/inquiryTrafficConsent.ts",
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

  await context.test("internal mode and noncanonical previews block every sink and session token", async () => {
    for (const href of ["http://localhost:3000/", "https://preview.example.com/", "https://www.homegroundchina.com/"]) {
      installBrowser({ href });
      const { analytics } = loadCompiledModules(outputDirectory);
      let calls = 0;
      globalThis.fetch = async () => { calls += 1; throw new Error("unexpected network"); };
      assert.equal(analytics.initializeGoogleAnalytics(), false);
      assert.equal(analytics.initializeMetaPixel(), false);
      assert.equal(analytics.getTrafficSessionToken(), undefined);
      assert.deepEqual(analytics.trackEvent("contact_option_clicked", { channel: "whatsapp" }), []);
      analytics.trackPageView({ path: "/", locale: "en", target: "first_party" });
      await settleAsyncTurns();
      assert.equal(calls, 0);
      assert.equal(window.dataLayer, undefined);
      assert.equal(window.fbq, undefined);
    }
    const browser = installBrowser();
    const { analytics, runtime } = loadCompiledModules(outputDirectory);
    assert.equal(analytics.initializeGoogleAnalytics(), true);
    assert.equal(analytics.initializeMetaPixel(), true);
    analytics.getTrafficSessionToken();
    const changes = [];
    const unsubscribe = runtime.subscribeInternalTrafficExcluded((value) => changes.push(value));
    runtime.setInternalTrafficExcluded(true);
    assert.equal(runtime.isInternalTrafficExcluded(), true);
    assert.equal(window["ga-disable-G-TEST1234"], true);
    assert.equal(analytics.getTrafficSessionToken(), undefined);
    assert.equal(browser.sessionStorage.getItem("homeground-analytics-session"), null);
    assert.deepEqual(analytics.trackEvent("contact_option_clicked", { channel: "email" }), []);
    runtime.setInternalTrafficExcluded(false);
    assert.deepEqual(changes, [true, false]);
    unsubscribe();
  });

  await context.test("inquiry retries remove stale optional linkage while preserving the business snapshot", () => {
    const browser = installBrowser();
    const { analytics, inquiryTraffic, runtime } = loadCompiledModules(outputDirectory);
    const token = analytics.getTrafficSessionToken();
    const body = JSON.stringify({ trafficSessionToken: token, schemaVersion: "example", contact: { channel: "email", email: "fixture@example.test" } });
    assert.equal(inquiryTraffic.inquiryBodyWithCurrentTrafficConsent(body), body);
    runtime.setInternalTrafficExcluded(true);
    const redacted = JSON.parse(inquiryTraffic.inquiryBodyWithCurrentTrafficConsent(body));
    assert.equal(redacted.trafficSessionToken, null);
    assert.deepEqual(redacted.contact, JSON.parse(body).contact);
    runtime.setInternalTrafficExcluded(false);
    browser.emitStorage(preferences({ analytics: false, marketing: false }));
    assert.equal(JSON.parse(inquiryTraffic.inquiryBodyWithCurrentTrafficConsent(body)).trafficSessionToken, null);
  });

  await context.test("new consent version refuses legacy consent until a fresh choice", () => {
    installBrowser({ consent: { ...preferences({ analytics: true, marketing: true }), version: "2026-07-31.1" } });
    const { analytics, consent } = loadCompiledModules(outputDirectory);
    assert.equal(consent.readAnalyticsConsent(), null);
    assert.equal(analytics.initializeGoogleAnalytics(), false);
    assert.equal(analytics.initializeMetaPixel(), false);
    assert.equal(analytics.getTrafficSessionToken(), undefined);
  });

  await context.test("first uses are counted independently per sink only on a new consented interaction", async () => {
    const browser = installBrowser({ consent: preferences({ analytics: false, marketing: false }) });
    const { analytics } = loadCompiledModules(outputDirectory);
    globalThis.fetch = async (_url, init) => JSON.parse(init.body).requestType === "start_session" ? sessionReadyResponse() : new Response("{}", { status: 202 });
    const delivered = new Set();
    const focus = () => analytics.trackEventOnce(delivered, "quick_email_started", { submission_surface: "homepage_email" });
    focus();
    assert.equal(delivered.size, 0);
    browser.emitStorage(preferences({ analytics: false, marketing: true }));
    assert.equal(delivered.size, 0, "a new grant does not replay a prior input focus");
    focus();
    assert.deepEqual([...delivered], ["meta"]);
    browser.emitStorage(preferences({ analytics: true, marketing: true, updatedAt: "2026-09-05T00:00:01Z" }));
    focus(); focus();
    await settleAsyncTurns();
    assert.deepEqual([...delivered].sort(), ["first_party", "google", "meta"]);
    const google = window.dataLayer.filter((item) => item[0] === "event" && item[1] === "quick_email_started");
    const meta = window.fbq.queue.filter((item) => item[0] === "trackCustom" && item[1] === "quick_email_started");
    assert.equal(google.length, 1);
    assert.equal(meta.length, 1);
  });

  await context.test("product choices are validated and sent exclusively to first-party v2", async () => {
    installBrowser({ href: "https://homegroundchina.com/tours/beijing-highlights-5-day-private-tour/" });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body); requests.push(payload);
      return payload.requestType === "start_session" ? sessionReadyResponse() : new Response("{}", { status: 202 });
    };
    const context = { productSlug: "beijing-highlights-5-day-private-tour", packageId: "no-guide", travelers: 4, surface: "product" };
    analytics.trackEvent("product_selection_changed", { package_id: "do-not-send", travelers: 4 }, { firstPartyContext: context });
    await waitForTurns(() => requests.length === 2);
    assert.equal(requests[1].contractVersion, "homeground-traffic-events.v2");
    assert.equal(requests[1].noticeVersion, "2026-09-05.1");
    assert.deepEqual(requests[1].events[0], { eventId: requests[1].events[0].eventId, type: "product_selection_changed", pagePath: "/tours/beijing-highlights-5-day-private-tour/", actionCode: null, clientSequence: 1, ...context, errorCode: null });
    assert.equal(window.dataLayer, undefined);
    assert.equal(window.fbq, undefined);
    analytics.trackEvent("product_selection_changed", {}, { firstPartyContext: { ...context, packageId: "standard-guided" } });
    analytics.trackEvent("product_selection_changed", {}, { firstPartyContext: { ...context, travelers: 99 } });
    analytics.trackEvent("product_selection_changed", {}, { firstPartyContext: { ...context, productSlug: "private@email.test" } });
    await settleAsyncTurns();
    assert.equal(requests.length, 2);
    analytics.trackEvent("contact_option_clicked", { channel: "email", package_id: "no-guide", travelers: 4 }, { firstPartyContext: context });
    await waitForTurns(() => requests.length === 3);
    const googleEvent = window.dataLayer.find((item) => item[0] === "event");
    assert.equal(googleEvent[2].package_id, undefined);
    assert.equal(googleEvent[2].travelers, undefined);
    assert.equal(requests[2].events[0].clientSequence, 2);
  });

  await context.test("questionnaire answers and derived profiles never reach any measurement sink", async () => {
    installBrowser();
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body); requests.push(payload);
      return payload.requestType === "start_session" ? sessionReadyResponse() : new Response("{}", { status: 202 });
    };
    const privateFields = { destination_count: 3, has_other_place: true, destination_mode: "selected", timing_status: "custom", total_nights: 12, route_id: "derived-route", rule_version: "derived-rule", route_family: "derived-family", route_profile: "derived-profile" };
    analytics.trackEvent("contact_options_viewed", { page_language: "en", ...privateFields });
    analytics.trackEvent("planner_result_viewed", { page_language: "en", ...privateFields });
    await waitForTurns(() => requests.length === 2);
    const measurement = JSON.stringify({ requests, google: window.dataLayer.map((item) => Array.from(item)), meta: window.fbq.queue });
    for (const key of Object.keys(privateFields)) assert.equal(measurement.includes(`"${key}"`), false, key);
    assert.equal(measurement.includes("derived-profile"), false);
    assert.equal(measurement.includes("planner_result_viewed"), true);
  });

  await context.test("contact exposure requires the current surface to be visible", () => {
    const browser = installBrowser();
    const { visibility } = loadCompiledModules(outputDirectory);
    let hidden = true;
    let top = 20;
    let inspect;
    let count = 0;
    browser.window.innerHeight = 600;
    browser.window.innerWidth = 400;
    browser.window.getComputedStyle = () => ({ visibility: "visible", display: "block" });
    globalThis.IntersectionObserver = class { constructor(callback) { inspect = callback; } observe() {} disconnect() {} };
    globalThis.MutationObserver = class { observe() {} disconnect() {} };
    const element = { closest: () => hidden ? {} : null, getBoundingClientRect: () => ({ width: 200, height: 100, bottom: top + 100, top, right: 200, left: 0 }), parentElement: null };
    const observer = visibility.observeAnalyticsVisibility(element, () => { count += 1; });
    assert.equal(count, 0);
    hidden = false;
    top = 650;
    observer.inspect();
    assert.equal(count, 0);
    top = 20;
    inspect();
    assert.equal(count, 1);
    document.visibilityState = "hidden";
    observer.inspect();
    assert.equal(count, 1);
    observer.disconnect();
    delete globalThis.IntersectionObserver;
    delete globalThis.MutationObserver;
  });

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
      href: "https://homegroundchina.com/?service=full-trip-support&planner=party#route-finder",
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
          contractVersion: "homeground-traffic-events.v2",
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

  await context.test("queued events preserve attempt order and share the refreshed credential", async () => {
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
      return new Response("{}", { status: eventNumber === 1 ? 401 : 202 });
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
        3,
    );
    const eventIds = requests
      .filter((request) => request.requestType === "events")
      .map((request) => request.events[0].eventId);
    assert.equal(new Set(eventIds).size, 2);
    assert.equal(eventIds[0], eventIds[1]);
    assert.notEqual(eventIds[1], eventIds[2]);
  });

  await context.test("a stalled bootstrap body times out and releases later queued events", async (testContext) => {
    const clock = installQueueClock(testContext);
    installBrowser({ consent: preferences({ analytics: true, marketing: false }) });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let stalledSignal;
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body);
      requests.push(payload);
      if (requests.length === 1) {
        stalledSignal = init.signal;
        return stalledTrafficResponse(init.signal);
      }
      return payload.requestType === "start_session" ? sessionReadyResponse() : new Response("{}", { status: 202 });
    };
    analytics.trackEvent("contact_option_clicked", { channel: "whatsapp" });
    analytics.trackEvent("contact_option_clicked", { channel: "email" });
    await settleAsyncTurns();
    clock.advance(9_999);
    assert.equal(stalledSignal.aborted, false);
    clock.advance(1);
    await settleAsyncTurns();
    assert.equal(stalledSignal.aborted, true);
    clock.advance(1_000);
    await waitForTurns(() => requests.filter((request) => request.events).length === 2);
    assert.deepEqual(requests.filter((request) => request.events).map((request) => [request.events[0].actionCode, request.events[0].clientSequence]), [["whatsapp", 1], ["email", 2]]);
    assert.equal(new Set(requests.map((request) => request.sessionToken)).size, 1);
    await settleAsyncTurns();
  });

  await context.test("a stalled event body times out and retries with the original identity", async (testContext) => {
    const clock = installQueueClock(testContext);
    installBrowser({ consent: preferences({ analytics: true, marketing: false }) });
    const { analytics } = loadCompiledModules(outputDirectory);
    const eventRequests = [];
    let stalledSignal;
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body);
      if (payload.requestType === "start_session") return sessionReadyResponse();
      eventRequests.push(payload);
      if (eventRequests.length === 1) {
        stalledSignal = init.signal;
        return stalledTrafficResponse(init.signal, 202);
      }
      return new Response("{}", { status: 202 });
    };
    analytics.trackEvent("contact_option_clicked", { channel: "whatsapp" });
    analytics.trackEvent("contact_option_clicked", { channel: "email" });
    await waitForTurns(() => eventRequests.length === 1);
    await settleAsyncTurns();
    clock.advance(10_000);
    await settleAsyncTurns();
    assert.equal(stalledSignal.aborted, true);
    clock.advance(1_000);
    await waitForTurns(() => eventRequests.length === 3);
    assert.deepEqual(eventRequests[0].events, eventRequests[1].events);
    assert.equal(eventRequests[2].events[0].actionCode, "email");
    assert.equal(eventRequests[2].events[0].clientSequence, 2);
    await settleAsyncTurns();
  });

  await context.test("a stalled rate-limit body preserves Retry-After from its headers", async (testContext) => {
    const clock = installQueueClock(testContext);
    installBrowser({ consent: preferences({ analytics: true, marketing: false }) });
    const { analytics } = loadCompiledModules(outputDirectory);
    const eventRequests = [];
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body);
      if (payload.requestType === "start_session") return sessionReadyResponse();
      eventRequests.push(payload);
      return eventRequests.length === 1
        ? stalledTrafficResponse(init.signal, 429, { "Retry-After": "30" })
        : new Response("{}", { status: 202 });
    };
    analytics.trackEvent("contact_option_clicked", { channel: "whatsapp" });
    await waitForTurns(() => eventRequests.length === 1);
    await settleAsyncTurns();
    clock.advance(10_000);
    await settleAsyncTurns();
    clock.advance(19_999);
    await settleAsyncTurns();
    assert.equal(eventRequests.length, 1);
    clock.advance(1);
    await waitForTurns(() => eventRequests.length === 2);
    assert.deepEqual(eventRequests[0].events, eventRequests[1].events);
    await settleAsyncTurns();
  });

  for (const stalledStage of ["start_session", "events"]) {
    await context.test(`withdrawal cancels a stalled ${stalledStage} body and fresh consent unlocks the queue`, async () => {
      const browser = installBrowser({ consent: preferences({ analytics: true, marketing: false }) });
      const { analytics } = loadCompiledModules(outputDirectory);
      const requests = [];
      let stalledSignal;
      globalThis.fetch = async (_url, init) => {
        const payload = JSON.parse(init.body);
        requests.push(payload);
        if (payload.requestType === stalledStage && !stalledSignal) {
          stalledSignal = init.signal;
          return stalledTrafficResponse(init.signal, stalledStage === "events" ? 202 : 200);
        }
        return payload.requestType === "start_session" ? sessionReadyResponse() : new Response("{}", { status: 202 });
      };
      analytics.trackEvent("contact_option_clicked", { channel: "whatsapp" });
      await waitForTurns(() => Boolean(stalledSignal));
      await settleAsyncTurns();
      browser.emitStorage(preferences({ analytics: false, marketing: false, updatedAt: "2026-09-05T00:00:01Z" }));
      assert.equal(stalledSignal.aborted, true);
      const requestsAtWithdrawal = requests.length;
      analytics.trackEvent("contact_option_clicked", { channel: "messenger" });
      browser.emitStorage(preferences({ analytics: true, marketing: false, updatedAt: "2026-09-05T00:00:02Z" }));
      analytics.trackEvent("contact_option_clicked", { channel: "email" });
      await waitForTurns(() => requests.some((request) => request.events?.[0].actionCode === "email"));
      await settleAsyncTurns();
      const freshRequests = requests.slice(requestsAtWithdrawal);
      assert.deepEqual(freshRequests.map((request) => request.requestType), ["start_session", "events"]);
      assert.deepEqual(freshRequests[1].events.map((event) => event.actionCode), ["email"]);
      assert.notEqual(freshRequests[0].sessionToken, requests[0].sessionToken);
      assert.equal(freshRequests[1].events[0].clientSequence, 1);
    });
  }

  await context.test("marketing-only consent changes preserve a pending first-party click", async () => {
    const browser = installBrowser({ consent: preferences({ analytics: true, marketing: false }) });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let resolveBootstrap;
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body);
      requests.push(payload);
      if (payload.requestType === "start_session") return new Promise((resolve) => { resolveBootstrap = resolve; });
      return new Response("{}", { status: 202 });
    };
    analytics.trackEvent("contact_option_clicked", { channel: "whatsapp" });
    await waitForTurns(() => typeof resolveBootstrap === "function");
    browser.emitStorage(preferences({ analytics: true, marketing: true, updatedAt: "2026-09-05T00:00:01Z" }));
    browser.emitStorage(preferences({ analytics: true, marketing: false, updatedAt: "2026-09-05T00:00:02Z" }));
    resolveBootstrap(sessionReadyResponse());
    await waitForTurns(() => requests.some((request) => request.events));
    await settleAsyncTurns();
    assert.deepEqual(requests.map((request) => request.requestType), ["start_session", "events"]);
    assert.equal(requests[1].events[0].actionCode, "whatsapp");
    assert.equal(requests[1].sessionToken, requests[0].sessionToken);
    assert.equal(requests[1].events[0].clientSequence, 1);
  });

  await context.test("429 retry honors Retry-After and preserves event identity and sequence", async (testContext) => {
    const clock = installQueueClock(testContext);
    installBrowser({ consent: preferences({ analytics: true, marketing: false }) });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    let events = 0;
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body);
      requests.push(payload);
      if (payload.requestType === "start_session") return sessionReadyResponse();
      events += 1;
      return new Response("{}", { status: events === 1 ? 429 : 202, headers: { "Retry-After": "5" } });
    };
    analytics.trackPageView({ path: "/guides/", locale: "en", target: "first_party" });
    await waitForTurns(() => requests.length === 2);
    await settleAsyncTurns();
    clock.advance(4_999);
    await settleAsyncTurns();
    assert.equal(requests.length, 2);
    clock.advance(1);
    await waitForTurns(() => requests.length === 3);
    assert.deepEqual(requests[1].events, requests[2].events);
    assert.equal(requests[2].events[0].clientSequence, 1);
  });

  await context.test("503 respects a longer Retry-After than its default suppression", async (testContext) => {
    const clock = installQueueClock(testContext);
    installBrowser({ consent: preferences({ analytics: true, marketing: false }) });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body);
      requests.push(payload);
      return payload.requestType === "start_session" ? sessionReadyResponse()
        : new Response("{}", { status: requests.length === 2 ? 503 : 202, headers: { "Retry-After": "60" } });
    };
    analytics.trackPageView({ path: "/guides/", locale: "en", target: "first_party" });
    await waitForTurns(() => requests.length === 2);
    await settleAsyncTurns();
    clock.advance(59_999);
    await settleAsyncTurns();
    assert.equal(requests.length, 2);
    clock.advance(1);
    await waitForTurns(() => requests.length === 3);
    assert.deepEqual(requests[1].events, requests[2].events);
  });

  await context.test("long Retry-After expires the bounded queue and withdrawal cancels retries", async (testContext) => {
    const clock = installQueueClock(testContext);
    const browser = installBrowser({ consent: preferences({ analytics: true, marketing: false }) });
    const { analytics } = loadCompiledModules(outputDirectory);
    const requests = [];
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body);
      requests.push(payload);
      return payload.requestType === "start_session" ? sessionReadyResponse() : new Response("{}", { status: 429, headers: { "Retry-After": "999999" } });
    };
    analytics.trackPageView({ path: "/guides/", locale: "en", target: "first_party" });
    await waitForTurns(() => requests.length === 2);
    await settleAsyncTurns();
    clock.advance(120_000);
    await settleAsyncTurns();
    assert.equal(requests.length, 2, "expired events cannot be replayed after a long cooldown");
    browser.emitStorage(preferences({ analytics: false, marketing: false }));
    clock.advance(86_400_000);
    await settleAsyncTurns();
    assert.equal(requests.length, 2);
    assert.equal(browser.sessionStorage.getItem("homeground-analytics-session"), null);
  });

  await context.test("503 retries at most three times and clears on internal mode", async (testContext) => {
    const clock = installQueueClock(testContext);
    installBrowser({ consent: preferences({ analytics: true, marketing: false }) });
    const { analytics, runtime } = loadCompiledModules(outputDirectory);
    const requests = [];
    globalThis.fetch = async (_url, init) => {
      const payload = JSON.parse(init.body);
      requests.push(payload);
      return payload.requestType === "start_session" ? sessionReadyResponse() : new Response("{}", { status: 503 });
    };
    analytics.trackPageView({ path: "/guides/", locale: "en", target: "first_party" });
    await waitForTurns(() => requests.length === 2);
    await settleAsyncTurns();
    clock.advance(30_000);
    await waitForTurns(() => requests.length === 3);
    await settleAsyncTurns();
    clock.advance(30_000);
    await waitForTurns(() => requests.length === 4);
    await settleAsyncTurns();
    clock.advance(60_000);
    await settleAsyncTurns();
    assert.equal(requests.length, 4);
    assert.equal(new Set(requests.filter((r) => r.events).map((r) => r.events[0].eventId)).size, 1);
    analytics.trackPageView({ path: "/guides/", locale: "en", target: "first_party" });
    await settleAsyncTurns();
    const count = requests.length;
    runtime.setInternalTrafficExcluded(true);
    clock.advance(60_000);
    await settleAsyncTurns();
    assert.equal(requests.length, count);
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
            contractVersion: "homeground-traffic-events.v2",
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
