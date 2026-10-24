import { useEffect, useMemo, useRef } from "react";

/**
 * Back closes an open overlay instead of leaving the page (mobile audit F04).
 *
 * Opening an overlay (the phone menu, a tour quote dialog, the contact card or
 * sheet, the Japanese enquiry dialog) adds one history entry with the same
 * URL. Back (popstate) closes the overlay and the page stays. Closing it any
 * other way (✕, Esc, the backdrop, a Done button) takes that entry off again,
 * so the next Back leaves the page exactly as before. The entry never changes
 * the URL, so #planner-contact, ?tour= and every other deep link behave as
 * they always did.
 *
 * How the stack stays clean:
 * - Opens and closes are reconciled one task later. An overlay that closes
 *   while another opens in the same moment (the menu's planner link opening
 *   the quote dialog or the contact sheet) hands its entry over instead of
 *   going back and adding a new one.
 * - A link chosen inside an overlay must not race the overlay's own Back:
 *   Next.js discards a pending navigation when a history traversal arrives.
 *   `closeThen` therefore leaves the entry first and runs the navigation once
 *   the page's own entry is current again.
 * - An overlay opened without any user gesture on the page (a deep link that
 *   opens a dialog on load) adds no entry: browsers may skip such entries on
 *   Back, which would make Back leave the page anyway.
 * - Scroll restoration is manual while an overlay owns an entry. The page
 *   under an overlay never scrolls, so returning to the page's entry must not
 *   move it, and a jump a link made (#faq) must not be undone.
 */
export const overlayHistoryStateKey = "homegroundOverlay";

/** A traversal we started whose popstate never arrived is given up after this long. */
export const overlayHistoryTraversalTimeoutMs = 1_000;

type HistoryState = Record<string, unknown> | null | undefined;

export interface OverlayHistoryHost {
  history: {
    readonly state: unknown;
    pushState(data: unknown, unused: string, url?: string | URL | null): void;
    go(delta?: number): void;
    scrollRestoration?: "auto" | "manual";
  };
  addEventListener(type: "popstate", listener: (event: { state: unknown }) => void): void;
  setTimeout(callback: () => void, milliseconds: number): unknown;
  clearTimeout(handle: unknown): void;
  /** False when the page has had no user gesture yet (navigator.userActivation.hasBeenActive). */
  hasUserActivation?: () => boolean;
}

export interface OverlayHistoryEntry {
  /** True while this overlay owns the history entry the page is on. */
  readonly current: boolean;
  /**
   * The overlay closed by itself (✕, Esc, backdrop): its entry comes off the
   * stack. `then` runs once the page's own entry is current again, so a link
   * chosen inside the overlay can navigate without racing that traversal.
   */
  close(then?: () => void): void;
}

/**
 * Called when Back reaches the entry below an open overlay. Return `false`
 * to keep the overlay open (for example while it is still sending); it then
 * gets a new entry, so the next Back asks it again.
 */
export type OverlayBackHandler = () => boolean | void;

interface Layer {
  token: string | null;
  onBack: OverlayBackHandler;
  closed: boolean;
  /** Opened without a user gesture, or the browser refused the entry: Back works as it did before. */
  withoutHistory: boolean;
}

function stateObject(state: unknown): Record<string, unknown> {
  return state && typeof state === "object" ? { ...(state as Record<string, unknown>) } : {};
}

function tokenOf(state: unknown): string | null {
  const value = state && typeof state === "object" ? (state as Record<string, unknown>)[overlayHistoryStateKey] : null;
  return typeof value === "string" ? value : null;
}

