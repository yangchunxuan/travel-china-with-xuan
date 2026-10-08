import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import * as capabilities from "../../lib/browserCapabilities.ts";
import * as inquiry from "../../lib/privateTourInquiryContext.ts";
import * as tourContact from "../../lib/tourContact.ts";
import * as japaneseContact from "../../lib/japaneseContactFlow.ts";
import * as tourDate from "../../lib/tourDate.ts";
import * as draft from "../../lib/tourContactDraft.ts";
import * as contactCard from "../../lib/contactCard.ts";
import { getHomepagePlanningDeskCopy } from "../../lib/homepagePlanningDesk.ts";

const slug = "beijing-highlights-5-day-private-tour";
const selection = { packageId: "no-guide", travelers: 4 };
const productPath = locale => `${locale === "en" ? "" : `/${locale}`}/tours/${slug}/`;
const flatten = node => !node || typeof node !== "object" ? [] : [node, ...[node.props?.children].flat(Infinity).flatMap(flatten)];

/** Execute the real components, including effect cleanup between state changes. */
function fixture(t, { path = productPath("zh"), modal = true, showFails = false } = {}) {
  const previous = Object.fromEntries(["window", "document", "HTMLElement", "CustomEvent"].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const listeners = new Map(), timers = new Map(), inquiryStates = [];
  let tree, component, props, hookIndex = 0, dirty = false, showCalls = 0;
  const hooks = [], pending = [];
  class Node {
    constructor(tag) { this.tagName = tag; this.open = false; this.hidden = false; this.isConnected = true; this.focusCount = 0; this.style = { setProperty() {}, removeProperty() {} }; }
    focus() { this.focusCount++; document.activeElement = this; }
    getClientRects() { return [{}]; }
    setCustomValidity(message) { this.validityMessage = message; }
    removeAttribute(name) { if (name === "open") this.open = false; }
    querySelector(selector) { return selector === "h2" ? heading : null; }
  }
  const heading = new Node("h2");
  const trigger = new Node("a");
  class ContactEvent {
    constructor(type, options = {}) { this.type = type; this.detail = options.detail; this.cancelable = options.cancelable; this.defaultPrevented = false; }
    preventDefault() { if (this.cancelable) this.defaultPrevented = true; }
  }
  const document = {
    body: { style: { overflow: "clip" } }, activeElement: trigger,
    createElement(tag) {
      const node = new Node(tag);
      if (tag === "dialog" && modal) {
        node.showModal = () => {
          showCalls++;
          if (showFails) throw new Error("WebView rejected modal");
          node.open = true;
        };
        node.close = () => { node.open = false; };
      }
      return node;
    },
    querySelector(selector) {
      if (selector === '[data-homeground-contact-ready="true"]') return flatten(tree).find(node => node.props?.["data-homeground-contact-ready"] === "true") || null;
      if (selector === "main h1") return { textContent: "Current guide" };
      return null;
    },
  };
  let nextTimer = 0;
  const window = {
    location: new URL(path, "https://homegroundchina.com"),
    addEventListener(type, listener) { if (!listeners.has(type)) listeners.set(type, new Set()); listeners.get(type).add(listener); },
    removeEventListener(type, listener) { listeners.get(type)?.delete(listener); },
    dispatchEvent(event) { for (const listener of listeners.get(event.type) ?? []) listener(event); return !event.defaultPrevented; },
    matchMedia() { return { matches: false }; },
    setTimeout(callback) { timers.set(++nextTimer, callback); return nextTimer; },
    clearTimeout(id) { timers.delete(id); },
    setInterval() { return 1; }, clearInterval() {},
  };
  for (const [key, value] of Object.entries({ window, document, HTMLElement: Node, CustomEvent: ContactEvent })) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  const react = {
    useState(initial) {
      const index = hookIndex++;
      if (!(index in hooks)) hooks[index] = { value: typeof initial === "function" ? initial() : initial };
      return [hooks[index].value, next => {
        const value = typeof next === "function" ? next(hooks[index].value) : next;
        if (!Object.is(value, hooks[index].value)) { hooks[index].value = value; dirty = true; }
      }];
    },
    useRef(initial) { const index = hookIndex++; return hooks[index] ??= { current: initial }; },
    useId() { return "compatibility-field"; },
    useSyncExternalStore(_subscribe, getSnapshot) { return getSnapshot(); },
    useEffect(effect, deps) {
      const index = hookIndex++;
      if (!hooks[index] || !deps || deps.some((value, i) => !Object.is(value, hooks[index].deps?.[i]))) pending.push(() => {
        hooks[index]?.cleanup?.();
        hooks[index] = { deps, cleanup: effect() };
      });
    },
  };
  react.useLayoutEffect = react.useEffect;
  const jsx = (type, properties) => {
    if (typeof type === "string" && properties.ref) {
      properties.ref.current ??= type === "h2" ? heading : document.createElement(type);
      if ("hidden" in properties) properties.ref.current.hidden = properties.hidden;
    }
    return { type, props: properties };
  };
  const overlay = {
    getNavigationMenuOpen: () => false, getPrivacyManagerOpen: () => false, getServerPrivacyManagerOpen: () => false,
    getNewsletterExpanded: () => false, getConsentBannerPending: () => false, getServerConsentBannerPending: () => false,
    getNewsletterDockSide: () => "right", getServerNewsletterDockSide: () => "right",
    setInquiryOpen(value) { inquiryStates.push(value); },
  };
  const cardCopyExports = {};
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../../lib/contactCardCopy.ts", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, { exports: cardCopyExports, require: () => contactCard });
  const dependencies = {
    react, "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "fragment" },
    "next/navigation": { usePathname: () => window.location.pathname }, "lucide-react": {},
    "../lib/browserCapabilities": capabilities, "../lib/privateTourInquiryContext": inquiry,
    "../lib/tourContact": tourContact, "../lib/japaneseContactFlow": japaneseContact,
    "../lib/tourDate": tourDate, "../lib/tourContactDraft": draft, "../lib/siteOverlayState": overlay,
    "../lib/homegroundBusiness": { homegroundBusiness: { serviceEmail: "test@example.invalid" } },
    "../lib/homegroundSocial": { homegroundMessengerUrl: () => "https://example.invalid/messenger" },
    "../lib/analytics": { trackEvent() {} }, "../lib/inquiryTrafficConsent": {}, "../lib/inquiryVersions": {},
    "../lib/newsletterPrompt": { markNewsletterPromptHandled() {} }, "../lib/contactCard": { ...contactCard, openContactCard: () => false },
    "../lib/contactCardCopy": cardCopyExports, "../lib/homepagePlanningDesk": { getHomepagePlanningDeskCopy },
    "../lib/japaneseSite": { japaneseGeneralContactHrefs: () => ({ email: "mailto:test@example.invalid", whatsapp: "https://example.invalid/whatsapp" }) },
    "../lib/japaneseInquiryReceiptCopy": {}, "../lib/inquiryReceipt": {},
    "./TourDateField": {}, "./KakaoTalkContact": {}, "./InquiryReceipt": {}, "./EmailTypoHint": {}, "./ContactCardScan": {},
    "./TourCalendar": { default() {} },
    "./TourContactPanel.module.css": {}, "./TourDateField.module.css": {}, "./ContactCard.module.css": {}, "./ContactSheet.module.css": {},
  };
  const environment = {
    window, document, HTMLElement: Node, CustomEvent: ContactEvent, URL, URLSearchParams,
    process: { env: {} }, setTimeout: window.setTimeout, clearTimeout: window.clearTimeout,
    requestAnimationFrame: callback => callback(), getComputedStyle: () => ({ visibility: "visible" }),
    performance: { now: () => 10 },
  };
  function render() {
    hookIndex = 0; dirty = false;
    tree = component(props);
    for (const effect of pending.splice(0)) effect();
  }
  function flush() {
    for (let i = 0; dirty && i < 15; i++) render();
    assert.equal(dirty, false, "effects must settle");
  }
  t.after(() => {
    for (const hook of hooks) hook?.cleanup?.();
    for (const [key, descriptor] of Object.entries(previous)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key];
    }
  });
  return {
    document, window, trigger, heading, inquiryStates,
    get showCalls() { return showCalls; },
    mount(path, name, initialProps = {}) {
      const compiled = ts.transpileModule(readFileSync(new URL(`../../${path}`, import.meta.url), "utf8"), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
      }).outputText;
      const exports = {};
      vm.runInNewContext(compiled, { ...environment, exports, require(name) { assert.ok(name in dependencies, `unexpected dependency ${name}`); return dependencies[name]; } });
      component = exports[name]; props = initialProps; render(); flush();
    },
    flush,
    updateProps(updates) { props = { ...props, ...updates }; dirty = true; },
    rejectModal() { showFails = true; },
    find(type, predicate = () => true) { return flatten(tree).find(node => node.type === type && predicate(node.props)); },
    nodes(type) { return flatten(tree).filter(node => node.type === type); },
    runTimers() { for (const [id, callback] of [...timers]) { timers.delete(id); callback(); } flush(); },
    click() { return { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, currentTarget: trigger, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } }; },
  };
}

