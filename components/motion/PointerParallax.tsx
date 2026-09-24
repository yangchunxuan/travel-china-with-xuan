"use client";

import { useEffect } from "react";

/**
 * Gentle depth for floating photo layers (the cosmos.so hero, adapted to
 * plain CSS 3D): while a mouse moves over the element with `id`, its
 * position relative to the centre is written to `--mx` / `--my` (-1 to 1)
 * so each tile can drift by its own depth. One listener, at most one update
 * per frame; touch input and reduced motion leave the tiles still.
 */
export function PointerParallax({ targetId }: { targetId: string }) {
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let next: { x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!next) return;
      target.style.setProperty("--mx", next.x.toFixed(3));
      target.style.setProperty("--my", next.y.toFixed(3));
      next = null;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      next = {
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      };
      if (!frame) frame = window.requestAnimationFrame(flush);
    };

    const onLeave = () => {
      next = { x: 0, y: 0 };
      if (!frame) frame = window.requestAnimationFrame(flush);
    };

    target.addEventListener("pointermove", onMove, { passive: true });
    target.addEventListener("pointerleave", onLeave);
    return () => {
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return null;
}
