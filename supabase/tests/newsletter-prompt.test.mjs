import assert from "node:assert/strict";
import { test, afterEach } from "node:test";
import { analyticsRuntimeIsAllowed } from "../../lib/analyticsRuntime.ts";
import { getNewsletterConfig, getNewsletterEndpoint, postNewsletter } from "../../lib/newsletter.ts";

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
  return import(`../../lib/newsletterPrompt.ts?test=${++sequence}`);
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

test("old Cookie preferences alone never trigger a popup on a returning visit", async () => {
  const local = new Map([["homeground-consent.v1", JSON.stringify({ necessary: true, analytics: true, marketing: true, updatedAt: new Date().toISOString() })]]);
  const prompt = await boot(new Map(), local);
  assert.equal(prompt.newsletterDelayRemaining(), null);
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