test("modal opening catches partial failures, closes them and does not reopen an existing modal", () => {
  const dialog = { open: false, close() { this.open = false; }, showModal() { this.open = true; throw new Error("partial open"); } };
  assert.equal(capabilities.tryOpenModalDialog(dialog), false);
  assert.equal(dialog.open, false);
  assert.equal(capabilities.tryOpenModalDialog({}), false);
  dialog.open = true; dialog.showModal = () => assert.fail("already open dialog must not be opened twice");
  assert.equal(capabilities.tryOpenModalDialog(dialog), true);
  dialog.close = () => { throw new Error("close failed"); };
  dialog.removeAttribute = name => { assert.equal(name, "open"); dialog.open = false; };
  assert.doesNotThrow(() => capabilities.closeModalDialog(dialog));
  assert.equal(dialog.open, false);
});

for (const locale of ["en", "zh", "ko"]) {
  test(`${locale} product inquiry claims a click only after opening, preserves selection and restores scroll/focus`, t => {
    const browser = fixture(t, { path: productPath(locale) });
    browser.mount("components/TourContactPanel.tsx", "TourContactPanel", { locale });
    const href = inquiry.buildPrivateTourInquiryHref(`${locale === "en" ? "" : `/${locale}`}/`, slug, "private_tour_product", selection);
    for (const modifiers of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
      const modified = { ...browser.click(), ...modifiers };
      assert.equal(tourContact.openTourContactFromLink(modified, href, locale), false);
      assert.equal(modified.defaultPrevented, false);
    }
    assert.equal(browser.showCalls, 0);
    const event = browser.click();
    assert.equal(tourContact.openTourContactFromLink(event, href, locale), true);
    assert.equal(event.defaultPrevented, true);
    assert.equal(browser.showCalls, 1, "opening is synchronous before link cancellation");
    browser.flush();
    assert.equal(browser.showCalls, 1, "the effect does not reopen the native dialog");
    const dialog = browser.find("dialog");
    assert.equal(dialog.props.hidden, false);
    assert.equal(dialog.props.ref.current.open, true);
    assert.equal(browser.document.body.style.overflow, "hidden");
    const whatsapp = browser.nodes("a").find(node => node.props.href?.startsWith("https://wa.me/"));
    const message = new URL(whatsapp.props.href).searchParams.get("text");
    assert.ok(message.includes(inquiry.privateTourInquirySelectionLabel(inquiry.getPrivateTourInquiryContext(slug, locale, selection), locale)));
    dialog.props.onCancel({ preventDefault() {} }); browser.flush(); browser.runTimers();
    assert.equal(browser.find("dialog").props.hidden, true);
    assert.equal(dialog.props.ref.current.open, false);
    assert.equal(browser.document.body.style.overflow, "clip");
    assert.equal(browser.trigger.focusCount, 1);
    assert.equal(browser.inquiryStates.at(-1), false);
  });
}