export function createOverlayHistory(host: OverlayHistoryHost) {
  const layers: Layer[] = [];
  /** Our entries, oldest first. The last one is the entry the page is on. */
  const owned: string[] = [];
  /** `closeThen` callbacks waiting for the stack to settle. */
  const settled: Array<() => void> = [];
  let sequence = 0;
  let scheduled: unknown = null;
  /** Traversals we started whose popstate is still due. */
  let traversing = 0;
  let traversalTimer: unknown = null;
  let restoration: "auto" | "manual" | null = null;
  let listening = false;

  const currentToken = () => {
    try { return tokenOf(host.history.state); } catch { return null; }
  };

  const holdScroll = () => {
    if (restoration !== null) return;
    try {
      restoration = host.history.scrollRestoration ?? null;
      if (restoration !== null) host.history.scrollRestoration = "manual";
    } catch { restoration = null; }
  };

  const releaseScroll = () => {
    if (restoration === null) return;
    try { host.history.scrollRestoration = restoration; } catch { /* The page keeps working. */ }
    restoration = null;
  };

  const runSettled = () => {
    for (const callback of settled.splice(0)) {
      try { callback(); } catch (error) { host.setTimeout(() => { throw error; }, 0); }
    }
  };

  const schedule = () => {
    if (scheduled !== null) return;
    scheduled = host.setTimeout(() => {
      scheduled = null;
      reconcile();
    }, 0);
  };

  function finishTraversal() {
    traversing = 0;
    if (traversalTimer !== null) host.clearTimeout(traversalTimer);
    traversalTimer = null;
    reconcile();
  }

  function reconcile() {
    if (traversing > 0) return;
    // The page moved on (a navigation, or a script replaced the entry): our
    // entries are no longer the ones under the page, so stop tracking them.
    if (owned.length && currentToken() !== owned[owned.length - 1]) {
      owned.length = 0;
      for (const layer of layers) layer.token = null;
    }
    const open = layers.filter((layer) => !layer.closed && !layer.withoutHistory);
    let paired = 0;
    while (paired < owned.length && paired < open.length && open[paired].token === owned[paired]) paired++;
    const waiting = open.slice(paired);
    for (const layer of waiting) layer.token = null;
    let surplus = owned.length - paired;
    // An overlay closed while another opened: the new one takes the entry the page is on.
    if (surplus === 1 && waiting.length > 0) {
      waiting[0].token = owned[paired];
      waiting.shift();
      surplus = 0;
    }
    if (surplus > 0) {
      owned.length = paired;
      traversing = 1;
      traversalTimer = host.setTimeout(finishTraversal, overlayHistoryTraversalTimeoutMs);
      try {
        host.history.go(-surplus);
      } catch {
        finishTraversal();
      }
      // Overlays still waiting get their entries once the page's entry is back.
      return;
    }
    for (const layer of waiting) {
      if (host.hasUserActivation && !host.hasUserActivation()) {
        layer.withoutHistory = true;
        continue;
      }
      const token = `overlay-${Date.now().toString(36)}-${(++sequence).toString(36)}`;
      if (owned.length === 0) holdScroll();
      try {
        // No URL: the address, its hash and its query stay exactly as they are.
        host.history.pushState({ ...stateObject(host.history.state), [overlayHistoryStateKey]: token }, "");
        owned.push(token);
        layer.token = token;
      } catch {
        layer.withoutHistory = true;
      }
    }
    if (owned.length === 0) releaseScroll();
    runSettled();
  }

  function onPopState(event: { state: unknown }) {
    if (traversing > 0) {
      // Our own traversal back over closed overlays has landed.
      finishTraversal();
      return;
    }
    // The visitor pressed Back (or Forward). Entries above the one the page
    // is on now are forward history: their overlays close, newest first.
    const index = owned.indexOf(tokenOf(event.state) ?? "");
    owned.length = index + 1;
    for (let position = layers.length - 1; position >= 0; position--) {
      const layer = layers[position];
      if (layer.closed || layer.withoutHistory || !layer.token || owned.includes(layer.token)) continue;
      layer.token = null;
      let keepOpen = false;
      try { keepOpen = layer.onBack() === false; } catch { keepOpen = false; }
      if (!keepOpen) {
        layer.closed = true;
        layers.splice(position, 1);
      }
    }
    if (owned.length === 0) releaseScroll();
    schedule();
  }

  function open(onBack: OverlayBackHandler): OverlayHistoryEntry {
    if (!listening) {
      listening = true;
      host.addEventListener("popstate", onPopState);
    }
    const layer: Layer = { token: null, onBack, closed: false, withoutHistory: false };
    layers.push(layer);
    schedule();
    return {
      get current() {
        return !layer.closed && layer.token !== null && traversing === 0 &&
          owned[owned.length - 1] === layer.token && currentToken() === layer.token;
      },
      close(then?: () => void) {
        if (then) settled.push(then);
        if (!layer.closed) {
          layer.closed = true;
          const position = layers.indexOf(layer);
          if (position >= 0) layers.splice(position, 1);
        }
        schedule();
      },
    };
  }

  return {
    open,
    /** Test and diagnostics view: how many entries the overlays hold now. */
    get entries() { return owned.length; },
  };
}

type OverlayHistory = ReturnType<typeof createOverlayHistory>;
let shared: OverlayHistory | null = null;

/** The page's one overlay history, or null outside a browser. */
export function getOverlayHistory(): OverlayHistory | null {
  if (typeof window === "undefined" || !window.history || typeof window.addEventListener !== "function") return null;
  shared ??= createOverlayHistory({
    history: window.history,
    addEventListener: (type, listener) => window.addEventListener(type, listener),
    setTimeout: (callback, milliseconds) => window.setTimeout(callback, milliseconds),
    clearTimeout: (handle) => window.clearTimeout(handle as number),
    hasUserActivation: () => {
      const activation = (typeof navigator === "undefined" ? undefined : navigator) as (Navigator & { userActivation?: { hasBeenActive: boolean } }) | undefined;
      return activation?.userActivation ? activation.userActivation.hasBeenActive : true;
    },
  });
  return shared;
}

export interface OverlayHistoryControl {
  /** True while the overlay owns the history entry the page is on. */
  readonly current: boolean;
  /** Take the overlay's entry off the stack, then run `then` (or run it at once without an entry). */
  closeThen(then: () => void): void;
}

/**
 * Gives an overlay its own history entry while `open` is true. Back calls
 * `onBack`; closing the overlay any other way removes the entry again.
 */
export function useOverlayHistory(open: boolean, onBack: OverlayBackHandler): OverlayHistoryControl {
  const onBackRef = useRef(onBack);
  const entryRef = useRef<OverlayHistoryEntry | null>(null);
  useEffect(() => { onBackRef.current = onBack; });
  useEffect(() => {
    if (!open) return;
    const entry = getOverlayHistory()?.open(() => onBackRef.current()) ?? null;
    entryRef.current = entry;
    return () => {
      entry?.close();
      if (entryRef.current === entry) entryRef.current = null;
    };
  }, [open]);
  return useMemo<OverlayHistoryControl>(() => ({
    get current() { return Boolean(entryRef.current?.current); },
    closeThen(then: () => void) {
      const entry = entryRef.current;
      if (entry) entry.close(then);
      else then();
    },
  }), []);
}
