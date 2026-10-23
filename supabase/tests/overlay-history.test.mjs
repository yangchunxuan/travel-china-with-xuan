import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createOverlayHistory, overlayHistoryStateKey } from "../../lib/overlayHistory.ts";

const settle = () => new Promise((resolve) => setTimeout(resolve, 15));

/** A same-document session history: pushState/replaceState/go with an asynchronous popstate, as browsers do. */
function fakeBrowser({ url = "https://homegroundchina.com/tours/demo/?tour=demo#planner-contact", activated = true } = {}) {
  const listeners = [];
  // The visitor arrived from another site; the tour page is the current entry.
  const entries = [
    { url: "https://example.com/previous", state: null, scrollRestoration: "auto" },
    { url, state: { __NA: true, tree: "page" }, scrollRestoration: "auto" },
  ];
  let index = 1;
  const calls = { push: [], go: [] };
  const history = {
    get state() { return entries[index].state; },
    get scrollRestoration() { return entries[index].scrollRestoration; },
    set scrollRestoration(value) { entries[index].scrollRestoration = value; },
    pushState(state, _unused, nextUrl) {
      calls.push.push(nextUrl);
      entries.splice(index + 1);
      entries.push({ url: nextUrl ?? entries[index].url, state: structuredClone(state), scrollRestoration: entries[index].scrollRestoration });
      index++;
    },
    replaceState(state, _unused, nextUrl) {
      entries[index] = { ...entries[index], url: nextUrl ?? entries[index].url, state: structuredClone(state) };
    },
    go(delta) {
      calls.go.push(delta);
      setTimeout(() => {
        const next = Math.max(0, Math.min(entries.length - 1, index + delta));
        if (next === index) return;
        index = next;
        // Leaving the page's document: a real browser unloads; the fake stops dispatching.
        if (entries[index].url !== url) { browser.left = true; return; }
        for (const listener of listeners) listener({ state: entries[index].state });
      }, 1);
    },
  };
  const browser = {
    history, calls, entries, left: false,
    get index() { return index; },
    get url() { return entries[index].url; },
    back() { history.go(-1); },
    host: {
      history,
      addEventListener: (_type, listener) => listeners.push(listener),
      setTimeout: (callback, ms) => setTimeout(callback, ms),
      clearTimeout: (handle) => clearTimeout(handle),
      hasUserActivation: () => activated,
    },
  };
  return browser;
}

test("opening adds one entry at the same address; Back closes the overlay and the page stays; a second Back leaves", async () => {
  const browser = fakeBrowser();
  const overlays = createOverlayHistory(browser.host);
  let closed = 0;
  const menu = overlays.open(() => { closed++; });
  await settle();
  assert.equal(browser.entries.length, 3, "one entry for the menu");
  assert.deepEqual(browser.calls.push, [undefined], "the URL, its hash and its query are never rewritten");
  assert.equal(browser.url, "https://homegroundchina.com/tours/demo/?tour=demo#planner-contact");
  assert.equal(typeof browser.history.state[overlayHistoryStateKey], "string");
  assert.equal(browser.history.state.__NA, true, "Next.js keeps its own history state");
  assert.equal(menu.current, true);

  browser.back();
  await settle();
  assert.equal(closed, 1, "Back closed the menu");
  assert.equal(browser.index, 1, "the page is still on screen");
  assert.equal(menu.current, false);
  menu.close();
  await settle();
  assert.deepEqual(browser.calls.go, [-1], "closing after Back adds no traversal of its own");

  browser.back();
  await settle();
  assert.equal(browser.left, true, "the next Back leaves the page normally");
});

test("closing with ✕, Esc or the backdrop takes the entry off, so one Back leaves the page", async () => {
  const browser = fakeBrowser();
  const overlays = createOverlayHistory(browser.host);
  let backs = 0;
  const dialog = overlays.open(() => { backs++; });
  await settle();
  dialog.close();
  await settle();
  assert.deepEqual(browser.calls.go, [-1]);
  assert.equal(browser.index, 1);
  assert.equal(backs, 0, "our own traversal is not mistaken for the visitor's Back");
  assert.equal(overlays.entries, 0);
  browser.back();
  await settle();
  assert.equal(browser.left, true, "no stray entry is left behind");
});