for (const options of [{ modal: false }, { showFails: true }]) {
  test(`tour dialogs preserve original links when ${options.modal === false ? "unsupported" : "opening throws"}`, t => {
    const browser = fixture(t, options);
    browser.mount("components/TourContactPanel.tsx", "TourContactPanel", { locale: "zh" });
    const event = browser.click();
    const href = inquiry.buildPrivateTourInquiryHref("/zh/", slug, "private_tour_product", selection);
    assert.equal(tourContact.openTourContactFromLink(event, href, "zh"), false);
    browser.flush();
    assert.equal(event.defaultPrevented, false);
    assert.equal(browser.find("dialog").props.hidden, true);
    assert.equal(browser.document.body.style.overflow, "clip");
    assert.equal(browser.find("div", props => props["data-homeground-contact-ready"] === "true"), undefined);
  });
}

for (const showFails of [true, false]) {
  test(`guide consultation ${showFails ? "leaves its original link after opening fails" : "opens on the article and restores its trigger"}`, t => {
    const path = "/zh/guides/china-travel-guide/";
    const browser = fixture(t, { path, showFails });
    browser.mount("components/TourContactPanel.tsx", "TourContactPanel", { locale: "zh" });
    const event = browser.click();
    assert.equal(tourContact.openGuideContactFromLink(event, "/zh/?utm_source=facebook#planner-contact", "zh"), !showFails);
    browser.flush();
    assert.equal(event.defaultPrevented, !showFails);
    assert.equal(browser.window.location.pathname, path);
    assert.equal(browser.showCalls, 1);
    if (!showFails) {
      const mail = browser.nodes("a").find(node => node.props.href?.startsWith("mailto:"));
      assert.ok(new URL(mail.props.href).searchParams.get("body").includes(`https://homegroundchina.com${path}`));
      browser.find("dialog").props.onCancel({ preventDefault() {} }); browser.flush(); browser.runTimers();
      assert.equal(browser.trigger.focusCount, 1);
    }
    assert.equal(browser.document.body.style.overflow, "clip");
  });
}

