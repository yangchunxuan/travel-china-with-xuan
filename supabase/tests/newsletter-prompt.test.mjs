import assert from "node:assert/strict";
import { test, afterEach } from "node:test";
import { analyticsRuntimeIsAllowed } from "../../lib/analyticsRuntime.ts";
import { getNewsletterConfig, getNewsletterEndpoint, postNewsletter } from "../../lib/newsletter.ts";
import { analyticsConsentStorageKey, analyticsConsentVersion } from "../../lib/analyticsConsent.ts";

let sequence = 0;
const originals = Object.fromEntries(["window", "sessionStorage", "localStorage"].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
function storage(values = new Map()) {
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
}
async function boot(sessionValues = new Map(), localValues = new Map(), blocked = false) {
  const unavailable = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  for (const [key, value] of Object.entries({ window: new EventTarget(), sessionStorage: blocked ? unavailable : storage(sessionValues), localStorage: blocked ? unavailable : storage(localValues) })) {
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  window.localStorage = localStorage;
  return import(`../../lib/newsletterPrompt.ts?test=${++sequence}`);
}
function storedConsent(analytics = false, marketing = false) {
  return JSON.stringify({ version: analyticsConsentVersion, necessary: true, analytics, marketing, updatedAt: "2026-09-01T12:00:00.000Z" });
}
async function restoreArrival(prompt, now = 1_000) {
  // Use the production Consent validator, with document memory isolated per boot.
  const consent = await import(`../../lib/analyticsConsent.ts?test=${++sequence}`);
  prompt.restoreReturningNewsletterLauncher(consent.readAnalyticsConsent() !== null, now);
  return consent;
}
afterEach(() => {
  for (const [key, descriptor] of Object.entries(originals)) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
});

test("a Cookie choice arms a full ten-second delay without displaying early", async () => {
  const prompt = await boot();
  assert.equal(prompt.newsletterDelayRemaining(1_000), null);
  prompt.armNewsletterPrompt(1_000);
  assert.equal(prompt.newsletterDelayRemaining(1_000), 10_000);
  assert.equal(prompt.newsletterDelayRemaining(10_999), 1);
  assert.equal(prompt.newsletterDelayRemaining(11_000), 0);
});

test("later Cookie preference changes do not restart the original countdown", async () => {
  const prompt = await boot();
  prompt.armNewsletterPrompt(1_000);
  prompt.armNewsletterPrompt(7_000);
  assert.equal(prompt.newsletterDelayRemaining(7_000), 4_000);
});

test("the countdown survives a document change while reading another article", async () => {
  const session = new Map();
  const first = await boot(session);
  first.armNewsletterPrompt(1_000);
  const nextPage = await boot(session);
  assert.equal(nextPage.newsletterDelayRemaining(6_000), 5_000);
});

test("a displayed or dismissed prompt stays handled across articles", async () => {
  const session = new Map();
  const first = await boot(session);
  first.armNewsletterPrompt(1_000);
  first.markNewsletterPromptHandled();
  const nextPage = await boot(session);
  nextPage.armNewsletterPrompt(50_000);
  assert.equal(nextPage.newsletterDelayRemaining(50_000), null);
});

test("the launcher waits until the invitation is handled, even after the countdown expires", async () => {
  const prompt = await boot();
  assert.equal(prompt.newsletterLauncherAvailable("/"), false);
  prompt.armNewsletterPrompt(1_000);
  assert.equal(prompt.newsletterLauncherAvailable("/"), false);
  assert.equal(prompt.newsletterDelayRemaining(10_999), 1);
  assert.equal(prompt.newsletterLauncherAvailable("/"), false);
  assert.equal(prompt.newsletterDelayRemaining(11_000), 0);
  assert.equal(prompt.newsletterLauncherAvailable("/"), false);
  prompt.markNewsletterPromptHandled();
  assert.equal(prompt.newsletterLauncherAvailable("/"), true);
});

test("a handled invitation restores only its launcher across pages, reloads and all three languages", async () => {
  const session = new Map();
  const local = new Map();
  const initial = await boot(session, local);
  initial.armNewsletterPrompt(1_000);
  initial.markNewsletterPromptHandled();
  for (const prefix of ["", "/zh", "/ko"]) {
    for (const path of ["/", "/guides/example/", "/tours/"]) {
      const page = await boot(session, local);
      assert.equal(page.newsletterLauncherAvailable(prefix + path), true);
      assert.equal(page.consumeNewsletterLanguageTransfer(prefix + path, 12_000), null);
      assert.equal(page.newsletterDelayRemaining(12_000), null);
      const reload = await boot(session, local);
      assert.equal(reload.newsletterLauncherAvailable(prefix + path), true);
      assert.equal(reload.newsletterDelayRemaining(12_000), null);
    }
  }
  assert.deepEqual([...session.keys()], [initial.newsletterPromptStorageKey]);
  assert.deepEqual([...local], []);
  const separateTab = await boot(new Map(), local);
  assert.equal(separateTab.newsletterLauncherAvailable("/"), false);
});

test("joining suppresses automatic invitations while preserving the manual launcher", async () => {
  const session = new Map();
  const local = new Map();
  const prompt = await boot(session, local);
  prompt.markNewsletterPromptHandled();
  assert.equal(prompt.newsletterLauncherAvailable("/guides/example/"), true);
  prompt.markNewsletterJoined();
  assert.equal(prompt.newsletterLauncherAvailable("/guides/example/"), true);
  assert.equal(prompt.newsletterDelayRemaining(), null);
  const reload = await boot(session, local);
  for (const prefix of ["", "/zh", "/ko"]) {
    assert.equal(reload.newsletterLauncherAvailable(prefix + "/guides/example/"), true);
  }
  assert.deepEqual([...local.values()], ["true"]);
});

test("a handled invitation never adds a launcher to sensitive or ineligible pages", async () => {
  const prompt = await boot();
  prompt.markNewsletterPromptHandled();
  for (const prefix of ["", "/zh", "/ko"]) {
    for (const path of ["/admin/", "/privacy/", "/terms/", "/legal/", "/newsletter/confirm/", "/newsletter/unsubscribe/", "/unknown/"]) {
      assert.equal(prompt.newsletterLauncherAvailable(prefix + path), false, prefix + path);
    }
  }
});

test("blocked storage retains manual entry only in document memory, including after joining", async () => {
  const prompt = await boot(new Map(), new Map(), true);
  prompt.armNewsletterPrompt(1_000);
  assert.equal(prompt.newsletterLauncherAvailable("/"), false);
  prompt.markNewsletterPromptHandled();
  assert.equal(prompt.newsletterLauncherAvailable("/zh/guides/example/"), true);
  assert.equal(prompt.newsletterLauncherAvailable("/ko/tours/"), true);
  assert.equal(prompt.newsletterDelayRemaining(12_000), null);
  const reload = await boot(new Map(), new Map(), true);
  assert.equal(reload.newsletterLauncherAvailable("/ko/tours/"), false);
  reload.markNewsletterPromptHandled();
  assert.equal(reload.newsletterLauncherAvailable("/"), true);
  reload.markNewsletterJoined();
  assert.equal(reload.newsletterLauncherAvailable("/"), true);
  assert.equal(reload.newsletterDelayRemaining(), null);
});

test("a displayed prompt preserves its expanded or collapsed state when switching to EN, ZH or KO", async () => {
  for (const pathname of ["/guides/example/", "/zh/guides/example/", "/ko/guides/example/"]) {
    for (const expanded of [true, false]) {
      const session = new Map();
      const currentPage = await boot(session);
      currentPage.armNewsletterPrompt(1_000);
      assert.equal(currentPage.newsletterDelayRemaining(11_000), 0);
      currentPage.markNewsletterPromptHandled();
      currentPage.saveNewsletterLanguageTransfer(pathname, expanded, 11_000);

      const translatedPage = await boot(session);
      assert.deepEqual(translatedPage.consumeNewsletterLanguageTransfer(pathname, 12_000), { expanded });
      assert.equal(translatedPage.newsletterDelayRemaining(12_000), null);
      assert.equal(translatedPage.consumeNewsletterLanguageTransfer(pathname, 12_001), null);
      assert.equal(session.has(translatedPage.newsletterLanguageTransferStorageKey), false);

      const reload = await boot(session);
      assert.equal(reload.consumeNewsletterLanguageTransfer(pathname, 12_002), null);
    }
  }
});

test("a language transfer matches paths with or without their trailing slash", async () => {
  const session = new Map();
  const currentPage = await boot(session);
  currentPage.saveNewsletterLanguageTransfer("/zh/guides/example/", false, 1_000);
  const translatedPage = await boot(session);
  assert.deepEqual(translatedPage.consumeNewsletterLanguageTransfer("/zh/guides/example", 2_000), { expanded: false });

  translatedPage.saveNewsletterLanguageTransfer("/ko/guides/example", true, 3_000);
  const nextPage = await boot(session);
  assert.deepEqual(nextPage.consumeNewsletterLanguageTransfer("/ko/guides/example/", 4_000), { expanded: true });
});

test("visiting a different path clears the transfer instead of restoring it on a later visit", async () => {
  for (const pathname of ["/zh/guides/other/", "/ko/guides/example/", "/zh/privacy/", null]) {
    const session = new Map();
    const currentPage = await boot(session);
    currentPage.saveNewsletterLanguageTransfer("/zh/guides/example/", true, 1_000);
    const nextPage = await boot(session);
    assert.equal(nextPage.consumeNewsletterLanguageTransfer(pathname, 2_000), null);
    assert.equal(session.has(nextPage.newsletterLanguageTransferStorageKey), false);
    assert.equal(nextPage.consumeNewsletterLanguageTransfer("/zh/guides/example/", 2_001), null);

    const laterVisit = await boot(session);
    assert.equal(laterVisit.consumeNewsletterLanguageTransfer("/zh/guides/example/", 3_000), null);
  }
});

test("a language transfer expires after thirty seconds and is removed", async () => {
  const session = new Map();
  const currentPage = await boot(session);
  currentPage.saveNewsletterLanguageTransfer("/zh/", true, 1_000);
  const withinDeadline = await boot(session);
  assert.deepEqual(withinDeadline.consumeNewsletterLanguageTransfer("/zh/", 30_999), { expanded: true });

  withinDeadline.saveNewsletterLanguageTransfer("/zh/", false, 40_000);
  const expired = await boot(session);
  assert.equal(expired.consumeNewsletterLanguageTransfer("/zh/", 70_001), null);
  assert.equal(session.has(expired.newsletterLanguageTransferStorageKey), false);
  assert.equal(expired.consumeNewsletterLanguageTransfer("/zh/", 70_002), null);
});

test("damaged or invalid stored transfer records cannot restore a prompt", async () => {
  const malformedRecords = [
    "{not-json",
    "null",
    "[]",
    JSON.stringify({ pathname: "/zh", expanded: "false", expiresAt: 31_000 }),
    JSON.stringify({ pathname: "/zh", expanded: 1, expiresAt: 31_000 }),
    JSON.stringify({ pathname: "/zh", expanded: true }),
    JSON.stringify({ pathname: "/zh", expanded: true, expiresAt: null }),
    JSON.stringify({ pathname: "/zh", expanded: true, expiresAt: "31000" }),
    '{"pathname":"/zh","expanded":true,"expiresAt":1e309}',
    JSON.stringify({ pathname: "/zh", expanded: true, expiresAt: 32_001 }),
  ];
  for (const raw of malformedRecords) {
    const session = new Map();
    const currentPage = await boot(session);
    currentPage.saveNewsletterLanguageTransfer("/zh/", true, 1_000);
    session.set(currentPage.newsletterLanguageTransferStorageKey, raw);
    assert.equal(currentPage.consumeNewsletterLanguageTransfer("/zh/", 2_000), null, raw);
    assert.equal(session.has(currentPage.newsletterLanguageTransferStorageKey), false);
    assert.equal(currentPage.consumeNewsletterLanguageTransfer("/zh/", 2_001), null);

    session.set(currentPage.newsletterLanguageTransferStorageKey, raw);
    const nextPage = await boot(session);
    assert.equal(nextPage.consumeNewsletterLanguageTransfer("/zh/", 2_000), null, raw);
    assert.equal(session.has(nextPage.newsletterLanguageTransferStorageKey), false);
  }
});

test("a transfer remains single-use in the current document when storage deletion fails", async () => {
  const session = new Map();
  const prompt = await boot(session);
  prompt.saveNewsletterLanguageTransfer("/ko/", true, 1_000);
  sessionStorage.removeItem = () => { throw new Error("deletion blocked"); };
  assert.deepEqual(prompt.consumeNewsletterLanguageTransfer("/ko/", 2_000), { expanded: true });
  assert.equal(session.has(prompt.newsletterLanguageTransferStorageKey), true);
  assert.equal(prompt.consumeNewsletterLanguageTransfer("/ko/", 2_001), null);
  assert.equal(prompt.consumeNewsletterLanguageTransfer("/ko/", 2_002), null);

  prompt.saveNewsletterLanguageTransfer("/zh/", false, 3_000);
  assert.deepEqual(prompt.consumeNewsletterLanguageTransfer("/zh/", 4_000), { expanded: false });
  assert.equal(prompt.consumeNewsletterLanguageTransfer("/zh/", 4_001), null);
});

test("clearing, dismissing or subscribing cancels a pending language transfer", async () => {
  for (const cancel of ["clearNewsletterLanguageTransfer", "markNewsletterPromptHandled", "markNewsletterJoined"]) {
    const session = new Map();
    const local = new Map();
    const currentPage = await boot(session, local);
    currentPage.armNewsletterPrompt(1_000);
    currentPage.markNewsletterPromptHandled();
    currentPage.saveNewsletterLanguageTransfer("/ko/guides/example/", true, 11_000);
    currentPage[cancel]();
    assert.equal(currentPage.consumeNewsletterLanguageTransfer("/ko/guides/example/", 12_000), null);
    assert.equal(session.has(currentPage.newsletterLanguageTransferStorageKey), false);

    const translatedPage = await boot(session, local);
    assert.equal(translatedPage.consumeNewsletterLanguageTransfer("/ko/guides/example/", 12_001), null);
    assert.equal(translatedPage.newsletterDelayRemaining(12_001), null);
  }
});

test("an old handled record does not restore a prompt without an explicit language transfer", async () => {
  const session = new Map();
  const currentPage = await boot(session);
  currentPage.armNewsletterPrompt(1_000);
  currentPage.markNewsletterPromptHandled();
  for (const pathname of ["/guides/example/", "/zh/guides/example/", "/ko/guides/example/"]) {
    const translatedPage = await boot(session);
    assert.equal(translatedPage.consumeNewsletterLanguageTransfer(pathname, 12_000), null);
    translatedPage.armNewsletterPrompt(12_000);
    assert.equal(translatedPage.newsletterDelayRemaining(12_000), null);
  }
});

test("language transfers are confined to the current tab and never use localStorage", async () => {
  const session = new Map();
  const local = new Map();
  const currentPage = await boot(session, local);
  currentPage.saveNewsletterLanguageTransfer("/zh/tours/", true, 1_000);
  assert.equal(session.has(currentPage.newsletterLanguageTransferStorageKey), true);
  assert.deepEqual([...local], []);

  const otherTab = await boot(new Map(), local);
  assert.equal(otherTab.consumeNewsletterLanguageTransfer("/zh/tours/", 2_000), null);
  const originalTab = await boot(session, local);
  assert.deepEqual(originalTab.consumeNewsletterLanguageTransfer("/zh/tours/", 2_000), { expanded: true });
});

test("language transfers reject external, sensitive and ineligible destinations without retaining them", async () => {
  const session = new Map();
  const local = new Map();
  const prompt = await boot(session, local);
  const invalidPaths = [
    "https://homegroundchina.com/zh/guides/example/",
    "https://example.com/zh/guides/example/",
    "//example.com/zh/guides/example/",
    "/zh/guides\\example/",
    "/zh/guides/example/?email=private@example.com",
    "/zh/guides/example/#private@example.com",
    ...["", "/zh", "/ko"].flatMap(prefix => ["/admin/", "/privacy/", "/terms/", "/legal/", "/newsletter/confirm/", "/newsletter/unsubscribe/"].map(path => prefix + path)),
  ];
  for (const pathname of invalidPaths) {
    prompt.saveNewsletterLanguageTransfer(pathname, true, 1_000);
    assert.equal(session.has(prompt.newsletterLanguageTransferStorageKey), false, pathname);
    assert.equal(prompt.consumeNewsletterLanguageTransfer(pathname, 2_000), null, pathname);
  }
  prompt.saveNewsletterLanguageTransfer("/zh/guides/example/", false, 3_000);
  const stored = JSON.stringify([...session, ...local]);
  assert.equal(stored.includes("private@example.com"), false);
  assert.equal(stored.includes("?"), false);
  assert.equal(stored.includes("#"), false);
  assert.deepEqual([...local], []);
});

test("blocked storage allows a transfer within the current document but never restores it after reload", async () => {
  const currentPage = await boot(new Map(), new Map(), true);
  currentPage.saveNewsletterLanguageTransfer("/zh/", false, 1_000);
  assert.deepEqual(currentPage.consumeNewsletterLanguageTransfer("/zh/", 2_000), { expanded: false });
  assert.equal(currentPage.consumeNewsletterLanguageTransfer("/zh/", 2_001), null);

  currentPage.saveNewsletterLanguageTransfer("/ko/", true, 3_000);
  const reload = await boot(new Map(), new Map(), true);
  assert.equal(reload.consumeNewsletterLanguageTransfer("/ko/", 4_000), null);
  assert.equal(reload.newsletterDelayRemaining(4_000), null);
});

test("switching languages before the countdown ends preserves the remaining delay", async () => {
  const session = new Map();
  const englishPage = await boot(session);
  englishPage.armNewsletterPrompt(1_000);

  const chinesePage = await boot(session);
  assert.equal(chinesePage.consumeNewsletterLanguageTransfer("/zh/guides/example/", 4_000), null);
  chinesePage.armNewsletterPrompt(4_000);
  assert.equal(chinesePage.newsletterDelayRemaining(4_000), 7_000);

  const koreanPage = await boot(session);
  assert.equal(koreanPage.consumeNewsletterLanguageTransfer("/ko/guides/example/", 8_000), null);
  koreanPage.armNewsletterPrompt(8_000);
  assert.equal(koreanPage.newsletterDelayRemaining(8_000), 3_000);
  assert.equal(koreanPage.newsletterDelayRemaining(10_999), 1);
  assert.equal(koreanPage.newsletterDelayRemaining(11_000), 0);
});

test("valid returning Cookie choices restore only a launcher in every new tab and language", async () => {
  for (const [analytics, marketing] of [[false, false], [true, false], [true, true]]) {
    const saved = storedConsent(analytics, marketing);
    const local = new Map([[analyticsConsentStorageKey, saved]]);
    for (const path of ["/", "/guides/example/", "/zh/guides/example/", "/ko/tours/"]) {
      const session = new Map();
      const prompt = await boot(session, local);
      let cookieChoices = 0;
      window.addEventListener("homeground:consent-changed", () => cookieChoices++);
      const consent = await restoreArrival(prompt);
      assert.equal(prompt.newsletterLauncherAvailable(path), true);
      assert.equal(prompt.newsletterDelayRemaining(1_000), null);
      assert.equal(prompt.newsletterDelayRemaining(100_000), null);
      assert.equal(prompt.consumeNewsletterLanguageTransfer(path, 2_000), null);
      assert.deepEqual(JSON.parse(session.get(prompt.newsletterPromptStorageKey)), { dueAt: 1_000, handled: true });
      assert.equal(cookieChoices, 0);
      assert.deepEqual([...local], [[analyticsConsentStorageKey, saved]]);
      assert.equal(consent.hasAnalyticsConsent(), analytics);
      assert.equal(consent.hasMarketingConsent(), marketing);
    }
  }
});

test("absent, malformed, and outdated Cookie records cannot identify a returning visitor", async () => {
  for (const raw of [null, "bad json", "null", "[]", JSON.stringify({ necessary: true, analytics: true, marketing: true }),
    JSON.stringify({ version: "old", necessary: true, analytics: false, marketing: false, updatedAt: "2026-09-01" }),
    JSON.stringify({ version: analyticsConsentVersion, necessary: true, analytics: false, marketing: false, updatedAt: "invalid" })]) {
    const local = new Map(raw === null ? [] : [[analyticsConsentStorageKey, raw]]);
    const prompt = await boot(new Map(), local);
    await restoreArrival(prompt);
    assert.equal(prompt.newsletterLauncherAvailable("/"), false, String(raw));
    assert.equal(prompt.newsletterDelayRemaining(20_000), null);
    assert.equal(prompt.readNewsletterPrompt(), null);
  }
});

test("saving the first Cookie choice on this page cannot steal the ten-second invitation", async () => {
  for (const analytics of [false, true]) {
    const session = new Map();
    const prompt = await boot(session);
    const consent = await restoreArrival(prompt);
    assert.equal(prompt.newsletterLauncherAvailable("/"), false);

    // AnalyticsConsent.choose writes Cookie preferences before calling arm.
    // A repeated mount/route check in that gap must still remain a first visit.
    consent.saveAnalyticsConsent({ analytics, marketing: false });
    prompt.restoreReturningNewsletterLauncher(consent.readAnalyticsConsent() !== null, 1_000);
    assert.equal(prompt.readNewsletterPrompt(), null);
    prompt.armNewsletterPrompt(1_000);
    assert.equal(prompt.newsletterDelayRemaining(1_000), 10_000);
    assert.equal(prompt.newsletterDelayRemaining(10_999), 1);
    assert.equal(prompt.newsletterLauncherAvailable("/"), false);
    assert.equal(prompt.newsletterDelayRemaining(11_000), 0);
    assert.equal(prompt.newsletterLauncherAvailable("/"), false);
    prompt.markNewsletterPromptHandled();
    assert.equal(prompt.newsletterLauncherAvailable("/"), true);
  }
});

test("a first-choice countdown survives late initialization and later article/language arrivals", async () => {
  const session = new Map();
  const local = new Map();
  const first = await boot(session, local);
  first.armNewsletterPrompt(1_000);
  local.set(analyticsConsentStorageKey, storedConsent());
  await restoreArrival(first, 2_000);
  assert.equal(first.newsletterDelayRemaining(2_000), 9_000);
  assert.equal(first.newsletterLauncherAvailable("/"), false);
  for (const [path, now] of [["/guides/example/", 3_000], ["/zh/guides/example/", 4_000], ["/ko/guides/example/", 5_000]]) {
    const next = await boot(session, local);
    await restoreArrival(next, now);
    assert.equal(next.newsletterLauncherAvailable(path), false);
    assert.equal(next.newsletterDelayRemaining(now), 11_000 - now);
    assert.equal(next.consumeNewsletterLanguageTransfer(path, now), null);
  }
});

test("returning launchers stay minimized across Cookie edits, closing, and language navigation", async () => {
  const session = new Map();
  const local = new Map([[analyticsConsentStorageKey, storedConsent()]]);
  const prompt = await boot(session, local);
  const consent = await restoreArrival(prompt);
  consent.saveAnalyticsConsent({ analytics: false, marketing: false });
  prompt.armNewsletterPrompt(5_000);
  assert.equal(prompt.newsletterDelayRemaining(5_000), null);
  prompt.markNewsletterPromptHandled();
  for (const path of ["/zh/guides/example/", "/ko/guides/example/", "/guides/example/"]) {
    const next = await boot(session, local);
    await restoreArrival(next, 6_000);
    assert.equal(next.newsletterLauncherAvailable(path), true);
    assert.equal(next.newsletterDelayRemaining(6_000), null);
    assert.equal(next.consumeNewsletterLanguageTransfer(path, 6_000), null);
  }
});

test("joined returning visitors retain manual entry without automatic or confirmed-subscription claims", async () => {
  const local = new Map([[analyticsConsentStorageKey, storedConsent()]]);
  const previous = await boot(new Map(), local);
  previous.markNewsletterJoined();
  const next = await boot(new Map(), local);
  await restoreArrival(next);
  assert.equal(next.newsletterAlreadyJoined(), true);
  assert.equal(next.newsletterLauncherAvailable("/ko/guides/example/"), true);
  next.armNewsletterPrompt(2_000);
  assert.equal(next.newsletterDelayRemaining(20_000), null);
  let manualOpens = 0;
  window.addEventListener(next.newsletterOpenEvent, () => manualOpens++);
  next.openNewsletter();
  assert.equal(manualOpens, 1);
  assert.deepEqual([...local.keys()].sort(), [analyticsConsentStorageKey, next.newsletterJoinedStorageKey].sort());
  assert.equal(local.get(next.newsletterJoinedStorageKey), "true");
});

test("joined visitors with cleared Cookie choices retain manual entry after choosing again without a countdown", async () => {
  const local = new Map();
  const previous = await boot(new Map(), local);
  previous.markNewsletterJoined();
  const next = await boot(new Map(), local);
  const consent = await restoreArrival(next);
  assert.equal(consent.readAnalyticsConsent(), null);
  assert.equal(local.has(analyticsConsentStorageKey), false);
  // The existing Cookie banner controls visibility until the reader chooses;
  // initialization only prepares a manual entry, without creating Cookie consent.
  assert.equal(next.newsletterLauncherAvailable("/guides/example/"), true);
  assert.equal(next.newsletterDelayRemaining(1_000), null);
  consent.saveAnalyticsConsent({ analytics: false, marketing: false });
  next.armNewsletterPrompt(2_000);
  assert.equal(next.newsletterLauncherAvailable("/guides/example/"), true);
  assert.equal(next.newsletterDelayRemaining(2_000), null);
  assert.equal(next.newsletterDelayRemaining(12_000), null);
  let manualOpens = 0;
  window.addEventListener(next.newsletterOpenEvent, () => manualOpens++);
  next.openNewsletter();
  assert.equal(manualOpens, 1);
  assert.equal(consent.hasAnalyticsConsent(), false);
  assert.equal(consent.hasMarketingConsent(), false);
});

test("a successful subscription request suppresses future automatic prompts without storing the email", async () => {
  const local = new Map();
  const prompt = await boot(new Map(), local);
  prompt.markNewsletterJoined();
  assert.deepEqual([...local.values()], ["true"]);
  const nextVisit = await boot(new Map(), local);
  nextVisit.armNewsletterPrompt();
  assert.equal(nextVisit.newsletterDelayRemaining(), null);
});

test("blocked storage preserves timing and dismissal within the current document", async () => {
  const prompt = await boot(new Map(), new Map(), true);
  prompt.armNewsletterPrompt(1_000);
  assert.equal(prompt.newsletterDelayRemaining(11_000), 0);
  prompt.markNewsletterPromptHandled();
  assert.equal(prompt.newsletterDelayRemaining(12_000), null);
});

test("automatic prompts exclude admin, legal and subscription-management pages in every language", async () => {
  const prompt = await boot();
  for (const prefix of ["", "/zh", "/ko"]) {
    for (const path of ["/", "/guides/example/", "/tours/", "/explore/"]) assert.equal(prompt.newsletterPageEligible(prefix + path), true);
    for (const path of ["/admin/", "/privacy/", "/terms/", "/newsletter/confirm/", "/newsletter/unsubscribe/"]) assert.equal(prompt.newsletterPageEligible(prefix + path), false);
  }
});

test("subscription-management pages disable every optional analytics sink even with a public origin", async () => {
  await boot();
  window.localStorage = localStorage;
  for (const prefix of ["", "/zh", "/ko"]) {
    window.location = { origin: "https://homegroundchina.com", pathname: `${prefix}/newsletter/confirm/` };
    assert.equal(analyticsRuntimeIsAllowed(), false);
  }
  window.location.pathname = "/guides/example/";
  assert.equal(analyticsRuntimeIsAllowed(), true);
});

test("turning off signup prompts leaves existing confirmation and withdrawal links usable", async () => {
  const enabled = process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_ENABLED;
  const endpoint = process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_API_URL;
  const originalFetch = globalThis.fetch;
  try {
    process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_ENABLED = "false";
    process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_API_URL = "https://example.com/functions/v1/v1-newsletter";
    assert.equal(getNewsletterConfig(), null);
    assert.ok(getNewsletterEndpoint());
    globalThis.fetch = async (url, options) => {
      assert.equal(url, process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_API_URL);
      assert.equal(JSON.parse(options.body).action, "unsubscribe");
      assert.equal(options.referrerPolicy, "no-referrer");
      return new Response(JSON.stringify({ status: "unsubscribed" }), { status: 200 });
    };
    assert.equal(await postNewsletter({ action: "unsubscribe", token: "test-only" }), "unsubscribed");
  } finally {
    globalThis.fetch = originalFetch;
    if (enabled === undefined) delete process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_ENABLED;
    else process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_ENABLED = enabled;
    if (endpoint === undefined) delete process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_API_URL;
    else process.env.NEXT_PUBLIC_HOMEGROUND_NEWSLETTER_API_URL = endpoint;
  }
});