test("an overlay closing while another opens hands its entry over, in either order", async () => {
  for (const order of ["close-first", "open-first"]) {
    const browser = fakeBrowser();
    const overlays = createOverlayHistory(browser.host);
    let quoteClosed = 0;
    const menu = overlays.open(() => {});
    await settle();
    let quote;
    if (order === "close-first") { menu.close(); quote = overlays.open(() => { quoteClosed++; }); }
    else { quote = overlays.open(() => { quoteClosed++; }); menu.close(); }
    await settle();
    assert.equal(browser.entries.length, 3, `${order}: still exactly one overlay entry`);
    assert.deepEqual(browser.calls.go, [], `${order}: no back-and-forth`);
    assert.equal(quote.current, true);
    browser.back();
    await settle();
    assert.equal(quoteClosed, 1, `${order}: Back closes the quote dialog`);
    assert.equal(browser.index, 1);
    browser.back();
    await settle();
    assert.equal(browser.left, true);
  }
});

test("a link chosen in an overlay navigates only after the overlay's entry is gone", async () => {
  const browser = fakeBrowser();
  const overlays = createOverlayHistory(browser.host);
  const menu = overlays.open(() => {});
  await settle();
  const seen = [];
  menu.close(() => seen.push(browser.index));
  assert.deepEqual(seen, [], "nothing navigates while the traversal is due");
  await settle();
  assert.deepEqual(seen, [1], "the navigation starts from the page's own entry");
  assert.equal(overlays.entries, 0);
});

test("nested overlays: Back closes the newest first", async () => {
  const browser = fakeBrowser();
  const overlays = createOverlayHistory(browser.host);
  const closed = [];
  overlays.open(() => { closed.push("quote"); });
  await settle();
  overlays.open(() => { closed.push("card"); });
  await settle();
  assert.equal(browser.entries.length, 4);
  browser.back();
  await settle();
  assert.deepEqual(closed, ["card"]);
  browser.back();
  await settle();
  assert.deepEqual(closed, ["card", "quote"]);
  assert.equal(browser.index, 1);
});

test("an overlay that cannot close yet keeps an entry, so the next Back asks again", async () => {
  const browser = fakeBrowser();
  const overlays = createOverlayHistory(browser.host);
  let sending = true;
  let closed = 0;
  overlays.open(() => (sending ? false : void closed++));
  await settle();
  browser.back();
  await settle();
  assert.equal(browser.entries.length, 3, "a fresh entry replaces the one Back used");
  assert.equal(browser.index, 2);
  sending = false;
  browser.back();
  await settle();
  assert.equal(closed, 1);
  assert.equal(browser.index, 1);
});

test("without a user gesture (an overlay a deep link opens on load) no entry is added", async () => {
  const browser = fakeBrowser({ activated: false });
  const overlays = createOverlayHistory(browser.host);
  const dialog = overlays.open(() => {});
  await settle();
  assert.equal(browser.entries.length, 2);
  dialog.close();
  await settle();
  assert.deepEqual(browser.calls.go, []);
});

test("scroll restoration is manual only while an overlay holds an entry", async () => {
  const browser = fakeBrowser();
  const overlays = createOverlayHistory(browser.host);
  const menu = overlays.open(() => {});
  await settle();
  assert.equal(browser.entries[1].scrollRestoration, "manual", "returning to the page must not move it");
  menu.close();
  await settle();
  assert.equal(browser.entries[1].scrollRestoration, "auto", "the page entry gets its own mode back");
});

test("an entry a navigation already replaced is never traversed again", async () => {
  const browser = fakeBrowser();
  const overlays = createOverlayHistory(browser.host);
  const menu = overlays.open(() => {});
  await settle();
  // Next.js replaced the entry with a new page (no overlay key).
  browser.history.replaceState({ __NA: true, tree: "next" }, "", "https://homegroundchina.com/guides/");
  menu.close();
  await settle();
  assert.deepEqual(browser.calls.go, [], "closing must not undo the navigation");
});

test("the menu, quote dialog, contact card host and Japanese dialog all use the shared helper", async () => {
  const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), "utf8");
  const [header, quote, host, japanese] = await Promise.all([
    read("components/HomegroundHeader.tsx"),
    read("components/TourContactPanel.tsx"),
    read("components/ContactCardHost.tsx"),
    read("components/JapaneseInquiryDialog.tsx"),
  ]);
  for (const [name, source] of [["header", header], ["quote", quote], ["host", host], ["japanese", japanese]]) {
    assert.match(source, /useOverlayHistory\(open, /, `${name} gives its overlay a history entry`);
    assert.doesNotMatch(source, /history\.(?:pushState|back|go)\(/, `${name} leaves history to the shared helper`);
  }
  // Links in the open menu leave the menu's entry before navigating, so a pending navigation is never discarded.
  assert.match(header, /menuHistory\.closeThen\(/);
});