test("an unsupported calendar keeps manual date entry and omits the unusable calendar button", t => {
  const browser = fixture(t, { modal: false });
  const emitted = [];
  browser.mount("components/TourDateField.tsx", "TourDateField", { id: "date", label: "日期", locale: "zh", value: "", active: true, disabled: false, onChange: value => emitted.push(value) });
  assert.equal(browser.find("button", props => props["aria-haspopup"] === "dialog"), undefined);
  assert.equal(browser.find("dialog").props.hidden, true);
  const input = browser.find("input");
  input.props.ref.current.value = "20261009";
  input.props.onChange({ target: input.props.ref.current }); browser.flush();
  assert.deepEqual(emitted, ["2026-10-09"]);
  assert.equal(browser.find("input").props.value, "20261009");
  assert.equal(input.props.ref.current.validityMessage, "");
});

for (const showFails of [true, false]) {
  test(`calendar ${showFails ? "failure returns to editable input" : "opens once and closes cleanly"}`, t => {
    const browser = fixture(t, { showFails });
    browser.mount("components/TourDateField.tsx", "TourDateField", { id: "date", label: "Date", locale: "en", value: "", active: true, disabled: false, onChange() {} });
    browser.find("button", props => props["aria-haspopup"] === "dialog").props.onClick(); browser.flush();
    assert.equal(browser.showCalls, 1);
    assert.equal(browser.find("dialog").props.hidden, showFails);
    if (showFails) assert.equal(browser.find("button", props => props["aria-haspopup"] === "dialog"), undefined);
    else { browser.find("dialog").props.onCancel({ preventDefault() {}, stopPropagation() {} }); browser.flush(); }
    assert.equal(browser.find("input").props.ref.current.focusCount, 1);
    assert.equal(browser.find("dialog").props.ref.current.open, false);
    assert.equal(browser.document.body.style.overflow, "clip");
  });
}

