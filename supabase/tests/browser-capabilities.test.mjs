import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { subscribeMediaQuery, supportsModalDialog, tryOpenModalDialog } from "../../lib/browserCapabilities.ts";
import * as contactCard from "../../lib/contactCard.ts";

test("media subscriptions use the matching modern or legacy removal API", () => {
  for (const modern of [true, false]) {
    const listeners = new Set();
    const calls = [];
    const query = modern ? {
      addEventListener(type, listener) { calls.push(type); listeners.add(listener); },
      removeEventListener(type, listener) { calls.push(type); listeners.delete(listener); },
      addListener() { assert.fail("modern API should be preferred"); },
    } : {
      addListener(listener) { calls.push("legacy-add"); listeners.add(listener); },
      removeListener(listener) { calls.push("legacy-remove"); listeners.delete(listener); },
    };
    let changes = 0;
    const unsubscribe = subscribeMediaQuery(query, () => changes++);
    for (const listener of listeners) listener();
    assert.equal(changes, 1);
    unsubscribe();
    assert.equal(listeners.size, 0);
    assert.deepEqual(calls, modern ? ["change", "change"] : ["legacy-add", "legacy-remove"]);
  }
  assert.doesNotThrow(() => subscribeMediaQuery({}, () => {})());
});

test("dialog capability detection is safe without a document and rejects incomplete implementations", () => {
  const previous = globalThis.document;
  try {
    delete globalThis.document;
    assert.equal(supportsModalDialog(), false);
    assert.equal(supportsModalDialog({ showModal() {}, close() {} }), true);
    assert.equal(supportsModalDialog({ close() {} }), false);
    assert.equal(supportsModalDialog({ showModal() {} }), false);
    globalThis.document = { createElement() { throw new Error("unavailable DOM"); } };
    assert.equal(supportsModalDialog(), false);
  } finally {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document = previous;
  }
});

