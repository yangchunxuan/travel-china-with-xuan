"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent, RefObject } from "react";
import type { DraggableCoreProps, DraggableData, DraggableEventHandler } from "react-draggable";
import {
  clampNewsletterPoint, moveNewsletterPosition, newsletterCardPlacement,
  newsletterDefaultPosition, newsletterDockDuration, newsletterDragStarted, newsletterLauncherBounds,
  newsletterPointForPosition, newsletterPositionForPoint, newsletterSafeArea, newsletterSideForPosition,
  readNewsletterPosition, snapNewsletterPosition, writeNewsletterPosition,
} from "../lib/newsletterPosition";
import type {
  NewsletterArea, NewsletterBounds, NewsletterMove, NewsletterPoint,
  NewsletterPosition, NewsletterSize,
} from "../lib/newsletterPosition";

type Options = {
  enabled: boolean;
  minimized: boolean;
  cardRef: RefObject<HTMLElement | null>;
  launcherRef: RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
};
type Measurement = { area: NewsletterArea; bounds: NewsletterBounds; launcher: NewsletterSize; card: NewsletterSize };
type DragKind = "launcher" | "card";
type Gesture = {
  kind: DragKind;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  anchor: NewsletterPoint;
  point: NewsletterPoint;
  moved: boolean;
};

function tabStorage(): Storage | null {
  try { return window.sessionStorage; } catch { return null; }
}

function movementBounds(kind: DragKind, measurement: Measurement): NewsletterBounds {
  return kind === "launcher" ? measurement.bounds
    : newsletterCardPlacement(measurement.area, newsletterDefaultPosition, measurement.launcher, measurement.card).bounds;
}