for (const options of [{ modal: false }, { showFails: true }, {}]) {
  test(`Japanese inquiry ${options.modal === false ? "is unavailable without native dialogs" : options.showFails ? "keeps its link after an opening error" : "preserves selection and restores focus on close"}`, t => {
    const browser = fixture(t, { path: productPath("ja"), ...options });
    assert.equal(japaneseContact.openJapaneseContact({ slug, selection }), false, "before effects are ready, fallback remains available");
    browser.mount("components/JapaneseInquiryDialog.tsx", "JapaneseInquiryDialog");
    const opened = japaneseContact.openJapaneseContact({ slug, selection }); browser.flush();
    const success = options.modal !== false && !options.showFails;
    assert.equal(opened, success);
    assert.equal(browser.find("dialog").props.hidden, !success);
    assert.equal(browser.showCalls, options.modal === false ? 0 : 1);
    assert.equal(browser.document.body.style.overflow, "clip");
    if (success) {
      const link = browser.nodes("a").find(node => node.props.href?.startsWith("https://wa.me/"));
      const message = new URL(link.props.href).searchParams.get("text");
      assert.ok(message.includes(inquiry.privateTourInquirySelectionLabel(inquiry.getPrivateTourInquiryContext(slug, "ja", selection), "ja")));
      browser.find("dialog").props.onCancel({ preventDefault() {} }); browser.flush();
      assert.equal(browser.trigger.focusCount, 1);
      assert.equal(browser.find("dialog").props.ref.current.open, false);
      assert.equal(browser.inquiryStates.at(-1), false);
    } else assert.equal(japaneseContact.japaneseContactReady(), false);
  });
}

test("Japanese requests need a ready receiver and preserve matching product and package context", t => {
  const browser = fixture(t, { path: productPath("ja") });
  japaneseContact.setJapaneseContactReady(true);
  assert.equal(japaneseContact.openJapaneseContact({ slug, selection }), false, "a ready flag alone cannot consume a link");
  const received = [];
  browser.window.addEventListener(japaneseContact.japaneseContactOpenEvent, event => { received.push(event.detail); event.preventDefault(); });
  assert.equal(japaneseContact.openJapaneseContact({ slug: "other-tour", selection }), false);
  assert.equal(japaneseContact.openJapaneseContact({ slug, selection }), true);
  assert.deepEqual(received, [{ slug, selection }]);
});

for (const options of [{ modal: false }, { showFails: true }]) {
  test(`a contact card ${options.modal === false ? "without dialog support" : "whose modal throws"} reports failure and never holds page scrolling`, t => {
    const browser = fixture(t, options);
    let failures = 0;
    browser.mount("components/ContactCardDialog.tsx", "ContactCardDialog", {
      locale: "zh", request: { trigger: "planner" }, layout: "sheet", open: true,
      onClose() {}, onOpenError() { failures++; browser.updateProps({ open: false }); },
    });
    assert.equal(failures, 1);
    assert.equal(browser.document.body.style.overflow, "clip");
    assert.equal(browser.find("dialog").props.hidden, true);
    assert.equal(browser.find("dialog").props.ref.current.open, false);
    assert.equal(browser.inquiryStates.includes(true), false);
  });
}

test("a cached contact card can open repeatedly, and a later rejection releases its actual scroll hold", t => {
  const browser = fixture(t);
  const nativeDialogRef = { current: null };
  let failures = 0;
  browser.mount("components/ContactCardDialog.tsx", "ContactCardDialog", {
    locale: "zh", request: { trigger: "planner" }, layout: "sheet", open: true, nativeDialogRef,
    onClose() {}, onOpenError() { failures++; browser.updateProps({ open: false }); },
  });
  assert.equal(nativeDialogRef.current.open, true);
  assert.equal(browser.showCalls, 1);
  assert.equal(browser.document.body.style.overflow, "hidden");
  browser.updateProps({ open: false }); browser.flush();
  assert.equal(nativeDialogRef.current.open, false);
  assert.equal(browser.document.body.style.overflow, "clip");
  // The host opens this same cached native node before cancelling a link.
  assert.equal(capabilities.tryOpenModalDialog(nativeDialogRef.current), true);
  browser.updateProps({ open: true }); browser.flush();
  assert.equal(browser.showCalls, 2, "the layout effect observes the already-open cached modal");
  assert.equal(browser.document.body.style.overflow, "hidden");
  nativeDialogRef.current.close(); browser.rejectModal();
  browser.updateProps({ request: { trigger: "email" } }); browser.flush();
  assert.equal(failures, 1);
  assert.equal(browser.find("dialog").props.hidden, true);
  assert.equal(browser.document.body.style.overflow, "clip");
  const release = contactCard.holdPageScroll(); release();
  assert.equal(browser.document.body.style.overflow, "clip", "no hidden hold remains after the failure");
});
