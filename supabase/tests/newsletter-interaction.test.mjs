import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import * as position from "../../lib/newsletterPosition.ts";

// Run the complete production hook, including its measurement effect and event
// handlers. The small host below supplies hook scheduling and DOM geometry; it
// does not implement any newsletter gesture or placement decisions.
const hookCode = ts.transpileModule(readFileSync(new URL("../../components/useNewsletterPosition.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function hookHost() {
  const slots = [];
  let cursor = 0;
  let dirty = true;
  let mounted = true;
  let render;
  let current;
  let effects = [];
  const same = (a, b) => a && b && a.length === b.length && a.every((value, index) => Object.is(value, b[index]));
  const react = {
    useState(initial) {
      const index = cursor++;
      slots[index] ??= { value: typeof initial === "function" ? initial() : initial };
      const slot = slots[index];
      slot.set ??= (update) => {
        const next = typeof update === "function" ? update(slot.value) : update;
        if (mounted && !Object.is(next, slot.value)) { slot.value = next; dirty = true; }
      };
      return [slot.value, slot.set];
    },
    useRef(initial) {
      const index = cursor++;
      slots[index] ??= { current: initial };
      return slots[index];
    },
    useCallback(callback, dependencies) {
      const index = cursor++;
      if (!same(slots[index]?.dependencies, dependencies)) slots[index] = { value: callback, dependencies };
      return slots[index].value;
    },
    useLayoutEffect(effect, dependencies) {
      const index = cursor++;
      const previous = slots[index];
      if (!same(previous?.dependencies, dependencies)) {
        const slot = { dependencies, cleanup: previous?.cleanup };
        slots[index] = slot;
        effects.push(() => { slot.cleanup?.(); slot.cleanup = effect(); });
      }
    },
  };
  function flush() {
    let passes = 0;
    while (dirty) {
      assert.ok(++passes < 30, "the hook must settle without a render loop");
      dirty = false;
      cursor = 0;
      current = render();
      const pending = effects;
      effects = [];
      for (const effect of pending) effect();
    }
    return current;
  }
  return {
    react, flush,
    mount(callback) { render = callback; return flush(); },
    rerender() { dirty = true; return flush(); },
    unmount() { mounted = false; for (const slot of slots) slot.cleanup?.(); },
    get current() { return current; },
  };
}

function fixture(t, { minimized = true, parentLeft = 0, parentTop = 0 } = {}) {
  const host = hookHost();
  const storage = new Map();
  const frames = new Map();
  const timers = new Map();
  let taskId = 0;
  let opens = 0;
  let now = 1_000_000;
  const window = Object.assign(new EventTarget(), {
    innerHeight: 844,
    sessionStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    requestAnimationFrame: callback => { const id = ++taskId; frames.set(id, callback); return id; },
    cancelAnimationFrame: id => frames.delete(id),
  });
  const document = Object.assign(new EventTarget(), {
    visibilityState: "visible", documentElement: { clientWidth: 390 }, querySelectorAll: () => [],
  });
  const rect = (left, top, width, height) => ({ left, top, width, height, right: left + width, bottom: top + height });
  const parent = { hidden: false, getBoundingClientRect: () => rect(parentLeft, parentTop, 390, 844) };
  const element = (width, height, prefix) => ({
    parentElement: parent, offsetWidth: width, offsetHeight: height,
    getBoundingClientRect() {
      const style = host.current?.[`${prefix}Style`];
      return rect(parentLeft + parseFloat(style?.[`--${prefix}-x`] ?? 318), parentTop + parseFloat(style?.[`--${prefix}-y`] ?? 772), width, height);
    },
  });
  const launcher = element(56, 56, "launcher");
  const card = element(304, 400, "card");
  const options = { enabled: true, minimized, launcherRef: { current: launcher }, cardRef: { current: card }, onOpen: () => opens++ };
  const observer = class { observe() {} disconnect() {} };
  const exports = {};
  vm.runInNewContext(hookCode, {
    exports, window, document, ResizeObserver: observer, MutationObserver: observer,
    Date: class extends Date { static now() { return now; } },
    getComputedStyle: () => ({ display: "block", visibility: "visible", paddingLeft: "16px", paddingRight: "16px", paddingTop: "16px", paddingBottom: "16px" }),
    setTimeout: callback => { const id = ++taskId; timers.set(id, callback); return id; },
    clearTimeout: id => timers.delete(id),
    require(id) {
      if (id === "react") return host.react;
      if (id === "../lib/newsletterPosition") return position;
      throw new Error(`Unexpected hook dependency: ${id}`);
    },
  }, { filename: "components/useNewsletterPosition.ts" });
  host.mount(() => exports.useNewsletterPosition(options));
  function flush() {
    host.flush();
    for (let pass = 0; frames.size; pass++) {
      assert.ok(pass < 10, "measurement animation frames must settle");
      const pending = [...frames.values()];
      frames.clear();
      for (const callback of pending) callback();
      host.flush();
    }
    return host.current;
  }
  flush();
  t.after(() => { host.unmount(); assert.equal(timers.size, 0); assert.equal(frames.size, 0); });
  const touch = (x, y, identifier = 1) => ({ identifier, clientX: x, clientY: y, pageX: x, pageY: y, target: launcher });
  function event(type, properties = {}, { cancelable = true } = {}) {
    const value = new Event(type, { bubbles: true, cancelable });
    Object.defineProperties(value, { target: { value: launcher }, currentTarget: { value: launcher } });
    Object.assign(value, properties);
    return value;
  }
  function gesture(phase, x = launcher.getBoundingClientRect().left + 22, y = launcher.getBoundingClientRect().top + 18,
    { input = "touch", touches, changedTouches, kind = "launcher", type, cancelable = true, sourceCapabilities } = {}) {
    const names = input === "touch" ? { Start: "touchstart", Drag: "touchmove", Stop: "touchend" } : { Start: "mousedown", Drag: "mousemove", Stop: "mouseup" };
    const properties = input === "touch"
      ? { touches: touches ?? (phase === "Stop" ? [] : [touch(x, y)]), changedTouches: changedTouches ?? [touch(x, y)] }
      : { clientX: x, clientY: y, button: 0, buttons: phase === "Stop" ? 0 : 1, sourceCapabilities };
    const value = event(type ?? names[phase], properties, { cancelable });
    // The native document capture listener runs before DraggableCore's start.
    if (input === "touch" && phase === "Start") document.dispatchEvent(value);
    const result = host.current[`${kind}DragHandlers`][`on${phase}`](value, {
      node: kind === "launcher" ? launcher : card, x: x - parentLeft, y: y - parentTop,
      deltaX: 0, deltaY: 0, lastX: x - parentLeft, lastY: y - parentTop,
    });
    flush();
    return { event: value, result };
  }
  return {
    gesture, touch, event, storage, document, window,
    get current() { return host.current; },
    get opens() { return opens; },
    click(detail = 1, properties = {}) {
      const value = event("click", { detail, ...properties });
      host.current.launcherHandlers.onClick(value);
      flush();
      return value;
    },
    key(key, properties = {}) {
      const value = event("keydown", { key, altKey: false, ctrlKey: false, metaKey: false, ...properties });
      host.current.launcherHandlers.onKeyDown(value);
      flush();
      return value;
    },
    cancel() { document.dispatchEvent(event("touchcancel", { touches: [], changedTouches: [touch(340, 790)] })); flush(); },
    advance(milliseconds) { now += milliseconds; },
    settle() { const pending = [...timers.values()]; timers.clear(); for (const callback of pending) callback(); flush(); },
  };
}

test("pressing the launcher does not begin a drag or hide the planner", t => {
  for (const input of ["touch", "mouse"]) {
    const app = fixture(t);
    app.gesture("Start", 340, 790, { input });
    assert.equal(app.current.dragging, false, `${input} down is still a possible tap`);
    assert.equal(app.current.docking, false);
    assert.equal(app.opens, 0);
  }
});

test("a touch tap opens on touchend without requiring a browser compatibility click", t => {
  const app = fixture(t);
  app.gesture("Start");
  const release = app.gesture("Stop");
  assert.equal(app.opens, 1);
  assert.equal(release.event.defaultPrevented, true);
  assert.equal(app.current.dragging, false);
  const compatibilityClick = app.click();
  assert.equal(app.opens, 1, "the compatibility click must not open a second time");
  assert.equal(compatibilityClick.defaultPrevented, true);
});

test("movement at or below the eight-pixel tap tolerance still opens exactly once", t => {
  for (const [dx, dy] of [[0, 0], [7, 0], [0, 8], [4, 4]]) {
    const app = fixture(t);
    app.gesture("Start");
    app.gesture("Drag", 340 + dx, 790 + dy);
    assert.equal(app.current.dragging, false, `${dx},${dy} is within tap tolerance`);
    app.gesture("Stop", 340 + dx, 790 + dy);
    assert.equal(app.opens, 1);
    app.click();
    assert.equal(app.opens, 1);
  }
});

test("a real drag suppresses opening, docks at release height, and cannot swallow the next tap", t => {
  for (const compatibilityClickAfterDrag of [false, true]) {
    const app = fixture(t);
    app.gesture("Start");
    app.gesture("Drag", 200, 690);
    assert.equal(app.current.dragging, true);
    assert.equal(parseFloat(app.current.launcherStyle["--launcher-y"]), 672);
    app.gesture("Stop", 200, 690);
    assert.equal(app.current.dragging, false);
    assert.equal(app.opens, 0);
    assert.equal(parseFloat(app.current.launcherStyle["--launcher-x"]), 318);
    assert.equal(parseFloat(app.current.launcherStyle["--launcher-y"]), 672);
    const saved = JSON.parse(app.storage.get(position.newsletterPositionStorageKey));
    assert.equal(saved.x, 1, "only an edge position is persisted");
    if (compatibilityClickAfterDrag) {
      assert.equal(app.click().defaultPrevented, true);
      assert.equal(app.opens, 0);
    }
    app.settle();
    app.gesture("Start", 340, 690);
    app.gesture("Stop", 340, 690);
    assert.equal(app.opens, 1, "a fresh tap must reset the previous drag's suppression");
    app.click();
    assert.equal(app.opens, 1);
  }
});

test("crossing the threshold and returning to the start remains a drag", t => {
  const app = fixture(t);
  app.gesture("Start");
  app.gesture("Drag", 331, 790);
  assert.equal(app.current.dragging, true);
  app.gesture("Drag", 340, 790);
  app.gesture("Stop");
  assert.equal(app.opens, 0);
  app.click();
  assert.equal(app.opens, 0);
});

test("touch cancellation never opens and leaves the following tap usable", t => {
  for (const moved of [false, true]) {
    const app = fixture(t);
    app.gesture("Start");
    if (moved) app.gesture("Drag", 200, 690);
    app.cancel();
    app.gesture("Stop");
    assert.equal(app.opens, 0, "a late touchend after cancellation is not a tap");
    assert.equal(app.current.dragging, false);
    app.settle();
    app.gesture("Start");
    app.gesture("Stop");
    assert.equal(app.opens, 1);
  }
});

test("multi-touch cannot activate the launcher at start, during movement, or on release", t => {
  for (const phase of ["Start", "Drag", "Stop"]) {
    const app = fixture(t);
    const fingers = [app.touch(340, 790), app.touch(320, 780, 2)];
    if (phase !== "Start") app.gesture("Start");
    if (phase === "Start") app.gesture("Start", 340, 790, { touches: fingers });
    if (phase === "Drag") {
      // A second finger joining an existing gesture emits touchstart before
      // either finger moves, including when it lands outside the launcher.
      app.document.dispatchEvent(app.event("touchstart", { touches: fingers, changedTouches: [fingers[1]] }));
      app.gesture("Drag", 340, 790, { touches: fingers });
    }
    app.gesture("Stop", 340, 790, phase === "Stop" ? { touches: [fingers[1]] } : {});
    assert.equal(app.opens, 0, `multi-touch detected on ${phase} must not activate`);
    assert.equal(app.current.dragging, false);
    app.gesture("Start");
    app.gesture("Stop");
    assert.equal(app.opens, 1, "multi-touch must not poison the next single-finger tap");
  }
});

test("mouse activation remains click based and keyboard activation bypasses pointer suppression", t => {
  const app = fixture(t);
  app.gesture("Start", 340, 790, { input: "mouse" });
  app.gesture("Stop", 340, 790, { input: "mouse" });
  assert.equal(app.opens, 0);
  assert.equal(app.click().defaultPrevented, false);
  assert.equal(app.opens, 1);
  app.gesture("Start", 340, 790, { input: "mouse" });
  app.gesture("Drag", 200, 690, { input: "mouse" });
  app.gesture("Stop", 200, 690, { input: "mouse" });
  assert.equal(app.opens, 1);
  // Native button Enter/Space activation produces a click with detail === 0.
  assert.equal(app.click(0).defaultPrevented, false);
  assert.equal(app.opens, 2);
  assert.equal(app.click().defaultPrevented, true);
  assert.equal(app.opens, 2);
});

test("keyboard arrows still reposition the launcher without opening it", t => {
  const app = fixture(t);
  assert.equal(app.key("ArrowLeft").defaultPrevented, true);
  assert.equal(app.current.side, "left");
  assert.equal(parseFloat(app.current.launcherStyle["--launcher-x"]), 16);
  assert.equal(app.key("ArrowUp").defaultPrevented, true);
  assert.equal(parseFloat(app.current.launcherStyle["--launcher-y"]), 740);
  assert.equal(app.opens, 0);
  assert.equal(app.key("Home").defaultPrevented, true);
  assert.equal(app.current.side, "right");
  assert.equal(parseFloat(app.current.launcherStyle["--launcher-y"]), 772);
});

test("the complete compatibility mouse sequence cannot repeat a touch activation", t => {
  for (const sourceCapabilities of [undefined, { firesTouchEvents: true }]) {
    const app = fixture(t);
    app.gesture("Start");
    app.gesture("Stop");
    assert.equal(app.opens, 1);
    const compatibility = { input: "mouse", sourceCapabilities };
    assert.equal(app.gesture("Start", undefined, undefined, compatibility).result, false);
    app.gesture("Stop", undefined, undefined, compatibility);
    assert.equal(app.click(1, { sourceCapabilities }).defaultPrevented, true);
    assert.equal(app.opens, 1);
  }
});

test("noncancelable touch release and cancellation cannot open through compatibility mouse events", t => {
  for (const cancelled of [false, true]) {
    const app = fixture(t);
    app.gesture("Start");
    app.gesture("Drag", 200, 690);
    if (cancelled) app.cancel();
    else {
      const release = app.gesture("Stop", 200, 690, { cancelable: false });
      assert.equal(release.event.defaultPrevented, false);
    }
    assert.equal(app.gesture("Start", undefined, undefined, { input: "mouse" }).result, false);
    app.gesture("Stop", undefined, undefined, { input: "mouse" });
    app.click();
    assert.equal(app.opens, 0);
    app.gesture("Start");
    app.gesture("Stop");
    assert.equal(app.opens, 1, "the next single-finger tap must still work");
  }
});

test("releasing outside the button cancels a tap even within the movement tolerance", t => {
  const app = fixture(t);
  app.gesture("Start", 319, 790);
  app.gesture("Stop", 313, 790);
  assert.equal(app.opens, 0);
  assert.equal(app.current.dragging, false);
  app.click();
  assert.equal(app.opens, 0);
});

test("touch release hit testing uses viewport coordinates when the offset parent is displaced", t => {
  const app = fixture(t, { parentLeft: 40, parentTop: 72 });
  app.gesture("Start", 340, 790);
  app.gesture("Stop", 340, 790);
  assert.equal(app.opens, 1);
});

test("a fresh real mouse and keyboard remain usable during compatibility suppression", t => {
  const app = fixture(t);
  app.gesture("Start");
  app.gesture("Stop");
  assert.equal(app.opens, 1);
  assert.equal(app.click(0).defaultPrevented, false);
  assert.equal(app.opens, 2);
  const mouse = { input: "mouse", sourceCapabilities: { firesTouchEvents: false } };
  assert.notEqual(app.gesture("Start", undefined, undefined, mouse).result, false);
  app.gesture("Stop", undefined, undefined, mouse);
  assert.equal(app.click(1, { sourceCapabilities: mouse.sourceCapabilities }).defaultPrevented, false);
  assert.equal(app.opens, 3);
  app.advance(751);
  assert.notEqual(app.gesture("Start", undefined, undefined, { input: "mouse" }).result, false);
  app.gesture("Stop", undefined, undefined, { input: "mouse" });
  assert.equal(app.click().defaultPrevented, false);
  assert.equal(app.opens, 4, "mouse devices without source metadata resume after the fallback window");
});