export function useNewsletterPosition({ enabled, minimized, cardRef, launcherRef, onOpen }: Options) {
  const [preference, setPreference] = useState<NewsletterPosition>({ ...newsletterDefaultPosition });
  const [measurement, setMeasurement] = useState<Measurement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [docking, setDocking] = useState(false);
  const [repositioning, setRepositioning] = useState(false);
  const dockingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preferenceRef = useRef(preference);
  const measurementRef = useRef<Measurement | null>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const suppressPointerClick = useRef(false);
  const loaded = useRef(false);
  const initiallyDocked = useRef(false);
  const enabledRef = useRef(enabled);
  const minimizedRef = useRef(minimized);
  const openRef = useRef(onOpen);
  const measureRef = useRef<(() => void) | null>(null);
  enabledRef.current = enabled;
  minimizedRef.current = minimized;
  openRef.current = onOpen;

  const applyPreference = useCallback((next: NewsletterPosition) => {
    preferenceRef.current = next;
    setPreference(next);
  }, []);

  const remember = useCallback((next: NewsletterPosition) => {
    applyPreference(next);
    writeNewsletterPosition(next, tabStorage());
  }, [applyPreference]);

  const cancelDocking = useCallback(() => {
    if (dockingTimer.current !== null) clearTimeout(dockingTimer.current);
    dockingTimer.current = null;
    setDocking(false);
  }, []);

  const dockPosition = useCallback((position: NewsletterPosition, kind: DragKind, animate: boolean) => {
    cancelDocking();
    const docked = snapNewsletterPosition(position);
    const current = measurementRef.current;
    const bounds = current ? movementBounds(kind, current) : null;
    const distance = bounds ? Math.abs(docked.x - preferenceRef.current.x) * (bounds.maxX - bounds.minX) : 0;
    remember(docked);
    if (animate && enabledRef.current && distance > 0.01) {
      setDocking(true);
      dockingTimer.current = setTimeout(() => {
        dockingTimer.current = null;
        setDocking(false);
      }, newsletterDockDuration);
    }
  }, [cancelDocking, remember]);

  const finishGesture = useCallback((animate = true) => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (gesture) {
      if (gesture.moved && gesture.kind === "launcher") suppressPointerClick.current = true;
      const current = measurementRef.current;
      const position = current ? newsletterPositionForPoint(gesture.point, movementBounds(gesture.kind, current), preferenceRef.current)
        : preferenceRef.current;
      // Release and cancellation both settle at a safe edge, keeping this surface's
      // release height. Only the docked x = 0/1 preference reaches session storage.
      dockPosition(position, gesture.kind, animate);
    }
    setDragging(false);
  }, [dockPosition]);

  useLayoutEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      const saved = readNewsletterPosition(tabStorage());
      preferenceRef.current = saved;
      setPreference(saved);
    }
    if (!enabled) {
      finishGesture(false);
      cancelDocking();
      return;
    }
    const launcher = launcherRef.current;
    const card = cardRef.current;
    const parent = launcher?.parentElement;
    if (!launcher || !card || !parent) return;
    let frame = 0;
    let restoreMotionFrame = 0;
    let disposed = false;
    const observed = new Set<Element>();
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => schedule());
    const observe = (element: Element) => {
      if (!observed.has(element)) {
        observed.add(element);
        resizeObserver?.observe(element);
      }
    };
    const measure = () => {
      if (disposed) return;
      const parentStyle = getComputedStyle(parent);
      if (parent.hidden || parentStyle.display === "none" || parentStyle.visibility === "hidden" || document.visibilityState === "hidden") {
        finishGesture(false);
        cancelDocking();
        return;
      }
      const visual = window.visualViewport;
      const parentRect = parent.getBoundingClientRect();
      const viewport = {
        left: (visual?.offsetLeft ?? 0) - parentRect.left,
        top: (visual?.offsetTop ?? 0) - parentRect.top,
        width: visual?.width ?? document.documentElement.clientWidth,
        height: visual?.height ?? window.innerHeight,
      };
      const launcherSize = { width: launcher.offsetWidth, height: launcher.offsetHeight };
      if (!launcherSize.width || !launcherSize.height || !viewport.width || !viewport.height) return;
      const padding = {
        left: parseFloat(parentStyle.paddingLeft) || 0,
        right: parseFloat(parentStyle.paddingRight) || 0,
        top: parseFloat(parentStyle.paddingTop) || 0,
        bottom: parseFloat(parentStyle.paddingBottom) || 0,
      };
      let obstructionBottom = viewport.top;
      document.querySelectorAll<HTMLElement>("[data-homeground-header-context], [data-homeground-tour-entry]").forEach(element => {
        observe(element);
        const style = getComputedStyle(element);
        if ((style.position !== "fixed" && style.position !== "sticky") || style.display === "none" ||
          style.visibility === "hidden" || Number(style.opacity) === 0 || !element.getClientRects().length) return;
        const rect = element.getBoundingClientRect();
        if (rect.bottom <= viewport.top + parentRect.top || rect.top >= viewport.top + viewport.height + parentRect.top ||
          rect.right <= viewport.left + parentRect.left || rect.left >= viewport.left + viewport.width + parentRect.left) return;
        obstructionBottom = Math.max(obstructionBottom, rect.bottom - parentRect.top);
      });
      const area = newsletterSafeArea(viewport, padding, launcherSize, obstructionBottom);
      const next = {
        area,
        bounds: newsletterLauncherBounds(area, launcherSize),
        launcher: launcherSize,
        card: { width: card.offsetWidth, height: card.offsetHeight },
      };
      const previous = measurementRef.current;
      if (JSON.stringify(next) !== JSON.stringify(previous)) {
        const boundsChanged = !previous || (Object.keys(next.bounds) as (keyof NewsletterBounds)[])
          .some(key => next.bounds[key] !== previous.bounds[key]);
        if (boundsChanged) {
          cancelDocking();
          // Clamp immediately after a viewport or obstruction change. Card-only
          // resizing leaves motion intact, including invitation/form expansion.
          setRepositioning(true);
          if (restoreMotionFrame) window.cancelAnimationFrame(restoreMotionFrame);
          restoreMotionFrame = window.requestAnimationFrame(() => {
            // Let the clamped position paint before re-enabling normal motion.
            restoreMotionFrame = window.requestAnimationFrame(() => {
              restoreMotionFrame = 0;
              if (!disposed) setRepositioning(false);
            });
          });
        }
        measurementRef.current = next;
        setMeasurement(next);
        const gesture = gestureRef.current;
        if (gesture) {
          const bounds = movementBounds(gesture.kind, next);
          gesture.point = clampNewsletterPoint(gesture.point, bounds);
          gesture.anchor = { x: gesture.point.x - (gesture.lastX - gesture.startX), y: gesture.point.y - (gesture.lastY - gesture.startY) };
          applyPreference(newsletterPositionForPoint(gesture.point, bounds, preferenceRef.current));
        }
      }
      if (!initiallyDocked.current && !gestureRef.current) {
        initiallyDocked.current = true;
        const docked = snapNewsletterPosition(preferenceRef.current);
        if (docked.x !== preferenceRef.current.x) remember(docked);
      }
    };
    function schedule() {
      if (!frame && !disposed) frame = window.requestAnimationFrame(() => { frame = 0; measure(); });
    }
    const cancel = () => finishGesture();
    const visibility = () => { if (document.visibilityState === "hidden") cancel(); else schedule(); };
    [parent, launcher, card].forEach(observe);
    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(document.documentElement, {
      subtree: true, childList: true, attributes: true,
      attributeFilter: ["hidden", "aria-hidden", "data-dismissed", "data-overlay-hidden", "data-article-visible", "data-homeground-tour-entry-dismissed"],
    });
    measureRef.current = measure;
    measure();
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("blur", cancel);
    window.addEventListener("pagehide", cancel);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("touchcancel", cancel);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);
    return () => {
      disposed = true;
      measureRef.current = null;
      if (frame) window.cancelAnimationFrame(frame);
      if (restoreMotionFrame) window.cancelAnimationFrame(restoreMotionFrame);
      setRepositioning(false);
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("blur", cancel);
      window.removeEventListener("pagehide", cancel);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("touchcancel", cancel);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
      finishGesture(false);
      cancelDocking();
    };
  }, [enabled, minimized, cardRef, launcherRef, finishGesture, applyPreference, cancelDocking, remember]);

  const move = useCallback((direction: NewsletterMove) => {
    if (!enabledRef.current) return;
    finishGesture();
    measureRef.current?.();
    const current = measurementRef.current;
    if (!current) return;
    const kind = minimizedRef.current ? "launcher" : "card";
    const bounds = movementBounds(kind, current);
    dockPosition(moveNewsletterPosition(preferenceRef.current, direction, bounds), kind, true);
  }, [finishGesture, dockPosition]);

  function startDrag(kind: DragKind, data: DraggableData): false | void {
    if (!enabledRef.current || (kind === "launcher") !== minimizedRef.current) return false;
    if (!Number.isFinite(data.x) || !Number.isFinite(data.y)) return false;
    finishGesture(false);
    measureRef.current?.();
    const current = measurementRef.current;
    const parent = data.node.parentElement;
    if (!current || !parent || parent.hidden) return false;
    if (kind === "launcher") suppressPointerClick.current = false;
    const rect = data.node.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const bounds = movementBounds(kind, current);
    const anchor = clampNewsletterPoint({ x: rect.left - parentRect.left, y: rect.top - parentRect.top }, bounds);
    cancelDocking();
    // Freeze an in-flight snap at its currently painted position before waiting
    // for the movement threshold. A press must not jump to the old snap target.
    applyPreference(newsletterPositionForPoint(anchor, bounds, preferenceRef.current));
    setDragging(true);
    gestureRef.current = {
      kind, startX: data.x, startY: data.y, lastX: data.x, lastY: data.y,
      anchor, point: anchor, moved: false,
    };
  }

  function updateDrag(kind: DragKind, data: DraggableData): false | void {
    const gesture = gestureRef.current;
    const current = measurementRef.current;
    if (!gesture || gesture.kind !== kind || !current) return false;
    if (!Number.isFinite(data.x) || !Number.isFinite(data.y)) { finishGesture(); return false; }
    if (!enabledRef.current || (kind === "launcher") !== minimizedRef.current || data.node.parentElement?.hidden) {
      finishGesture();
      return false;
    }
    gesture.lastX = data.x;
    gesture.lastY = data.y;
    const dx = data.x - gesture.startX;
    const dy = data.y - gesture.startY;
    if (!gesture.moved && !newsletterDragStarted(dx, dy)) return;
    gesture.moved = true;
    const bounds = movementBounds(kind, current);
    gesture.point = clampNewsletterPoint({ x: gesture.anchor.x + dx, y: gesture.anchor.y + dy }, bounds);
    applyPreference(newsletterPositionForPoint(gesture.point, bounds, preferenceRef.current));
    setDragging(true);
  }

  function coreHandlers(kind: DragKind): Pick<DraggableCoreProps, "onStart" | "onDrag" | "onStop"> {
    const onStart: DraggableEventHandler = (_event, data) => startDrag(kind, data);
    const onDrag: DraggableEventHandler = (_event, data) => updateDrag(kind, data);
    const onStop: DraggableEventHandler = (_event, data) => {
      if (gestureRef.current?.kind === kind) {
        updateDrag(kind, data);
        finishGesture();
      }
      // Returning false here would ask DraggableCore to keep its listeners alive.
    };
    return { onStart, onDrag, onStop };
  }

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    if (event.detail !== 0 && suppressPointerClick.current) {
      suppressPointerClick.current = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (enabledRef.current && minimizedRef.current && !gestureRef.current?.moved) openRef.current();
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
    const direction: NewsletterMove | undefined = ({
      ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", Home: "reset",
    } as Record<string, NewsletterMove>)[event.key];
    if (direction) {
      event.preventDefault();
      move(direction);
    }
  }

  let cardStyle: CSSProperties | undefined;
  let launcherStyle: CSSProperties | undefined;
  if (measurement) {
    const point = newsletterPointForPosition(preference, measurement.bounds);
    const card = newsletterCardPlacement(measurement.area, preference, measurement.launcher, measurement.card);
    launcherStyle = {
      left: 0, top: 0, right: "auto", bottom: "auto",
      "--launcher-x": `${point.x}px`, "--launcher-y": `${point.y}px`,
    } as CSSProperties;
    cardStyle = {
      left: 0, top: 0, right: "auto", bottom: "auto",
      "--card-x": `${card.left}px`, "--card-y": `${card.top}px`,
      maxInlineSize: card.maxWidth, maxBlockSize: card.maxHeight,
      transformOrigin: `${card.originX}px ${card.originY}px`,
    } as CSSProperties;
  }

  return {
    cardStyle, launcherStyle, dragging, docking, repositioning, side: newsletterSideForPosition(preference), move,
    launcherDragHandlers: coreHandlers("launcher"), cardDragHandlers: coreHandlers("card"),
    launcherHandlers: { onClick, onKeyDown }, cardHandleHandlers: { onKeyDown },
  };
}