function loadComponent(path, environment, dependencies) {
  const compiled = ts.transpileModule(readFileSync(new URL(`../../${path}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      assert.ok(name in dependencies, `unexpected dependency: ${name}`);
      const dependency = dependencies[name];
      if (dependency instanceof Error) throw dependency;
      return dependency;
    },
    ...environment,
  });
  return exports;
}

function browserFixture(t, { modal = true, failAt = "", desktop = false, loadFails = false } = {}) {
  const previous = { document: globalThis.document, window: globalThis.window };
  const documentListeners = new Map(), windowListeners = new Map();
  const add = (registry, type, listener) => {
    if (!registry.has(type)) registry.set(type, new Set());
    registry.get(type).add(listener);
  };
  const remove = (registry, type, listener) => registry.get(type)?.delete(listener);
  class Node {
    constructor(tag) {
      this.tagName = tag;
      this.children = [];
      this.attributes = new Map();
      this.listeners = new Map();
      this.style = { overflow: "", setProperty() {} };
    }
    appendChild(child) { this.children.push(child); child.parent = this; return child; }
    append(child) {
      this.appendChild(child);
      if (this.tagName === "body" && failAt === "append") throw new Error("append failed after insertion");
    }
    remove() {
      if (this.parent) this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = null;
    }
    setAttribute(name, value) { this.attributes.set(name, value); }
    addEventListener(type, listener) { add(this.listeners, type, listener); }
    closest() { return null; }
  }
  class Anchor extends Node {
    constructor(href, target = "") {
      super("a"); this.href = new URL(href, "https://homegroundchina.com").href; this.target = target;
    }
    closest(selector) { return selector.startsWith("a[href]") ? this : null; }
    hasAttribute(name) { return this.attributes.has(name); }
  }
  const body = new Node("body");
  body.style.overflow = "clip";
  let showCalls = 0;
  const document = {
    body,
    createElement(tag) {
      const node = new Node(tag);
      if (tag === "dialog" && modal) {
        node.showModal = () => { showCalls++; if (failAt === "showModal" || (failAt === "showModal-after-first" && showCalls > 1)) throw new Error("showModal failed"); node.open = true; };
        node.close = () => { node.open = false; };
      }
      return node;
    },
    querySelector() { return null; },
    addEventListener(type, listener) { add(documentListeners, type, listener); },
    removeEventListener(type, listener) { remove(documentListeners, type, listener); },
  };
  // A WebView with the legacy MediaQueryList API, without EventTarget methods.
  const query = {
    matches: desktop,
    listeners: new Set(),
    addListener(listener) { this.listeners.add(listener); },
    removeListener(listener) { this.listeners.delete(listener); },
  };
  const assigned = [], opened = [], timers = new Map(), frames = new Map();
  let nextTimer = 0, returnTarget = null;
  const window = {
    innerWidth: 390, scrollY: 0,
    location: { origin: "https://homegroundchina.com", pathname: "/zh/", assign(href) { assigned.push(href); } },
    matchMedia() { return query; },
    setTimeout(callback) { timers.set(++nextTimer, callback); return nextTimer; },
    clearTimeout(id) { timers.delete(id); },
    requestAnimationFrame(callback) { frames.set(++nextTimer, callback); return nextTimer; },
    cancelAnimationFrame(id) { frames.delete(id); },
    open(...args) { opened.push(args); },
    addEventListener(type, listener) { add(windowListeners, type, listener); },
    removeEventListener(type, listener) { remove(windowListeners, type, listener); },
  };
  globalThis.document = document;
  globalThis.window = window;
  const states = [], refs = [], effects = [], cleanups = [];
  const react = {
    useState(initial) {
      const index = states.length;
      states.push(typeof initial === "function" ? initial() : initial);
      return [states[index], next => { states[index] = typeof next === "function" ? next(states[index]) : next; }];
    },
    useRef(value) { const reference = { current: value }; refs.push(reference); return reference; },
    useCallback(callback) { return callback; },
    useEffect(effect) { effects.push(effect); },
    useLayoutEffect() {},
    lazy() {},
  };
  const environment = { document, window, Element: Node, HTMLElement: Node, HTMLAnchorElement: Anchor, performance: { now: () => 10 } };
  const capabilities = { subscribeMediaQuery, supportsModalDialog, tryOpenModalDialog };
  const frame = loadComponent("components/ContactCardFrame.ts", environment, {
    "../lib/contactCard": contactCard,
    "../lib/browserCapabilities": capabilities,
    "./ContactCardFrame.module.css": { dialog: "frame-dialog", sheet: "sheet" },
  });
  const jsx = (type, props) => ({ type, props });
  const component = (path) => loadComponent(path, environment, {
    react,
    "react/jsx-runtime": { jsx, jsxs: jsx },
    "../lib/browserCapabilities": capabilities,
    "../lib/contactCard": { ...contactCard, consumeContactCardReturnFocus: () => returnTarget },
    "./ContactCardFrame": frame,
    "./HomegroundHeader.module.css": {},
    "./ContactCardDialog": loadFails ? new Error("contact chunk unavailable") : { ContactCardDialog() {} },
  });
  const mount = (path, name) => {
    const module = component(path);
    module[name]({ locale: "zh" });
    for (const effect of effects.splice(0)) {
      const cleanup = effect();
      if (cleanup) cleanups.push(cleanup);
    }
  };
  t.after(() => {
    for (const cleanup of cleanups.reverse()) cleanup();
    if (previous.document === undefined) delete globalThis.document;
    else globalThis.document = previous.document;
    if (previous.window === undefined) delete globalThis.window;
    else globalThis.window = previous.window;
  });
  const dispatch = (registry, type, event) => { for (const listener of registry.get(type) ?? []) listener(event); };
  return {
    body, states, query, frames, timers, assigned, opened, frame, mount,
    registerCachedDialog() { const dialog = document.createElement("dialog"); refs[2].current = dialog; return dialog; },
    get showCalls() { return showCalls; },
    anchor: (href, target) => new Anchor(href, target),
    click(anchor, modifiers = {}) {
      const event = { target: anchor, button: 0, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...modifiers };
      dispatch(documentListeners, "click", event);
      return event;
    },
    openRequest(anchor) { returnTarget = anchor; dispatch(windowListeners, contactCard.contactCardOpenEvent, { detail: { trigger: "planner" } }); },
  };
}

test("the contact host leaves original planner hrefs and scroll state alone without native dialogs", t => {
  const browser = browserFixture(t, { modal: false, desktop: true });
  browser.mount("components/ContactCardHost.tsx", "ContactCardHost");
  const link = browser.anchor("/zh/?utm_source=facebook#planner-contact");
  assert.equal(browser.click(link).defaultPrevented, false);
  assert.equal(link.href, "https://homegroundchina.com/zh/?utm_source=facebook#planner-contact");
  assert.equal(browser.states[0], false, "programmatic contact-card availability stays false");
  assert.equal(browser.states[3], false);
  assert.equal(browser.body.style.overflow, "clip");
  assert.equal(browser.body.children.length, 0);
  assert.equal(browser.timers.size, 0, "no unusable dialog chunk is preloaded");
});

for (const failAt of ["append", "showModal"]) {
  test(`a frame ${failAt} failure removes its DOM and releases the real scroll hold`, t => {
    const browser = browserFixture(t, { failAt });
    assert.equal(browser.frame.openContactCardFrame("zh", "sheet", () => {}), null);
    assert.equal(browser.body.children.length, 0);
    assert.equal(browser.body.style.overflow, "clip");
    const release = contactCard.holdPageScroll();
    assert.equal(browser.body.style.overflow, "hidden");
    release();
    assert.equal(browser.body.style.overflow, "clip", "failed opens did not leave a hidden hold count");
  });
}

test("a failed frame keeps the click native and does not leave contact state open", t => {
  const browser = browserFixture(t, { failAt: "showModal" });
  browser.mount("components/ContactCardHost.tsx", "ContactCardHost");
  const link = browser.anchor("/zh/#planner-contact");
  assert.equal(browser.click(link).defaultPrevented, false);
  assert.equal(browser.states[1], null);
  assert.equal(browser.states[3], false);
  assert.equal(browser.body.style.overflow, "clip");
  assert.equal(browser.body.children.length, 0);
});

test("programmatic frame failure follows the exact original href, including product and package context", t => {
  const browser = browserFixture(t, { failAt: "showModal", desktop: true });
  browser.mount("components/ContactCardHost.tsx", "ContactCardHost");
  const link = browser.anchor("/zh/tours/zhangjiajie-classic/?tour=zhangjiajie-classic&package=private&travelers=4#planner-contact");
  browser.openRequest(link);
  assert.deepEqual(browser.assigned, [link.href]);
  assert.equal(browser.states[3], false);
  assert.equal(browser.body.style.overflow, "clip");
});

test("a repeated request that fails clears the preceding loading frame and open state", t => {
  const browser = browserFixture(t, { failAt: "showModal-after-first" });
  browser.mount("components/ContactCardHost.tsx", "ContactCardHost");
  const link = browser.anchor("/zh/#planner-contact");
  assert.equal(browser.click(link).defaultPrevented, true);
  assert.equal(browser.states[3], true);
  assert.equal(browser.body.style.overflow, "hidden");
  assert.equal(browser.click(link).defaultPrevented, false);
  assert.equal(browser.states[3], false);
  assert.equal(browser.body.children.length, 0);
  assert.equal(browser.body.style.overflow, "clip");
});

test("a failed contact-code load cleans up and preserves the original new-tab href", async t => {
  const browser = browserFixture(t, { desktop: true, loadFails: true });
  browser.mount("components/ContactCardHost.tsx", "ContactCardHost");
  const link = browser.anchor("/zh/?utm_source=facebook#planner-contact", "_blank");
  assert.equal(browser.click(link).defaultPrevented, true);
  assert.equal(browser.body.style.overflow, "hidden");
  await new Promise(setImmediate);
  assert.equal(browser.states[3], false);
  assert.equal(browser.body.children.length, 0);
  assert.equal(browser.body.style.overflow, "clip");
  assert.deepEqual(browser.opened, [[link.href, "_blank", "noopener,noreferrer"]]);
  assert.deepEqual(browser.assigned, []);
});

test("a cached card whose next opening throws leaves the exact anchor click native", async t => {
  const browser = browserFixture(t, { failAt: "showModal-after-first" });
  browser.mount("components/ContactCardHost.tsx", "ContactCardHost");
  const link = browser.anchor("/zh/?utm_source=facebook#planner-contact");
  assert.equal(browser.click(link).defaultPrevented, true);
  await new Promise(setImmediate);
  browser.registerCachedDialog();
  assert.equal(browser.click(link).defaultPrevented, false);
  assert.equal(browser.states[3], false);
  assert.equal(browser.states[0], false);
  assert.equal(browser.body.style.overflow, "clip");
  assert.equal(browser.body.children.length, 0);
  assert.deepEqual(browser.assigned, [], "the browser can follow its untouched original href");
});

test("supported dialogs still open a phone sheet with legacy media listeners and keep selected-package links native", t => {
  const browser = browserFixture(t);
  browser.mount("components/ContactCardHost.tsx", "ContactCardHost");
  const selected = browser.anchor("/zh/?tour=zhangjiajie-classic&package=private&travelers=4#planner-contact");
  assert.equal(browser.click(selected).defaultPrevented, false);
  assert.equal(browser.showCalls, 0);
  const plain = browser.anchor("/zh/#planner-contact");
  assert.equal(browser.click(plain, { ctrlKey: true }).defaultPrevented, false);
  assert.equal(browser.click(plain).defaultPrevented, true);
  assert.equal(browser.states[2], "sheet");
  assert.equal(browser.states[3], true);
  assert.equal(browser.showCalls, 1);
  assert.equal(browser.body.style.overflow, "hidden");
  browser.query.matches = true;
  for (const listener of browser.query.listeners) listener();
  assert.equal(browser.states[0], true);
});

test("brand folding and the inline scan survive and observe legacy media-query changes", t => {
  const browser = browserFixture(t);
  browser.mount("components/HomegroundWordmark.tsx", "useBrandFold");
  // Run both animation frames that enable the initial motion preference.
  while (browser.frames.size) {
    const callbacks = [...browser.frames.values()];
    browser.frames.clear();
    for (const callback of callbacks) callback();
  }
  assert.equal(browser.states[1], true);
  browser.query.matches = true;
  for (const listener of browser.query.listeners) listener();
  assert.equal(browser.states[1], false, "reduced motion still disables wordmark animation");
  browser.mount("components/ContactCardInlineScan.tsx", "useContactCardDesktop");
  assert.equal(browser.states[2], true);
  browser.query.matches = false;
  for (const listener of browser.query.listeners) listener();
  assert.equal(browser.states[2], false);
});
