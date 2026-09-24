"use client";

import { useEffect } from "react";

/**
 * Cursor light for tiles marked `data-spotlight`: while a mouse or pen moves
 * over one, its position is written to `--spot-x` / `--spot-y` on that tile
 * so CSS can light the edge and surface nearest the pointer (the Linear /
 * Vercel card treatment). One delegated listener serves the whole page,
 * updates at most once per frame, and never runs for touch input. Without
 * JavaScript the tiles keep their plain hover.
 */
export function PointerSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    let pending: { tile: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { tile, x, y } = pending;
      pending = null;
      tile.style.setProperty("--spot-x", `${x}px`);
      tile.style.setProperty("--spot-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      if (event.pointerType === "touch") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tile = target.closest<HTMLElement>("[data-spotlight]");
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      pending = { tile, x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!frame) frame = window.requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
