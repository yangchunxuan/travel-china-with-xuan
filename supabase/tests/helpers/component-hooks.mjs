import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import ts from "typescript";

/**
 * Execute a component's real handlers/effects with persistent hooks. This is a
 * small deterministic state/event harness, not a DOM or a browser substitute.
 * In particular, tests explicitly dispatch synchronous focus capture events.
 */
export function componentHarness() {
  const slots = [];
  let cursor = 0, dirty = false, tree, renderComponent, props;
  let effects = [], layoutEffects = [];
  const allocate = (initialize) => {
    const index = cursor++;
    if (!(index in slots)) slots[index] = initialize();
    return [slots[index], index];
  };
  const effect = (queue, callback, deps) => {
    const [slot] = allocate(() => ({}));
    if (!slot.deps || !deps || deps.some((value, index) => !Object.is(value, slot.deps[index]))) {
      slot.deps = deps;
      queue.push(() => { slot.cleanup?.(); slot.cleanup = callback(); });
    }
  };
  const hooks = {
    useState(initial) {
      const [slot] = allocate(() => ({ value: typeof initial === "function" ? initial() : initial }));
      return [slot.value, next => {
        const value = typeof next === "function" ? next(slot.value) : next;
        if (!Object.is(value, slot.value)) { slot.value = value; dirty = true; }
      }];
    },
    useRef(initial) { return allocate(() => ({ current: initial }))[0]; },
    useId() { return allocate(() => `test-id-${cursor}`)[0]; },
    useEffect(callback, deps) { effect(effects, callback, deps); },
    useLayoutEffect(callback, deps) { effect(layoutEffects, callback, deps); },
    useMemo(factory, deps) {
      const [slot] = allocate(() => ({}));
      if (!slot.deps || deps.some((value, index) => !Object.is(value, slot.deps[index]))) {
        slot.value = factory(); slot.deps = deps;
      }
      return slot.value;
    },
    useCallback(callback, deps) { return hooks.useMemo(() => callback, deps); },
    useDeferredValue(value) { return value; },
  };
  const harness = {
    hooks,
    get tree() { return tree; },
    onFocus: null,
    render(component = renderComponent, nextProps = props) {
      renderComponent = component; props = nextProps;
      for (let pass = 0; pass < 20; pass++) {
        cursor = 0; dirty = false; effects = []; layoutEffects = [];
        tree = renderComponent(props);
        for (const element of elements(tree)) {
          const ref = element.props?.ref;
          if (typeof element.type !== "string" || !ref || typeof ref !== "object") continue;
          if (!ref.current) ref.current = {
            tagName: element.type.toUpperCase(), open: false,
            style: { removeProperty() {}, setProperty() {} },
            focus() { globalThis.document.activeElement = this; harness.onFocus?.(this); },
            showModal() { this.open = true; }, close() { this.open = false; },
          };
          ref.current.disabled = element.props.disabled;
        }
        for (const run of [...layoutEffects, ...effects]) run();
        if (!dirty) return tree;
      }
      throw new Error("Component did not settle after 20 render passes");
    },
    unmount() { for (const slot of slots) slot?.cleanup?.(); },
  };
  return harness;
}

export function* elements(node) {
  if (Array.isArray(node)) { for (const child of node) yield* elements(child); return; }
  if (!node || typeof node !== "object" || !node.props) return;
  yield node;
  yield* elements(node.props.children);
}

export function textOf(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return node?.props ? textOf(node.props.children) : "";
}

/** Load the actual TSX implementation; only supplied boundaries are replaced. */
export function loadComponent(file, replacements = {}) {
  const cache = new Map();
  function load(path) {
    if (cache.has(path)) return cache.get(path);
    const exports = {};
    cache.set(path, exports);
    const require = createRequire(path);
    const js = ts.transpileModule(readFileSync(path, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    new Function("require", "exports", js)(specifier => {
      if (Object.hasOwn(replacements, specifier)) return replacements[specifier];
      if (specifier.endsWith(".module.css")) return { default: new Proxy({}, { get: (_, key) => String(key) }) };
      if (specifier.startsWith(".")) {
        const base = resolve(dirname(path), specifier);
        const local = [base, `${base}.ts`, `${base}.tsx`].find(candidate => existsSync(candidate));
        if (local && /\.tsx?$/.test(local)) return load(local);
      }
      return require(specifier);
    }, exports);
    return exports;
  }
  return load(file);
}
