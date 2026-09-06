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
